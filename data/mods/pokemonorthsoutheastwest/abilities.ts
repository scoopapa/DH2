export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	lullabody: {
 shortDesc: "Contact with this Pokémon may put the attacker to sleep.",
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('slp', target);
				}
			}
		},
		flags: {},
		name: "Lullabody",
		rating: 2,
		num: 49,
	},
	prediction: {
		 shortDesc: "This Pokémon uses Future Sight when sent out.",
		onStart(pokemon) {
				for (const target of pokemon.adjacentFoes()) {
				this.actions.useMove('futuresight', pokemon, target);
			}
		},
		flags: {},
		name: "Prediction",
		rating: 0.5,
		num: 1047,
	},
		frigidtouch: {
			shortDesc: "Contact with this Pokémon may freeze the target. Also grants contact moves freezing power.",
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('frz', target);
				}
			}
		},
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (this.checkMoveMakesContact(move, target, source)) {
				if (this.randomChance(3, 10)) {
					target.trySetStatus('frz', source);
				}
			}
		},
		flags: {},
		name: "Frigid Touch",
		rating: 2,
		num: 1443,
	},
}
