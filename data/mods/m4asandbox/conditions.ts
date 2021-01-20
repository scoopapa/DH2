export const Conditions: {[k: string]: ConditionData} = {
	luchadorterrain: {
		name: 'Luchador Terrain',
		effectType: 'Terrain',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('terrainextender')) {
				return 8;
			}
			return 5;
		},
		onModifyMove(move, attacker) {
			if(!attacker.isGrounded()) return;
			if (typeof move.accuracy === 'number') {
				move.accuracy *= 1.5;
			}
		},
		onModifyCritRatio(critRatio, source) {
			if(!source.isGrounded()) return;
			return critRatio + 1;
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if(!target.isGrounded()) return;
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.add('-message', `${target.name} reflected the ${move.name} by using the bouncy ring to its advantage!`);
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if(!target.isGrounded()) return;
			if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.add('-message', `${target.name} reflected the ${move.name} by using the bouncy ring to its advantage!`);
			this.useMove(newMove, target, source);
			return null;
		},
		onStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				this.add('-fieldstart', 'move: Luchador Terrain', '[from] ability: ' + effect, '[of] ' + source);
				this.add('-message', "Moves used by grounded Pokémon will have their accuracy and critical hit ratio increased.");
				this.add('-message', "Grounded Pokémon will also bounce back certain non-damaging moves.");
			} else {
				this.add('-fieldstart', 'move: Luchador Terrain');
			}
		},
		onResidualOrder: 21,
		onResidualSubOrder: 2,
		onEnd() {
			this.add('-fieldend', 'move: Luchador Terrain');
		},
 	},
};
