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
        this.add(`c:|${Math.floor(Date.now() / 1000)}|${getName('Ema Skye')}|Baseball! Shut uP!!!`);
				return null;
			}
		},
	},

}
