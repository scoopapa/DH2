export const Abilities: { [abilityid: string]: ModdedAbilityData } = {
	//placeholder
	thickfat: {
		inherit: true,
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Thick Fat');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Thick Fat');
			}
			return false;
		},
		shortDesc: "Fire-/Ice-type moves against this Pokemon deal 1/2 damage. Burn immune.",
	},
	callvolbeat: {
		//Placeholder for when ability is implemented
		/*onSourceDamagingHit(damage, target, source, move) {
			if (this.hasVolHealed) return;
			this.hasVolHealed = true;
			this.heal(1 / 4);
		},*/
		flags: {breakable: 1},
		name: "Call Volbeat",
		rating: 5,
		num: -100,
		shortDesc: "Does nothing right now!",
		//shortDesc: "After getting hit for the first time in a battle, heal 25% HP.",
	},
	callillumise: {
		//Placeholder for when ability is implemented
		/*onSourceDamagingHit(damage, target, source, move) {
			if (this.hasIllHealed) return;
			this.hasIllHealed = true;
			this.heal(1 / 4);
		},*/
		flags: {breakable: 1},
		name: "Call Illumise",
		rating: 5,
		num: -101,
		shortDesc: "Does nothing right now!",
		//shortDesc: "After getting hit for the first time in a battle, heal 25% HP.",
	},
	shortfuse: {
		//Placeholder until implementation
		flags: {breakable: 1},
		name: "Short Fuse",
		rating: 5,
		num: -102,
		shortDesc: "Does nothing right now!",
		//shortDesc: "When this Pokemon would be KOed, it instead uses Explosion.",
	},
	hydroelectricdam: {
		//Copied from the code for Sand Spit
		onDamagingHit(damage, target, source, move) {
			this.field.setWeather('raindance');
		},
		flags: {},
		name: "Hydroelectric Dam",
		rating: 5,
		num: -103,
		shortDesc: "When this Pokemon is hit by an attack, the effect of Rain Dance begins.",
	},
	flipflop: {
		//Placeholder
		flags: {},
		name: "Flip Flop",
		rating: 5,
		num: -104,
		shortDesc: "Does nothing right now!",
		//shortDesc: "When this Pokemon is hit by an attack, it first inverts the opponent's positive stat stage changes.",
	},
	frozenarmor: {
		//Code stolen from Shields Down
		onTryHit(target, source, move) {
			if(move.category != 'Status') {
				move.basePower = Math.max(move.basePower - 20, 0);
			}
		},
		onSwitchInPriority: -1,
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Glastrier' || pokemon.transformed) return;
			if (pokemon.hp > pokemon.maxhp / 2) {
				if (pokemon.species !== 'Calyrex-Ice') {
					pokemon.formeChange('Calyrex-Ice');
				}
			} else {
				if (pokemon.species.forme === 'Calyrex-Ice') {
					pokemon.formeChange(pokemon.set.species);
				}
			}
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Glastrier' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.hp > pokemon.maxhp / 2) {
				if (pokemon.species !== 'Calyrex-Ice') {
					pokemon.formeChange('Calyrex-Ice');
				}
			} else {
				if (pokemon.species.forme === 'Calyrex-Ice') {
					pokemon.formeChange(pokemon.set.species);
				}
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Frozen Armor",
		rating: 5,
		num: -105,
		shortDesc: "Incoming attacks have their BP reduced by 20. This Pokemon transforms into Calyrex-Ice below 50% HP.",
	},
};
