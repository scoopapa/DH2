export const Pokedex: {[speciesid: string]: ModdedSpeciesData} = {

	// slate 1

	gogoat: {
		inherit: true,
		mega: "gogoatmega",
		megaName: "Gogoat-Mega",
		megaType: ["Grass"],
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

};
