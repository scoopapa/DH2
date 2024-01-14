export const Conditions: {[k: string]: ConditionData} = {
	par: {
		inherit: true,
		onStart(target, source, sourceEffect) {
			if (!sourceEffect) {
				this.add('-status', target, 'par');
			} else if (sourceEffect.id === 'thunderorb') {
				//TODO: Make the anim and message play concurrently?
				this.add('-status', target, 'par', '[from] item: Thunder Orb', '[silent]');
				this.add('-message', `${target.name} was paralyzed by the Thunder Orb!`);
			} else if (sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'par', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'par');
			}
		},
		onBeforeMovePriority: 1,
		onBeforeMove(pokemon) {
			if (this.randomChance(1, 4) && !(pokemon.hasAbility('quickfeet') && pokemon.hasItem('thunderorb'))) {
				this.add('cant', pokemon, 'par');
				return false;
			}
		},
	},
};
