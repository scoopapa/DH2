export const Items: import("../../../sim/dex-items").ModdedItemDataTable = {
	hoohite: {
		name: "Ho-ohite",
		//spritenum: 0,
		megaStone: "Ho-Oh-Mega",
		megaEvolves: "Ho-Oh",
		itemUser: ["Ho-Oh"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	lugiaite: {
		name: "Lugiaite",
		//spritenum: 0,
		megaStone: "Lugia-Mega",
		megaEvolves: "Lugia",
		itemUser: ["Lugia"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	raikounite: {
		name: "Raikounite",
		//spritenum: 0,
		megaStone: "Raikou-Mega",
		megaEvolves: "Raikou",
		itemUser: ["Raikou"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	enteinite: {
		name: "Enteinite",
		//spritenum: 0,
		megaStone: "Entei-Mega",
		megaEvolves: "Entei",
		itemUser: ["Entei"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	suicunenite: {
		name: "Suicunenite",
		//spritenum: 0,
		megaStone: "Suicune-Mega",
		megaEvolves: "Suicune",
		itemUser: ["Suicune"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	celebite: {
		name: "Celebiite",
		//spritenum: 0,
		megaStone: "Celebi-Mega",
		megaEvolves: "Celebi",
		itemUser: ["Celebi"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	octillerite: {
		name: "Octillerite",
		//spritenum: 0,
		megaStone: "Octillery-Mega",
		megaEvolves: "Octillery",
		itemUser: ["Octillery"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	tyranitaritei: {
		name: "Tyranitarite I",
		//spritenum: 0,
		megaStone: "Tyranitar-Mega-I",
		megaEvolves: "Tyranitar",
		itemUser: ["Tyranitar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	flygonite: {
		name: "Flygonite",
		//spritenum: 0,
		megaStone: "Flygon-Mega",
		megaEvolves: "Flygon",
		itemUser: ["Flygon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	salamenceitez: {
		name: "Salamencite Z",
		//spritenum: 0,
		megaStone: "Salamence-Mega-Z",
		megaEvolves: "Salamence",
		itemUser: ["Salamence"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	metagrossitez: {
		name: "Metagrossite Z",
		//spritenum: 0,
		megaStone: "Metagross-Mega-Z",
		megaEvolves: "Metagross",
		itemUser: ["Metagross"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	infernite: {
		name: "Infernite",
		//spritenum: 0,
		megaStone: "Infernape-Mega",
		megaEvolves: "Infernape",
		itemUser: ["Infernape"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	empoleonite: {
		name: "Empoleonite",
		//spritenum: 0,
		megaStone: "Empoleon-Mega",
		megaEvolves: "Empoleon",
		itemUser: ["Empoleon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	torterratite: {
		name: "Torterratite",
		//spritenum: 0,
		megaStone: "Torterra-Mega",
		megaEvolves: "Torterra",
		itemUser: ["Torterra"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	magnezoneite: {
		name: "Magnezoneite",
		//spritenum: 0,
		megaStone: "Magnezone-Mega",
		megaEvolves: "Magnezone",
		itemUser: ["Magnezone"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	regigigasite: {
		name: "Regigigasite",
		//spritenum: 0,
		megaStone: "Regigigas-Mega",
		megaEvolves: "Regigigas",
		itemUser: ["Regigigas"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	hydreigonite: {
		name: "Hydreigonite",
		//spritenum: 0,
		megaStone: "Hydreigon-Mega",
		megaEvolves: "Hydreigon",
		itemUser: ["Hydreigon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	volcaronanite: {
		name: "Volcaronanite",
		//spritenum: 0,
		megaStone: "Volcarona-Mega",
		megaEvolves: "Volcarona",
		itemUser: ["Volcarona"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	keldeonite: {
		name: "Keldeonite",
		//spritenum: 0,
		megaStone: "Keldeo-Mega",
		megaEvolves: "Keldeo",
		itemUser: ["Keldeo"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	haxorusite: {
		name: "Haxorusite",
		//spritenum: 0,
		megaStone: "Haxorus-Mega",
		megaEvolves: "Haxorus",
		itemUser: ["Haxorus"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	braviarinite: {
		name: "Braviarinite",
		//spritenum: 0,
		megaStone: "Braviary-Mega",
		megaEvolves: "Braviary",
		itemUser: ["Braviary"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	ferrothornite: {
		name: "Ferrothornite",
		//spritenum: 0,
		megaStone: "Ferrothorn-Mega",
		megaEvolves: "Ferrothorn",
		itemUser: ["Ferrothorn"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	victorystar: {
		name: "Victory Star",
		//spritenum: 0,
		megaStone: "Victini-Perfected",
		megaEvolves: "Victini",
		itemUser: ["Victini"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	tyrantrumite: {
		name: "Tyrantrumite",
		//spritenum: 0,
		megaStone: "Tyrantrum-Mega",
		megaEvolves: "Tyrantrum",
		itemUser: ["Tyrantrum"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	aurorusite: {
		name: "Aurorusite",
		//spritenum: 0,
		megaStone: "Aurorus-Mega",
		megaEvolves: "Aurorus",
		itemUser: ["Aurorus"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	goodratite: {
		name: "Goodratite",
		//spritenum: 0,
		megaStone: "Goodra-Mega",
		megaEvolves: "Goodra",
		itemUser: ["Goodra"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	wishiwashinite: {
		name: "Wishiwashinite",
		//spritenum: 0,
		megaStone: "Wishiwashi-Mega",
		megaEvolves: "Wishiwashi",
		itemUser: ["Wishiwashi"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	kommoonite: {
		name: "Kommo-onite",
		//spritenum: 0,
		megaStone: "Kommo-o-Mega",
		megaEvolves: "Kommo-o",
		itemUser: ["Kommo-o"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	cinderaceite: {
		name: "Cinderaceite",
		//spritenum: 0,
		megaStone: "Cinderace-Mega",
		megaEvolves: "Cinderace",
		itemUser: ["Cinderace"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	inteleonite: {
		name: "Inteleonite",
		//spritenum: 0,
		megaStone: "Inteleon-Mega",
		megaEvolves: "Inteleon",
		itemUser: ["Inteleon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	rillaboomite: {
		name: "Rillaboomite",
		//spritenum: 0,
		megaStone: "Rillaboom-Mega",
		megaEvolves: "Rillaboom",
		itemUser: ["Rillaboom"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	dragapultite: {
		name: "Dragapultite",
		//spritenum: 0,
		megaStone: "Dragapult-Mega",
		megaEvolves: "Dragapult",
		itemUser: ["Dragapult"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	kingambitite: {
		name: "Kingambitite",
		//spritenum: 0,
		megaStone: "Kingambit-Mega",
		megaEvolves: "Kingambit",
		itemUser: ["Kingambit"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	gholdengoite: {
		name: "Gholdengoite",
		//spritenum: 0,
		megaStone: "Gholdengo-Mega",
		megaEvolves: "Gholdengo",
		itemUser: ["Gholdengo"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	archaludonite: {
		name: "Archaludonite",
		//spritenum: 0,
		megaStone: "Archaludon-Mega",
		megaEvolves: "Archaludon",
		itemUser: ["Archaludon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
	},
	hardhat: {
		name: "Hard Hat",
		shortDesc: "Prevents the recoil effect of moves.",
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
	},
	ancientsouldew: {
		name: "Ancient Soul Dew",
		spritenum: 459,
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
		num: -1,
		gen: 9,
		shortDesc: "If held by a Latias or a Latios, its Sp. Atk and Sp. Def are 1.5x.",
	},
};
