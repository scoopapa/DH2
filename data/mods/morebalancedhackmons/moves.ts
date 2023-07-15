export const Moves: {[k: string]: ModdedMoveData} = {
	anchorshot: {
		inherit: true,
		onHit(target, source, move) {
			if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
		},
		secondary: undefined,
	},
	bitterblade: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1, heal: 1},
	},
	blazingtorque: {
		inherit: true,
		basePower: 100,
		flags: {
			contact: 1, protect: 1, failencore: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failmimic: 1,
		},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		desc: "Has a 10% chance to burn the target.",
		shortDesc: "10% chance to burn the target.",
	},
	bleakwindstorm: {
		inherit: true,
		accuracy: 100,
	},
	boltbeak: {
		inherit: true,
		basePower: 70,
	},
	ceaselessedge: {
		inherit: true,
		accuracy: 100,
		self: undefined,
		// make it secondary for covert cloak
		secondary: {
			chance: 100,
			sideCondition: 'spikes',
		},
	},
	direclaw: {
		inherit: true,
		basePower: 90,
		secondary: {
			chance: 40,
			onHit(target, source) {
				const result = this.random(2);
				if (result === 0) {
					target.trySetStatus('psn', source);
				} else {
					target.trySetStatus('par', source);
				}
			},
		},
		desc: "Has a 40% chance to cause the target to either become poisoned or become paralyzed.",
		shortDesc: "40% chance to poison or paralyze target.",
	},
	fishiousrend: {
		inherit: true,
		basePower: 70,
	},
	luminacrash: {
		inherit: true,
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
		desc: "Has a 100% chance to lower the target's Special Defense by 1 stage.",
		shortDesc: "100% chance to lower the target's Sp. Def by 1.",
	},
	magicaltorque: {
		inherit: true,
		flags: {
			contact: 1, protect: 1, failencore: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failmimic: 1,
		},
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		desc: "Has a 10% chance to confuse the target.",
		shortDesc: "10% chance to confuse the target.",
	},
	magicroom: {
		// for room service
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('roomservice')) {
					return 8;
				}
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Magic Room');
					return 7;
				}
				return 5;
			},
			onFieldStart(target, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-fieldstart', 'move: Magic Room', '[of] ' + source, '[persistent]');
				} else {
					this.add('-fieldstart', 'move: Magic Room', '[of] ' + source);
				}
				for (const mon of this.getAllActive()) {
					this.singleEvent('End', mon.getItem(), mon.itemState, mon);
				}
			},
			onFieldRestart(target, source) {
				this.field.removePseudoWeather('magicroom');
			},
			// Item suppression implemented in Pokemon.ignoringItem() within sim/pokemon.js
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 6,
			onFieldEnd() {
				this.add('-fieldend', 'move: Magic Room', '[of] ' + this.effectState.source);
			},
		},
	},
	milkdrink: {
		inherit: true,
		pp: 10,
	},
	originpulse: {
		inherit: true,
		basePower: 120,
	},
	psyshieldbash: {
		inherit: true,
		accuracy: 100,
		basePower: 80,
		secondary: undefined,
		overrideOffensiveStat: 'spd',
		desc: "Damage is calculated using the user's Special Defense stat as its Attack, including stat stage changes. Other effects that modify the Attack stat are used as normal.",
		shortDesc: "Uses user's Sp. Def stat as Atk in damage calculation.",
	},
	ragefist: {
		inherit: true,
		// the rest implemented in scripts.ts
		basePowerCallback(pokemon) {
			return Math.min(200, 50 + 25 * pokemon.timesAttacked);
		},
		desc: "Power is equal to 50+(X*25), where X is the total number of times the user has been hit by a damaging attack since switch-in, even if the user did not lose HP from the attack. X cannot be greater than 6. Each hit of a multi-hit attack is counted, but confusion damage is not counted.",
		shortDesc: "+25 power for each time user was hit. Max 6 hits. Reset on switch-in.",
	},
	ragingbull: {
		inherit: true,
		pp: 15,
		onModifyType(move, pokemon) {
			const types = pokemon.getTypes();
			if (types.length < 2) {
				move.type = "Normal";
			} else {
				let type = types[1];
				if (type === "Bird") type = "???";
				move.type = type;
			}
		},
		desc: "If this attack does not miss, the effects of Reflect, Light Screen, and Aurora Veil end for the target's side of the field before damage is calculated. This move's type depends on the user's secondary type. ",
		shortDesc: "Destroys screens. Type depends on user's secondary type.",
	},
	recover: {
		inherit: true,
		pp: 10,
	},
	roost: {
		inherit: true,
		pp: 10,
	},
	sandsearstorm: {
		inherit: true,
		accuracy: 100,
	},
	shoreup: {
		inherit: true,
		pp: 10,
	},
	slackoff: {
		inherit: true,
		pp: 10,
	},
	softboiled: {
		inherit: true,
		pp: 10,
	},
	spikes: {
		// for eartheater
		inherit: true,
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 3) return false;
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers++;
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots')) return;
				if (pokemon.hasAbility('eartheater')) {
					// this.debug('Earth Eater absorbs spikes');
					// this.add('-activate', pokemon, 'ability: Earth Eater');
					// this.add('-sideend', pokemon.side, this.dex.conditions.get('spikes').name, '[from] ability: Earth Eater', '[of] ' + pokemon);
					// pokemon.side.removeSideCondition('spikes');
					// this.heal(pokemon.baseMaxhp / 4, pokemon, pokemon);
					return;
				}
				const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
				this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / 24);
			},
		},
	},
	spinout: {
		inherit: true,
		basePower: 60,
		pp: 20,
		self: undefined,
		secondary: undefined,
		selfSwitch: true,
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button or through the effect of the Emergency Exit or Wimp Out Abilities.",
		shortDesc: "User switches out after damaging the target.",
	},
	spiritshackle: {
		inherit: true,
		onHit(target, source, move) {
			if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
		},
		secondary: undefined,
	},
	springtidestorm: {
		inherit: true,
		accuracy: 100,
		pp: 10,
	},
	strengthsap: {
		inherit: true,
		onHit(target, source) {
			if (target.boosts.atk === -6) return false;
			// for clear amulet, i'm lazy lol
			if (target.hasItem('clearamulet')) return false;
			const atk = target.getStat('atk', false, true);
			const success = this.boost({atk: -1}, target, source, null, false, true);
			return !!(this.heal(atk, source, target) || success);
		},
	},
	stoneaxe: {
		inherit: true,
		accuracy: 100,
		self: undefined,
		// make it secondary for covert cloak
		secondary: {
			chance: 100,
			sideCondition: 'stealthrock',
		},
	},
	tarshot: {
		inherit: true,
		basePower: 75,
		category: "Special",
		flags: {bullet: 1, protect: 1, mirror: 1},
		zMove: {basePower: 160},
		type: "Ground",
	},
	trickroom: {
		// for room service
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('roomservice')) {
					return 8;
				}
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Trick Room');
					return 7;
				}
				return 5;
			},
			onFieldStart(target, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-fieldstart', 'move: Trick Room', '[of] ' + source, '[persistent]');
				} else {
					this.add('-fieldstart', 'move: Trick Room', '[of] ' + source);
				}
			},
			onFieldRestart(target, source) {
				this.field.removePseudoWeather('trickroom');
			},
			// Speed modification is changed in Pokemon.getActionSpeed() in sim/pokemon.js
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 1,
			onFieldEnd() {
				this.add('-fieldend', 'move: Trick Room');
			},
		},
	},
	vcreate: {
		inherit: true,
		accuracy: 100,
		basePower: 150,
		onBasePower(basePower, source, target, move) {
			if (target.runEffectiveness(move) > 0) {
				// Placeholder
				this.debug(`v-create super effective buff`);
				return this.chainModify([4915, 4096]);
			}
		},
		zMove: {basePower: 190},
		desc: "Lowers the user's Speed, Defense, and Special Defense by 1 stage. Damage is multiplied by 1.2 if this move is super effective against the target.",
		shortDesc: "-1 Def, -1 SpD, -1 Spe. 1.2x damage when supereffective.",
	},
	wickedtorque: {
		inherit: true,
		basePower: 100,
		flags: {
			contact: 1, protect: 1, failencore: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failmimic: 1,
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				// see gmaxmeltdown
				if (target.status || target.hasAbility('comatose')) target.addVolatile('taunt', target, move);
			},
		},
		desc: "Taunt the target if it has a non-volatile status condition.",
		shortDesc: "Taunt the target if it has a status ailment.",
	},
	wildboltstorm: {
		inherit: true,
		accuracy: 100,
	},
	wonderroom: {
		// for room service
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('roomservice')) {
					return 8;
				}
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Wonder Room');
					return 7;
				}
				return 5;
			},
			onModifyMove(move, source, target) {
				// This code is for moves that use defensive stats as the attacking stat; see below for most of the implementation
				if (!move.overrideOffensiveStat) return;
				const statAndBoosts = move.overrideOffensiveStat;
				if (!['def', 'spd'].includes(statAndBoosts)) return;
				move.overrideOffensiveStat = statAndBoosts === 'def' ? 'spd' : 'def';
				this.hint(`${move.name} uses ${statAndBoosts === 'def' ? '' : 'Sp. '}Def boosts when Wonder Room is active.`);
			},
			onFieldStart(field, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-fieldstart', 'move: Wonder Room', '[of] ' + source, '[persistent]');
				} else {
					this.add('-fieldstart', 'move: Wonder Room', '[of] ' + source);
				}
			},
			onFieldRestart(target, source) {
				this.field.removePseudoWeather('wonderroom');
			},
			// Swapping defenses partially implemented in sim/pokemon.js:Pokemon#calculateStat and Pokemon#getStat
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 5,
			onFieldEnd() {
				this.add('-fieldend', 'move: Wonder Room');
			},
		},
	},
};
