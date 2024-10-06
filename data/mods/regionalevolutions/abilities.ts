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
	frenzyvirus: {
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (this.checkMoveMakesContact(move, target, source)) {
				if (this.randomChance(3, 10)) {
					target.addVolatile('taunt');
				}
			}
		},
		flags: {},
		name: "Frenzy Virus",
		desc: "This Pokemon's contact moves have a 30% chance of inflicting Taunt. This effect comes after a move's inherent secondary effect chance.",
		shortDesc: "This Pokemon's contact moves have a 30% chance of inflicting Taunt.",
		rating: 2,
		num: -3,
	},
};
