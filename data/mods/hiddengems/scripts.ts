export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	init() {
		this.modData("Learnsets", "galvantula").learnset.staticshield = ["9L1"];
		this.modData("Learnsets", "ambipom").learnset.closecombat = ["9L1"];
		this.modData("Learnsets", "ambipom").learnset.encore = ["9L1"];
		this.modData("Learnsets", "ambipom").learnset.tailslap = ["9L1"];
	},
};
