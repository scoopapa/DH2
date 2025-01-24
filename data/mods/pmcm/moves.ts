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
};
