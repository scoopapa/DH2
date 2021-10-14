'use strict'
exports.BattleItems = {

buzzasoarite: {
id:"buzzasoarite", 
name:"Buzzasoarite",
megaStone: "Buzzasoar-Mega", 
megaEvolves: "Buzzasoar",
onTakeItem: function (item, source) {
if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
return true;
},
gen: 6,
desc: "If holder is a Buzzasoar, this item allows it to Mega Evolve in battle.",
}, 
	"magzorite": {
id:"magzorite", 
name:"magzorite",
megaStone: "Magzor-Mega", 
megaEvolves: "Magzor",
onTakeItem: function (item, source) {
if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
return true;
},
gen: 6,
desc: "If holder is a Magzor, this item allows it to Mega Evolve in battle.",
}, 
		
		"reaptherite": {
id:"reaptherite", 
name:"Reaptherite",
megaStone: "Reapther-Mega", 
megaEvolves: "Reapther",
onTakeItem: function (item, source) {
if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
return true;
},
gen: 7,
desc: "If holder is a Reapther, this item allows it to Mega Evolve in battle.",
}, 
	"scyanideite": {
id:"scyanideite", 
name:"Scyanideite",
megaStone: "Scyanide-Mega", 
megaEvolves: "Scyanide",
onTakeItem: function (item, source) {
if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
return true;
},
gen: 7,
desc: "If holder is a Scyanide, this item allows it to Mega Evolve in battle.",
}, 

"scypsyite": {
id:"scypsyite", 
name:"Scypsyite",
megaStone: "Scypsy-Mega", 
megaEvolves: "Scypsy",
onTakeItem: function (item, source) {
if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
return true;
},
gen: 7,
desc: "If holder is a Scypsy, this item allows it to Mega Evolve in battle.",
}, 
	"alunixite": {
id:"alunixite", 
name:"Alunixite",
megaStone: "Alunix-Mega", 
megaEvolves: "Alunix",
onTakeItem: function (item, source) {
if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
return true;
},
gen: 7,
desc: "If holder is a Alunix, this item allows it to Mega Evolve in battle.",
}, 
	"coffilixite": {
id:"coffilixite", 
name:"Coffilixite",
megaStone: "Coffilix-Mega", 
megaEvolves: "Coffilix",
onTakeItem: function (item, source) {
if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
return true;
},
gen: 7,
desc: "If holder is a Coffilix, this item allows it to Mega Evolve in battle.",
}, 
"crystixite": {
id:"crystixite", 
name:"Crystixite",
megaStone: "Crystix-Mega", 
megaEvolves: "Crystix",
onTakeItem: function (item, source) {
if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
return true;
},
gen: 7,
desc: "If holder is a Crystix, this item allows it to Mega Evolve in battle.",
}, 
"gemelixite": {
id:"gemelixite", 
name:"Gemelixite",
megaStone: "Gemelix-Mega", 
megaEvolves: "Gemelix",
onTakeItem: function (item, source) {
if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
return true;
},
gen: 7,
desc: "If holder is a Gemelix, this item allows it to Mega Evolve in battle.",
}, 
	"scarixite": {
id:"scarixite", 
name:"Scarixite",
megaStone: "Scarix-Mega", 
megaEvolves: "Scarix",
onTakeItem: function (item, source) {
if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
return true;
},
gen: 7,
desc: "If holder is a Scarix, this item allows it to Mega Evolve in battle.",
}, 
};
