export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ["NSOU", "NSNFE", "NSLC"],
	},
	init: function() {
		// Nincada
		this.modData("Learnsets", "nincada").learnset.spikes = ["8L1"];
		// Ninjask
		this.modData("Learnsets", "ninjask").learnset.spikes = ["8L1"];
		// Shedinja
		this.modData("Learnsets", "shedinja").learnset.spikes = ["8L1"];
		// Hoothoot
		delete this.modData('Learnsets', 'hoothoot').learnset.toxic;
		// Noctowl
		delete this.modData('Learnsets', 'noctowl').learnset.toxic;
		// Bunnelby
		delete this.modData('Learnsets', 'bunnelby').learnset.toxic;
		// Diggersby
		delete this.modData('Learnsets', 'diggersby').learnset.toxic;
		// Pichu
		delete this.modData('Learnsets', 'pichu').learnset.toxic;
		// Pikachu
		delete this.modData('Learnsets', 'pikachu').learnset.toxic;
		// Raichu
		delete this.modData('Learnsets', 'raichu').learnset.toxic;
		// Raichu-Alola
		delete this.modData('Learnsets', 'raichualola').learnset.toxic;
		// Cleffa
		delete this.modData('Learnsets', 'cleffa').learnset.toxic;
		// Clefairy
		delete this.modData('Learnsets', 'clefairy').learnset.toxic;
		// Clefable
		delete this.modData('Learnsets', 'clefable').learnset.toxic;
		// Timburr
		delete this.modData('Learnsets', 'timburr').learnset.toxic;
		// Gurdurr
		delete this.modData('Learnsets', 'gurdurr').learnset.toxic;
		// Conkeldurr
		delete this.modData('Learnsets', 'conkeldurr').learnset.toxic;
		// Magnemite
		delete this.modData('Learnsets', 'magnemite').learnset.toxic;
		// Magneton
		delete this.modData('Learnsets', 'magneton').learnset.toxic;
		// Magnezone
		delete this.modData('Learnsets', 'magnezone').learnset.toxic;
		// Rotom
		delete this.modData('Learnsets', 'rotom').learnset.toxic;
		// Rotom-Heat
		delete this.modData('Learnsets', 'rotomheat').learnset.toxic;
		// Rotom-Wash
		delete this.modData('Learnsets', 'rotomwash').learnset.toxic;
		// Rotom-Frost
		delete this.modData('Learnsets', 'rotomfrost').learnset.toxic;
		// Rotom-Fan
		delete this.modData('Learnsets', 'rotomfan').learnset.toxic;
		// Rotom-Mow
		delete this.modData('Learnsets', 'rotommow').learnset.toxic;
		// Snover
		delete this.modData('Learnsets', 'snover').learnset.toxic;
		// Abomasnow
		delete this.modData('Learnsets', 'abomasnow').learnset.toxic;
		// Starly
		delete this.modData('Learnsets', 'starly').learnset.toxic;
		// Staravia
		delete this.modData('Learnsets', 'staravia').learnset.toxic;
		// Staraptor
		delete this.modData('Learnsets', 'staraptor').learnset.toxic;
		// Poliwag
		this.modData("Learnsets", "poliwag").learnset.flipturn = ["8L1"];
		// Poliwhirl
		this.modData("Learnsets", "poliwhirl").learnset.flipturn = ["8L1"];
		// Poliwrath
		this.modData("Learnsets", "poliwrath").learnset.rapidspin = ["8L1"];
		this.modData("Learnsets", "poliwrath").learnset.flipturn = ["8L1"];
		// Politoed
		this.modData("Learnsets", "politoed").learnset.rapidspin = ["8L1"];
		this.modData("Learnsets", "politoed").learnset.flipturn = ["8L1"];
		// Dwebble
		delete this.modData('Learnsets', 'dwebble').learnset.toxic;
		// Crustle
		delete this.modData('Learnsets', 'crustle').learnset.toxic;
		// Drilbur
		delete this.modData('Learnsets', 'drilbur').learnset.toxic;
		// Excadrill
		delete this.modData('Learnsets', 'excadrill').learnset.toxic;
		// Phanpy
		delete this.modData('Learnsets', 'phanpy').learnset.toxic;
		// Donphan
		this.modData("Learnsets", "donphan").learnset.milkdrink = ["8L1"];
		delete this.modData('Learnsets', 'donphan').learnset.toxic;
		// Eelektrik
		this.modData("Learnsets", "eelektrik").learnset.strengthsap = ["8L1"];
		// Eelektross
		this.modData("Learnsets", "eelektross").learnset.strengthsap = ["8L1"];
		// Chingling
		delete this.modData('Learnsets', 'chingling').learnset.toxic;
		// Chimecho
		this.modData("Learnsets", "chimecho").learnset.spikes = ["8L1"];
		delete this.modData('Learnsets', 'chimecho').learnset.toxic;
		// Riolu
		delete this.modData('Learnsets', 'riolu').learnset.toxic;
		// Lucario
		delete this.modData('Learnsets', 'lucario').learnset.toxic;
		// Whirlipede
		this.modData("Learnsets", "whirlipede").learnset.superpower = ["8L1"];
		// Scolipede
		this.modData("Learnsets", "scolipede").learnset.superpower = ["8L1"];
		// Rhyhorn
		delete this.modData('Learnsets', 'rhyhorn').learnset.toxic;
		// Rhydon
		delete this.modData('Learnsets', 'rhydon').learnset.toxic;
		// Rhyperior
		delete this.modData('Learnsets', 'rhyperior').learnset.toxic;
		// Swinub
		delete this.modData('Learnsets', 'swinub').learnset.toxic;
		// Piloswine
		delete this.modData('Learnsets', 'piloswine').learnset.toxic;
		// Mamoswine
		delete this.modData('Learnsets', 'mamoswine').learnset.toxic;
		// Skarmory
		delete this.modData('Learnsets', 'skarmory').learnset.toxic;
		// Tornadus
		delete this.modData('Learnsets', 'tornadus').learnset.toxic;
		// Thundurus
		delete this.modData('Learnsets', 'thundurus').learnset.toxic;
		// Landorus
		delete this.modData('Learnsets', 'landorus').learnset.toxic;
		// Latias
		delete this.modData('Learnsets', 'latias').learnset.toxic;
		// Latios
		delete this.modData('Learnsets', 'latios').learnset.toxic;
		// Victini
		delete this.modData('Learnsets', 'victini').learnset.toxic;
	},

};