// ALL INHERITED FROM M4A EXCEPT WHERE NOTED

const data: {[k: string]: ModdedSpeciesFormatsData} = {
	butterfreemega: {},
	raichumega: {},
	nidoqueenmega: {},
	nidokingmega: {},
	clefablemega: {},
	ninetalesalolamega: {},
	parasectmega: {},
	dugtriomega: {},
	rapidashmega: {},
	dodriomega: {},
	electrodemega: {},
	starmiemega: {},
	vaporeonmega: {},
	jolteonmega: {},
	flareonmega: {},
	dragonitemega: {},
	meganiummega: {},
	typhlosionmega: {},
	feraligatrmega: {},
	ariadosmega: {},
	lanturnmega: {},
	slowkingmega: {},
	magcargomega: {},
	delibirdmega: {},
	mightyenamega: {},
	exploudmega: {},
	flygonmega: {},
	cacturnemega: {},
	walreinmega: {},
	regirockmega: {},
	regicemega: {},
	registeelmega: {},
	torterramega: {},
	infernapemega: {},
	empoleonmega: {},
	luxraymega: {},
	staraptormega: {},
	bibarelmega: {},
	kricketunemega: {},
	bastiodonmega: {},
	floatzelmega: {},
	mismagiusmega: {},
	honchkrowmega: {},
	spiritombmega: {},
	drapionmega: {},
	electiviremega: {},
	magmortarmega: {},
	porygonzmega: {},
	froslassmega: {},
	samurottmega: {},
	stoutlandmega: {},
	simisearmega: {},
	zebstrikamega: {},
	leavannymega: {},
	gigalithmega: {},
	conkeldurrmega: {},
	krookodilemega: {},
	archeopsmega: {},
	garbodormega: {},
	zoroarkmega: {},
	cinccinomega: {},
	gothitellemega: {},
	reuniclusmega: {},
	vanilluxemega: {},
	sawsbuckmega: {},
	sawsbucksummermega: {},
	sawsbuckautumnmega: {},
	sawsbuckwintermega: {},
	klinklangmega: {},
	eelektrossmega: {},
	chandeluremega: {},
	bisharpmega: {},
	hydreigonmega: {},
	delphoxmega: {},
	talonflamemega: {},
	meowsticmega: {},
	meowsticfmega: {},
	dragalgemega: {},
	tyrantrummega: {},
	aurorusmega: {},
	hawluchamega: {},
	trevenantmega: {},
	gourgeistmega: {},
	gourgeistsmallmega: {},
	gourgeistlargemega: {},
	gourgeistsupermega: {},
	goodramega: {},
	noivernmega: {},
	decidueyemega: {},
	incineroarmega: {},
	primarinamega: {},
	toucannonmega: {},
	gumshoosmega: {},
	vikavoltmega: {},
	lycanrocmega: {},
	lycanrocmidnightmega: {},
	lycanrocduskmega: {},
	wishiwashimega: {},
	mudsdalemega: {},
	araquanidmega: {},
	lurantismega: {},
	silvallymega: {},
	mimikyumega: {},
	dhelmisemega: {},
	kommoomega: {},
	rillaboommega: {},
	cinderacemega: {},
	inteleonmega: {},
	corviknightmega: {},
	orbeetlemega: {},
	thievulmega: {},
	boltundmega: {},
	toxtricityampedmega: {},
	toxtricitylowkeymega: {},
	obstagoonmega: {},
	sirfetchdmega: {},
	falinksmega: {},
	dragapultmega: {},
	wishiwashimega1: { tier: "Tier 3 Mega" },
	wishiwashimega2: { tier: "Tier 3 Mega" },
	wishiwashimega3: { tier: "Tier 3 Mega" },
	wishiwashimega4: { tier: "Tier 3 Mega" },
	wishiwashimegaschool: { tier: "Tier 3 Mega" },
	mimikyubustedmega: { tier: "Undecided" },
	falinksmegacombat: { tier: "Tier 3 Mega" },
	darmanitanzen: { tier: "Underrated" },
	mimikyubusted: { tier: "Underrated" },
	cramorantgulping: { tier: "Underrated" },
	cramorantgorging: { tier: "Underrated" },
	sinisteaantique: { tier: "Underrated" },
	polteageistantique: { tier: "Underrated" },
	eiscuenoice: { tier: "Underrated" },
	morpekohangry: { tier: "Underrated" },
	// slate 39
	slowkinggalarmega: {},
	// slate 40
	guzzlordmega: {},
	// slate 41
	lickilickymega: {},
	tsareenamega: {},
	grapploctmega: {},
	// slate 42
	snorlaxmega: {},
	swalotmega: {},
	wailordmega: {},
	// SANDBOX (NEW)
	floetteeternalmega: {},
	meltanmega: {},
	pichuspikyearedmega: {},
	porygodzmega: {},
	stoutlandmegau: {},
	growlithehisui: {},
	arcaninehisui: {},
	voltorbhisui: {},
	electrodehisui: {},
	typhlosionhisui: {},
	qwilfishhisui: {},
	overqwil: {},
	sneaselhisui: {},
	sneasler: {},
	dialgaorigin: {},
	palkiaorigin: {},
	samurotthisui: {},
	lilliganthisui: {},
	basculinwhitestriped: {},
	basculegion: {},
	basculegionf: {},
	zoruahisui: {},
	zoroarkhisui: {},
	braviaryhisui: {},
	sliggoohisui: {},
	goodrahisui: {},
	avalugghisui: {},
	decidueyehisui: {},
	wyrdeer: {},
	kleavor: {},
	ursaluna: {},
	enamorus: {},
	enamorustherian: {},
};

const randomMoves = (mon: string, moves: string) => {
	if (!data[mon]) data[mon] = {};
	data[mon].randomBattleMoves = moves;
};
randomMoves("venusaurmega", ["gigadrain", "sludgebomb", "hiddenpowerfire", "synthesis", "leechseed", "earthquake"]);
randomMoves("charizardmegax", ["dragondance", "flareblitz", "dragonclaw", "earthquake", "roost", "willowisp"]);
randomMoves("charizardmegay", ["fireblast", "airslash", "roost", "solarbeam", "focusblast", "dragonpulse"]);
randomMoves("blastoisemega", ["icebeam", "hydropump", "rapidspin", "scald", "dragontail", "darkpulse", "aurasphere"]);
randomMoves("butterfree", ["sleeppowder", "quiverdance", "bugbuzz", "hurricane", "energyball", "hiddenpowerground"]);
randomMoves("butterfreemega", ["sleeppowder", "quiverdance", "bugbuzz", "hurricane", "earthpower"]);
randomMoves("beedrill", ["toxicspikes", "tailwind", "uturn", "endeavor", "poisonjab", "knockoff"]);
randomMoves("beedrillmega", ["xscissor", "swordsdance", "uturn", "poisonjab", "drillrun", "knockoff"]);
randomMoves("pidgeot", ["roost", "bravebird", "heatwave", "return", "uturn", "defog"]);
randomMoves("pidgeotmega", ["roost", "heatwave", "uturn", "hurricane", "defog"]);
randomMoves("raticate", ["protect", "facade", "stompingtantrum", "suckerpunch", "uturn", "swordsdance"]);
// randomMoves("raticatemega, );
randomMoves("raticatealola", ["swordsdance", "return", "suckerpunch", "knockoff", "doubleedge"]);
// randomMoves("raticatealolatotem, );
// randomMoves("raticatealolamega, );
randomMoves("fearow", ["return", "drillpeck", "doubleedge", "uturn", "pursuit", "drillrun"]);
// randomMoves("fearowmega, );
randomMoves("arbok", ["coil", "gunkshot", "suckerpunch", "aquatail", "earthquake", "rest"]);
// randomMoves("arbokmega, );
randomMoves("pikachu", ["volttackle", "voltswitch", "grassknot", "hiddenpowerice", "knockoff", "irontail"]);
randomMoves("raichu", ["nastyplot", "encore", "thunderbolt", "grassknot", "hiddenpowerice", "focusblast", "voltswitch"]);
randomMoves("raichualola", ["nastyplot", "thunderbolt", "psyshock", "focusblast", "voltswitch", "surf", "knockoff", "extremespeed"]);
randomMoves("raichumega", ["hijumpkick", "volttackle", "voltswitch", "surf", "hiddenpowerice", "fakeout", "grassknot"]);
// randomMoves("raichualolamega, );
randomMoves("sandslash", ["earthquake", "swordsdance", "rapidspin", "toxic", "stealthrock", "knockoff"]);
randomMoves("sandslashalola", ["honeclaws", "tripleaxel", "ironhead", "earthquake", "rapidspin", "stealthrock", "knockoff"]);
// randomMoves("sandslashmega, );
// randomMoves("sandslashalolamega, );
randomMoves("nidoqueen", ["toxicspikes", "stealthrock", "fireblast", "icebeam", "earthpower", "sludgewave"]);
randomMoves("nidoqueenmega", ["toxicspikes", "stealthrock", "icebeam", "earthpower", "sludgewave", "milkdrink"]);
randomMoves("nidoking", ["substitute", "fireblast", "icebeam", "earthpower", "sludgewave", "superpower"]);
randomMoves("nidokingmega", ["earthquake", "aquatail", "firepunch", "honeclaws", "counter", "superpower", "icepunch", "poisonjab", "gunkshot"]);
randomMoves("clefable", ["calmmind", "softboiled", "fireblast", "moonblast", "stealthrock", "thunderwave"]);
randomMoves("clefablemega", ["moonblast", "hex", "willowisp", "thunderwave", "softboiled", "curse", "moonlight"]);
randomMoves("ninetales", ["fireblast", "willowisp", "solarbeam", "nastyplot", "substitute", "psyshock"]);
randomMoves("ninetalesalola", ["nastyplot", "blizzard", "moonblast", "substitute", "hiddenpowerfire", "freezedry", "auroraveil"]);
// randomMoves("ninetalesmega, );
randomMoves("ninetalesalolamega", ["nastyplot", "blizzard", "moonblast", "substitute", "hiddenpowerfire", "freezedry", "auroraveil"]);
randomMoves("wigglytuff", ["reflect", "lightscreen", "healbell", "stealthrock", "fireblast", "dazzlinggleam"]);
// randomMoves("wigglytuffmega, );
randomMoves("crobat", ["bravebird", "roost", "toxic", "taunt", "defog", "uturn", "superfang"]);
// randomMoves("crobatmega, );
randomMoves("vileplume", ["gigadrain", "sludgebomb", "sleeppowder", "hiddenpowerfire", "aromatherapy", "strengthsap"]);
// randomMoves("vileplumemega, );
randomMoves("bellossom", ["gigadrain", "sleeppowder", "hiddenpowerrock", "quiverdance", "moonblast"]);
// randomMoves("bellossommega, );
randomMoves("parasect", ["spore", "substitute", "leechlife", "seedbomb", "leechseed", "knockoff"]);
randomMoves("parasectmega", ["spore", "leechlife", "furycutter", "knockoff", "swordsdance", "junglehealing", "taunt"]);
randomMoves("venomoth", ["sleeppowder", "quiverdance", "bugbuzz", "sludgebomb", "substitute"]);
// randomMoves("venomothmega, );
randomMoves("dugtrio", ["earthquake", "stoneedge", "stealthrock", "suckerpunch", "reversal", "substitute", "memento"]);
randomMoves("dugtrioalola", ["earthquake", "ironhead", "substitute", "toxic", "stoneedge", "suckerpunch", "stealthrock"]);
randomMoves("dugtriomega", ["dig", "earthquake", "stoneedge", "stealthrock", "suckerpunch", "reversal", "substitute", "memento"]);
// randomMoves("dugtrioalolamega, );
randomMoves("persian", ["fakeout", "uturn", "taunt", "return", "knockoff"]);
randomMoves("persianalola", ["nastyplot", "darkpulse", "powergem", "hypnosis", "hiddenpowerfighting", "partingshot"]);
// randomMoves("persianmega, );
// randomMoves("persianalolamega, );
// randomMoves("perrserkermega, );
randomMoves("golduck", ["hydropump", "scald", "icebeam", "psyshock", "encore", "calmmind", "substitute"]);
// randomMoves("golduckmega", ["hydropump", "scald", "icebeam", "expandingforce", "psyshock", "focusblast", "calmmind", "psychicterrain"]);
randomMoves("primeape", ["closecombat", "uturn", "icepunch", "stoneedge", "encore", "earthquake", "gunkshot"]);
// randomMoves("primeapemega, );
randomMoves("arcanine", ["flareblitz", "wildcharge", "extremespeed", "closecombat", "morningsun", "willowisp", "toxic", "crunch", "roar"]);
// randomMoves("arcaninemega, );
randomMoves("poliwrath", ["hydropump", "focusblast", "icepunch", "rest", "sleeptalk", "scald", "circlethrow", "raindance"]);
// randomMoves("poliwrathmega, );
randomMoves("politoed", ["scald", "toxic", "encore", "perishsong", "protect", "hypnosis", "rest"]);
// randomMoves("politoedmega, );
randomMoves("alakazam", ["psyshock", "psychic", "focusblast", "shadowball", "hiddenpowerfire"]);
randomMoves("alakazammega", ["calmmind", "psyshock", "focusblast", "shadowball", "encore", "substitute"]);
randomMoves("machamp", ["dynamicpunch", "icepunch", "stoneedge", "bulletpunch", "knockoff", "substitute"]);
// randomMoves("machampmega, );
randomMoves("victreebel", ["sleeppowder", "sludgebomb", "gigadrain", "hiddenpowerfire", "suckerpunch", "swordsdance", "powerwhip", "knockoff"]);
// randomMoves("victreebelmega, );
randomMoves("tentacruel", ["toxicspikes", "rapidspin", "scald", "sludgebomb", "acidspray", "knockoff"]);
// randomMoves("tentacruelmega, );
randomMoves("golem", ["stealthrock", "earthquake", "explosion", "suckerpunch", "toxic", "rockblast"]);
randomMoves("golemalola", ["stealthrock", "stoneedge", "return", "thunderpunch", "earthquake", "toxic"]);
// randomMoves("golemmega, );
// randomMoves("golemalolamega, );
randomMoves("rapidash", ["flareblitz", "wildcharge", "morningsun", "highhorsepower", "willowisp"]);
randomMoves("rapidashmega", ["flareblitz", "airslash", "uturn", "morningsun", "highhorsepower", "willowisp"]);
// randomMoves("rapidashgalarmega, );
randomMoves("slowbro", ["scald", "toxic", "thunderwave", "psyshock", "fireblast", "icebeam", "slackoff"]);
randomMoves("slowbromega", ["calmmind", "scald", "psyshock", "slackoff", "fireblast", "icebeam"]);
// randomMoves("slowbrogalarmega, );
randomMoves("slowking", ["scald", "fireblast", "icebeam", "psychic", "grassknot", "thunderwave", "toxic", "slackoff", "trickroom", "nastyplot", "dragontail", "psyshock"]);
randomMoves("slowkingmega", ["scald", "fireblast", "icebeam", "psychic", "grassknot", "thunderwave", "toxic", "slackoff", "trickroom", "nastyplot", "dragontail", "psyshock"]);
// randomMoves("slowkinggalar, );
// randomMoves("slowkinggalarmega, );
randomMoves("magnezone", ["thunderbolt", "substitute", "flashcannon", "hiddenpowerfire", "voltswitch"]);
// randomMoves("magnezonemega:, );
// randomMoves("{, );
randomMoves("farfetchd", ["bravebird", "swordsdance", "return", "leafblade", "roost", "knockoff"]);
// randomMoves("farfetchdmega, );
randomMoves("sirfetchdmega", ["closecombat", "playrough", "swordsdance", "roost", "grassyglide", "toxic"]);
randomMoves("dodrio", ["bravebird", "return", "swordsdance", "roost", "quickattack", "knockoff", "jumpkick"]);
// randomMoves("dodriomega, );
randomMoves("dewgong", ["surf", "icebeam", "perishsong", "encore", "toxic", "protect"]);
// randomMoves("dewgongmega, );
randomMoves("muk", ["curse", "gunkshot", "poisonjab", "shadowsneak", "icepunch", "firepunch", "memento"]);
randomMoves("mukalola", ["curse", "gunkshot", "knockoff", "poisonjab", "shadowsneak", "pursuit", "icepunch", "firepunch"]);
// randomMoves("mukmega, );
// randomMoves("mukalolamega, );
randomMoves("cloyster", ["shellsmash", "iciclespear", "hydropump", "rockblast", "iceshard", "spikes", "rapidspin"]);
// randomMoves("cloystermega, );
randomMoves("gengar", ["shadowball", "sludgewave", "focusblast", "substitute", "disable", "painsplit", "willowisp"]);
randomMoves("gengarmega", ["shadowball", "sludgewave", "focusblast", "taunt", "destinybond", "disable", "perishsong", "protect"]);
randomMoves("steelix", ["stealthrock", "earthquake", "ironhead", "roar", "toxic", "rockslide"]);
randomMoves("steelixmega", ["stealthrock", "earthquake", "heavyslam", "roar", "toxic", "dragontail"]);
randomMoves("hypno", ["psychic", "seismictoss", "foulplay", "wish", "protect", "thunderwave", "toxic"]);
// randomMoves("hypnomega, );
randomMoves("kingler", ["liquidation", "xscissor", "rockslide", "swordsdance", "agility", "superpower", "knockoff"]);
// randomMoves("kinglermega, );
randomMoves("electrode", ["voltswitch", "thunderbolt", "taunt", "foulplay", "hiddenpowergrass", "signalbeam"]);
randomMoves("electrodemega", ["voltswitch", "explosion", "taunt", "mindblown", "wildcharge"]);
randomMoves("exeggutor", ["substitute", "leechseed", "gigadrain", "psychic", "sleeppowder", "hiddenpowerfire"]);
randomMoves("exeggutoralola", ["dracometeor", "leafstorm", "flamethrower", "gigadrain", "trickroom"]);
// randomMoves("exeggutormega, );
// randomMoves("exeggutoralolamega, );
randomMoves("marowak", ["bonemerang", "earthquake", "knockoff", "doubleedge", "stoneedge", "stealthrock", "substitute"]);
randomMoves("marowakalola", ["flamecharge", "shadowbone", "bonemerang", "willowisp", "stoneedge", "flareblitz", "substitute"]);
// randomMoves("marowakalolatotem, );
// randomMoves("marowakmega, );
// randomMoves("marowakalolamega, );
randomMoves("hitmonlee", ["highjumpkick", "knockoff", "stoneedge", "rapidspin", "machpunch", "poisonjab", "fakeout"]);
// randomMoves("hitmonleemega, );
randomMoves("hitmonchan", ["bulkup", "drainpunch", "icepunch", "firepunch", "machpunch", "rapidspin"]);
// randomMoves("hitmonchanmega, );
randomMoves("hitmontop", ["suckerpunch", "stoneedge", "rapidspin", "closecombat", "toxic"]);
// randomMoves("hitmontopmega, );
randomMoves("lickilicky", ["wish", "protect", "bodyslam", "knockoff", "dragontail", "healbell", "swordsdance", "explosion", "earthquake", "powerwhip"]);
// randomMoves("lickilickymega, );
randomMoves("weezing", ["painsplit", "sludgebomb", "willowisp", "fireblast", "protect", "toxicspikes"]);
// randomMoves("weezingmega, );
// randomMoves("weezinggalarmega, );
randomMoves("rhyperior", ["stoneedge", "earthquake", "icepunch", "megahorn", "stealthrock", "rockblast", "rockpolish", "dragontail"]);
// randomMoves("rhyperiormega, );
// randomMoves("chansey, );
randomMoves("blissey", ["toxic", "flamethrower", "seismictoss", "softboiled", "healbell", "protect", "thunderwave", "stealthrock"]);
// randomMoves("blisseymega, );
randomMoves("tangrowth", ["gigadrain", "leafstorm", "knockoff", "earthquake", "hiddenpowerfire", "rockslide", "sleeppowder", "synthesis"]);
// randomMoves("tangrowthmega, );
randomMoves("kangaskhan", ["return", "suckerpunch", "earthquake", "drainpunch", "crunch", "fakeout"]);
randomMoves("kangaskhanmega", ["fakeout", "seismictoss", "bodyslam", "suckerpunch", "crunch"]);
randomMoves("kingdra", ["raindance", "hydropump", "dracometeor", "icebeam", "waterfall"]);
// randomMoves("kingdramega, );
randomMoves("seaking", ["waterfall", "megahorn", "knockoff", "drillrun", "scald", "icebeam"]);
// randomMoves("seakingmega, );
randomMoves("starmie", ["thunderbolt", "icebeam", "rapidspin", "recover", "psyshock", "scald", "hydropump"]);
randomMoves("starmiemega", ["thunderbolt", "icebeam", "rapidspin", "recover", "calmmind", "psyshock", "scald", "hydropump", "futuresight", "flipturn"]);
randomMoves("mrmime", ["nastyplot", "psyshock", "dazzlinggleam", "shadowball", "focusblast", "healingwish", "encore"]);
// randomMoves("mrmimemega, );
// randomMoves("mrrimemega, );
randomMoves("scizor", ["swordsdance", "bulletpunch", "bugbite", "superpower", "uturn", "pursuit", "knockoff"]);
randomMoves("scizormega", ["swordsdance", "roost", "bulletpunch", "bugbite", "superpower", "uturn", "defog", "knockoff"]);
randomMoves("jynx", ["icebeam", "psychic", "focusblast", "trick", "nastyplot", "lovelykiss", "substitute", "psyshock"]);
// randomMoves("jynxmega, );
randomMoves("electivire", ["wildcharge", "crosschop", "icepunch", "flamethrower", "earthquake", "voltswitch"]);
// randomMoves("electiviremega, );
randomMoves("magmortar", ["fireblast", "focusblast", "hiddenpowergrass", "thunderbolt", "earthquake", "substitute"]);
// randomMoves("magmortarmega, );
randomMoves("pinsir", ["earthquake", "xscissor", "closecombat", "stoneedge", "stealthrock", "knockoff"]);
randomMoves("pinsirmega", ["swordsdance", "earthquake", "closecombat", "quickattack", "return"]);
randomMoves("tauros", ["bodyslam", "earthquake", "zenheadbutt", "rockslide", "doubleedge"]);
// randomMoves("taurosmega, );
randomMoves("gyarados", ["dragondance", "waterfall", "earthquake", "bounce", "dragontail", "stoneedge", "substitute"]);
randomMoves("gyaradosmega", ["dragondance", "waterfall", "earthquake", "substitute", "icefang", "crunch"]);
randomMoves("lapras", ["icebeam", "thunderbolt", "healbell", "toxic", "hydropump", "substitute"]);
// randomMoves("laprasmega, );
randomMoves("ditto", ["transform"]);
// randomMoves("dittomega, );
randomMoves("vaporeon", ["wish", "protect", "scald", "roar", "icebeam", "healbell", "flipturn"]);
randomMoves("vaporeonmega", ["wish", "protect", "scald", "roar", "icebeam", "healbell", "flipturn"]);
randomMoves("jolteon", ["thunderbolt", "voltswitch", "hiddenpowerice", "shadowball", "signalbeam"]);
randomMoves("jolteonmega", ["thunderbolt", "voltswitch", "hiddenpowerice", "shadowball", "signalbeam", "calmmind"]);
randomMoves("flareon", ["flamecharge", "facade", "flareblitz", "superpower", "quickattack", "burnup"]);
randomMoves("flareonmega", ["flamecharge", "toxic", "flareblitz", "superpower", "quickattack", "morningsun", "burnup"]);
randomMoves("espeon", ["psychic", "psyshock", "substitute", "shadowball", "calmmind", "morningsun", "dazzlinggleam"]);
// randomMoves("espeonmega, );
randomMoves("umbreon", ["wish", "protect", "healbell", "toxic", "foulplay"]);
// randomMoves("umbreonmega, );
randomMoves("leafeon", ["swordsdance", "leafblade", "healbell", "xscissor", "synthesis", "knockoff"]);
// randomMoves("leafeonmega, );
randomMoves("glaceon", ["icebeam", "hiddenpowerground", "shadowball", "healbell", "wish", "protect", "toxic"]);
// randomMoves("glaceonmega, );
// randomMoves("sylveonmega, );
randomMoves("porygonz", ["triattack", "shadowball", "icebeam", "thunderbolt", "trick", "nastyplot"]);
randomMoves("porygonzmega", ["triattack", "shadowball", "icebeam", "thunderbolt", "trick", "nastyplot"]);
randomMoves("omastar", ["shellsmash", "scald", "icebeam", "earthpower", "spikes", "stealthrock", "hydropump"]);
// randomMoves("omastarmega, );
randomMoves("kabutops", ["aquajet", "stoneedge", "rapidspin", "swordsdance", "liquidation", "knockoff"]);
// randomMoves("kabutopsmega, );
randomMoves("aerodactyl", ["stealthrock", "taunt", "honeclaws", "roost", "stoneedge", "earthquake", "dualwingbeat", "pursuit"]);
randomMoves("aerodactylmega", ["honeclaws", "stoneedge", "dualwingbeat", "aquatail", "earthquake", "firefang", "roost"]);
randomMoves("snorlax", ["rest", "curse", "sleeptalk", "bodyslam", "earthquake", "return", "firepunch", "crunch", "pursuit", "whirlwind"]);
// randomMoves("snorlaxmega, );
randomMoves("articuno", ["icebeam", "roost", "freezedry", "toxic", "substitute", "hurricane"]);
// randomMoves("articunomega", ["icebeam", "roost", "freezedry", "uturn", "defog", "hurricane"]);
// randomMoves("articunogalarmega, );
randomMoves("zapdos", ["thunderbolt", "heatwave", "hiddenpowerice", "roost", "toxic", "uturn", "defog"]);
// randomMoves("zapdosgalar, );
// randomMoves("zapdosmega, );
// randomMoves("zapdosgalarmega, );
randomMoves("moltres", ["fireblast", "roost", "substitute", "toxic", "willowisp", "hurricane"]);
// randomMoves("moltresmega, );
// randomMoves("moltresgalarmega, );
randomMoves("dragonite", ["dragondance", "outrage", "dualwingbeat", "firepunch", "extremespeed", "earthquake", "roost"]);
randomMoves("dragonitemega", ["dragondance", "outrage", "dualwingbeat", "firepunch", "extremespeed", "earthquake", "roost"]);
randomMoves("mewtwo", ["psystrike", "aurasphere", "fireblast", "icebeam", "calmmind", "recover"]);
randomMoves("mewtwomegax", ["bulkup", "drainpunch", "zenheadbutt", "stoneedge", "taunt", "icebeam"]);
randomMoves("mewtwomegay", ["psystrike", "aurasphere", "shadowball", "fireblast", "icebeam", "calmmind", "recover", "willowisp", "taunt"]);
randomMoves("mew", ["defog", "roost", "willowisp", "knockoff", "taunt", "icebeam", "earthpower", "aurasphere", "stealthrock", "nastyplot", "psyshock"]);
// randomMoves("mewmega, );
randomMoves("meganium", ["reflect", "lightscreen", "aromatherapy", "leechseed", "toxic", "gigadrain", "synthesis", "dragontail"]);
randomMoves("meganiummega", ["sunnyday", "solarblade", "petalblizzard", "synthesis", "dragontail", "earthquake", "swordsdance"]);
randomMoves("typhlosion", ["eruption", "fireblast", "hiddenpowergrass", "extrasensory", "focusblast"]);
randomMoves("typhlosionmega", ["rapidspin", "explosion", "crushclaw", "earthquake", "wildcharge", "eruption", "morningsun"]);
randomMoves("feraligatr", ["aquajet", "liquidation", "crunch", "icepunch", "dragondance", "swordsdance", "earthquake"]);
randomMoves("feraligatrmega", ["liquidation", "crunch", "icefang", "dragondance", "suckerpunch", "thunderfang", "firefang", "earthquake"]);
randomMoves("furret", ["uturn", "trick", "aquatail", "firepunch", "knockoff", "doubleedge"]);
// randomMoves("furretmega, );
randomMoves("noctowl", ["roost", "whirlwind", "nightshade", "toxic", "defog", "hurricane", "heatwave"]);
// randomMoves("noctowlmega, );
randomMoves("ledian", ["roost", "lightscreen", "encore", "reflect", "knockoff", "toxic", "uturn"]);
// randomMoves("ledianmega, );
randomMoves("ariados", ["megahorn", "toxicspikes", "poisonjab", "suckerpunch", "stickyweb"]);
randomMoves("ariadosmega", ["megahorn", "toxicspikes", "poisonjab", "suckerpunch", "stickyweb"]);
randomMoves("lanturn", ["voltswitch", "hiddenpowergrass", "hydropump", "icebeam", "thunderwave", "scald", "thunderbolt", "healbell", "toxic"]);
// randomMoves("lanturnmega, );
randomMoves("togekiss", ["roost", "thunderwave", "nastyplot", "airslash", "aurasphere", "healbell", "defog"]);
// randomMoves("togekissmega, );
randomMoves("xatu", ["thunderwave", "toxic", "roost", "psychic", "uturn", "reflect", "calmmind", "heatwave"]);
// randomMoves("xatumega, );
randomMoves("ampharos", ["voltswitch", "reflect", "lightscreen", "focusblast", "thunderbolt", "toxic", "healbell", "hiddenpowerice"]);
randomMoves("ampharosmega", ["voltswitch", "focusblast", "agility", "thunderbolt", "healbell", "dragonpulse"]);
randomMoves("azumarill", ["liquidation", "aquajet", "playrough", "superpower", "bellydrum", "knockoff"]);
// randomMoves("azumarillmega, );
randomMoves("sudowoodo", ["headsmash", "earthquake", "suckerpunch", "woodhammer", "toxic", "stealthrock"]);
// randomMoves("sudowoodomega, );
randomMoves("jumpluff", ["swordsdance", "sleeppowder", "uturn", "encore", "toxic", "acrobatics", "leechseed", "seedbomb", "substitute", "strengthsap"]);
// randomMoves("jumpluffmega, );
randomMoves("ambipom", ["fakeout", "return", "knockoff", "uturn", "switcheroo", "seedbomb", "lowkick"]);
// randomMoves("ambipommega, );
randomMoves("sunflora", ["sunnyday", "gigadrain", "solarbeam", "hiddenpowerfire", "earthpower"]);
// randomMoves("sunfloramega, );
randomMoves("yanmega", ["bugbuzz", "airslash", "uturn", "protect", "gigadrain"]);
// randomMoves("yanmegamega, );
randomMoves("quagsire", ["recover", "earthquake", "scald", "toxic", "encore", "icebeam"]);
// randomMoves("quagsiremega, );
randomMoves("murkrow", ["haze", "roost", "partingshot", "taunt", "foulplay"]);
randomMoves("honchkrow", ["superpower", "suckerpunch", "bravebird", "roost", "heatwave", "pursuit"]);
randomMoves("honchkrowmega", ["superpower", "suckerpunch", "bravebird", "roost", "heatwave", "pursuit"]);
// randomMoves("misdreavus, );
randomMoves("mismagius", ["nastyplot", "substitute", "willowisp", "shadowball", "thunderbolt", "dazzlinggleam", "taunt", "painsplit", "destinybond"]);
randomMoves("mismagiusmega", ["nastyplot", "substitute", "hex", "sludgebomb", "taunt", "painsplit", "poisonfang", "toxic", "partingshot", "toxicspikes"]);
randomMoves("unown", ["hiddenpowerpsychic"]);
// randomMoves("unownmega, );
randomMoves("wobbuffet", ["counter", "mirrorcoat", "encore", "destinybond", "safeguard"]);
// randomMoves("wobbuffetmega, );
randomMoves("girafarig", ["psychic", "psyshock", "thunderbolt", "nastyplot", "substitute", "hypervoice"]);
// randomMoves("girafarigmega, );
randomMoves("forretress", ["rapidspin", "toxic", "spikes", "voltswitch", "stealthrock", "gyroball"]);
// randomMoves("forretressmega, );
randomMoves("dunsparce", ["bodyslam", "rockslide", "bite", "coil", "glare", "headbutt", "roost"]);
// randomMoves("dunsparcemega, );
randomMoves("gliscor", ["roost", "taunt", "earthquake", "protect", "toxic", "stealthrock", "knockoff", "uturn"]);
// randomMoves("gliscormega, );
randomMoves("granbull", ["thunderwave", "playrough", "crunch", "earthquake", "healbell"]);
// randomMoves("granbullmega", ["thunderwave", "playrough", "crunch", "earthquake", "milkdrink", "healbell"]);
randomMoves("qwilfish", ["toxicspikes", "liquidation", "spikes", "painsplit", "thunderwave", "taunt", "destinybond"]);
// randomMoves("qwilfishmega, );
randomMoves("shuckle", ["toxic", "encore", "stealthrock", "knockoff", "stickyweb", "infestation"]);
// randomMoves("shucklemega, );
randomMoves("heracross", ["closecombat", "megahorn", "stoneedge", "swordsdance", "knockoff", "earthquake"]);
randomMoves("heracrossmega", ["closecombat", "pinmissile", "rockblast", "swordsdance", "bulletseed", "substitute"]);
randomMoves("weavile", ["iceshard", "iciclecrash", "knockoff", "pursuit", "swordsdance", "lowkick"]);
// randomMoves("weavilemega, );
randomMoves("ursaring", ["swordsdance", "facade", "closecombat", "crunch", "protect"]);
// randomMoves("ursaringmega, );
randomMoves("magcargo", ["recover", "lavaplume", "toxic", "hiddenpowergrass", "stealthrock", "fireblast", "earthpower", "shellsmash", "ancientpower"]);
randomMoves("magcargomega", ["recover", "lavaplume", "toxic", "hiddenpowergrass", "stealthrock", "overheat", "earthpower", "curse", "shellsmash", "ancientpower"]);
randomMoves("mamoswine", ["iceshard", "earthquake", "endeavor", "iciclecrash", "stealthrock", "superpower", "knockoff"]);
// randomMoves("mamoswinemega, );
randomMoves("corsola", ["recover", "toxic", "powergem", "scald", "stealthrock"]);
// randomMoves("corsolamega, );
// randomMoves("cursolamega, );
randomMoves("octillery", ["hydropump", "fireblast", "icebeam", "energyball", "rockblast", "gunkshot", "scald"]);
// randomMoves("octillerymega, );
randomMoves("delibird", ["spikes", "rapidspin", "icywind", "freezedry", "destinybond"]);
randomMoves("delibirdmega", ["spikes", "rapidspin", "icywind", "roost", "uturn", "wish", "healingwish"]);
randomMoves("mantine", ["scald", "airslash", "roost", "toxic", "defog"]);
// randomMoves("mantinemega, );
randomMoves("skarmory", ["whirlwind", "bravebird", "roost", "spikes", "stealthrock", "defog"]);
// randomMoves("skarmorymega, );
randomMoves("houndoom", ["nastyplot", "darkpulse", "suckerpunch", "fireblast", "hiddenpowergrass"]);
randomMoves("houndoommega", ["nastyplot", "darkpulse", "taunt", "fireblast", "hiddenpowergrass"]);
randomMoves("donphan", ["stealthrock", "rapidspin", "iceshard", "earthquake", "knockoff", "stoneedge"]);
// randomMoves("donphanmega, );
randomMoves("stantler", ["doubleedge", "megahorn", "jumpkick", "earthquake", "suckerpunch"]);
// randomMoves("stantlermega, );
randomMoves("smeargle", ["spore", "stealthrock", "destinybond", "whirlwind", "stickyweb"]);
// randomMoves("smearglemega, );
randomMoves("miltank", ["milkdrink", "stealthrock", "bodyslam", "healbell", "curse", "earthquake", "toxic"]);
// randomMoves("miltankmega, );
randomMoves("raikou", ["thunderbolt", "hiddenpowerice", "aurasphere", "calmmind", "substitute", "voltswitch", "extrasensory"]);
// randomMoves("raikoumega, );
randomMoves("entei", ["extremespeed", "flareblitz", "stompingtantrum", "stoneedge", "sacredfire"]);
// randomMoves("enteimega, );
randomMoves("suicune", ["hydropump", "icebeam", "scald", "hiddenpowergrass", "rest", "sleeptalk", "calmmind"]);
// randomMoves("suicunemega, );
randomMoves("tyranitar", ["crunch", "stoneedge", "pursuit", "earthquake", "fireblast", "icebeam", "stealthrock"]);
randomMoves("tyranitarmega", ["crunch", "stoneedge", "earthquake", "icepunch", "dragondance"]);
randomMoves("lugia", ["toxic", "roost", "substitute", "whirlwind", "aeroblast", "earthquake"]);
// randomMoves("lugiamega, );
randomMoves("hooh", ["bravebird", "defog", "earthquake", "roost", "sacredfire", "substitute", "toxic"]);
// randomMoves("hoohmega, );
randomMoves("celebi", ["nastyplot", "psychic", "gigadrain", "recover", "earthpower", "hiddenpowerfire", "leafstorm", "uturn", "thunderwave"]);
// randomMoves("celebimega, );
randomMoves("sceptile", ["gigadrain", "leafstorm", "hiddenpowerice", "focusblast"]);
randomMoves("sceptilemega", ["substitute", "gigadrain", "dragonpulse", "focusblast", "swordsdance", "outrage", "leafblade", "earthquake", "hiddenpowerfire"]);
randomMoves("blaziken", ["fireblast", "highjumpkick", "protect", "knockoff", "hiddenpowerice"]);
randomMoves("blazikenmega", ["flareblitz", "highjumpkick", "protect", "swordsdance", "stoneedge", "knockoff"]);
randomMoves("swampert", ["stealthrock", "earthquake", "scald", "icebeam", "roar", "toxic", "protect"]);
randomMoves("swampertmega", ["raindance", "waterfall", "earthquake", "icepunch", "superpower"]);
randomMoves("mightyena", ["crunch", "suckerpunch", "playrough", "firefang", "irontail"]);
randomMoves("mightyenamega", ["crunch", "suckerpunch", "playrough", "firefang", "irontail"]);
randomMoves("linoone", ["bellydrum", "extremespeed", "stompingtantrum", "shadowclaw"]);
// randomMoves("linoonemega, );
randomMoves("beautifly", ["quiverdance", "bugbuzz", "psychic", "energyball", "hiddenpowerfighting"]);
// randomMoves("beautiflymega, );
randomMoves("dustox", ["roost", "defog", "bugbuzz", "sludgebomb", "quiverdance", "uturn"]);
// randomMoves("dustoxmega, );
randomMoves("ludicolo", ["raindance", "hydropump", "scald", "gigadrain", "icebeam", "focusblast"]);
// randomMoves("ludicolomega, );
randomMoves("shiftry", ["leafstorm", "swordsdance", "leafblade", "suckerpunch", "defog", "lowkick", "knockoff"]);
// randomMoves("shiftrymega, );
randomMoves("swellow", ["protect", "facade", "bravebird", "uturn", "quickattack"]);
// randomMoves("swellowmega, );
randomMoves("pelipper", ["scald", "hurricane", "hydropump", "uturn", "roost", "defog", "knockoff"]);
// randomMoves("pelippermega, );
randomMoves("gardevoir", ["psychic", "thunderbolt", "focusblast", "shadowball", "moonblast", "calmmind", "substitute", "willowisp"]);
randomMoves("gardevoirmega", ["calmmind", "hypervoice", "psyshock", "focusblast", "substitute", "taunt", "willowisp"]);
randomMoves("gallade", ["bulkup", "drainpunch", "icepunch", "shadowsneak", "closecombat", "zenheadbutt", "knockoff", "trick"]);
randomMoves("gallademega", ["swordsdance", "closecombat", "drainpunch", "knockoff", "zenheadbutt", "substitute"]);
randomMoves("masquerain", ["quiverdance", "bugbuzz", "airslash", "hydropump", "stickyweb"]);
// randomMoves("masquerainmega, );
randomMoves("breloom", ["spore", "machpunch", "bulletseed", "rocktomb", "swordsdance"]);
// randomMoves("breloommega, );
randomMoves("slaking", ["earthquake", "pursuit", "nightslash", "retaliate", "gigaimpact", "firepunch"]);
// randomMoves("slakingmega, );
randomMoves("ninjask", ["swordsdance", "aerialace", "nightslash", "dig", "leechlife", "uturn"]);
// randomMoves("ninjaskmega, );
randomMoves("shedinja", ["swordsdance", "willowisp", "xscissor", "shadowsneak", "shadowclaw"]);
// randomMoves("shedinjamega, );
randomMoves("exploud", ["boomburst", "fireblast", "icebeam", "surf", "focusblast"]);
randomMoves("exploudmega", ["boomburst", "clangingscales", "fireblast", "focusblast", "screech"]);
randomMoves("hariyama", ["bulletpunch", "closecombat", "icepunch", "stoneedge", "bulkup", "knockoff"]);
// randomMoves("hariyamamega, );
randomMoves("probopass", ["stealthrock", "thunderwave", "toxic", "flashcannon", "voltswitch", "earthpower"]);
// randomMoves("probopassmega, );
randomMoves("delcatty", ["doubleedge", "suckerpunch", "wildcharge", "fakeout", "thunderwave", "healbell"]);
// randomMoves("delcattymega, );
randomMoves("sableye", ["recover", "willowisp", "taunt", "toxic", "knockoff", "foulplay"]);
randomMoves("sableyemega", ["recover", "willowisp", "darkpulse", "calmmind", "shadowball"]);
randomMoves("mawile", ["swordsdance", "ironhead", "stealthrock", "playrough", "suckerpunch", "knockoff"]);
randomMoves("mawilemega", ["swordsdance", "ironhead", "firefang", "substitute", "playrough", "suckerpunch", "knockoff", "focuspunch"]);
randomMoves("aggron", ["autotomize", "headsmash", "earthquake", "lowkick", "heavyslam", "aquatail", "stealthrock"]);
randomMoves("aggronmega", ["earthquake", "heavyslam", "rockslide", "stealthrock", "thunderwave", "roar", "toxic"]);
randomMoves("medicham", ["highjumpkick", "drainpunch", "zenheadbutt", "icepunch", "bulletpunch"]);
randomMoves("medichammega", ["highjumpkick", "zenheadbutt", "thunderpunch", "icepunch", "fakeout"]);
randomMoves("manectric", ["voltswitch", "thunderbolt", "hiddenpowerice", "overheat", "flamethrower"]);
randomMoves("manectricmega", ["voltswitch", "thunderbolt", "hiddenpowerice", "overheat"]);
randomMoves("plusle", ["nastyplot", "thunderbolt", "substitute", "hiddenpowerice", "encore"]);
// randomMoves("pluslemega, );
randomMoves("minun", ["nastyplot", "thunderbolt", "substitute", "hiddenpowerice", "encore"]);
// randomMoves("minunmega, );
randomMoves("volbeat", ["uturn", "roost", "thunderwave", "encore", "tailwind", "defog"]);
// randomMoves("volbeatmega, );
randomMoves("illumise", ["uturn", "roost", "bugbuzz", "thunderwave", "encore", "wish", "defog"]);
// randomMoves("illumisemega, );
randomMoves("roserade", ["sludgebomb", "gigadrain", "sleeppowder", "leafstorm", "spikes", "toxicspikes", "synthesis", "hiddenpowerfire"]);
// randomMoves("roserademega, );
randomMoves("swalot", ["sludgebomb", "icebeam", "toxic", "yawn", "encore", "painsplit", "earthquake"]);
// randomMoves("swalotmega, );
randomMoves("sharpedo", ["protect", "icebeam", "crunch", "earthquake", "waterfall"]);
randomMoves("sharpedomega", ["protect", "crunch", "waterfall", "icefang", "psychicfangs", "destinybond"]);
randomMoves("wailord", ["waterspout", "hydropump", "icebeam", "hiddenpowergrass"]);
// randomMoves("wailordmega, );
randomMoves("camerupt", ["rockpolish", "fireblast", "earthpower", "lavaplume", "stealthrock", "hiddenpowergrass", "roar", "stoneedge"]);
randomMoves("cameruptmega", ["stealthrock", "fireblast", "earthpower", "ancientpower", "willowisp", "toxic"]);
randomMoves("torkoal", ["shellsmash", "fireblast", "earthpower", "solarbeam", "stealthrock", "rapidspin", "yawn", "lavaplume"]);
// randomMoves("torkoalmega, );
randomMoves("grumpig", ["psychic", "thunderwave", "healbell", "whirlwind", "toxic", "focusblast", "reflect", "lightscreen"]);
// randomMoves("grumpigmega, );
randomMoves("spinda", ["return", "superpower", "rockslide", "encore"]);
// randomMoves("spindamega, );
randomMoves("flygon", ["earthquake", "outrage", "uturn", "roost", "defog", "firepunch", "dragondance"]);
randomMoves("flygonmega", ["return", "boomburst", "extremespeed", "dragonclaw", "ironhead", "firepunch", "uturn", "roost", "defog", "dragondance"]);
randomMoves("cacturne", ["swordsdance", "spikes", "suckerpunch", "seedbomb", "drainpunch", "substitute", "darkpulse", "focusblast", "gigadrain"]);
randomMoves("cacturnemega", ["swordsdance", "strengthsap", "spikyshield", "knockoff", "spikes", "toxic", "leechseed"]);
randomMoves("altaria", ["dracometeor", "fireblast", "earthquake", "roost", "toxic", "defog"]);
randomMoves("altariamega", ["dragondance", "return", "hypervoice", "healbell", "earthquake", "roost", "fireblast"]);
randomMoves("zangoose", ["swordsdance", "closecombat", "knockoff", "quickattack", "facade"]);
// randomMoves("zangoosemega, );
randomMoves("seviper", ["flamethrower", "sludgewave", "gigadrain", "darkpulse", "switcheroo", "swordsdance", "earthquake", "poisonjab", "suckerpunch"]);
// randomMoves("sevipermega, );
randomMoves("lunatone", ["psychic", "earthpower", "stealthrock", "rockpolish", "calmmind", "icebeam", "powergem", "moonlight", "toxic"]);
// randomMoves("lunatonemega, );
randomMoves("solrock", ["stealthrock", "explosion", "rockslide", "reflect", "lightscreen", "willowisp", "morningsun"]);
// randomMoves("solrockmega, );
randomMoves("whiscash", ["dragondance", "waterfall", "earthquake", "stoneedge", "zenheadbutt"]);
// randomMoves("whiscashmega, );
randomMoves("crawdaunt", ["dragondance", "crabhammer", "superpower", "swordsdance", "knockoff", "aquajet"]);
// randomMoves("crawdauntmega, );
randomMoves("claydol", ["stealthrock", "toxic", "psychic", "icebeam", "earthquake", "rapidspin"]);
// randomMoves("claydolmega, );
randomMoves("cradily", ["stealthrock", "recover", "gigadrain", "toxic", "seedbomb", "rockslide", "curse"]);
// randomMoves("cradilymega, );
randomMoves("armaldo", ["stealthrock", "stoneedge", "toxic", "xscissor", "knockoff", "rapidspin", "earthquake"]);
// randomMoves("armaldomega, );
randomMoves("milotic", ["recover", "scald", "toxic", "icebeam", "dragontail", "rest", "sleeptalk"]);
// randomMoves("miloticmega, );
// randomMoves("castform, );
// randomMoves("castformmega, );
randomMoves("castformsunny", ["sunnyday", "fireblast", "solarbeam", "icebeam"]);
randomMoves("castformrainy", ["raindance", "hydropump", "thunder", "hurricane"]);
randomMoves("castformsnowy", ["hail", "blizzard", "thunderbolt", "fireblast"]);
randomMoves("kecleon", ["fakeout", "knockoff", "drainpunch", "suckerpunch", "shadowsneak", "stealthrock", "recover"]);
// randomMoves("kecleonmega, );
randomMoves("banette", ["destinybond", "taunt", "shadowclaw", "suckerpunch", "willowisp", "shadowsneak", "knockoff"]);
randomMoves("banettemega", ["destinybond", "taunt", "shadowclaw", "suckerpunch", "willowisp", "knockoff"]);
randomMoves("dusknoir", ["willowisp", "shadowsneak", "icepunch", "painsplit", "substitute", "earthquake", "focuspunch"]);
// randomMoves("dusknoirmega, );
randomMoves("tropius", ["leechseed", "substitute", "airslash", "gigadrain", "toxic", "protect"]);
// randomMoves("tropiusmega, );
randomMoves("chimecho", ["psychic", "yawn", "recover", "calmmind", "shadowball", "healingwish", "healbell", "taunt"]);
// randomMoves("chimechomega, );
randomMoves("absol", ["swordsdance", "suckerpunch", "knockoff", "superpower", "pursuit", "playrough"]);
randomMoves("absolmega", ["swordsdance", "suckerpunch", "knockoff", "fireblast", "superpower", "pursuit", "playrough", "icebeam"]);
randomMoves("glalie", ["spikes", "icebeam", "iceshard", "taunt", "earthquake", "explosion", "superfang"]);
randomMoves("glaliemega", ["freezedry", "iceshard", "earthquake", "explosion", "return", "spikes"]);
randomMoves("froslassmega", ["tripleaxel", "spikes", "destinybond", "poltergeist", "taunt", "thunderwave", "willowisp"]);
randomMoves("walrein", ["superfang", "protect", "toxic", "surf", "icebeam", "roar"]);
randomMoves("walreinmega", ["superfang", "focusblast", "hydropump", "freezedry", "slackoff", "flipturn"]);
randomMoves("huntail", ["shellsmash", "waterfall", "icebeam", "suckerpunch"]);
// randomMoves("huntailmega, );
randomMoves("gorebyss", ["shellsmash", "hydropump", "icebeam", "hiddenpowergrass", "substitute"]);
// randomMoves("gorebyssmega, );
randomMoves("relicanth", ["headsmash", "waterfall", "earthquake", "doubleedge", "stealthrock", "toxic"]);
// randomMoves("relicanthmega, );
randomMoves("luvdisc", ["icebeam", "toxic", "sweetkiss", "protect", "scald"]);
// randomMoves("luvdiscmega, );
randomMoves("salamence", ["outrage", "fireblast", "earthquake", "dracometeor", "dragondance", "fly", "roost"]);
randomMoves("salamencemega", ["doubleedge", "return", "fireblast", "earthquake", "dracometeor", "roost", "dragondance"]);
randomMoves("metagross", ["meteormash", "earthquake", "agility", "stealthrock", "zenheadbutt", "bulletpunch", "thunderpunch", "explosion", "icepunch"]);
randomMoves("metagrossmega", ["meteormash", "earthquake", "agility", "zenheadbutt", "hammerarm", "icepunch"]);
randomMoves("regirock", ["stealthrock", "thunderwave", "stoneedge", "drainpunch", "curse", "rest", "rockslide", "toxic"]);
randomMoves("regirockmega", ["stealthrock", "thunderwave", "stoneedge", "drainpunch", "bodypress", "curse", "rest", "rockslide", "toxic"]);
randomMoves("regice", ["thunderwave", "icebeam", "thunderbolt", "rest", "sleeptalk", "focusblast", "rockpolish"]);
randomMoves("regicemega", ["auroraveil", "teleport", "thunderwave", "blizzard", "thunderbolt", "rest", "sleeptalk", "focusblast", "rockpolish"]);
randomMoves("registeel", ["stealthrock", "toxic", "curse", "ironhead", "rest", "sleeptalk"]);
randomMoves("registeelmega", ["stealthrock", "toxic", "curse", "ironhead", "heavyslam", "rest", "sleeptalk"]);
randomMoves("latias", ["dracometeor", "psyshock", "hiddenpowerfire", "roost", "thunderbolt", "healingwish", "defog"]);
randomMoves("latiasmega", ["calmmind", "dragonpulse", "surf", "dracometeor", "roost", "hiddenpowerfire", "substitute", "psyshock"]);
randomMoves("latios", ["dracometeor", "hiddenpowerfire", "surf", "thunderbolt", "psyshock", "roost", "trick", "defog"]);
randomMoves("latiosmega", ["calmmind", "dracometeor", "hiddenpowerfire", "psyshock", "roost", "defog"]);
randomMoves("kyogre", ["waterspout", "originpulse", "scald", "thunder", "icebeam"]);
randomMoves("kyogreprimal", ["calmmind", "originpulse", "scald", "thunder", "icebeam", "toxic", "rest", "sleeptalk"]);
randomMoves("groudon", ["earthquake", "stealthrock", "lavaplume", "stoneedge", "roar", "toxic", "thunderwave", "dragonclaw", "firepunch"]);
randomMoves("groudonprimal", ["stealthrock", "precipiceblades", "lavaplume", "stoneedge", "dragontail", "rockpolish", "swordsdance", "firepunch"]);
randomMoves("rayquaza", ["outrage", "vcreate", "extremespeed", "dragondance", "earthquake", "dracometeor", "dragonclaw"]);
randomMoves("rayquazamega", ["vcreate", "extremespeed", "swordsdance", "earthquake", "dragonascent", "dragonclaw", "dragondance"]);
randomMoves("jirachi", ["ironhead", "uturn", "firepunch", "icepunch", "stealthrock", "bodyslam", "toxic", "wish", "substitute"]);
// randomMoves("jirachimega, );
randomMoves("deoxys", ["psychoboost", "stealthrock", "spikes", "firepunch", "superpower", "extremespeed", "knockoff", "taunt"]);
// randomMoves("deoxysmega, );
randomMoves("deoxysattack", ["psychoboost", "superpower", "icebeam", "knockoff", "extremespeed", "firepunch", "stealthrock"]);
randomMoves("deoxysdefense", ["spikes", "stealthrock", "recover", "taunt", "toxic", "seismictoss", "knockoff"]);
randomMoves("deoxysspeed", ["spikes", "stealthrock", "superpower", "psychoboost", "taunt", "magiccoat", "knockoff"]);
randomMoves("torterra", ["stealthrock", "earthquake", "woodhammer", "stoneedge", "synthesis", "rockpolish"]);
randomMoves("torterramega", ["stealthrock", "earthquake", "woodhammer", "stoneedge", "synthesis", "rockpolish"]);
randomMoves("infernape", ["stealthrock", "uturn", "closecombat", "flareblitz", "stoneedge", "machpunch", "nastyplot", "fireblast", "focusblast", "vacuumwave", "grassknot"]);
randomMoves("infernapemega", ["stealthrock", "uturn", "closecombat", "flareblitz", "stoneedge", "machpunch", "nastyplot", "fireblast", "focusblast", "vacuumwave", "grassknot"]);
randomMoves("empoleon", ["hydropump", "flashcannon", "grassknot", "defog", "icebeam", "scald", "toxic", "roar", "stealthrock"]);
randomMoves("empoleonmega", ["originpulse", "scald", "flashcannon", "grassknot", "defog", "roost", "flipturn", "toxic", "roar", "stealthrock"]);
randomMoves("staraptor", ["bravebird", "closecombat", "uturn", "quickattack", "doubleedge"]);
randomMoves("staraptormega", ["bravebird", "closecombat", "uturn", "quickattack", "doubleedge"]);
randomMoves("bibarel", ["return", "liquidation", "swordsdance", "quickattack", "aquajet"]);
randomMoves("bibarelmega", ["swordsdance", "strength", "fly", "surf", "whirlpool", "waterfall", "rockclimb", "rocksmash"]);
randomMoves("kricketune", ["leechlife", "endeavor", "taunt", "toxic", "stickyweb", "knockoff"]);
randomMoves("kricketunemega", ["leechlife", "drainpunch", "stickyweb", "knockoff", "powertrip", "tripleaxel"]);
randomMoves("luxray", ["wildcharge", "icefang", "voltswitch", "crunch", "superpower", "facade"]);
randomMoves("luxraymega", ["wildcharge", "icefang", "voltswitch", "crunch", "playrough", "superpower", "agility"]);
randomMoves("rampardos", ["headsmash", "earthquake", "rockpolish", "crunch", "rockslide", "firepunch"]);
// randomMoves("rampardosmega, );
randomMoves("bastiodon", ["stealthrock", "rockblast", "metalburst", "protect", "toxic", "roar"]);
randomMoves("bastiodonmega", ["stealthrock", "earthpower", "fireblast", "blizzard", "thunder", "toxic"]);
randomMoves("wormadam", ["gigadrain", "bugbuzz", "quiverdance", "hiddenpowerrock", "leafstorm"]);
// randomMoves("wormadammega, );
randomMoves("wormadamsandy", ["earthquake", "toxic", "protect", "stealthrock"]);
// randomMoves("wormadamsandymega, );
randomMoves("wormadamtrash", ["stealthrock", "toxic", "gyroball", "protect"]);
// randomMoves("wormadamtrashmega, );
randomMoves("mothim", ["quiverdance", "bugbuzz", "airslash", "energyball", "uturn"]);
// randomMoves("mothimmega, );
randomMoves("vespiquen", ["toxic", "protect", "roost", "infestation", "uturn"]);
// randomMoves("vespiquenmega, );
randomMoves("pachirisu", ["nuzzle", "thunderbolt", "superfang", "toxic", "uturn"]);
// randomMoves("pachirisumega, );
randomMoves("floatzel", ["bulkup", "liquidation", "icepunch", "substitute", "taunt", "aquajet", "brickbreak"]);
randomMoves("floatzelmega", ["bulkup", "liquidation", "icepunch", "flipturn", "taunt", "aquajet", "brickbreak"]);
randomMoves("cherrim", ["energyball", "dazzlinggleam", "hiddenpowerfire", "synthesis", "healingwish"]);
randomMoves("cherrimsunshine", ["sunnyday", "solarbeam", "gigadrain", "weatherball", "hiddenpowerice"]);
// randomMoves("cherrimmega, );
randomMoves("gastrodon", ["earthquake", "icebeam", "scald", "toxic", "recover", "clearsmog"]);
// randomMoves("gastrodonmega, );
randomMoves("drifblim", ["acrobatics", "willowisp", "substitute", "destinybond", "shadowball", "hex"]);
// randomMoves("drifblimmega, );
randomMoves("lopunny", ["return", "switcheroo", "highjumpkick", "icepunch", "healingwish"]);
randomMoves("lopunnymega", ["return", "highjumpkick", "substitute", "fakeout", "icepunch"]);
randomMoves("purugly", ["fakeout", "uturn", "suckerpunch", "quickattack", "return", "knockoff"]);
// randomMoves("puruglymega, );
randomMoves("skuntank", ["pursuit", "suckerpunch", "crunch", "fireblast", "taunt", "poisonjab", "defog"]);
// randomMoves("skuntankmega, );
randomMoves("bronzong", ["stealthrock", "earthquake", "toxic", "reflect", "lightscreen", "trickroom", "explosion", "gyroball"]);
// randomMoves("bronzongmega, );
randomMoves("chatot", ["nastyplot", "boomburst", "heatwave", "hiddenpowerground", "substitute", "chatter", "uturn"]);
// randomMoves("chatotmega, );
randomMoves("spiritomb", ["willowisp", "pursuit", "shadowsneak", "calmmind", "darkpulse", "rest", "sleeptalk", "psychic"]);
randomMoves("spiritombmega", ["willowisp", "pursuit", "shadowsneak", "calmmind", "darkpulse", "rest", "sleeptalk", "psychic", "curse", "partingshot"]);
randomMoves("garchomp", ["outrage", "dragonclaw", "earthquake", "stoneedge", "fireblast", "swordsdance", "stealthrock", "firefang"]);
randomMoves("garchompmega", ["outrage", "dracometeor", "earthquake", "stoneedge", "fireblast", "swordsdance"]);
randomMoves("lucario", ["swordsdance", "closecombat", "crunch", "extremespeed", "icepunch", "meteormash", "nastyplot", "aurasphere", "darkpulse", "vacuumwave", "flashcannon"]);
randomMoves("lucariomega", ["swordsdance", "closecombat", "crunch", "icepunch", "bulletpunch", "meteormash", "nastyplot", "aurasphere", "darkpulse", "flashcannon"]);
randomMoves("hippowdon", ["earthquake", "slackoff", "whirlwind", "stealthrock", "toxic", "stoneedge"]);
// randomMoves("hippowdonmega, );
randomMoves("drapion", ["knockoff", "taunt", "toxicspikes", "poisonjab", "whirlwind", "swordsdance", "aquatail", "earthquake"]);
randomMoves("drapionmega", ["knockoff", "pursuit", "taunt", "toxicspikes", "toxic", "earthquake", "stompingtantrum", "swordsdance", "shoreup"]);
randomMoves("toxicroak", ["swordsdance", "gunkshot", "drainpunch", "suckerpunch", "icepunch", "substitute"]);
// randomMoves("toxicroakmega, );
randomMoves("carnivine", ["swordsdance", "powerwhip", "return", "sleeppowder", "substitute", "knockoff"]);
// randomMoves("carnivinemega, );
randomMoves("lumineon", ["scald", "icebeam", "uturn", "toxic", "defog"]);
// randomMoves("lumineonmega, );
randomMoves("abomasnow", ["woodhammer", "iceshard", "blizzard", "gigadrain", "leechseed", "substitute", "focuspunch", "earthquake"]);
randomMoves("abomasnowmega", ["blizzard", "gigadrain", "woodhammer", "earthquake", "iceshard", "hiddenpowerfire"]);
randomMoves("rotom", ["thunderbolt", "voltswitch", "shadowball", "substitute", "painsplit", "hiddenpowerice", "trick", "willowisp"]);
// randomMoves("rotommega, );
randomMoves("rotomheat", ["overheat", "thunderbolt", "voltswitch", "hiddenpowerice", "painsplit", "willowisp"]);
randomMoves("rotomwash", ["hydropump", "thunderbolt", "voltswitch", "painsplit", "defog", "willowisp", "trick"]);
randomMoves("rotomfrost", ["blizzard", "thunderbolt", "voltswitch", "painsplit", "willowisp", "trick"]);
randomMoves("rotomfan", ["airslash", "thunderbolt", "voltswitch", "painsplit", "willowisp", "defog"]);
randomMoves("rotommow", ["leafstorm", "thunderbolt", "voltswitch", "hiddenpowerfire", "trick"]);
randomMoves("uxie", ["stealthrock", "thunderwave", "psychic", "uturn", "healbell", "knockoff", "yawn"]);
// randomMoves("uxiemega, );
randomMoves("mesprit", ["calmmind", "psychic", "psyshock", "energyball", "signalbeam", "hiddenpowerfire", "icebeam", "healingwish", "stealthrock", "uturn"]);
// randomMoves("mespritmega, );
randomMoves("azelf", ["nastyplot", "psyshock", "fireblast", "dazzlinggleam", "stealthrock", "knockoff", "taunt", "explosion"]);
// randomMoves("azelfmega, );
randomMoves("dialga", ["stealthrock", "toxic", "dracometeor", "fireblast", "flashcannon", "roar", "thunderbolt"]);
// randomMoves("dialgamega, );
randomMoves("palkia", ["spacialrend", "dracometeor", "hydropump", "thunderwave", "dragontail", "fireblast"]);
// randomMoves("palkiamega, );
randomMoves("heatran", ["magmastorm", "lavaplume", "stealthrock", "earthpower", "flashcannon", "protect", "toxic", "roar"]);
// randomMoves("heatranmega, );
randomMoves("regigigas", ["thunderwave", "confuseray", "substitute", "return", "knockoff", "drainpunch"]);
// randomMoves("regigigasmega, );
randomMoves("giratina", ["rest", "sleeptalk", "dragontail", "roar", "willowisp", "shadowball", "dragonpulse"]);
// randomMoves("giratinamega, );
randomMoves("giratinaorigin", ["dracometeor", "shadowsneak", "dragontail", "willowisp", "defog", "toxic", "shadowball", "earthquake"]);
randomMoves("cresselia", ["moonlight", "psychic", "icebeam", "thunderwave", "toxic", "substitute", "psyshock", "moonblast", "calmmind"]);
// randomMoves("cresseliamega, );
randomMoves("phione", ["scald", "knockoff", "uturn", "icebeam", "toxic", "healbell"]);
// randomMoves("phionemega, );
randomMoves("manaphy", ["tailglow", "surf", "icebeam", "energyball", "psychic"]);
// randomMoves("manaphymega, );
randomMoves("darkrai", ["hypnosis", "darkpulse", "focusblast", "nastyplot", "substitute", "sludgebomb"]);
// randomMoves("darkraimega, );
randomMoves("shaymin", ["seedflare", "earthpower", "airslash", "psychic", "rest", "substitute", "leechseed"]);
// randomMoves("shayminmega, );
randomMoves("shayminsky", ["seedflare", "airslash", "earthpower", "hiddenpowerice", "substitute", "leechseed"]);
// randomMoves("shayminskymega, );
randomMoves("arceus", ["swordsdance", "extremespeed", "shadowclaw", "earthquake", "recover"]);
// randomMoves("arceusmega, );
randomMoves("arceusbug", ["swordsdance", "xscissor", "stoneedge", "recover", "earthquake", "ironhead"]);
randomMoves("arceusdark", ["calmmind", "judgment", "recover", "fireblast", "toxic"]);
randomMoves("arceusdragon", ["swordsdance", "outrage", "extremespeed", "earthquake", "recover", "judgment", "fireblast", "willowisp", "defog"]);
randomMoves("arceuselectric", ["calmmind", "judgment", "recover", "icebeam", "earthpower"]);
randomMoves("arceusfairy", ["calmmind", "judgment", "recover", "willowisp", "defog", "earthpower", "toxic"]);
randomMoves("arceusfighting", ["calmmind", "judgment", "stoneedge", "shadowball", "recover", "roar", "icebeam"]);
randomMoves("arceusfire", ["calmmind", "fireblast", "roar", "thunderbolt", "icebeam", "recover"]);
randomMoves("arceusflying", ["calmmind", "judgment", "earthpower", "fireblast", "toxic", "recover"]);
randomMoves("arceusghost", ["swordsdance", "shadowforce", "shadowclaw", "brickbreak", "extremespeed", "recover", "judgment", "toxic", "defog"]);
randomMoves("arceusgrass", ["judgment", "recover", "calmmind", "icebeam", "fireblast"]);
randomMoves("arceusground", ["swordsdance", "earthquake", "stoneedge", "recover", "judgment", "icebeam", "toxic", "stealthrock"]);
randomMoves("arceusice", ["calmmind", "judgment", "thunderbolt", "fireblast", "recover"]);
randomMoves("arceuspoison", ["calmmind", "sludgebomb", "fireblast", "recover", "icebeam", "defog"]);
randomMoves("arceuspsychic", ["judgment", "calmmind", "fireblast", "recover", "icebeam", "toxic"]);
randomMoves("arceusrock", ["swordsdance", "earthquake", "stoneedge", "recover", "judgment", "willowisp", "stealthrock"]);
randomMoves("arceussteel", ["judgment", "recover", "willowisp", "defog", "roar", "swordsdance", "ironhead", "earthquake", "stoneedge"]);
randomMoves("arceuswater", ["recover", "calmmind", "judgment", "icebeam", "toxic", "defog"]);
randomMoves("victini", ["vcreate", "boltstrike", "uturn", "zenheadbutt", "grassknot", "focusblast", "blueflare"]);
// randomMoves("victinimega, );
randomMoves("serperior", ["leafstorm", "dragonpulse", "hiddenpowerfire", "substitute", "leechseed", "glare"]);
// randomMoves("serperiormega, );
randomMoves("emboar", ["flareblitz", "superpower", "wildcharge", "headsmash", "fireblast", "grassknot", "suckerpunch"]);
// randomMoves("emboarmega, );
randomMoves("samurott", ["swordsdance", "liquidation", "aquajet", "megahorn", "sacredsword", "hydropump", "icebeam", "grassknot"]);
randomMoves("samurottmega", ["swordsdance", "razorshell", "megahorn", "aerialace", "psychocut", "sacredsword", "slackoff", "flipturn"]);
randomMoves("watchog", ["hypnosis", "substitute", "superfang", "swordsdance", "return", "knockoff"]);
// randomMoves("watchogmega, );
randomMoves("stoutland", ["return", "crunch", "wildcharge", "superpower", "icefang"]);
randomMoves("stoutlandmega", ["return", "bodyslam", "ironhead", "wish", "uturn", "earthquake"]);
randomMoves("liepard", ["knockoff", "playrough", "uturn", "copycat", "encore", "thunderwave", "nastyplot", "darkpulse", "substitute"]);
// randomMoves("liepardmega, );
randomMoves("simisage", ["nastyplot", "gigadrain", "focusblast", "hiddenpowerice", "substitute", "leafstorm", "knockoff", "superpower"]);
// randomMoves("simisagemega, );
randomMoves("simisear", ["substitute", "nastyplot", "fireblast", "focusblast", "grassknot", "hiddenpowerrock"]);
randomMoves("simisearmega", ["substitute", "nastyplot", "fireblast", "dazzlinggleam", "focusblast"]);
randomMoves("simipour", ["substitute", "nastyplot", "hydropump", "icebeam", "focusblast"]);
// randomMoves("simipourmega, );
randomMoves("musharna", ["calmmind", "psychic", "psyshock", "signalbeam", "moonlight", "healbell", "thunderwave"]);
// randomMoves("musharnamega, );
randomMoves("unfezant", ["return", "pluck", "hypnosis", "tailwind", "uturn", "roost", "nightslash"]);
// randomMoves("unfezantmega, );
randomMoves("zebstrika", ["voltswitch", "hiddenpowergrass", "overheat", "wildcharge", "thunderbolt"]);
randomMoves("zebstrikamega", ["voltswitch", "jawlock", "overheat", "wildcharge", "pursuit"]);
randomMoves("gigalith", ["stealthrock", "rockblast", "earthquake", "explosion", "stoneedge", "superpower"]);
randomMoves("gigalithmega", ["sunnyday", "synthesis", "meteorbeam", "solarbeam"]);
randomMoves("swoobat", ["substitute", "calmmind", "storedpower", "heatwave", "airslash", "roost"]);
// randomMoves("swoobatmega, );
randomMoves("excadrill", ["swordsdance", "earthquake", "ironhead", "rockslide", "rapidspin"]);
// randomMoves("excadrillmega, );
randomMoves("audino", ["wish", "protect", "healbell", "toxic", "thunderwave", "reflect", "lightscreen", "doubleedge"]);
randomMoves("audinomega", ["wish", "calmmind", "healbell", "dazzlinggleam", "protect", "fireblast"]);
randomMoves("conkeldurr", ["bulkup", "drainpunch", "icepunch", "knockoff", "machpunch"]);
randomMoves("conkeldurrmega", ["bulkup", "drainpunch", "shoreup", "icepunch", "knockoff", "machpunch"]);
randomMoves("seismitoad", ["hydropump", "scald", "sludgewave", "earthquake", "knockoff", "stealthrock", "toxic", "raindance"]);
// randomMoves("seismitoadmega, );
randomMoves("throh", ["bulkup", "circlethrow", "icepunch", "stormthrow", "rest", "sleeptalk", "knockoff"]);
// randomMoves("throhmega, );
randomMoves("sawk", ["closecombat", "earthquake", "icepunch", "poisonjab", "bulkup", "knockoff"]);
// randomMoves("sawkmega, );
randomMoves("leavanny", ["stickyweb", "swordsdance", "leafblade", "lunge", "knockoff"]);
randomMoves("leavannymega", ["quiverdance", "synthesis", "lunge", "appleacid", "bugbuzz", "electroweb", "airslash"]);
randomMoves("scolipede", ["protect", "spikes", "toxicspikes", "megahorn", "rockslide", "earthquake", "swordsdance", "poisonjab"]);
// randomMoves("scolipedemega, );
randomMoves("whimsicott", ["encore", "taunt", "leechseed", "uturn", "toxic", "stunspore", "memento", "tailwind", "moonblast", "defog"]);
// randomMoves("whimsicottmega, );
randomMoves("lilligant", ["sleeppowder", "quiverdance", "petaldance", "gigadrain", "hiddenpowerrock"]);
// randomMoves("lilligantmega, );
randomMoves("basculin", ["liquidation", "aquajet", "superpower", "crunch", "headsmash"]);
randomMoves("basculinbluestriped", ["liquidation", "aquajet", "superpower", "crunch", "headsmash"]);
// randomMoves("basculinmega, );
randomMoves("krookodile", ["earthquake", "stoneedge", "pursuit", "knockoff", "stealthrock", "superpower"]);
randomMoves("krookodilemega", ["earthquake", "pursuit", "knockoff", "stealthrock", "memento", "taunt"]);
randomMoves("darmanitan", ["uturn", "flareblitz", "rockslide", "earthquake", "superpower"]);
// randomMoves("darmanitanmega, );
// randomMoves("darmanitangalarmega, );
randomMoves("maractus", ["spikes", "gigadrain", "leechseed", "hiddenpowerfire", "toxic", "suckerpunch", "spikyshield"]);
// randomMoves("maractusmega, );
randomMoves("crustle", ["stealthrock", "spikes", "shellsmash", "earthquake", "rockblast", "xscissor", "stoneedge"]);
// randomMoves("crustlemega, );
randomMoves("scrafty", ["dragondance", "icepunch", "highjumpkick", "drainpunch", "rest", "bulkup", "knockoff"]);
// randomMoves("scraftymega, );
randomMoves("sigilyph", ["calmmind", "psychic", "psyshock", "heatwave", "roost", "airslash", "icebeam"]);
// randomMoves("sigilyphmega, );
randomMoves("cofagrigus", ["nastyplot", "trickroom", "shadowball", "hiddenpowerfighting", "willowisp", "haze", "painsplit", "toxicspikes"]);
// randomMoves("cofagrigusmega, );
// randomMoves("runerigusmega, );
randomMoves("carracosta", ["shellsmash", "aquajet", "liquidation", "stoneedge", "earthquake"]);
// randomMoves("carracostamega, );
randomMoves("archeops", ["headsmash", "acrobatics", "stoneedge", "earthquake", "aquatail", "uturn", "endeavor"]);
randomMoves("archeopsmega", ["headsmash", "bravebird", "stoneedge", "earthquake", "aquatail", "uturn", "endeavor", "dualwingbeat"]);
randomMoves("garbodor", ["spikes", "toxicspikes", "gunkshot", "haze", "painsplit", "toxic", "drainpunch"]);
randomMoves("garbodormega", ["spikes", "toxicspikes", "gunkshot", "haze", "painsplit", "toxic", "drainpunch", "stealthrock", "knockoff"]);
randomMoves("zoroark", ["suckerpunch", "darkpulse", "focusblast", "flamethrower", "uturn", "nastyplot", "knockoff", "trick", "sludgebomb"]);
randomMoves("zoroarkmega", ["suckerpunch", "darkpulse", "focusblast", "flamethrower", "uturn", "nastyplot", "knockoff", "trick", "sludgebomb"]);
randomMoves("cinccino", ["tailslap", "bulletseed", "rockblast", "knockoff", "uturn"]);
randomMoves("cinccinomega", ["tailslap", "bulletseed", "rockblast", "tripleaxel", "knockoff", "uturn"]);
randomMoves("gothitelle", ["confide", "charm", "taunt", "rest"]);
randomMoves("gothitellemega", ["futuresight", "calmmind", "wish", "doomdesire", "psychic", "protect"]);
randomMoves("reuniclus", ["calmmind", "recover", "psychic", "focusblast", "shadowball", "trickroom", "psyshock"]);
randomMoves("reuniclusmega", ["psychoboost", "recover", "psychic", "trickroom", "psyshock", "hammerarm", "superpower", "photongeyser"]);
randomMoves("swanna", ["bravebird", "roost", "hurricane", "icebeam", "raindance", "defog", "scald"]);
// randomMoves("swannamega, );
randomMoves("vanilluxe", ["blizzard", "explosion", "hiddenpowerground", "flashcannon", "autotomize", "freezedry"]);
randomMoves("vanilluxemega", ["blizzard", "weatherball", "hiddenpowerground", "flashcannon", "autotomize", "freezedry"]);
randomMoves("sawsbuck", ["swordsdance", "hornleech", "jumpkick", "return", "substitute"]);
randomMoves("sawsbuckmega", ["swordsdance", "hornleech", "jumpkick", "playrough", "moonblast", "return", "substitute"]);
randomMoves("sawsbucksummermega", ["growth", "hornleech", "jumpkick", "flamethrower", "overheat", "leafstorm", "substitute"]);
randomMoves("sawsbuckautumnmega", ["hornleech", "swordsdance", "strengthsap", "poltergeist", "shadowsneak", "jumpkick", "substitute"]);
randomMoves("sawsbuckwintermega", ["swordsdance", "hornleech", "jumpkick", "iceshard", "tripleaxel", "substitute"]);
randomMoves("emolga", ["thunderbolt", "acrobatics", "encore", "uturn", "knockoff", "roost", "toxic"]);
// randomMoves("emolgamega, );
randomMoves("escavalier", ["megahorn", "pursuit", "ironhead", "knockoff", "swordsdance", "drillrun"]);
// randomMoves("escavaliermega, );
randomMoves("amoonguss", ["spore", "stunspore", "gigadrain", "clearsmog", "hiddenpowerfire", "synthesis", "sludgebomb", "foulplay"]);
// randomMoves("amoongussmega, );
randomMoves("jellicent", ["scald", "willowisp", "strengthsap", "toxic", "hex", "icebeam", "taunt"]);
// randomMoves("jellicentmega, );
randomMoves("alomomola", ["wish", "protect", "knockoff", "toxic", "scald"]);
// randomMoves("alomomolamega, );
randomMoves("galvantula", ["thunder", "hiddenpowerice", "gigadrain", "bugbuzz", "voltswitch", "stickyweb"]);
// randomMoves("galvantulamega, );
randomMoves("ferrothorn", ["spikes", "stealthrock", "leechseed", "powerwhip", "protect", "knockoff", "gyroball"]);
// randomMoves("ferrothornmega, );
randomMoves("klinklang", ["shiftgear", "return", "geargrind", "wildcharge", "substitute"]);
randomMoves("klinklangmega", ["shiftgear", "return", "geargrind", "wildcharge", "substitute", "risingvoltage", "steelroller", "voltswitch"]);
randomMoves("eelektross", ["thunderbolt", "flamethrower", "uturn", "gigadrain", "knockoff", "superpower", "hiddenpowerice"]);
randomMoves("eelektrossmega", ["thunderbolt", "flamethrower", "uturn", "gigadrain", "knockoff", "superpower", "hiddenpowerice"]);
randomMoves("beheeyem", ["nastyplot", "psychic", "psyshock", "thunderbolt", "hiddenpowerfighting", "trick", "trickroom", "signalbeam"]);
// randomMoves("beheeyemmega, );
randomMoves("chandelure", ["calmmind", "shadowball", "energyball", "fireblast", "hiddenpowerground", "trick", "substitute", "painsplit"]);
randomMoves("chandeluremega", ["calmmind", "shadowball", "energyball", "fireblast", "hiddenpowerground", "substitute", "painsplit", "mindblown"]);
randomMoves("haxorus", ["dragondance", "swordsdance", "outrage", "earthquake", "poisonjab", "taunt"]);
// randomMoves("haxorusmega, );
randomMoves("beartic", ["iciclecrash", "superpower", "nightslash", "stoneedge", "swordsdance", "aquajet"]);
// randomMoves("bearticmega, );
randomMoves("cryogonal", ["icebeam", "recover", "toxic", "rapidspin", "haze", "freezedry", "hiddenpowerground"]);
// randomMoves("cryogonalmega, );
randomMoves("accelgor", ["spikes", "yawn", "bugbuzz", "focusblast", "energyball", "hiddenpowerrock", "encore", "toxicspikes"]);
// randomMoves("accelgormega, );
randomMoves("stunfisk", ["discharge", "earthpower", "scald", "toxic", "rest", "sleeptalk", "stealthrock"]);
// randomMoves("stunfiskmega, );
randomMoves("mienshao", ["uturn", "fakeout", "highjumpkick", "stoneedge", "poisonjab", "swordsdance", "knockoff"]);
// randomMoves("mienshaomega, );
randomMoves("druddigon", ["outrage", "earthquake", "suckerpunch", "dragontail", "taunt", "glare", "stealthrock", "gunkshot", "firepunch"]);
// randomMoves("druddigonmega, );
randomMoves("golurk", ["earthquake", "shadowpunch", "dynamicpunch", "icepunch", "stealthrock", "rockpolish"]);
// randomMoves("golurkmega", ["earthquake", "phantomforce", "dynamicpunch", "icepunch", "stealthrock", "rockpolish"]);
randomMoves("bisharp", ["swordsdance", "knockoff", "ironhead", "suckerpunch", "lowkick"]);
randomMoves("bisharpmega", ["swordsdance", "knockoff", "ironhead", "suckerpunch", "lowkick", "pursuit", "stealthrock"]);
randomMoves("bouffalant", ["headcharge", "earthquake", "stoneedge", "megahorn", "swordsdance", "superpower"]);
// randomMoves("bouffalantmega, );
randomMoves("braviary", ["bravebird", "superpower", "return", "uturn", "substitute", "bulkup", "roost"]);
// randomMoves("braviarymega, );
randomMoves("mandibuzz", ["foulplay", "bravebird", "roost", "taunt", "toxic", "uturn", "defog"]);
// randomMoves("mandibuzzmega, );
randomMoves("heatmor", ["fireblast", "suckerpunch", "focusblast", "gigadrain", "knockoff"]);
// randomMoves("heatmormega, );
randomMoves("durant", ["honeclaws", "ironhead", "xscissor", "rockslide", "superpower"]);
// randomMoves("durantmega, );
randomMoves("hydreigon", ["uturn", "dracometeor", "dragonpulse", "earthpower", "fireblast", "darkpulse", "roost", "flashcannon", "superpower"]);
randomMoves("hydreigonmega", ["uturn", "dracometeor", "dragonpulse", "earthpower", "fireblast", "darkpulse", "roost", "flashcannon", "superpower"]);
randomMoves("volcarona", ["quiverdance", "fierydance", "fireblast", "bugbuzz", "roost", "gigadrain", "hiddenpowerground"]);
// randomMoves("volcaronamega, );
randomMoves("cobalion", ["closecombat", "ironhead", "swordsdance", "substitute", "stoneedge", "voltswitch", "hiddenpowerice", "taunt", "stealthrock"]);
// randomMoves("cobalionmega, );
randomMoves("terrakion", ["swordsdance", "closecombat", "stoneedge", "earthquake", "stealthrock", "quickattack"]);
// randomMoves("terrakionmega, );
randomMoves("virizion", ["swordsdance", "closecombat", "leafblade", "stoneedge", "calmmind", "focusblast", "gigadrain", "hiddenpowerice", "substitute"]);
// randomMoves("virizionmega", ["swordsdance", "sacredsword", "leafblade", "stoneedge", "airslash", "substitute"]);
randomMoves("tornadus", ["hurricane", "heatwave", "superpower", "grassknot", "uturn", "defog", "tailwind"]);
randomMoves("tornadustherian", ["hurricane", "heatwave", "knockoff", "superpower", "uturn", "taunt"]);
randomMoves("thundurus", ["thunderwave", "nastyplot", "thunderbolt", "hiddenpowerflying", "focusblast", "substitute", "knockoff", "taunt"]);
randomMoves("thundurustherian", ["nastyplot", "thunderbolt", "hiddenpowerflying", "focusblast", "voltswitch"]);
randomMoves("reshiram", ["blueflare", "dracometeor", "dragonpulse", "toxic", "flamecharge", "stoneedge", "roost"]);
randomMoves("zekrom", ["boltstrike", "outrage", "dragonclaw", "dracometeor", "voltswitch", "honeclaws", "substitute", "roost"]);
randomMoves("landorus", ["calmmind", "rockpolish", "earthpower", "focusblast", "psychic", "sludgewave", "stealthrock", "knockoff", "rockslide"]);
randomMoves("landorustherian", ["swordsdance", "rockpolish", "earthquake", "stoneedge", "uturn", "superpower", "stealthrock", "fly"]);
randomMoves("kyurem", ["dracometeor", "icebeam", "earthpower", "outrage", "substitute", "focusblast", "roost"]);
randomMoves("kyuremblack", ["outrage", "fusionbolt", "icebeam", "roost", "substitute", "earthpower", "dragonclaw"]);
randomMoves("kyuremwhite", ["dracometeor", "icebeam", "fusionflare", "earthpower", "focusblast", "dragonpulse", "substitute", "roost", "toxic"]);
randomMoves("keldeo", ["hydropump", "secretsword", "calmmind", "airslash", "hiddenpowerelectric", "substitute", "scald", "icywind"]);
// randomMoves("keldeoresolute, );
randomMoves("meloetta", ["uturn", "calmmind", "psyshock", "hypervoice", "shadowball", "focusblast"]);
randomMoves("meloettapirouette", ["relicsong", "closecombat", "knockoff", "return"]);
randomMoves("genesect", ["technoblast", "uturn", "icebeam", "flamethrower", "thunderbolt", "ironhead", "shiftgear", "extremespeed", "blazekick"]);
// randomMoves("genesectburn, );
// randomMoves("genesectchill, );
// randomMoves("genesectdouse, );
// randomMoves("genesectshock, );
randomMoves("chesnaught", ["leechseed", "synthesis", "spikes", "drainpunch", "spikyshield", "woodhammer"]);
// randomMoves("chesnaughtmega, );
randomMoves("delphox", ["calmmind", "fireblast", "psyshock", "grassknot", "switcheroo", "shadowball"]);
randomMoves("delphoxmega", ["calmmind", "fireblast", "psyshock", "grassknot", "switcheroo", "shadowball", "skillswap", "speedswap", "recover"]);
randomMoves("greninja", ["hydropump", "icebeam", "gunkshot", "uturn", "spikes", "toxicspikes", "taunt"]);
// randomMoves("greninjamega, );
randomMoves("greninjaash", ["hydropump", "icebeam", "darkpulse", "watershuriken", "uturn"]);
randomMoves("diggersby", ["earthquake", "return", "wildcharge", "uturn", "swordsdance", "quickattack", "knockoff", "agility"]);
// randomMoves("diggersbymega, );
randomMoves("talonflame", ["bravebird", "flareblitz", "roost", "swordsdance", "uturn", "willowisp", "overheat"]);
randomMoves("talonflamemega", ["heatwave", "hiddenpowerice", "roost", "airslash", "uturn", "willowisp", "overheat"]);
randomMoves("vivillon", ["sleeppowder", "quiverdance", "hurricane", "energyball", "substitute"]);
// randomMoves("vivillonfancy, );
// randomMoves("vivillonpokeball, );
// randomMoves("vivillonmega, );
randomMoves("pyroar", ["sunnyday", "fireblast", "hypervoice", "solarbeam", "willowisp", "darkpulse"]);
// randomMoves("pyroarmega, );
randomMoves("floetteeternal", ["lightofruin", "psychic", "hiddenpowerground", "moonblast"]);
randomMoves("florges", ["calmmind", "moonblast", "synthesis", "aromatherapy", "wish", "toxic", "protect", "defog"]);
// randomMoves("florgesmega, );
randomMoves("gogoat", ["bulkup", "hornleech", "earthquake", "rockslide", "substitute", "leechseed", "milkdrink"]);
// randomMoves("gogoatmega, );
randomMoves("pangoro", ["knockoff", "superpower", "gunkshot", "icepunch", "partingshot", "drainpunch"]);
// randomMoves("pangoromega, );
randomMoves("furfrou", ["return", "cottonguard", "thunderwave", "substitute", "toxic", "suckerpunch", "uturn", "rest"]);
// randomMoves("furfroumega, );
randomMoves("meowstic", ["toxic", "yawn", "thunderwave", "psychic", "reflect", "lightscreen", "healbell", "knockoff", "partingshot"]);
randomMoves("meowsticf", ["calmmind", "psychic", "psyshock", "shadowball", "energyball", "thunderbolt"]);
randomMoves("meowsticmega", ["toxic", "yawn", "thunderwave", "foulplay", "reflect", "lightscreen", "healbell", "knockoff", "partingshot"]);
randomMoves("meowsticfmega", ["nastyplot", "psychic", "psyshock", "moonblast", "thunderbolt"]);
randomMoves("aegislash", ["flashcannon", "hiddenpowerice", "kingsshield", "shadowball", "shadowsneak"]);
randomMoves("aegislashblade", ["ironhead", "sacredsword", "shadowclaw", "shadowsneak", "swordsdance"]);
// randomMoves("aegislashmega, );
randomMoves("aromatisse", ["wish", "protect", "moonblast", "aromatherapy", "reflect", "lightscreen"]);
// randomMoves("aromatissemega, );
randomMoves("slurpuff", ["bellydrum", "playrough", "return", "drainpunch"]);
// randomMoves("slurpuffmega, );
randomMoves("malamar", ["superpower", "knockoff", "psychocut", "rest", "sleeptalk", "happyhour"]);
// randomMoves("malamarmega, );
randomMoves("barbaracle", ["shellsmash", "stoneedge", "liquidation", "earthquake", "crosschop", "stealthrock"]);
// randomMoves("barbaraclemega, );
randomMoves("dragalge", ["dracometeor", "sludgewave", "focusblast", "scald", "hiddenpowerfire", "toxicspikes", "dragonpulse", "flipturn"]);
randomMoves("dragalgemega", ["dracometeor", "sludgewave", "scald", "toxicspikes", "dragonpulse", "flipturn", "sludgebomb"]);
randomMoves("clawitzer", ["scald", "waterpulse", "darkpulse", "aurasphere", "icebeam", "uturn"]);
// randomMoves("clawitzermega, );
randomMoves("heliolisk", ["raindance", "hypervoice", "surf", "darkpulse", "hiddenpowerice", "voltswitch", "thunderbolt"]);
// randomMoves("helioliskmega, );
randomMoves("tyrantrum", ["stealthrock", "dragondance", "dragonclaw", "earthquake", "superpower", "outrage", "headsmash"]);
randomMoves("tyrantrummega", ["stealthrock", "dragondance", "dragonclaw", "earthquake", "superpower", "outrage", "headsmash"]);
randomMoves("aurorus", ["ancientpower", "blizzard", "thunderwave", "earthpower", "freezedry", "hypervoice", "stealthrock"]);
randomMoves("aurorusmega", ["blizzard", "thunderwave", "earthpower", "freezedry", "voltswitch", "rapidspin", "thunderbolt"]);
randomMoves("hawlucha", ["substitute", "swordsdance", "highjumpkick", "acrobatics", "roost", "stoneedge"]);
randomMoves("hawluchamega", ["substitute", "swordsdance", "highjumpkick", "bravebird", "roost", "stoneedge", "partingshot"]);
randomMoves("dedenne", ["substitute", "recycle", "thunderbolt", "nuzzle", "grassknot", "hiddenpowerice", "toxic"]);
// randomMoves("dedennemega, );
randomMoves("carbink", ["stealthrock", "lightscreen", "reflect", "explosion", "powergem", "moonblast"]);
// randomMoves("goomy, );
// randomMoves("sliggoo, );
randomMoves("goodra", ["dracometeor", "dragonpulse", "fireblast", "sludgebomb", "thunderbolt", "earthquake", "dragontail"]);
randomMoves("goodramega", ["dracometeor", "dragonpulse", "aquatail", "sludgebomb", "thunderbolt", "earthquake", "dragontail"]);
randomMoves("klefki", ["reflect", "lightscreen", "spikes", "magnetrise", "playrough", "thunderwave", "foulplay", "toxic"]);
// randomMoves("phantump, );
randomMoves("trevenant", ["hornleech", "shadowclaw", "earthquake", "rockslide", "woodhammer", "trickroom"]);
randomMoves("trevenantmega", ["hornleech", "poltergeist", "earthquake", "rockslide", "drainpunch", "synthesis"]);
// randomMoves("pumpkaboo, );
// randomMoves("pumpkaboosmall, );
// randomMoves("pumpkaboolarge, );
// randomMoves("pumpkaboosuper, );
randomMoves("gourgeist", ["willowisp", "seedbomb", "leechseed", "shadowsneak", "substitute", "synthesis"]);
randomMoves("gourgeistmega", ["willowisp", "nastyplot", "leechseed", "flamethrower", "shadowball", "strengthsap", "partingshot", "gigadrain", "hiddenpowerice"]);
randomMoves("gourgeistsmall", ["willowisp", "seedbomb", "leechseed", "shadowsneak", "substitute", "synthesis"]);
randomMoves("gourgeistsmallmega", ["willowisp", "strengthsap", "leechseed", "partingshot", "shadowsneak", "synthesis", "seedbomb", "encore", "gigadrain", "naturepower"]);
randomMoves("gourgeistlarge", ["willowisp", "seedbomb", "leechseed", "shadowsneak", "substitute", "synthesis"]);
randomMoves("gourgeistlargemega", ["willowisp", "seedbomb", "leechseed", "shadowsneak", "substitute", "synthesis", "strengthsap", "curse", "encore"]);
randomMoves("gourgeistsuper", ["willowisp", "seedbomb", "leechseed", "shadowsneak", "substitute", "synthesis"]);
randomMoves("gourgeistsupermega", ["willowisp", "seedbomb", "leechseed", "flareblitz", "substitute", "synthesis", "bodypress"]);
// randomMoves("bergmite, );
randomMoves("avalugg", ["avalanche", "recover", "toxic", "rapidspin", "roar", "earthquake"]);
// randomMoves("noibat, );
randomMoves("noivern", ["dracometeor", "hurricane", "flamethrower", "boomburst", "switcheroo", "uturn", "roost", "taunt"]);
randomMoves("noivernmega", ["dracometeor", "psychic", "flamethrower", "boomburst", "encore", "uturn", "roost", "taunt"]);
randomMoves("xerneas", ["geomancy", "moonblast", "focusblast", "thunderbolt", "hiddenpowerfire", "psyshock", "rockslide", "closecombat"]);
randomMoves("yveltal", ["darkpulse", "oblivionwing", "focusblast", "uturn", "foulplay", "suckerpunch", "toxic", "taunt", "roost"]);
randomMoves("zygarde", ["dragondance", "thousandarrows", "outrage", "extremespeed", "irontail"]);
randomMoves("zygarde10", ["dragondance", "thousandarrows", "outrage", "extremespeed", "irontail", "substitute"]);
// randomMoves("zygardecomplete, );
randomMoves("diancie", ["reflect", "lightscreen", "stealthrock", "diamondstorm", "moonblast", "hiddenpowerfire"]);
randomMoves("dianciemega", ["calmmind", "moonblast", "earthpower", "hiddenpowerfire", "diamondstorm"]);
randomMoves("hoopa", ["nastyplot", "psyshock", "shadowball", "focusblast", "trick"]);
randomMoves("hoopaunbound", ["nastyplot", "substitute", "psychic", "darkpulse", "focusblast", "hyperspacefury", "zenheadbutt", "icepunch", "drainpunch", "gunkshot", "trick"]);
randomMoves("volcanion", ["substitute", "steameruption", "fireblast", "sludgebomb", "earthpower", "superpower"]);
// randomMoves("rowlet, );
// randomMoves("dartrix, );
randomMoves("decidueye", ["spiritshackle", "uturn", "leafblade", "roost", "swordsdance", "suckerpunch"]);
randomMoves("decidueyemega", ["spiritshackle", "uturn", "leafblade", "roost", "swordsdance", "suckerpunch"]);
// randomMoves("litten, );
// randomMoves("torracat, );
randomMoves("incineroar", ["fakeout", "darkestlariat", "flareblitz", "uturn", "earthquake", "knockoff"]);
randomMoves("incineroarmega", ["fakeout", "darkestlariat", "flareblitz", "uturn", "earthquake", "knockoff"]);
// randomMoves("popplio, );
// randomMoves("brionne, );
randomMoves("primarina", ["hydropump", "moonblast", "scald", "psychic", "hiddenpowerfire"]);
randomMoves("primarinamega", ["hydropump", "moonblast", "scald", "psychic", "hiddenpowerfire"]);
// randomMoves("pikipek, );
// randomMoves("trumbeak, );
randomMoves("toucannon", ["boomburst", "beakblast", "roost", "brickbreak", "bulletseed"]);
randomMoves("toucannonmega", ["boomburst", "beakblast", "roost", "flamecharge", "brickbreak", "uturn"]);
// randomMoves("yungoos, );
randomMoves("gumshoos", ["uturn", "return", "crunch", "earthquake", "firepunch"]);
// randomMoves("gumshoostotem, );
randomMoves("gumshoosmega", ["uturn", "return", "crunch", "earthquake", "firepunch", "coil"]);
// randomMoves("grubbin, );
// randomMoves("charjabug, );
randomMoves("vikavolt", ["agility", "bugbuzz", "thunderbolt", "voltswitch", "energyball", "hiddenpowerice"]);
// randomMoves("vikavolttotem, );
randomMoves("vikavoltmega", ["agility", "bugbuzz", "thunderbolt", "voltswitch", "energyball", "hiddenpowerice", "thundercage", "xscissor", "leafblade", "roost", "stickyweb"]);
// randomMoves("crabrawler, );
randomMoves("crabominable", ["icehammer", "closecombat", "earthquake", "stoneedge"]);
randomMoves("oricorio", ["calmmind", "revelationdance", "hurricane", "toxic", "roost", "uturn"]);
randomMoves("oricoriopompom", ["calmmind", "revelationdance", "hurricane", "toxic", "roost", "uturn"]);
randomMoves("oricoriopau", ["calmmind", "revelationdance", "hurricane", "toxic", "roost", "uturn"]);
randomMoves("oricoriosensu", ["calmmind", "revelationdance", "hurricane", "toxic", "roost", "uturn"]);
// randomMoves("cutiefly, );
randomMoves("ribombee", ["quiverdance", "bugbuzz", "moonblast", "hiddenpowerfire", "roost"]);
// randomMoves("ribombeetotem, );
// randomMoves("rockruff, );
// randomMoves("rockruffdusk, );
randomMoves("lycanroc", ["swordsdance", "accelerock", "stoneedge", "drillrun", "firefang"]);
randomMoves("lycanrocmega", ["swordsdance", "accelerock", "stoneedge", "spikes", "firefang", "extremespeed", "closecombat"]);
randomMoves("lycanrocmidnight", ["stoneedge", "stealthrock", "suckerpunch", "swordsdance", "firepunch"]);
randomMoves("lycanrocmidnightmega", ["headsmash", "stoneedge", "stealthrock", "suckerpunch", "swordsdance", "firepunch"]);
randomMoves("lycanrocdusk", ["swordsdance", "accelerock", "stoneedge", "drillrun", "firefang", "return"]);
randomMoves("lycanrocduskmega", ["swordsdance", "accelerock", "stoneedge", "drillrun", "firefang", "closecombat"]);
// randomMoves("wishiwashi, );
randomMoves("wishiwashischool", ["scald", "hydropump", "icebeam", "hiddenpowergrass", "earthquake"]);
randomMoves("wishiwashimega", ["wish", "scald", "hydropump", "flipturn", "protect", "earthquake"]);
// randomMoves("mareanie, );
randomMoves("toxapex", ["toxicspikes", "banefulbunker", "recover", "scald", "haze"]);
// randomMoves("mudbray, );
randomMoves("mudsdale", ["earthquake", "bodypress", "rockslide", "heavyslam", "stealthrock"]);
randomMoves("mudsdalemega", ["earthquake", "bodypress", "rockslide", "bulkup", "painsplit", "stealthrock"]);
// randomMoves("dewpider, );
randomMoves("araquanid", ["liquidation", "lunge", "toxic", "mirrorcoat", "stickyweb"]);
// randomMoves("araquanidtotem, );
randomMoves("araquanidmega", ["scald", "hypnosis", "toxic", "mirrorcoat", "painsplit", "stickyweb"]);
// randomMoves("fomantis, );
randomMoves("lurantis", ["leafstorm", "hiddenpowerice", "superpower", "knockoff", "synthesis"]);
// randomMoves("lurantistotem, );
randomMoves("lurantismega", ["silverwind", "energyball", "moonlight", "substitute"]);
// randomMoves("morelull, );
randomMoves("shiinotic", ["spore", "strengthsap", "moonblast", "substitute", "leechseed"]);
// randomMoves("salandit, );
randomMoves("salazzle", ["nastyplot", "fireblast", "sludgewave", "hiddenpowergrass"]);
// randomMoves("salazzletotem, );
// randomMoves("stufful, );
randomMoves("bewear", ["hammerarm", "icepunch", "swordsdance", "return", "shadowclaw", "doubleedge"]);
// randomMoves("bounsweet, );
// randomMoves("steenee, );
randomMoves("tsareena", ["powerwhip", "highjumpkick", "knockoff", "uturn", "rapidspin", "synthesis"]);
randomMoves("comfey", ["aromatherapy", "drainingkiss", "toxic", "synthesis", "uturn"]);
randomMoves("oranguru", ["nastyplot", "psyshock", "focusblast", "thunderbolt", "trickroom"]);
randomMoves("passimian", ["rockslide", "closecombat", "earthquake", "ironhead", "uturn", "knockoff"]);
// randomMoves("wimpod, );
randomMoves("golisopod", ["spikes", "firstimpression", "liquidation", "aquajet", "knockoff"]);
// randomMoves("sandygast, );
randomMoves("palossand", ["shoreup", "earthpower", "shadowball", "protect", "toxic", "stealthrock"]);
randomMoves("pyukumuku", ["toxic", "recover", "counter", "reflect", "lightscreen"]);
randomMoves("typenull", ["return", "uturn", "swordsdance", "rest", "sleeptalk"]);
randomMoves("silvally", ["swordsdance", "return", "doubleedge", "crunch", "flamecharge", "flamethrower", "icebeam", "uturn", "ironhead"]);
randomMoves("silvallybug", ["flamethrower", "icebeam", "thunderbolt", "uturn", "defog"]);
randomMoves("silvallydark", ["multiattack", "swordsdance", "flamecharge", "ironhead"]);
randomMoves("silvallydragon", ["multiattack", "ironhead", "flamecharge", "flamethrower", "icebeam", "dracometeor", "swordsdance", "uturn"]);
randomMoves("silvallyelectric", ["multiattack", "flamethrower", "icebeam", "partingshot", "toxic"]);
randomMoves("silvallyfairy", ["multiattack", "flamethrower", "rockslide", "thunderwave", "partingshot"]);
randomMoves("silvallyfighting", ["swordsdance", "multiattack", "shadowclaw", "flamecharge", "ironhead"]);
randomMoves("silvallyfire", ["multiattack", "icebeam", "thunderbolt", "uturn", "defog"]);
randomMoves("silvallyflying", ["multiattack", "flamethrower", "ironhead", "partingshot", "thunderwave"]);
randomMoves("silvallyghost", ["multiattack", "flamethrower", "icebeam", "partingshot", "toxic"]);
randomMoves("silvallygrass", ["multiattack", "flamethrower", "icebeam", "partingshot", "toxic"]);
randomMoves("silvallyground", ["multiattack", "swordsdance", "flamecharge", "rockslide"]);
randomMoves("silvallyice", ["multiattack", "thunderbolt", "flamethrower", "uturn", "toxic"]);
randomMoves("silvallypoison", ["multiattack", "flamethrower", "icebeam", "partingshot", "toxic"]);
randomMoves("silvallypsychic", ["multiattack", "flamethrower", "rockslide", "partingshot", "thunderwave"]);
randomMoves("silvallyrock", ["multiattack", "flamethrower", "icebeam", "partingshot", "toxic"]);
randomMoves("silvallysteel", ["multiattack", "crunch", "flamethrower", "thunderbolt", "defog"]);
randomMoves("silvallywater", ["multiattack", "icebeam", "thunderbolt", "partingshot", "defog"]);
// randomMoves("silvallymega, );
randomMoves("minior", ["shellsmash", "powergem", "acrobatics", "earthquake"]);
// randomMoves("miniormeteor},, );
randomMoves("komala", ["return", "suckerpunch", "woodhammer", "earthquake", "playrough", "uturn"]);
randomMoves("turtonator", ["fireblast", "shellsmash", "earthquake", "dragontail", "explosion", "dragonpulse", "dracometeor"]);
randomMoves("togedemaru", ["ironhead", "spikyshield", "zingzap", "nuzzle", "uturn", "wish"]);
// randomMoves("togedemarutotem, );
randomMoves("mimikyu", ["swordsdance", "shadowsneak", "playrough", "taunt", "shadowclaw"]);
randomMoves("mimikyumega", ["strengthsap", "shadowsneak", "playrough", "taunt", "shadowclaw", "leechlife", "swordsdance", "firstimpression", "uturn"]);
randomMoves("bruxish", ["psychicfangs", "crunch", "liquidation", "icefang", "aquajet", "swordsdance"]);
randomMoves("drampa", ["dracometeor", "dragonpulse", "hypervoice", "fireblast", "thunderbolt", "glare", "roost"]);
randomMoves("dhelmise", ["powerwhip", "anchorshot", "knockoff", "earthquake", "rapidspin", "synthesis", "poltergeist"]);
randomMoves("dhelmisemega", ["anchorshot", "knockoff", "earthquake", "rapidspin", "liquidation", "poltergeist"]);
// randomMoves("jangmoo, );
// randomMoves("hakamoo, );
randomMoves("kommoo", ["dragondance", "outrage", "closecombat", "poisonjab", "clangingscales"]);
// randomMoves("kommoototem, );
randomMoves("kommoomega", ["swordsdance", "outrage", "closecombat", "poisonjab", "drainpunch", "clangingscales"]);
randomMoves("tapukoko", ["thunderbolt", "dazzlinggleam", "naturesmadness", "bravebird", "uturn", "defog"]);
randomMoves("tapulele", ["moonblast", "psychic", "psyshock", "calmmind", "focusblast", "hiddenpowerfire", "taunt"]);
randomMoves("tapubulu", ["woodhammer", "hornleech", "stoneedge", "superpower", "megahorn", "bulkup"]);
randomMoves("tapufini", ["calmmind", "moonblast", "scald", "taunt", "icebeam", "hydropump"]);
// randomMoves("cosmog, );
// randomMoves("cosmoem, );
randomMoves("solgaleo", ["sunsteelstrike", "zenheadbutt", "flareblitz", "morningsun", "stoneedge", "earthquake"]);
randomMoves("lunala", ["moongeistbeam", "psyshock", "calmmind", "focusblast", "roost"]);
randomMoves("nihilego", ["stealthrock", "toxicspikes", "sludgewave", "powergem", "thunderbolt", "grassknot"]);
randomMoves("buzzwole", ["superpower", "drainpunch", "leechlife", "stoneedge", "poisonjab", "earthquake"]);
randomMoves("pheromosa", ["highjumpkick", "uturn", "icebeam", "poisonjab", "bugbuzz"]);
randomMoves("xurkitree", ["thunderbolt", "voltswitch", "energyball", "dazzlinggleam", "hiddenpowerice", "electricterrain"]);
randomMoves("celesteela", ["autotomize", "heavyslam", "airslash", "fireblast", "earthquake", "leechseed", "protect"]);
randomMoves("kartana", ["leafblade", "sacredsword", "smartstrike", "knockoff", "swordsdance"]);
randomMoves("guzzlord", ["dracometeor", "knockoff", "earthquake", "heavyslam", "fireblast"]);
randomMoves("guzzlordmega", ["dracometeor", "knockoff", "earthquake", "heavyslam", "fireblast"]);
randomMoves("necrozma", ["calmmind", "photongeyser", "heatwave", "moonlight", "stealthrock"]);
randomMoves("necrozmaduskmane", ["swordsdance", "sunsteelstrike", "photongeyser", "earthquake", "knockoff", "autotomize"]);
randomMoves("necrozmadawnwings", ["calmmind", "moongeistbeam", "photongeyser", "heatwave", "powergem", "trickroom"]);
// randomMoves("necrozmaultra, );
randomMoves("magearna", ["shiftgear", "ironhead", "calmmind", "fleurcannon", "flashcannon", "thunderbolt", "focusblast"]);
randomMoves("marshadow", ["bulkup", "spectralthief", "closecombat", "rocktomb", "shadowsneak", "icepunch"]);
// randomMoves("poipole, );
randomMoves("naganadel", ["nastyplot", "dragonpulse", "sludgewave", "fireblast", "dracometeor", "uturn"]);
randomMoves("stakataka", ["gyroball", "stoneedge", "trickroom", "earthquake", "superpower", "stealthrock"]);
randomMoves("blacephalon", ["mindblown", "fireblast", "shadowball", "hiddenpowerice", "trick", "explosion", "calmmind"]);
randomMoves("zeraora", ["plasmafists", "closecombat", "voltswitch", "hiddenpowerice", "knockoff", "grassknot", "workup"]);
// randomMoves("melmetal, );
randomMoves("rillaboommega", ["grassyglide", "leechseed", "drainpunch", "knockoff", "swordsdance", "uturn"]);
randomMoves("cinderace", ["courtchange", "gunkshot", "highjumpkick", "pyroball", "uturn", "zenheadbutt"]);
randomMoves("cinderacemega", ["courtchange", "shadowball", "electroball", "pyroball", "energyball", "focusblast"]);
randomMoves("inteleonmega", ["firstimpression", "fellstinger", "liquidation", "aquajet", "iceshard", "uturn", "swordsdance"]);
randomMoves("corviknightmega", ["bodypress", "bravebird", "bulkup", "defog", "roost"]);
randomMoves("orbeetlemega", ["bodypress", "bugbuzz", "calmmind", "psychic", "recover", "stickyweb", "storedpower", "uturn", "focusblast", "hypnosis"]);
randomMoves("thievulmega", ["knockoff", "spiritbreak", "nastyplot", "partingshot", "moonlight"]);
randomMoves("boltundmega", ["bulkup", "crunch", "firefang", "playrough", "psychicfangs", "thunderfang", "voltswitch"]);
randomMoves("toxtricitymega", ["firepunch", "shiftgear", "thunderbolt", "venoshock", "voltswitch"]);
randomMoves("toxtricitylowkeymega", ["thunderbolt", "sludgebomb", "venomdrench", "slackoff", "voltswitch"]);
// randomMoves("falinksmegacombat, );
randomMoves("falinksmegalegion", ["kingsshield", "closecombat", "noretreat", "poisonjab", "rockslide", "throatchop"]);
// randomMoves("arctozolt, );
randomMoves("dragapult", ["dracometeor", "fireblast", "shadowball", "thunderbolt", "uturn"]);
randomMoves("dragapultmega", ["dracometeor", "fireblast", "shadowball", "thunderbolt", "uturn"]);
// randomMoves("urshifurapidstrike, )
// SANDBOX (NEW)
randomMoves("pichuspikyearedmega", ["volttackle", "metronome", "grassknot", "encore"],);
randomMoves("floetteeternalmega", ["lightofruin", "psychic", "hiddenpowerground", "moonblast", "calmmind"]);
randomMoves("meltanmega", ["toxic", "thunderwave", "acidarmor", "bodypress", "gyroball"]);

export const FormatsData = data;
