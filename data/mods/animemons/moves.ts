export const Moves: {[moveid: string]: ModdedMoveData} = {
	windtunnel: {
		num: -1,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Wind Tunnel",
		pp: 24,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		recoil: [33, 100],
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
	deathnote: {
		num: -2,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Death Note",
		pp: 40,
		priority: 0,
		flags: {distance: 1, bypasssub: 1, metronome: 1},
		onHitField(target, source, move) {
			let result = false;
			let message = false;
			for (const pokemon of this.getAllActive()) {
				if (this.runEvent('Invulnerability', pokemon, source, move) === false) {
					this.add('-miss', source, pokemon);
					result = true;
				} else if (this.runEvent('TryHit', pokemon, source, move) === null) {
					result = true;
				} else if (!pokemon.volatiles['perishsong']) {
					pokemon.addVolatile('perishsong');
					this.add('-start', pokemon, 'perish3', '[silent]');
					result = true;
					message = true;
				}
			}
			if (!result) return false;
			if (message) this.add('-fieldactivate', 'move: Perish Song');
		},
		condition: {
			duration: 5,
			onEnd(target) {
				this.add('-start', target, 'perish0');
				target.faint();
			},
			onResidualOrder: 24,
			onResidual(pokemon) {
				const duration = pokemon.volatiles['perishsong'].duration;
				this.add('-start', pokemon, 'perish' + duration);
			},
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
	},
	kagune: {
		num: -3,
		accuracy: 90,
		basePower: 115,
		category: "Physical",
		name: "Kagune",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},
	quinque: {
		num: -4,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Quinque",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Beautiful",
	},
	sutra: {
		num: -5,
		accuracy: 90,
		basePower: 50,
		category: "Special",
		name: "Sutra",
		pp: 20,
		flags: {contact: 1, protect: 1, mirror: 1, gdistance: 1, metronome: 1},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Ghost', type);
		},
		priority: 0,
		secondary: {
			chance: 100,
			status: 'par',
		},
		target: "any",
		type: "Psychic",
		contestType: "Clever",
	},
};
