export const Scripts: ModdedBattleScriptsData = {
	init: function () {
		/*Template:
		this.modData('Learnsets', 'pokemon').learnset.move = ['8L1'];
		delete this.modData('Learnsets', 'pokemon').learnset.move;*/
		
		this.modData('Learnsets', 'cleffa').learnset.teleport = ['8L1'];
		this.modData('Learnsets', 'cleffa').learnset.moonblast = ['8L1'];
		
		this.modData('Learnsets', 'igglybuff').learnset.acrobatics = ['8L1'];
		this.modData('Learnsets', 'igglybuff').learnset.gust = ['8L1'];
		this.modData('Learnsets', 'igglybuff').learnset.hurricane = ['8L1'];
		this.modData('Learnsets', 'igglybuff').learnset.airslash = ['8L1'];
		this.modData('Learnsets', 'igglybuff').learnset.aircutter = ['8L1'];
		this.modData('Learnsets', 'igglybuff').learnset.knockoff = ['8L1'];
		this.modData('Learnsets', 'igglybuff').learnset.moonblast = ['8L1'];
		
		this.modData('Learnsets', 'tyrogue').learnset.thunderpunch = ['8L1'];
		this.modData('Learnsets', 'tyrogue').learnset.knockoff = ['8L1'];
		
		delete this.modData('Learnsets', 'magby').learnset.bellydrum;
		
		this.modData('Learnsets', 'azurill').learnset.playrough = ['8L1'];
		delete this.modData('Learnsets', 'azurill').learnset.aquajet;
		
		this.modData('Learnsets', 'budew').learnset.toxicspikes = ['8L1'];
		this.modData('Learnsets', 'budew').learnset.stickyweb = ['8L1'];
		
		this.modData('Learnsets', 'bonsly').learnset.stoneedge = ['8L1'];
		
		this.modData('Learnsets', 'happiny').learnset.softboiled = ['8L1'];
		this.modData('Learnsets', 'happiny').learnset.stealthrock = ['8L1'];
		
		this.modData('Learnsets', 'mantyke').learnset.defog = ['8L1'];
		this.modData('Learnsets', 'mantyke').learnset.roost = ['8L1'];
		this.modData('Learnsets', 'mantyke').learnset.flipturn = ['8L1'];
		
		this.modData("Learnsets", "toxel").learnset.acid = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.acidspray = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.attract = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.belch = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.charge = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.discharge = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.eerieimpulse = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.electroball = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.encore = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.endeavor = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.endure = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.facade = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.flail = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.fling = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.growl = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.gunkshot = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.hex = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.hypervoice = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.leer = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.metalsound = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.nuzzle = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.payback = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.poisonjab = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.poweruppunch = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.protect = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.rapidspin = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.rest = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.round = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.scaryface = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.screech = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.shockwave = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.slackoff = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.sleeptalk = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.sludgebomb = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.sludgewave = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.snarl = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.snore = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.spark = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.substitute = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.swagger = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.swift = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.taunt = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.tearfullook = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.throatchop = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.thunder = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.thunderpunch = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.thundershock = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.thunderwave = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.thunderbolt = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.toxic = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.uproar = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.venoshock = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.voltswitch = ["8L1"];
		this.modData("Learnsets", "toxel").learnset.wildcharge = ["8L1"];
	}
};