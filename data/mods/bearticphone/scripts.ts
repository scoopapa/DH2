export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	actions: {
		inherit: true,
	   runMove(
		   moveOrMoveName: Move | string, pokemon: Pokemon, targetLoc: number, sourceEffect?: Effect | null,
	   	zMove?: string, externalMove?: boolean, maxMove?: string, originalTarget?: Pokemon
   	) {
	   	pokemon.activeMoveActions++;
	   	let target = this.battle.getTarget(pokemon, maxMove || zMove || moveOrMoveName, targetLoc, originalTarget);
	   	let baseMove = this.dex.getActiveMove(moveOrMoveName);
	   	const pranksterBoosted = baseMove.pranksterBoosted;
   		if (baseMove.id !== 'struggle' && !zMove && !maxMove && !externalMove) {
	   		const changedMove = this.battle.runEvent('OverrideAction', pokemon, target, baseMove);
	   		if (changedMove && changedMove !== true) {
		   		baseMove = this.dex.getActiveMove(changedMove);
		   		if (pranksterBoosted) baseMove.pranksterBoosted = pranksterBoosted;
		   		target = this.battle.getRandomTarget(pokemon, baseMove);
		   	}
	   	}
   		let move = baseMove;
	   	if (zMove) {
	   		move = this.getActiveZMove(baseMove, pokemon);
	   	} else if (maxMove) {
		   	move = this.getActiveMaxMove(baseMove, pokemon);
	   	}

	   	move.isExternal = externalMove;

	   	this.battle.setActiveMove(move, pokemon, target);

	   	const willTryMove = this.battle.runEvent('BeforeMove', pokemon, target, move);
   		if (!willTryMove) {
		   	this.battle.runEvent('MoveAborted', pokemon, target, move);
		   	this.battle.clearActiveMove(true);
			   pokemon.moveThisTurnResult = willTryMove;
			   return;
		   }

		   if (move.flags['cantusetwice'] && pokemon.lastMove?.id === move.id) {
		   	pokemon.addVolatile(move.id);
		   }

		   if (move.beforeMoveCallback) {
			   if (move.beforeMoveCallback.call(this.battle, pokemon, target, move)) {
				   this.battle.clearActiveMove(true);
				   pokemon.moveThisTurnResult = false;
				   return;
			   }
		   }
		   pokemon.lastDamage = 0;
		   let lockedMove;
		   if (!externalMove) {
		   	lockedMove = this.battle.runEvent('LockMove', pokemon);
		   	if (lockedMove === true) lockedMove = false;
		   	if (!lockedMove) {
			    	if (!pokemon.deductPP(baseMove, null, target) && (move.id !== 'struggle')) {
				   	this.battle.add('cant', pokemon, 'nopp', move);
				   	this.battle.clearActiveMove(true);
				   	pokemon.moveThisTurnResult = false;
				   	return;
			   	}
	   		} else {
		   		sourceEffect = this.dex.conditions.get('lockedmove');
		    	}
			   pokemon.moveUsed(move, targetLoc);
	   	}

		   const noLock = externalMove && !pokemon.volatiles['lockedmove'];

	   	if (zMove) {
			   if (pokemon.illusion) {
			   	this.battle.singleEvent('End', this.dex.abilities.get('Illusion'), pokemon.abilityState, pokemon);
		   	}
		   	this.battle.add('-zpower', pokemon);
		   	pokemon.side.zMoveUsed = true;
	   	}

	   	const oldActiveMove = move;

		   const moveDidSomething = this.useMove(baseMove, pokemon, target, sourceEffect, zMove, maxMove);
	   	this.battle.lastSuccessfulMoveThisTurn = moveDidSomething ? this.battle.activeMove && this.battle.activeMove.id : null;
	   	if (this.battle.activeMove) move = this.battle.activeMove;
	   	this.battle.singleEvent('AfterMove', move, null, pokemon, target, move);
	   	this.battle.runEvent('AfterMove', pokemon, target, move);
	   	if (move.flags['cantusetwice'] && pokemon.removeVolatile(move.id)) {
	   		this.battle.add('-hint', `Some effects can force a Pokemon to use ${move.name} again in a row.`);
	   	}

	   	if (noLock && pokemon.volatiles['lockedmove']) delete pokemon.volatiles['lockedmove'];
	   	this.battle.faintMessages();
	   	this.battle.checkWin();

		   if (this.battle.gen <= 4) {
		   	// In gen 4, the outermost move is considered the last move for Copycat
		   	this.battle.activeMove = oldActiveMove;
	   	}
   	}
   },
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['bear'],
   },
};
