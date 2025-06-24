export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['DAF'],
		customDoublesTiers: ['DAF'],
	},
	
	//adapting Nihilslaves's Createmons script
	spreadModify(baseStats: StatsTable, set: PokemonSet): StatsTable {
		const modStats: SparseStatsTable = {hp: 10, atk: 10, def: 10, spa: 10, spd: 10, spe: 10};
		const tr = this.trunc;
		let statName: keyof StatsTable;
		for (statName in modStats) {
			const stat = baseStats[statName];
			modStats[statName] = tr(2 * stat + 31 + set.evs[statName]/4) + 5;
		}
		if ('hp' in baseStats) {
			const stat = baseStats['hp'];
			modStats['hp'] = tr(2 * stat + 31 + set.evs['hp']/4 + 100) + 10;
		}
		return this.natureModify(modStats as StatsTable, set);
	},	
};

