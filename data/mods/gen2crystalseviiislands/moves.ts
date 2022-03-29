export const Moves: {[moveid: string]: MoveData} = {
	swarmattack: {
		num: -1,
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 10 + (move.hit * 10);
		},
		category: "Physical",
		name: "Swarm Attack",
		shortDesc: "Hits 3 times. Each hit can miss, but power rises. 10% to lower Defense.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		multihit: 3,
		multiaccuracy: true,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Attack Order", target);
		},
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Bug",
	},
	blackhole: {
		num: -2,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Black Hole",
		pp: 5,
		priority: 0,
		flags: {authentic: 1},
		willCrit: false,
		isFutureMove: true,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Black Hole Eclipse", target);
		},
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'blackhole',
				source: source,
				moveData: {
					id: 'blackhole',
					name: "Black Hole",
					accuracy: 100,
					basePower: 200,
					category: "Special",
					priority: 0,
					flags: {},
					recoil: [1, 1],
					effectType: 'Move',
					isFutureMove: true,
					type: '???',
				},
			});
			this.add('-start', source, 'Black Hole');
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
};
