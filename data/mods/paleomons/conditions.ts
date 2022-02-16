export const Conditions: {[k: string]: ConditionData} = {	
	tarpit: {
		name: "Tar Pit",
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
			if (attacker.hasItem('heavydutyboots')) return;
			if (move.type === 'Poison' && attacker.isGrounded()) {
				this.debug('tar pit boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},

		onStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				this.add('-fieldstart', 'move: Tar Pit', '[from] ability: ' + effect, '[of] ' + source);
				this.add('-message', "The battlefield became coated in tar!");
				this.hint(`Tar Pit increases the power of Poison-type moves by 1.3x and applies Powder to all Pokemon on the field.`);
				this.hint(`Doesn't affect grounded Pokemon nor Pokemon holding Heavy-Duty Boots.`);
			} else {
				this.add('-fieldstart', 'move: Tar Pit');
			}
		},

		onTryMove(pokemon, target, move) {
			if (move.type === 'Fire') {
				if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable() && !pokemon.hasItem('heavydutyboots')) {
					this.add('-message', "When the flame touched the sticky tar on the Pokemon, it combusted!");
					this.damage(this.clampIntRange(Math.round(pokemon.maxhp / 4), 1));
					return false;
				}
			}
		},
		
		onResidualOrder: 21,
		onResidualSubOrder: 2,
		onEnd() {
			this.add('-fieldend', 'move: Tar Pit');
		},
	},
};