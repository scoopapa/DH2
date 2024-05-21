export const Items: { [itemid: string]: ItemData } = {
	supportgear: {
		name: "Support Gear",
		num: -1000,
		desc: "If held by Pthormign: recoil is negated.",
		itemUser: ["Pthormign"],
		onTakeItem(item, pokemon, source) {
			if (source && source.baseSpecies.baseSpecies === "Pthormigan") {
				return false;
			}
			return true;
		},
		onModifyMovePriority: 10,
		onModifyMove(move) {
			move.recoil = [0, 1000];
		},
	},
	fawntifite: {
		name: "Fawntifite",
		num: -1001,
		desc: "Allows Fawntiful to Mega Evolve.",
		spritenum: 624,
		megaStone: "Fawntiful-Mega",
		megaEvolves: "Fawntiful",
		itemUser: ["Fawntiful"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 9,
	},
	bjornioritite: {
		name: "Bjornioritite",
		num: -1001,
		desc: "Allows Bjorniorite to Mega Evolve.",
		spritenum: 624,
		megaStone: "Bjorniorite-Mega",
		megaEvolves: "Bjorniorite",
		itemUser: ["Bjorniorite"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 9,
	},
	polipidite: {
		name: "Polipidite",
		num: -1001,
		desc: "Allows Polipid to Mega Evolve.",
		spritenum: 624,
		megaStone: "Polipid-Mega",
		megaEvolves: "Polipid",
		itemUser: ["Polipid"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 9,
	},
	naglrite: {
		name: "Naglrite",
		num: -1001,
		desc: "Allows Naglrir to Mega Evolve.",
		spritenum: 624,
		megaStone: "Naglrir-Mega",
		megaEvolves: "Naglrir",
		itemUser: ["Naglrir"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		gen: 9,
	},

};
