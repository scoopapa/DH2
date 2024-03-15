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
		type: "Grass",
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
		type: "Bug",
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
		type: "Water",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Clever",
	},
};
