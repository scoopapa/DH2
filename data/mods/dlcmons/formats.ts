import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 6] DLCmons V3",
		desc: '<b>DLCmons</b>: This Pet Mods aims at creating DLCs for Pokemon games, like how the Expansion Pass worked for Galar. This will include adding existing Pokemon that are not in the chosen regional Pokedex, adding new ones, creating regional formes, items, moves... This will be a pretty diverse project!',
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/dlcmons-v3-returns.3754885/">DLCmons v3 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
		      ],
		ruleset: ['Standard', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'AG', 'Uber',
			'Arena Trap', 'Power Construct', 'Shadow Tag',
			'Baton Pass',
			'King\'s Rock', 'Razor Fang', 'Quick Claw',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'Kalos OU' && template.tier !== 'Kalos' && template.tier !== 'Kalos (NFE)' && template.tier !== 'Kalos (LC)' && template.tier !== 'Kalos Uber') {
					return [set.species + ' is not a part of the Kalos Pokédex.'];
				}
				else if (template.tier === 'Kalos Uber') {
					return [set.species + ' is banned from DLCmons.'];
				}
			}
		},
		mod: 'dlcmons',
	},
	{
		name: "[Gen 6] DLCmons V3 VGC",
		desc: `A fun metagame where we try to make everything viable, or at least usable. We also have new Fakemons!`,
		threads: [
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1YJXE8wUNJijWSfNKIUqgObN5uEVgTliewTluGe0w4Y4/edit?usp=sharing">Spreadsheet for the mod</a>`,
		],
		mod: 'dlcmons',
		gameType: 'doubles',
		ruleset: ['Adjust Level = 50', 'VGC Timer', 'Data Mod', 'Mega Data Mod'],
		banlist: [
			'Mewtwo', 'Mew',
			'Lugia', 'Ho-Oh', 'Celebi',
			'Kyogre', 'Groudon', 'Rayquaza', 'Jirachi', 'Deoxys',
			'Dialga', 'Palkia', 'Giratina', 'Phione', 'Manaphy', 'Darkrai', 'Shaymin', 'Arceus',
			'Victini', 'Reshiram', 'Zekrom', 'Kyurem', 'Keldeo', 'Meloetta', 'Genesect',
			'Xerneas', 'Yveltal', 'Zygarde', 'Diancie', 'Hoopa', 'Volcanion',
			'Cosmog', 'Cosmoem', 'Solgaleo', 'Lunala', 'Necrozma', 'Magearna', 'Marshadow', 'Zeraora',
			'Zacian', 'Zamazenta', 'Eternatus', 'Zarude', 'Calyrex',
			'Koraidon', 'Miraidon',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'Kalos OU' && template.tier !== 'Kalos' && template.tier !== 'Kalos (NFE)' && template.tier !== 'Kalos (LC)') {
					return [set.species + ' is not a part of the Kalos Pokédex.'];
				}
			}
		},
	}
];