export const Scripts: ModdedBattleScriptsData = {
	inherit: 'champions',
	gen: 9,
	battle: {
		getTarget(pokemon: Pokemon, move: string | Move, targetLoc: number, originalTarget?: Pokemon) {
			move = this.dex.moves.get(move);

			let tracksTarget = move.tracksTarget;
			// Stalwart sets trackTarget in ModifyMove, but ModifyMove happens after getTarget, so
			// we need to manually check for Stalwart here
			if (pokemon.hasAbility(['stalwart', 'propellertail', 'moldbreaker'])) tracksTarget = true;
			if (tracksTarget && originalTarget && originalTarget.isActive) {
				// smart-tracking move's original target is on the field: target it
				return originalTarget;
			}

			// banning Dragon Darts from directly targeting itself is done in side.ts, but
			// Dragon Darts can target itself if Ally Switch is used afterwards
			if (move.smartTarget) {
				const curTarget = pokemon.getAtLoc(targetLoc);
				return curTarget && !curTarget.fainted ? curTarget : this.getRandomTarget(pokemon, move);
			}

			// Fails if the target is the user and the move can't target its own position
			const selfLoc = pokemon.getLocOf(pokemon);
			if (['adjacentAlly', 'any', 'normal'].includes(move.target) && targetLoc === selfLoc &&
					!pokemon.volatiles['twoturnmove'] && !pokemon.volatiles['iceball'] && !pokemon.volatiles['rollout']) {
				return move.flags['futuremove'] ? pokemon : null;
			}
			if (move.target !== 'randomNormal' && this.validTargetLoc(targetLoc, pokemon, move.target)) {
				const target = pokemon.getAtLoc(targetLoc);
				if (target?.fainted) {
					if (this.gameType === 'freeforall') {
						// Target is a fainted opponent in a free-for-all battle; attack shouldn't retarget
						return target;
					}
					if (target.isAlly(pokemon)) {
						// Target is a fainted ally: attack shouldn't retarget
						return target;
					}
				}
				if (target && !target.fainted) {
					// Target is unfainted: use selected target location
					return target;
				}

				// Chosen target not valid,
				// retarget randomly with getRandomTarget
			}
			return this.getRandomTarget(pokemon, move);
		}
	}
};