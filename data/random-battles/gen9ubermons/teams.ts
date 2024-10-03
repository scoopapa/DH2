/* eslint max-len: ["error", 240] */

import RandomGen9Teams from '../gen9/teams';
import {PRNG, PRNGSeed} from '../../../sim/prng';

const SampleTeamsData = {
	/*
	Sample_Team: {
		teamName: "Sample Teams",
		teamData: {
			set0Data: {
				name: "",
				species: "PKMN",
				item: "Item",
				ability: "Ability",
				moves: {
					move1: "Move",
					move2: "Move",
					move3: "Move",
					move4: "Move",
				},
				evs: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
				nature: "Nature",
				ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
			},
			set1Data: {
				name: "",
				species: "PKMN",
				item: "Item",
				ability: "Ability",
				moves: {
					move1: "Move",
					move2: "Move",
					move3: "Move",
					move4: "Move",
				},
				evs: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
				nature: "Nature",
				ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
			},
			set2Data: {
				name: "",
				species: "PKMN",
				item: "Item",
				ability: "Ability",
				moves: {
					move1: "Move",
					move2: "Move",
					move3: "Move",
					move4: "Move",
				},
				evs: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
				nature: "Nature",
				ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
			},
			set3Data: {
				name: "",
				species: "PKMN",
				item: "Item",
				ability: "Ability",
				moves: {
					move1: "Move",
					move2: "Move",
					move3: "Move",
					move4: "Move",
				},
				evs: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
				nature: "Nature",
				ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
			},
			set4Data: {
				name: "",
				species: "PKMN",
				item: "Item",
				ability: "Ability",
				moves: {
					move1: "Move",
					move2: "Move",
					move3: "Move",
					move4: "Move",
				},
				evs: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
				nature: "Nature",
				ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
			},
			set5Data: {
				name: "",
				species: "PKMN",
				item: "Item",
				ability: "Ability",
				moves: {
					move1: "Move",
					move2: "Move",
					move3: "Move",
					move4: "Move",
				},
				evs: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
				nature: "Nature",
				ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
			},
		},
	},
	*/
	SpecsTornTRainOffense: {
		teamName: "Specs Tornadus-Therian Rain Offense",
		teamData: {
			set0Data: {
				name: "",
				species: "Archaludon",
				item: "Assault Vest",
				ability: "Stamina",
				moves: {
					move1: "Electro Shot",
					move2: "Draco Meteor",
					move3: "Flash Cannon",
					move4: "Body Press",
				},
				evs: {hp: 248, atk: 0, def: 16, spa: 176, spd: 0, spe: 68},
				nature: "Modest",
				ivs: {hp: 31, atk: 0, def: 31, spa: 31, spd: 31, spe: 31},
			},
			set1Data: {
				name: "",
				species: "Pelipper",
				item: "Damp Rock",
				ability: "Drizzle",
				moves: {
					move1: "Knock Off",
					move2: "Hurricane",
					move3: "U-turn",
					move4: "Roost",
				},
				evs: {hp: 248, atk: 0, def: 44, spa: 0, spd: 216, spe: 0},
				nature: "Sassy",
				ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
			},
			set2Data: {
				name: "",
				species: "Barraskewda",
				item: "Choice Band",
				ability: "Swift Swim",
				moves: {
					move1: "Liquidation",
					move2: "Close Combat",
					move3: "Flip Turn",
					move4: "Aqua Jet",
				},
				evs: {hp: 0, atk: 252, def: 0, spa: 0, spd: 4, spe: 252},
				nature: "Adamant",
				ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
			},
			set3Data: {
				name: "",
				species: "Raging Bolt",
				item: "Booster Energy",
				ability: "Protosynthesis",
				moves: {
					move1: "Thunderclap",
					move2: "Dragon Pulse",
					move3: "Weather Ball",
					move4: "Calm Mind",
				},
				evs: {hp: 0, atk: 0, def: 0, spa: 252, spd: 4, spe: 252},
				nature: "Modest",
				ivs: {hp: 31, atk: 20, def: 31, spa: 31, spd: 31, spe: 31},
			},
			set4Data: {
				name: "",
				species: "Tornadus-Therian",
				item: "Choice Specs",
				ability: "Regenerator",
				moves: {
					move1: "U-turn",
					move2: "Hurricane",
					move3: "Weather Ball",
					move4: "Focus Blast",
				},
				evs: {hp: 0, atk: 0, def: 0, spa: 252, spd: 4, spe: 252},
				nature: "Timid",
				ivs: {hp: 31, atk: 0, def: 31, spa: 31, spd: 31, spe: 31},
			},
			set5Data: {
				name: "",
				species: "Iron Treads",
				item: "Eject Button",
				ability: "Quark Drive",
				moves: {
					move1: "Ice Spinner",
					move2: "Rapid Spin",
					move3: "Stealth Rock",
					move4: "Earthquake",
				},
				evs: {hp: 88, atk: 252, def: 0, spa: 0, spd: 0, spe: 168},
				nature: "Jolly",
				ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
			},
		},
	},
};

function randomIntFromInterval(min, max) { // min and max included
	return Math.floor(Math.random() * (max - min) + min);
}

export class RandomUbermonsTeams extends RandomGen9Teams {
	randomTeam() {
		const pokemon = [];
		const genders = ["Male", "Female"];
		const randomTeam = randomIntFromInterval(0, 1);
		const team = Object.keys(SampleTeamsData)[randomTeam];
		const sampleTeamName = SampleTeamsData[team]['teamName'];
		for (const setNo in SampleTeamsData[team]['teamData']) {
			let name = SampleTeamsData[team]['teamData'][setNo]['name'];
			if (name == '') name = SampleTeamsData[team]['teamData'][setNo]['species'];
			const set = {
				name: name,
				species: SampleTeamsData[team]['teamData'][setNo]['species'],
				gender: genders[randomIntFromInterval(0, 1)],
				moves: [SampleTeamsData[team]['teamData'][setNo]['moves']['move1'], SampleTeamsData[team]['teamData'][setNo]['moves']['move2'], SampleTeamsData[team]['teamData'][setNo]['moves']['move3'], SampleTeamsData[team]['teamData'][setNo]['moves']['move4']],
				ability: SampleTeamsData[team]['teamData'][setNo]['ability'],
				evs: SampleTeamsData[team]['teamData'][setNo]['evs'],
				ivs: SampleTeamsData[team]['teamData'][setNo]['ivs'],
				item: SampleTeamsData[team]['teamData'][setNo]['item'],
				nature: SampleTeamsData[team]['teamData'][setNo]['nature'],
				level: 100,
				shiny: this.randomChance(1, 1024),
				sampleTeamName: sampleTeamName,
			};
			pokemon.push(set);
		}
		return pokemon;
	}
}

export default RandomUbermonsTeams;
