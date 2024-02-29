export const Conditions: {[k: string]: ConditionData} = {
	psychicgem: {
		name: 'psychicgem',
		duration: 1,
		affectsFainted: true,
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target) return;
      this.add('-message', `${source.name}'s Hidden Gem activated!`);
      const targetType = source.types[1];
      this.add('-start', source, 'typeadd', 'Psychic', '[from] item: Psychic Gem');
      source.setAbility('goodasgold', source, true);
      this.add('-activate', source, 'ability: Good as Gold');
      this.boost({spa: 1, spd: 1, spe: 1}, source);
		},
	},
};
