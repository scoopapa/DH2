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

	pyroar: {
		inherit: true,
		mega: "pyroarmega",
		megaName: "Pyroar-Mega",
		megaType: ["Fire", "Normal"],
		megaAbility: {0: "Pounce"},
		megaStats: {hp: 86, atk: 78, def: 119, spa: 139, spd: 66, spe: 119},
		megaWeightkg: 40.8,
		megaStone: "Pyroarite",
		movepoolAdditions: ["courtchange"],
		megaCreator: "Rosiario",
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
		megaStats: {hp: 62, atk: 85, def: 62, spa: 129, spd: 124, spe: 129},
		megaStone: "Heliolite",
		movepoolAdditions: ["dragontail", "morningsun"],
		megaCreator: "lydian",
	},

};
