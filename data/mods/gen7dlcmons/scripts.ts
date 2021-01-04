export const Scripts: ModdedBattleScriptsData = {
	gen: 7,
	init: function () {
		for (const id in this.dataCache.Formats['gen5prism'].banlist) {
            this.dataCache.FormatsData[this.toID(this.dataCache.Formats['gen5prism'].banlist[id])].tier = "Illegal";
		}
		this.modData('Learnsets', 'kommoo').learnset.clangoroussoul = ['7T'];
	},
};
