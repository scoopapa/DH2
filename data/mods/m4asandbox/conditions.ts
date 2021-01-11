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
					let move = this.dex.getMove(this.effectData.moveid);
					console.log("Reverberating turn 1 of " + move.name);
					move.basePower /= 8;
					move.reverb = true;
					console.log("Base power is "+ move.basePower);
					const possibleTargets = pokemon.side.foe.active.filter(foeActive => foeActive && this.isAdjacent(pokemon, foeActive));
					if (possibleTargets.length) {
						let rand = 0;
						if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
						const target = possibleTargets[rand];
						this.useMove(move, pokemon, target, "[from] ability: Reverberation");
					}
					delete pokemon.volatiles['reverberation1'];
				}
			}
			if (this.effectData.duration === 1) {
				if (pokemon.hasAbility('reverberation')) {
					let move = this.dex.getMove(this.effectData.moveid);
					console.log("Reverberating turn 1 of " + move.name);
					move.basePower /= 16;
					move.reverb = true;
					console.log("Base power is "+ move.basePower);
					const possibleTargets = pokemon.side.foe.active.filter(foeActive => foeActive && this.isAdjacent(pokemon, foeActive));
					if (possibleTargets.length) {
						let rand = 0;
						if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
						const target = possibleTargets[rand];
						this.useMove(move, pokemon, target, "[from] ability: Reverberation");
					}
					delete pokemon.volatiles['reverberation1'];
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
					let move = this.dex.getMove(this.effectData.moveid);
					console.log("Reverberating turn 1 of " + move.name);
					move.basePower /= 8;
					move.reverb = true;
					console.log("Base power is "+ move.basePower);
					const possibleTargets = pokemon.side.foe.active.filter(foeActive => foeActive && this.isAdjacent(pokemon, foeActive));
					if (possibleTargets.length) {
						let rand = 0;
						if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
						const target = possibleTargets[rand];
						this.useMove(move, pokemon, target, "[from] ability: Reverberation");
					}
					delete pokemon.volatiles['reverberation2'];
				}
			}
			if (this.effectData.duration === 1) {
				if (pokemon.hasAbility('reverberation')) {
					let move = this.dex.getMove(this.effectData.moveid);
					console.log("Reverberating turn 1 of " + move.name);
					move.basePower /= 16;
					move.reverb = true;
					console.log("Base power is "+ move.basePower);
					const possibleTargets = pokemon.side.foe.active.filter(foeActive => foeActive && this.isAdjacent(pokemon, foeActive));
					if (possibleTargets.length) {
						let rand = 0;
						if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
						const target = possibleTargets[rand];
						this.useMove(move, pokemon, target, "[from] ability: Reverberation");
					}
					delete pokemon.volatiles['reverberation2'];
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
					let move = this.dex.getMove(this.effectData.moveid);
					console.log("Reverberating turn 1 of " + move.name);
					move.basePower /= 8;
					move.reverb = true;
					console.log("Base power is "+ move.basePower);
					const possibleTargets = pokemon.side.foe.active.filter(foeActive => foeActive && this.isAdjacent(pokemon, foeActive));
					if (possibleTargets.length) {
						let rand = 0;
						if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
						const target = possibleTargets[rand];
						this.useMove(move, pokemon, target, "[from] ability: Reverberation");
					}
					delete pokemon.volatiles['reverberation3'];
				}
			}
			if (this.effectData.duration === 1) {
				if (pokemon.hasAbility('reverberation')) {
					let move = this.dex.getMove(this.effectData.moveid);
					console.log("Reverberating turn 1 of " + move.name);
					move.basePower /= 16;
					move.reverb = true;
					console.log("Base power is "+ move.basePower);
					const possibleTargets = pokemon.side.foe.active.filter(foeActive => foeActive && this.isAdjacent(pokemon, foeActive));
					if (possibleTargets.length) {
						let rand = 0;
						if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
						const target = possibleTargets[rand];
						this.useMove(move, pokemon, target, "[from] ability: Reverberation");
					}
					delete pokemon.volatiles['reverberation3'];
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
