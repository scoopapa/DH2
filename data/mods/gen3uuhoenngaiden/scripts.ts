import { learnsetUpdate } from "../gen3hoenngaiden/learnsetupdate";

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen3hoenngaiden',
	gen: 3,

	teambuilderConfig: {},

	init() {
		for (const i in this.data.Pokedex) {
			delete this.data.Pokedex[i].abilities['H'];
		}
		learnsetUpdate(this);
	}
};


