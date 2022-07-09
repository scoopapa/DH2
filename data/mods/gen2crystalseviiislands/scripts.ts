const csi = ["horatekku", "aroofaondo", "exoltol", "animon", "esscargoo", "tunguru", "terricks", "skunkle", "skunking", "kipuro", "kamebi", "pyronoir"];

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen2',
	gen: 2,
	/*pokemon: {
		inherit: true,
	},*/
	
	init: function () {
		
		const specialTypes = ['Fire', 'Water', 'Grass', 'Ice', 'Electric', 'Dark', 'Psychic', 'Dragon'];
		let newCategory = '';
		for (const i in this.data.Moves) {
			if (!this.data.Moves[i]) console.log(i);
			if (this.data.Moves[i].category === 'Status') continue;
			newCategory = specialTypes.includes(this.data.Moves[i].type) ? 'Special' : 'Physical';
			if (newCategory !== this.data.Moves[i].category) {
				this.modData('Moves', i).category = newCategory;
			}
		}
		
		for (const id in this.dataCache.Pokedex) {
			const pokemon = this.dataCache.Pokedex[id];
			if (this.modData('FormatsData', id)) {
				if (this.modData('FormatsData', id).isNonstandard === 'Past') this.modData('FormatsData', id).isNonstandard = null;
				// singles tiers
				if (csi.includes(id)) this.modData('FormatsData', id).tier = "C:SI";
			}
		};
		
		this.modData('Learnsets', 'scyther').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'heracross').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'pinsir').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'forretress').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'beedrill').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'ariados').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'yanma').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'ledian').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'parasect').learnset.swarmattack = ['2L1'];
		this.modData('Learnsets', 'crobat').learnset.swarmattack = ['2L1'];
		
		this.modData('Learnsets', 'umbreon').learnset.blackhole = ['2L1'];
		this.modData('Learnsets', 'houndoom').learnset.blackhole = ['2L1'];
		this.modData('Learnsets', 'murkrow').learnset.blackhole = ['2L1'];
		this.modData('Learnsets', 'clefable').learnset.blackhole = ['2L1'];
		
		this.modData('Learnsets', 'machamp').learnset.parry = ['2L1'];
		this.modData('Learnsets', 'electabuzz').learnset.parry = ['2L1'];
		this.modData('Learnsets', 'magmar').learnset.parry = ['2L1'];
		this.modData('Learnsets', 'golduck').learnset.parry = ['2L1'];
		this.modData('Learnsets', 'primeape').learnset.parry = ['2L1'];
		this.modData('Learnsets', 'hitmonchan').learnset.parry = ['2L1'];
		this.modData('Learnsets', 'hitmonlee').learnset.parry = ['2L1'];
		this.modData('Learnsets', 'hitmontop').learnset.parry = ['2L1'];
		this.modData('Learnsets', 'wobbuffet').learnset.parry = ['2L1'];
		
		this.modData('Learnsets', 'entei').learnset.sacredcandle = ['2L1'];
		this.modData('Learnsets', 'hooh').learnset.sacredcandle = ['2L1'];
		this.modData('Learnsets', 'aroofaondo').learnset.sacredcandle = ['2L1'];
		this.modData('Learnsets', 'esscargoo').learnset.sacredcandle = ['2L1'];
		
		this.modData('Learnsets', 'venusaur').learnset.flowermortar = ['2L1'];
		this.modData('Learnsets', 'vileplume').learnset.flowermortar = ['2L1'];
		this.modData('Learnsets', 'bellossom').learnset.flowermortar = ['2L1'];
		this.modData('Learnsets', 'meganium').learnset.flowermortar = ['2L1'];
		this.modData('Learnsets', 'sunflora').learnset.flowermortar = ['2L1'];
		this.modData('Learnsets', 'golduck').learnset.flowermortar = ['2L1'];
		this.modData('Learnsets', 'raichu').learnset.flowermortar = ['2L1'];
		
		this.modData('Learnsets', 'phanpy').learnset.hypeup = ['2L1'];
		this.modData('Learnsets', 'miltank').learnset.hypeup = ['2L1'];
		this.modData('Learnsets', 'eevee').learnset.hypeup = ['2L1'];
		this.modData('Learnsets', 'lickitung').learnset.hypeup = ['2L1'];
		this.modData('Learnsets', 'tunguru').learnset.hypeup = ['2L1'];
		this.modData('Learnsets', 'snubbull').learnset.hypeup = ['2L1'];
		this.modData('Learnsets', 'ursaring').learnset.hypeup = ['2L1'];
	},
};
