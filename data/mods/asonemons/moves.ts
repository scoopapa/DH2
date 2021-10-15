export const Moves: {[k: string]: ModdedMoveData} = {
	coalsting: {
		num: 827,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Coal Sting",
		shortDesc: "30% chance to burn the target. Thaws target.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
		thawsTarget: true,
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Tough",
	},
    inkgulp: {
		num: 828,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Ink Gulp",
		shortDesc: "User recovers 50% of the damage dealt. Raises user's Defense by 3 if this KOes the target.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.boost({def: 3}, pokemon, pokemon, move);
		},
      drain: [3, 4],
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
};
