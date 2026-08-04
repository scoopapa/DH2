export const Items: import("../../../sim/dex-items").ModdedItemDataTable = {
	hoohite: {
		name: "Ho-ohite",
		spritenum: 1001,
		megaStone: "Ho-Oh-Mega",
		megaEvolves: "Ho-Oh",
		itemUser: ["Ho-Oh"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
		rating: 3,
	},
	lugiaite: {
		name: "Lugiaite",
		spritenum: 1001,
		megaStone: "Lugia-Mega",
		megaEvolves: "Lugia",
		itemUser: ["Lugia"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2,
		gen: 9,
		rating: 3,
	},
	raikounite: {
		name: "Raikounite",
		spritenum: 1002,
		megaStone: "Raikou-Mega",
		megaEvolves: "Raikou",
		itemUser: ["Raikou"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -3,
		gen: 9,
		rating: 3,
	},
	enteinite: {
		name: "Enteinite",
		spritenum: 1003,
		megaStone: "Entei-Mega",
		megaEvolves: "Entei",
		itemUser: ["Entei"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -4,
		gen: 9,
		rating: 3,
	},
	suicunenite: {
		name: "Suicunenite",
		spritenum: 1004,
		megaStone: "Suicune-Mega",
		megaEvolves: "Suicune",
		itemUser: ["Suicune"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -5,
		gen: 9,
	},
	celebite: {
		name: "Celebite",
		spritenum: 1005,
		megaStone: "Celebi-Mega",
		megaEvolves: "Celebi",
		itemUser: ["Celebi"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -6,
		gen: 9,
		rating: 3,
	},
	octillerite: {
		name: "Octillerite",
		spritenum: 1006,
		megaStone: "Octillery-Mega",
		megaEvolves: "Octillery",
		itemUser: ["Octillery"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -7,
		gen: 9,
		rating: 3,
	},
	tyranitaritei: {
		name: "Tyranitarite I",
		spritenum: 1007,
		megaStone: "Tyranitar-Mega-I",
		megaEvolves: "Tyranitar",
		itemUser: ["Tyranitar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -8,
		gen: 9,
		rating: 3,
	},
	flygonite: {
		name: "Flygonite",
		spritenum: 1008,
		megaStone: "Flygon-Mega",
		megaEvolves: "Flygon",
		itemUser: ["Flygon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -9,
		gen: 9,
		rating: 3,
	},
	salamencitez: {
		name: "Salamencite Z",
		spritenum: 1009,
		megaStone: "Salamence-Mega-Z",
		megaEvolves: "Salamence",
		itemUser: ["Salamence"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -10,
		gen: 9,
		rating: 3,
	},
	metagrossitez: {
		name: "Metagrossite Z",
		spritenum: 1010,
		megaStone: "Metagross-Mega-Z",
		megaEvolves: "Metagross",
		itemUser: ["Metagross"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -11,
		gen: 9,
	},
	infernite: {
		name: "Infernite",
		spritenum: 1011,
		megaStone: "Infernape-Mega",
		megaEvolves: "Infernape",
		itemUser: ["Infernape"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -12,
		gen: 9,
		rating: 3,
	},
	empoleonite: {
		name: "Empoleonite",
		spritenum: 1012,
		megaStone: "Empoleon-Mega",
		megaEvolves: "Empoleon",
		itemUser: ["Empoleon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -13,
		gen: 9,
		rating: 3,
	},
	torterratite: {
		name: "Torterratite",
		spritenum: 1013,
		megaStone: "Torterra-Mega",
		megaEvolves: "Torterra",
		itemUser: ["Torterra"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -14,
		gen: 9,
		rating: 3,
	},
	magnezoneite: {
		name: "Magnezoneite",
		spritenum: 1014,
		megaStone: "Magnezone-Mega",
		megaEvolves: "Magnezone",
		itemUser: ["Magnezone"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -15,
		gen: 9,
		rating: 3,
	},
	regigigasite: {
		name: "Regigigasite",
		spritenum: 1015,
		megaStone: "Regigigas-Mega",
		megaEvolves: "Regigigas",
		itemUser: ["Regigigas"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -16,
		gen: 9,
		rating: 3,
	},
	hydreigonite: {
		name: "Hydreigonite",
		spritenum: 1016,
		megaStone: "Hydreigon-Mega",
		megaEvolves: "Hydreigon",
		itemUser: ["Hydreigon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -17,
		gen: 9,
		rating: 3,
	},
	volcaronanite: {
		name: "Volcaronanite",
		spritenum: 1017,
		megaStone: "Volcarona-Mega",
		megaEvolves: "Volcarona",
		itemUser: ["Volcarona"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -18,
		gen: 9,
		rating: 3,
	},
	keldeonite: {
		name: "Keldeonite",
		spritenum: 1018,
		megaStone: "Keldeo-Mega",
		megaEvolves: "Keldeo",
		itemUser: ["Keldeo"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -19,
		gen: 9,
		rating: 3,
	},
	haxorusite: {
		name: "Haxorusite",
		spritenum: 1019,
		megaStone: "Haxorus-Mega",
		megaEvolves: "Haxorus",
		itemUser: ["Haxorus"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -20,
		gen: 9,
		rating: 3,
	},
	braviarinite: {
		name: "Braviarinite",
		spritenum: 1020,
		megaStone: "Braviary-Mega",
		megaEvolves: "Braviary",
		itemUser: ["Braviary"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -21,
		gen: 9,
		rating: 3,
	},
	ferrothornite: {
		name: "Ferrothornite",
		spritenum: 1021,
		megaStone: "Ferrothorn-Mega",
		megaEvolves: "Ferrothorn",
		itemUser: ["Ferrothorn"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -22,
		gen: 9,
		rating: 3,
	},
	victorystar: {
		name: "Victory Star",
		spritenum: 1022,
		megaStone: "Victini-Perfected",
		megaEvolves: "Victini",
		itemUser: ["Victini"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -23,
		gen: 9,
		rating: 3,
	},
	tyrantrumite: {
		name: "Tyrantrumite",
		spritenum: 1023,
		megaStone: "Tyrantrum-Mega",
		megaEvolves: "Tyrantrum",
		itemUser: ["Tyrantrum"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -24,
		gen: 9,
		rating: 3,
	},
	aurorusite: {
		name: "Aurorusite",
		spritenum: 1024,
		megaStone: "Aurorus-Mega",
		megaEvolves: "Aurorus",
		itemUser: ["Aurorus"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -25,
		gen: 9,
		rating: 3,
	},
	goodratite: {
		name: "Goodratite",
		spritenum: 1025,
		megaStone: "Goodra-Mega",
		megaEvolves: "Goodra",
		itemUser: ["Goodra"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -26,
		gen: 9,
		rating: 3,
	},
	wishiwashinite: {
		name: "Wishiwashinite",
		spritenum: 1026,
		megaStone: "Wishiwashi-Mega",
		megaEvolves: "Wishiwashi",
		itemUser: ["Wishiwashi"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -27,
		gen: 9,
		rating: 3,
	},
	kommoonite: {
		name: "Kommo-onite",
		spritenum: 1027,
		megaStone: "Kommo-o-Mega",
		megaEvolves: "Kommo-o",
		itemUser: ["Kommo-o"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -28,
		gen: 9,
		rating: 3,
	},
	cinderaceite: {
		name: "Cinderaceite",
		spritenum: 1028,
		megaStone: "Cinderace-Mega",
		megaEvolves: "Cinderace",
		itemUser: ["Cinderace"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -29,
		gen: 9,
		rating: 3,
	},
	inteleonite: {
		name: "Inteleonite",
		spritenum: 1029,
		megaStone: "Inteleon-Mega",
		megaEvolves: "Inteleon",
		itemUser: ["Inteleon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -30,
		gen: 9,
		rating: 3,
	},
	rillaboomite: {
		name: "Rillaboomite",
		spritenum: 1030,
		megaStone: "Rillaboom-Mega",
		megaEvolves: "Rillaboom",
		itemUser: ["Rillaboom"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -31,
		gen: 9,
		rating: 3,
	},
	dragapultite: {
		name: "Dragapultite",
		spritenum: 1031,
		megaStone: "Dragapult-Mega",
		megaEvolves: "Dragapult",
		itemUser: ["Dragapult"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -32,
		gen: 9,
		rating: 3,
	},
	kingambitite: {
		name: "Kingambitite",
		spritenum: 1032,
		megaStone: "Kingambit-Mega",
		megaEvolves: "Kingambit",
		itemUser: ["Kingambit"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -33,
		gen: 9,
		rating: 3,
	},
	gholdengoite: {
		name: "Gholdengoite",
		spritenum: 1033,
		megaStone: "Gholdengo-Mega",
		megaEvolves: "Gholdengo",
		itemUser: ["Gholdengo"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -34,
		gen: 9,
		rating: 3,
	},
	archaludonite: {
		name: "Archaludonite",
		spritenum: 1034,
		megaStone: "Archaludon-Mega",
		megaEvolves: "Archaludon",
		itemUser: ["Archaludon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -35,
		gen: 9,
		rating: 3,
	},
	hardhat: {
		name: "Hard Hat",
		spritenum: 1035,
		shortDesc: "Prevents the recoil effect of moves.",
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		num: -36,
		gen: 9,
		rating: 3,
	},
	ancientsouldew: {
		name: "Ancient Soul Dew",
		spritenum: 1036,
		fling: {
			basePower: 30,
		},
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.num === 380 || pokemon.baseSpecies.num === 381) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.num === 380 || pokemon.baseSpecies.num === 381) {
				return this.chainModify(1.5);
			}
		},
		itemUser: ["Latios", "Latias"],
		num: -37,
		gen: 9,
		rating: 3,
		shortDesc: "If held by a Latias or a Latios, its Sp. Atk and Sp. Def are 1.5x.",
	},
};
