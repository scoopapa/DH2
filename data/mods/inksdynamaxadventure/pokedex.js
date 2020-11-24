'use strict';

/**@type {{[k: string]: SpeciesData}} */
let BattlePokedex = {
cinderacegmax: {
	num: 815.5,
	species: "Cinderace-Gmax",
	baseSpecies: "Cinderace",
	forme: "G-Max",
	formeLetter: "G",
	types: ["Fire"],
	baseStats: {hp: 80, atk: 116, def: 75, spa: 65, spd: 75, spe: 119},
	abilities: {0: "Libero"},
},
hatterenegmax: {
	num: 858.5,
	species: "Hatterene-Gmax",
	baseSpecies: "Hatterene",
	forme: "G-Max",
	formeLetter: "G",
	types: ["Psychic", "Fairy"],
	baseStats: {hp: 57, atk: 90, def: 95, spa: 136, spd: 103, spe: 29},
	abilities: {0: "Tangling Hair"},
},
	
	
};

exports.BattlePokedex = BattlePokedex;