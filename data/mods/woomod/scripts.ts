import {Dex} from '../../../sim/dex';
export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['woomod'],
	},	
	
	init() {
		// Krokorok
		this.modData("Learnsets", "krokorok").learnset.ceaselessedge = ["9L1"];
		this.modData("Learnsets", "krokorok").learnset.smackdown = ["9L1"];
		// Qwilfish-Hisui
		this.modData("Learnsets", "qwilfishhisui").learnset.downtownslide = ["9L1"];
		this.modData("Learnsets", "qwilfishhisui").learnset.rapidspin = ["9L1"];
		this.modData("Learnsets", "qwilfishhisui").learnset.recover = ["9L1"];
		delete this.modData('Learnsets', 'qwilfishhisui').learnset.barbbarrage;
		// Snivy
		this.modData("Learnsets", "snivy").learnset.shimmeringsap = ["9L1"];
		this.modData("Learnsets", "snivy").learnset.aurasphere = ["9L1"];
		this.modData("Learnsets", "snivy").learnset.focusblast = ["9L1"];
		this.modData("Learnsets", "snivy").learnset.closecombat = ["9L1"];
		this.modData("Learnsets", "snivy").learnset.uturn = ["9L1"];
		// Dragonair
		this.modData("Learnsets", "dragonair").learnset.bluemoon = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.dazzlinggleam = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.calmmind = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.moonlight = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.charm = ["9L1"];
		this.modData("Learnsets", "dragonair").learnset.psyshock = ["9L1"];
		delete this.modData('Learnsets', 'dragonair').learnset.extremespeed;
		// Wimpod
		this.modData("Learnsets", "wimpod").learnset.stickyweb = ["9L1"];
		this.modData("Learnsets", "wimpod").learnset.bugbuzz = ["9L1"];
		this.modData("Learnsets", "wimpod").learnset.flamethrower = ["9L1"];
		this.modData("Learnsets", "wimpod").learnset.ember = ["9L1"];
		this.modData("Learnsets", "wimpod").learnset.willowisp = ["9L1"];
		this.modData("Learnsets", "wimpod").learnset.overheat = ["9L1"];
		this.modData("Learnsets", "wimpod").learnset.vcreate = ["9L1"];
		// Tadbulb
		this.modData("Learnsets", "tadbulb").learnset.hydropump = ["9L1"];
		this.modData("Learnsets", "tadbulb").learnset.flipturn = ["9L1"];
		this.modData("Learnsets", "tadbulb").learnset.bouncybubble = ["9L1"];
		this.modData("Learnsets", "tadbulb").learnset.electrodrift = ["9L1"];
		// Pikipek
		this.modData("Learnsets", "pikipek").learnset.playrough = ["9L1"];
		this.modData("Learnsets", "pikipek").learnset.taunt = ["9L1"];
		this.modData("Learnsets", "pikipek").learnset.dazzlinggleam = ["9L1"];
		// Chingling
		this.modData("Learnsets", "chingling").learnset.voltswitch = ["9L1"];
		this.modData("Learnsets", "chingling").learnset.willowisp = ["9L1"];
		// Charmander
		this.modData("Learnsets", "charmander").learnset.flipturn = ["9L1"];
		// Nymble
		this.modData("Learnsets", "nymble").learnset.nymblekick = ["9L1"];
		this.modData("Learnsets", "nymble").learnset.stealthrock = ["9L1"];
		// Vanillite
		this.modData("Learnsets", "vanillite").learnset.scald = ["9L1"];
		this.modData("Learnsets", "vanillite").learnset.voltswitch = ["9L1"];
		this.modData("Learnsets", "vanillite").learnset.vanilliteattackwithtoomanyeffects = ["9L1"];
		// Spheal
		this.modData("Learnsets", "spheal").learnset.hydrosteam = ["9L1"];
		this.modData("Learnsets", "spheal").learnset.flamethrower = ["9L1"];
		this.modData("Learnsets", "spheal").learnset.flipturn = ["9L1"];
		delete this.modData('Learnsets', 'spheal').learnset.surf;
		// Anorith
		this.modData("Learnsets", "anorith").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "anorith").learnset.metalsound = ["9L1"];
		this.modData("Learnsets", "anorith").learnset.stoneaxe = ["9L1"];
		this.modData("Learnsets", "anorith").learnset.wish = ["9L1"];
		this.modData("Learnsets", "anorith").learnset.explosion = ["9L1"];
		this.modData("Learnsets", "anorith").learnset.copycat = ["9L1"];
		// Ditto
		this.modData("Learnsets", "ditto").learnset.explosion = ["9L1"];
		this.modData("Learnsets", "ditto").learnset.bloodmoon = ["9L1"];
		// Jigglypuff
		this.modData("Learnsets", "jigglypuff").learnset.starsmash = ["9L1"];
		this.modData("Learnsets", "jigglypuff").learnset.spikes = ["9L1"];
		// Bronzor
		this.modData("Learnsets", "bronzor").learnset.mentalspin = ["9L1"];
		// Wiglett
		this.modData("Learnsets", "wiglett").learnset.gunkshot = ["9L1"];
		this.modData("Learnsets", "wiglett").learnset.gigadrain = ["9L1"];
		this.modData("Learnsets", "wiglett").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "wiglett").learnset.wigglinglash = ["9L1"];
		this.modData("Learnsets", "wiglett").learnset.sludgebomb = ["9L1"];
		this.modData("Learnsets", "wiglett").learnset.sludgewave = ["9L1"];
		this.modData("Learnsets", "wiglett").learnset.toxic = ["9L1"];
		// Gible
		this.modData("Learnsets", "gible").learnset.overheat = ["9L1"];
		this.modData("Learnsets", "gible").learnset.rapidspin = ["9L1"];
		// Vulpix
		this.modData("Learnsets", "vulpix").learnset.vcreate = ["9L1"];
		// Shuppet
		this.modData("Learnsets", "shuppet").learnset.wish = ["9L1"];
		this.modData("Learnsets", "shuppet").learnset.teleport = ["9L1"];
		// Golett
		this.modData("Learnsets", "golett").learnset.burialblast = ["9L1"];
		this.modData("Learnsets", "golett").learnset.meteorbeam = ["9L1"];
		this.modData("Learnsets", "golett").learnset.gigadrain = ["9L1"];
		// Elgyem
		this.modData("Learnsets", "elgyem").learnset.duoshock = ["9L1"];
		this.modData("Learnsets", "elgyem").learnset.swordsdance = ["9L1"];
		delete this.modData('Learnsets', 'elgyem').learnset.zenheadbutt;
		// Farfetchd
		this.modData("Learnsets", "farfetchd").learnset.ivycudgel = ["9L1"];
		// Amaura
		this.modData("Learnsets", "amaura").learnset.meteorcrash = ["9L1"];
		this.modData("Learnsets", "amaura").learnset.fireblast = ["9L1"];
		this.modData("Learnsets", "amaura").learnset.chillyreception = ["9L1"];
		// Wailmer
		this.modData("Learnsets", "wailmer").learnset.defog = ["9L1"];
		// Pikachu
		this.modData("Learnsets", "pikachu").learnset.flipturn = ["9L1"];
		this.modData("Learnsets", "pikachu").learnset.tachyoncutter = ["9L1"];
		// Morelull
		this.modData("Learnsets", "morelull").learnset.nightmare = ["9L1"];
		this.modData("Learnsets", "morelull").learnset.scorchingsands = ["9L1"];
		delete this.modData('Learnsets', 'morelull').learnset.spore;
	

// Slate 2
	// Houndour
		this.modData("Learnsets", "houndour").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "houndour").learnset.slackoff = ["9L1"];
		this.modData("Learnsets", "houndour").learnset.friendlyfire = ["9L1"];
		this.modData("Learnsets", "houndour").learnset.baddybad = ["9L1"];
		// Koffing
		this.modData("Learnsets", "koffing").learnset.hydropump = ["9L1"];
		this.modData("Learnsets", "koffing").learnset.liquidation = ["9L1"];
		this.modData("Learnsets", "koffing").learnset.flipturn = ["9L1"];
		this.modData("Learnsets", "koffing").learnset.scald = ["9L1"];
		this.modData("Learnsets", "koffing").learnset.waterfall = ["9L1"];
		this.modData("Learnsets", "koffing").learnset.aquaring = ["9L1"];
		this.modData("Learnsets", "koffing").learnset.bubble = ["9L1"];
		this.modData("Learnsets", "koffing").learnset.withdraw = ["9L1"];
		this.modData("Learnsets", "koffing").learnset.watergun = ["9L1"];
		this.modData("Learnsets", "koffing").learnset.soak = ["9L1"];
		this.modData("Learnsets", "koffing").learnset.surf = ["9L1"];
		delete this.modData('Learnsets', 'koffing').learnset.flamethrower;
		// Maushold
		this.modData("Learnsets", "maushold").learnset.rockblast = ["9L1"];
		this.modData("Learnsets", "maushold").learnset.iciclespear = ["9L1"];
		// Hakamo-o
		this.modData("Learnsets", "hakamoo").learnset.clangoroussoul = ["9L1"];
		this.modData("Learnsets", "hakamoo").learnset.flashcannon = ["9L1"];
		this.modData("Learnsets", "hakamoo").learnset.stealthrock = ["9L1"];
		// Kartana
		this.modData("Learnsets", "kartana").learnset.strengthsap = ["9L1"];
		// Ledyba
		this.modData("Learnsets", "ledyba").learnset.ladybugdance = ["9L1"];
		this.modData("Learnsets", "ledyba").learnset.icebeam = ["9L1"];
		// Wooper-Paldea
		this.modData("Learnsets", "wooperpaldea").learnset.woopout = ["9L1"];
		// Hoothoot
		delete this.modData('Learnsets', 'hoothoot').learnset.hurricane;
		// Raboot-Sinnoh
		this.modData("Learnsets", "rabootsinnoh").learnset.frigidlyslide = ["9L1"];
		this.modData("Learnsets", "rabootsinnoh").learnset.chillyreception = ["9L1"];
		this.modData("Learnsets", "rabootsinnoh").learnset.icebeam = ["9L1"];
		this.modData("Learnsets", "rabootsinnoh").learnset.blizzard = ["9L1"];
		this.modData("Learnsets", "rabootsinnoh").learnset.iceball = ["9L1"];
		this.modData("Learnsets", "rabootsinnoh").learnset.dragonrush = ["9L1"];
		this.modData("Learnsets", "rabootsinnoh").learnset.outrage = ["9L1"];
		this.modData("Learnsets", "rabootsinnoh").learnset.dracometeor = ["9L1"];
		this.modData("Learnsets", "rabootsinnoh").learnset.twister = ["9L1"];
		this.modData("Learnsets", "rabootsinnoh").learnset.auroraveil = ["9L1"];
		this.modData("Learnsets", "rabootsinnoh").learnset.snowscape = ["9L1"];
		this.modData("Learnsets", "rabootsinnoh").learnset.dragoncheer = ["9L1"];
		this.modData("Learnsets", "rabootsinnoh").learnset.mist = ["9L1"];
		delete this.modData('Learnsets', 'rabootsinnoh').learnset.blazekick;
		delete this.modData('Learnsets', 'rabootsinnoh').learnset.burningjealousy;
		delete this.modData('Learnsets', 'rabootsinnoh').learnset.ember;
		delete this.modData('Learnsets', 'rabootsinnoh').learnset.fireblast;
		delete this.modData('Learnsets', 'rabootsinnoh').learnset.firefang;
		delete this.modData('Learnsets', 'rabootsinnoh').learnset.firepledge;
		delete this.modData('Learnsets', 'rabootsinnoh').learnset.firespin;
		delete this.modData('Learnsets', 'rabootsinnoh').learnset.flamecharge;
		delete this.modData('Learnsets', 'rabootsinnoh').learnset.flamethrower;
		delete this.modData('Learnsets', 'rabootsinnoh').learnset.flareblitz;
		delete this.modData('Learnsets', 'rabootsinnoh').learnset.heatwave;
		delete this.modData('Learnsets', 'rabootsinnoh').learnset.overheat;
		delete this.modData('Learnsets', 'rabootsinnoh').learnset.sunnyday;
		delete this.modData('Learnsets', 'rabootsinnoh').learnset.swordsdance;
		delete this.modData('Learnsets', 'rabootsinnoh').learnset.temperflare;
		// Honedge
		this.modData("Learnsets", "honedge").learnset.aegislash = ["9L1"];
		// Roselia
		this.modData("Learnsets", "roselia").learnset.knockoff = ["9L1"];
		delete this.modData('Learnsets', 'roselia').learnset.spikes;
		delete this.modData('Learnsets', 'roselia').learnset.sleeppowder;
		// Skiploom
		this.modData("Learnsets", "skiploom").learnset.defog = ["9L1"];
		this.modData("Learnsets", "skiploom").learnset.hurricane = ["9L1"];
		this.modData("Learnsets", "skiploom").learnset.heatwave = ["9L1"];
		delete this.modData('Learnsets', 'skiploom').learnset.absorb;
		delete this.modData('Learnsets', 'skiploom').learnset.bulletseed;
		delete this.modData('Learnsets', 'skiploom').learnset.grassknot;
		delete this.modData('Learnsets', 'skiploom').learnset.leafstorm;
		delete this.modData('Learnsets', 'skiploom').learnset.magicalleaf;
		delete this.modData('Learnsets', 'skiploom').learnset.megadrain;
		delete this.modData('Learnsets', 'skiploom').learnset.seedbomb;
		delete this.modData('Learnsets', 'skiploom').learnset.solarbeam;
		delete this.modData('Learnsets', 'skiploom').learnset.trailblaze;
		delete this.modData('Learnsets', 'skiploom').learnset.toxic;
		// Spritzee
		this.modData("Learnsets", "spritzee").learnset.closecombat = ["9L1"];
		this.modData("Learnsets", "spritzee").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "spritzee").learnset.spiritbreak = ["9L1"];
		delete this.modData('Learnsets', 'spritzee').learnset.thunderbolt;
		// Helioptile
		this.modData("Learnsets", "helioptile").learnset.powergem = ["9L1"];
		this.modData("Learnsets", "helioptile").learnset.meteorbeam = ["9L1"];
		this.modData("Learnsets", "helioptile").learnset.stealthrock = ["9L1"];
		this.modData("Learnsets", "helioptile").learnset.rockblast = ["9L1"];
		this.modData("Learnsets", "helioptile").learnset.earthpower = ["9L1"];
	},
	
	pokemon: {
		hasAbility(ability) {
			if (this.ignoringAbility()) return false;
			if (Array.isArray(ability)) return ability.some(abil => this.hasAbility(abil));
			const abilityid = this.battle.toID(ability);
			return this.ability === abilityid || !!this.volatiles['ability:' + abilityid];
		},
	},
};