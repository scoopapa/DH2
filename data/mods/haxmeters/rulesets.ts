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
					pokemon.sleepTurns = 0;
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
			/*if (pokemon.status === 'slp') {
				if (!pokemon.sleepFromRest) pokemon.statuses.push('NonRestSleep');
			} */
			if (pokemon.status === 'slp') pokemon.statuses.push('Sleep');
			else {
				pokemon.sleepFromRest = false;
				pokemon.sleepTurns = 0;
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
			if (!pokemon.statuses || pokemon.statuses.length === 0) return;
			let multiplier = 1;
			let canMove = true;			
			//let clauses = 0;
			//let frozen = false;
			//let prefix;
			//let suffix;
			for (const status of pokemon.statuses) {
				let toAdd = 0;
				//let nonVolatileStatus = false;
				switch(status) {
					case 'Sleep':
						/*
						if (pokemon.hasAbility('earlybird')) {
							pokemon.statusState.time--;
						}
						pokemon.statusState.time--;
						if (pokemon.statusState.time <= 0) {
							pokemon.cureStatus();
							pokemon.sleepFromRest = false;
							pokemon.sleepTurns = 0;
						}		
						if (pokemon.sleepFromRest) {
							toAdd = 100;
							clauses++;
						}		*/		
						if (!pokemon.sleepFromRest) {
							let sleepMeterIncreases;
							if (pokemon.hasAbility('earlybird')) {
								sleepMeterIncreases = [200 / 3, 0];
							}
							else {
								sleepMeterIncreases = [100, 200 / 3, 50, 0];
							}
							toAdd = sleepMeterIncreases[pokemon.sleepTurns];
							//clauses++;
						}
						break;						
					/*case 'NonRestSleep':
						const sleepMeterIncreases = [100, 200 / 3, 50, 0];
						toAdd = sleepMeterIncreases[pokemon.nonRestSleepTurns];
						clauses++;
						break;
					*/
					case 'Freeze':
						if (move.flags['defrost']) break;
						toAdd = 80;
						//nonVolatileStatus = true;
						//clauses++;
						break;
					case 'Flinch':
						toAdd = pokemon.flinchChance;
						pokemon.flinchChance = 0;
						//clauses++;		
						break;				
					case 'Confusion':
						if (pokemon.volatiles['confusion']) {
							this.add('-activate', pokemon, 'confusion');
							toAdd = 33;
							//clauses++;
							break;
						} 
						else continue;
					case 'Infatuation':
						this.add('-activate', pokemon, 'move: Attract', '[of] ' + target);
						toAdd = 50;
						//clauses++;
						break;
					case 'Paralysis':
						toAdd = 25;
						//nonVolatileStatus = true;
						//clauses++;
						break;						
				}
				let product = toAdd * multiplier;
				/*
				if (prefix.length === 0) {
					
					if (status === 'Sleep') {
						if (!pokemon.sleepFromRest) {
							let quantifier;
							switch(pokemon.sleepTurns) {
								case 0:
									quantifier = '1st';
									break;	
								case 1:
									quantifier = '2nd';
									break;
								case 2:
									quantifier = '3rd';
									break;
							}
							prefix = `${quantifier} Turn Sleep`;
						}
					}
					else prefix = status;
					suffix = roundNum(toAdd, 3);
					
				}
				*/
				if (toAdd > 0) {
					let prefix = '';
					let suffix;
					if (pokemon.statuses[0] === status) {
						if (status === 'Sleep' && !pokemon.sleepFromRest) {
							let quantifier;
							switch(pokemon.sleepTurns) {
								case 0:
									quantifier = '1st';
									break;	
								case 1:
									quantifier = '2nd';
									break;
								case 2:
									quantifier = '3rd';
									break;
							}
							prefix = `${quantifier} Turn Sleep`;
						}
						else prefix = status;	
						suffix = roundNum(toAdd, 3);					
						//if (nonVolatileStatus) this.add('-message', `\n(${status}: ${suffix})`);
						//else this.add('-message', `(${status}: ${suffix})`);
					}
					else {
						for (let i = 0; i < pokemon.statuses.length; i++) {
							if (pokemon.statuses[i+1] === status) {
								prefix += `${pokemon.statuses[i]} Checked + ${status}`;
								break;
							}
							else {
								prefix += `${pokemon.statuses[i]}, `;
							}
						}
						suffix = roundNum(multiplier, 3) + ' * ' + roundNum(toAdd, 3) + ' = ' + roundNum(product, 3);
					}
					this.add('-message', `(${prefix}: ${suffix})`);
				}
				if (status === 'Sleep' && pokemon.sleepFromRest) {
					if ((pokemon.hasAbility('earlybird') && pokemon.sleepTurns === 1) || 
					(!pokemon.hasAbility('earlybird') && pokemon.sleepTurns === 2)) {
						pokemon.cureStatus();
						pokemon.sleepFromRest = false;
						pokemon.sleepTurns = 0;
					}
					else {
						this.add('cant', pokemon, 'slp');
						pokemon.sleepTurns++;
						if (!move.sleepUsable) {
							return false;
						}
					}
				}
				else {
					pokemon.side.addStatus(product);	
					multiplier *= (1 - (toAdd / 100));
					/*
					if (prefix.length !== 0 && prefix !== status) {
						if (prefix.includes('Turn Sleep')) {
							prefix = 'Sleep';
						}
						else {
							prefix += (' + No ' + status);
						}
					}
					*/
					if (pokemon.side.status >= 100) {
						canMove = false;
						pokemon.side.subtractStatus(100);
						switch(status) {
							case 'Sleep':
								this.add('cant', pokemon, 'slp');
								pokemon.sleepTurns++;
								if (move.sleepUsable) {
									canMove = true;
									multiplier = 1;
								}
								break;
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
						if (status === 'Sleep' && !move.sleepUsable) {
							return false;
						}
						else if (status === 'Freeze') return false;
					}
					//if (!move.sleepUsable || status !== 'Sleep') {
					else if (status === 'Sleep') {
						pokemon.cureStatus();
						pokemon.sleepFromRest = false;
						pokemon.sleepTurns = 0;
					}
					else if (status === 'Freeze') pokemon.cureStatus();
				}		
			}
			return canMove;
		},
    },
};