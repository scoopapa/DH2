import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Iron Fist",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/.3748853/">Iron Fist</a>`,
		],
		mod: 'sharedpowerironfist',
		teambuilderFormat: "National Dex",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod', 'Species Clause', 'Mega Rayquaza Clause', 'Big Button Rule', 'MILF Rule', 'Ohmyrod Rule', 'Serious Rule', 'Mario Kart Wii Clause', 'I Love Hisui Rule', 'Circall Rule'],
		banlist: ['Baton Pass', 'King\'s Rock', 'Razor Fang', 'Moody',
		'Buginium Z', 'Darkinium Z', 'Dragonium Z', 'Electrium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Normalium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Waterium Z',
		'Absolite', 'Houndoominite', 'Blue Orb', 'Fish', 'Diamond Hand', 'Hoenn', 'Bird', 'Trans'],
		unbanlist: ['Light of Ruin', 'Baddy Bad'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Viable', 'Unviable', 'Untested'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Iron Fist.'];
				}
				if (set.species === 'Mario Kart Wii' && set.ability !== 'Gorilla Tactics') {
					return [set.species + ' must use Gorilla Tactics.'];
				}
			}
		}
	},
	{
		name: "[Gen 9] Iron Fist Doubles",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/.3748853/">Iron Fist</a>`,
		],
		mod: 'sharedpowerironfist',
		teambuilderFormat: "National Dex",
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Sleep Clause Mod', 'Data Mod', 'Mega Data Mod', 'Species Clause', 'Mega Rayquaza Clause', 'Big Button Rule', 'MILF Rule', 'Ohmyrod Rule', 'Serious Rule', 'Mario Kart Wii Clause', 'I Love Hisui Rule', 'Circall Rule'],
		banlist: ['Baton Pass', 'King\'s Rock', 'Razor Fang', 'Moody',
		'Buginium Z', 'Darkinium Z', 'Dragonium Z', 'Electrium Z', 'Fairium Z', 'Fightinium Z', 'Firium Z', 'Flyinium Z', 'Ghostium Z', 'Grassium Z', 'Groundium Z', 'Icium Z', 'Normalium Z', 'Poisonium Z', 'Psychium Z', 'Rockium Z', 'Steelium Z', 'Waterium Z',
		'Absolite', 'Houndoominite', 'Blue Orb', 'Fish', 'Diamond Hand', 'Hoenn', 'Bird', 'Trans'],
		unbanlist: ['Light of Ruin', 'Baddy Bad'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['DIF', 'Viable', 'Untested', 'Unviable'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Iron Fist.'];
				}
			}
		},
	}
];