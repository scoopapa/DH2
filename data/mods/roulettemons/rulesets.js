'use strict';

/**@type {{[k: string]: ModdedFormatsData}} */
let BattleFormats = {
	roulettemonsclause: {
		name: 'Roulettemons Clause',
		onBegin() {
			// The only validator rule this currently modifies is Species Clause, so the added rule is just this
			this.add('rule', 'Clean Slate: Limit one of each Pokémon');
		},
		onValidateSet(set, format) {
			let template = this.dex.getTemplate(set.species);
			if (template.tier !== 'Roulettemons'){
				return [template.species + "is not on the allowed list of pokemon. Use the 'om' chat command for a link to the list of allowed pokemon. (i.e. /om roulettemons)"];
			}
		},
	},
};

exports.Formats = BattleFormats;
