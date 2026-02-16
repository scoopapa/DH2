import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] PokeMorty",
		desc: `<b>PokeMorty</b>: A Gen 9 Mod made by SDM_0 heavily inspired by the video-game "Pocket Morty".`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9880923">Post in Solomods Megathread</a>`,
			`&bullet; <a href="https://docs.google.com/spreadsheets/d/1NwWodcuBmT4fFpgK0PNlr9MslCWm97J3_2YrYP6OZVQ/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'pokemorty',
		ruleset: ['Standard', 'Max Team Size = 5', '!Obtainable Abilities', 'Terastal Clause', '-All Items', 'Data Mod'],
		banlist: ['Implode', 'Negative Space', 'Time Dilation', 'Grill Season', 'Use The Light',
		'Unspoken Bond', 'Bird Lover', 'Apex Genius', 'Training Complete', 'Abstracted Form',
		'Higher Education', 'Cell Division', 'Infiltrate', 'Mirror Image', 'Fast Charging',
		'Death Crystal', 'Magic Door', 'Strip Dance', 'Squid Costume', 'Cut the Chut', 'Bold And Daring',
		'Attention', 'Wedgie-Proof', 'Anthocyanin', 'Grade A', 'Always Fresh', 'Present Portal', 'Impersonate',
		'Flavor Combo', 'Apology Video', 'Espionage', 'Entitlement', 'Hypnotize', 'Mouth Off', 'Doze',
		'Traumatize', 'Mind-Numbing Hello', 'Love Bug', 'Stare Down'],
		onValidateTeam(team) {
			let speciesTable = {};
			let allowedTiers = ['PM OU', 'PM NFE', 'PM LC'];
			let problems = [];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					problems.push(`${set.species} is not a Morty.`);
				}
				if (this.dex.abilities.get(set.ability).id !== "noability") {
					problems.push(`${set.species} can't have ${set.ability}.`);
				}
				if (!['bashful', 'docile', 'hardy', 'quirky', 'serious', ''].includes(this.toID(set.nature))) {
					problems.push(`${set.species} can't have a non-neutral nature.`);
				}
			}
			return problems;
		},
	}
];