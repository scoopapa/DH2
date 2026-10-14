export const Conditions: { [k: string]: ConditionData; } = {
	partiallytrapped: {
		name: 'partiallytrapped',
		duration: 5,
		durationCallback(target, source) {
			if (source?.hasItem('gripclaw')) return 8;
			return this.random(4, 6);
		},
		onResidual(pokemon) {
			const source = this.effectState.source;
			const hasBand = source.hasItem('bindingband');
			const hasSapTrap = source.hasAbility('saptrap');

			let divisor = 8;
			if (hasBand && hasSapTrap) {
				divisor = 4;
			} else if (hasBand || hasSapTrap) {
				divisor = 6;
			}

			this.damage(pokemon.baseMaxhp / divisor);
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, this.effectState.sourceEffect, '[partiallytrapped]', '[silent]');
		},
	},
	thornberries: {
		name: 'thornberries',
		onStart(target) {
			this.add('-start', target, 'Thorn Berries');
		},
		onResidualOrder: 8,
		onResidual(pokemon) {
			const target = this.effectState.source;
			if (!target || target.fainted || target.hp <= 0) return;

			const damageAmount = this.clampIntRange(Math.floor(pokemon.baseMaxhp / 8), 1);
			const damage = this.damage(damageAmount, pokemon, target);
			if (damage) {
				this.heal(damage, target, pokemon);
			}
		},
		onEnd(target) {
			this.add('-end', target, 'Thorn Berries', '[silent]');
		},
	},
}