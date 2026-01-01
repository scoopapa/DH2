export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
  // I'll do Gem effects later
	lightball: {
		name: "Light Ball",
		spritenum: 251,
		fling: {
			basePower: 30,
			status: 'par',
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Emolga') {
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Emolga') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Emolga"],
		num: 236,
		gen: 2,
		shortDesc: "If held by an Emolga, its Attack and Sp. Atk are doubled.",
	},
	snowball: {
		name: "Snowball",
		spritenum: 606,
		fling: {
			basePower: 30,
  		status: 'frz',
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Ice') {
				target.useItem();
			}
		},
		boosts: {
			atk: 1,
		},
		num: 649,
		gen: 5,
    	isNonstandard: null,
	},

	// later is now
	buggem: {
		name: "Bug Gem",
		spritenum: 53,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status' || target.hasAbility('unnerve')) return;
			if (move.type === 'Bug' && source.useItem()) {
				source.addVolatile('gem');
				source.addVolatile('buggem');
			}
		},
		desc: "First Bug move: 1.3x power, user heals 1/4 of the damage dealt. Single use.",
		num: 558,
		gen: 5,
		isNonstandard: null,
	},
	darkgem: {
		name: "Dark Gem",
		spritenum: 89,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status' || target.hasAbility('unnerve')) return;
			if (move.type === 'Dark' && source.useItem()) {
				source.addVolatile('gem');
				source.addVolatile('darkgem');
			}
		},
		desc: "First Dark move: 1.3x power, removes the foe's item. Single use.",
		num: 562,
		gen: 5,
		isNonstandard: null,
	},
	dragongem: {
		name: "Dragon Gem",
		spritenum: 107,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status' || target.hasAbility('unnerve')) return;
			if (move.type === 'Dragon' && source.useItem()) {
				source.addVolatile('gem');
				source.addVolatile('dragongem');
			}
		},
		desc: "First Dragon move: 1.3x power, suppresses the foe's ability. Single use.",
		num: 561,
		gen: 5,
		isNonstandard: null,
	},
	electricgem: {
		name: "Electric Gem",
		spritenum: 120,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status' || move.flags['pledgecombo'] || target.hasAbility('unnerve')) return;
			if (move.type === 'Electric' && source.useItem()) {
				source.addVolatile('gem');
				source.addVolatile('electricgem');
			}
		},
		desc: "First Electric move: 1.3x power, lowers foe's Spe by 1. Single use.",
		num: 550,
		gen: 5,
		isNonstandard: null,
	},
	fairygem: {
		name: "Fairy Gem",
		spritenum: 611,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status' || target.hasAbility('unnerve')) return;
			if (move.type === 'Fairy' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		desc: "First Fairy move: 1.3x power. Single use.",
		num: 715,
		gen: 6,
	},
	fightinggem: {
		name: "Fighting Gem",
		spritenum: 139,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status' || target.hasAbility('unnerve')) return;
			if (move.type === 'Fighting' && source.useItem()) {
				source.addVolatile('gem');
				source.addVolatile('fightinggem');
			}
		},
		desc: "First Fighting move: 1.3x power, breaks screens and Substitute. Single use.",
		num: 553,
		gen: 5,
		isNonstandard: null,
	},
	firegem: {
		name: "Fire Gem",
		spritenum: 141,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status' || move.flags['pledgecombo'] || target.hasAbility('unnerve')) return;
			if (move.type === 'Fire' && source.useItem()) {
				source.addVolatile('gem');
				source.addVolatile('firegem');
			}
		},
		desc: "First Fire move: 1.3x power, thaws the user. Single use.",
		num: 548,
		gen: 5,
		isNonstandard: null,
	},	
	flyinggem: {
		name: "Flying Gem",
		spritenum: 149,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status' || target.hasAbility('unnerve')) return;
			if (move.type === 'Flying' && source.useItem()) {
				source.addVolatile('gem');
				source.addVolatile('flyinggem');
			}
		},
		desc: "First Flying move: 1.3x power, flings foe into the air. Single use.",
		num: 556,
		gen: 5,
		isNonstandard: null,
		rating: 3,
	},
	ghostgem: {
		name: "Ghost Gem",
		spritenum: 161,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status' || target.hasAbility('unnerve')) return;
			if (move.type === 'Ghost' && source.useItem()) {
				source.addVolatile('gem');
				source.addVolatile('ghostgem');
			}
		},
		desc: "First Ghost move: 1.3x power, disables the foe. Single use.",
		num: 560,
		gen: 5,
		isNonstandard: null,
	},
	grassgem: {
		name: "Grass Gem",
		spritenum: 172,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status' || move.flags['pledgecombo'] || target.hasAbility('unnerve')) return;
			if (move.type === 'Grass' && source.useItem()) {
				source.addVolatile('gem');
				source.addVolatile('grassgem');
			}
		},
		desc: "First Grass move: 1.3x power, cures user's poisoning. Single use.",
		num: 551,
		gen: 5,
		isNonstandard: null,
	},
	groundgem: {
		name: "Ground Gem",
		spritenum: 182,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status' || target.hasAbility('unnerve')) return;
			if (move.type === 'Ground' && source.useItem()) {
				source.addVolatile('gem');
				source.addVolatile('groundgem');
			}
		},
		desc: "First Ground move: 1.3x power, lowers foe's Atk by 1. Single use.",
		num: 555,
		gen: 5,
		isNonstandard: null,
	},
	icegem: {
		name: "Ice Gem",
		spritenum: 218,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status' || target.hasAbility('unnerve')) return;
			if (move.type === 'Ice' && source.useItem()) {
				source.addVolatile('gem');
				source.addVolatile('icegem');
			}
		},
		desc: "First Ice move: 1.3x power, clears foe's stat changes. Single use.",
		num: 552,
		gen: 5,
		isNonstandard: null,
	},
	normalgem: {
		name: "Normal Gem",
		spritenum: 307,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status' || move.flags['pledgecombo'] || target.hasAbility('unnerve')) return;
			if (move.type === 'Normal' && source.useItem()) {
				source.addVolatile('gem');
				source.addVolatile('normalgem');
			}
		},
		desc: "First Normal move: 1.3x power, gives user the Focus Energy effect. Single use.",
		num: 564,
		gen: 5,
	},
	poisongem: {
		name: "Poison Gem",
		spritenum: 344,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status' || target.hasAbility('unnerve')) return;
			if (move.type === 'Poison' && source.useItem()) {
				source.addVolatile('gem');
				source.addVolatile('poisongem');
			}
		},
		desc: "First Poison move: 1.3x power, lowers the foe's SpD by 1. Single use.",
		num: 554,
		gen: 5,
		isNonstandard: null,
	},
	psychicgem: {
		name: "Psychic Gem",
		spritenum: 369,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status' || target.hasAbility('unnerve')) return;
			if (move.type === 'Psychic' && source.useItem()) {
				source.addVolatile('gem');
				source.addVolatile('psychicgem');
			}
		},
		desc: "First Psychic move: 1.3x power, Heal Blocks the foe. Single use.",
		num: 557,
		gen: 5,
		isNonstandard: null,
	},
	rockgem: {
		name: "Rock Gem",
		spritenum: 415,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status' || target.hasAbility('unnerve')) return;
			if (move.type === 'Rock' && source.useItem()) {
				source.addVolatile('gem');
				source.addVolatile('rockgem');
			}
		},
		desc: "First Rock move: 1.3x power, lowers foe's SpA by 1. Single use.",
		num: 559,
		gen: 5,
		isNonstandard: null,
	},
	steelgem: {
		name: "Steel Gem",
		spritenum: 473,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status' || target.hasAbility('unnerve')) return;
			if (move.type === 'Steel' && source.useItem()) {
				source.addVolatile('gem');
				source.addVolatile('steelgem');
			}
		},
		desc: "First Steel move: 1.3x power, lowers foe's Def by 1. Single use.",
		num: 563,
		gen: 5,
		isNonstandard: null,
	},
	watergem: {
		name: "Water Gem",
		spritenum: 528,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status' || move.flags['pledgecombo'] || target.hasAbility('unnerve')) return;
			if (move.type === 'Water' && source.useItem()) {
				source.addVolatile('gem');
				source.addVolatile('watergem');
			}
		},
		desc: "First Water move: 1.3x power, heals burn. Single use.",
		num: 549,
		gen: 5,
		isNonstandard: null,
	},
};
