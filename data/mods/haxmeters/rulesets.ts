export function roundNum(n: number, places: number): number {
	return Math.round((n + Number.EPSILON) * Math.pow(10, places)) / Math.pow(10, places);
}

export function randomMeterValue(): number {
	return 10 * Math.floor(6 * Math.random() + 2);
}

export const Rulesets: {[k: string]: ModdedFormatData} = {
	haxmeterrule: {
        effectType: 'Rule',
        name: 'Hax Meter Rule',
        desc: "Implements the Hax Meter",
		onBegin() {
			this.field.addPseudoWeather('haxmeterweather');
			const missValue = randomMeterValue()
			const effectValue = randomMeterValue()
			const critValue = randomMeterValue()
			const statusValue = randomMeterValue()
			for (const side of this.sides) {
				side.miss = missValue;
				side.effect = effectValue;
				side.crit = critValue;
				side.status = statusValue;
				//side.flinchChance = 0;

				side.pmiss = missValue;
				side.peffect = effectValue;
				side.pcrit = critValue;
				side.pstatus = statusValue;
				for (const pokemon of side.pokemon) {
					pokemon.statuses = [];
					pokemon.sleepFromRest = false;
					pokemon.nonRestSleepTurns = 0;
				}
			}
			const sideOne = this.sides[0];
			const sideTwo = this.sides[1];
			this.add(`c:|${Math.floor(Date.now() / 1000)}||\/raw <div class="infobox"><details class="readmore code"><summary> <div class="summary-content-wrapper"><table class="summary-table"><thead><tr><th colspan="2">${sideOne.name}</th><td>|</td><th colspan="2">${sideTwo.name}</th></tr></thead><tbody><br><tr><td>Miss:</td><td>${roundNum(sideOne.miss, 2)}</td><td>|</td><td>Miss:</td><td>${roundNum(sideTwo.miss, 2)}</td></tr><<td>Effect:</td><td>${roundNum(sideOne.effect, 2)}</td><td>|</td><td>Effect:</td><td>${roundNum(sideTwo.effect, 2)}</td></tr><tr><td>Critical Hit:</td><td>${roundNum(sideOne.crit, 2)}</td><td>|</td><td>Critical Hit:</td><td>${roundNum(sideTwo.crit, 2)}</td></tr><<td>Status:</td><td>${roundNum(sideOne.status, 2)}</td><td>|</td><td>Status:</td><td>${roundNum(sideTwo.status, 2)}</td></tr></tbody></table></div></summary>`);
		},
		onBeforeTurn(pokemon) {
			pokemon.flinchChance = 0;
		},
		onUpdate(pokemon) {
			pokemon.statuses = [];
			if (pokemon.status === 'slp') {
				if (!pokemon.sleepFromRest) pokemon.statuses.push('NonRestSleep');
			} 
			else {
				pokemon.sleepFromRest = false;
				pokemon.nonRestSleepTurns = 0;
			}
			/*
			if (pokemon.nonRestSleep) {
				if (pokemon.status === 'slp') pokemon.statuses.push('NonRestSleep');
				else {
					pokemon.nonRestSleep = false;
					pokemon.nonRestSleepTurns = 0;
				}
			}*/
			if (pokemon.status === 'frz') pokemon.statuses.push('Freeze');
			if (pokemon.flinchChance > 0) pokemon.statuses.push('Flinch');
			if (pokemon.volatiles['confusion']) pokemon.statuses.push('Confusion');
			if (pokemon.volatiles['attract']) pokemon.statuses.push('Infatuation');
			if (pokemon.status === 'par') pokemon.statuses.push('Paralysis');
		},
		onBeforeMove(pokemon, target, move) {
			//if (pokemon !== target) target.side.flinchChance = 0;
			if (!pokemon.statuses || pokemon.statuses.length === 0) return;
			let multiplier = 1;
			let clauses = 0;
			let prefix = "";
			let suffix = "";
			for (const status of pokemon.statuses) {
				let toAdd = 0;
				//let nonVolatileStatus = false;
				switch(status) {
					case 'Freeze':
						if (move.flags['defrost']) break;
						toAdd = 80;
						//nonVolatileStatus = true;
						clauses ++;
						break;
					case 'Flinch':
						toAdd = pokemon.flinchChance;
						pokemon.flinchChance = 0;
						clauses ++;		
						break;				
					case 'Confusion':
						if (pokemon.volatiles['confusion']) {
							this.add('-activate', pokemon, 'confusion');
							toAdd = 33;
							clauses ++;
							break;
						} else continue;
					case 'Infatuation':
						this.add('-activate', pokemon, 'move: Attract', '[of] ' + target);
						toAdd = 50;
						clauses ++;
						break;
					case 'Paralysis':
						toAdd = 25;
						//nonVolatileStatus = true;
						clauses ++;
						break;						
				}
				let product = toAdd * multiplier;
				if (prefix.length === 0) {
					prefix = status;
					suffix = toAdd;
				} else suffix = roundNum(multiplier, 3) + ' * ' + roundNum(toAdd, 3) + ' = ' + roundNum(product, 3);
				if (toAdd > 0) {
					if (clauses === 1) {
						//if (nonVolatileStatus) this.add('-message', `\n(${status}: ${suffix})`);
						//else this.add('-message', `(${status}: ${suffix})`);
						this.add('-message', `(${status}: ${suffix})`);
					}
					else this.add('-message', `(No ${prefix} + ${status}: ${suffix})`);
				}
				pokemon.side.addStatus(product);
				multiplier *= (1 - (toAdd / 100));
				if (prefix.length !== 0 && prefix !== status) {
					prefix += (' + No ' + status);
				}
				if (pokemon.side.status >= 100) {
					pokemon.side.subtractStatus(100);
					switch(status) {
						case 'Freeze':
							this.add('cant', pokemon, 'frz');
							break;
						case 'Flinch':
							this.add('cant', pokemon, 'flinch');
							break;
						case 'Confusion':
							this.activeTarget = pokemon;
							const damage = this.actions.getConfusionDamage(pokemon, 40);
							if (typeof damage !== 'number') throw new Error("Confusion damage not dealt");
							const activeMove = { id: this.toID('confused'), effectType: 'Move', type: '???' };
							this.damage(damage, pokemon, pokemon, activeMove as ActiveMove);
							break;
						case 'Infatuation':
							this.add('cant', pokemon, 'Attract');
							break;
						case 'Paralysis':
							this.add('cant', pokemon, 'par');
							break;						
					}
					return false;
				} else if (pokemon.status === 'frz') pokemon.cureStatus();
			}
		},
    },
};