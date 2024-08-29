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
			if (move && (source === this.effectState.target || target === this.effectState.target)) {
				return true;
			}
			return accuracy;
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
		rating: 1.5,
		num: 119,
	},
}
