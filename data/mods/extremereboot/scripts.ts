export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	teambuilderConfig: {
        // for micrometas to only show custom tiers
        // excludeStandardTiers: true,
        // only to specify the order of custom tiers
	},
	runMove(moveOrMoveName, pokemon, targetLoc, sourceEffect, zMove, externalMove, maxMove, originalTarget) { // used for 
		pokemon.activeMoveActions++;
		let target = this.getTarget(pokemon, maxMove || zMove || moveOrMoveName, targetLoc, originalTarget);
		let baseMove = this.dex.getActiveMove(moveOrMoveName);
		const pranksterBoosted = baseMove.pranksterBoosted;
		if (baseMove.id !== 'struggle' && !zMove && !maxMove && !externalMove) {
			const changedMove = this.runEvent('OverrideAction', pokemon, target, baseMove);
			if (changedMove && changedMove !== true) {
				baseMove = this.dex.getActiveMove(changedMove);
				if (pranksterBoosted) baseMove.pranksterBoosted = pranksterBoosted;
				target = this.getRandomTarget(pokemon, baseMove);
			}
		}
		let move = baseMove;

		move.isExternal = externalMove;

		this.setActiveMove(move, pokemon, target);

		const willTryMove = this.runEvent('BeforeMove', pokemon, target, move);
		if (!willTryMove) {
			this.runEvent('MoveAborted', pokemon, target, move);
			this.clearActiveMove(true);
			// The event 'BeforeMove' could have returned false or null
			// false indicates that this counts as a move failing for the purpose of calculating Stomping Tantrum's base power
			// null indicates the opposite, as the Pokemon didn't have an option to choose anything
			pokemon.moveThisTurnResult = willTryMove;
			return;
		}
		if (move.beforeMoveCallback) {
			if (move.beforeMoveCallback.call(this, pokemon, target, move)) {
				this.clearActiveMove(true);
				pokemon.moveThisTurnResult = false;
				return;
			}
		}
		pokemon.lastDamage = 0;
		let lockedMove;
		if (!externalMove) {
			lockedMove = this.runEvent('LockMove', pokemon);
			if (lockedMove === true) lockedMove = false;
			if (!lockedMove) {
				if (!pokemon.deductPP(baseMove, null, target) && (move.id !== 'struggle')) {
					this.add('cant', pokemon, 'nopp', move);
					const gameConsole = [
						null, 'Game Boy', 'Game Boy Color', 'Game Boy Advance', 'DS', 'DS', '3DS', '3DS',
					][this.gen] || 'Switch';
					this.hint(`This is not a bug, this is really how it works on the ${gameConsole}; try it yourself if you don't believe us.`);
					this.clearActiveMove(true);
					pokemon.moveThisTurnResult = false;
					return;
				}
			} else {
				sourceEffect = this.dex.getEffect('lockedmove');
			}
			pokemon.moveUsed(move, targetLoc);
		}

		// Wave Crasher Lock-in move hack
		// TODO: implement properly
		const noLock = externalMove && !pokemon.volatiles['lockedmove'];

		const moveDidSomething = this.useMove(baseMove, pokemon, target, sourceEffect, zMove, maxMove);
		this.lastSuccessfulMoveThisTurn = moveDidSomething ? this.activeMove && this.activeMove.id : null;
		if (this.activeMove) move = this.activeMove;
		this.singleEvent('AfterMove', move, null, pokemon, target, move);
		this.runEvent('AfterMove', pokemon, target, move);

		// EXTREME REBOOT Code start
		if (move.type === 'Sea' && move.category !== "Status" && moveDidSomething && !move.isExternal) {
			const waveCrashers = [];
			for (const currentPoke of this.getAllActive()) {
				if (pokemon === currentPoke) continue;
				if (currentPoke.hasAbility('wavecrasher') && !currentPoke.isSemiInvulnerable()) {
					waveCrashers.push(currentPoke);
				}
			}
			// Wave Crasher activates in order of lowest speed stat to highest
			// Note that the speed stat used is after any volatile replacements like Speed Swap,
			// but before any multipliers like Agility or Choice Scarf
			// Ties go to whichever Pokemon has had the ability for the least amount of time
			waveCrashers.sort(
				(a, b) => -(b.storedStats['spe'] - a.storedStats['spe']) || b.abilityOrder - a.abilityOrder
			);
			for (const waveCrasher of waveCrashers) {
				if (this.faintMessages()) break;
				if (waveCrasher.fainted) continue;
				this.add('-activate', waveCrasher, 'ability: Wave Crasher');
				const dancersTarget = target!.side !== waveCrasher.side && pokemon.side === waveCrasher.side ? target! : pokemon;
				this.runMove(move.id, waveCrasher, this.getTargetLoc(dancersTarget, waveCrasher), this.dex.getAbility('wavecrasher'), undefined, true);
			}
		}
		if (noLock && pokemon.volatiles['lockedmove']) delete pokemon.volatiles['lockedmove'];
	},
	hitStepAccuracy(targets, pokemon, move) { // for Sun Kiss, Incantation and Cold Stare
		const hitResults = [];
		for (const [i, target] of targets.entries()) {
			this.activeTarget = target;
			// calculate true accuracy
			let accuracy = move.accuracy;
			const boostTable = [1, 4 / 3, 5 / 3, 2, 7 / 3, 8 / 3, 3];
			let boosts;
			let boost!: number;
			if (accuracy !== true) {
				if (!move.ignoreAccuracy) {
					boosts = this.runEvent('ModifyBoost', pokemon, null, null, {...pokemon.boosts});
					boost = this.clampIntRange(boosts['accuracy'], -6, 6);
					if (boost > 0) {
						accuracy *= boostTable[boost];
					} else {
						accuracy /= boostTable[-boost];
					}
				}
				if (!move.ignoreEvasion) {
					boosts = this.runEvent('ModifyBoost', target, null, null, {...target.boosts});
					boost = this.clampIntRange(boosts['evasion'], -6, 6);
					if (boost > 0) {
						accuracy /= boostTable[boost];
					} else if (boost < 0) {
						accuracy *= boostTable[-boost];
					}
				}
			}
			accuracy = this.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
			if (move.alwaysHit ||
				(move.id === 'sunkiss' && pokemon.hasType('Summer')) || // Extreme Reboot code
				(move.id === 'coldstare' && pokemon.hasType('Winter')) ||
				(move.id === 'incantation' && pokemon.hasType('Folklore')) ||
				(move.id === 'incantation' && pokemon.hasType('Folklore')))
			{
				accuracy = true; // bypasses ohko accuracy modifiers
			} else {
				accuracy = this.runEvent('Accuracy', target, pokemon, move, accuracy);
			}
			if (accuracy !== true && !this.randomChance(accuracy, 100)) {
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					if (!move.spreadHit) this.attrLastMove('[miss]');
					this.add('-miss', pokemon, target);
				}
				hitResults[i] = false;
				continue;
			}
			hitResults[i] = true;
		}
		return hitResults;
	},
	getDamage(
		pokemon: Pokemon, target: Pokemon, move: string | number | ActiveMove,
		suppressMessages = false
	): number | undefined | null | false { // modified for Swoop and Dive Bomb
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
		if (move.damageCallback) return move.damageCallback.call(this, pokemon, target);
		if (move.damage === 'level') {
			return pokemon.level;
		} else if (move.damage) {
			return move.damage;
		}

		const category = this.getCategory(move);
		const defensiveCategory = move.defensiveCategory || category;

		let basePower: number | false | null = move.basePower;
		if (move.basePowerCallback) {
			basePower = move.basePowerCallback.call(this, pokemon, target, move);
		}
		if (!basePower) return basePower === 0 ? undefined : basePower;
		basePower = this.clampIntRange(basePower, 1);

		let critMult;
		let critRatio = this.runEvent('ModifyCritRatio', pokemon, target, move, move.critRatio || 0);
		if (this.gen <= 5) {
			critRatio = this.clampIntRange(critRatio, 0, 5);
			critMult = [0, 16, 8, 4, 3, 2];
		} else {
			critRatio = this.clampIntRange(critRatio, 0, 4);
			if (this.gen === 6) {
				critMult = [0, 16, 8, 2, 1];
			} else {
				critMult = [0, 24, 8, 2, 1];
			}
		}

		const moveHit = target.getMoveHitData(move);
		moveHit.crit = move.willCrit || false;
		if (move.willCrit === undefined) {
			if (critRatio) {
				moveHit.crit = this.randomChance(1, critMult[critRatio]);
			}
		}

		if (moveHit.crit) {
			moveHit.crit = this.runEvent('CriticalHit', target, null, move);
		}

		// happens after crit calculation
		basePower = this.runEvent('BasePower', pokemon, target, move, basePower, true);

		if (!basePower) return 0;
		basePower = this.clampIntRange(basePower, 1);

		const level = pokemon.level;

		const attacker = pokemon;
		const defender = target;
		let attackStat: StatNameExceptHP = category === 'Physical' ? 'atk' : 'spa';
		const defenseStat: StatNameExceptHP = defensiveCategory === 'Physical' ? 'def' : 'spd';
		const speedStat: StatNameExceptHP = 'spe';
		if (move.useSourceDefAsOffensive) attackStat = 'def';
		if (move.useSourceSpDAsOffensive) attackStat = 'spd';
		if (move.useSourceSpeedAsOffensive) attackStat = speedStat;

		const statTable = {atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe'};
		let attack;
		let defense;

		let atkBoosts = move.useTargetOffensive ? defender.boosts[attackStat] : attacker.boosts[attackStat];
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
			this.debug('Negating (sp)atk boost/penalty.');
			atkBoosts = 0;
		}
		if (ignoreDefensive) {
			this.debug('Negating (sp)def boost/penalty.');
			defBoosts = 0;
		}

		if (move.useTargetOffensive) {
			attack = defender.calculateStat(attackStat, atkBoosts);
		} else {
			attack = attacker.calculateStat(attackStat, atkBoosts);
		}

		attackStat = (category === 'Physical' ? 'atk' : 'spa');
		defense = defender.calculateStat(defenseStat, defBoosts);

		// Apply Stat Modifiers
		attack = this.runEvent('Modify' + statTable[attackStat], attacker, defender, move, attack);
		defense = this.runEvent('Modify' + statTable[defenseStat], defender, attacker, move, defense);

		if (this.gen <= 4 && ['explosion', 'selfdestruct'].includes(move.id) && defenseStat === 'def') {
			defense = this.clampIntRange(Math.floor(defense / 2), 1);
		}

		const tr = this.trunc;

		// int(int(int(2 * L / 5 + 2) * A * P / D) / 50);
		const baseDamage = tr(tr(tr(tr(2 * level / 5 + 2) * basePower * attack) / defense) / 50);

		// Calculate damage modifiers separately (order differs between generations)
		return this.modifyDamage(baseDamage, pokemon, target, move, suppressMessages);
	},
	pokemon: {
		getActionSpeed() {
			let speed = this.getStat('spe', false, false);
			if (this.battle.field.getPseudoWeather('rulesrewrite')) {
				speed = 0x2710 - speed;
			}
			return this.battle.trunc(speed, 13);
		},
		ignoringAbility() {
			// Check if any active pokemon have the ability Neutralizing Gas
			let volatileSuppress = false;
			const suppressingVolatiles = ['mindcleansing', 'moonblade', 'void'];
			for (const volatileStatus of suppressingVolatiles) {
				if (this.volatiles[volatileStatus]) volatileSuppress = true;
			}
			return !!(!this.isActive || (volatileSuppress && !this.getAbility().isPermanent));
		},
		ignoringItem() {
			return !!((this.battle.gen >= 5 && !this.isActive) ||
				(this.hasAbility('klutz') && !this.getItem().ignoreKlutz) ||
				this.volatiles['void'] || this.battle.field.pseudoWeather['magicroom']);
		},
	},
};