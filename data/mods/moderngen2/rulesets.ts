export const Rulesets: {[k: string]: ModdedFormatData} = {
	standardmg2: {
		effectType: 'ValidatorRule',
		name: 'Standard MG2',
		ruleset: ['Obtainable Moves', 'Obtainable Abilities', 'Obtainable Formes', 'EV Limit = Auto', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Items Clause', 'Evasion Moves Clause', 'Endless battle Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: [
			'Hypnosis + Mean Look',
			'Hypnosis + Spider Web',
			'Lovely Kiss + Mean Look',
			'Lovely Kiss + Spider Web',
			'Sing + Mean Look',
			'Sing + Spider Web',
			'Sleep Powder + Mean Look',
			'Sleep Powder + Spider Web',
			'Spore + Mean Look',
			'Spore + Spider Web',
			'Berserk Gene',
			'Dire Claw',
			'Unreleased',
			'Unobtainable',
			'Nonexistent',
		],
	},
	/*
	obtainablemiscmg2: {
		effectType: 'ValidatorRule',
		name: 'Obtainable Misc MG2',
		desc: "Validate all obtainability things that aren't moves/abilities (Gender, Events, duplicate moves).",
		onChangeSet(set) {
			const species = this.dex.species.get(set.species);
			if (species.gender) {
				if (set.gender !== species.gender) {
					set.gender = species.gender;
				}
			} else {
				if (set.gender !== 'M' && set.gender !== 'F') {
					set.gender = '';
				}
			}
			if (set.moves) {
				const hasMove: {[k: string]: true} = {};
				for (const moveId of set.moves) {
					const move = this.dex.moves.get(moveId);
					const moveid = move.id;
					if (hasMove[moveid]) return [`${species.baseSpecies} has multiple copies of ${move.name}.`];
					hasMove[moveid] = true;
				}
			}
		},
	},
 */
};
