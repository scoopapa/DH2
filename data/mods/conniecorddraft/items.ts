export const Items: {[k: string]: ModdedItemData} = {
	bigredbutton: {
		name: "Big Red Button",
		spritenum: "118",
		fling: {
			basePower: 30,
		},
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			if (target.useItem()) {
				this.useMove('explosion', target);
			}
		},
		num: -1001,
		gen: 8,
		shortDesc: "Holder uses the move Explosion after being damaged by a move.",
	},
	vaporeonitex: {
		name: "Vaporeonite X",
		spritenum: 586,
		megaStone: "Vaporeon-Mega-X",
		megaEvolves: "Vaporeon",
		itemUser: ["Vaporeon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1002,
		gen: 8,
		desc: "If held by a Vaporeon, this item allows it to Mega Evolve in battle.",
	},
	drampite: {
		name: "Drampite",
		spritenum: 586,
		megaStone: "Drampa-Mega",
		megaEvolves: "Drampa",
		itemUser: ["Drampa"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1003,
		gen: 8,
		desc: "If held by a Drampa, this item allows it to Mega Evolve in battle.",
	},
	sceptilitesword: {
		name: "Sceptilite Sword",
		spritenum: 586,
		megaStone: "Sceptile-Mega-Sword",
		megaEvolves: "Sceptile",
		itemUser: ["Sceptile"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1004,
		gen: 8,
		desc: "If held by a Sceptile, this item allows it to Mega Evolve in battle.",
	},
};
