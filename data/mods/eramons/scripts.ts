export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['ECiv', 'Med', 'PrDay', 'FFut'],
	},
	init(){
		// Copperajah
		this.modData("Learnsets", "copperajah").learnset.powerwhip = ["9L1"];
		delete this.modData("Learnsets", "copperajah").learnset.snarl;
		
		// Dachsbun
		this.modData("Learnsets", "dachsbun").learnset.morningsun = ["9L1"];
		this.modData("Learnsets", "dachsbun").learnset.willowisp = ["9L1"];
		delete this.modData("Learnsets", "dachsbun").learnset.dazzlinggleam;
		delete this.modData("Learnsets", "dachsbun").learnset.yawn;
		delete this.modData("Learnsets", "fidough").learnset.dazzlinggleam;
		delete this.modData("Learnsets", "fidough").learnset.yawn;

		// Golurk
		this.modData("Learnsets", "golurk").learnset.shadowsneak = ["9L1"];
		this.modData("Learnsets", "golurk").learnset.swordsdance = ["9L1"];
		delete this.modData("Learnsets", "golurk").learnset.closecombat;
		delete this.modData("Learnsets", "golurk").learnset.drainpunch;

		// Krookodile
		this.modData("Learnsets", "krookodile").learnset.uturn = ["9L1"];
		delete this.modData("Learnsets", "krookodile").learnset.foulplay;
		delete this.modData("Learnsets", "krokorok").learnset.foulplay;
		delete this.modData("Learnsets", "sandile").learnset.foulplay;

		// Stonjourner
		this.modData("Learnsets", "stonjourner").learnset.superpower = ["9L1"];
		this.modData("Learnsets", "stonjourner").learnset.tripleaxel = ["9L1"];
		delete this.modData("Learnsets", "stonjourner").learnset.earthpower;
		delete this.modData("Learnsets", "stonjourner").learnset.powergem;

		// Claywheel
		this.modData("Learnsets", "claywheel").learnset.energyball = ["9l1"];
		this.modData("Learnsets", "claywheel").learnset.flipturn = ["9l1"];
		this.modData("Learnsets", "claywheel").learnset.gigadrain = ["9l1"];
		this.modData("Learnsets", "claywheel").learnset.grassyterrain = ["9l1"];
		this.modData("Learnsets", "claywheel").learnset.hydropump = ["9l1"];
		this.modData("Learnsets", "claywheel").learnset.icespinner = ["9l1"];
		this.modData("Learnsets", "claywheel").learnset.leechseed = ["9l1"];
		this.modData("Learnsets", "claywheel").learnset.muddywater = ["9l1"];
		this.modData("Learnsets", "claywheel").learnset.surf = ["9l1"];
		this.modData("Learnsets", "claywheel").learnset.synthesis = ["9l1"];
		this.modData("Learnsets", "claywheel").learnset.trailblaze = ["9l1"];
		this.modData("Learnsets", "claywheel").learnset.woodhammer = ["9l1"];
		delete this.modData("Learnsets", "claywheel").learnset.bulldoze;
		delete this.modData("Learnsets", "claywheel").learnset.chargebeam;
		delete this.modData("Learnsets", "claywheel").learnset.confusion;
		delete this.modData("Learnsets", "claywheel").learnset.cosmicpower;
		delete this.modData("Learnsets", "claywheel").learnset.dazzlinggleam;
		delete this.modData("Learnsets", "claywheel").learnset.dig;
		delete this.modData("Learnsets", "claywheel").learnset.dreameater;
		delete this.modData("Learnsets", "claywheel").learnset.eerieimpulse;
		delete this.modData("Learnsets", "claywheel").learnset.expandingforce;
		delete this.modData("Learnsets", "claywheel").learnset.extrasensory;
		delete this.modData("Learnsets", "claywheel").learnset.futuresight;
		delete this.modData("Learnsets", "claywheel").learnset.guardsplit;
		delete this.modData("Learnsets", "claywheel").learnset.guardswap;
		delete this.modData("Learnsets", "claywheel").learnset.hex;
		delete this.modData("Learnsets", "claywheel").learnset.imprison;
		delete this.modData("Learnsets", "claywheel").learnset.powerswap;
		delete this.modData("Learnsets", "claywheel").learnset.psybeam;
		delete this.modData("Learnsets", "claywheel").learnset.psychic;
		delete this.modData("Learnsets", "claywheel").learnset.psychicterrain;
		delete this.modData("Learnsets", "claywheel").learnset.psyshock;
		delete this.modData("Learnsets", "claywheel").learnset.rockslide;
		delete this.modData("Learnsets", "claywheel").learnset.rocktomb;
		delete this.modData("Learnsets", "claywheel").learnset.sandstorm;
		delete this.modData("Learnsets", "claywheel").learnset.scorchingsands;
		delete this.modData("Learnsets", "claywheel").learnset.smackdown;
		delete this.modData("Learnsets", "claywheel").learnset.stealthrock;
		delete this.modData("Learnsets", "claywheel").learnset.storedpower;
		delete this.modData("Learnsets", "claywheel").learnset.teleport;
		delete this.modData("Learnsets", "claywheel").learnset.toxic;
		delete this.modData("Learnsets", "claywheel").learnset.trick;
		delete this.modData("Learnsets", "claywheel").learnset.trickroom;
		delete this.modData("Learnsets", "claywheel").learnset.wonderroom;
		delete this.modData("Learnsets", "claywheel").learnset.zenheadbutt;

		// Lapseus
		this.modData("Learnsets", "lapseus").learnset.aquajet = ["9L1"];
		this.modData("Learnsets", "lapseus").learnset.aurasphere = ["9L1"];
		this.modData("Learnsets", "lapseus").learnset.bulkup = ["9L1"];
		this.modData("Learnsets", "lapseus").learnset.changeofheart = ["9L1"];
		this.modData("Learnsets", "lapseus").learnset.closecombat = ["9L1"];
		this.modData("Learnsets", "lapseus").learnset.earthpower = ["9L1"];
		this.modData("Learnsets", "lapseus").learnset.earthquake = ["9L1"];
		this.modData("Learnsets", "lapseus").learnset.focusblast = ["9L1"];
		this.modData("Learnsets", "lapseus").learnset.scald = ["9L1"];
		this.modData("Learnsets", "lapseus").learnset.superpower = ["9L1"];
		this.modData("Learnsets", "lapseus").learnset.swordsdance = ["9L1"];
		delete this.modData("Learnsets", "lapseus").learnset.aurorabeam;
		delete this.modData("Learnsets", "lapseus").learnset.avalanche;
		delete this.modData("Learnsets", "lapseus").learnset.freezedry;
		delete this.modData("Learnsets", "lapseus").learnset.frostbreath;
		delete this.modData("Learnsets", "lapseus").learnset.iceshard;

		// Mahogana
		this.modData("Learnsets", "mahogana").learnset.ancientpower = ["9L1"];
		this.modData("Learnsets", "mahogana").learnset.bodypress = ["9L1"];
		this.modData("Learnsets", "mahogana").learnset.bulldoze = ["9L1"];
		this.modData("Learnsets", "mahogana").learnset.bulletseed = ["9L1"];
		this.modData("Learnsets", "mahogana").learnset.earthpower = ["9L1"];
		this.modData("Learnsets", "mahogana").learnset.gigadrain = ["9L1"];
		this.modData("Learnsets", "mahogana").learnset.grassyglide = ["9L1"];
		this.modData("Learnsets", "mahogana").learnset.grassyterrain = ["9L1"];
		this.modData("Learnsets", "mahogana").learnset.healingwish = ["9L1"];
		this.modData("Learnsets", "mahogana").learnset.hex = ["9L1"];
		this.modData("Learnsets", "mahogana").learnset.leafstorm = ["9L1"];
		this.modData("Learnsets", "mahogana").learnset.leechseed = ["9L1"];
		this.modData("Learnsets", "mahogana").learnset.magicalleaf = ["9L1"];
		this.modData("Learnsets", "mahogana").learnset.mysticalfire = ["9L1"];
		this.modData("Learnsets", "mahogana").learnset.powergem = ["9L1"];
		this.modData("Learnsets", "mahogana").learnset.rocktomb = ["9L1"];
		this.modData("Learnsets", "mahogana").learnset.seedbomb = ["9L1"];
		this.modData("Learnsets", "mahogana").learnset.teleport = ["9L1"];
		this.modData("Learnsets", "mahogana").learnset.trailblaze = ["9L1"];
		this.modData("Learnsets", "mahogana").learnset.willowisp = ["9L1"];
		delete this.modData("Learnsets", "mahogana").learnset.electroball;
		delete this.modData("Learnsets", "mahogana").learnset.flashcannon;
		delete this.modData("Learnsets", "mahogana").learnset.gyroball;
		delete this.modData("Learnsets", "mahogana").learnset.heavyslam;
		delete this.modData("Learnsets", "mahogana").learnset.ironhead;
		delete this.modData("Learnsets", "mahogana").learnset.shiftgear;
		delete this.modData("Learnsets", "mahogana").learnset.steelbeam;
		delete this.modData("Learnsets", "mahogana").learnset.voltswitch;
		delete this.modData("Learnsets", "mahogana").learnset.zapcannon;

		// Rebabee
		this.modData("Learnsets", "rebabee").learnset.fierydance = ["9L1"];
		this.modData("Learnsets", "rebabee").learnset.heatwave = ["9L1"];
		this.modData("Learnsets", "rebabee").learnset.hex = ["9L1"];
		this.modData("Learnsets", "rebabee").learnset.lifedew = ["9L1"];
		this.modData("Learnsets", "rebabee").learnset.morningsun = ["9L1"];
		this.modData("Learnsets", "rebabee").learnset.mysticalfire = ["9L1"];
		this.modData("Learnsets", "rebabee").learnset.shadowball = ["9L1"];
		this.modData("Learnsets", "rebabee").learnset.shadowsneak = ["9L1"];
		this.modData("Learnsets", "rebabee").learnset.willowisp = ["9L1"];
		delete this.modData("Learnsets", "rebabee").learnset.aromaticmist;
		delete this.modData("Learnsets", "rebabee").learnset.drainingkiss;
		delete this.modData("Learnsets", "rebabee").learnset.fairywind;
		delete this.modData("Learnsets", "rebabee").learnset.moonblast;
		delete this.modData("Learnsets", "rebabee").learnset.playrough;
		delete this.modData("Learnsets", "rebabee").learnset.stickyweb;
		delete this.modData("Learnsets", "cutiefly").learnset.aromaticmist;
		delete this.modData("Learnsets", "cutiefly").learnset.drainingkiss;
		delete this.modData("Learnsets", "cutiefly").learnset.fairywind;
		delete this.modData("Learnsets", "cutiefly").learnset.moonblast;
		delete this.modData("Learnsets", "cutiefly").learnset.playrough;
		delete this.modData("Learnsets", "cutiefly").learnset.stickyweb;

		//Thunderzeus
		this.modData("Learnsets", "thunderzeus").learnset.boltstrike = ["9L1"];
		this.modData("Learnsets", "thunderzeus").learnset.dazzlinggleam = ["9L1"];
		this.modData("Learnsets", "thunderzeus").learnset.defog = ["9L1"];
		this.modData("Learnsets", "thunderzeus").learnset.hurricane = ["9L1"];
		this.modData("Learnsets", "thunderzeus").learnset.paraboliccharge = ["9L1"];
		this.modData("Learnsets", "thunderzeus").learnset.skyattack = ["9L1"];
		this.modData("Learnsets", "thunderzeus").learnset.stoneedge = ["9L1"];
		this.modData("Learnsets", "thunderzeus").learnset.suckerpunch = ["9L1"];
		this.modData("Learnsets", "thunderzeus").learnset.superpower = ["9L1"];
		this.modData("Learnsets", "thunderzeus").learnset.zingzap = ["9L1"];
		delete this.modData("Learnsets", "thunderzeus").learnset.bulkup;
		delete this.modData("Learnsets", "thunderzeus").learnset.focusblast;
		delete this.modData("Learnsets", "thunderzeus").learnset.grassknot;
		delete this.modData("Learnsets", "thunderzeus").learnset.sludgebomb;
		delete this.modData("Learnsets", "thunderzeus").learnset.uturn;

		//Tropion
		this.modData("Learnsets", "tropion").learnset.defog = ["9L1"];
		this.modData("Learnsets", "tropion").learnset.dracometeor = ["9L1"];
		this.modData("Learnsets", "tropion").learnset.dragonhammer = ["9L1"];
		this.modData("Learnsets", "tropion").learnset.earthpower = ["9L1"];
		this.modData("Learnsets", "tropion").learnset.fireblast = ["9L1"];
		this.modData("Learnsets", "tropion").learnset.flamethrower = ["9L1"];
		this.modData("Learnsets", "tropion").learnset.slackoff = ["9L1"];

		//Escavalier
		this.modData("Learnsets", "escavalier").learnset.firstimpression = ["9L1"];
		this.modData("Learnsets", "escavalier").learnset.stealthrock = ["9L1"];
		this.modData("Learnsets", "escavalier").learnset.stoneedge = ["9L1"];
		this.modData("Learnsets", "escavalier").learnset.uturn = ["9L1"];
		delete this.modData("Learnsets", "escavalier").learnset.agility;
		delete this.modData("Learnsets", "escavalier").learnset.energyball;
		delete this.modData("Learnsets", "escavalier").learnset.focusblast;
		delete this.modData("Learnsets", "escavalier").learnset.gigadrain;

		//Gallade
		this.modData("Learnsets", "gallade").learnset.uturn = ["9L1"];
		delete this.modData("Learnsets", "ralts").learnset.willowisp;
		delete this.modData("Learnsets", "kirlia").learnset.willowisp;
		delete this.modData("Learnsets", "gallade").learnset.willowisp;

		//Hariyama
		this.modData("Learnsets", "hariyama").learnset.liquidation = ["9L1"];
		this.modData("Learnsets", "hariyama").learnset.machpunch = ["9L1"];
		delete this.modData("Learnsets", "makuhita").learnset.bellydrum;
		delete this.modData("Learnsets", "makuhita").learnset.chillingwater;
		delete this.modData("Learnsets", "hariyama").learnset.bellydrum;
		delete this.modData("Learnsets", "hariyama").learnset.chillingwater;

		//Rapidash-Galar
		this.modData("Learnsets", "rapidashgalar").learnset.magicaltorque = ["9L1"];
		this.modData("Learnsets", "rapidashgalar").learnset.psyblade = ["9L1"];
		delete this.modData("Learnsets", "rapidashgalar").learnset.calmmind;
		delete this.modData("Learnsets", "rapidashgalar").learnset.mysticalfire;

		//Tinkaton
		this.modData("Learnsets", "tinkaton").learnset.earthpower = ["9L1"];
		this.modData("Learnsets", "tinkaton").learnset.moonblast = ["9L1"];
		delete this.modData("Learnsets", "tinkatink").learnset.foulplay;
		delete this.modData("Learnsets", "tinkatink").learnset.stoneedge;
		delete this.modData("Learnsets", "tinkatuff").learnset.foulplay;
		delete this.modData("Learnsets", "tinkatuff").learnset.stoneedge;
		delete this.modData("Learnsets", "tinkaton").learnset.foulplay;
		delete this.modData("Learnsets", "tinkaton").learnset.stoneedge;

		//Aquaboliva
		this.modData("Learnsets", "aquaboliva").learnset.aquajet = ["9L1"];
		this.modData("Learnsets", "aquaboliva").learnset.calmmind = ["9L1"];
		this.modData("Learnsets", "aquaboliva").learnset.defog = ["9L1"];
		this.modData("Learnsets", "aquaboliva").learnset.hydropump = ["9L1"];
		this.modData("Learnsets", "aquaboliva").learnset.moonblast = ["9L1"];
		this.modData("Learnsets", "aquaboliva").learnset.raindance = ["9L1"];
		this.modData("Learnsets", "aquaboliva").learnset.scald = ["9L1"];
		this.modData("Learnsets", "aquaboliva").learnset.surf = ["9L1"];
		this.modData("Learnsets", "aquaboliva").learnset.waterfall = ["9L1"];
		this.modData("Learnsets", "aquaboliva").learnset.wish = ["9L1"];
		delete this.modData("Learnsets", "smoliv").learnset.absorb;
		delete this.modData("Learnsets", "smoliv").learnset.bulletseed;
		delete this.modData("Learnsets", "smoliv").learnset.gigadrain;
		delete this.modData("Learnsets", "smoliv").learnset.grassyterrain;
		delete this.modData("Learnsets", "smoliv").learnset.leafstorm;
		delete this.modData("Learnsets", "smoliv").learnset.leechseed;
		delete this.modData("Learnsets", "smoliv").learnset.magicalleaf;
		delete this.modData("Learnsets", "smoliv").learnset.petalblizzard;
		delete this.modData("Learnsets", "smoliv").learnset.petaldance;
		delete this.modData("Learnsets", "smoliv").learnset.razorleaf;
		delete this.modData("Learnsets", "smoliv").learnset.seedbomb;
		delete this.modData("Learnsets", "smoliv").learnset.solarblade;
		delete this.modData("Learnsets", "smoliv").learnset.solarbeam;
		delete this.modData("Learnsets", "smoliv").learnset.synthesis;
		delete this.modData("Learnsets", "smoliv").learnset.trailblaze;
		delete this.modData("Learnsets", "dolliv").learnset.absorb;
		delete this.modData("Learnsets", "dolliv").learnset.bulletseed;
		delete this.modData("Learnsets", "dolliv").learnset.gigadrain;
		delete this.modData("Learnsets", "dolliv").learnset.grassyterrain;
		delete this.modData("Learnsets", "dolliv").learnset.leafstorm;
		delete this.modData("Learnsets", "dolliv").learnset.leechseed;
		delete this.modData("Learnsets", "dolliv").learnset.magicalleaf;
		delete this.modData("Learnsets", "dolliv").learnset.petalblizzard;
		delete this.modData("Learnsets", "dolliv").learnset.petaldance;
		delete this.modData("Learnsets", "dolliv").learnset.razorleaf;
		delete this.modData("Learnsets", "dolliv").learnset.seedbomb;
		delete this.modData("Learnsets", "dolliv").learnset.solarblade;
		delete this.modData("Learnsets", "dolliv").learnset.solarbeam;
		delete this.modData("Learnsets", "dolliv").learnset.synthesis;
		delete this.modData("Learnsets", "dolliv").learnset.trailblaze;
		delete this.modData("Learnsets", "aquaboliva").learnset.absorb;
		delete this.modData("Learnsets", "aquaboliva").learnset.bulletseed;
		delete this.modData("Learnsets", "aquaboliva").learnset.gigadrain;
		delete this.modData("Learnsets", "aquaboliva").learnset.grassyterrain;
		delete this.modData("Learnsets", "aquaboliva").learnset.leafstorm;
		delete this.modData("Learnsets", "aquaboliva").learnset.leechseed;
		delete this.modData("Learnsets", "aquaboliva").learnset.magicalleaf;
		delete this.modData("Learnsets", "aquaboliva").learnset.petalblizzard;
		delete this.modData("Learnsets", "aquaboliva").learnset.petaldance;
		delete this.modData("Learnsets", "aquaboliva").learnset.razorleaf;
		delete this.modData("Learnsets", "aquaboliva").learnset.seedbomb;
		delete this.modData("Learnsets", "aquaboliva").learnset.solarblade;
		delete this.modData("Learnsets", "aquaboliva").learnset.solarbeam;
		delete this.modData("Learnsets", "aquaboliva").learnset.synthesis;
		delete this.modData("Learnsets", "aquaboliva").learnset.trailblaze;

		//Palosslime
		this.modData("Learnsets", "palosslime").learnset.nastyplot = ["9L1"];
		this.modData("Learnsets", "palosslime").learnset.poisonjab = ["9L1"];
		this.modData("Learnsets", "palosslime").learnset.sludge = ["9L1"];
		this.modData("Learnsets", "palosslime").learnset.sludgewave = ["9L1"];
		this.modData("Learnsets", "palosslime").learnset.toxic = ["9L1"];
		this.modData("Learnsets", "palosslime").learnset.toxicspikes = ["9L1"];
		this.modData("Learnsets", "palosslime").learnset.venoshock = ["9L1"];

		//Plaguinja
		this.modData("Learnsets", "plaguinja").learnset.acid = ["9L1"];
		this.modData("Learnsets", "plaguinja").learnset.acidspray = ["9L1"];
		this.modData("Learnsets", "plaguinja").learnset.astonish = ["9L1"];
		this.modData("Learnsets", "plaguinja").learnset.banefulbunker = ["9L1"];
		this.modData("Learnsets", "plaguinja").learnset.corrosivegas = ["9L1"];
		this.modData("Learnsets", "plaguinja").learnset.crosspoison = ["9L1"];
		this.modData("Learnsets", "plaguinja").learnset.destinybond = ["9L1"];
		this.modData("Learnsets", "plaguinja").learnset.haze = ["9L1"];
		this.modData("Learnsets", "plaguinja").learnset.hex = ["9L1"];
		this.modData("Learnsets", "plaguinja").learnset.plaguecane = ["9L1"];
		this.modData("Learnsets", "plaguinja").learnset.poisonjab = ["9L1"];
		this.modData("Learnsets", "plaguinja").learnset.poltergeist = ["9L1"];
		this.modData("Learnsets", "plaguinja").learnset.shadowball = ["9L1"];
		this.modData("Learnsets", "plaguinja").learnset.shadowclaw = ["9L1"];
		this.modData("Learnsets", "plaguinja").learnset.sludgebomb = ["9L1"];
		this.modData("Learnsets", "plaguinja").learnset.sludgewave = ["9L1"];
		this.modData("Learnsets", "plaguinja").learnset.toxic = ["9L1"];
		this.modData("Learnsets", "plaguinja").learnset.willowisp = ["9L1"];
		delete this.modData("Learnsets", "froakie").learnset.blizzard;
		delete this.modData("Learnsets", "froakie").learnset.chillingwater;
		delete this.modData("Learnsets", "froakie").learnset.hydrocannon;
		delete this.modData("Learnsets", "froakie").learnset.hydropump;
		delete this.modData("Learnsets", "froakie").learnset.icebeam;
		delete this.modData("Learnsets", "froakie").learnset.liquidation;
		delete this.modData("Learnsets", "froakie").learnset.matblock;
		delete this.modData("Learnsets", "froakie").learnset.nightslash;
		delete this.modData("Learnsets", "froakie").learnset.spikes;
		delete this.modData("Learnsets", "froakie").learnset.surf;
		delete this.modData("Learnsets", "froakie").learnset.switcheroo;
		delete this.modData("Learnsets", "froakie").learnset.swordsdance;
		delete this.modData("Learnsets", "froakie").learnset.thief;
		delete this.modData("Learnsets", "froakie").learnset.watergun;
		delete this.modData("Learnsets", "froakie").learnset.waterpledge;
		delete this.modData("Learnsets", "froakie").learnset.watershuriken;
		delete this.modData("Learnsets", "froakie").learnset.waterfall;
		delete this.modData("Learnsets", "frogadier").learnset.blizzard;
		delete this.modData("Learnsets", "frogadier").learnset.chillingwater;
		delete this.modData("Learnsets", "frogadier").learnset.hydrocannon;
		delete this.modData("Learnsets", "frogadier").learnset.hydropump;
		delete this.modData("Learnsets", "frogadier").learnset.icebeam;
		delete this.modData("Learnsets", "frogadier").learnset.liquidation;
		delete this.modData("Learnsets", "frogadier").learnset.matblock;
		delete this.modData("Learnsets", "frogadier").learnset.nightslash;
		delete this.modData("Learnsets", "frogadier").learnset.spikes;
		delete this.modData("Learnsets", "frogadier").learnset.surf;
		delete this.modData("Learnsets", "frogadier").learnset.switcheroo;
		delete this.modData("Learnsets", "frogadier").learnset.swordsdance;
		delete this.modData("Learnsets", "frogadier").learnset.thief;
		delete this.modData("Learnsets", "frogadier").learnset.watergun;
		delete this.modData("Learnsets", "frogadier").learnset.waterpledge;
		delete this.modData("Learnsets", "frogadier").learnset.watershuriken;
		delete this.modData("Learnsets", "frogadier").learnset.waterfall;
		delete this.modData("Learnsets", "plaguinja").learnset.blizzard;
		delete this.modData("Learnsets", "plaguinja").learnset.chillingwater;
		delete this.modData("Learnsets", "plaguinja").learnset.hydrocannon;
		delete this.modData("Learnsets", "plaguinja").learnset.hydropump;
		delete this.modData("Learnsets", "plaguinja").learnset.icebeam;
		delete this.modData("Learnsets", "plaguinja").learnset.liquidation;
		delete this.modData("Learnsets", "plaguinja").learnset.matblock;
		delete this.modData("Learnsets", "plaguinja").learnset.nightslash;
		delete this.modData("Learnsets", "plaguinja").learnset.spikes;
		delete this.modData("Learnsets", "plaguinja").learnset.surf;
		delete this.modData("Learnsets", "plaguinja").learnset.switcheroo;
		delete this.modData("Learnsets", "plaguinja").learnset.swordsdance;
		delete this.modData("Learnsets", "plaguinja").learnset.thief;
		delete this.modData("Learnsets", "plaguinja").learnset.watergun;
		delete this.modData("Learnsets", "plaguinja").learnset.waterpledge;
		delete this.modData("Learnsets", "plaguinja").learnset.watershuriken;
		delete this.modData("Learnsets", "plaguinja").learnset.waterfall;

		// Silkroak
		this.modData("Learnsets", "silkroak").learnset.blizzard = ["9L1"];
		this.modData("Learnsets", "silkroak").learnset.earthpower = ["9L1"];
		this.modData("Learnsets", "silkroak").learnset.highhorsepower = ["9L1"];
		this.modData("Learnsets", "silkroak").learnset.hydropump = ["9L1"];
		this.modData("Learnsets", "silkroak").learnset.icebeam = ["9L1"];
		this.modData("Learnsets", "silkroak").learnset.liquidation = ["9L1"];
		this.modData("Learnsets", "silkroak").learnset.surf = ["9L1"];
		this.modData("Learnsets", "silkroak").learnset.watershuriken = ["9L1"];
		delete this.modData("Learnsets", "croagunk").learnset.closecombat;
		delete this.modData("Learnsets", "croagunk").learnset.crosschop;
		delete this.modData("Learnsets", "croagunk").learnset.darkpulse;
		delete this.modData("Learnsets", "croagunk").learnset.gunkshot;
		delete this.modData("Learnsets", "croagunk").learnset.thunderpunch;
		delete this.modData("Learnsets", "croagunk").learnset.vacuumwave;
		delete this.modData("Learnsets", "croagunk").learnset.xscissor;
		delete this.modData("Learnsets", "silkroak").learnset.closecombat;
		delete this.modData("Learnsets", "silkroak").learnset.crosschop;
		delete this.modData("Learnsets", "silkroak").learnset.darkpulse;
		delete this.modData("Learnsets", "silkroak").learnset.gunkshot;
		delete this.modData("Learnsets", "silkroak").learnset.thunderpunch;
		delete this.modData("Learnsets", "silkroak").learnset.vacuumwave;
		delete this.modData("Learnsets", "silkroak").learnset.xscissor;

		// Tarranite
		this.modData("Learnsets", "tarranite").learnset.defog = ["9L1"];
		this.modData("Learnsets", "tarranite").learnset.dualwingbeat = ["9L1"];
		this.modData("Learnsets", "tarranite").learnset.superpower = ["9L1"];
		delete this.modData("Learnsets", "dratini").learnset.dragondance;
		delete this.modData("Learnsets", "dratini").learnset.ironhead;
		delete this.modData("Learnsets", "dratini").learnset.terablast;
		delete this.modData("Learnsets", "dragonair").learnset.dragondance;
		delete this.modData("Learnsets", "dragonair").learnset.ironhead;
		delete this.modData("Learnsets", "dragonair").learnset.terablast;
		delete this.modData("Learnsets", "tarranite").learnset.dragondance;
		delete this.modData("Learnsets", "tarranite").learnset.ironhead;
		delete this.modData("Learnsets", "tarranite").learnset.terablast;

		// Torkappa
		this.modData("Learnsets", "torkappa").learnset.aquatail = ["9L1"];
		this.modData("Learnsets", "torkappa").learnset.bouncybubble = ["9L1"];
		this.modData("Learnsets", "torkappa").learnset.branchpoke = ["9L1"];
		this.modData("Learnsets", "torkappa").learnset.bulletseed = ["9L1"];
		this.modData("Learnsets", "torkappa").learnset.chillingwater = ["9L1"];
		this.modData("Learnsets", "torkappa").learnset.energyball = ["9L1"];
		this.modData("Learnsets", "torkappa").learnset.gigadrain = ["9L1"];
		this.modData("Learnsets", "torkappa").learnset.grassknot = ["9L1"];
		this.modData("Learnsets", "torkappa").learnset.grassyglide = ["9L1"];
		this.modData("Learnsets", "torkappa").learnset.grassysurge = ["9L1"];
		this.modData("Learnsets", "torkappa").learnset.hydropump = ["9L1"];
		this.modData("Learnsets", "torkappa").learnset.leafstorm = ["9L1"];
		this.modData("Learnsets", "torkappa").learnset.leechseed = ["9L1"];
		this.modData("Learnsets", "torkappa").learnset.liquidation = ["9L1"];
		this.modData("Learnsets", "torkappa").learnset.magicalleaf = ["9L1"];
		this.modData("Learnsets", "torkappa").learnset.megadrain = ["9L1"];
		this.modData("Learnsets", "torkappa").learnset.raindance = ["9L1"];
		this.modData("Learnsets", "torkappa").learnset.razorleaf = ["9L1"];
		this.modData("Learnsets", "torkappa").learnset.recover = ["9L1"];
		this.modData("Learnsets", "torkappa").learnset.scald = ["9L1"];
		this.modData("Learnsets", "torkappa").learnset.seedbomb = ["9L1"];
		this.modData("Learnsets", "torkappa").learnset.soak = ["9L1"];
		this.modData("Learnsets", "torkappa").learnset.surf = ["9L1"];
		this.modData("Learnsets", "torkappa").learnset.watergun = ["9L1"];
		this.modData("Learnsets", "torkappa").learnset.waterpulse = ["9L1"];
		this.modData("Learnsets", "torkappa").learnset.waterspout = ["9L1"];
		this.modData("Learnsets", "torkappa").learnset.waterfall = ["9L1"];
		this.modData("Learnsets", "torkappa").learnset.worryseed = ["9L1"];
		delete this.modData("Learnsets", "torkappa").learnset.burningjealousy;
		delete this.modData("Learnsets", "torkappa").learnset.clearsmog;
		delete this.modData("Learnsets", "torkappa").learnset.ember;
		delete this.modData("Learnsets", "torkappa").learnset.eruption;
		delete this.modData("Learnsets", "torkappa").learnset.fireblast;
		delete this.modData("Learnsets", "torkappa").learnset.firespin;
		delete this.modData("Learnsets", "torkappa").learnset.flamecharge;
		delete this.modData("Learnsets", "torkappa").learnset.flamewheel;
		delete this.modData("Learnsets", "torkappa").learnset.flamethrower;
		delete this.modData("Learnsets", "torkappa").learnset.flareblitz;
		delete this.modData("Learnsets", "torkappa").learnset.heatcrash;
		delete this.modData("Learnsets", "torkappa").learnset.heatwave;
		delete this.modData("Learnsets", "torkappa").learnset.inferno;
		delete this.modData("Learnsets", "torkappa").learnset.lavaplume;
		delete this.modData("Learnsets", "torkappa").learnset.overheat;
		delete this.modData("Learnsets", "torkappa").learnset.sludgebomb;
		delete this.modData("Learnsets", "torkappa").learnset.smog;
		delete this.modData("Learnsets", "torkappa").learnset.sunnyday;
		delete this.modData("Learnsets", "torkappa").learnset.willowisp;

		// Cinderace
		this.modData("Learnsets", "cinderace").learnset.extremespeed = ["9L1"];
		this.modData("Learnsets", "cinderace").learnset.knockoff = ["9L1"];
		delete this.modData("Learnsets", "scorbunny").learnset.ironhead;
		delete this.modData("Learnsets", "scorbunny").learnset.shadowball;
		delete this.modData("Learnsets", "raboot").learnset.ironhead;
		delete this.modData("Learnsets", "raboot").learnset.shadowball;
		delete this.modData("Learnsets", "cinderace").learnset.ironhead;
		delete this.modData("Learnsets", "cinderace").learnset.shadowball;

		// Duraludon
		this.modData("Learnsets", "duraludon").learnset.earthpower = ["9L1"];
		this.modData("Learnsets", "duraludon").learnset.taunt = ["9L1"];
		this.modData("Learnsets", "duraludon").learnset.uturn = ["9L1"];
		delete this.modData("Learnsets", "duraludon").learnset.brickbreak;
		delete this.modData("Learnsets", "duraludon").learnset.foulplay;
		delete this.modData("Learnsets", "duraludon").learnset.nightslash;

		// Unfezant
		this.modData("Learnsets", "unfezant").learnset.bodyslam = ["9L1"];
		this.modData("Learnsets", "unfezant").learnset.doubleedge = ["9L1"];
		this.modData("Learnsets", "unfezant").learnset.takedown = ["9L1"];

		// Chandelight
		this.modData("Learnsets", "chandelight").learnset.aromaticmist = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.charge = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.chargebeam = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.charm = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.dazzlinggleam = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.decorate = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.discharge = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.drainingkiss = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.electricterrain = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.electroball = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.electroweb = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.gust = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.iondeluge = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.magnetrise = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.mistyexplosion = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.mistyterrain = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.moonblast = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.moonlight = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.paraboliccharge = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.playrough = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.spark = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.thunder = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.thunderwave = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.thunderbolt = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.thundershock = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.voltswitch = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.whirlpool = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.wildcharge = ["9L1"];
		this.modData("Learnsets", "chandelight").learnset.zapcannon = ["9L1"];
		delete this.modData("Learnsets", "litwick").learnset.acidarmor;
		delete this.modData("Learnsets", "litwick").learnset.astonish;
		delete this.modData("Learnsets", "litwick").learnset.burningjealousy;
		delete this.modData("Learnsets", "litwick").learnset.clearsmog;
		delete this.modData("Learnsets", "litwick").learnset.confuseray;
		delete this.modData("Learnsets", "litwick").learnset.curse;
		delete this.modData("Learnsets", "litwick").learnset.darkpulse;
		delete this.modData("Learnsets", "litwick").learnset.ember;
		delete this.modData("Learnsets", "litwick").learnset.fireblast;
		delete this.modData("Learnsets", "litwick").learnset.firespin;
		delete this.modData("Learnsets", "litwick").learnset.flamecharge;
		delete this.modData("Learnsets", "litwick").learnset.flamethrower;
		delete this.modData("Learnsets", "litwick").learnset.flareblitz;
		delete this.modData("Learnsets", "litwick").learnset.heatwave;
		delete this.modData("Learnsets", "litwick").learnset.inferno;
		delete this.modData("Learnsets", "litwick").learnset.lashout;
		delete this.modData("Learnsets", "litwick").learnset.memento;
		delete this.modData("Learnsets", "litwick").learnset.overheat;
		delete this.modData("Learnsets", "litwick").learnset.poltergeist;
		delete this.modData("Learnsets", "litwick").learnset.shadowball;
		delete this.modData("Learnsets", "litwick").learnset.smog;
		delete this.modData("Learnsets", "litwick").learnset.spite;
		delete this.modData("Learnsets", "litwick").learnset.trickroom;
		delete this.modData("Learnsets", "litwick").learnset.willowisp;
		delete this.modData("Learnsets", "lampent").learnset.acidarmor;
		delete this.modData("Learnsets", "lampent").learnset.astonish;
		delete this.modData("Learnsets", "lampent").learnset.burningjealousy;
		delete this.modData("Learnsets", "lampent").learnset.clearsmog;
		delete this.modData("Learnsets", "lampent").learnset.confuseray;
		delete this.modData("Learnsets", "lampent").learnset.curse;
		delete this.modData("Learnsets", "lampent").learnset.darkpulse;
		delete this.modData("Learnsets", "lampent").learnset.ember;
		delete this.modData("Learnsets", "lampent").learnset.fireblast;
		delete this.modData("Learnsets", "lampent").learnset.firespin;
		delete this.modData("Learnsets", "lampent").learnset.flamecharge;
		delete this.modData("Learnsets", "lampent").learnset.flamethrower;
		delete this.modData("Learnsets", "lampent").learnset.flareblitz;
		delete this.modData("Learnsets", "lampent").learnset.heatwave;
		delete this.modData("Learnsets", "lampent").learnset.inferno;
		delete this.modData("Learnsets", "lampent").learnset.lashout;
		delete this.modData("Learnsets", "lampent").learnset.memento;
		delete this.modData("Learnsets", "lampent").learnset.overheat;
		delete this.modData("Learnsets", "lampent").learnset.poltergeist;
		delete this.modData("Learnsets", "lampent").learnset.shadowball;
		delete this.modData("Learnsets", "lampent").learnset.smog;
		delete this.modData("Learnsets", "lampent").learnset.spite;
		delete this.modData("Learnsets", "lampent").learnset.trickroom;
		delete this.modData("Learnsets", "lampent").learnset.willowisp;
		delete this.modData("Learnsets", "chandelight").learnset.acidarmor;
		delete this.modData("Learnsets", "chandelight").learnset.astonish;
		delete this.modData("Learnsets", "chandelight").learnset.burningjealousy;
		delete this.modData("Learnsets", "chandelight").learnset.clearsmog;
		delete this.modData("Learnsets", "chandelight").learnset.confuseray;
		delete this.modData("Learnsets", "chandelight").learnset.curse;
		delete this.modData("Learnsets", "chandelight").learnset.darkpulse;
		delete this.modData("Learnsets", "chandelight").learnset.ember;
		delete this.modData("Learnsets", "chandelight").learnset.fireblast;
		delete this.modData("Learnsets", "chandelight").learnset.firespin;
		delete this.modData("Learnsets", "chandelight").learnset.flamecharge;
		delete this.modData("Learnsets", "chandelight").learnset.flamethrower;
		delete this.modData("Learnsets", "chandelight").learnset.flareblitz;
		delete this.modData("Learnsets", "chandelight").learnset.heatwave;
		delete this.modData("Learnsets", "chandelight").learnset.inferno;
		delete this.modData("Learnsets", "chandelight").learnset.lashout;
		delete this.modData("Learnsets", "chandelight").learnset.memento;
		delete this.modData("Learnsets", "chandelight").learnset.overheat;
		delete this.modData("Learnsets", "chandelight").learnset.poltergeist;
		delete this.modData("Learnsets", "chandelight").learnset.shadowball;
		delete this.modData("Learnsets", "chandelight").learnset.smog;
		delete this.modData("Learnsets", "chandelight").learnset.spite;
		delete this.modData("Learnsets", "chandelight").learnset.trickroom;
		delete this.modData("Learnsets", "chandelight").learnset.willowisp;

		// Clowndoom
		this.modData("Learnsets", "clowndoom").learnset.dazzlinggleam = ["9L1"];
		this.modData("Learnsets", "clowndoom").learnset.falsesurrender = ["9L1"];
		this.modData("Learnsets", "clowndoom").learnset.playrough = ["9L1"];
		delete this.modData("Learnsets", "houndour").learnset.burningjealousy;
		delete this.modData("Learnsets", "houndour").learnset.ember;
		delete this.modData("Learnsets", "houndour").learnset.fireblast;
		delete this.modData("Learnsets", "houndour").learnset.firefang;
		delete this.modData("Learnsets", "houndour").learnset.firespin;
		delete this.modData("Learnsets", "houndour").learnset.flamecharge;
		delete this.modData("Learnsets", "houndour").learnset.flareblitz;
		delete this.modData("Learnsets", "houndour").learnset.heatwave;
		delete this.modData("Learnsets", "houndour").learnset.incinerate;
		delete this.modData("Learnsets", "houndour").learnset.inferno;
		delete this.modData("Learnsets", "houndour").learnset.overheat;
		delete this.modData("Learnsets", "houndour").learnset.sludgebomb;
		delete this.modData("Learnsets", "houndour").learnset.sunnyday;
		delete this.modData("Learnsets", "houndour").learnset.thunderfang;
		delete this.modData("Learnsets", "houndour").learnset.willowisp;
		delete this.modData("Learnsets", "clowndoom").learnset.burningjealousy;
		delete this.modData("Learnsets", "clowndoom").learnset.ember;
		delete this.modData("Learnsets", "clowndoom").learnset.fireblast;
		delete this.modData("Learnsets", "clowndoom").learnset.firefang;
		delete this.modData("Learnsets", "clowndoom").learnset.firespin;
		delete this.modData("Learnsets", "clowndoom").learnset.flamecharge;
		delete this.modData("Learnsets", "clowndoom").learnset.flareblitz;
		delete this.modData("Learnsets", "clowndoom").learnset.heatwave;
		delete this.modData("Learnsets", "clowndoom").learnset.incinerate;
		delete this.modData("Learnsets", "clowndoom").learnset.inferno;
		delete this.modData("Learnsets", "clowndoom").learnset.overheat;
		delete this.modData("Learnsets", "clowndoom").learnset.sludgebomb;
		delete this.modData("Learnsets", "clowndoom").learnset.sunnyday;
		delete this.modData("Learnsets", "clowndoom").learnset.thunderfang;
		delete this.modData("Learnsets", "clowndoom").learnset.willowisp;

		// Falsiken
		this.modData("Learnsets", "falsiken").learnset.dazzlinggleam = ["9L1"];
		this.modData("Learnsets", "falsiken").learnset.drainingkiss = ["9L1"];
		this.modData("Learnsets", "falsiken").learnset.energyball = ["9L1"];;
		this.modData("Learnsets", "falsiken").learnset.gigadrain = ["9L1"];
		this.modData("Learnsets", "falsiken").learnset.leafblade = ["9L1"];
		this.modData("Learnsets", "falsiken").learnset.playrough = ["9L1"];
		this.modData("Learnsets", "falsiken").learnset.psychic = ["9L1"];
		this.modData("Learnsets", "falsiken").learnset.synthesis = ["9L1"];
		this.modData("Learnsets", "falsiken").learnset.trailblaze = ["9L1"];
		this.modData("Learnsets", "falsiken").learnset.trick = ["9L1"];
		this.modData("Learnsets", "falsiken").learnset.woodhammer = ["9L1"];
		delete this.modData("Learnsets", "falsiken").learnset.blastburn;
		delete this.modData("Learnsets", "falsiken").learnset.earthquake;
		delete this.modData("Learnsets", "falsiken").learnset.ember;
		delete this.modData("Learnsets", "falsiken").learnset.fireblast;
		delete this.modData("Learnsets", "falsiken").learnset.firepledge;
		delete this.modData("Learnsets", "falsiken").learnset.firespin;
		delete this.modData("Learnsets", "falsiken").learnset.flamecharge;
		delete this.modData("Learnsets", "falsiken").learnset.flamethrower;
		delete this.modData("Learnsets", "falsiken").learnset.flareblitz;
		delete this.modData("Learnsets", "falsiken").learnset.heatcrash;
		delete this.modData("Learnsets", "falsiken").learnset.heatwave;
		delete this.modData("Learnsets", "falsiken").learnset.incinerate;
		delete this.modData("Learnsets", "falsiken").learnset.overheat;
		delete this.modData("Learnsets", "falsiken").learnset.rockslide;
		delete this.modData("Learnsets", "falsiken").learnset.scorchingsands;
		delete this.modData("Learnsets", "falsiken").learnset.stoneedge;
		delete this.modData("Learnsets", "falsiken").learnset.willowisp;

		// Glispirin
		this.modData("Learnsets", "glispirin").learnset.feverbreaker = ["9L1"];
		this.modData("Learnsets", "glispirin").learnset.fireblast = ["9L1"];
		this.modData("Learnsets", "glispirin").learnset.firepunch = ["9L1"];
		this.modData("Learnsets", "glispirin").learnset.flamethrower = ["9L1"];
		this.modData("Learnsets", "glispirin").learnset.flareblitz = ["9L1"];
		this.modData("Learnsets", "glispirin").learnset.heatwave = ["9L1"];
		this.modData("Learnsets", "glispirin").learnset.overheat = ["9L1"];
		delete this.modData("Learnsets", "gligar").learnset.crabhammer;
		delete this.modData("Learnsets", "gligar").learnset.spikes;
		delete this.modData("Learnsets", "glispirin").learnset.crabhammer;
		delete this.modData("Learnsets", "glispirin").learnset.spikes;

		// Heradoze
		this.modData("Learnsets", "heradoze").learnset.earthpower = ["9L1"];
		this.modData("Learnsets", "heradoze").learnset.headlongrush = ["9L1"];
		this.modData("Learnsets", "heradoze").learnset.mudshot = ["9L1"];
		this.modData("Learnsets", "heradoze").learnset.mudslap = ["9L1"];
		this.modData("Learnsets", "heradoze").learnset.uturn = ["9L1"];
		delete this.modData("Learnsets", "heradoze").learnset.rockblast;
		delete this.modData("Learnsets", "heradoze").learnset.rockslide;
		delete this.modData("Learnsets", "heradoze").learnset.rocktomb;
		delete this.modData("Learnsets", "heradoze").learnset.stoneedge;
		delete this.modData("Learnsets", "heradoze").learnset.swordsdance;

		// Wiifey
		this.modData("Learnsets", "wiifey").learnset.eerieimpulse = ["9L1"];
		this.modData("Learnsets", "wiifey").learnset.electricterrain = ["9L1"];
		this.modData("Learnsets", "wiifey").learnset.magnetrise = ["9L1"];
		this.modData("Learnsets", "wiifey").learnset.paraboliccharge = ["9L1"];
		this.modData("Learnsets", "wiifey").learnset.raindance = ["9L1"];
		this.modData("Learnsets", "wiifey").learnset.spark = ["9L1"];
		this.modData("Learnsets", "wiifey").learnset.thunder = ["9L1"];
		this.modData("Learnsets", "wiifey").learnset.thunderwave = ["9L1"];
		this.modData("Learnsets", "wiifey").learnset.thunderbolt = ["9L1"];
		this.modData("Learnsets", "wiifey").learnset.voltswitch = ["9L1"];
		this.modData("Learnsets", "wiifey").learnset.wildcharge = ["9L1"];
		delete this.modData("Learnsets", "wiifey").learnset.energyball;
		delete this.modData("Learnsets", "wiifey").learnset.gigadrain;
		delete this.modData("Learnsets", "wiifey").learnset.grassyterrain;
		delete this.modData("Learnsets", "wiifey").learnset.leaftornado;
		delete this.modData("Learnsets", "wiifey").learnset.leechseed;
		delete this.modData("Learnsets", "wiifey").learnset.magicalleaf;
		delete this.modData("Learnsets", "wiifey").learnset.petalblizzard;
		delete this.modData("Learnsets", "wiifey").learnset.petaldance;
		delete this.modData("Learnsets", "wiifey").learnset.seedbomb;
		delete this.modData("Learnsets", "wiifey").learnset.solarbeam;
		delete this.modData("Learnsets", "wiifey").learnset.synthesis;
		delete this.modData("Learnsets", "wiifey").learnset.vinewhip;
		delete this.modData("Learnsets", "wiifey").learnset.worryseed;

		// Beheeyem
		this.modData("Learnsets", "beheeyem").learnset.aurasphere = ["9L1"];
		this.modData("Learnsets", "beheeyem").learnset.heatwave = ["9L1"];
		this.modData("Learnsets", "beheeyem").learnset.moonblast = ["9L1"];
		this.modData("Learnsets", "beheeyem").learnset.spacialrend = ["9L1"];
		delete this.modData("Learnsets", "beheeyem").learnset.agility;
		delete this.modData("Learnsets", "beheeyem").learnset.rockslide;
		delete this.modData("Learnsets", "beheeyem").learnset.steelwing;
		delete this.modData("Learnsets", "beheeyem").learnset.toxic;

		// Dracozolt
		this.modData("Learnsets", "dracozolt").learnset.dragonhammer = ["9L1"];
		this.modData("Learnsets", "dracozolt").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "dracozolt").learnset.volttackle = ["9L1"];
		delete this.modData("Learnsets", "dracozolt").learnset.boltbeak;
		delete this.modData("Learnsets", "dracozolt").learnset.discharge;
		delete this.modData("Learnsets", "dracozolt").learnset.thunder;

		//Genesect
		this.modData("Learnsets", "genesect").learnset.aurasphere = ["9L1"];
		this.modData("Learnsets", "genesect").learnset.swordsdance = ["9L1"];
		this.modData("Learnsets", "genesect").learnset.waterpulse = ["9L1"];
		delete this.modData("Learnsets", "genesect").learnset.explosion;
		delete this.modData("Learnsets", "genesect").learnset.irondefense;
		delete this.modData("Learnsets", "genesect").learnset.leechlife;

		// Klinklang
		this.modData("Learnsets", "klinklang").learnset.bodypress = ["9L1"];
		this.modData("Learnsets", "klinklang").learnset.flamewheel = ["9L1"];
		this.modData("Learnsets", "klinklang").learnset.icespinner = ["9L1"];
		this.modData("Learnsets", "klinklang").learnset.rapidspin = ["9L1"];
		this.modData("Learnsets", "klinklang").learnset.recover = ["9L1"];
		delete this.modData("Learnsets", "klinklang").learnset.powergem;
		delete this.modData("Learnsets", "klinklang").learnset.rockpolish;
		delete this.modData("Learnsets", "klinklang").learnset.signalbeam;
		delete this.modData("Learnsets", "klinklang").learnset.thunder;
		delete this.modData("Learnsets", "klinklang").learnset.toxic;

		// Porygon-Z
		this.modData("Learnsets", "porygonz").learnset.aurasphere = ["9L1"];
		this.modData("Learnsets", "porygonz").learnset.flashcannon = ["9L1"];
		delete this.modData("Learnsets", "porygonz").learnset.recover;
		delete this.modData("Learnsets", "porygonz").learnset.toxic;

		// Rotom
		this.modData("Learnsets", "rotom").learnset.strengthsap = ["9R"];
		delete this.modData("Learnsets", "rotom").learnset.nightshade;

		// Autocalibur
		this.modData("Learnsets", "autocalibur").learnset.aurasphere = ["9L1"];
		this.modData("Learnsets", "autocalibur").learnset.automatarush = ["9L1"];
		this.modData("Learnsets", "autocalibur").learnset.autotomize = ["9L1"];
		this.modData("Learnsets", "autocalibur").learnset.defog = ["9L1"];
		this.modData("Learnsets", "autocalibur").learnset.doubleedge = ["9L1"];
		this.modData("Learnsets", "autocalibur").learnset.dragonhammer = ["9L1"];
		this.modData("Learnsets", "autocalibur").learnset.fierywrath = ["9L1"];
		this.modData("Learnsets", "autocalibur").learnset.flamethrower = ["9L1"];
		this.modData("Learnsets", "autocalibur").learnset.flashcannon = ["9L1"];
		this.modData("Learnsets", "autocalibur").learnset.lockon = ["9L1"];
		this.modData("Learnsets", "autocalibur").learnset.psychic = ["9L1"];
		this.modData("Learnsets", "autocalibur").learnset.psyshock = ["9L1"];
		this.modData("Learnsets", "autocalibur").learnset.thunderbolt = ["9L1"];
		this.modData("Learnsets", "autocalibur").learnset.trick = ["9L1"];
		this.modData("Learnsets", "autocalibur").learnset.voltswitch = ["9L1"];
		this.modData("Learnsets", "autocalibur").learnset.volttackle = ["9L1"];
		this.modData("Learnsets", "autocalibur").learnset.wildcharge = ["9L1"];
		delete this.modData("Learnsets", "frigibax").learnset.aquatail;
		delete this.modData("Learnsets", "frigibax").learnset.avalanche;
		delete this.modData("Learnsets", "frigibax").learnset.blizzard;
		delete this.modData("Learnsets", "frigibax").learnset.freezedry;
		delete this.modData("Learnsets", "frigibax").learnset.glaiverush;
		delete this.modData("Learnsets", "frigibax").learnset.icebeam;
		delete this.modData("Learnsets", "frigibax").learnset.icefang;
		delete this.modData("Learnsets", "frigibax").learnset.iceshard;
		delete this.modData("Learnsets", "frigibax").learnset.iciclecrash;
		delete this.modData("Learnsets", "frigibax").learnset.iciclespear;
		delete this.modData("Learnsets", "frigibax").learnset.icywind;
		delete this.modData("Learnsets", "frigibax").learnset.scaleshot;
		delete this.modData("Learnsets", "frigibax").learnset.snowscape;
		delete this.modData("Learnsets", "frigibax").learnset.swordsdance;
		delete this.modData("Learnsets", "arctibax").learnset.aquatail;
		delete this.modData("Learnsets", "arctibax").learnset.avalanche;
		delete this.modData("Learnsets", "arctibax").learnset.blizzard;
		delete this.modData("Learnsets", "arctibax").learnset.freezedry;
		delete this.modData("Learnsets", "arctibax").learnset.glaiverush;
		delete this.modData("Learnsets", "arctibax").learnset.icebeam;
		delete this.modData("Learnsets", "arctibax").learnset.icefang;
		delete this.modData("Learnsets", "arctibax").learnset.iceshard;
		delete this.modData("Learnsets", "arctibax").learnset.iciclecrash;
		delete this.modData("Learnsets", "arctibax").learnset.iciclespear;
		delete this.modData("Learnsets", "arctibax").learnset.icywind;
		delete this.modData("Learnsets", "arctibax").learnset.scaleshot;
		delete this.modData("Learnsets", "arctibax").learnset.snowscape;
		delete this.modData("Learnsets", "arctibax").learnset.swordsdance;
		delete this.modData("Learnsets", "autocalibur").learnset.aquatail;
		delete this.modData("Learnsets", "autocalibur").learnset.avalanche;
		delete this.modData("Learnsets", "autocalibur").learnset.blizzard;
		delete this.modData("Learnsets", "autocalibur").learnset.freezedry;
		delete this.modData("Learnsets", "autocalibur").learnset.glaiverush;
		delete this.modData("Learnsets", "autocalibur").learnset.icebeam;
		delete this.modData("Learnsets", "autocalibur").learnset.icefang;
		delete this.modData("Learnsets", "autocalibur").learnset.iceshard;
		delete this.modData("Learnsets", "autocalibur").learnset.iciclecrash;
		delete this.modData("Learnsets", "autocalibur").learnset.iciclespear;
		delete this.modData("Learnsets", "autocalibur").learnset.icywind;
		delete this.modData("Learnsets", "autocalibur").learnset.scaleshot;
		delete this.modData("Learnsets", "autocalibur").learnset.snowscape;
		delete this.modData("Learnsets", "autocalibur").learnset.swordsdance;

		// Clefquifer
		this.modData("Learnsets", "clefquifer").learnset.auroraveil = ["9L1"];
		this.modData("Learnsets", "clefquifer").learnset.freezedry = ["9L1"];
		this.modData("Learnsets", "clefquifer").learnset.hydropump = ["9L1"];
		this.modData("Learnsets", "clefquifer").learnset.liquidation = ["9L1"];
		this.modData("Learnsets", "clefquifer").learnset.iceshard = ["9L1"];
		this.modData("Learnsets", "clefquifer").learnset.iciclecrash = ["9L1"];
		this.modData("Learnsets", "clefquifer").learnset.meteorbeam = ["9L1"];
		this.modData("Learnsets", "clefquifer").learnset.phaseout = ["9L1"];
		this.modData("Learnsets", "clefquifer").learnset.powergem = ["9L1"];
		this.modData("Learnsets", "clefquifer").learnset.rockslide = ["9L1"];
		this.modData("Learnsets", "clefquifer").learnset.rocktomb = ["9L1"];
		this.modData("Learnsets", "clefquifer").learnset.snowscape = ["9L1"];
		this.modData("Learnsets", "clefquifer").learnset.surf = ["9L1"];
		this.modData("Learnsets", "clefquifer").learnset.trickroom = ["9L1"];
		this.modData("Learnsets", "clefquifer").learnset.waterfall = ["9L1"];
		delete this.modData("Learnsets", "cleffa").learnset.fireblast;
		delete this.modData("Learnsets", "cleffa").learnset.firepunch;
		delete this.modData("Learnsets", "cleffa").learnset.flamethrower;
		delete this.modData("Learnsets", "cleffa").learnset.thunder;
		delete this.modData("Learnsets", "cleffa").learnset.thunderbolt;
		delete this.modData("Learnsets", "cleffa").learnset.thunderpunch;
		delete this.modData("Learnsets", "cleffa").learnset.thunderwave;
		delete this.modData("Learnsets", "clefairy").learnset.fireblast;
		delete this.modData("Learnsets", "clefairy").learnset.firepunch;
		delete this.modData("Learnsets", "clefairy").learnset.flamethrower;
		delete this.modData("Learnsets", "clefairy").learnset.thunder;
		delete this.modData("Learnsets", "clefairy").learnset.thunderbolt;
		delete this.modData("Learnsets", "clefairy").learnset.thunderpunch;
		delete this.modData("Learnsets", "clefairy").learnset.thunderwave;
		delete this.modData("Learnsets", "clefquifer").learnset.fireblast;
		delete this.modData("Learnsets", "clefquifer").learnset.firepunch;
		delete this.modData("Learnsets", "clefquifer").learnset.flamethrower;
		delete this.modData("Learnsets", "clefquifer").learnset.thunder;
		delete this.modData("Learnsets", "clefquifer").learnset.thunderbolt;
		delete this.modData("Learnsets", "clefquifer").learnset.thunderpunch;
		delete this.modData("Learnsets", "clefquifer").learnset.thunderwave;

		// Mushacryo
		this.modData("Learnsets", "mushacryo").learnset.blizzard = ["9L1"];
		this.modData("Learnsets", "mushacryo").learnset.bodyslam = ["9L1"];
		this.modData("Learnsets", "mushacryo").learnset.bulkup = ["9L1"];
		this.modData("Learnsets", "mushacryo").learnset.closecombat = ["9L1"];
		this.modData("Learnsets", "mushacryo").learnset.darkpulse = ["9L1"];
		this.modData("Learnsets", "mushacryo").learnset.darkestlariat = ["9L1"];
		this.modData("Learnsets", "mushacryo").learnset.doubleedge = ["9L1"];
		this.modData("Learnsets", "mushacryo").learnset.earthquake = ["9L1"];
		this.modData("Learnsets", "mushacryo").learnset.freezedry = ["9L1"];
		this.modData("Learnsets", "mushacryo").learnset.icebeam = ["9L1"];
		this.modData("Learnsets", "mushacryo").learnset.iceshard = ["9L1"];
		this.modData("Learnsets", "mushacryo").learnset.icespinner = ["9L1"];
		this.modData("Learnsets", "mushacryo").learnset.iciclecrash = ["9L1"];
		this.modData("Learnsets", "mushacryo").learnset.iciclespear = ["9L1"];
		this.modData("Learnsets", "mushacryo").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "mushacryo").learnset.memento = ["9L1"];
		this.modData("Learnsets", "mushacryo").learnset.slackoff = ["9L1"];
		this.modData("Learnsets", "mushacryo").learnset.suckerpunch = ["9L1"];
		this.modData("Learnsets", "mushacryo").learnset.swordsdance = ["9L1"];
		this.modData("Learnsets", "mushacryo").learnset.tripleaxel = ["9L1"];
		delete this.modData("Learnsets", "mushacryo").learnset.allyswitch;
		delete this.modData("Learnsets", "mushacryo").learnset.amnesia;
		delete this.modData("Learnsets", "mushacryo").learnset.batonpass;
		delete this.modData("Learnsets", "mushacryo").learnset.dreameater;
		delete this.modData("Learnsets", "mushacryo").learnset.energyball;
		delete this.modData("Learnsets", "mushacryo").learnset.psychic;
		delete this.modData("Learnsets", "mushacryo").learnset.psyshock;
		delete this.modData("Learnsets", "mushacryo").learnset.dazzlinggleam;
		delete this.modData("Learnsets", "mushacryo").learnset.expandingforce;
		delete this.modData("Learnsets", "mushacryo").learnset.futuresight;
		delete this.modData("Learnsets", "mushacryo").learnset.psychicterrain;
		delete this.modData("Learnsets", "mushacryo").learnset.psybeam;
		delete this.modData("Learnsets", "mushacryo").learnset.gravity;
		delete this.modData("Learnsets", "mushacryo").learnset.guardswap;
		delete this.modData("Learnsets", "mushacryo").learnset.healingwish;
		delete this.modData("Learnsets", "mushacryo").learnset.hypnosis;
		delete this.modData("Learnsets", "mushacryo").learnset.lightscreen;
		delete this.modData("Learnsets", "mushacryo").learnset.magiccoat;
		delete this.modData("Learnsets", "mushacryo").learnset.mistyexplosion;
		delete this.modData("Learnsets", "mushacryo").learnset.moonlight;
		delete this.modData("Learnsets", "mushacryo").learnset.moonblast;
		delete this.modData("Learnsets", "mushacryo").learnset.reflect;
		delete this.modData("Learnsets", "mushacryo").learnset.storedpower;
		delete this.modData("Learnsets", "mushacryo").learnset.skillswap;
		delete this.modData("Learnsets", "mushacryo").learnset.trickroom;
		delete this.modData("Learnsets", "mushacryo").learnset.wonderroom;
		delete this.modData("Learnsets", "mushacryo").learnset.worryseed;
		delete this.modData("Learnsets", "mushacryo").learnset.raindance;
		delete this.modData("Learnsets", "mushacryo").learnset.shadowball;

		// Nanolinks
		this.modData("Learnsets", "nanolinks").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "nanolinks").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "nanolinks").learnset.zingzap = ["9L1"];

		// Planeknight
		this.modData("Learnsets", "planeknight").learnset.hydropump = ["9L1"];
		this.modData("Learnsets", "planeknight").learnset.liquidation = ["9L1"];
		this.modData("Learnsets", "planeknight").learnset.stealthrock = ["9L1"];
		this.modData("Learnsets", "planeknight").learnset.surf = ["9L1"];
		this.modData("Learnsets", "planeknight").learnset.thunderbolt = ["9L1"];
		this.modData("Learnsets", "planeknight").learnset.vacuumwave = ["9L1"];
		this.modData("Learnsets", "planeknight").learnset.voltswitch = ["9L1"];
		this.modData("Learnsets", "planeknight").learnset.watergun = ["9L1"];
		this.modData("Learnsets", "planeknight").learnset.waterpulse = ["9L1"];
		this.modData("Learnsets", "planeknight").learnset.windmissile = ["9L1"];

		// Probophis
		this.modData("Learnsets", "probophis").learnset.accelerock = ["9L1"];
		this.modData("Learnsets", "probophis").learnset.bulkup = ["9L1"];
		this.modData("Learnsets", "probophis").learnset.fireblast = ["9L1"];
		this.modData("Learnsets", "probophis").learnset.firelash = ["9L1"];
		this.modData("Learnsets", "probophis").learnset.flamethrower = ["9L1"];
		this.modData("Learnsets", "probophis").learnset.flareblitz = ["9L1"];
		this.modData("Learnsets", "probophis").learnset.headsmash = ["9L1"];
		this.modData("Learnsets", "probophis").learnset.meteormash = ["9L1"];
		this.modData("Learnsets", "probophis").learnset.moonlight = ["9L1"];
		delete this.modData("Learnsets", "nosepass").learnset.discharge;
		delete this.modData("Learnsets", "nosepass").learnset.icepunch;
		delete this.modData("Learnsets", "nosepass").learnset.spark;
		delete this.modData("Learnsets", "nosepass").learnset.thunder;
		delete this.modData("Learnsets", "nosepass").learnset.thunderwave;
		delete this.modData("Learnsets", "nosepass").learnset.thunderbolt;
		delete this.modData("Learnsets", "nosepass").learnset.voltswitch;
		delete this.modData("Learnsets", "nosepass").learnset.zapcannon;
		delete this.modData("Learnsets", "probophis").learnset.discharge;
		delete this.modData("Learnsets", "probophis").learnset.icepunch;
		delete this.modData("Learnsets", "probophis").learnset.spark;
		delete this.modData("Learnsets", "probophis").learnset.thunder;
		delete this.modData("Learnsets", "probophis").learnset.thunderwave;
		delete this.modData("Learnsets", "probophis").learnset.thunderbolt;
		delete this.modData("Learnsets", "probophis").learnset.voltswitch;
		delete this.modData("Learnsets", "probophis").learnset.zapcannon;
	}
}