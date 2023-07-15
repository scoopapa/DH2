'use strict';

exports.BattlePokedex = {
    inkip: {
        num: 75011,
        species: "Inkip",
        types: ["Dark", "Water"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 61,
            atk: 77,
            def: 67,
            spa: 48,
            spd: 58,
            spe: 47
        },
        abilities: {
            0: "Turnabout Torrent"
        },
        heightm: 0.4,
        weightkg: 5.5,
        color: "Blue",
		  evos: ["swampamar"],
		  fusion: ["Inkay", "Mudkip"],
        eggGroups: ["Water 1"],
    },
    swampamar: {
        num: 75001,
        species: "Swampamar",
        types: ["Dark", "Water"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 103,
            atk: 111,
            def: 99,
            spa: 86,
            spd: 92,
            spe: 76
        },
        abilities: {
            0: "Turnabout Torrent"
        },
        heightm: 1.5,
        weightkg: 64.4,
        color: "Blue",
		  prevo: "inkip",
		  evoLevel: 28,
		  fusion: ["Swampert", "Malamar"],
		  otherFormes: ["swampamarmega"],
        eggGroups: ["Water 1"],
    },
    swampamarmega: {
        num: 75001,
        species: "Swampamar-Mega",
        baseSpecies: "Swampamar",
        forme: "Mega",
        formeLetter: "M",
        types: ["Dark", "Water"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 103,
            atk: 151,
            def: 119,
            spa: 96,
            spd: 112,
            spe: 86
        },
        abilities: {
            0: "Swift Swim"
        },
        heightm: 1.9,
        weightkg: 84.5,
        color: "Blue",
        eggGroups: ["Water 1"],
    },
    feekarp: {
        num: 75012,
        species: "Feekarp",
        types: ["Water"],
        baseStats: {
            hp: 30,
            atk: 22,
            def: 52,
            spa: 22,
            spd: 52,
            spe: 100
        },
        abilities: {
            0: "Swift Swim"
        },
        heightm: 0.75,
        weightkg: 8.4,
        color: "Red",
		  fusion: ["Feebas", "Magikarp"],
		  evos: ["gyarotic"],
        eggGroups: ["Dragon"],
    },
    gyarotic: {
        num: 75002,
        species: "Gyarotic",
        types: ["Water"],
        baseStats: {
            hp: 105,
            atk: 102,
            def: 89,
            spa: 90,
            spd: 122,
            spe: 91
        },
        abilities: {
            0: "Intimidating Scales"
        },
        heightm: 6.35,
        weightkg: 198.5,
		  prevo: "feekarp",
		  evoLevel: 20,
        color: "Blue",
		  otherFormes: ["gyaroticmega"],
        eggGroups: ["Dragon"],
    },
    gyaroticmega: {
        num: 75002,
        species: "Gyarotic-Mega",
        baseSpecies: "Gyarotic",
        forme: "Mega",
        formeLetter: "M",
        types: ["Water", "Dark"],
        baseStats: {
            hp: 105,
            atk: 132,
            def: 119,
            spa: 100,
            spd: 152,
            spe: 91
        },
        abilities: {
            0: "Mold Breaker"
        },
        heightm: 6.35,
        weightkg: 278.5,
        color: "Blue",
        eggGroups: ["Dragon"],
    },
    krillazulie: {
        num: 75013,
        species: "Krillazulie",
        types: ["Normal", "Water"],
        genderRatio: {
            M: 0.625,
            F: 0.375
        },
        baseStats: {
            hp: 51,
            atk: 50,
            def: 50,
            spa: 50,
            spd: 50,
            spe: 50
        },
        abilities: {
            0: "Moss Cleaner"
        },
        heightm: 0.25,
        weightkg: 4.5,
		  evos: ["frogrill"],
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
    frogrill: {
        num: 75014,
        species: "Frogrill",
        types: ["Water"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 77,
            atk: 56,
            def: 66,
            spa: 66,
            spd: 68,
            spe: 83
        },
        abilities: {
            0: "Huge Torrent"
        },
        heightm: 0.5,
        weightkg: 9.7,
		  prevo: "krillazulie",
		  evos: ["azuninja"],
		  evoLevel: 16,
        color: "Blue",
        eggGroups: ["Water 1"],
    },
    azuninja: {
        num: 75003,
        species: "Azuninja",
        types: ["Water"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 96,
            atk: 82,
            def: 83,
            spa: 91,
            spd: 85,
            spe: 96
        },
        abilities: {
            0: "Huge Torrent"
        },
        heightm: 1.145,
        weightkg: 34.2,
		  prevo: "frogrill",
		  evoLevel: 27,
        color: "Blue",
        eggGroups: ["Water 1"],
    },
    chandeform: {
        num: 75004,
        species: "Chandeform",
        types: ["Ghost", "Normal"],
        baseStats: {
            hp: 75,
            atk: 72,
            def: 90,
            spa: 117,
            spd: 90,
            spe: 85
        },
        abilities: {
            0: "Flash Weather"
        },
        heightm: 0.645,
        weightkg: 17.5,
        color: "Black",
        eggGroups: ["Amorphous"],
        otherFormes: ["chandeformsunny", "chandeformrainy", "chandeformsnowy", "chandeformsandy", "chandeformspooky", "chandeformprickly"],
    },
    chandeformsunny: {
        num: 75004,
        species: "Chandeform-Sunny",
        baseSpecies: "Chandeform",
        forme: "Sunny",
        formeLetter: "S",
        types: ["Ghost", "Fire"],
        baseStats: {
            hp: 75,
            atk: 72,
            def: 90,
            spa: 117,
            spd: 90,
            spe: 85
        },
        abilities: {
            0: "Flash Weather"
        },
        heightm: 0.645,
        weightkg: 17.5,
        color: "Black",
        eggGroups: ["Amorphous"],
    },
    chandeformrainy: {
        num: 75004,
        species: "Chandeform-Rainy",
        baseSpecies: "Chandeform",
        forme: "Rainy",
        formeLetter: "R",
        types: ["Ghost", "Water"],
        baseStats: {
            hp: 75,
            atk: 72,
            def: 90,
            spa: 117,
            spd: 90,
            spe: 85
        },
        abilities: {
            0: "Flash Weather"
        },
        heightm: 0.645,
        weightkg: 17.5,
        color: "Black",
        eggGroups: ["Amorphous"],
    },
    chandeformsnowy: {
        num: 75004,
        species: "Chandeform-Snowy",
        baseSpecies: "Chandeform",
        forme: "Snowy",
        formeLetter: "S",
        types: ["Ghost", "Ice"],
        baseStats: {
            hp: 75,
            atk: 72,
            def: 90,
            spa: 117,
            spd: 90,
            spe: 85
        },
        abilities: {
            0: "Flash Weather"
        },
        heightm: 0.645,
        weightkg: 17.5,
        color: "Black",
        eggGroups: ["Amorphous"],
    },
    chandeformsandy: {
        num: 75004,
        species: "Chandeform-Sandy",
        baseSpecies: "Chandeform",
        forme: "Sandy",
        formeLetter: "S",
        types: ["Ghost", "Rock"],
        baseStats: {
            hp: 75,
            atk: 72,
            def: 90,
            spa: 117,
            spd: 90,
            spe: 85
        },
        abilities: {
            0: "Flash Weather"
        },
        heightm: 0.645,
        weightkg: 17.5,
        color: "Black",
        eggGroups: ["Amorphous"],
    },
    chandeformspooky: {
        num: 75004,
        species: "Chandeform-Spooky",
        baseSpecies: "Chandeform",
        forme: "Spooky",
        formeLetter: "S",
        types: ["Ghost"],
        baseStats: {
            hp: 75,
            atk: 72,
            def: 90,
            spa: 117,
            spd: 90,
            spe: 85
        },
        abilities: {
            0: "Flash Weather"
        },
        heightm: 0.645,
        weightkg: 17.5,
        color: "Black",
        eggGroups: ["Amorphous"],
    },
    chandeformprickly: {
        num: 75004,
        species: "Chandeform-Prickly",
        baseSpecies: "Chandeform",
        forme: "Prickly",
        formeLetter: "P",
        types: ["Ghost", "Grass"],
        baseStats: {
            hp: 75,
            atk: 72,
            def: 90,
            spa: 117,
            spd: 90,
            spe: 85
        },
        abilities: {
            0: "Flash Weather"
        },
        heightm: 0.645,
        weightkg: 17.5,
        color: "Black",
        eggGroups: ["Amorphous"],
    },
    dynamiss: {
        num: 75015,
        species: "Dynamiss",
        types: ["Electric", "Ghost"],
        baseStats: {
            hp: 77,
            atk: 56,
            def: 66,
            spa: 66,
            spd: 68,
            spe: 83
        },
        abilities: {
            0: "Levitate"
        },
        heightm: 0.45,
        weightkg: 0.6,
		  evos: ["mismatross"],
        color: "White",
        eggGroups: ["Amorphous"],
    },
    mismatross: {
        num: 75005,
        species: "Mismatross",
        types: ["Electric", "Ghost"],
        baseStats: {
            hp: 82,
            atk: 97,
            def: 80,
            spa: 115,
            spd: 102,
            spe: 87
        },
        abilities: {
            0: "Levitate"
        },
		  prevo: "dynamiss",
		  evoLevel: 41,
        heightm: 1.5,
        weightkg: 42.4,
        color: "Purple",
        eggGroups: ["Amorphous"],
    },
    axidos: {
        num: 75016,
        species: "Axidos",
        types: ["Dragon", "Rock"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 66,
            atk: 126,
            def: 60,
            spa: 40,
            spd: 45,
            spe: 77
        },
        abilities: {
            0: "Mold Breaker"
        },
        heightm: 0.75,
        weightkg: 24.7,
		  evos: ["haxardos"],
        color: "Green",
        eggGroups: ["Monster"],
    },
    haxardos: {
        num: 75006,
        species: "Haxardos",
        types: ["Dragon", "Rock"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 101,
            atk: 171,
            def: 90,
            spa: 77,
            spd: 75,
            spe: 92
        },
        abilities: {
            0: "Mold Breaker"
        },
        heightm: 1.7,
        weightkg: 104,
		  prevo: "axidos",
		  evoLevel: 36,
        color: "Yellow",
        eggGroups: ["Monster"],
    },
    pangleye: {
        num: 75007,
        species: "Pangleye",
        types: ["Fighting", "Dark"],
        baseStats: {
            hp: 82,
            atk: 109,
            def: 86,
            spa: 77,
            spd: 78,
            spe: 64
        },
        abilities: {
            0: "Molded Stall"
        },
        heightm: 1.31,
        weightkg: 73.5,
        color: "Black",
		  otherFormes: ["pangleyemega"],
        eggGroups: ["Human-Like"],
    },
    pangleyemega: {
        num: 75007,
        species: "Pangleye-Mega",
        baseSpecies: "Pangleye",
        forme: "Mega",
        formeLetter: "M",
        types: ["Fighting", "Dark"],
        baseStats: {
            hp: 82,
            atk: 119,
            def: 136,
            spa: 97,
            spd: 128,
            spe: 34
        },
        abilities: {
            0: "Magic Bounce"
        },
        heightm: 1.31,
        weightkg: 223.5,
        color: "Black",
        eggGroups: ["Human-Like"],
    },
    gibikarp: {
        num: 75017,
        species: "Gibikarp",
        types: ["Ground", "Water"],
        baseStats: {
            hp: 50,
            atk: 55,
            def: 55,
            spa: 32,
            spd: 37,
            spe: 70
        },
        abilities: {
            0: "Denticles"
        },
        heightm: 0.8,
        weightkg: 15.2,
		  evos: ["garchados"],
        color: "Red",
        eggGroups: ["Dragon"],
    },
    garchados: {
        num: 75008,
        species: "Garchados",
        types: ["Ground", "Water"],
        baseStats: {
            hp: 111,
            atk: 137,
            def: 97,
            spa: 80,
            spd: 102,
            spe: 101
        },
        abilities: {
            0: "Veil of Intimidation"
        },
        heightm: 4.205,
        weightkg: 165,
		  prevo: "gibikarp",
		  evoLevel: 29,
        color: "Blue",
        eggGroups: ["Dragon"],
		  otherFormes: ["garchadosmegac", "garchadosmegay"],
    },
    garchadosmegac: {
        num: 75008,
        species: "Garchados-Mega-C",
        baseSpecies: "Garchados",
        forme: "Mega",
        formeLetter: "M",
        types: ["Ground", "Water"],
        baseStats: {
            hp: 111,
            atk: 177,
            def: 117,
            spa: 120,
            spd: 112,
            spe: 91
        },
        abilities: {
            0: "Sand Force"
        },
        heightm: 4.205,
        weightkg: 165,
        color: "Brown",
        eggGroups: ["Dragon"],
    },
    garchadosmegay: {
        num: 75008,
        species: "Garchados-Mega-Y",
        baseSpecies: "Garchados",
        forme: "Mega",
        formeLetter: "M",
        types: ["Ground", "Dark"],
        baseStats: {
            hp: 111,
            atk: 167,
            def: 127,
            spa: 90,
            spd: 132,
            spe: 101
        },
        abilities: {
            0: "Mold Breaker"
        },
        heightm: 4.205,
        weightkg: 245,
        color: "Brown",
        eggGroups: ["Dragon"],
    },
    merkitty: {
        num: 75018,
        species: "Merkitty",
        types: ["Water", "Normal"],
        genderRatio: {M: 0.375, F: 0.625},
        baseStats: {
            hp: 100,
            atk: 63,
            def: 50,
            spa: 57,
            spd: 50,
            spe: 60
        },
        abilities: {
            0: "Normalized Enemy"
        },
        heightm: 1.4,
        weightkg: 70.5,
		  evos: ["wailcatty"],
        color: "Pink",
        eggGroups: ["Field"],
    },
    wailcatty: {
        num: 75009,
        species: "Wailcatty",
        types: ["Normal", "Water"],
        genderRatio: {M: 0.375, F: 0.625},
        baseStats: {
            hp: 130,
            atk: 87,
            def: 65,
            spa: 82,
            spd: 60,
            spe: 75
        },
        abilities: {
            0: "Normalized Enemy"
        },
        heightm: 7.795,
        weightkg: 215.3,
		  prevo: "wailkitty",
		  evoLevel: 40,
        color: "Purple",
        eggGroups: ["Field"],
    },
    gibodile: {
        num: 75019,
        species: "Gibodile",
        types: ["Dragon", "Water"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 59,
            atk: 82,
            def: 59,
            spa: 47,
            spd: 51,
            spe: 57
        },
        abilities: {
            0: "Torrent Veil"
        },
        heightm: 0.65,
        weightkg: 15,
		  evos: ["gabinaw"],
        color: "Blue",
        eggGroups: ["Monster"],
    },
    gabinaw: {
        num: 750110,
        species: "Gabinaw",
        types: ["Dragon", "Water"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 76,
            atk: 95,
            def: 82,
            spa: 64,
            spd: 69,
            spe: 80
        },
        abilities: {
            0: "Torrent Veil"
        },
        heightm: 1.25,
        weightkg: 40.5,
		  prevo: "gibodile",
		  evos: ["gargatr"],
		  evoLevel: 21,
        color: "Blue",
        eggGroups: ["Monster"],
    },
    gargatr: {
        num: 750010,
        species: "Gargatr",
        types: ["Dragon", "Water"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 106,
            atk: 127,
            def: 107,
            spa: 89,
            spd: 94,
            spe: 100
        },
        abilities: {
            0: "Torrent Veil"
        },
        heightm: 2.11,
        weightkg: 91.9,
		  prevo: "gabinaw",
		  evoLevel: 39,
        color: "Blue",
        eggGroups: ["Monster"],
		  otherFormes: ["gargatrmega"],
    },
    gargatrmega: {
        num: 750010,
        species: "Gargatr-Mega",
        baseSpecies: "Gargatr",
        forme: "Mega",
        formeLetter: "M",
        types: ["Dragon", "Water"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 106,
            atk: 167,
            def: 127,
            spa: 129,
            spd: 104,
            spe: 90
        },
        abilities: {
            0: "Sand Force"
        },
        heightm: 2.11,
        weightkg: 91.9,
        color: "Blue",
        eggGroups: ["Monster"],
    },
    krelpo: {
        num: 750111,
        species: "Krelpo",
        types: ["Poison", "Dark"],
        baseStats: {
            hp: 76,
            atk: 95,
            def: 82,
            spa: 64,
            spd: 69,
            spe: 80
        },
        abilities: {
            0: "Toxic Barrage"
        },
        heightm: 0.65,
        weightkg: 12.3,
		  evos: ["dragon"],
        color: "Blue",
        eggGroups: ["Dragon"],
    },
    dragon: {
        num: 750011,
        species: "Dragon",
        types: ["Dark", "Poison"],
        baseStats: {
            hp: 88,
            atk: 100,
            def: 100,
            spa: 121,
            spd: 116,
            spe: 81
        },
        abilities: {
            0: "Levipoison"
        },
		  prevo: "krelpo",
		  evoLevel: 52,
        heightm: 1.8,
        weightkg: 120.7,
        color: "Blue",
        eggGroups: ["Dragon"],
    },
    hawlusharp: {
        num: 750012,
        species: "Hawlusharp",
        types: ["Fighting", "Dark"],
        baseStats: {
            hp: 81,
            atk: 118,
            def: 97,
            spa: 77,
            spd: 76,
            spe: 104
        },
        abilities: {
            0: "Armor Cast"
        },
        heightm: 1.195,
        weightkg: 45.7,
        color: "Red",
        eggGroups: ["Human-Like"],
    },
    yamonix: {
        num: 750112,
        species: "Yamonix",
        types: ["Rock", "Ghost"],
        baseStats: {
            hp: 45,
            atk: 42,
            def: 130,
            spa: 60,
            spd: 60,
            spe: 55
        },
        abilities: {
            0: "Mummy Fortitude"
        },
        heightm: 4.65,
        weightkg: 105.7,
		  evos: ["cofagreelix"],
        color: "Black",
        eggGroups: ["Mineral"],
    },
    cofagreelix: {
        num: 750013,
        species: "Cofagreelix",
        types: ["Steel", "Ghost"],
        baseStats: {
            hp: 76,
            atk: 77,
            def: 182,
            spa: 85,
            spd: 95,
            spe: 40
        },
        abilities: {
            0: "Mummy Fortitude"
        },
        heightm: 5.445,
        weightkg: 238.2,
		  prevo: "yamonix",
		  evoLevel: 34,
        color: "Yellow",
		  otherFormes: ["cofagreelixmega"],
        eggGroups: ["Mineral"],
    },
    cofagreelixmega: {
        num: 750013,
        species: "Cofagreelix-Mega",
        baseSpecies: "Cofagreelix",
        forme: "Mega",
        formeLetter: "M",
        types: ["Steel", "Ghost"],
        baseStats: {
            hp: 76,
            atk: 117,
            def: 212,
            spa: 85,
            spd: 125,
            spe: 40
        },
        abilities: {
            0: "Sand Force"
        },
        heightm: 6.745,
        weightkg: 578.2,
        color: "Yellow",
        eggGroups: ["Mineral"],
    },
    wailee: {
        num: 750113,
        species: "Wailee",
        types: ["Normal", "Water"],
        baseStats: {
            hp: 100,
            atk: 67,
            def: 54,
            spa: 72,
            spd: 55,
            spe: 62
        },
        abilities: {
            0: "Adaptive Bias"
        },
        heightm: 1.15,
        weightkg: 68.2,
		  evos: ["joltlord", "umbord", "espord", "glacord"],
        color: "Brown",
        eggGroups: ["Field"],
    },
    joltlord: {
        num: 750014,
        species: "Joltlord",
        types: ["Electric", "Water"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 127,
            atk: 87,
            def: 62,
            spa: 110,
            spd: 80,
            spe: 105
        },
        abilities: {
            0: "Oblivious Absorb"
        },
        heightm: 7.645,
        weightkg: 211.2,
		  prevo: "wailee",
		  evoLevel: 40,
        color: "Yellow",
        eggGroups: ["Field"],
    },
    gligbee: {
        num: 750114,
        species: "Gligbee",
        types: ["Bug", "Ground"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 62,
            atk: 57,
            def: 78,
            spa: 37,
            spd: 68,
            spe: 82
        },
        abilities: {
            0: "Honey Sterilize"
        },
        heightm: 0.7,
        weightkg: 35.1,
		  evos: ["vespicor"],
        color: "Purple",
        eggGroups: ["Bug"],
    },
    vepsicor: {
        num: 750015,
        species: "Vepsicor",
        types: ["Bug", "Ground"],
        gender: "F",
        baseStats: {
            hp: 82,
            atk: 97,
            def: 123,
            spa: 72,
            spd: 98,
            spe: 77
        },
        abilities: {
            0: "Sand Pressure"
        },
        heightm: 1.6,
        weightkg: 40.5,
		  prevo: "gligbee",
		  evoLevel: 21,
        color: "Purple",
        eggGroups: ["Bug"],
    },
    zorgrowl: {
        num: 750115,
        species: "Zorgrowl",
        types: ["Fire", "Dark"],
        genderRatio: {
            M: 0.8125,
            F: 0.1875
        },
        baseStats: {
            hp: 55,
            atk: 74,
            def: 48,
            spa: 83,
            spd: 55,
            spe: 73
        },
        abilities: {
            0: "Mirage Guard"
        },
        heightm: 0.7,
        weightkg: 15.7,
        color: "Brown",
		  evos: ["zorcanine"],
        eggGroups: ["Field"],
    },
    zorcanine: {
        num: 750016,
        species: "Zorcanine",
        types: ["Fire", "Dark"],
        genderRatio: {
            M: 0.8125,
            F: 0.1875
        },
        baseStats: {
            hp: 85,
            atk: 117,
            def: 80,
            spa: 120,
            spd: 80,
            spe: 110
        },
        abilities: {
            0: "Mirage Guard"
        },
        heightm: 1.755,
        weightkg: 118,
		  prevo: "zorgrowl",
		  evoLevel: 30,
        color: "Brown",
        eggGroups: ["Field"],
    },
    archedactyl: {
        num: 750017,
        species: "Archedactyl",
        types: ["Rock", "Flying"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 87,
            atk: 132,
            def: 75,
            spa: 96,
            spd: 80,
            spe: 130
        },
        abilities: {
            0: "Aura of Failure"
        },
        heightm: 1.6,
        weightkg: 45.5,
        color: "Yellow",
		  otherFormes: ["archedactylmega"],
        eggGroups: ["Flying"],
    },
    archedactylmega: {
        num: 750017,
        species: "Archedactyl-Mega",
        baseSpecies: "Archedactyl",
        forme: "Mega",
        formeLetter: "M",
        types: ["Rock", "Flying"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 87,
            atk: 162,
            def: 95,
            spa: 106,
            spd: 100,
            spe: 150
        },
        abilities: {
            0: "Tough Claws"
        },
        heightm: 1.9,
        weightkg: 65.5,
        color: "Yellow",
        eggGroups: ["Flying"],
    },
    hippopopin: {
        num: 750116,
        species: "Hippopopin",
        types: ["Grass", "Ground"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 70,
            atk: 78,
            def: 80,
            spa: 48,
            spd: 54,
            spe: 40
        },
        abilities: {
            0: "Cactus Power"
        },
        heightm: 0.6,
        weightkg: 29.2,
        color: "Green",
		  evos: ["chesdon"],
        eggGroups: ["Field"],
    },
    chesdon: {
        num: 750018,
        species: "Chesdon",
        types: ["Grass", "Ground"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 108,
            atk: 119,
            def: 130,
            spa: 81,
            spd: 83,
            spe: 65
        },
        abilities: {
            0: "Cactus Power"
        },
        heightm: 1.805,
        weightkg: 195,
		  prevo: "hippopopin",
		  evoLevel: 30,
        color: "Green",
        eggGroups: ["Field"],
    },
    drilnub: {
        num: 750117,
        species: "Drilnub",
        types: ["Ground", "Ice"],
        baseStats: {
            hp: 60,
            atk: 82,
            def: 45,
            spa: 35,
            spd: 42,
            spe: 74
        },
        abilities: {
            0: "Slush Rush"
        },
        heightm: 0.35,
        weightkg: 7.5,
        color: "Brown",
		  evos: ["mamodrill"],
        eggGroups: ["Field"],
    },
    mamodrill: {
        num: 750019,
        species: "Mamodrill",
        types: ["Ground", "Ice"],
        baseStats: {
            hp: 120,
            atk: 142,
            def: 80,
            spa: 70,
            spd: 72,
            spe: 94
        },
        abilities: {
            0: "Slush Rush"
        },
		  prevo: "drilnub",
		  evoLevel: 30,
        heightm: 1.6,
        weightkg: 165.7,
        color: "Brown",
        eggGroups: ["Field"],
    },
    gooptile: {
        num: 750118,
        species: "Gooptile",
        types: ["Dragon", "Electric"],
        baseStats: {
            hp: 54,
            atk: 49,
            def: 43,
            spa: 71,
            spd: 64,
            spe: 63
        },
        abilities: {
            0: "Goop Skin"
        },
        heightm: 0.4,
        weightkg: 4.4,
        color: "Purple",
		  evos: ["heliodra"],
        eggGroups: ["Dragon"],
    },
    heliodra: {
        num: 750020,
        species: "Heliodra",
        types: ["Dragon", "Electric"],
        baseStats: {
            hp: 86,
            atk: 87,
            def: 71,
            spa: 119,
            spd: 132,
            spe: 104
        },
        abilities: {
            0: "Sandy Skin"
        },
		  prevo: "gooptile",
		  evoLevel: 45,
        heightm: 1.5,
        weightkg: 85.7,
        color: "Purple",
        eggGroups: ["Dragon"],
    },
    scyscor: {
        num: 750021,
        species: "Scyscor",
        types: ["Bug", "Ground"],
        baseStats: {
            hp: 82,
            atk: 112,
            def: 112,
            spa: 60,
            spd: 87,
            spe: 110
        },
        abilities: {
            0: "First Aid"
        },
        heightm: 1.755,
        weightkg: 49.2,
        color: "Purple",
        eggGroups: ["Bug"],
    },
    seedee: {
        num: 750119,
        species: "Seedee",
        types: ["Grass", "Normal"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 55,
            atk: 55,
            def: 55,
            spa: 50,
            spd: 55,
            spe: 50
        },
        abilities: {
            0: "Sleepy Switch"
        },
        heightm: 0.4,
        weightkg: 5.2,
        color: "Brown",
		  evos: ["joltry"],
        eggGroups: ["Field"],
    },
    joltry: {
        num: 750022,
        species: "Joltry",
        types: ["Grass", "Electric"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 87,
            atk: 92,
            def: 70,
            spa: 110,
            spd: 87,
            spe: 115
        },
        abilities: {
            0: "ChloroVolt"
        },
        heightm: 1.045,
        weightkg: 42,
		  prevo: "seedee",
		  evoLevel: 14,
        color: "Brown",
        eggGroups: ["Field"],
    },
    shoorazu: {
        num: 750120,
        species: "Shoorazu",
        types: ["Normal", "Grass"],
        genderRatio: {M: 0.375, F: 0.625},
        baseStats: {
            hp: 60,
            atk: 35,
            def: 65,
            spa: 35,
            spd: 65,
            spe: 32
        },
        abilities: {
            0: "Healing Fat"
        },
        heightm: 0.3,
        weightkg: 3.2,
        color: "Blue",
		  evos: ["azumaloom"],
        eggGroups: ["Undiscovered"],
    },
    azumaloom: {
        num: 750023,
        species: "Azumaloom",
        types: ["Water", "Grass"],
        baseStats: {
            hp: 90,
            atk: 100,
            def: 90,
            spa: 70,
            spd: 80,
            spe: 70
        },
        abilities: {
            0: "Healing Fat"
        },
        heightm: 0.99,
        weightkg: 33.8,
		  prevo: "shoorazu",
		  evoLevel: 20,
        color: "Blue",
        eggGroups: ["Fairy"],
    },
    sawkape: {
        num: 750024,
        species: "Sawkape",
        types: ["Fire", "Fighting"],
        gender: "M",
        baseStats: {
            hp: 85,
            atk: 124,
            def: 83,
            spa: 77,
            spd: 83,
            spe: 106
        },
        abilities: {
            0: "Blazing Body"
        },
        heightm: 1.295,
        weightkg: 53,
        color: "Brown",
        eggGroups: ["Human-Like"],
    },
    weasol: {
        num: 750025,
        species: "Weasol",
        types: ["Dark", "Ice"],
        baseStats: {
            hp: 77,
            atk: 135,
            def: 72,
            spa: 70,
            spd: 82,
            spe: 110
        },
        abilities: {
            0: "No Skill"
        },
        heightm: 1.14,
        weightkg: 40.5,
        color: "White",
		  otherFormes: ["weasolmega"],
        eggGroups: ["Field"],
    },
    weasolmega: {
        num: 750025,
        species: "Weasol-Mega",
        baseSpecies: "Weasol",
        forme: "Mega",
        formeLetter: "M",
        types: ["Dark", "Ice"],
        baseStats: {
            hp: 82,
            atk: 160,
            def: 77,
            spa: 115,
            spd: 87,
            spe: 155
        },
        abilities: {
            0: "Magic Bounce"
        },
        heightm: 1.15,
        weightkg: 42.5,
        color: "White",
        eggGroups: ["Field"],
    },
    tariblava: {
        num: 750121,
        species: "Tariblava",
        types: ["Ground", "Dragon"],
        baseStats: {
            hp: 65,
            atk: 80,
            def: 60,
            spa: 53,
            spd: 60,
            spe: 60
        },
        abilities: {
            0: "Sand Veil"
        },
        heightm: 0.65,
        weightkg: 46.2,
        color: "Blue",
		  evos: ["pupibite"],
        eggGroups: ["Monster"],
    },
    pupibite: {
        num: 750122,
        species: "Pupibite",
        types: ["Rock", "Dragon"],
        baseStats: {
            hp: 79,
            atk: 97,
            def: 77,
            spa: 67,
            spd: 72,
            spe: 76
        },
        abilities: {
            0: "Sand Shed"
        },
        heightm: 1.3,
        weightkg: 104,
        color: "Blue",
		  prevo: "tariblava",
		  evoLevel: 27,
		  evos: ["tyranichomp"],
        eggGroups: ["Monster"],
    },
    tyranichomp: {
        num: 750026,
        species: "Tyranichomp",
        types: ["Rock", "Dragon"],
        baseStats: {
            hp: 114,
            atk: 142,
            def: 112,
            spa: 97,
            spd: 102,
            spe: 91
        },
        abilities: {
            0: "Sand Aura"
        },
        heightm: 1.96,
        weightkg: 148.5,
		  prevo: "pupibite",
		  evoLevel: 51,
        color: "Blue",
		  otherFormes: ["tyranichompmegat", "tyranichompmegag"],
        eggGroups: ["Monster"],
    },
    tyranichompmegat: {
        num: 750026,
        species: "Tyranichomp-Mega-T",
        baseSpecies: "Tyranichomp",
        forme: "Mega",
        formeLetter: "M",
        types: ["Rock", "Dragon"],
        baseStats: {
            hp: 114,
            atk: 172,
            def: 152,
            spa: 97,
            spd: 122,
            spe: 101
        },
        abilities: {
            0: "Sand Stream"
        },
        heightm: 2.46,
        weightkg: 201.5,
        color: "Blue",
        eggGroups: ["Monster"],
    },

    tyranichompmegag: {
        num: 750026,
        species: "Tyranichomp-Mega-G",
        baseSpecies: "Tyranichomp",
        forme: "Mega",
        formeLetter: "M",
        types: ["Rock", "Dragon"],
        baseStats: {
            hp: 114,
            atk: 182,
            def: 132,
            spa: 137,
            spd: 112,
            spe: 81
        },
        abilities: {
            0: "Sand Force"
        },
        heightm: 1.96,
        weightkg: 148.5,
        color: "Blue",
        eggGroups: ["Monster"],
    },
    snochu: {
        num: 750123,
        species: "Snochu",
        types: ["Ice", "Electric"],
        baseStats: {
            hp: 44,
            atk: 57,
            def: 37,
            spa: 55,
            spd: 47,
            spe: 61
        },
        abilities: {
            0: "Static Storm"
        },
        heightm: 0.5,
        weightkg: 9.4,
        color: "Yellow",
		  evos: ["railie"],
        eggGroups: ["Undiscovered"],
    },
    railie: {
        num: 750027,
        species: "Railie",
        types: ["Ice", "Electric"],
        baseStats: {
            hp: 80,
            atk: 95,
            def: 77,
            spa: 95,
            spd: 90,
            spe: 105
        },
        abilities: {
            0: "Static Storm"
        },
        heightm: 1.145,
        weightkg: 143.2,
		  prevo: "snochu",
		  evoLevel: 42,
        color: "White",
		  otherFormes: ["railiemega"],
        eggGroups: ["Fairy"],
    },
    railiemega: {
        num: 750027,
        species: "Railie-Mega",
        baseSpecies: "Railie",
        forme: "Mega",
        formeLetter: "M",
        types: ["Ice", "Electric"],
        baseStats: {
            hp: 80,
            atk: 135,
            def: 77,
            spa: 135,
            spd: 90,
            spe: 125
        },
        abilities: {
            0: "Refrigerate"
        },
        heightm: 1.745,
        weightkg: 236.9,
        color: "White",
        eggGroups: ["Fairy"],
    },
    charmingkarp: {
        num: 750124,
        species: "Charmingkarp",
        types: ["Fire", "Water"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 34,
            atk: 43,
            def: 55,
            spa: 43,
            spd: 45,
            spe: 83
        },
        abilities: {
            0: "Nightlight"
        },
        heightm: 0.75,
        weightkg: 9.2,
        color: "Red",
		  evos: ["charatos"],
        eggGroups: ["Dragon"],
    },
    charatos: {
        num: 750028,
        species: "Charatos",
        types: ["Fire", "Water"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 97,
            atk: 115,
            def: 89,
            spa: 95,
            spd: 103,
            spe: 101
        },
        abilities: {
            0: "Dreaded Flames"
        },
        heightm: 4.1,
        weightkg: 162.7,
		  prevo: "charmingkarp",
		  evoLevel: 23,
        color: "Blue",
		  otherFormes: ["charatosmegax", "charatosmegay", "charatosmegag"],
        eggGroups: ["Dragon"],
    },
    charatosmegay: {
        num: 750028,
        species: "Charatos-Mega-Y",
        baseSpecies: "Charatos",
        forme: "Mega",
        formeLetter: "M",
        types: ["Fire", "Water"],
        baseStats: {
            hp: 97,
            atk: 135,
            def: 89,
            spa: 145,
            spd: 133,
            spe: 101
        },
        abilities: {
            0: "Drought"
        },
        heightm: 4.1,
        weightkg: 172.7,
        color: "Blue",
        eggGroups: ["Dragon"],
    },

    charatosmegax: {
        num: 750028,
        species: "Charatos-Mega-X",
        baseSpecies: "Charatos",
        forme: "Mega",
        formeLetter: "M",
        types: ["Fire", "Dragon"],
        baseStats: {
            hp: 97,
            atk: 161,
            def: 122,
            spa: 116,
            spd: 103,
            spe: 101
        },
        abilities: {
            0: "Tough Claws"
        },
        heightm: 4.1,
        weightkg: 182.7,
        color: "Black",
        eggGroups: ["Dragon"],
    },

    charatosmegag: {
        num: 750028,
        species: "Charatos-Mega-G",
        baseSpecies: "Charatos",
        forme: "Mega",
        formeLetter: "M",
        types: ["Fire", "Dark"],
        baseStats: {
            hp: 97,
            atk: 145,
            def: 119,
            spa: 105,
            spd: 133,
            spe: 101
        },
        abilities: {
            0: "Mold Breaker"
        },
        heightm: 4.1,
        weightkg: 252.7,
        color: "Blue",
        eggGroups: ["Dragon"],
    },
    arosaur: {
        num: 750125,
        species: "Arosaur",
        types: ["Grass", "Steel"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 52,
            atk: 64,
            def: 89,
            spa: 57,
            spd: 67,
            spe: 42
        },
        abilities: {
            0: "Rocky Growth"
        },
        heightm: 0.55,
        weightkg: 33.4,
        color: "Gray",
		  evos: ["lairosaur"],
        eggGroups: ["Monster"],
    },
    lairosaur: {
        num: 750126,
        species: "Lairosaur",
        types: ["Grass", "Steel"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 70,
            atk: 86,
            def: 111,
            spa: 75,
            spd: 75,
            spe: 60
        },
        abilities: {
            0: "Rocky Growth"
        },
        heightm: 0.95,
        weightkg: 66.5,
        color: "Gray",
		  prevo: "arosaur",
		  evoLevel: 24,
		  evos: ["aggrosaur"],
        eggGroups: ["Monster"],
    },
    aggrosaur: {
        num: 750029,
        species: "Aggrosaur",
        types: ["Grass", "Steel"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 85,
            atk: 106,
            def: 141,
            spa: 90,
            spd: 90,
            spe: 75
        },
        abilities: {
            0: "Rocky Growth"
        },
        heightm: 2.05,
        weightkg: 230,
		  prevo: "lairosaur",
		  evoLevel: 37,
        color: "Gray",
		  otherFormes: ["aggrosaurmegav", "aggrosaurmegaa"],
        eggGroups: ["Monster"],
    },
    aggrosaurmegav: {
        num: 750029,
        species: "Aggrosaur-Mega-V",
        baseSpecies: "Aggrosaur",
        forme: "Mega",
        formeLetter: "M",
        types: ["Grass", "Steel"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 85,
            atk: 124,
            def: 181,
            spa: 112,
            spd: 110,
            spe: 75
        },
        abilities: {
            0: "Thick Fat"
        },
        heightm: 2.45,
        weightkg: 285.5,
        color: "Gray",
        eggGroups: ["Monster"],
    },

    aggrosaurmegaa: {
        num: 750029,
        species: "Aggrosaur-Mega-A",
        baseSpecies: "Aggrosaur",
        forme: "Mega",
        formeLetter: "M",
        types: ["Grass", "Steel"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 85,
            atk: 136,
            def: 191,
            spa: 90,
            spd: 110,
            spe: 75
        },
        abilities: {
            0: "Filter"
        },
        heightm: 2.15,
        weightkg: 265,
        color: "Gray",
        eggGroups: ["Monster"],
    },
    squirtroak: {
        num: 750127,
        species: "Squirtroak",
        types: ["Water"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 54,
            atk: 63,
            def: 65,
            spa: 73,
            spd: 65,
            spe: 73
        },
        abilities: {
            0: "Torrent"
        },
        heightm: 0.4,
        weightkg: 8,
        color: "Blue",
		  evos: ["wartoadier"],
        eggGroups: ["Water 1"],
    },
    wartoadier: {
        num: 750128,
        species: "Wartoadier",
        types: ["Water"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 71,
            atk: 78,
            def: 81,
            spa: 89,
            spd: 83,
            spe: 92
        },
        abilities: {
            0: "Torrent"
        },
        heightm: 0.8,
        weightkg: 16.7,
        color: "Blue",
		  prevo: "squirtroak",
		  evoLevel: 16,
		  evos: ["blastinja"],
        eggGroups: ["Water 1"],
    },
    blastinja: {
        num: 750030,
        species: "Blastinja",
        types: ["Water", "Dark"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 90,
            atk: 104,
            def: 98,
            spa: 109,
            spd: 103,
            spe: 115
        },
        abilities: {
            0: "Torrent"
        },
        heightm: 1.55,
        weightkg: 62.7,
		  prevo: "wartoadier",
		  evoLevel: 36,
        color: "Blue",
		  otherFormes: ["blastinjamega"],
        eggGroups: ["Water 1"],
    },
    blastinjamega: {
        num: 750030,
        species: "Blastinja-Mega",
        baseSpecies: "Blastinja",
        forme: "Mega",
        formeLetter: "M",
        types: ["Water", "Dark"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 90,
            atk: 124,
            def: 118,
            spa: 159,
            spd: 113,
            spe: 115
        },
        abilities: {
            0: "Mega Launcher"
        },
        heightm: 1.55,
        weightkg: 78.3,
        color: "Blue",
        eggGroups: ["Water 1"],
    },

    skaria: {
        num: 750031,
        species: "Skaria",
        types: ["Steel", "Dragon"],
        baseStats: {
            hp: 80,
            atk: 85,
            def: 125,
            spa: 65,
            spd: 97,
            spe: 85
        },
        abilities: {
            0: "Pristine"
        },
        heightm: 1.395,
        weightkg: 35.5,
        color: "White",
		  otherFormes: ["skariamega"],
        eggGroups: ["Flying"],
    },
    skariamega: {
        num: 750031,
        species: "Skaria-Mega",
        baseSpecies: "Skaria",
        forme: "Mega",
        formeLetter: "M",
        types: ["Steel", "Fairy"],
        baseStats: {
            hp: 80,
            atk: 125,
            def: 145,
            spa: 105,
            spd: 97,
            spe: 85
        },
        abilities: {
            0: "Pixilate"
        },
        heightm: 1.795,
        weightkg: 35.5,
        color: "White",
        eggGroups: ["Flying"],
    },
    mygara: {
        num: 750129,
        species: "Mygara",
        types: ["Fire", "Psychic"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 40,
            atk: 52,
            def: 31,
            spa: 102,
            spd: 60,
            spe: 101
        },
        abilities: {
            0: "Magical Flame"
        },
        heightm: 0.8,
        weightkg: 20.4,
        color: "Red",
		  evos: ["kadagma"],
        eggGroups: ["Undiscovered"],
    },
    kadagma: {
        num: 750130,
        species: "Kadagma",
        types: ["Fire", "Psychic"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 62,
            atk: 75,
            def: 53,
            spa: 120,
            spd: 87,
            spe: 109
        },
        abilities: {
            0: "Inner Body"
        },
        heightm: 1.3,
        weightkg: 50.5,
        color: "Red",
		  prevo: "mygara",
		  evoLevel: 23,
		  evos: ["magmozam"],
        eggGroups: ["Human-Like"],
    },
    magmozam: {
        num: 750032,
        species: "Magmozam",
        types: ["Fire", "Psychic"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 75,
            atk: 82,
            def: 66,
            spa: 140,
            spd: 105,
            spe: 111
        },
        abilities: {
            0: "Inner Body"
        },
        heightm: 1.55,
        weightkg: 58,
		  prevo: "kadagma",
		  evoLevel: 23,
        color: "Red",
		  otherFormes: ["magmozammega"],
        eggGroups: ["Human-Like"],
    },
    magmozammega: {
        num: 750032,
        species: "Magmozam-Mega",
        baseSpecies: "Magmozam",
        forme: "Mega",
        formeLetter: "M",
        types: ["Fire", "Psychic"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 75,
            atk: 82,
            def: 86,
            spa: 180,
            spd: 115,
            spe: 141
        },
        abilities: {
            0: "Trace"
        },
        heightm: 1.25,
        weightkg: 58,
        color: "Red",
        eggGroups: ["Human-Like"],
    },
    snogepi: {
        num: 750131,
        species: "Snogepi",
        types: ["Fairy", "Ice"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 52,
            atk: 35,
            def: 65,
            spa: 53,
            spd: 65,
            spe: 35
        },
        abilities: {
            0: "Serene Focus"
        },
        heightm: 0.5,
        weightkg: 9.1,
        color: "Gray",
		  evos: ["glakiss"],
        eggGroups: ["Undiscovered"],
    },
    glakiss: {
        num: 750033,
        species: "Glakiss",
        types: ["Fairy", "Ice"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 92,
            atk: 75,
            def: 97,
            spa: 110,
            spd: 107,
            spe: 90
        },
        abilities: {
            0: "Serene Focus"
        },
        heightm: 1.5,
        weightkg: 147.2,
        color: "Gray",
		  prevo: "snogepi",
		  evoLevel: 42,
		  otherFormes: ["glakissmega"],
        eggGroups: ["Undiscovered"],
    },
    glakissmega: {
        num: 750033,
        species: "Glakiss-Mega",
        baseSpecies: "Glakiss",
        forme: "Mega",
        formeLetter: "M",
        types: ["Fairy", "Ice"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 92,
            atk: 115,
            def: 97,
            spa: 150,
            spd: 107,
            spe: 110
        },
        abilities: {
            0: "Refigerate"
        },
        heightm: 1.9,
        weightkg: 240.9,
        color: "Gray",
        eggGroups: ["Fairy"],
    },
    magiranha: {
        num: 750132,
        species: "Magiranha",
        types: ["Water"],
        baseStats: {
            hp: 40,
            atk: 63,
            def: 45,
            spa: 45,
            spd: 25,
            spe: 83
        },
        abilities: {
            0: "Rattling Skin"
        },
        heightm: 0.85,
        weightkg: 15.4,
        color: "Red",
		  evos: ["gyarapedo"],
        eggGroups: ["Water 2"],
    },
    gyarapedo: {
        num: 750034,
        species: "Gyarapedo",
        types: ["Water"],
        baseStats: {
            hp: 92,
            atk: 132,
            def: 69,
            spa: 87,
            spd: 80,
            spe: 98
        },
        abilities: {
            0: "Intimidating Fangs"
        },
        heightm: 4.15,
        weightkg: 161.9,
		  prevo: "magiranha",
		  evoLevel: 25,
        color: "Blue",
		  otherFormes: ["gyarapedomegas", "gyarapedomegag"],
        eggGroups: ["Water 2"],
    },
    gyarapedomegas: {
        num: 750034,
        species: "Gyarapedo-Mega-S",
        baseSpecies: "Gyarapedo",
        forme: "Mega",
        formeLetter: "M",
        types: ["Water"],
        baseStats: {
            hp: 92,
            atk: 152,
            def: 99,
            spa: 102,
            spd: 105,
            spe: 108
        },
        abilities: {
            0: "Strong Jaw"
        },
        heightm: 4.85,
        weightkg: 203.4,
        color: "Blue",
        eggGroups: ["Water 2"],
    },

    gyarapedosmegag: {
        num: 750034,
        species: "Gyarapedo-Mega-G",
        baseSpecies: "Gyarapedo",
        forme: "Mega",
        formeLetter: "M",
        types: ["Water", "Dark"],
        baseStats: {
            hp: 92,
            atk: 162,
            def: 99,
            spa: 97,
            spd: 110,
            spe: 98
        },
        abilities: {
            0: "Mold Breaker"
        },
        heightm: 4.15,
        weightkg: 241.9,
        color: "Blue",
        eggGroups: ["Water 2"],
    },
    growlee: {
        num: 750133,
        species: "Growlee",
        types: ["Normal", "Fire"],
        genderRatio: {
            M: 0.8125,
            F: 0.1875
        },
        baseStats: {
            hp: 62,
            atk: 73,
            def: 62,
            spa: 62,
            spd: 62,
            spe: 62
        },
        abilities: {
            0: "Flash and Adapt"
        },
        heightm: 0.5,
        weightkg: 12.7,
        color: "Brown",
		  evos: ["vapornine", "arceon"],
        eggGroups: ["Field"],
    },
    vapornine: {
        num: 750035,
        species: "Vapornine",
        types: ["Water", "Fire"],
        genderRatio: {
            M: 0.8125,
            F: 0.1875
        },
        baseStats: {
            hp: 120,
            atk: 97,
            def: 80,
            spa: 115,
            spd: 97,
            spe: 90
        },
        abilities: {
            0: "Intimidating Absorption"
        },
        heightm: 1.45,
        weightkg: 92,
		  prevo: "growlee",
		  evoLevel: 1,
        color: "Blue",
        eggGroups: ["Field"],
    },
    pidgetot: {
        num: 750036,
        species: "Pidgetot",
        types: ["Normal", "Flying"],
        baseStats: {
            hp: 94,
            atk: 87,
            def: 75,
            spa: 96,
            spd: 71,
            spe: 111
        },
        abilities: {
            0: "Big Pecks"
        },
        heightm: 1.005,
        weightkg: 20.7,
        color: "Brown",
		  otherFormes: ["pidgetotmega"],
        eggGroups: ["Flying"],
    },
    pidgetotmega: {
        num: 750036,
        species: "Pidgetot-Mega",
        baseSpecies: "Pidgetot",
        forme: "Mega",
        formeLetter: "M",
        types: ["Normal", "Flying"],
        baseStats: {
            hp: 94,
            atk: 87,
            def: 80,
            spa: 161,
            spd: 81,
            spe: 131
        },
        abilities: {
            0: "No Guard"
        },
        heightm: 1.705,
        weightkg: 31.7,
        color: "Brown",
        eggGroups: ["Flying"],
    },
    goracanion: {
        num: 750037,
        species: "Goracanion",
        types: ["Fire", "Water"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 67,
            atk: 97,
            def: 112,
            spa: 140,
            spd: 90,
            spe: 75
        },
        abilities: {
            0: "Swift Absorb"
        },
        heightm: 1.75,
        weightkg: 108.8,
        color: "Red",
        eggGroups: ["Undiscovered"],
    },
    klinklazor: {
        num: 750038,
        species: "Klinklazor",
        types: ["Bug", "Steel"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 85,
            atk: 125,
            def: 107,
            spa: 62,
            spd: 87,
            spe: 82
        },
        abilities: {
            0: "Math Surge"
        },
        heightm: 1.205,
        weightkg: 99.5,
        color: "Gray",
		  otherFormes: ["klazormega"],
        eggGroups: ["Undiscovered"],
    },
    klinklazormega: {
        num: 750038,
        species: "Klinklazor-Mega",
        baseSpecies: "Klinklazor",
        forme: "Mega",
        formeLetter: "M",
        types: ["Bug", "Steel"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 85,
            atk: 145,
            def: 147,
            spa: 72,
            spd: 107,
            spe: 92
        },
        abilities: {
            0: "Technician"
        },
        heightm: 1.4,
        weightkg: 106.5,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    pidgeyu: {
        num: 750135,
        species: "Pidgeyu",
        types: ["Water", "Normal"],
        baseStats: {
            hp: 40,
            atk: 45,
            def: 50,
            spa: 60,
            spd: 49,
            spe: 80
        },
        abilities: {
            0: "Natural Eye"
        },
        heightm: 0.55,
        weightkg: 18.1,
        color: "Brown",
		  evos: ["pidgemie"],
        eggGroups: ["Undiscovered"],
    },
    pidgemie: {
        num: 750039,
        species: "Pidgemie",
        types: ["Water", "Normal"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 84,
            atk: 77,
            def: 80,
            spa: 95,
            spd: 80,
            spe: 122
        },
        abilities: {
            0: "Natural Eye"
        },
        heightm: 1.295,
        weightkg: 59.7,
        color: "Purple",
		  otherFormes: ["pidgemiemega"],
        eggGroups: ["Undiscovered"],
    },
    pidgemiemega: {
        num: 750039,
        species: "Pidgemie-Mega",
        baseSpecies: "Pidgemie",
        forme: "Mega",
        formeLetter: "M",
        types: ["Water", "Normal"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 84,
            atk: 77,
            def: 85,
            spa: 160,
            spd: 90,
            spe: 142
        },
        abilities: {
            0: "No Guard"
        },
        heightm: 1.995,
        weightkg: 70.7,
        color: "Purple",
        eggGroups: ["Undiscovered"],
    },
    porywick: {
        num: 750136,
        species: "Porywick",
        types: ["Normal", "Ghost"],
        gender: "N",
        baseStats: {
            hp: 57,
            atk: 45,
            def: 67,
            spa: 85,
            spd: 70,
            spe: 40
        },
        abilities: {
            0: "Hot Copy"
        },
        heightm: 0.55,
        weightkg: 19.8,
        color: "White",
		  evos: ["lampory"],
        eggGroups: ["Undiscovered"],
    },
    lampory: {
        num: 750137,
        species: "Lampory",
        types: ["Normal", "Ghost"],
        gender: "N",
        baseStats: {
            hp: 82,
            atk: 60,
            def: 77,
            spa: 108,
            spd: 77,
            spe: 77
        },
        abilities: {
            0: "Flame Essence"
        },
        heightm: 0.6,
        weightkg: 22.7,
        color: "Black",
		  prevo: "porywick",
		  evoLevel: 41,
		  evos: ["porylure"],
        eggGroups: ["Undiscovered"],
    },
    porylure: {
        num: 750040,
        species: "Porylure",
        types: ["Normal", "Ghost"],
        gender: "N",
        baseStats: {
            hp: 82,
            atk: 67,
            def: 82,
            spa: 148,
            spd: 82,
            spe: 105
        },
        abilities: {
            0: "Flame Essence"
        },
        heightm: 0.95,
        weightkg: 34.1,
		  prevo: "lampory",
		  evoLevel: 41,
        color: "Black",
        eggGroups: ["Undiscovered"],
    },
    starchop: {
        num: 750138,
        species: "Starchop",
        types: ["Water", "Fighting"],
        gender: "N",
        baseStats: {
            hp: 55,
            atk: 72,
            def: 52,
            spa: 60,
            spd: 47,
            spe: 65
        },
        abilities: {
            0: "Natural Guard"
        },
        heightm: 0.8,
        weightkg: 27,
        color: "Brown",
		  evos: ["starchamp"],
        eggGroups: ["Undiscovered"],
    },
    starchamp: { //Starchamp	Starmie	Machamp	Water	Fighting	75	122	82	82	85	105	551	Natural Guard
        num: 750041,
        species: "Starchamp",
        types: ["Water", "Fighting"],
        gender: "N",
        baseStats: {
            hp: 75,
            atk: 122,
            def: 82,
            spa: 82,
            spd: 85,
            spe: 105
        },
        abilities: {
            0: "Natural Guard"
        },
        heightm: 1.35,
        weightkg: 105,
		  prevo: "starchop",
		  evoLevel: 25,
        color: "Purple",
        eggGroups: ["Undiscovered"],
    },
    grimo: {
        num: 750139,
        species: "Grimo",
        types: ["Electric", "Poison"],
        baseStats: {
            hp: 70,
            atk: 80,
            def: 52,
            spa: 47,
            spd: 52,
            spe: 47
        },
        abilities: {
            0: "Sticky Float"
        },
        heightm: 0.55,
        weightkg: 15.1,
        color: "Purple",
		  evos: ["eek"],
        eggGroups: ["Amorphous"],
    },
      eek: {
        num: 750042,
        species: "Eek",
        types: ["Electric", "Poison"],
        baseStats: {
            hp: 105,
            atk: 120,
            def: 87,
            spa: 95,
            spd: 100,
            spe: 60
        },
        abilities: {
            0: "Sticky Float"
        },
        heightm: 1.65,
        weightkg: 55.2,
		  prevo: "grimo",
		  evoLevel: 38,
        color: "Purple",
        eggGroups: ["Amorphous"],
    },
    hitachi: {
        num: 750043,
        species: "Hitachi",
        types: ["Fire", "Steel"],
        gender: "N",
        baseStats: {
            hp: 95,
            atk: 95,
            def: 113,
            spa: 130,
            spd: 113,
            spe: 81
        },
        abilities: {
            0: "Serene Fire"
        },
        heightm: 1,
        weightkg: 215.5,
        color: "Yellow",
        eggGroups: ["Undiscovered"],
    },
    shaymizard: {
        num: 750044,
        species: "Shaymizard",
        types: ["Fire", "Grass"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 89,
            atk: 102,
            def: 89,
            spa: 114,
            spd: 92,
            spe: 120
        },
        abilities: {
            0: "Healing Blaze"
        },
        heightm: 0.95,
        weightkg: 46.3,
        color: "Green",
		  otherFormes: ["shaymizardmegax", "shaymizardmegay"],
        eggGroups: ["Undiscovered"],
    },
    shaymizardmegax: {
        num: 750044,
        species: "Shaymizard-Mega-X",
        baseSpecies: "Shaymizard",
        forme: "Mega-X",
        formeLetter: "M",
        types: ["Fire", "Dragon"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 89,
            atk: 148,
            def: 122,
            spa: 135,
            spd: 92,
            spe: 120
        },
        abilities: {
            0: "Tough Claws"
        },
        heightm: 1.8,
        weightkg: 105.5,
        color: "Green",
        eggGroups: ["Undiscovered"],
    },
    shaymizardmegay: {
        num: 750044,
        species: "Shaymizard-Mega-Y",
        baseSpecies: "Shaymizard",
        forme: "Mega-Y",
        formeLetter: "M",
        types: ["Fire", "Grass"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 89,
            atk: 122,
            def: 89,
            spa: 164,
            spd: 122,
            spe: 120
        },
        abilities: {
            0: "Drought"
        },
        heightm: 1.8,
        weightkg: 105.5,
        color: "Green",
        eggGroups: ["Undiscovered"],
    },
    ferroedge: {
        num: 750140,
        species: "Ferroedge",
        types: ["Steel", "Grass"],
        baseStats: {
            hp: 55,
            atk: 80,
            def: 100,
            spa: 34,
            spd: 70,
            spe: 24
        },
        abilities: {
            0: "Barb Guard"
        },
        heightm: 0.7,
        weightkg: 10.4,
        color: "Brown",
		  evos: ["ferroslash"],
        eggGroups: ["Mineral"],
    },
    ferroslash: {
        num: 750045,
        species: "Ferroslash",
		  baseForme: "Shield",
        types: ["Steel", "Grass"],
        baseStats: {
            hp: 77,
            atk: 82,
            def: 150,
            spa: 62,
            spd: 133,
            spe: 50
        },
        abilities: {
            0: "Barb Stance"
        },
        heightm: 1.345,
        weightkg: 81.5,
		  prevo: "ferroedge",
		  evoLevel: 37,
        color: "Brown",
        eggGroups: ["Mineral"],
    },
    ferroslashblade: {
        num: 750045,
        species: "Ferroslash-Blade",
        baseSpecies: "Ferroslash",
        forme: "Blade",
        formeLetter: "M",
        types: ["Steel", "Grass"],
        baseStats: {
            hp: 77,
            atk: 150,
            def: 82,
            spa: 133,
            spd: 62,
            spe: 50
        },
        abilities: {
            0: "Barb Stance"
        },
        heightm: 1.345,
        weightkg: 81.5,
        color: "Brown",
        eggGroups: ["Mineral"],
    },
    chaxe: {
        num: 750141,
        species: "Chaxe",
        types: ["Fire", "Dragon"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 47,
            atk: 83,
            def: 56,
            spa: 55,
            spd: 50,
            spe: 72
        },
        abilities: {
            0: "Power-Up Pinch"
        },
        heightm: 0.6,
        weightkg: 13.2,
        color: "Red",
		  evos: ["fraxuleon"],
        eggGroups: ["Monster", "Dragon"],
    },
    fraxuleon: {
        num: 750142,
        species: "Fraxuleon",
        types: ["Fire", "Dragon"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 72,
            atk: 100,
            def: 74,
            spa: 70,
            spd: 67,
            spe: 83
        },
        abilities: {
            0: "Power-Up Pinch"
        },
        heightm: 1.05,
        weightkg: 27.5,
		  prevo: "chaxe",
		  evoLevel: 27,
        color: "Red",
		  evos: ["hazard"],
        eggGroups: ["Monster", "Dragon"],
    },
    hazard: {
        num: 750046,
        species: "Hazard",
        types: ["Fire", "Dragon"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 87,
            atk: 125,
            def: 94,
            spa: 94,
            spd: 82,
            spe: 108
        },
        abilities: {
            0: "Power-up Pinch"
        },
        heightm: 1.75,
        weightkg: 98,
		  prevo: "fraxuleon",
		  evoLevel: 42,
        color: "Red",
		  otherFormes: ["hazardmegax", "hazardmegay"],
        eggGroups: ["Monster", "Dragon"],
    },
    hazardmegax: {
        num: 750046,
        species: "Hazard-Mega-X",
        baseSpecies: "Hazard",
        forme: "Mega-X",
        formeLetter: "M",
        types: ["Fire", "Dragon"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 87,
            atk: 171,
            def: 127,
            spa: 115,
            spd: 82,
            spe: 108
        },
        abilities: {
            0: "Tough Claws"
        },
        heightm: 1.75,
        weightkg: 118,
        color: "Black",
        eggGroups: ["Monster", "Dragon"],
    },
    hazardmegay: {
        num: 750046,
        species: "Hazard-Mega-Y",
        baseSpecies: "Hazard",
        forme: "Mega-Y",
        formeLetter: "M",
        types: ["Fire", "Dragon"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 87,
            atk: 145,
            def: 94,
            spa: 144,
            spd: 112,
            spe: 108
        },
        abilities: {
            0: "Drought"
        },
        heightm: 1.75,
        weightkg: 108,
        color: "Red",
        eggGroups: ["Monster", "Dragon"],
    },
    tyklink: {
        num: 750143,
        species: "Tyklink",
        types: ["Steel", "Fighting"],
        gender: "N",
        baseStats: {
            hp: 47,
            atk: 83,
            def: 56,
            spa: 55,
            spd: 50,
            spe: 72
        },
        abilities: {
            0: "Super Guts"
        },
        heightm: 0.5,
        weightkg: 21,
        color: "Purple",
		  evos: ["hitmonklang"],
        eggGroups: ["Undiscovered"],
    },
    hitmonklang: {
        num: 750047,
        species: "Hitmonklang",
        types: ["Steel", "Fighting"],
        gender: "N",
        baseStats: {
            hp: 55,
            atk: 115,
            def: 110,
            spa: 52,
            spd: 105,
            spe: 90
        },
        abilities: {
            0: "Electrotechnic"
        },
        heightm: 1.005,
        weightkg: 64.5,
		  prevo: "tyklink",
		  evoLevel: 32,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    inkduck: {
        num: 750144,
        species: "Inkduck",
        types: ["Water", "Dark"],
        baseStats: {
            hp: 60,
            atk: 65,
            def: 55,
            spa: 65,
            spd: 53,
            spe: 55
        },
        abilities: {
            0: "Atmospheric Perversion"
        },
        heightm: 0.6,
        weightkg: 11.5,
        color: "Blue",
		  evos: ["maladuck"],
        eggGroups: ["Water 1"],
    },
    maladuck: {
        num: 750048,
        species: "Maladuck",
        types: ["Water", "Dark"],
        baseStats: {
            hp: 93,
            atk: 97,
            def: 93,
            spa: 91,
            spd: 87,
            spe: 89
        },
        abilities: {
            0: "Atmospheric Perversion"
        },
        heightm: 1.6,
        weightkg: 61.8,
		  prevo: "inkduck",
		  evoLevel: 32,
        color: "Blue",
        eggGroups: ["Water 1"],
    },
    yangarde: {
        num: 750049,
        species: "Yangarde",
        types: ["Dragon", "Bug"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 97,
            atk: 111,
            def: 118,
            spa: 98,
            spd: 85,
            spe: 95
        },
        abilities: {
            0: "Speed Break"
        },
        heightm: 3.455,
        weightkg: 178.2,
        color: "Green",
        eggGroups: ["Undiscovered"],
    },
    suirizion: {
        num: 750050,
        species: "Suirizion",
        types: ["Grass", "Water"],
        gender: "N",
        baseStats: {
            hp: 104,
            atk: 82,
            def: 100,
            spa: 110,
            spd: 122,
            spe: 100
        },
        abilities: {
            0: "Justice Power"
        },
        heightm: 2.01,
        weightkg: 193.5,
        color: "Green",
        eggGroups: ["Undiscovered"],
    },
    raillish: {
        num: 750145,
        species: "Raillish",
        types: ["Ghost", "Fairy"],
        baseStats: {
            hp: 55,
            atk: 45,
            def: 50,
            spa: 75,
            spd: 70,
            spe: 50
        },
        abilities: {
            0: "Cursed Trace"
        },
        heightm: 0.8,
        weightkg: 19.8,
		  evos: ["jellivoir"],
        color: "White",
        eggGroups: ["Amorphous"],
    },
    jellivoir: {
        num: 750051,
        species: "Jellivoir",
        types: ["Ghost", "Fairy"],
        baseStats: {
            hp: 94,
            atk: 72,
            def: 77,
            spa: 115,
            spd: 120,
            spe: 80
        },
        abilities: {
            0: "Cursed Trace"
        },
        heightm: 1.905,
        weightkg: 91.7,
		  prevo: "raillish",
		  evoLevel: 32,
        color: "White",
		  otherFormes: ["jellivoirmega"],
        eggGroups: ["Undiscovered"],
    },
    jellivoirmega: {
        num: 750051,
        species: "Jellivoir-Mega",
        baseSpecies: "Jellivoir",
        forme: "Mega",
        formeLetter: "M",
        types: ["Ghost", "Fairy"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 94,
            atk: 92,
            def: 77,
            spa: 155,
            spd: 140,
            spe: 100
        },
        abilities: {
            0: "Pixilate"
        },
        heightm: 1.905,
        weightkg: 91.7,
        color: "White",
        eggGroups: ["Amorphous"],
    },
    babelum: {
        num: 750146,
        species: "Babelum",
        types: ["Steel", "Flying"],
        baseStats: {
            hp: 50,
            atk: 52,
            def: 57,
            spa: 32,
            spd: 60,
            spe: 50
        },
        abilities: {
            0: "Clear Focus"
        },
        heightm: 0.7,
        weightkg: 51.3,
		  evos: ["angol"],
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
    angol: {
        num: 750147,
        species: "Angol",
        types: ["Steel", "Flying"],
        baseStats: {
            hp: 67,
            atk: 97,
            def: 95,
            spa: 60,
            spd: 77,
            spe: 80
        },
        abilities: {
            0: "Clear Focus"
        },
        heightm: 0.7,
        weightkg: 128.7,
		  prevo: "babelum",
		  evoLevel: 21,
		  evos: ["metabat"],
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
    metabat: {
        num: 750052,
        species: "Metabat",
        types: ["Steel", "Flying"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 82,
            atk: 132,
            def: 115,
            spa: 82,
            spd: 85,
            spe: 110
        },
        abilities: {
            0: "Clear Focus"
        },
        heightm: 1.7,
        weightkg: 312.5,
		  prevo: "babelum",
		  evoLevel: 45,
        color: "Purple",
		  otherFormes: ["metabatmega"],
        eggGroups: ["Undiscovered"],
    },
    metabatmega: {
        num: 750052,
        species: "Metabat-Mega",
        baseSpecies: "Metabat",
        forme: "Mega",
        formeLetter: "M",
        types: ["Steel", "Flying"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 82,
            atk: 142,
            def: 135,
            spa: 92,
            spd: 105,
            spe: 150
        },
        abilities: {
            0: "Tough Claws"
        },
        heightm: 2.6,
        weightkg: 705.4,
        color: "Purple",
        eggGroups: ["Undiscovered"],
    },
    dartios: {
        num: 750053,
        species: "Dartios",
        types: ["Fire", "Dragon"],
        gender: "M",
        baseStats: {
            hp: 100,
            atk: 130,
            def: 70,
            spa: 80,
            spd: 85,
            spe: 113
        },
        abilities: {
            0: "Sheer Flight"
        },
        heightm: 1.655,
        weightkg: 76.4,
        color: "Red",
		  otherFormes: ["dartiosmega"],
        eggGroups: ["Undiscovered"],
    },
    dartiosmega: {
        num: 750053,
        species: "Dartios-Mega",
        baseSpecies: "Dartios",
        forme: "Mega",
        formeLetter: "M",
        types: ["Fire", "Dragon"],
        gender: "M",
        baseStats: {
            hp: 100,
            atk: 170,
            def: 90,
            spa: 110,
            spd: 95,
            spe: 133
        },
        abilities: {
            0: "Levitate"
        },
        heightm: 1.955,
        weightkg: 86.4,
        color: "Red",
        eggGroups: ["Undiscovered"],
    },
    grenheatja: {
        num: 750054,
        species: "Grenheatja",
        types: ["Water", "Fire"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 81,
            atk: 92,
            def: 92,
            spa: 126,
            spd: 92,
            spe: 119
        },
        abilities: {
            0: "Evaporation"
        },
        heightm: 1.6,
        weightkg: 235,
        color: "Brown",
        eggGroups: ["Undiscovered"],
    },
    moltie: {
        num: 750055,
        species: "Moltie",
        types: ["Fairy", "Fire"],
        gender: "N",
        baseStats: {
            hp: 90,
            atk: 100,
            def: 120,
            spa: 120,
            spd: 120,
            spe: 79
        },
        abilities: {
            0: "Calamity"
        },
        heightm: 1.36,
        weightkg: 34.4,
        color: "Pink",
		  otherFormes: ["moltiemega"],
        eggGroups: ["Undiscovered"],
    },
    moltiemega: {
        num: 750055,
        species: "Moltie-Mega",
        baseSpecies: "Moltie",
        forme: "Mega",
        formeLetter: "M",
        types: ["Fairy", "Fire"],
        gender: "N",
        baseStats: {
            hp: 90,
            atk: 160,
            def: 80,
            spa: 180,
            spd: 100,
            spe: 139
        },
        abilities: {
            0: "Magic Bounce"
        },
        heightm: 1.76,
        weightkg: 53.4,
        color: "Pink",
        eggGroups: ["Undiscovered"],
    },
    belpet: {
        num: 750148,
        species: "Belpet",
        types: ["Ghost", "Steel"],
        baseStats: {
            hp: 42,
            atk: 75,
            def: 59,
            spa: 49,
            spd: 49,
            spe: 52
        },
        abilities: {
            0: "Hard Body"
        },
        heightm: 0.6,
        weightkg: 48.7,
		  evos: ["banegross"],
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
    banegross: {
        num: 750056,
        species: "Banegross",
        types: ["Ghost", "Steel"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 72,
            atk: 135,
            def: 97,
            spa: 89,
            spd: 86,
            spe: 87
        },
        abilities: {
            0: "Hard Body"
        },
        heightm: 1.345,
        weightkg: 281.2,
		  prevo: "belpet",
		  evoLevel: 35,
        color: "Blue",
		  otherFormes: ["banegrossmegax", "banegrossmegay"],
        eggGroups: ["Undiscovered"],
    },
    banegrossmegax: {
        num: 750056,
        species: "Banegross-Mega-X",
        baseSpecies: "Banegross",
        forme: "Mega-X",
        formeLetter: "M",
        types: ["Ghost", "Steel"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 72,
            atk: 145,
            def: 117,
            spa: 99,
            spd: 106,
            spe: 127
        },
        abilities: {
            0: "Tough Claws"
        },
        heightm: 2.245,
        weightkg: 674.1,
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
    banegrossmegay: {
        num: 750056,
        species: "Banegross-Mega-Y",
        baseSpecies: "Banegross",
        forme: "Mega-Y",
        formeLetter: "M",
        types: ["Ghost", "Steel"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 72,
            atk: 185,
            def: 107,
            spa: 99,
            spd: 106,
            spe: 97
        },
        abilities: {
            0: "Prankster"
        },
        heightm: 1.445,
        weightkg: 281.7,
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
    herasir: {
        num: 750057,
        species: "Herasir",
        types: ["Fighting", "Bug"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 82,
            atk: 135,
            def: 97,
            spa: 57,
            spd: 92,
            spe: 95
        },
        abilities: {
            0: "Gut Breaker"
        },
        heightm: 1.5,
        weightkg: 54.5,
        color: "Blue",
		  otherFormes: ["herasirmegah", "herasirmegap"],
        eggGroups: ["Bug"],
    },
    herasirmegah: {
        num: 750057,
        species: "Herasir-Mega-H",
        baseSpecies: "Herasir",
        forme: "Mega-H",
        formeLetter: "M",
        types: ["Fighting", "Bug"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 82,
            atk: 195,
            def: 137,
            spa: 57,
            spd: 102,
            spe: 85
        },
        abilities: {
            0: "Skill Link"
        },
        heightm: 1.7,
        weightkg: 63,
        color: "Blue",
        eggGroups: ["Bug"],
    },
    herasirmegap: {
        num: 750057,
        species: "Herasir-Mega-P",
        baseSpecies: "Herasir",
        forme: "Mega-P",
        formeLetter: "M",
        types: ["Fighting", "Bug"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 82,
            atk: 155,
            def: 117,
            spa: 67,
            spd: 102,
            spe: 115
        },
        abilities: {
            0: "Aerilate"
        },
        heightm: 1.7,
        weightkg: 58.5,
        color: "Blue",
        eggGroups: ["Bug"],
    },
    misdreavalts: {
        num: 750149,
        species: "Misdreavalts",
        types: ["Fairy", "Ghost"],
        baseStats: {
            hp: 49,
            atk: 47,
            def: 47,
            spa: 80,
            spd: 65,
            spe: 77
        },
        abilities: {
            0: "Synchofloat"
        },
        heightm: 0.55,
        weightkg: 3.8,
		  evos: ["mismagivoir"],
        color: "White",
        eggGroups: ["Amorphous"],
    },
    mismagivoir: {
        num: 750058,
        species: "Mismagivoir",
        types: ["Fairy", "Ghost"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 74,
            atk: 72,
            def: 72,
            spa: 125,
            spd: 120,
            spe: 102
        },
        abilities: {
            0: "Synchofloat"
        },
        heightm: 1.245,
        weightkg: 26.4,
		  prevo: "misdreavalts",
		  evoLevel: 25,
        color: "Purple",
		  otherFormes: ["mismagivoirmega"],
        eggGroups: ["Undiscovered"],
    },
    mismagivoirmega: {
        num: 750058,
        species: "Mismagivoir-Mega",
        baseSpecies: "Mismagivoir",
        forme: "Mega",
        formeLetter: "M",
        types: ["Ghost", "Fairy"],
        baseStats: {
            hp: 74,
            atk: 92,
            def: 92,
            spa: 165,
            spd: 140,
            spe: 122
        },
        abilities: {
            0: "Pixilate"
        },
        heightm: 1.245,
        weightkg: 26.4,
        color: "Purple",
        eggGroups: ["Amorphous"],
    },
    harem: {
        num: 750059,
        species: "Harem",
        types: ["Dragon", "Ice"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 100,
            atk: 158,
            def: 90,
            spa: 110,
            spd: 80,
            spe: 101
        },
        abilities: {
            0: "Overwhelming Presence"
        },
        heightm: 2.4,
        weightkg: 215.2,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    mana: {
        num: 750060,
        species: "Mana",
        types: ["Ghost", "Electric"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 75,
            atk: 92,
            def: 80,
            spa: 127,
            spd: 95,
            spe: 107
        },
        abilities: {
            0: "Magician's Wand"
        },
        heightm: 1.005,
        weightkg: 24.6,
        color: "Yellow",
		  otherFormes: ["manamega"],
        eggGroups: ["Undiscovered"],
    },
    manamega: {
        num: 750060,
        species: "Mana-Mega",
        baseSpecies: "Mana",
        forme: "Mega",
        formeLetter: "M",
        types: ["Ghost", "Electric"],
        baseStats: {
            hp: 75,
            atk: 92,
            def: 100,
            spa: 157,
            spd: 115,
            spe: 137
        },
        abilities: {
            0: "Intimidate"
        },
        heightm: 1.5,
        weightkg: 90,
        color: "Yellow",
        eggGroups: ["Undiscovered"],
    },
    lucharama: {
        num: 750061,
        species: "Lucharama",
        types: ["Fighting", "Flying"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 121,
            atk: 116,
            def: 77,
            spa: 67,
            spd: 71,
            spe: 94
        },
        abilities: {
            0: "Clean Match"
        },
        heightm: 1.55,
        weightkg: 137.6,
        color: "Red",
        eggGroups: ["Undiscovered"],
    },
    klip: {
        num: 750150,
        species: "Klip",
        types: ["Water", "Steel"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 45,
            atk: 77,
            def: 60,
            spa: 42,
            spd: 55,
            spe: 50
        },
        abilities: {
            0: "Currential Disruption"
        },
        heightm: 0.35,
        weightkg: 14.3,
		  evos: ["klomp"],
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    klomp: {
        num: 750151,
        species: "Klomp",
        types: ["Water", "Steel"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 70,
            atk: 102,
            def: 85,
            spa: 68,
            spd: 80,
            spe: 56
        },
        abilities: {
            0: "Positive Growth"
        },
        heightm: 0.65,
        weightkg: 39.5,
		  evos: ["swank"],
		  prevo: "klip",
		  evoLevel: 27,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    swank: {
        num: 750062,
        species: "Swank",
        types: ["Water", "Steel"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 85,
            atk: 125,
            def: 105,
            spa: 80,
            spd: 90,
            spe: 81
        },
        abilities: {
            0: "Positive Growth"
        },
        heightm: 1.055,
        weightkg: 81.4,
		  prevo: "klomp",
		  evoLevel: 42,
        color: "Gray",
		  otherFormes: ["swankmega"],
        eggGroups: ["Undiscovered"],
    },
    swankmega: {
        num: 750062,
        species: "Swank-Mega",
        baseSpecies: "Swank",
        forme: "Mega",
        formeLetter: "M",
        types: ["Water", "Steel"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 85,
            atk: 165,
            def: 125,
            spa: 90,
            spd: 110,
            spe: 91
        },
        abilities: {
            0: "Swift Swim"
        },
        heightm: 1.455,
        weightkg: 101.5,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    casting: {
        num: 750063,
        species: "Casting",
        types: ["Poison", "Normal"],
        baseStats: {
            hp: 78,
            atk: 90,
            def: 105,
            spa: 88,
            spd: 80,
            spe: 75
        },
        abilities: {
            0: "Monsoon"
        },
        heightm: 0.745,
        weightkg: 5.1,
        color: "Gray",
        eggGroups: ["Amorphous"],
        otherFormes: ["castingsunny", "castingrainy", "castingsnowy"],
    },
    castingsunny: {
        num: 750063,
        species: "Casting-Sunny",
        baseSpecies: "Casting",
        forme: "Sunny",
        formeLetter: "S",
        types: ["Poison", "Fire"],
        baseStats: {
            hp: 78,
            atk: 90,
            def: 105,
            spa: 88,
            spd: 80,
            spe: 75
        },
        abilities: {
            0: "Monsoon"
        },
        heightm: 0.745,
        weightkg: 5.1,
        color: "Red",
        eggGroups: ["Amorphous"],
    },
    castingrainy: {
        num: 750063,
        species: "Casting-Rainy",
        baseSpecies: "Casting",
        forme: "Rainy",
        formeLetter: "R",
        types: ["Poison", "Water"],
        baseStats: {
            hp: 78,
            atk: 90,
            def: 105,
            spa: 88,
            spd: 80,
            spe: 75
        },
        abilities: {
            0: "Monsoon"
        },
        heightm: 0.745,
        weightkg: 5.1,
        color: "Blue",
        eggGroups: ["Amorphous"],
    },
    castingsnowy: {
        num: 750063,
        species: "Casting-Snowy",
        baseSpecies: "Casting",
        forme: "Snowy",
        formeLetter: "S",
        types: ["Poison", "Ice"],
        baseStats: {
            hp: 78,
            atk: 90,
            def: 105,
            spa: 88,
            spd: 80,
            spe: 75
        },
        abilities: {
            0: "Monsoon"
        },
        heightm: 0.745,
        weightkg: 5.1,
        color: "White",
        eggGroups: ["Amorphous"],
    },
    sablemimez: {
        num: 750064,
        species: "Sablemimez",
        types: ["Ghost", "Fairy"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 55,
            atk: 70,
            def: 80,
            spa: 92,
            spd: 102,
            spe: 80
        },
        abilities: {
            0: "Slow 'n' Steady"
        },
        heightm: 0.905,
        weightkg: 32.7,
        color: "Purple",
		  otherFormes: ["sablemimezmega"],
        eggGroups: ["Human-Like"],
    },
    sablemimezmega: {
        num: 750064,
        species: "Sablemimez-Mega",
        baseSpecies: "Sablemimez",
        forme: "Mega",
        formeLetter: "M",
        types: ["Ghost", "Fairy"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 55,
            atk: 80,
            def: 130,
            spa: 112,
            spd: 152,
            spe: 50
        },
        abilities: {
            0: "Magic Bounce"
        },
        heightm: 0.905,
        weightkg: 182.7,
        color: "Purple",
        eggGroups: ["Human-Like"],
    },
    aegilene: {
        num: 750065,
        species: "Aegilene",
		  baseForme: "Shield",
        types: ["Steel", "Bug"],
        gender: "N",
        baseStats: {
            hp: 65,
            atk: 85,
            def: 132,
            spa: 85,
            spd: 132,
            spe: 99
        },
        abilities: {
            0: "Error Macro"
        },
        heightm: 1.6,
        weightkg: 67.7,
        color: "Brown",
		  otherFormes: ["aegilineblade"],
        eggGroups: ["Undiscovered"],
    },
	    aegileneblade: {
        num: 750066,
        species: "Aegilene-Blade",
        baseSpecies: "Aegilene",
        forme: "Blade",
        formeLetter: "B",
        types: ["Steel", "Bug"],
        gender: "N",
        baseStats: {
            hp: 65,
            atk: 132,
            def: 85,
            spa: 132,
            spd: 85,
            spe: 99
        },
        abilities: {
            0: "Error Macro"
        },
        heightm: 1.6,
        weightkg: 67.7,
        color: "Brown",
        eggGroups: ["Undiscovered"],
    },
    houndlion: {
        num: 750066,
        species: "Houndlion",
        types: ["Dark", "Steel"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 83,
            atk: 90,
            def: 98,
            spa: 120,
            spd: 76,
            spe: 112
        },
        abilities: {
            0: "Justified Fire"
        },
        heightm: 1.755,
        weightkg: 142.5,
        color: "Black",
		  otherFormes: ["houndlionmega"],
        eggGroups: ["Undiscovered"],
    },
    houndlionmega: {
        num: 750066,
        species: "Houndlion-Mega",
        baseSpecies: "Houndlion",
        forme: "Mega",
        formeLetter: "M",
        types: ["Dark", "Steel"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 83,
            atk: 90,
            def: 138,
            spa: 150,
            spd: 86,
            spe: 132
        },
        abilities: {
            0: "Solar Power"
        },
        heightm: 2.255,
        weightkg: 158,
        color: "Black",
        eggGroups: ["Undiscovered"],
    },
    loppeye: {
        num: 750067,
        species: "Loppeye",
        types: ["Ghost", "Normal"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 67,
            atk: 85,
            def: 89,
            spa: 69,
            spd: 91,
            spe: 87
        },
        abilities: {
            0: "Late Bloomer"
        },
        heightm: 0.85,
        weightkg: 22.1,
        color: "Purple",
		  otherFormes: ["loppeyemegax", "loppeyemegay"],
        eggGroups: ["Human-Like"],
    },


    loppeyemegax: {
        num: 750067,
        species: "Loppeye-Mega-X",
        baseSpecies: "Loppeye",
        forme: "Mega-X",
        formeLetter: "M",
        types: ["Ghost", "Normal"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 67,
            atk: 95,
            def: 139,
            spa: 89,
            spd: 141,
            spe: 57
        },
        abilities: {
            0: "Magic Bounce"
        },
        heightm: 0.85,
        weightkg: 172.1,
        color: "Purple",
        eggGroups: ["Human-Like"],
    },
    loppeyemegay: {
        num: 750067,
        species: "Loppeye-Mega-Y",
        baseSpecies: "Loppeye",
        forme: "Mega-Y",
        formeLetter: "M",
        types: ["Ghost", "Fighting"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 67,
            atk: 145,
            def: 99,
            spa: 69,
            spd: 91,
            spe: 117
        },
        abilities: {
            0: "Scrappy"
        },
        heightm: 0.95,
        weightkg: 17.1,
        color: "Purple",
        eggGroups: ["Human-Like"],
    },
    slowdon: {
        num: 750152,
        species: "Slowdon",
        types: ["Water", "Steel"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 70,
            atk: 102,
            def: 85,
            spa: 68,
            spd: 80,
            spe: 56
        },
        abilities: {
            0: "Resuscitate"
        },
        heightm: 0.85,
        weightkg: 46.5,
        color: "Gray",
		  evos: ["bastioking"],
        eggGroups: ["Monster"],
    },
    bastioking: {
        num: 750068,
        species: "Bastioking",
        types: ["Water", "Steel"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 88,
            atk: 74,
            def: 134,
            spa: 84,
            spd: 134,
            spe: 40
        },
        abilities: {
            0: "Sturdy Tempo"
        },
        heightm: 1.655,
        weightkg: 114.5,
		  prevo: "slowdon",
		  evoLevel: 30,
        color: "Gray",
        eggGroups: ["Monster"],
    },
    peatran: {
        num: 750069,
        species: "Peatran",
        types: ["Fire", "Flying"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 87,
            atk: 85,
            def: 90,
            spa: 120,
            spd: 88,
            spe: 109
        },
        abilities: {
            0: "Tangled Flames"
        },
        heightm: 1.6,
        weightkg: 234.7,
        color: "Red",
        eggGroups: ["Undiscovered"],
        otherFormes: ["peatranmega"],
    },
    peatranmega: {
        num: 750069,
        species: "Peatran-Mega",
        baseSpecies: "Peatran",
        forme: "Mega",
        formeLetter: "M",
        types: ["Fire", "Flying"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 87,
            atk: 85,
            def: 95,
            spa: 185,
            spd: 98,
            spe: 129
        },
        abilities: {
            0: "No Guard"
        },
        heightm: 1.6,
        weightkg: 245.7,
        color: "Red",
        eggGroups: ["Undiscovered"],
    },
    manatar: {
        num: 750070,
        species: "Manatar",
        types: ["Water", "Dark"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 100,
            atk: 117,
            def: 105,
            spa: 117,
            spd: 100,
            spe: 100
        },
        abilities: {
            0: "Hydro Stream"
        },
        heightm: 1.155,
        weightkg: 101.7,
        color: "Green",
		  otherFormes: ["manatarmega"],
        eggGroups: ["Undiscovered"],
    },
    manatarmega: {
        num: 750070,
        species: "Manatar-Mega",
        baseSpecies: "Manatar",
        forme: "Mega",
        formeLetter: "M",
        types: ["Water", "Dark"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 100,
            atk: 147,
            def: 145,
            spa: 117,
            spd: 120,
            spe: 110
        },
        abilities: {
            0: "Sand Stream"
        },
        heightm: 1.655,
        weightkg: 154.7,
        color: "Green",
        eggGroups: ["Undiscovered"],
    },
    quiaura: {
        num: 750153,
        species: "Quiaura",
        types: ["Water", "Ice"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 65,
            atk: 60,
            def: 70,
            spa: 70,
            spd: 70,
            spe: 50
        },
        abilities: {
            0: "Hydrate"
        },
        heightm: 0.9,
        weightkg: 17.1,
        color: "Blue",
		  evos: ["aurortoise"],
        eggGroups: ["Monster"],
    },
    aurortoise: {
        num: 750071,
        species: "Aurortoise",
        types: ["Water", "Ice"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 111,
            atk: 90,
            def: 96,
            spa: 102,
            spd: 108,
            spe: 78
        },
        abilities: {
            0: "Hydrate"
        },
        heightm: 2.145,
        weightkg: 155.2,
		  prevo: "quiaura",
		  evoLevel: 32,
        color: "Blue",
		  otherFormes: ["aurortoisemega"],
        eggGroups: ["Monster"],
    },
    aurortoisemega: {
        num: 750071,
        species: "Aurortoise-Mega",
        baseSpecies: "Aurortoise",
        forme: "Mega",
        formeLetter: "M",
        types: ["Water", "Ice"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 111,
            atk: 110,
            def: 116,
            spa: 152,
            spd: 118,
            spe: 78
        },
        abilities: {
            0: "Mega Launcher"
        },
        heightm: 2.145,
        weightkg: 170.8,
        color: "Blue",
        eggGroups: ["Monster"],
    },
    metsir: {
        num: 750072,
        species: "Metsir",
        types: ["Steel", "Bug"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 72,
            atk: 150,
            def: 115,
            spa: 75,
            spd: 80,
            spe: 97
        },
        abilities: {
            0: "Breaker"
        },
        heightm: 1.55,
        weightkg: 302.5,
        color: "Blue",
		  otherFormes: ["metsirmegam", "metsirmegap"],
        eggGroups: ["Undiscovered"],
    },
    metsirmegam: {
        num: 750072,
        species: "Metsir-Mega-M",
        baseSpecies: "Metsir",
        forme: "Mega-M",
        formeLetter: "M",
        types: ["Steel", "Bug"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 72,
            atk: 180,
            def: 135,
            spa: 85,
            spd: 90,
            spe: 117
        },
        abilities: {
            0: "Tough Claws"
        },
        heightm: 2.45,
        weightkg: 695.4,
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
    metsirmegap: {
        num: 750072,
        species: "Metsir-Mega-P",
        baseSpecies: "Metsir",
        forme: "Mega-P",
        formeLetter: "M",
        types: ["Steel", "Flying"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 72,
            atk: 180,
            def: 135,
            spa: 85,
            spd: 90,
            spe: 117
        },
        abilities: {
            0: "Aerilate"
        },
        heightm: 1.75,
        weightkg: 306.5,
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
    fablesteel: {
        num: 750073,
        species: "Fablesteel",
        types: ["Fairy", "Steel"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 100,
            atk: 72,
            def: 120,
            spa: 103,
            spd: 120,
            spe: 55
        },
        abilities: {
            0: "Bodyguard"
        },
        heightm: 1.605,
        weightkg: 122.5,
        color: "Pink",
        eggGroups: ["Undiscovered"],
    },
    houdini: {
        num: 750074,
        species: "Houdini",
        types: ["Ghost", "Normal"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 106,
            atk: 85,
            def: 93,
            spa: 110,
            spd: 108,
            spe: 60
        },
        abilities: {
            0: "Hammer Space"
        },
        heightm: 0.8,
        weightkg: 20,
        color: "Purple",
		  otherFormes: ["houdinimega"],
        eggGroups: ["Undiscovered"],
    },
    houdinimega: {
        num: 750074,
        species: "Houdini-Mega",
        baseSpecies: "Houdini",
        forme: "Mega",
        formeLetter: "M",
        types: ["Ghost", "Fairy"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 106,
            atk: 85,
            def: 133,
            spa: 130,
            spd: 148,
            spe: 60
        },
        abilities: {
            0: "Healer"
        },
        heightm: 1.2,
        weightkg: 21,
        color: "White",
        eggGroups: ["Undiscovered"],
    },
    shot: {
        num: 750075,
        species: "Shot",
        types: ["Grass", "Flying"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 103,
            atk: 100,
            def: 75,
            spa: 105,
            spd: 75,
            spe: 120
        },
        abilities: {
            0: "Serene Eyes"
        },
        heightm: 0.955,
        weightkg: 22.3,
        color: "White",
		  otherFormes: ["shotmega"],
        eggGroups: ["Undiscovered"],
    },
    shotmega: {
        num: 750075,
        species: "Shot-Mega",
        baseSpecies: "Shot",
        forme: "Mega",
        formeLetter: "M",
        types: ["Grass", "Flying"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 103,
            atk: 100,
            def: 80,
            spa: 170,
            spd: 85,
            spe: 140
        },
        abilities: {
            0: "No Guard"
        },
        heightm: 1.655,
        weightkg: 33.3,
        color: "White",
        eggGroups: ["Undiscovered"],
    },
    hippee: {
        num: 750154,
        species: "Hippee",
        types: ["Normal", "Ground"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 70,
            atk: 70,
            def: 70,
            spa: 50,
            spd: 65,
            spe: 50
        },
        abilities: {
            0: "Sand Skill"
        },
        heightm: 0.55,
        weightkg: 28,
		  evos: ["leafadon"],
        color: "Brown",
        eggGroups: ["Field"],
    },
    leafadon: {
        num: 750076,
        species: "Leafadon",
        types: ["Grass", "Ground"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 96,
            atk: 121,
            def: 134,
            spa: 74,
            spd: 78,
            spe: 66
        },
        abilities: {
            0: "Leaf Stream"
        },
        heightm: 1.5,
        weightkg: 162.7,
        color: "Yellow",
        eggGroups: ["Field"],
    },
    matrike: {
        num: 750155,
        species: "Matrike",
        types: ["Electric"],
        baseStats: {
            hp: 57,
            atk: 52,
            def: 50,
            spa: 80,
            spd: 57,
            spe: 70
        },
        abilities: {
            0: "Static"
        },
        heightm: 0.6,
        weightkg: 11.5,
		  evos: ["manpharos"],
        color: "White",
        eggGroups: ["Field"],
    },
    manpharos: {
        num: 750077,
        species: "Manpharos",
        types: ["Electric"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 95,
            atk: 90,
            def: 87,
            spa: 125,
            spd: 90,
            spe: 95
        },
        abilities: {
            0: "Static"
        },
        heightm: 1.45,
        weightkg: 50.8,
		  prevo: "matrike",
		  evoLevel: 24,
        color: "Yellow",
		  otherFormes: ["manpharosmegam", "manpharosmegaa"],
        eggGroups: ["Field"],
    },
    manpharosmegam: {
        num: 750077,
        species: "Manpharos-Mega-M",
        baseSpecies: "Manpharos",
        forme: "Mega-M",
        formeLetter: "M",
        types: ["Electric"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 95,
            atk: 90,
            def: 107,
            spa: 155,
            spd: 110,
            spe: 125
        },
        abilities: {
            0: "Intimidate"
        },
        heightm: 1.75,
        weightkg: 54.6,
        color: "Yellow",
        eggGroups: ["Field"],
    },
    manpharosmegaa: {
        num: 750077,
        species: "Manpharos-Mega-A",
        baseSpecies: "Manpharos",
        forme: "Mega-A",
        formeLetter: "M",
        types: ["Electric", "Dragon"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 95,
            atk: 110,
            def: 107,
            spa: 175,
            spd: 110,
            spe: 85
        },
        abilities: {
            0: "Mold Breaker"
        },
        heightm: 1.45,
        weightkg: 50.8,
        color: "Yellow",
        eggGroups: ["Field"],
    },
    porydile: {
        num: 750156,
        species: "Porydile",
        types: ["Ground", "Normal"],
        baseStats: {
            hp: 60,
            atk: 66,
            def: 60,
            spa: 60,
            spd: 57,
            spe: 60
        },
        abilities: {
            0: "Antivirus"
        },
        heightm: 0.75,
        weightkg: 25.8,
		  evos: ["krok2"],
        color: "Red",
        eggGroups: ["Undiscovered"],
    },
    krok2: {
        num: 750157,
        species: "Krok2",
        types: ["Ground", "Normal"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 72,
            atk: 81,
            def: 67,
            spa: 95,
            spd: 70,
            spe: 87
        },
        abilities: {
            0: "Cyber Criminal"
        },
        heightm: 0.8,
        weightkg: 32.9,
		  prevo: "porydile",
		  evos: ["krookz"],
		  evoLevel: 29,
        color: "Red",
        eggGroups: ["Undiscovered"],
    },
    krookz: {
        num: 750078,
        species: "Krook-Z",
        types: ["Ground", "Normal"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 90,
            atk: 98,
            def: 70,
            spa: 120,
            spd: 72,
            spe: 111
        },
        abilities: {
            0: "Cyber Criminal"
        },
        heightm: 1.195,
        weightkg: 65.1,
		  prevo: "krok2",
		  evoLevel: 40,
        color: "Red",
        eggGroups: ["Undiscovered"],
    },
    entaria: {
        num: 750079,
        species: "Entaria",
        types: ["Fire", "Dragon"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 95,
            atk: 110,
            def: 100,
            spa: 80,
            spd: 90,
            spe: 100
        },
        abilities: {
            0: "Under Pressure"
        },
        heightm: 1.6,
        weightkg: 109.3,
        color: "Blue",
		  otherFormes: ["entariamega"],
        eggGroups: ["Undiscovered"],
    },
    entariamega: {
        num: 750079,
        species: "Entaria-Mega",
        baseSpecies: "Entaria",
        forme: "Mega",
        formeLetter: "M",
        types: ["Fire", "Fairy"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 95,
            atk: 150,
            def: 120,
            spa: 120,
            spd: 90,
            spe: 100
        },
        abilities: {
            0: "Pixilate"
        },
        heightm: 2,
        weightkg: 109.3,
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
    sursquirt: {
        num: 750158,
        species: "Sursquirt",
        types: ["Water", "Bug"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 62,
            atk: 49,
            def: 60,
            spa: 64,
            spd: 70,
            spe: 65
        },
        abilities: {
            0: "Rain Dish"
        },
        heightm: 0.5,
        weightkg: 5.3,
		  evos: ["blasterain"],
        color: "Blue",
        eggGroups: ["Water 1"],
    },
    blasterain: {
        num: 750080,
        species: "Blasterain",
        types: ["Water", "Bug"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 84,
            atk: 81,
            def: 91,
            spa: 92,
            spd: 103,
            spe: 79
        },
        abilities: {
            0: "Sea Monster"
        },
        heightm: 1.195,
        weightkg: 44.5,
		  prevo: "sursquirt",
		  evoLevel: 29,
        color: "White",
		  otherFormes: ["blasterainmega"],
        eggGroups: ["Water 1"],
    },
    blasterainmega: {
        num: 750080,
        species: "Blasterain-Mega",
        baseSpecies: "Blasterain",
        forme: "Mega",
        formeLetter: "M",
        types: ["Water", "Bug"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 84,
            atk: 101,
            def: 111,
            spa: 142,
            spd: 113,
            spe: 79
        },
        abilities: {
            0: "Mega Launcher"
        },
        heightm: 1.195,
        weightkg: 60.1,
        color: "White",
        eggGroups: ["Water 1"],
    },
    dianbro: {
        num: 750081,
        species: "Dianbro",
        types: ["Water", "Fairy"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 90,
            atk: 90,
            def: 130,
            spa: 100,
            spd: 130,
            spe: 40
        },
        abilities: {
            0: "Clear Tempo"
        },
        heightm: 1.155,
        weightkg: 43.6,
        color: "Pink",
		  otherFormes: ["dianbromegas", "dianbromegad"],
        eggGroups: ["Undiscovered"],
    },
    dianbromegas: {
        num: 750081,
        species: "Dianbro-Mega-S",
        baseSpecies: "Dianbro",
        forme: "Mega",
        formeLetter: "M",
        types: ["Water", "Fairy"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 90,
            atk: 90,
            def: 200,
            spa: 130,
            spd: 130,
            spe: 40
        },
        abilities: {
            0: "Shell Armor"
        },
        heightm: 1.555,
        weightkg: 85.1,
        color: "Pink",
        eggGroups: ["Undiscovered"],
    },
    dianbromegad: {
        num: 750081,
        species: "Dianbro-Mega-D",
        baseSpecies: "Dianbro",
        forme: "Mega",
        formeLetter: "M",
        types: ["Water", "Fairy"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 90,
            atk: 150,
            def: 90,
            spa: 160,
            spd: 90,
            spe: 100
        },
        abilities: {
            0: "Magic Bounce"
        },
        heightm: 1.555,
        weightkg: 62.6,
        color: "Pink",
        eggGroups: ["Undiscovered"],
    },
    chatotorus: {
        num: 750082,
        species: "Chatotorus",
        types: ["Normal", "Flying"],
        gender: "M",
        baseStats: {
            hp: 93,
            atk: 105,
            def: 78,
            spa: 134,
            spd: 81,
            spe: 116
        },
        abilities: {
            0: "Sandy Eyes"
        },
        heightm: 1.005,
        weightkg: 34.9,
        color: "Brown",
        eggGroups: ["Undiscovered"],
    },
    happipi: {
        num: 750159,
        species: "Happipi",
        types: ["Normal", "Fairy"],
        gender: "F",
        baseStats: {
            hp: 77,
            atk: 22,
            def: 55,
            spa: 37,
            spd: 85,
            spe: 35
        },
        abilities: {
            0: "Serene Grace"
        },
        heightm: 0.45,
        weightkg: 12.9,
		  evos: ["chantic"],
        color: "White",
        eggGroups: ["Undiscovered"],
    },
    chantic: {
        num: 750160,
        species: "Chantic",
        types: ["Normal", "Fairy"],
        gender: "F",
        baseStats: {
            hp: 167,
            atk: 37,
            def: 60,
            spa: 72,
            spd: 120,
            spe: 60
        },
        abilities: {
            0: "Serene Grace"
        },
        heightm: 0.85,
        weightkg: 18.9,
		  prevo: "happipi",
		  evos: ["blisskiss"],
	     evoType: "levelFriendship",
        color: "White",
        eggGroups: ["Fairy"],
    },
    blisskiss: {
        num: 750083,
        species: "Blisskiss",
        types: ["Normal", "Fairy"],
        gender: "F",
        baseStats: {
            hp: 185,
            atk: 45,
            def: 67,
            spa: 112,
            spd: 140,
            spe: 82
        },
        abilities: {
            0: "Serene Grace"
        },
        heightm: 1.5,
        weightkg: 42.4,
		  prevo: "chantic",
		  evoType: "stone",
		  evoItem: "Shiny Stone",
        color: "White",
        eggGroups: ["Fairy"],
    },
    gunkpawn: {
        num: 750161,
        species: "Gunk Pawn",
        types: ["Steel", "Poison"],
        baseStats: {
            hp: 51,
            atk: 88,
            def: 55,
            spa: 60,
            spd: 45,
            spe: 65
        },
        abilities: {
            0: "Sharp Armor"
        },
        heightm: 0.6,
        weightkg: 16.6,
		  evos: ["toxisharp"],
        color: "Red",
        eggGroups: ["Human-Like"],
    },
    toxisharp: {
        num: 750084,
        species: "Toxisharp",
        types: ["Dark", "Poison"],
        baseStats: {
            hp: 84,
            atk: 125,
            def: 92,
            spa: 83,
            spd: 77,
            spe: 87
        },
        abilities: {
            0: "Sharp Armor"
        },
        heightm: 1.45,
        weightkg: 57.2,
		  prevo: "gunkpawn",
		  evoLevel: 44,
        color: "Red",
        eggGroups: ["Human-Like"],
    },
    darmega: {
        num: 750085,
        species: "Darmega",
        types: ["Dark", "Bug"],
        baseStats: {
            hp: 90,
            atk: 83,
            def: 88,
            spa: 140,
            spd: 76,
            spe: 120
        },
        abilities: {
            0: "Dream Crusher"
        },
        heightm: 1.705,
        weightkg: 51,
        color: "Black",
        eggGroups: ["Undiscovered"],
    },
    lagi: {
        num: 750086,
        species: "Lag-I",
        types: ["Ground", "Ice"],
        gender: "M",
        baseStats: {
            hp: 84,
            atk: 112,
            def: 85,
            spa: 107,
            spd: 80,
            spe: 110
        },
        abilities: {
            0: "Desert Snow"
        },
        heightm: 1.5,
        weightkg: 162.2,
        color: "Brown",
		  otherFormes: ["lagimega"],
        eggGroups: ["Undiscovered"],
    },
    lagimega: {
        num: 750086,
        species: "Lag-I-Mega",
        baseSpecies: "Lag-I",
        forme: "Mega",
        formeLetter: "M",
        types: ["Ground", "Ice"],
        gender: "M",
        baseStats: {
            hp: 84,
            atk: 152,
            def: 85,
            spa: 147,
            spd: 80,
            spe: 130
        },
        abilities: {
            0: "Refrigerate"
        },
        heightm: 2.1,
        weightkg: 255.9,
        color: "Brown",
        eggGroups: ["Undiscovered"],
    },
    heatloom: {
        num: 750087,
        species: "Heatloom",
        types: ["Steel", "Grass"],
        baseStats: {
            hp: 95,
            atk: 130,
            def: 93,
            spa: 95,
            spd: 83,
            spe: 73
        },
        abilities: {
            0: "From Ashes"
        },
        heightm: 1.445,
        weightkg: 234.6,
        color: "Green",
        eggGroups: ["Undiscovered"],
    },
    golone: {
        num: 750162,
        species: "Golone",
        types: ["Ghost", "Steel"],
        gender: "N",
        baseStats: {
            hp: 51,
            atk: 88,
            def: 55,
            spa: 60,
            spd: 45,
            spe: 65
        },
        abilities: {
            0: "En Garde"
        },
        heightm: 0.9,
        weightkg: 47,
		  evos: ["golislash"],
        color: "Blue",
        eggGroups: ["Mineral"],
    },
    golislash: {
        num: 750088,
        species: "Golislash",
		  baseForme: "Defense",
        types: ["Ghost", "Steel"],
        gender: "N",
        baseStats: {
            hp: 74,
            atk: 97,
            def: 135,
            spa: 52,
            spd: 125,
            spe: 57
        },
        abilities: {
            0: "Combination Drive"
        },
        heightm: 2.245,
        weightkg: 191.5,
		  prevo: "golone",
		  evoLevel: 39,
        color: "Brown",
        eggGroups: ["Mineral"],
    },
    golislashpower: {
        num: 750088,
        species: "Golislash-Power",
        baseSpecies: "Golislash",
        forme: "Power",
        formeLetter: "P",
        types: ["Ghost", "Steel"],
        gender: "N",
        baseStats: {
            hp: 74,
            atk: 135,
            def: 97,
            spa: 125,
            spd: 52,
            spe: 57
        },
        abilities: {
            0: "Combination Drive"
        },
		  prevo: "golone",
		  evoLevel: 39,
        color: "Brown",
        heightm: 2.245,
        weightkg: 191.5,
        eggGroups: ["Mineral"],
    },
    hooporus: {
        num: 750089,
        species: "Hooporus",
        types: ["Ghost", "Dragon"],
        baseStats: {
            hp: 78,
            atk: 148,
            def: 75,
            spa: 105,
            spd: 100,
            spe: 103
        },
        abilities: {
            0: "Magic Break"
        },
        heightm: 1.155,
        weightkg: 57.2,
        color: "Yellow",
        eggGroups: ["Undiscovered"],
    },
    lopunnini: {
        num: 750090,
        species: "Lopunnini",
        types: ["Fire", "Normal"],
        baseStats: {
            hp: 83,
            atk: 88,
            def: 92,
            spa: 77,
            spd: 98,
            spe: 103
        },
        abilities: {
            0: "Charm Star"
        },
        heightm: 0.8,
        weightkg: 18.6,
        color: "Yelow",
		  otherFormes: ["lopunninimega"],
        eggGroups: ["Undiscovered"],
    },
    loppuninimega: {
        num: 750090,
        species: "Lopunnini-Mega",
        baseSpecies: "Lopunnini",
        forme: "Mega",
        formeLetter: "M",
        types: ["Fire", "Fighting"],
        baseStats: {
            hp: 83,
            atk: 148,
            def: 102,
            spa: 77,
            spd: 98,
            spe: 133
        },
        abilities: {
            0: "Scrappy"
        },
        heightm: 0.9,
        weightkg: 13.6,
        color: "Yellow",
        eggGroups: ["Undiscovered"],
    },
    larvatrap: {
        num: 750163,
        species: "Larvatrap",
        types: ["Fire", "Ground"],
        baseStats: {
            hp: 59,
            atk: 105,
            def: 59,
            spa: 52,
            spd: 59,
            spe: 40
        },
        abilities: {
            0: "Pit of Flame"
        },
        heightm: 0.9,
        weightkg: 21.9,
		  evos: ["volcagon"],
        color: "Brown",
        eggGroups: ["Bug"],
    },
    volcagon: {
        num: 750091,
        species: "Volcagon",
        types: ["Fire", "Ground"],
        baseStats: {
            hp: 92,
            atk: 90,
            def: 82,
            spa: 117,
            spd: 102,
            spe: 110
        },
        abilities: {
            0: "Glassing"
        },
        heightm: 1.805,
        weightkg: 64,
		  prevo: "larvatrap",
		  evoLevel: 49,
        color: "Green",
        eggGroups: ["Bug"],
    },
    enterrak: {
        num: 750092,
        species: "Enterrak",
        types: ["Fire", "Fighting"],
        gender: "N",
        baseStats: {
            hp: 112,
            atk: 132,
            def: 90,
            spa: 81,
            spd: 90,
            spe: 114
        },
        abilities: {
            0: "Justice Power"
        },
        heightm: 2.01,
        weightkg: 229,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    aeroraptor: {
        num: 750093,
        species: "Aeroraptor",
        types: ["Normal", "Flying"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 92,
            atk: 122,
            def: 77,
            spa: 65,
            spd: 77,
            spe: 125
        },
        abilities: {
            0: "Raptor Head"
        },
        heightm: 1.495,
        weightkg: 41.9,
        color: "Purple",
		  otherFormes: ["aeroraptormega"],
        eggGroups: ["Flying"],
    },
    aeroraptormega: {
        num: 750093,
        species: "Aeroraptor-Mega",
        baseSpecies: "Aeroraptor",
        forme: "Mega",
        formeLetter: "M",
        types: ["Normal", "Flying"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 92,
            atk: 152,
            def: 97,
            spa: 75,
            spd: 97,
            spe: 145
        },
        abilities: {
            0: "Tough Claws"
        },
        heightm: 1.795,
        weightkg: 61.9,
        color: "Purple",
        eggGroups: ["Flying"],
    },
    sansjr: {
        num: 750164,
        species: "Sans Jr.",
        types: ["Normal", "Ground"],
        baseStats: {
            hp: 70,
            atk: 77,
            def: 87,
            spa: 37,
            spd: 47,
            spe: 50
        },
        abilities: {
            0: "Lazy Bones"
        },
        heightm: 0.7,
        weightkg: 18,
		  evos: ["sans"],
        color: "Brown",
        eggGroups: ["Field"],
    },
    sans: {
        num: 750094,
        species: "Sans",
        types: ["Normal", "Ground"],
        baseStats: {
            hp: 122,
            atk: 140,
            def: 115,
            spa: 80,
            spd: 70,
            spe: 92
        },
        abilities: {
            0: "Lazy Bones"
        },
        heightm: 1.5,
        weightkg: 80,
		  prevo: "sansjr",
		  evoLevel: 24,
        color: "Brown",
        eggGroups: ["Field"],
    },
    lucasol: {
        num: 750095,
        species: "Lucasol",
        types: ["Fighting", "Dark"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 78,
            atk: 130,
            def: 75,
            spa: 105,
            spd: 75,
            spe: 93
        },
        abilities: {
            0: "Steadfast Luck"
        },
        heightm: 1.19,
        weightkg: 50.5,
        color: "Blue",
		  otherFormes: ["lucasolmegal", "lucasolmegaa"],
        eggGroups: ["Field"],
    },
    lucasolmegal: {
        num: 750095,
        species: "Lucasol-Mega-L",
        baseSpecies: "Lucasol",
        forme: "Mega L",
        formeLetter: "M",
        types: ["Fighting", "Dark"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 78,
            atk: 170,
            def: 93,
            spa: 135,
            spd: 75,
            spe: 115
        },
        abilities: {
            0: "Adaptability"
        },
        heightm: 1.29,
        weightkg: 54,
        color: "Blue",
        eggGroups: ["Field"],
    },
    lucasolmegaa: {
        num: 750095,
        species: "Lucasol-Mega-A",
        baseSpecies: "Lucasol",
        forme: "Mega A",
        formeLetter: "M",
        types: ["Fighting", "Dark"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 78,
            atk: 150,
            def: 75,
            spa: 145,
            spd: 75,
            spe: 133
        },
        abilities: {
            0: "Magic Bounce"
        },
        heightm: 1.19,
        weightkg: 52.5,
        color: "Blue",
        eggGroups: ["Field"],
    },
    treesaur: {
        num: 750165,
        species: "Treesaur",
        types: ["Poison", "Grass"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 62,
            atk: 67,
            def: 52,
            spa: 75,
            spd: 70,
            spe: 67
        },
        abilities: {
            0: "Overgrow"
        },
        heightm: 0.6,
        weightkg: 5.9,
		  evos: ["vylesaur"],
        color: "Green",
        eggGroups: ["Monster"],
    },
    vylesaur: {
        num: 750166,
        species: "Vylesaur",
        types: ["Poison", "Grass"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 70,
            atk: 78,
            def: 69,
            spa: 97,
            spd: 87,
            spe: 92
        },
        abilities: {
            0: "Overgrow"
        },
        heightm: 0.95,
        weightkg: 17.3,
		  prevo: "treesaur",
		  evos: ["sceptilusaur"],
		  evoLevel: 16,
        color: "Green",
        eggGroups: ["Monster"],
    },
    sceptilusaur: {
        num: 750096,
        species: "Sceptilusaur",
        types: ["Poison", "Grass"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 90,
            atk: 98,
            def: 88,
            spa: 117,
            spd: 107,
            spe: 115
        },
        abilities: {
            0: "Overgrow"
        },
        heightm: 1.855,
        weightkg: 76.1,
		  prevo: "vylesaur",
		  evoLevel: 34,
        color: "Green",
		  otherFormes: ["sceptilusaurmegax", "sceptilusaurmegay"],
        eggGroups: ["Monster"],
    },
    sceptilusaurmegax: {
        num: 750096,
        species: "Sceptilusaur-Mega-X",
        baseSpecies: "Sceptilusaur",
        forme: "Mega X",
        formeLetter: "M",
        types: ["Poison", "Grass"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
         baseStats: {
            hp: 90,
            atk: 116,
            def: 128,
            spa: 139,
            spd: 127,
            spe: 115
        },
        abilities: {
            0: "Thick Fat"
        },
        heightm: 2.255,
        weightkg: 131.6,
        color: "Green",
        eggGroups: ["Monster"],
    },
    sceptilusaurmegay: {
        num: 750096,
        species: "Sceptilusaur-Mega-Y",
        baseSpecies: "Sceptilusaur",
        forme: "Mega Y",
        formeLetter: "M",
        types: ["Poison", "Dragon"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
         baseStats: {
            hp: 90,
            atk: 123,
            def: 98,
            spa: 157,
            spd: 107,
            spe: 140
        },
        abilities: {
            0: "Lightning Rod"
        },
        heightm: 2.055,
        weightkg: 79.1,
        color: "Green",
        eggGroups: ["Monster"],
    },
    dourike: {
        num: 750167,
        species: "Dourike",
        types: ["Electric", "Dark"],
        baseStats: {
            hp: 50,
            atk: 60,
            def: 40,
            spa: 81,
            spd: 50,
            spe: 80
        },
        abilities: {
            0: "Thunderous Embers"
        },
        heightm: 0.6,
        weightkg: 13,
		  evos: ["houndectric"],
        color: "Black",
        eggGroups: ["Field"],
    },
    houndectric: {
        num: 750097,
        species: "Houndectric",
        types: ["Electric", "Dark"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 83,
            atk: 93,
            def: 65,
            spa: 118,
            spd: 80,
            spe: 110
        },
        abilities: {
            0: "Thunderous Embers"
        },
        heightm: 1.45,
        weightkg: 37.6,
		  prevo: "dourike",
		  evoLevel: 25,
        color: "Black",
		  otherFormes: ["houndectricmegam", "houndectricmegah"],
        eggGroups: ["Field"],
    },
    houndectricmegam: {
        num: 750097,
        species: "Houndectric-Mega-M",
        baseSpecies: "Houndectric",
        forme: "Mega M",
        formeLetter: "M",
        types: ["Electric", "Dark"],
        baseStats: {
            hp: 83,
            atk: 93,
            def: 85,
            spa: 148,
            spd: 100,
            spe: 140
        },
        abilities: {
            0: "Intimidate"
        },
        heightm: 1.75,
        weightkg: 41.4,
        color: "Black",
        eggGroups: ["Field"],
    },
    houndectricmegah: {
        num: 750097,
        species: "Houndectric-Mega-H",
        baseSpecies: "Houndectric",
        forme: "Mega H",
        formeLetter: "M",
        types: ["Electric", "Dark"],
        baseStats: {
            hp: 83,
            atk: 93,
            def: 105,
            spa: 148,
            spd: 90,
            spe: 130
        },
        abilities: {
            0: "Solar Power"
        },
        heightm: 1.95,
        weightkg: 52.1,
        color: "Black",
        eggGroups: ["Field"],
    },
    whisdour: {
        num: 750168,
        species: "Whisdour",
        types: ["Normal", "Fire"],
        baseStats: { 
            hp: 59,
            atk: 60,
            def: 36,
            spa: 70,
            spd: 46,
            spe: 61
        },
        abilities: {
            0: "Mix Tape"
        },
        heightm: 0.6,
        weightkg: 13.5,
		  evos: ["exdoom"],
        color: "Black",
        eggGroups: ["Field"],
    },
    exdoom: {
        num: 750098,
        species: "Exdoom",
        types: ["Normal", "Fire"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 100,
            atk: 100,
            def: 66,
            spa: 111,
            spd: 86,
            spe: 92
        },
        abilities: {
            0: "Mix Tape"
        },
        heightm: 1.45,
        weightkg: 59.5,
		  prevo: "whisdour",
		  evoLevel: 27,
        color: "Black",
		  otherFormes: ["exdoommega"],
        eggGroups: ["Field"],
    },
    exdoommega: {
        num: 750098,
        species: "Exdoom-Mega",
        baseSpecies: "Exdoom",
        forme: "Mega",
        formeLetter: "M",
        types: ["Normal", "Fire"],
        baseStats: {
            hp: 100,
            atk: 100,
            def: 106,
            spa: 131,
            spd: 96,
            spe: 112
        },
        abilities: {
            0: "Solar Power"
        },
        heightm: 1.95,
        weightkg: 74,
        color: "Black",
        eggGroups: ["Field"],
    },
    karpon: {
        num: 750169,
        species: "Karpon",
        types: ["Water", "Dragon"],
        baseStats: { 
            hp: 37,
            atk: 57,
            def: 62,
            spa: 32,
            spd: 40,
            spe: 70
        },
        abilities: {
            0: "Coward"
        },
        heightm: 0.75,
        weightkg: 26,
		  evos: ["gyaramence"],
        color: "Red",
        eggGroups: ["Dragon"],
    },
    gyaramence: {
        num: 750099,
        species: "Gyaramence",
        types: ["Water", "Dragon"],
        baseStats: {
            hp: 110,
            atk: 145,
            def: 94,
            spa: 100,
            spd: 105,
            spe: 105
        },
        abilities: {
            0: "Intimidate"
        },
        heightm: 4,
        weightkg: 168.8,
		  prevo: "karpon",
		  evoLevel: 30,
        color: "Blue",
		  otherFormes: ["gyaramencemegag", "gyaramencemegas"],
        eggGroups: ["Dragon"],
    },
    gyaramencemegag: {
        num: 750099,
        species: "Gyaramence-Mega-G",
        baseSpecies: "Gyaramence",
        forme: "Mega G",
        formeLetter: "M",
        types: ["Water", "Dark"],
        baseStats: {
            hp: 110,
            atk: 175,
            def: 124,
            spa: 110,
            spd: 135,
            spe: 105
        },
        abilities: {
            0: "Mold Breaker"
        },
        heightm: 4,
        weightkg: 248.8,
        color: "Blue",
        eggGroups: ["Dragon"],
    },
    gyaramencemegas: {
        num: 750099,
        species: "Gyaramence-Mega-S",
        baseSpecies: "Gyaramence",
        forme: "Mega S",
        formeLetter: "M",
        types: ["Water", "Dragon"],
        baseStats: {
            hp: 110,
            atk: 155,
            def: 144,
            spa: 110,
            spd: 115,
            spe: 125
        },
        abilities: {
            0: "Aerilate"
        },
        heightm: 4.3,
        weightkg: 178.8,
        color: "Blue",
        eggGroups: ["Dragon"],
    },
    thunderblast: {
        num: 7500100,
        species: "Thunderblast",
        types: ["Water", "Electric"],
        gender: "M",
        baseStats: {
            hp: 80,
            atk: 94,
            def: 90,
            spa: 130,
            spd: 100,
            spe: 100
        },
        abilities: {
            0: "Torrential Voltage"
        },
        heightm: 2.3,
        weightkg: 73.2,
        color: "Blue",
		  otherFormes: ["thunderblastmega"],
        eggGroups: ["Undiscovered"],
    },
    thunderblastmega: {
        num: 7500100,
        species: "Thunderblast-Mega",
        baseSpecies: "Thunderblast",
        forme: "Mega",
        formeLetter: "M",
        types: ["Water", "Electric"],
        gender: "M",
        baseStats: {
            hp: 80,
            atk: 114,
            def: 110,
            spa: 180,
            spd: 110,
            spe: 100
        },
        abilities: {
            0: "Mega Launcher"
        },
        heightm: 2.3,
        weightkg: 88.8,
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
    snoopa: {
        num: 7500101,
        species: "Snoopa",
        types: ["Ghost", "Normal"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 130,
            atk: 129,
            def: 70,
            spa: 110,
            spd: 120,
            spe: 50
        },
        abilities: {
            0: "Magic Fat"
        },
        heightm: 1.31,
        weightkg: 234.5,
        color: "Purple",
        eggGroups: ["Undiscovered"],
    },
    plupoke: {
        num: 750170,
        species: "Plupoke",
        types: ["Water", "Psychic"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: { 
            hp: 86,
            atk: 63,
            def: 64,
            spa: 55,
            spd: 63,
            spe: 32
        },
        abilities: {
            0: "Healing Provocation"
        },
        heightm: 0.8,
        weightkg: 20.6,
		  evos: ["empoleking"],
        color: "Blue",
        eggGroups: ["Water 1"],
    },
    empoleking: {
        num: 7500102,
        species: "Empoleking",
        types: ["Water", "Steel"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 99,
            atk: 90,
            def: 94,
            spa: 115,
            spd: 115,
            spe: 65
        },
        abilities: {
            0: "Torrent Tempo"
        },
        heightm: 1.855,
        weightkg: 82,
		  prevo: "plupoke",
		  evoLevel: 26,
        color: "Blue",
        eggGroups: ["Water 1"],
    },
    heathorn: {
        num: 7500103,
        species: "Heathorn",
        types: ["Grass", "Steel"],
        baseStats: {
            hp: 93,
            atk: 92,
            def: 129,
            spa: 102,
            spd: 121,
            spe: 49
        },
        abilities: {
            0: "Forest Fire"
        },
        heightm: 1.345,
        weightkg: 270,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    galvantulys: {
        num: 7500104,
        species: "Galvantulys",
        types: ["Electric", "Psychic"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 60,
            atk: 86,
            def: 85,
            spa: 110,
            spd: 85,
            spe: 150
        },
        abilities: {
            0: "Compound Pressure"
        },
        heightm: 1.245,
        weightkg: 37.5,
        color: "Red",
        eggGroups: ["Undiscovered"],
    },
    hazygon: {
        num: 7500105,
        species: "Hazygon",
        types: ["Psychic", "Dragon"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 83,
            atk: 115,
            def: 80,
            spa: 145,
            spd: 80,
            spe: 126
        },
        abilities: {
            0: "Levitate"
        },
        heightm: 1.05,
        weightkg: 80.15,
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
    jellie: {
        num: 7500106,
        species: "Jellie",
        types: ["Ghost", "Fairy"],
        baseStats: {
            hp: 90,
            atk: 80,
            def: 130,
            spa: 94,
            spd: 130,
            spe: 55
        },
        abilities: {
            0: "Clear Absorb"
        },
        heightm: 1.46,
        weightkg: 71.9,
        color: "White",
		  otherFormes: ["jelliemega"],
        eggGroups: ["Undiscovered"],
    },
    jelliemega: {
        num: 7500106,
        species: "Jellie-Mega",
        baseSpecies: "Jellie",
        forme: "Mega",
        formeLetter: "M",
        types: ["Ghost", "Fairy"],
        baseStats: {
            hp: 90,
            atk: 140,
            def: 90,
            spa: 154,
            spd: 90,
            spe: 115
        },
        abilities: {
            0: "Magic Bounce"
        },
        heightm: 1.86,
        weightkg: 92.9,
        color: "White",
        eggGroups: ["Undiscovered"],
    },
    zaggron: {
        num: 7500107,
        species: "Zaggron",
        types: ["Flying", "Steel"],
        baseStats: {
            hp: 80,
            atk: 100,
            def: 150,
            spa: 92,
            spd: 95,
            spe: 77
        },
        abilities: {
            0: "Crushing"
        },
        heightm: 1.855,
        weightkg: 206.3,
        color: "Yellow",
		  otherFormes: ["zaggronmega"],
        eggGroups: ["Undiscovered"],
    },
    zaggronmega: {
        num: 7500107,
        species: "Zaggron-Mega",
        baseSpecies: "Zaggron",
        forme: "Mega",
        formeLetter: "M",
        types: ["Flying", "Steel"],
        baseStats: {
            hp: 80,
            atk: 130,
            def: 200,
            spa: 92,
            spd: 115,
            spe: 77
        },
        abilities: {
            0: "Filter"
        },
        heightm: 1.955,
        weightkg: 241.3,
        color: "Yellow",
        eggGroups: ["Undiscovered"],
    },
    malaras: {
        num: 7500108,
        species: "Malaras",
        types: ["Dark", "Ice"],
        baseStats: {
            hp: 119,
            atk: 98,
            def: 94,
            spa: 86,
            spd: 95,
            spe: 77
        },
        abilities: {
            0: "Advocate Scale"
        },
        heightm: 1.995,
        weightkg: 133.5,
        color: "Blue",
        eggGroups: ["Water 1"],
    },
    umbord: {
        num: 7500109,
        species: "Umbord",
        types: ["Water", "Dark"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 143,
            atk: 87,
            def: 88,
            spa: 85,
            spd: 98,
            spe: 72
        },
        abilities: {
            0: "Apathy"
        },
        heightm: 7.745,
        weightkg: 212.5,
		  prevo: "wailee",
		  evoLevel: 40,
        color: "White",
        eggGroups: ["Field"],
    },
    eruption: {
        num: 7500110,
        species: "Eruption",
        types: ["Fire", "Water"],
        baseStats: {
            hp: 79,
            atk: 105,
            def: 100,
            spa: 130,
            spd: 100,
            spe: 55
        },
        abilities: {
            0: "Evaporate"
        },
        heightm: 1.805,
        weightkg: 207.5,
        color: "Red",
		  otherFormes: ["eruptionmega"],
        eggGroups: ["Undiscovered"],
    },
    eruptionmega: {
        num: 7500110,
        species: "Eruption-Mega",
        baseSpecies: "Eruption",
        forme: "Mega",
        formeLetter: "M",
        types: ["Fire", "Water"],
        baseStats: {
            hp: 79,
            atk: 125,
            def: 130,
            spa: 170,
            spd: 130,
            spe: 35
        },
        abilities: {
            0: "Sheer Force"
        },
        heightm: 2.405,
        weightkg: 308,
        color: "Red",
        eggGroups: ["Undiscovered"],
    },
    porygardezy: {
        num: 7500111,
        species: "Porygarde-Zy",
        types: ["Normal", "Dragon"],
        gender: "N",
        baseStats: {
            hp: 97,
            atk: 110,
            def: 95,
            spa: 115,
            spd: 95,
            spe: 95
        },
        abilities: {
            0: "Dis/connect"
        },
        heightm: 2.945,
        weightkg: 169.5,
        color: "Red",
        eggGroups: ["Undiscovered"],
    },
    raptorus: {
        num: 7500112,
        species: "Raptorus",
        types: ["Ground", "Flying"],
        gender: "M",
        baseStats: {
            hp: 89,
            atk: 150,
            def: 80,
            spa: 77,
            spd: 65,
            spe: 115
        },
        abilities: {
            0: "Intimidate"
        },
        heightm: 1.245,
        weightkg: 46.4,
        color: "Brown",
        eggGroups: ["Undiscovered"],
    },
    sickle: {
        num: 7500113,
        species: "Sickle",
        types: ["Bug", "Steel"],
        baseStats: {
            hp: 55,
            atk: 80,
            def: 175,
            spa: 42,
            spd: 165,
            spe: 45
        },
        abilities: {
            0: "Sturdy Tech"
        },
        heightm: 1.205,
        weightkg: 69.2,
        color: "Red",
		  otherFormes: ["sicklemega"],
        eggGroups: ["Bug"],
    },
    sicklemega: {
        num: 7500113,
        species: "Sickle-Mega",
        baseSpecies: "Sickle",
        forme: "Mega",
        formeLetter: "M",
        types: ["Bug", "Steel"],
        baseStats: {
            hp: 55,
            atk: 100,
            def: 215,
            spa: 52,
            spd: 185,
            spe: 55
        },
        abilities: {
            0: "Technician"
        },
        heightm: 1.405,
        weightkg: 76.2,
        color: "Red",
        eggGroups: ["Bug"],
    },
    koulion: {
        num: 7500114,
        species: "Koulion",
        types: ["Electric", "Steel"],
        gender: "N",
        baseStats: {
            hp: 99,
            atk: 102,
            def: 102,
            spa: 102,
            spd: 102,
            spe: 111
        },
        abilities: {
            0: "Justice Power"
        },
        heightm: 2.01,
        weightkg: 214,
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
    panphan: {
        num: 750171,
        species: "Panphan",
        types: ["Ground", "Fighting"],
        baseStats: { 
            hp: 84,
            atk: 86,
            def: 70,
            spa: 48,
            spd: 50,
            spe: 50
        },
        abilities: {
            0: "Scrap Heap"
        },
        heightm: 0.55,
        weightkg: 20.7,
		  evos: ["dongoro"],
        color: "Blue",
        eggGroups: ["Field"],
    },
    dongoro: {
        num: 7500115,
        species: "Dongoro",
        types: ["Ground", "Dark"],
        baseStats: {
            hp: 102,
            atk: 132,
            def: 109,
            spa: 74,
            spd: 75,
            spe: 64
        },
        abilities: {
            0: "Sturdy Mold"
        },
        heightm: 1.6,
        weightkg: 128,
		  prevo: "panphan",
		  evoLevel: 28,
        color: "Gray",
        eggGroups: ["Field"],
    },
darkchomp: {
        num: 7500116,
        species: "Darkchomp",
        types: ["Dark", "Dragon"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 109,
            atk: 130,
            def: 92,
            spa: 107,
            spd: 87,
            spe: 113
        },
        abilities: {
            0: "Sand Dreams"
        },
        dexentry: "It is a nocturnal creature.  While it looks terrifying, it is harmless to humans. Intead, it hunts down good dreams, and has the ability to invade them. Once inside a good dream, Darkchomp won't stop until it tears everything appart, and proceeds to torment the dreamer's sleep until it is waken up by force. Darkchomp then flies away at high speeds in order to not be caught, and continues to hunt other dreams.",
        heightm: 1.705,
        weightkg: 72.7,
        color: "Black",
		  otherFormes: ["darkchompmega"],
		  fusion: ["Darkrai", "Garchomp"],
    },
    darkchompmega: {
        num: 7500116,
        species: "Darkchomp-Mega",
        baseSpecies: "Darkchomp",
        forme: "Mega",
        formeLetter: "M",
        types: ["Dark", "Dragon"],
        baseStats: {
            hp: 109,
            atk: 170,
            def: 112,
            spa: 147,
            spd: 97,
            spe: 103
        },
        abilities: {
            0: "Sand Force"
        },
        heightm: 1.705,
        weightkg: 72.75,
        color: "Black",
        eggGroups: ["Undiscovered"],
    },
    friller: {
        num: 750172,
        species: "Friller",
        types: ["Poison", "Water"],
        baseStats: { 
            hp: 82,
            atk: 70,
            def: 60,
            spa: 57,
            spd: 72,
            spe: 37
        },
        abilities: {
            0: "Cursing Contact"
        },
        heightm: 0.55,
        weightkg: 20.7,
		  evos: ["jelluk"],
        color: "Purple",
        eggGroups: ["Amorphous"],
    },
    jelluk: {
        num: 7500117,
        species: "Jelluk",
        types: ["Poison", "Water"],
        baseStats: {
            hp: 112,
            atk: 92,
            def: 82,
            spa: 85,
            spd: 112,
            spe: 65
        },
        abilities: {
            0: "Pond Scum"
        },
        heightm: 1.7,
        weightkg: 82.5,
		  prevo: "friller",
		  evoLevel: 39,
        color: "Purple",
        eggGroups: ["Amorphous"],
    },
    crustlecross: {
        num: 7500118,
        species: "Crustlecross",
        types: ["Rock", "Fighting"],
        baseStats: {
            hp: 85,
            atk: 120,
            def: 110,
            spa: 62,
            spd: 95,
            spe: 75
        },
        abilities: {
            0: "Armored Guts"
        },
        heightm: 1.45,
        weightkg: 127,
        color: "Red",
		  otherFormes: ["crustlecrossmega"],
        eggGroups: ["Bug"],
    },
    crustlecrossmega: {
        num: 7500118,
        species: "Crustlecross-Mega",
        baseSpecies: "Crustlecross",
        forme: "Mega",
        formeLetter: "M",
        types: ["Rock", "Fighting"],
        baseStats: {
            hp: 85,
            atk: 180,
            def: 150,
            spa: 62,
            spd: 105,
            spe: 65
        },
        abilities: {
            0: "Skill Link"
        },
        heightm: 1.65,
        weightkg: 135.5,
        color: "Red",
        eggGroups: ["Bug"],
    },
    wigglyman: {
        num: 7500119,
        species: "Wigglyman",
        types: ["Water", "Fairy"],
        genderRatio: {M: 0.25, F: 0.75},
        baseStats: {
            hp: 120,
            atk: 85,
            def: 80,
            spa: 110,
            spd: 80,
            spe: 81
        },
        abilities: {
            0: "Shake it Off"
        },
        heightm: 0.645,
        weightkg: 6.7,
        color: "Pink",
        eggGroups: ["Fairy"],
    },
    magnebas: {
        num: 750173,
        species: "Magnebas",
        types: ["Water", "Electric"],
		  gender: "N",
        baseStats: { 
            hp: 30,
            atk: 25,
            def: 50,
            spa: 67,
            spd: 55,
            spe: 64
        },
        abilities: {
            0: "Adaptive Clutch"
        },
        heightm: 0.45,
        weightkg: 6.7,
		  evos: ["magnetic"],
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    magnetic: {
        num: 7500120,
        species: "Magnetic",
        types: ["Water", "Electric"],
		  gender: "N",
        baseStats: {
            hp: 102,
            atk: 65,
            def: 107,
            spa: 135,
            spd: 107,
            spe: 70
        },
        abilities: {
            0: "Compelling"
        },
        heightm: 3.695,
        weightkg: 171,
		  prevo: "magnebas",
		  evoLevel: 30,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    zorugon: {
        num: 750174,
        species: "Zorugon",
        types: ["Normal", "Dark"],
		  gender: "N",
        baseStats: { 
            hp: 52,
            atk: 62,
            def: 60,
            spa: 97,
            spd: 62,
            spe: 57
        },
        abilities: {
            0: "Trace Mirage"
        },
        heightm: 0.45,
        weightkg: 6.7,
		  evos: ["zorogonz"],
        color: "Red",
        eggGroups: ["Undiscovered"],
    },
    zorogonz: {
        num: 7500121,
        species: "Zorogon-Z",
        types: ["Normal", "Dark"],
        gender: "N",
        baseStats: {
            hp: 72,
            atk: 92,
            def: 65,
            spa: 147,
            spd: 67,
            spe: 117
        },
        abilities: {
            0: "Adaptable Illusion"
        },
        heightm: 1.245,
        weightkg: 57.5,
		  prevo: "zorugon",
		  evoLevel: 30,
        color: "Red",
        eggGroups: ["Undiscovered"],
    },
    thundini: {
        num: 7500122,
        species: "Thundini",
        types: ["Electric", "Fire"],
        gender: "M",
        baseStats: {
            hp: 90,
            atk: 118,
            def: 85,
            spa: 123,
            spd: 90,
            spe: 126
        },
        abilities: {
            0: "Prankstar"
        },
        heightm: 0.955,
        weightkg: 32.5,
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
    cleahorch: {
        num: 750175,
        species: "Cleahorch",
        types: ["Water"],
        baseStats: { 
            hp: 45,
            atk: 51,
            def: 71,
            spa: 79,
            spd: 49,
            spe: 67
        },
        abilities: {
            0: "Storm Launcher"
        },
        heightm: 0.45,
        weightkg: 8.1,
		  evos: ["clawdra"],
        color: "Blue",
        eggGroups: ["Water 1"],
    },
    clawdra: {
        num: 7500123,
        species: "Clawdra",
        types: ["Water", "Dragon"],
        baseStats: {
            hp: 83,
            atk: 94,
            def: 102,
            spa: 118,
            spd: 102,
            spe: 82
        },
        abilities: {
            0: "Storm Launcher"
        },
        heightm: 0.955,
        weightkg: 32.5,
		  prevo: "cleahorch",
		  evoLevel: 34,
        color: "Blue",
        eggGroups: ["Water 1"],
    },
    shaymode: {
        num: 7500124,
        species: "Shaymode",
        types: ["Grass", "Electric"],
        gender: "N",
        baseStats: {
            hp: 80,
            atk: 75,
            def: 90,
            spa: 105,
            spd: 100,
            spe: 130
        },
        abilities: {
            0: "Static Switch"
        },
        heightm: 0.695,
        weightkg: 34.3,
        color: "Red",
        eggGroups: ["Undiscovered"],
    },
    armortran: {
        num: 7500125,
        species: "Armortran",
        types: ["Steel", "Flying"],
        baseStats: {
            hp: 90,
            atk: 85,
            def: 134,
            spa: 85,
            spd: 105,
            spe: 73
        },
        abilities: {
            0: "Sturdy Fire"
        },
        heightm: 1.7,
        weightkg: 240.25,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    gonzap: {
        num: 7500126,
        species: "Gonzap",
        types: ["Dragon", "Electric"],
        baseStats: {
            hp: 95,
            atk: 99,
            def: 100,
            spa: 125,
            spd: 100,
            spe: 110
        },
        abilities: {
            0: "G-Tolerance"
        },
        heightm: 1.7,
        weightkg: 106.3,
        color: "Yellow",
        eggGroups: ["Undiscovered"],
    },
    bouffanine: {
        num: 7500127,
        species: "Bouffanine",
        types: ["Normal", "Fire"],
        genderRatio: {
            M: 0.625,
            F: 0.375
        },
        baseStats: {
            hp: 102,
            atk: 120,
            def: 97,
            spa: 80,
            spd: 97,
            spe: 85
        },
        abilities: {
            0: "Reflex"
        },
        heightm: 1.755,
        weightkg: 124.8,
        color: "Brown",
        eggGroups: ["Field"],
    },
    dedsteel: {
        num: 7500128,
        species: "Dedsteel",
        types: ["Steel", "Fairy"],
        gender: "N",
        baseStats: {
            hp: 80,
            atk: 66,
            def: 110,
            spa: 78,
            spd: 124,
            spe: 75
        },
        abilities: {
            0: "Clear Pouch"
        },
        heightm: 1.055,
        weightkg: 103.6,
        color: "Yellow",
        eggGroups: ["Undiscovered"],
    },
    charmite: {
        num: 750176,
        species: "Charmite",
        types: ["Ice", "Fire"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: { 
            hp: 52,
            atk: 75,
            def: 69,
            spa: 51,
            spd: 47,
            spe: 61
        },
        abilities: {
            0: "Bunsen Burner"
        },
        heightm: 0.8,
        weightkg: 54,
		  evos: ["avaizard"],
        color: "Blue",
        eggGroups: ["Monster"],
    },
    avaizard: {
        num: 7500129,
        species: "Avaizard",
        types: ["Ice", "Fire"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 96,
            atk: 110,
            def: 141,
            spa: 86,
            spd: 75,
            spe: 74
        },
        abilities: {
            0: "Kindle"
        },
        heightm: 1.855,
        weightkg: 297.7,
		  prevo: "charmite",
		  evoLevel: 32,
        color: "Blue",
		  otherFormes: ["avaizardmegax", "avaizardmegay"],
        eggGroups: ["Monster"],
    },
    avaizardmegax: {
        num: 7500129,
        species: "Avaizard-Mega-X",
        baseSpecies: "Avaizard",
        forme: "Mega X",
        formeLetter: "M",
        types: ["Ice", "Dragon"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 96,
            atk: 156,
            def: 174,
            spa: 107,
            spd: 75,
            spe: 74
        },
        abilities: {
            0: "Tough Claws"
        },
        heightm: 1.855,
        weightkg: 317.7,
        color: "Blue",
        eggGroups: ["Monster"],
    },
    avaizardmegay: {
        num: 7500129,
        species: "Avaizard-Mega-Y",
        baseSpecies: "Avaizard",
        forme: "Mega Y",
        formeLetter: "M",
        types: ["Ice", "Fire"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 96,
            atk: 130,
            def: 141,
            spa: 136,
            spd: 105,
            spe: 74
        },
        abilities: {
            0: "Drought"
        },
        heightm: 1.855,
        weightkg: 307.75,
        color: "Blue",
        eggGroups: ["Monster"],
    },
    slugwick: {
        num: 750177,
        species: "Slugwick",
        types: ["Ghost", "Fire"],
        baseStats: { 
            hp: 55,
            atk: 45,
            def: 62,
            spa: 87,
            spd: 62,
            spe: 30
        },
        abilities: {
            0: "Flame Body"
        },
        heightm: 0.5,
        weightkg: 19,
		  evos: ["cargolure"],
        color: "White",
        eggGroups: ["Amorphous"],
    },
    cargolure: {
        num: 7500130,
        species: "Cargolure",
        types: ["Ghost", "Fire"],
        baseStats: {
            hp: 70,
            atk: 67,
            def: 120,
            spa: 125,
            spd: 100,
            spe: 70
        },
        abilities: {
            0: "Flame Body"
        },
        heightm: 0.89,
        weightkg: 44.6,
		  prevo: "slugwick",
		  evoLevel: 40,
        color: "Black",
        eggGroups: ["Amorphous"],
    },
    riobra: {
        num: 750178,
        species: "Riobra",
        types: ["Psychic", "Fighting"],
        genderRatio: {
            M: 0.8125,
            F: 0.1875
        },
        baseStats: { 
            hp: 42,
            atk: 55,
            def: 37,
            spa: 90,
            spd: 57,
            spe: 95
        },
        abilities: {
            0: "Inner Focus"
        },
        heightm: 0.8,
        weightkg: 19.8,
		  evos: ["alakario"],
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
    alakario: {
        num: 7500131,
        species: "Alakario",
        types: ["Psychic", "Fighting"],
        genderRatio: {
            M: 0.8125,
            F: 0.1875
        },
        baseStats: {
            hp: 77,
            atk: 95,
            def: 72,
            spa: 140,
            spd: 97,
            spe: 120
        },
        abilities: {
            0: "Inner Focus"
        },
        heightm: 1.345,
        weightkg: 51,
		  prevo: "riobra",
		  evoLevel: 16,
        color: "Blue",
		  otherFormes: ["alakariomegal", "alakariomegaa"],
        eggGroups: ["Human-Like"],
    },
    alakariomegal: {
        num: 7500131,
        species: "Alakario-Mega-L",
        baseSpecies: "Alakario",
        forme: "Mega-L",
        formeLetter: "M",
        types: ["Psychic", "Fighting"],
        baseStats: {
            hp: 77,
            atk: 130,
            def: 90,
            spa: 165,
            spd: 97,
            spe: 142
        },
        abilities: {
            0: "Adaptability"
        },
        heightm: 1.445,
        weightkg: 54.5,
        color: "Blue",
        eggGroups: ["Human-Like"],
    },
    alakariomegaa: {
        num: 7500131,
        species: "Alakario-Mega-A",
        baseSpecies: "Alakario",
        forme: "Mega-A",
        formeLetter: "M",
        types: ["Psychic", "Fighting"],
        baseStats: {
            hp: 77,
            atk: 95,
            def: 92,
            spa: 180,
            spd: 107,
            spe: 150
        },
        abilities: {
            0: "Trace"
        },
        heightm: 1.045,
        weightkg: 51,
        color: "Blue",
        eggGroups: ["Human-Like"],
    },
    cazantor: {
        num: 7500132,
        species: "Cazantor",
        types: ["Bug", "Steel"],
        baseStats: {
            hp: 74,
            atk: 130,
            def: 116,
            spa: 62,
            spd: 74,
            spe: 97
        },
        abilities: {
            0: "Precision"
        },
        heightm: 1.05,
        weightkg: 75.5,
        color: "Gray",
		  otherFormes: ["cazantormega"],
        eggGroups: ["Bug"],
    },
    cazantormega: {
        num: 7500132,
        species: "Cazantor-Mega",
        baseSpecies: "Cazantor",
        forme: "Mega",
        formeLetter: "M",
        types: ["Bug", "Steel"],
        baseStats: {
            hp: 74,
            atk: 150,
            def: 156,
            spa: 72,
            spd: 94,
            spe: 107
        },
        abilities: {
            0: "Technician"
        },
        heightm: 1.25,
        weightkg: 82.5,
        color: "Gray",
        eggGroups: ["Bug"],
    },
    rappel: {
        num: 750179,
        species: "Rappel",
        types: ["Fairy", "Ghost"],
        baseStats: { 
            hp: 41,
            atk: 55,
            def: 43,
            spa: 65,
            spd: 45,
            spe: 47
        },
        abilities: {
            0: "Grim Reminder"
        },
        heightm: 0.5,
        weightkg: 4.4,
		  evos: ["gallette"],
        color: "White",
        eggGroups: ["Amorphous"],
    },
    gallette: {
        num: 7500133,
        species: "Gallette",
        types: ["Fighting", "Ghost"],
        gender: "M",
        baseStats: {
            hp: 76,
            atk: 130,
            def: 75,
            spa: 84,
            spd: 99,
            spe: 82
        },
        abilities: {
            0: "Sleepwalker"
        },
        heightm: 1.345,
        weightkg: 32.2,
		  prevo: "rappel",
		  evoLevel: 28,
        color: "Black",
		  otherFormes: ["gallettemegag", "gallettemegab"],
        eggGroups: ["Amorphous"],
    },
    gallettemegag: {
        num: 7500133,
        species: "Gallette-Mega-G",
        baseSpecies: "Gallette",
        forme: "Mega",
        formeLetter: "M",
        types: ["Fighting", "Ghost"],
        gender: "M",
        baseStats: {
            hp: 76,
            atk: 170,
            def: 105,
            spa: 84,
            spd: 99,
            spe: 112
        },
        abilities: {
            0: "Steadfast"
        },
        heightm: 1.345,
        weightkg: 36.6,
        color: "Black",
        eggGroups: ["Amorphous"],
    },
    gallettemegab: {
        num: 7500133,
        species: "Gallette-Mega-B",
        baseSpecies: "Gallette",
        forme: "Mega",
        formeLetter: "M",
        types: ["Fighting", "Ghost"],
        gender: "M",
        baseStats: {
            hp: 76,
            atk: 180,
            def: 85,
            spa: 94,
            spd: 119,
            spe: 92
        },
        abilities: {
            0: "Prankster"
        },
        heightm: 1.445,
        weightkg: 32.7,
        color: "Black",
        eggGroups: ["Amorphous"],
    },
    amarunt: {
        num: 750180,
        species: "Amarunt",
        types: ["Ice", "Dragon"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: { 
            hp: 72,
            atk: 89,
            def: 68,
            spa: 61,
            spd: 59,
            spe: 62
        },
        abilities: {
            0: "Absolute Zero"
        },
        heightm: 1.05,
        weightkg: 25.6,
		  evos: ["aurantrum"],
        color: "Brown",
        eggGroups: ["Monster"],
    },
    aurantrum: {
        num: 7500134,
        species: "Aurantrum",
        types: ["Ice", "Dragon"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 112,
            atk: 109,
            def: 105,
            spa: 94,
            spd: 85,
            spe: 74
        },
        abilities: {
            0: "Absolute Zero"
        },
        heightm: 2.59,
        weightkg: 247.5,
		  prevo: "amarunt",
		  evoLevel: 39,
        color: "Red",
        eggGroups: ["Monster"],
    },
    ferrolix: {
        num: 750181,
        species: "Ferrolix",
        types: ["Grass", "Rock"],
        baseStats: { 
            hp: 48,
            atk: 60,
            def: 130,
            spa: 60,
            spd: 77,
            spe: 45
        },
        abilities: {
            0: "Durable Barbs"
        },
        heightm: 4.7,
        weightkg: 114.4,
		  evos: ["steelthorn"],
        color: "Gray",
        eggGroups: ["Mineral"],
    },
    steelthorn: {
        num: 7500135,
        species: "Steelthorn",
        types: ["Grass", "Steel"],
        baseStats: {
            hp: 85,
            atk: 100,
            def: 176,
            spa: 65,
            spd: 101,
            spe: 35
        },
        abilities: {
            0: "Durable Barbs"
        },
        heightm: 5.09,
        weightkg: 255,
		  prevo: "ferrolix",
		  evoLevel: 40,
        color: "Gray",
		  otherFormes: ["steelthornmega"],
        eggGroups: ["Mineral"],
    },
    steelthornmega: {
        num: 7500135,
        species: "Steelthorn-Mega",
        baseSpecies: "Steelthorn",
        forme: "Mega",
        formeLetter: "M",
        types: ["Grass", "Steel"],
        baseStats: {
            hp: 85,
            atk: 140,
            def: 206,
            spa: 65,
            spd: 131,
            spe: 35
        },
        abilities: {
            0: "Sand Force"
        },
        heightm: 6.39,
        weightkg: 595,
        color: "Gray",
        eggGroups: ["Mineral"],
    },
    venoran: {
        num: 750182,
        species: "Venoran",
        types: ["Poison", "Bug"],
        gender: "F",
        baseStats: { 
            hp: 60,
            atk: 58,
            def: 57,
            spa: 48,
            spd: 50,
            spe: 46
        },
        abilities: {
            0: "Tainted Lens"
        },
        heightm: 0.7,
        weightkg: 18.5,
		  evos: ["venoqueen"],
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
    venoqueen: {
        num: 7500136,
        species: "Venoqueen",
        types: ["Ground", "Bug"],
        gender: "F",
        baseStats: {
            hp: 90,
            atk: 97,
            def: 73,
            spa: 92,
            spd: 80,
            spe: 83
        },
        abilities: {
            0: "Tainted Lens"
        },
        heightm: 1.4,
        weightkg: 36.2,
		  prevo: "venoran",
		  evoLevel: 24,
        color: "Purple",
        eggGroups: ["Undiscovered"],
    },
       polyform2: {
        num: 7500137,
        species: "Polyform2",
        types: ["Normal"],
        gender: "N",
        baseStats: {
            hp: 98,
            atk: 75,
            def: 90,
            spa: 91,
            spd: 90,
            spe: 65
        },
        abilities: {
            0: "Aeroform"
        },
        heightm: 0.455,
        weightkg: 16.6,
        color: "Gray",
        eggGroups: ["Undiscovered"],
        otherFormes: ["polyform2sunny", "polyform2sunsnow", "polyform2rainy", "polyform2snowy", "polyform2sandy", "polyform2tundra", "polyform2spooky", "polyform2prickly"],
    },
    polyform2sunny: {
        num: 7500137,
        species: "Polyform2-Sunny",
        baseSpecies: "Polyform2",
        forme: "Sunny",
        formeLetter: "S",
        types: ["Fire"],
        gender: "N",
        baseStats: {
            hp: 98,
            atk: 75,
            def: 90,
            spa: 91,
            spd: 90,
            spe: 65
        },
        abilities: {
            0: "Drought"
        },
        heightm: 0.455,
        weightkg: 16.6,
        color: "Red",
        eggGroups: ["Undiscovered"],
    },
    polyform2sunsnow: {
        num: 7500137,
        species: "Polyform2",
        species: "Polyform2-Sunsnow",
        baseSpecies: "Polyform2",
        forme: "Sunsnow",
        formeLetter: "S",
        types: ["Fire", "Ice"],
        gender: "N",
        baseStats: {
            hp: 98,
            atk: 75,
            def: 90,
            spa: 91,
            spd: 90,
            spe: 65
        },
        abilities: {
            0: "Solar Snow"
        },
        heightm: 0.455,
        weightkg: 16.6,
        color: "White",
        eggGroups: ["Undiscovered"],
    },
    polyform2rainy: {
        num: 7500137,
        species: "Polyform2",
        species: "Polyform2-Rainy",
        baseSpecies: "Polyform2",
        forme: "Rainy",
        formeLetter: "R",
        types: ["Water"],
        gender: "N",
        baseStats: {
            hp: 98,
            atk: 75,
            def: 90,
            spa: 91,
            spd: 90,
            spe: 65
        },
        abilities: {
            0: "Drizzle"
        },
        heightm: 0.455,
        weightkg: 16.6,
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
    polyform2snowy: {
        num: 7500137,
        species: "Polyform2",
        species: "Polyform2-Snowy",
        baseSpecies: "Polyform2",
        forme: "Snowy",
        formeLetter: "S",
        types: ["Ice"],
        gender: "N",
        baseStats: {
            hp: 98,
            atk: 75,
            def: 90,
            spa: 91,
            spd: 90,
            spe: 65
        },
        abilities: {
            0: "Snow Warning"
        },
        heightm: 0.455,
        weightkg: 16.6,
        color: "White",
        eggGroups: ["Undiscovered"],
    },
    polyform2sandy: {
        num: 7500137,
        species: "Polyform2",
        species: "Polyform2-Sandy",
        baseSpecies: "Polyform2",
        forme: "Sandy",
        formeLetter: "S",
        types: ["Rock"],
        gender: "N",
        baseStats: {
            hp: 98,
            atk: 75,
            def: 90,
            spa: 91,
            spd: 90,
            spe: 65
        },
        abilities: {
            0: "Sand Stream"
        },
        heightm: 0.455,
        weightkg: 16.6,
        color: "Brown",
        eggGroups: ["Undiscovered"],
    },
    polyform2tundra: {
        num: 7500137,
        species: "Polyform2",
        species: "Polyform2-Tundra",
        baseSpecies: "Polyform2",
        forme: "Tundra",
        formeLetter: "T",
        types: ["Rock", "Ice"],
        gender: "N",
        baseStats: {
            hp: 98,
            atk: 75,
            def: 90,
            spa: 91,
            spd: 90,
            spe: 65
        },
        abilities: {
            0: "Yeti"
        },
        heightm: 0.455,
        weightkg: 16.6,
        color: "Brown",
        eggGroups: ["Undiscovered"],
    },
    polyform2spooky: {
        num: 7500137,
        species: "Polyform2",
        species: "Polyform2-Spooky",
        baseSpecies: "Polyform2",
        forme: "Spooky",
        formeLetter: "S",
        types: ["Ghost"],
        gender: "N",
        baseStats: {
            hp: 98,
            atk: 75,
            def: 90,
            spa: 91,
            spd: 90,
            spe: 65
        },
        abilities: {
            0: "Haunted Storm"
        },
        heightm: 0.455,
        weightkg: 16.6,
        color: "Purple",
        eggGroups: ["Undiscovered"],
    },
    polyform2pricky: {
        num: 7500137,
        species: "Polyform2",
        species: "Polyform2-Prickly",
        baseSpecies: "Polyform2",
        forme: "Prickly",
        formeLetter: "P",
        types: ["Ghost", "Grass"],
        gender: "N",
        baseStats: {
            hp: 98,
            atk: 75,
            def: 90,
            spa: 91,
            spd: 90,
            spe: 65
        },
        abilities: {
            0: "Cactus Power"
        },
        heightm: 0.455,
        weightkg: 16.6,
        color: "Green",
        eggGroups: ["Undiscovered"],
    },
    swaggy: {
        num: 750183,
        species: "Swaggy",
        types: ["Fighting", "Normal"],
        baseStats: { 
            hp: 55,
            atk: 72,
            def: 70,
            spa: 42,
            spd: 80,
            spe: 58
        },
        abilities: {
            0: "Weather Man"
        },
        heightm: 0.5,
        weightkg: 6.5,
		  evos: ["scraftia"],
        color: "Blue",
        eggGroups: ["Dragon"],
    },
    scraftia: {
        num: 7500138,
        species: "Scraftia",
        types: ["Fighting", "Dragon"],
        baseStats: {
            hp: 80,
            atk: 90,
            def: 112,
            spa: 67,
            spd: 120,
            spe: 79
        },
        abilities: {
            0: "Pure Thug"
        },
        heightm: 1.09,
        weightkg: 25.3,
		  prevo: "swaggy",
		  evoLevel: 37,
        color: "Blue",
		  otherFormes: ["scraftiamega"],
        eggGroups: ["Dragon"],
    },
    scraftiamega: {
        num: 7500138,
        species: "Scraftia-Mega",
        baseSpecies: "Scraftia",
        forme: "Mega",
        formeLetter: "M",
        types: ["Fighting", "Fairy"],
        baseStats: {
            hp: 80,
            atk: 130,
            def: 132,
            spa: 107,
            spd: 120,
            spe: 79
        },
        abilities: {
            0: "Pixilate"
        },
        heightm: 1.49,
        weightkg: 25.3,
        color: "Blue",
        eggGroups: ["Dragon"],
    },
    swooshi: {
        num: 750184,
        species: "Swooshi",
        types: ["Fairy", "Grass"],
        baseStats: { 
            hp: 70,
            atk: 52,
            def: 70,
            spa: 55,
            spd: 70,
            spe: 50
        },
        abilities: {
            0: "Therapeutic"
        },
        heightm: 0.4,
        weightkg: 4,
		  evos: ["slurpum"],
        color: "Pink",
        eggGroups: ["Fairy"],
    },
    slurpum: {
        num: 7500139,
        species: "Slurpum",
        types: ["Fairy", "Fighting"],
        baseStats: {
            hp: 81,
            atk: 115,
            def: 93,
            spa: 82,
            spd: 77,
            spe: 81
        },
        abilities: {
            0: "Therapeutic"
        },
        heightm: 0.99,
        weightkg: 22.1,
		  prevo: "swooshi",
		  evoLevel: 23,
        color: "Pink",
        eggGroups: ["Fairy"],
    },
    thundersaurus: {
        num: 7500140,
        species: "Thundersaurus",
        types: ["Grass", "Electric"],
        gender: "M",
        baseStats: {
            hp: 90,
            atk: 100,
            def: 90,
            spa: 120,
            spd: 90,
            spe: 100
        },
        abilities: {
            0: "Rapid Growth"
        },
        heightm: 1.755,
        weightkg: 80.5,
        color: "Green",
		  otherFormes: ["thundersaurusmega"],
        eggGroups: ["Undiscovered"],
    },
    thundersaurusmega: {
        num: 7500140,
        species: "Thundersaurus-Mega",
        baseSpecies: "Thundersaurus",
        forme: "Mega",
        formeLetter: "M",
        types: ["Grass", "Electric"],
        baseStats: {
            hp: 90,
            atk: 118,
            def: 130,
            spa: 142,
            spd: 110,
            spe: 100
        },
        abilities: {
            0: "Thick Fat"
        },
        heightm: 2.155,
        weightkg: 136,
        color: "Green",
        eggGroups: ["Undiscovered"],
    },
    rhyhoax: {
        num: 750185,
        species: "Rhyhoax",
        types: ["Normal", "Rock"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: { 
            hp: 112,
            atk: 100,
            def: 72,
            spa: 40,
            spd: 72,
            spe: 20
        },
        abilities: {
            0: "Amazing Bulk"
        },
        heightm: 0.8,
        weightkg: 110,
		  evos: ["rhyperlax"],
        color: "Black",
        eggGroups: ["Undiscovered"],
    },
    rhyperlax: {
        num: 7500141,
        species: "Rhyperlax",
        types: ["Normal", "Rock"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 147,
            atk: 135,
            def: 107,
            spa: 70,
            spd: 92,
            spe: 45
        },
        abilities: {
            0: "Amazing Bulk"
        },
        heightm: 2.25,
        weightkg: 371.4,
		  prevo: "rhyhoax",
		  evoLevel: 42,
        color: "Black",
        eggGroups: ["Monster"],
    },
    zunzoon: {
        num: 750186,
        species: "Zunzoon",
        types: ["Normal"],
        baseStats: { 
            hp: 52,
            atk: 63,
            def: 50,
            spa: 42,
            spd: 53,
            spe: 83
        },
        abilities: {
            0: "Dieting Dolt"
        },
        heightm: 0.4,
        weightkg: 11.5,
		  evos: ["lopunoone"],
        color: "Brown",
        eggGroups: ["Field"],
    },
    lopunoone: {
        num: 7500142,
        species: "Lopunoone",
        types: ["Normal"],
        baseStats: {
            hp: 81,
            atk: 83,
            def: 82,
            spa: 62,
            spd: 88,
            spe: 112
        },
        abilities: {
            0: "Dieting Dolt"
        },
        heightm: 0.85,
        weightkg: 32.9,
		  prevo: "zunzoon",
		  evoLevel: 20,
        color: "Brown",
		  otherFormes: ["lopunoonemega"],
        eggGroups: ["Field"],
    },
	    lopunoonemega: {
        num: 7500140,
        species: "Lopunoone-Mega",
        baseSpecies: "Lopunoone",
        forme: "Mega",
        formeLetter: "M",
        types: ["Normal", "Fighting"],
        baseStats: {
            hp: 81,
            atk: 143,
            def: 92,
            spa: 62,
            spd: 88,
            spe: 142
        },
        abilities: {
            0: "Scrappy"
        },
        heightm: 0.95,
        weightkg: 27.9,
        color: "Brown",
        eggGroups: ["Field"],
    },
    hootoise: {
        num: 7500143,
        species: "Hootoise",
        types: ["Water", "Ghost"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 83,
            atk: 96,
            def: 100,
            spa: 130,
            spd: 120,
            spe: 74
        },
        abilities: {
            0: "Mystic Wave"
        },
        heightm: 1.055,
        weightkg: 47.2,
        color: "Purple",
		  otherFormes: ["hootoisemega"],
        eggGroups: ["Undiscovered"],
    },
	 hootoisemega: {
        num: 7500141,
        species: "Hootoise-Mega",
        baseSpecies: "Hootoise",
        forme: "Mega",
        formeLetter: "M",
        types: ["Water", "Ghost"],
        baseStats: {
            hp: 83,
            atk: 116,
            def: 120,
            spa: 180,
            spd: 130,
            spe: 74
        },
        abilities: {
            0: "Mega Launcher"
        },
        heightm: 1.055,
        weightkg: 62.8,
        color: "Purple",
        eggGroups: ["Undiscovered"],
    },
    lietaur: {
        num: 7500144,
        species: "Lietaur",
        types: ["Normal", "Dark"],
        gender: "M",
        baseStats: {
            hp: 79,
            atk: 104,
            def: 82,
            spa: 74,
            spd: 70,
            spe: 118
        },
        abilities: {
            0: "Titanic Strength"
        },
        heightm: 1.245,
        weightkg: 62.9,
        color: "Purple",
        eggGroups: ["Field"],
    },
    laprazone: {
        num: 7500145,
        species: "Laprazone",
        types: ["Ice", "Steel"],
        gender: "N",
        baseStats: {
            hp: 106,
            atk: 77,
            def: 110,
            spa: 110,
            spd: 110,
            spe: 60
        },
        abilities: {
            0: "Hygroscopy"
        },
        heightm: 1.84,
        weightkg: 200,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    fasd: {
        num: 750187,
        species: "Fasd",
        types: ["Water", "Dragon"],
        baseStats: { 
            hp: 41,
            atk: 45,
            def: 40,
            spa: 42,
            spd: 57,
            spe: 74
        },
        abilities: {
            0: "Over the Limit"
        },
        heightm: 0.7,
        weightkg: 12.3,
		  evos: ["hydraulic"],
        color: "Black",
        eggGroups: ["Dragon"],
    },
    hydraulic: {
        num: 7500146,
        species: "Hydraulic",
        types: ["Water", "Dragon"],
        baseStats: {
            hp: 103,
            atk: 92,
            def: 94,
            spa: 122,
            spd: 117,
            spe: 99
        },
        abilities: {
            0: "Wonderlust"
        },
        heightm: 4,
        weightkg: 161,
		  prevo: "fasd",
		  evoLevel: 57,
        color: "Black",
        eggGroups: ["Dragon"],
    },
    klinkle: {
        num: 7500147,
        species: "Klinkle",
        types: ["Electric", "Steel"],
        gender: "N",
        baseStats: {
            hp: 70,
            atk: 75,
            def: 77,
            spa: 77,
            spd: 90,
            spe: 112
        },
        abilities: {
            0: "Charged Up"
        },
        heightm: 0.51,
        weightkg: 42.6,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    beldurogue: {
        num: 750188,
        species: "Beldurogue",
        types: ["Steel", "Fighting"],
        gender: "M",
        baseStats: { 
            hp: 37,
            atk: 60,
            def: 57,
            spa: 35,
            spd: 47,
            spe: 47
        },
        abilities: {
            0: "Reckless Body"
        },
        heightm: 0.65,
        weightkg: 58.1,
		  evos: ["metanlee"],
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
    metanlee: {
        num: 7500148,
        species: "Metanlee",
        types: ["Steel", "Fighting"],
        gender: "M",
        baseStats: {
            hp: 75,
            atk: 138,
            def: 102,
            spa: 65,
            spd: 100,
            spe: 89
        },
        abilities: {
            0: "Reckless Body"
        },
        heightm: 1.55,
        weightkg: 299.9,
		  prevo: "beldurogue",
		  evoLevel: 27,
        color: "Blue",
		  otherFormes: ["metanleemega"],
        eggGroups: ["Undiscovered"],
    },
	 metanleemega: {
        num: 7500148,
        species: "Metanlee-Mega",
        baseSpecies: "Metanlee",
        forme: "Mega",
        formeLetter: "M",
        gender: "M",
        types: ["Steel", "Fighting"],
        baseStats: {
            hp: 75,
            atk: 138,
            def: 102,
            spa: 65,
            spd: 100,
            spe: 89
        },
        abilities: {
            0: "Tough Claws"
        },
        heightm: 2.45,
        weightkg: 692.8,
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
    kangoruskhan: {
        num: 7500149,
        species: "Kangorus-Khan",
        types: ["Normal", "Dragon"],
        gender: "F",
        baseStats: {
            hp: 100,
            atk: 131,
            def: 95,
            spa: 60,
            spd: 85,
            spe: 103
        },
        abilities: {
            0: "Khanqueror"
        },
        heightm: 2.005,
        weightkg: 92.7,
        color: "Yellow",
		  otherFormes: ["kangoruskhanmega"],
        eggGroups: ["Monster"],
    },
    kangoruskhanmega: {
        num: 7500149,
        species: "Kangorus-Khan-Mega",
        baseSpecies: "Kangorus-Khan",
        forme: "Mega",
        formeLetter: "M",
        types: ["Normal", "Dragon"],
        gender: "F",
        baseStats: {
            hp: 100,
            atk: 161,
            def: 115,
            spa: 80,
				spd: 105,
            spe: 113
        },
        abilities: {
            0: "Parental Bond"
        },
        heightm: 2.005,
        weightkg: 112.7,
        color: "Yellow",
        eggGroups: ["Monster"],
    },
    heebleye: {
        num: 7500150,
        species: "Heebleye",
        types: ["Psychic", "Dark"],
        baseStats: {
            hp: 72,
            atk: 85,
            def: 85,
            spa: 105,
            spd: 90,
            spe: 55
        },
        abilities: {
            0: "Synchrostall"
        },
        heightm: 0.75,
        weightkg: 22.7,
        color: "Purple",
		  otherFormes: ["heebleyemega"],
        eggGroups: ["Human-Like"],
    },
	 heebleyemega: {
        num: 7500150,
        species: "Heebleye-Mega",
        baseSpecies: "Heebleye",
        forme: "Mega",
        formeLetter: "M",
        types: ["Psychic", "Dark"],
        baseStats: {
            hp: 72,
            atk: 95,
            def: 135,
            spa: 125,
            spd: 140,
            spe: 25
        },
        abilities: {
            0: "Magic Bounce"
        },
        heightm: 0.75,
        weightkg: 172.7,
        color: "Purple",
        eggGroups: ["Human-Like"],
    },
    crygotran: {
        num: 7500151,
        species: "Crygotran",
        types: ["Ice", "Steel"],
        gender: "N",
        baseStats: {
            hp: 80,
            atk: 70,
            def: 88,
            spa: 120,
            spd: 130,
            spe: 93
        },
        abilities: {
            0: "Permafrost"
        },
        heightm: 1.395,
        weightkg: 289,
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
    dugterra: {
        num: 7500152,
        species: "Dugterra",
        types: ["Fighting", "Ground"],
        baseStats: {
            hp: 73,
            atk: 124,
            def: 70,
            spa: 61,
            spd: 80,
            spe: 134
        },
        abilities: {
            0: "Prison Cell"
        },
        heightm: 1.31,
        weightkg: 146.6,
        color: "Brown",
        eggGroups: ["Undiscovered"],
    },
    garbagorde: {
        num: 7500153,
        species: "Garbagorde",
        types: ["Poison", "Ground"],
        gender: "N",
        baseStats: {
            hp: 105,
            atk: 105,
            def: 105,
            spa: 70,
            spd: 105,
            spe: 85
        },
        abilities: {
            0: "Heavy Armor"
        },
        heightm: 3.455,
        weightkg: 206.1,
        color: "Green",
        eggGroups: ["Undiscovered"],
    },
    cherform: {
        num: 7500154,
        species: "Cherform",
        types: ["Grass", "Normal"],
        baseStats: {
            hp: 80,
            atk: 75,
            def: 80,
            spa: 88,
            spd: 84,
            spe: 87
        },
        abilities: {
            0: "Weather Front"
        },
        heightm: 0.405,
        weightkg: 5,
        color: "Gray",
        eggGroups: ["Fairy"],
     	  otherFormes: ["cherformsunny", "cherformrainy", "cherformsnowy", "cherformsandy", "cherformspooky", "cherformprickly"],
    },
    cherformsunny: {
        num: 7500154,
        species: "Cherform-Sunny",
        baseSpecies: "Cherform",
        forme: "Sunny",
        formeLetter: "S",
        types: ["Grass", "Fire"],
        baseStats: {
            hp: 80,
            atk: 75,
            def: 80,
            spa: 88,
            spd: 84,
            spe: 87
        },
        abilities: {
            0: "Weather Front"
        },
        heightm: 0.405,
        weightkg: 5,
        color: "Red",
        eggGroups: ["Fairy"],
    },
    cherformrainy: {
        num: 7500154,
        species: "Cherform-Rainy",
        baseSpecies: "Cherform",
        forme: "Rainy",
        formeLetter: "R",
        types: ["Grass", "Water"],
        baseStats: {
            hp: 80,
            atk: 75,
            def: 80,
            spa: 88,
            spd: 84,
            spe: 87
        },
        abilities: {
            0: "Weather Front"
        },
        heightm: 0.405,
        weightkg: 5,
        color: "Blue",
        eggGroups: ["Fairy"],
    },
    cherformsnowy: {
        num: 7500154,
        species: "Cherform-Snowy",
        baseSpecies: "Cherform",
        forme: "Snowy",
        formeLetter: "S",
        types: ["Grass", "Ice"],
        baseStats: {
            hp: 80,
            atk: 75,
            def: 80,
            spa: 88,
            spd: 84,
            spe: 87
        },
        abilities: {
            0: "Weather Front"
        },
        heightm: 0.405,
        weightkg: 5,
        color: "White",
        eggGroups: ["Fairy"],
    },
    cherformsandy: {
        num: 7500154,
        species: "Cherform-Sandy",
        baseSpecies: "Cherform",
        forme: "Sandy",
        formeLetter: "S",
        types: ["Grass", "Rock"],
        baseStats: {
            hp: 80,
            atk: 75,
            def: 80,
            spa: 88,
            spd: 84,
            spe: 87
        },
        abilities: {
            0: "Weather Front"
        },
        heightm: 0.405,
        weightkg: 5,
        color: "Brown",
        eggGroups: ["Fairy"],
    },
    cherformspooky: {
        num: 7500154,
        species: "Cherform-Spooky",
        baseSpecies: "Cherform",
        forme: "Spooky",
        formeLetter: "S",
        types: ["Grass", "Ghost"],
        baseStats: {
            hp: 80,
            atk: 75,
            def: 80,
            spa: 88,
            spd: 84,
            spe: 87
        },
        abilities: {
            0: "Weather Front"
        },
        heightm: 0.405,
        weightkg: 5,
        color: "Purple",
        eggGroups: ["Fairy"],
    },
    cherformprickly: {
        num: 7500154,
        species: "Cherform-Prickly",
        baseSpecies: "Cherform",
        forme: "Prickly",
        formeLetter: "P",
        types: ["Grass"],
        baseStats: {
            hp: 80,
            atk: 75,
            def: 80,
            spa: 88,
            spd: 84,
            spe: 87
        },
        abilities: {
            0: "Weather Front"
        },
        heightm: 0.405,
        weightkg: 5,
        color: "Green",
        eggGroups: ["Fairy"],
    },
    porymask: {
        num: 750189,
        species: "Porymask",
        types: ["Normal", "Ghost"],
        gender: "N",
        baseStats: { 
            hp: 55,
            atk: 45,
            def: 85,
            spa: 73,
            spd: 85,
            spe: 35
        },
        abilities: {
            0: "Negative Body"
        },
        heightm: 0.65,
        weightkg: 19,
		  evos: ["porygrigus"],
        color: "Black",
        eggGroups: ["Mineral"],
    },
    porygrigus: {
        num: 7500155,
        species: "Porygrigus",
        types: ["Normal", "Ghost"],
        gender: "N",
        baseStats: {
            hp: 90,
            atk: 65,
            def: 130,
            spa: 108,
            spd: 100,
            spe: 45
        },
        abilities: {
            0: "Negative Body"
        },
        heightm: 1.155,
        weightkg: 54.5,
		  prevo: "porymask",
		  evoLevel: 34,
        color: "Yellow",
        eggGroups: ["Mineral"],
    },
    zoroldeo: {
        num: 7500156,
        species: "Zoroldeo",
        types: ["Dark", "Fighting"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 75,
            atk: 106,
            def: 81,
            spa: 125,
            spd: 81,
            spe: 115
        },
        abilities: {
            0: "Justice Illusion"
        },
		  heightm: 1.5,
        weightkg: 64.8,
        color: "Yellow",
		  eggGroups: ["Undiscovered"],
    },
    stundos: {
        num: 7500157,
        species: "Stundos",
        types: ["Ground", "Electric"],
        baseStats: {
            hp: 110,
            atk: 88,
            def: 115,
            spa: 123,
            spd: 115,
            spe: 76
        },
        abilities: {
            0: "Power Drain"
        },
        heightm: 1.155,
        weightkg: 31.8,
        color: "Brown",
        eggGroups: ["Undiscovered"],
    },
    mallo: {
        num: 750190,
        species: "Mallo",
        types: ["Fire", "Water"],
        baseStats: { 
            hp: 55,
            atk: 45,
            def: 85,
            spa: 73,
            spd: 85,
            spe: 35
        },
        abilities: {
            0: "Negative Body"
        },
        heightm: 0.5,
        weightkg: 20.6,
		  evos: ["macaroon"],
        color: "Red",
        eggGroups: ["Amorphous"],
    },
	macaroon: {
        num: 7500158,
        species: "Macaroon",
        types: ["Fire", "Ground"],
        baseStats: {
            hp: 90,
            atk: 86,
            def: 104,
            spa: 96,
            spd: 91,
            spe: 44
        },
        abilities: {
            0: "Steam Sauna"
        },
        heightm: 0.84,
        weightkg: 42.4,
		  prevo: "mallo",
		  evoLevel: 34,
        color: "Red",
        eggGroups: ["Amorphous"],
    },
    dank: {
        num: 7500159,
        species: "Dank",
        types: ["Dark", "Fairy"],
        gender: "N",
        baseStats: {
            hp: 70,
            atk: 70,
            def: 120,
            spa: 107,
            spd: 120,
            spe: 102
        },
        abilities: {
            0: "Smoke Body"
        },
        heightm: 0.9,
        weightkg: 28.1,
        color: "Black",
        eggGroups: ["Undiscovered"],
    },
    ponypom: {
        num: 750191,
        species: "Ponypom",
        types: ["Normal", "Fire"],
        baseStats: { 
            hp: 62,
            atk: 97,
            def: 65,
            spa: 72,
            spd: 70,
            spe: 97
        },
        abilities: {
            0: "Run Away"
        },
        heightm: 0.9,
        weightkg: 20.7,
		  evos: ["rapipom"],
        color: "Purple",
        eggGroups: ["Field"],
    },
    rapipom: {
        num: 7500160,
        species: "Rapipom",
        types: ["Normal", "Fire"],
        baseStats: {
            hp: 80,
            atk: 110,
            def: 78,
            spa: 80,
            spd: 83,
            spe: 120
        },
        abilities: {
            0: "Strike and Pass"
        },
        heightm: 1.445,
        weightkg: 57.6,
		  prevo: "ponypom",
		  evoLevel: 40,
        color: "Purple",
        eggGroups: ["Field"],
    },
    tiniwag: {
        num: 750192,
        species: "Tiniwag",
        types: ["Dragon", "Water"],
        baseStats: { 
            hp: 54,
            atk: 70,
            def: 50,
            spa: 50,
            spd: 50,
            spe: 75
        },
        abilities: {
            0: "Marvelous Diver"
        },
        heightm: 1.2,
        weightkg: 7.8,
		  evos: ["whirlagon"],
        color: "Blue",
        eggGroups: ["Water 1"],
    },
    whirlagon: {
        num: 750193,
        species: "Whirlagon",
        types: ["Dragon", "Water"],
        baseStats: { 
            hp: 73,
            atk: 84,
            def: 75,
            spa: 70,
            spd: 70,
            spe: 90
        },
        abilities: {
            0: "Marvelous Diver"
        },
        heightm: 2.5,
        weightkg: 18.25,
		  prevo: "tiniwag",
		  evos: ["tadpole"],
		  evoLevel: 27,
        color: "Blue",
        eggGroups: ["Water 1"],
    },
    tadpole: {
        num: 7500161,
        species: "Tadpole",
        types: ["Dragon", "Water"],
        baseStats: {
            hp: 100,
            atk: 124,
            def: 105,
            spa: 95,
            spd: 105,
            spe: 85
        },
        abilities: {
            0: "Power Forward"
        },
        heightm: 1.755,
        weightkg: 132,
		  prevo: "whirlagon",
		  evoLevel: 55,
        color: "Brown",
        eggGroups: ["Water 1"],
    },
    draegarados: {
        num: 7500162,
        species: "Draegarados",
        types: ["Poison", "Water"],
        baseStats: {
            hp: 90,
            atk: 110,
            def: 95,
            spa: 89,
            spd: 122,
            spe: 73
        },
        abilities: {
            0: "Venom Glare"
        },
        heightm: 4.15,
        weightkg: 158.2,
        color: "Brown",
		  otherFormes: ["draegaradosmega"],
        eggGroups: ["Dragon"],
    },
    draegaradosmega: {
        num: 7500162,
        species: "Draegarados-Mega",
        baseSpecies: "Draegarados",
        forme: "Mega",
        formeLetter: "M",
        types: ["Poison", "Dark"],
        baseStats: {
            hp: 90,
            atk: 140,
            def: 125,
            spa: 99,
            spd: 152,
            spe: 73
        },
        abilities: {
            0: "Mold Breaker"
        },
        heightm: 4.15,
        weightkg: 228.2,
        color: "Brown",
        eggGroups: ["Dragon"],
    },
    grangoro: {
        num: 7500163,
        species: "Grangoro",
        types: ["Dark", "Fairy"],
        genderRatio: {
            M: 0.375,
            F: 0.625
        },
        baseStats: {
            hp: 102,
            atk: 132,
            def: 86,
            spa: 74,
            spd: 75,
            spe: 61
        },
        abilities: {
            0: "Terrorize"
        },
        heightm: 1.755,
        weightkg: 92.3,
        color: "Purple",
        eggGroups: ["Field"],
    },
    babuffe: {
        num: 7500164,
        species: "Babuffe",
        types: ["Ghost", "Psychic"],
        baseStats: {
            hp: 137,
            atk: 84,
            def: 71,
            spa: 68,
            spd: 70,
            spe: 59
        },
        abilities: {
            0: "Toll Booth"
        },
        heightm: 1.195,
        weightkg: 20.5,
        color: "Black",
		  otherFormes: ["babuffemega"],
        eggGroups: ["Amorphous"],
    },
    babuffemega: {
        num: 7500164,
        species: "Babuffe-Mega",
        baseSpecies: "Babuffe",
        forme: "Mega",
        formeLetter: "M",
        types: ["Ghost", "Psychic"],
        baseStats: {
            hp: 137,
            atk: 134,
            def: 81,
            spa: 78,
            spd: 90,
            spe: 69
        },
        abilities: {
            0: "Toll Booth"
        },
        heightm: 1.195,
        weightkg: 20.5,
        color: "Black",
        eggGroups: ["Amorphous"],
    },
    galionz: {
        num: 7500165,
        species: "Galion-Z",
        types: ["Normal", "Ice"],
        gender: "N",
        baseStats: {
            hp: 82,
            atk: 80,
            def: 75,
            spa: 137,
            spd: 92,
            spe: 115
        },
        abilities: {
            0: "Adapting Body"
        },
        heightm: 1.195,
        weightkg: 145.2,
        color: "Red",
		  otherFormes: ["galionzmega"],
        eggGroups: ["Mineral"],
    },
    galionzmega: {
        num: 7500164,
        species: "Galion-Z-Mega",
        baseSpecies: "Galion-Z",
        forme: "Mega",
        formeLetter: "M",
        types: ["Normal", "Ice"],
        gender: "N",
        baseStats: {
            hp: 82,
            atk: 120,
            def: 75,
            spa: 177,
            spd: 92,
            spe: 135
        },
        abilities: {
            0: "Refrigerate"
        },
        heightm: 1.195,
        weightkg: 145.2,
        color: "Red",
        eggGroups: ["Mineral"],
    },
    steelweez: {
        num: 7500166,
        species: "Steelweez",
        types: ["Poison", "Steel"],
        gender: "N",
        baseStats: {
            hp: 82,
            atk: 82,
            def: 145,
            spa: 80,
            spd: 130,
            spe: 55
        },
        abilities: {
            0: "Clear Levitation"
        },
        heightm: 1.55,
        weightkg: 107.2,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    thundurbee: {
        num: 7500167,
        species: "Thundurbee",
        types: ["Bug", "Electric"],
        gender: "M",
        baseStats: {
            hp: 72,
            atk: 120,
            def: 55,
            spa: 85,
            spd: 90,
            spe: 105
        },
        abilities: {
            0: "Stunning Bug"
        },
        heightm: 1.245,
        weightkg: 45.2,
        color: "Yellow",
		  otherFormes: ["thundurbeemega"],
        eggGroups: ["Undiscovered"],
    },
    thundurbeemega: {
        num: 7500167,
        species: "Thundurbee-Mega",
        baseSpecies: "Thundurbee",
        forme: "Mega",
        formeLetter: "M",
        types: ["Bug", "Electric"],
        gender: "M",
        baseStats: {
            hp: 72,
            atk: 180,
            def: 55,
            spa: 55,
            spd: 90,
            spe: 175
        },
        abilities: {
            0: "Adaptability"
        },
        heightm: 1.645,
        weightkg: 45.2,
        color: "Yellow",
        eggGroups: ["Undiscovered"],
    },
    gallatross: {
        num: 7500168,
        species: "Gallatross",
        types: ["Electric", "Fighting"],
        gender: "M",
        baseStats: {
            hp: 86,
            atk: 130,
            def: 82,
            spa: 95,
            spd: 107,
            spe: 75
        },
        abilities: {
            0: "Ground Drive"
        },
        heightm: 1.855,
        weightkg: 66.2,
        color: "Blue",
		  otherFormes: ["gallatrossmega"],
        eggGroups: ["Amorphous"],
    },
    gallatrossmega: {
        num: 7500168,
        species: "Gallatross-Mega",
        baseSpecies: "Gallatross",
        forme: "Mega",
        formeLetter: "M",
        types: ["Electric", "Fighting"],
        gender: "M",
        baseStats: {
            hp: 86,
            atk: 170,
            def: 112,
            spa: 95,
            spd: 107,
            spe: 105
        },
        abilities: {
            0: "Ground Drive"
        },
        heightm: 1.855,
        weightkg: 66.2,
        color: "Blue",
        eggGroups: ["Amorphous"],
    },
    victant: {
        num: 7500169,
        species: "Victant",
        types: ["Bug", "Fire"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 85,
            atk: 111,
            def: 110,
            spa: 74,
            spd: 85,
            spe: 116
        },
        abilities: {
            0: "Champion"
        },
        heightm: 0.355,
        weightkg: 18.5,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    rosetteeternal: {
        num: 7500170,
        species: "Rosette-Eternal",
        types: ["Fairy", "Poison"],
        gender: "F",
        baseStats: {
            hp: 77,
            atk: 67,
            def: 65,
            spa: 135,
            spd: 126,
            spe: 101
        },
        abilities: {
            0: "Poison Veil"
        },
        heightm: 0.545,
        weightkg: 7.7,
        color: "Green",
        eggGroups: ["Undiscovered"],
    },
    burrabuzz: {
        num: 750101,
        species: "Burrabuzz",
        types: ["Fighting", "Electric"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 85,
            atk: 104,
            def: 81,
            spa: 77,
            spd: 77,
            spe: 72
        },
        abilities: {
            0: "Top Gear"
        },
        heightm: 1.15,
        weightkg: 35,
        color: "Brown",
		  evos: ["conkelvire"],
		  fusion: ["Gurdurr", "Electabuzz"],
        eggGroups: ["Human-Like"],
    },
    conkelvire: {
        num: 7500171,
        species: "Conkelvire",
        types: ["Fighting", "Electric"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 100,
            atk: 141,
            def: 91,
            spa: 85,
            spd: 85,
            spe: 80
        },
        abilities: {
            0: "Top Gear"
        },
        heightm: 1.6,
        weightkg: 112.8,
        color: "Brown",
        eggGroups: ["Human-Like"],
    },
    landia: {
        num: 7500172,
        species: "Landia",
        types: ["Dragon", "Flying"],
        baseStats: {
            hp: 86,
            atk: 105,
            def: 100,
            spa: 75,
            spd: 107,
            spe: 74
        },
        abilities: {
            0: "Dragon Hide"
        },
        heightm: 1.345,
        weightkg: 79.8,
        color: "Blue",
		  otherFormes: ["landiamega"],
        eggGroups: ["Dragon"],
    },
    landiamega: {
        num: 7500172,
        species: "Landia-Mega",
        baseSpecies: "Landia",
        forme: "Mega",
        formeLetter: "M",
        types: ["Dragon", "Fairy"],
        baseStats: {
            hp: 86,
            atk: 145,
            def: 120,
            spa: 115,
            spd: 107,
            spe: 74
        },
        abilities: {
            0: "Dragon Hide"
        },
        heightm: 1.745,
        weightkg: 79.8,
        color: "Blue",
        eggGroups: ["Dragon"],
    },
    odelay: {
        num: 7500173,
        species: "Odelay",
        types: ["Water", "Rock"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 78,
            atk: 91,
            def: 148,
            spa: 93,
            spd: 86,
            spe: 66
        },
        abilities: {
            0: "Horsetail Armor"
        },
        heightm: 1.5,
        weightkg: 96.45,
        color: "Purple",
        eggGroups: ["Water 3"],
    },
    thundercast: {
        num: 7500174,
        species: "Thundercast",
        types: ["Electric", "Normal"],
        gender: "M",
        baseStats: {
            hp: 74,
            atk: 102,
            def: 70,
            spa: 107,
            spd: 75,
            spe: 110
        },
        abilities: {
            0: "Weather Caster"
        },
        heightm: 0.9,
        weightkg: 30.9,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    sceptetteeternal: {
        num: 7500175,
        species: "Sceptette-Eternal",
        types: ["Fairy", "Grass"],
        gender: "F",
        baseStats: {
            hp: 72,
            atk: 75,
            def: 66,
            spa: 125,
            spd: 116,
            spe: 126
        },
        abilities: {
            0: "Surge Bloom"
        },
        heightm: 0.95,
        weightkg: 26.55,
        color: "White",
		  otherFormes: ["sceptetteeternalmega"],
        eggGroups: ["Undiscovered"],
    },
    sceptetteeternalmega: {
        num: 7500175,
        species: "Sceptette-Eternal-Mega",
        baseSpecies: "Sceptette-Eternal",
        forme: "Mega",
        formeLetter: "M",
        types: ["Fairy", "Dragon"],
        gender: "F",
        baseStats: {
            hp: 72,
            atk: 100,
            def: 76,
            spa: 165,
            spd: 126,
            spe: 151
        },
        abilities: {
            0: "Lightning Rod"
        },
        heightm: 0.95,
        weightkg: 26.55,
        color: "White",
        eggGroups: ["Undiscovered"],
    },
    raillink: {
        num: 7500176,
        species: "Rail Link",
        types: ["Normal", "Water"],
        baseStats: {
            hp: 170,
            atk: 135,
            def: 82,
            spa: 102,
            spd: 65,
            spe: 90
        },
        abilities: {
            0: "Choo Choo"
        },
        heightm: 8.255,
        weightkg: 264.25,
        color: "Blue",
        eggGroups: ["Field"],
    },
    agrippa: {
        num: 7500177,
        species: "Agrippa",
        types: ["Fighting", "Steel"],
        baseStats: {
            hp: 90,
            atk: 134,
            def: 99,
            spa: 74,
            spd: 80,
            spe: 74
        },
        abilities: {
            0: "Caestus"
        },
        heightm: 1.855,
        weightkg: 103,
        color: "Red",
        eggGroups: ["Human-Like"],
    },
    basculinbasculin: {
        num: 550,
        species: "Basculin-Basculin",
        baseSpecies: "Basculin",
        forme: "Basculin",
        formeLetter: "B",
        types: ["Water"],
        baseStats: {
            hp: 80,
            atk: 102,
            def: 75,
            spa: 90,
            spd: 65,
            spe: 108
        },
        abilities: {
            0: "Fusion Powered"
        },
        heightm: 1,
        weightkg: 18,
        color: "Green",
        eggGroups: ["Water 2"],
    },
    mewelli: {
        num: 7500179,
        species: "Mewelli",
        types: ["Water", "Psychic"],
        baseStats: {
            hp: 100,
            atk: 97,
            def: 102,
            spa: 97,
            spd: 102,
            spe: 81
        },
        abilities: {
            0: "Unparalleled Technique"
        },
        heightm: 1.31,
        weightkg: 69.5,
        color: "White",
        eggGroups: ["Undiscovered"],
    },
    bael: {
        num: 7500180,
        species: "Bael",
        types: ["Ghost", "Dragon"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 86,
            atk: 110,
            def: 100,
            spa: 82,
            spd: 88,
            spe: 100
        },
        abilities: {
            0: "Obliterate"
        },
        heightm: 3.045,
        weightkg: 158.75,
        color: "Black",
		  otherFormes: ["baelmega"],
        eggGroups: ["Undiscovered"],
    },
    baelmega: {
        num: 7500180,
        species: "Bael-Mega",
        baseSpecies: "Bael",
        forme: "Mega",
        formeLetter: "M",
        types: ["Ghost", "Dragon"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 86,
            atk: 160,
            def: 110,
            spa: 92,
            spd: 108,
            spe: 110
        },
        abilities: {
            0: "Prankster"
        },
        heightm: 3.145,
        weightkg: 159.25,
        color: "Black",
        eggGroups: ["Undiscovered"],
    },
    simigoat: {
        num: 7500181,
        species: "Simigoat",
        types: ["Fire", "Grass"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 109,
            atk: 109,
            def: 72,
            spa: 107,
            spd: 82,
            spe: 94
        },
        abilities: {
            0: "Vegetarian"
        },
        heightm: 1.345,
        weightkg: 59.5,
        color: "Red",
        eggGroups: ["Field"],
    },
    miltrank: {
        num: 7500182,
        species: "Miltrank",
        types: ["Normal", "Steel"],
        gender: "F",
        baseStats: {
            hp: 101,
            atk: 105,
            def: 105,
            spa: 85,
            spd: 100,
            spe: 88
        },
        abilities: {
            0: "Thermogenesis"
        },
        heightm: 1.445,
        weightkg: 252.75,
        color: "Brown",
        eggGroups: ["Undiscovered"],
    },
    furfraught: {
        num: 7500183,
        species: "Furfraught",
        types: ["Normal", "Fighting"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 91,
            atk: 103,
            def: 101,
            spa: 79,
            spd: 92,
            spe: 93
        },
        abilities: {
            0: "Shaggy Coat"
        },
        heightm: 1.395,
        weightkg: 59,
        color: "White",
        eggGroups: ["Field"],
    },
    tyranking: {
        num: 7500184,
        species: "Tyranking",
        types: ["Rock", "Poison"],
        gender: "M",
        baseStats: {
            hp: 100,
            atk: 128,
            def: 103,
            spa: 100,
            spd: 97,
            spe: 83
        },
        abilities: {
            0: "Venom Stream"
        },
        heightm: 1.705,
        weightkg: 132,
        color: "Green",
		  otherFormes: ["tyrankingmega"],
        eggGroups: ["Monster"],
    },
    tyrankingmega: {
        num: 7500184,
        species: "Tyranking-Mega",
        baseSpecies: "Tyranking",
        forme: "Mega",
        formeLetter: "M",
        types: ["Rock", "Poison"],
        gender: "M",
        baseStats: {
            hp: 100,
            atk: 158,
            def: 143,
            spa: 100,
            spd: 117,
            spe: 93
        },
        abilities: {
            0: "Sand Stream"
        },
        heightm: 2.205,
        weightkg: 185,
        color: "Green",
        eggGroups: ["Monster"],
    },
    supermuk: {
        num: 7500185,
        species: "Supermuk",
        types: ["Ghost", "Poison"],
        baseStats: {
            hp: 105,
            atk: 112,
            def: 108,
            spa: 71,
            spd: 97,
            spe: 62
        },
        abilities: {
            0: "Golden Touch"
        },
        heightm: 1.445,
        weightkg: 34.5,
        color: "Purple",
        eggGroups: ["Amorphous"],
    },
    mentor: {
        num: 7500186,
        species: "Mentor",
        types: ["Ghost", "Steel"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 82,
            atk: 117,
            def: 132,
            spa: 80,
            spd: 132,
            spe: 57
        },
        abilities: {
            0: "Black Hole"
        },
        heightm: 1.905,
        weightkg: 328.3,
        color: "Black",
		  otherFormes: ["mentormega"],
        eggGroups: ["Undiscovered"],
    },
    mentormega: {
        num: 7500186,
        species: "Mentor-Mega",
        baseSpecies: "Mentor",
        forme: "Mega",
        formeLetter: "M",
        types: ["Ghost", "Steel"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 82,
            atk: 127,
            def: 152,
            spa: 90,
            spd: 152,
            spe: 97
        },
        abilities: {
            0: "Tough Claws"
        },
        heightm: 2.805,
        weightkg: 721.2,
        color: "Black",
        eggGroups: ["Undiscovered"],
    },
    elektra: {
        num: 7500187,
        species: "Elektra",
        types: ["Psychic", "Electric"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 57,
            atk: 50,
            def: 57,
            spa: 127,
            spd: 87,
            spe: 150
        },
        abilities: {
            0: "Echo"
        },
        heightm: 1.345,
        weightkg: 57.3,
        color: "Yellow",
		  otherFormes: ["elektramega"],
        eggGroups: ["Undiscovered"],
    },
    elektramega: {
        num: 7500187,
        species: "Elektra-Mega",
        baseSpecies: "Elektra",
        forme: "Mega",
        formeLetter: "M",
        types: ["Psychic", "Electric"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 57,
            atk: 50,
            def: 77,
            spa: 167,
            spd: 97,
            spe: 180
        },
        abilities: {
            0: "Trace"
        },
        heightm: 1.045,
        weightkg: 57.3,
        color: "Yellow",
        eggGroups: ["Undiscovered"],
    },
    escagon: {
        num: 7500188,
        species: "Escagon",
        types: ["Dragon", "Steel"],
        baseStats: {
            hp: 85,
            atk: 128,
            def: 103,
            spa: 80,
            spd: 103,
            spe: 70
        },
        abilities: {
            0: "Hyper Protection"
        },
        heightm: 1.5,
        weightkg: 57.5,
        color: "Gray",
        eggGroups: ["Bug"],
    },
    golmanitan: {
        num: 7500189,
        species: "Golmanitan",
        types: ["Ground", "Fire"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 100,
            atk: 142,
            def: 70,
            spa: 43,
            spd: 70,
            spe: 95
        },
        abilities: {
            0: "Careless Force"
        },
        heightm: 2.045,
        weightkg: 211.45,
        color: "Red",
        eggGroups: ["Undiscovered"],
    },
    sunflorrim: {
        num: 7500190,
        species: "Sunflorrim",
        types: ["Grass"],
        baseStats: {
            hp: 82,
            atk: 77,
            def: 72,
            spa: 106,
            spd: 91,
            spe: 67
        },
        abilities: {
            0: "Photosynthetic Grace"
        },
        heightm: 0.65,
        weightkg: 8.9,
        color: "Yellow",
        eggGroups: ["Grass"],
    },
    unconventional: {
        num: 7500191,
        species: "Unconventional",
        types: ["Fire", "Rock"],
        gender: "N",
        baseStats: {
            hp: 87,
            atk: 82,
            def: 100,
            spa: 132,
            spd: 87,
            spe: 70
        },
        abilities: {
            0: "Sand Slurp"
        },
        heightm: 1.345,
        weightkg: 181.5,
        color: "Yellow",
        eggGroups: ["Undiscovered"],
    },
    ambiccino: {
        num: 7500192,
        species: "Ambiccino",
        genderRatio: {M: 0.375, F: 0.625},
        baseStats: {
            hp: 90,
            atk: 113,
            def: 78,
            spa: 78,
            spd: 78,
            spe: 130
        },
        abilities: {
            0: "Technician"
        },
        heightm: 0.85,
        weightkg: 13.9,
        color: "Gray",
        eggGroups: ["Field"],
    },
    parp: {
        num: 7500193,
        species: "Parp",
        types: ["Normal", "Dark"],
        baseStats: {
            hp: 74,
            atk: 89,
            def: 65,
            spa: 86,
            spd: 67,
            spe: 120
        },
        abilities: {
            0: "Completely Serious"
        },
        heightm: 1.04,
        weightkg: 34.75,
        color: "Purple",
        eggGroups: ["Field"],
    },
    zyflare: {
        num: 7500194,
        species: "Zyflare",
        types: ["Fire", "Dragon"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 106,
            atk: 120,
            def: 90,
            spa: 100,
            spd: 115,
            spe: 80
        },
        abilities: {
            0: "Sun Aura"
        },
        heightm: 2.945,
        weightkg: 165,
        color: "Black",
        eggGroups: ["Undiscovered"],
    },
    probs: {
        num: 7500195,
        species: "Probs",
        types: ["Dragon", "Steel"],
        gender: "F",
        baseStats: {
            hp: 90,
            atk: 67,
            def: 122,
            spa: 92,
            spd: 140,
            spe: 90
        },
        abilities: {
            0: "Mine Field"
        },
        heightm: 1.4,
        weightkg: 190,
        color: "Gray",
		  otherFormes: ["probsmega"],
        eggGroups: ["Undiscovered"],
    },
    probsmega: {
        num: 7500195,
        species: "Probs-Mega",
        baseSpecies: "Probs",
        forme: "Mega",
        formeLetter: "M",
        types: ["Dragon", "Steel"],
        gender: "F",
        baseStats: {
            hp: 90,
            atk: 87,
            def: 152,
            spa: 122,
            spd: 160,
            spe: 90
        },
        abilities: {
            0: "Levitate"
        },
        heightm: 1.4,
        weightkg: 190,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    hentai: {
        num: 7500196,
        species: "Hentai",
        types: ["Poison", "Fire"],
        baseStats: {
            hp: 90,
            atk: 80,
            def: 88,
            spa: 120,
            spd: 120,
            spe: 98
        },
        abilities: {
            0: "Greek Fire"
        },
        heightm: 1.65,
        weightkg: 242.5,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    tornastar: {
        num: 7500197,
        species: "Tornastar",
        types: ["Flying", "Water"],
        gender: "M",
        baseStats: {
            hp: 80,
            atk: 90,
            def: 100,
            spa: 131,
            spd: 90,
            spe: 85
        },
        abilities: {
            0: "Tropical Storm"
        },
        heightm: 1.245,
        weightkg: 49,
        color: "Green",
        eggGroups: ["Undiscovered"],
    },
    magmovire: {
        num: 7500198,
        species: "Magmovire",
        types: ["Fire", "Electric"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 85,
            atk: 119,
            def: 77,
            spa: 120,
            spd: 100,
            spe: 99
        },
        abilities: {
            0: "Flame Drive"
        },
        heightm: 1.7,
        weightkg: 103.3,
        color: "Red",
        eggGroups: ["Human-Like"],
    },
    volgon: {
        num: 7500199,
        species: "Volgon",
        types: ["Ground", "Electric"],
        baseStats: {
            hp: 93,
            atk: 100,
            def: 100,
            spa: 127,
            spd: 92,
            spe: 86
        },
        abilities: {
            0: "Levitate"
        },
        heightm: 1.755,
        weightkg: 63.5,
        color: "Blue",
        eggGroups: ["Bug"],
    },
    tapuloom: {
        num: 7500200,
        species: "Tapu Loom",
        types: ["Grass", "Fighting"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 85,
            atk: 140,
            def: 100,
            spa: 75,
            spd: 80,
            spe: 75
        },
        abilities: {
            0: "Grassy Heal"
        },
        heightm: 1.55,
        weightkg: 42.35,
        color: "Green",
        eggGroups: ["Undiscovered"],
    },
    lucashadow: {
        num: 7500201,
        species: "Lucashadow",
        types: ["Fighting", "Ghost"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 80,
            atk: 131,
            def: 80,
            spa: 110,
            spd: 80,
            spe: 120
        },
        abilities: {
            0: "Eye of Horus"
        },
        heightm: 0.95,
        weightkg: 38.1,
        color: "Gray",
		  otherFormes: ["lucashadowmega"],
        eggGroups: ["Undiscovered"],
    },
    lucashadowmega: {
        num: 7500201,
        species: "Lucashadow-Mega",
        baseSpecies: "Lucashadow",
        forme: "Mega",
        formeLetter: "M",
        types: ["Fighting", "Ghost"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 80,
            atk: 166,
            def: 98,
            spa: 135,
            spd: 80,
            spe: 142
        },
        abilities: {
            0: "Adaptability"
        },
        heightm: 1.05,
        weightkg: 41.6,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    cradilego: {
        num: 7500202,
        species: "Cradilego",
        types: ["Poison", "Grass"],
        gender: "N",
        baseStats: {
            hp: 102,
            atk: 67,
            def: 86,
            spa: 121,
            spd: 123,
            spe: 74
        },
        abilities: {
            0: "Insidious Tentacles"
        },
        heightm: 1.345,
        weightkg: 57.95,
        color: "White",
        eggGroups: ["Undiscovered"],
    },
    astrolith: {
        num: 7500203,
        species: "Astrolith",
		  baseForme: "Clear",
        types: ["Rock", "Normal"],
        gender: "N",
        baseStats: {
            hp: 85,
            atk: 75,
            def: 85,
            spa: 75,
            spd: 85,
            spe: 65
        },
        abilities: {
            0: "Cosmology"
        },
        heightm: 0.3,
        weightkg: 20.4,
        color: "Brown",
        eggGroups: ["Undiscovered"],
     	  otherFormes: ["astrolithstar", "astrolithcomet", "astrolithneutron", "astrolithmeteor", "astrolithnova"],
    },
    astrolithstar: {
        num: 7500203,
        species: "Astrolith-Star",
        baseSpecies: "Astrolith",
        forme: "Star",
        formeLetter: "S",
        types: ["Rock", "Fire"],
        gender: "N",
        baseStats: {
            hp: 85,
            atk: 115,
            def: 45,
            spa: 115,
            spd: 45,
            spe: 125
        },
        abilities: {
            0: "Cosmology"
        },
        heightm: 0.3,
        weightkg: 0.55,
        color: "Red",
        eggGroups: ["Undiscovered"],
    },
    astrolithcomet: {
        num: 7500203,
        species: "Astrolith-Comet",
        baseSpecies: "Astrolith",
        forme: "Comet",
        formeLetter: "C",
        types: ["Rock", "Water"],
        gender: "N",
        baseStats: {
            hp: 85,
            atk: 115,
            def: 45,
            spa: 115,
            spd: 45,
            spe: 125
        },
        abilities: {
            0: "Cosmology"
        },
        heightm: 0.3,
        weightkg: 0.55,
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
    astrolithneutron: {
        num: 7500203,
        species: "Astrolith-Neutron",
        baseSpecies: "Astrolith",
        forme: "Neutron",
        formeLetter: "N",
        types: ["Rock", "Ice"],
        gender: "N",
        baseStats: {
            hp: 85,
            atk: 115,
            def: 45,
            spa: 115,
            spd: 45,
            spe: 125
        },
        abilities: {
            0: "Cosmology"
        },
        heightm: 0.3,
        weightkg: 0.55,
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
    astrolithmeteor: {
        num: 7500203,
        species: "Astrolith-Meteor",
        baseSpecies: "Astrolith",
        forme: "Meteor",
        formeLetter: "M",
        types: ["Rock", "Flying"],
        gender: "N",
        baseStats: {
            hp: 85,
            atk: 115,
            def: 45,
            spa: 115,
            spd: 45,
            spe: 125
        },
        abilities: {
            0: "Cosmology"
        },
        heightm: 0.3,
        weightkg: 0.55,
        color: "Red",
        eggGroups: ["Undiscovered"],
    },
    astrolithnova: {
        num: 7500203,
        species: "Astrolith-Nova",
        baseSpecies: "Astrolith",
        forme: "Nova",
        formeLetter: "N",
        types: ["Rock", "Ghost"],
        gender: "N",
        baseStats: {
            hp: 85,
            atk: 115,
            def: 45,
            spa: 115,
            spd: 45,
            spe: 125
        },
        abilities: {
            0: "Cosmology"
        },
        heightm: 0.3,
        weightkg: 0.55,
        color: "Purple",
        eggGroups: ["Undiscovered"],
    },
    kyraurem: {
        num: 7500204,
        species: "Kyraurem",
        types: ["Rock", "Ice"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 120,
            atk: 140,
            def: 108,
            spa: 120,
            spd: 103,
            spe: 78
        },
        abilities: {
            0: "Sandy Storm"
        },
        heightm: 2.505,
        weightkg: 263.5,
        color: "Gray",
		  otherFormes: ["kyrauremmega"],
        eggGroups: ["Undiscovered"],
    },
    kyrauremmega: {
        num: 7500204,
        species: "Kyraurem-Mega",
        baseSpecies: "Kyaurem",
        forme: "Mega",
        formeLetter: "M",
        types: ["Rock", "Ice"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 120,
            atk: 170,
            def: 148,
            spa: 120,
            spd: 123,
            spe: 88
        },
        abilities: {
            0: "Sand Stream"
        },
        heightm: 2.505,
        weightkg: 263.5,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    hetrarna: {
        num: 7500205,
        species: "Hetrarna",
        types: ["Fire", "Fairy"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 93,
            atk: 93,
            def: 114,
            spa: 137,
            spd: 114,
            spe: 91
        },
        abilities: {
            0: "Burning Heart"
        },
        heightm: 1.345,
        weightkg: 255.25,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    xurkivoir: {
        num: 7500206,
        species: "Xurkivoir",
        types: ["Electric", "Fairy"],
        gender: "N",
        baseStats: {
            hp: 80,
            atk: 80,
            def: 68,
            spa: 165,
            spd: 100,
            spe: 90
        },
        abilities: {
            0: "Boost Trace"
        },
        heightm: 2.705,
        weightkg: 74.2,
        color: "Black",
		  otherFormes: ["xurkivoirmega"],
        eggGroups: ["Undiscovered"],
    },
    xurkivoirmega: {
        num: 7500206,
        species: "Xurkivoir-Mega",
        baseSpecies: "Xurkivoir",
        forme: "Mega",
        formeLetter: "M",
        types: ["Electric", "Fairy"],
        gender: "N",
        baseStats: {
            hp: 80,
            atk: 100,
            def: 68,
            spa: 205,
            spd: 120,
            spe: 110
        },
        abilities: {
            0: "Pixilate"
        },
        heightm: 2.705,
        weightkg: 74.2,
        color: "Black",
        eggGroups: ["Undiscovered"],
    },
    vikarona: {
        num: 7500207,
        species: "Vikarona",
        types: ["Electric", "Fire"],
        baseStats: {
            hp: 91,
            atk: 75,
            def: 88,
            spa: 150,
            spd: 100,
            spe: 82
        },
        abilities: {
            0: "Hot Air Balloon"
        },
        heightm: 1.55,
        weightkg: 45.5,
        color: "Blue",
        eggGroups: ["Bug"],
    },
    mudgoat: {
        num: 7500208,
        species: "Mudgoat",
        types: ["Grass", "Ground"],
        baseStats: {
            hp: 121,
            atk: 122,
            def: 91,
            spa: 86,
            spd: 93,
            spe: 61
        },
        abilities: {
            0: "Masochist"
        },
        heightm: 2.095,
        weightkg: 505.5,
        color: "Brown",
        eggGroups: ["Field"],
    },
    theridel: {
        num: 7500209,
        species: "Theridel",
        types: ["Ghost", "Ground"],
        gender: "M",
        baseStats: {
            hp: 74,
            atk: 100,
            def: 90,
            spa: 145,
            spd: 85,
            spe: 105
        },
        abilities: {
            0: "Flaming Presence"
        },
        heightm: 1.145,
        weightkg: 51.15,
        color: "Black",
        eggGroups: ["Undiscovered"],
    },
    shrek: {
        num: 7500210,
        species: "Shrek",
        types: ["Grass", "Fairy"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 82,
            atk: 55,
            def: 87,
            spa: 90,
            spd: 97,
            spe: 67
        },
        abilities: {
            0: "Fatal Grace"
        },
        heightm: 0.955,
        weightkg: 21.25,
        color: "Brown",
        eggGroups: ["Fairy"],
    },
    vitality: {
        num: 7500211,
        species: "Vitality",
        types: ["Normal", "Fire"],
        gender: "N",
        baseStats: {
            hp: 117,
            atk: 107,
            def: 97,
            spa: 97,
            spd: 97,
            spe: 107
        },
        abilities: {
            0: "Victory System"
        },
        heightm: 1.36,
        weightkg: 52.25,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
	
    vitalityfire: {
        num: 7500211,
        species: "Vitality-Fire",
        baseSpecies: "Vitality",
        forme: "Fire",
        formeLetter: "F",
        gender: "N",
        types: ["Fire"],
        baseStats: {
            hp: 117,
            atk: 107,
            def: 97,
            spa: 97,
            spd: 97,
            spe: 107
        },
        abilities: {
            0: "Victory System"
        },
        heightm: 1.36,
        weightkg: 52.25,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },


    vitalitywater: {
        num: 7500211,
        species: "Vitality-Water",
        baseSpecies: "Vitality",
        forme: "Water",
        formeLetter: "W",
        gender: "N",
        types: ["Water", "Fire"],
        baseStats: {
            hp: 117,
            atk: 107,
            def: 97,
            spa: 97,
            spd: 97,
            spe: 107
        },
        abilities: {
            0: "Victory System"
        },
        heightm: 1.36,
        weightkg: 52.25,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },


    vitalityelectric: {
        num: 7500211,
        species: "Vitality-Electric",
        baseSpecies: "Vitality",
        forme: "Electric",
        formeLetter: "E",
        gender: "N",
        types: ["Electric", "Fire"],
        baseStats: {
            hp: 117,
            atk: 107,
            def: 97,
            spa: 97,
            spd: 97,
            spe: 107
        },
        abilities: {
            0: "Victory System"
        },
        heightm: 1.36,
        weightkg: 52.25,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },


    vitalitygrass: {
        num: 7500211,
        species: "Vitality-Grass",
        baseSpecies: "Vitality",
        forme: "Grass",
        formeLetter: "G",
        gender: "N",
        types: ["Grass", "Fire"],
        baseStats: {
            hp: 117,
            atk: 107,
            def: 97,
            spa: 97,
            spd: 97,
            spe: 107
        },
        abilities: {
            0: "Victory System"
        },
        heightm: 1.36,
        weightkg: 52.25,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },


    vitalityice: {
        num: 7500211,
        species: "Vitality-Ice",
        baseSpecies: "Vitality",
        forme: "Ice",
        formeLetter: "I",
        gender: "N",
        types: ["Ice", "Fire"],
        baseStats: {
            hp: 117,
            atk: 107,
            def: 97,
            spa: 97,
            spd: 97,
            spe: 107
        },
        abilities: {
            0: "Victory System"
        },
        heightm: 1.36,
        weightkg: 52.25,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    vitalityfighting: {
        num: 7500211,
        species: "Vitality-Fighting",
        baseSpecies: "Vitality",
        forme: "Fighting",
        formeLetter: "F",
        gender: "N",
        types: ["Fighting", "Fire"],
        baseStats: {
            hp: 117,
            atk: 107,
            def: 97,
            spa: 97,
            spd: 97,
            spe: 107
        },
        abilities: {
            0: "Victory System"
        },
        heightm: 1.36,
        weightkg: 52.25,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },


    vitalitypoison: {
        num: 7500211,
        species: "Vitality-Poison",
        baseSpecies: "Vitality",
        forme: "Poison",
        formeLetter: "P",
        gender: "N",
        types: ["Poison", "Fire"],
        baseStats: {
            hp: 117,
            atk: 107,
            def: 97,
            spa: 97,
            spd: 97,
            spe: 107
        },
        abilities: {
            0: "Victory System"
        },
        heightm: 1.36,
        weightkg: 52.25,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    vitalityground: {
        num: 7500211,
        species: "Vitality-Ground",
        baseSpecies: "Vitality",
        forme: "Ground",
        formeLetter: "G",
        gender: "N",
        types: ["Ground", "Fire"],
        baseStats: {
            hp: 117,
            atk: 107,
            def: 97,
            spa: 97,
            spd: 97,
            spe: 107
        },
        abilities: {
            0: "Victory System"
        },
        heightm: 1.36,
        weightkg: 52.25,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    vitalityflying: {
        num: 7500211,
        species: "Vitality-Flying",
        baseSpecies: "Vitality",
        forme: "Flying",
        formeLetter: "F",
        gender: "N",
        types: ["Flying", "Fire"],
        baseStats: {
            hp: 117,
            atk: 107,
            def: 97,
            spa: 97,
            spd: 97,
            spe: 107
        },
        abilities: {
            0: "Victory System"
        },
        heightm: 1.36,
        weightkg: 52.25,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    vitalitypsychic: {
        num: 7500211,
        species: "Vitality-Psychic",
        baseSpecies: "Vitality",
        forme: "Psychic",
        formeLetter: "P",
        gender: "N",
        types: ["Psychic", "Fire"],
        baseStats: {
            hp: 117,
            atk: 107,
            def: 97,
            spa: 97,
            spd: 97,
            spe: 107
        },
        abilities: {
            0: "Victory System"
        },
        heightm: 1.36,
        weightkg: 52.25,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },


    vitalitybug: {
        num: 7500211,
        species: "Vitality-Bug",
        baseSpecies: "Vitality",
        forme: "Bug",
        formeLetter: "B",
        gender: "N",
        types: ["Bug", "Fire"],
        baseStats: {
            hp: 117,
            atk: 107,
            def: 97,
            spa: 97,
            spd: 97,
            spe: 107
        },
        abilities: {
            0: "Victory System"
        },
        heightm: 1.36,
        weightkg: 52.25,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },


    vitalitydragon: {
        num: 7500211,
        species: "Vitality-Dragon",
        baseSpecies: "Vitality",
        forme: "Dragon",
        formeLetter: "D",
        gender: "N",
        types: ["Dragon", "Fire"],
        baseStats: {
            hp: 117,
            atk: 107,
            def: 97,
            spa: 97,
            spd: 97,
            spe: 107
        },
        abilities: {
            0: "Victory System"
        },
        heightm: 1.36,
        weightkg: 52.25,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },


    vitalitydark: {
        num: 7500211,
        species: "Vitality-Dark",
        baseSpecies: "Vitality",
        forme: "Dark",
        formeLetter: "D",
        gender: "N",
        types: ["Dark", "Fire"],
        baseStats: {
            hp: 117,
            atk: 107,
            def: 97,
            spa: 97,
            spd: 97,
            spe: 107
        },
        abilities: {
            0: "Victory System"
        },
        heightm: 1.36,
        weightkg: 52.25,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },


    vitalitysteel: {
        num: 7500211,
        species: "Vitality-Steel",
        baseSpecies: "Vitality",
        forme: "Steel",
        formeLetter: "S",
        gender: "N",
        types: ["Steel", "Fire"],
        baseStats: {
            hp: 117,
            atk: 107,
            def: 97,
            spa: 97,
            spd: 97,
            spe: 107
        },
        abilities: {
            0: "Victory System"
        },
        heightm: 1.36,
        weightkg: 52.25,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },


    vitalityfairy: {
        num: 7500255,
        species: "Vitality-Fairy",
        baseSpecies: "Vitality",
        forme: "Fairy",
        formeLetter: "F",
        gender: "N",
        types: ["Steel", "Fairy"],
        baseStats: {
            hp: 117,
            atk: 107,
            def: 97,
            spa: 97,
            spd: 97,
            spe: 107
        },
        abilities: {
            0: "Victory System"
        },
        heightm: 1.36,
        weightkg: 52.25,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    necromega: {
        num: 7500212,
        species: "Necromega",
        types: ["Flying", "Psychic"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 91,
            atk: 91,
            def: 100,
            spa: 131,
            spd: 92,
            spe: 90
        },
        abilities: {
            0: "Kaleidocope"
        },
        heightm: 2.15,
        weightkg: 140.75,
        color: "Black",
        eggGroups: ["Undiscovered"],
    },
    malaquanid: {
        num: 7500213,
        species: "Malaquanid",
        types: ["Dark", "Bug"],
        baseStats: {
            hp: 87,
            atk: 91,
            def: 100,
            spa: 69,
            spd: 113,
            spe: 67
        },
        abilities: {
            0: "Contra-Bubble"
        },
        heightm: 1.65,
        weightkg: 64.5,
        color: "Purple",
        eggGroups: ["Water 1"],
    },
    scrapunny: {
        num: 7500214,
        species: "Scrapunny",
        types: ["Normal", "Dark"],
        baseStats: {
            hp: 75,
            atk: 93,
            def: 109,
            spa: 59,
            spd: 115,
            spe: 91
        },
        abilities: {
            0: "Mean Girl"
        },
        heightm: 1.15,
        weightkg: 31.65,
        color: "Brown",
		  otherFormes: ["scrapunnymega"],
        eggGroups: ["Field"],
    },
    scrapunnymega: {
        num: 7500214,
        species: "Scrapunny-Mega",
        baseSpecies: "Scrapunny",
        forme: "Mega",
        formeLetter: "M",
        types: ["Normal", "Fighting"],
        baseStats: {
            hp: 75,
            atk: 153,
            def: 119,
            spa: 59,
            spd: 115,
            spe: 121
        },
        abilities: {
            0: "Scrappy"
        },
        heightm: 1.25,
        weightkg: 26.65,
        color: "Brown",
        eggGroups: ["Field"],
    },
    bezong: {
        num: 7500215,
        species: "Bezong",
        types: ["Normal", "Psychic"],
        gender: "N",
        baseStats: {
            hp: 113,
            atk: 114,
            def: 100,
            spa: 67,
            spd: 100,
            spe: 46
        },
        abilities: {
            0: "Hazmat Fur"
        },
        heightm: 1.705,
        weightkg: 161,
        color: "Green",
        eggGroups: ["Undiscovered"],
    },
    valcro: {
        num: 7500216,
        species: "Valcro",
        types: ["Normal", "Flying"],
        gender: "N",
        baseStats: {
            hp: 100,
            atk: 92,
            def: 97,
            spa: 82,
            spd: 97,
            spe: 122
        },
        abilities: {
            0: "Tech Equip"
        },
        heightm: 2.055,
        weightkg: 87.75,
        color: "Purple",
        eggGroups: ["Undiscovered"],
    },
    smelly: {
        num: 7500217,
        species: "Smelly",
        types: ["Normal"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 75,
            atk: 57,
            def: 85,
            spa: 57,
            spd: 90,
            spe: 85
        },
        abilities: {
            0: "Technical System"
        },
        heightm: 1.75,
        weightkg: 79.25,
        color: "White",
        eggGroups: ["Undiscovered"],
    },
    tapumeme: {
        num: 7500218,
        species: "Tapu Meme",
        types: ["Psychic", "Fairy"],
        gender: "N",
        baseStats: {
            hp: 85,
            atk: 81,
            def: 81,
            spa: 133,
            spd: 141,
            spe: 103
        },
        abilities: {
            0: "Serene Surge"
        },
        heightm: 0.9,
        weightkg: 12.55,
        color: "White",
        eggGroups: ["Undiscovered"],
    },
    tapumemedank: {
        num: 7500218,
        species: "Tapu Meme-Dank",
        baseSpecies: "Tapu Meme",
        forme: "Dank",
        formeLetter: "D",
        types: ["Psychic", "Fighting"],
        gender: "N",
        baseStats: {
            hp: 85,
            atk: 133,
            def: 103,
            spa: 81,
            spd: 81,
            spe: 141
        },
        abilities: {
            0: "Serene Surge"
        },
        heightm: 0.9,
        weightkg: 12.55,
        color: "White",
        eggGroups: ["Undiscovered"],
    },
    comcott: {
        num: 7500219,
        species: "Comcott",
        types: ["Fairy", "Grass"],
        genderRatio: {M: 0.375, F: 0.625},
        baseStats: {
            hp: 65,
            atk: 69,
            def: 97,
            spa: 89,
            spd: 102,
            spe: 118
        },
        abilities: {
            0: "Indulgence"
        },
        heightm: 0.405,
        weightkg: 3.45,
        color: "Green",
        eggGroups: ["Undiscovered"],
    },
	minislash: {
	        num: 7500220,
	        species: "Minislash",
	        baseForme: "Meteor",
	        types: ["Rock", "Ghost"],
	        gender: "N",
	        baseStats: {
	            hp: 70,
	            atk: 65,
	            def: 135,
	            spa: 65,
	            spd: 135,
	            spe: 70
	        },
	        abilities: {
	            0: "Stance Shield"
	        },
	        heightm: 1,
	        weightkg: 46.5,
	        color: "Brown",
	        eggGroups: ["Mineral"],
	        otherFormes: ["minislashblade"],
	    },
 	minislashblade: {
	        num: 7500220,
	        species: "Minislash-Blade",
	        baseSpecies: "Minislash",
	        forme: "Blade",
	        formeLetter: "B",
	        types: ["Rock", "Ghost"],
	        gender: "N",
	        baseStats: {
	            hp: 70,
	            atk: 135,
	            def: 65,
	            spa: 135,
	            spd: 65,
	            spe: 130
	        },
	        abilities: {
	            0: "Stance Shield"
	        },
	        heightm: 1,
	        weightkg: 6.8,
	        color: "White",
	        eggGroups: ["Mineral"],
	    },
    crematoria: {
        num: 7500221,
        species: "Crematoria",
        types: ["Flying", "Psychic"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 104,
            atk: 81,
            def: 78,
            spa: 139,
            spd: 107,
            spe: 100
        },
        abilities: {
            0: "Ashes to Ashes"
        },
        heightm: 1.155,
        weightkg: 48.5,
        color: "White",
		  otherFormes: ["crematoriamegax", "crematoriamegay", "crematoriasematary"],
        eggGroups: ["Undiscovered"],
    },
    crematoriasematary: {
        num: 7500221,
        species: "Crematoria-Sematary",
        baseSpecies: "Crematoria",
        forme: "Sematary",
        formeLetter: "S",
        types: ["Flying", "Fighting"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 104,
            atk: 139,
            def: 100,
            spa: 81,
            spd: 78,
            spe: 139
        },
        abilities: {
            0: "Ashes to Ashes"
        },
        heightm: 1.155,
        weightkg: 48.5,
        color: "Black",
        eggGroups: ["Undiscovered"],
    },
    crematoriamegax: {
        num: 7500221,
        species: "Crematoria-Mega-X",
        baseSpecies: "Crematoria",
        forme: "Mega",
        formeLetter: "X",
        types: ["Flying", "Dragon"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 104,
            atk: 127,
            def: 111,
            spa: 160,
            spd: 107,
            spe: 100
        },
        abilities: {
            0: "Tough Claws"
        },
        heightm: 1.155,
        weightkg: 68.5,
        color: "Black",
        eggGroups: ["Undiscovered"],
    },


    crematoriamegay: {
        num: 7500221,
        species: "Crematoria-Mega-Y",
        baseSpecies: "Crematoria",
        forme: "Mega",
        formeLetter: "Y",
        types: ["Flying", "Psychic"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 104,
            atk: 101,
            def: 78,
            spa: 189,
            spd: 137,
            spe: 100
        },
        abilities: {
            0: "Drought"
        },
        heightm: 1.155,
        weightkg: 58.5,
        color: "White",
        eggGroups: ["Undiscovered"],
    },
    pherothorn: {
        num: 7500222,
        species: "Pherothorn",
        types: ["Bug", "Steel"],
        baseStats: {
            hp: 72,
            atk: 115,
            def: 94,
            spa: 95,
            spd: 96,
            spe: 95
        },
        abilities: {
            0: "Beast Barbs"
        },
        heightm: 1.395,
        weightkg: 67.5,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    archking: {
        num: 7500223,
        species: "Archking",
        types: ["Water", "Flying"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 75,
            atk: 145,
            def: 100,
            spa: 91,
            spd: 67,
            spe: 102
        },
        abilities: {
            0: "Determination"
        },
        heightm: 1.35,
        weightkg: 46,
        color: "Yellow",
        eggGroups: ["Water 3"],
    },
    slampa: {
        num: 7500224,
        species: "Slampa",
        types: ["Water", "Dragon"],
        baseStats: {
            hp: 96,
            atk: 77,
            def: 107,
            spa: 127,
            spd: 95,
            spe: 43
        },
        abilities: {
            0: "Outrageous"
        },
        heightm: 2.3,
        weightkg: 131.75,
        color: "White",
		  otherFormes: ["slampamega"],
        eggGroups: ["Monster"],
    },
    slampamega: {
        num: 7500224,
        species: "Slampa-Mega",
        baseSpecies: "Slampa",
        forme: "Mega",
        formeLetter: "M",
        types: ["Water", "Dragon"],
        genderRatio: {
            M: 0.50,
            F: 0.50
        },
        baseStats: {
            hp: 96,
            atk: 77,
            def: 177,
            spa: 157,
            spd: 95,
            spe: 43
        },
        abilities: {
            0: "Shell Armor"
        },
        heightm: 2.3,
        weightkg: 163.25,
        color: "White",
        eggGroups: ["Monster"],
    },
    decidactyl: {
        num: 7500225,
        species: "Decidactyl",
        types: ["Ghost", "Flying"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 89,
            atk: 116,
            def: 80,
            spa: 90,
            spd: 97,
            spe: 110
        },
        abilities: {
            0: "Wood Head"
        },
        heightm: 1.7,
        weightkg: 47.8,
        color: "Brown",
		  otherFormes: ["decidactylmega"],
        eggGroups: ["Flying"],
    },
    decidactylmega: {
        num: 7500225,
        species: "Decidactyl-Mega",
        baseSpecies: "Decidactyl",
        forme: "Mega",
        formeLetter: "M",
        types: ["Ghost", "Flying"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 89,
            atk: 146,
            def: 100,
            spa: 100,
            spd: 117,
            spe: 130
        },
        abilities: {
            0: "Tough Claws"
        },
        heightm: 2,
        weightkg: 67.8,
        color: "Brown",
        eggGroups: ["Flying"],
    },
    lycanape: {
        num: 7500226,
        species: "Lycanape",
        types: ["Rock", "Fighting"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 85,
            atk: 119,
            def: 78,
            spa: 89,
            spd: 78,
            spe: 120
        },
        abilities: {
            0: "Blaze Rush"
        },
        heightm: 0.99,
        weightkg: 40,
        color: "Brown",
        eggGroups: ["Field"],
    },
    golisotops: {
        num: 7500227,
        species: "Golisotops",
        types: ["Bug", "Water"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 77,
            atk: 130,
            def: 132,
            spa: 72,
            spd: 90,
            spe: 70
        },
        abilities: {
            0: "Swift Retreat"
        },
        heightm: 1.655,
        weightkg: 74.25,
        color: "Gray",
        eggGroups: ["Water 3"],
      dexentry: "It is theorized that Kabutops is a distant ancestor of Golisopod. With this theory known, a hypothetical specimen of an intermediate generation was created. It would seem that this generation was closer to our times than long back, as it has much of Golisopod's features. However, it remains having the two blades on its uppermost pair of arms.",
    },
    perwearalola: {
        num: 7500228,
        species: "Perwear-Alola",
        types: ["Fighting", "Dark"],
        baseStats: {
            hp: 102,
            atk: 102,
            def: 80,
            spa: 75,
            spd: 72,
            spe: 97
        },
        abilities: {
            0: "Fluffy Fur"
        },
        color: "Black",
        eggGroups: ["Field"],
        heightm: 1.6,
        weightkg: 84,
    },
    mudape: {
        num: 7500229,
        species: "Mudape",
        types: ["Fighting", "Ground"],
        baseStats: {
            hp: 92,
            atk: 125,
            def: 90,
            spa: 67,
            spd: 87,
            spe: 75
        },
        abilities: {
            0: "Champion's Spirit"
        },
        color: "Brown",
        eggGroups: ["Field"],
        heightm: 1.75,
        weightkg: 476,
    },
    kira: {
        num: 7500230,
        species: "Kira",
        types: ["Dragon", "Steel"],
		  gender: "N",
        baseStats: {
            hp: 75,
            atk: 173,
            def: 132,
            spa: 79,
            spd: 65,
            spe: 101
        },
        abilities: {
            0: "Beast's Focus"
        },
        color: "White",
		  eggGroups: ["Undiscovered"],
        heightm: 1.25,
        weightkg: 105.05,
    },
	exelegoalola: {
        num: 7500231,
        species: "Exelego-Alola",
        types: ["Rock", "Dragon"],
		  gender: "N",
        baseStats: {
            hp: 105,
            atk: 83,
            def: 71,
            spa: 131,
            spd: 113,
            spe: 95
        },
        abilities: {
            0: "Frisky Beast"
        },
        color: "White",
		  eggGroups: ["Undiscovered"],
        heightm: 6.05,
        weightkg: 235.55,
    },
    joltarina: {
        num: 7500232,
        species: "Joltarina",
        types: ["Water", "Electric"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 82,
            atk: 79,
            def: 77,
            spa: 128,
            spd: 115,
            spe: 105
        },
        abilities: {
            0: "Volt Torrent"
        },
        color: "Blue",
		  eggGroups: ["Field"],
        heightm: 1.3,
        weightkg: 34.25,
    },
	dhelchamp: {
        num: 7500233,
        species: "Dhelchamp",
        types: ["Grass", "Fighting"],
		  gender: "N",
        baseStats: {
            hp: 100,
            atk: 147,
            def: 90,
            spa: 75,
            spd: 100,
            spe: 47
        },
        abilities: {
            0: "Ancient Mariner"
        },
        color: "Green",
        dexentry: "A rogue team of former Team Rocket members created this fusion. It is said to be able to remove the anchor attached to its head and swing it around crazily for an extremely powerful Power Whip or Anchor Shot. At the same time, it is able to fight with its four arms against any enemies trying to dodge the attack",
		  eggGroups: ["Undiscovered"],
        heightm: 2.75,
        weightkg: 170,
    },
    mimian: {
        num: 7500234,
        species: "Mimian",
        types: ["Psychic", "Fighting"],
        baseStats: {
            hp: 100,
            atk: 115,
            def: 95,
            spa: 70,
            spd: 95,
            spe: 110
        },
        abilities: {
            0: "Monkey See Monkey Do"
        },
        color: "Pink",
		  eggGroups: ["Undiscovered"],
        heightm: 1.2,
        weightkg: 43.4,
    },
    aerodako: {
        num: 7500235,
        species: "Aero Dako",
        types: ["Rock", "Electric"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 75,
            atk: 130,
            def: 75,
            spa: 77,
            spd: 75,
            spe: 150
        },
        abilities: {
            0: "Rocky Surge"
        },
        color: "Black",
		  eggGroups: ["Undiscovered"],
		  otherFormes: ["aerodakomega"],
        heightm: 1.8,
        weightkg: 39.75,
    },
    aerodakomega: {
        num: 7500235,
        species: "Aero Dako-Mega",
        baseSpecies: "Aero Dako",
        forme: "Mega",
        formeLetter: "M",
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        types: ["Rock", "Electric"],
        baseStats: {
            hp: 75,
            atk: 160,
            def: 95,
            spa: 87,
            spd: 95,
            spe: 170
        },
        abilities: {
            0: "Tough Claws"
        },
        color: "Black",
		  eggGroups: ["Undiscovered"],
        heightm: 2.1,
        weightkg: 59.75,
    },
    tapujojo: {
        num: 7500236,
        species: "Tapu Jojo",
        types: ["Ice", "Electric"],
        gender: "F",
        baseStats: {
            hp: 67,
            atk: 82,
            def: 60,
            spa: 125,
            spd: 85,
            spe: 132
        },
        abilities: {
            0: "Supercharge Surge"
        },
        color: "Yellow",
		  eggGroups: ["Undiscovered"],
        heightm: 1.6,
        weightkg: 30.55,
    },
    magicarticgear: {
        num: 7500237,
        species: "Magic Artic Gear",
        types: ["Steel", "Flying"],
        gender: "N",
        baseStats: {
            hp: 105,
            atk: 90,
            def: 127,
            spa: 112,
            spd: 120,
            spe: 75
        },
        abilities: {
            0: "Broken Heart"
        },
        color: "Blue",
		  eggGroups: ["Undiscovered"],
        heightm: 1.35,
        weightkg: 67.95,
    },
    necroltres: {
        num: 7500238,
        species: "Necroltres",
        types: ["Psychic", "Fire"],
        gender: "N",
        baseStats: {
            hp: 113,
            atk: 103,
            def: 100,
            spa: 126,
            spd: 95,
            spe: 91
        },
        abilities: {
            0: "Diamond Armor"
        },
        color: "Black",
		  eggGroups: ["Undiscovered"],
        heightm: 2.2,
        weightkg: 145,
    },
    kartanbull: {
        num: 7500239,
        species: "Kartanbull",
        types: ["Steel", "Fairy"],
        gender: "N",
        baseStats: {
            hp: 85,
            atk: 151,
            def: 113,
            spa: 60,
            spd: 46,
            spe: 97
        },
        abilities: {
            0: "Subdue"
        },
        color: "White",
		  eggGroups: ["Undiscovered"],
        heightm: 0.85,
        weightkg: 24.4,
    },
    venustoise: {
        num: 7500240,
        species: "Venustoise",
        types: ["Water", "Poison"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 89,
            atk: 92,
            def: 101,
            spa: 102,
            spd: 112,
            spe: 89
        },
        abilities: {
            0: "Sun Bath"
        },
        color: "Blue",
		  otherFormes: ["venustoisemegagreen", "venustoisemegab"],
    	  dexentry: "Two of our grunts, who were on the trail of the Pewter and Cerulean Gym Leaders at the time, have encountered a Gastly proficient in the art of illusions. This Gastly used a Venusaur and a Blastoise illusion to scare a Bulbasaur and Squirtle, then combined them to form Venustoise. While the plans to create a Venustoise were postponed for some time, a breakthrough in combining the rarely-seen abilities of Pokémon was discovered, and one of the first fusions to be created from this breakthrough was a live Bulbasquirt. When brought to Level 16, it evolved into an Ivytortle, and at Level 34, Ivytortle evolved into the same fusion depicted back in the Maiden's Peak illusion: Venustoise.",
		  eggGroups: ["Monster"],
        heightm: 1.8,
        weightkg: 92.75,
    },


    venustoisemegagreen: {
        num: 7500240,
        species: "Venustoise-Mega-Green",
        baseSpecies: "Venustoise",
        forme: "Mega-Green",
        formeLetter: "M",
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        types: ["Water", "Poison"],
        baseStats: {
            hp: 89,
            atk: 110,
            def: 141,
            spa: 124,
            spd: 132,
            spe: 89
        },
        abilities: {
            0: "Thick Fat"
        },
        color: "Blue",
		  eggGroups: ["Monster"],
        heightm: 2.2,
        weightkg: 148.25,
    },
    venustoisemegablue: {
        num: 7500240,
        species: "Venustoise-Mega-Blue",
        baseSpecies: "Venustoise",
        forme: "Mega-Blue",
        formeLetter: "M",
        types: ["Water", "Poison"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 89,
            atk: 112,
            def: 121,
            spa: 152,
            spd: 122,
            spe: 89
        },
        abilities: {
            0: "Mega Launcher"
        },
        color: "Blue",
		  eggGroups: ["Monster"],
        heightm: 1.8,
        weightkg: 108.35,
    },
    kingkek: {
        num: 7500241,
        species: "King Kek",
        types: ["Normal"],
        baseStats: {
            hp: 115,
            atk: 135,
            def: 95,
            spa: 72,
            spd: 102,
            spe: 80
        },
        abilities: {
            0: "Lazy Camo"
        },
        color: "Green",
		  eggGroups: ["Field"],
        heightm: 1.5,
        weightkg: 76.25,
    },
    sigillow: {
        num: 7500242,
        species: "Sigillow",
        types: ["Normal", "Psychic"],
        baseStats: {
            hp: 76,
            atk: 81,
            def: 80,
            spa: 99,
            spd: 75,
            spe: 121
        },
        abilities: {
            0: "Overwhelming"
        },
        color: "Black",
		  eggGroups: ["Flying"],
        heightm: 1.05,
        weightkg: 16.9,
    },
    covally: {
        num: 7500243,
        species: "Covally",
        types: ["Normal", "Fairy"],
        gender: "N",
        baseStats: {
            hp: 93,
            atk: 73,
            def: 102,
            spa: 95,
            spd: 102,
            spe: 100
        },
        abilities: {
            0: "Triage System"
        },
        color: "Gray",
		  eggGroups: ["Undiscovered"],
        heightm: 1.2,
        weightkg: 50.4,
    },
	 covallyfire: {
        num: 7500243,
        species: "Covally-Fire",
        baseSpecies: "Covally",
        gender: "N",
        forme: "Fire",
        formeLetter: "F",
        types: ["Fire", "Fairy"],
        baseStats: {
            hp: 93,
            atk: 73,
            def: 102,
            spa: 95,
            spd: 102,
            spe: 100
        },
        abilities: {
            0: "Triage System"
        },
        color: "Gray",
		  eggGroups: ["Undiscovered"],
        heightm: 1.2,
        weightkg: 50.4,
    },
	 covallywater: {
        num: 7500243,
        species: "Covally-Water",
        baseSpecies: "Covally",
        gender: "N",
        forme: "Water",
        formeLetter: "W",
        types: ["Water", "Fairy"],
        baseStats: {
            hp: 93,
            atk: 73,
            def: 102,
            spa: 95,
            spd: 102,
            spe: 100
        },
        abilities: {
            0: "Triage System"
        },
        color: "Gray",
		  eggGroups: ["Undiscovered"],
        heightm: 1.2,
        weightkg: 50.4,
    },
	 covallyelectric: {
        num: 7500243,
        species: "Covally-Electric",
        baseSpecies: "Covally",
        gender: "N",
        forme: "Electric",
        formeLetter: "E",
        types: ["Electric", "Fairy"],
        baseStats: {
            hp: 93,
            atk: 73,
            def: 102,
            spa: 95,
            spd: 102,
            spe: 100
        },
        abilities: {
            0: "Triage System"
        },
        color: "Gray",
		  eggGroups: ["Undiscovered"],
        heightm: 1.2,
        weightkg: 50.4,
    },
    covallygrass: {
        num: 7500243,
        species: "Covally-Grass",
        baseSpecies: "Covally",
        gender: "N",
        forme: "Grass",
        formeLetter: "G",
        types: ["Grass", "Fairy"],
        baseStats: {
            hp: 93,
            atk: 73,
            def: 102,
            spa: 95,
            spd: 102,
            spe: 100
        },
        abilities: {
            0: "Triage System"
        },
        color: "Gray",
		  eggGroups: ["Undiscovered"],
        heightm: 1.2,
        weightkg: 50.4,
    },
    covallyice: {
        num: 7500243,
        species: "Covally-Ice",
        baseSpecies: "Covally",
        gender: "N",
        forme: "Ice",
        formeLetter: "I",
        types: ["Ice", "Fairy"],
        baseStats: {
            hp: 93,
            atk: 73,
            def: 102,
            spa: 95,
            spd: 102,
            spe: 100
        },
        abilities: {
            0: "Triage System"
        },
        color: "Gray",
		  eggGroups: ["Undiscovered"],
        heightm: 1.2,
        weightkg: 50.4,
    },
    covallyfighting: {
        num: 7500243,
        species: "Covally-Fighting",
        baseSpecies: "Covally",
        gender: "N",
        forme: "Fighting",
        formeLetter: "F",
        types: ["Fighting", "Fairy"],
        baseStats: {
            hp: 93,
            atk: 73,
            def: 102,
            spa: 95,
            spd: 102,
            spe: 100
        },
        abilities: {
            0: "Triage System"
        },
        color: "Gray",
		  eggGroups: ["Undiscovered"],
        heightm: 1.2,
        weightkg: 50.4,
    },
    covallypoison: {
        num: 7500243,
        species: "Covally-Poison",
        baseSpecies: "Covally",
        gender: "N",
        forme: "Poison",
        formeLetter: "P",
        types: ["Poison", "Fairy"],
        baseStats: {
            hp: 93,
            atk: 73,
            def: 102,
            spa: 95,
            spd: 102,
            spe: 100
        },
        abilities: {
            0: "Triage System"
        },
        color: "Gray",
		  eggGroups: ["Undiscovered"],
        heightm: 1.2,
        weightkg: 50.4,
    },
    covallyground: {
        num: 7500243,
        species: "Covally-Ground",
        baseSpecies: "Covally",
        gender: "N",
        forme: "Ground",
        formeLetter: "G",
        types: ["Ground", "Fairy"],
        baseStats: {
            hp: 93,
            atk: 73,
            def: 102,
            spa: 95,
            spd: 102,
            spe: 100
        },
        abilities: {
            0: "Triage System"
        },
        color: "Gray",
		  eggGroups: ["Undiscovered"],
        heightm: 1.2,
        weightkg: 50.4,
    },
    covallyflying: {
        num: 7500243,
        species: "Covally-Fire",
        baseSpecies: "Covally",
        gender: "N",
        forme: "Flying",
        formeLetter: "F",
        types: ["Flying", "Fairy"],
        baseStats: {
            hp: 93,
            atk: 73,
            def: 102,
            spa: 95,
            spd: 102,
            spe: 100
        },
        abilities: {
            0: "Triage System"
        },
        color: "Gray",
		  eggGroups: ["Undiscovered"],
        heightm: 1.2,
        weightkg: 50.4,
    },
    covallypsychic: {
        num: 7500243,
        species: "Covally-Psychic",
        baseSpecies: "Covally",
        gender: "N",
        forme: "Psychic",
        formeLetter: "P",
        types: ["Fire", "Fairy"],
        baseStats: {
            hp: 93,
            atk: 73,
            def: 102,
            spa: 95,
            spd: 102,
            spe: 100
        },
        abilities: {
            0: "Triage System"
        },
        color: "Gray",
		  eggGroups: ["Undiscovered"],
        heightm: 1.2,
        weightkg: 50.4,
    },
    covallybug: {
        num: 7500243,
        species: "Covally-Bug",
        baseSpecies: "Covally",
        gender: "N",
        forme: "Bug",
        formeLetter: "B",
        types: ["Bug", "Fairy"],
        baseStats: {
            hp: 93,
            atk: 73,
            def: 102,
            spa: 95,
            spd: 102,
            spe: 100
        },
        abilities: {
            0: "Triage System"
        },
        color: "Gray",
		  eggGroups: ["Undiscovered"],
        heightm: 1.2,
        weightkg: 50.4,
    },
    covallyrock: {
        num: 7500243,
        species: "Covally-Rock",
        baseSpecies: "Covally",
        gender: "N",
        forme: "Rock",
        formeLetter: "R",
        types: ["Rock", "Fairy"],
        baseStats: {
            hp: 93,
            atk: 73,
            def: 102,
            spa: 95,
            spd: 102,
            spe: 100
        },
        abilities: {
            0: "Triage System"
        },
        color: "Gray",
		  eggGroups: ["Undiscovered"],
        heightm: 1.2,
        weightkg: 50.4,
    },
    covallyghost: {
        num: 7500243,
        species: "Covally-Ghost",
        baseSpecies: "Covally",
        gender: "N",
        forme: "Ghost",
        formeLetter: "G",
        types: ["Ghost", "Fairy"],
        baseStats: {
            hp: 93,
            atk: 73,
            def: 102,
            spa: 95,
            spd: 102,
            spe: 100
        },
        abilities: {
            0: "Triage System"
        },
        color: "Gray",
		  eggGroups: ["Undiscovered"],
        heightm: 1.2,
        weightkg: 50.4,
    },
    covallydragon: {
        num: 7500243,
        species: "Covally-Dragon",
        baseSpecies: "Covally",
        gender: "N",
        forme: "Dragon",
        formeLetter: "D",
        types: ["Dragon", "Fairy"],
        baseStats: {
            hp: 93,
            atk: 73,
            def: 102,
            spa: 95,
            spd: 102,
            spe: 100
        },
        abilities: {
            0: "Triage System"
        },
        color: "Gray",
		  eggGroups: ["Undiscovered"],
        heightm: 1.2,
        weightkg: 50.4,
    },
    covallydark: {
        num: 7500243,
        species: "Covally-Dark",
        baseSpecies: "Covally",
        gender: "N",
        forme: "Dark",
        formeLetter: "D",
        types: ["Dark", "Fairy"],
        baseStats: {
            hp: 93,
            atk: 73,
            def: 102,
            spa: 95,
            spd: 102,
            spe: 100
        },
        abilities: {
            0: "Triage System"
        },
        color: "Gray",
		  eggGroups: ["Undiscovered"],
        heightm: 1.2,
        weightkg: 50.4,
    },
    covallysteel: {
        num: 7500243,
        species: "Covally-Steel",
        baseSpecies: "Covally",
        gender: "N",
        forme: "Steel",
        formeLetter: "S",
        types: ["Steel", "Fairy"],
        baseStats: {
            hp: 93,
            atk: 73,
            def: 102,
            spa: 95,
            spd: 102,
            spe: 100
        },
        abilities: {
            0: "Triage System"
        },
        color: "Gray",
		  eggGroups: ["Undiscovered"],
        heightm: 1.2,
        weightkg: 50.4,
    },
    covallyfairy: {
        num: 7500243,
        species: "Covally-Fairy",
        baseSpecies: "Covally",
        gender: "N",
        forme: "Fairy",
        formeLetter: "F",
        types: ["Fairy"],
        baseStats: {
            hp: 93,
            atk: 73,
            def: 102,
            spa: 95,
            spd: 102,
            spe: 100
        },
        abilities: {
            0: "Triage System"
        },
        color: "Gray",
		  eggGroups: ["Undiscovered"],
        heightm: 1.2,
        weightkg: 50.4,
    },
    toxamola: {
        num: 7500244,
        species: "Toxamola",
        types: ["Water", "Poison"],
        baseStats: {
            hp: 123,
            atk: 84,
            def: 131,
            spa: 61,
            spd: 109,
            spe: 65
        },
        abilities: {
            0: "Regenerator"
        },
        color: "Blue",
		  eggGroups: ["Water 1"],
        heightm: 0.95,
        weightkg: 23.05,
    },
    melon: {
        num: 7500245,
        species: "Melon",
        types: ["Fairy", "Psychic"],
        gender: "N",
        baseStats: {
            hp: 97,
            atk: 71,
            def: 71,
            spa: 139,
            spd: 149,
            spe: 75
        },
        abilities: {
            0: "Pixie Grace"
        },
        color: "White",
		  eggGroups: ["Undiscovered"],
        heightm: 0.8,
        weightkg: 15,
    },
    melonpirouette: {
        num: 7500245,
        species: "Melon-Pirouette",
        baseSpecies: "Melon",
        gender: "N",
        forme: "Pirouette",
        formeLetter: "P",
        types: ["Fairy", "Fighting"],
        baseStats: {
            hp: 97,
            atk: 139,
            def: 75,
            spa: 71,
            spd: 71,
            spe: 149
        },
        abilities: {
            0: "Pixie Grace"
        },
        color: "White",
		  eggGroups: ["Undiscovered"],
        heightm: 0.8,
        weightkg: 15,
    },
    kyutomwhite: {
        num: 7500246,
        species: "Kyutom-White",
        types: ["Ice", "Electric"],
        gender: "N",
        baseStats: {
            hp: 87,
            atk: 95,
            def: 93,
            spa: 132,
            spd: 93,
            spe: 108
        },
        abilities: {
            0: "Turborise"
        },
        color: "Red",
		  eggGroups: ["Undiscovered"],
        heightm: 1.95,
        weightkg: 162.65,
    },
    xernemite: {
        num: 7500247,
        species: "Xernemite",
        types: ["Steel", "Fairy"],
        gender: "N",
        baseStats: {
            hp: 90,
            atk: 83,
            def: 92,
            spa: 113,
            spd: 86,
            spe: 82
        },
        abilities: {
            0: "Pixie Lure"
        },
        color: "Gray",
		  eggGroups: ["Undiscovered"],
        heightm: 1.65,
        weightkg: 110.5,
    },
    cherron: {
        num: 7500248,
        species: "Cherron",
        types: ["Grass", "Ground"],
        baseStats: {
            hp: 105,
            atk: 125,
            def: 105,
            spa: 93,
            spd: 84,
            spe: 87
        },
        abilities: {
            0: "Flower Power"
        },
        color: "Purple",
		  eggGroups: ["Undiscovered"],
        heightm: 2,
        weightkg: 479.65,
    },
    cherronprimal: {
        num: 7500248,
        species: "Cherron-Primal",
        baseSpecies: "Cherron",
        forme: "Primal",
        formeLetter: "P",
        types: ["Grass", "Fire"],
        baseStats: {
            hp: 105,
            atk: 155,
            def: 125,
            spa: 143,
            spd: 84,
            spe: 87
        },
        abilities: {
            0: "Desolate Land"
        },
        color: "Pink",
		  eggGroups: ["Undiscovered"],
        heightm: 2,
        weightkg: 529.35,
    },
    dialcatty: {
        num: 7500249,
        species: "Dialcatty",
        types: ["Steel", "Normal"],
        gender: "N",
        baseStats: {
            hp: 85,
            atk: 107,
            def: 92,
            spa: 107,
            spd: 77,
            spe: 110
        },
        abilities: {
            0: "Normalized Enemy"
        },
        color: "Purple",
		  eggGroups: ["Undiscovered"],
        heightm: 3.25,
        weightkg: 357.8,
    },
    lunatic: {
        num: 7500250,
        species: "Lunatic",
        types: ["Fairy", "Ghost"],
        baseStats: {
            hp: 118,
            atk: 79,
            def: 90,
            spa: 120,
            spd: 110,
            spe: 63
        },
        abilities: {
            0: "Fungal Shield"
        },
        color: "Purple",
		  eggGroups: ["Undiscovered"],
        heightm: 2.5,
        weightkg: 65.75,
    },
    granho: {
        num: 7500251,
        species: "Gran-Ho",
        types: ["Fairy", "Fire"],
        gender: "N",
        baseStats: {
            hp: 100,
            atk: 140,
            def: 100,
            spa: 85,
            spd: 110,
            spe: 69
        },
        abilities: {
            0: "Pressurate"
        },
        color: "Purple",
		  eggGroups: ["Undiscovered"],
        heightm: 2.6,
        weightkg: 123.85,
    },
    lies: {
        num: 7500252,
        species: "Lies",
        types: ["Fairy", "Dark"],
        baseStats: {
            hp: 115,
            atk: 109,
            def: 72,
            spa: 109,
            spd: 74,
            spe: 122
        },
        abilities: {
            0: "Mana Potion"
        },
        color: "Purple",
		  eggGroups: ["Undiscovered"],
        heightm: 2.05,
        weightkg: 126.25,
    },
    viva: {
        num: 7500253,
        species: "Viva",
        types: ["Steel", "Flying"],
        baseStats: {
            hp: 110,
            atk: 86,
            def: 88,
            spa: 120,
            spd: 90,
            spe: 91
        },
        abilities: {
            0: "Piercing Gaze"
        },
        color: "White",
		  eggGroups: ["Undiscovered"],
        heightm: 3.3,
        weightkg: 350,
    },
    girutukumuka: {
        num: 7500254,
        species: "Girutukumuka",
        types: ["Water", "Ghost"],
        baseStats: {
            hp: 122,
            atk: 90,
            def: 130,
            spa: 65,
            spd: 130,
            spe: 47
        },
        abilities: {
            0: "Pressured Innards"
        },
        color: "Black",
		  eggGroups: ["Undiscovered"],
        heightm: 2.4,
        weightkg: 375.6,
    },
    omneus: {
        num: 7500255,
        species: "Omneus",
        types: ["Water", "Normal"],
        gender: "N",
        baseStats: {
            hp: 77,
            atk: 80,
            def: 110,
            spa: 125,
            spd: 87,
            spe: 97
        },
        abilities: {
            0: "Spiral Power"
        },
        color: "Blue",
		  eggGroups: ["Undiscovered"],
        heightm: 1.8,
        weightkg: 163.75,
    },
    omneusfire: {
        num: 7500255,
        species: "Omneus-Fire",
        baseSpecies: "Omneus",
        forme: "Fire",
        formeLetter: "F",
        gender: "N",
        types: ["Water", "Fire"],
        baseStats: {
            hp: 77,
            atk: 80,
            def: 110,
            spa: 125,
            spd: 87,
            spe: 97
        },
        abilities: {
            0: "Spiral Power"
        },
        color: "Blue",
		  eggGroups: ["Undiscovered"],
        heightm: 1.8,
        weightkg: 163.75,
    },
    omneuswater: {
        num: 7500255,
        species: "Omneus-Water",
        baseSpecies: "Omneus",
        forme: "Water",
        formeLetter: "W",
        gender: "N",
        types: ["Water"],
        baseStats: {
            hp: 77,
            atk: 80,
            def: 110,
            spa: 125,
            spd: 87,
            spe: 97
        },
        abilities: {
            0: "Spiral Power"
        },
        color: "Blue",
		  eggGroups: ["Undiscovered"],
        heightm: 1.8,
        weightkg: 163.75,
    },
    omneuselectric: {
        num: 7500255,
        species: "Omneus-Electric",
        baseSpecies: "Omneus",
        forme: "Electric",
        formeLetter: "E",
        gender: "N",
        types: ["Water", "Electric"],
        baseStats: {
            hp: 77,
            atk: 80,
            def: 110,
            spa: 125,
            spd: 87,
            spe: 97
        },
        abilities: {
            0: "Spiral Power"
        },
        color: "Blue",
		  eggGroups: ["Undiscovered"],
        heightm: 1.8,
        weightkg: 163.75,
    },
    omneusgrass: {
        num: 7500255,
        species: "Omneus-Grass",
        baseSpecies: "Omneus",
        forme: "Grass",
        formeLetter: "G",
        gender: "N",
        types: ["Water", "Grass"],
        baseStats: {
            hp: 77,
            atk: 80,
            def: 110,
            spa: 125,
            spd: 87,
            spe: 97
        },
        abilities: {
            0: "Spiral Power"
        },
        color: "Blue",
		  eggGroups: ["Undiscovered"],
        heightm: 1.8,
        weightkg: 163.75,
    },
    omneusice: {
        num: 7500255,
        species: "Omneus-Ice",
        baseSpecies: "Omneus",
        forme: "Ice",
        formeLetter: "I",
        gender: "N",
        types: ["Water", "Ice"],
        baseStats: {
            hp: 77,
            atk: 80,
            def: 110,
            spa: 125,
            spd: 87,
            spe: 97
        },
        abilities: {
            0: "Spiral Power"
        },
        color: "Blue",
		  eggGroups: ["Undiscovered"],
        heightm: 1.8,
        weightkg: 163.75,
    },
    omneusfighting: {
        num: 7500255,
        species: "Omneus-Fighting",
        baseSpecies: "Omneus",
        forme: "Fighting",
        formeLetter: "F",
        gender: "N",
        types: ["Water", "Fighting"],
        baseStats: {
            hp: 77,
            atk: 80,
            def: 110,
            spa: 125,
            spd: 87,
            spe: 97
        },
        abilities: {
            0: "Spiral Power"
        },
        color: "Blue",
		  eggGroups: ["Undiscovered"],
        heightm: 1.8,
        weightkg: 163.75,
    },
    omneuspoison: {
        num: 7500255,
        species: "Omneus-Poison",
        baseSpecies: "Omneus",
        forme: "Poison",
        formeLetter: "P",
        gender: "N",
        types: ["Water", "Poison"],
        baseStats: {
            hp: 77,
            atk: 80,
            def: 110,
            spa: 125,
            spd: 87,
            spe: 97
        },
        abilities: {
            0: "Spiral Power"
        },
        color: "Blue",
		  eggGroups: ["Undiscovered"],
        heightm: 1.8,
        weightkg: 163.75,
    },
    omneusground: {
        num: 7500255,
        species: "Omneus-Ground",
        baseSpecies: "Omneus",
        forme: "Ground",
        formeLetter: "G",
        gender: "N",
        types: ["Water", "Ground"],
        baseStats: {
            hp: 77,
            atk: 80,
            def: 110,
            spa: 125,
            spd: 87,
            spe: 97
        },
        abilities: {
            0: "Spiral Power"
        },
        color: "Blue",
		  eggGroups: ["Undiscovered"],
        heightm: 1.8,
        weightkg: 163.75,
    },
    omneusflying: {
        num: 7500255,
        species: "Omneus-Flying",
        baseSpecies: "Omneus",
        forme: "Flying",
        formeLetter: "F",
        gender: "N",
        types: ["Water", "Flying"],
        baseStats: {
            hp: 77,
            atk: 80,
            def: 110,
            spa: 125,
            spd: 87,
            spe: 97
        },
        abilities: {
            0: "Spiral Power"
        },
        color: "Blue",
		  eggGroups: ["Undiscovered"],
        heightm: 1.8,
        weightkg: 163.75,
    },
    omneuspsychic: {
        num: 7500255,
        species: "Omneus-Psychic",
        baseSpecies: "Omneus",
        forme: "Psychic",
        formeLetter: "P",
        gender: "N",
        types: ["Water", "Psychic"],
        baseStats: {
            hp: 77,
            atk: 80,
            def: 110,
            spa: 125,
            spd: 87,
            spe: 97
        },
        abilities: {
            0: "Spiral Power"
        },
        color: "Blue",
		  eggGroups: ["Undiscovered"],
        heightm: 1.8,
        weightkg: 163.75,
    },
    omneusbug: {
        num: 7500255,
        species: "Omneus-Bug",
        baseSpecies: "Omneus",
        forme: "Bug",
        formeLetter: "B",
        gender: "N",
        types: ["Water", "Bug"],
        baseStats: {
            hp: 77,
            atk: 80,
            def: 110,
            spa: 125,
            spd: 87,
            spe: 97
        },
        abilities: {
            0: "Spiral Power"
        },
        color: "Blue",
		  eggGroups: ["Undiscovered"],
        heightm: 1.8,
        weightkg: 163.75,
    },
    omneusdragon: {
        num: 7500255,
        species: "Omneus-Dragon",
        baseSpecies: "Omneus",
        forme: "Dragon",
        formeLetter: "D",
        gender: "N",
        types: ["Water", "Dragon"],
        baseStats: {
            hp: 77,
            atk: 80,
            def: 110,
            spa: 125,
            spd: 87,
            spe: 97
        },
        abilities: {
            0: "Spiral Power"
        },
        color: "Blue",
		  eggGroups: ["Undiscovered"],
        heightm: 1.8,
        weightkg: 163.75,
    },
    omneusdark: {
        num: 7500255,
        species: "Omneus-Dark",
        baseSpecies: "Omneus",
        forme: "Dark",
        formeLetter: "D",
        gender: "N",
        types: ["Water", "Dark"],
        baseStats: {
            hp: 77,
            atk: 80,
            def: 110,
            spa: 125,
            spd: 87,
            spe: 97
        },
        abilities: {
            0: "Spiral Power"
        },
        color: "Blue",
		  eggGroups: ["Undiscovered"],
        heightm: 1.8,
        weightkg: 163.75,
    },
    omneussteel: {
        num: 7500255,
        species: "Omneus-Steel",
        baseSpecies: "Omneus",
        forme: "Steel",
        formeLetter: "S",
        gender: "N",
        types: ["Water", "Steel"],
        baseStats: {
            hp: 77,
            atk: 80,
            def: 110,
            spa: 125,
            spd: 87,
            spe: 97
        },
        abilities: {
            0: "Spiral Power"
        },
        color: "Blue",
		  eggGroups: ["Undiscovered"],
        heightm: 1.8,
        weightkg: 163.75,
    },
    omneusfairy: {
        num: 7500255,
        species: "Omneus-Fairy",
        baseSpecies: "Omneus",
        forme: "Fairy",
        formeLetter: "F",
        gender: "N",
        types: ["Water", "Fairy"],
        baseStats: {
            hp: 77,
            atk: 80,
            def: 110,
            spa: 125,
            spd: 87,
            spe: 97
        },
        abilities: {
            0: "Spiral Power"
        },
        color: "Blue",
		  eggGroups: ["Undiscovered"],
        heightm: 1.8,
        weightkg: 163.75,
    },
    pheralie: {
        num: 7500256,
        species: "Pheralie",
        types: ["Ice", "Fighting"],
        baseStats: {
            hp: 75,
            atk: 123,
            def: 58,
            spa: 123,
            spd: 58,
            spe: 125
        },
        abilities: {
            0: "Extremist"
        },
        color: "Gray",
		  eggGroups: ["Undiscovered"],
		  otherFormes: ["pheraliemega"],
        heightm: 1.65,
        weightkg: 140.75,
    },
    pheraliemega: {
        num: 7500256,
        species: "Pheralie-Mega",
        baseSpecies: "Pheralie",
        forme: "Mega",
        formeLetter: "M",
        types: ["Ice", "Fighting"],
        baseStats: {
            hp: 75,
            atk: 163,
            def: 58,
            spa: 163,
            spd: 58,
            spe: 145
        },
        abilities: {
            0: "Refrigerate"
        },
        color: "Gray",
		  eggGroups: ["Undiscovered"],
        heightm: 2.25,
        weightkg: 234.45,
    },
    tsarakion: {
        num: 7500257,
        species: "Tsarakion",
        types: ["Grass", "Fighting"],
        gender: "F",
        baseStats: {
            hp: 82,
            atk: 140,
            def: 94,
            spa: 61,
            spd: 99,
            spe: 110
        },
        abilities: {
            0: "Queen's Command"
        },
        color: "Green",
		  eggGroups: ["Undiscovered"],
        heightm: 1.55,
        weightkg: 140.7,
    },
    scipod: {
        num: 7500258,
        species: "Scipod",
        types: ["Steel", "Bug"],
        baseStats: {
            hp: 82,
            atk: 137,
            def: 130,
            spa: 67,
            spd: 95,
            spe: 62
        },
        abilities: {
            0: "Guerilla Warfare"
        },
        color: "Red",
		  eggGroups: ["Bug"],
		  otherFormes: ["scipodmega"],
        heightm: 1.9,
        weightkg: 113,
    },
    scipodmega: {
        num: 7500258,
        species: "Scipod-Mega",
        baseSpecies: "Scipod",
        forme: "Mega",
        formeLetter: "M",
        types: ["Steel", "Bug"],
        baseStats: {
            hp: 82,
            atk: 157,
            def: 170,
            spa: 77,
            spd: 115,
            spe: 72
        },
        abilities: {
            0: "Technician"
        },
        color: "Red",
		  eggGroups: ["Bug"],
        heightm: 2.1,
        weightkg: 120,
    },
    necrozmerupt: {
        num: 7500259,
        species: "Necrozmerupt",
        types: ["Fire", "Psychic"],
        gender: "N",
        baseStats: {
            hp: 103,
            atk: 103,
            def: 85,
            spa: 136,
            spd: 82,
            spe: 59
        },
        abilities: {
            0: "Soulforged Diamond"
        },
        color: "Black",
		  eggGroups: ["Undiscovered"],
		  otherFormes: ["necrozmeruptmega"],
        heightm: 2.15,
        weightkg: 225,
    },
    necrozmeruptmega: {
        num: 7500259,
        species: "Necrozmerupt-Mega",
        baseSpecies: "Necrozmerupt",
        gender: "N",
        forme: "Mega",
        formeLetter: "M",
        types: ["Fire", "Psychic"],
        baseStats: {
            hp: 103,
            atk: 123,
            def: 115,
            spa: 176,
            spd: 112,
            spe: 39
        },
        abilities: {
            0: "Sheer Force"
        },
        color: "Black",
		  eggGroups: ["Undiscovered"],
        heightm: 2.75,
        weightkg: 325.5,
    },
    banekyu: {
        num: 7500260,
        species: "Banekyu",
        types: ["Ghost", "Fairy"],
        baseStats: {
            hp: 69,
            atk: 112,
            def: 82,
            spa: 76,
            spd: 94,
            spe: 90
        },
        abilities: {
            0: "Cursed Cloak"
        },
        color: "Yellow",
		  eggGroups: ["Amorphous"],
		  otherFormes: ["banekyubusted", "banekyumega"],
        heightm: 0.65,
        weightkg: 6.6,
    },
	banekyubusted: {
        num: 7500260,
        species: "Banekyu-Busted",
        baseSpecies: "Banekyu",
        forme: "Busted",
        formeLetter: "B",
        types: ["Ghost", "Fairy"],
        baseStats: {
            hp: 69,
            atk: 112,
            def: 82,
            spa: 76,
            spd: 94,
            spe: 90
        },
        abilities: {
            0: "Cursed Cloak"
        },
        color: "Yellow",
		  eggGroups: ["Amorphous"],
        heightm: 0.65,
        weightkg: 6.6,
    },
    banekyumega: {
        num: 7500260,
        species: "Banekyu-Mega",
        baseSpecies: "Banekyu",
        forme: "Mega",
        formeLetter: "M",
        types: ["Ghost", "Fairy"],
        baseStats: {
            hp: 69,
            atk: 162,
            def: 92,
            spa: 86,
            spd: 114,
            spe: 100
        },
        abilities: {
            0: "Prankster"
        },
        color: "Yellow",
		  eggGroups: ["Amorphous"],
        heightm: 0.75,
        weightkg: 7.1,
    },
    ninxys: {
        num: 7500261,
        species: "Ninxys",
        types: ["Psychic", "Bug"],
        gender: "N",
        baseStats: {
            hp: 56,
            atk: 93,
            def: 68,
            spa: 93,
            spd: 70,
            spe: 190
        },
        abilities: {
            0: "Light Speed"
        },
        color: "Yellow",
		  eggGroups: ["Undiscovered"],
        heightm: 1.25,
        weightkg: 36.4,
    },
    heratana: {
        num: 7500262,
        species: "Heratana",
        types: ["Bug", "Steel"],
        gender: "N",
        baseStats: {
            hp: 70,
            atk: 173,
            def: 103,
            spa: 49,
            spd: 83,
            spe: 97
        },
        abilities: {
            0: "Gutsy Beast"
        },
        heightm: 0.9,
        weightkg: 27.05,
        color: "White",
		  otherFormes: ["heratanamega"],
        eggGroups: ["Undiscovered"]
    },
    heratanamega: {
        num: 7500262,
        species: "Heratana-Mega",
        baseSpecies: "Heratana",
        forme: "Mega",
        formeLetter: "M",
        gender: "N",
        types: ["Bug", "Steel"],
        baseStats: {
            hp: 70,
            atk: 233,
            def: 143,
            spa: 49,
            spd: 93,
            spe: 87
        },
        abilities: {
            0: "Skill Link"
        },
        heightm: 1.1,
        weightkg: 35.55,
        color: "White",
        eggGroups: ["Undiscovered"]
    },
    plumin: {
        num: 7500263,
        species: "Plumin",
        types: ["Electric"],
        baseStats: {
            hp: 70,
            atk: 55,
            def: 55,
            spa: 90,
            spd: 90,
            spe: 105
        },
        abilities: {
            0: "Charged Up"
        },
        heightm: 0.4,
        weightkg: 4.2,
        color: "Yellow",
        eggGroups: ["Fairy"]
    },
    oxyblissdefense: {
        num: 7500264,
        species: "Oxybliss-Defense",
        types: ["Psychic", "Normal"],
        gender: "N",
        baseStats: {
            hp: 162,
            atk: 40,
            def: 105,
            spa: 72,
            spd: 157,
            spe: 72
        },
        abilities: {
            0: "Quarantine"
        },
        color: "Pink",
		  eggGroups: ["Undiscovered"],
        heightm: 1.6,
        weightkg: 53.8,
    },
    diggercatealola: {
        num: 7500265,
        species: "Diggercate-Alola",
        types: ["Normal", "Ground"],
        baseStats: {
            hp: 90,
            atk: 73,
            def: 83,
            spa: 55,
            spd: 88,
            spe: 87
        },
        abilities: {
            0: "High Stakes"
        },
        color: "Black",
		  eggGroups: ["Field"],
        heightm: 0.85,
        weightkg: 33.95,
    },
    inferperior: {
        num: 7500266,
        species: "Inferperior",
        types: ["Grass", "Fire"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 75,
            atk: 89,
            def: 83,
            spa: 89,
            spd: 83,
            spe: 110
        },
        abilities: {
            0: "Blazing Contrary"
        },
        color: "Brown",
		  eggGroups: ["Field"],
        heightm: 2.25,
        weightkg: 59,
    },
    mimukyu: {
        num: 7500267,
        species: "Mimukyu",
        types: ["Dark", "Fairy"],
        baseStats: {
            hp: 90,
            atk: 107,
            def: 87,
            spa: 67,
            spd: 112,
            spe: 83
        },
        abilities: {
            0: "Appropriation"
        },
		 otherFormes: ["mimukyubusted"],
        color: "Green",
		  eggGroups: ["Amorphous"],
        heightm: 0.6,
        weightkg: 26.35,
    },
	mimukyubusted: {
        num: 7500267,
        species: "Mimukyu-Busted",
		  baseSpecies: "Mimukyu",
		  forme: "Busted",
		  formeLetter: "B",
        types: ["Dark", "Fairy"],
        baseStats: {
            hp: 90,
            atk: 107,
            def: 87,
            spa: 67,
            spd: 112,
            spe: 83
        },
        abilities: {
            0: "Appropriation"
        },
        color: "Green",
		  eggGroups: ["Amorphous"],
        heightm: 0.6,
        weightkg: 26.35,
    },
    axatree: {
        num: 7500268,
        species: "Axatree",
        types: ["Psychic", "Electric"],
        gender: "N",
        baseStats: {
            hp: 69,
            atk: 69,
            def: 58,
            spa: 174,
            spd: 83,
            spe: 121
        },
        abilities: {
            0: "Beast Guard"
        },
        color: "Yellow",
		  eggGroups: ["Undiscovered"],
		  otherFormes: ["axatreemega"],
        heightm: 2.65,
        weightkg: 74,
    },
    axatreemega: {
        num: 7500268,
        species: "Axatree-Mega",
        baseSpecies: "Axatree",
        forme: "Mega",
        formeLetter: "M",
        gender: "N",
        types: ["Psychic", "Electric"],
        baseStats: {
            hp: 69,
            atk: 69,
            def: 78,
            spa: 214,
            spd: 93,
            spe: 151
        },
        abilities: {
            0: "Trace"
        },
        color: "Yellow",
		  eggGroups: ["Undiscovered"],
        heightm: 2.35,
        weightkg: 74,
    },
    cressapal: {
        num: 7500269,
        species: "Cressapal",
        types: ["Normal", "Psychic"],
        gender: "F",
        baseStats: {
            hp: 112,
            atk: 80,
            def: 110,
            spa: 70,
            spd: 110,
            spe: 65
        },
        abilities: {
            0: "Fear Shield"
        },
        color: "Yellow",
		  eggGroups: ["Undiscovered"],
        heightm: 1.5,
        weightkg: 49.8,
    },
    necrior: {
        num: 7500270,
        species: "Necrior",
        types: ["Grass", "Psychic"],
        gender: "N",
        baseStats: {
            hp: 86,
            atk: 91,
            def: 100,
            spa: 120,
            spd: 92,
            spe: 115
        },
        abilities: {
            0: "Inverse Armor"
        },
        color: "Black",
		  eggGroups: ["Undiscovered"],
        heightm: 2.85,
        weightkg: 146.5,
    },
    cinshado: {
        num: 7500271,
        species: "Cinshado",
        types: ["Normal", "Fighting"],
        genderRatio: {M: 0.25, F: 0.75},
        baseStats: {
            hp: 82,
            atk: 130,
            def: 70,
            spa: 77,
            spd: 75,
            spe: 140
        },
        abilities: {
            0: "Frenzy"
        },
        color: "Gray",
		  eggGroups: ["Undiscovered"],
        heightm: 0.6,
        weightkg: 14.85,
    },
    altellow: {
        num: 7500272,
        species: "Altellow",
        types: ["Dragon", "Normal"],
        baseStats: {
            hp: 77,
            atk: 87,
            def: 85,
            spa: 82,
            spd: 87,
            spe: 112
        },
        abilities: {
            0: "Puffy Cloud"
        },
        color: "Blue",
		  eggGroups: ["Flying"],
		  otherFormes: ["altellowmega"],
        heightm: 0.9,
        weightkg: 20.2,
    },
    altellowmega: {
        num: 7500272,
        species: "Altellow-Mega",
        baseSpecies: "Altellow",
        forme: "Mega",
        formeLetter: "M",
        types: ["Dragon", "Fairy"],
        baseStats: {
            hp: 77,
            atk: 127,
            def: 105,
            spa: 122,
            spd: 87,
            spe: 112
        },
        abilities: {
            0: "Pixilate"
        },
        color: "Blue",
		  eggGroups: ["Flying"],
        heightm: 1.3,
        weightkg: 20.2,
    },
celebi: {
		num: 251,
		species: "Celebi",
		types: ["Psychic", "Grass"],
		gender: "N",
		baseStats: {hp: 100, atk: 100, def: 100, spa: 100, spd: 100, spe: 100},
		abilities: {0: "Natural Cure"},
		heightm: 0.6,
		weightkg: 5,
		color: "Green",
		eggGroups: ["Undiscovered"],
	},
	riolu: {
		num: 447,
		species: "Riolu",
		types: ["Fighting"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 40, atk: 70, def: 40, spa: 35, spd: 40, spe: 60},
		abilities: {0: "Steadfast", 1: "Inner Focus", H: "Prankster"},
		heightm: 0.7,
		weightkg: 20.2,
		color: "Blue",
		evos: ["lucario"],
		eggGroups: ["Undiscovered"],
	},
    rebell: {
        num: 7500273,
        species: "Rebell",
        types: ["Fighting", "Psychic"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
        baseStats: {
            hp: 70,
            atk: 85,
            def: 80,
            spa: 67,
            spd: 90,
            spe: 100
        },
        abilities: {
            0: "Tinkering"
        },
        color: "Blue",
        heightm: 0.65,
        weightkg: 12.6,
		 fusion: ["Riolu", "Celebi"],
		  eggGroups: ["Undiscovered"],
    },
    combarde: {
        num: 7500274,
        species: "Combarde",
        types: ["Fighting", "Ground"],
        baseStats: {
            hp: 94,
            atk: 112,
            def: 100,
            spa: 83,
            spd: 77,
            spe: 75
        },
        abilities: {
            0: "Sluggish Aura"
        },
        color: "Red",
        heightm: 2.95,
        weightkg: 162.25,
		  eggGroups: ["Undiscovered"],
    },
    dittsey: {
        num: 7500275,
        species: "Dittsey",
        types: ["Normal"],
        gender: "N",
        baseStats: {
            hp: 167,
            atk: 31,
            def: 36,
            spa: 61,
            spd: 106,
            spe: 51
        },
        abilities: {
            0: "Troll"
        },
        color: "Purple",
        heightm: 0.9,
        weightkg: 25.4,
		  eggGroups: ["Fairy"],
    },
    aravealola: {
        num: 7500276,
        species: "A Rave-Alola",
        types: ["Electric", "Normal"],
        baseStats: {
            hp: 87,
            atk: 127,
            def: 117,
            spa: 82,
            spd: 102,
            spe: 77
        },
        abilities: {
            0: "Optimize"
        },
        color: "Gray",
        heightm: 2.1,
        weightkg: 215,
		  eggGroups: ["Undiscovered"],
    },
    aravealolafire: {
        num: 7500276,
        species: "A Rave-Alola-Fire",
        baseSpecies: "A Rave-Alola",
        forme: "Fire",
        formeLetter: "F",
        types: ["Electric", "Fire"],
        baseStats: {
            hp: 87,
            atk: 127,
            def: 117,
            spa: 82,
            spd: 102,
            spe: 77
        },
        abilities: {
            0: "Optimize"
        },
        color: "Gray",
        heightm: 2.1,
        weightkg: 215,
		  eggGroups: ["Undiscovered"],
    },
    aravealolawater: {
        num: 7500276,
        species: "A Rave-Alola-Water",
        baseSpecies: "A Rave-Alola",
        forme: "Water",
        formeLetter: "W",
        types: ["Electric", "Water"],
        baseStats: {
            hp: 87,
            atk: 127,
            def: 117,
            spa: 82,
            spd: 102,
            spe: 77
        },
        abilities: {
            0: "Optimize"
        },
        color: "Gray",
        heightm: 2.1,
        weightkg: 215,
		  eggGroups: ["Undiscovered"],
    },
    aravealolaelectric: {
        num: 7500276,
        species: "A Rave-Alola-Electric",
        baseSpecies: "A Rave-Alola",
        forme: "Electric",
        formeLetter: "E",
        types: ["Electric"],
        baseStats: {
            hp: 87,
            atk: 127,
            def: 117,
            spa: 82,
            spd: 102,
            spe: 77
        },
        abilities: {
            0: "Optimize"
        },
        color: "Gray",
        heightm: 2.1,
        weightkg: 215,
		  eggGroups: ["Undiscovered"],
    },
    aravealolagrass: {
        num: 7500276,
        species: "A Rave-Alola-Grass",
        baseSpecies: "A Rave-Alola",
        forme: "Grass",
        formeLetter: "G",
        types: ["Electric", "Grass"],
        baseStats: {
            hp: 87,
            atk: 127,
            def: 117,
            spa: 82,
            spd: 102,
            spe: 77
        },
        abilities: {
            0: "Optimize"
        },
        color: "Gray",
        heightm: 2.1,
        weightkg: 215,
		  eggGroups: ["Undiscovered"],
    },
    aravealolaice: {
        num: 7500276,
        species: "A Rave-Alola-Ice",
        baseSpecies: "A Rave-Alola",
        forme: "Ice",
        formeLetter: "I",
        types: ["Electric", "Ice"],
        baseStats: {
            hp: 87,
            atk: 127,
            def: 117,
            spa: 82,
            spd: 102,
            spe: 77
        },
        abilities: {
            0: "Optimize"
        },
        color: "Gray",
        heightm: 2.1,
        weightkg: 215,
		  eggGroups: ["Undiscovered"],
    },
    aravealolafighting: {
        num: 7500276,
        species: "A Rave-Alola-Fighting",
        baseSpecies: "A Rave-Alola",
        forme: "Fighting",
        formeLetter: "F",
        types: ["Electric", "Fighting"],
        baseStats: {
            hp: 87,
            atk: 127,
            def: 117,
            spa: 82,
            spd: 102,
            spe: 77
        },
        abilities: {
            0: "Optimize"
        },
        color: "Gray",
        heightm: 2.1,
        weightkg: 215,
		  eggGroups: ["Undiscovered"],
    },
    aravealolapoison: {
        num: 7500276,
        species: "A Rave-Alola-Poison",
        baseSpecies: "A Rave-Alola",
        forme: "Poison",
        formeLetter: "P",
        types: ["Electric", "Poison"],
        baseStats: {
            hp: 87,
            atk: 127,
            def: 117,
            spa: 82,
            spd: 102,
            spe: 77
        },
        abilities: {
            0: "Optimize"
        },
        color: "Gray",
        heightm: 2.1,
        weightkg: 215,
		  eggGroups: ["Undiscovered"],
    },
    aravealolaground: {
        num: 7500276,
        species: "A Rave-Alola-Ground",
        baseSpecies: "A Rave-Alola",
        forme: "Ground",
        formeLetter: "G",
        types: ["Electric", "Ground"],
        baseStats: {
            hp: 87,
            atk: 127,
            def: 117,
            spa: 82,
            spd: 102,
            spe: 77
        },
        abilities: {
            0: "Optimize"
        },
        color: "Gray",
        heightm: 2.1,
        weightkg: 215,
		  eggGroups: ["Undiscovered"],
    },
    aravealolaflying: {
        num: 7500276,
        species: "A Rave-Alola-Flying",
        baseSpecies: "A Rave-Alola",
        forme: "Flying",
        formeLetter: "F",
        types: ["Electric", "Flying"],
        baseStats: {
            hp: 87,
            atk: 127,
            def: 117,
            spa: 82,
            spd: 102,
            spe: 77
        },
        abilities: {
            0: "Optimize"
        },
        color: "Gray",
        heightm: 2.1,
        weightkg: 215,
		  eggGroups: ["Undiscovered"],
    },
    aravealolapsychic: {
        num: 7500276,
        species: "A Rave-Alola-Psychic",
        baseSpecies: "A Rave-Alola",
        forme: "Psychic",
        formeLetter: "P",
        types: ["Electric", "Psychic"],
        baseStats: {
            hp: 87,
            atk: 127,
            def: 117,
            spa: 82,
            spd: 102,
            spe: 77
        },
        abilities: {
            0: "Optimize"
        },
        color: "Gray",
        heightm: 2.1,
        weightkg: 215,
		  eggGroups: ["Undiscovered"],
    },
    aravealolabug: {
        num: 7500276,
        species: "A Rave-Alola-Bug",
        baseSpecies: "A Rave-Alola",
        forme: "Bug",
        formeLetter: "B",
        types: ["Electric", "Bug"],
        baseStats: {
            hp: 87,
            atk: 127,
            def: 117,
            spa: 82,
            spd: 102,
            spe: 77
        },
        abilities: {
            0: "Optimize"
        },
        color: "Gray",
        heightm: 2.1,
        weightkg: 215,
		  eggGroups: ["Undiscovered"],
    },
    aravealolarock: {
        num: 7500276,
        species: "A Rave-Alola-Rock",
        baseSpecies: "A Rave-Alola",
        forme: "Rock",
        formeLetter: "R",
        types: ["Electric", "Rock"],
        baseStats: {
            hp: 87,
            atk: 127,
            def: 117,
            spa: 82,
            spd: 102,
            spe: 77
        },
        abilities: {
            0: "Optimize"
        },
        color: "Gray",
        heightm: 2.1,
        weightkg: 215,
		  eggGroups: ["Undiscovered"],
    },
    aravealolaghost: {
        num: 7500276,
        species: "A Rave-Alola-Ghost",
        baseSpecies: "A Rave-Alola",
        forme: "Ghost",
        formeLetter: "G",
        types: ["Electric", "Ghost"],
        baseStats: {
            hp: 87,
            atk: 127,
            def: 117,
            spa: 82,
            spd: 102,
            spe: 77
        },
        abilities: {
            0: "Optimize"
        },
        color: "Gray",
        heightm: 2.1,
        weightkg: 215,
		  eggGroups: ["Undiscovered"],
    },
    aravealoladragon: {
        num: 7500276,
        species: "A Rave-Alola-Dragon",
        baseSpecies: "A Rave-Alola",
        forme: "Dragon",
        formeLetter: "D",
        types: ["Electric", "Fire"],
        baseStats: {
            hp: 87,
            atk: 127,
            def: 117,
            spa: 82,
            spd: 102,
            spe: 77
        },
        abilities: {
            0: "Optimize"
        },
        color: "Gray",
        heightm: 2.1,
        weightkg: 215,
		  eggGroups: ["Undiscovered"],
    },
    aravealoladark: {
        num: 7500276,
        species: "A Rave-Alola-Dark",
        baseSpecies: "A Rave-Alola",
        forme: "Dark",
        formeLetter: "D",
        types: ["Electric", "Dark"],
        baseStats: {
            hp: 87,
            atk: 127,
            def: 117,
            spa: 82,
            spd: 102,
            spe: 77
        },
        abilities: {
            0: "Optimize"
        },
        color: "Gray",
        heightm: 2.1,
        weightkg: 215,
		  eggGroups: ["Undiscovered"],
    },
    aravealolasteel: {
        num: 7500276,
        species: "A Rave-Alola-Steel",
        baseSpecies: "A Rave-Alola",
        forme: "Steel",
        formeLetter: "S",
        types: ["Electric", "Steel"],
        baseStats: {
            hp: 87,
            atk: 127,
            def: 117,
            spa: 82,
            spd: 102,
            spe: 77
        },
        abilities: {
            0: "Optimize"
        },
        color: "Gray",
        heightm: 2.1,
        weightkg: 215,
		  eggGroups: ["Undiscovered"],
    },
    aravealolafairy: {
        num: 7500276,
        species: "A Rave-Alola-Fairy",
        baseSpecies: "A Rave-Alola",
        forme: "Fairy",
        formeLetter: "F",
        types: ["Electric", "Fairy"],
        baseStats: {
            hp: 87,
            atk: 127,
            def: 117,
            spa: 82,
            spd: 102,
            spe: 77
        },
        abilities: {
            0: "Optimize"
        },
        color: "Gray",
        heightm: 2.1,
        weightkg: 215,
		  eggGroups: ["Undiscovered"],
    },
    miminja: {
        num: 7500277,
        species: "Miminja",
        types: ["Dark", "Ghost"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 63,
            atk: 112,
            def: 78,
            spa: 76,
            spd: 88,
            spe: 124
        },
        abilities: {
            0: "Resurrection"
        },
        color: "Yellow",
        heightm: 0.85,
        weightkg: 20.35,
		  eggGroups: ["Undiscovered"],
    },
    miminjareborn: {
        num: 7500277,
        species: "Miminja-Reborn",
        baseSpecies: "Miminja",
        forme: "Reborn",
        formeLetter: "R",
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        types: ["Dark", "Ghost"],
        baseStats: {
            hp: 63,
            atk: 162,
            def: 78,
            spa: 126,
            spd: 88,
            spe: 134
        },
        abilities: {
            0: "Resurrection Done"
        },
        color: "Yellow",
        heightm: 0.85,
        weightkg: 20.35,
		  eggGroups: ["Undiscovered"],
    },
    murkaleo: {
        num: 7500278,
        species: "Murkaleo",
        types: ["Flying", "Steel"],
        baseStats: {
            hp: 98,
            atk: 115,
            def: 79,
            spa: 99,
            spd: 81,
            spe: 114
        },
        abilities: {
            0: "Bamboozled"
        },
        color: "Black",
        heightm: 1.95,
        weightkg: 116.05,
		  eggGroups: ["Undiscovered"],
    },
    zekronaw: {
        num: 7500279,
        species: "Zekronaw",
        types: ["Electric", "Water"],
        genderRatio: {M: 0.875, F: 0.125},
        baseStats: {
            hp: 82,
            atk: 130,
            def: 100,
            spa: 99,
            spd: 81,
            spe: 99
        },
        abilities: {
            0: "Tetra Force"
        },
        color: "Black",
        heightm: 2,
        weightkg: 185,
		  eggGroups: ["Undiscovered"],
    },
    quinda: {
        num: 7500280,
        species: "Quinda",
        types: ["Normal", "Flying"],
        baseStats: {
            hp: 102,
            atk: 105,
            def: 80,
            spa: 105,
            spd: 80,
            spe: 87
        },
        abilities: {
            0: "Weather Contradiction"
        },
        color: "Green",
        heightm: 4.05,
        weightkg: 105.75,
		  otherFormes: ["quindamega"],
        eggGroups: ["Undiscovered"]
    },
    quindamega: {
        num: 7500280,
        species: "Quinda-Mega",
        baseSpecies: "Quinda",
        forme: "Mega",
        formeLetter: "M",
        types: ["Normal", "Flying"],
        baseStats: {
            hp: 102,
            atk: 135,
            def: 90,
            spa: 135,
            spd: 90,
            spe: 107
        },
        abilities: {
            0: "Delta Stream"
        },
        color: "Green",
        heightm: 7.35,
        weightkg: 291.25,
        eggGroups: ["Undiscovered"]
    },
    sablegigas: {
        num: 7500281,
        species: "Sablegigas",
        types: ["Normal", "Ghost"],
        baseStats: {
            hp: 90,
            atk: 122,
            def: 102,
            spa: 72,
            spd: 102,
            spe: 75
        },
        abilities: {
            0: "Slow Surge"
        },
        color: "Purple",
        heightm: 2.1,
        weightkg: 215.5,
		  otherFormes: ["sablegigasmega"],
		  eggGroups: ["Undiscovered"],
    },
    sablegigasmega: {
        num: 7500281,
        species: "Sablegigas-Mega",
        baseSpecies: "Sablegigas",
        forme: "Mega",
        formeLetter: "M",
        types: ["Normal", "Ghost"],
        baseStats: {
            hp: 90,
            atk: 132,
            def: 152,
            spa: 92,
            spd: 152,
            spe: 45
        },
        abilities: {
            0: "Magic Bounce"
        },
        color: "Purple",
        heightm: 2.1,
        weightkg: 365.5,
		  eggGroups: ["Undiscovered"],
    },
    galvillon: {
        num: 7500282,
        species: "Galvillon",
        types: ["Electric", "Flying"],
        baseStats: {
            hp: 90,
            atk: 79,
            def: 70,
            spa: 108,
            spd: 70,
            spe: 113
        },
        abilities: {
            0: "Compound Eyes"
        },
        color: "Yellow",
        heightm: 1,
        weightkg: 15.65,
		  eggGroups: ["Bug"],
    },
    kyonun: {
        num: 7500283,
        species: "Kyonun",
        types: ["Electric", "Water"],
        baseStats: {
            hp: 80,
            atk: 70,
            def: 90,
            spa: 122,
            spd: 122,
            spe: 92
        },
        abilities: {
            0: "Electron Rain"
        },
        color: "Blue",
		  eggGroups: ["Undiscovered"],
        heightm: 2.45,
        weightkg: 178.1,
    dexentry: "Of the rare cases of a DNA Fusion not being done by Team Rocket. This powerful mermaid-like rodent was created by Team Aqua, after succesful capture of the Blue Orb. Their attempts at testing the Blue Orb on different species reacted with a Minun, which had then recieved Kyogre's powers contained in the Orb, becoming Kyonun. It swims through the oceans at high speeds, and has tremendous power when it is raining, capable of delievering shocks of over 10.000 Volts."
    },
    kyonunprimal: {
        num: 7500283,
        species: "Kyonun-Primal",
        baseSpecies: "Kyonun",
        forme: "Primal",
        formeLetter: "P",
        types: ["Electric", "Water"],
        baseStats: {
            hp: 80,
            atk: 120,
            def: 90,
            spa: 152,
            spd: 142,
            spe: 92
        },
        abilities: {
            0: "Primordial Sea"
        },
        color: "Blue",
        heightm: 7.75,
        weightkg: 256.1,
		  eggGroups: ["Undiscovered"],
    },
    abomasorus: {
        num: 7500284,
        species: "Abomasorus",
        types: ["Ice", "Ground"],
        gender: "M",
        baseStats: {
            hp: 95,
            atk: 125,
            def: 90,
            spa: 105,
            spd: 90,
            spe: 80
        },
        abilities: {
            0: "Petrify"
        },
        color: "White",
        heightm: 1.75,
        weightkg: 101.75,
		  otherFormes: ["abomasorusmega"],
		  eggGroups: ["Undiscovered"],
    },
    abomasorusmega: {
        num: 7500284,
        species: "Abomasorus-Mega",
        baseSpecies: "Abomasorus",
        forme: "Mega",
        formeLetter: "M",
        gender: "M",
        types: ["Ice", "Ground"],
        baseStats: {
            hp: 95,
            atk: 165,
            def: 120,
            spa: 145,
            spd: 110,
            spe: 50
        },
        abilities: {
            0: "Snow Warning"
        },
        color: "White",
        heightm: 2.25,
        weightkg: 151.25,
		  eggGroups: ["Undiscovered"],
    },
    toxicario: {
        num: 7500285,
        species: "Toxicario",
        types: ["Poison", "Fighting"],
        genderRatio: {
            M: 0.75,
            F: 0.25
        },
        baseStats: {
            hp: 86,
            atk: 118,
            def: 77,
            spa: 110,
            spd: 77,
            spe: 97
        },
        abilities: {
            0: "Triggered"
        },
        color: "Blue",
        heightm: 1.25,
        weightkg: 49.2,
		  otherFormes: ["toxicariomega"],
		  eggGroups: ["Human-Like"],
    },
    toxicariomega: {
        num: 7500285,
        species: "Toxicario-Mega",
        baseSpecies: "Toxicario",
        forme: "Mega",
        formeLetter: "M",
        genderRatio: {M: 0.75, F: 0.25},
        types: ["Poison", "Fighting"],
        baseStats: {
            hp: 86,
            atk: 153,
            def: 95,
            spa: 135,
            spd: 77,
            spe: 119
        },
        abilities: {
            0: "Adaptability"
        },
        color: "Blue",
        heightm: 1.35,
        weightkg: 52.7,
		  eggGroups: ["Human-Like"],
    },
    washoxchromosome: {
        num: 7500286,
        species: "Washox",
        gender: "N",
		  baseForme: "Chromosome",
        types: ["Water", "Psychic"],
        baseStats: {
            hp: 47,
            atk: 145,
            def: 100,
            spa: 145,
            spd: 102,
            spe: 110
        },
        abilities: {
            0: "Mitosis"
        },
        color: "Red",
        heightm: 4.95,
        weightkg: 69.7,
		  eggGroups: ["Undiscovered"],
    },
    washoxstrand: {
        num: 7500286,
        species: "Washox-Strand",
        baseSpecies: "Washox",
        gender: "N",
        forme: "Strand",
        formeLetter: "S",
        types: ["Water", "Psychic"],
        baseStats: {
            hp: 47,
            atk: 20,
            def: 14,
            spa: 20,
            spd: 14,
            spe: 120
        },
        abilities: {
            0: "Mitosis"
        },
        color: "Red",
        heightm: 0.1,
        weightkg: 0.25,
		  eggGroups: ["Undiscovered"],
    },
    hoorbok: {
        num: 7500287,
        species: "Hoorbok",
        types: ["Poison", "Dark"],
        baseStats: {
            hp: 90,
            atk: 135,
            def: 65,
            spa: 120,
            spd: 105,
            spe: 90
        },
        abilities: {
            0: "Prestidigitation"
        },
        color: "Purple",
        heightm: 5,
        weightkg: 277.5,
		  eggGroups: ["Undiscovered"],
    },
    ninetalesprime: {
		  num: 38,
		  species: "Ninetales-Prime",
		  baseSpecies: "Ninetales",
        genderRatio: {M: 0.25, F: 0.75},
		  forme: "Prime",
		  formeLetter: "P",
        types: ["Ice", "Fire"],
        baseStats: {
            hp: 83,
            atk: 81,
            def: 85,
            spa: 91,
            spd: 110,
            spe: 114
        },
        abilities: {
            0: "Solar Snow"
        },
        color: "White",
        heightm: 1.1,
        weightkg: 19.9,
		  eggGroups: ["Field"],
    },
    blampa: {
        num: 7500289,
        species: "Blampa",
        types: ["Water", "Dragon"],
        genderRatio: {M: 0.75, F: 0.25},
        baseStats: {
            hp: 88,
            atk: 81,
            def: 102,
            spa: 120,
            spd: 108,
            spe: 67
        },
        abilities: {
            0: "Torrential Rage"
        },
        color: "Blue",
        heightm: 2.3,
        weightkg: 135.25,
		  otherFormes: ["blampamega"],
		  eggGroups: ["Monster"],
    },
    blampamega: {
        num: 7500289,
        species: "Blampa-Mega",
        baseSpecies: "Blampa",
        forme: "Mega",
        formeLetter: "M",
        types: ["Water", "Dragon"],
        genderRatio: {M: 0.75, F: 0.25},
        baseStats: {
            hp: 88,
            atk: 101,
            def: 122,
            spa: 170,
            spd: 118,
            spe: 67
        },
        abilities: {
            0: "Mega Launcher"
        },
        color: "Blue",
        heightm: 2.3,
        weightkg: 150.85,
		  eggGroups: ["Monster"],
    },
    origamiswan: {
        num: 7500290,
        species: "Origami-Swan",
        types: ["Psychic", "Steel"],
        gender: "N",
        baseStats: {
            hp: 87,
            atk: 82,
            def: 92,
            spa: 124,
            spd: 112,
            spe: 79
        },
        abilities: {
            0: "Fluttering Heart"
        },
        color: "Pink",
        heightm: 0.8,
        weightkg: 41.95,
		  eggGroups: ["Undiscovered"],
    },
    kecleus: {
        num: 7500291,
        species: "Kecleus",
        types: ["Normal"],
        baseStats: {
            hp: 90,
            atk: 105,
            def: 100,
            spa: 105,
            spd: 120,
            spe: 100
        },
        abilities: {
            0: "Prototype"
        },
        color: "Green",
        heightm: 2.1,
        weightkg: 171,
		  eggGroups: ["Undiscovered"],
    },	
    fearroh: {
        num: 7500292,
        species: "Fear-Roh",
        types: ["Flying"],
        baseStats: {
            hp: 85,
            atk: 125,
            def: 97,
            spa: 85,
            spd: 107,
            spe: 100
        },
        abilities: {
            0: "Sharpshooter"
        },
        heightm: 2.5,
        weightkg: 118.5,
		  eggGroups: ["Undiscovered"],
    },
    neoprene: {
        num: 7500293,
        species: "Neoprene",
        types: ["Steel"],
        gender: "N",
        baseStats: {
            hp: 100,
            atk: 90,
            def: 108,
            spa: 135,
            spd: 108,
            spe: 62
        },
        abilities: {
            0: "Rubber Up"
        },
        color: "Blue",
        heightm: 1.35,
        weightkg: 82.5,
		  eggGroups: ["Undiscovered"],
    },
    maroramalola: {
        num: 7500294,
        species: "Maroram-Alola",
        types: ["Fire"],
        baseStats: {
            hp: 80,
            atk: 108,
            def: 108,
            spa: 108,
            spd: 108,
            spe: 80
        },
        abilities: {
            0: "Turbo Curse"
        },
        color: "Purple",
        heightm: 2.1,
        weightkg: 182,
		  eggGroups: ["Undiscovered"],
    },
    genny: {
        num: 7500295,
        species: "Genny",
        types: ["Bug"],
        gender: "N",
        baseStats: {
            hp: 73,
            atk: 131,
            def: 87,
            spa: 115,
            spd: 87,
            spe: 95
        },
        abilities: {
            0: "Revved Up"
        },
        color: "Purple",
        heightm: 1.35,
        weightkg: 51.5,
		  eggGroups: ["Undiscovered"],
    },
    sylvoko: {
        num: 7500296,
        species: "Sylvoko",
        types: ["Fairy"],
        genderRatio: {M: 0.875, F: 0.125},
        baseStats: {
            hp: 82,
            atk: 100,
            def: 75,
            spa: 112,
            spd: 102,
            spe: 115
        },
        abilities: {
            0: "Misty Supercharge"
        },
        color: "Yellow",
        heightm: 1.4,
        weightkg: 22,
		  eggGroups: ["Undiscovered"],
    },
    miniancie: {
        num: 7500297,
        species: "Miniancie",
		  baseForme: "Ore",
        types: ["Rock"],
        gender: "N",
        baseStats: {
            hp: 55,
            atk: 80,
            def: 145,
            spa: 80,
            spd: 145,
            spe: 55
        },
        abilities: {
            0: "Crystallized Shield"
        },
        color: "Pink",
        heightm: 0.5,
        weightkg: 44.25,
		  otherFormes: ["minianciejewel", "minianciemegaore", "minianciemegajewel"],
		  eggGroups: ["Undiscovered"],
    },
    minianciejewel: {
        num: 7500297,
        species: "Miniancie-Jewel",
        baseSpecies: "Miniancie",
        gender: "N",
        forme: "Jewel",
        formeLetter: "J",
        types: ["Rock"],
        baseStats: {
            hp: 55,
            atk: 145,
            def: 80,
            spa: 145,
            spd: 80,
            spe: 115
        },
        abilities: {
            0: "Crystallized Shield"
        },
        color: "Pink",
        heightm: 0.5,
        weightkg: 4.55,
		  eggGroups: ["Undiscovered"],
    },
    minianciemegaore: {
        num: 7500297,
        species: "Miniancie-Mega-Ore",
        baseSpecies: "Miniancie",
        gender: "N",
        forme: "Mega-Ore",
        formeLetter: "M",
        baseStats: {
            hp: 55,
            atk: 140,
            def: 105,
            spa: 140,
            spd: 105,
            spe: 115
        },
        abilities: {
            0: "Crystallized Shield"
        },
        color: "Pink",
        heightm: 0.9,
        weightkg: 63.25,
		  eggGroups: ["Undiscovered"],
    },
    minianciemegajewel: {
        num: 7500297,
        species: "Miniancie-Mega-Jewel",
        baseSpecies: "Miniancie",
        gender: "N",
        forme: "Mega-Jewel",
        formeLetter: "M",
        baseStats: {
            hp: 55,
            atk: 205,
            def: 40,
            spa: 205,
            spd: 40,
            spe: 175
        },
        abilities: {
            0: "Crystallized Shield"
        },
        color: "Pink",
        heightm: 0.9,
        weightkg: 23.55,
		  eggGroups: ["Undiscovered"],
    },
    tapudede: {
        num: 7500298,
        species: "Tapu Dede",
        types: ["Grass"],
        gender: "N",
        baseStats: {
            hp: 79,
            atk: 150,
            def: 110,
            spa: 85,
            spd: 100,
            spe: 57
        },
        abilities: {
            0: "Grassworker"
        },
        color: "Green",
        heightm: 2.9,
        weightkg: 127.75,
		  eggGroups: ["Undiscovered"],
    },
    shenala: {
        num: 7500299,
        species: "Shenala",
        types: ["Ghost"],
        gender: "N",
        baseStats: {
            hp: 69,
            atk: 111,
            def: 67,
            spa: 103,
            spd: 68,
            spe: 78
        },
        abilities: {
            0: "Shadow Guard"
        },
        color: "Purple",
        heightm: 2.4,
        weightkg: 60.6,
		  eggGroups: ["Undiscovered"],
    },
    entir: {
        num: 7500300,
        species: "Entir",
        types: ["Fire", "Bug"],
        baseStats: {
            hp: 90,
            atk: 140,
            def: 92,
            spa: 72,
            spd: 72,
            spe: 112
        },
        abilities: {
            0: "Vexing Valor"
        },
        color: "Brown",
        heightm: 1.8,
        weightkg: 126.5,
		  otherFormes: ["entir"],
		  eggGroups: ["Undiscovered"],
    },
    entirmega: {
        num: 7500300,
        species: "Entir-Mega",
        baseSpecies: "Entir",
        forme: "Mega",
        formeLetter: "M",
        types: ["Fire", "Flying"],
        baseStats: {
            hp: 90,
            atk: 170,
            def: 112,
            spa: 82,
            spd: 92,
            spe: 132
        },
        abilities: {
            0: "Aerilate"
        },
        color: "Brown",
        heightm: 2,
        weightkg: 130.5,
		  eggGroups: ["Undiscovered"],
    },
    giramini: {
        num: 7500301,
        species: "Giramini",
        types: ["Ghost", "Rock"],
        gender: "N",
        baseStats: {
            hp: 110,
            atk: 80,
            def: 125,
            spa: 80,
            spd: 125,
            spe: 80
        },
        abilities: {
            0: "Compression"
        },
        color: "Black",
        heightm: 2.4,
        weightkg: 395,
		  eggGroups: ["Undiscovered"],
		  otherFormes: ["giraminiunleashed"],
    },
    giraminiunleashed: {
        num: 7500301,
        species: "Giramini-Unleashed",
        baseSpecies: "Giramini",
        forme: "Unleashed",
        formeLetter: "U",
        gender: "N",
        types: ["Ghost", "Rock"],
        baseStats: {
            hp: 110,
            atk: 125,
            def: 80,
            spa: 125,
            spd: 80,
            spe: 140
        },
        abilities: {
            0: "Compression"
        },
        color: "Black",
        heightm: 4.8,
        weightkg: 255.3,
		  eggGroups: ["Undiscovered"],
    },
    aquapod: {
        num: 7500302,
        species: "Aquapod",
        types: ["Water", "Bug"],
        baseStats: {
            hp: 81,
            atk: 107,
            def: 126,
            spa: 65,
            spd: 121,
            spe: 51
        },
        abilities: {
            0: "Bubble Slip"
		  },
        color: "Gray",
		  eggGroups: ["Bug"],
        heightm: 1.9,
        weightkg: 95,
       dexentry: "Upon first being encountered in the wild, it was thought to be an UB, due to it's oddity. However, upon more reserach being done, it was discovered that it is one of the many recently discovered hybrids. It is able to walk on water surfaces with it's thin four legs, and has a huge bubble around it's head. It uses bubbles to make the floor slippery to increase it's speed. It's still unknown wether this fusion has two eyes or four, as it was not indentified if it has an eye inside another, compound eyes, or just two huge eyes."
    },
    reshivine: {
        num: 7500303,
        species: "Reshivine",
        types: ["Dragon", "Grass"],
        genderRatio: {M: 0.875, F: 0.125},
        baseStats: {
            hp: 80,
            atk: 90,
            def: 90,
            spa: 120,
            spd: 100,
            spe: 105
        },
        abilities: {
            0: "Spiral Flames"
        },
        color: "White",
        heightm: 2,
        weightkg: 173,
		  eggGroups: ["Undiscovered"],
    },
    rosium: {
        num: 7500304,
        species: "Rosium",
        types: ["Poison", "Grass"],
        genderRatio: {M: 0.75, F: 0.25},
        baseStats: {
            hp: 80,
            atk: 86,
            def: 92,
            spa: 114,
            spd: 112,
            spe: 95
        },
        abilities: {
            0: "Operation Overgrow"
        },
        color: "Green",
        heightm: 1.35,
        weightkg: 57.5,
		  eggGroups: ["Grass"],
       dexentry: "After evolving from Roseleef, Subject #304 broke out of confinement. Subject #74, even when Mega Evolved, was taken out effortlessly, as was Subject #83. Subject #59, which is only meant to be used in dire situations, was required to restrain it. Subject #304 has been successfully inhibited. Though it still has very strong Grass-type moves, it is no longer likely to effortlessly break through our most defensive fusions.",
    },
		eevee: {
			num: 133,
			species: "Eevee",
			types: ["Normal"],
			genderRatio: {M: 0.875, F: 0.125},
			baseStats: {hp: 55, atk: 55, def: 50, spa: 45, spd: 65, spe: 55},
			abilities: {0: "Run Away", 1: "Adaptability", H: "Anticipation"},
			heightm: 0.3,
			weightkg: 6.5,
			color: "Brown",
			evos: ["vaporeon", "jolteon", "flareon", "espeon", "umbreon", "leafeon", "glaceon", "sylveon", "valveon"],
			eggGroups: ["Field"],
		},
    valveon: {
        num: 7500305,
        species: "Valveon",
        types: ["Water", "Fairy"],
			genderRatio: {M: 0.875, F: 0.125},
        baseStats: {
            hp: 122,
            atk: 75,
            def: 72,
            spa: 120,
            spd: 122,
            spe: 72
        },
        abilities: {
            0: "Pixie Absorb"
        },
        color: "Blue",
		 prevo: "eevee",
		 evoType: "levelExtra",
		 evoCondition: "with a Water-type move and two levels of Affection",
       heightm: 1,
       weightkg: 26.25,
		 eggGroups: ["Field"],
    },
    raptalon: {
        num: 7500306,
        species: "Raptalon",
        types: ["Flying", "Fire"],
        baseStats: {
            hp: 91,
            atk: 110,
            def: 80,
            spa: 72,
            spd: 74,
            spe: 123
        },
        abilities: {
            0: "Fearless"
        },
        color: "Brown",
        heightm: 1.2,
        weightkg: 24.7,
		  eggGroups: ["Flying"],
    },
    deoxurkoutlet: {
        num: 7500307,
        species: "Deoxurk-Outlet",
        types: ["Psychic", "Electric"],
        gender: "N",
        baseStats: {
            hp: 86,
            atk: 79,
            def: 120,
            spa: 131,
            spd: 120,
            spe: 86
        },
        abilities: {
            0: "Peer Pressure"
        },
        color: "Black",
        heightm: 2.75,
        weightkg: 80.4,
		  eggGroups: ["Undiscovered"],
    },
    dio: {
        num: 7500308,
        species: "Dio",
        types: ["Steel", "Normal"],
        baseStats: {
            hp: 90,
            atk: 90,
            def: 100,
            spa: 92,
            spd: 87,
            spe: 60
        },
        abilities: {
            0: "Time Stop"
        },
        color: "Brown",
        heightm: 3.1,
        weightkg: 353.5,
		  eggGroups: ["Undiscovered"],
    },
    generott: {
        num: 7500309,
        species: "Generott",
        types: ["Water", "Bug"],
        gender: "N",
        baseStats: {
            hp: 85,
            atk: 120,
            def: 90,
            spa: 120,
            spd: 90,
            spe: 100
        },
        abilities: {
            0: "Upgrade"
        },
        color: "Blue",
        heightm: 1.5,
        weightkg: 88.55,
		  eggGroups: ["Undiscovered"],
    },
    darmin: {
        num: 7500310,
        species: "Darmin",
		  baseForme: "Up",
        types: ["Fire", "Normal"],
        baseStats: {
            hp: 137,
            atk: 160,
            def: 87,
            spa: 72,
            spd: 70,
            spe: 107
        },
        abilities: {
            0: "Rhythm"
        },
        color: "Brown",
        heightm: 1.65,
        weightkg: 111.7,
		  eggGroups: ["Field"],
    },
    darmindown: {
        num: 7500310,
        species: "Darmin-Down",
        baseSpecies: "Darmin",
        forme: "Down",
        formeLetter: "D",
        types: ["Fire", "Psychic"],
        baseStats: {
            hp: 137,
            atk: 72,
            def: 137,
            spa: 160,
            spd: 120,
            spe: 67
        },
        abilities: {
            0: "Rhythm"
        },
        color: "Blue",
        heightm: 1.65,
        weightkg: 111.7,
		  eggGroups: ["Field"],
    },
    conkeldurus: {
        num: 7500311,
        species: "Conkeldurus",
        types: ["Electric", "Fighting"],
        gender: "M",
        baseStats: {
            hp: 92,
            atk: 135,
            def: 92,
            spa: 90,
            spd: 92,
            spe: 81
        },
        abilities: {
            0: "Lightning Fist"
        },
        color: "Blue",
        heightm: 1.5,
        weightkg: 74,
		  eggGroups: ["Undiscovered"],
    },
    fisktres: {
        num: 7500312,
        species: "Fisktres",
        types: ["Ground", "Flying"],
        baseStats: {
            hp: 111,
            atk: 83,
            def: 90,
            spa: 120,
            spd: 100,
            spe: 61
        },
        abilities: {
            0: "Flare Wings"
        },
        color: "Brown",
        heightm: 1.35,
        weightkg: 35.5,
		  eggGroups: ["Undiscovered"],
    },
    landana: {
        num: 7500313,
        species: "Landana",
        types: ["Ground", "Flying"],
		  gender: "M",
        baseStats: {
            hp: 82,
            atk: 137,
            def: 77,
            spa: 96,
            spd: 75,
            spe: 112
        },
        abilities: {
            0: "Pecking Order"
        },
        color: "Brown",
        heightm: 1.3,
        weightkg: 46.1,
		  eggGroups: ["Undiscovered"],
    },
    regimiki: {
        num: 7500314,
        species: "Regimiki",
        types: ["Normal", "Water"],
        baseStats: {
            hp: 82,
            atk: 130,
            def: 120,
            spa: 55,
            spd: 120,
            spe: 72
        },
        abilities: {
            0: "Vomit"
        },
        color: "Black",
        heightm: 2,
        weightkg: 210.6,
		  eggGroups: ["Undiscovered"],
    },
    star: {
        num: 7500315,
        species: "Star",
        types: ["Fairy", "Dark"],
			genderRatio: {M: 0.875, F: 0.125},
        baseStats: {
            hp: 78,
            atk: 72,
            def: 81,
            spa: 131,
            spd: 93,
            spe: 121
        },
        abilities: {
            0: "Magical Wand"
        },
        color: "Blue",
        heightm: 1.5,
        weightkg: 39,
		  eggGroups: ["Undiscovered"],
    },
    starbutterfly: {
        num: 7500315,
        species: "Star-Butterfly",
        baseSpecies: "Star",
        forme: "Butterfly",
        formeLetter: "B",
			genderRatio: {M: 0.875, F: 0.125},
        types: ["Fairy", "Dark"],
        baseStats: {
            hp: 78,
            atk: 122,
            def: 81,
            spa: 181,
            spd: 103,
            spe: 131
        },
        abilities: {
            0: "Magical Wand"
        },
        color: "Blue",
        heightm: 1.5,
        weightkg: 39,
		  eggGroups: ["Undiscovered"],
    },
    gardelego: {
        num: 7500316,
        species: "Gardelego",
        types: ["Fairy", "Poison"],
        baseStats: {
            hp: 108,
            atk: 59,
            def: 76,
            spa: 126,
            spd: 123,
            spe: 101
        },
        abilities: {
            0: "Beast's Copycat"
        },
        color: "White",
        heightm: 1.4,
        weightkg: 51.95,
		  otherFormes: ["gardelegomega"],
		  eggGroups: ["Undiscovered"],
    },
    gardelegomega: {
        num: 7500316,
        species: "Gardelego-Mega",
        baseSpecies: "Gardelego",
        forme: "Mega",
        formeLetter: "M",
        types: ["Fairy", "Poison"],
        baseStats: {
            hp: 108,
            atk: 79,
            def: 76,
            spa: 166,
            spd: 143,
            spe: 121
        },
        abilities: {
            0: "Pixilate"
        },
        color: "White",
        heightm: 1.4,
        weightkg: 51.95,
		  eggGroups: ["Undiscovered"],
    },
    maltarione: {
        num: 7500317,
        species: "Maltarione",
        types: ["Steel", "Dragon"],
        gender: "N",
        baseStats: {
            hp: 82,
            atk: 70,
            def: 102,
            spa: 120,
            spd: 107,
            spe: 70
        },
        abilities: {
            0: "Medical Expert"
        },
        color: "Gray",
        heightm: 1.15,
        weightkg: 100.3,
		  otherFormes: ["maltarionemega"],
		  eggGroups: ["Undiscovered"],
    },
    maltarionemega: {
        num: 7500317,
        species: "Maltarione-Mega",
        baseSpecies: "Maltarione",
        gender: "N",
        forme: "Mega",
        formeLetter: "M",
        types: ["Steel", "Fairy"],
        baseStats: {
            hp: 82,
            atk: 110,
            def: 122,
            spa: 160,
            spd: 107,
            spe: 70
        },
        abilities: {
            0: "Pixilate"
        },
        color: "Gray",
        heightm: 1.55,
        weightkg: 100.3,
		  eggGroups: ["Undiscovered"],
    },
    maskle: {
        num: 7500318,
        species: "Maskle",
        types: ["Bug", "Rock"],
        baseStats: {
            hp: 55,
            atk: 45,
            def: 156,
            spa: 65,
            spd: 166,
            spe: 52
        },
        abilities: {
            0: "Bad Influence"
        },
        color: "Blue",
        heightm: 0.7,
        weightkg: 12.05,
		  eggGroups: ["Bug"],
    },
    cowardice: {
        num: 7500319,
        species: "Cowardice",
        types: ["Bug", "Ground"],
        gender: "F",
        baseStats: {
            hp: 78,
            atk: 112,
            def: 133,
            spa: 70,
            spd: 98,
            spe: 48
        },
        abilities: {
            0: "Scout"
        },
        color: "Brown",
        heightm: 1.25,
        weightkg: 57.25,
		  eggGroups: ["Bug"],
    },
    guzzbro: {
        num: 7500320,
        species: "Guzzbro",
        types: ["Dragon", "Water"],
        baseStats: {
            hp: 168,
            atk: 88,
            def: 92,
            spa: 110,
            spd: 77,
            spe: 37
        },
        abilities: {
            0: "Rejuvenation"
        },
        color: "Black",
        heightm: 3.55,
        weightkg: 483.25,
		  otherFormes: ["guzzbromega"],
		  eggGroups: ["Undiscovered"],
    },
    guzzbromega: {
        num: 7500320,
        species: "Guzzbro-Mega",
        baseSpecies: "Guzzbro",
        forme: "Mega",
        formeLetter: "M",
        types: ["Dragon", "Water"],
        baseStats: {
            hp: 168,
            atk: 88,
            def: 162,
            spa: 140,
            spd: 77,
            spe: 37
        },
        abilities: {
            0: "Shell Armor"
        },
        color: "Black",
        heightm: 3.95,
        weightkg: 524.75,
		  eggGroups: ["Undiscovered"],
    },
    zycannon: {
        num: 7500321,
        species: "Zycannon",
        types: ["Ground", "Normal"],
        baseStats: {
            hp: 67,
            atk: 130,
            def: 73,
            spa: 68,
            spd: 80,
            spe: 107
        },
        abilities: {
            0: "Force Drain"
        },
        color: "Black",
        heightm: 1.15,
        weightkg: 29.75,
		  eggGroups: ["Undiscovered"],
    },
    zeeeee: {
        num: 7500322,
        species: "Zeeeee",
        types: ["Ground", "Normal"],
        gender: "N",
        baseStats: {
            hp: 82,
            atk: 91,
            def: 100,
            spa: 63,
            spd: 90,
            spe: 75
        },
        abilities: {
            0: "Foundation"
        },
        color: "Brown",
        heightm: 2.65,
        weightkg: 155.75,
		  eggGroups: ["Undiscovered"],
    },
    zeeeeecomplete: {
        num: 7500322,
        species: "Zeeeee-Complete",
        baseSpecies: "Zeeeee",
        forme: "Complete",
        formeLetter: "C",
        gender: "N",
        types: ["Ground", "Normal"],
        baseStats: {
            hp: 190,
            atk: 91,
            def: 100,
            spa: 63,
            spd: 90,
            spe: 75
        },
        abilities: {
            0: "Foundation"
        },
        color: "Black",
        heightm: 2.15,
        weightkg: 311.5,
		  eggGroups: ["Undiscovered"],
    },
    peridot: {
        num: 7500323,
        species: "Peridot",
        types: ["Flying", "Electric"],
        gender: "N",
        baseStats: {
            hp: 83,
            atk: 84,
            def: 93,
            spa: 121,
            spd: 70,
            spe: 112
        },
        abilities: {
            0: "Limb Enhancers"
        },
        color: "Black",
        heightm: 2.65,
        weightkg: 69.75,
		  otherFormes: ["peridotmega"],
		  eggGroups: ["Undiscovered"],
    },
    peridotmega: {
        num: 7500323,
        species: "Peridot-Mega",
        baseSpecies: "Peridot",
        forme: "Mega",
        formeLetter: "M",
		  gender: "N",
        types: ["Flying", "Electric"],
        baseStats: {
            hp: 83,
            atk: 84,
            def: 98,
            spa: 186,
            spd: 80,
            spe: 132
        },
        abilities: {
            0: "No Guard"
        },
        color: "Black",
        heightm: 3.35,
        weightkg: 80.75,
		  eggGroups: ["Undiscovered"],
    },
    stundicuno: {
        num: 7500324,
        species: "Stundicuno",
        types: ["Ground", "Ice"],
        baseStats: {
            hp: 115,
            atk: 75,
            def: 94,
            spa: 100,
            spd: 120,
            spe: 60
        },
        abilities: {
            0: "Dirt Nap"
        },
        color: "Brown",
        heightm: 1.2,
        weightkg: 33.2,
		  eggGroups: ["Undiscovered"],
    },
    aloha: {
        num: 7500325,
        species: "Aloha",
        types: ["Psychic", "Dark"],
        baseStats: {
            hp: 103,
            atk: 137,
            def: 79,
            spa: 112,
            spd: 74,
            spe: 103
        },
        abilities: {
            0: "Hydrodynamic"
        },
        color: "White",
        heightm: 2.6,
        weightkg: 159.4,
		  otherFormes: ["alohamega"],
		  eggGroups: ["Undiscovered"],
    },
    alohamega: {
        num: 7500325,
        species: "Aloha-Mega",
        baseSpecies: "Aloha",
        forme: "Mega",
        formeLetter: "M",
        types: ["Psychic", "Dark"],
        baseStats: {
            hp: 103,
            atk: 157,
            def: 109,
            spa: 127,
            spd: 99,
            spe: 113
        },
        abilities: {
            0: "Strong Jaw"
        },
        color: "White",
        heightm: 3.3,
        weightkg: 200.9,
		  eggGroups: ["Undiscovered"],
    },
    zekloom: {
        num: 7500326,
        species: "Zekloom",
        types: ["Electric", "Fighting"],
        baseStats: {
            hp: 80,
            atk: 140,
            def: 100,
            spa: 90,
            spd: 100,
            spe: 100
        },
        abilities: {
            0: "Engineer"
        },
        color: "Black",
        heightm: 2.05,
        weightkg: 192.1,
		  eggGroups: ["Undiscovered"],
    },
    gengalure: {
        num: 7500327,
        species: "Gengalure",
        types: ["Ghost", "Fire"],
        baseStats: {
            hp: 70,
            atk: 70,
            def: 85,
            spa: 147,
            spd: 92,
            spe: 105
        },
        abilities: {
            0: "Blessed Protection"
        },
        color: "Purple",
        heightm: 1.25,
        weightkg: 37.4,
		  otherFormes: ["gengaluremega"],
		  eggGroups: ["Amorphous"],
    },
    gengaluremega: {
        num: 7500327,
        species: "Gengalure-Mega",
        baseSpecies: "Gengalure",
        forme: "Mega",
        formeLetter: "M",
        types: ["Ghost", "Fire"],
        baseStats: {
            hp: 70,
            atk: 70,
            def: 105,
            spa: 187,
            spd: 112,
            spe: 125
        },
        abilities: {
            0: "Shadow Tag"
        },
        color: "Purple",
        heightm: 1.15,
        weightkg: 37.4,
		  eggGroups: ["Amorphous"],
    },
    ferrolord: {
        num: 7500328,
        species: "Ferrolord",
        types: ["Steel", "Dragon"],
        gender: "N",
        baseStats: {
            hp: 148,
            atk: 107,
            def: 102,
            spa: 75,
            spd: 104,
            spe: 31
        },
        abilities: {
            0: "Barbs Boost"
        },
        color: "Black",
        heightm: 3.25,
        weightkg: 499,
		  eggGroups: ["Undiscovered"],
    },
    dad: {
        num: 7500329,
        species: "Dad",
        types: ["Normal", "Dark"],
        gender: "N",
        baseStats: {
            hp: 69,
            atk: 60,
            def: 51,
            spa: 41,
            spd: 51,
            spe: 56
        },
        abilities: {
            0: "Mirror Mirror"
        },
        color: "Purple",
        heightm: 0.5,
        weightkg: 9.6,
		  eggGroups: ["Field"],
    },
    glaive: {
        num: 7500330,
        species: "Glaive",
        types: ["Ghost", "Ground"],
        gender: "N",
        baseStats: {
            hp: 100,
            atk: 130,
            def: 145,
            spa: 73,
            spd: 90,
            spe: 63
        },
        abilities: {
            0: "Atmospheric Pull"
        },
        color: "Brown",
        heightm: 2.15,
        weightkg: 477.25,
		  eggGroups: ["Undiscovered"],
    },
    glaiveprimal: {
        num: 7500330,
        species: "Glaive-Primal",
        baseSpecies: "Glaive",
        forme: "Primal",
        formeLetter: "P",
        gender: "N",
        types: ["Ghost", "Fire"],
        baseStats: {
            hp: 100,
            atk: 160,
            def: 165,
            spa: 123,
            spd: 90,
            spe: 63
        },
        abilities: {
            0: "Desolate Land"
        },
        color: "Brown",
        heightm: 3.65,
        weightkg: 526.95,
		  eggGroups: ["Undiscovered"],
    },
    kyurpedo: {
        num: 7500331,
        species: "Kyurpedo",
        types: ["Ice", "Dark"],
        baseStats: {
            hp: 105,
            atk: 145,
            def: 70,
            spa: 125,
            spd: 75,
            spe: 95
        },
        abilities: {
            0: "Volt Boost"
        },
        color: "Black",
        heightm: 2.55,
        weightkg: 206.9,
		  otherFormes: ["kyurpedomega"],
		  eggGroups: ["Undiscovered"],
    },
    kyurpedomega: {
        num: 7500331,
        species: "Kyurpedo-Mega",
        baseSpecies: "Kyurpedo",
        forme: "Mega",
        formeLetter: "M",
        types: ["Ice", "Dark"],
        baseStats: {
            hp: 105,
            atk: 165,
            def: 100,
            spa: 140,
            spd: 100,
            spe: 105
        },
        abilities: {
            0: "Strong Jaw"
        },
        color: "Black",
        heightm: 3.25,
        weightkg: 248.4,
		  eggGroups: ["Undiscovered"],
    },
    gearchamp: {
        num: 7500332,
        species: "Gearchamp",
        types: ["Fighting", "Fairy"],
        gender: "N",
        baseStats: {
            hp: 80,
            atk: 84,
            def: 95,
            spa: 105,
            spd: 95,
            spe: 85
        },
        abilities: {
            0: "Soul Power"
        },
        color: "Gray",
        heightm: 1.15,
        weightkg: 56.5,
		  otherFormes: ["gearchampmega"],
		  eggGroups: ["Undiscovered"],
    },
    gearchampmega: {
        num: 7500332,
        species: "Gearchamp-Mega",
        baseSpecies: "Gearchamp",
        forme: "Mega",
        formeLetter: "M",
        types: ["Fighting", "Fairy"],
        gender: "N",
        baseStats: {
            hp: 80,
            atk: 124,
            def: 105,
            spa: 125,
            spd: 105,
            spe: 105
        },
        abilities: {
            0: "Pure Power"
        },
        color: "Gray",
        heightm: 1.15,
        weightkg: 56.5,
		  eggGroups: ["Undiscovered"],
    },
    luau: {
        num: 7500333,
        species: "Luau",
        types: ["Ghost", "Ground"],
        baseStats: {
            hp: 113,
            atk: 107,
            def: 79,
            spa: 139,
            spd: 97,
            spe: 73
        },
        abilities: {
            0: "Land's Shield"
        },
        color: "Purple",
        heightm: 2.95,
        weightkg: 170,
		  otherFormes: ["luaumega"],
		  eggGroups: ["Undiscovered"],
    },
    luaumega: {
        num: 7500333,
        species: "Luau-Mega",
        baseSpecies: "Luau",
        forme: "Mega",
        formeLetter: "M",
        types: ["Ghost", "Ground"],
        baseStats: {
            hp: 113,
            atk: 127,
            def: 109,
            spa: 179,
            spd: 127,
            spe: 53
        },
        abilities: {
            0: "Sheer Force"
        },
        color: "Purple",
        heightm: 3.55,
        weightkg: 270.5,
		  eggGroups: ["Undiscovered"],
    },
    dotsensu: {
        num: 7500334,
        species: "Dot-Sensu",
        types: ["Normal", "Ghost"],
        gender: "N",
        baseStats: {
            hp: 61,
            atk: 59,
            def: 59,
            spa: 93,
            spd: 59,
            spe: 90
        },
        abilities: {
            0: "Danceposter"
        },
        color: "Purple",
        heightm: 0.45,
        weightkg: 3.7,
		  eggGroups: ["Flying"],
    },
    darkhunter: {
        num: 7500335,
        species: "Dark Hunter",
        types: ["Rock", "Dark"],
        baseStats: {
            hp: 78,
            atk: 123,
            def: 83,
            spa: 105,
            spd: 83,
            spe: 114
        },
        abilities: {
            0: "Night Terror"
        },
        color: "Red",
        heightm: 1.3,
        weightkg: 37.75,
		  eggGroups: ["Undiscovered"],
    },
    guzzpex: {
        num: 7500336,
        species: "Guzzpex",
        types: ["Poison", "Dark"],
        baseStats: {
            hp: 136,
            atk: 82,
            def: 122,
            spa: 75,
            spd: 117,
            spe: 39
        },
        abilities: {
            0: "Merciless Beast"
        },
        color: "Blue",
        heightm: 3.1,
        weightkg: 451.25,
		  eggGroups: ["Undiscovered"],
    },
    dedede: {
        num: 7500337,
        species: "Dedede",
        types: ["Ice", "Electric"],
        baseStats: {
            hp: 66,
            atk: 66,
            def: 61,
            spa: 83,
            spd: 66,
            spe: 98
        },
        abilities: {
            0: "Royal Strength"
        },
        color: "Yellow",
        heightm: 0.55,
        weightkg: 9.1,
		  eggGroups: ["Field"],
    },
    cosmill: {
        num: 7500338,
        species: "Cosmill",
        types: ["Psychic", "Fairy"],
        baseStats: {
            hp: 56,
            atk: 44,
            def: 40,
            spa: 44,
            spd: 40,
            spe: 38
        },
        abilities: {
            0: "Godlike Powers"
        },
        color: "Blue",
        heightm: 0.3,
        weightkg: 4.3,
		  eggGroups: ["Undiscovered"],
    },
    maginera: {
        num: 7500339,
        species: "Maginera",
        types: ["Fairy", "Fire"],
        gender: "N",
        baseStats: {
            hp: 87,
            atk: 110,
            def: 117,
            spa: 110,
            spd: 117,
            spe: 62
        },
        abilities: {
            0: "Soften Up"
        },
        color: "Gray",
        heightm: 1.4,
        weightkg: 81.75,
		  eggGroups: ["Undiscovered"],
    },
    catdeer: {
        num: 7500340,
        species: "Catdeer",
        types: ["Normal", "Dark"],
        baseStats: {
            hp: 79,
            atk: 102,
            def: 66,
            spa: 97,
            spd: 68,
            spe: 106
        },
        abilities: {
            0: "Tricky Glare"
        },
        color: "Purple",
        heightm: 1.25,
        weightkg: 54.35,
		  eggGroups: ["Field"],
    },
    hooptrio: {
        num: 7500341,
        species: "Hooptrio",
        types: ["Ground", "Dark"],
        baseStats: {
            hp: 75,
            atk: 140,
            def: 55,
            spa: 120,
            spd: 100,
            spe: 100
        },
        abilities: {
            0: "Confiscation"
        },
        color: "Blue",
        heightm: 3.6,
        weightkg: 261.65,
		  eggGroups: ["Undiscovered"],
    },
    fablefin: {
        num: 7500342,
        species: "Fablefin",
        types: ["Fairy"],
        genderRatio: {M: 0.25, F: 0.75},
        baseStats: {
            hp: 85,
            atk: 72,
            def: 106,
            spa: 100,
            spd: 125,
            spe: 80
        },
        abilities: {
            0: "Misty Mind"
        },
        color: "Purple",
        heightm: 1.3,
        weightkg: 30.6,
		  eggGroups: ["Undiscovered"],
    },
    klefz: {
        num: 7500343,
        species: "Klef-Z",
        types: ["Normal", "Fairy"],
        gender: "N",
        baseStats: {
            hp: 81,
            atk: 80,
            def: 80,
            spa: 117,
            spd: 81,
            spe: 102
        },
        abilities: {
            0: "Familiar Maneuvering"
        },
        color: "Gray",
        heightm: 0.55,
        weightkg: 18.5,
		  eggGroups: ["Mineral"],
    },
    tropisteela: {
        num: 7500344,
        species: "Tropisteela",
        types: ["Flying", "Steel"],
        gender: "N",
        baseStats: {
            hp: 100,
            atk: 90,
            def: 104,
            spa: 90,
            spd: 104,
            spe: 56
        },
        abilities: {
            0: "Stat Harvesting"
        },
        color: "Green",
        heightm: 5.6,
        weightkg: 549.95,
		  eggGroups: ["Undiscovered"],
    },
    pokemon: {
        num: 7500345,
        species: "Pokemon",
        types: ["Water", "Fighting"],
        gender: "N",
        baseStats: {
            hp: 77,
            atk: 129,
            def: 76,
            spa: 114,
            spd: 86,
            spe: 110
        },
        abilities: {
            0: "Ability"
        },
        color: "Brown",
        heightm: 2.55,
        weightkg: 179,
		  eggGroups: ["Undiscovered"],
    },
    nosegod: {
        num: 7500346,
        species: "Nose God",
        types: ["Normal", "Rock"],
        gender: "N",
        baseStats: {
            hp: 75,
            atk: 103,
            def: 133,
            spa: 88,
            spd: 110,
            spe: 80
        },
        abilities: {
            0: "Type Trap"
        },
        color: "White",
        heightm: 2.1,
        weightkg: 208.5,
		  eggGroups: ["Undiscovered"],
    },
    swampterra: {
        num: 7500347,
        species: "Swampterra",
        types: ["Ground", "Water"],
        genderRatio: {M: 0.875, F: 0.125},
        baseStats: {
            hp: 107,
            atk: 119,
            def: 107,
            spa: 90,
            spd: 97,
            spe: 68
        },
        abilities: {
            0: "Uninhabitable"
        },
        color: "Blue",
        heightm: 1.85,
        weightkg: 195.95,
		  otherFormes: ["swampterramega"],
		  eggGroups: ["Monster"],
    },
    swampterramega: {
        num: 7500347,
        species: "Swampterra-Mega",
        baseSpecies: "Swampterra",
        forme: "Mega",
        formeLetter: "M",
        genderRatio: {M: 0.875, F: 0.125},
        types: ["Ground", "Water"],
        baseStats: {
            hp: 107,
            atk: 159,
            def: 127,
            spa: 100,
            spd: 117,
            spe: 78
        },
        abilities: {
            0: "Swift Swim"
        },
        color: "Blue",
        heightm: 2.25,
        weightkg: 216.05,
		  eggGroups: ["Monster"],
    },
    zeklade: {
        num: 7500348,
        species: "Zeklade",
        types: ["Dragon", "Steel"],
        gender: "N",
        baseStats: {
            hp: 100,
            atk: 130,
            def: 135,
            spa: 82,
            spd: 95,
            spe: 62
        },
        abilities: {
            0: "Unstable Voltage"
        },
        color: "Brown",
        heightm: 1.85,
        weightkg: 174.75,
        dexentry: "As Experiments #242 and #304, among others, need to be restrained in some way, shape, or form, some DNA was taken from the Dark Stone from Unova and combined with Doublade DNA. The resulting construct appears to have swords for arms, two tassels as wings, and a body made of the same substance as Doublade's sheath. While this fusion always hits its mark, it unfortunately is guaranteed to be hit by any attacks aimed for it.",
		  eggGroups: ["Undiscovered"],
    },
    grequa: {
        num: 7500349,
        species: "Grequa",
        types: ["Water", "Bug"],
        genderRatio: {M: 0.75, F: 0.25},
        baseStats: {
            hp: 82,
            atk: 92,
            def: 89,
            spa: 86,
            spd: 111,
            spe: 92
        },
        abilities: {
            0: "Huge Bubble"
        },
        color: "Green",
        heightm: 1.65,
        weightkg: 61,
		  eggGroups: ["Water 2"],
    },
    alteyer: {
        num: 7500350,
        species: "Alteyer",
        types: ["Ghost", "Flying"],
        genderRatio: {M: 0.75, F: 0.25},
        baseStats: {
            hp: 86,
            atk: 98,
            def: 92,
            spa: 95,
            spd: 112,
            spe: 85
        },
        abilities: {
            0: "Constellation"
        },
        color: "Brown",
        heightm: 1.35,
        weightkg: 28.6,
		  otherFormes: ["alteyermega"],
		  eggGroups: ["Flying"],
    },
    alteyermega: {
        num: 7500350,
        species: "Alteyer-Mega",
        baseSpecies: "Alteyer",
        forme: "Mega",
        formeLetter: "M",
        genderRatio: {M: 0.75, F: 0.25},
        types: ["Ghost", "Fairy"],
        baseStats: {
            hp: 86,
            atk: 138,
            def: 112,
            spa: 135,
            spd: 112,
            spe: 85
        },
        abilities: {
            0: "Pixilate"
        },
        color: "Brown",
        heightm: 1.75,
        weightkg: 28.6,
		  eggGroups: ["Flying"],
    },
    scrafting: {
        num: 7500351,
        species: "Scrafting",
        types: ["Fighting", "Normal"],
        baseStats: {
            hp: 117,
            atk: 135,
            def: 115,
            spa: 80,
            spd: 97,
            spe: 89
        },
        abilities: {
            0: "Stare Down"
        },
        color: "Brown",
        heightm: 1.55,
        weightkg: 80.25,
		  eggGroups: ["Field"],
    },
    not: {
        num: 7500352,
        species: "Not",
        types: ["Flying", "Normal"],
        baseStats: {
            hp: 94,
            atk: 85,
            def: 87,
            spa: 93,
            spd: 85,
            spe: 122
        },
        abilities: {
            0: "Ambition"
        },
        color: "Purple",
        heightm: 1.5,
        weightkg: 62.25,
		  otherFormes: ["notmega"],
		  eggGroups: ["Flying"],
    },
    notmega: {
        num: 7500352,
        species: "Not-Mega",
        baseSpecies: "Not",
        forme: "Mega",
        formeLetter: "M",
        types: ["Flying", "Normal"],
        baseStats: {
            hp: 94,
            atk: 85,
            def: 92,
            spa: 158,
            spd: 95,
            spe: 142
        },
        abilities: {
            0: "No Guard"
        },
        color: "Purple",
        heightm: 2.2,
        weightkg: 39.6,
		  eggGroups: ["Flying"],
    },
    joltsol: {
        num: 7500353,
        species: "Joltsol",
        types: ["Electric", "Dark"],
        genderRatio: {M: 0.75, F: 0.25},
        baseStats: {
            hp: 75,
            atk: 107,
            def: 70,
            spa: 102,
            spd: 87,
            spe: 112
        },
        abilities: {
            0: "Power Surge"
        },
        color: "White",
        heightm: 1,
        weightkg: 35.75,
		  otherFormes: ["joltsolmega"],
		  eggGroups: ["Field"],
    },
    joltsolmega: {
        num: 7500353,
        species: "Joltsol-Mega",
        baseSpecies: "Joltsol",
        forme: "Mega",
        formeLetter: "M",
        genderRatio: {M: 0.75, F: 0.25},
        types: ["Electric", "Dark"],
        baseStats: {
            hp: 75,
            atk: 127,
            def: 70,
            spa: 142,
            spd: 87,
            spe: 152
        },
        abilities: {
            0: "Magic Bounce"
        },
        color: "White",
        heightm: 1,
        weightkg: 37.75,
		  eggGroups: ["Field"],
    },
    topaz: {
        num: 7500354,
        species: "Topaz",
        types: ["Rock", "Fairy"],
        genderRatio: {M: 0.75, F: 0.25},
        baseStats: {
            hp: 90,
            atk: 92,
            def: 102,
            spa: 72,
            spd: 85,
            spe: 95
        },
        abilities: {
            0: "Power Of Two"
        },
        color: "Brown",
        heightm: 1.05,
        weightkg: 34.5,
		  eggGroups: ["Water 1"],
    },
    dolphin: {
        num: 7500355,
        species: "Dolphin",
        types: ["Fire", "Normal"],
        genderRatio: {M: 0.75, F: 0.25},
        baseStats: {
            hp: 122,
            atk: 124,
            def: 96,
            spa: 114,
            spd: 92,
            spe: 112
        },
        abilities: {
            0: "Lava Dive"
        },
        color: "Red",
        heightm: 1.75,
        weightkg: 84.75,
		  eggGroups: ["Field"],
    },
    snorligatr: {
        num: 7500356,
        species: "Snorligatr",
        types: ["Normal", "Water"],
        genderRatio: {M: 0.875, F: 10.25},
        baseStats: {
            hp: 132,
            atk: 117,
            def: 92,
            spa: 82,
            spd: 106,
            spe: 64
        },
        abilities: {
            0: "Sheer Fat"
        },
        color: "Blue",
        heightm: 2.2,
        weightkg: 274.4,
		  eggGroups: ["Monster"],
    },
    emponite: {
        num: 7500357,
        species: "Emponite",
        types: ["Steel", "Dragon"],
        genderRatio: {M: 0.75, F: 0.25},
        baseStats: {
            hp: 97,
            atk: 120,
            def: 101,
            spa: 115,
            spd: 110,
            spe: 80
        },
        abilities: {
            0: "Ocean Shield"
        },
        color: "Blue",
        heightm: 1.95,
        weightkg: 147.25,
		  eggGroups: ["Water 1"],
    },
    leafrou: {
        num: 7500358,
        species: "Leafrou",
        types: ["Normal", "Grass"],
        genderRatio: {M: 0.75, F: 0.25},
        baseStats: {
            hp: 80,
            atk: 105,
            def: 105,
            spa: 72,
            spd: 87,
            spe: 108
        },
        abilities: {
            0: "Chlorocoat"
        },
        color: "White",
        heightm: 1.1,
        weightkg: 26.75,
		  eggGroups: ["Field"],
    },
    mimiblim: {
        num: 7500359,
        species: "Mimiblim",
        types: ["Ghost", "Fairy"],
        baseStats: {
            hp: 112,
            atk: 95,
            def: 72,
            spa: 80,
            spd: 89,
            spe: 98
        },
        abilities: {
            0: "Disguise Burden"
        },
        color: "Purple",
        heightm: 0.7,
        weightkg: 7.85,
		  otherFormes: ["mimiblimbusted"],
		  eggGroups: ["Amorphous"],
    },
mimiblimbusted: {
        num: 7500359,
        species: "Mimiblim-Busted",
			baseSpecies: "Mimiblim",
			forme: "Busted",
			formeLetter: "B",
        types: ["Ghost", "Fairy"],
        baseStats: {
            hp: 112,
            atk: 95,
            def: 72,
            spa: 80,
            spd: 89,
            spe: 98
        },
        abilities: {
            0: "Disguise Burden"
        },
        color: "Purple",
        heightm: 0.3,
        weightkg: 7.85,
		  eggGroups: ["Amorphous"],
    },
    warcanein: {
        num: 7500360,
        species: "Warcanein",
        types: ["Water", "Fire"],
        genderRatio: {M: 0.625, F: 0.375},
        baseStats: {
            hp: 110,
            atk: 105,
            def: 95,
            spa: 107,
            spd: 95,
            spe: 90
        },
        abilities: {
            0: "Persistent Morale"
        },
        color: "Blue",
        heightm: 1.65,
        weightkg: 152.8,
		  eggGroups: ["Field"],
    },
    zorarce: {
        num: 7500361,
        species: "Zorarce",
        types: ["Normal", "Dark"],
        genderRatio: {M: 0.875, F: 0.125},
        baseStats: {
            hp: 80,
            atk: 102,
            def: 90,
            spa: 100,
            spd: 90,
            spe: 102
        },
        abilities: {
            0: "Type Illusionist"
        },
        color: "Black",
        heightm: 1.95,
        weightkg: 166.25,
		  eggGroups: ["Undiscovered"],
    },
    happislash: {
        num: 7500362,
        species: "Happislash",
		  baseForme: "Friendly",
        gender: "F",
        types: ["Ghost", "Normal"],
        baseStats: {
            hp: 80,
            atk: 27,
            def: 97,
            spa: 32,
            spd: 127,
            spe: 45
        },
        abilities: {
            0: "Unfriend"
        },
        color: "Pink",
        heightm: 1.15,
        weightkg: 38.7,
		  eggGroups: ["Undiscovered"],
    },
    happislashunfriendly: {
        num: 7500362,
        species: "Happislash-Unfriendly",
        baseSpecies: "Happislash",
        forme: "Unfriendly",
        formeLetter: "U",
        gender: "F",
        types: ["Ghost", "Normal"],
        baseStats: {
            hp: 80,
            atk: 97,
            def: 27,
            spa: 127,
            spd: 32,
            spe: 45
        },
        abilities: {
            0: "Unfriend"
        },
        color: "Pink",
        heightm: 1.15,
        weightkg: 38.7,
		  eggGroups: ["Undiscovered"],
    },
    torkobulu: {
        num: 7500363,
        species: "Torko Bulu",
        types: ["Grass", "Fire"],
        gender: "N",
        baseStats: {
            hp: 70,
            atk: 107,
            def: 127,
            spa: 105,
            spd: 102,
            spe: 47
        },
        abilities: {
            0: "Photosynthesis Surge"
        },
        color: "Red",
        heightm: 1.2,
        weightkg: 62.95,
		  eggGroups: ["Undiscovered"],
    },
    pheroxish: {
        num: 7500364,
        species: "Pheroxish",
        types: ["Water", "Fighting"],
        baseStats: {
            hp: 69,
            atk: 122,
            def: 53,
            spa: 122,
            spd: 53,
            spe: 141
        },
        abilities: {
            0: "Dazzle Beast"
        },
        color: "Pink",
        heightm: 1.35,
        weightkg: 22,
		  eggGroups: ["Undiscovered"],
    },
    padunk: {
        num: 7500365,
        species: "Padunk",
        types: ["Poison", "Dark"],
        baseStats: {
            hp: 93,
            atk: 101,
            def: 68,
            spa: 89,
            spd: 65,
            spe: 105
        },
        abilities: {
            0: "Rage Potion"
        },
        color: "Purple",
        heightm: 1.05,
        weightkg: 37.75,
		  eggGroups: ["Field"],
    },
    magnelure: {
        num: 7500366,
        species: "Magnelure",
        types: ["Electric", "Fire"],
        gender: "N",
        baseStats: {
            hp: 65,
            atk: 62,
            def: 102,
            spa: 147,
            spd: 100,
            spe: 90
        },
        abilities: {
            0: "Blacksmith"
        },
        color: "Black",
        heightm: 1.1,
        weightkg: 107.15,
		  eggGroups: ["Mineral"],
    },
    shucklord: {
        num: 7500367,
        species: "Shucklord",
        types: ["Bug", "Dragon"],
        baseStats: {
            hp: 141,
            atk: 55,
            def: 141,
            spa: 73,
            spd: 141,
            spe: 24
        },
        abilities: {
            0: "Two-Faced"
        },
        color: "Yellow",
        heightm: 3.05,
        weightkg: 454.25,
		  eggGroups: ["Undiscovered"],
    },
    mtndew: {
        num: 7500368,
        species: "Mtn Dew",
        types: ["Steel", "Psychic"],
        gender: "N",
        baseStats: {
            hp: 79,
            atk: 114,
            def: 106,
            spa: 94,
            spd: 74,
            spe: 114
        },
        abilities: {
            0: "Contagious Yawn"
        },
        color: "Gray",
        heightm: 0.35,
        weightkg: 18.5,
		  eggGroups: ["Field"],
    },
    altearnia: {
        num: 7500369,
        species: "Altearnia",
        types: ["Dragon", "Steel"],
        gender: "N",
        baseStats: {
            hp: 90,
            atk: 100,
            def: 102,
            spa: 109,
            spd: 110,
            spe: 72
        },
        abilities: {
            0: "Compassionate Soul"
        },
        color: "Blue",
        heightm: 1.05,
        weightkg: 50.55,
		  otherFormes: ["altearniamega"],
		  eggGroups: ["Undiscovered"],
    },
    altearniamega: {
        num: 7500369,
        species: "Altearnia-Mega",
        baseSpecies: "Altearnia",
        forme: "Mega",
        formeLetter: "M",
        gender: "N",
        types: ["Dragon", "Fairy"],
        baseStats: {
            hp: 90,
            atk: 140,
            def: 122,
            spa: 149,
            spd: 110,
            spe: 72
        },
        abilities: {
            0: "Pixilate"
        },
        color: "Gray",
        heightm: 1.45,
        weightkg: 50.55,
		  eggGroups: ["Undiscovered"],
    },
    regigiot: {
        num: 7500370,
        species: "Regigiot",
        types: ["Flying", "Ice"],
        gender: "N",
        baseStats: {
            hp: 81,
            atk: 65,
            def: 87,
            spa: 105,
            spd: 135,
            spe: 95
        },
        abilities: {
            0: "Magical Ice"
        },
        color: "Blue",
        heightm: 1.65,
        weightkg: 107.25,
		  otherFormes: ["regigiot"],
		  eggGroups: ["Undiscovered"],
    },
    regigiotmega: {
        num: 7500370,
        species: "Regigiot-Mega",
        baseSpecies: "Regigiot",
        forme: "Mega",
        formeLetter: "M",
        gender: "N",
        types: ["Flying", "Ice"],
        baseStats: {
            hp: 81,
            atk: 65,
            def: 92,
            spa: 170,
            spd: 145,
            spe: 115
        },
        abilities: {
            0: "No Guard"
        },
        color: "Blue",
        heightm: 2.35,
        weightkg: 118.25,
		  eggGroups: ["Undiscovered"],
    },
    kasukabe: {
        num: 7500371,
        species: "Kasukabe",
        types: ["Normal", "Fighting"],
        gender: "F",
        baseStats: {
            hp: 109,
            atk: 117,
            def: 109,
            spa: 47,
            spd: 83,
            spe: 103
        },
        abilities: {
            0: "Genome Tree"
        },
        color: "Brown",
        heightm: 2.3,
        weightkg: 206.8,
		  otherFormes: ["kasukabemega"],
		  eggGroups: ["Undiscovered"],
    },
    kasukabemega: {
        num: 7500371,
        species: "Kasukabe-Mega",
        baseSpecies: "Kasukabe",
        forme: "Mega",
        formeLetter: "M",
        types: ["Normal", "Fighting"],
        gender: "F",
        baseStats: {
            hp: 109,
            atk: 147,
            def: 129,
            spa: 67,
            spd: 103,
            spe: 113
        },
        abilities: {
            0: "Parental Bond"
        },
        color: "Brown",
        heightm: 2.3,
        weightkg: 226.8,
		  eggGroups: ["Undiscovered"],
    },
    sakamaki: {
        num: 7500372,
        species: "Sakamaki",
        types: ["Dragon", "Steel"],
		  gender: "N",
        baseStats: {
            hp: 80,
            atk: 128,
            def: 100,
            spa: 90,
            spd: 85,
            spe: 115
        },
        abilities: {
            0: "Code Unknown"
        },
        color: "Gray",
        heightm: 1.05,
        weightkg: 91.8,
		  otherFormes: ["sakamakimega"],
		  eggGroups: ["Mineral"],
    },
    sakamakimega: {
        num: 7500372,
        species: "Sakamaki-Mega",
        baseSpecies: "Sakamaki",
        forme: "Mega",
        formeLetter: "M",
        types: ["Dragon", "Steel"],
        baseStats: {
            hp: 80,
            atk: 138,
            def: 150,
            spa: 100,
            spd: 95,
            spe: 135
        },
        abilities: {
            0: "Aerilate"
        },
        color: "Gray",
        heightm: 1.15,
        weightkg: 101.8,
		  eggGroups: ["Mineral"],
    },
    mapuiasu: {
        num: 7500373,
        species: "Mapu Iasu",
        types: ["Ghost", "Fairy"],
        genderRatio: {M: 0.25, F: 0.75},
        baseStats: {
            hp: 75,
            atk: 85,
            def: 93,
            spa: 98,
            spd: 120,
            spe: 90
        },
        abilities: {
            0: "Sensu Dancer"
        },
        color: "Purple",
        heightm: 0.95,
        weightkg: 12.3,
		  eggGroups: ["Undiscovered"],
    },
    mapuauhe: {
        num: 7500374,
        species: "Mapu Auhe",
        types: ["Fire", "Grass"],
        genderRatio: {M: 0.25, F: 0.75},
        baseStats: {
            hp: 75,
            atk: 120,
            def: 98,
            spa: 93,
            spd: 85,
            spe: 90
        },
        abilities: {
            0: "Baile Dancer"
        },
        color: "Red",
        heightm: 1.25,
        weightkg: 24.45,
		  eggGroups: ["Undiscovered"],
    },
    mapumoli: {
        num: 7500375,
        species: "Mapu Moli",
        types: ["Electric"],
        genderRatio: {M: 0.25, F: 0.75},
        baseStats: {
            hp: 75,
            atk: 93,
            def: 89,
            spa: 98,
            spd: 85,
            spe: 120
        },
        abilities: {
            0: "Pom-Pom Dancer"
        },
        color: "Yellow",
        heightm: 1.2,
        weightkg: 11.95,
		  eggGroups: ["Undiscovered"],
    },
    mapubupa: {
        num: 7500376,
        species: "Mapu Bupa",
        types: ["Psychic"],
        genderRatio: {M: 0.25, F: 0.75},
        baseStats: {
            hp: 75,
            atk: 90,
            def: 85,
            spa: 120,
            spd: 93,
            spe: 98
        },
        abilities: {
            0: "Pa'u Dancer"
        },
        color: "Psychic",
        heightm: 0.9,
        weightkg: 11,
		  eggGroups: ["Undiscovered"],
    },
    meazle: {
        num: 7500377,
        species: "Meazle",
        types: ["Psychic", "Poison"],
        gender: "F",
        baseStats: {
            hp: 84,
            atk: 82,
            def: 100,
            spa: 105,
            spd: 100,
            spe: 108
        },
        abilities: {
            0: "Ailment Master"
        },
        color: "Pink",
        heightm: 0.8,
        weightkg: 13.1,
		  eggGroups: ["Undiscovered"],
    },
    parantis: {
        num: 7500378,
        species: "Parantis",
        types: ["Bug", "Grass"],
        baseStats: {
            hp: 75,
            atk: 110,
            def: 95,
            spa: 80,
            spd: 95,
            spe: 47
        },
        abilities: {
            0: "Thermophilic"
        },
        color: "Pink",
        heightm: 0.95,
        weightkg: 24,
		  eggGroups: ["Bug"],
    },
    dinna: {
        num: 7500379,
        species: "Dinna",
        types: ["Normal", "Psychic"],
        gender: "N",
        baseStats: {
            hp: 82,
            atk: 36,
            def: 46,
            spa: 57,
            spd: 51,
            spe: 56
        },
        abilities: {
            0: "Move~Stat"
        },
        color: "Purple",
        heightm: 0.45,
        weightkg: 13.65,
		  eggGroups: ["Field"],
    },
    sylvias: {
        num: 7500380,
        species: "Sylvias",
        types: ["Dragon", "Fairy"],
        gender: "F",
        baseStats: {
            hp: 107,
            atk: 72,
            def: 97,
            spa: 110,
            spd: 130,
            spe: 85
        },
        abilities: {
            0: "Enchanted"
        },
        color: "Pink",
        heightm: 1.2,
        weightkg: 31.75,
		  otherFormes: ["sylviasmega"],
		  eggGroups: ["Undiscovered"],
    },
    sylviasmega: {
        num: 7500380,
        species: "Sylvias-Mega",
        baseSpecies: "Sylvias",
        forme: "Mega",
        formeLetter: "M",
        gender: "F",
        types: ["Dragon", "Fairy"],
        baseStats: {
            hp: 107,
            atk: 92,
            def: 127,
            spa: 140,
            spd: 150,
            spe: 85
        },
        abilities: {
            0: "Levitate"
        },
        color: "Pink",
        heightm: 1.6,
        weightkg: 43.75,
		  eggGroups: ["Undiscovered"],
    },
    mightyyvel: {
        num: 7500381,
        species: "Mighty Yvel",
        types: ["Dark"],
        baseStats: {
            hp: 101,
            atk: 110,
            def: 90,
            spa: 95,
            spd: 90,
            spe: 102
        },
        abilities: {
            0: "Plan In Action"
        },
        color: "Red",
        heightm: 3.4,
        weightkg: 120,
		  eggGroups: ["Undiscovered"],
    },
    tyranwak: {
        num: 7500382,
        species: "Tyranwak",
        types: ["Rock", "Ghost"],
        genderRatio: {M: 0.75, F: 0.25},
        baseStats: {
            hp: 81,
            atk: 110,
            def: 124,
            spa: 69,
            spd: 79,
            spe: 68
        },
        abilities: {
            0: "Enchanted Skull"
        },
        color: "Purple",
        heightm: 1.25,
        weightkg: 152,
		  eggGroups: ["Undiscovered"],
    },
    volcanoemblem: {
        num: 7500383,
        species: "Volcano Emblem",
        types: ["Flying", "Fire"],
        gender: "N",
        baseStats: {
            hp: 78,
            atk: 84,
            def: 100,
            spa: 130,
            spd: 90,
            spe: 100
        },
        abilities: {
            0: "Magic Sponge"
        },
        color: "Black",
        heightm: 1.55,
        weightkg: 104.5,
		  eggGroups: ["Undiscovered"],
    },
    pelikoko: {
        num: 7500384,
        species: "Peli Koko",
        types: ["Water", "Electric"],
        gender: "N",
        baseStats: {
            hp: 65,
            atk: 82,
            def: 92,
            spa: 115,
            spd: 72,
            spe: 117
        },
        abilities: {
            0: "Thunderstorm Surge"
        },
        color: "Yellow",
        heightm: 1.5,
        weightkg: 24.25,
		  eggGroups: ["Undiscovered"],
    },
    mimitto: {
        num: 7500385,
        species: "Mimitto",
        types: ["Normal", "Fairy"],
        gender: "N",
        baseStats: {
            hp: 71,
            atk: 89,
            def: 64,
            spa: 49,
            spd: 76,
            spe: 72
        },
        abilities: {
            0: "Hide-And-Seek"
        },
        color: "Purple",
        heightm: 0.25,
        weightkg: 2.35,
		  eggGroups: ["Undiscovered"],
    },
    eellee: {
        num: 7500386,
        species: "Eel-Lee",
        types: ["Electric", "Fire"],
        baseStats: {
            hp: 90,
            atk: 110,
            def: 90,
            spa: 100,
            spd: 120,
            spe: 71
        },
        abilities: {
            0: "Ground Leecher"
        },
        color: "Blue",
        heightm: 2.5,
        weightkg: 110.5,
		  eggGroups: ["Undiscovered"],
    },
    celesir: {
        num: 7500387,
        species: "Celesir",
        types: ["Steel", "Bug"],
        gender: "N",
        baseStats: {
            hp: 81,
            atk: 133,
            def: 101,
            spa: 81,
            spd: 105,
            spe: 73
        },
        abilities: {
            0: "Bloodthirst"
        },
        color: "Green",
        heightm: 5.35,
        weightkg: 527.45,
		  otherFormes: ["celesirmega"],
		  eggGroups: ["Undiscovered"],
    },
    celesirmega: {
        num: 7500387,
        species: "Celesir-Mega",
        baseSpecies: "Celesir",
        forme: "Mega",
        formeLetter: "M",
        gender: "N",
        types: ["Steel", "Flying"],
        baseStats: {
            hp: 81,
            atk: 163,
            def: 121,
            spa: 91,
            spd: 125,
            spe: 93
        },
        abilities: {
            0: "Aerilate"
        },
        color: "Green",
        heightm: 5.55,
        weightkg: 531.45,
		  eggGroups: ["Undiscovered"],
    },
    nymph: {
        num: 7500388,
        species: "Nymph",
        types: ["Fairy", "Grass"],
        gender: "N",
        baseStats: {
            hp: 88,
            atk: 85,
            def: 105,
            spa: 115,
            spd: 105,
            spe: 105
        },
        abilities: {
            0: "Deceiver"
        },
        color: "Gray",
        heightm: 2.15,
        weightkg: 71.75,
		  eggGroups: ["Undiscovered"],
    },
    kyokid: {
        num: 7500389,
        species: "Kyokid",
        types: ["Water", "Electric"],
        genderRatio: {M: 0.75, F: 0.25},
        baseStats: {
            hp: 72,
            atk: 81,
            def: 70,
            spa: 120,
            spd: 97,
            spe: 112
        },
        abilities: {
            0: "Electrotorrent"
        },
        color: "Yellow",
        heightm: 2.55,
        weightkg: 187.75,
		  eggGroups: ["Undiscovered"],
    },
    kyokidprimal: {
        num: 7500389,
        species: "Kyokid-Primal",
        baseSpecies: "Kyokid",
        forme: "Primal",
        formeLetter: "P",
        genderRatio: {M: 0.75, F: 0.25},
        types: ["Water", "Electric"],
        baseStats: {
            hp: 72,
            atk: 131,
            def: 70,
            spa: 150,
            spd: 117,
            spe: 112
        },
        abilities: {
            0: "Primordial Sea"
        },
        color: "Yellow",
        heightm: 7.85,
        weightkg: 265.75,
		  eggGroups: ["Undiscovered"],
    },
    lemorusincarnate: {
        num: 7500390,
        species: "Lemorus-Incarnate",
        types: ["Ground", "Electric"],
        gender: "M",
        baseStats: {
            hp: 104,
            atk: 142,
            def: 110,
            spa: 85,
            spd: 72,
            spe: 73
        },
        abilities: {
            0: "Move Madness"
        },
        color: "Gray",
        heightm: 1.6,
        weightkg: 192,
		  eggGroups: ["Undiscovered"],
    },
    absoko: {
        num: 7500391,
        species: "Absoko",
        types: ["Dark", "Fairy"],
        baseStats: {
            hp: 67,
            atk: 142,
            def: 72,
            spa: 85,
            spd: 67,
            spe: 122
        },
        abilities: {
            0: "Dark Surge"
        },
        color: "White",
        heightm: 1.5,
        weightkg: 33.75,
		  eggGroups: ["Undiscovered"],
		  otherFormes: ["absokomega"],
     dexentry: "A rare, legendary entity created in a laboratory by Team Rocket. It was made using the powerful forces of Tapu Koko, the guardian of Melemele, combined with an Absol. Results did not go as intended, as it kept the pure heart of Koko, and does not obey Team Rocket at all. This species is said to warn the coming of a terrible thunderstorm, and only ever appearing before one is near."
    },
    absokomega: {
        num: 7500391,
        species: "Absoko-Mega",
        baseSpecies: "Absoko",
        forme: "Mega",
        formeLetter: "M",
        types: ["Dark", "Fairy"],
        baseStats: {
            hp: 67,
            atk: 162,
            def: 72,
            spa: 125,
            spd: 67,
            spe: 162
        },
        abilities: {
            0: "Magic Bounce"
        },
        color: "White",
        heightm: 1.5,
        weightkg: 35.75,
		  eggGroups: ["Undiscovered"],
    },
    sugarplum: {
        num: 7500392,
        species: "Sugarplum",
        types: ["Steel", "Fairy"],
        baseStats: {
            hp: 83,
            atk: 99,
            def: 84,
            spa: 72,
            spd: 84,
            spe: 94
        },
        abilities: {
            0: "Nutcracker"
        },
        color: "Gray",
        heightm: 0.55,
        weightkg: 4.15,
		  eggGroups: ["Fairy"],
    },
    giradino: {
        num: 7500393,
        species: "Giradino",
        types: ["Ghost", "Normal"],
        baseStats: {
            hp: 146,
            atk: 80,
            def: 113,
            spa: 80,
            spd: 113,
            spe: 70
        },
        abilities: {
            0: "Revitalize"
        },
        color: "Pink",
        heightm: 2.8,
        weightkg: 390.5,
		  otherFormes: ["giradinomega"],
		  eggGroups: ["Undiscovered"],
    },
    giradinomega: {
        num: 7500393,
        species: "Giradino-Mega",
        baseSpecies: "Giradino",
        forme: "Mega",
        formeLetter: "M",
        types: ["Ghost", "Fairy"],
        baseStats: {
            hp: 146,
            atk: 80,
            def: 153,
            spa: 100,
            spd: 153,
            spe: 70
        },
        abilities: {
            0: "Healer"
        },
        color: "White",
        heightm: 3.2,
        weightkg: 391.5,
		  eggGroups: ["Undiscovered"],
    },
    xurkizard: {
        num: 7500394,
        species: "Xurkizard",
        types: ["Electric", "Fire"],
        gender: "N",
        baseStats: {
            hp: 80,
            atk: 86,
            def: 74,
            spa: 161,
            spd: 78,
            spe: 111
        },
        abilities: {
            0: "Blazing Beast"
        },
        color: "Black",
        heightm: 2.75,
        weightkg: 95.25,
		  otherFormes: ["xurkizardmegax", "xurkizardmegay"],
		  eggGroups: ["Undiscovered"],
    },
    xurkizardmegax: {
        num: 7500394,
        species: "Xurkizard-Mega-X",
        baseSpecies: "Xurkizard",
        forme: "Mega",
        formeLetter: "M",
        gender: "N",
        types: ["Electric", "Dragon"],
        baseStats: {
            hp: 80,
            atk: 132,
            def: 107,
            spa: 182,
            spd: 78,
            spe: 111
        },
        abilities: {
            0: "Tough Claws"
        },
        color: "Black",
        heightm: 2.75,
        weightkg: 115.25,
		  eggGroups: ["Undiscovered"],
    },
    xurkizardmegay: {
        num: 7500394,
        species: "Xurkizard-Mega-Y",
        baseSpecies: "Xurkizard",
        forme: "Mega",
        formeLetter: "M",
        gender: "N",
        types: ["Electric", "Fire"],
        baseStats: {
            hp: 80,
            atk: 106,
            def: 74,
            spa: 211,
            spd: 108,
            spe: 111
        },
        abilities: {
            0: "Drought"
        },
        color: "Black",
        heightm: 2.75,
        weightkg: 105.25,
		  eggGroups: ["Undiscovered"],
    },
    skarmeye: {
        num: 7500395,
        species: "Skarmeye",
        types: ["Steel", "Ghost"],
        baseStats: {
            hp: 81,
            atk: 103,
            def: 117,
            spa: 80,
            spd: 95,
            spe: 80
        },
        abilities: {
            0: "Light Armor"
        },
        heightm: 1.65,
        weightkg: 43.55,
		  eggGroups: ["Flying"],
    },
    marshern: {
        num: 7500396,
        species: "Marshern",
        types: ["Ground", "Fairy"],
        genderRatio: {M: 0.875, F: 0.125},
        baseStats: {
            hp: 98,
            atk: 108,
            def: 100,
            spa: 106,
            spd: 95,
            spe: 80
        },
        abilities: {
            0: "Soaking Aura"
        },
        color: "Blue",
        heightm: 1.85,
        weightkg: 121.5,
		  eggGroups: ["Undiscovered"],
    },
    grovyltal: {
        num: 7500397,
        species: "Grovyltal",
        types: ["Grass", "Dark"],
        genderRatio: {M: 0.875, F: 0.125},
        baseStats: {
            hp: 88,
            atk: 113,
            def: 70,
            spa: 113,
            spd: 81,
            spe: 117
        },
        abilities: {
            0: "Jailbreak"
        },
        color: "Green",
        heightm: 3.35,
        weightkg: 112.3,
		  eggGroups: ["Undiscovered"],
    },
    rairai: {
        num: 7500398,
        species: "Rairai",
        types: ["Dark", "Electric"],
        baseStats: {
            hp: 65,
            atk: 110,
            def: 73,
            spa: 133,
            spd: 85,
            spe: 118
        },
        abilities: {
            0: "Paralyzed With Fear"
        },
        color: "Black",
        heightm: 1.15,
        weightkg: 40.25,
		  eggGroups: ["Undiscovered"],
    },
    dramasnow: {
        num: 7500399,
        species: "Dramasnow",
        types: ["Dragon", "Ice"],
        baseStats: {
            hp: 94,
            atk: 86,
            def: 90,
            spa: 123,
            spd: 98,
            spe: 58
        },
        abilities: {
            0: "Ageless Blizzard"
        },
        color: "White",
        heightm: 2.6,
        weightkg: 160.25,
		  otherFormes: ["dramasnowmega"],
		  eggGroups: ["Monster"],
    },
    dramasnowmega: {
        num: 7500399,
        species: "Dramasnow-Mega",
        baseSpecies: "Dramasnow",
        forme: "Mega",
        formeLetter: "M",
        types: ["Dragon", "Ice"],
        baseStats: {
            hp: 94,
            atk: 126,
            def: 120,
            spa: 163,
            spd: 118,
            spe: 28
        },
        abilities: {
            0: "Snow Warning"
        },
        color: "White",
        heightm: 3.1,
        weightkg: 209.75,
		  eggGroups: ["Monster"],
    },
    chaosii: {
        num: 7500400,
        species: "Chaos II",
        types: ["Normal", "Fighting"],
        genderRatio: {M: 0.375, F: 0.625},
        baseStats: {
            hp: 80,
            atk: 120,
            def: 70,
            spa: 90,
            spd: 70,
            spe: 120
        },
        abilities: {
            0: "Flip Out"
        },
        color: "Gray",
        heightm: 0.95,
        weightkg: 21.5,
		  eggGroups: ["Field"],
    },
    slowmarina: {
        num: 7500401,
        species: "Slowmarina",
        types: ["Water", "Fairy"],
        genderRatio: {M: 0.75, F: 0.25},
        baseStats: {
            hp: 97,
            atk: 84,
            def: 102,
            spa: 123,
            spd: 108,
            spe: 55
        },
        abilities: {
            0: "Magical Voice"
        },
        heightm: 1.7,
        weightkg: 61.25,
        color: "Pink",
		  otherFormes: ["slowmarinamega"],
        eggGroups: ["Water 1"]
    },
    slowmarinamega: {
        num: 7500401,
        species: "Slowmarina-Mega",
        baseSpecies: "Slowmarina",
        forme: "Mega",
        formeLetter: "M",
        types: ["Water", "Fairy"],
        genderRatio: {M: 0.75, F: 0.25},
        baseStats: {
            hp: 97,
            atk: 84,
            def: 172,
            spa: 153,
            spd: 108,
            spe: 55
        },
        abilities: {
            0: "Shell Armor"
        },
        heightm: 1.9,
        weightkg: 99.25,
        color: "Pink",
        eggGroups: ["Water 1"]
    },
    kartaria: {
        num: 7500402,
        species: "Kartaria",
        types: ["Steel", "Dragon"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 70,
            atk: 140,
            def: 110,
            spa: 70,
            spd: 70,
            spe: 108
        },
        abilities: {
            0: "Cloud Boost"
        },
        heightm: 0.7,
        weightkg: 10.35,
        color: "Blue",
		  otherFormes: ["kartariamega"],
        eggGroups: ["Undiscovered"],
    },
    kartariamega: {
        num: 7500402,
        species: "Kartaria-Mega",
        baseSpecies: "Kartaria",
        forme: "Mega",
        formeLetter: "M",
        types: ["Steel", "Fairy"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 70,
            atk: 180,
            def: 130,
            spa: 110,
            spd: 70,
            spe: 108
        },
        abilities: {
            0: "Pixilate"
        },
        heightm: 1.1,
        weightkg: 10.35,
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
    altarbat: {
        num: 7500403,
        species: "Altarbat",
        types: ["Poison", "Dragon"],
        genderRatio: {
            M: 0.5,
            F: 0.5
        },
        baseStats: {
            hp: 90,
            atk: 90,
            def: 95,
            spa: 80,
            spd: 102,
            spe: 115
        },
        abilities: {
            0: "Clean Aura"
        },
        heightm: 1.1,
        weightkg: 20.6,
        color: "Purple",
		  otherFormes: ["altarbatmega"],
        eggGroups: ["Flying"],
    },
    altarbatmega: {
        num: 7500403,
        species: "Altarbat-Mega",
        baseSpecies: "Altarbat",
        forme: "Mega",
        formeLetter: "M",
        types: ["Poison", "Fairy"],
        baseStats: {
            hp: 90,
            atk: 130,
            def: 115,
            spa: 120,
            spd: 102,
            spe: 115
        },
        abilities: {
            0: "Pixilate"
        },
        heightm: 1.5,
        weightkg: 20.6,
        color: "Blue",
        eggGroups: ["Flying"],
    },
    darkelectrode: {
        num: 7500404,
        species: "Dark Electrode",
        types: ["Electric", "Dark"],
        gender: "N",
        baseStats: {
            hp: 65,
            atk: 70,
            def: 80,
            spa: 127,
            spd: 85,
            spe: 157
        },
        abilities: {
            0: "Last Nightmare"
        },
        color: "Black",
        heightm: 1.35,
        weightkg: 58.55,
     	  eggGroups: ["Undiscovered"],
    },
    vanilele: {
        num: 7500405,
        species: "Vani Lele",
        types: ["Ice", "Psychic"],
        gender: "N",
        baseStats: {
            hp: 70,
            atk: 90,
            def: 80,
            spa: 140,
            spd: 105,
            spe: 107
        },
        abilities: {
            0: "Brainfreeze Surge"
        },
        heightm: 1.25,
        weightkg: 38.05,
        color: "Pink",
        eggGroups: ["Undiscovered"],
    },
    shiinofey: {
        num: 7500406,
        species: "Shiinofey",
        types: ["Grass", "Fairy"],
        genderRatio: {M: 0.375, F: 0.625},
        baseStats: {
            hp: 65,
            atk: 58,
            def: 95,
            spa: 96,
            spd: 115,
            spe: 75
        },
        abilities: {
            0: "Spore Spreading"
        },
        heightm: 55,
        weightkg: 5.9,
        color: "Green",
        eggGroups: ["Grass"],
    },
    algantine: {
        num: 7500407,
        species: "Algantine",
        types: ["Poison", "Water"],
        baseStats: {
            hp: 85,
            atk: 67,
            def: 80,
            spa: 98,
            spd: 141,
            spe: 67
        },
        abilities: {
            0: "Adapting Absorption"
        },
        heightm: 2,
        weightkg: 150.8,
        color: "Brown",
        eggGroups: ["Water 1"],
    },
    regetta: {
        num: 7500408,
        species: "Regetta",
        types: ["Ice", "Psychic"],
        gender: "N",
		  baseForme: "Frozen",
        baseStats: {
            hp: 90,
            atk: 63,
            def: 88,
            spa: 134,
            spd: 184,
            spe: 70
        },
        abilities: {
            0: "Cool as Ice"
        },
        heightm: 1.2,
        weightkg: 90.8,
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
    regettacompressed: {
        num: 7500408,
        species: "Regetta-Compressed",
        baseSpecies: "Regetta",
        forme: "Compressed",
        formeLetter: "C",
        types: ["Ice", "Fighting"],
        gender: "N",
        baseStats: {
            hp: 90,
            atk: 134,
            def: 70,
            spa: 63,
            spd: 88,
            spe: 184
        },
        abilities: {
            0: "Cool as Ice"
        },
        heightm: 1.2,
        weightkg: 90.8,
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
    heataria: {
        num: 7500409,
        species: "Heataria",
        types: ["Dragon", "Steel"],
        baseStats: {
            hp: 103,
            atk: 100,
            def: 98,
            spa: 100,
            spd: 105,
            spe: 78
        },
        abilities: {
            0: "Firefighter"
        },
        color: "Brown",
        heightm: 1.4,
        weightkg: 225.3,
		  otherFormes: ["heatariamega"],
     	  eggGroups: ["Undiscovered"],
    },
    heatariamega: {
        num: 7500409, // 103	140	118	140	105	78
        species: "Heataria-Mega",
        baseSpecies: "Heataria",
        forme: "Mega",
        formeLetter: "M",
        types: ["Dragon", "Fairy"],
        baseStats: {
            hp: 103,
            atk: 140,
            def: 118,
            spa: 140,
            spd: 105,
            spe: 78
        },
        abilities: {
            0: "Firefighter"
        },
        color: "Brown",
        heightm: 1.8,
        weightkg: 225.3,
     	  eggGroups: ["Undiscovered"],
    },
    gardecuno: {
        num: 7500410,
        species: "Gardecuno",
        types: ["Ice", "Fairy"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 85,
            atk: 75,
            def: 90,
            spa: 120,
            spd: 128,
            spe: 90
        },
        abilities: {
            0: "Goddess Trace"
        },
        heightm: 1.65,
        weightkg: 51.9,
        color: "Blue",
		  otherFormes: ["gardecunomega"],
        eggGroups: ["Undiscovered"],
    },
    gardecunomega: {
        num: 7500410,
        species: "Gardecuno-Mega",
        baseSpecies: "Gardecuno",
        forme: "Mega",
        formeLetter: "M",
        types: ["Ice", "Fairy"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 85,
            atk: 95,
            def: 90,
            spa: 160,
            spd: 148,
            spe: 110
        },
        abilities: {
            0: "Pixilate"
        },
        heightm: 1.65,
        weightkg: 51.9,
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
    sparklingart: {
        num: 7500411,
        species: "Sparkling Art",
        types: ["Steel", "Flying"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 72,
            atk: 110,
            def: 92,
            spa: 60,
            spd: 92,
            spe: 115
        },
        abilities: {
            0: "Brilliant Brightness"
        },
        heightm: 0.9,
        weightkg: 53.0,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    // Vallysect 7500409
	vallysect: {
		num: 7500412,
		species: "Vallysect",
		types: ["Bug", "Normal"],
		gender: "N",
		baseStats: {
			hp: 90,
			atk: 120,
			def: 95,
			spa: 120,
			spd: 95,
			spe: 104,
		},
		abilities: {
			0: "Genetic Algorithm"
		},
        color: "Purple",
		  heightm: 1.9,
		  weightkg: 91.5,
		  eggGroups: ["Undiscovered"],
	},
	vallysectfire: {
		num: 7500412,
		species: "Vallysect-Fire",
		baseSpecies: "Vallysect",
		forme: "Fire",
		formeLetter: "F",
		types: ["Bug", "Fire"],
		gender: "N",
		baseStats: {
			hp: 90,
			atk: 120,
			def: 95,
			spa: 120,
			spd: 95,
			spe: 104,
		},
		abilities: {
			0: "Genetic Algorithm"
		},
        color: "Purple",
		  heightm: 1.9,
		  weightkg: 91.5,
		  eggGroups: ["Undiscovered"],
	},
	vallysectwater: {
		num: 7500412,
		species: "Vallysect-Water",
		baseSpecies: "Vallysect",
		forme: "Water",
		formeLetter: "W",
		types: ["Bug", "Water"],
		gender: "N",
		baseStats: {
			hp: 90,
			atk: 120,
			def: 95,
			spa: 120,
			spd: 95,
			spe: 104,
		},
		abilities: {
			0: "Genetic Algorithm"
		},
        color: "Purple",
		  heightm: 1.9,
		  weightkg: 91.5,
		  eggGroups: ["Undiscovered"],
	},
	vallysectelectric: {
		num: 7500412,
		species: "Vallysect-Electric",
		baseSpecies: "Vallysect",
		forme: "Electric",
		formeLetter: "E",
		types: ["Bug", "Electric"],
		gender: "N",
		baseStats: {
			hp: 90,
			atk: 120,
			def: 95,
			spa: 120,
			spd: 95,
			spe: 104,
		},
		abilities: {
			0: "Genetic Algorithm"
		},
        color: "Purple",
		  heightm: 1.9,
		  weightkg: 91.5,
		  eggGroups: ["Undiscovered"],
	},
	vallysectgrass: {
		num: 7500412,
		species: "Vallysect-Grass",
		baseSpecies: "Vallysect",
		forme: "Grass",
		formeLetter: "G",
		types: ["Bug", "Grass"],
		gender: "N",
		baseStats: {
			hp: 90,
			atk: 120,
			def: 95,
			spa: 120,
			spd: 95,
			spe: 104,
		},
		abilities: {
			0: "Genetic Algorithm"
		},
        color: "Purple",
		  heightm: 1.9,
		  weightkg: 91.5,
		  eggGroups: ["Undiscovered"],
	},
	vallysectelectric: {
		num: 7500412,
		species: "Vallysect-Ice",
		baseSpecies: "Vallysect",
		forme: "Ice",
		formeLetter: "I",
		types: ["Bug", "Ice"],
		gender: "N",
		baseStats: {
			hp: 90,
			atk: 120,
			def: 95,
			spa: 120,
			spd: 95,
			spe: 104,
		},
		abilities: {
			0: "Genetic Algorithm"
		},
        color: "Purple",
		  heightm: 1.9,
		  weightkg: 91.5,
		  eggGroups: ["Undiscovered"],
	},
	vallysectfighting: {
		num: 7500412,
		species: "Vallysect-Fighting",
		baseSpecies: "Vallysect",
		forme: "Fighting",
		formeLetter: "F",
		types: ["Bug", "Fighting"],
		gender: "N",
		baseStats: {
			hp: 90,
			atk: 120,
			def: 95,
			spa: 120,
			spd: 95,
			spe: 104,
		},
		abilities: {
			0: "Genetic Algorithm"
		},
        color: "Purple",
		  heightm: 1.9,
		  weightkg: 91.5,
		  eggGroups: ["Undiscovered"],
	},
	vallysectground: {
		num: 7500412,
		species: "Vallysect-Ground",
		baseSpecies: "Vallysect",
		forme: "Ground",
		formeLetter: "G",
		types: ["Bug", "Ground"],
		gender: "N",
		baseStats: {
			hp: 90,
			atk: 120,
			def: 95,
			spa: 120,
			spd: 95,
			spe: 104,
		},
		abilities: {
			0: "Genetic Algorithm"
		},
        color: "Purple",
		  heightm: 1.9,
		  weightkg: 91.5,
		  eggGroups: ["Undiscovered"],
	},
	vallysectpoison: {
		num: 7500412,
		species: "Vallysect-Poison",
		baseSpecies: "Vallysect",
		forme: "Poison",
		formeLetter: "P",
		types: ["Bug", "Poison"],
		gender: "N",
		baseStats: {
			hp: 90,
			atk: 120,
			def: 95,
			spa: 120,
			spd: 95,
			spe: 104,
		},
		abilities: {
			0: "Genetic Algorithm"
		},
        color: "Purple",
		  heightm: 1.9,
		  weightkg: 91.5,
		  eggGroups: ["Undiscovered"],
	},
	vallysectflying: {
		num: 7500412,
		species: "Vallysect-Flying",
		baseSpecies: "Vallysect",
		forme: "Flying",
		formeLetter: "F",
		types: ["Bug", "Flying"],
		gender: "N",
		baseStats: {
			hp: 90,
			atk: 120,
			def: 95,
			spa: 120,
			spd: 95,
			spe: 104,
		},
		abilities: {
			0: "Genetic Algorithm"
		},
        color: "Purple",
		  heightm: 1.9,
		  weightkg: 91.5,
		  eggGroups: ["Undiscovered"],
	},
	vallysectpsychic: {
		num: 7500412,
		species: "Vallysect-Psychic",
		baseSpecies: "Vallysect",
		forme: "Psychic",
		formeLetter: "P",
		types: ["Bug", "Psychic"],
		gender: "N",
		baseStats: {
			hp: 90,
			atk: 120,
			def: 95,
			spa: 120,
			spd: 95,
			spe: 104,
		},
		abilities: {
			0: "Genetic Algorithm"
		},
        color: "Purple",
		  heightm: 1.9,
		  weightkg: 91.5,
		  eggGroups: ["Undiscovered"],
	},
	vallysectbug: {
		num: 7500412,
		species: "Vallysect-Bug",
		baseSpecies: "Vallysect",
		forme: "Bug",
		formeLetter: "B",
		types: ["Bug"],
		gender: "N",
		baseStats: {
			hp: 90,
			atk: 120,
			def: 95,
			spa: 120,
			spd: 95,
			spe: 104,
		},
		abilities: {
			0: "Genetic Algorithm"
		},
        color: "Purple",
		  heightm: 1.9,
		  weightkg: 91.5,
		  eggGroups: ["Undiscovered"],
	},
	vallysectrock: {
		num: 7500412,
		species: "Vallysect-Rock",
		baseSpecies: "Vallysect",
		forme: "Rock",
		formeLetter: "R",
		types: ["Bug", "Rock"],
		gender: "N",
		baseStats: {
			hp: 90,
			atk: 120,
			def: 95,
			spa: 120,
			spd: 95,
			spe: 104,
		},
		abilities: {
			0: "Genetic Algorithm"
		},
        color: "Purple",
		  heightm: 1.9,
		  weightkg: 91.5,
		  eggGroups: ["Undiscovered"],
	},
	vallysectghost: {
		num: 7500412,
		species: "Vallysect-Ghost",
		baseSpecies: "Vallysect",
		forme: "Ghost",
		formeLetter: "G",
		types: ["Bug", "Ghost"],
		gender: "N",
		baseStats: {
			hp: 90,
			atk: 120,
			def: 95,
			spa: 120,
			spd: 95,
			spe: 104,
		},
		abilities: {
			0: "Genetic Algorithm"
		},
        color: "Purple",
		  heightm: 1.9,
		  weightkg: 91.5,
		  eggGroups: ["Undiscovered"],
	},
	vallysectdragon: {
		num: 7500412,
		species: "Vallysect-Dragon",
		baseSpecies: "Vallysect",
		forme: "Dragon",
		formeLetter: "D",
		types: ["Bug", "Dragon"],
		gender: "N",
		baseStats: {
			hp: 90,
			atk: 120,
			def: 95,
			spa: 120,
			spd: 95,
			spe: 104,
		},
		abilities: {
			0: "Genetic Algorithm"
		},
        color: "Purple",
		  heightm: 1.9,
		  weightkg: 91.5,
		  eggGroups: ["Undiscovered"],
	},
	vallysectdark: {
		num: 7500412,
		species: "Vallysect-Dark",
		baseSpecies: "Vallysect",
		forme: "Dark",
		formeLetter: "D",
		types: ["Bug", "Dark"],
		gender: "N",
		baseStats: {
			hp: 90,
			atk: 120,
			def: 95,
			spa: 120,
			spd: 95,
			spe: 104,
		},
		abilities: {
			0: "Genetic Algorithm"
		},
        color: "Purple",
		  heightm: 1.9,
		  weightkg: 91.5,
		  eggGroups: ["Undiscovered"],
	},
	vallysectsteel: {
		num: 7500412,
		species: "Vallysect-Steel",
		baseSpecies: "Vallysect",
		forme: "Steel",
		formeLetter: "S",
		types: ["Bug", "Steel"],
		gender: "N",
		baseStats: {
			hp: 90,
			atk: 120,
			def: 95,
			spa: 120,
			spd: 95,
			spe: 104,
		},
		abilities: {
			0: "Genetic Algorithm"
		},
        color: "Purple",
		  heightm: 1.9,
		  weightkg: 91.5,
		  eggGroups: ["Undiscovered"],
	},
	vallysectfairy: {
		num: 7500412,
		species: "Vallysect-Fairy",
		baseSpecies: "Vallysect",
		forme: "Fairy",
		formeLetter: "F",
		types: ["Bug", "Fairy"],
		gender: "N",
		baseStats: {
			hp: 90,
			atk: 120,
			def: 95,
			spa: 120,
			spd: 95,
			spe: 104,
		},
		abilities: {
			0: "Genetic Algorithm"
		},
        color: "Purple",
		  heightm: 1.9,
		  weightkg: 91.5,
		  eggGroups: ["Undiscovered"],
	},
    mamozone: {
        num: 7500413,
        species: "Mamozone",
        types: ["Ground", "Steel"],
        gender: "N",
        baseStats: {
            hp: 90,
            atk: 120,
            def: 97,
            spa: 100,
            spd: 95,
            spe: 70
        },
        abilities: {
            0: "Fat Trap"
        },
        color: "Gray",
        heightm: 1.05,
        weightkg: 565.2,
		  eggGroups: ["Undiscovered"],
    },
    slakoem: {
        num: 7500414,
        species: "Slakoem",
        types: ["Normal", "Psychic"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        }, // 106	114	115	62	108	68
        baseStats: {
            hp: 106,
            atk: 114,
            def: 115,
            spa: 62,
            spd: 108,
            spe: 68
        },
        abilities: {
            0: "Singularity"
        },
        color: "Blue",
        heightm: 1.05,
        weightkg: 565.2,
		  eggGroups: ["Undiscovered"],
    },
    audala: {
        num: 7500415,
        species: "Audala",
        types: ["Ghost", "Normal"],
        baseStats: {
            hp: 140,
            atk: 86,
            def: 101,
            spa: 99,
            spd: 101,
            spe: 73
        },
        abilities: {
            0: "Recovery Shield"
        },
        heightm: 2.6,
        weightkg: 75.5,
        color: "Purple",
		  otherFormes: ["audalamega"],
        eggGroups: ["Undiscovered"],
    },
    audalamega: {
        num: 7500415,
        species: "Audala-Mega",
        baseSpecies: "Audala",
        forme: "Mega",
        formeLetter: "M",
        types: ["Ghost", "Fairy"],
        baseStats: {
            hp: 140,
            atk: 86,
            def: 141,
            spa: 119,
            spd: 141,
            spe: 73
        },
        abilities: {
            0: "Healer"
        },
        heightm: 3.0,
        weightkg: 76.5,
        color: "Purple",
        eggGroups: ["Undiscovered"],
    },
    sandgarde: {
        num: 7500416,
        species: "Sandgarde",
        types: ["Ground", "Dragon"],
        gender: "N",
        baseStats: {
            hp: 96,
            atk: 87,
            def: 115,
            spa: 110,
            spd: 105,
            spe: 65
        },
        abilities: {
            0: "Sandy Construct"
        },
        heightm: 3.1,
        weightkg: 277.5,
        color: "Brown",
        eggGroups: ["Undiscovered"],
        otherFormes: ["sandgardecastle"],
    },
    sandgardecastle: {
        num: 7500416,
        species: "Sandgarde-Castle",
        baseSpecies: "Sandgarde",
        forme: "Castle",
        formeLetter: "C",
        types: ["Ground", "Dragon"],
        gender: "N",
        baseStats: {
            hp: 204,
            atk: 87,
            def: 115,
            spa: 120,
            spd: 105,
            spe: 55
        },
        abilities: {
            0: "Sandy Construct"
        },
        heightm: 2.6,
        weightkg: 582.5,
        color: "Brown",
        eggGroups: ["Undiscovered"],
    },
    triagonal: {
        num: 7500417,
        species: "Triagonal",
        types: ["Electric", "Ice"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 75,
            atk: 62,
            def: 55,
            spa: 120,
            spd: 97,
            spe: 125
        },
        abilities: {
            0: "Airbone Lighting"
        },
        heightm: 1.3,
        weightkg: 94.1,
        color: "Blue",
		  otherFormes: ["triagonalmega"],
        eggGroups: ["Undiscovered"],
    },
    triagonalmega: {
        num: 7500417,
        species: "Triagonal-Mega",
        baseSpecies: "Triagonal",
        forme: "Mega",
        formeLetter: "M",
        types: ["Electric", "Ice"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 75,
            atk: 62,
            def: 75,
            spa: 150,
            spd: 117,
            spe: 155
        },
        abilities: {
            0: "Intimidate"
        },
        heightm: 1.6,
        weightkg: 97.9,
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
    exfeycola: {
        num: 7500418,
        species: "Exfey-Cola",
        types: ["Fairy", "Grass"],
        genderRatio: {M: 0.25, F: 0.75},
        baseStats: {
            hp: 83,
            atk: 88,
            def: 97,
            spa: 113,
            spd: 102,
            spe: 82
        },
        abilities: {
            0: "Berry Cola"
        },
        heightm: 5.5,
        weightkg: 208,
        color: "Green",
        eggGroups: ["Grass"],
    },
    komodreigon: {
        num: 7500419,
        species: "Komodreigon",
        types: ["Dragon", "Fighting"],
        baseStats: {
            hp: 93,
            atk: 117,
            def: 117,
            spa: 125,
            spd: 107,
            spe: 101
        },
        abilities: {
            0: "S.O.N.A.R"
        },
        color: "Gray",
        heightm: 1.7,
        weightkg: 119.1,
        eggGroups: ["Dragon"],
    },
    dunking: {
        num: 7500420,
        species: "Dunking",
        types: ["Normal"],
        baseStats: {
            hp: 135,
            atk: 125,
            def: 95,
            spa: 90,
            spd: 75,
            spe: 82
        },
        abilities: {
            0: "Shut Up and Jam",
        },
        heightm: 1.8,
        weightkg: 72.3,
        color: "Yellow",
        eggGroups: ["Field"],
    },
    kudou: {
        num: 7500421,
        species: "Kudou",
        types: ["Water", "Electric"],
        gender: "N",
        baseStats: {
            hp: 85,
            atk: 100,
            def: 80,
            spa: 140,
            spd: 85,
            spe: 129
        },
        abilities: {
            0: "Authority"
        },
        heightm: 1.4,
        weightkg: 54.7,
        color: "Yellow",
        eggGroups: ["Undiscovered"],
    },
    golisorem: {
        num: 7500422,
        species: "Golisorem",
        types: ["Ice", "Water"],
        gender: "N",
        baseStats: {
            hp: 100,
            atk: 147,
            def: 115,
            spa: 95,
            spd: 110,
            spe: 67
        },
        abilities: {
            0: "Threatening Glare"
        },
        heightm: 2.5,
        weightkg: 216.5,
        color: "Gray",
        eggGroups: ["Undiscovered"]
    },
    tyrazma: {
        num: 7500423,
        species: "Tyrazma",
        types: ["Rock", "Psychic"],
        gender: "N",
        baseStats: {
            hp: 118,
            atk: 120,
            def: 105,
            spa: 121,
            spd: 104,
            spe: 70
        },
        abilities: {
            0: "Diamond Shield"
        },
        heightm: 2.4,
        weightkg: 230,
        color: "Black",
		  otherFormes: ["tyrazmamega"],
        eggGroups: ["Undiscovered"],
    },
    tyrazmamega: {
        num: 7500423,
        species: "Tyrazma-Mega",
        baseSpecies: "Tyrazma",
        forme: "Mega",
        formeLetter: "M",
        types: ["Rock", "Psychic"],
        gender: "N",
        baseStats: {
            hp: 118,
            atk: 150,
            def: 145,
            spa: 121,
            spd: 124,
            spe: 80
        },
        abilities: {
            0: "Sand Stream"
        },
        heightm: 2.9,
        weightkg: 283,
        color: "Black",
        eggGroups: ["Undiscovered"],
    },
    parasol: {
        num: 7500424,
        species: "Parasol",
        types: ["Bug", "Steel"],
        baseStats: {
            hp: 118,
            atk: 136,
            def: 93,
            spa: 86,
            spd: 84,
            spe: 63
        },
        abilities: {
            0: "Sunsteel Skin"
        },
        heightm: 2.2,
        weightkg: 129.8,
        color: "White",
        eggGroups: ["Undiscovered"],
    },
    diceus: {
        num: 7500425,
        species: "Diceus",
        types: ["Normal"],
        gender: "N",
        baseStats: {
            hp: 84,
            atk: 84,
            def: 94,
            spa: 84,
            spd: 94,
            spe: 104
        },
        abilities: {
            0: "Miracle Morph"
        },
        color: "Purple",
        heightm: 1.75,
        weightkg: 162,
		  eggGroups: ["Undiscovered"],
    },
    nintwo: {
        num: 7500426,
        species: "Nintwo",
        types: ["Bug", "Psychic"],
        baseStats: {
            hp: 83,
            atk: 100,
            def: 77,
            spa: 122,
            spd: 80,
            spe: 145
        },
        abilities: {
            0: "Speed Stopper"
        },
        color: "Purple",
        heightm: 1.4,
        weightkg: 67,
		  otherFormes: ["nintwomegax", "nintwomegay"],
		  eggGroups: ["Undiscovered"],
    },
    nintwomegax: {
        num: 7500426,
        species: "Nintwo-Mega-X",
        baseSpecies: "Nintwo",
        forme: "Mega",
        formeLetter: "M",
        types: ["Bug", "Fighting"],
        baseStats: {
            hp: 83,
            atk: 180,
            def: 87,
            spa: 122,
            spd: 90,
            spe: 145
        },
        abilities: {
            0: "Steadfast"
        },
        color: "Purple",
        heightm: 1.9,
        weightkg: 72,
		  eggGroups: ["Undiscovered"],
    },
    nintwomegay: {
        num: 7500426,
        species: "Nintwo-Mega-Y",
        baseSpecies: "Nintwo",
        forme: "Mega",
        formeLetter: "M",
        types: ["Bug", "Psychic"],
        baseStats: {
            hp: 83,
            atk: 140,
            def: 57,
            spa: 162,
            spd: 110,
            spe: 155
        },
        abilities: {
            0: "Insomnia"
        },
        color: "Purple",
        heightm: 0.9,
        weightkg: 18.125,
		  eggGroups: ["Undiscovered"],
    },
    kommew: {
        num: 7500427,
        species: "Kommew",
        types: ["Fighting", "Psychic"],
        baseStats: {
            hp: 107,
            atk: 105,
            def: 112,
            spa: 110,
            spd: 112,
            spe: 92
        },
        abilities: {
            0: "Echo Chamber"
        },
        color: "Gray",
        heightm: 1,
        weightkg: 41.1,
		  eggGroups: ["Undiscovered"],
    },
	tamatoa: {
        num: 7500428,
        species: "Tamatoa",
        types: ["Grass", "Water"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 70,
            atk: 140,
            def: 100,
            spa: 87,
            spd: 90,
            spe: 71
        },
        abilities: {
            0: "Kelp Surge"
        },
        heightm: 86.45,
        weightkg: 39.15,
        color: "Red",
        eggGroups: ["Undiscovered"],
    },
    pelippex: {
        num: 7500429,
        species: "Pelippex",
        types: ["Water", "Poison"],
        baseStats: {
            hp: 65,
            atk: 66,
            def: 136,
            spa: 84,
            spd: 116,
            spe: 60
        },
        abilities: {
            0: "Rain Regen"
        },
        heightm: 1,
        weightkg: 21.3,
        color: "Blue",
        eggGroups: ["Water 1"],
    },
     kyzor: {
        num: 7500430,
        species: "Kyzor",
        types: ["Dragon", "Steel"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 97,
            atk: 130,
            def: 105,
            spa: 92,
            spd: 105,
            spe: 90
        },
        abilities: {
            0: "Pressurizer"
        },
        heightm: 2.4,
        weightkg: 221.5,
        color: "Gray",
		  otherFormes: ["kyzormega"],
        eggGroups: ["Undiscovered"],
    },
    kyzormega: {
        num: 7500430,
        species: "Kyzor-Mega",
        baseSpecies: "Kyzor",
        forme: "Mega",
        formeLetter: "M",
        types: ["Dragon", "Steel"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 97,
            atk: 150,
            def: 145,
            spa: 102,
            spd: 125,
            spe: 100
        },
        abilities: {
            0: "Technician"
        },
        heightm: 2.6,
        weightkg: 228.5,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    gumanitoos: {
        num: 7500431,
        species: "Gumanitoos",
        types: ["Normal", "Ghost"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        }, // 119	115	100	77	100	67
        baseStats: {
            hp: 119,
            atk: 115,
            def: 100,
            spa: 77,
            spd: 100,
            spe: 67
        },
        abilities: {
            0: "Levi Stakes"
        },
        heightm: 3.8,
        weightkg: 332.1,
        color: "Black",
        eggGroups: ["Undiscovered"],
    },
    xurkino: {
        num: 7500432,
        species: "Xurkino",
        types: ["Electric", "Normal"],
        gender: "N",
        baseStats: {
            hp: 93,
            atk: 74,
            def: 98,
            spa: 116,
            spd: 98,
            spe: 66
        },
        abilities: {
            0: "Hydra"
        },
        heightm: 2.5,
        weightkg: 65.5,
        color: "Black",
		  otherFormes: ["xurkinomega"],
        eggGroups: ["Undiscovered"],
    },
    xurkinomega: {
        num: 7500432,
        species: "Xurkino-Mega",
        baseSpecies: "Xurkino",
        forme: "Mega",
        formeLetter: "M",
        types: ["Electric", "Fairy"],
        gender: "N",
        baseStats: {
            hp: 93,
            atk: 74,
            def: 138,
            spa: 136,
            spd: 138,
            spe: 66
        },
        abilities: {
            0: "Healer"
        },
        heightm: 2.9,
        weightkg: 66.5,
        color: "Black",
        eggGroups: ["Undiscovered"],
    },
    yvelchan: {
        num: 7500433,
        species: "Yvel-Chan",
        types: ["Flying", "Normal"],
        baseStats: {
            hp: 208,
            atk: 68,
            def: 70,
            spa: 83,
            spd: 101,
            spe: 74
        },
        abilities: {
            0: "Dark Aura"
        },
        heightm: 3.5,
        weightkg: 118.8,
        color: "Red",
        eggGroups: ["Undiscovered"],
    },
    heatreon: {
        num: 7500434,
        species: "Heatreon",
        types: ["Steel", "Fairy"],
		  genderRatio: {M: 0.75, F: 0.25},
        baseStats: {
            hp: 100,
            atk: 77,
            def: 100,
            spa: 125,
            spd: 130,
            spe: 69
        },
        abilities: {
            0: "Fire-B-Gone"
        },
        heightm: 1.35,
        weightkg: 226.75,
        color: "Pink",
        eggGroups: ["Undiscovered"],
    },
    altarigarde: {
        num: 7500435,
        species: "Altarigarde",
        types: ["Ground", "Flying"],
        gender: "N",
        baseStats: {
            hp: 91,
            atk: 105,
            def: 105,
            spa: 75,
            spd: 110,
            spe: 97
        },
        abilities: {
            0: "Weather Break"
        },
        heightm: 3.05,
        weightkg: 162.8,
        color: "Green",
		  otherFormes: ["altarigardemega"],
        eggGroups: ["Undiscovered"],
    },
    altarigardemega: {
        num: 7500435,
        species: "Altarigarde-Mega",
        baseSpecies: "Altarigarde",
        forme: "Mega",
        formeLetter: "M",
        types: ["Ground", "Fairy"],
        gender: "N",
        baseStats: {
            hp: 91,
            atk: 145,
            def: 125,
            spa: 115,
            spd: 110,
            spe: 97
        },
        abilities: {
            0: "Pixilate"
        },
        heightm: 3.45,
        weightkg: 162.8,
        color: "Green",
        eggGroups: ["Undiscovered"],
    },
    flycanion: {
        num: 7500436,
        species: "Flycanion",
        types: ["Ground", "Fire"],
        baseStats: {
            hp: 100,
            atk: 105,
            def: 110,
            spa: 105,
            spd: 95,
            spe: 85
        },
        abilities: {
            0: "Mud Absorb"
        },
        heightm: 1.9,
        weightkg: 138.5,
        color: "Red",
        eggGroups: ["Undiscovered"],
    },
    belle: {
        num: 7500437,
        species: "Belle",
        types: ["Steel", "Fairy"],
        genderRatio: {M: 0.25, F: 0.75},
        baseStats: {
            hp: 100,
            atk: 85,
            def: 100,
            spa: 110,
            spd: 110,
            spe: 60
        },
        abilities: {
            0: "Greedy Princess"
        },
        heightm: 5.25,
        weightkg: 519.95,
        color: "Green",
        eggGroups: ["Undiscovered"],
    },
    maui: {
        num: 7500438,
        species: "Maui",
        types: ["Electric", "Poison"],
        genderRatio: {
            M: 0.0,
            F: 0.0
        },
        baseStats: {
            hp: 75,
            atk: 110,
            def: 81,
            spa: 110,
            spd: 80,
            spe: 120
        },
        abilities: {
            0: "Radioactive Surge"
        },
        heightm: 1.55,
        weightkg: 41.25,
        color: "Purple",
        eggGroups: ["Undiscovered"],
    },
    garzone: {
        num: 7500439,
        species: "Garzone",
        types: ["Dragon", "Electric"],
        gender: "N",
        baseStats: {
            hp: 100,
            atk: 110,
            def: 105,
            spa: 115,
            spd: 90,
            spe: 85
        },
        abilities: {
            0: "Laser Beam"
        },
        heightm: 1.55,
        weightkg: 137.5,
        color: "Gray",
		  otherFormes: ["garzonemega"],
        eggGroups: ["Undiscovered"],
    },
	garzonemega: {
        num: 7500439,
        species: "Garzone-Mega",
        baseSpecies: "Garzone",
        gender: "N",
        forme: "Mega",
        formeLetter: "M",
        types: ["Dragon", "Electric"], // 100	150	125	155	100	75
        baseStats: {
            hp: 100,
            atk: 150,
            def: 125,
            spa: 155,
            spd: 100,
            spe: 75
        },
        abilities: {
            0: "Sand Force"
        },
        heightm: 1.55,
        weightkg: 137.5,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    shitpost: {
        num: 7500440,
        species: "Shitpost",
        types: ["Dark", "Steel"],
        baseStats: {
            hp: 113,
            atk: 120,
            def: 81,
            spa: 98,
            spd: 80,
            spe: 70
        },
        abilities: {
            0: "Meme Stealer"
        },
        heightm: 5.3,
        weightkg: 529.8,
        color: "Green",
        eggGroups: ["Undiscovered"],
    },
// Cat Bed: 7500438
	lupuchandel: {
        num: 7500441,
        species: "Lupu Chandel",
        types: ["Fire", "Fairy"],
        baseStats: { // 85	65	120	120	112	82
            hp: 85,
            atk: 65,
            def: 120,
            spa: 120,
            spd: 112,
            spe: 82
        },
        abilities: {
            0: "Beautiful Obliteration Weapon"
        },
        color: "Purple",
        heightm: 1.15,
        weightkg: 27.75,
        eggGroups: ["Undiscovered"],
    },
	 roaramp: {
        num: 7500442,
        species: "Roaramp",
        types: ["Electric", "Dark"],
		  genderRatio: {M: 0.75, F: 0.25},
        baseStats: {
            hp: 102,
            atk: 105,
            def: 97,
            spa: 107,
            spd: 100,
            spe: 67
        },
         abilities: {
				0: "Scarily Adorable"
			},
        color: "Yellow",
        heightm: 1.6,
        weightkg: 72.25,
		  otherFormes: ["roarampmega"],
        eggGroups: ["Field"],
    },
   roarampmega: {
        num: 7500442,
        species: "Roaramp-Mega",
        baseSpecies: "Roaramp",
        forme: "Mega",
        formeLetter: "M",
        genderRatio: {M: 0.75, F: 0.25},
        types: ["Electric", "Dark"], 
        baseStats: {
            hp: 102,
            atk: 125,
            def: 117,
            spa: 157,
            spd: 120,
            spe: 57
        },
         abilities: {
				0: "Mold Breaker"
			},
        color: "Yellow",
        heightm: 1.6,
        weightkg: 72.25,
        eggGroups: ["Field"],
    }, 
arcalie: {
        num: 7500443,
        species: "Arcalie",
        types: ["Fire", "Dark"],
        genderRatio: {M: 0.625, F: 0.375},
        baseStats: {
            hp: 87,
            atk: 109,
            def: 75,
            spa: 104,
            spd: 75,
            spe: 110
        },
         abilities: {0: "Creepy"},
        color: "Purple",
        heightm: 1.5,
        weightkg: 96.25,
        eggGroups: ["Field"],
    },
stakeye: {
        num: 7500444,
        species: "Stakeye",
        types: ["Steel", "Ghost"],
        gender: "N",
        baseStats: {
            hp: 75,
            atk: 123,
            def: 143,
            spa: 59,
            spd: 83,
            spe: 31
        },
         abilities: {0: "Beast Eye"},
        heightm: 3.0,
        weightkg: 415.5,
        color: "Purple",
		  otherFormes: ["stakeyemega"],
        eggGroups: ["Undiscovered"],
    },
    
stakeyemega: {
        num: 7500444,
        species: "Stakeye-Mega",
        baseSpecies: "Stakeye",
        forme: "Mega",
        formeLetter: "M",
        gender: "N",
        types: ["Steel", "Ghost"],
        baseStats: {
            hp: 75,
            atk: 133,
            def: 193,
            spa: 79,
            spd: 133,
            spe: 1
        },
         abilities: {0: "Magic Bounce"},
        heightm: 3.0,
        weightkg: 565.5,
        color: "Purple",
        eggGroups: ["Undiscovered"],
    },
lycanperiordusk: {
        num: 7500445,
        species: "Lycanperior-Dusk",
        types: ["Rock", "Grass"],
        genderRatio: {M: 0.75, F: 0.25},
        baseStats: {
            hp: 85,
            atk: 106,
            def: 90,
            spa: 75,
            spd: 90,
            spe: 121
        },
         abilities: {0: "Lethal Leafage"},
        color: "Green",
        heightm: 2.0,
        weightkg: 44.0,
        eggGroups: ["Field"],
    },
gigafini: {
        num: 7500446,
        species: "Giga Fini",
        types: ["Rock", "Water"],
        gender: "N",
        baseStats: {
            hp: 97,
            atk: 105,
            def: 142,
            spa: 77,
            spd: 105,
            spe: 55
        },
        color: "Purple",
         abilities: {0: "Sandmist Surge"},
        heightm: 1.5,
        weightkg: 140.6,
        eggGroups: ["Undiscovered"],
    },
stalossaka: {
        num: 7500447,
        species: "Stalossaka",
        types: ["Steel", "Ghost"],
        gender: "N",
        baseStats: {
            hp: 83,
            atk: 113,
            def: 160,
            spa: 76,
            spd: 108,
            spe: 24
        },
        heightm: 3.4,
        weightkg: 535,
        color: "Brown",
        abilities: {0: "Compact Boost"},
		eggGroups: ["Undiscovered"],
    },
stakamise: {
        num: 7500448,
        species: "Stakamise",
        types: ["Steel", "Grass"],
        baseStats: {
            hp: 85,
            atk: 136,
            def: 155,
            spa: 69,
            spd: 110,
            spe: 26
        },
        heightm: 4.7,
        weightkg: 515,
        color: "Green",
        abilities: {0: "Metal Monster"},
		eggGroups: ["Undiscovered"],
    },
	deoxysconfused: {
		num: 386,
		species: "Deoxys-Confused",
		baseSpecies: "Deoxys",
		forme: "Really Confused",
		formeLetter: "C",
		types: ["Psychic"],
		gender: "N",
		baseStats: {hp: 75, atk: 130, def: 105, spa: 130, spd: 105, spe: 125},
		abilities: {0: "Pressure"},
		heightm: 1.7,
		weightkg: 60.8,
		color: "Red",
		eggGroups: ["Undiscovered"],
	},
auroritar: {
        num: 7500450,
        species: "Auroritar",
        types: ["Rock"],
        genderRatio: {M: 0.75, F: 0.25},
        baseStats: {
            hp: 121,
            atk: 115,
            def: 101,
            spa: 107,
            spd: 106,
            spe: 69
        },
		  heightm: 2.35,
		  weightkg: 213.5,
        color: "Blue",
        abilities: {0: "Meteor Shower"},
		  otherFormes: ["auroritarmega"],
		  eggGroups: ["Monster"],
    },
auroritarmega: {
        num: 7500450,
        species: "Auroritar-Mega",
        baseSpecies: "Auroritar",
        forme: "Mega",
        formeLetter: "M",
        types: ["Rock"],
        genderRatio: {M: 0.75, F: 0.25},
        baseStats: {
            hp: 121,
            atk: 145,
            def: 141,
            spa: 107,
            spd: 106,
            spe: 69
        },
        color: "Blue",
		  heightm: 2.85,
		  weightkg: 266.5,
        abilities: {0: "Sand Stream"},
		  eggGroups: ["Monster"],
    }, 
 necrynx: {
		num: 7500451,
		species: "Necrynx",
	   baseForme: "Cute Wig",
		types: ["Ice", "Psychic"],
		gender: "F",
		baseStats: {
			hp: 90,
			atk: 81,
			def: 72,
			spa: 155,
			spd: 111,
			spe: 98
		},
		abilities: {
			0: "Prism Skin"
		},
        color: "Blue",
		  heightm: 2.8,
		  weightkg: 195.3,
		  eggGroups: ["Undiscovered"],
	},
	necrynxultra: {
		num: 7500451,
		species: "Necrynx-Ultra",
		baseSpecies: "Necrynx",
		forme: "Ultra",
		formeLetter: "U",
		types: ["Ice", "Dragon"],
		gender: "F",
		baseStats: { // 90  165 81  165 81  150
			hp: 90,
			atk: 165,
			def: 81,
			spa: 165,
			spd: 81,
			spe: 150,
		},
		abilities: {
			0: "Neuroforce"
		},
        color: "Yellow",
		  heightm: 6.1,
		  weightkg: 75.3,
		  eggGroups: ["Undiscovered"],
	},
	hippally: {
		num: 7500452,
		species: "Hippally",
		types: ["Ground", "Normal"],
		gender: "N",
		baseStats: {
			hp: 101,
			atk: 123,
			def: 106,
			spa: 81,
			spd: 103,
			spe: 71,
		},
		abilities: {
			0: "Effect Setter"
		},
        color: "Gray",
		  heightm: 2.15,
		  weightkg: 200.25,
		  eggGroups: ["Undiscovered"],
	},
	hippallyfire: {
		num: 7500452,
		species: "Hippally-Fire",
		baseSpecies: "Hippally",
		forme: "Fire",
		formeLetter: "F",
		types: ["Ground", "Fire"],
		gender: "N",
		baseStats: {
			hp: 101,
			atk: 123,
			def: 106,
			spa: 81,
			spd: 103,
			spe: 71
		},
		abilities: {
			0: "Effect Setter"
		},
        color: "Gray",
		  heightm: 2.15,
		  weightkg: 200.25,
		  eggGroups: ["Undiscovered"],
	},
	hippallywater: {
		num: 7500452,
		species: "Hippally-Water",
		baseSpecies: "Hippally",
		forme: "Water",
		formeLetter: "W",
		types: ["Ground", "Water"],
		gender: "N",
		baseStats: {
			hp: 101,
			atk: 123,
			def: 106,
			spa: 81,
			spd: 103,
			spe: 71
		},
		abilities: {
			0: "Effect Setter"
		},
        color: "Gray",
		  heightm: 2.15,
		  weightkg: 200.25,
		  eggGroups: ["Undiscovered"],
	},
	hippallyelectric: {
		num: 7500452,
		species: "Hippally-Electric",
		baseSpecies: "Hippally",
		forme: "Electric",
		formeLetter: "E",
		types: ["Ground", "Electric"],
		gender: "N",
		baseStats: {
			hp: 101,
			atk: 123,
			def: 106,
			spa: 81,
			spd: 103,
			spe: 71
		},
		abilities: {
			0: "Effect Setter"
		},
        color: "Gray",
		  heightm: 2.15,
		  weightkg: 200.25,
		  eggGroups: ["Undiscovered"],
	},
	hippallygrass: {
		num: 7500452,
		species: "Hippally-Grass",
		baseSpecies: "Hippally",
		forme: "Grass",
		formeLetter: "G",
		types: ["Ground", "Grass"],
		gender: "N",
		baseStats: {
			hp: 101,
			atk: 123,
			def: 106,
			spa: 81,
			spd: 103,
			spe: 71
		},
		abilities: {
			0: "Effect Setter"
		},
        color: "Gray",
		  heightm: 2.15,
		  weightkg: 200.25,
		  eggGroups: ["Undiscovered"],
	},
	hippallyice: {
		num: 7500452,
		species: "Hippally-Ice",
		baseSpecies: "Hippally",
		forme: "Ice",
		formeLetter: "I",
		types: ["Ground", "Ice"],
		gender: "N",
		baseStats: {
			hp: 101,
			atk: 123,
			def: 106,
			spa: 81,
			spd: 103,
			spe: 71
		},
		abilities: {
			0: "Effect Setter"
		},
        color: "Gray",
		  heightm: 2.15,
		  weightkg: 200.25,
		  eggGroups: ["Undiscovered"],
	},
	hippallyfighting: {
		num: 7500452,
		species: "Hippally-Fighting",
		baseSpecies: "Hippally",
		forme: "Fighting",
		formeLetter: "F",
		types: ["Ground", "Fighting"],
		gender: "N",
		baseStats: {
			hp: 101,
			atk: 123,
			def: 106,
			spa: 81,
			spd: 103,
			spe: 71
		},
		abilities: {
			0: "Effect Setter"
		},
        color: "Gray",
		  heightm: 2.15,
		  weightkg: 200.25,
		  eggGroups: ["Undiscovered"],
	},
	hippallyground: {
		num: 7500452,
		species: "Hippally-Ground",
		baseSpecies: "Hippally",
		forme: "Fighting",
		formeLetter: "F",
		types: ["Ground"],
		gender: "N",
		baseStats: {
			hp: 101,
			atk: 123,
			def: 106,
			spa: 81,
			spd: 103,
			spe: 71
		},
		abilities: {
			0: "Effect Setter"
		},
        color: "Gray",
		  heightm: 2.15,
		  weightkg: 200.25,
		  eggGroups: ["Undiscovered"],
	},
	hippallypoison: {
		num: 7500452,
		species: "Hippally-Poison",
		baseSpecies: "Hippally",
		forme: "Poison",
		formeLetter: "P",
		types: ["Ground", "Poison"],
		gender: "N",
		baseStats: {
			hp: 101,
			atk: 123,
			def: 106,
			spa: 81,
			spd: 103,
			spe: 71
		},
		abilities: {
			0: "Effect Setter"
		},
        color: "Gray",
		  heightm: 2.15,
		  weightkg: 200.25,
		  eggGroups: ["Undiscovered"],
	},
	hippallyflying: {
		num: 7500452,
		species: "Hippally-Flying",
		baseSpecies: "Hippally",
		forme: "Flying",
		formeLetter: "F",
		types: ["Ground", "Flying"],
		gender: "N",
		baseStats: {
			hp: 101,
			atk: 123,
			def: 106,
			spa: 81,
			spd: 103,
			spe: 71
		},
		abilities: {
			0: "Effect Setter"
		},
        color: "Gray",
		  heightm: 2.15,
		  weightkg: 200.25,
		  eggGroups: ["Undiscovered"],
	},
	hippallypsychic: {
		num: 7500452,
		species: "Hippally-Psychic",
		baseSpecies: "Hippally",
		forme: "Psychic",
		formeLetter: "P",
		types: ["Ground", "Psychic"],
		gender: "N",
		baseStats: {
			hp: 101,
			atk: 123,
			def: 106,
			spa: 81,
			spd: 103,
			spe: 71
		},
		abilities: {
			0: "Effect Setter"
		},
        color: "Gray",
		  heightm: 2.15,
		  weightkg: 200.25,
		  eggGroups: ["Undiscovered"],
	},
	hippallybug: {
		num: 7500452,
		species: "Hippally-Bug",
		baseSpecies: "Hippally",
		forme: "Bug",
		formeLetter: "B",
		types: ["Ground", "Bug"],
		gender: "N",
		baseStats: {
			hp: 101,
			atk: 123,
			def: 106,
			spa: 81,
			spd: 103,
			spe: 71
		},
		abilities: {
			0: "Effect Setter"
		},
        color: "Gray",
		  heightm: 2.15,
		  weightkg: 200.25,
		  eggGroups: ["Undiscovered"],
	},
	hippallyrock: {
		num: 7500452,
		species: "Hippally-Rock",
		baseSpecies: "Hippally",
		forme: "Rock",
		formeLetter: "R",
		types: ["Ground", "Rock"],
		gender: "N",
		baseStats: {
			hp: 101,
			atk: 123,
			def: 106,
			spa: 81,
			spd: 103,
			spe: 71
		},
		abilities: {
			0: "Effect Setter"
		},
        color: "Gray",
		  heightm: 2.15,
		  weightkg: 200.25,
		  eggGroups: ["Undiscovered"],
	},
	hippallyghost: {
		num: 7500452,
		species: "Hippally-Ghost",
		baseSpecies: "Hippally",
		forme: "Ghost",
		formeLetter: "G",
		types: ["Ground", "Ghost"],
		gender: "N",
		baseStats: {
			hp: 101,
			atk: 123,
			def: 106,
			spa: 81,
			spd: 103,
			spe: 71
		},
		abilities: {
			0: "Effect Setter"
		},
        color: "Gray",
		  heightm: 2.15,
		  weightkg: 200.25,
		  eggGroups: ["Undiscovered"],
	},
	hippallydragon: {
		num: 7500452,
		species: "Hippally-Dragon",
		baseSpecies: "Hippally",
		forme: "Dragon",
		formeLetter: "D",
		types: ["Ground", "Dragon"],
		gender: "N",
		baseStats: {
			hp: 101,
			atk: 123,
			def: 106,
			spa: 81,
			spd: 103,
			spe: 71
		},
		abilities: {
			0: "Effect Setter"
		},
        color: "Gray",
		  heightm: 2.15,
		  weightkg: 200.25,
		  eggGroups: ["Undiscovered"],
	},
	hippallydark: {
		num: 7500452,
		species: "Hippally-Dark",
		baseSpecies: "Hippally",
		forme: "Dark",
		formeLetter: "D",
		types: ["Ground", "Dark"],
		gender: "N",
		baseStats: {
			hp: 101,
			atk: 123,
			def: 106,
			spa: 81,
			spd: 103,
			spe: 71
		},
		abilities: {
			0: "Effect Setter"
		},
        color: "Gray",
		  heightm: 2.15,
		  weightkg: 200.25,
		  eggGroups: ["Undiscovered"],
	},
	hippallysteel: {
		num: 7500452,
		species: "Hippally-Psychic",
		baseSpecies: "Hippally",
		forme: "Psychic",
		formeLetter: "P",
		types: ["Ground", "Psychic"],
		gender: "N",
		baseStats: {
			hp: 101,
			atk: 123,
			def: 106,
			spa: 81,
			spd: 103,
			spe: 71
		},
		abilities: {
			0: "Effect Setter"
		},
        color: "Gray",
		  heightm: 2.15,
		  weightkg: 200.25,
		  eggGroups: ["Undiscovered"],
	},
	hippallyfairy: {
		num: 7500452,
		species: "Hippally-Fairy",
		baseSpecies: "Hippally",
		forme: "Fairy",
		formeLetter: "F",
		types: ["Ground", "Fairy"],
		gender: "N",
		baseStats: {
			hp: 101,
			atk: 123,
			def: 106,
			spa: 81,
			spd: 103,
			spe: 71
		},
		abilities: {
			0: "Effect Setter"
		},
        color: "Gray",
		  heightm: 2.15,
		  weightkg: 200.25,
		  eggGroups: ["Undiscovered"],
	},
	necroqua: {
		num: 7500453,
		species: "Necroqua",
	   baseForme: "Dusk Bubble",
		types: ["Steel", "Water"],
		gender: "N",
		baseStats: {
			hp: 102,
			atk: 120,
			def: 109,
			spa: 81,
			spd: 125,
			spe: 69
		},
		abilities: {
			0: "Dark Matter"
		},
        color: "Green",
		  heightm: 2.6,
		  weightkg: 271,
		  eggGroups: ["Undiscovered"],
	},
	necroquaultra: {
		num: 7500453,
		species: "Necroqua-Ultra",
		baseSpecies: "Necroqua",
		forme: "Ultra",
		formeLetter: "U",
		types: ["Steel", "Dragon"],
		gender: "N",
		baseStats: {
			hp: 102,
			atk: 130,
			def: 95,
			spa: 130,
			spd: 95,
			spe: 121,
		},
		abilities: {
			0: "Neuroforce"
		},
        color: "Yellow",
		  heightm: 6.7,
		  weightkg: 41,
		  eggGroups: ["Undiscovered"],
	},
	poize: {
		num: 7500454,
		species: "Poize",
		types: ["Electric", "Poison"],
		gender: "N",
		baseStats: {
			hp: 83,
			atk: 111,
			def: 93,
			spa: 116,
			spd: 83,
			spe: 101
		},
		abilities: {
			0: "Terabeast"
		},
        color: "Purple",
		  heightm: 1.75,
		  weightkg: 173.4,
		  eggGroups: ["Undiscovered"],
	},
	magnettanorth: {
		num: 7500455,
		species: "Magnetta",
	   baseForme: "North",
		types: ["Steel", "Psychic"],
		gender: "N",
		baseStats: {
			hp: 85,
			atk: 75,
			def: 96,
			spa: 145,
			spd: 118,
			spe: 90,
		},
		abilities: {
			0: "Graceful Analyst"
		},
        color: "Gray",
		  heightm: 0.9,
		  weightkg: 93.25,
		  eggGroups: ["Undiscovered"],
	},
	magnettasouth: {
		num: 7500455,
		species: "Magnetta-South",
		baseSpecies: "Magnetta",
		forme: "South",
		formeLetter: "S",
		types: ["Steel", "Fighting"],
		gender: "N",
		baseStats: {
			hp: 85,
			atk: 145,
			def: 90,
			spa: 73,
			spd: 96,
			spe: 118,
		},
		abilities: {
			0: "Graceful Analyst"
		},
        color: "Gray",
		  heightm: 0.9,
		  weightkg: 93.25,
		  eggGroups: ["Undiscovered"],
	},
	kromork: {
		num: 7500456,
		species: "Kromork",
		types: ["Electric", "Ground"],
		baseStats: {
			hp: 80,
			atk: 115,
			def: 115,
			spa: 101,
			spd: 101,
			spe: 80,
		},
		abilities: {
			0: "Tera Armor"
		},
        color: "Brown",
		  heightm: 1.95,
		  weightkg: 195,
		  eggGroups: ["Undiscovered"],
	},
	watafak: {
		num: 7500457,
		species: "Watafak",
		types: ["Steel", "Psychic"],
		gender: "N",
		baseStats: {
			hp: 145,
			atk: 102,
			def: 134,
			spa: 43,
			spd: 79,
			spe: 23
		},
		abilities: {
			0: "Sadistic"
		},
        color: "Blue",
		  heightm: 3.4,
		  weightkg: 424.25,
		  eggGroups: ["Undiscovered"],
	},
	necrozerain: {
		num: 7500458,
		species: "Necrozerain",
	   baseForme: "Dawn Disguise",
		types: ["Bug", "Ghost"],
		baseStats: { // 83  86  85  148 104 98
			hp: 83,
			atk: 86,
			def: 85,
			spa: 148,
			spd: 104,
			spe: 98,
		},
		abilities: {
			0: "Fearmonger"
		},
        color: "Blue",
		  heightm: 2.5,
		  weightkg: 176.8,
		  eggGroups: ["Undiscovered"],
	},
	necrozrainultra: {
		num: 7500458,
		species: "Necrozerain-Ultra",
		baseSpecies: "Necrozerain",
		forme: "Ultra",
		formeLetter: "U",
		types: ["Bug", "Dragon"],
		baseStats: { //83  158 74  158 74  150 697
			hp: 83,
			atk: 158,
			def: 74,
			spa: 158,
			spd: 74,
			spe: 150,
		},
		abilities: {
			0: "Neuroforce"
		},
        color: "Yellow",
		  heightm: 5.8,
		  weightkg: 56.8,
		  eggGroups: ["Undiscovered"],
	},
	quagsirom: {
		num: 7500459,
		species: "Quagsirom",
		types: ["Water", "Electric"],
		baseStats: { // 117 117 102 92  102 62  592
			hp: 117,
			atk: 117,
			def: 102,
			spa: 92,
			spd: 102,
			spe: 62,
		},
		abilities: {
			0: "Unamazed"
		},
        color: "Black",
		  heightm: 2.15,
		  weightkg: 210,
		  eggGroups: ["Undiscovered"],
	},
	bunny: {
		num: 7500460,
		species: "Bunny",
		types: ["Dragon", "Normal"],
		gender: "N",
		baseStats: {
			hp: 70,
			atk: 85,
			def: 70,
			spa: 60,
			spd: 70,
			spe: 101,
		},
		abilities: {
			0: "What Does This Do?"
		},
        color: "Brown",
		  heightm: 0.8,
		  weightkg: 19.5,
		  eggGroups: ["Undiscovered"],
		dexentry: "This fusion seems to be made of thousands of cells of other pokémon. It is a higly mutable and unstable species. A notable ability it has is being able to utilize every Mega Ston7, resulting in a lot of different forms it can transform into. This is most likely due to the aforementioned different cells that form it. A single cell is known as a Rabbit Core. It is speculated that the Rabbit Cores can absorb DNA from multiple Pokémon before uniting into Bunny, which would then explain species-specific items being abe to interact with Bunny. Not much research has been don7, however the species with the closest to a pure DNA seems to share some relation with Buneary.",
	},
	kingrat: {
		num: 7500461,
		species: "King Rat",
		types: ["Normal"],
		baseStats: {
			hp: 113,
			atk: 131,
			def: 90,
			spa: 83,
			spd: 78,
			spe: 109,
		},
		abilities: {
			0: "Power Saver"
		},
        color: "Brown",
		  heightm: 1.35,
		  weightkg: 74.5,
		  eggGroups: ["Field"],
	},
	gamera: {
		num: 7500462,
		species: "Gamera",
		types: ["Water", "Dark"],
      genderRatio: {M: 0.75, F: 0.25},
		baseStats: {
			hp: 99,
			atk: 118,
			def: 115,
			spa: 100,
			spd: 112,
			spe: 79,
		},
		abilities: {
			0: "Underwater Screen"
		},
        color: "Blue",
		  heightm: 1.8,
		  weightkg: 143.75,
		  otherFormes: ["gameramegax", "gameramegay"],
		  eggGroups: ["Monster"],
	},
	gameramegax: {
		num: 7500462,
		species: "Gamera-Mega-X",
		baseSpecies: "Gamera",
		forme: "Mega",
		formeLetter: "M",
		types: ["Water", "Dark"],
      genderRatio: {M: 0.75, F: 0.25},
		baseStats: {
			hp: 99,
			atk: 148,
			def: 155,
			spa: 100,
			spd: 132,
			spe: 89,
		},
		abilities: {
			0: "Sand Stream"
		},
        color: "Blue",
		  heightm: 2.3,
		  weightkg: 196.75,
		  eggGroups: ["Monster"],
	},
	gameramegay: {
		num: 7500462,
		species: "Gamera-Mega-Y",
		baseSpecies: "Gamera",
		forme: "Mega",
		formeLetter: "M",
		types: ["Water", "Dark"],
      genderRatio: {M: 0.75, F: 0.25},
		baseStats: {
			hp: 99,
			atk: 138,
			def: 135,
			spa: 150,
			spd: 122,
			spe: 79,
		},
		abilities: {
			0: "Mega Launcher"
		},
        color: "Blue",
		  heightm: 1.8,
		  weightkg: 159.35,
		  eggGroups: ["Monster"],
	},
	sandslashprime: {
		num: 28,
		species: "Sandslash-Prime",
		baseSpecies: "Sandslash",
		forme: "Prime",
		formeLetter: "P",
		types: ["Ground", "Ice"],
		baseStats: {
			hp: 85,
			atk: 110,
			def: 125,
			spa: 45,
			spd: 70,
			spe: 75,
		},
		abilities: {
			0: "Mountain Climber"
		},
        color: "Brown",
		  heightm: 1.1,
		  weightkg: 42.25,
		  eggGroups: ["Field"],
	},
	suiceon: {
		num: 7500464,
		species: "Suiceon",
		types: ["Water"],
		gender: "N",
		baseStats: {
			hp: 125,
			atk: 75,
			def: 94,
			spa: 100,
			spd: 112,
			spe: 86,
		},
		abilities: {
			0: "Monarch of the Rain"
		},
        color: "Blue",
		  heightm: 1.5,
		  weightkg: 108,
		  eggGroups: ["Undiscovered"],
	},
	raikeon: {
		num: 7500465,
		species: "Raikeon",
		types: ["Electric"],
		gender: "N",
		baseStats: {
			hp: 93,
			atk: 85,
			def: 75,
			spa: 112,
			spd: 100,
			spe: 125,
		},
		abilities: {
			0: "Duke of the Lightning"
		},
        color: "Yellow",
		  heightm: 1.35,
		  weightkg: 101.25,
		  eggGroups: ["Undiscovered"],
	},
	enteon: {
		num: 7500466,
		species: "Enteon",
		types: ["Fire"],
		gender: "N",
		baseStats: {
			hp: 93,
			atk: 125,
			def: 75,
			spa: 100,
			spd: 112,
			spe: 85,
		},
		abilities: {
			0: "Emperor of the Fire"
		},
        color: "Red",
		  heightm: 1.5,
		  weightkg: 111.5,
		  eggGroups: ["Undiscovered"],
	},
	gloom: {
		num: 44,
		species: "Gloom",
		types: ["Grass", "Poison"],
		baseStats: {hp: 60, atk: 65, def: 70, spa: 85, spd: 75, spe: 40},
		abilities: {0: "Chlorophyll", H: "Stench"},
		heightm: 0.8,
		weightkg: 8.6,
		color: "Blue",
		prevo: "oddish",
		evos: ["vileplume", "bellossom", "vilossom"],
		evoLevel: 21,
		eggGroups: ["Grass"],
	},
	vilossom: {
		num: 7500467,
		species: "Vilossom",
		types: ["Poison", "Grass"],
		baseStats: {
			hp: 90,
			atk: 95,
			def: 105,
			spa: 115,
			spd: 110,
			spe: 65,
		},
		abilities: {
			0: "Chlorophyll"
		},
        color: "Green",
		prevo: "gloom",
		evoLevel: 21,
		  heightm: 0.8,
		  weightkg: 12.2,
		  eggGroups: ["Grass"],
	},
	gholemisealola: {
		num: 7500468,
		species: "Gholemise-Alola",
		types: ["Electric", "Grass"],
		baseStats: {
			hp: 85,
			atk: 135,
			def: 125,
			spa: 70,
			spd: 87,
			spe: 42,
		},
		abilities: {
			0: "Overloaded Helm"
		},
        color: "Gray",
		  heightm: 2.8,
		  weightkg: 263,
		  eggGroups: ["Mineral"],
	},
	tallsteelegg: {
		num: 7500469,
		species: "Tall Steel Egg",
		types: ["Dragon", "Steel"],
		gender: "N",
		baseStats: {
			hp: 106,
			atk: 103,
			def: 104,
			spa: 116,
			spd: 108,
			spe: 53,
		},
		abilities: {
			0: "Farmer's Delight"
		},
        color: "Green",
		  heightm: 10.05,
		  weightkg: 707.75,
		  eggGroups: ["Undiscovered"],
	},
	zerpuff: {
		num: 7500470,
		species: "Zerpuff",
		types: ["Electric", "Fairy"],
		baseStats: {
			hp: 85,
			atk: 116,
			def: 80,
			spa: 93,
			spd: 77,
			spe: 127,
		},
		abilities: {
			0: "Lightening Lightning"
		},
        color: "Pink",
		  heightm: 1.15,
		  weightkg: 24.75,
		  eggGroups: ["Undiscovered"],
	},
	lycakingdusk: {
		num: 7500471,
		species: "Lycaking-Dusk",
		types: ["Rock", "Ground"],
		gender: "M",
		baseStats: {
			hp: 88,
			atk: 119,
			def: 81,
			spa: 80,
			spd: 80,
			spe: 107,
		},
		abilities: {
			0: "Unrivaled Claws"
		},
        color: "Purple",
		  heightm: 1.15,
		  weightkg: 24.75,
		  eggGroups: ["Field"],
	},
	tornadelnaga: {
		num: 7500472,
		species: "Tornadel-Naga",
		types: ["Flying", "Poison"],
		gender: "N",
		baseStats: {
			hp: 83,
			atk: 89,
			def: 79,
			spa: 127,
			spd: 83,
			spe: 127,
		},
		abilities: {
			0: "Ouroboros"
		},
        color: "Green",
		  heightm: 2.5,
		  weightkg: 106.5,
		  eggGroups: ["Undiscovered"],
	},
	necropurugly: {
		num: 7500473,
		species: "Necropur",
	   baseForme: "Ugly",
		types: ["Steel", "Normal"],
		baseStats: {
			hp: 84,
			atk: 139,
			def: 109,
			spa: 88,
			spd: 84,
			spe: 100,
		},
		abilities: {
			0: "Braveheart"
		},
        color: "Yellow",
		  heightm: 2.6,
		  weightkg: 196.9,
		  eggGroups: ["Undiscovered"],
	},
	necropurbeautiful: {
		num: 7500473,
		species: "Necropur-Beautiful",
		baseSpecies: "Necropur",
		forme: "Beautiful",
		formeLetter: "B",
		types: ["Steel", "Dragon"],
		baseStats: {
			hp: 84,
			atk: 149,
			def: 79,
			spa: 149,
			spd: 79,
			spe: 152,
		},
		abilities: {
			0: "Neuroforce"
		},
        color: "Yellow",
		  heightm: 5.9,
		  weightkg: 26.9,
		  eggGroups: ["Undiscovered"],
	},
	flyorusguard: {
		num: 7500474,
		species: "Flyorus Guard",
		types: ["Ground", "Dragon"],
		gender: "M",
		baseStats: {
			hp: 84,
			atk: 122,
			def: 105,
			spa: 92,
			spd: 80,
			spe: 115,
		},
		abilities: {
			0: "Guard's Shield"
		},
        color: "Brown",
		  heightm: 1.65,
		  weightkg: 75,
		  eggGroups: ["Undiscovered"],
	},
	lampara: {
		num: 7500475,
		species: "Lampara",
		baseForme: "De-Noche",
		types: ["Water", "Psychic"],
		baseStats: {
			hp: 113,
			atk: 89,
			def: 103,
			spa: 119,
			spd: 113,
			spe: 73,
		},
		abilities: {
			0: "Dark Light"
		},
        color: "Blue",
		  heightm: 2.7,
		  weightkg: 186.25,
		  eggGroups: ["Undiscovered"],
	},
	lamparadelava: {
		num: 7500475,
		species: "Lampara-De-Lava",
		baseSpecies: "Lampara",
		forme: "De-Lava",
		formeLetter: "L",
		types: ["Water", "Dragon"],
		baseStats: {
			hp: 113,
			atk: 129,
			def: 83,
			spa: 129,
			spd: 83,
			spe: 125
		},
		abilities: {
			0: "Neuroforce"
		},
        color: "Yellow",
		  heightm: 6,
		  weightkg: 66.25,
		  eggGroups: ["Undiscovered"],
	},
	balloon: {
		num: 7500476,
		species: "Balloon",
		types: ["Ghost", "Fire"],
		gender: "N",
		baseStats: {
			hp: 101,
			atk: 103,
			def: 68,
			spa: 120,
			spd: 66,
			spe: 113,
		},
		abilities: {
			0: "Inflate"
		},
        color: "Purple",
		  heightm: 1.5,
		  weightkg: 14,
		  eggGroups: ["Undiscovered"],
	},
	tyrannosaurus: {
		num: 7500477,
		species: "Tyrannosaurus",
		types: ["Grass", "Rock"],
      genderRatio: {M: 0.75, F: 0.25},
		baseStats: {
			hp: 100,
			atk: 118,
			def: 106,
			spa: 107,
			spd: 110,
			spe: 80,
		},
		abilities: {
			0: "Ancient Foliage"
		},
        color: "Green",
		  heightm: 2,
		  weightkg: 151,
		  otherFormes: ["tyrannosaurusmegax", "tyrannosaurusmegay"],
		  eggGroups: ["Monster"],
	},
	tyrannosaurusmegax: {
		num: 7500477,
		species: "Tyrannosaurus-Mega-X",
		baseSpecies: "Tyrannosaurus",
		forme: "Mega",
		formeLetter: "M",
		types: ["Grass", "Rock"],
      genderRatio: {M: 0.75, F: 0.25},
		baseStats: {
			hp: 100,
			atk: 138,
			def: 146,
			spa: 127,
			spd: 130,
			spe: 80
		},
		abilities: {
			0: "Thick Fat"
		},
        color: "Green",
		  heightm: 2.4,
		  weightkg: 206.5,
		  eggGroups: ["Monster"],
	},
	tyrannosaurusmegay: {
		num: 7500477,
		species: "Tyrannosaurus-Mega-Y",
		baseSpecies: "Tyrannosaurus",
		forme: "Mega",
		formeLetter: "M",
		types: ["Grass", "Rock"],
      genderRatio: {M: 0.75, F: 0.25},
		baseStats: {
			hp: 100,
			atk: 148,
			def: 146,
			spa: 107,
			spd: 130,
			spe: 90,
		},
		abilities: {
			0: "Sand Stream"
		},
        color: "Green",
		  heightm: 2.5,
		  weightkg: 204,
		  eggGroups: ["Monster"],
	},
	espord: {
		num: 7500478,
		species: "Espord",
		types: ["Psychic", "Water"],
      genderRatio: {M: 0.75, F: 0.25},
		baseStats: {
			hp: 127,
			atk: 87,
			def: 62,
			spa: 120,
			spd: 80,
			spe: 95,
		},
		abilities: {
			0: "Synchro Veil"
		},
        color: "Blue",
		  heightm: 7.7,
		  weightkg: 212.25,
		  prevo: "wailee",
		  evoLevel: 40,
		  eggGroups: ["Field"],
	},
	glacord: {
		num: 7500479,
		species: "Glacord",
		types: ["Ice", "Water"],
      genderRatio: {M: 0.75, F: 0.25},
		baseStats: {
			hp: 127,
			atk: 85,
			def: 87,
			spa: 120,
			spd: 80,
			spe: 72,
		},
		abilities: {
			0: "Hail Veil"
		},
        color: "Blue",
		  heightm: 7.65,
		  weightkg: 209.25,
		  prevo: "wailee",
		  evoLevel: 40,
		  eggGroups: ["Field"],
	},
	hypango: {
		num: 7500480,
		species: "Hypango",
		types: ["Psychic", "Fighting"],
		baseStats: {
			hp: 100,
			atk: 108,
			def: 84,
			spa: 81,
			spd: 103,
			spe: 72,
		},
		abilities: {
			0: "Sensei"
		},
        color: "Yellow",
		  heightm: 1.85,
		  weightkg: 105.8,
		  eggGroups: ["Human-Like"],
	},
	scizion: {
		num: 7500481,
		species: "Scizion",
		types: ["Bug", "Poison"],
		baseStats: {
			hp: 80,
			atk: 120,
			def: 115,
			spa: 67,
			spd: 87,
			spe: 90
		},
		abilities: {
			0: "Prodigy"
		},
        color: "Red",
		  heightm: 1.55,
		  weightkg: 89.75,
		  otherFormes: ["scizionmega"],
		  eggGroups: ["Bug"],
	},
	scizionmega: {
		num: 7500481,
		species: "Scizion-Mega",
		baseSpecies: "Scizion",
		forme: "Mega",
		formeLetter: "M",
		types: ["Bug", "Poison"],
		baseStats: {
			hp: 80,
			atk: 140,
			def: 155,
			spa: 77,
			spd: 107,
			spe: 100,
		},
		abilities: {
			0: "Technician"
		},
        color: "Red",
		  heightm: 1.75,
		  weightkg: 96.75,
		  eggGroups: ["Bug"],
	},
	fluorine: {
		num: 7500482,
		species: "Fluorine",
		types: ["Fairy", "Normal"],
		gender: "F",
		baseStats: {
			hp: 100,
			atk: 72,
			def: 87,
			spa: 96,
			spd: 130,
			spe: 72,
		},
		abilities: {
			0: "Titanium Toothpaste"
		},
        color: "Pink",
		  heightm: 1.1,
		  weightkg: 20.5,
		  otherFormes: ["fluorinemega"],
		  eggGroups: ["Fairy"],
	},
	fluorinemega: {
		num: 7500482,
		species: "Fluorine-Mega",
		baseSpecies: "Fluorine",
		forme: "Mega",
		formeLetter: "M",
		types: ["Fairy"],
		gender: "F",
		baseStats: {
			hp: 100,
			atk: 72,
			def: 127,
			spa: 116,
			spd: 170,
			spe: 72,
		},
		abilities: {
			0: "Healer"
		},
        color: "White",
		  heightm: 1.5,
		  weightkg: 21.5,
		  eggGroups: ["Fairy"],
	},
	wallray: {
		num: 7500483,
		species: "Wallray",
		types: ["Ice", "Electric"],
		baseStats: {
			hp: 105,
			atk: 110,
			def: 94,
			spa: 105,
			spd: 94,
			spe: 77,
		},
		abilities: {
			0: "Too Thick"
		},
        color: "Blue",
		  heightm: 1.4,
		  weightkg: 96.3,
		  eggGroups: ["Field"],
	},
	persianprime: {
		num: 53,
		species: "Persian-Prime",
		baseSpecies: "Persian",
		forme: "Prime",
		formeLetter: "P",
		types: ["Normal", "Dark"],
		baseStats: {
			hp: 75,
			atk: 75,
			def: 70,
			spa: 80,
			spd: 75,
			spe: 125,
		},
		abilities: {
			0: "Tech Fur"
		},
        color: "Gray",
		  heightm: 1.05,
		  weightkg: 33.5,
		  eggGroups: ["Field"],
	},
	octapex: {
		num: 7500485,
		species: "Octapex",
		types: ["Water", "Poison"],
		baseStats: {
			hp: 72,
			atk: 94,
			def: 123,
			spa: 89,
			spd: 118,
			spe: 50,
		},
		abilities: {
			0: "Veteran"
		},
        color: "Blue",
		  heightm: 0.8,
		  weightkg: 21.5,
		  eggGroups: ["Water 1"],
	},
	gooo: {
		num: 7500486,
		species: "Goo-o",
		types: ["Dragon"],
		baseStats: {
			hp: 92,
			atk: 115,
			def: 107,
			spa: 115,
			spd: 137,
			spe: 92
		},
		abilities: {
			0: "Sound Soul"
		},
        color: "Gray",
		  heightm: 1.8,
		  weightkg: 114.35,
		  eggGroups: ["Dragon"],
	},
	noivian: {
		num: 7500487,
		species: "Noivian",
		types: ["Flying", "Dragon"],
		baseStats: {
			hp: 90,
			atk: 80,
			def: 95,
			spa: 90,
			spd: 102,
			spe: 120,
		},
		abilities: {
			0: "Phase Through"
		},
        color: "Blue",
		  heightm: 1.3,
		  weightkg: 52.8,
		  otherFormes: ["noivianmega"],
		  eggGroups: ["Flying", "Dragon"],
	},
	noivianmega: {
		num: 7500487,
		species: "Noivian-Mega",
		baseSpecies: "Noivian",
		forme: "Mega",
		formeLetter: "M",
		types: ["Flying", "Fairy"],
		baseStats: {
			hp: 90,
			atk: 120,
			def: 115,
			spa: 130,
			spd: 102,
			spe: 120,
		},
		abilities: {
			0: "Pixilate"
		},
        color: "Blue",
		  heightm: 1.7,
		  weightkg: 52.8,
		  eggGroups: ["Flying", "Dragon"],
	},
	cruski: {
		num: 7500488,
		species: "Cruski",
		types: ["Steel", "Bug"],
		baseStats: {
			hp: 73,
			atk: 102,
			def: 118,
			spa: 82,
			spd: 91,
			spe: 70,
		},
		abilities: {
			0: "Locked Shell"
		},
        color: "Gray",
		  heightm: 0.8,
		  weightkg: 101.5,
		  eggGroups: ["Mineral"],
	},
	periurora: {
		num: 7500489,
		species: "Periurora",
		types: ["Ice", "Rock"],
      genderRatio: {M: 0.75, F: 0.25},
		baseStats: {
			hp: 129,
			atk: 118,
			def: 111,
			spa: 87,
			spd: 83,
			spe: 59,
		},
		abilities: {
			0: "Christmas Parade"
		},
        color: "Brown",
		  heightm: 2.55,
		  weightkg: 253.9,
		  eggGroups: ["Monster"],
	},
	apouprobo: {
		num: 7500490,
		species: "Apou Probo",
		types: ["Steel", "Fairy"],
		gender: "N",
		baseStats: {
			hp: 85,
			atk: 85,
			def: 115,
			spa: 105,
			spd: 112,
			spe: 85,
		},
		abilities: {
			0: "Magnetic Surge"
		},
        color: "Gray",
		  heightm: 1.6,
		  weightkg: 180.25,
		  eggGroups: ["Undiscovered"],
	},
	shedigigas: {
		num: 7500491,
		species: "Shedigigas",
		types: ["Bug", "Normal"],
		gender: "N",
		baseStats: {
			hp: 75,
			atk: 140,
			def: 77,
			spa: 55,
			spd: 75,
			spe: 70,
		},
		abilities: {
			0: "Temporary Guard"
		},
        color: "Brown",
		  heightm: 2.25,
		  weightkg: 210.6,
		  eggGroups: ["Undiscovered"],
	},
	chazma: {
		num: 7500492,
		species: "Chazma",
	   baseForme: "Egg",
		types: ["Normal", "Ghost"],
		gender: "N",
		baseStats: {
			hp: 193,
			atk: 59,
			def: 57,
			spa: 96,
			spd: 136,
			spe: 63,
		},
		abilities: {
			0: "Healthy Meal"
		},
        color: "Pink",
		  heightm: 2.65,
		  weightkg: 192.3,
		  eggGroups: ["Undiscovered"],
	},
	chazmahatched: {
		num: 7500492,
		species: "Chazma-Hatched",
		baseSpecies: "Chazma",
		forme: "Hatched",
		formeLetter: "H",
		types: ["Normal", "Dragon"],
		gender: "N",
		baseStats: {
			hp: 193,
			atk: 106,
			def: 106,
			spa: 106,
			spd: 106,
			spe: 115,
		},
		abilities: {
			0: "Neuroforce"
		},
        color: "Pink",
		  heightm: 5.95,
		  weightkg: 72.3,
		  eggGroups: ["Undiscovered"],
	},
	smolitizer: {
		num: 7500493,
		species: "Smolitizer",
		types: ["Ice", "Steel"],
		gender: "N",
		baseStats: {
			hp: 118,
			atk: 148,
			def: 103,
			spa: 86,
			spd: 84,
			spe: 63,
		},
		abilities: {
			0: "Christmas Spirit"
		},
        color: "Brown",
		  heightm: 2.45,
		  weightkg: 257.9,
		  eggGroups: ["Undiscovered"],
	},
	smolitizerultra: {
		num: 7500493,
		species: "Smolitizer-Ultra",
		baseSpecies: "Smolitizer",
		forme: "Ultra",
		formeLetter: "U",
		types: ["Ice", "Dragon"],
		gender: "N",
		baseStats: {
			hp: 118,
			atk: 158,
			def: 73,
			spa: 158,
			spd: 73,
			spe: 115,
		},
		abilities: {
			0: "Neuroforce"
		},
        color: "Yellow",
		  heightm: 6.15,
		  weightkg: 27.9,
		  eggGroups: ["Undiscovered"],
	},
	noirtic: {
		num: 7500494,
		species: "Noirtic",
		types: ["Ghost", "Flying"],
		gender: "N",
		baseStats: {
			hp: 93,
			atk: 95,
			def: 125,
			spa: 85,
			spd: 145,
			spe: 76,
		},
		abilities: {
			0: "Pressure"
		},
        color: "Black",
		  heightm: 1.95,
		  weightkg: 27.9,
		  eggGroups: ["Undiscovered"],
	},
	casserole: {
		num: 7500495,
		species: "Casserole",
		types: ["Flying", "Normal"],
		baseStats: {
			hp: 87,
			atk: 122,
			def: 72,
			spa: 103,
			spd: 67,
			spe: 127,
		},
		abilities: {
			0: "Scrumptious"
		},
        color: "Yellow",
		  heightm: 1.05,
		  weightkg: 25.9,
		  eggGroups: ["Flying"],
	},
	blazel: {
		num: 7500496,
		species: "Blazel",
		types: ["Fire", "Water"],
      genderRatio: {M: 0.75, F: 0.25},
		baseStats: {
			hp: 92,
			atk: 122,
			def: 72,
			spa: 107,
			spd: 70,
			spe: 107,
		},
		abilities: {
			0: "Heat Seeker"
		},
        color: "Brown",
		  heightm: 1.5,
		  weightkg: 42.75,
		  otherFormes: ["blazelmega"],
		  eggGroups: ["Field"],
	},
	blazelmega: {
		num: 7500496,
		species: "Blazel-Mega",
		baseSpecies: "Blazel",
		forme: "Mega",
		formeLetter: "M",
		types: ["Fire", "Water"],
      genderRatio: {M: 0.75, F: 0.25},
		baseStats: {
			hp: 92,
			atk: 162,
			def: 82,
			spa: 127,
			spd: 80,
			spe: 127,
		},
		abilities: {
			0: "Speed Boost"
		},
        color: "Brown",
		  heightm: 1.5,
		  weightkg: 42.75,
		  eggGroups: ["Field"],
	},
	funsparret: {
		num: 7500497,
		species: "Funsparret",
		types: ["Normal"],
		baseStats: {
			hp: 102,
			atk: 83,
			def: 77,
			spa: 65,
			spd: 70,
			spe: 77,
		},
		abilities: {
			0: "Effective Strategy"
		},
        color: "Yellow",
		  heightm: 1.65,
		  weightkg: 23.25,
		  eggGroups: ["Field"],
	},
	claytar: {
		num: 7500498,
		species: "Claytar",
		types: ["Ground", "Dark"],
		gender: "N",
		baseStats: {
			hp: 100,
			atk: 102,
			def: 127,
			spa: 82,
			spd: 110,
			spe: 68,
		},
		abilities: {
			0: "Floating Grounds"
		},
        color: "Black",
		  heightm: 1.75,
		  weightkg: 154.95,
		  otherFormes: ["claytarmega"],
		  eggGroups: ["Undiscovered"],
	},
	claytarmega: {
		num: 7500498,
		species: "Claytar-Mega",
		baseSpecies: "Claytar",
		forme: "Mega",
		formeLetter: "M",
		types: ["Ground", "Dark"],
		gender: "N",
		baseStats: {
			hp: 100,
			atk: 132,
			def: 167,
			spa: 82,
			spd: 130,
			spe: 78,
		},
		abilities: {
			0: "Sand Stream"
		},
        color: "Black",
		  heightm: 2.25,
		  weightkg: 207.95,
		  eggGroups: ["Undiscovered"],
	},
	komally: {
		num: 7500499,
		species: "Komally",
		types: ["Normal"],
		gender: "N",
		baseStats: {
			hp: 85,
			atk: 105,
			def: 95,
			spa: 105,
			spd: 95,
			spe: 80,
		},
		abilities: {
			0: "Sleeping System"
		},
        color: "Gray",
		  heightm: 1.35,
		  weightkg: 60.2,
		  eggGroups: ["Undiscovered"],
	},
	joltalesalola: {
		num: 7500500,
		species: "Joltales-Alola",
		types: ["Electric", "Ice"],
		baseStats: {
			hp: 79,
			atk: 76,
			def: 77,
			spa: 105,
			spd: 107,
			spe: 129,
		},
		abilities: {
			0: "Snow Sucker"
		},
        color: "Blue",
		  heightm: 0.95,
		  weightkg: 22.2,
		  eggGroups: ["Field"],
	},
	pluffatisse: {
		num: 7500501,
		species: "Pluffatisse",
		types: ["Fairy"],
		baseStats: {
			hp: 101,
			atk: 86,
			def: 89,
			spa: 102,
			spd: 92,
			spe: 60,
		},
		abilities: {
			0: "Ambulance"
		},
        color: "Pink",
		  heightm: 0.8,
		  weightkg: 10.25,
		  eggGroups: ["Fairy"],
	},
	lars: {
		num: 7500502,
		species: "Lars",
		types: ["Normal", "Ghost"],
		baseStats: {
			hp: 92,
			atk: 112,
			def: 92,
			spa: 65,
			spd: 100,
			spe: 122,
		},
		abilities: {
			0: "Bingo Bongo"
		},
        color: "Gray",
		  heightm: 0.95,
		  weightkg: 48.85,
		  eggGroups: ["Undiscovered"],
	},
	theye: {
		num: 7500503,
		species: "Theye",
		types: ["Fighting", "Ghost"],
		gender: "M",
		baseStats: {
			hp: 95,
			atk: 97,
			def: 90,
			spa: 57,
			spd: 85,
			spe: 57,
		},
		abilities: {
			0: "Panic Mode"
		},
        color: "Purple",
		  heightm: 0.9,
		  weightkg: 33.25,
		  otherFormes: ["theyemega"],
		  eggGroups: ["Human-Like"],
	},
	theyemega: {
		num: 7500503,
		species: "Theye-Mega",
		baseSpecies: "Theye",
		forme: "Mega",
		formeLetter: "M",
		types: ["Fighting", "Ghost"],
		gender: "M",
		baseStats: {
			hp: 95,
			atk: 107,
			def: 140,
			spa: 77,
			spd: 135,
			spe: 27,
		},
		abilities: {
			0: "Magic Bounce"
		},
        color: "Purple",
		  heightm: 0.9,
		  weightkg: 183.25,
		  eggGroups: ["Human-Like"],
	},
	chillax: { num: 7500504, species: "Chillax",
		types: ["Normal", "Dragon"],
		baseStats: {hp: 103, atk: 126, def: 102, spa: 80, spd: 92, spe: 83},
		abilities: {0: "Mellow Vibe"},
		heightm: 1.75,
		weightkg: 245.5,
		color: "Yellow",
		eggGroups: ["Monster"],
	},
	masterpiece: {
	        num: 7500505,
	        species: "Masterpiece",
	        types: ["Fire", "Grass"],
			  genderRatio: {M: 0.75, F: 0.25},
	        baseStats: {
	            hp: 82,
	            atk: 97,
	            def: 92,
	            spa: 100,
	            spd: 95,
	            spe: 86
	        },
	        abilities: {
	            0: "Magnum Opus"
	        },
	        heightm: 2.6,
	        weightkg: 283,
	        color: "Green",
		  otherFormes: ["masterpiecemega"],
	        eggGroups: ["Field"],
	    },
	    masterpiecemega: {
	        num: 7500505,
	        species: "Masterpiece-Mega",
	        baseSpecies: "Masterpiece",
	        forme: "Mega",
	        formeLetter: "M",
	        types: ["Fire", "Grass"],
			  genderRatio: {M: 0.75, F: 0.25},
	        baseStats: {
	            hp: 82,
	            atk: 117,
	            def: 122,
	            spa: 140,
	            spd: 125,
	            spe: 66
	        },
	        abilities: {
	            0: "Sheer Force"
	        },
			heightm: 3.2,
		    	weightkg: 383.5,
		    	color: "Green",
		    	eggGroups: ["Field"],
		},
		celemence: {
        num: 7500506,
        species: "Celemence",
        types: ["Steel", "Flying"],
        gender: "N",
        baseStats: {
            hp: 97,
            atk: 118,
            def: 120,
            spa: 108,
            spd: 120,
            spe: 80
        },
        abilities: {
            0: "Beast Roar"
        },
        heightm: 5.35,
        weightkg: 551.2,
        color: "Blue",
		  otherFormes: ["celemencemega"],
        eggGroups: ["Undiscovered"],
    },
    celemencemega: {
        num: 7500506,
        species: "Celemence-Mega",
        baseSpecies: "Celemence",
        forme: "Mega",
        formeLetter: "M",
        types: ["Steel", "Flying"],
        gender: "N",
        baseStats: {
            hp: 97,
            atk: 128,
            def: 170,
            spa: 118,
            spd: 130,
            spe: 100
        },
        abilities: {
            0: "Aerilate"
        },
        heightm: 5.65,
        weightkg: 561.2,
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
		saldreigonce: {
        num: 7500507,
        species: "Saldreigonce",
        types: ["Dark", "Flying"],
        baseStats: {
            hp: 103,
            atk: 130,
            def: 95,
            spa: 127,
            spd: 95,
            spe: 109
        },
        abilities: {
            0: "Levitimidate"
        },
        heightm: 1.65,
        weightkg: 131.3,
        color: "Blue",
		  otherFormes: ["saldreigoncemega"],
        eggGroups: ["Dragon"],
    },
    saldreigoncemega: {
        num: 7500507,
        species: "Saldreigonce-Mega",
        baseSpecies: "Saldreigonce",
        forme: "Mega",
        formeLetter: "M",
        types: ["Dark", "Flying"],
        baseStats: {
            hp: 103,
            atk: 140,
            def: 145,
            spa: 137,
            spd: 105,
            spe: 119
        },
        abilities: {
            0: "Aerilate"
        },
        heightm: 1.95,
        weightkg: 141.3,
        color: "Blue",
        eggGroups: ["Dragon"],
    },
		salasaur: {
        num: 7500508,
        species: "Salasaur",
        types: ["Poison"],
	     gender: "F",
        baseStats: {
            hp: 84,
            atk: 83,
            def: 81,
            spa: 115,
            spd: 90,
            spe: 108
        },
        abilities: {
            0: "Poison Pores"
        },
        color: "Green",
        heightm: 1.6,
        weightkg: 61.1,
		  otherFormes: ["salasaurmega"],
        eggGroups: ["Monster"],
    },
    salasaurmega: {
            num: 7500508,
            species: "Salasaur-Mega",
            baseSpecies: "Salasaur",
            forme: "Mega",
            formeLetter: "M",
            types: ["Poison"],
            gender: "F",
            baseStats: {
                hp: 84,
                atk: 83,
                def: 81,
                spa: 115,
                spd: 90,
                spe: 108
            },
            abilities: {
                0: "Poison Pores"
            },
	        color: "Green",
            heightm: 2.0,
            weightkg: 116.6,
            eggGroups: ["Monster"],
        },
        emulia: {
            num: 7500509,
            species: "Emulia",
            types: ["Electric", "Flying"],
            baseStats: {
                hp: 100,
                atk: 82,
                def: 115,
                spa: 82,
                spd: 107,
                spe: 106
            },
            abilities: {
                0: "Shock Trap"
            },
            heightm: 5.2,
            weightkg: 110.5,
            color: "White",
            eggGroups: ["Undiscovered"],
        },
        klinkarel: {
            num: 7500510,
            species: "Klinkarel",
            types: ["Steel", "Water"],
            baseStats: {
                hp: 69,
                atk: 102,
                def: 87,
                spa: 72,
                spd: 72,
                spe: 100
            },
            abilities: {
                0: "Positivity"
            },
            heightm: 0.8,
            weightkg: 56.25,
            color: "Brown",
            eggGroups: ["Undiscovered"],
        },
        gumshoe: {
            num: 7500511,
            species: "Gumshoe",
            types: ["Dark", "Normal"],
            baseStats: { //89	125	72	60	82	95
                hp: 89,
                atk: 125,
                def: 72,
                spa: 60,
                spd: 82,
                spe: 95
            },
            abilities: {
                0: "Jealous Aggressor"
            },
            heightm: 0.9,
            weightkg: 24.1,
            color: "Brown",
            eggGroups: ["Field"],
        },
        barbominable: {
            num: 7500512,
            species: "Barbominable",
            types: ["Fighting", "Water"],
            baseStats: {
                hp: 94,
                atk: 128,
                def: 106,
                spa: 68,
                spd: 86,
                spe: 65
            },
            abilities: {
                0: "Fisticuffs"
            },
            heightm: 1.7,
            weightkg: 138,
            color: "Brown",
            eggGroups: ["Water 3"],
        },
        asterisk: {
            num: 7500513,
            species: "Asterisk",
            types: ["Poison", "Flying"],
				genderRatio: {M: 0.75, F: 0.25},
            baseStats: {
                hp: 82,
                atk: 70,
                def: 90,
                spa: 132,
                spd: 120,
                spe: 95
            },
            abilities: {
                0: "Starburst"
            },
        		color: "White",
            heightm: 1.2,
            weightkg: 26.25,
            eggGroups: ["Fairy"],
        },
        togetrio: {
            num: 7500514,
            species: "Togetrio",
            types: ["Ground", "Electric"],
            baseStats: {
                hp: 60,
                atk: 109,
                def: 66,
                spa: 55,
                spd: 81,
                spe: 118
            },
            abilities: {
                0: "Quick Trap"
            },
        		color: "Gray",
            heightm: 0.5,
            weightkg: 18.3,
            eggGroups: ["Field"],
        },
        centenarian: {
            num: 7500515,
            species: "Centenarian",
            types: ["Electric", "Fighting"],
			   genderRatio: {M: 0.75, F: 0.25},
            baseStats: {
                hp: 83,
                atk: 99,
                def: 75,
                spa: 114,
                spd: 75,
                spe: 116
            },
            abilities: {
                0: "Aeon Flux"
            },
	        color: "Brown",
            heightm: 1.35,
            weightkg: 47.6,
		  otherFormes: ["centenarianmega"],
            eggGroups: ["Field"],
        },
        centenarianmega: {
            num: 7500515,
            species: "Centenarian-Mega",
            baseSpecies: "Centenarian",
            forme: "Mega",
            formeLetter: "M",
            types: ["Electric", "Fighting"],
			   genderRatio: {M: 0.75, F: 0.25},
            baseStats: {
                hp: 83,
                atk: 99,
                def: 95,
                spa: 144,
                spd: 95,
                spe: 146
            },
            abilities: {
                0: "Intimidate"
            },
	        color: "Brown",
            heightm: 1.65,
            weightkg: 51.4,
            eggGroups: ["Field"],
        },
        kyutana: {
            num: 7500516,
            species: "Kyutana",
            types: ["Ghost", "Grass"],
            baseStats: {
                hp: 70,
                atk: 145,
                def: 105,
                spa: 55,
                spd: 80,
                spe: 105
            },
            abilities: {
                0: "Beast Costume"
            },
	        color: "White",
            heightm: 0.25,
            weightkg: 0.4,
            eggGroups: ["Undiscovered"],
        },
	kyutanabusted: {
        num: 7500516,
        species: "Kyutana-Busted",
        baseSpecies: "Kyutana",
        forme: "Busted",
        formeLetter: "B",
        types: ["Ghost", "Grass"],
         baseStats: {
                hp: 70,
                atk: 145,
                def: 105,
                spa: 55,
                spd: 80,
                spe: 105
            },
        		abilities: {
            	0: "Beast Costume"
       		},
	        color: "White",
    			heightm: 0.25,
            weightkg: 0.4,
            eggGroups: ["Undiscovered"],
        },
	kyutanabustedtest: {
        num: 7500516,
        species: "Kyutana-Busted-Test",
        baseSpecies: "Kyutana",
        forme: "Busted-Test",
        formeLetter: "B",
        types: ["Ghost", "Grass"],
         baseStats: {
                hp: 70,
                atk: 145,
                def: 105,
                spa: 55,
                spd: 80,
                spe: 105
            },
        abilities: {
            0: "Beast Costumed"
        },
    			heightm: 0.25,
            weightkg: 0.4,
            eggGroups: ["Undiscovered"],
        },
        amdremarye: {
            num: 7500517,
            species: "Amdre-Marye",
            types: ["Electric", "Psychic"],
            gender: "N",
            baseStats: {
                hp: 70,
                atk: 127,
                def: 52,
                spa: 167,
                spd: 55,
                spe: 122
            },
            abilities: {
                0: "Short Circuit"
            },
            heightm: 1.55,
            weightkg: 61.15,
			   color: "Red",
		  otherFormes: ["amdremaryemega"],
            eggGroups: ["Undiscovered"],
        },
        amdremaryemega: {
            num: 7500517,
            species: "Amdre-Marye-Mega",
            baseSpecies: "Amdre-Marye",
            forme: "Mega",
            formeLetter: "M",
            types: ["Electric", "Dragon"],
            gender: "N",
            baseStats: {
                hp: 70,
                atk: 147,
                def: 72,
                spa: 217,
                spd: 75,
                spe: 112
            },
            abilities: {
                0: "Mold Breaker"
            },
            heightm: 1.55,
            weightkg: 61.15,
			   color: "Red",
            eggGroups: ["Undiscovered"],
        },
	dondon: {
	    num: 7500518,
	    species: "Dondon",
	    types: ["Ground"],
	    baseStats: {
	        hp: 104,
	        atk: 121,
	        def: 124,
	        spa: 69,
	        spd: 71,
	        spe: 53
	    },
	    abilities: {
	        0: "Solid Sand"
	    },
	    heightm: 1.5,
	    weightkg: 210,
	    color: "Gray",
	    eggGroups: ["Field"],
	},
	xerdian: {
	    num: 7500519,
	    species: "Xerdian",
	    types: ["Fairy", "Bug"],
	    baseStats: {
	        hp: 90,
	        atk: 103,
	        def: 85,
	        spa: 100,
	        spd: 104,
	        spe: 92
	    },
	    abilities: {
	        0: "Fae Fist"
	    },
	    heightm: 2.2,
	    weightkg: 125.3,
	    color: "Blue",
	    eggGroups: ["Undiscovered"],
	},
	genin: {
	    num: 7500520,
	    species: "Genin",
	    types: ["Steel", "Flying"],
	    baseStats: {
	        hp: 66,
	        atk: 105,
	        def: 70,
	        spa: 105,
	        spd: 72,
	        spe: 149
	    },
	    abilities: {
	        0: "Malware"
	    },
	    heightm: 1.15,
	    weightkg: 47.25,
	    color: "Purple",
	    eggGroups: ["Undiscovered"],
	},
	aryvel: {
	    num: 7500521,
	    species: "Aryvel",
	    types: ["Poison", "Dark"],
	    baseStats: {
	        hp: 98,
	        atk: 110,
	        def: 102,
	        spa: 105,
	        spd: 94,
	        spe: 69
	    },
	    abilities: {
	        0: "Nightmare Fuel"
	    },
        color: "Red",
	    heightm: 3.45,
	    weightkg: 118.25,
	    eggGroups: ["Undiscovered"],
	},swolax: {
        num: 7500522,
        species: "Swolax",
        types: ["Normal", "Fighting"],
        genderRatio: {M: 0.875, F: 0.125},
        baseStats: {
            hp: 139,
            atk: 131,
            def: 109,
            spa: 59,
            spd: 101,
            spe: 54
        },
        abilities: {
            0: "Blood-made Crops"
        },
        heightm: 2.25,
        weightkg: 396.8,
        color: "Black",
        eggGroups: ["Undiscovered"],
    },
    mendoza: {
        num: 7500523,
        species: "Mendoza",
        types: ["Dark", "Ghost"],
        gender: "F",
        baseStats: {
            hp: 104,
            atk: 96,
            def: 100,
            spa: 87,
            spd: 107,
            spe: 85
        },
        abilities: {
            0: "Mirage"
        },
        heightm: 1.4,
        weightkg: 38.05,
        color: "Brown",
        eggGroups: ["Flying"],
    },
    goohoo: {
        num: 7500524,
        species: "Goohoo",
        types: ["Dragon", "Ghost"],
        baseStats: {
            hp: 85,
            atk: 125,
            def: 85,
            spa: 130,
            spd: 140,
            spe: 75
        },
        abilities: {
            0: "Sippity Hoo"
        },
        heightm: 1.3,
        weightkg: 79.8,
        color: "Purple",
        eggGroups: ["Undiscovered"],
    },
	kyervine: {
	    num: 7500525,
	    species: "Kyervine",
	    types: ["Grass", "Water"],
        genderRatio: {M: 0.875, F: 0.125},
	    baseStats: {
	        hp: 98,
	        atk: 110,
	        def: 102,
	        spa: 105,
	        spd: 94,
	        spe: 69
	    },
	    abilities: {
	        0: "Atmospheric Perversion"
	    },
        color: "Blue",
	    heightm: 2.65,
	    weightkg: 184,
	    eggGroups: ["Undiscovered"],
	},
        kyervineprimal: {
            num: 7500525,
            species: "Kyervine-Primal",
            baseSpecies: "Kyervine",
            forme: "Primal",
            formeLetter: "P",
            types: ["Grass", "Water"],
        genderRatio: {M: 0.875, F: 0.125},
	    baseStats: {
	        hp: 98,
	        atk: 110,
	        def: 102,
	        spa: 105,
	        spd: 94,
	        spe: 69
	    },
	    abilities: {
	        0: "Primordial Sea"
	    },
        color: "Blue",
	    heightm: 7.95,
	    weightkg: 262,
	    eggGroups: ["Undiscovered"],
       },
	pototonz: {
	    num: 7500526,
	    species: "Pototon-Z",
	    types: ["Normal", "Flying"],
            gender: "N",
	    baseStats: {
	        hp: 80,
	        atk: 72,
	        def: 57,
	        spa: 133,
	        spd: 58,
	        spe: 110
	    },
	    abilities: {
	        0: "Adaptive Eye"
	    },
        color: "Red",
	    heightm: 2.65,
	    weightkg: 184,
	    eggGroups: ["Undiscovered"],
	},
	tropeus: {
	    num: 7500527,
	    species: "Tropeus",
	    types: ["Grass", "Normal"],
	    baseStats: {
	        hp: 120,
	        atk: 100,
	        def: 105,
	        spa: 100,
	        spd: 105,
	        spe: 98
	    },
	    abilities: {
	        0: "God of Fertility"
	    },
        color: "Green",
	    heightm: 2.6,
	    weightkg: 210,
	    eggGroups: ["Undiscovered"],
	},
	tropeusfire: {
	    num: 7500527,
       species: "Tropeus-Fire",
       baseSpecies: "Tropeus",
       forme: "Fire",
       formeLetter: "F",
	    types: ["Grass", "Fire"],
	    baseStats: {
	        hp: 120,
	        atk: 100,
	        def: 105,
	        spa: 100,
	        spd: 105,
	        spe: 98
	    },
	    abilities: {
	        0: "God of Fertility"
	    },
        color: "Green",
	    heightm: 2.6,
	    weightkg: 210,
	    eggGroups: ["Undiscovered"],
	},
	tropeuswater: {
	    num: 7500527,
       species: "Tropeus-Water",
       baseSpecies: "Tropeus",
       forme: "Water",
       formeLetter: "W",
	    types: ["Grass", "Water"],
	    baseStats: {
	        hp: 120,
	        atk: 100,
	        def: 105,
	        spa: 100,
	        spd: 105,
	        spe: 98
	    },
	    abilities: {
	        0: "God of Fertility"
	    },
        color: "Green",
	    heightm: 2.6,
	    weightkg: 210,
	    eggGroups: ["Undiscovered"],
	},
	tropeuselectric: {
	    num: 7500527,
       species: "Tropeus-Electric",
       baseSpecies: "Tropeus",
       forme: "Electric",
       formeLetter: "E",
	    types: ["Grass", "Electric"],
	    baseStats: {
	        hp: 120,
	        atk: 100,
	        def: 105,
	        spa: 100,
	        spd: 105,
	        spe: 98
	    },
	    abilities: {
	        0: "God of Fertility"
	    },
        color: "Green",
	    heightm: 2.6,
	    weightkg: 210,
	    eggGroups: ["Undiscovered"],
	},
	tropeusgrass: {
	    num: 7500527,
       species: "Tropeus-Grass",
       baseSpecies: "Tropeus",
       forme: "Grass",
       formeLetter: "G",
	    types: ["Grass"],
	    baseStats: {
	        hp: 120,
	        atk: 100,
	        def: 105,
	        spa: 100,
	        spd: 105,
	        spe: 98
	    },
	    abilities: {
	        0: "God of Fertility"
	    },
        color: "Green",
	    heightm: 2.6,
	    weightkg: 210,
	    eggGroups: ["Undiscovered"],
	},
	tropeusice: {
	    num: 7500527,
       species: "Tropeus-Ice",
       baseSpecies: "Tropeus",
       forme: "Ice",
       formeLetter: "I",
	    types: ["Grass", "Ice"],
	    baseStats: {
	        hp: 120,
	        atk: 100,
	        def: 105,
	        spa: 100,
	        spd: 105,
	        spe: 98
	    },
	    abilities: {
	        0: "God of Fertility"
	    },
        color: "Green",
	    heightm: 2.6,
	    weightkg: 210,
	    eggGroups: ["Undiscovered"],
	},
	tropeusfighting: {
	    num: 7500527,
       species: "Tropeus-Fighting",
       baseSpecies: "Tropeus",
       forme: "Fighting",
       formeLetter: "F",
	    types: ["Grass", "Fighting"],
	    baseStats: {
	        hp: 120,
	        atk: 100,
	        def: 105,
	        spa: 100,
	        spd: 105,
	        spe: 98
	    },
	    abilities: {
	        0: "God of Fertility"
	    },
        color: "Green",
	    heightm: 2.6,
	    weightkg: 210,
	    eggGroups: ["Undiscovered"],
	},
	tropeuspoison: {
	    num: 7500527,
       species: "Tropeus-Poison",
       baseSpecies: "Tropeus",
       forme: "Poison",
       formeLetter: "P",
	    types: ["Grass", "Poison"],
	    baseStats: {
	        hp: 120,
	        atk: 100,
	        def: 105,
	        spa: 100,
	        spd: 105,
	        spe: 98
	    },
	    abilities: {
	        0: "God of Fertility"
	    },
        color: "Green",
	    heightm: 2.6,
	    weightkg: 210,
	    eggGroups: ["Undiscovered"],
	},
	tropeusground: {
	    num: 7500527,
       species: "Tropeus-Ground",
       baseSpecies: "Tropeus",
       forme: "Ground",
       formeLetter: "G",
	    types: ["Grass", "Ground"],
	    baseStats: {
	        hp: 120,
	        atk: 100,
	        def: 105,
	        spa: 100,
	        spd: 105,
	        spe: 98
	    },
	    abilities: {
	        0: "God of Fertility"
	    },
        color: "Green",
	    heightm: 2.6,
	    weightkg: 210,
	    eggGroups: ["Undiscovered"],
	},
	tropeusflying: {
	    num: 7500527,
       species: "Tropeus-Flying",
       baseSpecies: "Tropeus",
       forme: "Flying",
       formeLetter: "F",
	    types: ["Grass", "Flying"],
	    baseStats: {
	        hp: 120,
	        atk: 100,
	        def: 105,
	        spa: 100,
	        spd: 105,
	        spe: 98
	    },
	    abilities: {
	        0: "God of Fertility"
	    },
        color: "Green",
	    heightm: 2.6,
	    weightkg: 210,
	    eggGroups: ["Undiscovered"],
	},
	tropeuspsychic: {
	    num: 7500527,
       species: "Tropeus-Psychic",
       baseSpecies: "Tropeus",
       forme: "Psychic",
       formeLetter: "P",
	    types: ["Grass", "Psychic"],
	    baseStats: {
	        hp: 120,
	        atk: 100,
	        def: 105,
	        spa: 100,
	        spd: 105,
	        spe: 98
	    },
	    abilities: {
	        0: "God of Fertility"
	    },
        color: "Green",
	    heightm: 2.6,
	    weightkg: 210,
	    eggGroups: ["Undiscovered"],
	},
	tropeusbug: {
	    num: 7500527,
       species: "Tropeus-Bug",
       baseSpecies: "Tropeus",
       forme: "Bug",
       formeLetter: "B",
	    types: ["Grass", "Bug"],
	    baseStats: {
	        hp: 120,
	        atk: 100,
	        def: 105,
	        spa: 100,
	        spd: 105,
	        spe: 98
	    },
	    abilities: {
	        0: "God of Fertility"
	    },
        color: "Green",
	    heightm: 2.6,
	    weightkg: 210,
	    eggGroups: ["Undiscovered"],
	},
	tropeusrock: {
	    num: 7500527,
       species: "Tropeus-Rock",
       baseSpecies: "Tropeus",
       forme: "Rock",
       formeLetter: "R",
	    types: ["Grass", "Rock"],
	    baseStats: {
	        hp: 120,
	        atk: 100,
	        def: 105,
	        spa: 100,
	        spd: 105,
	        spe: 98
	    },
	    abilities: {
	        0: "God of Fertility"
	    },
        color: "Green",
	    heightm: 2.6,
	    weightkg: 210,
	    eggGroups: ["Undiscovered"],
	},
	tropeusghost: {
	    num: 7500527,
       species: "Tropeus-Ghost",
       baseSpecies: "Tropeus",
       forme: "Ghost",
       formeLetter: "G",
	    types: ["Grass", "Ghost"],
	    baseStats: {
	        hp: 120,
	        atk: 100,
	        def: 105,
	        spa: 100,
	        spd: 105,
	        spe: 98
	    },
	    abilities: {
	        0: "God of Fertility"
	    },
        color: "Green",
	    heightm: 2.6,
	    weightkg: 210,
	    eggGroups: ["Undiscovered"],
	},
	tropeusdragon: {
	    num: 7500527,
       species: "Tropeus-Dragon",
       baseSpecies: "Tropeus",
       forme: "Dragon",
       formeLetter: "D",
	    types: ["Grass", "Dragon"],
	    baseStats: {
	        hp: 120,
	        atk: 100,
	        def: 105,
	        spa: 100,
	        spd: 105,
	        spe: 98
	    },
	    abilities: {
	        0: "God of Fertility"
	    },
        color: "Green",
	    heightm: 2.6,
	    weightkg: 210,
	    eggGroups: ["Undiscovered"],
	},
	tropeusdark: {
	    num: 7500527,
       species: "Tropeus-Dark",
       baseSpecies: "Tropeus",
       forme: "Dark",
       formeLetter: "D",
	    types: ["Grass", "Dark"],
	    baseStats: {
	        hp: 120,
	        atk: 100,
	        def: 105,
	        spa: 100,
	        spd: 105,
	        spe: 98
	    },
	    abilities: {
	        0: "God of Fertility"
	    },
        color: "Green",
	    heightm: 2.6,
	    weightkg: 210,
	    eggGroups: ["Undiscovered"],
	},
	tropeussteel: {
	    num: 7500527,
       species: "Tropeus-Steel",
       baseSpecies: "Tropeus",
       forme: "Steel",
       formeLetter: "S",
	    types: ["Grass", "Steel"],
	    baseStats: {
	        hp: 120,
	        atk: 100,
	        def: 105,
	        spa: 100,
	        spd: 105,
	        spe: 98
	    },
	    abilities: {
	        0: "God of Fertility"
	    },
        color: "Green",
	    heightm: 2.6,
	    weightkg: 210,
	    eggGroups: ["Undiscovered"],
	},
	tropeusfairy: {
	    num: 7500527,
       species: "Tropeus-Fairy",
       baseSpecies: "Tropeus",
       forme: "Fairy",
       formeLetter: "F",
	    types: ["Grass", "Fairy"],
	    baseStats: {
	        hp: 120,
	        atk: 100,
	        def: 105,
	        spa: 100,
	        spd: 105,
	        spe: 98
	    },
	    abilities: {
	        0: "God of Fertility"
	    },
        color: "Green",
	    heightm: 2.6,
	    weightkg: 210,
	    eggGroups: ["Undiscovered"],
	},
	metabell: {
	        num: 7500528,
	        species: "Metabell",
	        types: ["Grass", "Steel"],
	        gender: "N",
	        baseStats: {
	            hp: 80,
	            atk: 127,
	            def: 100,
	            spa: 97,
	            spd: 90,
	            spe: 90
	        },
	        abilities: {
	            0: "Indigestion"
	        },
        	  color: "Blue",
	        heightm: 1.65,
	        weightkg: 282.75,
		  otherFormes: ["metabellmega"],
	        eggGroups: ["Undiscovered"],
	    },
	    metabellmega: {
	        num: 7500528,
	        species: "Metabell-Mega",
	        baseSpecies: "Metabell",
	        forme: "Mega",
	        formeLetter: "M",
	        types: ["Grass", "Steel"],
	        gender: "N",
	        baseStats: {
	            hp: 80,
	            atk: 137,
	            def: 120,
	            spa: 107,
	            spd: 110,
	            spe: 130
	        },
	        abilities: {
	            0: "Tough Claws"
	        },
	        color: "Blue",
	        heightm: 1.65,
	        weightkg: 675.65,
	        eggGroups: ["Undiscovered"],
	    },
	taiwan: {
	    num: 7500529,
	    species: "Taiwan",
	    types: ["Grass", "Ice"],
       gender: "N",
	    baseStats: {
	        hp: 64,
	        atk: 170,
	        def: 98,
	        spa: 52,
	        spd: 58,
	        spe: 137
	    },
	    abilities: {
	        0: "Beast Bootleg"
	    },
	    heightm: 0.7,
	    weightkg: 17.05,
		 color: "White",
	    eggGroups: ["Undiscovered"],
	},
	apouterro: {
	        num: 7500530,
	        species: "Apou Terro",
	        types: ["Grass", "Fairy"],
	        gender: "N",
	        baseStats: {
	            hp: 92,
	            atk: 97,
	            def: 100,
	            spa: 122,
	            spd: 100,
	            spe: 75
	        },
	        abilities: {
	            0: "Wooded Surge"
	        },
        	  color: "Green",
	        heightm: 1.7,
	        weightkg: 164.3,
	        eggGroups: ["Undiscovered"],
	    },
	    castapus: {
	        num: 7500531,
	        species: "Castapus",
	        types: ["Normal", "Fairy"],
	        gender: "N",
	        baseStats: {
	            hp: 70,
	            atk: 77,
	            def: 72,
	            spa: 120,
	            spd: 92,
	            spe: 102
	        },
	        abilities: {
	            0: "Geologist"
	        },
	        heightm: 0.8,
	        weightkg: 9.7,
	        color: "Gray",
	        eggGroups: ["Undiscovered"],
	    },
	    castapussmarty: {
	        num: 7500531,
	        species: "Castapus-Smarty",
	        baseSpecies: "Castapus",
	        forme: "Smarty",
	        formeLetter: "S",
	        types: ["Psychic", "Fairy"],
	        gender: "N",
	        baseStats: {
	            hp: 70,
	            atk: 77,
	            def: 72,
	            spa: 120,
	            spd: 92,
	            spe: 102
	        },
	        abilities: {
	            0: "Geologist"
	        },
	        heightm: 0.8,
	        weightkg: 9.7,
	        color: "Pink",
	        eggGroups: ["Undiscovered"],
	    },
	    castapusstormy: {
	        num: 7500531,
	        species: "Castapus-Stormy",
	        baseSpecies: "Castapus",
	        forme: "Stormy",
	        formeLetter: "S",
	        types: ["Electric", "Fairy"],
	        gender: "N",
	        baseStats: {
	            hp: 70,
	            atk: 77,
	            def: 72,
	            spa: 120,
	            spd: 92,
	            spe: 102
	        },
	        abilities: {
	            0: "Geologist"
	        },
	        heightm: 0.8,
	        weightkg: 9.7,
	        color: "Yellow",
	        eggGroups: ["Undiscovered"],
	    },
	    castapusgrassy: {
	        num: 7500531,
	        species: "Castapus-Grassy",
	        baseSpecies: "Castapus",
	        forme: "Grassy",
	        formeLetter: "G",
	        types: ["Grass", "Fairy"],
	        gender: "N",
	        baseStats: {
	            hp: 70,
	            atk: 77,
	            def: 72,
	            spa: 120,
	            spd: 92,
	            spe: 102
	        },
	        abilities: {
	            0: "Geologist"
	        },
	        heightm: 0.8,
	        weightkg: 9.7,
	        color: "Red",
	        eggGroups: ["Undiscovered"],
	    },
	    castapusmisty: {
	        num: 7500531,
	        species: "Castapus-Misty",
	        baseSpecies: "Castapus",
	        forme: "Misty",
	        formeLetter: "M",
	        types: ["Fairy"],
	        gender: "N",
	        baseStats: {
	            hp: 70,
	            atk: 77,
	            def: 72,
	            spa: 120,
	            spd: 92,
	            spe: 102
	        },
	        abilities: {
	            0: "Geologist"
	        },
	        heightm: 0.8,
	        weightkg: 9.7,
	        color: "Purple",
	        eggGroups: ["Undiscovered"],
	    },
	    castapusrocky: {
	        num: 7500531,
	        species: "Castapus-Rocky",
	        baseSpecies: "Castapus",
	        forme: "Rocky",
	        formeLetter: "R",
	        types: ["Rock", "Fairy"],
	        gender: "N",
	        baseStats: {
	            hp: 70,
	            atk: 77,
	            def: 72,
	            spa: 120,
	            spd: 92,
	            spe: 102
	        },
	        abilities: {
	            0: "Geologist"
	        },
	        heightm: 0.8,
	        weightkg: 9.7,
	        color: "Brown",
	        eggGroups: ["Undiscovered"],
	    },
	    castapusmurky: {
	        num: 7500531,
	        species: "Castapus-Murky",
	        baseSpecies: "Castapus",
	        forme: "Murky",
	        formeLetter: "M",
	        types: ["Dark", "Fairy"],
	        gender: "N",
	        baseStats: {
	            hp: 70,
	            atk: 77,
	            def: 72,
	            spa: 120,
	            spd: 92,
	            spe: 102
	        },
	        abilities: {
	            0: "Geologist"
	        },
	        heightm: 0.8,
	        weightkg: 9.7,
	        color: "Black",
	        eggGroups: ["Undiscovered"],
	    },
	    castapuskelpy: {
	        num: 7500531,
	        species: "Castapus-Kelpy",
	        baseSpecies: "Castapus",
	        forme: "Kelpy",
	        formeLetter: "K",
	        types: ["Water", "Fairy"],
	        gender: "N",
	        baseStats: {
	            hp: 70,
	            atk: 77,
	            def: 72,
	            spa: 120,
	            spd: 92,
	            spe: 102
	        },
	        abilities: {
	            0: "Geologist"
	        },
	        heightm: 0.8,
	        weightkg: 9.7,
	        color: "Blue",
	        eggGroups: ["Undiscovered"],
	    },
	    castapussludgy: {
	        num: 7500531,
	        species: "Castapus-Sludgy",
	        baseSpecies: "Castapus",
	        forme: "Sludgy",
	        formeLetter: "S",
	        types: ["Poison", "Fairy"],
	        gender: "N",
	        baseStats: {
	            hp: 70,
	            atk: 77,
	            def: 72,
	            spa: 120,
	            spd: 92,
	            spe: 102
	        },
	        abilities: {
	            0: "Geologist"
	        },
	        heightm: 0.8,
	        weightkg: 9.7,
	        color: "Green",
	        eggGroups: ["Undiscovered"],
	    },
	    castapusbeauty: {
	        num: 7500531,
	        species: "Castapus-Beauty",
	        baseSpecies: "Castapus",
	        forme: "Beauty",
	        formeLetter: "B",
	        types: ["Fire", "Fairy"],
	        gender: "N",
	        baseStats: {
	            hp: 70,
	            atk: 77,
	            def: 72,
	            spa: 120,
	            spd: 92,
	            spe: 102
	        },
	        abilities: {
	            0: "Geologist"
	        },
	        heightm: 0.8,
	        weightkg: 9.7,
	        color: "Red",
	        eggGroups: ["Undiscovered"],
	    },
	    castapussturdy: {
	        num: 7500531,
	        species: "Castapus-Sturdy",
	        baseSpecies: "Castapus",
	        forme: "Sturdy",
	        formeLetter: "S",
	        types: ["Steel", "Fairy"],
	        gender: "N",
	        baseStats: {
	            hp: 70,
	            atk: 77,
	            def: 72,
	            spa: 120,
	            spd: 92,
	            spe: 102
	        },
	        abilities: {
	            0: "Geologist"
	        },
	        heightm: 0.8,
	        weightkg: 9.7,
	        color: "Gray",
	        eggGroups: ["Undiscovered"],
	    },
	    ractusdel: {
	        num: 7500532,
	        species: "Ractusdel",
	        types: ["Grass", "Dragon"],
	        baseStats: {
	            hp: 74,
	            atk: 79,
	            def: 70,
	            spa: 136,
	            spd: 70,
	            spe: 110
	        },
	        abilities: {
	            0: "Aqua Booster"
	        },
	        color: "Purple",
	        heightm: 2.3,
	        weightkg: 89,
	        eggGroups: ["Undiscovered"],
	    },
	    cornite: {
	        num: 7500533,
	        species: "Cornite",
	        types: ["Rock", "Flying"],
	        baseStats: {
	            hp: 88,
	            atk: 104,
	            def: 105,
	            spa: 92,
	            spd: 107,
	            spe: 67
	        },
	        abilities: {
	            0: "Graceful Exit"
	        },
	        heightm: 0.6,
	        weightkg: 5.0,
	        color: "Brown",
	        eggGroups: ["Water 1"],
	    },
	    passadust: {
	        num: 7500534,
	        species: "Passadust",
	        types: ["Fighting", "Flying"],
	        gender: "M",
	        baseStats: {
	            hp: 89,
	            atk: 130,
	            def: 85,
	            spa: 75,
	            spd: 75,
	            spe: 120
	        },
	        abilities: {
	            0: "Chain Heal"
	        },
	        heightm: 1.7,
	        weightkg: 72.9,
	        color: "White",
	        eggGroups: ["Undiscovered"],
	    },
	    bangma: {
	        num: 7500535,
	        species: "Bangma",
	        types: ["Ghost", "Rock"],
	        baseStats: {
	            hp: 72,
	            atk: 92,
	            def: 102,
	            spa: 96,
	            spd: 81,
	            spe: 57
	        },
	        abilities: {
	            0: "Cold Body"
	        },
	        heightm: 0.8,
	        weightkg: 55.0,
	        color: "Black",
		  otherFormes: ["bangmamega"],
	        eggGroups: ["Amorphous"],
	    },
	    bangmamega: {
	        num: 7500535,
	        species: "Bangma-Mega",
	        baseSpecies: "Bangma",
	        forme: "Mega",
	        formeLetter: "M",
	        types: ["Ghost", "Rock"],
	        baseStats: {
	            hp: 72,
	            atk: 142,
	            def: 112,
	            spa: 106,
	            spd: 101,
	            spe: 67
	        },
	        abilities: {
	            0: "Prankster"
	        },
	        heightm: 0.9,
	        weightkg: 55.5,
	        color: "Black",
	        eggGroups: ["Amorphous"],
	    },
	    weeeeds: {
	        num: 7500536,
	        species: "Weeeeds",
	        types: ["Steel", "Psychic"],
	        gender: "N",
	        baseStats: {
	            hp: 92,
	            atk: 75,
	            def: 105,
	            spa: 65,
	            spd: 100,
	            spe: 55
	        },
	        abilities: {
	            0: "Dangerous Addiction"
	        },
	        heightm: 0.5,
	        weightkg: 11.4,
	        color: "Grey",
	        eggGroups: ["Undiscovered"],
	    },
	    cherroh: {
	        num: 7500537,
	        species: "Cherr-Oh",
	        types: ["Grass", "Fire"],
	        gender: "N",
	        baseStats: {
	            hp: 95,
	            atk: 110,
	            def: 90,
	            spa: 98,
	            spd: 121,
	            spe: 87
	        },
	        abilities: {
	            0: "Care Package"
	        },
	        heightm: 2.15,
	        weightkg: 104.15,
	        color: "Red",
	        eggGroups: ["Undiscovered"],
	    },
	    rotillwashaz: {
	        num: 7500538,
	        species: "Rotill-Washaz",
	        types: ["Electric", "Water"],
	        gender: "N",
	        baseStats: {
	            hp: 95,
	            atk: 57,
	            def: 98,
	            spa: 92,
	            spd: 98,
	            spe: 68
	        },
	        abilities: {
	            0: "Root Rum"
	        },
	        heightm: 0.55,
	        weightkg: 14.4,
	        color: "Blue",
	        eggGroups: ["Undiscovered"],
	    },
	    mienzy: {
	        num: 7500539,
	        species: "Mienzy",
	        types: ["Fighting", "Dragon"],
	        baseStats: {
	            hp: 59,
	            atk: 132,
	            def: 65,
	            spa: 78,
	            spd: 72,
	            spe: 130
	        },
	        abilities: {
	            0: "Aura of Pain"
	        },
	        heightm: 1.4,
	        weightkg: 35.5,
	        color: "Black",
	        eggGroups: ["Undiscovered"],
	    },
	    whiscor: {
	        num: 7500540,
	        species: "Whiscor",
	        types: ["Bug", "Ground"],
	        baseStats: {
	            hp: 67,
	            atk: 85,
	            def: 122,
	            spa: 52,
	            spd: 87,
	            spe: 81
	        },
	        abilities: {
	            0: "Healing Hell"
	        },
	        heightm: 1.6,
	        weightkg: 50.5,
	        color: "Grey",
	        eggGroups: ["Bug"],
	    },
	    yvenne: {
	        num: 7500541,
	        species: "Yvenne",
	        types: ["Electric", "Flying"],
	        baseStats: {
	            hp: 96,
	            atk: 94,
	            def: 76,
	            spa: 126,
	            spd: 82,
	            spe: 120
	        },
	        abilities: {
	            0: "Pouch Aura"
	        },
	        heightm: 3.0,
	        weightkg: 102.6,
	        color: "Red",
	        eggGroups: ["Undiscovered"],
	    },
		unozam: {
	        num: 7500542,
	        species: "Unozam",
	        types: ["Psychic"],
	        gender: "N",
	        baseStats: {
	            hp: 51,
	            atk: 61,
	            def: 46,
	            spa: 123,
	            spd: 71,
	            spe: 104
	        },
	        abilities: {
	            0: "Hidden Advantage"
	        },
	        heightm: 1,
	        weightkg: 26.5,
	        color: "Black",
		  otherFormes: ["unozammega"],
	        eggGroups: ["Undiscovered"],
	    },
	    unozammega: {
	        num: 7500542,
	        species: "Unozam-Mega",
	        baseSpecies: "Unozam",
	        forme: "Mega",
	        formeLetter: "M",
	        types: ["Psychic"],
	        gender: "N",
	        baseStats: {
	            hp: 51,
	            atk: 61,
	            def: 66,
	            spa: 163,
	            spd: 81,
	            spe: 134
	        },
	        abilities: {
	            0: "Trace"
	        },
	        heightm: 0.7,
	        weightkg: 26.5,
	        color: "Black",
	        eggGroups: ["Undiscovered"],
	    },
		kyubeatblack: {
	        num: 7500543,
	        species: "Kyubeat-Black",
	        types: ["Ice", "Bug"],
	        gender: "N",
	        baseStats: {
	            hp: 95,
	            atk: 135,
	            def: 100,
	            spa: 83,
	            spd: 100,
	            spe: 90
	        },
	        abilities: {
	            0: "Volt Field"
	        },
	        heightm: 2,
	        weightkg: 171.35,
	        color: "Gray",
	        eggGroups: ["Undiscovered"],
	    },
		kahoot: {
	        num: 7500544,
	        species: "Kahoot",
	        types: ["Dark", "Electric"],
	        gender: "N",
	        baseStats: {
	            hp: 90,
	            atk: 95,
	            def: 94,
	            spa: 110,
	            spd: 84,
	            spe: 78
	        },
	        abilities: {
	            0: "Test Cram"
	        },
	        heightm: 0.6,
	        weightkg: 13.8,
	        color: "Black",
	        eggGroups: ["Undiscovered"],
	    },
		laprasnow: {
	        num: 7500545,
	        species: "Laprasnow",
	        types: ["Grass", "Water"],
	        baseStats: {
	            hp: 120,
	            atk: 98,
	            def: 87,
	            spa: 98,
	            spd: 100,
	            spe: 70
	        },
	        abilities: {
	            0: "Snow Absorb"
	        },
	        heightm: 2.35,
	        weightkg: 177.75,
	        color: "Blue",
		  otherFormes: ["laprasnowmega"],
	        eggGroups: ["Monster"],
	    },
	    laprasnowmega: {
	        num: 7500545,
	        species: "Laprasnow-Mega",
	        baseSpecies: "Laprasnow",
	        forme: "Mega",
	        formeLetter: "M",
	        types: ["Grass", "Water"],
	        baseStats: {
	            hp: 120,
	            atk: 138,
	            def: 117,
	            spa: 138,
	            spd: 120,
	            spe: 40
	        },
	        abilities: {
	            0: "Snow Warning"
	        },
	        heightm: 2.85,
	        weightkg: 227.25,
	        color: "Blue",
	        eggGroups: ["Monster"],
	    },
		kars: {
	        num: 7500546,
	        species: "Kars",
	        types: ["Fairy"],
	        baseStats: {
	            hp: 43,
	            atk: 40,
	            def: 40,
	            spa: 65,
	            spd: 55,
	            spe: 55
	        },
	        abilities: {
	            0: "Ultimate Lifeform"
	        },
	        heightm: 0.6,
	        weightkg: 13.4,
	        color: "White",
	        eggGroups: ["Amorphous"],
	    },
		fletchitina: {
	        num: 7500547,
	        species: "Fletchitina",
	        types: ["Fire", "Ghost"],
	        baseStats: {
	            hp: 106,
	            atk: 96,
	            def: 86,
	            spa: 108,
	            spd: 87,
	            spe: 87
	        },
	        abilities: {
	            0: "Gale Levitation"
	        },
	        heightm: 3.8,
	        weightkg: 333,
	        color: "Red",
	        eggGroups: ["Undiscovered"],
	    },
		bibokrook: {
	        num: 7500548,
	        species: "Bibokrook",
	        types: ["Dark", "Water"],
	        baseStats: {
	            hp: 97,
	            atk: 111,
	            def: 80,
	            spa: 70,
	            spd: 75,
	            spe: 91
	        },
	        abilities: {
	            0: "Confidence Boost"
	        },
	        heightm: 1.25,
	        weightkg: 63.9,
	        color: "Red",
	        eggGroups: ["Field"],
	    },
	lycanitan: {
	        num: 7500549,
	        species: "Lycanitan",
	        baseForme: "Nightmare",
	        types: ["Fire", "Rock"],
	        baseStats: {
	            hp: 100,
	            atk: 138,
	            def: 70,
	            spa: 52,
	            spd: 70,
	            spe: 112
	        },
	        abilities: {
	            0: "Paw Prayer"
	        },
	        color: "Red",
	        heightm: 1.05,
	        weightkg: 58.95,
	        eggGroups: ["Field"],
	        otherFormes: ["lycanitandaydream"],
	    },
	lycanitandaydream: {
	        num: 7500549,
	        species: "Lycanitan-Daydream",
	        baseSpecies: "Lycanitan",
	        forme: "Daydream",
	        formeLetter: "D",
	        types: ["Fire", "Psychic"],
	        baseStats: {
	            hp: 100,
	            atk: 52,
	            def: 120,
	            spa: 138,
	            spd: 120,
	            spe: 82
	        },
	        abilities: {
	            0: "Paw Prayer"
	        },
	        color: "Brown",
	        heightm: 1.05,
	        weightkg: 58.95,
	        eggGroups: ["Field"],
	    },
	minirill: {
	        num: 7500550,
	        species: "Minirill",
	        baseForme: "Antisocial",
	        types: ["Fairy", "Flying"],
			  gender: "N",
	        baseStats: {
	            hp: 65,
	            atk: 41,
	            def: 85,
	            spa: 41,
	            spd: 85,
	            spe: 68
	        },
	        abilities: {
	            0: "Social Life"
	        },
        	  color: "Brown",
	        heightm: 0.35,
	        weightkg: 44.1,
	        eggGroups: ["Undiscovered"],
	        otherFormes: ["minirillsocial"],
	    },
	minirillsocial: {
	        num: 7500550,
	        species: "Minirill-Social",
	        baseSpecies: "Minirill",
	        forme: "Social",
	        formeLetter: "S",
	        types: ["Fairy", "Flying"],
			  gender: "N",
	        baseStats: {
	            hp: 65,
	            atk: 85,
	            def: 41,
	            spa: 85,
	            spd: 41,
	            spe: 128
	        },
	        abilities: {
	            0: "Social Life"
	        },
	        color: "White",
	        heightm: 0.35,
	        weightkg: 4.4,
	        eggGroups: ["Undiscovered"],
	    },
		tomb2: {
	        num: 7500551,
	        species: "Tomb2",
	        types: ["Ghost", "Normal"],
	        baseStats: {
	            hp: 87,
	            atk: 86,
	            def: 109,
	            spa: 98,
	            spd: 111,
	            spe: 47
	        },
	        abilities: {
	            0: "Firewall"
	        },
	        heightm: 0.8,
	        weightkg: 70.25,
	        color: "Purple",
	        eggGroups: ["Undiscovered"],
	    },
	pikachuash: {
	        num: 25,
	        species: "Pikachu-Ash",
	        baseSpecies: "Pikachu",
	        forme: "Ash",
	        formeLetter: "A",
	        types: ["Electric"],
			  gender: "M",
	        baseStats: {
	            hp: 35,
	            atk: 75,
	            def: 40,
	            spa: 50,
	            spd: 50,
	            spe: 110
	        },
	        abilities: {
	            0: "Friction Charge"
	        },
	        heightm: 0.4,
	        weightkg: 6,
	        color: "Yellow",
	        eggGroups: ["Undiscovered"],
			  otherForms: ["pikachuashhoenn", "pikachuashsinnoh", "pikachuashunova", "pikachuashkalos", "pikachuashalola"],
	    },
		talestoutaloland: {
	        num: 7500553,
	        species: "Talestout-Aloland",
	        types: ["Fairy", "Normal"],
	        baseStats: {
	            hp: 89,
	            atk: 98,
	            def: 92,
	            spa: 73,
	            spd: 105,
	            spe: 104
	        },
	        abilities: {
	            0: "Blizzard Blur"
	        },
	        color: "Blue",
	        heightm: 1.15,
	        weightkg: 40.45,
	        eggGroups: ["Field"],
	    },
	grousle: {
	    num: 7500554,
	    species: "Grousle",
	    types: ["Ground", "Electric"],
       gender: "N",
	    baseStats: {
	        hp: 90,
	        atk: 100,
	        def: 90,
	        spa: 110,
	        spd: 94,
	        spe: 92
	    },
	    abilities: {
	        0: "Solar Panel"
	    },
        color: "Red",
	    heightm: 1.95,
	    weightkg: 477.1,
	    eggGroups: ["Undiscovered"],
	    otherFormes: ["grousleprimal"],
	},
        grousleprimal: {
            num: 7500554,
            species: "Grousle-Primal",
            baseSpecies: "Grousle",
            forme: "Primal",
            formeLetter: "P",
	    		types: ["Ground", "Fire"],
      		gender: "N",
	   		baseStats: {
			        hp: 90,
	        		  atk: 130,
			        def: 110,
	  		     	  spa: 160,
	        		  spd: 94,
	       		  spe: 92
	   		 },
	    		abilities: {
	        		0: "Desolate Land"
	    		},
	        color: "Red",
	    		heightm: 3.45,
	    		weightkg: 526.8,
	    		eggGroups: ["Undiscovered"],
       },
		region: {
	        num: 7500555,
	        species: "Region",
	        types: ["Ice"],
	        baseStats: {
	            hp: 92,
	            atk: 55,
	            def: 125,
	            spa: 115,
	            spd: 147,
	            spe: 57
	        },
	        abilities: {
	            0: "Tour To Russia"
	        },
	        color: "Blue",
	        heightm: 1.3,
	        weightkg: 100.45,
	        eggGroups: ["Undiscovered"],
	    },
		wagonite: {
		        num: 7500556,
		        species: "Wagonite",
		        types: ["Water", "Flying"], //110	117	102	107	105	82
		        baseStats: {
		            hp: 110,
		            atk: 117,
		            def: 102,
		            spa: 107,
		            spd: 105,
		            spe: 82
		        },
		        abilities: {
		            0: "Ice Scale"
		        },
	        color: "Blue",
		        heightm: 1.8,
		        weightkg: 180.3,
		        eggGroups: ["Water 1"],
		    },
		    drewni: {
		        num: 7500557,
		        species: "Drewni",
		        types: ["Dragon", "Psychic"],
		        gender: "N",
		        baseStats: {
		            hp: 105,
		            atk: 120,
		            def: 99,
		            spa: 115,
		            spd: 100,
		            spe: 100
		        },
		        abilities: {
		            0: "Synch Scale"
		        },
		        heightm: 1.3,
		        weightkg: 107,
		        color: "Brown",
		        eggGroups: ["Undiscovered"],
		    },
		    topper: {
		        num: 7500558,
		        species: "Topper",
		        types: ["Fairy", "Flying"],
			     genderRatio: {M: 0.75, F: 0.25},
		        baseStats: {
		            hp: 82,
		            atk: 60,
		            def: 107,
		            spa: 117,
		            spd: 102,
		            spe: 82
		        },
		        abilities: {
		            0: "Afterstorm"
		        },
	        		color: "White",
		        heightm: 1.35,
		        weightkg: 33,
		        eggGroups: ["Flying"],
		    },
		    qwilala: {
		        num: 7500559,
		        species: "Qwilala",
		        types: ["Poison", "Ghost"],
		        baseStats: {
		            hp: 101,
		            atk: 104,
		            def: 102,
		            spa: 101,
		            spd: 101,
		            spe: 91
		        },
		        abilities: {
		            0: "Poison Shield"
		        },
		        heightm: 2.25,
		        weightkg: 61.95,
				  color: "Purple",
		        eggGroups: ["Undiscovered"],
		    },
		    accelerateddetox: {
		        num: 7500560,
		        species: "Accelerated Detox",
		        types: ["Electric", "Psychic"],
				  gender: "N",
		        baseStats: {
		            hp: 57,
		            atk: 130,
		            def: 50,
		            spa: 130,
		            spd: 50,
		            spe: 170
		        },
		        abilities: {
		            0: "Purgative Nostrum"
		        },
		        heightm: 1.45,
		        weightkg: 63.7,
				  color: "Red",
		        eggGroups: ["Undiscovered"],
		    },
		    quendorus: {
		        num: 7500561,
		        species: "Quendorus",
		        types: ["Bug", "Flying"],
				  gender: "N",
		        baseStats: {
		            hp: 99,
		            atk: 107,
		            def: 96,
		            spa: 107,
		            spd: 96,
		            spe: 70
		        },
		        abilities: {
		            0: "Scary Sandwich"
		        },
		        heightm: 1.35,
		        weightkg: 53.25,
				  color: "Yellow",
		        eggGroups: ["Undiscovered"],
		    },
		        farfect: {
		            num: 7500562, 
					  	species: "Farfect",
		            types: ["Normal", "Bug"],
		            gender: "N",
		            baseStats: {
		                hp: 61,
		                atk: 125,
		                def: 80,
		                spa: 90,
		                spd: 80,
		                spe: 91
		            },
		            abilities: {
		                0: "Rebel"
		            },
		            heightm: 1.5,
		            weightkg: 82.5,
		            color: "Purple",
		            eggGroups: ["Undiscovered"],
		        },
					cocaine: {
		            num: 7500563, 
		            species: "Cocaine",
		            types: ["Water", "Grass"],
		            gender: "N",
		            baseStats: {
		                hp: 90,
		                atk: 110,
		                def: 110,
		                spa: 130,
		                spd: 110,
		                spe: 90
		            },
		            abilities: {
		                0: "Anesthesia"
		            },
		            heightm: 1.15,
		            weightkg: 100,
		            color: "Green",
		            eggGroups: ["Undiscovered"],
		        },
					poliwhirl: {
						num: 61,
						species: "Poliwhirl",
						types: ["Water"],
						baseStats: {hp: 65, atk: 65, def: 65, spa: 50, spd: 50, spe: 90},
						abilities: {0: "Water Absorb", 1: "Damp", H: "Swift Swim"},
						heightm: 1,
						weightkg: 20,
						color: "Blue",
						prevo: "poliwag",
						evos: ["poliwrath", "politoed", "polipolihotter"],
						evoLevel: 25,
						eggGroups: ["Water 1"],
					},
					polipolihotter: {
						num: 7500564,
						species: "Polipoli-Hotter",
						types: ["Water", "Fighting"],
						baseStats: {hp: 100, atk: 95, def: 95, spa: 90, spd: 105, spe: 90},
						abilities: {0: "Full Steam Ahead"},
						heightm: 1.2,
						weightkg: 43.95,
						color: "Green",
						prevo: "poliwhirl",
						evoLevel: 25,
						eggGroups: ["Water 1"],
					},
		   	 zebstoar: {
		   	     num: 7500565,
		   	     species: "Zebstoar",
		   	     types: ["Electric", "Fire"],
			   	  genderRatio: {M: 0.75, F: 0.25},
		   	     baseStats: {
		   	         hp: 102,
		   	         atk: 121,
		   	         def: 74,
		   	         spa: 100,
		   	         spd: 74,
		   	         spe: 100
		   	     },
		   	     abilities: {
		   	         0: "Juggernaut"
		   	     },
			        color: "Black",
		   	     heightm: 1.6,
		   	     weightkg: 114.75,
		   	     eggGroups: ["Field"],
		   	 },
		   	 frostapex: {
		   	     num: 7500566,
		   	     species: "Frostapex",
		   	     types: ["Ice", "Poison"],
        			  gender: "N",
		   	     baseStats: { //70	64	129	99	124	60
		   	         hp: 70,
		   	         atk: 64,
		   	         def: 129,
		   	         spa: 99,
		   	         spd: 124,
		   	         spe: 60
		   	     },
		   	     abilities: {
		   	         0: "Air Raider"
		   	     },
			        color: "Red",
		   	     heightm: 0.5,
		   	     weightkg: 7.4,
		   	     eggGroups: ["Undiscovered"],
		   	 },
		   	 passcraft: {
		   	     num: 7500567,
		   	     species: "Passcraft",
		   	     types: ["Fighting"],
		   	     baseStats: { //92	115	112	52	97	79
		   	         hp: 92,
		   	         atk: 115,
		   	         def: 112,
		   	         spa: 52,
		   	         spd: 97,
		   	         spe: 79
		   	     },
		   	     abilities: {
		   	         0: "Interception"
		   	     },
			        color: "White",
		   	     heightm: 1.55,
		   	     weightkg: 56.4,
		   	     eggGroups: ["Field"],
		   	 },
		   	 shoo: {
		   	     num: 7500568,
		   	     species: "Shoo",
		   	     types: ["Fairy", "Ghost"],
        			  gender: "N",
		   	     baseStats: {
		   	         hp: 107,
		   	         atk: 87,
		   	         def: 82,
		   	         spa: 130,
		   	         spd: 130,
		   	         spe: 65
					  },
		   	     abilities: {
		   	         0: "Itemize"
		   	     },
   				  heightm: 0.8,
   				  weightkg: 16.3,
				     color: "Purple",
		   	     eggGroups: ["Undiscovered"],
		   	 },
		   	 amunra: {
		   	     num: 7500569,
		   	     species: "Amun-Ra",
		   	     types: ["Electric", "Ghost"],
        			  gender: "N",
		   	     baseStats: {
		   	         hp: 80,
		   	         atk: 60,
		   	         def: 130,
		   	         spa: 130,
		   	         spd: 103,
		   	         spe: 45
					  },
		   	     abilities: {
		   	         0: "The Hidden One"
		   	     },
     				  color: "Yellow",
   				  heightm: 1.45,
   				  weightkg: 128.25,
		   	     eggGroups: ["Mineral"],
		   	 },
	cubone: {
		num: 104,
		species: "Cubone",
		types: ["Ground"],
		baseStats: {hp: 50, atk: 50, def: 95, spa: 40, spd: 50, spe: 35},
		abilities: {0: "Rock Head", 1: "Lightning Rod", H: "Battle Armor"},
		heightm: 0.4,
		weightkg: 6.5,
		color: "Brown",
		evos: ["marowak", "marowakalola", "marowakprime"],
		eggGroups: ["Monster"],
	},
				 marowakprime: {
					num: 105,
					species: "Marowak-Prime",
					baseSpecies: "Marowak",
					forme: "Prime",
					formeLetter: "P",
					types: ["Ground", "Fire"],
					baseStats: {
						hp: 75,
						atk: 95,
						def: 125,
						spa: 65,
						spd: 95,
						spe: 60,
					},
					abilities: {
						0: "Rock Head"
					},
					heightm: 1.0,
					weightkg: 39.5,
					prevo: "cubone",
					evoLevel: 28,
					color: "Brown",
					eggGroups: ["Monster"],
				},
		   	 arceon: {
		   	     num: 7500571,
		   	     species: "Arceon",
		   	     types: ["Fire", "Psychic"],
        			  genderRatio: {
          				M: 0.8125,
        				   F: 0.1875
        			  },
		   	     baseStats: {
		   	         hp: 80,
		   	         atk: 60,
		   	         def: 130,
		   	         spa: 130,
		   	         spd: 103,
		   	         spe: 45
					  },
		   	     abilities: {
		   	         0: "Magic Mirror"
		   	     },
     				  heightm: 1.3,
        			  weightkg: 40,
        			  color: "Pink",
					  prevo: "growlee",
					  evoLevel: 1,
		   	     eggGroups: ["Field"],
		   	 },
				 pigment: {
		   	 	num: 7500572,
	       	 	species: "Pigment",
	       	 	types: ["Psychic", "Electric"],
	       	 	baseStats: {
	       	     hp: 85,
	       	     atk: 70,
	       	     def: 72,
	       	     spa: 107,
	       	     spd: 95,
	       	 	  spe: 102
	        	 	},
	        	 	abilities: {
	        	 	    0: "Food Coloring"
	        	 	},
		         color: "Purple",
	          	heightm: 1.2,
	        	 	weightkg: 55.85,
				  otherFormes: ["pigmentmega"],
	       	 	eggGroups: ["Field"],
	    		 },
	    		 pigmentmega: {
					num: 7500572,
					species: "Pigment-Mega",
	        		baseSpecies: "Pigment",
	        		forme: "Mega",
	        		formeLetter: "M",
	        		types: ["Psychic", "Electric"],
	       	 	baseStats: {
	       	   	  hp: 85,
	       	   	  atk: 70,
	       	   	  def: 92,
	       	   	  spa: 137,
	       	   	  spd: 115,
	       	 		  spe: 132
	        	 	},
	        		abilities: {
	        		    0: "Intimidate"
	        		},
		         color: "Purple",
	          	heightm: 1.5,
	        	 	weightkg: 59.65,
	       	 	eggGroups: ["Field"],
	    		},
				 bascure: {
		   	 	num: 7500573,
	       	 	species: "Bascure",
	       	 	types: ["Water", "Dragon"],
	       	 	baseStats: {
	       	     hp: 102,
	       	     atk: 111,
	       	     def: 85,
	       	     spa: 144,
	       	     spd: 85,
	       	 	  spe: 121
	        	 	},
	        	 	abilities: {
	        	 	    0: "Turboblaze"
	        	 	},
		         color: "Green",
	          	heightm: 2,
	        	 	weightkg: 171.5,
	       	 	eggGroups: ["Undiscovered"],
	    		 },
				 cleforusfable: {
		   	 	num: 7500574,
	       	 	species: "Cleforus-Fable",
	       	 	types: ["Fairy", "Ground"],
        			gender: "M",
	       	 	baseStats: {
	       	     hp: 102,
	       	     atk: 97,
	       	     def: 91,
	       	     spa: 125,
	       	     spd: 85,
	       	 	  spe: 80
	        	 	},
	        	 	abilities: {
	        	 	    0: "Zero Awareness"
	        	 	},
		         color: "Brown",
	          	heightm: 1.4,
	        	 	weightkg: 54,
	       	 	eggGroups: ["Undiscovered"],
	    		 },
				 frozerade: {
     				 num: 7500575,
    				 species: "Frozerade",
    				 types: ["Ghost", "Poison"],
        			 gender: "F",
    				 baseStats: {hp: 75, atk: 85, def: 77, spa: 102, spd: 97, spe: 110},
    				 abilities: {0: "Natural Curse"},
    				 heightm: 1.4,
    				 weightkg: 27.6,
    				 color: "White",
    				 eggGroups: ["Fairy"],
				 },
				 ornament: {
					   num: 7500576,
						species: "Ornament",
						types: ["Fighting", "Flying"],
        			   gender: "M",
						baseStats: {hp: 80, atk: 130, def: 80, spa: 114, spd: 80, spe: 130},
						abilities: {0: "Regenerator"},
						heightm: 1.4,
						weightkg: 49.25,
						color: "Green",
						eggGroups: ["Undiscovered"],
					},
					cryomagius: {
				    num: 7500577,
				    species: "Cryomagius",
   				 types: ["Ice", "Ghost"],
   				 gender: "N",
   				 baseStats: {hp: 75, atk: 60, def: 60, spa: 125, spd: 125, spe: 130},
   				 abilities: {0: "Levitate"},
   				 heightm: 1.0,
   				 weightkg: 76.2,
   				 color: "Purple",
   				 eggGroups: ["Undiscovered"],
				   },
					chantran: {
					     num: 7500578,
					     species: "Chantran",
					     types: ["Ghost", "Steel"],
					     baseStats: {hp: 100, atk: 77, def: 103, spa: 142, spd: 103, spe: 98},
					     abilities: {0: "Flash Fire"},
					     heightm: 1.4,
					     weightkg: 232.2,
					     color: "Purple",
					     eggGroups: ["Undiscovered"],
					},
					necrotune: { 
						num: 7500579,
						species: "Necrotune",
						types: ["Bug","Steel"],
						genderRatio: "{M: 50, F: 50}",
						baseStats: {hp: 92, atk: 131, def: 94, spa: 94, spd: 90, spe: 71},
						abilities: {0: "Technological Armor"},
						heightm: 1,
						weightkg: 242.75,
						color: "Yellow",
						eggGroups: ["Undiscovered"],
					},
	    		 	necrotuneultra: {
						num: 7500579,
						species: "Necrotune-Ultra",
	        			baseSpecies: "Necrotune",
	        			forme: "Ultra",
	        			formeLetter: "U",
						types: ["Bug","Dragon"],
						baseStats: {hp: 92, atk: 141, def: 64, spa: 141, spd: 64, spe: 123},
	        			abilities: {
	        			    0: "Neuroforce"
	        			},
		        	   color: "Yellow",
						heightm: 4.7,
						weightkg: 12.75,
	       		 	eggGroups: ["Undiscovered"],
	    			},
					dramaqueen: {
				     num: 7500580,
				     species: "Dramaqueen",
				     types: ["Normal", "Poison"],
   				  gender: "F",
				     baseStats: {hp: 102, atk: 76, def: 86, spa: 125, spd: 88, spe: 56},
				     abilities: {0: "Dramatic Rage"},
				     heightm: 3.0,
				     weightkg: 189.0,
				     color: "Blue",
				     eggGroups: ["Monster"],
					},
					landoroarroyal: { 
				     num: 7500581,
				     species: "Landoroar-Royal",
				     types: ["Ground", "Dark"],
   				  gender: "M",
				     baseStats: {hp: 97, atk: 150, def: 95, spa: 97, spd: 95, spe: 100},
				     abilities: {0: "Intimidate"},
				     heightm: 1.6,
				     weightkg: 75.5,
				     color: "Red",
				     eggGroups: ["Undiscovered"],
					},
					wiseau: {
						num: 7500582,
						species: "Wiseau",
						types: ["Water", "Ground"],
						baseStats: {hp: 112, atk: 117, def: 92, spa: 77, spd: 72, spe: 67},
						abilities: {0: "Tommy's Room"},
						heightm: 1.95,
						weightkg: 183,
						color: "Blue",
						eggGroups: ["Field"],
					},
					nut: {
   						num: 7500583,
  						   species: "Nut",
 						   types: ["Water", "Steel"],
   				  		gender: "N",
						   baseStats: {hp: 66, atk: 131, def: 81, spa: 89, spd: 72, spe: 91},
 						   abilities: {0: "Hardened Body"},
 						   heightm: 2.2,
						   weightkg: 236,
						   color: "White",
						   eggGroups: ["Undiscovered"],
					},
					ultraburstnut: {
   						num: 7500583,
							species: "Ultra Burst Nut",
							baseSpecies: "Nut",
							forme: "Ultra Burst",
							formeLetter: "U",
							types: ["Water", "Dragon"],
   				  		gender: "N",
							baseStats: {hp: 66, atk: 141, def: 51, spa: 141, spd: 51, spe: 143},
							abilities: {0: "Neuroforce"},
							heightm: 4.1,
							weightkg: 6,
							color: "White",
							eggGroups: ["Undiscovered"],
					},
					aegipass: {
					    num: 7500584,
					    species: "Aegipass",
 					    baseForme: "Magnetic",
					    types: ["Steel", "Rock"],
 					    baseStats: {hp: 70, atk: 62, def: 157, spa: 72, spd: 160, spe: 60},
					    abilities: {0: "Desert Mirage"},
					    heightm: 1.5,
					    weightkg: 196.5,
					    color: "Brown",
					    eggGroups: ["Mineral"],
					    otherFormes: ["aegipassdirectional"],
					},
					aegipassdirectional: {
					    num: 7500584,
					    species: "Aegipass-Directional",
					    baseSpecies: "Aegipass",
 					    forme: "Directional",
					    formeLetter: "D",
					    types: ["Steel", "Rock"],
					    baseStats: {hp: 70, atk: 157, def: 62, spa: 160, spd: 72, spe: 60},
					    abilities: {0: "Desert Mirage"},
					    heightm: 1.5,
					    weightkg: 196.5,
					    color: "Brown",
					    eggGroups: ["Mineral"],
					},
					wall: {
					  num: 7500585,
				     species: "Wall",
				     types: ["Normal", "Steel"],
   				  gender: "N",
				     baseStats: {hp: 80, atk: 140, def: 135, spa: 54, spd: 94, spe: 29},
				     abilities: {0: "No Immigrants Allowed"},
				     heightm: 3.1,
				     weightkg: 417.1,
				     color: "Gray",
				     eggGroups: ["Undiscovered"],
				},
				honoka: {
					  num: 7500586,
				     species: "Honoka",
				     types: ["Fire", "Steel"],
   				  gender: "N",
				     baseStats: {hp: 110, atk: 135, def: 105, spa: 67, spd: 109, spe: 77},
				     abilities: {0: "Melody of the Heart"},
				     heightm: 2.5,
				     weightkg: 114.25,
				     color: "Red",
				     eggGroups: ["Undiscovered"],
				},
				unfeasable: {
				  num: 7500587,
   			  species: "Unfeasable",
   			  types: ["Normal", "Flying"],
   			  baseStats: {hp: 82, atk: 112, def: 82, spa: 73, spd: 68, spe: 106},
   			  abilities: {0: "360 No-Scope"},
   			  heightm: 1.4,
   			  weightkg: 39.4,
   			  color: "Brown",
   			  eggGroups: ["Flying"],
				},
				aegivally: {
			    num: 7500588,
			    species: "Aegivally",
			    baseForme: "Bulwark",
			    types: ["Normal", "Steel"],
   			 gender: "N",
			    baseStats: {hp: 91, atk: 72, def: 135, spa: 72, spd: 135, spe: 77},
			    abilities: {0: "Tactical Computer"},
			    heightm: 2,
			    weightkg: 76.75,
			    color: "Brown",
				 prevo: "typeblade",
			    eggGroups: ["Undiscovered"],
			    otherFormes: ["aegivallyguerilla"],
				},
				aegivallyguerilla: {
				    num: 7500588,
				    species: "Aegivally-Guerilla",
				    baseSpecies: "Aegivally",
				    forme: "Guerilla",
				    formeLetter: "G",
   				 types: ["Normal", "Steel"],
   				 gender: "N",
  				    baseStats: {hp: 91, atk: 135, def: 72, spa: 135, spd: 72, spe: 72},
				    abilities: {0: "Tactical Computer"},
				    heightm: 2,
				    weightkg: 76.75,
				    color: "Brown",
				    eggGroups: ["Undiscovered"],
				},
	
			/* Aegivally formes go here*/ 
	
				necrogarde: {
				     num: 7500589,
				     species: "Necrogarde",
				     types: ["Psychic", "Ground"],
   				  gender: "N",
 				     baseStats: {hp: 102, atk: 103, def: 111, spa: 104, spd: 112, spe: 107},
   				  abilities: {0: "Shattered Prism"},
  				     heightm: 3.7,
				     weightkg: 267.5,
				     color: "Green",
				     eggGroups: ["Undiscovered"],
				},
				celmuse: {
				     num: 7500590,
				     species: "Celmuse",
				     types: ["Ghost", "Psychic"],
				     gender: "N",
				     baseStats: {hp: 110, atk: 98, def: 87, spa: 125, spd: 87, spe: 35},
				     abilities: {0: "Magicworker"},
				     heightm: 3.9,
				     weightkg: 115,
				     color: "Green",
				     eggGroups: ["Undiscovered"],
				},
				typeblade: {
     			     num: 7500591,
     			     species: "Type: Blade",
     			     types: ["Normal", "Steel"],
   				  gender: "N",
     			     baseStats: {hp: 91, atk: 104, def: 135, spa: 70, spd: 83, spe: 47},
    			     abilities: {0: "Ravage"},
     			     heightm: 1.9,
    			     weightkg: 120.5,
					  evos: ["aegivally"],
     			     color: "Brown",
     			     eggGroups: ["Undiscovered"],
				},
	    mewdeuca: {
        num: 7500592,
        species: "Mewdeuca",
        types: ["Poison", "Psychic"],
        baseStats: {
            hp: 89,
            atk: 120,
            def: 89,
            spa: 115,
            spd: 89,
            spe: 130
        },
        abilities: {
            0: "Unnerve"
        },
		  color: "Purple",
        heightm: 2.75,
        weightkg: 93.5,
		  otherFormes: ["mewdeucamegax", "mewdeucamegay"],
     	 eggGroups: ["Undiscovered"],
    },
    mewdeucamegax: {
        num: 7500592,
        species: "Mewdeuca-Mega-X",
        baseSpecies: "Mewdeuca",
        forme: "Mega",
        formeLetter: "M",
        types: ["Poison", "Fighting"],
        baseStats: {
            hp: 89,
            atk: 200,
            def: 99,
            spa: 115,
            spd: 99,
            spe: 130
        },
        abilities: {
            0: "Steadfast"
        },
		  color: "Purple",
        heightm: 3.05,
        weightkg: 98.5,
     	  eggGroups: ["Undiscovered"],
    },
    mewdeucamegay: {
        num: 7500592,
        species: "Mewdeuca-Mega-Y",
        baseSpecies: "Mewdeuca",
        forme: "Mega",
        formeLetter: "M",
        types: ["Poison", "Psychic"],
        baseStats: {
            hp: 89,
            atk: 160,
            def: 69,
            spa: 155,
            spd: 119,
            spe: 140
        },
        abilities: {
            0: "Insomnia"
        },
		  color: "Purple",
        heightm: 2.25,
        weightkg: 25.3,
     	  eggGroups: ["Undiscovered"],
    },
	    swalokumlol: {
        num: 7500593,
        species: "Swalokum-Lol",
        types: ["Dark", "Poison"],
        baseStats: {
            hp: 112,
            atk: 99,
            def: 89,
            spa: 79,
            spd: 101,
            spe: 62
        },
        abilities: {
            0: "Slime Drench"
        },
		  color: "Purple",
        heightm: 1.35,
        weightkg: 66,
     	  eggGroups: ["Amorphous"],
    },
	    zalula: {
        num: 7500594,
        species: "Zalula",
        types: ["Fairy", "Ghost"],
        baseStats: {
            hp: 130,
            atk: 81,
            def: 100,
            spa: 98,
            spd: 105,
            spe: 73
        },
        abilities: {
            0: "Shadow Scale"
        },
		  color: "Blue",
        heightm: 2.4,
        weightkg: 74.25,
     	  eggGroups: ["Undiscovered"],
    },
	    lazugari: {
        num: 7500595,
        species: "Lazugari",
        types: ["Water", "Psychic"],
        baseStats: {
            hp: 120,
            atk: 75,
            def: 120,
            spa: 75,
            spd: 120,
            spe: 80
        },
        abilities: {
            0: "Power Scale"
        },
		  color: "Blue",
        heightm: 3,
        weightkg: 122.25,
     	  eggGroups: ["Undiscovered"],
    },
	    amooh: {
        num: 7500596,
        species: "Amo-Oh",
        types: ["Poison", "Flying"],
        baseStats: {
            hp: 130,
            atk: 112,
            def: 105,
            spa: 102,
            spd: 122,
            spe: 65
        },
        abilities: {
            0: "Regenerator"
        },
		  color: "Red",
        heightm: 2.2,
        weightkg: 104.75,
     	  eggGroups: ["Undiscovered"],
    },
	    celenitar: {
        num: 7500597,
        species: "Celenitar",
        types: ["Grass", "Rock"],
        baseStats: {
            hp: 105,
            atk: 120,
            def: 115,
            spa: 99,
            spd: 100,
            spe: 100
        },
        abilities: {
            0: "Sand Spa"
        },
		  color: "Green",
        heightm: 1.3,
        weightkg: 103.5,
		  otherFormes: ["celenitarmega"],
     	  eggGroups: ["Undiscovered"],
    },
    celenitarmega: {
        num: 7500597,
        species: "Celenitar-Mega",
        baseSpecies: "Celenitar",
        forme: "Mega",
        formeLetter: "M",
        types: ["Grass", "Rock"],
        baseStats: {
            hp: 105,
            atk: 150,
            def: 155,
            spa: 99,
            spd: 120,
            spe: 110
        },
        abilities: {
            0: "Sand Stream"
        },
        heightm: 1.8,
        weightkg: 156.5,
        color: "Green",
        eggGroups: ["Undiscovered"],
    },
	    perperioralola: {
        num: 7500598,
        species: "Perperior-Alola",
        types: ["Dark", "Ground"],
        baseStats: {
            hp: 100,
            atk: 110,
            def: 105,
            spa: 75,
            spd: 70,
            spe: 87
        },
        abilities: {
            0: "Shocked"
        },
		  color: "Gray",
        heightm: 1.75,
        weightkg: 157.9,
     	  eggGroups: ["Field"],
    },
	    helltank: {
        num: 7500599,
        species: "Helltank",
        types: ["Ghost", "Normal"],
		  gender: "N",
        baseStats: {
            hp: 84,
            atk: 105,
            def: 120,
            spa: 63,
            spd: 100,
            spe: 70
        },
        abilities: {
            0: "Buns of Steel"
        },
		  color: "Green",
        heightm: 2.55,
        weightkg: 142.75,
     	  eggGroups: ["Undiscovered"],
    },
	    bastiosaur: {
        num: 7500600,
        species: "Bastiosaur",
        types: ["Steel", "Poison"],
        baseStats: {
            hp: 80,
            atk: 77,
            def: 135,
            spa: 83,
            spd: 129,
            spe: 65
        },
        abilities: {
            0: "Meaty"
        },
		  color: "Green",
        heightm: 1.65,
        weightkg: 124.75,
		  otherFormes: ["bastiosaurmega"],
     	  eggGroups: ["Monster"],
    },
    bastiosaurmega: {
        num: 7500600,
        species: "Bastiosaur-Mega",
        baseSpecies: "Bastiosaur",
        forme: "Mega",
        formeLetter: "M",
        types: ["Steel", "Poison"],
        baseStats: {
            hp: 80,
            atk: 95,
            def: 175,
            spa: 105,
            spd: 149,
            spe: 65
        },
        abilities: {
            0: "Thick Fat"
        },
        heightm: 2.05,
        weightkg: 180.25,
        color: "Green",
        eggGroups: ["Monster"],
    },
	    aggralugg: {
        num: 7500601,
        species: "Aggralugg",
        types: ["Steel", "Ice"],
        baseStats: {
            hp: 97,
            atk: 128,
            def: 197,
            spa: 67,
            spd: 68,
            spe: 54
        },
        abilities: {
            0: "Sturdy"
        },
		  color: "Blue",
        heightm: 2.05,
        weightkg: 432.5,
		  otherFormes: ["aggraluggmega"],
     	  eggGroups: ["Monster"],
    },
    aggraluggmega: {
        num: 7500601,
        species: "Aggralugg-Mega",
        baseSpecies: "Aggralugg",
        forme: "Mega",
        formeLetter: "M",
        types: ["Steel"],
        baseStats: {
            hp: 97,
            atk: 158,
            def: 247,
            spa: 67,
            spd: 88,
            spe: 54
        },
        abilities: {
            0: "Filter"
        },
        heightm: 2.15,
        weightkg: 467.5,
        color: "Blue",
        eggGroups: ["Monster"],
    },
	    audigardez: {
        num: 7500602,
        species: "Audigardez",
		  gender: "N",
        types: ["Dragon", "Normal"],
        baseStats: {
            hp: 125,
            atk: 80,
            def: 105,
            spa: 70,
            spd: 105,
            spe: 80
        },
        abilities: {
            0: "Big Nurse"
        },
		  color: "Green",
        heightm: 3.05,
        weightkg: 168,
		  otherFormes: ["audigardezdoctor", "audigardezmega", "audigardezmegadoctor"],
     	  eggGroups: ["Undiscovered"],
    },
    audigardezmega: {
        num: 7500602,
        species: "Audigardez-Mega",
        baseSpecies: "Audigardez",
		  gender: "N",
        forme: "Mega",
        formeLetter: "M",
        types: ["Dragon", "Fairy"],
        baseStats: {
            hp: 125,
            atk: 80,
            def: 145,
            spa: 90,
            spd: 145,
            spe: 80
        },
        abilities: {
            0: "Healer"
        },
        heightm: 3.45,
        weightkg: 169,
        color: "Green",
        eggGroups: ["Undiscovered"],
    },
	    audigardezdoctor: {
        num: 7500602,
        species: "Audigardez-Doctor",
        baseSpecies: "Audigardez",
		  gender: "N",
        forme: "Doctor",
        formeLetter: "D",
        types: ["Dragon", "Normal"],
        baseStats: {
            hp: 233,
            atk: 80,
            def: 105,
            spa: 80,
            spd: 105,
            spe: 70
        },
        abilities: {
            0: "Big Nurse"
        },
		  color: "Green",
        heightm: 2.55,
        weightkg: 473,
     	  eggGroups: ["Undiscovered"],
    },
    audigardezmegadoctor: {
        num: 7500602,
        species: "Audigardez-Mega-Doctor",
        baseSpecies: "Audigardez",
		  gender: "N",
        forme: "Mega",
        formeLetter: "M",
        types: ["Dragon", "Fairy"],
        baseStats: {
            hp: 233,
            atk: 80,
            def: 145,
            spa: 100,
            spd: 145,
            spe: 70
        },
        abilities: {
            0: "Healer"
        },
        heightm: 2.95,
        weightkg: 474,
        color: "Green",
        eggGroups: ["Undiscovered"],
    },
	    reggaeton: {
        num: 7500603,
        species: "Reggaeton",
        types: ["Steel"],
        baseStats: {
            hp: 70,
            atk: 115,
            def: 137,
            spa: 110,
            spd: 97,
            spe: 74
        },
        abilities: {
            0: "Is This The Right Festival?"
        },
		  color: "Gray",
        heightm: 1.8,
        weightkg: 221.25,
		  otherFormes: ["reggaetonmega"],
     	  eggGroups: ["Undiscovered"],
    },
    reggaetonmega: {
        num: 7500603,
        species: "Reggaeton-Mega",
        baseSpecies: "Reggaeton",
        forme: "Mega",
        formeLetter: "M",
        types: ["Steel"],
        baseStats: {
            hp: 70,
            atk: 145,
            def: 187,
            spa: 110,
            spd: 117,
            spe: 74
        },
        abilities: {
            0: "Filter"
        },
        heightm: 1.9,
        weightkg: 256.25,
        color: "Gray",
        eggGroups: ["Undiscovered"],
    },
    happory: {
        num: 7500604,
        species: "Happory",
        types: ["Normal"],
        gender: "N",
        baseStats: {
            hp: 102,
            atk: 32,
            def: 57,
            spa: 50,
            spd: 70,
            spe: 35
        },
        abilities: {
            0: "Hardware"
        },
        heightm: 0.7,
        weightkg: 30.45,
        color: "Red",
		  evos: ["porysey2"],
        eggGroups: ["Undiscovered"],
    },
    porysey2: {
        num: 7500605,
        species: "Porysey2",
        types: ["Normal"],
        gender: "N",
        baseStats: {
            hp: 182,
            atk: 42,
            def: 67,
            spa: 70,
            spd: 100,
            spe: 55
        },
        abilities: {
            0: "Adblock"
        },
        heightm: 0.85,
        weightkg: 33.55,
		  prevo: "happory",
		  evoType: "trade",
		  evos: ["evioliteenabler"],
        color: "Red",
        eggGroups: ["Undiscovered"],
    },
    evioliteenabler: {
        num: 75000,
        species: "Eviolite Enabler",
        types: ["Normal"],
        baseStats: {
            hp: 170,
            atk: 45,
            def: 40,
            spa: 105,
            spd: 105,
            spe: 72
        },
        abilities: {
            0: "Beast Bootleg"
        },
        heightm: 1.2,
        weightkg: 40.4,
		  prevo: "porysey2",
		  evoType: "levelFriendship",
        color: "Red",
        eggGroups: ["Undiscovered"],
    },
	    slowkumuku: {
        num: 7500606,
        species: "Slowkumuku",
        types: ["Water", "Psychic"],
        baseStats: {
            hp: 85,
            atk: 77,
            def: 130,
            spa: 75,
            spd: 115,
            spe: 27
        },
        abilities: {
            0: "Distracting Innards"
        },
		  color: "Gray",
        heightm: 0.95,
        weightkg: 39.85,
		  otherFormes: ["slowkumukumega"],
     	  eggGroups: ["Water 1"],
    },
    slowkumukumega: {
        num: 7500606,
        species: "Slowkumuku-Mega",
        baseSpecies: "Slowkumuku",
        forme: "Mega",
        formeLetter: "M",
        types: ["Water", "Psychic"],
        baseStats: {
            hp: 85,
            atk: 77,
            def: 200,
            spa: 105,
            spd: 115,
            spe: 27
        },
        abilities: {
            0: "Shell Armor"
        },
        heightm: 1.35,
        weightkg: 81.35,
        color: "Pink",
        eggGroups: ["Water 1"],
    },
	    azumatic: {
        num: 7500607,
        species: "Azumatic",
        types: ["Water", "Fairy"],
        baseStats: {
            hp: 107,
            atk: 65,
            def: 89,
            spa: 90,
            spd: 112,
            spe: 75
        },
        abilities: {
            0: "Wondrous Scales"
        },
		  color: "Blue",
        heightm: 3.5,
        weightkg: 95.25,
     	  eggGroups: ["Water 1"],
    },
	    eelrock: {
        num: 7500608,
        species: "Eelrock",
        types: ["Rock", "Electric"],
        baseStats: {
            hp: 102,
            atk: 107,
            def: 140,
            spa: 87,
            spd: 100,
            spe: 50
        },
        abilities: {
            0: "Stasis"
        },
		  color: "Brown",
        heightm: 1.9,
        weightkg: 155.25,
     	  eggGroups: ["Undiscovered"],
    },
	    masquero: {
        num: 7500609,
        species: "Masquero",
        types: ["Electric", "Flying"],
        baseStats: {
            hp: 85,
            atk: 105,
            def: 111,
            spa: 110,
            spd: 111,
            spe: 85
        },
        abilities: {
            0: "Disruption"
        },
		  color: "Black",
        heightm: 1.85,
        weightkg: 174.3,
     	  eggGroups: ["Undiscovered"],
    },
	    forastero: {
        num: 7500610,
        species: "Forastero",
        gender: "F",
        types: ["Grass", "Ice"],
        baseStats: {
            hp: 82,
            atk: 97,
            def: 110,
            spa: 77,
            spd: 103,
            spe: 75
        },
        abilities: {
            0: "Strangeways"
        },
		  color: "Gray",
        heightm: 1.15,
        weightkg: 68.3,
     	  eggGroups: ["Mineral"],
    },
	    pachkia: {
        num: 7500611,
        species: "Pachkia",
        types: ["Electric", "Dragon"],
        baseStats: {
            hp: 79,
            atk: 82,
            def: 105,
            spa: 105,
            spd: 105,
            spe: 105
        },
        abilities: {
            0: "Beast's Pride"
        },
		  color: "White",
        heightm: 2.3,
        weightkg: 169.95,
     	  eggGroups: ["Undiscovered"],
    },
	    sableice: {
        num: 7500612,
        species: "Sableice",
        types: ["Ghost", "Ice"],
        baseStats: {
            hp: 85,
            atk: 62,
            def: 87,
            spa: 82,
            spd: 152,
            spe: 50
        },
        abilities: {
            0: "Slippery"
        },
		  color: "Blue",
        heightm: 1.15,
        weightkg: 93,
		  otherFormes: ["sableicemega"],
     	  eggGroups: ["Undiscovered"],
    },
    sableicemega: {
        num: 7500612,
        species: "Sableice-Mega",
        baseSpecies: "Sableice",
        forme: "Mega",
        formeLetter: "M",
        types: ["Ghost", "Ice"],
        baseStats: {
            hp: 85,
            atk: 72,
            def: 137,
            spa: 102,
            spd: 202,
            spe: 20
        },
        abilities: {
            0: "Magic Bounce"
        },
        heightm: 1.15,
        weightkg: 243,
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
	    sabulu: {
        num: 7500613,
        species: "Sabulu",
        types: ["Dark", "Fairy"],
        baseStats: {
            hp: 80,
            atk: 102,
            def: 95,
            spa: 75,
            spd: 100,
            spe: 62
        },
        abilities: {
            0: "Sinful Surge"
        },
		  color: "Purple",
        heightm: 1.2,
        weightkg: 28.25,
		  otherFormes: ["sabulumega"],
     	  eggGroups: ["Undiscovered"],
    },
    sabulumega: {
        num: 7500613,
        species: "Sabulu-Mega",
        baseSpecies: "Sabulu",
        forme: "Mega",
        formeLetter: "M",
        types: ["Dark", "Fairy"],
        baseStats: {
            hp: 80,
            atk: 112,
            def: 145,
            spa: 95,
            spd: 150,
            spe: 32
        },
        abilities: {
            0: "Magic Bounce"
        },
		  color: "Purple",
        heightm: 1.2,
        weightkg: 178.25,
     	  eggGroups: ["Undiscovered"],
    },
	    dugdalealola: {
        num: 7500614,
        species: "Dugdale-Alola",
        types: ["Steel", "Ground"],
        baseStats: {
            hp: 77,
            atk: 122,
            def: 90,
            spa: 62,
            spd: 87,
            spe: 82
        },
        abilities: {
            0: "Knotted Hair"
        },
		  color: "Brown",
        heightm: 1.6,
        weightkg: 493.3,
     	  eggGroups: ["Field"],
    },
    golemprime: {
		  num: 76,
		  species: "Golem-Prime",
		  baseSpecies: "Golem",
		  forme: "Prime",
		  formeLetter: "P",
        types: ["Ground", "Electric"],
		  baseStats: {hp: 95, atk: 135, def: 145, spa: 70, spd: 80, spe: 60},
        abilities: {
            0: "Sturdy"
        },
        color: "Brown",
        heightm: 1.55,
        weightkg: 308,
		  eggGroups: ["Mineral"],
    },
	    metabrave: {
        num: 7500616,
        species: "Metabrave",
        gender: "N",
        types: ["Flying", "Steel"],
        baseStats: {
            hp: 100,
            atk: 139,
            def: 102,
            spa: 76,
            spd: 102,
            spe: 75
        },
        abilities: {
            0: "Recalcitrant"
        },
		  color: "Blue",
        heightm: 1.55,
        weightkg: 295.5,
		  otherFormes: ["metabravemega"],
     	  eggGroups: ["Undiscovered"],
    },
    metabravemega: {
        num: 7500616,
        species: "Metabrave-Mega",
        baseSpecies: "Metabrave",
        forme: "Mega",
        formeLetter: "M",
        gender: "N",
        types: ["Flying", "Steel"],
        baseStats: {
            hp: 100,
            atk: 149,
            def: 122,
            spa: 86,
            spd: 122,
            spe: 115
        },
        abilities: {
            0: "Tough Claws"
        },
        heightm: 2.45,
        weightkg: 688.4,
        color: "Blue",
        eggGroups: ["Undiscovered"],
    },
	    reversemartian: {
        num: 7500617,
        species: "Reverse Martian",
        gender: "N",
        types: ["Grass", "Fire"],
        baseStats: {
            hp: 102,
            atk: 115,
            def: 98,
            spa: 127,
            spd: 101,
            spe: 73
        },
        abilities: {
            0: "Antimatter"
        },
		  color: "Brown",
        heightm: 2.35,
        weightkg: 200.5,
     	  eggGroups: ["Undiscovered"],
    },
	    pinthim: {
        num: 7500618,
        species: "Pinthim",
        gender: "M",
        types: ["Bug"],
        baseStats: {
            hp: 77,
            atk: 119,
            def: 85,
            spa: 84,
            spd: 70,
            spe: 85
        },
        abilities: {
            0: "Pristine Lens"
        },
		  color: "Brown",
        heightm: 1.2,
        weightkg: 39.15,
		  otherFormes: ["pinthimmega"],
     	  eggGroups: ["Bug"],
    },
    pinthimmega: {
        num: 7500618,
        species: "Pinthim-Mega",
        baseSpecies: "Pinthim",
        forme: "Mega",
        formeLetter: "M",
        gender: "M",
        types: ["Bug", "Flying"],
        baseStats: {
            hp: 77,
            atk: 139,
            def: 105,
            spa: 94,
            spd: 90,
            spe: 105
        },
        abilities: {
            0: "Aerilate"
        },
		  color: "Brown",
        heightm: 1.4,
        weightkg: 43.15,
        eggGroups: ["Bug"],
    },
	    hug: {
        num: 7500619,
        species: "Hug",
        types: ["Steel", "Ice"],
        baseStats: {
            hp: 110,
            atk: 103,
            def: 145,
            spa: 90,
            spd: 96,
            spe: 52
        },
        abilities: {
            0: "Ice Wall"
        },
		  color: "Blue",
        heightm: 1.85,
        weightkg: 467.5,
     	  eggGroups: ["Undiscovered"],
    },
	slowpoke: {
		num: 79,
		species: "Slowpoke",
		types: ["Water", "Psychic"],
		baseStats: {hp: 90, atk: 65, def: 65, spa: 40, spd: 40, spe: 15},
		abilities: {0: "Oblivious", 1: "Own Tempo", H: "Regenerator"},
		heightm: 1.2,
		weightkg: 36,
		color: "Pink",
		evos: ["slowbro", "slowking", "broking"],
		eggGroups: ["Monster", "Water 1"],
	},
	    broking: {
        num: 7500620,
        species: "Broking",
        types: ["Water", "Psychic"],
        baseStats: {
            hp: 110,
            atk: 90,
            def: 110,
            spa: 115,
            spd: 110,
            spe: 45
        },
        abilities: {
            0: "Regenerator"
        },
		  color: "Pink",
		prevo: "slowpoke",
		evoLevel: 37,
        heightm: 1.8,
        weightkg: 79,
		  otherFormes: ["brokingmega"],
		eggGroups: ["Monster", "Water 1"],
    },
    brokingmega: {
        num: 7500620,
        species: "Broking-Mega",
        baseSpecies: "Broking",
        forme: "Mega",
        formeLetter: "M",
        types: ["Water", "Psychic"],
        baseStats: {
            hp: 110,
            atk: 90,
            def: 180,
            spa: 145,
            spd: 110,
            spe: 45
        },
        abilities: {
            0: "Regenerator"
        },
		  color: "Pink",
        heightm: 2.2,
        weightkg: 120.5,
		  eggGroups: ["Monster", "Water 1"],
    },
	    thor: {
        num: 7500621,
        species: "Thor",
        types: ["Electric", "Flying"],
		  gender: "M",
        baseStats: {
            hp: 84,
            atk: 120,
            def: 75,
            spa: 150,
            spd: 110,
            spe: 136
        },
        abilities: {
            0: "Prankster"
        },
		  color: "Green",
        heightm: 1.5,
        weightkg: 62,
		  eggGroups: ["Undiscovered"],
    },
	    thornordic: {
        num: 7500621,
        species: "Thor-Nordic",
        baseSpecies: "Thor",
        forme: "Nordic",
        formeLetter: "N",
        types: ["Electric", "Flying"],
		  gender: "M",
        baseStats: {
            hp: 79,
            atk: 102,
            def: 75,
            spa: 147,
            spd: 85,
            spe: 131
        },
        abilities: {
            0: "Stormy Ascent"
        },
		  color: "Green",
        heightm: 2.2,
        weightkg: 62,
		  eggGroups: ["Undiscovered"],
    },
	    finiscor: {
        num: 7500622,
        species: "Finiscor",
        types: ["Ground", "Water"],
        baseStats: {
            hp: 92,
            atk: 85,
            def: 120,
            spa: 70,
            spd: 125,
            spe: 90
        },
        abilities: {
            0: "Mist Rejuvenation"
        },
		  color: "Purple",
        heightm: 1.65,
        weightkg: 31.85,
		  fusion: ["Gliscor", "Tapu Fini"],
		  eggGroups: ["Undiscovered"],
    },
	    salad: {
        num: 7500623,
        species: "Salad",
        types: ["Ground", "Flying"],
		  gender: "M",
        baseStats: {
            hp: 100,
            atk: 150,
            def: 100,
            spa: 115,
            spd: 95,
            spe: 110
        },
        abilities: {
            0: "Intimidate"
        },
		  color: "Brown",
        heightm: 1.5,
        weightkg: 85.3,
		  fusion: ["Salamence", "Landorus-Therian"],
		  otherFormes: ["saladmega"],
		eggGroups: ["Undiscovered"],
    },
    saladmega: {
        num: 7500623,
        species: "Salad-Mega",
        baseSpecies: "Salad",
        forme: "Mega",
        formeLetter: "M",
        types: ["Ground", "Flying"],
		  gender: "M",
        baseStats: {
            hp: 100,
            atk: 160,
            def: 150,
            spa: 125,
            spd: 105,
            spe: 130
        },
        abilities: {
            0: "Aerilate"
        },
		  color: "Brown",
        heightm: 1.8,
        weightkg: 95.3,
		  eggGroups: ["Undiscovered"],
    },
	    chulu: {
        num: 7500624,
        species: "Chulu",
        types: ["Dragon", "Grass"],
        baseStats: {
            hp: 89,
            atk: 130,
            def: 115,
            spa: 82,
            spd: 110,
            spe: 98
        },
        abilities: {
            0: "Rough Grass"
        },
		  color: "Blue",
        heightm: 1.9,
        weightkg: 70.25,
		  otherFormes: ["chulumega"],
		  fusion: ["Garchomp", "Tapu Bulu"],
		eggGroups: ["Undiscovered"],
    },
    chulumega: {
        num: 7500624,
        species: "Chulu-Mega",
        baseSpecies: "Chulu",
        forme: "Mega",
        formeLetter: "M",
        types: ["Dragon", "Grass"],
        baseStats: {
            hp: 89,
            atk: 170,
            def: 135,
            spa: 122,
            spd: 120,
            spe: 88
        },
        abilities: {
            0: "Sand Force"
        },
		  color: "Blue",
        heightm: 1.9,
        weightkg: 70.25,
		  eggGroups: ["Undiscovered"],
    },
	    sabletina: {
        num: 7500625,
        species: "Sabletina",
        types: ["Dark", "Ghost"],
        baseStats: {
            hp: 100,
            atk: 90,
            def: 110,
            spa: 85,
            spd: 110,
            spe: 70
        },
        abilities: {
            0: "Prankster Aura"
        },
		  color: "Gray",
        heightm: 2.5,
        weightkg: 380.5,
		  otherFormes: ["sabletinamega"],
		  fusion: ["Sableye", "Giratina"],
		eggGroups: ["Undiscovered"],
    },
    sabletinamega: {
        num: 7500625,
        species: "Sabletina-Mega",
        baseSpecies: "Sabletina",
        forme: "Mega",
        formeLetter: "M",
        types: ["Dark", "Ghost"],
        baseStats: {
            hp: 100,
            atk: 100,
            def: 160,
            spa: 105,
            spd: 160,
            spe: 40
        },
        abilities: {
            0: "Magic Bounce"
        },
		  color: "Gray",
        heightm: 2.5,
        weightkg: 530.5,
		  eggGroups: ["Undiscovered"],
    },
	    swolesteela: {
        num: 7500626,
        species: "Swolesteela",
        types: ["Steel", "Bug"],
		  gender: "N",
        baseStats: {
            hp: 127,
            atk: 125,
            def: 126,
            spa: 85,
            spd: 102,
            spe: 75
        },
        abilities: {
            0: "Beast Boost"
        },
		  color: "Green",
        heightm: 5.8,
        weightkg: 666.75,
		  fusion: ["Buzzwole", "Celesteela"],
		  eggGroups: ["Undiscovered"],
    },
	    fifa: {
        num: 7500627,
        species: "FIFA",
        types: ["Normal", "Flying"],
        baseStats: {
            hp: 102,
            atk: 85,
            def: 115,
            spa: 77,
            spd: 130,
            spe: 106
        },
        abilities: {
            0: "Feedback Barrier"
        },
		  color: "White",
        heightm: 3.2,
        weightkg: 122,
		  fusion: ["Furfrou", "Lugia"],
		  eggGroups: ["Undiscovered"],
    },
	    drapominable: {
        num: 7500628,
        species: "Drapominable",
        types: ["Poison", "Fighting"],
        baseStats: {
            hp: 93,
            atk: 121,
            def: 103,
            spa: 71,
            spd: 81,
            spe: 79
        },
        abilities: {
            0: "Star Punch"
        },
		  color: "White",
        heightm: 3.2,
        weightkg: 122,
		  fusion: ["Drapion", "Crabominable"],
		  eggGroups: ["Water 3"],
    },
	    diabeetus: {
        num: 7500629,
        species: "Diabeetus",
        types: ["Flying", "Fairy"],
		  gender: "M",
        baseStats: {
            hp: 69,
            atk: 85,
            def: 65,
            spa: 130,
            spd: 70,
            spe: 137
        },
        abilities: {
            0: "Mischievous Dust"
        },
		  color: "Yellow",
        heightm: 0.85,
        weightkg: 31.75,
		  fusion: ["Tornadus", "Ribombee"],
		  eggGroups: ["Undiscovered"],
    },
	    cashquaza: {
        num: 7500630,
        species: "Cashquaza",
        types: ["Ground", "Flying"],
        baseStats: {
            hp: 110,
            atk: 120,
            def: 85,
            spa: 120,
            spd: 80,
            spe: 95
        },
        abilities: {
            0: "Irresistible Body"
        },
		  color: "Green",
        heightm: 3.95,
        weightkg: 115.05,
		  otherFormes: ["cashquazamega"],
		  fusion: ["Whiscash", "Rayquaza"],
		eggGroups: ["Undiscovered"],
    },
    cashquazamega: {
        num: 7500630,
        species: "Cashquaza-Mega",
        baseSpecies: "Cashquaza",
        forme: "Mega",
        formeLetter: "M",
        types: ["Ground", "Flying"],
        baseStats: {
            hp: 110,
            atk: 150,
            def: 95,
            spa: 150,
            spd: 90,
            spe: 115
        },
        abilities: {
            0: "Delta Stream"
        },
		  color: "Green",
        heightm: 7.75,
        weightkg: 300.55,
		  eggGroups: ["Undiscovered"],
    },
	    xanatu: {
        num: 7500631,
        species: "Xanatu",
        types: ["Ghost", "Flying"],
        baseStats: {
            hp: 106,
            atk: 104,
            def: 99,
            spa: 121,
            spd: 88,
            spe: 96
        },
        abilities: {
            0: "Xatulovania"
        },
		  color: "Purple",
        heightm: 2.75,
        weightkg: 67.5,
		  fusion: ["Xatu", "Lunala"],
		  eggGroups: ["Undiscovered"],
    },
	    volcarde: {
        num: 7500632,
        species: "Volcarde",
        types: ["Fire", "Dragon"],
        baseStats: {
            hp: 96,
            atk: 80,
            def: 93,
            spa: 128,
            spd: 100,
            spe: 117
        },
        abilities: {
            0: "Flaming Aura"
        },
		  color: "Green",
        heightm: 3.3,
        weightkg: 175.5,
		  fusion: ["Volcarona", "Zygarde"],
		  eggGroups: ["Undiscovered"],
    },
	    ceremoni: {
        num: 7500634,
        species: "Ceremoni",
        types: ["Flying", "Steel"],
		  baseForme: "Hidden",
		  gender: "N",
        baseStats: {
            hp: 82,
            atk: 85,
            def: 105,
            spa: 85,
            spd: 105,
            spe: 80
        },
        abilities: {
            0: "Impossible Task"
        },
		  color: "Brown",
        heightm: 4.75,
        weightkg: 519.95,
		  fusion: ["Minior", "Celesteela"],
		  otherFormes: ["ceremonishell", "ceremonirobe", "ceremonibowl", "ceremonibranch", "ceremonijewel"],
		  eggGroups: ["Undiscovered"],
    },
    ceremonirobe: {
        num: 7500634,
        species: "Ceremoni-Robe",
        baseSpecies: "Ceremoni",
        forme: "Robe",
        formeLetter: "R",
		  gender: "N",
        types: ["Flying", "Steel"],
        baseStats: {
            hp: 82,
            atk: 145,
            def: 65,
            spa: 125,
            spd: 65,
            spe: 120
        },
        abilities: {
            0: "Impossible Task"
        },
		  color: "Red",
        heightm: 1,
        weightkg: 480.25,
		  eggGroups: ["Undiscovered"],
    },
    ceremonibowl: {
        num: 7500634,
        species: "Ceremoni-Bowl",
        baseSpecies: "Ceremoni",
        forme: "Bowl",
        formeLetter: "B",
		  gender: "N",
        types: ["Flying", "Steel"],
        baseStats: {
            hp: 82,
            atk: 125,
            def: 165,
            spa: 45,
            spd: 145,
            spe: 40
        },
        abilities: {
            0: "Impossible Task"
        },
		  color: "Purple",
        heightm: 1,
        weightkg: 480.25,
		  eggGroups: ["Undiscovered"],
    },
    ceremonibranch: {
        num: 7500634,
        species: "Ceremoni-Branch",
        baseSpecies: "Ceremoni",
        forme: "Branch",
        formeLetter: "B",
		  gender: "N",
        types: ["Flying", "Steel"],
        baseStats: {
            hp: 82,
            atk: 125,
            def: 65,
            spa: 145,
            spd: 65,
            spe: 120
        },
        abilities: {
            0: "Impossible Task"
        },
		  color: "Yellow",
        heightm: 1,
        weightkg: 480.25,
		  eggGroups: ["Undiscovered"],
    },
    ceremonijewel: {
        num: 7500634,
        species: "Ceremoni-Jewel",
        baseSpecies: "Ceremoni",
        forme: "Jewel",
        formeLetter: "J",
		  gender: "N",
        types: ["Flying", "Steel"],
        baseStats: {
            hp: 82,
            atk: 65,
            def: 145,
            spa: 125,
            spd: 165,
            spe: 40
        },
        abilities: {
            0: "Impossible Task"
        },
		  color: "Green",
        heightm: 1,
        weightkg: 480.25,
		  eggGroups: ["Undiscovered"],
    },
    ceremonishell: {
        num: 7500634,
        species: "Ceremoni-Shell",
        baseSpecies: "Ceremoni",
        forme: "Shell",
        formeLetter: "S",
		  gender: "N",
        types: ["Flying", "Steel"],
        baseStats: {
            hp: 82,
            atk: 125,
            def: 65,
            spa: 125,
            spd: 65,
            spe: 140
        },
        abilities: {
            0: "Impossible Task"
        },
		  color: "Blue",
        heightm: 1,
        weightkg: 480.25,
		  eggGroups: ["Undiscovered"],
    },
	eeveus: {
	    num: 7500635,
	    species: "Eeveus",
	    types: ["Normal"],
		 genderRatio: {M: 0.875, F: 0.125},
	    baseStats: {
	        hp: 102,
	        atk: 103,
	        def: 102, 
	        spa: 103,
	        spd: 102, 
	        spe: 103
	    },
	    abilities: {
	        0: "Monotype"
	    },
        color: "White",
	    heightm: 1.75,
	    weightkg: 163.25,
		  fusion: ["Eevee-Starter", "Arceus"],
	    eggGroups: ["Undiscovered"],
	},
	eeveusfire: {
	    num: 7500635,
       species: "Eeveus-Fire",
       baseSpecies: "Eeveus",
       forme: "Fire",
       formeLetter: "F",
	    types: ["Fire"],
	    baseStats: {
	        hp: 102,
	        atk: 103,
	        def: 102, 
	        spa: 103,
	        spd: 102, 
	        spe: 103
	    },
	    abilities: {
	        0: "Monotype"
	    },
        color: "White",
	    heightm: 1.75,
	    weightkg: 163.25,
	    eggGroups: ["Undiscovered"],
	},
	eeveuswater: {
	    num: 7500635,
       species: "Eeveus-Water",
       baseSpecies: "Eeveus",
       forme: "Water",
       formeLetter: "W",
	    types: ["Water"],
	    baseStats: {
	        hp: 102,
	        atk: 103,
	        def: 102, 
	        spa: 103,
	        spd: 102, 
	        spe: 103
	    },
	    abilities: {
	        0: "Monotype"
	    },
        color: "White",
	    heightm: 1.75,
	    weightkg: 163.25,
	    eggGroups: ["Undiscovered"],
	},
	eeveuselectric: {
	    num: 7500635,
       species: "Eeveus-Electric",
       baseSpecies: "Eeveus",
       forme: "Electric",
       formeLetter: "E",
	    types: ["Electric"],
	    baseStats: {
	        hp: 102,
	        atk: 103,
	        def: 102, 
	        spa: 103,
	        spd: 102, 
	        spe: 103
	    },
	    abilities: {
	        0: "Monotype"
	    },
        color: "White",
	    heightm: 1.75,
	    weightkg: 163.25,
	    eggGroups: ["Undiscovered"],
	},
	eeveusgrass: {
	    num: 7500635,
       species: "Eeveus-Grass",
       baseSpecies: "Eeveus",
       forme: "Grass",
       formeLetter: "G",
	    types: ["Grass"],
	    baseStats: {
	        hp: 102,
	        atk: 103,
	        def: 102, 
	        spa: 103,
	        spd: 102, 
	        spe: 103
	    },
	    abilities: {
	        0: "Monotype"
	    },
        color: "White",
	    heightm: 1.75,
	    weightkg: 163.25,
	    eggGroups: ["Undiscovered"],
	},
	eeveusice: {
	    num: 7500635,
       species: "Eeveus-Ice",
       baseSpecies: "Eeveus",
       forme: "Ice",
       formeLetter: "I",
	    types: ["Ice"],
	    baseStats: {
	        hp: 102,
	        atk: 103,
	        def: 102, 
	        spa: 103,
	        spd: 102, 
	        spe: 103
	    },
	    abilities: {
	        0: "Monotype"
	    },
        color: "White",
	    heightm: 1.75,
	    weightkg: 163.25,
	    eggGroups: ["Undiscovered"],
	},
	eeveusfighting: {
	    num: 7500635,
       species: "Eeveus-Fighting",
       baseSpecies: "Eeveus",
       forme: "Fighting",
       formeLetter: "F",
	    types: ["Fighting"],
	    baseStats: {
	        hp: 102,
	        atk: 103,
	        def: 102, 
	        spa: 103,
	        spd: 102, 
	        spe: 103
	    },
	    abilities: {
	        0: "Monotype"
	    },
        color: "White",
	    heightm: 1.75,
	    weightkg: 163.25,
	    eggGroups: ["Undiscovered"],
	},
	eeveuspoison: {
	    num: 7500635,
       species: "Eeveus-Poison",
       baseSpecies: "Eeveus",
       forme: "Poison",
       formeLetter: "P",
	    types: ["Poison"],
	    baseStats: {
	        hp: 102,
	        atk: 103,
	        def: 102, 
	        spa: 103,
	        spd: 102, 
	        spe: 103
	    },
	    abilities: {
	        0: "Monotype"
	    },
        color: "White",
	    heightm: 1.75,
	    weightkg: 163.25,
	    eggGroups: ["Undiscovered"],
	},
	eeveusground: {
	    num: 7500635,
       species: "Eeveus-Ground",
       baseSpecies: "Eeveus",
       forme: "Ground",
       formeLetter: "G",
	    types: ["Ground"],
	    baseStats: {
	        hp: 102,
	        atk: 103,
	        def: 102, 
	        spa: 103,
	        spd: 102, 
	        spe: 103
	    },
	    abilities: {
	        0: "Monotype"
	    },
        color: "White",
	    heightm: 1.75,
	    weightkg: 163.25,
	    eggGroups: ["Undiscovered"],
	},
	eeveusflying: {
	    num: 7500635,
       species: "Eeveus-Flying",
       baseSpecies: "Eeveus",
       forme: "Flying",
       formeLetter: "F",
	    types: ["Flying"],
	    baseStats: {
	        hp: 102,
	        atk: 103,
	        def: 102, 
	        spa: 103,
	        spd: 102, 
	        spe: 103
	    },
	    abilities: {
	        0: "Monotype"
	    },
        color: "White",
	    heightm: 1.75,
	    weightkg: 163.25,
	    eggGroups: ["Undiscovered"],
	},
	eeveuspsychic: {
	    num: 7500635,
       species: "Eeveus-Psychic",
       baseSpecies: "Eeveus",
       forme: "Psychic",
       formeLetter: "P",
	    types: ["Psychic"],
	    baseStats: {
	        hp: 102,
	        atk: 103,
	        def: 102, 
	        spa: 103,
	        spd: 102, 
	        spe: 103
	    },
	    abilities: {
	        0: "Monotype"
	    },
        color: "White",
	    heightm: 1.75,
	    weightkg: 163.25,
	    eggGroups: ["Undiscovered"],
	},
	eeveusbug: {
	    num: 7500635,
       species: "Eeveus-Bug",
       baseSpecies: "Eeveus",
       forme: "Bug",
       formeLetter: "B",
	    types: ["Bug"],
	    baseStats: {
	        hp: 102,
	        atk: 103,
	        def: 102, 
	        spa: 103,
	        spd: 102, 
	        spe: 103
	    },
	    abilities: {
	        0: "Monotype"
	    },
        color: "White",
	    heightm: 1.75,
	    weightkg: 163.25,
	    eggGroups: ["Undiscovered"],
	},
	eeveusrock: {
	    num: 7500635,
       species: "Eeveus-Rock",
       baseSpecies: "Eeveus",
       forme: "Rock",
       formeLetter: "R",
	    types: ["Rock"],
	    baseStats: {
	        hp: 102,
	        atk: 103,
	        def: 102, 
	        spa: 103,
	        spd: 102, 
	        spe: 103
	    },
	    abilities: {
	        0: "Monotype"
	    },
        color: "White",
	    heightm: 1.75,
	    weightkg: 163.25,
	    eggGroups: ["Undiscovered"],
	},
	eeveusghost: {
	    num: 7500635,
       species: "Eeveus-Ghost",
       baseSpecies: "Eeveus",
       forme: "Ghost",
       formeLetter: "G",
	    types: ["Ghost"],
	    baseStats: {
	        hp: 102,
	        atk: 103,
	        def: 102, 
	        spa: 103,
	        spd: 102, 
	        spe: 103
	    },
	    abilities: {
	        0: "Monotype"
	    },
        color: "White",
	    heightm: 1.75,
	    weightkg: 163.25,
	    eggGroups: ["Undiscovered"],
	},
	eeveusdragon: {
	    num: 7500635,
       species: "Eeveus-Dragon",
       baseSpecies: "Eeveus",
       forme: "Dragon",
       formeLetter: "D",
	    types: ["Dragon"],
	    baseStats: {
	        hp: 102,
	        atk: 103,
	        def: 102, 
	        spa: 103,
	        spd: 102, 
	        spe: 103
	    },
	    abilities: {
	        0: "Monotype"
	    },
        color: "White",
	    heightm: 1.75,
	    weightkg: 163.25,
	    eggGroups: ["Undiscovered"],
	},
	eeveusdark: {
	    num: 7500635,
       species: "Eeveus-Dark",
       baseSpecies: "Eeveus",
       forme: "Dark",
       formeLetter: "D",
	    types: ["Dark"],
	    baseStats: {
	        hp: 102,
	        atk: 103,
	        def: 102, 
	        spa: 103,
	        spd: 102, 
	        spe: 103
	    },
	    abilities: {
	        0: "Monotype"
	    },
        color: "White",
	    heightm: 1.75,
	    weightkg: 163.25,
	    eggGroups: ["Undiscovered"],
	},
	eeveussteel: {
	    num: 7500635,
       species: "Eeveus-Steel",
       baseSpecies: "Eeveus",
       forme: "Steel",
       formeLetter: "S",
	    types: ["Steel"],
	    baseStats: {
	        hp: 102,
	        atk: 103,
	        def: 102, 
	        spa: 103,
	        spd: 102, 
	        spe: 103
	    },
	    abilities: {
	        0: "Monotype"
	    },
        color: "White",
	    heightm: 1.75,
	    weightkg: 163.25,
	    eggGroups: ["Undiscovered"],
	},
	eeveusfairy: {
	    num: 7500635,
       species: "Eeveus-Fairy",
       baseSpecies: "Eeveus",
       forme: "Fairy",
       formeLetter: "F",
	    types: ["Fairy"],
	    baseStats: {
	        hp: 102,
	        atk: 103,
	        def: 102, 
	        spa: 103,
	        spd: 102, 
	        spe: 103
	    },
	    abilities: {
	        0: "Monotype"
	    },
        color: "White",
	    heightm: 1.75,
	    weightkg: 163.25,
	    eggGroups: ["Undiscovered"],
	},
	kefka: {
	    num: 7500636,
	    species: "Kefka",
	    types: ["Steel", "Fire"],
		 gender: "N",
	    baseStats: {
	        hp: 55,
	        atk: 103,
	        def: 72, 
	        spa: 135,
	        spd: 83, 
	        spe: 111
	    },
	    abilities: {
	        0: "Dancing Mad"
	    },
        color: "White",
	     heightm: 1,
	     weightkg: 8,
		  fusion: ["Klefki", "Blacephalon"],
	     eggGroups: ["Undiscovered"],
	},
	pyukuton: {
	    num: 7500637,
	    species: "Pyukuton",
	    types: ["Water", "Steel"],
		 gender: "N",
	    baseStats: {
	        hp: 82,
	        atk: 65,
	        def: 126, 
	        spa: 80,
	        spd: 126, 
	        spe: 32
	    },
	    abilities: {
	        0: "Dancing Mad"
	    },
        color: "Black",
	     heightm: 0.95,
	     weightkg: 90.6,
		  fusion: ["Pyukumuku", "Magnezone"],
	     eggGroups: ["Undiscovered"],
	},
	volturne: {
	    num: 7500638,
	    species: "Volturne",
	    types: ["Grass", "Fire"],
	    baseStats: {
	        hp: 100,
	        atk: 117,
	        def: 95, 
	        spa: 132,
	        spd: 95, 
	        spe: 67
	    },
	    abilities: {
	        0: "Water Absorb"
	    },
        color: "Green",
	     heightm: 1.5,
	     weightkg: 136.2,
		  fusion: ["Volcanion", "Cacturne"],
	     eggGroups: ["Undiscovered"],
	},
	thundpard: {
	    num: 7500639,
	    species: "Thundpard",
	    types: ["Electric", "Dark"],
		 gender: "M",
	    baseStats: {
	        hp: 76,
	        atk: 116,
	        def: 65, 
	        spa: 126,
	        spd: 70, 
	        spe: 133
	    },
	    abilities: {
	        0: "Prankster"
	    },
        color: "Purple",
	     heightm: 1.3,
	     weightkg: 49.2,
		  fusion: ["Thundurus", "Liepard"],
	     eggGroups: ["Undiscovered"],
	},
	madeleine: {
	    num: 7500640,
	    species: "Madeleine",
	    types: ["Poison", "Flying"],
	    baseStats: {
	        hp: 76,
	        atk: 116,
	        def: 65, 
	        spa: 126,
	        spd: 70, 
	        spe: 133
	    },
	    abilities: {
	        0: "Prankster"
	    },
        color: "Purple",
	     heightm: 2.2,
	     weightkg: 126,
		  fusion: ["Yanmega", "Scolipede"],
	     eggGroups: ["Bug"],
	},
	amoongrowth: {
	    num: 7500641,
	    species: "Amoongrowth",
	    types: ["Grass", "Poison"],
	    baseStats: {
	        hp: 122,
	        atk: 107,
	        def: 112,
	        spa: 112,
	        spd: 80, 
	        spe: 55
	    },
	    abilities: {
	        0: "Regenerator"
	    },
        color: "Blue",
	     heightm: 1.3,
	     weightkg: 69.5,
		  fusion: ["Amoonguss", "Tangrowth"],
	     eggGroups: ["Grass"],
	},
	bronzecho: {
	    num: 7500642,
	    species: "Bronzecho",
	    types: ["Psychic", "Steel"],
		 gender: "N",
	    baseStats: {
	        hp: 96,
	        atk: 74,
	        def: 113,
	        spa: 92,
	        spd: 118, 
	        spe: 54
	    },
	    abilities: {
	        0: "Levitate"
	    },
        color: "Green",
	     heightm: 0.95,
	     weightkg: 94,
		  fusion: ["Bronzong", "Chimecho"],
	     eggGroups: ["Undiscovered"],
	},
	steelateela: {
	    num: 7500643,
	    species: "Steelateela",
	    types: ["Steel", "Flying"],
		 gender: "N",
	    baseStats: {
	        hp: 104,
	        atk: 131,
	        def: 162,
	        spa: 85,
	        spd: 116, 
	        spe: 42
	    },
	    abilities: {
	        0: "Beast Boost"
	    },
        color: "Green",
	     heightm: 7.35,
	     weightkg: 909.9,
		  fusion: ["Celesteela", "Stakataka"],
	     eggGroups: ["Undiscovered"],
	},
	    escavazor: {
        num: 7500644,
        species: "Escavazor",
        types: ["Bug", "Steel"],
        baseStats: {
            hp: 85,
            atk: 147,
            def: 117,
            spa: 72,
            spd: 107,
            spe: 57
        },
        abilities: {
            0: "Swarm"
        },
		  color: "Gray",
        heightm: 1.4,
        weightkg: 75.5,
		  otherFormes: ["escavazormega"],
		  fusion: ["Escavalier", "Scizor"],
		eggGroups: ["Bug"],
    },
    escavazormega: {
        num: 7500644,
        species: "Escavazor-Mega",
        baseSpecies: "Escavazor",
        forme: "Mega",
        formeLetter: "M",
        types: ["Bug", "Steel"],
        baseStats: {
            hp: 85,
            atk: 167,
            def: 157,
            spa: 82,
            spd: 127,
            spe: 67
        },
        abilities: {
            0: "Technician"
        },
		  color: "Gray",
        heightm: 1.6,
        weightkg: 82.5,
		eggGroups: ["Bug"],
    },
	metalchan: {
	    num: 7500645,
	    species: "Metalchan",
	    types: ["Fighting", "Steel"],
		 gender: "N",
	    baseStats: {
	        hp: 102,
	        atk: 144,
	        def: 116,
	        spa: 62,
	        spd: 102, 
	        spe: 70
	    },
	    abilities: {
	        0: "Iron Fist"
	    },
        color: "Gray",
	     heightm: 1.95,
	     weightkg: 425.1,
		  fusion: ["Hitmonchan", "Melmetal"],
	     eggGroups: ["Undiscovered"],
	},
	sirirachistar: {
	    num: 7500646,
	    species: "Sirirachi-Star",
	    types: ["Grass", "Steel"],
		 gender: "N",
	    baseStats: {
	        hp: 105,
	        atk: 106,
	        def: 102,
	        spa: 125,
	        spd: 102, 
	        spe: 128
	    },
	    abilities: {
	        0: "Serene Grace"
	    },
        color: "Gray",
	     heightm: 0.35,
	     weightkg: 3.1,
		  fusion: ["Jirachi", "Shaymin-Sky"],
	     eggGroups: ["Undiscovered"],
	},
	    sensational: {
        num: 7500647,
        species: "Sensational",
        types: ["Steel"],
		  gender: "N",
        baseStats: {
            hp: 75,
            atk: 142,
            def: 127,
            spa: 87,
            spd: 92,
            spe: 105
        },
        abilities: {
            0: "Clear Body"
        },
		  color: "Gray",
        heightm: 1.1,
        weightkg: 315.5,
		  otherFormes: ["sensationalmega"],
		  fusion: ["Klinklang", "Metagross"],
		eggGroups: ["Mineral"],
    },
    sensationalmega: {
        num: 7500647,
        species: "Sensational-Mega",
        baseSpecies: "Sensational",
        forme: "Mega",
        formeLetter: "M",
		  gender: "N",
        types: ["Steel"],
        baseStats: {
            hp: 75,
            atk: 152,
            def: 147,
            spa: 97,
            spd: 112,
            spe: 145
        },
        abilities: {
            0: "Tough Claws"
        },
		  color: "Gray",
        heightm: 2,
        weightkg: 708.4,
		eggGroups: ["Mineral"],
    },
	    lukeldeo: {
        num: 7500648,
        species: "Lukeldeo",
        types: ["Fighting", "Water"],
		  genderRatio: {
			  M: 0.875,
			  F: 0.125
		  },
        baseStats: {
            hp: 85,
            atk: 116,
            def: 85,
            spa: 127,
            spd: 85,
            spe: 124
        },
        abilities: {
            0: "Justified"
        },
		  color: "Blue",
        heightm: 1.3,
        weightkg: 51.2,
		  otherFormes: ["lukeldeomega"],
		  fusion: ["Lucario", "Keldeo"],
		eggGroups: ["Undiscovered"],
    },
    lukeldeomega: {
        num: 7500648,
        species: "Lukeldeo-Mega",
        baseSpecies: "Lukeldeo",
        forme: "Mega",
        formeLetter: "M",
        types: ["Fighting", "Water"],
		  genderRatio: {
			  M: 0.875,
			  F: 0.125
		  },
        baseStats: {
            hp: 85,
            atk: 151,
            def: 103,
            spa: 152,
            spd: 85,
            spe: 146
        },
        abilities: {
            0: "Adaptability"
        },
		  color: "Blue",
        heightm: 1.4,
        weightkg: 54.7,
		  eggGroups: ["Undiscovered"],
    },
	    moron: {
        num: 7500649,
        species: "Moron",
        types: ["Steel", "Fire"],
        baseStats: {
            hp: 80,
            atk: 110,
            def: 160,
            spa: 70,
            spd: 85,
            spe: 62
        },
        abilities: {
            0: "Rock Head"
        },
		  color: "Purple",
        heightm: 1.55,
        weightkg: 197,
		  otherFormes: ["moronmega"],
		  fusion: ["Marowak-Alola", "Aggron"],
		  eggGroups: ["Monster"],
    },
    moronmega: {
        num: 7500649,
        species: "Moron-Mega",
        baseSpecies: "Moron",
        forme: "Mega",
        formeLetter: "M",
        types: ["Steel"],
        baseStats: {
            hp: 80,
            atk: 140,
            def: 210,
            spa: 70,
            spd: 105,
            spe: 62
        },
        abilities: {
            0: "Filter"
        },
		  color: "Purple",
        heightm: 1.65,
        weightkg: 233,
		  eggGroups: ["Monster"],
    },
	    lordkaiyur: {
        num: 7500650,
        species: "Lord Kaiyur",
        types: ["Water", "Dragon"],
		  gender: "N",
        baseStats: {
            hp: 152,
            atk: 115,
            def: 92,
            spa: 115,
            spd: 92,
            spe: 82
        },
        abilities: {
            0: "Pressure"
        },
		  color: "Gray",
        heightm: 8.75,
        weightkg: 361.5,
		  fusion: ["Wailord", "Kyurem"],
		  eggGroups: ["Undiscovered"],
    },
	    aloola: {
        num: 7500651,
        species: "Alo-Ola",
        types: ["Water", "Flying"],
        baseStats: {
            hp: 140,
            atk: 110,
            def: 120,
            spa: 87,
            spd: 104,
            spe: 82
        },
        abilities: {
            0: "Regenerator"
        },
		  color: "Pink",
        heightm: 2.5,
        weightkg: 115.3,
		  fusion: ["Alomomola", "Ho-Oh"],
		  eggGroups: ["Undiscovered"],
    },
	    rotias: {
        num: 7500652,
        species: "Rotias",
        types: ["Dragon", "Electric"],
		  gender: "F",
        baseStats: {
            hp: 90,
            atk: 77,
            def: 103,
            spa: 112,
            spd: 123,
            spe: 123
        },
        abilities: {
            0: "Levitate"
        },
		  color: "Red",
        heightm: 0.85,
        weightkg: 20.1,
		  otherFormes: ["rotiasmega"],
		  fusion: ["Rotom-Heat", "Latias"],
		  eggGroups: ["Undiscovered"],
    },
    rotiasmega: {
        num: 7500652,
        species: "Rotias-Mega",
        baseSpecies: "Rotias",
        forme: "Mega",
        formeLetter: "M",
        types: ["Dragon", "Electric"],
		  gender: "F",
        baseStats: {
            hp: 90,
            atk: 97,
            def: 133,
            spa: 142,
            spd: 143,
            spe: 123
        },
        abilities: {
            0: "Levitate"
        },
		  color: "Purple",
        heightm: 1.25,
        weightkg: 32.1,
		  eggGroups: ["Undiscovered"],
    },
	    licquaza: {
        num: 7500653,
        species: "Licquaza",
        types: ["Normal", "Flying"],
        baseStats: {
            hp: 122,
            atk: 127,
            def: 87,
            spa: 110,
            spd: 87,
            spe: 67
        },
        abilities: {
            0: "Air Lock"
        },
		  color: "Green",
        heightm: 4.1,
        weightkg: 136,
		  otherFormes: ["licquazamega"],
		  fusion: ["Lickitung", "Rayquaza"],
		  eggGroups: ["Undiscovered"],
    },
    licquazamega: {
        num: 7500653,
        species: "Licquaza-Mega",
        baseSpecies: "Licquaza",
        forme: "Mega",
        formeLetter: "M",
        types: ["Normal", "Flying"],
        baseStats: {
            hp: 122,
            atk: 157,
            def: 97,
            spa: 140,
            spd: 97,
            spe: 87
        },
        abilities: {
            0: "Delta Stream"
        },
		  color: "Green",
        heightm: 7.9,
        weightkg: 321.5,
		  eggGroups: ["Undiscovered"],
    },
	    furpurr: {
        num: 7500654,
        species: "Furpurr",
        types: ["Normal", "Dark"],
        baseStats: {
            hp: 85,
            atk: 85,
            def: 75,
            spa: 85,
            spd: 92,
            spe: 123
        },
        abilities: {
            0: "Fur Coat"
        },
		  color: "White",
        heightm: 1.15,
        weightkg: 50.5,
		  fusion: ["Furfrou", "Persian-Alola"],
		  eggGroups: ["Field"],
    },
	    shaymie: {
        num: 7500655,
        species: "Shaymie",
        types: ["Water", "Grass"],
		  gender: "N",
        baseStats: {
            hp: 85,
            atk: 95,
            def: 100,
            spa: 125,
            spd: 100,
            spe: 120
        },
        abilities: {
            0: "Natural Cure"
        },
		  color: "Purple",
        heightm: 0.7,
        weightkg: 40.1,
		  fusion: ["Furfrou", "Persian-Alola"],
		  eggGroups: ["Undiscovered"],
    },
	    ventel: {
        num: 7500656,
        species: "Ventel",
        types: ["Dark", "Fire"],
        baseStats: {
            hp: 97,
            atk: 142,
            def: 80,
            spa: 72,
            spd: 85,
            spe: 137
        },
        abilities: {
            0: "Pressure"
        },
		  color: "Black",
        heightm: 1.6,
        weightkg: 116,
		  fusion: ["Weavile", "Entei"],
		  eggGroups: ["Undiscovered"],
    },
	miniking: {
		num: 75000657,
		types:["Normal", "Flying"],
		species: "Miniking",
		baseForme: "Guarded",
		baseStats: {hp: 125, atk: 110, def: 120, spa: 77, spd: 82, spe: 80},
		abilities: {0: "Lazy Guard"},
		heightm: 1.15,
		weightkg: 85.2,
		fusion: ["Slaking", "Minior-Meteor"],
		otherFormes: ["minikingunguarded"],
		eggGroups: ["Undiscovered"],
	},
	minikingunguarded: {
		num: 75000657,
		types:["Normal", "Flying"],
		species: "Miniking-Unguarded",
      baseSpecies: "Miniking",
      forme: "Unguarded",
      formeLetter: "U",
		baseStats: {hp: 125, atk: 120, def: 110, spa: 82, spd: 77, spe: 140},
		abilities: {0: "Lazy Guard"},
		heightm: 1.15,
		weightkg: 45.5,
		eggGroups: ["Undiscovered"],
	},
	megalovania: {
		num: 75000658,
		types:["Bug", "Water"],
		species: "Megalovania",
		baseStats: {hp: 85, atk: 95, def: 105, spa: 140, spd: 75, spe: 95},
		abilities: {0: "Wet Lens"},
		heightm: 1.8,
		weightkg: 123.2,
		fusion: ["Yanmega", "Volcanion"],
		eggGroups: ["Undiscovered"],
	},
	guzzira: {
		num: 75000659,
		types:["Rock", "Dragon"],
		species: "Guzzira",
		baseStats: {hp: 161, atk: 127, def: 96, spa: 96, spd: 91, spe: 52},
		abilities: {0: "Kaiju's Presence"},
		heightm: 3.75,
		weightkg: 545,
		fusion: ["Guzzlord", "Tyranitar"],
		otherFormes: ["guzziramega"],
		eggGroups: ["Undiscovered"],
	},
	guzziramega: {
		num: 75000659,
		types:["Rock", "Dragon"],
		species: "Guzzira-Mega",
      baseSpecies: "Guzzira",
      forme: "Mega",
      formeLetter: "M",
		baseStats: {hp: 161, atk: 157, def: 136, spa: 96, spd: 111, spe: 62},
		abilities: {0: "Sand Stream"},
		heightm: 4.25,
		weightkg: 598,
		eggGroups: ["Undiscovered"],
	},
	ninjaleo: {
		num: 75000660,
		types:["Bug", "Steel"],
		species: "Ninjaleo",
		baseStats: {hp: 99, atk: 133, def: 76, spa: 81, spd: 70, spe: 147},
		abilities: {0: "Quicksilver"},
		heightm: 2.1,
		weightkg: 121,
		fusion: ["Ninjask", "Solgaleo"],
		eggGroups: ["Undiscovered"],
	},
	tapuno: {
		num: 75000661,
		types:["Water", "Ice"],
		species: "Tapuno",
		baseStats: {hp: 99, atk: 133, def: 76, spa: 81, spd: 130, spe: 147},
		abilities: {0: "Arctic Surge"},
		heightm: 1.5,
		weightkg: 38.3,
		fusion: ["Tapu Fini", "Articuno"],
		eggGroups: ["Undiscovered"],
	},
	fuglet: {
		num: 75000662,
		types: ["Ground", "Flying"],
		species: "Fuglet",
		baseStats: {hp: 57, atk: 122, def: 57, spa: 92, spd: 67, spe: 115},
		abilities: {0: "Air Trap"},
		heightm: 3.6,
		weightkg: 103.6,
		fusion: ["Rayquaza", "Diglett"],
		otherFormes: ["fugletmega"],
		eggGroups: ["Undiscovered"],
	},
	fugletmega: {
		num: 75000662,
		types: ["Ground", "Flying"],
		species: "Fuglet-Mega",
      baseSpecies: "Fuglet",
      forme: "Mega",
      formeLetter: "M",
		baseStats: {hp: 57, atk: 152, def: 67, spa: 122, spd: 77, spe: 135},
		abilities: {0: "Delta Stream"},
		heightm: 3.6,
		weightkg: 103.6,
		eggGroups: ["Undiscovered"],
	},
	klopsogre: {
		num: 75000663,
		types: ["Water", "Ghost"],
		species: "Klopsogre",
		baseStats: {hp: 90, atk: 85, def: 130, spa: 105, spd: 135, spe: 57},
		abilities: {0: "Haunted Storm"},
		heightm: 3.05,
		weightkg: 191.3,
		fusion: ["Dusclops", "Kyogre"],
		otherFormes: ["klopsogreprimal"],
		eggGroups: ["Undiscovered"],
	},
	klopsogreprimal: {
		num: 75000663,
		types: ["Water", "Ghost"],
		species: "Klopsogre-Primal",
      baseSpecies: "Klopsogre",
      forme: "Primal",
      formeLetter: "P",
		baseStats: {hp: 90, atk: 135, def: 130, spa: 135, spd: 155, spe: 57},
		abilities: {0: "Primordial Sea"},
		heightm: 8.35,
		weightkg: 279.3,
		eggGroups: ["Undiscovered"],
	},
	choko: {
		num: 75000664,
		types: ["Electric", "Dragon"],
		species: "Choko",
		baseStats: {hp: 95, atk: 142, def: 90, spa: 87, spd: 80, spe: 130},
		abilities: {0: "Chargestone Skin"},
		heightm: 1.85,
		weightkg: 57.7,
		fusion: ["Garchomp", "Tapu Koko"],
		otherFormes: ["chokomega"],
		eggGroups: ["Undiscovered"],
	},
	chokomega: {
		num: 75000664,
		types: ["Electric", "Dragon"],
		species: "Choko-Mega",
      baseSpecies: "Choko",
      forme: "Mega",
      formeLetter: "M",
		baseStats: {hp: 95, atk: 182, def: 110, spa: 127, spd: 90, spe: 120},
		abilities: {0: "Sand Force"},
		heightm: 1.85,
		weightkg: 57.7,
		eggGroups: ["Undiscovered"],
	},
	gog: {
		num: 75000665,
		types: ["Normal", "Flying"],
		species: "Gog",
		baseStats: {hp: 82, atk: 117, def: 80, spa: 60, spd: 75, spe: 90},
		abilities: {0: "1v1 Master"},
		heightm: 2.15,
		weightkg: 217.7,
		fusion: ["Staravia", "Regigigas"],
		eggGroups: ["Undiscovered"],
	},
	talesmear: {
		num: 75000666,
		types: ["Normal", "Fire"],
      genderRatio: {M: 0.375, F: 0.625},
		species: "Talesmear",
		baseStats: {hp: 74, atk: 58, def: 65, spa: 60, spd: 82, spe: 97},
		abilities: {0: "Double Rainbow All the Way"},
		heightm: 1.15,
		weightkg: 38.9,
		fusion: ["Ninetales", "Smeargle"],
		eggGroups: ["Field"],
	},
	snowtyrant: {
		num: 75000667,
		types: ["Rock", "Ice"],
		species: "Snow Tyrant",
		baseStats: {hp: 105, atk: 123, def: 102, spa: 103, spd: 102, spe: 70},
		abilities: {0: "Yeti"},
		heightm: 2.1,
		weightkg: 168.7,
		fusion: ["Abomasnow", "Tyranitar"],
		otherFormes: ["snowtyrantmegax", "snowtyrantmegay"],
		eggGroups: ["Monster"],
	},
	snowtyrantmegax: {
		num: 75000667,
		types: ["Rock", "Ice"],
		species: "Snow Tyrant-Mega-X",
      baseSpecies: "Snow Tyrant",
      forme: "Mega X",
      formeLetter: "M",
		baseStats: {hp: 105, atk: 153, def: 142, spa: 103, spd: 122, spe: 80},
		abilities: {0: "Sand Stream"},
		heightm: 2.6,
		weightkg: 221.7,
		eggGroups: ["Monster"],
	},
	snowtyrantmegay: {
		num: 75000667,
		types: ["Electric", "Dragon"],
		species: "Snow Tyrant-Mega-Y",
      baseSpecies: "Snow Tyrant",
      forme: "Mega Y",
      formeLetter: "M",
		baseStats: {hp: 105, atk: 163, def: 132, spa: 143, spd: 122, spe: 40},
		abilities: {0: "Snow Warning"},
		heightm: 2.6,
		weightkg: 218.2,
		eggGroups: ["Monster"],
	},
	zydisc: {
		num: 75000668,
		types: ["Water", "Dragon"],
		species: "Zydisc",
		baseStats: {hp: 48, atk: 85, def: 63, spa: 60, spd: 95, spe: 106},
		abilities: {0: "Hydrolysis"},
		heightm: 0.9,
		weightkg: 21.1,
		fusion: ["Zygarde-10%", "Luvdisc"],
		otherFormes: ["zydiscbuff"],
		eggGroups: ["Undiscovered"],
	},
	zydiscbuff: {
		num: 75000668,
		types: ["Water", "Dragon"],
		species: "Zydisc-Buff",
      baseSpecies: "Zydisc",
      forme: "Buff",
      formeLetter: "B",
		baseStats: {hp: 210, atk: 85, def: 113, spa: 90, spd: 105, spe: 76},
		abilities: {0: "Hydrolysis"},
		heightm: 4.2,
		weightkg: 597.6,
		eggGroups: ["Undiscovered"],
	},
	sillyputty: {
		num: 75000669,
		types: ["Normal", "Fairy"],
		gender: "N",
		species: "Silly Putty",
		baseStats: {hp: 110, atk: 60, def: 60, spa: 70, spd: 50, spe: 50},
		abilities: {0: "Ultimate Scout"},
		heightm: 0.65,
		weightkg: 8,
		fusion: ["Ditto", "Wigglytuff"],
		eggGroups: ["Fairy"],
	},
	magnetar: {
		num: 75000670,
		types: ["Steel", "Dark"],
		species: "Magnetar",
		gender: "N",
		baseStats: {hp: 105, atk: 102, def: 112, spa: 132, spd: 95, spe: 60},
		abilities: {0: "Iron Dust Push"},
		heightm: 1.6,
		weightkg: 191,
		fusion: ["Magnezone", "Tyranitar"],
		otherFormes: ["magnetarmega"],
		eggGroups: ["Undiscovered"],
	},
	magnetarmega: {
		num: 75000670,
		types: ["Steel", "Dark"],
		species: "Magnetar-Mega",
      baseSpecies: "Magnetar",
      forme: "Mega",
      formeLetter: "M",
		baseStats: {hp: 105, atk: 132, def: 152, spa: 132, spd: 115, spe: 70},
		abilities: {0: "Sand Stream"},
		heightm: 2.1,
		weightkg: 244,
		eggGroups: ["Undiscovered"],
	},
	castor: {
		num: 75000671,
		types: ["Fairy", "Normal"],
		species: "Castor",
		baseStats: {hp: 79, atk: 77, def: 77, spa: 107, spd: 102, spe: 85},
		abilities: {0: "Climate Compile"},
		heightm: 0.95,
		weightkg: 24.6,
		fusion: ["Castform", "Gardevoir"],
		otherFormes: ["castorsunny", "castorrainy", "castorsnowy", "castorsandy", "castorspooky", "castorprickly", "castordirty", "castormega", "castormegasunny", "castormegarainy", "castormegasnowy", "castormegasandy", "castormegaspooky", "castormegaprickly"],
		eggGroups: ["Amorphous"],
	},
	castorsunny: {
		num: 75000671,
		types: ["Fairy", "Fire"],
		species: "Castor-Sunny",
      baseSpecies: "Castor",
      forme: "Sunny",
      formeLetter: "S",
		baseStats: {hp: 79, atk: 77, def: 77, spa: 107, spd: 102, spe: 85},
		abilities: {0: "Climate Compile"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castorrainy: {
		num: 75000671,
		types: ["Fairy", "Water"],
		species: "Castor-Rainy",
      baseSpecies: "Castor",
      forme: "Rainy",
      formeLetter: "R",
		baseStats: {hp: 79, atk: 77, def: 77, spa: 107, spd: 102, spe: 85},
		abilities: {0: "Climate Compile"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castorsnowy: {
		num: 75000671,
		types: ["Fairy", "Ice"],
		species: "Castor-Snowy",
      baseSpecies: "Castor",
      forme: "Snowy",
      formeLetter: "S",
		baseStats: {hp: 79, atk: 77, def: 77, spa: 107, spd: 102, spe: 85},
		abilities: {0: "Climate Compile"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castorsandy: {
		num: 75000671,
		types: ["Fairy", "Rock"],
		species: "Castor-Sandy",
      baseSpecies: "Castor",
      forme: "Sandy",
      formeLetter: "S",
		baseStats: {hp: 79, atk: 77, def: 77, spa: 107, spd: 102, spe: 85},
		abilities: {0: "Climate Compile"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castorspooky: {
		num: 75000671,
		types: ["Fairy", "Ghost"],
		species: "Castor-Spooky",
      baseSpecies: "Castor",
      forme: "Spooky",
      formeLetter: "S",
		baseStats: {hp: 79, atk: 77, def: 77, spa: 107, spd: 102, spe: 85},
		abilities: {0: "Climate Compile"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castorprickly: {
		num: 75000671,
		types: ["Fairy", "Grass"],
		species: "Castor-Prickly",
      baseSpecies: "Castor",
      forme: "Prickly",
      formeLetter: "P",
		baseStats: {hp: 79, atk: 77, def: 77, spa: 107, spd: 102, spe: 85},
		abilities: {0: "Climate Compile"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castordirty: {
		num: 75000671,
		types: ["Fairy", "Steel"],
		species: "Castor-Dirty",
      baseSpecies: "Castor",
      forme: "Dirty",
      formeLetter: "D",
		baseStats: {hp: 79, atk: 77, def: 77, spa: 107, spd: 102, spe: 85},
		abilities: {0: "Climate Compile"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castormega: {
		num: 75000671,
		types: ["Fairy", "Normal"],
		species: "Castor-Mega",
      baseSpecies: "Castor",
      forme: "Mega",
      formeLetter: "M",
		baseStats: {hp: 79, atk: 97, def: 77, spa: 147, spd: 122, spe: 105},
		abilities: {0: "Pixilate"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castormegasunny: {
		num: 75000671,
		types: ["Fairy", "Fire"],
		species: "Castor-Mega-Sunny",
      baseSpecies: "Castor",
      forme: "Mega-Sunny",
      formeLetter: "M",
		baseStats: {hp: 79, atk: 97, def: 77, spa: 147, spd: 122, spe: 105},
		abilities: {0: "Pixilate"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castormegarainy: {
		num: 75000671,
		types: ["Fairy", "Water"],
		species: "Castor-Mega-Rainy",
      baseSpecies: "Castor",
      forme: "Mega-Rainy",
      formeLetter: "M",
		baseStats: {hp: 79, atk: 97, def: 77, spa: 147, spd: 122, spe: 105},
		abilities: {0: "Pixilate"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castormegasnowy: {
		num: 75000671,
		types: ["Fairy", "Ice"],
		species: "Castor-Mega-Snowy",
      baseSpecies: "Castor",
      forme: "Mega-Snowy",
      formeLetter: "M",
		baseStats: {hp: 79, atk: 97, def: 77, spa: 147, spd: 122, spe: 105},
		abilities: {0: "Pixilate"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castormegasandy: {
		num: 75000671,
		types: ["Fairy", "Rock"],
		species: "Castor-Mega-Sandy",
      baseSpecies: "Castor",
      forme: "Mega-Sandy",
      formeLetter: "M",
		baseStats: {hp: 79, atk: 97, def: 77, spa: 147, spd: 122, spe: 105},
		abilities: {0: "Pixilate"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castormegaspooky: {
		num: 75000671,
		types: ["Fairy", "Ghost"],
		species: "Castor-Mega-Spooky",
      baseSpecies: "Castor",
      forme: "Mega-Spooky",
      formeLetter: "M",
		baseStats: {hp: 79, atk: 97, def: 77, spa: 147, spd: 122, spe: 105},
		abilities: {0: "Pixilate"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castorprickly: {
		num: 75000671,
		types: ["Fairy", "Grass"],
		species: "Castor-Mega-Prickly",
      baseSpecies: "Castor",
      forme: "Mega-Prickly",
      formeLetter: "M",
		baseStats: {hp: 79, atk: 97, def: 77, spa: 147, spd: 122, spe: 105},
		abilities: {0: "Pixilate"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castordirty: {
		num: 75000671,
		types: ["Fairy", "Steel"],
		species: "Castor-Mega-Dirty",
      baseSpecies: "Castor",
      forme: "Mega-Dirty",
      formeLetter: "M",
		baseStats: {hp: 79, atk: 97, def: 77, spa: 147, spd: 122, spe: 105},
		abilities: {0: "Pixilate"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	throopah: {
		num: 75000672,
		types: ["Fighting", "Dark"],
		gender: "M",
		species: "Throopah",
		baseStats: {hp: 110, atk: 150, def: 62, spa: 100, spd: 107, spe: 62},
		abilities: {0: "Sinister Magic"},
		heightm: 3.9,
		weightkg: 272.7,
		fusion: ["Throh", "Hoopa-Unbound"],
		eggGroups: ["Undiscovered"],
	},
	guzziramega: {
		num: 75000659,
		types:["Rock", "Dragon"],
		species: "Guzzira-Mega",
      baseSpecies: "Guzzira",
      forme: "Mega",
      formeLetter: "M",
		baseStats: {hp: 161, atk: 157, def: 136, spa: 96, spd: 111, spe: 62},
		abilities: {0: "Sand Stream"},
		heightm: 4.25,
		weightkg: 598,
		eggGroups: ["Undiscovered"],
	},
	ninjaleo: {
		num: 75000660,
		types:["Bug", "Steel"],
		species: "Ninjaleo",
		baseStats: {hp: 99, atk: 133, def: 76, spa: 81, spd: 70, spe: 147},
		abilities: {0: "Quicksilver"},
		heightm: 2.1,
		weightkg: 121,
		fusion: ["Ninjask", "Solgaleo"],
		eggGroups: ["Undiscovered"],
	},
	tapuno: {
		num: 75000661,
		types:["Water", "Ice"],
		species: "Tapuno",
		baseStats: {hp: 99, atk: 133, def: 76, spa: 81, spd: 130, spe: 147},
		abilities: {0: "Arctic Surge"},
		heightm: 1.5,
		weightkg: 38.3,
		fusion: ["Tapu Fini", "Articuno"],
		eggGroups: ["Undiscovered"],
	},
	fuglet: {
		num: 75000662,
		types: ["Ground", "Flying"],
		species: "Fuglet",
		baseStats: {hp: 57, atk: 122, def: 57, spa: 92, spd: 67, spe: 115},
		abilities: {0: "Air Trap"},
		heightm: 3.6,
		weightkg: 103.6,
		fusion: ["Rayquaza", "Diglett"],
		otherFormes: ["fugletmega"],
		eggGroups: ["Undiscovered"],
	},
	fugletmega: {
		num: 75000662,
		types: ["Ground", "Flying"],
		species: "Fuglet-Mega",
      baseSpecies: "Fuglet",
      forme: "Mega",
      formeLetter: "M",
		baseStats: {hp: 57, atk: 152, def: 67, spa: 122, spd: 77, spe: 135},
		abilities: {0: "Delta Stream"},
		heightm: 3.6,
		weightkg: 103.6,
		eggGroups: ["Undiscovered"],
	},
	klopsogre: {
		num: 75000663,
		types: ["Water", "Ghost"],
		species: "Klopsogre",
		baseStats: {hp: 90, atk: 85, def: 130, spa: 105, spd: 135, spe: 57},
		abilities: {0: "Haunted Storm"},
		heightm: 3.05,
		weightkg: 191.3,
		fusion: ["Dusclops", "Kyogre"],
		otherFormes: ["klopsogreprimal"],
		eggGroups: ["Undiscovered"],
	},
	klopsogreprimal: {
		num: 75000663,
		types: ["Water", "Ghost"],
		species: "Klopsogre-Primal",
      baseSpecies: "Klopsogre",
      forme: "Primal",
      formeLetter: "P",
		baseStats: {hp: 90, atk: 135, def: 130, spa: 135, spd: 155, spe: 57},
		abilities: {0: "Primordial Sea"},
		heightm: 8.35,
		weightkg: 279.3,
		eggGroups: ["Undiscovered"],
	},
	choko: {
		num: 75000664,
		types: ["Electric", "Dragon"],
		species: "Choko",
		baseStats: {hp: 95, atk: 142, def: 90, spa: 87, spd: 80, spe: 130},
		abilities: {0: "Chargestone Skin"},
		heightm: 1.85,
		weightkg: 57.7,
		fusion: ["Garchomp", "Tapu Koko"],
		otherFormes: ["chokomega"],
		eggGroups: ["Undiscovered"],
	},
	chokomega: {
		num: 75000664,
		types: ["Electric", "Dragon"],
		species: "Choko-Mega",
      baseSpecies: "Choko",
      forme: "Mega",
      formeLetter: "M",
		baseStats: {hp: 95, atk: 182, def: 110, spa: 127, spd: 90, spe: 120},
		abilities: {0: "Sand Force"},
		heightm: 1.85,
		weightkg: 57.7,
		eggGroups: ["Undiscovered"],
	},
	gog: {
		num: 75000665,
		types: ["Normal", "Flying"],
		species: "Gog",
		baseStats: {hp: 82, atk: 117, def: 80, spa: 60, spd: 75, spe: 90},
		abilities: {0: "1v1 Master"},
		heightm: 2.15,
		weightkg: 217.7,
		fusion: ["Staravia", "Regigigas"],
		eggGroups: ["Undiscovered"],
	},
	talesmear: {
		num: 75000666,
		types: ["Normal", "Fire"],
      genderRatio: {M: 0.375, F: 0.625},
		species: "Talesmear",
		baseStats: {hp: 74, atk: 58, def: 65, spa: 60, spd: 82, spe: 97},
		abilities: {0: "Double Rainbow All the Way"},
		heightm: 1.15,
		weightkg: 38.9,
		fusion: ["Ninetales", "Smeargle"],
		eggGroups: ["Field"],
	},
	snowtyrant: {
		num: 75000667,
		types: ["Rock", "Ice"],
		species: "Snow Tyrant",
		baseStats: {hp: 105, atk: 123, def: 102, spa: 103, spd: 102, spe: 70},
		abilities: {0: "Yeti"},
		heightm: 2.1,
		weightkg: 168.7,
		fusion: ["Abomasnow", "Tyranitar"],
		otherFormes: ["snowtyrantmegax", "snowtyrantmegay"],
		eggGroups: ["Monster"],
	},
	snowtyrantmegax: {
		num: 75000667,
		types: ["Rock", "Ice"],
		species: "Snow Tyrant-Mega-X",
      baseSpecies: "Snow Tyrant",
      forme: "Mega X",
      formeLetter: "M",
		baseStats: {hp: 105, atk: 153, def: 142, spa: 103, spd: 122, spe: 80},
		abilities: {0: "Sand Stream"},
		heightm: 2.6,
		weightkg: 221.7,
		eggGroups: ["Monster"],
	},
	snowtyrantmegay: {
		num: 75000667,
		types: ["Electric", "Dragon"],
		species: "Snow Tyrant-Mega-Y",
      baseSpecies: "Snow Tyrant",
      forme: "Mega Y",
      formeLetter: "M",
		baseStats: {hp: 105, atk: 163, def: 132, spa: 143, spd: 122, spe: 40},
		abilities: {0: "Snow Warning"},
		heightm: 2.6,
		weightkg: 218.2,
		eggGroups: ["Monster"],
	},
	zydisc: {
		num: 75000668,
		types: ["Water", "Dragon"],
		species: "Zydisc",
		baseStats: {hp: 48, atk: 85, def: 63, spa: 60, spd: 95, spe: 106},
		abilities: {0: "Hydrolysis"},
		heightm: 0.9,
		weightkg: 21.1,
		fusion: ["Zygarde-10%", "Luvdisc"],
		otherFormes: ["zydiscbuff"],
		eggGroups: ["Undiscovered"],
	},
	zydiscbuff: {
		num: 75000668,
		types: ["Water", "Dragon"],
		species: "Zydisc-Buff",
      baseSpecies: "Zydisc",
      forme: "Buff",
      formeLetter: "B",
		baseStats: {hp: 210, atk: 85, def: 113, spa: 90, spd: 105, spe: 76},
		abilities: {0: "Hydrolysis"},
		heightm: 4.2,
		weightkg: 597.6,
		eggGroups: ["Undiscovered"],
	},
	sillyputty: {
		num: 75000669,
		types: ["Normal", "Fairy"],
		gender: "N",
		species: "Silly Putty",
		baseStats: {hp: 110, atk: 60, def: 60, spa: 70, spd: 50, spe: 50},
		abilities: {0: "Ultimate Scout"},
		heightm: 0.65,
		weightkg: 8,
		fusion: ["Ditto", "Wigglytuff"],
		eggGroups: ["Fairy"],
	},
	magnetar: {
		num: 75000670,
		types: ["Steel", "Dark"],
		species: "Magnetar",
		gender: "N",
		baseStats: {hp: 105, atk: 102, def: 112, spa: 132, spd: 95, spe: 60},
		abilities: {0: "Iron Dust Push"},
		heightm: 1.6,
		weightkg: 191,
		fusion: ["Magnezone", "Tyranitar"],
		otherFormes: ["magnetarmega"],
		eggGroups: ["Undiscovered"],
	},
	magnetarmega: {
		num: 75000670,
		types: ["Steel", "Dark"],
		species: "Magnetar-Mega",
      baseSpecies: "Magnetar",
      forme: "Mega",
      formeLetter: "M",
		baseStats: {hp: 105, atk: 132, def: 152, spa: 132, spd: 115, spe: 70},
		abilities: {0: "Sand Stream"},
		heightm: 2.1,
		weightkg: 244,
		eggGroups: ["Undiscovered"],
	},
	castor: {
		num: 75000671,
		types: ["Fairy", "Normal"],
		species: "Castor",
		baseStats: {hp: 79, atk: 77, def: 77, spa: 107, spd: 102, spe: 85},
		abilities: {0: "Climate Compile"},
		heightm: 0.95,
		weightkg: 24.6,
		fusion: ["Castform", "Gardevoir"],
		otherFormes: ["castorsunny", "castorrainy", "castorsnowy", "castorsandy", "castorspooky", "castorprickly", "castordirty", "castormega", "castormegasunny", "castormegarainy", "castormegasnowy", "castormegasandy", "castormegaspooky", "castormegaprickly"],
		eggGroups: ["Amorphous"],
	},
	castorsunny: {
		num: 75000671,
		types: ["Fairy", "Fire"],
		species: "Castor-Sunny",
      baseSpecies: "Castor",
      forme: "Sunny",
      formeLetter: "S",
		baseStats: {hp: 79, atk: 77, def: 77, spa: 107, spd: 102, spe: 85},
		abilities: {0: "Climate Compile"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castorrainy: {
		num: 75000671,
		types: ["Fairy", "Water"],
		species: "Castor-Rainy",
      baseSpecies: "Castor",
      forme: "Rainy",
      formeLetter: "R",
		baseStats: {hp: 79, atk: 77, def: 77, spa: 107, spd: 102, spe: 85},
		abilities: {0: "Climate Compile"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castorsnowy: {
		num: 75000671,
		types: ["Fairy", "Ice"],
		species: "Castor-Snowy",
      baseSpecies: "Castor",
      forme: "Snowy",
      formeLetter: "S",
		baseStats: {hp: 79, atk: 77, def: 77, spa: 107, spd: 102, spe: 85},
		abilities: {0: "Climate Compile"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castorsandy: {
		num: 75000671,
		types: ["Fairy", "Rock"],
		species: "Castor-Sandy",
      baseSpecies: "Castor",
      forme: "Sandy",
      formeLetter: "S",
		baseStats: {hp: 79, atk: 77, def: 77, spa: 107, spd: 102, spe: 85},
		abilities: {0: "Climate Compile"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castorspooky: {
		num: 75000671,
		types: ["Fairy", "Ghost"],
		species: "Castor-Spooky",
      baseSpecies: "Castor",
      forme: "Spooky",
      formeLetter: "S",
		baseStats: {hp: 79, atk: 77, def: 77, spa: 107, spd: 102, spe: 85},
		abilities: {0: "Climate Compile"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castorprickly: {
		num: 75000671,
		types: ["Fairy", "Grass"],
		species: "Castor-Prickly",
      baseSpecies: "Castor",
      forme: "Prickly",
      formeLetter: "P",
		baseStats: {hp: 79, atk: 77, def: 77, spa: 107, spd: 102, spe: 85},
		abilities: {0: "Climate Compile"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castordirty: {
		num: 75000671,
		types: ["Fairy", "Steel"],
		species: "Castor-Dirty",
      baseSpecies: "Castor",
      forme: "Dirty",
      formeLetter: "D",
		baseStats: {hp: 79, atk: 77, def: 77, spa: 107, spd: 102, spe: 85},
		abilities: {0: "Climate Compile"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castormega: {
		num: 75000671,
		types: ["Fairy", "Normal"],
		species: "Castor-Mega",
      baseSpecies: "Castor",
      forme: "Mega",
      formeLetter: "M",
		baseStats: {hp: 79, atk: 97, def: 77, spa: 147, spd: 122, spe: 105},
		abilities: {0: "Pixilate"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castormegasunny: {
		num: 75000671,
		types: ["Fairy", "Fire"],
		species: "Castor-Mega-Sunny",
      baseSpecies: "Castor",
      forme: "Mega-Sunny",
      formeLetter: "M",
		baseStats: {hp: 79, atk: 97, def: 77, spa: 147, spd: 122, spe: 105},
		abilities: {0: "Pixilate"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castormegarainy: {
		num: 75000671,
		types: ["Fairy", "Water"],
		species: "Castor-Mega-Rainy",
      baseSpecies: "Castor",
      forme: "Mega-Rainy",
      formeLetter: "M",
		baseStats: {hp: 79, atk: 97, def: 77, spa: 147, spd: 122, spe: 105},
		abilities: {0: "Pixilate"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castormegasnowy: {
		num: 75000671,
		types: ["Fairy", "Ice"],
		species: "Castor-Mega-Snowy",
      baseSpecies: "Castor",
      forme: "Mega-Snowy",
      formeLetter: "M",
		baseStats: {hp: 79, atk: 97, def: 77, spa: 147, spd: 122, spe: 105},
		abilities: {0: "Pixilate"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castormegasandy: {
		num: 75000671,
		types: ["Fairy", "Rock"],
		species: "Castor-Mega-Sandy",
      baseSpecies: "Castor",
      forme: "Mega-Sandy",
      formeLetter: "M",
		baseStats: {hp: 79, atk: 97, def: 77, spa: 147, spd: 122, spe: 105},
		abilities: {0: "Pixilate"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castormegaspooky: {
		num: 75000671,
		types: ["Fairy", "Ghost"],
		species: "Castor-Mega-Spooky",
      baseSpecies: "Castor",
      forme: "Mega-Spooky",
      formeLetter: "M",
		baseStats: {hp: 79, atk: 97, def: 77, spa: 147, spd: 122, spe: 105},
		abilities: {0: "Pixilate"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castorprickly: {
		num: 75000671,
		types: ["Fairy", "Grass"],
		species: "Castor-Mega-Prickly",
      baseSpecies: "Castor",
      forme: "Mega-Prickly",
      formeLetter: "M",
		baseStats: {hp: 79, atk: 97, def: 77, spa: 147, spd: 122, spe: 105},
		abilities: {0: "Pixilate"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	castordirty: {
		num: 75000671,
		types: ["Fairy", "Steel"],
		species: "Castor-Mega-Dirty",
      baseSpecies: "Castor",
      forme: "Mega-Dirty",
      formeLetter: "M",
		baseStats: {hp: 79, atk: 97, def: 77, spa: 147, spd: 122, spe: 105},
		abilities: {0: "Pixilate"},
		heightm: 0.95,
		weightkg: 24.6,
		eggGroups: ["Amorphous"],
	},
	throopah: {
		num: 75000672,
		types: ["Fighting", "Dark"],
		gender: "M",
		species: "Throopah",
		baseStats: {hp: 110, atk: 150, def: 62, spa: 100, spd: 107, spe: 62},
		abilities: {0: "Sinister Magic"},
		heightm: 3.9,
		weightkg: 272.7,
		fusion: ["Throh", "Hoopa-Unbound"],
		eggGroups: ["Undiscovered"],
	},
	darmadon: {
		num: 75000673,
		types: ["Ground", "Fire"],
		species: "Darmadon",
		baseStats: {hp: 116, atk: 136, def: 96, spa: 59, spd: 73, spe: 81},
		abilities: {0: "Zen Statue"},
		heightm: 1.65,
		weightkg: 196.4,
		fusion: ["Darmanitan", "Hippowdon"],
		otherFormes: ["darmadonzen"],
		eggGroups: ["Field"],
	},
	darmadonzen: {
		num: 75000673,
		types: ["Ground", "Psychic"],
		species: "Darmadon-Zen",
      baseSpecies: "Darmadon",
      forme: "Zen",
      formeLetter: "Z",
		baseStats: {hp: 116, atk: 59, def: 146, spa: 136, spd: 123, spe: 41},
		abilities: {0: "Zen Statue"},
		heightm: 1.65,
		weightkg: 196.4,
		eggGroups: ["Field"],
	},
	exeggcute: {
		num: 102,
		species: "Exeggcute",
		types: ["Grass", "Psychic"],
		baseStats: {hp: 60, atk: 40, def: 80, spa: 60, spd: 45, spe: 40},
		abilities: {0: "Chlorophyll", H: "Harvest"},
		heightm: 0.4,
		weightkg: 2.5,
		color: "Pink",
		evos: ["exeggutor", "exeggutoralola", "exeggutorprime"],
		eggGroups: ["Grass"],
	},
	exeggutorprime: {
		num: 103,
		species: "Exeggutor-Prime",
		baseSpecies: "Exeggutor",
		forme: "Prime",
		formeLetter: "P",
		types: ["Dragon", "Psychic"],
		baseStats: {hp: 105, atk: 110, def: 95, spa: 135, spd: 85, spe: 60},
		abilities: {0: "Berry Nice"},
		heightm: 6.45,
		weightkg: 267.8,
		color: "Yellow",
		prevo: "exeggcute",
		evoType: "stone",
		evoItem: "Leaf Stone",
		fusion: ["Exeggutor", "Exeggutor-Alola"],
		eggGroups: ["Grass"],
	},
	haunky: {
		num: 75000675,
		types: ["Ghost", "Ice"],
		gender: "N",
		species: "Haunky",
		baseStats: {hp: 85, atk: 85, def: 67, spa: 162, spd: 77, spe: 115},
		abilities: {0: "Turbotastic"},
		heightm: 2.6,
		weightkg: 162.5,
		fusion: ["Haunter", "Kyurem-White"],
		eggGroups: ["Undiscovered"],
	},
	watchozma: {
		num: 75000676,
		types: ["Steel", "Normal"],
		species: "Watchozma",
		baseStats: {hp: 78, atk: 141, def: 118, spa: 86, spd: 89, spe: 77},
		abilities: {0: "Armour Expert"},
		heightm: 2.45,
		weightkg: 243.5,
		fusion: ["Watchog", "Necrozma-Dusk-Mane"],
		otherFormes: ["watchozmaultra"],
		eggGroups: ["Undiscovered"],
	},
	watchozmaultra: {
		num: 75000676,
		types: ["Steel", "Dragon"],
		species: "Watchozma-Ultra",
      baseSpecies: "Watchozma",
      forme: "Ultra",
      formeLetter: "U",
		baseStats: {hp: 78, atk: 151, def: 88, spa: 151, spd: 88, spe: 129},
		abilities: {0: "Neuroforce"},
		heightm: 6.15,
		weightkg: 13.5,
		eggGroups: ["Undiscovered"],
	},
	armalion: {
		num: 75000677,
		types: ["Steel", "Bug"],
		species: "Armalion",
		baseStats: {hp: 83, atk: 127, def: 114, spa: 80, spd: 76, spe: 96},
		abilities: {0: "Water Warrior"},
		heightm: 1.8,
		weightkg: 159.1,
		fusion: ["Armaldo", "Cobalion"],
		eggGroups: ["Undiscovered"],
	},
	blazipour: {
		num: 75000678,
		types: ["Water", "Fighting"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
		species: "Blazipour",
		baseStats: {hp: 87, atk: 119, def: 76, spa: 114, spd: 76, spe: 100},
		abilities: {0: "Fast Food"},
		heightm: 1.45,
		weightkg: 40.5,
		fusion: ["Simipour", "Blaziken"],
		otherFormes: ["blazipourmega"],
		eggGroups: ["Field"],
	},
	blazipourmega: {
		num: 75000678,
		types: ["Water", "Fighting"],
        genderRatio: {
            M: 0.875,
            F: 0.125
        },
		species: "Blazipour-Mega",
      baseSpecies: "Blazipour",
      forme: "Mega",
      formeLetter: "M",
		baseStats: {hp: 87, atk: 159, def: 86, spa: 134, spd: 86, spe: 120},
		abilities: {0: "Speed Boost"},
		heightm: 1.45,
		weightkg: 40.5,
		eggGroups: ["Field"],
	},
	mushdale: {
		num: 75000679,
		types: ["Psychic", "Ground"],
		species: "Mushdale",
		baseStats: {hp: 118, atk: 100, def: 102, spa: 91, spd: 100, spe: 42},
		abilities: {0: "Stalwart"},
		heightm: 1.8,
		weightkg: 490.2,
		fusion: ["Musharna", "Mudsdale"],
		eggGroups: ["Field"],
	},
	except: {
		num: 75000680,
		types: ["Grass", "Fire"],
		species: "Except",
		baseStats: {hp: 79, atk: 113, def: 71, spa: 151, spd: 79, spe: 97},
		abilities: {0: "Photosynthesizing Beast"},
		heightm: 1.9,
		weightkg: 66.5,
		fusion: ["Exeggutor", "Blacephalon"],
		eggGroups: ["Undiscovered"],
	},
	byegerestic: {
		num: 75000681,
		types: ["Ground", "Psychic"],
		species: "Byegerestic",
		gender: "F",
		baseStats: {hp: 89, atk: 62, def: 86, spa: 76, spd: 89, spe: 101},
		abilities: {0: "Superhuman"},
		heightm: 0.8,
		weightkg: 25.4,
		fusion: ["Meowstic-F", "Diggersby"],
		eggGroups: ["Field"],
	},
	mawiggly: {
		num: 75000682,
		types: ["Steel", "Fairy"],
        genderRatio: {
            M: 0.375,
            F: 0.625
        },
		species: "Mawiggly",
		baseStats: {hp: 105, atk: 87, def: 75, spa: 80, spd: 62, spe: 57},
		abilities: {0: "Toughest Around"},
		heightm: 0.8,
		weightkg: 11.7,
		fusion: ["Mawile", "Wigglytuff"],
		otherFormes: ["mawigglymega"],
		eggGroups: ["Fairy"],
	},
	mawigglymega: {
		num: 75000682,
		types: ["Steel", "Fairy"],
        genderRatio: {
            M: 0.375,
            F: 0.625
        },
		species: "Mawiggly-Mega",
      baseSpecies: "Mawiggly",
      forme: "Mega",
      formeLetter: "M",
		baseStats: {hp: 105, atk: 107, def: 115, spa: 80, spd: 102, spe: 57},
		abilities: {0: "Huge Power"},
		heightm: 1.2,
		weightkg: 23.7,
		eggGroups: ["Fairy"],
	},
	mushoal: {
		num: 75000683,
		types: ["Fire", "Psychic"],
		species: "Mushoal",
		baseStats: {hp: 103, atk: 80, def: 122, spa: 106, spd: 92, spe: 34},
		abilities: {0: "Hypersensitive"},
		heightm: 0.8,
		weightkg: 70.4,
		fusion: ["Musharna", "Torkoal"],
		eggGroups: ["Field"],
	},
	gongira: {
		num: 75000684,
		types: ["Water", "Ghost"],
		species: "Gongira",
		baseStats: {hp: 120, atk: 85, def: 120, spa: 85, spd: 127, spe: 80},
		abilities: {0: "Ice Pack"},
		heightm: 3.1,
		weightkg: 435,
		fusion: ["Dewgong", "Giratina"],
		eggGroups: ["Undiscovered"],
	},
	accelfini: {
		num: 75000685,
		types: ["Bug", "Water"],
		species: "Accel Fini",
		baseStats: {hp: 95, atk: 72, def: 77, spa: 117, spd: 95, spe: 115},
		abilities: {0: "Misty Blessing"},
		heightm: 1.05,
		weightkg: 23.2,
		fusion: ["Accelgor", "Tapu Fini"],
		eggGroups: ["Undiscovered"],
	},
	uxiancie: {
		num: 75000686,
		types: ["Psychic", "Fairy"],
      gender: "N",
		species: "Uxiancie",
		baseStats: {hp: 72, atk: 87, def: 155, spa: 87, spd: 155, spe: 72},
		abilities: {0: "Glassy Image"},
		heightm: 0.5,
		weightkg: 4.5,
		fusion: ["Uxie", "Diancie"],
		otherFormes: ["uxianciemega"],
		eggGroups: ["Undiscovered"],
	},
	uxianciemega: {
		num: 75000686,
		types: ["Psychic", "Fairy"],
      gender: "N",
		species: "Uxiancie-Mega",
      baseSpecies: "Uxiancie",
      forme: "Mega",
      formeLetter: "M",
		baseStats: {hp: 72, atk: 147, def: 115, spa: 147, spd: 115, spe: 132},
		abilities: {0: "Magic Bounce"},
		heightm: 0.9,
		weightkg: 16.5,
		eggGroups: ["Undiscovered"],
	},
	dracodraco: {
		num: 75000687,
		types: ["Dragon"],
      gender: "N",
		species: "Dracodraco",
		baseStats: {hp: 95, atk: 110, def: 110, spa: 80, spd: 80, spe: 100},
		abilities: {0: "Sand Rush"},
		heightm: 2.05,
		weightkg: 202.5,
		fusion: ["Dracovish", "Dracozolt"],
		eggGroups: ["Undiscovered"],
	},
	crufearigus: {
		num: 75000688,
		types: ["Ghost", "Ground"],
		species: "Crufearigus",
		baseStats: {hp: 68, atk: 82, def: 155, spa: 82, spd: 115, spe: 40},
		abilities: {0: "Vengeful Curse"},
		heightm: 1.65,
		weightkg: 71.55,
		fusion: ["Cofagrigus", "Runerigus"],
		eggGroups: ["Mineral"],
	},
	pyukchin: {
		num: 75000689,
		types: ["Water", "Electric"],
		species: "Pyukchin",
		baseStats: {hp: 61, atk: 90, def: 120, spa: 70, spd: 117, spe: 20},
		abilities: {0: "Thunderhead"},
		heightm: 0.3,
		weightkg: 1.1,
		fusion: ["Pyukumuku", "Pincurchin"],
		eggGroups: ["Water 1"],
	},
	sabatus: {
		num: 75000690,
		types: ["Ghost", "Dragon"],
		species: "Sabatus",
		baseStats: {hp: 100, atk: 90, def: 90, spa: 115, spd: 90, spe: 90},
		abilities: {0: "Doldrum"},
		heightm: 10.25,
		weightkg: 480.5,
		fusion: ["Sableye", "Eternatus"],
		otherFormes: ["sabatusmega"],
		eggGroups: ["Undiscovered"],
	},
	sabatusmega: {
		num: 75000690,
		types: ["Ghost", "Dragon"],
		species: "Sabatus-Mega",
      baseSpecies: "Sabatus",
      forme: "Mega",
      formeLetter: "M",
		baseStats: {hp: 100, atk: 100, def: 140, spa: 135, spd: 140, spe: 60},
		abilities: {0: "Magic Bounce"},
		heightm: 10.25,
		weightkg: 630.5,
		eggGroups: ["Undiscovered"],
	},
	gardecitytamper: {
		num: 75000691,
		types: ["Fairy", "Poison"],
		species: "Garcedity-Tamper",
		baseStats: {hp: 81, atk: 91, def: 77, spa: 129, spd: 102, spe: 87},
		abilities: {0: "Alchemist"},
		heightm: 1.6,
		weightkg: 44.2,
		fusion: ["Gardevoir", "Toxtricity-Amped"],
		otherFormes: ["gardecitytampermega"],
		eggGroups: ["Human-Like"],
	},
	gardecitytampermega: {
		num: 75000691,
		types: ["Fairy", "Poison"],
		species: "Gardecity-Tamper-Mega",
      baseSpecies: "Gardecity-Tamper",
      forme: "Mega",
      formeLetter: "M",
		baseStats: {hp: 81, atk: 111, def: 77, spa: 169, spd: 122, spe: 107},
		abilities: {0: "Pixilate"},
		heightm: 1.6,
		weightkg: 44.2,
		eggGroups: ["Human-Like"],
	},
	icepole: {
		num: 75000692,
		types: ["Ice", "Water"],
		species: "Ice Pole",
		baseForme: "Frozen",
		baseStats: {hp: 89, atk: 93, def: 109, spa: 98, spd: 105, spe: 65},
		abilities: {0: "Freeze and Melt"},
		heightm: 1.55,
		weightkg: 86.75,
		fusion: ["Eiscue", "Empoleon"],
		otherFormes: ["icepolemelted"],
		eggGroups: ["Water 1", "Field"],
	},
	icepolemelted: {
		num: 75000692,
		types: ["Ice", "Water"],
		species: "Ice Pole-Melted",
      baseSpecies: "Ice Pole",
      forme: "Melted",
      formeLetter: "M",
		baseStats: {hp: 89, atk: 93, def: 69, spa: 98, spd: 65, spe: 145},
		abilities: {0: "Freeze and Melt"},
		heightm: 1.55,
		weightkg: 86.75,
		eggGroups: ["Water 1", "Field"],
	},
	steezzoll: {
		num: 75000693,
		types: ["Fighting", "Steel"],
		species: "Steezzoll",
		baseStats: {hp: 110, atk: 112, def: 180, spa: 54, spd: 69, spe: 54},
		abilities: {0: "Standing Threat"},
		heightm: 5.8,
		weightkg: 366.8,
		fusion: ["Steelix", "Buzzwole"],
		otherFormes: ["steezzollmega"],
		eggGroups: ["Undiscovered"],
	},
	steezzollmega: {
		num: 75000693,
		types: ["Fighting", "Steel"],
		species: "Steezzoll-Mega",
      baseSpecies: "Steezzoll",
      forme: "Mega",
      formeLetter: "M",
		baseStats: {hp: 110, atk: 142, def: 210, spa: 54, spd: 99, spe: 54},
		abilities: {0: "Sand Force"},
		heightm: 7.1,
		weightkg: 706.8,
		eggGroups: ["Undiscovered"],
	},
	runereelix: {
		num: 75000694,
		types: ["Ground", "Steel"],
		species: "Runereelix",
		baseStats: {hp: 76, atk: 100, def: 182, spa: 62, spd: 95, spe: 40},
		abilities: {0: "Armored Wanderer"},
		heightm: 5.4,
		weightkg: 233.3,
		fusion: ["Steelix", "Runerigus"],
		otherFormes: ["runereelixmega"],
		eggGroups: ["Mineral"],
	},
	runereelixmega: {
		num: 75000694,
		types: ["Ground", "Steel"],
		species: "Runereelix-Mega",
      baseSpecies: "Runereelix",
      forme: "Mega",
      formeLetter: "M",
		baseStats: {hp: 76, atk: 140, def: 212, spa: 62, spd: 125, spe: 40},
		abilities: {0: "Sand Force"},
		heightm: 6.7,
		weightkg: 573.3,
		eggGroups: ["Mineral"],
	},
	runethorns: {
		num: 75000695,
		types: ["Steel", "Ground"],
		species: "Rune Thorns",
		baseStats: {hp: 76, atk: 104, def: 148, spa: 62, spd: 120, spe: 35},
		abilities: {0: "Artifact Curse"},
		heightm: 1.3,
		weightkg: 88.3,
		fusion: ["Runerigus", "Ferrothorn"],
		eggGroups: ["Mineral"],
	},
	suplexelpus: {
		num: 75000696,
		types: ["Fighting", "Water"],
		species: "Suplexelpus",
		baseStats: {hp: 80, atk: 105, def: 136, spa: 76, spd: 126, spe: 53},
		abilities: {0: "Limber"},
		heightm: 1.15,
		weightkg: 26.75,
		fusion: ["Toxapex", "Grapploct"],
		eggGroups: ["Water 1"],
	},
	quagmirecrowned: {
		num: 75000697,
		types: ["Water", "Steel"],
		species: "Quagmire-Crowned",
		baseStats: {hp: 113, atk: 110, def: 115, spa: 75, spd: 115, spe: 85},
		abilities: {0: "Unaware Shield"},
		heightm: 2.15,
		weightkg: 430,
		fusion: ["Quagsire", "Zamazenta-Crowned"],
		eggGroups: ["Undiscovered"],
	},
	cogalyph: {
		num: 75000698,
		types: ["Steel", "Psychic"],
		species: "Cogalyph",
		baseStats: {hp: 91, atk: 74, def: 110, spa: 116, spd: 81, spe: 102},
		abilities: {0: "Revenge Guard"},
		heightm: 1.75,
		weightkg: 132,
		fusion: ["Cobalion", "Sigilyph"],
		eggGroups: ["Undiscovered"],
	},
	escaskorch: {
		num: 75000699,
		types: ["Fire", "Steel"],
		species: "Escaskorch",
		baseStats: {hp: 95, atk: 135, def: 95, spa: 85, spd: 107, spe: 52},
		abilities: {0: "Flammable Spray"},
		heightm: 2,
		weightkg: 76.5,
		fusion: ["Escavalier", "Centiskorch"],
		eggGroups: ["Bug"],
	},
	kyuvatron: {
		num: 75000700,
		types: ["Electric", "Ice"],
		species: "Kyuvatron",
		baseStats: {hp: 95, atk: 135, def: 95, spa: 85, spd: 107, spe: 52},
		abilities: {0: "Heat-Seeking Radiation"},
		heightm: 2.2,
		weightkg: 169.65,
		fusion: ["Kyurem-White", "Galvantula"],
		eggGroups: ["Undiscovered"],
	},
	cramazanta: {
		num: 75000701,
		types: ["Steel", "Water"],
		species: "Cramazanta",
		baseForme: "Carped",
		baseStats: {hp: 101, atk: 107, def: 110, spa: 82, spd: 130, spe: 106},
		abilities: {0: "Reactive Armor"},
		heightm: 1.85,
		weightkg: 401.5,
		fusion: ["Zamazenta-Crowned", "Cramorant"],
		otherFormes: ["cramazantagulping", "cramazantagorging"],
		eggGroups: ["Undiscovered"],
	},
	cramazantagulping: {
		num: 75000701,
		types: ["Steel", "Water"],
		species: "Cramazanta-Gulping",
      baseSpecies: "Cramazanta",
      forme: "Gulping",
      formeLetter: "G",
		baseStats: {hp: 101, atk: 107, def: 110, spa: 82, spd: 130, spe: 106},
		abilities: {0: "Reactive Armor"},
		heightm: 1.85,
		weightkg: 401.5,
		eggGroups: ["Undiscovered"],
	},
	cramazantagorging: {
		num: 75000701,
		types: ["Steel", "Water"],
		species: "Cramazanta-Gorging",
      baseSpecies: "Cramazanta",
      forme: "Gorging",
      formeLetter: "G",
		baseStats: {hp: 101, atk: 107, def: 110, spa: 82, spd: 130, spe: 106},
		abilities: {0: "Reactive Armor"},
		heightm: 1.85,
		weightkg: 401.5,
		eggGroups: ["Undiscovered"],
	},
	rotomwheeze: {
		num: 75000702,
		types: ["Electric", "Poison"],
		species: "Rotom-Wheeze",
		gender: "N",
		baseStats: {hp: 57, atk: 77, def: 133, spa: 115, spd: 88, spe: 73},
		abilities: {0: "Magic Gas"},
		heightm: 1.65,
		weightkg: 8.15,
		fusion: ["Rotom-Wash", "Weezing"],
		eggGroups: ["Amorphous"],
	},
	boomer: {
		num: 75000703,
		types: ["Electric", "Fire"],
		species: "Boomer",
		baseStats: {hp: 67, atk: 113, def: 61, spa: 151, spd: 83, spe: 97},
		abilities: {0: "Tiktok Cringe"},
		heightm: 1.7,
		weightkg: 26.5,
		fusion: ["Blacephalon", "Toxtricity-Amped"],
		eggGroups: ["Undiscovered"],
	},
	tapuapex: {
		num: 75000704,
		types: ["Poison", "Water"],
		species: "Tapu Apex",
		baseStats: {hp: 80, atk: 69, def: 153, spa: 74, spd: 136, spe: 60},
		abilities: {0: "Gaseous Surge"},
		heightm: 1,
		weightkg: 17.85,
		fusion: ["Toxapex", "Tapu Fini"],
		eggGroups: ["Undiscovered"],
	},
	terror: {
		num: 75000705,
		types: ["Grass", "Steel"],
		species: "Terror",
		gender: "F",
		baseStats: {hp: 83, atk: 117, def: 124, spa: 62, spd: 117, spe: 56},
		abilities: {0: "Queenly Barbs"},
		heightm: 1.1,
		weightkg: 65.7,
		fusion: ["Tsareena", "Ferrothorn"],
		eggGroups: ["Grass"],
	},
	xyeromdefense: {
		num: 75000706,
		types: ["Dragon", "Psychic"],
		species: "Xyerom-Defense",
		gender: "N",
		baseStats: {hp: 105, atk: 115, def: 130, spa: 115, spd: 130, spe: 105},
		abilities: {0: "Pressure"},
		heightm: 2.35,
		weightkg: 192.9,
		fusion: ["Kyurem", "Deoxys-Defense"],
		eggGroups: ["Undiscovered"],
	},
	crayquazant: {
		num: 75000707,
		types: ["Water", "Flying"],
		species: "Crayquazant",
		baseStats: {hp: 87, atk: 127, def: 72, spa: 127, spd: 92, spe: 110},
		abilities: {0: "Weather Missile"},
		heightm: 2.35,
		weightkg: 112.25,
		fusion: ["Rayquaza", "Cramorant"],
		otherFormes: ["crayquazantgulping", "crayquazantgorging", "crayquazantmega"],
		eggGroups: ["Undiscovered"],
	},
	crayquazantgulping: {
		num: 75000707,
		types: ["Water", "Flying"],
		species: "Crayquazant-Gulping",
      baseSpecies: "Crayquazant",
      forme: "Gulping",
      formeLetter: "G",
		baseStats: {hp: 87, atk: 127, def: 72, spa: 127, spd: 92, spe: 110},
		abilities: {0: "Weather Missile"},
		heightm: 2.35,
		weightkg: 112.25,
		eggGroups: ["Undiscovered"],
	},
	crayquazantgorging: {
		num: 75000707,
		types: ["Water", "Flying"],
		species: "Crayquazant-Gorging",
      baseSpecies: "Crayquazant",
      forme: "Gorging",
      formeLetter: "G",
		baseStats: {hp: 87, atk: 127, def: 72, spa: 127, spd: 92, spe: 110},
		abilities: {0: "Weather Missile"},
		heightm: 2.35,
		weightkg: 112.25,
		eggGroups: ["Undiscovered"],
	},
	crayquazantmega: {
		num: 75000707,
		types: ["Water", "Flying"],
		species: "Crayquazant-Mega",
      baseSpecies: "Crayquazant",
      forme: "Mega",
      formeLetter: "M",
		baseStats: {hp: 87, atk: 157, def: 82, spa: 157, spd: 102, spe: 130},
		abilities: {0: "Delta Stream"},
		heightm: 6.15,
		weightkg: 297.75,
		eggGroups: ["Undiscovered"],
	},
	sealedjar: {
		num: 75000708,
		types: ["Normal", "Ghost"],
		species: "Sealed Jar",
		baseStats: {hp: 48, atk: 55, def: 40, spa: 25, spd: 37, spe: 77},
		abilities: {0: "Erratic Guard"},
		heightm: 1,
		weightkg: 29.6,
		fusion: ["Smeargle", "Shedinja"],
		eggGroups: ["Undiscovered"],
	},
	gardachonda: {
		num: 75000709,
		types: ["Dragon", "Ground"],
		species: "Gardachonda",
		baseStats: {hp: 100, atk: 128, def: 110, spa: 82, spd: 81, spe: 96},
		abilities: {0: "Sand's Wrath"},
		heightm: 2.85,
		weightkg: 80.25,
		fusion: ["Garchomp", "Sandaconda"],
		otherFormes: ["gardachondamega"],
		eggGroups: ["Dragon"],
	},
	gardachondamega: {
		num: 75000709,
		types: ["Dragon", "Ground"],
		species: "Gardachonda-Mega",
      baseSpecies: "Gardachonda",
      forme: "Mega",
      formeLetter: "M",
		baseStats: {hp: 100, atk: 168, def: 130, spa: 122, spd: 91, spe: 86},
		abilities: {0: "Sand's Wrath"},
		heightm: 2.85,
		weightkg: 80.25,
		eggGroups: ["Dragon"],
	},
	toges: {
		num: 75000710,
		types: ["Fairy"],
		species: "Toges",
		baseStats: {hp: 91, atk: 67, def: 91, spa: 126, spd: 144, spe: 77},
		abilities: {0: "Sand's Wrath"},
		heightm: 1.3,
		weightkg: 24,
		fusion: ["Togekiss", "Florges"],
		eggGroups: ["Fairy"],
	},
	salasanda: {
		num: 75000711,
		types: ["Dragon", "Ground"],
		species: "Salasanda",
		baseStats: {hp: 93, atk: 131, def: 112, spa: 97, spd: 85, spe: 95},
		abilities: {0: "Domination"},
		heightm: 2.65,
		weightkg: 84.05,
		fusion: ["Salamence", "Sandaconda"],
		otherFormes: ["salasandamega"],
		eggGroups: ["Dragon"],
	},
	salasandamega: {
		num: 75000711,
		types: ["Dragon", "Ground"],
		species: "Salasanda-Mega",
      baseSpecies: "Salasanda",
      forme: "Mega",
      formeLetter: "M",
		baseStats: {hp: 93, atk: 141, def: 162, spa: 107, spd: 95, spe: 115},
		abilities: {0: "Aerilate"},
		heightm: 2.65,
		weightkg: 84.05,
		eggGroups: ["Dragon"],
	},
	satan: {
		num: 75000712,
		types: ["Dark", "Ice"],
		species: "Satan",
		baseStats: {hp: 100, atk: 135, def: 110, spa: 80, spd: 85, spe: 93},
		abilities: {0: "Ice Age"},
		heightm: 3.5,
		weightkg: 129,
		fusion: ["Sandslash-Alola", "Yveltal"],
		eggGroups: ["Undiscovered"],
	},
};
