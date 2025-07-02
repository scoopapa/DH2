export const Moves: {[moveid: string]: ModdedMoveData} = {
	/*
	placeholder: {
		name: "",
		type: "",
		category: "",
		basePower: 0,
		accuracy: 100,
		pp: 10,
		shortDesc: "",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	*/
	
	fling: {
		inherit: true,
		onModifyPriority(priority, source, target, move) {
			if (source.ignoringItem()) return;
			const item = source.getItem();
			if (item.fling.priority) {
				return item.fling.priority;
			}
		},
		onPrepareHit(target, source, move) {
			if (source.ignoringItem()) return false;
			const item = source.getItem();
			if (!this.singleEvent('TakeItem', item, source.itemState, source, source, move, item)) return false;
			if (!item.fling) return false;
			
			move.basePower = item.fling.basePower;
			if (item.fling.damageCallback) move.damageCallback = item.fling.damageCallback;
			if (item.fling.multihit) move.multihit = item.fling.multihit;
			if (item.fling.priority) move.priority = item.fling.priority;
			if (item.fling.type) move.type = item.fling.type;
			
			this.debug('BP: ' + move.basePower);
			if (item.isBerry) {
				move.onHit = function (foe) {
					if (this.singleEvent('Eat', item, null, foe, null, null)) {
						this.runEvent('EatItem', foe, null, null, item);
						if (item.id === 'leppaberry') foe.staleness = 'external';
					}
					if (item.onEat) foe.ateBerry = true;
				};
			} else if (item.fling.effect) {
				move.onHit = item.fling.effect;
			} else {
				if (!move.secondaries) {
					move.secondaries = [];
					if (item.fling.status) {
					move.secondaries.push({status: item.fling.status});
					} else if (item.fling.volatileStatus) {
						move.secondaries.push({volatileStatus: item.fling.volatileStatus});
					} else if (item.fling.secondaries) {
						move.secondaries.push(item.fling.secondary);
					}
				}
				
			}
			source.addVolatile('fling');
		},
	},
	recycle: {
		inherit: true,
		onHit(pokemon) {
			console.log(pokemon.lastItem);
			if (pokemon.item || !pokemon.lastItem || pokemon.lastItem === 'Bottled Lightning') return false;
			const item = pokemon.lastItem;
			pokemon.lastItem = '';
			this.add('-item', pokemon, this.dex.items.get(item), '[from] move: Recycle');
			pokemon.setItem(item);
		},
	},
	
	//fake moves
	deoxysspikes: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "deoxysspikes",
		pp: 1,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1, nosketch: 1},
		sideCondition: 'deoxysspikes',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'deoxysspikes', '[silent]');
			},
			onEntryHazard(pokemon) {
				pokemon.addVolatile('deoxys');
				this.add('-sideend', pokemon.side, 'move: deoxysspikes', '[of] ' + pokemon, '[silent]');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Psychic",
	},
	deoxysatkspikes: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "deoxysatkspikes",
		pp: 1,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1, nosketch: 1},
		sideCondition: 'deoxysatkspikes',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'deoxysatkspikes', '[silent]');
			},
			onEntryHazard(pokemon) {
				pokemon.addVolatile('deoxysatk');
				this.add('-sideend', pokemon.side, 'move: deoxysatkspikes', '[of] ' + pokemon, '[silent]');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Psychic",
	},
	deoxysdefspikes: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "deoxysdefspikes",
		pp: 1,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1, nosketch: 1},
		sideCondition: 'deoxysdefspikes',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'deoxysdefspikes', '[silent]');
			},
			onEntryHazard(pokemon) {
				pokemon.addVolatile('deoxysdef');
				this.add('-sideend', pokemon.side, 'move: deoxysdefspikes', '[of] ' + pokemon, '[silent]');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Psychic",
	},
	deoxysspespikes: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "deoxysspespikes",
		pp: 1,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1, nosketch: 1},
		sideCondition: 'deoxysspespikes',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'deoxysspespikes', '[silent]');
			},
			onEntryHazard(pokemon) {
				pokemon.addVolatile('deoxysspe');
				this.add('-sideend', pokemon.side, 'move: deoxysspespikes', '[of] ' + pokemon, '[silent]');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Psychic",
	},
};
