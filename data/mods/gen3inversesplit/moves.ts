export const Moves: {[k: string]: ModdedMoveData} = {
  hiddenpower: {
		inherit: true,
		basePower: 0,
		basePowerCallback(pokemon) {
			return pokemon.hpPower || 70;
		},
		category: "Physical",
		onModifyMove(move, pokemon) {
			move.type = pokemon.hpType || 'Dark';
			const specialTypes = ['Bug', 'Fighting', 'Flying', 'Ground', 'Ghost', 'Normal', 'Poison', 'Rock', 'Steel'];
			move.category = specialTypes.includes(move.type) ? 'Special' : 'Physical';
		},
	},
};
