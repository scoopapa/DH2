export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	inherit: 'gen7',
	gen: 7,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['Kalos', 'Kalos (NFE)', 'Kalos Uber'],
		customDoublesTiers: ['Kalos', 'Kalos (NFE)'],
	},
	init() {},
};
