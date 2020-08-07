export const BattleAbilities: {[k: string]: ModdedAbilityData} = {
	triggerfinger: {
		shortDesc: "Upon entering the field, this pokemon's first move has +1 priority.",
		onModifyPriority(priority, pokemon, target, move) {
		  if (pokemon.activeMoveActions < 1) {
			move.pranksterBoosted = true;
			return priority + 1;
		  }
		},
		name: "Trigger Finger",
		rating: 4,
		num: 158,
	},
	camo: {
		desc: "The Pokémon is immune to moves of its own types..",
		shortDesc: "The Pokémon is immune to moves of its own types..",
		onTryHit(target, source, move) {
			if (target !== source && source.types.contains(move.type)) {
				this.add('-immune', target, '[from] ability: Camo');
				return null;
			}
		},
		name: "Camo",
		rating: 3.5,
		num: 10,
	},
	embargoact: {
		shortDesc: "As long as the Pokémon is on the field, its opponent's item does not function..",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Embargo Act');
		},
		// Item suppression implemented in Pokemon.ignoringItem() within sim/pokemon.js
		onResidualOrder: 18,
		name: "Embargo Act",
	},
	terror: {
		shortDesc: "When the Pokémon enters, its opponent's Speed is reduced by one stage.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Terror', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spe: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Terror",
	},
	adaptive: {
		shortDesc: "After taking damage (except passive damage such as burns), the Pokémon's HP is restored by 1/8 of the damage taken.",
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.category !== 'Status') {
				this.heal(pokemon.lastDamage / 4, pokemon);
			}
		},
		name: "Adaptive",
	},
	exhaust: {
		desc: "The Pokémon's attacking moves consume 2 PP instead of 1, but their damage is increased by 20%..",
		shortDesc: "The Pokémon's attacking moves consume 2 PP instead of 1, but their damage is increased by 20%..",
		onDeductPP(target, source) {
			if (target.side !== source.side) return;
			return 1;
		},
		onAllyBasePowerPriority: 8,
		onAllyBasePower(basePower, attacker, defender, move) {
			return this.chainModify(1.2);
		},
		name: "Exhaust",
		rating: 2.5,
		num: 46,
	},
	forager: {
		desc: "Gluttony effect + The Pokémon recycles any Berry it has consumed when it switches out.",
		shortDesc: "Gluttony effect + The Pokémon recycles any Berry it has consumed when it switches out.",
		name: "Forager",
		onSwitchOut(pokemon) {
			if (pokemon.hp && !pokemon.item && this.dex.getItem(pokemon.lastItem).isBerry) {
				pokemon.setItem(pokemon.lastItem);
				pokemon.lastItem = '';
				this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Harvest');
			}
		},
		rating: 2.5,
		num: 139,
	},
	inextremis: {
		desc: "When this Pokemon has more than 1/2 its maximum HP and takes damage from an attack bringing it to 1/2 or less of its maximum HP, its Special Attack is raised by 1 stage. This effect applies after all hits from a multi-hit move; Sheer Force prevents it from activating if the move has a secondary effect.",
		shortDesc: "This Pokemon's Sp. Atk is raised by 1 when it reaches 1/2 or less of its max HP.",
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
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
		name: "In Extremis",
		rating: 2.5,
		num: 201,
	},
	prepared: {
		desc: "On switch-in, this Pokemon is alerted if any opposing Pokemon has an attack that is super effective on this Pokemon, or an OHKO move. Counter, Metal Burst, and Mirror Coat count as attacking moves of their respective types, Hidden Power counts as its determined type, and Judgment, Multi-Attack, Natural Gift, Revelation Dance, Techno Blast, and Weather Ball are considered Normal-type moves.",
		shortDesc: "On switch-in, this Pokemon shudders if any foe has a supereffective or OHKO move.",
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.getMove(moveSlot.move);
					if (move.category === 'Status') continue;
					const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
					if (
						this.dex.getImmunity(moveType, pokemon) && this.dex.getEffectiveness(moveType, pokemon) > 0 ||
						move.ohko
					) {
						this.add('-ability', pokemon, 'Prepared');
						this.heal(pokemon.baseMaxhp / 4)
						return;
					}
				}
			}
		},
		name: "Prepared",
		rating: 0.5,
		num: 107,
	},
	countershield: {
		shortDesc: "When the Pokémon is hit by a super effective move, the move's damage is reduced by 1/4, and the attacker's HP is reduced by 1/8.",
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Counter Shield neutralize');
				this.damage(source.baseMaxhp / 8, source, target);
				return this.chainModify(0.75);
			}
		},
		name: "Counter Shield",
		rating: 3,
		num: 111,
	},
	identitytheft: {
		shortDesc: "Pokemon making contact with this Pokemon have their Ability swapped with this one.",
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && move.category !== 'Status') {
				if (['illusion', 'neutralizinggas', 'identitytheft', 'wonderguard'].includes(source.ability)) return;
				if (move.flags['contact']) {
					const sourceAbility = source.setAbility('identitytheft', target);
					if (!sourceAbility) return;
					if (target.side === source.side) {
						this.add('-activate', target, 'Skill Swap', '', '', '[of] ' + source);
					} else {
						this.add('-activate', target, 'ability: Identity Theft', this.dex.getAbility(sourceAbility).name, 'Identity Theft', '[of] ' + source);
					}
					target.setAbility(sourceAbility);
				}
			}
		},
		name: "Identity Theft",
		rating: 2.5,
		num: 254,
	},
	lagbehind: {
		shortDesc: "This Pokemon moves last among Pokemon using the same or greater priority moves.",
		onFractionalPriority: -0.1,
		onBasePower(basePower, attacker, defender, move) {
			return this.chainModify(1.3);
		},
		name: "Lag Behind",
		rating: -1,
		num: 100,
	},
	terror: {
		desc: "On switch-in, this Pokemon lowers the Speed of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
		shortDesc: "On switch-in, this Pokemon lowers the Speed of adjacent opponents by 1 stage.",
		onStart: function (pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Terror', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target, '[msg]');
				} else {
					this.boost({spe: -1}, target, pokemon);
				}
			}
		},
		id: "terror",
		name: "Terror",
		rating: 3.5,
		num: 22,
	},
	survey: {
		shortDesc: "On switch-in, this Pokemon's Accuracy is raised by 1 stage.",
		onStart(pokemon) {
			this.boost({accuracy: 1}, pokemon);
		},
		name: "Survey",
		rating: 3,
		num: 235,
	},
	contradict: {
		desc: "The physical and special categories of this pokemon's attacks are swapped.",
		shortDesc: "The physical and special categories of this pokemon's attacks are swapped",
		// This should be applied directly to the stat as opposed to chaining with the others
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category === 'Physical') {
				move.category = 'Special';
			} else if (move.category === 'Special') {
				move.category = 'Physical';
			}
		},
		name: "Contradict",
		rating: 3.5,
		num: 55,
	},
	unflagging: {
		desc: "If this Pokemon is poisoned, it restores 1/8 of its maximum HP, rounded down, at the end of each turn instead of losing HP.",
		shortDesc: "This Pokemon is healed by 1/8 of its max HP each turn when poisoned; no HP loss.",
		onDamagePriority: 1,
		onResidualOrder: 8,
		onResidual(pokemon) {
			if (pokemon.status) {
				this.heal(pokemon.baseMaxhp / 16);
			}
		},
		name: "Unflagging",
		rating: 4,
		num: 90,
	},
};

exports.BattleAbilities = BattleAbilities;
