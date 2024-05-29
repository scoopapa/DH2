export const Moves: { [moveid: string]: ModdedMoveData } = {
	burnup: {
		inherit: true,
		category: "Physical",
	},
	waterpulse: {
		inherit: true,
		basePower: 75,
	},
	lightningswing: {
		num: 1005,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		shortDesc: "User recovers 50% of the damage dealt.",
		name: "Lightning Swing",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1, metronome: 1},
		drain: [1, 2],
		secondary: null,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Plasma Fists', target);
		},
		target: "allAdjacent",
		type: "Electric",
		contestType: "Clever",
	},
	syrupbomb: {
		inherit: true,
		accuracy: 100,
		shortDesc: "Lowers Speed by 2 stages for 3 turns.",
		condition: {
			noCopy: true,
			duration: 4,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Syrup Bomb');
			},
			onResidualOrder: 14,
			onResidual() {
				this.boost({spe: -2});
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Syrup Bomb', '[silent]');
			},
		},
	},
	blackhole: {
		num: 1003,
		accuracy: 100,
		basePower: 250,
		category: "Physical",
		name: "Black Hole",
		shortDesc: "User will KO itself upon use.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, noparentalbond: 1},
		selfdestruct: "always",
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Black Hole Eclipse', target);
		},
		secondary: null,
		target: "allAdjacent",
		type: "Dark",
		contestType: "Beautiful",
	},
	darkdevour: {
		num: 1004,
		accuracy: 90,
		basePower: 90,
		category: "Physical",
		name: "Dark Devour",
		shortDesc: "User heals the amount of HP the opponent lost if they fainted.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Brutal Swing', target);
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) move.drain = [100, 100];
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Cool",
	},
	defog: {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1, wind: 1, bypasssub: 1, metronome: 1},
	},
	triplearrows: {
		inherit: true,
		basePower: 50,
		shortDesc: "Lowers target's Defense by 1; user's crit ratio +2.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		critRatio: null,
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		self: {
			volatileStatus: 'focusenergy',
		},
		contestType: "Cool",//Necessary
	},
	migratingwing: {
		num: 1002,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Migrating Wing",
		shortDesc: "Pivots user out. +1 priority if under 50%.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		selfSwitch: true,
		secondary: null,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Dual Wingbeat', target);
		},
		onModifyPriority(priority, pokemon, target, move) {
			if (pokemon.hp <= pokemon.maxhp / 2) return priority + 1;
		},
		target: "normal",
		type: "Flying",
	},
	compost: {
		num: 1001,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		name: "Compost",
		shortDesc: "1.5x power if user has no item. Recycles item.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Quiver Dance', source);
		},
		onBasePower(basePower, source, target, move) {
			const item = source.getItem();
			if (!item) {
				return this.chainModify(1.5);
			}
		},
		onAfterHit(target, source) {
			if (source.item || !source.lastItem) return false;
			const item = source.lastItem;
			source.lastItem = '';
			this.add('-item', source, this.dex.items.get(item), '[from] move: Compost');
			source.setItem(item);
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Clever",
	},
	electroball: {
		inherit: true,
		basePowerCallback(pokemon, target) {
			let ratio = Math.floor(pokemon.getStat('spe') / target.getStat('spe') * 10) / 10;
			if (!isFinite(ratio)) ratio = 0;
			let bp = 40;
			if (ratio >= 1) bp = 60;
			if (ratio >= 1.5) bp = 80;
			if (ratio >= 2) bp = 100;
			if (ratio >= 3) bp = 120;
			if (ratio >= 4) bp = 150;
		},
	},		
	shelter: {
		inherit: true,
		onHit(damage, target, source, move) {
			this.field.setTerrain('mistyterrain');
		},
	},
	haywirecudgel: {
		num: 1006,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		shortDesc: "High Critical hit ratio. Electric if Ogerpon-Costar.",
		name: "Haywire Cudgel",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		critRatio: 2,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source, move) {
			if (move.type !== "Normal") {
				this.attrLastMove('[anim] Ivy Cudgel ' + move.type);
			}
		},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Ogerpon-Costar':
				move.type = 'Electric';
				break;
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	joyride: {
		num: 1007,
		accuracy: 95,
		basePower: 90,
		category: "Physical",
		name: "Joyride",
		shortDesc: "Crits are boosted in power after use. User crashes if dodged.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Agility', source);
			this.add('-anim', source, 'Play Rough', target);
		},
		onAfterHit(target, source) {
			source.addVolatile('joyride');
		},
		condition: {
			onStart(target, source, effect) {
				if (target.volatiles['dragoncheer']) return false;
				if (effect?.id === 'zpower') {
					this.add('-start', target, 'move: Joyride', '[zeffect]');
				} else if (effect && (['costar', 'imposter', 'psychup', 'transform'].includes(effect.id))) {
					this.add('-start', target, 'move: Joyride', '[silent]');
				} else {
					this.add('-start', target, 'move: Joyride');
				}
				this.add('-message', `${target.name} is feeling full of energy!`);
			},
			onModifyDamage(damage, source, target, move) {
				if (target.getMoveHitData(move).crit) {
					this.debug('Joyride boost');
					return this.chainModify(1.5);
				}
			},
		},
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get('Joyride'));
		},
		target: "normal",
		type: "Fairy",
		contestType: "Cute",
	},
	echoedvoice: {
		num: 497,
		accuracy: 100,
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			let bp = move.basePower;
			if (this.field.pseudoWeather.echoedvoice) {
				bp = move.basePower * this.field.pseudoWeather.echoedvoice.multiplier;
			}
			this.debug('BP: ' + move.basePower);
			return bp;
		},
		category: "Special",
		name: "Echoed Voice",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		onTry() {
			this.field.addPseudoWeather('echoedvoice');
		},
		condition: {
			duration: 3,
			onFieldStart() {
				this.effectState.multiplier = 1;
			},
			onFieldRestart() {
				if (this.effectState.duration !== 3) {
					this.effectState.duration = 3;
					if (this.effectState.multiplier < 5) {
						this.effectState.multiplier++;
					}
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Beautiful",
	},
	axonrush: {
		num: -1004,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Raises the user's and ally's Atk, Def, Spe by 1 in Electric Terrain.",
		name: "Axon Rush",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		onTryHit() {
			if (!this.field.isTerrain('electricterrain')) return false;
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acupressure", target);
		},
		boosts: {
			atk: 1,
			def: 1,
			spe: 1,
		},
		secondary: null,
		target: "allies",
		type: "Electric",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cool",
	},
};
