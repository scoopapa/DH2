export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	init() {
		this.modData("Learnsets", "golduck").learnset.expandingforce = ["9L1"];
		this.modData("Learnsets", "golduck").learnset.psychicterrain = ["9L1"];
		this.modData("Learnsets", "carbink").learnset.earthquake = ["9L1"];
		this.modData("Learnsets", "carbink").learnset.suckerpunch = ["9L1"];
	},
};
