export const Moves: {[k: string]: ModdedMoveData} = {
	ragefist: {
		num: 889,
		shortDesc: "+25 power for every time the user is hit. Recoil damage equal to BP.",
		accuracy: 100,
		basePower: 50,
		basePowerCallback(pokemon) {
			return Math.min(350, 50 + 25 * pokemon.timesAttacked);
		},
		category: "Physical",
		name: "Rage Fist",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		self: {
			onHit(move, pokemon) {
				let bp = Math.min(350, 50 + 25 * pokemon.timesAttacked);
				this.damage(bp, pokemon, pokemon);
			},
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
};
