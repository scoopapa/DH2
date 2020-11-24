export const Moves: {[k: string]: ModdedMoveData} = {
	"sheepiousrend": {
		num: 755,
		accuracy: 100,
		basePower: 85,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Sheepious Rend damage boost');
				return move.basePower * 2;
			}
			this.debug('Sheepious Rend NOT boosted');
			return move.basePower;
		},
		category: "Physical",
		desc: "If the user moves before the target, this move's power is doubled.",
		shortDesc: "Double power if the user moves first.",
		id: "sheepiousrend",
		isViable: true,
		name: "Sheepious Rend",
		pp: 10,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	"scopein": {
		num: 489,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Accuracy, Speed, and applies Focus Energy.",
		shortDesc: "Raises the user's Accuracy, Speed, and applies Focus Energy.",
		id: "scopein",
		isViable: true,
		name: "Scope-In",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			spe: 1,
			accuracy: 1,
		},
		self: {
			onHit(source) {
				for (let pokemon of source.side.active) {
					pokemon.addVolatile('focusenergy');
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Poison",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Tough",
	},
};