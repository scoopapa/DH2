export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	actions: {
		canMegaEvo(pokemon: Pokemon) {
			const species = pokemon.baseSpecies;
			const altForme = species.otherFormes && this.dex.species.get(species.otherFormes[0]);
			const item = pokemon.getItem();
			// Mega Rayquaza
			if ((this.battle.gen <= 7 || this.battle.ruleTable.has('+pokemontag:past')) &&
				altForme?.isMega && altForme?.requiredMove &&
				pokemon.baseMoves.includes(toID(altForme.requiredMove)) && !item.zMove) {
				return altForme.name;
			}
			// a hacked-in Megazard X can mega evolve into Megazard Y, but not into Megazard X
			if (item.megaEvolves === species.baseSpecies && item.megaStone !== species.name) {
				if (item.megaExcludes.includes(species.name)) return null;
				if (species.name !== species.baseSpecies && item.altMegaStone.includes(species.name + "-Mega")) {
					return species.name + "-Mega";
				}
				return item.megaStone;
			}
			return null;
		}
	}
};