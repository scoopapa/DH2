export const Items: {[itemid: string]: ItemData} = {
	sunflower: {
		name: "Sunflower",
		fling: {
			basePower: 60,
		},
		spritenum: 475,
		onSourceModifyAccuracyPriority: 4,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy === 'number') {
				return accuracy * 2;
			}
		},
		itemUser: ["heliolisk-sirfetchd"],
		num: 259,
		gen: 8,
	},
	venusaurite: {
		name: "Venusaurite",
		spritenum: 608,
		megaStone: "Garchomp-Venusaur-Mega",
		megaEvolves: "Garchomp-Venusaur",
		itemUser: ["Garchomp-Venusaur"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
	},
	gardevoirite: {
		name: "Gardevoirite",
		spritenum: 587,
		megaStone: "Flygon-Gardevoir-Mega",
		megaEvolves: "Flygon-Gardevoir",
		itemUser: ["Flygon-Gardevoir"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
	},
	scizorite: {
		name: "Scizorite",
		spritenum: 605,
		megaStone: "Hitmontop-Scizor-Mega",
		megaEvolves: "Hitmontop-Scizor",
		itemUser: ["Hitmontop-Scizor"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
	},
	diancite: {
		name: "Diancite",
		spritenum: 624,
		megaStone: "Gloom-Diancie-Mega",
		megaEvolves: "Gloom-Diancie",
		itemUser: ["Gloom-Diancie"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
	},
	slowbronite: {
		name: "Slowbronite",
		spritenum: 620,
		megaStone: "Tapu Koko-Slowbro-Mega",
		megaEvolves: "Tapu Koko-Slowbro",
		itemUser: ["Tapu Koko-Slowbro"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
	},
	tyranitarite: {
		name: "Tyranitarite",
		spritenum: 607,
		megaStone: "Zarude-Tyranitar-Mega",
		megaEvolves: "Zarude-Tyranitar",
		itemUser: ["Zarude-Tyranitar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
	},
};
