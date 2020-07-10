'use strict';

exports.BattleItems = {

  "googleimagite": {
                    id: "googleimagite",
                    name: "GoogleImagite",
                    spritenum: 608,
                    megaStone: "Gardevoir-Memega",
                    megaEvolves: "Gardevoir",
                    onTakeItem: function (item, source) {
                     if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
                      return true;
                    },
                    num: -1100,
                    gen: 6,
                    desc: "If holder is a Gardevoir, this item allows it to Memega Evolve in battle.",
	},
   "farfite": {
                    id: "farfite",
                    name: "Farfite",
                    spritenum: 608,
                    megaStone: "Farfetch'd-Memega",
                    megaEvolves: "Farfetch'd",
                    onTakeItem: function (item, source) {
                     if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
                      return true;
                    },
                    num: -1100,
                    gen: 6,
                    desc: "If holder is a Farfecth'd, this item allows it to Memega Evolve in battle.",
	},
    "helixite": {
                    id: "helixite",
                    name: "Helixite",
                    spritenum: 608,
                    megaStone: "Omastar-Memega",
                    megaEvolves: "Omastar",
                    onTakeItem: function (item, source) {
                     if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
                      return true;
                    },
                    num: -1100,
                    gen: 6,
                    desc: "If holder is a Farfecth'd, this item allows it to Memega Evolve in battle.",
	},
	 "stunfiskite": {
                    id: "stunfiskite",
                    name: "Stunfiskite",
                    spritenum: 608,
                    megaStone: "Whiscash-Memega",
                    megaEvolves: "Whiscash",
                    onTakeItem: function (item, source) {
                     if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
                      return true;
                    },
                    num: -1100,
                    gen: 6,
                    desc: "If holder is a Whiscash, this item allows it to Memega Evolve in battle.",
	},
};
