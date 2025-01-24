export const Items: {[itemid: string]: ItemData} = {
	summerbackdoor: {
		name: "Summer Backdoor",
		shortDesc: "If held by a Cirno, this item changes its forme to Tanned.",
		spritenum: 698,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 1004) || pokemon.baseSpecies.num === 1004) {
				return false;
			}
			return true;
		},
		itemUser: ["Cirno-Tanned"],
		num: -1,
		gen: 9,
	},
	jeweledpagoda: {
		name: "Jeweled Pagoda",
		shortDesc: "If held by a Nazrin/Shou, its Fairy-type attacks have 1.5x power.",
		spritenum: 698,
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if ((user.baseSpecies.num === 1045 || user.baseSpecies.num === 1048) && move.type === 'Fairy') {
				return this.chainModify(1.5);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && (source.baseSpecies.num === 1045 || source.baseSpecies.num === 1048)) || (pokemon.baseSpecies.num === 1045 || pokemon.baseSpecies.num === 1048)) {
				return false;
			}
			return true;
		},
		num: -2,
		gen: 9,
	},
};
