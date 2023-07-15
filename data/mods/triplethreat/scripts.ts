export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	inherit: 'gen9',
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['TT'],
		customDoublesTiers: ['DTT'],
	},
	
	init: function () {
		// roserade
		this.modData("Learnsets", "roserade").learnset.foulplay = ["9L1"];
		this.modData("Learnsets", "roserade").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "roserade").learnset.darkpulse = ["9L1"];
		this.modData("Learnsets", "roserade").learnset.taunt = ["9L1"];
		this.modData("Learnsets", "roserade").learnset.faketears = ["9L1"];
		this.modData("Learnsets", "roserade").learnset.memento = ["9L1"];
		this.modData("Learnsets", "roserade").learnset.playrough = ["9L1"];
		this.modData("Learnsets", "roserade").learnset.moonblast = ["9L1"];
		this.modData("Learnsets", "roserade").learnset.moonlight = ["9L1"];
		this.modData("Learnsets", "roserade").learnset.mistyterrain = ["9L1"];
		this.modData("Learnsets", "roserade").learnset.aromaticmist = ["9L1"];
		this.modData("Learnsets", "roserade").learnset.decorate = ["9L1"];
		delete this.modData('Learnsets', 'roserade').learnset.sleeppowder;
		delete this.modData('Learnsets', 'roserade').learnset.poisonjab;
		delete this.modData('Learnsets', 'roserade').learnset.toxicspikes;
		delete this.modData('Learnsets', 'roserade').learnset.poisonsting;
		delete this.modData('Learnsets', 'roserade').learnset.venomdrench;
		delete this.modData('Learnsets', 'roserade').learnset.venoshock;
		
		// darmanitanzen
		this.modData("Learnsets", "darmanitanzen").learnset.psyshock = ["9L1"];
		this.modData("Learnsets", "darmanitanzen").learnset.barrier = ["9L1"];
		this.modData("Learnsets", "darmanitanzen").learnset.gravity = ["9L1"];
		this.modData("Learnsets", "darmanitanzen").learnset.healingwish = ["9L1"];
		this.modData("Learnsets", "darmanitanzen").learnset.heartswap = ["9L1"];
		this.modData("Learnsets", "darmanitanzen").learnset.lightscreen = ["9L1"];
		this.modData("Learnsets", "darmanitanzen").learnset.meditate = ["9L1"];
		this.modData("Learnsets", "darmanitanzen").learnset.miracleeye = ["9L1"];
		this.modData("Learnsets", "darmanitanzen").learnset.psychicterrain = ["9L1"];
		this.modData("Learnsets", "darmanitanzen").learnset.psychoshift = ["9L1"];
		this.modData("Learnsets", "darmanitanzen").learnset.reflect = ["9L1"];
		this.modData("Learnsets", "darmanitanzen").learnset.skillswap = ["9L1"];
		this.modData("Learnsets", "darmanitanzen").learnset.teleport = ["9L1"];
		this.modData("Learnsets", "darmanitanzen").learnset.trickroom = ["9L1"];
		this.modData("Learnsets", "darmanitanzen").learnset.aurasphere = ["9L1"];
		delete this.modData('Learnsets', 'darmanitanzen').learnset.brickbreak;
		delete this.modData('Learnsets', 'darmanitanzen').learnset.firefang;
		delete this.modData('Learnsets', 'darmanitanzen').learnset.firepunch;
		delete this.modData('Learnsets', 'darmanitanzen').learnset.flamecharge;
		delete this.modData('Learnsets', 'darmanitanzen').learnset.hammerarm;
		delete this.modData('Learnsets', 'darmanitanzen').learnset.ironhead;
		delete this.modData('Learnsets', 'darmanitanzen').learnset.lashout;
		delete this.modData('Learnsets', 'darmanitanzen').learnset.poweruppunch;
		delete this.modData('Learnsets', 'darmanitanzen').learnset.rockslide;
		delete this.modData('Learnsets', 'darmanitanzen').learnset.stoneedge;
		delete this.modData('Learnsets', 'darmanitanzen').learnset.dig;
		delete this.modData('Learnsets', 'darmanitanzen').learnset.megakick;
		delete this.modData('Learnsets', 'darmanitanzen').learnset.megapunch;
		
		//grafaiai
		this.modData("Learnsets", "grafaiai").learnset.suckerpunch = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.nightslash = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.entrainment = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.beatup = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.toxicspikes = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.aerialace = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.hurricane = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.defog = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.tailwind = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.gust = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.darkpulse = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.airslash = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.bounce = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.skyattack = ["9L1"];
		
		//iron jugulis
		this.modData("Learnsets", "grafaiai").learnset.dracometeor = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.dragonpulse = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.dragondance = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.roost = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.toxic = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.defog = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.nastyplot = ["9L1"];
		this.modData("Learnsets", "grafaiai").learnset.dragontail = ["9L1"];
	},
};