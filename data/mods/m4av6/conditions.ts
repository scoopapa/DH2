'use strict';

export const Conditions: {[k: string]: ConditionData} = {
	acidicterrain: {
		name: 'Acidic Terrain',
		effectType: 'Terrain',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('terrainextender')) {
				return 8;
			}
			return 5;
		},
		onBasePowerPriority: 6,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Poison' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
				for (const target of this.getAllActive()) {
					if (target.hasAbility('downtoearth')) {
						this.add('-message', `${target.name} suppresses the effects of the terrain!`);
						return;
					}
				}
				this.debug('acidic terrain boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		onModifyMovePriority: -5,
		onModifyMove(move, source, target) {
			if (move.type === 'Poison' && target.isGrounded() && !target.isSemiInvulnerable() && target.hasType('Steel')) {
				for (const target of this.getAllActive()) {
					if (target.hasAbility('downtoearth')) {
						this.add('-message', `${target.name} suppresses the effects of the terrain!`);
						return;
					}
				}
				if (!move.ignoreImmunity) move.ignoreImmunity = {};
				if (move.ignoreImmunity !== true) {
					move.ignoreImmunity['Poison'] = true;
				}
			}
		},
		onStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				this.add('-fieldstart', 'move: Acidic Terrain', '[from] ability: ' + effect, '[of] ' + source);
				this.add('-message', "Poison-type moves used by grounded Pokémon will have their power increased.");
				this.add('-message', "Grounded Steel-type Pokémon will also lose their immunity to Poison-type moves.");
			} else {
				this.add('-fieldstart', 'move: Acidic Terrain');
			}
		},
		onResidualOrder: 21,
		onResidualSubOrder: 2,
		onEnd() {
			this.add('-fieldend', 'move: Acidic Terrain');
		},
 	},
	settle1: {
		name: 'settle1',
		duration: 4,
		onResidualOrder: 1,
		onResidual(pokemon) {
			if (this.effectData.duration !== 3) return;
			let num = 0;
			for (const moveSlot of this.effectData.target.moveSlots) {
				num++;
				if (num === 1) {
					this.add('-message', `${pokemon.name} needs to settle down after using ${this.dex.getMove(moveSlot.move.name)}!`);
				}
			}
		},
		onEnd(pokemon) {
			let num = 0;
			for (const moveSlot of this.effectData.target.moveSlots) {
				num++;
				if (num === 1) {
					this.add('-message', `${pokemon.name} settled down from using ${this.dex.getMove(moveSlot.move.name)}!`);
				}
			}
		},
	},
	settle2: {
		name: 'settle2',
		duration: 4,
		onResidualOrder: 1,
		onResidual(pokemon) {
			if (this.effectData.duration !== 3) return;
			let num = 0;
			for (const moveSlot of this.effectData.target.moveSlots) {
				num++;
				if (num === 2) {
					this.add('-message', `${pokemon.name} needs to settle down after using ${this.dex.getMove(moveSlot.move.name)}!`);
				}
			}
		},
		onEnd(pokemon) {
			let num = 0;
			for (const moveSlot of this.effectData.target.moveSlots) {
				num++;
				if (num === 2) {
					this.add('-message', `${pokemon.name} settled down from using ${this.dex.getMove(moveSlot.move.name)}!`);
				}
			}
		},
	},
	settle3: {
		name: 'settle3',
		duration: 4,
		onResidualOrder: 1,
		onResidual(pokemon) {
			if (this.effectData.duration !== 3) return;
			let num = 0;
			for (const moveSlot of this.effectData.target.moveSlots) {
				num++;
				if (num === 3) {
					this.add('-message', `${pokemon.name} needs to settle down after using ${this.dex.getMove(moveSlot.move.name)}!`);
				}
			}
		},
		onEnd(pokemon) {
			let num = 0;
			for (const moveSlot of this.effectData.target.moveSlots) {
				num++;
				if (num === 3) {
					this.add('-message', `${pokemon.name} settled down from using ${this.dex.getMove(moveSlot.move.name)}!`);
				}
			}
		},
	},
	settle4: {
		name: 'settle4',
		duration: 4,
		onResidualOrder: 1,
		onResidual(pokemon) {
			if (this.effectData.duration !== 3) return;
			let num = 0;
			for (const moveSlot of this.effectData.target.moveSlots) {
				num++;
				if (num === 4) {
					this.add('-message', `${pokemon.name} needs to settle down after using ${this.dex.getMove(moveSlot.move.name)}!`);
				}
			}
		},
		onEnd(pokemon) {
			let num = 0;
			for (const moveSlot of this.effectData.target.moveSlots) {
				num++;
				if (num === 4) {
					this.add('-message', `${pokemon.name} settled down from using ${this.dex.getMove(moveSlot.move.name)}!`);
				}
			}
		},
	},
};
