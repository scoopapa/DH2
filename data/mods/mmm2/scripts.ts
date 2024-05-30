export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['MMM2'],
	},
	
	init() {
		// Armaldo
		this.modData("Learnsets", "armaldo").learnset.leafblade = ["9L1"];
		this.modData("Learnsets", "armaldo").learnset.stoneaxe = ["9L1"];
		this.modData("Learnsets", "armaldo").learnset.synthesis = ["9L1"];
		// Weezing-Galar
		this.modData("Learnsets", "weezinggalar").learnset.moonlight = ["9L1"];
		// Camerupt
		this.modData("Learnsets", "camerupt").learnset.slackoff = ["9L1"];
		// Corsola
		this.modData("Learnsets", "corsola").learnset.chillyreception = ["9L1"];
		this.modData("Learnsets", "corsola").learnset.flipturn = ["9L1"];
		this.modData("Learnsets", "corsola").learnset.flashcannon = ["9L1"];
		this.modData("Learnsets", "corsola").learnset.switcheroo = ["9L1"];
		this.modData("Learnsets", "corsola").learnset.dazzlinggleam = ["9L1"];
		this.modData("Learnsets", "corsola").learnset.sparklingaria = ["9L1"];
		delete this.modData('Learnsets', 'corsola').learnset.ingrain;
		// Zebstrika
		this.modData("Learnsets", "zebstrika").learnset.calmmind = ["9L1"];
		this.modData("Learnsets", "zebstrika").learnset.dazzlinggleam = ["9L1"];
		this.modData("Learnsets", "zebstrika").learnset.grassknot = ["9L1"];
		this.modData("Learnsets", "zebstrika").learnset.paraboliccharge = ["9L1"];
		// Medicham
		this.modData("Learnsets", "medicham").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "medicham").learnset.stoneedge = ["9L1"];
		this.modData("Learnsets", "medicham").learnset.tripleaxel = ["9L1"];
		this.modData("Learnsets", "medicham").learnset.photongeyser = ["9L1"];
		// Delibird
		this.modData("Learnsets", "delibird").learnset.bulkup = ["9L1"];
		// Moltres
		this.modData("Learnsets", "moltres").learnset.taunt = ["9L1"];
		this.modData("Learnsets", "moltres").learnset.mysticalfire = ["9L1"];
		this.modData("Learnsets", "moltres").learnset.defog = ["9L1"];
		// Poliwrath
		this.modData("Learnsets", "poliwrath").learnset.aurasphere = ["9L1"];
		this.modData("Learnsets", "poliwrath").learnset.calmmind = ["9L1"];
		this.modData("Learnsets", "poliwrath").learnset.flipturn = ["9L1"];
		// Granbull
		this.modData("Learnsets", "granbull").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "granbull").learnset.spikes = ["9L1"];
		this.modData("Learnsets", "granbull").learnset.assurance = ["9L1"];
		this.modData("Learnsets", "granbull").learnset.jawlock = ["9L1"];
		this.modData("Learnsets", "granbull").learnset.foulplay = ["9L1"];
		this.modData("Learnsets", "granbull").learnset.toxic = ["9L1"];
		this.modData("Learnsets", "granbull").learnset.spiritbreak = ["9L1"];
		this.modData("Learnsets", "granbull").learnset.partingshot = ["9L1"];
		this.modData("Learnsets", "granbull").learnset.switcheroo = ["9L1"];
		this.modData("Learnsets", "granbull").learnset.healbell = ["9L1"];
		this.modData("Learnsets", "granbull").learnset.memento = ["9L1"];
		this.modData("Learnsets", "granbull").learnset.topsyturvy = ["9L1"];
		this.modData("Learnsets", "granbull").learnset.spikyshield = ["9L1"];
		delete this.modData('Learnsets', 'granbull').learnset.trailblaze;
		delete this.modData('Learnsets', 'granbull').learnset.curse;
		delete this.modData('Learnsets', 'granbull').learnset.lowkick;
		delete this.modData('Learnsets', 'granbull').learnset.closecombat;
		delete this.modData('Learnsets', 'granbull').learnset.brickbreak;
		delete this.modData('Learnsets', 'snubbull').learnset.trailblaze;
		delete this.modData('Learnsets', 'snubbull').learnset.curse;
		delete this.modData('Learnsets', 'snubbull').learnset.lowkick;
		delete this.modData('Learnsets', 'snubbull').learnset.closecombat;
		delete this.modData('Learnsets', 'snubbull').learnset.brickbreak;
		// Cubchoo
		this.modData("Learnsets", "cubchoo").learnset.flashcannon = ["9L1"];
		this.modData("Learnsets", "cubchoo").learnset.ironhead = ["9L1"];
		this.modData("Learnsets", "cubchoo").learnset.steelbeam = ["9L1"];
		// Landorus
		this.modData("Learnsets", "landorus").learnset.bulletpunch = ["9L1"];
		this.modData("Learnsets", "landorus").learnset.irontail = ["9L1"];
		this.modData("Learnsets", "landorus").learnset.meteormash = ["9L1"];
		this.modData("Learnsets", "landorus").learnset.ironhead = ["9L1"];
		this.modData("Learnsets", "landorus").learnset.steelbeam = ["9L1"];
		this.modData("Learnsets", "landorus").learnset.defog = ["9L1"];
		this.modData("Learnsets", "landorus").learnset.voltswitch = ["9L1"];
		this.modData("Learnsets", "landorus").learnset.honeclaws = ["9L1"];
		// Dhelmise
		this.modData("Learnsets", "dhelmise").learnset.aquajet = ["9L1"];
		this.modData("Learnsets", "dhelmise").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "dhelmise").learnset.hornleech = ["9L1"];
		// Dedenne
		this.modData("Learnsets", "dedenne").learnset.mysticalpower = ["9L1"];
		this.modData("Learnsets", "dedenne").learnset.mysticalfire = ["9L1"];
		// Garbodor
		this.modData("Learnsets", "garbodor").learnset.dragonpulse = ["9L1"];
		this.modData("Learnsets", "garbodor").learnset.dracometeor = ["9L1"];
		this.modData("Learnsets", "garbodor").learnset.dragonclaw = ["9L1"];
		this.modData("Learnsets", "garbodor").learnset.dragontail = ["9L1"];
		this.modData("Learnsets", "garbodor").learnset.outrage = ["9L1"];
		// Tsareena
		this.modData("Learnsets", "tsareena").learnset.bulkup = ["9L1"];
		this.modData("Learnsets", "tsareena").learnset.leechseed = ["9L1"];
		this.modData("Learnsets", "tsareena").learnset.mistyexplosion = ["9L1"];
		// Marowak-Alola-Totem
		this.modData("Learnsets", "marowakalolatotem").learnset.blazingtorque = ["9L1"];
		this.modData("Learnsets", "marowakalolatotem").learnset.poltergeist = ["9L1"];
		this.modData("Learnsets", "marowakalolatotem").learnset.shadowsneak = ["9L1"];
		this.modData("Learnsets", "marowakalolatotem").learnset.partingshot = ["9L1"];
		this.modData("Learnsets", "marowakalolatotem").learnset.shoreup = ["9L1"];
		delete this.modData('Learnsets', 'marowakalolatotem').learnset.irondefense;
		delete this.modData('Learnsets', 'cubone').learnset.irondefense;
		// Chandelure
		this.modData("Learnsets", "chandelure").learnset.flashcannon = ["9L1"];
		this.modData("Learnsets", "chandelure").learnset.moonlight = ["9L1"];
		this.modData("Learnsets", "chandelure").learnset.storedpower = ["9L1"];
		this.modData("Learnsets", "chandelure").learnset.voltswitch = ["9L1"];
		this.modData("Learnsets", "chandelure").learnset.thunderbolt = ["9L1"];
		this.modData("Learnsets", "chandelure").learnset.sludgewave = ["9L1"];
		this.modData("Learnsets", "chandelure").learnset.sludgebomb = ["9L1"];
		this.modData("Learnsets", "chandelure").learnset.thunderwave = ["9L1"];
		this.modData("Learnsets", "chandelure").learnset.corrosivegas = ["9L1"];
		delete this.modData('Learnsets', 'chandelure').learnset.burningjealousy;
		delete this.modData('Learnsets', 'chandelure').learnset.ember;
		delete this.modData('Learnsets', 'chandelure').learnset.fireblast;
		delete this.modData('Learnsets', 'chandelure').learnset.firespin;
		delete this.modData('Learnsets', 'chandelure').learnset.flameburst;
		delete this.modData('Learnsets', 'chandelure').learnset.flamecharge;
		delete this.modData('Learnsets', 'chandelure').learnset.flamethrower;
		delete this.modData('Learnsets', 'chandelure').learnset.flareblitz;
		delete this.modData('Learnsets', 'chandelure').learnset.heatwave;
		delete this.modData('Learnsets', 'chandelure').learnset.incinerate;
		delete this.modData('Learnsets', 'chandelure').learnset.inferno;
		delete this.modData('Learnsets', 'chandelure').learnset.mysticalfire;
		delete this.modData('Learnsets', 'chandelure').learnset.overheat;
		delete this.modData('Learnsets', 'chandelure').learnset.sunnyday;
		delete this.modData('Learnsets', 'chandelure').learnset.temperflare;
		delete this.modData('Learnsets', 'lampent').learnset.burningjealousy;
		delete this.modData('Learnsets', 'lampent').learnset.ember;
		delete this.modData('Learnsets', 'lampent').learnset.fireblast;
		delete this.modData('Learnsets', 'lampent').learnset.firespin;
		delete this.modData('Learnsets', 'lampent').learnset.flameburst;
		delete this.modData('Learnsets', 'lampent').learnset.flamecharge;
		delete this.modData('Learnsets', 'lampent').learnset.flamethrower;
		delete this.modData('Learnsets', 'lampent').learnset.flareblitz;
		delete this.modData('Learnsets', 'lampent').learnset.heatwave;
		delete this.modData('Learnsets', 'lampent').learnset.incinerate;
		delete this.modData('Learnsets', 'lampent').learnset.inferno;
		delete this.modData('Learnsets', 'lampent').learnset.mysticalfire;
		delete this.modData('Learnsets', 'lampent').learnset.overheat;
		delete this.modData('Learnsets', 'lampent').learnset.sunnyday;
		delete this.modData('Learnsets', 'lampent').learnset.temperflare;
		delete this.modData('Learnsets', 'litwick').learnset.burningjealousy;
		delete this.modData('Learnsets', 'litwick').learnset.ember;
		delete this.modData('Learnsets', 'litwick').learnset.fireblast;
		delete this.modData('Learnsets', 'litwick').learnset.firespin;
		delete this.modData('Learnsets', 'litwick').learnset.flameburst;
		delete this.modData('Learnsets', 'litwick').learnset.flamecharge;
		delete this.modData('Learnsets', 'litwick').learnset.flamethrower;
		delete this.modData('Learnsets', 'litwick').learnset.flareblitz;
		delete this.modData('Learnsets', 'litwick').learnset.heatwave;
		delete this.modData('Learnsets', 'litwick').learnset.incinerate;
		delete this.modData('Learnsets', 'litwick').learnset.inferno;
		delete this.modData('Learnsets', 'litwick').learnset.mysticalfire;
		delete this.modData('Learnsets', 'litwick').learnset.overheat;
		delete this.modData('Learnsets', 'litwick').learnset.sunnyday;
		delete this.modData('Learnsets', 'litwick').learnset.temperflare;
		// Naganadel
		this.modData("Learnsets", "naganadel").learnset.foulplay = ["9L1"];
		this.modData("Learnsets", "naganadel").learnset.knockoff = ["9L1"];
		delete this.modData('Learnsets', 'naganadel').learnset.nastyplot;
		// Dodrio
		this.modData("Learnsets", "dodrio").learnset.uturn = ["9L1"];
		delete this.modData('Learnsets', 'dodrio').learnset.swordsdance;
		delete this.modData('Learnsets', 'doduo').learnset.swordsdance;
		// Regice
		this.modData("Learnsets", "regice").learnset.toxic = ["9L1"];
		this.modData("Learnsets", "regice").learnset.recover = ["9L1"];
		this.modData("Learnsets", "regice").learnset.freezedry = ["9L1"];
		// Lokix
		this.modData("Learnsets", "lokix").learnset.psychicfangs = ["9L1"];
		this.modData("Learnsets", "lokix").learnset.closecombat = ["9L1"];
		this.modData("Learnsets", "lokix").learnset.spikes = ["9L1"];
		this.modData("Learnsets", "lokix").learnset.highhorsepower = ["9L1"];
		this.modData("Learnsets", "lokix").learnset.ironhead = ["9L1"];
		this.modData("Learnsets", "lokix").learnset.meteormash = ["9L1"];
		// Miraidon
		this.modData("Learnsets", "miraidon").learnset.defog = ["9L1"];
		this.modData("Learnsets", "miraidon").learnset.morningsun = ["9L1"];
		this.modData("Learnsets", "miraidon").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "miraidon").learnset.flamethrower = ["9L1"];
		this.modData("Learnsets", "miraidon").learnset.lavaplume = ["9L1"];
		this.modData("Learnsets", "miraidon").learnset.switcheroo = ["9L1"];
		this.modData("Learnsets", "miraidon").learnset.darkpulse = ["9L1"];
		delete this.modData('Learnsets', 'miraidon').learnset.electrodrift;
		delete this.modData('Learnsets', 'miraidon').learnset.overheat;
		// Spheal
		this.modData("Learnsets", "spheal").learnset.judgment = ["9L1"];
		this.modData("Learnsets", "spheal").learnset.upperhand = ["9L1"];
		this.modData("Learnsets", "spheal").learnset.scald = ["9L1"];
		this.modData("Learnsets", "spheal").learnset.takeheart = ["9L1"];
		this.modData("Learnsets", "spheal").learnset.icehammer = ["9L1"];
		this.modData("Learnsets", "spheal").learnset.comeuppance = ["9L1"];
		this.modData("Learnsets", "spheal").learnset.earthpower = ["9L1"];
		this.modData("Learnsets", "spheal").learnset.bouncybubble = ["9L1"];
		this.modData("Learnsets", "spheal").learnset.auroraveil = ["9L1"];
		this.modData("Learnsets", "spheal").learnset.leechseed = ["9L1"];
		this.modData("Learnsets", "spheal").learnset.lastrespects = ["9L1"];
		// Drapion
		this.modData("Learnsets", "drapion").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "drapion").learnset.attackorder = ["9L1"];
		this.modData("Learnsets", "drapion").learnset.crabhammer = ["9L1"];
		this.modData("Learnsets", "drapion").learnset.ceaselessedge = ["9L1"];
		this.modData("Learnsets", "drapion").learnset.strengthsap = ["9L1"];
		this.modData("Learnsets", "drapion").learnset.suckerpunch = ["9L1"];
		this.modData("Learnsets", "drapion").learnset.aquacutter = ["9L1"];
		this.modData("Learnsets", "drapion").learnset.stoneedge = ["9L1"];
		this.modData("Learnsets", "drapion").learnset.spikes = ["9L1"];
		this.modData("Learnsets", "drapion").learnset.junglehealing = ["9L1"];
		this.modData("Learnsets", "drapion").learnset.firstimpression = ["9L1"];
		this.modData("Learnsets", "drapion").learnset.crosschop = ["9L1"];
		this.modData("Learnsets", "drapion").learnset.drillrun = ["9L1"];
		this.modData("Learnsets", "drapion").learnset.psychocut = ["9L1"];
		this.modData("Learnsets", "drapion").learnset.leafblade = ["9L1"];
		this.modData("Learnsets", "drapion").learnset.shadowclaw = ["9L1"];
		this.modData("Learnsets", "drapion").learnset.willowisp = ["9L1"];
		this.modData("Learnsets", "drapion").learnset.thunderwave = ["9L1"];
		this.modData("Learnsets", "drapion").learnset.switcheroo = ["9L1"];
		this.modData("Learnsets", "drapion").learnset.gunkshot = ["9L1"];
		delete this.modData('Learnsets', 'drapion').learnset.earthquake;
		delete this.modData('Learnsets', 'drapion').learnset.fellstinger;
		delete this.modData('Learnsets', 'skorupi').learnset.earthquake;
		delete this.modData('Learnsets', 'skorupi').learnset.fellstinger;
		// Duraludon
		this.modData("Learnsets", "duraludon").learnset.focuspunch = ["9L1"];
		// Sandaconda
		this.modData("Learnsets", "sandaconda").learnset.astonish = ["9L1"];
		this.modData("Learnsets", "sandaconda").learnset.curse = ["9L1"];
		this.modData("Learnsets", "sandaconda").learnset.grudge = ["9L1"];
		this.modData("Learnsets", "sandaconda").learnset.hex = ["9L1"];
		this.modData("Learnsets", "sandaconda").learnset.shadowball = ["9L1"];
		this.modData("Learnsets", "sandaconda").learnset.shadowbone = ["9L1"];
		this.modData("Learnsets", "sandaconda").learnset.shadowsneak = ["9L1"];
		this.modData("Learnsets", "sandaconda").learnset.spiritshackle = ["9L1"];
		this.modData("Learnsets", "sandaconda").learnset.gunkshot = ["9L1"];
		this.modData("Learnsets", "sandaconda").learnset.psychicfangs = ["9L1"];
		this.modData("Learnsets", "sandaconda").learnset.aquatail = ["9L1"];
		this.modData("Learnsets", "sandaconda").learnset.irontail = ["9L1"];
		this.modData("Learnsets", "sandaconda").learnset.dragontail = ["9L1"];
	},
};
