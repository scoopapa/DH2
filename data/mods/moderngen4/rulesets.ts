export const Rulesets: {[k: string]: ModdedFormatData} = {
	zmoveclause: {
		effectType: 'ValidatorRule',
		name: 'Z-Move Clause',
		desc: "Bans Pok&eacute;mon from holding Z-Crystals",
		onValidateSet(set) {
			const item = this.dex.items.get(set.item);
			if (item.zMove) return [`${set.name || set.species}'s item ${item.name} is banned by Z-Move Clause.`];
		},
		onBegin() {
			this.add('rule', 'Z-Move Clause: Z-Moves are banned');
		},
	},
};
