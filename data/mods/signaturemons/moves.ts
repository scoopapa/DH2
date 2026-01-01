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
		shortDesc: "SpA -1. If target is of opposite gender: also Atk -1, Spe -1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon, target) {
			if ((pokemon.gender === 'M' && target.gender === 'F') || (pokemon.gender === 'F' && target.gender === 'M')) {
				move.secondary = {
					chance: 100,
					boosts: {
						atk: -1,
						spa: -1,
						spe: -1,
					},
				};
			}
		},
		secondary: {
			chance: 100,
			boosts: {
				spa: -1,
			},
		},
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
		shortDesc: "Poison & Atk -1. If target HP < 50%: Bad Poison & Heal Block.",
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
	//Snorlax
	bellyflop: {
		num: 3011,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		name: "Bellyflop",
		desc: "The user crushes the target under the weight of its belly. This move can be used even if the user is asleep, and can leave the target with paralysis.",
		shortDesc: "20% chance of Paralysis. Can be used in Sleep.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, nonsky: 1, metronome: 1},
		sleepUsable: true,
		secondary: {
			chance: 20,
			status: 'par',
		},
		target: "normal",
		type: "Normal",
	},
	//Sudowoodo
	fakebranch: {
		num: 3012,
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		name: "Fake Branch",
		desc: "The user charges a hit, then strikes its target at full force with its fake tree branch. The user will try to avoid Water-type attacks during the charge.",
		shortDesc: "Moves last. Avoid Water-type move for the turn.",
		pp: 15,
		priority: -3,
		flags: {contact: 1, protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('fakebranch');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Fake Branch');
			},
			onTryHitPriority: 2,
			onTryHit(target, source, move) {
				//If move is not Water-type, nothing changes
				if (move.type !== 'Water') {
					return;
				}
				//If move is Water-type without accuracy check, user still takes damage
				if (move.type === 'Water' && move.accuracy === true) {
					return;
				}
				//If move is Water-type with accuracy check, user will avoid damage
				this.add('-miss', source, target);
				this.hint("When charging Fake Branch, the user will avoid Water-type moves unless there is no accuracy check.");

				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				return this.NOT_FAIL;
			},
		},
		// FIXME: onMoveAborted(pokemon) {pokemon.removeVolatile('fakebranch')}, - Irrelevant ? This is from Beak Blast...
		onAfterMove(pokemon) {
			pokemon.removeVolatile('fakebranch');
		},
		secondary: null,
		target: "normal",
		type: "Rock",
	},
	//Scolipede
	poisonwheel: {
		num: 3013,
		accuracy: 95,
		basePower: 100,
		category: "Physical",
		name: "Poison Wheel",
		desc: "The user rolls into a ball and charges madly at its target. This may also poison upon contact.",
		shortDesc: "30% chance of Poison. Strong against Minimize.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, nonsky: 1, metronome: 1},
		secondary: {
			chance: 30,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
	},
	//Noivern
	killerwail: {
		num: 3014,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Killer Wail",
		desc: "The user blasts its target with ultrasonic soundwaves. This move has a high chance of landing a critical hit.",
		shortDesc: "Sound move. High critical hit ratio.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		critRatio: 2,
		secondary: null,
		target: "any",
		type: "Dragon",
	},
	//Weavile
	sinisterclaw: {
		num: 3015,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Sinister Claw",
		desc: "The user slashes the target with extra-cold claws. This move may greately reduce the target's Speed stat or leave the target frozen.",
		shortDesc: "40% chance of Spe -2. 10% chance of Freeze.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondaries: [
			{
				chance: 10,
				status: 'frz',
			}, {
				chance: 40,
				boosts: {
					spe: -2,
				},
			},
		],
		target: "normal",
		type: "Ice",
	},
	//Luvdisc
	loveadvice: {
		num: 3016,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Love Advice",
		desc: "The user provides counseling on love to its target. This move lowers the target's Attack and Special Attack, and changes their Ability to Cute Charm.",
		shortDesc: "Atk -1 & SpA -1. Target's ability changed to Cute Charm.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1, allyanim: 1, metronome: 1},
		//Check for immunities : Unremovable abilities, Cute Charm and Truant. In which cases the move fails altogether
		onTryHit(target) {
			if (target.getAbility().flags['cantsuppress'] || target.ability === 'cutecharm' || target.ability === 'truant') {
				return false;
			}
		},
		//Apply debuff and change target's ability
		onHit(target, source, move) {
			const success = this.boost({atk: -1, spa: -1}, target, source);
			//If the debuff did not land, no ability change
			//In case of Mirror Armor : The debuff is reflected at the user but the target's ability is still changed afterwards
			if (!success && !target.hasAbility('mirrorarmor')) {
				return;
			}
			//Ability change to Cute Charm
			const oldAbility = target.setAbility('cutecharm');
			if (oldAbility) {
				this.add('-ability', target, 'Cute Charm', '[from] move: Love Advice');
				return;
			}
			return oldAbility as false | null;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	//Azumarill
	bubbleball: {
		num: 3017,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Bubble Ball",
		desc: "The user creates a big water bubble and sends it flying to its target, lowering its Speed stat. If the move targets an ally, it will heal instead.",
		shortDesc: "Spe -1. If target is an ally: heals 50% HP instead.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, allyanim: 1, metronome: 1, bullet: 1},
		onTryHit(target, source, move) {
			if (source.isAlly(target)) {
				move.basePower = 0;
				move.secondary = null;
				move.infiltrates = true;
			}
		},
		onTryMove(source, target, move) {
			if (source.isAlly(target) && source.volatiles['healblock']) {
				this.attrLastMove('[still]');
				this.add('cant', source, 'move: Heal Block', move);
				return false;
			}
		},
		onHit(target, source, move) {
			if (source.isAlly(target)) {
				if (!this.heal(Math.floor(target.baseMaxhp * 0.5))) {
					if (target.volatiles['healblock'] && target.hp !== target.maxhp) {
						this.attrLastMove('[still]');
						// Wrong error message, correct one not supported yet
						this.add('cant', source, 'move: Heal Block', move);
					} else {
						this.add('-immune', target);
					}
					return this.NOT_FAIL;
				}
			}
		},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Water",
	},
	//Clawitzer
	waterbombshell: {
		num: 3018,
		accuracy: 90,
		basePower: 110,
		category: "Special",
		name: "Water Bombshell",
		desc: "The user attacks the target with a water missile. The resulting burst damages Pokémon next to the target as well.",
		shortDesc: "Damages Pokemon next to the target as well.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		onHit(target, source, move) {
			for (const ally of target.adjacentAllies()) {
				this.damage(ally.baseMaxhp / 8, ally, source, this.dex.conditions.get('Water Bombshell'));
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			for (const ally of target.adjacentAllies()) {
				this.damage(ally.baseMaxhp / 8, ally, source, this.dex.conditions.get('Water Bombshell'));
			}
		},
		secondary: null,
		target: "normal",
		type: "Water",
	},
	//Mimikyu
	snuggle: {
		num: 3019,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Snuggle",
		desc: "The user attacks its foe with tough love. This move lowers the target's Attack and Defense stats.",
		shortDesc: "Lowers the target's Atk and Def by 1.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
				def: -1,
			},
		},
		target: "normal",
		type: "Fairy",
	},
	//Corviknight
	armorwing: {
		num: 3020,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Armor Wing",
		desc: "The user adjusts its flight for defense. This move raises both the user's Defense and Speed stats.",
		shortDesc: "Raises the user's Def by 2 and its Spe by 1.",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		boosts: {
			def: 2,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Flying",
	},
	//Bellibolt
	bellyspot: {
		num: 3021,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Belly Spot",
		desc: "The user redirects all opposing attacks to itself using its shining belly. Direct contact with the user will paralyse the attacker.",
		shortDesc: "Draws foes' moves to the user. Paralyzes on contact.",
		pp: 10,
		priority: 2,
		flags: {noassist: 1, failcopycat: 1},
		volatileStatus: 'bellyspot',
		onTry(source) {
			return this.activePerHalf > 1;
		},
		condition: {
			duration: 1,
			onStart(target, source, effect) {
				if (effect?.id === 'zpower') {
					this.add('-singleturn', target, 'move: Belly Spot', '[zeffect]');
				} else {
					this.add('-singleturn', target, 'move: Belly Spot');
				}
			},
			onFoeRedirectTargetPriority: 1,
			onFoeRedirectTarget(target, source, source2, move) {
				if (!this.effectState.target.isSkyDropped() && this.validTarget(this.effectState.target, source, move.target)) {
					if (move.smartTarget) move.smartTarget = false;
					this.debug("Follow Me redirected target of move");
					return this.effectState.target;
				}
			},
			onDamagingHit(damage, target, source, move) {
				if (this.checkMoveMakesContact(move, source, target)) {
					source.trySetStatus('par', target);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Electric",
		//left in for technicality but won't be used without z-moves
		zMove: {effect: 'clearnegativeboost'},
	},

	//Old moves remixed (for technicality)
	//Heal block status is defined in the 'Heal Block' move, so the duration of the status effect is set inside the move itself
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
	//Moves boosted against a target that used Minimize are defined inside the move itself
	minimize: {
		num: 107,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Minimize",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		volatileStatus: 'minimize',
		condition: {
			noCopy: true,
			onRestart: () => null,
			onSourceModifyDamage(damage, source, target, move) {
				const boostedMoves = [
					'stomp', 'steamroller', 'bodyslam', 'flyingpress', 'dragonrush', 'heatcrash', 'heavyslam', 'maliciousmoonsault',
					'poisonwheel',
				];
				if (boostedMoves.includes(move.id)) {
					return this.chainModify(2);
				}
			},
			onAccuracy(accuracy, target, source, move) {
				const boostedMoves = [
					'stomp', 'steamroller', 'bodyslam', 'flyingpress', 'dragonrush', 'heatcrash', 'heavyslam', 'maliciousmoonsault',
					'poisonwheel',
				];
				if (boostedMoves.includes(move.id)) {
					return true;
				}
				return accuracy;
			},
		},
		boosts: {
			evasion: 2,
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
};
