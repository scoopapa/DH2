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
		   this.modData("Learnsets", "altaria").learnset.bravebird = ["9L1"];
		   this.modData("Learnsets", "altaria").learnset.liquidation = ["9L1"];
		   this.modData("Learnsets", "altaria").learnset.surf = ["9L1"];
		   this.modData("Learnsets", "altaria").learnset.thunder = ["9L1"];
		   this.modData("Learnsets", "altaria").learnset.thunderbolt = ["9L1"];
		   this.modData("Learnsets", "altaria").learnset.wish = ["9L1"];

		   this.modData("Learnsets", "ampharos").learnset.dazzlinggleam = ["9L1"];
		   this.modData("Learnsets", "ampharos").learnset.moonblast = ["9L1"];
		   this.modData("Learnsets", "ampharos").learnset.moonlight = ["9L1"];

		   this.modData("Learnsets", "archeops").learnset.airslash = ["9L1"];
		   this.modData("Learnsets", "archeops").learnset.flamethrower = ["9L1"];
		   this.modData("Learnsets", "archeops").learnset.rockslidegen7 = ["9L1"];
		   this.modData("Learnsets", "archeops").learnset.superpower = ["9L1"];

		this.modData("Learnsets", "aurorus").learnset.iciclecrashgen7 = ["9L1"];

		   this.modData("Learnsets", "avalugg").learnset.rockslidegen7 = ["9L1"];
		   this.modData("Learnsets", "avalugg").learnset.slackoff = ["9L1"];
		   this.modData("Learnsets", "avalugg").learnset.superpower = ["9L1"];
		   this.modData("Learnsets", "avalugg").learnset.iciclecrashgen7 = ["9L1"];

		   this.modData("Learnsets", "banette").learnset.bulkup = ["9L1"];
		   this.modData("Learnsets", "banette").learnset.drainpunch = ["9L1"];
		   this.modData("Learnsets", "banette").learnset.memento = ["9L1"];
		   this.modData("Learnsets", "banette").learnset.shadowclawgen7 = ["9L1"];

		   this.modData("Learnsets", "bronzong").learnset.energyball = ["9L1"];
		   this.modData("Learnsets", "bronzong").learnset.explosiongen7 = ["9L1"];
		   this.modData("Learnsets", "bronzong").learnset.healbell = ["9L1"];
		   this.modData("Learnsets", "bronzong").learnset.icebeam = ["9L1"];
		   this.modData("Learnsets", "bronzong").learnset.rockslidegen7 = ["9L1"];

		   this.modData("Learnsets", "decidueye").learnset.shadowclaw = ["9L1"];
		   this.modData("Learnsets", "decidueye").learnset.thousandarrows = ["9L1"];
		   this.modData("Learnsets", "decidueye").learnset.windshackle = ["9L1"];

		   this.modData("Learnsets", "delphox").learnset.focusblast = ["9L1"];
		   this.modData("Learnsets", "delphox").learnset.uturn = ["9L1"];

		   this.modData("Learnsets", "drampa").learnset.playroughgen7 = ["9L1"];
		   this.modData("Learnsets", "drampa").learnset.rockslidegen7 = ["9L1"];

		   this.modData("Learnsets", "electrode").learnset.darkpulse = ["9L1"];
		   this.modData("Learnsets", "electrode").learnset.explosiongen7 = ["9L1"];
		   this.modData("Learnsets", "electrode").learnset.knockoff = ["9L1"];
		   this.modData("Learnsets", "electrode").learnset.nastyplot = ["9L1"];
		   this.modData("Learnsets", "electrode").learnset.pursuit = ["9L1"];
		   this.modData("Learnsets", "electrode").learnset.zingzap = ["9L1"];

		   this.modData("Learnsets", "exeggutor").learnset.explosiongen7 = ["9L1"];
		   this.modData("Learnsets", "exeggutor").learnset.weatherball = ["9L1"];

		   this.modData("Learnsets", "golemalola").learnset.haze = ["9L1"];
		   this.modData("Learnsets", "golemalola").learnset.triattack = ["9L1"];
		   this.modData("Learnsets", "golemalola").learnset.rockslidegen7 = ["9L1"];

		   this.modData("Learnsets", "linoone").learnset.bulldoze = ["9L1"];
		   this.modData("Learnsets", "linoone").learnset.coil = ["9L1"];
		   this.modData("Learnsets", "linoone").learnset.fakeout = ["9L1"];
		   this.modData("Learnsets", "linoone").learnset.nastyplot = ["9L1"];
		   this.modData("Learnsets", "linoone").learnset.playroughgen7 = ["9L1"];
		   this.modData("Learnsets", "linoone").learnset.shadowclawgen7 = ["9L1"];
		   this.modData("Learnsets", "linoone").learnset.uturn = ["9L1"];

		   this.modData("Learnsets", "mawile").learnset.bugbuzz = ["9L1"];
		   this.modData("Learnsets", "mawile").learnset.rockslide = ["9L1"];
		   this.modData("Learnsets", "mawile").learnset.strengthsap = ["9L1"];
		   this.modData("Learnsets", "mawile").learnset.leechlife = ["9L1"];
		   this.modData("Learnsets", "mawile").learnset.uturn = ["9L1"];

		   this.modData("Learnsets", "medicham").learnset.rockslidegen7 = ["9L1"];

		   this.modData("Learnsets", "mothim").learnset.auraspheregen7 = ["9L1"];
		   this.modData("Learnsets", "mothim").learnset.knockoff = ["9L1"];
		   this.modData("Learnsets", "mothim").learnset.leechlife = ["9L1"];
		   this.modData("Learnsets", "mothim").learnset.psyshock = ["9L1"];
		   this.modData("Learnsets", "mothim").learnset.seedbomb = ["9L1"];
		   this.modData("Learnsets", "mothim").learnset.sludgebomb = ["9L1"];
		   this.modData("Learnsets", "mothim").learnset.zenheadbutt = ["9L1"];

		   this.modData("Learnsets", "rapidash").learnset.earthpower = ["9L1"];
		   this.modData("Learnsets", "rapidash").learnset.extremespeed = ["9L1"];
		   this.modData("Learnsets", "rapidash").learnset.uturn = ["9L1"];

		   this.modData("Learnsets", "rotomfrost").learnset.freezedry = ["9L1"];
		   this.modData("Learnsets", "rotomfrost").learnset.icebeam = ["9L1"];

		   this.modData("Learnsets", "scolipede").learnset.fellstingergen7 = ["9L1"];
		   this.modData("Learnsets", "scolipede").learnset.gunkshot = ["9L1"];
		   this.modData("Learnsets", "scolipede").learnset.knockoff = ["9L1"];
		   this.modData("Learnsets", "scolipede").learnset.leechlife = ["9L1"];
		   this.modData("Learnsets", "scolipede").learnset.rockslidegen7 = ["9L1"];
		   this.modData("Learnsets", "scolipede").learnset.suckerpunch = ["9L1"];

		   this.modData("Learnsets", "swampert").learnset.rockslidegen7 = ["9L1"];

		   this.modData("Learnsets", "swellow").learnset.bulkup = ["9L1"];

   	   this.modData("Learnsets", "throh").learnset.rockslidegen7 = ["9L1"];

		   this.modData("Learnsets", "turtonator").learnset.shelltrapgen7 = ["9L1"];
		   this.modData("Learnsets", "turtonator").learnset.spikes = ["9L1"];
		   this.modData("Learnsets", "turtonator").learnset.spikyshield = ["9L1"];

		   this.modData("Learnsets", "typenull").learnset.flamethrower = ["9L1"];
		   this.modData("Learnsets", "typenull").learnset.highhorsepower = ["9L1"];
		   this.modData("Learnsets", "typenull").learnset.liquidation = ["9L1"];
		   this.modData("Learnsets", "typenull").learnset.nightslash = ["9L1"];
		   this.modData("Learnsets", "typenull").learnset.rockslidegen7 = ["9L1"];
		   this.modData("Learnsets", "typenull").learnset.surf = ["9L1"];
		   this.modData("Learnsets", "typenull").learnset.voltswitch = ["9L1"];

		   this.modData("Learnsets", "tyrantrum").learnset.dragonrush = ["9L1"];
		   this.modData("Learnsets", "tyrantrum").learnset.rockslidegen7 = ["9L1"];
		   this.modData("Learnsets", "tyrantrum").learnset.swordsdance = ["9L1"];
		   this.modData("Learnsets", "tyrantrum").learnset.wildcharge = ["9L1"];

		   this.modData("Learnsets", "zoroark").learnset.bulkup = ["9L1"];
		   this.modData("Learnsets", "zoroark").learnset.shadowsneak = ["9L1"];
		   this.modData("Learnsets", "zoroark").learnset.shadowclaw = ["9L1"];

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
		this.modData("Learnsets", "whimsicott").learnset.bodypress = ["9L1"];
		this.modData("Learnsets", "whimsicott").learnset.synthesis = ["9L1"];
		this.modData("Learnsets", "whimsicott").learnset.reflect = ["9L1"];

		this.modData("Learnsets", "sandslash").learnset.shoreup = ["9L1"];
		this.modData("Learnsets", "sandslash").learnset.spikyshield = ["9L1"];

		this.modData("Learnsets", "bastiodon").learnset.steelbeam = ["9L1"];
		this.modData("Learnsets", "bastiodon").learnset.bodypress = ["9L1"];
		this.modData("Learnsets", "bastiodon").learnset.spikes = ["9L1"];
		this.modData("Learnsets", "bastiodon").learnset.explosion = ["9L1"];
		this.modData("Learnsets", "bastiodon").learnset.meteorbeam = ["9L1"];

		this.modData("Learnsets", "kingler").learnset.waterfall = ["9L1"];
		this.modData("Learnsets", "kingler").learnset.flipturn = ["9L1"];
		this.modData("Learnsets", "kingler").learnset.icepunch = ["9L1"];
		this.modData("Learnsets", "kingler").learnset.superpower = ["9L1"];
		this.modData("Learnsets", "kingler").learnset.rockslide = ["9L1"];

		this.modData("Learnsets", "ariados").learnset.bulkup = ["9L1"];
		this.modData("Learnsets", "ariados").learnset.calmmind = ["9L1"];
		this.modData("Learnsets", "ariados").learnset.dracometeor = ["9L1"];
		this.modData("Learnsets", "ariados").learnset.dragonclaw = ["9L1"];
		this.modData("Learnsets", "ariados").learnset.dragonpulse = ["9L1"];
		this.modData("Learnsets", "ariados").learnset.dragonrush = ["9L1"];
		this.modData("Learnsets", "ariados").learnset.dragontail = ["9L1"];
		this.modData("Learnsets", "ariados").learnset.memento = ["9L1"];
		this.modData("Learnsets", "ariados").learnset.partingshot = ["9L1"];
		this.modData("Learnsets", "ariados").learnset.outrage = ["9L1"];
		this.modData("Learnsets", "ariados").learnset.scaleshot = ["9L1"];
		this.modData("Learnsets", "ariados").learnset.spikes = ["9L1"];
		this.modData("Learnsets", "ariados").learnset.skittersmack = ["9L1"];
		this.modData("Learnsets", "ariados").learnset.taunt = ["9L1"];
		this.modData("Learnsets", "ariados").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "ariados").learnset.megahorn = ["9L1"];
		this.modData("Learnsets", "ariados").learnset.pursuit = ["9L1"];
		this.modData("Learnsets", "ariados").learnset.refresh = ["9L1"];
		this.modData("Learnsets", "ariados").learnset.bugbuzz = ["9L1"];

		this.modData("Learnsets", "salazzle").learnset.acidrain = ["9L1"];
		this.modData("Learnsets", "salazzle").learnset.aerialace = ["9L1"];
		this.modData("Learnsets", "salazzle").learnset.bounce = ["9L1"];
		this.modData("Learnsets", "salazzle").learnset.defog = ["9L1"];
		this.modData("Learnsets", "salazzle").learnset.hurricane = ["9L1"];
		this.modData("Learnsets", "salazzle").learnset.uturn = ["9L1"];

		this.modData("Learnsets", "slowbrogalar").learnset.crabhammer = ["9L1"];
		this.modData("Learnsets", "slowbrogalar").learnset.gunkshot = ["9L1"];

		this.modData("Learnsets", "sableye").learnset.healbell = ["9L1"];
		this.modData("Learnsets", "sableye").learnset.spikes = ["9L1"];

		this.modData("Learnsets", "grapploct").learnset.aquajet = ["9L1"];
		this.modData("Learnsets", "grapploct").learnset.beatup = ["9L1"];
		this.modData("Learnsets", "grapploct").learnset.bite = ["9L1"];
		this.modData("Learnsets", "grapploct").learnset.crunch = ["9L1"];
		this.modData("Learnsets", "grapploct").learnset.darkestlariat = ["9L1"];
		this.modData("Learnsets", "grapploct").learnset.darkpulse = ["9L1"];
		this.modData("Learnsets", "grapploct").learnset.flipturn = ["9L1"];
		this.modData("Learnsets", "grapploct").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "grapploct").learnset.lifedew = ["9L1"];
		this.modData("Learnsets", "grapploct").learnset.machpunch = ["9L1"];
		this.modData("Learnsets", "grapploct").learnset.scald = ["9L1"];
		this.modData("Learnsets", "grapploct").learnset.swordsdance = ["9L1"];

		this.modData("Learnsets", "arcanine").learnset.stealthrock = ["9L1"];
		this.modData("Learnsets", "arcanine").learnset.earthquake = ["9L1"];

		this.modData("Learnsets", "tauros").learnset.headcharge = ["9L1"];
		this.modData('Learnsets', 'tauros').learnset.triattack = ["9L1"];

		this.modData("Learnsets", "eelektross").learnset.zingzap = ["9L1"];
		this.modData("Learnsets", "eelektross").learnset.recover = ["9L1"];
		this.modData("Learnsets", "eelektross").learnset.copycatblast = ["9L1"];

		this.modData("Learnsets", "tsareena").learnset.poltergeist = ["9L1"];
		this.modData("Learnsets", "tsareena").learnset.spiritshackle = ["9L1"];

		this.modData("Learnsets", "perrserker").learnset.bulletpunch = ["9L1"];
		this.modData("Learnsets", "perrserker").learnset.shadowsneak = ["9L1"];
		this.modData("Learnsets", "perrserker").learnset.poltergeist = ["9L1"];
		this.modData("Learnsets", "perrserker").learnset.knockoff = ["9L1"];

		this.modData("Learnsets", "sylveon").learnset.rudeparting = ["9L1"];
		this.modData("Learnsets", "sylveon").learnset.fakeout = ["9L1"];
		this.modData("Learnsets", "sylveon").learnset.discharge = ["9L1"];
		this.modData("Learnsets", "sylveon").learnset.risingvoltage = ["9L1"];
		this.modData("Learnsets", "sylveon").learnset.nuzzle = ["9L1"];
		this.modData("Learnsets", "sylveon").learnset.thunderwave = ["9L1"];

		this.modData("Learnsets", "persianalola").learnset.iceshard = ["9L1"];
		this.modData("Learnsets", "persianalola").learnset.tripleaxel = ["9L1"];

		this.modData("Learnsets", "mantine").learnset.moonblast = ["9L1"];
		this.modData("Learnsets", "mantine").learnset.flipturn = ["9L1"];

		this.modData("Learnsets", "druddigon").learnset.bodypress = ["9L1"];
		this.modData("Learnsets", "druddigon").learnset.gyroball = ["9L1"];
		this.modData("Learnsets", "druddigon").learnset.heavyslam = ["9L1"];
		this.modData("Learnsets", "druddigon").learnset.irondefense = ["9L1"];
		this.modData("Learnsets", "druddigon").learnset.metalburst = ["9L1"];
		this.modData("Learnsets", "druddigon").learnset.spikes = ["9L1"];
		this.modData("Learnsets", "duraludon").learnset.focusblast = ["9L1"];
		this.modData("Learnsets", "duraludon").learnset.aurasphere = ["9L1"];
		this.modData("Learnsets", "duraludon").learnset.taunt = ["9L1"];

		this.modData("Learnsets", "stunfisk").learnset.nuzzle = ["9L1"];
		this.modData("Learnsets", "stunfisk").learnset.paraboliccharge = ["9L1"];
		this.modData("Learnsets", "stunfisk").learnset.thundercage = ["9L1"];
		this.modData("Learnsets", "stunfisk").learnset.voltswitch = ["9L1"];
		this.modData("Learnsets", "stunfisk").learnset.whirlwind = ["9L1"];
		this.modData('Learnsets', 'stunfisk').learnset.wish = ["9L1"];

		this.modData("Learnsets", "houndoom").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "houndoom").learnset.flareblitz = ["9L1"];
		this.modData("Learnsets", "houndoom").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "houndoom").learnset.darkestlariat = ["9L1"];
		this.modData("Learnsets", "houndoom").learnset.firelash = ["9L1"];
		this.modData("Learnsets", "houndoom").learnset.bulkup = ["9L1"];

		this.modData("Learnsets", "espeon").learnset.heatwave = ["9L1"];

		this.modData("Learnsets", "emolga").learnset.stealthrock = ["9L1"];
		this.modData("Learnsets", "emolga").learnset.accelerock = ["9L1"];
		this.modData("Learnsets", "emolga").learnset.stoneedge = ["9L1"];
		this.modData("Learnsets", "emolga").learnset.plasmafists = ["9L1"];

		this.modData("Learnsets", "toxicroak").learnset.refresh = ["9L1"];
		this.modData("Learnsets", "toxicroak").learnset.liquidation = ["9L1"];
		this.modData("Learnsets", "toxicroak").learnset.aquajet = ["9L1"];
		this.modData("Learnsets", "toxicroak").learnset.closecombat = ["9L1"];

		this.modData("Learnsets", "granbull").learnset.wish = ["9L1"];

		this.modData("Learnsets", "eldegoss").learnset.wish = ["9L1"];
		this.modData("Learnsets", "eldegoss").learnset.teleport = ["9L1"];
		this.modData("Learnsets", "eldegoss").learnset.bodypress = ["9L1"];
		this.modData("Learnsets", "eldegoss").learnset.aurasphere = ["9L1"];
		this.modData("Learnsets", "eldegoss").learnset.focusblast = ["9L1"];
		this.modData('Learnsets', 'eldegoss').learnset.spore = ["9L1"];

		this.modData("Learnsets", "guzzlord").learnset.gunkshot = ["9L1"];
		this.modData("Learnsets", "guzzlord").learnset.toxicspikes = ["9L1"];
		this.modData("Learnsets", "guzzlord").learnset.bulkup = ["9L1"];
		this.modData("Learnsets", "guzzlord").learnset.nastyplot = ["9L1"];
		this.modData("Learnsets", "guzzlord").learnset.stuffcheeks = ["9L1"];
		this.modData("Learnsets", "guzzlord").learnset.recycle = ["9L1"];

		this.modData("Learnsets", "necrozma").learnset.ironhead = ["9L1"];
		this.modData("Learnsets", "necrozma").learnset.flashcannon = ["9L1"];
		this.modData("Learnsets", "necrozma").learnset.steelbeem = ["9L1"];

		this.modData("Learnsets", "entei").learnset.bravebird = ["9L1"];
		this.modData("Learnsets", "entei").learnset.hurricane = ["9L1"];
		this.modData("Learnsets", "entei").learnset.airslash = ["9L1"];
		this.modData("Learnsets", "entei").learnset.defog = ["9L1"];

		this.modData('Learnsets', 'abomasnow').learnset.iciclecrash = ["9L1"];

		this.modData("Learnsets", "xatu").learnset.darkpulse = ["9L1"];
		this.modData("Learnsets", "xatu").learnset.hurricane = ["9L1"];

		this.modData("Learnsets", "jellicent").learnset.flipturn = ["9L1"];
		this.modData("Learnsets", "jellicent").learnset.knockoff = ["9L1"];

		this.modData("Learnsets", "gigalith").learnset.shoreup = ["9L1"];
		this.modData("Learnsets", "gigalith").learnset.thunderbolt = ["9L1"];
		this.modData("Learnsets", "gigalith").learnset.diamondstorm = ["9L1"];

		this.modData("Learnsets", "florges").learnset.playrough = ["9L1"];
		this.modData("Learnsets", "florges").learnset.spiritbreak = ["9L1"];
		this.modData("Learnsets", "florges").learnset.grassyglide = ["9L1"];
		this.modData("Learnsets", "florges").learnset.leechseed = ["9L1"];
		this.modData("Learnsets", "florges").learnset.highhorsepower = ["9L1"];
		this.modData("Learnsets", "florges").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "florges").learnset.rockslide = ["9L1"];
		this.modData("Learnsets", "florges").learnset.bulkup = ["9L1"];
		this.modData("Learnsets", "florges").learnset.trickroom = ["9L1"];
		this.modData("Learnsets", "florges").learnset.teleport = ["9L1"];

		this.modData("Learnsets", "sunflora").learnset.sludgewave = ["9L1"];
		this.modData("Learnsets", "sunflora").learnset.weatherball = ["9L1"];
		this.modData("Learnsets", "sunflora").learnset.toxicspikes = ["9L1"];
		this.modData("Learnsets", "sunflora").learnset.knockoff = ["9L1"];

		this.modData("Learnsets", "frogadier").learnset.gunkshot = ["9L1"];
		this.modData("Learnsets", "frogadier").learnset.defog = ["9L1"];
		this.modData("Learnsets", "frogadier").learnset.junglehealing = ["9L1"];
		this.modData("Learnsets", "frogadier").learnset.stompingtantrum = ["9L1"];
		this.modData("Learnsets", "frogadier").learnset.moonlight = ["9L1"];

		this.modData("Learnsets", "articuno").learnset.dracometeor = ["9L1"];
		this.modData("Learnsets", "articuno").learnset.dragonpulse = ["9L1"];
		this.modData("Learnsets", "articuno").learnset.dragontail = ["9L1"];
		this.modData("Learnsets", "articuno").learnset.heatwave = ["9L1"];

		this.modData("Learnsets", "passimian").learnset.stoneedge = ["9L1"];
		this.modData("Learnsets", "passimian").learnset.accelerock = ["9L1"];
		this.modData("Learnsets", "passimian").learnset.stompingtantrum = ["9L1"];

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
		   this.modData("Learnsets", "bellossom").learnset.thunderwave = ["9L1"];
		this.modData("Learnsets", "bellossom").learnset.thunderbolt = ["9L1"];
		this.modData("Learnsets", "bellossom").learnset.voltswitch = ["9L1"];
		this.modData("Learnsets", "bellossom").learnset.mysticalfire = ["9L1"];

		this.modData("Learnsets", "camerupt").learnset.spikes = ["9L1"];
		this.modData("Learnsets", "camerupt").learnset.taunt = ["9L1"];
		this.modData("Learnsets", "camerupt").learnset.magmastorm = ["9L1"];

		this.modData("Learnsets", "dragalge").learnset.psychic = ["9L1"];
		this.modData("Learnsets", "dragalge").learnset.psyshock = ["9L1"];
		this.modData("Learnsets", "dragalge").learnset.teleport = ["9L1"];
		this.modData("Learnsets", "dragalge").learnset.morningsun = ["9L1"];

		this.modData("Learnsets", "lapras").learnset.recover = ["9L1"];
		this.modData("Learnsets", "lapras").learnset.haze = ["9L1"];
		this.modData("Learnsets", "lapras").learnset.wish = ["9L1"];
		this.modData("Learnsets", "lapras").learnset.flipturn = ["9L1"];
		this.modData("Learnsets", "lapras").learnset.aquajet = ["9L1"];
		this.modData("Learnsets", "lapras").learnset.icespinner = ["9L1"];
		this.modData("Learnsets", "lapras").learnset.rapidspin = ["9L1"];
		this.modData("Learnsets", "lapras").learnset.yawn = ["9L1"];
		this.modData("Learnsets", "lapras").learnset.aquaring = ["9L1"];
		this.modData("Learnsets", "lapras").learnset.withdraw = ["9L1"];

		this.modData("Learnsets", "boltund").learnset.spectralfang = ["9L1"];
		this.modData("Learnsets", "boltund").learnset.zingzap = ["9L1"];
		this.modData("Learnsets", "boltund").learnset.shadowsneak = ["9L1"];
		this.modData("Learnsets", "boltund").learnset.shadowball = ["9L1"];
		this.modData("Learnsets", "boltund").learnset.hex = ["9L1"];
		this.modData("Learnsets", "boltund").learnset.ominouswind = ["9L1"];
		this.modData("Learnsets", "boltund").learnset.curse = ["9L1"];
		this.modData("Learnsets", "boltund").learnset.destinybond = ["9L1"];
		this.modData("Learnsets", "boltund").learnset.willowisp = ["9L1"];
		this.modData("Learnsets", "boltund").learnset.moonblast = ["9L1"];
		this.modData("Learnsets", "boltund").learnset.icefang = ["9L1"];
		this.modData("Learnsets", "boltund").learnset.uturn = ["9L1"];

		this.modData("Learnsets", "sudowoodo").learnset.knockoff = ["9L1"];

		this.modData("Learnsets", "mesprit").learnset.swordsdance = ["9L1"];
		this.modData("Learnsets", "mesprit").learnset.closecombat = ["9L1"];
		this.modData("Learnsets", "mesprit").learnset.psychicfangs = ["9L1"];
		this.modData("Learnsets", "mesprit").learnset.focusblast = ["9L1"];
		this.modData("Learnsets", "mesprit").learnset.vacuumwave = ["9L1"];

		this.modData("Learnsets", "froslass").learnset.rapidspin = ["9L1"];
		this.modData("Learnsets", "froslass").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "froslass").learnset.dazzlinggleam = ["9L1"];
		this.modData("Learnsets", "froslass").learnset.flashcannon = ["9L1"];
		this.modData("Learnsets", "froslass").learnset.whirlwind = ["9L1"];
		this.modData("Learnsets", "froslass").learnset.liquidation = ["9L1"];

		this.modData("Learnsets", "beedrill").learnset.earthquake = ["9L1"];
		this.modData("Learnsets", "beedrill").learnset.spikes = ["9L1"];

		this.modData("Learnsets", "liepard").learnset.synchronoise = ["9L1"];
		this.modData("Learnsets", "liepard").learnset.sludgewave = ["9L1"];
		this.modData("Learnsets", "liepard").learnset.sludgebomb = ["9L1"];
		this.modData("Learnsets", "liepard").learnset.gunkshot = ["9L1"];
		this.modData("Learnsets", "liepard").learnset.poisonjab = ["9L1"];

		this.modData("Learnsets", "emboar").learnset.outrage = ["9L1"];
		this.modData("Learnsets", "emboar").learnset.dragonpulse = ["9L1"];
		this.modData("Learnsets", "emboar").learnset.dracometeor = ["9L1"];
		this.modData("Learnsets", "emboar").learnset.dragondance = ["9L1"];
		this.modData("Learnsets", "emboar").learnset.dragonrush = ["9L1"];
		this.modData("Learnsets", "emboar").learnset.dragonclaw = ["9L1"];
		this.modData("Learnsets", "emboar").learnset.swordsdance = ["9L1"];
		this.modData("Learnsets", "emboar").learnset.beatup = ["9L1"];
		this.modData("Learnsets", "emboar").learnset.defendorder = ["9L1"];
		this.modData("Learnsets", "emboar").learnset.slackoff = ["9L1"];
		this.modData("Learnsets", "emboar").learnset.outrage = ["9L1"];
		this.modData("Learnsets", "emboar").learnset.bulletpunch = ["9L1"];
		this.modData("Learnsets", "emboar").learnset.machpunch = ["9L1"];

		this.modData("Learnsets", "alcremie").learnset.teleport = ["9L1"];
		this.modData("Learnsets", "alcremie").learnset.scald = ["9L1"];
		this.modData("Learnsets", "alcremie").learnset.hydropump = ["9L1"];
		this.modData("Learnsets", "alcremie").learnset.surf = ["9L1"];
		this.modData("Learnsets", "alcremie").learnset.whirlpool = ["9L1"];
		this.modData("Learnsets", "alcremie").learnset.rapidspin = ["9L1"];
		this.modData("Learnsets", "alcremie").learnset.heartswap = ["9L1"];
		this.modData("Learnsets", "alcremie").learnset.moonblast = ["9L1"];

		this.modData("Learnsets", "copperajah").learnset.toxic = ["9L1"];
		this.modData("Learnsets", "copperajah").learnset.swordsdance = ["9L1"];

		this.modData("Learnsets", "gogoat").learnset.axekick = ["9L1"];
		this.modData("Learnsets", "gogoat").learnset.headsmash = ["9L1"];
		this.modData("Learnsets", "gogoat").learnset.highhorsepower = ["9L1"];
		this.modData("Learnsets", "gogoat").learnset.icespinner = ["9L1"];
		this.modData("Learnsets", "gogoat").learnset.jumpkick = ["9L1"];
		this.modData("Learnsets", "gogoat").learnset.lowkick = ["9L1"];
		this.modData("Learnsets", "gogoat").learnset.rocktomb = ["9L1"];
		this.modData("Learnsets", "gogoat").learnset.stoneedge = ["9L1"];
		this.modData("Learnsets", "gogoat").learnset.superpower = ["9L1"];
		this.modData("Learnsets", "gogoat").learnset.woodhammer = ["9L1"];

		this.modData("Learnsets", "ironthorns").learnset.steelbeam = ["9L1"];
		this.modData("Learnsets", "ironthorns").learnset.meteormash = ["9L1"];
		this.modData("Learnsets", "ironthorns").learnset.discharge = ["9L1"];
		this.modData("Learnsets", "ironthorns").learnset.thunderpunch = ["9L1"];
		this.modData("Learnsets", "ironthorns").learnset.outrage = ["9L1"];
		this.modData("Learnsets", "ironthorns").learnset.hammerarm = ["9L1"];
		this.modData("Learnsets", "ironthorns").learnset.flashcannon = ["9L1"];

		this.modData("Learnsets", "oricorio").learnset.bravebird = ["9L1"];
		this.modData("Learnsets", "oricorio").learnset.snowscape = ["9L1"];
		this.modData("Learnsets", "oricorio").learnset.weatherball = ["9L1"];
		this.modData("Learnsets", "oricorio").learnset.dragondance = ["9L1"];
		this.modData("Learnsets", "oricorio").learnset.lunardance = ["9L1"];
		this.modData("Learnsets", "oricorio").learnset.petaldance = ["9L1"];
		this.modData("Learnsets", "oricorio").learnset.fierydance = ["9L1"];

	   this.modData("Learnsets", "golbat").learnset.ironhead = ["9L1"];
		this.modData("Learnsets", "golbat").learnset.flashcannon = ["9L1"];	
		this.modData("Learnsets", "golbat").learnset.steelbeam = ["9L1"];			

		this.modData("Learnsets", "wochien").learnset.stickyweb = ["9L1"];	
		this.modData("Learnsets", "wochien").learnset.sappyseed = ["9L1"];	
		this.modData("Learnsets", "wochien").learnset.infestation = ["9L1"];	
		this.modData("Learnsets", "wochien").learnset.spikyshield = ["9L1"];	
		this.modData("Learnsets", "wochien").learnset.nightshade = ["9L1"];	

		this.modData("Learnsets", "mudsdale").learnset.thunderouskick = ["9L1"];

		this.modData("Learnsets", "accelgor").learnset.liquidation = ["9L1"];
		this.modData("Learnsets", "accelgor").learnset.waterfall = ["9L1"];
		this.modData("Learnsets", "accelgor").learnset.aquajet = ["9L1"];
		this.modData("Learnsets", "accelgor").learnset.hydropump = ["9L1"];
		this.modData("Learnsets", "accelgor").learnset.scald = ["9L1"];
		this.modData("Learnsets", "accelgor").learnset.poisonjab = ["9L1"];
		this.modData("Learnsets", "accelgor").learnset.nastyplot = ["9L1"];

		this.modData("Learnsets", "dachsbun").learnset.flamethrower = ["9L1"];
		this.modData("Learnsets", "dachsbun").learnset.fireblast = ["9L1"];
		this.modData("Learnsets", "dachsbun").learnset.mysticalfire = ["9L1"];
		this.modData("Learnsets", "dachsbun").learnset.overheat = ["9L1"];
		this.modData("Learnsets", "dachsbun").learnset.burnup = ["9L1"];
		this.modData("Learnsets", "dachsbun").learnset.firespin = ["9L1"];
		this.modData("Learnsets", "dachsbun").learnset.willowisp = ["9L1"];
		this.modData("Learnsets", "dachsbun").learnset.moonblast = ["9L1"];
		
		this.modData("Learnsets", "lickilicky").learnset.chillyreception = ["9L1"];

		this.modData("Learnsets", "stoutland").learnset.headcharge = ["9L1"];
		this.modData("Learnsets", "stoutland").learnset.quickattack = ["9L1"];

		this.modData("Learnsets", "glimmet").learnset.earthpower = ["9L1"];
		this.modData("Learnsets", "glimmet").learnset.calmmind = ["9L1"];
		this.modData("Learnsets", "glimmet").learnset.strengthsap = ["9L1"];
		this.modData("Learnsets", "glimmet").learnset.mortalspin = ["9L1"];

		this.modData("Learnsets", "beartic").learnset.mountaingale = ["9L1"];

		this.modData("Learnsets", "taurospaldeacombat").learnset.axekick = ["9L1"];
		this.modData("Learnsets", "taurospaldeacombat").learnset.swordsdance = ["9L1"];
		this.modData("Learnsets", "taurospaldeacombat").learnset.meteormash = ["9L1"];
		this.modData("Learnsets", "taurospaldeacombat").learnset.geargrind = ["9L1"];
    this.modData("Learnsets", "taurospaldeacombat").learnset.sacredsword = ["9L1"];
    this.modData("Learnsets", "taurospaldeacombat").learnset.crosschop = ["9L1"];
    this.modData("Learnsets", "taurospaldeacombat").learnset.ragingbullcombat = ["9L1"];

		this.modData("Learnsets", "taurospaldeablaze").learnset.ragingfury = ["9L1"];
    this.modData("Learnsets", "taurospaldeablaze").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "taurospaldeablaze").learnset.inferno = ["9L1"];
		this.modData("Learnsets", "taurospaldeablaze").learnset.jawlock = ["9L1"];
    this.modData("Learnsets", "taurospaldeablaze").learnset.honeclaws = ["9L1"];
		this.modData("Learnsets", "taurospaldeablaze").learnset.thousandwaves = ["9L1"];
		this.modData("Learnsets", "taurospaldeablaze").learnset.punishment = ["9L1"];
		this.modData("Learnsets", "taurospaldeablaze").learnset.darkestlariat = ["9L1"];
		this.modData("Learnsets", "taurospaldeablaze").learnset.throatchop = ["9L1"];
		this.modData("Learnsets", "taurospaldeablaze").learnset.destinybond = ["9L1"];
		this.modData("Learnsets", "taurospaldeablaze").learnset.taunt = ["9L1"];
		this.modData("Learnsets", "taurospaldeablaze").learnset.perishsong = ["9L1"];
    this.modData("Learnsets", "taurospaldeablaze").learnset.ragingbullblaze = ["9L1"];

		this.modData("Learnsets", "taurospaldeaaqua").learnset.headlongrush = ["9L1"];
		this.modData("Learnsets", "taurospaldeaaqua").learnset.icespinner = ["9L1"];
		this.modData("Learnsets", "taurospaldeaaqua").learnset.iciclecrash = ["9L1"];
		this.modData("Learnsets", "taurospaldeaaqua").learnset.iceshard = ["9L1"];
		this.modData("Learnsets", "taurospaldeaaqua").learnset.woodhammer = ["9L1"];
		this.modData("Learnsets", "taurospaldeaaqua").learnset.hornleech = ["9L1"];
		this.modData("Learnsets", "taurospaldeaaqua").learnset.milkdrink = ["9L1"];
		this.modData("Learnsets", "taurospaldeaaqua").learnset.seedbomb = ["9L1"];
		this.modData("Learnsets", "taurospaldeaaqua").learnset.bulletseed = ["9L1"];
		this.modData("Learnsets", "taurospaldeaaqua").learnset.aquaring = ["9L1"];
		this.modData("Learnsets", "taurospaldeaaqua").learnset.snowscape = ["9L1"];
		this.modData("Learnsets", "taurospaldeaaqua").learnset.leechseed = ["9L1"];
		this.modData("Learnsets", "taurospaldeaaqua").learnset.grassyterrain = ["9L1"];
		this.modData("Learnsets", "taurospaldeaaqua").learnset.recycle = ["9L1"];
		this.modData("Learnsets", "taurospaldeaaqua").learnset.amnesia = ["9L1"];
    this.modData("Learnsets", "taurospaldeaaqua").learnset.ragingbullaqua = ["9L1"];

		this.modData("Learnsets", "appletun").learnset.acidarmor = ["9L1"];
		this.modData("Learnsets", "appletun").learnset.clearsmog = ["9L1"];
		this.modData("Learnsets", "appletun").learnset.dragonbreath = ["9L1"];
		this.modData("Learnsets", "appletun").learnset.earthpower = ["9L1"];
		this.modData("Learnsets", "appletun").learnset.futuresight = ["9L1"];
		this.modData("Learnsets", "appletun").learnset.hex = ["9L1"];
		this.modData("Learnsets", "appletun").learnset.hypervoice = ["9L1"];
		this.modData("Learnsets", "appletun").learnset.sludgebomb = ["9L1"];
		this.modData("Learnsets", "appletun").learnset.sludgewave = ["9L1"];
		this.modData("Learnsets", "appletun").learnset.strengthsap = ["9L1"];
		this.modData("Learnsets", "appletun").learnset.toxic = ["9L1"];
		this.modData("Learnsets", "appletun").learnset.toxicspikes = ["9L1"];

		this.modData("Learnsets", "raticatealola").learnset.bellydrum = ["9L1"];
		this.modData("Learnsets", "raticatealola").learnset.bodypress = ["9L1"];
		this.modData("Learnsets", "raticatealola").learnset.brickbreak = ["9L1"];
    this.modData("Learnsets", "raticatealola").learnset.bulletseed = ["9L1"];
		this.modData("Learnsets", "raticatealola").learnset.feintattack = ["9L1"];
		this.modData("Learnsets", "raticatealola").learnset.playrough = ["9L1"];
		this.modData("Learnsets", "raticatealola").learnset.seedbomb = ["9L1"];
		
		this.modData("Learnsets", "milotic").learnset.acidarmor = ["9L1"];
		this.modData("Learnsets", "milotic").learnset.calmmind = ["9L1"];
		this.modData("Learnsets", "milotic").learnset.dracometeor = ["9L1"];
		this.modData("Learnsets", "milotic").learnset.dragonclaw = ["9L1"];
		this.modData("Learnsets", "milotic").learnset.gunkshot = ["9L1"];
		this.modData("Learnsets", "milotic").learnset.liquidation = ["9L1"];
		this.modData("Learnsets", "milotic").learnset.mortalspin = ["9L1"];
		this.modData("Learnsets", "milotic").learnset.outrage = ["9L1"];
		this.modData("Learnsets", "milotic").learnset.poisonjab = ["9L1"];
		this.modData("Learnsets", "milotic").learnset.sludgebomb = ["9L1"];
		this.modData("Learnsets", "milotic").learnset.sludgewave = ["9L1"];
		this.modData("Learnsets", "milotic").learnset.sparklingaria = ["9L1"];
		this.modData("Learnsets", "milotic").learnset.storedpower = ["9L1"];
		this.modData("Learnsets", "milotic").learnset.swordsdance = ["9L1"];
		this.modData("Learnsets", "milotic").learnset.toxic = ["9L1"];
		this.modData("Learnsets", "milotic").learnset.toxicspikes = ["9L1"];
		this.modData("Learnsets", "milotic").learnset.wavecrash = ["9L1"];
		
		this.modData("Learnsets", "staraptor").learnset.swordsdance = ["9L1"];
		this.modData("Learnsets", "staraptor").learnset.roost = ["9L1"];
		this.modData("Learnsets", "staraptor").learnset.defog = ["9L1"];

		delete this.modData('Learnsets', 'bellossom').learnset.sleeppowder;
		delete this.modData('Learnsets', 'gloom').learnset.sleeppowder;
		delete this.modData('Learnsets', 'oddish').learnset.sleeppowder;

		delete this.modData('Learnsets', 'dragalge').learnset.dracometeor;
		delete this.modData('Learnsets', 'dragalge').learnset.dragonpulse;
		delete this.modData('Learnsets', 'dragalge').learnset.dragontail;
		delete this.modData('Learnsets', 'dragalge').learnset.outrage;
		delete this.modData('Learnsets', 'dragalge').learnset.scaleshot;
		delete this.modData('Learnsets', 'dragalge').learnset.twister;
		delete this.modData('Learnsets', 'skrelp').learnset.dragonpulse;
		delete this.modData('Learnsets', 'skrelp').learnset.dragontail;
		delete this.modData('Learnsets', 'skrelp').learnset.outrage;
		delete this.modData('Learnsets', 'skrelp').learnset.scaleshot;
		delete this.modData('Learnsets', 'skrelp').learnset.twister;

		delete this.modData('Learnsets', 'sudowoodo').learnset.earthquake;
		delete this.modData('Learnsets', 'bonsly').learnset.earthquake;

		delete this.modData('Learnsets', 'froslass').learnset.icefang;
		delete this.modData('Learnsets', 'froslass').learnset.reflect;
		delete this.modData('Learnsets', 'froslass').learnset.lightscreen;
		delete this.modData('Learnsets', 'snorunt').learnset.icefang;
		delete this.modData('Learnsets', 'snorunt').learnset.reflect;
		delete this.modData('Learnsets', 'snorunt').learnset.lightscreen;

		delete this.modData('Learnsets', 'liepard').learnset.nastyplot;
		delete this.modData('Learnsets', 'liepard').learnset.pursuit;
		delete this.modData('Learnsets', 'purrloin').learnset.nastyplot;
		delete this.modData('Learnsets', 'purrloin').learnset.pursuit;

		delete this.modData('Learnsets', 'exeggutoralola').learnset.flamethrower;
		delete this.modData('Learnsets', 'exeggutoralola').learnset.hypnosis;
		delete this.modData('Learnsets', 'exeggutoralola').learnset.sleeppowder;
		delete this.modData('Learnsets', 'exeggcute').learnset.hypnosis;
		delete this.modData('Learnsets', 'exeggcute').learnset.sleeppowder;

		delete this.modData('Learnsets', 'ironthorns').learnset.blizzard;
		delete this.modData('Learnsets', 'ironthorns').learnset.powergem;
		delete this.modData('Learnsets', 'ironthorns').learnset.rockblast;

		delete this.modData('Learnsets', 'oricorio').learnset.quiverdance;

		delete this.modData('Learnsets', 'taurospaldeacombat').learnset.bodypress;
		delete this.modData('Learnsets', 'taurospaldeacombat').learnset.surf;
		delete this.modData('Learnsets', 'taurospaldeacombat').learnset.trailblaze;
		delete this.modData('Learnsets', 'taurospaldeacombat').learnset.ragingbull;

      delete this.modData('Learnsets', 'taurospaldeablaze').learnset.bodypress;
		delete this.modData('Learnsets', 'taurospaldeablaze').learnset.closecombat;
		delete this.modData('Learnsets', 'taurospaldeablaze').learnset.outrage;
		delete this.modData('Learnsets', 'taurospaldeablaze').learnset.rockslide;
		delete this.modData('Learnsets', 'taurospaldeablaze').learnset.stoneedge;
		delete this.modData('Learnsets', 'taurospaldeablaze').learnset.trailblaze;
		delete this.modData('Learnsets', 'taurospaldeablaze').learnset.doublekick;
		delete this.modData('Learnsets', 'taurospaldeablaze').learnset.earthquake;
		delete this.modData('Learnsets', 'taurospaldeablaze').learnset.raindance;
		delete this.modData('Learnsets', 'taurospaldeablaze').learnset.ragingbull;

		delete this.modData('Learnsets', 'taurospaldeaaqua').learnset.closecombat;
		delete this.modData('Learnsets', 'taurospaldeaaqua').learnset.earthquake;
		delete this.modData('Learnsets', 'taurospaldeaaqua').learnset.ironhead;
		delete this.modData('Learnsets', 'taurospaldeaaqua').learnset.outrage;
		delete this.modData('Learnsets', 'taurospaldeaaqua').learnset.reversal;
		delete this.modData('Learnsets', 'taurospaldeaaqua').learnset.rocktomb;
		delete this.modData('Learnsets', 'taurospaldeaaqua').learnset.sandstorm;
		delete this.modData('Learnsets', 'taurospaldeaaqua').learnset.stompingtantrum;
		delete this.modData('Learnsets', 'taurospaldeaaqua').learnset.thief;
		delete this.modData('Learnsets', 'taurospaldeaaqua').learnset.lashout;
		delete this.modData('Learnsets', 'taurospaldeaaqua').learnset.workup;
		delete this.modData('Learnsets', 'taurospaldeaaqua').learnset.smartstrike;
		delete this.modData('Learnsets', 'taurospaldeaaqua').learnset.ragingbull;

		delete this.modData('Learnsets', 'appletun').learnset.grassyglide;
		delete this.modData('Learnsets', 'appletun').learnset.irondefense;
		delete this.modData('Learnsets', 'appletun').learnset.ironhead;
		delete this.modData('Learnsets', 'appletun').learnset.suckerpunch;
		delete this.modData('Learnsets', 'applin').learnset.suckerpunch;
	},


};
