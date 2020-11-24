export const Abilities: {[k: string]: ModdedAbilityData} = {
	"intimidate": {
		inherit: true,
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Intimidate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} 
				else if ( target.hasAbility(['Inner Focus', 'Oblivious', 'Own Tempo', 'Scrappy']) 
					|| (target.pokeClass && target.pokeClass === 'blade' ))
				{
					this.add('-immune', target, `[from] ability: ${target.getAbility().name}`);
				}
				else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
	},
	warrior: {
		shortDesc: "This Pokemon's Attack is doubled.",
		onModifyAtkPriority: 5,
		onModifyAtk(stat) {
			return this.chainModify(1.2);
		},
		onModifyDef(stat) {
			return this.chainModify(1.2);
		},
		onModifySpA(stat) {
			return this.chainModify(0.9);
		},
		onModifySpD(stat) {
			return this.chainModify(0.9);
		},
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify(1.1);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.flags['contact']) {
				return this.chainModify(0.9);
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect.name === 'Stealth Rock' || effect.name === 'Spikes') {
				return this.chainModify(0.5);
			}
		},
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.hp && pokemon.status && this.randomChance(1, 5)) {
				this.debug('warrior');
				this.add('-activate', pokemon, 'ability: Warrior');
				pokemon.cureStatus();
			}
		},
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.id === 'taunt') {
				return priority + 1;
			}
		},
		name: "warrior",
		rating: 5,
		num: 37,
	},
	warrior: {
		shortDesc: "This Pokemon's Attack is doubled.",
		onModifyAtkPriority: 5,
		onModifyAtk(stat) {
			return this.chainModify(0.7);
		},
		onModifyDef(stat) {
			return this.chainModify(0.8);
		},
		onModifySpA(stat) {
			return this.chainModify(1.2);
		},
		onModifySpD(stat) {
			return this.chainModify(1.1);
		},
		onModifyMovePriority: -2,
		onModifyMove(move) {
			if (move.secondaries) {
				for (const secondary of move.secondaries) {
					if (secondary.chance) secondary.chance *= 1.5;
				}
			}
		},
		onSourceModifyAccuracy(accuracy, target, source, move) {
			if (move.category === "Status") return accuracy * 1.2;
		},
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			const heals = ['drain', 'leechseed', 'ingrain', 'aquaring', 'strengthsap'];
			if (heals.includes(effect.id)) {
				return this.chainModify([0x14CC, 0x1000]);
			}
		},
		name: "mage",
		rating: 5,
		num: 37,
	},
};
