export const Abilities: {[abilityid: string]: AbilityData} = {
	piercingdrill: {
		inherit: true,
		shortDesc: "This Pokemon's contact moves ignore the target's protection, except Max Guard.",
		isNonstandard: null,
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
	spicyspray: {
		inherit: true,
		isNonstandard: null,
	},
	firemane: {
		inherit: true,
		isNonstandard: null,
	},
	eelevate: {
		inherit: true,
		isNonstandard: null,
	},
	dragonize: {
		inherit: true,
		isNonstandard: null,
	},
	megasol: {
		inherit: true,
		isNonstandard: null,
	},
	auraguard: {
		onSourceModifyDamage(damage, source, target, move) {
			if (move.flags['contact']) return this.chainModify(0.5);
		},
		flags: {breakable: 1},
		name: "Aura Guard",
		rating: 3.5,
		num: 319,
		shortDesc: "This Pokemon receives 1/2 damage from contact moves.",
		isNonstandard: null,
	},
};
