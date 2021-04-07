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

export const Moves: {[moveid: string]: MoveData} = {
	groundingshock: {
		num: 827,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "10% chance to paralyze. Super effective on Ground."
		name: "Grounding Shock",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		ignoreImmunity: {'Electric': true},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Ground') return 1;
		},
		secondary: {
			chance: 10,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
		contestType: "Beautiful",
	},
	concealingmist: {
		num: 828,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Cure the user's party of all status conditions. User heals 1/4 max HP."
		name: "Concealing Mist",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, distance: 1},
		heal: [1, 4],
		onHit(pokemon, source, move) {
			this.add('-activate', source, 'move: Concealing Mist');
			let success = false;
			for (const ally of pokemon.side.pokemon) {
				if (ally !== source && ((ally.hasAbility('waterabsorb','stormdrain','dryskin')) ||
						(ally.volatiles['substitute'] && !move.infiltrates))) {
					continue;
				}
				if (ally.cureStatus()) success = true;
			}},
		target: "allyTeam",
		type: "Water",
		contestType: "Clever",
	},
	diamondbeam: {
		num: 829,
		accuracy: 100,
		basePower: 140,
		category: "Special",
		desc: "Hits two turns after being used."
		name: "Diamond Beam",
		pp: 5,
		priority: 0,
		flags: {},
		isFutureMove: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'diamondbeam',
				source: source,
				moveData: {
					id: 'diamondbeam',
					name: "Diamond Beam",
					accuracy: 100,
					basePower: 140,
					category: "Special",
					priority: 0,
					flags: {},
					effectType: 'Move',
					isFutureMove: true,
					type: 'Rock',
				},
			});
			this.add('-start', source, 'Diamond Beam');
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Beautiful",
	},
};
