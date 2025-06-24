export const Items: {[itemid: string]: ModdedItemData} = {
	bigroot: {
	  inherit: true,
		onTryHealPriority: 1,
	  onTryHeal(damage, target, source, effect) {
		const heals = ['drain', 'leechseed', 'ingrain', 'aquaring', 'strengthsap'];
		if (heals.includes(effect.id)) {
		  return this.chainModify([6144,4096]);
		}
	  },
	  shortDesc: "Holder gains 1.5x HP from draining, Aqua Ring, Ingrain, Leech Seed, Strength Sap.",
	},
	masquerainite: {
		name: "Masquerainite",
		spritenum: 1,
		megaStone: "Masquerain-Mega",
		megaEvolves: "Masquerain",
		itemUser: ["Masquerain"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1,
		gen: 9,
		desc: "If held by a Masquerain, this item allows it to Mega Evolve in battle.",
	}
};
  
