export const Conditions: {[k: string]: ConditionData} = {
	terastal: {
		name: 'terastal',
		duration: 0,
		onModifyMove(move) {
			if (this.effectData.target.m.teraboost) move.stab = 2;
		},
	},
};
