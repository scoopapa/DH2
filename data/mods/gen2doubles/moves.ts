export const Moves: {[k: string]: ModdedMoveData} = {
  encore: {
		inherit: true,
		condition: {
			durationCallback() {
				return this.random(3, 7);
			},
			onStart(target) {
				const lockedMove = target.lastMoveEncore?.id || '';
				const moveIndex = lockedMove ? target.moves.indexOf(lockedMove) : -1;
				if (moveIndex < 0 || target.lastMoveEncore?.flags['failencore'] || target.moveSlots[moveIndex].pp <= 0) {
					// it failed
					return false;
				}
				this.effectState.move = lockedMove;
				this.add('-start', target, 'Encore');
			},
			onOverrideAction(pokemon) {
				return this.effectState.move;
			},
  			onModifyMove(move, pokemon) {
				if (['normal', 'any', 'adjacentFoe'].includes(move.target)) {
					move.target = 'randomNormal';
				}
			},
			onResidualOrder: 13,
			onResidual(target) {
				const lockedMoveIndex = target.moves.indexOf(this.effectState.move);
				if (lockedMoveIndex >= 0 && target.moveSlots[lockedMoveIndex].pp <= 0) {
					// early termination if you run out of PP
					target.removeVolatile('encore');
				}
			},
			onEnd(target) {
				this.add('-end', target, 'Encore');
			},
			onDisableMove(pokemon) {
				if (!this.effectState.move || !pokemon.hasMove(this.effectState.move)) {
					return;
				}
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id !== this.effectState.move) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
		},
	},
/*
	reflect: {
		inherit: true,
		condition: {
			duration: 5,
			// Defense boost applied directly in stat calculation
			onSideStart(side) {
				this.add('-sidestart', side, 'Reflect');
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && this.effectState.target.hasAlly(target) && this.getCategory(move) === 'Physical') {
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Reflect should only reduce damage by 2/3 in doubles');
						if (target.side.active.length === 2) return this.chainModify([5461, 4096]);
					}
				}
			},
			onSideResidualOrder: 9,
			onSideEnd(side) {
				this.add('-sideend', side, 'Reflect');
			},
		},
	},
	lightscreen: {
		inherit: true,
		condition: {
			duration: 5,
			// Sp. Def boost applied directly in stat calculation
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Light Screen');
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && this.effectState.target.hasAlly(target) && this.getCategory(move) === 'Special') {
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Light Screen should only reduce damage by 2/3 in doubles');
						if (target.side.active.length === 2) return this.chainModify([5461, 4096]);
					}
				}
			},
			onSideResidualOrder: 9,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Light Screen');
			},
		},
	},
*/
};
