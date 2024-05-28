export const Moves: { [moveid: string]: ModdedMoveData } = {
	waterpulse: {
		inherit: true,
		basePower: 75,
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
		accuracy: 95,
		basePower: 90,
		category: "Physical",
		name: "Dark Devour",
		shortDesc: "User heals 1/2 of its max HP upon KOing opponent.",
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
			if (!target || target.fainted || target.hp <= 0) this.heal(pokemon.maxhp / 2, pokemon, pokemon, move);
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
		shortDesc: "1.5x power if user has no item. Recycles item if previously used.",
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
};
