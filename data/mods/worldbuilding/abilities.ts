export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	ionization: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target) && !source.status) {
				const r = this.random(100);
				if (r < 11) {
					source.setStatus('brn', target);
				} else if (r < 21) {
					source.setStatus('par', target);
				} else if (r < 30) {
					source.setStatus('psn', target);
				}
			}
		},
		flags: {},
		name: "Ionization",
		rating: 2,
		shortDesc: "30% chance of poison/paralysis/burn on others making contact with this Pokemon.",
	},
	weaverswill: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Bug') {
				this.debug('Weaver\'s Will boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Bug') {
				this.debug('Weaver\'s Will boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Weaver's Will",
		shortDesc: "This Pokemon's Bug-type attacks have 1.5x power.",
		rating: 3.5,
	},
	peakrockbody: {
		name: "Peak Rock Body",
		shortDesc: "User resists Electric, Bug, and Dark types.",
		onSourceModifyEffectiveness(effectiveness, target, type, move) {
			if (['Electric', 'Bug', 'Dark'].includes(move.type)) {
				return effectiveness - 1;
			}
		},
		flags: {},
		rating: 3.5,
	},
	deepfrozenbody: {
		name: "Deep Frozen Body",
		shortDesc: "User resists Dragon, Ground, and Fire types.",
		onSourceModifyEffectiveness(effectiveness, target, type, move) {
			if (['Dragon', 'Ground', 'Fire'].includes(move.type)) {
				return effectiveness - 1;
			}
		},
		flags: {},
		rating: 3.5,
	},
	hollowironbody: {
		name: "Hollow Iron Body",
		shortDesc: "User resists Ghost, Dark, and Sound moves.",
		onSourceModifyEffectiveness(effectiveness, target, type, move) {
			if (['Ghost', 'Dark'].includes(move.type) || move.flags?.sound) {
				return effectiveness - 1;
			}
		},
		flags: {},
		rating: 3.5,
	},
	weakstart: {
		name: "Weak Start",
		shortDesc: "On switch-in, Atk and Sp. Atk are halved for 5 turns.",
		onStart(pokemon) {
			pokemon.addVolatile('weakstart');
		},
		condition: {
			duration: 5,
			onStart(pokemon) {
				this.add('-start', pokemon, 'ability: Weak Start');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(0.5);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Weak Start');
			},
		},
		flags: {},
		rating: -1,
	},
};
