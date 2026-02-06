import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
	name: "[Gen 5] 33 Valuemons",
	mod: 'gen5valuemons',
	desc: `A Draft-like meta where each Pokemon has a point value, and the team's value cannot exceed 33 points. This tier is not quite finished, but we're working on it!`,
	threads: [
		`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/page-13#post-10648141">Solomod Post</a>`,
		`&bullet; <a href="https://docs.google.com/spreadsheets/d/1Pw6VnFgz032f9yV_FcO3UT03Nrad6f5mZw2h5IMqIxU/edit?gid=299132049#gid=299132049">Reference Sheet</a>`,
		`&bullet; <a href="https://pokepast.es/34f176e6623896ab">Sample Teams</a>`,
		`&bullet; <a href="https://discord.gg/XAKtEnvU6X">33 Valuemons Discord</a>`,
	],
	ruleset: [
		'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause', 'Sleep Clause Mod',
		'Species Clause', 'Nickname Clause', 'OHKO Clause', 'Evasion Items Clause',
		'Evasion Moves Clause', 'Baton Pass Stat Clause', 'Gems Clause', 'One Starter Clause',
		'One Pseudo Clause', 'One Legendary Clause', 'Obtainable', '!Obtainable Moves',
	],
	banlist: ['King\'s Rock', 'Razor Fang'],
	unbanlist: ['Baton Pass'],
	onValidateTeam(team, format) {
		const allowedTiers = ['33v'];
		for (const set of team) {
			const template = this.dex.species.get(set.species);
			if (!allowedTiers.includes(template.tier)) {
				return [`${set.species} is not legal in 33 Valuemons.`];
			}
		}
	},
};