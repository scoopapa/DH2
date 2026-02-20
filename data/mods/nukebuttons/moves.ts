export const Moves: {[moveid: string]: ModdedMoveData} = {
	/*
	placeholder: {
		name: "",
		type: "",
		category: "",
		basePower: 0,
		accuracy: 100,
		pp: 10,
		shortDesc: "",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	*/
/*	grassyterrain: {
		num: 999,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Grassy Terrain",
		shortDesc: "Grass: +50% power, Ice: -50% power. Grounded Pokémon heal 1/12 max HP, 1/6 if Grass.",
		pp: 1,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		terrain: 'grassyterrain',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				const weakenedMoves = ['aurorabeam', 'avalanche', 'blizzard', 'freezeshock', 'freezedry',
'frostbreath', 'glaciallance', 'glaciate', 'iceball', 'icebeam', 'iceburn', 'icefang', 'icehammer',
'icepunch', 'iceshard', 'icespinner', 'iciclecrash', 'iciclespear', 'icywind', 'mountaingale',
'powdersnow', 'subzeroslammer', 'tripleaxel'];
				if (weakenedMoves.includes(move.id) && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('move weakened by grassy terrain');
					return this.chainModify(0.5);
				}
				if (move.type === 'Grass' && attacker.isGrounded()) {
					this.debug('grassy terrain boost');
					return this.chainModify([5325, 4096]);
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Grassy Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Grassy Terrain');
				}
			},
			onResidualOrder: 5,
			onResidualSubOrder: 2,
			onResidual(pokemon) {
				if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
					this.heal(pokemon.baseMaxhp / 12, pokemon, pokemon);
				} else {
					this.debug(`Pokemon semi-invuln or not grounded; Grassy Terrain skipped`);
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Grassy Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Grass",
		zMove: {boost: {def: 1}},
		contestType: "Beautiful",
	},
*/
	megakick: {
		name: "Mega Kick",
		type: "Normal",
		category: "Physical",
		basePower: 95,
		accuracy: 95,
		pp: 20,
		shortDesc: "10% chance to flinch the target. 20% paralysis.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondaries: [
			{
				chance: 20,
				status: 'par',
			}, {
				chance: 10,
				volatileStatus: 'flinch',
			},
		],
		target: "normal",
	},
	attack: {
		name: "Attack",
		type: "Normal",
		category: "Physical",
		basePower: 80,
		accuracy: 100,
		pp: 30,
		shortDesc: "A default attack. Special if the user's SpA is higher than its Atk.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	expandingforce: {
		num: 879,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		name: "Expanding Force",
		pp: 10,
		priority: 0,
		shortDesc: "Does 1.3333x damage on supereffective hits.",
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePower(basePower, source, target, move) {
			if (target.runEffectiveness(move) > 0) {
				// Placeholder
				this.debug(`expanding force super effective buff`);
				return this.chainModify([5461, 4096]);
			}
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	chloroblast: {
		name: "Chloroblast",
		type: "Grass",
		category: "Special",
		basePower: 110,
		accuracy: 100,
		pp: 10,
		shortDesc: "No additional effect.",
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},


	// Nuke Buttons
	technoblast: {
		name: "Techno Blast",
		type: "Bug",
		category: "Special",
		basePower: 350,
		accuracy: true,
		pp: 1,
		noPPBoosts: true,
		shortDesc: "Genesect's nuke button.",
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	genesissupernova: {
		name: "Genesis Supernova",
		type: "Dark",
		category: "Physical",
		basePower: 350,
		accuracy: true,
		pp: 1,
		noPPBoosts: true,
		shortDesc: "Mew's nuke button.",
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	doomdesire: {
		name: "Doom Desire",
		type: "Dragon",
		category: "Physical",
		basePower: 350,
		accuracy: true,
		pp: 1,
		noPPBoosts: true,
		shortDesc: "Jirachi's nuke button.",
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	plasmafists: {
		name: "Plasma Fists",
		type: "Electric",
		category: "Special",
		basePower: 350,
		accuracy: true,
		pp: 1,
		noPPBoosts: true,
		shortDesc: "Zeraora's nuke button.",
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	spacialrend: {
		name: "Spacial Rend",
		type: "Fairy",
		category: "Special",
		basePower: 350,
		accuracy: true,
		pp: 1,
		noPPBoosts: true,
		shortDesc: "Celebi's nuke button.",
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	spectraldistortion: {
		name: "Spectral Distortion",
		type: "Fighting",
		category: "Physical",
		basePower: 350,
		accuracy: true,
		pp: 1,
		noPPBoosts: true,
		shortDesc: "Marshadow's nuke button.",
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	vcreate: {
		name: "V-Create",
		type: "Fire",
		category: "Physical",
		basePower: 350,
		accuracy: true,
		pp: 1,
		noPPBoosts: true,
		shortDesc: "Victini's nuke button.",
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	ancientsymphony: {
		name: "Ancient Symphony",
		type: "Flying",
		category: "Special",
		basePower: 350,
		accuracy: true,
		pp: 1,
		noPPBoosts: true,
		shortDesc: "Meloetta's nuke button.",
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	hyperspacehole: {
		name: "Hyperspace Hole",
		type: "Ghost",
		category: "Special",
		basePower: 350,
		accuracy: true,
		pp: 1,
		noPPBoosts: true,
		shortDesc: "Hoopa's nuke button.",
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	seedflare: {
		name: "Seed Flare",
		type: "Grass",
		category: "Special",
		basePower: 350,
		accuracy: true,
		pp: 1,
		noPPBoosts: true,
		shortDesc: "Shaymin's nuke button.",
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	fleurcannon: {
		name: "Fleur Cannon",
		type: "Ground",
		category: "Special",
		basePower: 350,
		accuracy: true,
		pp: 1,
		noPPBoosts: true,
		shortDesc: "Magearna's nuke button.",
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	shatteringiceshards: {
		name: "Shattering Iceshards",
		type: "Ice",
		category: "Special",
		basePower: 350,
		accuracy: true,
		pp: 1,
		noPPBoosts: true,
		shortDesc: "Volcanion's nuke button.",
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	raticatekick: {
		name: "Raticate Kick",
		type: "Yes",
		category: "Physical",
		basePower: 500,
		accuracy: true,
		pp: 1,
		noPPBoosts: true,
		shortDesc: "raticate move",
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		target: "normal",
	},
	mochitornado: {
		name: "Mochi Tornado",
		type: "Poison",
		category: "Special",
		basePower: 350,
		accuracy: true,
		pp: 1,
		noPPBoosts: true,
		shortDesc: "Pecharunt's nuke button.",
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	psychoboost: {
		name: "Psycho Boost",
		type: "Psychic",
		category: "Special",
		basePower: 350,
		accuracy: true,
		pp: 1,
		noPPBoosts: true,
		shortDesc: "Deoxys's nuke button.",
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	diamondstorm: {
		name: "Diamond Storm",
		type: "Rock",
		category: "Physical",
		basePower: 350,
		accuracy: true,
		pp: 1,
		noPPBoosts: true,
		shortDesc: "Diancie's nuke button.",
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	ironbeatdown: {
		name: "Iron Beatdown",
		type: "Steel",
		category: "Physical",
		basePower: 350,
		accuracy: true,
		pp: 1,
		noPPBoosts: true,
		shortDesc: "Melmetal's nuke button.",
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	seaswrath: {
		name: "Sea\'s Wrath",
		type: "Water",
		category: "Special",
		basePower: 350,
		accuracy: true,
		pp: 1,
		noPPBoosts: true,
		shortDesc: "Manaphy's nuke button.",
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
};