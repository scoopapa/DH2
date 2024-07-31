export const Moves: {[k: string]: ModdedMoveData} = {
	orderup: {
		num: 856,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Order Up",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!pokemon.volatiles['commanded']) return;
			const tatsugiri = pokemon.volatiles['commanded'].source;
			if (tatsugiri.baseSpecies.baseSpecies !== 'Tatsugiri' || tatsugiri.baseSpecies.baseSpecies !== 'Iron Onigiri' ||
				tatsugiri.baseSpecies.baseSpecies !== 'Iron Onigiri-Droopy' || tatsugiri.baseSpecies.baseSpecies !== 'Iron Onigiri-Stretchy') return; // Should never happen
			switch (tatsugiri.baseSpecies.forme) {
			case 'Droopy':
				this.boost({def: 1}, pokemon, pokemon);
				break;
			case 'Stretchy':
				this.boost({spe: 1}, pokemon, pokemon);
				break;
			default:
				this.boost({atk: 1}, pokemon, pokemon);
				break;
			}
		},
		secondary: null,
		hasSheerForce: true,
		target: "normal",
		type: "Dragon",
	},
};
