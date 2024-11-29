export const Moves: {[k: string]: ModdedMoveData} = {
	//Template
	/*movename: {
		num: 0,
		accuracy: 100,
		basePower: 30,
		category: "Physical""Special""Status",
		name: "MoveName",
		desc: "Full move description.",
		shortDesc: "Move effects.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		[multihit: 3,]
		secondary: null,
		target: "normal",
		type: "Normal",
	},*/

	//New signature moves by National Dex order
	//Venusaur
	greatflower: {
		num: 0,
		accuracy: true,
		basePower: 100,
		category: "Special",
		name: "Great Flower",
		desc: "The user gathers energy from its flower to attack with immense power. This move never misses.",
		shortDesc: "Hits adjacent foes, Bypasses accuracy check.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Grass",
	},
	//Charizard
	greatflame: {
		num: 0,
		accuracy: true,
		basePower: 100,
		category: "Special",
		name: "Great Flame",
		desc: "The user focuses its power over fire and releases a huge blazing breath. This move never misses.",
		shortDesc: "Hits adjacent foes, Bypasses accuracy check.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fire",
	},
	//Blastoise
	greatflood: {
		num: 0,
		accuracy: true,
		basePower: 100,
		category: "Special",
		name: "Great Flood",
		desc: "The user launches gallions of water at its foes using its cannons. This move never misses.",
		shortDesc: "Hits adjacent foes, Bypasses accuracy check.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Water",
	},
	//Dugtrio
	//Dugtrio-Alola
	tripledig: {
		num: 0,
		accuracy: 95,
		basePower: 30,
		category: "Physical",
		name: "Triple Dig",
		desc: "The user performs a well timed triple attack, hitting the target from below three times in a row.",
		shortDesc: "Hits 3 times.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		multihit: 3,
		secondary: null,
		target: "normal",
		type: "Ground",
	},
	//Tentacruel - TOFIX
	//Toedscruel
	tentaclelock: {
		num: 0,
		accuracy: 90,
		basePower: 0,
		category: "Status",
		name: "Tentacle Lock",
		desc: "The user extends its tentacles to catch its target and prevent them from fleeing. This move raises the user's Sp. Attack and lowers the target's Sp. Defense every turn.",
		shortDesc: "Traps foe. SpD -1 on foe and SpA +1 on user each turn",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onTryImmunity(target) {
			return this.dex.getImmunity('trapped', target);
		},
		volatileStatus: 'tentaclelock',
		condition: {
			onStart(pokemon, source) {
				this.add('-start', pokemon, 'move: TentacleLock', '[of] ' + source);
			},
			onResidualOrder: 14,
			onResidual(pokemon) {
				const source = this.effectState.source;
				const target = this.getAtSlot(pokemon.volatiles['tentaclelock'].sourceSlot);
				if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns)) {
					delete pokemon.volatiles['tentaclelock'];
					this.add('-end', pokemon, 'Tentacle Lock', '[partiallytrapped]', '[silent]');
					return;
				}
				const debuff = this.boost({spd: -1}, pokemon, source, this.dex.getActiveMove('tentaclelock'));
				if (debuff) {
					this.boost({spa: +1}, pokemon, target, this.dex.getActiveMove('tentaclelock')); //TODO: Should boost the user
				}
			},
			onTrapPokemon(pokemon) {
				if (this.effectState.source && this.effectState.source.isActive) pokemon.tryTrap();
			},
		},
		secondary: null,
		target: "normal",
		type: "normal",
	},
};
