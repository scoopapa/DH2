export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['Mega', 'MD', 'MD NFE', 'MD Ubers', 'EXP'],
		customDoublesTiers: ['Mega', 'MD', 'MD NFE', 'MD Ubers', 'EXP'],
	},
	init() {		

		// test
		this.modData("Learnsets", "relicanth").learnset.wavecrash = ['9M'];
		this.modData("Learnsets", "beheeyem").learnset.superkinesis = ['9M'];
		this.modData("Learnsets", "spiritomb").learnset.partingshot = ['9M'];

		for (const id in this.dataCache.Pokedex) {
			const newMon = this.dataCache.Pokedex[id];
			if (!newMon || !newMon.copyData) continue; // weeding out Pokémon that aren't new
			const copyData = this.dataCache.Pokedex[this.toID(newMon.copyData)];

			if (!newMon.types && copyData.types) newMon.types = copyData.types;
			if (!newMon.baseStats && copyData.baseStats) newMon.baseStats = copyData.baseStats;
			if (!newMon.abilities && copyData.abilities) newMon.abilities = copyData.abilities;
			if (!newMon.num && copyData.num) newMon.num = copyData.num * -1; // inverting the original's dex number
			if (!newMon.genderRatio && copyData.genderRatio) newMon.genderRatio = copyData.genderRatio;
			if (!newMon.heightm && copyData.heightm) newMon.heightm = copyData.heightm;
			if (!newMon.weightkg && copyData.weightkg) newMon.weightkg = copyData.weightkg;
			if (!newMon.color && copyData.color) newMon.color = copyData.color;
			if (!newMon.eggGroups && copyData.eggGroups) newMon.eggGroups = copyData.eggGroups;

			let copyMoves = newMon.copyData;
			if (newMon.copyMoves) copyMoves = newMon.copyMoves;
			if (copyMoves) {
				if (!this.dataCache.Learnsets[id]) this.dataCache.Learnsets[id] = {learnset: {}}; // create a blank learnset entry so we don't need a learnsets file (thank you ink)
				const learnset = this.dataCache.Learnsets[this.toID(copyMoves)].learnset;
				for (const moveid in learnset) {
					this.modData('Learnsets', id).learnset[moveid] = learnset[moveid].filter(
						(method) => !method.includes('S')
					);
				}
				if (newMon.movepoolAdditions) {
					for (const move of newMon.movepoolAdditions) {
						this.modData('Learnsets', this.toID(id)).learnset[this.toID(move)] = ["9M"];
					}
				}
				if (newMon.movepoolDeletions) {
					for (const move of newMon.movepoolDeletions) {
						delete this.modData('Learnsets', this.toID(id)).learnset[this.toID(move)];
					}
				}
				// hard-coding a bit for Eclipseroid specifically (may rework if we get more fusions later but kinda doubt)
				if (newMon.name === 'Eclipseroid') {
					for (const moveid in this.dataCache.Learnsets[this.toID("Lunatone")].learnset) {
						this.modData('Learnsets', id).learnset[moveid] = this.dataCache.Learnsets[this.toID("Lunatone")].learnset[moveid].filter(
							(method) => !method.includes('S')
						);
					}
				}
			}
		}
	},


	// New line, which will display stats, etc. of a Mega Pokémon. Also includes form changes if I ever revisit Ma'adowr and introduce new forms.
	actions: {

		/*canAscend(pokemon: Pokemon) {
			if ((pokemon.baseSpecies.baseSpecies === 'Matokoda') &&
				pokemon.getItem().id === 'matokodium') {
				return "Matokoda-Ascend";
			}
			return null;
		},*/

		canMegaEvo(pokemon) { // modded for forms
			const altForme = pokemon.baseSpecies.otherFormes && this.dex.species.get(pokemon.baseSpecies.otherFormes[0]);
			const item = pokemon.getItem();
			if (
				altForme?.isMega && altForme?.requiredMove &&
				pokemon.baseMoves.includes(this.toID(altForme.requiredMove)) && !item.zMove
			) {
				return altForme.name;
			}
		// this is where form-specific Megas are defined when that becomes relevant
			/*if (item.name === "Sawsbuckite" && pokemon.species.id === "sawsbucksummer") return "Sawsbuck-Summer-Mega";
			if (item.name === "Sawsbuckite" && pokemon.species.id === "sawsbuckautumn") return "Sawsbuck-Autumn-Mega";
			if (item.name === "Sawsbuckite" && pokemon.species.id === "sawsbuckwinter") return "Sawsbuck-Winter-Mega";*/
		/* examples:
			if (item.name === "Wormadamite") {
				if (pokemon.species.name === "Wormadam-Sandy") return "Wormadam-Sandy-Mega";
				else return null;
			}
			if (item.name === "Hoopanite" && pokemon.species.name === "Hoopa-Unbound") return null;
		*/
			if (item.megaEvolves !== pokemon.species.name || item.megaStone === pokemon.species.name) return null;
			return item.megaStone;
		},
		},

	
};
