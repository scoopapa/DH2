"use strict";Object.defineProperty(exports, "__esModule", {value: true}); const Scripts = {
	unownStats: {
		unownp: {
			num: 201,
			species: "Unown-P",
			forme: "P",
			types: ["Bug", "Dark"],
			baseStats: {hp: 70, atk: 70, def: 115, spa: 140, spd: 70, spe: 115},
			abilities: {0: "Punk Rock"},
			otherFormes: ["unownm", "unowns", "unown"],
			heightm: 0.5,
			weightkg: 5,
			gender: "N",
		},
		unowns: {
			num: 201,
			species: "Unown-S",
			forme: "S",
			types: ["Bug", "Dark"],
			baseStats: {hp: 70, atk: 115, def: 115, spa: 70, spd: 70, spe: 140},
			abilities: {0: "Sheer Force"},
			otherFormes: ["unownm", "unownp", "unown"],
			heightm: 0.5,
			weightkg: 5,
			gender: "N",
		},
		unownm: {
			num: 201,
			species: "Unown-M",
			forme: "M",
			types: ["Bug", "Dark"],
			baseStats: {hp: 70, atk: 115, def: 140, spa: 70, spd: 115, spe: 70},
			abilities: {0: "Magic Guard"},
			otherFormes: ["unownp", "unowns", "unown"],
			heightm: 0.5,
			weightkg: 5,
			gender: "N",
		},	
	},
	onUnown: function( pokemon, unownStats ) {
		let pokemonid = toID( pokemon.set.species );
		let stats = unownStats[ pokemonid ];
		console.log( pokemonid )
		console.log( '-------------------------' )
		console.log( stats )
		pokemon.species.baseStats = stats.baseStats;
		pokemon.baseSpecies.baseStats = stats.baseStats;
		// for ( let statName in pokemon.species.baseStats ){
			
		// }
		console.log( pokemon.species.baseStats )
	},
}; exports.Scripts = Scripts;
