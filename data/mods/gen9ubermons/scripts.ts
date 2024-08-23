export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init() {
		this.modData("Learnsets", "landorus").learnset.airslash = ["9L1"];
		delete this.modData('Learnsets', 'landorus').learnset.sludgebomb;
		delete this.modData('Learnsets', 'landorus').learnset.sludgewave;
		delete this.modData('Learnsets', 'kubfu').learnset.swordsdance;
		delete this.modData('Learnsets', 'urshifu').learnset.swordsdance;
		delete this.modData('Learnsets', 'urshifurapidstrike').learnset.swordsdance;
	},
};