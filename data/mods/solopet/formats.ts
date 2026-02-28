import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Monopet",
		desc: [
			`<b>Monopet</b>: A Gen 9 Solomod where you can only use teams consisting of the same kind of pet.`,
		],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10394103">Post in the Solomods Megathread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1P1yLe5b8Wy15v9zL0iAfa4P4rtd1K72YgMx8EZu_FbY/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'solopet',
		ruleset: ['Standard', 'Terastal Clause', 'Data Mod'],
		banlist: [
			'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Razor Fang', 'Baton Pass', 'Last Respects',
			'Shed Tail', 'Power Construct', 'Sneasler', 'Mewtwo', 'Zacian', 'Zamazenta', 'Naganadel', 'Palkia-Origin', 'Spectrier', 'Chi-Yu',
			'Dracovish', 'Dragapult', 'Roaring Moon', 'Groudon', 'Miraidon', 'Koraidon', 'Zygarde-Base', 'Rayquaza', 'Battle Bond', 'Greninja-Bond',
		],
		onValidateTeam(team, format, teamHas) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			let era : string[] = [];
			let allowedTiers = ['Birds', 'Cats', 'Dogs', 'Farm', 'Fish', 'Fox', 'Frog', 'Lizard', 'Rock', 'Rodent', 'Turtle'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				let tier = template.tier;
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Solopet.'];
				}
				if (!(era.includes(tier))) {
					era.push(tier)
				}
			}
			if (era.length > 1) return ['Each Pokemon needs to be from the same category.'];
		},
	}
];