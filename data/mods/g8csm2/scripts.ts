export const Scripts: ModdedBattleScriptsData = {
	teambuilderConfig: {
        excludeStandardTiers: true,
	},
	init: function(){
		this.modData('Moves', 'aerialace').flags.slicing = 1;
		this.modData('Moves', 'aircutter').flags.slicing = 1;
		this.modData('Moves', 'airslash').flags.slicing = 1;
		this.modData('Moves', 'aquacutter').flags.slicing = 1;
		this.modData('Moves', 'behemothblade').flags.slicing = 1;
		this.modData('Moves', 'bitterblade').flags.slicing = 1;
		this.modData('Moves', 'ceaselessedge').flags.slicing = 1;
		this.modData('Moves', 'crosspoison').flags.slicing = 1;
		this.modData('Moves', 'cut').flags.slicing = 1;
		this.modData('Moves', 'furycutter').flags.slicing = 1;
		this.modData('Moves', 'kowtowcleave').flags.slicing = 1;
		this.modData('Moves', 'nightslash').flags.slicing = 1;
		this.modData('Moves', 'populationbomb').flags.slicing = 1;
		this.modData('Moves', 'psychocut').flags.slicing = 1;
		this.modData('Moves', 'razorleaf').flags.slicing = 1;
		this.modData('Moves', 'razorshell').flags.slicing = 1;
		this.modData('Moves', 'sacredsword').flags.slicing = 1;
		this.modData('Moves', 'slash').flags.slicing = 1;
		this.modData('Moves', 'solarblade').flags.slicing = 1;
		this.modData('Moves', 'stoneaxe').flags.slicing = 1;
		this.modData('Moves', 'xscissor').flags.slicing = 1;
		
		this.modData('Moves', 'aircutter').flags.wind = 1;
		this.modData('Moves', 'bleakwindstorm').flags.wind = 1;
		this.modData('Moves', 'blizzard').flags.wind = 1;
		this.modData('Moves', 'fairywind').flags.wind = 1;
		this.modData('Moves', 'gust').flags.wind = 1;
		this.modData('Moves', 'heatwave').flags.wind = 1;
		this.modData('Moves', 'hurricane').flags.wind = 1;
		this.modData('Moves', 'icywind').flags.wind = 1;
		this.modData('Moves', 'petalblizzard').flags.wind = 1;
		this.modData('Moves', 'sandsearstorm').flags.wind = 1;
		this.modData('Moves', 'sandstorm').flags.wind = 1;
		this.modData('Moves', 'springtidestorm').flags.wind = 1;
		this.modData('Moves', 'tailwind').flags.wind = 1;
		this.modData('Moves', 'twister').flags.wind = 1;
		this.modData('Moves', 'whirlwind').flags.wind = 1;
		this.modData('Moves', 'wildboltstorm').flags.wind = 1;
		
		// Solrock
		this.modData("Learnsets", "solrock").learnset.shoreup = ["8L1"];
		this.modData("Learnsets", "solrock").learnset.bodypress = ["8L1"];
		this.modData("Learnsets", "solrock").learnset.superpower = ["8L1"];
		this.modData("Learnsets", "solrock").learnset.circlethrow = ["8L1"];
		this.modData("Learnsets", "solrock").learnset.uturn = ["8L1"];
		delete this.modData('Learnsets', 'solrock').learnset.psychic;
		delete this.modData('Learnsets', 'solrock').learnset.psyshock;
		delete this.modData('Learnsets', 'solrock').learnset.zenheadbutt;
		delete this.modData('Learnsets', 'solrock').learnset.hypnosis;
		delete this.modData('Learnsets', 'solrock').learnset.calmmind;
		delete this.modData('Learnsets', 'solrock').learnset.swordsdance;
		delete this.modData('Learnsets', 'solrock').learnset.willowisp;
		// Aegislash
		this.modData("Learnsets", "aegislash").learnset.painsplit = ["8L1"];
		this.modData("Learnsets", "aegislash").learnset.rapidspin = ["8L1"];
		this.modData("Learnsets", "aegislash").learnset.toxicspikes = ["8L1"];
		this.modData("Learnsets", "aegislash").learnset.corrosivegas = ["8L1"];
		this.modData("Learnsets", "aegislash").learnset.purify = ["8L1"];
		// Solgaleo
		this.modData("Learnsets", "solgaleo").learnset.aurasphere = ["8L1"];
		this.modData("Learnsets", "solgaleo").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "solgaleo").learnset.voltswitch = ["8L1"];
		delete this.modData('Learnsets', 'solgaleo').learnset.heatcrash;
		delete this.modData('Learnsets', 'solgaleo').learnset.flareblitz;
		delete this.modData('Learnsets', 'solgaleo').learnset.fireblast;
		delete this.modData('Learnsets', 'solgaleo').learnset.flamethrower;
		delete this.modData('Learnsets', 'solgaleo').learnset.mysticalfire;
		delete this.modData('Learnsets', 'solgaleo').learnset.knockoff;
		// Komala
		this.modData("Learnsets", "komala").learnset.slackoff = ["8L1"];
		this.modData("Learnsets", "komala").learnset.spiritbreak = ["8L1"];
		delete this.modData('Learnsets', 'komala').learnset.bulkup;
		delete this.modData('Learnsets', 'komala').learnset.swordsdance;
		delete this.modData('Learnsets', 'komala').learnset.wish;
		// Zangoose
		this.modData("Learnsets", "zangoose").learnset.pyroball = ["8L1"];
		delete this.modData('Learnsets', 'zangoose').learnset.closecombat;
		delete this.modData('Learnsets', 'zangoose').learnset.lowkick;
		// Chandelure
		this.modData("Learnsets", "chandelure").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "chandelure").learnset.blueflare = ["8L1"];
		delete this.modData('Learnsets', 'chandelure').learnset.calmmind;
		delete this.modData('Learnsets', 'chandelure').learnset.energyball;
		delete this.modData('Learnsets', 'chandelure').learnset.solarbeam;
		delete this.modData('Learnsets', 'litwick').learnset.calmmind;
		delete this.modData('Learnsets', 'litwick').learnset.energyball;
		delete this.modData('Learnsets', 'litwick').learnset.solarbeam;
		delete this.modData('Learnsets', 'lampent').learnset.calmmind;
		delete this.modData('Learnsets', 'lampent').learnset.energyball;
		delete this.modData('Learnsets', 'lampent').learnset.solarbeam;
		// Carracosta
		this.modData("Learnsets", "carracosta").learnset.darkpulse = ["8L1"];
		this.modData("Learnsets", "carracosta").learnset.spikes = ["8L1"];
		this.modData("Learnsets", "carracosta").learnset.obstruct = ["8L1"];
		delete this.modData('Learnsets', 'carracosta').learnset.ironhead;
		delete this.modData('Learnsets', 'carracosta').learnset.stoneedge;
		delete this.modData('Learnsets', 'carracosta').learnset.rockslide;
		delete this.modData('Learnsets', 'carracosta').learnset.stealthrock;
		delete this.modData('Learnsets', 'carracosta').learnset.rockblast;
		delete this.modData('Learnsets', 'carracosta').learnset.focusblast;
		delete this.modData('Learnsets', 'carracosta').learnset.earthpower;
		delete this.modData('Learnsets', 'carracosta').learnset.aquajet;
		delete this.modData('Learnsets', 'carracosta').learnset.ironhead;
		delete this.modData('Learnsets', 'tirtouga').learnset.stoneedge;
		delete this.modData('Learnsets', 'tirtouga').learnset.rockslide;
		delete this.modData('Learnsets', 'tirtouga').learnset.stealthrock;
		delete this.modData('Learnsets', 'tirtouga').learnset.rockblast;
		delete this.modData('Learnsets', 'tirtouga').learnset.focusblast;
		delete this.modData('Learnsets', 'tirtouga').learnset.earthpower;
		delete this.modData('Learnsets', 'tirtouga').learnset.aquajet;
		// Overqwil
		this.modData("Learnsets", "overqwil").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "overqwil").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "overqwil").learnset.darkpulse = ["8L1"];
		// Omastar
		this.modData("Learnsets", "omastar").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "omastar").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "omastar").learnset.bulldoze = ["8L1"];
		this.modData("Learnsets", "omastar").learnset.rapidspin = ["8L1"];
		this.modData("Learnsets", "omastar").learnset.shoreup = ["8L1"];
		delete this.modData('Learnsets', 'omastar').learnset.stealthrock;
		delete this.modData('Learnsets', 'omastar').learnset.toxicspikes;
		delete this.modData('Learnsets', 'omastar').learnset.rockblast;
		delete this.modData('Learnsets', 'omastar').learnset.stoneedge;
		delete this.modData('Learnsets', 'omastar').learnset.rockslide;
		delete this.modData('Learnsets', 'omastar').learnset.shellsmash;
		delete this.modData('Learnsets', 'omanyte').learnset.stealthrock;
		delete this.modData('Learnsets', 'omanyte').learnset.toxicspikes;
		delete this.modData('Learnsets', 'omanyte').learnset.rockblast;
		delete this.modData('Learnsets', 'omanyte').learnset.stoneedge;
		delete this.modData('Learnsets', 'omanyte').learnset.rockslide;
		delete this.modData('Learnsets', 'omanyte').learnset.shellsmash;
		// Pichu
		this.modData("Learnsets", "pichu").learnset.extremespeed = ["8L1"];
		this.modData("Learnsets", "pichu").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "pichu").learnset.rapidspin = ["8L1"];
		// Virizion
		this.modData("Learnsets", "virizion").learnset.anchorshot = ["8L1"];
		this.modData("Learnsets", "virizion").learnset.leechseed = ["8L1"];
		this.modData("Learnsets", "virizion").learnset.taunt = ["8L1"];
		this.modData("Learnsets", "virizion").learnset.hornleech = ["8L1"];
		delete this.modData('Learnsets', 'virizion').learnset.closecombat;
		// Eiscue
		this.modData("Learnsets", "eiscue").learnset.flashcannon = ["8L1"];
		this.modData("Learnsets", "eiscue").learnset.nastyplot = ["8L1"];
		this.modData("Learnsets", "eiscue").learnset.knockoff = ["8L1"];
		// Eiscue-Noice
		// Sandy Shocks
		this.modData("Learnsets", "sandyshocks").learnset.thousandwaves = ["8L1"];
		// Lumineon
		this.modData("Learnsets", "lumineon").learnset.roost = ["8L1"];
		this.modData("Learnsets", "lumineon").learnset.whirlwind = ["8L1"];
		// Talonflame
		this.modData("Learnsets", "talonflame").learnset.lavaplume = ["8L1"];
		delete this.modData('Learnsets', 'talonflame').learnset.uturn;
		delete this.modData('Learnsets', 'fletchinder').learnset.uturn;
		delete this.modData('Learnsets', 'fletchling').learnset.uturn;
		
		// Onix
		this.modData("Learnsets", "onix").learnset.clangingscales = ["8L1"];
		this.modData("Learnsets", "onix").learnset.dracometeor = ["8L1"];
		this.modData("Learnsets", "onix").learnset.outrage = ["8L1"];
		this.modData("Learnsets", "onix").learnset.powergem = ["8L1"];
		this.modData("Learnsets", "onix").learnset.scaleshot = ["8L1"];
		this.modData("Learnsets", "onix").learnset.uturn = ["8L1"];
		// Chi-Yu
		this.modData("Learnsets", "chiyu").learnset.recover = ["8L1"];
		this.modData("Learnsets", "chiyu").learnset.uturn = ["8L1"];
		// Dondozo
		this.modData("Learnsets", "dondozo").learnset.dragontail = ["8L1"];
		this.modData("Learnsets", "dondozo").learnset.dracometeor = ["8L1"];
		this.modData("Learnsets", "dondozo").learnset.dragonpulse = ["8L1"];
		this.modData("Learnsets", "dondozo").learnset.swordsdance = ["8L1"];
		this.modData("Learnsets", "dondozo").learnset.superpower = ["8L1"];
		this.modData("Learnsets", "dondozo").learnset.stoneedge = ["8L1"];
		this.modData("Learnsets", "dondozo").learnset.ironhead = ["8L1"];
		this.modData("Learnsets", "dondozo").learnset.flipturn = ["8L1"];
	}
};