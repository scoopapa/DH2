import type {Dex} from '../sim/dex';

const CHOOSABLE_TARGETS = new Set(['normal', 'any', 'adjacentAlly', 'adjacentAllyOrSelf', 'adjacentFoe']);

export const Scripts: BattleScriptsData = {

init: function () {
	for (var id in this.data.Pokedex) {
		if (this.data.Pokedex[id].num > 809) {
			this.modData('Learnsets').learnset.toxic = ['8L1'] && this.modData('Learnsets').learnset.hiddenpower = ['8L1'] && this.modData('Learnsets').learnset.frustration = ['8L1'] && this.modData('Learnsets').learnset.return = ['8L1'];
		}
	}
},
};