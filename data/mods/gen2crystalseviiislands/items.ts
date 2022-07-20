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
