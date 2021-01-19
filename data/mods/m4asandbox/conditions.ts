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
		onStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				this.add('-fieldstart', 'move: Luchador Terrain', '[from] ability: ' + effect, '[of] ' + source);
				this.add('-message', "Moves used by grounded Pokémon will have their accuracy and critical hit ratio increased.");
				this.add('-message', "Grounded Pokémon will also be protected by Magic Coat.");
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
