export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['Brunica Uber', 'Brunica OU', 'Brunica NFE', 'Brunica LC'],
	},	
	init() {
		//Free dexited movesets
		const undexitedMons = [];
		for (const pokemon in this.data.FormatsData) {
			//We will skip mons absent from Brunica and custom formes that lack tiers
			const tierData = this.modData("FormatsData",pokemon);
			if (!tierData || !tierData.tier || !tierData.tier.startsWith('Brunica')) {
				//console.log(pokemon + " is not in the Brunician Regional Pokedex. I think this is everything.");
				continue;
			}
			const mon = this.modData("Pokedex",pokemon);
			if (!mon) {
				//console.log(pokemon + "'s entry could not be found. Skipping...");
				continue;
			}
			//Folovo is at 1101 for the time being
			if (mon.num > 1100) {
				//console.log(pokemon + " is a custom Pokemon. Skipping...");
				//Mysterelk is at 1328 so any custom mons before that must be from Brazdo or Loria
				if (mon.num < 1328) mon.gen = 8;
				continue;
			}
			
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
				learnset.doubleteam = ["9M"];
				//Now let's free the ones that were TMs/Tutors in past gens and Brunica but not SV
				learnset.honeclaws &&= ["9M"];
				learnset.safeguard &&= ["9M"];
				learnset.attract &&= ["9M"];
				learnset.roost &&= ["9M"];
				learnset.steelwing &&= ["9M"];
				learnset.explosion &&= ["9M"];
				learnset.retaliate &&= ["9M"];
				learnset.bounce &&= ["9T"];
				learnset.irontail &&= ["9T"];
				learnset.signalbeam &&= ["9T"];
				learnset.steelroller &&= ["9T"];
				learnset.superpower &&= ["9T"];
				continue;
			}
			
			
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
			}
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
		//Relicanth
		this.modData("Learnsets", "relicanth").learnset.terracharge = ["9L35"];
		
		//Shuppet line
		this.modData("Learnsets", "shuppet").learnset.drainfang = ["9L1","8L1"];
		this.modData("Learnsets", "banette").learnset.drainfang = ["9L1","8L1"];
		this.modData("Learnsets", "banette").learnset.drainpunch = ["9L1","8L1"];
		
		//Lorian move additions
		this.modData("Learnsets", "spearow").learnset.payday = ["9L1","8L1"];
		this.modData("Learnsets", "fearow").learnset.payday = ["9L1","8L1"];
		
		//zubat line
		this.modData("Learnsets", "zubat").learnset.drainfang = ["9L1","8L1"];
		this.modData("Learnsets", "golbat").learnset.drainfang = ["9L1","8L1"];
		this.modData("Learnsets", "crobat").learnset.drainfang = ["9L1","8L1"];
		
		/*//oddish line
		this.modData("Learnsets", "oddish").learnset.poisonterrain = ["9L1"];
		this.modData("Learnsets", "oddish").learnset.toxicshock = ["9L1"];
		this.modData("Learnsets", "gloom").learnset.poisonterrain = ["9L1"];
		this.modData("Learnsets", "gloom").learnset.toxicshock = ["9L1"];
		this.modData("Learnsets", "vileplume").learnset.poisonterrain = ["9L1"];
		this.modData("Learnsets", "vileplume").learnset.toxicshock = ["9L1"];
		this.modData("Learnsets", "bellossom").learnset.poisonterrain = ["9L1"];
		this.modData("Learnsets", "bellossom").learnset.toxicshock = ["9L1"];
		
		//machop line
		this.modData("Learnsets", "machop").learnset.taunt = ["9L1"];
		this.modData("Learnsets", "machoke").learnset.taunt = ["9L1"];
		this.modData("Learnsets", "machamp").learnset.taunt = ["9L1"];
		
		//geodude line
		this.modData("Learnsets", "geodude").learnset.taunt = ["9L1"];
		this.modData("Learnsets", "graveler").learnset.taunt = ["9L1"];
		this.modData("Learnsets", "golem").learnset.taunt = ["9L1"];
		
		//mandibuzz
		this.modData("Learnsets", "mandibuzz").learnset.airdive = ["9L1"];
		
		//trubbish line
		this.modData("Learnsets", "trubbish").learnset.poisonterrain = ["9L1"];
		this.modData("Learnsets", "trubbish").learnset.toxicshock = ["9L1"];
		this.modData("Learnsets", "garbodor").learnset.poisonterrain = ["9L1"];
		this.modData("Learnsets", "garbodor").learnset.toxicshock = ["9L1"];
		
		//plusle and minun
		this.modData("Learnsets", "plusle").learnset.pluspulse = ["9L1"];
		this.modData("Learnsets", "plusle").learnset.sparkingleap = ["9L1","8L1"];
		this.modData("Learnsets", "plusle").learnset.shocktail = ["9L1","8L1"];
		this.modData("Learnsets", "minun").learnset.minusion = ["9L1"];
		this.modData("Learnsets", "minun").learnset.sparkingleap = ["9L1","8L1"];
		this.modData("Learnsets", "minun").learnset.shocktail = ["9L1","8L1"];
		*/
		//bidoof line
		delete this.modData("Learnsets", "bidoof").learnset.sunnyday;
		delete this.modData("Learnsets", "bibarel").learnset.sunnyday;
		this.modData("Learnsets", "bibarel").learnset.wavecrash = ["9L70"];
		this.modData("Learnsets", "bibarel").learnset.shocktail = ["9M"];
		/*
		//stunfisk
		this.modData("Learnsets", "stunfisk").learnset.sparkingleap = ["9L1","8L1"];
		
		//pachirisu
		this.modData("Learnsets", "pachirisu").learnset.shocktail = ["9L1","8L1"];
		
		//braviary
		this.modData("Learnsets", "braviary").learnset.airdive = ["9L1"];
		
		//hawlucha
		this.modData("Learnsets", "hawlucha").learnset.airdive = ["9L1"];
		
		//gligar line
		this.modData("Learnsets", "gligar").learnset.poisonterrain = ["9L1"];
		this.modData("Learnsets", "gliscor").learnset.poisonterrain = ["9L1"];
		
		//wooper lines
		this.modData("Learnsets", "wooper").learnset.poisonterrain = ["9L1"];
		this.modData("Learnsets", "quagsire").learnset.poisonterrain = ["9L1"];
		this.modData("Learnsets", "wooperpaldea").learnset.poisonterrain = ["9L1"];
		this.modData("Learnsets", "wooperpaldea").learnset.toxicshock = ["9L1"];
		this.modData("Learnsets", "clodsire").learnset.poisonterrain = ["9L1"];
		this.modData("Learnsets", "clodsire").learnset.toxicshock = ["9L1"];
		
		//deino line
		this.modData("Learnsets", "deino").learnset.drainfang = ["9L1","8L1"];
		this.modData("Learnsets", "zweilous").learnset.drainfang = ["9L1","8L1"];
		this.modData("Learnsets", "hydreigon").learnset.drainfang = ["9L1","8L1"];
		this.modData("Learnsets", "hydreigon").learnset.roost = ["9L1"];
		
		//swinub line
		this.modData("Learnsets", "swinub").learnset.terracharge = ["9L1", "8L1"];
		this.modData("Learnsets", "piloswine").learnset.tripleaxel = ["9L1"];
		this.modData("Learnsets", "piloswine").learnset.terracharge = ["9L1", "8L1"];
		this.modData("Learnsets", "mamoswine").learnset.tripleaxel = ["9L1"];
		this.modData("Learnsets", "mamoswine").learnset.terracharge = ["9L1", "8L1"];
		
		//tandemaus line
		this.modData("Learnsets", "tandemaus").learnset.nuzzle = ["9L1"];
		this.modData("Learnsets", "tandemaus").learnset.tripleaxel = ["9L1"];
		this.modData("Learnsets", "maushold").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "maushold").learnset.nuzzle = ["9L1"];
		this.modData("Learnsets", "maushold").learnset.tripleaxel = ["9L1"];
		
		//poipole line
		this.modData("Learnsets", "poipole").learnset.poisonterrain = ["9L1"];
		this.modData("Learnsets", "naganadel").learnset.poisonterrain = ["9L1"];
		this.modData("Learnsets", "naganadel").learnset.toxicshock = ["9L1"];
		
		//rotom
		this.modData("Learnsets", "rotom").learnset.sparkingleap = ["9L1","8L1"];
		this.modData("Learnsets", "rotom").learnset.dazzlinggleam = ["9L1"];
		this.modData("Learnsets", "rotom").learnset.playrough = ["9L1"];
		this.modData("Learnsets", "rotom").learnset.wildcharge = ["9L1"];
		
		//froakie line
		this.modData("Learnsets", "frogadier").learnset.toxicshock = ["9L1"];
		this.modData("Learnsets", "greninja").learnset.toxicshock = ["9L1"];
		this.modData("Learnsets", "greninjabond").learnset.toxicshock = ["9L1"];
		
		//mareanie line
		this.modData("Learnsets", "mareanie").learnset.toxicshock = ["9L1"];
		this.modData("Learnsets", "toxapex").learnset.toxicshock = ["9L1"];

		//sinnoh hippopotas line
		this.modData("Learnsets", "hippopotas").learnset.terracharge = ["9L1","8L1"];
		this.modData("Learnsets", "hippowdon").learnset.terracharge = ["9L1","8L1"];
		
		//kalosian litleo line
		this.modData("Learnsets", "litleo").learnset.drift = ["9L1"];
		this.modData("Learnsets", "litleo").learnset.quickshot = ["9L1","8L1"];
		this.modData("Learnsets", "pyroar").learnset.drift = ["9L1"];
		this.modData("Learnsets", "pyroar").learnset.quickshot = ["9L1","8L1"];
		
		//fennekin line
		this.modData("Learnsets", "fennekin").learnset.drift = ["9L1"];
		this.modData("Learnsets", "fennekin").learnset.quickshot = ["9L1","8L1"];
		this.modData("Learnsets", "braixen").learnset.drift = ["9L1"];
		this.modData("Learnsets", "braixen").learnset.quickshot = ["9L1","8L1"];
		this.modData("Learnsets", "braixen").learnset.shocktail = ["9L1"];
		this.modData("Learnsets", "delphox").learnset.drift = ["9L1"];
		this.modData("Learnsets", "delphox").learnset.quickshot = ["9L1","8L1"];
		this.modData("Learnsets", "delphox").learnset.shocktail = ["9L1"];
		*/
		//rockruff line
		this.modData("Learnsets", "rockruff").learnset.drainfang = ["9L1","8L1"];
		this.modData("Learnsets", "rockruffdusk").learnset.drainfang = ["9L1","8L1"];
		this.modData("Learnsets", "lycanroc").learnset.drainfang = ["9L1","8L1"];
		this.modData("Learnsets", "lycanrocmidnight").learnset.drainfang = ["9L1","8L1"];
		this.modData("Learnsets", "lycanrocmidnight").learnset.crippleclobber = ["9L1","8L1"];
		this.modData("Learnsets", "lycanrocdusk").learnset.drainfang = ["9L1","8L1"];
		/*
		//cripple clobber
		this.modData("Learnsets", "rampardos").learnset.crippleclobber = ["9L1","8L1"];
		this.modData("Learnsets", "gigalith").learnset.crippleclobber = ["9L1","8L1"];
		this.modData("Learnsets", "stonjourner").learnset.crippleclobber = ["9L1","8L1"];
		*/this.modData("Learnsets", "onix").learnset.crippleclobber = ["9L1","8L1"];
		this.modData("Learnsets", "steelix").learnset.crippleclobber = ["9L1","8L1"];/*

		//magby line
		this.modData("Learnsets", "magby").learnset.quickshot = ["9L1","8L1"];
		this.modData("Learnsets", "magmar").learnset.quickshot = ["9L1","8L1"];
		this.modData("Learnsets", "magmortar").learnset.quickshot = ["9L1","8L1"];
		
		//elekid line
		this.modData("Learnsets", "elekid").learnset.thunderstrike = ["9L1","8L1"];
		this.modData("Learnsets", "elekid").learnset.shocktail = ["9L1","8L1"];
		this.modData("Learnsets", "electabuzz").learnset.thunderstrike = ["9L1","8L1"];
		this.modData("Learnsets", "electabuzz").learnset.shocktail = ["9L1","8L1"];
		this.modData("Learnsets", "electivire").learnset.thunderstrike = ["9L1","8L1"];
		this.modData("Learnsets", "electivire").learnset.shocktail = ["9L1","8L1"];

		//trapinch line
		this.modData("Learnsets", "vibrava").learnset.shocktail = ["9L1","8L1"];
		this.modData("Learnsets", "flygon").learnset.shocktail = ["9L1","8L1"];
		
		//pichu line
		*/
		this.modData("Learnsets", "pichu").learnset.shocktail = ["9L1","8L1"];
		this.modData("Learnsets", "pikachu").learnset.shocktail = ["9L1","8L1"];
		this.modData("Learnsets", "raichu").learnset.shocktail = ["9L1","8L1"];
		this.modData("Learnsets", "raichualola").learnset.shocktail = ["9L1","8L1"];
		/*
		//eeveelutions
		this.modData("Learnsets", "eevee").learnset.drainfang = ["9L1","8L1"];
		this.modData("Learnsets", "vaporeon").learnset.drainfang = ["9L1","8L1"];
		this.modData("Learnsets", "jolteon").learnset.shocktail = ["9L1","8L1"];
		this.modData("Learnsets", "jolteon").learnset.drainfang = ["9L1","8L1"];
		this.modData("Learnsets", "flareon").learnset.shocktail = ["9L1","8L1"];
		this.modData("Learnsets", "flareon").learnset.drainfang = ["9L1","8L1"];
		this.modData("Learnsets", "flareon").learnset.bulkup = ["9L1","8L1"];
		this.modData("Learnsets", "espeon").learnset.drainfang = ["9L1","8L1"];
		this.modData("Learnsets", "umbreon").learnset.drainfang = ["9L1","8L1"];
		this.modData("Learnsets", "leafeon").learnset.drainfang = ["9L1","8L1"];
		this.modData("Learnsets", "leafeon").learnset.bushclaws = ["9L1","8L1"];
		this.modData("Learnsets", "leafeon").learnset.fireworkleaf = ["9L1","8L1"];
		this.modData("Learnsets", "glaceon").learnset.drainfang = ["9L1","8L1"];
		this.modData("Learnsets", "glaceon").learnset.surf = ["9L1","8L1"];
		this.modData("Learnsets", "glaceon").learnset.hydropump = ["9L1","8L1"];
		this.modData("Learnsets", "sylveon").learnset.drainfang = ["9L1","8L1"];

		//ekans line
		this.modData("Learnsets", "ekans").learnset.drainfang = ["9L1","8L1"];
		this.modData("Learnsets", "ekans").learnset.poisonterrain = ["9L1","8L1"];
		this.modData("Learnsets", "arbok").learnset.drainfang = ["9L1","8L1"];
		this.modData("Learnsets", "arbok").learnset.poisonterrain = ["9L1","8L1"];
		this.modData("Learnsets", "arbok").learnset.uturn = ["9L1","8L1"];
		this.modData("Learnsets", "arbok").learnset.dragonrush = ["9L1","8L1"];
		
		//sableye
		this.modData("Learnsets", "sableye").learnset.drainfang = ["9L1","8L1"];
		
		//dratini line
		this.modData("Learnsets", "dragonair").learnset.defog = ["9L1"];
		this.modData("Learnsets", "dragonite").learnset.defog = ["9L1"];
		
		//hoennian bagon line
		this.modData("Learnsets", "bagon").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "shelgon").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "salamence").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "salamence").learnset.defog = ["9L1"];
		
		//rolycoly line
		this.modData("Learnsets", "rolycoly").learnset.drift = ["9L1"];
		this.modData("Learnsets", "carkol").learnset.drift = ["9L1"];
		this.modData("Learnsets", "carkol").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "coalossal").learnset.drift = ["9L1"];
		this.modData("Learnsets", "coalossal").learnset.knockoff = ["9L1"];
		
		//misc drift distribution (wouldn't you know it they're all in desvega)
		this.modData("Learnsets", "flareon").learnset.drift = ["9L1"];
		this.modData("Learnsets", "tepig").learnset.drift = ["9L1"];
		this.modData("Learnsets", "pignite").learnset.drift = ["9L1"];
		this.modData("Learnsets", "emboar").learnset.drift = ["9L1"];
		this.modData("Learnsets", "turtonator").learnset.drift = ["9L1"];
		this.modData("Learnsets", "capsakid").learnset.drift = ["9L1"];
		this.modData("Learnsets", "scovillain").learnset.drift = ["9L1"];

		//unovan starters (obtained from mega distribution back in loria, ampharos still kept dragon pulse since gen 6 after all)
		this.modData("Learnsets", "serperior").learnset.shocktail = ["9L1","8L1"];
		this.modData("Learnsets", "serperior").learnset.dragonhammer = ["9L1","8L1"];
		this.modData("Learnsets", "serperior").learnset.drillrun = ["9L1","8L1"];
		this.modData("Learnsets", "emboar").learnset.shocktail = ["9L1","8L1"];
		this.modData("Learnsets", "emboar").learnset.calmmind = ["9L1","8L1"];
		this.modData("Learnsets", "emboar").learnset.earthpower = ["9L1","8L1"];
		this.modData("Learnsets", "samurott").learnset.shadowball = ["9L1","8L1"];
		this.modData("Learnsets", "samurott").learnset.hypervoice = ["9L1","8L1"];
		this.modData("Learnsets", "samurott").learnset.focusblast = ["9L1","8L1"];
		
		//Distributions at https://www.smogon.com/forums/threads/generation-x-the-third-chapter-desvega-concluded-coders-wanted.3722319/page-8
		//(Toxic excluded for mons present in SV because that post was made before the Teal Mask, which made Toxic a TM again and with limited distribution too)
		//(Custom mons and mons dexited from Desvega are excluded, hence why Heal Order and Chilly Reception were skipped)
		
		this.modData("Learnsets", "applin").learnset.rapidspin = ["9L1"];
		this.modData("Learnsets", "flapple").learnset.rapidspin = ["9L1"];
		this.modData("Learnsets", "appletun").learnset.rapidspin = ["9L1"];
		this.modData("Learnsets", "dipplin").learnset.rapidspin = ["9L1"];
		this.modData("Learnsets", "hydrapple").learnset.rapidspin = ["9L1"];
		this.modData("Learnsets", "carbink").learnset.rapidspin = ["9L1"];
		this.modData("Learnsets", "eiscue").learnset.rapidspin = ["9L1"];
		this.modData("Learnsets", "wooloo").learnset.rapidspin = ["9L1"];
		this.modData("Learnsets", "dubwool").learnset.rapidspin = ["9L1"];
		*/this.modData("Learnsets", "roselia").learnset.rapidspin = ["9L1"];
		this.modData("Learnsets", "roserade").learnset.rapidspin = ["9L1"];
		
		/*this.modData("Learnsets", "oddish").learnset.mortalspin = ["9L1"];
		this.modData("Learnsets", "gloom").learnset.mortalspin = ["9L1"];
		this.modData("Learnsets", "vileplume").learnset.mortalspin = ["9L1"];
		this.modData("Learnsets", "bellossom").learnset.mortalspin = ["9L1"];
		this.modData("Learnsets", "venipede").learnset.mortalspin = ["9L1"];
		this.modData("Learnsets", "whirlipede").learnset.mortalspin = ["9L1"];
		this.modData("Learnsets", "scolipede").learnset.mortalspin = ["9L1"];*/
		this.modData("Learnsets", "roselia").learnset.mortalspin = ["9L1"];
		this.modData("Learnsets", "roserade").learnset.mortalspin = ["9L1"];
		/*	
		//Returning Toxic to the select non-Poisons that returned for Desvega but not SV
		this.modData("Learnsets", "paras").learnset.toxic = ["9L1"];
		this.modData("Learnsets", "parasect").learnset.toxic = ["9L1"];
		*/
		
		/*
		
		this.modData("Learnsets", "aerodactyl").learnset.accelerock = ["9L1"];
		this.modData("Learnsets", "cranidos").learnset.accelerock = ["9L1"];
		this.modData("Learnsets", "rampardos").learnset.accelerock = ["9L1"];
		this.modData("Learnsets", "geodude").learnset.accelerock = ["9L1"];
		this.modData("Learnsets", "graveler").learnset.accelerock = ["9L1"];
		this.modData("Learnsets", "golem").learnset.accelerock = ["9L1"];
		this.modData("Learnsets", "stonjourner").learnset.accelerock = ["9L1"];*/
		this.modData("Learnsets", "lycanrocmidnight").learnset.accelerock = ["9L1"];
		
		/*for (const pokemon in this.data.FormatsData) {
			const tierData = this.modData("FormatsData",pokemon);
			if (!tierData || !tierData.tier || !tierData.tier.startsWith('Brunica')) {
				break;
			}
			const mon = this.modData("Pokedex",pokemon);
			if (!mon) {
				console.log(pokemon + "'s data is lost!");
				continue;
			}
			if (mon.forme && !mon.baseSpecies) {
				console.log(pokemon + " was not assigned to a base species!");
			}
		}*/
		//Distribution for returning mons to Brunica on Slate 5
		this.modData("Learnsets", "wingull").learnset.airdive = ["9L1"];
		this.modData("Learnsets", "pelipper").learnset.airdive = ["9L1"];
		this.modData("Learnsets", "grimer").learnset.poisonterrain = ["9L1"];
		this.modData("Learnsets", "grimer").learnset.toxicshock = ["9L1"];
		this.modData("Learnsets", "muk").learnset.poisonterrain = ["9L1"];
		this.modData("Learnsets", "muk").learnset.toxicshock = ["9L1"];
		this.modData("Learnsets", "tyrogue").learnset.stormthrow = ["9L1"];
		this.modData("Learnsets", "hitmonlee").learnset.stormthrow = ["9L1"];
		this.modData("Learnsets", "hitmonlee").learnset.darkestlariat = ["9L1"];
		this.modData("Learnsets", "hitmonlee").learnset.brutalswing = ["9L1"];
		this.modData("Learnsets", "hitmonlee").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "hitmonchan").learnset.stormthrow = ["9L1"];
		this.modData("Learnsets", "hitmonchan").learnset.meteormash = ["9L1"];
		this.modData("Learnsets", "hitmonchan").learnset.ironhead = ["9L1"];
		this.modData("Learnsets", "hitmonchan").learnset.steelbeam = ["9L1"];
		this.modData("Learnsets", "hitmontop").learnset.stormthrow = ["9L1"];
		this.modData("Learnsets", "hitmontop").learnset.victorydance = ["9L1"];
		this.modData("Learnsets", "hitmontop").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "hitmontop").learnset.circlethrow = ["9L1"];

		//Distribution to returning mons on Slate 6
		this.modData("Learnsets", "onix").learnset.powertrick = ["9L1"];
		this.modData("Learnsets", "steelix").learnset.powertrick = ["9L1"];
		this.modData("Learnsets", "zubat").learnset.toxicshock = ["9L1"];
		this.modData("Learnsets", "zubat").learnset.poisonterrain = ["9L1"];
		this.modData("Learnsets", "zubat").learnset.sleepdrain = ["9L1"];
		this.modData("Learnsets", "golbat").learnset.toxicshock = ["9L1"];
		this.modData("Learnsets", "golbat").learnset.poisonterrain = ["9L1"];
		this.modData("Learnsets", "golbat").learnset.sleepdrain = ["9L1"];
		this.modData("Learnsets", "crobat").learnset.toxicshock = ["9L1"];
		this.modData("Learnsets", "crobat").learnset.poisonterrain = ["9L1"];
		this.modData("Learnsets", "crobat").learnset.xscissor = ["9L1"];
		this.modData("Learnsets", "crobat").learnset.ominouswind = ["9L1"];
		this.modData("Learnsets", "crobat").learnset.silverwind = ["9L1"];
		this.modData("Learnsets", "crobat").learnset.sleepdrain = ["9L1"];
		this.modData("Learnsets", "lycanroc").learnset.extremespeed = ["9L1"];
		this.modData("Learnsets", "lycanrocmidnight").learnset.pursuit = ["9L1"];
		this.modData("Learnsets", "lycanrocdusk").learnset.earthquake = ["9L1"];
		
		//skarmory blade runner
		this.modData("Learnsets", "skarmory").learnset.bladerunner = ["9L1"];

		//absol
		this.modData("Learnsets", "absol").learnset.shocktail = ["9L1"];
		
		//doduo line
		delete this.modData("Learnsets","doduo").learnset.endeavor;
		delete this.modData("Learnsets","dodrio").learnset.endeavor;
		this.modData("Learnsets","dodrio").learnset.axekick = ["9L1"];
		this.modData("Learnsets","dodrio").learnset.airdive = ["9L1"];
		this.modData("Learnsets","dodrio").learnset.triplekick = ["9L1"];
		this.modData("Learnsets","dodrio").learnset.highjumpkick = ["9L1"];
		this.modData("Learnsets","doduo").learnset.triplekick = ["9E"];
		this.modData("Learnsets","doduo").learnset.jumpkick = ["9L39"];
		this.modData("Learnsets","dodrio").learnset.jumpkick = ["9L39"];
		this.modData("Learnsets","doduo").learnset.lunge = ["9L47"];
		this.modData("Learnsets","dodrio").learnset.lunge = ["9L47"];
		
		//bouffalant
		this.modData("Learnsets","bouffalant").learnset.trailblaze = ["9E"];
		this.modData("Learnsets","bouffalant").learnset.headsmash = ["9L39"];
		this.modData("Learnsets","bouffalant").learnset.supercellslam = ["9L39"];
		
		//budew line
		this.modData("Learnsets","budew").learnset.mudslap = ["9L1"];
		this.modData("Learnsets","roselia").learnset.mudslap = ["9L1"];
		this.modData("Learnsets","roselia").learnset.poisonterrain = ["9L1"];
		this.modData("Learnsets","roselia").learnset.playrough = ["9L1"];
		this.modData("Learnsets","roserade").learnset.mudslap = ["9L1"];
		this.modData("Learnsets","roserade").learnset.poisonterrain = ["9L1"];
		this.modData("Learnsets","roserade").learnset.playrough = ["9L1"];
		this.modData("Learnsets","roserade").learnset.earthpower = ["9L1"];
		this.modData("Learnsets","roserade").learnset.toxicshock = ["9L1"];
		this.modData("Learnsets","roserade").learnset.tripleaxel = ["9L1"];
		
		//mandibuzz
		this.modData("Learnsets","mandibuzz").learnset.airdive = ["9L1"];
		
		//gastly line
		this.modData("Learnsets","gastly").learnset.poisonterrain = ["9L1"];
		this.modData("Learnsets","gastly").learnset.snatch = ["9L1"];
		this.modData("Learnsets","gastly").learnset.toxicshock = ["9L1"];
		this.modData("Learnsets","gastly").learnset.drainfang = ["9L1"];
		this.modData("Learnsets","haunter").learnset.poisonterrain = ["9L1"];
		this.modData("Learnsets","haunter").learnset.snatch = ["9L1"];
		this.modData("Learnsets","haunter").learnset.toxicshock = ["9L1"];
		this.modData("Learnsets","haunter").learnset.drainfang = ["9L1"];
		this.modData("Learnsets","gengar").learnset.poisonterrain = ["9L1"];
		this.modData("Learnsets","gengar").learnset.snatch = ["9L1"];
		this.modData("Learnsets","gengar").learnset.toxicshock = ["9L1"];
		this.modData("Learnsets","gengar").learnset.drainfang = ["9L1"];
		
		//sandygast line
		this.modData("Learnsets","sandygast").learnset.nastyplot = ["9L1"];
		this.modData("Learnsets","palossand").learnset.nastyplot = ["9L1"];
		
		//salandit line
		this.modData("Learnsets","salandit").learnset.sleepdrain = ["9L1"];
		this.modData("Learnsets","salandit").learnset.fierydance = ["9L1"];
		this.modData("Learnsets","salandit").learnset.quickshot = ["9L1"];
		this.modData("Learnsets","salazzle").learnset.sleepdrain = ["9L1"];
		this.modData("Learnsets","salazzle").learnset.fierydance = ["9L1"];
		this.modData("Learnsets","salazzle").learnset.quickshot = ["9L1"];
		
		//shiinotic
		this.modData("Learnsets","shiinotic").learnset.calmmind = ["9L1"];
		
		//numel line
		this.modData("Learnsets","numel").learnset.terracharge = ["9L1"];
		this.modData("Learnsets","camerupt").learnset.terracharge = ["9L1"];
		
		//wailmer line
		this.modData("Learnsets","wailmer").learnset.filpturn = ["9L1"];
		this.modData("Learnsets","wailmer").learnset.frostfeint = ["9L1"];
		this.modData("Learnsets","wailmer").learnset.iciclecrash = ["9L1"];
		this.modData("Learnsets","wailord").learnset.filpturn = ["9L1"];
		this.modData("Learnsets","wailord").learnset.frostfeint = ["9L1"];
		this.modData("Learnsets","wailord").learnset.iciclecrash = ["9L1"];
		
		//fletchling line
		this.modData("Learnsets","fletchling").learnset.airdive = ["9L1"];
		this.modData("Learnsets","fletchling").learnset.solarblade = ["9L1"];
		this.modData("Learnsets","fletchinder").learnset.airdive = ["9L1"];
		this.modData("Learnsets","fletchinder").learnset.solarblade = ["9L1"];
		this.modData("Learnsets","talonflame").learnset.airdive = ["9L1"];
		this.modData("Learnsets","talonflame").learnset.solarblade = ["9L1"];
		
		//meowth line
		this.modData("Learnsets","meowth").learnset.confuseray = ["9L1"];
		this.modData("Learnsets","persian").learnset.confuseray = ["9L1"];
		
		//ralts family
		this.modData("Learnsets","kirlia").learnset.healingnature = ["9L1"];
		this.modData("Learnsets","gardevoir").learnset.healingnature = ["9L1"];
		this.modData("Learnsets","gallade").learnset.healingnature = ["9L1"];
		
		//noibat line
		this.modData("Learnsets","noibat").learnset.drainfang = ["9M"];
		this.modData("Learnsets","noivern").learnset.drainfang = ["9M"];
		
	},
	runAction(action) {
		const pokemonOriginalHP = action.pokemon?.hp;
		let residualPokemon: (readonly [Pokemon, number])[] = [];
		// returns whether or not we ended in a callback
		switch (action.choice) {
		case 'start': {
			for (const side of this.sides) {
				side.pokemonLeft &&= side.pokemon.length;
			}
			this.add('start');
			// Change Zacian/Zamazenta into their Crowned formes and Lutakon into its Awakened form
			for (const pokemon of this.getAllPokemon()) {
				let rawSpecies: Species | null = null;
				if (pokemon.species.id === 'lutakon') {
					if (pokemon.item === 'awakeningseed') rawSpecies = this.dex.species.get('Lutakon-Awakened');
				} else if (pokemon.species.id === 'zacian') {
					if (pokemon.item === 'rustedsword') rawSpecies = this.dex.species.get('Zacian-Crowned');
				} else if (pokemon.species.id === 'zamazenta' && pokemon.item === 'rustedshield') {
					rawSpecies = this.dex.species.get('Zamazenta-Crowned');
				}
				if (!rawSpecies) continue;
				const species = pokemon.setSpecies(rawSpecies);
				if (!species) continue;
				pokemon.baseSpecies = rawSpecies;
				pokemon.details = species.name + (pokemon.level === 100 ? '' : ', L' + pokemon.level) +
					(pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
				pokemon.setAbility(species.abilities['0'], null, true);
				pokemon.baseAbility = pokemon.ability;

				const behemothMove: {[k: string]: string} = {
					'Zacian-Crowned': 'behemothblade', 
					'Zamazenta-Crowned': 'behemothbash', 
					'Lutakon-Awakened': 'gaiarecovery',
				};
				const ironHead = pokemon.baseMoves.indexOf(rawSpecies.name === 'Lutakon-Awakened' ? 'synthesis' : 'ironhead');
				if (ironHead >= 0) {
					const move = this.dex.moves.get(behemothMove[rawSpecies.name]);
					const movepp = (move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5;
					pokemon.baseMoveSlots[ironHead] = {
						move: move.name,
						id: move.id,
						pp: movepp,
						maxpp: movepp,
						target: move.target,
						disabled: false,
						disabledSource: '',
						used: false,
					};
					pokemon.moveSlots = pokemon.baseMoveSlots.slice();
				}
			}
			
			if (this.format.onBattleStart) this.format.onBattleStart.call(this);
			for (const rule of this.ruleTable.keys()) {
				if ('+*-!'.includes(rule.charAt(0))) continue;
				const subFormat = this.dex.formats.get(rule);
				if (subFormat.onBattleStart) subFormat.onBattleStart.call(this);
			}

			for (const side of this.sides) {
				for (let i = 0; i < side.active.length; i++) {
					if (side.pokemonLeft) {
						this.actions.switchIn(side.pokemon[i], i);
						continue;
					}
					// forfeited before starting
					side.active[i] = side.pokemon[i];
					side.active[i].fainted = true;
					side.active[i].hp = 0;
				}
			}
			for (const pokemon of this.getAllPokemon()) {
				this.singleEvent('Start', this.dex.conditions.getByID(pokemon.species.id), pokemon.speciesState, pokemon);
			}
			this.midTurn = true;
			break;
		}

		case 'move':
			if (!action.pokemon.isActive || action.pokemon.fainted) return false;
			this.actions.runMove(action.move, action.pokemon, action.targetLoc, action.sourceEffect,
				action.zmove, undefined, action.maxMove, action.originalTarget);
			break;
		case 'megaEvo':
			this.actions.runMegaEvo(action.pokemon);
			break;
		case 'runDynamax':
			action.pokemon.addVolatile('dynamax');
			action.pokemon.side.dynamaxUsed = true;
			if (action.pokemon.side.allySide) action.pokemon.side.allySide.dynamaxUsed = true;
			break;
		case 'terastallize':
			this.actions.terastallize(action.pokemon);
			break;
		case 'beforeTurnMove':
			if (!action.pokemon.isActive || action.pokemon.fainted) return false;
			this.debug('before turn callback: ' + action.move.id);
			const target = this.getTarget(action.pokemon, action.move, action.targetLoc);
			if (!target) return false;
			if (!action.move.beforeTurnCallback) throw new Error(`beforeTurnMove has no beforeTurnCallback`);
			action.move.beforeTurnCallback.call(this, action.pokemon, target);
			break;
		case 'priorityChargeMove':
			if (!action.pokemon.isActive || action.pokemon.fainted) return false;
			this.debug('priority charge callback: ' + action.move.id);
			if (!action.move.priorityChargeCallback) throw new Error(`priorityChargeMove has no priorityChargeCallback`);
			action.move.priorityChargeCallback.call(this, action.pokemon);
			break;

		case 'event':
			this.runEvent(action.event!, action.pokemon);
			break;
		case 'team':
			if (action.index === 0) {
				action.pokemon.side.pokemon = [];
			}
			action.pokemon.side.pokemon.push(action.pokemon);
			action.pokemon.position = action.index;
			// we return here because the update event would crash since there are no active pokemon yet
			return;

		case 'pass':
			return;
		case 'instaswitch':
		case 'switch':
			if (action.choice === 'switch' && action.pokemon.status) {
				this.singleEvent('CheckShow', this.dex.abilities.getByID('naturalcure' as ID), null, action.pokemon);
			}
			if (this.actions.switchIn(action.target, action.pokemon.position,
				action.sourceEffect) !== 'pursuitfaint') break;
			// a pokemon fainted from Pursuit before it could switch
			/*if (this.gen <= 4) {
				// in gen 2-4, the switch still happens
				this.hint("Previously chosen switches continue in Gen 2-4 after a Pursuit target faints.");
				action.priority = -101;
				this.queue.unshift(action);
				break;
			}*/
			// in gen 5+, the switch is cancelled
			this.hint("A Pokemon can't switch between when it runs out of HP and when it faints");
			break;
		case 'revivalblessing':
			action.pokemon.side.pokemonLeft++;
			if (action.target.position < action.pokemon.side.active.length) {
				this.queue.addChoice({
					choice: 'instaswitch',
					pokemon: action.target,
					target: action.target,
				});
			}
			action.target.fainted = action.target.faintQueued = action.target.subFainted = false;
			action.target.status = '';
			action.target.hp = 1; // Needed so hp functions works
			action.target.sethp(action.target.maxhp / 2);
			this.add('-heal', action.target, action.target.getHealth, '[from] move: Revival Blessing');
			action.pokemon.side.removeSlotCondition(action.pokemon, 'revivalblessing');
			break;
		case 'runUnnerve':
			this.singleEvent('PreStart', action.pokemon.getAbility(), action.pokemon.abilityState, action.pokemon);
			break;
		case 'runSwitch':
			this.actions.runSwitch(action.pokemon);
			break;
		case 'runPrimal':
			if (!action.pokemon.transformed) {
				this.singleEvent('Primal', action.pokemon.getItem(), action.pokemon.itemState, action.pokemon);
			}
			break;
		case 'shift':
			if (!action.pokemon.isActive || action.pokemon.fainted) return false;
			this.swapPosition(action.pokemon, 1);
			break;

		case 'beforeTurn':
			this.eachEvent('BeforeTurn');
			break;
		case 'residual':
			this.add('');
			this.clearActiveMove(true);
			this.updateSpeed();
			residualPokemon = this.getAllActive().map(pokemon => [pokemon, pokemon.getUndynamaxedHP()] as const);
			this.residualEvent('Residual');
			this.add('upkeep');
			break;
		}

		// phazing (Roar, etc)
		for (const side of this.sides) {
			for (const pokemon of side.active) {
				if (!pokemon.forceSwitchFlag) continue;
				if (pokemon.hp) this.actions.dragIn(pokemon.side, pokemon.position);
				pokemon.forceSwitchFlag = false;
			}
		}

		this.clearActiveMove();

		// fainting

		this.faintMessages();
		if (this.ended) return true;

		// switching (fainted pokemon, U-turn, Baton Pass, etc)

		if (!this.queue.peek() /*|| (this.gen <= 3 && ['move', 'residual'].includes(this.queue.peek()!.choice))*/) {
			// in gen 3 or earlier, switching in fainted pokemon is done after
			// every move, rather than only at the end of the turn.
			this.checkFainted();
		} else if (action.choice === 'megaEvo'/* && this.gen === 7*/) {
			this.eachEvent('Update');
			// In Gen 7, the action order is recalculated for a Pokémon that mega evolves.
			for (const [i, queuedAction] of this.queue.list.entries()) {
				if (queuedAction.pokemon === action.pokemon && queuedAction.choice === 'move') {
					this.queue.list.splice(i, 1);
					queuedAction.mega = 'done';
					this.queue.insertChoice(queuedAction, true);
					break;
				}
			}
			return false;
		} else if (this.queue.peek()?.choice === 'instaswitch') {
			return false;
		}

		//if (this.gen >= 5) {
			this.eachEvent('Update');
			for (const [pokemon, originalHP] of residualPokemon) {
				const halfOfMaxHP = pokemon.getUndynamaxedHP(pokemon.maxhp) / 2;
				if (pokemon.hp && pokemon.getUndynamaxedHP() <= halfOfMaxHP && originalHP > halfOfMaxHP) {
					this.runEvent('EmergencyExit', pokemon);
				}
			}
		//}

		if (action.choice === 'runSwitch') {
			const pokemon = action.pokemon;
			const threshold = pokemon.maxhp / 2;
			if (pokemon.hp && pokemon.hp <= threshold && pokemonOriginalHP! > threshold) {
				this.runEvent('EmergencyExit', pokemon);
			}
		}

		const switches = this.sides.map(
			side => side.active.some(pokemon => pokemon && !!pokemon.switchFlag)
		);

		for (let i = 0; i < this.sides.length; i++) {
			if (switches[i]) {
				let reviveSwitch = false; // Used to ignore the fake switch for Revival Blessing
				
				if (!this.canSwitch(this.sides[i])) {
					for (const pokemon of this.sides[i].active) {
						if (this.sides[i].slotConditions[pokemon.position]['revivalblessing']) {
							reviveSwitch = true;
							continue;
						}
						pokemon.switchFlag = false;
					}
					if (!reviveSwitch) switches[i] = false;
				} else {
					for (const pokemon of this.sides[i].active) {
						if (pokemon.switchFlag && pokemon.switchFlag !== 'revivalblessing' && !pokemon.skipBeforeSwitchOutEventFlag) {
							this.runEvent('BeforeSwitchOut', pokemon);
							pokemon.skipBeforeSwitchOutEventFlag = true;
							this.faintMessages(); // Pokemon may have fainted in BeforeSwitchOut
							if (this.ended) return true;
							if (pokemon.fainted) {
								switches[i] = this.sides[i].active.some(sidePokemon => sidePokemon && !!sidePokemon.switchFlag);
							}
						}
					}
				}
			}
		}

		if (switches.some(Boolean)) {
			this.makeRequest('switch');
			return true;
		}
		/*for (const playerSwitch of switches) {
			if (playerSwitch) {
				this.makeRequest('switch');
				return true;
			}
		}*/

		//if (this.gen < 5) this.eachEvent('Update');

		if (/*this.gen >= 8 &&*/ (this.queue.peek()?.choice === 'move' || this.queue.peek()?.choice === 'runDynamax')) {
			// In gen 8, speed is updated dynamically so update the queue's speed properties and sort it.
			this.updateSpeed();
			for (const queueAction of this.queue.list) {
				if (!queueAction.pokemon) continue; 
				this.getActionSpeed(queueAction);
			}
			this.queue.sort();
		}

		return false;
	},
	
	/*showOpenTeamSheets(hideFromSpectators = false) {
		if (this.turn !== 0) return;
		for (const side of this.sides) {
			const team = side.pokemon.map(pokemon => {
				const set = pokemon.set;
				const newSet: PokemonSet = {
					name: '',
					species: set.species,
					item: set.item,
					ability: set.ability,
					moves: set.moves,
					nature: '',
					gender: pokemon.gender,
					evs: null!,
					ivs: null!,
					level: set.level,
				};
				//if (this.gen === 8) newSet.gigantamax = set.gigantamax;
				//if (this.gen === 9) newSet.teraType = set.teraType;
				// Only display Hidden Power type if the Pokemon has Hidden Power
				// This is based on how team sheets were written in past VGC formats
				if (set.moves.some(m => this.dex.moves.get(m).id === 'hiddenpower')) newSet.hpType = set.hpType;
				// This is done so the client doesn't flag Zacian/Zamazenta as illusions
				// when they use their signature move
				const setSpecies = toID(set.species);
				const setItem = toID(set.item);
				const isLutakon = setSpecies === 'lutakon';
				if ((setSpecies === 'zacian' && setItem === 'rustedsword') ||
					(setSpecies === 'zamazenta' && setItem === 'rustedshield') || 
					(isLutakon && setItem === 'awakeningseed')) {
					newSet.species = Dex.species.get(set.species + (isLutakon ? 'awakened' : 'crowned')).name;
					const crowned: {[k: string]: string} = {
						'Zacian-Crowned': 'behemothblade', 'Zamazenta-Crowned': 'behemothbash', 
						'Lutakon-Awakened': 'gaiarecovery'
					};
					const ironHead = set.moves.map(toID).indexOf((isLutakon ? 'synthesis' : 'ironhead') as ID);
					if (ironHead >= 0) {
						newSet.moves[ironHead] = crowned[newSet.species];
					}
				}
				return newSet;
			});
			if (hideFromSpectators) {
				for (const s of this.sides) {
					this.addSplit(s.id, ['showteam', side.id, Teams.pack(team)]);
				}
			} else {
				this.add('showteam', side.id, Teams.pack(team));
			}
		}
	},*/
	actions: {	
		getActiveBalmMove(baseMove: Move, balmMove: Move) {
			if (typeof baseMove === 'string') baseMove = this.dex.getActiveMove(baseMove);
			if (baseMove.name === 'struggle') return baseMove;
			if (typeof balmMove === 'string') balmMove = this.dex.getActiveMove(balmMove);
			if (baseMove.category !== balmMove.category && [balmMove.category, baseMove.category].includes('Status')) return baseMove;
			//This function assumes that either both moves passed are damaging or both are status.
			if (balmMove.category !== 'Status') {
				balmMove.category = baseMove.category;
				balmMove.basePower = baseMove.basePower*1.5;
			}
			return balmMove;
		},
		runMove(
			moveOrMoveName: Move | string, pokemon: Pokemon, targetLoc: number, sourceEffect?: Effect | null,
			zMove?: string, externalMove?: boolean, maxMove?: string, originalTarget?: Pokemon
		) {
			pokemon.activeMoveActions++;
			let target = this.battle.getTarget(pokemon, maxMove || zMove || moveOrMoveName, targetLoc, originalTarget);
			let baseMove = this.dex.getActiveMove(moveOrMoveName);
			const pranksterBoosted = baseMove.pranksterBoosted;
			if (baseMove.id !== 'struggle' && !zMove && !maxMove && !externalMove) {
				const changedMove = this.battle.runEvent('OverrideAction', pokemon, target, baseMove);
				if (changedMove && changedMove !== true) {
					baseMove = this.dex.getActiveMove(changedMove);
					if (pranksterBoosted) baseMove.pranksterBoosted = pranksterBoosted;
					target = this.battle.getRandomTarget(pokemon, baseMove);
				}
			}
			let move = baseMove;
			let balmMove = null;
			if (zMove) {
				move = this.getActiveZMove(baseMove, pokemon);
			} else if (maxMove) {
				move = this.getActiveMaxMove(baseMove, pokemon);
			} else if (pokemon.volatiles['typebalm']?.balmMove) {
				const balmEffectData = pokemon.volatiles['typebalm'];
				const isBalmStatus = balmEffectData.isBalmStatus;
				if (
					(move.id === 'hiddenpower' ? pokemon.hpType : move.type) 
						=== pokemon.volatiles['typebalm'].balmType //Check if balm type matches move type
					&& ((move.category === 'Status') ? isBalmStatus : !isBalmStatus) //If the balm or base move is status but not both it won't overwrite
				) {
					const balmMoveData = this.dex.getActiveMove(pokemon.volatiles['typebalm'].balmMove);
					move = this.getActiveBalmMove(move, balmMoveData);
					balmMove = pokemon.volatiles['typebalm'].balmMove;
				}
			}

			move.isExternal = externalMove;

			this.battle.setActiveMove(move, pokemon, target);

			/* if (pokemon.moveThisTurn) {
				// THIS IS PURELY A SANITY CHECK
				// DO NOT TAKE ADVANTAGE OF THIS TO PREVENT A POKEMON FROM MOVING;
				// USE this.queue.cancelMove INSTEAD
				this.battle.debug('' + pokemon.id + ' INCONSISTENT STATE, ALREADY MOVED: ' + pokemon.moveThisTurn);
				this.battle.clearActiveMove(true);
				return;
			} */
			const willTryMove = this.battle.runEvent('BeforeMove', pokemon, target, move);
			if (!willTryMove) {
				this.battle.runEvent('MoveAborted', pokemon, target, move);
				this.battle.clearActiveMove(true);
				if (willTryMove === false && pokemon.hasItem('blunderpolicy') && pokemon.useItem()) {
					this.battle.boost({spe: 2}, pokemon);
				}
				// The event 'BeforeMove' could have returned false or null
				// false indicates that this counts as a move failing for the purpose of calculating Stomping Tantrum's base power
				// null indicates the opposite, as the Pokemon didn't have an option to choose anything
				pokemon.moveThisTurnResult = willTryMove;
				return;
			}

			// Used exclusively for a hint later
			if (move.flags['cantusetwice'] && pokemon.lastMove?.id === move.id) {
				pokemon.addVolatile(move.id);
			}

			if (move.beforeMoveCallback && move.beforeMoveCallback.call(this.battle, pokemon, target, move)) {
				this.battle.clearActiveMove(true);
				pokemon.moveThisTurnResult = false;
				if (pokemon.hasItem('blunderpolicy') && pokemon.useItem()) {
					this.battle.boost({spe: 2}, pokemon);
				}
				return;
			}
			pokemon.lastDamage = 0;
			let lockedMove;
			if (!externalMove) {
				lockedMove = this.battle.runEvent('LockMove', pokemon);
				if (lockedMove === true) lockedMove = false;
				if (lockedMove) {
					sourceEffect = this.dex.conditions.get('lockedmove');	
				} else {
					const usedTomeOfImagination = pokemon.hasItem('tomeofimagination') && move.id !== 'fling' && pokemon.useItem();
					if (usedTomeOfImagination) {
						this.battle.add('-activate', pokemon, 'item: Tome of Imagination');
						this.battle.add('-message', `${pokemon.name} used its Tome of Imagination to preserve its move's PP!`);
						pokemon.addVolatile('tomeofimagination');
					} else if (!pokemon.deductPP(baseMove, null, target) && (move.id !== 'struggle')) {
						this.battle.add('cant', pokemon, 'nopp', move);
						this.battle.clearActiveMove(true);
						pokemon.moveThisTurnResult = false;
						if (pokemon.hasItem('blunderpolicy') && pokemon.useItem()) {
							this.battle.boost({spe: 2}, pokemon);
						}
						return;
					}
				}
				pokemon.moveUsed(move, targetLoc);
			}

			// Dancer Petal Dance hack
			// TODO: implement properly
			const noLock = externalMove && !pokemon.volatiles['lockedmove'];

			if (zMove) {
				if (pokemon.illusion) {
					this.battle.singleEvent('End', this.dex.abilities.get('Illusion'), pokemon.abilityState, pokemon);
				}
				this.battle.add('-zpower', pokemon);
				pokemon.side.zMoveUsed = true;
			}

			const oldActiveMove = move;

			const moveDidSomething = this.useMove(baseMove, pokemon, target, sourceEffect, zMove, maxMove, balmMove);
			this.battle.lastSuccessfulMoveThisTurn = moveDidSomething ? this.battle.activeMove && this.battle.activeMove.id : null;
			if (this.battle.activeMove) move = this.battle.activeMove;
			this.battle.singleEvent('AfterMove', move, null, pokemon, target, move);
			this.battle.runEvent('AfterMove', pokemon, target, move);
			if (move.flags['cantusetwice'] && pokemon.removeVolatile(move.id)) {
				this.battle.add('-hint', `Some effects can force a Pokemon to use ${move.name} again in a row.`);
			}

			// Dancer's activation order is completely different from any other event, so it's handled separately
			if ((move.flags['dance'] || move.flags['bullet']) && moveDidSomething && !move.isExternal) {
				const active = this.battle.getAllActive().filter(currentPoke =>
					pokemon !== currentPoke && !currentPoke.isSemiInvulnerable() && currentPoke.hasAbility(['dancer','ballfetch'])
				);
				if (active.length) {
					const dancers = [];
					if (move.flags['dance']) {
						for (const currentPoke of active.filter(currentPoke => currentPoke.hasAbility('dancer'))) {
							dancers.push(currentPoke);
						}
					}
					if (move.flags['bullet']) {
						for (const currentPoke of active.filter(currentPoke => currentPoke.hasAbility('ballfetch'))) {
							dancers.push(currentPoke);
						}
					}
					// Dancer activates in order of lowest speed stat to highest
					// Note that the speed stat used is after any volatile replacements like Speed Swap,
					// but before any multipliers like Agility or Choice Scarf
					// Ties go to whichever Pokemon has had the ability for the least amount of time
					dancers.sort(
						(a, b) => (a.storedStats['spe'] - b.storedStats['spe']) || b.abilityOrder - a.abilityOrder
					);
					const targetOf1stDance = this.battle.activeTarget!;
					for (const dancer of dancers) {
						if (this.battle.faintMessages()) break;
						if (dancer.fainted) continue;
						this.battle.add('-activate', dancer, 'ability: ' + (move.flags['dance'] ? 'Dancer' : 'Ball Fetch'));
						const dancersTarget = !targetOf1stDance.isAlly(dancer) && pokemon.isAlly(dancer) ?
							targetOf1stDance :
							pokemon;
						this.runMove(move.id, dancer, dancer.getLocOf(dancersTarget), this.dex.abilities.get(
						move.flags['dance'] ? 'dancer' : 'ballfetch'), undefined, true);
					}
				}
			}
			if (noLock && pokemon.volatiles['lockedmove']) delete pokemon.volatiles['lockedmove'];
			this.battle.faintMessages();
			this.battle.checkWin();

			/*if (this.battle.gen <= 4) {
				// In gen 4, the outermost move is considered the last move for Copycat
				this.battle.activeMove = oldActiveMove;
			}*/
		},
		useMove(
			move: Move | string, pokemon: Pokemon, target?: Pokemon | null,
			sourceEffect?: Effect | null, zMove?: string, maxMove?: string, balmMove?: string
		) {
			pokemon.moveThisTurnResult = undefined;
			const oldMoveResult: boolean | null | undefined = pokemon.moveThisTurnResult;
			const moveResult = this.useMoveInner(move, pokemon, target, sourceEffect, zMove, maxMove, balmMove);
			if (oldMoveResult === pokemon.moveThisTurnResult) {
				pokemon.moveThisTurnResult = moveResult;
				if (moveResult === false && pokemon.hasItem('blunderpolicy') && pokemon.useItem()) {
					this.battle.boost({spe: 2}, pokemon);
				}
			}
			return moveResult;
		},
		useMoveInner(
			moveOrMoveName: Move | string, pokemon: Pokemon, target?: Pokemon | null,
			sourceEffect?: Effect | null, zMove?: string, maxMove?: string, balmMove?: string
		) {
			if (!sourceEffect && this.battle.effect.id) sourceEffect = this.battle.effect;
			if (sourceEffect && ['instruct', 'custapberry'].includes(sourceEffect.id)) sourceEffect = null;
			
			let move = this.dex.getActiveMove(moveOrMoveName);
			pokemon.lastMoveUsed = move;
			if (balmMove) {
				move = this.getActiveBalmMove(move, balmMove);
			} else if (zMove || (move.category !== 'Status' && sourceEffect && (sourceEffect as ActiveMove).isZ)) {
				if (move.id === 'weatherball' && zMove) {
					// Z-Weather Ball only changes types if it's used directly,
					// not if it's called by Z-Sleep Talk or something.
					this.battle.singleEvent('ModifyType', move, null, pokemon, target, move, move);
					if (move.type !== 'Normal') sourceEffect = move;
				}
				move = this.getActiveZMove(move, pokemon);
			} else if (maxMove || (move.category !== 'Status' && sourceEffect && (sourceEffect as ActiveMove).isMax)) {
				if (maxMove && move.category !== 'Status') {
					// Max move outcome is dependent on the move type after type modifications from ability and the move itself
					this.battle.singleEvent('ModifyType', move, null, pokemon, target, move, move);
					this.battle.runEvent('ModifyType', pokemon, target, move, move);
				}
				move = this.getActiveMaxMove(move, pokemon);
			}

			if (this.battle.activeMove) {
				move.priority = this.battle.activeMove.priority;
				if (!move.hasBounced) move.pranksterBoosted = this.battle.activeMove.pranksterBoosted;
			}
			const baseTarget = move.target;
			let targetRelayVar = this.battle.runEvent('ModifyTarget', pokemon, target, move, {target}, true);
			if (targetRelayVar.target !== undefined) target = targetRelayVar.target;
			if (target === undefined) target = this.battle.getRandomTarget(pokemon, move);
			if (move.target === 'self' || move.target === 'allies') {
				target = pokemon;
			}
			if (sourceEffect) {
				move.sourceEffect = sourceEffect.id;
				move.ignoreAbility = (sourceEffect as ActiveMove).ignoreAbility;
			}
			let moveResult = false;

			this.battle.setActiveMove(move, pokemon, target);

			this.battle.singleEvent('ModifyType', move, null, pokemon, target, move, move);
			this.battle.singleEvent('ModifyMove', move, null, pokemon, target, move, move);
			if (baseTarget !== move.target) {
				// Target changed in ModifyMove, so we must adjust it here
				// Adjust before the next event so the correct target is passed to the
				// event
				target = this.battle.getRandomTarget(pokemon, move);
			}
			move = this.battle.runEvent('ModifyType', pokemon, target, move, move);
			move = this.battle.runEvent('ModifyMove', pokemon, target, move, move);
			if (baseTarget !== move.target) {
				// Adjust again
				target = this.battle.getRandomTarget(pokemon, move);
			}
			if (!move || pokemon.fainted) {
				return false;
			}

			let attrs = '';

			let movename = move.name;
			if (move.id === 'hiddenpower') movename = 'Hidden Power';
			if (sourceEffect) attrs += `|[from]${sourceEffect.fullname}`;
			if (zMove && move.isZ === true) {
				attrs = '|[anim]' + movename + attrs;
				movename = 'Z-' + movename;
			}
			this.battle.addMove('move', pokemon, movename, target + attrs);

			if (zMove) this.runZPower(move, pokemon);

			if (!target) {
				this.battle.attrLastMove('[notarget]');
				this.battle.add(/*this.battle.gen >= 5 ?*/ '-fail' /*: '-notarget'*/, pokemon);
				return false;
			}

			const {targets, pressureTargets} = pokemon.getMoveTargets(move, target);
			if (targets.length) {
				target = targets[targets.length - 1]; // in case of redirection
			}
			if (!pokemon.hasItem('tomeofimagination') && !pokemon.volatiles['tomeofimagination']) {
				const callerMoveForPressure = sourceEffect && (sourceEffect as ActiveMove).pp ? sourceEffect as ActiveMove : null;
				if (!sourceEffect || callerMoveForPressure || sourceEffect.id === 'pursuit') {
					let extraPP = 0;
					for (const source of pressureTargets) {
						const ppDrop = this.battle.runEvent('DeductPP', source, pokemon, move);
						if (ppDrop !== true) {
							extraPP += ppDrop || 0;
						}
					}
					if (extraPP > 0) {
						pokemon.deductPP(callerMoveForPressure || moveOrMoveName, extraPP);
					}
				}
			}

			if (!this.battle.singleEvent('TryMove', move, null, pokemon, target, move) ||
				!this.battle.runEvent('TryMove', pokemon, target, move)) {
				move.mindBlownRecoil = false;
				return false;
			}

			this.battle.singleEvent('UseMoveMessage', move, null, pokemon, target, move);

			if (move.ignoreImmunity === undefined) {
				move.ignoreImmunity = (move.category === 'Status');
			}

			if (/*this.battle.gen !== 4 &&*/ move.selfdestruct === 'always') {
				this.battle.faint(pokemon, pokemon, move);
			}

			let damage: number | false | undefined | '' = false;
			if (move.target === 'all' || move.target === 'foeSide' || move.target === 'allySide' || move.target === 'allyTeam') {
				damage = this.tryMoveHit(targets, pokemon, move);
				if (damage === this.battle.NOT_FAIL) pokemon.moveThisTurnResult = null;
				if (damage || damage === 0 || damage === undefined) moveResult = true;
			} else if (targets.length) {
				/*if (this.battle.gen === 4 && move.selfdestruct === 'always') {
					this.battle.faint(pokemon, pokemon, move);
				}*/
				moveResult = this.trySpreadMoveHit(targets, pokemon, move);
			} else {
				this.battle.attrLastMove('[notarget]');
				this.battle.add(/*this.battle.gen >= 5 ?*/ '-fail'/* : '-notarget'*/, pokemon);
				return false;
			}
			if (move.selfBoost && moveResult) this.moveHit(pokemon, pokemon, move, move.selfBoost, false, true);
			if (!pokemon.hp) {
				this.battle.faint(pokemon, pokemon, move);
			}

			if (!moveResult) {
				this.battle.singleEvent('MoveFail', move, null, target, pokemon, move);
				return false;
			}

			if (
				!move.negateSecondary &&
				!(move.hasSheerForce && pokemon.hasAbility('sheerforce')) &&
				!move.flags['futuremove']
			) {
				const originalHp = pokemon.hp;
				this.battle.singleEvent('AfterMoveSecondarySelf', move, null, pokemon, target, move);
				this.battle.runEvent('AfterMoveSecondarySelf', pokemon, target, move);
				if (pokemon && pokemon !== target && move.category !== 'Status'/*) {
					if (*/ && pokemon.hp <= pokemon.maxhp * .5 && originalHp > pokemon.maxhp * .5) {
						this.battle.runEvent('EmergencyExit', pokemon, pokemon);
					//}
				}
			}

			return true;
		},
		modifyDamage(
			baseDamage: number, pokemon: Pokemon, target: Pokemon, move: ActiveMove, suppressMessages = false
		) {
			const tr = this.battle.trunc;
			const type = (move.type ||= '???');

			baseDamage += 2;

			if (move.spreadHit) {
				// multi-target modifier (doubles only)
				const spreadModifier = move.spreadModifier || (this.battle.gameType === 'freeforall' ? 0.5 : 0.75);
				this.battle.debug('Spread modifier: ' + spreadModifier);
				baseDamage = this.battle.modify(baseDamage, spreadModifier);
			} else if (move.multihitType === 'parentalbond' && move.hit > 1) {
				// Parental Bond modifier
				const bondModifier = 0.25;//this.battle.gen > 6 ? 0.25 : 0.5;
				this.battle.debug(`Parental Bond modifier: ${bondModifier}`);
				baseDamage = this.battle.modify(baseDamage, bondModifier);
			}

			// weather modifier
			baseDamage = this.battle.runEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);

			// crit - not a modifier
			const isCrit = target.getMoveHitData(move).crit;
			if (isCrit) {
				baseDamage = tr(baseDamage * (move.critModifier || /*(this.battle.gen >= 6 ? 1.5 : 2)*/ 1.5));
			}

			// random factor - also not a modifier
			baseDamage = this.battle.randomizer(baseDamage);

			// STAB
			// The "???" type never gets STAB
			// Not even if you Roost in Gen 4 and somehow manage to use
			// Struggle in the same turn.
			// (On second thought, it might be easier to get a MissingNo.)
			if (type !== '???') {
				const isSTAB = move.forceSTAB || pokemon.hasType(type) || pokemon.getTypes(false, true).includes(type);
				let stab: number | [number, number] = isSTAB ? 1.5 : 1
		
				// The Stellar tera type makes this incredibly confusing
				// If the move's type does not match one of the user's base types,
				// the Stellar tera type applies a one-time 1.2x damage boost for that type.

				// If the move's type does match one of the user's base types,
				// then the Stellar tera type applies a one-time 2x STAB boost for that type,
				// and then goes back to using the regular 1.5x STAB boost for those types.
				if (pokemon.terastallized !== 'Stellar') {
					stab = this.battle.runEvent('ModifySTAB', pokemon, target, move, 
						(pokemon.terastallized === type && pokemon.getTypes(false, true).includes(type)) ? 2 : stab						 
					);	
				} else if (!pokemon.stellarBoostedTypes.includes(type)) {
					stab = isSTAB ? 2 : [4915, 4096];
					if (pokemon.species.name !== 'Terapagos-Stellar') {
						pokemon.stellarBoostedTypes.push(type);
					}
				}
		
				baseDamage = this.battle.modify(baseDamage, stab);
			}

			// types
			let typeMod = target.runEffectiveness(move);
			typeMod = this.battle.clampIntRange(typeMod, -6, 6);
			target.getMoveHitData(move).typeMod = typeMod;
			if (typeMod > 0) {
				if (!suppressMessages) this.battle.add('-supereffective', target);

				for (let i = 0; i < typeMod; i++) {
					baseDamage *= 2;
				}
			}
			else if (typeMod < 0) {
				if (!suppressMessages) this.battle.add('-resisted', target);

				for (let i = 0; i > typeMod; i--) {
					baseDamage = tr(baseDamage / 2);
				}
			}

			if (isCrit && !suppressMessages) this.battle.add('-crit', target);

			if (pokemon.status === 'brn' && move.category === 'Physical' && !pokemon.hasAbility('guts')
				&& !['facade','pepperrush'].includes(move.id)) {
				baseDamage = this.battle.modify(baseDamage, 0.5);
			}

			// Generation 5, but nothing later, sets damage to 1 before the final damage modifiers
			//if (this.battle.gen === 5 && !baseDamage) baseDamage = 1;

			// Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
			baseDamage = this.battle.runEvent('ModifyDamage', pokemon, target, move, baseDamage);

			if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
				baseDamage = this.battle.modify(baseDamage, 0.25);
				this.battle.add('-zbroken', target);
			}

			// Generation 6-7 moves the check for minimum 1 damage after the final modifier...
			if (/*this.battle.gen !== 5 && */!baseDamage) return 1;

			// ...but 16-bit truncation happens even later, and can truncate to 0
			return tr(baseDamage, 16);
		},
		
		hitStepBreakProtect(targets: Pokemon[], pokemon: Pokemon, move: ActiveMove) {
			//Adding custom protective moves
			if (move.breaksProtect) {
				for (const target of targets) {
					let broke = false;
					for (const effectid of [
						'banefulbunker', 'burningbulwark', 'kingsshield', 'obstruct', 'protect', 'silktrap', 'spikyshield',
						'fieldofvision', 'toxicsnowball', 'firewall'
					]) {
						if (target.removeVolatile(effectid)) broke = true;
					}
					//if (this.battle.gen >= 6 || !target.isAlly(pokemon)) {
						for (const effectid of ['craftyshield', 'matblock', 'quickguard', 'wideguard']) {
							if (target.side.removeSideCondition(effectid)) broke = true;
						}
					//}
					if (broke) {
						if (move.id === 'feint') {
							this.battle.add('-activate', target, 'move: Feint');
						} else {
							this.battle.add('-activate', target, 'move: ' + move.name, '[broken]');
						}
						/*if (this.battle.gen >= 6)*/ delete target.volatiles['stall'];
					}
				}
			}
			return undefined;
		}
		/*canMegaEvo(pokemon) {
			if (pokemon.species.isMega) return null;

			const item = pokemon.getItem();
			if (!item.megaStone || item.megaStone === pokemon.baseSpecies.name) return null;
			return item.megaStone;
		},
		runMegaEvo(pokemon) {
			if (pokemon.species.isMega) return false;

			// @ts-ignore
			const species: Species = this.getMixedSpecies(pokemon.species, pokemon.canMegaEvo);

			// Do we have a proper sprite for it?
			if (this.dex.species.get(pokemon.canMegaEvo!).baseSpecies === pokemon.species.baseSpecies) {
				pokemon.formeChange(species, pokemon.getItem(), true);
				// Limit one mega evolution
				for (const ally of pokemon.side.pokemon) {
					if (!ally.item.endsWith('mask') || !ally.getItem().megaStone) {
						ally.canMegaEvo = null;
					}
				}
			} else {
				const oSpecies = this.dex.species.get(pokemon.species);
				// @ts-ignore
				const oMegaSpecies = this.dex.species.get(species.originalSpecies);
				pokemon.formeChange(species, pokemon.getItem(), true);
				this.battle.add('-start', pokemon, oMegaSpecies.requiredItem, '[silent]');
				if (oSpecies.types.length !== pokemon.species.types.length || oSpecies.types[1] !== pokemon.species.types[1]) {
					this.battle.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
				}
				//limit one wonder mask
				for (const ally of pokemon.side.pokemon) {
					if (ally.item.endsWith('mask') && ally.getItem().megaStone) {
						ally.canMegaEvo = null;
					}
				}
			}

			return true;
		},
		getMixedSpecies(originalForme, megaForme) {
			const originalSpecies = this.dex.species.get(originalForme);
			const megaSpecies = this.dex.species.get(megaForme);
			if (originalSpecies.baseSpecies === megaSpecies.baseSpecies) return megaSpecies;
			// @ts-ignore
			return this.mutateOriginalSpecies(originalSpecies, megaSpecies);
		},
		mutateOriginalSpecies(speciesOrForme, formeChangeSpecies) {
			const baseSpecies = this.dex.species.get(formeChangeSpecies.baseSpecies);
			let statDeltas = {};
			let statId: StatID;
			for (statId in formeChangeSpecies.baseStats) {
				statDeltas[statId] = formeChangeSpecies.baseStats[statId] - baseSpecies.baseStats[statId];
			}
			const species = this.dex.deepClone(this.dex.species.get(speciesOrForme));
			const baseStats = species.baseStats;
			for (const statName in baseStats) {
				baseStats[statName] = this.battle.clampIntRange(baseStats[statName] + statDeltas[statName], 1, 255);
			}
			
			const abil = formeChangeSpecies.abilities['0'];
			species.abilities = {'0': abil};
			const newType = formeChangeSpecies.types[0];
			species.types = (species.types[0] === newType) ?
				[newType] : [species.types[0], newType];
			if (species.types[1]) {
				const firsttype = species.types[0];
				this.battle.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + ` (` + formeChangeSpecies.requiredItem + `)</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${firsttype}.png" alt="${firsttype}" height="14" width="32"><img src="https://${Config.routes.client}/sprites/types/${newType}.png" alt="${newType}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abil + `</span><span class="col abilitycol"></span></span></li><li style="clear: both"></li></ul>`);
			} else {
				this.battle.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + ` (` + formeChangeSpecies.requiredItem + `)</span> <span class="col typecol"><img src="https://${Config.routes.client}/sprites/types/${newType}.png" alt="${newType}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abil + `</span><span class="col abilitycol"></span></span></li><li style="clear: both"></li></ul>`);
			}
			this.battle.add(`raw|<ul class="utilichart"><li class="result"><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);

			//species.weighthg = Math.max(1, species.weighthg + formeChangeSpecies.weighthg - baseSpecies.weighthg);
			species.originalSpecies = formeChangeSpecies.name;
			species.requiredItem = formeChangeSpecies.requiredItem;
			species.isMega = true;
			return species;
		},*/
	},
	pokemon: { 
		/*addType(newType: string) {
			if (this.volatiles['typebalm'] || this.terastallized) return false;
			this.addedType = newType;
			return true;
		},*/
		ignoringItem() {
			return !!(
				this.itemState.knockedOff || // Gen 3-4
				(/*this.battle.gen >= 5 &&*/ !this.isActive) ||
				(!this.getItem().ignoreKlutz && this.hasAbility('klutz')) ||
				this.volatiles['rulebook'] || this.volatiles['embargo'] ||
				this.battle.field.pseudoWeather['magicroom']
			);
		},
		runImmunity(type: string, message?: string | boolean) {
			if (!type || type === '???') return true;
			if (!this.battle.dex.types.isName(type)) {
				throw new Error("Use runStatusImmunity for " + type);
			}
			if (this.fainted) return false;
	
			const negateImmunity = !this.battle.runEvent('NegateImmunity', this, type);
			const notImmune = type === 'Ground' ?
				this.isGrounded(negateImmunity) :
				negateImmunity || this.battle.dex.getImmunity(type, this);
			if (notImmune) return true;
			if (message) {
				if (notImmune === null) {
					this.battle.add('-immune', this, '[from] ability: ' + this.getAbility().name);
				} else {
					this.battle.add('-immune', this);
				}
			}
			return false;
		},
		isGrounded(negateImmunity = false) {
			if ('gravity' in this.battle.field.pseudoWeather/*) return true;
			if (*/|| 'ingrain' in this.volatiles/* && this.battle.gen >= 4) return true;
			if (*/|| 'smackdown' in this.volatiles) return true;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return true;
			// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
			if (!negateImmunity && this.hasType('Flying') && !('roost' in this.volatiles)) return false;
			if ((this.hasAbility(['levitate', 'soaringspirit']) || (this.species.name === 'Fulmenops-Stormy')
				&& this.hasAbility('weatherflux')) && !this.battle.suppressingAbility(this)) return null;
			if ('magnetrise' in this.volatiles/*) return false;
			if (*/|| 'telekinesis' in this.volatiles) return false;
			//These species are excluded from the Tree-Topper check due to Telekinesis failing against them
			if (!['Diglett', 'Dugtrio', 'Palossand', 'Sandygast'].includes(this.baseSpecies.baseSpecies) &&
						this.baseSpecies.name !== 'Gengar-Mega' && this.battle.getAllActive().some(target => target.hasAbility('treetopper'))) return false;
			return item !== 'airballoon';
		 },
		
		/** Specifically: is protected against a single-target damaging move */
		isProtected() {
			return !!(
				this.volatiles['protect'] || this.volatiles['detect'] || this.volatiles['maxguard'] ||
				this.volatiles['kingsshield'] || this.volatiles['spikyshield'] || this.volatiles['banefulbunker'] ||
				this.volatiles['obstruct'] || this.volatiles['silktrap'] || this.volatiles['burningbulwark'] ||
				this.volatiles['fieldofvision'] || this.volatiles['firewall'] || this.volatiles['toxicsnowball']
			);
		}
     },
};
