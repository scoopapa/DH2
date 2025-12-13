import { learnsetUpdate } from "../gen3hoenngaiden/learnsetupdate";

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen3hoenngaiden',
	gen: 3,

	teambuilderConfig: {},

	init() {
		/**for (const species in this.data.Pokedex) {
			delete this.data.Pokedex[species].abilities['H'];
		}*/
		learnsetUpdate(this);
	}
};


