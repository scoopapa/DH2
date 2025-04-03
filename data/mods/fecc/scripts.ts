import {Pokemon} from '../../../sim/pokemon';
import {FS} from '../../../lib';
import {toID} from '../../../sim/dex-data';
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

export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init() {
		// Automatically construct fusion learnsets! (Thank u scoopapa)
		for (const id in this.dataCache.Pokedex) { // check the dex for fusions
			const fusionEntry = this.dataCache.Pokedex[id];
			if (fusionEntry.fusion) { // if the pokedex entry has a fusion field, it's a fusion
				const learnsetFusionList = [];// list of pokemon whose learnsets need to be fused
				for (let name of fusionEntry.fusion) {
					let prevo = true;
					while (prevo) { // make sure prevos of both fused pokemon are added to the list
						learnsetFusionList.push(name);
						const dexEntry = this.dataCache.Pokedex[this.toID(name)];
						if (dexEntry.prevo) name = dexEntry.prevo;
						else prevo = false;
					}
				}
				if (!this.dataCache.Learnsets[id]) this.dataCache.Learnsets[id] = {learnset: {}};// create a blank learnset entry so we don't need a learnsets file
				for (const name of learnsetFusionList) {
					const learnset = this.dataCache.Learnsets[this.toID(name)].learnset;// get the learnset of each pokemon in the list
					for (const moveid in learnset) {
						if (this.dataCache.Moves[moveid].isNonstandard === 'Past') continue; // exclude dexited moves (I hope!)
						this.modData('Learnsets', id).learnset[moveid] = ['9L1'];// all moves are compatible with the fusion's only ability, so just set it to 8L1
					}
				}
			}
		}

		// Now, case-by-case learnset revisions:
		// Behemoth Bash and Behemoth Blade are added automatically to the Crowned dogs somewhere,
		// so we will simulate that here, instead of actually editing that.
		/*
		this.modData('Learnsets', 'yaciancrowned').learnset.behemothblade = ['7L1'];
		this.modData('Learnsets', 'igglyzentacrowned').learnset.behemothbash = ['7L1'];
		this.modData('Learnsets', 'nozedawnwings').learnset.moongeistbeam = ['7L1'];
		this.modData('Learnsets', 'phancrozmadawnwings').learnset.moongeistbeam = ['7L1'];
		this.modData('Learnsets', 'tyranetteeternal').learnset.lightofruin = ['7L1'];
		this.modData('Learnsets', 'monferpaunbound').learnset.hyperspacefury = ['7L1'];
		this.modData('Learnsets', 'hoopagigasunbound').learnset.hyperspacefury = ['7L1'];
		this.modData('Learnsets', 'rotofable').learnset.overheat = ['7L1'];
		this.modData('Learnsets', 'appletomwash').learnset.hydropump = ['7L1'];
		this.modData('Learnsets', 'igglyciancrowned').learnset.behemothblade = ['7L1'];
		delete this.modData('Learnsets', 'yaciancrowned').learnset.ironhead;
		delete this.modData('Learnsets', 'igglyzentacrowned').learnset.ironhead;
		delete this.modData('Learnsets', 'igglyciancrowned').learnset.ironhead;*/
	},
	gen: 9,
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['FECC'],
	},
	battle: {
		heal(damage: number, target?: Pokemon, source: Pokemon | null = null, effect: 'drain' | Effect | null = null) {
		if (this.event) {
			if (!target) target = this.event.target;
			if (!source) source = this.event.source;
			if (!effect) effect = this.effect;
		}
		if (effect === 'drain') effect = this.dex.conditions.getByID(effect as ID);
		if (damage && damage <= 1) damage = 1;
		if (target.hasAbility('healaura') || source.hasAbility('healaura')) damage * 1.33;
		damage = this.trunc(damage);
		// for things like Liquid Ooze, the Heal event still happens when nothing is healed.
		damage = this.runEvent('TryHeal', target, source, effect, damage);
		if (!damage) return damage;
		if (!target?.hp) return false;
		if (!target.isActive) return false;
		if (target.hp >= target.maxhp) return false;
		const finalDamage = target.heal(damage, source, effect);
		switch (effect?.id) {
		case 'leechseed':
		case 'rest':
			this.add('-heal', target, target.getHealth, '[silent]');
			break;
		case 'drain':
			this.add('-heal', target, target.getHealth, '[from] drain', '[of] ' + source);
			break;
		case 'wish':
			break;
		case 'zpower':
			this.add('-heal', target, target.getHealth, '[zeffect]');
			break;
		default:
			if (!effect) break;
			if (effect.effectType === 'Move') {
				this.add('-heal', target, target.getHealth);
			} else if (source && source !== target) {
				this.add('-heal', target, target.getHealth, '[from] ' + effect.fullname, '[of] ' + source);
			} else {
				this.add('-heal', target, target.getHealth, '[from] ' + effect.fullname);
			}
			break;
		}
		this.runEvent('Heal', target, source, effect, finalDamage);
		return finalDamage;
	}
	},
	actions: {
		modifyDamage(
		baseDamage: number, pokemon: Pokemon, target: Pokemon, move: ActiveMove, suppressMessages = false
	) {
		const tr = this.battle.trunc;
		if (!move.type) move.type = '???';
		const type = move.type;

		baseDamage += 2;

		if (move.spreadHit) {
			// multi-target modifier (doubles only)
			const spreadModifier = move.spreadModifier || (this.battle.gameType === 'freeforall' ? 0.5 : 0.75);
			this.battle.debug('Spread modifier: ' + spreadModifier);
			baseDamage = this.battle.modify(baseDamage, spreadModifier);
		} else if (move.multihitType === 'parentalbond' && move.hit > 1) {
			// Parental Bond modifier
			const bondModifier = this.battle.gen > 6 ? 0.25 : 0.5;
			this.battle.debug(`Parental Bond modifier: ${bondModifier}`);
			baseDamage = this.battle.modify(baseDamage, bondModifier);
		}

		// weather modifier
		baseDamage = this.battle.runEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);

		// crit - not a modifier
		const isCrit = target.getMoveHitData(move).crit;
		if (isCrit) {
			baseDamage = tr(baseDamage * (move.critModifier || (this.battle.gen >= 6 ? 1.5 : 2)));
		}

		// random factor - also not a modifier
		baseDamage = this.battle.randomizer(baseDamage);

		// STAB
		// The "???" type never gets STAB
		// Not even if you Roost in Gen 4 and somehow manage to use
		// Struggle in the same turn.
		// (On second thought, it might be easier to get a MissingNo.)
		if (type !== '???') {
			let stab: number | [number, number] = 1;

			const isSTAB = move.forceSTAB || pokemon.hasType(type) || pokemon.getTypes(false, true).includes(type);
			if (isSTAB) {
				stab = 1.5;
			}

			// The Stellar tera type makes this incredibly confusing
			// If the move's type does not match one of the user's base types,
			// the Stellar tera type applies a one-time 1.2x damage boost for that type.
			//
			// If the move's type does match one of the user's base types,
			// then the Stellar tera type applies a one-time 2x STAB boost for that type,
			// and then goes back to using the regular 1.5x STAB boost for those types.
			if (pokemon.terastallized === 'Stellar') {
				if (!pokemon.stellarBoostedTypes.includes(type)) {
					stab = isSTAB ? 2 : [4915, 4096];
					if (pokemon.species.name !== 'Teradoof-Stellar') {
						pokemon.stellarBoostedTypes.push(type);
					}
				}
			} else {
				if (pokemon.terastallized === type && pokemon.getTypes(false, true).includes(type)) {
					stab = 2;
				}
				stab = this.battle.runEvent('ModifySTAB', pokemon, target, move, stab);
			}

			baseDamage = this.battle.modify(baseDamage, stab);
		}

		// types
		let typeMod = target.runEffectiveness(move);
		typeMod = this.battle.clampIntRange(typeMod, -6, 6);
		target.getMoveHitData(move).typeMod = typeMod;
		if (typeMod > 0) {
			if (!suppressMessages) this.battle.add('-supereffective', target);

			for (let i = 0; i < typeMod; i++) {
				baseDamage *= 2;
			}
		}
		if (typeMod < 0) {
			if (!suppressMessages) this.battle.add('-resisted', target);

			for (let i = 0; i > typeMod; i--) {
				baseDamage = tr(baseDamage / 2);
			}
		}

		if (isCrit && !suppressMessages) this.battle.add('-crit', target);

		if (pokemon.status === 'brn' && move.category === 'Physical' && !pokemon.hasAbility('goondrive')) {
			if (this.battle.gen < 6 || move.id !== 'facade') {
				baseDamage = this.battle.modify(baseDamage, 0.5);
			}
		}

		// Generation 5, but nothing later, sets damage to 1 before the final damage modifiers
		if (this.battle.gen === 5 && !baseDamage) baseDamage = 1;

		// Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
		baseDamage = this.battle.runEvent('ModifyDamage', pokemon, target, move, baseDamage);

		if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
			baseDamage = this.battle.modify(baseDamage, 0.25);
			this.battle.add('-zbroken', target);
		}

		// Generation 6-7 moves the check for minimum 1 damage after the final modifier...
		if (this.battle.gen !== 5 && !baseDamage) return 1;

		// ...but 16-bit truncation happens even later, and can truncate to 0
		return tr(baseDamage, 16);
	},
		terastallize(pokemon: Pokemon) {
			if (pokemon.illusion && ['Ogerpon', 'Teradoof'].includes(pokemon.illusion.species.baseSpecies)) {
				this.battle.singleEvent('End', this.dex.abilities.get('Illusion'), pokemon.abilityState, pokemon);
			}

			const type = pokemon.teraType;
			this.battle.add('-terastallize', pokemon, type);
			pokemon.terastallized = type;
			for (const ally of pokemon.side.pokemon) {
				ally.canTerastallize = null;
			}
			pokemon.addedType = '';
			pokemon.knownType = true;
			pokemon.apparentType = type;
			if (pokemon.species.baseSpecies === 'Ogerpon') {
				const tera = pokemon.species.id === 'ogerpon' ? 'tealtera' : 'tera';
				pokemon.formeChange(pokemon.species.id + tera, null, true);
			}
			if (pokemon.species.name === 'Teradoof-Terastal' && type === 'Stellar') {
				pokemon.formeChange('Teradoof-Stellar', null, true);
				pokemon.formeChange('Teradoof-Stellar', null, true);
				pokemon.baseMaxhp = Math.floor(Math.floor(
					2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
				) * pokemon.level / 100 + 10);
				const newMaxHP = pokemon.baseMaxhp;
				pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
				pokemon.maxhp = newMaxHP;
				this.battle.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			}
			this.battle.runEvent('AfterTerastallization', pokemon);
		},
		canMegaEvo(pokemon: Pokemon) {
		const species = pokemon.baseSpecies;
			const altForme = species.otherFormes && this.dex.species.get(species.otherFormes[0]);
			if(altForme) console.log(altForme);
			const item = pokemon.getItem();
			// Mega Rayquaza
			if (altForme?.isMega && altForme?.requiredMove &&
				pokemon.baseMoves.includes(toID(altForme.requiredMove)) && !item.zMove) {
				return altForme.name;
			}
			// a hacked-in Megazard X can mega evolve into Megazard Y, but not into Megazard X
			if (item.megaEvolves === species.baseSpecies && item.megaStone !== species.name) {
				return item.megaStone;
			}
			return null;
		},
		canUltraBurst(pokemon) {
			if (pokemon.baseSpecies.name === 'Necro Mane-Dusk Mane' && pokemon.getItem().id === 'depletedultranecroziumz') {
				return "Necro Mane-Ultra";
			}
			/*if (['Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane'].includes(pokemon.baseSpecies.name) &&
				pokemon.getItem().id === 'ultranecroziumz') {
				return "Necrozma-Ultra";
			}*/
			return null;
		},
		hitStepAccuracy(targets: Pokemon[], pokemon: Pokemon, move: ActiveMove) {
			const hitResults = [];
			for (const [i, target] of targets.entries()) {
				this.battle.activeTarget = target;
				// calculate true accuracy
				let accuracy = move.accuracy;
				if (move.ohko) { // bypasses accuracy modifiers
					if (!target.isSemiInvulnerable()) {
						accuracy = 30;
						if (move.ohko === 'Ice' && this.battle.gen >= 7 && !pokemon.hasType('Ice')) {
							accuracy = 20;
						}
						if (!target.volatiles['dynamax'] && pokemon.level >= target.level &&
							(move.ohko === true || !target.hasType(move.ohko))) {
							accuracy += (pokemon.level - target.level);
						} else {
							this.battle.add('-immune', target, '[ohko]');
							hitResults[i] = false;
							continue;
						}
					}
				} else {
					accuracy = this.battle.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
					if (accuracy !== true) {
						let boost = 0;
						if (!move.ignoreAccuracy) {
							const boosts = this.battle.runEvent('ModifyBoost', pokemon, null, null, {...pokemon.boosts});
							boost = this.battle.clampIntRange(boosts['accuracy'], -6, 6);
						}
						if (!move.ignoreEvasion) {
							const boosts = this.battle.runEvent('ModifyBoost', target, null, null, {...target.boosts});
							boost = this.battle.clampIntRange(boost - boosts['evasion'], -6, 6);
						}
						if (boost > 0) {
							accuracy = this.battle.trunc(accuracy * (3 + boost) / 3);
						} else if (boost < 0) {
							accuracy = this.battle.trunc(accuracy * 3 / (3 - boost));
						}
					}
				}
				if (move.alwaysHit || (move.id === 'toxic' && this.battle.gen >= 8 && pokemon.hasType('Poison')) ||
						(move.target === 'self' && move.category === 'Status' && !target.isSemiInvulnerable())) {
					accuracy = true; // bypasses ohko accuracy modifiers
				} else {
					accuracy = this.battle.runEvent('Accuracy', target, pokemon, move, accuracy);
				}
				if (accuracy !== true && !this.battle.randomChance(accuracy, 100)) {
					if (move.smartTarget) {
						move.smartTarget = false;
					} else {
						if (!move.spreadHit) this.battle.attrLastMove('[miss]');
						this.battle.add('-miss', pokemon, target);
					}
					if (!move.ohko && pokemon.hasItem('blunderpolicy') && pokemon.useItem()) {
						this.battle.boost({spe: 2}, pokemon);
					}
					if (pokemon.hasAbility('coinflipmechanics')) {
						this.battle.add(`c:|${Math.floor(Date.now() / 1000)}|${pokemon.name}|Aw dang it`);
					}
					if (target.hasAbility('coinflipmechanics')) {
						this.battle.add(`c:|${Math.floor(Date.now() / 1000)}|${target.name}|Hey, ${pokemon.side.name}, did you know 99% of gamblers quit right before hitting it big?`);
					}
					if (target.hasAbility('swallowswallow')) {
						this.battle.add(`c:|${Math.floor(Date.now() / 1000)}|${target.name}|@${pokemon.name}, sorry, your vote did not follow the format - try again`);
					}
					hitResults[i] = false;
					continue;
				}
				hitResults[i] = true;
			}
			return hitResults;
		}
	},
	pokemon: {
		// for serious showdown
		ignoringAbility() {
			if (this.battle.gen >= 5 && !this.isActive) return true;
			if (this.getAbility().isPermanent) return false;
			if (this.volatiles['gastroacid']) return true;
			if (this.ability === ('neutralizinggas' as ID)) return false;
			if (this.volatiles['seriousshowdown']) return true;
			return false;
		},
		getActionSpeed() {
			let speed = this.getStat('spe', false, false);
			if (this.battle.field.getPseudoWeather('trickroom') || this.battle.getAllActive().some(poke => poke.hasAbility('trjumpscare'))) {
				speed = 10000 - speed;
			}
			return this.battle.trunc(speed, 13);
		},
		setStatus(
		status: string | Condition,
		source: Pokemon | null = null,
		sourceEffect: Effect | null = null,
		ignoreImmunities = false
		) {
			if (!this.hp) return false;
			status = this.battle.dex.conditions.get(status);
			if (this.battle.event) {
				if (!source) source = this.battle.event.source;
				if (!sourceEffect) sourceEffect = this.battle.effect;
			}
			if (!source) source = this;

			if (this.status === status.id) {
				if ((sourceEffect as Move)?.status === this.status) {
					this.battle.add('-fail', this, this.status);
				} else if ((sourceEffect as Move)?.status) {
					this.battle.add('-fail', source);
					this.battle.attrLastMove('[still]');
				}
				return false;
			}

			if (!ignoreImmunities && status.id &&
					!(source?.hasAbility('corrosion') && !(source?.hasAbility('codebreaker')) && ['tox', 'psn'].includes(status.id))) {
				// the game currently never ignores immunities
				if (!this.runStatusImmunity(status.id === 'tox' ? 'psn' : status.id)) {
					this.battle.debug('immune to status');
					if ((sourceEffect as Move)?.status) {
						this.battle.add('-immune', this);
					}
					return false;
				}
			}
			const prevStatus = this.status;
			const prevStatusState = this.statusState;
			if (status.id) {
				const result: boolean = this.battle.runEvent('SetStatus', this, source, sourceEffect, status);
				if (!result) {
					this.battle.debug('set status [' + status.id + '] interrupted');
					return result;
				}
			}

			this.status = status.id;
			this.statusState = {id: status.id, target: this};
			if (source) this.statusState.source = source;
			if (status.duration) this.statusState.duration = status.duration;
			if (status.durationCallback) {
				this.statusState.duration = status.durationCallback.call(this.battle, this, source, sourceEffect);
			}

			if (status.id && !this.battle.singleEvent('Start', status, this.statusState, this, source, sourceEffect)) {
				this.battle.debug('status start [' + status.id + '] interrupted');
				// cancel the setstatus
				this.status = prevStatus;
				this.statusState = prevStatusState;
				return false;
			}
			if (status.id && !this.battle.runEvent('AfterSetStatus', this, source, sourceEffect, status)) {
				return false;
			}
			return true;
		},
		hasAbility(ability) {
			if (this.ignoringAbility()) return false;
			if (Array.isArray(ability)) return ability.some(abil => this.hasAbility(abil));
			const abilityid = this.battle.toID(ability);
			return this.ability === abilityid || !!this.volatiles['ability:' + abilityid];
		},
		getWorstStat(unboosted?: boolean, unmodified?: boolean): StatIDExceptHP {
			let statName: StatIDExceptHP = 'atk';
			let worstStat = 9999;
			const stats: StatIDExceptHP[] = ['atk', 'def', 'spa', 'spd', 'spe'];
			for (const i of stats) {
				if (this.getStat(i, unboosted, unmodified) < worstStat) {
					statName = i;
					worstStat = this.getStat(i, unboosted, unmodified);
				}
			}

			return statName;
		}
	},
};
