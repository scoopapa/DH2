/*
+List of flags and their descriptions:
bypasssub: Ignores a target's substitute.
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
allyanim: Animates when used against allies
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

export const Moves: {[moveid: string]: MoveData} = {
	acidrain: {
	basePower: 75,
	accuracy: 100,
	category: "Special", 
	shortDesc: "Deals super effective damage against Rock-types. has a 20% chance to Poison the target.",
	id: "acidrain",
	name: "Acid Rain",
	pp: 20,
	priority: 0,
	flags: {protect: 1, mirror: 1},
	onEffectiveness(typeMod, target, type) {
			if (type === 'Rock') return 1;
	},
	secondary: {
			chance: 20,
			status: 'psn',
	},
	target: "normal",
	type: "Poison",
	},
	copycatblast: {
		num: 686,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "Type varies based on the user's secondary type.",
		name: "Copycat Blast",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
		const types = pokemon.getTypes();
		let type = types[1] || types[0];
		if (type === "Bird") type = "Normal";
		move.type = type;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Beautiful",
	},
	rudeparting: {
		num: 521,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		shortDesc: "User switches out after damaging the target.",
		name: "Rude Parting",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
};

