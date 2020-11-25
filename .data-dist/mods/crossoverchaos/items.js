"use strict";Object.defineProperty(exports, "__esModule", {value: true}); const Items = {
    "shulkiumz": {
        id: "shulkiumz",
        name: "Shulkium Z",
        onTakeItem: false,
        zMove: "Monado Buster",
        zMoveFrom: "Sacred Sword",
        zMoveUser: ["Shulk"],
        desc: "If held by Shulk with Sacred Sword, he can use Monado Buster.",
    },
	 "christmasspirit": { 
		  id: "christmasspirit",
		  name: "Christmas Spirit",
		  spritenum: "184",
		  megaStone: "Smolitzer-Mega",
		  megaEvolves: "Smolitzer",
		  onTakeItem(item, source) {
			  if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			  return true;
		  },
		 desc: "If held by the Smolitzer, this item allows it to Mega Evolve in battle."
	 },
    "siivagunniumz": {
        id: "siivagunniumz",
        name: "SiIvaGunniumZ",
        onTakeItem: false,
        zMove: "Stone Halation",
        zMoveFrom: "Snow Halation",
        zMoveUser: ["SiIvaGunner"],
        desc: "If held by SiIvaGunner with Snow Halation, he can use Stone Halation.",
    },
	 "chaosemeralds": { 
		  id: "chaosemeralds",
		  name: "Chaos Emeralds",
		  megaStone: "Sonic-Super",
		  megaEvolves: "Sonic",
		  onTakeItem(item, source) {
			  if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			  return true;
		  },
		 desc: "If held by Sonic, this item allows him to become Super Sonic in battle."
	 },
    "zeromiumz": {
        id: "zeromiumz",
        name: "Zeromium Z",
        onTakeItem: false,
        zMove: "Big Bang",
        zMoveFrom: "Thunder",
        zMoveUser: ["True Zeromus"],
        desc: "If held by True Zeromus with Thunder, he can use Big Bang.",
    },
    "galeemiumz": {
        id: "galeemiumz",
        name: "Galeemium Z",
        onTakeItem: false,
        zMove: "Spear of Light",
        zMoveFrom: "Angelic Flare",
        zMoveUser: ["Galeem"],
        desc: "If held by Galeem with Angelic Flare, it can use Spear of Light.",
    },
    "dharkoniumz": {
        id: "dharkoniumz",
        name: "Dharkonium Z",
        onTakeItem: false,
        zMove: "Hammer of Darkness",
        zMoveFrom: "Demonic Rend",
        zMoveUser: ["Dharkon"],
        desc: "If held by Dharkon with Demonic Rend, it can use Hammer of Darkness.",
    },
    "puyoniumz": {
        id: "puyoniumz",
        name: "Puyonium Z",
        onTakeItem: false,
        zMove: "Permutation",
        zMoveFrom: "Thunder",
        zMoveUser: ["Ringo Ando"],
        desc: "If held by Ringo Ando with Thunder, she can use Permutation.",
    },
    "makiniumz": {
        id: "makiniumz",
        name: "Makinium Z",
        onTakeItem: false,
        zMove: "Strike-9 Shot",
        zMoveFrom: "Assassinate",
        zMoveUser: ["Maki Harukawa"],
        desc: "If held by Maki Harukawa with Assassinate, she can use Strike-9 Shot.",
    },
	"falchion": {
		id: "falchion",
		name: "Falchion",
		onTakeItem(item, source) {
			return !(source.baseTemplate.baseSpecies === 'Lucina');
		},
		onSourceEffectiveness(typeMod, target, type, move) {
			if (type === 'Dragon' && move.type === 'Fighting') return 1;
		},
		desc: "If held by Lucina, her Fighting-type moves turn super effective against the Dragon type.",
	},
	"darkcrown": {
		id: "darkcrown",
		name: "Dark Crown",
		onTakeItem(item, source) {
			return !(source.baseTemplate.baseSpecies === 'King Boo');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.baseTemplate.baseSpecies !== 'King Boo') return;
			if (move.flags['light']) return this.chainModify(0.5);
		},
		desc: "If holder is King Boo, he takes halved damage from light-based moves.",
	},
    "grandoriumz": {
        id: "grandoriumz",
        name: "Grandorium Z",
        onTakeItem: false,
        zMove: "Ortygia Amore Mio",
        zMoveFrom: "Bowman of Three Stars",
        zMoveUser: ["Orion-Grand"],
        desc: "If held by Grand Archer Super Orion with Bowman of Three Stars, he can use Ortygia Amore Mio.",
    },
    "artemiumz": {
        id: "artemiumz",
        name: "Artemium Z",
        onTakeItem: false,
        zMove: "Tri-Star Amore Mio",
        zMoveFrom: "Moonblast",
        zMoveUser: ["Orion-Artemis"],
        desc: "If held by Orion & Artemis with Moonblast, they can use Tri-Star Amore Mio.",
    },
    "iskandiumz": {
        id: "iskandiumz",
        name: "Iskandium Z",
        onTakeItem: false,
        zMove: "Ionioi Hetaroi",
        zMoveFrom: "Via Expugnatio",
        zMoveUser: ["Iskandar"],
        desc: "If held by Iskandar with Via Expugnatio, he can use Ionioi Hetaroi.",
    },
	/* Gluttony is coded in the affected items, so Hunger is handled here */
	"aguavberry": {
		id: "aguavberry",
		name: "Aguav Berry",
		spritenum: 5,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Dragon",
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility('gluttony') || pokemon.hasAbility ('hunger'))) {
				pokemon.eatItem();
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon)) return false;
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp * 0.33);
			if (pokemon.getNature().minus === 'spd') {
				pokemon.addVolatile('confusion');
			}
		},
		num: 162,
		gen: 3,
		desc: "Restores 33% max HP at 1/4 max HP or less; confuses if -SpD Nature. Single use.",
	},
	"apicotberry": {
		id: "apicotberry",
		name: "Apicot Berry",
		spritenum: 10,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Ground",
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility('gluttony') || pokemon.hasAbility ('hunger'))) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.boost({spd: 1});
		},
		num: 205,
		gen: 3,
		desc: "Raises holder's Sp. Def by 1 stage when at 1/4 max HP or less. Single use.",
	},
	"custapberry": {
		id: "custapberry",
		name: "Custap Berry",
		spritenum: 86,
		isBerry: true,
		isUnreleased: true,
		naturalGift: {
			basePower: 100,
			type: "Ghost",
		},
		onFractionalPriorityPriority: -1,
		onFractionalPriority(priority, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility('gluttony') || pokemon.hasAbility ('hunger'))) {
				if (pokemon.eatItem()) {
					this.add('-activate', pokemon, 'item: Custap Berry', '[consumed]');
					return Math.round(priority) + 0.1;
				}
			}
		},
		onEat() { },
		num: 210,
		gen: 4,
		desc: "Holder moves first in its priority bracket when at 1/4 max HP or less. Single use.",
	},
	"figyberry": {
		id: "figyberry",
		name: "Figy Berry",
		spritenum: 140,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Bug",
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility('gluttony') || pokemon.hasAbility ('hunger'))) {
				pokemon.eatItem();
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon)) return false;
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp * 0.33);
			if (pokemon.getNature().minus === 'atk') {
				pokemon.addVolatile('confusion');
			}
		},
		num: 159,
		gen: 3,
		desc: "Restores 33% max HP at 1/4 max HP or less; confuses if -Atk Nature. Single use.",
	},
	"ganlonberry": {
		id: "ganlonberry",
		name: "Ganlon Berry",
		spritenum: 158,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Ice",
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility('gluttony') || pokemon.hasAbility ('hunger'))) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.boost({def: 1});
		},
		num: 202,
		gen: 3,
		desc: "Raises holder's Defense by 1 stage when at 1/4 max HP or less. Single use.",
	},
	"iapapaberry": {
		id: "iapapaberry",
		name: "Iapapa Berry",
		spritenum: 217,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Dark",
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility('gluttony') || pokemon.hasAbility ('hunger'))) {
				pokemon.eatItem();
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon)) return false;
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp * 0.33);
			if (pokemon.getNature().minus === 'def') {
				pokemon.addVolatile('confusion');
			}
		},
		num: 163,
		gen: 3,
		desc: "Restores 33% max HP at 1/4 max HP or less; confuses if -Def Nature. Single use.",
	},
	"lansatberry": {
		id: "lansatberry",
		name: "Lansat Berry",
		spritenum: 238,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Flying",
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility('gluttony') || pokemon.hasAbility ('hunger'))) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			pokemon.addVolatile('focusenergy');
		},
		num: 206,
		gen: 3,
		desc: "Holder gains the Focus Energy effect when at 1/4 max HP or less. Single use.",
	},
	"liechiberry": {
		id: "liechiberry",
		name: "Liechi Berry",
		spritenum: 248,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Grass",
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility('gluttony') || pokemon.hasAbility ('hunger'))) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.boost({atk: 1});
		},
		num: 201,
		gen: 3,
		desc: "Raises holder's Attack by 1 stage when at 1/4 max HP or less. Single use.",
	},
	"magoberry": {
		id: "magoberry",
		name: "Mago Berry",
		spritenum: 274,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Ghost",
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility('gluttony') || pokemon.hasAbility ('hunger'))) {
				pokemon.eatItem();
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon)) return false;
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp * 0.33);
			if (pokemon.getNature().minus === 'spe') {
				pokemon.addVolatile('confusion');
			}
		},
		num: 161,
		gen: 3,
		desc: "Restores 33% max HP at 1/4 max HP or less; confuses if -Spe Nature. Single use.",
	},
	"micleberry": {
		id: "micleberry",
		name: "Micle Berry",
		spritenum: 290,
		isBerry: true,
		isUnreleased: true,
		naturalGift: {
			basePower: 100,
			type: "Rock",
		},
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility('gluttony') || pokemon.hasAbility ('hunger'))) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			pokemon.addVolatile('micleberry');
		},
		effect: {
			duration: 2,
			onSourceModifyAccuracy(accuracy, target, source) {
				this.add('-enditem', source, 'Micle Berry');
				source.removeVolatile('micleberry');
				if (typeof accuracy === 'number') {
					return accuracy * 1.2;
				}
			},
		},
		num: 209,
		gen: 4,
		desc: "Holder's next move has 1.2x accuracy when at 1/4 max HP or less. Single use.",
	},
	"petayaberry": {
		id: "petayaberry",
		name: "Petaya Berry",
		spritenum: 335,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Poison",
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility('gluttony') || pokemon.hasAbility ('hunger'))) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.boost({spa: 1});
		},
		num: 204,
		gen: 3,
		desc: "Raises holder's Sp. Atk by 1 stage when at 1/4 max HP or less. Single use.",
	},
	"salacberry": {
		id: "salacberry",
		name: "Salac Berry",
		spritenum: 426,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Fighting",
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility('gluttony') || pokemon.hasAbility ('hunger'))) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			this.boost({spe: 1});
		},
		num: 203,
		gen: 3,
		desc: "Raises holder's Speed by 1 stage when at 1/4 max HP or less. Single use.",
	},
	"starfberry": {
		id: "starfberry",
		name: "Starf Berry",
		spritenum: 472,
		isBerry: true,
		naturalGift: {
			basePower: 100,
			type: "Psychic",
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility('gluttony') || pokemon.hasAbility ('hunger'))) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			let stats = [];
			for (let stat in pokemon.boosts) {
				// @ts-ignore
				if (stat !== 'accuracy' && stat !== 'evasion' && pokemon.boosts[stat] < 6) {
					stats.push(stat);
				}
			}
			if (stats.length) {
				let randomStat = this.sample(stats);
				/**@type {{[k: string]: number}} */
				let boost = {};
				boost[randomStat] = 2;
				this.boost(boost);
			}
		},
		num: 207,
		gen: 3,
		desc: "Raises a random stat by 2 when at 1/4 max HP or less (not acc/eva). Single use.",
	},
	"wikiberry": {
		id: "wikiberry",
		name: "Wiki Berry",
		spritenum: 538,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Rock",
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility('gluttony') || pokemon.hasAbility ('hunger'))) {
				pokemon.eatItem();
			}
		},
		onTryEatItem(item, pokemon) {
			if (!this.runEvent('TryHeal', pokemon)) return false;
		},
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp * 0.33);
			if (pokemon.getNature().minus === 'spa') {
				pokemon.addVolatile('confusion');
			}
		},
		num: 160,
		gen: 3,
		desc: "Restores 33% max HP at 1/4 max HP or less; confuses if -SpA Nature. Single use.",
	},
	 "maplenite": { 
		  id: "maplenite",
		  name: "Maplenite",
		  megaStone: "Maple-Mega",
		  megaEvolves: "Maple",
		  onTakeItem(item, source) {
			  if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			  return true;
		  },
		 desc: "If held by the Maple, this item allows her to Mega Evolve in battle."
	 },
	 "gokunites": { 
		  id: "gokunites",
		  name: "Gokunite S",
		  megaStone: "Goku-Super Saiyan",
		  megaEvolves: "Goku",
		  onTakeItem(item, source) {
			  if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			  return true;
		  },
		 desc: "If held by Goku, this item allows him to Mega Evolve in battle."
	 },
	 "gokuniteg": { 
		  id: "gokuniteg",
		  name: "Gokunite G",
		  megaStone: "Goku-Super Saiyan God",
		  megaEvolves: "Goku",
		  onTakeItem(item, source) {
			  if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			  return true;
		  },
		 desc: "If held by Goku, this item allows him to Mega Evolve in battle."
	 },
	 "gokuniteb": { 
		  id: "gokuniteb",
		  name: "Gokunite B",
		  megaStone: "Goku-Super Saiyan Blue",
		  megaEvolves: "Goku",
		  onTakeItem(item, source) {
			  if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			  return true;
		  },
		 desc: "If held by Goku, this item allows him to Mega Evolve in battle."
	 },
	 "gokuniteu": { 
		  id: "gokuniteu",
		  name: "Gokunite U",
		  megaStone: "Goku-Ultra Instinct",
		  megaEvolves: "Goku",
		  onTakeItem(item, source) {
			  if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			  return true;
		  },
		 desc: "If held by Goku, this item allows him to Mega Evolve in battle."
	 },
	 "gokuniteo": { 
		  id: "gokuniteo",
		  name: "Gokunite O",
		  megaStone: "Goku-Super Saiyan 4",
		  megaEvolves: "Goku",
		  onTakeItem(item, source) {
			  if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			  return true;
		  },
		 desc: "If held by Goku, this item allows him to Mega Evolve in battle."
	 },
	 "vegetanites": { 
		  id: "vegetanites",
		  name: "Vegetanite S",
		  megaStone: "Vegeta-Super Saiyan",
		  megaEvolves: "Vegeta",
		  onTakeItem(item, source) {
			  if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			  return true;
		  },
		 desc: "If held by Vegeta, this item allows him to Mega Evolve in battle."
	 },
	 "vegetaniteb": { 
		  id: "vegetaniteb",
		  name: "Vegetanite B",
		  megaStone: "Vegeta-Super Saiyan Blue",
		  megaEvolves: "Vegeta",
		  onTakeItem(item, source) {
			  if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			  return true;
		  },
		 desc: "If held by Vegeta, this item allows him to Mega Evolve in battle."
	 },
	 "vegetanitem": { 
		  id: "vegetanitem",
		  name: "Vegetanite M",
		  megaStone: "Vegeta-Majin",
		  megaEvolves: "Vegeta",
		  onTakeItem(item, source) {
			  if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			  return true;
		  },
		 desc: "If held by Vegeta, this item allows him to Mega Evolve in battle."
	 },
	 "vegetaniteo": { 
		  id: "vegetaniteo",
		  name: "Vegetanite O",
		  megaStone: "Vegeta-Super Saiyan 4",
		  megaEvolves: "Vegeta",
		  onTakeItem(item, source) {
			  if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			  return true;
		  },
		 desc: "If held by Vegeta, this item allows him to Mega Evolve in battle."
	 },
	"phantomruby": {
		id: "phantomruby",
		name: "Phantom Ruby",
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseTemplate.species === 'Heavy King') {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
		},
		onPrimal(pokemon) {
			pokemon.formeChange('Heavy King-Phantom', this.effect, true);
		},
		itemUser: ["Heavy King"],
		desc: "If held by the Heavy King, this item triggers its Primal Reversion in battle.",
	},
    "blackrockiumz": {
        id: "blackrockiumz",
        name: "Blackrockium Z",
        onTakeItem: false,
        zMove: "Rainbow Cannon",
        zMoveFrom: "Power Gem",
        zMoveUser: ["Black★Rock Shooter"],
        desc: "If held by Black★Rock Shooter with Power Gem, she can use Rainbow Cannon.",
    },
	 "overhaulite": { 
		  id: "overhaulite",
		  name: "Overhaulite",
		  megaStone: "Overhaul-Mega",
		  megaEvolves: "Overhaul",
		  onTakeItem(item, source) {
			  if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			  return true;
		  },
		 desc: "If held by Overhaul, this item allows her to Mega Evolve in battle."
	 },
}; exports.Items = Items;
