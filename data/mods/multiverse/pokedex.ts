export const Pokedex: {[speciesid: string]: SpeciesData} = {
	venusaur: {
		inherit: true,
		baseStats: {hp: 80, atk: 102, def: 83, spa: 100, spd: 100, spe: 80},
		abilities: {0: "Overgrow"},
	},
	clefable: {
		inherit: true,
		types: ["Normal"],
		baseStats: {hp: 95, atk: 90, def: 73, spa: 95, spd: 100, spe: 60},
		abilities: {0: "Magic Guard"},
	},
	venomoth: {
		inherit: true,
		baseStats: {hp: 80, atk: 65, def: 60, spa: 110, spd: 95, spe: 110},
	},
	victreebel: {
		inherit: true,
		types: ["Grass", "Dark"],
		baseStats: {hp: 80, atk: 95, def: 65, spa: 100, spd: 100, spe: 80},
		abilities: {0: "Sniper", H: "Gluttony"},
	},
	golem: {
		inherit: true,
		types: ["Steel", "Ground"],
		baseStats: {hp: 80, atk: 130, def: 130, spa: 55, spd: 85, spe: 45},
		abilities: {0: "Sturdy"},
	},
	omastar: {
		inherit: true,
		types: ["Rock", "Water"],
		baseStats: {hp: 90, atk: 60, def: 135, spa: 115, spd: 70, spe: 55},
		abilities: {0: "Sand Stream"},
	},
	articuno: {
		inherit: true,
		baseStats: {hp: 85, atk: 75, def: 75, spa: 115, spd: 115, spe: 100},
		abilities: {0: "Snow Warning"},
	},
	mew: {
		inherit: true,
		types: ["Psychic", "Water"],
		baseStats: {hp: 100, atk: 100, def: 80, spa: 100, spd: 100, spe: 80},
	},
	noctowl: {
		inherit: true,
		types: ["Steel", "Flying"],
		baseStats: {hp: 100, atk: 50, def: 50, spa: 96, spd: 106, spe: 70},
		abilities: {0: "Insomnia", H: "Keen Eye"},
	},
	crobat: {
		inherit: true,
		types: ["Poison", "Flying"],
		baseStats: {hp: 95, atk: 95, def: 80, spa: 70, spd: 80, spe: 130},
		abilities: {0: "Overcoat", H: "Infiltrator"},
	},
	jumpluff: {
		inherit: true,
		types: ["Flying"],
		baseStats: {hp: 85, atk: 95, def: 80, spa: 55, spd: 105, spe: 120},
		abilities: {0: "Frisk", 1: "Limber", H: "Infiltrator"},
	},
	murkrow: {
		inherit: true,
		baseStats: {hp: 80, atk: 110, def: 62, spa: 110, spd: 62, spe: 111},
		abilities: {0: "Insomnia", 1: "Super Luck", H: "Smart Prankster"},
	},
	forretress: {
		inherit: true,
		baseStats: {hp: 85, atk: 90, def: 150, spa: 60, spd: 80, spe: 30},
	},
	houndoom: {
		inherit: true,
		baseStats: {hp: 85, atk: 90, def: 65, spa: 115, spd: 90, spe: 95},
		abilities: {0: "Early Bird", H: "Drought"},
	},
	magby: {
		inherit: true,
		types: ["Fire", "Fighting"],
		baseStats: {hp: 75, atk: 115, def: 67, spa: 110, spd: 85, spe: 83},
		abilities: {0: "Flame Body", 1: "Multiscale", H: "Vital Spirit"},
		evos: null,
	},
	entei: {
		inherit: true,
		baseStats: {hp: 100, atk: 115, def: 100, spa: 100, spd: 80, spe: 85},
	},
	breloom: {
		inherit: true,
		baseStats: {hp: 105, atk: 130, def: 80, spa: 60, spd: 70, spe: 70},
		abilities: {0: "Poison Heal", H: "Technician"},
	},
	hariyama: {
		inherit: true,
		baseStats: {hp: 140, atk: 120, def: 80, spa: 40, spd: 80, spe: 40},
		abilities: {0: "Thick Fat", H: "Guts"},
	},
	sableye: {
		inherit: true,
		baseStats: {hp: 50, atk: 85, def: 105, spa: 85, spd: 105, spe: 20},
		abilities: {0: "Keen Eye", H: "Magic Bounce"},
	},
	mawile: {
		inherit: true,
		baseStats: {hp: 60, atk: 95, def: 125, spa: 55, spd: 75, spe: 40},
		abilities: {0: "Intimidate"},
	},
	manectric: {
		inherit: true,
		baseStats: {hp: 70, atk: 75, def: 100, spa: 105, spd: 80, spe: 125},
		abilities: {0: "Intimidate"},
	},
	flygon: {
		inherit: true,
		baseStats: {hp: 90, atk: 115, def: 90, spa: 100, spd: 80, spe: 100},
	},
	salamence: {
		inherit: true,
		baseStats: {hp: 95, atk: 100, def: 135, spa: 80, spd: 80, spe: 110},
		abilities: {0: "Aerilate"},
	},
	regice: {
		inherit: true,
		types: ["Ice", "Electric"],
		baseStats: {hp: 90, atk: 50, def: 100, spa: 100, spd: 200, spe: 50},
		abilities: {0: "Clear Body", H: "Filter"},
	},
	munchlax: {
		inherit: true,
		types: ["Normal", "Fairy"],
		baseStats: {hp: 135, atk: 100, def: 80, spa: 60, spd: 100, spe: 65},
		evos: null,
	},
	rhyperior: {
		inherit: true,
		baseStats: {hp: 115, atk: 140, def: 130, spa: 55, spd: 65, spe: 55},
		abilities: {0: "Steam Engine", 1: "Solid Rock", H: "Reckless"},
	},
	mamoswine: {
		inherit: true,
		baseStats: {hp: 110, atk: 130, def: 90, spa: 70, spd: 80, spe: 80},
	},
	froslass: {
		inherit: true,
		baseStats: {hp: 70, atk: 100, def: 80, spa: 85, spd: 80, spe: 120},
		abilities: {0: "Snow Cloak", 1: "Regenerator", H: "Cursed Body"},
	},
	rotom: {
		inherit: true,
		otherFormes: null,
		formeOrder: null,
	},
	rotomheat: {
		inherit: true,
		baseStats: {hp: 50, atk: 65, def: 107, spa: 115, spd: 107, spe: 91},
		otherFormes: null,
		formeOrder: null,
		baseSpecies: null,
		changesFrom: null,
	},
	rotommow: {
		inherit: true,
		types: ["Electric", "Ghost"],
		baseStats: {hp: 78, atk: 50, def: 107, spa: 109, spd: 107, spe: 90},
		otherFormes: null,
		formeOrder: null,
		baseSpecies: null,
		changesFrom: null,
	},
	mesprit: {
		inherit: true,
		baseStats: {hp: 80, atk: 80, def: 115, spa: 120, spd: 105, spe: 90},
	},
	arceus: {
		inherit: true,
		otherFormes: null,
		formeOrder: null,
	},
	arceusground: {
		inherit: true,
		baseStats: {hp: 95, atk: 95, def: 95, spa: 95, spd: 95, spe: 95},
		requiredItem: "Earth Plate",
		otherFormes: null,
		formeOrder: null,
		baseSpecies: null,
		changesFrom: null,
	},
	stoutland: {
		inherit: true,
		baseStats: {hp: 85, atk: 120, def: 90, spa: 45, spd: 90, spe: 80},
	},
	musharna: {
		inherit: true,
		types: ["Psychic", "Fairy"],
		abilities: {0: "Forewarn", 1: "Magic Bounce", H: "Telepathy"},
	},
	whimsicott: {
		inherit: true,
		baseStats: {hp: 80, atk: 67, def: 85, spa: 97, spd: 75, spe: 116},
		abilities: {0: "Prankster", 1: "Infiltrator", H: "Chlorophyll"},
	},
	eelektross: {
		inherit: true,
		types: ["Electric", "Poison"],
		baseStats: {hp: 95, atk: 115, def: 80, spa: 115, spd: 80, spe: 50},
	},
	hydreigon: {
		inherit: true,
	},
	landorus: {
		inherit: true,
		baseStats: {hp: 89, atk: 105, def: 80, spa: 85, spd: 80, spe: 101},
	},
	keldeo: {
		inherit: true,
		baseStats: {hp: 90, atk: 70, def: 90, spa: 120, spd: 90, spe: 100},
		abilities: {0: "Rattled"},
	},
	keldeoresolute: {
		inherit: true,
		baseStats: {hp: 90, atk: 70, def: 90, spa: 120, spd: 90, spe: 100},
		abilities: {0: "Rattled"},
	},
	genesect: {
		inherit: true,
		baseStats: {hp: 71, atk: 90, def: 95, spa: 90, spd: 95, spe: 89},
	},
	genesectdouse: {
		inherit: true,
		baseStats: {hp: 71, atk: 90, def: 95, spa: 90, spd: 95, spe: 89},
	},
	genesectshock: {
		inherit: true,
		baseStats: {hp: 71, atk: 90, def: 95, spa: 90, spd: 95, spe: 89},
	},
	genesectburn: {
		inherit: true,
		baseStats: {hp: 71, atk: 90, def: 95, spa: 90, spd: 95, spe: 89},
	},
	genesectchill: {
		inherit: true,
		baseStats: {hp: 71, atk: 90, def: 95, spa: 90, spd: 95, spe: 89},
	},
	chesnaught: {
		inherit: true,
		baseStats: {hp: 88, atk: 107, def: 122, spa: 74, spd: 75, spe: 74},
		abilities: {0: "Rough Skin", H: "Bulletproof"},
	},
	delphox: {
		inherit: true,
		baseStats: {hp: 79, atk: 64, def: 72, spa: 114, spd: 110, spe: 104},
		abilities: {0: "Blaze", H: "Magician"},
	},
	greninja: {
		inherit: true,
		baseStats: {hp: 72, atk: 90, def: 67, spa: 90, spd: 71, spe: 120},
		abilities: {0: "Torrent", H: "Protean"},
		otherFormes: null,
		formeOrder: null,
	},
	greninjaash: {
		inherit: true,
		otherFormes: null,
		formeOrder: null,
		baseSpecies: null,
		changesFrom: null,
	},
	gogoat: {
		inherit: true,
		baseStats: {hp: 123, atk: 100, def: 81, spa: 97, spd: 62, spe: 68},
		abilities: {0: "Sap Sipper", H: "Grass Pelt"},
	},
	dragalge: {
		inherit: true,
		abilities: {0: "Regenerator", H: "Adaptability"},
	},
	tyrantrum: {
		inherit: true,
		baseStats: {hp: 82, atk: 121, def: 119, spa: 69, spd: 69, spe: 71},
	},
	sliggoo: {
		inherit: true,
		baseStats: {hp: 78, atk: 90, def: 83, spa: 98, spd: 133, spe: 67},
		evos: null,
	},
	avalugg: {
		inherit: true,
		types: ["Ice", "Fighting"],
		baseStats: {hp: 95, atk: 117, def: 184, spa: 44, spd: 76, spe: 28},
		abilities: {0: "Technician", H: "Sturdy"},
	},
};