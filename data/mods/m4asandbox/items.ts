export const Items: {[itemid: string]: ModdedItemData} = {
	megastone1: {
		name: "Mega Stone 1",
		spritenum: 578,
		onTakeItem(item, source) {
			return false;
		},
		num: -2000,
		gen: 8,
		desc: "If held by any Pokémon with a certain nickname, this item allows it to Mega Evolve in battle.",
	},
	megastone2: {
		name: "Mega Stone 2",
		spritenum: 578,
		onTakeItem(item, source) {
			return false;
		},
		num: -2001,
		gen: 8,
		desc: "If held by any Pokémon with a certain nickname, this item allows it to Mega Evolve in battle.",
	},
	megastoneh: {
		name: "Mega Stone H",
		spritenum: 578,
		onTakeItem(item, source) {
			return false;
		},
		num: -2003,
		gen: 8,
		desc: "If held by any Pokémon with a certain nickname, this item allows it to Mega Evolve in battle.",
	},
	porygoditez: {
		name: "Porygodite-Z",
		spritenum: 578,
		megaStone: "Porygod-Z-Mega",
		megaEvolves: "Porygon-Z",
		itemUser: ["Porygon-Z"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -5000,
		gen: 8,
		desc: "Please do not confuse this for Porygonite-Z because it's not that",
	},
	pichunite: {
		name: "Pichunite",
		spritenum: 578,
		megaStone: "Pichu-Spiky-eared-Mega",
		megaEvolves: "Pichu-Spiky-eared",
		itemUser: ["Pichu-Spiky-eared"],
		onTakeItem(item, source) {
			if (source.species.name.startsWith('Pichu-Spiky-eared')) return false;
			return true;
		},
		num: -5001,
		gen: 8,
		desc: "If held by a Spiky-eared Pichu, this item allows it to Mega Evolve in battle.",
	},
	floettite: {
		name: "Floettite",
		spritenum: 578,
		megaStone: "Floette-Eternal-Mega",
		megaEvolves: "Floette-Eternal",
		itemUser: ["Floette-Eternal"],
		onTakeItem(item, source) {
			if (source.species.name.startsWith('Floette-Eternal')) return false;
			return true;
		},
		num: -5002,
		gen: 8,
		desc: "If held by a Floette with an Eternal Flower, this item allows it to Mega Evolve in battle.",
	},
	meltanite: {
		name: "Meltanite",
		spritenum: 578,
		megaStone: "Meltan-Mega",
		megaEvolves: "Meltan",
		itemUser: ["Meltan"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -5003,
		gen: 8,
		desc: "If held by a Meltan, this item allows it to Mega Evolve in battle.",
	},
	stoutlanditeu: {
		name: "Stoutlandite-U",
		spritenum: 578,
		megaStone: "Stoutland-Mega-U",
		megaEvolves: "Stoutland",
		itemUser: ["Stoutland"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -5004,
		gen: 8,
		desc: "If held by a Stoutland, this item allows it to Mega Evolve differently in battle...!",
	},
/*
	mossysandwich: {
		name: "Mossy Sandwich",
		spritenum: 578,
		megaStone: "Toxtricity-Mega",
		megaEvolves: "Toxtricity",
		itemUser: ["Toxtricity"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -5000,
		gen: 8,
		desc: "Mossy Sandwich's stone for the submission sandbox.",
	},
	ausma: {
		name: "Ausma",
		spritenum: 578,
		megaStone: "Hawlucha-Mega-Ausma",
		megaEvolves: "Hawlucha",
		itemUser: ["Hawlucha"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -5000,
		gen: 8,
		desc: "Ausma's stone for the submission sandbox.",
	},
	bitbitio: {
		name: "BitBitio",
		spritenum: 578,
		megaStone: "Toxtricity-Mega",
		megaEvolves: "Toxtricity",
		itemUser: ["Toxtricity"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -5000,
		gen: 8,
		desc: "BitBitio's stone for the submission sandbox.",
	},
	magmajudis: {
		name: "Magmajudis",
		spritenum: 578,
		megaStone: "Hawlucha-Mega-Magmajudis",
		megaEvolves: "Hawlucha",
		itemUser: ["Hawlucha"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -5000,
		gen: 8,
		desc: "Magmajudis's stone for the submission sandbox.",
	},
	blueray: {
		name: "BlueRay",
		spritenum: 578,
		megaStone: "Hawlucha-Mega-BlueRay",
		megaEvolves: "Hawlucha",
		itemUser: ["Hawlucha"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -5000,
		gen: 8,
		desc: "BlueRay's stone for the submission sandbox.",
	},
	inkbug: {
		name: "inkbug",
		spritenum: 578,
		megaStone: "Wishiwashi-Mega",
		megaEvolves: "Wishiwashi",
		itemUser: ["Wishiwashi"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -5000,
		gen: 8,
		desc: "inkbug's stone for the submission sandbox.",
	},
*/
};
