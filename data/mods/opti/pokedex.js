'use strict';

 exports.BattlePokedex = {
	 primarina: {
		 inherit: true,
		 baseStats: {hp: 90, atk: 74, def: 94, spa: 126, spd: 126, spe: 70},
		 abilities: {0: "Torrent", H: "Liquid Voice"},
	 },
	 decidueye: {
		 inherit: true,
		 baseStats: {hp: 88, atk: 112, def: 75, spa: 100, spd: 125, spe: 80},
		 abilities: {0: "Overgrow", H: "Mold Breaker"},
	 },
	 incineroar: {
		 inherit: true,
		 baseStats: {hp: 115, atk: 125, def: 95, spa: 80, spd: 90, spe: 95},
	 },
	 ninjask: {
		 inherit: true,
		 types: ["Bug", "Ground"],
		 baseStats: {hp: 70, atk: 110, def: 90, spa: 50, spd: 50, spe: 160},
		 abilities: {0: "Speed Boost", H: "Adaptability"},
	 },
	 shedinja: {
		 inherit: true,
		 baseStats: {hp: 1, atk: 110, def: 45, spa: 30, spd: 30, spe: 80},
	 },
	 moltres: {
		 inherit: true,
		 baseStats: {hp: 90, atk: 100, def: 90, spa: 125, spd: 85, spe: 90},
		 abilities: {0: "Pressure", H: "Regenerator"},
	 },	
	 articuno: {
		 inherit: true,
		 baseStats: {hp: 90, atk: 85, def: 85, spa: 100, spd: 95, spe: 125},
		 abilities: {0: "Pressure", H: "Snow Warning"},
	 },
	 wormadam: {
		 inherit: true,
		 baseStats: {hp: 120, atk: 49, def: 95, spa: 109, spd: 115, spe: 56},
		 abilities: {0: "Filter", 1: "Regenerator", H: "Harvest"},
	 },	 
	 wormadamsandy: {
		 inherit: true,
		 baseStats: {hp: 90, atk: 100, def: 135, spa: 70, spd: 105, spe: 40},
		 abilities: {0: "Overcoat", H: "Prankster"},
	 },	
	 wormadamtrash: {
		 inherit: true,
		 baseStats: {hp: 80, atk: 109, def: 105, spa: 109, spd: 105, spe: 36},
		 abilities: {0: "Filter", 1: "Regenerator", H: "Harvest"},
	 },	
	 mothim: {
		 inherit: true,
		 types: ["Bug"],
		 baseStats: {hp: 70, atk: 114, def: 60, spa: 114, spd: 70, spe: 112},
		 abilities: {0: "Prankster", H: "Protean"},
	 },
	 hitmonchan: {
		 inherit: true,
		 types: ["Fighting", "Fire"],
		 baseStats: {hp: 50, atk: 120, def: 105, spa: 35, spd: 105, spe: 85},
		 abilities: {0: "Blaze", 1: "Iron Fist", H: "Inner Focus"},
	 },
	 hitmonlee: {
		 inherit: true,
		 types: ["Fighting", "Water"],
		 baseStats: {hp: 50, atk: 140, def: 63, spa: 35, spd: 112, spe: 100},
		 abilities: {0: "Fluid", 1: "Limber", H: "Unburden"},
	 },
	 dragalge: {
		 inherit: true,
		 baseStats: {hp: 100, atk: 65, def: 100, spa: 110, spd: 125, spe: 70},
		 abilities: {0: "Poison Point", 1: "Corrosion", H: "Adaptability"},
	 },
	 clawtizer: {
		 inherit: true,
		 types: ["Water", "Dragon"],
		 baseStats: {hp: 72, atk: 60, def: 96, spa: 120, spd: 96, spe: 96},
		 abilities: {0: "Mega Launcher"},
	 },
	 ambipom: {
		 inherit: true,
		 types: ["Normal", "Fighting"],
		 baseStats: {hp: 75, atk: 125, def: 76, spa: 60, spd: 76, spe: 115},
		 abilities: {0: "Scrappy", 1: "Technician", H: "Skill Link"},
	 },
	 cinccino: {
		 inherit: true,
		 baseStats: {hp: 85, atk: 115, def: 100, spa: 65, spd: 70, spe: 135},
		 abilities: {0: "Skill Link", 1: "Technician", H: "Serene Grace"},
	 },
	 azelf: {
		 inherit: true,
		 types: ["Psychic", "Fighting"],
		 baseStats: {hp: 80, atk: 130, def: 70, spa: 130, spd: 70, spe: 120},
		 abilities: {0: "Scrappy", H: "Infiltrator"},
	 },
	 mesprit: {
		 inherit: true,
		 types: ["Psychic", "Fairy"],
		 baseStats: {hp: 85, atk: 90, def: 115, spa: 115, spd: 115, spe: 80},
		 abilities: {0: "Levitate", H: "Magic Guard"},
	 },
	 uxie: {
		 inherit: true,
		 baseStats: {hp: 80, atk: 90, def: 135, spa: 70, spd: 135, spe: 90},
		 abilities: {0: "Levitate", H: "Marvel Scale"},
	 },
	 butterfree: {
		 inherit: true,
		 types: ["Bug", "Psychic"],
		 baseStats: {hp: 75, atk: 50, def: 80, spa: 120, spd: 105, spe: 95},
		 abilities: {0: "Tinted Lens", H: "Magic Guard"},
	 },
	 beedrill: {
		 inherit: true,
		 baseStats: {hp: 75, atk: 120, def: 70, spa: 45, spd: 90, spe: 125},
		 abilities: {0: "Skill Link", H: "Sniper"},
	 },
	 beautifly: {
		 inherit: true,
		 types: ["Bug", "Fairy"],
		 baseStats: {hp: 90, atk: 40, def: 90, spa: 130, spd: 90, spe: 85},
		 abilities: {0: "Competitive", H: "Triage"},
	 },
	 dustox: {
		 inherit: true,
		 baseStats: {hp: 100, atk: 40, def: 110, spa: 90, spd: 120, spe: 65},
		 abilities: {0: "Corrosion", H: "Intimidate"},
	 },
	 simisage: {
		 inherit: true,
		 types: ["Grass", "Fighting"],
		 baseStats: {hp: 80, atk: 80, def: 75, spa: 110, spd: 75, spe: 115},
		 abilities: {0: "Competitive", H: "Overgrow"},
	 },
	 simisear: {
		 inherit: true,
		 types: ["Fire", "Electric"],
		 baseStats: {hp: 80, atk: 80, def: 75, spa: 110, spd: 75, spe: 115},
		 abilities: {0: "Competitive", H: "Blaze"},
	 },
	 simipour: {
		 inherit: true,
		 types: ["Water", "Ice"],
		 baseStats: {hp: 80, atk: 80, def: 75, spa: 110, spd: 75, spe: 115},
		 abilities: {0: "Competitive", H: "Torrent"},
	 },
	 oricorio: {
		 inherit: true,
		 types: ["Fighting", "Flying"],
		 baseStats: {hp: 80, atk: 116, def: 76, spa: 102, spd: 70, spe: 96},
		 abilities: {0: "Dancer", 1: "Serene Grace", H: "Jubilee Spirit"},
	 },
	 oricoriopompom: {
		 inherit: true,
		 baseStats: {hp: 85, atk: 70, def: 99, spa: 103, spd: 70, spe: 113},
		 abilities: {0: "Dancer", 1: "Serene Grace", H: "Fluffy"},
	 },
	 oricoriopau: {
		 inherit: true,
		 baseStats: {hp: 85, atk: 70, def: 103, spa: 99, spd: 113, spe: 70}, 
		 abilities: {0: "Dancer", 1: "Serene Grace", H: "Magic Guard"},
	 },
	 oricoriosensu: {
		 inherit: true,
		 baseStats: {hp: 80, atk: 76, def: 70, spa: 116, spd: 96, spe: 102}, 
		 abilities: {0: "Dancer", 1: "Serene Grace", H: "Jubilee Spirit"},
	 },
	 regirock: {
		 inherit: true,
		 baseStats: {hp: 80, atk: 120, def: 200, spa: 50, spd: 100, spe: 50}, 
		 abilities: {0: "Self-Repair", H: "Regenerator"},
	 },
	 regice: {
		 inherit: true,
		 types: ["Ice", "Electric"],
		 baseStats: {hp: 80, atk: 50, def: 100, spa: 120, spd: 200, spe: 50}, 
		 abilities: {0: "Unmelting", H: "Ice Body"},
	 },
	 registeel: {
		 inherit: true,
		 baseStats: {hp: 90, atk: 80, def: 150, spa: 80, spd: 150, spe: 50}, 
		 abilities: {0: "Clear Body", 1: "Filter",  H: "Bulletproof"},
	 },
	 regigigas: {
		 inherit: true,
		 types: ["Normal", "Fighting"],
	 },
	 bisharp: {
		 inherit: true,
		 baseStats: {hp: 90, atk: 125, def: 110, spa: 40, spd: 100, spe: 95}, 
	 },
	 qwilfish: {
		 inherit: true,
		 baseStats: {hp: 100, atk: 125, def: 85, spa: 55, spd: 85, spe: 100}, 
	 },
	 shuckle: {
		 inherit: true,
		 baseStats: {hp: 50, atk: 10, def: 230, spa: 10, spd: 230, spe: 5}, 
		 abilities: {0: "Sturdy", 1: "Unaware",  H: "Mold Breaker"},
	 },
	 silvally: {
		 inherit: true,
		 baseStats: {hp: 103, atk: 103, def: 103, spa: 103, spd: 103, spe: 103}, 
	 },
	 silvallybug: {
		 inherit: true,
		 baseStats: {hp: 103, atk: 103, def: 103, spa: 103, spd: 103, spe: 103}, 
	 },
	 silvallydark: {
		 inherit: true,
		 baseStats: {hp: 103, atk: 103, def: 103, spa: 103, spd: 103, spe: 103}, 
	 },
	 silvallydragon: {
		 inherit: true,
		 baseStats: {hp: 103, atk: 103, def: 103, spa: 103, spd: 103, spe: 103}, 
	 },
	 silvallyelectric: {
		 inherit: true,
		 baseStats: {hp: 103, atk: 103, def: 103, spa: 103, spd: 103, spe: 103}, 
	 },
	 silvallyfairy: {
		 inherit: true,
		 baseStats: {hp: 103, atk: 103, def: 103, spa: 103, spd: 103, spe: 103}, 
	 },
	 silvallyfighting: {
		 inherit: true,
		 baseStats: {hp: 103, atk: 103, def: 103, spa: 103, spd: 103, spe: 103}, 
	 },
	 silvallyfire: {
		 inherit: true,
		 baseStats: {hp: 103, atk: 103, def: 103, spa: 103, spd: 103, spe: 103}, 
	 },
	 silvallyflying: {
		 inherit: true,
		 baseStats: {hp: 103, atk: 103, def: 103, spa: 103, spd: 103, spe: 103}, 
	 },
	 silvallyghost: {
		 inherit: true,
		 baseStats: {hp: 103, atk: 103, def: 103, spa: 103, spd: 103, spe: 103}, 
	 },
	 silvallygrass: {
		 inherit: true,
		 baseStats: {hp: 103, atk: 103, def: 103, spa: 103, spd: 103, spe: 103}, 
	 },
	 silvallyground: {
		 inherit: true,
		 baseStats: {hp: 103, atk: 103, def: 103, spa: 103, spd: 103, spe: 103}, 
	 },
	 silvallyice: {
		 inherit: true,
		 baseStats: {hp: 103, atk: 103, def: 103, spa: 103, spd: 103, spe: 103}, 
	 },
	 silvallypoison: {
		 inherit: true,
		 baseStats: {hp: 103, atk: 103, def: 103, spa: 103, spd: 103, spe: 103}, 
	 },
	 silvallypsychic: {
		 inherit: true,
		 baseStats: {hp: 103, atk: 103, def: 103, spa: 103, spd: 103, spe: 103}, 
	 },
	 silvallyrock: {
		 inherit: true,
		 baseStats: {hp: 103, atk: 103, def: 103, spa: 103, spd: 103, spe: 103}, 
	 },
	 silvallysteel: {
		 inherit: true,
		 baseStats: {hp: 103, atk: 103, def: 103, spa: 103, spd: 103, spe: 103}, 
	 },
	 silvallywater: {
		 inherit: true,
		 baseStats: {hp: 103, atk: 103, def: 103, spa: 103, spd: 103, spe: 103}, 
	 },
	 wishiwashi: {
		 inherit: true,
		 types: ["Water", "Electric"],
		 baseStats: {hp: 65, atk: 70, def: 60, spa: 75, spd: 65, spe: 90}, 
	 },
	 wishiwashischool: {
		 inherit: true,
		 types: ["Ice", "Electric"],
		 baseStats: {hp: 65, atk: 130, def: 120, spa: 130, spd: 125, spe: 60}, 
	 },
	 dhelmise: {
		 inherit: true,
		 types: ["Ghost", "Steel"],
		 baseStats: {hp: 100, atk: 131, def: 100, spa: 86, spd: 100, spe: 20}, 
		 abilities: {0: "Gardener"},
	 },
	 vikavolt: {
		 inherit: true,
		 baseStats: {hp: 77, atk: 70, def: 90, spa: 130, spd: 90, spe: 80}, 
		 abilities: {0: "Levitate", H: "Compound Eyes"},
	 },
	 crabominable: {
		 inherit: true,
		 baseStats: {hp: 97, atk: 142, def: 97, spa: 62, spd: 87, spe: 73}, 
		 abilities: {0: "Anger Point", 1: "Iron Fist", H: "Technician"},
	 },
	 golisopod: {
		 inherit: true,
		 baseStats: {hp: 75, atk: 125, def: 140, spa: 60, spd: 90, spe: 55}, 
		 abilities: {0: "Tinted Lens"},
	 },
	 meganium: {
		 inherit: true,
		 types: ["Grass", "Fairy"],
		 baseStats: {hp: 100, atk: 82, def: 110, spa: 83, spd: 120, spe: 60}, 
		 abilities: {0: "Overgrow", H: "Thick Fat"},
	 },
	 typhlosion: {
		 inherit: true,
		 types: ["Fire", "Ground"],
		 baseStats: {hp: 78, atk: 94, def: 78, spa: 119, spd: 85, spe: 111},
	 },
	 feraligatr: {
		 inherit: true,
		 types: ["Water", "Dragon"],
		 baseStats: {hp: 85, atk: 125, def: 100, spa: 59, spd: 83, spe: 98}, 
	 },
	 dunsparce: {
		 inherit: true,
		 types: ["Normal", "Ground"],
		 baseStats: {hp: 120, atk: 90, def: 90, spa: 85, spd: 100, spe: 45}, 
		 abilities: {0: "Serene Grace", 1: "Filter", H: "Unaware"},
	 },
	 delibird: {
		 inherit: true,
		 baseStats: {hp: 60, atk: 100, def: 70, spa: 120, spd: 70, spe: 120}, 
		 abilities: {0: "Vital Spirit", 1: "Hustle", H: "Snow Warning"},
	 },
	 farfetchd: {
		 inherit: true,
		 types: ["Grass", "Flying"],
		 baseStats: {hp: 62, atk: 120, def: 90, spa: 58, spd: 77, spe: 125}, 
		 abilities: {0: "Keen Eye", 1: "Defiant", H: "Reckless"},
	 },
	 spinda: {
		 inherit: true,
		 types: ["Normal", "Fairy"],
		 baseStats: {hp: 80, atk: 100, def: 80, spa: 60, spd: 80, spe: 100}, 
	 },
	 stunfisk: {
		 inherit: true,
		 baseStats: {hp: 109, atk: 66, def: 109, spa: 101, spd: 104, spe: 12}, 
		 abilities: {0: "Static", 1: "Storm Drain", H: "Sand Veil"},
	 },
	 solrock: {
		 inherit: true,
		 types: ["Rock", "Fire"],
		 baseStats: {hp: 100, atk: 125, def: 115, spa: 55, spd: 75, spe: 90}, 
		 abilities: {0: "Levitate", H: "Rock Head"},
	 },
	 lunatone: {
		 inherit: true,
		 baseStats: {hp: 90, atk: 55, def: 65, spa: 115, spd: 95, spe: 110}, 
		 abilities: {0: "Levitate", H: "Lunatic"},
	 },
	 nidoking: {
		 inherit: true,
		 baseStats: {hp: 81, atk: 112, def: 77, spa: 100, spd: 75, spe: 105}, 
	 },
	 hitmontop: {
		 inherit: true,
		 types: ["Fighting", "Psychic"],
		 baseStats: {hp: 50, atk: 110, def: 110, spa: 35, spd: 120, spe: 75}, 
		 abilities: {0: "Intimidate", 1: "Technician", H: "Telepathy"},
	 },
	 braviary: {
		 inherit: true,
		 types: ["Flying"],
		 baseStats: {hp: 115, atk: 123, def: 95, spa: 57, spd: 95, spe: 82}, 
		 abilities: {0: "Aerilate", 1: "Sheer Force", H: "Defiant"},
	 },
	 gallade: {
		 inherit: true,
		 types: ["Fighting", "Fairy"],
		 baseStats: {hp: 85, atk: 125, def: 85, spa: 55, spd: 105, spe: 110}, 
		 abilities: {0: "Defiant", 1: "Trace", H: "Guts"},
	 },
	 tauros: {
		 inherit: true,
		 baseStats: {hp: 80, atk: 120, def: 95, spa: 80, spd: 70, spe: 110}, 
		 abilities: {0: "Intimidate", H: "Sheer Force"},
	 },
	 miltank: {
		 inherit: true,
		 types: ["Normal", "Psychic"],
		 baseStats: {hp: 110, atk: 95, def: 115, spa: 40, spd: 85, spe: 110}, 
	 },
	 mandibuzz: {
		 inherit: true,
		 baseStats: {hp: 120, atk: 75, def: 120, spa: 55, spd: 110, spe: 80}, 
		 abilities: {0: "Big Pecks", 1: "Overcoat", H: "Stamina"},
	 },
	 kangaskhan: {
		 inherit: true,
		 types: ["Normal", "Dragon"],
		 baseStats: {hp: 115, atk: 115, def: 105, spa: 35, spd: 105, spe: 95}, 
		 abilities: {0: "Scrappy", 1: "Mold Breaker", H: "Technician"},
	 },
	 nidoqueen: {
		 inherit: true,
		 baseStats: {hp: 100, atk: 92, def: 107, spa: 85, spd: 95, spe: 76}, 
		 abilities: {0: "Rivalry", 1: "Poison Point", H: "Sheer Force"},
	 },
	 salazzle: {
		 inherit: true,
		 baseStats: {hp: 128, atk: 64, def: 60, spa: 127, spd: 100, spe: 127}, 
		 abilities: {0: "Corrosion", H: "Merciless"},
	 },
	 crobat: {
		 inherit: true,
		 baseStats: {hp: 100, atk: 100, def: 80, spa: 70, spd: 80, spe: 130}, 
		 abilities: {0: "Merciless", H: "Strong Jaw"},
	 },
	 mismagius: {
		 inherit: true,
		 types: ["Ghost", "Fairy"],
		 baseStats: {hp: 75, atk: 60, def: 75, spa: 115, spd: 115, spe: 115}, 
		 abilities: {0: "Levitate", H: "Prankster"},
	 },
	 honchkrow: {
		 inherit: true,
		 baseStats: {hp: 100, atk: 145, def: 72, spa: 95, spd: 67, spe: 95}, 
	 },
	 gourgeist: {
		 inherit: true,
		 types: ["Grass", "Fire"],
		 baseStats: {hp: 85, atk: 50, def: 95, spa: 120, spd: 85, spe: 95}, 
		 abilities: {0: "Jack-O-Lantern", H: "Magic Guard"},
	 },
	 gourgeistsmall: {
		 inherit: true,
		 types: ["Grass", "Fire"],
		 baseStats: {hp: 85, atk: 95, def: 50, spa: 95, spd: 85, spe: 120}, 
		 abilities: {0: "Jack-O-Lantern", H: "Magic Guard"},
	 },
	 gourgeistlarge: {
		 inherit: true,
		 types: ["Grass", "Fire"],
		 baseStats: {hp: 85, atk: 120, def: 95, spa: 95, spd: 85, spe: 50}, 
		 abilities: {0: "Jack-O-Lantern", H: "Magic Guard"},
	 },
	 gourgeistsuper: {
		 inherit: true,
		 types: ["Grass", "Fire"],
		 baseStats: {hp: 85, atk: 95, def: 120, spa: 95, spd: 85, spe: 50}, 
		 abilities: {0: "Jack-O-Lantern", H: "Magic Guard"},
	 },
};
