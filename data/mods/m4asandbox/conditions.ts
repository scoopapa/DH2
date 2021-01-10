export const Conditions: {[k: string]: ConditionData} = {
	reverberation1: {
		duration: 3,
		onResidualOrder: 1,
		onResidual(pokemon) {
			console.log(this.effectData.duration);
			console.log(this.effectData.source.name);
			console.log(this.effectData.moveid);
			if (this.effectData.duration === 2) {
				if (this.effectData.source.isActive && this.effectData.source.hasAbility('reverberation')) {
					this.effectData.source.addVolatile('reverberationTurn1');
					this.useMove(this.effectData.moveid, this.effectData.source);
				}
			},
			if (this.effectData.duration === 1) {
				if (this.effectData.source.isActive && this.effectData.source.hasAbility('reverberation')) {
					this.effectData.source.addVolatile('reverberationTurn2');
					this.useMove(this.effectData.moveid, this.effectData.source);
				}
			},
		},
	},
	reverberation2: {
		duration: 3,
		onResidualOrder: 1,
		onResidual(pokemon) {
			console.log(this.effectData.duration);
			console.log(this.effectData.source.name);
			console.log(this.effectData.moveid);
			if (this.effectData.duration === 2) {
				if (this.effectData.source.isActive && this.effectData.source.hasAbility('reverberation')) {
					this.effectData.source.addVolatile('reverberationTurn1');
					this.useMove(this.effectData.moveid, this.effectData.source);
				}
			},
			if (this.effectData.duration === 1) {
				if (this.effectData.source.isActive && this.effectData.source.hasAbility('reverberation')) {
					this.effectData.source.addVolatile('reverberationTurn2');
					this.useMove(this.effectData.moveid, this.effectData.source);
				}
			},
		},
	},
	reverberation3: {
		duration: 3,
		onResidualOrder: 1,
		onResidual(pokemon) {
			console.log(this.effectData.duration);
			console.log(this.effectData.source.name);
			console.log(this.effectData.moveid);
			if (this.effectData.duration === 2) {
				if (this.effectData.source.isActive && this.effectData.source.hasAbility('reverberation')) {
					this.effectData.source.addVolatile('reverberationTurn1');
					this.useMove(this.effectData.moveid, this.effectData.source);
				}
			},
			if (this.effectData.duration === 1) {
				if (this.effectData.source.isActive && this.effectData.source.hasAbility('reverberation')) {
					this.effectData.source.addVolatile('reverberationTurn2');
					this.useMove(this.effectData.moveid, this.effectData.source);
				}
			},
		},
	},
	acidicterrain: {
		inherit: true,
		durationCallback(source, effect) {
			if (source?.hasItem('terrainextender')) {
				 return 8;
			}
			if (source?.hasAbility('acidrock')) {
				 return 0;
			}
			return 5;
		},
	},
};
