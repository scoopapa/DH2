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

export const Conditions: {[id: string]: ModdedConditionData} = {
	snow: {
		name: 'Snow',
		effectType: 'Weather',
		duration: 0,
		onFieldStart(field, source, effect) {
			this.add('-weather', 'Snow');
			this.effectState.cooldown = 5;
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Snow', '[upkeep]');
			if (this.field.isWeather('snow')) this.eachEvent('Weather');
			
			let probability = 4;
			if (this.field.pseudoWeather.milkandcookies) probability = 2;
			if (this.effectState.cooldown === 0 && this.randomChance(1, probability)) {
				this.add('-message', 'Santa came to visit!');
				const side1 = this.sides[0];
				const side2 = this.sides[1];
				
				if (side1.karma > side2.karma) {
					side1.reward();
					side2.punish();
				} else if (side2.karma > side1.karma){
					side2.reward();
					side1.punish();
				} else {
					this.add('-message', 'Both sides have the same karma, so Santa left.');
				}
				this.effectState.cooldown = 5;
			} else if (this.effectState.cooldown !== 0) this.effectState.cooldown --;
		},
	},
	fsb: {
		name: 'fsb',
		start: "  [Pokemon] was chilled!",
		alreadyStarted: "  [POKEMON] is already chilled!",
		end: "  [POKEMON] warmed up!",
		endFromItem: "  [POKEMON]'s [ITEM] warmed it up!",
		endFromMove: "  [POKEMON]'s [MOVE] warmed it up!",
		cant: "[POKEMON] is chilled!",
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			this.add('-start', target, 'Frostbite', '[silent]');
			this.add('-message', `${target.name} was frostbitten!`);
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 16);
		},
		onModifySpA(spa, pokemon) {
			return this.chainModify(0.5);
		},
	},
}
