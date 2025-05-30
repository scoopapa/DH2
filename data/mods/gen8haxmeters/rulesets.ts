export const Rulesets: {[k: string]: ModdedFormatData} = {
	haxmeterrule: {
        effectType: 'Rule',
        name: 'Hax Meter Rule',
        desc: "Implements the Hax Meter",
		onBegin() {
			for (const side of this.sides) {
				side.miss = 30;
				side.effect = 30;
				side.crit = 30;
				side.status = 30;
				this.add('-message', `${side.name}\nMiss: ${side.miss}\nEffect: ${side.effect}\nCritcal Hit: ${side.crit}\nStatus: ${side.status}`);
				for (const pokemon of side.pokemon) {
					pokemon.statuses = [];
				}
			}
		},
		onResidual(pokemon) {
			this.add('-message', `${pokemon.side.name}\nMiss: ${pokemon.side.miss.toFixed(2)}\nEffect: ${pokemon.side.effect.toFixed(2)}\nCritcal Hit: ${pokemon.side.crit.toFixed(2)}\nStatus: ${pokemon.side.status.toFixed(2)}`);
		},
		onUpdate(pokemon) {
			pokemon.statuses = [];
			if (pokemon.volatiles['confusion']) pokemon.statuses.push('Confusion');
			if (pokemon.volatiles['attract']) pokemon.statuses.push('Attract');
			if (pokemon.status === 'par') pokemon.statuses.push('Paralysis');
			if (pokemon.status === 'frz') pokemon.statuses.push('Freeze');
		},
		onBeforeMove(pokemon, target, move) {
			if (!pokemon.statuses || pokemon.statuses.length === 0) return;
			let multiplier = 1;
			let prefix = "";
			let suffix = "";
			for (const status of pokemon.statuses) {
				let toAdd = 0;
				switch(status) {
					case 'Paralysis':
						toAdd = 25;
						break;
					case 'Freeze':
						toAdd = 80;
						break;
					case 'Confusion':
						toAdd = 33;
						break;
					case 'Attract':
						toAdd = 50;
						break;
				}
				let product = toAdd * multiplier;
				if (prefix.length === 0) {
					prefix = status;
					suffix = toAdd;
				} else {
					prefix += (' + ' + status);
					suffix = multiplier + ' * ' + toAdd + ' = ' + product;
				}
				this.add('-message', `(${prefix}: ${suffix})`);
				pokemon.side.addStatus(product);
				multiplier *= (1 - (toAdd / 100));
				if (pokemon.side.status >= 100) {
					pokemon.side.subtractStatus(100);
					switch(status) {
						case 'Paralysis':
							this.add('cant', pokemon, 'par');
							break;
						case 'Freeze':
							this.add('cant', pokemon, 'frz');
							break;
						case 'Confusion':
							this.activeTarget = pokemon;
							const damage = this.actions.getConfusionDamage(pokemon, 40);
							if (typeof damage !== 'number') throw new Error("Confusion damage not dealt");
							const activeMove = { id: this.toID('confused'), effectType: 'Move', type: '???' };
							this.damage(damage, pokemon, pokemon, activeMove as ActiveMove);
							break;
						case 'Attract':
							this.add('cant', pokemon, 'Attract');
							break;
					}
					return false;
				} else if (pokemon.status === 'frz') pokemon.cureStatus();
			}
		},
    },
};