export const Conditions: {[id: string]: ModdedConditionData} = {
	larryboost: {
		name: 'larryboost',
		noCopy: true,
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.type === 'Normal' || move.type === 'Flying') return this.chainModify([4915, 4096]);
		},
	},
	stevenboost: {
		name: 'stevenboost',
		noCopy: true,
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
	},
	lanceboost: {
		name: 'lanceboost',
		noCopy: true,
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				source.removeVolatile('mustrecharge');
			}
		},
	},
	roxieboost: {
		name: 'roxieboost',
		noCopy: true,
		onBasePower(basePower, pokemon, target, move) {
			if (move.flags['sound']) return this.chainModify([4915, 4096]);
		},
	},
	roxanneboost: {
		name: 'roxieboost',
		noCopy: true,
		onBasePower(basePower, pokemon, target, move) {
			if (move.type === 'Rock') return this.chainModify([4915, 4096]);
		},
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy, target, source, move) {
			if (typeof accuracy !== 'number' || move.type !== 'Rock') return;
			return this.chainModify([4915, 4096]);
		},
	},
	sidneyboost: {
		name: 'sidneyboost',
		noCopy: true,
		onTryBoost(boost, target, source, effect) {
			// Don't bounce self stat changes, or boosts that have already bounced
			if (!source || target === source || !boost || effect.name === 'Mirror Armor' || effect.name === 'sidneyboost') return;
			let b: BoostID;
			for (b in boost) {
				if (boost[b]! < 0) {
					if (target.boosts[b] === -6) continue;
					const negativeBoost: SparseBoostsTable = {};
					negativeBoost[b] = boost[b];
					delete boost[b];
					if (source.hp) {
						this.boost(negativeBoost, source, target, null, true);
					}
				}
			}
		},
	},
	
	//vanilla
	sandstorm: {
		inherit: true,
		durationCallback(source, effect) {
			let duration = 5;
			if (source?.hasItem('smoothrock')) {
				duration = 8;
			}
			if (source.side.trainerBoost === 'steven') duration += 2;
			return duration;
		},
	},
};
