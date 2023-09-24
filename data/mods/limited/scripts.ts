export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	inherit: 'gen9',
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['LOU'],
	},
	init() {
		this.modData("Learnsets", "rotom").learnset.recover = ["9L1"];
		this.modData("Learnsets", "tinkaton").learnset.slackoff = ["9L1"];
	},
};