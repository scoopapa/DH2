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
	behemothbash: {
		num: 782,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Behemoth Bash",
		shortDesc: "Lowers attack harshly on contact with the user before it moves.",
		pp: 5,
		priority: -3,
		flags: {contact: 1, protect: 1, mirror: 1},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('behemothbash');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Behemoth Bash');
			},
			onDamagingHit(damage, target, source, move) {
				if (move.flags['contact']) {
					this.boost({atk: -2}, source, target, null, true);
					this.add('-activate', target, 'move: Behemoth Bash');
				}
			},
		},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('behemothbash');
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	behemothblade: {
		num: 781,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Behemoth Blade",
		shortDesc: "High critical hit ratio.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	eeriespell: {
		num: 826,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Eerie Spell",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		secondary: {
			chance: 100,
			onHit(target) {
				if (!target.hp) return;
				const move = target.lastMove;
				if (!move || move.isZ || move.isMax) return;

				const ppDeducted = target.deductPP(move.id, 3);
				if (!ppDeducted) return;

				this.add('-activate', target, 'move: Eerie Spell', move.name, ppDeducted);
			},
		},
		target: "normal",
		type: "Dark",
	},
	floatyfall: {
		num: 731,
		accuracy: 95,
		basePower: 90,
		category: "Physical",
		isNonstandard: null,
		name: "Floaty Fall",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, gravity: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Flying",
	},
	multiattack: {
		num: 718,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Multi-Attack",
		shortDesc: "Type varies based on the user's type.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	pikapapow: {
		num: 732,
		accuracy: true,
		basePower: 0,
		basePowerCallback(pokemon) {
			return Math.floor((pokemon.happiness * 10) / 25) || 1;
		},
		category: "Special",
		isNonstandard: null,
		name: "Pika Papow",
		pp: 20,
		priority: 0,
		flags: {protect: 1},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cute",
	},
	shellsidearm: {
		num: 801,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Shell Side Arm",
		shortDesc: "Targets opponent's lowest defensive stat.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, source, target) {
			if (target.getStat('def', false, true) >= target.getStat('spd', false, true)) move.defensiveCategory = 'Special';
		},
		secondary: {
			chance: 20,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
	},
	splishysplash: {
		num: 730,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		isNonstandard: null,
		name: "Splishy Splash",
		pp: 15,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "allAdjacentFoes",
		type: "Water",
	},
	zippyzap: {
		num: 729,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		isNonstandard: null,
		name: "Zippy Zap",
		shortDesc: "Nearly always goes first. Always crits.",
		pp: 15,
		priority: 2,
		flags: {contact: 1, protect: 1},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Electric",
	},
	bodypress: {
		num: 776,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Body Press",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		useSourceDefensiveAsOffensive: true,
		onBasePower(basePower, source) {
			if (source.item === 'lightball' && source.species.id === 'pikachulibre'){
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
	technoblast: {
		num: 546,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Techno Blast",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			if (pokemon.ignoringItem()) return;
			move.type = this.runEvent('Drive', pokemon, null, move, 'Normal');
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	technoblastbase: {
		num: 546,
		accuracy: 90,
		basePower: 90,
		category: "Special",
		shortDesc: "Physical if user's Atk > Sp. Atk. Matches user's secondary type.",
		name: "Techno Blast (Base)",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		onModifyType(move, pokemon) {
			let type = pokemon.types[1];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	technoblastfreezer: {
		num: 546,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		name: "Techno Blast (Freezer)",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Cool",
	},
	technoblastdelta: {
		num: 546,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "Physical if user's Atk > Sp. Atk. Inflicts Embargo and Heal Block onto the opponent.",
		name: "Techno Blast (Delta)",
		volatileStatus: 'embargo',
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: {
			chance: 100,
			volatileStatus: 'healblock',
		},
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
};
