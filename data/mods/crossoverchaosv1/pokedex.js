'use strict';

exports.BattlePokedex = {
	/* For pokemon with two abilities use
	   abilities: {0: "Ability1Name", H: "Ability2Name"},
	   For a pokemon with three abilities use
	   abilities: {0: "Ability1Name", 1: "Ability2Name", H: "Ability3Name"}, */
	

  
	mewtwo: {
		inherit: true,
		otherFormes: ["mewtwomegax", "mewtwomegay", "mewtwoshadow", "mewtwoshadowburst"],
	},
	mewtwoshadow: {
		num: 150,
		species: "Mewtwo-Shadow", /* Pokken Tournament */
		baseSpecies: "Mewtwo",
		forme: "Shadow",
		formeLetter: "S",
		types: ["Psychic"],
		gender: "N",
		baseStats: {hp: 86, atk: 130, def: 85, spa: 164, spd: 85, spe: 130},
		abilities: {0: "Burst Mode"},
    		heightm: 2,
    		weightkg: 120,
		eggGroups: ["Undiscovered"],
	},
	mewtwoshadowburst: {
		num: 150,
		species: "Mewtwo-Shadow",
		baseSpecies: "Mewtwo",
		forme: "Burst",
		formeLetter: "B",
		types: ["Psychic", "Fighting"],
		gender: "N",
		baseStats: {hp: 86, atk: 210, def: 85, spa: 174, spd: 85, spe: 140},
		abilities: {0: "Burst Mode"},
 		heightm: 2,
  		weightkg: 120,
		eggGroups: ["Undiscovered"],
	},
	marisakirisame: {
		num: 5999988,
		species: "Marisa Kirisame", /* Touhou */
		types: ["Electric", "Psychic"],
		gender: "F",
		baseStats: {hp: 70, atk: 120, def: 60, spa: 150, spd: 80, spe: 120},
		abilities: {0: "Magician", 1: "Levitate", H: "Drizzle"},
	},
	deathwing: {
		num: 5999989,
		species: "Deathwing", /* World of Warcraft */
		types: ["Dragon", "Fire"],
		gender: "M",
		baseStats: {hp: 120, atk: 150, def: 100, spa: 140, spd: 100, spe: 90},
		abilities: {0: "Magma Armor"},
	},
	niko: {
		num: 5999990,
		species: "Niko", /* OneShot */
		types: ["Normal", "Ground"],
		gender: "N",
		baseStats: {hp: 82, atk: 95, def: 100, spa: 65, spd: 110, spe: 68},
		abilities: {0: "Sun Carrier", 1: "Technician", H: "Telepathy"},
	},
	sayori: {
		num: 5999991,
		species: "Sayori", /* Doki Doki Literature Club */
		types: ["Normal", "Fairy"],
		gender: "F",
		baseStats: {hp: 115, atk: 85, def: 85, spa: 95, spd: 85, spe: 95},
		abilities: {0: "Natural Cure", H: "Depression"},
		otherFormes: ["sayorihanged"],
	},
	sayorihanged: {
		num: 5999991,
		species: "Sayori-Hanged",
		baseSpecies: "Sayori",
		forme: "Hanged",
		formeLetter: "H",
		types: ["Normal", "Fairy"],
		gender: "F",
		baseStats: {hp: 115, atk: 85, def: 85, spa: 95, spd: 85, spe: 95},
		abilities: {0: "Natural Cure", H: "Depression"},
	},
	demigodofrock: {
		num: 5999992,
		species: "Demigod of Rock", /* Guitar Hero: Warriors of Rock */
		types: ["Rock", "Ghost"],
		gender: "M",
		baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100},
		abilities: {0: "Solid Rock"},
	},
	sora: {
		num: 5999993,
		species: "Sora", /* Sora and 100% Orange Juice */
		types: ["Fighting", "Flying"],
		gender: "F",
		baseStats: {hp: 75, atk: 120, def: 85, spa: 100, spd: 85, spe: 120},
		abilities: {0: "Motor Drive"},
    heightm: 1.55,
    weightkg: 43,
	},
	bigrig: {
		num: 5999994,
		species: "Big Rig", /* Big Rigs: Over the Road Racing */
		baseForme: "Reversed",
		types: ["Ghost", "Fire"],
		gender: "N",
		baseStats: {hp: 85, atk: 70, def: 70, spa: 70, spd: 50, spe: 255},
		abilities: {0: "Champion"},
		otherFormes: ["bigrigforwards"],
	},
	bigrigforwards: {
		num: 5999994,
		species: "Big Rig-Forwards",
		baseSpecies: "Big Rig",
		forme: "Forwards",
		formeLetter: "F",
		types: ["Ghost", "Fire"],
		gender: "N",
		baseStats: {hp: 85, atk: 70, def: 70, spa: 70, spd: 50, spe: 55},
		abilities: {0: "Heavy Metal"},
	},
	norn: {
		num: 5999995,
		species: "Norn", /* Katamari Series */
		types: ["Ice", "Fairy"],
		gender: "M",
		baseStats: {hp: 100, atk: 117, def: 56, spa: 87, spd: 125, spe: 115},
		abilities: {0: "Refrigerate", H: "Pixilate"},
	},
	pepsiman: {
		num: 5999996,
		species: "Pepsiman", /* Pepsiman */
		types: ["Water", "Steel"],
		gender: "M",
		baseStats: {hp: 110, atk: 90, def: 115, spa: 80, spd: 50, spe: 155},
		abilities: {0: "Bulletproof", 1: "Speed Boost", H: "Refreshing Pepsi"},
	},
	heavy: {
		num: 5999997,
		species: "Heavy", /* Team Fortress 2 */
		types: ["Normal"],
		gender: "M",
		baseStats: {hp: 150, atk: 80, def: 99, spa: 80, spd: 99, spe: 77},
		abilities: {0: "Thick Fat"},
	},
	reimuhakurei: {
		num: 5999998,
		species: "Reimu Hakurei", /* Touhou */
		types: ["Flying", "Psychic"],
		gender: "F",
		baseStats: {hp: 110, atk: 80, def: 110, spa: 100, spd: 140, spe: 60},
		abilities: {0: "Super Luck", H: "Sacred Barrier"},
	},
	crow: {
		num: 5999999,
		species: "Crow", /* Brawl Stars */
		types: ["Poison", "Flying"],
		gender: "N",
		baseStats: {hp: 60, atk: 87, def: 53, spa: 117, spd: 53, spe: 130},
		abilities: {0: "Merciless", 1: "Early Bird", H: "Extra Toxic"},
	},
// 	shovelknight: {
//     num: 6000043,
//     species: "Shovel Knight", /* Shovel Knight */
//     types: ["Steel", "Ground"],
//     gender: "M",
//     baseStats: {hp: 60, atk: 120, def: 130, spa: 60, spd: 130, spe: 90},
//     abilities: {0: "Battle Armor"},
// },
// cuphead: {
//     num: 6000044,
//     species: "Cuphead", /* Cuphead */
//     types: ["Water", "Dark"],
//     gender: "M",
//     baseStats: {hp: 80, atk: 80, def: 60, spa: 120, spd: 60, spe: 100},
//     abilities: {0: "Soul-Heart"},
// },
// shantae: {
//     num: 6000045,
//     species: "Shantae", /* Shantae */
//     types: ["Psychic", "Normal"],
//     gender: "F",
//     baseStats: {hp: 100, atk: 120, def: 70, spa: 110, spd: 90, spe: 100},
//     abilities: {0: "Magic Guard"},
// },

// chainchomp: {
//     num: 6000046,
//     species: "Chain Chomp", /* Super Mario Bros */
//     types: ["Steel"],
//     gender: "M",
//     baseStats: {hp: 50, atk: 105, def: 185, spa: 55, spd: 75, spe: 20},
//     abilities: {0: "Strong Jaw", 1: "Steelworker", 2: "Unchained"},
// },
// isabelle: {
//     num: 6000047,
//     species: "Isabelle", /* Animal Crossing */
//     types: ["Normal"],
//     gender: "F",
//     baseStats: {hp: 100, atk: 55, def: 100, spa: 55, spd: 100, spe: 60},
//     abilities: {0: "Friend Guard", 1: "Flower Gift", 2: "Harvest"},
// },
// amaterasu: {
//     num: 6000048,
//     species: "Amaterasu", /* Ōkami */
//     types: ["Fire"],
//     gender: "F",
//     baseStats: {hp: 70, atk: 110, def: 80, spa: 120, spd: 90, spe: 130},
//     abilities: {0: "Astral Pouch"},
// },
// 	mario: {
//     num: 6000049,
//     species: "Mario", /* Super Mario Bros */
//     types: ["Normal", "Ground"],
//     gender: "M",
//     baseStats: {hp: 90, atk: 120, def: 90, spa: 70, spd: 90, spe: 110},
//     abilities: {0: "Steelworker"},
// 	},
// mariofire: {
//     num: 6000049,
//     species: "Mario-Fire", /* Super Mario Bros */
//     types: ["Ground", "Fire"],
//     gender: "M",
//     baseStats: {hp: 90, atk: 70, def: 85, spa: 140, spd: 85, spe: 100},
//     abilities: {0: "Steelworker"},
// 	},
// marioice: {
//     num: 6000049,
//     species: "Mario-Ice", /* Super Mario Bros */
//     types: ["Ground", "Ice"],
//     gender: "M",
//     baseStats: {hp: 90, atk: 50, def: 115, spa: 160, spd: 115, spe: 40},
//     abilities: {0: "Steelworker"},  
// 	},
// mariopropeller: {
//     num: 6000049,
//     species: "Mario-Propeller", /* Super Mario Bros */
//     types: ["Normal", "Flying"],
//     gender: "M",
//     baseStats: {hp: 90, atk: 140, def: 70, spa: 70, spd: 70, spe: 130},
//     abilities: {0: "Steelworker"},
// 	},
// sonic: { 
// 	 num: 6000050,
//     species: "Sonic", /* Sonic the Hedgehog */
//     types: ["Normal"],
//     gender: "M",
//     baseStats: {hp: 70, atk: 135, def: 60, spa: 95, spd: 60, spe: 150},
//     abilities: {0: "Speed Boost"},
// 	},
// sonicsuper: {
//     num: 6000050,
//     species: "Sonic-Super", /* Sonic the Hedgehog */
//     types: ["Flying", "Normal"],
//     gender: "M",
//     baseStats: {hp: 70, atk: 160, def: 60, spa: 160, spd: 60, spe: 160},
//     abilities: {0: "Aerilate"},
// 	},
	
};
