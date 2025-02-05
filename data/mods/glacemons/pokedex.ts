export const Pokedex: { [k: string]: ModdedSpeciesData } = {
	// Slate 1
	umbreon: {
		inherit: true,
		types: ["Dark", "Poison"],
		abilities: {0: "Magic Guard", H: "Natural Cure"},
	},
	// Protean
	croagunk: {
		inherit: true,
		abilities: {0: "Protean", 1: "Dry Skin", H: "Poison Touch"},
	},
	toxicroak: {
		inherit: true,
		abilities: {0: "Protean", 1: "Dry Skin", H: "Poison Touch"},
	},
	alcremie: {
		inherit: true,
		abilities: {0: "Hospitality", 1: "Protean", H: "Aroma Veil"},
	},
	remoraid: {
		inherit: true,
		abilities: {0: "Suction Cups", 1: "Indancesce", H: "Protean"},
	},
	octillery: {
		inherit: true,
		abilities: {0: "Suction Cups", 1: "Indancesce", H: "Protean"},
	},
	castform: {
		inherit: true,
		abilities: {0: "Forecast", H: "Protean"},
	},
	// Velocity
	ninjask: {
		inherit: true,
		abilities: {0: "Speed Boost", 1: "Velocity", H: "Infiltrator"},
	},
	voltorb: {
		inherit: true,
		abilities: {0: "Soundproof", 1: "Velocity", H: "Aftermath"},
	},
	voltorbhisui: {
		inherit: true,
		abilities: {0: "Soundproof", 1: "Velocity", H: "Aftermath"},
	},
	electrode: {
		inherit: true,
		abilities: {0: "Soundproof", 1: "Velocity", H: "Aftermath"},
	},
	electrodehisui: {
		inherit: true,
		abilities: {0: "Soundproof", 1: "Velocity", H: "Aftermath"},
	},
	arrokuda: {
		inherit: true,
		abilities: {0: "Swift Swim", 1: "Velocity", H: "Propeller Tail"},
	},
	barraskewda: {
		inherit: true,
		abilities: {0: "Swift Swim", 1: "Velocity", H: "Propeller Tail"},
	},
	meowth: {
		inherit: true,
		abilities: {0: "Pickup", 1: "Technician", H: "Velocity"},
	},
	persian: {
		inherit: true,
		abilities: {0: "Limber", 1: "Technician", H: "Velocity"},
	},
	furret: {
		inherit: true,
		abilities: {0: "Velocity", 1: "Keen Eye", H: "Frisk"},
	},
	blitzle: {
		inherit: true,
		abilities: {0: "Indancesce", 1: "Velocity", H: "Sap Sipper"},
	},
	zebstrika: {
		inherit: true,
		abilities: {0: "Indancesce", 1: "Velocity", H: "Sap Sipper"},
	},
	irontreads: {
		inherit: true,
		abilities: {0: "Quark Drive", H: "Velocity"},
	},
	raikou: {
		inherit: true,
		abilities: {0: "Pressure", 1: "Velocity", H: "Inner Focus"},
	},
	treecko: {
		inherit: true,
		abilities: {0: "Overgrow", H: "Velocity"},
	},
	grovyle: {
		inherit: true,
		abilities: {0: "Overgrow", H: "Velocity"},
	},
	klink: {
		inherit: true,
		abilities: {0: "Velocity", 1: "Minus", H: "Flouresce"},
	},
	klang: {
		inherit: true,
		abilities: {0: "Velocity", 1: "Minus", H: "Flouresce"},
	},
	klinklang: {
		inherit: true,
		abilities: {0: "Velocity", 1: "Minus", H: "Flouresce"},
	},
	linoone: {
		inherit: true,
		abilities: {0: "Velocity", 1: "Gluttony", H: "Quick Feet"},
	},
	// Route Closed
	orthworm: {
		inherit: true,
		abilities: {0: "Earth Eater", 1: "Route Closed", H: "Sand Veil"},
	},
	conkeldurr: {
		inherit: true,
		abilities: {0: "Guts", 1: "Route Closed", H: "Iron Fist"},
	},
	mudsdale: {
		inherit: true,
		abilities: {0: "Route Closed", 1: "Stamina", H: "Inner Focus"},
	},
	rhyhorn: {
		inherit: true,
		abilities: {0: "Lightning Rod", 1: "Rock Head", H: "Daredevil"},
	},
	rhydon: {
		inherit: true,
		abilities: {0: "Lightning Rod", 1: "Rock Head", H: "Daredevil"},
	},
	rhyperior: {
		inherit: true,
		abilities: {0: "Route Closed", 1: "Daredevil", H: "Battle Armor"},
	},
	dwebble: {
		inherit: true,
		abilities: {0: "Sturdy", 1: "Shell Armor", H: "Route Closed"},
	},
	crustle: {
		inherit: true,
		abilities: {0: "Sturdy", 1: "Shell Armor", H: "Route Closed"},
	},
	// Slate 2
	enamorus: {
		inherit: true,
		abilities: {0: "Trace", H: "Contrary"},
	},
	enamorustherian: {
		inherit: true,
		abilities: {0: "Multiscale"},
	},
	genesect: {
		inherit: true,
		abilities: {0: "Neuroforce"},
	},
	genesectdouse: {
		inherit: true,
		abilities: {0: "Deliquesce"},
	},
	genesectshock: {
		inherit: true,
		abilities: {0: "Flouresce"},
	},
	genesectburn: {
		inherit: true,
		abilities: {0: "Indancesce"},
	},
	genesectchill: {
		inherit: true,
		abilities: {0: "Refrigerate"},
	},
	necrozma: {
		inherit: true,
		types: ["Psychic", "Dragon"],
		abilities: {0: "Prism Armor", H: "Download"},
	},
	skarmory: {
		inherit: true,
		abilities: {0: "Early Bird", 1: "Sturdy", H: "Iron Barbs"},
	},
	sceptile: {
		inherit: true,
		types: ["Grass", "Dragon"],
		abilities: {0: "Overgrow", H: "Velocity"},
	},
	sceptilemega: {
		inherit: true,
		abilities: {0: "Mega Launcher"},
		requiredItem: null,
		requiredItems: ["Sceptilite", "Parallel Mega Orb"],
	},
	terapagosstellar: {
		inherit: true,
		types: ["Stellar"],
		requiredItem: "Special Tera Orb",
	},
	// Hospitality
	happiny: {
		inherit: true,
		abilities: {0: "Natural Cure", 1: "Serene Grace", H: "Hospitality"},
	},
	chansey: {
		inherit: true,
		abilities: {0: "Natural Cure", 1: "Serene Grace", H: "Hospitality"},
	},
	blissey: {
		inherit: true,
		abilities: {0: "Natural Cure", 1: "Serene Grace", H: "Hospitality"},
	},
	appletun: {
		inherit: true,
		abilities: {0: "Ripen", 1: "Hospitality", H: "Thick Fat"},
	},
	aromatisse: {
		inherit: true,
		abilities: {0: "Hospitality", H: "Aroma Veil"},
	},

	// Solar Power
	oddish: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Solar Power", H: "Run Away"},
	},
	gloom: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Solar Power", H: "Stench"},
	},
	vileplume: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Solar Power", H: "Effect Spore"},
	},
	bellossom: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Solar Power", H: "Wind Power"},
	},
	exeggcute: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Solar Power", H: "Harvest"},
	},
	exeggutor: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Solar Power", H: "Harvest"},
	},
	exeggutoralola: {
		inherit: true,
		abilities: {0: "Unconcerned", 1: "Solar Power", H: "Harvest"},
	},
	lilligant: {
		inherit: true,
		abilities: {0: "Wind Power", 1: "Own Tempo", H: "Solar Power"},
	},
	lilliganthisui: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Hustle", H: "Solar Power"},
	},
	roserade: {
		inherit: true,
		abilities: {0: "Natural Cure", 1: "Solar Power", H: "Technician"},
	},
	arboliva: {
		inherit: true,
		abilities: {0: "Seed Sower", 1: "Solar Power", H: "Harvest"},
	},
	scovillain: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Unconcerned", H: "Solar Power"},
	},
	leafeon: {
		inherit: true,
		abilities: {0: "Solar Power", H: "Chlorophyll"},
	},
	bellsprout: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Solar Power", H: "Merciless"},
	},
	weepinbell: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Solar Power", H: "Merciless"},
	},
	victreebel: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Solar Power", H: "Merciless"},
	},
	zarude: {
		inherit: true,
		abilities: {0: "Leaf Guard", 1: "Moody", H: "Solar Power"},
	},
	zarudedada: {
		inherit: true,
		abilities: {0: "Leaf Guard", 1: "Moody", H: "Solar Power"},
	},
	camerupt: {
		inherit: true,
		abilities: {0: "Solar Power", 1: "Solid Rock", H: "Anger Point"},
	},

	// Honey Gather
	heracross: {
		inherit: true,
		abilities: {0: "Honey Gather", 1: "Guts", H: "Moxie"},
	},
	beautifly: {
		inherit: true,
		abilities: {0: "Swarm", 1: "Honey Gather", H: "Rivalry"},
	},
	dustox: {
		inherit: true,
		abilities: {0: "Shield Dust", 1: "Honey Gather", H: "Compound Eyes"},
	},
	vespiquen: {
		inherit: true,
		abilities: {0: "Pressure", 1: "Honey Gather", H: "Unnerve"},
	},
	wormadam: {
		inherit: true,
		abilities: {0: "Anticipation", 1: "Honey Gather", H: "Overcoat"},
	},
	wormadamsandy: {
		inherit: true,
		abilities: {0: "Anticipation", 1: "Honey Gather", H: "Overcoat"},
	},
	wormadamtrash: {
		inherit: true,
		abilities: {0: "Anticipation", 1: "Honey Gather", H: "Overcoat"},
	},
	mothim: {
		inherit: true,
		abilities: {0: "Swarm", 1: "Honey Gather", H: "Tinted Lens"},
	},
	ursaring: {
		inherit: true,
		abilities: {0: "Guts", 1: "Quick Feet", H: "Honey Gather"},
	},
	ursaluna: {
		inherit: true,
		abilities: {0: "Guts", 1: "Bulletproof", H: "Honey Gather"},
	},
	ambipom: {
		inherit: true,
		abilities: {0: "Technician", 1: "Honey Gather", H: "Skill Link"},
	},

	// Run It Back
	celebi: {
		inherit: true,
		abilities: {0: "Natural Cure", 1: "Moody", H: "Run It Back"},
	},
	beheeyem: {
		inherit: true,
		abilities: {0: "Run It Back", 1: "Synchronize", H: "Analytic"},
	},
	inkay: {
		inherit: true,
		abilities: {0: "Contrary", 1: "Run It Back", H: "Forewarn"},
	},
	malamar: {
		inherit: true,
		abilities: {0: "Contrary", 1: "Run It Back", H: "Forewarn"},
	},
	oranguru: {
		inherit: true,
		abilities: {0: "Inner Focus", 1: "Run It Back", H: "Symbiosis"},
	},
	accelgor: {
		inherit: true,
		abilities: {0: "Run It Back", 1: "Sticky Hold", H: "Unburden"},
	},
	grafaiai: {
		inherit: true,
		abilities: {0: "Unburden", 1: "Run It Back", H: "Prankster"},
	},
	togedemaru: {
		inherit: true,
		abilities: {0: "Iron Barbs", 1: "Lightning Rod", H: "Run It Back"},
	},

	// Anticipation
	medicham: {
		inherit: true,
		abilities: {0: "Pure Power", 1: "Anticipation", H: "Telepathy"},
	},
	munna: {
		inherit: true,
		abilities: {0: "Comatose", 1: "Synchronize", H: "Anticipation"},
	},
	musharna: {
		inherit: true,
		abilities: {0: "Comatose", 1: "Synchronize", H: "Anticipation"},
	},
	weavile: {
		inherit: true,
		abilities: {0: "Pressure", 1: "Anticipation", H: "Pickpocket"},
	},

	// Silvally buff
	silvally: {
		inherit: true,
		abilities: {0: "RKS System", H: "Tough Claws"},
		requiredItem: null,
		requiredItems: ["Bug Memory", "Buginium Z"],
		unreleasedHidden: true,
	},
	silvallybug: {
		inherit: true,
		abilities: {0: "RKS System", H: "Tinted Lens"},
		requiredItem: null,
		requiredItems: ["Bug Memory", "Buginium Z"],
		unreleasedHidden: true,
	},
	silvallydark: {
		inherit: true,
		abilities: {0: "RKS System", H: "Adaptability"},
		requiredItem: null,
		requiredItems: ["Dark Memory", "Darkinium Z"],
		unreleasedHidden: true,
	},
	silvallydragon: {
		inherit: true,
		abilities: {0: "RKS System", H: "Rough Skin"},
		requiredItem: null,
		requiredItems: ["Dragon Memory", "Dragonium Z"],
		unreleasedHidden: true,
	},
	silvallyelectric: {
		inherit: true,
		abilities: {0: "RKS System", H: "Download"},
		requiredItem: null,
		requiredItems: ["Electric Memory", "Electrium Z"],
		unreleasedHidden: true,
	},
	silvallyfairy: {
		inherit: true,
		abilities: {0: "RKS System", H: "Pastel Veil"},
		requiredItem: null,
		requiredItems: ["Fairy Memory", "Fairium Z"],
		unreleasedHidden: true,
	},
	silvallyfighting: {
		inherit: true,
		abilities: {0: "RKS System", H: "Opportunist"},
		requiredItem: null,
		requiredItems: ["Fighting Memory", "Fightinium Z"],
		unreleasedHidden: true,
	},
	silvallyfire: {
		inherit: true,
		abilities: {0: "RKS System", H: "Pyre"},
		requiredItem: null,
		requiredItems: ["Fire Memory", "Firium Z"],
		unreleasedHidden: true,
	},
	silvallyflying: {
		inherit: true,
		abilities: {0: "RKS System", H: "Magic Guard"},
		requiredItem: null,
		requiredItems: ["Flying Memory", "Flyinium Z"],
		unreleasedHidden: true,
	},
	silvallyghost: {
		inherit: true,
		abilities: {0: "RKS System", H: "Shadow Shield"},
		requiredItem: null,
		requiredItems: ["Ghost Memory", "Ghostium Z"],
		unreleasedHidden: true,
	},
	silvallygrass: {
		inherit: true,
		abilities: {0: "RKS System", H: "Wind Rider"},
		requiredItem: null,
		requiredItems: ["Grass Memory", "Grassium Z"],
		unreleasedHidden: true,
	},
	silvallyground: {
		inherit: true,
		abilities: {0: "RKS System", H: "Dry Skin"},
		requiredItem: null,
		requiredItems: ["Ground Memory", "Groundium Z"],
		unreleasedHidden: true,
	},
	silvallyice: {
		inherit: true,
		abilities: {0: "RKS System", H: "Ice Scales"},
		requiredItem: null,
		requiredItems: ["Ice Memory", "Icium Z"],
		unreleasedHidden: true,
	},
	silvallypoison: {
		inherit: true,
		abilities: {0: "RKS System", H: "Regenerator"},
		requiredItem: null,
		requiredItems: ["Poison Memory", "Poisonium Z"],
		unreleasedHidden: true,
	},
	silvallypsychic: {
		inherit: true,
		abilities: {0: "RKS System", H: "Magic Bounce"},
		requiredItem: null,
		requiredItems: ["Psychic Memory", "Psychium Z"],
		unreleasedHidden: true,
	},
	silvallyrock: {
		inherit: true,
		abilities: {0: "RKS System", H: "Rocky Payload"},
		requiredItem: null,
		requiredItems: ["Rock Memory", "Rockium Z"],
		unreleasedHidden: true,
	},
	silvallysteel: {
		inherit: true,
		abilities: {0: "RKS System", H: "Filter"},
		requiredItem: null,
		requiredItems: ["Steel Memory", "Steelium Z"],
		unreleasedHidden: true,
	},
	silvallywater: {
		inherit: true,
		abilities: {0: "RKS System", H: "Water Absorb"},
		requiredItem: null,
		requiredItems: ["Water Memory", "Waterium Z"],
		unreleasedHidden: true,
	},
	// Slate 3
	steelix: {
		inherit: true,
		abilities: {0: "Sturdy", 1: "Route Closed", H: "Sheer Force"},
	},
	steelixmega: {
		inherit: true,
		abilities: {0: "Rough Skin"},
		requiredItem: null,
		requiredItems: ["Steelixite", "Parallel Mega Orb"],
	},
	taurospaldeacombat: {
		inherit: true,
		types: ["Fighting", "Fairy"],
		abilities: {0: "Intimidate", 1: "Anger Point", H: "Pixilate"},
	},
	taurospaldeablaze: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Anger Point", H: "Flame Body"},
	},
	taurospaldeaaqua: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Anger Point", H: "Water Absorb"},
	},
	wochien: {
		inherit: true,
		types: ["Dark", "Ghost"],
	},
	glaceon: {
		inherit: true,
		types: ["Ice", "Ground"],
		abilities: {0: "Ice Scales", H: "Ice Body"},
	},
	manectricmega: {
		inherit: true,
		types: ["Electric", "Fire"],
		requiredItem: null,
		requiredItems: ["Manectite", "Parallel Mega Orb"],
	},
	avalugg: {
		inherit: true,
		types: ["Ice", "Fighting"],
		abilities: {0: "Anticipation", 1: "Ice Body", H: "Sturdy"},
	},
	avalugghisui: {
		inherit: true,
		types: ["Ice", "Ground"],
	},
	// Liquid Body
	grimer: {
		inherit: true,
		abilities: {0: "Liquid Body", 1: "Sticky Hold", H: "Stench"},
	},
	grimeralola: {
		inherit: true,
		abilities: {0: "Poison Touch", 1: "Liquid Body", H: "Stench"},
	},
	muk: {
		inherit: true,
		abilities: {0: "Liquid Body", 1: "Sticky Hold", H: "Stench"},
	},
	mukalola: {
		inherit: true,
		abilities: {0: "Poison Touch", 1: "Liquid Body", H: "Stench"},
	},
	gulpin: {
		inherit: true,
		abilities: {0: "Liquid Ooze", 1: "Sticky Hold", H: "Liquid Body"},
	},
	swalot: {
		inherit: true,
		abilities: {0: "Liquid Ooze", 1: "Sticky Hold", H: "Liquid Body"},
	},
	solosis: {
		inherit: true,
		abilities: {0: "Liquid Body", 1: "Magic Guard", H: "Regenerator"},
	},
	duosion: {
		inherit: true,
		abilities: {0: "Liquid Body", 1: "Magic Guard", H: "Regenerator"},
	},
	reuniclus: {
		inherit: true,
		abilities: {0: "Liquid Body", 1: "Magic Guard", H: "Regenerator"},
	},
	sinistea: {
		inherit: true,
		abilities: {0: "Weak Armor", 1: "Liquid Body", H: "Cursed Body"},
	},
	sinisteaantique: {
		inherit: true,
		abilities: {0: "Weak Armor", 1: "Liquid Body", H: "Cursed Body"},
	},
	polteageist: {
		inherit: true,
		abilities: {0: "Weak Armor", 1: "Liquid Body", H: "Cursed Body"},
	},
	polteageistantique: {
		inherit: true,
		abilities: {0: "Weak Armor", 1: "Liquid Body", H: "Cursed Body"},
	},
	dewpider: {
		inherit: true,
		abilities: {0: "Water Bubble", 1: "Liquid Body", H: "Water Absorb"},
	},
	araquanid: {
		inherit: true,
		abilities: {0: "Water Bubble", 1: "Liquid Body", H: "Water Absorb"},
	},
	frillish: {
		inherit: true,
		abilities: {0: "Water Absorb", 1: "Cursed Body", H: "Liquid Body"},
	},
	jellicent: {
		inherit: true,
		abilities: {0: "Water Absorb", 1: "Cursed Body", H: "Liquid Body"},
	},
	meltan: {
		inherit: true,
		abilities: {0: "Magnet Pull", H: "Liquid Body"},
	},
	// Long Reach
	mienfoo: {
		inherit: true,
		abilities: {0: "Karate", 1: "Regenerator", H: "Long Reach"},
	},
	mienshao: {
		inherit: true,
		abilities: {0: "Karate", 1: "Regenerator", H: "Long Reach"},
	},
	deoxys: {
		inherit: true,
		abilities: {0: "Pressure", H: "Long Reach"},
	},
	deoxysattack: {
		inherit: true,
		abilities: {0: "Pressure", H: "Long Reach"},
	},
	deoxysdefense: {
		inherit: true,
		abilities: {0: "Pressure", H: "Long Reach"},
	},
	deoxysspeed: {
		inherit: true,
		abilities: {0: "Pressure", H: "Long Reach"},
	},
	minccino: {
		inherit: true,
		abilities: {0: "Long Reach", 1: "Technician", H: "Skill Link"},
	},
	cinccino: {
		inherit: true,
		abilities: {0: "Long Reach", 1: "Technician", H: "Skill Link"},
	},
	magby: {
		inherit: true,
		abilities: {0: "Flame Body", 1: "Long Reach", H: "Vital Spirit"},
	},
	magmar: {
		inherit: true,
		abilities: {0: "Flame Body", 1: "Long Reach", H: "Vital Spirit"},
	},
	magmortar: {
		inherit: true,
		abilities: {0: "Flame Body", 1: "Long Reach", H: "Vital Spirit"},
	},
	hoopa: {
		inherit: true,
		abilities: {0: "Magician", H: "Long Reach"},
	},
	hoopaunbound: {
		inherit: true,
		abilities: {0: "Magician", H: "Long Reach"},
	},
	ironhands: {
		inherit: true,
		abilities: {0: "Quark Drive", H: "Long Reach"},
	},
	hitmonlee: {
		inherit: true,
		abilities: {0: "Long Reach", 1: "Reckless", H: "Unburden"},
	},
	// Emergency Exit
	cyclizar: {
		inherit: true,
		abilities: {0: "Shed Skin", 1: "Emergency Exit", H: "Regenerator"},
	},
	noivern: {
		inherit: true,
		abilities: {0: "Wind Power", 1: "Infiltrator", H: "Emergency Exit"},
	},
	vibrava: {
		inherit: true,
		abilities: {0: "Levitate", H: "Emergency Exit"},
	},
	flygon: {
		inherit: true,
		abilities: {0: "Levitate", H: "Emergency Exit"},
	},
	rapidash: {
		inherit: true,
		abilities: {0: "Emergency Exit", 1: "Flash Fire", H: "Flame Body"},
	},
	slitherwing: {
		inherit: true,
		abilities: {0: "Protosynthesis", H: "Emergency Exit"},
	},
	gogoat: {
		inherit: true,
		abilities: {0: "Sap Sipper", 1: "Emergency Exit", H: "Grass Pelt"},
	},
	// Aftermath
	ferrothorn: {
		inherit: true,
		abilities: {0: "Iron Barbs", 1: "Aftermath", H: "Anticipation"},
	},
	forretress: {
		inherit: true,
		abilities: {0: "Sturdy", 1: "Aftermath", H: "Overcoat"},
	},
	spiritomb: {
		inherit: true,
		abilities: {0: "Pressure", 1: "Aftermath", H: "Sinister Thoughts"},
	},
	// Early Bird
	archen: {
		inherit: true,
		abilities: {0: "Defeatist", 1: "Aerodynamism", H: "Early Bird"},
	},
	archeops: {
		inherit: true,
		abilities: {0: "Defeatist", 1: "Aerodynamism", H: "Early Bird"},
	},
	tyrunt: {
		inherit: true,
		abilities: {0: "Strong Jaw", 1: "Early Bird", H: "Sturdy"},
	},
	tyrantrum: {
		inherit: true,
		abilities: {0: "Strong Jaw", 1: "Early Bird", H: "Rock Head"},
	},
	// Comatose
	slowbro: {
		inherit: true,
		abilities: {0: "Oblivious", 1: "Comatose", H: "Regenerator"},
	},
	slowbrogalar: {
		inherit: true,
		abilities: {0: "Quick Draw", 1: "Comatose", H: "Regenerator"},
	},
	snorlax: {
		inherit: true,
		abilities: {0: "Comatose", 1: "Thick Fat", H: "Gluttony"},
	},
	shiinotic: {
		inherit: true,
		abilities: {0: "Illuminate", 1: "Effect Spore", H: "Comatose"},
	},
	corsolagalar: {
		inherit: true,
		abilities: {0: "Deliquesce", 1: "Comatose", H: "Cursed Body"},
	},
	cursola: {
		inherit: true,
		abilities: {0: "Deliquesce", 1: "Comatose", H: "Perish Body"},
	},
	jirachi: {
		inherit: true,
		abilities: {0: "Serene Grace", 1: "Moody", H: "Light Metal"},
	},
	cresselia: {
		inherit: true,
		abilities: {0: "Levitate", H: "Comatose"},
	},
	darkrai: {
		inherit: true,
		abilities: {0: "Bad Dreams", 1: "Evanesce", H: "Comatose"},
	},
	// Wind Power
	pelipper: {
		inherit: true,
		abilities: {0: "Wind Power", 1: "Drizzle", H: "Rain Dish"},
	},
	masquerain: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Wind Power", H: "Deliquesce"},
	},
	toedscruel: {
		inherit: true,
		abilities: {0: "Mycelium Might", H: "Wind Power"},
	},
	tornadus: {
		inherit: true,
		abilities: {0: "Prankster", H: "Wind Power"},
	},
	thundurus: {
		inherit: true,
		abilities: {0: "Prankster", H: "Wind Power"},
	},
	braviaryhisui: {
		inherit: true,
		abilities: {0: "Wind Power", 1: "Sheer Force", H: "Tinted Lens"},
	},
	cottonee: {
		inherit: true,
		abilities: {0: "Prankster", 1: "Wind Power", H: "Cotton Down"},
	},
	whimsicott: {
		inherit: true,
		abilities: {0: "Prankster", 1: "Wind Power", H: "Cotton Down"},
	},
	// Wind Rider
	braviary: {
		inherit: true,
		abilities: {0: "Wind Rider", 1: "Sheer Force", H: "Defiant"},
	},
	leavanny: {
		inherit: true,
		abilities: {0: "Swarm", 1: "Chlorophyll", H: "Wind Rider"},
	},
	carnivine: {
		inherit: true,
		abilities: {0: "Levitate", H: "Wind Rider"},
	},
	flapple: {
		inherit: true,
		abilities: {0: "Ripen", 1: "Wind Rider", H: "Hustle"},
	},
	zubat: {
		inherit: true,
		abilities: {0: "Inner Focus", 1: "Wind Rider", H: "Infiltrator"},
	},
	golbat: {
		inherit: true,
		abilities: {0: "Inner Focus", 1: "Wind Rider", H: "Infiltrator"},
	},
	crobat: {
		inherit: true,
		abilities: {0: "Inner Focus", 1: "Wind Rider", H: "Infiltrator"},
	},
	dragonite: {
		inherit: true,
		abilities: {0: "Inner Focus", 1: "Wind Rider", H: "Multiscale"},
	},
	landorus: {
		inherit: true,
		abilities: {0: "Sand Force", H: "Wind Rider"},
	},
	hoppip: {
		inherit: true,
		abilities: {0: "Wind Rider", 1: "Cotton Down", H: "Infiltrator"}, 
	},
	skiploom: {
		inherit: true,
		abilities: {0: "Wind Rider", 1: "Cotton Down", H: "Infiltrator"}, 
	},
	jumpluff: {
		inherit: true,
		abilities: {0: "Wind Rider", 1: "Cotton Down", H: "Infiltrator"}, 
	},

	// Slate 4
	haxorus: {
		inherit: true,
		types: ["Dragon", "Steel"],
		abilities: {0: "No Guard", 1: "Mold Breaker", H: "Emergency Exit"},
	},
	drapion: {
		inherit: true,
		abilities: {0: "Tough Claws", 1: "Sniper", H: "Sand Rush"},
	},
	shaymin: {
		inherit: true,
		types: ["Grass", "Ground"],
		abilities: {0: "Poison Heal", 1: "Moody", H: "Solar Power"},
	},
	shayminsky: {
		inherit: true,
		abilities: {0: "Aerodynamism", 1: "Wind Power", H: "Solar Power"},
	},
	goodra: {
		inherit: true,
		types: ["Dragon", "Water"],
		abilities: {0: "Sap Sipper", 1: "Poison Heal", H: "Gooey"},
	},
	golisopod: {
		inherit: true,
		abilities: {0: "Emergency Exit", 1: "Shell Armor", H: "Regenerator"},
	},	
	// Merciless
	houndour: {
		inherit: true,
		abilities: {0: "Nostalgia Trip", 1: "Flash Fire", H: "Merciless"},
	},
	houndoom: {
		inherit: true,
		abilities: {0: "Nostalgia Trip", 1: "Flash Fire", H: "Merciless"},
	},
	pinsir: {
		inherit: true,
		abilities: {0: "Hyper Cutter", 1: "Merciless", H: "Moxie"},
	},
	corphish: {
		inherit: true,
		abilities: {0: "Hyper Cutter", 1: "Merciless", H: "Adaptability"},
	},
	crawdaunt: {
		inherit: true,
		abilities: {0: "Hyper Cutter", 1: "Merciless", H: "Adaptability"},
	},
	brutebonnet: {
		inherit: true,
		abilities: {0: "Protosynthesis", H: "Merciless"},
	},
	pancham: {
		inherit: true,
		abilities: {0: "Iron Fist", 1: "Merciless", H: "Scrappy"},
	},
	pangoro: {
		inherit: true,
		abilities: {0: "Iron Fist", 1: "Merciless", H: "Scrappy"},
	},
	shinx: {
		inherit: true,
		abilities: {0: "Merciless", 1: "Intimidate", H: "Guts"},
	},
	luxio: {
		inherit: true,
		abilities: {0: "Merciless", 1: "Intimidate", H: "Guts"},
	},
	luxray: {
		inherit: true,
		abilities: {0: "Merciless", 1: "Intimidate", H: "Guts"},
	},
	elekid: {
		inherit: true,
		abilities: {0: "Static", 1: "Merciless", H: "Vital Spirit"},
	},
	electabuzz: {
		inherit: true,
		abilities: {0: "Static", 1: "Merciless", H: "Vital Spirit"},
	},
	electivire: {
		inherit: true,
		abilities: {0: "Motor Drive", 1: "Merciless", H: "Vital Spirit"},
	},
	typhlosionhisui: {
		inherit: true,
		abilities: {0: "Blaze", H: "Merciless"},
	},
	duskull: {
		inherit: true,
		abilities: {0: "Levitate", 1: "Merciless", H: "Sinister Thoughts"},
	},
	dusclops: {
		inherit: true,
		abilities: {0: "Pressure", 1: "Merciless", H: "Sinister Thoughts"},
	},
	dusknoir: {
		inherit: true,
		abilities: {0: "Pressure", 1: "Merciless", H: "Sinister Thoughts"},
	},
	stunky: {
		inherit: true,
		abilities: {0: "Stench", 1: "Aftermath", H: "Merciless"},
	},
	skuntank: {
		inherit: true,
		abilities: {0: "Stench", 1: "Aftermath", H: "Merciless"},
	},
	// Deliquesce
	tadbulb: {
		inherit: true,
		abilities: {0: "Own Tempo", 1: "Static", H: "Deliquesce"},
	},
	bellibolt: {
		inherit: true,
		abilities: {0: "Electromorphosis", 1: "Static", H: "Deliquesce"},
	},
	dratini: {
		inherit: true,
		abilities: {0: "Shed Skin", 1: "Deliquesce", H: "Marvel Scale"},
	},
	dragonair: {
		inherit: true,
		abilities: {0: "Shed Skin", 1: "Deliquesce", H: "Marvel Scale"},
	},
	wooperpaldea: {
		inherit: true,
		abilities: {0: "Deliquesce", 1: "Water Absorb", H: "Unaware"},
	},
	clodsire: {
		inherit: true,
		abilities: {0: "Deliquesce", 1: "Water Absorb", H: "Unaware"},
	},
	stunfisk: {
		inherit: true,
		abilities: {0: "Static", 1: "Limber", H: "Deliquesce"},
	},
	stunfiskgalar: {
		inherit: true,
		abilities: {0: "Mimicry", H: "Deliquesce"},
	},
	dragalge: {
		inherit: true,
		abilities: {0: "Poison Point", 1: "Deliquesce", H: "Adaptability"},
	},
	clobbopus: {
		inherit: true,
		abilities: {0: "Limber", 1: "Deliquesce", H: "Technician"},
	},
	grapploct: {
		inherit: true,
		abilities: {0: "Limber", 1: "Deliquesce", H: "Technician"},
	},
	pincurchin: {
		inherit: true,
		abilities: {0: "Lightning Rod", 1: "Deliquesce", H: "Electric Surge"},
	},
	qwilfishhisui: {
		inherit: true,
		abilities: {0: "Deliquesce", 1: "Swift Swim", H: "Intimidate"},
	},
	overqwil: {
		inherit: true,
		abilities: {0: "Deliquesce", 1: "Swift Swim", H: "Intimidate"},
	},
	// Evanesce
	vulpix: {
		inherit: true,
		abilities: {0: "Flash Fire", 1: "Evanesce", H: "Drought"},
	},
	vulpixalola: {
		inherit: true,
		abilities: {0: "Snow Cloak", 1: "Evanesce", H: "Snow Warning"},
	},
	ninetales: {
		inherit: true,
		abilities: {0: "Flash Fire", 1: "Evanesce", H: "Drought"},
	},
	ninetalesalola: {
		inherit: true,
		abilities: {0: "Snow Cloak", 1: "Evanesce", H: "Snow Warning"},
	},
	tentacool: {
		inherit: true,
		abilities: {0: "Evanesce", 1: "Liquid Ooze", H: "Rain Dish"},
	},
	tentacruel: {
		inherit: true,
		abilities: {0: "Evanesce", 1: "Liquid Ooze", H: "Rain Dish"},
	},
	drowzee: {
		inherit: true,
		abilities: {0: "Insomnia", 1: "Sinister Thoughts", H: "Evanesce"},
	},
	hypno: {
		inherit: true,
		abilities: {0: "Insomnia", 1: "Sinister Thoughts", H: "Evanesce"},
	},
	lunatone: {
		inherit: true,
		abilities: {0: "Levitate", H: "Evanesce"},
	},
	glameow: {
		inherit: true,
		abilities: {0: "Limber", 1: "Evanesce", H: "Keen Eye"},
	},
	purugly: {
		inherit: true,
		abilities: {0: "Thick Fat", 1: "Evanesce", H: "Defiant"},
	},
	// Flouresce 
	porygon: {
		inherit: true,
		abilities: {0: "Trace", 1: "Download", H: "Flouresce"},
	},
	porygon2: {
		inherit: true,
		abilities: {0: "Trace", 1: "Download", H: "Flouresce"},
	},
	porygonz: {
		inherit: true,
		abilities: {0: "Adaptability", 1: "Download", H: "Flouresce"},
	},
	nosepass: {
		inherit: true,
		abilities: {0: "Sturdy", 1: "Magnet Pull", H: "Flouresce"},
	},
	probopass: {
		inherit: true,
		abilities: {0: "Sturdy", 1: "Magnet Pull", H: "Flouresce"},
	},
	staryu: {
		inherit: true,
		abilities: {0: "Flouresce", 1: "Natural Cure", H: "Analytic"},
	},
	starmie: {
		inherit: true,
		abilities: {0: "Flouresce", 1: "Natural Cure", H: "Analytic"},
	},
	// Indancesce 
	darumakagalar: {
		inherit: true,
		abilities: {0: "Hustle", 1: "Indancesce", H: "Inner Focus"},
	},
	darmanitangalar: {
		inherit: true,
		abilities: {0: "Gorilla Tactics", 1: "Indancesce", H: "Zen Mode"},
	},
	solrock: {
		inherit: true,
		abilities: {0: "Levitate", H: "Indancesce"},
	},
	pumpkaboo: {
		inherit: true,
		abilities: {0: "Pickup", 1: "Frisk", H: "Indancesce"},
	},
	pumpkaboosmall: {
		inherit: true,
		abilities: {0: "Pickup", 1: "Frisk", H: "Indancesce"},
	},
	pumpkaboolarge: {
		inherit: true,
		abilities: {0: "Pickup", 1: "Frisk", H: "Indancesce"},
	},
	pumpkaboosuper: {
		inherit: true,
		abilities: {0: "Pickup", 1: "Frisk", H: "Indancesce"},
	},
	gourgeist: {
		inherit: true,
		abilities: {0: "Pickup", 1: "Frisk", H: "Indancesce"},
	},
	gourgeistsmall: {
		inherit: true,
		abilities: {0: "Pickup", 1: "Frisk", H: "Indancesce"},
	},
	gourgeistlarge: {
		inherit: true,
		abilities: {0: "Pickup", 1: "Frisk", H: "Indancesce"},
	},
	gourgeistsuper: {
		inherit: true,
		abilities: {0: "Pickup", 1: "Frisk", H: "Indancesce"},
	},
	snubbull: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Indancesce", H: "Rattled"},
	},
	granbull: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Indancesce", H: "Rattled"},
	},
	// Quick Draw
	cacnea: {
		inherit: true,
		abilities: {0: "Sand Veil", 1: "Quick Draw", H: "Water Absorb"},
	},
	cacturne: {
		inherit: true,
		abilities: {0: "Sand Veil", 1: "Quick Draw", H: "Water Absorb"},
	},
	farfetchd: {
		inherit: true,
		abilities: {0: "Keen Eye", 1: "Quick Draw", H: "Defiant"},
	},
	farfetchdgalar: {
		inherit: true,
		abilities: {0: "Steadfast", 1: "Quick Draw", H: "Scrappy"},
	},
	sirfetchd: {
		inherit: true,
		abilities: {0: "Steadfast", 1: "Quick Draw", H: "Scrappy"},
	},
	karrablast: {
		inherit: true,
		abilities: {0: "Swarm", 1: "Shed Skin", H: "Quick Draw"},
	},
	escavalier: {
		inherit: true,
		abilities: {0: "Swarm", 1: "Shell Armor", H: "Quick Draw"},
	},
	oshawott: {
		inherit: true,
		abilities: {0: "Torrent", H: "Quick Draw"},
	},
	dewott: {
		inherit: true,
		abilities: {0: "Torrent", H: "Quick Draw"},
	},
	samurott: {
		inherit: true,
		abilities: {0: "Torrent", H: "Quick Draw"},
	},
	clauncher: {
		inherit: true,
		abilities: {0: "Mega Launcher", H: "Quick Draw"},
	},
	clawitzer: {
		inherit: true,
		abilities: {0: "Mega Launcher", H: "Quick Draw"},
	},
	vikavolt: {
		inherit: true,
		abilities: {0: "Levitate", H: "Quick Draw"},
	},
	squawkabillyblue: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Hustle", H: "Quick Draw"},
	},
	squawkabillyyellow: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Hustle", H: "Quick Draw"},
	},
	// Daredevil
	cyndaquil: {
		inherit: true,
		abilities: {0: "Blaze", H: "Daredevil"},
	},
	quilava: {
		inherit: true,
		abilities: {0: "Blaze", H: "Daredevil"},
	},
	typhlosion: {
		inherit: true,
		abilities: {0: "Blaze", H: "Daredevil"},
	},
	aerodactyl: {
		inherit: true,
		abilities: {0: "Rock Head", 1: "Daredevil", H: "Nostalgia Trip"},
	},
	lycanrocmidnight: {
		inherit: true,
		abilities: {0: "Daredevil", 1: "Vital Spirit", H: "No Guard"},
	},
	wattrel: {
		inherit: true,
		abilities: {0: "Wind Power", 1: "Volt Absorb", H: "Daredevil"},
	},
	kilowattrel: {
		inherit: true,
		abilities: {0: "Wind Power", 1: "Volt Absorb", H: "Daredevil"},
	},
	terrakion: {
		inherit: true,
		abilities: {0: "Justified", H: "Daredevil"},
	},

	// Light Metal
	celesteela: {
		inherit: true,
		abilities: {0: "Beast Boost", H: "Light Metal"},
	},
	gimmighoul: {
		inherit: true,
		abilities: {0: "Rattled", H: "Light Metal"},
	},
	gimmighoulroaming: {
		inherit: true,
		abilities: {0: "Run Away", H: "Light Metal"},
	},
	gholdengo: {
		inherit: true,
		abilities: {0: "Good as Gold", H: "Light Metal"},
	},
	ironcrown: {
		inherit: true,
		abilities: {0: "Quark Drive", H: "Light Metal"},
	},
	klefki: {
		inherit: true,
		abilities: {0: "Prankster", 1: "Light Metal", H: "Magician"},
	},
	// Heavy Metal
	melmetal: {
		inherit: true,
		abilities: {0: "Iron Fist", H: "Heavy Metal"},
	},
	// Soul-Heart
	phione: {
		inherit: true,
		abilities: {0: "Hydration", 1: "Moody", H: "Soul-Heart"},
	},
	manaphy: {
		inherit: true,
		abilities: {0: "Hydration", 1: "Moody", H: "Soul-Heart"},
	},
	woobat: {
		inherit: true,
		abilities: {0: "Unaware", 1: "Soul-Heart", H: "Simple"},
	},
	swoobat: {
		inherit: true,
		abilities: {0: "Unaware", 1: "Soul-Heart", H: "Simple"},
	},
	//slate 5
	pecharunt: {
		inherit: true,
		abilities: {0: "Poison Puppeteer", 1: "Stench", H: "Merciless"},
	},
	mantine: {
		inherit: true,
		abilities: {0: "Swift Swim", 1: "Water Absorb", H: "Unaware"},
	},
	greattusk: {
		inherit: true,
		abilities: {0: "Protosynthesis", H: "Rough Skin"},
	},
	ragingbolt: {
		inherit: true,
		abilities: {0: "Protosynthesis", H: "Pressure"},
	},
	sandyshocks: {
		inherit: true,
		abilities: {0: "Protosynthesis", H: "Solar Power"},
	},
	screamtail: {
		inherit: true,
		abilities: {0: "Protosynthesis", H: "Pixilate"},
	},
	fluttermane: {
		inherit: true,
		abilities: {0: "Protosynthesis", H: "Trace"},
	},
	roaringmoon: {
		inherit: true,
		abilities: {0: "Protosynthesis", H: "Infiltrator"},
	},
	walkingwake: {
		inherit: true,
		abilities: {0: "Protosynthesis", H: "Pressure"},
	},
	gougingfire: {
		inherit: true,
		abilities: {0: "Protosynthesis", H: "Pressure"},
	},
	ironvaliant: {
		inherit: true,
		abilities: {0: "Quark Drive", H: "Moody"},
	},
	ironboulder: {
		inherit: true,
		abilities: {0: "Quark Drive", H: "Sturdy"},
	},
	ironmoth: {
		inherit: true,
		abilities: {0: "Quark Drive", H: "Levitate"},
	},
	ironleaves: {
		inherit: true,
		abilities: {0: "Quark Drive", H: "Long Reach"},
	},
	ironjugulis: {
		inherit: true,
		abilities: {0: "Quark Drive", H: "Wind Power"},
	},
	ironthorns: {
		inherit: true,
		abilities: {0: "Quark Drive", H: "Earth Eater"},
	},
	ironbundle: {
		inherit: true,
		abilities: {0: "Quark Drive", H: "Tangled Feet"},
	},
	aegislashblade: {
		inherit: true,
		types: ["Fighting", "Ghost"],
	},
	// Moody
	uxie: {
		inherit: true,
		abilities: {0: "Levitate", H: "Moody"},
	},
	mesprit: {
		inherit: true,
		abilities: {0: "Levitate", H: "Moody"},
	},
	azelf: {
		inherit: true,
		abilities: {0: "Levitate", H: "Moody"},
	},
	victini: {
		inherit: true,
		abilities: {0: "Victory Star", 1: "Moody", H: "Pyre"},
	},
	kommoo: {
		inherit: true,
		abilities: {0: "Bulletproof", 1: "Soundproof", H: "Moody"},
	},
	// Sinister Thoughts
	guzzlord: {
		inherit: true,
		abilities: {0: "Beast Boost", H: "Sinister Thoughts"},
	},
	deino: {
		inherit: true,
		abilities: {0: "Hustle", 1: "Unconcerned", H: "Sinister Thoughts"},
	},
	zweilous: {
		inherit: true,
		abilities: {0: "Hustle", 1: "Unconcerned", H: "Sinister Thoughts"},
	},
	hydreigon: {
		inherit: true,
		abilities: {0: "Levitate", 1: "Unconcerned", H: "Sinister Thoughts"},
	},
	poochyena: {
		inherit: true,
		abilities: {0: "Run Away", 1: "Sinister Thoughts", H: "Rattled"},
	},
	mightyena: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Sinister Thoughts", H: "Moxie"},
	},
	spinarak: {
		inherit: true,
		abilities: {0: "Swarm", 1: "Sinister Thoughts", H: "Sniper"},
	},
	ariados: {
		inherit: true,
		abilities: {0: "Swarm", 1: "Sinister Thoughts", H: "Sniper"},
	},
	salandit: {
		inherit: true,
		abilities: {0: "Corrosion", 1: "Sinister Thoughts", H: "Oblivious"},
	},
	salazzle: {
		inherit: true,
		abilities: {0: "Corrosion", 1: "Sinister Thoughts", H: "Oblivious"},
	},
	// Middle Eight
	meloetta: {
		inherit: true,
		abilities: {0: "Serene Grace", H: "Middle Eight"},
	},
	meloettapirouette: {
		inherit: true,
		abilities: {0: "Serene Grace", H: "Middle Eight"},
	},
	// Slate 6 adjustments
	zeraora: {
		inherit: true,
		types: ["Electric", "Rock"],
		abilities: {0: "Volt Absorb", H: "Technician"},
	},
	hippowdon: {
		inherit: true,
		abilities: {0: "Sand Stream", 1: "Moody", H: "Sand Force"},
	},
	gengar: {
		inherit: true,
		abilities: {0: "Levitate"},
	},
	obstagoon: {
		inherit: true,
		abilities: {0: "Reckless", 1: "Guts", H: "Moody"},
	},
	// Parallel Mega Orb section
	venusaurmega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Venusaurite", "Parallel Mega Orb"],
	},
	charizardmegax: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Charizardite X", "Parallel Mega Orb"],
	},
	charizardmegay: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Charizardite Y", "Parallel Mega Orb"],
	},
	blastoisemega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Blastoisinite", "Parallel Mega Orb"],
	},
	beedrillmega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Beedrillite", "Parallel Mega Orb"],
	},
	pidgeotmega: {
		inherit: true,
		abilities: {0: "Aerodynamism"},
		requiredItem: null,
		requiredItems: ["Pidgeotite", "Parallel Mega Orb"],
	},
	alakazammega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Alakazite", "Parallel Mega Orb"],
	},
	slowbromega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Slowbronite", "Parallel Mega Orb"],
	},
	gengarmega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Gengarite", "Parallel Mega Orb"],
	},
	pinsirmega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Pinsirite", "Parallel Mega Orb"],
	},
	gyaradosmega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Gyaradosite", "Parallel Mega Orb"],
	},
	aerodactylmega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Aerodactylite", "Parallel Mega Orb"],
	},
	mewtwomegax: {
		inherit: true,
		abilities: {0: "Karate"},
		requiredItem: null,
		requiredItems: ["Mewtwonite X", "Parallel Mega Orb"],
	},
	mewtwomegay: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Mewtwonite Y", "Parallel Mega Orb"],
	},
	ampharosmega: {
		inherit: true,
		abilities: {0: "Cotton Down"},
		requiredItem: null,
		requiredItems: ["Ampharosite", "Parallel Mega Orb"],
	},
	scizormega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Scizorite", "Parallel Mega Orb"],
	},
	heracrossmega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Heracronite", "Parallel Mega Orb"],
	},
	houndoommega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Houndoominite", "Parallel Mega Orb"],
	},
	tyranitarmega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Tyranitarite", "Parallel Mega Orb"],
	},
	blazikenmega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Blazikenite", "Parallel Mega Orb"],
	},
	swampertmega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Swampertite", "Parallel Mega Orb"],
	},
	gardevoirmega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Gardevoirite", "Parallel Mega Orb"],
	},
	sableyemega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Sablenite", "Parallel Mega Orb"],
	},
	mawilemega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Mawilite", "Parallel Mega Orb"],
	},
	aggronmega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Aggronite", "Parallel Mega Orb"],
	},
	medichammega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Medichamite", "Parallel Mega Orb"],
	},
	sharpedomega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Sharpedonite", "Parallel Mega Orb"],
	},
	cameruptmega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Cameruptite", "Parallel Mega Orb"],
	},
	glaliemega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Glalitite", "Parallel Mega Orb"],
	},
	salamencemega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Salamencite", "Parallel Mega Orb"],
	},
	metagrossmega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Metagrossite", "Parallel Mega Orb"],
	},
	latiasmega: {
		inherit: true,
		abilities: {0: "Moody"},
		requiredItem: null,
		requiredItems: ["Latiasite", "Parallel Mega Orb"],
	},
	latiosmega: {
		inherit: true,
		abilities: {0: "Moody"},
		requiredItem: null,
		requiredItems: ["Latiosite", "Parallel Mega Orb"],
	},
	rayquazamega: {
		inherit: true,
		requiredItem: "Parallel Mega Orb",
	},
	lopunnymega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Lopunnite", "Parallel Mega Orb"],
	},
	garchompmega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Garchompite", "Parallel Mega Orb"],
	},
	lucariomega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Lucarionite", "Parallel Mega Orb"],
	},
	abomasnowmega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Abomasite", "Parallel Mega Orb"],
	},
	gallademega: {
		inherit: true,
		abilities: {0: "Stalwart"},
		requiredItem: null,
		requiredItems: ["Galladite", "Parallel Mega Orb"],
	},
	audinomega: {
		inherit: true,
		abilities: {0: "Hospitality"},
		requiredItem: null,
		requiredItems: ["Audinite", "Parallel Mega Orb"],
	},
	dianciemega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Diancite", "Parallel Mega Orb"],
	},
	// Aerodynamism
	tornadustherian: {
		inherit: true,
		abilities: {0: "Regenerator", H: "Aerodynamism"},
	},
	thundurustherian: {
		inherit: true,
		abilities: {0: "Volt Absorb", H: "Aerodynamism"},
	},
	landorustherian: {
		inherit: true,
		abilities: {0: "Intimidate", H: "Aerodynamism"},
	},
	// Pyre
	charcadet: {
		inherit: true,
		abilities: {0: "Flash Fire", 1: "Pyre", H: "Flame Body"},
	},
	armarouge: {
		inherit: true,
		abilities: {0: "Flash Fire", 1: "Pyre", H: "Weak Armor"},
	},
	ceruledge: {
		inherit: true,
		abilities: {0: "Flash Fire", 1: "Pyre", H: "Weak Armor"},
	},
	heatran: {
		inherit: true,
		abilities: {0: "Flash Fire", 1: "Pyre", H: "Flame Body"},
	},
	marowakalola: {
		inherit: true,
		abilities: {0: "Pyre", 1: "Lightning Rod", H: "Rock Head"},
	},
	litwick: {
		inherit: true,
		abilities: {0: "Flash Fire", 1: "Pyre", H: "Infiltrator"},
	},
	lampent: {
		inherit: true,
		abilities: {0: "Flash Fire", 1: "Pyre", H: "Infiltrator"},
	},
	chandelure: {
		inherit: true,
		abilities: {0: "Flash Fire", 1: "Pyre", H: "Infiltrator"},
	},
	// Forewarn
	fennekin: {
		inherit: true,
		abilities: {0: "Blaze", H: "Forewarn"},
	},
	braixen: {
		inherit: true,
		abilities: {0: "Blaze", H: "Forewarn"},
	},
	delphox: {
		inherit: true,
		abilities: {0: "Blaze", H: "Forewarn"},
	},
	smoochum: {
		inherit: true,
		abilities: {0: "Oblivious", 1: "Run It Back", H: "Hydration"},
	},
	jynx: {
		inherit: true,
		abilities: {0: "Run It Back", 1: "Forewarn", H: "Dry Skin"},
	},
	gothita: {
		inherit: true,
		abilities: {0: "Forewarn", 1: "Competitive", H: "Shadow Tag"},
	},
	gothorita: {
		inherit: true,
		abilities: {0: "Forewarn", 1: "Competitive", H: "Shadow Tag"},
	},
	gothitelle: {
		inherit: true,
		abilities: {0: "Forewarn", 1: "Competitive", H: "Shadow Tag"},
	},
	munkidori: {
		inherit: true,
		abilities: {0: "Toxic Chain", H: "Forewarn"},
	},
	ralts: {
		inherit: true,
		abilities: {0: "Synchronize", 1: "Trace", H: "Forewarn"},
	},
	kirlia: {
		inherit: true,
		abilities: {0: "Synchronize", 1: "Trace", H: "Forewarn"},
	},
	gardevoir: {
		inherit: true,
		abilities: {0: "Synchronize", 1: "Trace", H: "Forewarn"},
	},
	natu: {
		inherit: true,
		abilities: {0: "Forewarn", 1: "Early Bird", H: "Magic Bounce"},
	},
	xatu: {
		inherit: true,
		abilities: {0: "Forewarn", 1: "Early Bird", H: "Magic Bounce"},
	},
	// Sniper
	thievul: {
		inherit: true,
		abilities: {0: "Sniper", 1: "Unburden", H: "Stakeout"},
	},
	veluza: {
		inherit: true,
		abilities: {0: "Mold Breaker", 1: "Sniper", H: "Sharpness"},
	},
	zapdosgalar: {
		inherit: true,
		abilities: {0: "Defiant", H: "Sniper"},
	},
	// Unconcerned
	chimchar: {
		inherit: true,
		abilities: {0: "Blaze", H: "Unconcerned"},
	},
	monferno: {
		inherit: true,
		abilities: {0: "Blaze", H: "Unconcerned"},
	},
	infernape: {
		inherit: true,
		abilities: {0: "Blaze", H: "Unconcerned"},
	},
	litleo: {
		inherit: true,
		abilities: {0: "Unconcerned", 1: "Unnerve", H: "Moxie"},
	},
	pyroar: {
		inherit: true,
		abilities: {0: "Unconcerned", 1: "Unnerve", H: "Moxie"},
	},
	falinks: {
		inherit: true,
		abilities: {0: "Battle Armor", 1: "Unconcerned", H: "Defiant"},
	},
	throh: {
		inherit: true,
		abilities: {0: "Unconcerned", 1: "Inner Focus", H: "Mold Breaker"},
	},
	crabrawler: {
		inherit: true,
		abilities: {0: "Unconcerned", 1: "Iron Fist", H: "Anger Point"},
	},
	crabominable: {
		inherit: true,
		abilities: {0: "Unconcerned", 1: "Iron Fist", H: "Anger Point"},
	},
	makuhita: {
		inherit: true,
		abilities: {0: "Thick Fat", 1: "Guts", H: "Unconcerned"},
	},
	hariyama: {
		inherit: true,
		abilities: {0: "Thick Fat", 1: "Guts", H: "Unconcerned"},
	},
	// making the pikachu forms have unreleased hiddens in a similar fashion as silvally
	pikachu: {
		inherit: true,
		abilities: {0: "Static", 1: "Lightning Rod", H: "Tough Claws"},
		unreleasedHidden: true,
	},
	pikachuoriginal: {
		inherit: true,
		abilities: {0: "Static", 1: "Lightning Rod", H: "Run It Back"},
		unreleasedHidden: true,
	},
	pikachuhoenn: {
		inherit: true,
		abilities: {0: "Static", 1: "Lightning Rod", H: "Technician"},
		unreleasedHidden: true,
	},
	pikachusinnoh: {
		inherit: true,
		abilities: {0: "Static", 1: "Lightning Rod", H: "No Guard"},
		unreleasedHidden: true,
	},
	pikachuunova: {
		inherit: true,
		abilities: {0: "Static", 1: "Lightning Rod", H: "Intimidate"},
		unreleasedHidden: true,
	},
	pikachukalos: {
		inherit: true,
		abilities: {0: "Static", 1: "Lightning Rod", H: "Mold Breaker"},
		unreleasedHidden: true,
	},
	pikachualola: {
		inherit: true,
		abilities: {0: "Static", 1: "Lightning Rod", H: "Psychic Surge"},
		unreleasedHidden: true,
	},
	pikachuworld: {
		inherit: true,
		abilities: {0: "Static", 1: "Lightning Rod", H: "Aerilate"},
		unreleasedHidden: true,
	},
	// Slate 7 adjustments
	nihilego: {
		inherit: true,
		abilities: {0: "Beast Boost", H: "Tinted Lens"},
	},
	tangrowth: {
		inherit: true,
		types: ["Grass", "Water"],
		abilities: {0: "Stamina", 1: "Long Reach", H: "Regenerator"},
	},
	altaria: {
		inherit: true,
		abilities: {0: "Natural Cure", 1: "Fluffy", H: "Cotton Down"},
	},
	altariamega: {
		inherit: true,
		requiredItem: null,
		requiredItems: ["Altarianite", "Parallel Mega Orb"],
	},
	bewear: {
		inherit: true,
		abilities: {0: "Fluffy", 1: "Triage", H: "Unnerve"},
	},
	volcanion: {
		inherit: true,
		abilities: {0: "Water Absorb", 1: "Route Closed", H: "Moody"},
	},
	// Stalwart
	kingambit: {
		inherit: true,
		abilities: {0: "Defiant", 1: "Supreme Overlord", H: "Stalwart"},
	},
	cobalion: {
		inherit: true,
		abilities: {0: "Justified", H: "Stalwart"},
	},
	virizion: {
		inherit: true,
		abilities: {0: "Justified", H: "Stalwart"},
	},
	keldeo: {
		inherit: true,
		abilities: {0: "Justified", H: "Stalwart"},
	},
	keldeoresolute: {
		inherit: true,
		abilities: {0: "Justified", H: "Stalwart"},
	},
	ampharos: {
		inherit: true,
		abilities: {0: "Static", H: "Stalwart"},
	},
	// Super Luck
	ogerpon: {
		inherit: true,
		abilities: {0: "Defiant", H: "Super Luck"},
	},
	// Stench
	foongus: {
		inherit: true,
		abilities: {0: "Effect Spore", 1: "Stench",  H: "Regenerator"},
	},
	amoonguss: {
		inherit: true,
		abilities: {0: "Effect Spore", 1: "Stench",  H: "Regenerator"},
	},
	// Nostalgia Trip
	abra: {
		inherit: true,
		abilities: {0: "Synchronize", 1: "Nostalgia Trip", H: "Magic Guard"},
	},
	kadabra: {
		inherit: true,
		abilities: {0: "Synchronize", 1: "Nostalgia Trip", H: "Magic Guard"},
	},
	alakazam: {
		inherit: true,
		abilities: {0: "Synchronize", 1: "Nostalgia Trip", H: "Magic Guard"},
	},
	bagon: {
		inherit: true,
		abilities: {0: "Rock Head", 1: "Nostalgia Trip", H: "Sheer Force"},
	},
	shelgon: {
		inherit: true,
		abilities: {0: "Rock Head", 1: "Nostalgia Trip", H: "Overcoat"},
	},
	salamence: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Nostalgia Trip", H: "Moxie"},
	},
	cherrimsunshine: {
		inherit: true,
		types: ["Grass", "Fire"]
	},
	// Slate 8
	banette: {
		inherit: true,
		types: ["Ghost", "Normal"],
		abilities: {0: "Insomnia", 1: "Frisk", H: "Run It Back"},
	},
	banettemega: {
		inherit: true,
		types: ["Ghost", "Fighting"],
		requiredItem: null,
		requiredItems: ["Banettite", "Parallel Mega Orb"],
	},
	absol: {
		inherit: true,
		types: ["Dark", "Fairy"],
		abilities: {0: "Anticipation", 1: "Forewarn", H: "Super Luck"},
	},
	absolmega: {
		inherit: true,
		types: ["Dark", "Fairy"],
		requiredItem: null,
		requiredItems: ["Absolite", "Parallel Mega Orb"],
	},
	kangaskhan: {
		inherit: true,
		types: ["Normal", "Ground"],
		abilities: {0: "Early Bird", 1: "Sap Sipper", H: "Thick Fat"},
	},
	kangaskhanmega: {
		inherit: true,
		types: ["Normal", "Ground"],
		requiredItem: null,
		requiredItems: ["Kangaskhanite", "Parallel Mega Orb"],
	},
	togekiss: {
		inherit: true,
		abilities: {0: "Thick Fat", 1: "Serene Grace", H: "Super Luck"},
	},
	mew: {
		inherit: true,
		abilities: {0: "Trace", 1: "Moody", H: "Protean"},
	},
	mandibuzz: {
		inherit: true,
		abilities: {0: "Overcoat", 1: "Prankster", H: "Route Closed"},
	},
	regirock: {
		inherit: true,
		abilities: {0: "Clear Body", 1: "Sturdy", H: "Solid Rock"},
	},
	regice: {
		inherit: true,
		abilities: {0: "Clear Body", 1: "Ice Body", H: "Refrigerate"},
	},
	registeel: {
		inherit: true,
		abilities: {0: "Clear Body", 1: "Light Metal", H: "Heavy Metal"},
	},
	regigigas: {
		inherit: true,
		abilities: {0: "Clear Body", 1: "Normalize", H: "Slow Start"},
	},
	regieleki: {
		inherit: true,
		abilities: {0: "Clear Body", 1: "Galvanize", H: "Transistor"},
	},
	regidrago: {
		inherit: true,
		abilities: {0: "Clear Body", 1: "Pressure", H: "Dragon's Maw"},
	},
	// Karate
	sawk: {
		inherit: true,
		abilities: {0: "Karate", 1: "Inner Focus", H: "Mold Breaker"},
	},
	machamp: {
		inherit: true,
		abilities: {0: "Guts", 1: "No Guard", H: "Karate"},
	},
	riolu: {
		inherit: true,
		abilities: {0: "Karate", 1: "Inner Focus", H: "Prankster"},
	},
	lucario: {
		inherit: true,
		abilities: {0: "Karate", 1: "Inner Focus", H: "Justified"},
	},
	// Keep Cool
	articunogalar: {
		inherit: true,
		abilities: {0: "Competitive", H: "Keep Cool"},
	},
	zorua: {
		inherit: true,
		abilities: {0: "Illusion", H: "Keep Cool"},
	},
	zoruahisui: {
		inherit: true,
		abilities: {0: "Illusion", H: "Keep Cool"},
	},
	zoroark: {
		inherit: true,
		abilities: {0: "Illusion", H: "Keep Cool"},
	},
	zoroarkhisui: {
		inherit: true,
		abilities: {0: "Illusion", H: "Keep Cool"},
	},
	drampa: {
		inherit: true,
		abilities: {0: "Berserk", 1: "Keep Cool", H: "Cotton Down"},
	},
	maractus: {
		inherit: true,
		abilities: {0: "Keep Cool", 1: "Chlorophyll", H: "Storm Drain"},
	},
	mismagius: {
		inherit: true,
		abilities: {0: "Levitate", H: "Keep Cool"},
	},
	// Cotton Down
	buneary: {
		inherit: true,
		abilities: {0: "Run Away", 1: "Cotton Down", H: "Limber"},
	},
	lopunny: {
		inherit: true,
		abilities: {0: "Cute Charm", 1: "Cotton Down", H: "Limber"},
	},
	swirlix: {
		inherit: true,
		abilities: {0: "Sweet Veil", 1: "Cotton Down", H: "Unburden"},
	},
	slurpuff: {
		inherit: true,
		abilities: {0: "Sweet Veil", 1: "Cotton Down", H: "Unburden"},
	},
	bouffalant: {
		inherit: true,
		abilities: {0: "Reckless", 1: "Sap Sipper", H: "Cotton Down"},
	},
	// Ice Body
	abomasnow: {
		inherit: true,
		abilities: {0: "Snow Warning", 1: "Ice Body", H: "Soundproof"},
	},
	mamoswine: {
		inherit: true,
		abilities: {0: "Oblivious", 1: "Ice Body", H: "Thick Fat"},
	},
	glastrier: {
		inherit: true,
		abilities: {0: "Chilling Neigh", H: "Ice Body"},
	},
};
