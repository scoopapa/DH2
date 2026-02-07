import { FormatData } from '../../../sim/dex-formats';

export const format: FormatData = {
		name: "[Gen 9] Fusion Evolution UU",
		threads: [
			`<a href="https://www.smogon.com/forums/threads/fusion-evolution-uu-gen-9-slate-0-drop-slate-discussion-phase.3737223/#post-9994453/">Gen 9 Fusion Evolution UU</a>`,
		],
		mod: 'gen9fe',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Terastal Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Mega Data Mod', 'Data Mod'],
		//While the first users of the mega stone will be made illegal with them if the respective megas are banned and not the stones,
		//banning other megas accessed through said stone will not ban the use of said mega stone on the base forms
		banlist: ['Altarianite', 'Revival Blessing', 'Shed Tail', 'Last Respects', 'Mawilite', 'Alakazite', 'Baton Pass', 'Light Clay',
			'Aero Wake', 'Amigotrio-Alola', 'Amphamence', 'Anoraidon', 'Arbolosion-Hisui', 'Baxgeist-Large', 'Bellikiss', 'Bouffa-Lu', 'Brambleswine',
			'Celedos', 'Cresserace', 'Crygargonal', 'Deciperior-Hisui', 'Deliraidon', 'Deoxyslash-Speed', 'Drampiclus', 'Druddizor',
			'Floatzera', 'Florgerouge', 'Gargamise', 'Garpyuku', 'Great Kleav', 'Icekrai', 'Iron Dirge', 'Iron Legion', 'Iron Matcha', 'Medichamite',
			'Iron Meta', 'Iron Mimic', 'Iron Tornado', 'Lelecuno-Galar', 'Meowscorio-Sensu', 'Necrotrik-Dawn-Wings', 'Necrotrik-Ultra', 'Primeleo',
			'Relishadow', 'Revarantis', 'Roaring Sal', 'Rotoghold', 'Samuraiai-Hisui', 'Scream Cormorant', 'Sol Valiant', 'Stargrowth', 'Tapu Titan', 'Tinkovish', 'Toedieleki',
			'Urshiluxe-Rapid-Strike', 'Varantis', 'Vikadrago', 'Weezaluna-Bloodmoon', 'Whimsy Sands', 'Wopple', 'Yu-Clod', 'Yveltox', 'Slither King',
			'Muktaria-Alola-Mega', 'Mawlakazam-Mega-X', 'Mawlakazam-Mega-Y', 'Goopert-Hisui-Mega', 'Scizorite', 'Tentazor-Mega', 'Zoroshark-Hisui-Mega'
		],
			//Just slapping "FEOU" in the banlist exclude these mons from the teambuilder... but an error ('Nothing matches "FEOU"') was thrown in dex-formats on the server side
			//Hence why bans were done manually
		onValidateTeam(team, format) {
			/**@type {{[k: string]: true}}*/
			let speciesTable = {};
			let allowedTiers = ['FEUU', 'FENFE', "FELC"];
			for (const set of team) {
				let template = this.dex.species.get(set.species);
				if (!allowedTiers.includes(template.tier)) {
					return [set.species + ' is not legal in Fusion Evolution UU.'];
				}
			}
		},
	};