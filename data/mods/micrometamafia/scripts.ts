export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init(){ 
		//To construct learnsets for these evolutions, I'm gonna cheat and copy the code Scoopapa made for construction FE fusion learnsets
		//If you delete moves that a prevo learns from a learnset that's constructed via inheriting said moves from a prevo the way Showdown does normally,
		//it just won't work. 
		//But if you construct the learnset artificially ahead of time, like this, you can then remove moves from it that it would inherit at initialization. 
		for (const id in this.dataCache.Pokedex) {//check the dex for fusions
			const fusionEntry = this.dataCache.Pokedex[id];
			if (fusionEntry.inheritMoves) {//if the pokedex entry has a fusion field, it's a fusion
				const learnsetFusionList = [];//list of pokemon whose learnsets need to be fused
				for (let name of fusionEntry.inheritMoves) {
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
						//if (this.dataCache.Moves[moveid].isNonstandard === 'Past') continue; //exclude dexited moves
						this.modData('Learnsets', id).learnset[moveid] = ['8L1'];//hopefully they dont care about compatibility in this mod
					}
				}
			}
		}
		
		//Now, case-by-case learnset revisions: 
		//this.modData('Learnsets', 'poke').learnset.move = ['8L1'];
		//delete this.modData('Learnsets', 'poke').learnset.move;
		this.modData('Learnsets', 'gastrodon').learnset.scorchingsands = ['8L1'];
		this.modData('Learnsets', 'gastrodon').learnset.flipturn = ['8L1'];
		this.modData('Learnsets', 'gastrodon').learnset.stealthrock = ['8L1'];
		this.modData('Learnsets', 'gastrodon').learnset.knockoff = ['8L1'];
		delete this.modData('Learnsets', 'gastrodon').learnset.clearsmog;
		
		this.modData('Learnsets', 'klefki').learnset.recover = ['8L1'];
		this.modData('Learnsets', 'klefki').learnset.whirlwind = ['8L1'];
		delete this.modData('Learnsets', 'klefki').learnset.spikes;
		delete this.modData('Learnsets', 'klefki').learnset.calmmind;
		
		this.modData('Learnsets', 'regicesaboteur').learnset.recover = ['8L1'];
		this.modData('Learnsets', 'regicesaboteur').learnset.teleport = ['8L1'];
		this.modData('Learnsets', 'regicesaboteur').learnset.hex = ['8L1'];
		this.modData('Learnsets', 'regicesaboteur').learnset.shadowball = ['8L1'];
		this.modData('Learnsets', 'regicesaboteur').learnset.destinybond = ['8L1'];
		
		this.modData('Learnsets', 'skarmory').learnset.uturn = ['8L1'];
		delete this.modData('Learnsets', 'skarmory').learnset.spikes;
		delete this.modData('Learnsets', 'skarmory').learnset.ironhead;
		
		this.modData('Learnsets', 'latiossaboteur').learnset.brickbreak = ['8L1'];
		this.modData('Learnsets', 'latiossaboteur').learnset.drainpunch = ['8L1'];
		this.modData('Learnsets', 'latiossaboteur').learnset.superpower = ['8L1'];
		this.modData('Learnsets', 'latiossaboteur').learnset.seismictoss = ['8L1'];
		this.modData('Learnsets', 'latiossaboteur').learnset.uturn = ['8L1'];
		delete this.modData('Learnsets', 'latiossaboteur').learnset.dracometeor;
		delete this.modData('Learnsets', 'latiossaboteur').learnset.outrage;
		delete this.modData('Learnsets', 'latiossaboteur').learnset.earthquake;
		delete this.modData('Learnsets', 'latiossaboteur').learnset.lightscreen;
		delete this.modData('Learnsets', 'latiossaboteur').learnset.reflect;
		delete this.modData('Learnsets', 'latiossaboteur').learnset.magiccoat;
		delete this.modData('Learnsets', 'latiossaboteur').learnset.mysticalfire;
		delete this.modData('Learnsets', 'latiossaboteur').learnset.futuresight;
		
		this.modData('Learnsets', 'honchkrow').learnset.uturn = ['8L1'];
		this.modData('Learnsets', 'honchkrow').learnset.darkestlariat = ['8L1'];
		
		this.modData('Learnsets', 'sableye').learnset.poltergeist = ['8L1'];
		
		this.modData('Learnsets', 'dedenne').learnset.moonblast = ['8L1'];
		this.modData('Learnsets', 'dedenne').learnset.mysticalfire = ['8L1'];
		
		this.modData('Learnsets', 'salazzle').learnset.moonblast = ['8L1'];
		this.modData('Learnsets', 'salazzle').learnset.playrough = ['8L1'];
		this.modData('Learnsets', 'salazzle').learnset.trick = ['8L1'];
		
		this.modData('Learnsets', 'slowbrogalarsaboteur').learnset.toxicspikes = ['8L1'];
		
		this.modData('Learnsets', 'shiftrysaboteur').learnset.fireblast = ['8L1'];
		this.modData('Learnsets', 'shiftrysaboteur').learnset.flamethrower = ['8L1'];
		this.modData('Learnsets', 'shiftrysaboteur').learnset.flareblitz = ['8L1'];
		this.modData('Learnsets', 'shiftrysaboteur').learnset.hex = ['8L1'];
		
		this.modData('Learnsets', 'articunosaboteur').learnset.powergem = ['8L1'];
		this.modData('Learnsets', 'articunosaboteur').learnset.taunt = ['8L1'];
		
		this.modData('Learnsets', 'sandslashalolasaboteur').learnset.glaciallance = ['8L1'];
		
		//This mmmmmmight not be necessary, but I can't tell how this is gonna turn out in the client while testing
		//so I figure better safe than sorry...
		//Construct Mega Evolution learnsets, for those horrible clowns that for SOME REASON select Megas in the teambuilder
		for (const id in this.dataCache.Pokedex) {
			const pokemon = this.dataCache.Pokedex[id];
			if (pokemon.megaOf) {//if the pokedex entry has a fusion field, it's a fusion
				if (!this.dataCache.Learnsets[id]) this.dataCache.Learnsets[id] = { learnset: {}};//create a blank learnset entry so we don't need a learnsets file
				const learnset = this.dataCache.Learnsets[this.toID(pokemon.megaOf)].learnset;//get the learnset of the mon
				for (const moveid in learnset) {
					//if (this.dataCache.Moves[moveid].isNonstandard === 'Past') continue; //exclude dexited moves
					this.modData('Learnsets', id).learnset[moveid] = ['8L1'];//hopefully they dont care about compatibility in this mod
				}
			}
		}
	},
}; 
