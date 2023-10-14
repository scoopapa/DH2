export const Rulesets: {[k: string]: ModdedFormatData} = {
	partialtrappingclause: {
		effectType: 'ValidatorRule',
		name: 'Partial Trapping Clause',
		desc: "Bans moves that partially trap the opponent (later gen additions)",
		banlist: ['Infestation', 'Magma Storm', 'Sand Tomb', 'Snap Trap', 'Thunder Cage', 'Whirlpool'],
		onBegin() {
			this.add('rule', 'Partial Trapping Clause: Partial Trapping moves are banned');
		},
	},
	protectclause: {
		effectType: 'ValidatorRule',
		name: 'Protect Clause',
		desc: "Bans moves that protect the user",
		banlist: ['Protect', 'Baneful Bunker', 'Detect', 'King\u2019s Shield', 'Obstruct', 'Silk Trap', 'Spiky Shield'],
		onBegin() {
			this.add('rule', 'Protect Clause: Protecting moves are banned');
		},
	},
};
