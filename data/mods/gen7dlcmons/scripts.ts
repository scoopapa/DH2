export const Scripts: ModdedBattleScriptsData = {
	gen: 7,
	init: function () {
		for (const id in this.dataCache.Pokedex) {
			do {
				console.log(id);
				if (this.dataCache.FormatsData[id] !== undefined) this.dataCache.FormatsData[id].tier = "Illegal";
			}
			while (!this.dataCache.Pokedex[id].name in this.dataCache.Formats['gen7dlcmons'].unbanlist);
		}
		this.modData('Learnsets', 'kommoo').learnset.clangoroussoul = ['7T'];
	},
};
