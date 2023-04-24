export const Pokedex: {[k: string]: ModdedSpeciesData} = {
// New Stuff	
	audinomega: {
		inherit: true,
		types: ["Normal", "Electric"],
		baseStats: {hp: 103, atk: 60, def: 130, spa: 100, spd: 97, spe: 55},
		abilities: {0: "Regenerator"},
	},	
	houndoommega: {
		inherit: true,
		types: ["Dark", "Fire"],
		baseStats: {hp: 75, atk: 90, def: 90, spa: 140, spd: 90, spe: 115},
		abilities: {0: "Merciless"},
	},	
	lucariomega: {
		inherit: true,
		types: ["Fighting", "Steel"],
		baseStats: {hp: 70, atk: 125, def: 70, spa: 140, spd: 105, spe: 115},
		abilities: {0: "Limber"},
	},	
	banettemega: {
		inherit: true,
		types: ["Ghost", "Steel"],
		baseStats: {hp: 64, atk: 149, def: 75, spa: 83, spd: 83, spe: 101},
		abilities: {0: "Pocket Dimension"},
	},	
	glaliemega: {
		inherit: true,
		types: ["Ice", "Steel"],
		baseStats: {hp: 80, atk: 175, def: 70, spa: 80, spd: 70, spe: 105},
		abilities: {0: "Strong Jaw"},
	},	
	venusaurmega: {
		inherit: true,
		types: ["Grass", "Poison"],
		baseStats: {hp: 80, atk: 82, def: 123, spa: 120, spd: 120, spe: 100},
		abilities: {0: "Grassy Surge"},
	},	
	blastoisemega: {
		inherit: true,
		types: ["Water", "Fairy"],
		baseStats: {hp: 79, atk: 83, def: 130, spa: 135, spd: 105, spe: 98},
		abilities: {0: "Misty Surge"},
	},	
	charizardmegay: {
		inherit: true,
		types: ["Fire", "Flying"],
		baseStats: {hp: 78, atk: 109, def: 103, spa: 134, spd: 110, spe: 100},
		abilities: {0: "Delta Stream"},
	},	
	alakazammega: {
		inherit: true,
		types: ["Psychic", "Ice"],
		baseStats: {hp: 55, atk: 50, def: 75, spa: 155, spd: 125, spe: 140},
		abilities: {0: "Magic Guard"},
	},	
	pinsirmega: {
		inherit: true,
		types: ["Bug", "Ice"],
		baseStats: {hp: 65, atk: 150, def: 110, spa: 80, spd: 85, spe: 110},
		abilities: {0: "Mountaineer"},
	},	
	gengarmega: {
		inherit: true,
		types: ["Ghost", "Poison"],
		baseStats: {hp: 65, atk: 60, def: 105, spa: 155, spd: 105, spe: 110},
		abilities: {0: "Neutralizing Gas"},
	},	
	aerodactylmega: {
		inherit: true,
		types: ["Rock", "Flying"],
		baseStats: {hp: 80, atk: 140, def: 65, spa: 85, spd: 100, spe: 145},
		abilities: {0: "Nostalgia Trip"},
	},	
	steelixmega: {
		inherit: true,
		types: ["Steel", "Ground"],
		baseStats: {hp: 75, atk: 135, def: 210, spa: 55, spd: 105, spe: 30},
		abilities: {0: "Heatproof"},
		weightkg: 999.9,
	},	
	altariamega: {
		inherit: true,
		types: ["Dragon", "Fairy"],
		baseStats: {hp: 75, atk: 70, def: 95, spa: 140, spd: 115, spe: 95},
		abilities: {0: "Weather Report"},
	},	
	sceptilemega: {
		inherit: true,
		types: ["Grass", "Dragon"],
		baseStats: {hp: 75, atk: 95, def: 79, spa: 145, spd: 99, spe: 142},
		abilities: {0: "Armor Tail"},
	},	
	swampertmega: {
		inherit: true,
		types: ["Water", "Poison"],
		baseStats: {hp: 100, atk: 145, def: 120, spa: 85, spd: 115, spe: 70},
		abilities: {0: "Poison Touch"},
	},	
	manectricmega: {
		inherit: true,
		types: ["Electric"],
		baseStats: {hp: 70, atk: 75, def: 80, spa: 135, spd: 85, spe: 130},
		abilities: {0: "Bug Zapper"},
	},	
	absolmega: {
		inherit: true,
		types: ["Dark", "Fairy"],
		baseStats: {hp: 65, atk: 130, def: 60, spa: 135, spd: 60, spe: 115},
		abilities: {0: "Neuroforce"},
	},	
	medichammega: {
		inherit: true,
		types: ["Fighting", "Psychic"],
		baseStats: {hp: 60, atk: 60, def: 100, spa: 90, spd: 100, spe: 100},
		abilities: {0: "Brain Power"},
	},	
	sableyemega: {
		inherit: true,
		types: ["Ghost", "Dark"],
		baseStats: {hp: 50, atk: 95, def: 115, spa: 85, spd: 115, spe: 20},
	},	
	beedrillmega: {
		inherit: true,
		types: ["Bug", "Rock"],
		baseStats: {hp: 65, atk: 140, def: 85, spa: 45, spd: 85, spe: 75},
		abilities: {0: "Exoskeleton"},
	},	
	mawilemega: {
		inherit: true,
		types: ["Steel", "Fairy"],
		baseStats: {hp: 50, atk: 125, def: 125, spa: 55, spd: 95, spe: 30},
		abilities: {0: "Tough Claws"},
	},	
	abomasnowmega: {
		inherit: true,
		abilities: {0: "Ice Scales"},
	},	
	cameruptmega: {
		inherit: true,
		types: ["Fire", "Ground"],
		baseStats: {hp: 70, atk: 110, def: 110, spa: 135, spd: 115, spe: 20},
		abilities: {0: "Earth Eater"},
	},	
	slowbromega: {
		inherit: true,
		types: ["Water", "Psychic"],
		baseStats: {hp: 95, atk: 75, def: 150, spa: 120, spd: 120, spe: 30},
		abilities: {0: "Shell Ejection"},
	},	
	gallademega: {
		inherit: true,
		types: ["Psychic", "Fighting"],
		baseStats: {hp: 68, atk: 150, def: 100, spa: 65, spd: 127, spe: 108},
		abilities: {0: "Sharpness"},
	},	
	ampharosmega: {
		inherit: true,
		types: ["Electric", "Dragon"],
		baseStats: {hp: 90, atk: 95, def: 95, spa: 165, spd: 115, spe: 55},
		abilities: {0: "Mega Launcher"},
	},
	gyaradosmega: {
		inherit: true,
		types: ["Water", "Flying"],
		baseStats: {hp: 95, atk: 145, def: 109, spa: 70, spd: 130, spe: 91},
		abilities: {0: "Aerilate"},
	},	
	heracrossmega: {
		inherit: true,
		types: ["Bug", "Fighting"],
		baseStats: {hp: 80, atk: 150, def: 150, spa: 40, spd: 110, spe: 70},
		abilities: {0: "Iron Barbs"},
	},	
	sharpedomega: {
		inherit: true,
		types: ["Water", "Electric"],
		baseStats: {hp: 70, atk: 130, def: 55, spa: 145, spd: 55, spe: 105},
		abilities: {0: "No Guard"},
	},	
	gardevoirmega: {
		inherit: true,
		types: ["Psychic", "Fairy"],
		baseStats: {hp: 68, atk: 65, def: 100, spa: 150, spd: 127, spe: 108},
	},	
	aggronmega: {
		inherit: true,
		types: ["Steel"],
		baseStats: {hp: 70, atk: 145, def: 185, spa: 90, spd: 85, spe: 60},
		abilities: {0: "Dauntless Shield"},
	},	
	
// Gen 6 Stuff
	arbok: {
		inherit: true,
		baseStats: {hp: 60, atk: 85, def: 69, spa: 65, spd: 79, spe: 80},
	},
	pikachu: {
		inherit: true,
		formeOrder: ["Pikachu", "Pikachu-Rock-Star", "Pikachu-Belle", "Pikachu-Pop-Star", "Pikachu-PhD", "Pikachu-Libre", "Pikachu-Cosplay"],
	},
	dugtrio: {
		inherit: true,
		baseStats: {hp: 35, atk: 80, def: 50, spa: 50, spd: 70, spe: 120},
	},
	farfetchd: {
		inherit: true,
		baseStats: {hp: 52, atk: 65, def: 55, spa: 58, spd: 62, spe: 60},
	},
	dodrio: {
		inherit: true,
		baseStats: {hp: 60, atk: 110, def: 70, spa: 60, spd: 60, spe: 100},
	},
	gengar: {
		inherit: true,
		abilities: {0: "Levitate"},
	},
	electrode: {
		inherit: true,
		baseStats: {hp: 60, atk: 50, def: 70, spa: 80, spd: 80, spe: 140},
	},
	exeggutor: {
		inherit: true,
		baseStats: {hp: 95, atk: 95, def: 85, spa: 125, spd: 65, spe: 55},
	},
	noctowl: {
		inherit: true,
		baseStats: {hp: 100, atk: 50, def: 50, spa: 76, spd: 96, spe: 70},
	},
	ariados: {
		inherit: true,
		baseStats: {hp: 70, atk: 90, def: 70, spa: 60, spd: 60, spe: 40},
	},
	qwilfish: {
		inherit: true,
		baseStats: {hp: 65, atk: 95, def: 75, spa: 55, spd: 55, spe: 85},
	},
	magcargo: {
		inherit: true,
		baseStats: {hp: 50, atk: 50, def: 120, spa: 80, spd: 80, spe: 30},
	},
	corsola: {
		inherit: true,
		baseStats: {hp: 55, atk: 55, def: 85, spa: 65, spd: 85, spe: 35},
	},
	mantine: {
		inherit: true,
		baseStats: {hp: 65, atk: 40, def: 70, spa: 80, spd: 140, spe: 70},
	},
	raikou: {
		inherit: true,
		abilities: {0: "Pressure"},
	},
	entei: {
		inherit: true,
		abilities: {0: "Pressure"},
	},
	suicune: {
		inherit: true,
		abilities: {0: "Pressure"},
	},
	swellow: {
		inherit: true,
		baseStats: {hp: 60, atk: 85, def: 60, spa: 50, spd: 50, spe: 125},
	},
	wingull: {
		inherit: true,
		abilities: {0: "Keen Eye", H: "Rain Dish"},
	},
	pelipper: {
		inherit: true,
		baseStats: {hp: 60, atk: 50, def: 100, spa: 85, spd: 70, spe: 65},
		abilities: {0: "Keen Eye", H: "Rain Dish"},
	},
	masquerain: {
		inherit: true,
		baseStats: {hp: 70, atk: 60, def: 62, spa: 80, spd: 82, spe: 60},
	},
	delcatty: {
		inherit: true,
		baseStats: {hp: 70, atk: 65, def: 65, spa: 55, spd: 55, spe: 70},
	},
	volbeat: {
		inherit: true,
		baseStats: {hp: 65, atk: 73, def: 55, spa: 47, spd: 75, spe: 85},
		abilities: {0: "Illuminate", 1: "Swarm", H: "Prankster"},
	},
	illumise: {
		inherit: true,
		baseStats: {hp: 65, atk: 47, def: 55, spa: 73, spd: 75, spe: 85},
	},
	torkoal: {
		inherit: true,
		abilities: {0: "White Smoke", H: "Shell Armor"},
	},
	lunatone: {
		inherit: true,
		baseStats: {hp: 70, atk: 55, def: 65, spa: 95, spd: 85, spe: 70},
	},
	solrock: {
		inherit: true,
		baseStats: {hp: 70, atk: 95, def: 85, spa: 55, spd: 65, spe: 70},
	},
	castform: {
		inherit: true,
		color: "White",
	},
	castformsunny: {
		inherit: true,
		color: "White",
	},
	castformrainy: {
		inherit: true,
		color: "White",
	},
	chimecho: {
		inherit: true,
		baseStats: {hp: 65, atk: 50, def: 70, spa: 95, spd: 80, spe: 65},
	},
	burmy: {
		inherit: true,
		color: "Gray",
	},
	wormadam: {
		inherit: true,
		color: "Gray",
	},
	wormadamsandy: {
		inherit: true,
		color: "Gray",
	},
	wormadamtrash: {
		inherit: true,
		color: "Gray",
	},
	cherrim: {
		inherit: true,
		color: "Pink",
	},
	arceus: {
		inherit: true,
		color: "Gray",
	},
	arceusbug: {
		inherit: true,
		requiredItem: "Insect Plate",
	},
	arceusdark: {
		inherit: true,
		requiredItem: "Dread Plate",
	},
	arceusdragon: {
		inherit: true,
		requiredItem: "Draco Plate",
	},
	arceuselectric: {
		inherit: true,
		requiredItem: "Zap Plate",
	},
	arceusfairy: {
		inherit: true,
		requiredItem: "Pixie Plate",
	},
	arceusfighting: {
		inherit: true,
		requiredItem: "Fist Plate",
	},
	arceusfire: {
		inherit: true,
		requiredItem: "Flame Plate",
	},
	arceusflying: {
		inherit: true,
		requiredItem: "Sky Plate",
	},
	arceusghost: {
		inherit: true,
		requiredItem: "Spooky Plate",
	},
	arceusgrass: {
		inherit: true,
		requiredItem: "Meadow Plate",
	},
	arceusground: {
		inherit: true,
		requiredItem: "Earth Plate",
	},
	arceusice: {
		inherit: true,
		requiredItem: "Icicle Plate",
	},
	arceuspoison: {
		inherit: true,
		requiredItem: "Toxic Plate",
	},
	arceuspsychic: {
		inherit: true,
		requiredItem: "Mind Plate",
	},
	arceusrock: {
		inherit: true,
		requiredItem: "Stone Plate",
	},
	arceussteel: {
		inherit: true,
		requiredItem: "Iron Plate",
	},
	arceuswater: {
		inherit: true,
		requiredItem: "Splash Plate",
	},
	roggenrola: {
		inherit: true,
		abilities: {0: "Sturdy", H: "Sand Force"},
	},
	boldore: {
		inherit: true,
		abilities: {0: "Sturdy", H: "Sand Force"},
	},
	gigalith: {
		inherit: true,
		abilities: {0: "Sturdy", H: "Sand Force"},
	},
	woobat: {
		inherit: true,
		baseStats: {hp: 55, atk: 45, def: 43, spa: 55, spd: 43, spe: 72},
	},
	darmanitanzen: {
		inherit: true,
		color: "Red",
	},
	crustle: {
		inherit: true,
		baseStats: {hp: 70, atk: 95, def: 125, spa: 65, spd: 75, spe: 45},
	},
	vanillite: {
		inherit: true,
		abilities: {0: "Ice Body", H: "Weak Armor"},
	},
	vanillish: {
		inherit: true,
		abilities: {0: "Ice Body", H: "Weak Armor"},
	},
	vanilluxe: {
		inherit: true,
		abilities: {0: "Ice Body", H: "Weak Armor"},
	},
	deerling: {
		inherit: true,
		color: "Yellow",
	},
	cubchoo: {
		inherit: true,
		abilities: {0: "Snow Cloak", H: "Rattled"},
	},
	beartic: {
		inherit: true,
		baseStats: {hp: 95, atk: 110, def: 80, spa: 70, spd: 80, spe: 50},
		abilities: {0: "Snow Cloak", H: "Swift Swim"},
	},
	cryogonal: {
		inherit: true,
		baseStats: {hp: 70, atk: 50, def: 30, spa: 95, spd: 135, spe: 105},
	},
	greninja: {
		inherit: true,
		abilities: {0: "Torrent", H: "Protean"},
	},
	vivillon: {
		inherit: true,
		color: "Black",
	},
	meowstic: {
		inherit: true,
		color: "White",
	},
	zygarde: {
		inherit: true,
		abilities: {0: "Aura Break"},
	},
	necturna: {
		inherit: true,
		baseStats: {hp: 64, atk: 120, def: 100, spa: 85, spd: 120, spe: 81},
	},
	aurumoth: {
		inherit: true,
		abilities: {0: "Weak Armor", 1: "No Guard", H: "Illusion"},
	},
	malaconda: {
		inherit: true,
		abilities: {0: "Harvest", 1: "Infiltrator"},
	},
	naviathan: {
		inherit: true,
		abilities: {0: "Water Veil", 1: "Heatproof", H: "Light Metal"},
	},
	crucibellemega: {
		inherit: true,
		baseStats: {hp: 106, atk: 135, def: 75, spa: 85, spd: 125, spe: 114},
	},
	syclant: {
		inherit: true,
		abilities: {0: "Compound Eyes", 1: "Mountaineer"},
	},
	revenankh: {
		inherit: true,
		abilities: {0: "Shed Skin", 1: "Air Lock"},
	},
	pyroak: {
		inherit: true,
		abilities: {0: "Rock Head", 1: "Battle Armor"},
	},
	fidgit: {
		inherit: true,
		abilities: {0: "Persistent", 1: "Vital Spirit"},
	},
	stratagem: {
		inherit: true,
		abilities: {0: "Levitate", 1: "Technician"},
	},
	arghonaut: {
		inherit: true,
		abilities: {0: "Unaware"},
	},
	kitsunoh: {
		inherit: true,
		abilities: {0: "Frisk", 1: "Limber"},
	},
	cyclohm: {
		inherit: true,
		abilities: {0: "Shield Dust", 1: "Static"},
	},
	colossoil: {
		inherit: true,
		abilities: {0: "Rebound", 1: "Guts"},
	},
	krilowatt: {
		inherit: true,
		abilities: {0: "Trace", 1: "Magic Guard"},
	},
	voodoom: {
		inherit: true,
		abilities: {0: "Volt Absorb", 1: "Lightning Rod"},
	},
};
