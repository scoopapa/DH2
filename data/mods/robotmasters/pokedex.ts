// Negative num values are internal mod identifiers, not canon Pokédex numbers.
// Height and weight are project-assigned scale estimates for roster consistency, not canon measurements.

export const Pokedex: import('../../../sim/dex-species').ModdedSpeciesDataTable = {
	megaman: {
		num: -1001, // DLN-001
		name: "Mega Man", types: ["Normal"], gender: "M",
		baseStats: {hp: 90, atk: 90, def: 90, spa: 90, spd: 90, spe: 90},
		abilities: {0: "Multitype", H: "Protean"},
		heightm: 1.6, weightkg: 80, color: "Blue", eggGroups: ["Undiscovered"],
	},
	cutman: {
		num: -1003, // DLN-003
		name: "Cut Man", types: ["Normal"], gender: "M",
		baseStats: {hp: 65, atk: 125, def: 100, spa: 55, spd: 90, spe: 105},
		abilities: {0: "Hyper Cutter", H: "Sharpness"},
		heightm: 1.55, weightkg: 65, color: "Red", eggGroups: ["Undiscovered"],
	},
	gutsman: {
		num: -1004, // DLN-004
		name: "Guts Man", types: ["Normal", "Fighting"], gender: "M",
		baseStats: {hp: 105, atk: 140, def: 95, spa: 55, spd: 80, spe: 65},
		abilities: {0: "Guts", H: "Rocky Payload"},
		heightm: 2.1, weightkg: 180, color: "Yellow", eggGroups: ["Undiscovered"],
	},
	iceman: {
		num: -1005, // DLN-005
		name: "Ice Man", types: ["Ice"], gender: "M",
		baseStats: {hp: 56, atk: 60, def: 114, spa: 124, spd: 60, spe: 126},
		abilities: {0: "Overcoat", H: "Fur Coat"},
		heightm: 1.65, weightkg: 70, color: "White", eggGroups: ["Undiscovered"],
	},
	bombman: {
		num: -1006, // DLN-006
		name: "Bomb Man", types: ["Normal"], gender: "M",
		baseStats: {hp: 97, atk: 80, def: 86, spa: 105, spd: 85, spe: 87},
		abilities: {0: "Aftermath", H: "Flare Boost"},
		heightm: 1.9, weightkg: 120, color: "Brown", eggGroups: ["Undiscovered"],
	},
	fireman: {
		num: -1007, // DLN-007
		name: "Fire Man", types: ["Fire"], gender: "M",
		baseStats: {hp: 85, atk: 60, def: 100, spa: 125, spd: 80, spe: 90},
		abilities: {0: "Blaze", H: "Drought"},
		heightm: 1.85, weightkg: 105, color: "Red", eggGroups: ["Undiscovered"],
	},
	elecman: {
		num: -1008, // DLN-008
		name: "Elec Man", types: ["Electric"], gender: "M",
		baseStats: {hp: 70, atk: 60, def: 80, spa: 115, spd: 80, spe: 135},
		abilities: {0: "Lightning Rod", H: "Electric Surge"},
		heightm: 1.75, weightkg: 85, color: "Yellow", eggGroups: ["Undiscovered"],
	},
	metalman: {
		num: -2009, // DWN-009
		name: "Metal Man", types: ["Steel"], gender: "M",
		baseStats: {hp: 85, atk: 125, def: 100, spa: 60, spd: 80, spe: 90},
		abilities: {0: "Light Metal", H: "Steelworker"},
		heightm: 1.75, weightkg: 110, color: "Red", eggGroups: ["Undiscovered"],
	},
	airman: {
		num: -2010, // DWN-010
		name: "Air Man", types: ["Normal"], gender: "M",
		baseStats: {hp: 85, atk: 50, def: 95, spa: 120, spd: 115, spe: 75},
		abilities: {0: "Air Lock", H: "No Guard"},
		heightm: 2.00, weightkg: 125, color: "Blue", eggGroups: ["Undiscovered"],
	},
	bubbleman: {
		num: -2011, // DWN-011
		name: "Bubble Man", types: ["Water"], gender: "M",
		baseStats: {hp: 88, atk: 80, def: 112, spa: 70, spd: 132, spe: 58},
		abilities: {0: "Keen Eye", H: "Water Bubble"},
		heightm: 1.55, weightkg: 75, color: "Blue", eggGroups: ["Undiscovered"],
	},
	quickman: {
		num: -2012, // DWN-012
		name: "Quick Man", types: ["Normal"], gender: "M",
		baseStats: {hp: 80, atk: 100, def: 50, spa: 80, spd: 50, spe: 180},
		abilities: {0: "Quick Feet", H: "Moxie"},
		heightm: 1.70, weightkg: 85, color: "Red", eggGroups: ["Undiscovered"],
	},
	crashman: {
		num: -2013, // DWN-013
		name: "Crash Man", types: ["Steel", "Fighting"], gender: "M",
		baseStats: {hp: 80, atk: 115, def: 120, spa: 75, spd: 80, spe: 70},
		abilities: {0: "Klutz", H: "Steely Spirit"},
		heightm: 1.85, weightkg: 130, color: "Red", eggGroups: ["Undiscovered"],
	},
	flashman: {
		num: -2014, // DWN-014
		name: "Flash Man", types: ["Normal", "Psychic"], gender: "M",
		baseStats: {hp: 90, atk: 75, def: 85, spa: 115, spd: 110, spe: 65},
		abilities: {0: "Illuminate", H: "Tinted Lens"},
		heightm: 1.75, weightkg: 95, color: "Blue", eggGroups: ["Undiscovered"],
	},
	heatman: {
		num: -2015, // DWN-015
		name: "Heat Man", types: ["Fire"], gender: "M",
		baseStats: {hp: 80, atk: 90, def: 120, spa: 110, spd: 70, spe: 70},
		abilities: {0: "Shell Armor", H: "Sturdy"},
		heightm: 1.65, weightkg: 100, color: "Yellow", eggGroups: ["Undiscovered"],
	},
	woodman: {
		num: -2016, // DWN-016
		name: "Wood Man", types: ["Grass"], gender: "M",
		baseStats: {hp: 95, atk: 109, def: 105, spa: 75, spd: 85, spe: 71},
		abilities: {0: "Leaf Guard", H: "Regenerator"},
		heightm: 1.90, weightkg: 160, color: "Brown", eggGroups: ["Undiscovered"],
	},
	needleman: {
		num: -2017, // DWN-017
		name: "Needle Man", types: ["Normal"], gender: "M",
		baseStats: {hp: 70, atk: 83, def: 152, spa: 53, spd: 142, spe: 40},
		abilities: {0: "Poison Point", H: "Iron Barbs"},
		heightm: 1.70, weightkg: 90, color: "Blue", eggGroups: ["Undiscovered"],
	},
	magnetman: {
		num: -2018, // DWN-018
		name: "Magnet Man", types: ["Steel"], gender: "M",
		baseStats: {hp: 70, atk: 60, def: 110, spa: 120, spd: 90, spe: 90},
		abilities: {0: "Magnet Pull", H: "Transistor"},
		heightm: 1.85, weightkg: 135, color: "Red", eggGroups: ["Undiscovered"],
	},
	geminiman: {
		num: -2019, // DWN-019
		name: "Gemini Man", types: ["Psychic"], gender: "M",
		baseStats: {hp: 80, atk: 50, def: 80, spa: 100, spd: 180, spe: 50},
		abilities: {0: "Trace", H: "Magic Bounce"},
		heightm: 1.80, weightkg: 100, color: "White", eggGroups: ["Undiscovered"],
	},
	hardman: {
		num: -2020, // DWN-020
		name: "Hard Man", types: ["Normal"], gender: "M",
		baseStats: {hp: 80, atk: 72, def: 168, spa: 47, spd: 138, spe: 35},
		abilities: {0: "Heavy Metal", H: "Bulletproof"},
		heightm: 2.05, weightkg: 190, color: "Blue", eggGroups: ["Undiscovered"],
	},
	topman: {
		num: -2021, // DWN-021
		name: "Top Man", types: ["Normal"], gender: "M",
		baseStats: {hp: 70, atk: 115, def: 115, spa: 35, spd: 115, spe: 90},
		abilities: {0: "Own Tempo", H: "Contrary"},
		heightm: 1.65, weightkg: 85, color: "Brown", eggGroups: ["Undiscovered"],
	},
	snakeman: {
		num: -2022, // DWN-022
		name: "Snake Man", types: ["Dragon", "Normal"], gender: "M",
		baseStats: {hp: 75, atk: 87, def: 95, spa: 75, spd: 95, spe: 113},
		abilities: {0: "Immunity", H: "Poison Heal"},
		heightm: 1.80, weightkg: 100, color: "Green", eggGroups: ["Undiscovered"],
	},

	sparkman: {
		num: -2023, // DWN-023
		name: "Spark Man", types: ["Electric"], gender: "M",
		baseStats: {hp: 60, atk: 115, def: 95, spa: 70, spd: 95, spe: 105},
		abilities: {0: "Power Spot", H: "Technician"},
		heightm: 1.90, weightkg: 145, color: "Brown", eggGroups: ["Undiscovered"],
	},

	shadowman: {
		num: -2024, // DWN-024
		name: "Shadow Man", types: ["Dark"], gender: "M",
		baseStats: {hp: 85, atk: 95, def: 80, spa: 70, spd: 80, spe: 130},
		abilities: {0: "Poison Touch", H: "Merciless"},
		heightm: 1.75, weightkg: 85, color: "Purple", eggGroups: ["Undiscovered"],
	},
	brightman: {
		num: -2025, // DWN-025
		name: "Bright Man", types: ["Normal", "Electric"], gender: "M",
		baseStats: {hp: 80, atk: 55, def: 90, spa: 145, spd: 90, spe: 80},
		abilities: {0: "Anticipation", H: "Galvanize"},
		heightm: 1.75, weightkg: 95, color: "Brown", eggGroups: ["Undiscovered"],
	},
	toadman: {
		num: -2026, // DWN-026
		name: "Toad Man", types: ["Water"], gender: "M",
		baseStats: {hp: 90, atk: 75, def: 95, spa: 110, spd: 100, spe: 70},
		abilities: {0: "Soundproof", H: "Hydration"},
		heightm: 1.65, weightkg: 90, color: "Green", eggGroups: ["Undiscovered"],
	},
	drillman: {
		num: -2027, // DWN-027
		name: "Drill Man", types: ["Steel"], gender: "M",
		baseStats: {hp: 110, atk: 135, def: 80, spa: 50, spd: 77, spe: 88},
		abilities: {0: "Infiltrator", H: "Mold Breaker"},
		heightm: 1.85, weightkg: 145, color: "Red", eggGroups: ["Undiscovered"],
	},
	pharaohman: {
		num: -2028, // DWN-028
		name: "Pharaoh Man", types: ["Normal", "Ghost"], gender: "M",
		baseStats: {hp: 78, atk: 50, def: 145, spa: 112, spd: 125, spe: 30},
		abilities: {0: "Mummy", H: "Protosynthesis"},
		heightm: 1.80, weightkg: 105, color: "Yellow", eggGroups: ["Undiscovered"],
	},
	ringman: {
		num: -2029, // DWN-029
		name: "Ring Man", types: ["Normal"], gender: "M",
		baseStats: {hp: 80, atk: 100, def: 115, spa: 70, spd: 85, spe: 90},
		abilities: {0: "Synchronize", H: "Serene Grace"},
		heightm: 1.75, weightkg: 90, color: "Red", eggGroups: ["Undiscovered"],
	},
	dustman: {
		num: -2030, // DWN-030
		name: "Dust Man", types: ["Steel", "Poison"], gender: "M",
		baseStats: {hp: 113, atk: 73, def: 103, spa: 93, spd: 103, spe: 55},
		abilities: {0: "Stench", H: "Cheek Pouch"},
		heightm: 1.90, weightkg: 170, color: "Gray", eggGroups: ["Undiscovered"],
	},
	diveman: {
		num: -2031, // DWN-031
		name: "Dive Man", types: ["Normal", "Water"], gender: "M",
		baseStats: {hp: 150, atk: 110, def: 115, spa: 65, spd: 65, spe: 35},
		abilities: {0: "Stalwart", H: "Water Veil"},
		heightm: 1.85, weightkg: 160, color: "Blue", eggGroups: ["Undiscovered"],
	},
	skullman: {
		num: -2032, // DWN-032
		name: "Skull Man", types: ["Ghost", "Dark"], gender: "M",
		baseStats: {hp: 95, atk: 70, def: 65, spa: 80, spd: 120, spe: 110},
		abilities: {0: "Cursed Body", H: "Shadow Shield"},
		heightm: 1.80, weightkg: 115, color: "White", eggGroups: ["Undiscovered"],
	},

	// Mega Man & Bass and Mega Man 9 additions.
	dynamoman: {
		num: -4001, // KGN-001
		name: "Dynamo Man", types: ["Electric"], gender: "M",
		baseStats: {hp: 122, atk: 64, def: 103, spa: 103, spd: 103, spe: 45},
		abilities: {0: "Volt Absorb", H: "Electromorphosis"},
		heightm: 2.0, weightkg: 150, color: "Green", eggGroups: ["Undiscovered"],
	},
	coldman: {
		num: -4002, // KGN-002
		name: "Cold Man", types: ["Ice"], gender: "M",
		baseStats: {hp: 70, atk: 65, def: 107, spa: 105, spd: 107, spe: 86},
		abilities: {0: "Refrigerate", H: "Snow Warning"},
		heightm: 1.9, weightkg: 130, color: "White", eggGroups: ["Undiscovered"],
	},
	groundman: {
		num: -4003, // KGN-003
		name: "Ground Man", types: ["Steel", "Ground"], gender: "M",
		baseStats: {hp: 88, atk: 130, def: 95, spa: 60, spd: 85, spe: 82},
		abilities: {0: "Inner Focus", H: "Sand Rush"},
		heightm: 2.1, weightkg: 180, color: "Brown", eggGroups: ["Undiscovered"],
	},
	pirateman: {
		num: -4004, // KGN-004
		name: "Pirate Man", types: ["Dark", "Water"], gender: "M",
		baseStats: {hp: 95, atk: 90, def: 95, spa: 120, spd: 110, spe: 30},
		abilities: {0: "Unnerve", H: "Prankster"},
		heightm: 1.9, weightkg: 120, color: "Purple", eggGroups: ["Undiscovered"],
	},
	burnerman: {
		num: -4005, // KGN-005
		name: "Burner Man", types: ["Fire", "Dark"], gender: "M",
		baseStats: {hp: 75, atk: 90, def: 70, spa: 120, spd: 70, spe: 115},
		abilities: {0: "Berserk", H: "Grassy Surge"},
		heightm: 1.9, weightkg: 110, color: "Red", eggGroups: ["Undiscovered"],
	},
	magicman: {
		num: -4006, // KGN-006
		name: "Magic Man", types: ["Psychic"], gender: "M",
		baseStats: {hp: 80, atk: 85, def: 95, spa: 110, spd: 100, spe: 70},
		abilities: {0: "Magician", H: "Wonder Skin"},
		heightm: 1.8, weightkg: 95, color: "Purple", eggGroups: ["Undiscovered"],
	},
	concreteman: {
		num: -1065, // DLN-065
		name: "Concrete Man", types: ["Rock"], gender: "M",
		baseStats: {hp: 130, atk: 65, def: 105, spa: 55, spd: 105, spe: 80},
		abilities: {0: "Water Compaction", H: "Sand Spit"},
		heightm: 2.1, weightkg: 200, color: "Gray", eggGroups: ["Undiscovered"],
	},
	tornadoman: {
		num: -1066, // DLN-066
		name: "Tornado Man", types: ["Flying", "Normal"], gender: "M",
		baseStats: {hp: 79, atk: 115, def: 70, spa: 115, spd: 70, spe: 91},
		abilities: {0: "Normalize", H: "Wind Rider"},
		heightm: 1.9, weightkg: 105, color: "Green", eggGroups: ["Undiscovered"],
	},
	splashwoman: {
		num: -1067, // DLN-067
		name: "Splash Woman", types: ["Fairy", "Water"], gender: "F",
		baseStats: {hp: 80, atk: 74, def: 74, spa: 126, spd: 116, spe: 70},
		abilities: {0: "Liquid Voice", H: "Swift Swim"},
		heightm: 1.8, weightkg: 90, color: "Blue", eggGroups: ["Undiscovered"],
	},
	plugman: {
		num: -1068, // DLN-068
		name: "Plug Man", types: ["Electric"], gender: "M",
		baseStats: {hp: 80, atk: 95, def: 60, spa: 145, spd: 130, spe: 30},
		abilities: {0: "Battery", H: "Triage"},
		heightm: 1.8, weightkg: 100, color: "Pink", eggGroups: ["Undiscovered"],
	},
	jewelman: {
		num: -1069, // DLN-069
		name: "Jewel Man", types: ["Fairy", "Rock"], gender: "M",
		baseStats: {hp: 80, atk: 75, def: 85, spa: 100, spd: 85, spe: 115},
		abilities: {0: "Clear Body", H: "Prism Armor"},
		heightm: 1.8, weightkg: 105, color: "Pink", eggGroups: ["Undiscovered"],
	},
	hornetman: {
		num: -1070, // DLN-070
		name: "Hornet Man", types: ["Bug"], gender: "M",
		baseStats: {hp: 83, atk: 93, def: 122, spa: 80, spd: 122, spe: 40},
		abilities: {0: "Parental Bond", H: "Natural Cure"},
		heightm: 1.8, weightkg: 95, color: "Yellow", eggGroups: ["Undiscovered"],
	},
	magmaman: {
		num: -1071, // DLN-071
		name: "Magma Man", types: ["Fire"], gender: "M",
		baseStats: {hp: 255, atk: 10, def: 10, spa: 75, spd: 135, spe: 55},
		abilities: {0: "Magma Armor", H: "Flame Body"},
		heightm: 2.0, weightkg: 220, color: "Red", eggGroups: ["Undiscovered"],
	},
	galaxyman: {
		num: -1072, // DLN-072
		name: "Galaxy Man", types: ["Psychic", "Steel"], gender: "M",
		baseStats: {hp: 80, atk: 45, def: 110, spa: 95, spd: 120, spe: 90},
		abilities: {0: "Color Change", H: "Levitate"},
		heightm: 1.7, weightkg: 85, color: "Purple", eggGroups: ["Undiscovered"],
	},

	// Mega Man 5 Stardroids.
	stardroidterra: {
		num: -5001, // SRN-001
		name: "Stardroid Terra", types: ["Normal", "Grass"], gender: "M",
		baseStats: {hp: 87, atk: 60, def: 85, spa: 133, spd: 91, spe: 84},
		abilities: {0: "Beast Boost", H: "Chlorophyll"},
		heightm: 1.8, weightkg: 100, color: "Green", eggGroups: ["Undiscovered"],
	},
	stardroidmercury: {
		num: -5002, // SRN-002
		name: "Stardroid Mercury", types: ["Normal"], gender: "M",
		baseStats: {hp: 80, atk: 90, def: 70, spa: 90, spd: 130, spe: 80},
		abilities: {0: "Beast Boost", H: "Gooey"},
		heightm: 1.8, weightkg: 100, color: "Purple", eggGroups: ["Undiscovered"],
	},
	stardroidvenus: {
		num: -5003, // SRN-003
		name: "Stardroid Venus", types: ["Water"], gender: "M",
		baseStats: {hp: 81, atk: 73, def: 108, spa: 120, spd: 89, spe: 69},
		abilities: {0: "Beast Boost", H: "Misty Surge"},
		heightm: 1.8, weightkg: 100, color: "Yellow", eggGroups: ["Undiscovered"],
	},
	stardroidmars: {
		num: -5004, // SRN-004
		name: "Stardroid Mars", types: ["Steel"], gender: "M",
		baseStats: {hp: 80, atk: 78, def: 135, spa: 106, spd: 105, spe: 36},
		abilities: {0: "Beast Boost", H: "Analytic"},
		heightm: 1.8, weightkg: 100, color: "Red", eggGroups: ["Undiscovered"],
	},
	stardroidjupiter: {
		num: -5005, // SRN-005
		name: "Stardroid Jupiter", types: ["Electric", "Flying"], gender: "M",
		baseStats: {hp: 100, atk: 123, def: 90, spa: 57, spd: 90, spe: 80},
		abilities: {0: "Beast Boost", H: "Motor Drive"},
		heightm: 1.8, weightkg: 100, color: "Green", eggGroups: ["Undiscovered"],
	},
	stardroidsaturn: {
		num: -5006, // SRN-006
		name: "Stardroid Saturn", types: ["Psychic", "Dark"], gender: "M",
		baseStats: {hp: 95, atk: 60, def: 115, spa: 90, spd: 95, spe: 85},
		abilities: {0: "Beast Boost", H: "Opportunist"},
		heightm: 1.8, weightkg: 100, color: "Red", eggGroups: ["Undiscovered"],
	},
	stardroiduranus: {
		num: -5007, // SRN-007
		name: "Stardroid Uranus", types: ["Ground", "Normal"], gender: "M",
		baseStats: {hp: 105, atk: 131, def: 111, spa: 53, spd: 53, spe: 87},
		abilities: {0: "Beast Boost", H: "Rock Head"},
		heightm: 1.8, weightkg: 100, color: "Purple", eggGroups: ["Undiscovered"],
	},
	stardroidpluto: {
		num: -5008, // SRN-008
		name: "Stardroid Pluto", types: ["Normal"], gender: "M",
		baseStats: {hp: 68, atk: 117, def: 75, spa: 82, spd: 75, spe: 123},
		abilities: {0: "Beast Boost", H: "Stakeout"},
		heightm: 1.8, weightkg: 100, color: "Yellow", eggGroups: ["Undiscovered"],
	},
	stardroidneptune: {
		num: -5009, // SRN-009
		name: "Stardroid Neptune", types: ["Water", "Dragon"], gender: "M",
		baseStats: {hp: 120, atk: 60, def: 90, spa: 85, spd: 105, spe: 80},
		abilities: {0: "Beast Boost", H: "Purifying Salt"},
		heightm: 1.8, weightkg: 100, color: "Blue", eggGroups: ["Undiscovered"],
	},

};
