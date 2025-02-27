import {FS} from '../../../lib';
import {toID} from '../../../sim/dex-data';
import {Pokemon} from "../../../sim/pokemon";

// Similar to User.usergroups. Cannot import here due to users.ts requiring Chat
// This also acts as a cache, meaning ranks will only update when a hotpatch/restart occurs
const usergroups: {[userid: string]: string} = {};
const usergroupData = FS('config/usergroups.csv').readIfExistsSync().split('\n');
for (const row of usergroupData) {
	if (!toID(row)) continue;

	const cells = row.split(',');
	if (cells.length > 3) throw new Error(`Invalid entry when parsing usergroups.csv`);
	usergroups[toID(cells[0])] = cells[1].trim() || ' ';
}

export function getName(name: string): string {
	const userid = toID(name);
	if (!userid) throw new Error('No/Invalid name passed to getSymbol');

	const group = usergroups[userid] || ' ';
	return group + name;
}
export const Rulesets: {[k: string]: ModdedFormatData} = {
	speciesclause: {
		inherit: true,
		onValidateTeam(team, format) {
			const speciesTable = new Set<number>();
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (speciesTable.has(species.num) || speciesTable.has(species.name)) {
					return [`You are limited to one of each Pokémon by Species Clause.`, `(You have more than one ${species.baseSpecies})`];
				}
				if (species.num) speciesTable.add(species.num);
				else speciesTable.add(species.name);
			}
		},
	},
	bigbuttonrule: {
		name: "Big Button Rule",
		effectType: "Rule",
		desc: `Pok&eacute;mon who have turned Big will remain Big when switched out.`,
		onSwitchIn(pokemon) {
			if (pokemon.big) {
				pokemon.addVolatile('bigbutton');
			}
		},
	},
	milfrule: {
		name: "MILF Rule",
		effectType: "Rule",
		desc: `Pok&eacute;mon with the ability MILF will add 2 Fishing Tokens at the beginning of the battle.`,
		onBegin() {
			for (const side of this.sides) {
				for (const pokemon of side.pokemon) {
					if (pokemon.set.ability === 'M I L F') side.addFishingTokens(2);
				}
			}
		},
	},
	ohmyrodrule: {
		name: "Ohmyrod Rule",
		effectType: "Rule",
		desc: `Ohmyrod gets a special message when switching in.`,
		onSwitchIn(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Ohmyrod') {
				this.add('-message', 'it is ohmyrod time :D');
			}
		}
	},
	seriousrule: {
		name: "Serious Rule",
		effectType: "Rule",
		desc: `Pok&eacute;mon with the nature Serious will gain the Serious type on switchin.`,
		onSwitchIn(pokemon) {
			if (pokemon.set.nature === 'Serious') {
				if (pokemon.addType('Serious')) this.add('-start', pokemon, 'typeadd', 'Serious');
			}
		}
	},
	iloverefrigeratorsrule: {
		name: "I love refrigerators Rule",
		effectType: "Rule",
		desc: `Pok&eacute;mon who switch with ally Fridgile active will use Hold Hands on Fridgile.`,
		onSwitchIn(pokemon) {
			if (this.gameType === 'doubles') {
				const ally = pokemon.allies()[0];
				if (ally && ally.baseSpecies.baseSpecies === 'Fridgile') { 
					this.add(`c:|${Math.floor(Date.now() / 1000)}|${getName(pokemon.name)}|I love refrigerators!`);
					const newMove = this.dex.getActiveMove('Hold Hands');
					this.actions.useMove(newMove, pokemon, ally);
				}
			}
		}
	},
	mariokartwiiclause: {
		effectType: 'ValidatorRule',
		name: 'Mario Kart Wii Clause',
		desc: "Mario Kart must use Gorilla Tactics.",
		onValidateTeam(team, format) {
			for (const set of team) {
				if (set.species === 'Mario Kart Wii' && set.ability !== 'Gorilla Tactics') {
					return [set.species + ' must use Gorilla Tactics.'];
				}
			}
		},
	},
	spookysecretclause: {
		name: "Spooky Secret Clause",
		effectType: "Rule",
		desc: `Spooky Secret Clause`,
		onAfterMove(pokemon, target, move) {
			if(pokemon.metronome >= 26) pokemon.side.win();
		},
	},
};