export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	/*
	name: {
		inheritMoves: ['P1', 'P2'],
		num: -x,
		name: "Name",
		types: [""],
		baseStats: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
		abilities: {0: ""},
		weightkg: ,
	},
	
	In case someone who isn't me ends up coding this:
	inheritMoves is a custom argument that's being used to construct learnsets in scripts.ts.
	It basically tells the script "hey, this is a non-canon mon,
	"and we want it to inherit all of the moves this other mon can learn."
	
	You can also naturally inherit via the "prevo" argument, buuuut the issue there is that
	we need to be able to *remove* things from learnsets. Which doesn't work when the move you wanna delete
	was inherited from a prevo.
	So we fake it using some Fusion Evolution learnset construction code, giving us a learnset
	that is identical to the base mon's without having to copy it all out,
	which we can then freely add to/delete from in scripts.ts in the usual manner.
	
	The script automatically goes through and adds the learnsets of all the prevos of any mon you list in the "inheritMoves" array,
	so no need to list ["Bulbasaur", "Ivysaur", "Venusaur"]; just ["Venusaur"] will do!
	
	
	Megas and forme changes have their own variable, "megaOf", which is a liiiitle awkward,
	but basically the order I want things to happen is:
	> Construct the base Pokemon's learnsets
	> Modify the base Pokemon's learnsets
	> THEN construct the Mega's learnset, so we don't have to modify two things
	
	If we used inheritMoves for the Megas,
	I *think* we would have to add and delete every move change from both learnsets.
	Therefore, two separate loops, hahahhh i dont know what I'm doing
	
	*/
	
	pitchasaur: {
		inheritMoves: ['Venusaur'],
		num: -101,
		name: "Pitchasaur",
		types: ["Grass", "Water"],
		baseStats: {hp: 90, atk: 95, def: 105, spa: 95, spd: 105, spe: 35},
		abilities: {0: "Overgrow", H: "Storm Drain"},
		weightkg: 109.1,
		otherFormes: ["Pitchasaur-Mega"],
		formeOrder: ["Pitchasaur", "Pitchasaur-Mega"],
	},
	pitchasaurmega: {
		megaOf: "Pitchasaur",
		num: -101,
		name: "Name",
		baseSpecies: "Pitchasaur",
		forme: "Mega",
		types: ["Grass", "Water"],
		baseStats: {hp: 90, atk: 105, def: 120, spa: 135, spd: 120, spe: 55},
		abilities: {0: "Drizzle"},
		weightkg: 131.86,
		//The battleOnly field isn't used in canon megas,
		//but sometimes not having it for non-canon megas allows the Mega to enter battle already Mega Evolved
		//Which we obviously would like to avoid!
		battleOnly: "Pitchasaur",
		requiredItem: "Pitchasaurite",
	},
	blastonoise: {
		inheritMoves: ['Blastoise'],
		num: -102,
		name: "Blastonoise",
		types: ["Water", "Fairy"],
		baseStats: {hp: 112, atk: 50, def: 105, spa: 75, spd: 110, spe: 78},
		abilities: {0: "Torrent", H: "Natural Cure"},
		weightkg: 112.5,
		otherformes: ["Blastonoise-Mega"],
		formeOrder: ["Blastonoise", "Blastonoise-Mega"],
	},
	blastonoisemega: {
		megaOf: "Blastonoise",
		num: -102,
		name: "Blastonoise-Mega",
		baseSpecies: "Blastonoise",
		forme: "Mega",
		types: ["Water", "Fairy"],
		baseStats: {hp: 112, atk: 130, def: 115, spa: 95, spd: 120, spe: 58},
		abilities: {0: "Liquid Voice"},
		weightkg: 130.5,
		battleOnly: "Blastonoise",
		requiredItem: "Blastonoisite",
	},
	charodile: {
		inheritMoves: ['Charizard'],
		num: -103,
		name: "Charodile",
		types: ["Fire", "Ground"],
		baseStats: {hp: 78, atk: 104, def: 88, spa: 99, spd: 75, spe: 90},
		abilities: {0: "Blaze", H: "Rough Skin"},
		weightkg: 101.2,
		otherformes: ["Charodile-Mega-X", "Charodile-Mega-Y"],
		formeOrder: ["Charodile", "Charodile-Mega-X", "Charodile-Mega-Y"],
	},
	charodilemegax: {
		megaOf: "Charodile",
		num: -103,
		name: "Charodile-Mega-X",
		baseSpecies: "Charodile",
		forme: "Mega",
		types: ["Fire", "Ground"],
		baseStats: {hp: 78, atk: 124, def: 138, spa: 119, spd: 105, spe: 70},
		abilities: {0: "Stakeout"},
		weightkg: 124.1,
		battleOnly: "Charodile",
		requiredItem: "Charodilite X",
	},
	charodilemegay: {
		megaOf: "Charodile",
		num: -103,
		name: "Charodile-Mega-Y",
		baseSpecies: "Charodile",
		forme: "Mega",
		types: ["Fire", "Rock"],
		baseStats: {hp: 78, atk: 164, def: 108, spa: 109, spd: 95, spe: 80},
		abilities: {0: "Sand Rush"},
		weightkg: 168,
		battleOnly: "Charodile",
		requiredItem: "Charodilite Y",
	},
	stacragus: {
		inheritMoves: ['Butterfree'],
		num: -104,
		name: "Stacragus",
		types: ["Rock", "Flying"],
		baseStats: {hp: 55, atk: 110, def: 50, spa: 60, spd: 50, spe: 70},
		abilities: {0: "Shields Down"},
		weightkg: 35,
		otherFormes: ["Stacragus-Chrysalis"],
		formeOrder: ["Stacragus", "Stacragus-Chrysalis"],
	},
	stacraguschrysalis: {
		megaOf: "Stacragus",
		num: -104,
		name: "Stacragus-Chrysalis",
		baseSpecies: "Stacragus",
		forme: "Chrysalis",
		types: ["Rock", "Flying"],
		baseStats: {hp: 55, atk: 60, def: 110, spa: 30, spd: 110, spe: 30},
		abilities: {0: "Shields Down"},
		weightkg: 60,
		battleOnly: "Stacragus",
		requiredAbility: "Shields Down",
	},
	hornetox: {
		inheritMoves: ['Beedrill'],
		num: -105,
		name: "Hornetox",
		types: ["Poison", "Ghost"],
		baseStats: {hp: 65, atk: 45, def: 60, spa: 90, spd: 60, spe: 75},
		abilities: {0: "Corrosion", H: "Sniper"},
		weightkg: 49.5,
		otherformes: ["Hornetox-Mega"],
		formeOrder: ["Hornetox", "Hornetox-Mega"],
	},
	hornetoxmega: {
		megaOf: "Hornetox",
		num: -105,
		name: "Hornetox-Mega",
		baseSpecies: "Hornetox",
		forme: "Mega",
		types: ["Poison", "Ghost"],
		baseStats: {hp: 65, atk: 46, def: 86, spa: 106, spd: 86, spe: 106},
		abilities: {0: "Merciless"},
		weightkg: 65,
		battleOnly: "Hornetox",
		requiredItem: "Hornetoxite",
	},
	banshigen: {
		inheritMoves: ['Pidgeot'],
		num: -106,
		name: "Banshigen",
		gender: "F",
		types: ["Normal", "Ghost"],
		baseStats: {hp: 83, atk: 70, def: 80, spa: 80, spd: 75, spe: 91},
		abilities: {0: "Keen Eye", 1: "Tangled Feet", H: "Soundproof"},
		weightkg: 20,
		otherformes: ["Banshigen-Mega"],
		formeOrder: ["Banshigen", "Banshigen-Mega"],
	},
	banshigenmega: {
		megaOf: "Banshigen",
		num: -106,
		name: "Banshigen-Mega",
		baseSpecies: "Banshigen",
		forme: "Mega",
		gender: "F",
		types: ["Normal", "Ghost"],
		baseStats: {hp: 83, atk: 70, def: 110, spa: 100, spd: 105, spe: 111},
		abilities: {0: "Punk Rock"},
		weightkg: 30,
		battleOnly: "Banshigen",
		requiredItem: "Banshigenite",
	},
};