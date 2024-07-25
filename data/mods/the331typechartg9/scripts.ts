export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	init() {
		this.modData("Learnsets", "aurorus").learnset.powergem = ["9L1"];
		this.modData("Learnsets", "quagsire").learnset.scald = ["9L1"];
		this.modData("Learnsets", "silvally").learnset.extremespeed = ["9L1"];
		this.modData("Learnsets", "silvally").learnset.earthquake = ["9L1"];
		this.modData("Learnsets", "silvally").learnset.nastyplot = ["9L1"];
		this.modData("Learnsets", "silvally").learnset.recover = ["9L1"];
	},
};
