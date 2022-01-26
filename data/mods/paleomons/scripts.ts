export const Scripts: {[k: string]: ModdedBattleScriptsData} = {

	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['Paleomons', 'Paleomons NFE', 'Paleomons LC'],
		customDoublesTiers: ['Paleomons', 'Paleomons NFE', 'Paleomons LC'],
	},

	pokemon: {
		runEffectiveness(move: ActiveMove) {
			let totalTypeMod = 0;
			for (const type of this.getTypes()) {
				if (type === 'Fairy' && (move as any).carboniferousBoosted) {
					totalTypeMod += 1;
				} else {
					let typeMod = this.battle.dex.getEffectiveness(move, type);
					typeMod = this.battle.singleEvent('Effectiveness', move, null, this, type, move, typeMod);
					totalTypeMod += this.battle.runEvent('Effectiveness', this, type, move, typeMod);
				}
			}
			return totalTypeMod;
		},
	},
};