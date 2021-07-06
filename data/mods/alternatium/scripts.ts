export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init: function () {
		/*Template:
		this.modData('Learnsets', 'pokemon').learnset.move = ['8L1'];
		delete this.modData('Learnsets', 'pokemon').learnset.move;*/
		//Changes
		
		delete this.modData('Learnsets', 'darmanitanzen').learnset.crunch;
		delete this.modData('Learnsets', 'darmanitanzen').learnset.knockoff;
		delete this.modData('Learnsets', 'darmanitanzen').learnset.psychicfangs;
		delete this.modData('Learnsets', 'darmanitanzen').learnset.thunderfang;
		
		delete this.modData('Learnsets', 'darmanitangalarzen').learnset.tripleaxel;
		delete this.modData('Learnsets', 'darmanitangalarzen').learnset.accelerock;
		delete this.modData('Learnsets', 'darmanitangalarzen').learnset.bulkup;
		delete this.modData('Learnsets', 'darmanitangalarzen').learnset.irondefense;
		
		delete this.modData('Learnsets', 'zamazentacrowned').learnset.bodypress;
		delete this.modData('Learnsets', 'zamazentacrowned').learnset.uturn;
		delete this.modData('Learnsets', 'zamazentacrowned').learnset.knockoff;
		delete this.modData('Learnsets', 'zamazentacrowned').learnset.bulkup;
		
		delete this.modData('Learnsets', 'rotomheat').learnset.taunt;
		delete this.modData('Learnsets', 'rotomwash').learnset.taunt;
		delete this.modData('Learnsets', 'rotommow').learnset.taunt;
		delete this.modData('Learnsets', 'rotomfrost').learnset.taunt;
		delete this.modData('Learnsets', 'rotomfan').learnset.taunt;
		delete this.modData('Learnsets', 'rotomheat').learnset.recover;
		delete this.modData('Learnsets', 'rotomwash').learnset.recover;
		delete this.modData('Learnsets', 'rotommow').learnset.recover;
		delete this.modData('Learnsets', 'rotomfrost').learnset.recover;
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
