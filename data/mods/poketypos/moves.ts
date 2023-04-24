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
	chillingwater: {
		num: 300,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Chilling Water",
		shortDesc: "100% chance to lower the target's Attack by 1.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},
	smokeshuriken: {
		num: 301,
		accuracy: 100,
		basePower: 15,
		category: "Special",
		name: "Smoke Shuriken",
		shortDesc: "Usually goes first. Hits 2-5 times in one turn.",
		pp: 20,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
	drainingfur: {
		num: 302,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Draining Fur",
		shortDesc: "Heals 50% of the user's max HP.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "any",
		type: "Dragon",
		contestType: "Cool",
	},
	mountaingale: {
		num: 303,
		accuracy: 85,
		basePower: 100,
		category: "Physical",
		name: "Mountain Gale",
		shortDesc: "30% chance to make the target flinch.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Ice",
	},
	chillyreception: {
		num: 304,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Chilly Reception",
		shortDesc: "Starts Snow. User switches out.",
		pp: 10,
		priority: 0,
		flags: {},
		weather: 'snow',
		selfSwitch: true,
		secondary: null,
		target: "all",
		type: "Ice",
	},
	wavecrash: {
		num: 305,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Wave Crash",
		shortDesc: "Has 33% recoil.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [33, 100],
		secondary: null,
		target: "normal",
		type: "Water",
	},
	snowscape: {
		num: 306,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Snowscape",
		shortDesc: "For 5 turns, snow falls. Ice: 1.5x Def.",
		pp: 10,
		priority: 0,
		flags: {},
		weather: 'snow',
		secondary: null,
		target: "all",
		type: "Ice",
	},
	aquacutter: {
		num: 307,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Aqua Cutter",
		shortDesc: "High critical hit ratio.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Water",
	},
	combustion: {
		num: 308,
		accuracy: 100,
		basePower: 95,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose') || target.volatiles['leechseed']) return move.basePower * 1.5;
			return move.basePower;
		},
		category: "Special",
		name: "Combustion",
		shortDesc: "Removes Leech Seed or any Status the target has. If the previous effect activates, this move deals double damage.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onHit(target) {
			if (target.status) target.cureStatus();
		},
		onHit(target, source) {
			if (target.volatiles['leechseed']) target.removeVolatile('leechseed', source);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
	},
   silktrap: {
		num: 309,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Silk Trap",
		shortDesc: "Protects from damaging attacks. Contact: -1 Spe.",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'silktrap',
		onTryHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect'] || move.category === 'Status') {
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
				if (move.flags['contact']) {
					this.boost({spe: -1}, source, target, this.dex.getActiveMove("Silk Trap"));
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && move.flags['contact']) {
					this.boost({spe: -1}, source, target, this.dex.getActiveMove("Silk Trap"));
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Bug",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cool",
	},
	torchsong: {
		num: 310,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Torch Song",
		shortDesc: "100% chance to raise the user's Sp. Atk by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		self: {
			boosts: {
				spa: 1,
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fire",
		contestType: "Tough",
	},
	trashtalk: {
		num: 311,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		name: "Trash Talk",
      shortDesc: "Prevents the target from using status moves for 1 turn.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
 		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Confide", target);
		  this.add('-anim', source, "Gunk Shot", target);
		},
		volatileStatus: 'trashtalk',
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Trash Talk');
			},
			onResidualOrder: 12,
			onEnd(target) {
				this.add('-end', target, 'move: Trash Talk');
			},
			onBeforeMovePriority: 5,
			onBeforeMove(attacker, defender, move) {
				if (!move.isZ && !move.isMax && move.category === 'Status' && move.id !== 'mefirst') {
					this.add('cant', attacker, 'move: Trash Talk', move);
					return false;
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Cool",
	},
	dazzlingspin: {
		num: 312,
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		name: "Dazzling Spin",
		shortDesc: "Frees user from hazards/bind/leech; 50% burn.",
		pp: 40,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		secondary: {
			chance: 50,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	ruination: {
		num: 313,
		accuracy: 90,
		basePower: 0,
		damageCallback(pokemon, target) {
			return this.clampIntRange(Math.floor(target.getUndynamaxedHP() / 2), 1);
		},
		category: "Special",
      shortDesc: "Does damage equal to 1/2 target's current HP.",
		name: "Ruination",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},
	icespinner: {
		num: 314,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Ends the effects of terrains.",
		name: "Ice Spinner",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onHit() {
			this.field.clearTerrain();
		},
		secondary: null,
		target: "normal",
		type: "Ice",
	},
	tarshot: {
		num: 749,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Tar Shot",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		boosts: {
			spe: -1,
		},
		secondary: null,
		target: "normal",
		type: "Ground",
	},
	runicrebellion: {
		num: 287,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Runic Rebellion",
		shortDesc: "Cures user’s non-volatile status conditions",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		self: {
			onHit(source) {
				for (const ally of source.side.pokemon) {
					ally.cureStatus();
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMove: {effect: 'heal'},
		contestType: "Cute",
	},
	tripledive: {
		num: 813,
		accuracy: 95,
		basePower: 30,
		category: "Physical",
		name: "Triple Dive",
		shortDesc: "Hits 3 times. Target: 10% confusion, 20% -1 speed. High crit.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		critRatio: 2,
		multihit: 3,
		secondaries: [
			{
				chance: 20,
				boosts: {
					spe: -1,
				},
			}, {
			   chance: 10,
		   	volatileStatus: 'confusion',
		   },
      ],
		target: "normal",
		type: "Water",
		zMove: {basePower: 120},
		maxMove: {basePower: 140},
	},
	trailblaze: {
		num: 488,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Trailblaze",
		shortDesc: "100% chance to raise the user's Speed by 1.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	makeitrain: {
		num: 488,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Make It Rain",
		shortDesc: "Lowers the user's SpA by 1. Hits foes.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: -1,
				},
			},
		},
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	blazingtorque: {
		num: 896,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Blazing Torque",
      shortDesc: "30% chance to burn the target.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
	},
	wickedtorque: {
		num: 897,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Wicked Torque",
      shortDesc: "30% chance to lower the target's Defense by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 30,
			boosts: {
            def: -1,
        },
		},
		target: "normal",
		type: "Dark",
	},
	noxioustorque: {
		num: 898,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Noxious Torque",
      shortDesc: "30% chance to poison the target.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 30,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
	},
	combattorque: {
		num: 899,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Combat Torque",
      shortDesc: "30% chance to paralyze the target.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Fighting",
	},
	magicaltorque: {
		num: 900,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Magical Torque",
      shortDesc: "10% chance to confuse the target.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Fairy",
	},
	spinout: {
		num: 859,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Spin Out",
      shortDesc: "Lowers the user's Speed by 2.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			boosts: {
				spe: -2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	athletesfoot: {
		num: 575,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Athlete's Foot",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, dance: 1, authentic: 1},
		onHit(target, source, move) {
			const success = this.boost({def: -1, spa: -1}, target, source);
			if (!success && !target.hasAbility('mirrorarmor')) {
				delete move.selfSwitch;
			}
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Grass",
		zMove: {effect: 'healreplacement'},
		contestType: "Cool",
	},
	/*Old move changes*/
	auroraveil: {
		num: 694,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Aurora Veil",
		shortDesc: "For 5 turns, damage to allies halved. Snow only.",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'auroraveil',
		onTryHitSide() {
			if (!this.field.isWeather(['hail', 'snow'])) return false;
		},
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && target.side === this.effectData.target) {
					if ((target.side.getSideCondition('reflect') && this.getCategory(move) === 'Physical') ||
							(target.side.getSideCondition('lightscreen') && this.getCategory(move) === 'Special')) {
						return;
					}
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Aurora Veil weaken');
						if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
						return this.chainModify(0.5);
					}
				}
			},
			onStart(side) {
				this.add('-sidestart', side, 'move: Aurora Veil');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 1,
			onEnd(side) {
				this.add('-sideend', side, 'move: Aurora Veil');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Ice",
		zMove: {boost: {spe: 1}},
		contestType: "Beautiful",
	},
	blizzard: {
		num: 59,
		accuracy: 70,
		basePower: 110,
		category: "Special",
		name: "Blizzard",
		shortDesc: "10% chance to freeze foe(s). Can't miss in Snow.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		onModifyMove(move) {
			if (this.field.isWeather(['hail', 'snow'])) move.accuracy = true;
		},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
	},
	moonlight: {
		num: 236,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Moonlight",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
			case 'snow':
				factor = 0.25;
				break;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		secondary: null,
		target: "self",
		type: "Fairy",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	morningsun: {
		num: 234,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Morning Sun",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
			case 'snow':
				factor = 0.25;
				break;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	solarbeam: {
		num: 76,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Solar Beam",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (['sunnyday', 'desolateland'].includes(attacker.effectiveWeather())) {
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
		onBasePower(basePower, pokemon, target) {
			if (['raindance', 'primordialsea', 'sandstorm', 'hail', 'snow'].includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	solarblade: {
		num: 669,
		accuracy: 100,
		basePower: 125,
		category: "Physical",
		name: "Solar Blade",
		pp: 10,
		priority: 0,
		flags: {contact: 1, charge: 1, protect: 1, mirror: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (['sunnyday', 'desolateland'].includes(attacker.effectiveWeather())) {
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
		onBasePower(basePower, pokemon, target) {
			if (['raindance', 'primordialsea', 'sandstorm', 'hail', 'snow'].includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	synthesis: {
		num: 235,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Synthesis",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
			case 'snow':
				factor = 0.25;
				break;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		secondary: null,
		target: "self",
		type: "Grass",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	weatherball: {
		num: 311,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Weather Ball",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.type = 'Fire';
				break;
			case 'raindance':
			case 'primordialsea':
				move.type = 'Water';
				break;
			case 'sandstorm':
				move.type = 'Rock';
				break;
			case 'hail':
			case 'snow':
				move.type = 'Ice';
				break;
			}
		},
		onModifyMove(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.basePower *= 2;
				break;
			case 'raindance':
			case 'primordialsea':
				move.basePower *= 2;
				break;
			case 'sandstorm':
				move.basePower *= 2;
				break;
			case 'hail':
			case 'snow':
				move.basePower *= 2;
				break;
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Beautiful",
	},
	hail: {
		num: 258,
		accuracy: true,
		basePower: 0,
		category: "Status",
		isNonstandard: "Past",
		name: "Hail",
		pp: 10,
		priority: 0,
		flags: {},
		weather: 'hail',
		secondary: null,
		target: "all",
		type: "Ice",
		zMove: {boost: {spe: 1}},
		contestType: "Beautiful",
	},
	aircutter: {
		num: 314,
		accuracy: 95,
		basePower: 60,
		category: "Special",
		name: "Air Cutter",
		pp: 25,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		critRatio: 2,
		secondary: null,
		target: "allAdjacentFoes",
		type: "Flying",
		contestType: "Cool",
	},
	bleakwindstorm: {
		num: 846,
		accuracy: 80,
		basePower: 100,
		category: "Special",
		name: "Bleakwind Storm",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		secondary: {
			chance: 30,
			boosts: {
				spe: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Flying",
	},
	fairywind: {
		num: 584,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Fairy Wind",
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Beautiful",
	},
	gust: {
		num: 16,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Gust",
		pp: 35,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1, wind: 1},
		secondary: null,
		target: "any",
		type: "Flying",
		contestType: "Clever",
	},
	heatwave: {
		num: 257,
		accuracy: 90,
		basePower: 95,
		category: "Special",
		name: "Heat Wave",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "allAdjacentFoes",
		type: "Fire",
		contestType: "Beautiful",
	},
	hurricane: {
		num: 542,
		accuracy: 70,
		basePower: 110,
		category: "Special",
		name: "Hurricane",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1, wind: 1},
		onModifyMove(move, pokemon, target) {
			switch (target?.effectiveWeather()) {
			case 'raindance':
			case 'primordialsea':
				move.accuracy = true;
				break;
			case 'sunnyday':
			case 'desolateland':
				move.accuracy = 50;
				break;
			}
		},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		target: "any",
		type: "Flying",
		contestType: "Tough",
	},
	icywind: {
		num: 196,
		accuracy: 95,
		basePower: 55,
		category: "Special",
		name: "Icy Wind",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
	},
	petalblizzard: {
		num: 572,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Petal Blizzard",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		secondary: null,
		target: "allAdjacent",
		type: "Grass",
		contestType: "Beautiful",
	},
	sandsearstorm: {
		num: 848,
		accuracy: 80,
		basePower: 100,
		category: "Special",
		name: "Sandsear Storm",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		secondary: {
			chance: 20,
			status: 'brn',
		},
		target: "allAdjacentFoes",
		type: "Ground",
	},
	sandstorm: {
		num: 201,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Sandstorm",
		pp: 10,
		priority: 0,
		flags: {wind: 1},
		weather: 'Sandstorm',
		secondary: null,
		target: "all",
		type: "Rock",
		zMove: {boost: {spe: 1}},
		contestType: "Tough",
	},
	springtidestorm: {
		num: 831,
		accuracy: 80,
		basePower: 100,
		category: "Special",
		name: "Springtide Storm",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		secondary: {
			chance: 30,
			boosts: {
				atk: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Fairy",
	},
	tailwind: {
		num: 366,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Tailwind",
		pp: 15,
		priority: 0,
		flags: {snatch: 1, wind: 1},
		sideCondition: 'tailwind',
		condition: {
			duration: 4,
			durationCallback(target, source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 6;
				}
				return 4;
			},
			onStart(side) {
				this.add('-sidestart', side, 'move: Tailwind');
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(2);
			},
			onResidualOrder: 21,
			onResidualSubOrder: 4,
			onEnd(side) {
				this.add('-sideend', side, 'move: Tailwind');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Flying",
		zMove: {effect: 'crit2'},
		contestType: "Cool",
	},
	twister: {
		num: 239,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Twister",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		target: "allAdjacentFoes",
		type: "Dragon",
		contestType: "Cool",
	},
	whirlwind: {
		num: 18,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Whirlwind",
		pp: 20,
		priority: -6,
		flags: {reflectable: 1, mirror: 1, authentic: 1, mystery: 1, wind: 1},
		forceSwitch: true,
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {boost: {spd: 1}},
		contestType: "Clever",
	},
	wildboltstorm: {
		num: 847,
		accuracy: 80,
		basePower: 100,
		category: "Special",
		name: "Wildbolt Storm",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		secondary: {
			chance: 20,
			status: 'par',
		},
		target: "allAdjacentFoes",
		type: "Electric",
	},
};
