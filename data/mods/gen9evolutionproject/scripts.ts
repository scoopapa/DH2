export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	teambuilderConfig: {
		excludeStandardTiers: true,
		// sorting the teambuilder by slate / prompt
		customTiers: ['Pokémon of the Day!', 'S1P1', 'S1P2', 'S1P3', 'Evo 1', 'Canon', 'Evo (NFE)'],
		customDoublesTiers: ['Pokémon of the Day!', 'S1P1', 'S1P2', 'S1P3', 'Evo 1', 'Canon', 'Evo (NFE)'],
	},
	init() {
		for (const id in this.dataCache.Pokedex) {
			const notm = ['terablast', 'hiddenpower']; // certain moves don't count TMs
			const gen9only = [
				'plankteenie', 'mareaniedrifter', 'toxapexglacial', 'nemesyst'
			]; // certain Fakemon are based on Gen IX movepools specifically

			// movepool corrections
			if (this.dataCache.Learnsets[id]) {
				for (const moveid in notm) {
					if (this.modData('Learnsets', id).learnset[moveid]) {
						this.modData('Learnsets', id).learnset[moveid] = learnset[moveid].filter((method) => (!method.includes('M') && !method.includes('T')));
					}
				}
			}

			// Fakemon creation
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

			customList.push(id);

			let copyMoves = newMon.copyData;
			if (newMon.copyMoves) copyMoves = newMon.copyMoves;
			if (copyMoves) {
				if (!this.dataCache.Learnsets[id]) this.dataCache.Learnsets[id] = {learnset: {}}; // create a blank learnset entry so we don't need a learnsets file
				const learnset = this.dataCache.Learnsets[this.toID(copyMoves)].learnset;
				for (const moveid in learnset) {
					this.modData('Learnsets', id).learnset[moveid] = learnset[moveid].filter(
						(method) => !(method.includes('S') && !(notm.contains(move.id) && (method.includes('M') || method.includes('T'))) && (!gen9only.contains(id) || method.startsWith('9')))
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
			}
		}

		let random1 = Math.floor(Math.random() * customList.length);
		let random2 = Math.floor(Math.random() * (customList.length - 1));
		let random3 = Math.floor(Math.random() * (customList.length - 2));
		if (random2 >= random1) random2 += 1;
		if (random3 >= random1) random3 += 1;
		if (random3 >= random2) random3 += 1;
		this.modData('FormatsData', customList[random1]).tier = "Pokémon of the Day!";
		this.modData('FormatsData', customList[random2]).tier = "Pokémon of the Day!";
		this.modData('FormatsData', customList[random3]).tier = "Pokémon of the Day!";
	},
};
