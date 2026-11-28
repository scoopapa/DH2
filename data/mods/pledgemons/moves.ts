export const Moves: {[moveid: string]: ModdedMoveData} = {
	// Evil has been unleashed
	grasspledge: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)){
				move.category = 'Physical';
			}
			if (move.sourceEffect === 'waterpledge') {
				move.type = 'Grass';
				move.forceSTAB = true;
				move.sideCondition = 'grasspledge';
			}
			if (move.sourceEffect === 'firepledge') {
				move.type = 'Fire';
				move.forceSTAB = true;
				move.sideCondition = 'firepledge';
			}
		},
		shortDesc: "Physical if ATK > SPA. Combine with Fire or Water Pledge!",
	},
	firepledge: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)){
				move.category = 'Physical';
			}
			if (move.sourceEffect === 'waterpledge') {
				move.type = 'Water';
				move.forceSTAB = true;
				move.self = {sideCondition: 'waterpledge'};
			}
			if (move.sourceEffect === 'grasspledge') {
				move.type = 'Fire';
				move.forceSTAB = true;
				move.sideCondition = 'firepledge';
			}
		},
		shortDesc: "Physical if ATK > SPA. Combine with Grass or Water Pledge!",
	},
	waterpledge: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)){
				move.category = 'Physical';
			}
			if (move.sourceEffect === 'grasspledge') {
				move.type = 'Grass';
				move.forceSTAB = true;
				move.sideCondition = 'grasspledge';
			}
			if (move.sourceEffect === 'firepledge') {
				move.type = 'Water';
				move.forceSTAB = true;
				move.self = {sideCondition: 'waterpledge'};
			}
		},
		shortDesc: "Physical if ATK > SPA. Combine with Grass or Fire Pledge!",
	},
};
