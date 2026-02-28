import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Banhammers Cycle 3",
		desc: `<b>Banhammers</b>: A metagame where players are allowed to ban Pokemon, Moves, Items, and Abilities through earning points in room tournaments.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/banhammers-cycle-2-week-2-second-roomtour-6-17.3711488/">Banhammers on Smogon Forums</a>`,
         `&bullet; <a href="https://docs.google.com/spreadsheets/d/1prtFrCj_mdOpFtKPpsCH6S3CsO12tEgTIWaQJOEnUcY/edit?usp=sharing">Spreadsheet</a>`,
		],
		mod: 'banhammersc3',
		ruleset: ['Standard', 'Sleep Moves Clause', 'Data Mod', '!Sleep Clause Mod'],
		banlist: [
			'Uber', 'AG', 'Arena Trap', 'Moody', 'Sand Veil', 'Shadow Tag', 'Snow Cloak', 'King\'s Rock', 'Razor Fang', 'Baton Pass',
			'Last Respects', 'Shed Tail', 'Barraskewda', 'Cinderace', 'Clodsire', 'Dragapult', 'Enamorus-Base', 'Gholdengo', 'Gliscor', 'Hatterene',
			'Iron Treads', 'Kingambit', 'Ogerpon-Wellspring', 'Pelipper', 'Rillaboom', 'Walking Wake', 'Zamazenta', 'Earth Power', 'Flip Turn',
			'Freeze-Dry', 'Ice Beam', 'Knock Off', 'Spikes', 'Taunt', 'Thunder Wave', 'Toxic', 'Volt Switch', 'Booster Energy', 'Light Clay',
			'Protosynthesis', 'Clefable', 'Corviknight', 'Darkrai', 'Dragonite', 'Maushold', 'Primarina', 'Samurott-Hisui', 'Slowking-Galar',
			'Weavile', 'Focus Blast', 'Glare', 'Sticky Web', 'Unaware', 'Quark Drive', 'Blissey', 'Ceruledge', 'Chansey', 'Garchomp', 'Garganacl',
			'Glimmora', 'Hydreigon', 'Ogerpon-Cornerstone', 'Ting-Lu', 'Close Combat', 'Dragon Dance', 'Meteor Beam', 'Roost', 'Scale Shot', 'Stealth Rock',
			'Tera Blast', 'Heavy-Duty-Boots', 'Chlorophyll', 'Swift Swim', 'Regenerator', 'Draco Meteor', 'Intimidate', 'Levitate',
			'Focus Sash', 'Leftovers', 'Life Orb', 'Belly Drum', 'Calm Mind', 'Nasty Plot', 'Azumarill', 'Blaziken', 'Deoxys-Defense', 'Greninja',
			'Heatran', 'Kleavor', 'Kommo-o', 'Meowscarada', 'Moltres-Galar', 'Ninetales-Alola', 'Pecharunt', 'Politoed', 'Sinistcha', 'Skarmory',
			'Ursaluna', 'Zapdos-Base',
		],
    }
];