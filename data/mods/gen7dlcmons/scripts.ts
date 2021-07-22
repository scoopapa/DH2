export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen7',
	init: function () {
		for (const id in this.dataCache.Pokedex) {
			let unbanlist = this.dataCache.Formats['gen7dlcmons'].unbanlist;
			let speciesName = this.dataCache.Pokedex[id].name;
			if (!unbanlist.includes(speciesName)) {
				// if (this.dataCache.FormatsData[id] !== undefined) this.dataCache.FormatsData[id].tier = "Illegal";
			}
		}
		this.modData('Learnsets', 'kommoo').learnset.clangoroussoul = ['7T'];
		
		this.modData('Learnsets', 'tapukoko').learnset.hurricane = ['7T'];
		this.modData('Learnsets', 'tapukoko').learnset.airslash = ['7T'];
		this.modData('Learnsets', 'tapukoko').learnset.tailwind = ['7T'];
		
		this.modData('Learnsets', 'tapulele').learnset.leechlife = ['7T'];
		this.modData('Learnsets', 'tapulele').learnset.strengthsap = ['7T'];
		
		this.modData('Learnsets', 'tapubulu').learnset.stealthrock = ['7T'];
		
		this.modData('Learnsets', 'tapufini').learnset.smartstrike = ['7T'];
		this.modData('Learnsets', 'tapufini').learnset.swordsdance = ['7T'];
		this.modData('Learnsets', 'tapufini').learnset.playrough = ['7T'];
	},
};