import {Dex, toID} from '../../../sim/dex';
export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
	},
	
	init() {
		// Groudon
		this.modData("Learnsets", "groudon").learnset.firepledge = ["9L1"];
		this.modData("Learnsets", "groudon").learnset.weatherball = ["9L1"];
		this.modData("Learnsets", "groudon").learnset.trickroom = ["9L1"];
		this.modData("Learnsets", "groudon").learnset.setdrought = ["9L1"];
		this.modData("Learnsets", "groudon").learnset.setduststorm = ["9L1"];
		// Kyogre
		this.modData("Learnsets", "kyogre").learnset.iceball = ["9L1"];
		this.modData("Learnsets", "kyogre").learnset.waterpledge = ["9L1"];
		this.modData("Learnsets", "kyogre").learnset.weatherball = ["9L1"];
		this.modData("Learnsets", "kyogre").learnset.trickroom = ["9L1"];
		this.modData("Learnsets", "kyogre").learnset.setflashflood = ["9L1"];
		this.modData("Learnsets", "kyogre").learnset.setwhiteout = ["9L1"];
		// Rayquaza
		this.modData("Learnsets", "rayquaza").learnset.willowisp = ["9L1"];
		this.modData("Learnsets", "rayquaza").learnset.dragonrage = ["9L1"];
		this.modData("Learnsets", "rayquaza").learnset.coreenforcer = ["9L1"];
		this.modData("Learnsets", "rayquaza").learnset.roost = ["9L1"];
		this.modData("Learnsets", "rayquaza").learnset.setlotsofreallysmalldragons = ["9L1"];
		this.modData("Learnsets", "rayquaza").learnset.setdeltastream = ["9L1"];
		delete this.modData('Learnsets', 'rayquaza').learnset.vcreate;
		delete this.modData('Learnsets', 'rayquaza').learnset.dragondance;
		// Castform
		this.modData("Learnsets", "castform").learnset.bugbuzz = ["9L1"];
		this.modData("Learnsets", "castform").learnset.darkpulse = ["9L1"];
		this.modData("Learnsets", "castform").learnset.coreenforcer = ["9L1"];
		this.modData("Learnsets", "castform").learnset.moonblast = ["9L1"];
		this.modData("Learnsets", "castform").learnset.aurasphere = ["9L1"];
		this.modData("Learnsets", "castform").learnset.earthpower = ["9L1"];
		this.modData("Learnsets", "castform").learnset.sludgebomb = ["9L1"];
		this.modData("Learnsets", "castform").learnset.psychic = ["9L1"];
		this.modData("Learnsets", "castform").learnset.meteorbeam = ["9L1"];
		this.modData("Learnsets", "castform").learnset.flashcannon = ["9L1"];
		this.modData("Learnsets", "castform").learnset.twineedle = ["9L1"];
		this.modData("Learnsets", "castform").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "castform").learnset.dragonrage = ["9L1"];
		this.modData("Learnsets", "castform").learnset.charge = ["9L1"];
		this.modData("Learnsets", "castform").learnset.mistyexplosion = ["9L1"];
		this.modData("Learnsets", "castform").learnset.upperhand = ["9L1"];
		this.modData("Learnsets", "castform").learnset.tailwind = ["9L1"];
		this.modData("Learnsets", "castform").learnset.destinybond = ["9L1"];
		this.modData("Learnsets", "castform").learnset.grasspledge = ["9L1"];
		this.modData("Learnsets", "castform").learnset.sandtomb = ["9L1"];
		this.modData("Learnsets", "castform").learnset.iceball = ["9L1"];
		this.modData("Learnsets", "castform").learnset.metronome = ["9L1"];
		this.modData("Learnsets", "castform").learnset.belch = ["9L1"];
		this.modData("Learnsets", "castform").learnset.amnesia = ["9L1"];
		this.modData("Learnsets", "castform").learnset.ancientpower = ["9L1"];
		this.modData("Learnsets", "castform").learnset.steelbeam = ["9L1"];
		this.modData("Learnsets", "castform").learnset.waterpledge = ["9L1"];
		this.modData("Learnsets", "castform").learnset.settheswarm = ["9L1"];
		this.modData("Learnsets", "castform").learnset.settwilightzone = ["9L1"];
		this.modData("Learnsets", "castform").learnset.setlotsofreallysmalldragons = ["9L1"];
		this.modData("Learnsets", "castform").learnset.setthunderstorm = ["9L1"];
		this.modData("Learnsets", "castform").learnset.setfable = ["9L1"];
		this.modData("Learnsets", "castform").learnset.setcolosseum = ["9L1"];
		this.modData("Learnsets", "castform").learnset.setdrought = ["9L1"];
		this.modData("Learnsets", "castform").learnset.setdeltastream = ["9L1"];
		this.modData("Learnsets", "castform").learnset.setthevoices = ["9L1"];
		this.modData("Learnsets", "castform").learnset.setovergrowth = ["9L1"];
		this.modData("Learnsets", "castform").learnset.setduststorm = ["9L1"];
		this.modData("Learnsets", "castform").learnset.setwhiteout = ["9L1"];
		this.modData("Learnsets", "castform").learnset.setmetronomebattle = ["9L1"];
		this.modData("Learnsets", "castform").learnset.setshitstorm = ["9L1"];
		this.modData("Learnsets", "castform").learnset.setmindfuck = ["9L1"];
		this.modData("Learnsets", "castform").learnset.setlandslide = ["9L1"];
		this.modData("Learnsets", "castform").learnset.settimewarp = ["9L1"];
		this.modData("Learnsets", "castform").learnset.setflashflood = ["9L1"];
		// Doublade
		this.modData("Learnsets", "doublade").learnset.spectralthief = ["9L1"];
		this.modData("Learnsets", "doublade").learnset.behemothblade = ["9L1"];
		this.modData("Learnsets", "doublade").learnset.settimewarp = ["9L1"];
		this.modData("Learnsets", "doublade").learnset.setthevoices = ["9L1"];
		// Lugia
		this.modData("Learnsets", "lugia").learnset.esperwing = ["9L1"];
		this.modData("Learnsets", "lugia").learnset.heartswap = ["9L1"];
		this.modData("Learnsets", "lugia").learnset.speedswap = ["9L1"];
		this.modData("Learnsets", "lugia").learnset.healblock = ["9L1"];
		this.modData("Learnsets", "lugia").learnset.setdeltastream = ["9L1"];
		this.modData("Learnsets", "lugia").learnset.setmindfuck = ["9L1"];
		this.modData("Learnsets", "lugia").learnset.setflashflood = ["9L1"];
		// Zapdos
		this.modData("Learnsets", "zapdos").learnset.setthunderstorm = ["9L1"];
		this.modData("Learnsets", "zapdos").learnset.setdeltastream = ["9L1"];
		this.modData("Learnsets", "zapdos").learnset.setflashflood = ["9L1"];
		// Articuno
		this.modData("Learnsets", "articuno").learnset.freezyfrost = ["9L1"];
		this.modData("Learnsets", "articuno").learnset.setdeltastream = ["9L1"];
		this.modData("Learnsets", "articuno").learnset.setwhiteout = ["9L1"];
		// Archaludon
		this.modData("Learnsets", "archaludon").learnset.autotomize = ["9L1"];
		this.modData("Learnsets", "archaludon").learnset.charge = ["9L1"];
		this.modData("Learnsets", "archaludon").learnset.discharge = ["9L1"];
		this.modData("Learnsets", "archaludon").learnset.voltswitch = ["9L1"];
		this.modData("Learnsets", "archaludon").learnset.earthpower = ["9L1"];
		this.modData("Learnsets", "archaludon").learnset.setlotsofreallysmalldragons = ["9L1"];
		this.modData("Learnsets", "archaludon").learnset.setthunderstorm = ["9L1"];
		// Dialga
		this.modData("Learnsets", "dialga").learnset.dragonrage = ["9L1"];
		this.modData("Learnsets", "dialga").learnset.coreenforcer = ["9L1"];
		this.modData("Learnsets", "dialga").learnset.gyroball = ["9L1"];
		this.modData("Learnsets", "dialga").learnset.setlotsofreallysmalldragons = ["9L1"];
		this.modData("Learnsets", "dialga").learnset.settimewarp = ["9L1"];
		// Dragonair
		this.modData("Learnsets", "dragonair").learnset.scald = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.flipturn = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.recover = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.rapidspin = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.willowisp = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.waterpledge = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.firepledge = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.settheswarm = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.settwilightzone = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.setlotsofreallysmalldragons = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.setthunderstorm = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.setfable = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.setcolosseum = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.setdrought = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.setdeltastream = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.setthevoices = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.setovergrowth = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.setduststorm = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.setwhiteout = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.setmetronomebattle = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.setshitstorm = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.setmindfuck = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.setlandslide = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.settimewarp = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.setflashflood = ["9L1"];
		// Flygon
		this.modData("Learnsets", "flygon").learnset.sandsearstorm = ["9L1"];
		this.modData("Learnsets", "flygon").learnset.dragonrage = ["9L1"];
		this.modData("Learnsets", "flygon").learnset.clangingscales = ["9L1"];
		this.modData("Learnsets", "flygon").learnset.coreenforcer = ["9L1"];
		this.modData("Learnsets", "flygon").learnset.setlotsofreallysmalldragons = ["9L1"];
		this.modData("Learnsets", "flygon").learnset.setduststorm = ["9L1"];
		// Torkoal
		this.modData("Learnsets", "torkoal").learnset.firepledge = ["9L1"];
		this.modData("Learnsets", "torkoal").learnset.gunkshot = ["9L1"];
		this.modData("Learnsets", "torkoal").learnset.belch = ["9L1"];
		this.modData("Learnsets", "torkoal").learnset.sludgewave = ["9L1"];
		this.modData("Learnsets", "torkoal").learnset.sludge = ["9L1"];
		this.modData("Learnsets", "torkoal").learnset.poisongas = ["9L1"];
		this.modData("Learnsets", "torkoal").learnset.corrosivegas = ["9L1"];
		this.modData("Learnsets", "torkoal").learnset.setdrought = ["9L1"];
		this.modData("Learnsets", "torkoal").learnset.setshitstorm = ["9L1"];
		// Ninetales
		this.modData("Learnsets", "ninetales").learnset.firepledge = ["9L1"];
		this.modData("Learnsets", "ninetales").learnset.torchsong = ["9L1"];
		this.modData("Learnsets", "ninetales").learnset.boomburst = ["9L1"];
		this.modData("Learnsets", "ninetales").learnset.moonlight = ["9L1"];
		this.modData("Learnsets", "ninetales").learnset.poltergeist = ["9L1"];
		this.modData("Learnsets", "ninetales").learnset.shadowsneak = ["9L1"];
		this.modData("Learnsets", "ninetales").learnset.infernalparade = ["9L1"];
		this.modData("Learnsets", "ninetales").learnset.setdrought = ["9L1"];
		this.modData("Learnsets", "ninetales").learnset.setthevoices = ["9L1"];
		delete this.modData('Learnsets', 'ninetales').learnset.nastyplot;
		delete this.modData('Learnsets', 'vulpix').learnset.nastyplot;
		// Charizard
		this.modData("Learnsets", "charizard").learnset.firepledge = ["9L1"];
		this.modData("Learnsets", "charizard").learnset.dracometeor = ["9L1"];
		this.modData("Learnsets", "charizard").learnset.dragonhammer = ["9L1"];
		this.modData("Learnsets", "charizard").learnset.setlotsofreallysmalldragons = ["9L1"];
		this.modData("Learnsets", "charizard").learnset.setdrought = ["9L1"];
		this.modData("Learnsets", "charizard").learnset.setdeltastream = ["9L1"];
		// Pelipper
		this.modData("Learnsets", "pelipper").learnset.waterpledge = ["9L1"];
		this.modData("Learnsets", "pelipper").learnset.setdeltastream = ["9L1"];
		this.modData("Learnsets", "pelipper").learnset.setflashflood = ["9L1"];
		// Politoed
		this.modData("Learnsets", "politoed").learnset.flipturn = ["9L1"];
		this.modData("Learnsets", "politoed").learnset.wavecrash = ["9L1"];
		this.modData("Learnsets", "politoed").learnset.aquajet = ["9L1"];
		this.modData("Learnsets", "politoed").learnset.swordsdance = ["9L1"];
		this.modData("Learnsets", "politoed").learnset.waterpledge = ["9L1"];
		this.modData("Learnsets", "politoed").learnset.recover = ["9L1"];
		this.modData("Learnsets", "politoed").learnset.setmetronomebattle = ["9L1"];
		this.modData("Learnsets", "politoed").learnset.setflashflood = ["9L1"];
		// Tyranitar
		this.modData("Learnsets", "tyranitar").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "tyranitar").learnset.settwilightzone = ["9L1"];
		this.modData("Learnsets", "tyranitar").learnset.setduststorm = ["9L1"];
		this.modData("Learnsets", "tyranitar").learnset.setlandslide = ["9L1"];
		// Hippowdon
		this.modData("Learnsets", "hippowdon").learnset.upperhand = ["9L1"];
		this.modData("Learnsets", "hippowdon").learnset.setduststorm = ["9L1"];
		this.modData("Learnsets", "hippowdon").learnset.setcolosseum = ["9L1"];
		// Abomasnow
		this.modData("Learnsets", "abomasnow").learnset.grasspledge = ["9L1"];
		this.modData("Learnsets", "abomasnow").learnset.sleeppowder = ["9L1"];
		this.modData("Learnsets", "abomasnow").learnset.iceball = ["9L1"];
		this.modData("Learnsets", "abomasnow").learnset.closecombat = ["9L1"];
		this.modData("Learnsets", "abomasnow").learnset.superpower = ["9L1"];
		this.modData("Learnsets", "abomasnow").learnset.upperhand = ["9L1"];
		this.modData("Learnsets", "abomasnow").learnset.aurasphere = ["9L1"];
		this.modData("Learnsets", "abomasnow").learnset.vacuumwave = ["9L1"];
		this.modData("Learnsets", "abomasnow").learnset.bulkup = ["9L1"];
		this.modData("Learnsets", "abomasnow").learnset.secretsword = ["9L1"];
		this.modData("Learnsets", "abomasnow").learnset.trickroom = ["9L1"];
		this.modData("Learnsets", "abomasnow").learnset.setcolosseum = ["9L1"];
		this.modData("Learnsets", "abomasnow").learnset.setovergrowth = ["9L1"];
		this.modData("Learnsets", "abomasnow").learnset.setwhiteout = ["9L1"];
		// Ninetales-Alola
		this.modData("Learnsets", "ninetalesalola").learnset.scald = ["9L1"];
		this.modData("Learnsets", "ninetalesalola").learnset.waterspout = ["9L1"];
		this.modData("Learnsets", "ninetalesalola").learnset.iceball = ["9L1"];
		this.modData("Learnsets", "ninetalesalola").learnset.mistyexplosion = ["9L1"];
		this.modData("Learnsets", "ninetalesalola").learnset.setfable = ["9L1"];
		this.modData("Learnsets", "ninetalesalola").learnset.setwhiteout = ["9L1"];
		// Dragapult
		this.modData("Learnsets", "dragapult").learnset.shadowclaw = ["9L1"];
		this.modData("Learnsets", "dragapult").learnset.destinybond = ["9L1"];
		this.modData("Learnsets", "dragapult").learnset.irontail = ["9L1"];
		this.modData("Learnsets", "dragapult").learnset.sludgebomb = ["9L1"];
		this.modData("Learnsets", "dragapult").learnset.setlotsofreallysmalldragons = ["9L1"];
		this.modData("Learnsets", "dragapult").learnset.setthevoices = ["9L1"];
		// Electrode
		this.modData("Learnsets", "electrode").learnset.metronome = ["9L1"];
		this.modData("Learnsets", "electrode").learnset.boomburst = ["9L1"];
		this.modData("Learnsets", "electrode").learnset.setthunderstorm = ["9L1"];
		this.modData("Learnsets", "electrode").learnset.setmetronomebattle = ["9L1"];
		delete this.modData('Learnsets', 'electrode').learnset.zapcannon;
		delete this.modData('Learnsets', 'voltorb').learnset.zapcannon;
		// Clefable
		this.modData("Learnsets", "clefable").learnset.bloodmoon = ["9L1"];
		this.modData("Learnsets", "clefable").learnset.setfable = ["9L1"];
		this.modData("Learnsets", "clefable").learnset.setmetronomebattle = ["9L1"];
		delete this.modData('Learnsets', 'clefable').learnset.amnesia;
		delete this.modData('Learnsets', 'clefairy').learnset.amnesia;
		delete this.modData('Learnsets', 'cleffa').learnset.amnesia;
		// Heliolisk
		this.modData("Learnsets", "heliolisk").learnset.firepledge = ["9L1"];
		this.modData("Learnsets", "heliolisk").learnset.flareblitz = ["9L1"];
		this.modData("Learnsets", "heliolisk").learnset.overheat = ["9L1"];
		this.modData("Learnsets", "heliolisk").learnset.burnup = ["9L1"];
		this.modData("Learnsets", "heliolisk").learnset.fireblast = ["9L1"];
		this.modData("Learnsets", "heliolisk").learnset.flamethrower = ["9L1"];
		this.modData("Learnsets", "heliolisk").learnset.lavaplume = ["9L1"];
		this.modData("Learnsets", "heliolisk").learnset.flameburst = ["9L1"];
		this.modData("Learnsets", "heliolisk").learnset.willowisp = ["9L1"];
		this.modData("Learnsets", "heliolisk").learnset.waterpulse = ["9L1"];
		this.modData("Learnsets", "heliolisk").learnset.sandtomb = ["9L1"];
		this.modData("Learnsets", "heliolisk").learnset.setthunderstorm = ["9L1"];
		this.modData("Learnsets", "heliolisk").learnset.setdrought = ["9L1"];
		// Altaria
		this.modData("Learnsets", "altaria").learnset.dragonrage = ["9L1"];
		this.modData("Learnsets", "altaria").learnset.dragonenergy = ["9L1"];
		this.modData("Learnsets", "altaria").learnset.coreenforcer = ["9L1"];
		this.modData("Learnsets", "altaria").learnset.mistyexplosion = ["9L1"];
		this.modData("Learnsets", "altaria").learnset.setlotsofreallysmalldragons = ["9L1"];
		this.modData("Learnsets", "altaria").learnset.setdeltastream = ["9L1"];
		this.modData("Learnsets", "altaria").learnset.setfable = ["9L1"];
		// Lickilicky
		this.modData("Learnsets", "lickilicky").learnset.metronome = ["9L1"];
		this.modData("Learnsets", "lickilicky").learnset.rapidspin = ["9L1"];
		this.modData("Learnsets", "lickilicky").learnset.partingshot = ["9L1"];
		this.modData("Learnsets", "lickilicky").learnset.setmetronomebattle = ["9L1"];
		// Golduck
		this.modData("Learnsets", "golduck").learnset.bouncybubble = ["9L1"];
		this.modData("Learnsets", "golduck").learnset.mysticalpower = ["9L1"];
		this.modData("Learnsets", "golduck").learnset.storedpower = ["9L1"];
		this.modData("Learnsets", "golduck").learnset.cosmicpower = ["9L1"];
		this.modData("Learnsets", "golduck").learnset.gravity = ["9L1"];
		this.modData("Learnsets", "golduck").learnset.magiccoat = ["9L1"];
		this.modData("Learnsets", "golduck").learnset.psychicterrain = ["9L1"];
		this.modData("Learnsets", "golduck").learnset.psychoshift = ["9L1"];
		this.modData("Learnsets", "golduck").learnset.reflect = ["9L1"];
		this.modData("Learnsets", "golduck").learnset.teleport = ["9L1"];
		this.modData("Learnsets", "golduck").learnset.trick = ["9L1"];
		this.modData("Learnsets", "golduck").learnset.trickroom = ["9L1"];
		this.modData("Learnsets", "golduck").learnset.setmindfuck = ["9L1"];
		this.modData("Learnsets", "golduck").learnset.setflashflood = ["9L1"];
		delete this.modData('Learnsets', 'golduck').learnset.amnesia;
		delete this.modData('Learnsets', 'psyduck').learnset.amnesia;
		// Drampa
		this.modData("Learnsets", "drampa").learnset.metronome = ["9L1"];
		this.modData("Learnsets", "drampa").learnset.clangingscales = ["9L1"];
		this.modData("Learnsets", "drampa").learnset.coreenforcer = ["9L1"];
		this.modData("Learnsets", "drampa").learnset.trickroom = ["9L1"];
		this.modData("Learnsets", "drampa").learnset.setlotsofreallysmalldragons = ["9L1"];
		this.modData("Learnsets", "drampa").learnset.setmetronomebattle = ["9L1"];
		// Venusaur
		this.modData("Learnsets", "venusaur").learnset.belch = ["9L1"];
		this.modData("Learnsets", "venusaur").learnset.setovergrowth = ["9L1"];
		this.modData("Learnsets", "venusaur").learnset.setshitstorm = ["9L1"];
		// Sawsbuck
		this.modData("Learnsets", "sawsbuck").learnset.sleeppowder = ["9L1"];
		this.modData("Learnsets", "sawsbuck").learnset.crushclaw = ["9L1"];
		this.modData("Learnsets", "sawsbuck").learnset.gravapple = ["9L1"];
		this.modData("Learnsets", "sawsbuck").learnset.grasspledge = ["9L1"];
		this.modData("Learnsets", "sawsbuck").learnset.extremespeed = ["9L1"];
		this.modData("Learnsets", "sawsbuck").learnset.boomburst = ["9L1"];
		this.modData("Learnsets", "sawsbuck").learnset.nastyplot = ["9L1"];
		this.modData("Learnsets", "sawsbuck").learnset.setmetronomebattle = ["9L1"];
		this.modData("Learnsets", "sawsbuck").learnset.setovergrowth = ["9L1"];
		// Beedrill
		this.modData("Learnsets", "beedrill").learnset.barbbarrage = ["9L1"];
		this.modData("Learnsets", "beedrill").learnset.belch = ["9L1"];
		this.modData("Learnsets", "beedrill").learnset.settheswarm = ["9L1"];
		this.modData("Learnsets", "beedrill").learnset.setshitstorm = ["9L1"];
		// Scizor
		this.modData("Learnsets", "scizor").learnset.firstimpression = ["9L1"];
		this.modData("Learnsets", "scizor").learnset.twineedle = ["9L1"];
		this.modData("Learnsets", "scizor").learnset.heavyslam = ["9L1"];
		this.modData("Learnsets", "scizor").learnset.settheswarm = ["9L1"];
		this.modData("Learnsets", "scizor").learnset.settimewarp = ["9L1"];
		// Kleavor
		this.modData("Learnsets", "kleavor").learnset.firstimpression = ["9L1"];
		this.modData("Learnsets", "kleavor").learnset.twineedle = ["9L1"];
		this.modData("Learnsets", "kleavor").learnset.settheswarm = ["9L1"];
		this.modData("Learnsets", "kleavor").learnset.setlandslide = ["9L1"];
		// Heracross
		this.modData("Learnsets", "heracross").learnset.firstimpression = ["9L1"];
		this.modData("Learnsets", "heracross").learnset.twineedle = ["9L1"];
		this.modData("Learnsets", "heracross").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "heracross").learnset.settheswarm = ["9L1"];
		this.modData("Learnsets", "heracross").learnset.setcolosseum = ["9L1"];
		// Vespiquen
		this.modData("Learnsets", "vespiquen").learnset.twineedle = ["9L1"];
		this.modData("Learnsets", "vespiquen").learnset.nastyplot = ["9L1"];
		this.modData("Learnsets", "vespiquen").learnset.oblivionwing = ["9L1"];
		this.modData("Learnsets", "vespiquen").learnset.settheswarm = ["9L1"];
		this.modData("Learnsets", "vespiquen").learnset.setdeltastream = ["9L1"];
		// Volbeat
		this.modData("Learnsets", "volbeat").learnset.twineedle = ["9L1"];
		this.modData("Learnsets", "volbeat").learnset.supercellslam = ["9L1"];
		this.modData("Learnsets", "volbeat").learnset.wildcharge = ["9L1"];
		this.modData("Learnsets", "volbeat").learnset.nuzzle = ["9L1"];
		this.modData("Learnsets", "volbeat").learnset.zapcannon = ["9L1"];
		this.modData("Learnsets", "volbeat").learnset.thunderbolt = ["9L1"];
		this.modData("Learnsets", "volbeat").learnset.discharge = ["9L1"];
		this.modData("Learnsets", "volbeat").learnset.voltswitch = ["9L1"];
		this.modData("Learnsets", "volbeat").learnset.charge = ["9L1"];
		this.modData("Learnsets", "volbeat").learnset.magnetrise = ["9L1"];
		this.modData("Learnsets", "volbeat").learnset.settheswarm = ["9L1"];
		this.modData("Learnsets", "volbeat").learnset.settwilightzone = ["9L1"];
		this.modData("Learnsets", "volbeat").learnset.setlotsofreallysmalldragons = ["9L1"];
		this.modData("Learnsets", "volbeat").learnset.setthunderstorm = ["9L1"];
		this.modData("Learnsets", "volbeat").learnset.setfable = ["9L1"];
		this.modData("Learnsets", "volbeat").learnset.setcolosseum = ["9L1"];
		this.modData("Learnsets", "volbeat").learnset.setdrought = ["9L1"];
		this.modData("Learnsets", "volbeat").learnset.setdeltastream = ["9L1"];
		this.modData("Learnsets", "volbeat").learnset.setthevoices = ["9L1"];
		this.modData("Learnsets", "volbeat").learnset.setovergrowth = ["9L1"];
		this.modData("Learnsets", "volbeat").learnset.setduststorm = ["9L1"];
		this.modData("Learnsets", "volbeat").learnset.setwhiteout = ["9L1"];
		this.modData("Learnsets", "volbeat").learnset.setmetronomebattle = ["9L1"];
		this.modData("Learnsets", "volbeat").learnset.setshitstorm = ["9L1"];
		this.modData("Learnsets", "volbeat").learnset.setmindfuck = ["9L1"];
		this.modData("Learnsets", "volbeat").learnset.setlandslide = ["9L1"];
		this.modData("Learnsets", "volbeat").learnset.settimewarp = ["9L1"];
		this.modData("Learnsets", "volbeat").learnset.setflashflood = ["9L1"];
		// Kingdra
		this.modData("Learnsets", "kingdra").learnset.dragonhammer = ["9L1"];
		this.modData("Learnsets", "kingdra").learnset.waterpledge = ["9L1"];
		this.modData("Learnsets", "kingdra").learnset.coreenforcer = ["9L1"];
		this.modData("Learnsets", "kingdra").learnset.setlotsofreallysmalldragons = ["9L1"];
		this.modData("Learnsets", "kingdra").learnset.setflashflood = ["9L1"];
		// Excadrill
		this.modData("Learnsets", "excadrill").learnset.heavyslam = ["9L1"];
		this.modData("Learnsets", "excadrill").learnset.setduststorm = ["9L1"];
		this.modData("Learnsets", "excadrill").learnset.setlandslide = ["9L1"];
		this.modData("Learnsets", "excadrill").learnset.settimewarp = ["9L1"];
		// Tornadus
		this.modData("Learnsets", "tornadus").learnset.bravebird = ["9L1"];
		this.modData("Learnsets", "tornadus").learnset.setdeltastream = ["9L1"];
		// Thundurus
		this.modData("Learnsets", "thundurus").learnset.plasmafists = ["9L1"];
		this.modData("Learnsets", "thundurus").learnset.thunderouskick = ["9L1"];
		this.modData("Learnsets", "thundurus").learnset.closecombat = ["9L1"];
		this.modData("Learnsets", "thundurus").learnset.upperhand = ["9L1"];
		this.modData("Learnsets", "thundurus").learnset.setthunderstorm = ["9L1"];
		this.modData("Learnsets", "thundurus").learnset.setcolosseum = ["9L1"];
		// Tentacruel
		this.modData("Learnsets", "tentacruel").learnset.waterpledge = ["9L1"];
		this.modData("Learnsets", "tentacruel").learnset.belch = ["9L1"];
		this.modData("Learnsets", "tentacruel").learnset.recover = ["9L1"];
		this.modData("Learnsets", "tentacruel").learnset.setshitstorm = ["9L1"];
		this.modData("Learnsets", "tentacruel").learnset.setflashflood = ["9L1"];
		// Toedscruel
		this.modData("Learnsets", "toedscruel").learnset.earthquake = ["9L1"];
		this.modData("Learnsets", "toedscruel").learnset.sandtomb = ["9L1"];
		this.modData("Learnsets", "toedscruel").learnset.stoneedge = ["9L1"];
		this.modData("Learnsets", "toedscruel").learnset.rockslide = ["9L1"];
		this.modData("Learnsets", "toedscruel").learnset.grasspledge = ["9L1"];
		this.modData("Learnsets", "toedscruel").learnset.synthesis = ["9L1"];
		this.modData("Learnsets", "toedscruel").learnset.setduststorm = ["9L1"];
		this.modData("Learnsets", "toedscruel").learnset.setovergrowth = ["9L1"];
		// Toxicroak
		this.modData("Learnsets", "toxicroak").learnset.belch = ["9L1"];
		this.modData("Learnsets", "toxicroak").learnset.setcolosseum = ["9L1"];
		this.modData("Learnsets", "toxicroak").learnset.setshitstorm = ["9L1"];
		this.modData("Learnsets", "toxicroak").learnset.setflashflood = ["9L1"];
		// Spiritomb
		this.modData("Learnsets", "spiritomb").learnset.boomburst = ["9L1"];
		this.modData("Learnsets", "spiritomb").learnset.settwilightzone = ["9L1"];
		this.modData("Learnsets", "spiritomb").learnset.setthevoices = ["9L1"];
		// Cherrim
		this.modData("Learnsets", "cherrim").learnset.flowertrick = ["9L1"];
		this.modData("Learnsets", "cherrim").learnset.sleeppowder = ["9L1"];
		this.modData("Learnsets", "cherrim").learnset.grasspledge = ["9L1"];
		this.modData("Learnsets", "cherrim").learnset.firepledge = ["9L1"];
		this.modData("Learnsets", "cherrim").learnset.firelash = ["9L1"];
		this.modData("Learnsets", "cherrim").learnset.calmmind = ["9L1"];
		this.modData("Learnsets", "cherrim").learnset.flareblitz = ["9L1"];
		this.modData("Learnsets", "cherrim").learnset.flamecharge = ["9L1"];
		this.modData("Learnsets", "cherrim").learnset.fireblast = ["9L1"];
		this.modData("Learnsets", "cherrim").learnset.flamethrower = ["9L1"];
		this.modData("Learnsets", "cherrim").learnset.mysticalfire = ["9L1"];
		this.modData("Learnsets", "cherrim").learnset.setdrought = ["9L1"];
		this.modData("Learnsets", "cherrim").learnset.setovergrowth = ["9L1"];
		// Garganacl
		this.modData("Learnsets", "garganacl").learnset.setlandslide = ["9L1"];
		// Incineroar
		this.modData("Learnsets", "incineroar").learnset.upperhand = ["9L1"];
		this.modData("Learnsets", "incineroar").learnset.courtchange = ["9L1"];
		this.modData("Learnsets", "incineroar").learnset.setdrought = ["9L1"];
		this.modData("Learnsets", "incineroar").learnset.setcolosseum = ["9L1"];
		// Hawlucha
		this.modData("Learnsets", "hawlucha").learnset.setcolosseum = ["9L1"];
		this.modData("Learnsets", "hawlucha").learnset.setdeltastream = ["9L1"];
		// Hitmonchan
		this.modData("Learnsets", "hitmonchan").learnset.steelroller = ["9L1"];
		this.modData("Learnsets", "hitmonchan").learnset.meteormash = ["9L1"];
		this.modData("Learnsets", "hitmonchan").learnset.smartstrike = ["9L1"];
		this.modData("Learnsets", "hitmonchan").learnset.metalburst = ["9L1"];
		this.modData("Learnsets", "hitmonchan").learnset.hardpress = ["9L1"];
		this.modData("Learnsets", "hitmonchan").learnset.steelbeam = ["9L1"];
		this.modData("Learnsets", "hitmonchan").learnset.flashcannon = ["9L1"];
		this.modData("Learnsets", "hitmonchan").learnset.irondefense = ["9L1"];
		this.modData("Learnsets", "hitmonchan").learnset.setcoloseeum = ["9L1"];
		this.modData("Learnsets", "hitmonchan").learnset.settimewarp = ["9L1"];
		// Chi-Yu
		this.modData("Learnsets", "chiyu").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "chiyu").learnset.firepledge = ["9L1"];
		this.modData("Learnsets", "chiyu").learnset.setdrought = ["9L1"];
		this.modData("Learnsets", "chiyu").learnset.settwilightzone = ["9L1"];
		// Mismagius
		this.modData("Learnsets", "mismagius").learnset.moonblast = ["9L1"];
		this.modData("Learnsets", "mismagius").learnset.alluringvoice = ["9L1"];
		this.modData("Learnsets", "mismagius").learnset.disarmingvoice = ["9L1"];
		this.modData("Learnsets", "mismagius").learnset.fairywind = ["9L1"];
		this.modData("Learnsets", "mismagius").learnset.aromaticmist = ["9L1"];
		this.modData("Learnsets", "mismagius").learnset.moonlight = ["9L1"];
		this.modData("Learnsets", "mismagius").learnset.setfable = ["9L1"];
		this.modData("Learnsets", "mismagius").learnset.setthevoices = ["9L1"];
		// Slowking-Galar
		this.modData("Learnsets", "slowkinggalar").learnset.healblock = ["9L1"];
		this.modData("Learnsets", "slowkinggalar").learnset.heartswap = ["9L1"];
		this.modData("Learnsets", "slowkinggalar").learnset.speedswap = ["9L1"];
		this.modData("Learnsets", "slowkinggalar").learnset.teleport = ["9L1"];
		this.modData("Learnsets", "slowkinggalar").learnset.setshitstorm = ["9L1"];
		this.modData("Learnsets", "slowkinggalar").learnset.mindfuck = ["9L1"];
		delete this.modData('Learnsets', 'slowkinggalar').learnset.amnesia;
		delete this.modData('Learnsets', 'slowpokegalar').learnset.amnesia;
		// Wo-Chien
		this.modData("Learnsets", "wochien").learnset.appleacid = ["9L1"];
		this.modData("Learnsets", "wochien").learnset.grasspledge = ["9L1"];
		this.modData("Learnsets", "wochien").learnset.sleeppowder = ["9L1"];
		this.modData("Learnsets", "wochien").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "wochien").learnset.partingshot = ["9L1"];
		this.modData("Learnsets", "wochien").learnset.settwilightzone = ["9L1"];
		this.modData("Learnsets", "wochien").learnset.setovergrowth = ["9L1"];
		// Absol
		this.modData("Learnsets", "absol").learnset.spiritbreak = ["9L1"];
		this.modData("Learnsets", "absol").learnset.poisonjab = ["9L1"];
		this.modData("Learnsets", "absol").learnset.moonblast = ["9L1"];
		this.modData("Learnsets", "absol").learnset.alluringvoice = ["9L1"];
		this.modData("Learnsets", "absol").learnset.dazzlinggleam = ["9L1"];
		this.modData("Learnsets", "absol").learnset.drainingkiss = ["9L1"];
		this.modData("Learnsets", "absol").learnset.settwilightzone = ["9L1"];
		this.modData("Learnsets", "absol").learnset.setfable = ["9L1"];
		// Malamar
		this.modData("Learnsets", "malamar").learnset.magicpowder = ["9L1"];
		this.modData("Learnsets", "malamar").learnset.partingshot = ["9L1"];
		this.modData("Learnsets", "malamar").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "malamar").learnset.amnesia = ["9L1"];
		this.modData("Learnsets", "malamar").learnset.heartswap = ["9L1"];
		this.modData("Learnsets", "malamar").learnset.healblock = ["9L1"];
		this.modData("Learnsets", "malamar").learnset.hyperspacefury = ["9L1"];
		this.modData("Learnsets", "malamar").learnset.psychoboost = ["9L1"];
		this.modData("Learnsets", "malamar").learnset.amnesia = ["9L1"];
		this.modData("Learnsets", "malamar").learnset.recover = ["9L1"];
		this.modData("Learnsets", "malamar").learnset.settwilightzone = ["9L1"];
		this.modData("Learnsets", "malamar").learnset.setmindfuck = ["9L1"];
		// Jirachi
		this.modData("Learnsets", "jirachi").learnset.healblock = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.heartswap = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.heavyslam = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.setmindfuck = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.settimewarp = ["9L1"];
		delete this.modData('Learnsets', 'jirachi').learnset.amnesia;
		// Celebi
		this.modData("Learnsets", "celebi").learnset.grasspledge = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.sleeppowder = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.heavyslam = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.gyroball = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.steelroller = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.smartstrike = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.steelbeam = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.flashcannon = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.irondefense = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.metalsound = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.setovergrowth = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.settimewarp = ["9L1"];
		// Enamorus
		this.modData("Learnsets", "enamorus").learnset.thunderwave = ["9L1"];
		this.modData("Learnsets", "enamorus").learnset.healblock = ["9L1"];
		this.modData("Learnsets", "enamorus").learnset.heartswap = ["9L1"];
		this.modData("Learnsets", "enamorus").learnset.fleurcannon = ["9L1"];
		this.modData("Learnsets", "enamorus").learnset.guardsplit = ["9L1"];
		this.modData("Learnsets", "enamorus").learnset.trick = ["9L1"];
		this.modData("Learnsets", "enamorus").learnset.mistyexplosion = ["9L1"];
		this.modData("Learnsets", "enamorus").learnset.setfable = ["9L1"];
		this.modData("Learnsets", "enamorus").learnset.setmindfuck = ["9L1"];
		// Manaphy
		this.modData("Learnsets", "manaphy").learnset.mistyexplosion = ["9L1"];
		this.modData("Learnsets", "manaphy").learnset.setfable = ["9L1"];
		this.modData("Learnsets", "manaphy").learnset.setflashflood = ["9L1"];
		// Alakazam
		this.modData("Learnsets", "alakazam").learnset.healblock = ["9L1"];
		this.modData("Learnsets", "alakazam").learnset.setmindfuck = ["9L1"];
		delete this.modData('Learnsets', 'alakazam').learnset.nastyplot;
		// Kabutops
		this.modData("Learnsets", "kabutops").learnset.upperhand = ["9L1"];
		this.modData("Learnsets", "kabutops").learnset.mightycleave = ["9L1"];
		this.modData("Learnsets", "kabutops").learnset.closecombat = ["9L1"];
		this.modData("Learnsets", "kabutops").learnset.collisioncourse = ["9L1"];
		this.modData("Learnsets", "kabutops").learnset.crosschop = ["9L1"];
		this.modData("Learnsets", "kabutops").learnset.sacredsword = ["9L1"];
		this.modData("Learnsets", "kabutops").learnset.bodypress = ["9L1"];
		this.modData("Learnsets", "kabutops").learnset.lowsweep = ["9L1"];
		this.modData("Learnsets", "kabutops").learnset.aurasphere = ["9L1"];
		this.modData("Learnsets", "kabutops").learnset.bulkup = ["9L1"];
		this.modData("Learnsets", "kabutops").learnset.setcolosseum = ["9L1"];
		this.modData("Learnsets", "kabutops").learnset.setlandslide = ["9L1"];
		// Nihilego
		this.modData("Learnsets", "nihilego").learnset.belch = ["9L1"];
		this.modData("Learnsets", "nihilego").learnset.mortalspin = ["9L1"];
		this.modData("Learnsets", "nihilego").learnset.energyball = ["9L1"];
		this.modData("Learnsets", "nihilego").learnset.scorchingsands = ["9L1"];
		this.modData("Learnsets", "nihilego").learnset.setshitstorm = ["9L1"];
		this.modData("Learnsets", "nihilego").learnset.setlandslide = ["9L1"];
		// Diancie
		this.modData("Learnsets", "diancie").learnset.mistyexplosion = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.spiritbreak = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.earthquake = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.setfable = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.setshitstorm = ["9L1"];
		// Arctozolt
		this.modData("Learnsets", "arctozolt").learnset.zapcannon = ["9L1"];
		this.modData("Learnsets", "arctozolt").learnset.iceball = ["9L1"];
		this.modData("Learnsets", "arctozolt").learnset.jetpunch = ["9L1"];
		this.modData("Learnsets", "arctozolt").learnset.rockpolish = ["9L1"];
		this.modData("Learnsets", "arctozolt").learnset.setthunderstorm = ["9L1"];
		this.modData("Learnsets", "arctozolt").learnset.setwhiteout = ["9L1"];
		// Mamoswine
		this.modData("Learnsets", "mamoswine").learnset.iceball = ["9L1"];
		this.modData("Learnsets", "mamoswine").learnset.mountaingale = ["9L1"];
		this.modData("Learnsets", "mamoswine").learnset.bonerush = ["9L1"];
		this.modData("Learnsets", "mamoswine").learnset.rockpolish = ["9L1"];
		this.modData("Learnsets", "mamoswine").learnset.setduststorm = ["9L1"];
		this.modData("Learnsets", "mamoswine").learnset.setwhiteout = ["9L1"];
		this.modData("Learnsets", "mamoswine").learnset.setlandslide = ["9L1"];
		// Froslass
		this.modData("Learnsets", "froslass").learnset.scald = ["9L1"];
		this.modData("Learnsets", "froslass").learnset.iceball = ["9L1"];
		this.modData("Learnsets", "froslass").learnset.freezedry = ["9L1"];
		this.modData("Learnsets", "froslass").learnset.nastyplot = ["9L1"];
		this.modData("Learnsets", "froslass").learnset.setthevoices = ["9L1"];
		this.modData("Learnsets", "froslass").learnset.setwhiteout = ["9L1"];
		// Frosmoth
		this.modData("Learnsets", "frosmoth").learnset.twineedle = ["9L1"];
		this.modData("Learnsets", "frosmoth").learnset.iceball = ["9L1"];
		this.modData("Learnsets", "frosmoth").learnset.roost = ["9L1"];
		this.modData("Learnsets", "frosmoth").learnset.freezedry = ["9L1"];
		this.modData("Learnsets", "frosmoth").learnset.settheswarm = ["9L1"];
		this.modData("Learnsets", "frosmoth").learnset.setwhiteout = ["9L1"];
		// Chien-Pao
		this.modData("Learnsets", "chienpao").learnset.aquajet = ["9L1"];
		this.modData("Learnsets", "chienpao").learnset.razorshell = ["9L1"];
		this.modData("Learnsets", "chienpao").learnset.liquidation = ["9L1"];
		this.modData("Learnsets", "chienpao").learnset.hydropump = ["9L1"];
		this.modData("Learnsets", "chienpao").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "chienpao").learnset.iceball = ["9L1"];
		this.modData("Learnsets", "chienpao").learnset.settwilightzone = ["9L1"];
		this.modData("Learnsets", "chienpao").learnset.setwhiteout = ["9L1"];
		// Ting-Lu
		this.modData("Learnsets", "tinglu").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "tinglu").learnset.ancientpower = ["9L1"];
		this.modData("Learnsets", "tinglu").learnset.settwilightzone = ["9L1"];
		this.modData("Learnsets", "tinglu").learnset.setduststorm = ["9L1"];
		// Armaldo
		this.modData("Learnsets", "armaldo").learnset.twineedle = ["9L1"];
		this.modData("Learnsets", "armaldo").learnset.leechlife = ["9L1"];
		this.modData("Learnsets", "armaldo").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "armaldo").learnset.sandtomb = ["9L1"];
		this.modData("Learnsets", "armaldo").learnset.healorder = ["9L1"];
		this.modData("Learnsets", "armaldo").learnset.settheswarm = ["9L1"];
		this.modData("Learnsets", "armaldo").learnset.setduststorm = ["9L1"];
		// Golem-Alola
		this.modData("Learnsets", "golemalola").learnset.powergem = ["9L1"];
		this.modData("Learnsets", "golemalola").learnset.setthunderstorm = ["9L1"];
		this.modData("Learnsets", "golemalola").learnset.setlandslide = ["9L1"];
		// Weezing-Galar
		this.modData("Learnsets", "weezinggalar").learnset.pyroball = ["9L1"];
		this.modData("Learnsets", "weezinggalar").learnset.flamecharge = ["9L1"];
		this.modData("Learnsets", "weezinggalar").learnset.burnup = ["9L1"];
		this.modData("Learnsets", "weezinggalar").learnset.overheat = ["9L1"];
		this.modData("Learnsets", "weezinggalar").learnset.inferno = ["9L1"];
		this.modData("Learnsets", "weezinggalar").learnset.lavaplume = ["9L1"];
		this.modData("Learnsets", "weezinggalar").learnset.firepledge = ["9L1"];
		this.modData("Learnsets", "weezinggalar").learnset.mysticalfire = ["9L1"];
		this.modData("Learnsets", "weezinggalar").learnset.flameburst = ["9L1"];
		this.modData("Learnsets", "weezinggalar").learnset.firespin = ["9L1"];
		this.modData("Learnsets", "weezinggalar").learnset.setdrought = ["9L1"];
		this.modData("Learnsets", "weezinggalar").learnset.setfable = ["9L1"];
		// Sableye
		this.modData("Learnsets", "sableye").learnset.stoneedge = ["9L1"];
		this.modData("Learnsets", "sableye").learnset.rockslide = ["9L1"];
		this.modData("Learnsets", "sableye").learnset.smackdown = ["9L1"];
		this.modData("Learnsets", "sableye").learnset.rockblast = ["9L1"];
		this.modData("Learnsets", "sableye").learnset.meteorbeam = ["9L1"];
		this.modData("Learnsets", "sableye").learnset.ancientpower = ["9L1"];
		this.modData("Learnsets", "sableye").learnset.stealthrock = ["9L1"];
		this.modData("Learnsets", "sableye").learnset.setthevoices = ["9L1"];
		this.modData("Learnsets", "sableye").learnset.setlandslide = ["9L1"];
		// Pecharunt
		this.modData("Learnsets", "pecharunt").learnset.strengthsap = ["9L1"];
		this.modData("Learnsets", "pecharunt").learnset.shellsmash = ["9L1"];
		this.modData("Learnsets", "pecharunt").learnset.belch = ["9L1"];
		this.modData("Learnsets", "pecharunt").learnset.setthevoices = ["9L1"];
		this.modData("Learnsets", "pecharunt").learnset.setshitstorm = ["9L1"];
		// Wyrdeer
		this.modData("Learnsets", "wyrdeer").learnset.amnesia = ["9L1"];
		this.modData("Learnsets", "wyrdeer").learnset.healblock = ["9L1"];
		this.modData("Learnsets", "wyrdeer").learnset.heartswap = ["9L1"];
		this.modData("Learnsets", "wyrdeer").learnset.metronome = ["9L1"];
		this.modData("Learnsets", "wyrdeer").learnset.setmetronomebattle = ["9L1"];
		this.modData("Learnsets", "wyrdeer").learnset.setmindfuck = ["9L1"];
		
		//removals
		// Zapdos
		delete this.modData('Learnsets', 'zapdos').learnset.ancientpower;
		delete this.modData('Learnsets', 'zapdos').learnset.zapcannon;
		// Archaludon
		delete this.modData('Learnsets', 'duraludon').learnset.metalburst;
		delete this.modData('Learnsets', 'archaludon').learnset.metalburst;
		// Dialga
		delete this.modData('Learnsets', 'dialga').learnset.metalburst;
		delete this.modData('Learnsets', 'dialga').learnset.ancientpower;
		// Tyranitar
		delete this.modData('Learnsets', 'larvitar').learnset.ancientpower;
		delete this.modData('Learnsets', 'pupitar').learnset.ancientpower;
		delete this.modData('Learnsets', 'tyranitar').learnset.ancientpower;
		// Dragapult
		delete this.modData('Learnsets', 'drakloak').learnset.dragondance;
		delete this.modData('Learnsets', 'dragapult').learnset.dragondance;
		// Toedscruel
		delete this.modData('Learnsets', 'toedscruel').learnset.spore;
		// Darkrai
		delete this.modData('Learnsets', 'darkrai').learnset.nastyplot;
		// Malamar
		delete this.modData('Learnsets', 'inkay').learnset.storedpower;
		delete this.modData('Learnsets', 'malamar').learnset.storedpower;
		// Jirachi
		delete this.modData('Learnsets', 'jirachi').learnset.ancientpower;
		// Celebi
		delete this.modData('Learnsets', 'celebi').learnset.ancientpower;
		// Diancie
		delete this.modData('Learnsets', 'diancie').learnset.ancientpower;
		// Chien-Pao
		delete this.modData('Learnsets', 'chienpao').learnset.suckerpunch;
		// Salazzle
		delete this.modData('Learnsets', 'salazzle').learnset.dragondance;
	},
	
	pokemon: {
		ignoringItem() {
			return !!(
				this.itemState.knockedOff || // Gen 3-4
				(this.battle.gen >= 5 && !this.isActive) ||
				(!this.getItem().ignoreKlutz && this.hasAbility('klutz')) ||
				this.volatiles['embargo'] || this.battle.field.pseudoWeather['magicroom'] || this.battle.field.pseudoWeather['mindfuck']
			);
		},
		ignoringAbility() {
			if (this.battle.gen >= 5 && !this.isActive) return true;

			const evilAbilities = ['intimidate', 'defiant', 'angerpoint', 'unnerve', 'moody', 'infiltrator', 'pickpocket', 'darkaura', 'merciless', 'berserk', 'swordofruin', 'tabletsofruin', 'vesselofruin', 'beadsofruin', 'poisonpuppeteer', 'shadowtag', 'toxicchain', 'corrosion', 'ambush', 'banshee', 'corrosion'];
			
			// Certain Abilities won't activate while Transformed, even if they ordinarily couldn't be suppressed (e.g. Disguise)
			if (this.getAbility().flags['notransform'] && this.transformed) return true;
			if (this.getAbility().flags['cantsuppress']) return false;
			if (this.volatiles['gastroacid']) return true;

			// Check if any active pokemon have the ability Neutralizing Gas
			if (this.hasItem('Ability Shield') || this.ability === ('neutralizinggas' as ID)) return false;
			for (const pokemon of this.battle.getAllActive()) {
				// can't use hasAbility because it would lead to infinite recursion
				if (pokemon.ability === ('neutralizinggas' as ID) && !pokemon.volatiles['gastroacid'] && 
				!pokemon.transformed && !pokemon.abilityState.ending && !this.volatiles['commanding']) {
					return true;
				}
				if (this.battle.field.pseudoWeather['fable'] && evilAbilities.includes(pokemon.ability)) return true;
			}

			return false;
		},
		calculateStat(statName: StatIDExceptHP, boost: number, modifier?: number, statUser?: Pokemon) {
		statName = toID(statName) as StatIDExceptHP;
			// @ts-ignore - type checking prevents 'hp' from being passed, but we're paranoid
			if (statName === 'hp') throw new Error("Please read `maxhp` directly");

			// base stat
			let stat = this.storedStats[statName];

			// Wonder Room swaps defenses before calculating anything else
			if ('wonderroom' in this.battle.field.pseudoWeather || 'mindfuck' in this.battle.field.pseudoWeather) {
				if (statName === 'def') {
					stat = this.storedStats['spd'];
				} else if (statName === 'spd') {
					stat = this.storedStats['def'];
				}
			}

			// stat boosts
			let boosts: SparseBoostsTable = {};
			const boostName = statName as BoostID;
			boosts[boostName] = boost;
			boosts = this.battle.runEvent('ModifyBoost', statUser || this, null, null, boosts);
			boost = boosts[boostName]!;
			const boostTable = [1, 1.5, 2, 2.5, 3, 3.5, 4];
			if (boost > 6) boost = 6;
			if (boost < -6) boost = -6;
			if (boost >= 0) {
				stat = Math.floor(stat * boostTable[boost]);
			} else {
				stat = Math.floor(stat / boostTable[-boost]);
			}

			// stat modifier
			return this.battle.modify(stat, (modifier || 1));
		},
		getStat(statName: StatIDExceptHP, unboosted?: boolean, unmodified?: boolean) {
			statName = toID(statName) as StatIDExceptHP;
			// @ts-ignore - type checking prevents 'hp' from being passed, but we're paranoid
			if (statName === 'hp') throw new Error("Please read `maxhp` directly");

			// base stat
			let stat = this.storedStats[statName];

			// Download ignores Wonder Room's effect, but this results in
			// stat stages being calculated on the opposite defensive stat
			if (unmodified && ('wonderroom' in this.battle.field.pseudoWeather || 'mindfuck' in this.battle.field.pseudoWeather)) {
				if (statName === 'def') {
					statName = 'spd';
				} else if (statName === 'spd') {
					statName = 'def';
				}
			}

			// stat boosts
			if (!unboosted) {
				const boosts = this.battle.runEvent('ModifyBoost', this, null, null, {...this.boosts});
				let boost = boosts[statName];
				const boostTable = [1, 1.5, 2, 2.5, 3, 3.5, 4];
				if (boost > 6) boost = 6;
				if (boost < -6) boost = -6;
				if (boost >= 0) {
					stat = Math.floor(stat * boostTable[boost]);
				} else {
					stat = Math.floor(stat / boostTable[-boost]);
				}
			}

			// stat modifier effects
			if (!unmodified) {
				const statTable: {[s in StatIDExceptHP]: string} = {atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe'};
				stat = this.battle.runEvent('Modify' + statTable[statName], this, null, null, stat);
			}

			if (statName === 'spe' && stat > 10000 && !this.battle.format.battle?.trunc) stat = 10000;
			return stat;
		},
	},
};