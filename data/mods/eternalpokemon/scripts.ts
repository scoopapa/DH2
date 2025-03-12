export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ["Banned", "FE", "NFE", "LC"],
	},
	init() {		
		for (const id in this.dataCache.Pokedex) {
			const newMon = this.dataCache.Pokedex[id];
			if (!newMon || !newMon.copyData) continue; // weeding out Pokémon that aren't new
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
						currentGen = parseInt(learnset[moveid][method][0])
						if (currentGen > latestGen) latestGen = currentGen;
					}
				}
				
				for (const moveid in learnset) { // filter only to allow moves from the latest gen
					this.modData('Learnsets', id).learnset[moveid] = learnset[moveid].filter(
						(method) => parseInt(method[0]) == latestGen
					);
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
	battle: {
		getMoveAccuracy(move: Move, value: ModifiableValue, target?: Pokemon) {
			console.log("getMoveAccuracy called") // debug
			console.log(move.name) // debug

			value.reset(move.accuracy === true ? 0 : move.accuracy, true);

			let pokemon = value.pokemon!;
			// Sure-hit accuracy
			if (move.id === 'toxic' && this.battle.gen >= 6 && this.pokemonHasType(pokemon, 'Poison')) {
				value.set(0, "Poison type");
				return value;
			}
			if (move.id === 'blizzard' && this.battle.gen >= 4) {
				value.weatherModify(0, 'Hail');
				value.weatherModify(0, 'Snow');
			}
			if (['hurricane', 'thunder', 'bleakwindstorm', 'wildboltstorm', 'sandsearstorm'].includes(move.id)) {
				value.weatherModify(0, 'Rain Dance');
				value.weatherModify(0, 'Primordial Sea');
			}
			value.abilityModify(0, 'No Guard');
			if (!value.value) return value;

			// OHKO moves don't use standard accuracy / evasion modifiers
			if (move.ohko) {
				if (this.battle.gen === 1) {
					value.set(value.value, `fails if target's Speed is higher`);
					return value;
				}
				if (move.id === 'sheercold' && this.battle.gen >= 7 && !this.pokemonHasType(pokemon, 'Ice')) {
					value.set(20, 'not Ice-type');
				}
				if (target) {
					if (pokemon.level < target.level) {
						value.reset(0);
						value.set(0, "FAILS: target's level is higher");
					} else if (pokemon.level > target.level) {
						value.set(value.value + pokemon.level - target.level, "+1% per level above target");
					}
				} else {
					if (pokemon.level < 100) value.set(value.value, "fails if target's level is higher");
					if (pokemon.level > 1) value.set(value.value, "+1% per level above target");
				}
				return value;
			}

			// Eternal Eevee's Continuous steps
			if (move.name == "Continuous Steps") {
				return move.accuracy;
			}

			// Accuracy modifiers start

			let accuracyModifiers = [];
			if (this.battle.hasPseudoWeather('Gravity')) {
				accuracyModifiers.push(6840);
				value.modify(5 / 3, "Gravity");
			}

			for (const active of pokemon.side.active) {
				if (!active || active.fainted) continue;
				const ability = this.getAllyAbility(active);
				if (ability === 'Victory Star') {
					accuracyModifiers.push(4506);
					value.modify(1.1, "Victory Star");
				}
			}

			if (value.tryAbility('Hustle') && move.category === 'Physical') {
				accuracyModifiers.push(3277);
				value.abilityModify(0.8, "Hustle");
			} else if (value.tryAbility('Compound Eyes')) {
				accuracyModifiers.push(5325);
				value.abilityModify(1.3, "Compound Eyes");
			}

			if (value.tryItem('Wide Lens')) {
				accuracyModifiers.push(4505);
				value.itemModify(1.1, "Wide Lens");
			}

			// Chaining modifiers
			let chain = 4096;
			for (const mod of accuracyModifiers) {
				if (mod !== 4096) {
					chain = (chain * mod + 2048) >> 12;
				}
			}

			// Applying modifiers
			value.set(move.accuracy as number);

			if (move.id === 'hurricane' || move.id === 'thunder') {
				if (value.tryWeather('Sunny Day')) value.set(50, 'Sunny Day');
				if (value.tryWeather('Desolate Land')) value.set(50, 'Desolate Land');
			}

			// Chained modifiers round down on 0.5
			let accuracyAfterChain = (value.value * chain) / 4096;
			accuracyAfterChain = accuracyAfterChain % 1 > 0.5 ? Math.ceil(accuracyAfterChain) : Math.floor(accuracyAfterChain);
			value.set(accuracyAfterChain);

			// Unlike for Atk, Def, etc. accuracy and evasion boosts are applied after modifiers
			if (pokemon?.boosts.accuracy) {
				if (pokemon.boosts.accuracy > 0) {
					value.set(Math.floor(value.value * (pokemon.boosts.accuracy + 3) / 3));
				} else {
					value.set(Math.floor(value.value * 3 / (3 - pokemon.boosts.accuracy)));
				}
			}

			// 1/256 glitch
			if (this.battle.gen === 1 && !toID(this.battle.tier).includes('stadium')) {
				value.set((Math.floor(value.value * 255 / 100) / 256) * 100);
			}
			return value;
		}
	}
};
