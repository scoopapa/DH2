import {Dex} from '../../../sim/dex';
export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['DM OU', 'DM Ubers', 'DM NFE'],
		customDoublesTiers: ['DM DOU', 'DM DUbers', 'DM NFE']
	},
	
	actions: {
		inherit: true,
		canUltraBurst(pokemon: Pokemon) {
		if (['Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane'].includes(pokemon.baseSpecies.name) &&
			pokemon.getItem().id === 'ultranecroziumz') {
			return "Necrozma-Ultra";
			//Asriel Ultra Burst
		} else if (pokemon.baseSpecies.name === 'Asriel' && pokemon.getItem().id === 'soulcollective') {
			return "Asriel-Hyperdeath";
		}
			return null;
		},
		modifyDamage(
			baseDamage: number, pokemon: Pokemon, target: Pokemon, move: ActiveMove, suppressMessages = false
		) {
			const tr = this.battle.trunc;
			if (!move.type) move.type = '???';
			const type = move.type;

		baseDamage += 2;

		if (move.spreadHit) {
			// multi-target modifier (doubles only)
			const spreadModifier = move.spreadModifier || (this.battle.gameType === 'freeforall' ? 0.5 : 0.75);
			this.battle.debug('Spread modifier: ' + spreadModifier);
			baseDamage = this.battle.modify(baseDamage, spreadModifier);
		} else if (move.multihitType === 'parentalbond' && move.hit > 1) {
			// Parental Bond modifier
			const bondModifier = this.battle.gen > 6 ? 0.25 : 0.5;
			this.battle.debug(`Parental Bond modifier: ${bondModifier}`);
			baseDamage = this.battle.modify(baseDamage, bondModifier);
		} else if (move.multihitType === 'reverberate' && move.hit > 1) {
			this.battle.debug('Reverberate Modifier: 0.5')
			baseDamage = this.battle.modify(baseDamage, 0.5);
		}

		// weather modifier
		baseDamage = this.battle.runEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);

		// crit - not a modifier
		const isCrit = target.getMoveHitData(move).crit;
		if (isCrit) {
			baseDamage = tr(baseDamage * (move.critModifier || (this.battle.gen >= 6 ? 1.5 : 2)));
		}

		// random factor - also not a modifier
		baseDamage = this.battle.randomizer(baseDamage);

		// STAB
		// The "???" type never gets STAB
		// Not even if you Roost in Gen 4 and somehow manage to use
		// Struggle in the same turn.
		// (On second thought, it might be easier to get a MissingNo.)
		if (type !== '???') {
			let stab: number | [number, number] = 1;

			const isSTAB = move.forceSTAB || pokemon.hasType(type) || pokemon.getTypes(false, true).includes(type);
			if (isSTAB) {
				stab = 1.5;
			}

			// The Stellar tera type makes this incredibly confusing
			// If the move's type does not match one of the user's base types,
			// the Stellar tera type applies a one-time 1.2x damage boost for that type.
			//
			// If the move's type does match one of the user's base types,
			// then the Stellar tera type applies a one-time 2x STAB boost for that type,
			// and then goes back to using the regular 1.5x STAB boost for those types.
			if (pokemon.terastallized === 'Stellar') {
				if (!pokemon.stellarBoostedTypes.includes(type) || move.stellarBoosted) {
					stab = isSTAB ? 2 : [4915, 4096];
					move.stellarBoosted = true;
					if (pokemon.species.name !== 'Terapagos-Stellar') {
						pokemon.stellarBoostedTypes.push(type);
					}
				}
			} else {
				if (pokemon.terastallized === type && pokemon.getTypes(false, true).includes(type)) {
					stab = 2;
				}
				stab = this.battle.runEvent('ModifySTAB', pokemon, target, move, stab);
			}

			baseDamage = this.battle.modify(baseDamage, stab);
		}

		// types
		let typeMod = target.runEffectiveness(move);
		typeMod = this.battle.clampIntRange(typeMod, -6, 6);
		target.getMoveHitData(move).typeMod = typeMod;
		if (typeMod > 0) {
			if (!suppressMessages) this.battle.add('-supereffective', target);

			for (let i = 0; i < typeMod; i++) {
				baseDamage *= 2;
			}
		}
		if (typeMod < 0) {
			if (!suppressMessages) this.battle.add('-resisted', target);

			for (let i = 0; i > typeMod; i--) {
				baseDamage = tr(baseDamage / 2);
			}
		}

		if (isCrit && !suppressMessages) this.battle.add('-crit', target);

		if (pokemon.status === 'brn' && move.category === 'Physical' && !pokemon.hasAbility('guts')) {
			if (this.battle.gen < 6 || move.id !== 'facade') {
				baseDamage = this.battle.modify(baseDamage, 0.5);
			}
		}

		// Generation 5, but nothing later, sets damage to 1 before the final damage modifiers
		if (this.battle.gen === 5 && !baseDamage) baseDamage = 1;

		// Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
		baseDamage = this.battle.runEvent('ModifyDamage', pokemon, target, move, baseDamage);

		if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
			baseDamage = this.battle.modify(baseDamage, 0.25);
			this.battle.add('-zbroken', target);
		}

		// Generation 6-7 moves the check for minimum 1 damage after the final modifier...
		if (this.battle.gen !== 5 && !baseDamage) return 1;

		// ...but 16-bit truncation happens even later, and can truncate to 0
		return tr(baseDamage, 16);
	},

	datamod: {
		effectType: 'Rule',
		name: 'Data Mod',
		desc: 'When a new Pokémon switches in for the first time, information about its types, stats and Abilities is displayed to both players.',
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				const species = this.dex.species.get(pokemon.species.name);
				const baseSpecies = Dex.species.get(pokemon.species.name);
				let modded = false;
				for (const type in [0, 1]) {
					if (species.types[type] !== baseSpecies.types[type]) {
						// console.log(species.types[type] + " is different from " + baseSpecies.types[type]);
						modded = true;
					}
				}
				modded = modded ||
				/*if*/ (species.baseStats.hp !== baseSpecies.baseStats.hp/*) modded = true;
				if*/|| species.baseStats.atk !== baseSpecies.baseStats.atk/*) modded = true;
				if*/|| species.baseStats.def !== baseSpecies.baseStats.def/*) modded = true;
				if*/|| species.baseStats.spa !== baseSpecies.baseStats.spa/*) modded = true;
				if*/|| species.baseStats.spd !== baseSpecies.baseStats.spd/*) modded = true;
				if*/|| species.baseStats.spe !== baseSpecies.baseStats.spe/*) modded = true;
				if*/|| species.abilities[0] !== baseSpecies.abilities[0]/*) modded = true;
				if*/|| species.abilities[1] !== baseSpecies.abilities[1]/*) modded = true;
				if*/|| species.abilities['H'] !== baseSpecies.abilities['H']/*) modded = true;
				if*/|| species.abilities['S'] !== baseSpecies.abilities['S'])/* modded = true*/;
				if (modded) {
					pokemon.isModded = true;
					// console.log(species.name + " is different from in canon");
				// } else {
					// console.log(species.name + " is the same as in canon");
				}
			}
		},
		onSwitchIn(pokemon) {
			let species = this.dex.species.get(pokemon.species.name);
			let switchedIn = pokemon.switchedIn;
			if (pokemon.illusion) {
				species = this.dex.species.get(pokemon.illusion.species.name);
				// console.log(pokemon.illusion.name + " is being reported");
				if (!pokemon.illusion.isModded) return;
				this.add('-start', pokemon, 'typechange', pokemon.illusion.getTypes(true).join('/'), '[silent]');
				if (pokemon.illusion.switchedIn) return;
				pokemon.illusion.switchedIn = true;
			} else {
				// console.log(pokemon.name + " is being reported");
				if (!pokemon.isModded) return;
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
				if (pokemon.switchedIn) return;
				pokemon.switchedIn = true;
			}
			let abilities = species.abilities[0];
			if (species.abilities[1]) {
				abilities += ` / ${species.abilities[1]}`;
			}
			if (species.abilities['H']) {
				abilities += ` / ${species.abilities['H']}`;
			}
			if (species.abilities['S']) {
				abilities += ` / ${species.abilities['S']}`;
			}
			const baseStats = species.baseStats;
			const type = species.types[0];
			if (species.types[1]) {
				const type2 = species.types[1];
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span></li><li style="clear: both"></li></ul>`);
			} else {
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span></li><li style="clear: both"></li></ul>`);
			}
			this.add(`raw|<ul class="utilichart"><li class="result"><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> <span class="col statcol"><em>Min Spe</em><br>` + Math.floor((baseStats.spe * 2 + 5) * 0.9) + `</span> <span class="col statcol"><em>Max Spe</em><br>` + Math.floor((baseStats.spe * 2 + 99) * 1.1) + `</span> </span></li><li style="clear: both"></li></ul>`);
		},
		onDamagingHit(damage, target, source, move) {
			if (target.hasAbility('illusion')) { // making sure the correct information is given when an Illusion breaks
				if (target.isModded) {
					this.add('-start', target, 'typechange', target.getTypes(true).join('/'), '[silent]');
					if (!target.switchedIn) {
						target.switchedIn = true;
						let species = this.dex.species.get(target.species.name);
						let abilities = species.abilities[0];
						if (species.abilities[1]) {
							abilities += ` / ${species.abilities[1]}`;
						}
						if (species.abilities['H']) {
							abilities += ` / ${species.abilities['H']}`;
						}
						if (species.abilities['S']) {
							abilities += ` / ${species.abilities['S']}`;
						}
						const baseStats = species.baseStats;
						const type = species.types[0];
						if (species.types[1]) {
							const type2 = species.types[1];
							this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span></li><li style="clear: both"></li></ul>`);
						} else {
							this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities + `</span><span class="col abilitycol"></span></span></li><li style="clear: both"></li></ul>`);
						}
						this.add(`raw|<ul class="utilichart"><li class="result"><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
					}
				} else {
					const types = target.baseSpecies.types;
					if (target.getTypes().join() === types.join()) {
						this.add('-end', target, 'typechange', '[silent]');
						}
					}
				}
			},
		},
	},
};