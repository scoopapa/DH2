export const Scripts: {[k: string]: ModdedBattleScriptsData} = {

	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['Paleomons', 'Paleomons NFE', 'Paleomons LC'],
		customDoublesTiers: ['Paleomons', 'Paleomons NFE', 'Paleomons LC'],
	},

	canMegaEvo(pokemon) {
		const altForme = pokemon.baseSpecies.otherFormes && this.dex.getSpecies(pokemon.baseSpecies.otherFormes[0]);
		const item = pokemon.getItem();
		if (
			altForme?.isMega && altForme?.requiredMove &&
			pokemon.baseMoves.includes(this.toID(altForme.requiredMove)) && !item.zMove
		) {
			return altForme.name;
		}
		if (item.name === "Diancite" && pokemon.baseSpecies.name === "Diancie-Cataclysm") {
			return "Diancie-Cataclysm-Mega"; 
		}
		if (item.name === "Steelixite" && pokemon.baseSpecies.name === "Steelix-Crystal") {
			return "Steelix-Crystal-Mega"; 
		}
		
		return item.megaStone;
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

		// attempted bug fix for Persistence. currently not in use, but i'll come back to this later
		/*
				/ false = immune, true = not immune 
		runImmunity(type: string, message?: string | boolean) {
			if (!type || type === '???') return true;
			if (!(type in this.battle.dex.data.TypeChart)) {
				if (type === 'Fairy' || type === 'Dark' || type === 'Steel') return true;
				throw new Error("Use runStatusImmunity for " + type);
			}
			if (this.fainted) return false;

			const negateResult = this.battle.runEvent('NegateImmunity', this, type);
			const persistenceBoost = false;
			let isGrounded;
			if (type === 'Ground') {
				isGrounded = this.isGrounded(!negateResult);
				if (isGrounded === null) {
					if (message) {
						this.battle.add('-immune', this, '[from] ability: Levitate');
					}
					if(this.hasAbility('persistence')) {
						this.boostBy({atk: 1});
					}
					return false;
				}
			}
			if (!negateResult) return true;
			if ((isGrounded === undefined && !this.battle.dex.getImmunity(type, this)) || isGrounded === false) {
				if (message) {
					this.battle.add('-immune', this);
				}
				if(this.hasAbility('persistence')) {
					this.boostBy({atk: 1});
				}
				return false;
			}
			return true;
		},
		*/
	},

	/*
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
	*/
};
