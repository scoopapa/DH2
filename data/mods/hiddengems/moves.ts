export const Moves: {[k: string]: ModdedMoveData} = {
	staticshield: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Protects from damaging attacks. Contact: Paralyzed.",
		name: "Static Shield",
		viable: true,
		pp: 10,
		priority: 4,
		flags: {noassist: 1, failcopycat: 1},
		stallingMove: true,
		volatileStatus: 'staticshield',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
			this.add('-anim', pokemon, "Charge", pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (this.checkMoveMakesContact(move, source, target)) {
					source.trySetStatus('par', target);
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
					source.trySetStatus('par', target);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Electric",
		zMove: {boost: {def: 1}},
		contestType: "Tough",
	},
	burnup: {
		inherit: true,
		isNonstandard: null,
	},

// to add types to mons since the old move suddenly no longer works. new ones will be added as needed
	hiddengemgrass: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Hidden Gem Grass",
		pp: 20,
		priority: 0,
		flags: {},
		onHit(target) {
			if (target.hasType('Grass')) return false;
			if (!target.addType('Grass')) return false;
			this.add('-start', target, 'typeadd', 'Grass', '[from] move: Hidden Gem Grass');
		},
		secondary: null,
		noSketch: true,
		target: "self",
		type: "Normal",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Clever",
	},
	hiddengembug: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Hidden Gem Bug",
		pp: 20,
		priority: 0,
		flags: {},
		onHit(target) {
			if (target.hasType('Bug')) return false;
			if (!target.addType('Bug')) return false;
			this.add('-start', target, 'typeadd', 'Bug', '[from] move: Hidden Gem Bug');
		},
		secondary: null,
		noSketch: true,
		target: "self",
		type: "Normal",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Clever",
	},
	hiddengemwater: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Hidden Gem Water",
		pp: 20,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Defense", target);
		},
		onHit(target) {
			if (target.hasType('Water')) return false;
			if (!target.addType('Water')) return false;
			this.add('-start', target, 'typeadd', 'Water', '[from] move: Hidden Gem Water');
		},
		secondary: null,
		noSketch: true,
		target: "self",
		type: "Normal",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Clever",
	},
	hiddengemflying: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Hidden Gem Flying",
		pp: 20,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Defense", target);
		},
		onHit(target) {
			if (target.hasType('Flying')) return false;
			if (!target.addType('Flying')) return false;
			this.add('-start', target, 'typeadd', 'Flying', '[from] move: Hidden Gem Flying');
		},
		secondary: null,
		noSketch: true,
		target: "self",
		type: "Normal",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Clever",
	},
	hiddengempoison: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Hidden Gem Poison",
		pp: 20,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Defense", target);
		},
		onHit(target) {
			if (target.hasType('Poison')) return false;
			if (!target.addType('Poison')) return false;
			this.add('-start', target, 'typeadd', 'Poison', '[from] move: Hidden Gem Poison');
		},
		secondary: null,
		noSketch: true,
		target: "self",
		type: "Normal",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Clever",
	},
	hiddengemground: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Hidden Gem Ground",
		pp: 20,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Defense", target);
		},
		onHit(target) {
			if (target.hasType('Ground')) return false;
			if (!target.addType('Ground')) return false;
			this.add('-start', target, 'typeadd', 'Ground', '[from] move: Hidden Gem Ground');
		},
		secondary: null,
		noSketch: true,
		target: "self",
		type: "Normal",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Clever",
	},
	hiddengemrock: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Hidden Gem Rock",
		pp: 20,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Defense", target);
		},
		onHit(target) {
			if (target.hasType('Rock')) return false;
			if (!target.addType('Rock')) return false;
			this.add('-start', target, 'typeadd', 'Rock', '[from] move: Hidden Gem Rock');
		},
		secondary: null,
		noSketch: true,
		target: "self",
		type: "Normal",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Clever",
	},
	hiddengemdragon: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Hidden Gem Dragon",
		pp: 20,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Defense", target);
		},
		onHit(target) {
			if (target.hasType('Dragon')) return false;
			if (!target.addType('Dragon')) return false;
			this.add('-start', target, 'typeadd', 'Dragon', '[from] move: Hidden Gem Dragon');
		},
		secondary: null,
		noSketch: true,
		target: "self",
		type: "Normal",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Clever",
	},
	hiddengemghost: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Hidden Gem Ghost",
		pp: 20,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Defense", target);
		},
		onHit(target) {
			if (target.hasType('Ghost')) return false;
			if (!target.addType('Ghost')) return false;
			this.add('-start', target, 'typeadd', 'Ghost', '[from] move: Hidden Gem Ghost');
		},
		secondary: null,
		noSketch: true,
		target: "self",
		type: "Normal",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Clever",
	},
	hiddengemdragon2: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Hidden Gem Dragon 2",
		pp: 20,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Defense", target);
		},
		onHit(target) {
			const targetType = target.types[1]
			if (target.hasType('Dragon')) return false;
			if (!target.addType('Dragon')) return false;
			target.setType(target.getTypes(true).map(type => type === targetType ? "Dragon" : type));
		},
		secondary: null,
		noSketch: true,
		target: "self",
		type: "Normal",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Clever",
	},
	hiddengemground2: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Hidden Gem Ground 2",
		pp: 20,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Defense", target);
		},
		onHit(target) {
			const targetType = target.types[1]
			if (target.hasType('Ground')) return false;
			if (!target.addType('Ground')) return false;
			target.setType(target.getTypes(true).map(type => type === targetType ? "Ground" : type));
		},
		secondary: null,
		noSketch: true,
		target: "self",
		type: "Normal",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Clever",
	},
	hiddengemdark: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Hidden Gem Dark",
		pp: 20,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Defense", target);
		},
		onHit(target) {
			if (target.hasType('Dark')) return false;
			if (!target.addType('Dark')) return false;
			this.add('-start', target, 'typeadd', 'Dark', '[from] move: Hidden Gem Dark');
		},
		secondary: null,
		noSketch: true,
		target: "self",
		type: "Normal",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Clever",
	},
	hiddengemsteel: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Hidden Gem Steel",
		pp: 20,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Defense", target);
		},
		onHit(target) {
			if (target.hasType('Steel')) return false;
			if (!target.addType('Steel')) return false;
			this.add('-start', target, 'typeadd', 'Steel', '[from] move: Hidden Gem Steel');
		},
		secondary: null,
		noSketch: true,
		target: "self",
		type: "Normal",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Clever",
	},
	hiddengemfairy: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Hidden Gem Fairy",
		pp: 20,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Defense", target);
		},
		onHit(target) {
			if (target.hasType('Fairy')) return false;
			if (!target.addType('Fairy')) return false;
			this.add('-start', target, 'typeadd', 'Fairy', '[from] move: Hidden Gem Fairy');
		},
		secondary: null,
		noSketch: true,
		target: "self",
		type: "Normal",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Clever",
	},
	hiddengemflying2: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Hidden Gem Flying 2",
		pp: 20,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Defense", target);
		},
		onHit(target) {
			const targetType = target.types[1]
			if (target.hasType('Flying')) return false;
			if (!target.addType('Flying')) return false;
			target.setType(target.getTypes(true).map(type => type === targetType ? "Flying" : type));
		},
		secondary: null,
		noSketch: true,
		target: "self",
		type: "Normal",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Clever",
	},
};
