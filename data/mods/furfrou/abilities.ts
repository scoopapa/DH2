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
			if (target.positiveBoosts() > 0) {
				return this.chainModify(1.5);
			}
		},
		onAnyModifyBoost(boosts, pokemon) {
			const enviousUser = this.effectState.target;
			if (enviousUser === pokemon) return;
			if (enviousUser === this.activePokemon && pokemon === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
		},
		flags: {},
		name: "Envious Aura",
		shortDesc: "User gets a 1.5x power boost if the opponent has a positive boost. User ignores defensive stat boosts.",
		rating: 2.5,
		num: 233,
	},
};
