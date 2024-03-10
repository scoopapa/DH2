export const Rulesets: {[k: string]: ModdedFormatData} = {
	shadowmovesclause: {
		effectType: 'ValidatorRule',
		name: 'Shadow Moves Clause',
		desc: "Bans non-Shadow Pokemon from having Shadow moves.",
		onBegin() {
			this.add('rule', 'Shadow Moves Clause: Bans non-Shadow Pokemon from having Shadow moves');
		},
		onValidateSet(set) {
			const problems: string[] = [];
			if (set.moves) {
				for (const moveId of set.moves) {
					const move = this.dex.moves.get(moveId);
			    	const item = this.dex.items.get(set.item);
					if (move.type === 'Shadow' && item.id !== 'shadowadapter') problems.push(move.name + ' can only be used by Shadow Pokemon, who need to hold a Shadow Adapter.');
				}
			}
			return problems;
		},
	},
};
