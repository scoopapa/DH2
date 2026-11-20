export const Moves: {[moveid: string]: ModdedMoveData} = {
	// Evil has been unleashed
	grasspledge: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)){
				move.category = 'Physical';
			}
		},
		shortDesc: "Physical if ATK > SPA. Combine with Fire or Water Pledge!",
	},
	firepledge: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)){
				move.category = 'Physical';
			}
		},
		shortDesc: "Physical if ATK > SPA. Combine with Grass or Water Pledge!",
	},
	waterpledge: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)){
				move.category = 'Physical';
			}
		},
		shortDesc: "Physical if ATK > SPA. Combine with Grass or Fire Pledge!",
	},
};
