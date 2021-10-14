/*
List of flags and their descriptions:
authentic: Ignores a target's substitute.
bite: Power is multiplied by 1.5 when used by a Pokemon with the Ability Strong Jaw.
bullet: Has no effect on Pokemon with the Ability Bulletproof.
charge: The user is unable to make a move between turns.
contact: Makes contact.
dance: When used by a Pokemon, other Pokemon with the Ability Dancer can attempt to execute the same move.
defrost: Thaws the user if executed successfully while the user is frozen.
distance: Can target a Pokemon positioned anywhere in a Triple Battle.
gravity: Prevented from being executed or selected during Gravity's effect.
heal: Prevented from being executed or selected during Heal Block's effect.
mirror: Can be copied by Mirror Move.
mystery: Unknown effect.
nonsky: Prevented from being executed or selected in a Sky Battle.
powder: Has no effect on Grass-type Pokemon, Pokemon with the Ability Overcoat, and Pokemon holding Safety Goggles.
protect: Blocked by Detect, Protect, Spiky Shield, and if not a Status move, King's Shield.
pulse: Power is multiplied by 1.5 when used by a Pokemon with the Ability Mega Launcher.
punch: Power is multiplied by 1.2 when used by a Pokemon with the Ability Iron Fist.
recharge: If this move is successful, the user must recharge on the following turn and cannot make a move.
reflectable: Bounced back to the original user by Magic Coat or the Ability Magic Bounce.
snatch: Can be stolen from the original user and instead used by another Pokemon using Snatch.
sound: Has no effect on Pokemon with the Ability Soundproof.
*/
export const Moves: {[k: string]: ModdedMoveData} = {
    "firepunch": {
        num: 7,
        accuracy: 100,
        basePower: 80,
        category: "Physical",
        desc: "Has a 10% chance to burn the target.",
        shortDesc: "10% chance to burn the target.",
        id: "firepunch",
        isViable: true,
        name: "Fire Punch",
        pp: 15,
        priority: 0,
        flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
        secondary: {
            chance: 10,
            status: 'brn',
        },
        target: "normal",
        type: "Fire",
        contestType: "Tough",
    },
    "icepunch": {
        num: 8,
        accuracy: 100,
        basePower: 80,
        category: "Physical",
        desc: "Has a 10% chance to freeze the target.",
        shortDesc: "10% chance to freeze the target.",
        id: "icepunch",
        isViable: true,
        name: "Ice Punch",
        pp: 15,
        priority: 0,
        flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
        secondary: {
            chance: 10,
            status: 'frz',
        },
        target: "normal",
        type: "Ice",
        contestType: "Beautiful",
    },
    "thunderpunch": {
        num: 9,
        accuracy: 100,
        basePower: 80,
        category: "Physical",
        desc: "Has a 10% chance to paralyze the target.",
        shortDesc: "10% chance to paralyze the target.",
        id: "thunderpunch",
        isViable: true,
        name: "Thunder Punch",
        pp: 15,
        priority: 0,
        flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
        secondary: {
            chance: 10,
            status: 'par',
        },
        target: "normal",
        type: "Electric",
        contestType: "Cool",
    },
    "shadowpunch": {
        num: 325,
        accuracy: 100,
        basePower: 80,
        category: "Physical",
        shortDesc: "10% chance to confuse the target.",
        id: "shadowpunch",
        isViable: true,
        name: "Shadow Punch",
        pp: 15,
        priority: 0,
        flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
        secondary: {
            chance: 10,
            volatileStatus: 'confusion',
        },
        target: "normal",
        type: "Ghost",
        contestType: "Clever",
    },
    "ferventscreech": {
        accuracy: 100,
        basePower: 80,
        category: "Special",
        desc: "Has a 10% chance to burn the target(s).",
        shortDesc: "Has a 10% chance to burn the target(s)",
        id: "ferventscreech",
        isViable: true,
        name: "Fervent Screech",
        pp: 10,
        priority: 0,
        flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		  onPrepareHit: function(target, source, move) {
			  this.attrLastMove('[still]');
			  this.add('-anim', source, "Heat Wave", target);
		  },
        secondary: {
            chance: 10,
            status: 'brn',
        },
        target: "allAdjacentFoes",
        type: "Fire",
    },
    "flamethrower": {
        num: 53,
        accuracy: 100,
        basePower: 95,
        category: "Special",
        desc: "Has a 10% chance to burn the target.",
        shortDesc: "10% chance to burn the target.",
        id: "flamethrower",
        isViable: true,
        name: "Flamethrower",
        pp: 15,
        priority: 0,
        flags: {protect: 1, mirror: 1},
        secondary: {
            chance: 10,
            status: 'brn',
        },
        target: "normal",
        type: "Fire",
        contestType: "Beautiful",
    },
    "thunderbolt": {
        num: 85,
        accuracy: 100,
        basePower: 95,
        category: "Special",
        desc: "Has a 10% chance to paralyze the target.",
        shortDesc: "10% chance to paralyze the target.",
        id: "thunderbolt",
        isViable: true,
        name: "Thunderbolt",
        pp: 15,
        priority: 0,
        flags: {protect: 1, mirror: 1},
        secondary: {
            chance: 10,
            status: 'par',
        },
        target: "normal",
        type: "Electric",
        contestType: "Cool",
    },
    "icebeam": {
        num: 58,
        accuracy: 100,
        basePower: 95,
        category: "Special",
        desc: "Has a 10% chance to freeze the target.",
        shortDesc: "10% chance to freeze the target.",
        id: "icebeam",
        isViable: true,
        name: "Ice Beam",
        pp: 10,
        priority: 0,
        flags: {protect: 1, mirror: 1},
        secondary: {
            chance: 10,
            status: 'frz',
        },
        target: "normal",
        type: "Ice",
        contestType: "Beautiful",
    },
    "surf": {
        num: 57,
        accuracy: 100,
        basePower: 95,
        category: "Special",
        desc: "Damage doubles if the target is using Dive.",
        shortDesc: "Hits adjacent Pokemon. Double damage on Dive.",
        id: "surf",
        isViable: true,
        name: "Surf",
        pp: 15,
        priority: 0,
        flags: {protect: 1, mirror: 1, nonsky: 1},
        secondary: null,
        target: "allAdjacent",
        type: "Water",
        contestType: "Beautiful",
    },
    "petalblizzard": {
        num: 572,
        accuracy: 100,
        basePower: 95,
        category: "Physical",
        desc: "No additional effect.",
        shortDesc: "No additional effect. Hits adjacent Pokemon.",
        id: "petalblizzard",
        isViable: true,
        name: "Petal Blizzard",
        pp: 15,
        priority: 0,
        flags: {protect: 1, mirror: 1},
        secondary: null,
        target: "allAdjacent",
        type: "Grass",
        contestType: "Beautiful",
    },
    "moonblast": {
        num: 585,
        accuracy: 100,
        basePower: 95,
        category: "Special",
        desc: "Has a 30% chance to lower the target's Special Attack by 1 stage.",
        shortDesc: "30% chance to lower the target's Sp. Atk by 1.",
        id: "moonblast",
        isViable: true,
        name: "Moonblast",
        pp: 15,
        priority: 0,
        flags: {protect: 1, mirror: 1},
        secondary: {
            chance: 10,
            boosts: {
                spa: -1,
            },
        },
        target: "normal",
        type: "Fairy",
        contestType: "Beautiful",
    },
    "energyball": {
        num: 412,
        accuracy: 100,
        basePower: 95,
        category: "Special",
        desc: "Has a 10% chance to lower the target's Special Defense by 1 stage.",
        shortDesc: "10% chance to lower the target's Sp. Def by 1.",
        id: "energyball",
        isViable: true,
        name: "Energy Ball",
        pp: 10,
        priority: 0,
        flags: {bullet: 1, protect: 1, mirror: 1},
        secondary: {
            chance: 10,
            boosts: {
                spd: -1,
            },
        },
        target: "normal",
        type: "Grass",
        contestType: "Beautiful",
    },
    "firefang": {
        num: 424,
        accuracy: 95,
        basePower: 70,
        category: "Physical",
        desc: "Has a 10% chance to burn the target and a 10% chance to flinch it.",
        shortDesc: "10% chance to burn. 10% chance to flinch.",
        id: "firefang",
        isViable: true,
        name: "Fire Fang",
        pp: 15,
        priority: 0,
        flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
        secondaries: [
            {
                chance: 10,
                status: 'brn',
            }, {
                chance: 10,
                volatileStatus: 'flinch',
            },
        ],
        target: "normal",
        type: "Fire",
        contestType: "Cool",
    },
    "icefang": {
        num: 423,
        accuracy: 95,
        basePower: 70,
        category: "Physical",
        desc: "Has a 10% chance to freeze the target and a 10% chance to flinch it.",
        shortDesc: "10% chance to freeze. 10% chance to flinch.",
        id: "icefang",
        isViable: true,
        name: "Ice Fang",
        pp: 15,
        priority: 0,
        flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
        secondaries: [
            {
                chance: 10,
                status: 'frz',
            }, {
                chance: 10,
                volatileStatus: 'flinch',
            },
        ],
        target: "normal",
        type: "Ice",
        contestType: "Cool",
    },
    "thunderfang": {
        num: 422,
        accuracy: 95,
        basePower: 70,
        category: "Physical",
        desc: "Has a 10% chance to paralyze the target and a 10% chance to flinch it.",
        shortDesc: "10% chance to paralyze. 10% chance to flinch.",
        id: "thunderfang",
        name: "Thunder Fang",
        pp: 15,
        priority: 0,
        flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
        secondaries: [
            {
                chance: 10,
                status: 'par',
            }, {
                chance: 10,
                volatileStatus: 'flinch',
            },
        ],
        target: "normal",
        type: "Electric",
        contestType: "Cool",
    },
    "poisonfang": {
        num: 305,
        accuracy: 95,
        basePower: 70,
        category: "Physical",
        desc: "Has a 30% chance to badly poison the target.",
        shortDesc: "30% chance to badly poison the target.",
        id: "poisonfang",
        name: "Poison Fang",
        pp: 15,
        priority: 0,
        flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
        secondary: {
            chance: 30,
            status: 'tox',
        },
        target: "normal",
        type: "Poison",
        contestType: "Clever",
    },
    "hiddenleafstrike": {
        accuracy: true,
        basePower: 100,
        category: "Physical",
        desc: "Has a higher chance for a critical hit and never misses.",
        shortDesc: "High critical hit ratio.",
        id: "hiddenleafstrike",
        name: "Hidden Leaf Strike",
        pp: 10,
        priority: 0,
        flags: {contact: 1, protect: 1, mirror: 1},
		  onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
		  	this.add('-anim', source, "Cross Chop", target);
		  },
        critRatio: 2,
        secondary: null,
        target: "normal",
        type: "Fighting",
        contestType: "Cool",
    },
    "ballup": {
        accuracy: true,
        basePower: 0,
        category: "Status",
        desc: "The user is protected from most attacks made by other Pokemon during this turn. If a Pokemon tries to make contact with the user, the user's Defense is boosted by 2 stages. Non-damaging moves go through this protection. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails, if the user's last move used is not Baneful Bunker, Detect, Endure, King's Shield, Obstruct, Protect, Quick Guard, Spiky Shield, or Wide Guard, or if it was one of those moves and the user's protection was broken. Fails if the user moves last this turn.",
        shortDesc: "Protects from damaging attacks. Contact: User +2 Def.",
        id: "ballup",
        isViable: true,
        name: "Ball Up",
        pp: 10,
        priority: 4,
        flags: {},
		  onPrepareHit: function(target, source, move) {
			  this.attrLastMove('[still]');
			  this.add('-anim', source, "Defense Curl", target);
		  },
        stallingMove: true,
        volatileStatus: 'ballup',
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
					if (lockedmove) {
						// Outrage counter is reset
						if (source.volatiles['lockedmove'].duration === 2) {
							delete source.volatiles['lockedmove'];
						}
					}
					if (move.flags['contact']) {
						this.damage(source.baseMaxhp / 8, source, target);
					}
					return this.NOT_FAIL;
				},
				onHit(target, source, move) {
					if (move.isZOrMaxPowered && move.flags['contact']) {
						this.damage(source.baseMaxhp / 8, source, target);
					}
				},
			},
        secondary: null,
        target: "self",
        type: "Ground",
    },
    "doublekick": {
        num: 24,
        accuracy: 90,
        basePower: 50,
        category: "Physical",
        desc: "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit.",
        shortDesc: "Hits 2 times in one turn.",
        id: "doublekick",
        name: "Double Kick",
        pp: 30,
        priority: 0,
        flags: {contact: 1, protect: 1, mirror: 1},
        multihit: 2,
        secondary: null,
        target: "normal",
        type: "Fighting",
        gmaxPower: 90,
        contestType: "Cool",
    },
    "doublehit": {
        num: 458,
        accuracy: 90,
        basePower: 50,
        category: "Physical",
        desc: "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit.",
        shortDesc: "Hits 2 times in one turn.",
        id: "doublehit",
        name: "Double Hit",
        pp: 10,
        priority: 0,
        flags: {contact: 1, protect: 1, mirror: 1},
        multihit: 2,
        secondary: null,
        target: "normal",
        type: "Normal",
        zMovePower: 140,
        gmaxPower: 120,
        contestType: "Cool",
    },
    "twineedle": {
        num: 41,
        accuracy: 100,
        basePower: 40,
        category: "Physical",
        isNonstandard: null,
        desc: "Hits twice, with each hit having a 20% chance to poison the target. If the first hit breaks the target's substitute, it will take damage for the second hit.",
        shortDesc: "Hits 2 times. Each hit has 20% chance to poison.",
        id: "twineedle",
        name: "Twineedle",
        pp: 20,
        priority: 0,
        flags: {protect: 1, mirror: 1},
        multihit: 2,
        secondary: {
            chance: 20,
            status: 'psn',
        },
        target: "normal",
        type: "Bug",
        gmaxPower: 110,
        contestType: "Cool",
    },
    "bindinglight": {
        accuracy: 100,
        basePower: 0,
        category: "Status",
        desc: "Prevents the target from switching out and increase the user's Defense and Special Defense by 1. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, U-turn, or Volt Switch. If the target leaves the field using Baton Pass, the replacement will remain trapped. The effect ends if the user leaves the field.",
        shortDesc: "Prevents the target from switching out. Raises Def and SpD by 1.",
        id: "bindinglight",
        name: "Binding Light",
        pp: 5,
        priority: 0,
        flags: {reflectable: 1, mirror: 1, protect: 1},
		  onPrepareHit: function(target, source, move) {
			  this.attrLastMove('[still]');
			  this.add('-anim', source, "Flash", target);
		  },
        onHit(target, source, move) {
            return target.addVolatile('trapped', source, move, 'trapper');
        },
        secondary: {
            chance: 100,
            self: {
                boosts: {
                    def: 1,
                    spd: 1,
                },
            },
        },
        target: "normal",
        type: "Fairy",
        zMoveBoost: {def: 1},
        contestType: "Beautiful",
    },
    "ionicbond": {
        accuracy: 90,
        basePower: 0,
		  damageCallback(pokemon, target) {
			return this.clampIntRange(target.getUndynamaxedHP() / 2, 1);
		  },
        category: "Special",
        desc: "Deals damage to the target equal to half of its current HP, rounded down, but not less than 1 HP. Heals the user by 50% of the damage dealt",
        shortDesc: "Does damage equal to 1/2 target's current HP. Heals 50% of damage dealth",
        id: "ionicbond",
        name: "Ionic Bond",
        pp: 10,
        priority: 0,
        flags: {protect: 1, mirror: 1, heal: 1},
		  drain: [1, 2],
        secondary: null,
        target: "normal",
        type: "Electric",
        contestType: "Tough",
    },
    "teleport": {
        num: 100,
        accuracy: 100,
        basePower: 70,
        category: "Special",
        desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button or through the effect of the Emergency Exit or Wimp Out Abilities.",
        shortDesc: "User switches out after damaging the target.",
        id: "Teleport",
        isViable: true,
        name: "Teleport",
        pp: 20,
        priority: 0,
        flags: {protect: 1, mirror: 1},
        selfSwitch: true,
        secondary: null,
        target: "normal",
        type: "Psychic",
        contestType: "Clever",
    },
    "wingattack": {
        num: 17,
        accuracy: 100,
        basePower: 85,
        category: "Physical",
        shortDesc: "Has a 10% chance to lower the opponent's Speed by 1.",
        id: "wingattack",
        name: "Wing Attack",
        pp: 35,
        priority: 0,
        flags: {contact: 1, protect: 1, mirror: 1, distance: 1},
        secondary: {
            chance: 20,
            boosts: {
                spe: -1,
            },
        },
        target: "any",
        type: "Flying",
        contestType: "Cool",
    },
    "dragonrush": {
        num: 407,
        accuracy: 85,
        basePower: 100,
        category: "Physical",
        desc: "Has a 20% chance to flinch the target. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
        shortDesc: "20% chance to flinch the target.",
        id: "dragonrush",
        name: "Dragon Rush",
        pp: 10,
        priority: 0,
        flags: {contact: 1, protect: 1, mirror: 1},
        secondary: {
            chance: 20,
            volatileStatus: 'flinch',
        },
        target: "normal",
        type: "Dragon",
        contestType: "Tough",
    },
    "spikecannon": {
        num: 131,
        accuracy: 100,
        basePower: 25,
        category: "Physical",
        desc: "Hits two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
        shortDesc: "Hits 2-5 times in one turn.",
        id: "spikecannon",
        isNonstandard: null,
        name: "Spike Cannon",
        pp: 15,
        priority: 0,
        flags: {protect: 1, mirror: 1},
        multihit: [2, 5],
        secondary: null,
        target: "normal",
        type: "Steel",
        gmaxPower: 120,
        contestType: "Cool",
    },
 "sharpsteel": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Hurts foes on switch-in. Factors Steel weakness.",
		id: "sharpsteel",
		isViable: true,
		name: "Sharp Steel",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		sideCondition: 'sharpsteel',
		effect: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Sharp Steel');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyboots')) return;
				let typeMod = this.dex.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('sharpsteel')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Steel",
		zMoveBoost: {def: 1},
		contestType: "Cool",
	},
    "oxidation": {
        accuracy: 100,
        basePower: 70,
        category: "Special",
        desc: "This move's type effectiveness against Steel is changed to be super effective no matter what this move's type is.",
        shortDesc: "Super effective on Steel.",
        id: "oxidation",
        isViable: true,
        name: "Oxidation",
        pp: 20,
        priority: 0,
        flags: {protect: 1, mirror: 1},
		  onPrepareHit: function(target, source, move) {
			  this.attrLastMove('[still]');
			  this.add('-anim', source, "Gust", target);
		  },
        onEffectiveness(typeMod, target, type) {
            if (type === 'Steel') return 1;
        },
        secondary: null,
        target: "normal",
        type: "Flying",
        contestType: "Beautiful",
    },
	"fullmooncrash": {
		  accuracy: 100,
		  basePower: 120,
		  category: "Physical",
		  desc: "The user receives 1/3 damage inflicted in recoil. Has a 10% chance to decrease the target's Atk by 1 stage.",
		  shortDesc: "33% recoil. Has a 10% chance to decrease the target's Atk by 1 stage.",
		  id: "fullmooncrash",
		  isViable: true,
		  name: "Full Moon Crash",
		  pp: 10,
		  priority: 0,
		  flags: {
			  contact: 1,
			  protect: 1,
			  mirror: 1
		  },
		  recoil: [1, 3],
		  secondary: null,
		  onPrepareHit: function(target, source, move) {
			  this.attrLastMove('[still]');
			  this.add('-anim', source, "Double Edge", target);
		  },
		  target: "normal",
		  type: "Fairy",
		  zMovePower: 180,
		  contestType: "Cute",
	 },
	 "corrosiveacid": {
		  accuracy: 100,
		  basePower: 60,
		  category: "Special",
		  desc: "Power doubles if the target is poisoned or burned. 30% chance to poison or burn the target",
		  shortDesc: "Power doubles if the target is poisoned or burned. 30% chance to burn or poison",
		  name: "Corrosive Acid",
		  pp: 10,
		  priority: 0,
		  flags: {protect: 1, mirror: 1},
		  onPrepareHit: function(target, source, move) {
			  this.attrLastMove('[still]');
			  this.add('-anim', source, "Acid Spray", target);
		  },
		  onBasePower(basePower, pokemon, target) {
			  if (target.status === 'psn' || target.status === 'tox' || target.status === 'brn' ) {
				  return this.chainModify(2);
			  }
		  },
		  secondary: {
			  chance: 30,
			  onHit(target, source) {
				  const result = this.random(2);
				  if (result === 0) {
					  target.trySetStatus('brn', source);
				  } else if (result === 1) {
					  target.trySetStatus('psn', source);
				  }
			  },
		  },
		  target: "normal",
		  type: "Poison",
		  contestType: "Beautiful",
	 },
    "dizzypunch": {
        num: 146,
        accuracy: 100,
        basePower: 80,
        category: "Physical",
		  isNonstandard: null,
        shortDesc: "10% chance to confuse the target.",
        id: "dizzypunch",
        isViable: true,
        name: "Dizzy Punch",
        pp: 15,
        priority: 0,
        flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
        secondary: {
            chance: 10,
            volatileStatus: 'confusion',
        },
        target: "normal",
        type: "Fairy",
        contestType: "Clever",
    },
		"splitatoms": {
		  accuracy: 100,
		  basePower: 250,
		  category: "Special",
        shortDesc: "User faints after use. Summons Aurora Veil.",
		  name: "Split Atoms",
		  pp: 5,
		  priority: 0,
		  flags: {protect: 1, mirror: 1},
		  onPrepareHit: function(target, source, move) {
			  this.attrLastMove('[still]');
			  this.add('-anim', source, "Acid Armor", target);
			  this.add('-anim', source, "Misty Explosion", target);
		  },
		  selfdestruct: "always",
		  self: {
			  sideCondition: 'auroraveil',
		  },
		  secondary: null,
		  target: "allAdjacent",
		  type: "Psychic",
	},
		"cometpunch": {
		  num: 4,
		  accuracy: 100,
		  basePower: 25,
		  category: "Physical",
		  isNonstandard: null,
		  name: "Comet Punch",
		  pp: 15,
		  priority: 0,
		  flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		  multihit: [2, 5],
		  secondary: null,
		  target: "normal",
		  type: "Psychic",
		  maxMove: {basePower: 100},
		  contestType: "Tough",
	},
	defog: {
		num: 432,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Defog",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'sharpsteel',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'sharpsteel',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.getEffect(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			this.field.clearTerrain();
			return success;
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		zMove: {boost: {accuracy: 1}},
		contestType: "Cool",
	},
	rapidspin: {
		num: 229,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Rapid Spin",
		pp: 40,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'sharpsteel'];
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
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'sharpsteel'];
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
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	rockthrow: {
		num: 88,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
      shortDesc: "Removes hazards from the field.",
		name: "Rock Throw",
		pp: 40,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rock Throw', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'sharpsteel'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Rock Throw', '[of] ' + pokemon);
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
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'sharpsteel'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Rock Throw', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		target: "normal",
		type: "Rock",
		contestType: "Cool",
	},
	naturalgift: {
		num: 363,
		accuracy: 100,
		basePower: 0,
		category: "Physical",
		isNonstandard: null,
      shortDesc: "Type and power based on user's berry.",
		name: "Natural Gift",
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
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Clever",
	},
	websling: {
		accuracy: 100,
		basePower: 40,
		category: "Physical",
      shortDesc: "+1 Priority. Hits all adjacent foes.",
		name: "Web Sling",
		pp: 30,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Sticky Web", target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Bug",
		contestType: "Cool",
	},
	flash: {
		num: 148,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		isNonstandard: null,
      shortDesc: "+1 Priority. Hits all adjacent foes.",
		isViable: true,
		name: "Flash",
		pp: 30,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Electric",
		contestType: "Cool",
	},
	cut: {
		num: 15,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
      shortDesc: "High critical hit ratio.",
		isViable: true,
		name: "Cut",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	rocksmash: {
		num: 249,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
      shortDesc: "Foe: -1 Def.",
		isViable: true,
		name: "Rock Smash",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},
	strength: {
		num: 70,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
      shortDesc: "Super Effective on Rock.",
		isViable: true,
		name: "Strength",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Rock') return 1;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Beautiful",
	},
	pound: {
		num: 1,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Pound",
		pp: 35,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
	rockclimb: {
		num: 431,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		isNonstandard: null,
      shortDesc: "Gives the user the High Ground (Magnet Rise).",
		isViable: true,
		name: "Rock Climb",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			onHit(source) {
				for (const pokemon of source.side.active) {
					pokemon.addVolatile('magnetrise');
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	bittrip: {
		accuracy: 95,
		basePower: 4,
		basePowerCallback(pokemon, target, move) {
			return 4 * (Math.pow(2, move.hit));
		},
		category: "Special",
      shortDesc: "Hits 4 times. Each hit can miss, but power rises exponentially.",
		isViable: true,
		name: "Bit Trip",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Signal Beam", target);
		},
		multihit: 4,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Electric",
		zMove: {basePower: 120},
		maxMove: {basePower: 140},
	},
	darkdivide: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
      shortDesc: "Foe: -1 Def & SpD",
		isViable: true,
		name: "Dark Divide",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Spacial Rend", target);
		  this.add('-anim', source, "Hex", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		target: "normal",
		type: "Dark",
		contestType: "Cute",
	},
	hiddenpower: {
		num: 237,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		isNonstandard: null,
		name: "Hidden Power",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			move.type = pokemon.hpType || 'Dark';
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Clever",
	},
	signalbeam: {
		num: 324,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		isNonstandard: null,
		name: "Signal Beam",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Bug",
		contestType: "Beautiful",
	},
	healorder: {
		num: 456,
		accuracy: true,
		basePower: 0,
		category: "Status",
      shortDesc: "Heals the user by 52% of their max HP.",
		isNonstandard: null,
		name: "Heal Order",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [13, 25],
		secondary: null,
		target: "self",
		type: "Bug",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	hyperfang: {
		num: 158,
		accuracy: 90,
		basePower: 80,
		category: "Physical",
		isNonstandard: null,
		name: "Hyper Fang",
		pp: 15,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	meditate: {
		num: 96,
		accuracy: true,
		basePower: 0,
		category: "Status",
		isNonstandard: null,
		name: "Meditate",
		pp: 40,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			atk: 1,
			spd: 1,
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		zMove: {boost: {atk: 1}},
		contestType: "Beautiful",
	},
	psychoboost: {
		num: 354,
		accuracy: 90,
		basePower: 140,
		category: "Special",
		isNonstandard: null,
		name: "Psycho Boost",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				spa: -2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	pursuit: {
		inherit: true,
		isNonstandard: null,
	},
	refresh: {
		inherit: true,
		isNonstandard: null,
	},
	return: {
		inherit: true,
		isNonstandard: null,
	},
	frustration: {
		inherit: true,
		isNonstandard: null,
	},
	revelationdance: {
		inherit: true,
		isNonstandard: null,
	},
	tailglow: {
		inherit: true,
		isNonstandard: null,
	},
	barrier: {
		inherit: true,
		isNonstandard: null,
	},
	captivate: {
		inherit: true,
		isNonstandard: null,
	},
	chatter: {
		inherit: true,
		isNonstandard: null,
	},
	chipaway: {
		num: 498,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		isNonstandard: null,
		name: "Chip Away",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		ignoreDefensive: true,
		ignoreEvasion: true,
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
	},
	constrict: {
		num: 132,
		accuracy: 100,
		basePower: 55,
		category: "Physical",
		isNonstandard: null,
		name: "Constrict",
		pp: 35,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Normal",
		contestType: "Tough",
	},
	foresight: {
		inherit: true,
		isNonstandard: null,
	},
	healblock: {
		inherit: true,
		isNonstandard: null,
	},
	seedflare: {
		inherit: true,
		isNonstandard: null,
	},
	healpulse: {
		num: 505,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Heal Pulse",
		pp: 10,
		priority: 0,
		flags: {protect: 1, pulse: 1, reflectable: 1, distance: 1, heal: 1, mystery: 1},
		onHit(target, source) {
			let success = false;
			if (source.hasAbility('megalauncher')) {
				success = !!this.heal(this.modify(target.baseMaxhp, 0.75));
			}
			if (source.hasAbility('longshot')) {
				success = !!this.heal(this.modify(target.baseMaxhp, 0.65));
			} else {
				success = !!this.heal(Math.ceil(target.baseMaxhp * 0.5));
			}
			if (success && target.side !== source.side) {
				target.staleness = 'external';
			}
			return success;
		},
		secondary: null,
		target: "any",
		type: "Psychic",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
};    
