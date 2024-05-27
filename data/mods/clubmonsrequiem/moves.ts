export const Moves: { [moveid: string]: ModdedMoveData } = {

	waterpulse: {
		num: 352,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Water Pulse",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1, metronome: 1, pulse: 1},
		secondary: {
			chance: 20,
			volatileStatus: 'confusion',
		},
		target: "any",
		type: "Water",
		contestType: "Beautiful",
	},
	syrupbomb: {
		num: 903,
		shortDesc: "Lowers Speed by 2 stages for 3 turns.",
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Syrup Bomb",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
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
		secondary: {
			chance: 100,
			volatileStatus: 'syrupbomb',
		},
		target: "normal",
		type: "Grass",
	},
	defog: {
		num: 432,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Defog",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, wind: 1, bypasssub: 1, metronome: 1},
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.conditions.get(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			this.field.clearTerrain();
			return success;
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		zMove: {boost: {accuracy: 1}},
		contestType: "Cool",
	},
	triplearrows: {
		shortDesc: "100% to lower target's Defense by 1; user's crit ratio +2.",
		num: -1008,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Triple Arrows",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acupressure", source);
			this.add('-anim', source, "Needle Arm", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		self: {
			volatileStatus: 'focusenergy',
		},
		target: "normal",
		type: "Fighting",
		contestType: "Cool",//Necessary
	},
	migratingwing: {
		num: 812,
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
		num: 282,
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
	shelter: {
		num: 842,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Shelter",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		boosts: {
			def: 2,
		},
		onHit(damage, target, source, move) {
			this.field.setTerrain('mistyterrain');
		},
		secondary: null,
		target: "self",
		type: "Steel",
	},
}
