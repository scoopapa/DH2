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
		movepoolAdditions: ["dragontail"],
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

	// slate 6

	quagsire: {
		inherit: true,
		mega: "quagsiremega",
		megaName: "Quagsire-Mega",
		megaAbility: {0: "Marshland Lord"},
		megaStats: {hp: 95, atk: 110, def: 125, spa: 100, spd: 65, spe: 35},
		megaStone: "Quagsite",
		movepoolAdditions: ["flipturn"],
		megaCreator: "Sticky Fingaaa and IsoCon",
	},

	heatmor: {
		inherit: true,
		mega: "heatmormega",
		megaName: "Heatmor-Mega",
		megaType: ["Fire", "Ground"],
		megaAbility: {0: "Stakeout"},
		megaStats: {hp: 85, atk: 122, def: 76, spa: 105, spd: 106, spe: 90},
		megaStone: "Heatmorite",
		movepoolAdditions: ["powerwhip", "yawn"],
		megaCreator: "War Incarnate and NANI?!",
	},

	pangoro: {
		inherit: true,
		mega: "pangoromega",
		megaName: "Pangoro-Mega",
		megaAbility: {0: "Bad Influence"},
		megaStats: {hp: 95, atk: 134, def: 112, spa: 74, spd: 101, spe: 69},
		megaStone: "Pangoronite",
		megaCreator: "jazzmat",
	},

	// slate 7

	jumpluff: {
		inherit: true,
		mega: "jumpluffmega",
		megaName: "Jumpluff-Mega",
		megaAbility: {0: "Regenerator"},
		megaStats: {hp: 75, atk: 60, def: 100, spa: 70, spd: 125, spe: 135},
		megaStone: "Jumpluffite",
		movepoolAdditions: ["wish"],
		megaCreator: "DrPumpkinz and Paulluxx",
	},

	rhyperior: {
		inherit: true,
		mega: "rhyperiormega",
		megaName: "Rhyperior-Mega",
		megaAbility: {0: "Sap Sipper"},
		megaStats: {hp: 115, atk: 150, def: 160, spa: 65, spd: 85, spe: 60},
		megaStone: "Rhyperiorite",
		megaCreator: "BlueRay",
	},

	florges: {
		inherit: true,
		mega: "florgesmega",
		megaName: "Florges-Mega",
		megaAbility: {0: "Soul-Heart"},
		megaStats: {hp: 78, atk: 95, def: 78, spa: 132, spd: 184, spe: 85},
		megaStone: "Florgesite",
		megaCreator: "DrPumpkinz",
	},

	// slate 8

	skarmory: {
		inherit: true,
		mega: "skarmorymega",
		megaName: "Skarmory-Mega",
		megaAbility: {0: "Poison Point"},
		megaStats: {hp: 65, atk: 95, def: 158, spa: 40, spd: 105, spe: 102},
		megaStone: "Skarmorite",
		megaCreator: "EeveeGirl1380",
	},

	druddigon: {
		inherit: true,
		mega: "druddigonmega",
		megaName: "Druddigon-Mega",
		megaAbility: {0: "Petrification"},
		megaStats: {hp: 77, atk: 165, def: 120, spa: 60, spd: 115, spe: 48},
		megaStone: "Druddigonite",
		megaCreator: "Sticky Fingaaa and Paulluxx",
		movepoolAdditions: ["morningsun", "rockblast", "spikes"],
	},

	chesnaught: {
		inherit: true,
		mega: "chesnaughtmega",
		megaName: "Chesnaught-Mega",
		megaAbility: {0: "Flash Fire"},
		megaStats: {hp: 88, atk: 137, def: 142, spa: 74, spd: 95, spe: 94},
		megaStone: "Chesnite",
		megaCreator: "BlueRay",
		movepoolAdditions: ["bodypress", "icehammer"],
	},

	// slate 9

	skuntank: {
		inherit: true,
		mega: "skuntankmega",
		megaName: "Skuntank-Mega",
		megaAbility: {0: "Repulsive"},
		megaStats: {hp: 103, atk: 113, def: 107, spa: 86, spd: 86, spe: 84},
		megaStone: "Skuntankite",
		megaCreator: "Hematite",
	},

	emolga: {
		inherit: true,
		mega: "emolgamega",
		megaName: "Emolga-Mega",
		megaAbility: {0: "Technician"},
		megaStats: {hp: 55, atk: 120, def: 60, spa: 95, spd: 60, spe: 138},
		megaStone: "Emolganite",
		megaCreator: "BlueRay",
		movepoolAdditions: ["lowkick"],
	},

	avalugg: {
		inherit: true,
		mega: "avaluggmega",
		megaName: "Avalugg-Mega",
		megaAbility: {0: "Parental Bond"},
		megaStats: {hp: 95, atk: 137, def: 234, spa: 54, spd: 61, spe: 33},
		megaStone: "Avaluggite",
		megaCreator: "okispokis",
		movepoolAdditions: ["iciclecrash"],
	},

	// slate 10

	lapras: {
		inherit: true,
		mega: "laprasmega",
		megaName: "Lapras-Mega",
		megaAbility: {0: "Misty Surge"},
		megaStats: {hp: 130, atk: 95, def: 90, spa: 135, spd: 125, spe: 60},
		megaStone: "Laprasite",
		megaCreator: "ItzaDelta and Vipotis",
		movepoolAdditions: ["wish"],
	},

	pyroar: {
		inherit: true,
		mega: "pyroarmega",
		megaName: "Pyroar-Mega",
		megaAbility: {0: "Grassy Surge"},
		megaStats: {hp: 86, atk: 68, def: 92, spa: 149, spd: 86, spe: 126},
		megaStone: "Pyroarite",
		megaCreator: "The Damned",
		movepoolAdditions: ["energyball", "grassyterrain", "morningsun", "scorchingsands"],
	},

	carbink: {
		inherit: true,
		mega: "carbinkmega",
		megaName: "Carbink-Mega",
		megaAbility: {0: "Mirror Armor"},
		megaStats: {hp: 50, atk: 60, def: 155, spa: 120, spd: 155, spe: 60},
		megaStone: "Carbinite",
		megaCreator: "okispokis",
	},

	hoopa: {
		inherit: true,
		mega: "hoopamega",
		megaName: "Hoopa-Mega",
		megaAbility: {0: "Hyperspace Mayhem"},
		megaStats: {hp: 80, atk: 150, def: 70, spa: 160, spd: 160, spe: 80},
		megaStone: "Hoopanite",
		megaCreator: "DrPumpkinz",
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
