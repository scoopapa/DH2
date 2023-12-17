export const Moves: {[k: string]: ModdedMoveData} = {
	risingdivide: {
		num: -1,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Rising Divide",
		pp: 10,
		priority: 2,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Rising Divide only works on your first turn out.");
				return false;
			}
		},
		shortDesc: "Hits first. First turn out only.",
		desc: "Hits first. First turn out only.",
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Cute",
	},
	signaljam: {
		num: -2,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Signal Jam",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Signal Jam only works on your first turn out.");
				return false;
			}
		},
		onHit(target) {
			if (target.getAbility().isPermanent) return;
			target.addVolatile('gastroacid');
		},
		onAfterSubDamage(damage, target) {
			if (target.getAbility().isPermanent) return;
			target.addVolatile('gastroacid');
		},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		target: "allAdjacentFoes",
		type: "Electric",
		zMove: {basePower: 140},
		contestType: "Tough",
	},
}
