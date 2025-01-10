export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	soulfulnoise: {
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.flags['sound']) {
				this.heal(pokemon.baseMaxhp / 8, pokemon);
			}
		},
		flags: {},
		name: "Soulful Noise",
		rating: 3.5,
		shortDesc: "Every time this Pokemon successfully uses a sound move, it heals 12.5% of its max HP.",
	},
	uptime: {
		onUpdate(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.disabled) {
					pokemon.addVolatile('uptime');
				}
			}
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-ability', pokemon, 'Uptime');
				this.add('-message', `${pokemon.name}'s next move will have +1 priority!`);
			},
			onModifyPriority(priority, pokemon, target, move) {
				return priority + 1;
			},
		},
		flags: {},
		name: "Uptime",
		rating: 3.5,
		shortDesc: "If any of this Pokemon's moves are disabled, this Pokemon's next move has +1 priority.",
	},
	sinkorswim: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Sink or Swim', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spe: -1}, target, pokemon, null, true);
				}
			}
		},
		flags: {},
		name: "Sink or Swim",
		rating: 3.5,
		shortDesc: "On switch-in, this Pokemon lowers the Speed of opponents by 1 stage.",
	},
	energizer: {
		name: "Energizer",
	   onFaint(pokemon) {
			pokemon.side.addSlotCondition(pokemon, 'energizer');
	   },
	   condition: {
			onSwap(target) {
				 if (!target.fainted) {
					const source = this.effectState.source;
					const damage = this.heal(target.baseMaxhp / 4, target, target);
					this.add('-anim', target, "Charge", target);
					if (damage) this.add('-heal', target, target.getHealth, '[from] ability: Energizer', '[of] ' + this.effectState.source);
					target.cureStatus();
					target.side.removeSlotCondition(target, 'energizer');
				 }
			},
	   },
		flags: {},
		rating: 3,
		shortDesc: "On switch out, replacement heals 25% of their max HP and cures its status.",
	},
};
