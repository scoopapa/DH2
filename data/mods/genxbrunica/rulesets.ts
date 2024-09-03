export const Rulesets: import('../../../sim/dex-formats').ModdedFormatDataTable = {
	evasionabilitiesclause: {
		effectType: 'ValidatorRule',
		name: 'Evasion Abilities Clause',
		desc: "Bans abilities that boost Evasion under certain weather and terrain conditions",
		banlist: ['Sand Veil', 'Snow Cloak', 'Grassy Cloak'],
		onBegin() {
			this.add('rule', 'Evasion Abilities Clause: Evasion abilities are banned');
		},
	},
}