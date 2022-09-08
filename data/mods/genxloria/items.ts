export const Items: {[itemid: string]: ModdedItemData} = {
	missingbonei: {
		name: "Missing Bone I",
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1073) || pokemon.baseSpecies.num === 1073) {
				return false;
			}
			return true;
		},
		forcedForme: "Irrigator-Completed",
		itemUser: ["Irrigator-Completed"],
		desc: "If held by an Irrigator, this item changes it to its Completed form.",
		gen: 8,
	},

	missingboneg: {
		name: "Missing Bone G",
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1074) || pokemon.baseSpecies.num === 1074) {
				return false;
			}
			return true;
		},
		forcedForme: "Galapagunk-Completed",
		itemUser: ["Galapagunk-Completed"],
		desc: "If held by a Galapagunk, this item changes it to its Completed form.",
		gen: 8,
	},
	
// Mega Stones
	jaibastionite: {
		name: "Jaibastionite",
		spritenum: 578,
		megaStone: "Jaibastion-Mega",
		megaEvolves: "Jaibastion",
		itemUser: ["Jaibastion"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 8,
		desc: "If held by a Jaibastion, this item allows it to Mega Evolve in battle.",
	},
	sulfuramite: {
		name: "Sulfuramite",
		spritenum: 578,
		megaStone: "Sulfuram-Mega",
		megaEvolves: "Sulfuram",
		itemUser: ["Sulfuram"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 8,
		desc: "If held by a Sulfuram, this item allows it to Mega Evolve in battle.",
	},
	minkfinitite: {
		name: "Minkfinitite",
		spritenum: 578,
		megaStone: "Minkfinit-Mega",
		megaEvolves: "Minkfinit",
		itemUser: ["Minkfinit"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 8,
		desc: "If held by a Minkfinit, this item allows it to Mega Evolve in battle.",
	},
	espladite: {
		name: "Espladite",
		spritenum: 578,
		megaStone: "Esplada-Mega",
		megaEvolves: "Esplada",
		itemUser: ["Esplada"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 8,
		desc: "If held by an Esplada, this item allows it to Mega Evolve in battle.",
	},
	macawphite: {
		name: "Macawphite",
		spritenum: 578,
		megaStone: "Macawphony-Mega",
		megaEvolves: "Macawphony",
		itemUser: ["Macawphony"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 8,
		desc: "If held by a Macawphony, this item allows it to Mega Evolve in battle.",
	},
	arapaitanite: {
		name: "Arapaitanite",
		spritenum: 578,
		megaStone: "Arapaitan-Mega",
		megaEvolves: "Arapaitan",
		itemUser: ["Arapaitan"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 8,
		desc: "If held by an Arapaitan, this item allows it to Mega Evolve in battle.",
	},
	largotite: {
		name: "Largotite",
		spritenum: 578,
		megaStone: "Largotton-Mega",
		megaEvolves: "Largotton",
		itemUser: ["Largotton"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 8,
		desc: "If held by a Largotton, this item allows it to Mega Evolve in battle.",
	},
	luxrite: {
		name: "Luxrite",
		spritenum: 578,
		megaStone: "Luxray-Mega",
		megaEvolves: "Luxray",
		itemUser: ["Luxray"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 8,
		desc: "If held by a Luxray, this item allows it to Mega Evolve in battle.",
	},
	woodensite: {
		name: "Woodensite",
		spritenum: 578,
		megaStone: "Woodensect-Mega",
		megaEvolves: "Woodensect",
		itemUser: ["Woodensect"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 8,
		desc: "If held by a Woodensect, this item allows it to Mega Evolve in battle.",
	},
	frozunite: {
		name: "Frozunite",
		spritenum: 578,
		megaStone: "Frozuna-Mega",
		megaEvolves: "Frozuna",
		itemUser: ["Frozuna"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 8,
		desc: "If held by a Frozuna, this item allows it to Mega Evolve in battle.",
	},
	torkoalite: {
		name: "Torkoalite",
		spritenum: 578,
		megaStone: "Torkoal-Mega",
		megaEvolves: "Torkoal",
		itemUser: ["Torkoal"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 8,
		desc: "If held by a Torkoal, this item allows it to Mega Evolve in battle.",
	},
	torkoolite: {
		name: "Torkoolite",
		spritenum: 578,
		megaStone: "Torkool-Mega",
		megaEvolves: "Torkool",
		itemUser: ["Torkool"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 8,
		desc: "If held by a Torkool, this item allows it to Mega Evolve in battle.",
	},
	zetztreamite: {
		name: "Zetztreamite",
		spritenum: 578,
		megaStone: "Zetztream-Mega",
		megaEvolves: "Zetztream",
		itemUser: ["Zetztream"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 8,
		desc: "If held by a Zetztream, this item allows it to Mega Evolve in battle.",
	},
	arbokite: {
		name: "Arbokite",
		spritenum: 578,
		megaStone: "Arbok-Mega",
		megaEvolves: "Arbok",
		itemUser: ["Arbok"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 8,
		desc: "If held by an Arbok, this item allows it to Mega Evolve in battle.",
	},
	fairysnalite: {
		name: "Fairysnalite",
		spritenum: 578,
		megaStone: "Fairysnale-Mega",
		megaEvolves: "Fairysnale",
		itemUser: ["Fairysnale"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 8,
		desc: "If held by a Fairysnale, this item allows it to Mega Evolve in battle.",
	},
	grumpigite: {
		name: "Grumpigite",
		spritenum: 578,
		megaStone: "Grumpig-Mega",
		megaEvolves: "Grumpig",
		itemUser: ["Grumpig"],
		onTakeItem: false,
		gen: 8,
		desc: "If held by a Grumpig or Grumpig-Loria, this item allows it to Mega Evolve in battle.",
	},
	serperite: {
		name: "Serperite",
		spritenum: 578,
		megaStone: "Serperior-Mega",
		megaEvolves: "Serperior",
		itemUser: ["Serperior"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 8,
		desc: "If held by a Serperior, this item allows it to Mega Evolve in battle.",
	},
	emboarite: {
		name: "Emboarite",
		spritenum: 578,
		megaStone: "Emboar-Mega",
		megaEvolves: "Emboar",
		itemUser: ["Emboar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 8,
		desc: "If held by an Emboar, this item allows it to Mega Evolve in battle.",
	},
	samurite: {
		name: "Samurite",
		spritenum: 578,
		megaStone: "Samurott-Mega",
		megaEvolves: "Samurott",
		itemUser: ["Samurott"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 8,
		desc: "If held by a Samurott, this item allows it to Mega Evolve in battle.",
	},

};
