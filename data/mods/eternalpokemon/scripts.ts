export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ["Banned", "WIP", "FE", "1x NFE", "2x NFE"],
	},
	init() {		
		for (const id in this.dataCache.Pokedex) {
			const newMon = this.dataCache.Pokedex[id];
			if (!newMon) continue;

			if (id == "floette") { // handles floette first to submit a learnset for eternal floette
				// otherwise floette's learnset gets modified before eternal floette accessess it

				const learnset = this.dataCache.Learnsets[id].learnset;
				const latestGen = 9;
				
				for (const moveid in learnset) { // filter only to allow moves from the latest gen
					this.modData('Learnsets', "floetteeternal").learnset[moveid] = learnset[moveid].filter(
						(method) => parseInt(method[0]) == latestGen && method[1] != "V"
					);
				}

				this.modData('Learnsets', "floetteeternal").learnset["lightofruin"] = ["9L50"];

				// no continue; to handle base floette's learnset
			}

			if (id == "floetteeternal") continue;

			if (!newMon.copyData) {
				// latest gen learnset for all pokemon, not just eternal pokémon
				// console.log(newMon.name);
				// console.log(this.dataCache.Learnsets[id]);
				if (!this.dataCache.Learnsets[id] || !this.dataCache.Learnsets[id].learnset) continue;

				const learnset = this.dataCache.Learnsets[id].learnset;

				let currentGen, latestGen = 0;
				for (const moveid in learnset) { // determine what the latest gen is for this pokémon
					for (const method in learnset[moveid]) {
						// only looks at non-virtual console moves
						if (learnset[moveid][method][1] != "V") {
							currentGen = parseInt(learnset[moveid][method][0])
							if (currentGen > latestGen) latestGen = currentGen;
						}
					}
				}
				
				for (const moveid in learnset) { // filter only to allow moves from the latest gen
					this.modData('Learnsets', id).learnset[moveid] = learnset[moveid].filter(
						(method) => parseInt(method[0]) == latestGen && method[1] != "V"
					);
				}

				continue;
			}
			// only new pokémon

			const copyData = this.dataCache.Pokedex[this.toID(newMon.copyData)];

			if (!newMon.types && copyData.types) newMon.types = copyData.types;
			if (!newMon.baseStats && copyData.baseStats) newMon.baseStats = copyData.baseStats;
			if (!newMon.abilities && copyData.abilities) newMon.abilities = copyData.abilities;
			if (!newMon.num && copyData.num) newMon.num = copyData.num; // no longer inverting the original's dex number
			if (!newMon.genderRatio && copyData.genderRatio) newMon.genderRatio = copyData.genderRatio;
			if (!newMon.heightm && copyData.heightm) newMon.heightm = copyData.heightm;
			if (!newMon.weightkg && copyData.weightkg) newMon.weightkg = copyData.weightkg;
			if (!newMon.color && copyData.color) newMon.color = copyData.color;
			if (!newMon.eggGroups && copyData.eggGroups) newMon.eggGroups = copyData.eggGroups;

			let copyMoves = newMon.copyData;
			if (newMon.copyMoves) copyMoves = newMon.copyMoves;
			if (copyMoves) {
				if (!this.dataCache.Learnsets[id]) this.dataCache.Learnsets[id] = {learnset: {}}; // create a blank learnset entry so we don't need a learnsets file (thank you ink)
				const learnset = this.dataCache.Learnsets[this.toID(copyMoves)].learnset;

				let currentGen, latestGen = 0;
				for (const moveid in learnset) { // determine what the latest gen is for this pokémon
					for (const method in learnset[moveid]) {
						// only looks at non-virtual console moves
						if (learnset[moveid][method][1] != "V") {
							currentGen = parseInt(learnset[moveid][method][0])
							if (currentGen > latestGen) latestGen = currentGen;
						}
					}
				}
				
				for (const moveid in learnset) { // filter only to allow moves from the latest gen
					this.modData('Learnsets', id).learnset[moveid] = learnset[moveid].filter(
						(method) => parseInt(method[0]) == latestGen
					);
				}

				// adds prevo moves
				// only necessary to check one stage cus an eternal pokemon's base forme can only have 1 prevo
				if (copyData.prevo) {
					const prevoLearnset = this.dataCache.Learnsets[this.toID(copyData.prevo.toLowerCase())].learnset;
					for (const moveid in prevoLearnset) { // filter only to allow moves from the latest gen
						this.modData('Learnsets', id).learnset[moveid] = prevoLearnset[moveid].filter(
							(method) => parseInt(method[0]) == latestGen && method[1] != "V"
						);
					}
				}

				if (newMon.movepoolAdditions) {
					for (const move of newMon.movepoolAdditions) {
						this.modData('Learnsets', this.toID(id)).learnset[this.toID(move)] = ["9L50"];
					}
				}
			}
		}
	},

	// modifies getMoveAccuracy to account for Eternal Eevee's Continuous Steps
	// Gets the current accuracy for a move.
	// todo: not working
	actions: {
		hitStepAccuracy(targets: Pokemon[], pokemon: Pokemon, move: ActiveMove) {
			const hitResults = [];
			for (const [i, target] of targets.entries()) {
				this.battle.activeTarget = target;
				// calculate true accuracy
				let accuracy = move.accuracy;
				if (move.ohko) { // bypasses accuracy modifiers
					if (!target.isSemiInvulnerable()) {
						accuracy = 30;
						if (move.ohko === 'Ice' && this.battle.gen >= 7 && !pokemon.hasType('Ice')) {
							accuracy = 20;
						}
						if (!target.volatiles['dynamax'] && pokemon.level >= target.level &&
							(move.ohko === true || !target.hasType(move.ohko))) {
							accuracy += (pokemon.level - target.level);
						} else {
							this.battle.add('-immune', target, '[ohko]');
							hitResults[i] = false;
							continue;
						}
					}
				} else if (move.name == "Continuous Steps") // implementing Continuous Steps
					accuracy = move.accuracy;
				else {
					accuracy = this.battle.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
					if (accuracy !== true) {
						let boost = 0;
						if (!move.ignoreAccuracy) {
							const boosts = this.battle.runEvent('ModifyBoost', pokemon, null, null, {...pokemon.boosts});
							boost = this.battle.clampIntRange(boosts['accuracy'], -6, 6);
						}
						if (!move.ignoreEvasion) {
							const boosts = this.battle.runEvent('ModifyBoost', target, null, null, {...target.boosts});
							boost = this.battle.clampIntRange(boost - boosts['evasion'], -6, 6);
						}
						if (boost > 0) {
							accuracy = this.battle.trunc(accuracy * (3 + boost) / 3);
						} else if (boost < 0) {
							accuracy = this.battle.trunc(accuracy * 3 / (3 - boost));
						}
					}
				}
				if (move.alwaysHit || (move.id === 'toxic' && this.battle.gen >= 8 && pokemon.hasType('Poison')) ||
						(move.target === 'self' && move.category === 'Status' && !target.isSemiInvulnerable())) {
					accuracy = true; // bypasses ohko accuracy modifiers
				} else {
					accuracy = this.battle.runEvent('Accuracy', target, pokemon, move, accuracy);
				}
				if (accuracy !== true && !this.battle.randomChance(accuracy, 100)) {
					if (move.smartTarget) {
						move.smartTarget = false;
					} else {
						if (!move.spreadHit) this.battle.attrLastMove('[miss]');
						this.battle.add('-miss', pokemon, target);
					}
					if (!move.ohko && pokemon.hasItem('blunderpolicy') && pokemon.useItem()) {
						this.battle.boost({spe: 2}, pokemon);
					}
					hitResults[i] = false;
					continue;
				}
				hitResults[i] = true;
			}
			return hitResults;
		}
	}
};
