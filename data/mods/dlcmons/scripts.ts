export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 6,
	inherit: 'gen6',
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['Kalos', 'Kalos (NFE)', 'Kalos Uber'],
		customDoublesTiers: ['Kalos', 'Kalos (NFE)'],
	},
	init() {},
};
