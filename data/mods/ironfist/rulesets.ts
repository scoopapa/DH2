export const Rulesets: {[k: string]: ModdedFormatData} = {
	silvallyclause: {
		effectType: 'ValidatorRule',
		name: 'Silvally Clause',
		desc: "Prevents teams from having more than one Pok&eacute;mon from the same species unless they are Silvally",
		onBegin() {
			this.add('rule', 'Silvally Clause: You can use up to 6 Silvally');
		},
		onSwitchIn(pokemon) {
			if (pokemon.big) {
				pokemon.addVolatile('bigbutton');
			}
			if (pokemon.set.nature === 'Serious') {
				if (pokemon.addType('Serious')) this.add('-start', pokemon, 'typeadd', 'Serious');
			}
		},
		onValidateTeam(team, format) {
			const speciesTable = new Set<number>();
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (species.num != 773 && speciesTable.has(species.num)) {
					return [`You are limited to one of each Pokémon by Species Clause.`, `(You have more than one ${species.baseSpecies})`];
				}
				speciesTable.add(species.num);
			}
		},
	},
};