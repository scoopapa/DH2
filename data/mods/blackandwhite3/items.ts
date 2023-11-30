export const Items: {[itemid: string]: ModdedItemData} = {
	relicsheet: {
		name: "Relic Sheet",
		spritenum: 390,
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Meloetta') {
				pokemon.formeChange('Meloetta-Pirouette');
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Meloetta') return false;
			return true;
		},
		itemUser: ["Meloetta"],
		num: -1,
		gen: 9,
		desc: "If held by Meloetta: Pirouette Forme on entry.",
	},
}