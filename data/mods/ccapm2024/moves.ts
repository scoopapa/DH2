export const Moves: {[moveid: string]: ModdedMoveData} = {
	/*
	placeholder: {
		name: "",
		type: "",
		category: "",
		basePower: 0,
		accuracy: 100,
		pp: 10,
		shortDesc: "",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	*/
	leechlife: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (!pokemon.volatiles['bloodsucking']) return;
			move.basePower = 20;
			move.drain = [1, 1];
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
			pokemon.removeVolatile('bloodsucking');
		},
	},
	
	//fake move
	medic: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "medic",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1, nosketch: 1},
		sideCondition: 'medic',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'medic', '[silent]');
			},
			onEntryHazard(pokemon) {
				this.heal(pokemon.maxhp / 6);
				if(pokemon.status) pokemon.cureStatus();
				pokemon.side.removeSideCondition('medic');
				this.add('-sideend', pokemon.side, 'move: medic', '[of] ' + pokemon, '[silent]');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Normal",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
}
