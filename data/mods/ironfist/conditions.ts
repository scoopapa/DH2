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
	baseball: {
		name: 'baseball',
		effectType: 'Status',
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
  			return this.chainModify(0.75);
  		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
  			return this.chainModify(0.75);
  		},
		onTryHit(source, target, move) {
			if (move.flags['sound']) {
				this.add('-fail', target);
        		this.add(`c:|${Math.floor(Date.now() / 1000)}|${getName(source.name)}|Shut Up‼️`);
				return null;
			}
		},
	},
	bigbutton: {
		inherit: true,
		duration: null,
		onStart(pokemon) {
			this.add('-start', pokemon, 'Dynamax', '[silent]');
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Dynamax', '[silent]');
		}
	},
}
