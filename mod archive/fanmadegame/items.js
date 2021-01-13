'use strict';

/**@type {{[k: string]: ItemData}} */
let BattleItems = {
shuckleite: { 
id: "shuckleite",
name: "Shuckleite", 
spritenum: 612, 
megaStone: "Shuckle-Mega", 
megaEvolves: "Shuckle",
onTakeItem: function (item, source) { 
if (item.megaEvolves === source.baseTemplate.baseSpecies) return false; 
return true; 
}, 
num: 760, 
gen: 7, 
desc: "If held by a Shuckle, this item allows it to Mega Evolve in battle.", 
},
	
	flygonitex: { 
id: "flygonitex",
name: "FlygoniteX", 
spritenum: 612, 
megaStone: "Flygon-Mega-X", 
megaEvolves: "Flygon",
onTakeItem: function (item, source) { 
if (item.megaEvolves === source.baseTemplate.baseSpecies) return false; 
return true; 
}, 
num: 760, 
gen: 7, 
desc: "If held by a Flygon, this item allows it to Mega Evolve in battle.", 
},
	
	flygonitey: { 
id: "flygonitey",
name: "FlygoniteY", 
spritenum: 612, 
megaStone: "Flygon-Mega-Y", 
megaEvolves: "Flygon",
onTakeItem: function (item, source) { 
if (item.megaEvolves === source.baseTemplate.baseSpecies) return false; 
return true; 
}, 
num: 760, 
gen: 7, 
desc: "If held by a Flygon, this item allows it to Mega Evolve in battle.", 
},
		miloticite: { 
id: "miloticite",
name: "Miloticite", 
spritenum: 612, 
megaStone: "Milotic-Mega", 
megaEvolves: "Milotic",
onTakeItem: function (item, source) { 
if (item.megaEvolves === source.baseTemplate.baseSpecies) return false; 
return true; 
}, 
num: 760, 
gen: 7, 
desc: "If held by a Milotic, this item allows it to Mega Evolve in battle.", 
},
	kingdraite: { 
id: "kingdraite",
name: "Kingdraite", 
spritenum: 612, 
megaStone: "Kingdra-Mega", 
megaEvolves: "Kingdra",
onTakeItem: function (item, source) { 
if (item.megaEvolves === source.baseTemplate.baseSpecies) return false; 
return true; 
}, 
num: 760, 
gen: 7, 
desc: "If held by a Kingdra, this item allows it to Mega Evolve in battle.", 
},
	dragoniteite: { 
id: "dragoniteite",
name: "Dragoniteite", 
spritenum: 612, 
megaStone: "Dragonite-Mega", 
megaEvolves: "Dragonite",
onTakeItem: function (item, source) { 
if (item.megaEvolves === source.baseTemplate.baseSpecies) return false; 
return true; 
}, 
num: 760, 
gen: 7, 
desc: "If held by a Dragonite, this item allows it to Mega Evolve in battle.", 
},
};

exports.BattleItems = BattleItems;
