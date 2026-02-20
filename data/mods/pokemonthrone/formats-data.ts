 export const Formats: FormatList = [
 	{
		name: "[Pokemon Throne] NatDex OU",
		teambuilderFormat: 'National Dex',
		threads: [],
		mod: 'pokemonthrone',
		ruleset: ['HP Percentage Mod', 'Species Clause', 'Endless Battle Clause', 'Force Open Team Sheets',],
		banlist: ['Arceus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chien-Pao', 'Chi-Yu',
				'Deoxys', 'Deoxys-Attack', 'Dialga', 'Dialga-Origin', 'Eternatus', 'Genesect',
				'Giritina', 'Giritina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Kyurem-Black',
				'Landorus-Incarnate', 'Lugia', 'Luanala', 'Marshadow', 'Mewtwo', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
				'Palkia', 'Palkia-Origin', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Solgaleo', 'Spectrier',
				'Ursaluna-Bloodmoon', 'Urishifu-Single-Strike', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zekrom', 'Zygarde-50%', 
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['OU', 'UUBL', 'UU', 'RUBL', 'RU', 'NUBL', 'NU', 'PUBL', 'PU', 'ZUBL', 'ZU', 'NFE', 'LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in [Pokemon Throne] National Dex OU'];
				}
			}
		},
	},
	{
		name: "[Pokemon Throne] NatDex OU - Closed Teamsheet",
		teambuilderFormat: 'National Dex',
		threads: [],
		mod: 'pokemonthrone',
		ruleset: ['HP Percentage Mod', 'Species Clause', 'Endless Battle Clause'],
		banlist: ['Arceus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chien-Pao', 'Chi-Yu',
				'Deoxys', 'Deoxys-Attack', 'Dialga', 'Dialga-Origin', 'Eternatus', 'Genesect',
				'Giritina', 'Giritina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Kyurem-Black',
				'Landorus-Incarnate', 'Lugia', 'Luanala', 'Marshadow', 'Mewtwo', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane',
				'Palkia', 'Palkia-Origin', 'Pheromosa', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Solgaleo', 'Spectrier',
				'Ursaluna-Bloodmoon', 'Urishifu-Single-Strike', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zekrom', 'Zygarde-50%', 
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['OU', 'UUBL', 'UU', 'RUBL', 'RU', 'NUBL', 'NU', 'PUBL', 'PU', 'ZUBL', 'ZU', 'NFE', 'LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in [Pokemon Throne] National Dex OU'];
				}
			}
		},
	},
	{
		name: "[Pokemon Throne] NatDex Doubles OU",
		teambuilderFormat: 'National Dex',
		threads: [],
		mod: 'pokemonthrone',
		gameType: 'doubles',
		ruleset: ['HP Percentage Mod', 'Species Clause', 'Endless Battle Clause', 'Force Open Team Sheets',],
		banlist: ['Arceus', 'Calyrex-Ice', 'Calyrex-Shadow', 'Dialga', 'Dialga-Origin', 'Eternatus', 'Genesect',
				'Giritina', 'Giritina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Kyurem-Black',
				'Lugia', 'Luanala', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Palkia', 'Palkia-Origin', 
				'Pheromosa', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Solgaleo',
				'Urishifu-Single-Strike', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zekrom', 'Zamazenta',
				'Genesect-Douse', 'Genesect-Shock', 'Genesect-Burn', 'Genesect-Chill',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['DOU', 'DUU', '(DUU)', 'NFE', 'LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in [Pokemon Throne] National Dex OU'];
				}
			}
		},
	},
	{
		name: "[Pokemon Throne] VGC REG A",
		teambuilderFormat: 'National Dex',
		threads: [],
		mod: 'pokemonthrone',
		gameType: 'doubles',
		bestOfDefault: true,
		ruleset: ['HP Percentage Mod', 'Species Clause', 'Item Clause', 'Picked Team Size = 4', 'Adjust Level = 50', 'VGC Timer', 'Open Team Sheets'],
		banlist: [
			'Restricted Legendary', 'Mythical',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['REG A', 'NFE', 'LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in [Pokemon Throne] National Dex OU'];
				}
			}
		},
	},
	{
		name: "[Pokemon Throne] VGC REG B",
		teambuilderFormat: 'National Dex',
		threads: [],
		mod: 'pokemonthrone',
		gameType: 'doubles',
		bestOfDefault: true,
		ruleset: ['HP Percentage Mod', 'Species Clause', 'Item Clause', 'Picked Team Size = 4', 'Adjust Level = 50', 'VGC Timer', 'Open Team Sheets'],
		banlist: [
			'Restricted Legendary', 'Arceus',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['REG A', 'NFE', 'LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in [Pokemon Throne] National Dex OU'];
				}
			}
		},
	},
 ]