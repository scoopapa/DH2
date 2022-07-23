export const Items: {[itemid: string]: ItemData} = {
	powerlink: {
		name: "Power Link",
		onChargeMove(target, move) {
			if (target.species.id === 'dodrio' || target.species.id === 'doduo') {
				this.add("-activate", target, "item: Power Link");
				this.debug('power link - remove charge turn for ' + move.id);
				this.attrLastMove('[still]');
				this.addMove('-anim', target, move.name, target);
				this.damage(target.baseMaxhp / 3, target, target, 'recoil');
				return false; // skip charge turn
			}
		},
		itemUser: ["Dodrio", "Doduo"],
		num: 1001,
		gen: 2,
		shortDesc: "If held by Doduo or Dodrio, causes its 2-turn moves to be executed in one turn.",
	},
	hellfirelantern: {
		name: "Hellfire Lantern",
		onSourceTryHit(target, source, move) {
			if (move.type === 'Fire') {
				this.add('-enditem', target, 'Hellfire Lantern');
				target.trySetStatus('brn', source);
				source.useItem();
			}
		},
		itemUser: ["Houndoom", "Houndour"],
		num: 1002,
		gen: 2,
		shortDesc: "If held by Houndour or Houndoom, its first fire attack always burns the opponent. Single use.",
    },
	sandstone: {
		name: "Sandstone",
		onStart(target) {
			if (target.species.id === 'sandslash' || target.species.id === 'sandshrew') {
				this.add("-activate", target, "item: Sandstone");
				this.field.setWeather('sandstorm');
			}
		},
		itemUser: ["Sandslash", "Sandshrew"],
		num: 1003,
		gen: 2,
		shortDesc: "If held by Sandshrew and Sandslash, summon Sandstorm for 5 turns on switch-in.",
	},
	
	airfilter: {
		name: "Air Filter",
		spritenum: 662,
		onUpdate(pokemon) {
			if (pokemon.status === 'psn' || pokemon.status === 'tox') {
				this.add('-item', pokemon, 'Air Filter');
				this.add('-activate', pokemon, 'item: Air Filter');
				pokemon.cureStatus();
			}
		},
		num: 1004,
		gen: 2,
		shortDesc: "Prevents the holder from being poisoned.",
	},
	alarmclock: {
		name: "Alarm Clock",
		spritenum: 289,
		onUpdate(pokemon) {
			if (pokemon.status === 'slp') {
				this.add('-item', pokemon, 'Alarm Clock');
				this.add('-activate', pokemon, 'item: Alarm Clock');
				pokemon.cureStatus();
			}
		},
		num: 1005,
		gen: 2,
		shortDesc: "Prevents the holder from being put to sleep.",
	},
	heatpack: {
		name: "Heat Pack",
		spritenum: 145,
		onUpdate(pokemon) {
			if (pokemon.status === 'frz') {
				this.add('-item', pokemon, 'Heat Pack');
				this.add('-activate', pokemon, 'item: Heat Pack');
				pokemon.cureStatus();
			}
		},
		num: 1006,
		gen: 2,
		shortDesc: "Prevents the holder from being frozen.",
	},
	ointment: {
		name: "Ointment",
		spritenum: 713,
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-item', pokemon, 'Ointment');
				this.add('-activate', pokemon, 'item: Ointment');
				pokemon.cureStatus();
			}
		},
		num: 1007,
		gen: 2,
		shortDesc: "Prevents the holder from being burned.",
	},
	smellingsalts: {
		name: "Smelling Salts",
		spritenum: 123,
		onUpdate(pokemon) {
			if (pokemon.status === 'par') {
				this.add('-item', pokemon, 'Smelling Salts');
				this.add('-activate', pokemon, 'item: Smelling Salts');
				pokemon.cureStatus();
			}
		},
		num: 1008,
		gen: 2,
		shortDesc: "Prevents the holder from being paralyzed.",
	},
	seviisundae: {
		name: "Sevii Sundae",
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			if (pokemon.volatiles['malnourish']) {
				this.damage(pokemon.baseMaxhp / 8);
			}
			else {
				this.heal(pokemon.baseMaxhp / 8);
			}
			pokemon.setItem('seviisundae9');
			this.add('-item', pokemon, pokemon.getItem(), '[from] item: Sevii Sundae');
		},
		num: 1009,
		gen: 2,
		shortDesc: "At the end of every turn, holder restores 1/8 of its max HP. Lasts 10 turns.",
	},
	seviisundae9: {
		name: "Sevii Sundae (9)",
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			if (pokemon.volatiles['malnourish']) {
				this.damage(pokemon.baseMaxhp / 8);
			}
			else {
				this.heal(pokemon.baseMaxhp / 8);
			}
			pokemon.setItem('seviisundae8');
			this.add('-item', pokemon, pokemon.getItem(), '[from] item: Sevii Sundae');
		},
		num: 1010,
		shortDesc: "At the end of every turn, holder restores 1/8 of its max HP. Lasts 10 turns.",
	},
	seviisundae8: {
		name: "Sevii Sundae (8)",
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			if (pokemon.volatiles['malnourish']) {
				this.damage(pokemon.baseMaxhp / 8);
			}
			else {
				this.heal(pokemon.baseMaxhp / 8);
			}
			pokemon.setItem('seviisundae7');
			this.add('-item', pokemon, pokemon.getItem(), '[from] item: Sevii Sundae');
		},
		num: 1011,
		shortDesc: "At the end of every turn, holder restores 1/8 of its max HP. Lasts 10 turns.",
	},
	seviisundae7: {
		name: "Sevii Sundae (7)",
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			if (pokemon.volatiles['malnourish']) {
				this.damage(pokemon.baseMaxhp / 8);
			}
			else {
				this.heal(pokemon.baseMaxhp / 8);
			}
			pokemon.setItem('seviisundae6');
			this.add('-item', pokemon, pokemon.getItem(), '[from] item: Sevii Sundae');
		},
		num: 1012,
		shortDesc: "At the end of every turn, holder restores 1/8 of its max HP. Lasts 10 turns.",
	},
	seviisundae6: {
		name: "Sevii Sundae (6)",
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			if (pokemon.volatiles['malnourish']) {
				this.damage(pokemon.baseMaxhp / 8);
			}
			else {
				this.heal(pokemon.baseMaxhp / 8);
			}
			pokemon.setItem('seviisundae5');
			this.add('-item', pokemon, pokemon.getItem(), '[from] item: Sevii Sundae');
		},
		num: 1013,
		shortDesc: "At the end of every turn, holder restores 1/8 of its max HP. Lasts 10 turns.",
	},
	seviisundae5: {
		name: "Sevii Sundae (5)",
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			if (pokemon.volatiles['malnourish']) {
				this.damage(pokemon.baseMaxhp / 8);
			}
			else {
				this.heal(pokemon.baseMaxhp / 8);
			}
			pokemon.setItem('seviisundae4');
			this.add('-item', pokemon, pokemon.getItem(), '[from] item: Sevii Sundae');
		},
		num: 1014,
		shortDesc: "At the end of every turn, holder restores 1/8 of its max HP. Lasts 10 turns.",
	},
	seviisundae4: {
		name: "Sevii Sundae (4)",
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			if (pokemon.volatiles['malnourish']) {
				this.damage(pokemon.baseMaxhp / 8);
			}
			else {
				this.heal(pokemon.baseMaxhp / 8);
			}
			pokemon.setItem('seviisundae3');
			this.add('-item', pokemon, pokemon.getItem(), '[from] item: Sevii Sundae');
		},
		num: 1015,
		shortDesc: "At the end of every turn, holder restores 1/8 of its max HP. Lasts 10 turns.",
	},
	seviisundae3: {
		name: "Sevii Sundae (3)",
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			if (pokemon.volatiles['malnourish']) {
				this.damage(pokemon.baseMaxhp / 8);
			}
			else {
				this.heal(pokemon.baseMaxhp / 8);
			}
			pokemon.setItem('seviisundae2');
			this.add('-item', pokemon, pokemon.getItem(), '[from] item: Sevii Sundae');
		},
		num: 1016,
		shortDesc: "At the end of every turn, holder restores 1/8 of its max HP. Lasts 10 turns.",
	},
	seviisundae2: {
		name: "Sevii Sundae (2)",
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			if (pokemon.volatiles['malnourish']) {
				this.damage(pokemon.baseMaxhp / 8);
			}
			else {
				this.heal(pokemon.baseMaxhp / 8);
			}
			pokemon.setItem('seviisundae1');
			this.add('-item', pokemon, pokemon.getItem(), '[from] item: Sevii Sundae');
		},
		num: 1017,
		shortDesc: "At the end of every turn, holder restores 1/8 of its max HP. Lasts 10 turns.",
	},
	seviisundae1: {
		name: "Sevii Sundae (1)",
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(pokemon) {
			if (pokemon.volatiles['malnourish']) {
				this.damage(pokemon.baseMaxhp / 8);
			}
			else {
				this.heal(pokemon.baseMaxhp / 8);
			}
			pokemon.useItem();
		},
		num: 1018,
		shortDesc: "At the end of every turn, holder restores 1/8 of its max HP. Lasts 10 turns.",
	},
    drainingrelic: {
        name: "Draining Relic",
        spritenum: 180,
        onAfterMoveSelf(source, target, move) {
            if (target.volatiles['substitute']) return;
            if (move.totalDamage) {
                return !!(this.heal((Math.floor(move.totalDamage)) / 3), source, target);
            }
        },
        num: 1010,
        gen: 2,
        shortDesc: "Attacks drain as health 1/3 of damage dealt to the opponent.",
    
    },
	// Vanilla Edits
	
	metalpowder: {
		name: "Metal Powder",
		spritenum: 287,
		onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && target.side === this.effectData.target) {
					if ((target.side.getSideCondition('reflect') && this.getCategory(move) === 'Physical') ||
							(target.side.getSideCondition('lightscreen') && this.getCategory(move) === 'Special')) {
						return;
					}
						this.debug('Aurora Veil weaken');
						if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
						return this.chainModify(0.5);
				}
			},
		itemUser: ["Animon", "Ditto"],
		num: 257,
		gen: 2,
		shortDesc: "(Bugged) Not compatible with Animon."
	},

	// Malnourish

	leftovers: {
		inherit: true,
		onResidual(pokemon) {
			if (pokemon.volatiles['malnourish']) {
				this.damage(pokemon.baseMaxhp / 16);
			}
			else {
				this.heal(pokemon.baseMaxhp / 16);
			}
		},
	},
	berry: {
		inherit: true,
		onEat(pokemon) {
			if (pokemon.volatiles['malnourish']) {
				this.damage(10);
			}
			else {
				this.heal(30);
			}
		},
	},
	goldberry: {
		inherit: true,
		onEat(pokemon) {
			if (pokemon.volatiles['malnourish']) {
				this.damage(30);
			}
			else {
				this.heal(30);
			}
		},
	},
	berryjuice: {
		inherit: true,
		onResidual(pokemon) {
			if (pokemon.hp > pokemon.maxhp / 2) return;
			if (!(this.runEvent('TryHeal', pokemon) && pokemon.useItem())) return;
			if (pokemon.volatiles['malnourish']) {
				this.damage(20);
			}
			else {
				this.heal(20);
			}
		}
	},
	
	
	/*reflect: {
		num: 115,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Reflect",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'reflect',
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && target.side === this.effectData.target && this.getCategory(move) === 'Physical') {
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Reflect weaken');
						if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
						return this.chainModify(0.5);
					}
				}
			},
			onStart(side) {
				this.add('-sidestart', side, 'Reflect');
			},
			onResidualOrder: 21,
			onEnd(side) {
				this.add('-sideend', side, 'Reflect');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Psychic",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},*/
	/*metalpowder: {
		name: "Metal Powder",
		spritenum: 287,
		onModifyDef(def, pokemon) {
			if (pokemon.species.id === 'animon' || pokemon.species.id === 'ditto') {
				return this.chainModify(1.5);
			}	
		},
		onModifySpD(spd, pokemon) {
			if (pokemon.species.id === 'animon' || pokemon.species.id === 'ditto') {
				return this.chainModify(1.5);
			}	
		},
		itemUser: ["Animon", "Ditto"],
		num: 257,
		gen: 2,
	},*/
};
