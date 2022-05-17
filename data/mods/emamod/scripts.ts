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
		this.modData("Learnsets", "electrodehisui").learnset.steelroller = ["8L1"];
		this.modData("Learnsets", "electrodehisui").learnset.risingvoltage = ["8L1"];

		this.modData("Learnsets", "typhlosionhisui").learnset.poltergeist = ["8L1"];
		this.modData("Learnsets", "typhlosionhisui").learnset.infernalparade = ["8L1"];
		this.modData("Learnsets", "typhlosionhisui").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "typhlosionhisui").learnset.scorchingsands = ["8L1"];

		this.modData("Learnsets", "samurotthisui").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "samurotthisui").learnset.ceaselessedge = ["8L1"];
		this.modData("Learnsets", "samurotthisui").learnset.coaching = ["8L1"];
		this.modData("Learnsets", "samurotthisui").learnset.flipturn = ["8L1"];
		
		
		
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
		
		this.modData("Learnsets", "raticate").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "raticatealola").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "arbok").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "primeape").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "mukalola").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "feraligatr").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "honchkrow").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "girafarig").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "granbull").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "mightyena").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "slaking").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "cacturne").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "zangoose").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "huntail").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "deoxys").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "kricketune").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "purugly").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "carnivine").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "darkrai").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "emboar").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "zebstrika").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "greninja").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "hoopa").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "gumshoos").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "komala").learnset.lashout = ["8L1"];
		
		this.modData("Learnsets", "arbok").learnset.scaleshot = ["8L1"];
		this.modData("Learnsets", "seviper").learnset.scaleshot = ["8L1"];
		this.modData("Learnsets", "kecleon").learnset.scaleshot = ["8L1"];
		this.modData("Learnsets", "tropius").learnset.scaleshot = ["8L1"];
		this.modData("Learnsets", "serperior").learnset.scaleshot = ["8L1"];
		this.modData("Learnsets", "eelektross").learnset.scaleshot = ["8L1"];
		
		this.modData("Learnsets", "golemalola").learnset.risingvoltage = ["8L1"];
		this.modData("Learnsets", "electrode").learnset.risingvoltage = ["8L1"];
		this.modData("Learnsets", "ampharos").learnset.risingvoltage = ["8L1"];
		this.modData("Learnsets", "probopass").learnset.risingvoltage = ["8L1"];
		this.modData("Learnsets", "plusle").learnset.risingvoltage = ["8L1"];
		this.modData("Learnsets", "minun").learnset.risingvoltage = ["8L1"];
		this.modData("Learnsets", "zebstrika").learnset.risingvoltage = ["8L1"];
		this.modData("Learnsets", "eelektross").learnset.risingvoltage = ["8L1"];
		this.modData("Learnsets", "meloetta").learnset.risingvoltage = ["8L1"];
		
		this.modData("Learnsets", "granbull").learnset.mistyexplosion = ["8L1"];
		this.modData("Learnsets", "florges").learnset.mistyexplosion = ["8L1"];
		
		this.modData("Learnsets", "primeape").learnset.coaching = ["8L1"];
		this.modData("Learnsets", "furret").learnset.coaching = ["8L1"];
		this.modData("Learnsets", "breloom").learnset.coaching = ["8L1"];
		this.modData("Learnsets", "slaking").learnset.coaching = ["8L1"];
		this.modData("Learnsets", "hariyama").learnset.coaching = ["8L1"];
		this.modData("Learnsets", "medicham").learnset.coaching = ["8L1"];
		this.modData("Learnsets", "plusle").learnset.coaching = ["8L1"];
		this.modData("Learnsets", "minun").learnset.coaching = ["8L1"];
		this.modData("Learnsets", "volbeat").learnset.coaching = ["8L1"];
		this.modData("Learnsets", "illumise").learnset.coaching = ["8L1"];
		this.modData("Learnsets", "infernape").learnset.coaching = ["8L1"];
		this.modData("Learnsets", "floatzel").learnset.coaching = ["8L1"];
		this.modData("Learnsets", "samurott").learnset.coaching = ["8L1"];
		this.modData("Learnsets", "leavanny").learnset.coaching = ["8L1"];
		this.modData("Learnsets", "meloetta").learnset.coaching = ["8L1"];
		this.modData("Learnsets", "chesnaught").learnset.coaching = ["8L1"];
		this.modData("Learnsets", "crabominable").learnset.coaching = ["8L1"];
		
		this.modData("Learnsets", "raticate").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "raticatealola").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "arbok").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "primeape").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "typhlosion").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "magcargo").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "houndoom").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "slaking").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "camerupt").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "deoxys").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "infernape").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "emboar").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "simisear").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "zebstrika").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "delphox").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "pyroar").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "toucannon").learnset.burningjealousy = ["8L1"];
		
		this.modData("Learnsets", "pidgeot").learnset.dualwingbeat = ["8L1"];
		this.modData("Learnsets", "fearow").learnset.dualwingbeat = ["8L1"];
		this.modData("Learnsets", "jumpluff").learnset.dualwingbeat = ["8L1"];
		this.modData("Learnsets", "yanmega").learnset.dualwingbeat = ["8L1"];
		this.modData("Learnsets", "honchkrow").learnset.dualwingbeat = ["8L1"];
		this.modData("Learnsets", "mismagius").learnset.dualwingbeat = ["8L1"];
		this.modData("Learnsets", "gliscor").learnset.dualwingbeat = ["8L1"];
		this.modData("Learnsets", "beautifly").learnset.dualwingbeat = ["8L1"];
		this.modData("Learnsets", "dustox").learnset.dualwingbeat = ["8L1"];
		this.modData("Learnsets", "swellow").learnset.dualwingbeat = ["8L1"];
		this.modData("Learnsets", "staraptor").learnset.dualwingbeat = ["8L1"];
		this.modData("Learnsets", "mothim").learnset.dualwingbeat = ["8L1"];
		this.modData("Learnsets", "chatot").learnset.dualwingbeat = ["8L1"];
		this.modData("Learnsets", "shaymin").learnset.dualwingbeat = ["8L1"];
		this.modData("Learnsets", "swanna").learnset.dualwingbeat = ["8L1"];
		this.modData("Learnsets", "toucannon").learnset.dualwingbeat = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.dualwingbeat = ["8L1"];
		
		this.modData("Learnsets", "mismagius").learnset.poltergeist = ["8L1"];
		this.modData("Learnsets", "banette").learnset.poltergeist = ["8L1"];
		this.modData("Learnsets", "hoopa").learnset.poltergeist = ["8L1"];
		
		this.modData("Learnsets", "parasect").learnset.grassyglide = ["8L1"];
		this.modData("Learnsets", "victreebel").learnset.grassyglide = ["8L1"];
		this.modData("Learnsets", "meganium").learnset.grassyglide = ["8L1"];
		this.modData("Learnsets", "sunflora").learnset.grassyglide = ["8L1"];
		this.modData("Learnsets", "cacturne").learnset.grassyglide = ["8L1"];
		this.modData("Learnsets", "torterra").learnset.grassyglide = ["8L1"];
		this.modData("Learnsets", "wormadam").learnset.grassyglide = ["8L1"];
		this.modData("Learnsets", "shaymin").learnset.grassyglide = ["8L1"];
		this.modData("Learnsets", "serperior").learnset.grassyglide = ["8L1"];
		this.modData("Learnsets", "simisage").learnset.grassyglide = ["8L1"];
		this.modData("Learnsets", "leavanny").learnset.grassyglide = ["8L1"];
		this.modData("Learnsets", "gogoat").learnset.grassyglide = ["8L1"];
		
		this.modData("Learnsets", "golem").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "golemalola").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "typhlosion").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "magcargo").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "houndoom").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "donphan").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "camerupt").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "torterra").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "infernape").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "wormadamsandy").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "emboar").learnset.scorchingsands = ["8L1"];
		
		this.modData("Learnsets", "dodrio").learnset.tripleaxel = ["8L1"];
		this.modData("Learnsets", "dewgong").learnset.tripleaxel = ["8L1"];
		this.modData("Learnsets", "ledian").learnset.tripleaxel = ["8L1"];
		this.modData("Learnsets", "ambipom").learnset.tripleaxel = ["8L1"];
		this.modData("Learnsets", "girafarig").learnset.tripleaxel = ["8L1"];
		this.modData("Learnsets", "delcatty").learnset.tripleaxel = ["8L1"];
		this.modData("Learnsets", "spinda").learnset.tripleaxel = ["8L1"];
		this.modData("Learnsets", "sawsbuck").learnset.tripleaxel = ["8L1"];
		
		this.modData("Learnsets", "victreebel").learnset.terrainpulse = ["8L1"];
		this.modData("Learnsets", "donphan").learnset.terrainpulse = ["8L1"];
		this.modData("Learnsets", "castform").learnset.terrainpulse = ["8L1"];
		this.modData("Learnsets", "watchog").learnset.terrainpulse = ["8L1"];
		this.modData("Learnsets", "simisage").learnset.terrainpulse = ["8L1"];
		this.modData("Learnsets", "simisear").learnset.terrainpulse = ["8L1"];
		this.modData("Learnsets", "simipour").learnset.terrainpulse = ["8L1"];
		this.modData("Learnsets", "sawsbuck").learnset.terrainpulse = ["8L1"];
		this.modData("Learnsets", "meloetta").learnset.terrainpulse = ["8L1"];
		this.modData("Learnsets", "vivillon").learnset.terrainpulse = ["8L1"];
		this.modData("Learnsets", "pyroar").learnset.terrainpulse = ["8L1"];
		this.modData("Learnsets", "furfrou").learnset.terrainpulse = ["8L1"];
		
		this.modData("Learnsets", "arbok").learnset.corrosivegas = ["8L1"];
		this.modData("Learnsets", "victreebel").learnset.corrosivegas = ["8L1"];
		this.modData("Learnsets", "muk").learnset.corrosivegas = ["8L1"];
		this.modData("Learnsets", "swalot").learnset.corrosivegas = ["8L1"];
		this.modData("Learnsets", "eelektross").learnset.corrosivegas = ["8L1"];
		
		this.modData("Learnsets", "hypno").learnset.expandingforce = ["8L1"];
		this.modData("Learnsets", "girafarig").learnset.expandingforce = ["8L1"];
		this.modData("Learnsets", "medicham").learnset.expandingforce = ["8L1"];
		this.modData("Learnsets", "grumpig").learnset.expandingforce = ["8L1"];
		this.modData("Learnsets", "chimecho").learnset.expandingforce = ["8L1"];
		this.modData("Learnsets", "gorebyss").learnset.expandingforce = ["8L1"];
		this.modData("Learnsets", "deoxys").learnset.expandingforce = ["8L1"];
		this.modData("Learnsets", "hoopa").learnset.expandingforce = ["8L1"];
		this.modData("Learnsets", "bruxish").learnset.expandingforce = ["8L1"];
		
		this.modData("Learnsets", "golem").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "golemalola").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "meganium").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "mismagius").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "magcargo").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "probopass").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "camerupt").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "grumpig").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "deoxys").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "torterra").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "empoleon").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "rampardos").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "bastiodon").learnset.meteorbeam = ["8L1"];
		
		this.modData("Learnsets", "electrode").learnset.steelroller = ["8L1"];
		this.modData("Learnsets", "forretress").learnset.steelroller = ["8L1"];
		this.modData("Learnsets", "donphan").learnset.steelroller = ["8L1"];
		this.modData("Learnsets", "probopass").learnset.steelroller = ["8L1"];
		this.modData("Learnsets", "empoleon").learnset.steelroller = ["8L1"];
		this.modData("Learnsets", "bastiodon").learnset.steelroller = ["8L1"];
		this.modData("Learnsets", "wormadamtrash").learnset.steelroller = ["8L1"];
		
		this.modData("Learnsets", "dewgong").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "feraligatr").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "huntail").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "gorebyss").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "luvdisc").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "empoleon").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "bibarel").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "floatzel").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "lumineon").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "phione").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "manaphy").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "samurott").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "simipour").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "swanna").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "alomomola").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "eelektross").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "bruxish").learnset.flipturn = ["8L1"];
		
		
		this.modData('Learnsets', 'pichu').learnset.babydolleyes = ['8L1'];
		this.modData('Learnsets', 'pichu').learnset.quickattack = ['8L1'];
		this.modData('Learnsets', 'pichu').learnset.spark = ['8L1'];
		
		this.modData('Learnsets', 'cleffa').learnset.tackle = ['8L1'];
		this.modData('Learnsets', 'cleffa').learnset.swift = ['8L1'];
		this.modData('Learnsets', 'cleffa').learnset.fairywind = ['8L1'];
		this.modData('Learnsets', 'cleffa').learnset.calmmind = ['8L1'];
		this.modData('Learnsets', 'cleffa').learnset.moonblast = ['8L1'];
		
		this.modData('Learnsets', 'vulpix').learnset.flamewheel = ['8L1'];
		this.modData('Learnsets', 'vulpix').learnset.nastyplot = ['8L1'];
		
		this.modData('Learnsets', 'vulpixalola').learnset.quickattack = ['8L1'];
		this.modData('Learnsets', 'vulpixalola').learnset.energyball = ['8L1'];
		this.modData('Learnsets', 'vulpixalola').learnset.icefang = ['8L1'];
		this.modData('Learnsets', 'vulpixalola').learnset.nastyplot = ['8L1'];
		
		this.modData('Learnsets', 'zubat').learnset.crosspoison = ['8L1'];
		
		this.modData('Learnsets', 'psyduck').learnset.bubble = ['8L1'];
		this.modData('Learnsets', 'psyduck').learnset.triattack = ['8L1'];
		
		this.modData('Learnsets', 'kadabra').learnset.hypnosis = ['8L1'];
		
		this.modData('Learnsets', 'machop').learnset.tackle = ['8L1'];
		this.modData('Learnsets', 'machop').learnset.machpunch = ['8L1'];
		this.modData('Learnsets', 'machop').learnset.doublehit = ['8L1'];
		this.modData('Learnsets', 'machamp').learnset.drainpunch = ['8L1'];
		
		this.modData('Learnsets', 'ponyta').learnset.doublehit = ['8L1'];
		
		this.modData('Learnsets', 'grimer').learnset.smog = ['8L1'];
		
		this.modData('Learnsets', 'gengar').learnset.powershift = ['8L1'];
		
		this.modData('Learnsets', 'onix').learnset.powershift = ['8L1'];
		this.modData('Learnsets', 'steelix').learnset.iceball = ['8L1'];
		
		this.modData('Learnsets', 'voltorb').learnset.thundershock = ['8L1'];
		
		this.modData('Learnsets', 'lickitung').learnset.tackle = ['8L1'];
		this.modData('Learnsets', 'lickitung').learnset.iceball = ['8L1'];
		
		this.modData('Learnsets', 'rhyhorn').learnset.gigaimpact = ['8L1'];
		
		this.modData('Learnsets', 'happiny').learnset.tackle = ['8L1'];
		this.modData('Learnsets', 'happiny').learnset.drainingkiss = ['8L1'];
		this.modData('Learnsets', 'happiny').learnset.fairywind = ['8L1'];
		this.modData('Learnsets', 'happiny').learnset.doubleedge = ['8L1'];
		this.modData('Learnsets', 'happiny').learnset.softboiled = ['8L1'];
		this.modData('Learnsets', 'happiny').learnset.calmmind = ['8L1'];
		this.modData('Learnsets', 'chansey').learnset.babydolleyes = ['8L1'];
		this.modData('Learnsets', 'blissey').learnset.powershift = ['8L1'];
		
		this.modData('Learnsets', 'tangela').learnset.acidspray = ['8L1'];
		this.modData('Learnsets', 'tangela').learnset.doublehit = ['8L1'];
		
		this.modData('Learnsets', 'mimejr').learnset.powershift = ['8L1'];
		this.modData('Learnsets', 'mimejr').learnset.irondefense = ['8L1'];
		this.modData('Learnsets', 'mimejr').learnset.zenheadbutt = ['8L1'];
		
		this.modData('Learnsets', 'scyther').learnset.calmmind = ['8L1'];
		this.modData('Learnsets', 'scyther').learnset.closecombat = ['8L1'];
		
		this.modData('Learnsets', 'elekid').learnset.spark = ['8L1'];
		
		this.modData('Learnsets', 'magby').learnset.tackle = ['8L1'];
		this.modData('Learnsets', 'magby').learnset.poisongas = ['8L1'];
		
		this.modData('Learnsets', 'gyarados').learnset.focusenergy = ['8L1'];
		
		this.modData('Learnsets', 'eevee').learnset.calmmind = ['8L1'];
		this.modData('Learnsets', 'vaporeon').learnset.bubble = ['8L1'];
		this.modData('Learnsets', 'flareon').learnset.powershift = ['8L1'];
		this.modData('Learnsets', 'umbreon').learnset.powershift = ['8L1'];
		this.modData('Learnsets', 'leafeon').learnset.leafage = ['8L1'];
		
		this.modData('Learnsets', 'porygon').learnset.spark = ['8L1'];
		this.modData('Learnsets', 'porygonz').learnset.powershift = ['8L1'];
		
		this.modData('Learnsets', 'munchlax').learnset.iceball = ['8L1'];
		this.modData('Learnsets', 'munchlax').learnset.gigaimpact = ['8L1'];
		this.modData('Learnsets', 'munchlax').learnset.highhorsepower = ['8L1'];
		
		this.modData('Learnsets', 'spinarak').learnset.bugbuzz = ['8L1'];
		
		this.modData('Learnsets', 'togepi').learnset.tackle = ['8L1'];
		this.modData('Learnsets', 'togepi').learnset.calmmind = ['8L1'];
		this.modData('Learnsets', 'togepi').learnset.moonblast = ['8L1'];
		this.modData('Learnsets', 'togepi').learnset.babydolleyes = ['8L1'];
		this.modData('Learnsets', 'togetic').learnset.airslash = ['8L1'];
		
		this.modData('Learnsets', 'bonsly').learnset.irondefense = ['8L1'];
		this.modData('Learnsets', 'bonsly').learnset.headsmash = ['8L1'];
		this.modData('Learnsets', 'sudowoodo').learnset.tackle = ['8L1'];
		
		this.modData('Learnsets', 'aipom').learnset.quickattack = ['8L1'];
		this.modData('Learnsets', 'aipom').learnset.mudbomb = ['8L1'];
		this.modData('Learnsets', 'ambipom').learnset.doubleedge = ['8L1'];
		
		this.modData('Learnsets', 'murkrow').learnset.airslash = ['8L1'];
		this.modData('Learnsets', 'murkrow').learnset.nightslash = ['8L1'];
		this.modData('Learnsets', 'murkrow').learnset.nastyplot = ['8L1'];
		this.modData('Learnsets', 'murkrow').learnset.gust = ['8L1'];
		
		this.modData('Learnsets', 'gligar').learnset.mudbomb = ['8L1'];
		this.modData('Learnsets', 'gligar').learnset.mudslap = ['8L1'];
		this.modData('Learnsets', 'gliscor').learnset.pinmissle = ['8L1'];
		this.modData('Learnsets', 'gliscor').learnset.spikes = ['8L1'];
		this.modData('Learnsets', 'gliscor').learnset.powershift = ['8L1'];
		
		this.modData('Learnsets', 'heracross').learnset.slash = ['8L1'];
		this.modData('Learnsets', 'heracross').learnset.outrage = ['8L1'];
		this.modData('Learnsets', 'heracross').learnset.calmmind = ['8L1'];
		
		this.modData('Learnsets', 'teddiursa').learnset.tackle = ['8L1'];
		this.modData('Learnsets', 'teddiursa').learnset.highhorsepower = ['8L1'];
		
		this.modData('Learnsets', 'swinub').learnset.babydolleyes = ['8L1'];
		this.modData('Learnsets', 'piloswine').learnset.highhorsepower = ['8L1'];
		
		this.modData('Learnsets', 'remoraid').learnset.bubble = ['8L1'];
		
		this.modData('Learnsets', 'mantyke').learnset.powershift = ['8L1'];
		this.modData('Learnsets', 'mantyke').learnset.doubleedge = ['8L1'];
		this.modData('Learnsets', 'mantyke').learnset.roost = ['8L1'];
		
		this.modData('Learnsets', 'stantler').learnset.confusion = ['8L1'];
		this.modData('Learnsets', 'stantler').learnset.entrainment = ['8L1'];
		this.modData('Learnsets', 'stantler').learnset.lunge = ['8L1'];
		
		this.modData('Learnsets', 'beautifly').learnset.airslash = ['8L1'];
		this.modData('Learnsets', 'beautifly').learnset.leechlife = ['8L1'];
		
		this.modData('Learnsets', 'dustox').learnset.extrasensory = ['8L1'];
		this.modData('Learnsets', 'dustox').learnset.leechlife = ['8L1'];
		
		this.modData('Learnsets', 'ralts').learnset.icebeam = ['8L1'];
		this.modData('Learnsets', 'gardevoir').learnset.recover = ['8L1'];
		this.modData('Learnsets', 'gardevoir').learnset.aurasphere = ['8L1'];
		this.modData('Learnsets', 'gallade').learnset.focusenergy = ['8L1'];
		
		this.modData('Learnsets', 'nosepass').learnset.flashcannon = ['8L1'];
		this.modData('Learnsets', 'nosepass').learnset.powershift = ['8L1'];
		
		this.modData('Learnsets', 'budew').learnset.poisonpowder = ['8L1'];
		this.modData('Learnsets', 'budew').learnset.poisonsting = ['8L1'];
		this.modData('Learnsets', 'budew').learnset.petaldance = ['8L1'];
		this.modData('Learnsets', 'budew').learnset.poisonjab = ['8L1'];
		
		this.modData('Learnsets', 'cacnea').learnset.assurance = ['8L1'];
		
		this.modData('Learnsets', 'barboach').learnset.zenheadbutt = ['8L1'];
		this.modData('Learnsets', 'whiscash').learnset.airslash = ['8L1'];
		
		this.modData('Learnsets', 'duskull').learnset.absorb = ['8L1'];
		this.modData('Learnsets', 'duskull').learnset.leechlife = ['8L1'];
		this.modData('Learnsets', 'dusclops').learnset.powershift = ['8L1'];
		
		this.modData('Learnsets', 'chingling').learnset.tackle = ['8L1'];
		this.modData('Learnsets', 'chingling').learnset.ominouswind = ['8L1'];
		this.modData('Learnsets', 'chingling').learnset.doubleedge = ['8L1'];
		this.modData('Learnsets', 'chingling').learnset.extrasensory = ['8L1'];
		this.modData('Learnsets', 'chingling').learnset.energyball = ['8L1'];
		
		this.modData('Learnsets', 'spheal').learnset.babydolleyes = ['8L1'];
		this.modData('Learnsets', 'spheal').learnset.liquidation = ['8L1'];
		
		this.modData('Learnsets', 'turtwig').learnset.sleeppowder = ['8L1'];
		this.modData('Learnsets', 'turtwig').learnset.leafblade = ['8L1'];
		this.modData('Learnsets', 'turtwig').learnset.bulldoze = ['8L1'];
		this.modData('Learnsets', 'turtwig').learnset.leafage = ['8L1'];
		this.modData('Learnsets', 'torterra').learnset.headlongrush = ['8L1'];
		
		this.modData('Learnsets', 'chimchar').learnset.tackle = ['8L1'];
		this.modData('Learnsets', 'chimchar').learnset.doubleedge = ['8L1'];
		this.modData('Learnsets', 'chimchar').learnset.drainpunch = ['8L1'];
		this.modData('Learnsets', 'infernape').learnset.ragingfury = ['8L1'];
		
		this.modData('Learnsets', 'piplup').learnset.doubleedge = ['8L1'];
		this.modData('Learnsets', 'piplup').learnset.roost = ['8L1'];
		this.modData('Learnsets', 'piplup').learnset.babydolleyes = ['8L1'];
		this.modData('Learnsets', 'piplup').learnset.liquidation = ['8L1'];
		this.modData('Learnsets', 'piplup').learnset.watergun = ['8L1'];
		this.modData('Learnsets', 'piplup').learnset.charm = ['8L1'];
		this.modData('Learnsets', 'empoleon').learnset.wavecrash = ['8L1'];
		
		this.modData('Learnsets', 'starly').learnset.gust = ['8L1'];
		this.modData('Learnsets', 'starly').learnset.airslash = ['8L1'];
		this.modData('Learnsets', 'starly').learnset.gigaimpact = ['8L1'];
		this.modData('Learnsets', 'staraptor').learnset.focusenergy = ['8L1'];
		
		this.modData('Learnsets', 'bidoof').learnset.bite = ['8L1'];
		
		this.modData('Learnsets', 'kricketot').learnset.tackle = ['8L1'];
		this.modData('Learnsets', 'kricketot').learnset.absorb = ['8L1'];
		
		this.modData('Learnsets', 'cranidos').learnset.tackle = ['8L1'];
		this.modData('Learnsets', 'cranidos').learnset.doubleedge = ['8L1'];
		this.modData('Learnsets', 'cranidos').learnset.bite = ['8L1'];
		this.modData('Learnsets', 'rampardos').learnset.powershift = ['8L1'];
		
		this.modData('Learnsets', 'shieldon').learnset.tackle = ['8L1'];
		this.modData('Learnsets', 'bastiodon').learnset.powershift = ['8L1'];
		
		this.modData('Learnsets', 'burmy').learnset.gust = ['8L1'];
		this.modData('Learnsets', 'burmy').learnset.silverwind = ['8L1'];
		this.modData('Learnsets', 'burmy').learnset.strugglebug = ['8L1'];
		this.modData('Learnsets', 'wormadam').learnset.magicalleaf = ['8L1'];
		this.modData('Learnsets', 'wormadam').learnset.dig = ['8L1'];
		this.modData('Learnsets', 'wormadamsandy').learnset.dig = ['8L1'];
		this.modData('Learnsets', 'wormadamsandy').learnset.gigadrain = ['8L1'];
		this.modData('Learnsets', 'wormadamsandy').learnset.solarbeam = ['8L1'];
		this.modData('Learnsets', 'wormadamtrash').learnset.dig = ['8L1'];
		this.modData('Learnsets', 'wormadamtrash').learnset.gigadrain = ['8L1'];
		this.modData('Learnsets', 'wormadamtrash').learnset.solarbeam = ['8L1'];
		
		this.modData('Learnsets', 'vespiquen').learnset.recover = ['8L1'];
		this.modData('Learnsets', 'vespiquen').learnset.powershift = ['8L1'];
		
		this.modData('Learnsets', 'pachirisu').learnset.thundershock = ['8L1'];
		this.modData('Learnsets', 'pachirisu').learnset.crunch = ['8L1'];
		this.modData('Learnsets', 'pachirisu').learnset.playrough = ['8L1'];
		
		this.modData('Learnsets', 'cherubi').learnset.doubleedge = ['8L1'];
		this.modData('Learnsets', 'cherubi').learnset.absorb = ['8L1'];
		this.modData('Learnsets', 'cherubi').learnset.stunspore = ['8L1'];
		this.modData('Learnsets', 'cherubi').learnset.sleeppowder = ['8L1'];
		this.modData('Learnsets', 'cherrim').learnset.petaldance = ['8L1'];
		
		this.modData('Learnsets', 'shellos').learnset.tackle = ['8L1'];
		
		this.modData('Learnsets', 'drifloon').learnset.confusion = ['8L1'];
		this.modData('Learnsets', 'drifloon').learnset.extrasensory = ['8L1'];
		this.modData('Learnsets', 'drifloon').learnset.mysticalfire = ['8L1'];
		this.modData('Learnsets', 'drifblim').learnset.powershift = ['8L1'];
		
		this.modData('Learnsets', 'buneary').learnset.doubleedge = ['8L1'];
		this.modData('Learnsets', 'buneary').learnset.drainingkiss = ['8L1'];
		this.modData('Learnsets', 'lopunny').learnset.machpunch = ['8L1'];
		
		this.modData('Learnsets', 'glameow').learnset.tackle = ['8L1'];
		this.modData('Learnsets', 'glameow').learnset.doubleedge = ['8L1'];
		this.modData('Learnsets', 'glameow').learnset.nightslash = ['8L1'];
		this.modData('Learnsets', 'glameow').learnset.nastyplot = ['8L1'];
		
		this.modData('Learnsets', 'stunky').learnset.tackle = ['8L1'];
		this.modData('Learnsets', 'stunky').learnset.doubleedge = ['8L1'];
		this.modData('Learnsets', 'stunky').learnset.poisongas = ['8L1'];
		
		this.modData('Learnsets', 'chatot').learnset.gust = ['8L1'];
		this.modData('Learnsets', 'chatot').learnset.airslash = ['8L1'];
		this.modData('Learnsets', 'chatot').learnset.hurricane = ['8L1'];
		this.modData('Learnsets', 'chatot').learnset.snarl = ['8L1'];
		this.modData('Learnsets', 'chatot').learnset.playrough = ['8L1'];
		this.modData('Learnsets', 'chatot').learnset.powershift = ['8L1'];
		this.modData('Learnsets', 'chatot').learnset.partingshot = ['8L1'];
		
		this.modData('Learnsets', 'spiritomb').learnset.extrasensory = ['8L1'];
		
		this.modData('Learnsets', 'riolu').learnset.focusenergy = ['8L1'];
		this.modData('Learnsets', 'riolu').learnset.closecombat = ['8L1'];
		this.modData('Learnsets', 'lucario').learnset.machpunch = ['8L1'];
		
		this.modData('Learnsets', 'hippopotas').learnset.mudbomb = ['8L1'];
		
		this.modData('Learnsets', 'croagunk').learnset.closecombat = ['8L1'];
		this.modData('Learnsets', 'croagunk').learnset.earthpower = ['8L1'];
		
		this.modData('Learnsets', 'carnivine').learnset.absorb = ['8L1'];
		this.modData('Learnsets', 'carnivine').learnset.leechlife = ['8L1'];
		
		this.modData('Learnsets', 'finneon').learnset.bubble = ['8L1'];
		this.modData('Learnsets', 'finneon').learnset.roost = ['8L1'];
		this.modData('Learnsets', 'finneon').learnset.airslash = ['8L1'];
		this.modData('Learnsets', 'finneon').learnset.babydolleyes = ['8L1'];
		this.modData('Learnsets', 'lumineon').learnset.aerialace = ['8L1'];
		
		this.modData('Learnsets', 'snover').learnset.iciclecrash = ['8L1'];
		
		this.modData('Learnsets', 'yanma').learnset.crunch = ['8L1'];
		this.modData('Learnsets', 'yanma').learnset.gust = ['8L1'];
		this.modData('Learnsets', 'yanma').learnset.swordsdance = ['8L1'];
		
		this.modData('Learnsets', 'uxie').learnset.hypnosis = ['8L1'];
		this.modData('Learnsets', 'uxie').learnset.doublehit = ['8L1'];
		this.modData('Learnsets', 'uxie').learnset.powershift = ['8L1'];
		this.modData('Learnsets', 'uxie').learnset.mysticalpower = ['8L1'];
		
		this.modData('Learnsets', 'mesprit').learnset.recover = ['8L1'];
		this.modData('Learnsets', 'mesprit').learnset.doublehit = ['8L1'];
		this.modData('Learnsets', 'mesprit').learnset.mysticalpower = ['8L1'];
		
		this.modData('Learnsets', 'azelf').learnset.doublehit = ['8L1'];
		this.modData('Learnsets', 'azelf').learnset.powershift = ['8L1'];
		this.modData('Learnsets', 'azelf').learnset.mysticalpower = ['8L1'];
		
		this.modData('Learnsets', 'heatran').learnset.ember = ['8L1'];
		
		this.modData('Learnsets', 'regigigas').learnset.tackle = ['8L1'];
		this.modData('Learnsets', 'regigigas').learnset.powershift = ['8L1'];
		
		this.modData('Learnsets', 'cresselia').learnset.tackle = ['8L1'];
		this.modData('Learnsets', 'cresselia').learnset.recover = ['8L1'];
		this.modData('Learnsets', 'cresselia').learnset.powershift = ['8L1'];
		this.modData('Learnsets', 'cresselia').learnset.lunarblessing = ['8L1'];
		
		this.modData('Learnsets', 'phione').learnset.calmmind = ['8L1'];
		this.modData('Learnsets', 'phione').learnset.zenheadbutt = ['8L1'];
		this.modData('Learnsets', 'phione').learnset.moonblast = ['8L1'];
		this.modData('Learnsets', 'phione').learnset.takeheart = ['8L1'];
		this.modData('Learnsets', 'phione').learnset.watergun = ['8L1'];
		
		this.modData('Learnsets', 'manaphy').learnset.zenheadbutt = ['8L1'];
		this.modData('Learnsets', 'manaphy').learnset.moonblast = ['8L1'];
		this.modData('Learnsets', 'manaphy').learnset.takeheart = ['8L1'];
		this.modData('Learnsets', 'manaphy').learnset.watergun = ['8L1'];
		
		this.modData('Learnsets', 'darkrai').learnset.shadowsneak = ['8L1'];
		this.modData('Learnsets', 'darkrai').learnset.hex = ['8L1'];
		this.modData('Learnsets', 'darkrai').learnset.confuseray = ['8L1'];
		
		this.modData('Learnsets', 'shaymin').learnset.sleeppowder = ['8L1'];
		this.modData('Learnsets', 'shaymin').learnset.recover = ['8L1'];
		this.modData('Learnsets', 'shaymin').learnset.aerialace = ['8L1'];
		this.modData('Learnsets', 'shaymin').learnset.playrough = ['8L1'];
		this.modData('Learnsets', 'shaymin').learnset.babydolleyes = ['8L1'];
		this.modData('Learnsets', 'shaymin').learnset.leafage = ['8L1'];
		
		this.modData('Learnsets', 'arceus').learnset.confusion = ['8L1'];
		this.modData('Learnsets', 'arceus').learnset.quickattack = ['8L1'];
		this.modData('Learnsets', 'arceus').learnset.extrasensory = ['8L1'];
		this.modData('Learnsets', 'arceus').learnset.mysticalfire = ['8L1'];
		this.modData('Learnsets', 'arceus').learnset.dazzlinggleam = ['8L1'];
		this.modData('Learnsets', 'arceus').learnset.healingwish = ['8L1'];
		
		this.modData('Learnsets', 'oshawott').learnset.slash = ['8L1'];
		
		this.modData('Learnsets', 'petilil').learnset.poisonpowder = ['8L1'];
		this.modData('Learnsets', 'petilil').learnset.recover = ['8L1'];
		this.modData('Learnsets', 'petilil').learnset.leafage = ['8L1'];
		this.modData('Learnsets', 'petilil').learnset.babydolleyes = ['8L1'];
		
		this.modData('Learnsets', 'rufflet').learnset.doubleedge = ['8L1'];
		this.modData('Learnsets', 'rufflet').learnset.twister = ['8L1'];
		this.modData('Learnsets', 'rufflet').learnset.ominouswind = ['8L1'];
		
		this.modData('Learnsets', 'tornadus').learnset.tackle = ['8L1'];
		this.modData('Learnsets', 'tornadus').learnset.twister = ['8L1'];
		this.modData('Learnsets', 'tornadus').learnset.bleakwindstorm = ['8L1'];
		
		this.modData('Learnsets', 'thundurus').learnset.tackle = ['8L1'];
		this.modData('Learnsets', 'thundurus').learnset.spark = ['8L1'];
		this.modData('Learnsets', 'thundurus').learnset.twister = ['8L1'];
		this.modData('Learnsets', 'thundurus').learnset.powershift = ['8L1'];
		this.modData('Learnsets', 'thundurus').learnset.wildboltstorm = ['8L1'];
		
		this.modData('Learnsets', 'landorus').learnset.tackle = ['8L1'];
		this.modData('Learnsets', 'landorus').learnset.bite = ['8L1'];
		this.modData('Learnsets', 'landorus').learnset.twister = ['8L1'];
		this.modData('Learnsets', 'landorus').learnset.crunch = ['8L1'];
		this.modData('Learnsets', 'landorus').learnset.sandsearstorm = ['8L1'];
		
		this.modData('Learnsets', 'goomy').learnset.shelter = ['8L1'];
		this.modData('Learnsets', 'goomy').learnset.acidspray = ['8L1'];
		
		this.modData('Learnsets', 'bergmite').learnset.iceshard = ['8L1'];
		
		this.modData('Learnsets', 'rowlet').learnset.gust = ['8L1'];
		this.modData('Learnsets', 'rowlet').learnset.aerialace = ['8L1'];
		this.modData('Learnsets', 'rowlet').learnset.magicalleaf = ['8L1'];
		this.modData('Learnsets', 'rowlet').learnset.airslash = ['8L1'];
		this.modData('Learnsets', 'rowlet').learnset.psychocut = ['8L1'];
		this.modData('Learnsets', 'rowlet').learnset.leafstorm = ['8L1'];
		
		this.modData('Learnsets', 'numel').learnset.flamewheel = ['8L1'];
		
		this.modData('Learnsets', 'deoxys').learnset.switcheroo = ['8L1'];
		this.modData('Learnsets', 'deoxys').learnset.toxicspikes = ['8L1'];
		
		this.modData('Learnsets', 'skitty').learnset.babydolleyes = ['8L1'];
		this.modData('Learnsets', 'skitty').learnset.furyswipes = ['8L1'];
		this.modData('Learnsets', 'skitty').learnset.nastyplot = ['8L1'];
		
		this.modData('Learnsets', 'doduo').learnset.leer = ['8L1'];
		this.modData('Learnsets', 'doduo').learnset.lunge = ['8L1'];
		this.modData('Learnsets', 'doduo').learnset.wingattack = ['8L1'];
		
		this.modData('Learnsets', 'spearow').learnset.wingattack = ['8L1'];
		
		this.modData('Learnsets', 'buizel').learnset.bite = ['8L1'];
		this.modData('Learnsets', 'buizel').learnset.tackle = ['8L1'];
		this.modData('Learnsets', 'buizel').learnset.tailwhip = ['8L1'];
		
		this.modData('Learnsets', 'pineco').learnset.bugbuzz = ['8L1'];
		this.modData('Learnsets', 'pineco').learnset.autotomize = ['8L1'];
		
		this.modData('Learnsets', 'sentret').learnset.growl = ['8L1'];
		this.modData('Learnsets', 'sentret').learnset.blizzard = ['8L1'];
		
		this.modData('Learnsets', 'spoink').learnset.confusion = ['8L1'];
		this.modData('Learnsets', 'spoink').learnset.growl = ['8L1'];
		this.modData('Learnsets', 'grumpig').learnset.nastyplot = ['8L1'];
		
		this.modData('Learnsets', 'drowzee').learnset.mindreader = ['8L1'];
		
		this.modData('Learnsets', 'kecleon').learnset.detect = ['8L1'];
		
		this.modData('Learnsets', 'luvdisc').learnset.babydolleyes = ['8L1'];
		this.modData('Learnsets', 'luvdisc').learnset.tearfullook = ['8L1'];
		
		this.modData('Learnsets', 'surskit').learnset.soak = ['8L1'];
		this.modData('Learnsets', 'surskit').learnset.supersonic = ['8L1'];
		this.modData('Learnsets', 'surskit').learnset.watergun = ['8L1'];
		
		this.modData('Learnsets', 'meditite').learnset.pound = ['8L1'];
		this.modData('Learnsets', 'meditite').learnset.psybeam = ['8L1'];
		
		this.modData('Learnsets', 'poochyena').learnset.nastyplot = ['8L1'];
		
		this.modData('Learnsets', 'misdreavus').learnset.confusion = ['8L1'];
		
		this.modData('Learnsets', 'plusle').learnset.skillswap = ['8L1'];
		
		this.modData('Learnsets', 'probopass').learnset.bodypress = ['8L1'];
		
		this.modData('Learnsets', 'rattata').learnset.laserfocus = ['8L1'];
		this.modData('Learnsets', 'rattata').learnset.sludgebomb = ['8L1'];
		
		this.modData('Learnsets', 'slugma').learnset.sandstorm = ['8L1'];
		
		this.modData('Learnsets', 'sunkern').learnset.tackle = ['8L1'];
		
		this.modData('Learnsets', 'volbeat').learnset.playnice = ['8L1'];
		
		this.modData('Learnsets', 'venusaur').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'blastoise').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'nidoqueen').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'nidoking').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'golduck').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'mankey').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'arcanine').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'poliwrath').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'machop').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'cubone').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'hitmonlee').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'hitmonchan').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'chansey').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'electabuzz').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'magmar').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'pinsir').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'omastar').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'kabutops').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'munchlax').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'mewtwo').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'mew').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'meganium').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'typhlosion').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'feraligatr').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'ampharos').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'granbull').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'ursaring').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'raikou').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'entei').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'suicune').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'tyranitar').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'sceptile').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'blaziken').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'swampert').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'ludicolo').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'vigoroth').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'exploud').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'makuhita').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'aggron').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'zangoose').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'regirock').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'regice').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'registeel').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'groudon').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'turtwig').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'chimchar').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'empoleon').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'cranidos').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'lucario').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'drapion').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'croagunk').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'abomasnow').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'mamoswine').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'heatran').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'regigigas').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'giratina').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'darkrai').learnset.rockclimb = ['8L1'];
		this.modData('Learnsets', 'arceus').learnset.rockclimb = ['8L1'];
	},
};
