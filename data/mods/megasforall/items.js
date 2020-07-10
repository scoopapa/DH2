'use strict';

exports.BattleItems = {
	"alogolite": {
		id: "alogolite",
		name: "Alogolite",
		spritenum: 576,
		megaStone: "Golem-Alola-Mega",
		megaEvolves: "Golem-Alola",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1077,
		gen: 7,
		desc: "If holder is a Golem-Alola, this item allows it to Mega Evolve in battle.",
	},
	"alomarowite": {
		id: "alomarowite",
		name: "Alomarowite",
		spritenum: 576,
		megaStone: "Marowak-Alola-Mega",
		megaEvolves: "Marowak-Alola",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 932,
		gen: 7,
		desc: "If holder is a Marowak-Alola, this item allows it to Mega Evolve in battle.",
	},
	"alopersite": {
		id: "alopersite",
		name: "Alopersite",
		spritenum: 576,
		megaStone: "Persian-Alola-Mega",
		megaEvolves: "Persian-Alola",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1054,
		gen: 7,
		desc: "If holder is a Persian-Alola, this item allows it to Mega Evolve in battle.",
	},
	"aloslashite": {
		id: "aloslashite",
		name: "Aloslashite",
		spritenum: 576,
		megaStone: "Sandslash-Alola-Mega",
		megaEvolves: "Sandslash-Alola",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1029,
		gen: 7,
		desc: "If holder is a Sandslash-Alola, this item allows it to Mega Evolve in battle.",
	},
	"alotalesite": {
		id: "alotalesite",
		name: "Alotalesite",
		spritenum: 576,
		megaStone: "Ninetales-Alola-Mega",
		megaEvolves: "Ninetales-Alola",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 932,
		gen: 7,
		desc: "If holder is a Ninetales-Alola, this item allows it to Mega Evolve in battle.",
	},
	"ambipomite": {
		id: "ambipomite",
		name: "Ambipomite",
		spritenum: 612,
		megaStone: "Ambipom-Mega",
		megaEvolves: "Ambipom",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is an Ambipom, this item allows it to Mega Evolve in battle.",
	},
	"amoongussite": {
		id: "amoongussite",
		name: "Amoongussite",
		spritenum: 612,
		megaStone: "Amoonguss-Mega",
		megaEvolves: "Amoonguss",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is an Amoonguss, this item allows it to Mega Evolve in battle.",
	},
	"araquanite": {
		id: "araquanite",
		name: "Araquanite",
		spritenum: 576,
		megaStone: "Araquanid-Mega",
		megaEvolves: "Araquanid",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1079,
		gen: 7,
		desc: "If holder is an Araquanid, this item allows it to Mega Evolve in battle.",
	},
	"arbokite": {
		id: "arbokite",
		name: "Arbokite",
		spritenum: 576,
		megaStone: "Arbok-Mega",
		megaEvolves: "Arbok",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1024,
		gen: 7,
		desc: "If holder is an Arbok, this item allows it to Mega Evolve in battle.",
	},
	"arcanite": {
		id: "arcanite",
		name: "Arcanite",
		spritenum: 576,
		megaStone: "Arcanine-Mega",
		megaEvolves: "Arcanine",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1059,
		gen: 7,
		desc: "If holder is an Arcanine, this item allows it to Mega Evolve in battle.",
	},
	"articunite": {
		id: "articunite",
		name: "Articunite",
		spritenum: 620,
		megaStone: "Articuno-Mega",
		megaEvolves: "Articuno",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is an Articuno, this item allows it to Mega Evolve in battle.",
	},
	"avaluggite": {
		id:"avaluggite", 
		name:"Avaluggite",
		megaStone: "Avalugg-Mega", 
		megaEvolves: "Avalugg",
		onTakeItem: function (item, source) {
		if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		gen: 6,
		desc: "If holder is a Avalugg, this item allows it to Mega Evolve in battle.",
	}, 
	"bearticite": {
		id: "bearticite",
		name: "Bearticite",
		spritenum: 620,
		megaStone: "Beartic-Mega",
		megaEvolves: "Beartic",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Beartic, this item allows it to Mega Evolve in battle.",
	},
	"bellossomite": {
		id: "bellossomite",
		name: "Bellossomite",
		spritenum: 620,
		megaStone: "Bellossom-Mega",
		megaEvolves: "Bellossom",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Bellossom, this item allows it to Mega Evolve in battle.",
	},
	"blankmemory": {
		id: "blankmemory",
		name: "Blank Memory",
		spritenum: 612,
		megaStone: "Silvally-Mega",
		megaEvolves: "Silvally",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		isUnreleased: true,
		desc: "A memory drive somehow linked to Silvally.",
	},
	"blissinite": {
		id: "blissinite",
		name: "Blissinite",
		spritenum: 612,
		megaStone: "Blissey-Mega",
		megaEvolves: "Blissey",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Blissey, this item allows it to Mega Evolve in battle.",
	},
	"braviarite": {
		id: "braviarite",
		name: "Braviarite",
		spritenum: 620,
		megaStone: "Braviary-Mega",
		megaEvolves: "Braviarite",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Braviary, this item allows it to Mega Evolve in battle.",
	},
	"breloomite": {
		id: "breloomite",
		name: "Breloomite",
		spritenum: 620,
		megaStone: "Breloom-Mega",
		megaEvolves: "Breloom",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Breloom, this item allows it to Mega Evolve in battle.",
	},
	"buzzwolite": {
		id: "buzzwolite",
		name: "Buzzwolite",
		spritenum: 620,
		megaStone: "Buzzwole-Mega",
		megaEvolves: "Buzzwole",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Buzzwole, this item allows it to Mega Evolve in battle.",
	},
	"carracostite": {
		id: "carracostite",
		name: "Carracostite",
		spritenum: 576,
		megaStone: "Carracosta-Mega",
		megaEvolves: "Carracosta",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1036,
		gen: 7,
		desc: "If holder is a Carracosta, this item allows it to Mega Evolve in battle.",
	},
	"celesteelite": {
		id: "celesteelite",
		name: "Celesteelite",
		spritenum: 576,
		megaStone: "Celesteela-Mega",
		megaEvolves: "Celesteela",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1036,
		gen: 7,
		desc: "If holder is a Celesteela, this item allows it to Mega Evolve in battle.",
	},
	"clefablite": {
		id: "clefablite",
		name: "Clefablite",
		spritenum: 576,
		megaStone: "Clefable-Mega",
		megaEvolves: "Clefable",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1036,
		gen: 7,
		desc: "If holder is a Clefable, this item allows it to Mega Evolve in battle.",
	},
	"cobalionite": {
		id: "cobalionite",
		name: "Cobalionite",
		spritenum: 576,
		megaStone: "Cobalion-Mega",
		megaEvolves: "Cobalion",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1036,
		gen: 7,
		desc: "If holder is a Cobalion, this item allows it to Mega Evolve in battle.",
	},
	"crabominite": {
		id:"crabominite", 
		name:"Crabominite",
		megaStone: "Crabominable-Mega", 
		megaEvolves: "Crabominable",
		onTakeItem: function (item, source) {
		if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
		return true;
		},
		gen: 7,
		desc: "If holder is a Crabominable, this item allows it to Mega Evolve in battle.",
	}, 
	"crawdauntite": {
		id: "crawdauntite",
		name: "Crawdauntite",
		spritenum: 620,
		megaStone: "Crawdaunt-Mega",
		megaEvolves: "Crawdaunt",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Crawdaunt, this item allows it to Mega Evolve in battle.",
	},
	"deciduite": {
		id: "deciduite",
		name: "deciduite",
		spritenum: 576,
		megaStone: "Decidueye-Mega",
		megaEvolves: "Decidueye",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 934,
		gen: 7,
		desc: "If holder is a Decidueye, this item allows it to Mega Evolve in battle.",
	},
	"delcattinite": {
		id: "delcattinite",
		name: "Delcattinite",
		spritenum: 620,
		megaStone: "Delcatty-Mega",
		megaEvolves: "Delcatty",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Delcatty, this item allows it to Mega Evolve in battle.",
	},
	"diggersbinite": {
		id: "diggersbinite",
		name: "Diggersbinite",
		spritenum: 620,
		megaStone: "Diggersby-Mega",
		megaEvolves: "Diggersby",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Diggersby, this item allows it to Mega Evolve in battle.",
	},
	"donphanite": {
		id: "donphanite",
		name: "Donphanite",
		spritenum: 612,
		megaStone: "Donphan-Mega",
		megaEvolves: "Donphan",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Donphan, this item allows it to Mega Evolve in battle.",
	},
	"drapionite": {
		id: "drapionite",
		name: "Drapionite",
		spritenum: 612,
		megaStone: "Drapion-Mega",
		megaEvolves: "Drapion",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Drapion, this item allows it to Mega Evolve in battle.",
	},
	"dragalgite": {
		id: "dragalgite",
		name: "Dragalgite",
		spritenum: 576,
		megaStone: "Dragalge-Mega",
		megaEvolves: "Dragalge",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 932,
		gen: 7,
		desc: "If holder is a Dragalge, this item allows it to Mega Evolve in battle.",
	},
	"dragoniteite": {
		id: "dragoniteite",
		name: "Dragoniteite",
		spritenum: 576,
		megaStone: "Dragonite-Mega",
		megaEvolves: "Dragonite",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 932,
		gen: 7,
		desc: "If holder is a Dragonite, this item allows it to Mega Evolve in battle.",
	},
	"dunsparcite": {
		id: "dunsparcite",
		name: "Dunsparcite",
		spritenum: 612,
		megaStone: "Dunsparce-Mega",
		megaEvolves: "Dunsparce",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Dunsparce, this item allows it to Mega Evolve in battle.",
	},
	"eelektrossite": {
		id: "eelektrossite",
		name: "Eelektrossite",
		spritenum: 620,
		megaStone: "Eelektross-Mega",
		megaEvolves: "Eelektross",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is an Eelektross, this item allows it to Mega Evolve in battle.",
	},
	"electivirite": {
		id: "electivirite",
		name: "Electivirite",
		spritenum: 620,
		megaStone: "Electivire-Mega",
		megaEvolves: "Electivire",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is an Electivire, this item allows it to Mega Evolve in battle.",
	},
	"electricmemory": {
		id: "electricmemory",
		name: "Electric Memory",
		spritenum: 679,
		onMemory: 'Electric',
		onTakeItem: function (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
				return false;
			}
			return true;
		},
		megaStone: "Silvally-Electric-Mega",
		megaEvolves: "Silvally-Electric",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		forcedForme: "Silvally-Electric",
		num: 915,
		gen: 7,
		desc: "Holder's Multi-Attack is Electric type.",
	},
	"empoleonite": {
		id: "empoleonite",
		name: "Empoleonite",
		spritenum: 620,
		megaStone: "Empoleon-Mega",
		megaEvolves: "Empoleon",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is an Empoleon, this item allows it to Mega Evolve in battle.",
	},
	"enteinite": {
		id: "enteinite",
		name: "Enteinite",
		spritenum: 612,
		megaStone: "Entei-Mega",
		megaEvolves: "Entei",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is an Entei, this item allows it to Mega Evolve in battle.",
	},
	"fearonite": {
		id: "fearonite",
		name: "Fearonite",
		spritenum: 576,
		megaStone: "Fearow-Mega",
		megaEvolves: "Fearow",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1022,
		gen: 7,
		desc: "If holder is a Fearow, this item allows it to Mega Evolve in battle.",
	},
	"feraligatite": {
		id: "feraligatite",
		name: "Feraligatite",
		spritenum: 620,
		megaStone: "Feraligatr-Mega",
		megaEvolves: "Feraligatr",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Feraligatr, this item allows it to Mega Evolve in battle.",
	},
	"firememory": {
		id: "firememory",
		name: "Fire Memory",
		spritenum: 676,
		onMemory: 'Fire',
		onTakeItem: function (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
				return false;
			}
			return true;
		},
		megaStone: "Silvally-Fire-Mega",
		megaEvolves: "Silvally-Fire",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		forcedForme: "Silvally-Fire",
		num: 912,
		gen: 7,
		desc: "Holder's Multi-Attack is Fire type.",
	},
	"flareonite": {
		id: "flareonite",
		name: "Flareonite",
		spritenum: 620,
		megaStone: "Flareon-Mega",
		megaEvolves: "Flareon",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Flareon, this item allows it to Mega Evolve in battle.",
	},
	"florgesite": {
		id: "florgesite",
		name: "Florgesite",
		spritenum: 620,
		megaStone: "Florges-Mega",
		megaEvolves: "Florges",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Florges, this item allows it to Mega Evolve in battle.",
	},
	"flygonite": {
		id: "flygonite",
		name: "Flygonite",
		spritenum: 620,
		megaStone: "Flygon-Mega",
		megaEvolves: "Flygon",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Flygon, this item allows it to Mega Evolve in battle.",
	},
	"galvantulite": {
		id: "galvantulite",
		name: "Galvantulite",
		spritenum: 612,
		megaStone: "Galvantula-Mega",
		megaEvolves: "Galvantula",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Galvantula, this item allows it to Mega Evolve in battle.",
	},
	"gliscorite": {
		id: "gliscorite",
		name: "Gliscorite",
		spritenum: 612,
		megaStone: "Gliscor-Mega",
		megaEvolves: "Gliscor",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Gliscor, this item allows it to Mega Evolve in battle.",
	},
	"golisopodite": {
		id: "golisopodite",
		name: "Golisopodite",
		spritenum: 576,
		megaStone: "Golisopod-Mega",
		megaEvolves: "Golisopod",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1078,
		gen: 7,
		desc: "If holder is a Golisopod, this item allows it to Mega Evolve in battle.",
	},
	"goodranite": {
		id:"goodranite", 
		name:"Goodranite",
		megaStone: "Goodra-Mega", 
		megaEvolves: "Goodra",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
	gen: 7,
	desc: "If holder is a Goodra, this item allows it to Mega Evolve in battle.",
	}, 
	"gorebyssite": {
		id: "gorebyssite",
		name: "Gorebyssite",
		spritenum: 576,
		megaStone: "Gorebyss-Mega",
		megaEvolves: "Gorebyss",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1078,
		gen: 7,
		desc: "If holder is a Gorebyss, this item allows it to Mega Evolve in battle.",
	},
	"grassmemory": {
		id: "grassmemory",
		name: "Grass Memory",
		spritenum: 678,
		onMemory: 'Grass',
		onTakeItem: function (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
				return false;
			}
			return true;
		},
		megaStone: "Silvally-Grass-Mega",
		megaEvolves: "Silvally-Grass",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		forcedForme: "Silvally-Grass",
		num: 912,
		gen: 7,
		desc: "Holder's Multi-Attack is Grass type.",
	},
	"guzzlordite": {
		id: "guzzlordite",
		name: "Guzzlordite",
		spritenum: 576,
		megaStone: "Guzzlord-Mega",
		megaEvolves: "Guzzlord",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 924,
		gen: 7,
		desc: "If holder is a Guzzlord, this item allows it to Mega Evolve in battle.",
	},
	"huntailite": {
		id: "huntailite",
		name: "Huntailite",
		spritenum: 576,
		megaStone: "Huntail-Mega",
		megaEvolves: "Huntail",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 924,
		gen: 7,
		desc: "If holder is a Huntail, this item allows it to Mega Evolve in battle.",
	},
	"hydreigonite": {
		id: "hydreigonite",
		name: "Hydreigonite",
		spritenum: 576,
		megaStone: "Hydreigon-Mega",
		megaEvolves: "Hydreigon",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 924,
		gen: 7,
		desc: "If holder is a Hydreigon, this item allows it to Mega Evolve in battle.",
	},
	"icememory": {
		id: "icememory",
		name: "Ice Memory",
		spritenum: 681,
		onMemory: 'Ice',
		onTakeItem: function (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
				return false;
			}
			return true;
		},
		megaStone: "Silvally-Ice-Mega",
		megaEvolves: "Silvally-Ice",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		forcedForme: "Silvally-Ice",
		num: 917,
		gen: 7,
		desc: "Holder's Multi-Attack is Ice type.",
	},
	"incinerite": {
		id: "incinerite",
		name: "Incinerite",
		spritenum: 576,
		megaStone: "Incineroar-Mega",
		megaEvolves: "Incineroar",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 934,
		gen: 7,
		desc: "If holder is an Incineroar, this item allows it to Mega Evolve in battle.",
	},
	"infernite": {
		id: "infernite",
		name: "Infernite",
		spritenum: 612,
		megaStone: "Infernape-Mega",
		megaEvolves: "Infernape",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is an Infernape, this item allows it to Mega Evolve in battle.",
	},
	"jolteonite": {
		id: "jolteonite",
		name: "Jolteonite",
		spritenum: 576,
		megaStone: "Jolteon-Mega",
		megaEvolves: "Jolteon",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1080,
		gen: 7,
		desc: "If holder is a Jolteon, this item allows it to Mega Evolve in battle.",
	},
	"kartanite": {
		id: "kartanite",
		name: "Kartanite",
		spritenum: 592,
		megaStone: "Kartana-Mega",
		megaEvolves: "Kartana",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 675,
		gen: 7,
		desc: "If holder is a Kartana, this item allows it to Mega Evolve in battle.",
	},
	"keldeonite": {
		id: "keldeonite",
		name: "Keldeonite",
		spritenum: 592,
		megaStone: "Keldeo-Mega",
		megaEvolves: "Keldeo",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 675,
		gen: 7,
		desc: "If holder is a Keldeo, this item allows it to Mega Evolve in battle.",
	},
	"kinglerite": {
		id: "kinglerite",
		name: "Kinglerite",
		spritenum: 592,
		megaStone: "Kingler-Mega",
		megaEvolves: "Kingler",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 675,
		gen: 7,
		desc: "If holder is a Kingler, this item allows it to Mega Evolve in battle.",
	},
	"klefkite": {
		id:"klefkite", 
		name:"Klefkite",
		megaStone: "Klefki-Mega", 
		megaEvolves: "Klefki",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		gen: 7,
		desc: "If holder is a Klefki, this item allows it to Mega Evolve in battle.",
	}, 
	"kommonite": {
		id: "kommonite",
		name: "Kommonite",
		spritenum: 576,
		megaStone: "Kommo-o-Mega",
		megaEvolves: "Kommo-o",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1078,
		gen: 7,
		desc: "If holder is a Kommo-o, this item allows it to Mega Evolve in battle.",
	},
	"krookodite": {
		id: "krookodite",
		name: "Krookodite",
		spritenum: 576,
		megaStone: "Krookodile-Mega",
		megaEvolves: "Krookodile",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1078,
		gen: 7,
		desc: "If holder is a Krookodile, this item allows it to Mega Evolve in battle.",
	},
	"liepardite": {
		id: "liepardite",
		name: "Liepardite",
		spritenum: 576,
		megaStone: "Liepard-Mega",
		megaEvolves: "Liepard",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1077,
		gen: 7,
		desc: "If holder is a Liepard, this item allows it to Mega Evolve in battle.",
	},
	"lumineonite": {
		id: "lumineonite",
		name: "Lumineonite",
		spritenum: 612,
		megaStone: "Lumineon-Mega",
		megaEvolves: "Lumineon",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Lumineon, this item allows it to Mega Evolve in battle.",
	},
	"lunatonite": {
		id: "lunatonite",
		name: "Lunatonite",
		spritenum: 620,
		megaStone: "Lunatone-Mega",
		megaEvolves: "Lunatone",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Lunatone, this item allows it to Mega Evolve in battle.",
	},
	"machampite": {
		id: "machampite",
		name: "Machampite",
		spritenum: 592,
		megaStone: "Machamp-Mega",
		megaEvolves: "Machamp",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1068,
		gen: 7,
		desc: "If holder is a Machamp, this item allows it to Mega Evolve in battle.",
	},
	"magmortite": {
		id: "magmortite",
		name: "Magmortite",
		spritenum: 576,
		megaStone: "Magmortar-Mega",
		megaEvolves: "Magmortar",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 923,
		gen: 7,
		desc: "If holder is a Magmortar, this item allows it to Mega Evolve in battle.",
	},
	"magnezonite": {
		id: "magnezonite",
		name: "Magnezonite",
		spritenum: 612,
		megaStone: "Magnezone-Mega",
		megaEvolves: "Magnezone",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Magnezone, this item allows it to Mega Evolve in battle.",
	},
	"mamoswinite": {
		id: "mamoswinite",
		name: "Mamoswinite",
		spritenum: 612,
		megaStone: "Mamoswine-Mega",
		megaEvolves: "Mamoswine",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Mamoswine, this item allows it to Mega Evolve in battle.",
	},
	"mantinite": {
		id: "mantinite",
		name: "Mantinite",
		spritenum: 612,
		megaStone: "Mantine-Mega",
		megaEvolves: "Mantine",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Mantine, this item allows it to Mega Evolve in battle.",
	},
	"maractite": {
		id: "maractite",
		name: "Maractite",
		spritenum: 612,
		megaStone: "Maractus-Mega",
		megaEvolves: "Maractus",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Maractus, this item allows it to Mega Evolve in battle.",
	},
	"marowakite": {
		id: "marowakite",
		name: "Marowakite",
		spritenum: 576,
		megaStone: "Marowak-Mega",
		megaEvolves: "Marowak",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 932,
		gen: 7,
		desc: "If holder is a Marowak, this item allows it to Mega Evolve in battle.",
	},
	"meganiumite": {
		id: "meganiumite",
		name: "Meganiumite",
		spritenum: 620,
		megaStone: "Meganium-Mega",
		megaEvolves: "Meganium",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Meganium, this item allows it to Mega Evolve in battle.",
	},
	"meowstite": {
		id: "meowstite",
		name: "Meowstite",
		spritenum: 620,
		megaStone: "Meowstic-Mega",
		megaEvolves: "Meowstic",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Meowstic, this item allows it to Mega Evolve in battle.",
	},
	"mienshite": {
		id: "mienshaonite",
		name: "Mienshaonite",
		spritenum: 620,
		megaStone: "Mienshao-Mega",
		megaEvolves: "Mienshao",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Mienshao, this item allows it to Mega Evolve in battle.",
	},
	"mightyenite": {
		id: "mightyenite",
		name: "Mightyenite",
		spritenum: 620,
		megaStone: "Mightyena-Mega",
		megaEvolves: "Mightyena",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Mightyena, this item allows it to Mega Evolve in battle.",
	},
	"moltresite": {
		id: "moltresite",
		name: "Moltresite",
		spritenum: 576,
		megaStone: "Moltres-Mega",
		megaEvolves: "Moltres",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1077,
		gen: 7,
		desc: "If holder is a Moltres, this item allows it to Mega Evolve in battle.",
	},
	"musharnite": {
		id: "musharnite",
		name: "Musharnite",
		spritenum: 576,
		megaStone: "Musharna-Mega",
		megaEvolves: "Musharna",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1077,
		gen: 7,
		desc: "If holder is a Musharna, this item allows it to Mega Evolve in battle.",
	},
	"nidokingite": {
		id: "nidokingite",
		name: "Nidokingite",
		spritenum: 576,
		megaStone: "Nidoking-Mega",
		megaEvolves: "Nidoking",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1034,
		gen: 7,
		desc: "If holder is a Nidoking, this item allows it to Mega Evolve in battle.",
	},
	"nidoqueenite": {
		id: "nidoqueenite",
		name: "Nidoqueenite",
		spritenum: 576,
		megaStone: "Nidoqueen-Mega",
		megaEvolves: "Nidoqueen",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1031,
		gen: 7,
		desc: "If holder is a Nidoqueen, this item allows it to Mega Evolve in battle.",
	},
	"nihilegite": {
		id: "nihilegite",
		name: "Nihilegite",
		spritenum: 576,
		megaStone: "Nihilego-Mega",
		megaEvolves: "Nihilego",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1078,
		gen: 7,
		desc: "If holder is a Nihilego, this item allows it to Mega Evolve in battle.",
	},
	"pangorite": {
		id: "pangorite",
		name: "Pangorite",
		spritenum: 620,
		megaStone: "Pangoro-Mega",
		megaEvolves: "Pangoro",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Pangoro, this item allows it to Mega Evolve in battle.",
	},
	"pelipperite": {
		id: "pelipperite",
		name: "Pelipperite",
		spritenum: 620,
		megaStone: "Pelipper-Mega",
		megaEvolves: "Pelipper",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Pelipper, this item allows it to Mega Evolve in battle.",
	},
	"pheromosite": {
		id: "pheromosite",
		name: "Pheromosite",
		spritenum: 612,
		megaStone: "Pheromosa-Mega",
		megaEvolves: "Pheromosa",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Pheromosa, this item allows it to Mega Evolve in battle.",
	},
	"phionite": {
		id: "phionite",
		name: "Phionite",
		spritenum: 612,
		megaStone: "Phione-Mega",
		megaEvolves: "Phione",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Phione, this item allows it to Mega Evolve in battle.",
	},
	"porygonite": {
		id: "porygonite",
		name: "porygonite",
		spritenum: 612,
		megaStone: "Porygon-Mega",
		megaEvolves: "Porygon",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Porygon, this item allows it to Mega Evolve in battle.",
	},
	"primeapite": {
		id: "primeapite",
		name: "Primeapite",
		spritenum: 576,
		megaStone: "Primeape-Mega",
		megaEvolves: "Primeape",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1047,
		gen: 7,
		desc: "If holder is a Primeape, this item allows it to Mega Evolve in battle.",
	},
	"primarinite": {
		id: "primarinite",
		name: "Primarinite",
		spritenum: 576,
		megaStone: "Primarina-Mega",
		megaEvolves: "Primarina",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 934,
		gen: 7,
		desc: "If holder is a Primarina, this item allows it to Mega Evolve in battle.",
	},
	"probopassite": {
		id: "probopassite",
		name: "probopassite",
		spritenum: 612,
		megaStone: "Probopass-Mega",
		megaEvolves: "Probopass",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Probopass, this item allows it to Mega Evolve in battle.",
	},
	"puruglite": {
		id: "puruglite",
		name: "Puruglite",
		spritenum: 612,
		megaStone: "Purugly-Mega",
		megaEvolves: "Purugly",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Purugly, this item allows it to Mega Evolve in battle.",
	},
	"raikounite": {
		id: "raikounite",
		name: "Raikounite",
		spritenum: 576,
		megaStone: "Raikou-Mega",
		megaEvolves: "Raikou",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 921,
		gen: 7,
		desc: "If holder is a Raikou, this item allows it to Mega Evolve in battle.",
	},
	"reuniclusite": {
		id: "reuniclusite",
		name: "Reuniclusite",
		spritenum: 612,
		megaStone: "Reuniclus-Mega",
		megaEvolves: "Reuniclus",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Reuniclus, this item allows it to Mega Evolve in battle.",
	},
	"rhyperionite": {
		id: "rhyperionite",
		name: "Rhyperionite",
		spritenum: 576,
		megaStone: "Rhyperior-Mega",
		megaEvolves: "Rhyperior",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 922,
		gen: 7,
		desc: "If holder is a Rhyperior, this item allows it to Mega Evolve in battle.",
	},
	"roserite": {
		id: "roserite",
		name: "Roserite",
		spritenum: 612,
		megaStone: "Roserade-Mega",
		megaEvolves: "Roserade",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Roserade, this item allows it to Mega Evolve in battle.",
	},
	"seismitite": {
		id: "seismitite",
		name: "Seismitite",
		spritenum: 612,
		megaStone: "Seismitoad-Mega",
		megaEvolves: "Seismitoad",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Seismitoad, this item allows it to Mega Evolve in battle.",
	},
	"serperiorite": {
		id: "serperiorite",
		name: "Serperiorite",
		spritenum: 620,
		megaStone: "Serperior-Mega",
		megaEvolves: "Serperior",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Serperior, this item allows it to Mega Evolve in battle.",
	},
	"seviperite": {
		id: "seviperite",
		name: "Seviperite",
		spritenum: 620,
		megaStone: "Seviper-Mega",
		megaEvolves: "Seviper",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Seviper, this item allows it to Mega Evolve in battle.",
	},
	"shiinotite": {
		id: "shiinotite",
		name: "Shiinotite",
		spritenum: 576,
		megaStone: "Shiinotic-Mega",
		megaEvolves: "Shiinotic",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1079,
		gen: 7,
		desc: "If holder is a Shiinotic, this item allows it to Mega Evolve in battle.",
	},
	"simisagite": {
		id: "simisagite",
		name: "Simisagite",
		spritenum: 576,
		megaStone: "Simisage-Mega",
		megaEvolves: "Simisage",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1077,
		gen: 7,
		desc: "If holder is a Simisage, this item allows it to Mega Evolve in battle.",
	},
	"simisearite": {
		id: "simisearite",
		name: "Simisearite",
		spritenum: 576,
		megaStone: "Simisear-Mega",
		megaEvolves: "Simisear",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1077,
		gen: 7,
		desc: "If holder is a Simisear, this item allows it to Mega Evolve in battle.",
	},
	"simipourite": {
		id: "simipourite",
		name: "Simipourite",
		spritenum: 576,
		megaStone: "Simipour-Mega",
		megaEvolves: "Simipour",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1077,
		gen: 7,
		desc: "If holder is a Simipour, this item allows it to Mega Evolve in battle.",
	},
	"slurpuffite": {
		id: "slurpuffite",
		name: "Slurpuffite",
		spritenum: 620,
		megaStone: "Slurpuff-Mega",
		megaEvolves: "Slurpuff",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Slurpuff, this item allows it to Mega Evolve in battle.",
	},
	"snorlaxite": {
		id: "snorlaxite",
		name: "Snorlaxite",
		spritenum: 620,
		megaStone: "Snorlax-Mega",
		megaEvolves: "Snorlax",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Snorlax, this item allows it to Mega Evolve in battle.",
	},
	"solrockite": {
		id: "solrockite",
		name: "Solrockite",
		spritenum: 620,
		megaStone: "Solrock-Mega",
		megaEvolves: "Solrock",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Solrock, this item allows it to Mega Evolve in battle.",
	},
	"staraptite": {
		id: "staraptite",
		name: "Staraptite",
		spritenum: 612,
		megaStone: "Staraptor-Mega",
		megaEvolves: "Staraptor",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Staraptor, this item allows it to Mega Evolve in battle.",
	},
	"starmitite": {
		id: "starmitite",
		name: "Starmitite",
		spritenum: 576,
		megaStone: "Starmie-Mega",
		megaEvolves: "Starmie",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 932,
		gen: 7,
		desc: "If holder is a Starmie, this item allows it to Mega Evolve in battle.",
	},
	"stoutlandite": {
		id: "stoutlandite",
		name: "Stoutlandite",
		spritenum: 576,
		megaStone: "Stoutland-Mega",
		megaEvolves: "Stoutland",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 926,
		gen: 7,
		desc: "If holder is a Stoutland, this item allows it to Mega Evolve in battle.",
	},
	"sudowoodite": {
		id: "sudowoodite",
		name: "Sudowoodite",
		spritenum: 612,
		megaStone: "Sudowoodo-Mega",
		megaEvolves: "Sudowoodo",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Sudowoodo, this item allows it to Mega Evolve in battle.",
	},
	"suicunite": {
		id: "suicunite",
		name: "Suicunite",
		spritenum: 612,
		megaStone: "Suicune-Mega",
		megaEvolves: "Suicune",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Suicune, this item allows it to Mega Evolve in battle.",
	},
	"sunflorite": {
		id: "sunflorite",
		name: "Sunflorite",
		spritenum: 612,
		megaStone: "Sunflora-Mega",
		megaEvolves: "Sunflora",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Sunflora, this item allows it to Mega Evolve in battle.",
	},
	"swellowite": {
		id: "swellowite",
		name: "Swellowite",
		spritenum: 620,
		megaStone: "Swellow-Mega",
		megaEvolves: "Swellow",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Swellow, this item allows it to Mega Evolve in battle.",
	},
	"sylveonite": {
		id: "sylveonitee",
		name: "Sylveonite",
		spritenum: 620,
		megaStone: "Sylveon-Mega",
		megaEvolves: "Sylveon",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Sylveon, this item allows it to Mega Evolve in battle.",
	},
	"talonflamite": {
		id: "talonflamite",
		name: "Talonflamite",
		spritenum: 620,
		megaStone: "Talonflame-Mega",
		megaEvolves: "Talonflame",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Talonflame, this item allows it to Mega Evolve in battle.",
	},
	"tangrowthite": {
		id: "tangrowthite",
		name: "Tangrowthite",
		spritenum: 620,
		megaStone: "Tangrowth-Mega",
		megaEvolves: "Tangrowth",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Tangrowth, this item allows it to Mega Evolve in battle.",
	},
	"tapubulite": {
		id: "tapubulite",
		name: "Tapu Bulite",
		spritenum: 612,
		megaStone: "Tapu Bulu-Mega",
		megaEvolves: "Tapu Bulu",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Tapu Bulu, this item allows it to Mega Evolve in battle.",
	},
	"tapufinite": {
		id: "tapufinite",
		name: "Tapu Finite",
		spritenum: 612,
		megaStone: "Tapu Fini-Mega",
		megaEvolves: "Tapu Fini",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Tapu Fini, this item allows it to Mega Evolve in battle.",
	},
	"tapukokite": {
		id: "tapukokite",
		name: "Tapu Kokite",
		spritenum: 612,
		megaStone: "Tapu Koko-Mega",
		megaEvolves: "Tapu Koko",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Tapu Koko, this item allows it to Mega Evolve in battle.",
	},
	"tapulelite": {
		id: "tapulelite",
		name: "Tapu Lelite",
		spritenum: 612,
		megaStone: "Tapu Lele-Mega",
		megaEvolves: "Tapu Lele",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Tapu Lele, this item allows it to Mega Evolve in battle.",
	},
	"terrakionite": {
		id: "terrakionite",
		name: "Terrakionite",
		spritenum: 612,
		megaStone: "Terrakion-Mega",
		megaEvolves: "Terrakion",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Terrakion, this item allows it to Mega Evolve in battle.",
	},
	"torkoalite": {
		id: "torkoalite",
		name: "Torkoalite",
		spritenum: 620,
		megaStone: "Torkoal-Mega",
		megaEvolves: "Torkoal",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Torkoal, this item allows it to Mega Evolve in battle.",
	},
	"torterrite": {
		id: "torterrite",
		name: "Torterrite",
		spritenum: 612,
		megaStone: "Torterra-Mega",
		megaEvolves: "Torterra",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Torterra, this item allows it to Mega Evolve in battle.",
	},
	"toucannite": {
		id: "toucannite",
		name: "Toucannite",
		spritenum: 576,
		megaStone: "Toucannon-Mega",
		megaEvolves: "Toucannon",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1080,
		gen: 7,
		desc: "If holder is a Toucannon, this item allows it to Mega Evolve in battle.",
	},
	"tropiusite": {
		id: "tropiusite",
		name: "Tropiusite",
		spritenum: 620,
		megaStone: "Tropius-Mega",
		megaEvolves: "Tropius",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Tropius, this item allows it to Mega Evolve in battle.",
	},
	"typlhosite": {
		id: "typhlosite",
		name: "Typhlosite",
		spritenum: 620,
		megaStone: "Typhlosion-Mega",
		megaEvolves: "Typhlosion",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Typhlosion, this item allows it to Mega Evolve in battle.",
	},
	"vanilluxite": {
		id: "vanilluxite",
		name: "Vanilluxite",
		spritenum: 576,
		megaStone: "Vanilluxe-Mega",
		megaEvolves: "Vanilluxe",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1080,
		gen: 7,
		desc: "If holder is a Vanilluxe, this item allows it to Mega Evolve in battle.",
	},
	"vaporeonite": {
		id: "vaporeonite",
		name: "Vaporeonite",
		spritenum: 576,
		megaStone: "Vaporeon-Mega",
		megaEvolves: "Vaporeon",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1080,
		gen: 7,
		desc: "If holder is a Vaporeon, this item allows it to Mega Evolve in battle.",
	},
	"vikavoltite": {
		id: "vikavoltite",
		name: "Vikavoltite",
		spritenum: 576,
		megaStone: "Vikavolt-Mega",
		megaEvolves: "Vikavolt",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1080,
		gen: 7,
		desc: "If holder is a Vikavolt, this item allows it to Mega Evolve in battle.",
	},
	"virizionite": {
		id: "virizionite",
		name: "Virizionite",
		spritenum: 576,
		megaStone: "Virizion-Mega",
		megaEvolves: "Virizion",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1080,
		gen: 7,
		desc: "If holder is a Virizion, this item allows it to Mega Evolve in battle.",
	},
	"volcaronite": {
		id: "volcaronite",
		name: "Volcaronite",
		spritenum: 576,
		megaStone: "Volcarona-Mega",
		megaEvolves: "Volcarona",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1080,
		gen: 7,
		desc: "If holder is a Volcarona, this item allows it to Mega Evolve in battle.",
	},
	"watermemory": {
		id: "watermemory",
		name: "Water Memory",
		spritenum: 677,
		onMemory: 'Water',
		onTakeItem: function (item, pokemon, source) {
			if ((source && source.baseTemplate.num === 773) || pokemon.baseTemplate.num === 773) {
				return false;
			}
			return true;
		},
		megaStone: "Silvally-Water-Mega",
		megaEvolves: "Silvally",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		forcedForme: "Silvally-Water",
		num: 913,
		gen: 7,
		desc: "Holder's Multi-Attack is Water type.",
	},
	"weavilite": {
		id: "weavilite",
		name: "Weavilite",
		spritenum: 612,
		megaStone: "Weavile-Mega",
		megaEvolves: "Weavile",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Weavile, this item allows it to Mega Evolve in battle.",
	},
	"whimsitite": {
		id: "whimsitite",
		name: "Whimsitite",
		spritenum: 612,
		megaStone: "Seismitoad-Mega",
		megaEvolves: "Seismitoad",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Whimsicott, this item allows it to Mega Evolve in battle.",
	},
	"wigglytuffite": {
		id: "wigglytuffite",
		name: "Wigglytuffite",
		spritenum: 576,
		megaStone: "Wigglytuff-Mega",
		megaEvolves: "Wigglytuff",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 1040,
		gen: 7,
		desc: "If holder is a Wigglytuff, this item allows it to Mega Evolve in battle.",
	},
	"xurkitite": {
		id: "xurkitite",
		name: "Xurkitite",
		spritenum: 576,
		megaStone: "Xurkitree-Mega",
		megaEvolves: "Xurkitree",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 925,
		gen: 7,
		desc: "If holder is a Xurkitree, this item allows it to Mega Evolve in battle.",
	},
	"yanmegite": {
		id: "yanmegite",
		name: "Yanmegite",
		spritenum: 612,
		megaStone: "Yanmega-Mega",
		megaEvolves: "Yanmega",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 760,
		gen: 7,
		desc: "If holder is a Yanmega, this item allows it to Mega Evolve in battle.",
	},
	"zapdosite": {
		id: "zapdosite",
		name: "Zapdosite",
		spritenum: 576,
		megaStone: "Zapdos-Mega",
		megaEvolves: "Zapdos",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 937,
		gen: 7,
		desc: "If holder is a Zapdos, this item allows it to Mega Evolve in battle.",
	},
	"zebstrikinite": {
		id: "zebstrikinite",
		name: "Zebstrikinite",
		spritenum: 576,
		megaStone: "Zebstrika-Mega",
		megaEvolves: "Zebstrika",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 937,
		gen: 7,
		desc: "If holder is a Zebstrika, this item allows it to Mega Evolve in battle.",
	},
};
