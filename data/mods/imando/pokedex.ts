import { Streams } from "pokemon-showdown";
import { TriumvirateModeTrivia } from "../../../server/chat-plugins/trivia";

export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	//Vanilla mons (+ custom megas and regional forms) :
	blastoise: {
		inherit: true,
		abilities: {0: "Torrent", H: "Mega Launcher"},
	},
	blastoisemega: {
		inherit: true,
		abilities: {0: "Shell Armor"},
	},
	pidgeot: {
		inherit: true,
		baseStats: {hp: 83, atk: 80, def: 75, spa: 90, spd: 70, spe: 101},
	},
	pidgeotmega: {
		inherit: true,
		types: ["Fighting", "Flying"],
		baseStats: {hp: 83, atk: 80, def: 80, spa: 155, spd: 80, spe: 121},
	},
	raticatealolatotem: {
		inherit: true,
		abilities: {0: "Thick Fat", H: "Guts"},
	},
	diglett: {
		inherit: true,
		abilities: {0: "Sand Veil", 1: "Arena Trap", H: "Sand Rush"},
	},
	diglettalola: {
		inherit: true,
		abilities: {0: "Sand Veil", 1: "Arena Trap", H: "Sand Rush"},
	},
	dugtrio: {
		inherit: true,
		abilities: {0: "Sand Veil", 1: "Iron Fist", H: "Sand Rush"},
	},
	dugtrioalola: {
		inherit: true,
		abilities: {0: "Sand Veil", 1: "Tangling Hair", H: "Sand Rush"},
	},
	gengar: {
		inherit: true,
		abilities: {0: "Levitate"},
	},
	gengarmega: {
		inherit: true,
		abilities: {0: "Illusion"},
	},
	tauros: {
		inherit: true,
		baseStats: {hp: 75, atk: 100, def: 95, spa: 100, spd: 70, spe: 110},
		otherFormes: ["Tauros-Paldea-Combat", "Tauros-Paldea-Blaze", "Tauros-Paldea-Aqua"],
		formeOrder: ["Tauros", "Tauros-Paldea-Combat", "Tauros-Paldea-Blaze", "Tauros-Paldea-Aqua"],
	},
	taurospaldeaaqua: {
		num: 128,
		name: "Tauros-Paldea-Aqua",
		baseSpecies: "Tauros",
		forme: "Paldea-Aqua",
		types: ["Fighting", "Water"],
		gender: "M",
		baseStats: {hp: 75, atk: 110, def: 105, spa: 70, spd: 90, spe: 100},
		abilities: {0: "Intimidate", 1: "Anger Point", H: "Cud Chew"},
		heightm: 1.4,
		weightkg: 88.4,
		color: "Black",
		eggGroups: ["Field"],
	},
	taurospaldeablaze: {
		num: 128,
		name: "Tauros-Paldea-Blaze",
		baseSpecies: "Tauros",
		forme: "Paldea-Blaze",
		types: ["Fighting", "Fire"],
		gender: "M",
		baseStats: {hp: 75, atk: 110, def: 105, spa: 70, spd: 90, spe: 100},
		abilities: {0: "Intimidate", 1: "Anger Point", H: "Cud Chew"},
		heightm: 1.4,
		weightkg: 88.4,
		color: "Black",
		eggGroups: ["Field"],
	},
	taurospaldeacombat: {
		num: 128,
		name: "Tauros-Paldea-Combat",
		baseSpecies: "Tauros",
		forme: "Paldea-Combat",
		types: ["Fighting"],
		gender: "M",
		baseStats: {hp: 75, atk: 110, def: 105, spa: 70, spd: 90, spe: 100},
		abilities: {0: "Intimidate", 1: "Anger Point", H: "Cud Chew"},
		heightm: 1.4,
		weightkg: 88.4,
		color: "Black",
		eggGroups: ["Field"],
	},
	ditto: {
		inherit: true,
		baseStats: {hp: 68, atk: 68, def: 68, spa: 68, spd: 68, spe: 68},
	},
	flareon: {
		inherit: true,
		abilities: {0: "Flash Fire", H: "Fur Coat"},
	},
	chikorita: {
		inherit: true,
		abilities: {0: "Overgrow", H: "Regenerator"},
	},
	bayleef: {
		inherit: true,
		abilities: {0: "Overgrow", H: "Regenerator"},
	},
	meganium: {
		inherit: true,
		abilities: {0: "Overgrow", H: "Regenerator"},
	},
	crobat: {
		inherit: true,
		abilities: {0: "Inner Focus", H: "Tinted Lens"},
	},
	pichuspikyeared: {
		inherit: true,
		abilities: {0: "Static", H: "Gamble"},
	},
	sunkern: {
		inherit: true,
		baseStats: {hp: 120, atk: 120, def: 120, spa: 120, spd: 120, spe: 120},
	},
	murkrow: {
		inherit: true,
		baseStats: {hp: 60, atk: 85, def: 78, spa: 85, spd: 78, spe: 91},
	},
	unown: {
		inherit: true,
		types: ["Steel", "Ghost"],
		baseStats: {hp: 96, atk: 144, def: 96, spa: 144, spd: 96, spe: 96},
		abilities: {0: "Magic Guard", 1: "Filter", H: "Libero"},
	},
	shuckle: {
		inherit: true,
		baseStats: {hp: 50, atk: 10, def: 230, spa: 10, spd: 230, spe: 5},
	},
	delibird: {
		inherit: true,
		baseStats: {hp: 80, atk: 100, def: 80, spa: 120, spd: 80, spe: 140},
	},
	smeargle: {
		inherit: true,
		baseStats: {hp: 55, atk: 55, def: 55, spa: 55, spd: 55, spe: 55},
	},
	tyranitar: {
		inherit: true,
		abilities: {0: "Sand Stream", H: "Intimidate"},
	},
	tyranitarmega: {
		inherit: true,
		abilities: {0: "ADV King"},
	},
	sceptilemega: {
		inherit: true,
		baseStats: {hp: 70, atk: 110, def: 85, spa: 135, spd: 85, spe: 145},
		abilities: {0: "Contrary"},
	},
	ludicolo: {
		inherit: true,
		abilities: {0: "Swift Swim", 1: "Gamble", H: "Own Tempo"},
	},
	taillow: {
		inherit: true,
		abilities: {0: "Aerilate", H: "Scrappy"},
	},
	swellow: {
		inherit: true,
		abilities: {0: "Aerilate", H: "Scrappy"},
	},
	shedinja: {
		inherit: true,
		baseStats: {hp: 1, atk: 110, def: 5, spa: 110, spd: 5, spe: 74},
	},
	spinda: {
		inherit: true,
		baseStats: {hp: 90, atk: 90, def: 90, spa: 90, spd: 90, spe: 90},
	},
	castform: {
		inherit: true,
		baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100},
	},
	castformrainy: {
		inherit: true,
		baseStats: {hp: 100, atk: 90, def: 110, spa: 90, spd: 110, spe: 100},
	},
	castformsnowy: {
		inherit: true,
		baseStats: {hp: 100, atk: 100, def: 90, spa: 100, spd: 90, spe: 120},
	},
	castformsunny: {
		inherit: true,
		baseStats: {hp: 100, atk: 110, def: 90, spa: 110, spd: 90, spe: 100},
	},
	clamperl: {
		inherit: true,
		baseStats: {hp: 45, atk: 94, def: 95, spa: 104, spd: 65, spe: 62},
	},
	pachirisu: {
		inherit: true,
		baseStats: {hp: 80, atk: 45, def: 90, spa: 75, spd: 110, spe: 95},
	},
	garchompmega: {
		inherit: true,
		abilities: {0: "Technician"},
	},
	lucario: {
		inherit: true,
		abilities: {0: "Steadfast", 1: "Inner Focus", H: "Rattled"},
	},
	lucariomega: {
		inherit: true,
		abilities: {0: "Technician"},
	},
	snover: {
		inherit: true,
		baseStats: {hp: 90, atk: 92, def: 75, spa: 92, spd: 85, spe: 60},
	},
	abomasnow: {
		inherit: true,
		baseStats: {hp: 90, atk: 132, def: 105, spa: 132, spd: 105, spe: 30},
	},
	abomasnowmega: {
		inherit: true,
		baseStats: {hp: 90, atk: 172, def: 135, spa: 172, spd: 125, spe: 0},
	},
	mamoswine: {
		inherit: true,
		baseStats: {hp: 110, atk: 130, def: 80, spa: 70, spd: 60, spe: 100},
	},
	porygonz: {
		inherit: true,
		abilities: {0: "Conversion-Z"},
	},
	rotom: {
		inherit: true,
		baseStats: {hp: 50, atk: 70, def: 102, spa: 105, spd: 102, spe: 91},
		abilities: {0: "Levitate", H: "No Guard"},
	},
	rotomheat: {
		inherit: true,
		abilities: {0: "Levitate", H: "Flame Body"},
	},
	rotomwash: {
		inherit: true,
		abilities: {0: "Levitate", H: "Water Absorb"},
	},
	rotomfrost: {
		inherit: true,
		abilities: {0: "Levitate", H: "Refrigerate"},
	},
	rotomfan: {
		inherit: true,
		abilities: {0: "Levitate", H: "Speed Boost"},
	},
	rotommow: {
		inherit: true,
		abilities: {0: "Levitate", H: "Grassy Surge"},
	},
	regigigas: {
		inherit: true,
		baseStats: {hp: 120, atk: 170, def: 120, spa: 110, spd: 120, spe: 110},
		abilities: {0: "Slow Start", 1: "Truant", H: "Stall"},
	},
	cresselia: {
		inherit: true,
		types: ["Psychic", "Fairy"],
	},
	phione: {
		inherit: true,
		evos: ["Manaphy"],
	},
	manaphy: {
		inherit: true,
		abilities: {0: "Dazzling"},
		prevo: "Phione",
		evoLevel: 50,
	},
	darkrai: {
		inherit: true,
		baseStats: {hp: 70, atk: 100, def: 90, spa: 125, spd: 90, spe: 125},
	},
	shaymin: {
		inherit: true,
		abilities: {0: "Regenerator"},
	},
	shayminsky: {
		inherit: true,
		abilities: {0: "Flower Veil"},
	},
	unfezant: {
		inherit: true,
		types: ["Ground", "Flying"],
	},
	tympole: {
		inherit: true,
		baseStats: {hp: 60, atk: 60, def: 50, spa: 60, spd: 50, spe: 74},
	},
	palpitoad: {
		inherit: true,
		baseStats: {hp: 85, atk: 75, def: 65, spa: 75, spd: 65, spe: 79},
	},
	seismitoad: {
		inherit: true,
		baseStats: {hp: 115, atk: 105, def: 85, spa: 95, spd: 85, spe: 84},
	},
	zorua: {
		inherit: true,
		types: ["Dark", "Fairy"],
	},
	zoroark: {
		inherit: true,
		types: ["Dark", "Fairy"],
		baseStats: {hp: 60, atk: 105, def: 60, spa: 120, spd: 60, spe: 115},
	},
	zoroarkhisui: {
		inherit: true,
		baseStats: {hp: 55, atk: 100, def: 60, spa: 125, spd: 60, spe: 120},
	},
	escavalier: {
		inherit: true,
		abilities: {0: "Swarm", 1: "Shell Armor", H: "Speed Boost"},
	},
	klang: {
		inherit: true,
		baseStats: {hp: 60, atk: 200, def: 95, spa: 70, spd: 85, spe: 50},
	},
	meloettapirouette: {
		inherit: true,
		baseStats: {hp: 100, atk: 138, def: 70, spa: 77, spd: 77, spe: 138},
	},
	greninja: {
		inherit: true,
		abilities: {0: "Torrent", H: "Protean"},
	},
	flabebe: {
		inherit: true,
		abilities: {0: "Flower Veil", 1: "Grassy Surge", H: "Symbiosis"},
	},
	floette: {
		inherit: true,
		abilities: {0: "Flower Veil", 1: "Grassy Surge", H: "Symbiosis"},
	},
	floetteeternal: {
		inherit: true,
		abilities: {0: "Flower Veil", 1: "Anger Shell", H: "Symbiosis"},
	},
	florges: {
		inherit: true,
		abilities: {0: "Flower Veil", 1: "Grassy Surge", H: "Symbiosis"},
	},
	hawlucha: {
		inherit: true,
		baseStats: {hp: 78, atk: 112, def: 75, spa: 74, spd: 63, spe: 118},
	},
	noivern: {
		inherit: true,
		abilities: {0: "Frisk", 1: "Infiltrator", H: "Synchronize"},
	},
	zygardecomplete: {
		inherit: true,
		baseStats: {hp: 186, atk: 100, def: 121, spa: 91, spd: 95, spe: 85},
	},
	gumshoostotem: {
		inherit: true,
		abilities: {0: "Ultimate Form"},
	},
	charjabug: {
		inherit: true,
		prevo: "Grubbin",
		evoLevel: 20,
		evos: ["Vikavolt", "Vikavolt-Totem"],
	},
	vikavolt: {
		inherit: true,
		baseStats: {hp: 77, atk: 100, def: 90, spa: 145, spd: 75, spe: 93},
		prevo: "Charjabug",
		evoType: "useItem",
		evoItem: "Thunder Stone",
	},
	vikavolttotem: {
		inherit: true,
		baseStats: {hp: 77, atk: 70, def: 100, spa: 145, spd: 100, spe: 88},
		abilities: {0: "Download"},
		prevo: "Charjabug",
		evoLevel: 33,
	},
	cutiefly: {
		inherit: true,
		evos: ["Ribombee", "Ribombee-Totem"],
	},
	ribombeetotem: {
		inherit: true,
		baseStats: {hp: 60, atk: 55, def: 70, spa: 95, spd: 70, spe: 114},
		abilities: {0: "Sweet Veil", 1: "Shield Dust", H: "Simple"},
		prevo: "Cutiefly",
		evoLevel: 25,
	},
	wishiwashi: {
		inherit: true,
		baseStats: {hp: 70, atk: 20, def: 20, spa: 25, spd: 25, spe: 40},
	},
	wishiwashischool: {
		inherit: true,
		baseStats: {hp: 70, atk: 140, def: 130, spa: 140, spd: 135, spe: 30},
	},
	toxapex: {
		inherit: true,
		baseStats: {hp: 50, atk: 93, def: 152, spa: 53, spd: 142, spe: 35},
	},
	araquanid: {
		inherit: true,
		baseStats: {hp: 78, atk: 70, def: 102, spa: 50, spd: 142, spe: 62},
	},
	araquanidtotem: {
		inherit: true,
		abilities: {0: "Water Bubble", H: "Beast Boost"},
		baseStats: {hp: 68, atk: 90, def: 92, spa: 50, spd: 132, spe: 72},
	},
	lurantistotem: {
		inherit: true,
		abilities: {0: "Leaf Guard", H: "Contrary"},
	},
	salandit: {
		inherit: true,
		types: ["Poison"],
		baseStats: {hp: 48, atk: 64, def: 40, spa: 71, spd: 40, spe: 87},
		evos: ["Salazzle", "Salazzle-Totem"],
	},
	salazzle: {
		inherit: true,
		baseStats: {hp: 98, atk: 74, def: 60, spa: 121, spd: 60, spe: 117},
		prevo: "Salandit",
		evoLevel: 33,
	},
	salazzletotem: {
		inherit: true,
		types: ["Poison", "Flying"],
		baseStats: {hp: 78, atk: 84, def: 65, spa: 111, spd: 65, spe: 127},
		abilities: {0: "Corrosion", H: "Multiscale"},
		prevo: "Salandit",
		evoType: "levelMove",
		evoMove: "Nasty Plot",
	},
	stufful: {
		inherit: true,
		baseStats: {hp: 70, atk: 85, def: 50, spa: 45, spd: 50, spe: 50},
		abilities: {0: "Fluffy", 1: "Klutz", H: "Rattled"},
	},
	bewear: {
		inherit: true,
		baseStats: {hp: 120, atk: 135, def: 80, spa: 55, spd: 60, spe: 60},
		abilities: {0: "Fluffy", 1: "Klutz", H: "Rattled"},
	},
	togedemarutotem: {
		inherit: true,
		abilities: {0: "Sturdy", H: "Levitate"},
	},
	kommoototem: {
		inherit: true,
		abilities: {0: "Overcoat", H: "Scrappy"},
	},
	nihilego: {
		inherit: true,
		types: ["Rock", "Water"],
	},
	marshadow: {
		inherit: true,
		baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100},
	},
	meltan: {
		inherit: true,
		evos: ["Melmetal"],
	},
	melmetal: {
		inherit: true,
		abilities: {0: "Clear Body"},
		prevo: "Meltan",
		evoLevel: 50,
	},
	inteleon: {
		inherit: true,
		baseStats: {hp: 65, atk: 110, def: 65, spa: 105, spd: 65, spe: 120},
		abilities: {0: "Torrent", H: "Illusion"},
	},
	dottler: {
		inherit: true,
		baseStats: {hp: 100, atk: 35, def: 160, spa: 50, spd: 180, spe: 30},
	},
	wooloo: {
		inherit: true,
		abilities: {0: "Fluffy", 1: "Run Away", H: "Unstoppable Force"},
	},
	dubwool: {
		inherit: true,
		abilities: {0: "Fluffy", 1: "Steadfast", H: "Unstoppable Force"},
	},
	snom: {
		inherit: true,
		baseStats: {hp: 255, atk: 100, def: 250, spa: 100, spd: 250, spe: 100},
	},
	cramorant: {
		inherit: true,
		baseStats: {hp: 70, atk: 105, def: 95, spa: 105, spd: 95, spe: 85},
	},
	cramorantgulping: {
		inherit: true,
		baseStats: {hp: 70, atk: 85, def: 135, spa: 85, spd: 95, spe: 85},
	},
	cramorantgorging: {
		inherit: true,
		baseStats: {hp: 70, atk: 85, def: 95, spa: 85, spd: 135, spe: 85},
	},
	zaciancrowned: {
		inherit: true,
		abilities: {0: "Pure Power"},
	},
	zamazentacrowned: {
		inherit: true,
		abilities: {0: "Wonder Guard"},
	},
	spectrier: {
		inherit: true,
		baseStats: {hp: 90, atk: 90, def: 85, spa: 90, spd: 95, spe: 130},
	},
	calyrexshadow: {
		inherit: true,
		baseStats: {hp: 90, atk: 110, def: 105, spa: 110, spd: 115, spe: 150},
	},
	basculegion: {
		inherit: true,
		abilities: {0: "Rattled", 1: "Adaptability", H: "Mold Breaker"},
	},
	basculegionf: {
		inherit: true,
		abilities: {0: "Rattled", 1: "Adaptability", H: "Mold Breaker"},
	},
	spidops: {
		inherit: true,
		baseStats: {hp: 80, atk: 109, def: 112, spa: 72, spd: 106, spe: 55},
	},
	squawkabilly: {
		inherit: true,
		baseStats: {hp: 102, atk: 116, def: 71, spa: 65, spd: 71, spe: 112},
	},
	squawkabillyblue: {
		inherit: true,
		baseStats: {hp: 102, atk: 116, def: 71, spa: 65, spd: 71, spe: 112},
	},
	squawkabillyyellow: {
		inherit: true,
		baseStats: {hp: 102, atk: 116, def: 71, spa: 65, spd: 71, spe: 112},
	},
	squawkabillywhite: {
		inherit: true,
		baseStats: {hp: 102, atk: 116, def: 71, spa: 65, spd: 71, spe: 112},
	},
	rabsca: {
		inherit: true,
		abilities: {0: "Regenerator", 1: "Magic Guard", H: "Drought"},
	},
	palafinhero: {
		inherit: true,
		baseStats: {hp: 100, atk: 130, def: 92, spa: 116, spd: 82, spe: 80},
	},
	revavroom: {
		inherit: true,
		abilities: {0: "Contrary", H: "Filter"},
	},
	flamigo: {
		inherit: true,
		abilities: {0: "Scrappy", 1: "Synchronize", H: "Costar"},
	},
	cetitan: {
		inherit: true,
		baseStats: {hp: 170, atk: 133, def: 75, spa: 45, spd: 65, spe: 73},
	},
	tatsugiri: {
		inherit: true,
		abilities: {0: "Commander", 1: "Competitive", H: "Storm Drain"},
	},
	farigiraf: {
		inherit: true,
		baseStats: {hp: 130, atk: 100, def: 80, spa: 120, spd: 80, spe: 70},
	},
	walkingwake: {
		num: 1009,
		name: "Walking Wake",
		types: ["Water", "Dragon"],
		gender: "N",
		baseStats: {hp: 99, atk: 93, def: 91, spa: 115, spd: 83, spe: 109},
		abilities: {0: "Protosynthesis"},
		heightm: 3.5,
		weightkg: 280,
		color: "Blue",
		tags: ["Paradox"],
		eggGroups: ["Undiscovered"],
	},
	ironleaves: {
		num: 1010,
		name: "Iron Leaves",
		types: ["Grass", "Psychic"],
		gender: "N",
		baseStats: {hp: 90, atk: 130, def: 88, spa: 70, spd: 108, spe: 104},
		abilities: {0: "Quark Drive"},
		heightm: 1.5,
		weightkg: 125,
		color: "Green",
		tags: ["Paradox"],
		eggGroups: ["Undiscovered"],
	},
	missingno: {
		inherit: true,
		abilities: {0: "Huge Power"},
	},

	//Fakemons :
	pokat: {
		num: -1000,
		name: "Pokat",
		types: ["Grass"],
		gender: "N",
		baseStats: {hp: 80, atk: 55, def: 75, spa: 85, spd: 120, spe: 87},
		abilities: {0: "Flash Fire"},
		heightm: 1,
		weightkg: 5,
		eggGroups: ["Undiscovered"],
	},
}