export const Moves: { [moveid: string]: ModdedMoveData } = {
	ancientpower: {
		inherit: true,
		category: "Physical",
		secondary: null,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1,}, pokemon, pokemon, move);
		},
		shortDesc: "If this move causes the opponent to faint, raises the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage.",
	},
	sandsearstorm: {
		//Now always hits in Sand instead of Rain
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (target && ['sandstorm'].includes(target.effectiveWeather())) {
				move.accuracy = true;
			}
	},
	mountainmaw: {
		//Copied from Psychic Fangs, just changed to be Rock type
		num: -101,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Mountain Maw",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1},
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			pokemon.side.removeSideCondition('reflect');
			pokemon.side.removeSideCondition('lightscreen');
			pokemon.side.removeSideCondition('auroraveil');
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Clever",
	},
	steelwing: {
		//Buffed secondary chance to 50%
		inherit: true,
		secondary: {
			chance: 50,
			self: {
				boosts: {
					def: 1,
				},
			},
		},
	},
	Scavenge: {
		//Meant to recover any used/lost item from the user as a secondary effect but I'm not good enough to code that
		num: -102,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Scavenge",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
};
