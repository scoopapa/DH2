export const Scripts: ModdedBattleScriptsData = {
	gen: 7,
	init: function () {
		for (const id in this.dataCache.Pokedex) {
			let unbanlist = this.dataCache.Formats['gen7dlcmons'].unbanlist;
			let speciesName = this.dataCache.Pokedex[id].name;
			if (!unbanlist.includes(speciesName)) {
				// if (this.dataCache.FormatsData[id] !== undefined) this.dataCache.FormatsData[id].tier = "Illegal";
			}
		}
		this.modData('Learnsets', 'kommoo').learnset.clangoroussoul = ['7T'];
	},
};
