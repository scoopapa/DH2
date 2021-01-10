export const Formats: {[k: string]: FormatData} = {
	ohkoclause: {
		effectType: 'ValidatorRule',
		name: 'OHKO Clause',
		desc: "Bans all OHKO moves, such as Fissure",
		onBegin() {
			this.add('rule', 'OHKO Clause: OHKO moves are banned (except Escavalier :P)');
		},
		onValidateSet(set) {
			const problems: string[] = [];
			if (set.moves) {
				for (const moveId of set.moves) {
					const move = this.dex.getMove(moveId);
					if (move.ohko) problems.push(move.name + ' is banned by OHKO Clause.');
					if (set.species === 'Escavalier') continue;
					if (move.name === 'Guillotine') problems.push(move.name + ' is banned by OHKO Clause.');
					if (move.ohko === 'Horn Drill') problems.push(move.name + ' is banned by OHKO Clause.');
				}
			}
			return problems;
		},
	},
};
