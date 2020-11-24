export const Items: {[k: string]: ModdedItemData} = {
	"safetysocks": {
		id: "safetysocks",
		name: "Safety Socks",
		onDamage: function (damage, target, source, effect) {
			let hazards = ["stealthrock", "stickyweb"];
			if (effect.sideCondition !== 'Move') {
				return false;
			}
		},
		desc: "Holder is unaffected by Hazards.",
	},
	"scarixite": {
		id: "scarixite",
		name: "Scarixite",
		spritenum: 575,
		megaStone: "Scarix-Mega",
		megaEvolves: "Scarix",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by a Scarix, this item allows it to Mega Evolve in battle.",
	},
	"abomasitex": {
		id: "abomasitex",
		name: "Abomasite X",
		spritenum: 575,
		megaStone: "Abomasnow-Mega-X",
		megaEvolves: "Abomasnow",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by an Abomasnow, this item allows it to Mega Evolve in battle.",
	},
	"abomasitey": {
		id: "abomasitey",
		name: "Abomasite Y",
		spritenum: 575,
		megaStone: "Abomasnow-Mega-Y",
		megaEvolves: "Abomasnow",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by an Abomasnow, this item allows it to Mega Evolve in battle.",
	},
	"cameruptitex": {
		id: "cameruptitex",
		name: "Cameruptite X",
		spritenum: 575,
		megaStone: "Camerupt-Mega-X",
		megaEvolves: "Camerupt",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by a Camerupt, this item allows it to Mega Evolve in battle.",
	},
	"cameruptitey": {
		id: "cameruptitey",
		name: "Cameruptite Y",
		spritenum: 575,
		megaStone: "Camerupt-Mega-Y",
		megaEvolves: "Camerupt",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by a Camerupt, this item allows it to Mega Evolve in battle.",
	},
	"serperiorite": {
		id: "serperiorite",
		name: "Serperiorite",
		spritenum: 575,
		megaStone: "Serperior-Mega",
		megaEvolves: "Serperior",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by a Serperior, this item allows it to Mega Evolve in battle.",
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
		desc: "If holder is a Wishiwashi, it becomes School Form. It's ability becomes Intimidate. Water moves are boosted by 1.2x",
	},
	"alogengarite": {
		id: "alogengarite",
		name: "Alogengarite",
		spritenum: 575,
		megaStone: "Gengar-Alola-Mega",
		megaEvolves: "Gengar-Alola",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by a Gengar-Alola, this item allows it to Mega Evolve in battle.",
	},
	"banettitex": {
		id: "banettitex",
		name: "Banettite X",
		spritenum: 575,
		megaStone: "Banette-Mega-X",
		megaEvolves: "Banette",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by a Banette, this item allows it to Mega Evolve in battle.",
	},
	"banettitey": {
		id: "banettitey",
		name: "Banettite Y",
		spritenum: 575,
		megaStone: "Banette-Mega-Y",
		megaEvolves: "Banette",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by a Banette, this item allows it to Mega Evolve in battle.",
	},
	"deltalatiasite": {
		id: "deltalatiasite",
		name: "Delta Latiasite",
		spritenum: 575,
		megaStone: "Latias-Delta-Mega",
		megaEvolves: "Latias-Delta",
		onTakeItem: function (item, source) {
			if (item.megaEvolves === source.baseTemplate.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by a Delta Latias, this item allows it to Mega Evolve in battle.",
	},
	"oldmoss": {
		id: "oldmoss",
		name: "Old Moss",
		spritenum: 34,
		fling: {
			basePower: 30,
		},
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual: function (pokemon) {
			if (this.isTerrain('grassyterrain')) return;
			if (pokemon.hasType('Grass')) {
				this.heal(pokemon.maxhp / 16);
			} else {
				this.damage(pokemon.maxhp / 8);
			}
		},
		onTerrain: function (pokemon) {
			if (!this.isTerrain('grassyterrain')) return;
			if (pokemon.hasType('Grass')) {
				this.heal(pokemon.maxhp / 16);
			} else {
				this.damage(pokemon.maxhp / 8);
			}
		},
		num: 281,
		gen: 4,
		desc: "Each turn, if holder is a Grass type, restores 1/16 max HP; loses 1/8 if not.",
	},
	"ragecandybar": {
		id: "ragecandybar",
		name: "Rage Candy Bar",
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
	"eviolith": {
		id: "eviolith",
		name: "Eviolith",
		spritenum: 130,
		fling: {
			basePower: 40,
		},
		onModifyAtkPriority: 2,
		onModifyAtk: function(atk, pokemon) {
			if (pokemon.baseSpecies.nfe) {
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 2,
		onModifySpA: function(spa, pokemon) {
			if (pokemon.baseSpecies.nfe) {
				return this.chainModify(1.5);
			}
		},
		gen: 5,
		desc: "If holder's species can evolve, its Atk and Sp. Atk are 1.5x.",
	},
	"assaultshield": {
		name: "Assault Shield",
		fling: {
			basePower: 80,
		},
		onModifyDefPriority: 1,
		onModifyDef(def) {
			return this.chainModify(1.5);
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (this.dex.getMove(moveSlot.move).category === 'Status') {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		gen: 7,
		desc: "Holder's Def is 1.5x, but it can only select damaging moves.",
	},
	"allrounderbadge": {
		id: "allrounderbadge",
		name: "All-Rounder Badge",
		spritenum: 581,
		fling: {
			basePower: 80,
		},
		onModifyDefPriority: 1,
		onModifyDef: function (def) {
			return this.chainModify(1.05);
		},
		onModifySpAPriority: 1,
		onModifySpA: function (spa) {
			return this.chainModify(1.05);
		},
		onModifySpDPriority: 1,
		onModifySpD: function (spd) {
			return this.chainModify(1.05);
		},
		onModifyAtkPriority: 1,
		onModifyAtk: function (atk) {
			return this.chainModify(1.05);
		},
		onModifySpePriority: 1,
		onModifySpe: function (spe) {
			return this.chainModify(1.05);
		},
		num: 640,
		gen: 6,
		desc: "Multiplies the holder's Attack, Defense, Sp. Atk, Sp. Def, and Speed by 1.05x.",
	},
	"mulpberry": {
		id: "mulpberry",
		name: "Mulp Berry",
		spritenum: 69,
		fling: {
			basePower: 10,
		},
		onUpdate: function(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility('gluttony'))) {
				pokemon.eatItem();
			}
		},
		onEat: function(source) {
			this.useMove('Stealth Rock', source);
		},
		desc: "When at 1/4 HP or less, consumes Berry and sets Stealth Rock on the foe's side",
	},
	"expertbelt": {
		id: "expertbelt",
		name: "Expert Belt",
		spritenum: 132,
		fling: {
			basePower: 10,
		},
		onModifyDamage: function (damage, source, target, move) {
			if (move && move.typeMod > 0) {
				return this.chainModify(1.5);
			}
		},
		num: 268,
		gen: 4,
		desc: "Holder's attacks that are super effective against the target do 1.5x damage.",
	},
	"bigroot": {
		id: "bigroot",
		name: "Big Root",
		spritenum: 29,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.drain) {
				this.debug('Big Root boost');
				return this.chainModify(1.5);
			}
		},
		onTryHealPriority: 1,
		onTryHeal: function (damage, target, source, effect) {
			/**@type {{[k: string]: number}} */
			let heals = {drain: 1};
			if (heals[effect.id]) {
				return this.chainModify(1.25);
			}
		},
		num: 296,
		gen: 4,
		desc: "Holder gains 1.25x HP from draining/Aqua Ring/Ingrain/Leech Seed/Strength Sap.",
	},
	"militarycannons": {
		id: "militarycannons",
		name: "Military Cannons",
		spritenum: 647,
		onTakeItem: false,
		zMove: true,
		zMoveType: "Steel",
		forcedForme: "Rhyperior-Mahem",
		num: 792,
		gen: 7,
		desc: "If holder has a Steel move, this item allows it to use a Steel Z-Move.",
	},
	"imperialkatanas": {
		id: "imperialkatanas",
		name: "Imperial Katanas",
		spritenum: 647,
		onTakeItem: false,
		zMove: true,
		zMoveType: "Steel",
		forcedForme: "Vespiquen-Empress",
		num: 792,
		gen: 7,
		desc: "If holder has a Steel move, this item allows it to use a Steel Z-Move.",
	},
	"protector": {
		id: "protector",
		name: "Protector",
		spritenum: 251,
		fling: {
			basePower: 30,
		},
		onModifyDefPriority: 1,
		onModifyDef: function (atk, pokemon) {
			if (pokemon.baseTemplate.baseSpecies === 'Rhyperior') {
				return this.chainModify(2);
			} else {
				return this.chainModify(1.5);
			}
		},
		onModifySpePriority: 1,
		onModifySpe: function (spa, pokemon) {
			return this.chainModify(0.5);
		},
		num: 236,
		gen: 2,
		desc: "Holder's Defense is 1.5x, but Speed is halved. If the holder is Rhyperior, Defense is doubled instead.",
	},
	"hotchocolate": {
		id: "hotchocolate",
		name: "Hot Chocolate",
		spritenum: 34,
		fling: {
			basePower: 30,
		},
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual: function (pokemon) {
			if (this.isTerrain('grassyterrain')) return;
			if (this.isWeather('hail')) {
				this.heal(pokemon.maxhp / 8);
			}
		},
		onTerrain: function (pokemon) {
			if (!this.isTerrain('grassyterrain')) return;
			if (this.isWeather('hail')) {
				this.heal(pokemon.maxhp / 8);
			}
		},
		num: 281,
		gen: 4,
		desc: "Each turn, if the weather is Hail, restores 1/8 max HP.",
	},
	"goodraniumz": {
		id: "goodraniumz",
		name: "Goodranium Z",
		spritenum: 655,
		onTakeItem: false,
		zMove: "Slimy Swamp Sauna",
		zMoveFrom: "Dragon Pulse",
		zMoveUser: ["Goodra"],
		num: 803,
		gen: 7,
		desc: "If held by a Goodra with Dragon Pulse, it can use Slimy Swamp Sauna.",
	},
	"mentalherb": {
		id: "mentalherb",
		name: "Mental Herb",
		spritenum: 285,
		fling: {
			basePower: 10,
			effect: function (pokemon) {
				let conditions = ['attract', 'taunt', 'encore', 'torment', 'disable', 'healblock'];
				for (const firstCondition of conditions) {
					if (pokemon.volatiles[firstCondition]) {
						for (const secondCondition of conditions) {
							pokemon.removeVolatile(secondCondition);
							if (firstCondition === 'attract' && secondCondition === 'attract') {
								this.add('-end', pokemon, 'move: Attract', '[from] item: Mental Herb');
							}
						}
						return;
					}
				}
			},
		},
		onUpdate: function (pokemon) {
			let conditions = ['attract', 'taunt', 'encore', 'torment', 'disable', 'healblock'];
			for (const firstCondition of conditions) {
				if (pokemon.volatiles[firstCondition]) {
					for (const secondCondition of conditions) {
						pokemon.removeVolatile(secondCondition);
						if (firstCondition === 'attract' && secondCondition === 'attract') {
							this.add('-end', pokemon, 'move: Attract', '[from] item: Mental Herb');
						}
					}
					return;
				}
			}
		},
		num: 219,
		gen: 3,
		desc: "Cures holder of Attract, Disable, Encore, Heal Block, Taunt, Torment. Single use.",
	},
	"swapsail": {
		id: "swapsail",
		name: "Swap Sail",
		onEffectiveness: function (typeMod, pokemon) {
			if (pokemon.baseTemplate.baseSpecies === 'Aurorus') {
				return -typeMod;
			}
		},
		gen: 7,
		desc: "If this Pokémon is a Aurorus, it's Type Effectiveness Chart is reversed.",
	},
	"umbrella": {
		id: "umbrella",
		name: "Umbrella",
		onTryHit: function (target, source, move) {
			if (pokemon.baseTemplate.baseSpecies === 'Nihilego') {
				if (target !== source && move.type === 'Water') {
					this.add('-immune', target, '[from] item: Umbrella');
					return null;
				}
			}
		},
		onSourceModifyDamage: function (damage, source, target, move) {
			if (this.isWeather('raindance')) {
				return this.chainModify(0.75);
			}
		},
		gen: 7,
		desc: "If the holder is a Nihilego, it is immune to water attacks at all times and takes 0.75x damage from all attacks under rain.",
	},
	"luckypunch": {
		id: "luckypunch",
		name: "Lucky Punch",
		onBasePower: function (basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				return this.chainModify(1.4);
			}
		},
		onModifyMove: function (move) {
			if (move.flags['punch']) {
				move.ignoreDefensive = true;
				move.ignoreEvasion = true;
			}
		},
		gen: 7,
		desc: "Usable by all Pokemon. Increases the power of punching moves by 1.4x and makes them ignore opponents' stat changes.",
	},
	"heavybracelet": {
		id: "heavybracelet",
		name: "Heavy Bracelet",
		onBasePowerPriority: 8,
		onBasePower: function (basePower, pokemon) {
			let boosted = true;
			let allActives = pokemon.side.active.concat(pokemon.side.foe.active);
			for (const target of allActives) {
				if (target === pokemon) continue;
				if (this.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		gen: 7,
		desc: "If the holder moves last, its move will deal 33% more damage.",
	},
	"nugget": {
		id: "nugget",
		name: "Nugget",
		spritenum: 581,
		fling: {
			basePower: 80,
		},
		onModifySpDPriority: 1,
		onModifySpD: function (spd) {
			return this.chainModify([0x14CD, 0x1000]);
		},
		onSourceModifyDamage: function (damage, source, target, move) {
			if (move.type === 'Fire' && move.typeMod > 0 && (!target.volatiles['substitute'] || move.flags['authentic'] || (move.infiltrates && this.gen >= 6))) {
				if (target.eatItem()) {
					this.add('-enditem', target, this.effect, '[weaken]');
				}
			}
		},
		num: 640,
		gen: 6,
		desc: "Boosts a Pokemon's Special Defense by 30%. Being hit by a Fire-type attack consumes it.",
	},
	"nevermeltice": {
		id: "nevermeltice",
		name: "Never-Melt Ice",
		spritenum: 581,
		fling: {
			basePower: 80,
		},
		onSourceModifyDamage: function (damage, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				return this.chainModify(0.6);
			}
		},
		num: 640,
		gen: 6,
		desc: "The holder takes 40% less damage from Ice- and Fire-type moves.",
	},
	"deepseascale": {
		id: "deepseascale",
		name: "Deep Sea Scale",
		spritenum: 581,
		fling: {
			basePower: 80,
		},
		onStart: function (pokemon) {
			if (pokemon.eggGroups["Water 1"] && !pokemon.hasType('Water')) {
				this.add('-start', pokemon, 'typeadd', 'Water', '[from] item: Deep Sea Scale');
			}
		},
		onModifySpDPriority: 1,
		onModifySpD: function (spd, pokemon) {
			if (pokemon.eggGroups["Water 1"]) {
				return this.chainModify(1.5);
			}
		},
		num: 640,
		gen: 6,
		desc: "If the holder is Water 1 Egg Group, raises their Sp. Def by 50%. It they aren't already Water-type, makes their secondary type Water.",
	},
};
