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
				const dmgMod = [0x1000, 0x14CC, 0x1CCC, 0x2000];
				const numConsecutive = this.effectData.numConsecutive > 3 ? 3 : this.effectData.numConsecutive;
				return this.chainModify([dmgMod[numConsecutive], 0x1000]);
        }
			},
		},
		name: "Binge Eater",
    shortDesc: "This Pokemon's Food-type attacks deal more damage with consecutive hits.",
	},
};
