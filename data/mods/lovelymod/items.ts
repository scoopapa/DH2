export const Items: {[itemid: string]: ModdedItemData} = {
	heartscale: {
		name: "Heart Scale",
		rating: 3,
		shortDesc: "Holder is immune to Heart moves. Single use.",
		fling: {
			basePower: 30,
		},
		onTryHit(pokemon, source, move) {
			if (move.flags['heart'] && pokemon !== source) {
				this.add('-activate', pokemon, 'item: Heart Scale', move.name);
				this.add('-enditem', pokemon, 'Heart Scale');
				pokemon.item = '';
				return null;
			}
		},
	},
	lovesweet: {
		inherit: true,
		rating: 3,
		shortDesc: "Infatuates the holder when at 1/2 max HP or less. Single use.",
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				pokemon.eatItem();
			}
		},
		onEat(pokemon) {
			pokemon.addVolatile('attract', pokemon);
		},
	},
}
