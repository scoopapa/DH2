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
					this.useMove(this.effectData.moveid, pokemon, this.dex.getAbility('reverberation'));
				}
			}
			if (this.effectData.duration === 1) {
				if (pokemon.hasAbility('reverberation')) {
					pokemon.addVolatile('reverberationTurn2');
					this.useMove(this.effectData.moveid, pokemon, this.dex.getAbility('reverberation'));
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
					this.useMove(this.effectData.moveid, pokemon, this.dex.getAbility('reverberation'));
				}
			}
			if (this.effectData.duration === 1) {
				if (pokemon.hasAbility('reverberation')) {
					pokemon.addVolatile('reverberationTurn2');
					this.useMove(this.effectData.moveid, pokemon, this.dex.getAbility('reverberation'));
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
					this.useMove(this.effectData.moveid, pokemon, this.dex.getAbility('reverberation'));
				}
			}
			if (this.effectData.duration === 1) {
				if (pokemon.hasAbility('reverberation')) {
					pokemon.addVolatile('reverberationTurn2');
					this.useMove(this.effectData.moveid, pokemon, this.dex.getAbility('reverberation'));
					pokemon.removeVolatile('reverberation3');
				}
			}
		},
	},
	reverberationTurn1: {
		duration: 0,
		onModifyMove(move, source, target) {
			console.log("Modifying move");
			console.log("Reverberation turn 1");
			if (move.basePower) {
				move.basePower = move.basePower.chainModify([0x0200, 0x1000]);
				console.log(move.basePower);
			}
			delete source.volatiles['reverberationTurn1'];
		},
	},
	reverberationTurn2: {
		duration: 0,
		onModifyMove(move, source, target) {
			console.log("Modifying move");
			console.log("Reverberation turn 2");
			if (move.basePower) {
				move.basePower = move.basePower.chainModify([0x0100, 0x1000]);
				console.log(move.basePower);
			}
			delete source.volatiles['reverberationTurn2'];
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
