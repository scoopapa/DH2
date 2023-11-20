export const Pokedex: {[speciesid: string]: ModdedSpeciesData} = {
	darmanitangalarzen: {
		inherit: true,
		baseStats: {hp: 105, atk: 55, def: 65, spa: 120, spd: 65, spe: 130},
	},
	fluttermane: {
		inherit: true,
		types: ["Ghost", "Bug"],
		baseStats: {hp: 65, atk: 95, def: 55, spa: 115, spd: 135, spe: 105},
	},
	palafinhero: {
		inherit: true,
		types: ["Water", "Fighting"],
		baseStats: {hp: 100, atk: 100, def: 135, spa: 83, spd: 92, spe: 60},
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
		baseStats: {hp: 60, atk: 45, def: 75, spa: 115, spd: 100, spe: 70},
		abilities: {0: "Compound Eyes", H: "Magic Guard"},
	},
	butterfreegmax: {
		inherit: true,
		baseStats: {hp: 60, atk: 45, def: 75, spa: 115, spd: 100, spe: 70},
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
	kinglergmax: {
		inherit: true,
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
	orbeetlegmax: {
		inherit: true,
		abilities: {0: "Magic Guard"},
	},
	drednawgmax: {
		inherit: true,
		abilities: {0: "Solid Rock"},
	},
	coalossalgmax: {
		inherit: true,
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
	grimmsnarlgmax: {
		inherit: true,
		abilities: {0: "Tangling Hair"},
	},
	alcremie: {
		inherit: true,
		baseStats: {hp: 65, atk: 60, def: 90, spa: 120, spd: 125, spe: 70},
		abilities: {0: "Gooey", H: "Aroma Veil"},
	},
	alcremiegmax: {
		inherit: true,
		baseStats: {hp: 65, atk: 60, def: 90, spa: 120, spd: 125, spe: 70},
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
