import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Beaftopia",
		desc: `<b>[Gen 9] Beaftopia</b>: A meta where the only legal Pokemon are made by Beaf Cultist, the greatest Pet Modder.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-10762760">Post in Solomods Megathread</a>`,
		],
		mod: 'beaftopia',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Terastal Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Mega Data Mod', 'Data Mod', 'Status Mod'],
		banlist: ['King\'s Rock', 'Razor Fang'],
		teambuilderFormat: 'National Dex',
		onValidateTeam(team, format) {
			let speciesTable = {};
			let allowedTiers = ['OU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (template.tier !== 'BT OU') {
					return [set.species + ' is not legal in [Gen 9] Beaftopia.'];
				}
			}
		},
	};