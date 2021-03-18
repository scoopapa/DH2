export const Items: {[k: string]: ModdedItemData} = {
	"safetysocks": {
		id: "safetysocks",
		name: "Safety Socks",
		desc: "Holder is unaffected by Hazards.",
	},
	"reversecore": {
		id: "reversecore",
		name: "Reverse Core",
		fling: {
			basePower: 30,
		},
		onTakeItem: false,
		onModifyMovePriority: -5,
		onSourceModifyMove(move) {
			move.ignoreImmunity = true;
		},
		onStart(target) {
			this.add('-item', target, 'Reverse Core');
			this.add('-message', `${target.name} is cloaked in a mysterious power!`);
		},
		onModifyMovePriority: -5,
		onEffectiveness(typeMod, target, type, move) {
				if (move && this.dex.getImmunity(move, type) === false) return 1;
				return typeMod * -1;
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
		onDamage(damage, target, source, effect) {
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
		onAfterEachBoost(boost, target, source) {
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
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Dialga') return false;
			return true;
		},
	},
	"deepseascale": {
		inherit: true,
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Clamperl') return false;
			return true;
		},
	},
	"deepseatooth": {
		inherit: true,
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Clamperl') return false;
			return true;
		},
	},
	"griseousorb": {
		inherit: true,
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Giratina') return false;
			return true;
		},
	},
	"luckypunch": {
		inherit: true,
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Chansey') return false;
			return true;
		},
	},
	"lustrousorb": {
		inherit: true,
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Palkia') return false;
			return true;
		},
	},
	"metalpowder": {
		inherit: true,
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Ditto') return false;
			return true;
		},
	},
	"quickpowder": {
		inherit: true,
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Ditto') return false;
			return true;
		},
	},
	"stick": {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 83) || pokemon.baseSpecies.num === 83) {
				return false;
			}
			return true;
		},
	},
	"thickclub": {
		inherit: true,
		onTakeItem(item, pokemon, source) {
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
	
	ragecandybar: {
		name: "Rage Candy Bar",
		spritenum: 390,
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Darmanitan') {
				if (!pokemon.species.name.includes('Galar')) {
					if (pokemon.species.id !== 'darmanitanzen') pokemon.formeChange('Darmanitan-Zen');
				} else {
					if (pokemon.species.id !== 'darmanitangalarzen') pokemon.formeChange('Darmanitan-Galar-Zen');
				}
			}
		},
		onBasePower(basePower, user, target, move) {
			if (move && (user.species.id === 'darmanitanzen') && (move.type === 'Psychic')) {
				return this.chainModify([0x1333, 0x1000]);
			}
			if (move && (user.species.id === 'darmanitangalarzen') && (move.type === 'Fire')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Darmanitan') return false;
			return true;
		},
		itemUser: ["Darmanitan"],
		num: -1006,
		gen: 8,
		desc: "If held by Darmanitan: Zen Mode on entry, 1.2x power Psychic- or Fire-type (Unova/Galar) attacks.",
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
			for (let i in pokemon.boosts) {
				if (pokemon.boosts[i] < 0) {
					activate = true;
					pokemon.boosts[i] = -pokemon.boosts[i];
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
		onAfterDamage(damage, target, source, effect) {
			if (effect && target.useItem()) {
				this.add('-item', target, 'Mimic Orb');
				let move = this.getMove('mimic');
				if (source.moves.indexOf('mimic') >= 0){
					this.useMove('Mimic', target);
					target.moveSlots.push({
						move: move.name,
						id: move.id,
						pp: move.pp,
						maxpp: move.pp,
						target: move.target,
						disabled: false,
						used: false,
						virtual: true,
					});
				} else {
					target.moveSlots.push({
						move: move.name,
						id: move.id,
						pp: move.pp,
						maxpp: move.pp,
						target: move.target,
						disabled: false,
						used: false,
						virtual: true,
					});
					this.useMove('Mimic', target);
				}
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
		onAfterDamage(damage, target, source, effect) {
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
		onAfterDamage(damage, target, source, effect) {
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
		onModifySecondaries(secondaries) {
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
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility('gluttony'))) {
				pokemon.eatItem();
			}
		},
		onEat(source) {
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
		onModifyMove(move) {
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
		onStart(target) {
			this.add('-message', `${target.name} is being tormented!`);
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
		onStart(target) {
			this.add('-message', `${target.name} is being tormented!`);
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
		onStart(target) {
			this.add('-message', `${target.name} is being tormented!`);
		},
		onModifySpA: function(spa) {
			return this.chainModify(1.33);
		},
		desc: "Holder's Special Attack is 1.33x, but it can't use the same move twice in a row",
	},
	assaultshield: {
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
	"trickyseed": {
		id: "trickyseed",
		name: "Tricky Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate(pokemon) {
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
		name: "Stun Orb",
		fling: {
			basePower: 30,
			status: 'par',
		},
		onResidualOrder: 26,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			pokemon.trySetStatus('par', pokemon);
		},
		gen: 7,
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
		onAfterMoveSecondarySelf(pokemon, target, move) {
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
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		onModifySpe(spe) {
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
			let pikaClones = [ 'Pichu', 'Pikachu', 'Raichu', 'Plusle', 'Minun', 'Pachirisu', 'Emolga', 'Dedenne', 'Togedemaru', 'Morpeko'];
			if ( pikaClones.includes(pokemon.baseSpecies.baseSpecies)) {
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 1,
		onModifySpA: function(spa, pokemon) {
			let pikaClones = [ 'Pichu', 'Pikachu', 'Raichu', 'Plusle', 'Minun', 'Pachirisu', 'Emolga', 'Dedenne', 'Togedemaru', 'Morpeko'];
			if ( pikaClones.includes(pokemon.baseSpecies.baseSpecies)) {
				return this.chainModify(2);
			}
		},
		onTakeItem: function(item, pokemon) {
			let pikaClones = [ 'Pichu', 'Pikachu', 'Raichu', 'Plusle', 'Minun', 'Pachirisu', 'Emolga', 'Dedenne', 'Togedemaru', 'Morpeko'];
			if ( pikaClones.includes(pokemon.baseSpecies.baseSpecies)) {
				return false;
			}
			return true;
		},
		itemUser: ['Pichu', 'Pikachu', 'Raichu', 'Plusle', 'Minun', 'Pachirisu', 'Emolga', 'Dedenne', 'Togedemaru', 'Morpeko'],
		num: 236,
		gen: 2,
		desc: "If held by a Pichu, Pikachu, Raichu, Plusle, Minun, Pachirisu, Emolga, Dedenne or a Togedemaru, its Attack and Sp. Atk are doubled.",
	},
	"weatherwarriorscrystal": {
		shortDesc: "When a weather is active, increases the holder's Atk and Sp Atk stats by 1 stage each.",
		onUpdate: function(pokemon) {
			if (this.field.isWeather(['sunnyday', 'desolateland', 'hail', 'raindance', 'primordialsea', 'sandstorm', 'shadowsky', 'aircurrent']) && pokemon.useItem()) {
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
	"pikaniumz": {
		id: "pikaniumz",
		name: "Pikanium Z",
		spritenum: 649,
		onTakeItem: false,
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
		zMove: "Catastropika",
		zMoveFrom: "Volt Tackle",
		zMoveUser: ["Pikachu"],
		num: 794,
		gen: 7,
		desc: "If held by a Pikachu with Volt Tackle, it can use Catastropika. Doubles Atk and SpA as Pikachu.",
	},
	"pikashuniumz": {
		id: "pikashuniumz",
		name: "Pikashunium Z",
		spritenum: 659,
		onTakeItem: false,
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
		zMove: "10,000,000 Volt Thunderbolt",
		zMoveFrom: "Thunderbolt",
		zMoveUser: ["Pikachu-Original", "Pikachu-Hoenn", "Pikachu-Sinnoh", "Pikachu-Unova", "Pikachu-Kalos", "Pikachu-Alola", "Pikachu-Partner"],
		num: 836,
		gen: 7,
		desc: "If held by cap Pikachu with Thunderbolt, it can use 10,000,000 Volt Thunderbolt. Doubles Atk and SpA as Pikachu.",
	},
	"machobrace": {
		id: "machobrace",
		name: "Macho Brace",
		spritenum: 269,
		ignoreKlutz: true,
		fling: {
			basePower: 60,
		},
		onModifyDamage(damage, source, target, move) {
			return this.chainModify([0x14CC, 0x1000]);
		},
		onModifySpe(spe) {
			return this.chainModify(0.5);
		},
		num: 215,
		gen: 3,
		desc: "Holder's Speed is halved. Holder's attacks do 1.3x damage. The Klutz Ability does not ignore this effect.",
	},
	"sactusberry": {
		id: "sactusberry",
		name: "Sactus Berry",
		spritenum: 69,
		fling: {
			basePower: 10,
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 4 || (pokemon.hp <= pokemon.maxhp / 2 && pokemon.hasAbility('gluttony'))) {
				pokemon.eatItem();
			}
		},
		onEat(source) {
			this.useMove('Spikes', source);
		},
		desc: "When at 1/4 HP or less, consumes Berry and sets Spikes on the foe's side",
	},
    "groundiumz": {
        id: "groundiumz",
        name: "Groundium Z",
        spritenum: 639,
        onPlate: 'Ground',
        onMemory: 'Ground',
        onTakeItem: false,
        zMove: true,
        zMoveType: "Ground",
        forcedForme: ["Arceus-Ground", "Silvally-Ground"],
        num: 784,
        gen: 7,
        desc: "If holder has a Ground move, this item allows it to use a Ground Z-Move.",
    },
    "buginiumz": {
        id: "buginiumz",
        name: "Buginium Z",
        spritenum: 642,
        onPlate: 'Bug',
        onMemory: 'Bug',
        onTakeItem: false,
        zMove: true,
        zMoveType: "Bug",
        forcedForme: ["Arceus-Bug", "Silvally-Bug"],
        num: 787,
        gen: 7,
        desc: "If holder has a Bug move, this item allows it to use a Bug Z-Move.",
    },
    "darkiniumz": {
        id: "darkiniumz",
        name: "Darkinium Z",
        spritenum: 646,
        onPlate: 'Dark',
        onMemory: 'Dark',
        onTakeItem: false,
        zMove: true,
        zMoveType: "Dark",
        forcedForme: ["Arceus-Dark", "Silvally-Dark"],
        num: 791,
        gen: 7,
        desc: "If holder has a Dark move, this item allows it to use a Dark Z-Move.",
    },
    "dragoniumz": {
        id: "dragoniumz",
        name: "Dragonium Z",
        spritenum: 645,
        onPlate: 'Dragon',
        onMemory: 'Dragon',
        onTakeItem: false,
        zMove: true,
        zMoveType: "Dragon",
        forcedForme: ["Arceus-Dragon", "Silvally-Dragon"],
        num: 790,
        gen: 7,
        desc: "If holder has a Dragon move, this item allows it to use a Dragon Z-Move.",
    },
    "electriumz": {
        id: "electriumz",
        name: "Electrium Z",
        spritenum: 634,
        onPlate: 'Electric',
        onMemory: 'Electric',
        onTakeItem: false,
        zMove: true,
        zMoveType: "Electric",
        forcedForme: ["Arceus-Electric", "Silvally-Electric"],
        num: 779,
        gen: 7,
        desc: "If holder has an Electric move, this item allows it to use an Electric Z-Move.",
    },
    "fairiumz": {
        id: "fairiumz",
        name: "Fairium Z",
        spritenum: 648,
        onPlate: 'Fairy',
        onMemory: 'Fairy',
        onTakeItem: false,
        zMove: true,
        zMoveType: "Fairy",
        forcedForme: ["Arceus-Fairy", "Silvally-Fairy"],
        num: 793,
        gen: 7,
        desc: "If holder has a Fairy move, this item allows it to use a Fairy Z-Move.",
    },
    "fightiniumz": {
        id: "fightiniumz",
        name: "Fightinium Z",
        spritenum: 637,
        onPlate: 'Fighting',
        onMemory: 'Fighting',
        onTakeItem: false,
        zMove: true,
        zMoveType: "Fighting",
        forcedForme: ["Arceus-Fighting", "Silvally-Fighting"],
        num: 782,
        gen: 7,
        desc: "If holder has a Fighting move, this item allows it to use a Fighting Z-Move.",
    },
    "firiumz": {
        id: "firiumz",
        name: "Firium Z",
        spritenum: 632,
        onPlate: 'Fire',
        onMemory: 'Fire',
        onTakeItem: false,
        zMove: true,
        zMoveType: "Fire",
        forcedForme: ["Arceus-Fire", "Silvally-Fire"],
        num: 777,
        gen: 7,
        desc: "If holder has a Fire move, this item allows it to use a Fire Z-Move.",
    },
    "flyiniumz": {
        id: "flyiniumz",
        name: "Flyinium Z",
        spritenum: 640,
        onPlate: 'Flying',
        onMemory: 'Flying',
        onTakeItem: false,
        zMove: true,
        zMoveType: "Flying",
        forcedForme: ["Arceus-Flying", "Silvally-Flying"],
        num: 785,
        gen: 7,
        desc: "If holder has a Flying move, this item allows it to use a Flying Z-Move.",
    },
    "ghostiumz": {
        id: "ghostiumz",
        name: "Ghostium Z",
        spritenum: 644,
        onPlate: 'Ghost',
        onMemory: 'Ghost',
        onTakeItem: false,
        zMove: true,
        zMoveType: "Ghost",
        forcedForme: ["Arceus-Ghost", "Silvally-Ghost"],
        num: 789,
        gen: 7,
        desc: "If holder has a Ghost move, this item allows it to use a Ghost Z-Move.",
    },
    "grassiumz": {
        id: "grassiumz",
        name: "Grassium Z",
        spritenum: 635,
        onPlate: 'Grass',
        onMemory: 'Grass',
        onTakeItem: false,
        zMove: true,
        zMoveType: "Grass",
        forcedForme: ["Arceus-Grass", "Silvally-Grass"],
        num: 780,
        gen: 7,
        desc: "If holder has a Grass move, this item allows it to use a Grass Z-Move.",
    },
    "iciumz": {
        id: "iciumz",
        name: "Icium Z",
        spritenum: 636,
        onPlate: 'Ice',
        onMemory: 'Ice',
        onTakeItem: false,
        zMove: true,
        zMoveType: "Ice",
        forcedForme: ["Arceus-Ice", "Silvally-Ice"],
        num: 781,
        gen: 7,
        desc: "If holder has an Ice move, this item allows it to use an Ice Z-Move.",
    },
    "normaliumz": {
        id: "normaliumz",
        name: "Normalium Z",
        spritenum: 631,
        onPlate: 'Normal',
        onMemory: 'Normal',
        onTakeItem: false,
        zMove: true,
        zMoveType: "Normal",
        forcedForme: ["Arceus-Normal", "Silvally"],
        num: 776,
        gen: 7,
        desc: "If holder has a Normal move, this item allows it to use a Normal Z-Move.",
    },
    "poisoniumz": {
        id: "poisoniumz",
        name: "Poisonium Z",
        spritenum: 638,
        onPlate: 'Poison',
        onMemory: 'Poison',
        onTakeItem: false,
        zMove: true,
        zMoveType: "Poison",
        forcedForme: ["Arceus-Poison", "Silvally-Poison"],
        num: 783,
        gen: 7,
        desc: "If holder has a Poison move, this item allows it to use a Poison Z-Move.",
    },
    "psychiumz": {
        id: "psychiumz",
        name: "Psychium Z",
        spritenum: 641,
        onPlate: 'Psychic',
        onMemory: 'Psychic',
        onTakeItem: false,
        zMove: true,
        zMoveType: "Psychic",
        forcedForme: ["Arceus-Psychic", "Silvally-Psychic"],
        num: 786,
        gen: 7,
        desc: "If holder has a Psychic move, this item allows it to use a Psychic Z-Move.",
    },
    "rockiumz": {
        id: "rockiumz",
        name: "Rockium Z",
        spritenum: 643,
        onPlate: 'Rock',
        onMemory: 'Rock',
        onTakeItem: false,
        zMove: true,
        zMoveType: "Rock",
        forcedForme: ["Arceus-Rock", "Silvally-Rock"],
        num: 788,
        gen: 7,
        desc: "If holder has a Rock move, this item allows it to use a Rock Z-Move.",
    },
    "steeliumz": {
        id: "steeliumz",
        name: "Steelium Z",
        spritenum: 647,
        onPlate: 'Steel',
        onMemory: 'Steel',
        onTakeItem: false,
        zMove: true,
        zMoveType: "Steel",
        forcedForme: ["Arceus-Steel", "Silvally-Steel"],
        num: 792,
        gen: 7,
        desc: "If holder has a Steel move, this item allows it to use a Steel Z-Move.",
    },
    "wateriumz": {
        id: "wateriumz",
        name: "Waterium Z",
        spritenum: 633,
        onPlate: 'Water',
        onMemory: 'Water',
        onTakeItem: false,
        zMove: true,
        zMoveType: "Water",
        forcedForme: ["Arceus-Water", "Silvally-Water"],
        num: 778,
        gen: 7,
        desc: "If holder has a Water move, this item allows it to use a Water Z-Move.",
    },
};
