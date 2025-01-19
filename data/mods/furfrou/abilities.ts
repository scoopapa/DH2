export const Abilities: { [abilityid: string]: ModdedAbilityData } = {
	snowwarning: {
		inherit: true,
		onStart(source) {
			this.field.setWeather('hail');
		},
		shortDesc: "On switch-in, this Pokemon summons Hail.",
	},
	flicker: {
		onStart(pokemon) {
			if (pokemon.outFlickered) return;
			pokemon.addVolatile('flicker');
		},
		onModifyAccuracy(accuracy, target, source, move) {
			if (target?.volatiles['flicker'] && typeof accuracy === 'number') {
				this.debug('Flicker - setting accuracy to 0');
				return 0;
			}
		},
		onEnd(pokemon) {
			if (pokemon?.volatiles['flicker']) {
				delete pokemon.volatiles['flicker'];
				this.add('-end', pokemon, 'Flicker', '[silent]');
			}
		},
		condition: {
			duration: 1,
			onResidualOrder: 28,
			onResidualSubOrder: 2,
			onStart(target) {
				this.add('-start', target, 'ability: Flicker');
			},
			onTryHit(target, source, move) {
				if (target !== source) {
					target.flickered = true;
					target.addVolatile('charge');
				}
			},
			onEnd(target) {
				if (target.flickered) { 
					this.add('-end', target, 'Flicker');
				} else {
					this.add('-message', `${target.name} is wearing itself out!`);
					target.outFlickered = true;
					this.add('-end', target, 'Flicker');
				}
			},
		},
		flags: {},
		name: "Flicker",
		shortDesc: "First active turn: dodge any incoming move. If no dodge: ability will never activate again.",
	},
	enviousaura: {
		onModifyDamage(damage, source, target, move) {
			if (target.positiveBoosts > 0) {
				return this.chainModify(1.5);
			}
		}, //unaware bit coded separately
		flags: {},
		name: "Envious Aura",
		rating: 2.5,
		num: 233,
	},
	unaware: {
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectState.target;
			if (unawareUser === pokemon) return;
			if (unawareUser === this.activePokemon && pokemon === this.activeTarget) {
				if (pokemon.hasAbility('Envious Aura')) return;
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (pokemon === this.activePokemon && unawareUser === this.activeTarget) {
				if (pokemon.hasAbility('Envious Aura')) return;
				boosts['atk'] = 0;
				boosts['def'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		flags: {breakable: 1},
		name: "Unaware",
		rating: 4,
		num: 109,
	},
};
