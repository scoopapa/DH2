export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	inherit: 'gen9',
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['Kalos', 'Kalos (NFE)', 'Kalos Uber'],
		customDoublesTiers: ['Kalos', 'Kalos (NFE)'],
	},
	init() {},
};
