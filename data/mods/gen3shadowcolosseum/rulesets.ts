export const Rulesets: import('../../../sim/dex-formats').ModdedFormatDataTable = {
	shadowmechanic: {
		effectType: 'ValidatorRule',
		name: 'Shadow Mechanic',
		desc: "Turns any Pokemon with a Shadow move into a Shadow Pokemon.",
		onBegin() {
			this.add('rule', 'Shadow Mechanic: Turns any Pokemon with a Shadow move into a Shadow Pokemon');
		},
		onStart(pokemon) {
			let shadowCount = 0;
			for (const move of pokemon.moveSlots) {
				if (move.type === 'Shadow') {
					shadowCount++;
					pokemon.addVolatile('shadow');
				}
				if (shadowCount > 0) {
					pokemon.addVolatile('shadow');
				}
			}
		},
		onBasePowerPriority: 1,
		onBasePower(basePower, source, target, move) {
			if (move.type === 'Shadow') {
				if (target.volatiles['shadow']) {
					return this.chainModify(0.5);
				} else {
					return this.chainModify(2);
				}
			}
		},
		/* onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Shadow' && !target.volatiles['shadow']) mod *= 2;
			if (move.type === 'Shadow' && target.volatiles['shadow']) mod /= 2;
			return this.chainModify(mod);
		}, */
	},
};
