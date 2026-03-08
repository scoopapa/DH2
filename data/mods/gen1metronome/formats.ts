import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 1] Metronome Battle",
		mod: "gen1metronome",
		ruleset: ['HP Percentage Mod', 'Cancel Mod', 'Desync Clause Mod', 'Sleep Clause Mod', 'Nickname Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'Max Team Size = 1'],
		banlist: [`Mewtwo`, 'Unreleased', 'Unobtainable', 'Nonexistent'],
		unbanlist: [`Mew`, `MissingNo.`],
		onValidateSet(set) {
			if (set.moves.length !== 1 || this.dex.moves.get(set.moves[0]).id !== 'metronome') {
				return [`${set.name || set.species} has illegal moves.`, `(Pok\u00e9mon can only have one Metronome in their moveset)`];
			}
		},
	}
];