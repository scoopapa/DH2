export const Items: {[itemid: string]: ModdedItemData} = {

		narwanite: {
			name: "Narwanite",
			spritenum: 596,
			megaStone: "Allmother Narwa",
			megaEvolves: "Narwa",
			itemUser: ["Narwa"],
			onTakeItem(item, source) {
				if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
				return true;
			},
			num: 1001,
			gen: 9,
	},
		malzenite: {
			name: "Malzenite",
			spritenum: 617,
			megaStone: "Primordial Malzeno",
			megaEvolves: "Malzeno",
			itemUser: ["Malzeno"],
			onTakeItem(item, source) {
				if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
				return true;
			},
			num: 1002,
			gen: 9,
	},
		magnamalite: {
			name: "Magnamalite",
			spritenum: 614,
			megaStone: "Scorned Magnamalo",
			megaEvolves: "Magnamalo",
			itemUser: ["Magnamalo"],
			onTakeItem(item, source) {
				if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
				return true;
			},
			num: 1003,
			gen: 9,
	},
		astalite: {
			name: "Astalite",
			spritenum: 613,
			megaStone: "Boltreaver Astalos",
			megaEvolves: "Astalos",
			itemUser: ["Astalos"],
			onTakeItem(item, source) {
				if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
				return true;
			},
			num: 1004,
			gen: 9,
	},
		mizutsunite: {
			name: "Mizutsunite",
			spritenum: 624,
			megaStone: "Soulseer Mizutsune",
			megaEvolves: "Mizutsune",
			itemUser: ["Mizutsune"],
			onTakeItem(item, source) {
				if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
				return true;
			},
			num: 1003,
			gen: 9,
	},
		rajanite: {
			name: "Rajanite",
			spritenum: 602,
			megaStone: "Furious Rajang",
			megaEvolves: "Rajang",
			itemUser: ["Rajang"],
			onTakeItem(item, source) {
				if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
				return true;
			},
			num: 1004,
			gen: 9,
	},
		rathianite: {
			name: "Rathianite",
			spritenum: 607,
			megaStone: "Dreadqueen Rathian",
			megaEvolves: "Rathian",
			itemUser: ["Rathian"],
			onTakeItem(item, source) {
				if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
				return true;
			},
			num: 1005,
			gen: 9,
	},
		rathalosite: {
			name: "Rathalosite",
			spritenum: 586,
			megaStone: "Dreadking Rathalos",
			megaEvolves: "Rathalos",
			itemUser: ["Rathalos"],
			onTakeItem(item, source) {
				if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
				return true;
			},
			num: 1006,
			gen: 9,
	},
		zinogrite: {
			name: "Zinogrite",
			spritenum: 590,
			megaStone: "Thunderlord Zinogre",
			megaEvolves: "Zinogre",
			itemUser: ["Zinogre"],
			onTakeItem(item, source) {
				if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
				return true;
			},
			num: 1007,
			gen: 9,
	},
		arzurite: {
			name: "Arzurite",
			spritenum: 585,
			megaStone: "Redhelm Arzuros",
			megaEvolves: "Arzuros",
			itemUser: ["Arzuros"],
			onTakeItem(item, source) {
				if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
				return true;
			},
			num: 1008,
			gen: 9,
	},
		lagombite: {
			name: "Lagombite",
			spritenum: 583,
			megaStone: "Snowbaron Lagombi",
			megaEvolves: "Lagombi",
			itemUser: ["Lagombi"],
			onTakeItem(item, source) {
				if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
				return true;
			},
			num: 1009,
			gen: 9,
	}	
};