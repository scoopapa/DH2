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
    overqwil: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Swift Swim"},
        baseStats: {hp: 85, atk: 105, def: 95, spa: 95, spd: 85, spe: 85},
		gen: 3,
	},
    lanturn: {
        inherit: true,
        abilities: {0: "Volt Absorb", 1: "Marine Power"},
        baseStats: {hp: 125, atk: 70, def: 70, spa: 90, spd: 90, spe: 80},
    },
    toxicroak: {
		inherit: true,
		abilities: {0: "Dry Skin"},
        baseStats: {hp: 83, atk: 106, def: 65, spa: 86, spd: 65, spe: 85},
		gen: 3,
	},
    shiinotic: {
		inherit: true,
		abilities: {0: "Rain Dish", 1: "Effect Spore"},
        baseStats: {hp: 70, atk: 65, def: 80, spa: 90, spd: 130, spe: 30},
        types: ["Grass", "Ghost"],
		gen: 3,
	},
    ampharos: {
        inherit: true,
        abilities: {0: "Static", 1: "Hydration"},
        baseStats: {hp: 110, atk: 95, def: 85, spa: 115, spd: 90, spe: 55},
    },
    swanna: {
		inherit: true,
		abilities: {0: "Hydration", 1: "Water Veil"},
        baseStats: {hp: 76, atk: 90, def: 73, spa: 107, spd: 73, spe: 112},
		gen: 3,
	},
};
