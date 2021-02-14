export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	
	init: function () {
		console.log(this.parentMod);
		for (var id in this.data.Pokedex) {
			if (this.data.Pokedex[id].breedingVariant) {
				const name = this.data.Pokedex[id].baseSpecies;
				const variant = this.data.Pokedex[id].breedingVariant;
				const learnset = this.data.Learnsets[this.toID(name)].learnset;
				if (!this.data.Learnsets[id]) this.data.Learnsets[id] = { learnset: {}};
				for (const moveid in learnset) {
					this.modData('Learnsets', id).learnset[moveid] = ['8L1', '7L1', '6L1', '5L1', '4L1'];
				}
				const weight = (this.data.Pokedex[id].weightkg + Dex.data.Pokedex[this.toID(variant)].weightkg) / 2;
				this.modData('Pokedex', id).weightkg = weight;
			}
		}
		
		// Goodra-Flame
		this.modData("Learnsets", "goodraflame").learnset.sdrampaschrodingerdrampaschrodingerwordsdance = ["8L1"];
		this.modData("Learnsets", "goodraflame").learnset.flareblitz = ["8L1"];
		this.modData("Learnsets", "goodraflame").learnset.dragonclaw = ["8L1"];
		this.modData("Learnsets", "goodraflame").learnset.dragondance = ["8L1"];
		this.modData("Learnsets", "goodraflame").learnset.honeclaws = ["8L1"];
		// Flygon-Buzz
		this.modData("Learnsets", "flygonbuzz").learnset.leechlife = ["8L1"];
		this.modData("Learnsets", "flygonbuzz").learnset.poisonfang = ["8L1"];
		this.modData("Learnsets", "flygonbuzz").learnset.sludgebomb = ["8L1"];
		this.modData("Learnsets", "flygonbuzz").learnset.energyball = ["8L1"];
		this.modData("Learnsets", "flygonbuzz").learnset.curse = ["8L1"];
		// Vikavolt-Migale
		this.modData("Learnsets", "vikavoltmigale").learnset.stickyweb = ["8L1"];
		this.modData("Learnsets", "vikavoltmigale").learnset.gigadrain = ["8L1"];
		this.modData("Learnsets", "vikavoltmigale").learnset.gastroacid = ["8L1"];
		this.modData("Learnsets", "vikavoltmigale").learnset.suckerpunch = ["8L1"];
		this.modData("Learnsets", "vikavoltmigale").learnset.disable = ["8L1"];
		// Flareon-Ocean
		this.modData("Learnsets", "flareonocean").learnset.curse = ["8L1"];
		this.modData("Learnsets", "flareonocean").learnset.liquidation = ["8L1"];
		this.modData("Learnsets", "flareonocean").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "flareonocean").learnset.scald = ["8L1"];
		this.modData("Learnsets", "flareonocean").learnset.sleeptalk = ["8L1"];
		// Lapras-Angry
		this.modData("Learnsets", "laprasangry").learnset.dracometeor = ["8L1"];
		this.modData("Learnsets", "laprasangry").learnset.flamethrower = ["8L1"];
		this.modData("Learnsets", "laprasangry").learnset.roost = ["8L1"];
		this.modData("Learnsets", "laprasangry").learnset.hurricane = ["8L1"];
		this.modData("Learnsets", "laprasangry").learnset.calmmind = ["8L1"];
		// Butterfree-Armor
		this.modData("Learnsets", "butterfreearmor").learnset.shellsmash = ["8L1"];
		this.modData("Learnsets", "butterfreearmor").learnset.stickyweb = ["8L1"];
		this.modData("Learnsets", "butterfreearmor").learnset.ancientpower = ["8L1"];
		this.modData("Learnsets", "butterfreearmor").learnset.rockslide = ["8L1"];
		this.modData("Learnsets", "butterfreearmor").learnset.stoneedge = ["8L1"];
		// Espeon-Dusk
		this.modData("Learnsets", "espeondusk").learnset.darkpulse = ["8L1"];
		this.modData("Learnsets", "espeondusk").learnset.foulplay = ["8L1"];
		this.modData("Learnsets", "espeondusk").learnset.taunt = ["8L1"];
		this.modData("Learnsets", "espeondusk").learnset.moonlight = ["8L1"];
		this.modData("Learnsets", "espeondusk").learnset.suckerpunch = ["8L1"];
		// Avalugg-Shield
		this.modData("Learnsets", "avaluggshield").learnset.heavyslam = ["8L1"];
		this.modData("Learnsets", "avaluggshield").learnset.metalburst = ["8L1"];
		this.modData("Learnsets", "avaluggshield").learnset.irontail = ["8L1"];
		this.modData("Learnsets", "avaluggshield").learnset.stealthrock = ["8L1"];
		this.modData("Learnsets", "avaluggshield").learnset.taunt = ["8L1"];
		// Dusclops-Gastric
		this.modData("Learnsets", "dusclopsgastric").learnset.recover = ["8L1"];
		this.modData("Learnsets", "dusclopsgastric").learnset.scald = ["8L1"];
		this.modData("Learnsets", "dusclopsgastric").learnset.yawn = ["8L1"];
		this.modData("Learnsets", "dusclopsgastric").learnset.mirrorcoat = ["8L1"];
		this.modData("Learnsets", "dusclopsgastric").learnset.earthpower = ["8L1"];
		// Sylveon-Protector
		this.modData("Learnsets", "sylveonprotector").learnset.flamethrower = ["8L1"];
		this.modData("Learnsets", "sylveonprotector").learnset.icebeam = ["8L1"];
		this.modData("Learnsets", "sylveonprotector").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "sylveonprotector").learnset.earthpower = ["8L1"];
		this.modData("Learnsets", "sylveonprotector").learnset.stealthrock = ["8L1"];
		// Leafeon-Cutlass
		this.modData("Learnsets", "leafeoncutlass").learnset.meteormash = ["8L1"];
		this.modData("Learnsets", "leafeoncutlass").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "leafeoncutlass").learnset.closecombat = ["8L1"];
		this.modData("Learnsets", "leafeoncutlass").learnset.extremespeed = ["8L1"];
		this.modData("Learnsets", "leafeoncutlass").learnset.icepunch = ["8L1"];
		// Froslass-Gunwoman
		this.modData("Learnsets", "froslassgunwoman").learnset.explosion = ["8L1"];
		this.modData("Learnsets", "froslassgunwoman").learnset.stealthrock = ["8L1"];
		this.modData("Learnsets", "froslassgunwoman").learnset.thunderbolt = ["8L1"];
		this.modData("Learnsets", "froslassgunwoman").learnset.voltswitch = ["8L1"];
		this.modData("Learnsets", "froslassgunwoman").learnset.wildcharge = ["8L1"];
		// Mantine-Spiny
		this.modData("Learnsets", "mantinespiny").learnset.sludgebomb = ["8L1"];
		this.modData("Learnsets", "mantinespiny").learnset.recover = ["8L1"];
		this.modData("Learnsets", "mantinespiny").learnset.toxicspikes = ["8L1"];
		this.modData("Learnsets", "mantinespiny").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "mantinespiny").learnset.banefulbunker = ["8L1"];
		// Rapidash-Meow-Galar
		this.modData("Learnsets", "rapidashgalarmeow").learnset.fakeout = ["8L1"];
		this.modData("Learnsets", "rapidashgalarmeow").learnset.ironhead = ["8L1"];
		this.modData("Learnsets", "rapidashgalarmeow").learnset.uturn = ["8L1"];
		// Mr. Rime-Spoon
		this.modData("Learnsets", "mrrimespoon").learnset.foulplay = ["8L1"];
		this.modData("Learnsets", "mrrimespoon").learnset.kinesis = ["8L1"];
		this.modData("Learnsets", "mrrimespoon").learnset.dreameater = ["8L1"];
		this.modData("Learnsets", "mrrimespoon").learnset.chargebeam = ["8L1"];
		this.modData("Learnsets", "mrrimespoon").learnset.seismictoss = ["8L1"];
		// Thievul-Bananas
		this.modData("Learnsets", "thievulbananas").learnset.iciclecrash = ["8L1"];
		this.modData("Learnsets", "thievulbananas").learnset.superpower = ["8L1"];
		this.modData("Learnsets", "thievulbananas").learnset.rockslide = ["8L1"];
		this.modData("Learnsets", "thievulbananas").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "thievulbananas").learnset.zenheadbutt = ["8L1"];
		// Stonjourner-Castle
		this.modData("Learnsets", "stonjournercastle").learnset.shellsmash = ["8L1"];
		this.modData("Learnsets", "stonjournercastle").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "stonjournercastle").learnset.poisonjab = ["8L1"];
		this.modData("Learnsets", "stonjournercastle").learnset.honeclaws = ["8L1"];
		this.modData("Learnsets", "stonjournercastle").learnset.xscissor = ["8L1"];
		// Copperajah-Forge
		this.modData("Learnsets", "copperajahforge").learnset.flareblitz = ["8L1"];
		this.modData("Learnsets", "copperajahforge").learnset.rapidspin = ["8L1"];
		this.modData("Learnsets", "copperajahforge").learnset.stealthrock = ["8L1"];
		this.modData("Learnsets", "copperajahforge").learnset.spikes = ["8L1"];
		this.modData("Learnsets", "copperajahforge").learnset.willowisp = ["8L1"];
		// Grapploct-Ray
		this.modData("Learnsets", "grapploctray").learnset.roost = ["8L1"];
		this.modData("Learnsets", "grapploctray").learnset.gunkshot = ["8L1"];
		this.modData("Learnsets", "grapploctray").learnset.seedbomb = ["8L1"];
		this.modData("Learnsets", "grapploctray").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "grapploctray").learnset.rockblast = ["8L1"];
		// Appletun-Burned
		this.modData("Learnsets", "appletunburned").learnset.shellsmash = ["8L1"];
		this.modData("Learnsets", "appletunburned").learnset.overheat = ["8L1"];
		this.modData("Learnsets", "appletunburned").learnset.focusblast = ["8L1"];
		this.modData("Learnsets", "appletunburned").learnset.willowisp = ["8L1"];
		this.modData("Learnsets", "appletunburned").learnset.flamethrower = ["8L1"];
		// Vespiquen -Terra
		this.modData("Learnsets", "vespiquenterra").learnset.swordsdance = ["8L1"];
		this.modData("Learnsets", "vespiquenterra").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "vespiquenterra").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "vespiquenterra").learnset.rockpolish = ["8L1"];
		this.modData("Learnsets", "vespiquenterra").learnset.stoneedge = ["8L1"];
		// Cursola-Shock
		this.modData("Learnsets", "cursolashock").learnset.thunder = ["8L1"];
		this.modData("Learnsets", "cursolashock").learnset.thunderbolt = ["8L1"];
		this.modData("Learnsets", "cursolashock").learnset.thunderwave = ["8L1"];
		this.modData("Learnsets", "cursolashock").learnset.yawn = ["8L1"];
		this.modData("Learnsets", "cursolashock").learnset.sludgewave = ["8L1"];
		// Machamp-Lucha
		this.modData("Learnsets", "machamplucha").learnset.highjumpkick = ["8L1"];
		this.modData("Learnsets", "machamplucha").learnset.bravebird = ["8L1"];
		this.modData("Learnsets", "machamplucha").learnset.swordsdance = ["8L1"];
		this.modData("Learnsets", "machamplucha").learnset.defog = ["8L1"];
		// Roserade-Scarfed
		this.modData("Learnsets", "roseradescarfed").learnset.quiverdance = ["8L1"];
		this.modData("Learnsets", "roseradescarfed").learnset.moonblast = ["8L1"];
		this.modData("Learnsets", "roseradescarfed").learnset.stickyweb = ["8L1"];
		this.modData("Learnsets", "roseradescarfed").learnset.drainingkiss = ["8L1"];
		this.modData("Learnsets", "roseradescarfed").learnset.uturn = ["8L1"];
		// Kingdra-Camo
		this.modData("Learnsets", "kingdracamo").learnset.darkpulse = ["8L1"];
		this.modData("Learnsets", "kingdracamo").learnset.spikes = ["8L1"];
		this.modData("Learnsets", "kingdracamo").learnset.gunkshot = ["8L1"];
		this.modData("Learnsets", "kingdracamo").learnset.lowkick = ["8L1"];
		this.modData("Learnsets", "kingdracamo").learnset.uturn = ["8L1"];
		// Exploud-Meow
		this.modData("Learnsets", "exploudmeow").learnset.nastyplot = ["8L1"];
		this.modData("Learnsets", "exploudmeow").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "exploudmeow").learnset.taunt = ["8L1"];
		this.modData("Learnsets", "exploudmeow").learnset.hypnosis = ["8L1"];
		this.modData("Learnsets", "exploudmeow").learnset.thunderbolt = ["8L1"];
		// Lurantis-Nut
		this.modData("Learnsets", "lurantisnut").learnset.dragonhammer = ["8L1"];
		this.modData("Learnsets", "lurantisnut").learnset.dracometeor = ["8L1"];
		this.modData("Learnsets", "lurantisnut").learnset.dragonpulse = ["8L1"];
		this.modData("Learnsets", "lurantisnut").learnset.flamethrower = ["8L1"];
		this.modData("Learnsets", "lurantisnut").learnset.outrage = ["8L1"];
		// Skarmory-Primordial
		this.modData("Learnsets", "skarmoryprimordial").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "skarmoryprimordial").learnset.knockoff = ["8L1"];
		this.modData("Learnsets", "skarmoryprimordial").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "skarmoryprimordial").learnset.stoneedge = ["8L1"];
		this.modData("Learnsets", "skarmoryprimordial").learnset.quickattack = ["8L1"];
		// Marowak-Halberd
		this.modData("Learnsets", "marowakhalberd").learnset.honeclaws = ["8L1"];
		this.modData("Learnsets", "marowakhalberd").learnset.xscissor = ["8L1"];
		this.modData("Learnsets", "marowakhalberd").learnset.dualchop = ["8L1"];
		this.modData("Learnsets", "marowakhalberd").learnset.scaleshot = ["8L1"];
		this.modData("Learnsets", "marowakhalberd").learnset.aquatail = ["8L1"];
		// Slowking-Explosive
		this.modData("Learnsets", "slowkingexplosive").learnset.shelltrap = ["8L1"];
		this.modData("Learnsets", "slowkingexplosive").learnset.shellsmash = ["8L1"];
		this.modData("Learnsets", "slowkingexplosive").learnset.overheat = ["8L1"];
		this.modData("Learnsets", "slowkingexplosive").learnset.explosion = ["8L1"];
		this.modData("Learnsets", "slowkingexplosive").learnset.willowisp = ["8L1"];
		// Rapidash-Mule
		this.modData("Learnsets", "rapidashmule").learnset.earthquake = ["8L1"];
		this.modData("Learnsets", "rapidashmule").learnset.stealthrock = ["8L1"];
		this.modData("Learnsets", "rapidashmule").learnset.closecombat = ["8L1"];
		this.modData("Learnsets", "rapidashmule").learnset.earthpower = ["8L1"];
		this.modData("Learnsets", "rapidashmule").learnset.stoneedge = ["8L1"];
		// Dusknoir-Cake
		this.modData("Learnsets", "dusknoircake").learnset.playrough = ["8L1"];
		this.modData("Learnsets", "dusknoircake").learnset.drainpunch = ["8L1"];
		this.modData("Learnsets", "dusknoircake").learnset.acidarmor = ["8L1"];
		this.modData("Learnsets", "dusknoircake").learnset.recover = ["8L1"];
		this.modData("Learnsets", "dusknoircake").learnset.dazzlinggleam = ["8L1"];
		// Electivire-KungFu
		this.modData("Learnsets", "electivirekungfu").learnset.closecombat = ["8L1"];
		this.modData("Learnsets", "electivirekungfu").learnset.swordsdance = ["8L1"];
		this.modData("Learnsets", "electivirekungfu").learnset.machpunch = ["8L1"];
		this.modData("Learnsets", "electivirekungfu").learnset.nastyplot = ["8L1"];
		this.modData("Learnsets", "electivirekungfu").learnset.vacuumwave = ["8L1"];
		// Drampa-Schrödinger
		this.modData("Learnsets", "drampaschrodinger").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "drampaschrodinger").learnset.triattack = ["8L1"];
		this.modData("Learnsets", "drampaschrodinger").learnset.scald = ["8L1"];
		// Espeon-Aura
		this.modData("Learnsets", "espeonaura").learnset.aurasphere = ["8L1"];
		this.modData("Learnsets", "espeonaura").learnset.flashcannon = ["8L1"];
		// Sirfetchd-Archer
		this.modData("Learnsets", "sirfetchdarcher").learnset.spiritshackle = ["8L1"];
		this.modData("Learnsets", "sirfetchdarcher").learnset.poltergeist = ["8L1"];
		this.modData("Learnsets", "sirfetchdarcher").learnset.skittersmack = ["8L1"];
		this.modData("Learnsets", "sirfetchdarcher").learnset.uturn = ["8L1"];
		this.modData("Learnsets", "sirfetchdarcher").learnset.roost = ["8L1"];
		// Weezing-Doctor
		this.modData("Learnsets", "weezingdoctor").learnset.lightscreen = ["8L1"];
		this.modData("Learnsets", "weezingdoctor").learnset.trickroom = ["8L1"];
		this.modData("Learnsets", "weezingdoctor").learnset.reflect = ["8L1"];
		this.modData("Learnsets", "weezingdoctor").learnset.psyshock = ["8L1"];
		this.modData("Learnsets", "weezingdoctor").learnset.calmmind = ["8L1"];
	}
};
