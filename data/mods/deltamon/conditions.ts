export const Conditions: { [k: string]: ModdedConditionData; } = {
	amalgam: {
		onAnyFaint(target) {
				const ability = target.getAbility();
				if(ability.flags['noreceiver'] || ability.flags['notrace'] || ability.id === 'noability') return;
				this.effectState.target.setAbility(ability, target);
			}
	},
};