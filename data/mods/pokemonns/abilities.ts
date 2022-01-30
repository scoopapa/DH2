export const Abilities: {[k: string]: ModdedAbilityData} = {
	
	// customs

	brawler: {
		name: "Brawler",
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (!attacker.item) {
				this.debug('Brawler boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		shortDesc: "If this Pokemon has no item, its attacks have 1.2x power.",
		rating: 0,
		num: 123001,
	},
	everlasting: {
		name: "Everlasting",
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.field.isTerrain('grassyterrain')) return;
			this.heal(pokemon.maxhp / 16);
		},
		onTerrain(pokemon) {
			if (!this.field.isTerrain('grassyterrain')) return;
			this.heal(pokemon.maxhp / 16);
		},
		shortDesc: "At the end of every turn, the Pokemon restores 1/16 of its max HP.",
		rating: 0,
		num: 123002,
	},
	floataway: {
		name: "Float Away",
		onEmergencyExit(target) {
			if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.switchFlag) return;
			for (const side of this.sides) {
				for (const active of side.active) {
					active.switchFlag = false;
				}
			}
			target.switchFlag = true;
			this.add('-activate', target, 'ability: Emergency Exit');
		},
		shortDesc: "This Pokemon switches out when it reaches 1/2 or less of its maximum HP.",
		rating: 0,
		num: 123003,
	},
	flytrap: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Bug') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Flytrap');
				}
				return null;
			}
		},
		shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Bug moves; Bug immunity.",
		name: "Flytrap",
		rating: 0,
		num: 123004,
	},
	highflight: {
		name: "High Flight",
		onDamage(damage, target, source, effect) {
			if (effect && effect.id === 'stealthrock') {
				return false;
			}
		},
		onTryHit(target, source, move) {
			if (move.type === 'Rock' && !target.activeTurns) {
				this.add('-immune', target, '[from] ability: High Flight');
				return null;
			}
		},
		shortDesc: "On switch-in, this Pokemon avoids all Rock-type attacks and Stealth Rock.",
		rating: 0,
		num: 123005,
	},
	immovable: {
		name: "Immovable",
		shortDesc: "This Pokémon takes 50% from all attacks when paralyzed.",
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (target.status === 'par') {
			mod /= 2;
			}
			return this.chainModify(mod);
		},
		rating: 0,
		num: 123006,
	},
	inksplatter: {
		name: "Ink Splatter",
		shortDesc: "On switch-in, lowers adjacent opponents' Speed by 1 stage.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Ink Splatter', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spe: -1}, target, pokemon, null, true);
				}
			}
		},
		rating: 0,
		num: 123007,
	},
	juggernaut: {
		name: "Juggernaut",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: length}, source);
			}
		},
		onStart(pokemon) {
                pokemon.addVolatile('trapped', pokemon);
       		},
		shortDesc: "Moxie + This Pokemon can’t switch out.",
		rating: 0,
		num: 123008,
	},
	lowflight: {
		name: "Low Flight",
		shortDesc: "User takes half damage when switching in or at full HP.",
		onSourceModifyDamage(damage, source, target, move) {
			if (!target.activeTurns) {
				this.debug('Low Flight weaken');
				return this.chainModify(0.5);
			}
			else if (target.hp >= target.maxhp) {
				this.debug('Low Flight weaken');
				return this.chainModify(0.5);
			}
		},
		rating: 0,
		num: 123009,
	},
	partyanimal: {
		name: "Party Animal",
		desc: "The Pokémon's attacking moves consume 2 PP instead of 1, but their damage is increased by 20%.",
		shortDesc: "The Pokémon's attacking moves consume 2 PP instead of 1, but their damage is increased by 20%.",
		onBasePower(basePower, attacker, defender, move) {
			return this.chainModify(1.2);
		},
		onSourceDeductPP(target, source) {
			if (!source.lastMove || source.lastMove.category === "Status") return;
			this.add('-ability', source, 'Party Animal');
			return 1;
		},
		rating: 0,
		num: 123010,
	},
	quickfix: {
		name: "Quick Fix",
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 4);
		},
		shortDesc: "This Pokemon restores 1/4 of its maximum HP, rounded down, when it switches out.",
		rating: 0,
		num: 123011,
	},
	sonarsensor: {
		name: "Sonar Sensor",
		shortDesc: "On switch-in, Defense or Sp. Def is raised 1 stage based on the foes' weaker Attack.",
		onStart(pokemon) {
			let totalatk = 0;
			let totalspa = 0;
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				totalatk += target.getStat('atk', false, true);
				totalspa += target.getStat('spa', false, true);
			}
			if (totalatk && totalatk >= totalspa) {
				this.boost({def: 1});
			} else if (totalspa) {
				this.boost({spd: 1});
			}
		},
		rating: 0,
		num: 123012,
	},
	spinaround: {
		name: "Spin Around",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (this.effectData.target.activeTurns) return;

			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (this.effectData.target.activeTurns) return;

			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		condition: {
			duration: 1,
		},
		shortDesc: "On switch-in, blocks certain status moves and bounces them back to the user.",
		rating: 0,
		num: 123013,
	},
	stampede: {
		name: "Stampede",
		rating: 0,
		shortDesc: "This Pokémon's Attack rises after it uses an attack that is super effective on the target.",
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && move.category !== 'Status' && target.getMoveHitData(move).typeMod > 0) {
				this.boost({atk: 1}, source);
			}
		},
		num: 123014,
	},
	stubborn: {
		name: "Stubborn",
		shortDesc: "While present, all Pokémon are prevented from healing and Regenerator is suppressed.",
		onStart(source) {
			let activated = false;
			for (const pokemon of this.getAllActive()) {
				if (!activated) {
					this.add('-ability', source, 'Stubborn');
				}
				activated = true;
				if (!pokemon.volatiles['healblock']) {
					pokemon.addVolatile('healblock');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			if (!pokemon.volatiles['healblock']) {
				pokemon.addVolatile('healblock');
			}
		},
		onEnd(pokemon) {
			for (const target of this.getAllActive()) {
				target.removeVolatile('healblock');
			}
		},
		rating: 0,
		num: 123015,
	},
	superglued: {
		name: "Super Glued",
		onTakeItem(item, pokemon, source) {
			if (this.suppressingAttackEvents(pokemon) || !pokemon.hp || pokemon.item === 'stickybarb') return;
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if ((source && source !== pokemon) || this.activeMove.id === 'knockoff') {
				this.add('-activate', pokemon, 'ability: Super Glued');
				return false;
			}
		},
		shortDesc: " This Pokemon cannot lose its held item due to another Pokemon's attack.",
		rating: 0,
		num: 123016,
	},
	vibrato: {
		name: "Vibrato",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.flags['sound'] && !pokemon.volatiles['dynamax']) { // hardcode
				move.type = 'Ground';
			}
		},
		shortDesc: "This Pokemon's sound-based moves become Water type.",
		rating: 0,
		num: 123017,
	},
	weakspotter: {
		name: "Weak Spotter",
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify([0x1400, 0x1000]);
			}
		},
		shortDesc: "On switch-in, Attack or Sp. Atk is raised 1 stage based on the foes' weaker Defense.",
		rating: 0,
		num: 123018,
	},
	winterpower: {
		name: "Winter Power",
		rating: 0,
		shortDesc: "If Hail is active, this Pokemon's Attack and Special Attack are 1.5x.",
		onModifyAtk: function (atk, pokemon) {
            if (this.field.isWeather('hail')) {
                return this.chainModify(1.5);
            }
        },
		onModifySpA: function (spa, pokemon) {
            if (this.field.isWeather('hail')) {
                return this.chainModify(1.5);
            }
        },
		num: 123019,
	},

	// modifications

	arenatrap: {
		name: "Arena Trap",
		onFoeSwitchOut(source, target) {
			for (const target of source.side.foe.active) {
				this.damage(source.baseMaxhp / 4, source, target);
			}
		},
		shortDesc: "Opposing Pokemon loose 1/4 of their maximum HP, rounded down, when it switches out.",
		rating: 5,
		num: 71,
	},
	hypercutter: {
		onBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.atk && boost.atk < 0) {
				delete boost.atk;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "Attack", "[from] ability: Hyper Cutter", "[of] " + target);
				}
			}
		},
		onModifyMove(move) {
			if (!move || !move.flags['contact'] || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				boosts: {
				def: -1,
			},
				ability: this.dex.getAbility('hypercutter'),
			});
		},
		name: "Hyper Cutter",
		shortDesc: "Old effect + This Pokemon's contact moves have a 30% chance to lower the target’s Def by 1 stage.",
		rating: 1.5,
		num: 52,
	},
	moody: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				let statName = 'atk';
				let bestStat = 0;
				let s: StatNameExceptHP;
				for (s in source.storedStats) {
					if (source.storedStats[s] > bestStat) {
						statName = s;
						bestStat = source.storedStats[s];
					}
				}
				this.boost({[statName]: length}, source);
			}
		},
		name: "Moody",
		shortDesc: "This Pokemon's highest stat is raised by 1 if it attacks and KOes another Pokemon.",
		rating: 5,
		num: 141,
	},
	shadowtag: {
		shortDesc: "On switch-in, this Pokemon applies the Fairy Lock status to the target.",
		onTryMove(pokemon) {
			pokemon.addVolatile( 'shadowtag' );
		},
		onFoeTrapPokemon(pokemon) {
			console.log(pokemon.activeTurns);
			let source = this.effectData.target;
			if (source && this.isAdjacent(pokemon, source) && !source.volatiles['shadowtag']) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectData.target;
			if (!source || !this.isAdjacent(pokemon, source) || source.volatiles['shadowtag']) return;
			pokemon.maybeTrapped = true;
		},
		name: "Shadow Tag",
		rating: 5,
		num: 23,
	},
	unnerve: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Unnerve', pokemon.side.foe);
		},
		onFoeTryEatItem: false,
		shortDesc: "While this Pokemon is active, the opponents' held items have no effect.",
		onStart(source) {
			let activated = false;
			for (const pokemon of source.side.foe.active) {
				if (!activated) {
					this.add('-ability', source, 'Unnerve');
				}
				activated = true;
				if (!pokemon.volatiles['embargo']) {
					pokemon.addVolatile('embargo');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			const source = this.effectData.target;
			if (pokemon === source) return;
			for (const target of source.side.foe.active) {
				if (!target.volatiles['embargo']) {
					target.addVolatile('embargo');
				}
			}
		},
		onEnd(pokemon) {
			const source = this.effectData.target;
			for (const target of source.side.foe.active) {
				target.removeVolatile('embargo');
			}
		},
		name: "Unnerve",
		rating: 1.5,
		num: 127,
	},
};
