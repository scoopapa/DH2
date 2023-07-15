export const Items: {[k: string]: ModdedItemData} = {
	honey: {
		name: "Honey",
		fling: {
			basePower: 20,
		},
		num: -1005,
		gen: 4,
    shortDesc: "Pokemon with the ability Honey Gather heal 12.5% when holding this item.",
	},
	reliccharm: {
		name: "Relic Charm",
		spritenum: 390,
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Meloetta') {
				pokemon.formeChange('Meloetta-Pirouette');
			}
		},
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Fighting') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Meloetta') return false;
			return true;
		},
		itemUser: ["Meloetta"],
		num: -1006,
		gen: 8,
		desc: "If held by Meloetta: Pirouette Forme on entry, 1.2x power Fighting-type attacks.",
	},
	eternamaxcandy: {
		name: "Eternamax Candy",
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Eternatus') {
				pokemon.formeChange('Eternatus-Eternamax');
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Eternatus') return false;
			return true;
		},
		itemUser: ["Eternatus"],
		num: -1007,
		gen: 8,
		desc: "If held by Eternatus: Eternamaxes on entry.",
	},
	electirizer: {
		name: "Electirizer",
		spritenum: 119,
		fling: {
			basePower: 80,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.num === 466 && (move.type === 'Electric' || move.type === 'Fighting')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Electivire') return false;
			return true;
		},
		itemUser: ["Electivire"],
		num: 322,
		gen: 4,
		desc: "If held by Electivire: 1.2x power on Electric and Fighting-type moves.",
	},
	magmarizer: {
		name: "Magmarizer",
		spritenum: 272,
		fling: {
			basePower: 80,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.num === 467 && (move.type === 'Fire' || move.type === 'Dark')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Magmortar') return false;
			return true;
		},
		itemUser: ["Magmortar"],
		num: 323,
		gen: 4,
		desc: "If held by Magmortar: 1.2x power on Fire and Dark-type moves.",
	},
	frosterizer: {
		name: "Frosterizer",
		spritenum: 272,
		fling: {
			basePower: 80,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.num === 8998 && (move.type === 'Ice' || move.type === 'Psychic')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Frostonna') return false;
			return true;
		},
		itemUser: ["Frostonna"],
		num: -1008,
		gen: 8,
		desc: "If held by Frostonna: 1.2x power on Ice and Psychic-type moves.",
	},
	stunorb: {
		name: "Stun Orb",
		spritenum: 515,
		fling: {
			basePower: 30,
			status: 'par',
		},
		onResidualOrder: 26,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			pokemon.trySetStatus('par', pokemon);
		},
		num: -1009,
		gen: 8,
		desc: "Attempts to paralyze holder at the end of every turn.",
	},
	lunarwing: {
		name: "Lunar Wing",
		spritenum: 180,
		fling: {
			basePower: 10,
		},
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			if (this.field.isTerrain('grassyterrain')) return;
			if (pokemon.baseSpecies.name === 'Sompuer') {
				this.heal(pokemon.baseMaxhp / 8);
			}
		},
		onTerrain(pokemon) {
			if (!this.field.isTerrain('grassyterrain')) return;
			if (pokemon.baseSpecies.name === 'Sompuer') {
				this.heal(pokemon.baseMaxhp / 8);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 9053) || pokemon.baseSpecies.num === 9053) {
				return false;
			}
			return true;
		},
		itemUser: ["Sompuer"],
		num: -1047,
		gen: 8,
		desc: "If the holder is Sompuer, this Pokemon heals 12.5% of its max HP every turn.",
	},
	enigmaticwing: {
		name: "Enigmatic Wing",
		spritenum: 180,
		fling: {
			basePower: 10,
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.name === 'Sompuer') {
				return this.chainModify(1.3);
			}
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.name === 'Sompuer') {
				return this.chainModify(1.3);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 9053) || pokemon.baseSpecies.num === 9053) {
				return false;
			}
			return true;
		},
		itemUser: ["Sompuer"],
		num: -1048,
		gen: 8,
		desc: "If the holder is Sompuer, this Pokemon's attacks deal 1.3x damage.",
	},
	deepseascale: {
		name: "Deep Sea Scale",
		spritenum: 93,
		onTakeItem: false,
		fling: {
			basePower: 30,
		},
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.name === 'Clamperl') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Clamperl"],
		num: 227,
		gen: 3,
	},
	deepseatooth: {
		name: "Deep Sea Tooth",
		spritenum: 94,
		onTakeItem: false,
		fling: {
			basePower: 90,
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.name === 'Clamperl') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Clamperl"],
		num: 226,
		gen: 3,
	},
	saltcube: {
		name: "Salt Cube",
		spritenum: 390,
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Eiscue') {
				pokemon.formeChange('Eiscue-Noice');
				let oldAbility = pokemon.setAbility('waterbubble', pokemon, 'waterbubble', true);
				if (oldAbility) {
					this.add('-activate', pokemon, 'ability: Water Bubble', oldAbility, '[of] ' + pokemon);
				}
			}
		},
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Ice') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Eiscue') return false;
			return true;
		},
		itemUser: ["Eiscue"],
		num: -1049,
		gen: 8,
		desc: "If held by Eiscue: Noice Forme on entry, Water Bubble, Immune to Stealth Rock, & 1.2x power Ice-type attacks.",
	},

// Z-Crystals
	rhyperiumz: {
		name: "Rhyperium Z",
		spritenum: 656,
		onTakeItem: false,
		zMove: "Cobblestone Carnage",
		zMoveFrom: "Rock Wrecker",
		itemUser: ["Rhyperior"],
		num: -1029,
		gen: 8,
		desc: "If held by a Rhyperior with Rock Wrecker, allows it to use the Z-Move Cobblestone Carnage.",
	},
	lickilickiumz: {
		name: "Lickilickium Z",
		spritenum: 656,
		onTakeItem: false,
		zMove: "Tongue-Tied Tirade",
		zMoveFrom: "Body Slam",
		itemUser: ["Lickilicky"],
		num: -1030,
		gen: 8,
		desc: "If held by a Lickilicky with Body Slam, allows it to use the Z-Move Tongue-Tied Tirade.",
	},
	honchkriumz: {
		name: "Honchkrium Z",
		spritenum: 656,
		onTakeItem: false,
		zMove: "Crow's Calling Card",
		zMoveFrom: "Sucker Punch",
		itemUser: ["Honchkrow"],
		num: -1031,
		gen: 8,
		desc: "If held by a Honchkrow with Sucker Punch, allows it to use the Z-Move Crow's Calling Card.",
	},
	mismagiumz: {
		name: "Mismagium Z",
		spritenum: 656,
		onTakeItem: false,
		zMove: "Witches' Wishes",
		zMoveFrom: "Shadow Ball",
		itemUser: ["Mismagius"],
		num: -1032,
		gen: 8,
		desc: "If held by a Mismagius with Shadow Ball, allows it to use the Z-Move Witches' Wishes.",
	},
	roseradiumz: {
		name: "Roseradium Z",
		spritenum: 656,
		onTakeItem: false,
		zMove: "Lily's Last Dance",
		zMoveFrom: "Sludge Bomb",
		itemUser: ["Roserade"],
		num: -1033,
		gen: 8,
		desc: "If held by a Roserade with Sludge Bomb, allows it to use the Z-Move Lily's Last Dance.",
	},
	walreiniumz: {
		name: "Walreinium Z",
		spritenum: 656,
		onTakeItem: false,
		zMove: "Ice Age Reign",
		zMoveFrom: "Ice Beam",
		itemUser: ["Walrein"],
		num: -1034,
		gen: 8,
		desc: "If held by a Walrein with Ice Beam, allows it to use the Z-Move Ice Age Reign.",
	},
	cherriumz: {
		name: "Cherrium Z",
		spritenum: 656,
		onTakeItem: false,
		zMove: "Salute to Sunshine",
		zMoveFrom: "Solar Blade",
		itemUser: ["Cherrim"],
		num: -1035,
		gen: 8,
		desc: "If held by a Cherrim with Solar Blade, allows it to use the Z-Move Salute to Sunshine.",
	},
	vespiumz: {
		name: "Vespium Z",
		spritenum: 656,
		onTakeItem: false,
		zMove: "Hectic Hivemind",
		zMoveFrom: "Attack Order",
		itemUser: ["Vespiquen"],
		num: -1036,
		gen: 8,
		desc: "If held by a Vespiquen with Attack Order, allows it to use the Z-Move Hectic Hivemind.",
	},
	krookiumz: {
		name: "Krookium Z",
		spritenum: 656,
		onTakeItem: false,
		zMove: "Desert Disaster",
		zMoveFrom: "Earthquake",
		itemUser: ["Krookodile"],
		num: -1037,
		gen: 8,
		desc: "If held by a Krookodile with Earthquake, allows it to use the Z-Move Desert Disaster.",
	},
	beheeyemiumz: {
		name: "Beheeyemium Z",
		spritenum: 656,
		onTakeItem: false,
		zMove: "Alien Atmosphere",
		zMoveFrom: "Psyshock",
		itemUser: ["Beheeyem"],
		num: -1038,
		gen: 8,
		desc: "If held by a Beheeyem with Psyshock, allows it to use the Z-Move Alien Atmosphere.",
	},
	noiviumz: {
		name: "Noivium Z",
		spritenum: 656,
		onTakeItem: false,
		zMove: "Ear-Splitting Echoes",
		zMoveFrom: "Hurricane",
		itemUser: ["Noivern"],
		num: -1039,
		gen: 8,
		desc: "If held by a Noivern with Hurricane, allows it to use the Z-Move Ear-Splitting Echoes.",
	},
	volcaniumz: {
		name: "Volcanium Z",
		spritenum: 656,
		onTakeItem: false,
		zMove: "Smoldering Sauna",
		zMoveFrom: "Steam Eruption",
		itemUser: ["Volcanion"],
		num: -1040,
		gen: 8,
		desc: "If held by a Volcanion with Steam Eruption, allows it to use the Z-Move Smoldering Sauna.",
	},
	floettiumz: {
		name: "Floettium Z",
		spritenum: 656,
		onTakeItem: false,
		zMove: "Eternal Blossom",
		zMoveFrom: "Light of Ruin",
		itemUser: ["Floette-Eternal"],
		num: -1041,
		gen: 8,
		desc: "If held by an Eternal Floette with Light of Ruin, allows it to use the Z-Move Eternal Blossom.",
	},
	togedemariumz: {
		name: "Togedemarium Z",
		spritenum: 656,
		onTakeItem: false,
		zMove: "Amped-Up Spikeball",
		zMoveFrom: "Zing Zap",
		itemUser: ["Togedemaru"],
		num: -1042,
		gen: 8,
		desc: "If held by a Togedemaru with Zing Zap, allows it to use the Z-Move Amped-Up Spikeball.",
	},
	drampiumz: {
		name: "Drampium Z",
		spritenum: 656,
		onTakeItem: false,
		zMove: "Neverending War Story",
		zMoveFrom: "Draco Meteor",
		itemUser: ["Drampa"],
		num: -1043,
		gen: 8,
		desc: "If held by a Drampa with Draco Meteor, allows it to use the Z-Move Neverending War Story.",
	},
	turtonatiumz: {
		name: "Turtonatium Z",
		spritenum: 656,
		onTakeItem: false,
		zMove: "Molten Minefield",
		zMoveFrom: "Shell Trap",
		itemUser: ["Turtonator"],
		num: -1044,
		gen: 8,
		desc: "If held by a Turtonator with Shell Trap, allows it to use the Z-Move Molten Minefield.",
	},
	falinksiumz: {
		name: "Falinksium Z",
		spritenum: 656,
		onTakeItem: false,
		zMove: "Crusader's Courage",
		zMoveFrom: "No Retreat",
		itemUser: ["Falinks"],
		num: -1045,
		gen: 8,
		desc: "If held by a Falinks with No Retreat, allows it to use the Z-Move Crusader's Courage.",
	},
	copperajiumz: {
		name: "Copperajium Z",
		spritenum: 656,
		onTakeItem: false,
		zMove: "Metallic Mausoleum",
		zMoveFrom: "Iron Head",
		itemUser: ["Copperajah"],
		num: -1046,
		gen: 8,
		desc: "If held by a Copperajah with Iron Head, allows it to use the Z-Move Metallic Mausoleum.",
	},

	
	
// Mega Stones
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
		num: -1010,
		gen: 8,
		desc: "If held by a Butterfree, this item allows it to Mega Evolve in battle.",
	},
	milotite: {
		name: "Milotite",
		spritenum: 578,
		megaStone: "Milotic-Mega",
		megaEvolves: "Milotic",
		itemUser: ["Milotic"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1011,
		gen: 8,
		desc: "If held by a Milotic, this item allows it to Mega Evolve in battle.",
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
		num: -1012,
		gen: 8,
		desc: "If held by a Froslass, this item allows it to Mega Evolve in battle.",
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
		num: -1013,
		gen: 8,
		desc: "If held by a Slowking, this item allows it to Mega Evolve in battle.",
	},
	tentacruelite: {
		name: "Tentacruelite",
		spritenum: 578,
		megaStone: "Tentacruel-Mega",
		megaEvolves: "Tentacruel",
		itemUser: ["Tentacruel"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1014,
		gen: 8,
		desc: "If held by a Tentacruel, this item allows it to Mega Evolve in battle.",
	},
	meganiumite: {
		name: "Meganiumite",
		spritenum: 578,
		megaStone: "Meganium-Mega",
		megaEvolves: "Meganium",
		itemUser: ["Meganium"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1015,
		gen: 8,
		desc: "If held by a Meganium, this item allows it to Mega Evolve in battle.",
	},
	typhlosionite: {
		name: "Typhlosionite",
		spritenum: 578,
		megaStone: "Typhlosion-Mega",
		megaEvolves: "Typhlosion",
		itemUser: ["Typhlosion"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1016,
		gen: 8,
		desc: "If held by a Typhlosion, this item allows it to Mega Evolve in battle.",
	},
	feraligatrite: {
		name: "Feraligatrite",
		spritenum: 578,
		megaStone: "Feraligatr-Mega",
		megaEvolves: "Feraligatr",
		itemUser: ["Feraligatr"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1017,
		gen: 8,
		desc: "If held by a Feraligatr, this item allows it to Mega Evolve in battle.",
	},
	granbullite: {
		name: "Granbullite",
		spritenum: 578,
		megaStone: "Granbull-Mega",
		megaEvolves: "Granbull",
		itemUser: ["Granbull"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1018,
		gen: 8,
		desc: "If held by a Granbull, this item allows it to Mega Evolve in battle.",
	},
	dusknoirite: {
		name: "Dusknoirite",
		spritenum: 578,
		megaStone: "Dusknoir-Mega",
		megaEvolves: "Dusknoir",
		itemUser: ["Dusknoir"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1019,
		gen: 8,
		desc: "If held by a Dusknoir, this item allows it to Mega Evolve in battle.",
	},
	drapionite: {
		name: "Drapionite",
		spritenum: 578,
		megaStone: "Drapion-Mega",
		megaEvolves: "Drapion",
		itemUser: ["Drapion"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1020,
		gen: 8,
		desc: "If held by a Drapion, this item allows it to Mega Evolve in battle.",
	},
	cinccinite: {
		name: "Cinccinite",
		spritenum: 578,
		megaStone: "Cinccino-Mega",
		megaEvolves: "Cinccino",
		itemUser: ["Cinccino"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1021,
		gen: 8,
		desc: "If held by a Cinccino, this item allows it to Mega Evolve in battle.",
	},
	hydreigonite: {
		name: "Hydreigonite",
		spritenum: 578,
		megaStone: "Hydreigon-Mega",
		megaEvolves: "Hydreigon",
		itemUser: ["Hydreigon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1022,
		gen: 8,
		desc: "If held by a Hydreigon, this item allows it to Mega Evolve in battle.",
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
		num: -1023,
		gen: 8,
		desc: "If held by a Talonflame, this item allows it to Mega Evolve in battle.",
	},
	malamarite: {
		name: "Malamarite",
		spritenum: 578,
		megaStone: "Malamar-Mega",
		megaEvolves: "Malamar",
		itemUser: ["Malamar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1024,
		gen: 8,
		desc: "If held by a Malamar, this item allows it to Mega Evolve in battle.",
	},
	shiinotite: {
		name: "Shiinotite",
		spritenum: 578,
		megaStone: "Shiinotic-Mega",
		megaEvolves: "Shiinotic",
		itemUser: ["Shiinotic"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1025,
		gen: 8,
		desc: "If held by a Shiinotic, this item allows it to Mega Evolve in battle.",
	},
	bewearite: {
		name: "Bewearite",
		spritenum: 578,
		megaStone: "Bewear-Mega",
		megaEvolves: "Bewear",
		itemUser: ["Bewear"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1026,
		gen: 8,
		desc: "If held by a Bewear, this item allows it to Mega Evolve in battle.",
	},
	thievulite: {
		name: "Thievulite",
		spritenum: 578,
		megaStone: "Thievul-Mega",
		megaEvolves: "Thievul",
		itemUser: ["Thievul"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1027,
		gen: 8,
		desc: "If held by a Thievul, this item allows it to Mega Evolve in battle.",
	},
	duraludite: {
		name: "Duraludite",
		spritenum: 578,
		megaStone: "Duraludon-Mega",
		megaEvolves: "Duraludon",
		itemUser: ["Duraludon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1028,
		gen: 8,
		desc: "If held by a Duraludon, this item allows it to Mega Evolve in battle.",
	},
};
