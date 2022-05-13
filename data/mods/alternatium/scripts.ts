export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['Alternatium'],
		customDoublesTiers: ['Alternatium'],
	},
	
	// included for Aura Break
	pokemon: {
		ignoringAbility() {
			// Check if any active pokemon have the ability Neutralizing Gas
			let neutralizinggas = false;
			let aurabreak = false;
			const aurabreakAbilities = ["adaptability", "aerilate", "analytic", "darkaura", "flareboost", "fairyaura", "galvanize", "guts", 
				"hustle", "ironfist", "packleader", "pixilate", "poisontouch", "punkrock", "refrigerate", "sandforce", "shadowworld", "sheerforce",
				"solarpower", "steelworker", "strongjaw", "technician", "toughclaws", "transistor", "waterbubble", "watercycle", "forecast"];
			for (const pokemon of this.battle.getAllActive()) {
				// can't use hasAbility because it would lead to infinite recursion
				if (pokemon.ability === ('neutralizinggas' as ID) && !pokemon.volatiles['gastroacid'] &&
					!pokemon.transformed && !pokemon.abilityData.ending) {
					neutralizinggas = true;
					break;
				}
				if (pokemon.ability === ('aurabreak' as ID) && !pokemon.volatiles['gastroacid'] &&
					!pokemon.transformed) {
					aurabreak = true;
				}
			}

			return !!(
				(this.battle.gen >= 5 && !this.isActive) ||
				((this.volatiles['gastroacid'] || (neutralizinggas && this.ability !== ('neutralizinggas' as ID)) ||
					(aurabreak && aurabreakAbilities.includes(this.ability))) &&
				!this.getAbility().isPermanent
				)
			);
		},
	},
	
	init: function () {
		/*Template:
		this.modData('Learnsets', 'pokemon').learnset.move = ['8L1'];
		delete this.modData('Learnsets', 'pokemon').learnset.move;*/
		//Slate 1
		this.modData("Learnsets", "silvally").learnset.recover = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.stealthrock = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.nastyplot = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.stoneedge = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.shadowsneak = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.gigadrain = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.drainpunch = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.wildcharge = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.psychic = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.tripleaxel = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.earthpower = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.aurasphere = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.calmmind = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.fireblast = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.thunder = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.taunt = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.superpower = ["8L1"];
		this.modData("Learnsets", "silvally").learnset.extremespeed = ["8L1"];
		
		//Slate 3
		this.modData("Learnsets", "darmanitan").learnset.crunch = ["8L1"];
		this.modData("Learnsets", "darmanitan").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "darmanitan").learnset.psychicfangs = ["8L1"];
		this.modData("Learnsets", "darmanitan").learnset.thunderfang = ["8L1"];
		this.modData("Learnsets", "darmanitan").learnset.superfang = ["8L1"];
		this.modData("Learnsets", "darmanitan").learnset.hyperfang = ["8L1"];
		
		this.modData("Learnsets", "darmanitangalar").learnset.tripleaxel = ["8L1"];
		this.modData("Learnsets", "darmanitangalar").learnset.iceshard = ["8L1"];
		this.modData("Learnsets", "darmanitangalar").learnset.accelerock = ["8L1"];
		this.modData("Learnsets", "darmanitangalar").learnset.rockblast = ["8L1"];
		
		//Slate 4
		this.modData("Learnsets", "zacian").learnset.spikes = ["8L1"];
		this.modData("Learnsets", "zacian").learnset.moonlight = ["8L1"];
		this.modData("Learnsets", "zacian").learnset.behemothblade = ["8L1"];
		this.modData("Learnsets", "zacian").learnset.uturn = ["8L1"];
		// Zamazenta
		this.modData("Learnsets", "zamazenta").learnset.bodypress = ["8L1"];
		this.modData("Learnsets", "zamazenta").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "zamazenta").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "zamazenta").learnset.bulkup = ["8L1"];
		this.modData("Learnsets", "zamazenta").learnset.moonlight = ["8L1"];
		this.modData("Learnsets", "zamazenta").learnset.stealthrock = ["8L1"];
		this.modData("Learnsets", "zamazenta").learnset.kingsshield = ["8L1"];
		this.modData("Learnsets", "zamazenta").learnset.recover = ["8L1"];
		this.modData("Learnsets", "zamazenta").learnset.behemothbash = ["8L1"];

		//Slate 5
		this.modData("Learnsets", "rotom").learnset.recover = ["8L1"];
		this.modData("Learnsets", "rotom").learnset.taunt = ["8L1"];
		
		//Slate 6
		this.modData("Learnsets", "dugtrio").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "dugtrio").learnset.foulplay = ["8L1"];
		this.modData("Learnsets", "dugtrio").learnset.drillrun = ["8L1"];
		this.modData("Learnsets", "dugtrio").learnset.poisontail = ["8L1"];
		this.modData("Learnsets", "dugtrio").learnset.psychocut = ["8L1"];
		this.modData("Learnsets", "dugtrio").learnset.attackorder = ["8L1"];
		this.modData("Learnsets", "dugtrio").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "dugtrio").learnset.pursuit = ["8L1"];

		this.modData("Learnsets", "dugtrioalola").learnset.shoreup = ["8L1"];
		this.modData("Learnsets", "dugtrioalola").learnset.bulkup = ["8L1"];
		this.modData("Learnsets", "dugtrioalola").learnset.coil = ["8L1"];
		this.modData("Learnsets", "dugtrioalola").learnset.geargrind = ["8L1"];
		this.modData("Learnsets", "dugtrioalola").learnset.pursuit = ["8L1"];
		
		this.modData("Learnsets", "muk").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "muk").learnset.bulkup = ["8L1"];
		this.modData("Learnsets", "muk").learnset.stoneedge = ["8L1"];
		this.modData("Learnsets", "muk").learnset.rockslide = ["8L1"];
		this.modData("Learnsets", "muk").learnset.moonlight = ["8L1"];
		this.modData("Learnsets", "muk").learnset.stealthrock = ["8L1"];
		
		//Slate 7
		this.modData("Learnsets", "slowbro").learnset.earthpower = ["8L1"];
		this.modData("Learnsets", "slowbro").learnset.stealthrock = ["8L1"];
		this.modData("Learnsets", "slowbro").learnset.rapidspin = ["8L1"];
		this.modData("Learnsets", "slowbro").learnset.scorchingsands = ["8L1"];

		this.modData("Learnsets", "slowbrogalar").learnset.toxic = ["8L1"];
		this.modData("Learnsets", "slowbrogalar").learnset.toxicspikes = ["8L1"];
		this.modData("Learnsets", "slowbrogalar").learnset.teleport = ["8L1"];

		this.modData("Learnsets", "slowking").learnset.healbell = ["8L1"];
		this.modData("Learnsets", "slowking").learnset.voltswitch = ["8L1"];
		this.modData("Learnsets", "slowking").learnset.discharge = ["8L1"];
		this.modData("Learnsets", "slowking").learnset.risingvoltage = ["8L1"];
		this.modData("Learnsets", "slowking").learnset.thunderbolt = ["8L1"];
		this.modData("Learnsets", "slowking").learnset.thunder = ["8L1"];

		this.modData("Learnsets", "slowkinggalar").learnset.toxic = ["8L1"];
		this.modData("Learnsets", "slowkinggalar").learnset.toxicspikes = ["8L1"];
		this.modData("Learnsets", "slowkinggalar").learnset.corrosivegas = ["8L1"];
		this.modData("Learnsets", "slowkinggalar").learnset.darkpulse = ["8L1"];
		delete this.modData('Learnsets', 'slowkinggalar').learnset.expandingforce;
		delete this.modData('Learnsets', 'slowpokegalar').learnset.expandingforce;
		
		
		//Slate 8
		this.modData("Learnsets", "tornadus").learnset.rapidspin = ["8L1"];
		this.modData("Learnsets", "tornadus").learnset.fakeout = ["8L1"];
		this.modData("Learnsets", "tornadus").learnset.roost = ["8L1"];
		this.modData("Learnsets", "tornadus").learnset.stormthrow = ["8L1"];
		this.modData("Learnsets", "tornadus").learnset.fellstinger = ["8L1"];
		this.modData("Learnsets", "tornadus").learnset.dualwingbeat = ["8L1"];
		this.modData("Learnsets", "tornadus").learnset.swordsdance = ["8L1"];
		this.modData("Learnsets", "tornadus").learnset.closecombat = ["8L1"];
		this.modData("Learnsets", "tornadus").learnset.drainpunch = ["8L1"];
		this.modData("Learnsets", "tornadus").learnset.dragondance = ["8L1"];
		this.modData("Learnsets", "tornadus").learnset.quickattack = ["8L1"];
		delete this.modData('Learnsets', 'tornadus').learnset.acrobatics;
		delete this.modData('Learnsets', 'tornadus').learnset.uturn;
		delete this.modData('Learnsets', 'tornadus').learnset.hammerarm;

		this.modData("Learnsets", "thundurus").learnset.recover = ["8L1"];

		this.modData("Learnsets", "landorus").learnset.airslash = ["8L1"];
		this.modData("Learnsets", "landorus").learnset.energyball = ["8L1"];
		delete this.modData('Learnsets', 'landorus').learnset.bulldoze;
		delete this.modData('Learnsets', 'landorus').learnset.superpower;
		
		//Slate 10
		this.modData("Learnsets", "genesect").learnset.voltswitch = ["8L1"];
		this.modData("Learnsets", "genesect").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "genesect").learnset.poisonjab = ["8L1"];
		this.modData("Learnsets", "genesect").learnset.iciclecrash = ["8L1"];
		this.modData("Learnsets", "genesect").learnset.recover = ["8L1"];
		this.modData("Learnsets", "genesect").learnset.technoblastbase = ["8L1"];
		delete this.modData('Learnsets', 'genesect').learnset.shiftgear;
		delete this.modData('Learnsets', 'genesect').learnset.extremespeed;
		
		//Slate 11
		this.modData("Learnsets", "groudon").learnset.spikes = ["8L1"];
		this.modData("Learnsets", "groudon").learnset.recover = ["8L1"];
		delete this.modData('Learnsets', 'groudon').learnset.swordsdance;
		
		this.modData("Learnsets", "kyogre").learnset.spikes = ["8L1"];
		this.modData("Learnsets", "kyogre").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "kyogre").learnset.earthpower = ["8L1"];
		this.modData("Learnsets", "kyogre").learnset.hurricane = ["8L1"];
		delete this.modData('Learnsets', 'kyogre').learnset.waterspout;
		
		//Slate 13
		this.modData("Learnsets", "sandslashalola").learnset.zingzap = ["8L1"];
		this.modData("Learnsets", "sandslashalola").learnset.thunderpunch = ["8L1"];
		this.modData("Learnsets", "sandslashalola").learnset.wildcharge = ["8L1"];
		this.modData("Learnsets", "sandslashalola").learnset.thunderbolt = ["8L1"];
		this.modData("Learnsets", "sandslashalola").learnset.thunder = ["8L1"];
		this.modData("Learnsets", "sandslashalola").learnset.voltswitch = ["8L1"];
		this.modData("Learnsets", "sandslashalola").learnset.freezedry = ["8L1"];
		this.modData("Learnsets", "sandslashalola").learnset.electroball = ["8L1"];
		this.modData("Learnsets", "sandslashalola").learnset.paraboliccharge = ["8L1"];
		this.modData("Learnsets", "sandslashalola").learnset.electricterrain = ["8L1"];
		this.modData("Learnsets", "sandslashalola").learnset.charge = ["8L1"];
		this.modData("Learnsets", "sandslashalola").learnset.painsplit = ["8L1"];
		this.modData("Learnsets", "sandslashalola").learnset.nastyplot = ["8L1"];
		delete this.modData('Learnsets', 'sandslashalola').learnset.steelroller;
		delete this.modData('Learnsets', 'sandslashalola').learnset.steelbeam;
		delete this.modData('Learnsets', 'sandshrewalola').learnset.steelroller;
		delete this.modData('Learnsets', 'sandshrewalola').learnset.steelbeam;
		
		this.modData("Learnsets", "ninetalesalola").learnset.snowstorm = ["8L1"];
		this.modData("Learnsets", "ninetalesalola").learnset.flashcannon = ["8L1"];
		this.modData("Learnsets", "ninetalesalola").learnset.steelbeam = ["8L1"];
		this.modData("Learnsets", "ninetalesalola").learnset.earthpower = ["8L1"];
		this.modData("Learnsets", "ninetalesalola").learnset.willowisp = ["8L1"];
		this.modData("Learnsets", "ninetalesalola").learnset.taunt = ["8L1"];
		this.modData("Learnsets", "ninetalesalola").learnset.recover = ["8L1"];
		this.modData("Learnsets", "ninetalesalola").learnset.ironhead = ["8L1"];
		
		//Slate 14
		this.modData("Learnsets", "giratina").learnset.dragondance = ["8L1"];
		this.modData("Learnsets", "giratina").learnset.heatcrash = ["8L1"];
		this.modData("Learnsets", "giratina").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "giratina").learnset.roost = ["8L1"];
		this.modData("Learnsets", "giratina").learnset.wish = ["8L1"];

		this.modData("Learnsets", "eternatus").learnset.taunt = ["8L1"];
		this.modData("Learnsets", "eternatus").learnset.calmmind = ["8L1"];
		delete this.modData('Learnsets', 'eternatus').learnset.eternabeam;
		delete this.modData('Learnsets', 'eternatus').learnset.dracometeor;
		
		//Slate 15
		this.modData("Learnsets", "weezing").learnset.flashcannon = ["8L1"];
		this.modData("Learnsets", "weezing").learnset.earthpower = ["8L1"];
		this.modData("Learnsets", "weezing").learnset.strengthsap = ["8L1"];
		delete this.modData('Learnsets', 'weezing').learnset.flamethrower;
		delete this.modData('Learnsets', 'weezing').learnset.fireblast;
		delete this.modData('Learnsets', 'koffing').learnset.flamethrower;
		delete this.modData('Learnsets', 'koffing').learnset.fireblast;
		
		this.modData("Learnsets", "exeggutor").learnset.bodypress = ["8L1"];
		this.modData("Learnsets", "exeggutor").learnset.stuffcheeks = ["8L1"];
		this.modData("Learnsets", "exeggutor").learnset.eggbomb = ["8L1"];
		this.modData("Learnsets", "exeggutor").learnset.drainingkiss = ["8L1"];
		this.modData("Learnsets", "exeggutor").learnset.dazzlinggleam = ["8L1"];
		this.modData("Learnsets", "exeggutor").learnset.moonblast = ["8L1"];
		this.modData("Learnsets", "exeggutor").learnset.mysticalfire = ["8L1"];
		this.modData("Learnsets", "exeggutor").learnset.playrough = ["8L1"];
		delete this.modData('Learnsets', 'exeggutor').learnset.confusion;
		delete this.modData('Learnsets', 'exeggutor').learnset.expandingforce;
		delete this.modData('Learnsets', 'exeggutor').learnset.extrasensory;
		delete this.modData('Learnsets', 'exeggutor').learnset.futuresight;
		delete this.modData('Learnsets', 'exeggutor').learnset.psybeam;
		delete this.modData('Learnsets', 'exeggutor').learnset.psychic;
		delete this.modData('Learnsets', 'exeggutor').learnset.psychocut;
		delete this.modData('Learnsets', 'exeggutor').learnset.psyshock;
		delete this.modData('Learnsets', 'exeggutor').learnset.storedpower;
		delete this.modData('Learnsets', 'exeggutor').learnset.zenheadbutt;
		delete this.modData('Learnsets', 'exeggcute').learnset.confusion;
		delete this.modData('Learnsets', 'exeggcute').learnset.extrasensory;
		delete this.modData('Learnsets', 'exeggcute').learnset.psybeam;
		delete this.modData('Learnsets', 'exeggcute').learnset.psychic;
		
		//Slate 16
		this.modData("Learnsets", "raticate").learnset.gunkshot = ["8L1"];
		this.modData("Learnsets", "raticate").learnset.toxicspikes = ["8L1"];
		this.modData("Learnsets", "raticate").learnset.rapidspin = ["8L1"];
		this.modData("Learnsets", "raticate").learnset.poisonjab = ["8L1"];
		this.modData("Learnsets", "raticate").learnset.thunderpunch = ["8L1"];
		this.modData("Learnsets", "raticate").learnset.firepunch = ["8L1"];
		this.modData("Learnsets", "raticate").learnset.icepunch = ["8L1"];
		this.modData("Learnsets", "raticate").learnset.taunt = ["8L1"];
		this.modData("Learnsets", "raticate").learnset.bulkup = ["8L1"];
		
		this.modData("Learnsets", "raticatealola").learnset.powertrip = ["8L1"];
		this.modData("Learnsets", "raticatealola").learnset.poltergeist = ["8L1"];
		this.modData("Learnsets", "raticatealola").learnset.shadowsneak = ["8L1"];
		this.modData("Learnsets", "raticatealola").learnset.phantomforce = ["8L1"];
		this.modData("Learnsets", "raticatealola").learnset.slackoff = ["8L1"];
		
		this.modData("Learnsets", "linoone").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "linoone").learnset.moonblast = ["8L1"];
		this.modData("Learnsets", "linoone").learnset.hypervoice = ["8L1"];
		this.modData("Learnsets", "linoone").learnset.earthpower = ["8L1"];
		this.modData("Learnsets", "linoone").learnset.focusblast = ["8L1"];
		this.modData("Learnsets", "linoone").learnset.vacuumwave = ["8L1"];
		delete this.modData('Learnsets', 'linoone').learnset.bellydrum;
		delete this.modData('Learnsets', 'zigzagoon').learnset.bellydrum;
		
		//Slate 17
		this.modData("Learnsets", "castform").learnset.freezedry = ["8L1"];
		this.modData("Learnsets", "castform").learnset.scald = ["8L1"];
		this.modData("Learnsets", "castform").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "castform").learnset.calmmind = ["8L1"];
		this.modData("Learnsets", "castform").learnset.auroraveil = ["8L1"];
		this.modData("Learnsets", "castform").learnset.willowisp = ["8L1"];
		this.modData("Learnsets", "castform").learnset.soak = ["8L1"];
		
		//Slate 18
		this.modData("Learnsets", "wormadam").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "wormadam").learnset.leechlife = ["8L1"];
		this.modData("Learnsets", "wormadam").learnset.megahorn = ["8L1"];
		this.modData("Learnsets", "wormadam").learnset.hornleech = ["8L1"];
		this.modData("Learnsets", "wormadam").learnset.leafblade = ["8L1"];
		this.modData("Learnsets", "wormadam").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "wormadam").learnset.explosion = ["8L1"];
		this.modData("Learnsets", "wormadam").learnset.rapidspin = ["8L1"];
		this.modData("Learnsets", "wormadam").learnset.stealthrock = ["8L1"];
		this.modData("Learnsets", "wormadam").learnset.thunderwave = ["8L1"];
		this.modData("Learnsets", "wormadam").learnset.leechseed = ["8L1"];
		this.modData("Learnsets", "wormadam").learnset.aromatherapy = ["8L1"];
		this.modData("Learnsets", "wormadam").learnset.healingwish = ["8L1"];
		delete this.modData('Learnsets', 'wormadam').learnset.quiverdance;
		
		//Slate 19
		this.modData("Learnsets", "farfetchd").learnset.leafblade = ["8L1"];
		this.modData("Learnsets", "farfetchd").learnset.solarblade = ["8L1"];
		this.modData("Learnsets", "farfetchd").learnset.energyball = ["8L1"];

		this.modData("Learnsets", "farfetchdgalar").learnset.naturalgift = ["8L1"];
		this.modData("Learnsets", "farfetchdgalar").learnset.powertrip = ["8L1"];
		this.modData("Learnsets", "farfetchdgalar").learnset.bodypress = ["8L1"];
		this.modData("Learnsets", "farfetchdgalar").learnset.tailwind = ["8L1"];
		this.modData("Learnsets", "farfetchdgalar").learnset.reversal = ["8L1"];
		this.modData("Learnsets", "farfetchdgalar").learnset.fling = ["8L1"];
		this.modData("Learnsets", "farfetchdgalar").learnset.leechseed = ["8L1"];
		this.modData("Learnsets", "farfetchdgalar").learnset.branchpoke = ["8L1"];
		this.modData("Learnsets", "farfetchdgalar").learnset.roost = ["8L1"];

		this.modData("Learnsets", "corsola").learnset.powergem = ["8L1"];
		this.modData("Learnsets", "corsola").learnset.mistyterrain = ["8L1"];
		this.modData("Learnsets", "corsola").learnset.moonblast = ["8L1"];
		this.modData("Learnsets", "corsola").learnset.dazzlinggleam = ["8L1"];
		this.modData("Learnsets", "corsola").learnset.teleport = ["8L1"];
		this.modData("Learnsets", "corsola").learnset.swordsdance = ["8L1"];
		this.modData("Learnsets", "corsola").learnset.accelerock = ["8L1"];
		this.modData("Learnsets", "corsola").learnset.coralcrash = ["8L1"];
		
		//Slate 20
		this.modData("Learnsets", "shaymin").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "shaymin").learnset.recover = ["8L1"];
		this.modData("Learnsets", "shaymin").learnset.topsyturvy = ["8L1"];
		
		this.modData("Learnsets", "keldeo").learnset.bulkup = ["8L1"];
		this.modData("Learnsets", "keldeo").learnset.agility = ["8L1"];
		this.modData("Learnsets", "keldeo").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "keldeo").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "keldeo").learnset.leechseed = ["8L1"];
		this.modData("Learnsets", "keldeo").learnset.defog = ["8L1"];
		this.modData("Learnsets", "keldeo").learnset.painsplit = ["8L1"];

		this.modData("Learnsets", "meloetta").learnset.recover = ["8L1"];
		this.modData("Learnsets", "meloetta").learnset.moonblast = ["8L1"];
		this.modData("Learnsets", "meloetta").learnset.relicsongmeloetta = ["8L1"];
		
		//Slate 21
		this.modData("Learnsets", "lycanrocdusk").learnset.morningsun = ["8L1"];
		this.modData("Learnsets", "lycanrocdusk").learnset.moonlight = ["8L1"];
		this.modData("Learnsets", "lycanrocdusk").learnset.earthquake = ["8L1"];
		
		//Slate 22
		delete this.modData('Learnsets', 'gourgeist').learnset.nastyplot;
		
		//Slate 23
		this.modData("Learnsets", "cramorant").learnset.beakblast = ["8L1"];
		this.modData("Learnsets", "cramorant").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "cramorant").learnset.nastyplot = ["8L1"];
		this.modData("Learnsets", "cramorant").learnset.focusblast = ["8L1"];
		this.modData("Learnsets", "cramorant").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "cramorant").learnset.stealthrock = ["8L1"];
		this.modData("Learnsets", "cramorant").learnset.gulpmissile = ["8L1"];
		delete this.modData('Learnsets', 'cramorant').learnset.dive;
		delete this.modData('Learnsets', 'cramorant').learnset.liquidation;
		delete this.modData('Learnsets', 'cramorant').learnset.hydropump;
		delete this.modData('Learnsets', 'cramorant').learnset.scald;
		delete this.modData('Learnsets', 'cramorant').learnset.surf;
		delete this.modData('Learnsets', 'cramorant').learnset.watergun;
		delete this.modData('Learnsets', 'cramorant').learnset.whirlpool;
		delete this.modData('Learnsets', 'cramorant').learnset.aquaring;
		delete this.modData('Learnsets', 'cramorant').learnset.raindance;

		this.modData("Learnsets", "eiscue").learnset.aquajet = ["8L1"];
		this.modData("Learnsets", "eiscue").learnset.tripleaxel = ["8L1"];
		this.modData("Learnsets", "eiscue").learnset.flipturn = ["8L1"];
		this.modData("Learnsets", "eiscue").learnset.fishiousrend = ["8L1"];
		this.modData("Learnsets", "eiscue").learnset.freezedry = ["8L1"];
		this.modData("Learnsets", "eiscue").learnset.scald = ["8L1"];
		this.modData("Learnsets", "eiscue").learnset.moonlight = ["8L1"];
		delete this.modData('Learnsets', 'eiscue').learnset.agility;
		
		//Slate 24
		this.modData("Learnsets", "mimikyu").learnset.lightblast = ["8L1"];
		this.modData("Learnsets", "mimikyu").learnset.spiritbreak = ["8L1"];
		this.modData("Learnsets", "mimikyu").learnset.superpower = ["8L1"];
		this.modData("Learnsets", "mimikyu").learnset.thunderpunch = ["8L1"];
		this.modData("Learnsets", "mimikyu").learnset.voltswitch = ["8L1"];
		this.modData("Learnsets", "mimikyu").learnset.wildcharge = ["8L1"];
		this.modData("Learnsets", "mimikyu").learnset.zingzap = ["8L1"];
		delete this.modData('Learnsets', 'mimikyu').learnset.astonish;
		delete this.modData('Learnsets', 'mimikyu').learnset.grudge;
		delete this.modData('Learnsets', 'mimikyu').learnset.hex;
		delete this.modData('Learnsets', 'mimikyu').learnset.phantomforce;
		delete this.modData('Learnsets', 'mimikyu').learnset.shadowball;
		delete this.modData('Learnsets', 'mimikyu').learnset.shadowclaw;
		delete this.modData('Learnsets', 'mimikyu').learnset.shadowsneak;
		delete this.modData('Learnsets', 'mimikyu').learnset.spite;
	},
}; 