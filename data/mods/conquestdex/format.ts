import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Conquest Dex",
		mod: 'conquestdex',
		desc: `A metagame based on the pokemon side game pokemon conquest`,
		ruleset: ['Standard NatDex', 'Data Mod', 'Terastal Clause', 'Z-Move Clause', 'Mega Stone Clause'],
		banlist: ['Arceus', 'Dialga', 'Rayquaza', 'Zekrom', 'Reshiram', 'Mewtwo', 'Groudon'],
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9883990">Conquest Dex on Smogon Forums</a>`,
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Conq'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Conquest Dex.'];
    	    }
   	   }
   	 },
	};