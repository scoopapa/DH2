export const Conditions: {[id: string]: ModdedConditionData} = {
rosegoldgarden: {
	//Terrain blocking implemented in scripts.ts
        name: "Rose Gold Garden",
        effectType: 'Terrain',
        duration: 6,
        durationCallback(source, effect) {
            if (source?.hasItem('terrainextender')) {
                return 9;
            }
            return 6;
        },
		onAnySetTerrain(target, source, terrain) {
			if (this.field.getTerrain().id === 'rosegoldgarden') return false;
        },
		onBasePowerPriority: 6,
		onBasePower(basePower, attacker, defender, move) {
			const weakenedMoves = ['earthquake', 'bulldoze', 'magnitude'];
			if (weakenedMoves.includes(move.id) && defender.isGrounded() && !defender.isSemiInvulnerable()) {
				this.debug('move weakened by grassy terrain');
				return this.chainModify(0.5);
			}
			if (move.type === 'Grass' && attacker.isGrounded()) {
				this.debug('grassy terrain boost');
				return this.chainModify([5325, 4096]);
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-message', "A Rose-Gold Garden blooms!");
			this.add('-fieldstart', 'Rose Gold Garden');
		},
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
				if (pokemon.hasAbility('floralsymbiont')) {
					this.heal(pokemon.baseMaxhp / 8, pokemon, pokemon);
				}
				else {
					this.heal(pokemon.baseMaxhp / 16, pokemon, pokemon);
				}
			} else {
				this.debug(`Pokemon semi-invuln or not grounded; Grassy Terrain skipped`);
			}
		},
		onFieldEnd(field, source, effect) {
			this.add('-message', "The Rose-Gold Garden withers away...");
			this.add('-fieldend', 'Rose Gold Garden');
		},
        onEffectivenessPriority: -1,
		onEffectiveness(typeMod, target, type, move) {
			if (move && move.effectType === 'Move' && move.category !== 'Status' && type === 'Grass' && typeMod > 0) {
				this.add('-fieldactivate', 'Rose Gold Garden');
				return 0;
			}
		},
    },
};
