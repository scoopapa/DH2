export const Abilities: {[abilityid: string]: AbilityData} = {
	smartprankster: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.category === 'Status') {
				move.smartpranksterBoosted = true;
				return priority + 1;
			}
		},
		name: "Smart Prankster",
		shortDesc: "This Pokemon's non-damaging moves have their priority increased by 1.",
		rating: 4,
		num: -1,
	},
	grasspelt: {
		onDamagingHit(damage, target, source, move) {
			if (!this.field.isTerrain('grassyterrain')) {
				this.field.setTerrain('grassyterrain');
			}
		},
		name: "Grass Pelt",
		shortDesc: "When this Pokemon is hit, Grassy Terrain begins.",
		rating: 2,
		num: 179,
	},
	stubborn: {
		onStart(pokemon) {
			pokemon.addVolatile('stubborn');
		},
		condition: {
			onStart(pokemon) {
				this.effectData.lastMove = '';
				this.effectData.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasAbility('stubborn')) {
					pokemon.removeVolatile('stubborn');
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
				const dmgMod = [0x1000, 0x1333, 0x1666, 0x1999, 0x1CCC, 0x2000];
				const numConsecutive = this.effectData.numConsecutive > 5 ? 5 : this.effectData.numConsecutive;
				return this.chainModify([dmgMod[numConsecutive], 0x1000]);
			},
		},
		name: "Stubborn",
		shortDesc: "Damage of moves used on consecutive turns is increased. Max 2x after 5 turns.",
		rating: 3,
		num: -2,
	},
	fullmetalbody: {
		onAllyBoost(boost, target, source, effect) {
			if ((source && target === source) || !target.hasType('Steel')) return;
			let showMsg = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries) {
				const effectHolder = this.effectData.target;
				this.add('-block', target, 'ability: Full Metal Body', '[of] ' + effectHolder);
			}
		},
		onAllySetStatus(status, target, source, effect) {
			if (target.hasType('Steel') && source && target !== source && effect && effect.id !== 'yawn') {
				this.debug('interrupting setStatus with Full Metal Body');
				if (effect.id === 'synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
					const effectHolder = this.effectData.target;
					this.add('-block', target, 'ability: Full Metal Body', '[of] ' + effectHolder);
				}
				return null;
			}
		},
		onAllyTryAddVolatile(status, target) {
			if (target.hasType('Steel') && status.id === 'yawn') {
				this.debug('Full Metal Body blocking yawn');
				const effectHolder = this.effectData.target;
				this.add('-block', target, 'ability: Full Metal Body', '[of] ' + effectHolder);
				return null;
			}
		},
		isUnbreakable: true,
		name: "Full Metal Body",
		shortDesc: "This side's Steel types can't have stats lowered or status inflicted by other Pokemon.",
		rating: 2,
		num: 230,
	},
};