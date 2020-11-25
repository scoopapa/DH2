export const BattleMovedex: {[moveid: string]: MoveData} = {
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
};