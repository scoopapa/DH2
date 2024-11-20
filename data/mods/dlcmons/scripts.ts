export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	inherit: 'gen6',
	gen: 6,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['Kalos', 'Kalos (NFE)', 'Kalos Uber'],
		customDoublesTiers: ['Kalos', 'Kalos (NFE)'],
	},
	init() {},
};
