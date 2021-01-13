'use strict';

exports.BattleMovedex = {
	"incinerate": {
		inherit: true,
		onHit: function (pokemon, source) {
			let item = pokemon.getItem();
			if ((item.isBerry || item.isGem) && pokemon.takeItem(source)) {
				this.add('-enditem', pokemon, item.name, '[from] move: Incinerate');
			}
			let dual = pokemon.getAbility();
			if ((dual.isBerry || dual.isGem) && pokemon.takeDual(source)) {
				this.add('-endItem', pokemon, item.name, '[from] move: Incinerate');
			}
		},
	},
	"knockoff": {
		inherit: true,
		onBasePower: function (basePower, source, target, move) {
			let item = target.getItem();
			if (item.id && this.singleEvent('TakeItem', item, target.itemData, target, source, move, item)) {
				return this.chainModify(1.5);
			}
			let dual = target.getAbility();
			if (dual.id && dual.effectType === 'Item' && this.singleEvent('TakeItem', dual, target.abilityData, target, source, move, dual)) {
				return this.chainModify(1.5);
			}
		},
		onAfterHit: function (target, source) {
			if (source.hp) {
				let item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Knock Off', '[of] ' + source);
				}
				item = target.takeDual();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Knock Off', '[of]' + source);
				}
			}
		},
	},
	"switcheroo": {
		inherit: true,
		onHit: function (target, source, move) {
			let didSomething = false;
			let yourItem = target.takeItem(source);
			let myItem = source.takeItem();
			if (target.item || source.item || (!yourItem && !myItem)) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
			} else if ((myItem && !this.singleEvent('TakeItem', myItem, source.itemData, target, source, move, myItem)) || (yourItem && !this.singleEvent('TakeItem', yourItem, target.itemData, source, target, move, yourItem))) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
			} else {
				this.add('-activate', source, 'move: Trick', '[of] ' + target);
				if (myItem) {
					target.setItem(myItem);
					this.add('-item', target, myItem, '[from] move: Switcheroo');
				} else {
					this.add('-enditem', target, yourItem, '[silent]', '[from] move: Switcheroo');
				}
				if (yourItem) {
					source.setItem(yourItem);
					this.add('-item', source, yourItem, '[from] move: Switcheroo');
				} else {
					this.add('-enditem', source, myItem, '[silent]', '[from] move: Switcheroo');
				}
				didSomething = true;
			}
			let yourDual = target.takeDual(source);
			let myDual = source.takeDual();
			if (target.ability || source.ability || (!yourItem && !myItem)) {
				if (yourDual) target.baseAbility = target.ability = yourDual.id;
				if (myDual) source.baseAbility = source.ability = myDual.id;
			} else if ((myDual && !this.singleEvent('TakeItem', myDual, source.abilityData, target, source, move, myDual)) || (yourDual && !this.singleEvent('TakeItem', yourDual, target.abilityData, source, target, move, yourDual))) {
				if (yourDual) target.baseAbility = target.ability = yourDual.id;
				if (myDual) source.baseAbility = source.ability = myDual.id;
			} else {
				this.add('-activate', source, 'move: Trick', '[of] ' + target);
				if (myDual) {
					target.setAbility(myDual);
					target.baseAbility = target.ability;
					this.add('-item', target, myDual, '[from] move: Switcheroo');
				} else {
					this.add('-enditem', target, yourDual, '[silent]', '[from] move: Switcheroo');
				}
				if (yourDual) {
					source.setAbility(yourDual);
					source.baseAbility = source.ability;
					this.add('-item', source, yourDual, '[from] move: Switcheroo');
				} else {
					this.add('-enditem', source, myDual, '[silent]', '[from] move: Switcheroo');
				}
				didSomething = true;
			}
			if (!didSomething) return false;
		},
	},
	"trick": {
		inherit: true,
		onHit: function (target, source, move) {
			let didSomething = false;
			let yourItem = target.takeItem(source);
			let myItem = source.takeItem();
			if (target.item || source.item || (!yourItem && !myItem)) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
			} else if ((myItem && !this.singleEvent('TakeItem', myItem, source.itemData, target, source, move, myItem)) || (yourItem && !this.singleEvent('TakeItem', yourItem, target.itemData, source, target, move, yourItem))) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
			} else {
				this.add('-activate', source, 'move: Trick', '[of] ' + target);
				if (myItem) {
					target.setItem(myItem);
					this.add('-item', target, myItem, '[from] move: Switcheroo');
				} else {
					this.add('-enditem', target, yourItem, '[silent]', '[from] move: Switcheroo');
				}
				if (yourItem) {
					source.setItem(yourItem);
					this.add('-item', source, yourItem, '[from] move: Switcheroo');
				} else {
					this.add('-enditem', source, myItem, '[silent]', '[from] move: Switcheroo');
				}
				didSomething = true;
			}
			let yourDual = target.takeDual(source);
			let myDual = source.takeDual();
			if (target.ability || source.ability || (!yourItem && !myItem)) {
				if (yourDual) target.baseAbility = target.ability = yourDual.id;
				if (myDual) source.baseAbility = source.ability = myDual.id;
			} else if ((myDual && !this.singleEvent('TakeItem', myDual, source.abilityData, target, source, move, myDual)) || (yourDual && !this.singleEvent('TakeItem', yourDual, target.abilityData, source, target, move, yourDual))) {
				if (yourDual) target.baseAbility = target.ability = yourDual.id;
				if (myDual) source.baseAbility = source.ability = myDual.id;
			} else {
				this.add('-activate', source, 'move: Trick', '[of] ' + target);
				if (myDual) {
					target.setAbility(myDual);
					this.add('-item', target, myDual, '[from] move: Switcheroo');
				} else {
					this.add('-enditem', target, yourDual, '[silent]', '[from] move: Switcheroo');
				}
				if (yourDual) {
					source.setAbility(yourDual);
					this.add('-item', source, yourDual, '[from] move: Switcheroo');
				} else {
					this.add('-enditem', source, myDual, '[silent]', '[from] move: Switcheroo');
				}
				didSomething = true;
			}
			if (!didSomething) return false;
		},
	},
	"skillswap": {
		inherit: true,
		onHit: function (target, source, move) {
			let targetAbility = this.getAbility(target.ability);
			let sourceAbility = this.getAbility(source.ability);
			if (target.side === source.side) {
				this.add('-activate', source, 'move: Skill Swap', '', '', '[of] ' + target);
			} else {
				this.add('-activate', source, 'move: Skill Swap', targetAbility, sourceAbility, '[of] ' + target);
			}
			this.singleEvent('End', sourceAbility, source.abilityData, source);
			let sourceAlly = source.side.active.find(ally => ally && ally !== source && !ally.fainted);
			if (sourceAlly && sourceAlly.innate) {
				sourceAlly.removeVolatile(sourceAlly.innate);
				delete sourceAlly.innate;
			}
			this.singleEvent('End', targetAbility, target.abilityData, target);
			let targetAlly = target.side.active.find(ally => ally && ally !== target && !ally.fainted);
			if (targetAlly && targetAlly.innate) {
				targetAlly.removeVolatile(targetAlly.innate);
				delete targetAlly.innate;
			}
			if (targetAbility.id !== sourceAbility.id) {
				source.ability = targetAbility.id;
				target.ability = sourceAbility.id;
				source.abilityData = {id: source.ability.id, target: source};
				target.abilityData = {id: target.ability.id, target: target};
			}
			if (sourceAlly && sourceAlly.ability !== source.ability) {
				let volatile = sourceAlly.innate = 'ability' + source.ability;
				sourceAlly.volatiles[volatile] = {id: volatile};
				sourceAlly.volatiles[volatile].target = sourceAlly;
				sourceAlly.volatiles[volatile].source = source;
				sourceAlly.volatiles[volatile].sourcePosition = source.position;
				if (!source.innate) {
					volatile = source.innate = 'ability' + sourceAlly.ability;
					source.volatiles[volatile] = {id: volatile};
					source.volatiles[volatile].target = source;
					source.volatiles[volatile].source = sourceAlly;
					source.volatiles[volatile].sourcePosition = sourceAlly.position;
				}
			}
			if (targetAlly && targetAlly.ability !== target.ability) {
				let volatile = targetAlly.innate = 'ability' + target.ability;
				targetAlly.volatiles[volatile] = {id: volatile};
				targetAlly.volatiles[volatile].target = targetAlly;
				targetAlly.volatiles[volatile].source = target;
				targetAlly.volatiles[volatile].sourcePosition = target.position;
				if (!target.innate) {
					volatile = target.innate = 'ability' + targetAlly.ability;
					target.volatiles[volatile] = {id: volatile};
					target.volatiles[volatile].target = target;
					target.volatiles[volatile].source = targetAlly;
					target.volatiles[volatile].sourcePosition = targetAlly.position;
				}
			}
			this.singleEvent('Start', targetAbility, source.abilityData, source);
			if (sourceAlly) this.singleEvent('Start', sourceAlly.innate, sourceAlly.volatiles[sourceAlly.innate], sourceAlly);
			this.singleEvent('Start', sourceAbility, target.abilityData, target);
			if (targetAlly) this.singleEvent('Start', targetAlly.innate, targetAlly.volatiles[targetAlly.innate], targetAlly);
		},
	},
};
