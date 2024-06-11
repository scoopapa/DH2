export const Moves: {[k: string]: ModdedMoveData} = {
	terablast: {
		num: 851,
		accuracy: 100,
		basePower: 80,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.terastallized === 'Stellar') {
				return 100;
			}
			return move.basePower;
		},
		category: "Physical",
		name: "Tera Blast",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, mustpressure: 1},
		onPrepareHit(target, source, move) {
			if (source.terastallized) {
				this.attrLastMove('[anim] Tera Blast ' + source.teraType);
			}
		},
		onModifyType(move, pokemon, target) {
			if (pokemon.terastallized) {
				move.type = pokemon.teraType;
			}
		},
		onModifyMove(move, pokemon) {
  		if ((move.type === 'Fire' || move.type === 'Water' || move.type === 'Grass' || move.type === 'Electric' || move.type === 'Dark' ||
           move.type === 'Psychic' || move.type === 'Dragon') && pokemon.terastallized) { 
        move.category = 'Special';
      }
			if ((move.type === 'Normal' || move.type === 'Fighting' || move.type === 'Flying' || move.type === 'Ground' || move.type === 'Rock' ||
           move.type === 'Bug' || move.type === 'Ghost' || move.type === 'Poison' || move.type === 'Steel') && pokemon.terastallized) {
        move.category = 'Physical';
      }
			if (pokemon.terastallized === 'Stellar') {
  			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) {
  				move.category = 'Special';
  			}
				move.self = {boosts: {atk: -1, spa: -1}};
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
    gen: 2,
	},
};
