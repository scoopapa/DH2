const CHOOSABLE_TARGETS = new Set(['normal', 'any', 'adjacentAlly', 'adjacentAllyOrSelf', 'adjacentFoe']);

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen3hoenngaiden',
	gen: 3,

	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['New','S','A1','A2','A3','A4','B1','B2','B3','C1','C2','C3','D','E','Unranked','NFE','LC','Uber','OU','UUBL'],
	},
};
