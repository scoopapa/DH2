declare module '../../../sim/dex-species' {
	interface Species {
		mons?: [any, string[], string[]?][] | null;
		hasMons?: true | null;
	}
};
declare module '../../../sim/pokemon' {
	interface Pokemon {
		isTandem?: true | null;
	}
};

export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	// @ts-expect-error client only
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['Head'],
	},
};
