export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	init() {
		this.modData("Learnsets", "swablu").learnset.willowisp = ["9L1"];
		this.modData("Learnsets", "swablu").learnset.bodypress = ["9L1"];
		this.modData("Learnsets", "swablu").learnset.encore = ["9L1"];
		this.modData("Learnsets", "slugma").learnset.surginglava = ["9L1"];
		delete this.modData('Learnsets', 'slugma').learnset.lightscreen;
		delete this.modData('Learnsets', 'slugma').learnset.reflect;
		this.modData("Learnsets", "gastly").learnset.drainingkiss = ["9L1"];
		this.modData("Learnsets", "gastly").learnset.psychicnoise = ["9L1"];
		delete this.modData('Learnsets', 'gastly').learnset.energyball;
		delete this.modData('Learnsets', 'gastly').learnset.dazzlinggleam;
		delete this.modData('Learnsets', 'gastly').learnset.nastyplot;
		this.modData("Learnsets", "sprigatito").learnset.flowertrick = ["9L1"];
		this.modData("Learnsets", "sprigatito").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "meowthgalar").learnset.slackoff = ["9L1"];
		this.modData("Learnsets", "tepig").learnset.slackoff = ["9L1"];
		this.modData("Learnsets", "tepig").learnset.earthquake = ["9L1"];
		this.modData("Learnsets", "tepig").learnset.highhorsepower = ["9L1"];
		this.modData("Learnsets", "tepig").learnset.stealthrock = ["9L1"];
		this.modData("Learnsets", "dreepy").learnset.willowisp = ["9L1"];
		this.modData("Learnsets", "dreepy").learnset.dragonclaw = ["9L1"];
		this.modData("Learnsets", "dreepy").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "dreepy").learnset.hex = ["9L1"];
		this.modData("Learnsets", "dreepy").learnset.psychicfangs = ["9L1"];
	},
};
