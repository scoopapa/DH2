import {Utils} from "../lib";
import {Pokemon} from "../sim/pokemon";

// The list of formats is stored in config/formats.js
export const Rulesets: {[k: string]: FormatData} = {
	megastoneclause: {
		effectType: 'ValidatorRule',
		name: 'Mega Stone Clause',
		desc: "Bans Pokemon from holding mega stones",
		onValidateSet(set) {
			const item = this.dex.items.get(set.item);
			if (item.megaStone) return [`${set.name || set.species}'s item ${item.name} is banned by Mega Stone Clause.`];
		},
		onBegin() {
			this.add('rule', 'Mega Stone Clause: Mega stones are banned');
		},
	},
};