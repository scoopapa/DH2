export const Items: {[itemid: string]: ModdedItemData} = {
	rustedsword: {
		name: "Rusted Sword",
		spritenum: 698,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 888) || pokemon.baseSpecies.num === 888) {
				return false;
			}
			return true;
		},
		onSourceAfterFaint(length, target, source, effect) {
			if ((source && source.baseSpecies.num !== 888) || source.baseSpecies.num !== 888) return;
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: length}, source);
			}
		},
		forcedForme: "Zacian-Crowned",
		itemUser: ["Zacian-Crowned"],
		num: 1103,
		gen: 8,
		shortDesc: "If Zacian-Crowned: Attack is raised by 1 stage if it attacks and KOes another Pokemon.",
	},
	sawsbuckite: {
		name: "Sawsbuckite",
		spritenum: 578,
		megaStone: "Sawsbuck-Mega",
		megaEvolves: "Sawsbuck",
		itemUser: ["Sawsbuck"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			if (source.baseSpecies.baseSpecies === 'Delibird') return false;
			return true;
		},
		num: -1068,
		gen: 8,
		desc: "If held by a Sawsbuck, this item allows it to Mega Evolve in battle.",
	},
	venusaurite: {
		name: "Venusaurite",
		spritenum: 608,
		megaStone: "Venuroar-Mega",
		megaEvolves: "Venuroar",
		itemUser: ["Venuroar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 659,
		desc: "If held by a Venuroar, this item allows it to Mega Evolve in battle.",
	},
};
