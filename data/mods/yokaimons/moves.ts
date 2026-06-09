export const Moves: {[moveid: string]: MoveData} = {
	// Universals

	guard: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Guard",
		shortDesc: "Reduces damage dealt to the user by 75% this turn.",
		desc: "Reduces damage dealt to the user by 75% this turn. (+4 Priority)",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		onPrepareHit(pokemon) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, 'Spike Cannon', pokemon);
			if (pokemon.activeMoveActions === 0) return true;
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		volatileStatus: 'guard',
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Guard');
			},
			onBeforeMovePriority: 9,
			onBeforeMove(pokemon, target, move) {
				if (move.id !== 'guard') {
					pokemon.removeVolatile('guard');
				}
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (!move.flags['protect']) return;
				this.add('-message', `${target.name}'s Guard reduced its damage taken!`);
				if (target.hasAbility('jarguard')) return this.chainModify(0.125);
				else if (target.hasItem('guardgem')) return this.chainModify([1, 6]);
				return this.chainModify(0.25);
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
	pin: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Pin",
		shortDesc: "Attacks cannot be redirected from the target.",
		desc: "Attacks cannot be redirected from the target. This move cannot be redirected. This effect is removed if an ally of the affected Yo-kai becomes Pinned. (+1 Priority)",
		pp: 15,
		priority: 1,
		flags: {},
		tracksTarget: true,
		volatileStatus: 'pin',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Spike Cannon', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		onHit(target, source, move) {
			// Remove Pin from any ally that is already Pinned
			for (const ally of target.alliesAndSelf()) {
				if (ally !== target && ally.volatiles['pin']) {
					ally.removeVolatile('pin');
				}
			}
			target.addVolatile('pin');
		},
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Pin');
				this.add('-message', `${pokemon.name} has been Pinned!`);
			},
			onFoeRedirectTargetPriority: 10,
			onFoeRedirectTarget(target, source, source2, move) {
				if (target === this.effectState.target) return target;
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Pin', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Normal",
	},
	purify: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Purify",
		shortDesc: "Removes all Inspirits from the user.",
		desc: "Removes all Inspirits from the user.",
		pp: 10,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Refresh', target);
		},
		onTryHit(pokemon) {
			const hasInspirit = Object.keys(pokemon.volatiles).some(volatile => {
				const condition = this.dex.conditions.get(volatile);
				return (condition as any).isInspirit === true;
			});
			if (!hasInspirit) return false;
		},
		onHit(pokemon) {
			const toRemove = Object.keys(pokemon.volatiles).filter(volatile => {
				const condition = this.dex.conditions.get(volatile);
				return (condition as any).isInspirit === true;
			});
			for (const volatile of toRemove) {
				pokemon.removeVolatile(volatile);
			}
			this.add('-message', `${pokemon.name} was purified!`);
		},
		secondary: null,
		target: "self",
		type: "Restoration",
	},

	// Elemental attacks

	ember: {
		accuracy: 100,
		basePower: 65,
		category: "Special",
		name: "Ember",
		shortDesc: "50% chance to burn the target.",
		desc: "50% chance to burn the target.",
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Ember', target);
		},
		secondary: {
			chance: 50,
			status: 'brn',
		},
		target: "any",
		type: "Fire",
	},
	blaze: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Blaze",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Flamethrower', target);
		},
		secondary: null,
		target: "any",
		type: "Fire",
	},
	incinerate: {
		accuracy: 90,
		basePower: 95,
		category: "Special",
		name: "Incinerate",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 10,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Inferno', target);
		},
		flags: {protect: 1},
		secondary: null,
		target: "any",
		type: "Fire",
	},
	watergun: {
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Water Gun",
		shortDesc: "Usually goes first.",
		desc: "Usually goes first.",
		pp: 20,
		priority: 1,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Water Gun', target);
		},
		secondary: null,
		target: "any",
		type: "Water",
	},
	rapids: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Rapids",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Whirlpool', target);
		},
		secondary: null,
		target: "any",
		type: "Water",
	},
	waterfall: {
		accuracy: 90,
		basePower: 95,
		category: "Special",
		name: "Waterfall",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Water Spout', target);
		},
		secondary: null,
		target: "any",
		type: "Water",
	},
	shock: {
		accuracy: 100,
		basePower: 65,
		category: "Special",
		name: "Shock",
		shortDesc: "50% chance to paralyze the target.",
		desc: "50% chance to paralyze the target.",
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Shock Wave', target);
		},
		secondary: {
			chance: 50,
			status: 'par',
		},
		target: "any",
		type: "Electric",
	},
	thunderbolt: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Thunderbolt",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Thunderbolt', target);
		},
		secondary: null,
		target: "any",
		type: "Electric",
	},
	voltage: {
		accuracy: 90,
		basePower: 95,
		category: "Special",
		name: "Voltage",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Thunder', target);
		},
		secondary: null,
		target: "any",
		type: "Electric",
	},
	pebble: {
		accuracy: 100,
		basePower: 65,
		category: "Special",
		name: "Pebble",
		shortDesc: "100% chance to lower the target's Defense by 1.",
		desc: "100% chance to lower the target's Defense by 1.",
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Rock Throw', target);
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		target: "any",
		type: "Rock",
	},
	rockslide: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Rockslide",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Rock Slide', target);
		},
		secondary: null,
		target: "any",
		type: "Rock",
	},
	meteor: {
		accuracy: 90,
		basePower: 95,
		category: "Special",
		name: "Meteor",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Meteor Beam', target);
		},
		secondary: null,
		target: "any",
		type: "Rock",
	},
	whirlwind: {
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Whirlwind",
		shortDesc: "100% chance to lower the foe(s) Speed by 1.",
		desc: "100% chance to lower the foe(s) Speed by 1.",
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Air Cutter', target);
		},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "allFoes",
		type: "Flying",
	},
	tornado: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Tornado",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Gust', target);
		},
		secondary: null,
		target: "any",
		type: "Flying",
	},
	storm: {
		accuracy: 90,
		basePower: 95,
		category: "Special",
		name: "Storm",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Hurricane', target);
		},
		secondary: null,
		target: "any",
		type: "Flying",
	},
	hail: {
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Hail",
		shortDesc: "100% chance to lower the foe(s) Speed by 1.",
		desc: "100% chance to lower the foe(s) Speed by 1.",
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Icy Wind', target);
		},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "allFoes",
		type: "Ice",
	},
	frost: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Frost",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Ice Beam', target);
		},
		secondary: null,
		target: "any",
		type: "Ice",
	},
	blizzard: {
		accuracy: 90,
		basePower: 95,
		category: "Special",
		name: "Blizzard",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Blizzard', target);
		},
		secondary: null,
		target: "any",
		type: "Ice",
	},
	absorb: {
		accuracy: 100,
		basePower: 65,
		category: "Special",
		name: "Absorb",
		shortDesc: "User recovers 75% of the damage dealt.",
		desc: "User recovers 75% of the damage dealt.",
		pp: 20,
		priority: 0,
		flags: {heal: 1, protect: 1},
		drain: [3, 4],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Absorb', target);
		},
		secondary: null,
		target: "any",
		type: "Drain",
	},
	megadrain: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Mega Drain",
		shortDesc: "User recovers 50% of the damage dealt.",
		desc: "User recovers 50% of the damage dealt.",
		pp: 15,
		priority: 0,
		flags: {heal: 1, protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Giga Drain', target);
		},
		drain: [1, 2],
		secondary: null,
		target: "any",
		type: "Drain",
	},
	reaper: {
		accuracy: 90,
		basePower: 95,
		category: "Special",
		name: "Reaper",
		shortDesc: "User recovers 50% of the damage dealt.",
		desc: "User recovers 50% of the damage dealt.",
		pp: 10,
		priority: 0,
		flags: {heal: 1, protect: 1},
		drain: [1, 2],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Oblivion Wing', target);
		},
		secondary: null,
		target: "any",
		type: "Drain",
	},
	heal: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Heal",
		shortDesc: "Heals the target a little bit.",
		desc: "Heals the target according to the following formula: Healing = (65 * (User's Spirit / 2)) / 100.",
		pp: 20,
		priority: 0,
		flags: {heal: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Recover', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		onHit(target, source, move) {
			const healing = Math.floor((65 * Math.floor(source.getStat('spa') / 2)) / 100);
			this.heal(healing, target, source);
		},
		secondary: null,
		target: "any",
		type: "Restoration",
	},
	restore: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Restore",
		shortDesc: "Heals the target a lot.",
		desc: "Heals the target according to the following formula: Healing = (80 * (User's Spirit / 2)) / 100.",
		pp: 10,
		priority: 0,
		flags: {heal: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Recover', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		onHit(target, source, move) {
			const healing = Math.floor((80 * Math.floor(source.getStat('spa') / 2)) / 100);
			this.heal(healing, target, source);
		},
		secondary: null,
		target: "any",
		type: "Restoration",
	},
	paradise: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Paradise",
		shortDesc: "Heals the target a ton.",
		desc: "Heals the target according to the following formula: Healing = (95 * (User's Spirit / 2)) / 100.",
		pp: 5,
		priority: 0,
		flags: {heal: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Recover', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		onHit(target, source, move) {
			const healing = Math.floor((95 * Math.floor(source.getStat('spa') / 2)) / 100);
			this.heal(healing, target, source);
		},
		secondary: null,
		target: "any",
		type: "Restoration",
	},

	// Physical attacks

	absolutezero: {
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		name: "Absolute Zero",
		shortDesc: "User cannot move next turn.",
		desc: "User cannot move next turn.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, recharge: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Sheer Cold', target);
		},
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: null,
		target: "allFoes",
		type: "Ice",
	},
	acidspray: {
		accuracy: 95,
		basePower: 40,
		category: "Physical",
		name: "Acid Spray",
		shortDesc: "100% chance to lower the foe(s) Defense by 1.",
		desc: "100% chance to lower the foe(s) Defense by 1.",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		target: "allFoes",
		type: "Ice",
	},
	aerialslam: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Aerial Slam",
		shortDesc: "30% chance to lower the target's Speed by 1.",
		desc: "30% chance to lower the target's Speed by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Body Slam', target);
		},
		secondary: {
			chance: 30,
			boosts: {
				spe: -1,
			},
		},
		target: "any",
		type: "Flying",
	},
	airblast: {
		accuracy: 80,
		basePower: 120,
		category: "Physical",
		name: "Air Blast",
		shortDesc: "30% chance to Burn.",
		desc: "30% chance to Burn.",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Aeroblast', target);
		},
		secondary: {
			chance: 30,
			status: 'brn'
		},
		target: "any",
		type: "Flying",
	},
	astralbash: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Astral Bash",
		shortDesc: "100% chance to raise the user's Defense by 1.",
		desc: "100% chance to raise the user's Defense by 1.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Body Slam', target);
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					def: 1,
				},
			},
		},
		target: "any",
		type: "Psychic",
	},
	bananablast: {
		accuracy: 100,
		basePower: 140,
		category: "Physical",
		name: "Banana Blast",
		shortDesc: "Cannot be used on consecutive turns.",
		desc: "Cannot be used on consecutive turns.",
		pp: 5,
		priority: 0,
		flags: {cantusetwice: 1, protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Apple Acid', target);
		},
		secondary: null,
		target: "any",
		type: "Grass",
	},
	bigsplash: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Big Splash",
		shortDesc: "Damages adjacent Yo-kai for 1/8 max HP.",
		desc: "Damages adjacent Yo-kai for 1/8 max HP.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Splash', target);
			this.add('-anim', source, 'Wave Crash', target);
		},
		onHit(target, source, move) {
			for (const ally of target.adjacentAllies()) {
				this.damage(Math.floor(ally.baseMaxhp / 8), ally, source, move);
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			for (const ally of target.adjacentAllies()) {
				this.damage(Math.floor(ally.baseMaxhp / 8), ally, source, move);
			}
		},
		secondary: null,
		target: "any",
		type: "Water",
	},
	bite: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Bite",
		shortDesc: "Prevents the target from switching out.",
		desc: "Prevents the target from switching out.",
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Bite', target);
		},
		onHit(target, source, move) {
			return target.addVolatile('trapped', source, move, 'trapper');
		},
		secondary: null,
		target: "any",
		type: "Normal",
	},
	bodybash: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Body Bash",
		shortDesc: "Has 33% recoil.",
		desc: "Has 33% recoil.",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Body Slam', target);
		},
		recoil: [33, 100],
		secondary: null,
		target: "any",
		type: "Normal",
	},
	bodypress: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Body Press",
		shortDesc: "Uses user's Def stat as Atk in damage calculation.",
		desc: "Uses user's Def stat as Atk in damage calculation.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		overrideOffensiveStat: 'def',
		secondary: null,
		target: "any",
		type: "Fighting",
	},
	boilingbeat: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Boiling Beat",
		shortDesc: "Super effective on Water.",
		desc: "Super effective on Water.",
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Fire Lash', target);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Water') return 1;
		},
		secondary: null,
		target: "any",
		type: "Fire",
	},
	bonechillsmack: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Bonechill Smack",
		shortDesc: "30% chance to Poison.",
		desc: "30% chance to Poison.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Ice Punch', target);
		},
		secondary: {
			chance: 30,
			status: 'psn',
		},
		target: "any",
		type: "Ice",
	},
	breakingswipe: {
		accuracy: 95,
		basePower: 40,
		category: "Physical",
		name: "Breaking Swipe",
		shortDesc: "100% chance to lower the foe(s) Strength by 1.",
		desc: "100% chance to lower the foe(s) Strength by 1.",
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
			},
		},
		target: "allFoes",
		type: "Dragon",
	},
	brutalswing: {
		accuracy: 95,
		basePower: 65,
		category: "Physical",
		name: "Brutal Swing",
		shortDesc: "20% chance to drop the target's Defense by 1.",
		desc: "20% chance to drop the target's Defense by 1.",
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
		target: "allFoes",
		type: "Dark",
	},
	burningjealousy: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Burning Jealousy",
		shortDesc: "Deals double damage if the target has a positive Inspirit.",
		desc: "Deals double damage if the target has a positive Inspirit.",
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		onBasePower(basePower, attacker, defender, move) {
			if (Object.keys(defender.volatiles).some(v => {
				const condition = this.dex.conditions.get(v);
				return (condition as any).isInspirit === true && (condition as any).isGood === true;
			})) {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "any",
		type: "Fire",
	},
	chumchew: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Chum Chew",
		shortDesc: "User recovers 50% of the damage dealt.",
		desc: "User recovers 50% of the damage dealt.",
		pp: 10,
		priority: 0,
		flags: {heal: 1, protect: 1},
		drain: [1, 2],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Snap Trap', target);
		},
		secondary: null,
		target: "any",
		type: "Grass",
	},
	coinblast: {
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		name: "Coin Blast",
		shortDesc: "Hits 2-4 times.",
		desc: "Hits 2-4 times.",
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		multihit: [2, 4],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Make It Rain', target);
		},
		secondary: null,
		target: "any",
		type: "Steel",
	},
	crush: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Crush",
		shortDesc: "Has 25% recoil.",
		desc: "Has 25% recoil.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		recoil: [1, 4],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Body Press', target);
		},
		secondary: null,
		target: "any",
		type: "Dark",
	},
	cutdown: {
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Cut Down",
		shortDesc: "If the target has any positive stat changes, those stats are lowered by 1.",
		desc: "If the target has any positive stat changes, those stats are lowered by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Night Slash', target);
		},
		onHit(target, source, move) {
			const drops: SparseBoostsTable = {};
			let hasPositiveBoost = false;
			for (const boostName in target.boosts) {
				if (target.boosts[boostName as BoostID] > 0) {
					drops[boostName as BoostID] = -1;
					hasPositiveBoost = true;
				}
			}
			if (!hasPositiveBoost) return false;
			this.boost(drops, target, source);
		},
		secondary: null,
		target: "any",
		type: "Dark",
	},
	darkmirror: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Dark Mirror",
		shortDesc: "Uses the target's Strength when calculating damage.",
		desc: "Uses the target's Strength when calculating damage.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		overrideOffensivePokemon: 'target',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Mirror Shot', target);
		},
		secondary: null,
		target: "any",
		type: "Dark",
	},
	darksparkles: {
		accuracy: 85,
		basePower: 100,
		category: "Physical",
		name: "Dark Sparkles",
		shortDesc: "Moves used after this will ignore accuracy checks.",
		desc: "Moves used after this will ignore accuracy checks.",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Icy Wind', target);
		},
		pseudoWeather: 'darksparkles',
		condition: {
			duration: 1,
			onStart(field, source) {
				this.add('-fieldstart', 'move: Dark Sparkles');
				this.add('-message', `Dark Sparkles fill the field!`);
			},
			onAnyAccuracy(accuracy, target, source, move) {
				return true;
			},
			onEnd(field) {
				this.add('-fieldend', 'move: Dark Sparkles');
				this.add('-message', `The Dark Sparkles have faded!`);
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Dark",
	},
	dragonbite: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Dragon Bite",
		shortDesc: "Prevents the target from switching out.",
		desc: "Prevents the target from switching out.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Crunch', target);
		},
		onHit(target, source, move) {
			return target.addVolatile('trapped', source, move, 'trapper');
		},
		secondary: null,
		target: "any",
		type: "Dragon",
	},
	drainingkiss: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Draining Kiss",
		shortDesc: "User recovers 75% of the damage dealt.",
		desc: "User recovers 75% of the damage dealt.",
		pp: 10,
		priority: 0,
		flags: {heal: 1, protect: 1},
		drain: [3, 4],
		secondary: null,
		target: "any",
		type: "Fairy",
	},
	earthquake: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Earthquake",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		secondary: null,
		target: "any",
		type: "Ground",
	},
	ectobash: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Ecto Bash",
		shortDesc: "Has 25% recoil.",
		desc: "Has 25% recoil.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		recoil: [1, 4],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Body Slam', target);
		},
		secondary: null,
		target: "any",
		type: "Ghost",
	},
	energysiphon: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Energy Siphon",
		shortDesc: "Increases the Spirit of the user's adjacent allies by 1.",
		desc: "Increases the Spirit of the user's adjacent allies by 1.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Strength Sap', target);
		},
		onAfterHit(target, source, move) {
			for (const ally of source.adjacentAllies()) {
				this.boost({spa: 1}, ally, source);
			}
		},
		secondary: null,
		target: "any",
		type: "Psychic",
	},
	fakeout: {
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Fake Out",
		shortDesc: "Hits first. First turn out only. 100% flinch chance.",
		desc: "First turn out only. 100% flinch chance. (+3 Priority)",
		pp: 10,
		priority: 3,
		flags: {protect: 1},
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Fake Out only works on your first turn out.");
				return false;
			}
		},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		target: "any",
		type: "Normal",
	},
	fateshand: {
		accuracy: 100,
		basePower: 0,
		category: "Physical",
		name: "Fate's Hand",
		shortDesc: "This move's power is a random number from 30-160.",
		desc: "This move's power is a random number from 30-160.",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Assurance', target);
		},
		onModifyMove(move, pokemon) {
			move.basePower = this.random(30, 161);
			this.debug(`Fate's Hand base power: ${move.basePower}`);
		},
		secondary: null,
		target: "any",
		type: "Dark",
	},
	firefang: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Fire Fang",
		shortDesc: "30% chance to Burn. Prevents the target from switching out.",
		desc: "30% chance to Burn. Prevents the target from switching out.",
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		onHit(target, source, move) {
			return target.addVolatile('trapped', source, move, 'trapper');
		},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "any",
		type: "Fire",
	},
	flameslash: {
		accuracy: 95,
		basePower: 65,
		category: "Physical",
		name: "Flame Slash",
		shortDesc: "High critical hit ratio.",
		desc: "High critical hit ratio.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		critRatio: 2,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Incinerate', target);
			this.add('-anim', source, 'Slash', target);
		},
		secondary: null,
		target: "allFoes",
		type: "Fire",
	},
	flareblitz: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Flare Blitz",
		shortDesc: "Has 33% recoil.",
		desc: "Has 33% recoil.",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		recoil: [33, 100],
		secondary: null,
		target: "any",
		type: "Fire",
	},
	flashstep: {
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Flash Step",
		shortDesc: "Usually goes first.",
		desc: "Usually goes first. (+1 Priority)",
		pp: 20,
		priority: 1,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Bullet Punch', target);
		},
		secondary: null,
		target: "any",
		type: "Electric",
	},
	flipkick: {
		accuracy: 90,
		basePower: 130,
		category: "Physical",
		name: "Flip Kick",
		shortDesc: "User is hurt by 50% of its max HP if it misses.",
		desc: "User is hurt by 50% of its max HP if it misses.",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		hasCrashDamage: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Jump Kick', target);
		},
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, move);
		},
		secondary: null,
		target: "any",
		type: "Normal",
	},
	frozenslash: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Frozen Slash",
		shortDesc: "50% chance to lower the target's Spirit by 1.",
		desc: "50% chance to lower the target's Spirit by 1.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Aqua Cutter', target);
		},
		secondary: {
			chance: 50,
			boosts: {
				spa: -1,
			},
		},
		target: "any",
		type: "Ice",
	},
	gunkshot: {
		accuracy: 80,
		basePower: 120,
		category: "Physical",
		name: "Gunk Shot",
		shortDesc: "30% chance to Poison.",
		desc: "30% chance to Poison.",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 30,
			status: 'psn',
		},
		target: "any",
		type: "Poison",
	},
	hardpress: {
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		name: "Hard Press",
		shortDesc: "Has 25% recoil.",
		desc: "Has 25% recoil.",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		recoil: [1, 4],
		secondary: null,
		target: "any",
		type: "Steel",
	},
	hatebuster: {
		accuracy: 100,
		basePower: 140,
		category: "Physical",
		name: "Hate Buster",
		shortDesc: "100% chance to raise the target's Strength by 1.",
		desc: "100% chance to raise the target's Strength by 1.",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Shadow Ball', target);
		},
		secondary: {
			chance: 100,
			boosts: {
				atk: 1,
			},
		},
		target: "any",
		type: "Dark",
	},
	hatefulhit: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Hateful Hit",
		shortDesc: "50% chance to lower the target's Spirit by 1.",
		desc: "50% chance to lower the target's Spirit by 1.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Knock Off', target);
		},
		secondary: {
			chance: 50,
			boosts: {
				spa: -1,
			},
		},
		target: "any",
		type: "Dark",
	},
	haymaker: {
		accuracy: 80,
		basePower: 110,
		category: "Physical",
		name: "Haymaker",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Mega Punch', target);
		},
		secondary: null,
		target: "any",
		type: "Fighting",
	},
	hazyheadbutt: {
		accuracy: 90,
		basePower: 100,
		category: "Physical",
		name: "Hazy Headbutt",
		shortDesc: "Lowers the target's Defense by 1 if the target's Defense is lower than the user's.",
		desc: "Lowers the target's Defense by 1 if the target's Defense is lower than the user's.",
		pp: 5,
		priority: 0,
		flags: {head: 1, protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Headbutt', target);
		},
		onHit(target, source, move) {
			if (target.getStat('def') < source.getStat('def')) {
				this.boost({def: -1}, target, source);
			}
		},
		secondary: null,
		target: "any",
		type: "Ghost",
	},
	headbuster: {
		accuracy: 70,
		basePower: 120,
		category: "Physical",
		name: "Headbuster",
		shortDesc: "Lowers the target's Defense by 1 if the target's Defense is lower than the user's.",
		desc: "Lowers the target's Defense by 1 if the target's Defense is lower than the user's.",
		pp: 5,
		priority: 0,
		flags: {head: 1, protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Head Smash', target);
		},
		onHit(target, source, move) {
			if (target.getStat('def') < source.getStat('def')) {
				this.boost({def: -1}, target, source);
			}
		},
		secondary: null,
		target: "any",
		type: "Fighting",
	},
	headbutt: {
		accuracy: 100,
		basePower: 80,
		basePowerCallback(pokemon, target, move) {
			if (target.getStat('def') < pokemon.getStat('def')) {
				this.debug('Headbutt damage boost');
				return move.basePower * 1.5;
			}
			this.debug('Headbutt NOT boosted');
			return move.basePower;
		},
		category: "Physical",
		name: "Headbutt",
		shortDesc: "Power is 1.5x if the target's Defense is lower than the user's.",
		desc: "Power is 1.5x if the target's Defense is lower than the user's.",
		pp: 15,
		priority: 0,
		flags: {head: 1, protect: 1},
		secondary: null,
		target: "any",
		type: "Normal",
	},
	headlongrush: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Headlong Rush",
		shortDesc: "Lowers the user's Defense by 1.",
		desc: "Lowers the user's Defense by 1.",
		pp: 5,
		priority: 0,
		flags: {head: 1, protect: 1},
		self: {
			boosts: {
				def: -1,
			},
		},
		secondary: null,
		target: "any",
		type: "Ground",
	},
	hexclaws: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Hex Claws",
		shortDesc: "Removes Inspirits from the target.",
		desc: "Removes Inspirits from the target.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Psycho Cut', target);
		},
		onAfterHit(target, source, move) {
			const toRemove = Object.keys(target.volatiles).filter(volatile => {
				const condition = this.dex.conditions.get(volatile);
				return (condition as any).isInspirit === true;
			});
			if (!toRemove.length) return;
			for (const volatile of toRemove) {
				target.removeVolatile(volatile);
			}
			this.add('-message', `${target.name} was purified!`);
		},
		secondary: null,
		target: "any",
		type: "Psychic",
	},
	horriblenoise: {
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Horrible Noise",
		shortDesc: "100% chance to lower the target's Defense by 1.",
		desc: "100% chance to lower the target's Defense by 1.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Metal Sound', target);
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		target: "any",
		type: "Dark",
	},
	icefang: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Ice Fang",
		shortDesc: "Lowers the target's Speed by 1 and prevents them from switching out.",
		desc: "Lowers the target's Speed by 1 and prevents them from switching out.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onHit(target, source, move) {
			return target.addVolatile('trapped', source, move, 'trapper');
		},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "any",
		type: "Ice",
	},
	knockout: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Knock Out",
		shortDesc: "If the target is below 1/2 max HP, they fall asleep.",
		desc: "If the target is below 1/2 max HP, they fall asleep.",
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Throat Chop', target);
		},
		onHit(target, source, move) {
			if (target.hp * 2 <= target.maxhp) {
				source.trySetStatus('slp', target);
			}
		},
		secondary: null,
		target: "any",
		type: "Dark",
	},
	kusanagi: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Kusanagi",
		shortDesc: "High critical hit ratio. Hits Dark types super effectively.",
		desc: "High critical hit ratio. Hits Dark types super effectively.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		critRatio: 2,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Sacred Sword', target);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Dark') return 1;
		},
		secondary: null,
		target: "any",
		type: "Electric",
	},
	leechlife: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Leech Life",
		shortDesc: "User recovers 50% of the damage dealt.",
		desc: "User recovers 50% of the damage dealt.",
		pp: 10,
		priority: 0,
		flags: {heal: 1, protect: 1},
		drain: [1, 2],
		secondary: null,
		target: "any",
		type: "Bug",
	},
	lightningslash: {
		accuracy: 95,
		basePower: 65,
		category: "Physical",
		name: "Lightning Slash",
		shortDesc: "High critical hit ratio.",
		desc: "High critical hit ratio.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		critRatio: 2,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Air Slash', target);
		},
		secondary: null,
		target: "allFoes",
		type: "Electric",
	},
	lovebuster: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Love Buster",
		shortDesc: "100% chance to lower the target's Strength by 1.",
		desc: "100% chance to lower the target's Strength by 1.",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Moonblast', target);
		},
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
			},
		},
		target: "any",
		type: "Fairy",
	},
	lustrousglow: {
		accuracy: 95,
		basePower: 40,
		category: "Physical",
		name: "Lustrous Glow",
		shortDesc: "100% chance to lower the foe(s) Strength by 1.",
		desc: "100% chance to lower the foe(s) Strength by 1.",
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Flash', target);
		},
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
			},
		},
		target: "allFoes",
		type: "Steel",
	},
	masamune: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Masamune",
		shortDesc: "High critical hit ratio. 20% chance to raise the user's Strength by 1.",
		desc: "High critical hit ratio. 20% chance to raise the user's Strength by 1.",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		critRatio: 2,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Sacred Sword', target);
		},
		secondary: {
			chance: 20,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		target: "any",
		type: "Fire",
	},
	megahorn: {
		accuracy: 85,
		basePower: 120,
		category: "Physical",
		name: "Megahorn",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 5,
		priority: 0,
		flags: {head: 1, protect: 1},
		secondary: null,
		target: "any",
		type: "Bug",
	},
	meteorpunch: {
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		name: "Meteor Punch",
		shortDesc: "Ignores the target's stat stage changes.",
		desc: "Ignores the target's stat stage changes.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		ignoreEvasion: true,
		ignoreDefensive: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Meteor Mash', target);
		},
		secondary: null,
		target: "any",
		type: "Rock",
	},
	mochislap: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Mochi Slap",
		shortDesc: "50% chance to raise the user's Strength by 1.",
		desc: "50% chance to raise the user's Strength by 1.",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Wake-Up Slap', target);
		},
		secondary: {
			chance: 50,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		target: "any",
		type: "Grass",
	},
	muramasa: {
		accuracy: 80,
		basePower: 120,
		category: "Physical",
		name: "Muramasa",
		shortDesc: "50% chance to lower the target's Speed by 1.",
		desc: "50% chance to lower the target's Speed by 1.",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Ceaseless Edge', target);
		},
		secondary: {
			chance: 50,
			boosts: {
					spe: -1,
				},
		},
		target: "any",
		type: "Dark",
	},
	ominouswind: {
		accuracy: 95,
		basePower: 40,
		category: "Physical",
		name: "Ominous Wind",
		shortDesc: "100% chance to lower the foe(s) Spirit by 1.",
		desc: "100% chance to lower the foe(s) Spirit by 1.",
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 100,
			boosts: {
				spa: -1,
			},
		},
		target: "allFoes",
		type: "Ghost",
	},
	peskypeck: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Pesky Peck",
		shortDesc: "Target loses an additional 1/8 max HP at end of turn.",
		desc: "Target loses an additional 1/8 max HP at end of turn.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Pluck', target);
		},
		onHit(target, source, move) {
			target.addVolatile('bleed');
		},
		secondary: null,
		target: "any",
		type: "Flying",
	},
	petalblizzard: {
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		name: "Petal Blizzard",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		secondary: null,
		target: "any",
		type: "Grass",
	},
	playrough: {
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Play Rough",
		shortDesc: "30% chance to lower the target's Strength by 1.",
		desc: "30% chance to lower the target's Strength by 1.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 30,
			boosts: {
				atk: -1,
			},
		},
		target: "any",
		type: "Fairy",
	},
	poke: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Poke",
		shortDesc: "Target loses an additional 1/8 max HP at end of turn.",
		desc: "Target loses an additional 1/8 max HP at end of turn.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Pin Missile', target);
		},
		onHit(target, source, move) {
			target.addVolatile('bleed');
		},
		secondary: null,
		target: "any",
		type: "Fighting",
	},
	poisonpoke: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Poison Poke",
		shortDesc: "30% chance to Poison. Target loses an additional 1/8 max HP at end of turn.",
		desc: "30% chance to Poison. Target loses an additional 1/8 max HP at end of turn.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Fell Stinger', target);
		},
		onHit(target, source, move) {
			target.addVolatile('bleed');
		},
		secondary: {
			chance: 30,
			status: 'psn',
		},
		target: "any",
		type: "Fighting",
	},
	practicedpunch: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Practiced Punch",
		shortDesc: "Damage increases by 1.1x for each consecutive use. (Max 2x)",
		desc: "Damage increases by 1.1x for each consecutive use. (Max 2x)",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		volatileStatus: 'practicedpunch',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Power-Up Punch', target);
		},
		condition: {
			onStart(pokemon) {
				this.effectState.lastMove = '';
				this.effectState.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (move.callsMove) return;
				if (this.effectState.lastMove === move.id && pokemon.moveLastTurnResult) {
					this.effectState.numConsecutive++;
					this.effectState.lastMove = move.id;
				} else {
					pokemon.removeVolatile('practicedpunch');
				}
			},
			onModifyDamage(damage, source, target, move) {
				const numConsecutive = Math.min(this.effectState.numConsecutive, 10);
				const modifier = Math.min(1 + (numConsecutive * 0.1), 2);
				this.debug(`Consecutive use modifier: ${modifier}`);
				return this.chainModify(modifier);
			},
		},
		secondary: null,
		target: "any",
		type: "Fighting",
	},
	rapidgrowth: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Rapid Growth",
		shortDesc: "100% chance to raise the user's Strength by 1.",
		desc: "100% chance to raise the user's Strength by 1.",
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Seed Flare', target);
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		target: "any",
		type: "Grass",
	},
	razorfan: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Razor Fan",
		shortDesc: "High critical hit ratio.",
		desc: "High critical hit ratio.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		critRatio: 2,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Razor Leaf', target);
		},
		secondary: null,
		target: "any",
		type: "Grass",
	},
	rocketpunch: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Rocket Punch",
		shortDesc: "High critical hit ratio.",
		desc: "High critical hit ratio.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Meteor Mash', target);
		},
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['futuremove']) {
				return this.chainModify(0.5);
			}
		},
		onHit(target, source, move) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 2,
				move: 'rocketpunch',
            	source: source,
				moveData: {
					id: 'rocketpunch',
					name: "Rocket Punch",
					accuracy: 100,
					basePower: 50,
					category: "Physical",
					priority: 0,
					flags: {futuremove: 1, protect: 1},
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Steel',
				},
			});
			this.add('-start', source, 'move: Rocket Punch');
		},
		secondary: null,
		target: "any",
		type: "Steel",
	},
	scalyslam: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Scaly Slam",
		shortDesc: "Has 33% recoil.",
		desc: "Has 33% recoil.",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		recoil: [33, 100],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Body Slam', target);
		},
		secondary: null,
		target: "any",
		type: "Dragon",
	},
	seaweedslap: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Seaweed Slap",
		shortDesc: "After dealing damage, The user and its allies restore 1/8 of their max HP.",
		desc: "After dealing damage, The user and its allies restore 1/8 of their max HP.",
		pp: 5,
		priority: 0,
		flags: {heal: 1, protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Power Whip', target);
		},
		onAfterHit(target, source, move) {
			for (const ally of source.alliesAndSelf()) {
				if (!ally.fainted) this.heal(Math.floor(ally.baseMaxhp / 8), ally, source);
			}
		},
		secondary: null,
		target: "any",
		type: "Grass",
	},
	shadowslash: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Shadow Slash",
		shortDesc: "Bypasses the foe's Guard.",
		desc: "Bypasses the foe's Guard.",
		pp: 15,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Shadow Claw', target);
		},
		secondary: null,
		target: "any",
		type: "Ghost",
	},
	shadowsneak: {
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Shadow Sneak",
		shortDesc: "Usually goes first.",
		desc: "Usually goes first. (+1 Priority)",
		pp: 20,
		priority: 1,
		flags: {protect: 1},
		secondary: null,
		target: "any",
		type: "Ghost",
	},
	smack: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Smack",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Pound', target);
		},
		secondary: null,
		target: "any",
		type: "Normal",
	},
	stabstorm: {
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		name: "Stab Storm",
		shortDesc: "Hits 3-5 times.",
		desc: "Hits 3-5 times.",
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		multihit: [3, 5],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Diamond Storm', target);
		},
		secondary: null,
		target: "allFoes",
		type: "Steel",
	},
	stoneedge: {
		accuracy: 80,
		basePower: 110,
		category: "Physical",
		name: "Stone Edge",
		shortDesc: "High critical hit ratio.",
		desc: "High critical hit ratio.",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		critRatio: 2,
		secondary: null,
		target: "any",
		type: "Rock",
	},
	strangesteam: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Strange Steam",
		shortDesc: "100% chance to lower the target's Spirit by 1.",
		desc: "100% chance to lower the target's Spirit by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 100,
			boosts: {
				spa: -1,
			},
		},
		target: "any",
		type: "Fairy",
	},
	suckerpunch: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Sucker Punch",
		pp: 5,
		priority: 1,
		flags: {protect: 1},
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || (move.category === 'Status' && move.id !== 'mefirst') || target.volatiles['mustrecharge']) {
				return false;
			}
		},
		secondary: null,
		target: "any",
		type: "Dark",
	},
	swordslash: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Sword Slash",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Slash', target);
		},
		secondary: null,
		target: "any",
		type: "Steel",
	},
	tattleblast: {
		accuracy: 90,
		basePower: 80,
		category: "Physical",
		name: "Tattleblast",
		shortDesc: "100% chance to lower the foe(s) Defense by 1.",
		desc: "100% chance to lower the foe(s) Strength by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Shock Wave', target);
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		target: "allFoes",
		type: "Electric",
	},
	terrify: {
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Terrify",
		shortDesc: "100% chance to lower the target's Speed by 1.",
		desc: "100% chance to lower the target's Speed by 1.",
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Astonish', target);
		},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "any",
		type: "Ghost",
	},
	thunderfang: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Thunder Fang",
		shortDesc: "Charges the user after dealing damage.",
		desc: "Charges the user after dealing damage.",
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			pokemon.addVolatile('charge');
		},
		secondary: null,
		target: "any",
		type: "Electric",
	},
	thunderpunch: {
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Thunder Punch",
		shortDesc: "Charges adjacent allies after dealing damage.",
		desc: "Charges adjacent allies after dealing damage.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onAfterHit(target, source, move) {
			for (const ally of source.adjacentAllies()) {
				ally.addVolatile('charge');
			}
		},
		secondary: null,
		target: "any",
		type: "Electric",
	},
	toxicbite: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Toxic Bite",
		shortDesc: "Poisons the target and prevents them from switching out.",
		desc: "Poisons the target and prevents them from switching out.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Fang', target);
		},
		onHit(target, source, move) {
			return target.addVolatile('trapped', source, move, 'trapper');
		},
		secondary: {
			chance: 100,
			status: 'psn',
		},
		target: "any",
		type: "Poison",
	},
	uturn: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "U-turn",
		shortDesc: "User switches out after damaging the target.",
		desc: "User switches out after damaging the target.",
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		selfSwitch: true,
		secondary: null,
		target: "any",
		type: "Bug",
	},
	voltswitch: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Volt Switch",
		shortDesc: "User switches out after damaging the target.",
		desc: "User switches out after damaging the target.",
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		selfSwitch: true,
		secondary: null,
		target: "any",
		type: "Electric",
	},
	wavecrash: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Wave Crash",
		shortDesc: "Has 33% recoil.",
		desc: "Has 33% recoil.",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		recoil: [33, 100],
		secondary: null,
		target: "any",
		type: "Water",
	},
	wetslap: {
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Wet Slap",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Liquidation', target);
		},
		secondary: null,
		target: "any",
		type: "Water",
	},
	windslash: {
		accuracy: 95,
		basePower: 65,
		category: "Physical",
		name: "Wind Slash",
		shortDesc: "High critical hit ratio.",
		desc: "High critical hit ratio.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		critRatio: 2,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Air Cutter', target);
		},
		secondary: null,
		target: "allFoes",
		type: "Flying",
	},

	// Status moves

	
	afteryou: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "After You",
		shortDesc: "The target makes its move right after the user.",
		desc: "The target makes its move right after the user.",
		pp: 15,
		priority: 0,
		flags: {allyanim: 1},
		onHit(target) {
			if (this.activePerHalf === 1) return false; // fails in singles
			const action = this.queue.willMove(target);
			if (action) {
				this.queue.prioritizeAction(action);
				this.add('-activate', target, 'move: After You');
			} else {
				return false;
			}
		},
		secondary: null,
		target: "any",
		type: "Normal",
	},
	babble: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Babble",
		shortDesc: "Lowers the target's Defense by 1.",
		desc: "Lowers the target's Defense by 1.",
		pp: 20,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Chatter', target);
		},
		boosts: {
			def: -1,
		},
		secondary: null,
		target: "allFoes",
		type: "Normal",
	},
	batonpass: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Baton Pass",
		shortDesc: "User switches, passing stat changes and more. (Passes positive Inspirits)",
		desc: "User switches, passing stat changes and more. (Passes positive Inspirits)",
		pp: 20,
		priority: 0,
		flags: {},
		onHit(target) {
			if (!this.canSwitch(target.side) || target.volatiles['commanded']) {
				this.attrLastMove('[still]');
				this.add('-fail', target);
				return this.NOT_FAIL;
			}
		},
		self: {
			onHit(source) {
				const toRemove = Object.keys(source.volatiles).filter(volatile => {
					const condition = this.dex.conditions.get(volatile);
					return (condition as any).isInspirit === true && (condition as any).isGood === false;
				});
				for (const volatile of toRemove) {
					source.removeVolatile(volatile);
				}
				source.skipBeforeSwitchOutEventFlag = true;
			},
		},
		selfSwitch: 'copyvolatile',
		secondary: null,
		target: "self",
		type: "Normal",
	},
	encore: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Encore",
		shortDesc: "Target repeats its last move for its next 3 turns.",
		desc: "Target repeats its last move for its next 3 turns.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, failencore: 1},
		volatileStatus: 'encore',
		condition: {
			duration: 3,
			noCopy: true, // doesn't get copied by Z-Baton Pass
			onStart(target) {
				let move: Move | ActiveMove | null = target.lastMove;
				if (!move || target.volatiles['dynamax']) return false;

				if (move.isMax && move.baseMove) move = this.dex.moves.get(move.baseMove);
				const moveIndex = target.moves.indexOf(move.id);
				if (move.isZ || move.flags['soultimate'] || move.flags['failencore'] || !target.moveSlots[moveIndex] || target.moveSlots[moveIndex].pp <= 0) {
					// it failed
					return false;
				}
				this.effectState.move = move.id;
				this.add('-start', target, 'Encore');
				if (!this.queue.willMove(target)) {
					this.effectState.duration++;
				}
			},
			onOverrideAction(pokemon, target, move) {
				if (move.id !== this.effectState.move) return this.effectState.move;
			},
			onResidualOrder: 16,
			onResidual(target) {
				if (!target.moves.includes(this.effectState.move) ||
					target.moveSlots[target.moves.indexOf(this.effectState.move)].pp <= 0) {
					// early termination if you run out of PP
					target.removeVolatile('encore');
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
		secondary: null,
		target: "any",
		type: "Normal",
	},
	focusenergy: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Focus Energy",
		shortDesc: "Raises the user's critical hit ratio by 2.",
		desc: "Raises the user's critical hit ratio by 2.",
		pp: 20,
		priority: 0,
		flags: {},
		volatileStatus: 'focusenergy',
		condition: {
			onStart(target, source, effect) {
				if (target.volatiles['dragoncheer']) return false;
				if (effect && (['costar', 'imposter', 'psychup', 'transform'].includes(effect.id))) {
					this.add('-start', target, 'move: Focus Energy', '[silent]');
				} else {
					this.add('-start', target, 'move: Focus Energy');
				}
			},
			onModifyCritRatio(critRatio) {
				return critRatio + 2;
			},
		},
		secondary: null,
		target: "self",
		type: "Fighting",
	},
	followme: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Follow Me",
		shortDesc: "The foes' moves target the user on the turn used.",
		desc: "The foes' moves target the user on the turn used.",
		pp: 20,
		priority: 2,
		flags: {},
		volatileStatus: 'followme',
		onTry(source) {
			return this.activePerHalf > 1;
		},
		condition: {
			duration: 1,
			onStart(target, source, effect) {
				this.add('-singleturn', target, 'move: Follow Me');
			},
			onFoeRedirectTargetPriority: 3,
			onFoeRedirectTarget(target, source, source2, move) {
				if (!this.effectState.target.isSkyDropped() && this.validTarget(this.effectState.target, source, move.target)) {
					if (move.smartTarget) move.smartTarget = false;
					this.debug("Follow Me redirected target of move");
					return this.effectState.target;
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
	haze: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Haze",
		shortDesc: "Eliminates all stat changes.",
		desc: "Eliminates all stat changes.",
		pp: 20,
		priority: 0,
		flags: {},
		onHitField() {
			this.add('-clearallboost');
			for (const pokemon of this.getAllActive()) {
				pokemon.clearBoosts();
			}
		},
		secondary: null,
		target: "all",
		type: "Ice",
	},
	helpinghand: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Helping Hand",
		shortDesc: "One ally's move power is 1.5x this turn.",
		desc: "One ally's move power is 1.5x this turn.",
		pp: 20,
		priority: 5,
		flags: {},
		volatileStatus: 'helpinghand',
		onTryHit(target) {
			if (!target.newlySwitched && !this.queue.willMove(target)) return false;
		},
		condition: {
			duration: 1,
			onStart(target, source) {
				this.effectState.multiplier = 1.5;
				this.add('-singleturn', target, 'Helping Hand', '[of] ' + source);
			},
			onRestart(target, source) {
				this.effectState.multiplier *= 1.5;
				this.add('-singleturn', target, 'Helping Hand', '[of] ' + source);
			},
			onBasePowerPriority: 10,
			onBasePower(basePower) {
				this.debug('Boosting from Helping Hand: ' + this.effectState.multiplier);
				return this.chainModify(this.effectState.multiplier);
			},
		},
		secondary: null,
		target: "adjacentAlly",
		type: "Normal",
	},
	mindreader: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Mind Reader",
		shortDesc: "The target's moves that are targeting the user will miss this turn.",
		desc: "The target's moves that are targeting the user will miss this turn. (+1 Priority)",
		pp: 5,
		priority: 1,
		flags: {},
		volatileStatus: 'mindreader',
		condition: {
			duration: 1,
			onStart(pokemon, source) {
				this.effectState.source = source;
				this.add('-message', `${pokemon.name}'s moves will miss ${source.name} this turn!`);
			},
			onAnyModifyAccuracyPriority: -1,
			onAnyModifyAccuracy(accuracy, target, source, move) {
				if (typeof accuracy !== 'number') return;
				if (source === this.effectState.target && target === this.effectState.source) {
					return 0;
				}
			},
		},
		secondary: null,
		target: "any",
		type: "Psychic",
	},
	perishsong: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Perish Song",
		shortDesc: "All active Yo-kai will faint in 3 turns.",
		desc: "All active Yo-kai will faint in 3 turns.",
		pp: 5,
		priority: 0,
		flags: {},
		onHitField(target, source, move) {
			let result = false;
			let message = false;
			for (const pokemon of this.getAllActive()) {
				if (this.runEvent('Invulnerability', pokemon, source, move) === false) {
					this.add('-miss', source, pokemon);
					result = true;
				} else if (this.runEvent('TryHit', pokemon, source, move) === null) {
					result = true;
				} else if (!pokemon.volatiles['perishsong']) {
					pokemon.addVolatile('perishsong');
					this.add('-start', pokemon, 'perish3', '[silent]');
					result = true;
					message = true;
				}
			}
			if (!result) return false;
			if (message) this.add('-fieldactivate', 'move: Perish Song');
		},
		condition: {
			duration: 4,
			onEnd(target) {
				this.add('-start', target, 'perish0');
				target.faint();
			},
			onResidualOrder: 24,
			onResidual(pokemon) {
				const duration = pokemon.volatiles['perishsong'].duration;
				this.add('-start', pokemon, 'perish' + duration);
			},
		},
		secondary: null,
		target: "all",
		type: "Normal",
	},
	playnice: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Play Nice",
		shortDesc: "Lowers the target's Strength by 1.",
		desc: "Lowers the target's Strength by 1.",
		pp: 20,
		priority: 0,
		flags: {},
		boosts: {
			atk: -1,
		},
		secondary: null,
		target: "allFoes",
		type: "Fairy",
	},
	quash: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Quash",
		shortDesc: "Forces the target to move last this turn.",
		desc: "Forces the target to move last this turn.",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		onHit(target) {
			if (this.activePerHalf === 1) return false; // fails in singles
			const action = this.queue.willMove(target);
			if (!action) return false;

			action.order = 201;
			this.add('-activate', target, 'move: Quash');
		},
		secondary: null,
		target: "any",
		type: "Dark",
	},
	quickguard: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Quick Guard",
		shortDesc: "Protects allies from priority attacks this turn.",
		desc: "Protects allies from priority attacks this turn.",
		pp: 15,
		priority: 3,
		flags: {},
		sideCondition: 'quickguard',
		onTry() {
			return !!this.queue.willAct();
		},
		onHitSide(side, source) {
			source.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onSideStart(target, source) {
				this.add('-singleturn', source, 'Quick Guard');
			},
			onTryHitPriority: 4,
			onTryHit(target, source, move) {
				// Quick Guard blocks moves with positive priority, even those given increased priority by Prankster or Gale Wings.
				// (e.g. it blocks 0 priority moves boosted by Prankster or Gale Wings; Quick Claw/Custap Berry do not count)
				if (move.priority <= 0.1) return;
				if (!move.flags['protect']) {
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				this.add('-activate', target, 'move: Quick Guard');
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
		secondary: null,
		target: "allySide",
		type: "Fighting",
	},
	ragepowder: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Rage Powder",
		shortDesc: "The foes' moves target the user on the turn used.",
		desc: "The foes' moves target the user on the turn used.",
		pp: 20,
		priority: 2,
		flags: {},
		volatileStatus: 'ragepowder',
		onTry(source) {
			return this.activePerHalf > 1;
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Rage Powder');
			},
			onFoeRedirectTargetPriority: 3,
			onFoeRedirectTarget(target, source, source2, move) {
				const ragePowderUser = this.effectState.target;
				if (ragePowderUser.isSkyDropped()) return;

				if (source.runStatusImmunity('powder') && this.validTarget(ragePowderUser, source, move.target)) {
					if (move.smartTarget) move.smartTarget = false;
					this.debug("Rage Powder redirected target of move");
					return ragePowderUser;
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Bug",
	},
	safeguard: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Safeguard",
		shortDesc: "For 5 turns, protects the user's party from negative Inspirits.",
		desc: "For 5 turns, protects the user's party from negative Inspirits.",
		pp: 5,
		priority: 0,
		flags: {},
		sideCondition: 'safeguard',
		condition: {
			duration: 5,
			onStart(side, source) {
				this.add('-sidestart', side.pokemon[0], 'move: Safeguard');
			},
			onTryAddVolatile(status, target, source, effect) {
				if (status.isInspirit === true && status.isGood === false) {
					this.add('-activate', target, 'move: Safeguard');
					return null;
				}
			},
			onEnd(side) {
				this.add('-sideend', side.pokemon[0], 'move: Safeguard');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Restoration",
	},
	soak: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Soak",
		shortDesc: "Changes the target's type to Water.",
		desc: "Changes the target's type to Water.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, allyanim: 1},
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
		target: "any",
		type: "Water",
	},
	tailwind: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Tailwind",
		shortDesc: "For 4 turns, allies' Speed is doubled.",
		desc: "For 4 turns, allies' Speed is doubled.",
		pp: 15,
		priority: 0,
		flags: {},
		sideCondition: 'tailwind',
		condition: {
			duration: 4,
			durationCallback(target, source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Tailwind');
					return 6;
				}
				return 4;
			},
			onSideStart(side, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-sidestart', side, 'move: Tailwind', '[persistent]');
				} else {
					this.add('-sidestart', side, 'move: Tailwind');
				}
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(2);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 5,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Tailwind');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Flying",
	},
	taunt: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Taunt",
		shortDesc: "Target can't use status moves its next 3 turns.",
		desc: "Target can't use status moves its next 3 turns.",
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		volatileStatus: 'taunt',
		condition: {
			duration: 3,
			onStart(target) {
				if (target.activeTurns && !this.queue.willMove(target)) {
					this.effectState.duration++;
				}
				this.add('-start', target, 'move: Taunt');
			},
			onResidualOrder: 15,
			onEnd(target) {
				this.add('-end', target, 'move: Taunt');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.moves.get(moveSlot.id);
					if (move.category === 'Status' && move.id !== 'mefirst') {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 5,
			onBeforeMove(attacker, defender, move) {
				if (!move.isZ && !move.isMax && !move.flags['soultimate'] && move.category === 'Status' && move.id !== 'mefirst') {
					this.add('cant', attacker, 'move: Taunt', move);
					return false;
				}
			},
		},
		secondary: null,
		target: "any",
		type: "Dark",
	},
	trickroom: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Trick Room",
		shortDesc: "Goes last. For 5 turns, turn order is reversed.",
		desc: "Goes last. For 5 turns, turn order is reversed. (-7 Priority)",
		pp: 5,
		priority: -7,
		flags: {},
		pseudoWeather: 'trickroom',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
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
		secondary: null,
		target: "all",
		type: "Psychic",
	},
	wideguard: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Wide Guard",
		shortDesc: "Protects allies from multi-target moves this turn.",
		desc: "Protects allies from multi-target moves this turn. Multi-target Soultimate moves instead have their damage reduced by 75%.",
		pp: 10,
		priority: 3,
		flags: {},
		sideCondition: 'wideguard',
		onTry() {
			return !!this.queue.willAct();
		},
		onHitSide(side, source) {
			source.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onSideStart(target, source) {
				this.add('-singleturn', source, 'Wide Guard');
			},
			onTryHitPriority: 4,
			onTryHit(target, source, move) {
				// Wide Guard blocks all spread moves
				if (move?.target !== 'allAdjacent' && move.target !== 'allAdjacentFoes' && move.target !== 'allFoes') {
					return;
				}
				if (move.flags['soultimate']) {
					return;
				}
				if (move.isZ || move.isMax) {
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				this.add('-activate', target, 'move: Wide Guard');
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				return this.NOT_FAIL;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.flags['soultimate'] && (move.target === 'allAdjacent' || move.target === 'allAdjacentFoes' || move.target === 'allFoes')) {
					this.add('-activate', target, 'move: Wide Guard');
					this.add('-message', `Wide Guard was unable to fully block the Soultimate attack!`);
					return this.chainModify(0.25);
				}
			},
		},
		secondary: null,
		target: "allySide",
		type: "Rock",
	},
	yawn: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Yawn",
		shortDesc: "Puts the target to sleep after 1 turn.",
		desc: "Puts the target to sleep after 1 turn.",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		volatileStatus: 'yawn',
		onTryHit(target) {
			if (target.status || !target.runStatusImmunity('slp')) {
				return false;
			}
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			duration: 2,
			onStart(target, source) {
				this.add('-start', target, 'move: Yawn', '[of] ' + source);
			},
			onResidualOrder: 23,
			onEnd(target) {
				this.add('-end', target, 'move: Yawn', '[silent]');
				target.trySetStatus('slp', this.effectState.source);
			},
		},
		secondary: null,
		target: "any",
		type: "Normal",
	},

	// Inspirits

	absence: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Absence",
		shortDesc: "Foes will instead target an adjacent ally of the affected Yo-kai when attempting to target it.",
		desc: "Foes will instead target an adjacent ally of the affected Yo-kai when attempting to target it.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'absence',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Absence');
			},
			onFoeRedirectTargetPriority: 3,
			onFoeRedirectTarget(target, source, source2, move) {
				if (target !== this.effectState.target) return;
				const allies = target.adjacentAllies();
				if (!allies.length) return;
				const ally = this.sample(allies);
				this.add('-activate', target, 'move: Absence');
				return ally;
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Absence', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	aimless: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Aimless",
		shortDesc: "Affected Yo-kai has a 33% chance to Loaf each turn.",
		desc: "Affected Yo-kai has a 33% chance to Loaf each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'aimless',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Aimless');
				if (!pokemon.volatiles['loafing']) pokemon.addVolatile('loafing');
				pokemon.volatiles['loafing'].loafChance += 33;
			},
			onEnd(pokemon) {
				if (!pokemon.volatiles['loafing']) {
					this.add('-end', pokemon, 'Aimless', '[silent]');
					return;
				}
				pokemon.volatiles['loafing'].loafChance -= 33;
				if (pokemon.volatiles['loafing'].loafChance <= 0) pokemon.removeVolatile('loafing');
				this.add('-end', pokemon, 'Aimless', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	alltalk: {
		accuracy: 60,
		basePower: 0,
		category: "Status",
		name: "All Talk",
		shortDesc: "Affected Yo-kai has a 50% chance of being unable to move each turn.",
		desc: "Affected Yo-kai has a 50% chance of being unable to move each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'alltalk',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'All Talk');
			},
			onBeforeMovePriority: 1,
			onBeforeMoveSubPriority: 2,
			onBeforeMove(pokemon, target, move) {
				if (this.randomChance(1, 2)) {
					this.add('-message', `${pokemon.name} is too busy yapping to move!`);
					return false;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'All Talk', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	amateur: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Amateur",
		shortDesc: "Halves the affected Yo-kai's Strength.",
		desc: "Halves the affected Yo-kai's Strength.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'amateur',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Amateur');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Amateur', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	armordefense: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Armor Defense",
		shortDesc: "Affected Yo-kai's Defense is 2x.",
		desc: "Affected Yo-kai's Defense is 2x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'armordefense',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Armor Defense');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(2);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Armor Defense', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	auntieslove: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Auntie's Love",
		shortDesc: "Affected Yo-kai's Defense is 1.5x and it restores 1/16 max HP each turn.",
		desc: "Affected Yo-kai's Defense is 1.5x and it restores 1/16 max HP each turn.",
		pp: 5,
		priority: 0,
		flags: {heal: 1, inspirit: 1},
		volatileStatus: 'auntieslove',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Auntie\'s Love');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(1.5);
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(Math.floor(pokemon.baseMaxhp / 16), pokemon);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Auntie\'s Love', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	awkwardness: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Awkwardness",
		shortDesc: "Halves the affected Yo-kai's Defense.",
		desc: "Halves the affected Yo-kai's Defense.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'awkwardness',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Awkwardness');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Awkwardness', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	backpain: {
		accuracy: 60,
		basePower: 0,
		category: "Status",
		name: "Back Pain",
		shortDesc: "Affected Yo-kai's Speed is halved, and it has a 50% chance of being unable to move each turn.",
		desc: "Affected Yo-kai's Speed is halved, and it has a 50% chance of being unable to move each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'backpain',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Back Pain');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.5);
			},
			onBeforeMovePriority: 1,
			onBeforeMoveSubPriority: 2,
			onBeforeMove(pokemon, target, move) {
				if (this.randomChance(1, 2)) {
					this.add('-message', `${pokemon.name}'s back hurts too much to move!`);
					return false;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Back Pain', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	badbet: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Bad Bet",
		shortDesc: "Halves the affected Yo-kai's Defense.",
		desc: "Halves the affected Yo-kai's Defense.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'badbet',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Bad Bet');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Bad Bet', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	bananapower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Banana Power",
		shortDesc: "Affected Yo-kai's Speed is 2x.",
		desc: "Affected Yo-kai's Speed is 2x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'bananapower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Banana Power');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(2);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Banana Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	bedtime: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Bedtime",
		shortDesc: "Causes the target to fall asleep.",
		desc: "Causes the target to fall asleep.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'bedtime',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Bedtime');
				pokemon.trySetStatus('slp', pokemon, 'move: Bedtime');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Bedtime', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	berserk: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Berserk",
		shortDesc: "After attacking, the affected Yo-kai will also attack an ally.",
		desc: "After attacking, the affected Yo-kai will also attack an ally.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'berserk',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Berserk');
			},
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (target.isAlly(pokemon)) return;
				const allies = pokemon.adjacentAllies();
				if (!allies.length || move.category === 'Status') return;
				const allyTarget = this.sample(allies);
				this.add('-message', `${pokemon.name} went berserk and attacked an ally!`);
				const validTargetTypes = ['normal', 'any'];
				const moveToUse = validTargetTypes.includes(move.target) ? move : this.dex.getActiveMove('bash');
				this.actions.useMove(moveToUse, pokemon, allyTarget);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Berserk', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	bias: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Bias",
		shortDesc: "Foes will instead target an adjacent ally of the affected Yo-kai when attempting to target it.",
		desc: "Foes will instead target an adjacent ally of the affected Yo-kai when attempting to target it.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'bias',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Bias');
			},
			onFoeRedirectTargetPriority: 3,
			onFoeRedirectTarget(target, source, source2, move) {
				if (target !== this.effectState.target) return;
				const allies = target.adjacentAllies();
				if (!allies.length) return;
				const ally = this.sample(allies);
				this.add('-activate', target, 'move: Bias');
				return ally;
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Bias', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	bigneedlepoke: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Big Needle Poke",
		shortDesc: "Affected Yo-kai loses 1/6 max HP each turn.",
		desc: "Affected Yo-kai loses 1/6 max HP each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'bigneedlepoke',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Big Needle Poke');
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				this.damage(Math.floor(pokemon.baseMaxhp / 6), pokemon);
				this.add('-message', `${pokemon.name} is hurt by its wound!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Big Needle Poke', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	blazingheart: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Blazing Heart",
		shortDesc: "Affected Yo-kai's Strength is raised 1 stage at the end of each turn.",
		desc: "Affected Yo-kai's Strength is raised 1 stage at the end of each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'blazingheart',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Blazing Heart');
			},
			onResidualOrder: 28,
			onResidualSubOrder: 3,
			onResidual(pokemon) {
				this.boost({atk: 1}, pokemon);
				this.add('-message', `${pokemon.name}'s heart is on fire!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Blazing Heart', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	bossiness: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Bossiness",
		shortDesc: "Foes will be forced to target the affected Yo-kai.",
		desc: "Foes will be forced to target the affected Yo-kai.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'bossiness',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Bossiness');
			},
			onFoeRedirectTargetPriority: 3,
			onFoeRedirectTarget(target, source, source2, move) {
				if (!this.effectState.target.isSkyDropped() && this.validTarget(this.effectState.target, source, move.target)) {
					if (move.smartTarget) move.smartTarget = false;
					this.debug("Bossiness redirected target of move");
					return this.effectState.target;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Bossiness', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	bratty: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Bratty",
		shortDesc: "After attacking, the affected Yo-kai will also attack an ally.",
		desc: "After attacking, the affected Yo-kai will also attack an ally.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'bratty',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Bratty');
			},
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (target.isAlly(pokemon)) return;
				const allies = pokemon.adjacentAllies();
				if (!allies.length || move.category === 'Status') return;
				const allyTarget = this.sample(allies);
				this.add('-message', `${pokemon.name} is being a brat!`);
				const validTargetTypes = ['normal', 'any'];
				const moveToUse = validTargetTypes.includes(move.target) ? move : this.dex.getActiveMove('bash');
				this.actions.useMove(moveToUse, pokemon, allyTarget);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Bratty', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	bronzepower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Bronze Power",
		shortDesc: "Affected Yo-kai's Defense is 1.5x and they take 1/2 damage from Rock.",
		desc: "Affected Yo-kai's Defense is 1.5x and they take halved damage from Rock attacks.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'bronzepower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Bronze Power');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(1.5);
			},
			onSourceModifyAtkPriority: 5,
			onSourceModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Rock') {
					return this.chainModify(0.5);
				}
			},
			onSourceModifySpAPriority: 5,
			onSourceModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Rock') {
					return this.chainModify(0.5);
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Bronze Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	burlypower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Burly Power",
		shortDesc: "Affected Yo-kai's Spirit is 1.5x.",
		desc: "Affected Yo-kai's Spirit is 1.5x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'burlypower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Burly Power');
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, pokemon) {
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Burly Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	burn: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Burn",
		shortDesc: "Burns the target.",
		desc: "Burns the target.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'burn',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Burn');
				pokemon.trySetStatus('brn', pokemon, 'move: Burn');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(2);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Burn', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	careless: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Careless",
		shortDesc: "Halves the affected Yo-kai's Defense.",
		desc: "Halves the affected Yo-kai's Defense.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'careless',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Careless');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Careless', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	castlepower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Castle Power",
		shortDesc: "Affected Yo-kai's Defense is 2x.",
		desc: "Affected Yo-kai's Defense is 2x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'castlepower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Castle Power');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(2);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Castle Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	catchcold: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Catch Cold",
		shortDesc: "Halves the affected Yo-kai's Strength, and they lose 1/16 max HP each turn.",
		desc: "Halves the affected Yo-kai's Strength, and they lose 1/16 max HP each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'catchcold',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Catch Cold');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(0.5);
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				this.damage(Math.floor(pokemon.baseMaxhp / 16), pokemon);
				this.add('-message', `${pokemon.name} can't stop sneezing!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Catch Cold', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	cavity: {
		accuracy: 60,
		basePower: 0,
		category: "Status",
		name: "Cavity",
		shortDesc: "Affected Yo-kai loses 1/4 max HP each turn.",
		desc: "Affected Yo-kai loses 1/4 max HP each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'cavity',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Cavity');
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				this.damage(Math.floor(pokemon.baseMaxhp / 4), pokemon);
				this.add('-message', `The pain from ${pokemon.name}'s cavity is unbearable!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Cavity', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	cheerfulness: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Cheerfulness",
		shortDesc: "Affected Yo-kai restores 1/8 max HP each turn.",
		desc: "Affected Yo-kai restores 1/8 max HP each turn.",
		pp: 5,
		priority: 0,
		flags: {heal: 1, inspirit: 1},
		volatileStatus: 'cheerfulness',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Cheerfulness');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(Math.floor(pokemon.baseMaxhp / 8), pokemon);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Cheerfulness', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	chills: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Chills",
		shortDesc: "Lowers affected Yo-kai's Strength by 1 on hit and at end of turn.",
		desc: "Affected Yo-kai has its Strength lowered when gaining this Inspirit and at the end of each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'chills',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Chills');
				this.boost({atk: -1}, pokemon);
			},
			onResidualOrder: 28,
			onResidualSubOrder: 3,
			onResidual(pokemon) {
				this.boost({atk: -1}, pokemon);
				this.add('-message', `${pokemon.name} can't stop shivering!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Chills', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	cicadaninjutsu: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Cicada Ninjutsu",
		shortDesc: "Affected Yo-kai's Speed is 1.5x.",
		desc: "Affected Yo-kai's Speed is 1.5x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'cicadaninjutsu',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Cicada Ninjutsu');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Cicada Ninjutsu', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	clumsiness: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Clumsiness",
		shortDesc: "Halves the affected Yo-kai's Spirit.",
		desc: "Halves the affected Yo-kai's Spirit.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'clumsiness',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Clumsiness');
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Clumsiness', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	cobaltpower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Cobalt Power",
		shortDesc: "Affected Yo-kai's Spirit is 1.5x.",
		desc: "Affected Yo-kai's Spirit is 1.5x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'cobaltpower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Cobalt Power');
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, pokemon) {
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Cobalt Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	complaints: {
		accuracy: 60,
		basePower: 0,
		category: "Status",
		name: "Complaints",
		shortDesc: "Affected Yo-kai has a 50% chance of being unable to move each turn.",
		desc: "Affected Yo-kai has a 50% chance of being unable to move each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'complaints',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Complaints');
			},
			onBeforeMovePriority: 1,
			onBeforeMoveSubPriority: 2,
			onBeforeMove(pokemon, target, move) {
				if (this.randomChance(1, 2)) {
					this.add('-message', `${pokemon.name} is too busy complaining to move!`);
					return false;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Complaints', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	confusion: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Confusion",
		shortDesc: "After attacking, the affected Yo-kai will also attack an ally.",
		desc: "After attacking, the affected Yo-kai will also attack an ally.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'confusion',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Confusion');
			},
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (target.isAlly(pokemon)) return;
				const allies = pokemon.adjacentAllies();
				if (!allies.length || move.category === 'Status') return;
				const allyTarget = this.sample(allies);
				this.add('-message', `${pokemon.name} got confused and attacked an ally!`);
				const validTargetTypes = ['normal', 'any'];
				const moveToUse = validTargetTypes.includes(move.target) ? move : this.dex.getActiveMove('bash');
				this.actions.useMove(moveToUse, pokemon, allyTarget);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Confusion', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	contrariness: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Contrariness",
		shortDesc: "After attacking, the affected Yo-kai will also attack an ally.",
		desc: "After attacking, the affected Yo-kai will also attack an ally.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'contrariness',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Contrariness');
			},
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (target.isAlly(pokemon)) return;
				const allies = pokemon.adjacentAllies();
				if (!allies.length || move.category === 'Status') return;
				const allyTarget = this.sample(allies);
				this.add('-message', `${pokemon.name} is being a contrarian!`);
				const validTargetTypes = ['normal', 'any'];
				const moveToUse = validTargetTypes.includes(move.target) ? move : this.dex.getActiveMove('bash');
				this.actions.useMove(moveToUse, pokemon, allyTarget);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Contrariness', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	cursedmirror: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Cursed Mirror",
		shortDesc: "Affected Yo-kai's Spirit is 0.3x.",
		desc: "Affected Yo-kai's Spirit is 0.3x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'cursedmirror',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Cursed Mirror');
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, pokemon) {
				return this.chainModify(0.3);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Cursed Mirror', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	cursedsword: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Cursed Sword",
		shortDesc: "Halves the affected Yo-kai's Speed.",
		desc: "Halves the affected Yo-kai's Speed.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'cursedsword',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Cursed Sword');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Cursed Sword', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	cyborgstrength: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Cyborg Strength",
		shortDesc: "Affected Yo-kai's Defense is raised 1 stage at the end of each turn.",
		desc: "Affected Yo-kai's Defense is raised 1 stage at the end of each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'cyborgstrength',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Cyborg Strength');
			},
			onResidualOrder: 28,
			onResidualSubOrder: 3,
			onResidual(pokemon) {
				this.boost({def: 1}, pokemon);
				this.add('-message', `${pokemon.name}'s body is being augmented!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Cyborg Strength', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	dadssupport: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Dad's Support",
		shortDesc: "Affected Yo-kai's Strength is 1.5x.",
		desc: "Affected Yo-kai's Strength is 1.5x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'dadssupport',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Dad\'s Support');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Dad\'s Support', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	darknesspower: {
		accuracy: 60,
		basePower: 0,
		category: "Status",
		name: "Darkness Power",
		shortDesc: "Affected Yo-kai loses 1/4 max HP each turn.",
		desc: "Affected Yo-kai loses 1/4 max HP each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'darknesspower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Darkness Power');
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				this.damage(Math.floor(pokemon.baseMaxhp / 4), pokemon);
				this.add('-message', `The darkness is smothering ${pokemon.name}!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Darkness Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	defenseless: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Defenseless",
		shortDesc: "Halves the affected Yo-kai's Defense.",
		desc: "Halves the affected Yo-kai's Defense.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'defenseless',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Defenseless');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Defenseless', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	delinquency: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Delinquency",
		shortDesc: "After attacking, the affected Yo-kai will also attack an ally.",
		desc: "After attacking, the affected Yo-kai will also attack an ally.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'delinquency',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Delinquency');
			},
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (target.isAlly(pokemon)) return;
				const allies = pokemon.adjacentAllies();
				if (!allies.length || move.category === 'Status') return;
				const allyTarget = this.sample(allies);
				this.add('-message', `${pokemon.name} is acting out!`);
				const validTargetTypes = ['normal', 'any'];
				const moveToUse = validTargetTypes.includes(move.target) ? move : this.dex.getActiveMove('bash');
				this.actions.useMove(moveToUse, pokemon, allyTarget);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Delinquency', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	demotivator: {
		accuracy: 40,
		basePower: 0,
		category: "Status",
		name: "Demotivator",
		shortDesc: "Halves the affected Yo-kai's stats.",
		desc: "Halves the affected Yo-kai's Strength, Spirit, Defense, and Speed.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'demotivator',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Demotivator');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(0.5);
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(0.5);
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, pokemon) {
				return this.chainModify(0.5);
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Demotivator', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	depression: {
		accuracy: 60,
		basePower: 0,
		category: "Status",
		name: "Depression",
		shortDesc: "Affected Yo-kai has a 50% chance to Loaf each turn.",
		desc: "Affected Yo-kai has a 50% chance to Loaf each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'depression',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Depression');
				if (!pokemon.volatiles['loafing']) pokemon.addVolatile('loafing');
				pokemon.volatiles['loafing'].loafChance += 50;
			},
			onEnd(pokemon) {
				if (!pokemon.volatiles['loafing']) {
					this.add('-end', pokemon, 'Depression', '[silent]');
					return;
				}
				pokemon.volatiles['loafing'].loafChance -= 50;
				if (pokemon.volatiles['loafing'].loafChance <= 0) pokemon.removeVolatile('loafing');
				this.add('-end', pokemon, 'Depression', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	despair: {
		accuracy: 60,
		basePower: 0,
		category: "Status",
		name: "Despair",
		shortDesc: "Affected Yo-kai has a 50% chance to Loaf each turn.",
		desc: "Affected Yo-kai has a 50% chance to Loaf each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'despair',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Despair');
				if (!pokemon.volatiles['loafing']) pokemon.addVolatile('loafing');
				pokemon.volatiles['loafing'].loafChance += 50;
			},
			onEnd(pokemon) {
				if (!pokemon.volatiles['loafing']) {
					this.add('-end', pokemon, 'Despair', '[silent]');
					return;
				}
				pokemon.volatiles['loafing'].loafChance -= 50;
				if (pokemon.volatiles['loafing'].loafChance <= 0) pokemon.removeVolatile('loafing');
				this.add('-end', pokemon, 'Despair', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	detest: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Detest",
		shortDesc: "After attacking, the affected Yo-kai will also attack an ally.",
		desc: "After attacking, the affected Yo-kai will also attack an ally.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'detest',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Detest');
			},
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (target.isAlly(pokemon)) return;
				const allies = pokemon.adjacentAllies();
				if (!allies.length || move.category === 'Status') return;
				const allyTarget = this.sample(allies);
				this.add('-message', `${pokemon.name} lashed out!`);
				const validTargetTypes = ['normal', 'any'];
				const moveToUse = validTargetTypes.includes(move.target) ? move : this.dex.getActiveMove('bash');
				this.actions.useMove(moveToUse, pokemon, allyTarget);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Detest', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	diamondpower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Diamond Power",
		shortDesc: "The affected Yo-kai's stats are 1.2x, and its Ice moves are 1.3x stronger.",
		desc: "The affected Yo-kai's Strength, Spirit, Defense, and Speed are 1.2x, and their Ice attacks are 1.3x stronger.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'diamondpower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Diamond Power');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Ice') {
					return this.chainModify(1.56);
				}
				return this.chainModify(1.2);
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(1.2);
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, attacker, defender, move) {
				if (move.type === 'Ice') {
					return this.chainModify(1.56);
				}
				return this.chainModify(1.2);
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(1.2);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Diamond Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	disclose: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Disclose",
		shortDesc: "Halves the affected Yo-kai's Defense.",
		desc: "Halves the affected Yo-kai's Defense.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'disclose',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Disclose');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Disclose', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	distrust: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Distrust",
		shortDesc: "After attacking, the affected Yo-kai will also attack an ally.",
		desc: "After attacking, the affected Yo-kai will also attack an ally.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'distrust',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Distrust');
			},
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (target.isAlly(pokemon)) return;
				const allies = pokemon.adjacentAllies();
				if (!allies.length || move.category === 'Status') return;
				const allyTarget = this.sample(allies);
				this.add('-message', `${pokemon.name} got suspicious and attacked an ally!`);
				const validTargetTypes = ['normal', 'any'];
				const moveToUse = validTargetTypes.includes(move.target) ? move : this.dex.getActiveMove('bash');
				this.actions.useMove(moveToUse, pokemon, allyTarget);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Distrust', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	divineprotection: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Divine Protection",
		shortDesc: "Affected Yo-kai's Spirit is 1.5x.",
		desc: "Affected Yo-kai's Spirit is 1.5x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'divineprotection',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Divine Protection');
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, pokemon) {
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Divine Protection', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	dragonpower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Dragon Power",
		shortDesc: "Affected Yo-kai's Strength is 1.5x.",
		desc: "Affected Yo-kai's Strength is 1.5x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'dragonpower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Dragon Power');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Dragon Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	dullness: {
		accuracy: 40,
		basePower: 0,
		category: "Status",
		name: "Dullness",
		shortDesc: "Affected Yo-kai will Loaf every turn.",
		desc: "Affected Yo-kai will Loaf every turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'dullness',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Dullness');
				if (!pokemon.volatiles['loafing']) pokemon.addVolatile('loafing');
				pokemon.volatiles['loafing'].loafChance += 100;
			},
			onEnd(pokemon) {
				if (!pokemon.volatiles['loafing']) {
					this.add('-end', pokemon, 'Dullness', '[silent]');
					return;
				}
				pokemon.volatiles['loafing'].loafChance -= 100;
				if (pokemon.volatiles['loafing'].loafChance <= 0) pokemon.removeVolatile('loafing');
				this.add('-end', pokemon, 'Dullness', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	earthhealing: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Earth Healing",
		shortDesc: "Affected Yo-kai restores 1/8 max HP each turn.",
		desc: "Affected Yo-kai restores 1/8 max HP each turn.",
		pp: 5,
		priority: 0,
		flags: {heal: 1, inspirit: 1},
		volatileStatus: 'earthhealing',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Earth Healing');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(Math.floor(pokemon.baseMaxhp / 8), pokemon);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Earth Healing', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	electrocute: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Electrocute",
		shortDesc: "Affected Yo-kai loses 1/6 max HP each turn.",
		desc: "Affected Yo-kai loses 1/6 max HP each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'electrocute',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Electrocute');
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				this.damage(Math.floor(pokemon.baseMaxhp / 6), pokemon);
				this.add('-message', `${pokemon.name} is being electrocuted!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Electrocute', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	emblaze: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Emblaze",
		shortDesc: "Affected Yo-kai's Strength is 1.5x.",
		desc: "Affected Yo-kai's Strength is 1.5x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'emblaze',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Emblaze');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Emblaze', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	emeraldpower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Emerald Power",
		shortDesc: "Affected Yo-kai's Speed is 1.5x and their Grass attacks are 1.5x stronger.",
		desc: "Affected Yo-kai's Speed is 1.5x and their Grass attacks are 1.5x stronger.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'emeraldpower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Emerald Power');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Grass') {
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, attacker, defender, move) {
				if (move.type === 'Grass') {
					return this.chainModify(1.5);
				}
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Emerald Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	enemymaker: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Enemy Maker",
		shortDesc: "After attacking, the affected Yo-kai will also attack an ally.",
		desc: "After attacking, the affected Yo-kai will also attack an ally.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'enemymaker',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Enemy Maker');
			},
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (target.isAlly(pokemon)) return;
				const allies = pokemon.adjacentAllies();
				if (!allies.length || move.category === 'Status') return;
				const allyTarget = this.sample(allies);
				this.add('-message', `${pokemon.name} is enemies with everyone!`);
				const validTargetTypes = ['normal', 'any'];
				const moveToUse = validTargetTypes.includes(move.target) ? move : this.dex.getActiveMove('bash');
				this.actions.useMove(moveToUse, pokemon, allyTarget);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Enemy Maker', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	energize: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Energize",
		shortDesc: "The affected Yo-kai's stats are 1.2x.",
		desc: "The affected Yo-kai's Strength, Spirit, Defense, and Speed are 1.2x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'energize',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Energize');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, attacker, defender, move) {
				return this.chainModify(1.2);
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(1.2);
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, attacker, defender, move) {
				return this.chainModify(1.2);
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(1.2);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Energize', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	enrage: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Enraged",
		shortDesc: "After attacking, the affected Yo-kai will also attack an ally.",
		desc: "After attacking, the affected Yo-kai will also attack an ally.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'enrage',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Enraged');
			},
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (target.isAlly(pokemon)) return;
				const allies = pokemon.adjacentAllies();
				if (!allies.length || move.category === 'Status') return;
				const allyTarget = this.sample(allies);
				this.add('-message', `${pokemon.name} is in a rage!`);
				const validTargetTypes = ['normal', 'any'];
				const moveToUse = validTargetTypes.includes(move.target) ? move : this.dex.getActiveMove('bash');
				this.actions.useMove(moveToUse, pokemon, allyTarget);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Enraged', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	enshroud: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Enshroud",
		shortDesc: "Foes will instead target an adjacent ally of the affected Yo-kai when attempting to target it.",
		desc: "Foes will instead target an adjacent ally of the affected Yo-kai when attempting to target it.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'enshroud',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Enshroud');
			},
			onFoeRedirectTargetPriority: 3,
			onFoeRedirectTarget(target, source, source2, move) {
				if (target !== this.effectState.target) return;
				const allies = target.adjacentAllies();
				if (!allies.length) return;
				const ally = this.sample(allies);
				this.add('-activate', target, 'move: Enshroud');
				return ally;
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Enshroud', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	envy: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Envy",
		shortDesc: "After attacking, the affected Yo-kai will also attack an ally.",
		desc: "After attacking, the affected Yo-kai will also attack an ally.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'envy',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Envy');
			},
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (target.isAlly(pokemon)) return;
				const allies = pokemon.adjacentAllies();
				if (!allies.length || move.category === 'Status') return;
				const allyTarget = this.sample(allies);
				this.add('-message', `${pokemon.name} got jealous and attacked an ally!`);
				const validTargetTypes = ['normal', 'any'];
				const moveToUse = validTargetTypes.includes(move.target) ? move : this.dex.getActiveMove('bash');
				this.actions.useMove(moveToUse, pokemon, allyTarget);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Envy', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	exposeweakness: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Expose Weakness",
		shortDesc: "Halves the affected Yo-kai's Defense.",
		desc: "Halves the affected Yo-kai's Defense.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'exposeweakness',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Expose Weakness');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Expose Weakness', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	facepaint: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Face Paint",
		shortDesc: "Affected Yo-kai's Defense is halved, and it gains the Ghost typing.",
		desc: "Affected Yo-kai's Defense is halved, and it gains the Ghost typing.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'facepaint',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Face Paint');
				if (pokemon.hasType('Ghost')) return;
				if (!pokemon.addType('Ghost')) return;
				this.add('-start', pokemon, 'typeadd', 'Ghost', '[from] move: Face Paint');

				if (target.side.active.length === 2 && target.position === 1) {
					// Curse Glitch
					const action = this.queue.willMove(target);
					if (action && action.move.id === 'curse') {
						action.targetLoc = -1;
					}
				}
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				if (pokemon.hasType('Ghost') && !pokemon.baseSpecies.types.includes('Ghost')) {
					pokemon.setType(pokemon.getTypes(true).filter(type => type !== 'Ghost'));
				}
				this.add('-start', pokemon, 'typechange', pokemon.getTypes().join('/'), '[from] move: Face Paint');
				this.add('-end', pokemon, 'Face Paint', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	fadeaway: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fade Away",
		shortDesc: "Foes will instead target an adjacent ally of the affected Yo-kai when attempting to target it.",
		desc: "Foes will instead target an adjacent ally of the affected Yo-kai when attempting to target it.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'fadeaway',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Fade Away');
			},
			onFoeRedirectTargetPriority: 3,
			onFoeRedirectTarget(target, source, source2, move) {
				if (target !== this.effectState.target) return;
				const allies = target.adjacentAllies();
				if (!allies.length) return;
				const ally = this.sample(allies);
				this.add('-activate', target, 'move: Fade Away');
				return ally;
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Fade Away', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	fallflat: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Fall Flat",
		shortDesc: "Affected Yo-kai loses 1/8 max HP each turn and its Accuracy is 0.25x when using Status moves.",
		desc: "Affected Yo-kai loses 1/8 max HP each turn and its Accuracy is 0.25x when using Status moves.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'fallflat',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Fall Flat');
			},
			onModifyAccuracyPriority: -1,
			onModifyAccuracy(accuracy, target, source, move) {
				if (move.category === 'Status') {
					return this.chainModify(0.25);
				}
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				this.damage(Math.floor(pokemon.baseMaxhp / 8), pokemon);
				this.add('-message', `${pokemon.name} told a joke! ...Nobody laughed.`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Fall Flat', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	falteringheart: {
		accuracy: 60,
		basePower: 0,
		category: "Status",
		name: "Faltering Heart",
		shortDesc: "Affected Yo-kai's stats are 0.8x.",
		desc: "Affected Yo-kai's Strength, Spirit, Defense, and Speed are 0.8x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'falteringheart',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Faltering Heart');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(0.8);
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(0.8);
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, pokemon) {
				return this.chainModify(0.8);
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.8);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Faltering Heart', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	feelingfine: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Feeling Fine",
		shortDesc: "The affected Yo-kai's stats are 1.2x.",
		desc: "The affected Yo-kai's Strength, Spirit, Defense, and Speed are 1.2x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'feelingfine',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Feeling Fine');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, attacker, defender, move) {
				return this.chainModify(1.2);
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(1.2);
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, attacker, defender, move) {
				return this.chainModify(1.2);
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(1.2);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Feeling Fine', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	fidgeting: {
		accuracy: 60,
		basePower: 0,
		category: "Status",
		name: "Fidgeting",
		shortDesc: "Affected Yo-kai has a 50% chance of being unable to move each turn.",
		desc: "Affected Yo-kai has a 50% chance of being unable to move each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'fidgeting',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Fidgeting');
			},
			onBeforeMovePriority: 1,
			onBeforeMoveSubPriority: 2,
			onBeforeMove(pokemon, target, move) {
				if (this.randomChance(1, 2)) {
					this.add('-message', `${pokemon.name} is shuffling in place!`);
					return false;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Fidgeting', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	fighterpower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fighter Power",
		shortDesc: "Affected Yo-kai's Strength is raised 1 stage at the end of each turn.",
		desc: "Affected Yo-kai's Strength is raised 1 stage at the end of each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'fighterpower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Fighter Power');
			},
			onResidualOrder: 28,
			onResidualSubOrder: 3,
			onResidual(pokemon) {
				this.boost({atk: 1}, pokemon);
				this.add('-message', `${pokemon.name}'s blood is pumping!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Fighter Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	fineweapon: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fine Weapon",
		shortDesc: "Affected Yo-kai's Strength is 1.5x.",
		desc: "Affected Yo-kai's Strength is 1.5x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'fineweapon',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Fine Weapon');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Fine Weapon', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	fortunate: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fortunate",
		shortDesc: "The affected Yo-kai's stats are 1.2x.",
		desc: "The affected Yo-kai's Strength, Spirit, Defense, and Speed are 1.2x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'fortunate',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Fortunate');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, attacker, defender, move) {
				return this.chainModify(1.2);
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(1.2);
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, attacker, defender, move) {
				return this.chainModify(1.2);
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(1.2);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Fortunate', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	freeze: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Freeze",
		shortDesc: "Affected Yo-kai has its Speed lowered at the end of each turn. If hit by this Inspirit again, it will be Frozen.",
		desc: "Affected Yo-kai has its Speed lowered at the end of each turn. If hit by this Inspirit again, it will be Frozen.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'freeze',
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
			if (target.volatiles['freeze']) {
				target.trySetStatus('frz', source);
				return null;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Freeze');
			},
			onResidualOrder: 28,
			onResidualSubOrder: 3,
			onResidual(pokemon) {
				this.boost({spe: -1}, pokemon);
				this.add('-message', `${pokemon.name}'s movement is getting sluggish!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Freeze', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	frenzy: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Frenzy",
		shortDesc: "After attacking, the affected Yo-kai will also attack an ally.",
		desc: "After attacking, the affected Yo-kai will also attack an ally.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'frenzy',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Frenzy');
			},
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (target.isAlly(pokemon)) return;
				const allies = pokemon.adjacentAllies();
				if (!allies.length || move.category === 'Status') return;
				const allyTarget = this.sample(allies);
				this.add('-message', `${pokemon.name} can't stop attacking!`);
				const validTargetTypes = ['normal', 'any'];
				const moveToUse = validTargetTypes.includes(move.target) ? move : this.dex.getActiveMove('bash');
				this.actions.useMove(moveToUse, pokemon, allyTarget);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Frenzy', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	frighten: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Frighten",
		shortDesc: "Affected Yo-kai will be unable to attack the source of the Inspirit.",
		desc: "Affected Yo-kai will be unable to attack the source of the Inspirit.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'frighten',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon, source) {
				this.effectState.source = source;
				this.add('-start', pokemon, 'Frighten');
			},
			onBeforeMove(pokemon, target, move) {
				if (target === this.effectState.source) {
					this.add('-message', `${pokemon.name} is too frightened to attack ${this.effectState.source.name}!`);
					return false;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Frighten', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	frozensolid: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Frozen Solid",
		shortDesc: "Halves the affected Yo-kai's Strength. If hit by this Inspirit again, it will be Frozen.",
		desc: "Halves the affected Yo-kai's Strength. If hit by this Inspirit again, it will be Frozen.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'frozensolid',
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
			if (target.volatiles['freeze']) {
				target.trySetStatus('frz', source);
				return null;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Frozen Solid');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Frozen Solid', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	fullofsighs: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Full of Sighs",
		shortDesc: "Lowers affected Yo-kai's Strength by 1 on hit and at end of turn.",
		desc: "Affected Yo-kai has its Strength lowered when gaining this Inspirit and at the end of each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'fullofsighs',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Full of Sighs');
				this.boost({atk: -1}, pokemon);
			},
			onResidualOrder: 28,
			onResidualSubOrder: 3,
			onResidual(pokemon) {
				this.boost({atk: -1}, pokemon);
				this.add('-message', `${pokemon.name} is losing interest in the battle!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Full of Sighs', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	funkydance: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Funky Dance",
		shortDesc: "Lowers affected Yo-kai's Defense by 1 on hit and at end of turn.",
		desc: "Affected Yo-kai has its Defense lowered when gaining this Inspirit and at the end of each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'funkydance',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Funky Dance');
				this.boost({def: -1}, pokemon);
			},
			onResidualOrder: 28,
			onResidualSubOrder: 3,
			onResidual(pokemon) {
				this.boost({def: -1}, pokemon);
				this.add('-message', `${pokemon.name} is doing a strange dance!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Funky Dance', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	generousheart: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Generous Heart",
		shortDesc: "The affected Yo-kai's stats are 1.2x.",
		desc: "The affected Yo-kai's Strength, Spirit, Defense, and Speed are 1.2x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'generousheart',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Generous Heart');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, attacker, defender, move) {
				return this.chainModify(1.2);
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(1.2);
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, attacker, defender, move) {
				return this.chainModify(1.2);
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(1.2);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Generous Heart', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	gildedpower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Gilded Power",
		shortDesc: "Affected Yo-kai's Defense is 1.5x and they cannot be critical hit.",
		desc: "Affected Yo-kai's Defense is 1.5x and they cannot be critical hit.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'gildedpower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Gilded Power');
			},
			onCriticalHit(pokemon, source, move) {
				return false;
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Gilded Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	goldpower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Gold Power",
		shortDesc: "Affected Yo-kai's Defense is 1.5x and they take 1/2 damage from Electric.",
		desc: "Affected Yo-kai's Defense is 1.5x and they take halved damage from Electric attacks.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'goldpower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Gold Power');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(1.5);
			},
			onSourceModifyAtkPriority: 5,
			onSourceModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Electric') {
					return this.chainModify(0.5);
				}
			},
			onSourceModifySpAPriority: 5,
			onSourceModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Electric') {
					return this.chainModify(0.5);
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Gold Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	gluttony: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Gluttony",
		shortDesc: "Affected Yo-kai loses 1/8 max HP each turn and will steal positive Inspirits from its allies.",
		desc: "Affected Yo-kai loses 1/8 max HP each turn and will steal positive Inspirits from its allies.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'gluttony',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Gluttony');
			},
			onAnyTryAddVolatile(status, target, source, effect) {
				const pokemon = this.effectState.target;
				if (target !== pokemon && target.isAlly(pokemon) && !target.hasAbility('mine', 'stealing') && !['gluttony', 'stinginess'].some(v => target.volatiles[v]) && status.isInspirit === true && status.isGood === true) {
					this.add('-activate', this.effectState.target, 'move: Gluttony');
					pokemon.addVolatile(status.id);
					this.add('-message', `${pokemon.name} stole the Inspirit!`);
					return null;
				}
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				this.damage(Math.floor(pokemon.baseMaxhp / 8), pokemon);
				this.add('-message', `${pokemon.name}'s stomach is growling!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Gluttony', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	guide: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Guide",
		shortDesc: "Foes will be forced to target the affected Yo-kai.",
		desc: "Foes will be forced to target the affected Yo-kai.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'guide',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Guide');
			},
			onFoeRedirectTargetPriority: 3,
			onFoeRedirectTarget(target, source, source2, move) {
				if (!this.effectState.target.isSkyDropped() && this.validTarget(this.effectState.target, source, move.target)) {
					if (move.smartTarget) move.smartTarget = false;
					this.debug("Guide redirected target of move");
					return this.effectState.target;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Guide', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	gutsiness: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Gutsiness",
		shortDesc: "Affected Yo-kai's Speed is 1.5x.",
		desc: "Affected Yo-kai's Speed is 1.5x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'gutsiness',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Gutsiness');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Gutsiness', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	hateful: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Hateful",
		shortDesc: "After attacking, the affected Yo-kai will also attack an ally.",
		desc: "After attacking, the affected Yo-kai will also attack an ally.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'hateful',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Hateful');
			},
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (target.isAlly(pokemon)) return;
				const allies = pokemon.adjacentAllies();
				if (!allies.length || move.category === 'Status') return;
				const allyTarget = this.sample(allies);
				this.add('-message', `${pokemon.name} lashed out!`);
				const validTargetTypes = ['normal', 'any'];
				const moveToUse = validTargetTypes.includes(move.target) ? move : this.dex.getActiveMove('bash');
				this.actions.useMove(moveToUse, pokemon, allyTarget);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Hateful', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	hazepower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Haze Power",
		shortDesc: "Affected Yo-kai's Speed is 1.5x.",
		desc: "Affected Yo-kai's Speed is 1.5x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'hazepower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Haze Power');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Haze Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	headache: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Headache",
		shortDesc: "Affected Yo-kai loses 1/8 max HP each turn, and an additional 1/4 max HP when using a Head move.",
		desc: "Affected Yo-kai loses 1/8 max HP each turn, and an additional 1/4 max HP when using a Head move.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'headache',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Headache');
			},
			onAfterMove(pokemon, target, move) {
				if (move.flags['head']) {
					this.damage(Math.floor(pokemon.baseMaxhp / 4), pokemon);
					this.add('-message', `${pokemon.name}'s head is pounding!`);
				}
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				this.damage(Math.floor(pokemon.baseMaxhp / 8), pokemon);
				this.add('-message', `${pokemon.name}'s head is throbbing!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Headache', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	healingair: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Healing Air",
		shortDesc: "Affected Yo-kai restores 1/8 max HP each turn.",
		desc: "Affected Yo-kai restores 1/8 max HP each turn.",
		pp: 5,
		priority: 0,
		flags: {heal: 1, inspirit: 1},
		volatileStatus: 'healingair',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Healing Air');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(Math.floor(pokemon.baseMaxhp / 8), pokemon);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Healing Air', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	healthywakame: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Healthy Wakame",
		shortDesc: "Affected Yo-kai's Strength is 2x.",
		desc: "Affected Yo-kai's Strength is 2x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'healthywakame',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Healthy Wakame');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(2);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Healthy Wakame', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	heartofawarrior: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Heart of a Warrior",
		shortDesc: "Affected Yo-kai's Strength is raised 1 stage at the end of each turn.",
		desc: "Affected Yo-kai's Strength is raised 1 stage at the end of each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'heartofawarrior',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Heart of a Warrior');
			},
			onResidualOrder: 28,
			onResidualSubOrder: 3,
			onResidual(pokemon) {
				this.boost({atk: 1}, pokemon);
				this.add('-message', `${pokemon.name}'s blood is pumping!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Heart of a Warrior', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	heartsroar: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Heart's Roar",
		shortDesc: "Affected Yo-kai's Speed is raised 1 stage at the end of each turn.",
		desc: "Affected Yo-kai's Speed is raised 1 stage at the end of each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'heartsroar',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Heart\'s Roar');
			},
			onResidualOrder: 28,
			onResidualSubOrder: 3,
			onResidual(pokemon) {
				this.boost({spe: 1}, pokemon);
				this.add('-message', `${pokemon.name} roars proudly!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Heart\'s Roar', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	helmetdefense: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Helmet Defense",
		shortDesc: "Affected Yo-kai's Defense is 2x.",
		desc: "Affected Yo-kai's Defense is 2x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'helmetdefense',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Helmet Defense');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(2);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Helmet Defense', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	holysword: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Holy Sword",
		shortDesc: "Affected Yo-kai's Strength is 1.5x.",
		desc: "Affected Yo-kai's Strength is 1.5x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'holysword',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Holy Sword');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Holy Sword', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	illusionpower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Illusion Power",
		shortDesc: "Affected Yo-kai's Spirit is 1.5x.",
		desc: "Affected Yo-kai's Spirit is 1.5x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'illusionpower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Illusion Power');
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, pokemon) {
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Illusion Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	insecurity: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Insecurity",
		shortDesc: "After attacking, the affected Yo-kai will also attack an ally.",
		desc: "After attacking, the affected Yo-kai will also attack an ally.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'insecurity',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Insecurity');
			},
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (target.isAlly(pokemon)) return;
				const allies = pokemon.adjacentAllies();
				if (!allies.length || move.category === 'Status') return;
				const allyTarget = this.sample(allies);
				this.add('-message', `${pokemon.name} lashed out!`);
				const validTargetTypes = ['normal', 'any'];
				const moveToUse = validTargetTypes.includes(move.target) ? move : this.dex.getActiveMove('bash');
				this.actions.useMove(moveToUse, pokemon, allyTarget);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Insecurity', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	insomnia: {
		accuracy: 60,
		basePower: 0,
		category: "Status",
		name: "Insomnia",
		shortDesc: "Affected Yo-kai's stats are 0.7x, and it cannot fall asleep.",
		desc: "Affected Yo-kai's Strength, Spirit, Defense, and Speed are 0.7x, and it cannot fall asleep..",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'insomnia',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Insomnia');
			},
			onUpdate(pokemon) {
				if (pokemon.status === 'slp') {
					this.add('-activate', pokemon, 'move: Insomnia');
					pokemon.cureStatus();
				}
			},
			onSetStatus(status, target, source, effect) {
				if (status.id !== 'slp') return;
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] move: Insomnia');
				}
				return false;
			},
			onTryAddVolatile(status, target) {
				if (status.id === 'yawn') {
					this.add('-immune', target, '[from] move: Insomnia');
					return null;
				}
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(0.7);
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(0.7);
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, pokemon) {
				return this.chainModify(0.7);
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.7);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Insomnia', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	itchy: {
		accuracy: 60,
		basePower: 0,
		category: "Status",
		name: "Itchy",
		shortDesc: "Affected Yo-kai loses 1/6 max HP each turn.",
		desc: "Affected Yo-kai loses 1/6 max HP each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'itchy',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Itchy');
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				this.damage(Math.floor(pokemon.baseMaxhp / 6), pokemon);
				this.add('-message', `${pokemon.name} can't stop scratching!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Itchy', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	jealousy: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Jealousy",
		shortDesc: "After attacking, the affected Yo-kai will also attack an ally.",
		desc: "After attacking, the affected Yo-kai will also attack an ally.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'jealousy',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Jealousy');
			},
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (target.isAlly(pokemon)) return;
				const allies = pokemon.adjacentAllies();
				if (!allies.length || move.category === 'Status') return;
				const allyTarget = this.sample(allies);
				this.add('-message', `${pokemon.name} got jealous and attacked an ally!`);
				const validTargetTypes = ['normal', 'any'];
				const moveToUse = validTargetTypes.includes(move.target) ? move : this.dex.getActiveMove('bash');
				this.actions.useMove(moveToUse, pokemon, allyTarget);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Jealousy', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	kabukifun: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Kabuki Fun",
		shortDesc: "Affected Yo-kai's Strength is 1.5x.",
		desc: "Affected Yo-kai's Strength is 1.5x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'kabukifun',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Kabuki Fun');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Kabuki Fun', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	keepchatting: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Keep Chatting",
		shortDesc: "Halves the affected Yo-kai's Speed.",
		desc: "Halves the affected Yo-kai's Speed.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'keepchatting',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Keep Chatting');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Keep Chatting', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	knightscurse: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Knight's Curse",
		shortDesc: "Halves the affected Yo-kai's Spirit.",
		desc: "Halves the affected Yo-kai's Spirit.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'knightscurse',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Knight\'s Curse');
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Knight\'s Curse', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	kombuenergy: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Kombu Energy",
		shortDesc: "Affected Yo-kai's Defense is 2x.",
		desc: "Affected Yo-kai's Defense is 2x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'kombuenergy',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Kombu Energy');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(2);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Kombu Energy', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	laziness: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Laziness",
		shortDesc: "Lowers affected Yo-kai's Strength by 1 on hit and at end of turn.",
		desc: "Affected Yo-kai has its Strength lowered when gaining this Inspirit and at the end of each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'laziness',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Laziness');
				this.boost({atk: -1}, pokemon);
			},
			onResidualOrder: 28,
			onResidualSubOrder: 3,
			onResidual(pokemon) {
				this.boost({atk: -1}, pokemon);
				this.add('-message', `${pokemon.name} is slacking off!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Laziness', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	legendpowerd: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Legend Power D",
		shortDesc: "Affected Yo-kai's Defense is 3x.",
		desc: "Affected Yo-kai's Defense is 3x.",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'legendpowerd',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Legend Power D');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(3);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Legend Power D', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	legendpowers: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Legend Power S",
		shortDesc: "Affected Yo-kai's Strength is 2.5x.",
		desc: "Affected Yo-kai's Strength is 2.5x.",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'legendpowers',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Legend Power S');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(2.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Legend Power S', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	lifeisgood: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Life is Good",
		shortDesc: "Affected Yo-kai restores 1/8 max HP each turn.",
		desc: "Affected Yo-kai restores 1/8 max HP each turn.",
		pp: 5,
		priority: 0,
		flags: {heal: 1, inspirit: 1},
		volatileStatus: 'lifeisgood',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Life is Good');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(Math.floor(pokemon.baseMaxhp / 8), pokemon);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Life is Good', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	lionspride: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Lion's Pride",
		shortDesc: "Affected Yo-kai's Defense is raised 1 stage at the end of each turn.",
		desc: "Affected Yo-kai's Defense is raised 1 stage at the end of each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'lionspride',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Lion\'s Pride');
			},
			onResidualOrder: 28,
			onResidualSubOrder: 3,
			onResidual(pokemon) {
				this.boost({def: 1}, pokemon);
				this.add('-message', `${pokemon.name}'s confidence is growing!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Lion\'s Pride', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	livenup: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Liven Up",
		shortDesc: "Affected Yo-kai's Spirit is 1.5x and it restores 1/16 max HP each turn.",
		desc: "Affected Yo-kai's Spirit is 1.5x and it restores 1/16 max HP at the end of each turn.",
		pp: 5,
		priority: 0,
		flags: {heal: 1, inspirit: 1},
		volatileStatus: 'livenup',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Liven Up');
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, pokemon) {
				return this.chainModify(1.5);
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(Math.floor(pokemon.baseMaxhp / 16), pokemon);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Liven Up', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	loitering: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Loitering",
		shortDesc: "Affected Yo-kai has a 33% chance to Loaf each turn.",
		desc: "Affected Yo-kai has a 33% chance to Loaf each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'loitering',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Loitering');
				if (!pokemon.volatiles['loafing']) pokemon.addVolatile('loafing');
				pokemon.volatiles['loafing'].loafChance += 33;
			},
			onEnd(pokemon) {
				if (!pokemon.volatiles['loafing']) {
					this.add('-end', pokemon, 'Loitering', '[silent]');
					return;
				}
				pokemon.volatiles['loafing'].loafChance -= 33;
				if (pokemon.volatiles['loafing'].loafChance <= 0) pokemon.removeVolatile('loafing');
				this.add('-end', pokemon, 'Loitering', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	luckssmile: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Luck's Smile",
		shortDesc: "Affected Yo-kai restores 1/8 max HP each turn, and their crit rate is raised by 1.",
		desc: "Affected Yo-kai restores 1/8 max HP each turn, and their critical hit ratio is raised by 1.",
		pp: 5,
		priority: 0,
		flags: {heal: 1, inspirit: 1},
		volatileStatus: 'luckssmile',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Luck\'s Smile');
			},
			onModifyCritRatio(critRatio) {
				return critRatio + 1;
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(Math.floor(pokemon.baseMaxhp / 8), pokemon);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Luck\'s Smile', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	luckystreak: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Lucky Streak",
		shortDesc: "Affected Yo-kai restores 1/8 max HP each turn, and their crit rate is raised by 1.",
		desc: "Affected Yo-kai restores 1/8 max HP each turn, and their critical hit ratio is raised by 1.",
		pp: 5,
		priority: 0,
		flags: {heal: 1, inspirit: 1},
		volatileStatus: 'luckystreak',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Lucky Streak');
			},
			onModifyCritRatio(critRatio) {
				return critRatio + 1;
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(Math.floor(pokemon.baseMaxhp / 8), pokemon);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Lucky Streak', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	machismo: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Machismo",
		shortDesc: "Affected Yo-kai's Strength is 2x.",
		desc: "Affected Yo-kai's Strength is 2x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'machismo',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Machismo');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(2);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Machismo', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	makeover: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Makeover",
		shortDesc: "Foes will be forced to target the affected Yo-kai.",
		desc: "Foes will be forced to target the affected Yo-kai.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'makeover',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Makeover');
			},
			onFoeRedirectTargetPriority: 3,
			onFoeRedirectTarget(target, source, source2, move) {
				if (!this.effectState.target.isSkyDropped() && this.validTarget(this.effectState.target, source, move.target)) {
					if (move.smartTarget) move.smartTarget = false;
					this.debug("Makeover redirected target of move");
					return this.effectState.target;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Makeover', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	mamaswarmth: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Mama's Warmth",
		shortDesc: "Affected Yo-kai restores 1/8 max HP each turn.",
		desc: "Affected Yo-kai restores 1/8 max HP each turn.",
		pp: 5,
		priority: 0,
		flags: {heal: 1, inspirit: 1},
		volatileStatus: 'mamaswarmth',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Mama\'s Warmth');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(Math.floor(pokemon.baseMaxhp / 8), pokemon);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Mama\'s Warmth', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	memoryeater: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Memory Eater",
		shortDesc: "After attacking, the affected Yo-kai will also attack an ally.",
		desc: "After attacking, the affected Yo-kai will also attack an ally.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'memoryeater',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Memory Eater');
			},
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (target.isAlly(pokemon)) return;
				const allies = pokemon.adjacentAllies();
				if (!allies.length || move.category === 'Status') return;
				const allyTarget = this.sample(allies);
				this.add('-message', `${pokemon.name} forgot who its allies are!`);
				const validTargetTypes = ['normal', 'any'];
				const moveToUse = validTargetTypes.includes(move.target) ? move : this.dex.getActiveMove('bash');
				this.actions.useMove(moveToUse, pokemon, allyTarget);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Memory Eater', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	miracleblossom: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Miracle Blossom",
		shortDesc: "Affected Yo-kai's Speed is 3x.",
		desc: "Affected Yo-kai's Speed is 3x.",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'miracleblossom',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Miracle Blossom');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(3);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Miracle Blossom', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	mirrorpower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Mirror Power",
		shortDesc: "Affected Yo-kai's Spirit is 1.5x.",
		desc: "Affected Yo-kai's Spirit is 1.5x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'mirrorpower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Mirror Power');
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, pokemon) {
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Mirror Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	mochipower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Mochi Power",
		shortDesc: "Affected Yo-kai's Strength is 2x.",
		desc: "Affected Yo-kai's Strength is 2x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'mochipower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Mochi Power');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(2);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Mochi Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	musclehead: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Musclehead",
		shortDesc: "After attacking, the affected Yo-kai will also attack an ally.",
		desc: "After attacking, the affected Yo-kai will also attack an ally.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'musclehead',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Musclehead');
			},
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (target.isAlly(pokemon)) return;
				const allies = pokemon.adjacentAllies();
				if (!allies.length || move.category === 'Status') return;
				const allyTarget = this.sample(allies);
				this.add('-message', `${pokemon.name} attacked an ally!`);
				const validTargetTypes = ['normal', 'any'];
				const moveToUse = validTargetTypes.includes(move.target) ? move : this.dex.getActiveMove('bash');
				this.actions.useMove(moveToUse, pokemon, allyTarget);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Musclehead', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	mysteriouspower: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Mysterious Power",
		shortDesc: "Halves the affected Yo-kai's Spirit.",
		desc: "Halves the affected Yo-kai's Spirit.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'mysteriouspower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Mysterious Power');
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Mysterious Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	naptime: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Nap Time",
		shortDesc: "Affected Yo-kai has a 33% chance to Loaf each turn.",
		desc: "Affected Yo-kai has a 33% chance to Loaf each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'naptime',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Nap Time');
				if (!pokemon.volatiles['loafing']) pokemon.addVolatile('loafing');
				pokemon.volatiles['loafing'].loafChance += 33;
			},
			onEnd(pokemon) {
				if (!pokemon.volatiles['loafing']) {
					this.add('-end', pokemon, 'Nap Time', '[silent]');
					return;
				}
				pokemon.volatiles['loafing'].loafChance -= 33;
				if (pokemon.volatiles['loafing'].loafChance <= 0) pokemon.removeVolatile('loafing');
				this.add('-end', pokemon, 'Nap Time', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	needlepoke: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Needle Poke",
		shortDesc: "Affected Yo-kai loses 1/8 max HP each turn.",
		desc: "Affected Yo-kai loses 1/8 max HP each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'needlepoke',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Needle Poke');
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				this.damage(Math.floor(pokemon.baseMaxhp / 8), pokemon);
				this.add('-message', `${pokemon.name} is hurt by its wound!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Needle Poke', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	negasuswaves: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Negasus Waves",
		shortDesc: "After attacking, the affected Yo-kai will also attack an ally.",
		desc: "After attacking, the affected Yo-kai will also attack an ally.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'negasuswaves',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Negasus Waves');
			},
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (target.isAlly(pokemon)) return;
				const allies = pokemon.adjacentAllies();
				if (!allies.length || move.category === 'Status') return;
				const allyTarget = this.sample(allies);
				this.add('-message', `${pokemon.name} is being influenced!`);
				const validTargetTypes = ['normal', 'any'];
				const moveToUse = validTargetTypes.includes(move.target) ? move : this.dex.getActiveMove('bash');
				this.actions.useMove(moveToUse, pokemon, allyTarget);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Negasus Waves', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	negativize: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Negativize",
		shortDesc: "Affected Yokai's Speed is 0.3x.",
		desc: "Affected Yokai's Speed is 0.3x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'negativize',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Negativize');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.3);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Negativize', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	neighingcurse: {
		accuracy: 40,
		basePower: 0,
		category: "Status",
		name: "Neighing Curse",
		shortDesc: "Halves the affected Yo-kai's stats.",
		desc: "Halves the affected Yo-kai's Strength, Spirit, Defense, and Speed.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'neighingcurse',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Neighing Curse');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(0.5);
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(0.5);
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, pokemon) {
				return this.chainModify(0.5);
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Neighing Curse', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	nosebleed: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Nosebleed",
		shortDesc: "Halves the affected Yo-kai's Speed, and they lose 1/8 max HP each turn.",
		desc: "Halves the affected Yo-kai's Speed, and they lose 1/8 max HP each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'nosebleed',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Nosebleed');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.5);
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				this.damage(Math.floor(pokemon.baseMaxhp / 8), pokemon);
				this.add('-message', `${pokemon.name}'s nose is bleeding uncontrollably'!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Nosebleed', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	numbify: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Numbify",
		shortDesc: "Halves the affected Yo-kai's Defense.",
		desc: "Halves the affected Yo-kai's Defense.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'numbify',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Numbify');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Numbify', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	oceanpower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Ocean Power",
		shortDesc: "The affected Yo-kai's stats are 1.2x.",
		desc: "The affected Yo-kai's Strength, Spirit, Defense, and Speed are 1.2x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'oceanpower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Ocean Power');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, attacker, defender, move) {
				return this.chainModify(1.2);
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(1.2);
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, attacker, defender, move) {
				return this.chainModify(1.2);
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(1.2);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Ocean Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	onipower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Oni Power",
		shortDesc: "Affected Yo-kai's Defense is 2x.",
		desc: "Affected Yo-kai's Defense is 2x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'onipower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Oni Power');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(2);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Oni Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	optimism: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Optimism",
		shortDesc: "Affected Yo-kai restores 1/8 max HP each turn.",
		desc: "Affected Yo-kai restores 1/8 max HP each turn.",
		pp: 5,
		priority: 0,
		flags: {heal: 1, inspirit: 1},
		volatileStatus: 'optimism',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Optimism');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(Math.floor(pokemon.baseMaxhp / 8), pokemon);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Optimism', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	overcast: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Overcast",
		shortDesc: "Halves the affected Yo-kai's Strength.",
		desc: "Halves the affected Yo-kai's Strength.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'overcast',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Overcast');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Overcast', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	pandacuteness: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Panda Cuteness",
		shortDesc: "Affected Yo-kai restores 1/8 max HP each turn.",
		desc: "Affected Yo-kai restores 1/8 max HP each turn.",
		pp: 5,
		priority: 0,
		flags: {heal: 1, inspirit: 1},
		volatileStatus: 'pandacuteness',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Panda Cuteness');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(Math.floor(pokemon.baseMaxhp / 8), pokemon);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Panda Cuteness', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	paralyze: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Paralyze",
		shortDesc: "Paralyzes the target.",
		desc: "Paralyzes the target.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'paralyze',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Paralyze');
				pokemon.trySetStatus('par', pokemon, 'move: Paralyze');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Paralyze', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	peerlesspower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Peerless Power",
		shortDesc: "Affected Yo-kai's Strength is 2x.",
		desc: "Affected Yo-kai's Strength is 2x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'peerlesspower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Peerless Power');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(2);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Peerless Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	perseverence: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Perseverence",
		shortDesc: "Affected Yo-kai's Defense is raised 1 stage at the end of each turn.",
		desc: "Affected Yo-kai's Defense is raised 1 stage at the end of each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'perseverence',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Perseverence');
			},
			onResidualOrder: 28,
			onResidualSubOrder: 3,
			onResidual(pokemon) {
				this.boost({def: 1}, pokemon);
				this.add('-message', `${pokemon.name} is pushing through!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Perseverence', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	pessimism: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Pessimism",
		shortDesc: "Halves the affected Yo-kai's Speed.",
		desc: "Halves the affected Yo-kai's Speed.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'pessimism',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Pessimism');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Pessimism', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	pitvipervenom: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Pit Viper Venom",
		shortDesc: "Halves the affected Yo-kai's Speed and Poisons it.",
		desc: "Halves the affected Yo-kai's Speed and Poisons it.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'pitvipervenom',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Pit Viper Venom');
				pokemon.trySetStatus('psn', pokemon, 'move: Pit Viper Venom');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Pit Viper Venom', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	platinumpower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Platinum Power",
		shortDesc: "Affected Yo-kai takes halved damage from Elemental attacks.",
		desc: "Affected Yo-kai takes halved damage from Elemental attacks.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'platinumpower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Platinum Power');
			},
			onSourceModifyAtkPriority: 5,
			onSourceModifyAtk(atk, attacker, defender, move) {
				if (attacker.hasAbility('penetrate') && attacker.element === move.type) {
					return this.chainModify(0.5);
				}
			},
			onSourceModifySpAPriority: 5,
			onSourceModifySpA(atk, attacker, defender, move) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Platinum Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	playfulness: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Playfulness",
		shortDesc: "Affected Yo-kai's Strength is 1.5x.",
		desc: "Affected Yo-kai's Strength is 1.5x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'playfulness',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Playfulness');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Playfulness', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	popularize: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Popularize",
		shortDesc: "Foes will be forced to target the affected Yo-kai.",
		desc: "Foes will be forced to target the affected Yo-kai.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'popularize',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Popularize');
			},
			onFoeRedirectTargetPriority: 3,
			onFoeRedirectTarget(target, source, source2, move) {
				if (!this.effectState.target.isSkyDropped() && this.validTarget(this.effectState.target, source, move.target)) {
					if (move.smartTarget) move.smartTarget = false;
					this.debug("Popularize redirected target of move");
					return this.effectState.target;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Popularize', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	poverty: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Poverty",
		shortDesc: "Affected Yo-kai uses an additional PP when moving.",
		desc: "Affected Yo-kai uses an additional PP when moving.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'poverty',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Poverty');
			},
			onDeductPP(target, source) {
				return 1;
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Poverty', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	powerofsong: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Power of Song",
		shortDesc: "Affected Yo-kai's Spirit is 1.5x.",
		desc: "Affected Yo-kai's Spirit is 1.5x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'powerofsong',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Power of Song');
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, pokemon) {
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Power of Song', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	pruned: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Pruned",
		shortDesc: "Halves the affected Yo-kai's Defense.",
		desc: "Halves the affected Yo-kai's Defense.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'pruned',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Pruned');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Pruned', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	radicalninjutsu: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Radical Ninjutsu",
		shortDesc: "Affected Yo-kai's Speed is 3x.",
		desc: "Affected Yo-kai's Speed is 3x.",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'radicalninjutsu',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Radical Ninjutsu');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(3);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Radical Ninjutsu', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	rebelsoul: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Rebel Soul",
		shortDesc: "Halves the affected Yo-kai's Defense.",
		desc: "Halves the affected Yo-kai's Defense.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'rebelsoul',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Rebel Soul');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Rebel Soul', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	refusal: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Refusal",
		shortDesc: "Affected Yo-kai has a 33% chance to Loaf each turn.",
		desc: "Affected Yo-kai has a 33% chance to Loaf each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'refusal',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Refusal');
				if (!pokemon.volatiles['loafing']) pokemon.addVolatile('loafing');
				pokemon.volatiles['loafing'].loafChance += 33;
			},
			onEnd(pokemon) {
				if (!pokemon.volatiles['loafing']) {
					this.add('-end', pokemon, 'Refusal', '[silent]');
					return;
				}
				pokemon.volatiles['loafing'].loafChance -= 33;
				if (pokemon.volatiles['loafing'].loafChance <= 0) pokemon.removeVolatile('loafing');
				this.add('-end', pokemon, 'Refusal', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	rhinopower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Rhino Power",
		shortDesc: "Affected Yo-kai's Strength is 1.5x.",
		desc: "Affected Yo-kai's Strength is 1.5x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'rhinopower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Rhino Power');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Rhino Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	riceskindness: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Rice's Kindness",
		shortDesc: "Affected Yo-kai restores 1/8 max HP each turn.",
		desc: "Affected Yo-kai restores 1/8 max HP each turn.",
		pp: 5,
		priority: 0,
		flags: {heal: 1, inspirit: 1},
		volatileStatus: 'riceskindness',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Rice\'s Kindness');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(Math.floor(pokemon.baseMaxhp / 8), pokemon);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Rice\'s Kindness', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	rubypower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Ruby Power",
		shortDesc: "Affected Yo-kai's Strength is 1.5x and their Fire attacks are 1.3x stronger.",
		desc: "Affected Yo-kai's Strength is 1.5x and their Fire attacks are 1.3x stronger.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'rubypower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Ruby Power');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Fire') {
					return this.chainModify(1.95);
				}
				return this.chainModify(1.5);
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, attacker, defender, move) {
				if (move.type === 'Fire') {
					return this.chainModify(1.3);
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Ruby Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	runnynose: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Runny Nose",
		shortDesc: "Affected Yo-kai's Speed is halved, and it has a 33% chance of being unable to move each turn.",
		desc: "Affected Yo-kai's Speed is halved, and it has a 33% chance of being unable to move each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'runnynose',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Runny Nose');
			},
			onBeforeMovePriority: 1,
			onBeforeMoveSubPriority: 2,
			onBeforeMove(pokemon, target, move) {
				if (this.randomChance(33, 100)) {
					this.add('-message', `${pokemon.name} is blowing its nose!`);
					return false;
				}
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Runny Nose', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	samuraispirit: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Samurai Spirit",
		shortDesc: "Affected Yo-kai's Strength is raised 1 stage at the end of each turn.",
		desc: "Affected Yo-kai's Strength is raised 1 stage at the end of each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'samuraispirit',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Samurai Spirit');
			},
			onResidualOrder: 28,
			onResidualSubOrder: 3,
			onResidual(pokemon) {
				this.boost({atk: 1}, pokemon);
				this.add('-message', `${pokemon.name} is overflowing with power!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Samurai Spirit', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	sapphirepower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Sapphire Power",
		shortDesc: "Affected Yo-kai's Spirit is 1.5x and their Water attacks are 1.3x stronger.",
		desc: "Affected Yo-kai's Spirit is 1.5x and their Water attacks are 1.3x stronger.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'sapphirepower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Sapphire Power');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Water') {
					return this.chainModify(1.3);
				}
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, attacker, defender, move) {
				if (move.type === 'Water') {
					return this.chainModify(1.95);
				}
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Sapphire Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	scaredycat: {
		accuracy: 60,
		basePower: 0,
		category: "Status",
		name: "Scaredy-Cat",
		shortDesc: "Affected Yo-kai has a 50% chance of being unable to move each turn.",
		desc: "Affected Yo-kai has a 50% chance of being unable to move each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'scaredycat',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Scaredy-Cat');
			},
			onBeforeMovePriority: 1,
			onBeforeMoveSubPriority: 2,
			onBeforeMove(pokemon, target, move) {
				if (this.randomChance(1, 2)) {
					this.add('-message', `${pokemon.name} is too afraid to move!`);
					return false;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Scaredy-Cat', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	serpentspower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Serpent's Power",
		shortDesc: "Affected Yo-kai's Speed is 1.5x.",
		desc: "Affected Yo-kai's Speed is 1.5x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'serpentspower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Serpent\'s Power');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Serpent\'s Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	shaking: {
		accuracy: 60,
		basePower: 0,
		category: "Status",
		name: "Shaking",
		shortDesc: "Affected Yo-kai has a 50% chance of being unable to move each turn.",
		desc: "Affected Yo-kai has a 50% chance of being unable to move each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'shaking',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Shaking');
			},
			onBeforeMovePriority: 1,
			onBeforeMoveSubPriority: 2,
			onBeforeMove(pokemon, target, move) {
				if (this.randomChance(1, 2)) {
					this.add('-message', `${pokemon.name} is shaking too hard to move!`);
					return false;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Shaking', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	shoulderpain: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Shoulder Pain",
		shortDesc: "Affected Yo-kai loses 1/8 max HP each turn, and physical attacks targeting them will always crit.",
		desc: "Affected Yo-kai loses 1/8 max HP each turn, and physical attacks targeting them will always critical hit.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'shoulderpain',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Shoulder Pain');
			},
			onModifyCritRatio(critRatio, source, target, move) {
				if (move.category === 'Physical') return 5;
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				this.damage(Math.floor(pokemon.baseMaxhp / 8), pokemon);
				this.add('-message', `${pokemon.name}'s shoulders are aching!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Shoulder Pain', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	shivers: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Shivers",
		shortDesc: "Halves the affected Yo-kai's Spirit.",
		desc: "Halves the affected Yo-kai's Spirit.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'shivers',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Shivers');
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Shivers', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	shutaway: {
		accuracy: 60,
		basePower: 0,
		category: "Status",
		name: "Shut Away",
		shortDesc: "Affected Yo-kai has a 50% chance to Loaf each turn.",
		desc: "Affected Yo-kai has a 50% chance to Loaf each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'shutaway',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Shut Away');
				if (!pokemon.volatiles['loafing']) pokemon.addVolatile('loafing');
				pokemon.volatiles['loafing'].loafChance += 50;
			},
			onEnd(pokemon) {
				if (!pokemon.volatiles['loafing']) {
					this.add('-end', pokemon, 'Shut Away', '[silent]');
					return;
				}
				pokemon.volatiles['loafing'].loafChance -= 50;
				if (pokemon.volatiles['loafing'].loafChance <= 0) pokemon.removeVolatile('loafing');
				this.add('-end', pokemon, 'Shut Away', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	sidesplitter: {
		accuracy: 60,
		basePower: 0,
		category: "Status",
		name: "Side Splitter",
		shortDesc: "Affected Yo-kai has a 50% chance of being unable to move each turn.",
		desc: "Affected Yo-kai has a 50% chance of being unable to move each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'sidesplitter',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Side Splitter');
			},
			onBeforeMovePriority: 1,
			onBeforeMoveSubPriority: 2,
			onBeforeMove(pokemon, target, move) {
				if (this.randomChance(1, 2)) {
					this.add('-message', `${pokemon.name} is laughing too hard to move!`);
					return false;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Side Splitter', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	silverpower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Silver Power",
		shortDesc: "Affected Yo-kai's Defense is 1.5x and they take 1/2 damage from Ice.",
		desc: "Affected Yo-kai's Defense is 1.5x and they take halved damage from Ice attacks.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'silverpower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Silver Power');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(1.5);
			},
			onSourceModifyAtkPriority: 5,
			onSourceModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Ice') {
					return this.chainModify(0.5);
				}
			},
			onSourceModifySpAPriority: 5,
			onSourceModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Ice') {
					return this.chainModify(0.5);
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Silver Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	skipabeat: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Skip a Beat",
		shortDesc: "Affected Yo-kai restores 1/8 max HP each turn.",
		desc: "Affected Yo-kai restores 1/8 max HP each turn.",
		pp: 5,
		priority: 0,
		flags: {heal: 1, inspirit: 1},
		volatileStatus: 'skipabeat',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Skip a Beat');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(Math.floor(pokemon.baseMaxhp / 8), pokemon);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Skip a Beat', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	slipperymekabu: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Slippery Mekabu",
		shortDesc: "Affected Yo-kai's Speed is 2x.",
		desc: "Affected Yo-kai's Speed is 2x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'slipperymekabu',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Slippery Mekabu');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(2);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Slippery Mekabu', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	slowdown: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Slow Down",
		shortDesc: "Paralyzes the target.",
		desc: "Paralyzes the target.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'slowdown',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Slow Down');
				pokemon.trySetStatus('par', pokemon, 'move: Slow Down');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Slow Down', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	snatch: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Snatch",
		shortDesc: "After attacking, the affected Yo-kai will also attack an ally.",
		desc: "After attacking, the affected Yo-kai will also attack an ally.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'snatch',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Snatch');
			},
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (target.isAlly(pokemon)) return;
				const allies = pokemon.adjacentAllies();
				if (!allies.length || move.category === 'Status') return;
				const allyTarget = this.sample(allies);
				this.add('-message', `${pokemon.name} tried to steal from an ally!`);
				const validTargetTypes = ['normal', 'any'];
				const moveToUse = validTargetTypes.includes(move.target) ? move : this.dex.getActiveMove('bash');
				this.actions.useMove(moveToUse, pokemon, allyTarget);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Snatch', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	sogenerous: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "So Generous",
		shortDesc: "Affected Yo-kai will heal foes it targets by 1/5 max HP before dealing damage.",
		desc: "Affected Yo-kai will heal foes it targets by 1/5 max HP before dealing damage.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'sogenerous',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'So Generous');
			},
			onBeforeMove(pokemon, target, move) {
				if (move.category !== 'Status' && !target.isAlly(pokemon)) {
					this.heal(Math.floor(target.baseMaxhp / 5), target, pokemon);
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'So Generous', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	sorethroat: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Sore Throat",
		shortDesc: "Affected Yo-kai loses 1/8 max HP each turn.",
		desc: "Affected Yo-kai loses 1/8 max HP each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'sorethroat',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Sore Throat');
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				this.damage(Math.floor(pokemon.baseMaxhp / 8), pokemon);
				this.add('-message', `${pokemon.name}'s throat is sore!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Sore Throat', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	stagpower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Stag Power",
		shortDesc: "Affected Yo-kai's Strength is 1.5x.",
		desc: "Affected Yo-kai's Strength is 1.5x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'stagpower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Stag Power');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Stag Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	starve: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Starve",
		shortDesc: "Halves the affected Yo-kai's Strength, and it loses 1/8 max HP each turn.",
		desc: "AHalves the affected Yo-kai's Strength, and it loses 1/8 max HP each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'starve',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Starve');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(0.5);
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				this.damage(Math.floor(pokemon.baseMaxhp / 8), pokemon);
				this.add('-message', `${pokemon.name} is starving!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Starve', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	steelpower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Steel Power",
		shortDesc: "Affected Yo-kai's Defense is 1.5x and they cannot be critical hit.",
		desc: "Affected Yo-kai's Defense is 1.5x and they cannot be critical hit.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'steelpower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Steel Power');
			},
			onCriticalHit(pokemon, source, move) {
				return false;
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Steel Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	stinginess: {
		accuracy: 60,
		basePower: 0,
		category: "Status",
		name: "Stinginess",
		shortDesc: "After attacking, the affected Yo-kai will also attack an ally. It will also steal its teammates' positive Inspirits for itself.",
		desc: "After attacking, the affected Yo-kai will also attack an ally. It will also steal its teammates' positive Inspirits for itself.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'stinginess',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Stinginess');
			},
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (target.isAlly(pokemon)) return;
				const allies = pokemon.adjacentAllies();
				if (!allies.length || move.category === 'Status') return;
				const allyTarget = this.sample(allies);
				this.add('-message', `${pokemon.name} is lashing out!`);
				const validTargetTypes = ['normal', 'any'];
				const moveToUse = validTargetTypes.includes(move.target) ? move : this.dex.getActiveMove('bash');
				this.actions.useMove(moveToUse, pokemon, allyTarget);
			},
			onAnyTryAddVolatile(status, target, source, effect) {
				const pokemon = this.effectState.target;
				if (target !== pokemon && target.isAlly(pokemon) && !target.hasAbility('mine', 'stealing') && !['gluttony', 'stinginess'].some(v => target.volatiles[v]) && status.isInspirit === true && status.isGood === true) {
					this.add('-activate', this.effectState.target, 'move: Stinginess');
					pokemon.addVolatile(status.id);
					this.add('-message', `${pokemon.name} stole the Inspirit!`);
					return null;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Stinginess', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	stinkup: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Stink Up",
		shortDesc: "Affected Yo-kai is Poisoned, and loses 1/8 max HP each turn.",
		desc: "Affected Yo-kai is Poisoned, and loses 1/8 max HP each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'stinkup',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Stink Up');
				pokemon.trySetStatus('psn', pokemon, 'move: Stink Up');
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				this.damage(Math.floor(pokemon.baseMaxhp / 8), pokemon);
				this.add('-message', `${pokemon.name} is choking on foul-smelling gas!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Stink Up', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	stygiancurse: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Stygian Curse",
		shortDesc: "Affected Yo-kai's Spirit is 0.3x.",
		desc: "Affected Yo-kai's Spirit is 0.3x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'stygiancurse',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Stygian Curse');
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, pokemon) {
				return this.chainModify(0.3);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Stygian Curse', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	styxscurse: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Styx's Curse",
		shortDesc: "Halves the affected Yo-kai's Spirit.",
		desc: "Halves the affected Yo-kai's Spirit.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'styxscurse',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Styx\'s Curse');
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Styx\'s Curse', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	sulky: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Sulky",
		shortDesc: "After attacking, the affected Yo-kai will also attack an ally.",
		desc: "After attacking, the affected Yo-kai will also attack an ally.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'sulky',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Sulky');
			},
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (target.isAlly(pokemon)) return;
				const allies = pokemon.adjacentAllies();
				if (!allies.length || move.category === 'Status') return;
				const allyTarget = this.sample(allies);
				this.add('-message', `${pokemon.name} is sulking. It attacked an ally!`);
				const validTargetTypes = ['normal', 'any'];
				const moveToUse = validTargetTypes.includes(move.target) ? move : this.dex.getActiveMove('bash');
				this.actions.useMove(moveToUse, pokemon, allyTarget);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Sulky', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	surfpower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Surf Power",
		shortDesc: "Affected Yo-kai's Speed is 2x.",
		desc: "Affected Yo-kai's Speed is 2x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'surfpower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Surf Power');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(2);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Surf Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	sweetdreams: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Sweet Dreams",
		shortDesc: "Affected Yo-kai restores 1/8 max HP each turn.",
		desc: "Affected Yo-kai restores 1/8 max HP each turn.",
		pp: 5,
		priority: 0,
		flags: {heal: 1, inspirit: 1},
		volatileStatus: 'sweetdreams',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Sweet Dreams');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(Math.floor(pokemon.baseMaxhp / 8), pokemon);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Sweet Dreams', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	tengud: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Tengu'd",
		shortDesc: "Foes will be forced to target the affected Yo-kai.",
		desc: "Foes will be forced to target the affected Yo-kai.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'tengud',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Tengu\'d');
			},
			onFoeRedirectTargetPriority: 3,
			onFoeRedirectTarget(target, source, source2, move) {
				if (!this.effectState.target.isSkyDropped() && this.validTarget(this.effectState.target, source, move.target)) {
					if (move.smartTarget) move.smartTarget = false;
					this.debug("Tengu'd redirected target of move");
					return this.effectState.target;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Tengu\'d', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	tigerpower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Tiger Power",
		shortDesc: "Affected Yo-kai's Speed is 1.5x.",
		desc: "Affected Yo-kai's Speed is 1.5x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'tigerpower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Tiger Power');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Tiger Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	topazpower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Topaz Power",
		shortDesc: "Affected Yo-kai's Defense is 1.5x and their Electric attacks are 1.5x stronger.",
		desc: "Affected Yo-kai's Defense is 1.5x and their Electric attacks are 1.5x stronger.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'topazpower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Topaz Power');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Electric') {
					return this.chainModify(1.5);
				}
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(1.5);
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, attacker, defender, move) {
				if (move.type === 'Electric') {
					return this.chainModify(1.5);
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Topaz Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	torrentpower: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Torrent Power",
		shortDesc: "Affected Yo-kai's Spirit is raised 1 stage at the end of each turn.",
		desc: "Affected Yo-kai's Spirit is raised 1 stage at the end of each turn.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'torrentpower',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Torrent Power');
			},
			onResidualOrder: 28,
			onResidualSubOrder: 3,
			onResidual(pokemon) {
				this.boost({spa: 1}, pokemon);
				this.add('-message', `${pokemon.name} is entering a flow state!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Torrent Power', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	trickery: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Trickery",
		shortDesc: "After attacking, the affected Yo-kai will also attack an ally.",
		desc: "After attacking, the affected Yo-kai will also attack an ally.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'trickery',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Trickery');
			},
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (target.isAlly(pokemon)) return;
				const allies = pokemon.adjacentAllies();
				if (!allies.length || move.category === 'Status') return;
				const allyTarget = this.sample(allies);
				this.add('-message', `${pokemon.name} was fooled into attacking an ally!`);
				const validTargetTypes = ['normal', 'any'];
				const moveToUse = validTargetTypes.includes(move.target) ? move : this.dex.getActiveMove('bash');
				this.actions.useMove(moveToUse, pokemon, allyTarget);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Trickery', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	unclesshout: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Uncle's Shout",
		shortDesc: "Affected Yo-kai's Strength is 2x.",
		desc: "Affected Yo-kai's Strength is 2x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'unclesshout',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Uncle\'s Shout');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(2);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Uncle\'s Shout', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	unpopularize: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Unpopularize",
		shortDesc: "Foes will instead target an adjacent ally of the affected Yo-kai when attempting to target it.",
		desc: "Foes will instead target an adjacent ally of the affected Yo-kai when attempting to target it.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'unpopularize',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Unpopularize');
			},
			onFoeRedirectTargetPriority: 3,
			onFoeRedirectTarget(target, source, source2, move) {
				if (target !== this.effectState.target) return;
				const allies = target.adjacentAllies();
				if (!allies.length) return;
				const ally = this.sample(allies);
				this.add('-activate', target, 'move: Unpopularize');
				return ally;
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Unpopularize', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	venoctsblessing: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Venoct's Blessing",
		shortDesc: "Affected Yo-kai's Speed is 2x.",
		desc: "Affected Yo-kai's Speed is 2x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1},
		volatileStatus: 'venoctsblessing',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Venoct\'s Blessing');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(2);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Venoct\'s Blessing', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	volcanicblessing: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Volcanic Blessing",
		shortDesc: "Affected Yo-kai restores 1/8 max HP each turn.",
		desc: "Affected Yo-kai restores 1/8 max HP each turn.",
		pp: 5,
		priority: 0,
		flags: {heal: 1, inspirit: 1},
		volatileStatus: 'volcanicblessing',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Volcanic Blessing');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(Math.floor(pokemon.baseMaxhp / 8), pokemon);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Volcanic Blessing', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	wanderlust: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Wanderlust",
		shortDesc: "Halves the affected Yo-kai's Defense.",
		desc: "Halves the affected Yo-kai's Defense.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'wanderlust',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Wanderlust');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Wanderlust', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	wastefulness: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Wastefulness",
		shortDesc: "Affected Yo-kai will heal foes it targets by 1/5 max HP before dealing damage.",
		desc: "Affected Yo-kai will heal foes it targets by 1/5 max HP before dealing damage.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'wastefulness',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Wastefulness');
			},
			onBeforeMove(pokemon, target, move) {
				if (move.category !== 'Status' && !target.isAlly(pokemon)) {
					this.heal(Math.floor(target.baseMaxhp / 5), target, pokemon);
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Wastefulness', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	wrinkles: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Wrinkles",
		shortDesc: "Halves the affected Yo-kai's Defense.",
		desc: "Halves the affected Yo-kai's Defense.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'wrinkles',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Wrinkles');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Wrinkles', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	youthdrain: {
		accuracy: 60,
		basePower: 0,
		category: "Status",
		name: "Youth Drain",
		shortDesc: "Affected Yo-kai's stats are 0.8x.",
		desc: "Affected Yo-kai's Strength, Spirit, Defense, and Speed are 0.8x.",
		pp: 5,
		priority: 0,
		flags: {inspirit: 1, protect: 1},
		volatileStatus: 'youthdrain',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Poison Powder', target);
		},
		onTryHit(target, source, move) {
			// anyFoe replacement
			if (target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Youth Drain');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(0.8);
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(0.8);
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, pokemon) {
				return this.chainModify(0.8);
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.8);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Youth Drain', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},

	// Soultimates

	'999blades': {
		accuracy: 100,
		basePower: 18,
		category: "Physical",
		name: "999 Blades",
		shortDesc: "Hits 9 times.",
		desc: "Hits 9 times.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Dance', target);
			this.add('-anim', source, 'Tachyon Cutter', target);
		},
		multihit: 9,
		secondary: null,
		target: "allFoes",
		type: "Steel",
	},
	afathersscorn: {
		accuracy: 100,
		basePower: 165,
		category: "Special",
		name: "A Father's Scorn",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Catastropika', target);
		},
		secondary: null,
		target: "allFoes",
		type: "Electric",
	},
	amotherslove: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "A Mother's Love",
		shortDesc: "Affected Yo-kai restore 1/5 max HP each turn.",
		desc: "Affected Yo-kai restore 1/5 max HP each turn.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {heal: 1, inspirit: 1, soultimate: 1},
		volatileStatus: 'amotherslove',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'A Mother\'s Love');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(Math.floor(pokemon.baseMaxhp / 5), pokemon);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'A Mother\'s Love', '[silent]');
			},
		},
		secondary: null,
		target: "allies",
		type: "Inspirit",
	},
	abodaballad: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Abodaballad",
		shortDesc: "Taunts and Torments affected Yo-kai.",
		desc: "Taunts and Torments affected Yo-kai.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'abodaballad',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Hyper Voice', target);
			this.add('-anim', source, 'Poison Powder', target);
		},
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Abodaballad');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.moves.get(moveSlot.id);
					if (pokemon.lastMove && pokemon.lastMove.id !== 'struggle') pokemon.disableMove(pokemon.lastMove.id);
					if (move.category === 'Status' && move.id !== 'mefirst') {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 5,
			onBeforeMove(attacker, defender, move) {
				if (!move.isZ && !move.isMax && !move.flags['soultimate'] && move.category === 'Status' && move.id !== 'mefirst') {
					this.add('cant', attacker, 'move: Abodaballad', move);
					return false;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Abodaballad', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Dark",
	},
	airofhappiness: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Air of Happiness",
		shortDesc: "Affected Yo-kai restore 1/5 max HP each turn.",
		desc: "Affected Yo-kai restore 1/5 max HP each turn.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {heal: 1, inspirit: 1, soultimate: 1},
		volatileStatus: 'airofhappiness',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Air of Happiness');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(Math.floor(pokemon.baseMaxhp / 5), pokemon);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Air of Happiness', '[silent]');
			},
		},
		secondary: null,
		target: "allies",
		type: "Inspirit",
	},
	arcticabyss: {
		accuracy: 100,
		basePower: 250,
		category: "Special",
		name: "Arctic Abyss",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Subzero Slammer', target);
		},
		secondary: null,
		target: "allFoes",
		type: "Ice",
	}, // animations stopping point
	awfullyawkward: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Awfully Awkward",
		shortDesc: "Halves the Speed of affected Yo-kai.",
		desc: "Halves the Speed of affected Yo-kai.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'awfullyawkward',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Awfully Awkward');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Awfully Awkward', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Flying",
	},
	'b3nk1gun': {
		accuracy: 75,
		basePower: 19,
		category: "Physical",
		name: "B3-NK1 Gun",
		shortDesc: "Hits 9 times. High critical hit ratio.",
		desc: "Hits 9 times. High critical hit ratio.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		critRatio: 2,
		multihit: 9,
		secondary: null,
		target: "allFoes",
		type: "Electric",
	},
	babbleblast: {
		accuracy: 100,
		basePower: 180,
		category: "Physical",
		name: "Babbleblast",
		shortDesc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		desc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		volatileStatus: 'soultimateblocked',
		onHit(target, source, move) {
			target.soultimateCharge = Math.max(0, target.soultimateCharge - 3);
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-message', `${pokemon.name}'s Soultimate was disrupted!`);
			},
			onBeforeMovePriority: 4,
			onBeforeMove(pokemon, target, move) {
				if (move.flags['soultimate']) {
					this.add('-message', `${pokemon.name} can't use its Soultimate!`);
					return false;
				}
			},
		},
		secondary: null,
		target: "any",
		type: "Normal",
	},
	backachebuster: {
		accuracy: 100,
		basePower: 225,
		category: "Physical",
		name: "Backache Buster",
		shortDesc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		desc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {head: 1, protect: 1, soultimate: 1},
		volatileStatus: 'soultimateblocked',
		onHit(target, source, move) {
			target.soultimateCharge = Math.max(0, target.soultimateCharge - 3);
		},
		secondary: null,
		target: "any",
		type: "Fighting",
	},
	bacteriabarrage: {
		accuracy: 100,
		basePower: 160,
		category: "Physical",
		name: "Bacteria Barrage",
		shortDesc: "Affected Yo-kai lose 1/8 max HP each turn.",
		desc: "Affected Yo-kai lose 1/8 max HP each turn.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'bacteriabarrage',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Bacteria Barrage');
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				this.damage(Math.floor(pokemon.baseMaxhp / 8), pokemon);
				this.add('-message', `${pokemon.name}'s teeth are falling out!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Bacteria Barrage', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Dark",
	},
	badgerbite: {
		accuracy: 100,
		basePower: 37,
		category: "Physical",
		name: "Badger Bite",
		shortDesc: "Hits 5 times.",
		desc: "Hits 5 times.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		multihit: 5,
		secondary: null,
		target: "allFoes",
		type: "Normal",
	},
	bananasplat: {
		accuracy: 100,
		basePower: 240,
		category: "Physical",
		name: "Banana Splat",
		shortDesc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		desc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		volatileStatus: 'soultimateblocked',
		onHit(target, source, move) {
			target.soultimateCharge = Math.max(0, target.soultimateCharge - 3);
		},
		secondary: null,
		target: "any",
		type: "Grass",
	},
	bankbreaker: {
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		name: "Bank Breaker",
		shortDesc: "Affected Yo-kai will heal foes they target by 1/5 max HP before dealing damage.",
		desc: "Affected Yo-kai will heal foes they target by 1/5 max HP before dealing damage.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'bankbreaker',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Bank Breaker');
			},
			onBeforeMove(pokemon, target, move) {
				if (move.category !== 'Status' && !target.isAlly(pokemon)) {
					this.heal(Math.floor(target.baseMaxhp / 5), target, pokemon);
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Bank Breaker', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Steel",
	},
	barricadeblock: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Barricade Block",
		shortDesc: "User's Defense is 2x and foes are forced to target it.",
		desc: "User's Defense is 2x and foes are forced to target it.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, soultimate: 1},
		volatileStatus: 'barricadeblock',
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Barricade Block');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(2);
			},
			onFoeRedirectTargetPriority: 3,
			onFoeRedirectTarget(target, source, source2, move) {
				if (!this.effectState.target.isSkyDropped() && this.validTarget(this.effectState.target, source, move.target)) {
					if (move.smartTarget) move.smartTarget = false;
					this.debug("Barricade Block redirected target of move");
					return this.effectState.target;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Barricade Block', '[silent]');
			},
		},
		secondary: null,
		target: "self",
		type: "Inspirit",
	},
	beautybeam: {
		accuracy: 100,
		basePower: 195,
		category: "Special",
		name: "Beauty Beam",
		shortDesc: "Heals user and allies for 25% of the damage dealt.",
		desc: "Heals user and allies for 25% of the damage dealt, split evenly between all targets.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {heal: 1, protect: 1, soultimate: 1},
		onDamagingHit(damage, target, source, move) {
			const recipients = source.alliesAndSelf().filter(p => !p.fainted);
			const healAmount = Math.floor(damage * 0.25 / recipients.length);
			for (const recipient of recipients) {
				this.heal(healAmount, recipient, source);
			}
		},
		secondary: null,
		target: "allFoes",
		type: "Drain",
	},
	belfreeblues: {
		accuracy: 100,
		basePower: 150,
		category: "Physical",
		name: "Belfree Blues",
		shortDesc: "Taunts and Torments affected Yo-kai.",
		desc: "Taunts and Torments affected Yo-kai.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'belfreeblues',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Belfree Blues');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.moves.get(moveSlot.id);
					if (pokemon.lastMove && pokemon.lastMove.id !== 'struggle') pokemon.disableMove(pokemon.lastMove.id);
					if (move.category === 'Status' && move.id !== 'mefirst') {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 5,
			onBeforeMove(attacker, defender, move) {
				if (!move.isZ && !move.isMax && !move.flags['soultimate'] && move.category === 'Status' && move.id !== 'mefirst') {
					this.add('cant', attacker, 'move: Belfree Blues', move);
					return false;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Belfree Blues', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Dark",
	},
	bestacular: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Bestacular",
		shortDesc: "Heals the user and its allies a ton.",
		desc: "Heals the user and its allies according to the following formula: Healing = (165 * (User's Spirit / 2)) / 100.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {heal: 1, soultimate: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Recover', target);
		},
		onHit(target, source, move) {
			const healing = Math.floor((165 * Math.floor(source.getStat('spa') / 2)) / 100);
			this.heal(healing, target, source);
		},
		secondary: null,
		target: "allies",
		type: "Restoration",
	},
	bigpincers: {
		accuracy: 100,
		basePower: 200,
		category: "Physical",
		name: "Big Pincers",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {head: 1, protect: 1, soultimate: 1},
		secondary: null,
		target: "any",
		type: "Bug",
	},
	bigmouth: {
		accuracy: 100,
		basePower: 33,
		category: "Physical",
		name: "Bigmouth",
		shortDesc: "Hits 5 times.",
		desc: "Hits 5 times.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		multihit: 5,
		secondary: null,
		target: "allFoes",
		type: "Electric",
	},
	blazingfist: {
		accuracy: 100,
		basePower: 175,
		category: "Special",
		name: "Blazing Fist",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Fire",
	},
	blazingtyphoon: {
		accuracy: 100,
		basePower: 200,
		category: "Special",
		name: "Blazing Typhoon",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Fire",
	},
	bluekiss: {
		accuracy: 100,
		basePower: 155,
		category: "Special",
		name: "Blue Kiss",
		shortDesc: "Heals user and allies for 25% of the damage dealt.",
		desc: "Heals user and allies for 25% of the damage dealt, split evenly between all targets.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {heal: 1, protect: 1, soultimate: 1},
		onDamagingHit(damage, target, source, move) {
			const recipients = source.alliesAndSelf().filter(p => !p.fainted);
			const healAmount = Math.floor(damage * 0.25 / recipients.length);
			for (const recipient of recipients) {
				this.heal(healAmount, recipient, source);
			}
		},
		secondary: null,
		target: "allFoes",
		type: "Drain",
	},
	boastfulbomber: {
		accuracy: 75,
		basePower: 230,
		category: "Physical",
		name: "Boastful Bomber",
		shortDesc: "High critical hit ratio.",
		desc: "High critical hit ratio.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		critRatio: 2,
		secondary: null,
		target: "any",
		type: "Fire",
	},
	bodaciousslash: {
		accuracy: 100,
		basePower: 195,
		category: "Special",
		name: "Bodacious Slash",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Water",
	},
	boldakazam: {
		accuracy: 100,
		basePower: 140,
		category: "Physical",
		name: "Boldakazam",
		shortDesc: "Affected Yo-kai lose 1/8 max HP each turn.",
		desc: "Affected Yo-kai lose 1/8 max HP each turn.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'boldakazam',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Boldakazam');
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				this.damage(Math.floor(pokemon.baseMaxhp / 8), pokemon);
				this.add('-message', `${pokemon.name} was hurt by uh magic or something idk man`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Boldakazam', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Dark",
	},
	bonitoblade: {
		accuracy: 100,
		basePower: 22,
		category: "Physical",
		name: "Bonito Blade",
		shortDesc: "Hits 10 times.",
		desc: "Hits 10 times.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		multihit: 10,
		secondary: null,
		target: "allFoes",
		type: "Flying",
	},
	boohooblast: {
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		name: "Boohoo Blast",
		shortDesc: "Halves the Speed of affected Yo-kai.",
		desc: "Halves the Speed of affected Yo-kai.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'boohooblast',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Boohoo Blast');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Boohoo Blast', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Flying",
	},
	brutalbuttbat: {
		accuracy: 75,
		basePower: 270,
		category: "Physical",
		name: "Brutal Butt Bat",
		shortDesc: "High critical hit ratio.",
		desc: "High critical hit ratio.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		critRatio: 2,
		secondary: null,
		target: "allFoes",
		type: "Dark",
	},
	burningbuster: {
		accuracy: 100,
		basePower: 240,
		category: "Physical",
		name: "Burning Buster",
		shortDesc: "Has 25% recoil.",
		desc: "Has 25% recoil.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {head: 1, protect: 1, soultimate: 1},
		recoil: [1, 4],
		secondary: null,
		target: "any",
		type: "Fighting",
	},
	cmonthisway: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "C'mon, This Way!",
		shortDesc: "User's Defense is 3x and foes are forced to target it.",
		desc: "User's Defense is 3x and foes are forced to target it.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, soultimate: 1},
		volatileStatus: 'cmonthisway',
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'C\'mon, This Way!');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(3);
			},
			onFoeRedirectTargetPriority: 3,
			onFoeRedirectTarget(target, source, source2, move) {
				if (!this.effectState.target.isSkyDropped() && this.validTarget(this.effectState.target, source, move.target)) {
					if (move.smartTarget) move.smartTarget = false;
					this.debug("C'mon, This Way! redirected target of move");
					return this.effectState.target;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'C\'mon, This Way!', '[silent]');
			},
		},
		secondary: null,
		target: "self",
		type: "Inspirit",
	},
	carefreehero: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Carefree Hero",
		shortDesc: "100% chance to Confuse.",
		desc: "100% chance to Confuse.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: {
			chance: 100,
			volatileStatus: 'confusion',
		},
		target: "allFoes",
		type: "Normal",
	},
	cicadacut: {
		accuracy: 100,
		basePower: 17,
		category: "Physical",
		name: "Cicada Cut",
		shortDesc: "Hits 5 times.",
		desc: "Hits 5 times.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		multihit: 5,
		secondary: null,
		target: "allFoes",
		type: "Bug",
	},
	contrarygas: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Contrary Gas",
		shortDesc: "After attacking, affected Yo-kai will also attack an ally.",
		desc: "After attacking, affected Yo-kai will also attack an ally.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'contrarygas',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Contrary Gas');
			},
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (target.isAlly(pokemon)) return;
				const allies = pokemon.adjacentAllies();
				if (!allies.length || move.category === 'Status') return;
				const allyTarget = this.sample(allies);
				this.add('-message', `${pokemon.name} is being a contrarian!`);
				const validTargetTypes = ['normal', 'any'];
				const moveToUse = validTargetTypes.includes(move.target) ? move : this.dex.getActiveMove('bash');
				this.actions.useMove(moveToUse, pokemon, allyTarget);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Contrary Gas', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Inspirit",
	},
	crazylightning: {
		accuracy: 100,
		basePower: 180,
		category: "Special",
		name: "Crazy Lightning",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Electric",
	},
	creepncut: {
		accuracy: 100,
		basePower: 240,
		category: "Physical",
		name: "Creep 'n' Cut",
		shortDesc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		desc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		volatileStatus: 'soultimateblocked',
		onHit(target, source, move) {
			target.soultimateCharge = Math.max(0, target.soultimateCharge - 3);
		},
		secondary: null,
		target: "any",
		type: "Ghost",
	},
	creepysuperbite: {
		accuracy: 100,
		basePower: 18,
		category: "Physical",
		name: "Creepy Superbite",
		shortDesc: "Hits 5 times.",
		desc: "Hits 5 times.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		multihit: 5,
		secondary: null,
		target: "allFoes",
		type: "Normal",
	},
	croakingprayer: {
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		name: "Croaking Prayer",
		shortDesc: "Affected Yo-kai have a 33% chance to Loaf each turn.",
		desc: "Affected Yo-kai have a 33% chance to Loaf each turn.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'croakingprayer',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Croaking Prayer');
				if (!pokemon.volatiles['loafing']) pokemon.addVolatile('loafing');
				pokemon.volatiles['loafing'].loafChance += 33;
			},
			onEnd(pokemon) {
				if (!pokemon.volatiles['loafing']) {
					this.add('-end', pokemon, 'Croaking Prayer', '[silent]');
					return;
				}
				pokemon.volatiles['loafing'].loafChance -= 33;
				if (pokemon.volatiles['loafing'].loafChance <= 0) pokemon.removeVolatile('loafing');
				this.add('-end', pokemon, 'Croaking Prayer', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Normal",
	},
	cutiepaws: {
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		name: "Cutie Paws",
		shortDesc: "Hits 10 times.",
		desc: "Hits 10 times.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		multihit: 10,
		secondary: null,
		target: "allFoes",
		type: "Grass",
	},
	darkhorse: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Dark Horse",
		shortDesc: "Affected Yo-kai's Defense is 0.3x.",
		desc: "Affected Yo-kai's Defense is 0.3x.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'darkhorse',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Dark Horse');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(0.3);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Dark Horse', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Inspirit",
	},
	darkworld: {
		accuracy: 100,
		basePower: 155,
		category: "Special",
		name: "Dark World",
		shortDesc: "This move's type changes to a random Element when dealing damage.",
		desc: "This move's type changes to a random Element when dealing damage.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		onModifyMove(move, pokemon) {
			const elements = ['Fire', 'Water', 'Electric', 'Rock', 'Ice', 'Flying', 'Drain'];
			move.type = this.sample(elements);
		},
		secondary: null,
		target: "allFoes",
		type: "Dark",
	},
	daydream: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Daydream",
		shortDesc: "Restores 100 HP to all allies. Affected Yo-kai restore 1/8 HP each turn.",
		desc: "Restores 100 HP to all allies. Affected Yo-kai restore 1/8 HP each turn.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {heal: 1, inspirit: 1, soultimate: 1},
		volatileStatus: 'daydream',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Recover', target);
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onHit(target, source, move) {
			this.heal(100, target, source);
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Daydream');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(Math.floor(pokemon.baseMaxhp / 8), pokemon);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Daydream', '[silent]');
			},
		},
		secondary: null,
		target: "allies",
		type: "Restoration",
	},
	demonicslash: {
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		name: "Demonic Slash",
		shortDesc: "Hits 7 times.",
		desc: "Hits 7 times.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		multihit: 7,
		secondary: null,
		target: "allFoes",
		type: "Dark",
	},
	demonicstorm: {
		accuracy: 100,
		basePower: 150,
		category: "Special",
		name: "Demonic Storm",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Flying",
	},
	didyouseeme: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Did You See Me?",
		shortDesc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		desc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		volatileStatus: 'soultimateblocked',
		onHit(target, source, move) {
			target.soultimateCharge = Math.max(0, target.soultimateCharge - 3);
		},
		secondary: null,
		target: "any",
		type: "Dark",
	},
	dismartillery: {
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Dismartillery",
		shortDesc: "Halves the Strength of affected Yo-kai.",
		desc: "Halves the Strength of affected Yo-kai.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'dismartillery',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Dismartillery');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Dismartillery', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Poison",
	},
	draggiestone: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Draggie Stone",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Rock",
	},
	dragonfalls: {
		accuracy: 100,
		basePower: 200,
		category: "Special",
		name: "Dragon Falls",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Water",
	},
	dragonrock: {
		accuracy: 100,
		basePower: 180,
		category: "Special",
		name: "Dragon Rock",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Rock",
	},
	drizzlingshower: {
		accuracy: 100,
		basePower: 155,
		category: "Special",
		name: "Drizzling Shower",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Water",
	},
	earthshaker: {
		accuracy: 100,
		basePower: 190,
		category: "Special",
		name: "Earthshaker",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Rock",
	},
	eellife: {
		accuracy: 100,
		basePower: 33,
		category: "Physical",
		name: "Eel Life",
		shortDesc: "Hits 5 times.",
		desc: "Hits 5 times.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		multihit: 5,
		secondary: null,
		target: "allFoes",
		type: "Water",
	},
	enemyaura: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Enemy Aura",
		shortDesc: "Removes positive Inspirits and clears positive stat changes from the targets.",
		desc: "Removes positive Inspirits and clears positive stat changes from the targets.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		onHit(target, source, move) {
			// Remove positive Inspirits
			const toRemove = Object.keys(target.volatiles).filter(volatile => {
				const condition = this.dex.conditions.get(volatile);
				return (condition as any).isInspirit === true && (condition as any).isGood === true;
			});
			for (const volatile of toRemove) {
				target.removeVolatile(volatile);
			}
			// Clear positive stat boosts
			const drops: SparseBoostsTable = {};
			for (const boostName in target.boosts) {
				if (target.boosts[boostName as BoostID] > 0) {
					drops[boostName as BoostID] = -target.boosts[boostName as BoostID];
				}
			}
			this.boost(drops, target, source);
		},
		secondary: null,
		target: "allFoes",
		type: "Dark",
	},
	energyheaven: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Energy Heaven",
		shortDesc: "Heals the user and its allies a ton.",
		desc: "Heals the user and its allies according to the following formula: Healing = (155 * (User's Spirit / 2)) / 100.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {heal: 1, soultimate: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Recover', target);
		},
		onHit(target, source, move) {
			const healing = Math.floor((155 * Math.floor(source.getStat('spa') / 2)) / 100);
			this.heal(healing, target, source);
		},
		secondary: null,
		target: "allies",
		type: "Restoration",
	},
	envioushand: {
		accuracy: 100,
		basePower: 130,
		category: "Special",
		name: "Envious Hand",
		shortDesc: "Heals user and allies for 25% of the damage dealt.",
		desc: "Heals user and allies for 25% of the damage dealt, split evenly between all targets.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {heal: 1, protect: 1, soultimate: 1},
		onDamagingHit(damage, target, source, move) {
			const recipients = source.alliesAndSelf().filter(p => !p.fainted);
			const healAmount = Math.floor(damage * 0.25 / recipients.length);
			for (const recipient of recipients) {
				this.heal(healAmount, recipient, source);
			}
		},
		secondary: null,
		target: "allFoes",
		type: "Drain",
	},
	eternaldebt: {
		accuracy: 100,
		basePower: 160,
		category: "Physical",
		name: "Eternal Debt",
		shortDesc: "Affected Yo-kai will heal foes they target by 1/5 max HP before dealing damage.",
		desc: "Affected Yo-kai will heal foes they target by 1/5 max HP before dealing damage.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'eternaldebt',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Eternal Debt');
			},
			onBeforeMove(pokemon, target, move) {
				if (move.category !== 'Status' && !target.isAlly(pokemon)) {
					this.heal(Math.floor(target.baseMaxhp / 5), target, pokemon);
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Eternal Debt', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Steel",
	},
	faceflop: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Face Flop",
		shortDesc: "Has 25% recoil.",
		desc: "Has 25% recoil.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {head: 1, protect: 1, soultimate: 1},
		recoil: [1, 4],
		secondary: null,
		target: "any",
		type: "Psychic",
	},
	feedingfrenzy: {
		accuracy: 100,
		basePower: 195,
		category: "Special",
		name: "Feeding Frenzy",
		shortDesc: "Heals user and allies for 25% of the damage dealt.",
		desc: "Heals user and allies for 25% of the damage dealt, split evenly between all targets.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {heal: 1, protect: 1, soultimate: 1},
		onDamagingHit(damage, target, source, move) {
			const recipients = source.alliesAndSelf().filter(p => !p.fainted);
			const healAmount = Math.floor(damage * 0.25 / recipients.length);
			for (const recipient of recipients) {
				this.heal(healAmount, recipient, source);
			}
		},
		secondary: null,
		target: "allFoes",
		type: "Drain",
	},
	fidgetingsmack: {
		accuracy: 100,
		basePower: 155,
		category: "Physical",
		name: "Fidgeting Smack",
		shortDesc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		desc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		volatileStatus: 'soultimateblocked',
		onHit(target, source, move) {
			target.soultimateCharge = Math.max(0, target.soultimateCharge - 3);
		},
		secondary: null,
		target: "any",
		type: "Normal",
	},
	fierylonging: {
		accuracy: 100,
		basePower: 195,
		category: "Special",
		name: "Fiery Longing",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Fire",
	},
	fornaughtybrats: {
		accuracy: 100,
		basePower: 22,
		category: "Physical",
		name: "For Naughty Brats",
		shortDesc: "Hits 10 times.",
		desc: "Hits 10 times.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		multihit: 10,
		secondary: null,
		target: "allFoes",
		type: "Ice",
	},
	frenziedrage: {
		accuracy: 100,
		basePower: 180,
		category: "Special",
		name: "Frenzied Rage",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Fire",
	},
	freshimpact: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fresh Impact",
		shortDesc: "Heals the user and its allies a ton.",
		desc: "Heals the user and its allies according to the following formula: Healing = (150 * (User's Spirit / 2)) / 100.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {heal: 1, soultimate: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Recover', target);
		},
		onHit(target, source, move) {
			const healing = Math.floor((150 * Math.floor(source.getStat('spa') / 2)) / 100);
			this.heal(healing, target, source);
		},
		secondary: null,
		target: "allies",
		type: "Restoration",
	},
	foursight: {
		accuracy: 100,
		basePower: 155,
		category: "Special",
		name: "Foursight",
		shortDesc: "Heals user and allies for 25% of the damage dealt.",
		desc: "Heals user and allies for 25% of the damage dealt, split evenly between all targets.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {heal: 1, protect: 1, soultimate: 1},
		onDamagingHit(damage, target, source, move) {
			const recipients = source.alliesAndSelf().filter(p => !p.fainted);
			const healAmount = Math.floor(damage * 0.25 / recipients.length);
			for (const recipient of recipients) {
				this.heal(healAmount, recipient, source);
			}
		},
		secondary: null,
		target: "allFoes",
		type: "Drain",
	},
	fullbloom: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Full Bloom",
		shortDesc: "Revives all fainted allies with a ton of HP.",
		desc: "Revives all fainted allies with HP equivalent to the usual healing formula with a value of 180.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {heal: 1, protect: 1, soultimate: 1},
		onAfterMove(target, source, move) {
			const healing = Math.floor((180 * Math.floor(source.getStat('spa') / 2)) / 100);
			for (const ally of source.side.pokemon) {
				if (!ally.fainted) continue;
				ally.fainted = false;
				ally.hp = Math.min(healing, ally.maxhp);
				this.add('-message', `${ally.name} was revived!`);
				// send them in if there's an empty slot
				const emptySlot = source.side.active.findIndex(p => !p || p.fainted);
				if (emptySlot !== -1) {
					this.actions.switchIn(ally, emptySlot);
				}
			}
		},
		secondary: null,
		target: "self",
		type: "Restoration",
	},
	funfield: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fun Field",
		shortDesc: "Affected Yo-kai restore 1/5 max HP each turn.",
		desc: "Affected Yo-kai restore 1/5 max HP each turn.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {heal: 1, inspirit: 1, soultimate: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		volatileStatus: 'funfield',
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Fun Field');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(Math.floor(pokemon.baseMaxhp / 5), pokemon);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Fun Field', '[silent]');
			},
		},
		secondary: null,
		target: "allies",
		type: "Inspirit",
	},
	gangsterglare: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Gangster Glare",
		shortDesc: "Lowers targets' Speed 2 stages.",
		desc: "Lowers targets' Speed 2 stages.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: {
			chance: 100,
			boosts: {
				spe: -2,
			},
		},
		target: "allFoes",
		type: "Dark",
	},
	getapresent: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Get-a-Present",
		shortDesc: "Heals the user and its allies a ton.",
		desc: "Heals the user and its allies according to the following formula: Healing = (130 * (User's Spirit / 2)) / 100.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {heal: 1, soultimate: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Recover', target);
		},
		onHit(target, source, move) {
			const healing = Math.floor((130 * Math.floor(source.getStat('spa') / 2)) / 100);
			this.heal(healing, target, source);
		},
		secondary: null,
		target: "allies",
		type: "Restoration",
	},
	gigaturbocharge: {
		accuracy: 100,
		basePower: 210,
		category: "Special",
		name: "Giga Turbocharge",
		shortDesc: "Heals user and allies for 25% of the damage dealt.",
		desc: "Heals user and allies for 25% of the damage dealt, split evenly between all targets.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {heal: 1, protect: 1, soultimate: 1},
		onDamagingHit(damage, target, source, move) {
			const recipients = source.alliesAndSelf().filter(p => !p.fainted);
			const healAmount = Math.floor(damage * 0.25 / recipients.length);
			for (const recipient of recipients) {
				this.heal(healAmount, recipient, source);
			}
		},
		secondary: null,
		target: "allFoes",
		type: "Drain",
	},
	gleefulgluttony: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Gleeful Gluttony",
		shortDesc: "Heals the user and its allies a ton.",
		desc: "Heals the user and its allies according to the following formula: Healing = (175 * (User's Spirit / 2)) / 100.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {heal: 1, soultimate: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Recover', target);
		},
		onHit(target, source, move) {
			const healing = Math.floor((175 * Math.floor(source.getStat('spa') / 2)) / 100);
			this.heal(healing, target, source);
		},
		secondary: null,
		target: "allies",
		type: "Restoration",
	},
	glitteringpaws: {
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		name: "Glittering Paws",
		shortDesc: "Hits 10 times.",
		desc: "Hits 10 times.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		multihit: 10,
		secondary: null,
		target: "allFoes",
		type: "Electric",
	},
	gloomystorm: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Gloomy Storm",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Flying",
	},
	gloriousbuhbye: {
		accuracy: 100,
		basePower: 250,
		category: "Physical",
		name: "Glorious Buh-Bye",
		shortDesc: "The user faints after using this move.",
		desc: "The user faints after using this move.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		selfdestruct: "always",
		secondary: null,
		target: "allFoes",
		type: "Electric",
	},
	goforbroke: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Go For Broke",
		shortDesc: "The user and its allies' Strength is 2x.",
		desc: "The user and its allies' Strength is 2x.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, soultimate: 1},
		volatileStatus: 'goforbroke',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Go For Broke');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(2);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Go For Broke', '[silent]');
			},
		},
		secondary: null,
		target: "allies",
		type: "Inspirit",
	},
	goldenbeatdown: {
		accuracy: 100,
		basePower: 300,
		category: "Physical",
		name: "Golden Beatdown",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "any",
		type: "Electric",
	},
	goldenthundpurr: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Golden Thundpurr",
		shortDesc: "The user and its allies' stats are 1.5x.",
		desc: "The user and its allies' Strength, Spirit, Defense, and Speed are 1.5x.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, soultimate: 1},
		volatileStatus: 'goldenthundpurr',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Golden Thundpurr');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, attacker, defender, move) {
				return this.chainModify(1.5);
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(1.5);
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, attacker, defender, move) {
				return this.chainModify(1.5);
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Golden Thundpurr', '[silent]');
			},
		},
		secondary: null,
		target: "allies",
		type: "Inspirit",
	},
	gorillastraight: {
		accuracy: 100,
		basePower: 255,
		category: "Physical",
		name: "Gorilla Straight",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "any",
		type: "Fighting",
	},
	guardmeowde: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Guard Meowde",
		shortDesc: "User's Defense is 2x and foes are forced to target it.",
		desc: "User's Defense is 2x and foes are forced to target it.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, soultimate: 1},
		volatileStatus: 'guardmeowde',
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Guard Meowde');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(2);
			},
			onFoeRedirectTargetPriority: 3,
			onFoeRedirectTarget(target, source, source2, move) {
				if (!this.effectState.target.isSkyDropped() && this.validTarget(this.effectState.target, source, move.target)) {
					if (move.smartTarget) move.smartTarget = false;
					this.debug("Guard Meowde redirected target of move");
					return this.effectState.target;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Guard Meowde', '[silent]');
			},
		},
		secondary: null,
		target: "self",
		type: "Inspirit",
	},
	gutsycut: {
		accuracy: 100,
		basePower: 255,
		category: "Physical",
		name: "Gutsy Cut",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "any",
		type: "Fighting",
	},
	halfheartedchop: {
		accuracy: 100,
		basePower: 15,
		category: "Physical",
		name: "Halfhearted Chop",
		shortDesc: "Hits 5 times.",
		desc: "Hits 5 times.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		multihit: 5,
		secondary: null,
		target: "allFoes",
		type: "Steel",
	},
	handsomegrin: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Handsome Grin",
		shortDesc: "Fully restores the HP of the user and its allies.",
		desc: "Fully restores the HP of the user and its allies.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {heal: 1, soultimate: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Recover', target);
		},
		onHit(target, source, move) {
			this.heal(target.maxhp, target, source);
		},
		secondary: null,
		target: "allies",
		type: "Restoration",
	},
	hatefulcharge: {
		accuracy: 100,
		basePower: 155,
		category: "Special",
		name: "Hateful Charge",
		shortDesc: "Heals user and allies for 25% of the damage dealt.",
		desc: "Heals user and allies for 25% of the damage dealt, split evenly between all targets.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {heal: 1, protect: 1, soultimate: 1},
		onDamagingHit(damage, target, source, move) {
			const recipients = source.alliesAndSelf().filter(p => !p.fainted);
			const healAmount = Math.floor(damage * 0.25 / recipients.length);
			for (const recipient of recipients) {
				this.heal(healAmount, recipient, source);
			}
		},
		secondary: null,
		target: "allFoes",
		type: "Drain",
	},
	hazydance: {
		accuracy: 100,
		basePower: 210,
		category: "Physical",
		name: "Hazy Dance",
		shortDesc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		desc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		volatileStatus: 'soultimateblocked',
		onHit(target, source, move) {
			target.soultimateCharge = Math.max(0, target.soultimateCharge - 3);
		},
		secondary: null,
		target: "any",
		type: "Dark",
	},
	headbuttheyo: {
		accuracy: 100,
		basePower: 170,
		category: "Physical",
		name: "Headbutt HEY-O!",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {head: 1, protect: 1, soultimate: 1},
		secondary: null,
		target: "any",
		type: "Rock",
	},
	heartmeltlove: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Heartmelt Love",
		shortDesc: "Heals the user and its allies a ton.",
		desc: "Heals the user and its allies according to the following formula: Healing = (180 * (User's Spirit / 2)) / 100.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {heal: 1, soultimate: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Recover', target);
		},
		onHit(target, source, move) {
			const healing = Math.floor((180 * Math.floor(source.getStat('spa') / 2)) / 100);
			this.heal(healing, target, source);
		},
		secondary: null,
		target: "allies",
		type: "Restoration",
	},
	heartstringtug: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Heartstring Tug",
		shortDesc: "Heals the user and its allies a lot.",
		desc: "Heals the user and its allies according to the following formula: Healing = (90 * (User's Spirit / 2)) / 100.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {heal: 1, soultimate: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Recover', target);
		},
		onHit(target, source, move) {
			const healing = Math.floor((90 * Math.floor(source.getStat('spa') / 2)) / 100);
			this.heal(healing, target, source);
		},
		secondary: null,
		target: "allies",
		type: "Restoration",
	},
	heatwave: {
		accuracy: 100,
		basePower: 210,
		category: "Special",
		name: "Heat Wave",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Fire",
	},
	heavenlyhail: {
		accuracy: 100,
		basePower: 160,
		category: "Special",
		name: "Heavenly Hail",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Ice",
	},
	heavenlyheart: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Heavenly Heart",
		shortDesc: "Heals the user and its allies a ton.",
		desc: "Heals the user and its allies according to the following formula: Healing = (195 * (User's Spirit / 2)) / 100.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {heal: 1, soultimate: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Recover', target);
		},
		onHit(target, source, move) {
			const healing = Math.floor((195 * Math.floor(source.getStat('spa') / 2)) / 100);
			this.heal(healing, target, source);
		},
		secondary: null,
		target: "allies",
		type: "Restoration",
	},
	heavysquall: {
		accuracy: 100,
		basePower: 160,
		category: "Special",
		name: "Heavy Squall",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Water",
	},
	helmsmanhelm: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Helmsman Helm",
		shortDesc: "The user and its allies' Strength is 1.5x and their Defense is 2x.",
		desc: "The user and its allies' Strength is 1.5x and their Defense is 2x.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, soultimate: 1},
		volatileStatus: 'helmsmanhelm',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Helmsman Helm');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(1.5);
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(2);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Helmsman Helm', '[silent]');
			},
		},
		secondary: null,
		target: "allies",
		type: "Inspirit",
	},
	hidabatharmony: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Hidabat Harmony",
		shortDesc: "Taunts and Torments affected Yo-kai.",
		desc: "Taunts and Torments affected Yo-kai.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'hidabatharmony',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Hidabat Harmony');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.moves.get(moveSlot.id);
					if (pokemon.lastMove && pokemon.lastMove.id !== 'struggle') pokemon.disableMove(pokemon.lastMove.id);
					if (move.category === 'Status' && move.id !== 'mefirst') {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 5,
			onBeforeMove(attacker, defender, move) {
				if (!move.isZ && !move.isMax && !move.flags['soultimate'] && move.category === 'Status' && move.id !== 'mefirst') {
					this.add('cant', attacker, 'move: Hidabat Harmony', move);
					return false;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Hidabat Harmony', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Dark",
	},
	hititbig: {
		accuracy: 100,
		basePower: 225,
		category: "Physical",
		name: "Hit It Big!",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "any",
		type: "Psychic",
	},
	holyslash: {
		accuracy: 100,
		basePower: 285,
		category: "Physical",
		name: "Holy Slash",
		shortDesc: "High critical hit ratio.",
		desc: "High critical hit ratio.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		critRatio: 2,
		secondary: null,
		target: "any",
		type: "Electric",
	},
	hornbreaker: {
		accuracy: 100,
		basePower: 270,
		category: "Physical",
		name: "Horn Breaker",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {head: 1, protect: 1, soultimate: 1},
		secondary: null,
		target: "any",
		type: "Bug",
	},
	hornexplosion: {
		accuracy: 100,
		basePower: 300,
		category: "Physical",
		name: "Horn Explosion",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {head: 1, protect: 1, soultimate: 1},
		secondary: null,
		target: "any",
		type: "Rock",
	},
	hungryimpact: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Hungry Impact",
		shortDesc: "Heals the user and its allies a ton.",
		desc: "Heals the user and its allies according to the following formula: Healing = (130 * (User's Spirit / 2)) / 100.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {heal: 1, soultimate: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Recover', target);
		},
		onHit(target, source, move) {
			const healing = Math.floor((130 * Math.floor(source.getStat('spa') / 2)) / 100);
			this.heal(healing, target, source);
		},
		secondary: null,
		target: "allies",
		type: "Restoration",
	},
	iwantitall: {
		accuracy: 100,
		basePower: 155,
		category: "Special",
		name: "I Want It All!",
		shortDesc: "Heals user and allies for 25% of the damage dealt.",
		desc: "Heals user and allies for 25% of the damage dealt, split evenly between all targets.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {heal: 1, protect: 1, soultimate: 1},
		onDamagingHit(damage, target, source, move) {
			const recipients = source.alliesAndSelf().filter(p => !p.fainted);
			const healAmount = Math.floor(damage * 0.25 / recipients.length);
			for (const recipient of recipients) {
				this.heal(healAmount, recipient, source);
			}
		},
		secondary: null,
		target: "allFoes",
		type: "Drain",
	},
	illtakethelead: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "I'll Take The Lead!",
		shortDesc: "The user and its allies' Strength is 2.5x.",
		desc: "The user and its allies' Strength is 2.5x.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, soultimate: 1},
		volatileStatus: 'illtakethelead',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'I\'ll Take The Lead!');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(2.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'I\'ll Take The Lead!', '[silent]');
			},
		},
		secondary: null,
		target: "allies",
		type: "Inspirit",
	},
	iciclecrack: {
		accuracy: 100,
		basePower: 155,
		category: "Physical",
		name: "Icicle Crack",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Ice",
	},
	ignoranceisbliss: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Ignorance is Bliss",
		shortDesc: "Affected Yo-kai's Speed is 4x.",
		desc: "Affected Yo-kai's Speed is 4x.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, soultimate: 1},
		volatileStatus: 'ignoranceisbliss',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Ignorance is Bliss');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(4);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Ignorance is Bliss', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	indafunnybone: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "In Da Funny Bone",
		shortDesc: "Heals the user and its allies a little bit.",
		desc: "Heals the user and its allies according to the following formula: Healing = (70 * (User's Spirit / 2)) / 100.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {heal: 1, soultimate: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Recover', target);
		},
		onHit(target, source, move) {
			const healing = Math.floor((70 * Math.floor(source.getStat('spa') / 2)) / 100);
			this.heal(healing, target, source);
		},
		secondary: null,
		target: "allies",
		type: "Restoration",
	},
	infernalpincers: {
		accuracy: 100,
		basePower: 270,
		category: "Physical",
		name: "Infernal Pincers",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {head: 1, protect: 1, soultimate: 1},
		secondary: null,
		target: "any",
		type: "Bug",
	},
	inferno: {
		accuracy: 100,
		basePower: 220,
		category: "Special",
		name: "Inferno",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Fire",
	},
	insurmountable: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Insurmountable",
		shortDesc: "User's Defense is 2.5x and foes are forced to target it.",
		desc: "User's Defense is 2.5x and foes are forced to target it.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, soultimate: 1},
		volatileStatus: 'insurmountable',
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Insurmountable');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(2.5);
			},
			onFoeRedirectTargetPriority: 3,
			onFoeRedirectTarget(target, source, source2, move) {
				if (!this.effectState.target.isSkyDropped() && this.validTarget(this.effectState.target, source, move.target)) {
					if (move.smartTarget) move.smartTarget = false;
					this.debug("Insurmountable redirected target of move");
					return this.effectState.target;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Insurmountable', '[silent]');
			},
		},
		secondary: null,
		target: "self",
		type: "Inspirit",
	},
	ironcloutain: {
		accuracy: 100,
		basePower: 175,
		category: "Physical",
		name: "Iron Cloutain",
		shortDesc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		desc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		volatileStatus: 'soultimateblocked',
		onHit(target, source, move) {
			target.soultimateCharge = Math.max(0, target.soultimateCharge - 3);
		},
		secondary: null,
		target: "any",
		type: "Steel",
	},
	itchocalypse: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Itchocalypse",
		shortDesc: "Lowers targets' Strength 2 stages.",
		desc: "Lowers targets' Strength 2 stages.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: {
			chance: 100,
			boosts: {
				atk: -2,
			},
		},
		target: "allFoes",
		type: "Bug",
	},
	justforyou: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Just For You",
		shortDesc: "Affected Yo-kai's Defense is 2x and foes will be forced to target them.",
		desc: "Affected Yo-kai's Defense is 2x and foes will be forced to target them.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, soultimate: 1},
		volatileStatus: 'justforyou',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		onTryHit(target, source, move) {
			// anyAllyOrSelf replacement
			if (!target.isAlly(source)) {
				return false;
			}
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Just For You');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(2);
			},
			onFoeRedirectTargetPriority: 3,
			onFoeRedirectTarget(target, source, source2, move) {
				if (!this.effectState.target.isSkyDropped() && this.validTarget(this.effectState.target, source, move.target)) {
					if (move.smartTarget) move.smartTarget = false;
					this.debug("Just For You redirected target of move");
					return this.effectState.target;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Just For You', '[silent]');
			},
		},
		secondary: null,
		target: "any",
		type: "Inspirit",
	},
	kissoflife: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Kiss of Life",
		shortDesc: "Heals the user and its allies a ton.",
		desc: "Heals the user and its allies according to the following formula: Healing = (160 * (User's Spirit / 2)) / 100.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {heal: 1, soultimate: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Recover', target);
		},
		onHit(target, source, move) {
			const healing = Math.floor((160 * Math.floor(source.getStat('spa') / 2)) / 100);
			this.heal(healing, target, source);
		},
		secondary: null,
		target: "allies",
		type: "Restoration",
	},
	knightsslash: {
		accuracy: 100,
		basePower: 225,
		category: "Physical",
		name: "Knight's Slash",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Steel",
	},
	koffdropper: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Koff Dropper",
		shortDesc: "Removes positive Inspirits and clears positive stat changes from the targets.",
		desc: "Removes positive Inspirits and clears positive stat changes from the targets.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		onHit(target, source, move) {
			// Remove positive Inspirits
			const toRemove = Object.keys(target.volatiles).filter(volatile => {
				const condition = this.dex.conditions.get(volatile);
				return (condition as any).isInspirit === true && (condition as any).isGood === true;
			});
			for (const volatile of toRemove) {
				target.removeVolatile(volatile);
			}
			// Clear positive stat boosts
			const drops: SparseBoostsTable = {};
			for (const boostName in target.boosts) {
				if (target.boosts[boostName as BoostID] > 0) {
					drops[boostName as BoostID] = -target.boosts[boostName as BoostID];
				}
			}
			this.boost(drops, target, source);
		},
		secondary: null,
		target: "allFoes",
		type: "Dark",
	},
	lamestjoke: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Lamest Joke",
		shortDesc: "Affected Yo-kai's Speed is 0.25x.",
		desc: "Affected Yo-kai's Speed is 0.25x.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'lamestjoke',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Lamest Joke');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.25);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Lamest Joke', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Inspirit",
	},
	legendaryslash: {
		accuracy: 100,
		basePower: 255,
		category: "Physical",
		name: "Legendary Slash",
		shortDesc: "High critical hit ratio.",
		desc: "High critical hit ratio.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		critRatio: 2,
		secondary: null,
		target: "any",
		type: "Fire",
	},
	lifesnag: {
		accuracy: 100,
		basePower: 130,
		category: "Special",
		name: "Life Snag",
		shortDesc: "Heals user and allies for 25% of the damage dealt.",
		desc: "Heals user and allies for 25% of the damage dealt, split evenly between all targets.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {heal: 1, protect: 1, soultimate: 1},
		onDamagingHit(damage, target, source, move) {
			const recipients = source.alliesAndSelf().filter(p => !p.fainted);
			const healAmount = Math.floor(damage * 0.25 / recipients.length);
			for (const recipient of recipients) {
				this.heal(healAmount, recipient, source);
			}
		},
		secondary: null,
		target: "allFoes",
		type: "Drain",
	},
	lockofsteel: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Lock of Steel",
		shortDesc: "The user and its allies' Defense is 2.5x.",
		desc: "The user and its allies' Defense is 2.5x.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, soultimate: 1},
		volatileStatus: 'lockofsteel',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Lock of Steel');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(2.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Lock of Steel', '[silent]');
			},
		},
		secondary: null,
		target: "allies",
		type: "Inspirit",
	},
	lovingauntie: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Loving Auntie",
		shortDesc: "Heals the user and its allies a ton and revives fainted allies.",
		desc: "Heals the user and its allies and revives fainted allies with HP according to the following formula: Healing = (150 * (User's Spirit / 2)) / 100.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {heal: 1, soultimate: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Recover', target);
			this.add('-anim', source, 'Revival Blessing', target);
		},
		onHit(target, source, move) {
			const healing = Math.floor((150 * Math.floor(source.getStat('spa') / 2)) / 100);
			this.heal(healing, target, source);
		},
		onAfterMove(target, source, move) {
			const healing = Math.floor((150 * Math.floor(source.getStat('spa') / 2)) / 100);
			for (const ally of source.side.pokemon) {
				if (!ally.fainted) continue;
				ally.fainted = false;
				ally.hp = Math.min(healing, ally.maxhp);
				this.add('-message', `${ally.name} was revived!`);
				// send them in if there's an empty slot
				const emptySlot = source.side.active.findIndex(p => !p || p.fainted);
				if (emptySlot !== -1) {
					this.actions.switchIn(ally, emptySlot);
				}
			}
		},
		secondary: null,
		target: "allies",
		type: "Restoration",
	},
	lovingslap: {
		accuracy: 100,
		basePower: 155,
		category: "Physical",
		name: "Loving Slap",
		shortDesc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		desc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		volatileStatus: 'soultimateblocked',
		onHit(target, source, move) {
			target.soultimateCharge = Math.max(0, target.soultimateCharge - 3);
		},
		secondary: null,
		target: "any",
		type: "Normal",
	},
	luckysmile: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Lucky Smile",
		shortDesc: "Heals the user and its allies a ton.",
		desc: "Heals the user and its allies according to the following formula: Healing = (150 * (User's Spirit / 2)) / 100.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {heal: 1, soultimate: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Recover', target);
		},
		onHit(target, source, move) {
			const healing = Math.floor((150 * Math.floor(source.getStat('spa') / 2)) / 100);
			this.heal(healing, target, source);
		},
		secondary: null,
		target: "allies",
		type: "Restoration",
	},
	mambomadness: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Mambo Madness",
		shortDesc: "The user and its allies' Speed is 2x.",
		desc: "The user and its allies' Speed is 2x. (+1 Priority)",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 1,
		flags: {inspirit: 1, soultimate: 1},
		volatileStatus: 'mambomadness',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Mambo Madness');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(2);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Mambo Madness', '[silent]');
			},
		},
		secondary: null,
		target: "allies",
		type: "Inspirit",
	},
	'maxvolume11': {
		accuracy: 100,
		basePower: 165,
		category: "Physical",
		name: "Max Volume 11!",
		shortDesc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		desc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		volatileStatus: 'soultimateblocked',
		onHit(target, source, move) {
			target.soultimateCharge = Math.max(0, target.soultimateCharge - 3);
		},
		secondary: null,
		target: "any",
		type: "Normal",
	},
	meetthereaper: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Meet The Reaper",
		shortDesc: "Affected Yo-kai have a 50% chance to Loaf each turn.",
		desc: "Affected Yo-kai have a 50% chance to Loaf each turn.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'meetthereaper',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Meet The Reaper');
				if (!pokemon.volatiles['loafing']) pokemon.addVolatile('loafing');
				pokemon.volatiles['loafing'].loafChance += 50;
			},
			onEnd(pokemon) {
				if (!pokemon.volatiles['loafing']) {
					this.add('-end', pokemon, 'Meet The Reaper', '[silent]');
					return;
				}
				pokemon.volatiles['loafing'].loafChance -= 50;
				if (pokemon.volatiles['loafing'].loafChance <= 0) pokemon.removeVolatile('loafing');
				this.add('-end', pokemon, 'Meet The Reaper', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Inspirit",
	},
	megawaterfall: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Mega Waterfall",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Water",
	},
	midnightstomp: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Midnight Stomp",
		shortDesc: "User's Defense is 2x and foes are forced to target it.",
		desc: "User's Defense is 2x and foes are forced to target it.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, soultimate: 1},
		volatileStatus: 'midnightstomp',
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Midnight Stomp');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(2);
			},
			onFoeRedirectTargetPriority: 3,
			onFoeRedirectTarget(target, source, source2, move) {
				if (!this.effectState.target.isSkyDropped() && this.validTarget(this.effectState.target, source, move.target)) {
					if (move.smartTarget) move.smartTarget = false;
					this.debug("Midnight Stomp redirected target of move");
					return this.effectState.target;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Midnight Stomp', '[silent]');
			},
		},
		secondary: null,
		target: "self",
		type: "Inspirit",
	},
	millenniumoflame: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Millennium of Lame",
		shortDesc: "Affected Yo-kai's Speed is 0.25x.",
		desc: "Affected Yo-kai's Speed is 0.25x.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'millenniumoflame',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Millennium of Lame');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.25);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Millennium of Lame', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Inspirit",
	},
	minochipunch: {
		accuracy: 100,
		basePower: 165,
		category: "Physical",
		name: "Minochi Punch",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "any",
		type: "Fire",
	},
	mirrortomirror: {
		accuracy: 100,
		basePower: 140,
		category: "Special",
		name: "Mirror to Mirror",
		shortDesc: "This move's type changes to a random Element when dealing damage.",
		desc: "This move's type changes to a random Element when dealing damage.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		onModifyMove(move, pokemon) {
			const elements = ['Fire', 'Water', 'Electric', 'Rock', 'Ice', 'Flying', 'Drain'];
			move.type = this.sample(elements);
		},
		secondary: null,
		target: "allFoes",
		type: "Psychic",
	},
	mochipunch: {
		accuracy: 100,
		basePower: 165,
		category: "Physical",
		name: "Mochi Punch",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "any",
		type: "Grass",
	},
	mwabsorption: {
		accuracy: 100,
		basePower: 130,
		category: "Special",
		name: "Mwabsorption",
		shortDesc: "Heals user and allies for 25% of the damage dealt.",
		desc: "Heals user and allies for 25% of the damage dealt, split evenly between all targets.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {heal: 1, protect: 1, soultimate: 1},
		onDamagingHit(damage, target, source, move) {
			const recipients = source.alliesAndSelf().filter(p => !p.fainted);
			const healAmount = Math.floor(damage * 0.25 / recipients.length);
			for (const recipient of recipients) {
				this.heal(healAmount, recipient, source);
			}
		},
		secondary: null,
		target: "allFoes",
		type: "Drain",
	},
	negasuscurse: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Negasus Curse",
		shortDesc: "Affected Yo-kai's Strength is 0.3x.",
		desc: "Affected Yo-kai's Strength is 0.3x.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'negasuscurse',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Negasus Curse');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(0.3);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Negasus Curse', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Inspirit",
	},
	negativitygerms: {
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		name: "Negativity Germs",
		shortDesc: "Lowers targets' Defense 2 stages.",
		desc: "Lowers targets' Defense 2 stages.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: {
			chance: 100,
			boosts: {
				def: -2,
			},
		},
		target: "allFoes",
		type: "Dark",
	},
	neversleepever: {
		accuracy: 60,
		basePower: 0,
		category: "Status",
		name: "Never Sleep Ever",
		shortDesc: "Halves affected Yo-kai's stats.",
		desc: "Halves affected Yo-kai's Strength, Spirit, Defense, and Speed.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'neversleepever',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Never Sleep Ever');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(0.5);
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(0.5);
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, pokemon) {
				return this.chainModify(0.5);
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Never Sleep Ever', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Inspirit",
	},
	nowaythrough: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "No Way Through",
		shortDesc: "User's Defense is 2x and foes are forced to target it.",
		desc: "User's Defense is 2x and foes are forced to target it.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, soultimate: 1},
		volatileStatus: 'nowaythrough',
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'No Way Through');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(2);
			},
			onFoeRedirectTargetPriority: 3,
			onFoeRedirectTarget(target, source, source2, move) {
				if (!this.effectState.target.isSkyDropped() && this.validTarget(this.effectState.target, source, move.target)) {
					if (move.smartTarget) move.smartTarget = false;
					this.debug("No Way Through redirected target of move");
					return this.effectState.target;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'No Way Through', '[silent]');
			},
		},
		secondary: null,
		target: "self",
		type: "Inspirit",
	},
	nokosmile: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Noko Smile",
		shortDesc: "Heals the user and its allies a lot.",
		desc: "Heals the user and its allies according to the following formula: Healing = (80 * (User's Spirit / 2)) / 100.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {heal: 1, soultimate: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Recover', target);
		},
		onHit(target, source, move) {
			const healing = Math.floor((80 * Math.floor(source.getStat('spa') / 2)) / 100);
			this.heal(healing, target, source);
		},
		secondary: null,
		target: "allies",
		type: "Restoration",
	},
	nosebleedbomb: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Nosebleed Bomb",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Fire",
	},
	nyicetabeatcha: {
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		name: "Nyice ta Beatcha",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Dark",
	},
	octosnake: {
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		name: "Octo Snake",
		shortDesc: "Hits 10 times.",
		desc: "Hits 10 times.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		multihit: 10,
		secondary: null,
		target: "allFoes",
		type: "Dragon",
	},
	pandasmile: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Panda Smile",
		shortDesc: "Heals the user and its allies a ton.",
		desc: "Heals the user and its allies according to the following formula: Healing = (160 * (User's Spirit / 2)) / 100.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {heal: 1, soultimate: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Recover', target);
		},
		onHit(target, source, move) {
			const healing = Math.floor((160 * Math.floor(source.getStat('spa') / 2)) / 100);
			this.heal(healing, target, source);
		},
		secondary: null,
		target: "allies",
		type: "Restoration",
	},
	partymiracle: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Party Miracle",
		shortDesc: "Heals the user and its allies a ton.",
		desc: "Heals the user and its allies according to the following formula: Healing = (180 * (User's Spirit / 2)) / 100.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {heal: 1, soultimate: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Recover', target);
		},
		onHit(target, source, move) {
			const healing = Math.floor((180 * Math.floor(source.getStat('spa') / 2)) / 100);
			this.heal(healing, target, source);
		},
		secondary: null,
		target: "allies",
		type: "Restoration",
	},
	pawsoffury: {
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		name: "Paws of Fury",
		shortDesc: "Hits 5 times.",
		desc: "Hits 5 times.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		multihit: 5,
		secondary: null,
		target: "allFoes",
		type: "Fire",
	},
	perfectguard: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Perfect Guard",
		shortDesc: "The user's Defense is 4x.",
		desc: "The user's Defense is 4x.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, soultimate: 1},
		volatileStatus: 'perfectguard',
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Perfect Guard');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(4);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Perfect Guard', '[silent]');
			},
		},
		secondary: null,
		target: "self",
		type: "Inspirit",
	},
	perfectpaws: {
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		name: "Perfect Paws",
		shortDesc: "Hits 10 times.",
		desc: "Hits 10 times.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		multihit: 10,
		secondary: null,
		target: "allFoes",
		type: "Ice",
	},
	phantomsmash: {
		accuracy: 75,
		basePower: 210,
		category: "Physical",
		name: "Phantom Smash",
		shortDesc: "High critical hit ratio.",
		desc: "High critical hit ratio.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		critRatio: 2,
		secondary: null,
		target: "any",
		type: "Ghost",
	},
	pickapresent: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Pick-a-Present",
		shortDesc: "Can have 1 of 3 random effects.",
		desc: "Will have 1 of the following effects: Restores a ton of HP (usual formula with a modifier of 165) to all allies, Raises all allies' stats by 1, user takes 1 damage.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {heal: 1, soultimate: 1},
		onHit(target, source, move) {
			const result = this.random(3);
			if (result === 0) {
				// Heal all allies
				this.add('-message', `${source.name} picked a great present!`);
				for (const ally of source.alliesAndSelf()) {
					if (ally.fainted) continue;
					const healing = Math.floor((165 * Math.floor(source.getStat('spa') / 2)) / 100);
					this.heal(healing, ally, source);
				}
			} else if (result === 1) {
				// Raise all allies' stats by 1
				this.add('-message', `${source.name} picked a wonderful present!`);
				for (const ally of source.alliesAndSelf()) {
					if (ally.fainted) continue;
					this.boost({atk: 1, def: 1, spa: 1, spe: 1}, ally, source);
				}
			} else {
				// User takes 1 damage
				this.add('-message', `${source.name} picked a dud present!`);
				this.damage(1, source, source);
			}
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
	pitchblackcurse: {
		accuracy: 60,
		basePower: 0,
		category: "Status",
		name: "Pitch-Black Curse",
		shortDesc: "Affected Yo-kai are unable to move.",
		desc: "Affected Yo-kai are unable to move.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'pitchblackcurse',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Pitch-Black Curse');
			},
			onBeforeMovePriority: 1,
			onBeforeMoveSubPriority: 2,
			onBeforeMove(pokemon, target, move) {
				this.add('-message', `${pokemon.name} has been consumed by darkness!`);
				return false;
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Pitch-Black Curse', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Inspirit",
	},
	pointytoothpick: {
		accuracy: 100,
		basePower: 18,
		category: "Physical",
		name: "Pointy Toothpick",
		shortDesc: "Hits 5 times.",
		desc: "Hits 5 times.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		multihit: 5,
		secondary: null,
		target: "allFoes",
		type: "Fighting",
	},
	prismparasol: {
		accuracy: 100,
		basePower: 22,
		category: "Physical",
		name: "Prism Parasol",
		shortDesc: "Hits 7 times.",
		desc: "Hits 7 times.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		multihit: 7,
		secondary: null,
		target: "allFoes",
		type: "Fairy",
	},
	purebluepaws: {
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		name: "Pure-Blue Paws",
		shortDesc: "Hits 10 times.",
		desc: "Hits 10 times.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		multihit: 10,
		secondary: null,
		target: "allFoes",
		type: "Water",
	},
	radiantrain: {
		accuracy: 100,
		basePower: 160,
		category: "Special",
		name: "Radiant Rain",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Water",
	},
	refinedguard: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Refined Guard",
		shortDesc: "User's Defense is 2x and foes are forced to target it.",
		desc: "User's Defense is 2x and foes are forced to target it.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, soultimate: 1},
		volatileStatus: 'refinedguard',
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Refined Guard');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(2);
			},
			onFoeRedirectTargetPriority: 3,
			onFoeRedirectTarget(target, source, source2, move) {
				if (!this.effectState.target.isSkyDropped() && this.validTarget(this.effectState.target, source, move.target)) {
					if (move.smartTarget) move.smartTarget = false;
					this.debug("Refined Guard redirected target of move");
					return this.effectState.target;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Refined Guard', '[silent]');
			},
		},
		secondary: null,
		target: "self",
		type: "Inspirit",
	},
	resignedrush: {
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		name: "Resigned Rush",
		shortDesc: "Hits 7 times.",
		desc: "Hits 7 times.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		multihit: 7,
		secondary: null,
		target: "allFoes",
		type: "Steel",
	},
	roaringstance: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Roaring Stance",
		shortDesc: "The user and its allies' Strength is 2.5x.",
		desc: "The user and its allies' Strength is 2.5x.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {inspirit: 1, soultimate: 1},
		volatileStatus: 'roaringstance',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Roaring Stance');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(2.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Roaring Stance', '[silent]');
			},
		},
		secondary: null,
		target: "allies",
		type: "Inspirit",
	},
	rolloffate: {
		accuracy: 100,
		basePower: 0,
		category: "Physical",
		name: "Roll of Fate",
		shortDesc: "This move's base power is a random number between 50 and 300.",
		desc: "This move's base power is a random number between 50 and 300.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		onModifyMove(move, pokemon) {
			move.basePower = this.random(50, 301);
			this.debug(`Roll of Fate base power: ${move.basePower}`);
		},
		secondary: null,
		target: "any",
		type: "Psychic",
	},
	rubyboogie: {
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		name: "Ruby Boogie",
		shortDesc: "Hits 10 times.",
		desc: "Hits 10 times.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		multihit: 10,
		secondary: null,
		target: "allFoes",
		type: "Fire",
	},
	scarywrinkles: {
		accuracy: 100,
		basePower: 150,
		category: "Special",
		name: "Scary Wrinkles",
		shortDesc: "Heals user and allies for 25% of the damage dealt.",
		desc: "Heals user and allies for 25% of the damage dealt, split evenly between all targets.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {heal: 1, protect: 1, soultimate: 1},
		onDamagingHit(damage, target, source, move) {
			const recipients = source.alliesAndSelf().filter(p => !p.fainted);
			const healAmount = Math.floor(damage * 0.25 / recipients.length);
			for (const recipient of recipients) {
				this.heal(healAmount, recipient, source);
			}
		},
		secondary: null,
		target: "allFoes",
		type: "Drain",
	},
	seaweedsamba: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Seaweed Samba",
		shortDesc: "Affected Yo-kai restore 1/5 max HP each turn.",
		desc: "Affected Yo-kai restore 1/5 max HP each turn.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {heal: 1, inspirit: 1, soultimate: 1},
		volatileStatus: 'seaweedsamba',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Seaweed Samba');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(Math.floor(pokemon.baseMaxhp / 5), pokemon);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Seaweed Samba', '[silent]');
			},
		},
		secondary: null,
		target: "allies",
		type: "Inspirit",
	},
	selfdestruct: {
		accuracy: 100,
		basePower: 180,
		category: "Physical",
		name: "Self Destruct",
		shortDesc: "The user faints after using this move.",
		desc: "The user faints after using this move.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		selfdestruct: "always",
		secondary: null,
		target: "allFoes",
		type: "Steel",
	},
	shadowdragon: {
		accuracy: 100,
		basePower: 23,
		category: "Physical",
		name: "Shadow Dragon",
		shortDesc: "Hits 10 times.",
		desc: "Hits 10 times.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		multihit: 10,
		secondary: null,
		target: "allFoes",
		type: "Dragon",
	},
	shadowspeed: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Shadow Speed",
		shortDesc: "The user and its allies' Speed is 2.5x.",
		desc: "The user and its allies' Speed is 2.5x.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, soultimate: 1},
		volatileStatus: 'shadowspeed',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Shadow Speed');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(2.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Shadow Speed', '[silent]');
			},
		},
		secondary: null,
		target: "allies",
		type: "Inspirit",
	},
	sharkskinshield: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Sharkskin Shield",
		shortDesc: "User's Defense is 2x and foes are forced to target it.",
		desc: "User's Defense is 2x and foes are forced to target it.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, soultimate: 1},
		volatileStatus: 'sharkskinshield',
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Sharkskin Shield');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(2);
			},
			onFoeRedirectTargetPriority: 3,
			onFoeRedirectTarget(target, source, source2, move) {
				if (!this.effectState.target.isSkyDropped() && this.validTarget(this.effectState.target, source, move.target)) {
					if (move.smartTarget) move.smartTarget = false;
					this.debug("Sharkskin Shield redirected target of move");
					return this.effectState.target;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Sharkskin Shield', '[silent]');
			},
		},
		secondary: null,
		target: "self",
		type: "Inspirit",
	},
	shinychaos: {
		accuracy: 100,
		basePower: 140,
		category: "Physical",
		name: "Shiny Chaos",
		shortDesc: "Lowers targets' stats by 1 stage.",
		desc: "Lowers targets' Strength, Spirit, Defense, and Speed by 1 stage.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
				def: -1,
				spa: -1,
				spe: -1,
			},
		},
		target: "allFoes",
		type: "Ice",
	},
	shinysnowdrifts: {
		accuracy: 100,
		basePower: 195,
		category: "Special",
		name: "Shiny Snowdrifts",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Ice",
	},
	shiveringsigh: {
		accuracy: 100,
		basePower: 155,
		category: "Special",
		name: "Shivering Sigh",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Ice",
	},
	shouldercrunch: {
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		name: "Shoulder Crunch",
		shortDesc: "Has 25% recoil.",
		desc: "Has 25% recoil.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {head: 1, protect: 1, soultimate: 1},
		recoil: [1, 4],
		secondary: null,
		target: "any",
		type: "Fighting",
	},
	shoulderlock: {
		accuracy: 100,
		basePower: 180,
		category: "Physical",
		name: "Shoulder Lock",
		shortDesc: "Has 25% recoil.",
		desc: "Has 25% recoil.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {head: 1, protect: 1, soultimate: 1},
		recoil: [1, 4],
		secondary: null,
		target: "any",
		type: "Fighting",
	},
	shurashower: {
		accuracy: 100,
		basePower: 225,
		category: "Special",
		name: "Shura Shower",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Fire",
	},
	signalshock: {
		accuracy: 100,
		basePower: 155,
		category: "Special",
		name: "Signal Shock",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Electric",
	},
	skeletonsmack: {
		accuracy: 100,
		basePower: 175,
		category: "Physical",
		name: "Skeleton Smack",
		shortDesc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		desc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		volatileStatus: 'soultimateblocked',
		onHit(target, source, move) {
			target.soultimateCharge = Math.max(0, target.soultimateCharge - 3);
		},
		secondary: null,
		target: "any",
		type: "Ghost",
	},
	sleepysmoke: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Sleepy Smoke",
		shortDesc: "Causes the target(s) to fall asleep.",
		desc: "Causes the target(s) to fall asleep.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'sleepysmoke',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Sleepy Smoke');
				pokemon.trySetStatus('slp', pokemon, 'move: Sleepy Smoke');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Sleepy Smoke', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Inspirit",
	},
	sneezyspike: {
		accuracy: 100,
		basePower: 170,
		category: "Physical",
		name: "Sneezy Spike",
		shortDesc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		desc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		volatileStatus: 'soultimateblocked',
		onHit(target, source, move) {
			target.soultimateCharge = Math.max(0, target.soultimateCharge - 3);
		},
		secondary: null,
		target: "any",
		type: "Ice",
	},
	snowsherbet: {
		accuracy: 100,
		basePower: 155,
		category: "Special",
		name: "Snow Sherbet",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Ice",
	},
	soulfirestrike: {
		accuracy: 100,
		basePower: 180,
		category: "Special",
		name: "Soulfire Strike",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Fire",
	},
	spacingout: {
		accuracy: 80,
		basePower: 80,
		category: "Physical",
		name: "Spacing Out",
		shortDesc: "Affected Yo-kai have a 50% chance to Loaf each turn.",
		desc: "Affected Yo-kai have a 50% chance to Loaf each turn.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'spacingout',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Spacing Out');
				if (!pokemon.volatiles['loafing']) pokemon.addVolatile('loafing');
				pokemon.volatiles['loafing'].loafChance += 50;
			},
			onEnd(pokemon) {
				if (!pokemon.volatiles['loafing']) {
					this.add('-end', pokemon, 'Spacing Out', '[silent]');
					return;
				}
				pokemon.volatiles['loafing'].loafChance -= 50;
				if (pokemon.volatiles['loafing'].loafChance <= 0) pokemon.removeVolatile('loafing');
				this.add('-end', pokemon, 'Spacing Out', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Ghost",
	},
	spiritburst: {
		accuracy: 100,
		basePower: 160,
		category: "Physical",
		name: "Spirit Burst",
		shortDesc: "100% chance to Burn.",
		desc: "100% chance to Burn.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: {
			chance: 100,
			status: 'brn',
		},
		target: "allFoes",
		type: "Fairy",
	},
	spiritdance: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Spirit Dance",
		shortDesc: "100% chance to Burn.",
		desc: "100% chance to Burn.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: {
			chance: 100,
			status: 'brn',
		},
		target: "allFoes",
		type: "Fairy",
	},
	spiritdaze: {
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		name: "Spirit Daze",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Ice",
	},
	spiritillusion: {
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		name: "Spirit Illusion",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Water",
	},
	staredown: {
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		name: "Stare Down",
		shortDesc: "Lowers targets' Speed 2 stages.",
		desc: "Lowers targets' Speed 2 stages.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: {
			chance: 100,
			boosts: {
				spe: -2,
			},
		},
		target: "allFoes",
		type: "Dark",
	},
	stingbomb: {
		accuracy: 100,
		basePower: 235,
		category: "Physical",
		name: "Sting Bomb",
		shortDesc: "The user faints after using this move.",
		desc: "The user faints after using this move.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		selfdestruct: "always",
		secondary: null,
		target: "allFoes",
		type: "Poison",
	},
	stingycurse: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Stingy Curse",
		shortDesc: "Affected Yo-kai lose 1/4 max HP each turn.",
		desc: "Affected Yo-kai lose 1/4 max HP each turn.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'stingycurse',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Stingy Curse');
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				this.damage(Math.floor(pokemon.baseMaxhp / 4), pokemon);
				this.add('-message', `${pokemon.name} refuses to spend money on food!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Stingy Curse', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Inspirit",
	},
	stinkysmog: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Stinky Smog",
		shortDesc: "Affected Yo-kai's Speed is halved, and they lose 1/8 max HP each turn.",
		desc: "Affected Yo-kai's Speed is halved, and they lose 1/8 max HP each turn.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'stinkysmog',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Stinky Smog');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.5);
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				this.damage(Math.floor(pokemon.baseMaxhp / 8), pokemon);
				this.add('-message', `${pokemon.name} is choking on the smog!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Stinky Smog', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Inspirit",
	},
	stonewalldrop: {
		accuracy: 100,
		basePower: 160,
		category: "Special",
		name: "Stonewall Drop",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Rock",
	},
	stretchyslap: {
		accuracy: 100,
		basePower: 155,
		category: "Physical",
		name: "Stretchy Slap",
		shortDesc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		desc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		volatileStatus: 'soultimateblocked',
		onHit(target, source, move) {
			target.soultimateCharge = Math.max(0, target.soultimateCharge - 3);
		},
		secondary: null,
		target: "any",
		type: "Water",
	},
	stygianslingshot: {
		accuracy: 100,
		basePower: 180,
		category: "Special",
		name: "Stygian Slingshot",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Rock",
	},
	stylishstab: {
		accuracy: 100,
		basePower: 17,
		category: "Physical",
		name: "Stylish Stab",
		shortDesc: "Hits 5 times.",
		desc: "Hits 5 times.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		multihit: 5,
		secondary: null,
		target: "allFoes",
		type: "Fairy",
	},
	subzero: {
		accuracy: 100,
		basePower: 195,
		category: "Physical",
		name: "Subzero",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Ice",
	},
	sulkysoul: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Sulky Soul",
		shortDesc: "Removes positive Inspirits and clears positive stat changes from the targets.",
		desc: "Removes positive Inspirits and clears positive stat changes from the targets.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		onHit(target, source, move) {
			// Remove positive Inspirits
			const toRemove = Object.keys(target.volatiles).filter(volatile => {
				const condition = this.dex.conditions.get(volatile);
				return (condition as any).isInspirit === true && (condition as any).isGood === true;
			});
			for (const volatile of toRemove) {
				target.removeVolatile(volatile);
			}
			// Clear positive stat boosts
			const drops: SparseBoostsTable = {};
			for (const boostName in target.boosts) {
				if (target.boosts[boostName as BoostID] > 0) {
					drops[boostName as BoostID] = -target.boosts[boostName as BoostID];
				}
			}
			this.boost(drops, target, source);
		},
		secondary: null,
		target: "allFoes",
		type: "Dark",
	},
	superhorncrash: {
		accuracy: 100,
		basePower: 225,
		category: "Physical",
		name: "Super Horn Crash",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {head: 1, protect: 1, soultimate: 1},
		secondary: null,
		target: "any",
		type: "Bug",
	},
	superbitetwin: {
		accuracy: 100,
		basePower: 22,
		category: "Physical",
		name: "Superbite Twin",
		shortDesc: "Hits 7 times.",
		desc: "Hits 7 times.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		multihit: 7,
		secondary: null,
		target: "allFoes",
		type: "Normal",
	},
	sushiyamastrike: {
		accuracy: 75,
		basePower: 200,
		category: "Physical",
		name: "Sushiyama Strike",
		shortDesc: "High critical hit ratio.",
		desc: "High critical hit ratio.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		critRatio: 2,
		secondary: null,
		target: "any",
		type: "Fighting",
	},
	suspiciouseyes: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Suspicious Eyes",
		shortDesc: "After attacking, affected Yo-kai will also attack an ally.",
		desc: "After attacking, affected Yo-kai will also attack an ally.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'suspiciouseyes',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Suspicious Eyes');
			},
			onAfterMoveSecondarySelf(pokemon, target, move) {
				if (target.isAlly(pokemon)) return;
				const allies = pokemon.adjacentAllies();
				if (!allies.length || move.category === 'Status') return;
				const allyTarget = this.sample(allies);
				this.add('-message', `${pokemon.name} got suspicious and attacked an ally!`);
				const validTargetTypes = ['normal', 'any'];
				const moveToUse = validTargetTypes.includes(move.target) ? move : this.dex.getActiveMove('bash');
				this.actions.useMove(moveToUse, pokemon, allyTarget);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Suspicious Eyes', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Inspirit",
	},
	tableflip: {
		accuracy: 100,
		basePower: 270,
		category: "Physical",
		name: "Table Flip",
		shortDesc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		desc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		volatileStatus: 'soultimateblocked',
		onHit(target, source, move) {
			target.soultimateCharge = Math.max(0, target.soultimateCharge - 3);
		},
		secondary: null,
		target: "any",
		type: "Electric",
	},
	tempertantrum: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Temper Tantrum",
		shortDesc: "100% chance to Flinch.",
		desc: "100% chance to Flinch.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		target: "allFoes",
		type: "Fire",
	},
	theguillotine: {
		accuracy: 100,
		basePower: 300,
		category: "Physical",
		name: "The Guillotine",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {head: 1, protect: 1, soultimate: 1},
		secondary: null,
		target: "any",
		type: "Bug",
	},
	thinkevil: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Think Evil",
		shortDesc: "Lowers targets' Defense 2 stages.",
		desc: "Lowers targets' Defense 2 stages.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: {
			chance: 100,
			boosts: {
				def: -2,
			},
		},
		target: "allFoes",
		type: "Dark",
	},
	thirdeye: {
		accuracy: 100,
		basePower: 155,
		category: "Special",
		name: "Third Eye",
		shortDesc: "Heals user and allies for 25% of the damage dealt.",
		desc: "Heals user and allies for 25% of the damage dealt, split evenly between all targets.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {heal: 1, protect: 1, soultimate: 1},
		onDamagingHit(damage, target, source, move) {
			const recipients = source.alliesAndSelf().filter(p => !p.fainted);
			const healAmount = Math.floor(damage * 0.25 / recipients.length);
			for (const recipient of recipients) {
				this.heal(healAmount, recipient, source);
			}
		},
		secondary: null,
		target: "allFoes",
		type: "Drain",
	},
	thornythwacks: {
		accuracy: 100,
		basePower: 23,
		category: "Physical",
		name: "Thorny Thwacks",
		shortDesc: "Hits 7 times.",
		desc: "Hits 7 times.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		multihit: 7,
		secondary: null,
		target: "allFoes",
		type: "Poison",
	},
	tickettohades: {
		accuracy: 75,
		basePower: 240,
		category: "Physical",
		name: "Ticket to Hades",
		shortDesc: "High critical hit ratio.",
		desc: "High critical hit ratio.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		critRatio: 2,
		secondary: null,
		target: "allFoes",
		type: "Ghost",
	},
	tidalguard: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Tidal Guard",
		shortDesc: "User's Defense is 2x and foes are forced to target it.",
		desc: "User's Defense is 2x and foes are forced to target it.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, soultimate: 1},
		volatileStatus: 'tidalguard',
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Tidal Guard');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(2);
			},
			onFoeRedirectTargetPriority: 3,
			onFoeRedirectTarget(target, source, source2, move) {
				if (!this.effectState.target.isSkyDropped() && this.validTarget(this.effectState.target, source, move.target)) {
					if (move.smartTarget) move.smartTarget = false;
					this.debug("Tidal Guard redirected target of move");
					return this.effectState.target;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Tidal Guard', '[silent]');
			},
		},
		secondary: null,
		target: "self",
		type: "Inspirit",
	},
	timidboo: {
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		name: "Timid Boo",
		shortDesc: "Affected Yo-kai lose 1/8 max HP each turn.",
		desc: "Affected Yo-kai lose 1/8 max HP each turn.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'timidboo',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Timid Boo');
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				this.damage(Math.floor(pokemon.baseMaxhp / 8), pokemon);
				this.add('-message', `${pokemon.name} was hurt by uh magic or something idk man`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Timid Boo', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Dark",
	},
	tonothunder: {
		accuracy: 100,
		basePower: 180,
		category: "Special",
		name: "Ton o' Thunder",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Electric",
	},
	toothpickrainfall: {
		accuracy: 100,
		basePower: 23,
		category: "Physical",
		name: "Toothpick Rainfall",
		shortDesc: "Hits 7 times.",
		desc: "Hits 7 times.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		multihit: 7,
		secondary: null,
		target: "allFoes",
		type: "Fighting",
	},
	torrentslash: {
		accuracy: 100,
		basePower: 180,
		category: "Special",
		name: "Torrent Slash",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Water",
	},
	totalcollapse: {
		accuracy: 100,
		basePower: 300,
		category: "Physical",
		name: "Total Collapse",
		shortDesc: "The user faints after using this move.",
		desc: "The user faints after using this move.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		selfdestruct: "always",
		secondary: null,
		target: "allFoes",
		type: "Ground",
	},
	toxicgas: {
		accuracy: 80,
		basePower: 0,
		category: "Status",
		name: "Toxic Gas",
		shortDesc: "Affected Yo-kai's Speed is 0.25x, and they lose 1/8 max HP each turn.",
		desc: "Affected Yo-kai's Speed is 0.25x, and they lose 1/8 max HP each turn.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'toxicgas',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Toxic Gas');
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.25);
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				this.damage(Math.floor(pokemon.baseMaxhp / 8), pokemon);
				this.add('-message', `${pokemon.name} is choking on the gas!`);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Toxic Gas', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Inspirit",
	},
	tremblingsmack: {
		accuracy: 100,
		basePower: 155,
		category: "Physical",
		name: "Trembling Smack",
		shortDesc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		desc: "Prevents the target from using its Soultimate this turn and removes 3 points from its Soultimate charge.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		volatileStatus: 'soultimateblocked',
		onHit(target, source, move) {
			target.soultimateCharge = Math.max(0, target.soultimateCharge - 3);
		},
		secondary: null,
		target: "any",
		type: "Fighting",
	},
	twistedlove: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Twisted Love",
		shortDesc: "Heals the user and its allies a ton.",
		desc: "Heals the user and its allies according to the following formula: Healing = (210 * (User's Spirit / 2)) / 100.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {heal: 1, soultimate: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Recover', target);
		},
		onHit(target, source, move) {
			const healing = Math.floor((210 * Math.floor(source.getStat('spa') / 2)) / 100);
			this.heal(healing, target, source);
		},
		secondary: null,
		target: "allies",
		type: "Restoration",
	},
	typhoonfan: {
		accuracy: 100,
		basePower: 180,
		category: "Special",
		name: "Typhoon Fan",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Flying",
	},
	uherholdon: {
		accuracy: 80,
		basePower: 100,
		category: "Physical",
		name: "Uh, Er... Hold On.",
		shortDesc: "Affected Yo-kai have a 50% chance to Loaf each turn.",
		desc: "Affected Yo-kai have a 50% chance to Loaf each turn.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'uherholdon',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Uh, Er... Hold On.');
				if (!pokemon.volatiles['loafing']) pokemon.addVolatile('loafing');
				pokemon.volatiles['loafing'].loafChance += 50;
			},
			onEnd(pokemon) {
				if (!pokemon.volatiles['loafing']) {
					this.add('-end', pokemon, 'Uh, Er... Hold On.', '[silent]');
					return;
				}
				pokemon.volatiles['loafing'].loafChance -= 50;
				if (pokemon.volatiles['loafing'].loafChance <= 0) pokemon.removeVolatile('loafing');
				this.add('-end', pokemon, 'Uh, Er... Hold On.', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Ghost",
	},
	ultrasumostomp: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Ultra Sumo Stomp",
		shortDesc: "User's Defense is 2x and foes are forced to target it.",
		desc: "User's Defense is 2x and foes are forced to target it.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, soultimate: 1},
		volatileStatus: 'ultrasumostomp',
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Ultra Sumo Stomp');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(2);
			},
			onFoeRedirectTargetPriority: 3,
			onFoeRedirectTarget(target, source, source2, move) {
				if (!this.effectState.target.isSkyDropped() && this.validTarget(this.effectState.target, source, move.target)) {
					if (move.smartTarget) move.smartTarget = false;
					this.debug("Ultra Sumo Stomp redirected target of move");
					return this.effectState.target;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Ultra Sumo Stomp', '[silent]');
			},
		},
		secondary: null,
		target: "self",
		type: "Inspirit",
	},
	undyingdrain: {
		accuracy: 100,
		basePower: 210,
		category: "Special",
		name: "Undying Drain",
		shortDesc: "Heals user and allies for 25% of the damage dealt.",
		desc: "Heals user and allies for 25% of the damage dealt, split evenly between all targets.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {heal: 1, protect: 1, soultimate: 1},
		onDamagingHit(damage, target, source, move) {
			const recipients = source.alliesAndSelf().filter(p => !p.fainted);
			const healAmount = Math.floor(damage * 0.25 / recipients.length);
			for (const recipient of recipients) {
				this.heal(healAmount, recipient, source);
			}
		},
		secondary: null,
		target: "allFoes",
		type: "Drain",
	},
	unwakingdream: {
		accuracy: 100,
		basePower: 140,
		category: "Physical",
		name: "Unwaking Dream",
		shortDesc: "Affected Yo-kai's stats are 0.8x.",
		desc: "Affected Yo-kai's Strength, Spirit, Defense, and Speed are 0.8x.",
		pp: 1,
		soultimateMaxCharge: 10,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'unwakingdream',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Unwaking Dream');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(0.8);
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(0.8);
			},
			onModifySpAPriority: 3,
			onModifySpA(spa, pokemon) {
				return this.chainModify(0.8);
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.8);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Unwaking Dream', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Psychic",
	},
	vengeance: {
		accuracy: 100,
		basePower: 200,
		category: "Physical",
		name: "Vengeance",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "any",
		type: "Dark",
	},
	venoconda: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Venoconda",
		shortDesc: "100% chance to Poison.",
		desc: "100% chance to Poison.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: {
			chance: 100,
			status: 'psn',
		},
		target: "allFoes",
		type: "Poison",
	},
	venomousfeint: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Venomous Feint",
		shortDesc: "Halves the affected Yo-kai's Strength and Poisons them.",
		desc: "Halves the affected Yo-kai's Strength and Poisons them.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'venomousfeint',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Venomous Feint');
				pokemon.trySetStatus('psn', pokemon, 'move: Venomous Feint');
			},
			onModifyAtkPriority: 3,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Venomous Feint', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Inspirit",
	},
	wanderingworld: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Wandering World",
		shortDesc: "100% chance to Curse.",
		desc: "100% chance to Curse.",
		pp: 1,
		soultimateMaxCharge: 8,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: {
			chance: 100,
			volatileStatus: 'curse',
		},
		target: "allFoes",
		type: "Psychic",
	},
	wigglingwave: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Wiggling Wave",
		shortDesc: "Affected Yo-kai's Defense is 2x and they restore 1/8 max HP each turn.",
		desc: "Affected Yo-kai's Defense is 2x and they restore 1/8 max HP each turn.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {heal: 1, inspirit: 1, soultimate: 1},
		volatileStatus: 'wigglingwave',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Wiggling Wave');
			},
			onModifyDefPriority: 3,
			onModifyDef(def, pokemon) {
				return this.chainModify(2);
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(Math.floor(pokemon.baseMaxhp / 8), pokemon);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Wiggling Wave', '[silent]');
			},
		},
		secondary: null,
		target: "allies",
		type: "Inspirit",
	},
	wildzaps: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Wild Zaps",
		shortDesc: "No additional effect.",
		desc: "No additional effect.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: null,
		target: "allFoes",
		type: "Electric",
	},
	windrun: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Wind Run",
		shortDesc: "Sets Tailwind on the user's side. Affected Yo-kai's Speed is 2x.",
		desc: "Sets Tailwind on the user's side. Affected Yo-kai's Speed is 2x.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, soultimate: 1},
		volatileStatus: 'windrun',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Wind Run');
				if (!pokemon.side.sideConditions['tailwind']) {
					pokemon.side.addSideCondition('tailwind', pokemon);
				}
			},
			onModifySpePriority: 3,
			onModifySpe(spe, pokemon) {
				return this.chainModify(2);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Wind Run', '[silent]');
			},
		},
		secondary: null,
		target: "allies",
		type: "Inspirit",
	},
	wuwuzzat: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Wuwuzzat?",
		shortDesc: "Removes positive Inspirits and clears positive stat changes from the targets.",
		desc: "Removes positive Inspirits and clears positive stat changes from the targets.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		onHit(target, source, move) {
			// Remove positive Inspirits
			const toRemove = Object.keys(target.volatiles).filter(volatile => {
				const condition = this.dex.conditions.get(volatile);
				return (condition as any).isInspirit === true && (condition as any).isGood === true;
			});
			for (const volatile of toRemove) {
				target.removeVolatile(volatile);
			}
			// Clear positive stat boosts
			const drops: SparseBoostsTable = {};
			for (const boostName in target.boosts) {
				if (target.boosts[boostName as BoostID] > 0) {
					drops[boostName as BoostID] = -target.boosts[boostName as BoostID];
				}
			}
			this.boost(drops, target, source);
		},
		secondary: null,
		target: "allFoes",
		type: "Psychic",
	},
	yawnehameha: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Yawnehameha",
		shortDesc: "Affected Yo-kai have a 33% chance to Loaf each turn.",
		desc: "Affected Yo-kai have a 33% chance to Loaf each turn.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {inspirit: 1, protect: 1, soultimate: 1},
		volatileStatus: 'yawnehameha',
		condition: {
			isInspirit: true,
			isGood: false,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Yawnehameha');
				if (!pokemon.volatiles['loafing']) pokemon.addVolatile('loafing');
				pokemon.volatiles['loafing'].loafChance += 33;
			},
			onEnd(pokemon) {
				if (!pokemon.volatiles['loafing']) {
					this.add('-end', pokemon, 'Yawnehameha', '[silent]');
					return;
				}
				pokemon.volatiles['loafing'].loafChance -= 33;
				if (pokemon.volatiles['loafing'].loafChance <= 0) pokemon.removeVolatile('loafing');
				this.add('-end', pokemon, 'Yawnehameha', '[silent]');
			},
		},
		secondary: null,
		target: "allFoes",
		type: "Normal",
	},
	yawnehamehax: {
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		name: "Yawnehameha X",
		shortDesc: "Lowers targets' Defense 2 stages.",
		desc: "Lowers targets' Defense 2 stages.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		secondary: {
			chance: 100,
			boosts: {
				def: -2,
			},
		},
		target: "allFoes",
		type: "Normal",
	},
	zanyzone: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Zany Zone",
		shortDesc: "Affected Yo-kai restore 1/5 max HP each turn.",
		desc: "Affected Yo-kai restore 1/5 max HP each turn.",
		pp: 1,
		soultimateMaxCharge: 4,
		priority: 0,
		flags: {heal: 1, inspirit: 1, soultimate: 1},
		volatileStatus: 'zanyzone',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, 'Dragon Cheer', target);
		},
		condition: {
			isInspirit: true,
			isGood: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Zany Zone');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(Math.floor(pokemon.baseMaxhp / 5), pokemon);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Zany Zone', '[silent]');
			},
		},
		secondary: null,
		target: "allies",
		type: "Inspirit",
	},
	zerberkerslash: {
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		name: "Zerberker Slash",
		shortDesc: "Hits 10 times.",
		desc: "Hits 10 times.",
		pp: 1,
		soultimateMaxCharge: 6,
		priority: 0,
		flags: {protect: 1, soultimate: 1},
		multihit: 10,
		secondary: null,
		target: "allFoes",
		type: "Fire",
	},
	
	// Moves called by abilities / other effects

	bash: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Bash",
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	slash: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Slash",
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
};