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
			if (effect.name == 'Stealth Rock' or effect.name == 'Spikes') {
				return this.chainModify(0.5);
			}
		},
		name: "Huge Power",
		rating: 5,
		num: 37,
	},
};
