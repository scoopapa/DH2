export const Scripts: ModdedBattleScriptsData = {
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['WLB'],
	},
	init() {
		this.modData('Learnsets', "articuno").learnset.elementaltempest = ["9L1"];
		this.modData('Learnsets', "zapdos").learnset.elementaltempest = ["9L1"];
		this.modData('Learnsets', "moltres").learnset.elementaltempest = ["9L1"];
		this.modData('Learnsets', "articunogalar").learnset.elementaltempest = ["9L1"];
		this.modData('Learnsets', "zapdosgalar").learnset.elementaltempest = ["9L1"];
		this.modData('Learnsets', "moltresgalar").learnset.elementaltempest = ["9L1"];
		this.modData('Learnsets', "lumiquatrogalar").learnset.elementaltempest = ["9L1"];
		this.modData('Learnsets', "lumiquatro").learnset.elementaltempest = ["9L1"];
		this.modData('Learnsets', "articunogalar").learnset.hiddenpower = ["9L1"];
	},
};
