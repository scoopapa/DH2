export const Abilities: {[k: string]: ModdedAbilityData} = {
	// all-seeing eyes implemented in general abilities.ts
	beadsofruin: {
		inherit: true,
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Beads of Ruin');
			this.add('-message', '(In mbhv4, ruin abilities weaken the certain stat of all active Pokemon.)');
		},
		onAnyModifySpD(spd, target, source, move) {
			const abilityHolder = this.effectState.target;
			if (!move.ruinedSpD) move.ruinedSpD = abilityHolder;
			if (move.ruinedSpD !== abilityHolder) return;
			this.debug('Beads of Ruin SpD drop');
			return this.chainModify(0.75);
		},
		shortDesc: "The Special Defense stat of all active Pokemon is multiplied by 0.75.",
	},
	contrary: {
		inherit: true,
		onChangeBoost(boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			if (this.effectState.contrary) return;
			let i: BoostID;
			for (i in boost) {
				boost[i]! *= -1;
			}
			this.effectState.contrary = true;
		},
		onSwitchIn() {
			delete this.effectState.contrary;
		},
		shortDesc: "This Pokemon's stat changes are reversed. Once per switch-in.",
	},
	curiousmedicine: {
		inherit: true,
		onStart(pokemon) {
			for (const poke of this.getAllActive()) {
				poke.clearBoosts();
				this.add('-clearboost', poke, '[from] ability: Curious Medicine', '[of] ' + pokemon);
			}
		},
		shortDesc: "On switch-in, all Pokemon have their stat stages reset to 0.",
	},
	deltastream: {
		inherit: true,
		// implemented in conditions.ts
		desc: "On switch-in, the weather becomes Delta Stream, which removes the weaknesses of the Flying type from Flying-type Pokemon. The damage of Flying-type attacks is multiplied by 1.3. This weather remains in effect until this Ability is no longer active for any Pokemon, or the weather is changed by the Desolate Land or Primordial Sea Abilities.",
		shortDesc: "On switch-in, this Pokemon summons Delta Stream. 1.3x Flying attacks damage.",
	},
	eartheater: {
		inherit: true,
		// implemented in moves.ts
		desc: "This Pokemon is immune to Ground-type moves and restores 1/4 of its maximum HP, rounded down, when hit by a Ground-type move. It's also immune to Spikes.",
		shortDesc: "Heals 1/4 HP when hit by Ground moves; Ground immunity; Spikes immunity.",
	},
	galewings: {
		// for ngas
		inherit: true,
		onModifyPriority(priority, pokemon, target, move) {
			for (const poke of this.getAllActive()) {
				if (poke.hasAbility('neutralizinggas') && poke.side.id !== pokemon.side.id &&
					!poke.volatiles['gastroacid'] && !poke.transformed) {
					return;
				}
			}
			if (move?.type === 'Flying' && pokemon.hp === pokemon.maxhp) return priority + 1;
		},
	},
	gulpmissile: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (!source.hp || !source.isActive || target.transformed || target.isSemiInvulnerable()) return;
			if (['cramorantgulping', 'cramorantgorging'].includes(target.species.id)) {
				this.damage(source.baseMaxhp / 4, source, target);
				if (target.species.id === 'cramorantgulping') {
					this.boost({def: -1, spd: -1}, source, target, null, true);
				} else {
					this.boost({spe: -2}, source, target, null, true);
				}
				target.formeChange('cramorant', move);
			}
		},
		desc: "If this Pokemon is a Cramorant, it changes forme when it hits a target with Surf or uses the first turn of Dive successfully. It becomes Gulping Form with an Arrokuda in its mouth if it has more than 1/2 of its maximum HP remaining, or Gorging Form with a Pikachu in its mouth if it has 1/2 or less of its maximum HP remaining. If Cramorant gets hit in Gulping or Gorging Form, it spits the Arrokuda or Pikachu at its attacker, even if it has no HP remaining. The projectile deals damage equal to 1/4 of the target's maximum HP, rounded down; this damage is blocked by the Magic Guard Ability but not by a substitute. An Arrokuda also lowers the target's Defense and Special Defense by 1 stage, and a Pikachu lowers the target's Speed by 2 stage. Cramorant will return to normal if it spits out a projectile, switches out, or Dynamaxes.",
		shortDesc: "When hit after Surf/Dive, attacker takes 1/4 max HP and -1 Defenses or -2 Speed.",
	},
	hadronengine: {
		inherit: true,
		onStart(pokemon) {
			// why?
			// if (!this.field.setTerrain('electricterrain') && this.field.isTerrain('electricterrain')) {
			// 	this.add('-activate', pokemon, 'ability: Hadron Engine');
			// }

			// not quite sure but i think this should work
			if (this.field.setTerrain('electricterrain')) {
				// do nothing
			} else if (this.field.isTerrain('electricterrain')) {
				this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
			}
		},
		onTerrainChange(pokemon) {
			if (pokemon.transformed) return;
			if (this.field.isTerrain('electricterrain')) {
				pokemon.addVolatile('hadronengine');
			} else {
				pokemon.removeVolatile('hadronengine');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['hadronengine'];
			this.add('-end', pokemon, 'Hadron Engine', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				this.add('-activate', pokemon, 'ability: Hadron Engine');
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'hadronengine' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Hadron Engine atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Hadron Engine def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Hadron Engine spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Hadron Engine spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Hadron Engine spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Hadron Engine');
			},
		},
		onModifySpAPriority: undefined,
		onModifySpA(atk, attacker, defender, move) {},
		shortDesc: "Summons Electric Terrain. Electric Terrain active: highest stat is 1.3x, 1.5x if Speed.",
	},
	magician: {
		inherit: true,
		onAfterMoveSecondarySelf(source, target, move) {},
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Magician');
		},
		onTryMove(source, target, move) {
			if (move.category !== 'Status') {
				target.addVolatile('magician');
			}
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.singleEvent('End', pokemon.getItem(), pokemon.itemState, pokemon);
			},
			onResidualOrder: 4,
			onResidualSubOrder: 2,
		},
		desc: "This Pokemon's attacks and their effects ignore certain Items of other Pokemon.",
		shortDesc: "This Pokemon's attacks and their effects ignore the Items of other Pokemon.",
	},
	neuroforce: {
		inherit: true,
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify(1.5);
			}
		},
		desc: "This Pokemon's attacks that are super effective against the target have their damage multiplied by 1.5.",
		shortDesc: "This Pokemon's attacks that are super effective against the target do 1.5x damage.",
	},
	neutralizinggas: {
		inherit: true,
		// Ability suppression cancelled in scripts.ts
		// new Ability suppression implemented in scripts.ts
		onPreStart(pokemon) {},
		onEnd(source) {},
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Neutralizing Gas');
		},
		// onModifyPriority implemented in relevant abilities
		onFoeBeforeMovePriority: 13,
		onFoeBeforeMove(attacker, defender, move) {
			attacker.addVolatile('neutralizinggas');
		},
		condition: {
			onAfterMove(pokemon) {
				pokemon.removeVolatile('neutralizinggas');
			},
		},
		desc: "While this Pokemon is active, opposing Pokemon's moves and their effects ignore its own Ability. Does not affect the As One, Battle Bond, Comatose, Disguise, Gulp Missile, Ice Face, Multitype, Power Construct, RKS System, Schooling, Shields Down, Stance Change, or Zen Mode Abilities.",
		shortDesc: "While this Pokemon is active, opposing Pokemon's Ability has no effect when it uses moves.",
	},
	orichalcumpulse: {
		inherit: true,
		onStart(pokemon) {
			if (this.field.setWeather('sunnyday')) {
				// do nothing
			} else if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
			}
		},
		onWeatherChange(pokemon) {
			if (pokemon.transformed) return;
			if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				pokemon.addVolatile('orichalcumpulse');
			} else {
				pokemon.removeVolatile('orichalcumpulse');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['orichalcumpulse'];
			this.add('-end', pokemon, 'Orichalcum Pulse', '[silent]');
		},
		onModifyAtkPriority: undefined,
		onModifyAtk(atk, pokemon) {},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				this.add('-activate', pokemon, 'ability: Orichalcum Pulse');
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'orichalcumpulse' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Orichalcum Pulse atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Orichalcum Pulse def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Orichalcum Pulse spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Orichalcum Pulse spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Orichalcum Pulse spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Orichalcum Pulse');
			},
		},
		shortDesc: "Summons Sunny Day. Sunny Day active: highest stat is 1.3x, 1.5x if Speed.",
	},
	prankster: {
		// for ngas
		inherit: true,
		onModifyPriority(priority, pokemon, target, move) {
			for (const poke of this.getAllActive()) {
				if (poke.hasAbility('neutralizinggas') && poke.side.id !== pokemon.side.id &&
					!poke.volatiles['gastroacid'] && !poke.transformed) {
					return;
				}
			}
			if (move?.category === 'Status') {
				move.pranksterBoosted = true;
				return priority + 1;
			}
		},
	},
	protosynthesis: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protosynthesis', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protosynthesis');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Protosynthesis atk boost');
				return this.chainModify(1.5);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Protosynthesis def boost');
				return this.chainModify(1.5);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Protosynthesis spa boost');
				return this.chainModify(1.5);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Protosynthesis spd boost');
				return this.chainModify(1.5);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Protosynthesis spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		desc: "If Sunny Day is active or this Pokemon uses a held Booster Energy, this Pokemon's highest stat is multiplied by 1.5. Stat stage changes are considered at the time this Ability activates. If multiple stats are tied, Attack, Defense, Special Attack, Special Defense, and Speed are prioritized in that order. If this effect was started by Sunny Day, a held Booster Energy will not activate and the effect ends when Sunny Day is no longer active. If this effect was started by a held Booster Energy, it ends when this Pokemon is no longer active.",
		shortDesc: "Sunny Day active or Booster Energy used: highest stat is 1.5x.",
	},
	purepower: {
		inherit: true,
		onModifyAtkPriority: undefined,
		onModifyAtk(atk) {},
		onModifyBoost(boosts, pokemon) {
			boosts['atk'] = Math.max(0, boosts['atk']!);
			boosts['def'] = Math.max(0, boosts['def']!);
			boosts['spa'] = Math.max(0, boosts['spa']!);
			boosts['spd'] = Math.max(0, boosts['spd']!);
			// todo: test this and think if it should modify spe
		},
		// according to designer (anaconja)
		onModifyMove(move) {
			move.mindBlownRecoil = false;
		},
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		shortDesc: "This Pokemon's attacks ignore its own stat drops and have no recoil.",
	},
	quarkdrive: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Quark Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Quark Drive');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Quark Drive atk boost');
				return this.chainModify(1.5);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Quark Drive def boost');
				return this.chainModify(1.5);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Quark Drive spa boost');
				return this.chainModify(1.5);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Quark Drive spd boost');
				return this.chainModify(1.5);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Quark Drive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		desc: "If Electric Terrain is active or this Pokemon uses a held Booster Energy, this Pokemon's highest stat is multiplied by 1.5. Stat stage changes are considered at the time this Ability activates. If multiple stats are tied, Attack, Defense, Special Attack, Special Defense, and Speed are prioritized in that order. If this effect was started by Electric Terrain, a held Booster Energy will not activate and the effect ends when Electric Terrain is no longer active. If this effect was started by a held Booster Energy, it ends when this Pokemon is no longer active.",
		shortDesc: "Electric Terrain active or Booster Energy used: highest stat is 1.5x.",
	},
	shadowtag: {
		inherit: true,
		onFoeTrapPokemon(pokemon) {},
		onFoeMaybeTrapPokemon(pokemon, source) {},
		onDamagingHit(damage, target, source, move) {
			if ((!source.hasType('Ghost')) && source.addType('Ghost')) {
				this.add('-start', source, 'typeadd', 'Ghost', '[from] ability: Shadow Tag');
			}
		},
		desc: "When this Pokemon is hit by an attack, the attacker gains Ghost type.",
		shortDesc: "If this Pokemon is hit, the attacker gains Ghost type.",
	},
	swordofruin: {
		inherit: true,
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Sword of Ruin');
			this.add('-message', '(In mbhv4, ruin abilities weaken the certain stat of all active Pokemon.)');
		},
		onAnyModifyDef(def, target, source, move) {
			const abilityHolder = this.effectState.target;
			if (!move.ruinedDef) move.ruinedDef = abilityHolder;
			if (move.ruinedDef !== abilityHolder) return;
			this.debug('Sword of Ruin Def drop');
			// TODO Placeholder
			return this.chainModify(0.75);
		},
		shortDesc: "The Defense stat of all active Pokemon is multiplied by 0.75.",
	},
	tabletsofruin: {
		inherit: true,
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Tablets of Ruin');
			this.add('-message', '(In mbhv4, ruin abilities weaken the certain stat of all active Pokemon.)');
		},
		onAnyModifyAtk(atk, source, target, move) {
			// the original implement of this ability is different from the first 2 ruin abilities, why?
			// but yea we should use this
			const abilityHolder = this.effectState.target;
			if (!move.ruinedAtk) move.ruinedAtk = abilityHolder;
			if (move.ruinedAtk !== abilityHolder) return;
			this.debug('Tablets of Ruin Atk drop');
			// TODO Placeholder
			return this.chainModify(0.75);
		},
		shortDesc: "The Attack stat of all active Pokemon is multiplied by 0.75.",
	},
	triage: {
		inherit: true,
		onModifyPriority(priority, pokemon, target, move) {
			// for ngas
			for (const poke of this.getAllActive()) {
				if (poke.hasAbility('neutralizinggas') && poke.side.id !== pokemon.side.id &&
					!poke.volatiles['gastroacid'] && !poke.transformed) {
					return;
				}
			}
			if (move?.flags['heal']) return priority + 1;
		},
		shortDesc: "This Pokemon's healing moves have their priority increased by 1.",
	},
	vesselofruin: {
		inherit: true,
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Vessel of Ruin');
			this.add('-message', '(In mbhv4, ruin abilities weaken the certain stat of all active Pokemon.)');
		},
		onAnyModifySpA(spa, source, target, move) {
			const abilityHolder = this.effectState.target;
			if (!move.ruinedSpA) move.ruinedSpA = abilityHolder;
			if (move.ruinedSpA !== abilityHolder) return;
			this.debug('Vessel of Ruin SpA drop');
			// TODO Placeholder
			return this.chainModify(0.75);
		},
		shortDesc: "The Special Attack stat of all active Pokemon is multiplied by 0.75.",
	},
	waterbubble: {
		inherit: true,
		onSourceModifyAtkPriority: undefined,
		onSourceModifyAtk(atk, attacker, defender, move) {},
		onSourceModifySpAPriority: undefined,
		onSourceModifySpA(atk, attacker, defender, move) {},
		onModifyAtk(atk, attacker, defender, move) {},
		onModifySpA(atk, attacker, defender, move) {},
		isBreakable: false, // accoding to designer (akira)
		// ignoring weather implemented in conditions.ts
		onModifyMove(move) {
			if (move.type === 'Water') {
				this.debug('Water Bubble modification');
				move.ignoreAbility = true;
				move.ignoreDefensive = true;
				move.ignoreEvasion = true;
			}
		},
		onTryMove(source, target, move) {
			if (move.type === 'Water') {
				// ignoring items effect moved to magician
				target.addVolatile('magician');
			}
		},
		desc: "This Pokemon's Water-type moves ignore the effect of weather, abilities, target's stat changes, and target's items. This Pokemon cannot be burned. Gaining this Ability while burned cures it.",
		shortDesc: "Water moves ignore weather, abilities, target's stat changes and items; No burns.",
	},
};
