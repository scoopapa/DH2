import {Dex} from '@pkmn/dex';
import {Sets} from '@pkmn/sets';

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen1',
	gen: 1,
	init() {
		for (const i in this.data.Pokedex) {
			(this.data.Pokedex[i] as any).gender = 'N';
			(this.data.Pokedex[i] as any).eggGroups = null;
		}
		const teamsFile = require("fs").readFileSync("random-teams.txt").toString('utf-8');
		const teams = Sets.importTeams(teamsFile, Dex.forGen(1));
	},
}

