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
damp: {
	onStart(source) {
			this.actions.useMove("Explosion", source);
		},
		flags: {breakable: 1},
		name: "Damp",
		rating: 0.5,
		num: 6,
	},
	snowcloak: { // CHECK ONCE
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod === 0) {
				this.debug('Snowcloak neutralize');
				return this.chainModify(0.5);
			}
		},
		flags: {breakable: 1},
		name: "Snow Cloak",
		rating: 1.5,
		num: 81,
	},
	unnerve: { // Check this
		onFoeTrapPokemon(pokemon) {
			if (pokemon.hasType('Ghost') && pokemon.isAdjacent(this.effectState.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source)) return;
			if (!pokemon.knownType || pokemon.hasType('Ghost')) {
				pokemon.maybeTrapped = true;
			}
		},
		flags: {},
		name: "Unnerve",
		rating: 1,
		num: 127,
	},
}
