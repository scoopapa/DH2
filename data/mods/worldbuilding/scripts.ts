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
		this.modData("Learnsets", "raikou").learnset.fakeout = ["9L1"];
		this.modData("Learnsets", "raikou").learnset.spikes = ["9L1"];
		this.modData("Learnsets", "raikou").learnset.incinerate = ["9L1"];
		this.modData("Learnsets", "raikou").learnset.earthquake = ["9L1"];
		this.modData("Learnsets", "entei").learnset.stealthrock = ["9L1"];
		this.modData("Learnsets", "entei").learnset.ragingfury = ["9L1"];
		this.modData("Learnsets", "entei").learnset.magnitude = ["9L1"];
		this.modData("Learnsets", "entei").learnset.temperflare = ["9L1"];
		this.modData("Learnsets", "suicune").learnset.defog = ["9L1"];
		this.modData("Learnsets", "suicune").learnset.flipturn = ["9L1"];
		this.modData("Learnsets", "suicune").learnset.healbell = ["9L1"];
		this.modData("Learnsets", "suicune").learnset.lifedew = ["9L1"];
	},
};
