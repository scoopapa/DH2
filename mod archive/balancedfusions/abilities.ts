export const Abilities: {[k: string]: ModdedAbilityData} = {
	trace: {
		inherit: true,
		onUpdate(pokemon) {
			if (!pokemon.isStarted) return;
			const isAbility = pokemon.ability === 'trace';
			let possibleAbilities: string[] = [];
			let possibleTargets: Pokemon[] = [];
			for (const target of pokemon.side.foe.active) {
				if (target && !target.fainted) {
					if (isAbility) {
						possibleAbilities.push(target.ability);
						possibleTargets.push(target);
					} else if (target.m.innates) {
						possibleAbilities = possibleAbilities.concat(target.m.innates);
						possibleTargets = possibleTargets.concat(target.m.innates.map(() => target));
					}
				}
			}
			while (possibleAbilities.length) {
				let rand = 0;
				if (possibleAbilities.length > 1) rand = this.random(possibleAbilities.length);
				const ability = possibleAbilities[rand];
				const bannedAbilities = ['battlebond', 'comatose', 'disguise', 'flowergift', 'forecast', 'illusion', 'imposter', 'multitype', 'neutralizinggas', 'powerconstruct', 'powerofalchemy', 'receiver', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange', 'trace', 'zenmode'];
				if (bannedAbilities.includes(ability)) {
					possibleAbilities.splice(rand, 1);
					possibleTargets.splice(rand, 1);
					continue;
				}
				this.add('-ability', pokemon, ability, '[from] ability: Trace', '[of] ' + possibleTargets[rand]);
				if (isAbility) {
					pokemon.setAbility(ability);
				} else {
					pokemon.removeVolatile("ability:trace", pokemon);
					pokemon.addVolatile("ability:" + ability, pokemon);
				}
				return;
			}
		},
	},
};
