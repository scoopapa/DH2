export const Scripts: ModdedBattleScriptsData = {
	teambuilderConfig: {
		customTiers: ['SSB'],
	},
	init() {
		this.modData("Learnsets", "delibird").learnset.healingwish = ["9L1"];
		this.modData("Learnsets", "delibird").learnset.celebrate = ["9L1"];
		this.modData("Learnsets", "delibird").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "delibird").learnset.roost = ["9L1"];
		this.modData("Learnsets", "delibird").learnset.wish = ["9L1"];
	},
  pokemon: {
  	lostItemForDelibird: null,
  	setItem(item: string | Item, source?: Pokemon, effect?: Effect) {
  		if (!this.hp) return false;
  		if (this.itemState.knockedOff) return false;
  		if (typeof item === 'string') item = this.battle.dex.items.get(item);
  
  		const effectid = this.battle.effect ? this.battle.effect.id : '';
  		const RESTORATIVE_BERRIES = new Set([
  			'leppaberry', 'aguavberry', 'enigmaberry', 'figyberry', 'iapapaberry', 'magoberry', 'sitrusberry', 'wikiberry', 'oranberry',
  		] as ID[]); // manually pasted in const RESTORATIVE_BERRIES because its absence caused a bug
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
  		if (item.id) {
  			this.battle.singleEvent('Start', item, this.itemState, this, source, effect);
  		}
  		return true;
  	},
  },
};
