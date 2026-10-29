export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['santa'],
	},
	init() {
		this.modData("Learnsets", "flygon").learnset.dragonhammer = ["9L1"];
		this.modData("Learnsets", "arctovish").learnset.thulianmaw = ["9L1"];
		this.modData("Learnsets", "arctovish").learnset.polarflare = ["9L1"];
		this.modData("Learnsets", "arctovish").learnset.relicsong = ["9L1"];
		this.modData("Learnsets", "golduck").learnset.shadowball = ["9L1"];
		this.modData("Learnsets", "golduck").learnset.painsplit = ["9L1"];
		this.modData("Learnsets", "golduck").learnset.hex = ["9L1"];
		this.modData("Learnsets", "golduck").learnset.thunderwave = ["9L1"];
		this.modData("Learnsets", "golduck").learnset.expandingforce = ["9L1"];
		this.modData("Learnsets", "golduck").learnset.shadowsneak = ["9L1"];
		this.modData("Learnsets", "golduck").learnset.recover = ["9L1"];
		this.modData("Learnsets", "golduck").learnset.thunderbolt = ["9L1"];
		this.modData("Learnsets", "quagsire").learnset.wavecrash = ["9L1"];
		this.modData("Learnsets", "drapion").learnset.ceaselessedge = ["9L1"];
		this.modData("Learnsets", "drapion").learnset.suckerpunch = ["9L1"];
		this.modData("Learnsets", "drapion").learnset.sacredsword = ["9L1"];
		this.modData("Learnsets", "drapion").learnset.aquacutter = ["9L1"];
	},
};
