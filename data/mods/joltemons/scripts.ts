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
this.modData('Learnsets', 'wigglytuff').learnset.geomancy = ['8L1'];
this.modData('Learnsets', 'articunogalar').learnset.defog = ['8L1'];
this.modData('Learnsets', 'zapdosgalar').learnset.defog = ['8L1'];
this.modData('Learnsets', 'moltresgalar').learnset.defog = ['8L1'];
this.modData('Learnsets', 'articunogalar').learnset.toxic = ['8L1'];
this.modData('Learnsets', 'zapdosgalar').learnset.toxic = ['8L1'];
this.modData('Learnsets', 'moltresgalar').learnset.toxic = ['8L1'];
this.modData('Learnsets', 'magmortar').learnset.recover = ['8L1'];
	},
};
