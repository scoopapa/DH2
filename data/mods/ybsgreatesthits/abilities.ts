export const Abilities: {[k: string]: ModdedAbilityData} = {
	psylink: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Psylink');
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Psychic') return;
			if (!move.auraBooster) move.auraBooster = this.effectData.target;
			if (move.auraBooster !== this.effectData.target) return;
			return this.chainModify([move.hasAuraBreak ? 0x0C00 : 0x1547, 0x1000]);
		},
		name: "Psylink",
	},
};
