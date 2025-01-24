export const Rulesets: {[k: string]: ModdedFormatData} = {
	paramovesclause: {
		effectType: 'ValidatorRule',
		name: 'Para Moves Clause',
		desc: "Bans all moves that induce paralysis, such as Thunder Wave",
		banlist: ['Nuzzle', 'Zap Cannon'],
		onBegin() {
			this.add('rule', 'Para Moves Clause: Paralysis-inducing moves are banned');
		},
		onValidateSet(set) {
			const problems = [];
			if (set.moves) {
				for (const id of set.moves) {
					const move = this.dex.moves.get(id);
					if (move.status === 'par') problems.push(move.name + ' is banned by Para Moves Clause.');
				}
			}
			return problems;
		},
	},
};
