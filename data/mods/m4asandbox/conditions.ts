export const Conditions: {[k: string]: ConditionData} = {
	reverberation1: {
		duration: 4,
		onResidualOrder: 1,
		onResidual(pokemon) {
			console.log(this.effectData.duration);
			console.log(pokemon.name);
			console.log(this.effectData.moveid);
			if (this.effectData.duration === 2) {
				if (pokemon.hasAbility('reverberation')) {
					pokemon.addVolatile('reverberationTurn1');
					this.add('-ability', pokemon, 'Reverberation');
					this.useMove(this.effectData.moveid, pokemon);
				}
			}
			if (this.effectData.duration === 1) {
				if (pokemon.hasAbility('reverberation')) {
					pokemon.addVolatile('reverberationTurn2');
					this.add('-ability', pokemon, 'Reverberation');
					this.useMove(this.effectData.moveid, pokemon);
					pokemon.removeVolatile('reverberation1');
				}
			}
		},
	},
	reverberation2: {
		duration: 4,
		onResidualOrder: 1,
		onResidual(pokemon) {
			console.log(this.effectData.duration);
			console.log(pokemon.name);
			console.log(this.effectData.moveid);
			if (this.effectData.duration === 2) {
				if (pokemon.hasAbility('reverberation')) {
					pokemon.addVolatile('reverberationTurn1');
					this.add('-ability', pokemon, 'Reverberation');
					this.useMove(this.effectData.moveid, pokemon);
				}
			}
			if (this.effectData.duration === 1) {
				if (pokemon.hasAbility('reverberation')) {
					pokemon.addVolatile('reverberationTurn2');
					this.add('-ability', pokemon, 'Reverberation');
					this.useMove(this.effectData.moveid, pokemon);
					pokemon.removeVolatile('reverberation2');
				}
			}
		},
	},
	reverberation3: {
		duration: 4,
		onResidualOrder: 1,
		onResidual(pokemon) {
			console.log(this.effectData.duration);
			console.log(pokemon.name);
			console.log(this.effectData.moveid);
			if (this.effectData.duration === 2) {
				if (pokemon.hasAbility('reverberation')) {
					pokemon.addVolatile('reverberationTurn1');
					this.add('-ability', pokemon, 'Reverberation');
					this.useMove(this.effectData.moveid, pokemon);
				}
			}
			if (this.effectData.duration === 1) {
				if (pokemon.hasAbility('reverberation')) {
					pokemon.addVolatile('reverberationTurn2');
					this.add('-ability', pokemon, 'Reverberation');
					this.useMove(this.effectData.moveid, pokemon);
					pokemon.removeVolatile('reverberation3');
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
