export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
  	nighttime: {
		name: 'Nighttime',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('blackrock')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.id === 'fireworkblazer' && !attacker.hasItem('utilityumbrella')) {
				this.debug('Nighttime Firework Blazer boost');
				return this.chainModify(2);
			}
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Dark') {
				this.debug('Nighttime dark boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Light') {
				this.debug('Nighttime Light suppress');
				return this.chainModify(0.5);
			}
		},
		onFieldStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Nighttime', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Nighttime');
			}
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
onFoeTryMove(target, source, move) {
if (pokemon.hasType('Dark')) {
			const targetAllExceptions = ['perishsong', 'flowershield', 'rototiller'];
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}

			const dazzlingHolder = this.effectState.target;
			if ((source.isAlly(dazzlingHolder) || move.target === 'all') && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('cant', dazzlingHolder, 'ability: Queenly Majesty', move, '[of] ' + target);
				return false;
}
			}
		},

	},
}
