import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] M4A Paldea VGC",
		desc: ["Megas for All v7 but it's a VGC format",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/3671140/">Megas for All v7 on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1TdeAUUtjh0f_tcIBllbF_imgepwV-dV2YomoTCRlPgI/edit?usp=sharing">Spreadsheet</a>`,
				`&bullet; <a href="http://megasforall.wikidot.com/">Wiki</a>`
		      ],
		gameType: 'doubles',
		ruleset: ['Team Preview', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Cancel Mod', 'Picked Team Size = 4', 'Adjust Level = 50', 'VGC Timer', 'Mega Data Mod', 'Terastal Clause'],
		banlist: [
			'Mewtwo', 'Mew',
			'Lugia', 'Ho-Oh', 'Celebi',
			'Kyogre', 'Groudon', 'Rayquaza', 'Jirachi', 'Deoxys',
			'Dialga', 'Palkia', 'Giratina', 'Phione', 'Manaphy', 'Darkrai', 'Shaymin', 'Arceus',
			'Victini', 'Reshiram', 'Zekrom', 'Kyurem', 'Keldeo', 'Meloetta', 'Genesect',
			'Xerneas', 'Yveltal', 'Zygarde', 'Diancie', 'Hoopa', 'Volcanion',
			'Cosmog', 'Cosmoem', 'Solgaleo', 'Lunala', 'Necrozma', 'Magearna', 'Marshadow', 'Zeraora',
			'Zacian', 'Zamazenta', 'Eternatus', 'Zarude', 'Calyrex',
			'Koraidon', 'Miraidon', 'Pecharunt',
		],
		mod: 'm4apaldea',
		onValidateSet(set) {
			const problems: string[] = [];
			const setHas: {[k: string]: true} = {};
			let species = this.dex.species.get(set.species);
			let item = this.dex.items.get(set.item);
			let tierSpecies = species;

			if (item.megaEvolves === species.name) {
				if (item.megaStone && this.dex.species.get(item.megaStone).tier !== 'Mega') return [item.name + ' is not a legal Mega Stone.'];
			}
		},
	};