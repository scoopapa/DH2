export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ["CU2 OU", "CU2 NFE"],
	},

	init() {
		//removing acid armor from milcery
		delete this.modData('Learnsets', 'milcery').learnset.acidarmor;
	},
};
