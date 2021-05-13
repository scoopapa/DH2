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
	technoblast: {
		num: 546,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Techno Blast",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryHit(target, pokemon) {
			let move = 'technoblast';
			if (this.pokemon.hasItem('burndrive')) {
				move = 'technoblastburn';
			} else if (this.pokemon.hasItem('chilldrive')) {
				move = 'technoblastchill';
			} else if (this.pokemon.hasItem('dousedrive')) {
				move = 'technoblastdouse';
			} else if (this.pokemon.hasItem('shockdrive')) {
				move = 'technoblastshock';
			}
			this.useMove(move, pokemon, target);
			return null;
		},
		onModifyType(move, pokemon) {
			if (pokemon.ignoringItem()) return;
			move.type = this.runEvent('Drive', pokemon, null, move, 'Normal');
		},
		onBasePower(basePower, pokemon, item) {
			if (pokemon.ignoringItem()) return;
			move.type = this.runEvent('Drive', pokemon, null, move, 'Normal');
				return this.chainModify(1.5);
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	technoblastburn: {
		num: 546,
		accuracy: 100,
		basePower: 150,
		category: "Special",
		name: "Techno Blast",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		boosts: {
			atk: -1,
		},
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	technoblastchill: {
		num: 546,
		accuracy: 100,
		basePower: 150,
		category: "Special",
		name: "Techno Blast",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		boosts: {
			spa: -1,
		},
		secondary: null,
		target: "normal",
		type: "Ice",
	},
	technoblastdouse: {
		num: 546,
		accuracy: 100,
		basePower: 150,
		category: "Special",
		name: "Techno Blast",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		boosts: {
			spd: -1,
		},
		secondary: null,
		target: "normal",
		type: "Water",
	},
	technoblastshock: {
		num: 546,
		accuracy: 100,
		basePower: 150,
		category: "Special",
		name: "Techno Blast",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		boosts: {
			spe: -1,
		},
		secondary: null,
		target: "normal",
		type: "Electric",
	},
};