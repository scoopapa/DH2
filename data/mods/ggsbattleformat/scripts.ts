export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	init() {
		//New signature moves (by dex number order)
		this.modData('Learnsets', 'dugtrio').learnset.tripledig = ['9L1'];
	}
};
