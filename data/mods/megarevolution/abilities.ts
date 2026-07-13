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
	parentalbond: {
		inherit: true,
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.multihit || move.flags['noparentalbond'] || move.flags['charge'] ||
			move.flags['futuremove'] || move.spreadHit || move.isZ || move.isMax || ['seismictoss', 'nightshade', 'psywave', 'dragonrage'].includes(move.id)) return;
			move.multihit = 2;
			move.multihitType = 'parentalbond';
		},
	},
};
