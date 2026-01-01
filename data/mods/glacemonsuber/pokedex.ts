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
	// slate 2
	necrozmadawnwings: {
		inherit: true,
		types: ["Psychic", "Fairy"],
		abilities: {0: "Prism Armor", H: "Hospitality"},
	},
	gengarmega: {
		inherit: true,
		abilities: {0: "Neutralizing Gas"},
	},
	regice: {
		inherit: true,
		abilities: {0: "Clear Body", 1: "Ice Body", H: "Filter"},
	},
	// Unaware
	audinomega: {
		inherit: true,
		abilities: {0: "Unaware", H: "Regenerator"},
	},
	ursalunabloodmoon: {
		inherit: true,
		abilities: {0: "Mind's Eye", H: "Unaware"},
	},
	ironbundle: {
		inherit: true,
		abilities: {0: "Quark Drive", H: "Unaware"},
	},
	dialga: {
		inherit: true,
		abilities: {0: "Pressure", 1: "Unaware", H: "Telepathy"},
	},
	dialgaorigin: {
		inherit: true,
		abilities: {0: "Pressure", 1: "Unaware", H: "Telepathy"},
	},
	palkia: {
		inherit: true,
		abilities: {0: "Pressure", 1: "Unaware", H: "Telepathy"},
	},
	palkiaorigin: {
		inherit: true,
		abilities: {0: "Pressure", 1: "Unaware", H: "Telepathy"},
	},
	blastoise: {
		inherit: true,
		abilities: {0: "Torrent", H: "Unaware"},
	},
	blastoisemega: {
		inherit: true,
		abilities: {0: "Mega Launcher", H: "Unaware"},
	},
	barraskewda: {
		inherit: true,
		abilities: {0: "Swift Swim", 1: "Velocity", H: "Unaware"},
	},
	wynaut: {
		inherit: true,
		abilities: {0: "Shadow Tag", 1: "Rattled", H: "Unaware"},
	},
	wobbuffet: {
		inherit: true,
		abilities: {0: "Shadow Tag", 1: "Rattled", H: "Unaware"},
	},
	// Mythic Presence
	mew: {
		inherit: true,
		abilities: {0: "Trace", 1: "Mythic Presence", H: "Protean"},
	},
	celebi: {
		inherit: true,
		abilities: {0: "Mythic Presence", 1: "Moody", H: "Run It Back"},
	},
	jirachi: {
		inherit: true,
		abilities: {0: "Mythic Presence", 1: "Moody", H: "Light Metal"},
	},
	manaphy: {
		inherit: true,
		abilities: {0: "Hydration", 1: "Moody", H: "Mythic Presence"},
	},
	shaymin: {
		inherit: true,
		abilities: {0: "Poison Heal", 1: "Moody", H: "Mythic Presence"},
	},
	shayminsky: {
		inherit: true,
		abilities: {0: "Aerodynamism", 1: "Wind Power", H: "Mythic Presence"},
	},
	victini: {
		inherit: true,
		abilities: {0: "Victory Star", 1: "Mythic Presence", H: "Pyre"},
	},
	hoopa: {
		inherit: true,
		abilities: {0: "Magician", 1: "Mythic Presence",H: "Long Reach"},
	},
	hoopaunbound: {
		inherit: true,
		abilities: {0: "Magician", 1: "Mythic Presence",H: "Long Reach"},
	},
	volcanion: {
		inherit: true,
		abilities: {0: "Water Absorb", 1: "Mythic Presence", H: "Moody"},
	},
	magearna: {
		inherit: true,
		abilities: {0: "Soul-Heart", H: "Mythic Presence"},
	},
	magearnaoriginal: {
		inherit: true,
		abilities: {0: "Soul-Heart", H: "Mythic Presence"},
	},
	pecharunt: {
		inherit: true,
		abilities: {0: "Poison Puppeteer", 1: "Stench", H: "Mythic Presence"},
	},
};
