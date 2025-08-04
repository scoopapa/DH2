export const Pokedex: { [k: string]: ModdedSpeciesData } = {
    golem: {
        inherit: true,
        abilities: {0: "Rock Head", 1: "Immunity"},
        baseStats: {hp: 95, atk: 110, def: 130, spa: 55, spd: 80, spe: 45},
    },
    aerodactyl: {
        inherit: true,
        abilities: {0: "Rock Head", 1: "Natural Cure"},
        baseStats: {hp: 85, atk: 105, def: 85, spa: 80, spd: 85, spe: 130},
    },
    solrock: {
        inherit: true,
        abilities: {0: "Levitate", 1: "Flash Fire"},
        baseStats: {hp: 80, atk: 120, def: 95, spa: 70, spd: 65, spe: 80},
        types: ["Rock", "Ghost"],
    },
    lunatone: {
        inherit: true,
        abilities: {0: "Levitate", 1: "Ice Body"},
        baseStats: {hp: 90, atk: 50, def: 80, spa: 115, spd: 95, spe: 80},
        types: ["Rock", "Ice"],
    },
    armaldo: {
        inherit: true,
        abilities: {0: "Battle Armor", 1: "Shed Skin"},
        baseStats: {hp: 75, atk: 125, def: 100, spa: 70, spd: 95, spe: 45},
    },
    /*budew: {
		inherit: true,
		abilities: {0: "Natural Cure", 1: "Chlorophyll"},
		gen: 3,
	},*/
};
