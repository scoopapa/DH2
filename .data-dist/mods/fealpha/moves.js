"use strict";Object.defineProperty(exports, "__esModule", {value: true}); const Moves = {
darkvoid: {
		inherit: true,
		onTryMove(pokemon, target, move) {
			if (pokemon.species.name === 'Darkrai' || pokemon.species.name === 'Dark Rose' || move.hasBounced) {
				return;
			}
			this.add('-fail', pokemon, 'move: Dark Void');
			this.hint("Only a Pokemon whose form is Darkrai can use this move.");
			return null;
		},
	},
}; exports.Moves = Moves;