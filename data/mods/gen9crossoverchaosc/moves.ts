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

export const Moves: {[k: string]: ModdedMoveData} = {
	luigilogic: {
		num: -1,
		accuracy: 90,
		basePower: 0,
		category: "Status",
		name: "Luigi Logic",
		shortDesc: "Disables target's ability and previous move choice.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, allyanim: 1, metronome: 1},
		volatileStatus: 'luigilogic',
		onTryHit(target) {
			// If both ability suppression & and move disabling aren't possible (cannot stack with disable)
			if ((target.getAbility().flags['cantsuppress'] || target.volatiles['gastroacid'] || target.hasItem('Ability Shield'))
			&& (!target.lastMove || target.lastMove.isZ || target.lastMove.isMax || target.lastMove.id === 'struggle' || target.volatiles['disable'] )) {
				if (target.hasItem('Ability Shield')) {
				  this.add('-block', target, 'item: Ability Shield');
				}
				this.hint("Luigi Logic will fail if it is both impossible to suppress ability & disable the last used move.");
				return false;
			}
		},
		onHit(target) {
			// Ability suppression
			if (!target.getAbility().flags['cantsuppress'] && !target.volatiles['gastroacid'] && !target.hasItem('Ability Shield')) {
			target.addVolatile('gastroacid');
			}
			else if(target.hasItem('Ability Shield')) {
				this.add('-block', target, 'item: Ability Shield');
			}
			// Move disable
			if (target.lastMove && !target.lastMove.isZ && !target.lastMove.isMax && target.lastMove.id !== 'struggle' && !target.volatiles['disable']) {
				target.addVolatile('disable');
			}
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Nasty Plot", source);
			this.add('-anim', source, "Flash", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	linkinglighthouselaunch: {
		num: -2,
		accuracy: true,
		basePower: 175,
		category: "Special",
		name: "Linking Lighthouse Launch",
		shortDesc: "50% chance to burn, paralyze, or freeze.",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mountain Gale", target);
			this.add('-anim', source, "Fusion Flare", target);
			this.add('-anim', source, "Stoked Sparksurfer", target);
		},
		isZ: "bondiumz",
		secondary:  {
			chance: 50,
			onHit(target, source) {
				const result = this.random(3);
				if (result === 0) {
					target.trySetStatus('brn', source);
				} else if (result === 1) {
					target.trySetStatus('par', source);
				} else {
					target.trySetStatus('frz', source);
				}
			},
		},
		target: "normal",
		type: "Normal",
		contestType: "Cool",
  },
	froggybravesthewindandrain: {
		num: -3,
		accuracy: true,
		basePower: 180,
		category: "Special",
		name: "Froggy Braves the Wind and Rain",
		shortDesc: "Sets rain.",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hurricane", target);
			this.add('-anim', source, "Whirlpool", target);
		},
		isZ: "suwakiumz",
		self: {
			onHit(source) {
				this.field.setWeather('raindance');
			},
		},
	  	target: "normal",
	  	type: "Normal",
		contestType: "Cute",
	},
	bindingblade: {
		num: -4,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Binding Blade",
		shortDesc: "User recovers 50% of the damage dealt.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1, metronome: 1, slicing: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fire Spin", source);
			this.add('-anim', source, "Sacred Sword", target);
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Tough",
	},
	halbird: {
		num: -5,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		overrideDefensiveStat: 'def',
		name: "Halbird",
		shortDesc: "Damages target based on Defense, not Sp. Def.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, slicing: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Charge", source);
			this.add('-anim', source, "Air Cutter", target);
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	stormcallersong: {
		num: -6,
		accuracy: 100,
		basePower: 25,
		category: "Special",
		name: "Stormcaller Song",
		shortDesc: "Hits 3-5 times.",
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, sound: 1, bypasssub: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sparkling Aria", target);
		},
		multihit: [3, 5],
		secondary: null,
		target: "normal",
		type: "Water",
		zMove: {basePower: 140},
		maxMove: {basePower: 130},
		contestType: "Beautiful",
	},
	bioticgrenade: {
		num: -7,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Biotic Grenade",
		shortDesc: "If foe: blocks healing for 2 turns. If ally: heals 50%.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, bullet: 1, metronome: 1, allyanim: 1},
		onTryHit(target, source, move) {
			if (source.isAlly(target)) {
				move.basePower = 0;
				move.infiltrates = true;
				delete move.secondaries;
			}
		},
		onTryMove(source, target, move) {
			if (source.isAlly(target) && source.volatiles['healblock']) {
				this.attrLastMove('[still]');
				this.add('cant', source, 'move: Heal Block', move);
				return false;
			}
		},
		onHit(target, source, move) {
			if (source.isAlly(target)) {
				if (!this.heal(Math.floor(target.baseMaxhp * 0.5))) {
					if (target.volatiles['healblock'] && target.hp !== target.maxhp) {
						this.attrLastMove('[still]');
						// Wrong error message, correct one not supported yet
						this.add('cant', source, 'move: Heal Block', move);
					} else {
						this.add('-immune', target);
					}
					return this.NOT_FAIL;
				}
			}
		},
		secondary: {
			chance: 100,
			volatileStatus: 'healblock',
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sludge Bomb", target);
		},
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	nanoboost: {
		num: -8,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Nano Boost",
		shortDesc: "Switches and boosts incoming ally's atk, spa by 1 stage, def, spd by 2 stages. Lasts 2 turns after applying boost. If no allies remaining, boosts self.",
		pp: 1,
		priority: 0,
		flags: {},
		onTryHit(source, move) {
			if (!this.canSwitch(source.side) || !move.selfSwitch) {
				source.addVolatile('nanoboosted');
				return this.NOT_FAIL;
			}
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acupressure", source);
		},
		slotCondition: 'nanoboost',
		condition: {
			duration: 1,
			onSwap(target) {
				if (!target.fainted) {
					target.addVolatile('nanoboosted');
					target.side.removeSlotCondition(target, 'nanoboost');
				}
			},
		},
		selfSwitch: true,
		isZ: "ananiumz",
		secondary: null,
		target: "self",
		type: "Poison",
		contestType: "Beautiful",
	},
	shademend: {
		num: -9,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Shade Mend",
		shortDesc: "User heals 33% and cures status.",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1, metronome: 1},
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.33));
			return pokemon.cureStatus() || success;
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poltergeist", target);
		},
		secondary: null,
		target: "self",
		type: "Ghost",
		contestType: "Clever",
	},
	rudebuster: {
		num: -10,
		accuracy: 90,
		basePower: 0,
		damageCallback(pokemon, target) {
			return this.clampIntRange(target.getUndynamaxedHP() / 2, 1);
		},
		category: "Special",
		name: "Rude Buster",
		shortDesc: "Does damage equal to 1/2 target's current HP.",
		pp: 5,
		priority: 0,
		flags: {slicing: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dark Pulse", target);
			this.add('-anim', source, "Air Slash", target);
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
	},
	ultimateheal: {
		num: -11,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Ultimate Heal",
		shortDesc: "Susie trained very hard for this.",
		pp: 1,
		priority: 0,
		flags: {heal: 1, bypasssub: 1, allyanim: 1},
		onHit(pokemon) {
			return this.heal(1, pokemon);
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Scale Shot", source);
			this.add('-anim', source, "Jungle Healing", target);
		},
		secondary: null,
		target: "allies",
		type: "Dragon",
		contestType: "Beautiful",
	},
	madmilk: {
		num: -12,
		accuracy: 95,
		basePower: 0,
		category: "Status",
		name: "Mad Milk",
		shortDesc: "Sets side condition on target that causes attackers to heal 60% damage dealt.",
		pp: 15,
		priority: 0,
		flags: {reflectable: 1, protect: 1, metronome: 1, mustpressure: 1, mirror: 1, bypasssub: 1},
		sideCondition: 'madmilk',
		condition: {
			// this is a side condition
			duration: 5,
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Mad Milk');
			},
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Mad Milk');
			},
			onSideRestart(side) {
				if (side.sideConditions['madmilk']) return false;
			},
			onAfterMoveSecondaryPriority: -1,
			onAfterMoveSecondary(target, source, move) {
				if (move.totalDamage && !source.forceSwitchFlag) {
					this.heal(3 * move.totalDamage / 5, source);
				}
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Egg Bomb", target);
			this.add('-anim', source, "Life Dew", target);
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Normal",
		zMove: {boost: {spe: 1}},
		contestType: "Clever",
	},
	forceanature: {
		num: -13,
		accuracy: 90,
		basePower: 65,
		category: "Physical",
		name: "Force-A-Nature",
		shortDesc: "Hits twice.",
		pp: 15,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1, metronome: 1},
		multihit: 2,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Metal Burst", target);
			this.add('-anim', source, "Metal Burst", target);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		zMove: {basePower: 160},
		contestType: "Tough",
	},
	dimensionalcape: {
		num: -14,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Dimensional Cape",
		shortDesc: "Switches and makes incoming ally immune to entry hazards.",
		pp: 15,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Phantom Force", source);
			this.add('-anim', source, "Teleport", source);
		},
		slotCondition: 'dimensionalcape',
		condition: {
			duration: 1,
			onSwap(target) {
				if (!target.fainted) {
					target.addVolatile('hazardshield');
				}
				target.side.removeSlotCondition(target, 'dimensionalcape');
			},
		},
		selfSwitch: true,
		secondary: null,
		target: "self",
		type: "Dark",
		contestType: "Cool",
	},
	galaxiadarkness: {
		num: -15,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Galaxia Darkness",
		shortDesc: "User becomes semi-invulnerable for one turn and slicing attacks used next turn have damaged doubled",
		pp: 1,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Swords Dance", source);
			this.add('-anim', source, "Black Hole Eclipse", source);
		},
		volatileStatus: 'galaxiadarkness',
		condition: {
			duration: 2,
			onStart(target) {
				this.add('-start', target, 'Galaxia Darkness');
			},
			onImmunity(type, pokemon) {
				if (type === 'sandstorm' || type === 'hail') return false;
			},
			onInvulnerability(target, source, move) {
				// If we add moves that can bypass this invulnerability in the future, this can be used
				//if () {
				//	return;
				//}
				return false;
			},
			onBasePower(basePower, attacker, defender, move) {
				attacker.removeVolatile('galaxiadarkness');
				if (move.flags['slicing']) {
					this.debug('Galaxia Darkness boost');
					return this.chainModify(2);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'Galaxia Darkness');
			}
		},
		isZ: "metaknightiumz",
		secondary: null,
		target: "self",
		type: "Dark",
		contestType: "Cool",
	},
	gossamerstorm: {
		num: -16,
		accuracy: true,
		basePower: 95,
		category: "Physical",
		name: "Gossamer Storm",
		shortDesc: "Lowers target's speed by 1 stage.",
		pp: 10,
		priority: 0,
		flags: {slicing: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Swords Dance", source);
			this.add('-anim', source, "Air Slash", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Bug",
		contestType: "Beautiful",
	},
	upperdasharm: {
		num: -17,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		name: "Upperdash Arm",
		shortDesc: "Halves damage from special attacks before user moves.",
		pp: 15,
		priority: -3,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, contact: 1, punch: 1},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('upperdasharm');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-anim', source, "Defense Curl", source);
				this.add('-singleturn', pokemon, 'move: Upperdash Arm');
			},
			onSourceModifySpAPriority: 5,
			onSourceModifySpA(spa, attacker, defender, move) {
				this.debug('Upperdash Arm weaken');
				return this.chainModify(0.5);
			},
		},
		// FIXME: onMoveAborted(pokemon) {pokemon.removeVolatile('upperdasharm')},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('upperdasharm');
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sky Uppercut", target);
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
	},
	finalstrike: {
		num: -18,
		accuracy: 90,
		basePower: 130,
		category: "Special",
		name: "Final Strike",
		shortDesc: "Lowers the user's Sp. Atk by 1.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Judgment", target);
			this.add('-anim', source, "Light of Ruin", target);
		},
		self: {
			boosts: {
				spa: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Beautiful",
	},
	frostbitebreath: {
		num: -19,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Frostbite Breath",
		shortDesc: "Hits the target for their lower defensive stat.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon, target) {
			if (target.getStat('spd', false, true) > target.getStat('def', false, true)) move.overrideDefensiveStat = 'spd';
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Frost Breath", target);
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	infecteddreams: {
		num: -20,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Infected Dreams",
		shortDesc: "30% par. 2x power if target already paralyzed.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onBasePower(basePower, pokemon, target) {
			if (target.status === 'par') {
				return this.chainModify(2);
			}
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Infestation", target);
			this.add('-anim', source, "Nightmare", target);
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
	},
	bubbleswathe: {
		num: -21,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Bubble Swathe",
		shortDesc: "Suppresses pivoting effects of target's moves for 2 turns.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sucker Punch", target);
			this.add('-anim', target, "Aqua Ring", target);
		},
		secondary: {
			chance: 100,
			onHit(target, source) {
				if (!target.volatiles['pivotsuppression']) {
					target.addVolatile('pivotsuppression');
				}
			},
		},
		target: "normal",
		type: "Water",
		contestType: "Clever",
	},
	bonesaw: {
		num: -22,
		accuracy: 90,
		basePower: 65,
		category: "Physical",
		name: "Bonesaw",
		shortDesc: "High critical hit ratio.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Night Slash", target);
		},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},
	medigun: {
		num: -23,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Medi-Gun",
		shortDesc: "Next hurt ally healed for 25% & status cured.",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1, metronome: 1},
		slotCondition: 'medigun',
		condition: {
			onSwap(target) {
				if (!target.fainted && (target.hp < target.maxhp || target.status)) {
					const damage = this.heal(target.baseMaxhp / 4, target, target);
					target.clearStatus();
					if (damage) this.add('-heal', target, target.getHealth, '[from] move: Medi-Gun', '[of] ' + this.effectState.source);
					target.side.removeSlotCondition(target, 'medigun');
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		contestType: "Clever",
	},
	engineblowback: {
		num: -24,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Engine Blowback",
		shortDesc: "Forces the target to switch to a random ally.",
		pp: 10,
		priority: -6,
		flags: {protect: 1, mirror: 1, metronome: 1, noassist: 1, failcopycat: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Overheat", target);
		},
		forceSwitch: true,
		target: "normal",
		type: "Fire",
		contestType: "Tough",
	},
	mineralize: {
		num: -25,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		name: "Mineralize",
		shortDesc: "Removes and replaces item with a Dusk Stone.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onAfterHit(target, source) {
			if (source.hp) {
				const item = target.takeItem();
				if (item) {
					if(item.id != 'duskstone') {
						this.add('-enditem', target, item.name, '[from] move: Mineralize', '[of] ' + source);
						this.add('-item', target, 'Dusk Stone', '[from] move: Mineralize');
					}
					target.item = 'duskstone';
				}
			}
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sludge Wave", target);
			this.add('-anim', target, "Power Gem", target);
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Clever",
	},
	orbofdiscord: {
		num: -26,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Orb of Discord",
		shortDesc: "Inflicts heal block for 2 turns. User switches.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1},
		onHit(target, source, move) {
			const success = target.addVolatile('healblock', source, move);
			if (!success) {
				delete move.selfSwitch;
			}
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", target);
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Clever",
	},

	// Altering Pre-Existing Moves
	healblock: {
		num: 377,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		isNonstandard: "Past",
		name: "Heal Block",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1},
		volatileStatus: 'healblock',
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (effect?.name === "Psychic Noise" || effect?.name === "Biotic Grenade" || effect?.name === "Orb of Discord") {
					return 2;
				}
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Heal Block');
					return 7;
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
				if (move.flags['heal'] && !move.isZ && !move.isMax) {
					this.add('cant', pokemon, 'move: Heal Block', move);
					return false;
				}
			},
			onModifyMove(move, pokemon, target) {
				if (move.flags['heal'] && !move.isZ && !move.isMax) {
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
			onRestart(target, source, effect) {
				if (effect?.name === 'Psychic Noise' || effect?.name === 'Biotic Grenade' || effect?.name === "Orb of Discord") return;

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
	gmaxsteelsurge: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Steelsurge",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Copperajah",
		self: {
			onHit(source) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('gmaxsteelsurge');
				}
			},
		},
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: G-Max Steelsurge');
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || pokemon.volatiles['hazardshield']) return;
				// Ice Face and Disguise correctly get typed damage from Stealth Rock
				// because Stealth Rock bypasses Substitute.
				// They don't get typed damage from Steelsurge because Steelsurge doesn't,
				// so we're going to test the damage of a Steel-type Stealth Rock instead.
				const steelHazard = this.dex.getActiveMove('Stealth Rock');
				steelHazard.type = 'Steel';
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(steelHazard), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Steel",
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
		flags: {reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1},
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
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots') || pokemon.volatiles['hazardshield']) return;
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
	stealthrock: {
		num: 446,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Stealth Rock",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, metronome: 1, mustpressure: 1},
		sideCondition: 'stealthrock',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || pokemon.volatiles['hazardshield']) return;
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
	stickyweb: {
		num: 564,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Sticky Web",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, metronome: 1},
		sideCondition: 'stickyweb',
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Sticky Web');
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots') || pokemon.volatiles['hazardshield']) return;
				this.add('-activate', pokemon, 'move: Sticky Web');
				this.boost({spe: -1}, pokemon, pokemon.side.foe.active[0], this.dex.getActiveMove('stickyweb'));
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Bug",
		zMove: {boost: {spe: 1}},
		contestType: "Tough",
	},
	toxicspikes: {
		num: 390,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Toxic Spikes",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1},
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
				} else if (pokemon.hasType('Steel') || pokemon.hasItem('heavydutyboots') || pokemon.volatiles['hazardshield']) {
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
	revivalblessing: {
		num: 863,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Revival Blessing",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {heal: 1, nosketch: 1, falseswitch: 1},
		onTryHit(source) {
			if (!source.side.pokemon.filter(ally => ally.fainted).length) {
				return false;
			}
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
};
