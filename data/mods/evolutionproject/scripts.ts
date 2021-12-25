export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['Evo!', 'Evo (NFE)'],
		customDoublesTiers: ['Evo!', 'Evo (NFE)'],
	},
	init() {
		for (const id in this.dataCache.Pokedex) {
			const pokemon = this.dataCache.Pokedex[id];
			if (!pokemon.copyData) continue;
			let newData = this.dex.getSpecies(pokemon);
			let copyData = this.dex.getSpecies(pokemon.copyData);

			if (!newData.types && copyData.types) newData.types = copyData.types;
			if (!newData.baseStats && copyData.baseStats) newData.baseStats = copyData.baseStats;
			if (!newData.abilities && copyData.abilities) newData.abilities = copyData.abilities;
			if (!newData.num && copyData.num) newData.num = copyData.num *= -1; // inverting the original's dex number
			if (!newData.genderRatio && copyData.genderRatio) newData.genderRatio = copyData.genderRatio;
			if (!newData.heightm && copyData.heightm) newData.heightm = copyData.heightm;
			if (!newData.weightkg && copyData.weightkg) newData.weightkg = copyData.weightkg;
			if (!newData.color && copyData.color) newData.color = copyData.color;
			if (!newData.eggGroups && copyData.eggGroups) newData.eggGroups = copyData.eggGroups;

			let copyMoves = pokemon.copyData;
			if (pokemon.copyMoves) copyMoves = pokemon.copyMoves;
			if (!this.dataCache.Learnsets[id]) this.dataCache.Learnsets[id] = { learnset: {}}; // create a blank learnset entry so we don't need a learnsets file (thank you ink)
			for (let name of copyMoves) {
				const learnset = this.dataCache.Learnsets[this.toID(name)].learnset; // get the learnset of each pokemon in the list
				for (const moveid in learnset) {
					this.modData('Learnsets', id).learnset[moveid] = ['8M'];
				}
			}
			if (pokemon.movepoolAdditions) {
				for (const move of pokemon.movepoolAdditions) {
					this.modData('Learnsets', this.toID(id)).learnset[this.toID(move)] = ["8M"];
				}
			}
			if (pokemon.movepoolDeletions) {
				for (const move of pokemon.movepoolDeletions) {
					delete this.modData('Learnsets', this.toID(id)).learnset[this.toID(move)];
				}
			}
		}
	},
};
