export const Scripts: {[k: string]: ModdedBattleScriptsData} = {

	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['Paleomons', 'Paleomons NFE', 'Paleomons LC'],
		customDoublesTiers: ['Paleomons', 'Paleomons NFE', 'Paleomons LC'],
	},

	pokemon: {
		runEffectiveness(move: ActiveMove) {
			let totalTypeMod = 0;
			for (const type of this.getTypes()) {
				if (type === 'Fairy' && (move as any).carboniferousBoosted) {
					totalTypeMod += 1;
				} else {
					let typeMod = this.battle.dex.getEffectiveness(move, type);
					typeMod = this.battle.singleEvent('Effectiveness', move, null, this, type, move, typeMod);
					totalTypeMod += this.battle.runEvent('Effectiveness', this, type, move, typeMod);
				}
			}
			return totalTypeMod;
		},
	},

	hitStepAccuracy(targets, pokemon, move) {
		const hitResults = [];
		for (const [i, target] of targets.entries()) {
			this.activeTarget = target;
			// calculate true accuracy
			let accuracy = move.accuracy;
			if (move.ohko) { // bypasses accuracy modifiers
				if (!target.isSemiInvulnerable()) {
					accuracy = 30;
					if (move.ohko === 'Ice' && this.gen >= 7 && !pokemon.hasType('Ice')) {
						accuracy = 20;
					}
					if (!target.volatiles['dynamax'] && pokemon.level >= target.level &&
						(move.ohko === true || !target.hasType(move.ohko))) {
						accuracy += (pokemon.level - target.level);
					} else {
						this.add('-immune', target, '[ohko]');
						hitResults[i] = false;
						continue;
					}
				}
			} else {
				const boostTable = [1, 4 / 3, 5 / 3, 2, 7 / 3, 8 / 3, 3];

				let boosts;
				let boost!: number;
				if (accuracy !== true) {
					if (!move.ignoreAccuracy) {
						boosts = this.runEvent('ModifyBoost', pokemon, null, null, {...pokemon.boosts});
						boost = this.clampIntRange(boosts['accuracy'], -6, 6);
						if (boost > 0) {
							accuracy *= boostTable[boost];
						} else {
							accuracy /= boostTable[-boost];
						}
					}
					if (!move.ignoreEvasion) {
						boosts = this.runEvent('ModifyBoost', target, null, null, {...target.boosts});
						boost = this.clampIntRange(boosts['evasion'], -6, 6);
						if (boost > 0) {
							accuracy /= boostTable[boost];
						} else if (boost < 0) {
							accuracy *= boostTable[-boost];
						}
					}
				}
				accuracy = this.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
			}
			if (move.alwaysHit || (move.id === 'toxic' && this.gen >= 6 && pokemon.hasType('Poison'))) {
				accuracy = true; // bypasses ohko accuracy modifiers
			} else {
				accuracy = this.runEvent('Accuracy', target, pokemon, move, accuracy);
			}
			if (accuracy !== true && !this.randomChance(accuracy, 100)) {
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					if (!move.spreadHit) this.attrLastMove('[miss]');
					this.add('-miss', pokemon, target);
				}
				if (!move.ohko && pokemon.hasItem('blunderpolicy') && pokemon.useItem()) {
					this.boost({spe: 2}, pokemon);
				}
				if ((move as any).persistence) {
					this.boost({atk: 1}, pokemon);
				}
				hitResults[i] = false;
				continue;
			}
			hitResults[i] = true;
		}
		return hitResults;
	},
};