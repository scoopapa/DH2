export const Items: {[itemid: string]: ModdedItemData} = {
	drampanite: {
		name: "Drampanite",
		spritenum: 0,
		megaStone: "Drampa-Santian-Mega",
		megaEvolves: "Drampa-Santian",
		itemUser: ["Drampa-Santian, Drampa-Santian-Mega"],
		forcedForme: "Drampa-Santian-Mega",
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 2585,
		gen: 9,
		isNonstandard: null,
	},
	flygonite: {
		name: "Flygonite",
		spritenum: 0,
		megaStone: "Flygon-Mega",
		megaEvolves: "Flygon",
		itemUser: ["Flygon, Flygon-Mega"],
		forcedForme: "Flygon-Mega",
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	tropiusite: {
		name: "Tropiusite",
		spritenum: 0,
		megaStone: "Tropius-Mega",
		megaEvolves: "Tropius",
		itemUser: ["Tropius, Tropius-Mega"],
		forcedForme: "Tropius-Mega",
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2,
		gen: 9,
	},
	golduckite: {
		name: "Golduckite",
		spritenum: 0,
		megaStone: "Golduck-Mega",
		megaEvolves: "Golduck",
		itemUser: ["Golduck, Golduck-Mega"],
		forcedForme: "Golduck-Mega",
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -3,
		gen: 9,
	},
	quagsirite: {
		name: "Quagsirite",
		spritenum: 0,
		megaStone: "Quagsire-Mega",
		megaEvolves: "Quagsire",
		itemUser: ["Quagsire, Quagsire-Mega"],
		forcedForme: "Quagsire-Mega",
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -4,
		gen: 9,
	},
	drapionite: {
		name: "Drapionite",
		spritenum: 0,
		megaStone: "Drapion-Mega",
		megaEvolves: "Drapion",
		itemUser: ["Drapion, Drapion-Mega"],
		forcedForme: "Drapion-Mega",
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -5,
		gen: 9,
	},
};
