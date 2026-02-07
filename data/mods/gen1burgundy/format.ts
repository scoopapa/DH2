import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 1] Burgundy Version",
		desc: `<b>[Gen 1] Burgundy Version</b>: An expansion of the Gen 1 OU metagame that changes some mechanics and adds new Pokemon and moves, both original and from later gens.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-1-burgundy-version-slate-3-new-moves-voting.3711525/">Burgundy Version on Smogon Forums</a>`,
		],
		mod: 'gen1burgundy',
		ruleset: ['Standard With Dig and Fly', 'Data Mod', 'Allow Tradeback'],
		banlist: ['Uber'],
		unbanlist: ['Anorith', 'Armaldo', 'Meditite', 'Medicham', 'Fletchling', 'Fletchinder', 'Talonflame', 'Sneasel-Hisui', 'Sneasler', 'Snover', 'Abomasnow',
					  ],
    };