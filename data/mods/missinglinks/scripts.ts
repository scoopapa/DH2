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
	this.modData('Learnsets', 'butterfree').learnset.expandingforce = ['7L1'];
	this.modData('Learnsets', 'butterfree').learnset.extrasensory = ['7L1'];
	this.modData('Learnsets', 'butterfree').learnset.futuresight = ['7L1'];
	this.modData('Learnsets', 'butterfree').learnset.lightscreen = ['7L1'];
	this.modData('Learnsets', 'butterfree').learnset.reflect = ['7L1'];
	this.modData('Learnsets', 'butterfree').learnset.dazzlinggleam = ['7L1'];
	this.modData('Learnsets', 'milotic').learnset.dragonrush = ['7L1'];
	this.modData('Learnsets', 'froslass').learnset.freezedry = ['7L1'];
	this.modData("Learnsets", "machamp").learnset.machpunch = ["8L1"];
	this.modData("Learnsets", "machamp").learnset.forcepalm = ["8L1"];
	this.modData("Learnsets", "machamp").learnset.laserfocus = ["8L1"];
	this.modData("Learnsets", "machamp").learnset.flamewheel = ["8L1"];
	this.modData("Learnsets", "machamp").learnset.stormthrow = ["8L1"];
	this.modData("Learnsets", "machamp").learnset.circlethrow = ["8L1"];
	this.modData("Learnsets", "blastoise").learnset.iceball = ["8L1"];
	this.modData("Learnsets", "blastoise").learnset.iciclespear = ["8L1"];
	this.modData("Learnsets", "blastoise").learnset.hammerarm = ["8L1"];
	this.modData("Learnsets", "venusaur").learnset.shadowball = ["8L1"];
	this.modData("Learnsets", "venusaur").learnset.shadowclaw = ["8L1"];
	this.modData("Learnsets", "dragonite").learnset.playrough = ["8L1"];
	this.modData("Learnsets", "dragonite").learnset.dazzlinggleam = ["8L1"];
	this.modData("Learnsets", "dragonite").learnset.drainingkiss = ["8L1"];
	this.modData("Learnsets", "dragonite").learnset.moonblast = ["8L1"];
	this.modData("Learnsets", "zoroark").learnset.shadowsneak = ["8L1"];
	this.modData("Learnsets", "zoroark").learnset.terrainpulse = ["8L1"];

	},
};
