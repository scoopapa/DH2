'use strict';

exports.BattlePokedex = {
    gardevoirmememega: {
            num: 282,
            species: "Gardevoir-Memega",
            baseSpecies: "Gardevoir",
            forme: "Memega",
            formeLetter: "M",
            types: ["Psychic", "Fairy"],
            baseStats: {hp:68, atk:65, def:95, spa:155, spd:115, spe:120},
            abilities: {0: "Rule34"}, /* Ability: Rule34 (Male Pokemon on the field have their defensive stats lowered by 20% and female Pokemon on the field have their offensive stats lowered by 20% while a Pokemon with this ability is on the field. This Pokemon's secondary type alternates between Fairy and Water at the end of every turn. Innate ability: Liquid Voice) */
            heightm: 1.6,
	    weightkg: 48.4,
	    color: "White",
	    eggGroups: ["Amorphous"],
  },
    farfetchdmemega: {
             num: 83,
             species: "Farfetch'd-Memega",
             baseSpecies: "Farfetch'd",
             forme: "Memega",
             formeLetter: "M",
             types: ["Normal", "Dark"],
             baseStats: {hp: 52, atk: 217, def: 1, spa: 1, spd: 1, spe: 205,},
             abilities: {0: "Bird Stick"}, /* (Defense valuses of Pokemon with this ability are set to 1, prio does 60% less damage on field. Terrain-like effect is set in play where all moves crit for the next 5 turns) */
             heightm: 0.8,
	     weightkg: 15,
	     color: "Brown",
	     eggGroups: ["Flying", "Field"],
  },
    omastarmemega: {
             num: 139,
             species: "Omastar-Memega",
             baseSpecies: "Omastar",
             forme: "Memega",
             formeLetter: "M",
             types: ["Ice", "Water"],
             baseStats: {hp: 70, atk: 30, def: 150, spa: 155, spd: 150, spe: 30,},
             abilities: {0: "Holy Aura"}, /* (The name of the user is changed to "OMANYTE", every turn in chat the phrase "PraiseTheLordHelix" is shown, user heals 12% of HP in hail per turn or 6% in rain, damage of all attacks targetting this Pokemon decreased by 15%, randomly alternates between rain and hail between turns. Moves will never land a critical hit on this Pokemon) */
             heightm: 1,
	     weightkg: 35,
	     color: "Blue",
	     eggGroups: ["Water"],
  },
    venomothmemega: {
             num: 49,
             species: "Venomoth-Memega",
             baseSpecies: "venomoth",
             forme: "Memega",
             formeLetter: "M",
             types: ["Bug", "Poison"],
             baseStats: {hp: 70, atk: 45, def: 120, spa: 90, spd: 105, spe: 120,},
             abilities: {0: "AllTerrainVenomoth"}, /* All attacks aimed at this Pokemon have their power decreased by 10% and lose any added effects they have, Bug-type attacks do 4x more damage to all Dragon-types and if the opponent is a Dragonite then it is automatically Encored into Barrier whether or not they have the move */
             heightm: 1.5,
	     weightkg: 12.5,
	     color: "Purple",
	     eggGroups: ["Bug"],
  },
    whiscashhmemega: {
             num: 340,
             species: "Whiscash-Memega",
             baseSpecies: "whiscash",
             forme: "Memega",
             formeLetter: "M",
             types: ["Water", "Ground"],
             baseStats: {hp: 110, atk: 98, def: 93, spa: 76, spd: 91, spe: 90,},
             abilities: {0: "Fishy Aura"}, /* Every time the opponent has a positive stat boost this Pokemon changes to the Ghost-type, uses Spectral Thief if the opponent is not a Normal-type, and changes back into its original typing. If the opponent is a Normal-type, it uses Haze */
             heightm: 0.9,
	     weightkg: 23.6,
	     color: "Blue",
	     eggGroups: ["Water 2"],
  },
};
