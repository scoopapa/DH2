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
		desc: "This Pokemon is immune to Electric-type moves and restores 1/4 of its maximum HP, rounded down, when hit by an Electric-type move.",
		shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Electric moves; Electric immunity.",
		onTryHit(target, source, move) {
			if (target !== source && source.types.contains(move.type)) {
        this.add('-immune', target, '[from] ability: Camo');
				return null;
			}
		},
		name: "Volt Absorb",
		rating: 3.5,
		num: 10,
	},
	embargoact: {
		shortDesc: "As long as the Pokémon is on the field, its opponent's item does not function.",
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
		onStart(pokemon) {
			onAfterMoveSecondarySelfPriority: -1,
			onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.category !== 'Status') {
				this.heal(pokemon.lastDamage / 8, pokemon);
			}
		},
		name: "Terror",
	},
	exhaust: {
		desc: "If this Pokemon is the target of an opposing Pokemon's move, that move loses one additional PP.",
		shortDesc: "If this Pokemon is the target of a foe's move, that move loses one additional PP.",
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
		desc: "If the last item this Pokemon used is a Berry, there is a 50% chance it gets restored at the end of each turn. If Sunny Day is active, this chance is 100%.",
		shortDesc: "If last item used is a Berry, 50% chance to restore it each end of turn. 100% in Sun.",
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
	
		// let statName = 'atk';
		// let bestStat = 0;
		// let s: StatNameExceptHP;
		// for (s in source.storedStats) {
			// if (source.storedStats[s] > bestStat) {
				// statName = s;
				// bestStat = source.storedStats[s];
			// }
		// }
		// this.boost({[statName]: length}, source);
};

exports.BattleAbilities = BattleAbilities;
