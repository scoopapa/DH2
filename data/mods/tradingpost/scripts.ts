import {Dex} from '../../../sim/dex';

export const RESTORATIVE_BERRIES = new Set([
	'leppaberry', 'aguavberry', 'enigmaberry', 'figyberry', 'iapapaberry', 'magoberry', 'sitrusberry', 'wikiberry', 'oranberry',
] as ID[]);

export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
	},	
	
	init() {
	
	},
	
	pokemon: {
		getBestStatExceptSpeed(unboosted?: boolean, unmodified?: boolean): StatIDExceptHP {
			let statName: StatIDExceptHP = 'atk';
			let bestStat = 0;
			const stats: StatIDExceptHP[] = ['atk', 'def', 'spa', 'spd'];
			for (const i of stats) {
				if (this.getStat(i, unboosted, unmodified) > bestStat) {
					statName = i;
					bestStat = this.getStat(i, unboosted, unmodified);
				}
			}

			return statName;
		},
		setItem(item: string | Item, source?: Pokemon, effect?: Effect) {
			if (!this.hp) return false;
			if (this.itemState.knockedOff) return false;
			if (typeof item === 'string') item = this.battle.dex.items.get(item);

			const effectid = this.battle.effect ? this.battle.effect.id : '';
			if (RESTORATIVE_BERRIES.has('leppaberry' as ID)) {
				const inflicted = ['trick', 'switcheroo'].includes(effectid);
				const external = inflicted && source && !source.isAlly(this);
				this.pendingStaleness = external ? 'external' : 'internal';
			} else {
				this.pendingStaleness = undefined;
			}
			const oldItem = this.getItem();
			const oldItemState = this.itemState;
			this.item = item.id;
			this.itemState = {id: item.id, target: this};
			if (oldItem.exists) this.battle.singleEvent('End', oldItem, oldItemState, this);
			if (item.id && this.isActive) {
				this.battle.singleEvent('Start', item, this.itemState, this, source, effect);
			}
			return true;
		},
	},
};