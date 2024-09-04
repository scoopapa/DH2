export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	aurumaura: {
		name: 'Aurum Aura',
		noCopy: true,
		onStart(pokemon) {
      	this.add('-start', pokemon, 'Aurum Aura');
				this.add('-message', `${pokemon.name}'s glistening aura changes its attacks' categories to what they were in the past!`);
      // Aurum Aura abils here later
		},
		onModifyMovePriority: 8,
		onModifyMove(move, pokemon) {
			if (move.category === "Status") return;
			if (['Fire', 'Water', 'Grass', 'Electric', 'Dark', 'Psychic', 'Dragon', 'Fairy'].includes(move.type)) {
				move.category = "Special";
			} else {
				move.category = "Physical";
			}
		},
		onBeforeSwitchOutPriority: -1,
		onBeforeSwitchOut(pokemon) {
			this.actions.useMove("Aurum Aura Used", pokemon, pokemon);
		},
	},
	frz: {
		name: 'frz',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'frz');
			}
			if (target.species.name === 'Shaymin-Sky' && target.baseSpecies.baseSpecies === 'Shaymin') {
				target.formeChange('Shaymin', this.effect, true);
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			if (this.randomChance(1, 10)) {
				pokemon.cureStatus();
				return;
			}
			this.damage(pokemon.baseMaxhp / 8);
		},
		onSourceModifyDamage(damage, source, target, move) {
			this.debug('Freeze extra damage');
			return this.chainModify([5325, 4096]);
		},
		onModifyMove(move, pokemon) {
			if (move.flags['defrost']) {
				this.add('-curestatus', pokemon, 'frz', '[from] move: ' + move);
				pokemon.clearStatus();
			}
		},
		onAfterMoveSecondary(target, source, move) {
			if (move.thawsTarget) {
				target.cureStatus();
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Fire' && move.category !== 'Status') {
				target.cureStatus();
			}
		},
	},
};
