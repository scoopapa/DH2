export const BattleAbilities: {[k: string]: ModdedAbilityData} = {
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
					|| (target.pokeClass && target.pokeClass === 'warrior' ) || (target.pokeSkill && target.pokeSkill === 'blade' ))
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
		shortDesc: "",
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
	mage: {
		shortDesc: "",
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
		onBasePower(basePower, attacker, defender, move) {
			if( move.id === 'hiddenpower'){
				return this.chainModify(1.1);
			}
		},
		name: "mage",
		rating: 5,
		num: 37,
	},
	thief: {
		shortDesc: "",
		onModifyAtkPriority: 5,
		onModifySpe(stat) {
			return this.chainModify(1.3);
		},
		onModifyAtk(stat) {
			return this.chainModify(1.15);
		},
		onModifyDef(stat) {
			return this.chainModify(0.9);
		},
		onModifySpD(stat) {
			return this.chainModify(0.85);
		},
		onModifySpA(stat) {
			return this.chainModify(0.85);
		},
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
			this.debug('Base Power: ' + basePowerAfterMultiplier);
			if (basePowerAfterMultiplier <= 55) {
				this.debug('Thief boost');
				return this.chainModify(1.5);
			}
		},
		onBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.spe && boost.spe < 0) {
				delete boost.spe;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "Speed", "[from] ability: Thief", "[of] " + target);
				}
			}
		},
		onModifyPriority(priority, pokemon, target, move) {
			if (move.name === 'Thief' || move.name === 'Trick' || move.name === 'Covet') {
				return priority + 1;
			}
		},
		name: "thief",
		rating: 5,
		num: 37,
	},
};
