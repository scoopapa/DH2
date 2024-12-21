export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	inherit: 'gen8',
	gen: 8,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['Kalos', 'Kalos (NFE)', 'Kalos Uber'],
		customDoublesTiers: ['Kalos', 'Kalos (NFE)'],
	},
	init() {},
};
