export const Abilities: {[abilityid: string]: AbilityData} = {
	piercingdrill: {
		onModifyMove(move) {
			if (move.flags['contact']) delete move.flags['protect'];
		},
		flags: {},
		name: "Piercing Drill",
		shortDesc: "This Pokemon's contact moves ignore the target's protection, except Max Guard.",
		rating: 2,
		num: 311,
	},
};
