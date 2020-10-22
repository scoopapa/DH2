export const BattleItems: {[k: string]: ModdedItemData} = {
	draconite: {
		name: "Draconite",
		spritenum: 586,
		megaStone: "Dragonite-Mega",
		megaEvolves: "Dragonite",
		itemUser: ["Dragonite"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1001,
		gen: 8,
		desc: "If held by a Dragonite, this item allows it to Mega Evolve in battle.",
	},
	hydreigonite: {
		name: "Hydreigonite",
		spritenum: 585,
		megaStone: "Hydreigon-Mega",
		megaEvolves: "Hydreigon",
		itemUser: ["Hydreigon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1002,
		gen: 8,
		desc: "If held by a Hydreigon, this item allows it to Mega Evolve in battle.",
	},
	goodranite: {
		name: "Goodranite",
		spritenum: 577,
		megaStone: "Goodra-Mega",
		megaEvolves: "Goodra",
		itemUser: ["Goodra"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1003,
		gen: 8,
		desc: "If held by a Goodra, this item allows it to Mega Evolve in battle.",
	},
	kommonite: {
		name: "Kommonite",
		spritenum: 580,
		megaStone: "Kommo-o-Mega",
		megaEvolves: "Kommo-o",
		itemUser: ["Kommo-o"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1004,
		gen: 8,
		desc: "If held by a Kommo-o, this item allows it to Mega Evolve in battle.",
	},
	dragapultite: {
		name: "Dragapultite",
		spritenum: 600,
		megaStone: "Dragapult-Mega",
		megaEvolves: "Dragapult",
		itemUser: ["Dragapult"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1005,
		gen: 8,
		desc: "If held by a Dragapult, this item allows it to Mega Evolve in battle.",
	},
	corviknite: {
		name: "Corviknite",
		spritenum: 578,
		megaStone: "Corviknight-Mega",
		megaEvolves: "Corviknight",
		itemUser: ["Corviknight"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1006,
		gen: 8,
		desc: "If held by a Corviknight, this item allows it to Mega Evolve in battle.",
	},
	orbeetlite: {
		name: "Orbeetlite",
		spritenum: 584,
		megaStone: "Orbeetle-Mega",
		megaEvolves: "Orbeetle",
		itemUser: ["Orbeetle"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1007,
		gen: 8,
		desc: "If held by an Orbeetle, this item allows it to Mega Evolve in battle.",
	},
	thievulite: {
		name: "Thievulite",
		spritenum: 591,
		megaStone: "Thievul-Mega",
		megaEvolves: "Thievul",
		itemUser: ["Thievul"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1008,
		gen: 8,
		desc: "If held by a Thievul, this item allows it to Mega Evolve in battle.",
	},
	toucannonite: {
		name: "Toucannonite",
		spritenum: 625,
		megaStone: "Toucannon-Mega",
		megaEvolves: "Toucannon",
		itemUser: ["Toucannon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1009,
		gen: 8,
		desc: "If held by a Toucannon, this item allows it to Mega Evolve in battle.",
	},
	gumshoosite: {
		name: "Gumshoosite",
		spritenum: 622,
		megaStone: "Gumshoos-Mega",
		megaEvolves: "Gumshoos",
		itemUser: ["Gumshoos"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1010,
		gen: 8,
		desc: "If held by a Gumshoos, this item allows it to Mega Evolve in battle.",
	},
	dusklycanite: {
		name: "Dusk Lycanite",
		spritenum: 602,
		megaStone: "Lycanroc-Mega-Dusk",
		megaEvolves: "Lycanroc",
		itemUser: ["Lycanroc"],
		onTakeItem(item, source) {
			if (source.species.name === 'Lycanroc-Dusk' || source.species.name === 'Lycanroc-Mega-Dusk') return false;
			return true;
		},
		num: -1011,
		gen: 8,
		desc: "If held by a Lycanroc in its Dusk Form, this item allows it to Mega Evolve in battle.",
	},
	middaylycanite: {
		name: "Midday Lycanite",
		spritenum: 602,
		megaStone: "Lycanroc-Mega",
		megaEvolves: "Lycanroc",
		itemUser: ["Lycanroc"],
		onTakeItem(item, source) {
			if (source.species.name === 'Lycanroc' || source.species.name === 'Lycanroc-Mega') return false;
			return true;
		},
		num: -1012,
		gen: 8,
		desc: "If held by a Lycanroc in its Midday Form, this item allows it to Mega Evolve in battle.",
	},
	electricseed: {
		name: "Electric Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain('electricterrain')) {
				for (const target of this.getAllActive()) {
					if (target.hasAbility('downtoearth')) {
						this.debug('Down-to-Earth prevents Seed use');
						return;
					}
				}
				pokemon.useItem();
			}
		},
		onAnyTerrainStart() {
			const pokemon = this.effectData.target;
			if (this.field.isTerrain('electricterrain')) {
				for (const target of this.getAllActive()) {
					if (target.hasAbility('downtoearth')) {
						this.debug('Down-to-Earth prevents Seed use');
						return;
					}
				}
				pokemon.useItem();
			}
		},
		boosts: {
			def: 1,
		},
		num: 881,
		gen: 7,
		desc: "If the terrain is Electric Terrain, raises holder's Defense by 1 stage. Single use.",
	},
	psychicseed: {
		name: "Psychic Seed",
		spritenum: 665,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain('psychicterrain')) {
				for (const target of this.getAllActive()) {
					if (target.hasAbility('downtoearth')) {
						this.debug('Down-to-Earth prevents Seed use');
						return;
					}
				}
				pokemon.useItem();
			}
		},
		onAnyTerrainStart() {
			const pokemon = this.effectData.target;
			if (this.field.isTerrain('psychicterrain')) {
				for (const target of this.getAllActive()) {
					if (target.hasAbility('downtoearth')) {
						this.debug('Down-to-Earth prevents Seed use');
						return;
					}
				}
				pokemon.useItem();
			}
		},
		boosts: {
			spd: 1,
		},
		num: 882,
		gen: 7,
		desc: "If the terrain is Psychic Terrain, raises holder's Sp. Def by 1 stage. Single use.",
	},
	mistyseed: {
		name: "Misty Seed",
		spritenum: 666,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain('mistyterrain')) {
				for (const target of this.getAllActive()) {
					if (target.hasAbility('downtoearth')) {
						this.debug('Down-to-Earth prevents Seed use');
						return;
					}
				}
				pokemon.useItem();
			}
		},
		onAnyTerrainStart() {
			const pokemon = this.effectData.target;
			if (this.field.isTerrain('mistyterrain')) {
				for (const target of this.getAllActive()) {
					if (target.hasAbility('downtoearth')) {
						this.debug('Down-to-Earth prevents Seed use');
						return;
					}
				}
				pokemon.useItem();
			}
		},
		boosts: {
			spd: 1,
		},
		num: 883,
		gen: 7,
		desc: "If the terrain is Misty Terrain, raises holder's Sp. Def by 1 stage. Single use.",
	},
	grassyseed: {
		name: "Grassy Seed",
		spritenum: 667,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain('grassyterrain')) {
				for (const target of this.getAllActive()) {
					if (target.hasAbility('downtoearth')) {
						this.debug('Down-to-Earth prevents Seed use');
						return;
					}
				}
				pokemon.useItem();
			}
		},
		onAnyTerrainStart() {
			const pokemon = this.effectData.target;
			if (this.field.isTerrain('grassyterrain')) {
				for (const target of this.getAllActive()) {
					if (target.hasAbility('downtoearth')) {
						this.debug('Down-to-Earth prevents Seed use');
						return;
					}
				}
				pokemon.useItem();
			}
		},
		boosts: {
			def: 1,
		},
		num: 884,
		gen: 7,
		desc: "If the terrain is Grassy Terrain, raises holder's Defense by 1 stage. Single use.",
	},
	midnightlycanite: {
		name: "Midnight Lycanite",
		spritenum: 602,
		megaStone: "Lycanroc-Mega-Midnight",
		megaEvolves: "Lycanroc",
		itemUser: ["Lycanroc"],
		onTakeItem(item, source) {
			if (source.species.name === 'Lycanroc-Midnight' || source.species.name === 'Lycanroc-Mega-Midnight') return false;
			return true;
		},
		num: -1013,
		gen: 8,
		desc: "If held by a Lycanroc-Midnight, this item allows it to Mega Evolve in battle.",
	},
	vikavoltite: {
		name: "Vikavoltite",
		spritenum: 607,
		megaStone: "Vikavolt-Mega",
		megaEvolves: "Vikavolt",
		itemUser: ["Vikavolt"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1014,
		gen: 8,
		desc: "If held by a Vikavolt, this item allows it to Mega Evolve in battle.",
	},
	raichunite: {
		name: "Raichunite",
		spritenum: 628,
		megaStone: "Raichu-Mega",
		megaEvolves: "Raichu",
		itemUser: ["Raichu"],
		onTakeItem(item, source) {
			if (source.species.name === 'Raichu' || source.species.name === 'Raichu-Mega') return false;
			return true;
		},
		num: -1015,
		gen: 8,
		desc: "If held by a Raichu, this item allows it to Mega Evolve in battle.",
	},
	clefabite: {
		name: "Clefabite",
		spritenum: 617,
		megaStone: "Clefable-Mega",
		megaEvolves: "Clefable",
		itemUser: ["Clefable"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1016,
		gen: 8,
		desc: "If held by a Clefable, this item allows it to Mega Evolve in battle.",
	},
	rillaboomite: {
		name: "Rillaboomite",
		spritenum: 613,
		megaStone: "Rillaboom-Mega",
		megaEvolves: "Rillaboom",
		itemUser: ["Rillaboom"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1017,
		gen: 8,
		desc: "If held by a Rillaboom, this item allows it to Mega Evolve in battle.",
	},
	cinderite: {
		name: "Cinderite",
		spritenum: 590,
		megaStone: "Cinderace-Mega",
		megaEvolves: "Cinderace",
		itemUser: ["Cinderace"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1018,
		gen: 8,
		desc: "If held by a Cinderace, this item allows it to Mega Evolve in battle.",
	},
	inteleonite: {
		name: "Inteleonite",
		spritenum: 608,
		megaStone: "Inteleon-Mega",
		megaEvolves: "Inteleon",
		itemUser: ["Inteleon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1019,
		gen: 8,
		desc: "If held by an Inteleon, this item allows it to Mega Evolve in battle.",
	},
	klinklite: {
		name: "Klinklite",
		spritenum: 578,
		megaStone: "Klinklang-Mega",
		megaEvolves: "Klinklang",
		itemUser: ["Klinklang"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1020,
		gen: 8,
		desc: "If held by a Klinklang, this item allows it to Mega Evolve in battle.",
	},
	vanillite: {
		name: "Vanillite",
		spritenum: 578,
		megaStone: "Vanilluxe-Mega",
		megaEvolves: "Vanilluxe",
		itemUser: ["Vanilluxe"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1021,
		gen: 8,
		desc: "If held by a Vanilluxe, this item allows it to Mega Evolve in battle.",
	},
	garbodorite: {
		name: "Garbodorite",
		spritenum: 578,
		megaStone: "Garbodor-Mega",
		megaEvolves: "Garbodor",
		itemUser: ["Garbodor"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1022,
		gen: 8,
		desc: "If held by a Garbodor, this item allows it to Mega Evolve in battle.",
	},
	vaporeonite: {
		name: "Vaporeonite",
		spritenum: 578,
		megaStone: "Vaporeon-Mega",
		megaEvolves: "Vaporeon",
		itemUser: ["Vaporeon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1023,
		gen: 8,
		desc: "If held by a Vaporeon, this item allows it to Mega Evolve in battle.",
	},
	jolteonite: {
		name: "Jolteonite",
		spritenum: 578,
		megaStone: "Jolteon-Mega",
		megaEvolves: "Jolteon",
		itemUser: ["Jolteon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1024,
		gen: 8,
		desc: "If held by a Jolteon, this item allows it to Mega Evolve in battle.",
	},
	flareonite: {
		name: "Flareonite",
		spritenum: 578,
		megaStone: "Flareon-Mega",
		megaEvolves: "Flareon",
		itemUser: ["Flareon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1025,
		gen: 8,
		desc: "If held by a Flareon, this item allows it to Mega Evolve in battle.",
	},
	butterfrite: {
		name: "Butterfrite",
		spritenum: 578,
		megaStone: "Butterfree-Mega",
		megaEvolves: "Butterfree",
		itemUser: ["Butterfree"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1026,
		gen: 8,
		desc: "If held by a Butterfree, this item allows it to Mega Evolve in battle.",
	},
	slowkinite: {
		name: "Slowkinite",
		spritenum: 578,
		megaStone: "Slowking-Mega",
		megaEvolves: "Slowking",
		itemUser: ["Slowking"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1027,
		gen: 8,
		desc: "If held by a Slowking, this item allows it to Mega Evolve in battle.",
	},
	froslassite: {
		name: "Froslassite",
		spritenum: 578,
		megaStone: "Froslass-Mega",
		megaEvolves: "Froslass",
		itemUser: ["Froslass"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1028,
		gen: 8,
		desc: "If held by a Froslass, this item allows it to Mega Evolve in battle.",
	},
	conkeldite: {
		name: "Conkeldite",
		spritenum: 578,
		megaStone: "Conkeldurr-Mega",
		megaEvolves: "Conkeldurr",
		itemUser: ["Conkeldurr"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1029,
		gen: 8,
		desc: "If held by a Conkeldurr, this item allows it to Mega Evolve in battle.",
	},
	gothitite: {
		name: "Gothitite",
		spritenum: 578,
		megaStone: "Gothitelle-Mega",
		megaEvolves: "Gothitelle",
		itemUser: ["Gothitelle"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1030,
		gen: 8,
		desc: "If held by a Gothitelle, this item allows it to Mega Evolve in battle.",
	},
	chandelite: {
		name: "Chandelite",
		spritenum: 578,
		megaStone: "Chandelure-Mega",
		megaEvolves: "Chandelure",
		itemUser: ["Chandelure"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1031,
		gen: 8,
		desc: "If held by a Chandelure, this item allows it to Mega Evolve in battle.",
	},
	bisharpite: {
		name: "Bisharpite",
		spritenum: 578,
		megaStone: "Bisharp-Mega",
		megaEvolves: "Bisharp",
		itemUser: ["Bisharp"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1032,
		gen: 8,
		desc: "If held by a Bisharp, this item allows it to Mega Evolve in battle.",
	},
	gigalite: {
		name: "Gigalite",
		spritenum: 578,
		megaStone: "Gigalith-Mega",
		megaEvolves: "Gigalith",
		itemUser: ["Gigalith"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1033,
		gen: 8,
		desc: "If held by a Gigalith, this item allows it to Mega Evolve in battle.",
	},
	reunite: {
		name: "Reunite",
		spritenum: 578,
		megaStone: "Reuniclus-Mega",
		megaEvolves: "Reuniclus",
		itemUser: ["Reuniclus"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1034,
		gen: 8,
		desc: "If held by a Reuniclus, this item allows it to Mega Evolve in battle.",
	},
	boltundite: {
		name: "Boltundite",
		spritenum: 578,
		megaStone: "Boltund-Mega",
		megaEvolves: "Boltund",
		itemUser: ["Boltund"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1035,
		gen: 8,
		desc: "If held by a Boltund, this item allows it to Mega Evolve in battle.",
	},
	luxrite: {
		name: "Luxrite",
		spritenum: 578,
		megaStone: "Luxray-Mega",
		megaEvolves: "Luxray",
		itemUser: ["Luxray"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1036,
		gen: 8,
		desc: "If held by a Luxray, this item allows it to Mega Evolve in battle.",
	},
	archeonite: {
		name: "Archeonite",
		spritenum: 578,
		megaStone: "Archeops-Mega",
		megaEvolves: "Archeops",
		itemUser: ["Archeops"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1037,
		gen: 8,
		desc: "If held by an Archeops, this item allows it to Mega Evolve in battle.",
	},
	talonflite: {
		name: "Talonflite",
		spritenum: 578,
		megaStone: "Talonflame-Mega",
		megaEvolves: "Talonflame",
		itemUser: ["Talonflame"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1038,
		gen: 8,
		desc: "If held by a Talonflame, this item allows it to Mega Evolve in battle.",
	},
	staraptorite: {
		name: "Staraptorite",
		spritenum: 578,
		megaStone: "Staraptor-Mega",
		megaEvolves: "Staraptor",
		itemUser: ["Staraptor"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1039,
		gen: 8,
		desc: "If held by a Staraptor, this item allows it to Mega Evolve in battle.",
	},
	bibarelite: {
		name: "Bibarelite",
		spritenum: 578,
		megaStone: "Bibarel-Mega",
		megaEvolves: "Bibarel",
		itemUser: ["Bibarel"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1040,
		gen: 8,
		desc: "If held by a Bibarel, this item allows it to Mega Evolve in battle.",
	},
	kricketite: {
		name: "Kricketite",
		spritenum: 578,
		megaStone: "Kricketune-Mega",
		megaEvolves: "Kricketune",
		itemUser: ["Kricketune"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1041,
		gen: 8,
		desc: "If held by a Kricketune, this item allows it to Mega Evolve in battle.",
	},
	mismaginite: {
		name: "Mismaginite",
		spritenum: 578,
		megaStone: "Mismagius-Mega",
		megaEvolves: "Mismagius",
		itemUser: ["Mismagius"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1042,
		gen: 8,
		desc: "If held by a Mismagius, this item allows it to Mega Evolve in battle.",
	},
	honchkronite: {
		name: "Honchkronite",
		spritenum: 578,
		megaStone: "Honchkrow-Mega",
		megaEvolves: "Honchkrow",
		itemUser: ["Honchkrow"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1043,
		gen: 8,
		desc: "If held by a Honchkrow, this item allows it to Mega Evolve in battle.",
	},
	oddkeystone: {
		name: "Odd Keystone",
		spritenum: 578,
		megaStone: "Spiritomb-Mega",
		megaEvolves: "Spiritomb",
		itemUser: ["Spiritomb"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1044,
		gen: 8,
		desc: "If held by a Spiritomb, this item allows it to Mega Evolve in battle.",
	},
}
