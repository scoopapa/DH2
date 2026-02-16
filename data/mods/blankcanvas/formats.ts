import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Blank Canvas Meta A",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/3748841/">Blank Canvas</a>`,
		],
		mod: 'blankcanvas',
		ruleset: ['Standard', 'Terastal Clause', 'Data Mod', 'Sleep Moves Clause', '!Sleep Clause Mod'],
		banlist: [
			'AG', 'Uber', 'Arena Trap', 'Moody', 'Shadow Tag', 'King\'s Rock', 'Baton Pass', 'Last Respects', 'Shed Tail',
			'Actaniathan', 'Flarenheit', 'Groundead', 'Deadward', 'Obaki', 'Sylravage', 'Twinkaton', 'Fausteil', 'Geoporka',
			'Porcupyre', 'Plasmage', 'Seaode', 'Bellolysk', 'Tryonite', 'Scarachnid', 'Serpvoltidae', 'Maldractice', 'Geigeramp',
			'Bufferfly', 'Dastard', 'Sheepquake', 'Cottentration', 'Sorrowcean', 'Psyllapse', 'Haarstorm', 'Borealis', 'Bazhigangquan',
			'Leechmonner', 'Iron Crest', 'Odonata', 'Hebicikuga', 'Devestial', 'Lundicare', 'Razor Fang', 'Light Clay', 'Lyvamp',
			'Treatmint', 'Turvarpega', 'Goodjur', 'Liftaton', 'Triceracotta', 'Woolverine', 'Combustoad', 'Hearthind', 'Koiryu',
			'Pestiligy', 'Saxum', 'Sascratch', 'Guttergar', 'Rakasa', 'Thermostatic', 'Formaldehydra', 'Strumorthio', 'Iron Mike',
			'Whalestro', 'Urslag', 'Centaghoul', 'Noirwark', 'Metarachne', 'Monsnooze', 'Oreamoss', 'Sucrillon', 'Taranferno',
			'Armie', 'Bunnyumi', 'Parfae', 'Siltworm', 'Ptoxidactyl', 'Staroboros' , 'Kodiacomb', 'Pyrelli', 'Boreetle', 'Hyakutari',
			'Kaovern', 'Zhuguo', 'Shinobomi', 'Prionice', 'Tiaratron', 'Lianzhao', 'Psyrex', 'Phantamp', 'Waroach', 'Wyldemoer',
		],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['BC UU'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Blank Canvas Meta A.'];
				}
			}
		},
	},
	{
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
		}
	},
	{
		name: "[Gen 9] Blank Canvas Meta C",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/3748841/">Blank Canvas</a>`,
		],
		mod: 'blankcanvas',
		ruleset: ['Standard', 'Terastal Clause', 'Data Mod', 'Sleep Moves Clause', '!Sleep Clause Mod'],
		banlist: ['AG', 'Uber', 'Arena Trap', 'Moody', 'Shadow Tag', 'King\'s Rock', 'Baton Pass', 'Last Respects', 'Shed Tail',  'Razor Fang',
			'Actaniathan', 'Flarenheit', 'Groundead', 'Deadward', 'Obaki', 'Sylravage', 'Twinkaton', 'Fausteil', 'Geoporka',
			'Porcupyre', 'Plasmage', 'Seaode', 'Bellolysk', 'Tryonite', 'Scarachnid', 'Serpvoltidae', 'Maldractice', 'Geigeramp',
			'Bufferfly', 'Dastard', 'Sheepquake', 'Cottentration', 'Sorrowcean', 'Psyllapse', 'Haarstorm', 'Borealis', 'Bazhigangquan',
			'Leechmonner', 'Iron Crest', 'Odonata', 'Hebicikuga', 'Devestial', 'Lundicare', 'Arachnode', 'Arsenstorm', 'Badjur', 'Blobbiam',
			'Brasspecter', 'Bugswarm', 'Bulionage', 'Capricorrie', 'Copperhead', 'Craggon', 'Crystuit', 'Drakkannon', 'Eolikopter', 'Faeruin',
			'Fettogre', 'Florustitia', 'Freightmare', 'Frostengu', 'Goblantern', 'Hippaint', 'Jackoswarm', 'Jokerpent', 'Kadraoke', 'Karmalice',
			'Lavalisk', 'Llanfairwyrm', 'Martorse', 'Massassin', 'Mohawtter', 'Mon Mothra', 'Parasike', 'Pinaturbo', 'Piss', 'Primordialith',
			'Reversadusa', 'Sculptera', 'Searytch', 'Sleet Shell', 'Snabterra', 'Socknbuskn', 'Thaumaton', 'Versalyre', 'Vipult', 'Wizhazard',
			'Yamateraph'],
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['BC C'];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Blank Canvas Meta C.'];
				}
			}
		}
	},
	{
		name: "[Gen 9] Blank Canvas Random Battle",
		desc: `A Gen 9 micrometa feautring only Fakemon made by teams of players with a limited budget.`,
		threads: [
			`<a href="https://www.smogon.com/forums/threads/3748841/">Blank Canvas</a>`,
		],
		mod: 'blankcanvas',
		team: 'randomBLC',
		ruleset: ['Species Clause', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Illusion Level Mod', 'Terastal Clause', 'Data Mod'],
	}
];