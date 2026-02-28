import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Fusion Evolution VGC Reg A",
		desc: ["Fusion Evolution but it's a VGC format, and a solomod run by AquaticPanic",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9929461">FEVGC on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1DoV2Vk9B2mYxwVQt9ebA2CvygBLk29az3iszycMAh2k/edit#gid=0">Spreadsheet</a>`,
		      ],
		searchShow: false,
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Open Team Sheets', 'Data Mod'],
		mod: 'gen9fevgc',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Reg A', 'Reg A NFE', 'Reg A LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Fusion Evolution.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Fusion Evolution VGC Reg A (Bo3)",
		desc: ["Fusion Evolution but it's a VGC format, and a solomod run by AquaticPanic",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9929461">FEVGC on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1DoV2Vk9B2mYxwVQt9ebA2CvygBLk29az3iszycMAh2k/edit#gid=0">Spreadsheet</a>`,
		      ],
		searchShow: false,
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Data Mod', 'Force Open Team Sheets', 'Best of = 3'],
		mod: 'gen9fevgc',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Reg A', 'Reg A NFE', 'Reg A LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Fusion Evolution.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Fusion Evolution VGC Reg B",
		desc: ["Fusion Evolution but it's a VGC format, and a solomod run by AquaticPanic",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9929461">FEVGC on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1DoV2Vk9B2mYxwVQt9ebA2CvygBLk29az3iszycMAh2k/edit#gid=0">Spreadsheet</a>`,
		      ],
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Open Team Sheets', 'Data Mod'],
		mod: 'gen9fevgc',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Reg A', 'Reg B', 'Reg A NFE', 'Reg A LC', 'Reg B LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Fusion Evolution.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Fusion Evolution VGC Reg B (Bo3)",
		desc: ["Fusion Evolution but it's a VGC format, and a solomod run by AquaticPanic",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/solomods-megathread.3711007/post-9929461">FEVGC on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1DoV2Vk9B2mYxwVQt9ebA2CvygBLk29az3iszycMAh2k/edit#gid=0">Spreadsheet</a>`,
		      ],
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Data Mod', 'Force Open Team Sheets', 'Best of = 3'],
		mod: 'gen9fevgc',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Reg A', 'Reg B', 'Reg A NFE', 'Reg A LC', 'Reg B LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Fusion Evolution.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Fusion Evolution VGC Reg C",
		desc: ["Fusion Evolution but it's a VGC format, and a solomod run by AquaticPanic",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/3748155/">FEVGC on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1DoV2Vk9B2mYxwVQt9ebA2CvygBLk29az3iszycMAh2k/edit#gid=0">Spreadsheet</a>`,
		      ],
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Open Team Sheets', 'Data Mod'],
		mod: 'gen9fevgc',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Reg A', 'Reg B', 'Reg C', 'Reg A NFE', 'Reg A LC', 'Reg B LC', 'Reg C LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Fusion Evolution.'];
				}
			}
		},
	},
	{
		name: "[Gen 9] Fusion Evolution VGC Reg C (Bo3)",
		desc: ["Fusion Evolution but it's a VGC format, and a solomod run by AquaticPanic",
		      ],
		threads: [
				`&bullet; <a href="https://www.smogon.com/forums/threads/3748155/">FEVGC on Smogon Forums</a>`,
				`&bullet; <a href="https://docs.google.com/spreadsheets/d/1DoV2Vk9B2mYxwVQt9ebA2CvygBLk29az3iszycMAh2k/edit#gid=0">Spreadsheet</a>`,
		      ],
		gameType: 'doubles',
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'Min Source Gen = 9', 'VGC Timer', 'Data Mod', 'Force Open Team Sheets', 'Best of = 3'],
		mod: 'gen9fevgc',
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['Reg A', 'Reg B', 'Reg C', 'Reg A NFE', 'Reg A LC', 'Reg B LC', 'Reg C LC'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Fusion Evolution.'];
				}
			}
		},
	}
];