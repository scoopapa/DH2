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
	// New Moves
	rapidfire: {
		num: -1,
		accuracy: 100,
		basePower: 15,
		category: "Physical",
		name: "Rapid Fire",
		shortDesc: "Hits 2-5 times. Usually goes first.",
		pp: 20,
		priority: 1,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flamethrower", target);
		},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	sunkenlunge: {
		num: -2,
		accuracy: 90,
		basePower: 60,
		category: "Physical",
		name: "Sunken Lunge",
		shortDesc: "Hits first. First turn out only. Target's Speed -1.",
		pp: 16,
		priority: 2,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Splash", source);
			this.add('-anim', source, "Jaw Lock", target);
		},
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Sunken Lunge only works on your first turn out.");
				return false;
			}
		},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Water",
	},
	starburst: {
		num: -3,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Starburst",
		shortDesc: "Applies spotlight on target. Usually goes first.",
		pp: 16,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Moonlight", source);
			this.add('-anim', source, "Accelerock", target);
		},
		tracksTarget: true,
		secondary: {
			chance: 100,
			volatileStatus: 'spotlight',
		},
		target: "normal",
		type: "Fairy",
	},
	// Adjusted Moves
	rockslide: {
		inherit: true,
		modded: true, // this makes its description display in Data Mod
		shortDesc: "20% chance to make the foe(s) flinch.",
		desc: "20% chance to make the foe(s) flinch.",
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
	},
	// Snatch got buffed, but in reality the changes are applied to the moves it now affects
	snatch: {
		inherit: true,
		isNonstandard: null,
	},
	revivalblessing: {
		inherit: true,
		flags: {heal: 1, nosketch: 1, snatch: 1},
	},
	filletaway: {
		inherit: true,
		flags: {snatch: 1},
	},
	tidyup: {
		inherit: true,
		flags: {snatch: 1},
	},
};
