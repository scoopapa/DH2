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
	adaptableattack: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
    shortDesc: "Deals typeless damage. Special if SpA > Atk.",
		isViable: true,
		name: "Adaptable Attack",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Multi-Attack", target);
		},
		onModifyMove(move, pokemon, target) {
			move.type = '???';
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		onBasePower(basePower, pokemon, target) {
			if (pokemon.species.name === 'Type: Null') {
				return this.chainModify(1.5);
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cute",
	},
	multiattack: {
		num: 718,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
    	shortDesc: "Type varies based on held memory. Special if SpA > Atk.",
		name: "Multi-Attack",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			if (pokemon.ignoringItem()) return;
			move.type = this.runEvent('Memory', pokemon, null, move, 'Normal');
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 185},
		maxMove: {basePower: 95},
		contestType: "Tough",
	},
	spitfire: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
    shortDesc: "20% chance to burn foe(s).",
		isViable: true,
		name: "Spitfire",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Heat Wave", target);
		},
		secondary: {
			chance: 20,
			status: 'brn',
		},
    target: "allAdjacentFoes",
		type: "Fire",
	},
	moonblast: {
		num: 585,
		accuracy: 100,
		basePower: 90,
		category: "Special",
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
	hiddenleafstrike: {
		accuracy: true,
		basePower: 100,
		category: "Physical",
    shortDesc: "High critical hit ratio. Never misses",
		isViable: true,
		name: "Hidden Leaf Strike",
		pp: 15,
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
	snipeshot: {
		num: 745,
		accuracy: true,
		basePower: 100,
		category: "Special",
    shortDesc: "High critical hit ratio. Never misses",
		name: "Snipe Shot",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, pulse: 1},
		critRatio: 2,
		tracksTarget: true,
		secondary: null,
		target: "normal",
		type: "Water",
	},
	falsesurrender: {
		num: 793,
		accuracy: true,
		basePower: 100,
		category: "Physical",
    shortDesc: "High critical hit ratio. Never misses",
		name: "False Surrender",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	corrosiveacid: {
		accuracy: 100,
		basePower: 60,
		category: "Special",
    shortDesc: "30% chance to burn or poison. 2x damage if target is burned or poisoned",
		isViable: true,
		name: "Corrosive Acid",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Acid Spray", target);
		},
		onBasePower(basePower, pokemon, target) {
			if (target.status === 'psn' || target.status === 'tox' || target.status === 'brn') {
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
	ballup: {
		accuracy: true,
		basePower: 0,
		category: "Status",
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
					this.boost({spe: -2}, source, target, this.dex.getActiveMove("Ball Up"));
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && move.flags['contact']) {
					this.boost({spe: -2}, source, target, this.dex.getActiveMove("Ball Up"));
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Ground",
	},
	doublekick: {
		num: 24,
		accuracy: 90,
		basePower: 50,
		category: "Physical",
		name: "Double Kick",
		pp: 30,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 2,
		secondary: null,
		target: "normal",
		type: "Fighting",
		maxMove: {basePower: 80},
		contestType: "Cool",
	},
	doublehit: {
		num: 458,
		accuracy: 90,
		basePower: 50,
		category: "Physical",
		name: "Double Hit",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 2,
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 140},
		maxMove: {basePower: 120},
		contestType: "Cool",
	},
	twineedle: {
		num: 41,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		isNonstandard: null,
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
		maxMove: {basePower: 100},
		contestType: "Cool",
	},
  bindinglight: {
        accuracy: 100,
        basePower: 0,
        category: "Status",
        desc: "Prevents the target from switching out and increase the user's Defense and Special Defense by 1. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, U-turn, or Volt Switch. If the target leaves the field using Baton Pass, the replacement will remain trapped. The effect ends if the user leaves the field.",
        shortDesc: "Prevents the target from switching out. Raises Def and SpD by 1.",
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
	splitatoms: {
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
  ionicbond: {
        accuracy: 90,
        basePower: 0,
		    damageCallback(pokemon, target) {
			    return this.clampIntRange(target.getUndynamaxedHP() / 2, 1);
		    },
        category: "Special",
        desc: "Deals damage to the target equal to half of its current HP, rounded down, but not less than 1 HP. Heals the user by 50% of the damage dealt",
        shortDesc: "Does damage equal to 1/2 target's current HP. Heals 50% of damage dealt",
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
	cloudcrush: {
		accuracy: 100,
		basePower: 85,
		category: "Physical",
    shortDesc: "20% chance to lower foe's Speed by 1",
		isViable: true,
		name: "Cloud Crush",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Gust", target);
		  this.add('-anim', source, "Psyshock", target);
		},
		secondary: {
			chance: 20,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
	oxidation: {
		accuracy: 100,
		basePower: 70,
		category: "Special",
    shortDesc: "Super effective against Steel-types",
		isViable: true,
		name: "Oxidation",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Hurricane", target);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Steel') return 1;
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Beautiful",
	},
	dizzypunch: {
		num: 146,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
    shortDesc: "10% chance to confuse foe",
		isViable: true,
		isNonstandard: null,
		name: "Dizzy Punch",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Fairy",
		contestType: "Cute",
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
	meditate: {
		num: 96,
		accuracy: true,
		basePower: 0,
		category: "Status",
    shortDesc: "+1 Attack and Special Defense",
		isViable: true,
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
	synchronoise: {
		num: 485,
		accuracy: 100,
		basePower: 70,
		category: "Special",
    shortDesc: "2x on targets that share a type. Ignores immunities",
		isViable: true,
		isNonstandard: null,
		name: "Synchronoise",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1},
		ignoreImmunity: true,
		onBasePower(basePower, pokemon, target) {
			if (target.hasType(pokemon.getTypes())) {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "allAdjacent",
		type: "Psychic",
		contestType: "Clever",
	},
	fishiousrend: {
		num: 755,
		accuracy: 100,
		basePower: 85,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Fishious Rend damage boost');
				return move.basePower * 2;
			}
			this.debug('Fishious Rend NOT boosted');
			return move.basePower;
		},
		category: "Physical",
		name: "Fishious Rend",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Water",
	},
	voltswitch: {
		num: 521,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Volt Switch",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	uturn: {
		num: 369,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "U-turn",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Cute",
	},
	eternabeam: {
		num: 795,
		accuracy: 100,
		basePower: 150,
		category: "Special",
    desc: "User must recharge next turn unless this move KO'd its target last turn.",
    shortDesc: "User must recharge next turn unless this move KO'd its target last turn.",
		name: "Eternabeam",
		pp: 10,
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1},
		self: null,
		onHit(target, source) {
			if (target.hp) {
				source.addVolatile('mustrecharge');
			}
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
	},
	stalagbite: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
    shortDesc: "20% chance to lower foe's Defense by 1",
		isViable: true,
		name: "Stalag-Bite",
		pp: 15,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Stone Edge", target);
		  this.add('-anim', source, "Crunch", target);
		},
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	cobaltwave: {
		accuracy: 80,
		basePower: 110,
		category: "Special",
    shortDesc: "10% chance to lower foe(s)'s Special Defense by 1",
		isViable: true,
		name: "Cobalt Wave",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Iron Defense", target);
		  this.add('-anim', source, "Surf", target);
		},
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
		target: "allAdjacent",
		type: "Steel",
		contestType: "Cool",
	},
	petalblizzard: {
		num: 572,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		name: "Petal Blizzard",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "allAdjacent",
		type: "Grass",
		contestType: "Beautiful",
	},
	chillout: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
    shortDesc: "Resets user's negative stats and summons Mist",
		isViable: true,
		name: "Chill Out",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Icy Wind", target);
		  this.add('-anim', source, "Mist", target);
		},
		self: {
			onHit(pokemon) {
				const boosts: SparseBoostsTable = {};
				let i: BoostName;
				for (i in pokemon.boosts) {
					if (pokemon.boosts[i] < 0) {
						boosts[i] = 0;
					}
				}
				pokemon.setBoost(boosts);
				this.add('-clearnegativeboost', pokemon, '[silent]');
				this.add('-message', pokemon.name + "'s negative stat changes were removed!");
	    },
			sideCondition: 'mist',
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
	},
	eclipse: {
		num: 399,
		accuracy: 100,
		basePower: 90,
		category: "Special",
    shortDesc: "Clears weather conditions",
		isViable: true,
		name: "Eclipse",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Moonlight", target);
		  this.add('-anim', source, "Fiery Wrath", target);
		},
		onHit() {
			this.field.clearWeather();
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	oceanicoperetta: {
		num: 697,
		accuracy: true,
		basePower: 195,
		category: "Special",
		isNonstandard: "Past",
		name: "Oceanic Operetta",
		pp: 1,
		priority: 0,
		flags: {sound: 1},
		isZ: "primariumz",
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Cool",
	},
	washaway: {
		accuracy: 100,
		basePower: 60,
		category: "Special",
    shortDesc: "Heals 50% of the damage dealt and resets negative stat changes",
		isViable: true,
		name: "Wash Away",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Soak", target);
		},
		drain: [1, 2],
		self: {
			onHit(pokemon) {
				const boosts: SparseBoostsTable = {};
				let i: BoostName;
				for (i in pokemon.boosts) {
					if (pokemon.boosts[i] < 0) {
						boosts[i] = 0;
					}
				}
				pokemon.setBoost(boosts);
				this.add('-clearnegativeboost', pokemon, '[silent]');
				this.add('-message', pokemon.name + "'s negative stat changes were removed!");
	    },
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Clever",
	},
	wipeout: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
    shortDesc: "User takes 33% recoil damamge",
		isViable: true,
		name: "Wipe Out",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Waterfall", target);
		},
		recoil: [33, 100],
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Tough",
	},
	shadowpunch: {
		num: 325,
		accuracy: true,
		basePower: 80,
		category: "Physical",
		isViable: true,
		name: "Shadow Punch",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
	},
	mysticalfire: {
		num: 595,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		isViable: true,
		name: "Mystical Fire",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, pulse: 1},
		secondary: {
			chance: 100,
			boosts: {
				spa: -1,
			},
		},
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	playrough: {
		num: 583,
		accuracy: 90,
		basePower: 100,
		category: "Physical",
    shortDesc: "20% chance to lower foe's Attack by 1",
		name: "Play Rough",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Fairy",
		contestType: "Cute",
	},
	meteormash: {
		num: 309,
		accuracy: 90,
		basePower: 100,
		category: "Physical",
		name: "Meteor Mash",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: {
			chance: 20,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	wildcharge: {
		num: 528,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Wild Charge",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [1, 4],
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Tough",
	},
	skittersmack: {
		num: 806,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
    shortDesc: "30% chance to lower target's Special Attack by 1",
		isViable: true,
		name: "Skitter Smack",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			boosts: {
				spa: -1,
			},
		},
		target: "normal",
		type: "Bug",
	},
	poisonfang: {
		num: 305,
		accuracy: 95,
		basePower: 65,
		category: "Physical",
    shortDesc: "50% chance to badly poison foe, 10% chance to flinch foe",
		isViable: true,
		name: "Poison Fang",
		pp: 15,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		secondaries: [
			{
				chance: 50,
				status: 'tox',
			}, {
				chance: 10,
				volatileStatus: 'flinch',
			},
		],
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	heartbeat: {
		num: 331,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
    shortDesc: "Hits 2-5 times",
		isViable: true,
		name: "Heartbeat",
		pp: 30,
		priority: 0,
		flags: {sound: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Heart Stamp", target);
		},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Fairy",
		zMove: {basePower: 140},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},
	toxicthread: {
		num: 672,
		accuracy: 90,
		basePower: 0,
		category: "Status",
    shortDesc: "Badly poisons and lowers the target's Speed by 2",
		isViable: true,
		isNonstandard: null,
		name: "Toxic Thread",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		status: 'tox',
		boosts: {
			spe: -2,
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		zMove: {boost: {spe: 1}},
		contestType: "Tough",
	},
	darkvoid: {
		num: 464,
		accuracy: 80,
		basePower: 0,
		category: "Status",
		isNonstandard: "Past",
		name: "Dark Void",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		status: 'slp',
		onTryMove(pokemon, target, move) {
			if (pokemon.species.name === 'Darkrai' || move.hasBounced) {
				return;
			}
			this.add('-fail', pokemon, 'move: Dark Void');
			this.hint("Only a Pokemon whose form is Darkrai can use this move.");
			return null;
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Dark",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	rototiller: {
		num: 563,
		accuracy: true,
		basePower: 0,
		category: "Status",
    shortDesc: "+2 Atk and SpA for all active grounded Grass-types",
		isViable: true,
		isNonstandard: null,
		name: "Rototiller",
		pp: 10,
		priority: 0,
		flags: {distance: 1, nonsky: 1},
		onHitField(target, source) {
			const targets: Pokemon[] = [];
			let anyAirborne = false;
			for (const pokemon of this.getAllActive()) {
				if (!pokemon.runImmunity('Ground')) {
					this.add('-immune', pokemon);
					anyAirborne = true;
					continue;
				}
				if (pokemon.hasType('Grass')) {
					// This move affects every grounded Grass-type Pokemon in play.
					targets.push(pokemon);
				}
			}
			if (!targets.length && !anyAirborne) return false; // Fails when there are no grounded Grass types or airborne Pokemon
			for (const pokemon of targets) {
				this.boost({atk: 2, spa: 2}, pokemon, source);
			}
		},
		secondary: null,
		target: "all",
		type: "Ground",
		zMove: {boost: {atk: 1}},
		contestType: "Tough",
	},
	disarmingvoice: {
		num: 574,
		accuracy: true,
		basePower: 40,
		category: "Special",
    shortDesc: "+1 priority. Never misses",
		isViable: true,
		name: "Disarming Voice",
		pp: 15,
		priority: 1,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fairy",
		contestType: "Cute",
	},
	surf: {
		num: 57,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		name: "Surf",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		secondary: null,
		target: "allAdjacent",
		type: "Water",
		contestType: "Beautiful",
	},
	behemothblade: {
		num: 781,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Behemoth Blade",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePower(basePower, pokemon, target) {
			if (target.hasAbility('maximumpotential')) {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	behemothbash: {
		num: 782,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Behemoth Bash",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePower(basePower, pokemon, target) {
			if (target.hasAbility('maximumpotential')) {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	submission: {
		num: 66,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Submission",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [1, 4],
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},
	agilestance: {
		accuracy: true,
		basePower: 0,
		category: "Status",
    shortDesc: "The user's next move has +1 priority but deals 3/4 damage.",
		isViable: true,
		name: "Agile Stance",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Agility", target);
		},
		volatileStatus: 'agilestance',
		condition: {
			duration: 2,
			onStart(pokemon, source, effect) {
				if (effect && (['imposter', 'psychup', 'transform'].includes(effect.id))) {
					this.add('-start', pokemon, 'move: Agile Stance', '[silent]');
				} else {
					this.add('-start', pokemon, 'move: Agile Stance');
				}
			},
			onRestart(pokemon) {
				this.effectData.duration = 2;
				this.add('-start', pokemon, 'move: Agile Stance');
			},
			onModifyPriority(priority, pokemon, target, move) {
					return priority + 1;
			},
			onBasePowerPriority: 21,
			onBasePower(basePower, pokemon, target, move) {
				return this.chainModify(0.75);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Agile Stance', '[silent]');
			},
		},
		secondary: null,
		target: "self",
		type: "Flying",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cool",
	},
	powerstance: {
		accuracy: true,
		basePower: 0,
		category: "Status",
    shortDesc: "The user's next move has 2.5x power but has -1 priority.",
		isViable: true,
		name: "Power Stance",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Bulk Up", target);
		},
		volatileStatus: 'powerstance',
		condition: {
			duration: 2,
			onStart(pokemon, source, effect) {
				if (effect && (['imposter', 'psychup', 'transform'].includes(effect.id))) {
					this.add('-start', pokemon, 'move: Power Stance', '[silent]');
				} else {
					this.add('-start', pokemon, 'move: Power Stance');
				}
			},
			onRestart(pokemon) {
				this.effectData.duration = 2;
				this.add('-start', pokemon, 'move: Power Stance');
			},
			onModifyPriority(priority, pokemon, target, move) {
					return priority - 1;
			},
			onBasePowerPriority: 21,
			onBasePower(basePower, pokemon, target, move) {
				return this.chainModify(2.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Power Stance', '[silent]');
			},
		},
		secondary: null,
		target: "self",
		type: "Fighting",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cool",
	},
	absentmind: {
		accuracy: 100,
		basePower: 55,
		basePowerCallback(pokemon, target, move) {
			if (!pokemon.item) {
				this.debug("Power doubled for no item");
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Special",
    shortDesc: "Deals double damage if the user has no item.",
		isViable: true,
		name: "Absent Mind",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Calm Mind", target);
		  this.add('-anim', source, "Psybeam", target);
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	solarblade: {
		num: 669,
		accuracy: 90,
		basePower: 125,
		category: "Physical",
    shortDesc: "Raises user's Atk by 1 on turn 1. Hits turn 2. Attacks immediately under sun.",
		isViable: true,
		name: "Solar Blade",
		pp: 10,
		priority: 0,
		flags: {contact: 1, charge: 1, protect: 1, mirror: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({atk: 1}, attacker, attacker, move);
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
			if (['raindance', 'primordialsea', 'sandstorm', 'hail'].includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	meteorbeam: {
		num: 800,
		accuracy: 90,
		basePower: 125,
		category: "Special",
    shortDesc: "Raises user's Atk by 1 on turn 1. Hits turn 2. Attacks immediately under sand.",
		name: "Meteor Beam",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({spa: 1}, attacker, attacker, move);
			if (['sandstorm'].includes(attacker.effectiveWeather())) {
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
		secondary: null,
		target: "normal",
		type: "Rock",
	},
	shelltrap: {
		num: 704,
		accuracy: 100,
		basePower: 100,
		category: "Special",
    shortDesc: "Burns on contact with the user before it moves.",
		isViable: true,
		name: "Shell Trap",
		pp: 15,
		priority: -3,
		flags: {protect: 1, bullet: 1},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('shelltrap');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Shell Trap');
			},
			onHit(pokemon, source, move) {
				if (move.flags['contact']) {
					source.trySetStatus('brn', pokemon);
				}
			},
		},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('shelltrap');
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fire",
		contestType: "Tough",
	},
	scaledown: {
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			let power = 20 + 20 * target.positiveBoosts();
			if (power > 200) power = 200;
			return power;
		},
		category: "Special",
    shortDesc: "20 power + 20 for each of the target's stat boosts. Resets all of the target's stat stages to 0.",
		isViable: true,
		name: "Scale Down",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Scale Shot", target);
		},
		onHit(target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Cool",
	},
	snaptrap: {
		num: 779,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Snap Trap",
		pp: 20,
		priority: 0,
		flags: {},
		onTryHit(target, pokemon) {
			let move = 'anchorshot';
			if (this.field.isTerrain('electricterrain')) {
				move = 'zingzap';
			} else if (this.field.isTerrain('grassyterrain')) {
				move = 'seedbomb';
			} else if (this.field.isTerrain('mistyterrain')) {
				move = 'playrough';
			} else if (this.field.isTerrain('psychicterrain')) {
				move = 'psychicfangs';
			}
			this.useMove(move, pokemon, target);
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	stealthrock: {
		num: 446,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Stealth Rock",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		sideCondition: 'stealthrock',
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || pokemon.hasItem('saltcube')) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Rock",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
	},

                                    
// Z-Moves 
	cobblestonecarnage: {
		accuracy: true,
		basePower: 210,
		category: "Physical",
    	shortDesc: "No additional effect",
		isNonstandard: "Past",
		name: "Cobblestone Carnage",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Stealth Rock", target);
		  this.add('-anim', source, "Rock Wrecker", target);
		},
		isZ: "rhyperiumz",
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Cool",
	},
	tonguetiedtirade: {
		accuracy: true,
		basePower: 200,
		category: "Physical",
    	shortDesc: "Wraps foe",
		isNonstandard: "Past",
		name: "Tongue-Tied Tirade",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Wrap", target);
		  this.add('-anim', source, "Stomp", target);
		},
		isZ: "lickilickiumz",
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	crowscallingcard: {
		accuracy: true,
		basePower: 190,
		category: "Physical",
    	shortDesc: "No additional effect",
		isNonstandard: "Past",
		name: "Crow's Calling Card",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Trump Card", target);
		  this.add('-anim', source, "Fiery Wrath", target);
		},
		isZ: "honchkriumz",
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	witcheswishes: {
		accuracy: true,
		basePower: 190,
		category: "Special",
    	shortDesc: "No additional effect",
		isNonstandard: "Past",
		name: "Witches' Wishes",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Astral Barrage", target);
		  this.add('-anim', source, "Hex", target);
		},
		isZ: "mismagiumz",
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},
	lilyslastdance: {
		accuracy: true,
		basePower: 180,
		category: "Special",
    	shortDesc: "Sets one layer of Toxic Spikes",
		isNonstandard: "Past",
		name: "Lily's Last Dance",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Petal Dance", target);
		  this.add('-anim', source, "Toxic Spikes", target);
		},
		isZ: "roseradiumz",
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('toxicspikes');
			},
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Cool",
	},
	iceagereign: {
		accuracy: true,
		basePower: 190,
		category: "Special",
    	shortDesc: "Summons Mist",
		isNonstandard: "Past",
		name: "Ice Age Reign",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Sheer Cold", target);
		  this.add('-anim', source, "Mist", target);
		},
		isZ: "walreiniumz",
		self: {
			sideCondition: 'mist',
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Cool",
	},
	salutetosunshine : {
		accuracy: true,
		basePower: 180,
		category: "Physical",
    	shortDesc: "Summons Sunny Day",
		isNonstandard: "Past",
		name: "Salute to Sunshine",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Solar Blade", target);
		  this.add('-anim', source, "Morning Sun", target);
		},
		isZ: "cherriumz",
		self: {
			onHit(source) {
				this.field.setWeather('sunnyday');
			},
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	hectichivemind : {
		accuracy: true,
		basePower: 185,
		category: "Physical",
    	shortDesc: "User: +2 Def and SpD",
		isNonstandard: "Past",
		name: "Hectic Hivemind",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Heal Order", target);
		  this.add('-anim', source, "Attack Order", target);
		},
		isZ: "vespiumz",
		selfBoost: {
			boosts: {
				def: 2,
				spd: 2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Cool",
	},
	desertdisaster : {
		accuracy: true,
		basePower: 195,
		category: "Physical",
    	shortDesc: "No additional effect",
		isNonstandard: "Past",
		name: "Desert Disaster",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Laser Focus", target);
		  this.add('-anim', source, "Drill Run", target);
		},
		isZ: "krookiumz",
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Cool",
	},
	alienatmosphere : {
		accuracy: true,
		basePower: 190,
		category: "Special",
		defensiveCategory: "Physical",
    	shortDesc: "Targets foe's Defense. Summons Gravity",
		isNonstandard: "Past",
		name: "Alien Atmosphere",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Calm Mind", target);
		  this.add('-anim', source, "Expanding Force", target);
		},
		isZ: "beheeyemiumz",
		self: {
			pseudoWeather: 'gravity',
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	earsplittingechoes : {
		accuracy: true,
		basePower: 190,
		category: "Special",
    	shortDesc: "No additional effect",
		isNonstandard: "Past",
		name: "Ear-Splitting Echoes",
		pp: 1,
		priority: 0,
		flags: {sound: 1, authentic: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Hyper Voice", target);
		  this.add('-anim', source, "Boomburst", target);
		},
		isZ: "noiviumz",
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
	smolderingsauna : {
		accuracy: true,
		basePower: 190,
		category: "Special",
    	shortDesc: "Burns foe. 2x damage in Sun",
		isNonstandard: "Past",
		name: "Smoldering Sauna",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Steam Eruption", target);
		},
		onBasePower(basePower, pokemon, target) {
			if (['sunnyday'].includes(pokemon.effectiveWeather())) {
				this.debug('strengthend by sun');
				return this.chainModify(2);
			}
		},
		isZ: "volcaniumz",
		secondary: {
			chance: 100,
			status: 'brn',
		},
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	eternalblossom : {
		accuracy: true,
		basePower: 195,
		category: "Special",
    	shortDesc: "Heals user by 50% of the damage dealt",
		isNonstandard: "Past",
		name: "Eternal Blossom",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Recover", target);
		  this.add('-anim', source, "Light of Ruin", target);
		},
		drain: [1, 2],
		isZ: "floettiumz",
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Cool",
	},
	ampedupspikeball : {
		accuracy: true,
		basePower: 180,
		category: "Physical",
    	shortDesc: "Sets one layer of Spikes",
		isNonstandard: "Past",
		name: "Amped-Up Spikeball",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Bolt Strike", target);
		  this.add('-anim', source, "Spikes", target);
		},
		isZ: "togedemariumz",
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('spikes');
			},
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	neverendingwarstory : {
		accuracy: true,
		basePower: 180,
		category: "Special",
    	shortDesc: "User: +2 Special Attack",
		isNonstandard: "Past",
		name: "Neverending War Story",
		pp: 1,
		priority: 0,
		flags: {sound: 1, authentic: 1},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Hyper Voice", target);
		  this.add('-anim', source, "Clanging Scales", target);
		},
		isZ: "drampiumz",
		selfBoost: {
			boosts: {
				spa: 2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Cool",
	},
	moltenminefield : {
		accuracy: true,
		basePower: 180,
		category: "Special",
    	shortDesc: "Burns foe",
		isNonstandard: "Past",
		name: "Molten Minefield",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "Work Up", target);
		  this.add('-anim', source, "Inferno Overdrive", target);
		},
		isZ: "turtonatiumz",
		secondary: {
			chance: 100,
			status: 'brn',
		},		
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	crusaderscourage : {
		accuracy: true,
		basePower: 130,
		category: "Physical",
    	shortDesc: "User: +1 All Stats",
		isNonstandard: "Past",
		name: "Crusader's Courage",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "No Retreat", target);
		  this.add('-anim', source, "Sacred Sword", target);
		},
		isZ: "falinksiumz",
		selfBoost: {
			boosts: {
				atk: 1,
				def: 1,
				spa: 1,
				spd: 1,
				spe: 1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
	},
	metallicmausoleum : {
		accuracy: true,
		basePower: 180,
		category: "Physical",
    	shortDesc: "Sets a hazard that factors Steel weakness",
		isNonstandard: "Past",
		name: "Metallic Mausoleum",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
		  this.attrLastMove('[still]');
		  this.add('-anim', source, "G-Max Steelsurge", target);
		},
		isZ: "copperajiumz",
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('gmaxsteelsurge');
			},
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
};  
