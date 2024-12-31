export const TypeChart: {[k: string]: ModdedTypeData} = {
	normal: {
		damageTaken: {
			Fire: 0,
			Water: 0,
			Grass: 0,
			Normal: 0,
			Psychic: 0,
			Dark: 0,
			Fighting: 0,
		},
	},
	fire: {
		damageTaken: {
			Fire: 0,
			Water: 1,
			Grass: 2,
			Normal: 0,
			Psychic: 0,
			Dark: 0,
			Fighting: 0,
			brn: 3,
		},
	},
	water: {
		damageTaken: {
			Fire: 2,
			Water: 0,
			Grass: 1,
			Normal: 0,
			Psychic: 0,
			Dark: 0,
			Fighting: 0,
		},
	},
	grass: {
		damageTaken: {
			Fire: 1,
			Water: 2,
			Grass: 0,
			Normal: 0,
			Psychic: 0,
			Dark: 0,
			Fighting: 0,
			powder: 3,
		},
	},
	psychic: {
		damageTaken: {
			Fire: 0,
			Water: 0,
			Grass: 0,
			Normal: 0,
			Psychic: 0,
			Dark: 1,
			Fighting: 2,
		},
	},
	dark: {
		damageTaken: {
			Fire: 0,
			Water: 0,
			Grass: 0,
			Normal: 0,
			Psychic: 2,
			Dark: 0,
			Fighting: 1,
			prankster: 3,
		},
	},
	fighting: {
		damageTaken: {
			Fire: 0,
			Water: 0,
			Grass: 0,
			Normal: 0,
			Psychic: 1,
			Dark: 2,
			Fighting: 0,
		},
	},
};
