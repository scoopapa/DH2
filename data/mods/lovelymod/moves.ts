export const Moves: {[moveid: string]: ModdedMoveData} = {
	/*
	placeholder: {
		name: "",
		type: "",
		category: "",
		basePower: 0,
		accuracy: 100,
		pp: 10,
		shortDesc: "",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	*/
	attract: {
		inherit: true,
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(pokemon, source, effect) {
				if (!this.runEvent('Attract', pokemon, source)) {
					this.debug('Attract event failed');
					return false;
				}

				if (effect.name === 'Cute Charm') {
					this.add('-start', pokemon, 'Attract', '[from] ability: Cute Charm', `[of] ${source}`);
				} else if (effect.name === 'Hopeless Romantic') {
					this.add('-start', pokemon, 'Attract', '[from] ability: Hopeless Romantic', `[of] ${source}`);
				} else if (effect.name === 'Lovely Pair') {
					this.add('-start', pokemon, 'Attract', '[from] ability: Lovely Pair', `[of] ${source}`);
				} else if (effect.name === 'Serenade') {
					this.add('-start', pokemon, 'Attract', '[from] ability: Serenade', `[of] ${source}`);
				} else if (effect.name === 'Destiny Knot') {
					this.add('-start', pokemon, 'Attract', '[from] item: Destiny Knot', `[of] ${source}`);
				} else {
					this.add('-start', pokemon, 'Attract');
				}
				
				if (pokemon.species.coupleAbility) {
					pokemon.addVolatile(`ability:${pokemon.species.coupleAbility}`);
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Attract', '[silent]');
			},
		},
		onTryImmunity: true,
		target: "adjacentAlly",
	},
	heartstamp: {
		name: "Heart Stamp",
		type: "???",
		category: "Physical",
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.volatiles['attract']) return 100;
			return move.basePower;
		},
		accuracy: 100,
		pp: 10,
		shortDesc: "If user is infatuated: 100 BP, uses highest offensive stat.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, heart: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Heart Stamp", target);
		},
		onModifyMove(move, source, target) {
			if (source.volatiles['attract'] && source.getStat('spa', false, true) > source.getStat('atk', false, true)) {
				move.category = 'Special';
			}
		},
		secondary: null,
		target: "normal",
	},
	heartswap: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Heart Swap",
		shortDesc: "User and ally swap positions; using again can fail, unless user is infatuated.",
		pp: 15,
		priority: 2,
		flags: { metronome: 1, heart: 1 },
		onPrepareHit(pokemon) {
			return pokemon.addVolatile('heartswap');
		},
		onHit(pokemon) {
			let success = true;
			// Fail in formats where you don't control allies
			if (this.format.gameType !== 'doubles' && this.format.gameType !== 'triples') success = false;

			// Fail in triples if the Pokemon is in the middle
			if (pokemon.side.active.length === 3 && pokemon.position === 1) success = false;

			const newPosition = (pokemon.position === 0 ? pokemon.side.active.length - 1 : 0);
			if (!pokemon.side.active[newPosition]) success = false;
			if (pokemon.side.active[newPosition].fainted) success = false;
			if (!success) {
				this.add('-fail', pokemon, 'move: Heart Swap');
				this.attrLastMove('[still]');
				return this.NOT_FAIL;
			}
			this.swapPosition(pokemon, newPosition, '[from] move: Heart Swap');
		},
		condition: {
			duration: 2,
			counterMax: 729,
			onStart(pokemon) {
				this.effectState.counter = !pokemon.volatiles['attract'] ? 3 : 1;
			},
			onRestart(pokemon) {
				// this.effectState.counter should never be undefined here.
				// However, just in case, use 1 if it is undefined.
				const counter = this.effectState.counter || 1;
				this.debug(`Heart Swap success chance: ${Math.round(100 / counter)}%`);
				const success = this.randomChance(1, counter);
				if (!success) {
					delete pokemon.volatiles['heartswap'];
					return false;
				}
				if (this.effectState.counter < (this.effect as Condition).counterMax!) {
					if (!pokemon.volatiles['attract']) this.effectState.counter *= 3;
				}
				this.effectState.duration = 2;
			},
		},
		secondary: null,
		target: "self",
		type: "Fairy",
	},
	takeheart: {
		name: "Take Heart",
		type: "Fairy",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 5,
		shortDesc: "Removes the target's infatuation. If successful, gains infatuation.",
		priority: 0,
		flags: {heart: 1, reflectable: 1, protect: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Me First", target);
		},
		onHit(target, source, move) {
			if (target.removeVolatile('attract')) source.addVolatile('attract', source);
		},
		secondary: null,
		target: "normal",
	},
	holdhands: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "User and ally gain infatuation.",
		pp: 5,
		onHit(target, source, move) {
			source.addVolatile('attract', target);
			target.addVolatile('attract', source);
		},
	},
	pollenpuff: {
		inherit: true,
		basePower: 70,
		shortDesc: "If the target is an ally, heals 50% of its max HP, 30% to infatuate.",
		onHit(target, source, move) {
			if (source.isAlly(target)) {
				if (!this.heal(Math.floor(target.baseMaxhp * 0.5))) {
					if (this.randomChance(3, 10)) {
						target.addVolatile('attract', source);
					}
					return this.NOT_FAIL;
				}
			}
		},
	},
	lovelykiss: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "Causes the target to fall asleep. If ally, infatuates them.",
		onModifyMove(move, source, target) {
			if (source.isAlly(target)) {
				move.status = null;
				move.volatileStatus = 'attract';
			}
		},
	},
	sweetkiss: {
		name: "Sweet Kiss",
		type: "Fairy",
		category: "Status",
		basePower: 0,
		accuracy: 75,
		pp: 5,
		shortDesc: "Target repeats its last move for its next 3 turns. If ally, infatuates them.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, reflectable: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Sweet Kiss", target);
		},
		volatileStatus: 'encore',
		onModifyMove(move, source, target) {
			if (source.isAlly(target)) {
				move.volatileStatus = 'attract';
			}
		},
		secondary: null,
		target: "normal",
	},

	//vanilla
	fairywind: {
		inherit: true,
		pp: 15,
	},
	bodypress: {
		inherit: true,
		basePower: 60,
	},
	dracometeor: {
		inherit: true,
		basePower: 110,
	},
	dragonpulse: {
		inherit: true,
		basePower: 70,
	},
	earthpower: {
		inherit: true,
		basePower: 70,
	},
	earthquake: {
		inherit: true,
		basePower: 80,
	},
	energyball: {
		inherit: true,
		basePower: 70,
	},
	gigadrain: {
		inherit: true,
		basePower: 60,
	},
	acrobatics: {
		inherit: true,
		basePower: 45,
	},
	airslash: {
		inherit: true,
		basePower: 60,
	},
	bravebird: {
		inherit: true,
		basePower: 90,
	},
	darkpulse: {
		inherit: true,
		basePower: 60,
	},
	drillrun: {
		inherit: true,
		basePower: 60,
	},
	foulplay: {
		inherit: true,
		basePower: 70,
	},
	heatwave: {
		inherit: true,
		basePower: 60,
	},
	hurricane: {
		inherit: true,
		basePower: 85,
	},
	knockoff: {
		inherit: true,
		basePower: 45,
	},
	powergem: {
		inherit: true,
		basePower: 60,
	},
	rockslide: {
		inherit: true,
		basePower: 45,
	},
	stoneedge: {
		inherit: true,
		basePower: 80,
	},
	suckerpunch: {
		inherit: true,
		basePower: 60,
	},
	facade: {
		inherit: true,
		basePower: 50,
	},
	grasspledge: {
		inherit: true,
		basePower: 50,
	},
	fireplege: {
		inherit: true,
		basePower: 50,
	},
	waterpledge: {
		inherit: true,
		basePower: 50,
	},
	headlongrush: {
		inherit: true,
		basePower: 100,
	},
	woodhammer: {
		inherit: true,
		basePower: 90,
	},
	playrough: {
		inherit: true,
		basePower: 70,
	},
	dazzlinggleam: {
		inherit: true,
		basePower: 60,
	},
	moonblast: {
		inherit: true,
		basePower: 75,
	},
	spiritshackle: {
		inherit: true,
		basePower: 70,
	},
	shadowball: {
		inherit: true,
		basePower: 60,
	},
	leafblade: {
		inherit: true,
		basePower: 70,
	},
	leafstorm: {
		inherit: true,
		basePower: 110,
	},
	extrasensory: {
		inherit: true,
		basePower: 60,
	},
	focusblast: {
		inherit: true,
		basePower: 100,
	},
	aurasphere: {
		inherit: true,
		basePower: 60,
	},
	mysticalfire: {
		inherit: true,
		basePower: 50,
	},
	springtidestorm: {
		inherit: true,
		basePower: 75,
	},
	zenheadbutt: {
		inherit: true,
		basePower: 60,
	},
	meteorbeam: {
		inherit: true,
		basePower: 110,
	},
	ironhead: {
		inherit: true,
		basePower: 60,
	},
	bodyslam: {
		inherit: true,
		basePower: 65,
	},
	firepunch: {
		inherit: true,
		basePower: 70,
	},
	icepunch: {
		inherit: true,
		basePower: 70,
	},
	thunderpunch: {
		inherit: true,
		basePower: 70,
	},
	psychic: {
		inherit: true,
		basePower: 70,
	},
	icebeam: {
		inherit: true,
		basePower: 70,
	},
	flamethrower: {
		inherit: true,
		basePower: 70,
	},
	fireblast: {
		inherit: true,
		basePower: 90,
	},
	overheat: {
		inherit: true,
		basePower: 110,
	},
	flareblitz: {
		inherit: true,
		basePower: 90,
	},
	bugbuzz: {
		inherit: true,
		basePower: 70,
	},
	thunderbolt: {
		inherit: true,
		basePower: 70,
	},
	discharge: {
		inherit: true,
		basePower: 60,
	},
	drainingkiss: {
		inherit: true,
		basePower: 40,
	},
	psyshock: {
		inherit: true,
		basePower: 60,
	},
	freezedry: {
		inherit: true,
		basePower: 50,
	},
	blizzard: {
		inherit: true,
		basePower: 80,
		accuracy: 80,
	},
	highhorsepower: {
		inherit: true,
		basePower: 70,
	},
	poisonjab: {
		inherit: true,
		basePower: 60,
	},
	gunkshot: {
		inherit: true,
		basePower: 90,
	},
	sludgebomb: {
		inherit: true,
		basePower: 60,
	},
	throatchop: {
		inherit: true,
		basePower: 70,
	},
	surf: {
		inherit: true,
		basePower: 70,
	},
	alluringvoice: {
		inherit: true,
		basePower: 60,
	},
	hypervoice: {
		inherit: true,
		basePower: 70,
	},
	eeriespell: {
		inherit: true,
		basePower: 60,
	},
	venoshock: {
		inherit: true,
		basePower: 45,
	},
	fleurcannon: {
		inherit: true,
		basePower: 110,
	},
	flashcannon: {
		inherit: true,
		basePower: 60,
	},
	sparklingaria: {
		inherit: true,
		basePower: 75,
	},
	scorchingsands: {
		inherit: true,
		basePower: 60,
	},
	firelash: {
		inherit: true,
		basePower: 50,
	},
	slash: {
		inherit: true,
		basePower: 50,
	},
	nightslash: {
		inherit: true,
		basePower: 50,
	},
	psychocut: {
		inherit: true,
		basePower: 50,
	},
	doubleedge: {
		inherit: true,
		basePower: 90,
	},
	psychicfangs: {
		inherit: true,
		basePower: 65,
	},
	crunch: {
		inherit: true,
		basePower: 60,
	},
	poltergeist: {
		inherit: true,
		basePower: 70,
	},
	temperflare: {
		inherit: true,
		basePower: 55,
	},
	diamondstorm: {
		inherit: true,
		basePower: 40,
	},
};

