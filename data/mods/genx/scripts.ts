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
// bushclaws
this.modData('Learnsets', 'absol').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'meowth').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'persian').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'sneasel').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'weavile').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'skitty').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'delcatty').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'glameow').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'purugly').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'espurr').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'meowstic').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'meowsticf').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'purrloin').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'liepard').learnset.bushclaws = ['7L1'];
this.modData('Learnsets', 'oricorio').learnset.revelationspin = ['7L1'];
	},
};
