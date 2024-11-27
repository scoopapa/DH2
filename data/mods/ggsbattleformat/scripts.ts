export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
	},
	init() {
		this.modData('Learnsets', 'dugtrio').learnset.tripledig = ['9L1'];
	}
};
