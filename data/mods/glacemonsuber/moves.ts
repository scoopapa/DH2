export const Moves: { [moveid: string]: ModdedMoveData; } = {
	aeroblast: {
		inherit: true,
		willCrit: true,
		desc: "This move is always a critical hit unless the target is under the effect of Lucky Chant or has the Battle Armor or Shell Armor Abilities.",
		shortDesc: "Always results in a critical hit.",
	},
};
