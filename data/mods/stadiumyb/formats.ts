import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Stadium YB 3v3 Random Battle",
		desc: [
			"<b>Stadium YB</b>: A randomized metagame where each player is given a set of rental Pokemon to battle with."
		],
		threads: [
			`&bullet; <a href="placeholder">Stadium YB in the Solomods Megathread</a>`,
		],
		mod: 'stadiumyb',
		team: 'random',
		bestOfDefault: true,
		ruleset: [
			'Cancel Mod', 'Sleep Clause Mod', 'Endless Battle Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Team Preview',
			'Species Clause', 'Dynamax Clause', 'Exact HP Mod', 'Force Open Team Sheets', 'Picked Team Size = 3', 'Max Team Size = 6',
		],
		onSwitchIn(pokemon) {
			const speed = pokemon.getStat('spe', false, true);
			this.add('-message', `${pokemon.name}'s Speed stat is ${speed}!`);
		},
	},
	{
		name: "[Gen 9] Stadium YB 6v6 Random Battle",
		desc: [
			"<b>Stadium YB</b>: A randomized metagame where each player is given a set of rental Pokemon to battle with."
		],
		threads: [
			`&bullet; <a href="placeholder">Stadium YB in the Solomods Megathread</a>`,
		],
		mod: 'stadiumyb',
		team: 'random',
		bestOfDefault: true,
		ruleset: [
			'Cancel Mod', 'Sleep Clause Mod', 'Endless Battle Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Team Preview',
			'Species Clause', 'Dynamax Clause', 'Exact HP Mod', 'Force Open Team Sheets', 'Picked Team Size = 6', 'Max Team Size = 12',
		],
		onSwitchIn(pokemon) {
			const speed = pokemon.getStat('spe', false, true);
			this.add('-message', `${pokemon.name}'s Speed stat is ${speed}!`);
		},
	}
];