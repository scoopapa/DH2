// i'm not doing anything to this file but if you're seeing this and cheating just know that i am 100% disappointed in you
export const Scripts: BattleScriptsData = {
	gen: 9,
	actions: {
		inherit: true,
		canMegaEvo(pokemon) {
			const altForme = pokemon.baseSpecies.otherFormes && this.dex.species.get(pokemon.baseSpecies.otherFormes[0]);
			const item = pokemon.getItem();
			if (
				altForme?.isMega && altForme?.requiredMove &&
				pokemon.baseMoves.includes(this.dex.toID(altForme.requiredMove)) && !item.zMove
			) {
				return altForme.name;
			}
			switch (pokemon.baseSpecies.name) {
				case "Charizard":
					if (item.name === "Cameruptite") {
						return "Camerupt-Mega"; 
					}
					break;
			}
			return item.megaStone;
		},
	},
};
