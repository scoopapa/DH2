export const Abilities: {[k: string]: ModdedAbilityData} = {
  	ultraluck: {
		onModifyCritRatio(critRatio) {
			return critRatio + 3;
		},
		flags: {},
		name: "Ultra Luck",
		rating: 1.5,
		num: 105,
	},
  dtairslash: {
		onTryHit(target, source, move) {
			if (move.type === 'Flying' && move.name != 'Air Slash') {
				this.add('-immune', target, '[from] ability: !dt air slash');
				return null;
			}
		},
		flags: {breakable: 1},
		name: "!dt air slash",
		rating: 5,
		num: 283,
	},
  	perfectionist: {
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
			this.debug('Base Power: ' + basePowerAfterMultiplier);
			if (basePowerAfterMultiplier <= 60) {
				this.debug('Perfectionist boost');
				return this.chainModify(1.5);
			}
		},
      		onAnyInvulnerabilityPriority: 1,
		onAnyInvulnerability(target, source, move) {
			if (move && (source === this.effectState.target || target === this.effectState.target)) return 0;
		},
		onAnyAccuracy(accuracy, target, source, move) {
			const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
			this.debug('Base Power: ' + basePowerAfterMultiplier);
			if (basePowerAfterMultiplier <= 60) {
			if (move && (source === this.effectState.target || target === this.effectState.target)) {
				return true;
			}
			return accuracy;
			}
		},
		flags: {},
		name: "Perfectionist",
		rating: 3.5,
		num: 101,
	},
  justalittleguy: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (attacker.getWeight() > defender.getWeight()) {
				this.debug('JALG weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (attacker.getWeight() > defender.getWeight()) {
				this.debug('JALG weaken');
				return this.chainModify(0.5);
			}
		},
		flags: { breakable: 1 },
		name: "Just A Little Guy",
		shortDesc: "Takes half damage if lighter than opponent.",
	},
  	degenerator: {
		onSwitchOut(pokemon) {
			for (const target of pokemon.foes()) {
					this.damage(target.baseMaxhp * 0.31);
			}
		},
		flags: {},
		name: "Degenerator",
		shortDesc: "When the user switches out, damage active opponents by 31% of their max HP.",
		rating: 1.5,
		num: 119,
	},
	alphasigmarizz: {
		onAllyTryAddVolatile(status, target, source, effect) {
			if (['attract', 'disable', 'encore', 'healblock', 'taunt', 'torment'].includes(status.id)) {
				if (effect.effectType === 'Move') {
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'ability: Aroma Veil', '[of] ' + effectHolder);
				}
				return null;
			}
		},
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Alpha Sigma Rizz');
			}
			return false;
		},
		flags: {breakable: 1},
		name: "Alpha Sigma Rizz",
		rating: 2,
		num: 165,
		shortDesc: "This pokemon can't get infatuated, taunted, heal blocked, or statused.",
	},
	chainedwrath: {
		onStart(pokemon) {
			let ownspe = 0;
			let foespe = 0;
			for (const target of pokemon.foes()) {
				ownspe += pokemon.getStat('spe', false, true);
				foespe += target.getStat('spe', false, true);
			}
			if (foespe >= ownspe) {
				this.boost({atk: 1});
			} 
		},
		flags: {},
		name: "Chained Wrath",
		shortDesc: "When the opponent's speed is higher than this pokemon's, this pokemon's attack is raised by 1 stage.",
		rating: 3.5,
		num: 88,
	},
}
