export const Conditions: {[k: string]: ModdedConditionData} = {

	// Black Hole needs to hit the user's side of the field
	futuremove: {
		// this is a slot condition
		name: 'futuremove',
		duration: 3,
		onResidualOrder: 3,
		onEnd(target) {
			const data = this.effectData;
			// time's up; time to hit! :D
			const move = this.dex.getMove(data.move);
			if (target.fainted) {
				this.hint(`${move.name} did not hit because the target is ${(data.fainted ? 'fainted' : 'the user')}.`);
				return;
			}

			this.add('-end', target, 'move: ' + move.name);
			target.removeVolatile('Protect');
			target.removeVolatile('Endure');

			const hitMove = new this.dex.Move(data.moveData) as ActiveMove;

			this.trySpreadMoveHit([target], data.source, hitMove);
		},
	},
}