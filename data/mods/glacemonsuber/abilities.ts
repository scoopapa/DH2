export const Abilities: { [abilityid: string]: ModdedAbilityData; } = {
	// slate 1
	fullmetalbody: {
		inherit: true,
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		shortDesc: "Prevents other Pokemon from lowering this Pokemon's stat stages. This Pokemon can only be damaged by direct attacks.",
	},
	multitype: {
		inherit: true,
		flags: {}, // yes deleting the flags is an ugly way to do it but I need to find a better one lol
		onStart(pokemon) {
			const allTypes = {
				"Normal": "Rock Head",
				"Grass": "Cotton Down",
				"Fire": "Dry Skin",
				"Water": "Cloud Nine",
				"Electric": "Earth Eater",
				"Ice": "Snow Warning",
				"Fighting": "Scrappy",
				"Poison": "Levitate",
				"Ground": "Clear Body",
				"Flying": "Wind Power",
				"Psychic": "Intimidate",
				"Bug": "Magic Guard",
				"Rock": "Sand Stream",
				"Ghost": "Super Luck",
				"Dragon": "Regenerator",
				"Dark": "Limber",
				"Steel": "Shield Dust",
				"Fairy": "Opportunist"
			};
			const item = pokemon.getItem();
			if (!item.onPlate) return;
			const abilityToGive = allTypes[pokemon.types[0]];
			const oldAbility = pokemon.setAbility(abilityToGive);
			if (oldAbility) {
				this.add('-ability', pokemon, abilityToGive, '[from] ability: Multitype');
				return;
			}
			return oldAbility as false | null;
		}
	},
	// slate 2
	unaware: {
		inherit: true,
		onSwitchIn(pokemon) {
			this.effectState.switchingIn = true;
		},
		onStart(pokemon) {
			// Cloud Nine does not activate when Skill Swapped or when Neutralizing Gas leaves the field
			pokemon.abilityState.ending = false; // Clear the ending flag
			if (this.effectState.switchingIn) {
				this.add('-ability', pokemon, 'Unaware');
				this.effectState.switchingIn = false;
			}
			this.eachEvent('WeatherChange', this.effect);
			if (!this.field.isTerrain('')) {
				this.add('-ability', source, 'Unaware');
				this.add('-message', `${source.name} suppresses the effects of the terrain!`);
				this.eachEvent('TerrainChange', this.effect);
			}
		},
		onAnyTerrainStart(target, source, terrain) {
			this.add('-ability', this.effectState.target, 'Unaware');
			this.add('-message', `${this.effectState.target.name} suppresses the effects of the terrain!`);
		},
		onEnd(pokemon) {
			pokemon.abilityState.ending = true;
			this.eachEvent('WeatherChange', this.effect);
			if (!this.field.isTerrain('')) this.add('-message', `${source.name} is no longer suppressing the effects of the terrain!`);
			source.m.forceCustomBlock = true;
			if (!this.getAllActive().some(x => (x.hasAbility('unaware') && x !== source))) this.eachEvent('TerrainChange', this.effect);
			source.m.forceCustomBlock = null;
		},
		suppressWeather: true,
		desc: "This Pokemon ignores other Pokemon's Attack, Special Attack, and accuracy stat stages as well as terrain and weather when taking damage, and ignores other Pokemon's Defense, Special Defense, and evasiveness as well as terrain and weather stat stages when dealing damage.",
		shortDesc: "This Pokemon ignores other Pokemon's stat stages as well as terrain and weather when taking or doing damage.",
	},
	mythicpresence: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Mythic Presence');
		},
		onAnyModifyAtk(atk, source, target, move) {
			const bestStat = source.getBestStat(true, true);
			if (bestStat === def) {
				const abilityHolder = this.effectState.target;
				if (!move.ruinedAtk) move.ruinedAtk = abilityHolder;
				if (move.ruinedAtk !== abilityHolder) return;
				this.debug('Mythic Presence Atk drop');
				return this.chainModify(0.75);
			}
		},
		onAnyModifyDef(def, source, target, move) {
			const bestStat = source.getBestStat(true, true);
			if (bestStat === atk) {
				const abilityHolder = this.effectState.target;
				if (!move.ruinedDef) move.ruinedDef = abilityHolder;
				if (move.ruinedDef !== abilityHolder) return;
				this.debug('Mythic Presence Def drop');
				return this.chainModify(0.75);
			}
		},
		onAnyModifySpA(spa, source, target, move) {
			const bestStat = source.getBestStat(true, true);
			if (bestStat === spd) {
				const abilityHolder = this.effectState.target;
				if (!move.ruinedSpA) move.ruinedSpA = abilityHolder;
				if (move.ruinedSpA !== abilityHolder) return;
				this.debug('Mythic Presence SpA drop');
				return this.chainModify(0.75);
			}
		},
		onAnyModifySpD(spd, source, target, move) {
			const bestStat = source.getBestStat(true, true);
			if (bestStat === spa) {
				const abilityHolder = this.effectState.target;
				if (!move.ruinedSpD) move.ruinedSpD = abilityHolder;
				if (move.ruinedSpD !== abilityHolder) return;
				this.debug('Mythic Presence SpD drop');
				return this.chainModify(0.75);
			}
		},
		onAnyModifySpe(spe, source, target, move) {
			const bestStat = source.getBestStat(true, true);
			if (bestStat === spe) {
				const abilityHolder = this.effectState.target;
				if (!move.ruinedAtk) move.ruinedAtk = abilityHolder;
				if (move.ruinedAtk !== abilityHolder) return;
				this.debug('Mythic Presence Spe drop');
				return this.chainModify(0.5);
			}
		},
		flags: {},
		name: "Mythic Presence",
		rating: 4.5,
		num: -1001,
		desc: "Lowers the opponents stat by 0.75x, or 0.5x for speed, corresponding to highest stat of the user (if Spdef + Def lower corresponding attack, etc etc.) (In case of a tie, priority goes Atk, then Def, then SpA, then Spdef, then Spe.).",
		shortDesc: "Lowers the opponents stat by 0.75x, or 0.5x for speed, corresponding to highest stat of the user.",

		start: "  [POKEMON]'s Mythic Presence weakened the Defense of all surrounding Pokémon!",
	},
	protosynthesis: {
		inherit: true,
		onWeatherChange(pokemon) {
			// Protosynthesis is not affected by Utility Umbrella
			if (['sunnyday', 'desolateland', 'raindance', 'primordialsea', 'hail', 'snow', 'sandstorm'].includes(pokemon.effectiveWeather())) {
				pokemon.addVolatile('protosynthesis');
			} else if (!pokemon.volatiles['protosynthesis']?.fromBooster && this.field.weather !== 'sunnyday') {
				// Protosynthesis will not deactivite if Sun is suppressed, hence the direct ID check (isWeather respects supression)
				pokemon.removeVolatile('protosynthesis');
			}
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protosynthesis', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protosynthesis');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Protosynthesis atk boost');
				return this.chainModify(1.5);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Protosynthesis def boost');
				return this.chainModify(1.5);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Protosynthesis spa boost');
				return this.chainModify(1.5);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Protosynthesis spd boost');
				return this.chainModify(1.5);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Protosynthesis spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		desc: "If a weather is active or this Pokemon uses a held Booster Energy, this Pokemon's highest stat is multiplied by 1.5. Stat stage changes are considered at the time this Ability activates. If multiple stats are tied, Attack, Defense, Special Attack, Special Defense, and Speed are prioritized in that order. If this effect was started by Sunny Day, a held Booster Energy will not activate and the effect ends when Sunny Day is no longer active. If this effect was started by a held Booster Energy, it ends when this Pokemon is no longer active.",
		shortDesc: "Weather active or Booster Energy used: highest stat is 1.5x.",
	},
	quarkdrive: {
		inherit: true,
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('electricterrain') || this.field.isTerrain('psychicterrain') || this.field.isTerrain('grassyterrain') || this.field.isTerrain('mistyterrain')) {
				pokemon.addVolatile('quarkdrive');
			} else if (!pokemon.volatiles['quarkdrive']?.fromBooster) {
				pokemon.removeVolatile('quarkdrive');
			}
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Quark Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Quark Drive');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Quark Drive atk boost');
				return this.chainModify(1.5);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Quark Drive def boost');
				return this.chainModify(1.5);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Quark Drive spa boost');
				return this.chainModify(1.5);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Quark Drive spd boost');
				return this.chainModify(1.5);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Quark Drive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		desc: "If a Terrain is active or this Pokemon uses a held Booster Energy, this Pokemon's highest stat is multiplied by 1.3, or by 1.5 if the highest stat is Speed. Stat stage changes are considered at the time this Ability activates. If multiple stats are tied, Attack, Defense, Special Attack, Special Defense, and Speed are prioritized in that order. If this effect was started by Electric Terrain, a held Booster Energy will not activate and the effect ends when Electric Terrain is no longer active. If this effect was started by a held Booster Energy, it ends when this Pokemon is no longer active.",
		shortDesc: "Terrain active or Booster Energy used: highest stat is 1.3x, or 1.5x if Speed.",
	},
	dauntlessshield: {
		inherit: true,
		onStart(pokemon) {
			this.boost({def: 1}, pokemon);
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			return this.chainModify([4915, 4096]);
		},
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			const sourceSideConditions = pokemon.side.sideConditions;
			const targetSideConditions = pokemon.side.foe.sideConditions;
			let willHeal = false;
			for (const id in sourceSideConditions) {
				if (sideConditions.includes(id)) willHeal = true;
			}
			for (const id in targetSideConditions) {
				if (sideConditions.includes(id)) willHeal = true;
			}
			if (willHeal) {
				this.heal(pokemon.baseMaxhp / 16);	
			}		
		},
		shortDesc: "On switch-in, this Pokemon's Defense is raised by 1 stage. 1.2x Power attacks. Heals 1/6 of its missing health if there are hazards on the field.",
	},
};
