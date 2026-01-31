export const Rulesets: import('../../../sim/dex-formats').ModdedFormatDataTable = {
	onelegendaryclause: {
		effectType: 'Rule',
		name: 'One Legendary Clause',
		desc: "You can only have one Legendary Pok\u00E9mon on your team.",
		onValidateTeam(team) {
			const restrictedSpecies = [];
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (this.ruleTable.isRestrictedSpecies(species)) restrictedSpecies.push(species.name);
			}
			if (restrictedSpecies.length !== 1) {
				return [`You must use exactly one Legendary Pok\u00E9mon.`];
			}
		},

	},
	onepseudoclause: {
		effectType: 'Rule',
		name: 'One Pseudo Clause',
		desc: "You can only have one Pseudo-Legendary Pok\u00E9mon on your team.",
		onValidateTeam(team) {
			const restrictedSpecies = [];
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (this.ruleTable.isRestrictedSpecies(species)) restrictedSpecies.push(species.name);
			}
			if (restrictedSpecies.length > 1) {
				return [`You can only use up to one Pseudolegendary Pok\u00E9mon (Pokemon with a BST of 600 at the end of a 3-stage evolution chain.)`];
			}
		},
	},
	onestarterclause: {
		effectType: 'Rule',
		name: 'One Starter Clause',
		desc: "You can only have one Starter Pok\u00E9mon on your team.",
		onValidateTeam(team) {
			const restrictedSpecies = ['Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Charizard', 'Squirtle', 'Wartortle', 'Blastoise',
					 'Chikorita', 'Bayleef', 'Meganium', 'Cyndaquil', 'Quilava', 'Typhlosion', 'Totodile', 'Croconaw', 'Feraligatr',
					 'Treecko', 'Grovyle', 'Sceptile', 'Torchic', 'Combusken', 'Blaziken', 'Mudkip', 'Marshtomp', 'Swampert',
					 'Turtwig', 'Grotle', 'Torterra', 'Chimchar', 'Monferno', 'Infernape', 'Piplup', 'Prinplup', 'Empoleon',
					 'Snivy', 'Servine', 'Serperior', 'Tepig', 'Pignite', 'Emboar', 'Oshawott', 'Dewott', 'Samurott'];
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (this.ruleTable.isRestrictedSpecies(species)) restrictedSpecies.push(species.name);
			}
			if (restrictedSpecies.length > 1){
				return [`You can only use up to one Starter Pok\u00E9mon.`];
			}
		},
	}
}