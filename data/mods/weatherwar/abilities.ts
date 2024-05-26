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
	//setting abilities
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
			this.field.addPseudoWeather('colosseum');
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
	
	//abusing abilities
	hivemind: {
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Hivemind neutralize');
				return this.chainModify(0.75);
			}
		},
		onTryHit(target, source, move) {
			if (this.field.pseudoWeather.theswarm && move.category === 'Status' && target !== source) {
				this.add('-immune', target, '[from] ability: Good as Gold');
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Hivemind",
		shortDesc: "Filter + GaG in The Swarm", 
	},
	
	dracojet: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.spe && boost.spe < 0) {
				delete boost.spe;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "Speed", "[from] ability: Draco Jet", "[of] " + target);
				}
			}
		},
		onFractionalPriorityPriority: -1,
		onFractionalPriority(priority, pokemon, target, move) {
			if (move.category !== "Status" && this.field.pseudoWeather.lotsofreallysmalldragons) {
				this.add('-activate', pokemon, 'ability: Draco Jet');
				return 0.1;
			}
		},
		flags: {breakable: 1},
		name: "Draco Jet",
		shortDesc: "Speed cannot be lowered. Dragon moves move first in LoRSD.", 
	},
	shortcircuit: {
		onDamagingHitOrder: 1,
		onFaint(pokemon) {
			if(!pokemon.adjacentFoes()) return;
			const target = this.sample(pokemon.adjacentFoes());
			this.damage(target.baseMaxhp / 4, target, pokemon);
		},
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Toxic Chain's effect
			if (!this.field.pseudoWeather.thunderstorm || target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;

			if (this.randomChance(3, 10)) {
				target.trySetStatus('par', source);
			}
		},
		flags: {},
		name: "Short Circuit",
		shortDesc: "Opponent loses 25% if user faints. 30% paralysis chance in Thunderstorm.", 
	},
	darkfantasy: {
		onUpdate(pokemon) {
			if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'ability: Dark Fantasy');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'slp') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Dark Fantasy');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Dark Fantasy');
				return null;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (this.field.pseudoWeather.fable && ['Dark', 'Dragon', 'Ghost', 'Poison'].includes(move.type)) return this.chainModify([3, 2]);
		},
		flags: {breakable: 1},
		name: "Dark Fantasy",
		shortDesc: "Insomnia + Dark/Dragon/Ghost/Poison moves 1.5x power in Fable.",
	},
	suplex: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.atk && boost.atk < 0) {
				delete boost.atk;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "Attack", "[from] ability: Suplex", "[of] " + target);
				}
			}
		},
		onBasePower(basePower, pokemon, target, move) {
			if (this.field.pseudoWeather.colosseum) {
				return this.chainModify(1.5);
			}
		},
		onFractionalPriority(priority, pokemon, target, move) {
			if (move.category !== "Status" && this.field.pseudoWeather.colosseum) {
				return 0.1;
			}
		},
		flags: {breakable: 1},
		name: "Suplex",
		shortDesc: "Hyper Cutter + attacks move last but have 1.5x power in Colosseum.",
	},
	
}