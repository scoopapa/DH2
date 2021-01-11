'use strict';

/**@type {{[k: string]: ItemData}} */
let BattleItems = {

electivireite: { 
id: "electivireite",
name: "Electivireite", 
spritenum: 612, 
megaStone: "Electivire-Mega", 
megaEvolves: "Electivire",
onTakeItem: function (item, source) { 
if (item.megaEvolves === source.baseTemplate.baseSpecies) return false; 
return true; 
}, 
num: 760, 
gen: 7, 
desc: "If held by a Electivire, this item allows it to Mega Evolve in battle.", 
},
magmortarite: { 
id: "magmortarite",
name: "Magmortarite", 
spritenum: 612, 
megaStone: "Magmortar-Mega", 
megaEvolves: "Magmortar",
onTakeItem: function (item, source) { 
if (item.megaEvolves === source.baseTemplate.baseSpecies) return false; 
return true; 
}, 
num: 760, 
gen: 7, 
desc: "If held by a Magmortar, this item allows it to Mega Evolve in battle.", 
},

};

exports.BattleItems = BattleItems;
