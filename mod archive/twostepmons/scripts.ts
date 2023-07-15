
export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	teambuilderConfig: {
		excludeStandardTiers: true,
	},
	init(){ 
		// Sharpedo
		this.modData("Learnsets", "sharpedo").learnset.swordsdance = ["8L1"];
		// Eelektross
		this.modData("Learnsets", "eelektross").learnset.gutpunch = ["8L1"];
		this.modData("Learnsets", "eelektross").learnset.recover = ["8L1"];
		delete this.modData('Learnsets', 'eelektross').learnset.brickbreak;
		delete this.modData('Learnsets', 'eelektross').learnset.drainpunch;
		// Sableye
		this.modData("Learnsets", "sableye").learnset.aurasphere = ["8L1"];
		this.modData("Learnsets", "sableye").learnset.focusblast = ["8L1"];
		this.modData("Learnsets", "sableye").learnset.bindingvow = ["8L1"];
		delete this.modData('Learnsets', 'sableye').learnset.recover;
		delete this.modData('Learnsets', 'sableye').learnset.moonlight;
		delete this.modData('Learnsets', 'sableye').learnset.nastyplot;
		// Rotom
		this.modData("Learnsets", "rotom").learnset.souldrain = ["8L1"];
		this.modData("Learnsets", "rotom").learnset.uturn = ["8L1"];
		delete this.modData('Learnsets', 'rotom').learnset.nastyplot;
		// Porygon
		this.modData("Learnsets", "porygon").learnset.voltswitch = ["8L1"];
		this.modData("Learnsets", "porygon").learnset.stealthrock = ["8L1"];
		// Tentacruel
		this.modData("Learnsets", "tentacruel").learnset.witherdance = ["8L1"];
		this.modData("Learnsets", "tentacruel").learnset.flipturn = ["8L1"];
		// Rillaboom
		this.modData("Learnsets", "rillaboom").learnset.junglefang = ["8L1"];
		this.modData("Learnsets", "rillaboom").learnset.junglehealing = ["8L1"];
		delete this.modData('Learnsets', 'rillaboom').learnset.swordsdance;
		delete this.modData('Learnsets', 'rillaboom').learnset.superpower;
		delete this.modData('Learnsets', 'rillaboom').learnset.hammerarm;
		delete this.modData('Learnsets', 'rillaboom').learnset.leechseed;
		// Nihilego
		this.modData("Learnsets", "nihilego").learnset.strengthsap = ["8L1"];
		this.modData("Learnsets", "nihilego").learnset.flashcannon = ["8L1"];
		this.modData("Learnsets", "nihilego").learnset.moonblast = ["8L1"];
		// Oricorio
		this.modData("Learnsets", "oricorio").learnset.flamethrower = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.fireblast = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.firespin = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.petaldance = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.focusblast = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.vacuumwave = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.closecombat = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.lowsweep = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.forcepalm = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.counter = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.reversal = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.quickguard = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.shadowball = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.psyshock = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.thunderbolt = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.darkpulse = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.dazzlinggleam = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.flashcannon = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.hypervoice = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.nastyplot = ["8L1"];
		// Archeops
		this.modData("Learnsets", "archeops").learnset.dustdevil = ["8L1"];
		this.modData("Learnsets", "archeops").learnset.closecombat = ["8L1"];
		this.modData("Learnsets", "archeops").learnset.aurasphere = ["8L1"];
		// Camerupt
		this.modData("Learnsets", "camerupt").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "camerupt").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "camerupt").learnset.slackoff = ["8L1"];
		// Carkol
		this.modData("Learnsets", "carkol").learnset.hypervoice = ["8L1"];
		this.modData("Learnsets", "carkol").learnset.earthpower = ["8L1"];
		// Metagross
		this.modData("Learnsets", "metagross").learnset.neurohammer = ["8L1"];
		// Zygarde
		this.modData("Learnsets", "zygarde").learnset.leechlife = ["8L1"];
		this.modData("Learnsets", "zygarde").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "zygarde").learnset.bugbuzz = ["8L1"];
		this.modData("Learnsets", "zygarde").learnset.agility = ["8L1"];
		delete this.modData('Learnsets', 'zygarde').learnset.breakingswipe;
		delete this.modData('Learnsets', 'zygarde').learnset.coreenforcer;
		delete this.modData('Learnsets', 'zygarde').learnset.dracometeor;
		delete this.modData('Learnsets', 'zygarde').learnset.dragonbreath;
		delete this.modData('Learnsets', 'zygarde').learnset.dragondance;
		delete this.modData('Learnsets', 'zygarde').learnset.dragonpulse;
		delete this.modData('Learnsets', 'zygarde').learnset.dragontail;
		delete this.modData('Learnsets', 'zygarde').learnset.outrage;
		delete this.modData('Learnsets', 'zygarde').learnset.scaleshot;
		// Groudon
		this.modData("Learnsets", "groudon").learnset.steamchute = ["8L1"];
		this.modData("Learnsets", "groudon").learnset.scald = ["8L1"];
		this.modData("Learnsets", "groudon").learnset.surf = ["8L1"];
		this.modData("Learnsets", "groudon").learnset.hydropump = ["8L1"];
		this.modData("Learnsets", "groudon").learnset.weatherball = ["8L1"];
		delete this.modData('Learnsets', 'groudon').learnset.heatcrash;
		delete this.modData('Learnsets', 'groudon').learnset.firepunch;
		delete this.modData('Learnsets', 'groudon').learnset.overheat;
		delete this.modData('Learnsets', 'groudon').learnset.solarbeam;
	},
};

