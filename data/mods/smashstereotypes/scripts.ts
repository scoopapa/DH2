export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init: function () {	

		for (const id in this.dataCache.Pokedex) {//check the dex for fusions
			const fusionEntry = this.dataCache.Pokedex[id];
			if (fusionEntry.fusion) {//if the pokedex entry has a fusion field, it's a fusion
				const learnsetFusionList = [];//list of pokemon whose learnsets need to be fused
				for (let name of fusionEntry.fusion) {
					let prevo = true;
					while (prevo) {//make sure prevos of both fused pokemon are added to the list
						learnsetFusionList.push(name);
						const dexEntry = this.dataCache.Pokedex[this.toID(name)];
						if (dexEntry.prevo) name = dexEntry.prevo;
						else prevo = false;
					}
				}
				if (!this.dataCache.Learnsets[id]) this.dataCache.Learnsets[id] = { learnset: {}};//create a blank learnset entry so we don't need a learnsets file
				for (let name of learnsetFusionList) {					
					const learnset = this.dataCache.Learnsets[this.toID(name)].learnset;//get the learnset of each pokemon in the list
					for (const moveid in learnset) {
						if (this.dataCache.Moves[moveid].isNonstandard === 'Past') continue; //exclude dexited moves (I hope!) 
						this.modData('Learnsets', id).learnset[moveid] = ['8L1'];//all moves are compatible with the fusion's only ability, so just set it to 8L1
					}
				}
			}
		}
		
		for (var id in this.data.Pokedex) {
			if (this.data.Pokedex[id].breedingVariant) {
				const name = this.data.Pokedex[id].baseSpecies;
				const variant = this.data.Pokedex[id].breedingVariant;
				const learnset = this.data.Learnsets[this.toID(name)].learnset;
				if (!this.data.Learnsets[id]) this.data.Learnsets[id] = { learnset: {}};
				for (const moveid in learnset) {
					this.modData('Learnsets', id).learnset[moveid] = ['8L1', '7L1', '6L1', '5L1', '4L1'];
				}
				const weight = (this.data.Pokedex[id].weightkg + this.data.Pokedex[this.toID(variant)].weightkg) / 2;
				this.modData('Pokedex', id).weightkg = weight;
			}
		}
		

		this.modData('Learnsets', 'shaymin').learnset.allterrainblast = ['8L1'];
		this.modData('Learnsets', 'shaymin').learnset.leafage = ['8L1'];
		this.modData('Learnsets', 'shaymin').learnset.shedleaves = ['8L1'];
		
		this.modData('Learnsets', 'heatmor').learnset.spikes = ['8L1'];
		
		
		delete this.modData('Learnsets', 'melmetal').learnset.superpower;
		delete this.modData('Learnsets', 'melmetal').learnset.bodypress;
		delete this.modData('Learnsets', 'melmetal').learnset.brickbreak;
		this.modData('Learnsets', 'melmetal').learnset.bulkup = ['8L1'];
		
		
		this.modData("Learnsets", "machamp").learnset.machpunch = ["8L1"];
		this.modData("Learnsets", "machamp").learnset.forcepalm = ["8L1"];
		this.modData("Learnsets", "machamp").learnset.laserfocus = ["8L1"];
		this.modData("Learnsets", "machamp").learnset.flamewheel = ["8L1"];
		this.modData("Learnsets", "machamp").learnset.stormthrow = ["8L1"];
		this.modData("Learnsets", "machamp").learnset.circlethrow = ["8L1"];
		
		
		this.modData("Learnsets", "sandaconda").learnset.crunch = ["8L1"];
		this.modData("Learnsets", "sandaconda").learnset.suckerpunch = ["8L1"];
		this.modData("Learnsets", "sandaconda").learnset.slitherstrike = ["8L1"];
		
		
		delete this.modData('Learnsets', 'spectrier').learnset.nastyplot;
		
		
		this.modData('Learnsets', 'garbodor').learnset.stealthrock = ["8M"];
		this.modData('Learnsets', 'garbodor').learnset.earthquake = ["8M"];
		this.modData('Learnsets', 'garbodor').learnset.irondefense = ["8M"];
		
		
		this.modData('Learnsets', 'arcanine').learnset.nobleroar = ["8M"];
		this.modData('Learnsets', 'arcanine').learnset.hypervoice = ["8M"];
		this.modData('Learnsets', 'arcanine').learnset.dragonragesylve = ["8M"];
		this.modData('Learnsets', 'arcanine').learnset.flamewheelsylve = ["8M"];
		this.modData('Learnsets', 'arcanine').learnset.incineratesylve = ["8M"];
		this.modData('Learnsets', 'arcanine').learnset.mudslapsylve = ["8M"];
		this.modData('Learnsets', 'arcanine').learnset.stormstrike = ["8M"];
		delete this.modData('Learnsets', 'arcanine').learnset.mudslap;
		delete this.modData('Learnsets', 'arcanine').learnset.incinerate;
		delete this.modData('Learnsets', 'arcanine').learnset.flamewheel;
		delete this.modData('Learnsets', 'arcanine').learnset.dragonrage;
		
		this.modData('Learnsets', 'frosmoth').learnset.moonlight = ["8M"];
		this.modData('Learnsets', 'frosmoth').learnset.thunderbolt = ["8M"];
		
		
		this.modData('Learnsets', 'lunatone').learnset.hiddenpowermiasmons = ["8M"];
		delete this.modData('Learnsets', 'lunatone').learnset.hiddenpower;
	},
	
	teambuilderConfig: {
        // for micrometas to only show custom tiers
        excludeStandardTiers: true,
        // only to specify the order of custom tiers
        customTiers: ['SSS', 'SSS Uber'],
	},
};
