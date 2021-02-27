"use strict";Object.defineProperty(exports, "__esModule", {value: true}); const Formats = {
	dynamaxclause: {
		effectType: 'Rule',
		name: 'Dynamax Clause',
		desc: "Prevents Pok&eacute;mon from dynamaxing",
		onBegin() {
			for (const pokemon of this.getAllPokemon()) {
				pokemon.canDynamax = false;
			}
			this.add('rule', 'Dynamax Clause: You cannot dynamax');
		},
	},
}; exports.Formats = Formats;
