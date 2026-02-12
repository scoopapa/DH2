import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Return to Orre: Tercera",
	   desc: [
			"This is a micrometa that only uses Pokemon obtainable in Colosseum and XD.",
		],
		threads: [
			'&bullet; <a href="https://www.smogon.com/forums/threads/return-to-orre-tercera-open-for-submissions.3722389/">RTO: Tercera</a>',
		],
		mod: 'returntoorretercera',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Picked Team Size = 3', 'Adjust Level = 50', 'VGC Timer'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
		   'Aerodactylite', 'Alakazite', 'Beedrillite', 'Blastoisinite', 'Charizardite X', 'Charizardite Y', 'Gengarite',
         'Gyaradosite', 'Kangaskhanite', 'Mewtwonite X', 'Mewtwonite Y', 'Pidgeotite', 'Pinsirite', 'Slowbronite', 'Venusaurite',
			'Lugia', 'Ho-Oh', 'All Items'
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'TERCERA' && template.tier !== 'TERCERA NFE') {
					return [set.species + ' is not usable in Return to Orre: Tercera.'];
				}
			}
		},
	};