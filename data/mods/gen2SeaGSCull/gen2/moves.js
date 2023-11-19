/**
 * Gen 2 moves
 */

'use strict';

/**@type {{[k: string]: ModdedMoveData}} */
const BattleMovedex = {
	aeroblast: {
		inherit: true,
		critRatio: 3,
	},
	beatup: {
		inherit: true,
		desc: "Deals typeless damage. Hits one time for each unfainted Pokemon without a major status condition in the user's party. For each hit, the damage formula uses the participating Pokemon's level, its base Attack as the Attack stat, the target's base Defense as the Defense stat, and ignores stat stages and other effects that modify Attack or Defense. Fails if no party members can participate.",
		onModifyMove(move, pokemon) {
			move.type = '???';
			move.category = 'Physical';
			move.allies = pokemon.side.pokemon.filter(ally => !ally.fainted && !ally.status);
			move.multihit = move.allies.length;
		},
	},
	bellydrum: {
		inherit: true,
		onHit(target) {
			if (target.boosts.atk >= 6) {
				return false;
			}
			if (target.hp <= target.maxhp / 2) {
				this.boost({atk: 2}, null, null, this.conditions.get('bellydrum2'));
				return false;
			}
			this.directDamage(target.maxhp / 2);
			const originalStage = target.boosts.atk;
			let currentStage = originalStage;
			let boosts = 0;
			let loopStage = 0;
			while (currentStage < 6) {
				loopStage = currentStage;
				currentStage++;
				if (currentStage < 6) currentStage++;
				target.boosts.atk = loopStage;
				if (target.getStat('atk', false, true) < 999) {
					target.boosts.atk = currentStage;
					continue;
				}
				target.boosts.atk = currentStage - 1;
				break;
			}
			boosts = target.boosts.atk - originalStage;
			target.boosts.atk = originalStage;
			this.boost({atk: boosts});
		},
	},
	bide: {
		inherit: true,
		effect: {
			duration: 3,
			durationCallback(target, source, effect) {
				return this.random(3, 5);
			},
			onLockMove: 'bide',
			onStart(pokemon) {
				this.effectState.totalDamage = 0;
				this.add('-start', pokemon, 'move: Bide');
			},
			onDamagePriority: -101,
			onDamage(damage, target, source, move) {
				if (!move || move.effectType !== 'Move' || !source) return;
				this.effectState.totalDamage += damage;
				this.effectState.lastDamageSource = source;
			},
			onBeforeMove(pokemon, target, move) {
				if (this.effectState.duration === 1) {
					this.add('-end', pokemon, 'move: Bide');
					if (!this.effectState.totalDamage) {
						this.add('-fail', pokemon);
						return false;
					}
					target = this.effectState.lastDamageSource;
					if (!target) {
						this.add('-fail', pokemon);
						return false;
					}
					if (!target.isActive) target = this.resolveTarget(pokemon, this.moves.get('pound'));
					if (!pokemon.isAdjacent(target)) {
						this.add('-miss', pokemon, target);
						return false;
					}
					/**@type {Move} */
					// @ts-ignore
					const moveData = {
						id: 'bide',
						name: "Bide",
						accuracy: 100,
						damage: this.effectState.totalDamage * 2,
						category: "Physical",
						priority: 0,
						flags: {contact: 1, protect: 1},
						effectType: 'Move',
						type: 'Normal',
					};
					this.tryMoveHit(target, pokemon, moveData);
					return false;
				}
				this.add('-activate', pokemon, 'move: Bide');
			},
			onMoveAborted(pokemon) {
				pokemon.removeVolatile('bide');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Bide', '[silent]');
			},
		},
	},
	counter: {
		inherit: true,
		damageCallback(pokemon, target) {
			if (pokemon.lastAttackedBy && pokemon.lastAttackedBy.thisTurn && pokemon.lastAttackedBy.move && (this.getCategory(pokemon.lastAttackedBy.move) === 'Physical' || this.moves.get(pokemon.lastAttackedBy.move).id === 'hiddenpower') &&
				(!target.lastMove || target.lastMove.id !== 'sleeptalk')) {
				// @ts-ignore
				return 2 * pokemon.lastAttackedBy.damage;
			}
			return false;
		},
		beforeTurnCallback() {},
		onTryHit() {},
		effect: {},
		priority: -1,
	},
	crabhammer: {
		inherit: true,
		critRatio: 3,
	},
	crosschop: {
		inherit: true,
		critRatio: 3,
	},
	curse: {
		inherit: true,
		effect: {
			onStart(pokemon, source) {
				this.add('-start', pokemon, 'Curse', '[of] ' + source);
			},
			onAfterMoveSelf(pokemon) {
				this.damage(pokemon.maxhp / 4);
			},
		},
	},
	detect: {
		inherit: true,
		desc: "The user is protected from attacks made by the opponent during this turn. This move has an X/255 chance of being successful, where X starts at 255 and halves, rounded down, each time this move is successfully used. X resets to 255 if this move fails or if the user's last move used is not Detect, Endure, or Protect. Fails if the user moves last this turn.",
		priority: 2,
	},
	dig: {
		inherit: true,
		onPrepareHit(target, source) {
			return source.status !== 'slp';
		},
		effect: {
			duration: 2,
			onImmunity(type, pokemon) {
				if (type === 'sandstorm') return false;
			},
			onTryImmunity(target, source, move) {
				if (move.id === 'earthquake' || move.id === 'magnitude' || move.id === 'fissure') {
					return;
				}
				if (['attract', 'curse', 'foresight', 'meanlook', 'mimic', 'nightmare', 'spiderweb', 'transform'].includes(move.id)) {
					// Oversight in the interaction between these moves and the Lock-On effect
					return false;
				}
				if (source.volatiles['lockon'] && target === source.volatiles['lockon'].source) return;
				return false;
			},
			onSourceBasePower(basePower, target, source, move) {
				if (move.id === 'earthquake' || move.id === 'magnitude') {
					return this.chainModify(2);
				}
			},
		},
	},
	doubleedge: {
		inherit: true,
		shortDesc: "Has 25% recoil.",
		recoil: [25, 100],
	},
	encore: {
		inherit: true,
		effect: {
			durationCallback() {
				return this.random(3, 7);
			},
			onStart(target) {
				const noEncore = ['encore', 'metronome', 'mimic', 'mirrormove', 'sketch', 'sleeptalk', 'struggle', 'transform'];
				const moveIndex = target.lastMove ? target.moves.indexOf(target.lastMove.id) : -1;
				if (!target.lastMove || noEncore.includes(target.lastMove.id) || !target.moveSlots[moveIndex] || target.moveSlots[moveIndex].pp <= 0) {
					// it failed
					this.add('-fail', target);
					delete target.volatiles['encore'];
					return;
				}
				this.effectState.move = target.lastMove.id;
				this.add('-start', target, 'Encore');
				if (!this.willMove(target)) {
					this.effectState.duration++;
				}
			},
			onOverrideAction(pokemon) {
				return this.effectState.move;
			},
			onResidualOrder: 13,
			onResidual(target) {
				if (target.moves.includes(this.effectState.move) && target.moveSlots[target.moves.indexOf(this.effectState.move)].pp <= 0) {
					// early termination if you run out of PP
					delete target.volatiles.encore;
					this.add('-end', target, 'Encore');
				}
			},
			onEnd(target) {
				this.add('-end', target, 'Encore');
			},
			onDisableMove(pokemon) {
				if (!this.effectState.move || !pokemon.hasMove(this.effectState.move)) {
					return;
				}
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id !== this.effectState.move) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
		},
	},
	endure: {
		inherit: true,
		desc: "The user will survive attacks made by the opponent during this turn with at least 1 HP. This move has an X/255 chance of being successful, where X starts at 255 and halves, rounded down, each time this move is successfully used. X resets to 255 if this move fails or if the user's last move used is not Detect, Endure, or Protect. Fails if the user moves last this turn.",
		priority: 2,
	},
	explosion: {
		inherit: true,
		basePower: 250,
		noSketch: true,
	},
	flail: {
		inherit: true,
		noDamageVariance: true,
		willCrit: false,
	},
	fly: {
		inherit: true,
		onPrepareHit(target, source) {
			return source.status !== 'slp';
		},
		effect: {
			duration: 2,
			onTryImmunity(target, source, move) {
				if (move.id === 'gust' || move.id === 'twister' || move.id === 'thunder' || move.id === 'whirlwind') {
					return;
				}
				if (move.id === 'earthquake' || move.id === 'magnitude' || move.id === 'fissure') {
					// These moves miss even during the Lock-On effect
					return false;
				}
				if (['attract', 'curse', 'foresight', 'meanlook', 'mimic', 'nightmare', 'spiderweb', 'transform'].includes(move.id)) {
					// Oversight in the interaction between these moves and the Lock-On effect
					return false;
				}
				if (source.volatiles['lockon'] && target === source.volatiles['lockon'].source) return;
				return false;
			},
			onSourceBasePower(basePower, target, source, move) {
				if (move.id === 'gust' || move.id === 'twister') {
					return this.chainModify(2);
				}
			},
		},
	},
	focusenergy: {
		inherit: true,
		effect: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: Focus Energy');
			},
			onModifyCritRatio(critRatio) {
				return critRatio + 1;
			},
		},
	},
	healbell: {
		inherit: true,
		onHit(target, source) {
			this.add('-cureteam', source, '[from] move: Heal Bell');
			source.side.pokemon.forEach(pokemon => pokemon.clearStatus());
		},
	},
	highjumpkick: {
		inherit: true,
		onMoveFail(target, source, move) {
			if (target.runImmunity('Fighting')) {
				const damage = this.getDamage(source, target, move, true);
				this.damage(this.clampIntRange(damage / 8, 1), source, source, 'highjumpkick');
			}
		},
	},
	jumpkick: {
		inherit: true,
		onMoveFail(target, source, move) {
			if (target.runImmunity('Fighting')) {
				const damage = this.getDamage(source, target, move, true);
				this.damage(this.clampIntRange(damage / 8, 1), source, source, 'jumpkick');
			}
		},
	},
	karatechop: {
		inherit: true,
		critRatio: 3,
	},
	leechseed: {
		inherit: true,
		onHit() {},
		effect: {
			onStart(target) {
				this.add('-start', target, 'move: Leech Seed');
			},
			onAfterMoveSelfPriority: 2,
			onAfterMoveSelf(pokemon) {
				if (!pokemon.hp) return;
				const leecher = pokemon.side.foe.active[pokemon.volatiles['leechseed'].sourcePosition];
				if (!leecher || leecher.fainted || leecher.hp <= 0) {
					return;
				}
				const toLeech = this.clampIntRange(pokemon.maxhp / 8, 1);
				const damage = this.damage(toLeech, pokemon, leecher);
				if (damage) {
					this.heal(damage, leecher, pokemon);
				}
			},
		},
	},
	lightscreen: {
		inherit: true,
		effect: {
			duration: 5,
			// Sp. Def boost applied directly in stat calculation
			onStart(side) {
				this.add('-sidestart', side, 'move: Light Screen');
			},
			onResidualOrder: 21,
			onEnd(side) {
				this.add('-sideend', side, 'move: Light Screen');
			},
		},
	},
	lowkick: {
		inherit: true,
		accuracy: 90,
		basePower: 50,
		basePowerCallback() {
			return 50;
		},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
	},
	metronome: {
		inherit: true,
		noMetronome: ['counter', 'destinybond', 'detect', 'endure', 'metronome', 'mimic', 'mirrorcoat', 'protect', 'sketch', 'sleeptalk', 'struggle', 'thief'],
		noSketch: true,
	},
	mimic: {
		inherit: true,
		noSketch: true,
	},
	mirrorcoat: {
		inherit: true,
		damageCallback(pokemon, target) {
			if (pokemon.lastAttackedBy && pokemon.lastAttackedBy.thisTurn && pokemon.lastAttackedBy.move && this.getCategory(pokemon.lastAttackedBy.move) === 'Special' &&
				this.moves.get(pokemon.lastAttackedBy.move).id !== 'hiddenpower' && (!target.lastMove || target.lastMove.id !== 'sleeptalk')) {
				// @ts-ignore
				return 2 * pokemon.lastAttackedBy.damage;
			}
			return false;
		},
		beforeTurnCallback() {},
		onTryHit() {},
		effect: {},
		priority: -1,
	},
	mirrormove: {
		inherit: true,
		onHit(pokemon) {
			const noMirror = ['metronome', 'mimic', 'mirrormove', 'sketch', 'sleeptalk', 'transform'];
			const target = pokemon.side.foe.active[0];
			const lastMove = target && target.lastMove && target.lastMove.id;
			if (!lastMove || (!pokemon.activeTurns && !target.moveThisTurn) || noMirror.includes(lastMove) || pokemon.moves.includes(lastMove)) {
				return false;
			}
			this.useMove(lastMove, pokemon);
		},
		noSketch: true,
	},
	moonlight: {
		inherit: true,
		onHit(pokemon) {
			if (this.isWeather(['sunnyday', 'desolateland'])) {
				this.heal(pokemon.maxhp);
			} else if (this.isWeather(['raindance', 'primordialsea', 'sandstorm', 'hail'])) {
				this.heal(pokemon.maxhp / 4);
			} else {
				this.heal(pokemon.maxhp / 2);
			}
		},
	},
	morningsun: {
		inherit: true,
		onHit(pokemon) {
			if (this.isWeather(['sunnyday', 'desolateland'])) {
				this.heal(pokemon.maxhp);
			} else if (this.isWeather(['raindance', 'primordialsea', 'sandstorm', 'hail'])) {
				this.heal(pokemon.maxhp / 4);
			} else {
				this.heal(pokemon.maxhp / 2);
			}
		},
	},
	nightmare: {
		inherit: true,
		effect: {
			noCopy: true,
			onStart(pokemon) {
				if (pokemon.status !== 'slp') {
					return false;
				}
				this.add('-start', pokemon, 'Nightmare');
			},
			onAfterMoveSelfPriority: 1,
			onAfterMoveSelf(pokemon) {
				if (pokemon.status === 'slp') this.damage(pokemon.maxhp / 4);
			},
			onUpdate(pokemon) {
				if (pokemon.status !== 'slp') {
					pokemon.removeVolatile('nightmare');
					this.add('-end', pokemon, 'Nightmare', '[silent]');
				}
			},
		},
	},
	outrage: {
		inherit: true,
		onMoveFail(target, source, move) {
			source.addVolatile('lockedmove');
		},
		onAfterMove(pokemon) {
			if (pokemon.volatiles['lockedmove'] && pokemon.volatiles['lockedmove'].duration === 1) {
				pokemon.removeVolatile('lockedmove');
			}
		},
	},
	petaldance: {
		inherit: true,
		onMoveFail(target, source, move) {
			source.addVolatile('lockedmove');
		},
		onAfterMove(pokemon) {
			if (pokemon.volatiles['lockedmove'] && pokemon.volatiles['lockedmove'].duration === 1) {
				pokemon.removeVolatile('lockedmove');
			}
		},
	},
	poisongas: {
		inherit: true,
		ignoreImmunity: false,
	},
	poisonpowder: {
		inherit: true,
		ignoreImmunity: false,
	},
	protect: {
		inherit: true,
		desc: "The user is protected from attacks made by the opponent during this turn. This move has an X/255 chance of being successful, where X starts at 255 and halves, rounded down, each time this move is successfully used. X resets to 255 if this move fails or if the user's last move used is not Detect, Endure, or Protect. Fails if the user moves last this turn.",
		priority: 2,
	},
	psywave: {
		inherit: true,
		damageCallback(pokemon) {
			return this.random(1, pokemon.level + Math.floor(pokemon.level / 2));
		},
	},
	rage: {
		// TODO
		// Rage boosts in Gens 2-4 is for the duration of Rage only
		// Disable does not build
		inherit: true,
	},
	razorleaf: {
		inherit: true,
		critRatio: 3,
	},
	razorwind: {
		inherit: true,
		accuracy: 75,
		critRatio: 3,
		onPrepareHit(target, source) {
			return source.status !== 'slp';
		},
	},
	reflect: {
		inherit: true,
		effect: {
			duration: 5,
			// Defense boost applied directly in stat calculation
			onStart(side) {
				this.add('-sidestart', side, 'Reflect');
			},
			onResidualOrder: 21,
			onEnd(side) {
				this.add('-sideend', side, 'Reflect');
			},
		},
	},
	rest: {
		inherit: true,
		onHit(target) {
			if (target.hp >= target.maxhp) return false;
			if (!target.setStatus('slp') && target.status !== 'slp') return false;
			target.statusData.time = 3;
			target.statusData.startTime = 3;
			target.statusData.source = target;
			this.heal(target.maxhp);
			this.add('-status', target, 'slp', '[from] move: Rest');
		},
		secondary: false,
	},
	reversal: {
		inherit: true,
		noDamageVariance: true,
		willCrit: false,
	},
	roar: {
		inherit: true,
		onTryHit() {
			for (const action of this.queue) {
				// Roar only works if it is the last action in a turn, including when it's called by Sleep Talk
				if (action.choice === 'move' || action.choice === 'switch') return false;
			}
		},
		priority: -1,
	},
	selfdestruct: {
		inherit: true,
		basePower: 200,
		noSketch: true,
	},
	sketch: {
		inherit: true,
		onHit() {
			// Sketch always fails in Link Battles
			this.add('-nothing');
		},
	},
	skullbash: {
		inherit: true,
		onPrepareHit(target, source) {
			return source.status !== 'slp';
		},
	},
	skyattack: {
		inherit: true,
		critRatio: 1,
		onPrepareHit(target, source) {
			return source.status !== 'slp';
		},
		secondary: {},
	},
	slash: {
		inherit: true,
		critRatio: 3,
	},
	sleeptalk: {
		inherit: true,
		onHit(pokemon) {
			const NoSleepTalk = ['bide', 'sleeptalk'];
			const moves = [];
			for (const moveSlot of pokemon.moveSlots) {
				const move = moveSlot.id;
				if (move && !NoSleepTalk.includes(move) && !this.moves.get(move).flags['charge']) {
					moves.push(move);
				}
			}
			let randomMove = '';
			if (moves.length) randomMove = this.sample(moves);
			if (!randomMove) return false;
			this.useMove(randomMove, pokemon);
		},
		noSketch: true,
	},
	solarbeam: {
		inherit: true,
		onPrepareHit(target, source) {
			return source.status !== 'slp';
		},
		// Rain weakening done directly in the damage formula
		onBasePower() {},
	},
	spikes: {
		inherit: true,
		effect: {
			// this is a side condition
			onStart(side) {
				if (!this.effectState.layers || this.effectState.layers === 0) {
					this.add('-sidestart', side, 'Spikes');
					this.effectState.layers = 1;
				} else {
					return false;
				}
			},
			onSwitchIn(pokemon) {
				if (!pokemon.runImmunity('Ground')) return;
				const damageAmounts = [0, 3];
				this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / 24);
			},
		},
	},
	substitute: {
		inherit: true,
		effect: {
			onStart(target) {
				this.add('-start', target, 'Substitute');
				this.effectState.hp = Math.floor(target.maxhp / 4);
				delete target.volatiles['partiallytrapped'];
			},
			onTryPrimaryHitPriority: -1,
			onTryPrimaryHit(target, source, move) {
				if (move.stallingMove) {
					this.add('-fail', source);
					return null;
				}
				if (target === source) {
					this.debug('sub bypass: self hit');
					return;
				}
				if (move.drain) {
					this.add('-hint', "In Gold/Silver/Crystal, draining moves always miss against Substitute.");
					this.add('-miss', source);
					return null;
				}
				if (move.category === 'Status') {
					const SubBlocked = ['leechseed', 'lockon', 'mindreader', 'nightmare', 'painsplit', 'sketch'];
					if (move.id === 'swagger') {
						// this is safe, move is a copy
						delete move.volatileStatus;
					}
					if (move.status || (move.boosts && move.id !== 'swagger') || move.volatileStatus === 'confusion' || SubBlocked.includes(move.id)) {
						this.add('-activate', target, 'Substitute', '[block] ' + move.name);
						return null;
					}
					return;
				}
				let damage = this.getDamage(source, target, move);
				if (!damage) {
					return null;
				}
				damage = this.runEvent('SubDamage', target, source, move, damage);
				if (!damage) {
					return damage;
				}
				if (damage > target.volatiles['substitute'].hp) {
					damage = target.volatiles['substitute'].hp;
				}
				target.volatiles['substitute'].hp -= damage;
				source.lastDamage = damage;
				if (target.volatiles['substitute'].hp <= 0) {
					target.removeVolatile('substitute');
				} else {
					this.add('-activate', target, 'Substitute', '[damage]');
				}
				if (move.recoil) {
					this.damage(Math.round(damage * move.recoil[0] / move.recoil[1]), source, target, 'recoil');
				}
				this.runEvent('AfterSubDamage', target, source, move, damage);
				return 0; // hit
			},
			onEnd(target) {
				this.add('-end', target, 'Substitute');
			},
		},
	},
	swagger: {
		inherit: true,
		desc: "Raises the target's Attack by 2 stages and confuses it. This move will miss if the target's Attack cannot be raised.",
		onTryHit(target, pokemon) {
			if (target.boosts.atk >= 6 || target.getStat('atk', false, true) === 999) {
				this.add('-miss', pokemon);
				return null;
			}
		},
	},
	synthesis: {
		inherit: true,
		onHit(pokemon) {
			if (this.isWeather(['sunnyday', 'desolateland'])) {
				this.heal(pokemon.maxhp);
			} else if (this.isWeather(['raindance', 'primordialsea', 'sandstorm', 'hail'])) {
				this.heal(pokemon.maxhp / 4);
			} else {
				this.heal(pokemon.maxhp / 2);
			}
		},
	},
	thief: {
		inherit: true,
		onAfterHit() {},
		secondary: {
			chance: 100,
			onAfterHit(target, source) {
				if (source.item || source.volatiles['gem']) {
					return;
				}
				const yourItem = target.takeItem(source);
				if (!yourItem) {
					return;
				}
				if (!source.setItem(yourItem)) {
					target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
					return;
				}
				this.add('-item', source, yourItem, '[from] move: Thief', '[of] ' + target);
			},
		},
	},
	thrash: {
		inherit: true,
		onMoveFail(target, source, move) {
			source.addVolatile('lockedmove');
		},
		onAfterMove(pokemon) {
			if (pokemon.volatiles['lockedmove'] && pokemon.volatiles['lockedmove'].duration === 1) {
				pokemon.removeVolatile('lockedmove');
			}
		},
	},
	toxic: {
		inherit: true,
		ignoreImmunity: false,
	},
	transform: {
		inherit: true,
		noSketch: true,
	},
	triattack: {
		inherit: true,
		onHit(target, source, move) {
			move.statusRoll = ['par', 'frz', 'brn'][this.random(3)];
		},
		secondary: {
			chance: 20,
			onHit(target, source, move) {
				if (!target.hasType('Normal') && move.statusRoll) {
					target.trySetStatus(move.statusRoll, source);
				}
			},
		},
	},
	triplekick: {
		inherit: true,
		multiaccuracy: false,
		multihit: [1, 3],
	},
	whirlwind: {
		inherit: true,
		onTryHit() {
			for (const action of this.queue) {
				// Whirlwind only works if it is the last action in a turn, including when it's called by Sleep Talk
				if (action.choice === 'move' || action.choice === 'switch') return false;
			}
		},
		priority: -1,
	},
};

exports.BattleMovedex = BattleMovedex;
