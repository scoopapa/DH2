export const Items: {[itemid: string]: ModdedItemData} = {
// New items
	earbuds: {
		name: "Earbuds",
		spritenum: 713,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				this.debug('Earbuds boost');
				return this.chainModify([4915, 4096]);
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.flags['sound']) {
				this.add('-immune', target, '[from] item: Earbuds');
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (move.flags['sound']) {
				this.add('-immune', this.effectState.target, '[from] item: Earbuds');
			}
		},
		num: -1000,
		desc: "Holder is immune to sound moves and its own deal 1.2x damage.",
		gen: 9,
		rating: 3,
	},
	sandysupplement: {
		name: "Sandy Supplement",
		spritenum: 456,
		fling: {
			basePower: 10,
		},
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			if (pokemon.hasType('Rock')) {
				this.heal(pokemon.baseMaxhp / 16);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0 && target.hasType('Rock')) {
				this.debug('Sandy Supplement neutralize');
				return this.chainModify(0.75);
			}
		},
		num: -1001,
		gen: 9,
		desc: "Rock-types: Heal 1/16 of their max HP every turn and take 0.75x damage from super effective moves.",
		rating: 3,
	},
	collider: {
		name: "Collider",
		spritenum: 119,
		fling: {
			basePower: 80,
		},
    // implemented in abilities.ts
		num: -1002,
		gen: 9,
		rating: 3,
		desc: "Activates the abilities Plus & Minus.",
	},
	tunnelvisor: {
		name: "Tunnel Visor",
		spritenum: 539,
		fling: {
			basePower: 80,
		},
		onAnyModifyBoost(boosts, pokemon) {
			const visorHolder = this.effectState.target;
			if (visorHolder === pokemon) return;
			if (pokemon === this.activePokemon && visorHolder === this.activeTarget) {
				boosts['accuracy'] = 0;
			}
		},
		onModifyMove(move) {
			move.ignoreEvasion = true;
			move.tracksTarget = true;
		},
    num: -1003,
		gen: 9,
		rating: 3,
		desc: "Holder's moves ignore redirection, accuracy drops, and evasion boosts.",
	},
  
// Old items
	blunderpolicy: {
		name: "Blunder Policy",
		spritenum: 716,
		fling: {
			basePower: 80,
		},
		onUpdate(pokemon) {
			if (pokemon.moveThisTurnResult === false) {
				this.boost({spe: 2});
				pokemon.useItem();
			}
		},
		num: 1121,
		gen: 8,
		desc: "+2 Speed if the holder's move fails. Single use.",
		rating: 3,
	},
	ultranecroziumz: {
		name: "Ultranecrozium Z",
		spritenum: 687,
		onTakeItem: false,
		zMove: null,
		zMoveFrom: null,
		itemUser: ["Necrozma-Ultra"],
		num: 923,
		gen: 7,
		isNonstandard: null,
		desc: "Dusk Mane/Dawn Wings Necrozma: Ultra Burst only.",
	},
	berryjuice: {
		inherit: true,
		isNonstandard: null,
	},
	deepseascale: {
		name: "Deep Sea Scale",
		spritenum: 93,
		fling: {
			basePower: 30,
		},
		onModifyDefPriority: 2,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.name === 'Clamperl') {
				return this.chainModify(2);
			}
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
		isNonstandard: null,
		desc: "If held by a Clamperl, its Def & SpD are doubled.",
	},
	deepseatooth: {
		name: "Deep Sea Tooth",
		spritenum: 94,
		fling: {
			basePower: 90,
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.name === 'Clamperl') {
				return this.chainModify(2);
			}
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
		isNonstandard: null,
		desc: "If held by a Clamperl, its Atk & SpA are doubled.",
	},
	leek: {
		inherit: true,
		isNonstandard: null,
	},
	thickclub: {
		inherit: true,
		isNonstandard: null,
	},

// TMs
	tm152: {
		name: "TM152",
		fling: {
			basePower: 150,
		},
		spritenum: 721,
		num: -1004,
		gen: 9,
		desc: "Teaches certain Pokemon the move Giga Impact. One use.",
	},
	tm153: {
		name: "TM153",
		fling: {
			basePower: 150,
		},
		spritenum: 730,
		num: -1005,
		gen: 9,
		desc: "Teaches certain Pokemon the move Blast Burn. One use.",
	},
	tm154: {
		name: "TM154",
		fling: {
			basePower: 150,
		},
		spritenum: 731,
		num: -1006,
		gen: 9,
		desc: "Teaches certain Pokemon the move Hydro Cannon. One use.",
	},
	tm155: {
		name: "TM155",
		fling: {
			basePower: 150,
		},
		spritenum: 732,
		num: -1007,
		gen: 9,
		desc: "Teaches certain Pokemon the move Frenzy Plant. One use.",
	},
	tm163: {
		name: "TM163",
		fling: {
			basePower: 150,
		},
		spritenum: 721,
		num: -1008,
		gen: 9,
		desc: "Teaches certain Pokemon the move Hyper Beam. One use.",
	},
	tm192: {
		name: "TM192",
		fling: {
			basePower: 150,
		},
		spritenum: 722,
		num: -1009,
		gen: 9,
		desc: "Teaches certain Pokemon the move Focus Punch. One use.",
	},

// Memories
	bugmemory: {
		name: "Bug Memory",
		spritenum: 673,
		onMemory: 'Bug',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Bug') {
				return this.chainModify(0.75);
			}
		},
		desc: "Holder's takes 0.75x damage from Bug attacks. Multi-Attack is Bug-type.",
		isNonstandard: null,
		forcedForme: "Silvally-Bug",
		itemUser: ["Silvally-Bug"],
		num: 909,
		gen: 7,
	},
	darkmemory: {
		name: "Dark Memory",
		spritenum: 683,
		onMemory: 'Dark',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Dark') {
				return this.chainModify(0.75);
			}
		},
		desc: "Holder's takes 0.75x damage from Dark attacks. Multi-Attack is Dark-type.",
		isNonstandard: null,
		forcedForme: "Silvally-Dark",
		itemUser: ["Silvally-Dark"],
		num: 919,
		gen: 7,
	},
	dragonmemory: {
		name: "Dragon Memory",
		spritenum: 682,
		onMemory: 'Dragon',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Dragon') {
				return this.chainModify(0.75);
			}
		},
		desc: "Holder's takes 0.75x damage from Dragon attacks. Multi-Attack is Dragon-type.",
		isNonstandard: null,
		forcedForme: "Silvally-Dragon",
		itemUser: ["Silvally-Dragon"],
		num: 918,
		gen: 7,
	},
	electricmemory: {
		name: "Electric Memory",
		spritenum: 679,
		onMemory: 'Electric',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Electric') {
				return this.chainModify(0.75);
			}
		},
		desc: "Holder's takes 0.75x damage from Electric attacks. Multi-Attack is Electric-type.",
		isNonstandard: null,
		forcedForme: "Silvally-Electric",
		itemUser: ["Silvally-Electric"],
		num: 915,
		gen: 7,
	},
	fairymemory: {
		name: "Fairy Memory",
		spritenum: 684,
		onMemory: 'Fairy',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fairy') {
				return this.chainModify(0.75);
			}
		},
		desc: "Holder's takes 0.75x damage from Fairy attacks. Multi-Attack is Fairy-type.",
		isNonstandard: null,
		forcedForme: "Silvally-Fairy",
		itemUser: ["Silvally-Fairy"],
		num: 920,
		gen: 7,
	},
	fightingmemory: {
		name: "Fighting Memory",
		spritenum: 668,
		onMemory: 'Fighting',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fighting') {
				return this.chainModify(0.75);
			}
		},
		desc: "Holder's takes 0.75x damage from Fighting attacks. Multi-Attack is Fighting-type.",
		isNonstandard: null,
		forcedForme: "Silvally-Fighting",
		itemUser: ["Silvally-Fighting"],
		num: 904,
		gen: 7,
	},
	firememory: {
		name: "Fire Memory",
		spritenum: 676,
		onMemory: 'Fire',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fire') {
				return this.chainModify(0.75);
			}
		},
		desc: "Holder's takes 0.75x damage from Fire attacks. Multi-Attack is Fire-type.",
		isNonstandard: null,
		forcedForme: "Silvally-Fire",
		itemUser: ["Silvally-Fire"],
		num: 912,
		gen: 7,
	},
	flyingmemory: {
		name: "Flying Memory",
		spritenum: 669,
		onMemory: 'Flying',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Flying') {
				return this.chainModify(0.75);
			}
		},
		desc: "Holder's takes 0.75x damage from Flying attacks. Multi-Attack is Flying-type.",
		isNonstandard: null,
		forcedForme: "Silvally-Flying",
		itemUser: ["Silvally-Flying"],
		num: 905,
		gen: 7,
	},
	ghostmemory: {
		name: "Ghost Memory",
		spritenum: 674,
		onMemory: 'Ghost',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ghost') {
				return this.chainModify(0.75);
			}
		},
		desc: "Holder's takes 0.75x damage from Ghost attacks. Multi-Attack is Ghost-type.",
		isNonstandard: null,
		forcedForme: "Silvally-Ghost",
		itemUser: ["Silvally-Ghost"],
		num: 910,
		gen: 7,
	},
	grassmemory: {
		name: "Grass Memory",
		spritenum: 678,
		onMemory: 'Grass',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Grass') {
				return this.chainModify(0.75);
			}
		},
		desc: "Holder's takes 0.75x damage from Grass attacks. Multi-Attack is Grass-type.",
		isNonstandard: null,
		forcedForme: "Silvally-Grass",
		itemUser: ["Silvally-Grass"],
		num: 914,
		gen: 7,
	},
	groundmemory: {
		name: "Ground Memory",
		spritenum: 671,
		onMemory: 'Ground',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ground') {
				return this.chainModify(0.75);
			}
		},
		desc: "Holder's takes 0.75x damage from Ground attacks. Multi-Attack is Ground-type.",
		isNonstandard: null,
		forcedForme: "Silvally-Ground",
		itemUser: ["Silvally-Ground"],
		num: 907,
		gen: 7,
	},
	icememory: {
		name: "Ice Memory",
		spritenum: 681,
		onMemory: 'Ice',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ice') {
				return this.chainModify(0.75);
			}
		},
		desc: "Holder's takes 0.75x damage from Ice attacks. Multi-Attack is Ice-type.",
		isNonstandard: null,
		forcedForme: "Silvally-Ice",
		itemUser: ["Silvally-Ice"],
		num: 917,
		gen: 7,
	},
	poisonmemory: {
		name: "Poison Memory",
		spritenum: 670,
		onMemory: 'Poison',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Poison') {
				return this.chainModify(0.75);
			}
		},
		desc: "Holder's takes 0.75x damage from Poison attacks. Multi-Attack is Poison-type.",
		isNonstandard: null,
		forcedForme: "Silvally-Poison",
		itemUser: ["Silvally-Poison"],
		num: 906,
		gen: 7,
	},
	psychicmemory: {
		name: "Psychic Memory",
		spritenum: 680,
		onMemory: 'Psychic',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Psychic') {
				return this.chainModify(0.75);
			}
		},
		desc: "Holder's takes 0.75x damage from Psychic attacks. Multi-Attack is Psychic-type.",
		isNonstandard: null,
		forcedForme: "Silvally-Psychic",
		itemUser: ["Silvally-Psychic"],
		num: 916,
		gen: 7,
	},
	rockmemory: {
		name: "Rock Memory",
		spritenum: 672,
		onMemory: 'Rock',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Rock') {
				return this.chainModify(0.75);
			}
		},
		desc: "Holder's takes 0.75x damage from Rock attacks. Multi-Attack is Rock-type.",
		isNonstandard: null,
		forcedForme: "Silvally-Rock",
		itemUser: ["Silvally-Rock"],
		num: 908,
		gen: 7,
	},
	steelmemory: {
		name: "Steel Memory",
		spritenum: 675,
		onMemory: 'Steel',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Steel') {
				return this.chainModify(0.75);
			}
		},
		desc: "Holder's takes 0.75x damage from Steel attacks. Multi-Attack is Steel-type.",
		isNonstandard: null,
		forcedForme: "Silvally-Steel",
		itemUser: ["Silvally-Steel"],
		num: 911,
		gen: 7,
	},
	watermemory: {
		name: "Water Memory",
		spritenum: 677,
		onMemory: 'Water',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Water') {
				return this.chainModify(0.75);
			}
		},
		desc: "Holder's takes 0.75x damage from Water attacks. Multi-Attack is Water-type.",
		isNonstandard: null,
		forcedForme: "Silvally-Water",
		itemUser: ["Silvally-Water"],
		num: 913,
		gen: 7,
	},
};
