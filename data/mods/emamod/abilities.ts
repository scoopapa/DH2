export const Abilities: {[abilityid: string]: AbilityData} = {
	damp: {
		onAnyTryMove(target, source, effect) {
			if (['explosion', 'mindblown', 'mistyexplosion', 'selfdestruct', 'chloroblast'].includes(effect.id)) {
				this.attrLastMove('[still]');
				this.add('cant', this.effectData.target, 'ability: Damp', effect, '[of] ' + target);
				return false;
			}
		},
		inherit: true,
	},
};