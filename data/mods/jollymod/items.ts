export const Items: {[itemid: string]: ModdedItemData} = {
	berryjuice: {
		name: "Gingerbread Man",
		shortDesc: "Holder heals 100 HP at 1/2 or less max HP. Single use.",
		rating: 3,
		spritenum: 22,
		fling: {
			basePower: 10,
		},
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				if (this.runEvent('TryHeal', pokemon, null, this.effect, 100) && pokemon.useItem()) {
					this.heal(100);
				}
			}
		},
	},
	candycane: {
		name: "Candy Cane",
		rating: 3,
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(source) {
			this.heal(source.baseMaxhp / 8);
			for (const pokemon of this.getAllActive()) {
				if (pokemon.switchFlag === true) return;
			}
			source.setItem('candycane2');
			this.add('-item', source, source.getItem(), '[from] item: Candy Cane');
		},
		num: 1009,
		gen: 2,
		shortDesc: "At the end of every turn, holder restores 1/8 of its max HP. Lasts 3 turns.",
	},
	candycane2: {
		name: "Candy Cane (2)",
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(source) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.switchFlag === true) return;
			}
			source.setItem('candycane1');
			this.add('-item', source, source.getItem(), '[from] item: Candy Cane');
		},
		num: 1017,
		shortDesc: "At the end of every turn, holder restores 1/8 of its max HP. Lasts 2 turns.",
	},
	candycane1: {
		name: "Candy Cane (1)",
		onResidualOrder: 5,
		onResidualSubOrder: 5,
		onResidual(source) {
			this.heal(source.baseMaxhp / 8);
			for (const pokemon of this.getAllActive()) {
				if (pokemon.switchFlag === true) return;
			}
			source.useItem();
		},
		num: 1018,
		shortDesc: "At the end of every turn, holder restores 1/8 of its max HP. Lasts 1 turn.",
	},
	pokedoll: {
		name: "Poke Doll",
		shortDesc: "Effects of Shed Shell and Eject Button.",
		rating: 3,
		fling: {
			basePower: 10,
		},
		onAfterMoveSecondaryPriority: 2,
		onAfterMoveSecondary(target, source, move) {
			if (source && source !== target && target.hp && move && move.category !== 'Status' && !move.flags['futuremove']) {
				if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.beingCalledBack || target.isSkyDropped()) return;
				if (target.volatiles['commanding'] || target.volatiles['commanded']) return;
				for (const pokemon of this.getAllActive()) {
					if (pokemon.switchFlag === true) return;
				}
				target.switchFlag = true;
				if (target.useItem()) {
					source.switchFlag = false;
				} else {
					target.switchFlag = false;
				}
			}
		},
		onTrapPokemonPriority: -10,
		onTrapPokemon(pokemon) {
			pokemon.trapped = pokemon.maybeTrapped = false;
		},
	},
	grimmsnarlite: {
		name: "Grimmsnarlite",
		shortDesc: "If held by a Grimmsnarl, this item allows it to Mega Evolve in battle.", 
		spritenum: 576,
		megaStone: "Grimmsnarl-Mega",
		megaEvolves: "Grimmsnarl",
		itemUser: ["Grimmsnarl"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
	},
}
