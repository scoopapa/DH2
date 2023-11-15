export const Moves: {[k: string]: ModdedMoveData} = {
  bullseye: {
		num: 9000,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Bullseye",
    shortDesc: "Raises crit ratio by 1. Is only called by Bullseye",
		pp: 30,
		priority: 0,
		flags: {snatch: 1},
		condition: {
			onModifyCritRatio(critRatio) {
				return critRatio + 1;
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
};
