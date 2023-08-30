export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	inherit: 'gen9',
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['Alternatium EX'],
		customDoublesTiers: ['Alternatium EX'],
	},

	init() {
		this.modData("Learnsets", "oricorio").learnset.tripleaxel = ["9L1"];
		this.modData("Learnsets", "oricorio").learnset.rapidspin = ["9L1"];
		this.modData("Learnsets", "oricorio").learnset.fierydance = ["9L1"];
		this.modData("Learnsets", "oricorio").learnset.firespin = ["9L1"];
		this.modData("Learnsets", "oricorio").learnset.willowisp = ["9L1"];
		this.modData("Learnsets", "oricorio").learnset.twirlingdance = ["9L1"];
		this.modData("Learnsets", "oricorio").learnset.dualwingbeat = ["9L1"];
		this.modData("Learnsets", "oricorio").learnset.quiverdance = ["9L1"];
		this.modData("Learnsets", "oricorio").learnset.bravebird = ["9L1"];

		this.modData("Learnsets", "ribombee").learnset.gigadrain = ["9L1"];
		this.modData("Learnsets", "ribombee").learnset.thunderwave = ["9L1"];
		this.modData("Learnsets", "ribombee").learnset.magiccoat = ["9L1"];
		this.modData("Learnsets", "ribombee").learnset.pounce = ["9L1"];

		this.modData("Learnsets", "ribombeetotem").learnset.acidspray = ["9L1"];
		this.modData("Learnsets", "ribombeetotem").learnset.corrosivegas = ["9L1"];
		this.modData("Learnsets", "ribombeetotem").learnset.mysticalfire = ["9L1"];
		this.modData("Learnsets", "ribombeetotem").learnset.sludgebomb = ["9L1"];
		this.modData("Learnsets", "ribombeetotem").learnset.sludgewave = ["9L1"];
		this.modData("Learnsets", "ribombeetotem").learnset.strengthsap = ["9L1"];
		this.modData("Learnsets", "ribombeetotem").learnset.venoshock = ["9L1"];
		this.modData("Learnsets", "ribombeetotem").learnset.trailblaze = ["9L1"];
		this.modData("Learnsets", "ribombeetotem").learnset.toxicspikes = ["9L1"];

		this.modData("Learnsets", "araquanid").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "araquanid").learnset.recover = ["9L1"];
		this.modData("Learnsets", "araquanid").learnset.chillingwater = ["9L1"];
		this.modData("Learnsets", "araquanid").learnset.aquacutter = ["9L1"];
		this.modData("Learnsets", "araquanid").learnset.pounce = ["9L1"];

		this.modData("Learnsets", "araquanidtotem").learnset.airslash = ["9L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.healorder = ["9L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.hurricane = ["9L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.nastyplot = ["9L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.sludgebomb = ["9L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.sludgewave = ["9L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.toxic = ["9L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.venomdrench = ["9L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.venoshock = ["9L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.chillingwater = ["9L1"];
		this.modData("Learnsets", "araquanidtotem").learnset.toxicspikes = ["9L1"];

		this.modData("Learnsets", "vikavolt").learnset.geargrind = ["9L1"];
		this.modData("Learnsets", "vikavolt").learnset.irontail = ["9L1"];
		this.modData("Learnsets", "vikavolt").learnset.metalclaw = ["9L1"];
		this.modData("Learnsets", "vikavolt").learnset.ironhead = ["9L1"];
		this.modData("Learnsets", "vikavolt").learnset.switcheroo = ["9L1"];
		this.modData("Learnsets", "vikavolt").learnset.swordsdance = ["9L1"];
		this.modData("Learnsets", "vikavolt").learnset.brickbreak = ["9L1"];
		this.modData("Learnsets", "vikavolt").learnset.zingzap = ["9L1"];
		this.modData("Learnsets", "vikavolt").learnset.stompingtantrum = ["9L1"];
		this.modData("Learnsets", "vikavolt").learnset.doubleshock = ["9L1"];
		delete this.modData('Learnsets', 'grubbin').learnset.stickyweb;
		delete this.modData('Learnsets', 'charjabug').learnset.stickyweb;
		delete this.modData('Learnsets', 'vikavolt').learnset.stickyweb;

		this.modData("Learnsets", "vikavolttotem").learnset.earthquake = ["9L1"];
		this.modData("Learnsets", "vikavolttotem").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "vikavolttotem").learnset.pounce = ["9L1"];
		this.modData("Learnsets", "vikavolttotem").learnset.volttackle = ["9L1"];
		this.modData("Learnsets", "vikavolttotem").learnset.superpower = ["9L1"];
		delete this.modData('Learnsets', 'vikavolttotem').learnset.agility;

		this.modData("Learnsets", "urshifu").learnset.stealthrock = ["9L1"];
		this.modData("Learnsets", "urshifu").learnset.earthquake = ["9L1"];
		this.modData("Learnsets", "urshifu").learnset.powertrip = ["9L1"];
		this.modData("Learnsets", "urshifu").learnset.highhorsepower = ["9L1"];
		this.modData("Learnsets", "urshifu").learnset.stompingtantrum = ["9L1"];
		this.modData("Learnsets", "urshifu").learnset.partingshot = ["9L1"];
		this.modData("Learnsets", "urshifu").learnset.switcheroo = ["9L1"];
		this.modData("Learnsets", "urshifu").learnset.earthpower = ["9L1"];
		this.modData("Learnsets", "urshifu").learnset.nastyplot = ["9L1"];
		this.modData("Learnsets", "urshifu").learnset.bulldoze = ["9L1"];
		this.modData("Learnsets", "urshifu").learnset.spikes = ["9L1"];
		this.modData("Learnsets", "urshifu").learnset.comeuppance = ["9L1"];
		delete this.modData('Learnsets', 'urshifu').learnset.closecombat;
		delete this.modData('Learnsets', 'urshifu').learnset.superpower;
		delete this.modData('Learnsets', 'urshifu').learnset.focuspunch;
		delete this.modData('Learnsets', 'urshifu').learnset.focusblast;
		delete this.modData('Learnsets', 'urshifu').learnset.aurasphere;
		delete this.modData('Learnsets', 'urshifu').learnset.thunderpunch;

		this.modData("Learnsets", "kommoo").learnset.headsmash = ["9L1"];
		this.modData("Learnsets", "kommoo").learnset.stoneedge = ["9L1"];
		this.modData("Learnsets", "kommoo").learnset.meteorbeam = ["9L1"];
		this.modData("Learnsets", "kommoo").learnset.counter = ["9L1"];
		this.modData("Learnsets", "kommoo").learnset.dragonbreath = ["9L1"];
		this.modData("Learnsets", "kommoo").learnset.focuspunch = ["9L1"];
		delete this.modData('Learnsets', 'kommoo').learnset.aurasphere;
		delete this.modData('Learnsets', 'kommoo').learnset.closecombat;

		this.modData("Learnsets", "salazzle").learnset.outrage = ["9L1"];
		this.modData("Learnsets", "salazzle").learnset.thunderwave = ["9L1"];
		this.modData("Learnsets", "salazzle").learnset.bulkup = ["9L1"];
		this.modData("Learnsets", "salazzle").learnset.firerenewal = ["9L1"];
		this.modData("Learnsets", "salazzle").learnset.sandattack = ["9L1"];
		this.modData("Learnsets", "salazzle").learnset.fakeout = ["9L1"];
		this.modData("Learnsets", "salazzle").learnset.mudslap = ["9L1"];
		this.modData("Learnsets", "salazzle").learnset.swordsdance = ["9L1"];
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

		this.modData("Learnsets", "lurantis").learnset.aromatherapy = ["9L1"];
		this.modData("Learnsets", "lurantis").learnset.defog = ["9L1"];
		this.modData("Learnsets", "lurantis").learnset.ghostbite = ["9L1"];
		this.modData("Learnsets", "lurantis").learnset.closecombat = ["9L1"];
		this.modData("Learnsets", "lurantis").learnset.drainpunch = ["9L1"];
		this.modData("Learnsets", "lurantis").learnset.highjumpkick = ["9L1"];
		this.modData("Learnsets", "lurantis").learnset.machpunch = ["9L1"];
		this.modData("Learnsets", "lurantis").learnset.firstimpression = ["9L1"];
		this.modData("Learnsets", "lurantis").learnset.lunge = ["9L1"];
		this.modData("Learnsets", "lurantis").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "lurantis").learnset.attackorder = ["9L1"];
		this.modData("Learnsets", "lurantis").learnset.focusblast = ["9L1"];
		this.modData("Learnsets", "lurantis").learnset.aurasphere = ["9L1"];
		this.modData("Learnsets", "lurantis").learnset.bugbuzz = ["9L1"];
		this.modData("Learnsets", "lurantis").learnset.infestation = ["9L1"];
		this.modData("Learnsets", "lurantis").learnset.bulkup = ["9L1"];
		this.modData("Learnsets", "lurantis").learnset.healorder = ["9L1"];
		this.modData("Learnsets", "lurantis").learnset.defendorder = ["9L1"];
		this.modData("Learnsets", "lurantis").learnset.pounce = ["9L1"];
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

		this.modData("Learnsets", "mrmime").learnset.hypnosis = ["9L1"];
		this.modData("Learnsets", "mrmime").learnset.fakeout = ["9L1"];
		this.modData("Learnsets", "mrmime").learnset.confuseray = ["9L1"];
		this.modData("Learnsets", "mrmime").learnset.powersplit = ["9L1"];
		this.modData("Learnsets", "mrmime").learnset.tickle = ["9L1"];
		this.modData("Learnsets", "mrmime").learnset.hypervoice = ["9L1"];
		this.modData("Learnsets", "mrmime").learnset.triattack = ["9L1"];
		this.modData("Learnsets", "mrmime").learnset.moonblast = ["9L1"];
		this.modData("Learnsets", "mrmime").learnset.slackoff = ["9L1"];
		this.modData("Learnsets", "mrmime").learnset.spikes = ["9L1"];
		this.modData("Learnsets", "mrmime").learnset.uturn = ["9L1"];

		this.modData("Learnsets", "stunfisk").learnset.scorchingsands = ["9L1"];
		this.modData("Learnsets", "stunfisk").learnset.recover = ["9L1"];
		this.modData("Learnsets", "stunfisk").learnset.voltswitch = ["9L1"];
		this.modData("Learnsets", "stunfisk").learnset.rapidspin = ["9L1"];

		delete this.modData('Learnsets', 'meowth').learnset.hypnosis;

		delete this.modData('Learnsets', 'espurr').learnset.shadowball;

		this.modData("Learnsets", "polteageist").learnset.belch = ["9L1"];
		this.modData("Learnsets", "polteageist").learnset.toxic = ["9L1"];
		this.modData("Learnsets", "polteageist").learnset.focusblast = ["9L1"];
		this.modData("Learnsets", "polteageist").learnset.venoshock = ["9L1"];
		this.modData("Learnsets", "polteageist").learnset.toxicspikes = ["9L1"];
		this.modData("Learnsets", "polteageist").learnset.calmmind = ["9L1"];
		this.modData("Learnsets", "polteageist").learnset.sludgebomb = ["9L1"];
		delete this.modData('Learnsets', 'sinistea').learnset.shellsmash;
		delete this.modData('Learnsets', 'sinistea').learnset.nastyplot;
		delete this.modData('Learnsets', 'sinistea').learnset.storedpower;
		delete this.modData('Learnsets', 'polteageist').learnset.shellsmash;
		delete this.modData('Learnsets', 'polteageist').learnset.nastyplot;
		delete this.modData('Learnsets', 'polteageist').learnset.storedpower;


		this.modData("Learnsets", "zapdos").learnset.closecombat = ["9L1"];
		this.modData("Learnsets", "zapdos").learnset.brickbreak = ["9L1"];
		this.modData("Learnsets", "zapdos").learnset.vacuumwave = ["9L1"];
		this.modData("Learnsets", "zapdos").learnset.focusblast = ["9L1"];
		this.modData("Learnsets", "zapdos").learnset.scald = ["9L1"];
		this.modData("Learnsets", "zapdos").learnset.waterfall = ["9L1"];
		this.modData("Learnsets", "zapdos").learnset.hydropump = ["9L1"];
		this.modData("Learnsets", "zapdos").learnset.surf = ["9L1"];
		this.modData("Learnsets", "zapdos").learnset.lifedew = ["9L1"];
		this.modData("Learnsets", "zapdos").learnset.drainpunch = ["9L1"];
		this.modData("Learnsets", "zapdos").learnset.aquacutter = ["9L1"];
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

		this.modData("Learnsets", "moltres").learnset.beakblast = ["9L1"];
		this.modData("Learnsets", "moltres").learnset.superpower = ["9L1"];
		this.modData("Learnsets", "moltres").learnset.turkeybarrage = ["9L1"];
		this.modData("Learnsets", "moltres").learnset.closecombat = ["9L1"];
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

		this.modData("Learnsets", "marowak").learnset.breakingswipe = ["9L1"];
		this.modData("Learnsets", "marowak").learnset.dracometeor = ["9L1"];
		this.modData("Learnsets", "marowak").learnset.dragonbreath = ["9L1"];
		this.modData("Learnsets", "marowak").learnset.dragondance = ["9L1"];
		this.modData("Learnsets", "marowak").learnset.dragonpulse = ["9L1"];
		this.modData("Learnsets", "marowak").learnset.dragonrush = ["9L1"];
		this.modData("Learnsets", "marowak").learnset.scaleshot = ["9L1"];
		this.modData("Learnsets", "marowak").learnset.spikes = ["9L1"];

		this.modData("Learnsets", "marowakalolatotem").learnset.headsmash = ["9L1"];
		this.modData("Learnsets", "marowakalolatotem").learnset.meteorbeam = ["9L1"];
		this.modData("Learnsets", "marowakalolatotem").learnset.powergem = ["9L1"];
		this.modData("Learnsets", "marowakalolatotem").learnset.bulkup = ["9L1"];
		this.modData("Learnsets", "marowakalolatotem").learnset.calmmind = ["9L1"];
		this.modData("Learnsets", "marowakalolatotem").learnset.trickroom = ["9L1"];
		this.modData("Learnsets", "marowakalolatotem").learnset.shoreup = ["9L1"];
		delete this.modData('Learnsets', 'marowakalolatotem').learnset.fireblast;
		delete this.modData('Learnsets', 'marowakalolatotem').learnset.flamecharge;
		delete this.modData('Learnsets', 'marowakalolatotem').learnset.heatwave;
		delete this.modData('Learnsets', 'marowakalolatotem').learnset.willowisp;
		delete this.modData('Learnsets', 'marowakalolatotem').learnset.flamewheel;
		delete this.modData('Learnsets', 'marowakalolatotem').learnset.sunnyday;

		this.modData("Learnsets", "dialga").learnset.doomdesire = ["9L1"];
		this.modData("Learnsets", "dialga").learnset.teleport = ["9L1"];
		this.modData("Learnsets", "dialga").learnset.focusblast = ["9L1"];
		this.modData("Learnsets", "dialga").learnset.trick = ["9L1"];

		this.modData("Learnsets", "palkia").learnset.cosmicpower = ["9L1"];
		this.modData("Learnsets", "palkia").learnset.calmmind = ["9L1"];
		this.modData("Learnsets", "palkia").learnset.teleport = ["9L1"];
		this.modData("Learnsets", "palkia").learnset.zenheadbutt = ["9L1"];
		this.modData("Learnsets", "palkia").learnset.psychicfangs = ["9L1"];
		this.modData("Learnsets", "palkia").learnset.superpower = ["9L1"];
		this.modData("Learnsets", "palkia").learnset.expandingforce = ["9L1"];
		this.modData("Learnsets", "palkia").learnset.hyperspacehole = ["9L1"];
		this.modData("Learnsets", "palkia").learnset.psychic = ["9L1"];
		this.modData("Learnsets", "palkia").learnset.psyshock = ["9L1"];
		this.modData("Learnsets", "palkia").learnset.psychoboost = ["9L1"];
		this.modData("Learnsets", "palkia").learnset.trick = ["9L1"];
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

		this.modData("Learnsets", "gumshoos").learnset.doubleedge = ["9L1"];
		this.modData("Learnsets", "gumshoos").learnset.fakeout = ["9L1"];
		this.modData("Learnsets", "gumshoos").learnset.gunkshot = ["9L1"];
		this.modData("Learnsets", "gumshoos").learnset.poisonjab = ["9L1"];
		this.modData("Learnsets", "gumshoos").learnset.sludgebomb = ["9L1"];
		this.modData("Learnsets", "gumshoos").learnset.sludgewave = ["9L1"];
		this.modData("Learnsets", "gumshoos").learnset.toxicspikes = ["9L1"];
		this.modData("Learnsets", "gumshoos").learnset.superpower = ["9L1"];
		this.modData("Learnsets", "gumshoos").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "gumshoos").learnset.switcheroo = ["9L1"];

		this.modData("Learnsets", "gumshoostotem").learnset.darkestlariat = ["9L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.foulplay = ["9L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.lashout = ["9L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.suckerpunch = ["9L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.powertrip = ["9L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.darkpulse = ["9L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.snarl = ["9L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.obstruct = ["9L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.partingshot = ["9L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.snatch = ["9L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.embargo = ["9L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.stoneedge = ["9L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.rockslide = ["9L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.smackdown = ["9L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.rockblast = ["9L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.powergem = ["9L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.stealthrock = ["9L1"];
		this.modData("Learnsets", "gumshoostotem").learnset.swordsdance = ["9L1"];
		delete this.modData('Learnsets', 'gumshoostotem').learnset.firepunch;
		delete this.modData('Learnsets', 'gumshoostotem').learnset.icepunch;
		delete this.modData('Learnsets', 'gumshoostotem').learnset.thunderpunch;
		delete this.modData('Learnsets', 'gumshoostotem').learnset.shockwave;

		this.modData("Learnsets", "togedemaru").learnset.bulletpunch = ["9L1"];
		this.modData("Learnsets", "togedemaru").learnset.bodypress = ["9L1"];
		this.modData("Learnsets", "togedemaru").learnset.rapidspin = ["9L1"];
		this.modData("Learnsets", "togedemaru").learnset.rockblast = ["9L1"];
		this.modData("Learnsets", "togedemaru").learnset.rockslide = ["9L1"];
		this.modData("Learnsets", "togedemaru").learnset.spinout = ["9L1"];
		this.modData("Learnsets", "togedemaru").learnset.stoneedge = ["9L1"];
		this.modData("Learnsets", "togedemaru").learnset.aurasphere = ["9L1"];
		this.modData("Learnsets", "togedemaru").learnset.energyball = ["9L1"];
		this.modData("Learnsets", "togedemaru").learnset.bulkup = ["9L1"];
		this.modData("Learnsets", "togedemaru").learnset.stealthrock = ["9L1"];
		this.modData("Learnsets", "togedemaru").learnset.powerwhip = ["9L1"];
		this.modData("Learnsets", "togedemaru").learnset.seedbomb = ["9L1"];
		this.modData("Learnsets", "togedemaru").learnset.trailblaze = ["9L1"];
		this.modData("Learnsets", "togedemaru").learnset.bulletseed = ["9L1"];
		this.modData("Learnsets", "togedemaru").learnset.gigadrain = ["9L1"];
		this.modData("Learnsets", "togedemaru").learnset.megadrain = ["9L1"];
		this.modData("Learnsets", "togedemaru").learnset.absorb = ["9L1"];
		this.modData("Learnsets", "togedemaru").learnset.leechseed = ["9L1"];
		this.modData("Learnsets", "togedemaru").learnset.swordsdance = ["9L1"];
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

		this.modData("Learnsets", "tauros").learnset.highhorsepower = ["9L1"];
		this.modData("Learnsets", "tauros").learnset.stealthrock = ["9L1"];
		this.modData("Learnsets", "tauros").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "tauros").learnset.headcharge = ["9L1"];
		this.modData("Learnsets", "tauros").learnset.earthpower = ["9L1"];
		this.modData("Learnsets", "tauros").learnset.headsmash = ["9L1"];

		this.modData("Learnsets", "raichu").learnset.icepunch = ["9L1"];
		this.modData("Learnsets", "raichu").learnset.moonblast = ["9L1"];
		this.modData("Learnsets", "raichu").learnset.paraboliccharge = ["9L1"];
		this.modData("Learnsets", "raichu").learnset.lifedew = ["9L1"];
		this.modData("Learnsets", "raichu").learnset.zippyzap = ["9L1"];
		delete this.modData('Learnsets', 'raichu').learnset.wish;
		delete this.modData('Learnsets', 'pikachu').learnset.wish;
		delete this.modData('Learnsets', 'pichu').learnset.wish;

		this.modData("Learnsets", "rapidash").learnset.poisonjab = ["9L1"];
		this.modData("Learnsets", "rapidash").learnset.jumpkick = ["9L1"];
		this.modData("Learnsets", "rapidash").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "rapidash").learnset.voltswitch = ["9L1"];
		this.modData("Learnsets", "rapidash").learnset.zingzap = ["9L1"];
		delete this.modData('Learnsets', 'rapidash').learnset.swordsdance;

		this.modData("Learnsets", "rapidashgalar").learnset.earthquake = ["9L1"];
		this.modData("Learnsets", "rapidashgalar").learnset.earthpower = ["9L1"];
		this.modData("Learnsets", "rapidashgalar").learnset.scorchingsands = ["9L1"];
		this.modData("Learnsets", "rapidashgalar").learnset.spiritbreak = ["9L1"];
		this.modData("Learnsets", "rapidashgalar").learnset.moonblast = ["9L1"];
		this.modData("Learnsets", "rapidashgalar").learnset.nastyplot = ["9L1"];
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

		this.modData("Learnsets", "golemalola").learnset.shiftgear = ["9L1"];

		this.modData("Learnsets", "cherrim").learnset.solarblade = ["9L1"];
		this.modData("Learnsets", "cherrim").learnset.powerwhip = ["9L1"];
		this.modData("Learnsets", "cherrim").learnset.leafblade = ["9L1"];
		this.modData("Learnsets", "cherrim").learnset.headlongrush = ["9L1"];
		this.modData("Learnsets", "cherrim").learnset.earthquake = ["9L1"];
		this.modData("Learnsets", "cherrim").learnset.highhorsepower = ["9L1"];
		this.modData("Learnsets", "cherrim").learnset.dig = ["9L1"];
		this.modData("Learnsets", "cherrim").learnset.bulldoze = ["9L1"];
		this.modData("Learnsets", "cherrim").learnset.earthpower = ["9L1"];
		this.modData("Learnsets", "cherrim").learnset.stealthrock = ["9L1"];
		this.modData("Learnsets", "cherrim").learnset.superpower = ["9L1"];
		this.modData("Learnsets", "cherrim").learnset.bodypress = ["9L1"];
		this.modData("Learnsets", "cherrim").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "cherrim").learnset.uturn = ["9L1"];

		this.modData("Learnsets", "minior").learnset.dragonhammer = ["9L1"];
		this.modData("Learnsets", "minior").learnset.meteorbeam = ["9L1"];
		this.modData("Learnsets", "minior").learnset.dracometeor = ["9L1"];
		this.modData("Learnsets", "minior").learnset.dragonpulse = ["9L1"];
		this.modData("Learnsets", "minior").learnset.wish = ["9L1"];
		this.modData("Learnsets", "minior").learnset.earthpower = ["9L1"];
		delete this.modData('Learnsets', 'minior').learnset.acrobatics;
		delete this.modData('Learnsets', 'minior').learnset.shellsmash;

		this.modData("Learnsets", "eevee").learnset.extremeevoboost = ["9L1"];
		this.modData("Learnsets", "eevee").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "eevee").learnset.hydropump = ["9L1"];
		this.modData("Learnsets", "eevee").learnset.thunderbolt = ["9L1"];
		this.modData("Learnsets", "eevee").learnset.icebeam = ["9L1"];
		this.modData("Learnsets", "eevee").learnset.psychic = ["9L1"];
		this.modData("Learnsets", "eevee").learnset.gigadrain = ["9L1"];
		this.modData("Learnsets", "eevee").learnset.flamethrower = ["9L1"];
		this.modData("Learnsets", "eevee").learnset.moonblast = ["9L1"];
		delete this.modData('Learnsets', 'eevee').learnset.storedpower;
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
			if (this.battle.gen >= 5 && !this.isActive) return true;
			if (this.getAbility().isPermanent) return false;
			if (this.volatiles['gastroacid']) return true;
			if (this.ability === ('rubberarmor' as ID)) return false;
			if (this.volatiles['rubberarmor']) return true;

			return false;
		},
	},
};
