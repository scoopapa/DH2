export const Items: {[k: string]: ModdedItemData} = {
  	"leftovers": {
		inherit: true,
		onResidual(pokemon) {
			if (this.field.isTerrain('grassyterrain')) return;
			let healFraction = 16;
			if (pokemon.ability === 'ripen'){
				healFraction = healFraction / 2;
			}
			this.heal(pokemon.baseMaxhp / healFraction);
		},
		onTerrain(pokemon) {
			if (!this.field.isTerrain('grassyterrain')) return;
			let healFraction = 16;
			if (pokemon.ability === 'ripen'){
				healFraction = healFraction / 2;
			}
			this.heal(pokemon.baseMaxhp / healFraction);
		},
	},
	"choiceband": {
		inherit: true,
		onModifyAtk(atk, pokemon) {
			if (pokemon.ability === 'gorillatactics') return;
			return this.chainModify(1.5);
		},
	},
	"choicescarf": {
		inherit: true,
		onModifySpe(spe, pokemon) {
			if (pokemon.ability === 'gorillatactics') return;
			return this.chainModify(1.5);
		},
	},
	"choicespecs": {
		inherit: true,
		onModifySpA(spa, pokemon) {
			if (pokemon.ability === 'gorillatactics') return;
			return this.chainModify(1.5);
		},
	},
	"redcard": {
		id: "redcard",
		name: "Red Card",
		spritenum: 387,
		fling: {
			basePower: 10,
		},
		onAfterMoveSecondary(target, source, move) {
			if (source && source !== target && source.hp && target.hp && move && move.category !== 'Status') {
				if (target.volatiles['dynamax']){
					target.redCardWhileDynamax = true;
				}
				if (!source.isActive || !this.canSwitch(source.side) || source.forceSwitchFlag || target.forceSwitchFlag) return;
				if (target.useItem(source)) { // This order is correct - the item is used up even against a pokemon with Ingrain or that otherwise can't be forced out
					if (this.runEvent('DragOut', source, target, move)) {
						source.forceSwitchFlag = true;
					}
				}
			}
		},
		num: 542,
		gen: 5,
		desc: "If holder survives a hit, attacker is forced to switch to a random ally. Single use.",
	},
};