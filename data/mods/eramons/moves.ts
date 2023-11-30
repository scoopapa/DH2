export const Moves: {[k: string]: ModdedMoveData} = {
	autotomize: {
		inherit: true,
		isNonstandard: null,
	},
	boltstrike: {
		inherit: true,
		isNonstandard: null,
	},
	decorate: {
		inherit: true,
		isNonstandard: null,
	},
	dragonhammer: {
		inherit: true,
		isNonstandard: null,
	},
	iondeluge: {
		inherit: true,
		isNonstandard: null,
	},
	magicaltorque: {
		inherit: true,
		isNonstandard: null,
	},
	automatarush: {
		num: -100,
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		desc: "This move becomes a special attack if the user's Special Attack is greater than its Attack, including stat stage changes. This move has 25% of recoil damage and ignores opposite abilities.",
		shortDesc: "Spec. if SpA > Atk. 25% recoil. Ignores abilities.",
		name: "Automata Rush",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) {
				move.category = 'Special';
			}
		},
		ignoreAbility: true,
		recoil: [1, 4],
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	bouncybubble: {
		num: -101,
		accuracy: 90,
		basePower: 100,
		category: "Special",
		isNonstandard: null,
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		name: "Bouncy Bubble",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Water",
	},
	changeofheart: {
		num: -102,
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		desc: "If this move is successful and the user is not Terastallized, the user's secondary type becomes the type of its first move as long as it remains active.",
		shortDesc: "Secondary type: first move type. Fails if Fighting.",
		name: "Change of Heart",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMove(pokemon) {
			if (this.dex.moves.get(pokemon.moveSlots[0].move).type !== "Fighting") return;
			this.add('-fail', pokemon, 'move: Change of Heart');
			this.attrLastMove('[still]');
			this.hint("The first move of this Pokemon must not be Fighting.");
			return null;
		},
		self: {
			onHit(pokemon) {
				const newType = this.dex.moves.get(pokemon.moveSlots[0].move).type;
				if (pokemon.baseSpecies.baseSpecies !== 'Lapseus' || pokemon.transformed || newType === "Fighting") return;
				if (pokemon.species.forme !== newType) {
					pokemon.formeChange('Lapseus-' + newType, this.effect, true);
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
	feverbreaker: {
		num: -103,
		accuracy: 100,
		basePower: 90,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.hasType("Fire")) {
				return move.basePower * 1.5;
			}
			return move.basePower;
		},
		category: "Physical",
		name: "Fever Breaker",
		desc: "If this move is successful and the user is not Terastallized, the user's Fire type becomes typeless as long as it remains active. The move's damage is also increased by x1.5 if the user has the Fire-type.",
		shortDesc: "x1.5 damage if the user has the Fire type. Loses this type.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			onHit(pokemon) {
				if (pokemon.hasType("Fire")) {
					pokemon.setType(pokemon.getTypes(true).map(type => type === "Fire" ? "???" : type));
					this.add('-start', pokemon, 'typechange', pokemon.getTypes().join('/'), '[from] move: Fever Breaker');
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	phaseout: {
		num: -104,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Causes the user to become a Water type. Fails if the user is an Arceus or a Silvally, if the user is already purely Water type, or if the user is Terastallized. Causes the user's Ability to become Ice Scales. Fails if the user's Ability is As One, Battle Bond, Comatose, Commander, Disguise, Gulp Missile, Hadron Engine, Ice Face, Multitype, Orichalcum Pulse, Power Construct, Protosynthesis, Quark Drive, RKS System, Schooling, Shields Down, Simple, Stance Change, Truant, Zen Mode, or Zero to Hero.",
		shortDesc: "+1 prio. Turns user into a Water-type with Ice Scales.",
		name: "Phase Out",
		pp: 10,
		priority: 1,
		flags: {},
		self: {
			onHit(target) {
				if (target.getTypes().join() === 'Water' || !target.setType('Water')) {
					this.add('-fail', target);
					return null;
				}
				this.add('-start', target, 'typechange', 'Water');
				const oldAbility = target.setAbility('icescales');
				if (oldAbility) {
					this.add('-ability', target, 'Ice Scales', '[from] move: Phase Out');
					return;
				}
				return oldAbility as false | null;
			},
		},
		secondary: null,
		target: "normal",
		type: "Water",
	},
	plaguecane: {
		num: -105,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "Fails unless it is the user's first turn on the field.",
		shortDesc: "Hits first. First turn out only.",
		name: "Plague Cane",
		pp: 10,
		priority: 3,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Plague Cane only works on your first turn out.");
				return false;
			}
		},
		secondary: null,
		target: "normal",
		type: "Poison",
	},
	windmissile: {
		num: -106,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		shortDesc: "No additional effect.",
		name: "Wind Missile",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		secondary: null,
		target: "normal",
		type: "Flying",
	},
}