export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init: function () {
		/*Template:
		this.modData('Learnsets', 'pokemon').learnset.move = ['8L1'];
		delete this.modData('Learnsets', 'pokemon').learnset.move;*/
		//Changes
		this.modData('Learnsets', 'landorus').learnset.airslash = ['8L1'];
		
		this.modData('Learnsets', 'shaymin').learnset.knockoff = ['8L1'];
		this.modData('Learnsets', 'shaymin').learnset.taunt = ['8L1'];
		
		delete this.modData('Learnsets', 'genesect').learnset.blizzard;
		delete this.modData('Learnsets', 'genesect').learnset.thunder;
		delete this.modData('Learnsets', 'genesect').learnset.thunderbolt;
		
		delete this.modData('Learnsets', 'dreepy').learnset.fireblast;
		delete this.modData('Learnsets', 'dreepy').learnset.hydropump;
		delete this.modData('Learnsets', 'dreepy').learnset.thunder;
		delete this.modData('Learnsets', 'dreepy').learnset.phantomforce;
		delete this.modData('Learnsets', 'drakloak').learnset.fireblast;
		delete this.modData('Learnsets', 'drakloak').learnset.hydropump;
		delete this.modData('Learnsets', 'drakloak').learnset.thunder;
		delete this.modData('Learnsets', 'drakloak').learnset.phantomforce;
		delete this.modData('Learnsets', 'dragapult').learnset.fireblast;
		delete this.modData('Learnsets', 'dragapult').learnset.hydropump;
		delete this.modData('Learnsets', 'dragapult').learnset.thunder;
		delete this.modData('Learnsets', 'dragapult').learnset.phantomforce;
		
		this.modData('Learnsets', 'dragapult').learnset.shadowclaw = ['8L1'];
		this.modData('Learnsets', 'dragapult').learnset.nightslash = ['8L1'];
		
		delete this.modData('Learnsets', 'spectrier').learnset.nastyplot;
		
		delete this.modData('Learnsets', 'groudon').learnset.eruption;
		
		delete this.modData('Learnsets', 'kyogre').learnset.waterspout;
		this.modData('Learnsets', 'kyogre').learnset.flipturn = ['8L1'];
		
		delete this.modData('Learnsets', 'rayquaza').learnset.vcreate;
		delete this.modData('Learnsets', 'rayquaza').learnset.extremespeed;
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
