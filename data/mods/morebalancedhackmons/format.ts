import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] More Balanced Hackmons v4",
		desc: `Balanced Hackmons with National Dex elements mixed in.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3711482/">More Balanced Hackmons v4</a>`,
		],
		mod: 'morebalancedhackmons',
		// debug: true,
		ruleset: ['-Nonexistent', 'Standard NatDex', 'Forme Clause', 'Sleep Moves Clause', 'Ability Clause = 2', 'OHKO Clause', 'Evasion Moves Clause', 'Dynamax Clause', 'CFZ Clause', 'Terastal Clause', '!Obtainable'],
		banlist: [
			'Eternatus-Eternamax', 'Groudon-Primal', 'Rayquaza-Mega', 'Shedinja', 'Arena Trap',
			'Gorilla Tactics', 'Huge Power', 'Illusion', 'Innards Out', 'Magnet Pull', 'Moody', 'Parental Bond',
			'Stakeout', 'Wonder Guard', 'Gengarite', 'Belly Drum', 'Chatter', 'Double Iron Bash', 'Electrify',
			'Last Respects', 'Octolock', 'Revival Blessing', 'Shed Tail', 'Shell Smash', 'Comatose + Sleep Talk', 'Imprison + Transform',
		],
		restricted: ['Arceus'],
		onValidateTeam(team, format) {
			// baseSpecies:count
			const restrictedPokemonCount = new Map<string, number>();
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (!this.ruleTable.isRestrictedSpecies(species)) continue;
				restrictedPokemonCount.set(species.baseSpecies, (restrictedPokemonCount.get(species.baseSpecies) || 0) + 1);
			}
			for (const [baseSpecies, count] of restrictedPokemonCount) {
				if (count > 1) {
					return [
						`You are limited to one ${baseSpecies} forme.`,
						`(You have ${count} ${baseSpecies} forme${count === 1 ? '' : 's'}.)`,
					];
				}
			}
		},
	};