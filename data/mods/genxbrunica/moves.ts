export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	//New Brunician moves
	cruelstrike: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Cruel Strike",
		desc: "Has a 100% chance to lower the target's Defense by 1 stage. Fails unless it is the user's first turn on the field.",
		shortDesc: "100% lower target's Defense by 1. First turn out only.",
		pp: 5,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Darkest Lariat');
		},
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Cruel Strike only works on your first turn out.");
				return false;
			}
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Dark",
	},
	icyend: {
		accuracy: 100,
		basePower: 25,
		category: "Special",
		name: "Icy End",
		desc: "Power triples if the target has less than or equal to half of its maximum HP remaining.",
		shortDesc: "Usually goes first. x3 power if target's HP 50% or less.",
		pp: 5,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower, pokemon, target) {
			if (target.hp * 2 <= target.maxhp) {
				return this.chainModify(3);
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Sheer Cold');
		},
		secondary: null,
		target: "normal",
		type: "Ice",
	},
	gaiarecovery: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Gaia Recovery",
		desc: "Raises the user's Attack and Special Attack by 1 stage. The user restores 1/2 of its maximum HP, rounded half up.",
		shortDesc: "Heals user by 50%. Raises its Atk and Sp. Atk by 1.",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Synthesis');
		},
		heal: [1, 2],
		boosts: {
			atk: 1,
			spa: 1,
		},
		secondary: null,
		target: "self",
		type: "Grass",
	},
	gemdevour: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Gem Devour",
		desc: "This move's type effectiveness against Rock is changed to be super effective no matter what this move's type is.",
		shortDesc: "Super effective on Rock.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, bite: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Bug Bite');
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Rock') return 1;
		},
		target: "normal",
		type: "Rock",
		contestType: "Beautiful",
	},
	overcharge: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Overcharge",
		desc: "This attack charges on the first turn and executes on the second. If the user is hit by a damaging move while charging, the attacker is paralyzed.",
		shortDesc: "Charges turn 1. Hits turn 2. Paralyzes attackers while charging.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, charge: 1, protect: 1, mirror: 1, metronome: 1, nosleeptalk: 1, failinstruct: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Wild Charge');
		},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			
			this.add('-anim', attacker, "Charge", attacker);
			return null;
		},
		condition: {
			onHit(target, source, move) {
				if (target.volatiles['twoturnmove']) {
					source.trySetStatus('par', target);
				} else {
					target.removeVolatile('overcharge');
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Electric",
	},
	bladerunner: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Blade Runner",
		desc: "Has a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Smart Strike');
		},
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	bullybash: {
		accuracy: 80,
		basePower: 100,
		category: "Physical",
		name: "Bully Bash",
		desc: "Has a 20% chance to make the target flinch.",
		shortDesc: "20% chance to make the target flinch.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Dragon Rush');
		},
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},
	outcry: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Outcry",
		desc: "No additional effect.",
		shortDesc: "No additional effect. Hits foe(s).",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Snarl');
		},
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Dark",
	},
	psybolt: {
		accuracy: 70,
		basePower: 110,
		category: "Special",
		name: "Psy Bolt",
		desc: "Has a 30% chance to confuse the target. If the terrain is Psychic Terrain, this move does not check accuracy.",
		shortDesc: "30% chance to confuse target. Can't miss in Psychic Terrain.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Psycho Boost');
		},
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1, metronome: 1},
		onModifyMove(move, pokemon, target) {
			if (this.field.isTerrain('psychicterrain')) {
				move.accuracy = true;
			}
		},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		target: "any",
		type: "Psychic",
	},
	snowbank: {
		accuracy: 100,
		basePower: 80,
		name: "Snowbank",
		desc: "If this move is successful, the target experiences the effects of all entry hazards on its side of the field, unless its held item is Heavy-Duty Boots or its ability is Keen Eye.",
		shortDesc: "Target takes hazard damage after being hit by this move.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Ice Spinner');
		},
		onAfterHit(target, source) {
			this.runEvent('EntryHazard',target);
		},
		secondary: null,
		target: "normal",
		type: "Ice",
	},
	smokebomb: {
		accuracy: 95,
		basePower: 90,
		category: "Special",
		name: "Smoke Bomb",
		desc: "Has a 10% chance to burn the target and a 20% chance to lower its accuracy by 1 stage.",
		shortDesc: "10% to burn. 20% to lower target's acc. by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Smoke Screen');
		},
		secondaries: [
			{
				chance: 10,
				status: 'brn',
			}, {
				chance: 20,
				boosts: {
					accuracy: -1,
				},
			},
		],
		target: "normal",
		type: "Fire",
	},
	joustinglance: {
		accuracy: 80,
		basePower: 150,
		category: "Physical",
		name: "Jousting Lance",
		desc: "If the target lost HP, the user takes recoil damage equal to 1/2 the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 1/2 recoil.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Head Smash');
		},
		recoil: [1, 2],
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	torchtail: {
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Torch Tail",
		desc: "Has a 10% chance to burn the target and a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio. 10% chance to burn.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Fire Lash');
		},
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		critRatio: 2,
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
	},
	clarentcleave: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Clarent Cleave",
		desc: "This move ignores the Fairy type's immunity to Dragon. Its type effectiveness against Fairy is changed to be super effective no matter what this move's type is.",
		shortDesc: "Hits and is super effective on Fairy.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, slicing: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Ceaseless Edge');
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Fairy') return 1;
		},
		ignoreImmunity: {'Dragon': true},
		secondary: null,
		target: "normal",
		type: "Dragon",
		zMove: {basePower: 180},
	},
	disconnect: {
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		name: "Disconnect",
		desc: "Has a 100% chance to lower the target's Defense by 1 stage. Cannot be selected the turn after it's used.",
		shortDesc: "100% lower target's Def 1. Can't be used consecutively.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, cantusetwice: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Wild Charge');
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Electric",
	},
	sleepdrain: {
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Sleep Drain",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If the target is sleeping, it instead recovers 3/4 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User heals 50% damage dealt, 75% instead if target asleep.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Dream Eater');
		},
		onModifyMove(move, pokemon, target) {
			if (target && target.status === 'slp') {
				move.drain = [3,4];
			}
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	healingnature: {
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Healing Nature",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. This move's type effectiveness against Poison is changed to be super effective no matter what this move's type is. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "Super effective on Poison. User heals 50% of damage dealt.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Seed Flare');
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Poison') return 1;
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Grass",
	},
	spectralbeam: {
		accuracy: 80,
		basePower: 120,
		category: "Special",
		name: "Spectral Beam",
		desc: "Has a 10% chance to lower the target's Special Defense by 1 stage.",
		shortDesc: "10% chance to lower the target's Sp. Def by 1.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Dragon Fang');
		},
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Ghost",
	},
	malevolentmaul: {
		accuracy: 80,
		basePower: 120,
		category: "Physical",
		name: "Malevolent Maul",
		desc: "Has a 30% chance to inflict a Curse that damages the target for 25% of its maximum HP, rounded down, at the end of each turn while the target remains active. If the target uses Baton Pass, the replacement will continue to be affected. Inflicting the curse does not consume the user's HP.",
		shortDesc: "30% chance to Curse the target.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1, bite: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Jaw Lock');
		},
		secondary: {
			chance: 30,
			volatileStatus: 'curse',
		},
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
	},
	filletaway: {
		inherit: true,
		desc: "Raises the user's Attack, Special Attack, and Speed by 3 stages in exchange for the user losing 1/3 of its maximum HP, rounded down. Fails if the user would faint or if its Attack, Special Attack, and Speed stat stages would not change.",
		shortDesc: "+3 Attack, Sp. Atk, Speed for 1/3 user's max HP.",
		onTry(source) {
			if (source.hp <= source.maxhp / 3 || source.maxhp === 1) return false;
		},
		onHit(pokemon) {
			this.directDamage(pokemon.maxhp / 3);
		},
		boosts: {
			atk: 3,
			spa: 3,
			spe: 3,
		},
	},
	refracture: {
		accuracy: 95,
		basePower: 85,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.volatiles['rockpolish']) {
				this.debug('Rock Polish into Refracture damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		desc: "Has a 40% chance to lower the target's accuracy by 1 stage. If the user had used Rock Polish previously, then this move doubles in power.",
		shortDesc: "40% to lower target's accuracy by 1.",
		category: "Special",
		name: "Refracture",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Luster Purge');
		},
		secondary: {
			chance: 40,
			boosts: {
				accuracy: -1,
			},
		},
		target: "normal",
		type: "Rock",
	},
	reefraze: {
		accuracy: 90,
		basePower: 65,
		category: "Special",
		name: "Reef Raze",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		desc: "If this move is successful, it sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate or Keen Eye Abilities. A maximum of three layers may be set, and opponents lose 1/8 of their maximum HP with one layer, 1/6 of their maximum HP with two layers, and 1/4 of their maximum HP with three layers, all rounded down. Can be removed from the opposing side if any opposing Pokemon uses Mortal Spin, Rapid Spin, Defog, or Tectonic Shift successfully, is hit by Defog, or has the ability Traveler and switches in.",
		shortDesc: "Sets a layer of Spikes on the opposing side.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Aqua Cutter');
		},
		onAfterHit(target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('spikes');
				}
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('spikes');
				}
			}
		},
		secondary: {}, // Sheer Force-boosted
		target: "normal",
		type: "Water",
	},
	thorntail: {
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Thorn Tail",
		desc: "Has a 10% chance to inflict Leech Seed on the target and a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio. 10% chance to inflict Leech Seed.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Ivy Cudgel');
		},
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		critRatio: 2,
		onModifyMove(move, pokemon, target) {
			if (!target.hasType('Grass')) {
				(move.secondaries ||= []).push({chance: 10, volatileStatus: 'leechseed'});
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
	},
	tailsmash: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Has a 100% chance to lower the target's Defense by 1 stage.",
		shortDesc: "100% chance to lower the target's Defense by 1.",
		isViable: true,
		name: "Tail Smash",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Ivy Cudgel Rock');
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Rock",
	},
	dragonsdrone: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "Has a 20% chance to confuse the target.",
		shortDesc: "20% chance to confuse the foe(s).",
		name: "Dragon's Drone",
		pp: 10,
		priority: 0,
		flags: {sound: 1, protect: 1, mirror: 1, bypasssub: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Clanging Scales');
		},
		secondary: {
			chance: 20,
			volatileStatus: 'confusion',
		},
		target: "allAdjacentFoes",
		type: "Dragon",
	},
	mindlance: {
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		desc: "After using this move, for 3 turns, the user cannot avoid any attacks made against it, other than OHKO moves, as long as it remains active. During the effect, the user is immune to Ground-type attacks and the effects of Spikes, Toxic Spikes, Sticky Web, and the Arena Trap Ability as long as it remains active. If the user uses Baton Pass while under this effect, the replacement will gain the effect. Ingrain, Smack Down, Thousand Arrows, and Iron Ball negate this effect. The user will not gain this effect if its species is Diglett, Dugtrio, Alolan Diglett, Alolan Dugtrio, Sandygast, Palossand, or Gengar while Mega-Evolved. Mega Gengar cannot be under this effect by any means.",
		shortDesc: "Applies Telekinesis to the user if successful.",
		name: "Mind Lance",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Psycho Boost');
		},
		self: {
			volatileStatus: 'telekinesis',
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	lratio: {
		accuracy: true,
		basePower: 90,
		category: "Special",
		desc: "This move does not check accuracy. Has a 20% chance to lower the target's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage. This move becomes a physical attack that makes contact if the value of ((((2 * the user's level / 5 + 2) * 90 * X) / Y) / 50), where X is the user's Attack stat and Y is the target's Defense stat, is greater than the same value where X is the user's Special Attack stat and Y is the target's Special Defense stat. Otherwise, it becomes a Wind attack. No stat modifiers other than stat stage changes are considered for this purpose. If the two values are equal, this move chooses a damage category at random.",
		shortDesc: "Can't miss. 20% -1 all foe(s) stats. Physical+Contact if stronger, else Wind.",
		name: "L+Ratio",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
		onPrepareHit(target, source, move) {
			if (!source.isAlly(target)) {
				this.attrLastMove('[anim] ' + (move.category === 'Physical' ? 'Zen Headbutt' : 'Hurricane'));
			}
		},
		onModifyMove(move, pokemon, target) {
			if (!target) return;
			const atk = pokemon.getStat('atk', false, true);
			const spa = pokemon.getStat('spa', false, true);
			const def = target.getStat('def', false, true);
			const spd = target.getStat('spd', false, true);
			const physical = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * atk) / def) / 50);
			const special = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * spa) / spd) / 50);
			if (physical > special || (physical === special && this.random(2) === 0)) {
				move.category = 'Physical';
				move.flags.contact = 1;
			} else {
				move.flags.wind = 1;
			}
		},
		onHit(target, source, move) {
			// Shell Side Arm normally reveals its category via animation on cart, but doesn't play either custom animation against allies
			if (!source.isAlly(target)) this.hint(move.category + " L+Ratio");
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!source.isAlly(target)) this.hint(move.category + " L+Ratio");
		},
		secondary: {
			chance: 20,
			boosts: {
				atk: -1,
				def: -1,
				spa: -1,
				spd: -1,
				spe: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Fairy",
	},
	goldenrush: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Golden Rush",
		desc: "Raises the Attack, Defense, Special Attack, and Special Defense of the Pokemon in the target's position by two stages two turns after this move is used. Fails if this move, Future Sight, Doom Desire, or Idle Thunder is already in effect for the target's position.",
		shortDesc: "+2 Atk/Def/SpA/SpD to allied position two turns after being used.",
		pp: 5,
		priority: 0,
		flags: {allyanim: 1, metronome: 1, futuremove: 1},
		ignoreImmunity: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'goldenrush',
				source: source,
				moveData: {
					id: 'goldenrush',
					name: "Golden Rush",
					accuracy: true,
					basePower: 0,
					category: "Status",
					priority: 0,
					flags: {allyanim: 1, metronome: 1, futuremove: 1},
					effectType: 'Move',
					type: 'Ground',
					boosts: {
						atk: 2,
						def: 2,
						spa: 2,
						spd: 2,
					},
				},
			});
			this.add('-start', source, 'move: Golden Rush');
			this.add('-message', `${source.name} has started a Gold Rush!`);
			return this.NOT_FAIL;
		},
		boosts: {
			atk: 2,
			def: 2,
			spa: 2,
			spd: 2,
		},
		secondary: null,
		target: "adjacentAllyOrSelf",
		type: "Ground",
	},
	
	//Balm Moves
	magneticupdraft: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Magnetic Updraft",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, wind: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. For 3 turns, the target cannot avoid any attacks made against it, other than OHKO moves, as long as it remains active. During the effect, the target is immune to Ground-type attacks and the effects of Spikes, Toxic Spikes, Sticky Web, and the Arena Trap Ability as long as it remains active. If the target uses Baton Pass, the replacement will gain the effect. Ingrain, Smack Down, Thousand Arrows, and Iron Ball override this move if the target is under any of their effects. Fails if the target is already under this effect or the effects of Ingrain, Smack Down, Thousand Arrows, or Leaping Onrush. The target is immune to this added effect if its species is Diglett, Dugtrio, Alolan Diglett, Alolan Dugtrio, Sandygast, Palossand, or Gengar while Mega-Evolved. Mega Gengar cannot be under this effect by any means.",
		shortDesc: "x1.5 base move power. 3 turns: Target floats but moves can't miss it.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Wildbolt Storm');
		},
		volatileStatus: 'telekinesis',
		secondary: null,
		target: "normal",
		type: "Flying",
	},
	leapingonrush: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Leaping Onrush",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, contact: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. If this move hits a target under the effect of Bounce, Fly, Magnet Rise, or Telekinesis, the effect ends. If the target is a Flying type that has not used Roost this turn or a Pokemon with the Levitate Ability, it loses its immunity to Ground-type attacks and the Arena Trap Ability as long as it remains active. During the effect, Magnet Rise fails for the target and Telekinesis fails against the target.",
		shortDesc: "x1.5 base move power. Removes target's Ground immunity.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Headlong Rush');
		},
		volatileStatus: 'smackdown',
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
	cupricdeluge: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Cupric Deluge",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. If this move is successful, it sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in. Foes lose 1/32, 1/16, 1/8, 1/4, or 1/2 of their maximum HP, rounded down, based on their weakness to the Steel type; 0.25x, 0.5x, neutral, 2x, or 4x, respectively. Can be removed from the opposing side if any opposing Pokemon uses Mortal Spin, Rapid Spin, or Defog successfully, or is hit by Defog.",
		shortDesc: "x1.5 base move power. Foes: Steel hazard.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Thousand Waves');
		},
		onAfterHit(target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('gmaxsteelsurge');
				}
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('gmaxsteelsurge');
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	divebomb: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Dive Bomb",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. After the move lands, it the target to become a Water type unless the target is an Arceus or a Silvally, the target is already purely Water type, the target is Terastallized, or the target is using a Type Balm.",
		shortDesc: "x1.5 base move power. Target's type becomes Water.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Wave Crash');
		},
		secondary: {
			chance: 100,
			onHit(target) {
				if (target.getTypes().join() !== 'Water' && target.setType('Water')) {
					this.add('-start', target, 'typechange', 'Water');
				}
			},
		},
		target: "normal",
		type: "Water",
	},
	muddevourment: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Mud Devourment",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. Ends the effects of Electric Terrain, Grassy Terrain, Misty Terrain, and Psychic Terrain. Does not end the effects of Nature Field",
		shortDesc: "x1.5 base move power. Ends terrain unless Poison Terrain or Nature Field.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Earth Power');
		},
		onAfterHit(target, source) {
			if (source.hp && !this.field.isTerrain(['poisonterrain', 'guardianofnature'])) {
				this.field.clearTerrain();
			}
		},
		onAfterSubDamage(damage, target, source) {
			if (source.hp && !this.field.isTerrain(['poisonterrain', 'guardianofnature'])) {
				this.field.clearTerrain();
			}
		},
		secondary: null,
		target: "normal",
		type: "Ground",
	},
	cloneexpress: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Clone Express",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. Has a 100% chance to confuse the target if it has a non-volatile status condition.",
		shortDesc: "x1.5 base move power. 100% confuse statused target.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Spectral Thief');
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (target.status) {
					target.addVolatile('confusion', source, move);
				}
			},
		},
		target: "normal",
		type: "Ghost",
	},
	adulteration: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Adulteration",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. Causes the target's Ability to be rendered ineffective as long as it remains active. If the target uses Baton Pass, the replacement will remain under this effect. If the target's Ability is As One, Battle Bond, Comatose, Disguise, Gulp Missile, Ice Face, Multitype, Power Construct, RKS System, Schooling, Shields Down, Stance Change, Tera Shift, Zen Mode, Zero to Hero, or Surf's Up, this move fails, and receiving the effect through Baton Pass ends the effect immediately.",
		shortDesc: "x1.5 base move power. Nullifies target's Ability.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Sludge Wave');
		},
		onHit(target) {
			if (!target.getAbility().flags['cantsuppress']) target.addVolatile('gastroacid');
		},
		onAfterSubDamage(damage, target) {
			if (!target.getAbility().flags['cantsuppress']) target.addVolatile('gastroacid');
		},
		secondary: null,
		target: "normal",
		type: "Poison",
	},
	oliverampage: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Olive Rampage",
		pp: 5,
		priority: 1,
		flags: {nosketch: 1, protect: 1, contact: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power.",
		shortDesc: "x1.5 base move power. Usually goes first.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Outrage');
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
	},
	tectonicshift: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Tectonic Shift",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, contact: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. If this move is successful and the user has not fainted, all hazards are removed from the user's side of the field.",
		shortDesc: "x1.5 base move power. Clears hazards on user's side.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Precipice Blades');
		},
		onAfterHit(target, pokemon, move) {
			if (pokemon.hp) {
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Tectonic Shift', '[of] ' + pokemon);
					}
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (pokemon.hp) {
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Tectonic Shift', '[of] ' + pokemon);
					}
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Ground",
	},
	venomousfang: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Venomous Fang",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, contact: 1, bite: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. If this move is successful, the target loses all of its type-based immunities and any moves that the target was formerly immune to are super effective against the respective type instead.",
		shortDesc: "x1.5 base move power. Target's immunities become weaknesses.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Poison Fang');
		},
		volatileStatus: 'venomousfang',
		secondary: null,
		target: "normal",
		type: "Ghost",
		condition: {
			onStart(pokemon) {
				if (pokemon.terastallized) return false;
				this.add('-start', pokemon, 'Venom Aspect');
			},
			onNegateImmunity: false,
			onEffectivenessPriority: -2,
			onEffectiveness(typeMod, target, type, move) {
				//If the type would be immune to the move in a vacuum then it turns super effective
				//(We can't check immunity for the mon itself as it is considered to completely lack immunities)
				if (!this.dex.getImmunity(move.type,type)) {
					return 1;
				}
			}
		},
	},
	ammolitevortex: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Ammolite Vortex",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. This move ignores effectiveness against types that would otherwise resist it. The target is immune if it does not share a type with the user or if it was immune to the move's type to begin with.",
		shortDesc: "x1.5 base move power. Hits targets sharing user's type. Ignores resistances.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Luster Purge');
		},
		onTryImmunity(target, source) {
			return target.hasType(source.getTypes());
		},
		onEffectiveness(typeMod, target, type) {
			if (typeMod < 0) return 0;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	asurabarrage: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Asura Barrage",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, recharge: 1, contact: 1, failcopycat: 1},
		multihit: 3,
		desc: "This move's power is equal to 1.5 times the base move's power. Hits three times. If this move is successful, the user must recharge on the following turn and cannot select a move.",
		shortDesc: "x1.5 base move power. Hits three times. User cannot move next turn.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Hyper Drill');
		},
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: null,
		target: "normal",
		type: "Bug",
	},
	dreadstampede: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Dread Stampede",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, contact: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. Ignores the target's stat stage changes, including evasiveness.",
		shortDesc: "x1.5 base move power. Ignores target's stat changes.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Close Combat');
		},
		ignoreEvasion: true,
		ignoreDefensive: true,
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	vivelerose: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Vive Le\u0301 Rose",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, contact: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. Has a 50% chance to raise the user's Attack and Special Attack by 1 stage each.",
		shortDesc: "x1.5 base move power. 50% raise user's Atk/Sp. Atk by 1.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Petal Dance');
		},
		secondary: {
			chance: 50,
			self: {
				boosts: {
					atk: 1,
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Fairy",
	},
	thunderarmor: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Thunder Armor",
		pp: 5,
		priority: 4,
		flags: {nosketch: 1, cantusetwice: 1, failcopycat: 1},
		desc: "Cannot be selected the turn after it's used. The user and its party members are protected from damaging attacks made by other Pokemon, including allies, during this turn. The next damaging move used by the user will have doubled power. When a contact move is blocked, the attacker is paralyzed. Fails if this move is already in effect for the user's side.",
		shortDesc: "Protects allies from damaging attacks. Contact: paralysis. User's next attack has x2 BP. Cannot be selected the turn after it's used.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Protect');
		},
		sideCondition: 'thunderarmor',
		onTry() {
			return !!this.queue.willAct();
		},
		onHitSide(side, source) {
			source.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onSideStart(target, source) {
				this.add('-singleturn', source, 'Thunder Armor');
				source.addVolatile('thunderarmorboost');
			},
			onTryHitPriority: 4,
			onTryHit(target, source, move) {
				if (move.category === 'Status') return;
				this.add('-activate', target, 'move: Thunder Armor');
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove/*) {
					// Outrage counter is reset
					if (*/&& source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					//}
				}
				if (this.checkMoveMakesContact(move, source, target)) {
					source.trySetStatus('par', target);
				}
				return this.NOT_FAIL;
			},
		},
		target: "allySide",
		type: "Electric",
	},
	mysticburst: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Mystic Burst",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. If Trick Room is not already active when this move is used, it sets up Trick Room.",
		shortDesc: "x1.5 base move power. Sets up Trick Room unless already present.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Psywave');
		},
		onAfterHit(target, source, move) {
			if (!this.field.pseudoWeather.trickroom && !move.hasSheerForce && source.hp) {
				this.field.addPseudoWeather('trickroom');
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!this.field.pseudoWeather.trickroom && !move.hasSheerForce && source.hp) {
				this.field.addPseudoWeather('trickroom');
			}
		},
		secondary: {}, // Sheer Force-boosted
		target: "allAdjacent",
		type: "Psychic",
	},
	violetseed: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Violet Seed",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, failcopycat: 1, bullet: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. This move becomes a critical hit if the target is under the effects of Leech Seed.",
		shortDesc: "x1.5 base move power. Crits seeded targets.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Aura Sphere');
		},
		onModifyMove(move, source, target) {
			if (target.volatiles['leechseed']) {
				move.critRatio = 5;
			}
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Fighting",
	},
	mentalextract: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Mental Extract",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. After using this move, the user prevents all opposing Pokemon from using any moves that the user also knows as long as the user remains active.",
		shortDesc: "x1.5 base move power. Foes can't use user's moves.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Psystrike');
		},
		secondary: {
			chance: 100,
			self: {
				volatileStatus: 'imprison',
			},
		},
		target: "adjacentFoe",
		type: "Psychic",
	},
	discovery: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Discovery",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. Has a 100% chance to raise the user's Special Defense and Speed by 1 stage each.",
		shortDesc: "x1.5 base move power. 100% raise user's SpDef/Speed by 1.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Grassy Glide');
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spd: 1,
					spe: 1,
				},
			},
		},
		target: "adjacentFoe",
		type: "Grass",
	},
	shakingtundra: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Shaking Tundra",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. Has a 100% chance to lower the target's Speed by 1 stage.",
		shortDesc: "x1.5 base move power. 100% lower adjacent Pkmn Speed by 1.",
		onPrepareHit: function(target, source, move) {
				this.attrLastMove('[anim] Earthquake');
		},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "allAdjacent",
		type: "Ground",
	},
	venomdrain: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Venom Drain",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "x1.5 base move power. User heals 50% of damage dealt.",
		onPrepareHit: function(target, source, move) {
			
				this.attrLastMove('[anim] Giga Drain');
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Poison",
	},
	maidenspeak: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Maiden's Peak",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, failcopycat: 1},
		desc: "The first use of this move will boost the user's Special Attack, change its typing to Grass/Water, and replace its ability with Unnerve. Later uses call Hydro Pump.",
		shortDesc: "First use: +1 SpA; become Grass/Water; gain Unnerve. Future calls become Hydro Pump.",
		onPrepareHit: function(target, source, move) {
			if (!source.volatiles['maidenspeak']) {
				this.attrLastMove('[anim] Haze');
			} else {
				this.attrLastMove('[still]');
			}
			
		},
		onTryHit(target, pokemon) {
			if (pokemon.volatiles['maidenspeak']) {
				this.actions.useMove('hydropump',pokemon,target);
			} else {
				pokemon.addVolatile('maidenspeak');
			}
			return null;
		},
		onHitSide(side, source) {
			source.addVolatile('stall');
		},
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Maiden\'s Peak', '[silent]');
				this.add('-message', `${pokemon.name} took the form of Venustoise!`);
				pokemon.setType(['Grass','Water']);
				this.add('-start', pokemon, 'typechange', 'Grass/Water', '[silent]');
				this.boost({spa: 1}, pokemon, pokemon);
				this.add('-ability', pokemon, pokemon.getAbility().name);
				this.add('-ability', pokemon, 'Unnerve', '[from] move: Maiden\'s Peak', '[of] ' + pokemon);
				pokemon.setAbility('unnerve');
				const newMoveSlots = [];
				for (const moveSlot of pokemon.moveSlots) {
					let move = this.dex.moves.get(moveSlot.id);
					if (move.type !== 'Dark' || move.category !== 'Status') {
						newMoveSlots.push(moveSlot);
						continue;
					}
					newMoveSlots.push({
						move: 'Hydro Pump',
						id: 'hydropump',
						pp: 8,
						maxpp: 8,
						target: 'normal',
						disabled: false,
						used: false,
						virtual: true,
					});
				}
				pokemon.moveSlots = newMoveSlots;
			},
		},
		target: "self",
		type: "Dark",
	},
	neuralnetwork: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Neural Network",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "x1.5 base move power. 30% paralyze foe(s). Allies: x2 SpA/SpD until next turn ends.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Discharge');
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		self: {
			onHit(source) {
				for (const pokemon of source.alliesAndSelf()) {
					pokemon.addVolatile('neuralnetwork');
				}
			},
		},
		condition: {
			duration: 2,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Neural Network', '[silent]');
				this.add('-message', `The Balm move supercharged ${pokemon.name}'s Special Attack and Special Defense!`);
			},
			onRestart(pokemon) {
				pokemon.volatiles['neuralnetwork'].duration = 2;
				this.add('-message', `The Balm move supercharged ${pokemon.name}'s Special Attack and Special Defense!`);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa) {
				return this.chainModify(2);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd) {
				return this.chainModify(2);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Neural Network', '[silent]');
			}
		},
		target: "allAdjacentFoes",
		type: "Electric",
	},
	electrifiedjet: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Electrified Jet",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. Has a 30% chance to paralyze the target.",
		shortDesc: "x1.5 base move power. 30% to paralyze the target.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Fusion Bolt');
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Water",
	},
	icebergcrash: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Iceberg Crash",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. Has a 10% chance to freeze the target. This move's type effectiveness against Steel is changed to be super effective no matter what this move's type is.",
		shortDesc: "x1.5 base move power. 10% freeze. Super effective on Steel.",
		onEffectiveness(typeMod, target, type) {
			if (type === 'Steel') return 1;
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Subzero Slammer');
		},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "normal",
		type: "Ice",
	},
	northerncollapse: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Northern Collapse",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, failcopycat: 1},
		desc: "Power is equal to 1.5 times the base move's power, and is multiplied by 1.5 again if the user is heavier than the target. ",
		shortDesc: "x1.5 base move power, x2.25 instead if user heavier than target.",
		onBasePower(basePower, source, target, move) {
			if (target.getWeight() < source.getWeight()) {
				return this.chainModify(1.5);
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Mountain Gale');
		},
		secondary: null,
		target: "normal",
		type: "Ice",
	},
	brightwing: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Bright Wing",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. If the current weather is Sunny Day and the user is not holding a Utility Umbrella, this move has its priority increased by 1.",
		shortDesc: "x1.5 base move power. Sun: +1 Priority.",
		//Priority modifying is in conditions.ts because it didn't work when i coded it here
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Solar Blade');
		},
		secondary: null,
		target: "normal",
		type: "Grass",
	},
	seamonster: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Sea Monster",
		pp: 5,
		priority: -6,
		flags: {nosketch: 1, protect: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. If neither the user nor the target has fainted, the target is forced to switch out and be replaced with a random unfainted ally. This effect fails if the target is under the effects of Ingrain, has the Suction Cups Ability, or this move hit a substitute.",
		shortDesc: "x1.5 base move power. Forces target into random ally.",
		forceSwitch: true,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Dive');
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
	},
	sunblast: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Sunblast",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. If this move is successful, the effect of Sunny Day begins.",
		shortDesc: "x1.5 base move power. Starts Sunny Day.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Solar Beam');
		},
		secondary: {
			chance: 100,
			self: {
				onHit() {
					this.field.setWeather('sunnyday');
				},
			},
		},
		target: "normal",
		type: "Fire",
	},
	spiritualembrace: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Spiritual Embrace",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. If this move is successful, the effect of Sunny Day begins.",
		shortDesc: "x1.5 base move power. Sets target ability to Synchronize.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Seed Flare');
		},
		secondary: {
			chance: 100,
			onHit(target) {
				const oldAbility = target.setAbility('Synchronize');
				if (target.setAbility('Synchronize')) {
					this.add('-ability', target, oldAbility);
					this.add('-ability', target, 'Synchronize', '[from] move: Spiritual Embrace');
				}
			},
		},
		target: "normal",
		type: "Grass",
	},
	gowestyoungfeline: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Go West, Young Feline",
		pp: 10,
		priority: 5,
		flags: {nosketch: 1, failcopycat: 1, reflectable: 1},
		desc: "Causes the target's Ability to become Rattled. Fails if the target's Ability is As One, Battle Bond, Comatose, Disguise, Gulp Missile, Ice Face, Multitype, Power Construct, RKS System, Schooling, Shields Down, Simple, Stance Change, Tera Shift, Truant, Zen Mode, or Zero to Hero.",
		shortDesc: "Always goes first. The target's Ability becomes Rattled.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Uproar');
		},
		onTryHit(target) {
			if (target.getAbility().flags['cantsuppress'] || target.ability === 'rattled') {
				return false;
			}
		},
		onHit(pokemon) {
			const oldAbility = pokemon.setAbility('rattled');
			if (oldAbility) {
				this.add('-ability', pokemon, 'Rattled', '[from] move: Go West, Young Feline');
				return;
			}
			return oldAbility as false | null;
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	'100000voltkahunawave': {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "100,000 Volt Kahuna Wave",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, failcopycat: 1},
		desc: "Power is equal to 1.5 times the base move's power, and further doubles if the target is paralyzed. This move and its effects ignore the Abilities of other Pokemon.",
		shortDesc: "x1.5 base move power, x3 instead on Paralyzed. Ignores abilities.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Electro Drift');
		},
		ignoreAbility: true,
		onBasePower(basePower, pokemon, target) {
			if (target.status === 'par') {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Water",
	},
	furiousflare: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Furious Flare",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. Has a 100% chance to lower the target's Attack, Special Attack, and Speed by 1 stage.",
		shortDesc: "x1.5 base move power; 100% lower target's Atk/SpA/Spe by 1.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Temper Flare');
		},
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
				spa: -1,
				spe: -1,
			},
		},
		target: "normal",
		type: "Fire",
	},
	crypticchill: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Cryptic Chill",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. Prevents the target from switching for four or five turns (seven turns if the user is holding Grip Claw). Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding a Shed Shell, has the Run Away ability, or uses Baton Pass, Drift, Flip Turn, Frost Feint, Parting Shot, Shed Tail, Swindle, Teleport, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field, or if the target uses Mortal Spin, Rapid Spin, or Substitute successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "x1.5 base move power; Traps and damages the target for 4-5 turns.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Bitter Malice');
		},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	sneakysqueeze: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Sneaky Squeeze",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. Prevents the target from switching for four or five turns (seven turns if the user is holding Grip Claw). Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding a Shed Shell, has the Run Away ability, or uses Baton Pass, Drift, Flip Turn, Frost Feint, Parting Shot, Shed Tail, Swindle, Teleport, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field, or if the target uses Mortal Spin, Rapid Spin, or Substitute successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "x1.5 base move power; Traps and damages the target for 4-5 turns.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Constrict');
		},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	pearlofwisdom: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Pearl of Wisdom",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, failcopycat: 1},
		desc: "Power is equal to  (1.5 times the base move's power) + (X*20), where X is the total amount of stats on the user with at least one stat change greater than zero. Having multiple stat positive changes to the same stat will still only contribute 20 power.",
		shortDesc: "x1.5 base move power, then +20 for each boosted stat.",
		onBasePower(basePower, pokemon, target) {
			let boost: BoostID;
			for (boost in pokemon.boosts) {
				if (pokemon.boosts[boost] > 0) basePower += 20;
			}
			return basePower;
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Power Gem');
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	lusciouslake: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Luscious Lake",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, failcopycat: 1},
		desc: "This move's power is equal to 1.5 times the base move's power. For 5 turns, all Fire-type attacks used by any active Pokemon have their power multiplied by 0.33. If used while Grassy Terrain or Nature Field is active, then upon using this move a swamp appears on the target's side for 4 turns, which quarters the Speed of each Pokemon on that side.",
		shortDesc: "x1.5 base move power; Sets Water Sport and (in Grassy Terrain) swamp.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Seed Flare');
		},
		pseudoWeather: 'watersport',
		onModifyMove(move) {
			if (this.field.isTerrain(['grassyterrain','guardianofnature'])) {
				move.sideCondition = 'grasspledge';
			}
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Grass",
	},
	prolificplow: {
		accuracy: true,
		basePower: 1,
		category: "Physical",
		name: "Prolific Plow",
		pp: 5,
		priority: 0,
		flags: {nosketch: 1, protect: 1, failcopycat: 1},
		desc: "Power is equal to 1.5 times the base move's power. Raises the Attack, Special Attack, and Speed of all active Grass-type Pokemon on the field by 2 stages if Grassy Terrain or Nature Field is active or 1 stage if not.",
		shortDesc: "x1.5 base move power; +1 Atk/SpA/Spe to Grass-types, +2 instead in Grassy Terrain",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Land\'s Wrath');
		},
		onAfterHit(target, source, move) {
			const targets: Pokemon[] = [];
			const boost = this.field.isTerrain(['grassyterrain','guardianofnature']) ? 2 : 1;
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasType('Grass')) {
					// This move affects every Grass-type Pokemon in play.
					this.boost(pokemon.isGrounded() ? {atk: boost, spa: boost, spe: boost} : {atk: 1, spa: 1, spe: 1}, pokemon, source);
				}
			}
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Grass",
	},
	
	//Interacting with new Brunician mechanics
	floralhealing: {
		inherit: true,
		onHit(target, source) {
			let success;
			if (this.field.isTerrain(['grassyterrain','guardianofnature'])) {
				success = !!this.heal(this.modify(target.baseMaxhp, 0.667));
				if (this.field.isTerrain('guardianofnature')) success = target.cureStatus() || success;
			} else {
				success = !!this.heal(Math.ceil(target.baseMaxhp * 0.5));
			}
			if (!success) {
				this.add('-fail', target, 'heal');
				return this.NOT_FAIL;
			}
			if (!target.isAlly(source)) {
				target.staleness = 'external';
			}
			return success;
		},
	},
	grassyglide: {
		inherit: true,
		onModifyPriority(priority, source, target, move) {
			if (source.isGrounded()) {
				if (this.field.isTerrain('guardianofnature')) return priority + 2;
				if (this.field.isTerrain('grassyterrain')) return priority + 1;
			}
		},
	},
	minimize: {
		inherit: true,
		condition: {
			noCopy: true,
			onRestart: () => null,
			onSourceModifyDamage(damage, source, target, move) {
				const boostedMoves = [
					'stomp', 'steamroller', 'bodyslam', 'flyingpress', 'dragonrush', 'heatcrash', 'heavyslam', 'bullybash',//'maliciousmoonsault',
				];
				if (boostedMoves.includes(move.id)) {
					return this.chainModify(2);
				}
			},
			onAccuracy(accuracy, target, source, move) {
				const boostedMoves = [
					'stomp', 'steamroller', 'bodyslam', 'flyingpress', 'dragonrush', 'heatcrash', 'heavyslam', 'bullybash',//'maliciousmoonsault',
				];
				if (boostedMoves.includes(move.id)) {
					return true;
				}
				return accuracy;
			},
		},
	},
	rockpolish: {
		inherit: true,
		desc: "Raises the user's Speed by 2 stages. As long as the user remains active, the power of the user's Refracture will be doubled (this effect is not stackable).",
		volatileStatus: 'rockpolish',
		condition: {
			noCopy: true,
			onRestart: () => null,
		},
	},
	//Returning moves from Desvega
	mindmelt: {
		num: -1,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Mind Melt",
		desc: "Has a 30% chance to confuse the target.",
		shortDesc: "30% chance to confuse the target.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Confusion');
		},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Psychic",
	},
	watchfuleye: {
		num: -2,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Watchful Eye",
		desc: "Prevents the target from switching out. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Drift, Flip Turn, Frost Feint, Guardian Wind, Parting Shot, Poisonous Flight, Shed Tail, Swindle, Teleport, U-turn, or Volt Switch. If the target leaves the field using Baton Pass, the replacement will remain trapped. The effect ends if the user leaves the field.",
		shortDesc: "Prevents the target from switching out.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Mean Look');
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
		type: "Dark",
	},
	poisonousflight: {
		num: -3,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Poisonous Flight",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button or through the effect of the Emergency Exit or Wimp Out Abilities.",
		shortDesc: "User switches out after damaging the target.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Mortal Spin');
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Poison",
	},
	sleuth: {
		num: -4,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Sleuth",
		desc: "If this move is successful, all of the target's moves are revealed.",
		shortDesc: "Reveals the target's moveset.",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Foresight');
		},
		onHit(target, pokemon) {
			let warnMoves: (Move | Pokemon)[][] = [];
			for (const moveSlot of target.moveSlots) {
				warnMoves.push(" " + this.dex.moves.get(moveSlot.move));
			}
			if (!warnMoves.length) return;
			this.add('-message', `${pokemon.name} revealed ${target.name}'s ${warnMoves}!`);
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	lastlaugh: {
		num: -5,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Last Laugh",
		desc: "Lowers the target's Attack, Special Attack, and Speed by 1 stage. The user faints unless this move misses or there is no target. Fails entirely if this move hits a substitute, but does not fail if the target's stats cannot be changed.",
		shortDesc: "Lowers target's Attack, Sp. Atk, Speed by 1. User faints.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Memento');
		},
		boosts: {
			atk: -1,
			spa: -1,
			spe: -1,
		},
		selfdestruct: "ifHit",
		secondary: null,
		target: "normal",
		type: "Fairy",
	},
	geistbite: {
		num: -6,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Geist Bite",
		desc: "Has a 20% chance to lower the target's Defense and Special Defense by 1 stage.",
		shortDesc: "20% chance to lower the target's Def and SpD by 1.",
		pp: 15,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Crunch');
		},
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		target: "normal",
		type: "Ghost",
	},
	frostfeint: {
		num: -7,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Frost Feint",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button or through the effect of the Emergency Exit or Wimp Out Abilities.",
		shortDesc: "User switches out after damaging the target.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Aurora Beam');
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Ice",
	},
	//realmon distribution: Flareon, Kalosian Litleo line, Tepig line, Fennekin line, Turtonator, Rolycoly line, Caspakid line
	drift: {
		num: -8,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Drift",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button or through the effect of the Emergency Exit or Wimp Out Abilities.",
		shortDesc: "User switches out after damaging the target.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Flame Charge');
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	magicspin: {
		num: -9,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		name: "Magic Spin",
		desc: "Has a 10% chance to confuse the target.",
		shortDesc: "10% chance to confuse the target.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Magical Torque');
		},
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Fairy",
	},
	sheriffshot: {
		num: -10,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		name: "Sheriff Shot",
		desc: "Has a 50% chance to lower the target's Defense by 1 stage.",
		shortDesc: "50% chance to lower the target's Defense by 1.",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Vacuum Wave');
		},
		secondary: {
			chance: 50,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Fighting",
	},
	banditblast: {
		num: -11,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		name: "Bandit Blast",
		desc: "Has a 50% chance to lower the target's Defense by 1 stage.",
		shortDesc: "50% chance to lower the target's Defense by 1.",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Vacuum Wave');
		},
		secondary: {
			chance: 50,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Dark",
	},
	fanthehammer: {
		num: -12,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		name: "Fan the Hammer",
		desc: "Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
		pp: 30,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Rock Blast');
		},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	ironstrike: {
		num: -13,
		accuracy: 100,
		basePower: 80,
		name: "Iron Strike",
		desc: "If this move is successful, the target experiences the effects of all entry hazards on its side of the field, unless its held item is Heavy-Duty Boots or its ability is Keen Eye.",
		shortDesc: "Target takes hazard damage after being hit by this move.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Iron Head');
		},
		onAfterHit(target, source) {
			this.runEvent('EntryHazard',target);
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	railwayblitz: {
		num: -14,
		accuracy: 90,
		basePower: 60,
		category: "Physical",
		name: "Railway Blitz",
		desc: "No additional effect.",
		shortDesc: "Usually moves first.",
		pp: 10,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Bullet Punch');
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	draconicfang: {
		num: -15,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Draconic Fang",
		desc: "Has a 30% chance to burn the target.",
		shortDesc: "30% chance to burn the target.",
		pp: 15,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Hyper Fang');
		},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
	},
	//Realmon distribution: Oddish family, Wooper line, Paldean Wooper line, Gligar line, Trubbish line, Poipole line
	poisonterrain: {
		num: -16,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Poison Terrain",
		desc: "For 5 turns, the terrain becomes Poison Terrain. During the effect, the power of Poison-type attacks made by grounded Pokemon is multiplied by 1.3 and grounded Pokemon that would be poisoned are always badly poisoned; Pokemon already experiencing standard poisoning do not become badly poisoned. Grounded Pokemon that are neither Bug-, Poison-, nor Steel-type lose 1/16 of their maximum HP at the end of each turn. Camouflage and Mimicry transform the user into an Poison type, Nature Power becomes Sludge Wave, and Secret Power has a 30% chance to lower the target's Special Defense by 1 stage. Fails if the current terrain is Poison Terrain.",
		shortDesc: "5 turns. Grounded: +Poison power, -1/16 max HP if not Bug/Poison/Steel, Poison -> Toxic.",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Grassy Terrain');
		},
		terrain: 'poisonterrain',
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
				if (move.type === 'Poison' && attacker.isGrounded()) {
					this.debug('poison terrain boost');
					return this.chainModify([5325, 4096]);
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Poison Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Poison Terrain');
				}
			},
			onResidualOrder: 5,
			onResidualSubOrder: 2,
			onResidual(pokemon) {
				if (!pokemon.isGrounded() || pokemon.isSemiInvulnerable()) {
					this.debug(`Pokemon semi-invuln or not grounded; Poison Terrain skipped`);
				} else if(!pokemon.hasType(['Bug', 'Poison', 'Steel'])) this.damage(pokemon.baseMaxhp / 16, pokemon, pokemon);
			},
			onSetStatus(status, target, source, effect) {
				if (status.id === 'psn' && target.isGrounded() && !target.isSemiInvulnerable()
					&& effect?.effectType === 'Move') {
					//This allows Dire Claw to inflict Toxic poisoning
					target.setStatus('tox');
					return false;
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Poison Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Poison",
	},
	rototiller: {
		inherit: true,
		isNonstandard: null,
		desc: "Raises the Attack and Special Attack of all grounded Grass-type Pokemon on the field by 2 stages if Grassy Terrain or Nature Field is active or 1 stage if not. On Nature Field, this move also inflicts Leech Seed on all grounded Pokemon that are neither Grass-type nor behind substitutes.",
		shortDesc: "Raises Atk/Sp. Atk of grounded Grass types by 1, 2 if Grassy Terrain; Seeds grounded non-Grass-types on Nature Field.",
		onHitField(target, source) {
			const targets: Pokemon[] = [];
			let anyAirborne = false;
			const nonGrass: Pokemon[] = [];
			for (const pokemon of this.getAllActive()) {
				if (!pokemon.runImmunity('Ground')) {
					this.add('-immune', pokemon);
					anyAirborne = true;
					continue;
				}
				if (pokemon.hasType('Grass')) {
					// This move affects every grounded Grass-type Pokemon in play.
					targets.push(pokemon);
				} else if (pokemon !== source && !pokemon.volatiles['substitute']) {
					nonGrass.push(pokemon);
				}
			}
			const isNatureField = this.field.isTerrain('guardianofnature');
			if (!targets.length && !anyAirborne && (!nonGrass.length || !isNatureField)) return false; // Fails when there are no grounded Grass types or airborne Pokemon
			let boost = 2;
			if (isNatureField) {
				for (const pokemon of nonGrass) {
					pokemon.addVolatile('leechseed');
				}
			} else if (!this.field.isTerrain('grassyterrain')) {
				boost = 1;
			}
			for (const pokemon of targets) {
				this.boost({atk: boost, spa: boost}, pokemon, source);
			}
		},
	},
	//Realmon distribution: Oddish family, both Wooper lines, Trubbish line, Frogadier and Greninja, Mareanie line, Naganadel
	toxicshock: {
		num: -17,
		accuracy: 95,
		basePower: 70,
		category: "Physical",
		name: "Toxic Shock",
		desc: "Has a 30% chance to badly poison the target. If the current terrain is Poison Terrain and the target is grounded, this move will always land a critical hit.",
		shortDesc: "30% to badly poison. Crits if target is grounded on Poison Terrain.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Gunk Shot');
		},
		onModifyCritRatio(critRatio, source, target) {
			if (this.field.isTerrain('poisonterrain') && target?.isGrounded()) {
				this.hint(`Toxic Shock always crits on grounded targets in Poison Terrain.`,true);
				return 5;
			}
		},
		secondary: {
			chance: 30,
			status: 'tox',
		},
		target: "normal",
		type: "Poison",
		contestType: "Beautiful",
	},
	iceshove: {
		num: -18,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Ice Shove",
		desc: "Has a 100% chance to raise the user's Speed by 1 stage and a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio. 100% chance to raise user's Speed by 1.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Ice Spinner');
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
		type: "Ice",
		contestType: "Cool",
	},
	//Realmon distribution: Unovan Braviary, Mandibuzz, Hawlucha
	airdive: {
		num: -19,
		accuracy: 90,
		basePower: 60,
		category: "Physical",
		name: "Air Dive",
		desc: "This move is always a critical hit unless the target is under the effect of Lucky Chant or has the Battle Armor or Shell Armor Abilities.",
		shortDesc: "Always results in a critical hit.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Beak Blast');
		},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
	oilslick: {
		num: -20,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Oil Slick",
		desc: "No additional effect.",
		shortDesc: "Usually moves first.",
		pp: 30,
		priority: 1,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Quick Attack');
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Cool",
	},
	pepperrush: {
		num: -21,
		accuracy: 95,
		basePower: 100,
		category: "Physical",
		name: "Pepper Rush",
		desc: "If the user is burned, this move's damage is multiplied by 1.5 instead of halved. Has a 10% chance to burn the target. If the user does not have a non-volatile status condition after using this move, it is burned after using it.",
		shortDesc: "1.5x power if user burned. Thaws user. 10% chance to burn target. Burns user.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, defrost: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Flare Blitz');
		},
		onBasePower(basePower, pokemon) {
			if (pokemon.status === 'brn') {
				return this.chainModify(1.5);
			}
		},
		onAfterHit(target, source) {
			if (source.hp) {
				source.trySetStatus('brn', source);
			}
		},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	pluspulse: {
		num: -22,
		accuracy: true,
		basePower: 80,
		category: "Special",
		name: "Plus Pulse",
		desc: "This move does not check accuracy. If the target has at least one stat stage greater than 0, this move's power is multiplied by 1.5.",
		shortDesc: "Does not check accuracy. 1.5x power if target has a stat boosted.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower, pokemon, target) {
			if (target.positiveBoosts()) {
				return this.chainModify(1.5);
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Shock Wave');
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	minusion: {
		num: -23,
		accuracy: true,
		basePower: 80,
		category: "Physical",
		name: "Minus Ion",
		desc: "This move does not check accuracy. If the target has at least one stat stage less than 0, this move's power is multiplied by 1.5.",
		shortDesc: "Does not check accuracy. 1.5x power if target has a stat lowered.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower, pokemon, target) {
			for (const i in target.boosts) {
				if (target.boosts[i] < 0) {
					return this.chainModify(1.5);
				}
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Electro Ball');
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	infestation: {
		inherit: true,
		desc: "Prevents the target from switching for three turns. Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Drift, Flip Turn, Frost Feint, Guardian Wind, Parting Shot, Poisonous Flight, Shed Tail, Swindle, Teleport, U-turn, or Volt Switch. The effect does not end if the user leaves the field, but does end if the target leaves the field or uses Mortal Spin, Rapid Spin, or Substitute successfully. Using this move again does not stack or reset the effect.",
		shortDesc: "Traps+Damages target for 3 turns even if user switches out.",
		onAfterHit(target, source, move) {
			target.addVolatile('infestation');
		},
		condition: {
			duration: 3,
			noCopy: true,
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 8);
			},
			onStart(target) {
				this.add('-activate', target, 'infestation');
			},
		}
	},
	inkburst: {
		num: -24,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Ink Burst",
		desc: "Has a 30% chance to lower the target's Speed by 1 stage. If used by a Crayoct, this move's type will change depending on its color. Fire for Red, Flying for Blue, Electric for Yellow, Fairy for Pink, and Ground for Brown.",
		shortDesc: "30% lower target's Speed by 1. Type depends on user's form.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			switch (source.species.name) {
				case 'Crayoct':
					this.attrLastMove('[anim] Spicy Extract');
					break;
				case 'Crayoct-Blue':
					this.attrLastMove('[anim] Mist Ball');
					break;
				case 'Crayoct-Yellow':
					this.attrLastMove('[anim] Charge Beam');
					break;
				case 'Crayoct-Pink':
					this.attrLastMove('[anim] Psywave');
					break;
				case 'Crayoct-Brown':
					this.attrLastMove('[anim] Mud Bomb');
					break;
				default:
					this.attrLastMove('[anim] Sludge Bomb');
					break;
			}
		},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Crayoct':
				move.type = 'Fire';
				break;
			case 'Crayoct-Blue':
				move.type = 'Flying';
				break;
			case 'Crayoct-Yellow':
				move.type = 'Electric';
				break;
			case 'Crayoct-Pink':
				move.type = 'Fairy';
				break;
			case 'Crayoct-Brown':
				move.type = 'Ground';
				break;
			}
		},
		secondary: {
			chance: 30,
			boosts: {
				spe: -1,
			}
		},
		target: "normal",
		type: "Normal",
	},
	venommist: {
		accuracy: 90,
		basePower: 0,
		category: "Status",
		name: "Venom Mist",
		desc: "Raises the user's Attack by 1 stage. Poisons the target.",
		shortDesc: "Raises the user's Attack by 1. Poisons adjacent Pokemon.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Haze');
		},
		status: 'psn',
		secondary: null,
		target: "allAdjacent",
		self: {
			boosts: {
				atk: 1,
			}
		},
		type: "Poison",
		contestType: "Clever",
	},
	stingspit: {
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Sting Spit",
		desc: "Hits twice, with each hit having a 50% chance to poison the target. If the first hit breaks the target's substitute, it will take damage for the second hit. In Double Battles, this move attempts to hit the targeted Pokemon and its ally once each. If hitting one of these Pokemon would be prevented by immunity, protection, semi-invulnerability, an Ability, or accuracy, it attempts to hit the other Pokemon twice instead. If this move is redirected, it hits that target twice.",
		shortDesc: "Hits twice. Doubles: Tries to hit each foe once. Each hit has a 50% chance to poison.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, noparentalbond: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Dragon Darts');
		},
		multihit: 2,
		smartTarget: true,
		secondary: {
			chance: 50,
			status: 'psn',
		},
		target: "normal",
		type: "Bug",
		maxMove: {basePower: 130},
	},
	acidtrip: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Acid Trip",
		desc: "Raises the user's Defense by 1 stage and Special Attack by 2 stages in exchange for the user losing 1/8 of its maximum HP, rounded down. Fails if the user would faint or if its Defense and Special Attack stat stages would not change.",
		shortDesc: "+2 SpA, +1 Def for 1/8 user's max HP.",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		onTry(source) {
			if (source.hp <= (source.maxhp / 8) || source.maxhp === 1) return false;
		},
		onTryHit(pokemon, target, move) {
			if (!this.boost(move.boosts as SparseBoostsTable)) return null;
			delete move.boosts;
		},
		onHit(pokemon) {
			this.directDamage(pokemon.maxhp / 8);
		},
		boosts: {
			def: 1,
			spa: 2,
		},
		secondary: null,
		target: "self",
		type: "Poison",
	},
	voraciousfang: {
		num: -25,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Voracious Fang",
		desc: "Has a 30% chance to make the target flinch. If the target is poisoned, this move has a 100% chance to make it flinch instead.",
		shortDesc: "30% to flinch target. Target poisoned: 100% to flinch instead.",
		pp: 10,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Hyper Fang');
		},
		onModifyMove(move, source, target) {
			if (!['tox','psn'].includes(target.status)) return;
			for (const secondary of move.secondaries) {
				if (secondary?.volatileStatus === 'flinch') secondary.chance = 100;
			}
		},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
	},
	royalpunt: {
		num: -26,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Royal Punt",
		desc: "Has a 100% chance to lower the target's Defense by 1 stage.",
		shortDesc: "100% chance to lower the target's Defense by 1.",
		pp: 10,
		priority: 0,
		isViable: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Mega Kick');
		},
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
	highroller: {
		num: -27,
		accuracy: 100,
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			const bp = move.basePower + 20 * pokemon.positiveBoosts();
			this.debug('BP: ' + bp);
			return bp;
		},
		isViable: true,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Pay Day');
		},
		category: "Physical",
		name: "High Roller",
		desc: "Power is equal to 40+(X*20), where X is the user's total stat stage changes that are greater than 0.",
		shortDesc: "+ 20 power for each of the user's stat boosts.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	
	firewall: {
		num: -28,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user is protected from most attacks made by other Pokemon during this turn, and restores 1/4 of its maximum HP and cures its non-volatile status condition when other Pokemon try to make contact. Non-damaging moves go through this protection. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails, if the user's last move used is not Baneful Bunker, Burning Bulwark, Detect, Endure, Field of Vision, Firewall, King's Shield, Max Guard, Obstruct, Protect, Quick Guard, Silk Trap, Spiky Shield, Toxic Snowball, or Wide Guard, or if it was one of those moves and the user's protection was broken. Fails if the user moves last this turn.",
		shortDesc: "Protects the user. Contact: user restores 1/4 of max HP and cures its status.",
		isViable: true,
		name: "Firewall",
		pp: 5,
		priority: 4,
		flags: {},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Iron Defense');
		},
		stallingMove: true,
		volatileStatus: 'firewall',
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
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove/*) {
					// Outrage counter is reset
					if (*/&& source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					//}
				}
				if (move.flags['contact']) {
					this.heal(target.maxhp / 4, target, target, this.dex.getActiveMove("Firewall"));
					target.cureStatus();
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && move.flags['contact']) {
					this.heal(target.maxhp / 4, target, target, this.dex.getActiveMove("Firewall"));
					target.cureStatus();
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Steel",
	},
	pitfall: {
		num: -29,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Pitfall",
		desc: "If the user is hit by a contact move this turn before it can execute this move, the attacker deals halved damage with its move and is prevented from switching out afterward.",
		shortDesc: "Traps and deals halved damage on contact with the user before it moves.",
		pp: 15,
		priority: -2,
		flags: {protect: 1, noassist: 1, failmefirst: 1, nosleeptalk: 1, failcopycat: 1, failinstruct: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Dig');
		},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('pitfall');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Pitfall');
			},
			onSourceBasePower(basePower, attacker, defender, move) {
				if (this.checkMoveMakesContact(move, attacker, defender)) {
					return this.chainModify(0.5);
				}
			},
			onHit(target, source, move) {
				if (this.checkMoveMakesContact(move, source, target)) {
					source.addVolatile('trapped', target, this.dex.getActiveMove("Pitfall"), 'trapper');
				}
			},
		},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('pitfall');
		},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Clever",
	},
	skyrush: {
		num: -30,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Sky Rush",
		desc: "Has a 50% chance to raise the user's Attack by 1 stage.",
		shortDesc: "50% chance to raise the user's Attack by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Brave Bird');
		},
		secondary: {
			chance: 50,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		target: "normal",
		type: "Flying",
		contestType: "Beautiful",
	},

	boltburst: {
		num: -31,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target, move) {
			const hp = target.hp;
			const maxHP = target.maxhp;
			const bp = Math.floor(Math.floor((140 * (100 * Math.floor(hp * 4096 / maxHP)) + 2048 - 1) / 4096) / 100) || 1;
			this.debug('BP for ' + hp + '/' + maxHP + " HP: " + bp);
			return bp;
		},
		category: "Special",
		name: "Bolt Burst",
		desc: "Power is equal to 140 * (target's current HP / target's maximum HP), rounded half down, but not less than 1.",
		shortDesc: "More power the more HP the target has left. (Max 140)",
		pp: 5,
		priority: 0,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Discharge');
		},
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Electric",
		zMove: {basePower: 200},
		maxMove: {basePower: 150},
		contestType: "Cool",
	},
	//vanilla moves
	octazooka: {
		inherit: true,
		isNonstandard: null,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Has a 30% chance to poison the target.",
		shortDesc: "30% chance to poison the target.",
		secondary: {
			chance: 30,
			status: 'psn',
		}
	},
	
	telekinesis: {
		//not sure if it's movexited or not
		//whatever the case it removes the immune message from magnetic updraft vs palossand
		inherit: true,
		onTry(source, target, move) {
			// Additional Gravity check for Z-move variant
			if (this.field.getPseudoWeather('Gravity')) {
				this.attrLastMove('[still]');
				this.add('cant', source, 'move: Gravity', move);
				return null;
			}
			else if (['Diglett', 'Dugtrio', 'Palossand', 'Sandygast'].includes(target.baseSpecies.baseSpecies) ||
					target.baseSpecies.name === 'Gengar-Mega') {
				this.add('-immune', target);
				return null;
			}
		},
		condition: {
			duration: 3,
			onStart(target) {
				if (['Diglett', 'Dugtrio', 'Palossand', 'Sandygast'].includes(target.baseSpecies.baseSpecies) ||
					target.baseSpecies.name === 'Gengar-Mega') {
					return null;
				}
				if (target.volatiles['smackdown'] || target.volatiles['ingrain']) return false;
				this.add('-start', target, 'Telekinesis');
			},
			onAccuracyPriority: -1,
			onAccuracy(accuracy, target, source, move) {
				if (move && !move.ohko) return true;
			},
			onImmunity(type) {
				if (type === 'Ground') return false;
			},
			onUpdate(pokemon) {
				if (pokemon.baseSpecies.name === 'Gengar-Mega') {
					delete pokemon.volatiles['telekinesis'];
					this.add('-end', pokemon, 'Telekinesis', '[silent]');
				}
			},
			onResidualOrder: 19,
			onEnd(target) {
				this.add('-end', target, 'Telekinesis');
			},
		},
	},
	haze: {
		inherit: true,
		desc: "Resets the stat stages of all active Pokemon to 0. Pokemon with the ability Rock Bottom are not affected.",
		onHitField() {
			this.add('-clearallboost');
			for (const pokemon of this.getAllActive()) {
				if(!pokemon.hasAbility('rockbottom')) pokemon.clearBoosts();
			}
		},
	},
	naturepower: {
		inherit: true,
		desc: "This move calls another move for use based on the battle terrain. Tri Attack on the regular Wi-Fi terrain, Thunderbolt during Electric Terrain, Moonblast during Misty Terrain, Energy Ball during Grassy Terrain, Chloroblast during Nature Field, Psychic during Psychic Terrain, and Sludge Wave during Poison Terrain.",
		isNonstandard: null,
		onTryHit(target, pokemon) {
			let move;
			switch (this.field.terrain) {
				case 'electricterrain':
					move = 'thunderbolt';
					break;
				case 'grassyterrain':
					move = 'energyball';
					break;
				case 'mistyterrain':
					move = 'moonblast';
					break;
				case 'psychicterrain':
					move = 'psychic';
					break;
				case 'poisonterrain':
					move = 'sludgewave';
					break;
				case 'guardianofnature':
					move = 'chloroblast';
					break;
				default:
					move = 'triattack';
					break;
			}
			this.actions.useMove(move, pokemon, target);
			return null;
		},
	},
	terrainpulse: {
		inherit: true,
		desc: "Power doubles if the user is grounded and a terrain is active, and this move's type changes to match. Electric type during Electric Terrain, Grass type during Grassy Terrain or Nature Field, Fairy type during Misty Terrain, Psychic type during Psychic Terrain, and Poison type during Poison Terrain.",
		onModifyType(move, pokemon) {
			if (!pokemon.isGrounded()) return;
			switch (this.field.terrain) {
				case 'electricterrain':
					move.type = 'Electric';
					break;
				case 'grassyterrain':
				case 'guardianofnature':
					move.type = 'Grass';
					break;
				case 'mistyterrain':
					move.type = 'Fairy';
					break;
				case 'psychicterrain':
					move.type = 'Psychic';
					break;
				case 'poisonterrain':
					move.type = 'Poison';
					break;
			}
		},
	},
	topsyturvy: {
		inherit: true,
		desc: "The target's positive stat stages become negative and vice versa. Fails if the target's ability is Rock Bottom or all of its stat stages are 0.",
		onHit(target) {
			if(target.hasAbility('rockbottom')) {
				this.add("-fail", target, "unboost", "[from] ability: Rock Bottom", "[of] " + target);
				return false;
			}
			let success = false;
			let i: BoostID;
			for (i in target.boosts) {
				if (target.boosts[i] === 0) continue;
				target.boosts[i] = -target.boosts[i];
				success = true;
			}
			if (!success) return false;
			this.add('-invertboost', target, '[from] move: Topsy-Turvy');
		},
	},
	clearsmog: {
		inherit: true,
		onHit(target) {
			if(!target.hasAbility('rockbottom')) {
				target.clearBoosts();
				this.add('-clearboost', target);
			}
		},
	},
	secretpower: {
		inherit: true,
		isNonstandard: null,
		onModifyMove(move, pokemon) {
			if (this.field.isTerrain(['','electricterrain'])) return;
			move.secondaries = [];
			/*if (this.field.isTerrain('electricterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'par',
				});
			} else */if (this.field.isTerrain(['grassyterrain','guardianofnature'])) {
				move.secondaries.push({
					chance: 30,
					status: 'slp',
				});
				if (this.field.isTerrain('guardianofnature')) move.critRatio++;
			} else if (this.field.isTerrain('mistyterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spa: -1,
					},
				});
			} else if (this.field.isTerrain('psychicterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spe: -1,
					},
				});
			} else if (this.field.isTerrain('poisonterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spd: -1,
					},
				});
			}
		},
	},
	camouflage: {
		inherit: true,
		isNonstandard: null,
		desc: "The user's type changes based on the battle terrain. Normal type on the regular Wi-Fi terrain, Electric type during Electric Terrain, Fairy type during Misty Terrain, Grass type during Grassy Terrain or Nature Field, Psychic type during Psychic Terrain, and Poison type during Poison Terrain. Fails if the user's type cannot be changed or if the user is already purely that type.",
		onHit(target) {
			let newType;
			switch (this.field.terrain) {
				case 'electricterrain':
					newType = 'Electric';
					break;
				case 'grassyterrain':
				case 'guardianofnature':
					newType = 'Grass';
					break;
				case 'mistyterrain':
					newType = 'Fairy';
					break;
				case 'psychicterrain':
					newType = 'Psychic';
					break;
				case 'poisonterrain':
					newType = 'Poison';
					break;
				default:
					newType = 'Normal';
					break;
			}
			if (target.getTypes().join() === newType || !target.setType(newType)) return false;
			this.add('-start', target, 'typechange', newType);
		},
	},
	smackdown: {
		inherit: true,
		desc: "This move can hit a target using Bounce, Fly, or Sky Drop, or is under the effect of Sky Drop. If this move hits a target under the effect of Bounce, Fly, Magnet Rise, or Telekinesis, the effect ends. If the target is a Flying type that has not used Roost this turn or a Pokemon with the Levitate or Soaring Spirit Abilities, or if there is an active Pokemon with Tree Topper, the target loses its immunity to Ground-type attacks and the Arena Trap Ability as long as it remains active. During the effect, Magnet Rise fails for the target and Telekinesis fails against the target, and the target is not affected by Tree-Topper.",
		condition: {
			noCopy: true,
			onStart(pokemon) {
				let applies = !(
					!(
					pokemon.hasType('Flying') || pokemon.hasAbility(['levitate','soaringspirit'])
						|| (pokemon.species.name === 'Fulmenops-Stormy' && pokemon.hasAbility('weatherflux'))
						|| (this.getAllActive().some(target => target.hasAbility('treetopper'))
								&& !['Diglett','Dugtrio','Sandygast','Palossand'].includes(pokemon.baseSpecies.baseSpecies))
					) || pokemon.hasItem('ironball') || pokemon.volatiles['ingrain'] || this.field.getPseudoWeather('gravity')
				);
				//TODO: Exclude Diglett/Sandygast lines/MGengar from Tree-Topper check
				if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
					applies = true;
					this.queue.cancelMove(pokemon);
					pokemon.removeVolatile('twoturnmove');
				}
				if (pokemon.volatiles['magnetrise']) {
					applies = true;
					delete pokemon.volatiles['magnetrise'];
				}
				if (pokemon.volatiles['telekinesis']) {
					applies = true;
					delete pokemon.volatiles['telekinesis'];
				}
				else if (!applies) return false;
				this.add('-start', pokemon, 'Smack Down');
			},
			onRestart(pokemon) {
				if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
					this.queue.cancelMove(pokemon);
					pokemon.removeVolatile('twoturnmove');
					this.add('-start', pokemon, 'Smack Down');
				}
			},
		},
	},
	dive: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			if (attacker.hasAbility(['gulpmissile','gulpcannon']) && ['Cramorant','Cramorant-Desvega','Toxirant'].includes(attacker.species.name)
				&& !attacker.transformed) {
				const forme = attacker.hp <= attacker.maxhp / 2 ? 'gorging' : 'gulping';
				attacker.formeChange(attacker.species.id + forme, move);
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
	knockoff: {
		inherit: true,
		onAfterHit(target, source) {
			if (source.hp) {
				const item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Knock Off', '[of] ' + source);
					for (const pokemon of this.getAllActive()) {
						if (pokemon.hasAbility('ravenous')) this.heal(pokemon.maxhp / 6, pokemon, pokemon, this.dex.abilities.get('ravenous'));
					}
				}
			}
		},
	},
	//There are mons that got dexited in SV but not Desvega and thus their signatures can't be used, so freeing their signatures here
	/*naturesmadness: {
		inherit: true,
		isNonstandard: null,
	},
	obstruct: {
		inherit: true,
		//Functionality is untouched
		desc: "The user is protected from most attacks made by other Pokemon during this turn, and Pokemon trying to make contact with the user have their Defense lowered by 2 stages. Non-damaging moves go through this protection. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails, if the user's last move used is not Baneful Bunker, Burning Bulwark, Detect, Endure, Field of Vision, Firewall, King's Shield, Max Guard, Obstruct, Protect, Quick Guard, Silk Trap, Spiky Shield, Toxic Snowball, or Wide Guard, or if it was one of those moves and the user's protection was broken. Fails if the user moves last this turn.",
		isNonstandard: null,
	},
	shelltrap: {
		inherit: true,
		isNonstandard: null,
	},*/
	geomancy: {
		inherit: true,
		isNonstandard: null,
	},

	//misc movexit undoing
	frustration: {
		inherit: true,
		isNonstandard: null,
	},
	return: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpower: {
		inherit: true,
		isNonstandard: null,
	},
	naturalgift: {
		inherit: true,
		isNonstandard: null,
	},
	pursuit: {
		inherit: true,
		isNonstandard: null,
	},
	autotomize: {
		inherit: true,
		isNonstandard: null,
	},
	luckychant: {
		inherit: true,
		isNonstandard: null,
	},
	
	//brazdo and loria moves just in case
	citrusysting: {
		accuracy: 90,
		basePower: 0,
		category: "Status",
		shortDesc: "Paralyzes the target. Grass-types are immune.",
		isViable: true,
		name: "Citrusy Sting",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, powder: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Acid Spray');
		},
		status: 'par',
		ignoreImmunity: false,
		secondary: null,
		target: "normal",
		type: "Grass",
		zMove: {boost: {spd: 1}},
		contestType: "Cool",
	},
	berryblast: {
		accuracy: 100,
		basePower: 0,
		category: "Special",
		desc: "The type and power of this move depend on the user's held Berry, and the Berry is lost. Fails if the user is not holding a Berry, if the user has the Klutz Ability, or if Embargo, Magic Room, or an opponent's Rulebook is in effect for the user.",
		shortDesc: "Power and type depends on the user's berry; Consumes berry.",
		isViable: true,
		name: "Berry Blast",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
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
			this.attrLastMove('[anim] Terrain Pulse');
			move.basePower = item.naturalGift.basePower;
			pokemon.setItem('');
			pokemon.lastItem = item.id;
			pokemon.usedItemThisTurn = true;
			this.runEvent('AfterUseItem', pokemon, null, null, item);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Clever",
	},
	bushclaws: {
		accuracy: 100,
		basePower: 85,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'slp' || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Physical",
		shortDesc: "Power doubles if the target is asleep.",
		isViable: true,
		name: "Bush Claws",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Metal Claw');
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Tough",
	},
	//Alolan Oricorio gets this too
	revelationspin: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		desc: "This move's type depends on the user's primary type. If the user's primary type is typeless, this move's type is the user's secondary type if it has one, otherwise the added type from Forest's Curse or Trick-or-Treat. This move is typeless if the user's type is typeless alone.",
		shortDesc: "Type varies based on the user's primary type.",
		isViable: true,
		name: "Revelation Spin",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, dance: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Revelation Dance');
		},
		onModifyType(move, pokemon) {
			let type = pokemon.getTypes()[0];
			if (type === "Bird") type = "???";
			else if (type === "Stellar") type = pokemon.getTypes(false, true)[0];
			move.type = type;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Beautiful",
	},
	fieldofvision: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user is protected from most attacks made by other Pokemon during this turn, and Pokemon trying to make contact with the user have their Special Defense lowered by 2 stages. Non-damaging moves go through this protection. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails, if the user's last move used is not Baneful Bunker, Burning Bulwark, Detect, Endure, Field of Vision, Firewall, King's Shield, Max Guard, Obstruct, Protect, Quick Guard, Silk Trap, Spiky Shield, Toxic Snowball, or Wide Guard, or if it was one of those moves and the user's protection was broken. Fails if the user moves last this turn.",
		shortDesc: "Protects from damaging attacks. Contact: -2 Sp. Def.",
		isViable: true,
		name: "Field of Vision",
		pp: 10,
		priority: 4,
		flags: {},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Laser Focus');
		},
		stallingMove: true,
		volatileStatus: 'fieldofvision',
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
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove/*) {
					// Outrage counter is reset
					if (*/&& source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					//}
				}
				if (move.flags['contact']) {
					this.boost({spd: -2}, source, target, this.dex.getActiveMove("Field of Vision"));
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && move.flags['contact']) {
					this.boost({spd: -2}, source, target, this.dex.getActiveMove("Field of Vision"));
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Psychic",
	},
	jawcrush: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Prevents the user and the target from switching out. The user and the target can still switch out if either of them is holding Shed Shell or uses Baton Pass, Drift, Flip Turn, Frost Feint, Guardian Wind, Parting Shot, Poisonous Flight, Shed Tail, Swindle, Teleport, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field.",
		shortDesc: "Traps both the user and the target",
		isViable: true,
		name: "Jaw Crush",
		pp: 15,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Crunch');
		},
		onHit(target, source, move) {
			source.addVolatile('trapped', target, move, 'trapper');
			target.addVolatile('trapped', source, move, 'trapper');
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
/*
	clinch: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Clinch",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyMove(move, source, target) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				move.secondaries.push({
					chance: 100,
					boosts: {
						def: -1,
					},
				});
			} else {
				move.secondaries.push({
					chance: 100,
					boosts: {
						spe: -1,
					},
				});
			}
		},
		secondaries: [],
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},
*/
	sonicpulse: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Sonic Pulse",
		pp: 30,
		desc: "Until the target faints or switches out, all further attacks used against it will become critical hits.",
		shortDesc: "Moves against the target become guaranteed crits.",
		priority: 0,
		flags: {snatch: 1},
		volatileStatus: 'sonicpulse',
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Supersonic');
		},
		condition: {
			duration: 0,
			onStart(pokemon, source, effect) {
				if (effect && (['imposter', 'psychup', 'transform'].includes(effect.id))) {
					this.add('-start', pokemon, 'move: Sonic Pulse', '[silent]');
				} else {
					this.add('-start', pokemon, 'move: Sonic Pulse');
				}
			},
			onSourceModifyCritRatio(critRatio) {
				return 5;
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Sonic Pulse', '[silent]');
			},
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {boost: {atk: 1}},
		contestType: "Cool",
	},
	centuryblade: {
		accuracy: 90,
		basePower: 120,
		category: "Physical",
		desc: "This attack charges on the first turn and executes on the second. Raises the user's Defense by 1 stage on the first turn. If the user is holding a Power Herb or the weather is Desolate Land or Sunny Day, the move completes in one turn. If the user is holding Utility Umbrella and the weather is Desolate Land or Sunny Day, the move still requires a turn to charge.",
		shortDesc: "Raises Def by 1, hits turn 2. Sun: no charge.",
		isViable: true,
		name: "Century Blade",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1, contact: 1, slicing: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({def: 1}, attacker, attacker, move);
			if (['sunnyday', 'desolateland'].includes(attacker.effectiveWeather())) {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, 'Solar Blade', defender);
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
	},
	//Realmon distribution (pre-Loria): Carvanha Families, Snorunt line, Hydreigon line, Lycanroc line, Silvally, Guzzlord, Crobat line,
	//Noivern line, Mimikyu, Grimmsnarl line, Arbok line, Girafarig (+Farigiraf), Houndoom line, Mightyena line, Seviper, Huntail, 
	//Eelektross line, Gengar line, Banette line, Hoennian Sableye (likely Desvegan too), Giratina, Trevenant, Lunala, Dragapult line
	drainfang: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		isViable: true,
		name: "Drain Fang",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1, bite: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Strength Sap');
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
	},
	//Realmon distribution (pre-Loria): Rhyhorn line, Mudkip line, Numel line, Johtonian Swinub line (likely Desvegan too), Mudbray line
	terracharge: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "Has a 10% chance to lower the target's Speed by 1 stage. If the target lost HP, the user takes recoil damage equal to 33% the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 33% recoil. 10% to lower target's Speed by 1.",
		isViable: true,
		name: "Terra Charge",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Head Smash');
		},
		recoil: [33, 100],
		secondary: {
			chance: 10,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Ground",
		contestType: "Cool",
	},
	//Pre-Loria Evo lines that could get it via Mirror Herb: Spoink, Darumaka, Oranguru, Woobat, Espurr, Pikipek
	pressurecook: {
		accuracy: 100,
		basePower: 70,
		category: "Special",
		desc: "This move's type effectiveness against Water is changed to be super effective no matter what this move's type is.",
		shortDesc: "Super effective on Water.",
		isViable: true,
		name: "Pressure Cook",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Psyshock');
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Water') return 1;
		},
		target: "normal",
		type: "Psychic",
		contestType: "Beautiful",
	},
	//Pre-Loria Evo lines that could get it via Mirror Herb: Mienfoo, Ekans, Seviper, Skorupi, Croagunk (+Croakorrode), Trapinch
	poisondart: {
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		desc: "Has a 10% chance to poison the target.",
		shortDesc: "Usually goes first. 10% chance to poison",
		isViable: true,
		name: "Poison Dart",
		pp: 30,
		priority: 1,
		flags: {protect: 1, mirror: 1, contact: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Poison Sting');
		},
		secondary: {
			chance: 10,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		contestType: "Beautiful",
	},
	darkfang: {
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		desc: "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit. In Double Battles, this move attempts to hit the targeted Pokemon and its ally once each. If hitting one of these Pokemon would be prevented by immunity, protection, semi-invulnerability, an Ability, or accuracy, it attempts to hit the other Pokemon twice instead. If this move is redirected, it hits that target twice.",
		shortDesc: "Hits twice. Doubles: Tries to hit each foe once.",
		isViable: true,
		name: "Dark Fang",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, bite: 1, noparentalbond: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Bite');
		},
		multihit: 2,
		smartTarget: true,
		secondary: null,
		target: "normal",
		type: "Dark",
		maxMove: {basePower: 130},
	},
	eyeofchaos: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "Damage is calculated using the user's Special Defense stat as its Special Attack, including stat stage changes. Other effects that modify the Special Attack stat are used as normal.",
		shortDesc: "Uses user's SpD stat as SpA in damage calculation.",
		isViable: true,
		name: "Eye of Chaos",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Glare');
		},
		overrideOffensiveStat: 'spd',
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	dreadwing: {
		accuracy: 100,
		basePower: 95,
		category: "Special",
		desc: "Damage is calculated using the target's Special Attack stat, including stat stage changes. The user's Ability and item are used as normal.",
		shortDesc: "Uses target's SpA stat in damage calculation.",
		isViable: true,
		name: "Dread Wing",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Oblivion Wing');
		},
		overrideOffensivePokemon: 'target',
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Clever",
	},
	forestrage: {
		accuracy: 95,
		basePower: 85,
		category: "Physical",
		desc: "Regardless of this move's type, it has neutral effectiveness against any types that it would otherwise be not very effective against. This move does not ignore type-based immunities.", 
		shortDesc: "Ignores resistances.",
		isViable: true,
		name: "Forest Rage",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.add('-anim', source, "Work Up");
			this.add('-anim', source, "Frenzy Plant", target);
		},
		onEffectiveness(typeMod, target, type) {
			if (typeMod < 0) {
				this.debug('Ignoring resist');
				return 0;
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Clever",
	},
	riverwrath: {
		accuracy: 95,
		basePower: 85,
		category: "Special",
		desc: "Regardless of this move's type, it has neutral effectiveness against any types that it would otherwise be not very effective against. This move does not ignore type-based immunities.", 
		shortDesc: "Ignores resistances.",
		isViable: true,
		name: "River Wrath",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.add('-anim', source, "Work Up");
			this.add('-anim', source, "Hydro Cannon", target);
		},
		onEffectiveness(typeMod, target, type) {
			if (typeMod < 0) {
				this.debug('Ignoring resist');
				return 0;
			}
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Clever",
	},
   // Flare Up, Toxic Snowball
	flareup: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "If the target's Attack stat is greater than the user's, the user's Speed is raised by 1 stage. Otherwise, the target's Defense is lowered by 1 stage.",
		shortDesc: "User's Atk >= target's: -1 Def; Otherwise user gains +1 Spe.",
		isViable: true,
		name: "Flare Up",
		pp: 30,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Taunt');
		},
		onModifyMove(move, source, target) {
			if (source.getStat('atk', false, true) < target.getStat('atk', false, true)) {
				move.self = {boosts: {spe: 1}};
			} else {
				move.boosts = {def: -1};
			}
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Normal",
		zMove: {boost: {atk: 1}},
		contestType: "Cool",
	},
	toxicsnowball: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user is protected from most attacks made by other Pokemon during this turn. Attackers trying to use Special moves against it lose 1/4 of their maximum HP and are poisoned. Non-damaging moves go through this protection. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails, if the user's last move used is not Baneful Bunker, Burning Bulwark, Detect, Endure, Field of Vision, Firewall, King's Shield, Max Guard, Obstruct, Protect, Quick Guard, Silk Trap, Spiky Shield, Toxic Snowball, or Wide Guard, or if it was one of those moves and the user's protection was broken. Fails if the user moves last this turn.",
		shortDesc: "Protects user. Special blocked: Attacker loses 25% of max HP and gets poisoned.",
		isViable: true,
		name: "Toxic Snowball",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'toxicsnowball',
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Baneful Bunker');
		},
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
				if (lockedmove/*) {
					// Outrage counter is reset
					if (*/&& source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					//}
				}
				if (move.category == 'Special') {
					this.damage(source.baseMaxhp / 4, source, target);
					source.trySetStatus('psn', target);
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && move.category == 'Special') {
					this.damage(source.baseMaxhp / 4, source, target);
					source.trySetStatus('psn', target);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Ice",
		zMove: {boost: {def: 1}},
		contestType: "Tough",
	},
	// Loria Region
	purification: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "If this move is successful and the user had any stat changes less than 0 upon using it, these stat changes are cleared afterward.",
		shortDesc: "Eliminates the user's negative stat changes.",
		isViable: true,
		name: "Purification",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Diamond Storm", target);
			this.add('-anim', source, "Recover");
		},
		onHit(target, source, move){
			const boosts: SparseBoostsTable = {};
			let i: BoostID;
			for (i in source.boosts) {
				if (source.boosts[i] < 0) {
					boosts[i] = 0;
				}
			}
			source.setBoost(boosts);
			this.battle.add('-clearnegativeboost', source);
		},
		target: "normal",
		type: "Rock",
		contestType: "Beautiful",
	},
	guardianwind: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 3 turns, the user and its party members cannot have negative stat changes, non-volatile status conditions, or confusion inflicted on them by other Pokemon. The user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members.",
		shortDesc: "Sets Mist and Safeguard for 3 turns and then switches out.",
		isViable: true,
		name: "Guardian Wind",
		pp: 10,
		priority: 0,
		flags: {},
		selfSwitch: true,
		sideCondition: 'guardianwind',
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Tailwind');
		},
		condition: {
			duration: 3,
			onBoost(boost, target, source, effect) {
				if (effect.effectType === 'Move' && effect.infiltrates && target.side !== source.side) return;
				if (source && target !== source) {
					let showMsg = false;
					let i: BoostName;
					for (i in boost) {
						if (boost[i]! < 0) {
							delete boost[i];
							showMsg = true;
						}
					}
					if (showMsg && !(effect as ActiveMove).secondaries) {
						this.add('-activate', target, 'move: Guardian Wind');
					}
				}
			},
			onSetStatus(status, target, source, effect) {
				if (!effect || !source || effect.id === 'yawn'/*) return;
				if */|| (effect.effectType === 'Move' && effect.infiltrates && target.side !== source.side)) return;
				if (target !== source) {
					this.debug('interrupting setStatus');
					if (effect.id === 'synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'move: Guardian Wind');
					}
					return null;
				}
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!effect || !source) return;
				if (effect.effectType === 'Move' && effect.infiltrates && target.side !== source.side) return;
				if ((status.id === 'confusion' || status.id === 'yawn') && target !== source) {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Guardian Wind');
					return null;
				}
			},
			onStart(side) {
				this.add('-sidestart', side, 'Guardian Wind');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 3,
			onEnd(side) {
				this.add('-sideend', side, 'Guardian Wind');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Flying",
		zMove: {effect: 'heal'},
		contestType: "Cool",
	},
	coconutburst: {
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		desc: "Hits two to five times. Each hit has a 10% chance to lower the target's Defense by 1 stage. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Hits 2-5 times. 10% chance to lower the target's Defense by 1.",
		isViable: true,
		name: "Coconut Burst",
		pp: 30,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		multihit: [2, 5],
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Rock Blast');
		},
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Grass",
		zMove: {basePower: 140},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},
	heatrelease: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Fails unless the user is a Fire type. If this move is successful, it restores 2/3 of the user's maximum HP and if it is not Terastallized, the user's Fire type becomes typeless as long as it remains active.",
		shortDesc: "Restores 2/3 of Max HP; User's Fire type becomes typeless; must be Fire.",
		isViable: true,
		name: "Heat Release",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [2, 3],
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Bulk Up');
		},
		onTryMove(pokemon, target, move) {
			if (pokemon.hasType('Fire')) return;
			this.add('-fail', pokemon, 'move: Heat Release');
			
			return null;
		},
		onHit(pokemon) {
			pokemon.setType(pokemon.getTypes(true).map(type => type === "Fire" ? "???" : type));
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] move: Heat Release');
		},
		secondary: null,
		target: "self",
		type: "Fire",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	steadystream: {
		accuracy: 100,
		basePower: 50,
		basePowerCallback() {
			if (this.field.pseudoWeather.steadystream) {
				return 50 * this.field.pseudoWeather.steadystream.multiplier;
			}
			return 50;
		},
		category: "Special",
		desc: "For every consecutive turn that this move is used by at least one Pokemon, this move's power is multiplied by the number of turns to pass, but not more than 5.",
		shortDesc: "Power increases when used on consecutive turns.",
		isViable: true,
		name: "Steady Stream",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Sparkling Aria');
		},
		onTry() {
			this.field.addPseudoWeather('steadystream');
		},
		condition: {
			duration: 2,
			onStart() {
				this.effectData.multiplier = 1;
			},
			onRestart() {
				if (this.effectData.duration !== 2) {
					this.effectData.duration = 2;
					if (this.effectData.multiplier < 5) {
						this.effectData.multiplier++;
					}
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},
	psychicsurf: {
		accuracy: 100,
		basePower: 95,
		category: "Special",
		desc: "If the current terrain is Psychic Terrain and the user is grounded, this move has a 100% chance to raise the its Speed by 1 stage.",
		shortDesc: "User on Psychic Terrain: 100% chance to raise its Speed by 1.",
		isViable: true,
		name: "Psychic Surf",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Expanding Force');
		},
		secondary: {
			chance: 100,
			self: {
				onHit(target, source, move) {
					return (this.field.isTerrain('psychicterrain') && source.isGrounded() && !!this.boost({spe: 1}, source));
				},
			},
		},
		target: "allAdjacent",
		type: "Psychic",
		contestType: "Beautiful",
	},
	//Pre-Lorian mons that get this: Electivire, Mareep line, Shinx line, Pachirisu, Blitzle line, Eelektrik, Eelektross, Yamper line,
	// Toxel line, Rhyhorn line, Absol, Pikachu, Raichu, Plusle, Minun, Pachirisu, Emolga, Dedenne, Togedemaru, Rikomoco

	shocktail: {
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		desc: "If the target has at least one stat change greater than 0, then this move has a 100% chance to paralyze the target.",
		shortDesc: "Paralyzes if the target has positive stat boosts.",
		isViable: true,
		name: "Shock Tail",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Charge");
			this.add('-anim', source, "Iron Tail", target);
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (target.positiveBoosts()) {
					target.trySetStatus('par', source, move);
				}
			},
		},
		target: "normal",
		type: "Electric",
		contestType: "Beautiful",
	},
	//Vanillite, Tropius, and Snover lines get this too
	bananasplit: {
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		desc: "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit. In Double Battles, this move attempts to hit the targeted Pokemon and its ally once each. If hitting one of these Pokemon would be prevented by immunity, protection, semi-invulnerability, an Ability, or accuracy, it attempts to hit the other Pokemon twice instead. If this move is redirected, it hits that target twice.",
		shortDesc: "Hits twice. Doubles: Tries to hit each foe once.",
		isViable: true,
		name: "Banana Split",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Icy Wind');
		},
		multihit: 2,
		smartTarget: true,
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ice",
		maxMove: {basePower: 130},
	},
	swindle: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "The user swaps its held item with the target's held item. If this move is successful, the user switches out even if it is trapped and is replaced immediately by a selected party member. Fails if either the user or the target is holding a Mail, Wonder Mask, or Z-Crystal, if neither is holding an item, if the user is trying to give or take a Mega Stone to or from the species that can Mega Evolve with it, or if the user is trying to give or take a Blue Orb, a Red Orb, a Griseous Orb, a Plate, a Drive, a Memory, a Rusted Sword, a Rusted Shield, or an Awakening Seed to or from a Kyogre, a Groudon, a Giratina, an Arceus, a Genesect, a Silvally, a Zacian, a Zamazenta, or a Lutakon respectively. The target is immune to this move if it has the Sticky Hold or Suction Cups Ability. The user does not switch out if there are no unfainted party members.",
		shortDesc: "Switches user's item with foe's. User switches out if successful.",
		isViable: true,
		name: "Swindle",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, mystery: 1, reflectable: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Trick');
		},
		onTryImmunity(target) {
			return !target.hasAbility(['stickyhold','suctioncups']);
		},
		onHit(target, source, move) {
			const yourItem = target.takeItem(source);
			const myItem = source.takeItem();
			if (target.item || source.item || (!yourItem && !myItem)) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				delete move.selfSwitch;
				return false;
			}
			if (
				(myItem && !this.singleEvent('TakeItem', myItem, source.itemData, target, source, move, myItem)) ||
				(yourItem && !this.singleEvent('TakeItem', yourItem, target.itemData, source, target, move, yourItem))
			) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				delete move.selfSwitch;
				return false;
			}
			this.add('-activate', source, 'move: Trick', '[of] ' + target);
			if (myItem) {
				target.setItem(myItem);
				this.add('-item', target, myItem, '[from] move: Switcheroo');
			} else {
				this.add('-enditem', target, yourItem, '[silent]', '[from] move: Switcheroo');
			}
			if (yourItem) {
				source.setItem(yourItem);
				this.add('-item', source, yourItem, '[from] move: Switcheroo');
			} else {
				this.add('-enditem', source, myItem, '[silent]', '[from] move: Switcheroo');
			}
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Dark",
		zMove: {boost: {spe: 2}},
		contestType: "Clever",
	},
	//Realmon distribution: Plusle, Minun, Eelektrik, Joltik, Chinchou, Regieleki, Stunfisk, Togedemaru, Blitzle, Zeraora
	sparkingleap: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Has a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio.",
		isViable: true,
		name: "Sparking Leap",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Bolt Beak');
		},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	pearlbarrage: {
		accuracy: 100,
		basePower: 85,
		category: "Special",
		desc: "Has a 100% chance to lower the target's Attack and Special Attack by 1 stage.",
		shortDesc: "100% chance to lower the foe(s)'s Attack and Sp. Atk by 1.",
		isViable: true,
		name: "Pearl Barrage",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Power Gem');
		},
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
				spa: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Rock",
	},
	//Pre-Loria distribution: Zarude, Rowlet line (+Presumably Decidueye-H), Cacnea line, Phantump line, Carnivine
	fireworkleaf: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "This move's type effectiveness against Steel is changed to be super effective no matter what this move's type is.",
		shortDesc: "Super effective against Steel-types.",
		isViable: true,
		name: "Firework Leaf",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, bullet: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Jungle Healing", target);
			this.add('-anim', source, "Flame Burst", target);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Steel') return 1;
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Beautiful",
	},
	//Realmon distribtuion: Magby line, Cyndaquil line (+Presumably Typhlosion-H), Fennekin line, Salandit line, Kalosian Litleo line
	quickshot: {
		accuracy: 100,
		basePower: 40,
		category: "Special",
		desc: "No additional effect.",
		shortDesc: "Usually goes first.",
		isViable: true,
		name: "Quick Shot",
		pp: 30,
		priority: 1,
		flags: {protect: 1, mirror: 1, bullet: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Ember');
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	mercilessrend: {
		accuracy: 95,
		basePower: 85,
		category: "Physical",
		desc: "Prevents the target from switching for four or five turns (seven turns if the user is holding Grip Claw). Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Drift, Frost Feint, Flip Turn, Parting Shot, Poisonous Flight, Shed Tail, Swindle, Teleport, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field, or if the target uses Mortal Spin, Rapid Spin, or Substitute successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps and damages the target for 4-5 turns.",
		isViable: true,
		name: "Merciless Rend",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, bite: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Crunch');
		},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},
	skylance: {
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		shortDesc: "Fails if the user is grounded.",
		isViable: true,
		name: "Sky Lance",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, gravity: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Aerial Ace');
		},
		onTryHit(target, source) {
			if (source.isGrounded()) return false;
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
	spellcast: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "Has a 20% chance to cause the target to either fall asleep, become poisoned, or become paralyzed.",
		shortDesc: "20% chance to sleep, poison, or paralyze target.",
		isViable: true,
		name: "Spell Cast",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Hex');
		},
		secondary: {
			chance: 20,
			onHit(target, source) {
				const result = this.random(3);
				if (result === 0) {
					target.trySetStatus('par', source);
				} else if (result === 1) {
					target.trySetStatus('slp', source);
				} else {
					target.trySetStatus('psn', source);
				}
			},
		},
		target: "normal",
		type: "Dark",
		contestType: "Beautiful",
	},
	steamingblast: {
		accuracy: 90,
		basePower: 95,
		category: "Special",
		desc: "Has a 30% chance to burn the target. This move's type effectiveness against Water is changed to be super effective no matter what this move's type is.",
		shortDesc: "30% chance to burn. Super effective on Water.",
		isViable: true,
		name: "Steaming Blast",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1, metronome: 1},
		thawsTarget: true,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Steam Eruption');
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Water') return 1;
		},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},
	jawsoflife: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "If the target is an ally, this move restores 1/2 of its maximum HP, rounded down, instead of dealing damage. If the target is an opponent, it prevents it from switching out. The opponent can still switch out if it is holding Shed Shell or uses Baton Pass, Drift, Flip Turn, Frost Feint, Parting Shot, Poisonous Flight, Swindle, Teleport, U-turn, or Volt Switch. If the opponent leaves the field using Baton Pass, the replacement will remain trapped. The effect ends if the user leaves the field.",
		shortDesc: "Traps if used on foe. If used on ally, heals by 50% of their max HP.",
		isViable: true,
		name: "Jaws of Life",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, bite: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Psychic Fangs');
		},
		onTryHit(target, source, move) {
			if (source.side === target.side) {
				move.basePower = 0;
				move.infiltrates = true;
				delete move.secondaries;
			}
		},
		onHit(target, source) {
			if (source.side === target.side && !this.heal(Math.floor(target.baseMaxhp * 0.5))) {
				this.add('-immune', target);
			}
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
		type: "Normal",
		contestType: "Clever",
	},
	javelinstone: {
		accuracy: 90,
		basePower: 120,
		category: "Physical",
		desc: "Has a 20% chance to lower the target's Defense by 1 stage.",
		shortDesc: "20% chance to lower the target's Defense by 1.",
		isViable: true,
		name: "Javelin Stone",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Rock Wrecker');
		},
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Rock",
		contestType: "Cool",
	},
	//Realmon distribution: Rhyhorn line, Onix line, Aron line, Armaldo, Regirock,
	//	Rampardos, Gigalith, Barbaracle, Lycanroc-Midnight, Stonjourner line
 
	crippleclobber: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Has a 100% chance to lower the target's Speed by 1 stage.",
		shortDesc: "100% chance to lower the target's Speed by 1.",
		isViable: true,
		name: "Cripple Clobber",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Low Kick');
		},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Rock",
		contestType: "Cute",
	},
	thunderstrike: {
		accuracy: 70,
		basePower: 110,
		category: "Physical",
		desc: "Has a 30% chance to paralyze the target. This move can hit a target using Bounce, Fly, or Sky Drop, or is under the effect of Sky Drop. If the weather is Desolate Land or Sunny Day, this move does not check accuracy. If this move is used against a Pokemon holding Utility Umbrella, this move's accuracy remains at 70%.",
		shortDesc: "30% chance to paralyze. Can't miss in sun.",
		isViable: true,
		name: "Thunderstrike",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Bolt Strike');
		},
		onModifyMove(move, pokemon, target) {
			if (this.field.isWeather(['sunnyday', 'desolateland'])) move.accuracy = true;
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	aquaballet: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Special Attack and Speed by 1 stage.",
		shortDesc: "Raises the user's Sp. Atk and Speed by 1.",
		isViable: true,
		name: "Aqua Ballet",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, dance: 1, metronome: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Rain Dance');
		},
		boosts: {
			spa: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Water",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	ironblaster: {
		accuracy: 80,
		basePower: 120,
		category: "Special",
		desc: "Has a 30% chance to lower the target's Special Defense by 1 stage.",
		shortDesc: "30% chance to lower the target's Sp. Def by 1.",
		isViable: true,
		name: "Iron Blaster",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Steel Beam');
		},
		secondary: {
			chance: 30,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	genesiswave: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "The user recovers 3/4 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 75% of the damage dealt.",
		isViable: true,
		name: "Genesis Wave",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1, heal: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Parabolic Charge');
		},
		drain: [3, 4],
		secondary: null,
		target: "any",
		type: "Electric",
		contestType: "Cool",
	},
	idlethunder: {
		accuracy: 100,
		basePower: 140,
		category: "Special",
		desc: "Deals damage two turns after this move is used. At the end of that turn, the damage is calculated at that time and dealt to the Pokemon at the position the target had when the move was used. If the user is no longer active at the time, damage is calculated based on the user's natural Special Attack stat, types, and level, with no boosts from its held item or Ability. Fails if this move, Doom Desire, or Future Sight is already in effect for the target's position.",
		shortDesc: "Hits two turns after being used.",
		isViable: true,
		name: "Idle Thunder",
		pp: 5,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Zap Cannon');
		},
		isFutureMove: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'idlethunder',
				source: source,
				moveData: {
					id: 'idlethunder',
					name: "Idle Thunder",
					accuracy: 100,
					basePower: 140,
					category: "Special",
					priority: 0,
					flags: {},
					effectType: 'Move',
					isFutureMove: true,
					type: 'Electric',
				},
			});
			this.add('-start', source, 'Idle Thunder');
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Beautiful",
	},
	disasterbolt: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "Has a 100% chance to lower the target's Special Defense by 1 stage.",
		shortDesc: "100% chance to lower the target's Sp. Def by 1.",
		isViable: true,
		name: "Disaster Bolt",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Thunder');
		},
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Electric",
	},
	dragonsgift: {
		accuracy: 90,
		basePower: 0,
		category: "Physical",
		desc: "If this move is successful, it deals damage or heals the target. 40% chance for 80 power, 30% chance for 100 power, 10% chance for 120 power, and 20% chance to raise the target's critical hit ratio by 1 stage.",
		shortDesc: "80, 100, 120 power, or raises the target's crit ratio by 1 stage.",
		isViable: true,
		name: "Dragon's Gift",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[anim] Dynamax Cannon');
		},
		onModifyMove(move, pokemon, target) {
			const rand = this.random(10);
			if (rand < 2) {
				target.addVolatile('gmaxchistrike');
				move.infiltrates = true;
			} else if (rand < 6) {
				move.basePower = 80;
			} else if (rand < 9) {
				move.basePower = 100;
			} else {
				move.basePower = 120;
			}
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Cute",
	},
};
