import {Dex} from '../../../sim/dex';
export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['Idiom', 'Geekmicro'],
	},	
	
	init() {
				// Magcargo
		// Drampa
		// Stunfisk
		// Gogoat
		this.modData("Learnsets", "gogoat").learnset.headcharge = ["9L1"];
		this.modData("Learnsets", "gogoat").learnset.slam = ["9L1"];
		// Klefki
		this.modData("Learnsets", "klefki").learnset.jarringjingle = ["9L1"];
		this.modData("Learnsets", "klefki").learnset.psychicnoise = ["9L1"];
		// Garbodor
		this.modData("Learnsets", "garbodor").learnset.shoreup = ["9L1"];
		// Froslass
		// Houndoom
		// Lunatone
		this.modData("Learnsets", "lunatone").learnset.lunarblessing = ["9L1"];
		this.modData("Learnsets", "lunatone").learnset.lunardance = ["9L1"];
		// Ledian
		// Grumpig
		this.modData("Learnsets", "grumpig").learnset.teeterdance = ["9L1"];
		// Whiscash
		this.modData("Learnsets", "whiscash").learnset.flipturn = ["9L1"];
		this.modData("Learnsets", "whiscash").learnset.headlongrush = ["9L1"];
		this.modData("Learnsets", "whiscash").learnset.tripledive = ["9L1"];
		// Carnivine
		this.modData("Learnsets", "carnivine").learnset.digestion = ["9L1"];
		this.modData("Learnsets", "carnivine").learnset.jawlock = ["9L1"];
		this.modData("Learnsets", "carnivine").learnset.snaptrap = ["9L1"];
		// Ninetales
		this.modData("Learnsets", "ninetales").learnset.curse = ["9L1"];
		this.modData("Learnsets", "ninetales").learnset.destinybond = ["9L1"];
		this.modData("Learnsets", "ninetales").learnset.bittermalice = ["9L1"];
		// Granbull
		// Klinklang
		this.modData("Learnsets", "klinklang").learnset.zingzap = ["9L1"];
		this.modData("Learnsets", "klinklang").learnset.spark = ["9L1"];
		// Flapple
		// Seviper
		this.modData("Learnsets", "seviper").learnset.crosspoison = ["9L1"];
		this.modData("Learnsets", "seviper").learnset.slash = ["9L1"];
		this.modData("Learnsets", "seviper").learnset.smartstrike = ["9L1"];
		// Farfetchd
		this.modData("Learnsets", "farfetchd").learnset.sacredswprd = ["9L1"];
		// Miltank
		// Armaldo
		this.modData("Learnsets", "armaldo").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "armaldo").learnset.ironhead = ["9L1"];
		this.modData("Learnsets", "armaldo").learnset.smartstrike = ["9L1"];
		// Chimecho
		this.modData("Learnsets", "chimecho").learnset.defog = ["9L1"];
		// Gigalith
		this.modData("Learnsets", "gigalith").learnset.synthesis = ["9L1"];
		this.modData("Learnsets", "gigalith").learnset.energyball = ["9L1"];
		this.modData("Learnsets", "gigalith").learnset.growth = ["9L1"];
		this.modData("Learnsets", "gigalith").learnset.solarblade = ["9L1"];
		// Aurorus
		this.modData("Learnsets", "aurorus").learnset.dracometeor = ["9L1"];
		this.modData("Learnsets", "aurorus").learnset.dragonpulse = ["9L1"];
		this.modData("Learnsets", "aurorus").learnset.dragonbreath = ["9L1"];

	},
};