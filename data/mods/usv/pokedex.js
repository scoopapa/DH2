'use strict';

exports.BattlePokedex = {
	/* For pokemon with two abilities use
	   abilities: {0: "Ability1Name", H: "Ability2Name"},
	   For a pokemon with three abilities use
	   abilities: {0: "Ability1Name", 1: "Ability2Name", H: "Ability3Name"}, */
	
  gumshoosub: {
		num: 735,
		species: "Gumshoos-UB",
		baseSpecies: "Gumshoos",
		forme: "Ultrabeast",
		formeLetter: "UB",
		types: ["Normal"],
		baseStats: {hp: 211, atk: 107, def: 97, spa: 17, spd: 67, spe: 71},
		abilities: {0: "Beast Boost", H:"Stakeout"},
	},
  raticateub: {
		num: 20,
		species: "Raticate-UB",
		baseSpecies: "Raticate",
		forme: "Ultrabeast",
		formeLetter: "UB",
		types: ["Normal", "Dragon"],
		baseStats: {hp: 181, atk: 97, def: 83, spa: 87, spd: 83, spe: 39},
		abilities: {0: "Hustle", 1: "Strong Jaw", H: "Thick Fat"},
	},
	salazzleub: {
		num: 758,
		species: "Salazzle-UB",
		baseSpecies: "Salazzle",
		forme: "Ultrabeast",
		formeLetter: "UB",
		types: ["Ice"],
		baseStats: {hp: 97, atk: 89, def: 43, spa: 101, spd: 137, spe: 89},
		abilities: {0: "Corrosion"}, /*Ability:Type Invert (Inverts type matchups while the Pokemon is on the field) */
	},  

};
