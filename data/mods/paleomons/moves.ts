export const Moves: {[moveid: string]: MoveData} = {
	bloodstream: {
		num: 202,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		name: "Blood Stream",
		shortDesc: "User recovers 50% of the damage dealt.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		onPrepareHit(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Sludge Bomb", target);
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	stormsurge: {
		num: 874,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Storm Surge",
		shortDesc: "Lowers the user's SpA by 1.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Surf", target);
		},
		self: {
			boosts: {
				spa: -1,
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Water",
		contestType: "Beautiful",
	},
	decibloom: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Decibloom",
		shortDesc: "30% chance to raise the user's Special Attack by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1},
		onPrepareHit(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Hyper Voice", target);
		},
		secondary: {
			chance: 30,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Grass",
	},
	draconicrend: {
		accuracy: 100,
		basePower: 75,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched) {
				this.debug('Draconic Rend damage boost');
				return move.basePower * 1.5;
			}
			this.debug('Draconic Rend NOT boosted');
			return move.basePower;
		},
		category: "Physical",
		shortDesc: "If a foe is switching in, hits it at 1.5x power.",
		name: "Draconic Rend",
		pp: 15,
		priority: 0,
		flags: {contact: 1, bite: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Fishious Rend", target);
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
	},
	trashcompactor: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Trash Compactor",
		shortDesc: "Restores 25% HP; 50% if hazards are on your side.",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onPrepareHit(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Recover", target);
		},
		onHit(pokemon) {
			let factor = 0.25;
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for(const condition of sideConditions) {
				if (pokemon.side.sideConditions[condition]) factor = 0.5;
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
		secondary: null,
		target: "self",
		type: "Poison",
	},
	tailsear: {
		accuracy: 100,
		basePower: 85,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) return move.basePower;
			this.debug('Tail Sear damage boost');
			return move.basePower * 1.5;
		},
		category: "Physical",
		name: "Tail Sear",
		shortDesc: "Power is 1.5x if user moves after the target.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	frigidfin: {
		accuracy: 100,
		basePower: 85,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) return move.basePower;
			this.debug('Tail Sear damage boost');
			return move.basePower * 1.5;
		},
		category: "Special",
		name: "Frigid Fin",
		shortDesc: "Power is 1.5x if user moves after the target.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Ice",
	},
	petroglyph: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Petroglyph",
		shortDesc: "100% chance to raise the user's SpA by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Paleo Wave", target);
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Rock",
	},
	ivoryslash: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Ivory Slash",
		shortDesc: "Raises the user's crit rate by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, slicing: 1},
		onPrepareHit(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Psycho Cut", target);
		},
		secondary: null,
		self: {
			volatileStatus: 'ivoryslash',
		},
		condition: {
			onStart(pokemon, source, effect) {
				this.effectState.counter = 1;
				this.add('-start', pokemon, `Crit Rate: ${this.effectState.counter}`, '[silent]');
				this.add('-message', `${pokemon.name} became more likely to land critical hits!`);
			},
			onRestart(pokemon, source, effect) {
				if(this.effectState.counter < 3) {
					this.add('-end', pokemon, `Crit Rate: ${this.effectState.counter}`, '[silent]');
					this.effectState.counter ++;
					this.add('-start', pokemon, `Crit Rate: ${this.effectState.counter}`, '[silent]');
					this.add('-message', `${pokemon.name} became more likely to land critical hits!`);
				}
			},
			onModifyCritRatio(critRatio) {
				return critRatio + this.effectState.counter;
			},
		},
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	soulwind: {
		accuracy: 100,
		basePower: 90,
		basePowerCallback(pokemon, target, move) {
			if(target.hasType('Ghost')) {
				this.debug("BP doubled against Ghost");
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Special",
		name: "Soul Wind",
		shortDesc: "Deals double damage to Ghost-types.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		onPrepareHit(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Silver Wind", target);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
	hemlockhit: {
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Hemlock Hit",
		shortDesc: "30% chance to poison the target.",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		onPrepareHit(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Poison Jab", target);
		},
		secondary: {
			chance: 30,
			status: 'psn',
		},
		target: "normal",
		type: "Grass",
	},
	ferrousforce: {
		accuracy: 80,
		basePower: 110,
		category: "Special",
		name: "Ferrous Force",
		shortDesc: "If the target is Steel-type, lowers its Sp. Def by 1.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		onPrepareHit(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Steel Beam", target);
		},
		onAfterHit(target, source, move) {
			if (target.hasType('Steel')) this.boost({spd: -1});
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Cool",
	},
	
	//edited vanilla moves
	fishiousrend: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "Power is 1.5x if user moves before the target.",
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Bolt Beak damage boost');
				return move.basePower * 1.5;
			}
			this.debug('Bolt Beak NOT boosted');
			return move.basePower;
		},
	},
	boltbeak: {
		inherit: true,
		isNonstandard: null,
		shortDesc: "Power is 1.5x if user moves before the target.",
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Bolt Beak damage boost');
				return move.basePower * 1.5;
			}
			this.debug('Bolt Beak NOT boosted');
			return move.basePower;
		},
	},
	shadowbone: {
		inherit: true,
		isNonstandard: null,
	},
	
	//vanilla moves affected by other customs
	toxicspikes: {
		inherit: true,
		sideCondition: 'toxicspikes',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectState.layers++;
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Poison')) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (pokemon.hasType('Steel') || pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('firstflight')) {
					return;
				} else if (this.effectState.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
	},
	spikes: {
		inherit: true,
		sideCondition: 'spikes',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 3) return false;
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers++;
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('firstflight')) return;
				const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
				this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / 24);
			},
		},
	},
	stickyweb: {
		inherit: true,
		sideCondition: 'stickyweb',
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Sticky Web');
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('firstflight')) return;
				this.add('-activate', pokemon, 'move: Sticky Web');
				this.boost({spe: -1}, pokemon, this.effectState.source, this.dex.getActiveMove('stickyweb'));
			},
		},
	},
	ragingbull: {
		inherit: true,
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Tauros-Paldea-Combat':
				move.type = 'Fighting';
				break;
			case 'Tauros-Paldea-Blaze':
				move.type = 'Fire';
				break;
			case 'Tauros-Paldea-Aqua':
				move.type = 'Water';
				break;
			case 'Tauros-Ancestor':
				move.type = 'Ghost';
				break;
			}
		},
	},

	obstruct: {
		inherit: true,
		isNonstandard: null,
	},
	multiattack: {
		inherit: true,
		isNonstandard: null,
	},
	mountaingale: {
		inherit: true,
		accuracy: 100,
	},
};
