'use strict';
exports.BattleItems = {
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
	"reversecore": {
		id: "reversecore",
		name: "Reverse Core",
		fling: {
			basePower: 30,
		},
		onTakeItem: false,
		onStart: function (pokemon) {
			this.add('-item', pokemon, 'Reverse Core');
		},
		onEffectiveness: function(typeMod, target, type, move) {
				if (move && !this.getImmunity(move, type)) return 1;
				return -typeMod;
			},
		desc: "Holder's weaknesses and resistances (including immunities) are swapped like in an Inverse Battle.",
	},
	"roomextender": {
		id: "roomextender",
		name: "Room Extender",
		fling: {
			basePower: 60,
		},
		desc: "Extends Trick Room, Magic Room, Iverse Room and Wonder Room to 8 turns, instead of 5",
	},
	"safetysocks": {
		id: "safetysocks",
		name: "Safety Socks",
		fling: {
			basePower: 10,
		},
		onDamage: function(damage, target, source, effect) {
			if (effect.id === 'stealthrock' || effect.id === 'spikes' || effect.id === 'toxicspikes') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				return null;
			}
		},
		desc: "The holder is unaffected by entry hazards.",
	},
	"adrenalineorb": {
		id: "adrenalineorb",
		name: "Adrenaline Orb",
		spritenum: 660,
		fling: {
			basePower: 30,
		},
		onAfterEachBoost: function(boost, target, source) {
			if (!source || target.side === source.side) {
				return;
			}
			let statsLowered = false;
			for (let i in boost) {
				// @ts-ignore
				if (boost[i] < 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
				let stat = 'atk';
				let bestStat = 0;
				for (let i in target.stats) {
					if (target.stats[i] > bestStat) {
						stat = i;
						bestStat = target.stats[i];
					}
				}
				this.boost({
					[stat]: 1
				}, target);
			}
		},
		num: 846,
		gen: 7,
		desc: "If the user has any of its stats lowered, its highest stat gets raised by one stage. Item does not get consumed.",
	},
	"adamantorb": {
		inherit: true,
		onTakeItem: function(item, source) {
			if (source.baseSpecies.name === 'Dialga') return false;
			return true;
		},
	},
	"deepseascale": {
		inherit: true,
		onTakeItem: function(item, source) {
			if (source.baseSpecies.name === 'Clamperl') return false;
			return true;
		},
	},
	"deepseatooth": {
		inherit: true,
		onTakeItem: function(item, source) {
			if (source.baseSpecies.name === 'Clamperl') return false;
			return true;
		},
	},
	"griseousorb": {
		inherit: true,
		onTakeItem: function(item, source) {
			if (source.baseSpecies.name === 'Giratina') return false;
			return true;
		},
	},
	"luckypunch": {
		inherit: true,
		onTakeItem: function(item, source) {
			if (source.baseSpecies.name === 'Chansey') return false;
			return true;
		},
	},
	"lustrousorb": {
		inherit: true,
		onTakeItem: function(item, source) {
			if (source.baseSpecies.name === 'Palkia') return false;
			return true;
		},
	},
	"metalpowder": {
		inherit: true,
		onTakeItem: function(item, source) {
			if (source.baseSpecies.name === 'Ditto') return false;
			return true;
		},
	},
	"quickpowder": {
		inherit: true,
		onTakeItem: function(item, source) {
			if (source.baseSpecies.name === 'Ditto') return false;
			return true;
		},
	},
	"stick": {
		inherit: true,
		onTakeItem: function(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 83) || pokemon.baseSpecies.num === 83) {
				return false;
			}
			return true;
		},
	},
	"thickclub": {
		inherit: true,
		onTakeItem: function(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 105) || pokemon.baseSpecies.num === 105) {
				return false;
			}
			return true;
		},
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
		fling: {
			basePower: 20,
		},
		onBasePowerPriority: 6,
		onBasePower: function(basePower, user, target, move) {
			if (move && (user.baseSpecies.num === 746) && (move.type === 'Water')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem: function(item, source) {
			if (source.baseSpecies.name === 'Wishiwashi') return false;
			return true;
		},
		gen: 7,
		desc: "If holder is a Wishiwashi, it becomes School Form. It's ability becomes Intimidate. Water moves are boosted by 1.2x",
	},
	"ragecandybar": {
		id: "ragecandybar",
		name: "Rage Candy Bar",
		onStart: function(pokemon) {
			this.add('-item', pokemon, 'Rage Candy Bar');
			if (pokemon.baseSpecies.name === 'Darmanitan') {
				this.add('-formechange', pokemon, 'Darmanitan-Zen', '[msg]');
				pokemon.formeChange("Darmanitan-Zen");
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
	"reliccharm": {
		id: "reliccharm",
		name: "Relic Charm",
		onStart: function(pokemon) {
			this.add('-item', pokemon, 'Relic Charm');
			if (pokemon.baseSpecies.name === 'Meloetta') {
				this.add('-formechange', pokemon, 'Meloetta-Pirouette', '[msg]');
				pokemon.formeChange("Meloetta-Pirouette");
			}
		},
		fling: {
			basePower: 40,
		},
		onBasePowerPriority: 6,
		onBasePower: function(basePower, user, target, move) {
			if (move && (user.baseTemplate.num === 648) && (move.type === 'Fighting')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem: function(item, pokemon, source) {
			if ((source && source.baseTemplate.num === 648) || pokemon.baseTemplate.num === 648) {
				return false;
			}
			return true;
		},
		gen: 7,
		desc: "If this Pokémon is a Meloetta, it changes to Pirouette, and it's Fighting-Type moves have 1.2x more power",
	},
	"shadowrock": {
		id: "shadowrock",
		name: "Shadow Rock",
		fling: {
			basePower: 60,
		},
		gen: 7,
		desc: "Holder's use of Shadow Sky lasts 8 turns instead of 5.",
	},
	"blueherb": {
		id: "blueherb",
		name: "Blue Herb",
		fling: {
			basePower: 10,
		},
		onUpdate: function(pokemon) {
			let activate = false;
			let boosts = {};
			for (let i in pokemon.boosts) {
				if (pokemon.boosts[i] < 0) {
					activate = true;
					boosts[i] = -boosts[i];
				}
			}
			if (activate && pokemon.useItem()) {
				this.add('-invertboost', pokemon, '[from] item: Blue Herb');
			}
		},
		gen: 7,
		desc: "When held, if this Pokemon has it's stats lowered, all of it's stat changes will immediately be inverted.",
	},
	"breezerock": {
		id: "breezerock",
		name: "Breeze Rock",
		fling: {
			basePower: 60,
		},
		gen: 7,
		desc: "Holder's use of Air Current lasts 8 turns instead of 5.",
	},
	"mimicorb": {
		id: "mimicorb",
		name: "Mimic Orb",
		spritenum: 417,
		fling: {
			basePower: 30,
		},
		onAfterDamage: function(damage, target, source, effect) {
			if (effect && target.useItem()) {
				this.add('-item', target, 'Mimic Orb');
				this.useMove('Mimic', target);
			}
		},
		desc: "When held, the first move that the holder is targeted with gets added to this Pokemon's moveset until switched out. Displays the same message as Mimic does when activated.",
	},
	"voodoodoll": {
		id: "voodoodoll",
		name: "Voodoo Doll",
		spritenum: 417,
		fling: {
			basePower: 60,
		},
		onAfterDamage: function(damage, target, source, effect) {
			if (effect && effect.flags['contact'] && target.useItem()) {
				this.add('-item', target, 'Voodoo Doll');
				source.addVolatile('torment');
			}
		},
		desc: "When the opponent attacks the holder with a contact move, this item is consumed and the opponent is tormented.",
	},
	"poppy": {
		id: "poppy",
		name: "Poppy",
		spritenum: 417,
		fling: {
			basePower: 10,
		},
		onAfterDamage: function(damage, target, source, effect) {
			if (effect && effect.flags['contact'] && target.useItem()) {
				this.add('-item', target, 'Poppy');
				source.addVolatile('yawn');
			}
		},
		desc: "When the user is hit by a contact move, this item is consumed and the opponent becomes drowsy",
	},
	"serenitybrace": {
		id: "Serenity Brace",
		name: "serenitybrace",
		spritenum: 417,
		fling: {
			basePower: 50,
		},
		onModifySecondaries: function(secondaries) {
			this.debug('Shield Dust prevent secondary');
			return secondaries.filter(effect => !!(effect.self || effect.dustproof));
		},
		desc: "Protects the holder from the secondary effects of opponent's moves.",
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
	"ringtarget": {
		id: "ringtarget",
		name: "Ring Target",
		spritenum: 69,
		fling: {
			basePower: 10,
		},
		onModifyMovePriority: -5,
		onModifyMove: function(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity = true;
			}
		},
		desc: "If a Pokémon holds this item, it will ignore any type-based immunity when attacking.",
	},
	"agonyboots": {
		id: "agonyboots",
		name: "Agony Boots",
		spritenum: 69,
		fling: {
			basePower: 10,
		},
		onDisableMove: function(pokemon) {
			if (pokemon.lastMove && pokemon.lastMove.id !== 'struggle') pokemon.disableMove(pokemon.lastMove.id);
		},
		onModifySpe: function(spe) {
			return this.chainModify(1.33);
		},
		desc: "Holder's Speed is 1.33x, but it can't use the same move twice in a row",
	},
	"anguishbandanna": {
		id: "anguishbandanna",
		name: "Anguish Bandanna",
		spritenum: 69,
		fling: {
			basePower: 10,
		},
		onDisableMove: function(pokemon) {
			if (pokemon.lastMove && pokemon.lastMove.id !== 'struggle') pokemon.disableMove(pokemon.lastMove.id);
		},
		onModifyAtk: function(atk) {
			return this.chainModify(1.33);
		},
		desc: "Holder's Attack is 1.33x, but it can't use the same move twice in a row",
	},
	"distressglass": {
		id: "distressglass",
		name: "Distress Glass",
		spritenum: 69,
		fling: {
			basePower: 10,
		},
		onDisableMove: function(pokemon) {
			if (pokemon.lastMove && pokemon.lastMove.id !== 'struggle') pokemon.disableMove(pokemon.lastMove.id);
		},
		onModifySpA: function(spa) {
			return this.chainModify(1.33);
		},
		desc: "Holder's Attack is 1.33x, but it can't use the same move twice in a row",
	},
	"assaultshield": {
		id: "assaultshield",
		name: "Assault Shield",
		spritenum: 581,
		fling: {
			basePower: 80,
		},
		onModifyDefPriority: 1,
		onModifyDef: function(def) {
			return this.chainModify(1.5);
		},
		onDisableMove: function(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (this.getMove(moveSlot.move).category === 'Status') {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		gen: 7,
		desc: "Holder's Def is 1.5x, but it can only select damaging moves.",
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
			if (pokemon.baseTemplate.nfe) {
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 2,
		onModifySpA: function(spa, pokemon) {
			if (pokemon.baseTemplate.nfe) {
				return this.chainModify(1.5);
			}
		},
		gen: 5,
		desc: "If holder's species can evolve, its Atk and Sp. Atk are 1.5x.",
	},
	"trickyseed": {
		id: "trickyseed",
		name: "Tricky Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function(pokemon) {
			if (this.field.pseudoWeather.trickroom && pokemon.useItem()) {
				this.boost({
					spe: -1
				});
			}
		},
		gen: 7,
		desc: "If the terrain is Trick Room, lowers holder's Speed by 1 stage. Single use.",
	},
	"stunorb": {
		id: "stunorb",
		name: "Stun Orb",
		spritenum: 515,
		fling: {
			basePower: 30,
			status: 'par',
		},
		onResidualOrder: 26,
		onResidualSubOrder: 2,
		onResidual: function(pokemon) {
			pokemon.trySetStatus('par', pokemon);
		},
		gen: 4,
		desc: "At the end of every turn, this item attempts to paralyze the holder.",
	},
	"shellbell": {
		id: "shellbell",
		name: "Shell Bell",
		spritenum: 438,
		fling: {
			basePower: 30,
		},
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf: function(pokemon, target, move) {
			if (move.category !== 'Status') {
				this.heal(pokemon.lastDamage / 4, pokemon);
			}
		},
		num: 253,
		gen: 3,
		desc: "After an attack, holder gains 1/4 of the damage in HP dealt to other Pokemon.",
	},
	"iceskates": {
		id: "iceskates",
		name: "Ice Skates",
		spritenum: 664,
		onImmunity: function(type, pokemon) {
			if (type === 'hail') return false;
		},
		onModifySpe: function(spe) {
			if (this.field.isWeather('hail')) {
				return this.chainModify(2);
			}
		},
		fling: {
			basePower: 80,
		},
		gen: 7,
		desc: "If Hail is active, holder's Speed is doubled. Immune to hail damage.",
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
		onModifyAtk: function(atk, pokemon) { // Pichu, Pikachu, Raichu, Plusle, Minun, Pachirisu, Emolga, Dedenne or a Togedemaru
			let pikaClones = { 'Pichu', 'Pikachu', 'Raichu', 'Plusle', 'Minun', 'Pachirisu', 'Emolga', 'Dedenne', 'Togedemaru' }
			if ( pikaClones.includes(pokemon.baseSpecies.baseSpecies) {
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 1,
		onModifySpA: function(spa, pokemon) {
			let pikaClones = { 'Pichu', 'Pikachu', 'Raichu', 'Plusle', 'Minun', 'Pachirisu', 'Emolga', 'Dedenne', 'Togedemaru' }
			if ( pikaClones.includes(pokemon.baseSpecies.baseSpecies) {
				return this.chainModify(2);
			}
		},
		onTakeItem: function(item, source) {
			let pikaClones = { 'Pichu', 'Pikachu', 'Raichu', 'Plusle', 'Minun', 'Pachirisu', 'Emolga', 'Dedenne', 'Togedemaru' }
			if ( pikaClones.includes(pokemon.baseSpecies.baseSpecies) {
				return false;
			}
			return true;
		},
		itemUser: ['Pichu', 'Pikachu', 'Raichu', 'Plusle', 'Minun', 'Pachirisu', 'Emolga', 'Dedenne', 'Togedemaru'],
		num: 236,
		gen: 2,
		desc: "If held by a Pichu, Pikachu, Raichu, Plusle, Minun, Pachirisu, Emolga, Dedenne or a Togedemaru, its Attack and Sp. Atk are doubled.",
	},
	"weatherwarriorscrystal": {
		shortDesc: "When a weather is active, increases the holder's Atk and Sp Atk stats by 1 stage each.",
		onUpdate: function(pokemon) {
			if (this.field.isWeather(['sunnyday', 'desolateland', 'hail', 'rainyday', 'primordialsea', 'sandstream', 'shadowsky', 'aircurrent']) && pokemon.useItem()) {
				this.boost({
					atk: 1,
					spa: 1
				});
			}
		},
		fling: {
			basePower: 60,
		},
		gen: 7,
		id: "weatherwarriorscrystal",
		name: "Weather Warriors Crystal",
	},
};
