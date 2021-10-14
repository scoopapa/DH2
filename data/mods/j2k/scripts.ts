import type {Dex} from '../sim/dex';

const CHOOSABLE_TARGETS = new Set(['normal', 'any', 'adjacentAlly', 'adjacentAllyOrSelf', 'adjacentFoe']);

export const Scripts: BattleScriptsData = {
	init: function () {
		for (var id in this.data.Pokedex) {
			if (!this.modData('Learnsets', id)) continue;
			if (this.data.Pokedex[id].num > 809) {
				this.modData('Learnsets', id).learnset.toxic = ['8L1']
				this.modData('Learnsets', id).learnset.hiddenpower = ['8L1']
				this.modData('Learnsets', id).learnset.frustration = ['8L1']
				this.modData('Learnsets', id).learnset.return = ['8L1']
			}
		}
	},
};