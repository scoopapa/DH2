export const Moves: {[moveid: string]: MoveData} = {
	anchortoss: {
		num: -1,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "Prevents the target from switching out.",
		name: "Anchor Toss",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Anchor Shot", target);
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
		type: "Steel",
	},
	meltymash: {
		num: -2,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "If Eiscue-Noice, becomes Water-type.",
		name: "Melty Mash",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onHit(source) {
			if (source.getTypes().join() === 'Water' || !source.setType('Water')) {
				this.add('-fail', source);
				return null;
			}
			this.add('-start', source, 'typechange', 'Water');
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Icicle Crash", target);
		},
		secondary: null,
		target: "normal",
		type: "Ice",
	},
};