import {Rulesets as BaseRulesets} from '../haxmeters/rulesets';
export const Rulesets = {
	...BaseRulesets,
	ivclause: {
		effectType: 'Rule',
		name: 'IV Clause',
		desc: "All Pokemon must have 31 IVs.",
		onValidateSet(set) {
			const species = this.dex.species.get(set.species);
			if (set.ivs) {
				let stat: StatID;
				for (stat in set.evs) {
					const iv = set.ivs[stat];
					if (iv != 31) {
						return [`${set.name || set.species} must have 31 IVs in every stat.`];
					}
				}
			}
		},
	},
};