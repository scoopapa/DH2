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
			if (target.lastMove && !target.lastMove.isZ && !target.lastMove.isMax && !target.lastMove.id === 'struggle' && !target.volatiles['disable']) {
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
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
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
		pp: 1,
		priority: 0,
		flags: {},
		onTryHit(source) {
			if (!this.canSwitch(source.side)) {
				this.attrLastMove('[still]');
				this.add('-anim', source, "Zap Cannon", source);
				this.boost({atk: 1, spa: 1, def: 2, spd: 2}, target);
				source.addVolatile('nanoboosted');
				// While the move theoretically does not fail, this is here to prevent the slot condition from being set if Ana fails to switch and thus Nanoboosts herself
				return this.NOT_FAIL;
			}
		},
		slotCondition: 'nanoboost',
		condition: {
			onSwap(target) {
				if (!target.fainted) {
					this.attrLastMove('[still]');
					this.add('-anim', target, "Zap Cannon", target);
					this.add('-start', target, 'Nano Boost');
					this.boost({atk: 1, spa: 1, def: 2, spd: 2}, target);
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
				if (effect?.name === "Psychic Noise" || effect?.name === "Biotic Grenade") {
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
				if (effect?.name === 'Psychic Noise' || effect?.name === 'Biotic Grenade') return;

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
};
