export const Pokedex: {[speciesid: string]: ModdedSpeciesData} = {
	screamtail: {
		inherit: true,
		types: ["Fairy", "Dragon"],
		abilities: {0: "Protosmosis", H: "Cute Charm"},
	},
	crabominable: {
		inherit: true,
		types: ["Fighting", "Water"],
		abilities: {0: "Fur Coat", 1: "Iron Fist", H: "Snow Cloak"},
	},
	mareanie: {
		inherit: true,
		abilities: {0: "Battle Spines", 1: "Merciless", H: "Regenerator"},
	},
	toxapex: {
		inherit: true,
		types: ["Dark", "Water"],
		abilities: {0: "Battle Spines", 1: "Merciless", H: "Regenerator"},
	},
	revavroom: {
		inherit: true,
		otherFormes: ["Revavroom-Segin", "Revavroom-Schedar", "Revavroom-Navi", "Revavroom-Ruchbah", "Revavroom-Caph"],
		formeOrder: ["Revavroom", "Revavroom-Segin", "Revavroom-Schedar", "Revavroom-Navi", "Revavroom-Ruchbah", "Revavroom-Caph"],
	},
	revavroomsegin: {
		num: 966,
		name: "Revavroom-Segin",
		baseSpecies: "Revavroom",
		forme: "Segin",
		types: ["Dark"],
		gender: "N",
		baseStats: {hp: 80, atk: 119, def: 90, spa: 54, spd: 67, spe: 90},
		abilities: {0: "Intimidate"},
		heightm: 1.8,
		weightkg: 120,
		color: "Gray",
		eggGroups: ["Mineral"],
		requiredItem: "Segin Star Shard",
		battleOnly: "Revavroom",
	},
	revavroomschedar: {
		num: 966,
		name: "Revavroom-Schedar",
		baseSpecies: "Revavroom",
		forme: "Schedar",
		types: ["Fire"],
		gender: "N",
		baseStats: {hp: 80, atk: 119, def: 90, spa: 54, spd: 67, spe: 90},
		abilities: {0: "Speed Boost"},
		heightm: 1.8,
		weightkg: 120,
		color: "Gray",
		eggGroups: ["Mineral"],
		requiredItem: "Schedar Star Shard",
		battleOnly: "Revavroom",
	},
	revavroomnavi: {
		num: 966,
		name: "Revavroom-Navi",
		baseSpecies: "Revavroom",
		forme: "Navi",
		types: ["Poison"],
		gender: "N",
		baseStats: {hp: 80, atk: 119, def: 90, spa: 54, spd: 67, spe: 90},
		abilities: {0: "Toxic Debris"},
		heightm: 1.8,
		weightkg: 120,
		color: "Gray",
		eggGroups: ["Mineral"],
		requiredItem: "Navi Star Shard",
		battleOnly: "Revavroom",
	},
	revavroomruchbah: {
		num: 966,
		name: "Revavroom-Ruchbah",
		baseSpecies: "Revavroom",
		forme: "Ruchbah",
		types: ["Fairy"],
		gender: "N",
		baseStats: {hp: 80, atk: 119, def: 90, spa: 54, spd: 67, spe: 90},
		abilities: {0: "Misty Surge"},
		heightm: 1.8,
		weightkg: 120,
		color: "Gray",
		eggGroups: ["Mineral"],
		requiredItem: "Ruchbah Star Shard",
		battleOnly: "Revavroom",
	},
	revavroomcaph: {
		num: 966,
		name: "Revavroom-Caph",
		baseSpecies: "Revavroom",
		forme: "Ruchbah",
		types: ["Fighting"],
		gender: "N",
		baseStats: {hp: 80, atk: 119, def: 90, spa: 54, spd: 67, spe: 90},
		abilities: {0: "Stamina"},
		heightm: 1.8,
		weightkg: 120,
		color: "Gray",
		eggGroups: ["Mineral"],
		requiredItem: "Caph Star Shard",
		battleOnly: "Revavroom",
	},
	donphan: {
		inherit: true,
		abilities: {0: "Sturdy", 1: "Overcoat", H: "Sand Veil"},
	},
	avalugg: {
		inherit: true,
		abilities: {0: "Overcoat", 1: "Ice Body", H: "Sturdy"},
	},
	vespiquen: {
		inherit: true,
		types: ["Poison", "Flying"],
		abilities: {0: "Intimidate", 1: "Cute Charm", H: "Supreme Overlord"},
	},
	misdreavus: {
		inherit: true,
		abilities: {0: "Levitate", 1: "Death Aura"},
	},
	mismagius: {
		inherit: true,
		abilities: {0: "Levitate", 1: "Death Aura", H: "Cute Charm"},
	},
	floette: {
		inherit: true,
		abilities: {0: "Flower Veil", 1: "Healer", H: "Symbiosis"},
	},
	flabebe: {
		inherit: true,
		abilities: {0: "Flower Veil", 1: "Healer", H: "Symbiosis"},
	},
	florges: {
		inherit: true,
		abilities: {0: "Grass Pelt", 1: "Healer", H: "Symbiosis"},
	},
	oranguru: {
		inherit: true,
		abilities: {0: "Counteract", 1: "Healer", H: "Symbiosis"},
	},
	passimian: {
		inherit: true,
		abilities: {0: "Receiver", 1: "Counteract", H: "Defiant"},
	},
	petilil: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Sheer Heart", H: "Healer"},
	},
	lilligant: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Sheer Heart", H: "Healer"},
	},
	lilliganthisui: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Hustle", H: "Healer"},
	},
	ralts: {
		inherit: true,
		abilities: {0: "Synchronize", 1: "Trace", H: "Healer"},
	},
	kirlia: {
		inherit: true,
		abilities: {0: "Synchronize", 1: "Trace", H: "Healer"},
	},
	gardevoir: {
		inherit: true,
		abilities: {0: "Synchronize", 1: "Trace", H: "Healer"},
	},
	indeedee: {
		inherit: true,
		abilities: {0: "Healer", 1: "Synchronize", H: "Psychic Surge"},
	},
	indeedeef: {
		inherit: true,
		abilities: {0: "Healer", 1: "Synchronize", H: "Psychic Surge"},
	},
	magearna: {
		inherit: true,
		abilities: {0: "Soul-Heart", H: "Healer"},
	},
	mesprit: {
		inherit: true,
		abilities: {0: "Levitate", H: "Healer"},
	},
	bellibolt: {
		inherit: true,
		types: ["Electric", "Water"],
		abilities: {0: "Electromorphosis", 1: "Static", H: "Volt Absorb"},
	},
	decidueye: {
		inherit: true,
		abilities: {0: "Overgrow", H: "Contrary"},
	},
	decidueyehisui: {
		inherit: true,
		types: ["Ghost", "Fighting"],
		abilities: {0: "Overgrow", H: "Scrappy"},
	},
	magnemite: {
		inherit: true,
		abilities: {0: "Magnet Pull", 1: "Levitate", H: "Analytic"},
	},
	magneton: {
		inherit: true,
		abilities: {0: "Magnet Pull", 1: "Levitate", H: "Analytic"},
	},
	magnezone: {
		inherit: true,
		abilities: {0: "Magnet Pull", 1: "Levitate", H: "Analytic"},
	},
	greattusk: {
		inherit: true,
		abilities: {0: "Protocrysalis"},
	},
	sandyshocks: {
		inherit: true,
		abilities: {0: "Protocrysalis", H: "Sand Spit"},
	},
	fluttermane: {
		inherit: true,
		abilities: {0: "Protostasis"},
	},
	brutebonnet: {
		inherit: true,
		abilities: {0: "Protosmosis", H: "Seed Sower"},
	},
	irontreads: {
		inherit: true,
		abilities: {0: "Rune Drive"},
	},
	ironbundle: {
		inherit: true,
		abilities: {0: "Neuron Drive"},
	},
	ironhands: {
		inherit: true,
		abilities: {0: "Photon Drive"},
	},
	ironjugulis: {
		inherit: true,
		abilities: {0: "Neuron Drive", H: "Mega Launcher"},
	},
	ironmoth: {
		inherit: true,
		abilities: {0: "Photon Drive"},
	},
	roaringmoon: {
		inherit: true,
		abilities: {0: "Protostasis"},
	},
	ironvaliant: {
		inherit: true,
		abilities: {0: "Rune Drive", H: "Outclass"},
	},
	arboliva: {
		inherit: true,
		abilities: {0: "Seed Sower", 1: "Grass Pelt", H: "Harvest"},
	},
	squawkabillyyellow: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Hustle", H: "Gale Wings"},
	},
	squawkabillywhite: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Hustle", H: "Gale Wings"},
	},
	calyrex: {
		inherit: true,
		abilities: {0: "Unnerve", H: "Grass Pelt"},
	},
	swablu: {
		inherit: true,
		abilities: {0: "Natural Cure", 1: "Gale Wings", H: "Sheer Heart"},
	},
	altaria: {
		inherit: true,
		abilities: {0: "Natural Cure", 1: "Gale Wings", H: "Sheer Heart"},
	},
	tropius: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Gale Wings", H: "Harvest"},
	},
	articuno: {
		inherit: true,
		abilities: {0: "Pressure", 1: "Gale Wings", H: "Snow Cloak"},
	},
	rotomfan: {
		inherit: true,
		abilities: {0: "Levitate", H: "Gale Wings"},
	},
	rotomheat: {
		inherit: true,
		abilities: {0: "Levitate", H: "Smelt"},
	},
	bombirdier: {
		inherit: true,
		abilities: {0: "Big Pecks", 1: "Gale Wings", H: "Rocky Payload"},
	},
	oricorio: {
		inherit: true,
		types: ["Fighting", "Flying"],
		abilities: {0: "Dancer", 1: "Muscle Memory", H: "Scrappy"},
	},
	oricoriopau: {
		inherit: true,
		types: ["Fairy", "Flying"],
		abilities: {0: "Dancer", 1: "Muscle Memory", H: "Fairy Aura"},
	},
	oricoriopompom: {
		inherit: true,
		abilities: {0: "Dancer", 1: "Muscle Memory", H: "Fluffy"},
	},
	oricoriosensu: {
		inherit: true,
		abilities: {0: "Dancer", 1: "Muscle Memory", H: "Death Aura"},
	},
	hydreigon: {
		inherit: true,
		abilities: {0: "Levitate", H: "Muscle Memory"},
	},
	jolteon: {
		inherit: true,
		abilities: {0: "Volt Absorb", H: "Muscle Memory"},
	},
	flamigo: {
		inherit: true,
		abilities: {0: "Scrappy", 1: "Muscle Memory", H: "Costar"},
	},
	meloetta: {
		inherit: true,
		types: ["Psychic", "Fighting"],
		abilities: {0: "Trace", H: "Muscle Memory"},
	},
	meloettapirouette: {
		inherit: true,
		abilities: {0: "No Guard", H: "Muscle Memory"},
	},
	landorus: {
		inherit: true,
		abilities: {0: "Sand Force", H: "Cloud Nine"},
	},
	hoppip: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Cloud Nine", H: "Infiltrator"},
	},
	skiploom: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Cloud Nine", H: "Infiltrator"},
	},
	jumpluff: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Cloud Nine", H: "Infiltrator"},
	},
	lycanroc: {
		inherit: true,
		abilities: {0: "Keen Eye", 1: "Sand Rush", H: "Cloud Nine"},
	},
	igglybuff: {
		inherit: true,
		abilities: {0: "Cute Charm", 1: "Competitive", H: "Cloud Nine"},
	},
	jigglypuff: {
		inherit: true,
		abilities: {0: "Cute Charm", 1: "Competitive", H: "Cloud Nine"},
	},
	wigglytuff: {
		inherit: true,
		abilities: {0: "Cute Charm", 1: "Competitive", H: "Cloud Nine"},
	},
	dudunsparce: {
		inherit: true,
		abilities: {0: "Serene Grace", 1: "Cloud Nine", H: "Rattled"},
	},
	dudunsparcethreesegment: {
		inherit: true,
		abilities: {0: "Serene Grace", 1: "Cloud Nine", H: "Rattled"},
	},
	cacnea: {
		inherit: true,
		abilities: {0: "Battle Spines", H: "Water Absorb"},
	},
	cacturne: {
		inherit: true,
		abilities: {0: "Battle Spines", 1: "Sand Force", H: "Water Absorb"},
	},
	gible: {
		inherit: true,
		abilities: {0: "Sand Veil", 1: "Sand Force", H: "Rough Skin"},
	},
	gabite: {
		inherit: true,
		abilities: {0: "Sand Veil", 1: "Sand Force", H: "Rough Skin"},
	},
	garchomp: {
		inherit: true,
		abilities: {0: "Sand Veil", 1: "Sand Force", H: "Rough Skin"},
	},
	lycanrocmidnight: {
		inherit: true,
		abilities: {0: "Keen Eye", 1: "Sand Force", H: "No Guard"},
	},
	typhlosionhisui: {
		inherit: true,
		abilities: {0: "Blaze", H: "Death Aura"},
	},
	gastly: {
		inherit: true,
		abilities: {0: "Levitate", H: "Death Aura"},
	},
	haunter: {
		inherit: true,
		abilities: {0: "Levitate", H: "Death Aura"},
	},
	gengar: {
		inherit: true,
		abilities: {0: "Levitate", H: "Neutralizing Gas"},
	},
	rellor: {
		inherit: true,
		abilities: {0: "Compound Eyes", 1: "Sand Force", H: "Shed Skin"},
	},
	rabsca: {
		inherit: true,
		abilities: {0: "Sunblock", 1: "Sand Force", H: "Counteract"},
	},
	greavard: {
		inherit: true,
		abilities: {0: "Pickup", 1: "Death Aura", H: "Fluffy"},
	},
	houndstone: {
		inherit: true,
		abilities: {0: "Sand Rush", 1: "Death Aura", H: "Fluffy"},
	},
	spiritomb: {
		inherit: true,
		abilities: {0: "Pressure", 1: "Death Aura", H: "Green-Eyed"},
	},
	froslass: {
		inherit: true,
		abilities: {0: "Snow Cloak", 1: "Death Aura", H: "Cursed Body"},
	},
	houndoom: {
		inherit: true,
		abilities: {0: "Death Aura", 1: "Flash Fire", H: "Unnerve"},
	},
	voltorbhisui: {
		inherit: true,
		abilities: {0: "Soundproof", 1: "Seed Sower", H: "Aftermath"},
	},
	electrodehisui: {
		inherit: true,
		abilities: {0: "Soundproof", 1: "Seed Sower", H: "Aftermath"},
	},
	chespin: {
		inherit: true,
		abilities: {0: "Overgrow", H: "Seed Sower"},
	},
	quilladin: {
		inherit: true,
		abilities: {0: "Overgrow", H: "Seed Sower"},
	},
	chesnaught: {
		inherit: true,
		abilities: {0: "Overgrow", H: "Seed Sower"},
	},
	bounsweet: {
		inherit: true,
		abilities: {0: "Seed Sower", 1: "Oblivious", H: "Sweet Veil"},
	},
	steenee: {
		inherit: true,
		abilities: {0: "Seed Sower", 1: "Oblivious", H: "Sweet Veil"},
	},
	tsareena: {
		inherit: true,
		types: ["Grass", "Fairy"],
		abilities: {0: "Seed Sower", 1: "Queenly Majesty", H: "Cute Charm"},
	},
	leafeon: {
		inherit: true,
		abilities: {0: "Seed Sower", H: "Chlorophyll"},
	},
	diglett: {
		inherit: true,
		abilities: {0: "Sand Spit", 1: "Arena Trap", H: "Sand Force"},
	},
	dugtrio: {
		inherit: true,
		abilities: {0: "Sand Spit", 1: "Arena Trap", H: "Sand Force"},
	},
	sandile: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Moxie", H: "Sand Spit"},
	},
	krokorok: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Moxie", H: "Sand Spit"},
	},
	krookodile: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Moxie", H: "Sand Spit"},
	},
	sandygast: {
		inherit: true,
		abilities: {0: "Water Compaction", 1: "Sand Spit", H: "Sand Veil"},
	},
	palossand: {
		inherit: true,
		abilities: {0: "Water Compaction", 1: "Sand Spit", H: "Sand Veil"},
	},
	pyroar: {
		inherit: true,
		types: ["Fire", "Ground"],
		abilities: {0: "Sand Rush", 1: "Outclass", H: "Supreme Overlord"},
	},
	zacian: {
		inherit: true,
		abilities: {0: "Intrepid Sword", H: "Outclass"},
	},
	zaciancrowned: {
		inherit: true,
		abilities: {0: "Intrepid Sword", H: "Outclass"},
	},
	zamazenta: {
		inherit: true,
		abilities: {0: "Dauntless Shield", H: "Counteract"},
	},
	zamazentacrowned: {
		inherit: true,
		abilities: {0: "Dauntless Shield", H: "Counteract"},
	},
	uxie: {
		inherit: true,
		abilities: {0: "Levitate", H: "Counteract"},
	},
	azelf: {
		inherit: true,
		abilities: {0: "Levitate", H: "Outclass"},
	},
	tinkaton: {
		inherit: true,
		abilities: {0: "Mold Breaker", 1: "Counteract", H: "Sheer Force"},
	},
	girafarig: {
		inherit: true,
		abilities: {0: "Inner Focus", 1: "Early Bird", H: "Counteract"},
	},
	farigiraf: {
		inherit: true,
		abilities: {0: "Cud Chew", 1: "Armor Tail", H: "Counteract"},
	},
	umbreon: {
		inherit: true,
		abilities: {0: "Synchronize", H: "Counteract"},
	},
	drifloon: {
		inherit: true,
		abilities: {0: "Counteract", 1: "Unburden", H: "Flare Boost"},
	},
	drifblim: {
		inherit: true,
		abilities: {0: "Counteract", 1: "Unburden", H: "Flare Boost"},
	},
	falinks: {
		inherit: true,
		abilities: {0: "Battle Armor", 1: "Counteract", H: "Defiant"},
	},
	basculegionf: {
		inherit: true,
		abilities: {0: "Swift Swim", 1: "Adaptability", H: "Counteract"},
	},
	taurospaldeablaze: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Sunblock", H: "Cud Chew"},
	},
	taurospaldeaaqua: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Counteract", H: "Cud Chew"},
	},
	espathra: {
		inherit: true,
		abilities: {0: "Opportunist", 1: "Outclass", H: "Speed Boost"},
	},
	axew: {
		inherit: true,
		abilities: {0: "Rivalry", 1: "Mold Breaker", H: "Steely Spirit"},
	},
	fraxure: {
		inherit: true,
		abilities: {0: "Rivalry", 1: "Mold Breaker", H: "Steely Spirit"},
	},
	haxorus: {
		inherit: true,
		abilities: {0: "Outclass", 1: "Mold Breaker", H: "Steely Spirit"},
	},
	eevee: {
		inherit: true,
		abilities: {0: "Outclass", 1: "Adaptability", H: "Anticipation"},
	},
	drednaw: {
		inherit: true,
		abilities: {0: "Strong Jaw", 1: "Sand Veil", H: "Swift Swim"},
	},
	sneasel: {
		inherit: true,
		abilities: {0: "Inner Focus", 1: "Keen Eye", H: "Green-Eyed"},
	},
	weavile: {
		inherit: true,
		abilities: {0: "Pressure", 1: "Snow Cloak", H: "Green-Eyed"},
	},
	snom: {
		inherit: true,
		abilities: {0: "Shield Dust", 1: "Snow Cloak", H: "Ice Scales"},
	},
	frosmoth: {
		inherit: true,
		abilities: {0: "Shield Dust", 1: "Snow Cloak", H: "Ice Scales"},
	},
	frigibax: {
		inherit: true,
		abilities: {0: "Thermal Exchange", 1: "Snow Cloak", H: "Ice Body"},
	},
	arctibax: {
		inherit: true,
		abilities: {0: "Thermal Exchange", 1: "Snow Cloak", H: "Ice Body"},
	},
	baxcalibur: {
		inherit: true,
		abilities: {0: "Thermal Exchange", 1: "Snow Cloak", H: "Ice Body"},
	},
	salandit: {
		inherit: true,
		abilities: {0: "Corrosion", 1: "Sunblock", H: "Green-Eyed"},
	},
	salazzle: {
		inherit: true,
		abilities: {0: "Corrosion", 1: "Sunblock", H: "Green-Eyed"},
	},
	fomantis: {
		inherit: true,
		abilities: {0: "Leaf Guard", 1: "Sunblock", H: "Contrary"},
	},
	lurantis: {
		inherit: true,
		abilities: {0: "Leaf Guard", 1: "Sunblock", H: "Contrary"},
	},
	moltres: {
		inherit: true,
		abilities: {0: "Pressure", 1: "Sunblock", H: "Flame Body"},
	},
	cyndaquil: {
		inherit: true,
		abilities: {0: "Blaze", H: "Sunblock"},
	},
	quilava: {
		inherit: true,
		abilities: {0: "Blaze", H: "Sunblock"},
	},
	typhlosion: {
		inherit: true,
		abilities: {0: "Blaze", H: "Sunblock"},
	},
	zarude: {
		inherit: true,
		abilities: {0: "Sunblock"},
	},
	zarudedada: {
		inherit: true,
		abilities: {0: "Sunblock"},
	},
	mew: {
		inherit: true,
		abilities: {0: "Synchronize", H: "Protean"},
	},
	hariyama: {
		inherit: true,
		abilities: {0: "Thick Fat", 1: "Guts", H: "Purifying Salt"},
	},
	mukalola: {
		inherit: true,
		abilities: {0: "Neutralizing Gas", 1: "Poison Touch", H: "Power of Alchemy"},
	},
	muk: {
		inherit: true,
		types: ["Poison", "Water"],
		abilities: {0: "Regenerator", 1: "Liquid Ooze", H: "Water Absorb"},
	},
	meowthgalar: {
		inherit: true,
		abilities: {0: "Pickup", 1: "Tough Claws", H: "Steely Spirit"},
	},
	diglettalola: {
		inherit: true,
		abilities: {0: "Steely Spirit", 1: "Tangling Hair", H: "Sand Force"},
	},
	dugtrioalola: {
		inherit: true,
		abilities: {0: "Steely Spirit", 1: "Tangling Hair", H: "Sand Force"},
	},
	cufant: {
		inherit: true,
		abilities: {0: "Sheer Force", 1: "Steely Spirit", H: "Heavy Metal"},
	},
	copperajah: {
		inherit: true,
		abilities: {0: "Sheer Force", 1: "Steely Spirit", H: "Heavy Metal"},
	},
	bronzor: {
		inherit: true,
		abilities: {0: "Levitate", 1: "Heatproof", H: "Steely Spirit"},
	},
	bronzong: {
		inherit: true,
		abilities: {0: "Levitate", 1: "Heatproof", H: "Steely Spirit"},
	},
	thundurus: {
		inherit: true,
		abilities: {0: "Prankster", H: "Battle Spines"},
	},
	overqwil: {
		inherit: true,
		abilities: {0: "Battle Spines", 1: "Swift Swim", H: "Intimidate"},
	},
	clodsire: {
		inherit: true,
		abilities: {0: "Battle Spines", 1: "Water Absorb", H: "Unaware"},
	},
	jolteon: {
		inherit: true,
		abilities: {0: "Volt Absorb", H: "Battle Spines"},
	},
	pincurchin: {
		inherit: true,
		abilities: {0: "Lightning Rod", 1: "Battle Spines", H: "Electric Surge"},
	},
	cloyster: {
		inherit: true,
		abilities: {0: "Battle Spines", 1: "Skill Link", H: "Overcoat"},
	},
	spoink: {
		inherit: true,
		abilities: {0: "Thick Fat", 1: "Sheer Heart", H: "Gluttony"},
	},
	grumpig: {
		inherit: true,
		abilities: {0: "Thick Fat", 1: "Sheer Heart", H: "Gluttony"},
	},
	alomomola: {
		inherit: true,
		abilities: {0: "Healer", 1: "Sheer Heart", H: "Regenerator"},
	},
	luvdisc: {
		inherit: true,
		abilities: {0: "Swift Swim", 1: "Sheer Heart", H: "Hydration"},
	},
	lucario: {
		inherit: true,
		abilities: {0: "Sheer Heart", 1: "Inner Focus", H: "Justified"},
	},
	gothita: {
		inherit: true,
		abilities: {0: "Sheer Heart", 1: "Competitive", H: "Shadow Tag"},
	},
	gothorita: {
		inherit: true,
		abilities: {0: "Sheer Heart", 1: "Competitive", H: "Shadow Tag"},
	},
	gothitelle: {
		inherit: true,
		abilities: {0: "Sheer Heart", 1: "Competitive", H: "Shadow Tag"},
	},
	gastrodon: {
		inherit: true,
		abilities: {0: "Color Change", 1: "Storm Drain", H: "Sand Force"},
	},
	deerling: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Color Change", H: "Serene Grace"},
	},
	sawsbuck: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Color Change", H: "Serene Grace"},
	},
	toedscool: {
		inherit: true,
		abilities: {0: "Mycelium Might", H: "Color Change"},
	},
	toedscruel: {
		inherit: true,
		abilities: {0: "Mycelium Might", H: "Color Change"},
	},
	heatran: {
		inherit: true,
		abilities: {0: "Flash Fire", 1: "Smelt", H: "Flame Body"},
	},
	torkoal: {
		inherit: true,
		abilities: {0: "White Smoke", 1: "Drought", H: "Smelt"},
	},
	camerupt: {
		inherit: true,
		abilities: {0: "Smelt", 1: "Solid Rock", H: "Anger Point"},
	},
	rolycoly: {
		inherit: true,
		abilities: {0: "Steam Engine", 1: "Heatproof", H: "Smelt"},
	},
	carkol: {
		inherit: true,
		abilities: {0: "Steam Engine", 1: "Flame Body", H: "Smelt"},
	},
	coalossal: {
		inherit: true,
		abilities: {0: "Steam Engine", 1: "Flame Body", H: "Smelt"},
	},
	chiyu: {
		inherit: true,
		abilities: {0: "Beads of Ruin", H: "Smelt"},
	},
	tinglu: {
		inherit: true,
		abilities: {0: "Vessel of Ruin", H: "Green-Eyed"},
	},
	moltresgalar: {
		inherit: true,
		abilities: {0: "Berserk", H: "Green-Eyed"},
	},
	mewoth: {
		inherit: true,
		abilities: {0: "Pickup", 1: "Technician", H: "Green-Eyed"},
	},
	persian: {
		inherit: true,
		abilities: {0: "Limber", 1: "Technician", H: "Green-Eyed"},
	},
	meowthalola: {
		inherit: true,
		abilities: {0: "Pickup", 1: "Technician", H: "Green-Eyed"},
	},
	persianalola: {
		inherit: true,
		abilities: {0: "Fur Coat", 1: "Technician", H: "Green-Eyed"},
	},
	zangoose: {
		inherit: true,
		abilities: {0: "Immunity", 1: "Green-Eyed", H: "Toxic Boost"},
	},
	seviper: {
		inherit: true,
		abilities: {0: "Shed Skin", 1: "Green-Eyed", H: "Infiltrator"},
	},
	scovillain: {
		inherit: true,
		abilities: {0: "Chlorophyll", 1: "Green-Eyed", H: "Moody"},
	},
	hoopa: {
		inherit: true,
		abilities: {0: "Magician", H: "Green-Eyed"},
	},
	hoopaunbound: {
		inherit: true,
		abilities: {0: "Magician", H: "Green-Eyed"},
	},
	zorua: {
		inherit: true,
		abilities: {0: "Illusion", H: "Green-Eyed"},
	},
	zoroark: {
		inherit: true,
		abilities: {0: "Illusion", H: "Green-Eyed"},
	},
	murkrow: {
		inherit: true,
		abilities: {0: "Green-Eyed", 1: "Super Luck", H: "Prankster"},
	},
	honchkrow: {
		inherit: true,
		abilities: {0: "Green-Eyed", 1: "Super Luck", H: "Moxie"},
	},
	impidimp: {
		inherit: true,
		abilities: {0: "Prankster", 1: "Frisk", H: "Green-Eyed"},
	},
	morgrem: {
		inherit: true,
		abilities: {0: "Prankster", 1: "Frisk", H: "Green-Eyed"},
	},
	grimmsnarl: {
		inherit: true,
		abilities: {0: "Prankster", 1: "Frisk", H: "Green-Eyed"},
	},
	sableye: {
		inherit: true,
		abilities: {0: "Green-Eyed", 1: "Stall", H: "Prankster"},
	},
	mudbray: {
		inherit: true,
		abilities: {0: "Mud Wash", 1: "Stamina", H: "Inner Focus"},
	},
	mudsdale: {
		inherit: true,
		abilities: {0: "Mud Wash", 1: "Stamina", H: "Inner Focus"},
	},
	barboach: {
		inherit: true,
		abilities: {0: "Anticipation", 1: "Oblivious", H: "Mud Wash"},
	},
	whiscash: {
		inherit: true,
		abilities: {0: "Anticipation", 1: "Oblivious", H: "Mud Wash"},
	},
	vaporeon: {
		inherit: true,
		abilities: {0: "Water Absorb", H: "Mud Wash"},
	},
	surskit: {
		inherit: true,
		abilities: {0: "Swift Swim", 1: "Mud Wash", H: "Rain Dish"},
	},
	masquerain: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Mud Wash", H: "Unnerve"},
	},
	pelipper: {
		inherit: true,
		abilities: {0: "Mud Wash", 1: "Drizzle", H: "Rain Dish"},
	},
	orthworm: {
		inherit: true,
		types: ["Steel", "Water"],
		abilities: {0: "Earth Eater", 1: "Steely Spirit", H: "Mud Wash"},
	},
	psyduck: {
		inherit: true,
		abilities: {0: "Mud Wash", 1: "Cloud Nine", H: "Swift Swim"},
	},
	golduck: {
		inherit: true,
		abilities: {0: "Mud Wash", 1: "Cloud Nine", H: "Swift Swim"},
	},
	wooper: {
		inherit: true,
		abilities: {0: "Mud Wash", 1: "Water Absorb", H: "Unaware"},
	},
	quagsire: {
		inherit: true,
		abilities: {0: "Mud Wash", 1: "Water Absorb", H: "Unaware"},
	},
	salamence: {
		inherit: true,
		abilities: {0: "Intimidate", 1: "Technician", H: "Moxie"},
	},
};
