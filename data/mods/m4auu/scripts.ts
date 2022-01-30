export const Scripts: ModdedBattleScriptsData = {
	inherit: 'm4av6',
	init() {
		for (const id in this.dataCache.Pokedex) {
			if (this.modData('FormatsData', id)) {
				if (this.modData('FormatsData', id).truetier) {
					this.modData('FormatsData', id).tier = this.modData('FormatsData', id).truetier
				}
			}
		}
	},
};
