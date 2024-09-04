export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['IF'],
	},	
	
	init() {
		//Free dexited movesets
		const undexitedMons = [];
		for (const pokemon in this.data.FormatsData) {
			//We will skip mons absent from Brunica and custom formes that lack tiers
			const tierData = this.modData("FormatsData",pokemon);
			if (!tierData || !tierData.tier) {
				//console.log(pokemon + " is not in the Brunician Regional Pokedex. I think this is everything.");
				continue;
			}
			const mon = this.modData("Pokedex",pokemon);
			if (!mon) {
				//console.log(pokemon + "'s entry could not be found. Skipping...");
				continue;
			}
			/*
			//Folovo is at 1101 for the time being
			if (mon.num > 1100) {
				//console.log(pokemon + " is a custom Pokemon. Skipping...");
				//Mysterelk is at 1328 so any custom mons before that must be from Brazdo or Loria
				if (mon.num < 1328) mon.gen = 8;
				continue;
			}*/
			
			//We will also skip mons present in SV
			const learnsetData = this.modData("Learnsets", pokemon);
			if (!learnsetData || !learnsetData.learnset) {
				//console.log(pokemon + " has an invalid moveset. Skipping...");
				continue;
			}
			const learnset = learnsetData.learnset;
			//This will exclude inherited movesets and the mons that were in SV, as none of the mons specified to lack Tera Blast are in Desvega
			if (learnset.terablast /* || ['magikarp','ditto','smeargle','cosmog','cosmoem','terapagos'].includes(pokemon)*/) {
				//console.log(pokemon + " was present in Scarlet and Violet. Skipping...");
				
				//Also freeing these moves for realmons
				learnset.hiddenpower = ["9M"];
				learnset.snore = ["9M"];
				learnset.naturalgift = ["9M"];
				learnset.frustration = ["9M"];
				learnset['return'] = ["9M"];
				learnset.takedown = ["9M"];
				continue;
			}
			
			/*
			if (mon.forme) {
				if (['Brazdo','Loria'].includes(mon.forme)) {
					mon.gen = 8;
					//console.log(pokemon + " is a custom regional variant from an earlier Gen X generation. Skipping...");
					continue;
				}
				if (mon.forme.startsWith('Desvega') || mon.forme === 'Brunica') {
					mon.gen = 9;
					//console.log(pokemon + " is a Desvegan regional variant. Skipping...");
					continue;
				}
				if (pokemon.startsWith('rotom')) {
					//console.log(pokemon + " inherits Rotom's moveset. Skipping...");
					continue;
				}
			}*/
			undexitedMons.push(pokemon);
			//console.log(pokemon + " was in Desvega but not Paldea.");
			
			//Toxic distribution is reduced among non-Poisons (the ones that returned for Desvega but not SV that kept it will have it returned)
			if (!mon.types.includes('Poison') && learnset.toxic) delete learnset.toxic;
			//We replace Hail with Snowscape
			if (learnset.hail) {
				delete learnset.hail;
				learnset.snowscape = [];
			}
			//Now we free all the moves
			for (const move in learnset) {
				learnset[move].push("9L1");
			}
		}
		
		
		//melmetal
		this.modData("Learnsets", "melmetal").learnset.goombastomp = ["9L1"];
		
		//toxapex
		this.modData("Learnsets", "toxapex").learnset.fishingminigame = ["9L1"];
		this.modData("Learnsets", "toxapex").learnset.stankyleg = ["9L1"];
		this.modData("Learnsets", "toxapex").learnset.gofish = ["9L1"];
		
		//bramblin
		this.modData("Learnsets", "bramblin").learnset.bounce = ["9L1"];
		this.modData("Learnsets", "bramblin").learnset.eruption = ["9L1"];
		this.modData("Learnsets", "bramblin").learnset.multiattack = ["9L1"];
		this.modData("Learnsets", "bramblin").learnset.solarblade = ["9L1"];
		
		//gholdengo
		this.modData("Learnsets", "gholdengo").learnset.mogoff = ["9L1"];
		this.modData("Learnsets", "gholdengo").learnset.goombastomp = ["9L1"];
		this.modData("Learnsets", "gholdengo").learnset.stankyleg = ["9L1"];
		
		//kingler
		this.modData("Learnsets", "kingler").learnset.icehammer = ["9L1"];
		this.modData("Learnsets", "kingler").learnset.goombastomp = ["9L1"];
		this.modData("Learnsets", "kingler").learnset.gofish = ["9L1"];
		
		//feebas
		this.modData("Learnsets", "feebas").learnset.gofish = ["9L1"];
		
		//glaceon
		this.modData("Learnsets", "glaceon").learnset.surf = ["9L1"];
		this.modData("Learnsets", "glaceon").learnset.hydropump = ["9L1"];
		this.modData("Learnsets", "glaceon").learnset.slackoff = ["9L1"];
		this.modData("Learnsets", "glaceon").learnset.goombastomp = ["9L1"];
		
		//runerigus
		this.modData("Learnsets", "runerigus").learnset.recover = ["9L1"];
		this.modData("Learnsets", "runerigus").learnset.teleport = ["9L1"];
		
		//wyrdeer
		this.modData("Learnsets", "wyrdeer").learnset.goombastomp = ["9L1"];
		
		//moltres
		this.modData("Learnsets", "moltres").learnset.futuresight = ["9L1"];
		this.modData("Learnsets", "moltres").learnset.psychic = ["9L1"];
		this.modData("Learnsets", "moltres").learnset.psyshock = ["9L1"];
		
		//hitmontop
		this.modData("Learnsets", "hitmontop").learnset.triplerkick = ["9L1"];
	}
};