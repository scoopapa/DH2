export const Conditions: {[k: string]: ConditionData} = {
	frz: {
		name: 'frz',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'frz');
			}
		},
		onModifySpe(spe, pokemon) {
			return this.chainModify(0.5);
		},
	},
	brn: {
		name: 'brn',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'brn', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'brn');
			}
		},
		onModifyDef(def, pokemon) {
			return this.chainModify(0.75);
		},
		onModifySpD(spd, pokemon) {
			return this.chainModify(0.75);
		},
	},
	crs: {
		name: 'crs',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			this.effectData.stage = 0;
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'crs', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'crs');
			}
		},
		onSwitchIn() {
			this.effectData.stage = 0;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			if (this.effectData.stage < 15) {
				this.effectData.stage++;
			}
			this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectData.stage);
		},
	},
	fer: {
		name: 'fer',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			this.effectData.stage = 0;
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'fer', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', target, 'fer');
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			let statName = 'atk';
			let bestStat = 0;
			let s: StatNameExceptHP;
			for (s in source.storedStats) {
				if (s === 'def' || s === 'spd') continue;
				if (source.storedStats[s] > bestStat) {
					statName = s;
					bestStat = source.storedStats[s];
				}
			}
			this.boost({[statName]: -1}, source);
		},
	},
};
