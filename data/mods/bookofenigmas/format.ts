import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Book of Enigmas",
		mod: 'bookofenigmas',
		desc: '<b>Book of Enigmas</b>: A Pet Mod that aims to create new Paradox Pokemon based on Ho-oh and Lugia - the sky and the sea, respectively.',
		threads: [
			`&bullet: <a href="https://www.smogon.com/forums/threads/book-of-enigmas-slate-0-the-beginning-custom-abilities-names.3711490/">Thread on Smogon.`,
		],
		ruleset: ['Standard NatDex', 'Data Mod', 'Terastal Clause'],
		banlist: [
			'Arena Trap', 'Moody', 'Shadow Tag', 'Baton Pass',
			'Sceptilite', 'Blazikenite', 'Swampertite', 'Gardevoirite', 'Galladite', 'Alakazite', 'Gyaradosite',
			'Sablenite', 'Mawilite', 'Aggronite', 'Medichamite', 'Manectite', 'Sharpedonite', 'Cameruptite',
			'Altarianite', 'Absolite', 'Glalitite', 'Salamencite', 'Metagrossite', 'Latiasite', 'Latiosite',
			'Garchompite', 'Steelixite', 'Beedrillite', 'Pidgeotite',
			'Blue Orb', 'Red Orb', //this is just copied from ANL's lol
			'Beedrill-Mega', 'Pidgeot-Mega', //?????
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}} */
			let speciesTable = {};
			let allowedTiers = ['BoE OU', "BoE NFE", "BoE LC"];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Book of Enigmas OU.'];
				}
			}
		},
	};