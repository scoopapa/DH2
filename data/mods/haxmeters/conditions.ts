export const Conditions: {[id: string]: ModdedConditionData} = {
	par: {
		inherit: true,
		onBeforeMove(pokemon) {
			/*
			if (!pokemon.statuses) pokemon.statuses = [];
			console.log(pokemon.name + ": " + pokemon.statuses.includes('par'));
			if (!pokemon.statuses.includes('par')) pokemon.statuses.push('par');
			console.log(pokemon.name + ": " + pokemon.statuses + " " + pokemon.statuses.includes('par'));
			*/
		},
	},
	frz: {
		inherit: true,
		onBeforeMove(pokemon) {
		
		},
	},
	confusion: {
		inherit: true,
		onBeforeMove(pokemon) {
			if (!['frz', 'slp'].includes(pokemon.status)) pokemon.volatiles['confusion'].time--;
			if (!pokemon.volatiles['confusion'].time) {
				pokemon.removeVolatile('confusion');
				return;
			}
			//this.add('-activate', pokemon, 'confusion');
			/*
			if (!pokemon.statuses) pokemon.statuses = [];
			console.log(pokemon.name + ": " + pokemon.statuses.includes('confusion'));
			if (!pokemon.statuses.includes('confusion')) pokemon.statuses.push('confusion');
			console.log(pokemon.name + ": " + pokemon.statuses + " " + pokemon.statuses.includes('confusion'));
			
			if (pokemon.side.status >= 100) {
				pokemon.side.status -= 100;
				this.activeTarget = pokemon;
				const damage = this.actions.getConfusionDamage(pokemon, 40);
				if (typeof damage !== 'number') throw new Error("Confusion damage not dealt");
				const activeMove = { id: this.toID('confused'), effectType: 'Move', type: '???' };
				this.damage(damage, pokemon, pokemon, activeMove as ActiveMove);
				return false;
			}*/
		},
	},
	stall: {
		inherit: true,
		onStallMove(pokemon) {
			// this.effectState.counter should never be undefined here.
			// However, just in case, use 1 if it is undefined.
			const counter = this.effectState.counter || 1;
			this.debug(`Success chance: ${Math.round(100 / counter)}%`);
			
			let success = true;
			pokemon.side.addMiss(((counter - 1) / counter) * 100);
			if (pokemon.side.miss >= 100) {
				pokemon.side.subtractMiss(100);
				success = false;
			}
			if (!success) delete pokemon.volatiles['stall'];
			return success;
		},
	},
};
