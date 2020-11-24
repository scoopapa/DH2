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
        stallingMove: true,
        volatileStatus: 'ballup',
        onTryHit(pokemon) {
            return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
        },
        onHit(pokemon) {
            pokemon.addVolatile('stall');
        },
        effect: {
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
                let lockedmove = source.getVolatile('lockedmove');
                if (lockedmove) {
                    // Outrage counter is reset
                    if (source.volatiles['lockedmove'].duration === 2) {
                        delete source.volatiles['lockedmove'];
                    }
                }
                if (move.flags['contact']) {
                    this.boost({def: +2}, source, self, this.dex.getActiveMove("Ball Up"));
                }
                return this.NOT_FAIL;
            },
            onHit(target, source, move) {
                if (move.isZPowered && move.flags['contact']) {
                    this.boost({def: +2}, source, self, this.dex.getActiveMove("Ball Up"));
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
            return this.dex.clampIntRange(Math.floor(target.getUndynamaxedHP() / 2), 1);
        },
        category: "Special",
        desc: "Deals damage to the target equal to half of its current HP, rounded down, but not less than 1 HP. Heals the user by 50% of the damage dealt",
        shortDesc: "Does damage equal to 1/2 target's current HP. Heals 50% of damage dealth",
        id: "ionicbond",
        name: "Ionic Bond",
        pp: 10,
        priority: 0,
        flags: {protect: 1, mirror: 1, heal: 1},
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
        isNonstandard: "Past",
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
        id: "Sharp Steel",
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
        name: "oxidation",
        pp: 20,
        priority: 0,
        flags: {protect: 1, mirror: 1},
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
};    
