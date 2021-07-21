export const Conditions: {[k: string]: ConditionData} = {
	twoturnmove: { // modified for Sifting
		// Skull Bash, SolarBeam, Sky Drop...
		name: 'twoturnmove',
		duration: 2,
		onStart(target, source, effect) {
			this.effectData.move = effect.id;
			target.addVolatile(effect.id, source);
			this.attrLastMove('[still]');
		},
		onEnd(target) {
			target.removeVolatile(this.effectData.move);
		},
		onLockMove(pokemon) {
			if (pokemon.hasAbility('sifting')) return; // onLockMove traps the user
			return this.effectData.move;
		},
		onDisableMove(pokemon) {
			if (!pokemon.hasAbility('sifting')) return; // equivalent to onLockMove if the user should not be trapped
			if (!this.effectData.move || !pokemon.hasMove(this.effectData.move)) {
				return;
			}
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== this.effectData.move) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		onMoveAborted(pokemon) {
			pokemon.removeVolatile('twoturnmove');
		},
	},
};