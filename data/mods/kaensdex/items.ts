export const Items: {[itemid: string]: ItemData} = {
magicwood: {
		name: "Magic Wood",
		spritenum: 491,
		fling: {
			basePower: 90,
		},
		onModifyDefPriority: 1,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Jaklove') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Jaklove"],
		num: 100000,
		gen: 2,
		desc: "If held by a Jaklove, its Defense is doubled."
	},
	
volcanicrock: {
		name: "Volcanic Rock",
		spritenum: 438,
		fling: {
			basePower: 30,
		},
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.category !== 'Status') {
				if (pokemon.baseSpecies.baseSpecies === 'Vulcdor') {
					this.heal(pokemon.lastDamage / 2, pokemon);
				}				
			}
		},
		onBasePowerPriority: 16,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.baseSpecies === 'Vulcdor') {
				return this.chainModify(1.2);
			}
		},
		itemUser: ["Vulcdor"],
		num: 100001,
		gen: 3,
		desc: "If held by a Vulcdor, gains 50% drain and 1.2x power."
	},

cookies: {
		name: "Cookies",
		spritenum: 242,
		fling: {
			basePower: 10,
		},
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			if (this.field.isTerrain('grassyterrain')) return;
			if (pokemon.baseSpecies.baseSpecies === 'Donter') {
				this.heal(pokemon.baseMaxhp / 8);
			}			
		},
		onTerrain(pokemon) {
			if (!this.field.isTerrain('grassyterrain')) return;
			if (pokemon.baseSpecies.baseSpecies === 'Donter') {
				this.heal(pokemon.baseMaxhp / 8);
			}		
		},
		itemUser: ["Donter"],
		num: 100002,
		gen: 2,
		desc: "If held by a Donter, is healed by 1/8 of its max HP each turn.",
	},
	
toysword: {
		name: "Toy Sword",
		spritenum: 491,
		fling: {
			basePower: 90,
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Toknight') {
				return this.chainModify(1.7);
			}
		},
		itemUser: ["Toknight"],
		num: 100003,
		gen: 2,
		desc: "If held by a Toknight, it gains 1.7x Attack.",
	},
	
catnail: {
		name: "Cat Nail",
		fling: {
			basePower: 60,
		},
		spritenum: 0,
		onModifyCritRatio(critRatio, user) {
			if (["Ghoca"].includes(this.toID(user.baseSpecies.baseSpecies))) {
				return critRatio + 2;
			}
		},
		itemUser: ["Ghoca"],
		num: 100004,
		gen: 8,
		desc: "If held by a Ghoca, its critical hit ratio is raised by 2 stages.",
	},
	
fertilizer: {
		name: "Fertilizer",
		spritenum: 0,
		fling: {
			basePower: 90,
		},
		onModifyDefPriority: 1,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Kibasol') {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 1,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Kibasol') {
				return this.chainModify(1.5);
			}
		},
		itemUser: ["Kibasol"],
		num: 100005,
		gen: 2,
		desc: "If held by a Kibasol, its gets 1.5x Def/SpD."
	},
	
abomigorite: {
		name: "Abomigorite",
		spritenum: 575,
		megaStone: "Abomigo-Mega",
		megaEvolves: "Abomigo",
		itemUser: ["Abomigo"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by an Abomigo, this item allows it to Mega Evolve in battle.",
	},
	
vizcarite: {
		name: "Vizcarite",
		spritenum: 596,
		megaStone: "Vizcachu-Mega",
		megaEvolves: "Vizcachu",
		itemUser: ["Vizcachu"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by a Vizcachu, this item allows it to Mega Evolve in battle.",
	},
	
porcusrite: {
		name: "Porcusrite",
		spritenum: 576,
		megaStone: "Porcusquill-Mega",
		megaEvolves: "Porcusquill",
		itemUser: ["Porcusquill"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by a Porcusquill, this item allows it to Mega Evolve in battle.",
	},
	
grussgurite: {
		name: "Grussgurite",
		spritenum: 608,
		megaStone: "Grussgu-Mega",
		megaEvolves: "Grussgu",
		itemUser: ["Grussgu"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by a Grussgu, this item allows it to Mega Evolve in battle.",
	},
	
crobatite: {
		name: "Crobatite",
		spritenum: 608,
		megaStone: "Crobat-Mega",
		megaEvolves: "Crobat",
		itemUser: ["Crobat"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by a Crobat, this item allows it to Mega Evolve in battle.",
	},

mightite: {
		name: "Mightite",
		spritenum: 608,
		megaStone: "Mightyena-Mega",
		megaEvolves: "Mightyena",
		itemUser: ["Mightyena"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 674,
		gen: 6,
		desc: "If held by a Mightyena, this item allows it to Mega Evolve in battle.",
	},
	
goldenbracelet: {
		name: "Golden Bracelet",
		spritenum: 698,
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Drapede') {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
		},
		onPrimal(pokemon) {
			pokemon.formeChange('Drapede-Solemne', this.effect, true);
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Drapede') return false;
			return true;
		},
		itemUser: ["Drapede"],
		num: 1103,
		gen: 8,
		desc: "If held by a Drapede, this item changes its forme to Solemne.",
	},
	
goldenpendant: {
		name: "Golden Pendant",
		spritenum: 698,
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Quetzal') {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
		},
		onPrimal(pokemon) {
			pokemon.formeChange('Quetzal-Solemne', this.effect, true);
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Quetzal') return false;
			return true;
		},
		itemUser: ["Quetzal"],
		num: 1103,
		gen: 8,
		desc: "If held by a Quetzal, this item changes its forme to Solemne.",
	},
	
goldenkey: {
		name: "Golden Key",
		spritenum: 698,
		onSwitchIn(pokemon) {
			if (pokemon.isActive && pokemon.baseSpecies.name === 'Granjaguar') {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
		},
		onPrimal(pokemon) {
			pokemon.formeChange('Granjaguar-Solemne', this.effect, true);
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Granjaguar') return false;
			return true;
		},
		itemUser: ["Granjaguar"],
		num: 1103,
		gen: 8,
		desc: "If held by a Granjaguar, this item changes its forme to Solemne.",
	},
	
	dothdiumz: {
		name: "Dothdium Z",
		spritenum: 658,
		onTakeItem: false,
		zMove: "Undying Spirit of the Brave",
		zMoveFrom: "Brave Bird",
		itemUser: ["Dothdo"],
		num: 806,
		gen: 7,
		desc: "If held by a Dothdo with Brave Bird, it can use Undying Spirit of the Brave.",
	},
	
	burstratiumz: {
		name: "Burstratium Z",
		spritenum: 658,
		onTakeItem: false,
		zMove: "Even the Sun will burn",
		zMoveFrom: "Burst Claws",
		itemUser: ["Burstrat"],
		num: 806,
		gen: 7,
		desc: "If held by a Burstrat with Burst Claws, it can use Even the Sun will burn.",
	},
	
	fasmiwoodiumz: {
		name: "Fasmiwoodium Z",
		spritenum: 658,
		onTakeItem: false,
		zMove: "A new tree of life",
		zMoveFrom: "Wood Crash",
		itemUser: ["Fasmiwood"],
		num: 806,
		gen: 7,
		desc: "If held by a Fasmiwood with Wood Crash, it can use A new tree of life.",
	},
	
	merdolphiumz: {
		name: "Merdolphium Z",
		spritenum: 658,
		onTakeItem: false,
		zMove: "The ocean does not forgive",
		zMoveFrom: "Water Pressure",
		itemUser: ["Merdolph"],
		num: 806,
		gen: 7,
		desc: "If held by a Merdolph with Water Pressure, it can use The ocean does not forgive.",
	},
}