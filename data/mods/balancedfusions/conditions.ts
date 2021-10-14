export const Conditions: {[k: string]: ModdedConditionData} = {
	othertrace: {
		desc: "On switch-in, this Pokemon copies a random adjacent opposing Pokemon's Ability. If there is no Ability that can be copied at that time, this Ability will activate as soon as an Ability can be copied. Abilities that cannot be copied are Flower Gift, Forecast, Illusion, Imposter, Multitype, Stance Change, Trace, and Zen Mode.",
		shortDesc: "On switch-in, or when it can, this Pokemon copies a random adjacent foe's Ability.",
		onUpdate(pokemon) {
			if (!pokemon.isStarted || this.effectData.gaveUp) return;
			const possibleTargets = pokemon.side.foe.active.filter(foeActive => foeActive && this.isAdjacent(pokemon, foeActive));
			while (possibleTargets.length) {
				let rand = 0;
				if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
				const target = possibleTargets[rand];
				const bannedAbilities = ["comatose", "flowergift", "forecast", "illusion", "imposter", "multitype", "schooling", "stancechange", "trace", "zenmode"];
				if (bannedAbilities.includes(target.m.innate!)) {
					possibleTargets.splice(rand, 1);
					continue;
				}
				this.add('-ability', pokemon, target.m.innate, '[from] ability: Trace', '[of] ' + possibleTargets[rand]);
				pokemon.removeVolatile("othertrace", pokemon);
				pokemon.addVolatile("other" + target.m.innate, pokemon);
				return;
			}
		},
		name: "Trace",
		/// rating: 3,
		noCopy: true,
		effectType: "Ability",
		fullname: "ability: Trace",
	},
};
