"use strict";Object.defineProperty(exports, "__esModule", {value: true}); const BattleFormats = {
	pokeskillsmovelegality: {
		effectType: 'ValidatorRule',
		name: 'PokeSkills Move Legality',
		desc: "Allows Pok&eacute;mon to run a legal PokeSkill in one of their moveslots.",
		checkLearnset(move, species, setSources, set) {
			const restrictedMoves = this.format.restrictedMoves || [];
			if (!restrictedMoves.includes(move.name) && !move.isNonstandard && !move.isMax) {
				if (this.format.pokeSkills.includes( move.id )){
					return null;
				}
			}
			return this.checkLearnset(move, species, setSources, set);
		},
	},
}; exports.BattleFormats = BattleFormats;