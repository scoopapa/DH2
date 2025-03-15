export const Items: { [itemid: string]: ItemData } = {
	supportgear: {
		name: "Support Gear",
		num: -1000,
		spritenum: 581,
		desc: "If held by Pthormign: recoil is negated.",
		itemUser: ["Pthormign"],
		onTakeItem(item, pokemon, source) {
			//dont let it get knocked off
			/*if (source && source.baseSpecies.baseSpecies === "Pthormign") {
				return false;
			}*/
			return true;
		},
		/*onModifyMove(move) {
			if (move.recoil) move.recoil = null;
			if (move.hasCrashDamage) move.hasCrashDamage = false;
		},*/
		onDamage(damage, target, source, effect) {
			if (effect.type !== 'Move' && ['highjumpkick','jumpkick','supercellslam', 'recoil'].includes(effect.id)) {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
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
