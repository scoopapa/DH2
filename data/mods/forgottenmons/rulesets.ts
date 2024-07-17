export const Rulesets: {[k: string]: ModdedFormatData} = {
	megastoneclause: {
		effectType: 'ValidatorRule',
		name: 'Mega Stone Clause',
		desc: "Bans Pok&eacute;mon from holding Mega Stones",
		onValidateSet(set) {
			const item = this.dex.items.get(set.item);
			if (item.megaEvolves) return [`${set.name || set.species}'s item ${item.name} is banned by Mega Stone Clause.`];
		},
		onBegin() {
			this.add('rule', 'Mega Stone Clause: Mega Stones are banned');
			for (const pokemon of this.getAllPokemon()) {
				if (pokemon.species.id === 'rayquaza') {
					pokemon.canMegaEvo = null;
					// ability to terastal was determined before the clause activated, causing incorrect behavior
					pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
				}
			}
		},
	},
};
