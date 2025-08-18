export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	// Slate 1
	dragapult: {
		inherit: true,
		baseStats: {hp: 142, atk: 75, def: 100, spa: 75, spd: 120, spe: 88},
	},
	numel: {
		inherit: true,
		baseStats: {hp: 120, atk: 120, def: 80, spa: 130, spd: 90, spe: 70},
	},
	donphan: {
		inherit: true,
		otherFormes: ["Donphan-Mega"],
		formeOrder: ["Donphan", "Donphan-Mega"],
	},
	donphanmega: {
		num: 232,
		name: "Donphan-Mega",
		baseSpecies: "Donphan",
		forme: "Mega",
		types: ["Ground"],
		baseStats: {hp: 90, atk: 138, def: 160, spa: 82, spd: 80, spe: 50},
		abilities: {0: "Thick Fat"},
		heightm: 1.5,
		weightkg: 175.5,
		color: "Gray",
		eggGroups: ["Field"],
		requiredItem: "Venusaurite",
	},
	cramorant: {
		inherit: true,
		baseStats: {hp: 70, atk: 115, def: 85, spa: 115, spd: 125, spe: 115},
	},
	cramorantgulping: {
		inherit: true,
		baseStats: {hp: 70, atk: 115, def: 85, spa: 115, spd: 125, spe: 115},
	},
	cramorantgorging: {
		inherit: true,
		baseStats: {hp: 70, atk: 115, def: 85, spa: 115, spd: 125, spe: 115},
	},
	trevenant: {
		inherit: true,
		baseStats: {hp: 127, atk: 150, def: 104, spa: 80, spd: 104, spe: 74},
	},
	// Slate 2
	moltresgalar: {
		inherit: true,
		abilities: {0: "Regenerator"},
	},
	zapdos: {
		inherit: true,
		types: ["Electric", "Flying", "Steel"],
	},
	skuntank: {
		inherit: true,
		baseStats: {hp: 143, atk: 123, def: 87, spa: 101, spd: 81, spe: 94},
	},
	taurospaldeablaze: {
		inherit: true,
		baseStats: {hp: 75, atk: 140, def: 135, spa: 60, spd: 100, spe: 130},
	},
	// Slate 3
	walkingwake: {
		inherit: true,
		baseStats: {hp: 109, atk: 83, def: 125, spa: 91, spd: 83, spe: 99},
	},
	/*
:bellibolt: Bellibolt - Frantic Fusions by G-Luke
*/
	azelf: {
		inherit: true,
		baseStats: {hp: 75, atk: 145, def: 90, spa: 145, spd: 90, spe: 135},
	},
	ironvaliant: {
		inherit: true,
		baseStats: {hp: 116, atk: 60, def: 120, spa: 90, spd: 130, spe: 74},
	},
	// Slate 4
	magmar: {
		inherit: true,
		types: ["Fire", "Steel"],
		baseStats: {hp: 95, atk: 115, def: 107, spa: 110, spd: 115, spe: 83},
		abilities: {0: "Pressure", 1: "Unnerve", H: "Mirror Armor"},
		evos: null,
	},

/*
:Tyranitar: Tyranitar - Revelationmons by HydreigonTheChild
*/
	mamoswine: {
		inherit: true,
		abilities: {0: "Strong Jaw", 1: "Ice Body", H: "Sturdy"},
	},
/*
:greninja: Greninja - Convergence by G-Luke
*/
	tinglu: {
		inherit: true,
		baseStats: {hp: 45, atk: 80, def: 55, spa: 125, spd: 110, spe: 155},
	},
/*
:registeel: Registeel - Sketchmons by LettuceLeaf07
*/
	slowbro: {
		inherit: true,
		baseStats: {hp: 95, atk: 95, def: 130, spa: 120, spd: 100, spe: 50},
	},
	// Slate 5
/*
:ogerpon: Ogerpon - Convergence by G-Luke
*/
	cutiefly: {
		inherit: true,
		types: ["Bug", "Ghost"],
		baseStats: {hp: 60, atk: 75, def: 60, spa: 85, spd: 60, spe: 144},
		abilities: {0: "Snow Cloak", H: "Cursed Body"},
		evos: null,
	},
	revavroom: {
		inherit: true,
		otherFormes: ["Revavroom-Mega"],
		formeOrder: ["Revavroom", "Revavroom-Mega"],
	},
	revavroommega: {
		num: 966,
		name: "Revavroom-Mega",
		baseSpecies: "Revavroom",
		forme: "Mega",
		types: ["Steel", "Flying"],
		baseStats: {hp: 80, atk: 149, def: 110, spa: 64, spd: 87, spe: 110},
		abilities: {0: "Aerilate"},
		heightm: 2,
		weightkg: 124,
		color: "Gray",
		eggGroups: ["Mineral"],
		requiredItem: "Pinsirite",
	},
	// Slate 6
	sceptilemega: {
		inherit: true,
		requiredItem: null,
	},
	munkidori: {
		inherit: true,
		abilities: {0: "Intimidate"},
	},
/*
:enamorus-therian: Enamorus-Therian - Nature Swap by PQRDG
*/
	yanma: {
		inherit: true,
		types: ["Poison", "Psychic"],
		baseStats: {hp: 70, atk: 65, def: 60, spa: 145, spd: 115, spe: 110},
		abilities: {0: "Curious Medicine", 1: "Own Tempo", H: "Regenerator"},
		evos: null,
	},
	rotom: {
		inherit: true,
		otherFormes: ["Rotom-Heat", "Rotom-Wash", "Rotom-Frost", "Rotom-Fan", "Rotom-Mow", "Rotom-Mow-Mega"],
		formeOrder: ["Rotom", "Rotom-Heat", "Rotom-Wash", "Rotom-Frost", "Rotom-Fan", "Rotom-Mow", "Rotom-Mow-Mega"],
	},
	rotommowmega: {
		num: 479,
		name: "Rotom-Mow-Mega",
		baseSpecies: "Rotom",
		forme: "Mow-Mega",
		types: ["Electric", "Grass"],
		gender: "N",
		baseStats: {hp: 50, atk: 65, def: 127, spa: 135, spd: 127, spe: 116},
		abilities: {0: "Intimidate"},
		heightm: 0.6,
		weightkg: 4.1,
		color: "Red",
		eggGroups: ["Amorphous"],
		requiredItem: "Manectite",
	},
	misdreavus: {
		inherit: true,
		types: ["Ghost", "Steel"],
		baseStats: {hp: 85, atk: 85, def: 110, spa: 110, spd: 110, spe: 110},
		abilities: {0: "Sturdy", H: "Overcoat"},
		evos: null,
	},
	ironbundle: {
		inherit: true,
		baseStats: {hp: 136, atk: 60, def: 124, spa: 114, spd: 80, spe: 56},
	},
	// Slate 7
/*
:Tinkaton: Tinkaton - Frantic Fusions by Bobsican
*/
	latias: {
		inherit: true,
		types: ["Dragon", "Psychic", "Electric"],
	},
/*
:zarude: Zarude - Convergence by PQRDG
*/
	azumarill: {
		inherit: true,
		baseStats: {hp: 100, atk: 65, def: 95, spa: 75, spd: 95, spe: 65},
	},
	venusaurmega: {
		inherit: true,
		requiredItem: null,
	},
	// Slate 8
	altariamega: {
		inherit: true,
		requiredItem: null,
	},
/*
:Ninetales: Ninetales - Frantic Fusions by G-Luke
:Crabominable: Crabominable - Frantic Fusions by HydreigonTheChild
*/
	swampertmega: {
		inherit: true,
		requiredItem: null,
	},
	spiritomb: {
		inherit: true,
		otherFormes: ["Camerupt-Mega"],
		formeOrder: ["Camerupt", "Camerupt-Mega"],
	},
	spiritombmega: {
		num: 442,
		name: "Spiritomb-Mega",
		baseSpecies: "Spiritomb",
		forme: "Mega",
		types: ["Ghost", "Dark"],
		baseStats: {hp: 50, atk: 112, def: 138, spa: 132, spd: 138, spe: 15},
		abilities: {0: "Sheer Force"},
		heightm: 1.6,
		weightkg: 208.5,
		color: "Purple",
		eggGroups: ["Amorphous"],
		requiredItem: "Cameruptite",
	},
};
