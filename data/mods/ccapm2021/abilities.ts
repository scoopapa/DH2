export const Abilities: {[k: string]: ModdedAbilityData} = {
	adrenaline: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Feral' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Adrenaline boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Feral' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Adrenaline boost');
				return this.chainModify(1.5);
			}
		},
		name: "Adrenaline",
    shortDesc: "At 1/3 or less of its max HP, this Pokemon's attacking stat is 1.5x with Feral attacks.",
	},
	bingeeater: {
		onStart(pokemon) {
			pokemon.addVolatile('bingeeater');
		},
		condition: {
			onStart(pokemon) {
				this.effectData.lastMove = '';
				this.effectData.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasAbility('bingeeater')) {
					pokemon.removeVolatile('bingeeater');
					return;
				}
				if (this.effectData.lastMove === move.id && pokemon.moveLastTurnResult) {
					this.effectData.numConsecutive++;
				} else if (pokemon.volatiles['twoturnmove'] && this.effectData.lastMove !== move.id) {
					this.effectData.numConsecutive = 1;
				} else {
					this.effectData.numConsecutive = 0;
				}
				this.effectData.lastMove = move.id;
			},
			onModifyDamage(damage, source, target, move) {
			  if (move.type === 'Food') {
				const dmgMod = [1, 1.33, 1.66, 2];
				const numConsecutive = this.effectData.numConsecutive > 3 ? 3 : this.effectData.numConsecutive;
				return this.chainModify(dmgMod[numConsecutive]);
			  }
			},
		},
		name: "Binge Eater",
      shortDesc: "This Pokemon's Food-type attacks deal more damage with consecutive hits.",
	},
	ferocity: {
		onModifyMove(move) {
			if (!move.type === 'Feral') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				boosts: {
					def: -1,
				},
				ability: this.dex.getAbility('ferocity'),
			});
		},
		name: "Ferocity",
    shortDesc: "The user's Feral-type moves have a 30% chance to drop the target's Defense.",
	},
	foodpoisoning: {
		onModifyMove(move) {
			if (!move.type === 'Food') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				status: 'psn',
				ability: this.dex.getAbility('foodpoisoning'),
			});
		},
		name: "Food Poisoning",
    shortDesc: "The user's Food-type moves have a 30% chance to poison the target.",
	},
	relentless: {
		onBasePowerPriority: 8,
		onBasePower(basePower, attacker, defender, move) {
			if (move.name === 'Outrage' || move.name === 'Thrash' || move.name === 'Petal Dance') {
				return this.chainModify(1.5);
			}
		},
		name: "Relentless",
    shortDesc: "Moves that confuse the user due to fatigue have 1.5x power.",
	},
	runaway: {
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Feral') {
				this.boost({spe: 2});
			}
		},
		name: "Run Away",
		num: 50,
		shortDesc: "This Pokemon's Speed goes up 2 stages when hit by a Feral-type move.",
	},
	scraps: {
    onAfterMove(target, source, move){
			if (move.type === 'Food') {
				this.heal(target.baseMaxhp / 8);
			}
		},
		name: "Scraps",
		shortDesc: "Using a Food-type move heals the user for 12.5% of its max HP.",
	},
	sugarrush: {
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Food') {
				this.boost({spe: 2});
			}
		},
		name: "Sugar Rush",
		shortDesc: "This Pokemon's Speed goes up 2 stages when hit by a Food-type move.",
	},
};
