export const Moves: {[k: string]: ModdedMoveData} = {
// slate 1
	direclaw: {
		shortDesc: "Sets a layer of Toxic Spikes.",
		num: -1005,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		name: "Dire Claw",
		desc: "Sets a layer of Toxic Spikes on the opponent's side of the field.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterHit(target, source, move) {
			if (!move.hasSheerForce && source.hp && !target.hasItem('covertcloak')) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('toxicspikes');
				}
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!move.hasSheerForce && source.hp && !target.hasItem('covertcloak')) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('toxicspikes');
				}
			}
		},
	   secondary: {},
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	ceaselessedge: {
		num: 845,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		shortDesc: "Sets a layer of Spikes on the opposing side.",
		name: "Ceaseless Edge",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		onAfterHit(target, source, move) {
			if (!move.hasSheerForce && source.hp && !target.hasItem('covertcloak')) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('spikes');
				}
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!move.hasSheerForce && source.hp && !target.hasItem('covertcloak')) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('spikes');
				}
			}
		},
	   secondary: {},
		target: "normal",
		type: "Dark",
	},
	stoneaxe: {
		num: -1014,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		name: "Stone Axe",
		desc: "If this move is successful, it sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in. Foes lose 1/32, 1/16, 1/8, 1/4, or 1/2 of their maximum HP, rounded down, based on their weakness to the Rock type; 0.25x, 0.5x, neutral, 2x, or 4x, respectively. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, or is hit by Defog.",
		shortDesc: "Sets Stealth Rock on the target's side.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
	   secondary: {
			chance: 100,
		 	sideCondition: 'stealthrock',
	   },
		target: "adjacentFoe",
		type: "Rock",
		contestType: "Tough",
	},
	electroweb: {
		num: 527,
		accuracy: 95,
		basePower: 65,
		category: "Special",
		shortDesc: "Sets Sticky Web on the target's side.",
		name: "Electroweb",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
	   secondary: {
			chance: 100,
		 	sideCondition: 'stickyweb',
	   },
		target: "allAdjacentFoes",
		type: "Electric",
		contestType: "Beautiful",
	},
	skullbash: {
		num: 130,
		accuracy: 90,
		basePower: 120,
		category: "Physical",
		shortDesc: "Raises user's Atk by 1 on turn 1. Hits turn 2.",
		name: "Skull Bash",
		pp: 10,
		priority: 0,
		flags: {contact: 1, charge: 1, protect: 1, mirror: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({atk: 1}, attacker, attacker, move);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Tough",
	},
	shelter: {
		num: 842,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Removes Spikes and Stealth Rock from the field. +1 Def for every type of hazard cleared.",
		name: "Shelter",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onHit(pokemon) {
			let success = false;
			let hazardsCleared = 0;
			const somesideConditions = ['spikes', 'stealthrock'];
			const sides = [pokemon.side];
			for (const side of sides) {
				for (const sideCondition of somesideConditions) {
					if (side.removeSideCondition('spikes')) {
						this.add('-sideend', side, this.dex.conditions.get('spikes'));
						hazardsCleared += 1;
						this.boost({def: 1}, pokemon);
					}
					if (side.removeSideCondition('stealthrock')) {
						this.add('-sideend', side, this.dex.conditions.get('stealthrock'));
						hazardsCleared += 1;
						this.boost({def: 1}, pokemon);
					}
					if (hazardsCleared > 0) {
						success = true;
					}
				}
			}
		},
		secondary: null,
		target: "self",
		type: "Steel",
	},

// slate 2
	healingstones: {
		num: -191,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets healing stones on the user's side, healing Pokemon that switch in for 1/8th of their max HP.",
		shortDesc: "Heals grounded allies on switch-in.",
		isViable: true,
		name: "Healing Stones",
		pp: 20,
		priority: 0,
		flags: {nonsky: 1, heal: 1},
		sideCondition: 'healingstones',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Stealth Rock", target);
		},
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'Healing Stones');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 1) return false;
				this.add('-sidestart', side, 'Healing Stones');
				this.effectState.layers++;
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('overcoat') || pokemon.hasItem('dancingshoes')) return;
				let healAmounts = [0, 3]; // 1/8
				this.heal(healAmounts[this.effectState.layers] * pokemon.maxhp / 24);
			},
		},
		secondary: null,
		target: "allySide",
		type: "Fairy",
		zMoveBoost: {def: 1},
		contestType: "Clever",
	},
	junglehealing: {
		num: 816,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User and allies: healed 1/3 max HP, status cured.",
		name: "Jungle Healing",
		pp: 10,
		priority: 0,
		flags: {heal: 1, bypasssub: 1, allyanim: 1},
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.33));
			return pokemon.cureStatus() || success;
		},
		secondary: null,
		target: "allies",
		type: "Grass",
	},
	lifedew: {
		num: 791,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User: healed 1/3 max HP. Next switch-in: healed 1/4 max HP.",
		name: "Life Dew",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1, bypasssub: 1},
		heal: [1, 3],
		slotCondition: 'lifedew',
	   condition: {
			onSwap(target) {
				 if (!target.fainted) {
					  const source = this.effectState.source;
					  const damage = this.heal(target.baseMaxhp / 4, target, target);
					  if (damage) this.add('-heal', target, target.getHealth, '[from] move: Life Dew', '[of] ' + this.effectState.source);
					  target.side.removeSlotCondition(target, 'lifedew');
				 }
			},
	   },
		secondary: null,
		target: "self",
		type: "Water",
	},
	shrapnelshot: {
		accuracy: 90,
		basePower: 15,
		category: "Physical",
		shortDesc: "Hits 2-5 times. First hit lowers the foe's Defense by 1 stage.",
		name: "Shrapnel Shot",
		pp: 20,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		multihit: [2, 5],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Spikes", target);
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (move.hit < 2) {
					this.boost({def: -1}, target);
				}
				return false;
			},
		},
		target: "normal",
		type: "Steel",
		zMove: {basePower: 140},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},

// slate 3
	stormthrow: {
		num: 480,
		accuracy: true,
		basePower: 70,
		category: "Physical",
		name: "Storm Throw",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
	},
	frostbreath: {
		num: 524,
		accuracy: true,
		basePower: 70,
		category: "Special",
		name: "Frost Breath",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	snipeshot: {
		num: 745,
		accuracy: true,
		basePower: 70,
		category: "Special",
		shortDesc: "Always critically hits.",
		name: "Snipe Shot",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, pulse: 1},
		willCrit: true,
		tracksTarget: true,
		secondary: null,
		target: "normal",
		type: "Water",
	},
	falsesurrender: {
		num: 793,
		accuracy: true,
		basePower: 70,
		category: "Physical",
		shortDesc: "Always critically hits.",
		name: "False Surrender",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	choke: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Inflicts the Heal Block effect.",
		name: "Choke",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sky Uppercut", target);
			this.add('-anim', source, "Hex", target);
		},
		secondary: {
			chance: 100,
			onHit(target) {
				target.addVolatile('healblock');
			},
		},
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
	},
	cuttingremark: {
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		overrideDefensiveStat: 'spd',
		shortDesc: "Usually goes first. Targets the foe's Special Defense.",
		name: "Cutting Remark",
		pp: 25,
		priority: 1,
		flags: {sound: 1, protect: 1, mirror: 1, bypasssub: 1, slicing: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psycho Cut", target);
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	}, /*
	walkietalkiemove: {
		accuracy: true,
		basePower: 0,
		category: "Physical",
		shortDesc: "Referenced by the Walkie-Talkie item in order for it to work.",
		name: "Walkie-Talkie Move",
		pp: 5,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sing", target);
		},
		slotCondition: 'walkietalkie',
		condition: {
			duration: 1,
			onFaint(target) {
				target.side.removeSlotCondition(target, 'walkietalkie');
			},
			onSwap(target) {
				if (!target.fainted && this.effectState.moveTarget && this.effectState.moveTarget.isActive) {
					this.add('-message', `${pokemon.name} was called in!`);
					// const move = this.dex.getMove(this.effectState.move);
					this.runMove('copycat', target, this.getTargetLoc(target.side.foe.active[0], target), null, false, true);
				}
				target.side.removeSlotCondition(target, 'walkietalkie');
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {basePower: 140},
		maxMove: {basePower: 130},
		contestType: "Cool",
	}, */
	chainlightning: {
		accuracy: 100,
		basePower: 15,
		category: "Physical",
		shortDesc: "Usually goes first. Hits 2-5 times.",
		name: "Chain Lightning",
		pp: 20,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		multihit: [2, 5],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Thunder Shock", target);
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	pluck: {
		num: 365,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		shortDesc: "Heals the user by 75% of the damage dealt.",
		name: "Pluck",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1},
		drain: [3, 4],
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Cute",
	},
	throatchop: {
		num: 675,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		shortDesc: "Foe can't use Sound moves or Yawn for 3 turns.",
		name: "Throat Chop",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		condition: {
			duration: 3,
			onStart(target) {
				this.add('-start', target, 'Throat Chop', '[silent]');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).flags['sound']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (!move.isZ && !move.isMax && (move.flags['sound'] || move.id === 'yawn')) {
					this.add('cant', pokemon, 'move: Throat Chop');
					return false;
				}
			},
			onResidualOrder: 22,
			onEnd(target) {
				this.add('-end', target, 'Throat Chop', '[silent]');
			},
		},
		secondary: {
			chance: 100,
			onHit(target) {
				target.addVolatile('throatchop');
			},
		},
		target: "normal",
		type: "Dark",
		contestType: "Clever",
	},
	windbreaker: {
		accuracy: 100,
		basePower: 85,
		category: "Special",
		shortDesc: "Foe can't use Wind moves for 3 turns.",
		name: "Wind Breaker",
		pp: 10,
		priority: 0,
		flags: {wind: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Gust", target);
		},
		condition: {
			duration: 3,
			onStart(target) {
				this.add('-start', target, 'Wind Breaker', '[silent]');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).flags['wind']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (!move.isZ && !move.isMax && move.flags['wind']) {
					this.add('cant', pokemon, 'move: Wind Breaker');
					return false;
				}
			},
			onResidualOrder: 22,
			onEnd(target) {
				this.add('-end', target, 'Wind Breaker', '[silent]');
			},
		},
		secondary: {
			chance: 100,
			onHit(target) {
				target.addVolatile('windbreaker');
			},
		},
		target: "normal",
		type: "Flying",
		contestType: "Clever",
	},
	hazardouswaste: {
		accuracy: 100,
		basePower: 50,
		basePowerCallback(pokemon, target, move) {
			const yourSide = pokemon.side;
			let allLayers = 0;
			if (yourSide.getSideCondition('stealthrock')) allLayers++;
			if (yourSide.getSideCondition('healingstones')) allLayers++;
			if (yourSide.getSideCondition('stickyweb')) allLayers++;
			if (yourSide.sideConditions['spikes']) {
				allLayers += yourSide.sideConditions['spikes'].layers;
			}
			if (yourSide.sideConditions['toxicspikes']) {
				allLayers += yourSide.sideConditions['toxicspikes'].layers;
			}
			this.debug('Hazardous Waste damage boost');
			return Math.min(300, 50 + 50 * allLayers);
		},
		category: "Physical",
		shortDesc: "+50 power for each hazard layer on user's side. Caps at 300.",
		name: "Hazardous Waste",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acid Downpour", target);
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
	chisel: {
		accuracy: 100,
		basePower: 45,
		category: "Physical",
		shortDesc: "Gives the foe a Substitute, then hits 4 times.",
		name: "Chisel",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		multihit: 4,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Salt Cure", target);
			target.addVolatile('substitute');
			this.add('-anim', source, "Stone Axe", target);
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Cool",
	},
	peekaboo: {
		accuracy: 100,
		basePower: 140,
		category: "Physical",
		shortDesc: "Deal halved damage if the user takes damage before it hits.",
		name: "Peekaboo",
		pp: 20,
		priority: -3,
		flags: {contact: 1, protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Heart Stamp", target);
		},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('peekaboo');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Peekaboo');
			},
			onHit(pokemon, source, move) {
				if (move.category !== 'Status') {
					this.effectState.lostSurprise = true;
				}
			},
			onBasePower(basePower, pokemon) {
				if (pokemon.volatiles['peekaboo']?.lostSurprise) {
					this.debug('halved power');
					return this.chainModify(0.5);
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
	},
	psychoboost: {
		num: 354,
		accuracy: 100,
		basePower: 120,
		shortDesc: "Lowers the user's Sp. Atk by 1. Hits foe(s).",
		category: "Special",
		isNonstandard: null,
		name: "Psycho Boost",
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
		type: "Psychic",
		contestType: "Clever",
	},
	ragefist: {
		num: 889,
		accuracy: 100,
		basePower: 50,
		basePowerCallback(pokemon) {
			return Math.min(200, 50 + 50 * pokemon.timesAttacked);
		},
		shortDesc: "+50 power for each time user was hit. Max 3 hits.",
		category: "Physical",
		name: "Rage Fist",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	ragingfury: {
		num: 833,
		accuracy: 100,
		basePower: 50,
		basePowerCallback(pokemon) {
			return Math.min(200, 50 + 50 * pokemon.timesAttacked);
		},
		shortDesc: "+50 power for each time user was hit. Max 3 hits.",
		category: "Physical",
		name: "Raging Fury",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Fire",
	},
  parry: {
	   accuracy: 100,
	   basePower: 80,
	   category: "Physical",
	   shortDesc: "If the foe used a priority move, this move hits before that move and flinches the foe.",
	   name: "Parry",
	   pp: 10,
	   priority: 0,
	   flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mach Punch", target);
		},
	   priorityChargeCallback(pokemon) {
			this.add('-message', `${pokemon.name} is attempting to parry!`);
			this.actions.useMove("Parry Condition", pokemon);
	   }, 
	   secondary: {}, // sheer force boosted
	   target: "normal",
	   type: "Fighting",
	   contestType: "Clever",
    },
  parrycondition: {
	   accuracy: true,
	   basePower: 0,
	   category: "Physical",
	   shortDesc: "Required to make Parry work.",
	   name: "Parry Condition",
	   pp: 10,
	   priority: 6,
	   flags: {},
		volatileStatus: 'parrycondition',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Imprison", target);
		},
		onHit(target) {
			this.add('-message', `${target.name}'s priority attacks will get parried!`);
		},
	   condition: {
		 duration: 1,
		 onModifyPriority(priority, source, target, move) {
			if ((move?.priority > 0.1) && (move?.category !== 'Status')) {
				return priority - 6;
			}
		 },
		onBeforeMovePriority: 9,
		onBeforeMove(pokemon, target, move) {
			if (['fakeout', 'extremespeed', 'feint', 'firstimpression', 'accelerock', 'aquajet', 'machpunch',
				  'quickattack', 'bulletpunch', 'shadowsneak','iceshard', 'jetpunch', 'cuttingremark', 'chainlightning',
				 	'suckerpunch', 'watershuriken', 'vacuumwave', 'grassyglide'].includes(move.id) ||
				 	(move.type === 'Flying' && pokemon.hp >= pokemon.maxhp / 2 && pokemon.hasAbility('galewings') && move.category !== 'Status') ||
					(move.flags['heal'] && pokemon.hasAbility('triage') && move.category !== 'Status') &&
				(!pokemon.hasAbility('innerfocus') ||
				 !pokemon.hasAbility('shielddust') ||
				 !pokemon.hasItem('covertcloak') || 
				 !pokemon.hasAbility('sandveil') && !this.field.isWeather('sandstorm') ||
				 !pokemon.hasAbility('sunblock') && !this.field.isWeather('sunnyday')  ||
				 !pokemon.hasAbility('snowcloak') && !this.field.isWeather('snow'))) {
				this.add('cant', pokemon, move, move);
				this.add('-message', `${pokemon.name}'s attack was parried!`);
				return false;
				if (pokemon.hasAbility('steadfast')) {
					this.boost({spe: 1}, pokemon);					
				}
			}
		},
	  },	
	  secondary: null,
	  target: "normal",
	  type: "Fighting",
	  contestType: "Clever",
    },
	rollout: {
		num: 205,
		accuracy: 100,
		basePower: 50,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.volatiles['defensecurl']) {
				this.debug('BP doubled');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
	   shortDesc: "Switches the user out. 2x power if Rollout or Defense Curl was used last turn.",
		name: "Rollout",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, noparentalbond: 1, failinstruct: 1},
		self: {
			sideCondition: 'rollout',
		},
		selfSwitch: true,
		condition: {
			duration: 2,
			onBasePowerPriority: 1,
			onBasePower(basePower, attacker, defender, move) {
				if (move.id === 'rollout' && !attacker.volatiles['defensecurl']) {
					return this.chainModify(2);
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Cute",
	},
	round: {
		num: 496,
		accuracy: 100,
		basePower: 50,
		category: "Special",
	   shortDesc: "Switches the user out. 2x power if Round was used last turn.",
		name: "Round",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1},
		self: {
			sideCondition: 'round',
		},
		selfSwitch: true,
		condition: {
			duration: 2,
			onBasePowerPriority: 1,
			onBasePower(basePower, attacker, defender, move) {
				if (move.id === 'round') {
					return this.chainModify(2);
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Beautiful",
	},
	rekindleheal: {
		accuracy: true,
		basePower: 0,
		category: "Status",
	   shortDesc: "Healing from Rekindle.",
		name: "Rekindle Heal",
		pp: 5,
		priority: 0,
		flags: {},
		volatileStatus: 'rekindleheal',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Rekindle');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 8);
			},
		},
		secondary: null,
		target: "self",
		type: "Fire",
	},
	rekindle: {
		accuracy: true,
		basePower: 0,
		category: "Status",
	   shortDesc: "Heals by 1/3 max HP, then 1/8 every turn. Burns foe if they switch out.",
		name: "Rekindle",
		pp: 10,
		priority: 0,
		flags: {heal: 1, snatch: 1},
		heal: [1, 3],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Morning Sun", target);
		},
		self: {
			onHit(pokemon, source, move) {
				this.heal(source.baseMaxhp / 3, source, pokemon);
				pokemon.addVolatile('rekindleheal');
			},
		},
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side.hasAlly(pokemon)) continue;
				side.addSideCondition('rekindle', pokemon);
				const data = side.getSideConditionData('rekindle');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('rekindle');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Rekindle start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectState.sources) {
					if (!source.isAdjacent(pokemon) || !this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Rekindle');
						alreadyAdded = true;
					}
					// Run through each action in queue to check if the Pursuit user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (source.canMegaEvo || source.canUltraBurst) {
						for (const [actionIndex, action] of this.queue.entries()) {
							if (action.pokemon === source && action.choice === 'megaEvo') {
								this.actions.runMegaEvo(source);
								this.queue.list.splice(actionIndex, 1);
								break;
							}
						}
					}
					pokemon.trySetStatus('brn', source);
					this.actions.runMove('rekindle', source, source.getLocOf(pokemon));
				}
			},
		},
		secondary: null,
		target: "all",
		type: "Fire",
		contestType: "Clever",
	},
	meteorbeam: {
		num: 800,
		accuracy: 90,
		basePower: 120,
		category: "Special",
	   shortDesc: "Raises user's Sp. Atk by 1 on turn 1. Hits turn 2. Hits in 1 turn in Sand.",
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
			if (this.field.isWeather('sandstorm') || attacker.hasItem('sandclock')) {
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

// all edited unchanged moves
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
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('overcoat') || pokemon.hasItem('dancingshoes')) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				if (pokemon.hasAbility('smelt')) {
					const fireHazard = this.dex.getActiveMove('Stealth Rock');
					fireHazard.type = 'Fire';
					const smeltMod = this.clampIntRange(pokemon.runEffectiveness(fireHazard), -6, 6);
					this.damage(pokemon.maxhp * Math.pow(2, smeltMod) / 8);
				} else {
					this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
				}
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Rock",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
	},
	spikes: {
		num: 191,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Spikes",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1, mustpressure: 1},
		sideCondition: 'spikes',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 3) return false;
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers++;
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('overcoat') || pokemon.hasItem('dancingshoes')) return;
				const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
				this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / 24);
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Ground",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	toxicspikes: {
		num: 390,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Toxic Spikes",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1, mustpressure: 1},
		sideCondition: 'toxicspikes',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectState.layers++;
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Poison')) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (pokemon.hasType('Steel') || pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('overcoat') || pokemon.hasItem('dancingshoes')) {
					return;
				} else if (this.effectState.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Poison",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	stickyweb: {
		num: 564,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Sticky Web",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1},
		sideCondition: 'stickyweb',
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Sticky Web');
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('overcoat') || pokemon.hasItem('dancingshoes')) return;
				this.add('-activate', pokemon, 'move: Sticky Web');
				this.boost({spe: -1}, pokemon, this.effectState.source, this.dex.getActiveMove('stickyweb'));
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Bug",
		zMove: {boost: {spe: 1}},
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
		flags: {protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, wind: 1},
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'healingstones',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'healingstones',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.conditions.get(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Defog', '[of] ' + source);
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
	blazingtorque: {
		inherit: true,
		isNonstandard: null,
	},
	wickedtorque: {
		inherit: true,
		isNonstandard: null,
	},
	noxioustorque: {
		inherit: true,
		isNonstandard: null,
	},
	combattorque: {
		inherit: true,
		isNonstandard: null,
	},
	magicaltorque: {
		inherit: true,
		isNonstandard: null,
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
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'healingstones'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'healingstones'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
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
	mortalspin: {
		num: 866,
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		name: "Mortal Spin",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Mortal Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'healingstones'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Mortal Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Mortal Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'healingstones'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Mortal Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		secondary: {
			chance: 100,
			status: 'psn',
		},
		target: "allAdjacentFoes",
		type: "Poison",
	},
	tidyup: {
		num: 882,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Tidy Up",
		pp: 10,
		priority: 0,
		flags: {},
		onHit(pokemon) {
			let success = false;
			for (const active of this.getAllActive()) {
				if (active.removeVolatile('substitute')) success = true;
			}
			const removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'healingstones'];
			const sides = [pokemon.side, ...pokemon.side.foeSidesWithConditions()];
			for (const side of sides) {
				for (const sideCondition of removeAll) {
					if (side.removeSideCondition(sideCondition)) {
						this.add('-sideend', side, this.dex.conditions.get(sideCondition).name);
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
	courtchange: {
		num: 756,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Court Change",
		pp: 10,
		priority: 0,
		flags: {mirror: 1},
		onHitField(target, source) {
			const sideConditions = [
				'mist', 'lightscreen', 'reflect', 'spikes', 'safeguard', 'tailwind', 'toxicspikes', 'stealthrock',
				'waterpledge', 'firepledge', 'grasspledge', 'stickyweb', 'auroraveil', 'gmaxsteelsurge', 'gmaxcannonade',
				'gmaxvinelash', 'gmaxwildfire', 'healingstones',
			];
			let success = false;
			if (this.gameType === "freeforall") {
				// random integer from 1-3 inclusive
				const offset = this.random(3) + 1;
				// the list of all sides in counterclockwise order
				const sides = [this.sides[0], this.sides[2]!, this.sides[1], this.sides[3]!];
				const temp: {[k: number]: typeof source.side.sideConditions} = {0: {}, 1: {}, 2: {}, 3: {}};
				for (const side of sides) {
					for (const id in side.sideConditions) {
						if (!sideConditions.includes(id)) continue;
						temp[side.n][id] = side.sideConditions[id];
						delete side.sideConditions[id];
						const effectName = this.dex.conditions.get(id).name;
						this.add('-sideend', side, effectName, '[silent]');
						success = true;
					}
				}
				for (let i = 0; i < 4; i++) {
					const sourceSideConditions = temp[sides[i].n];
					const targetSide = sides[(i + offset) % 4]; // the next side in rotation
					for (const id in sourceSideConditions) {
						targetSide.sideConditions[id] = sourceSideConditions[id];
						const effectName = this.dex.conditions.get(id).name;
						let layers = sourceSideConditions[id].layers || 1;
						for (; layers > 0; layers--) this.add('-sidestart', targetSide, effectName, '[silent]');
					}
				}
			} else {
				const sourceSideConditions = source.side.sideConditions;
				const targetSideConditions = source.side.foe.sideConditions;
				const sourceTemp: typeof sourceSideConditions = {};
				const targetTemp: typeof targetSideConditions = {};
				for (const id in sourceSideConditions) {
					if (!sideConditions.includes(id)) continue;
					sourceTemp[id] = sourceSideConditions[id];
					delete sourceSideConditions[id];
					success = true;
				}
				for (const id in targetSideConditions) {
					if (!sideConditions.includes(id)) continue;
					targetTemp[id] = targetSideConditions[id];
					delete targetSideConditions[id];
					success = true;
				}
				for (const id in sourceTemp) {
					targetSideConditions[id] = sourceTemp[id];
				}
				for (const id in targetTemp) {
					sourceSideConditions[id] = targetTemp[id];
				}
				this.add('-swapsideconditions');
			}
			if (!success) return false;
			this.add('-activate', source, 'move: Court Change');
		},
		secondary: null,
		target: "all",
		type: "Normal",
	},
	healblock: {
		num: 377,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		isNonstandard: "Past",
		name: "Heal Block",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		volatileStatus: 'healblock',
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Heal Block');
					return 7;
				}
				if (effect.id === 'deathaura') {
					return 0;
				}
				return 5;
			},
			onStart(pokemon, source) {
				this.add('-start', pokemon, 'move: Heal Block');
				source.moveThisTurnResult = true;
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).flags['heal']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if ((move.flags['heal'] || move.id === 'bitterblade') && !move.isZ && !move.isMax) {
					this.add('cant', pokemon, 'move: Heal Block', move);
					return false;
				}
			},
			onModifyMove(move, pokemon, target) {
				if ((move.flags['heal'] || move.id === 'bitterblade') && !move.isZ && !move.isMax) {
					this.add('cant', pokemon, 'move: Heal Block', move);
					return false;
				}
			},
			onResidualOrder: 20,
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Heal Block');
			},
			onTryHeal(damage, target, source, effect) {
				if ((effect?.id === 'zpower') || this.effectState.isZ) return damage;
				return false;
			},
			onRestart(target, source) {
				this.add('-fail', target, 'move: Heal Block'); // Succeeds to supress downstream messages
				if (!source.moveThisTurnResult) {
					source.moveThisTurnResult = false;
				}
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Psychic",
		zMove: {boost: {spa: 2}},
		contestType: "Clever",
	},
	electricterrain: {
		num: 604,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Electric Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'electricterrain',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (status.id === 'slp' && target.isGrounded() && !target.isSemiInvulnerable()) {
					if (effect.id === 'yawn' || (effect.effectType === 'Move' && !effect.secondaries)) {
						for (const active of this.getAllActive()) {
							if (active.hasAbility('cloudnine')) {
								return;
							}
						}
						this.add('-activate', target, 'move: Electric Terrain');
					}
					for (const active of this.getAllActive()) {
						if (active.hasAbility('cloudnine')) {
							this.add('-message', `${active.name} suppresses the effects of the terrain!`);
							return;
						}
					}
					return false;
				}
			},
			onTryAddVolatile(status, target) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'yawn') {
					this.add('-activate', target, 'move: Electric Terrain');
					for (const active of this.getAllActive()) {
						if (active.hasAbility('cloudnine')) {
							this.add('-message', `${active.name} suppresses the effects of the terrain!`);
							return;
						}
					}
					return null;
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Electric' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					for (const active of this.getAllActive()) {
						if (active.hasAbility('cloudnine')) {
							this.add('-message', `${active.name} suppresses the effects of the terrain!`);
							return;
						}
					}
					this.debug('electric terrain boost');
					return this.chainModify([5325, 4096]);
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Electric Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Electric Terrain');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Electric Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Electric",
		zMove: {boost: {spe: 1}},
		contestType: "Clever",
	},
	psychicterrain: {
		num: 678,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Psychic Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'psychicterrain',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onTryHitPriority: 4,
			onTryHit(target, source, effect) {
				if (effect && (effect.priority <= 0.1 || effect.target === 'self')) {
					return;
				}
				if (target.isSemiInvulnerable() || target.isAlly(source)) return;
				if (!target.isGrounded()) {
					const baseMove = this.dex.moves.get(effect.id);
					if (baseMove.priority > 0) {
						this.hint("Psychic Terrain doesn't affect Pokémon immune to Ground.");
					}
					return;
				}
				for (const active of this.getAllActive()) {
					if (active.hasAbility('cloudnine')) {
						this.add('-message', `${active.name} suppresses the effects of the terrain!`);
						return;
					}
				}
				this.add('-activate', target, 'move: Psychic Terrain');
				return null;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Psychic' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					for (const active of this.getAllActive()) {
						if (active.hasAbility('cloudnine')) {
							this.add('-message', `${active.name} suppresses the effects of the terrain!`);
							return;
						}
					}
					this.debug('psychic terrain boost');
					return this.chainModify([5325, 4096]);
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Psychic Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Psychic Terrain');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Psychic Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Psychic",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
	grassyterrain: {
		num: 580,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Grassy Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'grassyterrain',
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
				const weakenedMoves = ['earthquake', 'bulldoze', 'magnitude'];
				if (weakenedMoves.includes(move.id) && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					for (const target of this.getAllActive()) {
						if (target.hasAbility('cloudnine')) {
							this.add('-message', `${target.name} suppresses the effects of the terrain!`);
							return;
						}
					}
					this.debug('move weakened by grassy terrain');
					return this.chainModify(0.5);
				}
				if (move.type === 'Grass' && attacker.isGrounded()) {
					for (const target of this.getAllActive()) {
						if (target.hasAbility('cloudnine')) {
							this.add('-message', `${target.name} suppresses the effects of the terrain!`);
							return;
						}
					}
					this.debug('grassy terrain boost');
					return this.chainModify([5325, 4096]);
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Grassy Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Grassy Terrain');
				}
			},
			onResidualOrder: 5,
			onResidualSubOrder: 2,
			onResidual(pokemon) {
				for (const target of this.getAllActive()) {
					if (target.hasAbility('cloudnine')) {
						this.add('-message', `${target.name} suppresses the effects of the terrain!`);
						return;
					}
				}
				if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
					this.heal(pokemon.baseMaxhp / 16, pokemon, pokemon);
				} else {
					this.debug(`Pokemon semi-invuln or not grounded; Grassy Terrain skipped`);
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Grassy Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Grass",
		zMove: {boost: {def: 1}},
		contestType: "Beautiful",
	},
	mistyterrain: {
		num: 581,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Misty Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'mistyterrain',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (effect && ((effect as Move).status || effect.id === 'yawn')) {
					for (const active of this.getAllActive()) {
						if (active.hasAbility('cloudnine')) {
							return;
						}
					}
					this.add('-activate', target, 'move: Misty Terrain');
				}
			for (const active of this.getAllActive()) {
					if (active.hasAbility('cloudnine')) {
						this.add('-message', `${active.name} suppresses the effects of the terrain!`);
						return;
					}
				}
				return false;
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'confusion') {
					for (const active of this.getAllActive()) {
						if (active.hasAbility('cloudnine')) {
							this.add('-message', `${active.name} suppresses the effects of the terrain!`);
							return;
						}
					}
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Misty Terrain');
					return null;
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Dragon' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					for (const target of this.getAllActive()) {
						if (target.hasAbility('cloudnine')) {
							this.add('-message', `${target.name} suppresses the effects of the terrain!`);
							return;
						}
					}
					this.debug('misty terrain weaken');
					return this.chainModify(0.5);
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Misty Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Misty Terrain');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'Misty Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Fairy",
		zMove: {boost: {spd: 1}},
		contestType: "Beautiful",
	},
	camouflage: {
		inherit: true,
		onHit(target) {
			let newType = 'Normal';
			if (this.field.isTerrain('electricterrain')) {
				newType = 'Electric';
			} else if (this.field.isTerrain('grassyterrain')) {
				newType = 'Grass';
			} else if (this.field.isTerrain('mistyterrain')) {
				newType = 'Fairy';
			} else if (this.field.isTerrain('psychicterrain')) {
				newType = 'Psychic';
			}
			for (const active of this.getAllActive()) {
				if (active.hasAbility('cloudnine')) {
					this.add('-message', `${target.name} suppresses the effects of the terrain!`);
					newType = 'Normal';
				}
			}

			if (target.getTypes().join() === newType || !target.setType(newType)) return false;
			this.add('-start', target, 'typechange', newType);
		},
	},
	expandingforce: {
		inherit: true,
		onBasePower(basePower, source) {
			if (this.getAllActive().some(x => x.hasAbility('cloudnine'))) return;
			if (this.field.isTerrain('psychicterrain') && source.isGrounded()) {
				this.debug('terrain buff');
				return this.chainModify(1.5);
			}
		},
		onModifyMove(move, source, target) {
			if (this.getAllActive().some(x => x.hasAbility('cloudnine'))) return;
			if (this.field.isTerrain('psychicterrain') && source.isGrounded()) {
				move.target = 'allAdjacentFoes';
			}
		},
	},
	floralhealing: {
		inherit: true,
		onHit(target, source) {
			let success = false;
			if (this.field.isTerrain('grassyterrain')) {
				if (this.getAllActive().some(x => x.hasAbility('cloudnine'))) {
					this.add('-message', `${target.name} suppresses the effects of the terrain!`);
					return success;
				}
				success = !!this.heal(this.modify(target.baseMaxhp, 0.667));
			} else {
				success = !!this.heal(Math.ceil(target.baseMaxhp * 0.5));
			}
			if (success && target.side !== source.side) {
				target.staleness = 'external';
			}
			return success;
		},
	},
	grassyglide: {
		inherit: true,
		onModifyPriority(priority, source, target, move) {
			if (this.getAllActive().some(x => x.hasAbility('cloudnine'))) return priority;
			if (this.field.isTerrain('grassyterrain') && source.isGrounded()) {
				return priority + 1;
			}
		},
	},
	mistyexplosion: {
		inherit: true,
		onBasePower(basePower, source) {
			if (this.getAllActive().some(x => x.hasAbility('cloudnine'))) return;
			if (this.field.isTerrain('mistyterrain') && source.isGrounded()) {
				this.debug('misty terrain boost');
				return this.chainModify(1.5);
			}
		},
	},
	naturepower: {
		inherit: true,
		onTryHit(target, pokemon) {
			let move = 'triattack';
			if (this.field.isTerrain('electricterrain')) {
				move = 'thunderbolt';
			} else if (this.field.isTerrain('grassyterrain')) {
				move = 'energyball';
			} else if (this.field.isTerrain('mistyterrain')) {
				move = 'moonblast';
			} else if (this.field.isTerrain('psychicterrain')) {
				move = 'psychic';
			}
			for (const active of this.getAllActive()) {
				if (active.hasAbility('cloudnine')) {
					this.add('-message', `${active.name} suppresses the effects of the terrain!`);
					move = 'triattack';
				}
			}
			this.useMove(move, pokemon, target);
			return null;
		},
	},
	risingvoltage: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			if (this.getAllActive().some(x => x.hasAbility('cloudnine'))) return;
			if (this.field.isTerrain('electricterrain') && target.isGrounded()) {
				this.debug('terrain buff');
				return this.chainModify(2);
			}
		},
	},
	secretpower: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (this.field.isTerrain('')) return;
			for (const target of this.getAllActive()) {
				if (target.hasAbility('cloudnine')) {
					this.add('-message', `${target.name} suppresses the effects of the terrain!`);
					return;
				}
			}
			move.secondaries = [];
			if (this.field.isTerrain('electricterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'par',
				});
			} else if (this.field.isTerrain('grassyterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'slp',
				});
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
			}
		},
	},
	steelroller: {
		inherit: true,
		onTryHit() {
			if (this.field.isTerrain('')) return false;
			for (const target of this.getAllActive()) {
				if (target.hasAbility('cloudnine')) {
					this.add('-message', `${target.name} suppresses the effects of the terrain!`);
					return false;
				}
			}
		},
	},
	terrainpulse: {
		inherit: true,
		onModifyType(move, pokemon) {
			if (!pokemon.isGrounded()) return;
			if (this.getAllActive().some(x => x.hasAbility('cloudnine'))) return;
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
				for (const target of this.getAllActive()) {
					if (target.hasAbility('cloudnine')) {
						this.add('-message', `${target.name} suppresses the effects of the terrain!`);
						return;
					}
				}
				move.basePower *= 2;
			}
		},
	},
	bleakwindstorm: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	sandsearstorm: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	springtidestorm: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	wildboltstorm: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	aircutter: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	fairywind: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	gust: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	heatwave: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	hurricane: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	icywind: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	petalblizzard: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	sandstorm: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	tailwind: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	twister: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
	},
	whirlwind: {
		inherit: true,
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
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
			if (pokemon.hasItem('sandclock')) {
				move.type = 'Rock';
			}
			if (pokemon.hasItem('snowglobe')) {
				move.type = 'Ice';
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
			if (pokemon.hasItem('sandclock') && !pokemon.effectiveWeather()) {
				move.basePower *= 2;
			}
			if (pokemon.hasItem('snowglobe') && !pokemon.effectiveWeather()) {
				move.basePower *= 2;
			}
			this.debug('BP: ' + move.basePower);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Beautiful",
	},
	shoreup: {
		num: 659,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Shore Up",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			let factor = 0.5;
			if (this.field.isWeather('sandstorm') || pokemon.hasItem('sandclock')) {
				factor = 0.667;
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
		secondary: null,
		target: "self",
		type: "Ground",
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
		flags: {charge: 1, protect: 1, mirror: 1, nosleeptalk: 1, failinstruct: 1},
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
			const weakWeathers = ['raindance', 'primordialsea', 'sandstorm', 'hail', 'snow'];
			if (weakWeathers.includes(pokemon.effectiveWeather()) || pokemon.hasItem('sandclock') || pokemon.hasItem('snowglobe')) {
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
		flags: {contact: 1, charge: 1, protect: 1, mirror: 1, slicing: 1, nosleeptalk: 1, failinstruct: 1},
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
			const weakWeathers = ['raindance', 'primordialsea', 'sandstorm', 'hail', 'snow'];
			if (weakWeathers.includes(pokemon.effectiveWeather()) || pokemon.hasItem('sandclock') || pokemon.hasItem('snowglobe')) {
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
		inherit: true,
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
			if (pokemon.hasItem('snowglobe') || pokemon.hasItem('sandclock')) {
				factor = 0.25;
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	morningsun: {
		inherit: true,
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
			if (pokemon.hasItem('snowglobe') || pokemon.hasItem('sandclock')) {
				factor = 0.25;
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	moonlight: {
		inherit: true,
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
			if (pokemon.hasItem('snowglobe') || pokemon.hasItem('sandclock')) {
				factor = 0.25;
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	auroraveil: {
		num: 694,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Aurora Veil",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'auroraveil',
		onTry(source) {
			if (this.field.isWeather(['hail', 'snow']) || source.hasItem('snowglobe')) {
				return;
			}
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
				if (target !== source && this.effectState.target.hasAlly(target)) {
					if ((target.side.getSideCondition('reflect') && this.getCategory(move) === 'Physical') ||
							(target.side.getSideCondition('lightscreen') && this.getCategory(move) === 'Special')) {
						return;
					}
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Aurora Veil weaken');
						if (this.activePerHalf > 1) return this.chainModify([2732, 4096]);
						return this.chainModify(0.5);
					}
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Aurora Veil');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 10,
			onSideEnd(side) {
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
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		onModifyMove(move, pokemon) {
			if (this.field.isWeather(['hail', 'snow']) || pokemon.hasItem('snowglobe')) move.accuracy = true;
		},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		self: {
			onHit(pokemon, source, move) {
				if (source.hasItem('airfreshener')) {
					this.add('-activate', source, 'move: Aromatherapy');
					for (const ally of source.side.pokemon) {
						if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
							continue;
						}
						ally.cureStatus();
					}
				}
			},
		},
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
	},
};
