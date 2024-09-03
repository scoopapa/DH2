export const Conditions: {[id: string]: ModdedConditionData} = {
baseball: {
		name: 'baseball',
		effectType: 'Status',
    onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
  			return this.chainModify(0.75);
  		},
    onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
  			return this.chainModify(0.75);
  		},
    onTry(source, move) {
			if (move.flags['sound']) {
				this.add('-fail', source);
        		this.add('-message', `Shut up!`);
				return null;
			}
		},
	},

}
