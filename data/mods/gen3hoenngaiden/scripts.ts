import { learnsetUpdate } from "../../mods/gen3hoenngaiden/learnsetupdate";

export const Scripts: ModdedBattleScriptsData = {
	gen: 3,
	inherit: 'gen3',
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['New','S1','S2','A1','A2','A3','A4','B1','B2','B3','B4','C1','C2','C3','D1','D2','D3','E','Unranked','NFE','LC','Uber'],
	},
	init() {

		for (const species in this.data.Pokedex) {
			delete this.data.Pokedex[species].abilities['H'];
		}

		// list Pokemon by VR rank
		for (const species in this.dataCache?.Pokedex) {
			if (this.modData('FormatsData', species) && this.modData('FormatsData', species).tier !== 'Uber') {
				if (this.modData('FormatsData', species).rank !== 'Unranked') {
					this.modData('FormatsData', species).tier = this.modData('FormatsData', species).rank;
				} else {
					this.modData('FormatsData', species).tier = 'Unranked';
				}
			}
		};

		learnsetUpdate(this);
		
	},
};
