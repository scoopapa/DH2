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
	// Arceus
	arceus: {
		inherit: true,
		abilities: {0: "Multitype", H: "Rock Head"},
		unreleasedHidden: true,
	},
	arceusbug: {
		inherit: true,
		abilities: {0: "Multitype", H: "Magic Guard"},
		unreleasedHidden: true,
	},
	arceusdark: {
		inherit: true,
		abilities: {0: "Multitype", H: "Limber"},
		unreleasedHidden: true,
	},
	arceusdragon: {
		inherit: true,
		abilities: {0: "Multitype", H: "Regenerator"},
		unreleasedHidden: true,
	},
	arceuselectric: {
		inherit: true,
		abilities: {0: "Multitype", H: "Earth Eater"},
		unreleasedHidden: true,
	},
	arceusfairy: {
		inherit: true,
		abilities: {0: "Multitype", H: "Opportunist"},
		unreleasedHidden: true,
	},
	arceusfighting: {
		inherit: true,
		abilities: {0: "Multitype", H: "Scrappy"},
		unreleasedHidden: true,
	},
	arceusfire: {
		inherit: true,
		abilities: {0: "Multitype", H: "Dry Skin"},
		unreleasedHidden: true,
	},
	arceusflying: {
		inherit: true,
		abilities: {0: "Multitype", H: "Wind Power"},
		unreleasedHidden: true,
	},
	arceusghost: {
		inherit: true,
		abilities: {0: "Multitype", H: "Super Luck"},
		unreleasedHidden: true,
	},
	arceusgrass: {
		inherit: true,
		abilities: {0: "Multitype", H: "Cotton Down"},
		unreleasedHidden: true,
	},
	arceusground: {
		inherit: true,
		abilities: {0: "Multitype", H: "Clear Body"},
		unreleasedHidden: true,
	},
	arceusice: {
		inherit: true,
		abilities: {0: "Multitype", H: "Snow Warning"},
		unreleasedHidden: true,
	},
	arceuspoison: {
		inherit: true,
		abilities: {0: "Multitype", H: "Levitate"},
		unreleasedHidden: true,
	},
	arceuspsychic: {
		inherit: true,
		abilities: {0: "Multitype", H: "Intimidate"},
		unreleasedHidden: true,
	},
	arceusrock: {
		inherit: true,
		abilities: {0: "Multitype", H: "Sand Stream"},
		unreleasedHidden: true,
	},
	arceussteel: {
		inherit: true,
		abilities: {0: "Multitype", H: "Shield Dust"},
		unreleasedHidden: true,
	},
	arceuswater: {
		inherit: true,
		abilities: {0: "Multitype", H: "Cloud Nine"},
		unreleasedHidden: true,
	},
};
