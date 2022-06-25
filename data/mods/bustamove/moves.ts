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
		secondary: null,
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
   },*/
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
	/*lifedew: {
		num: 791,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Life Dew",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1, authentic: 1},
		heal: [1, 4],
		slotCondition: 'lifedew',
		condition: {
			onSwap(target) {
				if (target.maxhp) {
					target.heal(target.baseMaxhp / 4);
					this.add('-heal', target, '[from] move: Life Dew');
					target.side.removeSlotCondition(target, 'lifedew');
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Water",
	},*/
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
	//not finished
	/*sparklingaria: {
		num: 664,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "Cures the user's party of burn.",
		name: "Sparkling Aria",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		onHit(ally) {
			for (const ally of source.side.pokemon) {
				if (ally.status === 'brn' && ally.status !== 'psn', 'tox', 'par', 'slp', 'frz') ally.cureStatus();
			}
		},
		secondary: null,
		target: "allAdjacent",
		type: "Water",
		contestType: "Tough",
	},
	steamroller: {
		num: 537,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
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
	},*/
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
};
