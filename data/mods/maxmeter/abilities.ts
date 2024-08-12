export const Abilities: {[k: string]: ModdedAbilityData} = {
	liquidvoice: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.flags['sound']) { // removed dynamax hardcode
				move.type = 'Water';
			}
		},
		flags: {},
		name: "Liquid Voice",
		rating: 1.5,
		num: 204,
	},
	wanderingspirit: {
		onDamagingHit(damage, target, source, move) {
			if (source.getAbility().flags['failskillswap']) return;
			if (this.checkMoveMakesContact(move, source, target)) {
				const targetCanBeSet = this.runEvent('SetAbility', target, source, this.effect, source.ability);
				if (!targetCanBeSet) return targetCanBeSet;
				const sourceAbility = source.setAbility('wanderingspirit', target);
				if (!sourceAbility) return;
				if (target.isAlly(source)) {
					this.add('-activate', target, 'Skill Swap', '', '', '[of] ' + source);
				} else {
					this.add('-activate', target, 'ability: Wandering Spirit', this.dex.abilities.get(sourceAbility).name, 'Wandering Spirit', '[of] ' + source);
				}
				target.setAbility(sourceAbility);
			}
		},
		flags: {},
		name: "Wandering Spirit",
		rating: 2.5,
		num: 254,
	},

// hard-coding the priority boost for luxray's flux tail
	guts: {
		inherit: true,
		onModifyPriority(priority, pokemon, target, move) {
			if ((move?.id === 'supermove') && (pokemon.species.num === 403 || pokemon.species.num === 404 || pokemon.species.num === 405)) return priority + 3;
		},
	},
	rivalry: {
		shortDesc: "This Pokemon's attacks do 1.25x on same gender targets.",
		onBasePowerPriority: 24,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.gender && defender.gender) {
				if (attacker.gender === defender.gender) {
					this.debug('Rivalry boost');
					return this.chainModify(1.25);
				}
			}
		},
		onModifyPriority(priority, pokemon, target, move) {
			if ((move?.id === 'supermove') && (pokemon.species.num === 403 || pokemon.species.num === 404 || pokemon.species.num === 405)) return priority + 3;
		},
		flags: {},
		name: "Rivalry",
		rating: 0,
		num: 79,
	},
	intimidate: {
		inherit: true,
		onModifyPriority(priority, pokemon, target, move) {
			if ((move?.id === 'supermove') && (pokemon.species.num === 403 || pokemon.species.num === 404 || pokemon.species.num === 405)) return priority + 3;
		},
	},
};
