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
		num: -5,
		accuracy: 100,
		basePower: 140,
		category: "Special",
		name: "Black Hole",
		pp: 5,
		priority: 0,
		flags: {},
		isFutureMove: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, source, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'blackhole',
				source: source,
				moveData: {
					id: 'blackhole',
					name: "Black Hole",
					accuracy: 100,
					basePower: 140,
					category: "Special",
					priority: 0,
					flags: {},
					effectType: 'Move',
					isFutureMove: true,
					type: 'Dark',
				},
			});
			this.add('-start', source, 'Black Holes');
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Beautiful",
	},
	/*
	blackhole: {
		num: -2,
		accuracy: 100,
		basePower: 200,
		category: "Special",
		shortDesc: "(Bugged) All active Pokemon take damage with halved Sp. Def in 3 turns.",
		name: "Black Hole",
		pp: 5,
		type: "Dark",
		target: "all",
		priority: 0,
		flags: {},
		ignoreImmunity: true,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Black Hole Eclipse", target);
		},
		onTry(source, target) {
			this.add('-start', source, 'Black Holes');
			this.add('-start', target, 'Black Holes');
		},
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			const moveData = {
				name: "Black Hole",
				basePower: 200,
				category: "Physical",
				flags: {},
				willCrit: false,
				type: '???',
			} as unknown as ActiveMove;
			const damage = this.getDamage(source, target, moveData, true);
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'blackhole',
				source: source,
				moveData: {
					id: 'blackhole',
					name: "Black Hole",
					accuracy: 100,
					basePower: 0,
					damage: damage,
					category: "Physical",
					flags: {},
					effectType: 'Move',
					isFutureMove: true,
					type: '???',
				}
			})
			Object.assign(source.side.slotConditions[source.position]['futuremove'], {
				duration: 3,
				move: 'blackhole',
				source: source,
				moveData: {
					id: 'blackhole',
					name: "Black Hole",
					accuracy: 100,
					basePower: 0,
					damage: damage,
					category: "Physical",
					flags: {},
					effectType: 'Move',
					isFutureMove: true,
					type: '???',
				}
			});
			for (const pokemon of this.getAllActive()) {
				if (!pokemon.side.addSlotCondition(pokemon, 'futuremove')) return false;
				Object.assign(pokemon.side.slotConditions[pokemon.position]['futuremove'], {
					duration: 4,
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
						ignoreImmunity: false,
						effectType: 'Move',
						isFutureMove: true,
						type: 'Dark',
						target: "all",
					},
				});
			};
			this.add('-start', source, 'Black Hole');
			this.add('-start', target, 'Black Hole');
			return null;
		}       
	},*/
	blackholes: {
		num: -4,
		accuracy: 100,
		basePower: 200,
		category: "Special",
		shortDesc: "(Bugged) All active Pokemon take damage with halved Sp. Def in 3 turns.",
		name: "Black Holes",
		pp: 5,
		type: "Dark",
		target: "all",
		priority: 0,
		flags: {},
		ignoreImmunity: true,
		onHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Black Hole Eclipse", target);
		},
	},
};
