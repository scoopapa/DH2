export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	par: {
		name: 'par',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'par', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'par');
			}
		},
		onModifySpePriority: -101,
		onModifySpe(spe, pokemon) {
			// Paralysis occurs after all other Speed modifiers, so evaluate all modifiers up to this point first
			spe = this.finalModify(spe);
			if (!pokemon.hasAbility('quickfeet')) {
				spe = Math.floor(spe * 25 / 100);
			}
			return spe;
		},
		onAccuracy(accuracy, target, source, move) {
			return true;
		},
		onModifyCritRatio(relayVar, source, target, move) {
			return relayVar * 3;
		},
	},
	frz: {
		inherit: true,
		onModifySpA(relayVar, source, target, move) {
			return this.chainModify(0.5);
		},
		onBeforeMove: undefined, // no inherit
	}
};
