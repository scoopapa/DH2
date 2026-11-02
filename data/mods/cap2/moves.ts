export const Moves: {[moveid: string]: MoveData} = {
	// CAP moves
	polarflare: {
		num: -3,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		isNonstandard: "CAP",
		name: "Polar Flare",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, defrost: 1, nosketch: 1 },
		secondary: {
			chance: 10,
			status: 'frz',
		},
		onAfterMoveSecondarySelf(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Ramnarok' && !pokemon.transformed) {
				const forme = pokemon.species.id === 'ramnarokradiant' ? '' : '-Radiant';
				pokemon.formeChange('Ramnarok' + forme, this.effect, false, '0', '[msg]');
			}
		},
		target: "allAdjacentFoes",
		type: "Fire",
		contestType: "Beautiful",
	},
};