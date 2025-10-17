export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	teambuilderConfig: {
        excludeStandardTiers: true,
        customTiers: ['FE ZA', 'NFE ZA', 'LC ZA', 'Transfer', 'Uber ZA'],
	},
	actions: {
		inherit: true,
  	canMegaEvo(pokemon: Pokemon) {
  		const species = pokemon.baseSpecies;
  		const altForme = species.otherFormes && this.dex.species.get(species.otherFormes[0]);
  		const item = pokemon.getItem();
  		// Mega Rayquaza
  		if ((this.battle.gen <= 7 || this.battle.ruleTable.has('+pokemontag:past') ||
  			this.battle.ruleTable.has('+pokemontag:future')) &&
  			altForme?.isMega && altForme?.requiredMove &&
  			pokemon.baseMoves.includes(toID(altForme.requiredMove)) && !item.zMove) {
  			return altForme.name;
  		}
  		// Temporary hardcode until generation shift
  		if ((species.baseSpecies === "Floette" || species.baseSpecies === "Zygarde") && item.megaEvolves === species.name) {
  			return item.megaStone;
  		}
  		if (item.name === "Slowbronite" && pokemon.baseSpecies.name === "Slowbro-Galar") {
  			return null;
  		}
  		// a hacked-in Megazard X can mega evolve into Megazard Y, but not into Megazard X
  		if (item.megaEvolves === species.baseSpecies && item.megaStone !== species.name) {
  			return item.megaStone;
  		}
  		return null;
  	},
  },
};
