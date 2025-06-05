export function roundNum(n: number): number {
	return Math.round((n + Number.EPSILON) * 100) / 100;
}

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
				
				side.pmiss = 30;
				side.peffect = 30;
				side.pcrit = 30;
				side.pstatus = 30;
				for (const pokemon of side.pokemon) {
					pokemon.statuses = [];
				}
			}
			const sideOne = this.sides[0];
			const sideTwo = this.sides[1];
			this.add(`c:|${Math.floor(Date.now() / 1000)}||\/raw <div class="infobox"><details class="readmore code"><summary> <div class="summary-content-wrapper"><table class="summary-table"><thead><tr><th colspan="2">${sideOne.name}</th><td>|</td><th colspan="2">${sideTwo.name}</th></tr></thead><tbody><br><tr><td>Miss:</td><td>${roundNum(sideOne.miss)}</td><td>|</td><td>Miss:</td><td>${roundNum(sideTwo.miss)}</td></tr><<td>Effect:</td><td>${roundNum(sideOne.effect)}</td><td>|</td><td>Effect:</td><td>${roundNum(sideTwo.effect)}</td></tr><tr><td>Critical Hit:</td><td>${roundNum(sideOne.crit)}</td><td>|</td><td>Critical Hit:</td><td>${roundNum(sideTwo.crit)}</td></tr><<td>Status:</td><td>${roundNum(sideOne.status)}</td><td>|</td><td>Status:</td><td>${roundNum(sideTwo.status)}</td></tr></tbody></table></div></summary>`);
		},
		onResidual(pokemon) {
			const sideOne = this.sides[0];
			const sideTwo = this.sides[1];
			if (pokemon.hp && pokemon.side !== sideOne) return;
			//if (sideOne.noChange && sideTwo.noChange) return;
			this.add(`c:|${Math.floor(Date.now() / 1000)}||\/raw <div class="infobox"><details class="readmore code"><summary> <div class="summary-content-wrapper"><table class="summary-table"><thead><tr><th colspan="2">${sideOne.name}</th><td>|</td><th colspan="2">${sideTwo.name}</th></tr></thead><tbody><br><tr><td>Miss:</td><td>${roundNum(sideOne.miss)}</td><td>|</td><td>Miss:</td><td>${roundNum(sideTwo.miss)}</td></tr><<td>Effect:</td><td>${roundNum(sideOne.effect)}</td><td>|</td><td>Effect:</td><td>${roundNum(sideTwo.effect)}</td></tr><tr><td>Critical Hit:</td><td>${roundNum(sideOne.crit)}</td><td>|</td><td>Critical Hit:</td><td>${roundNum(sideTwo.crit)}</td></tr><<td>Status:</td><td>${roundNum(sideOne.status)}</td><td>|</td><td>Status:</td><td>${roundNum(sideTwo.status)}</td></tr></tbody></table></div></summary>`);
			for (const side of this.sides) {
				side.pmiss = side.miss;
				side.peffect = side.effect;
				side.pcrit = side.crit;
				side.pstatus = side.status;
			}
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
						if (move.flags['defrost']) break;
						toAdd = 80;
						break;
					case 'Confusion':
						if (pokemon.volatiles['confusion']) toAdd = 33;
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
					suffix = roundNum(multiplier) + ' * ' + roundNum(toAdd) + ' = ' + product;
				}
				if (toAdd > 0) this.add('-message', `(${prefix}: ${suffix})`);
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