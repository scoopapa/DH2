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
				for (const pokemon of side.pokemon) {
					pokemon.statuses = [];
				}
			}
			const sideOne = this.sides[0];
			const sideTwo = this.sides[1];
			this.add(`c:|${Math.floor(Date.now() / 1000)}||\/raw <div class="infobox"><details class="readmore code"><summary> <div class="summary-content-wrapper"><table class="summary-table"><thead><tr><th colspan="2">${sideOne.name}</th><th colspan="2">${sideTwo.name}</th></tr></thead><tbody><br><tr><td>Miss:</td><td>${sideOne.miss.toFixed(2)}</td><td>Miss:</td><td>${sideTwo.miss.toFixed(2)}</td></tr><<td>Effect:</td><td>${sideOne.effect.toFixed(2)}</td><<td>Effect:</td><td>${sideTwo.effect.toFixed(2)}</td></tr><tr><td>Critical Hit:</td><td>${sideOne.crit.toFixed(2)}</td><td>Critical Hit:</td><td>${sideTwo.crit.toFixed(2)}</td></tr><<td>Status:</td><td>${sideOne.status.toFixed(2)}</td><td>Status:</td><td>${sideTwo.status.toFixed(2)}</td></tr></tbody></table></div></summary>`);
		},
		onResidual(pokemon) {
			const sideOne = this.sides[0];
			const sideTwo = this.sides[1];
			if (pokemon.side !== sideOne) return;
			this.add(`c:|${Math.floor(Date.now() / 1000)}||\/raw <div class="infobox"><details class="readmore code"><summary> <div class="summary-content-wrapper"><table class="summary-table"><thead><tr><th colspan="2">${sideOne.name}</th><th colspan="2">${sideTwo.name}</th></tr></thead><tbody><br><tr><td>Miss:</td><td>${sideOne.miss.toFixed(2)}</td><td>Miss:</td><td>${sideTwo.miss.toFixed(2)}</td></tr><<td>Effect:</td><td>${sideOne.effect.toFixed(2)}</td><<td>Effect:</td><td>${sideTwo.effect.toFixed(2)}</td></tr><tr><td>Critical Hit:</td><td>${sideOne.crit.toFixed(2)}</td><td>Critical Hit:</td><td>${sideTwo.crit.toFixed(2)}</td></tr><<td>Status:</td><td>${sideOne.status.toFixed(2)}</td><td>Status:</td><td>${sideTwo.status.toFixed(2)}</td></tr></tbody></table></div></summary>`);
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