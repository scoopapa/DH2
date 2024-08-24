export const Abilities: {[k: string]: ModdedAbilityData} = {

  slowstart: {
		onStart(pokemon) {
			pokemon.addVolatile('slowstart');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['slowstart'];
			this.add('-end', pokemon, 'Slow Start', '[silent]');
		},
		condition: {
			duration: 2,
			onResidualOrder: 28,
			onResidualSubOrder: 2,
			onStart(target) {
				this.add('-start', target, 'ability: Slow Start');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(0.5);
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(target) {
				this.add('-end', target, 'Slow Start');
			},
		},
		flags: {},
		name: "Slow Start",
		rating: -1,
		num: 112,
	},
goodasgold: {
		onTryHit(target, source, move) {
			if (move.category === 'Status' && target !== source && move.name != 'Defog') {
				this.add('-immune', target, '[from] ability: Good as Gold');
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Good as Gold",
		rating: 5,
		num: 283,
	},

}
