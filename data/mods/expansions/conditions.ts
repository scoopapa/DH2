export const Conditions: {[k: string]: ModdedConditionData} = {
	othertrace: {
		desc: "On switch-in, this Pokemon copies a random adjacent opposing Pokemon's Ability. If there is no Ability that can be copied at that time, this Ability will activate as soon as an Ability can be copied. Abilities that cannot be copied are Flower Gift, Forecast, Illusion, Imposter, Multitype, Stance Change, Trace, and Zen Mode.",
		shortDesc: "On switch-in, or when it can, this Pokemon copies a random adjacent foe's Ability.",
		onUpdate(pokemon) {
			let possibleInnates: string[] = [];
			let possibleTargets: Pokemon[] = [];
			for (const target of pokemon.side.foe.active) {
				if (target && !target.fainted) {
					possibleInnates = possibleInnates.concat(target.m.innates);
					possibleTargets = possibleTargets.concat((target.m.innates as string[]).map(innate => target));
				}
			}
			while (possibleInnates.length) {
				let rand = 0;
				if (possibleInnates.length > 1) rand = this.random(possibleInnates.length);
				const innate = possibleInnates[rand];
				const bannedAbilities = ['comatose', 'flowergift', 'forecast', 'illusion', 'imposter', 'multitype', 'schooling', 'stancechange', 'trace', 'zenmode'];
				if (bannedAbilities.includes(innate)) {
					possibleInnates.splice(rand, 1);
					possibleTargets.splice(rand, 1);
					continue;
				}
				this.add('-ability', pokemon, innate, '[from] ability: Trace', '[of] ' + possibleTargets[rand]);
				pokemon.removeVolatile("othertrace", pokemon);
				pokemon.addVolatile("other" + innate, pokemon);
				return;
			}
		},
		name: "Trace",
		/// rating: 3,
		/// num: 36,
		noCopy: true,
		effectType: "Ability",
		fullname: "ability: Trace",
	},
};
