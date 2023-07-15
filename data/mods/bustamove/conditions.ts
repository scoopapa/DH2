export const Conditions: {[k: string]: ConditionData} = {
	jawlock: {
		name: 'jawlock',
		onStart(target) {
			this.add('-activate', target, 'jawlock');
		},
		onHit(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'jawlock');
			}
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			const source = this.effectState.source;
			const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectState.sourceEffect.id);
			if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns) && !gmaxEffect) {
				delete pokemon.volatiles['jawlock'];
				this.add('-end', pokemon, this.effectState.sourceEffect, '[jawlock]', '[silent]');
				return;
			}
			this.damage(pokemon.baseMaxhp / 8);
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, this.effectState.sourceEffect, '[jawlock]');
		},
	},
	/*diving: {
		name: 'diving',
		duration: 2,
		onStart(pokemon) {
			this.add('-diving', pokemon);
		},
	},
	twoturnmove: { // modified for Dive
		// Skull Bash, SolarBeam, Sky Drop...
		name: 'twoturnmove',
		duration: 2,
		onStart(target, source, effect) {
			this.effectState.move = effect.id;
			target.addVolatile(effect.id, source);
			this.attrLastMove('[still]');
		},
		onEnd(target) {
			target.removeVolatile(this.effectState.move);
		},
		onLockMove(pokemon) {
			if (pokemon.volatile('diving')) return; // onLockMove traps the user
			return this.effectState.move;
		},
		onDisableMove(pokemon) {
			if (pokemon.volatile('diving')) return; // equivalent to onLockMove if the user should not be trapped
			if (!this.effectState.move || !pokemon.hasMove(this.effectState.move)) {
				return;
			}
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== this.effectState.move) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		onMoveAborted(pokemon) {
			pokemon.removeVolatile('twoturnmove');
		},
	},
	corrosed: {
		name: 'corrosed',
		effectType: 'Status',
		onStart(pokemon, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', pokemon, 'corrosed', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else {
				this.add('-status', pokemon, 'corrosed');
			}
		},
		onModifyTypePriority: -5,
		onModifyType(type) {
			if (type === 'Steel') onNegateImmunity: false,
		},
	},*/
};