export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['MetaMons', 'Gen 8 MetaMons', 'Gen 7 MetaMons'],
	},
	init() {
		/* Gen 7 MetaMons*/
		   this.modData("Learnsets", "altaria").learnset.bravebird = ["8L1"];
		   this.modData("Learnsets", "altaria").learnset.liquidation = ["8L1"];
		   this.modData("Learnsets", "altaria").learnset.surf = ["8L1"];
		   this.modData("Learnsets", "altaria").learnset.thunder = ["8L1"];
		   this.modData("Learnsets", "altaria").learnset.thunderbolt = ["8L1"];
		   this.modData("Learnsets", "altaria").learnset.wish = ["8L1"];

		   this.modData("Learnsets", "ampharos").learnset.dazzlinggleam = ["8L1"];
		   this.modData("Learnsets", "ampharos").learnset.moonblast = ["8L1"];
		   this.modData("Learnsets", "ampharos").learnset.moonlight = ["8L1"];

		   this.modData("Learnsets", "archeops").learnset.airslash = ["8L1"];
		   this.modData("Learnsets", "archeops").learnset.flamethrower = ["8L1"];
		   this.modData("Learnsets", "archeops").learnset.rockslidegen7 = ["8L1"];
		   this.modData("Learnsets", "archeops").learnset.superpower = ["8L1"];

		this.modData("Learnsets", "aurorus").learnset.iciclecrashgen7 = ["8L1"];

		   this.modData("Learnsets", "avalugg").learnset.rockslidegen7 = ["8L1"];
		   this.modData("Learnsets", "avalugg").learnset.slackoff = ["8L1"];
		   this.modData("Learnsets", "avalugg").learnset.superpower = ["8L1"];
		   this.modData("Learnsets", "avalugg").learnset.iciclecrashgen7 = ["8L1"];

		   this.modData("Learnsets", "banette").learnset.bulkup = ["8L1"];
		   this.modData("Learnsets", "banette").learnset.drainpunch = ["8L1"];
		   this.modData("Learnsets", "banette").learnset.memento = ["8L1"];
		   this.modData("Learnsets", "banette").learnset.shadowclawgen7 = ["8L1"];

		   this.modData("Learnsets", "bronzong").learnset.energyball = ["8L1"];
		   this.modData("Learnsets", "bronzong").learnset.explosiongen7 = ["8L1"];
		   this.modData("Learnsets", "bronzong").learnset.healbell = ["8L1"];
		   this.modData("Learnsets", "bronzong").learnset.icebeam = ["8L1"];
		   this.modData("Learnsets", "bronzong").learnset.rockslidegen7 = ["8L1"];

		   this.modData("Learnsets", "decidueye").learnset.shadowclaw = ["8L1"];
		   this.modData("Learnsets", "decidueye").learnset.thousandarrows = ["8L1"];
		   this.modData("Learnsets", "decidueye").learnset.windshackle = ["8L1"];

		   this.modData("Learnsets", "delphox").learnset.focusblast = ["8L1"];
		   this.modData("Learnsets", "delphox").learnset.uturn = ["8L1"];

		   this.modData("Learnsets", "drampa").learnset.playroughgen7 = ["8L1"];
		   this.modData("Learnsets", "drampa").learnset.rockslidegen7 = ["8L1"];

		   this.modData("Learnsets", "electrode").learnset.darkpulse = ["8L1"];
		   this.modData("Learnsets", "electrode").learnset.explosiongen7 = ["8L1"];
		   this.modData("Learnsets", "electrode").learnset.knockoff = ["8L1"];
		   this.modData("Learnsets", "electrode").learnset.nastyplot = ["8L1"];
		   this.modData("Learnsets", "electrode").learnset.pursuit = ["8L1"];
		   this.modData("Learnsets", "electrode").learnset.zingzap = ["8L1"];

		   this.modData("Learnsets", "exeggutor").learnset.explosiongen7 = ["8L1"];
		   this.modData("Learnsets", "exeggutor").learnset.weatherball = ["8L1"];

		   this.modData("Learnsets", "golemalola").learnset.haze = ["8L1"];
		   this.modData("Learnsets", "golemalola").learnset.triattack = ["8L1"];
		   this.modData("Learnsets", "golemalola").learnset.rockslidegen7 = ["8L1"];

		   this.modData("Learnsets", "linoone").learnset.bulldoze = ["8L1"];
		   this.modData("Learnsets", "linoone").learnset.coil = ["8L1"];
		   this.modData("Learnsets", "linoone").learnset.fakeout = ["8L1"];
		   this.modData("Learnsets", "linoone").learnset.nastyplot = ["8L1"];
		   this.modData("Learnsets", "linoone").learnset.playroughgen7 = ["8L1"];
		   this.modData("Learnsets", "linoone").learnset.shadowclawgen7 = ["8L1"];
		   this.modData("Learnsets", "linoone").learnset.uturn = ["8L1"];

		   this.modData("Learnsets", "mawile").learnset.bugbuzz = ["8L1"];
		   this.modData("Learnsets", "mawile").learnset.rockslide = ["8L1"];
		   this.modData("Learnsets", "mawile").learnset.strengthsap = ["8L1"];
		   this.modData("Learnsets", "mawile").learnset.leechlife = ["8L1"];
		   this.modData("Learnsets", "mawile").learnset.uturn = ["8L1"];

		   this.modData("Learnsets", "medicham").learnset.rockslidegen7 = ["8L1"];

		   this.modData("Learnsets", "mothim").learnset.auraspheregen7 = ["8L1"];
		   this.modData("Learnsets", "mothim").learnset.knockoff = ["8L1"];
		   this.modData("Learnsets", "mothim").learnset.leechlife = ["8L1"];
		   this.modData("Learnsets", "mothim").learnset.psyshock = ["8L1"];
		   this.modData("Learnsets", "mothim").learnset.seedbomb = ["8L1"];
		   this.modData("Learnsets", "mothim").learnset.sludgebomb = ["8L1"];
		   this.modData("Learnsets", "mothim").learnset.zenheadbutt = ["8L1"];

		   this.modData("Learnsets", "rapidash").learnset.earthpower = ["8L1"];
		   this.modData("Learnsets", "rapidash").learnset.extremespeed = ["8L1"];
		   this.modData("Learnsets", "rapidash").learnset.uturn = ["8L1"];

		   this.modData("Learnsets", "rotomfrost").learnset.freezedry = ["8L1"];
		   this.modData("Learnsets", "rotomfrost").learnset.icebeam = ["8L1"];

		   this.modData("Learnsets", "scolipede").learnset.fellstingergen7 = ["8L1"];
		   this.modData("Learnsets", "scolipede").learnset.gunkshot = ["8L1"];
		   this.modData("Learnsets", "scolipede").learnset.knockoff = ["8L1"];
		   this.modData("Learnsets", "scolipede").learnset.leechlife = ["8L1"];
		   this.modData("Learnsets", "scolipede").learnset.rockslidegen7 = ["8L1"];
		   this.modData("Learnsets", "scolipede").learnset.suckerpunch = ["8L1"];

		   this.modData("Learnsets", "swampert").learnset.rockslidegen7 = ["8L1"];

		   this.modData("Learnsets", "swellow").learnset.bulkup = ["8L1"];

   	   this.modData("Learnsets", "throh").learnset.rockslidegen7 = ["8L1"];

		   this.modData("Learnsets", "turtonator").learnset.shelltrapgen7 = ["8L1"];
		   this.modData("Learnsets", "turtonator").learnset.spikes = ["8L1"];
		   this.modData("Learnsets", "turtonator").learnset.spikyshield = ["8L1"];

		   this.modData("Learnsets", "typenull").learnset.flamethrower = ["8L1"];
		   this.modData("Learnsets", "typenull").learnset.highhorsepower = ["8L1"];
		   this.modData("Learnsets", "typenull").learnset.liquidation = ["8L1"];
		   this.modData("Learnsets", "typenull").learnset.nightslash = ["8L1"];
		   this.modData("Learnsets", "typenull").learnset.rockslidegen7 = ["8L1"];
		   this.modData("Learnsets", "typenull").learnset.surf = ["8L1"];
		   this.modData("Learnsets", "typenull").learnset.voltswitch = ["8L1"];

		   this.modData("Learnsets", "tyrantrum").learnset.dragonrush = ["8L1"];
		   this.modData("Learnsets", "tyrantrum").learnset.rockslidegen7 = ["8L1"];
		   this.modData("Learnsets", "tyrantrum").learnset.swordsdance = ["8L1"];
		   this.modData("Learnsets", "tyrantrum").learnset.wildcharge = ["8L1"];

		   this.modData("Learnsets", "zoroark").learnset.bulkup = ["8L1"];
		   this.modData("Learnsets", "zoroark").learnset.shadowsneak = ["8L1"];
		   this.modData("Learnsets", "zoroark").learnset.shadowclaw = ["8L1"];

		delete this.modData('Learnsets', 'altaria').learnset.earthquake;
		delete this.modData('Learnsets', 'altaria').learnset.fireblast;
		delete this.modData('Learnsets', 'altaria').learnset.flamethrower;
		delete this.modData('Learnsets', 'altaria').learnset.heatwave;

		delete this.modData('Learnsets', 'aurorus').learnset.iciclecrash;

		delete this.modData('Learnsets', 'altaria').learnset.iciclecrash;

		delete this.modData('Learnsets', 'archeops').learnset.headsmash;

		delete this.modData('Learnsets', 'banette').learnset.shadowclaw;

		delete this.modData('Learnsets', 'bronzong').learnset.explosion;

		delete this.modData('Learnsets', 'decidueye').learnset.bravebird;

		delete this.modData('Learnsets', 'drampa').learnset.playrough;

		delete this.modData('Learnsets', 'electrode').learnset.explosion;

		delete this.modData('Learnsets', 'exeggutor').learnset.explosion;

		delete this.modData('Learnsets', 'linoone').learnset.bellydrum;
		delete this.modData('Learnsets', 'linoone').learnset.playrough;

		delete this.modData('Learnsets', 'medicham').learnset.fakeout;

		delete this.modData('Learnsets', 'pheromosa').learnset.blizzard;
		delete this.modData('Learnsets', 'pheromosa').learnset.drillrun;
		delete this.modData('Learnsets', 'pheromosa').learnset.icebeam;

		delete this.modData('Learnsets', 'rotomfrost').learnset.willowisp;

		delete this.modData('Learnsets', 'scolipede').learnset.gyroball;
		delete this.modData('Learnsets', 'scolipede').learnset.swordsdance;

		delete this.modData('Learnsets', 'swellow').learnset.boomburst;

		delete this.modData('Learnsets', 'turtonator').learnset.shellsmash;
		delete this.modData('Learnsets', 'turtonator').learnset.shelltrap;

		delete this.modData('Learnsets', 'typenull').learnset.rest;

		/* Gen 8 MetaMons*/
		this.modData("Learnsets", "whimsicott").learnset.bodypress = ["8L1"];
		this.modData("Learnsets", "whimsicott").learnset.synthesis = ["8L1"];
		this.modData("Learnsets", "whimsicott").learnset.reflect = ["8L1"];

		this.modData("Learnsets", "sandslash").learnset.shoreup = ["8L1"];
		this.modData("Learnsets", "sandslash").learnset.spikyshield = ["8L1"];

		this.modData("Learnsets", "bastiodon").learnset.steelbeam = ["8L1"];
		this.modData("Learnsets", "bastiodon").learnset.bodypress = ["8L1"];
		this.modData("Learnsets", "bastiodon").learnset.spikes = ["8L1"];
		this.modData("Learnsets", "bastiodon").learnset.explosion = ["8L1"];
		this.modData("Learnsets", "bastiodon").learnset.meteorbeam = ["8L1"];

		this.modData("Learnsets", "kingler").learnset.waterfall = ["8L1"];
		this.modData("Learnsets", "kingler").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "kingler").learnset.icepunch = ["8L1"];
		this.modData("Learnsets", "kingler").learnset.superpower = ["8L1"];
		this.modData("Learnsets", "kingler").learnset.rockslide = ["8L1"];

		this.modData("Learnsets", "ariados").learnset.bulkup = ["8L1"];
		this.modData("Learnsets", "ariados").learnset.calmmind = ["8L1"];
		this.modData("Learnsets", "ariados").learnset.dracometeor = ["8L1"];
		this.modData("Learnsets", "ariados").learnset.dragonclaw = ["8L1"];
		this.modData("Learnsets", "ariados").learnset.dragonpulse = ["8L1"];
		this.modData("Learnsets", "ariados").learnset.dragonrush = ["8L1"];
		this.modData("Learnsets", "ariados").learnset.dragontail = ["8L1"];
		this.modData("Learnsets", "ariados").learnset.memento = ["8L1"];
		this.modData("Learnsets", "ariados").learnset.partingshot = ["8L1"];
		this.modData("Learnsets", "ariados").learnset.outrage = ["8L1"];
		this.modData("Learnsets", "ariados").learnset.scaleshot = ["8L1"];
		this.modData("Learnsets", "ariados").learnset.spikes = ["8L1"];
		this.modData("Learnsets", "ariados").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "ariados").learnset.taunt = ["8L1"];
		this.modData("Learnsets", "ariados").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "ariados").learnset.megahorn = ["8L1"];
		this.modData("Learnsets", "ariados").learnset.pursuit = ["8L1"];
		this.modData("Learnsets", "ariados").learnset.refresh = ["8L1"];
		this.modData("Learnsets", "ariados").learnset.bugbuzz = ["8L1"];

		this.modData("Learnsets", "salazzle").learnset.acidrain = ["8L1"];
		this.modData("Learnsets", "salazzle").learnset.aerialace = ["8L1"];
		this.modData("Learnsets", "salazzle").learnset.bounce = ["8L1"];
		this.modData("Learnsets", "salazzle").learnset.defog = ["8L1"];
		this.modData("Learnsets", "salazzle").learnset.hurricane = ["8L1"];
		this.modData("Learnsets", "salazzle").learnset.uturn = ["8L1"];

		this.modData("Learnsets", "slowbrogalar").learnset.crabhammer = ["8L1"];
		this.modData("Learnsets", "slowbrogalar").learnset.gunkshot = ["8L1"];

		this.modData("Learnsets", "sableye").learnset.healbell = ["8L1"];
		this.modData("Learnsets", "sableye").learnset.spikes = ["8L1"];

		this.modData("Learnsets", "grapploct").learnset.aquajet = ["8L1"];
		this.modData("Learnsets", "grapploct").learnset.beatup = ["8L1"];
		this.modData("Learnsets", "grapploct").learnset.bite = ["8L1"];
		this.modData("Learnsets", "grapploct").learnset.crunch = ["8L1"];
		this.modData("Learnsets", "grapploct").learnset.darkestlariat = ["8L1"];
		this.modData("Learnsets", "grapploct").learnset.darkpulse = ["8L1"];
		this.modData("Learnsets", "grapploct").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "grapploct").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "grapploct").learnset.lifedew = ["8L1"];
		this.modData("Learnsets", "grapploct").learnset.machpunch = ["8L1"];
		this.modData("Learnsets", "grapploct").learnset.scald = ["8L1"];
		this.modData("Learnsets", "grapploct").learnset.swordsdance = ["8L1"];

		this.modData("Learnsets", "arcanine").learnset.stealthrock = ["8L1"];
		this.modData("Learnsets", "arcanine").learnset.earthquake = ["8L1"];

		this.modData("Learnsets", "tauros").learnset.headcharge = ["8L1"];
		this.modData('Learnsets', 'tauros').learnset.triattack = ["8L1"];

		this.modData("Learnsets", "eelektross").learnset.zingzap = ["8L1"];
		this.modData("Learnsets", "eelektross").learnset.recover = ["8L1"];
		this.modData("Learnsets", "eelektross").learnset.copycatblast = ["8L1"];

		this.modData("Learnsets", "tsareena").learnset.poltergeist = ["8L1"];
		this.modData("Learnsets", "tsareena").learnset.spiritshackle = ["8L1"];

		this.modData("Learnsets", "perrserker").learnset.bulletpunch = ["8L1"];
		this.modData("Learnsets", "perrserker").learnset.shadowsneak = ["8L1"];
		this.modData("Learnsets", "perrserker").learnset.poltergeist = ["8L1"];
		this.modData("Learnsets", "perrserker").learnset.knockoff = ["8L1"];

		this.modData("Learnsets", "sylveon").learnset.rudeparting = ["8L1"];
		this.modData("Learnsets", "sylveon").learnset.fakeout = ["8L1"];
		this.modData("Learnsets", "sylveon").learnset.discharge = ["8L1"];
		this.modData("Learnsets", "sylveon").learnset.risingvoltage = ["8L1"];
		this.modData("Learnsets", "sylveon").learnset.nuzzle = ["8L1"];
		this.modData("Learnsets", "sylveon").learnset.thunderwave = ["8L1"];

		this.modData("Learnsets", "persianalola").learnset.iceshard = ["8L1"];
		this.modData("Learnsets", "persianalola").learnset.tripleaxel = ["8L1"];

		this.modData("Learnsets", "mantine").learnset.moonblast = ["8L1"];
		this.modData("Learnsets", "mantine").learnset.flipturn = ["8L1"];

		this.modData("Learnsets", "druddigon").learnset.bodypress = ["8L1"];
		this.modData("Learnsets", "druddigon").learnset.gyroball = ["8L1"];
		this.modData("Learnsets", "druddigon").learnset.heavyslam = ["8L1"];
		this.modData("Learnsets", "druddigon").learnset.irondefense = ["8L1"];
		this.modData("Learnsets", "druddigon").learnset.metalburst = ["8L1"];
		this.modData("Learnsets", "druddigon").learnset.spikes = ["8L1"];
		this.modData("Learnsets", "duraludon").learnset.focusblast = ["8L1"];
		this.modData("Learnsets", "duraludon").learnset.aurasphere = ["8L1"];
		this.modData("Learnsets", "duraludon").learnset.taunt = ["8L1"];

		this.modData("Learnsets", "stunfisk").learnset.nuzzle = ["8L1"];
		this.modData("Learnsets", "stunfisk").learnset.paraboliccharge = ["8L1"];
		this.modData("Learnsets", "stunfisk").learnset.thundercage = ["8L1"];
		this.modData("Learnsets", "stunfisk").learnset.voltswitch = ["8L1"];
		this.modData("Learnsets", "stunfisk").learnset.whirlwind = ["8L1"];
		this.modData('Learnsets', 'stunfisk').learnset.wish = ["8L1"];

		this.modData("Learnsets", "houndoom").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "houndoom").learnset.flareblitz = ["8L1"];
		this.modData("Learnsets", "houndoom").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "houndoom").learnset.darkestlariat = ["8L1"];
		this.modData("Learnsets", "houndoom").learnset.firelash = ["8L1"];
		this.modData("Learnsets", "houndoom").learnset.bulkup = ["8L1"];

		this.modData("Learnsets", "espeon").learnset.heatwave = ["8L1"];

		this.modData("Learnsets", "emolga").learnset.stealthrock = ["8L1"];
		this.modData("Learnsets", "emolga").learnset.accelerock = ["8L1"];
		this.modData("Learnsets", "emolga").learnset.stoneedge = ["8L1"];
		this.modData("Learnsets", "emolga").learnset.plasmafists = ["8L1"];

		this.modData("Learnsets", "toxicroak").learnset.refresh = ["8L1"];
		this.modData("Learnsets", "toxicroak").learnset.liquidation = ["8L1"];
		this.modData("Learnsets", "toxicroak").learnset.aquajet = ["8L1"];
		this.modData("Learnsets", "toxicroak").learnset.closecombat = ["8L1"];

		this.modData("Learnsets", "granbull").learnset.wish = ["8L1"];

		this.modData("Learnsets", "eldegoss").learnset.wish = ["8L1"];
		this.modData("Learnsets", "eldegoss").learnset.teleport = ["8L1"];
		this.modData("Learnsets", "eldegoss").learnset.bodypress = ["8L1"];
		this.modData("Learnsets", "eldegoss").learnset.aurasphere = ["8L1"];
		this.modData("Learnsets", "eldegoss").learnset.focusblast = ["8L1"];
		this.modData('Learnsets', 'eldegoss').learnset.spore = ["8L1"];

		this.modData("Learnsets", "guzzlord").learnset.gunkshot = ["8L1"];
		this.modData("Learnsets", "guzzlord").learnset.toxicspikes = ["8L1"];
		this.modData("Learnsets", "guzzlord").learnset.bulkup = ["8L1"];
		this.modData("Learnsets", "guzzlord").learnset.nastyplot = ["8L1"];
		this.modData("Learnsets", "guzzlord").learnset.stuffcheeks = ["8L1"];
		this.modData("Learnsets", "guzzlord").learnset.recycle = ["8L1"];

		this.modData("Learnsets", "necrozma").learnset.ironhead = ["8L1"];
		this.modData("Learnsets", "necrozma").learnset.flashcannon = ["8L1"];
		this.modData("Learnsets", "necrozma").learnset.steelbeem = ["8L1"];

		this.modData("Learnsets", "entei").learnset.bravebird = ["8L1"];
		this.modData("Learnsets", "entei").learnset.hurricane = ["8L1"];
		this.modData("Learnsets", "entei").learnset.airslash = ["8L1"];
		this.modData("Learnsets", "entei").learnset.defog = ["8L1"];

		this.modData('Learnsets', 'abomasnow').learnset.iciclecrash = ["8L1"];

		this.modData("Learnsets", "xatu").learnset.darkpulse = ["8L1"];
		this.modData("Learnsets", "xatu").learnset.hurricane = ["8L1"];

		this.modData("Learnsets", "jellicent").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "jellicent").learnset.knockoff = ["8L1"];

		this.modData("Learnsets", "gigalith").learnset.shoreup = ["8L1"];
		this.modData("Learnsets", "gigalith").learnset.thunderbolt = ["8L1"];
		this.modData("Learnsets", "gigalith").learnset.diamondstorm = ["8L1"];

		this.modData("Learnsets", "florges").learnset.playrough = ["8L1"];
		this.modData("Learnsets", "florges").learnset.spiritbreak = ["8L1"];
		this.modData("Learnsets", "florges").learnset.grassyglide = ["8L1"];
		this.modData("Learnsets", "florges").learnset.leechseed = ["8L1"];
		this.modData("Learnsets", "florges").learnset.highhorsepower = ["8L1"];
		this.modData("Learnsets", "florges").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "florges").learnset.rockslide = ["8L1"];
		this.modData("Learnsets", "florges").learnset.bulkup = ["8L1"];
		this.modData("Learnsets", "florges").learnset.trickroom = ["8L1"];
		this.modData("Learnsets", "florges").learnset.teleport = ["8L1"];

		this.modData("Learnsets", "sunflora").learnset.sludgewave = ["8L1"];
		this.modData("Learnsets", "sunflora").learnset.weatherball = ["8L1"];
		this.modData("Learnsets", "sunflora").learnset.toxicspikes = ["8L1"];
		this.modData("Learnsets", "sunflora").learnset.knockoff = ["8L1"];

		this.modData("Learnsets", "frogadier").learnset.gunkshot = ["8L1"];
		this.modData("Learnsets", "frogadier").learnset.defog = ["8L1"];
		this.modData("Learnsets", "frogadier").learnset.junglehealing = ["8L1"];
		this.modData("Learnsets", "frogadier").learnset.stompingtantrum = ["8L1"];
		this.modData("Learnsets", "frogadier").learnset.moonlight = ["8L1"];

		this.modData("Learnsets", "articuno").learnset.dracometeor = ["8L1"];
		this.modData("Learnsets", "articuno").learnset.dragonpulse = ["8L1"];
		this.modData("Learnsets", "articuno").learnset.dragontail = ["8L1"];
		this.modData("Learnsets", "articuno").learnset.heatwave = ["8L1"];

		this.modData("Learnsets", "passimian").learnset.stoneedge = ["8L1"];
		this.modData("Learnsets", "passimian").learnset.accelerock = ["8L1"];
		this.modData("Learnsets", "passimian").learnset.stompingtantrum = ["8L1"];

		delete this.modData('Learnsets', 'jellicent').learnset.recover;
		delete this.modData('Learnsets', 'jellicent').learnset.strengthsap;

		delete this.modData('Learnsets', 'florges').learnset.wish;
		delete this.modData('Learnsets', 'florges').learnset.synthesis;

		delete this.modData('Learnsets', 'necrozma').learnset.autotmize;
		delete this.modData('Learnsets', 'necrozma').learnset.moonlight;
		delete this.modData('Learnsets', 'necrozma').learnset.morningsun;

		delete this.modData('Learnsets', 'entei').learnset.calmmind;
		delete this.modData('Learnsets', 'entei').learnset.eruption;

		delete this.modData('Learnsets', 'guzzlord').learnset.crunch;
		delete this.modData('Learnsets', 'guzzlord').learnset.bite;
		delete this.modData('Learnsets', 'guzzlord').learnset.darkpulse;
		delete this.modData('Learnsets', 'guzzlord').learnset.lashout;
		delete this.modData('Learnsets', 'guzzlord').learnset.brutalswing;
		delete this.modData('Learnsets', 'guzzlord').learnset.fling;
		delete this.modData('Learnsets', 'guzzlord').learnset.payback;
		delete this.modData('Learnsets', 'guzzlord').learnset.snarl;
		delete this.modData('Learnsets', 'guzzlord').learnset.thief;

		delete this.modData('Learnsets', 'tauros').learnset.earthquake;
		delete this.modData('Learnsets', 'tauros').learnset.highhorsepower;
		delete this.modData('Learnsets', 'tauros').learnset.closecombat;

		delete this.modData('Learnsets', 'kingler').learnset.rocktomb;
		delete this.modData('Learnsets', 'kingler').learnset.stompingtantrum;

		delete this.modData('Learnsets', 'salazzle').learnset.ember;
		delete this.modData('Learnsets', 'salazzle').learnset.fireblast;
		delete this.modData('Learnsets', 'salazzle').learnset.flameburst;
		delete this.modData('Learnsets', 'salazzle').learnset.flamecharge;
		delete this.modData('Learnsets', 'salazzle').learnset.flamethrower;
		delete this.modData('Learnsets', 'salazzle').learnset.flareblitz;
		delete this.modData('Learnsets', 'salazzle').learnset.heatwave;
		delete this.modData('Learnsets', 'salazzle').learnset.incinerate;
		delete this.modData('Learnsets', 'salazzle').learnset.overheat;
		delete this.modData('Learnsets', 'salazzle').learnset.willowisp;

		delete this.modData('Learnsets', 'ariados').learnset.poisonjab;
		delete this.modData('Learnsets', 'ariados').learnset.poisonsting;
		delete this.modData('Learnsets', 'ariados').learnset.sludgebomb;
		delete this.modData('Learnsets', 'ariados').learnset.crosspoison;
		delete this.modData('Learnsets', 'ariados').learnset.venomdrench;
		delete this.modData('Learnsets', 'ariados').learnset.venoshock;
		delete this.modData('Learnsets', 'ariados').learnset.toxicthread;

		delete this.modData('Learnsets', 'abomasnow').learnset.swordsdance;

		/* Gen 9 MetaMons*/
		   this.modData("Learnsets", "bellossom").learnset.thunderwave = ["8L1"];
		this.modData("Learnsets", "bellossom").learnset.thunderbolt = ["8L1"];
		this.modData("Learnsets", "bellossom").learnset.voltswitch = ["8L1"];
		this.modData("Learnsets", "bellossom").learnset.mysticalfire = ["8L1"];

		this.modData("Learnsets", "camerupt").learnset.spikes = ["8L1"];
		this.modData("Learnsets", "camerupt").learnset.taunt = ["8L1"];
		this.modData("Learnsets", "camerupt").learnset.magmastorm = ["8L1"];

		this.modData("Learnsets", "dragalge").learnset.psychic = ["8L1"];
		this.modData("Learnsets", "dragalge").learnset.psyshock = ["8L1"];
		this.modData("Learnsets", "dragalge").learnset.teleport = ["8L1"];
		this.modData("Learnsets", "dragalge").learnset.morningsun = ["8L1"];

		this.modData("Learnsets", "lapras").learnset.recover = ["8L1"];
		this.modData("Learnsets", "lapras").learnset.haze = ["8L1"];
		this.modData("Learnsets", "lapras").learnset.wish = ["8L1"];
		this.modData("Learnsets", "lapras").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "lapras").learnset.aquajet = ["8L1"];
		this.modData("Learnsets", "lapras").learnset.icespinner = ["8L1"];
		this.modData("Learnsets", "lapras").learnset.rapidspin = ["8L1"];
		this.modData("Learnsets", "lapras").learnset.yawn = ["8L1"];
		this.modData("Learnsets", "lapras").learnset.aquaring = ["8L1"];
		this.modData("Learnsets", "lapras").learnset.withdraw = ["8L1"];

		this.modData("Learnsets", "boltund").learnset.spectralfang = ["8L1"];
		this.modData("Learnsets", "boltund").learnset.zingzap = ["8L1"];
		this.modData("Learnsets", "boltund").learnset.shadowsneak = ["8L1"];
		this.modData("Learnsets", "boltund").learnset.shadowball = ["8L1"];
		this.modData("Learnsets", "boltund").learnset.hex = ["8L1"];
		this.modData("Learnsets", "boltund").learnset.ominouswind = ["8L1"];
		this.modData("Learnsets", "boltund").learnset.curse = ["8L1"];
		this.modData("Learnsets", "boltund").learnset.destinybond = ["8L1"];
		this.modData("Learnsets", "boltund").learnset.willowisp = ["8L1"];
		this.modData("Learnsets", "boltund").learnset.moonblast = ["8L1"];
		this.modData("Learnsets", "boltund").learnset.icefang = ["8L1"];
		this.modData("Learnsets", "boltund").learnset.uturn = ["8L1"];

		this.modData("Learnsets", "sudowoodo").learnset.knockoff = ["8L1"];

		this.modData("Learnsets", "mesprit").learnset.swordsdance = ["8L1"];
		this.modData("Learnsets", "mesprit").learnset.closecombat = ["8L1"];
		this.modData("Learnsets", "mesprit").learnset.psychicfangs = ["8L1"];
		this.modData("Learnsets", "mesprit").learnset.focusblast = ["8L1"];
		this.modData("Learnsets", "mesprit").learnset.vacuumwave = ["8L1"];

		this.modData("Learnsets", "froslass").learnset.rapidspin = ["8L1"];
		this.modData("Learnsets", "froslass").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "froslass").learnset.dazzlinggleam = ["8L1"];
		this.modData("Learnsets", "froslass").learnset.flashcannon = ["8L1"];
		this.modData("Learnsets", "froslass").learnset.whirlwind = ["8L1"];
		this.modData("Learnsets", "froslass").learnset.liquidation = ["8L1"];

		this.modData("Learnsets", "beedrill").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "beedrill").learnset.spikes = ["8L1"];

		this.modData("Learnsets", "liepard").learnset.synchronoise = ["8L1"];
		this.modData("Learnsets", "liepard").learnset.sludgewave = ["8L1"];
		this.modData("Learnsets", "liepard").learnset.sludgebomb = ["8L1"];
		this.modData("Learnsets", "liepard").learnset.gunkshot = ["8L1"];
		this.modData("Learnsets", "liepard").learnset.poisonjab = ["8L1"];

		this.modData("Learnsets", "emboar").learnset.outrage = ["8L1"];
		this.modData("Learnsets", "emboar").learnset.dragonpulse = ["8L1"];
		this.modData("Learnsets", "emboar").learnset.dracometeor = ["8L1"];
		this.modData("Learnsets", "emboar").learnset.dragondance = ["8L1"];
		this.modData("Learnsets", "emboar").learnset.dragonrush = ["8L1"];
		this.modData("Learnsets", "emboar").learnset.dragonclaw = ["8L1"];
		this.modData("Learnsets", "emboar").learnset.swordsdance = ["8L1"];
		this.modData("Learnsets", "emboar").learnset.beatup = ["8L1"];
		this.modData("Learnsets", "emboar").learnset.defendorder = ["8L1"];
		this.modData("Learnsets", "emboar").learnset.slackoff = ["8L1"];
		this.modData("Learnsets", "emboar").learnset.outrage = ["8L1"];
		this.modData("Learnsets", "emboar").learnset.bulletpunch = ["8L1"];
		this.modData("Learnsets", "emboar").learnset.machpunch = ["8L1"];

		this.modData("Learnsets", "alcremie").learnset.teleport = ["8L1"];
		this.modData("Learnsets", "alcremie").learnset.scald = ["8L1"];
		this.modData("Learnsets", "alcremie").learnset.hydropump = ["8L1"];
		this.modData("Learnsets", "alcremie").learnset.surf = ["8L1"];
		this.modData("Learnsets", "alcremie").learnset.whirlpool = ["8L1"];
		this.modData("Learnsets", "alcremie").learnset.rapidspin = ["8L1"];
		this.modData("Learnsets", "alcremie").learnset.heartswap = ["8L1"];
		this.modData("Learnsets", "alcremie").learnset.moonblast = ["8L1"];

		this.modData("Learnsets", "copperajah").learnset.toxic = ["8L1"];
		this.modData("Learnsets", "copperajah").learnset.swordsdance = ["8L1"];

		this.modData("Learnsets", "gogoat").learnset.axekick = ["8L1"];
		this.modData("Learnsets", "gogoat").learnset.headsmash = ["8L1"];
		this.modData("Learnsets", "gogoat").learnset.highhorsepower = ["8L1"];
		this.modData("Learnsets", "gogoat").learnset.icespinner = ["8L1"];
		this.modData("Learnsets", "gogoat").learnset.jumpkick = ["8L1"];
		this.modData("Learnsets", "gogoat").learnset.lowkick = ["8L1"];
		this.modData("Learnsets", "gogoat").learnset.rocktomb = ["8L1"];
		this.modData("Learnsets", "gogoat").learnset.stoneedge = ["8L1"];
		this.modData("Learnsets", "gogoat").learnset.superpower = ["8L1"];
		this.modData("Learnsets", "gogoat").learnset.woodhammer = ["8L1"];

		this.modData("Learnsets", "ironthorns").learnset.steelbeam = ["8L1"];
		this.modData("Learnsets", "ironthorns").learnset.meteormash = ["8L1"];
		this.modData("Learnsets", "ironthorns").learnset.discharge = ["8L1"];
		this.modData("Learnsets", "ironthorns").learnset.thunderpunch = ["8L1"];
		this.modData("Learnsets", "ironthorns").learnset.outrage = ["8L1"];
		this.modData("Learnsets", "ironthorns").learnset.hammerarm = ["8L1"];
		this.modData("Learnsets", "ironthorns").learnset.flashcannon = ["8L1"];

		this.modData("Learnsets", "oricorio").learnset.bravebird = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.snowscape = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.weatherball = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.dragondance = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.lunardance = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.petaldance = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.fierydance = ["8L1"];

	   this.modData("Learnsets", "golbat").learnset.ironhead = ["8L1"];
		this.modData("Learnsets", "golbat").learnset.flashcannon = ["8L1"];	
		this.modData("Learnsets", "golbat").learnset.steelbeam = ["8L1"];			

		this.modData("Learnsets", "wochien").learnset.stickyweb = ["8L1"];	
		this.modData("Learnsets", "wochien").learnset.sappyseed = ["8L1"];	
		this.modData("Learnsets", "wochien").learnset.infestation = ["8L1"];	
		this.modData("Learnsets", "wochien").learnset.spikyshield = ["8L1"];	
		this.modData("Learnsets", "wochien").learnset.nightshade = ["8L1"];	

		this.modData("Learnsets", "mudsdale").learnset.thunderouskick = ["8L1"];

		this.modData("Learnsets", "accelgor").learnset.liquidation = ["8L1"];
		this.modData("Learnsets", "accelgor").learnset.waterfall = ["8L1"];
		this.modData("Learnsets", "accelgor").learnset.aquajet = ["8L1"];
		this.modData("Learnsets", "accelgor").learnset.hydropump = ["8L1"];
		this.modData("Learnsets", "accelgor").learnset.scald = ["8L1"];
		this.modData("Learnsets", "accelgor").learnset.poisonjab = ["8L1"];
		this.modData("Learnsets", "accelgor").learnset.nastyplot = ["8L1"];

		this.modData("Learnsets", "dachsbun").learnset.flamethrower = ["8L1"];
		this.modData("Learnsets", "dachsbun").learnset.fireblast = ["8L1"];
		this.modData("Learnsets", "dachsbun").learnset.mysticalfire = ["8L1"];
		this.modData("Learnsets", "dachsbun").learnset.overheat = ["8L1"];
		this.modData("Learnsets", "dachsbun").learnset.burnup = ["8L1"];
		this.modData("Learnsets", "dachsbun").learnset.firespin = ["8L1"];
		this.modData("Learnsets", "dachsbun").learnset.willowisp = ["8L1"];
		this.modData("Learnsets", "dachsbun").learnset.moonblast = ["8L1"];
		
		this.modData("Learnsets", "lickilicky").learnset.chillyreception = ["8L1"];

		delete this.modData('Learnsets', 'bellossom').learnset.sleeppowder;

		delete this.modData('Learnsets', 'dragalge').learnset.dracometeor;
		delete this.modData('Learnsets', 'dragalge').learnset.dragonpulse;
		delete this.modData('Learnsets', 'dragalge').learnset.dragontail;
		delete this.modData('Learnsets', 'dragalge').learnset.outrage;
		delete this.modData('Learnsets', 'dragalge').learnset.scaleshot;
		delete this.modData('Learnsets', 'dragalge').learnset.twister;

		delete this.modData('Learnsets', 'sudowoodo').learnset.earthquake;

		delete this.modData('Learnsets', 'froslass').learnset.icefang;
		delete this.modData('Learnsets', 'froslass').learnset.reflect;
		delete this.modData('Learnsets', 'froslass').learnset.lightscreen;

		delete this.modData('Learnsets', 'liepard').learnset.nastyplot;

		delete this.modData('Learnsets', 'exeggutoralola').learnset.flamethrower;
		delete this.modData('Learnsets', 'exeggutoralola').learnset.hypnosis;
		delete this.modData('Learnsets', 'exeggutoralola').learnset.sleeppowder;

		delete this.modData('Learnsets', 'ironthorns').learnset.blizzard;
		delete this.modData('Learnsets', 'ironthorns').learnset.powergem;
		delete this.modData('Learnsets', 'ironthorns').learnset.rockblast;
	},


};
