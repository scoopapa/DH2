export const Pokedex: {[speciesid: string]: ModdedSpeciesData} = {

	// slate 1

	gogoat: {
		inherit: true,
		mega: "gogoatmega",
		megaName: "Gogoat-Mega",
		megaAbility: {0: "Speed Boost"},
		megaStats: {hp: 123, atk: 135, def: 77, spa: 142, spd: 106, spe: 48},
		megaStone: "Gogoatite",
		megaCreator: "ausma",
	},

	clawitzer: {
		inherit: true,
		mega: "clawitzermega",
		megaName: "Clawitzer-Mega",
		megaType: ["Water", "Poison"],
		megaAbility: {0: "Download"},
		megaStats: {hp: 71, atk: 92, def: 110, spa: 127, spd: 111, spe: 89},
		megaStone: "Clawitzerite",
		movepoolAdditions: ["dragondance", "shellsidearm", "stoneedge"],
		megaCreator: "NANI?!",
	},

	// slate 2

	wormadamsandy: {
		inherit: true,
		mega: "wormadamsandymega",
		megaName: "Wormadam-Sandy-Mega",
		megaAbility: {0: "Poison Heal"},
		megaStats: {hp: 60, atk: 91, def: 155, spa: 74, spd: 105, spe: 39},
		megaStone: "Wormadamite",
		megaCreator: "Paulluxx and IsoCon",
	},

	drifblim: {
		inherit: true,
		mega: "drifblimmega",
		megaName: "Drifblim-Mega",
		megaAbility: {0: "Neutralizing Gas"},
		megaStats: {hp: 150, atk: 80, def: 44, spa: 145, spd: 89, spe: 90},
		megaStone: "Drifblimite",
		megaCreator: "BlueRay",
	},

	heliolisk: {
		inherit: true,
		mega: "helioliskmega",
		megaName: "Heliolisk-Mega",
		megaType: ["Electric", "Dragon"],
		megaAbility: {0: "Solar Power"},
		megaStats: {hp: 62, atk: 85, def: 62, spa: 129, spd: 114, spe: 129},
		megaStone: "Heliolite",
		movepoolAdditions: ["dragontail", "morningsun"],
		megaCreator: "lydian",
	},

	// slate 3

	escavalier: {
		inherit: true,
		mega: "escavaliermega",
		megaName: "Escavalier-Mega",
		megaAbility: {0: "Analytic"},
		megaStats: {hp: 70, atk: 155, def: 125, spa: 80, spd: 125, spe: 40},
		megaStone: "Escavalite",
		movepoolAdditions: ["leechlife"],
		megaCreator: "Bloopyghost",
	},

	haxorus: {
		inherit: true,
		mega: "haxorusmega",
		megaName: "Haxorus-Mega",
		megaAbility: {0: "Technician"},
		megaStats: {hp: 76, atk: 157, def: 130, spa: 90, spd: 90, spe: 97},
		megaStone: "Haxorite",
		megaCreator: "BlueRay",
	},

	mienshao: {
		inherit: true,
		mega: "mienshaomega",
		megaName: "Mienshao-Mega",
		megaType: ["Fighting", "Water"],
		megaAbility: {0: "Regenerator"},
		megaStats: {hp: 65, atk: 140, def: 105, spa: 100, spd: 85, spe: 115},
		megaStone: "Mienshaonite",
		movepoolAdditions: ["flipturn", "scald", "whirlpool"],
		megaCreator: "Paulluxx and Sticky Fingaa",
	},

	// slate 4

	espeon: {
		inherit: true,
		mega: "espeonmega",
		megaName: "Espeon-Mega",
		megaAbility: {0: "Mana Gate"},
		megaStats: {hp: 65, atk: 90, def: 85, spa: 160, spd: 105, spe: 120},
		megaStone: "Espeonite",
		movepoolAdditions: ["magicpowder", "speedswap"],
		megaCreator: "XtheGAMEmaster",
	},

	umbreon: {
		inherit: true,
		mega: "umbreonmega",
		megaName: "Umbreon-Mega",
		megaAbility: {0: "Partial Eclipse"},
		megaStats: {hp: 95, atk: 115, def: 115, spa: 60, spd: 155, spe: 85},
		megaStone: "Umbreonite",
		movepoolAdditions: ["mirrorcoat"],
		megaCreator: "Albatross and Paulluxx",
	},

	sylveon: {
		inherit: true,
		mega: "sylveonmega",
		megaName: "Sylveon-Mega",
		megaAbility: {0: "Tough Claws"},
		megaStats: {hp: 95, atk: 100, def: 100, spa: 140, spd: 120, spe: 70},
		megaStone: "Sylveonite",
		movepoolAdditions: ["grassknot", "stompingtantrum"],
		megaCreator: "Snowdrops and zxgzxg",
	},

	// slate 5

	zangoose: {
		inherit: true,
		mega: "zangoosemega",
		megaName: "Zangoose-Mega",
		megaAbility: {0: "Magic Guard"},
		megaStats: {hp: 73, atk: 145, def: 90, spa: 60, spd: 90, spe: 100},
		megaStone: "Zangoosite",
		movepoolAdditions: ["recover"],
		megaCreator: "Paulluxx and Sticky Fingaa",
	},

	seviper: {
		inherit: true,
		mega: "sevipermega",
		megaName: "Seviper-Mega",
		megaType: ["Poison", "Dark"],
		megaAbility: {0: "Dry Skin"},
		megaStats: {hp: 73, atk: 131, def: 78, spa: 100, spd: 78, spe: 98},
		megaStone: "Seviperite",
		movepoolAdditions: ["gunkshot", "powertrip"],
		megaCreator: "BlueRay",
	},

	solrock: {
		inherit: true,
		mega: "solrockmega",
		megaName: "Solrock-Mega",
		megaType: ["Rock", "Fire"],
		megaAbility: {0: "Levitate"},
		megaStats: {hp: 90, atk: 125, def: 95, spa: 55, spd: 90, spe: 105},
		megaStone: "Solrockite",
		movepoolAdditions: ["corrosivegas", "sacredfire", "uturn"],
		megaCreator: "Paulluxx and XtheGAMEmaster",
	},

	// crossover Megas

	lanturn: {
		inherit: true,
		mega: "lanturnmega",
		megaName: "Lanturn-Mega",
		megaStats: {hp: 125, atk: 68, def: 73, spa: 111, spd: 116, spe: 67},
		megaAbility: {0: "Alluring"},
		megaStone: "Lanturnite",
		megaCreator: "okispokis, and it was brought to Kalos by BlueRay",
		movepoolAdditions: ["recover"],
	},

	simisear: {
		inherit: true,
		mega: "simisearmega",
		megaName: "Simisear-Mega",
		megaType: ["Fire", "Fairy"],
		megaStats: {hp: 75, atk: 123, def: 68, spa: 123, spd: 88, spe: 121},
		megaAbility: {0: "Red Licorice"},
		megaStone: "Simisearite",
		megaCreator: "ausma, and it was brought to Kalos by Gekokeso",
		movepoolAdditions: ["calmmind", "dazzlinggleam", "drainingkiss", "mysticalfire", "playrough", "slackoff"],
	},

	aurorus: {
		inherit: true,
		mega: "aurorusmega",
		megaName: "Aurorus-Mega",
		megaType: ["Electric", "Ice"],
		megaStats: {hp: 123, atk: 77, def: 102, spa: 131, spd: 122, spe: 66},
		megaAbility: {0: "Diamond Dust"},
		megaStone: "Aurorite",
		megaCreator: "Hematite, and it was brought to Kalos by NANI?!",
		movepoolAdditions: ["paraboliccharge", "voltswitch"],
	},

};
