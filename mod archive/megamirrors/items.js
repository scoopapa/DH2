'use strict';

/**@type {{[k: string]: ItemData}} */
let BattleItems = {
"abomasitex": {
		id: "abomasitex",
		name: "Abomasite X",
		spritenum: 575,
		megaStone: "Abomasnow-Mega-X",
		megaEvolves: "Abomasnow",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 2000,
		gen: 6,
		desc: "If held by an Abomasnow, this item allows it to Mega Evolve in battle.",
	},
	"absolitey": {
		id: "absolitey",
		name: "Absolite Y",
		spritenum: 576,
		megaStone: "Absol-Mega-Y",
		megaEvolves: "Absol",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 2001,
		gen: 6,
		desc: "If held by an Absol, this item allows it to Mega Evolve in battle.",
	},
  	"aerodactylitey": {
		id: "aerodactylitey",
		name: "Aerodactylite Y",
		spritenum: 577,
		megaStone: "Aerodactyl-Mega-Y",
		megaEvolves: "Aerodactyl",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 2002,
		gen: 6,
		desc: "If held by an Aerodactyl, this item allows it to Mega Evolve in battle.",
	},
	"aggronitey": {
		id: "aggronitey",
		name: "Aggronite Y",
		spritenum: 577,
		megaStone: "Aggron-Mega-Y",
		megaEvolves: "Aggron",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 2003,
		gen: 6,
		desc: "If held by an Aggron, this item allows it to Mega Evolve in battle.",
	},
	"alakazitex": {
		id: "alakazitex",
		name: "Alakazite X",
		spritenum: 577,
		megaStone: "Alakazam-Mega-X",
		megaEvolves: "Alakazam",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 2004,
		gen: 6,
		desc: "If held by an Alakazam, this item allows it to Mega Evolve in battle.",
	},
	"altarianitey": {
		id: "altarianitey",
		name: "Altarianite Y",
		spritenum: 577,
		megaStone: "Altaria-Mega-Y",
		megaEvolves: "Altaria",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 2005,
		gen: 6,
		desc: "If held by an Altaria, this item allows it to Mega Evolve in battle.",
	},
	"ampharositex": {
		id: "ampharositex",
		name: "Ampharosite X",
		spritenum: 577,
		megaStone: "Ampharos-Mega-X",
		megaEvolves: "Ampharos",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 2006,
		gen: 6,
		desc: "If held by an Ampharos, this item allows it to Mega Evolve in battle.",
	},
	"audinitey": {
		id: "audinitey",
		name: "Audinite Y",
		spritenum: 577,
		megaStone: "Audino-Mega-Y",
		megaEvolves: "Audino",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 2007,
		gen: 6,
		desc: "If held by an Audino, this item allows it to Mega Evolve in battle.",
	},
	"banettitey": {
		id: "banettitey",
		name: "Banettite Y",
		spritenum: 577,
		megaStone: "Banette-Mega-Y",
		megaEvolves: "Banette",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 2008,
		gen: 6,
		desc: "If held by a Banette, this item allows it to Mega Evolve in battle.",
	},
	"beedrillitey": {
		id: "beedrillitey",
		name: "Beedrillite Y",
		spritenum: 577,
		megaStone: "Beedrill-Mega-Y",
		megaEvolves: "Beedrill",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 2009,
		gen: 6,
		desc: "If held by a Beedrill, this item allows it to Mega Evolve in battle.",
	},
	"blastoisinitex": {
		id: "blastoisinitex",
		name: "Blastoisinite X",
		spritenum: 577,
		megaStone: "Blastoise-Mega-X",
		megaEvolves: "Blastoise",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 2010,
		gen: 6,
		desc: "If held by a Blastoise, this item allows it to Mega Evolve in battle.",
	},
	"cameruptitex": {
		id: "cameruptitex",
		name: "Cameruptite X",
		spritenum: 577,
		megaStone: "Camerupt-Mega-X",
		megaEvolves: "Camerupt",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 2011,
		gen: 6,
		desc: "If held by a Camerupt, this item allows it to Mega Evolve in battle.",
	},
	"diancitey": {
		id: "diancitey",
		name: "Diancite Y",
		spritenum: 577,
		megaStone: "Diancie-Mega-Y",
		megaEvolves: "Diancie",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 2012,
		gen: 6,
		desc: "If held by an Diancie, this item allows it to Mega Evolve in battle.",
	},
	"galladitey": {
		id: "galladitey",
		name: "Galladite Y",
		spritenum: 577,
		megaStone: "Gallade-Mega-Y",
		megaEvolves: "Gallade",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 2013,
		gen: 6,
		desc: "If held by an Gallade, this item allows it to Mega Evolve in battle.",
	},
	"gardevoiritex": {
		id: "gardevoiritex",
		name: "Gardevoirite X",
		spritenum: 577,
		megaStone: "Gardevoir-Mega-X",
		megaEvolves: "Gardevoir",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 2014,
		gen: 6,
		desc: "If held by a Gardevoir, this item allows it to Mega Evolve in battle.",
	},
	"gengaritex": {
		id: "gengaritex",
		name: "Gengarite X",
		spritenum: 577,
		megaStone: "Gengar-Mega-X",
		megaEvolves: "Gengar",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 2015,
		gen: 6,
		desc: "If held by a Gengar, this item allows it to Mega Evolve in battle.",
	},
	"glalititex": {
		id: "glalititex",
		name: "Glalitite X",
		spritenum: 577,
		megaStone: "Glalie-Mega-X",
		megaEvolves: "Glalie",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 2016,
		gen: 6,
		desc: "If held by a Glalie, this item allows it to Mega Evolve in battle.",
	},
	"gyaradositey": {
		id: "gyaradositey",
		name: "Gyaradosite Y",
		spritenum: 577,
		megaStone: "Gyarados-Mega-Y",
		megaEvolves: "Gyarados",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 2017,
		gen: 6,
		desc: "If held by a Gyarados, this item allows it to Mega Evolve in battle.",
	},
	"houndoomitex": {
		id: "houndoomitex",
		name: "Houndoom X",
		spritenum: 577,
		megaStone: "Houndoom-Mega-X",
		megaEvolves: "Houndoom",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 2018,
		gen: 6,
		desc: "If held by a Houndoom, this item allows it to Mega Evolve in battle.",
	},
	"kangaskhanitey": {
		id: "kangaskhanitey",
		name: "Kangaskhanite X",
		spritenum: 577,
		megaStone: "Kangaskhan-Mega-X",
		megaEvolves: "Kangaskhan",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 2019,
		gen: 6,
		desc: "If held by a Kangaskhan, this item allows it to Mega Evolve in battle.",
	},
};

exports.BattleItems = BattleItems;
