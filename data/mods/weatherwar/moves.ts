import {FS} from '../../../lib';
import {toID} from '../../../sim/dex-data';

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

export const Moves: {[k: string]: ModdedMoveData} = {
	twineedle: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (this.field.pseudoWeather.theswarm) {
				move.multihit = 5;
			}
		},
	},
	dragonrage: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (this.field.pseudoWeather.lotsofreallysmalldragons) {
				move.damage = 100;
			}
		},
	},
	charge: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (this.field.pseudoWeather.thunderstorm) {
				move.heal = [1, 4];
			}
		},
	},
	mistyexplosion: {
		inherit: true,
		basePower: 150,
		onModifyMove(move, source, target) {
			if (this.field.pseudoWeather.fable) {
				delete move.selfdestruct;
			}
		},
	},
	upperhand: {
		inherit: true,
		onTry(source, target) {
			console.log(this.field.pseudoWeather.wwe);
			if (this.field.pseudoWeather.wwe) return true;
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || move.priority <= 0.1 || move.category === 'Status') {
				return false;
			}
		},
		onModifyMove(move, source, target) {
			console.log("modify " + this.field.pseudoWeather.wwe);
			if (this.field.pseudoWeather.wwe) {
				const action = this.queue.willMove(target);
				const targetMove = action?.choice === 'move' ? action.move : null;
				if (!targetMove || targetMove.priority <= 0.1 || targetMove.category === 'Status') {
					delete move.secondaries;
				}			
			}
		},
	},
}