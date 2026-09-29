import {Dex} from '../../../sim/dex';
export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	init() {
		// Gogoat
		this.modData("Learnsets", "gogoat").learnset.megahorn = ["9L1"];
		// Sceptile
		this.modData("Learnsets", "sceptile").learnset.dragonrush = ["9L1"];
		this.modData("Learnsets", "sceptile").learnset.earthpower = ["9L1"];
		// Swampert
		this.modData("Learnsets", "swampert").learnset.sludgebomb = ["9L1"];
		this.modData("Learnsets", "swampert").learnset.wavecrash = ["9L1"];
		// Pyroar
		this.modData("Learnsets", "pyroar").learnset.scorchingsands = ["9L1"];
		// Venusaur
		this.modData("Learnsets", "venusaur").learnset.sludgewave = ["9L1"];
		// Blastoise
		this.modData("Learnsets", "blastoise").learnset.ironhead = ["9L1"];
		// Arcanine-Hisui
		this.modData("Learnsets", "arcaninehisui").learnset.burnup = ["9L1"];
		this.modData("Learnsets", "arcaninehisui").learnset.irontail = ["9L1"];
		// Victreebel
		this.modData("Learnsets", "victreebel").learnset.toxicspikes = ["9L1"];
		// Starmie
		this.modData("Learnsets", "starmie").learnset.ancientpower = ["9L1"];
		this.modData("Learnsets", "starmie").learnset.aquajet = ["9L1"];
		this.modData("Learnsets", "starmie").learnset.bulkup = ["9L1"];
		this.modData("Learnsets", "starmie").learnset.chargebeam = ["9L1"];
		this.modData("Learnsets", "starmie").learnset.icespinner = ["9L1"];
		this.modData("Learnsets", "starmie").learnset.liquidation = ["9L1"];
		this.modData("Learnsets", "starmie").learnset.safeguard = ["9L1"];
		this.modData("Learnsets", "starmie").learnset.selfdestruct = ["9L1"];
		this.modData("Learnsets", "starmie").learnset.zenheadbutt = ["9L1"];
		// Tauros-Paldea-Aqua
		this.modData("Learnsets", "taurospaldeaaqua").learnset.irontail = ["9L1"];
		this.modData("Learnsets", "taurospaldeaaqua").learnset.megahorn = ["9L1"];
		// Tauros-Paldea-Blaze
		this.modData("Learnsets", "taurospaldeablaze").learnset.irontail = ["9L1"];
		this.modData("Learnsets", "taurospaldeablaze").learnset.megahorn = ["9L1"];
		// Gyarados
		this.modData("Learnsets", "gyarados").learnset.dragonrush = ["9L1"];
		// Meganium
		this.modData("Learnsets", "meganium").learnset.dazzlinggleam = ["9L1"];
		this.modData("Learnsets", "meganium").learnset.earthpower = ["9L1"];
		this.modData("Learnsets", "meganium").learnset.leafblade = ["9L1"];
		this.modData("Learnsets", "meganium").learnset.pollenpuff = ["9L1"];
		// Typhlosion-Hisui
		this.modData("Learnsets", "typhlosionhisui").learnset.mysticalfire = ["9L1"];
		// Houndoom
		this.modData("Learnsets", "houndoom").learnset.scorchingsands = ["9L1"];
		// Camerupt
		this.modData("Learnsets", "camerupt").learnset.burningjealousy = ["9L1"];
		// Roserade
		this.modData("Learnsets", "roserade").learnset.trailblaze = ["9L1"];
		// Abomasnow
		this.modData("Learnsets", "abomasnow").learnset.icehammer = ["9L1"];
		// Emboar
		this.modData("Learnsets", "emboar").learnset.scorchingsands = ["9L1"];
		this.modData("Learnsets", "emboar").learnset.solarblade = ["9L1"];
		// Samurott-Hisui
		this.modData("Learnsets", "samurotthisui").learnset.superpower = ["9L1"];
		// Simisage
		this.modData("Learnsets", "simisage").learnset.belch = ["9L1"];
		this.modData("Learnsets", "simisage").learnset.endure = ["9L1"];
		this.modData("Learnsets", "simisage").learnset.fakeout = ["9L1"];
		this.modData("Learnsets", "simisage").learnset.grassyglide = ["9L1"];
		this.modData("Learnsets", "simisage").learnset.solarblade = ["9L1"];
		this.modData("Learnsets", "simisage").learnset.stuffcheeks = ["9L1"];
		this.modData("Learnsets", "simisage").learnset.trailblaze = ["9L1"];
		// Simisear
		this.modData("Learnsets", "simisear").learnset.blazekick = ["9L1"];
		this.modData("Learnsets", "simisear").learnset.burningjealousy = ["9L1"];
		this.modData("Learnsets", "simisear").learnset.endure = ["9L1"];
		this.modData("Learnsets", "simisear").learnset.fakeout = ["9L1"];
		this.modData("Learnsets", "simisear").learnset.scorchingsands = ["9L1"];
		this.modData("Learnsets", "simisear").learnset.stuffcheeks = ["9L1"];
		this.modData("Learnsets", "simisear").learnset.temperflare = ["9L1"];
		// Simipour
		this.modData("Learnsets", "simipour").learnset.belch = ["9L1"];
		this.modData("Learnsets", "simipour").learnset.endure = ["9L1"];
		this.modData("Learnsets", "simipour").learnset.fakeout = ["9L1"];
		this.modData("Learnsets", "simipour").learnset.flipturn = ["9L1"];
		this.modData("Learnsets", "simipour").learnset.liquidation = ["9L1"];
		this.modData("Learnsets", "simipour").learnset.stuffcheeks = ["9L1"];
		// Chesnaught
		this.modData("Learnsets", "chesnaught").learnset.growth = ["9L1"];
		this.modData("Learnsets", "chesnaught").learnset.steelroller = ["9L1"];
		// Greninja
		this.modData("Learnsets", "greninja").learnset.flipturn = ["9L1"];
		this.modData("Learnsets", "greninja").learnset.skittersmack = ["9L1"];
		// Talonflame
		this.modData("Learnsets", "talonflame").learnset.blazekick = ["9L1"];
		this.modData("Learnsets", "talonflame").learnset.skyattack = ["9L1"];
		this.modData("Learnsets", "talonflame").learnset.whirlwind = ["9L1"];
		// Gourgeist
		this.modData("Learnsets", "gourgeist").learnset.hypnosis = ["9L1"];
		this.modData("Learnsets", "gourgeist").learnset.selfdestruct = ["9L1"];
		// Skeledirge
		this.modData("Learnsets", "skeledirge").learnset.burnup = ["9L1"];
		// Armarouge
		this.modData("Learnsets", "armarouge").learnset.burnup = ["9L1"];
		// Ceruledge
		this.modData("Learnsets", "ceruledge").learnset.burnup = ["9L1"];
		// Scovillain
		this.modData("Learnsets", "scovillain").learnset.flareblitz = ["9L1"];
		this.modData("Learnsets", "scovillain").learnset.swagger = ["9L1"];
		this.modData("Learnsets", "scovillain").learnset.thunderfang = ["9L1"];
	},
};