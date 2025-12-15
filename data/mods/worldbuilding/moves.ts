export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	brightseed: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "Super effective on Flying.",
		name: "Bright Seed",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Seed Flare", source);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Flying') return 1;
		},
		target: "normal",
		type: "Grass",
		contestType: "Beautiful",
	},
	elementaltempest: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "Nullifies the Brn/Frz/Par foe(s)'s Ability.",
		name: "Elemental Tempest",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aeroblast", source);
		},
		onHit(target) {
			if (!pokemon.status) return;
			if (pokemon.status && (pokemon.status === 'slp' || pokemon.status === 'psn' || pokemon.status === 'tox')) return;
			if (target.getAbility().flags['cantsuppress']) return;
			if (target.newlySwitched || this.queue.willMove(target)) return;
			target.addVolatile('gastroacid');
		},
		onAfterSubDamage(damage, target) {
  		if (!pokemon.status) return;
			if (pokemon.status && (pokemon.status === 'slp' || pokemon.status === 'psn' || pokemon.status === 'tox')) return;
			if (target.getAbility().flags['cantsuppress']) return;
			if (target.newlySwitched || this.queue.willMove(target)) return;
			target.addVolatile('gastroacid');
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Flying",
		zMove: {basePower: 140},
		contestType: "Tough",
	},
	fissionbeam: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		shortDesc: "Burns on contact with the user before it moves.",
		name: "Fission Beam",
		pp: 15,
		priority: -3,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, bullet: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hyper Beam", source);
		},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('fissionbeam');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Fission Beam');
			},
			onHit(target, source, move) {
				if (this.checkMoveMakesContact(move, source, target)) {
					source.trySetStatus('brn', target);
				}
			},
		},
		// FIXME: onMoveAborted(pokemon) {pokemon.removeVolatile('fissionbeam')},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('fissionbeam');
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
};
