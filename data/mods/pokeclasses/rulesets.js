'use strict';

/**@type {{[k: string]: ModdedFormatsData}} */
let BattleFormats = {
	pokeskillsmovelegality: {
		effectType: 'ValidatorRule',
		name: 'PokeSkills Move Legality',
		desc: "Allows Pok&eacute;mon to run a legal PokeSkill in one of their moveslots.",
		checkLearnset(move, template, setSources, set) {
			const restrictedMoves = this.format.restrictedMoves || [];
			if (!restrictedMoves.includes(move.name) && !move.isNonstandard && !move.isMax) {
				if (this.format.pokeSkills.includes( move.id )){
					return null;
				}
			}
			return this.checkLearnset(move, template, setSources, set);
		},
	},
};

exports.BattleFormats = BattleFormats;
