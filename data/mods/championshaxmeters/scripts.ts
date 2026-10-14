import {randomMultipleOf10, randomMultipleOf12Point5, Scripts as BaseScripts} from '../haxmeters/scripts';

export function championsParalysisPoints(): number {
	return 12.5;
}
export function championsSleepPoints(pokemon: Pokemon): number {
	let sleepMeterIncreases;
	if (pokemon.hasAbility('earlybird')) {
		sleepMeterIncreases = [200 / 3, 0];
	}
	else {
		sleepMeterIncreases = [100, 200 / 3, 0];
	}
	return sleepMeterIncreases[pokemon.sleepTurns];
}

export function championsFreezePoints(pokemon: Pokemon): number {
	if (pokemon.freezeTurns < 3) {
		return 75;
	}
	else {
		return 0;
	}
}

export const Scripts = {
	...BaseScripts,
	gen: 9,
	inherit: 'champions',
	missMeterInitialValue: randomMultipleOf10,
	statusMeterInitialValue: randomMultipleOf12Point5,
	paralysisPoints: championsParalysisPoints,
	sleepPoints: championsSleepPoints,
	freezePoints: championsFreezePoints,
}

