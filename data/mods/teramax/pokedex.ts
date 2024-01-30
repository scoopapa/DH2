export const Pokedex: {[speciesid: string]: ModdedSpeciesData} = {
	darmanitangalarzen: {
		inherit: true,
		baseStats: {hp: 105, atk: 55, def: 65, spa: 120, spd: 65, spe: 130},
	},
	fluttermane: {
		inherit: true,
		types: ["Ghost", "Bug"],
		baseStats: {hp: 65, atk: 75, def: 75, spa: 115, spd: 135, spe: 105},
	},
	palafinhero: {
		inherit: true,
		types: ["Water", "Fighting"],
		baseStats: {hp: 100, atk: 120, def: 135, spa: 83, spd: 92, spe: 60},
	},
	ironbundle: {
		inherit: true,
		baseStats: {hp: 56, atk: 92, def: 114, spa: 116, spd: 64, spe: 128},
	},
	dracovish: {
		inherit: true,
		abilities: {0: "Water Absorb", 1: "Regenerator", H: "Sand Rush"},
	},
	annihilape: {
		inherit: true,
		types: ["Ghost", "Fighting"],
		baseStats: {hp: 130, atk: 115, def: 70, spa: 75, spd: 50, spe: 95},
		abilities: {0: "Vital Spirit", 1: "Cursed Body", H: "Iron Fist"},
	},
	wochien: {
		inherit: true,
		types: ["Dark", "Poison"],
		baseStats: {hp: 85, atk: 85, def: 100, spa: 105, spd: 125, spe: 70},
	},
	chienpao: {
		inherit: true,
		baseStats: {hp: 80, atk: 110, def: 80, spa: 100, spd: 80, spe: 120},
	},
	chiyu: {
		inherit: true,
		baseStats: {hp: 55, atk: 70, def: 80, spa: 135, spd: 125, spe: 105},
	},
	stonjourner: {
		inherit: true,
		types: ["Rock", "Ground"],
		baseStats: {hp: 100, atk: 125, def: 135, spa: 20, spd: 60, spe: 80},
	},
	falinks: {
		inherit: true,
		types: ["Fighting", "Rock"],
		baseStats: {hp: 65, atk: 115, def: 100, spa: 70, spd: 60, spe: 110},
		abilities: {0: "Battle Armor", 1: "Technician", H: "Defiant"},
	},
	scovillain: {
		inherit: true,
		baseStats: {hp: 95, atk: 123, def: 65, spa: 93, spd: 65, spe: 95},
		abilities: {0: "Chlorophyll", 1: "Intimidate", H: "Moody"},
	},
	dudunsparce: {
		inherit: true,
		baseStats: {hp: 130, atk: 100, def: 80, spa: 90, spd: 80, spe: 55},
		abilities: {0: "Serene Grace", 1: "Stamina", H: "Rattled"},
	},
	dudunsparcethreesegment: {
		inherit: true,
		baseStats: {hp: 130, atk: 100, def: 80, spa: 90, spd: 80, spe: 55},
		abilities: {0: "Serene Grace", 1: "Stamina", H: "Rattled"},
	},
	eiscue: {
		inherit: true,
		types: ["Ice", "Ground"],
		baseStats: {hp: 75, atk: 110, def: 130, spa: 65, spd: 130, spe: 50},
	},
	eiscuenoice: {
		inherit: true,
		types: ["Ice", "Ground"],
		baseStats: {hp: 75, atk: 110, def: 90, spa: 65, spd: 70, spe: 130},
	},
	tatsugiri: {
		inherit: true,
		baseStats: {hp: 88, atk: 50, def: 70, spa: 120, spd: 95, spe: 92},
		abilities: {0: "Commander", 1: "Natural Cure", H: "Storm Drain"},
	},
	screamtail: {
		inherit: true,
		types: ["Fairy", "Dark"],
	},
	brutebonnet: {
		inherit: true,
		types: ["Poison", "Ghost"],
		baseStats: {hp: 111, atk: 127, def: 89, spa: 79, spd: 99, spe: 65},
	},
	slitherwing: {
		inherit: true,
		baseStats: {hp: 97, atk: 139, def: 121, spa: 69, spd: 81, spe: 63},
	},
	ironjugulis: {
		inherit: true,
		baseStats: {hp: 94, atk: 80, def: 82, spa: 122, spd: 80, spe: 112},
	},
	ironthorns: {
		inherit: true,
		baseStats: {hp: 100, atk: 80, def: 100, spa: 124, spd: 84, spe: 82},
	},


// GMaxes and Buffs to GMax base forms
	venusaurgmax: {
		inherit: true,
		abilities: {0: "Flower Veil"},
	},
	charizardgmax: {
		inherit: true,
		abilities: {0: "Mold Breaker"},
	},
	blastoisegmax: {
		inherit: true,
		abilities: {0: "Bulletproof"},
	},
	butterfree: {
		inherit: true,
		baseStats: {hp: 85, atk: 45, def: 75, spa: 115, spd: 100, spe: 70},
		abilities: {0: "Compound Eyes", H: "Magic Guard"},
	},
	butterfreegmax: {
		inherit: true,
		baseStats: {hp: 85, atk: 45, def: 75, spa: 115, spd: 100, spe: 70},
		abilities: {0: "Magic Bounce"},
	},
	meowthgmax: {
		inherit: true,
		abilities: {0: "Limber"},
	},
	pikachugmax: {
		inherit: true,
		abilities: {0: "Huge Power"},
	},
	machampgmax: {
		inherit: true,
		abilities: {0: "Scrappy"},
	},
	gengargmax: {
		inherit: true,
		abilities: {0: "Mummy"},
	},
	kingler: {
		inherit: true,
		types: ["Water", "Steel"],
		baseStats: {hp: 75, atk: 130, def: 125, spa: 50, spd: 50, spe: 85},
		abilities: {0: "Hyper Cutter", 1: "Tough Claws", H: "Sheer Force"},
	},
	kinglergmax: {
		inherit: true,
		types: ["Water", "Steel"],
		baseStats: {hp: 75, atk: 130, def: 125, spa: 50, spd: 50, spe: 85},
		abilities: {0: "Anger Shell"},
	},
	laprasgmax: {
		inherit: true,
		abilities: {0: "Ice Scales"},
	},
	eeveegmax: {
		inherit: true,
		abilities: {0: "Friend Guard"},
	},
	snorlaxgmax: {
		inherit: true,
		abilities: {0: "Sap Sipper"},
	},
	garbodorgmax: {
		inherit: true,
		abilities: {0: "Toxic Debris"},
	},
	melmetalgmax: {
		inherit: true,
		abilities: {0: "Liquid Ooze"},
	},
	rillaboomgmax: {
		inherit: true,
		abilities: {0: "Grass Pelt"},
	},
	cinderacegmax: {
		inherit: true,
		abilities: {0: "Quick Feet"},
	},
	inteleongmax: {
		inherit: true,
		abilities: {0: "Storm Drain"},
	},
	corviknightgmax: {
		inherit: true,
		abilities: {0: "Iron Barbs"},
	},
	orbeetle: {
		inherit: true,
		baseStats: {hp: 90, atk: 25, def: 110, spa: 90, spd: 120, spe: 115},
		abilities: {0: "Swarm", 1: "Frisk", H: "Psychic Surge"},
	},
	orbeetlegmax: {
		inherit: true,
		abilities: {0: "Magic Guard"},
	},
	drednaw: {
		inherit: true,
		baseStats: {hp: 100, atk: 120, def: 100, spa: 48, spd: 88, spe: 74},
		abilities: {0: "Sturdy", 1: "Swift Swim", H: "Shell Armor"},
	},
	drednawgmax: {
		inherit: true,
		baseStats: {hp: 100, atk: 120, def: 100, spa: 48, spd: 88, spe: 74},
		abilities: {0: "Solid Rock"},
	},
	coalossal: {
		inherit: true,
		types: ["Rock"],
		baseStats: {hp: 125, atk: 80, def: 125, spa: 100, spd: 100, spe: 20},
	},
	coalossalgmax: {
		inherit: true,
		types: ["Rock"],
		baseStats: {hp: 125, atk: 80, def: 125, spa: 100, spd: 100, spe: 20},
		abilities: {0: "Earth Eater"},
	},
	flapple: {
		inherit: true,
		baseStats: {hp: 70, atk: 120, def: 95, spa: 80, spd: 67, spe: 88},
		abilities: {0: "Ripen", 1: "Gluttony", H: "Hustle"},
	},
	flapplegmax: {
		inherit: true,
		baseStats: {hp: 70, atk: 120, def: 95, spa: 80, spd: 67, spe: 88},
		abilities: {0: "Tinted Lens"},
	},
	appletun: {
		inherit: true,
		baseStats: {hp: 110, atk: 75, def: 90, spa: 120, spd: 100, spe: 25},
		abilities: {0: "Ripen", 1: "Harvest", H: "Thick Fat"},
	},
	appletungmax: {
		inherit: true,
		baseStats: {hp: 110, atk: 75, def: 90, spa: 120, spd: 100, spe: 25},
		abilities: {0: "Grassy Surge"},
	},
	sandacondagmax: {
		inherit: true,
		abilities: {0: "Sand Rush"},
	},
	toxtricitygmax: {
		inherit: true,
		abilities: {0: "Electromorphosis"},
	},
	toxtricitylowkeygmax: {
		inherit: true,
		abilities: {0: "Electromorphosis"},
	},
	centiskorch: {
		inherit: true,
		baseStats: {hp: 100, atk: 135, def: 85, spa: 75, spd: 100, spe: 65},
		abilities: {0: "Flash Fire", 1: "Magic Bounce", H: "Flame Body"},
	},
	centiskorchgmax: {
		inherit: true,
		baseStats: {hp: 100, atk: 135, def: 85, spa: 75, spd: 100, spe: 65},
		abilities: {0: "Dry Skin"},
	},
	hatterenegmax: {
		inherit: true,
		abilities: {0: "Natural Cure"},
	},
	grimmsnarl: {
		inherit: true,
		baseStats: {hp: 105, atk: 120, def: 80, spa: 90, spd: 80, spe: 60},
		abilities: {0: "Prankster", 1: "Hustle", H: "Pickpocket"},
	},
	grimmsnarlgmax: {
		inherit: true,
		abilities: {0: "Misty Surge"},
	},
	alcremie: {
		inherit: true,
		baseStats: {hp: 85, atk: 60, def: 90, spa: 120, spd: 125, spe: 70},
		abilities: {0: "Gooey", H: "Aroma Veil"},
	},
	alcremiegmax: {
		inherit: true,
		baseStats: {hp: 85, atk: 60, def: 90, spa: 120, spd: 125, spe: 70},
		abilities: {0: "Well-Baked Body"},
	},
	copperajahgmax: {
		inherit: true,
		abilities: {0: "Stamina"},
	},
	duraludongmax: {
		inherit: true,
		abilities: {0: "Pressure"},
	},
	urshifugmax: {
		inherit: true,
		abilities: {0: "Inner Focus"},
	},
	urshifurapidstrikegmax: {
		inherit: true,
		abilities: {0: "Inner Focus"},
	},
};
