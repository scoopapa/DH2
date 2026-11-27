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
	cursedwind: {
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		category: "Special",
		shortDesc: "Hits 3 times. Each hit can miss, but power rises.",
		name: "Cursed Wind",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, wind: 1},
		multihit: 3,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
	},
	expurgation: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Heals lowest-HP living ally for 50% of damage dealt.",
		name: "Expurgation",
		pp: 16,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bite: 1, heal: 1},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!pokemon.lastDamage) return;
			const healAmount = Math.floor(pokemon.lastDamage * 0.5);
			if (healAmount <= 0) return;

			const livingAllies = pokemon.side.pokemon.filter(p => p && !p.fainted && p !== pokemon);
			if (livingAllies.length > 0) {
				livingAllies.sort((a, b) => a.hp - b.hp);
				const recipient = livingAllies[0];
				if (recipient.hp < recipient.maxhp) {
					recipient.heal(healAmount, pokemon, move);
				}
				return;
			}

			if (pokemon.hp < pokemon.maxhp) {
				pokemon.heal(healAmount, pokemon, move);
			}
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Tough",
	},
};
