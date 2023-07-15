export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['Waght'],
		customDoublesTiers: ['DoublesWaght'],
	},
	
	init: function () {
		// Rhydon
		this.modData("Learnsets", "rhydon").learnset.thunderwave = ["8L1"];
		this.modData("Learnsets", "rhydon").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "rhydon").learnset.encore = ["8L1"];
		this.modData("Learnsets", "rhydon").learnset.powerswap = ["8L1"];
		this.modData("Learnsets", "rhydon").learnset.leechseed = ["8L1"];
		delete this.modData('Learnsets', 'rhydon').learnset.thunderbolt;
		delete this.modData('Learnsets', 'rhydon').learnset.thunder;
		delete this.modData('Learnsets', 'rhydon').learnset.icebeam;
		delete this.modData('Learnsets', 'rhydon').learnset.blizzard;
		delete this.modData('Learnsets', 'rhydon').learnset.bodypress;
		
		// Ivysaur
		this.modData("Learnsets", "ivysaur").learnset.dracometeor = ["8L1"];
		this.modData("Learnsets", "ivysaur").learnset.dragonpulse = ["8L1"];
		this.modData("Learnsets", "ivysaur").learnset.flareblitz = ["8L1"];
		this.modData("Learnsets", "ivysaur").learnset.dragonclaw = ["8L1"];
		this.modData("Learnsets", "ivysaur").learnset.dragonhammer = ["8L1"];
		this.modData("Learnsets", "ivysaur").learnset.dragondance = ["8L1"];
		delete this.modData('Learnsets', 'ivysaur').learnset.sludgebomb;
		delete this.modData('Learnsets', 'ivysaur').learnset.weatherball;
		
		// Blaziken
		this.modData("Learnsets", "blaziken").learnset.roost = ["8L1"];
		this.modData("Learnsets", "blaziken").learnset.oblivionwing = ["8L1"];
		this.modData("Learnsets", "blaziken").learnset.beakblast = ["8L1"];
		this.modData("Learnsets", "blaziken").learnset.machpunch = ["8L1"];
		
		// Barboach
		this.modData("Learnsets", "barboach").learnset.endeavor = ["8L1"];
		this.modData("Learnsets", "barboach").learnset.pursuit = ["8L1"];
		
		// Megaracross
		this.modData("Learnsets", "megaracross").learnset.bugbuzz = ["8L1"];
		delete this.modData('Learnsets', 'megaracross').learnset.earthquake;
		delete this.modData('Learnsets', 'megaracross').learnset.knockoff;
		delete this.modData('Learnsets', 'megaracross').learnset.highhorsepower;
		delete this.modData('Learnsets', 'megaracross').learnset.bulldoze;
		delete this.modData('Learnsets', 'megaracross').learnset.throatchop;
		delete this.modData('Learnsets', 'megaracross').learnset.nightslash;
		delete this.modData('Learnsets', 'megaracross').learnset.brutalswing;
		delete this.modData('Learnsets', 'megaracross').learnset.assurance;
		delete this.modData('Learnsets', 'megaracross').learnset.thief;
		
		// Chandelure
		this.modData("Learnsets", "chandelure").learnset.thunderbolt = ["8L1"];
		this.modData("Learnsets", "chandelure").learnset.discharge = ["8L1"];
		this.modData("Learnsets", "chandelure").learnset.voltswitch = ["8L1"];
		this.modData("Learnsets", "chandelure").learnset.thunderwave = ["8L1"];
		this.modData("Learnsets", "chandelure").learnset.moongeistbeam = ["8L1"];
		this.modData("Learnsets", "chandelure").learnset.recover = ["8L1"];
		delete this.modData('Learnsets', 'chandelure').learnset.fireblast;
		delete this.modData('Learnsets', 'chandelure').learnset.overheat;
		delete this.modData('Learnsets', 'chandelure').learnset.burningjealousy;
		delete this.modData('Learnsets', 'chandelure').learnset.inferno;
		delete this.modData('Learnsets', 'chandelure').learnset.incinerate;
		
		// Nickit
		this.modData("Learnsets", "nickit").learnset.purify = ["8L1"];
		this.modData("Learnsets", "nickit").learnset.switcheroo = ["8L1"];
		this.modData("Learnsets", "nickit").learnset.gastroacid = ["8L1"];
		this.modData("Learnsets", "nickit").learnset.disable = ["8L1"];
		this.modData("Learnsets", "nickit").learnset.defog = ["8L1"];
		this.modData("Learnsets", "nickit").learnset.earthpower = ["8L1"];
		this.modData("Learnsets", "nickit").learnset.toxic = ["8L1"];
		this.modData("Learnsets", "nickit").learnset.charm = ["8L1"];
		this.modData("Learnsets", "nickit").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "nickit").learnset.rapidspin = ["8L1"];
		this.modData("Learnsets", "nickit").learnset.soak = ["8L1"];
		this.modData("Learnsets", "nickit").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "nickit").learnset.duststorm = ["8L1"];
	},
};