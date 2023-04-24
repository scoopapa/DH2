/*

List of flags and their descriptions:

authentic: Ignores a target's substitute.
bite: Power is multiplied by 1.5 when used by a Pokemon with the Strong Jaw Ability.
bullet: Has no effect on Pokemon with the Bulletproof Ability.
charge: The user is unable to make a move between turns.
contact: Makes contact.
dance: When used by a Pokemon, other Pokemon with the Dancer Ability can attempt to execute the same move.
defrost: Thaws the user if executed successfully while the user is frozen.
distance: Can target a Pokemon positioned anywhere in a Triple Battle.
gravity: Prevented from being executed or selected during Gravity's effect.
heal: Prevented from being executed or selected during Heal Block's effect.
mirror: Can be copied by Mirror Move.
mystery: Unknown effect.
nonsky: Prevented from being executed or selected in a Sky Battle.
powder: Has no effect on Grass-type Pokemon, Pokemon with the Overcoat Ability, and Pokemon holding Safety Goggles.
protect: Blocked by Detect, Protect, Spiky Shield, and if not a Status move, King's Shield.
pulse: Power is multiplied by 1.5 when used by a Pokemon with the Mega Launcher Ability.
punch: Power is multiplied by 1.2 when used by a Pokemon with the Iron Fist Ability.
recharge: If this move is successful, the user must recharge on the following turn and cannot make a move.
reflectable: Bounced back to the original user by Magic Coat or the Magic Bounce Ability.
snatch: Can be stolen from the original user and instead used by another Pokemon using Snatch.
sound: Has no effect on Pokemon with the Soundproof Ability.

*/

export const Moves: {[moveid: string]: MoveData} = {

	acupressure: {
		num: 367,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Lowers Def, SpD by 1; raises Atk, SpA, Spe by 1.",
		name: "Acupressure",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			def: -1,
			spd: -1,
			atk: 1,
			spa: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'crit2'},
		contestType: "Tough",
	},
	aerialace: {
		num: 332,
		accuracy: true,
		basePower: 50,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Aerial Ace damage boost');
				return move.basePower * 2;
			}
			this.debug('Aerial Ace NOT boosted');
			return move.basePower;
		},
		category: "Physical",
		shortDesc: "Power doubles if user moves before target.",
		name: "Aerial Ace",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, distance: 1},
		secondary: null,
		target: "any",
		type: "Flying",
		contestType: "Cool",
	},
	armthrust: {
		num: 292,
		accuracy: 100,
		basePower: 15,
		category: "Physical",
		name: "Arm Thrust",
		pp: 20,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},
	aurorabeam: {
		num: 62,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "Lowers target's SpD by one stage.",
		name: "Aurora Beam",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Ice",
	},
	armthrust: {
		num: 292,
		accuracy: 100,
		basePower: 15,
		category: "Physical",
		name: "Arm Thrust",
		pp: 20,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},
	avalanche: {
		num: 419,
		accuracy: 100,
		basePower: 80,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || !this.queue.willMove(target)) {
				this.debug('Avalanche damage boost');
				return move.basePower * 1.5;
			}
			this.debug('Avalance NOT boosted');
			return move.basePower;
		},
		category: "Physical",
		shortDesc: "Power 1.5x if user moves after target.",
		name: "Avalanche",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	batonpass: {
		num: 226,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Switches out. Incoming Ally: +1 Speed",
		name: "Baton Pass",
		pp: 20,
		priority: 0,
		flags: {},
		slotCondition: 'batonpass',
		condition: {
			onSwap(target) {
				if (!target.fainted) {
					this.add('-message', target.name + " received the baton!");
					const boost = this.boost({spe: 1}, target, target);
				}
				target.side.removeSlotCondition(target, 'batonpass');
			},
		},
		selfSwitch: true,
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	beakblast: {
		num: 690,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		shortDesc: "Burns if user moves before the target.",
		isNonstandard: null,
		gen: 8,
		name: "Beak Blast",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1},
		secondary: {
			chance: 100,
			onHit(target, source) {
				if (target.newlySwitched || this.queue.willMove(target)) {
					target.trySetStatus('brn', source);
				}
			}
		},
		target: "normal",
		type: "Flying",
		contestType: "Tough",
	},
	bonerush: {
		num: 198,
		accuracy: 85,
		basePower: 120,
		category: "Physical",
		shortDesc: "Has 1/2 recoil.",
		name: "Bone Rush",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		recoil: [1, 2],
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	brickbreak: {
		num: 280,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		shortDesc: "Destroys screens, unless target immune; breaks protect.",
		name: "Brick Break",
		pp: 10,
		priority: 0,
		flags: {contact: 1, mirror: 1, punch: 1},
		breaksProtect: true,
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			if (pokemon.runImmunity('Fighting')) {
				pokemon.side.removeSideCondition('reflect');
				pokemon.side.removeSideCondition('lightscreen');
				pokemon.side.removeSideCondition('auroraveil');
			}
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
	},
	brine: {
		num: 362,
		accuracy: 100,
		basePower: 65,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Special",
		shortDesc: "Power doubles if the target has a status ailment.",
		name: "Brine",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Tough",
	},
	burningjealousy: {
		num: 807,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "Raises user's Sp. Atk. by 1 when target had a stat rise this turn.",
		name: "Burning Jealousy",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (target?.statsRaisedThisTurn) this.boost({spa: 1}, pokemon, pokemon, move);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fire",
		contestType: "Tough",
	},
	coaching: {
		num: 811,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Next turn, the active Pokemon will gain +1 in Atk, Def and Spe.",
		name: "Coaching",
		pp: 10,
		priority: 0,
		flags: {authentic: 1},
		slotCondition: 'Coaching',
		condition: {
			duration: 2,
			onStart(target) {
				this.add('-message', target.name + " is ready to coach!");
			},
			onResidualOrder: 7,
			onEnd(target) {
				if (!target.fainted) {
					this.add('-message', target.name + " gained some motivation!");
					const boost = this.boost({atk: 1, def: 1, spe: 1}, target, target);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Fighting",
	},
	cometpunch: {
		num: 4,
		accuracy: 85,
		basePower: 25,
		category: "Physical",
      shortDesc: "Hits 2-5 times. Inflicts torment.",
		name: "Comet Punch",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		multihit: [2, 5],
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('torment');
			},
		},
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
	},
	//not finished
	/*corrosivegas: {
		num: 810,
		accuracy: 95,
		basePower: 0,
		category: "Status",
		name: "Corrosive Gas",
		pp: 40,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, mystery: 1},
		onHit(target, source, move) {
			const item = target.takeItem(source);
			if (item) {
				this.add('-enditem', target, item.name, '[from] move: Corrosive Gas', '[of] ' + source && target.addVolatile('corrosed'));
			}
		},
		secondary: null,
		target: "allAdjacent",
		type: "Poison",
	},*/
	crushgrip: {
		num: 462,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		shortDesc: "Forces the target to swtich to a random ally.",
		name: "Crush Grip",
		pp: 5,
		priority: -6,
		flags: {contact: 1, protect: 1, mirror: 1},
		forceSwitch: true,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 190},
		maxMove: {basePower: 140},
		contestType: "Tough",
	},
	decorate: {
		num: 777,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "Uses heals HP=target's Spe stat. Lowers Spe by 1.",
		name: "Decorate",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, heal: 1},
		onHit(target, source) {
			if (target.boosts.spe === -6) return false;
			const spe = target.getStat('spe', false, true);
			const success = this.boost({spe: -1}, target, source, null, false, true);
			return !!(this.heal(spe, source, target) || success);
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		zMove: {boost: {def: 1}},
		contestType: "Cute",
	},
	disarmingvoice: {
		num: 574,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "100% chance to lower target's Sp. Def by 1.",
		name: "Disarming Voice",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Fairy",
		contestType: "Cute",
	},
	//not finished
	/*dive: {
		num: 291,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Dive",
		pp: 10,
		priority: 0,
		flags: {contact: 1, charge: 1, protect: 1, mirror: 1, nonsky: 1},
		self: {
			volatileStatus: 'diving',
		},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			if (attacker.hasAbility('gulpmissile') && attacker.species.name === 'Cramorant' && !attacker.transformed) {
				const forme = attacker.hp <= attacker.maxhp / 2 ? 'cramorantgorging' : 'cramorantgulping';
				attacker.formeChange(forme, move);
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		condition: {
			duration: 2,
			onImmunity(type, pokemon) {
				if (type === 'sandstorm' || type === 'hail') return false;
			},
			onInvulnerability(target, source, move) {
				if (['surf', 'whirlpool'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.id === 'surf' || move.id === 'whirlpool') {
					return this.chainModify(2);
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
   },
	dive: { Rass' Attempt (Move Passing Works, but still some issues regarding invulnerability)
		num: 291,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Dive",
		pp: 10,
		priority: 0,
		flags: {contact: 1, charge: 1, protect: 1, mirror: 1, nonsky: 1},
		slotCondition: 'dive',
		onTryMove(attacker, defender, move) {
			attacker.side.addSlotCondition(attacker, 'dive');
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			else if (attacker.hp &&  this.canSwitch(attacker.side)) {
				attacker.switchFlag = true;
				attacker.side.removeSideCondition('dive');
			}
			if (attacker.hasAbility('gulpmissile') && attacker.species.name === 'Cramorant' && !attacker.transformed) {
				const forme = attacker.hp <= attacker.maxhp / 2 ? 'cramorantgorging' : 'cramorantgulping';
				attacker.formeChange(forme, move);
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		condition: {
			duration: 2,
			onSwap(target) {
				target.side.removeSideCondition('dive');
				this.runMove('dive2', target, this.getTargetLoc(target.side.foe.active[0], target), null, false, true);
			},
			onImmunity(type, pokemon) {
				if (type === 'sandstorm' || type === 'hail') return false;
			},
			onInvulnerability(target, source, move) {
				if (['surf', 'whirlpool'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.id === 'surf' || move.id === 'whirlpool') {
					return this.chainModify(2);
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},
	dive2: {
		num: 291,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Dive",
		pp: 10,
		priority: 0,
		flags: {contact: 1, charge: 1, protect: 1, mirror: 1, nonsky: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			if (attacker.hasAbility('gulpmissile') && attacker.species.name === 'Cramorant' && !attacker.transformed) {
				const forme = attacker.hp <= attacker.maxhp / 2 ? 'cramorantgorging' : 'cramorantgulping';
				attacker.formeChange(forme, move);
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		condition: {
			duration: 2,
			onImmunity(type, pokemon) {
				if (type === 'sandstorm' || type === 'hail') return false;
			},
			onInvulnerability(target, source, move) {
				if (['surf', 'whirlpool'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.id === 'surf' || move.id === 'whirlpool') {
					return this.chainModify(2);
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	}, */
	dragonhammer: {
		num: 692,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		shortDesc: "Has 33% recoil.",
		name: "Dragon Hammer",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [33, 100],
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
	},
	dreameater: {
		num: 138,
		accuracy: 100,
		basePower: 70,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'slp' || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Special",
		shortDesc: "Power doubles if target is asleep.",
		name: "Dream Eater",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	drillpeck: {
		num: 65,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Destroys screens, unless the target is immune.",
		name: "Drill Peck",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, distance: 1},
		onBasePower(basePower, pokemon, target) {
			const sideConditions = [
				'lightscreen', 'reflect', 'auroraveil',
			];
			for (const id of sideConditions) {
				if(target.side.sideConditions[id]) {
					return this.chainModify(1.5);
				}
			}
		},
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			if (pokemon.runImmunity('Flying')) {
				pokemon.side.removeSideCondition('reflect');
				pokemon.side.removeSideCondition('lightscreen');
				pokemon.side.removeSideCondition('auroraveil');
			}
		},
		secondary: null,
		target: "any",
		type: "Flying",
		contestType: "Cool",
	},
	eerieimpulse: {
		num: 598,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "Lowers target's Sp. Atk by 2. User switches.",
		name: "Eerie Impulse",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		boosts: {
			spa: -2,
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Electric",
		zMove: {boost: {spd: 1}},
		contestType: "Clever",
	},
	eeriespell: {
		num: 826,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "Torments the target.",
		name: "Eerie Spell",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('torment');
			},
		},
		target: "normal",
		type: "Psychic",
	},
	eggbomb: {
		num: 121,
		accuracy: 90,
		basePower: 0,
		damage: 'level',
		category: "Physical",
		shortDesc: "Deals damage equal to the user's level. The user regains 1/2 damage dealt.",
		name: "Egg Bomb",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, nonsky: 1, heal: 1},
    drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cute",
		
	},
	ember: {
		num: 52,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		shortDesc: "+1 Priority in sunlight.",
		name: "Ember",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyPriority(priority, source, target, move) {
			if (['sunnyday', 'desolateland'].includes(source.effectiveWeather())) {
				return priority + 1;
			}
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Cute",
	},
	eternabeam: {
		num: 795,
		accuracy: 90,
		basePower: 110,
		category: "Special",
		shortDesc: "User loses 10% of their max hp.",
		name: "Eternabeam",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		mindBlownRecoil: true,
		onAfterMove(pokemon, target, move) {
			if (move.mindBlownRecoil && !move.multihit) {
				this.damage(Math.round(pokemon.maxhp / 10), pokemon, pokemon, this.dex.getEffect('Eternabeam'), true);
			}
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
	},
	extrasensory: {
		num: 326,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "Uses user's Sp. Def stat as Sp. Atk in damage calculation.",
		name: "Extrasensory",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		useSourceDefensiveAsOffensive: true,
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	fairywind: {
		num: 263,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "Power doubles of user is burn/poison/paralyzed.",
		inherit: true,
		isNonstandard: null,
		gen: 8,
		name: "Fairy Wind",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower, pokemon) {
			if (pokemon.status && pokemon.status !== 'slp') {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Beautiful",
	},
	falsesurrender: {
		num: 793,
		accuracy: true,
		basePower: 80,
		category: "Physical",
		shortDesc: "Target's defense drops 1 stage, then user attacks.",
		name: "False Surrender",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('falsesurrender');
			this.add('-message', pokemon.name + " bows its head!");
		},
		condition: {
			duration: 1,
			onBeforeMove(pokemon, target, move) {
				this.add('-message', target.name + " let its guard down!");
				this.boost({def: -1}, target, pokemon, move);
			},
		},
		onMoveAborted(pokemon) {
				pokemon.removeVolatile('falsesurrender');
		},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('falsesurrender');
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	flamewheel: {
		num: 172,
		accuracy: 100,
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the flame wheel succeeds
			if (target.beingCalledBack) {
				this.debug('Flame Wheel damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		shortDesc: "If a foe is switching out, hits at 2x power.",
		name: "Flame Wheel",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, defrost: 1},
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side === pokemon.side) continue;
				side.addSideCondition('flamewheel', pokemon);
				const data = side.getSideConditionData('flamewheel');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack) move.accuracy = true;
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('flamewheel');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Flame Wheel start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectData.sources) {
					if (!this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Flame Wheel');
						alreadyAdded = true;
					}
					// Run through each action in queue to check if the Flame Wheel user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (source.canMegaEvo || source.canUltraBurst) {
						for (const [actionIndex, action] of this.queue.entries()) {
							if (action.pokemon === source && action.choice === 'megaEvo') {
								this.runMegaEvo(source);
								this.queue.list.splice(actionIndex, 1);
								break;
							}
						}
					}
					this.runMove('flamewheel', source, this.getTargetLoc(pokemon, source));
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	flowershield: {
		num: 579,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Protects from moves. Contact: leech seed.",
		name: "Flower Shield",
		pp: 10,
		priority: 4,
		flags: {distance: 1},
		stallingMove: true,
		volatileStatus: 'flowershield',
		onTryHit(target, source, move) {
			return !!this.queue.willAct() && this.runEvent('StallMove', target);
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
					if (move.isZ || (move.isMax && !move.breaksProtect)) target.getMoveHitData(move).zBrokeProtect = true;
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
				if (move.flags['contact'] && !source.hasType('Grass')) {
					source.addVolatile('leechseed', target);
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && move.flags['contact'] && !source.hasType('Grass')) {
					source.addVolatile('leechseed', target);
				}
			},
		},
		target: "self",
		type: "Fairy",
		zMove: {boost: {def: 1}},
		contestType: "Beautiful",
	},
	forcepalm: {
		num: 395,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "30% chance to paralyze the target. Power doubles if the target is paralyzed.",
		name: "Force Palm",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePower(basePower, pokemon, target) {
			if (target.status === 'par') {
				return this.chainModify(2);
			}
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
	},
	forestscurse: {
		num: 571,
		accuracy: 90,
		basePower: 0,
		category: "Status",
		shortDesc: "For four turns, Foes -1/16th max HP. -1/8th with Binding Band. Bypasses Substitute.",
		name: "Forest's Curse",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, mystery: 1},
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('gmaxvinelash');
			},
		},
		condition: {
			duration: 4,
			onStart(targetSide) {
				this.add('-sidestart', targetSide, 'G-Max Vine Lash');
			},
			onResidualOrder: 5,
			onResidualSubOrder: 1.1,
			onResidual(targetSide) {
				for (const pokemon of targetSide.active) {
					if (!pokemon.hasType('Grass')) this.damage(pokemon.baseMaxhp / 16, pokemon);
					if (pokemon.item === 'bindingband') this.damage(pokemon.baseMaxhp / 8, pokemon);
				}
			},
			onEnd(targetSide) {
				for (const pokemon of targetSide.active) {
					if (!pokemon.hasType('Grass')) this.damage(pokemon.baseMaxhp / 16, pokemon);
					if (pokemon.item === 'bindingband') this.damage(pokemon.baseMaxhp / 8, pokemon);
				}
				this.add('-sideend', targetSide, 'G-Max Vine Lash');
			},
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Clever",
	},
	freezeshock: {
		num: 553,
		accuracy: 85,
		basePower: 100,
		category: "Physical",
		shortDesc: "20% chance to Paralyze target.",
		name: "Freeze Shock",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			status: 'par',
		},
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	gearup: {
		num: 674,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Raises the user's Atk, SpA and Spe by 1 stage.",
		name: "Gear Up",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			atk: 1,
			spa: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Steel",
		contestType: "Clever",
	},
	glaciate: {
		num: 549,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		shortDesc: "Physical if user's Atk > Sp. Atk. Ignores Abilities.",
		name: "Glaciate",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		ignoreAbility: true,
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
   },
	// For Magnitude update
	grassyterrain: {
		num: 580,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Grassy Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'grassyterrain',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				const weakenedMoves = ['earthquake', 'bulldoze'];
				if (weakenedMoves.includes(move.id)) {
					this.debug('move weakened by grassy terrain');
					return this.chainModify(0.5);
				}
				if (move.type === 'Grass' && attacker.isGrounded()) {
					this.debug('grassy terrain boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Grassy Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Grassy Terrain');
				}
			},
			onResidualOrder: 5,
			onResidualSubOrder: 3,
			onResidual() {
				this.eachEvent('Terrain');
			},
			onTerrain(pokemon) {
				if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
					this.debug('Pokemon is grounded, healing through Grassy Terrain.');
					this.heal(pokemon.baseMaxhp / 16, pokemon, pokemon);
				}
			},
			onEnd() {
				if (!this.effectData.duration) this.eachEvent('Terrain');
				this.add('-fieldend', 'move: Grassy Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Grass",
		zMove: {boost: {def: 1}},
		contestType: "Beautiful",
	},
	guillotine: {
		num: 12,
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		shortDesc: "Fails if user is above 1/2 maximum hp.",
		name: "Guillotine",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTry(pokemon, target) {
			if (pokemon.hp > pokemon.maxhp / 2 || pokemon.maxhp === 1) { //Shedinja Clause
				this.add('-fail', pokemon);
				this.attrLastMove('[still]');
				this.hint("Guillotine only works when the user is at 1/2 health or below.");
				return null;
			}
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
   horndrill: {
      num: 32,
      accuracy: 85,
      basePower: 130,
      category: "Physical",
		  shortDesc: "20% chance to lower the target's Def by one stage.",
      name: "Horn Drill",
      pp: 5,
      priority: 0,
      flags: {contact: 1, protect: 1, mirror: 1},
      secondary: {
         chance: 20,
         boosts: {
           def: -1,
         },
      },
      target: "normal",
      type: "Normal",
      contestType: "Cool",
	},
	hyperspacehole: {
		num: 593,
		accuracy: true,
		basePower: 80,
		category: "Special",
		shortDesc: "Sets Gravity for 5 turns.",
		isNonstandard: null,
		name: "Hyperspace Hole",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, authentic: 1},
		self: {
			onHit(source) {
				this.field.addPseudoWeather('gravity', source);
			}
		},
		breaksProtect: true,
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	iceball: {
		num: 301,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		shortDesc: "100% chance to raise the user's Speed by 1.",
		inherit: true,
		isNonstandard: null,
		gen: 8,
		name: "Ice Ball",
		pp: 20,
		priority: 0,
		flags: {bullet: 1, contact: 1, protect: 1, mirror: 1, bullet: 1},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	iceburn: {
		num: 554,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		shortDesc: "30% chance to Burn target.",
		name: "Ice Burn",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	inferno: {
		num: 517,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		shortDesc: "20% chance to burn the target. Power doubles if the target is burned.",
		name: "Inferno",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower, pokemon, target) {
			if (target.status === 'brn') {
				return this.chainModify(2);
			}
		},
		secondary: {
			chance: 20,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	irontail: {
		num: 231,
		accuracy: 75,
		basePower: 100,
		category: "Physical",
		shortDesc: "100% chance to lower target's defense stat by 1 stage.",
		name: "Iron Tail",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	jawlock: {
		num: 746,
		accuracy: 90,
		basePower: 80,
		category: "Physical",
		shortDesc: "Each turn, target looses 1/8 max HP until either it or the user switches out.",
		name: "Jaw Lock",
		pp: 15,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		volatileStatus: 'jawlock',
		secondary: null,
		target: "normal",
		type: "Rock",
	},
	leaftornado: {
		num: 536,
		accuracy: 75,
		basePower: 100,
		category: "Special",
		shortDesc: "Traps and damages target for 4-5 turns.",
		name: "Leaf Tornado",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	lifedew: {
		num: 791,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "33% healing to self. 25% healing to next incoming ally.",
		name: "Life Dew",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1, authentic: 1},
		heal: [33, 100],
		slotCondition: 'lifedew',
		condition: {
			onSwap(target) {
				if (!target.fainted) {
					target.heal(target.baseMaxhp / 4);
					// this.add('-heal', target, target.getHealth, '[from] move: Life Dew'); Redundant message, and I prefer the flavor text over the generic
					this.add('-message', target.name + " was revitalized by the Life Dew!");
					target.side.removeSlotCondition(target, 'lifedew');
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Water",
	},
 	lowsweep: {
		num: 490,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Low Sweep",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Fighting",
		contestType: "Clever",
	},
	magneticflux: {
		num: 602,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Raises Atk, Def, SpA, SpD of allies with Plus/Minus by 1.",
		name: "Magnetic Flux",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, distance: 1, authentic: 1},
		onHitSide(side, source, move) {
			const targets = [];
			for (const pokemon of side.active) {
				if (pokemon.hasAbility(['plus', 'minus'])) {
					targets.push(pokemon);
				}
			}
			if (!targets.length) return false;
			let didSomething = false;
			for (const target of targets) {
				didSomething = this.boost({atk: 1, def: 1, spa: 1, spd: 1}, target, source, move, false, true) || didSomething;
			}
			return didSomething;
		},
		secondary: null,
		target: "allySide",
		type: "Electric",
		zMove: {boost: {spd: 1}},
		contestType: "Clever",
	},
	magnitude: {
		num: 222,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			const targetWeight = target.getWeight();
			const pokemonWeight = pokemon.getWeight();
			if (pokemonWeight > targetWeight * 5) {
				return 120;
			}
			if (pokemonWeight > targetWeight * 4) {
				return 100;
			}
			if (pokemonWeight > targetWeight * 3) {
				return 80;
			}
			if (pokemonWeight > targetWeight * 2) {
				return 60;
			}
			return 40;
		},
		category: "Physical",
		shortDesc: "More power the heavier the user is than the target.",
		isNonstandard: null,
		name: "Magnitude",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		secondary: null,
		// While target type is not explicitly on sub, GTerrain is meant to reduce the power of all multitarget Ground attacks. As GTerrain resistance was removed, this change is for consistency
		target: "normal",
		type: "Ground",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Tough",
	},
	mirrorshot: {
    num: 429,
		accuracy: 100,
		basePower: 95,
		category: "Special",
      shortDesc: "Damage is calculated using the target's SpA stat, including any stat changes.",
		name: "Mirror Shot",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		useTargetOffensive: true,
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Beautiful",
	},
	mistyexplosion: {
		num: 802,
		accuracy: 100,
		basePower: 150,
		category: "Special",
		shortDesc: "User faints. User on Misty Terrain: 1.5x power.",
		name: "Misty Explosion",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		selfdestruct: "always",
		onBasePower(basePower, source) {
			if (this.field.isTerrain('mistyterrain') && source.isGrounded()) {
				this.debug('misty terrain boost');
				return this.chainModify(1.5);
			}
		},
		secondary: null,
		target: "allAdjacent",
		type: "Fairy",
	},
	nightdaze: {
		num: 539,
		accuracy: 95,
		basePower: 130,
		category: "Special",
		shortDesc: "Lowers the user's Sp. Atk by 2.",
		name: "Night Daze",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				spa: -2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	nightmare: {
		num: 171,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "Target flinches and becomes weaker to Ghost attacks; +3 Priority.",
		isNonstandard: null,
		name: "Nightmare",
		pp: 15,
		priority: 3,
		flags: {protect: 1, mirror: 1},
		onTry(pokemon, target) {
			if (pokemon.activeMoveActions > 1) {
				this.attrLastMove('[still]');
				this.add('-fail', pokemon);
				this.hint("Nightmare only works on your first turn out.");
				return null;
			}
		},
		volatileStatus: 'nightmare',
		condition: {
			noCopy: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Nightmare');
			},
			onEffectivenessPriority: -2,
			onEffectiveness(typeMod, target, type, move) {
				if (move.type !== 'Ghost') return;
				if (!target) return;
				if (type !== target.getTypes()[0]) return;
				return typeMod + 1;
			},
			
		},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Ghost",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
	octazooka: {
		num: 190,
		accuracy: 85,
		basePower: 70,
		category: "Special",
		shortDesc: "50% chance to lower the target's accuracy by 1 and badly poison the target.",
		name: "Octazooka",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		secondaries: [
		{
			chance: 50,
			boosts: {
				accuracy: -1,
			},
		},
		{
			chance: 50,
			status: 'tox',
		},
		],
		target: "normal",
		type: "Water",
		contestType: "Tough",
	},
	ominouswind: {
		num: 466,
		accuracy: 95,
		basePower: 50,
		category: "Special",
		shortDesc: "Raises all stats by 1 (not acc/eva) if this KOes the target. Otherwise, user loses 1/8 of its max HP.",
		name: "Ominous Wind",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) 
			this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, pokemon, pokemon, move);
			else this.damage(pokemon.baseMaxhp / 8);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Beautiful",
	},
	paraboliccharge: {
		num: 570,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		shortDesc: "User recovers 50% of the damage dealt. Raises the user's Sp. Def by 1.", 
		name: "Parabolic Charge",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spd: 1,
				},
			},
		},
		target: "normal",
		type: "Electric",
		contestType: "Clever",
	},
	petaldance: {
		num: 80,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "50% chance to raise user's Sp. Atk by 1.",
		name: "Petal Dance",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, dance: 1},
		secondary: {
			chance: 50,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Grass",
		contestType: "Beautiful",
	},
	poisontail: {
		num: 342,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		shortDesc: "Poisons target. Will always crit against poisoned targets.",
		name: "Poison Tail",
		pp: 40,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyCritRatio(critRatio, source, target) {
			if (target.status === 'psn' || target.status === 'tox') {
				critRatio: true;
			}
		},
		secondary: {
			chance: 100,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	prismaticlaser: {
		num: 711,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		shortDesc: "Super effective on Steel.",
		name: "Prismatic Laser",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Steel') return 1;
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	razorwind: {
		num: 13,
		accuracy: 100,
		basePower: 110,
		category: "Special",
		shortDesc: "Clears the opponents hazards.",
		inherit: true,
		isNonstandard: null,
		gen: 8,
		shortDesc: "The user clears hazards from the opponents side.",
		name: "Razor Wind",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1},
		onHit(target, source) {
			if (!target.volatiles['substitute'] || move.infiltrates);
			const removeTarget = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeTarget.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.getEffect(targetCondition).name, '[from] move: Razor Wind', '[of] ' + source);
				}
			}
		},
		critRatio: 2,
		secondary: null,
		target: "allAdjacentFoes",
		type: "Flying",
		contestType: "Cool",
	},
	rocksmash: {
		num: 249,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "1.5x power when Stealth Rock are on the field. Removes Stealth Rock.",
		name: "Rock Smash",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePower(power, user) {
		if (user.side.removeSideCondition('stealthrock')) {
			this.add('-sideend', user.side, "Stealth Rock", '[from] move: Rapid Spin', '[of] ' + user);
			return power * 1.5;
			}
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},
	rockwrecker: {
		num: 439,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		shortDesc: "Charges turn 1. Hits turn 2. No charge in Sandstorm.",
		name: "Rock Wrecker",
		pp: 5,
		priority: 0,
		flags: {bullet: 1, recharge: 1, protect: 1, mirror: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (['sandstorm'].includes(attacker.effectiveWeather())) {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	scaryface: {
		num: 184,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "Traps target; slows target by 1 at the end of each turn.",
		name: "Scary Face",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, mystery: 1},
		onTryImmunity(target) {
			return this.dex.getImmunity('trapped', target);
		},
		volatileStatus: 'scaryface',
		condition: {
			onStart(pokemon, source) {
				this.add('-start', pokemon, 'move: Scary Face', '[of] ' + source);
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				const source = this.effectData.source;
				if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns)) {
					delete pokemon.volatiles['scaryface'];
					this.add('-end', pokemon, 'Scary Face', '[partiallytrapped]', '[silent]');
					return;
				}
				this.boost({spe: -1}, pokemon, source, this.dex.getActiveMove('scaryface'));
			},
			onTrapPokemon(pokemon) {
				if (this.effectData.source && this.effectData.source.isActive) pokemon.tryTrap();
			},
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {boost: {spe: 1}},
		contestType: "Tough",
	},
	seedbomb: {
		num: 402,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "50% chance to inflict Leech Seed on foe.",
		name: "Seed Bomb",
		pp: 15,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 50,
			volatileStatus: 'leechseed',
		},
		target: "normal",
		type: "Grass",
		contestType: "Tough",
	},
	selfdestruct: {
		num: 120,
		accuracy: 100,
		basePower: 175,
		category: "Physical",
		shortDesc: "User loses 1/2 max HP.",
		name: "Self-Destruct",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		mindBlownRecoil: true,
		onAfterMove(pokemon, target, move) {
			if (move.mindBlownRecoil && !move.multihit) {
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.getEffect('Self-Destruct'), true);
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	shadowforce: {
		num: 467,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		shortDesc: "Reduces damage recieved by 1/2 before attacking.",
		name: "Shadow Force",
		pp: 5,
		priority: -3,
		flags: {contact: 1, charge: 1, mirror: 1},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('shadowforce');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				//this.add('-singleturn', pokemon, 'move: Shadow Force'); Redundant Text
				this.add('-message', pokemon.name + " has entered the shadows!");
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.category === 'Special' || move.category === 'Physical') {
					return this.chainModify(0.5);
				}
			},
		},
		onMoveAborted(pokemon) {
				pokemon.removeVolatile('shadowforce');
		},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('shadowforce');
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},
	sheercold: {
		num: 329,
		accuracy: 100,
		basePower: 150,
		basePowerCallback(pokemon, target, move) {
			return move.basePower * pokemon.hp / pokemon.maxhp;
		},
		category: "Special",
		shortDesc: "Less power as the user's hp decreases.",
		name: "Sheer Cold",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	sing: {
		num: 47,
		accuracy: 60,
		basePower: 0,
		category: "Status",
		shortDesc: "User heals 1/4 of its max HP when it puts the target to sleep. Fails if already asleep.",
		name: "Sing",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1, heal: 1},
		onHit(pokemon, source, target) {
			for (const target of source.side.foe.active) {
			if (target.status === 'slp') {
				this.add('-fail', target);
				return null;
			}
			this.heal(pokemon.maxhp / 2, source) && target.trySetStatus('slp');
			}
		},
		/*self: {
			onHit(attacker, source) {
				for (const pokemon of source.side.foe.active) {
					const result = this.random(1);
					if (result === 0) {
						pokemon.trySetStatus('slp', source);
						this.heal(attacker.baseMaxhp / 4);
					} else if (target.status === 'slp' || target.hasAbility('comatose')) {
						this.add('-fail', target, 'move: Substitute');
						return null;
					}
				}
			},
		},*/
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {boost: {spe: 1}},
		contestType: "Cute",
	},
	skittersmack: {
		num: 806,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		shortDesc: "100% chance to lower target's Evasion by 1.",
		name: "Skitter Smack",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				evasion: -1,
			},
		},
		target: "normal",
		type: "Bug",
	},
	soak: {
		num: 487,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "Changes the target's type and its following attack to Water.",
		name: "Soak",
		pp: 20,
		priority: 1,
		flags: {protect: 1, reflectable: 1, mirror: 1, mystery: 1},
		pseudoWeather: 'soakcondition',
		onHit(target) {
			if (target.getTypes().join() === 'Water' || !target.setType('Water')) {
				// Soak should animate even when it fails.
				// Returning false would suppress the animation.
				this.add('-fail', target);
				return null;
			}
			this.add('-start', target, 'typechange', 'Water');
		},
		secondary: null,
		target: "normal",
		type: "Water",
		zMove: {boost: {spa: 1}},
		contestType: "Cute",
	},
	soakcondition: {
		num: 569,
		accuracy: true,
		basePower: 0,
		category: "Status",
		inherit: true,
		isNonstandard: null,
		gen: 8,
		name: "Soak Condition",
		pp: 25,
		priority: 1,
		flags: {},
		pseudoWeather: 'soakcondition',
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-fieldactivate', 'move: Soak');
			},
			onModifyTypePriority: -2,
			onModifyType(move) {
				if (move.category !== 'Status') {
					move.type = 'Water';
					this.debug(move.name + "'s type changed to Water");
				}
			},
		},		
		secondary: null,
		target: "all",
		type: "Electric",
		zMove: {boost: {spa: 1}},
		contestType: "Beautiful",
	},
	spark: {
		num: 209,
		accuracy: 100,
		basePower: 75,
		// Counters out damage reduction from burn instead of having to alter scripts
		basePowerCallback(pokemon, target, move) {
			if (pokemon.status && pokemon.status === 'brn' && move.category === 'Physcial') {
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		shortDesc: "1.5x damage if user is burned, 30% chance to burn target.",
		name: "Spark",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePower(basePower, pokemon) {
			if (pokemon.status && pokemon.status === 'brn') {
				return this.chainModify(1.5);
			}
		},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	sparklingaria: {
		num: 664,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		shortDesc: "Cures own team of burns upon hit.",
		name: "Sparkling Aria",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		secondary: {
			chance: 100,
			onHit(target, source) {
				this.add('-activate', source, 'move: Sparkling Aria');
				for (const ally of source.side.pokemon) {
					if (ally !== source && ally.hasAbility('soundproof')) continue;
					if (ally.status && ally.status === 'brn') {
						ally.cureStatus();
					}
				}
			},
		},
		target: "allAdjacent",
		type: "Water",
		contestType: "Tough",
	},
	steamroller: {
		num: 537,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		shortDesc: "Combines Ground in its type effectiveness.",
		name: "Steamroller",
		pp: 10,
		flags: {contact: 1, protect: 1, mirror: 1, nonsky: 1},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Ground', type);
		},
		priority: 0,
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Tough",
	},
	steelroller: {
		num: 798,
		accuracy: 100,
		basePower: 85,
		basePowerCallback(source, target, move) {
			if (this.field.isTerrain('electricterrain') || this.field.isTerrain('grassyterrain') || this.field.isTerrain('mistyterrain') || this.field.isTerrain('psychicterrain') && source.isGrounded()) {
				return move.basePower + 45;
			}
			return move.basePower;
		},
		shortDesc: "130 Basepower in Terrain & ends the terrain.",
		category: "Physical",
		name: "Steel Roller",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	strength: {
		num: 70,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "Super effective on Rock.",
		inherit: true,
		isNonstandard: null,
		gen: 8,
		name: "Strength",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Rock') return 1;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
	//not finished
	synchronoise: {
		/*num: 485,
		accuracy: 85,
		basePower: 95,
		category: "Special",
		shortDesc: "",*/
		inherit: true,
		isNonstandard: null,
		gen: 8,
		/*name: "Synchronoise",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1},
		onBasePower(basePower, target, move, source) {
			if (target.hasType(source.type));
			this.debug('Synchronoise damage boost');
			return move.basePower * 2;
		},
		secondary: null,
		target: "allAdjacent",
		type: "Psychic",
		contestType: "Clever",*/
	},
	tarshot: {
		num: 749,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "Traps target; slows target by 1 at the end of each turn.",
		name: "Tar Shot",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		onTryImmunity(target) {
			return this.dex.getImmunity('trapped', target);
		},
		volatileStatus: 'tarshot',
		condition: {
			onStart(pokemon, source) {
				this.add('-start', pokemon, 'move: Tar Shot', '[of] ' + source);
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				const source = this.effectData.source;
				if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns)) {
					delete pokemon.volatiles['tarshot'];
					this.add('-end', pokemon, 'Tar Shot', '[partiallytrapped]', '[silent]');
					return;
				}
				this.boost({spe: -1}, pokemon, source, this.dex.getActiveMove('tarshot'));
			},
			onTrapPokemon(pokemon) {
				if (this.effectData.source && this.effectData.source.isActive) pokemon.tryTrap();
			},
		},
		secondary: null,
		target: "normal",
		type: "Rock",
	},
	terrainpulse: {
		num: 805,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		shortDesc: "User on terrain: power doubles, type varies. Resets Terrain.",
		name: "Terrain Pulse",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, pulse: 1},
		onModifyType(move, pokemon) {
			if (!pokemon.isGrounded()) return;
			switch (this.field.terrain) {
			case 'electricterrain':
				move.type = 'Electric';
				break;
			case 'grassyterrain':
				move.type = 'Grass';
				break;
			case 'mistyterrain':
				move.type = 'Fairy';
				break;
			case 'psychicterrain':
				move.type = 'Psychic';
				break;
			}
		},
		onModifyMove(move, pokemon) {
			if (this.field.terrain && pokemon.isGrounded()) {
				move.basePower *= 2;
			}
		},
		onAfterMove(pokemon) {
            if (this.field.isTerrain('electricterrain')) {
				this.field.clearTerrain();
                this.field.setTerrain('electricterrain');
            }
			if (this.field.isTerrain('grassyterrain')) {
				this.field.clearTerrain();
                this.field.setTerrain('grassyterrain');
            }
			if (this.field.isTerrain('mistyterrain')) {
				this.field.clearTerrain();
                this.field.setTerrain('mistyterrain');
            }
			if (this.field.isTerrain('psychicterrain')) {
				this.field.clearTerrain();
                this.field.setTerrain('psychicterrain');
            }
        },
		target: "normal",
		type: "Normal",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
	},
	technoblast: {
		num: 546,
		accuracy: 85,
		basePower: 120,
		category: "Special",
      shortDesc: "The move's type changes depending on the held Drive. Gains 1.5x power if holding a Drive.",
		name: "Techno Blast",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, pulse: 1, bullet: 1, sound: 1},
		onModifyType(move, pokemon) {
			if (pokemon.ignoringItem()) return;
			move.type = this.runEvent('Drive', pokemon, null, move, 'Normal');
		},
		onModifyMove(move, pokemon) {
			if (pokemon.hasItem('burndrive') || pokemon.hasItem('dousedrive') || pokemon.hasItem('chilldrive') || pokemon.hasItem('shockdrive')) {
				move.basePower *= 1.5;
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	//not finished
	/*trickortreat: {
		num: 567,
		accuracy: 95,
		basePower: 0,
		category: "Status",
		shortDesc: "Adds Ghost to the target's type(s) permanently.",
		name: "Trick-or-Treat",
		pp: 5,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, mystery: 1},
		onHit(target) {
			if (target.hasType('Ghost')) return false;
			if (!target.addType('Ghost')) return false;
			this.add('-start', target, 'typeadd', 'Ghost', '[from] move: Trick-or-Treat');

			// Curse Glitch
			const action = this.queue.willMove(target);
			if (action && action.move.id === 'curse') {
				action.targetLoc = -1;
			}
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Cute",
	},*/
	triplekick: {
		num: 167,
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		category: "Physical",
		shortDesc: "Hits 3 times. Each hit can miss, but power rises.",
		name: "Triple Kick",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 3,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMove: {basePower: 120},
		maxMove: {basePower: 140},
		contestType: "Cool",
	},
	trumpcard: {
		num: 376,
		accuracy: true,
		basePower: 75,
		category: "Special",
		shortDesc: "Fails if the target is above 1/2 max hp.",
		isNonstandard: null,
		name: "Trump Card",
		pp: 5,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTry(pokemon, target) {
			if (target.hp > target.maxhp / 2 || target.maxhp === 1) { //Shedinja Clause
				this.add('-fail', pokemon);
				this.attrLastMove('[still]');
				this.hint("Trump Card only works when the target is at 1/2 health or below.");
				return null;
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	twineedle: {
		num: 41,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		shortDesc: "Poisons target. If target is poisoned, toxics instead. Will always crit against poisoned targets.",
		isNonstandard: null,
		gen: 8,
		name: "Twineedle",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyCritRatio(critRatio, source, target) {
			if (target.status === 'psn' || target.status === 'tox') {
				critRatio: true;
			}
		},
		multihit: 2,
		multiaccuracy: true,
		secondary: {
			chance: 100,
			status: 'psn',
			onHit(target, source, move) {
				const movelast = source.lastMove;
				if (target.status === 'psn') {
					target.cureStatus('psn');
					target.trySetStatus('tox', source);
				}
			},
		},
		target: "normal",
		type: "Bug",
		maxMove: {basePower: 100},
		contestType: "Cool",
	},
	twister: {
		num: 239,
		accuracy: 90,
		basePower: 100,
		category: "Special",
		shortDesc: "Calculates type effectiveness as if it were flying type.",
		name: "Twister",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type, move) {
			return this.dex.getEffectiveness('Flying', type);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Dragon",
		contestType: "Cool",
	},
	vinewhip: {
		num: 22,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		shortDesc: "1.5x damage if target holds an item. Removes item.",
		name: "Vine Whip",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePower(basePower, source, target, move) {
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemData, target, target, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onAfterHit(target, source) {
			if (source.hp) {
				const item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Vine Whip', '[of] ' + source);
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	watergun: {
		num: 55,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		shortDesc: "+1 Priority",
		name: "Water Gun",
		pp: 30,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Cute",
	},
	zapcannon: {
		num: 192,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		shortDesc: "+1 Priority. 10% chance to paralyze, 100% if target moves first.",
		name: "Zap Cannon",
		pp: 30,
		priority: 1,
		flags: {bullet: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			onHit(target, source) {
				if (target.newlySwitched || !this.queue.willMove(target) || this.randomChance(1, 10)) {
					target.trySetStatus('par', source);
				}
			}
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
};
