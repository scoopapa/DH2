import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Blank Canvas Meta B",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/3748841/">Blank Canvas</a>`,
		],
		mod: 'blankcanvas',
		ruleset: ['Standard', 'Terastal Clause', 'Data Mod', 'Sleep Moves Clause', '!Sleep Clause Mod'],
		banlist: [
			'AG', 'Uber', 'Arena Trap', 'Moody', 'Shadow Tag', 'King\'s Rock', 'Baton Pass', 'Last Respects', 'Shed Tail', 'Razor Fang', 
			'Lyvamp', 'Treatmint', 'Turvarpega', 'Goodjur', 'Liftaton', 'Triceracotta', 'Woolverine', 'Combustoad', 'Hearthind', 'Koiryu',
			'Pestiligy', 'Saxum', 'Sascratch', 'Guttergar', 'Rakasa', 'Thermostatic', 'Formaldehydra', 'Strumorthio', 'Iron Mike',
			'Whalestro', 'Urslag', 'Centaghoul', 'Noirwark', 'Metarachne', 'Monsnooze', 'Oreamoss', 'Sucrillon', 'Taranferno',
			'Armie', 'Bunnyumi', 'Parfae', 'Siltworm', 'Ptoxidactyl', 'Staroboros' , 'Kodiacomb', 'Pyrelli', 'Boreetle', 'Hyakutari',
			'Kaovern', 'Zhuguo', 'Shinobomi', 'Prionice', 'Tiaratron', 'Lianzhao', 'Psyrex', 'Phantamp', 'Waroach', 'Wyldemoer',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['BC OU', 'BC UU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Blank Canvas Meta B.'];
				}
			}
		},
	};