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

export const Abilities: {[k: string]: ModdedAbilityData} = {
	swarm: {
		onStart(source) {
			this.field.addPseudoWeather('theswarm');
		},
		flags: {},
		name: "Swarm",
	},
	blackout: {
		onStart(source) {
			this.field.addPseudoWeather('twilightzone');
		},
		flags: {},
		name: "Blackout",
	},
	zergrush: {
		onStart(source) {
			this.field.addPseudoWeather('lotsofreallysmalldragons');
		},
		flags: {},
		name: "Zerg Rush",
	},
	squall: {
		onStart(source) {
			this.field.addPseudoWeather('thunderstorm');
		},
		flags: {},
		name: "Squall",
	},
	fairytale: {
		onStart(source) {
			this.field.addPseudoWeather('fable');
		},
		flags: {},
		name: "Fairytale",
	},
	beatdown: {
		onStart(source) {
			this.field.addPseudoWeather('wwe');
		},
		flags: {},
		name: "Beatdown",
	},
	solarflare: {
		onStart(source) {
			this.field.addPseudoWeather('drought');
		},
		flags: {},
		name: "Solar Flare",
	},
	deltastream: {
		onStart(source) {
			this.field.addPseudoWeather('deltastream');
		},
		flags: {},
		name: "Delta Stream",
	},
	delusion: {
		onStart(source) {
			this.field.addPseudoWeather('thevoices');
		},
		flags: {},
		name: "Delusion",
	},
	ruin: {
		onStart(source) {
			this.field.addPseudoWeather('overgrowth');
		},
		flags: {},
		name: "Overgrowth",
	},
	sandstream: {
		onStart(source) {
			this.field.addPseudoWeather('duststorm');
		},
		flags: {},
		name: "Beatdown",
	},
	snowwarning: {
		onStart(source) {
			this.field.addPseudoWeather('whiteout');
		},
		flags: {},
		name: "Snow Warning",
	},
	fingerwaggler: {
		onStart(source) {
			this.field.addPseudoWeather('metronomebattle');
		},
		flags: {},
		name: "Finger Waggler",
	},
	shart: {
		onStart(source) {
			this.field.addPseudoWeather('shitstorm');
		},
		flags: {},
		name: "Shart",
	},
	idkgenerator: {
		onStart(source) {
			this.field.addPseudoWeather('idk');
		},
		flags: {},
		name: "idk Generator",
	},
	landslide: {
		onStart(source) {
			this.field.addPseudoWeather('landslide');
		},
		flags: {},
		name: "Landslide",
	},
	timemachine: {
		onStart(source) {
			this.field.addPseudoWeather('timewarp');
		},
		flags: {},
		name: "Time Machine",
	},
	monsoon: {
		onStart(source) {
			this.field.addPseudoWeather('flashflood');
		},
		flags: {},
		name: "Monsoon",
	},
}