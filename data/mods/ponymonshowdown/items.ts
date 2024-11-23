export const Items: import('../sim/dex-items').ItemDataTable = {
	crystalheartpiece: {
		name: "Crystal Heart Piece",
		spritenum: 658,
		onTakeItem: false,
		onStart(pokemon) {
			const type = pokemon.teraType;
			this.add('-item', pokemon, 'Tera Shard');
			this.add('-anim', pokemon, "Cosmic Power", pokemon);
			if (type && type !== '???') {
				if (!pokemon.setType(type)) return;
				this.add('-start', pokemon, 'typechange', type, '[from] item: Crystal Heart Piece');
			}
			this.add('-message', `${pokemon.name}'s Tera Shard changed its type!`);
		},
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			if (move.id === 'terablast') {
				return move.basepower = 100;
			}
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'soak' || move.id === 'magicpowder') {
				this.add('-immune', pokemon, '[from] item: Crystal Heart Piece');
				return null;
			}
		},
		num: -1000,
		gen: 9,
		desc: "Holder becomes its Tera Type on switch-in.",
		rating: 3,
	},
};
