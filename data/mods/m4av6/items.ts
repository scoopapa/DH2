export const Items: {[k: string]: ModdedItemData} = {
	draconite: {
		name: "Draconite",
		spritenum: 586,
		megaStone: "Dragonite-Mega",
		megaEvolves: "Dragonite",
		itemUser: ["Dragonite"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1001,
		gen: 8,
		desc: "If held by a Dragonite, this item allows it to Mega Evolve in battle.",
	},
	hydreigonite: {
		name: "Hydreigonite",
		spritenum: 585,
		megaStone: "Hydreigon-Mega",
		megaEvolves: "Hydreigon",
		itemUser: ["Hydreigon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1002,
		gen: 8,
		desc: "If held by a Hydreigon, this item allows it to Mega Evolve in battle.",
	},
	goodranite: {
		name: "Goodranite",
		spritenum: 577,
		megaStone: "Goodra-Mega",
		megaEvolves: "Goodra",
		itemUser: ["Goodra"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1003,
		gen: 8,
		desc: "If held by a Goodra, this item allows it to Mega Evolve in battle.",
	},
	kommoonite: {
		name: "Kommo-onite",
		spritenum: 580,
		megaStone: "Kommo-o-Mega",
		megaEvolves: "Kommo-o",
		itemUser: ["Kommo-o"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1004,
		gen: 8,
		desc: "If held by a Kommo-o, this item allows it to Mega Evolve in battle.",
	},
	dragapultite: {
		name: "Dragapultite",
		spritenum: 600,
		megaStone: "Dragapult-Mega",
		megaEvolves: "Dragapult",
		itemUser: ["Dragapult"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1005,
		gen: 8,
		desc: "If held by a Dragapult, this item allows it to Mega Evolve in battle.",
	},
	corviknite: {
		name: "Corviknite",
		spritenum: 578,
		megaStone: "Corviknight-Mega",
		megaEvolves: "Corviknight",
		itemUser: ["Corviknight"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1006,
		gen: 8,
		desc: "If held by a Corviknight, this item allows it to Mega Evolve in battle.",
	},
	orbeetlite: {
		name: "Orbeetlite",
		spritenum: 584,
		megaStone: "Orbeetle-Mega",
		megaEvolves: "Orbeetle",
		itemUser: ["Orbeetle"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1007,
		gen: 8,
		desc: "If held by an Orbeetle, this item allows it to Mega Evolve in battle.",
	},
	thievulite: {
		name: "Thievulite",
		spritenum: 591,
		megaStone: "Thievul-Mega",
		megaEvolves: "Thievul",
		itemUser: ["Thievul"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1008,
		gen: 8,
		desc: "If held by a Thievul, this item allows it to Mega Evolve in battle.",
	},
	toucannonite: {
		name: "Toucannonite",
		spritenum: 625,
		megaStone: "Toucannon-Mega",
		megaEvolves: "Toucannon",
		itemUser: ["Toucannon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1009,
		gen: 8,
		desc: "If held by a Toucannon, this item allows it to Mega Evolve in battle.",
	},
	gumshoosite: {
		name: "Gumshoosite",
		spritenum: 622,
		megaStone: "Gumshoos-Mega",
		megaEvolves: "Gumshoos",
		itemUser: ["Gumshoos"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1010,
		gen: 8,
		desc: "If held by a Gumshoos, this item allows it to Mega Evolve in battle.",
	},
	lycanroitedusk: {
		name: "Lycanroite-Dusk",
		spritenum: 602,
		megaStone: "Lycanroc-Dusk-Mega",
		megaEvolves: "Lycanroc-Dusk",
		itemUser: ["Lycanroc-Dusk"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1011,
		gen: 8,
		desc: "If held by a Lycanroc in its Dusk Form, this item allows it to Mega Evolve in battle.",
	},
	lycanroitemidday: {
		name: "Lycanroite-Midday",
		spritenum: 602,
		megaStone: "Lycanroc-Mega",
		megaEvolves: "Lycanroc",
		itemUser: ["Lycanroc"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1012,
		gen: 8,
		desc: "If held by a Lycanroc in its Midday Form, this item allows it to Mega Evolve in battle.",
	},
	lycanroitemidnight: {
		name: "Lycanroite-Midnight",
		spritenum: 602,
		megaStone: "Lycanroc-Midnight-Mega",
		megaEvolves: "Lycanroc-Midnight",
		itemUser: ["Lycanroc-Midnight"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1013,
		gen: 8,
		desc: "If held by a Lycanroc-Midnight, this item allows it to Mega Evolve in battle.",
	},
	vikavoltite: {
		name: "Vikavoltite",
		spritenum: 607,
		megaStone: "Vikavolt-Mega",
		megaEvolves: "Vikavolt",
		itemUser: ["Vikavolt"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1014,
		gen: 8,
		desc: "If held by a Vikavolt, this item allows it to Mega Evolve in battle.",
	},
	raichunite: {
		name: "Raichunite",
		spritenum: 628,
		megaStone: "Raichu-Mega",
		megaEvolves: "Raichu",
		itemUser: ["Raichu"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1015,
		gen: 8,
		desc: "If held by a Raichu, this item allows it to Mega Evolve in battle.",
	},
	clefabite: {
		name: "Clefabite",
		spritenum: 617,
		megaStone: "Clefable-Mega",
		megaEvolves: "Clefable",
		itemUser: ["Clefable"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1016,
		gen: 8,
		desc: "If held by a Clefable, this item allows it to Mega Evolve in battle.",
	},
	rillaboomite: {
		name: "Rillaboomite",
		spritenum: 613,
		megaStone: "Rillaboom-Mega",
		megaEvolves: "Rillaboom",
		itemUser: ["Rillaboom"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1017,
		gen: 8,
		desc: "If held by a Rillaboom, this item allows it to Mega Evolve in battle.",
	},
	cinderacite: {
		name: "Cinderacite",
		spritenum: 590,
		megaStone: "Cinderace-Mega",
		megaEvolves: "Cinderace",
		itemUser: ["Cinderace"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1018,
		gen: 8,
		desc: "If held by a Cinderace, this item allows it to Mega Evolve in battle.",
	},
	inteleite: {
		name: "Inteleite",
		spritenum: 608,
		megaStone: "Inteleon-Mega",
		megaEvolves: "Inteleon",
		itemUser: ["Inteleon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1019,
		gen: 8,
		desc: "If held by an Inteleon, this item allows it to Mega Evolve in battle.",
	},
}