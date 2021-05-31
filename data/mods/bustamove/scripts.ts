//this.modData('Learnsets', 'pkmn').learnset.move = ['8L1'];
export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	/*init: function () {
	
		this.modData('Learnsets', 'houndoom').learnset.burningjealousy = ['8L1'];
		this.modData('Learnsets', 'infernape').learnset.burningjealousy = ['8L1'];
		this.modData('Learnsets', 'pyroar').learnset.burningjealousy = ['8L1'];
		
		this.modData('Learnsets', 'hatterene').learnset.decorate = ['8L1'];
		this.modData('Learnsets', 'jirachi').learnset.decorate = ['8L1'];
		this.modData('Learnsets', 'victini').learnset.decorate = ['8L1'];
	
		this.modData('Learnsets', 'delphox').learnset.eeriespell = ['8L1'];
		this.modData('Learnsets', 'hatterene').learnset.eeriespell = ['8L1'];
		this.modData('Learnsets', 'mismagius').learnset.eeriespell = ['8L1'];
	
		this.modData('Learnsets', 'celffa').learnset.fairywind = ['8L1'];
		this.modData('Learnsets', 'hatenna').learnset.fairywind = ['8L1'];
		this.modData('Learnsets', 'primarina').learnset.fairywind = ['8L1'];
		this.modData('Learnsets', 'mew').learnset.fairywind = ['8L1'];
	
		this.modData('Learnsets', 'rockruff').learnset.jawlock = ['8L1'];
		this.modData('Learnsets', 'tyrunt').learnset.jawlock = ['8L1'];
	
		this.modData('Learnsets', 'tornadus').learnset.razorwind = ['8L1'];
		this.modData('Learnsets', 'thundurus').learnset.razorwind = ['8L1'];
		this.modData('Learnsets', 'landorus').learnset.razorwind = ['8L1'];
		this.modData('Learnsets', 'articunogalar').learnset.razorwind = ['8L1'];
		this.modData('Learnsets', 'zapdosgalar').learnset.razorwind = ['8L1'];
		this.modData('Learnsets', 'moltresgalar').learnset.razorwind = ['8L1'];
		this.modData('Learnsets', 'celesteela').learnset.razorwind = ['8L1'];
		this.modData('Learnsets', 'xatu').learnset.razorwind = ['8L1'];
	
		this.modData('Learnsets', 'beedrill').learnset.strength = ['8L1'];
	},
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
};
