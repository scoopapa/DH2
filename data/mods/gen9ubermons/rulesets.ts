export const Rulesets: {[k: string]: ModdedFormatData} = {
	terastalclause: {
		effectType: 'Rule',
		name: 'Terastal Clause',
		desc: "Prevents Pok&eacute;mon from Terastallizing",
		onBegin() {
			this.add('rule', 'Terastal Clause: Pokemon without certain items cannot Terastallize');
			for (const pokemon of this.getAllPokemon()) {
				const item = pokemon.getItem();
				if (!["teracrystal", "cornerstonemask", "hearthflamemask", "wellspringmask"].includes(item.id) || pokemon.species.id === 'terapagos') {
					pokemon.canTerastallize = null;
				}
			}
		},
	},
};
