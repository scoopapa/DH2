'use strict';
exports.BattlePokedex = {
	lycanroc: {
		inherit: true,
		species: "Lycanroc",
		types: ["Rock", "Normal"],
		baseStats: {
			hp: 85,
			atk: 133,
			def: 65,
			spa: 55,
			spd: 95,
			spe: 137
		},
		abilities: {0: "Keen Eye", 1: "Sand Rush", H: "Rock Head"},
	},
	emboar: {
		inherit: true,
		species: "Emboar",
		types: ["Rock", "Fire"],
		baseStats: {
			hp: 95,
			atk: 138,
			def: 65,
			spa: 110,
			spd: 65,
			spe: 97
		},
		abilities: {
			0: "Reckless",
			1: "Dazzling",
			H: "Magic Guard"
		},
	},
	bastiodon: {
		inherit: true,
		species: "Bastiodon",
		types: ["Rock"],
		baseStats: {
			hp: 60,
			atk: 50,
			def: 120,
			spa: 135,
			spd: 100,
			spe: 105
		},
		abilities: {
			0: "Sand Force",
			1: "Sand Rush",
			H: "Sand Stream"
		},
	},
	glaceon: {
		inherit: true,
		species: "Glaceon",
		types: ["Ice"],
		baseStats: {
			hp: 65,
			atk: 95,
			def: 65,
			spa: 110,
			spd: 60,
			spe: 130
		},
		abilities: {
			0: "Adaptability",
			H: "Magic Guard"
		},
	},
	glalie: {
		inherit: true,
		species: "Glalie",
		types: ["Ice", "Rock"],
		baseStats: {
			hp: 60,
			atk: 160,
			def: 60,
			spa: 70,
			spd: 60,
			spe: 160
		},
		abilities: {
			0: "Sturdy",
			1: "Adaptability",
			H: "Magic Guard"
		},
	},
	froslass: {
		inherit: true,
		species: "Froslass",
		types: ["Ice", "Poison"],
		baseStats: {
			hp: 66,
			atk: 71,
			def: 66,
			spa: 142,
			spd: 106,
			spe: 116
		},
		abilities: {
			0: "Corrosion",
			1: "Snow Cloak",
			H: "Snow Warning"
		},
	},
	unfezant: {
		inherit: true,
		species: "Unfezant",
		types: ["Flying"],
		baseStats: {
			hp: 80,
			atk: 115,
			def: 80,
			spa: 82,
			spd: 80,
			spe: 133
		},
		abilities: {
			0: "Big Pecks",
			1: "Technician",
			H: "Aerilate"
		},
	},
	cryogonal: {
		inherit: true,
		species: "Cryogonal",
		types: ["Ice", "Flying"],
		baseStats: {
			hp: 80,
			atk: 60,
			def: 70,
			spa: 105,
			spd: 125,
			spe: 130
		},
		abilities: {
			0: "Aerilate",
			1: "Intimidate",
			H: "Ice Body"
		},
	},
	farfetchd: {
		inherit: true,
		species: "Farfetch'd",
		types: ["Flying", "Fighting"],
		baseStats: {
			hp: 103,
			atk: 130,
			def: 85,
			spa: 55,
			spd: 62,
			spe: 120
		},
		abilities: {
			0: "Sniper",
			1: "Aerilate",
			H: "Defiant"
		},
	},
	hariyama: {
		species: "Hariyama",
		inherit: true,
		types: ["Fighting"],
		baseStats: {
			hp: 150,
			atk: 130,
			def: 100,
			spa: 20,
			spd: 100,
			spe: 70
		},
		abilities: {
			0: "Thick Fat",
			1: "Guts",
			H: "Unaware"
		},
	},
	beartic: {
		inherit: true,
		species: "Beartic",
		types: ["Ice", "Fighting"],
		baseStats: {
			hp: 115,
			atk: 145,
			def: 80,
			spa: 55,
			spd: 80,
			spe: 95
		},
		abilities: {
			0: "No Guard",
			1: "Refrigerate",
			H: "Swift Swim"
		},
	},
	primeape: {
		inherit: true,
		species: "Primeape",
		types: ["Fighting", "Electric"],
		baseStats: {
			hp: 90,
			atk: 135,
			def: 80,
			spa: 60,
			spd: 80,
			spe: 125
		},
		abilities: {
			0: "Reckless",
			1: "Motor Drive",
			H: "Defiant"
		},
	},
	kricketune: {
		inherit: true,
		species: "Kricketune",
		types: ["Bug"],
		baseStats: {
			hp: 112,
			atk: 125,
			def: 99,
			spa: 55,
			spd: 99,
			spe: 80
		},
		abilities: {
			0: "Swarm",
			1: "Technician",
			H: "Prankster"
		},
	},
	crustle: {
		inherit: true,
		species: "Crustle",
		types: ["Bug", "Ground"],
		baseStats: {
			hp: 70,
			atk: 120,
			def: 125,
			spa: 65,
			spd: 75,
			spe: 75
		},
		abilities: {
			0: "Sturdy",
			1: "Sand Force",
			H: "Water Compaction"
		},
	},
	leafeon: {
		inherit: true,
		species: "Leafeon",
		types: ["Grass"],
		baseStats: {
			hp: 95,
			atk: 130,
			def: 65,
			spa: 60,
			spd: 65,
			spe: 110
		},
		abilities: {
			0: "Chlorophyll",
			H: "Tough Claws"
		},
	},
	dedenne: {
		inherit: true,
		species: "Dedenne",
		types: ["Grass", "Electric"],
		baseStats: {
			hp: 87,
			atk: 57,
			def: 87,
			spa: 121,
			spd: 87,
			spe: 131
		},
		abilities: {
			0: "Chlorophyll",
			1: "Volt Absorb",
			H: "Overgrow"
		},
	},
	bellossom: {
		inherit: true,
		species: "Bellossom",
		types: ["Grass", "Fire"],
		baseStats: {
			hp: 100,
			atk: 70,
			def: 110,
			spa: 130,
			spd: 110,
			spe: 50
		},
		abilities: {
			0: "Chlorophyll",
			1: "Drought",
			H: "Natural Cure"
		},
	},
	electrode: {
		inherit: true,
		species: "Electrode",
		types: ["Electric"],
		baseStats: {
			hp: 70,
			atk: 50,
			def: 70,
			spa: 110,
			spd: 100,
			spe: 170
		},
		abilities: {
			0: "Aftermath",
			1: "Soundproof",
			H: "No Guard"
		},
	},
	luxray: {
		inherit: true,
		species: "Luxray",
		types: ["Ice", "Electric"],
		baseStats: {
			hp: 70,
			atk: 120,
			def: 70,
			spa: 120,
			spd: 70,
			spe: 120
		},
		abilities: {
			0: "Slush Rush",
			1: "Intimidate",
			H: "Guts"
		},
	},
	arbok: {
		inherit: true,
		species: "Arbok",
		types: ["Electric", "Poison"],
		baseStats: {
			hp: 80,
			atk: 125,
			def: 8,
			spa: 65,
			spd: 104,
			spe: 115
		},
		abilities: {
			0: "Intimidate",
			1: "Shed Skin",
			H: "Strong Jaw"
		},
	},
	arcanine: {
		inherit: true,
		species: "Arcanine",
		types: ["Fire"],
		baseStats: {
			hp: 100,
			atk: 120,
			def: 80,
			spa: 75,
			spd: 90,
			spe: 105
		},
		abilities: {
			0: "Fur Coat",
			1: "Reckless",
			H: "Justified"
		},
	},
	magmortar: {
		inherit: true,
		species: "Magmortar",
		types: ["Fire", "Dragon"],
		baseStats: {
			hp: 75,
			atk: 95,
			def: 67,
			spa: 125,
			spd: 95,
			spe: 93
		},
		abilities: {
			0: "Flame Body",
			H: "Mega Launcher"
		},
	},
	volcanion: {
		inherit: true,
		species: "Volcanion",
		types: ["Fire", "Ice"],
		baseStats: {
			hp: 96,
			atk: 75,
			def: 108,
			spa: 135,
			spd: 72,
			spe: 84
		},
		abilities: {
			0: "No Guard"
		},
	},
	zoroark: {
		inherit: true,
		species: "Zoroark",
		types: ["Dark"],
		baseStats: {
			hp: 70,
			atk: 105,
			def: 70,
			spa: 125,
			spd: 70,
			spe: 130
		},
		abilities: {
			0: "Illusion",
			1: "Dazzling",
			H: "Prankster"
		},
	},
	incineroar: {
		inherit: true,
		species: "Incineroar",
		types: ["Dark", "Fire"],
		baseStats: {
			hp: 115,
			atk: 135,
			def: 100,
			spa: 60,
			spd: 110,
			spe: 60
		},
		abilities: {
			0: "Blaze",
			H: "Intimidate"
		},
	},
	accelgor: {
		inherit: true,
		species: "Accelgor",
		types: ["Dark", "Bug"],
		baseStats: {
			hp: 55,
			atk: 111,
			def: 50,
			spa: 133,
			spd: 50,
			spe: 166
		},
		abilities: {
			0: "Sheer Force",
			1: "Technician",
			H: "Dazzling"
		},
	},
	kangaskhan: {
		inherit: true,
		species: "Kangaskhan",
		types: ["Ground"],
		baseStats: {
			hp: 115,
			atk: 120,
			def: 95,
			spa: 40,
			spd: 95,
			spe: 105
		},
		abilities: {
			0: "Mold Breaker",
			1: "Defiant",
			H: "Friend Guard"
		},
	},
	rampardos: {
		inherit: true,
		species: "Rampardos",
		types: ["Ground", "Rock"],
		baseStats: {
			hp: 97,
			atk: 165,
			def: 60,
			spa: 64,
			spd: 60,
			spe: 109
		},
		abilities: {
			0: "Rock Head",
			1: "Mold Breaker",
			H: "Sheer Force"
		},
	},
	lycanrocmidnight: {
		inherit: true,
		species: "Lycanroc-Midnight",
		types: ["Ground", "Fighting"],
		baseStats: {
			hp: 95,
			atk: 130,
			def: 75,
			spa: 85,
			spd: 80,
			spe: 105
		},
		abilities: {
			0: "Technician",
			1: "Strong Jaw",
			H: "No Guard"
		},
	},
	cofagrigus: {
		inherit: true,
		species: "Cofagrigus",
		types: ["Ghost"],
		baseStats: {
			hp: 100,
			atk: 50,
			def: 130,
			spa: 110,
			spd: 130,
			spe: 50
		},
		abilities: {
			0: "Mummy",
			H: "Magic Guard"
		},
	},
	girafarig: {
		inherit: true,
		species: "Girafarig",
		types: ["Ghost", "Psychic"],
		baseStats: {
			hp: 95,
			atk: 130,
			def: 75,
			spa: 85,
			spd: 80,
			spe: 105
		},
		abilities: {
			0: "Simple",
			1: "Sheer Force",
			H: "Sap Sipper"
		},
	},
	chimecho: {
		inherit: true,
		species: "Chimecho",
		types: ["Ghost", "Normal"],
		baseStats: {
			hp: 95,
			atk: 50,
			def: 90,
			spa: 95,
			spd: 140,
			spe: 100
		},
		abilities: {
			0: "Magic Guard",
			1: "Natural Care",
			H: "Triage"
		},
	},
	bronzong: {
		inherit: true,
		species: "Bronzong",
		types: ["Steel"],
		baseStats: {
			hp: 80,
			atk: 80,
			def: 145,
			spa: 100,
			spd: 145,
			spe: 20
		},
		abilities: {
			0: "Filter",
			1: "Magnet Pull",
			H: "Berserk"
		},
	},
	armaldo: {
		inherit: true,
		species: "Armaldo",
		types: ["Steel", "Rock"],
		baseStats: {
			hp: 75,
			atk: 135,
			def: 90,
			spa: 60,
			spd: 80,
			spe: 130
		},
		abilities: {
			0: "Rock Head",
			H: "Steelworker"
		},
	},
	garbodor: {
		inherit: true,
		species: "Garbodor",
		types: ["Steel", "Poison"],
		baseStats: {
			hp: 90,
			atk: 130,
			def: 107,
			spa: 40,
			spd: 107,
			spe: 96
		},
		abilities: {
			0: "Levitate",
			1: "Skill Link",
			H: "Defiant"
		},
	},
	cresselia: {
		inherit: true,
		species: "Cresselia",
		types: ["Fairy"],
		baseStats: {
			hp: 120,
			atk: 50,
			def: 140,
			spa: 95,
			spd: 105,
			spe: 60
		},
		abilities: {
			0: "Serene Grace"
		},
	},
	goodra: {
		inherit: true,
		species: "Goodra",
		types: ["Fairy", "Dragon"],
		baseStats: {
			hp: 76,
			atk: 38,
			def: 114,
			spa: 133,
			spd: 152,
			spe: 57
		},
		abilities: {
			0: "Gooey",
			1: "Tangling Hair",
			H: "Thick Fat"
		},
	},
	nidoqueen: {
		inherit: true,
		species: "Nidoqueen",
		types: ["Fairy", "Ground"],
		baseStats: {
			hp: 110,
			atk: 65,
			def: 115,
			spa: 95,
			spd: 105,
			spe: 75
		},
		abilities: {
			0: "Mold Breaker",
			1: "Multiscale",
			H: "Sheer Force"
		},
	},
	nidoking: {
		inherit: true,
		species: "Nidoking",
		types: ["Poison"],
		baseStats: {
			hp: 90,
			atk: 105,
			def: 80,
			spa: 105,
			spd: 80,
			spe: 105
		},
		abilities: {
			0: "Dazzling",
			1: "No Guard",
			H: "Sheer Force"
		},
	},
	mukalola: {
		inherit: true,
		species: "Muk-Alola",
		types: ["Poison", "Dark"],
		baseStats: {
			hp: 105,
			atk: 125,
			def: 80,
			spa: 65,
			spd: 130,
			spe: 65
		},
		abilities: {
			0: "Poison Touch",
			1: "Moxie",
			H: "Power of Alchemy"
		},
	},
	musharna: {
		inherit: true,
		species: "Musharna",
		types: ["Poison", "Psychic"],
		baseStats: {
			hp: 130,
			atk: 50,
			def: 110,
			spa: 110,
			spd: 110,
			spe: 60
		},
		abilities: {
			0: "Levitate",
			1: "Unawate",
			H: "Regenerator"
		},
	},
	snorlax: {
		inherit: true,
		species: "Snorlax",
		types: ["Normal"],
		baseStats: {
			hp: 160,
			atk: 130,
			def: 70,
			spa: 30,
			spd: 130,
			spe: 50
		},
		abilities: {
			0: "Poison Heal",
			1: "Thick Fat",
			H: "Sheer Force"
		},
	},
	heatmor: {
		inherit: true,
		species: "Heatmor",
		types: ["Normal", "Fire"],
		baseStats: {
			hp: 80,
			atk: 125,
			def: 80,
			spa: 80,
			spd: 80,
			spe: 125
		},
		abilities: {
			0: "Flash Fire",
			1: "Moxie",
			H: "Skill Link"
		},
	},
	zangoose: {
		inherit: true,
		species: "Zangoose",
		types: ["Normal", "Steel"],
		baseStats: {
			hp: 90,
			atk: 130,
			def: 80,
			spa: 60,
			spd: 80,
			spe: 130
		},
		abilities: {
			0: "Defiant",
			1: "Guts",
			H: "Tough Claws"
		},
	},
	druddigon: {
		inherit: true,
		species: "Druddigon",
		types: ["Dragon"],
		baseStats: {
			hp: 107,
			atk: 125,
			def: 100,
			spa: 60,
			spd: 100,
			spe: 78
		},
		abilities: {
			0: "Rough Skin",
			1: "Sheer Force",
			H: "Mold Breaker"
		},
	},
	seviper: {
		inherit: true,
		species: "Seviper",
		types: ["Dragon", "Poison"],
		baseStats: {
			hp: 90,
			atk: 125,
			def: 100,
			spa: 60,
			spd: 100,
			spe: 95
		},
		abilities: {
			0: "Strong Jaw",
			1: "Shed Skin",
			H: "Infiltrator"
		},
	},
	lapras: {
		inherit: true,
		species: "Lapras",
		types: ["Dragon", "Ice"],
		baseStats: {
			hp: 130,
			atk: 105,
			def: 80,
			spa: 110,
			spd: 75,
			spe: 70
		},
		abilities: {
			0: "Slush Rush",
			1: "Multiscale",
			H: "Refrigerate"
		},
	},
	wishiwashi: {
		inherit: true,
		species: "Wishiwashi",
		types: ["Water"],
		baseStats: {
			hp: 45,
			atk: 110,
			def: 45,
			spa: 110,
			spd: 45,
			spe: 150
		},
		abilities: {
			0: "Schooling"
		},
	},
	araquanid: {
		inherit: true,
		species: "Araquanid",
		types: ["Water", "Bug"],
		baseStats: {
			hp: 100,
			atk: 90,
			def: 120,
			spa: 50,
			spd: 172,
			spe: 38
		},
		abilities: {
			0: "Water Bubble",
			1: "Drizzle",
			H: "Regenerator"
		},
	},
	clawitzer: {
		inherit: true,
		types: ["Water", "Fire"],
		species: "Clawitzer",
		baseStats: {
			hp: 81,
			atk: 73,
			def: 88,
			spa: 130,
			spd: 89,
			spe: 109
		},
		abilities: {
			0: "No Guard",
			1: "Sniper",
			H: "Dazzling"
		},
	},
	flygon: {
		inherit: true,
		species: "Flygon",
		types: ["Bug", "Dragon"],
		baseStats: {
			hp: 101,
			atk: 67,
			def: 71,
			spa: 129,
			spd: 71,
			spe: 131
		},
		abilities: {
			0: "Sheer Force",
			1: "Sand Force",
			H: "Levitate"
		},
	},
	scrafty: {
		inherit: true,
		species: "Scrafty",
		types: ["Rock", "Fighting"],
		baseStats: {
			hp: 80,
			atk: 130,
			def: 105,
			spa: 40,
			spd: 105,
			spe: 110
		},
		abilities: {
			0: "Intimidate",
			1: "Moxie",
			H: "Rock Head"
		},
	},
	torterra: {
		inherit: true,
		species: "Torterra",
		types: ["Rock", "Grass"],
		baseStats: {
			hp: 95,
			atk: 135,
			def: 125,
			spa: 55,
			spd: 105,
			spe: 55
		},
		abilities: {
			0: "Overgrow",
			H: "Rock Head"
		},
	},
	lunatone: {
		inherit: true,
		species: "Lunatone",
		types: ["Rock", "Psychic"],
		baseStats: {
			hp: 90,
			atk: 55,
			def: 75,
			spa: 125,
			spd: 95,
			spe: 130
		},
		abilities: {
			0: "Levitate",
			1: "Technician",
			H: "Magic Bounce"
		},
	},
	mew: {
		inherit: true,
		species: "Mew",
		baseStats: {
			hp: 100,
			atk: 70,
			def: 100,
			spa: 100,
			spd: 100,
			spe: 100
		},
		abilities: {
			0: "Magic Bounce",
			1: "Sheer Force",
			H: "Prankster"
		},
	},
	lilligant: {
		inherit: true,
		species: "Lilligant",
		types: ["Psychic", "Grass"],
		baseStats: {
			hp: 60,
			atk: 50,
			def: 50,
			spa: 145,
			spd: 135,
			spe: 105
		},
		abilities: {
			0: "Queenly Majesty",
			1: "Tinted Lens",
			H: "Magic Bounce"
		},
	},
	ariados: {
		inherit: true,
		species: "Ariados",
		types: ["Psychic", "Bug"],
		baseStats: {
			hp: 80,
			atk: 110,
			def: 90,
			spa: 60,
			spd: 90,
			spe: 140
		},
		abilities: {
			0: "Strong Jaw",
			1: "Intimidate",
			H: "Mold Breaker"
		},
	},
	vanilluxe: {
		inherit: true,
		species: "Vanilluxe",
		types: ["Ice", "Normal"],
		baseStats: {
			hp: 81,
			atk: 90,
			def: 80,
			spa: 130,
			spd: 85,
			spe: 104
		},
		abilities: {
			0: "No Guard",
			1: "Snow Warning",
			H: "Tinted Lens"
		},
	},
	mightyena: {
		inherit: true,
		species: "Mightyena",
		types: ["Ice", "Dark"],
		baseStats: {
			hp: 100,
			atk: 135,
			def: 90,
			spa: 40,
			spd: 90,
			spe: 115
		},
		abilities: {
			0: "Strong Jaw",
			1: "Guts",
			H: "Moxie"
		},
	},
	sandslashalola: {
		species: "Sandslash-Alola",
		inherit: true,
		types: ["Ice", "Bug"],
		baseStats: {
			hp: 75,
			atk: 115,
			def: 95,
			spa: 70,
			spd: 85,
			spe: 30
		},
		abilities: {
			0: "Slush Rush",
			1: "Skill Link",
			H: "Tough Claws"
		},
	},
	mandibuzz: {
		inherit: true,
		species: "Mandibuzz",
		types: ["Flying", "Ghost"],
		baseStats: {
			hp: 110,
			atk: 105,
			def: 105,
			spa: 55,
			spd: 95,
			spe: 100
		},
		abilities: {
			0: "Prankster",
			1: "Intimidate",
			H: "Rattled"
		},
	},
	toucannon: {
		inherit: true,
		species: "Toucannon",
		types: ["Flying", "Normal"],
		baseStats: {
			hp: 100,
			atk: 140,
			def: 110,
			spa: 65,
			spd: 90,
			spe: 65
		},
		abilities: {
			0: "Intimidate",
			1: "Skill Link",
			H: "Sheer Force"
		},
	},
	wigglytuff: {
		inherit: true,
		species: "Wigglytuff",
		types: ["Flying", "Fairy"],
		baseStats: {
			hp: 140,
			atk: 60,
			def: 45,
			spa: 160,
			spd: 100,
			spe: 65
		},
		abilities: {
			0: "Fur Coat",
			1: "Aerilate",
			H: "Technician"
		},
	},
	poliwrath: {
		inherit: true,
		species: "Poliwrath",
		types: ["Fighting", "Water"],
		baseStats: {
			hp: 100,
			atk: 135,
			def: 110,
			spa: 50,
			spd: 105,
			spe: 70
		},
		abilities: {
			0: "Water Veil",
			1: "Swift Swim",
			H: "No Guard"
		},
	},
	toxicroak: {
		inherit: true,
		species: "Toxicroak",
		types: ["Fighting", "Poison"],
		baseStats: {
			hp: 85,
			atk: 125,
			def: 75,
			spa: 105,
			spd: 75,
			spe: 105
		},
		abilities: {
			0: "Merciless",
			1: "No Guard",
			H: "Tough Claws"
		},
	},
	gallade: {
		inherit: true,
		species: "Gallade",
		types: ["Fighting", "Fairy"],
		baseStats: {
			hp: 90,
			atk: 132,
			def: 80,
			spa: 67,
			spd: 95,
			spe: 106
		},
		abilities: {
			0: "Analytic",
			1: "Iron Fist",
			H: "Justified"
		},
	},
	parasect: {
		inherit: true,
		species: "Parasect",
		types: ["Bug", "Grass"],
		baseStats: {
			hp: 105,
			atk: 135,
			def: 90,
			spa: 50,
			spd: 90,
			spe: 100
		},
		abilities: {
			0: "Triage",
			1: "Tinted Lens",
			H: "Prankster"
		},
	},
	golisopod: {
		inherit: true,
		species: "Golisopod",
		types: ["Bug", "Ghost"],
		baseStats: {
			hp: 79,
			atk: 125,
			def: 120,
			spa: 45,
			spd: 85,
			spe: 111
		},
		abilities: {
			0: "Emergency Exit",
			1: "Magic Guard",
			H: "Stakeout"
		},
	},
	magcargo: {
		inherit: true,
		species: "Magcargo",
		types: ["Bug", "Fire"],
		baseStats: {
			hp: 60,
			atk: 70,
			def: 140,
			spa: 130,
			spd: 140,
			spe: 30
		},
		abilities: {
			0: "Magma Armor",
			1: "Drought",
			H: "Weak Armor"
		},
	},
	shiftry: {
		inherit: true,
		species: "Shiftry",
		types: ["Grass", "Flying"],
		baseStats: {
			hp: 105,
			atk: 135,
			def: 60,
			spa: 130,
			spd: 60,
			spe: 80
		},
		abilities: {
			0: "Swift Swim",
			1: "Reckless",
			H: "Rock Head"
		},
	},
	victreebel: {
		inherit: true,
		species: "Victreebel",
		types: ["Grass", "Water"],
		baseStats: {
			hp: 80,
			atk: 105,
			def: 105,
			spa: 100,
			spd: 100,
			spe: 80
		},
		abilities: {
			0: "Thick Fat",
			1: "Rain Dish",
			H: "Water Compaction"
		},
	},
	meganium: {
		inherit: true,
		species: "Meganium",
		types: ["Grass", "Dragon"],
		baseStats: {
			hp: 120,
			atk: 70,
			def: 120,
			spa: 90,
			spd: 120,
			spe: 50
		},
		abilities: {
			0: "Contrary",
			1: "Bulletproof",
			H: "Poison Heal"
		},
	},
	jynx: {
		inherit: true,
		species: "Jynx",
		types: ["Ghost", "Ice"],
		baseStats: {
			hp: 115,
			atk: 50,
			def: 55,
			spa: 130,
			spd: 110,
			spe: 110
		},
		abilities: {
			0: "Prankster",
			1: "Snow Warning",
			H: "Dry Skin"
		},
	},
	porygonz: {
		inherit: true,
		species: "Porygon-Z",
		types: ["Ghost", "Electric"],
		baseStats: {
			hp: 95,
			atk: 40,
			def: 80,
			spa: 145,
			spd: 105,
			spe: 105
		},
		abilities: {
			0: "Compound Eyes",
			1: "Download",
			H: "Levitate"
		},
	},
	guzzlord: {
		inherit: true,
		species: "Guzzlord",
		types: ["Ghost", "Dragon"],
		baseStats: {
			hp: 113,
			atk: 71,
			def: 67,
			spa: 139,
			spd: 67,
			spe: 113
		},
		abilities: {
			0: "Beast Boost",
			1: "Gluttony",
			H: "Unaware"
		},
	},
	victini: {
		inherit: true,
		species: "Victini",
		types: ["Fire", "Fairy"],
		baseStats: {
			hp: 80,
			atk: 110,
			def: 85,
			spa: 110,
			spd: 85,
			spe: 100
		},
		abilities: {
			0: "Victory Star",
			1: "Pixilate",
			H: "Competitive"
		},
	},
	talonflame: {
		inherit: true,
		species: "Talonflame",
		types: ["Fire", "Flying"],
		baseStats: {
			hp: 78,
			atk: 101,
			def: 71,
			spa: 94,
			spd: 69,
			spe: 126
		},
		abilities: {
			0: "Reckless",
			1: "Moxie",
			H: "Aerilate"
		},
	},
	salazzle: {
		inherit: true,
		species: "Salazzle",
		types: ["Fire", "Poison"],
		baseStats: {
			hp: 88,
			atk: 64,
			def: 80,
			spa: 126,
			spd: 85,
			spe: 127
		},
		abilities: {
			0: "Corrosion",
			1: "Sheer Force",
			H: "Shed Skin"
		},
	},
	probopass: {
		inherit: true,
		species: "Probopass",
		types: ["Electric", "Ground"],
		baseStats: {
			hp: 75,
			atk: 55,
			def: 145,
			spa: 105,
			spd: 150,
			spe: 40
		},
		abilities: {
			0: "Magnet Pull",
			1: "Levitate",
			H: "Sand Force"
		},
	},
	dunsparce: {
		inherit: true,
		species: "Dunsparce",
		types: ["Electric", "Dragon"],
		baseStats: {
			hp: 150,
			atk: 100,
			def: 95,
			spa: 65,
			spd: 95,
			spe: 45
		},
		abilities: {
			0: "Serene Grace",
			1: "Volt Absorb",
			H: "Galvanize"
		},
	},
	rotomfan: {
		inherit: true,
		species: "Rotom-Fan",
		types: ["Electric", "Fairy"],
		baseStats: {
			hp: 50,
			atk: 65,
			def: 127,
			spa: 115,
			spd: 127,
			spe: 86
		},
		abilities: {
			0: "Levitate"
		},
	},
};
