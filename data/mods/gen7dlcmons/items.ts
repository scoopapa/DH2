export const Items: {[itemid: string]: ModdedItemData} = {
	plubiumz: {
		name: "Plubium Z",
		desc: "If held by Plubia with Shadow Ball, it can use Eternal Nightmare.",
		spritenum: 644,
		onTakeItem: false,
		zMove: "Eternal Nightmare",
		zMoveFrom: "Shadow Ball",
		itemUser: ["Plubia"],
		num: -1027,
		gen: 7,
	},
	dittoplush: {
		name: "Ditto Plush",
		shortDesc: "Temporarily copies the item of an adjacent opponent on entry.",
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted || !this.isAdjacent(target, pokemon)) continue;
				if (!target.item || this.dex.getItem(target.item).zMove || this.dex.getItem(target.item).megaStone) continue;
				if (!pokemon.useItem) return;
				pokemon.item = target.item;
				this.add('-message', `${pokemon.illusion ? pokemon.illusion.name : pokemon.name} copied the ${this.dex.getItem(pokemon.item).name} belonging to ${target.illusion ? target.illusion.name : target.name}!`);
				pokemon.addVolatile('dittoplush');
				return;
			}
		},
		condition: {
			onEnd(pokemon) {
				if (pokemon.item && pokemon.item !== 'dittoplush') { // don't return Ditto Plush if the Pokémon has lost its item
					this.add('-message', `${pokemon.illusion ? pokemon.illusion.name : pokemon.name}'s Ditto Plush returned to normal!`);
					pokemon.item = 'dittoplush' as ID;
				}
			},
		},
		fling: {
			basePower: 60,
		},
		gen: 7,
		num: -1004,
	},
	kommoniumz: {
		name: "Kommonium Z",
		spritenum: 690,
		onTakeItem: false,
		zMove: "Clangorous Soulblaze",
		zMoveFrom: "Clanging Scales",
		itemUser: ["Kommo-o", "Kommo-o-Totem", "Komodond"],
		num: 926,
		gen: 7,
	},
};