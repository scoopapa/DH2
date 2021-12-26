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
	fissure: {
		num: 90,
		accuracy: 90,
		basePower: 120,
		category: "Physical",
		shortDesc: "Raises user's Atk by 1 on turn 1. Hits turn 2.",
		name: "Fissure",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1},
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
		type: "Ground",
		zMove: {basePower: 180},
		maxMove: {basePower: 130},
	},
	horndrill: {
		num: 32,
		accuracy: 90,
		basePower: 90,
		category: "Physical",
		shortDesc: "Lowers target's Def if the move is resisted.",
		name: "Horn Drill",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onHit(target, source, move) {
			if (target.getMoveHitData(move).typeMod < 0) {
				this.boost({def: -1}, target);
			}
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		zMove: {basePower: 180},
		maxMove: {basePower: 130},
	},
	guillotine: {
		num: 12,
		accuracy: 90,
		basePower: 75,
		category: "Physical",
		shortDesc: "2x damage when the target has stat drops.",
		name: "Guillotine",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePowerPriority: 22,
		onBasePower(basePower, source, target, move) {
			let guillotine = null;
			let statDrop: BoostName;
			for (statDrop in target.boosts) {
				if (target.boosts[statDrop] < 0) guillotine = true;
			}
			if (guillotine) {
				this.debug('Guillotine boost');
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 180},
		maxMove: {basePower: 130},
	},
	sheercold: {
		num: 329,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		shortDesc: "1.5x power in Hail.",
		name: "Sheer Cold",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower, pokemon, target) {
			if (['hail'].includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(1.5);
			}
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		zMove: {basePower: 180},
		maxMove: {basePower: 130},
	},
	prismaticlaser: {
		num: 711,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		shortDesc: "Super effective against Dark-types. 20% chance to lower target's accuracy.",
		name: "Prismatic Laser",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		ignoreImmunity: {'Psychic': true},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Dark') return 1;
		},
		secondary: {
			chance: 20,
			boosts: {
				accuracy: -1,
			},
		},
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	roaroftime: {
		num: 459,
		accuracy: 100,
		basePower: 65,
		basePowerCallback: function (pokemon, target, move) {
			if (this.field.pseudoWeather.trickroom || this.field.pseudoWeather.wonderroom || this.field.pseudoWeather.gravity || this.field.pseudoWeather.magicroom) {
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Special",
		shortDesc: "2x power if a Room or Gravity is active.",
		name: "Roar of Time",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Beautiful",
	},
	spacialrend: {
		num: 460,
		accuracy: 95,
		basePower: 110,
		category: "Special",
		shortDesc: "Starts Gravity.",
		name: "Spacial Rend",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			pseudoWeather: 'gravity',
		},
		target: "normal",
		type: "Dragon",
		contestType: "Beautiful",
	},
	shadowforce: {
		num: 467,
		accuracy: 100,
		basePower: 85,
		basePowerCallback: function (pokemon, target, move) {
			if (target.volatiles['protect'] || target.volatiles['banefulbunker'] || target.volatiles['kingsshield'] || target.volatiles['spikyshield']) {
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		shortDesc: "Breaks Protect. 2x damage if used against Protect.",
		name: "Shadow Force",
		pp: 5,
		priority: 0,
		flags: {contact: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},
};