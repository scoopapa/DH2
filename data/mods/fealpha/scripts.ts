export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init(){
		for (const id in this.dataCache.Pokedex) {//check the dex for fusions
			const fusionEntry = this.dataCache.Pokedex[id];
			if (fusionEntry.fusion) {//if the pokedex entry has a fusion field, it's a fusion
				const learnsetFusionList = [];//list of pokemon whose learnsets need to be fused
				for (let name of fusionEntry.fusion) {
					let prevo = true;
					while (prevo) {//make sure prevos of both fused pokemon are added to the list
						learnsetFusionList.push(name);
						const dexEntry = this.dataCache.Pokedex[this.toID(name)];
						if (dexEntry.prevo) name = dexEntry.prevo;
						else prevo = false;
					}
				}
				if (!this.dataCache.Learnsets[id]) this.dataCache.Learnsets[id] = { learnset: {}};//create a blank learnset entry so we don't need a learnsets file
				for (let name of learnsetFusionList) {
					
					const learnset = this.dataCache.Learnsets[this.toID(name)].learnset;//get the learnset of each pokemon in the list
					for (const moveid in learnset) {
						this.modData('Learnsets', id).learnset[moveid] = ['8L1'];//all moves are compatible with the fusion's only ability, so just set it to 8L1
					}
				}
			}
		}
	},
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