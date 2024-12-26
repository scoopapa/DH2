import {Pokemon} from '../../../sim/pokemon';
import {Dex} from '../../../sim/dex';
export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['JM'],
	},	
	
	init() {
		for (const pokemon in Dex.data.Pokedex){
			if (pokemon in Dex.data.Learnsets && this.modData('Learnsets', pokemon).learnset) {
				this.modData("Learnsets", pokemon).learnset.bakecookie = ["9L1"];
				this.modData("Learnsets", pokemon).learnset.buildsnowman = ["9L1"];
				this.modData("Learnsets", pokemon).learnset.christmastree = ["9L1"];
				this.modData("Learnsets", pokemon).learnset.milkandcookies = ["9L1"];
				this.modData("Learnsets", pokemon).learnset.hug = ["9L1"];
				this.modData("Learnsets", pokemon).learnset.niceball = ["9L1"];
				this.modData("Learnsets", pokemon).learnset.nicebeam = ["9L1"];
				this.modData("Learnsets", pokemon).learnset.nicefang = ["9L1"];
				this.modData("Learnsets", pokemon).learnset.nicehammer = ["9L1"];
				this.modData("Learnsets", pokemon).learnset.nicepunch = ["9L1"];
				this.modData("Learnsets", pokemon).learnset.niceshard = ["9L1"];
				this.modData("Learnsets", pokemon).learnset.nicespinner = ["9L1"];
				this.modData("Learnsets", pokemon).learnset.sharesnack = ["9L1"];
				this.modData("Learnsets", pokemon).learnset.snowballfight = ["9L1"];
			}
		}
	},
	battle: {
	},
	actions: {
		getDamage(
		source: Pokemon, target: Pokemon, move: string | number | ActiveMove,
		suppressMessages = false
		): number | undefined | null | false {
			if (typeof move === 'string') move = this.dex.getActiveMove(move);
			//if (move.id === 'present') return getPresentDamage(source, target, move);
			if (typeof move === 'number') {
				const basePower = move;
				move = new Dex.Move({
					basePower,
					type: '???',
					category: 'Physical',
					willCrit: false,
				}) as ActiveMove;
				move.hit = 0;
			}

			if (!move.ignoreImmunity || (move.ignoreImmunity !== true && !move.ignoreImmunity[move.type])) {
				if (!target.runImmunity(move.type, !suppressMessages)) {
					return false;
				}
			}

			if (move.ohko) return target.maxhp;
			if (move.damageCallback) return move.damageCallback.call(this.battle, source, target);
			if (move.damage === 'level') {
				return source.level;
			} else if (move.damage) {
				return move.damage;
			}

			const category = this.battle.getCategory(move);

			let basePower: number | false | null = move.basePower;
			if (move.basePowerCallback) {
				basePower = move.basePowerCallback.call(this.battle, source, target, move);
			}
			if (!basePower) return basePower === 0 ? undefined : basePower;
			basePower = this.battle.clampIntRange(basePower, 1);

			let critMult;
			let critRatio = this.battle.runEvent('ModifyCritRatio', source, target, move, move.critRatio || 0);
			if (this.battle.gen <= 5) {
				critRatio = this.battle.clampIntRange(critRatio, 0, 5);
				critMult = [0, 16, 8, 4, 3, 2];
			} else {
				critRatio = this.battle.clampIntRange(critRatio, 0, 4);
				if (this.battle.gen === 6) {
					critMult = [0, 16, 8, 2, 1];
				} else {
					critMult = [0, 24, 8, 2, 1];
				}
			}

			const moveHit = target.getMoveHitData(move);
			moveHit.crit = move.willCrit || false;
			if (move.willCrit === undefined) {
				if (critRatio) {
					moveHit.crit = this.battle.randomChance(1, critMult[critRatio]);
				}
			}

			if (moveHit.crit) {
				moveHit.crit = this.battle.runEvent('CriticalHit', target, null, move);
			}

			// happens after crit calculation
			basePower = this.battle.runEvent('BasePower', source, target, move, basePower, true);

			if (!basePower) return 0;
			basePower = this.battle.clampIntRange(basePower, 1);
			// Hacked Max Moves have 0 base power, even if you Dynamax
			if ((!source.volatiles['dynamax'] && move.isMax) || (move.isMax && this.dex.moves.get(move.baseMove).isMax)) {
				basePower = 0;
			}

			if (
				basePower < 60 && source.getTypes(true).includes(move.type) && source.terastallized && move.priority <= 0 &&
				// Hard move.basePower check for moves like Dragon Energy that have variable BP
				!move.multihit && !((move.basePower === 0 || move.basePower === 150) && move.basePowerCallback)
			) {
				basePower = 60;
			}

			let level = source.level;

			const attacker = move.overrideOffensivePokemon === 'target' ? target : source;
			const defender = move.overrideDefensivePokemon === 'source' ? source : target;

			const isPhysical = move.category === 'Physical';
			let attackStat: StatIDExceptHP = move.overrideOffensiveStat || (isPhysical ? 'atk' : 'spa');
			const defenseStat: StatIDExceptHP = move.overrideDefensiveStat || (isPhysical ? 'def' : 'spd');

			const statTable = {atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe'};

			let atkBoosts = attacker.boosts[attackStat];
			let defBoosts = defender.boosts[defenseStat];

			let ignoreNegativeOffensive = !!move.ignoreNegativeOffensive;
			let ignorePositiveDefensive = !!move.ignorePositiveDefensive;

			if (moveHit.crit) {
				ignoreNegativeOffensive = true;
				ignorePositiveDefensive = true;
			}
			const ignoreOffensive = !!(move.ignoreOffensive || (ignoreNegativeOffensive && atkBoosts < 0));
			const ignoreDefensive = !!(move.ignoreDefensive || (ignorePositiveDefensive && defBoosts > 0));

			if (ignoreOffensive) {
				this.battle.debug('Negating (sp)atk boost/penalty.');
				atkBoosts = 0;
			}
			if (ignoreDefensive) {
				this.battle.debug('Negating (sp)def boost/penalty.');
				defBoosts = 0;
			}

			let attack = attacker.calculateStat(attackStat, atkBoosts, 1, source);
			let defense = defender.calculateStat(defenseStat, defBoosts, 1, target);

			attackStat = (category === 'Physical' ? 'atk' : 'spa');
			
			// Gen 2 Present has a glitched damage calculation using the secondary types of the Pokemon for the Attacker's Level and Defender's Defense.
			if (move.id === 'present') {
				const typeIndexes = {"Normal": 0, "Fighting": 1, "Flying": 2, "Poison": 3, "Ground": 4, "Rock": 5, "Bug": 7, "Ghost": 8, "Steel": 9, "Fire": 20, "Water": 21, "Grass": 22, "Electric": 23, "Psychic": 24, "Ice": 25, "Dragon": 26, "Dark": 27, "Fairy": 28};
				attack = 10;

				const attackerLastType = attacker.getTypes().slice(-1)[0];
				const defenderLastType = defender.getTypes().slice(-1)[0];

				defense = typeIndexes[attackerLastType] || 1;
				level = typeIndexes[defenderLastType] || 1;
				if (move.crit) {
					level *= 2;
				}
				this.battle.hint("Gen 2 Present has a glitched damage calculation using the secondary types of the Pokemon for the Attacker's Level and Defender's Defense.", true);
			}

			const tr = this.battle.trunc;

			// Apply Stat Modifiers
			attack = this.battle.runEvent('Modify' + statTable[attackStat], source, target, move, attack);
			defense = this.battle.runEvent('Modify' + statTable[defenseStat], target, source, move, defense);

			if (this.battle.gen <= 4 && ['explosion', 'selfdestruct'].includes(move.id) && defenseStat === 'def') {
				defense = this.battle.clampIntRange(Math.floor(defense / 2), 1);
			}
			
			// int(int(int(2 * L / 5 + 2) * A * P / D) / 50);
			const baseDamage = tr(tr(tr(tr(2 * level / 5 + 2) * basePower * attack) / defense) / 50);

			// Calculate damage modifiers separately (order differs between generations)
			return this.modifyDamage(baseDamage, source, target, move, suppressMessages);
		}
	},
	side: {
		addKarma(amount: number) {
			if(amount === 0) return;
			if(this.karma === undefined) this.karma = 0;
			this.karma += amount;
			this.battle.add('-message', `${this.name} gained ${amount} karma!`);
			this.battle.hint(`They now have ${this.karma} karma.`);
		},
		removeKarma(amount: number) {
			if(amount === 0) return;
			if(this.karma === undefined) this.karma = 0;
			this.karma -= amount;
			this.battle.add('-message', `${this.name} lost ${amount} karma!`);
			this.battle.hint(`They now have ${this.karma} karma.`);
		},
		swapKarma() {
			if (this.karma === undefined) this.karma = 0;
			if (this.foe.karma === undefined) this.foe.karma = 0;
			if (this.karma === 0 && this.foe.karma === 0) return;
			const temp = this.karma;
			this.foe.karma = this.karma;
			this.karma = temp;
			this.battle.add('-message', `${this.name} and ${this.foes.name} swapped karma!`);
			this.battle.hint(`${this.name} has ${this.karma} karma and ${this.foe.name} has ${this.foe.karma} karma.`);
		},
		reward() {
			if (!this.active) {
				this.battle.add('-message', "But there was no one home...");
				return;
			}
			//const n = 1;
			const n = this.battle.random(100);
			const pokemon = this.active[0];
			if (n < 30) {
				this.battle.add('-message', `Santa gave ${pokemon.name} a snack!`);
				if(!pokemon.item) this.battle.add('-message', `But ${pokemon.name} didn't have room for one!`);
				else {
					const items = ['aguavberry', 'figyberry', 'iapapaberry', 'magoberry', 'wikiberry', 'sitrusberry', 'lumberry', 'custapberry', 'salacberry', 'starfberry', 'keeberry', 'marangaberry', 'jabocaberry', 'rowapberry', 'candycane', 'gingerbreadman', 'pokedoll'];
					const item = this.battle.dex.items.get(this.sample(items));
					this.add('-item', pokemon, item);
					target.setItem(item);
				}
			} else if (n < 50) {
				this.battle.add('-message', `Santa invigorated ${pokemon.name} with energy!`);
				this.battle.heal(pokemon.baseMaxhp / 4, pokemon);
			} else if (n < 69) {
				this.battle.add('-message', `Santa decorated ${pokemon.name} with a bow!`);
				const bestStat = pokemon.getBestStat(true, true);
				this.battle.boost({[bestStat]: 1}, pokemon);
			} else if (n < 84) {
				this.battle.add('-message', `Santa filled ${pokemon.name} with holiday spirit!`);
				pokemon.addVolatile('focusenergy');
			} else if (n < 99) {
				this.battle.add('-message', `Santa filled ${pokemon.name} with holiday spirit!`);
				pokemon.addVolatile('helpinghand');
			} else {
				this.battle.add('-message', `Santa granted ${pokemon.name} a Christmas miracle!`);
				if (!pokemon.side.pokemon.filter(ally => ally.fainted).length) this.battle.add('-message', `But ${pokemon.name} didn't need one!`);
				const newMove = this.battle.dex.getActiveMove('revivalblessing');
				const newSet = {
					name: 'Mew',
					species: 'Mew',
					item: 'Soothe Bell',
					ability: 'Natural Cure',
					moves: [ 'Revival Blessing' ],
					nature: 'Calm',
					evs: { hp: 252, atk: 0, def: 128, spa: 0, spd: 128, spe: 0 },
					gender: 'N',
					ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
					happiness: 255,
					hpType: '',
					pokeball: '',
					gigantamax: false,
					dynamaxLevel: 10,
					teraType: 'Ice',
					level: 100
				};
				const newMon = new Pokemon(newSet, pokemon.side);
				this.battle.add('-anim', pokemon, "Revival Blessing", pokemon);
				this.battle.actions.useMove(newMove, newMon, pokemon);
			}
		},
		punish() {
			if (!this.active) {
				this.battle.add('-message', "But there was no one home...");
				return;
			}
			const n = this.battle.random(100);
			const pokemon = this.active[0];
			if (n < 40) {
				this.battle.add('-message', `Santa gave ${this.name} coal!`);
				this.battle.add('-anim', pokemon, "G-Max Volcalith", pokemon);
				this.addSideCondition('gmaxvolcalith');
			} else if (n < 60) {
				this.battle.add('-message', `Santa lectured ${pokemon.name} about right and wrong!`);
				const bestStat = pokemon.getBestStat(true, true);
				this.battle.boost({[bestStat]: -1}, pokemon);
			} else if (n < 80) {
				this.battle.add('-message', `Santa sent a chilling breeze!`);
				pokemon.addVolatile('hypothermia');
			} else if (n < 90) {
				this.battle.add('-message', `Santa passed down chilling judgement!`);
				const newMove = this.battle.dex.getActiveMove('judgment');
				const newSet = {
					name: 'Santa',
					species: 'Mew',
					item: 'Icicle Plate',
					ability: 'Slush Rush',
					moves: [ 'Judgment' ],
					nature: 'Serious',
					evs: { hp: 85, atk: 85, def: 85, spa: 85, spd: 85, spe: 85 },
					gender: 'N',
					ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
					happiness: 255,
					hpType: '',
					pokeball: '',
					gigantamax: false,
					dynamaxLevel: 10,
					teraType: 'Ice',
					level: 100
				};
				const newMon = new Pokemon(newSet, pokemon.side);
				this.battle.add('-anim', pokemon, "Judgment", pokemon);
				this.battle.actions.useMove(newMove, newMon, pokemon);
			} else if (n < 95) {
				this.battle.add('-message', `Santa gave ${this.name} coal!`);
				this.battle.add('-anim', pokemon, "Stealth Rock", pokemon);
				this.addSideCondition('stealthrock');
			} else if (n < 99) {
				this.battle.add('-message', `Santa sent a chilling breeze!`);
				this.battle.add('-message', `${pokemon.name} became frozen!`);
				pokemon.setStatus('frz');
			} else {
				this.battle.add('-message', `Santa took out his hammer!`);
				const newMove = this.battle.dex.getActiveMove('gigatonhammer');
				const newSet = {
					name: 'Santa',
					species: 'Mew',
					item: 'Metal Coat',
					ability: 'Mold Breaker',
					moves: [ 'Gigaton Hammer' ],
					nature: 'Adamant',
					evs: { hp: 252, atk: 252, def: 4, spa: 0, spd: 0, spe: 0 },
					gender: 'N',
					ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
					happiness: 255,
					hpType: '',
					pokeball: '',
					gigantamax: false,
					dynamaxLevel: 10,
					teraType: 'Ice',
					level: 100
				};
				const newMon = new Pokemon(newSet, pokemon.side);
				this.battle.add('-anim', pokemon, "Gigaton Hammer", pokemon);
				this.battle.actions.useMove(newMove, newMon, pokemon);
			}
		},
	},
	pokemon: {
		inherit: true,
		hasAbility(ability) {
			if (this.ignoringAbility()) return false;
			if (Array.isArray(ability)) return ability.some(abil => this.hasAbility(abil));
			const abilityid = this.battle.toID(ability);
			return this.ability === abilityid || !!this.volatiles['ability:' + abilityid];
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
					!(source?.hasAbility('permafrost') && ['frz', 'fsb'].includes(status.id))) {
				// the game currently never ignores immunities
				if (!this.runStatusImmunity('fsb')) {
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
	},
};