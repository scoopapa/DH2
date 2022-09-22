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
};