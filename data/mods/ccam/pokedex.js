'use strict';

/**@type {{[k: string]: TemplateData}} */
let BattlePokedex = {
  bronzong: {
    inherit: true,
    abilities: {0: "Levitate", 1: "Heatproof", H: "Time Chime"},
    },
  chingling: {
    inherit: true,
    abilities: {0: "Levitate", H: "Time Chime"},
    },
   chimecho: {
    inherit: true,
    abilities: {0: "Levitate", H: "Time Chime"},
    },
	porygonz: {
    inherit: true,
    abilities: {0: "Adaptability", 1: "Cheat Code", H: "Analytic"},
    },
	celebi: {
    inherit: true,
    abilities: {0: "Natural Cure", H: "Magician"},
    },
	inkay: {
    inherit: true,
    abilities: {0: "Contrary", 1: "Suction Cups", H: "Backmask"},
    },
	malamar: {
    inherit: true,
    abilities: {0: "Contrary", 1: "Suction Cups", H: "Backmask"},
    },
	meloetta: {
    inherit: true,
    abilities: {0: "Serene Grace", H: "Backmask"},
    },
	smoochum: {
    inherit: true,
    abilities: {0: "Backmask", 1: "Forewarn", H: "Hydration"},
    },
	jynx: {
    inherit: true,
    abilities: {0: "Backmask", 1: "Forewarn", H: "Hydration"},
    },
	blacephalon: {
    inherit: true,
    abilities: {0: "Beast Boost", H: "Reckless"},
    },
	buzzwole: {
    inherit: true,
    abilities: {0: "Beast Boost", H: "Bloodsucker"},
    },
	celesteela: {
    inherit: true,
    abilities: {0: "Beast Boost", H: "Botanist"},
    },
	guzzlord: {
    inherit: true,
    abilities: {0: "Beast Boost", H: "Gluttony"},
    },
	kartana: {
    inherit: true,
    abilities: {0: "Beast Boost", H: "Hyper Cutter"},
    },
	poipole: {
    inherit: true,
    abilities: {0: "Beast Boost", H: "Merciless"},
    },
	naganadel: {
    inherit: true,
    abilities: {0: "Beast Boost", H: "Merciless"},
    },
	nihilego: {
    inherit: true,
    abilities: {0: "Beast Boost", H: "Levitate"},
    },
	pheromosa: {
    inherit: true,
    abilities: {0: "Beast Boost", H: "Queenly Majesty"},
    },
	stakataka: {
    inherit: true,
    abilities: {0: "Beast Boost", H: "Bulletproof"},
    },
	xurkitree: {
    inherit: true,
    abilities: {0: "Beast Boost", H: "Illuminate"},
    },
	wormadam: {
    inherit: true,
    abilities: {0: "Anticipation", 2: "Acclimate", H: "Overcoat"},
    },
	wormadamsandy: {
    inherit: true,
    abilities: {0: "Anticipation", 2: "Acclimate", H: "Overcoat"},
    },
	wormadamtrash: {
    inherit: true,
    abilities: {0: "Anticipation", 2: "Acclimate", H: "Overcoat"},
    },
	rotom: {
    inherit: true,
    abilities: {0: "Levitate",  H: "Motor Drive"},
    },
	rotomwash: {
    inherit: true,
    abilities: {0: "Levitate",  H: "Overflow"},
    },
	rotomheat: {
    inherit: true,
    abilities: {0: "Levitate",  H: "White Smoke"},
    },
	rotommow: {
    inherit: true,
    abilities: {0: "Levitate",  H: "Mow Down"},
    },
	rotomfrost: {
    inherit: true,
    abilities: {0: "Levitate",  H: "Refrigerate"},
    },
	rotomfan: {
    inherit: true,
    abilities: {0: "Levitate",  H: "Jetstream"},
    },
	meloettapirouette: {
    inherit: true,
    abilities: {0: "Serene Grace",  H: "Dancer"},
    },
	tepig: {
    inherit: true,
    abilities: {0: "Blaze", 1: "Mud Bath",  H: "Thick Fat"},
    },
	pignite: {
    inherit: true,
    abilities: {0: "Blaze", 1: "Mud Bath",  H: "Thick Fat"},
    },
	emboar: {
    inherit: true,
    abilities: {0: "Blaze", 1: "Mud Bath",  H: "Reckless"},
    },
	stunfisk: {
    inherit: true,
    abilities: {0: "Mud Bath", 1: "Overflow", H: "Limber"},
    },
	quagsire: {
    inherit: true,
    abilities: {0: "Mud Bath", 1: "Water Absorb", H: "Unaware"},
    },
	dhelmise: {
    inherit: true,
    abilities: {0: "Steelworker",  H: "Overflow"},
    },
	masquerain: {
    inherit: true,
    abilities: {0: "Intimidate", 1: "Overflow", H: "Motor Drive"},
    },
	piplup: {
    inherit: true,
    abilities: {0: "Torrent", 1: "Overflow",  H: "Defiant"},
    },
	prinplup: {
    inherit: true,
    abilities: {0: "Torrent", 1: "Overflow",  H: "Defiant"},
    },
	empoleon: {
    inherit: true,
    abilities: {0: "Torrent", 1: "Overflow",  H: "Defiant"},
    },
	lotad: {
    inherit: true,
    abilities: {0: "Swift Swim", 1: "Rain Dish",  H: "Overflow"},
    },
	lombre: {
    inherit: true,
    abilities: {0: "Swift Swim", 1: "Rain Dish",  H: "Overflow"},
    },
	ludicolo: {
    inherit: true,
    abilities: {0: "Swift Swim", 1: "Rain Dish",  H: "Overflow"},
    },
	gastrodoneast: {
		num: 423,
		forme: "East",
		baseSpecies: "West",
		types: ["Water", "Ground"],
		baseStats: {hp: 111, atk: 83, def: 68, spa: 92, spd: 82, spe: 39},
		abilities: {0: "Sticky Hold", 1: "Poison Heal", H: "Sand Force"},
		heightm: 0.9,
		weightkg: 29.9,
		color: "Purple",
		prevo: "shellos",
		evoLevel: 30,
		eggGroups: ["Water 1", "Amorphous"],
		otherForms: ["gastrodoneast"],
	},
};

exports.BattlePokedex = BattlePokedex;
