export const Scripts: BattleScriptsData = { 
	gen: 9,
	side: {
		inherit: true,
		constructor(name: string, battle: Battle, sideNum: number, team: PokemonSet[]) {
			const sideScripts = battle.dex.data.Scripts.side;
			if (sideScripts) Object.assign(this, sideScripts);
	
			this.battle = battle;
			this.id = ['p1', 'p2', 'p3', 'p4'][sideNum] as SideID;
			this.n = sideNum;
	
			this.name = name;
			this.avatar = '';
	
			this.team = team;
			this.pokemon = [];
			for (let i = 0; i < this.team.length && i < 24; i++) {
				// console.log("NEW POKEMON: " + (this.team[i] ? this.team[i].name : '[unidentified]'));
				this.pokemon.push(new Pokemon(this.team[i], this));
				this.pokemon[i].position = i;
			}
	
			switch (this.battle.gameType) {
			case 'doubles':
				this.active = [null!, null!];
				break;
			case 'triples': case 'rotation':
				this.active = [null!, null!, null!];
				break;
			default:
				this.active = [null!];
			}
	
			this.pokemonLeft = this.pokemon.length;
			this.faintedLastTurn = null;
			this.faintedThisTurn = null;
			this.totalFainted = 0;
			this.zMoveUsed = false;
			this.dynamaxUsed = this.battle.gen !== 9;
	
			this.sideConditions = {};
			this.slotConditions = [];
			// Array#fill doesn't work for this
			for (let i = 0; i < this.active.length; i++) this.slotConditions[i] = {};
	
			this.activeRequest = null;
			this.choice = {
				cantUndo: false,
				error: ``,
				actions: [],
				forcedSwitchesLeft: 0,
				forcedPassesLeft: 0,
				switchIns: new Set(),
				zMove: false,
				mega: false,
				ultra: false,
				terastallize: false,
				dynamax: false,
			};
	
			// old-gens
			this.lastMove = null;
		},
		canDynamaxNow() {
			//if (this.battle.gen !== 8) return false;
			if (this.battle.gameType === 'multi' && this.battle.turn % 2 !== [1, 1, 0, 0][this.n]) return false;
			// if (this.battle.gameType === 'multitriples' && this.battle.turn % 3 !== [1, 1, 2, 2, 0, 0][this.side.n]) {
			//        return false;
			// }
			if (this.dynamaxUsed) return false;
			if (this.battle.ruleTable.has('bigdogclause')) {
				return this.active.some(pokemon => pokemon.m.dog);
			}
			return true;
		},
	},
	pokemon: {
	inherit: true,
		getDynamaxRequest(skipChecks?: boolean) {
			// {gigantamax?: string, maxMoves: {[k: string]: string} | null}[]
			if (!skipChecks) {
				if (!this.side.canDynamaxNow()) return;
				if (
					this.species.isMega || this.species.isPrimal || this.species.forme === "Ultra" || this.canMegaEvo
				) {
					return;
				}
				// Some pokemon species are unable to dynamax
				if (this.species.cannotDynamax || this.illusion?.species.cannotDynamax) return;
			}
			const result: DynamaxOptions = {maxMoves: []};
			let atLeastOne = false;
			for (const moveSlot of this.moveSlots) {
				const move = this.battle.dex.moves.get(moveSlot.id);
				const maxMove = this.battle.actions.getMaxMove(move, this);
				if (maxMove) {
					if (this.maxMoveDisabled(move)) {
						result.maxMoves.push({move: maxMove.id, target: maxMove.target, disabled: true});
					} else {
						result.maxMoves.push({move: maxMove.id, target: maxMove.target});
						atLeastOne = true;
					}
				}
			}
			if (!atLeastOne) return;
			if (this.canGigantamax) result.gigantamax = this.canGigantamax;
			return result;
		},
		constructor(set: string | AnyObject, side: Side) {
			this.side = side;
			this.battle = side.battle;

			this.m = {};

			const pokemonScripts = this.battle.format.pokemon || this.battle.dex.data.Scripts.pokemon;
			if (pokemonScripts) Object.assign(this, pokemonScripts);

			if (typeof set === 'string') set = {name: set};

			this.baseSpecies = this.battle.dex.species.get(set.species || set.name);
			if (!this.baseSpecies.exists) {
				throw new Error(`Unidentified species: ${this.baseSpecies.name}`);
			}
			this.set = set as PokemonSet;

			this.species = this.baseSpecies;
			if (set.name === set.species || !set.name) {
				set.name = this.baseSpecies.baseSpecies;
			}
			this.speciesState = {id: this.species.id};

			this.name = set.name.substr(0, 20);
			this.fullname = this.side.id + ': ' + this.name;

			let monLevel = this.battle.clampIntRange(set.adjustLevel || set.level || 100, 1, 9999);
			if (this.battle.ruleTable.has('levelclause')) {
				const tierboosts: {[tier: string]: number} = {
					uu: 5,
					rubl: 5,
					ru: 10,
					nubl: 10,
					nu: 15,
					publ: 15,
					pu: 20,
					zubl: 20,
					zu: 25,
					nfe: 30,
					lc: 30,
				};
				 const tier = this.species.tier;
					if (tierboosts[tier]) {
						  monLevel += tierboosts[tier];            
				}
			}
			set.level = level;
			this.level = set.level;
			const genders: {[key: string]: GenderName} = {M: 'M', F: 'F', N: 'N'};
			this.gender = genders[set.gender] || this.species.gender || (this.battle.random() * 2 < 1 ? 'M' : 'F');
			if (this.gender === 'N') this.gender = '';
			this.happiness = typeof set.happiness === 'number' ? this.battle.clampIntRange(set.happiness, 0, 255) : 255;
			this.pokeball = this.set.pokeball || 'pokeball';
			this.dynamaxLevel = typeof set.dynamaxLevel === 'number' ? this.battle.clampIntRange(set.dynamaxLevel, 0, 10) : 10;
			this.gigantamax = this.set.gigantamax || false;

			this.baseMoveSlots = [];
			this.moveSlots = [];
			if (!this.set.moves?.length) {
				throw new Error(`Set ${this.name} has no moves`);
			}
			for (const moveid of this.set.moves) {
				let move = this.battle.dex.moves.get(moveid);
				if (!move.id) continue;
				if (move.id === 'hiddenpower' && move.type !== 'Normal') {
					set.hpType ||= move.type;
					move = this.battle.dex.moves.get('hiddenpower');
				}
				let basepp = (move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5;
				//if (this.battle.gen < 3) basepp = Math.min(61, basepp);
				this.baseMoveSlots.push({
					move: move.name,
					id: move.id,
					pp: basepp,
					maxpp: basepp,
					target: move.target,
					disabled: false,
					disabledSource: '',
					used: false,
				});
			}

			this.position = 0;
			let displayedSpeciesName = this.species.name;
			if (displayedSpeciesName === 'Greninja-Bond') displayedSpeciesName = 'Greninja';
			this.details = displayedSpeciesName + (this.level === 100 ? '' : ', L' + this.level) +
				(this.gender && (', ' + this.gender)) + (this.set.shiny ? ', shiny' : '');

			this.status = '';
			this.statusState = {};
			this.volatiles = {};
			this.showCure = undefined;

			this.set.evs ||= {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
			this.set.ivs ||= {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31};
			const stats: StatsTable = {hp: 31, atk: 31, def: 31, spe: 31, spa: 31, spd: 31};
			let stat: StatID;
			for (stat in stats) {
				this.set.evs[stat] ||= 0;
				if (!this.set.ivs[stat] && this.set.ivs[stat] !== 0) this.set.ivs[stat] = 31;
			}
			for (stat in this.set.evs) {
				this.set.evs[stat] = this.battle.clampIntRange(this.set.evs[stat], 0, 255);
			}
			for (stat in this.set.ivs) {
				this.set.ivs[stat] = this.battle.clampIntRange(this.set.ivs[stat], 0, 31);
			}
			/*if (this.battle.gen && this.battle.gen <= 2) {
				// We represent DVs using even IVs. Ensure they are in fact even.
				for (stat in this.set.ivs) {
					this.set.ivs[stat] &= 30;
				}
			}*/

			const hpData = this.battle.dex.getHiddenPower(this.set.ivs);
			this.hpType = set.hpType || hpData.type;
			this.hpPower = hpData.power;

			this.baseHpType = this.hpType;
			this.baseHpPower = this.hpPower;

			// initialized in this.setSpecies(this.baseSpecies)
			this.baseStoredStats = null!;
			this.storedStats = {atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
			this.boosts = {atk: 0, def: 0, spa: 0, spd: 0, spe: 0, accuracy: 0, evasion: 0};

			this.baseAbility = toID(set.ability);
			this.ability = this.baseAbility;
			this.abilityState = {id: this.ability};

			this.item = toID(set.item);
			this.itemState = {id: this.item};
			this.lastItem = '';
			this.usedItemThisTurn = false;
			this.ateBerry = false;

			this.trapped = false;
			this.maybeTrapped = false;
			this.maybeDisabled = false;

			this.illusion = null;
			this.transformed = false;

			this.fainted = false;
			this.faintQueued = false;
			this.subFainted = null;

			this.types = this.baseSpecies.types;
			this.baseTypes = this.types;
			this.addedType = '';
			this.knownType = true;
			this.apparentType = this.baseSpecies.types.join('/');
			// Every Pokemon has a Terastal type
			this.teraType = this.set.teraType || this.types[0];

			this.switchFlag = false;
			this.forceSwitchFlag = false;
			this.skipBeforeSwitchOutEventFlag = false;
			this.draggedIn = null;
			this.newlySwitched = false;
			this.beingCalledBack = false;

			this.lastMove = null;
			// This is used in gen 2 only, here to avoid code repetition.
			// Only declared if gen 2 to avoid declaring an object we aren't going to need.
			//if (this.battle.gen === 2) this.lastMoveEncore = null;
			this.lastMoveUsed = null;
			this.moveThisTurn = '';
			this.statsRaisedThisTurn = false;
			this.statsLoweredThisTurn = false;
			this.hurtThisTurn = null;
			this.lastDamage = 0;
			this.attackedBy = [];
			this.timesAttacked = 0;

			this.isActive = false;
			this.activeTurns = 0;
			this.activeMoveActions = 0;
			this.previouslySwitchedIn = 0;
			this.truantTurn = false;
			this.swordBoost = false;
			this.shieldBoost = false;
			this.syrupTriggered = false;
			this.stellarBoostedTypes = [];
			this.isStarted = false;
			this.duringMove = false;

			this.weighthg = 1;
			this.speed = 0;
			/**
			 * Determines the order in which redirect abilities like Lightning Rod
			 * activate if speed tied. Surprisingly not random like every other speed
			 * tie, but based on who first switched in or acquired the ability!
			 */
			this.abilityOrder = 0;

			this.canMegaEvo = this.battle.actions.canMegaEvo(this);
			this.canMegaEvoX = this.battle.actions.canMegaEvoX?.(this);
			this.canMegaEvoY = this.battle.actions.canMegaEvoY?.(this);
			this.canUltraBurst = this.battle.actions.canUltraBurst(this);
			this.canGigantamax = this.baseSpecies.canGigantamax || null;
			this.canTerastallize = this.battle.actions.canTerastallize(this);

			// This is used in gen 1 only, here to avoid code repetition.
			// Only declared if gen 1 to avoid declaring an object we aren't going to need.
			//if (this.battle.gen === 1) this.modifiedStats = {atk: 0, def: 0, spa: 0, spd: 0, spe: 0};

			this.maxhp = 0;
			this.baseMaxhp = 0;
			this.hp = 0;
			this.clearVolatile();
			this.hp = this.maxhp;
		},		
	},
	actions: {
		inherit: true,
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
					hitResults[i] = false;
					continue;
				}
				hitResults[i] = true;
			}
			return hitResults;
		},
		getConfusionDamage(pokemon: Pokemon, basePower: number) {
			const tr = this.battle.trunc;

			const attack = pokemon.calculateStat('atk', pokemon.boosts['atk']);
			const defense = pokemon.calculateStat('def', pokemon.boosts['def']);
			const level = pokemon.level;
			const baseDamage = tr(tr(tr(tr(2 * level / 5 + 2) * basePower * attack) / defense) / 50) + 2;

			// Damage is 16-bit context in self-hit confusion damage
			let damage = tr(baseDamage, 16);
			damage = this.battle.randomizer(damage);
			return Math.max(1, damage);
		},
		 getDamage(
			source: Pokemon, target: Pokemon, move: string | number | ActiveMove,
			suppressMessages = false
		): number | undefined | null | false {
			if (typeof move === 'string') move = this.dex.getActiveMove(move);

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

			const level = source.level;

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

			// Apply Stat Modifiers
			attack = this.battle.runEvent('Modify' + statTable[attackStat], source, target, move, attack);
			defense = this.battle.runEvent('Modify' + statTable[defenseStat], target, source, move, defense);

			if (this.battle.gen <= 4 && ['explosion', 'selfdestruct'].includes(move.id) && defenseStat === 'def') {
				defense = this.battle.clampIntRange(Math.floor(defense / 2), 1);
			}

			const tr = this.battle.trunc;

			// int(int(int(2 * L / 5 + 2) * A * P / D) / 50);
			const baseDamage = tr(tr(tr(tr(2 * level / 5 + 2) * basePower * attack) / defense) / 50);

			// Calculate damage modifiers separately (order differs between generations)
			return this.modifyDamage(baseDamage, source, target, move, suppressMessages);
		},
		terastallize(pokemon: Pokemon) {
			pokemon.addVolatile('dynamax');
			this.battle.add('-message', `big dog Clause activated!`);
			for (const ally of pokemon.side.pokemon) {
				ally.canTerastallize = null;
			}
			this.battle.runEvent('AfterTerastallization', pokemon);
		},
	},
};
