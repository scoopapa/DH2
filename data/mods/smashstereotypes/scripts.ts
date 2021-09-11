export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init: function () {
/*
		for (const id in this.dataCache.Pokedex) {
			const poke = this.dataCache.Pokedex[id];
			if (poke.restrictedLearnset) {
				console.log(this.toID(poke.name));
				const thisPoke = this.toID(poke.name);
				const learnset = this.dataCache.Learnsets[this.toID(poke.name)].learnset;
				for (const move in learnset) {
					console.log(thisPoke + " has " + move);
					const moveid = this.dataCache.Moves[move];
					if (moveid.isNonstandard) {
						console.log(moveid.isNonstandard);
						delete this.modData('Learnsets', thisPoke).learnset.moveid;
					}
				}
			}
		}
*/
		this.modData('Learnsets', 'shaymin').learnset.allterrainblast = ['8L1'];
		this.modData('Learnsets', 'shaymin').learnset.leafage = ['8L1'];
		this.modData('Learnsets', 'shaymin').learnset.shedleaves = ['8L1'];
		
		this.modData('Learnsets', 'heatmor').learnset.spikes = ['8L1'];
	},
};
