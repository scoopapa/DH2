export const Moves: {[k: string]: ModdedMoveData} = {
	revelationdance: {
		inherit: true,
		isNonstandard: null,
	},
	gutpunch: {
		num: 100001,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "For 5 turns, the target is prevented from healing.",
		name: "Gut Punch",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		onHit(target) {
			if (target.hp) {
				target.addVolatile('healblock');
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mega Punch", target);
		},
		target: "normal",
		type: "Fighting",
		contestType: "Clever",
	},
	vengefulspell: {
		num: 100002,
		accuracy: 100,
		basePower: 150,
		category: "Special",
		shortDesc: "Fails if the user is not hit by a direct attack.",
		name: "Vengeful Spell",
		pp: 5,
		priority: -3,
		flags: {protect: 1},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('vengefulspell');
		},
		onTryMove(pokemon) {
			if (!pokemon.volatiles['vengefulspell'] || !pokemon.volatiles['vengefulspell'].gotHit) {
				this.attrLastMove('[still]');
				this.add('cant', pokemon, 'Vengeful Spell', 'Vengeful Spell');
				return null;
			}
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Vengeful Spell');
			},
			onHit(pokemon, source, move) {
				if (pokemon.side !== source.side && move.category !== 'Status') {
					pokemon.volatiles['vengefulspell'].gotHit = true;
					const action = this.queue.willMove(pokemon);
					if (action) {
						this.queue.prioritizeAction(action);
					}
				}
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Confusion", target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fairy",
		contestType: "Tough",
	},
	souldrain: {
		num: 100003,
		name: "Soul Drain",
		accuracy: 100,
		basePower: 40,
		category: "Special",
		pp: 10,
		type: "Ghost",
		shortDesc: "Heals the user by 2x the damage dealt.",
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [2, 1],
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Lick", target);
		},
		target: "normal",
		secondary: null,
	},
	junglefang: {
		num: 100004,
		accuracy: 75,
		basePower: 150,
		category: "Physical",
		name: "Jungle Fang",
		shortDesc: "30% chance to confuse user.",
		pp: 5,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			self: {
				volatileStatus: 'confusion',
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Crunch", target);
		},
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	bindingvow: {
		num: 100005,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Binding Vow",
		shortDesc: "For 4 turns, all direct damage is dealt to the opponent as well.",
		pp: 5,
		priority: 0,
		flags: {snatch: 1},
		volatileStatus: 'bindingvow',
		condition: {
			duration: 4,
			durationCallback(target, source, effect) {
				return 4;
			},
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: Binding Vow');
			},
			onDamagingHit(damage, target, source, move) {
				this.damage(damage, source, target);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Binding Vow');
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Perish Song", target);
		},
		secondary: null,
		target: "allySide",
		type: "Ghost",
		contestType: "Cool",
	},
	witherdance: {
		num: 100006,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Wither Dance",
		shortDesc: "Boosts Atk, SpA, and Spe by 2. User faints 2 turns later.",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		boosts: {
			spa: 2,
			atk: 2,
			spe: 2,
		},
		condition: {
			duration: 3,
			onStart(pokemon) {
				this.add('-start', pokemon, 'witherdance');
			},
			onEnd(target) {
				this.add('-start', target, 'perish0');
				target.faint();
			},
			onResidualOrder: 20,
			onResidual(pokemon) {
				const duration = pokemon.volatiles['witherdance'].duration;
				this.add('-start', pokemon, 'perish' + duration);
			},
		},
		self: {
			volatileStatus: 'witherdance',
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Quiver Dance", target);
		},
		target: "self",
		type: "Poison",
		contestType: "Beautiful",
	},
	jovialdrums: {
		num: 100007,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Jovial Drums",
		shortDesc: "Switches out. Replacement's next attack gains 1.3x damage, and it can't be statused for 5 turns.",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		selfSwitch: true,
		slotCondition: 'jovialdrums',
		condition: {
			duration: 1,
			onSwap(target) {
				target.addVolatile('moraleboost');
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Belly Drum", target);
		},
		secondary: null,
		target: "self",
		type: "Fairy",
		contestType: "Beautiful",
	},
	dustdevil: {
		num: 100008,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		name: "Dust Devil",
		pp: 10,
		shortDesc: "Hits twice in sandstorm.",
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1},
		onModifyMove(move, pokemon, target) {
			if (target?.effectiveWeather() === 'sandstorm') {
				move.multihit = 2;
			}
		},
		secondary: {
			chance: 10,
			boosts: {
				spa: -1,
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Twister", target);
		},
		target: "any",
		type: "Rock",
		contestType: "Tough",
	},
	neurohammer: {
		num: 100009,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Neurohammer",
		shortDesc: "1/3 Recoil. Sets Torment on the target.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [33, 100],
		onHit(target) {
			if (target.hp) {
				target.addVolatile('torment');
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Steamroller", target);
		},
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	steamchute: {
		num: 800,
		accuracy: 90,
		basePower: 130,
		category: "Special",
		name: "Steam Chute",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1, defrost: 1},
		condition: {
			duration: 2,
			onHit(pokemon, source, move) {
				if (move.flags['contact']) {
					this.effectData.brn = true;
					source.trySetStatus('brn', pokemon);
				}
			},
		},
		beforeTurnCallback(pokemon) {
			if (pokemon.volatiles['steamchute']) return;
			this.add('-singleturn', pokemon, 'move: Steam Chute');
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Work Up", pokemon);
			pokemon.addVolatile('steamchute');
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Steam Eruption", target);
		},
		onTryMove(attacker, defender, move) {
			if (attacker.status === 'frz') attacker.cureStatus();
			if (attacker.removeVolatile('twoturnmove')){
				if (attacker.volatiles['steamchute'] && attacker.volatiles['steamchute'].effectData && attacker.volatiles['steamchute'].effectData.brn){
					attacker.side.setSideCondition('mist');
				}					
				attacker.removeVolatile('steamchute')
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
		type: "Water", 
	},
};

