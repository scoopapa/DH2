export const Conditions: {[k: string]: ConditionData} = {
	frz: {
		name: 'frz',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Move' && sourceEffect.id === 'bittermalice') {
				this.add('-status', target, 'frz');
				this.hint(`${this.effectState.target.name} is frostbitten! It can still use moves, but its special moves will be half as strong.`);
				this.hint(`Like a burn, frostbite will damage the afflicted Pokémon at the end of each turn.`);
				this.effectState.frostbite = true;
			}
			else if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'frz');
			}
			if (target.species.name === 'Shaymin-Sky' && target.baseSpecies.baseSpecies === 'Shaymin') {
				target.formeChange('Shaymin', this.effect, true);
			}
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			if (move.flags['defrost'] || this.effectState.frostbite) return;
			if (this.randomChance(1, 5)) {
				pokemon.cureStatus();
				return;
			}
			this.add('cant', pokemon, 'frz');
			return false;
		},
		onModifyMove(move, pokemon) {
			if (move.flags['defrost']) {
				this.add('-curestatus', pokemon, 'frz', '[from] move: ' + move);
				pokemon.setStatus('');
			}
		},
		onHit(target, source, move) {
			if (move.thawsTarget || move.type === 'Fire' && move.category !== 'Status') {
				target.cureStatus();
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			if (!this.effectState.frostbite) return;
			this.hint(`${this.effectState.target.name} is afflicted with frostbite!`);
			this.damage(pokemon.baseMaxhp / 16);
		},
	},
};
