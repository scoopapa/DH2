export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen1',
	gen: 1,
	init() {
		for (const i in this.data.Pokedex) {
			(this.data.Pokedex[i] as any).gender = 'N';
			(this.data.Pokedex[i] as any).eggGroups = null;
		}
	},
};
