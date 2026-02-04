export const Rulesets: import('../../../sim/dex-formats').ModdedFormatDataTable = {
	onelegendaryclause: {
		effectType: 'Rule',
		name: 'One Legendary Clause',
		desc: "You can only have one Legendary Pok\u00E9mon on your team.",
		onValidateTeam(team) {
			const restrictedSpecies = new Set(['Giratina-Altered', 'Giratina-Origin', 'Darkrai', 'Dialga', 'Groudon', 'Kyogre', 'Mewtwo', 'Palkia', 'Rayquaza', 'Ho-oh', 'Latias', 'Latios', 'Lugia', 'Celebi', 'Heatran', 'Jirachi', 'Manaphy', 'Mew', 'Shaymin', 'Shaymin-Sky', 'Zapdos', 'Azelf', 'Cresselia', 'Raikou', 'Suicune', 'Uxie', 'Entei', 'Mesprit', 'Moltres', 'Regirock', 'Registeel', 'Articuno', 'Regice', 'Regigigas',
					'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Arceus', 'Arceus-Bug', 'Arceus-Dark', 'Arceus-Dragon', 'Arceus-Electric', 'Arceus-Fairy', 'Arceus-Fighting', 'Arceus-Fire', 'Arceus-Flying', 'Arceus-Ghost', 'Arceus-Grass', 'Arceus-Ground', 'Arceus-Ice', 'Arceus-Poison', 'Arceus-Psychic', 'Arceus-Rock', 'Arceus-Steel', 'Arceus-Water']);
			let count = 0;
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (restrictedSpecies.has(species.name)) count++;
			}
			if (count !== 1) {
				return [`You must use exactly one Legendary Pok\u00E9mon.`];
			}
		},

	},
	onepseudoclause: {
		effectType: 'Rule',
		name: 'One Pseudo Clause',
		desc: "You can only have one Pseudo-Legendary Pok\u00E9mon on your team.",
		onValidateTeam(team) {
			const restrictedSpecies = new Set(['Garchomp', 'Salamence', 'Dragonite', 'Tyranitar', 'Metagross']);
			let count = 0;
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (restrictedSpecies.has(species.name)) count++;
			}
			if (count > 1) {
				return [`You can only use up to one Pseudolegendary Pok\u00E9mon (Pokemon with a BST of 600 at the end of a 3-stage evolution chain.)`];
			}
		},
	},
	onestarterclause: {
		effectType: 'Rule',
		name: 'One Starter Clause',
		desc: "You can only have one Starter Pok\u00E9mon on your team.",
		onValidateTeam(team) {
			const restrictedSpecies = new Set(['Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Charizard', 'Squirtle', 'Wartortle', 'Blastoise',
					 'Chikorita', 'Bayleef', 'Meganium', 'Cyndaquil', 'Quilava', 'Typhlosion', 'Totodile', 'Croconaw', 'Feraligatr',
					 'Treecko', 'Grovyle', 'Sceptile', 'Torchic', 'Combusken', 'Blaziken', 'Mudkip', 'Marshtomp', 'Swampert',
					 'Turtwig', 'Grotle', 'Torterra', 'Chimchar', 'Monferno', 'Infernape', 'Piplup', 'Prinplup', 'Empoleon',
					 'Snivy', 'Servine', 'Serperior', 'Tepig', 'Pignite', 'Emboar', 'Oshawott', 'Dewott', 'Samurott']);
			let count = 0;
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (restrictedSpecies.has(species.name)) count++;
			}
			if (count > 1){
				return [`You can only use up to one Starter Pok\u00E9mon.`];
			}
		},
	},
	restrictedshiniesclause: {
		effectType: 'Rule',
		name: 'Restricted Shinies Clause',
		desc: "A Pokémon is Shiny if and only if it is using its Hidden Ability.",
		onValidateTeam(team) {
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				const ability = this.dex.abilities.get(set.ability);
				const isUsingHiddenAbility = ability.name === species.abilities['H'];
				
				if (isUsingHiddenAbility) {
					set.shiny = true;
				} else {
					set.shiny = false;
				}
			}
		},
	},
}