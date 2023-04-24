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

export const Moves: {[k: string]: ModdedMoveData} = {

	dededehammerthrow: {
		num: -1,
		accuracy: 90,
		basePower: 100,
		category: "Physical",
		shortDesc: "Lowers user Attack by 1. Inflicts burns on contact with the user before it moves.",
		name: "Dedede Hammer Throw",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('dededehammerthrow');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Dedede Hammer Throw');
			},
			onHit(pokemon, source, move) {
				if (move.flags['contact']) {
					source.trySetStatus('brn', pokemon);
				}
			},
		},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('dededehammerthrow');
		},
		self: {
			boosts: {
				atk: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Tough",
	},

	sheikahslate: {
		num: -2,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "20% chance to burn, freeze or paralyse the target.",
		name: "Sheikah Slate",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			onHit(target, source) {
				const result = this.random(3);
				if (result === 0) {
					target.trySetStatus('brn', source);
				} else if (result === 1) {
					target.trySetStatus('par', source);
				} else {
					target.trySetStatus('frz', source);
				}
			},
		},
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
  
	lightarrow: {
		num: -3,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "Traps target, super-effective against Dark.",
		name: "Light Arrow",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Dark') return 1;
		},
		secondary: {
      chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
		type: "Psychic",
		contestType: "Beautiful",
	},
	
	psyblast: {
		num: -4,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "Consumes Berry and changes move type.",
		name: "Psy Blast",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			if (pokemon.ignoringItem()) return;
			const item = pokemon.getItem();
			if (!item.naturalGift) return;
			move.type = item.naturalGift.type;
		},
		onPrepareHit(target, pokemon, move) {
			if (pokemon.ignoringItem()) return false;
			const item = pokemon.getItem();
			if (!item.naturalGift) return false;
			move.basePower = item.naturalGift.basePower;
			if (!pokemon.hasAbility('adeptprowess')) {
				pokemon.setItem('');
				pokemon.lastItem = item.id;
				pokemon.usedItemThisTurn = true;
				this.runEvent('AfterUseItem', pokemon, null, null, item);
			}
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	
	puyopop: {
		num: -5,
		accuracy: 90,
		basePower: 10,
		basePowerCallback(pokemon, target, move) {
			return 10 * move.hit;
		},
		category: "Special",
		shortDesc: "Hits 4 times. Each hit can miss, but power rises. Fourth hit clears user side's hazards.",
		id: "puyopop",
		name: "Puyo Pop",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target, source, move) {
		if (move.hit !== 4) return;
			let removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: Puyo Pop', '[of] ' + source);
				}
			}
		},
		multihit: 4,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Water",
		zMovePower: 180,
		contestType: "Cute",
	},
	
	dracoburning: {
		num: -6,
		accuracy: 90,
		basePower: 105,
		category: "Physical",
		shortDesc: "Can hit Pokemon using Bounce, Fly, or Sky Drop.",
		name: "Draco Burning",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	
	frostkick: {
		num: -7,
		accuracy: 90,
		basePower: 85,
		category: "Physical",
		shortDesc: "High critical hit ratio. 10% chance to freeze.",
		name: "Frost Kick",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		critRatio: 2,
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "normal",
		type: "Ice",
		contestType: "Cool",
	},
	
	shockkick: {
		num: -8,
		accuracy: 90,
		basePower: 85,
		category: "Physical",
		shortDesc: "High critical hit ratio. 10% chance to paralyze.",
		name: "Shock Kick",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		critRatio: 2,
		secondary: {
			chance: 10,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	
	greatfire: {
		num: -9,
		accuracy: true,
		basePower: 200,
		category: "Special",
		name: "Great Fire",
		pp: 1,
		priority: 0,
		flags: {},
		useSourceAlternateDefensiveAsOffensive: true,
		isZ: "dracocentauriumz",
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	
	// Below are vanilla moves altered by custom interractions
	
	bounce: {
		num: 340,
		accuracy: 85,
		basePower: 85,
		category: "Physical",
		name: "Bounce",
		pp: 5,
		priority: 0,
		flags: {contact: 1, charge: 1, protect: 1, mirror: 1, gravity: 1, distance: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
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
			onInvulnerability(target, source, move) {
				if (['gust', 'twister', 'skyuppercut', 'thunder', 'hurricane', 'smackdown', 'thousandarrows', 'dracoburning'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceBasePower(basePower, target, source, move) {
				if (move.id === 'gust' || move.id === 'twister') {
					return this.chainModify(2);
				}
			},
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "any",
		type: "Flying",
		contestType: "Cute",
	},
	
	fly: {
		num: 19,
		accuracy: 95,
		basePower: 90,
		category: "Physical",
		name: "Fly",
		pp: 15,
		priority: 0,
		flags: {contact: 1, charge: 1, protect: 1, mirror: 1, gravity: 1, distance: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
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
			onInvulnerability(target, source, move) {
				if (['gust', 'twister', 'skyuppercut', 'thunder', 'hurricane', 'smackdown', 'thousandarrows', 'dracoburning'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.id === 'gust' || move.id === 'twister') {
					return this.chainModify(2);
				}
			},
		},
		secondary: null,
		target: "any",
		type: "Flying",
		contestType: "Clever",
	},
	
	skydrop: {
		num: 507,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		isNonstandard: "Past",
		name: "Sky Drop",
		pp: 10,
		priority: 0,
		flags: {contact: 1, charge: 1, protect: 1, mirror: 1, gravity: 1, distance: 1},
		onModifyMove(move, source) {
			if (!source.volatiles['skydrop']) {
				move.accuracy = true;
				move.flags.contact = 0;
			}
		},
		onMoveFail(target, source) {
			if (source.volatiles['twoturnmove'] && source.volatiles['twoturnmove'].duration === 1) {
				source.removeVolatile('skydrop');
				source.removeVolatile('twoturnmove');
				this.add('-end', target, 'Sky Drop', '[interrupt]');
			}
		},
		onTryHit(target, source, move) {
			if (target.fainted) return false;
			if (source.removeVolatile(move.id)) {
				if (target !== source.volatiles['twoturnmove'].source) return false;

				if (target.hasType('Flying')) {
					this.add('-immune', target);
					return null;
				}
			} else {
				if (target.volatiles['substitute'] || target.side === source.side) {
					return false;
				}
				if (target.getWeight() >= 2000) {
					this.add('-fail', target, 'move: Sky Drop', '[heavy]');
					return null;
				}

				this.add('-prepare', source, move.name, target);
				source.addVolatile('twoturnmove', target);
				return null;
			}
		},
		onHit(target, source) {
			if (target.hp) this.add('-end', target, 'Sky Drop');
		},
		condition: {
			duration: 2,
			onAnyDragOut(pokemon) {
				if (pokemon === this.effectData.target || pokemon === this.effectData.source) return false;
			},
			onFoeTrapPokemonPriority: -15,
			onFoeTrapPokemon(defender) {
				if (defender !== this.effectData.source) return;
				defender.trapped = true;
			},
			onFoeBeforeMovePriority: 12,
			onFoeBeforeMove(attacker, defender, move) {
				if (attacker === this.effectData.source) {
					attacker.activeMoveActions--;
					this.debug('Sky drop nullifying.');
					return null;
				}
			},
			onRedirectTargetPriority: 99,
			onRedirectTarget(target, source, source2) {
				if (source !== this.effectData.target) return;
				if (this.effectData.source.fainted) return;
				return this.effectData.source;
			},
			onAnyInvulnerability(target, source, move) {
				if (target !== this.effectData.target && target !== this.effectData.source) {
					return;
				}
				if (source === this.effectData.target && target === this.effectData.source) {
					return;
				}
				if (['gust', 'twister', 'skyuppercut', 'thunder', 'hurricane', 'smackdown', 'thousandarrows', 'dracoburning'].includes(move.id)) {
					return;
				}
				return false;
			},
			onAnyBasePower(basePower, target, source, move) {
				if (target !== this.effectData.target && target !== this.effectData.source) {
					return;
				}
				if (source === this.effectData.target && target === this.effectData.source) {
					return;
				}
				if (move.id === 'gust' || move.id === 'twister') {
					return this.chainModify(2);
				}
			},
			onFaint(target) {
				if (target.volatiles['skydrop'] && target.volatiles['twoturnmove'].source) {
					this.add('-end', target.volatiles['twoturnmove'].source, 'Sky Drop', '[interrupt]');
				}
			},
		},
		secondary: null,
		target: "any",
		type: "Flying",
		contestType: "Tough",
	},
};
