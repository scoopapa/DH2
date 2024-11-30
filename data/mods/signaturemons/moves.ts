export const Moves: {[k: string]: ModdedMoveData} = {
	//Template
	/*movename: {
		num: 0,
		accuracy: 100,
		basePower: 30,
		category: "Physical""Special""Status",
		name: "MoveName",
		desc: "Full move description.",
		shortDesc: "Move effects.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		[multihit: 3,]
		secondary: null,
		target: "normal",
		type: "Normal",
	},*/

	//New signature moves by National Dex order
	//Venusaur
	greatflower: {
		num: 0,
		accuracy: true,
		basePower: 100,
		category: "Special",
		name: "Great Flower",
		desc: "The user gathers energy from its flower to attack with immense power. This move never misses.",
		shortDesc: "Hits adjacent foes, Bypasses accuracy check.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Grass",
	},
	//Charizard
	greatflame: {
		num: 0,
		accuracy: true,
		basePower: 100,
		category: "Special",
		name: "Great Flame",
		desc: "The user focuses its power over fire and releases a huge blazing breath. This move never misses.",
		shortDesc: "Hits adjacent foes, Bypasses accuracy check.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fire",
	},
	//Blastoise
	greatflood: {
		num: 0,
		accuracy: true,
		basePower: 100,
		category: "Special",
		name: "Great Flood",
		desc: "The user launches gallions of water at its foes using its cannons. This move never misses.",
		shortDesc: "Hits adjacent foes, Bypasses accuracy check.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Water",
	},
	//Dugtrio
	//Dugtrio-Alola
	tripledig: {
		num: 0,
		accuracy: 95,
		basePower: 30,
		category: "Physical",
		name: "Triple Dig",
		desc: "The user performs a well timed triple attack, hitting the target from below three times in a row.",
		shortDesc: "Hits 3 times.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		multihit: 3,
		secondary: null,
		target: "normal",
		type: "Ground",
	},
	//Tentacruel
	//Toedscruel
	tentaclelock: {
		num: 0,
		accuracy: 90,
		basePower: 0,
		category: "Status",
		name: "Tentacle Lock",
		desc: "The user extends its tentacles to catch its target and prevent them from fleeing. This move raises the user's Sp. Attack and lowers the target's Sp. Defense every turn.",
		shortDesc: "Traps foe. SpD -1 on foe and SpA +1 on user each turn",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onTryImmunity(target) {
			return this.dex.getImmunity('trapped', target);
		},
		volatileStatus: 'tentaclelock',
		condition: {
			onStart(pokemon, source) {
				this.add('-start', pokemon, 'move: TentacleLock', '[of] ' + source);
			},
			onResidualOrder: 14,
			onResidual(pokemon) {
				const source = this.effectState.source;
				if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns)) {
					delete pokemon.volatiles['tentaclelock'];
					this.add('-end', pokemon, 'Tentacle Lock', '[partiallytrapped]', '[silent]');
					return;
				}
				const debuff = this.boost({spd: -1}, pokemon, source, this.dex.getActiveMove('tentaclelock'));
				if (debuff) {
					this.boost({spa: +1}, source, pokemon, this.dex.getActiveMove('tentaclelock'));
				}
			},
			onTrapPokemon(pokemon) {
				if (this.effectState.source && this.effectState.source.isActive) pokemon.tryTrap();
			},
		},
		secondary: null,
		target: "normal",
		type: "normal",
	},
	//Spinda
	spintowin: {
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Spin To Win",
		desc: "The user takes a bizarre spinning stance to evade all forms of damage. Any move that makes direct contact is reflected back at the attacker.",
		shortDesc: "Protects from all moves. Copies moves that make contact.",
		pp: 10,
		priority: 4,
		flags: {failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1},
		stallingMove: true,
		volatileStatus: 'spintowin',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (this.checkMoveMakesContact(move, source, target)) {
					//This is the part where Spinda copies the move it got hit with
					//const move = target.lastMove;
					//Get the base move in case of Z-move or Max move
					if (move.isMax && move.baseMove) move = this.dex.moves.get(move.baseMove);
					if (!move.flags['mirror'] || move.flags['failcopycat'] || move.isZ || move.isMax) {
						return false;
					}
					//this.actions.useMove(move.id, target); Old code
					this.actions.useMove(move.id, target, source);
					return null; //Not sure if this on is needed here
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
					//If protection broken, Spinda gets confused
					const result = target.setStatus('confusion', source, move);
					if (!result) return result;
				}
			},
		},
		onMoveFail(target, source, move) {
			//This is the part where Spinda gets confused if the move fails
			const result = target.setStatus('confusion', source, move);
			if (!result) return result;
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
	//Zangoose
	whiteclaw: {
		num: 0,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "White Claw",
		desc: "The user lacerates its foe with honed white-hot claws. This move is super effective on Poison types and may burn the target.",
		shortDesc: "10% chance of Burn. Super effective against Poison-types.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Poison') return 1;
		},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
		type: "Normal",
	},
	//Froslass
	curseofsnow: {
		num: 0,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Curse of Snow",
		desc: "The user casts a freezing curse to deal damage and lower the target's Special Attack. This move has more effects is the target is of the opposite gender to the user.",
		shortDesc: "SpA -1. If target is of opposite gender : also Atk -1, SpD -1, Spe -1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon, target) {
			if ((pokemon.gender === 'M' && target.gender === 'F') || (pokemon.gender === 'F' && target.gender === 'M')) {
				move.boosts = {
					atk: -1,
					spa: -1,
					spd: -1,
					spe: -1,
				};
			}
		},
		boosts: {
			spa: -1,
		},
		secondary: null,
		target: "normal",
		type: "Ice",
	},
};
