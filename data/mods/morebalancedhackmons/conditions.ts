export const Conditions: {[k: string]: ModdedConditionData} = {
	deltastream: {
		inherit: true,
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.type === 'Flying') {
				this.debug('Delta Stream flying boost');
				return this.chainModify([5325, 4096]);
			}
		},
	},
	desolateland: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (move.type === 'Water' && move.category !== 'Status') {
				if (attacker.hasAbility('waterbubble')) return;
				this.debug('Desolate Land water suppress');
				this.add('-fail', attacker, move, '[from] Desolate Land');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'frz') return false;
		},
	},
	primordialsea: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (move.type === 'Fire' && move.category !== 'Status') {
				this.debug('Primordial Sea fire suppress');
				this.add('-fail', attacker, move, '[from] Primordial Sea');
				this.attrLastMove('[still]');
				return null;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (attacker.hasAbility('waterbubble')) return;
			if (move.type === 'Water') {
				this.debug('Rain water boost');
				return this.chainModify(1.5);
			}
		},
	},
	raindance: {
		inherit: true,
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.type === 'Water') {
				if (attacker.hasAbility('waterbubble')) return;
				this.debug('rain water boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Fire') {
				this.debug('rain fire suppress');
				return this.chainModify(0.5);
			}
		},
	},
	sunnyday: {
		inherit: true,
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.id === 'hydrosteam') {
				this.debug('Sunny Day Hydro Steam boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Water') {
				if (attacker.hasAbility('waterbubble')) return;
				this.debug('Sunny Day water suppress');
				return this.chainModify(0.5);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'frz') return false;
		},
	},
};
