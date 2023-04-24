export const Conditions: {[k: string]: ConditionData} = {
	diamonddust: {
		name: 'Diamond Dust',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('icyrock')) {
				return 8;
			}
			return 5;
		},
		onStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectData.duration = 0;
				this.add('-ability', source, 'Diamond Dust');
				this.add('-weather', 'Diamond Dust', '[silent]');
				this.add('-message', `A cloud of diamond dust blew in!`);
				this.add('-message', "All Rock-type damage, including Stealth Rock, will be nullified.");
				this.add('-message', "Other weather-related moves and Abilities will behave as they do in hail.");
			} else {
				this.add('-weather', 'Diamond Dust', '[silent]');
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect && effect.id === 'stealthrock') {
				this.add('-message', `${target.name} was protected from Stealth Rock by the diamond dust!`);
				return false;
			}
		},
		onTryHit(target, source, move) {
			if (move.type === 'Rock') {
				this.add('-message', `${target.name} was protected from ${move.name} by the diamond dust!`);
				this.add('-immune', target);
				return null;
			}
		},
		onResidual() {
			this.add('-weather', 'Diamond Dust', '[upkeep]');
			this.add('-message', `The air is sparkling with diamond dust!`);
		},
		onEnd() {
			this.add('-weather', 'none', '[silent]');
			this.add('-message', `The cloud of diamond dust blew away!`);
		},
	},
};
