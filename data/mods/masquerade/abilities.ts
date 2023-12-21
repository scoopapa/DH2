export const Abilities: {[k: string]: ModdedAbilityData} = {
	residuecleaning: {
    // effect hardcoded into defog (just defog for now)
		shortDesc: "Clearing hazards heals 25% max HP per hazard.",
		name: "Residue Cleaning",
	},
	mountaineer: {
		inherit: true,
		isNonstandard: null,
	},
	hotheaded: {
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Fire') mod *= 2;
			if (move.category === 'Physical') mod /= 2;
			return this.chainModify(mod);
		},
		shortDesc: "This Pokemon takes 1/2 damage from physical moves, 2x damage from Fire moves.",
		isBreakable: true,
		name: "Hot-Headed",
		rating: 4,
		num: 246,
	},
	calmdemeanor: {
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Ice') mod *= 2;
			if (move.category === 'Special') mod /= 2;
			return this.chainModify(mod);
		},
		shortDesc: "This Pokemon takes 1/2 damage from special moves, 2x damage from Ice moves.",
		isBreakable: true,
		name: "Calm Demeanor",
		rating: 4,
		num: 246,
	},
};
