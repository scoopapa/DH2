/*Template:
this.modData('Learnsets', 'pokemon').learnset.move = ['8L1'];
delete this.modData('Learnsets', 'pokemon').learnset.move;*/

export const Scripts: BattleScriptsData = {
	init: function () {
		//Additions
		this.modData('Learnsets', 'shayminsky').learnset.knockoff = ['8L1'];
		this.modData('Learnsets', 'shayminsky').learnset.taunt = ['8L1'];
		this.modData('Learnsets', 'landorus').learnset.airslash = ['8L1'];
		
		this.modData('Learnsets', 'dragapult').learnset.shadowclaw = ['8L1'];
		this.modData('Learnsets', 'dragapult').learnset.nightslash = ['8L1'];
		
		//Removals
		delete this.modData('Learnsets', 'genesect').learnset.blizzard;
		delete this.modData('Learnsets', 'genesect').learnset.thunderbolt;
		delete this.modData('Learnsets', 'genesect').learnset.thunder;
		
		delete this.modData('Learnsets', 'spectrier').learnset.nastyplot;
		
		delete this.modData('Learnsets', 'dragapult').learnset.fireblast;
		delete this.modData('Learnsets', 'dragapult').learnset.hydropump;
		delete this.modData('Learnsets', 'dragapult').learnset.thunder;
		delete this.modData('Learnsets', 'dragapult').learnset.phantomforce;
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
