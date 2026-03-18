export const Moves: {[k: string]: ModdedMoveData} = {
	brickbreak: {
		inherit: true,
		basePower: 65,
		onTryHit(pokemon) {
			pokemon.removeVolatile('reflect');
			pokemon.removeVolatile('lightscreen');
		},
		gen: 1,
	},
	anchorshot: {
		inherit: true,
		type: "Ghost",
		gen: 1,
	},
	freezingglare: {
		inherit: true,
		basePower: 80,
		gen: 1,
	},
	thunderouskick: {
		inherit: true,
		basePower: 80,
		gen: 1,
	},
	fierywrath: {
		inherit: true,
		basePower: 80,
		type: "Ghost",
		category: "Physical",
		gen: 1,
	},
	bugbuzz: {
		inherit: true,
		category: "Physical",
		secondary: {
			chance: 10,
			boosts: {
				spa: -1,
				spd: -1,
			},
		},
		gen: 1,
	},
	torchsong: {
		inherit: true,
		basePower: 60,
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
					spd: 1,
				},
			},
		},
		gen: 1,
	},
	woodhammer: {
		inherit: true,
		category: "Special",
		gen: 1,
	},
	aquacutter: {
		inherit: true,
		category: "Special",
		gen: 1,
	},
	quiverdance: {
		inherit: true,
		gen: 1,
	},
	meteorbeam: {
		inherit: true,
		category: "Physical",
		basePower: 130,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile('twoturnmove')) {
				attacker.removeVolatile('invulnerability');
				return;
			}
			this.add('-prepare', attacker, move.name);
			attacker.addVolatile('twoturnmove', defender);
			this.boost({spa: 1, spd: 1}, attacker, attacker, move);
			return null;
		},
		gen: 1,
	},
	diamondstorm: {
		inherit: true,
		self: {
			chance: 50,
			boosts: {
				def: 1,
			},
		},
		target: "normal",
		gen: 1,
	},
};
