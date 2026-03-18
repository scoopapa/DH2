export const Items: {[itemid: string]: ModdedItemData} = {
  bondiumz: {
		name: "Bondium Z",
		desc: "If held by Luigi with Tri Attack, he can use Linking Lighthouse Launch.",
		spritenum: 631,
		onTakeItem: false,
		zMove: "Linking Lighthouse Launch",
		zMoveFrom: "Tri Attack",
		itemUser: ["Luigi"],
		num: -1,
		gen: 9,
	},
	suwakiumz: {
		name: "Suwakium Z",
		desc: "If held by Suwako with Muddy Water, she can use Froggy Braves the Wind and Rain.",
		spritenum: 633,
		onTakeItem: false,
		zMove: "Froggy Braves the Wind and Rain",
		zMoveFrom: "Muddy Water",
		itemUser: ["Suwako"],
		num: -2,
		gen: 9,
	},
	ananiumz: {
		name: "Ananium Z",
		desc: "If held by Ana with Biotic Grenade, she can use Nano Boost.",
		spritenum: 638,
		onTakeItem: false,
		zMove: "Nano Boost",
		zMoveFrom: "Biotic Grenade",
		itemUser: ["Ana"],
		num: -3,
		gen: 9,
	},
	metaknightiumz: {
		name: "Metaknightium Z",
		desc: "If held by Meta Knight with Dimensional Cape, he can use Galaxia Darkness.",
		spritenum: 646,
		onTakeItem: false,
		zMove: "Galaxia Darkness",
		zMoveFrom: "Dimensional Cape",
		itemUser: ["Meta Knight"],
		num: -4,
		gen: 9,
	},
	pittite: {
		name: "Pittite",
		spritenum: 576,
		megaStone: "Pit-Mega",
		megaEvolves: "Pit",
		itemUser: ["Pit", "Pit-Mega"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -5,
		gen: 9,
		desc: "If held by Pit, this item allows him to Mega Evolve in battle.",
	},
	bowsite: {
		name: "Bowsite",
		spritenum: 591,
		megaStone: "Bowser-Mega",
		megaEvolves: "Bowser",
		itemUser: ["Bowser", "Bowser-Mega"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -6,
		gen: 9,
		desc: "If held by Bowser, this item allows him to Mega Evolve in battle.",
	},
	peachite: {
		name: "Peachite",
		spritenum: 615,
		megaStone: "Peach-Mega",
		megaEvolves: "Peach",
		itemUser: ["Peach", "Peach-Mega"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -6,
		gen: 9,
		desc: "If held by Peach, this item allows her to Mega Evolve in battle.",
	},
	midbusite: {
		name: "Midbusite",
		spritenum: 583,
		megaStone: "Midbus-Mega",
		megaEvolves: "Midbus",
		itemUser: ["Midbus", "Midbus-Mega"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -7,
		gen: 9,
		desc: "If held by Midbus, this item allows him to Mega Evolve in battle.",
	},
	corriniumz: {
		name: "Corrinium Z",
		desc: "If held by Corrin with Liquidation, they can use Torrential Roar.",
		spritenum: 633,
		onTakeItem: false,
		zMove: "Torrential Roar",
		zMoveFrom: "Liquidation",
		itemUser: ["Corrin"],
		num: -8,
		gen: 9,
	},
	moriumz: {
		name: "Morium Z",
		desc: "If held by Morian with Brave Bird, she can use Stormwing Cyclone.",
		spritenum: 640,
		onTakeItem: false,
		zMove: "Stormwing Cyclone",
		zMoveFrom: "Brave Bird",
		itemUser: ["Morian"],
		num: -9,
		gen: 9,
	},
	monokumiumz: {
		name: "Monokumium Z",
		desc: "If held by Monokuma with Punishment Time, he can use Spear of Gungnir.",
		spritenum: 634,
		onTakeItem: false,
		zMove: "Spear of Gungnir",
		zMoveFrom: "Punishment Time!",
		itemUser: ["Monokuma"],
		num: -10,
		gen: 9,
	},
	imperialchip: {
		name: "Imperial Chip",
		spritenum: 619,
		megaStone: "Usapyon-Mega",
		megaEvolves: "Usapyon",
		itemUser: ["Usapyon", "Usapyon-Mega"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -11,
		gen: 9,
		desc: "If held by Usapyon, this item allows him to Mega Evolve in battle.",
	},
};
