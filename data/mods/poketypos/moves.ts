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
// New Moves
	smokeshuriken: {
		num: 301,
		accuracy: 100,
		basePower: 15,
		category: "Special",
		name: "Smoke Shuriken",
		shortDesc: "Usually goes first. Hits 2-5 times in one turn.",
      onPrepareHit: function(target, source, move) {
         this.attrLastMove('[still]');
         this.add('-anim', source, "Water Shuriken", target);
		},
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
		shortDesc: "Heals 50% of the damage dealt.",
      onPrepareHit: function(target, source, move) {
         this.attrLastMove('[still]');
         this.add('-anim', source, "Drain Punch", target);
		},
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "any",
		type: "Dragon",
		contestType: "Cool",
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
      onPrepareHit: function(target, source, move) {
         this.attrLastMove('[still]');
         this.add('-anim', source, "Flamethrower", target);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
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
      onPrepareHit: function(target, source, move) {
         this.attrLastMove('[still]');
         this.add('-anim', source, "Gunk Shot", target);
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
      onPrepareHit: function(target, source, move) {
         this.attrLastMove('[still]');
         this.add('-anim', source, "Flame Charge", target);
		},
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	tarshot: {
		num: 749,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Tar Shot",
      shortDesc: "Lowers the target's Speed by 1.",
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
			onHit(pokemon) {
				pokemon.cureStatus();
			},
		},
      onPrepareHit: function(target, source, move) {
         this.attrLastMove('[still]');
         this.add('-anim', source, "Close Combat", target);
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
      onPrepareHit: function(target, source, move) {
         this.attrLastMove('[still]');
         this.add('-anim', source, "Dive", target);
		},
		target: "normal",
		type: "Water",
		zMove: {basePower: 120},
		maxMove: {basePower: 140},
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
      onPrepareHit: function(target, source, move) {
         this.attrLastMove('[still]');
         this.add('-anim', source, "Flare Blitz", target);
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
      onPrepareHit: function(target, source, move) {
         this.attrLastMove('[still]');
         this.add('-anim', source, "Lash Out", target);
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
      onPrepareHit: function(target, source, move) {
         this.attrLastMove('[still]');
         this.add('-anim', source, "Poison Jab", target);
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
      onPrepareHit: function(target, source, move) {
         this.attrLastMove('[still]');
         this.add('-anim', source, "Close Combat", target);
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
      onPrepareHit: function(target, source, move) {
         this.attrLastMove('[still]');
         this.add('-anim', source, "Play Rough", target);
		},
		target: "normal",
		type: "Fairy",
	},
	athletesfoot: {
		num: 575,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Athlete's Foot",
      shortDesc: "Lowers target's Def and SpA by 1. User switches.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, dance: 1, authentic: 1},
		onHit(target, source, move) {
			const success = this.boost({def: -1, spa: -1}, target, source);
			if (!success && !target.hasAbility('mirrorarmor')) {
				delete move.selfSwitch;
			}
		},
      onPrepareHit: function(target, source, move) {
         this.attrLastMove('[still]');
         this.add('-anim', source, "Dragon Ascent", target);
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Grass",
		zMove: {effect: 'healreplacement'},
		contestType: "Cool",
   },

// modified moves
	doomdesire: {
		inherit: true,
		basePower: 120,
	},

// Others
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
	hiddenpower: {
		inherit: true,
		isNonstandard: null,
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
   hiddenpower: {
      inherit: true,
		isNonstandard: undefined,
	},
	hail: {
		inherit: true,
		isNonstandard: true,
	},
	recover: {
		inherit: true,
		pp: 5,
	},
	softboiled: {
		inherit: true,
		pp: 5,
	},
	rest: {
		inherit: true,
		pp: 5,
	},
	milkdrink: {
		inherit: true,
		pp: 5,
	},
	slackoff: {
		inherit: true,
		pp: 5,
	},
	roost: {
		inherit: true,
		pp: 5,
	},
	shoreup: {
		inherit: true,
		pp: 5,
	},
	wickedblow: {
		inherit: true,
		basePower: 75,
	},
	grassyglide: {
		inherit: true,
		basePower: 60,
	},
	glaciallance: {
		inherit: true,
		basePower: 120,
	},
	batonpass: {
		num: 226,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Baton Pass",
		pp: 40,
		priority: 0,
		flags: {},
		onHit(target) {
			if (!this.canSwitch(target.side)) {
				this.attrLastMove('[still]');
				this.add('-fail', target);
				return this.NOT_FAIL;
			}
		},
		self: {
			onHit(source) {
				source.skipBeforeSwitchOutEventFlag = true;
			},
		},
		selfSwitch: 'copyvolatile',
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	ragingfury: {
		num: -1001,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Raging Fury",
		desc: "The user spends two or three turns locked into this move and becomes confused immediately after its move on the last turn of the effect if it is not already. This move targets an opposing Pokemon at random on each turn. If the user is prevented from moving, is asleep at the beginning of a turn, or the attack is not successful against the target on the first turn of the effect or the second turn of a three-turn effect, the effect ends without causing confusion. If this move is called by Sleep Talk and the user is asleep, the move is used for one turn and does not confuse the user.",
		shortDesc: "Lasts 2-3 turns. Confuses the user afterwards.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Inferno Overdrive", target);
		},
		self: {
			volatileStatus: 'lockedmove',
		},
		onAfterMove(pokemon) {
			if (pokemon.volatiles['lockedmove'] && pokemon.volatiles['lockedmove'].duration === 1) {
				pokemon.removeVolatile('lockedmove');
			}
		},
		secondary: null,
		target: "randomNormal",
		type: "Fire",
		contestType: "Cool",
	},
	direclaw: {
		shortDesc: "50% chance to paralyze or poison or sleep target.",
		num: -1005,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Dire Claw",
		desc: "Has a higher chance for a critical hit. Has a 50% chance to cause the target to either fall asleep, become poisoned, or become paralyzed.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Crush Claw", target);
		},
		//critRatio: 2,
		secondary: {
			chance: 50,
			onHit(target, source) {
				const result = this.random(3);
				if (result === 0) {
					target.trySetStatus('psn', source);
				} else if (result === 1) {
					target.trySetStatus('par', source);
				} else {
					target.trySetStatus('slp', source);
				}
			},
		},
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	mountaingale: {
		num: 836,
		accuracy: 85,
		basePower: 100,
		category: "Physical",
		shortDesc: "30% chance to make the target flinch.",
		name: "Mountain Gale",
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
	esperwing: {
		num: 840,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "100% chance to raise user Speed by 1. High crit.",
		name: "Esper Wing",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Air Slash", target);
		},
		critRatio: 2,
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Psychic",
	},
	psyshieldbash: {
		shortDesc: "100% chance to raise the user's Defense by 1.",
		num: -1013,
		accuracy: 90,
		basePower: 70,
		category: "Physical",
		name: "Psyshield Bash",
		desc: "Has a 100% chance to raise the user's Defense by 1 stage.",
		shortDesc: "100% chance to raise the user's Defense by 1.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Zen Headbutt", target);
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					def: 1,
				},
			},
		},
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	stoneaxe: {
		shortDesc: "Sets Stealth Rock after damage. High critical hit ratio.",
		num: -1014,
		accuracy: 90,
		basePower: 65,
		category: "Physical",
		name: "Stone Axe",
		desc: "Has a higher chance for a critical hit. If this move is successful, it sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in. Foes lose 1/32, 1/16, 1/8, 1/4, or 1/2 of their maximum HP, rounded down, based on their weakness to the Rock type; 0.25x, 0.5x, neutral, 2x, or 4x, respectively. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, or is hit by Defog.",
		shortDesc: "High critical hit ratio. Foes: Stealth Rock.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Stone Edge", target);
		},
		critRatio: 2,
		sideCondition: 'stealthrock',
		secondary: null,
		target: "adjacentFoe",
		type: "Rock",
		contestType: "Tough",
	},
	headlongrush: {
		shortDesc: "Lowers the user's Defense and Sp. Def by 1.",
		num: -1015,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Headlong Rush",
		desc: "Lowers the user's Defense and Special Defense by 1 stage.",
		shortDesc: "Lowers the user's Defense and Sp. Def by 1.",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tectonic Rage", target);
		},
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	powershift: {
		shortDesc: "Switches user's Attack with Defense and Sp. Atk with Sp. Def.",
		num: -1017,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Power Shift",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Topsy-Turvy", target);
		},
		volatileStatus: 'powershift',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Power Shift');
				const newatk = pokemon.storedStats.def;
				const newdef = pokemon.storedStats.atk;
				const newspa = pokemon.storedStats.spd;
				const newspd = pokemon.storedStats.spa;
				pokemon.storedStats.atk = newatk;
				pokemon.storedStats.def = newdef;
				pokemon.storedStats.spa = newspa;
				pokemon.storedStats.spd = newspd;
			},
			onCopy(pokemon) {
				const newatk = pokemon.storedStats.def;
				const newdef = pokemon.storedStats.atk;
				const newspa = pokemon.storedStats.spd;
				const newspd = pokemon.storedStats.spa;
				pokemon.storedStats.atk = newatk;
				pokemon.storedStats.def = newdef;
				pokemon.storedStats.spa = newspa;
				pokemon.storedStats.spd = newspd;
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Power Shift');
				const newatk = pokemon.storedStats.def;
				const newdef = pokemon.storedStats.atk;
				const newspa = pokemon.storedStats.spd;
				const newspd = pokemon.storedStats.spa;
				pokemon.storedStats.atk = newatk;
				pokemon.storedStats.def = newdef;
				pokemon.storedStats.spa = newspa;
				pokemon.storedStats.spd = newspd;
			},
			onRestart(pokemon) {
				pokemon.removeVolatile('Power Shift');
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {boost: {atk: 1}},
		contestType: "Clever",
	},
	mysticalpower: {
		shortDesc: "100% chance to raise the user's spa by 1.",
		num: -1018,
		accuracy: 90,
		basePower: 70,
		category: "Special",
		name: "Mystical Power",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	wavecrash: {
		shortDesc: "Usually goes first. Has 33% recoil.",
		num: -1008,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Wave Crash",
		desc: "If the target lost HP, the user takes recoil damage equal to 33% the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 33% recoil.",
		pp: 10,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Waterfall", target);
		},
		recoil: [1, 3],
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	chloroblast: {
		shortDesc: "User loses 50% max HP.",
		num: -1002,
		accuracy: 95,
		basePower: 150,
		category: "Special",
		name: "Chloroblast",
		desc: "Whether or not this move is successful and even if it would cause fainting, the user loses 1/2 of its maximum HP, rounded up, unless the user has the Magic Guard Ability.",
		shortDesc: "User loses 50% max HP.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bloom Doom", target);
		},
		mindBlownRecoil: true,
		onAfterMove(pokemon, target, move) {
			if (move.mindBlownRecoil && !move.multihit) {
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.getEffect('Steel Beam'), true);
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
	},
	infernalparade: {
		shortDesc: "Power doubles if the target has a status ailment; 30% chance to burn.",
		num: -1003,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Special",
		name: "Infernal Parade",
		desc: "Has a 30% chance to burn the target. Power doubles if the target has a non-volatile status condition.",
		shortDesc: "30% chance to burn. 2x power if target is statused.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Will-o-Wisp", target);
		},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Ghost",
		zMove: {basePower: 160},
		contestType: "Clever",
	},
	barbbarrage: {
		shortDesc: "Power doubles if the target has a status ailment; 30% chance to poison.",
		num: -1004,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Physical",
		name: "Barb Barrage",
		desc: "Has a 30% chance to poison the target. Power doubles if the target is poisoned.",
		shortDesc: "30% chance to psn. 2x power if target is poisoned.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Sting", target);
		},
		secondary: {
			chance: 30,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		zMove: {basePower: 160},
		contestType: "Clever",
	},
	spicyextract: {
		num: 858,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Spicy Extract",
		shortDesc: "Raises target's Atk by 2 and lowers its Def by 2.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		boosts: {
			atk: 2,
			def: -2,
		},
		secondary: null,
		target: "normal",
		type: "Grass",
	},
	saltcure: {
		num: 864,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Salt Cure",
		shortDesc: "Deals 1/8 max HP each turn; 1/4 on Steel, Water.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		condition: {
			noCopy: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Salt Cure');
			},
			onResidualOrder: 13,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / (pokemon.hasType(['Water', 'Steel']) ? 4 : 8));
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Salt Cure');
			},
		},
		secondary: {
			chance: 100,
			volatileStatus: 'saltcure',
		},
		target: "normal",
		type: "Rock",
	},
	terablast: {
		num: 851,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Tera Blast",
		shortDesc: "Physical if Atk > SpA.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	bleakwindstorm: {
		num: 846,
		accuracy: 80,
		basePower: 100,
		category: "Special",
		isNonstandard: "Unobtainable",
		name: "Bleakwind Storm",
		shortDesc: "30% chance to lower the foe(s) Speed by 1.",
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
	sandsearstorm: {
		num: 848,
		accuracy: 80,
		basePower: 100,
		category: "Special",
		isNonstandard: "Unobtainable",
		name: "Sandsear Storm",
		shortDesc: "20% chance to burn foe(s).",
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
	springtidestorm: {
		num: 831,
		accuracy: 80,
		basePower: 100,
		category: "Special",
		isNonstandard: "Unobtainable",
		name: "Springtide Storm",
		shortDesc: "30% chance to lower the foe(s) Attack by 1.",
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
	wildboltstorm: {
		num: 847,
		accuracy: 80,
		basePower: 100,
		category: "Special",
		isNonstandard: "Unobtainable",
		name: "Wildbolt Storm",
      shortDesc: "20% chance to paralyze foe(s).",
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
	ceaselessedge: {
		num: 845,
		accuracy: 90,
		basePower: 65,
		category: "Physical",
		isNonstandard: "Unobtainable",
		name: "Ceaseless Edge",
		shortDesc: "Sets a layer of Spikes on the opposing side.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		self: {
			onHit(source) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('spikes');
				}
			},
		},
		secondary: {}, // allows sheer force to trigger
		target: "normal",
		type: "Dark",
	},
	triplearrows: {
		num: 843,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Triple Arrows",
		shortDesc: "High crit. Target: 50% -1 Defense, 30% flinch.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		critRatio: 2,
		secondaries: [
			{
				chance: 50,
				boosts: {
					def: -1,
				},
			}, {
				chance: 30,
				volatileStatus: 'flinch',
			},
		],
		target: "normal",
		type: "Fighting",
	},
	silktrap: {
		num: 852,
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
		onPrepareHit(pokemon) {
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
					this.boost({spe: -1}, source, target, this.dex.getActiveMove("Silk Trap"));
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
					this.boost({spe: -1}, source, target, this.dex.getActiveMove("Silk Trap"));
				}
			},
		},
		target: "self",
		type: "Bug",
	},
	axekick: {
		num: 853,
		accuracy: 90,
		basePower: 120,
		category: "Physical",
		name: "Axe Kick",
		shortDesc: "30% confusion. User loses 50% max HP if miss.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		hasCrashDamage: true,
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.getEffect('High Jump Kick'));
		},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Fighting",
	},
	lastrespects: {
		num: 854,
		accuracy: 100,
		basePower: 50,
		basePowerCallback(pokemon, target, move) {
			return 50 + 50 * pokemon.side.totalFainted;
		},
		category: "Physical",
		name: "Last Respects",
		shortDesc: "+50 power for each time a party member fainted.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	luminacrash: {
		num: 855,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Lumina Crash",
		shortDesc: "100% chance to lower the target's Sp. Def by 2.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				spd: -2,
			},
		},
		target: "normal",
		type: "Psychic",
	},
	orderup: {
		num: 856,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Order Up",
		shortDesc: "Curly|Droopy|Stretchy eaten: +1 Atk|Def|Spe.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onUseMoveMessage(source, target, move) {
			move.orderUpBoost = true;
		},
		onAfterMove(pokemon, target, move) {
			if (!pokemon.volatiles['commanded'] || !move.orderUpBoost) return;
			const tatsugiri = pokemon.volatiles['commanded'].source;
			if (tatsugiri.baseSpecies.baseSpecies !== 'Tatsugiri') return; // Should never happen
			switch (tatsugiri.baseSpecies.forme) {
			case 'Droopy':
				this.boost({def: 1}, pokemon, pokemon);
				break;
			case 'Stretchy':
				this.boost({spe: 1}, pokemon, pokemon);
				break;
			default:
				this.boost({atk: 1}, pokemon, pokemon);
				break;
			}
		},
		secondary: null,
		hasSheerForce: true,
		target: "normal",
		type: "Dragon",
	},
	jetpunch: {
		num: 857,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Jet Punch",
      shortDesc: "Usually goes first.",
		pp: 15,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: null,
		hasSheerForce: true,
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	spicyextract: {
		num: 858,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Spicy Extract",
		shortDesc: "Raises target's Atk by 2 and lowers its Def by 2.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		boosts: {
			atk: 2,
			def: -2,
		},
		secondary: null,
		target: "normal",
		type: "Grass",
	},
	spinout: {
		num: 859,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Spin Out",
		shortDesc: "Lowers the user's Speed by 1.",
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
	populationbomb: {
		num: 860,
		accuracy: 90,
		basePower: 20,
		category: "Physical",
		name: "Population Bomb",
		shortDesc: "Hits 10 times. Each hit can miss.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		multihit: 10,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	icespinner: {
		num: 861,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Ice Spinner",
		shortDesc: "Ends the effects of terrain.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onHit() {
			this.field.clearTerrain();
		},
		onAfterSubDamage() {
			this.field.clearTerrain();
		},
		secondary: null,
		target: "normal",
		type: "Ice",
	},
	glaiverush: {
		num: 862,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Glaive Rush",
		shortDesc: "User takes sure-hit 2x damage until its next turn.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			volatileStatus: 'glaiverush',
		},
		condition: {
			noCopy: true,
			onStart(pokemon) {
				this.add('-singlemove', pokemon, 'Glaive Rush', '[silent]');
			},
			onAccuracy() {
				return true;
			},
			onSourceModifyDamage() {
				return this.chainModify(2);
			},
			onBeforeMovePriority: 100,
			onBeforeMove(pokemon) {
				this.debug('removing Glaive Rush drawback before attack');
				pokemon.removeVolatile('glaiverush');
			},
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
	},
	doodle: {
		num: 867,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Doodle",
		shortDesc: "User and ally's Abilities become target's Ability.",
		pp: 10,
		priority: 0,
		flags: {},
		onHit(target, source, move) {
			let success: boolean | null = false;
			for (const pokemon of source.alliesAndSelf()) {
				if (pokemon.ability === target.ability) continue;
				const oldAbility = pokemon.setAbility(target.ability);
				if (oldAbility) {
					this.add('-ability', pokemon, target.getAbility().name, '[from] move: Doodle');
					success = true;
				} else if (!success && oldAbility === null) {
					success = null;
				}
			}
			if (!success) {
				if (success === false) {
					this.add('-fail', source);
				}
				this.attrLastMove('[still]');
				return this.NOT_FAIL;
			}
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Normal",
	},
	filletaway: {
		num: 868,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fillet Away",
		shortDesc: "+2 Attack, Sp. Atk, Speed for 1/2 user's max HP.",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onTry(source) {
			if (source.hp <= source.maxhp / 2 || source.maxhp === 1) return false;
		},
		onTryHit(pokemon, target, move) {
			if (!this.boost(move.boosts as SparseBoostsTable)) return null;
			delete move.boosts;
		},
		onHit(pokemon) {
			this.directDamage(pokemon.maxhp / 2);
		},
		boosts: {
			atk: 2,
			spa: 2,
			spe: 2,
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
	kowtowcleave: {
		num: 869,
		accuracy: true,
		basePower: 85,
		category: "Physical",
		name: "Kowtow Cleave",
		shortDesc: "This move does not check accuracy.",
      onPrepareHit: function(target, source, move) {
         this.attrLastMove('[still]');
         this.add('-anim', source, "Night Slash", target);
		},
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	flowertrick: {
		num: 870,
		accuracy: true,
		basePower: 70,
		category: "Physical",
		name: "Flower Trick",
		shortDesc: "Always results in a critical hit; no accuracy check.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Grass",
	},
	torchsong: {
		num: 871,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Torch Song",
		shortDesc: "100% chance to raise the user's Sp. Atk by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	aquastep: {
		num: 872,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Aqua Step",
		shortDesc: "100% chance to raise the user's Speed by 1.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, dance: 1},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	ragingbull: {
		num: 873,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Raging Bull",
		shortDesc: "Destroys screens. Type depends on user's form.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			pokemon.side.removeSideCondition('reflect');
			pokemon.side.removeSideCondition('lightscreen');
			pokemon.side.removeSideCondition('auroraveil');
		},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Tauros-Paldea-Combat':
				move.type = 'Fighting';
				break;
			case 'Tauros-Paldea-Blaze':
				move.type = 'Fire';
				break;
			case 'Tauros-Paldea-Aqua':
				move.type = 'Water';
				break;
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	makeitrain: {
		num: 874,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Make It Rain",
		shortDesc: "Lowers the user's Sp. Atk by 1. Hits foe(s).",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				spa: -1,
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Steel",
		contestType: "Beautiful",
	},
	ruination: {
		num: 877,
		accuracy: 90,
		basePower: 0,
		damageCallback(pokemon, target) {
			return this.clampIntRange(Math.floor(target.getUndynamaxedHP() / 2), 1);
		},
		category: "Special",
		name: "Ruination",
		shortDesc: "Does damage equal to 1/2 target's current HP.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},
	collisioncourse: {
		num: 878,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Collision Course",
		shortDesc: "Deals 1.3333x damage with supereffective hits.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePower(basePower, source, target, move) {
			if (target.runEffectiveness(move) > 0) {
				// Placeholder
				this.debug(`collision course super effective buff`);
				return this.chainModify([5461, 4096]);
			}
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},
	electrodrift: {
		num: 879,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Electro Drift",
		shortDesc: "Deals 1.3333x damage with supereffective hits.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePower(basePower, source, target, move) {
			if (target.runEffectiveness(move) > 0) {
				// Placeholder
				this.debug(`electro drift super effective buff`);
				return this.chainModify([5461, 4096]);
			}
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	shedtail: {
		num: 880,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Shed Tail",
		shortDesc: "User takes 1/2 its max HP to pass a substitute.",
		pp: 10,
		priority: 0,
		flags: {},
		volatileStatus: 'substitute',
		onTryHit(source) {
			if (!this.canSwitch(source.side)) {
				this.add('-fail', source);
				return this.NOT_FAIL;
			}
			if (source.volatiles['substitute']) {
				this.add('-fail', source, 'move: Shed Tail');
				return this.NOT_FAIL;
			}
			if (source.hp <= Math.ceil(source.maxhp / 2)) {
				this.add('-fail', source, 'move: Shed Tail', '[weak]');
				return this.NOT_FAIL;
			}
		},
		onHit(target) {
			this.directDamage(Math.ceil(target.maxhp / 2));
		},
		self: {
			onHit(source) {
				source.skipBeforeSwitchOutEventFlag = true;
			},
		},
		selfSwitch: 'shedtail',
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
	},
	chillyreception: {
		num: 881,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Chilly Reception",
		shortDesc: "Starts Snow. User switches out.",
		pp: 10,
		priority: 0,
		flags: {},
		// TODO show prepare message before the "POKEMON used MOVE!" message
		// This happens even before sleep shows its "POKEMON is fast asleep." message
		weather: 'snow',
		selfSwitch: true,
		secondary: null,
		target: "all",
		type: "Ice",
	},
	tidyup: {
		num: 882,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Tidy Up",
		shortDesc: "User +1 Atk, Spe. Clears all substitutes/hazards.",
		pp: 10,
		priority: 0,
		flags: {},
		onHit(pokemon) {
			let success = false;
			for (const active of this.getAllActive()) {
				if (active.removeVolatile('substitute')) success = true;
			}
			const removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			const sides = [pokemon.side, ...pokemon.side.foeSidesWithConditions()];
			for (const side of sides) {
				for (const sideCondition of removeAll) {
					if (side.removeSideCondition(sideCondition)) {
						this.add('-sideend', side, this.dex.getEffect(sideCondition).name);
						success = true;
					}
				}
			}
			if (success) this.add('-activate', pokemon, 'move: Tidy Up');
			return !!this.boost({atk: 1, spe: 1}, pokemon, pokemon, null, false, true) || success;
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
	snowscape: {
		num: 883,
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
	pounce: {
		num: 884,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Pounce",
		shortDesc: "100% chance to lower the target's Speed by 1.",
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
		type: "Bug",
		contestType: "Cute",
	},
	trailblaze: {
		num: 885,
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
	chillingwater: {
		num: 886,
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
	hyperdrill: {
		num: 887,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Hyper Drill",
      shortDesc: "Bypasses protection without breaking it.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Clever",
	},
	twinbeam: {
		num: 888,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		shortDesc: "Hits 2 times in one turn.",
		name: "Twin Beam",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: 2,
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	ragefist: {
		num: 889,
		accuracy: 100,
		basePower: 50,
		basePowerCallback(pokemon) {
			if (!pokemon.m.timesAttacked) pokemon.m.timesAttacked = 0;
			return Math.min(350, 50 + 50 * pokemon.m.timesAttacked);
		},
		category: "Physical",
		name: "Rage Fist",
		shortDesc: "+50 power for each time user was hit. Max 6 hits.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	armorcannon: {
		num: 890,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Armor Cannon",
		shortDesc: "Lowers the user's Defense and Sp. Def by 1.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	bitterblade: {
		num: 891,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Bitter Blade",
		shortDesc: "User recovers 50% of the damage dealt.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	doubleshock: {
		num: 892,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Double Shock",
		shortDesc: "User's Electric type: typeless; must be Electric.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMove(pokemon, target, move) {
			if (pokemon.hasType('Electric')) return;
			this.add('-fail', pokemon, 'move: Double Shock');
			this.attrLastMove('[still]');
			return null;
		},
		self: {
			onHit(pokemon) {
				pokemon.setType(pokemon.getTypes(true).map(type => type === "Electric" ? "???" : type));
				this.add('-start', pokemon, 'typechange', pokemon.getTypes().join('/'), '[from] move: Double Shock');
			},
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Clever",
	},
	gigatonhammer: {
		num: 893,
		accuracy: 100,
		basePower: 160,
		category: "Physical",
		name: "Gigaton Hammer",
		shortDesc: "Cannot be used twice in a row.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: { 
			volatileStatus: "gigatonhammer",
		},
		condition: {
			onDisableMove(pokemon) {
				if (pokemon.lastMove?.id === 'gigatonhammer') pokemon.disableMove('gigatonhammer');
			},
		},
		beforeMoveCallback(pokemon) {
			if (pokemon.lastMove?.id === 'gigatonhammer') pokemon.addVolatile('gigatonhammer');
		},
		// onAfterMove(pokemon) {
			// if (pokemon.removeVolatile('gigatonhammer')) {
				// this.add('-hint', "Some effects can force a Pokemon to use Gigaton Hammer again in a row.");
			// }
		// },
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	comeuppance: {
		num: 894,
		accuracy: 100,
		basePower: 0,
		damageCallback(pokemon) {
			const lastDamagedBy = pokemon.getLastDamagedBy(true);
			if (lastDamagedBy !== undefined) {
				return (lastDamagedBy.damage * 1.5) || 1;
			}
			return 0;
		},
		category: "Physical",
		name: "Comeuppance",
		shortDesc: "If hit by an attack, returns 1.5x damage.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTry(source) {
			const lastDamagedBy = source.getLastDamagedBy(true);
			if (lastDamagedBy === undefined || !lastDamagedBy.thisTurn) return false;
		},
		onModifyTarget(targetRelayVar, source, target, move) {
			const lastDamagedBy = source.getLastDamagedBy(true);
			if (lastDamagedBy) {
				targetRelayVar.target = this.getAtSlot(lastDamagedBy.slot);
			}
		},
		secondary: null,
		target: "scripted",
		type: "Dark",
		contestType: "Cool",
	},
	aquacutter: {
		num: 895,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Aqua Cutter",
		shortDesc: "High critical hit ratio.", 
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, slicing: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	tripledive: {
		num: 865,
		accuracy: 95,
		basePower: 30,
		category: "Physical",
		name: "Triple Dive",
		shortDesc: "Hits 3 times in one turn.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 3,
		secondary: null,
		target: "normal",
		type: "Water",
	},
	blazingtorque: {
		num: 896,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		isNonstandard: "Unobtainable",
		name: "Blazing Torque",
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
		isNonstandard: "Unobtainable",
		name: "Wicked Torque",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 10,
			status: 'slp',
		},
		target: "normal",
		type: "Dark",
	},
	noxioustorque: {
		num: 898,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		isNonstandard: "Unobtainable",
		name: "Noxious Torque",
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
		isNonstandard: "Unobtainable",
		name: "Combat Torque",
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
		isNonstandard: "Unobtainable",
		name: "Magical Torque",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Fairy",
	},
	revivalblessing: {
		num: 863,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Revival Blessing",
		shortDesc: "Revives a fainted Pokemon to 50% HP.",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {},
		onTryHit(source) {
			if (!source.side.pokemon.filter(ally => ally.fainted).length) {
				return false;
			}
			this.add("-message","Warning: this move is bugged. You can use the \"/switch\" command to pick which pokemon you want to revive. Syntax: /switch [number], where [number] is the position of the pokemon in your party that you want to revive.");
		},
		slotCondition: 'revivalblessing',
		// No this not a real switchout move
		// This is needed to trigger a switch protocol to choose a fainted party member
		// Feel free to refactor
		selfSwitch: true,
		condition: {
			duration: 1,
			// reviving implemented in side.ts, kind of
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
	mortalspin: {
		num: 866,
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		name: "Mortal Spin",
		shortDesc: "Poisons foes, frees user from hazards/bind/leech.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Mortal Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Mortal Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Mortal Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Mortal Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		secondary: {
			chance: 100,
			status: 'psn',
		},
		target: "allAdjacentFoes",
		type: "Poison",
	},
	hydrosteam: {
		num: 876,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Hydro Steam",
		shortDesc: "During Sunny Day: 1.5x damage instead of half.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
		// Damage boost in Sun applied in conditions.ts
		thawsTarget: true,
		secondary: null,
		target: "normal",
		type: "Water",
	},
	psyblade: {
		num: 875,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Psyblade",
		shortDesc: "During Electric Terrain: 1.5x power.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		secondary: null,
		onBasePower(basePower, source) {
			if (this.field.isTerrain('electricterrain')) {
				this.debug('psyblade electric terrain boost');
				return this.chainModify(1.5);
			}
		},
		target: "normal",
		type: "Psychic",
	},
};
