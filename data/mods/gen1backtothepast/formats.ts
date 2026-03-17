import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
	   name: "[Gen 1] Back to the Past",
	   desc: `<b>[Gen 1] Back to the Past</b>: Adapting future gen moves and Pokemon into RBY`,
	   threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/gen-1-back-to-the-past-slate-1-moves.3757618/">Back to the Past on Smogon Forums</a>`,
	   ],
	  mod: 'gen1backtothepast',
	  ruleset: ['Standard', 'Data Mod'],
		banlist: ['Uber'],
		unbanlist: ['Seismitoad', 'Masquerain', 'Cursola', 'Skitter Smack', 'Burn Up', 'Drain Punch', 'Sappy Seed', "Focus Punch", 'Mud Shot',
					],
	}
];