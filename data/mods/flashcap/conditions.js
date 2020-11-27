'use strict';

/**@type {{[k: string]: EffectData}} */
let Conditions = {
	chamereon: {
		name: 'Chamereon',
		id: 'chamereon',
		num: 493,
		onTypePriority: 1,
		onType(types, pokemon) {
			if (pokemon.transformed) return types;
			/** @type {string | undefined} */
			let type = 'Normal';
			if (pokemon.ability === 'multitype') {
				type = pokemon.getItem().onPlate;
				if (!type) {
					type = 'Normal';
				}
			}
			return [type];
		},
	},
};

exports.Conditions = Conditions;
