export const Pokedex: { [k: string]: ModdedSpeciesData } = {
	// slate 1
	mewtwo: {
		inherit: true,
		abilities: {0: "Pressure", H: "Armor Tail"},
	},
	mewtwomegax: {
		inherit: true,
		abilities: {0: "Karate", H: "Armor Tail"},
	},
	mewtwomegay: {
		inherit: true,
		abilities: {0: "Moody", H: "Armor Tail"},
	},
	kyuremblack: {
		inherit: true,
		abilities: {0: "Teravolt", 1: "Moody", H: "Ice Body"},
	},
	kyuremwhite: {
		inherit: true,
		abilities: {0: "Turboblaze", 1: "Moody", H: "Ice Body"},
	},
	ursaluna: {
		inherit: true,
		types: ["Ground", "Water"],
		abilities: {0: "Unaware", 1: "Guts", H: "Honey Gather"},
	},
	// Rayquaza
	rayquazamega: {
		inherit: true,
		requiredMove: null,
		requiredItem: "Meteorite",
	},
	// Lati@s
	latiasmega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Latiasite", "Soul Dew"],
	},
	latiosmega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Latiosite", "Soul Dew"],
	},
};
