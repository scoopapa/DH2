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
    murkrow: {
		inherit: true,
		abilities: {0: "Insomnia", 1: "Super Luck"},
	},
    honchkrow: {
		inherit: true,
		abilities: {0: "Insomnia", 1: "Super Luck"},
        baseStats: {hp: 100, atk: 125, def: 52, spa: 125, spd: 52, spe: 91},
		gen: 3,
	},
    abomasnow: {
		inherit: true,
		abilities: {0: "Snow Warning"},
        baseStats: {hp: 100, atk: 85, def: 80, spa: 100, spd: 110, spe: 75},
		gen: 3,
	},
    chesnaught: {
		inherit: true,
		abilities: {0: "Overgrow", 1: "Thick Fat"},
        baseStats: {hp: 88, atk: 102, def: 127, spa: 84, spd: 80, spe: 64},
		gen: 3,
	},
    volcanion: {
		inherit: true,
		abilities: {0: "Water Absorb"},
        baseStats: {hp: 80, atk: 100, def: 110, spa: 125, spd: 90, spe: 70},
		gen: 3,
	},
    dragapult: {
		inherit: true,
		abilities: {0: "Clear Body"},
        baseStats: {hp: 78, atk: 105, def: 75, spa: 105, spd: 75, spe: 122},
		gen: 3,
	},
    meowscarada: {
		inherit: true,
		abilities: {0: "Overgrow", 1: "Limber"},
        baseStats: {hp: 76, atk: 94, def: 75, spa: 117, spd: 75, spe: 123},
		gen: 3,
	},
};
