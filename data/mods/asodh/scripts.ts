export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['Mega', 'ASODH', 'ASODH NFE', 'ASODH Ubers'],
		customDoublesTiers: ['Mega', 'ASODH', 'ASODH NFE', 'ASODH Ubers'],
	},
	actions: {
		canMegaEvo(pokemon) {
		  const altForme = pokemon.baseSpecies.otherFormes && this.dex.species.get(pokemon.baseSpecies.otherFormes[0]);
		  const item = pokemon.getItem();
		  if (
			altForme?.isMega && altForme?.requiredMove &&
			pokemon.baseMoves.includes(this.dex.toID(altForme.requiredMove)) && !item.zMove
		  ) {
			return altForme.name;
		  }
		  if (item.name === "Slowbronite" && pokemon.baseSpecies.name === "Slowbro") {
			return "Slowbro-Mega";
		  }
		  else if (item.name === "Slowbronite" && pokemon.baseSpecies.name === "Slowbro-Galar") {
			return "Slowbro-Galar-Mega";
		  }
		  return item.megaStone;
		},
	},
	init() {
	  this.modData('Learnsets', 'stonjourner').learnset.zenheadbutt = ['9M'];
	  this.modData('Learnsets', 'stonjourner').learnset.psychic = ['9M'];
	}
  };
  