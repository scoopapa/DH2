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
		/*onModifyType(move, pokemon, target) {
			if (pokemon.terastallized) {
				move.type = pokemon.teraType;
			}
		},*/
		onModifyMove(move, pokemon) {
  			if (pokemon.terastallized === 'Fire' || pokemon.terastallized === 'Water' || pokemon.terastallized === 'Grass' ||
			  pokemon.terastallized === 'Electric' || pokemon.terastallized === 'Dark' || pokemon.terastallized === 'Psychic' ||
			  pokemon.terastallized === 'Dragon' || pokemon.terastallized === 'Ice') { 
        		move.category = 'Special';
				move.type = pokemon.teraType;
      	}
			if (pokemon.terastallized === 'Normal' || pokemon.terastallized === 'Fighting' || pokemon.terastallized === 'Flying' ||
				  pokemon.terastallized === 'Ground' || pokemon.terastallized === 'Rock' || pokemon.terastallized === 'Bug' ||
				  pokemon.terastallized === 'Ghost' || pokemon.terastallized === 'Poison' || pokemon.terastallized === 'Steel') {
				move.type = pokemon.teraType;
      	}
			if (pokemon.terastallized === 'Stellar') {
	  			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) {
	  				move.category = 'Special';
					move.type = pokemon.teraType;
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
