export const Pokedex: {[k: string]: ModdedSpeciesData} = { 
	///.d8888.  .o88b. d8888b.  .d8b.  d8888b. d8888b. d88888b d8888b.   d8888b.  .d88b.  db   dD d88888b .88b  d88.  .d88b.  d8b   db 
	///88'  YP d8P  Y8 88  `8D d8' `8b 88  `8D 88  `8D 88'     88  `8D   88  `8D .8P  Y8. 88 ,8P' 88'     88'YbdP`88 .8P  Y8. 888o  88 
	///`8bo.   8P      88oobY' 88ooo88 88oodD' 88oodD' 88ooooo 88   88   88oodD' 88    88 88,8P   88ooooo 88  88  88 88    88 88V8o 88 
	///  `Y8b. 8b      88`8b   88~~~88 88~~~   88~~~   88~~~~~ 88   88   88~~~   88    88 88`8b   88~~~~~ 88  88  88 88    88 88 V8o88 
	///db   8D Y8b  d8 88 `88. 88   88 88      88      88.     88  .8D   88      `8b  d8' 88 `88. 88.     88  88  88 `8b  d8' 88  V888 
	///`8888Y'  `Y88P' 88   YD YP   YP 88      88      Y88888P Y8888D'   88       `Y88P'  YP   YD Y88888P YP  YP  YP  `Y88P'  VP   V8P 
	puchikoon: {
		num: 1152,
		name: "Puchikoon",
		types: ["Fire"],
		baseStats: {hp: 30, atk: 65, def: 35, spa: 45, spd: 45, spe: 70},
		abilities: {},
		evos: ["Ponyta"],
	},
	mikon: {
		num: 1153,
		name: "Mikon",
		types: ["Fire"],
		baseStats: {hp: 28, atk: 31, def: 30, spa: 60, spd: 60, spe: 60},
		abilities: {},
		evos: ["Vulpix"],
	},
	konya: {
		num: 1154,
		name: "Konya",
		types: ["Normal"],
		baseStats: {hp: 35, atk: 40, def: 30, spa: 35, spd: 35, spe: 85},
		abilities: {},
		evos: ["Meowth"],
	},
	gyopin: {
		num: 1155,
		name: "Gyopin",
		types: ["Water"],
		baseStats: {hp: 35, atk: 57, def: 50, spa: 40, spd: 40, spe: 53},
		abilities: {},
		evos: ["Goldeen"],
	},
	bittybat: {
		num: 1156,
		name: "Bittybat",
		types: ["Poison", "Flying"],
		baseStats: {hp: 35, atk: 40, def: 30, spa: 35, spd: 35, spe: 50},
		abilities: {},
		evos: ["Zubat"],
	},
	blastyke: {
		num: 1157,
		name: "Blastyke",
		types: ["Water"],
		baseStats: {hp: 49, atk: 43, def: 60, spa: 45, spd: 45, spe: 48},
		abilities: {},
		evos: ["Blastoise"],
	},
	magnetite: {
		num: 1158,
		name: "Magnetite",
		types: ["Electric"],
		baseStats: {hp: 30, atk: 40, def: 75, spa: 100, spd: 100, spe: 50},
		abilities: {},
		prevo: "Magnemite",
		evoLevel: 20,
		evos: ["Magneton"],
	},
	weirduck: {
		num: 1159,
		name: "Weirduck",
		types: ["Water"],
		baseStats: {hp: 65, atk: 67, def: 63, spa: 65, spd: 65, spe: 70},
		abilities: {},
		prevo: "Psyduck",
		evoLevel: 22,
		evos: ["Golduck"],
	},
	ribbito: {
		num: 1160,
		name: "Ribbito",
		types: ["Water"],
		baseStats: {hp: 94, atk: 55, def: 50, spa: 55, spd: 55, spe: 40},
		abilities: {},
		evos: ["Croakozuna"],
	},
	croakozuna: {
		num: 1161,
		name: "Croakozuna",
		types: ["Water", "Dark"],
		baseStats: {hp: 134, atk: 75, def: 70, spa: 75, spd: 75, spe: 60},
		abilities: {},
	},
	skimper: {
		num: 1162,
		name: "Skimper",
		types: ["Water"],
		baseStats: {hp: 62, atk: 43, def: 36, spa: 71, spd: 71, spe: 88},
		abilities: {},
		evos: ["Bawligua"],
	},
	bawligua: {
		num: 1163,
		name: "Bawligua",
		types: ["Water"],
		baseStats: {hp: 72, atk: 53, def: 46, spa: 81, spd: 81, spe: 98},
		abilities: {},
		prevo: "Skimper",
		evoLevel: 30,
		evos: ["Cryithan"],
	},
	cryithan: {
		num: 1164,
		name: "Cryithan",
		types: ["Water", "Dragon"],
		baseStats: {hp: 92, atk: 83, def: 76, spa: 101, spd: 101, spe: 118},
		abilities: {},
		prevo: "Bawligua",
		evoLevel: 50,
	},
	nidoreign: {
		num: 1165,
		name: "Nidoreign",
		types: ["Poison", "Rock"],
		baseStats: {hp: 90, atk: 92, def: 87, spa: 75, spd: 75, spe: 85},
		abilities: {},
		prevo: "Nidorino", // It seems we can't have convergent evolutions, so Nidorino will be used here. I believe it'll be functionally identical in the validator as long as I make it learn the Nidorina-exclusive moves via an event entry or something. 
		evoType: "useItem", //NOTE TO SELF: Make the moves all learned at L1 and L50. The lowest reasonable level people will use this at is 50, and this will resolve any incompatabilities in the validator. The moves suck but let's make sure nobody becomes uncanny.
		evoItem: "Moon Stone",
	},
	decilla: {
		num: 1166,
		name: "Decilla",
		types: ["Rock"],
		baseStats: {hp: 61, atk: 90, def: 70, spa: 40, spd: 40, spe: 15},
		abilities: {},
		evos: ["Gyaoon"],
	},
	gyaoon: {
		num: 1167,
		name: "Gyaoon",
		types: ["Rock"],
		baseStats: {hp: 101, atk: 110, def: 100, spa: 95, spd: 95, spe: 30},
		abilities: {},
		prevo: "Decilla",
		evoLevel: 50,
	},
	omega: {
		num: 1168,
		name: "Omega",
		types: ["Steel"], //WARNING: Not designed for SW97 Steel-type. Consider field testing in a closed beta. Talk to Shellnuts.
		baseStats: {hp: 101, atk: 100, def: 120, spa: 95, spd: 95, spe: 25}, 
		abilities: {},
	},
	trampel: {
		num: 1169,
		name: "Trampel",
		types: ["Normal", "Ground"],
		baseStats: {hp: 130, atk: 100, def: 90, spa: 64, spd: 64, spe: 56}, //Consider checking the Attack stat to see if we should add more points to factor in Blissey. Needs more testing.
		abilities: {},
	},
	jagg: {
		num: 1170,
		name: "Jagg",
		types: ["Water", "Steel"],
		baseStats: {hp: 80, atk: 115, def: 100, spa: 85, spd: 85, spe: 60},
		abilities: {},
	},
	blottle: {
		num: 1171,
		name: "Blottle",
		types: ["Water", "Fairy"],
		baseStats: {hp: 60, atk: 35, def: 60, spa: 65, spd: 65, spe: 50},
		abilities: {},
		evos: ["Pendraken"],
	},
	pendraken: {
		num: 1172,
		name: "Pendraken",
		types: ["Water", "Fairy"],
		baseStats: {hp: 80, atk: 60, def: 85, spa: 95, spd: 95, spe: 90},
		abilities: {},
		prevo: "Blottle",
		evoLevel: 30,
	},
	deer: {
		num: 1173,
		name: "Deer",
		types: ["Normal", "Grass"],
		baseStats: {hp: 85, atk: 110, def: 85, spa: 90, spd: 90, spe: 60},
		abilities: {},
	},
	barunda: {
		num: 1174,
		name: "Barunda",
		types: ["Fairy", "Flying"],
		baseStats: {hp: 90, atk: 50, def: 30, spa: 100, spd: 100, spe: 125},
		abilities: {},
	},
	cheep: {
		num: 1175,
		name: "Cheep",
		types: ["Water"],
		baseStats: {hp: 45, atk: 65, def: 40, spa: 40, spd: 40, spe: 60},
		abilities: {},
		evos: ["Jabetta"],
	},
	jabetta: {
		num: 1176,
		name: "Jabetta",
		types: ["Water", "Fighting"],
		baseStats: {hp: 80, atk: 125, def: 70, spa: 80, spd: 80, spe: 80},
		abilities: {},
		prevo: "Cheep",
		evoLevel: 30,
	},
	cactus: { //Needs extensive field testing.
		num: 1177,
		name: "Cactus",
		types: ["Grass", "Ground"],
		baseStats: {hp: 60, atk: 95, def: 100, spa: 75, spd: 75, spe: 90},
		abilities: {},
	},
	kotora: {
		num: 1178,
		name: "Kotora",
		types: ["Electric"],
		baseStats: {hp: 50, atk: 65, def: 45, spa: 55, spd: 55, spe: 40},
		abilities: {},
		evos: ["Gaotora"],
	},
	gaotora: {
		num: 1179,
		name: "Gaotora",
		types: ["Electric"],
		baseStats: {hp: 65, atk: 80, def: 65, spa: 75, spd: 75, spe: 60},
		abilities: {},
		prevo: "Kotora",
		evoLevel: 16,
		evos: ["Gorotora"],
	},
	gorotora: {
		num: 1180,
		name: "Gorotora",
		types: ["Electric"],
		baseStats: {hp: 90, atk: 105, def: 85, spa: 95, spd: 95, spe: 80},
		abilities: {},
		prevo: "Gaotora",
		evoLevel: 36,
	},
	crocky: {
		num: 1181,
		name: "Crocky",
		types: ["Dragon"],
		baseStats: {hp: 80, atk: 90, def: 75, spa: 80, spd: 80, spe: 95},
		abilities: {},
	},
	gorochu: {
		num: 1182,
		name: "Gorochu",
		types: ["Electric"],
		baseStats: {hp: 70, atk: 100, def: 65, spa: 100, spd: 100, spe: 110},
		abilities: {},
		prevo: "Raichu",
		evoType: "trade",
	},
	guardia: {
		num: 1183,
		name: "Guardia",
		types: ["Ground"],
		baseStats: {hp: 70, atk: 90, def: 120, spa: 100, spd: 100, spe: 65},
		abilities: {},
		prevo: "Marowak",
		evoType: "trade",
		evoCondition: "with a Kangaskhan" //I believe this wouldn't cause a crash as iirc they aren't actually coded in, just displayed with /dt. If it causes problems, just remove it, as it's not like this specific evo condition actually exists in RBY anyway.
	},
	totartle: {
		num: 1184,
		name: "Totartle",
		types: ["Water", "Grass"],
		baseStats: {hp: 79, atk: 83, def: 85, spa: 100, spd: 100, spe: 78},
		abilities: {},
		prevo: "Wartortle", //It seemed less complicated to separate Blastoise and Totartle when coding so I went back on the branch evolution aspect. It's cool and gives a PokeGod aspect, but it's more accurate and moves are retained properly anyway.
		evoLevel: 43,
	},
	buu: {
		num: 1185,
		name: "Buu",
		types: ["Ice"],
		baseStats: {hp: 65, atk: 93, def: 57, spa: 85, spd: 85, spe: 95},
		abilities: {},
	},
	purakkusu: {
		num: 1186,
		name: "Purakkusu",
		types: ["Bug", "Steel"],
		baseStats: {hp: 65, atk: 125, def: 140, spa: 55, spd: 55, spe: 85},
		abilities: {},
		prevo: "Pinsir",
		evoLevel: 42,
	},
	madaamu: {
		num: 1187,
		name: "Madaamu",
		types: ["Normal", "Flying"],
		baseStats: {hp: 72, atk: 105, def: 75, spa: 63, spd: 63, spe: 70},
		abilities: {},
		prevo: "Farfetch'd",
		evoLevel: 24,
	},
	tsubomitto: {
		num: 1188,
		name: "Tsubomitto",
		types: ["Grass", "Poison"],
		baseStats: {hp: 80, atk: 120, def: 65, spa: 85, spd: 85, spe: 70},
		abilities: {},
		prevo: "Weepinbell",
		evoType: "trade", // sun/poison stone does not exist so let's just do this
	},
	animon: {
		num: 1187,
		name: "Animon",
		types: ["Steel"],
		baseStats: {hp: 100, atk: 55, def: 50, spa: 50, spd: 50, spe: 150},
		abilities: {},
		prevo: "Ditto",
		evoType: "useItem", // it's sort of a metal coat
		evoItem: "Moon Stone",
	},
	monja: {
		num: 1188,
		name: "Monja",
		types: ["Grass"],
		baseStats: {hp: 45, atk: 35, def: 85, spa: 80, spd: 80, spe: 40},
		abilities: {},
		evos: ["Tangela"],
	},
	para: {
		num: 1189,
		name: "Para",
		types: ["Bug"],
		baseStats: {hp: 20, atk: 55, def: 40, spa: 40, spd: 40, spe: 10},
		abilities: {},
		evos: ["Paras"],
	},
	hinaazu: {
		num: 1190,
		name: "Hinaazu",
		types: ["Normal", "Flying"],
		baseStats: {hp: 15, atk: 65, def: 25, spa: 15, spd: 15, spe: 55},
		abilities: {},
		evos: ["Doduo"],
	},
	pudi: {
		num: 1191,
		name: "Pudi",
		types: ["Fire"],
		baseStats: {hp: 35, atk: 50, def: 25, spa: 30, spd: 30, spe: 40},
		abilities: {},
		evos: ["Growlithe"],
	},
	betobebii: {
		num: 1191,
		name: "Betobebii",
		types: ["Poison"],
		baseStats: {hp: 60, atk: 60, def: 30, spa: 20, spd: 20, spe: 5},
		abilities: {},
		evos: ["Grimer"],
	},
	kokana: {
		num: 1192,
		name: "Kokana",
		types: ["Bug"],
		abilities: {},
		baseStats: {hp: 40, atk: 35, def: 30, spa: 25, spd: 25, spe: 45},
		evos: ["Kasanagi"],
	},
	kasanagi: {
		num: 1193,
		name: "Kasanagi",
		types: ["Bug"],
		abilities: {},
		baseStats: {hp: 45, atk: 20, def: 50, spa: 30, spd: 30, spe: 40},
		evos: ["Carapthor"],
		prevo: "Kokana",
		evoLevel: 7,
	},
	carapthor: {
		num: 1194,
		name: "Carapthor",
		types: ["Bug", "Fighting"],
		abilities: {},
		baseStats: {hp: 60, atk: 85, def: 50, spa: 50, spd: 50, spe: 60},
		prevo: "Kasanagi",
		evoLevel: 10,
	},
	taaban: {
		num: 1195,
		name: "Taaban",
		types: ["Water"],
		baseStats: {hp: 70, atk: 125, def: 145, spa: 70, spd: 70, spe: 50},
		abilities: {},
		prevo: "Shellder",
		evoType: "useItem",
		evoItem: "Water Stone",
	},
	/// 
	/// .o88b. d8888b.  .d88b.  .d8888. .d8888.         d888b  d88888b d8b   db   d88888b db    db  .d88b.  .d8888. 
	///d8P  Y8 88  `8D .8P  Y8. 88'  YP 88'  YP        88' Y8b 88'     888o  88   88'     88    88 .8P  Y8. 88'  YP 
	///8P      88oobY' 88    88 `8bo.   `8bo.          88      88ooooo 88V8o 88   88ooooo Y8    8P 88    88 `8bo.   
	///8b      88`8b   88    88   `Y8b.   `Y8b. C8888D 88  ooo 88~~~~~ 88 V8o88   88~~~~~ `8b  d8' 88    88   `Y8b. 
	///Y8b  d8 88 `88. `8b  d8' db   8D db   8D        88. ~8~ 88.     88  V888   88.      `8bd8'  `8b  d8' db   8D 
	/// `Y88P' 88   YD  `Y88P'  `8888Y' `8888Y'         Y888P  Y88888P VP   V8P   Y88888P    YP     `Y88P'  `8888Y' 
	///
	scizor: { 
		inherit: true,
		baseStats: {hp: 70, atk: 130, def: 100, spa: 55, spd: 55, spe: 60},
	},
	cleffa: {
		inherit: true,
		baseStats: {hp: 50, atk: 25, def: 28, spa: 45, spd: 45, spe: 15},
	},
	igglybuff: {
		inherit: true,
		baseStats: {hp: 90, atk: 30, def: 15, spa: 20, spd: 20, spe: 15},
	},
	crobat: {
		inherit: true,
		baseStats: {hp: 85, atk: 90, def: 80, spa: 80, spd: 80, spe: 130},
	},
	bellossom: {
		inherit: true,
		baseStats: {hp: 75, atk: 80, def: 85, spa: 100, spd: 100, spe: 50},
	},
	politoed: {
		inherit: true,
		baseStats: {hp: 90, atk: 75, def: 75, spa: 90, spd: 90, spe: 70},
	},
	slowking: {
		inherit: true,
		baseStats: {hp: 95, atk: 75, def: 80, spa: 100, spd: 100, spe: 30},
	},
	slowkinggalar: { //its a forme but its one of a cross-gen evo so lets keep things simple
		inherit: true,
		baseStats: {hp: 95, atk: 65, def: 80, spa: 110, spd: 110, spe: 30},
	},
	magnezone: {
		inherit: true,
		baseStats: {hp: 70, atk: 70, def: 115, spa: 130, spd: 130, spe: 60},
	},
	hitmontop: {
		inherit: true,
		baseStats: {hp: 50, atk: 95, def: 95, spa: 35, spd: 35, spe: 70},
	},
	lickilicky: {
		inherit: true,
		baseStats: {hp: 110, atk: 85, def: 95, spa: 80, spd: 80, spe: 50},
	},
	steelix: {
		inherit: true,
		baseStats: {hp: 75, atk: 85, def: 200, spa: 65, spd: 65, spe: 30},
	},
	rhyperior: {
		inherit: true,
		baseStats: {hp: 115, atk: 140, def: 130, spa: 55, spd: 55, spe: 40},
	},
	happiny: {
		inherit: true,
		baseStats: {hp: 100, atk: 5, def: 5, spa: 65, spd: 65, spe: 30},
	},
	blissey: {
		inherit: true,
		baseStats: {hp: 255, atk: 10, def: 10, spa: 135, spd: 135, spe: 55},
	},
	tangrowth: {
		inherit: true,
		baseStats: {hp: 100, atk: 100, def: 125, spa: 110, spd: 110, spe: 50},
	},
	kingdra: {
		inherit: true,
		baseStats: {hp: 75, atk: 95, def: 95, spa: 95, spd: 95, spe: 85},
	},
	smoochum: {
		inherit: true,
		baseStats: {hp: 45, atk: 30, def: 15, spa: 85, spd: 85, spe: 65},
	},
	elekid: {
		inherit: true,
		baseStats: {hp: 45, atk: 63, def: 37, spa: 55, spd: 55, spe: 55},
	},
	electivire: {
		inherit: true,
		baseStats: {hp: 75, atk: 123, def: 67, spa: 85, spd: 85, spe: 95},
	},
	magby: {
		inherit: true,
		baseStats: {hp: 45, atk: 75, def: 37, spa: 55, spd: 55, spe: 83},
	},
	magmortar: {
		inherit: true,
		baseStats: {hp: 75, atk: 95, def: 67, spa: 95, spd: 95, spe: 83}, //why do they have the same speed as their babies this is so mean
	},
	munchlax: {
		inherit: true,
		baseStats: {hp: 135, atk: 85, def: 40, spa: 40, spd: 40, spe: 5},
	},
	mimejr: {
		inherit: true,
		baseStats: {hp: 20, atk: 25, def: 45, spa: 70, spd: 70, spe: 60},
	},
	porygon2: { //hahahahahahaa
		inherit: true,
		baseStats: {hp: 85, atk: 80, def: 90, spa: 95, spd: 95, spe: 60},
	},
	porygonz: { //new uber just dropped
		inherit: true,
		baseStats: {hp: 85, atk: 80, def: 70, spa: 135, spd: 135, spe: 90},
	},
	espeon: {
		inherit: true,
		baseStats: {hp: 65, atk: 65, def: 60, spa: 130, spd: 130, spe: 110},
	},
	umbreon: {
		inherit: true,
		baseStats: {hp: 95, atk: 65, def: 110, spa: 130, spd: 130, spe: 65},
	},
	leafeon: {
		inherit: true,
		baseStats: {hp: 65, atk: 110, def: 130, spa: 65, spd: 65, spe: 95},
	},
	glaceon: {
		inherit: true,
		baseStats: {hp: 65, atk: 60, def: 110, spa: 130, spd: 130, spe: 65},
	},
	sylveon: {
		inherit: true,
		baseStats: {hp: 95, atk: 65, def: 65, spa: 130, spd: 130, spe: 60},
	},
	perrserker: {
		inherit: true,
		baseStats: {hp: 70, atk: 110, def: 100, spa: 60, spd: 60, spe: 50},
	},
	sirfetchd: {
		inherit: true,
		baseStats: {hp: 62, atk: 135, def: 95, spa: 68, spd: 68, spe: 65},
	},
	mrrime: {
		inherit: true,
		baseStats: {hp: 80, atk: 85, def: 75, spa: 100, spd: 100, spe: 70},
	},
	kleavor: {
		inherit: true,
		baseStats: {hp: 70, atk: 135, def: 95, spa: 45, spd: 45, spe: 85},
		abilities: {},
		prevo: "Scyther",
		evoType: "useItem",
		evoItem: "Moon Stone",//Yeah yeah I know Black Augurite exists, implement it if you want...
	},
	meltan: { // look just let me put them here
		inherit: true,
		baseStats: {hp: 46, atk: 65, def: 55, spa: 35, spd: 35, spe: 34},
		evos: ["Melmetal"], // iirc ps hates this so i will just force it myself like a 2 year old
	},
	melmetal: { // please?
		inherit: true,
		baseStats: {hp: 135, atk: 143, def: 143, spa: 65, spd: 65, spe: 34},
		prevo: "Meltan",
		evoType: "useItem",
		evoItem: "Thunder Stone",
	},
	annihilape: {
		inherit: true,
		num: 979,
		name: "Annihilape",
		types: ["Fighting", "Ghost"],
		abilities: {},
		baseStats: {hp: 110, atk: 115, def: 80, spa: 50, spd: 50, spe: 90},
		prevo: "Primeape",
		evoType: "trade",
	},
	wiglett: { // yeah convergents can go here too idgaf
		inherit: true,
		num: 960,
		name: "Wiglett",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 10, atk: 55, def: 25, spa: 35, spd: 35, spe: 95},
		evos: ["Wugtrio"],
	},
	wugtrio: {
		inherit: true,
		num: 961,
		name: "Wugtrio",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 35, atk: 80, def: 50, spa: 70, spd: 70, spe: 120},
		prevo: "Wiglett",
		evoLevel: 26,
	},
	toedscool: {
		inherit: true,
		num: 948,
		name: "Toedscool",
		types: ["Ground", "Grass"],
		abilities: {},
		baseStats: {hp: 40, atk: 40, def: 35, spa: 100, spd: 100, spe: 70},
		evos: ["Toedscruel"]
	},
	toedscruel: {
		inherit: true,
		num: 949,
		name: "Toedscruel",
		types: ["Ground", "Grass"],
		abilities: {},
		baseStats: {hp: 80, atk: 60, def: 65, spa: 120, spd: 120, spe: 100},
		prevo: "Toedscool",
		evoLevel: 30,
	},
	screamtail: { //ehh go on then you paradox fucks can go here too
		inherit: true,
		num: 985,
		name: "Scream Tail",
		types: ["Fairy", "Psychic"],
		abilities: {},
		baseStats: {hp: 115, atk: 65, def: 99, spa: 115, spd: 115, spe: 111},
	},
	sandyshocks: {
		inherit: true,
		num: 989,
		name: "Sandy Shocks",
		types: ["Electric", "Ground"],
		abilities: {},
		baseStats: {hp: 85, atk: 81, def: 97, spa: 121, spd: 121, spe: 101},
	},
	///d8888b. d88888b  d888b  d888888b  .d88b.  d8b   db  .d8b.  db        db    db  .d8b.  d8888b. d888888b  .d8b.  d8b   db d888888b .d8888. 
	///88  `8D 88'     88' Y8b   `88'   .8P  Y8. 888o  88 d8' `8b 88        88    88 d8' `8b 88  `8D   `88'   d8' `8b 888o  88 `~~88~~' 88'  YP 
	///88oobY' 88ooooo 88         88    88    88 88V8o 88 88ooo88 88        Y8    8P 88ooo88 88oobY'    88    88ooo88 88V8o 88    88    `8bo.   
	///88`8b   88~~~~~ 88  ooo    88    88    88 88 V8o88 88~~~88 88        `8b  d8' 88~~~88 88`8b      88    88~~~88 88 V8o88    88      `Y8b. 
	///88 `88. 88.     88. ~8~   .88.   `8b  d8' 88  V888 88   88 88booo.    `8bd8'  88   88 88 `88.   .88.   88   88 88  V888    88    db   8D 
	///88   YD Y88888P  Y888P  Y888888P  `Y88P'  VP   V8P YP   YP Y88888P      YP    YP   YP 88   YD Y888888P YP   YP VP   V8P    YP    `8888Y' 
	rattataalola: {
		inherit: true,
		baseStats: {hp: 30, atk: 56, def: 35, spa: 25, spd: 25, spe: 72},
	},
	raticatealola: {
		inherit: true,
		baseStats: {hp: 75, atk: 71, def: 70, spa: 40, spd: 40, spe: 77},
	},
	raichualola: {
		inherit: true,
		baseStats: {hp: 60, atk: 85, def: 50, spa: 95, spd: 95, spe: 100},
	},
	sandshrewalola: {
		inherit: true,
		baseStats: {hp: 50, atk: 75, def: 90, spa: 35, spd: 35, spe: 40},
	},
	sandslashalola: { //yo its freezai
		inherit: true,
		baseStats: {hp: 75, atk: 100, def: 120, spa: 65, spd: 65, spe: 65},
	},
	vulpixalola: {
		inherit: true,
		baseStats: {hp: 38, atk: 41, def: 40, spa: 65, spd: 65, spe: 65},
	},
	ninetalesalola: {
		inherit: true,
		baseStats: {hp: 73, atk: 67, def: 75, spa: 100, spd: 100, spe: 109},
	},
	diglettalola: {
		inherit: true,
		baseStats: {hp: 10, atk: 55, def: 30, spa: 45, spd: 45, spe: 90},
	},
	dugtrioalola: {
		inherit: true,
		baseStats: {hp: 35, atk: 80, def: 60, spa: 70, spd: 70, spe: 110},
	},
	meowthalola: {
		inherit: true,
		baseStats: {hp: 40, atk: 35, def: 35, spa: 50, spd: 50, spe: 90},
	},
	meowthgalar: {
		inherit: true,
		baseStats: {hp: 50, atk: 65, def: 55, spa: 40, spd: 40, spe: 40},
	},
	persianalola: {
		inherit: true,
		baseStats: {hp: 65, atk: 60, def: 60, spa: 75, spd: 75, spe: 115},
	},
	growlithehisui: {
		inherit: true,
		baseStats: {hp: 60, atk: 75, def: 45, spa: 50, spd: 50, spe: 55},
		abilities: {},
	},
	arcaninehisui: {
		inherit: true,
		baseStats: {hp: 95, atk: 115, def: 80, spa: 80, spd: 80, spe: 90},
		abilities: {},
	},
	geodudealola: {
		inherit: true,
		baseStats: {hp: 40, atk: 80, def: 100, spa: 30, spd: 30, spe: 20},
	},
	graveleralola: {
		inherit: true,
		baseStats: {hp: 55, atk: 95, def: 115, spa: 45, spd: 45, spe: 35},
	},
	golemalola: {
		inherit: true,
		baseStats: {hp: 80, atk: 120, def: 130, spa: 55, spd: 55, spe: 45},
	},
	ponytagalar: {
		inherit: true,
		baseStats: {hp: 50, atk: 85, def: 55, spa: 65, spd: 65, spe: 90},
	},
	rapidashgalar: {
		inherit: true,
		baseStats: {hp: 65, atk: 100, def: 70, spa: 80, spd: 80, spe: 105},
	},
	slowpokegalar: {
		inherit: true,
		baseStats: {hp: 90, atk: 65, def: 65, spa: 40, spd: 40, spe: 15},
	},
	slowbrogalar: {
		inherit: true,
		baseStats: {hp: 95, atk: 100, def: 95, spa: 70, spd: 70, spe: 30},
	},
	farfetchdgalar: {
		inherit: true,
		baseStats: {hp: 52, atk: 70, def: 55, spa: 58, spd: 58, spe: 55},
	},
	grimeralola: {
		inherit: true,
		baseStats: {hp: 80, atk: 80, def: 50, spa: 40, spd: 40, spe: 25},
	},
	mukalola: {
		inherit: true,
		baseStats: {hp: 105, atk: 105, def: 75, spa: 65, spd: 65, spe: 50},
	},
	voltorbhisui: {
		inherit: true,
		baseStats: {hp: 40, atk: 30, def: 55, spa: 55, spd: 55, spe: 100},
		abilities: {},
	},
	electrodehisui: {
		inherit: true,
		baseStats: {hp: 60, atk: 50, def: 70, spa: 80, spd: 80, spe: 140},
		abilities: {},
	},
	exeggutoralola: {
		inherit: true,
		baseStats: {hp: 95, atk: 105, def: 85, spa: 125, spd: 125, spe: 45},
	},
	marowakalola: {
		inherit: true,
		baseStats: {hp: 60, atk: 80, def: 110, spa: 50, spd: 50, spe: 45},
	},
	weezinggalar: {
		inherit: true,
		baseStats: {hp: 65, atk: 90, def: 120, spa: 85, spd: 85, spe: 60},
	},
	mrmimegalar: {
		inherit: true,
		baseStats: {hp: 50, atk: 65, def: 65, spa: 90, spd: 90, spe: 100},
	},
	taurospaldeacombat: {
		inherit: true,
		num: 128,
		name: "Tauros-Paldea-Combat",
		baseSpecies: "Tauros",
		forme: "Paldea-Combat",
		types: ["Fighting"],
		baseStats: {hp: 75, atk: 110, def: 105, spa: 70, spd: 70, spe: 100},
	},
	taurospaldeablaze: {
		inherit: true,
		num: 128,
		name: "Tauros-Paldea-Blaze",
		baseSpecies: "Tauros",
		forme: "Paldea-Blaze",
		types: ["Fighting", "Fire"],
		baseStats: {hp: 75, atk: 110, def: 105, spa: 70, spd: 70, spe: 100},
	},
	taurospaldeaaqua: {
		inherit: true,
		num: 128,
		name: "Tauros-Paldea-Aqua",
		baseSpecies: "Tauros",
		forme: "Paldea-Aqua",
		types: ["Fighting", "Water"],
		baseStats: {hp: 75, atk: 110, def: 105, spa: 70, spd: 70, spe: 100},
	},
	articunogalar: {
		inherit: true,
		baseStats: {hp: 90, atk: 85, def: 85, spa: 125, spd: 125, spe: 95},
	},
	zapdosgalar: {
		inherit: true,
		baseStats: {hp: 90, atk: 125, def: 90, spa: 85, spd: 85, spe: 100},
	},
	moltresgalar: {
		inherit: true,
		baseStats: {hp: 90, atk: 85, def: 90, spa: 125, spd: 125, spe: 90},
	},
		//8888 8888                  888                           888      888               
	//8888 8888 888 8e  888 88e  888  ,"Y88b Y8b Y888P  ,"Y88b 888 88e  888  ,e e,   dP"Y 
	//8888 8888 888 88b 888 888b 888 "8" 888  Y8b Y8P  "8" 888 888 888b 888 d88 88b C88b  
	//8888 8888 888 888 888 888P 888 ,ee 888   Y8b Y   ,ee 888 888 888P 888 888   ,  Y88D 
	//'Y88 88P' 888 888 888 88"  888 "88 888    888    "88 888 888 88"  888  "YeeP" d,dP  
	//				  888                     888                                       
	//				  888                     888                                       
	// These are alternate formes of RBY Pokemon that exist but were never playable.
	// Namely, the Gastly, Haunter, Cubone, and Marowak ghosts, as well as the Aerodactyl and Kabutops fossils.
	// These were mainly added for fun and have no impact on gameplay. The important details are simply cloned as a result.
	gastlyghost: {
		inherit: true,
		num: -9000,
		name: "Gastly-Ghost",
		baseSpecies: "Gastly",
		forme: "Ghost",
		types: ["Ghost", "Poison"],
		abilities: {},
		baseStats: {hp: 30, atk: 35, def: 30, spa: 100, spd: 100, spe: 80},
	},
	haunterghost: {
		inherit: true,
		num: -9001,
		name: "Haunter-Ghost",
		baseSpecies: "Haunter",
		forme: "Ghost",
		types: ["Ghost", "Poison"],
		abilities: {},
		baseStats: {hp: 45, atk: 50, def: 45, spa: 115, spd: 115, spe: 95},
	},
	cuboneghost: {
		inherit: true,
		num: -9002,
		name: "Cubone-Ghost",
		baseSpecies: "Cubone",
		forme: "Ghost",
		types: ["Ground"],
		abilities: {},
		baseStats: {hp: 50, atk: 50, def: 95, spa: 40, spd: 40, spe: 35},
	},
	marowakghost: {
		inherit: true,
		num: -9003,
		name: "Marowak-Ghost",
		baseSpecies: "Marowak",
		forme: "Ghost",
		types: ["Ground"],
		abilities: {},
		baseStats: {hp: 60, atk: 80, def: 110, spa: 50, spd: 50, spe: 45},
	},
	kabutopsfossil: {
		inherit: true,
		num: -9004,
		name: "Kabutops-Fossil",
		baseSpecies: "Kabutops",
		forme: "Fossil",
		types: ["Rock", "Water"],
		abilities: {},
		baseStats: {hp: 60, atk: 115, def: 105, spa: 70, spd: 70, spe: 80},
	},
	aerodactylfossil: {
		inherit: true,
		num: -9005,
		name: "Aerodactyl-Fossil",
		baseSpecies: "Aerodactyl",
		forme: "Fossil",
		types: ["Rock", "Flying"],
		abilities: {},
		baseStats: {hp: 80, atk: 105, def: 65, spa: 60, spd: 60, spe: 130},
	},
	/// .o88b. db       .d8b.  .d8888. .d8888. d888888b  .o88b.   d8888b.  .d88b.  db   dD d88888b d8888b. d88888b db    db 
	///d8P  Y8 88      d8' `8b 88'  YP 88'  YP   `88'   d8P  Y8   88  `8D .8P  Y8. 88 ,8P' 88'     88  `8D 88'     `8b  d8' 
	///8P      88      88ooo88 `8bo.   `8bo.      88    8P        88oodD' 88    88 88,8P   88ooooo 88   88 88ooooo  `8bd8'  
	///8b      88      88~~~88   `Y8b.   `Y8b.    88    8b        88~~~   88    88 88`8b   88~~~~~ 88   88 88~~~~~  .dPYb.  
	///Y8b  d8 88booo. 88   88 db   8D db   8D   .88.   Y8b  d8   88      `8b  d8' 88 `88. 88.     88  .8D 88.     .8P  Y8. 
	/// `Y88P' Y88888P YP   YP `8888Y' `8888Y' Y888888P  `Y88P'   88       `Y88P'  YP   YD Y88888P Y8888D' Y88888P YP    YP 
	missingno: {
		inherit: true,
		baseStats: {hp: 33, atk: 136, def: 0, spa: 6, spd: 6, spe: 29},
	},
	bulbasaur: {
		inherit: true,
		baseStats: {hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45},
	},
	ivysaur: {
		inherit: true,
		baseStats: {hp: 60, atk: 62, def: 63, spa: 80, spd: 80, spe: 60},
	},
	venusaur: {
		inherit: true,
		baseStats: {hp: 80, atk: 82, def: 83, spa: 100, spd: 100, spe: 80},
	},
	charmander: {
		inherit: true,
		baseStats: {hp: 39, atk: 52, def: 43, spa: 50, spd: 50, spe: 65},
	},
	charmeleon: {
		inherit: true,
		baseStats: {hp: 58, atk: 64, def: 58, spa: 65, spd: 65, spe: 80},
	},
	charizard: {
		inherit: true,
		baseStats: {hp: 78, atk: 84, def: 78, spa: 85, spd: 85, spe: 100},
	},
	squirtle: {
		inherit: true,
		baseStats: {hp: 44, atk: 48, def: 65, spa: 50, spd: 50, spe: 43},
	},
	wartortle: {
		inherit: true,
		baseStats: {hp: 59, atk: 63, def: 80, spa: 65, spd: 65, spe: 58},
		evos: ["Totartle"],
	},
	blastoise: {
		inherit: true,
		baseStats: {hp: 79, atk: 83, def: 100, spa: 85, spd: 85, spe: 78},
		prevo: "Blastyke",
		evoLevel: 36,
	},
	caterpie: {
		inherit: true,
		baseStats: {hp: 45, atk: 30, def: 35, spa: 20, spd: 20, spe: 45},
	},
	metapod: {
		inherit: true,
		baseStats: {hp: 50, atk: 20, def: 55, spa: 25, spd: 25, spe: 30},
	},
	butterfree: {
		inherit: true,
		baseStats: {hp: 60, atk: 45, def: 50, spa: 80, spd: 80, spe: 70},
	},
	weedle: {
		inherit: true,
		baseStats: {hp: 40, atk: 35, def: 30, spa: 20, spd: 20, spe: 50},
	},
	kakuna: {
		inherit: true,
		baseStats: {hp: 45, atk: 25, def: 50, spa: 25, spd: 25, spe: 35},
	},
	beedrill: {
		inherit: true,
		baseStats: {hp: 65, atk: 80, def: 40, spa: 45, spd: 45, spe: 75},
	},
	pidgey: {
		inherit: true,
		baseStats: {hp: 40, atk: 45, def: 40, spa: 35, spd: 35, spe: 56},
	},
	pidgeotto: {
		inherit: true,
		baseStats: {hp: 63, atk: 60, def: 55, spa: 50, spd: 50, spe: 71},
	},
	pidgeot: {
		inherit: true,
		baseStats: {hp: 83, atk: 80, def: 75, spa: 70, spd: 70, spe: 91},
	},
	rattata: {
		inherit: true,
		baseStats: {hp: 30, atk: 56, def: 35, spa: 25, spd: 25, spe: 72},
	},
	raticate: {
		inherit: true,
		baseStats: {hp: 55, atk: 81, def: 60, spa: 50, spd: 50, spe: 97},
	},
	spearow: {
		inherit: true,
		baseStats: {hp: 40, atk: 60, def: 30, spa: 31, spd: 31, spe: 70},
	},
	fearow: {
		inherit: true,
		baseStats: {hp: 65, atk: 90, def: 65, spa: 61, spd: 61, spe: 100},
	},
	ekans: {
		inherit: true,
		baseStats: {hp: 35, atk: 60, def: 44, spa: 40, spd: 40, spe: 55},
	},
	arbok: {
		inherit: true,
		baseStats: {hp: 60, atk: 85, def: 69, spa: 65, spd: 65, spe: 80},
	},
	pikachu: {
		inherit: true,
		baseStats: {hp: 35, atk: 55, def: 30, spa: 50, spd: 50, spe: 90},
		prevo: "Pichu",
		evoLevel: 12,
		evos: ["Raichu", "Raichu-Alola"],
	},
	raichu: {
		inherit: true,
		baseStats: {hp: 60, atk: 90, def: 55, spa: 90, spd: 90, spe: 100},
		evos: ["Gorochu"],
	},
	sandshrew: {
		inherit: true,
		baseStats: {hp: 50, atk: 75, def: 85, spa: 30, spd: 30, spe: 40},
	},
	sandslash: {
		inherit: true,
		baseStats: {hp: 75, atk: 100, def: 110, spa: 55, spd: 55, spe: 65},
	},
	nidoranf: {
		inherit: true,
		baseStats: {hp: 55, atk: 47, def: 52, spa: 40, spd: 40, spe: 41},
	},
	nidorina: {
		inherit: true,
		baseStats: {hp: 70, atk: 62, def: 67, spa: 55, spd: 55, spe: 56}, //Nidoreign legality is hardcoded in learnsets.ts
	},
	nidoqueen: {
		inherit: true,
		baseStats: {hp: 90, atk: 82, def: 87, spa: 75, spd: 75, spe: 76}, 
		evoLevel: 40, //nidos evolved via level-up in the prototype and is being used to assist with Nidoreign implementation
	},
	nidoranm: {
		inherit: true,
		baseStats: {hp: 46, atk: 57, def: 40, spa: 40, spd: 40, spe: 50},
	},
	nidorino: {
		inherit: true,
		baseStats: {hp: 61, atk: 72, def: 57, spa: 55, spd: 55, spe: 65},
		evos: ["Nidoking", "Nidoreign"],
	},
	nidoking: {
		inherit: true,
		baseStats: {hp: 81, atk: 92, def: 77, spa: 75, spd: 75, spe: 85},
		prevo: "Nidorino",
		evoLevel: 40,
	},
	clefairy: {
		inherit: true,
		baseStats: {hp: 70, atk: 45, def: 48, spa: 60, spd: 60, spe: 35},
		prevo: "Cleffa",
		evoLevel: 12,
	},
	clefable: {
		inherit: true,
		baseStats: {hp: 95, atk: 70, def: 73, spa: 85, spd: 85, spe: 60},
	},
	vulpix: {
		inherit: true,
		baseStats: {hp: 38, atk: 41, def: 40, spa: 65, spd: 65, spe: 65},
		prevo: "Mikon",
		evoLevel: 13,
	},
	ninetales: {
		inherit: true,
		baseStats: {hp: 73, atk: 76, def: 75, spa: 100, spd: 100, spe: 100},
	},
	jigglypuff: {
		inherit: true,
		baseStats: {hp: 115, atk: 45, def: 20, spa: 25, spd: 25, spe: 20},
		prevo: "Igglybuff",
		evoLevel: 12,
	},
	wigglytuff: {
		inherit: true,
		baseStats: {hp: 140, atk: 70, def: 45, spa: 50, spd: 50, spe: 45},
	},
	zubat: {
		inherit: true,
		baseStats: {hp: 40, atk: 45, def: 35, spa: 40, spd: 40, spe: 55},
		prevo: "Bittybat",
		evoLevel: 26,
	},
	golbat: {
		inherit: true,
		baseStats: {hp: 75, atk: 80, def: 70, spa: 75, spd: 75, spe: 90},
		evos: ["Crobat"],
	},
	oddish: {
		inherit: true,
		baseStats: {hp: 45, atk: 50, def: 55, spa: 75, spd: 75, spe: 30},
	},
	gloom: {
		inherit: true,
		baseStats: {hp: 60, atk: 65, def: 70, spa: 85, spd: 85, spe: 40},
		evos: ["Vileplume", "Bellossom"],
	},
	vileplume: {
		inherit: true,
		baseStats: {hp: 75, atk: 80, def: 85, spa: 100, spd: 100, spe: 50},
	},
	paras: {
		inherit: true,
		baseStats: {hp: 35, atk: 70, def: 55, spa: 55, spd: 55, spe: 25},
		prevo: "Para",
		evoLevel: 12,
	},
	parasect: {
		inherit: true,
		baseStats: {hp: 60, atk: 95, def: 80, spa: 80, spd: 80, spe: 30},
	},
	venonat: {
		inherit: true,
		baseStats: {hp: 60, atk: 55, def: 50, spa: 40, spd: 40, spe: 45},
	},
	venomoth: {
		inherit: true,
		baseStats: {hp: 70, atk: 65, def: 60, spa: 90, spd: 90, spe: 90},
	},
	diglett: {
		inherit: true,
		baseStats: {hp: 10, atk: 55, def: 25, spa: 45, spd: 45, spe: 95},
	},
	dugtrio: {
		inherit: true,
		baseStats: {hp: 35, atk: 80, def: 50, spa: 70, spd: 70, spe: 120},
	},
	meowth: {
		inherit: true,
		baseStats: {hp: 40, atk: 45, def: 35, spa: 40, spd: 40, spe: 90},
		prevo: "Konya",
		evoLevel: 14,
	},
	persian: {
		inherit: true,
		baseStats: {hp: 65, atk: 70, def: 60, spa: 65, spd: 65, spe: 115},
	},
	psyduck: {
		inherit: true,
		baseStats: {hp: 50, atk: 52, def: 48, spa: 50, spd: 50, spe: 55},
		evos: ["Golduck"],
	},
	golduck: {
		inherit: true,
		baseStats: {hp: 80, atk: 82, def: 78, spa: 80, spd: 80, spe: 85},
		prevo: "Weirduck",
		evoLevel: 41,
	},
	mankey: {
		inherit: true,
		baseStats: {hp: 40, atk: 80, def: 35, spa: 35, spd: 35, spe: 70},
	},
	primeape: {
		inherit: true,
		baseStats: {hp: 65, atk: 105, def: 60, spa: 60, spd: 60, spe: 95},
		evos: ["Annihilape"],
	},
	growlithe: {
		inherit: true,
		baseStats: {hp: 55, atk: 70, def: 45, spa: 50, spd: 50, spe: 60},
		prevo: "Pudi",
		evoLevel: 13,
	},
	arcanine: {
		inherit: true,
		baseStats: {hp: 90, atk: 110, def: 80, spa: 80, spd: 80, spe: 95},
	},
	poliwag: {
		inherit: true,
		baseStats: {hp: 40, atk: 50, def: 40, spa: 40, spd: 40, spe: 90},
	},
	poliwhirl: {
		inherit: true,
		baseStats: {hp: 65, atk: 65, def: 65, spa: 50, spd: 50, spe: 90},
		evos: ["Poliwrath", "Politoed"],
	},
	poliwrath: {
		inherit: true,
		baseStats: {hp: 90, atk: 85, def: 95, spa: 70, spd: 70, spe: 70},
	},
	abra: {
		inherit: true,
		baseStats: {hp: 25, atk: 20, def: 15, spa: 105, spd: 105, spe: 90},
	},
	kadabra: {
		inherit: true,
		baseStats: {hp: 40, atk: 35, def: 30, spa: 120, spd: 120, spe: 105},
	},
	alakazam: {
		inherit: true,
		baseStats: {hp: 55, atk: 50, def: 45, spa: 135, spd: 135, spe: 120},
	},
	machop: {
		inherit: true,
		baseStats: {hp: 70, atk: 80, def: 50, spa: 35, spd: 35, spe: 35},
	},
	machoke: {
		inherit: true,
		baseStats: {hp: 80, atk: 100, def: 70, spa: 50, spd: 50, spe: 45},
	},
	machamp: {
		inherit: true,
		baseStats: {hp: 90, atk: 130, def: 80, spa: 65, spd: 65, spe: 55},
	},
	bellsprout: {
		inherit: true,
		baseStats: {hp: 50, atk: 75, def: 35, spa: 70, spd: 70, spe: 40},
	},
	weepinbell: {
		inherit: true,
		baseStats: {hp: 65, atk: 90, def: 50, spa: 85, spd: 85, spe: 55},
		evos: ["Victreebel", "Tsubomitto"],
	},
	victreebel: {
		inherit: true,
		baseStats: {hp: 80, atk: 105, def: 65, spa: 100, spd: 100, spe: 70},
	},
	tentacool: {
		inherit: true,
		baseStats: {hp: 40, atk: 40, def: 35, spa: 100, spd: 100, spe: 70},
	},
	tentacruel: {
		inherit: true,
		baseStats: {hp: 80, atk: 70, def: 65, spa: 120, spd: 120, spe: 100},
	},
	geodude: {
		inherit: true,
		baseStats: {hp: 40, atk: 80, def: 100, spa: 30, spd: 30, spe: 20},
	},
	graveler: {
		inherit: true,
		baseStats: {hp: 55, atk: 95, def: 115, spa: 45, spd: 45, spe: 35},
	},
	golem: {
		inherit: true,
		baseStats: {hp: 80, atk: 110, def: 130, spa: 55, spd: 55, spe: 45},
	},
	ponyta: {
		inherit: true,
		baseStats: {hp: 50, atk: 85, def: 55, spa: 65, spd: 65, spe: 90},
		prevo: "Puchikoon",
		evoLevel: 20,
	},
	rapidash: {
		inherit: true,
		baseStats: {hp: 65, atk: 100, def: 70, spa: 80, spd: 80, spe: 105},
	},
	slowpoke: {
		inherit: true,
		baseStats: {hp: 90, atk: 65, def: 65, spa: 40, spd: 40, spe: 15},
		evos: ["Slowbro", "Slowking"],
	},
	slowbro: {
		inherit: true,
		baseStats: {hp: 95, atk: 75, def: 110, spa: 80, spd: 80, spe: 30},
	},
	magnemite: {
		inherit: true,
		types: ["Electric"],
		baseStats: {hp: 25, atk: 35, def: 70, spa: 95, spd: 95, spe: 45},
		evos: ["Magnetite"],
	},
	magneton: {
		inherit: true,
		types: ["Electric"],
		baseStats: {hp: 50, atk: 60, def: 95, spa: 120, spd: 120, spe: 70},
		prevo: "Magnetite",
		evoLevel: 30,
		evos: ["Magnezone"],
	},
	farfetchd: {
		inherit: true,
		baseStats: {hp: 52, atk: 65, def: 55, spa: 58, spd: 58, spe: 60},
		evos: ["Madaamu"],
	},
	doduo: {
		inherit: true,
		baseStats: {hp: 35, atk: 85, def: 45, spa: 35, spd: 35, spe: 75},
		prevo: "Hinaazu",
		evoLevel: 16,
	},
	dodrio: {
		inherit: true,
		baseStats: {hp: 60, atk: 110, def: 70, spa: 60, spd: 60, spe: 100},
	},
	seel: {
		inherit: true,
		baseStats: {hp: 65, atk: 45, def: 55, spa: 70, spd: 70, spe: 45},
	},
	dewgong: {
		inherit: true,
		baseStats: {hp: 90, atk: 70, def: 80, spa: 95, spd: 95, spe: 70},
	},
	grimer: {
		inherit: true,
		baseStats: {hp: 80, atk: 80, def: 50, spa: 40, spd: 40, spe: 25},
		prevo: "Betobebii",
		evoLevel: 19,
	},
	muk: {
		inherit: true,
		baseStats: {hp: 105, atk: 105, def: 75, spa: 65, spd: 65, spe: 50},
	},
	shellder: {
		inherit: true,
		baseStats: {hp: 30, atk: 65, def: 100, spa: 45, spd: 45, spe: 40},
		evos: ["Cloyster", "Taaban"],
	},
	cloyster: {
		inherit: true,
		baseStats: {hp: 50, atk: 95, def: 180, spa: 85, spd: 85, spe: 70},
	},
	gastly: {
		inherit: true,
		baseStats: {hp: 30, atk: 35, def: 30, spa: 100, spd: 100, spe: 80},
	},
	haunter: {
		inherit: true,
		baseStats: {hp: 45, atk: 50, def: 45, spa: 115, spd: 115, spe: 95},
	},
	gengar: {
		inherit: true,
		baseStats: {hp: 60, atk: 65, def: 60, spa: 130, spd: 130, spe: 110},
	},
	onix: {
		inherit: true,
		baseStats: {hp: 35, atk: 45, def: 160, spa: 30, spd: 30, spe: 70},
	},
	drowzee: {
		inherit: true,
		baseStats: {hp: 60, atk: 48, def: 45, spa: 90, spd: 90, spe: 42},
	},
	hypno: {
		inherit: true,
		baseStats: {hp: 85, atk: 73, def: 70, spa: 115, spd: 115, spe: 67},
	},
	krabby: {
		inherit: true,
		baseStats: {hp: 30, atk: 105, def: 90, spa: 25, spd: 25, spe: 50},
	},
	kingler: {
		inherit: true,
		baseStats: {hp: 55, atk: 130, def: 115, spa: 50, spd: 50, spe: 75},
	},
	voltorb: {
		inherit: true,
		baseStats: {hp: 40, atk: 30, def: 50, spa: 55, spd: 55, spe: 100},
	},
	electrode: {
		inherit: true,
		baseStats: {hp: 60, atk: 50, def: 70, spa: 80, spd: 80, spe: 140},
	},
	exeggcute: {
		inherit: true,
		baseStats: {hp: 60, atk: 40, def: 80, spa: 60, spd: 60, spe: 40},
	},
	exeggutor: {
		inherit: true,
		baseStats: {hp: 95, atk: 95, def: 85, spa: 125, spd: 125, spe: 55},
	},
	cubone: {
		inherit: true,
		baseStats: {hp: 50, atk: 50, def: 95, spa: 40, spd: 40, spe: 35},
	},
	marowak: {
		inherit: true,
		baseStats: {hp: 60, atk: 80, def: 110, spa: 50, spd: 50, spe: 45},
	},
	hitmonlee: {
		inherit: true,
		baseStats: {hp: 50, atk: 120, def: 53, spa: 35, spd: 35, spe: 87},
		prevo: "Tyrogue",
		evoLevel: 16,
	},
	hitmonchan: {
		inherit: true,
		baseStats: {hp: 50, atk: 105, def: 79, spa: 35, spd: 35, spe: 76},
		prevo: "Tyrogue",
		evoLevel: 17, //the weird condition doesn't exist so let's do this
	},
	lickitung: {
		inherit: true,
		baseStats: {hp: 90, atk: 55, def: 75, spa: 60, spd: 60, spe: 30},
		evos: ["Lickilicky"],
	},
	koffing: {
		inherit: true,
		baseStats: {hp: 40, atk: 65, def: 95, spa: 60, spd: 60, spe: 35},
	},
	weezing: {
		inherit: true,
		baseStats: {hp: 65, atk: 90, def: 120, spa: 85, spd: 85, spe: 60},
	},
	rhyhorn: {
		inherit: true,
		baseStats: {hp: 80, atk: 85, def: 95, spa: 30, spd: 30, spe: 25},
	},
	rhydon: {
		inherit: true,
		baseStats: {hp: 105, atk: 130, def: 120, spa: 45, spd: 45, spe: 40},
		evos: ["Rhyperior"],
	},
	chansey: {
		inherit: true,
		baseStats: {hp: 250, atk: 5, def: 5, spa: 105, spd: 105, spe: 50},
		prevo: "Happiny",
		evoLevel: 20,
		evos: ["Blissey"],
	},
	tangela: {
		inherit: true,
		baseStats: {hp: 65, atk: 55, def: 115, spa: 100, spd: 100, spe: 60},
		evos: ["Tangrowth"],
		prevo: "Monja",
		evoLevel: 13,
	},
	kangaskhan: {
		inherit: true,
		baseStats: {hp: 105, atk: 95, def: 80, spa: 40, spd: 40, spe: 90},
	},
	horsea: {
		inherit: true,
		baseStats: {hp: 30, atk: 40, def: 70, spa: 70, spd: 70, spe: 60},
	},
	seadra: {
		inherit: true,
		baseStats: {hp: 55, atk: 65, def: 95, spa: 95, spd: 95, spe: 85},
		evos: ["Kingdra"],
	},
	goldeen: {
		inherit: true,
		baseStats: {hp: 45, atk: 67, def: 60, spa: 50, spd: 50, spe: 63},
		prevo: "Gyopin",
		evoLevel: 22,
	},
	seaking: {
		inherit: true,
		baseStats: {hp: 80, atk: 92, def: 65, spa: 80, spd: 80, spe: 68},
	},
	staryu: {
		inherit: true,
		baseStats: {hp: 30, atk: 45, def: 55, spa: 70, spd: 70, spe: 85},
	},
	starmie: {
		inherit: true,
		baseStats: {hp: 60, atk: 75, def: 85, spa: 100, spd: 100, spe: 115},
	},
	mrmime: {
		inherit: true,
		baseStats: {hp: 40, atk: 45, def: 65, spa: 100, spd: 100, spe: 90},
		prevo: "Mime Jr.", //test this one
	},
	scyther: {
		inherit: true,
		baseStats: {hp: 70, atk: 110, def: 80, spa: 55, spd: 55, spe: 105},
		evos: ["Scizor", "Kleavor"],
	},
	jynx: {
		inherit: true,
		baseStats: {hp: 65, atk: 50, def: 35, spa: 95, spd: 95, spe: 95},
		prevo: "Smoochum",
		evoLevel: 16,
	},
	electabuzz: {
		inherit: true,
		baseStats: {hp: 65, atk: 83, def: 57, spa: 85, spd: 85, spe: 105},
		prevo: "Elekid",
		evoLevel: 16,
		evos: ["Electivire"],
	},
	magmar: {
		inherit: true,
		baseStats: {hp: 65, atk: 95, def: 57, spa: 85, spd: 85, spe: 93},
		prevo: "Magby",
		evoLevel: 16,
		evos: ["Magmortar"],
	},
	pinsir: {
		inherit: true,
		baseStats: {hp: 65, atk: 125, def: 100, spa: 55, spd: 55, spe: 85},
		evos: ["Purakkusu"],
	},
	tauros: {
		inherit: true,
		baseStats: {hp: 75, atk: 100, def: 95, spa: 70, spd: 70, spe: 110},
	},
	magikarp: {
		inherit: true,
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	gyarados: {
		inherit: true,
		baseStats: {hp: 95, atk: 125, def: 79, spa: 100, spd: 100, spe: 81},
	},
	lapras: {
		inherit: true,
		baseStats: {hp: 130, atk: 85, def: 80, spa: 95, spd: 95, spe: 60},
	},
	ditto: {
		inherit: true,
		baseStats: {hp: 48, atk: 48, def: 48, spa: 48, spd: 48, spe: 48},
		evos: ["Animon"],
	},
	eevee: {
		inherit: true,
		baseStats: {hp: 55, atk: 55, def: 50, spa: 65, spd: 65, spe: 55},
		evos: ["Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Sylveon"],
	},
	vaporeon: {
		inherit: true,
		baseStats: {hp: 130, atk: 65, def: 60, spa: 110, spd: 110, spe: 65},
	},
	jolteon: {
		inherit: true,
		baseStats: {hp: 65, atk: 65, def: 60, spa: 110, spd: 110, spe: 130},
	},
	flareon: {
		inherit: true,
		baseStats: {hp: 65, atk: 130, def: 60, spa: 110, spd: 110, spe: 65},
	},
	porygon: {
		inherit: true,
		baseStats: {hp: 65, atk: 60, def: 70, spa: 75, spd: 75, spe: 40},
		evos: ["Porygon2", "Porygon-Z"],
	},
	omanyte: {
		inherit: true,
		baseStats: {hp: 35, atk: 40, def: 100, spa: 90, spd: 90, spe: 35},
	},
	omastar: {
		inherit: true,
		baseStats: {hp: 70, atk: 60, def: 125, spa: 115, spd: 115, spe: 55},
	},
	kabuto: {
		inherit: true,
		baseStats: {hp: 30, atk: 80, def: 90, spa: 45, spd: 45, spe: 55},
	},
	kabutops: {
		inherit: true,
		baseStats: {hp: 60, atk: 115, def: 105, spa: 70, spd: 70, spe: 80},
	},
	aerodactyl: {
		inherit: true,
		baseStats: {hp: 80, atk: 105, def: 65, spa: 60, spd: 60, spe: 130},
	},
	snorlax: {
		inherit: true,
		baseStats: {hp: 160, atk: 110, def: 65, spa: 65, spd: 65, spe: 30},
		prevo: "Munchlax",
		evoLevel: 30,
	},
	articuno: {
		inherit: true,
		baseStats: {hp: 90, atk: 85, def: 100, spa: 125, spd: 125, spe: 85},
	},
	zapdos: {
		inherit: true,
		baseStats: {hp: 90, atk: 90, def: 85, spa: 125, spd: 125, spe: 100},
	},
	moltres: {
		inherit: true,
		baseStats: {hp: 90, atk: 100, def: 90, spa: 125, spd: 125, spe: 90},
	},
	dratini: {
		inherit: true,
		baseStats: {hp: 41, atk: 64, def: 45, spa: 50, spd: 50, spe: 50},
	},
	dragonair: {
		inherit: true,
		baseStats: {hp: 61, atk: 84, def: 65, spa: 70, spd: 70, spe: 70},
	},
	dragonite: {
		inherit: true,
		baseStats: {hp: 91, atk: 134, def: 95, spa: 100, spd: 100, spe: 80},
	},
	mewtwo: {
		inherit: true,
		baseStats: {hp: 106, atk: 110, def: 90, spa: 154, spd: 154, spe: 130},
	},
	mew: {
		inherit: true,
		baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100},
	},
	// 8888ba.88ba                    oo dP                                  
	// 88  `8b  `8b                      88                                  
	// 88   88   88 .d8888b. .d8888b. dP 88  .dP  .d8888b. 88d888b. 88d888b. 
	// 88   88   88 88'  `88 88'  `88 88 88888"   88'  `88 88'  `88 88'  `88 
	// 88   88   88 88.  .88 88.  .88 88 88  `8b. 88.  .88 88       88.  .88 
	// dP   dP   dP `88888P8 `8888P88 dP dP   `YP `88888P8 dP       88Y888P' 
	// 						   .88                               88       
	// 					   d8888P                                dP       
	// 	   dP                              
	// 	   88                              
	// 	   88 dP    dP 88d8b.d8b. 88d888b. 
	// 	   88 88    88 88'`88'`88 88'  `88 
	// 88.  .d8P 88.  .88 88  88  88 88.  .88 
	//  `Y8888'  `88888P' dP  dP  dP 88Y888P' 
	// 							  88       
	// 							  dP       
	//  88888888b                                       
	//  88                                              
	// a88aaaa    .d8888b. 88d888b. 88d8b.d8b. .d8888b. 
	//  88        88'  `88 88'  `88 88'`88'`88 Y8ooooo. 
	//  88        88.  .88 88       88  88  88       88 
	//  dP        `88888P' dP       dP  dP  dP `88888P' 
	// These are the Magikarp formes from Magikarp Jump, done by Albatross on Christmas. She is insane and so am I.
	magikarpskelly: {
		inherit: true,
		num: -9006,
		name: "Magikarp-Skelly",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarpcalicoorange: {
		inherit: true,
		num: -9007,
		name: "Magikarp-Calico-Orange",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarpcalicowhite: {
		inherit: true,
		num: -9008,
		name: "Magikarp-Calico-White",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarpcalicoblack: {
		inherit: true,
		num: -9009,
		name: "Magikarp-Calico-Black",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarpcalicogold: {
		inherit: true,
		num: -9010,
		name: "Magikarp-Calico-Gold",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarporangetwotone: {
		inherit: true,
		num: -9011,
		name: "Magikarp-Orange-Two-Tone",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarporangeorca: {
		inherit: true,
		num: -9012,
		name: "Magikarp-Orange-Orca",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarporangedapples: {
		inherit: true,
		num: -9013,
		name: "Magikarp-Orange-Dapples",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarppinktwotone: {
		inherit: true,
		num: -9014,
		name: "Magikarp-Pink-Two-Tone",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarppinkorca: {
		inherit: true,
		num: -9015,
		name: "Magikarp-Pink-Orca",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarppinkdapples: {
		inherit: true,
		num: -9016,
		name: "Magikarp-Pink-Dapples",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarpgraybubbles: {
		inherit: true,
		num: -9017,
		name: "Magikarp-Gray-Bubbles",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarpgraydiamonds: {
		inherit: true,
		num: -9018,
		name: "Magikarp-Gray-Diamonds",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarpgraypatches: {
		inherit: true,
		num: -9019,
		name: "Magikarp-Gray-Patches",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarppurplebubbles: {
		inherit: true,
		num: -9020,
		name: "Magikarp-Purple-Bubbles",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarppurplediamonds: {
		inherit: true,
		num: -9021,
		name: "Magikarp-Purple-Diamonds",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarppurplepatches: {
		inherit: true,
		num: -9022,
		name: "Magikarp-Purple-Patches",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarpapricottiger: {
		inherit: true,
		num: -9023,
		name: "Magikarp-Apricot-Tiger",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarpapricotzebra: {
		inherit: true,
		num: -9024,
		name: "Magikarp-Apricot-Zebra",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarpapricotstripes: {
		inherit: true,
		num: -9025,
		name: "Magikarp-Apricot-Stripes",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarpbrowntiger: {
		inherit: true,
		num: -9026,
		name: "Magikarp-Brown-Tiger",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarpbrownzebra: {
		inherit: true,
		num: -9027,
		name: "Magikarp-Brown-Zebra",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarpbrownstripes: {
		inherit: true,
		num: -9028,
		name: "Magikarp-Brown-Stripes",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarporangeforehead: {
		inherit: true,
		num: -9029,
		name: "Magikarp-Orange-Forehead",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarporangemask: {
		inherit: true,
		num: -9030,
		name: "Magikarp-Orange-Mask",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarpblackforehead: {
		inherit: true,
		num: -9031,
		name: "Magikarp-Black-Forehead",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarpblackmask: {
		inherit: true,
		num: -9032,
		name: "Magikarp-Black-Mask",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarpsaucyblue: {
		inherit: true,
		num: -9033,
		name: "Magikarp-Saucy-Blue",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarpblueraindrops: {
		inherit: true,
		num: -9034,
		name: "Magikarp-Blue-Raindrops",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarpsaucyviolet: {
		inherit: true,
		num: -9035,
		name: "Magikarp-Saucy-Violet",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarpvioletraindrops: {
		inherit: true,
		num: -9036,
		name: "Magikarp-Violet-Raindrops",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
	magikarpgold: {
		inherit: true,
		num: -9037,
		name: "Magikarp-Gold",
		baseSpecies: "Magikarp",
		forme: "Jump",
		types: ["Water"],
		abilities: {},
		baseStats: {hp: 20, atk: 10, def: 55, spa: 20, spd: 20, spe: 80},
	},
};
