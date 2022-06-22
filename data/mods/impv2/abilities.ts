export const Abilities: {[abilityid: string]: AbilityData} = {
	chillingsqueal: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: length}, source);
			}
		},
		name: "Chilling Squeal",
		rating: 3,
		num: -1,
	},
};