export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init: function () {
		/*Template:
		this.modData('Learnsets', 'pokemon').learnset.move = ['8L1'];
		delete this.modData('Learnsets', 'pokemon').learnset.move;*/
      this.modData('Learnsets', 'ambipom').learnset.armthrust = ['8L1'];
		this.modData('Learnsets', 'breloom').learnset.armthrust = ['8L1'];
		this.modData('Learnsets', 'grapploct').learnset.armthrust = ['8L1'];
		
		this.modData('Learnsets', 'articuno').learnset.aurorabeam = ['8L1'];
		this.modData('Learnsets', 'beheeyem').learnset.aurorabeam = ['8L1'];
		this.modData('Learnsets', 'chinchou').learnset.aurorabeam = ['8L1'];
		this.modData('Learnsets', 'lanturn').learnset.aurorabeam = ['8L1'];
		this.modData('Learnsets', 'empoleon').learnset.aurorabeam = ['8L1'];
		this.modData('Learnsets', 'glaceon').learnset.aurorabeam = ['8L1'];
		this.modData('Learnsets', 'jynx').learnset.aurorabeam = ['8L1'];
		this.modData('Learnsets', 'lugia').learnset.aurorabeam = ['8L1'];
		this.modData('Learnsets', 'magnemite').learnset.aurorabeam = ['8L1'];
		this.modData('Learnsets', 'magneton').learnset.aurorabeam = ['8L1'];
		this.modData('Learnsets', 'magnezone').learnset.aurorabeam = ['8L1'];
		this.modData('Learnsets', 'mareep').learnset.aurorabeam = ['8L1'];
		this.modData('Learnsets', 'flaaffy').learnset.aurorabeam = ['8L1'];
		this.modData('Learnsets', 'ampharos').learnset.aurorabeam = ['8L1'];
		this.modData('Learnsets', 'nosepass').learnset.aurorabeam = ['8L1'];
		this.modData('Learnsets', 'probopass').learnset.aurorabeam = ['8L1'];
		this.modData('Learnsets', 'raikou').learnset.aurorabeam = ['8L1'];
		this.modData('Learnsets', 'regice').learnset.aurorabeam = ['8L1'];
		this.modData('Learnsets', 'starmie').learnset.aurorabeam = ['8L1'];
	
		this.modData('Learnsets', 'honchkrow').learnset.beakblast = ['8L1'];
		this.modData('Learnsets', 'cramorant').learnset.beakblast = ['8L1'];
		this.modData('Learnsets', 'mandibuzz').learnset.beakblast = ['8L1'];
		
		this.modData('Learnsets', 'houndoom').learnset.burningjealousy = ['8L1'];
		this.modData('Learnsets', 'infernape').learnset.burningjealousy = ['8L1'];
		this.modData('Learnsets', 'pyroar').learnset.burningjealousy = ['8L1'];
		
		this.modData('Learnsets', 'ambipom').learnset.cometpunch = ['8L1'];
      this.modData('Learnsets', 'beldum').learnset.cometpunch = ['8L1'];
		this.modData('Learnsets', 'clefable').learnset.cometpunch = ['8L1'];
      this.modData('Learnsets', 'deoxys').learnset.cometpunch = ['8L1'];
		this.modData('Learnsets', 'lopunny').learnset.cometpunch = ['8L1'];
		this.modData('Learnsets', 'lucario').learnset.cometpunch = ['8L1'];
		this.modData('Learnsets', 'medicham').learnset.cometpunch = ['8L1'];
		this.modData('Learnsets', 'metagross').learnset.cometpunch = ['8L1'];
		this.modData('Learnsets', 'metang').learnset.cometpunch = ['8L1'];
		this.modData('Learnsets', 'minior').learnset.cometpunch = ['8L1'];
		this.modData('Learnsets', 'nidoking').learnset.cometpunch = ['8L1'];
		this.modData('Learnsets', 'nidoqueen').learnset.cometpunch = ['8L1'];
		this.modData('Learnsets', 'riolu').learnset.cometpunch = ['8L1'];
		this.modData('Learnsets', 'wigglytuff').learnset.cometpunch = ['8L1'];
		
		this.modData('Learnsets', 'hatterene').learnset.decorate = ['8L1'];
		this.modData('Learnsets', 'jirachi').learnset.decorate = ['8L1'];
		this.modData('Learnsets', 'victini').learnset.decorate = ['8L1'];

      this.modData('Learnsets', 'applin').learnset.dragonhammer = ['8L1'];
		this.modData('Learnsets', 'flapple').learnset.dragonhammer = ['8L1'];
		this.modData('Learnsets', 'appletun').learnset.dragonhammer = ['8L1'];
		this.modData('Learnsets', 'emboar').learnset.dragonhammer = ['8L1'];
		this.modData('Learnsets', 'haxorus').learnset.dragonhammer = ['8L1'];
		this.modData('Learnsets', 'tyrantrum').learnset.dragonhammer = ['8L1'];
	
		this.modData('Learnsets', 'delphox').learnset.eeriespell = ['8L1'];
		this.modData('Learnsets', 'hatterene').learnset.eeriespell = ['8L1'];
		this.modData('Learnsets', 'mismagius').learnset.eeriespell = ['8L1'];
		
		this.modData('Learnsets', 'togepi').learnset.eggbomb = ['8L1'];
		this.modData('Learnsets', 'togetic').learnset.eggbomb = ['8L1'];
		this.modData('Learnsets', 'togekiss').learnset.eggbomb = ['8L1']																		
	
		this.modData('Learnsets', 'cleffa').learnset.fairywind = ['8L1'];
		this.modData('Learnsets', 'clefairy').learnset.fairywind = ['8L1'];
		this.modData('Learnsets', 'clefable').learnset.fairywind = ['8L1'];
		this.modData('Learnsets', 'hatenna').learnset.fairywind = ['8L1'];
		this.modData('Learnsets', 'hattrem').learnset.fairywind = ['8L1'];
		this.modData('Learnsets', 'hatterene').learnset.fairywind = ['8L1'];
		this.modData('Learnsets', 'primarina').learnset.fairywind = ['8L1'];
		this.modData('Learnsets', 'mew').learnset.fairywind = ['8L1'];
		
		this.modData('Learnsets', 'aipom').learnset.forcepalm = ['8L1'];
		this.modData('Learnsets', 'regigigas').learnset.forcepalm = ['8L1'];
		this.modData('Learnsets', 'meloetta').learnset.forcepalm = ['8L1'];
		
		this.modData('Learnsets', 'chandelure').learnset.forestscurse = ['8L1'];
		this.modData('Learnsets', 'decidueye').learnset.forestscurse = ['8L1'];
		this.modData('Learnsets', 'gengar').learnset.forestscurse = ['8L1'];
		this.modData('Learnsets', 'gourgeist').learnset.forestscurse = ['8L1'];
		this.modData('Learnsets', 'shiinotic').learnset.forestscurse = ['8L1'];
		this.modData('Learnsets', 'spiritomb').learnset.forestscurse = ['8L1'];
		
		this.modData('Learnsets', 'cobalion').learnset.gearup = ['8L1'];
		this.modData('Learnsets', 'genesect').learnset.gearup = ['8L1'];
		this.modData('Learnsets', 'toxtricity').learnset.gearup = ['8L1'];
		
		this.modData('Learnsets', 'articuno').learnset.glaciate = ['8L1'];
		this.modData('Learnsets', 'regice').learnset.glaciate = ['8L1'];
		this.modData('Learnsets', 'suicune').learnset.glaciate = ['8L1'];

		this.modData('Learnsets', 'bouffalant').learnset.horndrill = ['8L1'];
		this.modData('Learnsets', 'dunsparce').learnset.horndrill = ['8L1'];
	   this.modData('Learnsets', 'fearow').learnset.horndrill = ['8L1'];
		
		this.modData('Learnsets', 'arctovish').learnset.iceball = ['8L1'];
		this.modData('Learnsets', 'arctozolt').learnset.iceball = ['8L1'];
		this.modData('Learnsets', 'cloyster').learnset.iceball = ['8L1'];
		this.modData('Learnsets', 'glalie').learnset.iceball = ['8L1'];
		this.modData('Learnsets', 'mamoswine').learnset.iceball = ['8L1'];
		
		this.modData('Learnsets', 'rockruff').learnset.jawlock = ['8L1'];
		this.modData('Learnsets', 'lycanroc').learnset.jawlock = ['8L1'];
		this.modData('Learnsets', 'lycanrocdusk').learnset.jawlock = ['8L1'];
		this.modData('Learnsets', 'lycanrocmidnight').learnset.jawlock = ['8L1'];
		this.modData('Learnsets', 'tyrunt').learnset.jawlock = ['8L1'];
		this.modData('Learnsets', 'tyrantrum').learnset.jawlock = ['8L1'];
		
		this.modData('Learnsets', 'dewpider').learnset.lifedew = ['8L1'];
		this.modData('Learnsets', 'araquanid').learnset.lifedew = ['8L1'];
		this.modData('Learnsets', 'meowstic').learnset.lifedew = ['8L1'];
		this.modData('Learnsets', 'meowsticf').learnset.lifedew = ['8L1'];
		this.modData('Learnsets', 'vaporeon').learnset.lifedew = ['8L1'];
		
		this.modData('Learnsets', 'minccino').learnset.lowsweep = ['8L1'];
		this.modData('Learnsets', 'cinccino').learnset.lowsweep = ['8L1'];
		
		this.modData('Learnsets', 'bergmite').learnset.mirrorshot = ['8L1'];
		this.modData('Learnsets', 'avalugg').learnset.mirrorshot = ['8L1'];
		this.modData('Learnsets', 'bronzor').learnset.mirrorshot = ['8L1'];
		this.modData('Learnsets', 'bronzong').learnset.mirrorshot = ['8L1'];
		this.modData('Learnsets', 'carbink').learnset.mirrorshot = ['8L1'];
		this.modData('Learnsets', 'corviknight').learnset.mirrorshot = ['8L1'];
		this.modData('Learnsets', 'diancie').learnset.mirrorshot = ['8L1'];
		this.modData('Learnsets', 'duraludon').learnset.mirrorshot = ['8L1'];
		this.modData('Learnsets', 'regice').learnset.mirrorshot = ['8L1'];
		this.modData('Learnsets', 'registeel').learnset.mirrorshot = ['8L1'];
		this.modData('Learnsets', 'sableye').learnset.mirrorshot = ['8L1'];
		
		this.modData('Learnsets', 'blastoise').learnset.octazooka = ['8L1'];
		this.modData('Learnsets', 'malamar').learnset.octazooka = ['8L1'];
		
		this.modData('Learnsets', 'grubbin').learnset.paraboliccharge = ['8L1'];
		this.modData('Learnsets', 'charjabug').learnset.paraboliccharge = ['8L1'];
		this.modData('Learnsets', 'vikavolt').learnset.paraboliccharge = ['8L1'];
		this.modData('Learnsets', 'chinchou').learnset.paraboliccharge = ['8L1'];
		this.modData('Learnsets', 'lanturn').learnset.paraboliccharge = ['8L1'];
		this.modData('Learnsets', 'electrode').learnset.paraboliccharge = ['8L1'];
		this.modData('Learnsets', 'rotom').learnset.paraboliccharge = ['8L1'];
		
		this.modData('Learnsets', 'diancie').learnset.prismaticlaser = ['8L1'];
		this.modData('Learnsets', 'espeon').learnset.prismaticlaser = ['8L1'];
		this.modData('Learnsets', 'starmie').learnset.prismaticlaser = ['8L1'];
	
		this.modData('Learnsets', 'tornadus').learnset.razorwind = ['8L1'];
		this.modData('Learnsets', 'thundurus').learnset.razorwind = ['8L1'];
		this.modData('Learnsets', 'landorus').learnset.razorwind = ['8L1'];
		this.modData('Learnsets', 'articunogalar').learnset.razorwind = ['8L1'];
		this.modData('Learnsets', 'zapdosgalar').learnset.razorwind = ['8L1'];
		this.modData('Learnsets', 'moltresgalar').learnset.razorwind = ['8L1'];
		this.modData('Learnsets', 'celesteela').learnset.razorwind = ['8L1'];
		this.modData('Learnsets', 'xatu').learnset.razorwind = ['8L1'];

      this.modData('Learnsets', 'toucannon').learnset.selfdestruct = ['8L1'];
		
		this.modData('Learnsets', 'wailmer').learnset.sing = ['8L1'];
		this.modData('Learnsets', 'wailord').learnset.sing = ['8L1'];
		
		this.modData('Learnsets', 'vaporeon').learnset.soak = ['8L1'];
		
		this.modData('Learnsets', 'milotic').learnset.sparklingaria = ['8L1'];
		this.modData('Learnsets', 'phione').learnset.sparklingaria = ['8L1'];
		this.modData('Learnsets', 'tympole').learnset.sparklingaria = ['8L1'];
		this.modData('Learnsets', 'palpitoad').learnset.sparklingaria = ['8L1'];
		this.modData('Learnsets', 'seismitoad').learnset.sparklingaria = ['8L1'];

      this.modData('Learnsets', 'buzzwole').learnset.steamroller = ['8L1'];
		this.modData('Learnsets', 'centiskorch').learnset.steamroller = ['8L1'];
      this.modData('Learnsets', 'donphan').learnset.steamroller = ['8L1'];
		this.modData('Learnsets', 'durant').learnset.steamroller = ['8L1'];
		this.modData('Learnsets', 'forretress').learnset.steamroller = ['8L1'];
		this.modData('Learnsets', 'nincada').learnset.steamroller = ['8L1'];
		this.modData('Learnsets', 'ninjask').learnset.steamroller = ['8L1'];
		this.modData('Learnsets', 'phanpy').learnset.steamroller = ['8L1'];
		this.modData('Learnsets', 'shedinja').learnset.steamroller = ['8L1'];
		
		this.modData('Learnsets', 'meowthgalar').learnset.steelroller = ['8L1'];
		this.modData('Learnsets', 'perrserker').learnset.steelroller = ['8L1'];
		this.modData('Learnsets', 'scizor').learnset.steelroller = ['8L1'];
		
		this.modData('Learnsets', 'beedrill').learnset.strength = ['8L1'];
		
		this.modData('Learnsets', 'noivern').learnset.synchronoise = ['8L1'];
		this.modData('Learnsets', 'primarina').learnset.synchronoise = ['8L1'];
		this.modData('Learnsets', 'silvally').learnset.synchronoise = ['8L1'];
		this.modData('Learnsets', 'toxtricity').learnset.synchronoise = ['8L1'];

		this.modData('Learnsets', 'porygonz').learnset.technoblast = ['8L1'];
		
		this.modData('Learnsets', 'raichualola').learnset.terrainpulse = ['8L1'];
		this.modData('Learnsets', 'tapukoko').learnset.terrainpulse = ['8L1'];
		this.modData('Learnsets', 'tapulele').learnset.terrainpulse = ['8L1'];
		this.modData('Learnsets', 'tapubulu').learnset.terrainpulse = ['8L1'];
		this.modData('Learnsets', 'tapufini').learnset.terrainpulse = ['8L1'];
		
		this.modData('Learnsets', 'banette').learnset.trickortreat = ['8L1'];
		this.modData('Learnsets', 'gengar').learnset.trickortreat = ['8L1'];
		this.modData('Learnsets', 'sableye').learnset.trickortreat = ['8L1'];
		
		this.modData('Learnsets', 'nidoranf').learnset.twineedle = ['8L1'];
		this.modData('Learnsets', 'nidoranm').learnset.twineedle = ['8L1'];
		this.modData('Learnsets', 'toxapex').learnset.twineedle = ['8L1'];
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
