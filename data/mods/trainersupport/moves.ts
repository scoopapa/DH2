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
	dragonclaw: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			if (pokemon.volatiles['irisboost']) return basePower + 100;
		},
	},
	dragonpulse: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			if (pokemon.volatiles['irisboost']) return basePower + 100;
		},
	},
	quickattack: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			if (pokemon.volatiles['joeyboost']) return basePower + 20;
		},
	},
	tackle: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			if (pokemon.volatiles['joeyboost']) return basePower + 80;
		},
	},
	tailwhip: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (pokemon.volatiles['joeyboost']) move.selfSwitch = true;
		},
	},
};
