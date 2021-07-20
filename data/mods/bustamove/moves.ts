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
		name: "Coaching",
		pp: 10,
		priority: 0,
		flags: {authentic: 1},
		secondary: null,
		boosts: {
			atk: 1,
			def: 1,
		},
		target: "adjacentAlly",
		type: "Fighting",
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
	fairywind: {
		num: 263,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "Power doubles of user is burn/poison/paralyzed.",
		isNonstandard: null,
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
	iceball: {
		num: 301,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		shortDesc: "100% chance to raise the user's Speed by 1.",
		isNonstandard: null,
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
		isNonstandard: null,
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
		isNonstandard: null,
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
	},*/
	steelroller: {
		num: 798,
		accuracy: 90,
		basePower: 100,
		category: "Physical",
		name: "Steel Roller",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onHit(target, source, move) {
			let success = false;
			const removeTarget = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.getEffect(targetCondition).name, '[from] move: Steel Roller', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: Steel Roller', '[of] ' + source);
					success = true;
				}
			}
			this.field.clearTerrain();
			return success;
		},
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
		isNonstandard: null,
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
	/*synchronoise: {
		num: 485,
		accuracy: 85,
		basePower: 95,
		category: "Special",
		shortDesc: "",
		isNonstandard: null,
		name: "Synchronoise",
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
		contestType: "Clever",
	},*/
	terrainpulse: {
		num: 805,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Terrain Pulse",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, pulse: 1},
		onModifyType(move, pokemon) {
			switch (pokemon.hasItem()) {
			case 'magnet':
				move.type = 'Electric';
				break;
			case 'miracleseed':
				move.type = 'Grass';
				break;
			case 'mysticwater':
				move.type = 'Water';
				break;
			case 'oddincense':
				move.type = 'Psychic';
				break;
			}
		},
		secondary: {
			chance: 100,
			self: {
				onHit(pokemon) {
					if (pokemon.hasItem('magnet')) {
						this.field.setTerrain('electricterrain');
					}
					if (pokemon.hasItem('miracleseed')) {
						this.field.setTerrain('grassyterrain');
					}
					if (pokemon.hasItem('mysticwater')) {
						this.field.setTerrain('mistyterrain');
					}
					if (pokemon.hasItem('oddincense')) {
						this.field.setTerrain('psychicterrain');
					}
				},
			},
		},
		target: "normal",
		type: "Normal",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
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
};
