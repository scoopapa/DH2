export const Conditions: {[k: string]: ConditionData} = {
	reverberation1: {
		duration: 3,
		onResidualOrder: 1,
		onResidual(pokemon) {
			console.log(this.effectData.duration);
			console.log(pokemon.name);
			console.log(this.effectData.moveid);
			if (this.effectData.duration === 2) {
				if (pokemon.hasAbility('reverberation')) {
					pokemon.addVolatile('reverberationTurn1');
					this.useMove(this.effectData.moveid, pokemon);
				}
			}
			if (this.effectData.duration === 1) {
				if (pokemon.hasAbility('reverberation')) {
					pokemon.addVolatile('reverberationTurn2');
					this.useMove(this.effectData.moveid, pokemon);
				}
			}
		},
	},
	reverberation2: {
		duration: 3,
		onResidualOrder: 1,
		onResidual(pokemon) {
			console.log(this.effectData.duration);
			console.log(pokemon.name);
			console.log(this.effectData.moveid);
			if (this.effectData.duration === 2) {
				if (pokemon.hasAbility('reverberation')) {
					pokemon.addVolatile('reverberationTurn1');
					this.useMove(this.effectData.moveid, pokemon);
				}
			}
			if (this.effectData.duration === 1) {
				if (pokemon.hasAbility('reverberation')) {
					pokemon.addVolatile('reverberationTurn2');
					this.useMove(this.effectData.moveid, pokemon);
				}
			}
		},
	},
	reverberation3: {
		duration: 3,
		onResidualOrder: 1,
		onResidual(pokemon) {
			console.log(this.effectData.duration);
			console.log(pokemon.name);
			console.log(this.effectData.moveid);
			if (this.effectData.duration === 2) {
				if (pokemon.hasAbility('reverberation')) {
					pokemon.addVolatile('reverberationTurn1');
					this.useMove(this.effectData.moveid, pokemon);
				}
			}
			if (this.effectData.duration === 1) {
				if (pokemon.hasAbility('reverberation')) {
					pokemon.addVolatile('reverberationTurn2');
					this.useMove(this.effectData.moveid, pokemon);
				}
			}
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
