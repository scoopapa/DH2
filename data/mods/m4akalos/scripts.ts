export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['Mega', 'Kalos', 'Kalos (NFE)'],
		customDoublesTiers: ['Mega', 'Kalos', 'Kalos (NFE)'],
	},
	init() {
		for (const id in this.dataCache.Pokedex) {
			let pokemon = this.dataCache.Pokedex[id];

			if (pokemon.movepoolAdditions) {
				for (const move of pokemon.movepoolAdditions) {
					this.modData('Learnsets', this.toID(id)).learnset[this.toID(move)] = ["8M"];
				}
			}

			if (!pokemon || !pokemon.mega) continue; // weeding out Pokémon that aren't new Megas
			const newMega = this.dataCache.Pokedex[pokemon.mega] = this.dex.deepClone(pokemon);

			if (newMega.megaName) newMega.name = newMega.megaName;
			newMega.baseSpecies = pokemon.name;
			newMega.forme = "Mega";

			pokemon.otherFormes = pokemon.otherFormes.concat([newMega.name]);
			pokemon.formeOrder = pokemon.formeOrder.concat([newMega.name]);

			newMega.prevo = null;
			newMega.evoLevel = null;
			newMega.evoType = null;
			newMega.evoItem = null;
			newMega.evoCondition = null;

			if (newMega.megaStone) newMega.requiredItem = newMega.megaStone;

			if (newMega.megaType) newMega.types = newMega.megaType;
			if (newMega.megaAbility) newMega.abilities = newMega.megaAbility;
			if (newMega.megaStats) newMega.baseStats = newMega.megaStats;
			if (newMega.megaHeightm) newMega.heightm = newMega.megaHeightm;
			if (newMega.megaWeightkg) newMega.weightkg = newMega.megaWeightkg;
			if (newMega.megaColor) newMega.color = newMega.megaColor;

			if (!this.modData('FormatsData', pokemon.mega)) this.modData('FormatsData', pokemon.mega) = { tier: "Mega" },
		}
	},
};
