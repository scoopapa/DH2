export const Items: {[itemid: string]: ModdedItemData} = {
	// SANDBOX CONTENT STARTS HERE
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
};
