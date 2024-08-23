export const Moves: {[k: string]: ModdedMoveData} = {
	wickedblow: {
		inherit: true,
		basePower: 120,
		desc: "Cannot be selected the turn after it's used.",
		shortDesc: "Cannot be selected the turn after it's used.",
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, cantusetwice: 1},
		willCrit: null,
	},
};
