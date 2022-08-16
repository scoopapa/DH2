export const Formats: {[k: string]: ModdedFormatsData} = {
	standardpetmod: {
		inherit: true,
		ruleset: ['[Gen 8] OU', '!Species Clause'],
		banlist: ['All Pokemon'],
		onBegin() {
			// The only validator rule this currently modifies is Species Clause, so the added rule is just this
			this.add('rule', 'Chaos Chaos Chaos: Limit one of each Pokémon');
		},
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.getTemplate(set.species);
				if (speciesTable[template.species]) {
					return ["You are limited to one of each Pokémon by Chaos Chaos Chaos.", "(You have more than one " + template.species + ")"];
				}
				speciesTable[template.species] = true;
			}
		},
	},
};