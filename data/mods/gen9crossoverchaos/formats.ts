import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Crossover Chaos [Defunct]",
		desc: `Crossover Chaos, a micrometa designed to crossover characters from video game titles.`,
		threads: [
			`<a href="https://www.smogon.com/forums/threads/gen-9-crossover-chaos.3711854/#post-9421623">Gen 9 Crossover Chaos</a>`,
		],
		mod: 'gen9crossoverchaos',
		teambuilderFormat: "National Dex",
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', 'Terastal Clause', /* 'Mega Data Mod' */],
		onChangeSet(set) {
			const item = this.toID(set.item);
			if (set.species === 'King Dedede' || set.species === 'Masked Dedede') {
				if (item === 'dededesmask') {
					set.species = 'Masked Dedede';
					let attackOrder = set.moves.indexOf('attackorder');
					if (attackOrder >= 0) {
						set.moves[attackOrder] = 'gigatonhammer';
					}
					let beatup = set.moves.indexOf('beatup');
					if (beatup >= 0) {
						set.moves[beatup] = 'electrohammer';
					}
				}
				else {
					set.species = 'King Dedede';
				}
			}
		},
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['CC OU', 'CC UU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Crossover Chaos Gen 9.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Crossover Chaos AG [Defunct]",
		desc: `Crossover Chaos, allowing mons in CC Ubers and unintroduced to be used.`,
		threads: [
			`<a href="https://www.smogon.com/forums/threads/gen-9-crossover-chaos.3711854/#post-9421623">Gen 9 Crossover Chaos</a>`,
		],
		mod: 'gen9crossoverchaos',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Moves Clause', 'Species Clause', 'Dynamax Clause', 'Data Mod', 'Sleep Clause Mod', 'Terastal Clause', /* 'Mega Data Mod' */],
		onChangeSet(set) {
			const item = this.toID(set.item);
			if (set.species === 'King Dedede' || set.species === 'Masked Dedede') {
				if (item === 'dededesmask') {
					set.species = 'Masked Dedede';
					let attackOrder = set.moves.indexOf('attackorder');
					if (attackOrder >= 0) {
						set.moves[attackOrder] = 'gigatonhammer';
					}
					let beatup = set.moves.indexOf('beatup');
					if (beatup >= 0) {
						set.moves[beatup] = 'electrohammer';
					}
				}
				else {
					set.species = 'King Dedede';
				}
			}
		},
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['CC OU', 'CC UU', 'CC Ubers', 'unintroduced'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Crossover Chaos Gen 9 AG.'];
				}
			}
		},
	}
];