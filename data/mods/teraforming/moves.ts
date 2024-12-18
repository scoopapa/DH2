export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
  teraused: {
		shortDesc: "Prevents Terastalization from being used multiple times.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Tera Used",
		pp: 5,
		priority: 0,
		flags: {},
		sideCondition: 'teraused',
		condition: {},
		secondary: null,
		target: "normal",
		type: "Rock",
	},
};
