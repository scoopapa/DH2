import { FormatData } from '../../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Pokemon Throne OU (WIP)",
		teambuilderFormat: 'National Dex',
		threads: [],
		mod: 'pokemonthrone',
		ruleset: ['Standard NatDex', 'Data Mod', 'Mega Data Mod', 'Species Clause', 'Force Open Team Sheets', 'nohptypeiv'],
		banlist: ['Arceus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chien-Pao', 'Chi-Yu',
				'Deoxys', 'Deoxys-Attack', 'Dialga', 'Dialga-Origin', 'Eternatus', 'Genesect',
				'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Kyurem-Black',
				'Landorus-Incarnate', 'Lugia', 'Lunala', 'Marshadow', 'Mewtwo', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
				'Palkia', 'Palkia-Origin', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Solgaleo', 'Spectrier',
				'Ursaluna-Bloodmoon', 'Urshifu-Single-Strike', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zekrom', 'Zygarde-50%',],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['OU', 'UUBL', 'UU', 'RUBL', 'RU', 'NUBL', 'NU', 'PUBL', 'PU', 'ZUBL', 'ZU', 'NFE', 'LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Pokemon Throne.'];
				}
			}
		},
	},
];