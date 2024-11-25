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
			if (!pokemon.big) pokemon.big = true;
			this.add('-start', pokemon, 'Dynamax', '[silent]');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (['grassknot', 'lowkick'].includes(move.id)) {
				return this.chainModify(2);
			}
		},
		onBasePower(basePower, pokemon, target, move) {
			const boostedMoves = [
				'astonish', 'extrasensory', 'needlearm', 'stomp', 'steamroller', 'bodyslam', 'shadowforce', 'phantomforce', 'flyingpress', 'dragonrush', 'heatcrash', 'heavyslam', 'maliciousmoonsault', 'supercellslam'
			];
			if (boostedMoves.includes(move.id)) {
				return this.chainModify(2);
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Dynamax', '[silent]');
		}
	},

	//slate 3
	sunnyday: {
		inherit: true,
		//slate 6
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella') || defender.hasAbility('divininghorn')) return;
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
		},
		onFieldStart(battle, source, effect) {
			if (battle.terrain === 'fishingterrain') {
				this.add('-message', 'The fishing terrain blocked out the sun!');
				return;
			}
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'SunnyDay', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'SunnyDay');
			}
		},
	},
	raindance: {
		inherit: true,
		//slate 6
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella') || defender.hasAbility('divininghorn')) return;
			if (move.type === 'Water') {
				this.debug('Rain water boost');
				return this.chainModify(1.5);
			}
		},
		onFieldResidual() {
			this.add('-weather', 'RainDance', '[upkeep]');
			if (this.field.isTerrain('fishingterrain')) this.effectState.duration ++;
			this.eachEvent('Weather');
		},
	},

	//slate 6
	acidrain: {
		name: 'Acid Rain',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('sourrockorsomethingidfk')) {
				return 8;
			}
			return 5;
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Acid Rain', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Acid Rain');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Acid Rain', '[upkeep]');
			if (this.field.isWeather('Acid Rain')) this.eachEvent('Weather');
		},
		onWeather(target) {
			if(target.hasType('Lemon')) this.heal(target.baseMaxhp / 16, target, target);
			else if(['Water', 'Steel'].includes(target.types) && !target.hasType('Bug')) this.damage(target.baseMaxhp / 16);
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	graveyard: {
		name: 'Graveyard',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('grimrock')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella') || defender.hasAbility('divininghorn')) return;
			if (move.type === 'Ghost') {
				this.debug('Graveyard ghost boost');
				return this.chainModify(1.3);
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-message', "The dead rose from their graves!");
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Graveyard', '[from] ability: ' + effect.name, '[of] ' + source, '[silent]');
			} else {
				this.add('-weather', 'Graveyard', '[silent]');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-message', "Zombies roam the battlefield.");
			this.add('-weather', 'Graveyard', '[upkeep]');
			if (this.field.isWeather('Graveyard')) this.eachEvent('Weather');
		},
		onWeather(target) {
			this.add('-message', `${target.name} was attacked by the zombies!`);
			this.damage(target.baseMaxhp / 16);
		},
		onFieldEnd() {
			this.add('-weather', 'none', '[silent]');
			this.add('-message', "The zombies vanished from Ironfistlandia... for now.");
		},
	},
};
