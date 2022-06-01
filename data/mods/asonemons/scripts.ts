export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init(){
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
						this.modData('Learnsets', id).learnset[moveid] = ['8L1', '7L1', '6L1', '5L1', '4L1'];//all moves are compatible with the fusion's only ability, so just set it to 8L1
					}
				}
			}
		}
		this.modData('Learnsets', 'yanmegashell').learnset.coalsting = ['8L1'];
		delete this.modData('Learnsets', 'yanmegashell').learnset.shellsmash;
		
		this.modData('Learnsets', 'pelipperink').learnset.inkgulp = ['8L1'];
		
		this.modData('Learnsets', 'excadrillboulder').learnset.bouldertoss = ['8L1'];
		
		this.modData('Learnsets', 'vanilluxefur').learnset.icescream = ['8L1'];
		
		this.modData('Learnsets', 'butterfreeangler').learnset.baitsplash = ['8L1'];
		
		this.modData('Learnsets', 'dedenneluchador').learnset.hamsterslam = ['8L1'];
		
		this.modData('Learnsets', 'shucklebrick').learnset.shellstack = ['8L1'];
		
		this.modData('Learnsets', 'munchlaxforest').learnset.biobelly = ['8L1'];
		
		this.modData('Learnsets', 'bunnelbyworker').learnset.hardwork = ['8L1'];
		
		this.modData('Learnsets', 'sirfetchdfantasy').learnset.excaliburslash = ['8L1'];
		
		this.modData('Learnsets', 'frogadierbeetle').learnset.bubbleblades = ['8L1'];
		
		this.modData('Learnsets', 'chandelureballoon').learnset.balloonburner = ['8L1'];

		this.modData('Learnsets', 'infernapeclimber').learnset.extendneck = ['8L1'];
		
		this.modData('Learnsets', 'ribombeecharmer').learnset.pungiblow = ['8L1'];
		
		this.modData('Learnsets', 'beheeyemufo').learnset.beamup = ['8L1'];
		
		this.modData('Learnsets', 'sableyedoom').learnset.darkfractals = ['8L1'];
		
		this.modData('Learnsets', 'mareaniemagma').learnset.sulfuricflame = ['8L1'];
		
		this.modData('Learnsets', 'thwackeydune').learnset.lushsoil = ['8L1'];
		
		this.modData('Learnsets', 'sphealsiren').learnset.entrancingsound = ['8L1'];
		
		this.modData('Learnsets', 'pincurchingoo').learnset.paralyzinggoo = ['8L1'];
		
		this.modData('Learnsets', 'nihilegopsychosis').learnset.neurodrain = ['8L1'];
		
		this.modData('Learnsets', 'stunfiskjagged').learnset.spikeburst = ['8L1'];
		
		this.modData('Learnsets', 'pawniardaviation').learnset.aerialstrike = ['8L1'];
		
		this.modData('Learnsets', 'watchogscout').learnset.airsurveillance = ['8L1'];
		
		this.modData('Learnsets', 'mothimgourd').learnset.gourdspirit = ['8L1'];
		
		this.modData('Learnsets', 'clefairyselene').learnset.moonritual = ['8L1'];
		
		this.modData('Learnsets', 'hoothootperch').learnset.illomen = ['8L1'];
		
		this.modData('Learnsets', 'swoobataroma').learnset.souraroma = ['8L1'];
		
		this.modData('Learnsets', 'blacephalonborealis').learnset.vengefulspirit = ['8L1'];
		
		this.modData('Learnsets', 'malamarparallel').learnset.innerdeviation = ['8L1'];
		
	},
};
