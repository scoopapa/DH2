export const Items: {[itemid: string]: ItemData} = {
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
		num: 909,
		gen: 7,
	},
	burndrive: {
		name: "Burn Drive",
		spritenum: 54,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 649) || pokemon.baseSpecies.num === 649) {
				return false;
			}
			return true;
		},
		onModifyMove(move, source) {
			if (source && source.baseSpecies.num === 649) {
				if (move.type === 'Fire') {
					move.drain = [1, 3];
				}
			}
		},
		onDrive: 'Fire',
		num: 118,
		gen: 5,
		shortDesc: "Holder is immune to hazards, except Sticky Web. Fire moves recover 1/3 of the damage dealt.",
	},
	chilldrive: {
		name: "Chill Drive",
		spritenum: 67,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 649) || pokemon.baseSpecies.num === 649) {
				return false;
			}
			return true;
		},
		/*beforeMoveCallback(target, source, move) {
			if (target && target.baseSpecies.num === 649) {
				const move = source.lastMove;
				if (move.category !== 'Status') {
					this.boost({def: 1}, target);
					target.useItem();
				}
			}
		},*/
		onDrive: 'Ice',
		num: 119,
		gen: 5,
		shortDesc: "(Bugged) Raises Defense before the opponent is attacking the holder. Single Use.",
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
		num: 919,
		gen: 7,
	},
	dousedrive: {
		name: "Douse Drive",
		spritenum: 103,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 649) || pokemon.baseSpecies.num === 649) {
				return false;
			}
			return true;
		},
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (pokemon.baseSpecies.num !== 649) return;
			if (move.category !== 'Status') {
				this.heal(pokemon.baseMaxhp / 10, pokemon);
			}
		},
		onDrive: 'Water',
		num: 116,
		gen: 5,
		shortDesc: "After an attack, holder recovers 1/10 of its maximum HP.",
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
		num: 914,
		gen: 7,
	},
	griseousorb: {
		name: "Griseous Orb",
		spritenum: 180,
		isGem: true,
		fling: {
			basePower: 60,
		},
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (source.species.id === 'giratina' && (move.type === 'Dragon' || move.type === 'Ghost') && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.species.id === 'giratinashadow' && (move.type === 'Ghost' || move.type === 'Dragon')) {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		itemUser: ["Giratina"],
		shortDesc: "If this Pokemon is Giratina, its first successful Ghost or Dragon move will have 1.5x power. Single-use.",
		num: 112,
		gen: 4,
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
		num: 917,
		gen: 7,
	},
	lightball: {
		name: "Light Ball",
		spritenum: 251,
		fling: {
			basePower: 30,
			status: 'par',
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.species.id === 'pikachu' || pokemon.species.id === 'pikachuidol') {
				return this.chainModify(2);
			}
		},
		onModifyDefPriority: 1,
		onModifyDef(spd, pokemon) {
			if (pokemon.species.id === 'pikachulibre') {
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.species.id === 'pikachu' || pokemon.species.id === 'pikachuidol' ||
				pokemon.species.id === 'pikachupartner') {
				return this.chainModify(2);
			}
		},
		onModifySpDPriority: 1,
		onModifySpD(spd, pokemon) {
			if (pokemon.species.id === 'pikachubelle' || pokemon.species.id === 'pikachulibre') {
				return this.chainModify(2);
			}
		},
		onModifySpe(spe, pokemon) {
			if (pokemon.species.id === 'pikachubelle' || pokemon.species.id === 'pikachupartner') {
				return this.chainModify(2);
			}
		},
		onTakeItem(item, pokemon, source) {
			if (source && ["pikachu", "pikachuidol", "pikachulibre", "pikachupartner", "pikachubelle"].includes(this.toID(source.baseSpecies.baseSpecies))) {
				return false;
			}
			return true;
		},
		itemUser: ["Pikachu", "Pikachu-Idol", "Pikachu-Libre", "Pikachu-Partner", "Pikachu-Belle"],
		num: 236,
		gen: 2,
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
		num: 908,
		gen: 7,
	},
	shockdrive: {
		name: "Shock Drive",
		spritenum: 442,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 649) || pokemon.baseSpecies.num === 649) {
				return false;
			}
			return true;
		},
		onModifyDamage(damage, source, target, move) {
			if (source && source.baseSpecies.num === 649) {
				if (move.category === 'Physical') {
					return this.chainModify(1.4);
				}
			}
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (source && source.baseSpecies.num === 649) {
				if (source && source !== target && move && move.category !== 'Status') {
					this.damage(source.baseMaxhp / 8, source, source, this.dex.getItem('shockdrive'));
				}
			}
		},
		onDrive: 'Electric',
		num: 117,
		gen: 5,
		shortDesc: "Holder's physical attacks do 1.4x damage, and it loses 1/8 its max HP after the attack.",
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
		num: 913,
		gen: 7,
	},
	eviolite: {
		name: "Eviolite",
		spritenum: 130,
		fling: {
			basePower: 40,
		},
		onModifyDefPriority: 2,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.nfe || pokemon.species.id === 'rotom' || pokemon.species.id === 'farfetchdgalar') {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.nfe || pokemon.species.id === 'rotom' || pokemon.species.id === 'farfetchdgalar') {
				return this.chainModify(1.5);
			}
		},
		itemUser: ["Rotom"],
		shortDesc: "If Rotom or Farfetch\u2019d-Galar, its Defense and Sp. Def are 1.5x.",
		num: 538,
		gen: 5,
	},
	leek: {
		name: "Leek",
		fling: {
			basePower: 60,
		},
		spritenum: 475,
		onModifyCritRatio(critRatio, user) {
			if (["farfetchd", "sirfetchd"].includes(this.toID(user.baseSpecies.baseSpecies))) {
				return critRatio + 2;
			}
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Grass' && user.species.id === 'farfetchd') {
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		itemUser: ["Farfetch\u2019d", "Sirfetch\u2019d"],
		shortDesc: "If Farfetch’d, its critical hit ratio is 2 and Grass move do 1.2x damage.",
		num: 259,
		gen: 8,
	},
};