export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	inherit: 'gen9',
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['Alternatium EX'],
		customDoublesTiers: ['Alternatium EX'],
	},
	
	init: function () {
		this.modData("Learnsets", "oricorio").learnset.tripleaxel = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.rapidspin = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.fierydance = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.firespin = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.willowisp = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.twirlingdance = ["8L1"];
		this.modData("Learnsets", "oricorio").learnset.dualwingbeat = ["8L1"];
		
		this.modData("Learnsets", "ribombee").learnset.gigadrain = ["8L1"];
		this.modData("Learnsets", "ribombee").learnset.thunderwave = ["8L1"];
		this.modData("Learnsets", "ribombee").learnset.magiccoat = ["8L1"];

		this.modData("Learnsets", "ribombeetotem").learnset.acidspray = ["8L1"];
		this.modData("Learnsets", "ribombeetotem").learnset.corrosivegas = ["8L1"];
		this.modData("Learnsets", "ribombeetotem").learnset.mysticalfire = ["8L1"];
		this.modData("Learnsets", "ribombeetotem").learnset.sludgebomb = ["8L1"];
		this.modData("Learnsets", "ribombeetotem").learnset.sludgewave = ["8L1"];
		this.modData("Learnsets", "ribombeetotem").learnset.strengthsap = ["8L1"];
		this.modData("Learnsets", "ribombeetotem").learnset.venoshock = ["8L1"];

		this.modData("Learnsets", "araquanid").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "araquanid").learnset.recover = ["8L1"];

		this.modData("Learnsets", "araquanidtotem").learnset.airslash = ["8L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.healorder = ["8L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.hurricane = ["8L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.nastyplot = ["8L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.sludgebomb = ["8L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.sludgewave = ["8L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.toxic = ["8L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.venomdrench = ["8L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.venoshock = ["8L1"];
		
		this.modData("Learnsets", "vikavolt").learnset.geargrind = ["8L1"];
		this.modData("Learnsets", "vikavolt").learnset.irontail = ["8L1"];
		this.modData("Learnsets", "vikavolt").learnset.metalclaw = ["8L1"];
		this.modData("Learnsets", "vikavolt").learnset.ironhead = ["8L1"];
		this.modData("Learnsets", "vikavolt").learnset.switcheroo = ["8L1"];
		this.modData("Learnsets", "vikavolt").learnset.swordsdance = ["8L1"];
		this.modData("Learnsets", "vikavolt").learnset.brickbreak = ["8L1"];
		this.modData("Learnsets", "vikavolt").learnset.zingzap = ["8L1"];
		this.modData("Learnsets", "vikavolt").learnset.stompingtantrum = ["8L1"];
		delete this.modData('Learnsets', 'grubbin').learnset.stickyweb;
		delete this.modData('Learnsets', 'charjabug').learnset.stickyweb;
		delete this.modData('Learnsets', 'vikavolt').learnset.stickyweb;

		this.modData("Learnsets", "vikavolttotem").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "vikavolttotem").learnset.uturn = ["8L1"];
		delete this.modData('Learnsets', 'vikavolttotem').learnset.agility;
		
		this.modData("Learnsets", "urshifu").learnset.stealthrock = ["8L1"];
		this.modData("Learnsets", "urshifu").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "urshifu").learnset.powertrip = ["8L1"];
		this.modData("Learnsets", "urshifu").learnset.highhorsepower = ["8L1"];
		this.modData("Learnsets", "urshifu").learnset.stompingtantrum = ["8L1"];
		this.modData("Learnsets", "urshifu").learnset.partingshot = ["8L1"];
		this.modData("Learnsets", "urshifu").learnset.switcheroo = ["8L1"];
		this.modData("Learnsets", "urshifu").learnset.earthpower = ["8L1"];
		this.modData("Learnsets", "urshifu").learnset.nastyplot = ["8L1"];
		this.modData("Learnsets", "urshifu").learnset.bulldoze = ["8L1"];
		delete this.modData('Learnsets', 'urshifu').learnset.closecombat;
		delete this.modData('Learnsets', 'urshifu').learnset.superpower;
		delete this.modData('Learnsets', 'urshifu').learnset.focuspunch;
		delete this.modData('Learnsets', 'urshifu').learnset.focusblast;
		delete this.modData('Learnsets', 'urshifu').learnset.aurasphere;
		delete this.modData('Learnsets', 'urshifu').learnset.thunderpunch;
		
		this.modData("Learnsets", "kommoo").learnset.headsmash = ["8L1"];
		this.modData("Learnsets", "kommoo").learnset.stoneedge = ["8L1"];
		this.modData("Learnsets", "kommoo").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "kommoo").learnset.counter = ["8L1"];
		this.modData("Learnsets", "kommoo").learnset.dragonbreath = ["8L1"];
		this.modData("Learnsets", "kommoo").learnset.focuspunch = ["8L1"];
		delete this.modData('Learnsets', 'kommoo').learnset.aurasphere;
		delete this.modData('Learnsets', 'kommoo').learnset.closecombat;
		
		this.modData("Learnsets", "salazzle").learnset.outrage = ["8L1"];
		this.modData("Learnsets", "salazzle").learnset.thunderwave = ["8L1"];
		this.modData("Learnsets", "salazzle").learnset.bulkup = ["8L1"];
		this.modData("Learnsets", "salazzle").learnset.firerenewal = ["8L1"];
		this.modData("Learnsets", "salazzle").learnset.sandattack = ["8L1"];
		this.modData("Learnsets", "salazzle").learnset.fakeout = ["8L1"];
		this.modData("Learnsets", "salazzle").learnset.mudslap = ["8L1"];
		delete this.modData('Learnsets', 'salandit').learnset.gunkshot;
		delete this.modData('Learnsets', 'salandit').learnset.poisonjab;
		delete this.modData('Learnsets', 'salandit').learnset.sludgebomb;
		delete this.modData('Learnsets', 'salandit').learnset.sludgewave;
		delete this.modData('Learnsets', 'salandit').learnset.belch;
		delete this.modData('Learnsets', 'salandit').learnset.poisonfang;
		delete this.modData('Learnsets', 'salandit').learnset.poisongas;
		delete this.modData('Learnsets', 'salandit').learnset.smog;
		delete this.modData('Learnsets', 'salandit').learnset.venomdrench;
		delete this.modData('Learnsets', 'salandit').learnset.venoshock;
		delete this.modData('Learnsets', 'salazzle').learnset.gunkshot;
		delete this.modData('Learnsets', 'salazzle').learnset.poisonjab;
		delete this.modData('Learnsets', 'salazzle').learnset.sludgebomb;
		delete this.modData('Learnsets', 'salazzle').learnset.sludgewave;
		delete this.modData('Learnsets', 'salazzle').learnset.belch;
		delete this.modData('Learnsets', 'salazzle').learnset.corrosivegas;
		delete this.modData('Learnsets', 'salazzle').learnset.crosspoison;
		delete this.modData('Learnsets', 'salazzle').learnset.poisonfang;
		delete this.modData('Learnsets', 'salazzle').learnset.poisongas;
		delete this.modData('Learnsets', 'salazzle').learnset.smog;
		delete this.modData('Learnsets', 'salazzle').learnset.venomdrench;
		delete this.modData('Learnsets', 'salazzle').learnset.venoshock;
		delete this.modData('Learnsets', 'salazzle').learnset.dragondance;
		
		this.modData("Learnsets", "lurantis").learnset.aromatherapy = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.defog = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.ghostbite = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.closecombat = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.drainpunch = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.highjumpkick = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.machpunch = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.firstimpression = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.lunge = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.attackorder = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.focusblast = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.aurasphere = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.bugbuzz = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.infestation = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.bulkup = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.healorder = ["8L1"];
		this.modData("Learnsets", "lurantis").learnset.defendorder = ["8L1"];
		delete this.modData('Learnsets', 'lurantis').learnset.leafblade;
		delete this.modData('Learnsets', 'lurantis').learnset.petalblizzard;
		delete this.modData('Learnsets', 'lurantis').learnset.seedbomb;
		delete this.modData('Learnsets', 'lurantis').learnset.bulletseed;
		delete this.modData('Learnsets', 'lurantis').learnset.grassyglide;
		delete this.modData('Learnsets', 'lurantis').learnset.leafage;
		delete this.modData('Learnsets', 'lurantis').learnset.magicalleaf;
		delete this.modData('Learnsets', 'lurantis').learnset.razorleaf;
		delete this.modData('Learnsets', 'lurantis').learnset.solarblade;
		delete this.modData('Learnsets', 'lurantis').learnset.energyball;
		delete this.modData('Learnsets', 'lurantis').learnset.gigadrain;
		delete this.modData('Learnsets', 'lurantis').learnset.grassknot;
		delete this.modData('Learnsets', 'lurantis').learnset.leafstorm;
		delete this.modData('Learnsets', 'lurantis').learnset.magicalleaf;
		delete this.modData('Learnsets', 'lurantis').learnset.solarbeam;
		delete this.modData('Learnsets', 'lurantis').learnset.synthesis;
		delete this.modData('Learnsets', 'lurantis').learnset.grassyterrain;
		delete this.modData('Learnsets', 'lurantis').learnset.ingrain;
		delete this.modData('Learnsets', 'lurantis').learnset.worryseed;
		
		this.modData("Learnsets", "mrmime").learnset.hypnosis = ["8L1"];
		this.modData("Learnsets", "mrmime").learnset.fakeout = ["8L1"];
		this.modData("Learnsets", "mrmime").learnset.confuseray = ["8L1"];
		this.modData("Learnsets", "mrmime").learnset.powersplit = ["8L1"];
		this.modData("Learnsets", "mrmime").learnset.tickle = ["8L1"];
		this.modData("Learnsets", "mrmime").learnset.hypervoice = ["8L1"];
		this.modData("Learnsets", "mrmime").learnset.triattack = ["8L1"];
		this.modData("Learnsets", "mrmime").learnset.moonblast = ["8L1"];
		this.modData("Learnsets", "mrmime").learnset.slackoff = ["8L1"];
		this.modData("Learnsets", "mrmime").learnset.spikes = ["8L1"];
		this.modData("Learnsets", "mrmime").learnset.uturn = ["8L1"];
		
		this.modData("Learnsets", "stunfisk").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "stunfisk").learnset.recover = ["8L1"];
		this.modData("Learnsets", "stunfisk").learnset.voltswitch = ["8L1"];
		this.modData("Learnsets", "stunfisk").learnset.rapidspin = ["8L1"];
		
		delete this.modData('Learnsets', 'meowth').learnset.hypnosis;
		
		delete this.modData('Learnsets', 'espurr').learnset.shadowball;
		
		this.modData("Learnsets", "polteageist").learnset.belch = ["8L1"];
		this.modData("Learnsets", "polteageist").learnset.toxic = ["8L1"];
		this.modData("Learnsets", "polteageist").learnset.focusblast = ["8L1"];
		this.modData("Learnsets", "polteageist").learnset.venoshock = ["8L1"];
		this.modData("Learnsets", "polteageist").learnset.toxicspikes = ["8L1"];
		this.modData("Learnsets", "polteageist").learnset.calmmind = ["8L1"];
		delete this.modData('Learnsets', 'sinistea').learnset.shellsmash;
		delete this.modData('Learnsets', 'sinistea').learnset.nastyplot;
		delete this.modData('Learnsets', 'sinistea').learnset.storedpower;
		delete this.modData('Learnsets', 'polteageist').learnset.shellsmash;
		delete this.modData('Learnsets', 'polteageist').learnset.nastyplot;
		delete this.modData('Learnsets', 'polteageist').learnset.storedpower;

		
		this.modData("Learnsets", "zapdos").learnset.closecombat = ["8L1"];
		this.modData("Learnsets", "zapdos").learnset.brickbreak = ["8L1"];
		this.modData("Learnsets", "zapdos").learnset.vacuumwave = ["8L1"];
		this.modData("Learnsets", "zapdos").learnset.focusblast = ["8L1"];
		this.modData("Learnsets", "zapdos").learnset.scald = ["8L1"];
		this.modData("Learnsets", "zapdos").learnset.waterfall = ["8L1"];
		this.modData("Learnsets", "zapdos").learnset.hydropump = ["8L1"];
		this.modData("Learnsets", "zapdos").learnset.surf = ["8L1"];
		this.modData("Learnsets", "zapdos").learnset.lifedew = ["8L1"];
		this.modData("Learnsets", "zapdos").learnset.drainpunch = ["8L1"];
		delete this.modData('Learnsets', 'zapdos').learnset.discharge;
		delete this.modData('Learnsets', 'zapdos').learnset.thunderbolt;
		delete this.modData('Learnsets', 'zapdos').learnset.voltswitch;
		delete this.modData('Learnsets', 'zapdos').learnset.wildcharge;
		delete this.modData('Learnsets', 'zapdos').learnset.charge;
		delete this.modData('Learnsets', 'zapdos').learnset.chargebeam;
		delete this.modData('Learnsets', 'zapdos').learnset.eerieimpulse;
		delete this.modData('Learnsets', 'zapdos').learnset.magneticflux;
		delete this.modData('Learnsets', 'zapdos').learnset.risingvoltage;
		delete this.modData('Learnsets', 'zapdos').learnset.shockwave;
		delete this.modData('Learnsets', 'zapdos').learnset.thundershock;
		delete this.modData('Learnsets', 'zapdos').learnset.zapcanon;
		delete this.modData('Learnsets', 'zapdos').learnset.bravebird;
		delete this.modData('Learnsets', 'zapdos').learnset.hurricane;
		delete this.modData('Learnsets', 'zapdos').learnset.roost;
		delete this.modData('Learnsets', 'zapdos').learnset.tailwind;
		delete this.modData('Learnsets', 'zapdos').learnset.aerialace;
		delete this.modData('Learnsets', 'zapdos').learnset.aircutter;
		delete this.modData('Learnsets', 'zapdos').learnset.dualwingbeat;
		delete this.modData('Learnsets', 'zapdos').learnset.fly;
		delete this.modData('Learnsets', 'zapdos').learnset.peck;
		delete this.modData('Learnsets', 'zapdos').learnset.pluck;
		delete this.modData('Learnsets', 'zapdos').learnset.skyattack;
		delete this.modData('Learnsets', 'zapdos').learnset.heatwave;
		
		this.modData("Learnsets", "moltres").learnset.beakblast = ["8L1"];
		this.modData("Learnsets", "moltres").learnset.superpower = ["8L1"];
		this.modData("Learnsets", "moltres").learnset.turkeybarrage = ["8L1"];
		delete this.modData('Learnsets', 'moltres').learnset.fireblast;
		delete this.modData('Learnsets', 'moltres').learnset.flamecharge;
		delete this.modData('Learnsets', 'moltres').learnset.flamethrower;
		delete this.modData('Learnsets', 'moltres').learnset.overheat;
		delete this.modData('Learnsets', 'moltres').learnset.willowisp;
		delete this.modData('Learnsets', 'moltres').learnset.burningjealousy;
		delete this.modData('Learnsets', 'moltres').learnset.burnup;
		delete this.modData('Learnsets', 'moltres').learnset.ember;
		delete this.modData('Learnsets', 'moltres').learnset.firespin;
		delete this.modData('Learnsets', 'moltres').learnset.incinerate;
		delete this.modData('Learnsets', 'moltres').learnset.mysticalfire;
		delete this.modData('Learnsets', 'moltres').learnset.sunnyday;
		delete this.modData('Learnsets', 'moltres').learnset.skyattack;
		
		this.modData("Learnsets", "marowak").learnset.breakingswipe = ["8L1"];
		this.modData("Learnsets", "marowak").learnset.dracometeor = ["8L1"];
		this.modData("Learnsets", "marowak").learnset.dragonbreath = ["8L1"];
		this.modData("Learnsets", "marowak").learnset.dragondance = ["8L1"];
		this.modData("Learnsets", "marowak").learnset.dragonpulse = ["8L1"];
		this.modData("Learnsets", "marowak").learnset.dragonrush = ["8L1"];
		this.modData("Learnsets", "marowak").learnset.scaleshot = ["8L1"];
		
		this.modData("Learnsets", "marowakalolatotem").learnset.headsmash = ["8L1"];
		this.modData("Learnsets", "marowakalolatotem").learnset.meteorbeam = ["8L1"];
		this.modData("Learnsets", "marowakalolatotem").learnset.powergem = ["8L1"];
		this.modData("Learnsets", "marowakalolatotem").learnset.bulkup = ["8L1"];
		this.modData("Learnsets", "marowakalolatotem").learnset.calmmind = ["8L1"];
		this.modData("Learnsets", "marowakalolatotem").learnset.trickroom = ["8L1"];
		this.modData("Learnsets", "marowakalolatotem").learnset.shoreup = ["8L1"];
		delete this.modData('Learnsets', 'marowakalolatotem').learnset.fireblast;
		delete this.modData('Learnsets', 'marowakalolatotem').learnset.flamecharge;
		delete this.modData('Learnsets', 'marowakalolatotem').learnset.heatwave;
		delete this.modData('Learnsets', 'marowakalolatotem').learnset.willowisp;
		delete this.modData('Learnsets', 'marowakalolatotem').learnset.flamewheel;
		delete this.modData('Learnsets', 'marowakalolatotem').learnset.sunnyday;
		
		this.modData("Learnsets", "dialga").learnset.doomdesire = ["8L1"];
		this.modData("Learnsets", "dialga").learnset.teleport = ["8L1"];
		
		this.modData("Learnsets", "palkia").learnset.cosmicpower = ["8L1"];
		this.modData("Learnsets", "palkia").learnset.calmmind = ["8L1"];
		this.modData("Learnsets", "palkia").learnset.teleport = ["8L1"];
		this.modData("Learnsets", "palkia").learnset.zenheadbutt = ["8L1"];
		this.modData("Learnsets", "palkia").learnset.psychicfangs = ["8L1"];
		this.modData("Learnsets", "palkia").learnset.superpower = ["8L1"];
		this.modData("Learnsets", "palkia").learnset.expandingforce = ["8L1"];
		this.modData("Learnsets", "palkia").learnset.hyperspacehole = ["8L1"];
		this.modData("Learnsets", "palkia").learnset.psychic = ["8L1"];
		this.modData("Learnsets", "palkia").learnset.psyshock = ["8L1"];
		this.modData("Learnsets", "palkia").learnset.psychoboost = ["8L1"];
		delete this.modData('Learnsets', 'palkia').learnset.aquaring;
		delete this.modData('Learnsets', 'palkia').learnset.raindance;
		delete this.modData('Learnsets', 'palkia').learnset.aquatail;
		delete this.modData('Learnsets', 'palkia').learnset.liquidation;
		delete this.modData('Learnsets', 'palkia').learnset.dive;
		delete this.modData('Learnsets', 'palkia').learnset.hydropump;
		delete this.modData('Learnsets', 'palkia').learnset.surf;
		delete this.modData('Learnsets', 'palkia').learnset.brine;
		delete this.modData('Learnsets', 'palkia').learnset.waterpulse;
		delete this.modData('Learnsets', 'palkia').learnset.whirlpool;
		
		this.modData("Learnsets", "gumshoos").learnset.doubleedge = ["8L1"];
		this.modData("Learnsets", "gumshoos").learnset.fakeout = ["8L1"];
		this.modData("Learnsets", "gumshoos").learnset.gunkshot = ["8L1"];
		this.modData("Learnsets", "gumshoos").learnset.poisonjab = ["8L1"];
		this.modData("Learnsets", "gumshoos").learnset.sludgebomb = ["8L1"];
		this.modData("Learnsets", "gumshoos").learnset.sludgewave = ["8L1"];
		this.modData("Learnsets", "gumshoos").learnset.toxicspikes = ["8L1"];
		this.modData("Learnsets", "gumshoos").learnset.superpower = ["8L1"];
		this.modData("Learnsets", "gumshoos").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "gumshoos").learnset.switcheroo = ["8L1"];
		
		this.modData("Learnsets", "gumshoostotem").learnset.darkestlariat = ["8L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.foulplay = ["8L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.lashout = ["8L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.suckerpunch = ["8L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.powertrip = ["8L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.darkpulse = ["8L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.snarl = ["8L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.obstruct = ["8L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.partingshot = ["8L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.snatch = ["8L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.embargo = ["8L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.stoneedge = ["8L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.rockslide = ["8L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.smackdown = ["8L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.rockblast = ["8L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.powergem = ["8L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.stealthrock = ["8L1"];
		delete this.modData('Learnsets', 'gumshoostotem').learnset.firepunch;
		delete this.modData('Learnsets', 'gumshoostotem').learnset.icepunch;
		delete this.modData('Learnsets', 'gumshoostotem').learnset.thunderpunch;
		delete this.modData('Learnsets', 'gumshoostotem').learnset.shockwave;
		
		this.modData("Learnsets", "togedemaru").learnset.bulletpunch = ["8L1"];
		this.modData("Learnsets", "togedemaru").learnset.bodypress = ["8L1"];
		this.modData("Learnsets", "togedemaru").learnset.rapidspin = ["8L1"];
		this.modData("Learnsets", "togedemaru").learnset.rockblast = ["8L1"];
		this.modData("Learnsets", "togedemaru").learnset.rockslide = ["8L1"];
		this.modData("Learnsets", "togedemaru").learnset.spinout = ["8L1"];
		this.modData("Learnsets", "togedemaru").learnset.stoneedge = ["8L1"];
		this.modData("Learnsets", "togedemaru").learnset.aurasphere = ["8L1"];
		this.modData("Learnsets", "togedemaru").learnset.energyball = ["8L1"];
		this.modData("Learnsets", "togedemaru").learnset.bulkup = ["8L1"];
		this.modData("Learnsets", "togedemaru").learnset.stealthrock = ["8L1"];
		this.modData("Learnsets", "togedemaru").learnset.swordsdance = ["8L1"];
		delete this.modData('Learnsets', 'togedemaru').learnset.spark;
		delete this.modData('Learnsets', 'togedemaru').learnset.wildcharge;
		delete this.modData('Learnsets', 'togedemaru').learnset.chargebeam;
		delete this.modData('Learnsets', 'togedemaru').learnset.discharge;
		delete this.modData('Learnsets', 'togedemaru').learnset.electroball;
		delete this.modData('Learnsets', 'togedemaru').learnset.electroweb;
		delete this.modData('Learnsets', 'togedemaru').learnset.risingvoltage;
		delete this.modData('Learnsets', 'togedemaru').learnset.shock;
		delete this.modData('Learnsets', 'togedemaru').learnset.thunder;
		delete this.modData('Learnsets', 'togedemaru').learnset.thunderbolt;
		delete this.modData('Learnsets', 'togedemaru').learnset.thundershock;
		delete this.modData('Learnsets', 'togedemaru').learnset.voltswitch;
		delete this.modData('Learnsets', 'togedemaru').learnset.electricterrain;
		
		this.modData("Learnsets", "tauros").learnset.highhorsepower = ["8L1"];
		this.modData("Learnsets", "tauros").learnset.stealthrock = ["8L1"];
		this.modData("Learnsets", "tauros").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "tauros").learnset.headcharge = ["8L1"];
		
		this.modData("Learnsets", "raichu").learnset.icepunch = ["8L1"];
		this.modData("Learnsets", "raichu").learnset.moonblast = ["8L1"];
		this.modData("Learnsets", "raichu").learnset.paraboliccharge = ["8L1"];
		this.modData("Learnsets", "raichu").learnset.lifedew = ["8L1"];
		this.modData("Learnsets", "raichu").learnset.zippyzap = ["8L1"];
		delete this.modData('Learnsets', 'raichu').learnset.wish;
		delete this.modData('Learnsets', 'pikachu').learnset.wish;
		delete this.modData('Learnsets', 'pichu').learnset.wish;
		
		this.modData("Learnsets", "rapidash").learnset.poisonjab = ["8L1"];
		this.modData("Learnsets", "rapidash").learnset.jumpkick = ["8L1"];
		this.modData("Learnsets", "rapidash").learnset.uturn = ["8L1"];
		delete this.modData('Learnsets', 'rapidash').learnset.swordsdance;

		this.modData("Learnsets", "rapidashgalar").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "rapidashgalar").learnset.earthpower = ["8L1"];
		this.modData("Learnsets", "rapidashgalar").learnset.scorchingsands = ["8L1"];
		this.modData("Learnsets", "rapidashgalar").learnset.spiritbreak = ["8L1"];
		this.modData("Learnsets", "rapidashgalar").learnset.moonblast = ["8L1"];
		this.modData("Learnsets", "rapidashgalar").learnset.nastyplot = ["8L1"];
		delete this.modData('Learnsets', 'rapidashgalar').learnset.agility;
		delete this.modData('Learnsets', 'rapidashgalar').learnset.calmmind;
		delete this.modData('Learnsets', 'rapidashgalar').learnset.expandingforce;
		delete this.modData('Learnsets', 'rapidashgalar').learnset.futuresight;
		delete this.modData('Learnsets', 'rapidashgalar').learnset.healingwish;
		delete this.modData('Learnsets', 'rapidashgalar').learnset.psychocut;
		delete this.modData('Learnsets', 'rapidashgalar').learnset.rest;
		delete this.modData('Learnsets', 'rapidashgalar').learnset.storedpower;
		delete this.modData('Learnsets', 'rapidashgalar').learnset.zenheadbutt;
		delete this.modData('Learnsets', 'rapidashgalar').learnset.allyswitch;
		delete this.modData('Learnsets', 'rapidashgalar').learnset.confusion;
		delete this.modData('Learnsets', 'rapidashgalar').learnset.healpulse;
		delete this.modData('Learnsets', 'rapidashgalar').learnset.hypnosis;
		delete this.modData('Learnsets', 'rapidashgalar').learnset.imprison;
		delete this.modData('Learnsets', 'rapidashgalar').learnset.magicroom;
		delete this.modData('Learnsets', 'rapidashgalar').learnset.psybeam;
		delete this.modData('Learnsets', 'rapidashgalar').learnset.psychicterrain;
		delete this.modData('Learnsets', 'rapidashgalar').learnset.trickroom;
		delete this.modData('Learnsets', 'rapidashgalar').learnset.wonderroom;
		delete this.modData('Learnsets', 'ponytagalar').learnset.agility;
		delete this.modData('Learnsets', 'ponytagalar').learnset.calmmind;
		delete this.modData('Learnsets', 'ponytagalar').learnset.expandingforce;
		delete this.modData('Learnsets', 'ponytagalar').learnset.futuresight;
		delete this.modData('Learnsets', 'ponytagalar').learnset.healingwish;
		delete this.modData('Learnsets', 'ponytagalar').learnset.rest;
		delete this.modData('Learnsets', 'ponytagalar').learnset.storedpower;
		delete this.modData('Learnsets', 'ponytagalar').learnset.zenheadbutt;
		delete this.modData('Learnsets', 'ponytagalar').learnset.allyswitch;
		delete this.modData('Learnsets', 'ponytagalar').learnset.confusion;
		delete this.modData('Learnsets', 'ponytagalar').learnset.healpulse;
		delete this.modData('Learnsets', 'ponytagalar').learnset.hypnosis;
		delete this.modData('Learnsets', 'ponytagalar').learnset.imprison;
		delete this.modData('Learnsets', 'ponytagalar').learnset.magicroom;
		delete this.modData('Learnsets', 'ponytagalar').learnset.psybeam;
		
		this.modData("Learnsets", "golemalola").learnset.shiftgear = ["8L1"];
	},
	
	pokemon: {
		isGrounded(negateImmunity = false) {
			if ('gravity' in this.battle.field.pseudoWeather) return true;
			if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
			if ('smackdown' in this.volatiles) return true;
			if ('staccato' in this.volatiles) return true;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return true;
			// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
			if (!negateImmunity && this.hasType('Flying') && !('roost' in this.volatiles)) return false;
			if (this.hasAbility('levitate') && !this.battle.suppressingAttackEvents()) return null;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			return item !== 'airballoon';
		},
		ignoringAbility() {
			// Check if any active pokemon have the ability Neutralizing Gas
			let neutralizinggas = false;
			let rubberarmor = false;
			/*const aurabreakAbilities = ["adaptability", "aerilate", "analytic", "darkaura", "flareboost", "fairyaura", "galvanize", "guts", 
				"hustle", "ironfist", "packleader", "pixilate", "poisontouch", "punkrock", "refrigerate", "sandforce", "shadowworld", "sheerforce",
				"solarpower", "steelworker", "strongjaw", "technician", "toughclaws", "transistor", "waterbubble", "watercycle", "forecast"];*/
			const rubberarmorAbilities = ["blaze", "infiltrator", "libero", "overgrow", "sandforce", "soulreap", "splitsystem", "steelworker", 
				"swarm", "torrent", "unseenfist", "victorystar", "waterbubble"];
			for (const pokemon of this.battle.getAllActive()) {
				// can't use hasAbility because it would lead to infinite recursion
				if (pokemon.ability === ('neutralizinggas' as ID) && !pokemon.volatiles['gastroacid'] &&
					!pokemon.transformed && !pokemon.abilityData.ending) {
					neutralizinggas = true;
					break;
				}
				if (pokemon.ability === ('rubberarmor' as ID) && !pokemon.volatiles['gastroacid'] &&
					!pokemon.transformed) {
					rubberarmor = true;
				}
			}

			return !!(
				(this.battle.gen >= 5 && !this.isActive) ||
				((this.volatiles['gastroacid'] || this.volatiles['rubberarmor'] || (neutralizinggas && this.ability !== ('neutralizinggas' as ID)) ||
					(rubberarmor && rubberarmorAbilities.includes(this.ability))) &&
				!this.getAbility().isPermanent
				)
			);
		},
	},
	hitStepMoveHitLoop(targets, pokemon, move) { // Temporary name
		const damage: (number | boolean | undefined)[] = [];
		for (const i of targets.keys()) {
			damage[i] = 0;
		}
		move.totalDamage = 0;
		pokemon.lastDamage = 0;
		let targetHits = move.multihit || 1;
		if (Array.isArray(targetHits)) {
			// yes, it's hardcoded... meh
			if (targetHits[0] === 2 && targetHits[1] === 5) {
				if (this.gen >= 5) {
					// 35-35-15-15 out of 100 for 2-3-4-5 hits
					targetHits = this.sample([2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5]);
					if (targetHits < 4 && pokemon.hasItem('loadeddice')) {
						targetHits = 5 - this.random(2);
					}
				} else {
					targetHits = this.sample([2, 2, 2, 3, 3, 3, 4, 5]);
				}
			} else {
				targetHits = this.random(targetHits[0], targetHits[1] + 1);
			}
		}
		targetHits = Math.floor(targetHits);
		let nullDamage = true;
		let moveDamage: (number | boolean | undefined)[];
		// There is no need to recursively check the ´sleepUsable´ flag as Sleep Talk can only be used while asleep.
		const isSleepUsable = move.sleepUsable || this.dex.getMove(move.sourceEffect).sleepUsable;

		let targetsCopy: (Pokemon | false | null)[] = targets.slice(0);
		let hit: number;
		for (hit = 1; hit <= targetHits; hit++) {
			if (damage.includes(false)) break;
			if (hit > 1 && pokemon.status === 'slp' && !isSleepUsable) break;
			if (targets.every(target => !target || !target.hp)) break;
			move.hit = hit;
			if (move.smartTarget && targets.length > 1) {
				targetsCopy = [targets[hit - 1]];
			} else {
				targetsCopy = targets.slice(0);
			}
			const target = targetsCopy[0]; // some relevant-to-single-target-moves-only things are hardcoded
			if (target && typeof move.smartTarget === 'boolean') {
				if (hit > 1) {
					this.addMove('-anim', pokemon, move.name, target);
				} else {
					this.retargetLastMove(target);
				}
			}

			// like this (Triple Kick)
			if (target && move.multiaccuracy && hit > 1) {
				let accuracy = move.accuracy;
				const boostTable = [1, 4 / 3, 5 / 3, 2, 7 / 3, 8 / 3, 3];
				if (accuracy !== true) {
					if (!move.ignoreAccuracy) {
						const boosts = this.runEvent('ModifyBoost', pokemon, null, null, {...pokemon.boosts});
						const boost = this.clampIntRange(boosts['accuracy'], -6, 6);
						if (boost > 0) {
							accuracy *= boostTable[boost];
						} else {
							accuracy /= boostTable[-boost];
						}
					}
					if (!move.ignoreEvasion) {
						const boosts = this.runEvent('ModifyBoost', target, null, null, {...target.boosts});
						const boost = this.clampIntRange(boosts['evasion'], -6, 6);
						if (boost > 0) {
							accuracy /= boostTable[boost];
						} else if (boost < 0) {
							accuracy *= boostTable[-boost];
						}
					}
				}
				accuracy = this.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
				if (!move.alwaysHit) {
					accuracy = this.runEvent('Accuracy', target, pokemon, move, accuracy);
					if (accuracy !== true && !this.randomChance(accuracy, 100)) break;
				}
			}

			const moveData = move;
			if (!moveData.flags) moveData.flags = {};

			// Modifies targetsCopy (which is why it's a copy)
			[moveDamage, targetsCopy] = this.spreadMoveHit(targetsCopy, pokemon, move, moveData);

			if (!moveDamage.some(val => val !== false)) break;
			nullDamage = false;

			for (const [i, md] of moveDamage.entries()) {
				// Damage from each hit is individually counted for the
				// purposes of Counter, Metal Burst, and Mirror Coat.
				damage[i] = md === true || !md ? 0 : md;
				// Total damage dealt is accumulated for the purposes of recoil (Parental Bond).
				move.totalDamage += damage[i] as number;
			}
			if (move.mindBlownRecoil) {
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.getEffect('Mind Blown'), true);
				move.mindBlownRecoil = false;
			}
			this.eachEvent('Update');
			if (!pokemon.hp && targets.length === 1) {
				hit++; // report the correct number of hits for multihit moves
				break;
			}
		}
		// hit is 1 higher than the actual hit count
		if (hit === 1) return damage.fill(false);
		if (nullDamage) damage.fill(false);
		if (move.multihit && typeof move.smartTarget !== 'boolean') {
			this.add('-hitcount', targets[0], hit - 1);
		}

		if (move.recoil && move.totalDamage) {
			this.damage(this.calcRecoilDamage(move.totalDamage, move), pokemon, pokemon, 'recoil');
		}

		if (move.struggleRecoil) {
			let recoilDamage;
			if (this.dex.gen >= 5) {
				recoilDamage = this.clampIntRange(Math.round(pokemon.baseMaxhp / 4), 1);
			} else {
				recoilDamage = this.trunc(pokemon.maxhp / 4);
			}
			this.directDamage(recoilDamage, pokemon, pokemon, {id: 'strugglerecoil'} as Condition);
		}

		// smartTarget messes up targetsCopy, but smartTarget should in theory ensure that targets will never fail, anyway
		if (move.smartTarget) targetsCopy = targets.slice(0);
		for (const [i, target] of targetsCopy.entries()) {
			if (target && pokemon !== target) {
				target.gotAttacked(move, damage[i] as number | false | undefined, pokemon);
				if (typeof damage[i] === 'number') {
					if (!target.m.timesAttacked) target.m.timesAttacked = 0;
					target.m.timesAttacked += hit - 1;
				}
			}
		}
		
		if (move.ohko && !targets[0].hp) this.add('-ohko');

		if (!damage.some(val => !!val || val === 0)) return damage;

		this.eachEvent('Update');

		this.afterMoveSecondaryEvent(targetsCopy.filter(val => !!val) as Pokemon[], pokemon, move);

		if (!move.negateSecondary && !(move.hasSheerForce && pokemon.hasAbility('sheerforce'))) {
			for (const [i, d] of damage.entries()) {
				// There are no multihit spread moves, so it's safe to use move.totalDamage for multihit moves
				// The previous check was for `move.multihit`, but that fails for Dragon Darts
				const curDamage = targets.length === 1 ? move.totalDamage : d;
				if (typeof curDamage === 'number' && targets[i].hp) {
					const targetHPBeforeDamage = (targets[i].hurtThisTurn || 0) + curDamage;
					if (targets[i].hp <= targets[i].maxhp / 2 && targetHPBeforeDamage > targets[i].maxhp / 2) {
						this.runEvent('EmergencyExit', targets[i], pokemon);
					}
				}
			}
		}
		return damage;
	},
};
