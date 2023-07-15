export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init: function () {
		this.modData("Learnsets", "sceptile").learnset.flipturn = ['8L1'];
		this.modData("Learnsets", "sceptile").learnset.liquidation = ['8L1'];
		this.modData("Learnsets", "sceptile").learnset.aquajet = ['8L1'];
		delete this.modData('Learnsets', 'sceptile').learnset.irontail;
		delete this.modData('Learnsets', 'sceptile').learnset.agility;
		delete this.modData('Learnsets', 'sceptile').learnset.furycutter;
		this.modData("Learnsets", "charizard").learnset.uturn = ['8L1'];
		this.modData("Learnsets", "inteleon").learnset.knockoff = ['8L1'];
		this.modData("Learnsets", "inteleon").learnset.poisonjab = ['8L1'];
		this.modData("Learnsets", "inteleon").learnset.sludgebomb = ['8L1'];
		this.modData("Learnsets", "inteleon").learnset.toxic = ['8L1'];
		this.modData("Learnsets", "inteleon").learnset.recover = ['8L1'];
		this.modData("Learnsets", "lanturn").learnset.nuzzle = ['8L1'];
		this.modData("Learnsets", "lanturn").learnset.flipturn = ['8L1'];
		this.modData("Learnsets", "larvesta").learnset.defog = ['8L1'];
		this.modData("Learnsets", "carbink").learnset.painsplit = ['8L1'];
		this.modData("Learnsets", "sableye").learnset.defog = ['8L1'];
		this.modData("Learnsets", "sableye").learnset.teleport = ['8L1'];
		this.modData("Learnsets", "sableye").learnset.thunderwave = ['8L1'];
		this.modData("Learnsets", "hatterene").learnset.moonblast = ['8L1'];
		this.modData("Learnsets", "hatterene").learnset.recover = ['8L1'];
		this.modData("Learnsets", "hatterene").learnset.teleport = ['8L1'];
		this.modData("Learnsets", "raticatealola").learnset.gunkshot = ['8L1'];
		this.modData("Learnsets", "raticatealola").learnset.poisonjab = ['8L1'];
		this.modData("Learnsets", "raticatealola").learnset.drillrun = ['8L1'];
		this.modData("Learnsets", "lapras").learnset.teleport = ['8L1'];
		this.modData("Learnsets", "lapras").learnset.flipturn = ['8L1'];
		this.modData("Learnsets", "lapras").learnset.recover = ['8L1'];
		delete this.modData('Learnsets', 'sableye').learnset.willowisp;
	},
};