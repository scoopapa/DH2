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

	//New signature moves by implementation order
	//Venusaur
	greatflower: {
		num: 3000,
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
		num: 3001,
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
		num: 3002,
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
		num: 3003,
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
		num: 3004,
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
		num: 3005,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Spin To Win",
		desc: "The user takes a bizarre spinning stance to evade all forms of damage. Any damaging move that attempts to hit the user is reflected back at the attacker.",
		shortDesc: "Protects from all moves. Copies moves that targets user.",
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
				if (move.category !== 'Status' || target.volatiles['mustrecharge']) {
					//This is the part where Spinda copies the move it got hit with
					//Get the base move in case of Z-move or Max move
					if (move.isMax && move.baseMove) move = this.dex.moves.get(move.baseMove);
					if (!move.flags['mirror'] || move.flags['failcopycat'] || move.isZ || move.isMax) {
						return false;
					}
					this.actions.useMove(move.id, target, source);
				}
				return this.NOT_FAIL;
			},
			//If protection broken, Spinda gets confused - Irrelevent?
			/*onHit(target, source, move) {
				if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
					const result = target.addVolatile('confusion', source, move);
					if (!result) return result;
				}
			},*/
		},
		//This is the part where the user gets confused if the move fails
		onMoveFail(target, source, move) {
			const result = target.addVolatile('confusion', source, move);
			if (!result) return result;
		},
		callsMove: true,
		secondary: null,
		target: "self",
		type: "Normal",
	},
	//Zangoose
	whiteclaw: {
		num: 3006,
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
		num: 3007,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Curse of Snow",
		desc: "The user casts a freezing curse to deal damage and lower the target's Special Attack. This move has more effects is the target is of the opposite gender to the user.",
		shortDesc: "SpA -1. If target is of opposite gender : also Atk -1, Spe -1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon, target) {
			if ((pokemon.gender === 'M' && target.gender === 'F') || (pokemon.gender === 'F' && target.gender === 'M')) {
				move.boosts = {
					atk: -1,
					spa: -1,
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
	//Roserade
	secretthorns: {
		num: 3008,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Secret Thorns",
		desc: "The user poisons its foe using one of their special flowers. The effects of the move changes depending on the target's remaining HP.",
		shortDesc: "Poison & Atk -1. If target HP < 50%: Bad Poison & Heal Block",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon, target) {
			if (target.hp * 2 <= target.maxhp) {
				move.boosts = {};
				move.status = 'tox';
				move.volatileStatus = 'healblock';
			}
		},
		status: 'psn',
		boosts: {
			atk: -1,
		},
		secondary: null,
		target: "normal",
		type: "Poison",
	},
	//Hydreigon
	triplethreat: {
		num: 3009,
		accuracy: 90,
		basePower: 30,
		category: "Special",
		name: "Triple Threat",
		desc: "The user fires menacing beams from its heads, hitting the target 3 times in a row. This move may make the target flinch.",
		shortDesc: "Hits 3 times. 20% chance of Flinch.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		multihit: 3,
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Dark",
	},
	//Gastrodon
	stickyslime: {
		num: 3010,
		accuracy: 90,
		basePower: 60,
		category: "Special",
		name: "Sticky Slime",
		desc: "The user shoots a sticky ooze that traps the target during its next turn. After making its attack, the user switches out immediately.",
		shortDesc: "Prevents target from switching out on the next turn. User switches out.",
		pp: 10,
		priority: -6,
		flags: {protect: 1, mirror: 1, metronome: 1},
		selfSwitch: true,
		//Trapping : Modified code from Fairy Lock and Anchor Shot
		condition: {
			duration: 2,
			onStart(target) {
				this.add('-start', target, 'move: Sticky Slime');
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
			onEnd(target) {
				this.add('-end', target, 'move: Sticky Slime', '[silent]');
			},
		},
		secondary: {
			chance: 100,
			onHit(target) {
				target.addVolatile('stickyslime');
			},
		},
		target: "normal",
		type: "Water",
	},

	//Old moves remixed (for technicality)
	//Heal block status is defined in the 'Heal Block' move, so the duration is set inside the move itself
	healblock: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (effect?.name === "Psychic Noise" || effect?.name === "Secret Thorns") {
					return 2;
				}
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Heal Block');
					return 7;
				}
				return 5;
			},
			onStart(pokemon, source) {
				this.add('-start', pokemon, 'move: Heal Block');
				source.moveThisTurnResult = true;
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).flags['heal']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (move.flags['heal'] && !move.isZ && !move.isMax) {
					this.add('cant', pokemon, 'move: Heal Block', move);
					return false;
				}
			},
			onModifyMove(move, pokemon, target) {
				if (move.flags['heal'] && !move.isZ && !move.isMax) {
					this.add('cant', pokemon, 'move: Heal Block', move);
					return false;
				}
			},
			onResidualOrder: 20,
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Heal Block');
			},
			onTryHeal(damage, target, source, effect) {
				if ((effect?.id === 'zpower') || this.effectState.isZ) return damage;
				return false;
			},
			onRestart(target, source, effect) {
				if (effect?.name === 'Psychic Noise') return;

				this.add('-fail', target, 'move: Heal Block'); // Succeeds to supress downstream messages
				if (!source.moveThisTurnResult) {
					source.moveThisTurnResult = false;
				}
			},
		},
	},
};
