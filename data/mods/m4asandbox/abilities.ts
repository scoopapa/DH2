export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	// SANDBOX CONTENT STARTS HERE
	conversionz: {
		shortDesc: "If the Pokémon changes its type, the result is permanent. Deletes STAB.",
		onSwitchIn(pokemon) {
			if (pokemon.species.id !== 'porygonzmega') return;
			const type = this.dex.species.get(pokemon.species).types[0];
			if (pokemon.hasType(type) || !pokemon.setType(type)) return;
			this.add('-start', pokemon, 'typechange', type);
		},
		onSourceHit(target, source, move) {
			if (source.species.id !== 'porygonzmega') return;
			if (move.id === 'conversion' || move.id === 'conversion2') {
				this.add('-ability', source, 'Conversion-Z');
				const pokemon = this.dex.species.get(source.species);
				pokemon.types[0] = source.types[0];
			}
		},
		onModifyMove(move) {
			delete move.stab;
		},
		isPermanent: true,
		name: "Conversion-Z",
		rating: 5,
		num: -5000,
	},
	gamble: {
		shortDesc: "This Pokémon's Metronome hits five times.",
		onPrepareHit(source, target, move) {
			if (move.multihit) return;
			if (move.id === 'metronome') {
				move.multihit = 5;
			}
		},
		name: "Gamble",
		rating: 3,
		num: -5001,
	},
	secretweapon: {
		shortDesc: "When this Pokémon faints, it restores its teammates' HP, PP and status.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Secret Weapon');
			this.add('-message', `When ${pokemon.name} faints, it will restore the HP, PP and status of its entire team!`);
			this.hint("Pokémon that have already fainted won't be revived.");
		},
		onFaint(pokemon) {
			this.add('-ability', pokemon, 'Secret Weapon');
			this.add('-message', `${pokemon.name} restored the HP, PP and status of its entire team!`);
			for (const ally of pokemon.side.pokemon) {
				if (
					!ally.fainted && (
						ally.hp < ally.maxhp ||
						ally.status ||
						ally.moveSlots.some(moveSlot => moveSlot.pp < moveSlot.maxpp)
					)
				) {
					ally.heal(ally.maxhp);
					ally.setStatus('');
					for (const moveSlot of ally.moveSlots) {
						moveSlot.pp = moveSlot.maxpp;
					}
				}
			}
		},
		name: "Secret Weapon",
		rating: 5,
		num: -5002,
	},
	amalgam: {
		shortDesc: "Eats the Steel type, removing it from other Pokémon to restore HP by 1/3.",
		desc: "This Pokémon eats the Steel type! At every possible opportunity, it removes the Steel type from adjacent Pokémon. Each time it does so, its own HP is restored by 1/3.",
		onUpdate(pokemon) {
			for (const target of this.getAllActive()) {
				if (!target || target === pokemon) continue;
				if (target.hasType('Steel') && target.isAdjacent(this.effectState.target)) {
					target.setType(target.getTypes(true).map(type => type === "Steel" ? "???" : type));
					this.add('-start', target, 'typechange', target.types.join('/'), '[from] ability: Amalgam', '[of] ' + pokemon);
					pokemon.heal(pokemon.baseMaxhp / 3);
					this.add('-heal', pokemon, pokemon.getHealth, '[silent]'); // not displaying the healing correctly
				}
			}
		},
		name: "Amalgam",
		rating: 4,
		num: -5003,
	},
	illusion: {
		onBeforeSwitchIn(pokemon) {
			pokemon.illusion = null;
			let i;
			for (i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
				if (!pokemon.side.pokemon[i]) continue;
				if (!pokemon.side.pokemon[i].fainted) break;
			}
			if (!pokemon.side.pokemon[i]) return;
			if (pokemon === pokemon.side.pokemon[i]) return;
			pokemon.illusion = pokemon.side.pokemon[i];
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (target.illusion) {
				this.singleEvent('End', this.dex.abilities.get('Illusion'), target.abilityData, target, source, move);
			}
		},
		onEnd(pokemon) {
			if (pokemon.illusion) {
				const oMegaSpecies = this.dex.species.get(pokemon.species.originalMega);
				this.add('-end', pokemon, 'typechange', '[silent]');
				this.add('-end', pokemon, pokemon.illusion.item, '[silent]');
				if (oMegaSpecies.exists || pokemon.species.forme.startsWith('Mega')) {
					// Place volatiles on the Pokémon to show its mega-evolved condition and details
					this.add('-start', pokemon, pokemon.item, '[silent]');
					this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
				}
				this.debug('illusion cleared');
				pokemon.illusion = null;
				const details = pokemon.species.name + (pokemon.level === 100 ? '' : ', L' + pokemon.level) +
					(pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
				this.add('replace', pokemon, details);
				this.add('-end', pokemon, 'Illusion');
			}
		},
		onFaint(pokemon) {
			pokemon.illusion = null;
		},
		isUnbreakable: true,
		name: "Illusion",
		rating: 4.5,
		num: 149,
	},
	zenmode: { // altered onEnd so a Darmanitan-Zen can Mega Evolve properly
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Darmanitan' || pokemon.transformed) {
				return;
			}
			if (pokemon.hp <= pokemon.maxhp / 2 && !['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('zenmode');
			} else if (pokemon.hp > pokemon.maxhp / 2 && ['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('zenmode'); // in case of base Darmanitan-Zen
				pokemon.removeVolatile('zenmode');
			}
		},
		onEnd(pokemon) {
			if (!pokemon.volatiles['zenmode'] || !pokemon.hp) return;
			pokemon.transformed = false;
			delete pokemon.volatiles['zenmode'];
			if (pokemon.species.isMega) return;
			if (pokemon.species.baseSpecies === 'Darmanitan' && pokemon.species.battleOnly) {
				pokemon.formeChange(pokemon.species.battleOnly as string, this.effect, false, '[silent]');
			}
		},
		condition: {
			onStart(pokemon) {
				if (pokemon.species.isMega) return;
				if (!pokemon.species.name.includes('Galar')) {
					if (pokemon.species.id !== 'darmanitanzen') pokemon.formeChange('Darmanitan-Zen');
				} else {
					if (pokemon.species.id !== 'darmanitangalarzen') pokemon.formeChange('Darmanitan-Galar-Zen');
				}
			},
			onEnd(pokemon) {
				if (pokemon.species.isMega) return;
				if (['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
					pokemon.formeChange(pokemon.species.battleOnly as string);
				}
			},
		},
		isPermanent: true,
		name: "Zen Mode",
		rating: 0,
		num: 161,
	},
	flowergift: { // removed form dependence and prevented Mega Cherrim from changing form
		desc: "If this Pokémon is a Cherrim and Sunny Day is active, it changes to Sunshine Form and the Attack and Special Defense of it and its allies are multiplied by 1.5. If this Pokémon is a Mega Meganium and Sunny Day is active, the Attack and Special Defense of it and its allies are multiplied by 1.5. If this Pokémon is a Cherrim or a Mega Meganium and it is holding Utility Umbrella, it remains in its regular form and the Attack and Special Defense stats of it and its allies are not boosted. If this Pokémon is a Cherrim in its Sunshine form and is given Utility Umbrella, it will immediately switch back to its regular form. If this Pokémon is a Cherrim holding Utility Umbrella and its item is removed while Sunny Day is active, it will transform into its Sunshine Form. If an ally is holding Utility Umbrella while Cherrim is in its Sunshine Form or Meganium is Mega Evolved, they will not receive the Attack and Special Defense boosts.",
		shortDesc: "If user is Cherrim or Mega Meganium and Sunny Day is active: 1.5x ally team Atk and Sp. Def.",
		onStart(pokemon) {
			delete this.effectState.forme;
		},
		onUpdate(pokemon) {
			if (
				!pokemon.isActive || pokemon.baseSpecies.baseSpecies !== 'Cherrim' ||
				pokemon.species.isMega || pokemon.transformed
			) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				if (pokemon.species.id !== 'cherrimsunshine') {
					pokemon.formeChange('Cherrim-Sunshine', this.effect, false, '[msg]');
				}
			} else {
				if (pokemon.species.id === 'cherrimsunshine') {
					pokemon.formeChange('Cherrim', this.effect, false, '[msg]');
				}
			}
		},
		onAllyModifyAtkPriority: 3,
		onAllyModifyAtk(atk, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim' &&
				!this.effectState.target.species.isMega) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onAllyModifySpDPriority: 4,
		onAllyModifySpD(spd, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim' &&
				!this.effectState.target.species.isMega) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		name: "Flower Gift",
		rating: 1,
		num: 122,
	},
	stancechange: { // added compatibility for non-Falinks Megas (including Aegislash)
		desc: "If this Pokémon is an Aegislash or holding Falinksite, it changes to Blade Forme or Mega Combat before attempting to use an attacking move, and changes to Shield Forme or Mega Legion before attempting to use King's Shield.",
		shortDesc: "Changes to Blade Forme/Combat before attack, Shield Forme/Legion before King's Shield.",
		onBeforeMovePriority: 0.5,
		onBeforeMove(attacker, defender, move) {
			if (
				(attacker.species.baseSpecies !== 'Aegislash' && !attacker.species.isMega) || attacker.transformed
			) return;
			if (move.category === 'Status' && move.id !== 'kingsshield') return;
			if (attacker.species.baseSpecies === 'Aegislash' && !attacker.species.isMega) {
				const targetForme = (move.id === 'kingsshield' ? 'Aegislash' : 'Aegislash-Blade');
				if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
			} else {
				const targetForme = (move.id === 'kingsshield' ? 'Falinks-Mega-Legion' : 'Falinks-Mega-Combat');
				if (attacker.species.falinks !== targetForme) {
					let baseSpecies = attacker.m.originalSpecies;
					if (attacker.species.baseSpecies === 'Aegislash') {
						baseSpecies = (move.id === 'kingsshield' ? 'Aegislash' : 'Aegislash-Blade');
					}
					const species: Species = this.getMixedSpecies(baseSpecies, targetForme);
					species.falinks = targetForme;
					attacker.formeChange(species);
					if (targetForme === 'Falinks-Mega-Legion') {
						this.add('-message', `${attacker.name} changed to Legion formation!`);
						this.add('-start', attacker, 'typechange', attacker.getTypes(true).join('/'), '[silent]');
					} else {
						this.add('-message', `${attacker.name} changed to Combat formation!`);
						this.add('-start', attacker, 'typechange', attacker.getTypes(true).join('/'), '[silent]');
						if (!this.effectState.busted) { // this is just to make a dt that only shows up once per Mega Falinks
							const abilities = species.abilities;
							const baseStats = species.baseStats;
							const type = species.types[0];
							if (species.types[1]) {
								const type2 = species.types[1];
								this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="http://play.pokemonshowdown.com/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
							} else {
								this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
							}
							this.effectState.busted = true;
						}
					}
				}
			}
		},
		isPermanent: true,
		name: "Stance Change",
		rating: 4,
		num: 176,
	},
	sos: { // added compatibility for non-Wishiwashi Megas
		desc: "If this Pokémon is a Wishiwashi that has Mega Evolved, it calls for help and changes form at the end of each full turn it has been on the field, building up to Mega Wishiwashi (School Form) over five turns.",
		shortDesc: "More Wishiwashi spawn at the end of each turn.",
		onStart(pokemon) {
			if (pokemon.species.id === 'wishiwashimega' && pokemon.hp > pokemon.maxhp / 4) {
				this.add('-message', `Startled by the Mega Evolution, ${pokemon.name}'s school dispersed...`);
			}
		},
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (
				(pokemon.baseSpecies.baseSpecies !== 'Wishiwashi' && !pokemon.species.isMega) || pokemon.transformed || !pokemon.hp || !pokemon.activeTurns ||
				pokemon.species.id === 'wishiwashi' || pokemon.species.id === 'wishiwashischool' ||
				pokemon.species.wishiwashi === 'School'
			) return;
			this.add('-activate', pokemon, 'ability: SOS');
			this.add('-message', `${pokemon.name} called for help!`);
			if (!pokemon.species.wishiwashi) {
				const species: Species = this.getMixedSpecies(pokemon.m.originalSpecies, 'Wishiwashi-Mega-1');
				species.wishiwashi = 1;
				pokemon.formeChange(species, this.effect, true);
			} else if (pokemon.species.wishiwashi === 1) {
				const species: Species = this.getMixedSpecies(pokemon.m.originalSpecies, 'Wishiwashi-Mega-2');
				species.wishiwashi = 2;
				pokemon.formeChange(species, this.effect, true);
			} else if (pokemon.species.wishiwashi === 2) {
				const species: Species = this.getMixedSpecies(pokemon.m.originalSpecies, 'Wishiwashi-Mega-3');
				species.wishiwashi = 3;
				pokemon.formeChange(species, this.effect, true);
			} else if (pokemon.species.wishiwashi === 3) {
				const species: Species = this.getMixedSpecies(pokemon.m.originalSpecies, 'Wishiwashi-Mega-4');
				species.wishiwashi = 4;
				pokemon.formeChange(species, this.effect, true);
			} else if (pokemon.species.wishiwashi === 4) {
				const species: Species = this.getMixedSpecies(pokemon.m.originalSpecies, 'Wishiwashi-Mega-School');
				species.wishiwashi = 'School';
				pokemon.formeChange(species, this.effect, true);
			}
			this.add('-message', `More of ${pokemon.name}'s friends came together!`);
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
			const species = pokemon.species;
			const abilities = species.abilities;
			const baseStats = species.baseStats;
			const type = species.types[0];
			if (species.types[1]) {
				const type2 = species.types[1];
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="http://play.pokemonshowdown.com/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			} else {
				this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			}
			pokemon.baseMaxhp = Math.floor(Math.floor(
				2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
			) * pokemon.level / 100 + 10);
			const newMaxHP = pokemon.volatiles['dynamax'] ? (2 * pokemon.baseMaxhp) : pokemon.baseMaxhp;
			pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
			pokemon.maxhp = newMaxHP;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
		isPermanent: true,
		name: "SOS",
		rating: 5,
		num: -1054,
	},
	forgery: { // removed species requirement
		desc: "This Pokémon inherits the item of the last unfainted Pokemon in its party.",
		shortDesc: "Inherits the item of the last party member.",
		onStart(pokemon) {
			if (!pokemon.species.isMega || pokemon.item !== 'zoroarkite') return;
			pokemon.addVolatile('forgery');
			let i;
			for (i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
				if (
					!pokemon.side.pokemon[i] || pokemon.side.pokemon[i].fainted ||
					!pokemon.side.pokemon[i].item || this.dex.items.get(pokemon.side.pokemon[i].item).zMove ||
					 this.dex.items.get(pokemon.side.pokemon[i].item).megaStone
				) continue;
				break;
			}
			if (!pokemon.side.pokemon[i]) return;
			if (pokemon === pokemon.side.pokemon[i]) return;
			const forgery = pokemon.side.pokemon[i];
			this.add('-ability', pokemon, 'Forgery');
			pokemon.item = forgery.item;
			this.add('-message', `${pokemon.name}'s Zoroarkite became a replica of the ${this.dex.items.get(forgery.item).name} belonging to ${forgery.name}!`);
		},
		onUpdate(pokemon) {
			if (!pokemon.species.isMega) return;
			if (!pokemon.item) {
				this.add('-ability', pokemon, 'Forgery');
				this.add('-message', `${pokemon.name}'s Zoroarkite returned to normal!`);
				pokemon.item = 'zoroarkite' as ID;
			}
		},
		onEnd(pokemon) {
			if (!pokemon.species.isMega) return;
			if (pokemon.item !== 'zoroarkite') {
				this.add('-ability', pokemon, 'Forgery');
				this.add('-message', `${pokemon.name}'s Zoroarkite returned to normal!`);
				pokemon.item = 'zoroarkite' as ID;
			}
		},
		isPermanent: true,
		name: "Forgery",
		rating: 3,
		num: -1050,
	},
	// Sandierbox content by Kero
	contaminate: {
		shortDesc: "This Pokémon's Normal-type moves become Poison-type and have 1.2x power.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Poison';
				move.contaminateBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.contaminateBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		name: "Contaminate",
		rating: 4,
		num: -6000,
	},
	// deleted Buildup and Implode for compatibility :)
	defibrillator: {
		desc: "When the Pokémon uses an Electric-type move, if any members of its party have status conditions, they are cured and affected teammates restore 1/6th of their maximum HP.",
		shortDesc: "Electric moves cure ally status and heal cured allies",
		onAfterMove(source, target, move) {
			if (move.type === 'Electric') {
				for (const ally of source.side.pokemon) {
					if (ally.cureStatus()) ally.heal(ally.baseMaxhp / 6);
				}
			}
		},
		name: "Defibrillator",
		rating: 4.5,
		num: -6003,
	},
	tetramorph: {
		desc: "After using a move, the user's type changes to the type of that move. Multi-Attack will change type as well.",
		shortDesc: "User and Multi-Attack's type change to move's type after use.",
		onAfterMove(source, target, move) {
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Tetramorph');
			}
		},
		onModifyType(move, pokemon) {
			if (move.name === 'Multi-Attack') {
				move.type = pokemon.types[0];
			}
		},
		name: "Tetramorph",
		rating: 4.5,
		num: -6004,
	},
	josefscurse: {
		desc: 'Golurk summons spirits from the dead, which come to haunt its teammates. On switch in, it applies the "Trick or Treat" effect on itself and any allies on the field.',
		shortDesc: "Applies Trick-or-Treat to itself and allies on switch-in",
		onStart(pokemon) {
			for (const target of this.getAllActive()) {
				if (target.side === pokemon.side) {
					if (target.hasType('Ghost')) continue;
					if (!target.addType('Ghost')) continue;
					this.add('-start', target, 'typeadd', 'Ghost', '[from] move: Trick-or-Treat');
				}
			}
		},
		name: "Josef's Curse",
		rating: 4.5,
		num: -6005,
	},
	highreward: {
		desc: 'All moves with an accuracy less than 100% get a 20% boost to their base power.',
		shortDesc: "Boosts inaccurate moves.",
		onBasePower(basePower, pokemon, target, move) {
			if (move.accuracy < 100) return this.chainModify([0x1333, 0x1000]);
		},
		name: "High Reward",
		rating: 4.5,
		num: -6006,
	},
	modify: {
		desc: 'As soon as this Pokémon Mega Evolves/switches in, it gains a random type. All Normal-type moves of this Pokémon become that type and gain a 1.25x boost.',
		shortDesc: "Gain a random type on switch and convert Normal moves to that type with a boost.",
		onStart(pokemon) {
			const types = [];
			for (const type in this.dex.data.TypeChart) {
				if (pokemon.hasType(type)) continue;
				types.push(type);
			}
			const randomType = this.sample(types);
			if (!pokemon.setType(randomType)) return;
			this.add('-start', pokemon, 'typechange', randomType, '[from] ability: Modify');
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = pokemon.types[0];
				move.modifyBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.modifyBoosted) return this.chainModify([0x1400, 0x1000]);
		},
		name: "Modify",
		rating: 4.5,
		num: -6007,
	},
	sacrificialbarrier: { // wh
		desc: 'As soon as this Pokémon uses a move or deals damage (in the case of Volt Switch), the Pokémon sets up Reflect and Light Screen, and then explodes. These Reflect and Light Screens last 15 turns.',
		shortDesc: "Set 15 turn screens after using a move, then explodes.",
		onAfterMove(source, target, move) {
			if (source.side.addSideCondition('reflect') && source.side.addSideCondition('lightscreen')) {
				source.side.sideConditions['reflect'].duration = 15;
				source.side.sideConditions['lightscreen'].duration = 15;
				this.add('-message', `${source.name} put up a sacrificial barrier!`);
			}
			this.useMove('explosion', source);
		},
		name: "Sacrificial Barrier",
		rating: 4.5,
		num: -6008,
	},
	omniscientsentinel: {
		desc: "The Pokémon's type becomes the type of its first two moveslots. Multi-Attack changes type to match the Pokémon's primary type.",
		shortDesc: "Type changes to first two move slots; Multi-Attack becomes primary type.",
		onStart(pokemon) {
			pokemon.types[0] = this.dex.moves.get(pokemon.moves[0]).type;
			pokemon.types[1] = this.dex.moves.get(pokemon.moves[1]).type;
			this.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[from] ability: Omniscient Sentinel');
		},
		onModifyType(move, pokemon) {
			if (move.name === 'Multi-Attack') {
				move.type = pokemon.types[0];
			}
		},
		name: "Omniscient Sentinel",
		rating: 4.5,
		num: -6009,
	},
	rusty: {
		desc: "For every turn that the Pokémon is on the field, its Speed, Defense and Special Defense fall one stage. Becomes two stages if hit with a Water-type move.",
		shortDesc: "-1 DEF, SPD, SPE at end of turn, becomes -2 after hit by Water attack.",
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water') {
				target.addVolatile('rusty');
			}
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns && !pokemon.volatiles['rusty']) {
				this.boost({def: -1, spd: -1, spe: -1});
			} else if (pokemon.activeTurns && pokemon.volatiles['rusty']) {
				this.boost({def: -2, spd: -2, spe: -2});
			}
		},
		condition: {
			onStart(pokemon, source, effect) {
				this.add('-start', pokemon, 'Rusted', '[from] ability: Rusty', '[of] ' + pokemon);
			},
		},
		name: "Rusty",
		rating: 4.5,
		num: -6010,
	},
	afterburner: {
		desc: "When this Pokémon uses a Fire-type move, or is hit by a damaging Fire-type move, its speed is boosted by one stage. If this Pokémon becomes burned, it will immediately be cured of its burn status and its speed will be boosted by one stage.",
		shortDesc: "+1 Spe on using or being hit by a Fire move or being burned; cures burn.",
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Fire') {
				this.boost({spe: 1});
			}
		},
		onAfterMove(source, target, move) {
			if (move.type === 'Fire') {
				this.boost({spe: 1});
			}
		},
		onAfterSetStatus(status, target, source, effect) {
			if (!source || source === target) return;
			if (status.id === 'brn') {
				this.boost({spe: 1});
				target.cureStatus();
			}
		},
		name: "Afterburner",
		rating: 4.5,
		num: -6011,
	},
	failsafe: {
		desc: "The Pokémon heals itself by 1/8 when the move it uses fails. [Stomping Tantrum Trigger]",
		shortDesc: "Heals for 1/8 max HP when failing a move.",
		onAfterMove(source, target, move) {
			if (source.moveThisTurnResult === false) this.heal(source.maxhp / 8);
		},
		name: "Fail Safe",
		rating: 4.5,
		num: -6012,
	},
	angelsguidance: {
		desc: "When this Pokémon deals direct damage to an opponent, changes type to resist the opponent's STAB (for example, normal/fairy type MSilvally attacks an Arctozolt, it becomes a pure Ground type to resist electric). Multi-Attack changes type to match the user's primary type. If Mega Silvally already resists the opponent's primary stab, Angel's Guidance fails.",
		shortDesc: "Change type to resist opponent's primary type after damaging them; Multi-Type changes to match.",
		onFoeDamagingHit(damage, target, source, move) {
			if (source.ability == "Angel's Guidance" || source.ability == "angelsguidance") var angel = true;
			else var angel = false;
			if (!angel) return;
			const possibleTypes = [];
			const enemyType = target.types[0];
			for (const type in this.dex.data.TypeChart) {
				const typeCheck = this.dex.data.TypeChart[type].damageTaken[enemyType];
				if (typeCheck === 2 || typeCheck === 3) {
					possibleTypes.push(type);
				}
			}
			if (!possibleTypes.length) {
				return false;
			}
			if (possibleTypes.includes(source.types[0]) || possibleTypes.includes(source.types[1])) return;
			const randomType = this.sample(possibleTypes);

			if (!source.setType(randomType)) return;
			this.add('-start', source, 'typechange', randomType, "[from] ability: Angel's Guidance");
		},
		onModifyType(move, pokemon) {
			if (move.name === 'Multi-Attack') {
				move.type = pokemon.types[0];
			}
		},
		name: "Angel's Guidance",
		rating: 4.5,
		num: -6013,
	},
	irradiation: {
		desc: "If the Pokémon successfully lands an attack, opposing Pokémon will have their Defense and Special Defense lowered by one at the end of each of the next two turns. This effect does not stack with itself.",
		shortDesc: "Lower opponents' defenses at end of turn for two turns after attacking.",
		onAfterMove(source, target) {
			target.side.addSideCondition('irradiation');
		},
		condition: {
			duration: 2,
			onStart(targetSide) {
				this.add('-sidestart', targetSide, 'Irradiation');
			},
			onEnd(targetSide) {
				for (const pokemon of targetSide.active) {
					if (pokemon) {
						this.boost({def: -1, spd: -1}, pokemon);
					}
				}
				this.add('-sideend', targetSide, 'Irradiation');
			},
			onResidual(side) {
				for (const pokemon of side.active) {
					if (pokemon) {
						this.boost({def: -1, spd: -1}, pokemon);
					}
				}
			},
		},
		name: "Irradiation",
		rating: 4.5,
		num: -6014,
	},
	avicebron: {
		desc: "The Pokémon receives an additional 1.5x boost in base power to physical STAB moves but always moves last in the turn (priority equivalent to Dragon Tail/Teleport).",
		shortDesc: "Physical STAB 1.5x boost but always moves last.",
		onBasePower(basePower, pokemon, target, move) {
			if (move.type == pokemon.types[0] || move.type == pokemon.types[1] || pokemon.types[3]) if (move.category == "Physical") return this.chainModify([0x14CD, 0x1000]);
		},
		onModifyPriority(priority, pokemon, target, move) {
			return -6;
		},
		name: "Avicebron",
		rating: 4.5,
		num: -6015,
	},
	rkssystem20: {
		desc: "When the Pokémon uses a move that is not Multi-Attack (activating before the move takes effect), Multi-Attack's type changes to match the type of the move used. If the Pokémon uses Multi-Attack, its type changes to Multi-Attack's current type at the end of the turn. The Pokémon's Defense and Special Defense increase by 1.5x when it is the same type as Multi-Attack.",
		shortDesc: "MA changes type to last used move; MA changes users type at end of turn; 1.5x defenses if MA and user are same type",
		onModifyDefPriority: 6,
		onModifyDef(def, pokemon) {
			if (!pokemon.multiType) pokemon.multiType = "Normal";
			if (pokemon.multiType == pokemon.types[0]) {
				this.debug('RKS System 2.0 boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 6,
		onModifySpD(spd, pokemon) {
			if (!pokemon.multiType) pokemon.multiType = "Normal";
			if (pokemon.multiType == pokemon.types[0]) {
				this.debug('RKS System 2.0 boost');
				return this.chainModify(1.5);
			}
		},
		onPrepareHit(source, target, move) {
			if (move.hasBounced) return;
			const type = move.type;
			source.multiType = type;
		},
		onModifyType(move, pokemon) {
			if (!pokemon.multiType) pokemon.multiType = "Normal";
			if (move.name === 'Multi-Attack') {
				move.type = pokemon.multiType;
				pokemon.addVolatile("rkssystem20");
			}
		},
		onResidual(pokemon) {
			// for (const pokemon of side.active) {
			if (pokemon.volatiles['rkssystem20']) {
				pokemon.setType(pokemon.multiType);
				this.add('-start', pokemon, 'typechange', pokemon.multiType, '[from] ability: RKS System 2.0');
			}
			// }
		},
		condition: {
			duration: 2,
		},
		name: "RKS System 2.0",
		rating: 3,
		num: -6016,
	},
	kamikaze: {
		desc: "When this Pokémon's health drops to 1/16th or lower, it will immediately attempt to use Explosion. This ability will not activate if the opposing Pokémon is a Ghost type or has the Damp ability.",
		shortDesc: "Use Explosion at 1/16 health if possible.",
		onUpdate(target) {
			if (target.hp <= target.maxhp / 16 && !target.kamikaze) {
				for (const enemy of target.side.foe.active) {
					if (!target || !this.isAdjacent(enemy, target)) continue;
					if (!enemy.hasType("Ghost") && enemy.ability != "Damp") {
						target.kamikaze = true;
						this.useMove("Explosion", target);
					}
				}
			}
		},
		name: "Kamikaze",
		rating: 4.5,
		num: -6017,
	},
	inertia: {
		desc: "This Pokémon takes up to 50% reduced damage from direct attacks, based on how much faster it is than the attacker. Damage Reduced = 25 × User's Current Speed / Target's Current Speed.",
		shortDesc: "Takes less damage based on how much faster it is than the opponent.",
		onDamage(damage, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				let inertia = Math.floor(25 * target.getStat('spe', false, false) / source.getStat('spe', false, false),);
				if (inertia > 50) inertia = 50;
				inertia = (100 - inertia) / 100;
				return damage * inertia;
			}
		},
		name: "Inertia",
		rating: 4.5,
		num: -6018,
	},
	deusexmachina: {
		shortDesc: "Raises the Pokémon's most proficient stat when its HP falls to half.",
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				let statName = 'atk';
				let bestStat = 0;
				let s: StatNameExceptHP;
				for (s in target.storedStats) {
					if (target.storedStats[s] > bestStat) {
						statName = s;
						bestStat = target.storedStats[s];
					}
				}
				this.boost({[statName]: 1}, target);
			}
		},
		name: "Deus Ex Machina",
		rating: 4.5,
		num: -6019,
	},
	spiralpower: {
		desc: "Ghost-type moves used by this Pokémon and its allies have their type effectiveness against Normal changed to be super effective.",
		shortDesc: "This Pokémon and its allies' Ghost-type moves are super effective against Normal-types.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Spiral Power');
			this.add('-message', `Ghost-type moves used by ${pokemon.name} and its allies are super effective against Normal-types!`);
		},
		onModifyMovePriority: -5,
		onAllyModifyMove(move) {
			if (move.type !== 'Ghost') return;
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Ghost'] = true;
				(move as any).spiralpowerBoosted = true;
			}
		},
		name: "Spiral Power",
		rating: 3,
		num: -6020,
	},
	jetengine: {
		desc: "Raises the user's Speed by one stage when being hit by a Fire-type move.",
		shortDesc: "Speed +1 when hit with Fire-type move.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.boost({spe: 1})) {
					this.add('-immune', target, '[from] ability: Jet Engine');
				}
				return null;
			}
		},
		name: "Jet Engine",
		rating: 4.5,
		num: -6021,
	},
	vigilante: {
		desc: "Draws in all Dark-type moves. Instead of being hit by Dark-type moves, it decreases its attacker's SpA and Atk by one stage. Intimidate immunity.",
		shortDesc: "Draws in and is immune to Dark moves; decreases attacker's offenses on doing so; Intimidate immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Dark') {
				this.add('-ability', target, 'Vigilante', 'boost');
				this.boost({atk: -1, spa: -1}, source, target, null, true);
				this.add('-immune', target, '[from] ability: Vigilante');
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Dark' || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Vigilante');
				}
				return this.effectState.target;
			}
		},
		onBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate') {
				delete boost.atk;
				this.add('-immune', target, '[from] ability: Vigilante');
			}
		},
		name: "Vigilante",
		rating: 4.5,
		num: -6022,
	},
	brokendlc: {
		desc: "Upon gaining this ability or entering the battle, the Pokémon changes type to the target's secondary typing, and so does the type of its Multi-Attack. If the target lacks a secondary typing, the ??? type (completely neutral offensively and defensively) is used.",
		shortDesc: "User and Multi-Attack become the target's secondary type on entry; ??? if no secondary.",
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				if (target.types[1]) {
					pokemon.setType(target.types[1]);
					this.add('-start', pokemon, 'typechange', target.types[1], '[from] ability: Broken DLC');
				} else {
					pokemon.setType("???");
					this.add('-start', pokemon, 'typechange', '???', '[from] ability: Broken DLC');
				}
			}
		},
		onModifyType(move, pokemon) {
			if (move.name === 'Multi-Attack') {
				move.type = pokemon.types[0];
			}
		},
		name: "Broken DLC",
		rating: 4.5,
		num: -6023,
	},
	rksoverload: {
		desc: "This Pokémon's typing is determined by its first move.",
		shortDesc: "User's type changes to its first move's type.",
		onStart(pokemon) {
			pokemon.setType(this.dex.moves.get(pokemon.moves[0]).type);
			this.add('-start', pokemon, 'typechange', pokemon.types[0], '[from] ability: RKS Overload');
		},
		name: "RKS Overload",
		rating: 4.5,
		num: -6024,
	},
	triggerhappy: {
		desc: "This Pokémon's self-destructiive move only deal 1/4th damage to the user.",
		shortDesc: "This Pokémon's self-destructiive move only deal 1/4th damage to the user.",
		onModifyMove(move, target) {
			if (move.selfdestruct) {
				move.selfdestruct = false;
				move.triggered = true;
			} else {
				move.triggered = false;
			}
		},
		onAfterMove(source, target, move) {
			if (move.triggered) {
				this.damage(Math.round(source.maxhp / 4), source, source);
			}
		},
		name: "Trigger Happy",
		rating: 4.5,
		num: -6025,
	},
	superconductor1: {
		desc: "The damage that this Pokémon takes from contact moves is halved, but it also takes double damage from Electric-type moves. (Fluffy clone but an Electric weakness instead of a Fire weakness)",
		shortDesc: "Half damage from contact moves; double damage from Electric moves.",
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Electric') mod *= 2;
			if (move.flags['contact']) mod /= 2;
			return this.chainModify(mod);
		},
		name: "Superconductor1",
		rating: 4.5,
		num: -6026,
	},
	mugarkssystem: {
		desc: "Whenever the user gets hits by an attack, its type changes in accordance with Conversion 2. Multi-Attack changes type to account for the user's type.",
		shortDesc: "Type changes like Conversion2 when hit; Multi-type matches",
		onAfterMoveSecondary(target, source, move) {
			if (!target.hp) return;
			const possibleTypes = [];
			const attackType = move.type;
			for (const type in this.dex.data.TypeChart) {
				if (target.hasType(type)) continue;
				const typeCheck = this.dex.data.TypeChart[type].damageTaken[attackType];
				if (typeCheck === 2 || typeCheck === 3) {
					possibleTypes.push(type);
				}
			}
			if (!possibleTypes.length) {
				return false;
			}
			const randomType = this.sample(possibleTypes);
			if (
				target.isActive && move.effectType === 'Move' && move.category !== 'Status' &&
				randomType !== '???' && !target.hasType(randomType)
			) {
				if (!target.setType(randomType)) return false;
				this.add('-start', target, 'typechange', randomType, '[from] ability: Color Change');
			}
		},
		name: "MuGa RKS System",
		rating: 4.5,
		num: -6027,
	},
	protector: {
		desc: "When hit by a Dark, Ghost or Bug type move, raises Defense by two stages.",
		shortDesc: "+2 DEF when hit by Dark/Ghost/Bug.",
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Dark' || move.type === 'Ghost' || move.type === 'Bug') {
				this.boost({def: 2});
			}
		},
		name: "Protector",
		rating: 4.5,
		num: -6028,
	},
	lovingexplosions: {
		desc: "This Pokemon's self-KO moves (Self-Destruct, Explosion, Misty Explosion) deal damage with the opponent's Defense or Special Defense halved, depending on if the move is a physical or special attack (physical attack - physical defense, special attack - special defense).",
		shortDesc: "This Pokemon's self-destructing moves deal damage with the opponent's defenses halved.",
		onBasePower(basePower, pokemon, target, move) {
			if (move.selfdestruct) return this.chainModify(2);
		},
		name: "Loving Explosions",
		rating: 4.5,
		num: -6029,
	},
	mechanic: {
		desc: "Moves that have a guaranted secondary effects have their power doubled.",
		shortDesc: "Moves with 100% chance secondary effects have doubled power.",
		onBasePower(basePower, pokemon, target, move) {
			if (move.secondaries) {
				for (const secondary of move.secondaries) {
					if (secondary.chance = 100) return this.chainModify(2);
				}
			}
		},
		name: "Mechanic",
		rating: 4.5,
		num: -6030,
	},
	pounce: {
		desc: "This Pokémon is immune to all entry hazards. If it lands on any type of entry hazard, it lowers the Defense of adjacent opponents.",
		shortDesc: "Hazard immunity. Lowers adjacent opponents' Defense by 1 stage if switched in on them.",
		onStart(pokemon) {
			let activated = false;
			for (const sideCondition of ['gmaxsteelsurge', 'spikes', 'stealthrock', 'stickyweb', 'toxicspikes']) {
				if (pokemon.side.getSideCondition(sideCondition)) {
					for (const target of pokemon.side.foe.active) {
						if (!target || !target.isAdjacent(pokemon)) continue;
						if (!activated) {
							this.add('-ability', pokemon, 'Pounce', 'boost');
							activated = true;
						}
						if (target.volatiles['substitute']) {
							this.add('-immune', target);
						} else {
							this.boost({def: -1}, target, pokemon, null, true);
						}
					}
					return;
				}
			}
		},
		hazardImmune: true,
		name: "Pounce",
		rating: 4,
		num: -6031,
	},
	residrain: {
		desc: "Every time another Pokémon is damaged indirectly, this Pokémon's HP is restored by the same amount.",
		shortDesc: "Heals from the indirect damage dealt to others.",
		onAnyDamage(damage, target, source, effect) {
			const pokemon = this.effectState.target;
			if (effect.effectType !== 'Move' && target !== pokemon && effect.id !== 'leechseed') {
				pokemon.heal(damage);
				this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			}
		},
		name: "Residrain",
		rating: 4,
		num: -6032,
	},
	residrainhalf: {
		desc: "Every time another Pokémon is damaged indirectly, this Pokémon's HP is restored by half of the same amount.",
		shortDesc: "Heals from half of the indirect damage dealt to others.",
		onAnyDamage(damage, target, source, effect) {
			const pokemon = this.effectState.target;
			if (effect.effectType !== 'Move' && target !== pokemon && effect.id !== 'leechseed') {
				pokemon.heal(damage / 2);
				this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			}
		},
		name: "Residrain (Half)",
		rating: 4,
		num: -6033,
	},
	overflow: {
		desc: "When this Pokemon uses a Fire-type move, it receives a 50% damage boost, but loses the Fire type and this boost for 2 turns.",
		shortDesc: "1.5x Fire moves; loses Fire type and boost for 2 turns after.",
		onModifyMove(move, pokemon, target) {
			if (move.type === "Fire" && !pokemon.volatiles['overflow']) {
				move.overflow = true;
			} else { move.overflow = false; }
		},
		onBasePower(basePower, pokemon, target, move) {
			if (move.overflow) return this.chainModify(1.5);
		},
		onAfterMove(source, target, move) {
			if (move.overflow) {
				source.addVolatile('overflow');
			}
		},
		condition: {
			duration: 3,
			onResidualOrder: 1,
			onStart(pokemon) {
				pokemon.setType(pokemon.getTypes(true).map(type => type === "Fire" ? "???" : type));
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] ability: Overflow');
			},
			onEnd(pokemon) {
				pokemon.setType(pokemon.getTypes(true).map(type => type === "???" ? "Fire" : type));
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] ability: Overflow');
			},
		},
		name: "Overflow",
		rating: 4,
		num: -6034,
	},
	lasttoxin: {
		desc: "When this Pokemon brings an opponent to 50% or under using an attacking move, it badly poisons that opponent.",
		shortDesc: "Badly poison enemies brought under half health..",
		onAfterMove(source, target, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				target.setStatus('tox');
			}
		},
		name: "Last Toxin",
		rating: 4,
		num: -6035,
	},
	junkprocessor: {
		desc: "Every time this Pokemon's stats are lowered, heals 20% of its max HP.",
		shortDesc: "Heal 1/5 HP on stat drops.",
		onAfterEachBoost(boost, target, source, effect) {
			let statsLowered = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
				this.add('-ability', target, 'Junk Processor');
				this.heal(target.baseMaxhp / 5, target);
			}
		},
		name: "Junk Processor",
		rating: 4,
		num: -6036,
	},
	danceofthorns: {
		desc: "If this pokemon has it’s stats lowered, it sets a layer of toxic spikes on the opponent’s side of the field.",
		shortDesc: "Set Toxic Spikes on stat drops.",
		onAfterEachBoost(boost, target, source, effect) {
			let statsLowered = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
				this.add('-ability', this.effectState.target, 'Dance of Thorns');
				this.effectState.target.side.foe.addSideCondition('toxicspikes');
			}
		},
		name: "Dance of Thorns",
		rating: 4,
		num: -6037,
	},
	boobytrap: {
		desc: "This Pokémon is immune to all entry hazards. If it lands on any type of entry hazard, it uses Tar Shot on all active enemy Pokemon.",
		shortDesc: "Hazard immunity. Adjacent opponents get Tar Shot if switched in on them.",
		onStart(pokemon) {
			let activated = false;
			for (const sideCondition of ['gmaxsteelsurge', 'spikes', 'stealthrock', 'stickyweb', 'toxicspikes']) {
				if (pokemon.side.getSideCondition(sideCondition)) {
					for (const target of pokemon.side.foe.active) {
						if (!target || !target.isAdjacent(pokemon)) continue;
						if (!activated) {
							this.add('-ability', pokemon, 'Booby Trap', 'boost');
							activated = true;
						}
						if (target.volatiles['substitute']) {
							this.add('-immune', target);
						} else {
							this.boost({spe: -1}, target, pokemon, null, true);
							target.addVolatile('tarshot');
						}
					}
					return;
				}
			}
		},
		hazardImmune: true,
		name: "Booby Trap",
		rating: 4,
		num: -6038,
	},
	wonderseal: {
		desc: "All super effective and not very effective moves used on this Pokemon or by this Pokemon fail.",
		shortDesc: "All non-neutrally effective moves used on or by this Pokemon fail.",
		onAnyTryHit(target, source, move) {
			const pokemon = this.effectState.target;
			if (source !== pokemon && target !== pokemon) return;
			if (target === source || move.category === 'Status' || move.type === '???' || move.id === 'struggle') return;
			if (move.id === 'skydrop' && !source.volatiles['skydrop']) return;
			this.debug('Wonder Seal immunity: ' + move.id);
			if (target.runEffectiveness(move) !== 0) {
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-immune', target, '[from] ability: Wonder Seal', '[of] ' + pokemon);
				}
				return null;
			}
		},
		name: "Wonder Seal",
		rating: 4,
		num: -6039,
	},
	powerplant: {
		desc: "This Pokemon heals for 1/4 of its max health upon lowering an enemy's stats.",
		shortDesc: "Heal 1/4 on foe stat drop.",
		onAnyAfterEachBoost(boost, target, source) {
			if (!source || source === target || source !== this.effectState.target) return;
			let statsLowered = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					statsLowered = true;
				}
				if (statsLowered) {
					this.add('-ability', source, 'Power Plant');
					this.heal(source.baseMaxhp / 4, source);
				}
			}
		},
		name: "Power Plant",
		rating: 4,
		num: -6040,
	},
	climaticchange: {
		desc: "Upon using a Water, Fire, or Ice move, this Pokemon changes to that type and sets the corresponding weather.",
		shortDesc: "Changes type and weather when using Water/Fire/Ice moves.",
		onPrepareHit(source, target, move) {
			if (move.hasBounced) return;
			const type = move.type;
			if (type) {
				switch (type) {
				case "Water":
					this.field.setWeather('raindance');
					if (!source.setType(type)) return;
					this.add('-start', source, 'typechange', type, '[from] ability: Climatic Change');
					break;
				case "Fire":
					this.field.setWeather('sunnyday');
					if (!source.setType(type)) return;
					this.add('-start', source, 'typechange', type, '[from] ability: Climatic Change');
					break;
				case "Ice":
					this.field.setWeather('hail');
					if (!source.setType(type)) return;
					this.add('-start', source, 'typechange', type, '[from] ability: Climatic Change');
					break;
				}
			}
		},
		name: "Climatic Change",
		rating: 4,
		num: -6041,
	},
	soulguard: {
		desc: "This Pokemon is immune to types it resists.",
		shortDesc: "Resistances become immunities.",
		onTryHit(target, source, move) {
			if (target === source || move.category === 'Status' || move.type === '???' || move.id === 'struggle') return;
			if (move.id === 'skydrop' && !source.volatiles['skydrop']) return;
			this.debug('Soul Guard immunity: ' + move.id);
			if (target.runEffectiveness(move) < 0) {
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-immune', target, '[from] ability: Soul Guard');
				}
				return null;
			}
		},
		name: "Soul Guard",
		rating: 4,
		num: -6042,
	},
	evaporate: {
		desc: "If the Pokemon or the opponent uses a Water type move, it triggers the Haze effect. Immune to Water.",
		shortDesc: "Haze when any Pokemon uses a Water move; Water immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				this.add('-immune', target, '[from] ability: Evaporate');
				return null;
			}
		},
		onAnyPrepareHit(source, target, move) {
			if (move.hasBounced) return;
			const type = move.type;
			if (type && type === 'Water') {
				this.add('-clearallboost');
				for (const pokemon of this.getAllActive()) {
					pokemon.clearBoosts();
				}
			}
		},
		name: "Evaporate",
		rating: 4,
		num: -6043,
	},
	scavenger: {
		desc: "This Pokemon's Dark-type moves have +1 priority",
		shortDesc: "+1 Priority to Dark moves.",
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.type === 'Dark') return priority + 1;
		},
		name: "Scavenger",
		rating: 4,
		num: -6044,
	},
	indefatigable: {
		desc: "If this Pokemon's recharge moves faint an opposing Pokemon, the user doesn't have to recharge.",
		shortDesc: "Recharge moves don't recharge if the opponent faints.",
		onAfterMove(source, target, move) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon === source) continue;
				if (!pokemon.hp) {
					source.removeVolatile('mustrecharge');
					return;
				}
			}
		},
		name: "Indefatigable",
		rating: 4,
		num: -6045,
	},
	shortcircuit: {
		desc: "When this Pokémon uses a Electric-type attack, damage is calculated using the user's Speed stat. Other effects that modify the Speed stats are used as normal, including stat stage changes.",
		shortDesc: "Electric-type attacks use Speed stat in damage calculation.",
		onModifyMove(move, attacker) {
			if (move.type === 'Electric') {
				(move as any).useSourceSpeedAsOffensive = true;
			}
		},
		name: "Short Circuit",
		rating: 3.5,
		num: -6046,
	},
	psychopomp: {
		desc: "This Pokemon switches out after knocking out an opposing Pokemon",
		shortDesc: "Switches out after KOing an enemy.",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				source.switchFlag = true;
				this.add('-activate', source, 'ability: Psychopomp');
			}
		},
		name: "Psychopomp",
		rating: 3.5,
		num: -6047,
	},
	spinaltap: {
		desc: "This Pokemon's moves deal 30% more damage, but it takes 1/10 damage after attacking.",
		shortDesc: "1.3x power to all moves, takes 1/10 after attacking.",
		onModifyDamage(damage, source, target, move) {
			return this.chainModify([0x14CC, 0x1000]);
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (source && source !== target && move && move.category !== 'Status') {
				this.damage(source.baseMaxhp / 10, source, source, this.dex.abilities.get('spinaltap'));
			}
		},
		name: "Spinal Tap",
		rating: 3.5,
		num: -6048,
	},
};
