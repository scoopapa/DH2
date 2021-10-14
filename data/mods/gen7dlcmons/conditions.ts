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
	futuremove: { // modified very slightly for Build-Up Strike
		// this is a slot condition
		name: 'futuremove',
		duration: 3,
		onResidualOrder: 3,
		onEnd(target) {
			const data = this.effectData;
			// time's up; time to hit! :D
			const move = this.dex.getMove(data.move);
			if (target.fainted || target === data.source) {
				this.hint(`${move.name} did not hit because the target is ${(data.fainted ? 'fainted' : 'the user')}.`);
				return;
			}

			if (move.name === 'Sand Tomb') {
				this.add('-message', `${(target.illusion ? target.illusion.name : target.name)} was swallowed in raging quicksands!`);
			} else {
				this.add('-end', target, 'move: ' + move.name);
			}
			target.removeVolatile('Protect');
			target.removeVolatile('Endure');

			if (data.source.hasAbility('infiltrator') && this.gen >= 6) {
				data.moveData.infiltrates = true;
			}
			if (data.source.hasAbility('normalize') && this.gen >= 6) {
				data.moveData.type = 'Normal';
			}
			if (data.source.hasAbility('adaptability') && this.gen >= 6) {
				data.moveData.stab = 2;
			}
			const hitMove = new this.dex.Move(data.moveData) as ActiveMove;

			this.trySpreadMoveHit([target], data.source, hitMove);
		},
	},
};