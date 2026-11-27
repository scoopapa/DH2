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

		// Regirock
		this.modData("Learnsets", "regirock").learnset.painsplit = ["9L1"];
		this.modData("Learnsets", "regirock").learnset.spikes = ["9L1"];
		this.modData("Learnsets", "regirock").learnset.headlongrush = ["9L1"];
		this.modData("Learnsets", "regirock").learnset.mantleshaper = ["9L1"];

		// Regice
		this.modData("Learnsets", "regice").learnset.painsplit = ["9L1"];
		this.modData("Learnsets", "regice").learnset.mirrorcoat = ["9L1"];
		this.modData("Learnsets", "regice").learnset.calmmind = ["9L1"];
		this.modData("Learnsets", "regice").learnset.earthpower = ["9L1"];
		this.modData("Learnsets", "regice").learnset.freezingage = ["9L1"];

		// Registeel
		this.modData("Learnsets", "registeel").learnset.painsplit = ["9L1"];
		this.modData("Learnsets", "registeel").learnset.metalburst = ["9L1"];
		this.modData("Learnsets", "registeel").learnset.rapidspin = ["9L1"];
		this.modData("Learnsets", "registeel").learnset.unbreakablesteel = ["9L1"];

		// Regigigas
		this.modData("Learnsets", "regigigas").learnset.explosion = ["9L1"];
		this.modData("Learnsets", "regigigas").learnset.stealthrock = ["9L1"];
		this.modData("Learnsets", "regigigas").learnset.spikes = ["9L1"];
		this.modData("Learnsets", "regigigas").learnset.bind = ["9L1"];
		this.modData("Learnsets", "regigigas").learnset.crushgrip = ["9L1"];

		// Regieleki
		this.modData("Learnsets", "regieleki").learnset.painsplit = ["9L1"];
		this.modData("Learnsets", "regieleki").learnset.hiddenpower = ["9L1"];
		this.modData("Learnsets", "regieleki").learnset.paraboliccharge = ["9L1"];
		this.modData("Learnsets", "regieleki").learnset.iondeluge = ["9L1"];

		// Regidrago
		this.modData("Learnsets", "regidrago").learnset.painsplit = ["9L1"];
		this.modData("Learnsets", "regidrago").learnset.hiddenpower = ["9L1"];
		this.modData("Learnsets", "regidrago").learnset.dragonrage = ["9L1"];
		this.modData("Learnsets", "regidrago").learnset.psychicfangs = ["9L1"];
	},
};
