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
		bravery: {
			shortDesc: "This Pokémon takes 50% less damage from Dark, Ghost, and Bug moves.",
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Dark' || move.type === 'Ghost' || move.type === 'Bug') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Dark' || move.type === 'Ghost' || move.type === 'Bug') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		flags: {breakable: 1},
		name: "Bravery",
		rating: 3.5,
		num: 47,
	},
	blackout: {
					shortDesc: "This Pokémon sets up Nighttime on switch-in.",
		onStart(source) {
			if (source.species.id === 'groudon' && source.item === 'redorb') return;
			this.field.setWeather('nighttime');
		},
		flags: {},
		name: "Blackout",
		rating: 4,
		num: 7066,
	},
		ancientspirit: {
	 shortDesc: "This Pokémon's Ancient Gauge fills in faster. Currently has no effect.",
		flags: {},
		name: "Ancient Spirit",
		rating: 3.5,
		num: 22530,
	},
	defendant: {
			 shortDesc: "Boosts this Pokémon's Defence and Special Defence by 25% after it loses its item.",
		onAfterUseItem(item, pokemon) {
			if (pokemon !== this.effectState.target) return;
			pokemon.addVolatile('defendant');
		},
		onTakeItem(item, pokemon) {
			pokemon.addVolatile('defendant');
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('defendant');
		},
		condition: {
			onModifyDef(spe, pokemon) {
				if (!pokemon.item && !pokemon.ignoringAbility()) {
					return this.chainModify(1.25);
				}
			},
						onModifySpD(spe, pokemon) {
				if (!pokemon.item && !pokemon.ignoringAbility()) {
					return this.chainModify(1.25);
				}
			},
		},
		flags: {},
		name: "Defendant",
		rating: 3.5,
		num: 8444,
	},
		gesundheit: {
			shortDesc: "On switch in, this Pokémon sets up Pollen Season. Bless you!",
		onStart(source) {
			this.field.setWeather('pollenseason');
		},
		flags: {},
		name: "Gesundheit",
		rating: 4,
		num: 720,
	},
	gildedrush: {
		onDamagingHitOrder: 1,
		shortDesc: "Upon fainting, this Pokémon confuses all enemies.",
		onDamagingHit(damage, target, source, move) {
			if (!target.hp && this.checkMoveMakesContact(move, source, target, true)) {
			source.trySetStatus('confusion', target);
			}
		},
		flags: {},
		name: "Gilded Rush",
		rating: 2,
		num: 1206,
	},
		honeygather: {
		flags: {},
	   shortDesc: "Allows this Pokémon to use the effects of Honey.",
		name: "Honey Gather",
		rating: 0,
		num: 118,
	},
	balancer: {
 shortDesc: "Currently not functional.",
		flags: {},
		name: "Balancer",
		rating: 2,
		num: 4219,
	},
}
