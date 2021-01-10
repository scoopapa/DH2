export const Conditions: {[k: string]: ConditionData} = {
	acidicterrain: {
    inherit: true,
		durationCallback(source, effect) {
			if (source?.hasItem('terrainextender')) {
				return 8;
			}
			if (source?.hasAbility('acidrock')) {
				return 0;
			}
			return 5;
		},
 	},
};
