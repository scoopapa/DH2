export const Conditions: import('../../../sim/dex-moves').ModdedConditionDataTable = {
	 tox: {
        inherit: true,
        onStart(target, source, sourceEffect) {
            this.effectState.stage = 0;
            if (sourceEffect && sourceEffect.id === 'toxicorb') {
                this.add('-status', target, 'tox', '[from] item: Toxic Orb');
            } else if (sourceEffect && sourceEffect.effectType === 'Ability') {
                this.add('-status', target, 'tox', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
            } else if (sourceEffect && sourceEffect.effectType === 'Move') {
                if (sourceEffect.name === 'Biohazard Blast') {
                    this.effectState.type = 'biohazardblast';
                }
            } else {
            this.add('-status', target, 'tox');
        }
        onResidual(pokemon) {
            if (this.effectState.stage < 15) {
                this.effectState.stage++;
            }
            if (this.effectState.type === 'biohazardblast') {
              this.damage(this.clampIntRange(pokemon.baseMaxhp / 8, 1) * this.effectState.stage);
            } else {
              this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectState.stage);
            }
        },
    },
};
