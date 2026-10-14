export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	pyroball: {
		inherit: true,
		onEffectiveness(typeMod, target, type, source) {
			if (source.ability?.fullname !== 'chargedstriker') return;
			return typeMod + this.dex.getEffectiveness('Electric', type);
		},
	},
	explosion: {
		num: 153,
		accuracy: 100,
		basePower: 250,
		category: "Physical",
		name: "Explosion",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, noparentalbond: 1},
		// double to simulate halved defense
		onDamage(damage, target, source, effect) {
			return damage * 2;
		},
		selfdestruct: "always",
		secondary: null,
		target: "allAdjacent",
		type: "Normal",
		shortDesc: "Hits adjacent Pokemon. The user faints. Damage is doubled.",
		contestType: "Beautiful",
	},
	selfdestruct: {
		num: 120,
		accuracy: 100,
		basePower: 200,
		category: "Physical",
		name: "Self-Destruct",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, noparentalbond: 1},
		// double to simulate halved defense
		onDamage(damage, target, source, effect) {
			return damage * 2;
		},
		selfdestruct: "always",
		secondary: null,
		target: "allAdjacent",
		type: "Normal",
		shortDesc: "Hits adjacent Pokemon. The user faints. Damage is doubled.",
		contestType: "Beautiful",
	},
	gigaimpact: {
		inherit: true,
		onAfterMoveSecondary(target, source, move) {
			if (target.fainted || target.hp === 0)
				source.removeVolatile('mustrecharge');
		},
		shortDesc: "Can't move next turn if target is not KOed.",
	},
	hyperbeam: {
		inherit: true,
		onAfterMoveSecondary(target, source, move) {
			if (target.fainted || target.hp === 0)
				source.removeVolatile('mustrecharge');
		},
		shortDesc: "Can't move next turn if target is not KOed.",
	},
	hydrocannon: {
		inherit: true,
		onAfterMoveSecondary(target, source, move) {
			if (target.fainted || target.hp === 0)
				source.removeVolatile('mustrecharge');
		},
		shortDesc: "Can't move next turn if target is not KOed.",
	},
	frenzyplant: {
		inherit: true,
		onAfterMoveSecondary(target, source, move) {
			if (target.fainted || target.hp === 0)
				source.removeVolatile('mustrecharge');
		},
		shortDesc: "Can't move next turn if target is not KOed.",
	},
	blastburn: {
		inherit: true,
		onAfterMoveSecondary(target, source, move) {
			if (target.fainted || target.hp === 0)
				source.removeVolatile('mustrecharge');
		},
		shortDesc: "Can't move next turn if target is not KOed.",
	},
	roaroftime: {
		inherit: true,
		onAfterMoveSecondary(target, source, move) {
			if (target.fainted || target.hp === 0)
				source.removeVolatile('mustrecharge');
		},
		shortDesc: "Can't move next turn if target is not KOed.",
	},
	dracometeor: {
		num: 434,
		accuracy: 90,
		basePower: 140,
		category: "Special",
		name: "Draco Meteor",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		self: {
			boosts: {
				spa: -2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Beautiful",
	},
	leafstorm: {
		num: 437,
		accuracy: 90,
		basePower: 140,
		category: "Special",
		name: "Leaf Storm",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		self: {
			boosts: {
				spa: -2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Beautiful",
	},
	overheat: {
		num: 315,
		accuracy: 90,
		basePower: 140,
		category: "Special",
		name: "Overheat",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		self: {
			boosts: {
				spa: -2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	blizzard: {
		num: 59,
		accuracy: 80,
		basePower: 110,
		category: "Special",
		name: "Blizzard",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, wind: 1},
		onModifyMove(move) {
			if (this.field.isWeather(['hail', 'snow'])) move.accuracy = true;
		},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
	},
	thunder: {
		num: 87,
		accuracy: 80,
		basePower: 110,
		category: "Special",
		name: "Thunder",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon, target) {
			switch (target?.effectiveWeather()) {
			case 'raindance':
			case 'primordialsea':
				move.accuracy = true;
				break;
			case 'sunnyday':
			case 'desolateland':
				move.accuracy = 50;
				break;
			}
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	pursuit: {
		inherit: true,
		isNonstandard: null,
	},
	stealthrock: {
		inherit: true,
		sideCondition: 'stealthrock',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots')) return;
				this.damage(pokemon.maxhp * Math.trunc(pokemon.isGrounded() ? 1 : 2) / 8);
			},
		},
	},
	knockoff: {
		num: 282,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Knock Off",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onBasePower(basePower, source, target, move) {
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemState, target, target, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onAfterHit(target, source) {
			if (source.hp) {
				const item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Knock Off', '[of] ' + source);
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Clever",
	},
	thief: {
		num: 168,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Thief",
		pp: 25,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, failmefirst: 1, noassist: 1, failcopycat: 1},
		onBasePower(basePower, source, target, move) {
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemState, target, target, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onAfterHit(target, source, move) {
			if (source.item || source.volatiles['gem']) {
				return;
			}
			const yourItem = target.takeItem(source);
			if (!yourItem) {
				return;
			}
			if (!this.singleEvent('TakeItem', yourItem, target.itemState, source, target, move, yourItem) ||
				!source.setItem(yourItem)) {
				target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
				return;
			}
			this.add('-enditem', target, yourItem, '[silent]', '[from] move: Thief', '[of] ' + source);
			this.add('-item', source, yourItem, '[from] move: Thief', '[of] ' + target);
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		shortDesc: "1.5x power when taking an item",
		contestType: "Tough",
	},
	fissure: {
		num: 90,
		accuracy: 50,
		basePower: 150,
		category: "Physical",
		name: "Fissure",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Ground",
		zMove: {basePower: 180},
		maxMove: {basePower: 130},
		shortDesc: "No additional effect.",
		contestType: "Tough",
	},
	guillotine: {
		num: 12,
		accuracy: 40,
		basePower: 200,
		category: "Physical",
		name: "Guillotine",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 180},
		maxMove: {basePower: 130},
		shortDesc: "No additional effect.",
		contestType: "Cool",
	},
	sheercold: {
		num: 329,
		accuracy: 50,
		basePower: 150,
		category: "Special",
		name: "Sheer Cold",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 100,
			status: 'frz',
		},
		target: "normal",
		type: "Ice",
		zMove: {basePower: 180},
		maxMove: {basePower: 130},
		contestType: "Beautiful",
		shortDesc: "Freezes the target.",
	},
	recover: {
		num: 105,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Recover",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1, metronome: 1},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
};
