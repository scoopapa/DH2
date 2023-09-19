export const Items: {[k: string]: ModdedItemData} = {
	absorbbulb: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] item: Absorb Bulb');
				}
				return null;
			}
		},
		onDamagingHit() {},
		boosts: {},
		shortDesc: "Raises holder's Sp. Atk by 1 stage if hit by a Water-type attack; Water Immunity.",
	},
	assaultvest: {
		inherit: true,
		onDisableMove(pokemon) {
			if (pokemon.hasAbility('ignorance')) return;
			for (const moveSlot of pokemon.moveSlots) {
				if (this.dex.moves.get(moveSlot.move).category === 'Status') {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
	},
	bigroot: {
		inherit: true,
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			const heals = ['drain', 'leechseed', 'ingrain', 'aquaring', 'curingrocks', 'strengthsap'];
			if (heals.includes(effect.id)) {
				return this.chainModify(1.5);
			}
		},
		shortDesc: "Gains 1.5x HP from draining/Aqua Ring/Ingrain/Leech Seed/Curing Rocks/Strength Sap.",
	},
	brightpowder: {
		name: "Bright Powder",
		spritenum: 51,
		fling: {
			basePower: 10,
		},
		onModifySpePriority: 5,
		onModifySpe(spe) {
			return this.modify(spe, 1.5);
		},
		onSourceModifyAccuracyPriority: 7,
		onSourceModifyAccuracy(accuracy, target, source, move) {
			if (source.hasAbility('hustle') && move.category === 'Physical') return;
			if (typeof accuracy === 'number') {
				return accuracy * 0.8;
			}
		},
		num: 213,
		gen: 2,
		shortDesc: "This Pokemon's Speed is 1.5x and accuracy of its attacks is 0.8x.",
	},
	cellbattery: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] item: Cell Battery');
				}
				return null;
			}
		},
		onDamagingHit() {},
		boosts: {},
		shortDesc: "Raises holder's Attack by 1 stage if hit by a Electric-type attack; Electric Immunity.",
	},
	luminousmoss: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({spd: 1})) {
					this.add('-immune', target, '[from] item: Luminous Moss');
				}
				return null;
			}
		},
		onDamagingHit() {},
		boosts: {},
		shortDesc: "Raises holder's Sp. Def by 1 stage if hit by a Water-type attack; Water Immunity.",
	},
	punchingglove: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				return this.chainModify([4915, 4096]);
			}
		},
		shortDesc: "Holder's punch-based attacks have 1.2x power and do not make contact.",
	},
	shellbell: {
		inherit: true,
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.totalDamage && !pokemon.forceSwitchFlag) {
				this.heal(move.totalDamage / 3, pokemon);
			}
		},
		shortDesc: "After an attack, holder gains 1/3 of the damage dealt.",
	},
	snowball: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ice') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] item: Snowball');
				}
				return null;
			}
		},
		onDamagingHit() {},
		boosts: {},
		shortDesc: "Raises holder's Attack by 1 stage if hit by a Ice-type attack; Ice Immunity.",
	},
	souldew: {
		inherit: true,
		onBasePower() {},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.num === 380 || pokemon.baseSpecies.num === 381) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 2,
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.num === 380 || pokemon.baseSpecies.num === 381) {
				return this.chainModify(1.5);
			}
		},
		shortDesc: "If held by a Latias or a Latios, its Sp. Atk and Sp. Def are 1.5x.",
		isNonstandard: null,
	},
	thickclub: {
		inherit: true,
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Cubone' || pokemon.baseSpecies.baseSpecies === 'Marowak' || pokemon.baseSpecies.baseSpecies === 'Glacone' || pokemon.baseSpecies.baseSpecies === 'Oetzowak') {
				return this.chainModify(2);
			}
		},
		shortDesc: "If held by a Cubone or its evolutions, its Attack is doubled.",
		isNonstandard: null,
	},
	utilityumbrella: {
		inherit: true,
		shortDesc: "The holder is unaffected by the effects of weather conditions.",
	},
	widelens: {
		inherit: true,
		onSourceModifyAccuracyPriority: 4,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy === 'number') {
				return accuracy * 1.1;
			}
		},
		onBasePowerPriority: 5,
		onBasePower(basePower, move, accuracy, pokemon, target) {
			if (move.accuracy !== 100) {
				return this.chainModify(1.1);
			}
		},
		shortDesc: "Accuracy is boosted by 1.1x. 95% or less accuracy have 1.1x power.",
	},
	
	//Roovnen
	cakepiece: {
		name: "Cake Piece",
		spritenum: 354,
		fling: {
			basePower: 70,
		},
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			const spe = pokemon.getStat('spe', false, true);
			const success = this.boost({spe: -1}, pokemon, pokemon, null, false, true);
			return !!(this.heal(spe / 4, pokemon, pokemon) || success);
		},
		num: 2409,
		gen: 9,
		shortDesc: "The user is healed by 1/4 of its Spe. Lowers user's Speed by 1.",
	},
	thermaljacket: {
		name: "Thermal Jacket",
		spritenum: 354,
		fling: {
			basePower: 70,
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice') {
				this.debug('Thermal Jacket weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(spa, attacker, defender, move) {
			if (move.type === 'Ice') {
				this.debug('Thermal Jacket weaken');
				return this.chainModify(0.5);
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'frz') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] item: Thermal Jacket');
			}
			return false;
		},
		onModifyDefPriority: 2,
		onModifyDef(def, pokemon) {
			if (['hail', 'snow'].includes(this.field.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		num: 2410,
		gen: 9,
		shortDesc: "Holder takes 1/2 damage from Ice moves; Cannot be frozen. Hail: 2x Def.",
	},
	solarpanel: {
		name: "Solar Panel",
		spritenum: 34,
		fling: {
			basePower: 70,
		},
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (['sunnyday', 'desolateland'].includes(this.field.effectiveWeather())) {
				this.heal(pokemon.baseMaxhp / 8);
			} else {
				this.damage(pokemon.baseMaxhp / 16);
			}
		},
		num: 2411,
		gen: 9,
		shortDesc: "Each turn, if Sunny Day is a active, restores 1/8 max HP; loses 1/16 if not.",
	},
	collectionbag: {
		name: "Collection Bag",
		spritenum: 34,
		fling: {
			basePower: 40,
		},
		onFoeTryMove(target, source, move) {
            if (['stealthrock', 'spikes', 'toxicspikes', 'stickyweb'].includes(move.id)) {
                this.attrLastMove('[still]');
				this.boost({atk: 1}, source);
                this.add('cant', target, 'item: Collection Bag', move, '[of] ' + source);
                return false;
            }
        },
		shortDesc: "The user raises its Attack when hazards are used against it.",
		num: 2412,
		gen: 9,
	},
	electriccasing: {
		name: "Electric Casing",
		spritenum: 34,
		fling: {
			basePower: 70,
		},
		onModifyDefPriority: 6,
		onModifyDef(pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				return this.chainModify(1.3);
			} else {
				return this.chainModify(0.75);
			}
		},
		onModifySpDPriority: 6,
		onModifySpD(pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				return this.chainModify(1.3);
			} else {
				return this.chainModify(0.75);
			}
		},
		num: 2413,
		gen: 9,
		shortDesc: "The holder's defenses are 1.3x under Electric Terrain; 0.75x if not.",
	},
	shadowdew: {
		name: "Shadow Dew",
		spritenum: 459,
		fling: {
			basePower: 30,
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.num === 1087) {
				return this.chainModify(1.5);
			}
		},
		onModifyDefPriority: 1,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.num === 1087) {
				return this.chainModify(1.5);
			}
		},
		itemUser: ["Latakuno"],
		shortDesc: "If held by a Latakuno, its Attack and Defense are 1.5x.",
		num: 2414,
		gen: 9,
	},
};