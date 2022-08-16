'use strict';

export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init: function () {	
	// Dragalge
		this.modData("Learnsets", "dragalge").learnset.afteryou = ["8L1"];
		this.modData("Learnsets", "dragalge").learnset.auroraveil = ["8L1"];
		this.modData("Learnsets", "dragalge").learnset.glaciate = ["8L1"];
		this.modData("Learnsets", "dragalge").learnset.iceburn = ["8L1"];
		this.modData("Learnsets", "dragalge").learnset.nightshade = ["8L1"];
		this.modData("Learnsets", "dragalge").learnset.shadowclaw = ["8L1"];
		this.modData("Learnsets", "dragalge").learnset.shadowsneak = ["8L1"];
		// Rotom-Wash
		this.modData("Learnsets", "rotomwash").learnset.conversion2 = ["8L1"];
		this.modData("Learnsets", "rotomwash").learnset.dragonclaw = ["8L1"];
		this.modData("Learnsets", "rotomwash").learnset.dualchop = ["8L1"];
		this.modData("Learnsets", "rotomwash").learnset.energyball = ["8L1"];
		this.modData("Learnsets", "rotomwash").learnset.junglehealing = ["8L1"];
		this.modData("Learnsets", "rotomwash").learnset.solarbeam = ["8L1"];
		this.modData("Learnsets", "rotomwash").learnset.specialrend = ["8L1"];
		// Pyroar
		this.modData("Learnsets", "pyroar").learnset.astralbarrage = ["8L1"];
		this.modData("Learnsets", "pyroar").learnset.magnetrise = ["8L1"];
		this.modData("Learnsets", "pyroar").learnset.nightshade = ["8L1"];
		this.modData("Learnsets", "pyroar").learnset.plasmafist = ["8L1"];
		this.modData("Learnsets", "pyroar").learnset.reflecttype = ["8L1"];
		this.modData("Learnsets", "pyroar").learnset.shadowclaw = ["8L1"];
		this.modData("Learnsets", "pyroar").learnset.thunderpunch = ["8L1"];
		// Bronzong
		this.modData("Learnsets", "bronzong").learnset.shadowbone = ["8L1"];
		// Dragapult
		this.modData("Learnsets", "dragapult").learnset.honeclaws = ["8L1"];
		this.modData("Learnsets", "dragapult").learnset.powertrip = ["8L1"];
		this.modData("Learnsets", "dragapult").learnset.shellsidearm = ["8L1"];
		this.modData("Learnsets", "dragapult").learnset.taunt = ["8L1"];
		// Spheal
		this.modData("Learnsets", "spheal").learnset.anchorshot = ["8L1"];
		this.modData("Learnsets", "spheal").learnset.coil = ["8L1"];
		this.modData("Learnsets", "spheal").learnset.craftyshield = ["8L1"];
		this.modData("Learnsets", "spheal").learnset.disarmingvoice = ["8L1"];
		this.modData("Learnsets", "spheal").learnset.doubleironbash = ["8L1"];
		this.modData("Learnsets", "spheal").learnset.mistyexplosion = ["8L1"];
		// Octillery
		this.modData("Learnsets", "octillery").learnset.accelerock = ["8L1"];
		this.modData("Learnsets", "octillery").learnset.circlethrow = ["8L1"];
		this.modData("Learnsets", "octillery").learnset.precipiceblades = ["8L1"];
		this.modData("Learnsets", "octillery").learnset.rocktomb = ["8L1"];
		this.modData("Learnsets", "octillery").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "octillery").learnset.shoreup = ["8L1"];
		this.modData("Learnsets", "octillery").learnset.wideguard = ["8L1"];
		// Stakataka
		this.modData("Learnsets", "stakataka").learnset.photongeyser = ["8L1"];
		this.modData("Learnsets", "stakataka").learnset.thundershock = ["8L1"];
		// Ralts
		this.modData("Learnsets", "ralts").learnset.acidspray = ["8L1"];
		this.modData("Learnsets", "ralts").learnset.fishiousrend = ["8L1"];
		this.modData("Learnsets", "ralts").learnset.holdback = ["8L1"];
		this.modData("Learnsets", "ralts").learnset.purify = ["8L1"];
		this.modData("Learnsets", "ralts").learnset.shellsidearm = ["8L1"];
		this.modData("Learnsets", "ralts").learnset.watershuriken = ["8L1"];
		this.modData("Learnsets", "ralts").learnset.waterspout = ["8L1"];
		// Corsola
		this.modData("Learnsets", "corsola").learnset.attackorder = ["8L1"];
		this.modData("Learnsets", "corsola").learnset.bugbite = ["8L1"];
		this.modData("Learnsets", "corsola").learnset.chargebeam = ["8L1"];
		this.modData("Learnsets", "corsola").learnset.frostbreath = ["8L1"];
		this.modData("Learnsets", "corsola").learnset.iceburn = ["8L1"];
		this.modData("Learnsets", "corsola").learnset.pinmissile = ["8L1"];
		// Exeggcute
		this.modData("Learnsets", "exeggcute").learnset.disable = ["8L1"];
		this.modData("Learnsets", "exeggcute").learnset.falseswipe = ["8L1"];
		this.modData("Learnsets", "exeggcute").learnset.hydrocannon = ["8L1"];
		this.modData("Learnsets", "exeggcute").learnset.slash = ["8L1"];
		// Regice
		this.modData("Learnsets", "regice").learnset.appleacid = ["8L1"];
		this.modData("Learnsets", "regice").learnset.bulletseed = ["8L1"];
		this.modData("Learnsets", "regice").learnset.headsmash = ["8L1"];
		this.modData("Learnsets", "regice").learnset.woodhammer = ["8L1"];
		// Vivillon
		this.modData("Learnsets", "vivillon").learnset.chargebeam = ["8L1"];
		this.modData("Learnsets", "vivillon").learnset.clangingscales = ["8L1"];
		this.modData("Learnsets", "vivillon").learnset.dragonpulse = ["8L1"];
		this.modData("Learnsets", "vivillon").learnset.magicroom = ["8L1"];
		this.modData("Learnsets", "vivillon").learnset.nuzzle = ["8L1"];
		this.modData("Learnsets", "vivillon").learnset.scaleshot = ["8L1"];
		this.modData("Learnsets", "vivillon").learnset.thunderfang = ["8L1"];
		// Zapdos
		this.modData("Learnsets", "zapdos").learnset.burningjealousy = ["8L1"];
		this.modData("Learnsets", "zapdos").learnset.firefang = ["8L1"];
		this.modData("Learnsets", "zapdos").learnset.flamewheel = ["8L1"];
		this.modData("Learnsets", "zapdos").learnset.inferno = ["8L1"];
		// Giratina
		this.modData("Learnsets", "giratina").learnset.auroraveil = ["8L1"];
		this.modData("Learnsets", "giratina").learnset.iciclespear = ["8L1"];
		this.modData("Learnsets", "giratina").learnset.nightslash = ["8L1"];
		this.modData("Learnsets", "giratina").learnset.powdersnow = ["8L1"];
		this.modData("Learnsets", "giratina").learnset.thief = ["8L1"];
		this.modData("Learnsets", "giratina").learnset.topsyturvy = ["8L1"];
		// Ninjask
		this.modData("Learnsets", "ninjask").learnset.amnesia = ["8L1"];
		this.modData("Learnsets", "ninjask").learnset.ancientpower = ["8L1"];
		this.modData("Learnsets", "ninjask").learnset.babydolleyes = ["8L1"];
		this.modData("Learnsets", "ninjask").learnset.disarmingvoice = ["8L1"];
		this.modData("Learnsets", "ninjask").learnset.fleurcannon = ["8L1"];
		this.modData("Learnsets", "ninjask").learnset.rollout = ["8L1"];
		this.modData("Learnsets", "ninjask").learnset.stoneedge = ["8L1"];
		// Galvantula
		this.modData("Learnsets", "galvantula").learnset.astonish = ["8L1"];
		this.modData("Learnsets", "galvantula").learnset.doomdesire = ["8L1"];
		this.modData("Learnsets", "galvantula").learnset.forestscurse = ["8L1"];
		this.modData("Learnsets", "galvantula").learnset.metalclaw = ["8L1"];
		this.modData("Learnsets", "galvantula").learnset.metalsound = ["8L1"];
		this.modData("Learnsets", "galvantula").learnset.poltergeist = ["8L1"];
		this.modData("Learnsets", "galvantula").learnset.shadowclaw = ["8L1"];
		// Gyarados
		this.modData("Learnsets", "gyarados").learnset.amnesia = ["8L1"];
		this.modData("Learnsets", "gyarados").learnset.blizzard = ["8L1"];
		this.modData("Learnsets", "gyarados").learnset.freezedry = ["8L1"];
		this.modData("Learnsets", "gyarados").learnset.iceburn = ["8L1"];
		// Lunala
		this.modData("Learnsets", "lunala").learnset.brutalswing = ["8L1"];
		this.modData("Learnsets", "lunala").learnset.mimic = ["8L1"];
		this.modData("Learnsets", "lunala").learnset.nightslash = ["8L1"];
		this.modData("Learnsets", "lunala").learnset.stuffcheeks = ["8L1"];
		this.modData("Learnsets", "lunala").learnset.triattack = ["8L1"];
		// Reuniclus
		this.modData("Learnsets", "reuniclus").learnset.chargebeam = ["8L1"];
		this.modData("Learnsets", "reuniclus").learnset.fierydance = ["8L1"];
		this.modData("Learnsets", "reuniclus").learnset.firepledge = ["8L1"];
		this.modData("Learnsets", "reuniclus").learnset.nuzzle = ["8L1"];
		this.modData("Learnsets", "reuniclus").learnset.razorshell = ["8L1"];
		this.modData("Learnsets", "reuniclus").learnset.shelltrap = ["8L1"];
		// Porygon-Z
		this.modData("Learnsets", "porygonz").learnset.bonemerang = ["8L1"];
		this.modData("Learnsets", "porygonz").learnset.hydropump = ["8L1"];
		this.modData("Learnsets", "porygonz").learnset.mudshot = ["8L1"];
		this.modData("Learnsets", "porygonz").learnset.sandtomb = ["8L1"];
		this.modData("Learnsets", "porygonz").learnset.shoreup = ["8L1"];
		this.modData("Learnsets", "porygonz").learnset.surf = ["8L1"];
		this.modData("Learnsets", "porygonz").learnset.whirlpool = ["8L1"];
		// Floette
		this.modData("Learnsets", "floette").learnset.burnup = ["8L1"];
		this.modData("Learnsets", "floette").learnset.coreenforcer = ["8L1"];
		this.modData("Learnsets", "floette").learnset.dragondance = ["8L1"];
		this.modData("Learnsets", "floette").learnset.dynamaxcannon = ["8L1"];
		this.modData("Learnsets", "floette").learnset.ember = ["8L1"];
		this.modData("Learnsets", "floette").learnset.overheat = ["8L1"];
		this.modData("Learnsets", "floette").learnset.pyroball = ["8L1"];
		// Karrablast
		this.modData("Learnsets", "karrablast").learnset.petalblizzard = ["8L1"];
		this.modData("Learnsets", "karrablast").learnset.rockpolish = ["8L1"];
		this.modData("Learnsets", "karrablast").learnset.sandstorm = ["8L1"];
		this.modData("Learnsets", "karrablast").learnset.seedbomb = ["8L1"];
		this.modData("Learnsets", "karrablast").learnset.stealthrock = ["8L1"];
		this.modData("Learnsets", "karrablast").learnset.watergun = ["8L1"];
		this.modData("Learnsets", "karrablast").learnset.woodhammer = ["8L1"];
		// Vanilluxe
		this.modData("Learnsets", "vanilluxe").learnset.doublehit = ["8L1"];
		this.modData("Learnsets", "vanilluxe").learnset.dragonpulse = ["8L1"];
		this.modData("Learnsets", "vanilluxe").learnset.roaroftime = ["8L1"];
		this.modData("Learnsets", "vanilluxe").learnset.twister = ["8L1"];
  }
};
