export const Abilities: { [abilityid: string]: ModdedAbilityData } = {
	aerodynamic: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Flying') {
				this.debug('Aerodynamic boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Flying') {
				this.debug('Aerodynamic boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Aerodynamic",
		shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using a Flying-type attack.",
		rating: 3.5,
		num: -1,
	},
	ionization: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target) && !source.status && source.runStatusImmunity('powder')) {
				const r = this.random(100);
				if (r < 9) {
					source.setStatus('psn', target);
				} else if (r < 19) {
					source.setStatus('par', target);
				} else if (r < 30) {
					source.setStatus('brn', target);
				}
			}
		},
		flags: {},
		name: "Ionization",
		desc: "Successful contact moves against this Pokemon result in a 9% chance of poisoning, a 10% chance of paralysis, and an 11% chance of a burn being inflicted upon the attacker.",
		shortDesc: "Contact with the Pokémon may inflict poison, paralysis, or a burn on the attacker.",
		rating: 2,
		num: -2,
	},
};
