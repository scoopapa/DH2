export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init() {
		this.modData("Learnsets", "landorus").learnset.airslash = ["9L1"];
		delete this.modData('Learnsets', 'landorus').learnset.sludgebomb;
		delete this.modData('Learnsets', 'landorus').learnset.sludgewave;
		delete this.modData('Learnsets', 'kubfu').learnset.swordsdance;
		delete this.modData('Learnsets', 'urshifu').learnset.swordsdance;
		delete this.modData('Learnsets', 'urshifurapidstrike').learnset.swordsdance;
		
		this.modData("Learnsets", "darkrai").learnset.aurasphere = ["9L1"];
		this.modData("Learnsets", "darkrai").learnset.confusion = ["9L1"];
		this.modData("Learnsets", "darkrai").learnset.extrasensory = ["9L1"];
		this.modData("Learnsets", "darkrai").learnset.futuresight = ["9L1"];
		this.modData("Learnsets", "darkrai").learnset.leechlife = ["9L1"];
		this.modData("Learnsets", "darkrai").learnset.lightscreen = ["9L1"];
		this.modData("Learnsets", "darkrai").learnset.poltergeist = ["9L1"];
		this.modData("Learnsets", "darkrai").learnset.psychicnoise = ["9L1"];
		this.modData("Learnsets", "darkrai").learnset.reflect = ["9L1"];
		this.modData("Learnsets", "darkrai").learnset.zenheadbutt = ["9L1"];
		this.modData("Learnsets", "kingambit").learnset.hammerarm = ["9L1"];
		delete this.modData('Learnsets', 'chienpao').learnset.suckerpunch;
		delete this.modData('Learnsets', 'chienpao').learnset.iceshard;
		this.modData("Learnsets", "chiyu").learnset.flipturn = ["9L1"];
		this.modData("Learnsets", "chiyu").learnset.strengthsap = ["9L1"];
		
		this.modData("Learnsets", "deoxys").learnset.foulplay = ["9L1"];
		this.modData("Learnsets", "deoxys").learnset.bodypress = ["9L1"];
		delete this.modData('Learnsets', 'deoxys').learnset.zapcannon;
		delete this.modData('Learnsets', 'deoxys').learnset.dynamicpunch;
		delete this.modData('Learnsets', 'deoxys').learnset.extremespeed;
		delete this.modData('Learnsets', 'deoxys').learnset.nastyplot;
	},
	
	actions: {
		inherit: true,
		canTerastallize(pokemon: Pokemon) {
			//const teraItems = ['teracrystal', 'wellspringmask', 'hearthflamemask', 'cornerstonemask'],
			if (pokemon.getItem().zMove || pokemon.canMegaEvo || this.dex.gen !== 9 || !pokemon.hasItem('teracrystal') ||
				!pokemon.hasItem('wellspringmask') || !pokemon.hasItem('hearthflamemask') || !pokemon.hasItem('cornerstonemask')) {
				return null;
			}
			return pokemon.teraType;
		},

		terastallize(pokemon: Pokemon) {
			if (pokemon.illusion && ['Ogerpon', 'Terapagos'].includes(pokemon.illusion.species.baseSpecies)) {
				this.battle.singleEvent('End', this.dex.abilities.get('Illusion'), pokemon.abilityState, pokemon);
			}

			const type = pokemon.teraType;
			this.battle.add('-terastallize', pokemon, type);
			pokemon.terastallized = type;
			for (const ally of pokemon.side.pokemon) {
				ally.canTerastallize = null;
			}
			pokemon.addedType = '';
			pokemon.knownType = true;
			pokemon.apparentType = type;
			if (pokemon.species.baseSpecies === 'Ogerpon') {
				const tera = pokemon.species.id === 'ogerpon' ? 'tealtera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.name === 'Terapagos-Terastal' && type === 'Stellar') {
				pokemon.formeChange('Terapagos-Stellar', null, true);
				pokemon.baseMaxhp = Math.floor(Math.floor(
					2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
				) * pokemon.level / 100 + 10);
				const newMaxHP = pokemon.baseMaxhp;
				pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
				pokemon.maxhp = newMaxHP;
				this.battle.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			}
			this.battle.runEvent('AfterTerastallization', pokemon);
		},
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
					stab = 1.5;
				} else if (pokemon.terastallized && type !== pokemon.terastallized && stab === 2) {
					stab = 1;
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
};