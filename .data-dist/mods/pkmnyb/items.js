"use strict";Object.defineProperty(exports, "__esModule", {value: true}); const Items = {
    "waterstone": {
        id: "waterstone",
        name: "Water Stone",
        spritenum: 529,
        fling: {
            basePower: 80,
        },
        onBasePowerPriority: 6,
        onBasePower(basePower, user, target, move) {
            if (move.type === 'Water' || move.type === 'Ice') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        num: 84,
        gen: 1,
        desc: "Holder's Water-type and Ice-type attacks have 1.2x power. Evolves certain species of Pokemon when used",
    },
    "firestone": {
        id: "firestone",
        name: "Fire Stone",
        spritenum: 142,
        fling: {
            basePower: 80,
        },
        onBasePowerPriority: 6,
        onBasePower(basePower, user, target, move) {
            if (move.type === 'Fire' || move.type === 'Grass') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        num: 82,
        gen: 1,
        desc: "Holder's Fire-type and Grass-type attacks have 1.2x power. Evolves certain species of Pokemon when used",
    },
    "thunderstone": {
        id: "thunderstone",
        name: "Thunder Stone",
        spritenum: 492,
        fling: {
            basePower: 80,
        },
        onBasePowerPriority: 6,
        onBasePower(basePower, user, target, move) {
            if (move.type === 'Electric' || move.type === 'Fighting') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        num: 83,
        gen: 1,
        desc: "Holder's Electric-type and Fighting-type attacks have 1.2x power. Evolves certain species of Pokemon when used",
    },
    "leafstone": {
        id: "leafstone",
        name: "Leaf Stone",
        spritenum: 241,
        fling: {
            basePower: 80,
        },
        onBasePowerPriority: 6,
        onBasePower(basePower, user, target, move) {
            if (move.type === 'Grass' || move.type === 'Poison') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        num: 85,
        gen: 1,
        desc: "Holder's Grass-type and Poison-type attacks have 1.2x power. Evolves certain species of Pokemon when used",
    },
    "moonstone": {
        id: "moonstone",
        name: "Moon Stone",
        spritenum: 295,
        fling: {
            basePower: 80,
        },
        onBasePowerPriority: 6,
        onBasePower(basePower, user, target, move) {
            if (move.type === 'Fairy' || move.type === 'Dark') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        num: 81,
        gen: 1,
        desc: "Holder's Fairy-type and Dark-type attacks have 1.2x power. Evolves certain species of Pokemon when used",
    },
    "sunstone": {
        id: "sunstone",
        name: "Sun Stone",
        spritenum: 480,
        fling: {
            basePower: 80,
        },
        onBasePowerPriority: 6,
        onBasePower(basePower, user, target, move) {
            if (move.type === 'Psychic' || move.type === 'Grass') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        num: 80,
        gen: 2,
        desc: "Holder's Psychic-type and Grass-type attacks have 1.2x power. Evolves certain species of Pokemon when used",
    },
    "shinystone": {
        id: "shinystone",
        name: "Shiny Stone",
        spritenum: 439,
        fling: {
            basePower: 80,
        },
        onBasePowerPriority: 6,
        onBasePower(basePower, user, target, move) {
            if (move.type === 'Normal' || move.type === 'Fairy') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        num: 107,
        gen: 4,
        desc: "Holder's Normal-type and Fairy-type attacks have 1.2x power. Evolves certain species of Pokemon when used",
    },
    "duskstone": {
        id: "duskstone",
        name: "Dusk Stone",
        spritenum: 116,
        fling: {
            basePower: 80,
        },
        onBasePowerPriority: 6,
        onBasePower(basePower, user, target, move) {
            if (move.type === 'Ghost' || move.type === 'Dark') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        num: 108,
        gen: 4,
        desc: "Holder's Ghost-type and Dark-type attacks have 1.2x power. Evolves certain species of Pokemon when used",
    },
    "dawnstone": {
        id: "dawnstone",
        name: "Dawn Stone",
        spritenum: 92,
        fling: {
            basePower: 80,
        },
        onBasePowerPriority: 6,
        onBasePower(basePower, user, target, move) {
            if (move.type === 'Fighting' || move.type === 'Ice') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        num: 109,
        gen: 4,
        desc: "Holder's Fighting-type and Ice-type attacks have 1.2x power. Evolves certain species of Pokemon when used",
    },
    "bugmemory": {
        id: "bugmemory",
        name: "Bug Memory",
        spritenum: 673,
        onMemory: 'Bug',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Bug') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Bug",
        num: 909,
        gen: 7,
        desc: "Holder's Multi-Attack is Bug type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "darkmemory": {
        id: "darkmemory",
        name: "Dark Memory",
        spritenum: 683,
        onMemory: 'Dark',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Dark') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Dark",
        num: 919,
        gen: 7,
        desc: "Holder's Multi-Attack is Dark type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "dragonmemory": {
        id: "dragonmemory",
        name: "Dragon Memory",
        spritenum: 682,
        onMemory: 'Dragon',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Dragon') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Dragon",
        num: 918,
        gen: 7,
        desc: "Holder's Multi-Attack is Dragon type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "electricmemory": {
        id: "electricmemory",
        name: "Electric Memory",
        spritenum: 679,
        onMemory: 'Electric',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Electric') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Electric",
        num: 915,
        gen: 7,
        desc: "Holder's Multi-Attack is Electric type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "fairymemory": {
        id: "fairymemory",
        name: "Fairy Memory",
        spritenum: 684,
        onMemory: 'Fairy',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Fairy') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Fairy",
        num: 920,
        gen: 7,
        desc: "Holder's Multi-Attack is Fairy type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "fightingmemory": {
        id: "fightingmemory",
        name: "Fighting Memory",
        spritenum: 668,
        onMemory: 'Fighting',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Fighting') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Fighting",
        num: 904,
        gen: 7,
        desc: "Holder's Multi-Attack is Fighting type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "firememory": {
        id: "firememory",
        name: "Fire Memory",
        spritenum: 676,
        onMemory: 'Fire',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Fire') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Fire",
        num: 912,
        gen: 7,
        desc: "Holder's Multi-Attack is Fire type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "flyingmemory": {
        id: "flyingmemory",
        name: "Flying Memory",
        spritenum: 669,
        onMemory: 'Flying',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Flying') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Flying",
        num: 905,
        gen: 7,
        desc: "Holder's Multi-Attack is Flying type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "ghostmemory": {
        id: "ghostmemory",
        name: "Ghost Memory",
        spritenum: 674,
        onMemory: 'Ghost',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Ghost') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Ghost",
        num: 910,
        gen: 7,
        desc: "Holder's Multi-Attack is Ghost type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "grassmemory": {
        id: "grassmemory",
        name: "Grass Memory",
        spritenum: 678,
        onMemory: 'Grass',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Grass') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Grass",
        num: 914,
        gen: 7,
        desc: "Holder's Multi-Attack is Grass type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "groundmemory": {
        id: "groundmemory",
        name: "Ground Memory",
        spritenum: 671,
        onMemory: 'Ground',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Ground') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Ground",
        num: 907,
        gen: 7,
        desc: "Holder's Multi-Attack is Ground type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "icememory": {
        id: "icememory",
        name: "Ice Memory",
        spritenum: 681,
        onMemory: 'Ice',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Ice') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Ice",
        num: 917,
        gen: 7,
        desc: "Holder's Multi-Attack is Ice type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "poisonmemory": {
        id: "poisonmemory",
        name: "Poison Memory",
        spritenum: 670,
        onMemory: 'Poison',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Poison') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Poison",
        num: 906,
        gen: 7,
        desc: "Holder's Multi-Attack is Poison type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "psychicmemory": {
        id: "psychicmemory",
        name: "Psychic Memory",
        spritenum: 680,
        onMemory: 'Psychic',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Psychic') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Psychic",
        num: 916,
        gen: 7,
        desc: "Holder's Multi-Attack is Psychic type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "rockmemory": {
        id: "rockmemory",
        name: "Rock Memory",
        spritenum: 672,
        onMemory: 'Rock',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Rock') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Rock",
        num: 908,
        gen: 7,
        desc: "Holder's Multi-Attack is Rock type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "steelmemory": {
        id: "steelmemory",
        name: "Steel Memory",
        spritenum: 675,
        onMemory: 'Steel',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Steel') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Steel",
        num: 911,
        gen: 7,
        desc: "Holder's Multi-Attack is Steel type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "watermemory": {
        id: "watermemory",
        name: "Water Memory",
        spritenum: 677,
        onMemory: 'Water',
        onBasePowerPriority: 6,
        onBasePower: function (basePower, user, target, move) {
            if (move.type === 'Water') {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function (item, pokemon, source) {
            if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
                return false;
            }
            return true;
        },
        forcedForme: "Silvally-Water",
        num: 913,
        gen: 7,
        desc: "Holder's Multi-Attack is Water type. Holder's attacks of this plate's type have 1.2x power.",
    },
    "leek": {
        id: "leek",
        name: "Leek",
        fling: {
            basePower: 60,
        },
        spritenum: 475,
        onModifyCritRatio(critRatio, user) {
            if (["Farfetch'd", "Sirfetch'd"].includes(user.baseSpecies.baseSpecies)) {
                return critRatio + 2;
            }
        },
        onTakeItem: function(item, source) {
            if (source.baseSpecies.baseSpecies === "Farfetch'd" || source.baseSpecies.baseSpecies === "Sirfetch'd") return false;
            return true;
        },
        itemUser: ["Farfetch'd", "Sirfetch'd"],
        num: 259,
        gen: 8,
        desc: "If held by a Farfetch'd or Sirfetch'd, its critical hit ratio is raised by 2 stages.",
    },
    "lightball": {
        id: "lightball",
        name: "Light Ball",
        spritenum: 251,
        fling: {
            basePower: 30,
            status: 'par',
        },
        onModifyAtkPriority: 1,
        onModifyAtk(atk, pokemon) {
            if (pokemon.baseSpecies.baseSpecies === 'Pikachu') {
                return this.chainModify(2);
            }
        },
        onModifySpAPriority: 1,
        onModifySpA(spa, pokemon) {
            if (pokemon.baseSpecies.baseSpecies === 'Pikachu') {
                return this.chainModify(2);
            }
        },
        onTakeItem: function(item, source) {
            if (source.baseSpecies.baseSpecies === 'Pikachu') return false;
            return true;
        },
        onResidualOrder: 26,
        onResidualSubOrder: 2,
        onResidual(pokemon) {
            pokemon.trySetStatus('par', pokemon);
        },
        itemUser: ["Pikachu"],
        num: 236,
        gen: 2,
        desc: "If held by a Pikachu, its Attack and Sp. Atk are doubled.",
    },
    "ragecandybar": {
        id: "ragecandybar",
        name: "RageCandyBar",
        onStart: function(pokemon) {
            this.add('-item', pokemon, 'Rage Candy Bar');
            if (pokemon.baseSpecies.baseSpecies === 'Darmanitan') {
                pokemon.addVolatile('zenmode');
            }
        },
        fling: {
            basePower: 20,
        },
        onBasePowerPriority: 6,
        onBasePower: function(basePower, user, target, move) {
            if (move && (user.baseSpecies.num === 555) && (move.type === 'Psychic')) {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function(item, pokemon, source) {
            if ((source && source.baseSpecies.num === 555) || pokemon.baseSpecies.num === 555) {
                return false;
            }
            return true;
        },
        gen: 7,
        desc: "If this Pokémon is a Darmanitan, it becomes Zen Mode Darmanitan, and it's Psychic-Type moves have 1.2x more power",
    },
    "mintyragecandybar": {
        id: "mintyragecandybar",
        name: "RageCandyBar",
        onStart: function(pokemon) {
            this.add('-item', pokemon, 'MintyRageCandyBar');
            if (pokemon.baseSpecies.baseSpecies === 'Darmanitan') {
                pokemon.addVolatile('zenmode');
            }
        },
        fling: {
            basePower: 20,
        },
        onBasePowerPriority: 6,
        onBasePower: function(basePower, user, target, move) {
            if (move && (user.baseSpecies.num === 555) && (move.type === 'Fire')) {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function(item, pokemon, source) {
            if ((source && source.baseSpecies.num === 555) || pokemon.baseSpecies.num === 555) {
                return false;
            }
            return true;
        },
        gen: 8,
        desc: "If this Pokémon is a Darmanitan, it becomes Zen Mode Darmanitan, and it's Fire-Type moves have 1.2x more power",
    },
    "reliccharm": {
        id: "reliccharm",
        name: "Relic Charm",
        onStart: function(pokemon) {
            this.add('-item', pokemon, 'Relic Charm');
            if (pokemon.baseSpecies.baseSpecies === 'Meloetta') {
                this.add('-formechange', pokemon, 'Meloetta-Pirouette', '[msg]');
                pokemon.formeChange("Meloetta-Pirouette");
            }
        },
        fling: {
            basePower: 40,
        },
        onBasePowerPriority: 6,
        onBasePower: function(basePower, user, target, move) {
            if (move && (user.baseSpecies.num === 648) && (move.type === 'Fighting')) {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        onTakeItem: function(item, pokemon, source) {
            if ((source && source.baseSpecies.num === 648) || pokemon.baseSpecies.num === 648) {
                return false;
            }
            return true;
        },
        gen: 7,
        desc: "If this Pokémon is a Meloetta, it changes to Pirouette, and it's Fighting-Type moves have 1.2x more power",
    },
    "graduationscale": {
        id: "graduationscale",
        name: "Graduation Scale",
        onStart: function(pokemon) {
            this.add('-item', pokemon, 'Graduation Scale');
            if (pokemon.baseSpecies.baseSpecies === 'Wishiwashi') {
                this.add('-formechange', pokemon, 'Wishiwashi-School', '[msg]');
                pokemon.formeChange("Wishiwashi-School");
                let oldAbility = pokemon.setAbility('intimidate', pokemon, 'intimidate', true);
                if (oldAbility) {
                    this.add('-activate', pokemon, 'ability: Intimidate', oldAbility, '[of] ' + pokemon);
                }
            }
        },
        onTakeItem: function(item, source) {
            if (source.baseSpecies.baseSpecies === 'Wishiwashi' || source.baseSpecies.baseSpecies === 'Wishiwashi-School') return false;
            return true;
        },
        fling: {
            basePower: 20,
        },
        onBasePowerPriority: 6,
        onBasePower: function(basePower, user, target, move) {
            if (move && (user.baseSpecies.num === 746) && (move.type === 'Water')) {
                return this.chainModify([0x1333, 0x1000]);
            }
        },
        gen: 7,
        desc: "If holder is a Wishiwashi, it becomes School Form. Its ability becomes Intimidate. Water moves are boosted by 1.2x",
    },
    farawaystone: {
        name: "Faraway Stone",
        fling: {
            basePower: 130,
        },
        desc: "If the holder's evolution has a regional variant (and the holder isn't a regional variant), this Pokemon will evolve into that regional form when held.",
        shortDesc: "Allows the holder to evolve into a regional variant.",
    },
	"meganiumite": {
        id: "meganiumite",
        name: "Meganiumite",
        megaStone: "Meganium-Mega",
        megaEvolves: "Meganium",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Meganium, this item allows it to Mega Evolve in battle.",
    },
    "typhlosionite": {
        id: "typhlosionite",
        name: "Typhlosionite",
        megaStone: "Meganium-Mega",
        megaEvolves: "Meganium",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Typhlosion, this item allows it to Mega Evolve in battle.",
    },
    "feraligite": {
        id: "feraligite",
        name: "Feraligite",
        megaStone: "Feraligatr-Mega",
        megaEvolves: "Feraligatr",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Feraligatr, this item allows it to Mega Evolve in battle.",
    },
    "galarslowbronite": {
        id: "galarslowbronite",
        name: "Galarslowbronite",
        megaStone: "Slowbro-Galar-Mega",
        megaEvolves: "Slowbro-Galar",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Galarian Slowbro, this item allows it to Mega Evolve in battle.",
    },
    "slowkinite": {
        id: "slowkinite",
        name: "Slowkinite",
        megaStone: "Slowking-Mega",
        megaEvolves: "Slowking",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Slowking, this item allows it to Mega Evolve in battle.",
    },
    "froslassite": {
        id: "froslassite",
        name: "Froslassite",
        megaStone: "Froslass-Mega",
        megaEvolves: "Froslass",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Froslass, this item allows it to Mega Evolve in battle.",
    },
    "butterfrite": {
        id: "butterfrite",
        name: "Butterfrite",
        megaStone: "Butterfree-Mega",
        megaEvolves: "Butterfree",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Butterfree, this item allows it to Mega Evolve in battle.",
    },
    "milotite": {
        id: "milotite",
        name: "Milotite",
        megaStone: "Milotic-Mega",
        megaEvolves: "Milotic",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Milotic, this item allows it to Mega Evolve in battle.",
    },
    "dragonitite": {
        id: "dragonitite",
        name: "Dragonitite",
        megaStone: "Dragonite-Mega",
        megaEvolves: "Dragonite",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Dragonite, this item allows it to Mega Evolve in battle.",
    },
    "dusknoirite": {
        id: "dusknoirite",
        name: "Dusknoirite",
        megaStone: "Dusknoir-Mega",
        megaEvolves: "Dusknoir",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Dusknoir, this item allows it to Mega Evolve in battle.",
    },
    "flygonite": {
        id: "flygonite",
        name: "Flygonite",
        megaStone: "Flygon-Mega",
        megaEvolves: "Flygon",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Flygon, this item allows it to Mega Evolve in battle.",
    },
    "hydreigonite": {
        id: "hydreigonite",
        name: "Hydreigonite",
        megaStone: "Hydreigon-Mega",
        megaEvolves: "Hydreigon",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Hydreigon, this item allows it to Mega Evolve in battle.",
    },
	    "mienshaonite": {
        id: "mienshaonite",
        name: "Mienshaonite",
        megaStone: "Mienshao-Mega",
        megaEvolves: "Mienshao",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Mienshao, this item allows it to Mega Evolve in battle.",
    },
    "musharnite": {
        id: "musharnite",
        name: "Musharnite",
        megaStone: "Musharna-Mega",
        megaEvolves: "Musharna",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Musharna, this item allows it to Mega Evolve in battle.",
    },
    "zoroarkite": {
        id: "zoroarkite",
        name: "Zoroarkite",
        megaStone: "Zoroark-Mega",
        megaEvolves: "Zoroark",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Zoroark, this item allows it to Mega Evolve in battle.",
    },
    "zebstrikite": {
        id: "zebstrikite",
        name: "Zebstrikite",
        megaStone: "Zebstrika-Mega",
        megaEvolves: "Zebstrika",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Zebstrika, this item allows it to Mega Evolve in battle.",
    },
    "goodrite": {
        id: "goodrite",
        name: "Goodrite",
        megaStone: "Goodra-Mega",
        megaEvolves: "Goodra",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Goodra, this item allows it to Mega Evolve in battle.",
    },
    "talonflite": {
        id: "talonflite",
        name: "Talonflite",
        megaStone: "Talonflame-Mega",
        megaEvolves: "Talonflame",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Goodra, this item allows it to Mega Evolve in battle.",
    },
    "gogoatite": {
        id: "gogoatite",
        name: "Gogoatite",
        megaStone: "Gogoat-Mega",
        megaEvolves: "Gogoat",
        onTakeItem: function (item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If held by a Gogoat, this item allows it to Mega Evolve in battle.",
    },
    "barbaraclelite": {
        id: "barbaraclelite",
        name: "Barbaraclelite",
        megaStone: "Barbaracle-Mega",
        megaEvolves: "Barbaracle",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Barbaracle, this item allows it to Mega Evolve in battle.",
    },
    "malmeowstite": {
        id: "malmeowstite",
        name: "Malmeowstite",
        megaStone: "Meowstic-Mega",
        megaEvolves: "Meowstic",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a male Meowstic, this item allows it to Mega Evolve in battle.",
    },
    "femmeowstite": {
        id: "femmeowstite",
        name: "Femmeowstite",
        megaStone: "Meowstic-F-Mega",
        megaEvolves: "Meowstic-F",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a female Meowstic, this item allows it to Mega Evolve in battle.",
    },
    "golisopodite": {
        id: "golisopodite",
        name: "Golisopodite",
        megaStone: "Golisopod-Mega",
        megaEvolves: "Golisopod",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Golisopod, this item allows it to Mega Evolve in battle.",
    },
    "kommonite": {
        id: "kommonite",
        name: "Kommonite",
        megaStone: "Kommo-o-Mega",
        megaEvolves: "Kommo-o",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Kommo-o, this item allows it to Mega Evolve in battle.",
    },
    "shiinotite": {
        id: "shiinotite",
        name: "Shiinotite",
        megaStone: "Shiinotic-Mega",
        megaEvolves: "Shiinotic",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Shiinotic, this item allows it to Mega Evolve in battle.",
    },
    "turtonite": {
        id: "turtonite",
        name: "Turtonite",
        megaStone: "Turtonator-Mega",
        megaEvolves: "Turtonator",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Turtonator, this item allows it to Mega Evolve in battle.",
    },
    "drampite": {
        id: "drampite",
        name: "Drampite",
        megaStone: "Drampa-Mega",
        megaEvolves: "Drampa",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Drampa, this item allows it to Mega Evolve in battle.",
    },
    "corviknightite": {
        id: "corviknightite",
        name: "Corviknightite",
        megaStone: "Corviknight-Mega",
        megaEvolves: "Corviknight",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Corviknight, this item allows it to Mega Evolve in battle.",
    },
    "boltundite": {
        id: "boltundite",
        name: "Boltundite",
        megaStone: "Boltund-Mega",
        megaEvolves: "Boltund",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Boltund, this item allows it to Mega Evolve in battle.",
    },
    "falinksite": {
        id: "falinksite",
        name: "Falinksite",
        megaStone: "Falinks-Mega",
        megaEvolves: "Falinks",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Falinks, this item allows it to Mega Evolve in battle.",
    },
    "malindeedite": {
        id: "malindeedite",
        name: "Malindeedite",
        megaStone: "Indeedee-Mega",
        megaEvolves: "Indeedee",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a male Indeedee, this item allows it to Mega Evolve in battle.",
    },
    "femindeedite": {
        id: "femindeedite",
        name: "Femindeedite",
        megaStone: "Indeedee-F-Mega",
        megaEvolves: "Indeedee-F",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a female Indeedee, this item allows it to Mega Evolve in battle.",
    },
    "dragapultite": {
        id: "dragapultite",
        name: "Dragapultite",
        megaStone: "Dragapult-Mega",
        megaEvolves: "Dragapult",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Dragapult, this item allows it to Mega Evolve in battle.",
    },
    "synthinobite": {
        id: "synthinobite",
        name: "Synthinobite",
        megaStone: "Synthinobi-Mega",
        megaEvolves: "Synthinobi",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Synthinobi, this item allows it to Mega Evolve in battle.",
    },
    "chemicite": {
        id: "chemicite",
        name: "Chemicite",
        megaStone: "Chemicander-Mega",
        megaEvolves: "Chemicander",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Chemicander, this item allows it to Mega Evolve in battle.",
    },
    "primadillite": {
        id: "primadillite",
        name: "Primadillite",
        megaStone: "Primadillo-Mega",
        megaEvolves: "Primadillo",
        onTakeItem: function(item, source) {
            if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
            return true;
        },
        desc: "If holder is a Primadillo, this item allows it to Mega Evolve in battle.",
    },
}; exports.Items = Items;
