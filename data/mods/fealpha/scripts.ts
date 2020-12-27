export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	hitStepStealBoosts(targets, pokemon, move) {
		const target = targets[0]; // hardcoded
		if (move.stealsBoosts) {
			const boosts: SparseBoostsTable = {};
			let stolen = false;
			let statName: BoostName;
			for (statName in target.boosts) {
				const stage = target.boosts[statName];
				if (stage > 0) {
					boosts[statName] = stage;
					stolen = true;
				}
			}
			if (stolen) {
				this.attrLastMove('[still]');
				this.add('-clearpositiveboost', target, pokemon, 'move: ' + move.name);
				this.boost(boosts, pokemon, pokemon);

				let statName2: BoostName;
				for (statName2 in boosts) {
					boosts[statName2] = 0;
				}
				target.setBoost(boosts);
				this.addMove('-anim', pokemon, "Spectral Thief", target);
			}
		}
		// this DEFINITELY should fucking not have worked first try. I am so mad. 
		if (pokemon.ability === 'faustianpact' && move.flags['contact']) {
			let swapped = false; 
			const targetAbility = target.getAbility();
			const additionalBannedAbilities = ['hungerswitch', 'illusion', 'neutralizinggas', 'wonderguard'];
			if (!targetAbility.isPermanent || !additionalBannedAbilities.includes(targetAbility) || !pokemon.volatiles['dynamax']) {
				swapped = true; 
			} 
			if (swapped) {
				this.attrLastMove('[still]'); //Will it work without this line...?
				target.setAbility('faustianpact', pokemon);
				pokemon.setAbility(targetAbility);
				this.add('-activate', pokemon, 'ability: Faustian Pact');
				this.add('-activate', pokemon, 'Skill Swap', '', '', '[of] ' + target);
				this.add('-activate', pokemon, 'ability: ' + targetAbility.name);
				this.add('-activate', target, 'ability: Faustian Pact');
				this.addMove('-anim', pokemon, move.name, target);
			}
			
		}
		return undefined;
	},
};