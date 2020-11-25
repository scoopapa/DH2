'use strict';

/**@type {{[k: string]: SpeciesData}} */
export const Pokedex: {[speciesid: string]: SpeciesData} = {
	/*
	ink here with comments! in order for this to be functional they need weights (at least i think).
	ive included placeholders that are halfway between the base species weights? till im told what else to edit it to.
	
	
name: { 
	// P1 + P2
	num: x.5,
	species: "Name",
	types: [""],
	baseStats: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
	abilities: {0: ""},
	weightkg: ,
},

	*/
// 1 -----------------
uranus: {
	// Quagsire + Hippowdon
	num: 1.5,
	species: "Uranus",
	types: ["Water", "Ground"],
	baseStats: {hp: 110, atk: 100, def: 110, spa: 80, spd: 70, spe: 45},
	abilities: {0: "Unamused"},
	weightkg: 187.5, 
	prevo: "Hippopotas", //Wooper learnset added manually, this is jsut so I don't have to do both
	//If I don't do this, certain Pokemon cant learn moves they definitely usually have access to
	//eg. Vespithorn not being able to learn Leech Seed
},
saturn: {
	// Eternatus + Hattrem
	num: 2.5,
	species: "Saturn",
	types: ["Dragon", "Psychic"],
	baseStats: {hp: 114, atk: 65, def: 80, spa: 115, spd: 104, spe: 90},
	abilities: {0: "Pressure Bounce"},
	weightkg: 477.4,
	prevo: "Hatenna", //This is for move compatibility
},
// 2 -----------------
doot: {
	// Toxapex + Golisopod
	num: 3.5,
	species: "Doot",
	types: ["Water", "Poison"],
	baseStats: {hp: 82, atk: 94, def: 146, spa: 56, spd: 136, spe: 37},
	abilities: {0: "Au Revoir"},
	weightkg: 61.25, 
	prevo: "Mareanie", //Wimpod added in learnsets
},
mrgross: {
	// Mr. Rime + Metagross
	num: 4.5,
	species: "Mr. Gross",
	types: ["Steel", "Psychic"],
	baseStats: {hp: 100, atk: 110, def: 110, spa: 109, spd: 110, spe: 70},
	abilities: {0: "Clear Cleaner"},
	weightkg: 304.1,
	prevo: 'Metang', //Galarian Mr. Mime line added manually
},
pluto: {
	// Rotom-Frost + Blacephalon
	num: 5.5,
	species: "Pluto",
	types: ["Ice", "Ghost"],
	baseStats: {hp: 59, atk: 107, def: 83, spa: 131, spd: 97, spe: 107},
	abilities: {0: "Terraform"},
	weightkg: 6.65,
},
zeus: {
	// Zeraora + Tauros
	num: 6.5,
	species: "Zeus",
	types: ["Electric", "Normal"],
	baseStats: {hp: 101, atk: 126, def: 85, spa: 71, spd: 75, spe: 126},
	abilities: {0: "Thunderclap"},
	weightkg: 66.45,
},
// 3 -----------------
picante: {
	// Flapple + Victini
	num: 7.5,
	species: "Picante",
	types: ["Grass", "Fire"],
	baseStats: {hp: 95, atk: 115, def: 100, spa: 107, spd: 80, spe: 85},
	abilities: {0: "Passion Star"},
	weightkg: 2.5,
	prevo: 'Applin',
},
mrvolcano: {
	// Mr. Mime + Volcanion 
	num: 8.5,
	species: "Mr. Volcano",
	types: ["Fire", "Fairy"],
	baseStats: {hp: 60, atk: 77, def: 102, spa: 120, spd: 110, spe: 100},
	abilities: {0: "Volcanicity"},
	weightkg: 124.75,
	prevo: 'Mime Jr.',
},
vespithorn: {
	// Vespiquen + Ferrothorn
	num: 9.5,
	species: "Vespithorn",
	types: ["Bug", "Steel"],
	baseStats: {hp: 82, atk: 87, def: 136, spa: 67, spd: 119, spe: 30},
	abilities: {0: "Iron Stinger"},
	weightkg: 74.25,
	prevo: 'Ferroseed', //Combee added manually
},
ishtar: {
	// Rotom-Heat + Togekiss
	num: 10.5,
	species: "Ishtar",
	types: ["Electric", "Fairy"],
	baseStats: {hp: 80, atk: 60, def: 105, spa: 115, spd: 125, spe: 85},
	abilities: {0: "Spell Master"},
	weightkg: 19.15,
	prevo: 'Togetic',
},
// 4 -----------------
ananke: {
	// Lycanroc + Terrakion
	num: 11.5,
	species: "Ananke",
	types: ["Rock", "Fighting"],
	baseStats: {hp: 88, atk: 137, def: 82, spa: 63, spd: 82, spe: 120},
	abilities: {0: "Compulsive"},
	weightkg: 142.5,
	prevo: 'Rockruff',
},
darkrose: {
	// Darkrai + Roserade
	num: 12.5,
	species: "Dark Rose",
	types: ["Dark", "Poison"],
	baseStats: {hp: 65, atk: 100, def: 90, spa: 131, spd: 100, spe: 110},
	abilities: {0: "Bad Program"},
	weightkg: 32.5,
	prevo: 'Roselia',
},
kratos: {
	// Krookodile + Staraptor
	num: 13.5,
	species: "Kratos",
	types: ["Ground", "Flying"],
	baseStats: {hp: 95, atk: 133, def: 90, spa: 62, spd: 80, spe: 111},
	abilities: {0: "Intimidate"},
	weightkg: 60.6,
	prevo: 'Krokorok', //Starly + Staravia added manually
},
whiterider: {
	// Kyurem-White + Ledian
	num: 14.5,
	species: "White Rider",
	types: ["Dragon", "Flying"],
	baseStats: {hp: 90, atk: 80, def: 84, spa: 115, spd: 125, spe: 90},
	abilities: {0: "Foul Breath"},
	weightkg: 180.3,
	prevo: 'Ledyba',
},
// 5 -----------------
curchyspeed: {
	// Pincurchin + Deoxys-Speed
	num: 15.5,
	species: "Curchys-Peed",
	types: ["Electric", "Psychic"],
	baseStats: {hp: 49, atk: 118, def: 92, spa: 93, spd: 87, spe: 117},
	abilities: {0: "Galvaforce"},
	weightkg: 30.9,
},
corvilord: {
	// Corviknight + Wailord
	num: 16.5,
	species: "Corvilord",
	types: ["Steel", "Water"],
	baseStats: {hp: 139, atk: 98, def: 95, spa: 76, spd: 90, spe: 68},
	abilities: {0: "Pressure"},
	weightkg: 236.5,
	prevo: 'Corvisquire', //Wailmer added manually
},
kord: {
	// Guzzlord + Dusknoir
	num: 17.5,
	species: "Kord",
	types: ["Dark", "Ghost"],
	baseStats: {hp: 134, atk: 100, def: 114, spa: 81, spd: 114, spe: 44},
	abilities: {0: "Pressure Boost"},
	weightkg: 497.3,
	prevo: 'Dusclops',
},
sirpassd: {
	// Passimian + Sirfetch'd
	num: 18.5,
	species: "Sir Pass'd",
	types: ["Fighting"],
	baseStats: {hp: 101, atk: 127, def: 92, spa: 54, spd: 71, spe: 92},
	abilities: {0: "Chivalry"},
	weightkg: 99.9,
	prevo: 'Farfetch\u2019d-Galar',
},
// 6 ----------------- (park, under this is where youre editing, dont get lost!!!)
teepee: { //done
	// Polteageist + Indeedee-F
	num: 19.5,
	species: "Teepee",
	types: ["Ghost", "Normal"],
	baseStats: {hp: 70, atk: 65, def: 65, spa: 124, spd: 129, spe: 77},
	abilities: {0: "Armor Surge"},
	weightkg: 14.2,
	prevo: 'Sinistea',
},
composite: { //done
	// Kommo-o + Sceptile
	num: 20.5,
	species: "Composite",
	types: ["Fighting", "Grass"],
	baseStats: {hp: 83, atk: 100, def: 95, spa: 120, spd: 95, spe: 110},
	abilities: {0: "Unbullet"},
	weightkg: 65.2,
	prevo: 'Grovyle', //Jangmo-o and Hakamo-o added manually
},
alilat: { //done
	// Appletun + Virizion
	num: 21.5,
	species: "Alilat",
	types: ["Grass"],
	baseStats: {hp: 105, atk: 95, def: 95, spa: 95, spd: 105, spe: 76},
	abilities: {0: "Diamond Dust"},
	weightkg: 106.5,
	prevo: 'Applin',
},
umbrisse: { //done
	// Umbreon + Aromatisse
	num: 22.5,
	species: "Umbrisse",
	types: ["Dark", "Fairy"],
	baseStats: {hp: 103, atk: 68, def: 111, spa: 84, spd: 119, spe: 47},
	abilities: {0: "Integrity"},
	weightkg: 21.25,
	prevo: 'Eevee', //Spritzee added manually
},
// 7 -----------------
blackrider: { //done
	// Kyurem-Black + Pawniard
	num: 23.5,
	species: "Black Rider",
	types: ["Dragon", "Dark"],
	baseStats: {hp: 85, atk: 130, def: 85, spa: 85, spd: 85, spe: 89},
	abilities: {0: "Ambient Aid"},
	weightkg: 167.6,
},
frother: { //done
	// Froslass + Scyther
	num: 24.5,
	species: "Frother",
	types: ["Ice", "Flying"],
	baseStats: {hp: 75, atk: 105, def: 80, spa: 67, spd: 80, spe: 122},
	abilities: {0: "Technical Curse"},
	weightkg: 41.3,
	prevo: 'Snorunt',
},
beezone: { //done
	// Magnezone + Beheeyem
	num: 25.5,
	species: "Beezone",
	types: ["Steel", "Psychic"],
	baseStats: {hp: 80, atk: 77, def: 110, spa: 131, spd: 110, spe: 65},
	abilities: {0: "Analytic"},
	weightkg: 107.25,
	prevo: 'Magneton', //Elgyem added manually
},
toxiking: { //done
	// Toxtricity + Nidoking
	num: 26.5,
	species: "Toxiking",
	types: ["Electric", "Ground"],
	baseStats: {hp: 80, atk: 100, def: 75, spa: 119, spd: 85, spe: 83},
	abilities: {0: "Plus Ultra"},
	weightkg: 51,
	prevo: 'Nidorino', //Toxel added manually
},
// 8 -----------------
norn: { //done
	// Porygon2 + Dragalge
	num: 27.5,
	species: "Norn",
	types: ["Normal", "Poison"],
	baseStats: {hp: 90, atk: 90, def: 90, spa: 110, spd: 110, spe: 54},
	abilities: {0: "Nocturnal Flash"},
	weightkg: 57,
	prevo: 'Porygon', //Skrelp added manually
},
oni: { //done
	// Incineroar + Crabominable
	num: 28.5,
	species: "Oni",
	types: ["Fire", "Ice"],
	baseStats: {hp: 111, atk: 125, def: 85, spa: 85, spd: 85, spe: 51},
	abilities: {0: "Fatal End"},
	weightkg: 131.5,
	prevo: 'Torracat', //Crabrawler added manually
},
ares: { //done
	// Zapdos + Pelipper
	num: 29.5,
	species: "Ares",
	types: ["Flying", "Electric"],
	baseStats: {hp: 95, atk: 70, def: 92, spa: 110, spd: 90, spe: 92},
	abilities: {0: "Thunderstorm"},
	weightkg: 40.3,
	prevo: 'Wingull',
},
armalion: { 
	// Armaldo + Cobalion
	num: 30.5,
	species: "Armalion",
	types: ["Steel", "Bug"],
	baseStats: {hp: 83, atk: 127, def: 114, spa: 80, spd: 76, spe: 96},
	abilities: {0: "Water Warrior"},
	weightkg: 159.1,
	prevo: 'Anorith',
},
// 9 -----------------
};
