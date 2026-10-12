export const Abilities: {[abilityid: string]: AbilityData} = {
	piercingdrill: {
		inherit: true,
		shortDesc: "This Pokemon's contact moves ignore the target's protection, except Max Guard.",
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
		shortDesc: "If this Pokemon is hit by an attack, the attacker becomes burned.",
	},
	dragonize: {
		inherit: true,
		shortDesc: "This Pokemon's Normal-type moves become Dragon type and have 1.2× power.",
	},
	megasol: {
		inherit: true,
		shortDesc: "This Pokemon's moves are used as if the effects of Sun were active.",
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
	},
};
