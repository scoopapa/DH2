export const Moves: {[k: string]: ModdedMoveData} = {
	terablast: {
		num: 851,
		accuracy: 100,
		basePower: 80,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.terastallized === 'Stellar') {
				return 100;
			}
			return 80;
		},
		category: "Special",
		name: "Tera Blast",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, mustpressure: 1},
		onPrepareHit(target, source, move) {
			if (source.terastallized) {
				this.attrLastMove('[anim] Tera Blast ' + source.teraType);
			}
		},
		onModifyType(move, pokemon, target) {
			if (pokemon.terastallized) {
				move.type = pokemon.species.forceTeraType;
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.terastallized && pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) {
				move.category = 'Physical';
			}
			if (pokemon.terastallized === 'Stellar') {
				move.self = {boosts: {atk: -1, spa: -1}};
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
};
