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
		flags: {},
		onModifyMove(move, pokemon) {
			if (pokemon.hasItem('burndrive')) {
				move.basePower *= 1.5;
				move.type = 'Fire';
			} else if (pokemon.hasItem('chilldrive')) {
				move.basePower *= 1.5;
				move.type = 'Ice';
			} else if (pokemon.hasItem('dousedrive')) {
				move.basePower *= 1.5;
				move.type = 'Water';
			} else if (pokemon.hasItem('shockdrive')) {
				move.basePower *= 1.5;
				move.type = 'Electric';
			}
		},
		secondary: {
			chance: 30,
			onHit(target, pokemon, move) {
				if (pokemon.hasItem('burndrive')) {
					this.boost({atk: -1}, target);
				}
				else if (pokemon.hasItem('chilldrive')) {
					this.boost({spa: -1}, target);
				}
				else if (pokemon.hasItem('dousedrive')) {
					this.boost({spd: -1}, target);
				}
				else if (pokemon.hasItem('shockdrive')) {
					this.boost({spe: -1}, target);
				}
			}
		},
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	freezeshock: {
		num: 553,
		accuracy: 90,
		basePower: 85,
		category: "Physical",
		name: "Freeze Shock",
		shortDesc: "30% chance to paralyze the target.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	iceburn: {
		num: 554,
		accuracy: 90,
		basePower: 85,
		category: "Special",
		name: "Ice Burn",
		shortDesc: "30% chance to burn the target.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	wickedblow: {
		num: 817,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Wicked Blow",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, punch: 1, mirror: 1},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	aeroblast: {
		num: 177,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Aeroblast",
		shortDesc: "Lowers the user's Defense and Sp. Def by 1.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1},
		self: {
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		target: "any",
		type: "Flying",
		contestType: "Cool",
	},
	psystrike: {
		num: 540,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Psystrike",
		shortDesc: "Ignores Dark-type immunity under Psychic Terrain.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, source) {
			if (this.field.isTerrain('psychicterrain') && source.isGrounded()) {
				move.ignoreImmunity = {'Psychic': true};
			}
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	fusionbolt: {
		num: 559,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		shortDesc: "If a Pokémon in the user's party has Fusion Flare; 1.3x power & 20% chance to burn.",
		name: "Fusion Bolt",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower, pokemon, move) {
			for (const ally of pokemon.side.pokemon) {
				if (!ally || ally.fainted) continue;
				for (const moveSlot of ally.moveSlots) {
					const move = this.dex.getMove(moveSlot.move);
					if (move.id === 'fusionflare') continue;
					this.debug('double power');
					return this.chainModify(1.3);
				}
			}
		},
		secondary: {
			chance: 20,
			onHit(target, pokemon, move) {
				for (const ally of pokemon.side.pokemon) {
					if (!ally || ally.fainted) continue;
					for (const moveSlot of ally.moveSlots) {
						const move = this.dex.getMove(moveSlot.move);
						if (move.id === 'fusionflare') continue;
						target.trySetStatus('brn');
					}
				}
			},
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	fusionflare: {
		num: 558,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		shortDesc: "If a Pokémon in the user's party has Fusion Bolt; 1.3x power & 20% chance to paralyze.",
		name: "Fusion Flare",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
		onBasePower(basePower, pokemon, move) {
			for (const ally of pokemon.side.pokemon) {
				if (!ally || ally.fainted) continue;
				for (const moveSlot of ally.moveSlots) {
					const move = this.dex.getMove(moveSlot.move);
					if (move.id === 'fusionbolt') continue;
					this.debug('double power');
					return this.chainModify(1.3);
				}
			}
		},
		secondary: {
			chance: 20,
			onHit(target, pokemon, move) {
				for (const ally of pokemon.side.pokemon) {
					if (!ally || ally.fainted) continue;
					for (const moveSlot of ally.moveSlots) {
						const move = this.dex.getMove(moveSlot.move);
						if (move.id === 'fusionbolt') continue;
						target.trySetStatus('par');
					}
				}
			},
		},
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
};