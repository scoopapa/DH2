import { FormatData } from '../../../sim/dex-formats';

export const Formats: FormatData[] = [
	{
		name: "[Gen 9] Signaturemons",
        desc: `National Dex solomod where new Signature moves are introduced for fully-evolved Pokémon that don't have any.`,
		mod: 'signaturemons',
		teambuilderFormat: 'National Dex',
		ruleset: ['Standard NatDex', 'Event Moves Clause', 'Species Clause', 'Terastal Clause', 'Z-Move Clause'],
		/*Tentative restrictions - will work on it later
		checkCanLearn(move, template, lsetData, set) {
			if (['terablast'].includes(move.id)) return null; //Tera Blast for everyone (except Magikarp, Ditto, Smeargle, Cosmog, Cosmoem and Terapagos)
			if (['hiddenpower'].includes(move.id)) return null; //Hidden power for no one (except Unown)
			return this.checkCanLearn(move, template, lsetData, set);
		},*/
	},
	{
		name: "[Gen 9] Signaturemons Doubles",
        desc: `National Dex solomod where new Signature moves are introduced for fully-evolved Pokémon that don't have any.`,
		mod: 'signaturemons',
		gameType: 'doubles',
		teambuilderFormat: 'National Dex',
		ruleset: ['Standard NatDex', 'Event Moves Clause', 'Species Clause', 'Terastal Clause', 'Z-Move Clause'],
	},
	/*{
		name: "[Gen 9] Signaturemons Random Doubles",
        desc: `National Dex solomod where new Signature moves are introduced for fully-evolved Pokémon that don't have any.`,
		mod: 'signaturemons',
		gameType: 'doubles',
		team: 'random',
		ruleset: ['Standard NatDex', 'Event Moves Clause', 'Species Clause', 'Terastal Clause', 'Z-Move Clause'],
	},*/
];