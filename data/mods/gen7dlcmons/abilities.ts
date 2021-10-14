export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	sifting: {
		shortDesc: "The Pokémon can switch out during a semi-invulnerable turn.",
		name: "Sifting",
		// implemented in conditions.ts
		rating: 3,
		num: -1001,
	},
	zerogravity: {
		onModifyMove(move) {
			if (move.flags['contact']) {
				move.accuracy = true;
			}
		},
		shortDesc: "The user's contact moves never miss.",
		name: "Zero Gravity",
		rating: 3,
		num: -1002,
	},
	joust: {
		onAnyBasePowerPriority: 21,
		onAnyBasePower(basePower, pokemon) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (!this.queue.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				this.debug('Joust boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		shortDesc: "The attacks of the first Pokémon to move in a turn have 1.3x power.",
		name: "Joust",
		rating: 2.5,
		num: -1003,
	},
	hiddenpassage: {
		onSourceModifyDamage(damage, source, target, move) {
			if (!target.activeTurns) {
				this.debug('Hidden Passage weaken');
				return this.chainModify(0.5);
			}
		},
		shortDesc: "User takes half damage when switching in.",
		name: "Hidden Passage",
		rating: 5,
		num: -1004,
	},
};