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
		name: "Just a Little Guy",
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
			if (['attract', 'healblock', 'taunt'].includes(status.id)) {
				if (effect.effectType === 'Move') {
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'ability: Alpha Sigma Rizz', '[of] ' + effectHolder);
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
		shortDesc: "When the opponent's speed is higher than this Pokemon's, its Attack is raised by 1 stage.",
		rating: 3.5,
		num: 88,
	},
	identitycrisis: {
        onResidualOrder: 28,
        onResidualSubOrder: 2,
        onResidual(pokemon) {
            if (!pokemon.hp) return;
            const names = ['anaconja', 'earl', 'Orangesodapop', 'Jumpheart', 'zxgzxg', 'TTTech_', 'gekokeso', 'MemesBita', 'regiboat', 'Tanny89k', 'Fragmented', 'Gaboswampert', 'DenebStargazer', 'Beebos', 'PalpitoadChamp', 'Soul Dew Latias', 'woo', 'AquaticPanic', 'Yoshiblaze'];
            const avatars = ['shelly', 'janitor', 'crasherwake', 'bianca', 'miku-water', 'burglar', 'swimmer-gen4dp', 'wattson', 'blue-gen1', 'anabel', 'klara', 'psychic-lgpe', 'maid', 'pokemonbreederf', 'brycenman', 'lyra', 'lana-masters', 'hilda', 'schoolkid-gen4'];
            const pokemons = this.dex.species.all();
            pokemon.formeChange(this.sample(pokemons));
            const randomNumber = this.random(names.length);
            pokemon.side.name = names[randomNumber];
            pokemon.side.avatar = avatars[randomNumbers];
        },
        flags: {},
        name: "Identity Crisis",
        shortDesc: "At the end of each turn, change this Pokemon and its side's name and avatar to a random one.",
    },
	auctorwile: {
		onDamagingHit(damage, target, source, effect) {
			if(effect.effectType === 'Move' && effect.name === 'Double Iron Bash') this.damage(source.baseMaxhp / 4, source, target);
		},
		flags: {},
		name: "Auctor Wile",
		shortDesc: "If this Pokemon is damaged by a punching move, the attacker loses 25% max HP.",
	},
}
