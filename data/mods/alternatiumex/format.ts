import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
	name: "[Gen 9] Alternatium EX",
		desc: `<b>Alternatium EX</b>: A metagame made up of only Pokemon with alternate forms exist, with all of them being seperate and unique Pokemon.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/alternatium-ex-slate-1-starter-pack.3701560/">Alternatium EX on Smogon Forums</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1bvvkPg1CrUBJFJJeuwkts8elfJcEcahGOoHm-vGBXOI/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'alternatiumex',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Sleep Clause Mod', 'Min Source Gen = 3', 'Terastal Clause'],
		banlist: ['All Pokemon', 'Baton Pass'],
		unbanlist: [
				'Decidueye-Hermit', 'Decidueye-Autumn', 'Typhlosion-Explosive', 'Typhlosion-Warlock', 'Samurott-Foamy', 'Samurott-Rogue',
				'Oricorio', 'Oricorio-Cheerleader','Oricorio-Pa\u2019u', 'Horrorcorio',
				'Pikachu-Kanto', 'Pikachu-Hoenn', 'Pikachu-Sinnoh', 'Pikachu-Unova', 'Pikachu-Tactic', 'Pikachu-Alola', 'Pikachu-World',
				'Ribombee', 'Ribombee-Totem', 'Araquanid', 'Araquanid-Totem', 'Vikavolt', 'Vikavolt-Totem',
				'Urshifu', 'Urshifu-Erosion', 'Calyrex-Mythic', 'Calyrex-Glacier','Calyrex-Midnight',
				'Kommo-o', 'Rockmo-o', 'Salazzle', 'Salazzle-Ruler', 'Lurantis', 'Lurantio',
				'Mr. Mime', 'Mr. Mime-Prance', 'Stunfisk', 'Stunfisk-Trap',
				'Necrozma', 'Necrozma-Lionheart', 'Necrozma-Batwing', 'Necrozma-Dragon',
				'Braviary-Patriot', 'Braviary-Hisui', 'Lilligant-Bard', 'Mistlegant', 'Electrode-Screwball','Electrode-Ringo',
				'Persian-Bandit', 'Persian-Omen', 'Meowstic-Untethered', 'Meowstic-TwoTales',
				"Indeedee-Devil", "Indeedee-Angel", "Polteageist", "Polteageist-Antique", "Toxtricity-Rock-Star", "Toxtricity-Low-Key",
				"Articuno-Mistral", "Articuno-Tsunami", "Zapdos", "Charpados", "Moltres", "Bennutres",
				"Marowak", "Alolawak", "Marowak-Alola-Totem", "Enamorus", "Violentine",
				"Dialga", "Archronos", "Palkia", "Palkia-Origin",
				"Basculin-Hot-Headed","Basculectric", "Basculin-Skyship", "Basculegion", "Basculagoon",
				"Magearna", "Magearna-Prototype", "Zarude", "Zarude-Hero",
				"Qwilfish", "Aquattack", "Zoroark-Jorogumo", "Zoroark-Hoarfrost", "Goodra-Tsunade", "Goodra-Symbiotic",
				"Maushold-Raider", "Maushold-Extended", "Oinkologne", "Oinkologne-F", "Dudunsparce", "Dududunsparce",
				"Greninja", "Greninja-Ronin", "Imperil", "Hoopa-Ifrit",
				"Kyurem", "Kyurem-Black", "Kyurem-White", "Xerneas-Dormant", "Xerneas-Justice",
				"Arcanine-Water Balloon", "Arcanine-Noble", "Avalugg-Prism", "Avalugg-Plated",
				"Squawkabilly", "Squawkabiluck", "Squawkalone", "Squawkabilly-Yellow",
				"Wishiwashi-Lonesome", "Winardin", "Palafin", "Hercuphin",
				'Gumshoos', 'Gumshoos-Totem', 'Togedemaru', 'Totemaru',
				'Tauros', 'Bravatoro', 'Tauros-Steam', 'Tauros-Azul',
				'Raichu', 'Raichu-Soft', 'Rapidash', 'Rapidash-Galar', 'Golem-Berserker', 'Golem-Alola',
				'Cherrim', 'Cherrine', 'Minior', 'Minior-Meteor', 'Eevee', 'Eevee-Starter',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (speciesTable[template.id]) {
					return ["You are limited to one of each Pokémon by Species Clause (except for different formes). ", "You have more than one " + template.id + "."];
				}
				speciesTable[template.id] = true;
			}
		},
	};