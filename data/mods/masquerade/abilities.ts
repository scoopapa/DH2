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
		flags: {breakable: 1},
		name: "Hot-Headed",
		rating: 4,
	},
	calmdemeanor: {
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Ice') mod *= 2;
			if (move.category === 'Special') mod /= 2;
			return this.chainModify(mod);
		},
		shortDesc: "This Pokemon takes 1/2 damage from special moves, 2x damage from Ice moves.",
		flags: {breakable: 1},
		name: "Calm Demeanor",
		rating: 4,
	},
	systemoverride: {
		onPrepareHit(source, target, move) {
			if (this.effectState.systemOverride) return;
			if (move.id === 'conversion') {
				this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, source, source);
				this.effectState.systemOverride = true;
			}
		},
		shortDesc: "Before using Conversion, boosts all stats by 1 stage.",
		name: "System Override",
		rating: 2,
	},
	snowcap: {
		onModifyDefPriority: 1,
		onModifyDef(def, pokemon) {
			if (pokemon.hasType('Ice') && !this.field.isWeather(['hail', 'snow'])) {
				return this.chainModify(1.5);
			}
		},
		// other effects coded into moves
		shortDesc: "This Pokemon acts as if Snow is active.",
		name: "Snowcap",
		rating: 3,
	},
};
