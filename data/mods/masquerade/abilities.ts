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
};
