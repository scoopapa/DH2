export const Abilities: {[abilityid: string]: AbilityData} = {
	chillingsqueal: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: length}, source);
			}
		},
		name: "Chilling Squeal",
		shortDesc: "This Pokemon's Attack is raised by 1 stage if it attacks and KOes another Pokemon.",
		rating: 3,
		num: -1,
	},
};