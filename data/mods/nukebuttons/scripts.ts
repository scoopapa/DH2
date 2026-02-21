import {Dex} from '../../../sim/dex';
export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['NB', 'NBU'],
	},	
/*	battle: {
		// something something
			const mapping: {[k: string]: string} = {
				celebi: 'spacialrend',
				deoxys: 'psychoboost',
				diancie: 'diamondstorm',
				genesect: 'technoblast',
				hoopa: 'hyperspacehole',
				jirachi: 'doomdesire',
				magearna: 'fleurcannon',
				manaphy: 'seaswrath',
				marshadow: 'spectraldistortion',
				melmetal: 'ironbeatdown',
				meloetta: 'ancientsymphony',
				mew: 'genesissupernova',
				pecharunt: 'mochitornado',
				raticate: 'raticatekick',
				shaymin: 'seedflare',
				victini: 'vcreate',
				volcanion: 'shatteringiceshards',
				zeraora: 'plasmafists',
			};
			const speciesId = pokemon.species.id;
			const zMoveName = mapping[speciesId];
			if (!zMoveName) return;
			return zMoveName;
		},
	},
*/
	init() {
	// Celebi
		this.modData("Learnsets", "celebi").learnset.attack = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.moonblast = ["9L1"];
		this.modData("Learnsets", "celebi").learnset.chloroblast = ["9L1"];
		// Deoxys
		this.modData("Learnsets", "deoxys").learnset.attack = ["9L1"];
		delete this.modData('Learnsets', 'deoxys').learnset.psychoboost;
		// Diancie
		this.modData("Learnsets", "diancie").learnset.attack = ["9L1"];
		this.modData("Learnsets", "diancie").learnset.aeroblast = ["9L1"];
		delete this.modData('Learnsets', 'diancie').learnset.diamondstorm;
		// Genesect
		this.modData("Learnsets", "genesect").learnset.attack = ["9L1"];
		delete this.modData('Learnsets', 'genesect').learnset.techoblast;
		// Hoopa
		this.modData("Learnsets", "hoopa").learnset.attack = ["9L1"];
		this.modData("Learnsets", "hoopa").learnset.powergem = ["9L1"];
		delete this.modData('Learnsets', 'hoopa').learnset.hyperspacehole;
		// Jirachi
		this.modData("Learnsets", "jirachi").learnset.attack = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.dragonpulse = ["9L1"];
		this.modData("Learnsets", "jirachi").learnset.moonblast = ["9L1"];
		delete this.modData('Learnsets', 'jirachi').learnset.doomdesire;
		// Magearna
		this.modData("Learnsets", "magearna").learnset.attack = ["9L1"];
		this.modData("Learnsets", "magearna").learnset.malignantchain = ["9L1"];
		this.modData("Learnsets", "magearna").learnset.earthpower = ["9L1"];
		delete this.modData('Learnsets', 'magearna').learnset.fleurcannon;
		// Manaphy
		this.modData("Learnsets", "manaphy").learnset.attack = ["9L1"];
		this.modData("Learnsets", "manaphy").learnset.ironhead = ["9L1"];
		this.modData("Learnsets", "manaphy").learnset.flashcannon = ["9L1"];
		this.modData("Learnsets", "manaphy").learnset.nastyplot = ["9L1"];
		delete this.modData('Learnsets', 'manaphy').learnset.tailglow;
		// Marshadow
		this.modData("Learnsets", "marshadow").learnset.attack = ["9L1"];
		this.modData("Learnsets", "marshadow").learnset.shadowbone = ["9L1"];
		delete this.modData('Learnsets', 'marshadow').learnset.spectralthief;
		// Melmetal
		this.modData("Learnsets", "melmetal").learnset.attack = ["9L1"];
		this.modData("Learnsets", "melmetal").learnset.closecombat = ["9L1"];
		delete this.modData('Learnsets', 'melmetal').learnset.doubleironbash;
		// Meloetta
		this.modData("Learnsets", "meloetta").learnset.attack = ["9L1"];
		delete this.modData('Learnsets', 'meloetta').learnset.relicsong;
		// Mew
		this.modData("Learnsets", "mew").learnset.attack = ["9L1"];
		delete this.modData('Learnsets', 'mew').learnset.transform;
		// Pecharunt
		this.modData("Learnsets", "pecharunt").learnset.attack = ["9L1"];
		this.modData("Learnsets", "pecharunt").learnset.darkpulse = ["9L1"];
		// Raticate
		this.modData("Learnsets", "raticate").learnset.bellydrum = ["9L1"];
		this.modData("Learnsets", "raticate").learnset.extremespeed = ["9L1"];
		this.modData("Learnsets", "raticate").learnset.slackoff = ["9L1"];
		this.modData("Learnsets", "raticate").learnset.attack = ["9L1"];
		// Shaymin
		this.modData("Learnsets", "shaymin").learnset.attack = ["9L1"];
		this.modData("Learnsets", "shaymin").learnset.chloroblast = ["9L1"];
		delete this.modData('Learnsets', 'shaymin').learnset.seedflare;
		// Victini
		this.modData("Learnsets", "victini").learnset.attack = ["9L1"];
		this.modData("Learnsets", "victini").learnset.outrage = ["9L1"];
		this.modData("Learnsets", "victini").learnset.dragonclaw = ["9L1"];
		delete this.modData('Learnsets', 'victini').learnset.vcreate;
		// Volcanion
		this.modData("Learnsets", "volcanion").learnset.attack = ["9L1"];
		delete this.modData('Learnsets', 'volcanion').learnset.steameruption;
		// Zeraora
		this.modData("Learnsets", "zeraora").learnset.attack = ["9L1"];
		this.modData("Learnsets", "zeraora").learnset.supercellslam = ["9L1"];
		delete this.modData('Learnsets', 'zeraora').learnset.plasmafists;
	},
};