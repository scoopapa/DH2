export const Moves: {[k: string]: ModdedMoveData} = {
	ragefist: {
		inherit: true,
		basePower: 30,
		basePowerCallback(pokemon) {
			return Math.min(210, 30 + 30 * pokemon.timesAttacked);
		},
		shortDesc: "+30 power for each time user was hit. Max 6 hits.",
	},
};