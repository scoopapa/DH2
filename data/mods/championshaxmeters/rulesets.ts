export function missMeterInitialValue(): number {
	return randomMultipleOf10();
}

export function effectMeterInitialValue(): number {
	return randomMultipleOf10();
}

export function critMeterInitialValue(): number {
	return randomMultipleOf12Point5();
}

export function statusMeterInitialValue(): number {
	return randomMultipleOf12Point5();
}

import {Rulesets as BaseRulesets} from '../haxmeters/rulesets';
export const Rulesets = {...BaseRulesets};