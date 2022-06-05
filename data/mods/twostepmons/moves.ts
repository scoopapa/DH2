export const Moves: {[k: string]: ModdedMoveData} = {
	gutpunch: {
		num: 100001,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Gut Punch",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		onHit(target) {
			target.addVolatile('healblock');
			target.volatiles['healblock'].duration === 5
		},
		target: "normal",
		type: "Fighting",
		contestType: "Clever",
	},
	vengefulspell: {
		num: 100002,
		accuracy: 100,
		basePower: 150,
		category: "Special",
		name: "Vengeful Spell",
		pp: 5,
		priority: -3,
		flags: {protect: 1},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('vengefulspell');
		},
		onTryMove(pokemon) {
			if (!pokemon.volatiles['vengefulspell'] || !pokemon.volatiles['vengefulspell'].gotHit) {
				this.attrLastMove('[still]');
				this.add('cant', pokemon, 'Vengeful Spell', 'Vengeful Spell');
				return null;
			}
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Vengeful Spell');
			},
			onHit(pokemon, source, move) {
				if (pokemon.side !== source.side && move.category !== 'Status') {
					pokemon.volatiles['vengefulspell'].gotHit = true;
					const action = this.queue.willMove(pokemon);
					if (action) {
						this.queue.prioritizeAction(action);
					}
				}
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fairy",
		contestType: "Tough",
	},
	souldrain: {
		num: 100003,
		name: "Soul Drain",
		accuracy: 100,
		basePower: 40,
		category: "Special",
		pp: 10,
		type: "Ghost",
		shortDesc: "Heals the user by 2x the damage dealt.",
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [2, 1],
		target: "normal",
		secondary: null,
	},
	junglefang: {
		num: 100004,
		accuracy: 75,
		basePower: 65,
		category: "Physical",
		name: "Jungle Fang",
		pp: 15,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		secondaries: [
			self: {
				{
					chance: 30,
					volatileStatus: 'confusion',
				}, 
			}
		],
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
};

