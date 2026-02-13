export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	init() {
		for (const id in this.data.Pokedex) {
			let statsData = this.data.Pokedex[id].baseStats;
			if (statsData.hp <= 70) this.data.Pokedex[id].baseStats.hp *= 2;
			if (statsData.atk <= 70) this.data.Pokedex[id].baseStats.atk *= 2;
			if (statsData.def <= 70) this.data.Pokedex[id].baseStats.def *= 2;
			if (statsData.spa <= 70) this.data.Pokedex[id].baseStats.spa *= 2;
			if (statsData.spd <= 70) this.data.Pokedex[id].baseStats.spd *= 2;
			if (statsData.spe <= 70) this.data.Pokedex[id].baseStats.spe *= 2;
		}
	},
};