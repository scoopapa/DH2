export const Moves: {[k: string]: ModdedMoveData} = {
	remove: {
		num: 2101,
		accuracy: 100,
		basePower: 30,
		category: "Special",
		name: "Remove",
		shortDesc: "Removes hazards/trapping/Leech Seed. Physical if Atk > Sp. Atk.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'hazards'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'hazards'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Stellar",
	},	

	eject: {
		num: 2102,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Eject",
		shortDesc: "Force target to switch to random ally. -6 Priority. Physical if Atk > Sp. Atk. ",
		pp: 10,
		priority: -6,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		forceSwitch: true,
		target: "normal",
		type: "Stellar",
	},
	
	pivot: {
		num: 2103,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Pivot",
		shortDesc: "User switches out.",
		pp: 20,
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "U-turn", target);
		},
		selfSwitch: true,
		secondary: null,
		target: "all",
		type: "Stellar",
	},
	
	hazards: {
		num: 2104,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Hazards",
		shortDesc: "Hurts foes on switch-in. Max 2 layers.",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, metronome: 1},
		sideCondition: 'hazards',
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Spikes", target);
		},
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'Hazards');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 2) return false;
				this.add('-sidestart', side, 'Hazards');
				this.effectState.layers++;
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots')) return;
				const damageAmounts = [0, 3, 6]; // 1/8, 1/4
				this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / 24);
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Stellar",
	},
	
	fairydance: {
		num: 2105,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fairy Dance",
		shortDesc: "Raises the user's Sp. Atk and Speed by 1.",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, dance: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Quiver Dance", pokemon);
		},
		boosts: {
			spa: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Fairy",
	},
	
	dot: {
		num: 2106,
		accuracy: 95,
		basePower: 35,
		category: "Special",
		name: "DoT",
		shortDesc: "Deals 1/8 max HP each turn. Physical if Atk > Sp. Atk.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		condition: {
			noCopy: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'DoT');
			},
			onResidualOrder: 13,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 8);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'DoT');
			},
		},
		secondary: {
			chance: 100,
			volatileStatus: 'dot',
		},
		target: "normal",
		type: "Stellar",
	},
	
	pristrike: {
		num: 2107,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Pri Strike",
		shortDesc: "Based on user's primary type.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyType(move, pokemon) {
			const types = pokemon.getTypes();
			let type = types[0];
			if (type === 'Bird') type = '???';
			if (type === '???' && types[1]) type = types[1];
			move.type = type;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
	pribeam: {
		num: 2108,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Pri Beam",
		shortDesc: "Based on user's primary type.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyType(move, pokemon) {
			const types = pokemon.getTypes();
			let type = types[0];
			if (type === 'Bird') type = '???';
			if (type === '???' && types[1]) type = types[1];
			move.type = type;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Clever",
	},
	secstrike: {
		num: 2109,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Sec Strike",
		shortDesc: "Based on user's secondary type.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyType(move, pokemon) {
			const types = pokemon.getTypes();
			let type = types[1];
			if (type === 'Bird') type = '???';
			if (type === '???' && types[0]) type = types[0];
			move.type = type;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
	secbeam: {
		num: 2110,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Sec Beam",
		shortDesc: "Based on user's secondary type.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyType(move, pokemon) {
			const types = pokemon.getTypes();
			let type = types[1];
			if (type === 'Bird') type = '???';
			if (type === '???' && types[0]) type = types[0];
			move.type = type;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Clever",
	},
	drain: {
		num: 2111,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Drain",
		shortDesc: "Heals 1/2 of damage dealt. Uses first type and higher attacking stat.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal:1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		onModifyType(move, pokemon) {
			const types = pokemon.getTypes();
			let type = types[0];
			if (type === 'Bird') type = '???';
			if (type === '???' && types[1]) type = types[1];
			move.type = type;
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Beautiful",
	},
	triplehit: {
		num: 2112,
		accuracy: 90,
		basePower: 30,
		category: "Physical",
		name: "Triple Hit",
		shortDesc: "Hits thrice. Uses second type and higher attack stat.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		multihit: 3,
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		onModifyType(move, pokemon) {
			const types = pokemon.getTypes();
			let type = types[1];
			if (type === 'Bird') type = '???';
			if (type === '???' && types[0]) type = types[0];
			move.type = type;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	
	coveragenormal: {
		num: 2113,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Coverage (Normal)",
		shortDesc: "Uses higher attacking stat.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	coveragefire: {
		num: 2113,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Coverage (Fire)",
		shortDesc: "Uses higher attacking stat.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	coveragewater: {
		num: 2115,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Coverage (Water)",
		shortDesc: "Uses higher attacking stat.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Water",
	},
	coveragegrass: {
		num: 2116,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Coverage (Grass)",
		shortDesc: "Uses higher attacking stat.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Grass",
	},
	coverageelectric: {
		num: 2117,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Coverage (Electric)",
		shortDesc: "Uses higher attacking stat.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Electric",
	},
	coverageice: {
		num: 2118,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Coverage (Ice)",
		shortDesc: "Uses higher attacking stat.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Ice",
	},
	coveragefighting: {
		num: 2119,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Coverage (Fighting)",
		shortDesc: "Uses higher attacking stat.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
	coveragepoison: {
		num: 2120,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Coverage (Poison)",
		shortDesc: "Uses higher attacking stat.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Poison",
	},
	coverageground: {
		num: 2121,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Coverage (Ground)",
		shortDesc: "Uses higher attacking stat.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Ground",
	},
	coverageflying: {
		num: 2122,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Coverage (Flying)",
		shortDesc: "Uses higher attacking stat.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Flying",
	},
	coveragepsychic: {
		num: 2123,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Coverage (Psychic)",
		shortDesc: "Uses higher attacking stat.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	coveragebug: {
		num: 2124,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Coverage (Bug)",
		shortDesc: "Uses higher attacking stat.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Bug",
	},
	coveragerock: {
		num: 2125,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Coverage (Rock)",
		shortDesc: "Uses higher attacking stat.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Rock",
	},
	coverageghost: {
		num: 2126,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Coverage (Ghost)",
		shortDesc: "Uses higher attacking stat.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	coveragedragon: {
		num: 2127,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Coverage (Dragon)",
		shortDesc: "Uses higher attacking stat.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
	},
	coveragedark: {
		num: 2128,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Coverage (Dark)",
		shortDesc: "Uses higher attacking stat.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	coveragesteel: {
		num: 2129,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Coverage (Steel)",
		shortDesc: "Uses higher attacking stat.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	coveragefairy: {
		num: 2130,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Coverage (Fairy)",
		shortDesc: "Uses higher attacking stat.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
	},
	
	priority: {
		num: 2131,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Priority",
		shortDesc: "Goes first. Uses first type and higher attack stat. High crit ratio.",
		pp: 30,
		priority: 1,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyType(move, pokemon) {
			const types = pokemon.getTypes();
			let type = types[0];
			if (type === 'Bird') type = '???';
			if (type === '???' && types[1]) type = types[1];
			move.type = type;
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	
	recover: {
		num: 105,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Recover",
		pp: 6.25,
		priority: 0,
		flags: {snatch: 1, heal: 1, metronome: 1},
		heal: [1, 2],
		/*
		onHit(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				this.heal(this.modify(pokemon.maxhp, 0.5))
			} else {
				this.heal(this.modify(pokemon.maxhp, 0.25))
			}			
		},
		*/
		secondary: null,
		target: "self",
		type: "Normal",
		contestType: "Clever",
	},
	
	sinker: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Sinker",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		basePowerCallback(pokemon, target, move) {
			if (!target.hasType(pokemon.getTypes())) {
				this.debug('Sinker NOT boosted');
				return move.basePower;
			}
			this.debug('Sinker damage boost');
			return move.basePower * 3;
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) < pokemon.getStat('spa', false, true)) move.category = 'Special';
		},
		target: "normal",
		type: "Stellar",
		shortDesc: "Deals triple damage if foe shares a type with user. Special if SpAtk > Atk.",
	},
};
