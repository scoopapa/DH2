/*
List of flags and their descriptions:
authentic: Ignores a target's substitute.
bite: Power is multiplied by 1.5 when used by a Pokemon with the Ability Strong Jaw.
bullet: Has no effect on Pokemon with the Ability Bulletproof.
charge: The user is unable to make a move between turns.
contact: Makes contact.
defrost: Thaws the user if executed successfully while the user is frozen.
distance: Can target a Pokemon positioned anywhere in a Triple Battle.
gravity: Prevented from being executed or selected during Gravity's effect.
heal: Prevented from being executed or selected during Heal Block's effect.
mirror: Can be copied by Mirror Move.
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

'use strict';

exports.BattleMovedex = {
	"hugesweep": {
		num: 10000,
		accuracy: 100,
		basePower: 105,
		category: "Physical",
		desc: "Hits all adjacent Pokemon. Forces all adjacent foes to switch out as long as there is an available Pokemon to switch to.",
		shortDesc: "Hits all Pokemon. Forces targets to switch.",
		id: "hugesweep",
		name: "Huge Sweep",
		pp: 5,
		priority: -2,
		flags: {protect: 1, mirror: 1, contact: 1},
		secondary: false,
		target: "allAdjacent",
		type: "Fighting",
		contestType: "Tough",
	},
	"terradrain": {
		num: 10001,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "The user heals equal to 100% of the damage dealt; This move is always last in the priority bracket unless used with Custap Berry or Quick Claw.",
		shortDesc: "Heals 100% of the damage dealt. -1 Priority.",
		id: "terradrain",                              
		name: "Terra Drain",
		pp: 5,
		priority: -1,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 1],
		secondary: false,
		target: "normal",
		type: "Grass",
		zMovePower: 150,
		contestType: "Clever",
	},
  };
