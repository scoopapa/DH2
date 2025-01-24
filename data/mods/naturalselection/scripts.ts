export const Scripts: ModdedBattleScriptsData = {
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ["NS", "Extinct"],
	},
	init() {
		this.modData("Learnsets", "eelektross").learnset.earthpower = ["9L1"];
		this.modData("Learnsets", "eelektross").learnset.earthquake = ["9L1"];
		this.modData("Learnsets", "eelektross").learnset.sludgebomb = ["9L1"];
		this.modData("Learnsets", "eelektross").learnset.stealthrock = ["9L1"];
		this.modData("Learnsets", "eelektross").learnset.spikes = ["9L1"];
		this.modData("Learnsets", "eelektross").learnset.toxic = ["9L1"];
		this.modData("Learnsets", "bouffalant").learnset.bodypress = ["9L1"];
		this.modData("Learnsets", "bouffalant").learnset.bulkup = ["9L1"];
		this.modData("Learnsets", "bouffalant").learnset.headlongrush = ["9L1"];
		this.modData("Learnsets", "bouffalant").learnset.stealthrock = ["9L1"];
		this.modData("Learnsets", "crabominable").learnset.iceshard = ["9L1"];
		this.modData("Learnsets", "crabominable").learnset.machpunch = ["9L1"];
		this.modData("Learnsets", "crabominable").learnset.iciclespear = ["9L1"];
		this.modData("Learnsets", "crabominable").learnset.swordsdance = ["9L1"];
		this.modData("Learnsets", "crabominable").learnset.flipturn = ["9L1"];
		this.modData("Learnsets", "klawf").learnset.crunch = ["9L1"];
		this.modData("Learnsets", "klawf").learnset.darkpulse = ["9L1"];
		this.modData("Learnsets", "klawf").learnset.partingshot = ["9L1"];
		this.modData("Learnsets", "klawf").learnset.taunt = ["9L1"];
	},
};
