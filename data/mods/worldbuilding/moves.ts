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
		/*onAfterMoveSecondarySelf(pokemon, target, move) {
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
		},*/ // Expuragation Please Check Code
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Tough",
	},
	cocoonburst: {
		accuracy: 100,
		basePower: 130,
		category: "Special",
		shortDesc: "Charges turn 1 (+1 Def/SpD). Hits adjacent foes turn 2.",
		name: "Cocoon Burst",
		pp: 5,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1, metronome: 1, bullet: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({def: 1, spd: 1}, attacker, attacker, move);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: null,
		target: "allAdjacent",
		type: "Bug",
		contestType: "Tough",
	},
	export const Moves: {[k: string]: ModdedMoveData} = {
	mantleshaper: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		shortDesc: "Heals the user for 50% of damage dealt.",
		name: "Mantle Shaper",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1, metronome: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	freezingage: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		shortDesc: "Hits all foes. 100% chance to raise user's Def by 1.",
		name: "Freezing Age",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		self: {
			boosts: {
				def: 1,
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
	},
	unbreakablesteel: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		shortDesc: "Moves last; takes halved damage before attacking.",
		name: "Unbreakable Steel",
		pp: 10,
		priority: -3,
		flags: {contact: 1, protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Heavy Slam", target);
		},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('unbreakablesteel');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Unbreakable Steel');
			},
			onSourceModifyDamage(damage, source, target, move) {
				return this.chainModify(0.5);
			},
		},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('unbreakablesteel');
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Tough",
	},
	crushgrip: {
		inherit: true,
		accuracy: 100,
		basePower: 130,
		basePowerCallback: null,
		category: "Physical",
		shortDesc: "Clears hazards, trap, and Leech Seed; user yawns.",
		name: "Crush Grip",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onAfterHit(target, source, move) {
			if (!source.hp) return;
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (source.hp && source.side.removeSideCondition(condition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(condition).name, '[from] move: Crush Grip', '[of] ' + source);
				}
			}
			if (source.volatiles['partiallytrapped']) {
				source.removeVolatile('partiallytrapped');
			}
			if (source.volatiles['leechseed']) {
				source.removeVolatile('leechseed');
			}
			source.trySetStatus('yawn', source, move);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
};
};
