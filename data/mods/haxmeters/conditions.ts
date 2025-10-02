export function roundNum(n: number, places: number): number {
	return Math.round((n + Number.EPSILON) * Math.pow(10, places)) / Math.pow(10, places);
}
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
	haxmeterweather: {
		name: 'Hax Meter Weather',
		effectType: 'Weather',
		duration: 0,
		onFieldResidual() {
			const sideOne = this.sides[0];
			const sideTwo = this.sides[1];
			//if (pokemon.hp && pokemon.side !== sideOne) return;
			//if (sideOne.noChange && sideTwo.noChange) return;
			this.add(`c:|${Math.floor(Date.now() / 1000)}||\/raw <div class="infobox"><details class="readmore code"><summary> <div class="summary-content-wrapper"><table class="summary-table"><thead><tr><th colspan="2">${sideOne.name}</th><td>|</td><th colspan="2">${sideTwo.name}</th></tr></thead><tbody><br><tr><td>Miss:</td><td>${roundNum(sideOne.miss, 2)}</td><td>|</td><td>Miss:</td><td>${roundNum(sideTwo.miss, 2)}</td></tr><<td>Effect:</td><td>${roundNum(sideOne.effect, 2)}</td><td>|</td><td>Effect:</td><td>${roundNum(sideTwo.effect, 2)}</td></tr><tr><td>Critical Hit:</td><td>${roundNum(sideOne.crit, 2)}</td><td>|</td><td>Critical Hit:</td><td>${roundNum(sideTwo.crit, 2)}</td></tr><<td>Status:</td><td>${roundNum(sideOne.status, 2)}</td><td>|</td><td>Status:</td><td>${roundNum(sideTwo.status, 2)}</td></tr></tbody></table></div></summary>`);
		},
	},
};
