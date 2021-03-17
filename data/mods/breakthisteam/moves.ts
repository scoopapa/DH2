export const Moves: {[k: string]: ModdedMoveData} = {
	ghostlystrike: {
		accuracy: 85,
		basePower: 55,
		category: "Physical",
		name: "Ghostly Strike",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 2,
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dual Chop", target);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		maxMove: {basePower: 140},
		contestType: "Tough",
		shortDesc: "Hits two times in one turn.",
	},
	ripaway: {
		accuracy: 100,
		basePower: 65,
		category: "Special",
		name: "Rip Away",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psychic", target);
		},
		onBasePower(basePower, source, target, move) {
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemData, target, target, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onAfterHit(target, source) {
			if (source.hp) {
				const item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Knock Off', '[of] ' + source);
					this.battle.lostItemQueue.push(item);
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
		shortDesc: "1.5x damage if foe holds an item. Removes item.",
	},
	retrieval: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Retrieval",
		pp: 20,
		priority: 0, 
		flags: {snatch: 1},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hold Hands", target);
		},
		onHit(pokemon) {
			if (pokemon.item) return false;
			
			if (!this.battle.lostItemQueue.length) return false;
			
			console.log("Before Retrieval: " + this.battle.lostItemQueue);
			let item = this.battle.lostItemQueue.pop();
			console.log("After Retrieval: " + this.battle.lostItemQueue);
			
			this.add('-item', pokemon, this.dex.getItem(item), '[from] move: Retrieval');
			pokemon.setItem(item);
		},
		secondary: null,
		target: "self",
		type: "Normal",
		contestType: "Cute",
		shortDesc: "The user picks up the last item removed earlier in the battle.",
	},
	
	//BLUUUUGGGGGGGH.
	knockoff: {
		inherit: true,
		onAfterHit(target, source) {
			if (source.hp) {
				const item = target.takeItem();
				if (item) {
					this.battle.lostItemQueue.push(item);
					this.add('-enditem', target, item.name, '[from] move: Knock Off', '[of] ' + source);
				}
			}
		},
	},
	bugbite: {
		inherit: true,
		onHit(target, source) {
			const item = target.getItem();
			if (source.hp && item.isBerry && target.takeItem(source)) {
				this.add('-enditem', target, item.name, '[from] stealeat', '[move] Bug Bite', '[of] ' + source);
				if (this.singleEvent('Eat', item, null, source, null, null)) {
					this.runEvent('EatItem', source, null, null, item);
					if (item.id === 'leppaberry') target.staleness = 'external';
				}
				if (item.onEat) source.ateBerry = true;
				this.battle.lostItemQueue.push(item);
			}
		},
	},
	pluck: {
		inherit: true,
		onHit(target, source) {
			const item = target.getItem();
			if (source.hp && item.isBerry && target.takeItem(source)) {
				this.add('-enditem', target, item.name, '[from] stealeat', '[move] Pluck', '[of] ' + source);
				if (this.singleEvent('Eat', item, null, source, null, null)) {
					this.runEvent('EatItem', source, null, null, item);
					if (item.id === 'leppaberry') target.staleness = 'external';
				}
				if (item.onEat) source.ateBerry = true;
				this.battle.lostItemQueue.push(item);
			}
		},
	},
	covet: {
		inherit: true,
		onAfterHit(target, source, move) {
			if (source.item || source.volatiles['gem']) {
				return;
			}
			const yourItem = target.takeItem(source);
			if (!yourItem) {
				return;
			}
			if (
				!this.singleEvent('TakeItem', yourItem, target.itemData, source, target, move, yourItem) ||
				!source.setItem(yourItem)
			) {
				target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
				return;
			}
			this.battle.lostItemQueue.push(yourItem);
			this.add('-item', source, yourItem, '[from] move: Covet', '[of] ' + target);
		},
	},
	thief: {
		inherit: true,
		onAfterHit(target, source, move) {
			if (source.item || source.volatiles['gem']) {
				return;
			}
			const yourItem = target.takeItem(source);
			if (!yourItem) {
				return;
			}
			if (!this.singleEvent('TakeItem', yourItem, target.itemData, source, target, move, yourItem) ||
				!source.setItem(yourItem)) {
				target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
				return;
			}
			this.battle.lostItemQueue.push(yourItem);
			this.add('-enditem', target, yourItem, '[silent]', '[from] move: Thief', '[of] ' + source);
			this.add('-item', source, yourItem, '[from] move: Thief', '[of] ' + target);
		},
	},
	incinerate: {
		inherit: true,
		onHit(pokemon, source) {
			const item = pokemon.getItem();
			if ((item.isBerry || item.isGem) && pokemon.takeItem(source)) {
				this.battle.lostItemQueue.push(item);
				this.add('-enditem', pokemon, item.name, '[from] move: Incinerate');
			}
		},
	},
	corrosivegas: {
		inherit: true,
		onHit(target, source) {
			const item = target.takeItem(source);
			if (item) {
				this.add('-enditem', target, item.name, '[from] move: Corrosive Gas', '[of] ' + source);
				this.battle.lostItemQueue.push(item);
			}
		},
	},
	trick: {
		inherit: true,
		onTryImmunity(target) {
			return !target.hasAbility('stickyhold');
		},
		onHit(target, source, move) {
			const yourItem = target.takeItem(source);
			const myItem = source.takeItem();
			if (target.item || source.item || (!yourItem && !myItem)) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				return false;
			}
			if (
				(myItem && !this.singleEvent('TakeItem', myItem, source.itemData, target, source, move, myItem)) ||
				(yourItem && !this.singleEvent('TakeItem', yourItem, target.itemData, source, target, move, yourItem))
			) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				return false;
			}
			this.add('-activate', source, 'move: Trick', '[of] ' + target);
			if (myItem) {
				target.setItem(myItem);
				this.add('-item', target, myItem, '[from] move: Trick');
			} else {
				this.add('-enditem', target, yourItem, '[silent]', '[from] move: Trick');
				this.battle.lostItemQueue.push(yourItem);
			}
			if (yourItem) {
				source.setItem(yourItem);
				this.add('-item', source, yourItem, '[from] move: Trick');
			} else {
				this.add('-enditem', source, myItem, '[silent]', '[from] move: Trick');
				this.battle.lostItemQueue.push(yourItem);
			}
		},
	},
};