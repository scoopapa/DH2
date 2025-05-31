export const Items: {[itemid: string]: ModdedItemData} = {
	kobgoldite: {
		name: "Kobgoldite",
		shortDesc: "If held by a Kobgold, this item allows it to Mega Evolve in battle.",
		megaStone: "Kobgold-Mega",
		megaEvolves: "Kobgold",
		itemUser: ["Kobgold"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
	},
	warriorssash: {
		name: "Warrior's Sash",
		shortDesc: "If held by a Flowar, boosts not very effective moves by 100%.",
		itemUser: ["Flowar"],
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.baseSpecies === 'Flowar') || pokemon.baseSpecies.baseSpecies === 'Flowar') {
				return false;
			}
				return true;
		},
		onModifyDamage(damage, source, target, move) {
			if (source.baseSpecies.baseSpecies === "Flowar") {
				if (target.getMoveHitData(move).typeMod < 0) {
					this.debug('Tinted Lens boost');
					return this.chainModify(2);
				}
			}
		},
	},
}
