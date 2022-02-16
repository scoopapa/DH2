export const Scripts: ModdedBattleScriptsData = {
	init: function () {
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
		
		/*Template:
		this.modData('Learnsets', 'pokemon').learnset.move = ['8L1'];
		delete this.modData('Learnsets', 'pokemon').learnset.move;*/
		
		this.modData("Learnsets", "avalugghisui").learnset.block = ["8L1"];
		this.modData("Learnsets", "avalugghisui").learnset.bodypress = ["8L1"];
		this.modData("Learnsets", "avalugghisui").learnset.bodyslam = ["8L1"];
		this.modData("Learnsets", "avalugghisui").learnset.heavyslam = ["8L1"];
		this.modData("Learnsets", "avalugghisui").learnset.roar = ["8L1"];
		this.modData("Learnsets", "avalugghisui").learnset.skullbash = ["8L1"];
		this.modData("Learnsets", "avalugghisui").learnset.stealthrock = ["8L1"];
		this.modData("Learnsets", "avalugghisui").learnset.stompingtantrum = ["8L1"];
		this.modData("Learnsets", "avalugghisui").learnset.superpower = ["8L1"];
		this.modData("Learnsets", "avalugghisui").learnset.wideguard = ["8L1"];
		this.modData("Learnsets", "avalugghisui").learnset.mountaingale = ["8L1"];
		
		this.modData("Learnsets", "lilliganthisui").learnset.grassyterrain = ["8L1"];
		this.modData("Learnsets", "lilliganthisui").learnset.lightscreen = ["8L1"];
		this.modData("Learnsets", "lilliganthisui").learnset.petalblizzard = ["8L1"];
		this.modData("Learnsets", "lilliganthisui").learnset.roleplay = ["8L1"];
		this.modData("Learnsets", "lilliganthisui").learnset.solarblade = ["8L1"];
		this.modData("Learnsets", "lilliganthisui").learnset.swordsdance = ["8L1"];
		this.modData("Learnsets", "lilliganthisui").learnset.teeterdance = ["8L1"];
		this.modData("Learnsets", "lilliganthisui").learnset.victorydance = ["8L1"];
		
		this.modData("Learnsets", "arcaninehisui").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "arcaninehisui").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "arcaninehisui").learnset.ragingfury = ["8L1"];
		
		this.modData("Learnsets", "goodrahisui").learnset.flashcannon = ["8L1"];
		this.modData("Learnsets", "goodrahisui").learnset.shelter = ["8L1"];
		
		this.modData("Learnsets", "braviaryhisui").learnset.confusion = ["8L1"];
		this.modData("Learnsets", "braviaryhisui").learnset.psyshock = ["8L1"];
		this.modData("Learnsets", "braviaryhisui").learnset.futuresight = ["8L1"];
		this.modData("Learnsets", "braviaryhisui").learnset.psybeam = ["8L1"];
		this.modData("Learnsets", "braviaryhisui").learnset.storedpower = ["8L1"];
		this.modData("Learnsets", "braviaryhisui").learnset.esperwing = ["8L1"];

		this.modData("Learnsets", "zoroarkhisui").learnset.poltergeist = ["8L1"];
		this.modData("Learnsets", "zoroarkhisui").learnset.bittermalice = ["8L1"];
		delete this.modData('Learnsets', 'zoroarkhisui').learnset.nightslash;
		delete this.modData('Learnsets', 'zoroarkhisui').learnset.throatchop;
		delete this.modData('Learnsets', 'zoroarkhisui').learnset.nightdaze;

		this.modData("Learnsets", "decidueyehisui").learnset.closecombat = ["8L1"];
		this.modData("Learnsets", "decidueyehisui").learnset.focusblast = ["8L1"];
		this.modData("Learnsets", "decidueyehisui").learnset.coaching = ["8L1"];
		this.modData("Learnsets", "decidueyehisui").learnset.triplearrows = ["8L1"];
		delete this.modData('Learnsets', 'decidueyehisui').learnset.hex;
		delete this.modData('Learnsets', 'decidueyehisui').learnset.phantomforce;
		delete this.modData('Learnsets', 'decidueyehisui').learnset.poltergeist;
		delete this.modData('Learnsets', 'decidueyehisui').learnset.shadowball;
		delete this.modData('Learnsets', 'decidueyehisui').learnset.spiritshackle;
		delete this.modData('Learnsets', 'decidueyehisui').learnset.imprison;
		delete this.modData('Learnsets', 'decidueyehisui').learnset.spite;

		this.modData("Learnsets", "electrodehisui").learnset.grassyglide = ["8L1"];
		this.modData("Learnsets", "electrodehisui").learnset.bulletseed = ["8L1"];
		this.modData("Learnsets", "electrodehisui").learnset.leechseed = ["8L1"];
		this.modData("Learnsets", "electrodehisui").learnset.seedbomb = ["8L1"];
		this.modData("Learnsets", "electrodehisui").learnset.synthesis = ["8L1"];
		this.modData("Learnsets", "electrodehisui").learnset.worryseed = ["8L1"];
		this.modData("Learnsets", "electrodehisui").learnset.chloroblast = ["8L1"];

		this.modData("Learnsets", "typhlosionhisui").learnset.poltergeist = ["8L1"];
		this.modData("Learnsets", "typhlosionhisui").learnset.infernalparade = ["8L1"];

		this.modData("Learnsets", "samurotthisui").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "samurotthisui").learnset.ceaselessedge = ["8L1"];
		
		
		
		this.modData("Learnsets", "beedrill").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "parasect").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "venomoth").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "ledian").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "ariados").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "yanmega").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "granbull").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "beautifly").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "dustox").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "volbeat").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "illumise").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "kecleon").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "kricketune").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "wormadam").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "wormadamtrash").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "wormadamsandy").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "mothim").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "leavanny").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "vivillon").learnset.skittersmack = ["8L1"];
		
		this.modData("Learnsets", "pkmn").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "pkmn").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "pkmn").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "pkmn").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "pkmn").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "pkmn").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "pkmn").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "pkmn").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "pkmn").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "pkmn").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "pkmn").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "pkmn").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "pkmn").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "pkmn").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "pkmn").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "pkmn").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "pkmn").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "pkmn").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "pkmn").learnset.lashout = ["8L1"];
	},
};
