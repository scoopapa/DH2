export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	clefable: {
		inherit: true,
		mons: [
			[
				{
					name: 'Golem',
					species: 'Golem',
					item: 'Assault Vest',
					ability: 'Regenerator',
					nature: 'Careful',
					evs: { hp: 252, atk: 0, def: 4, spa: 0, spd: 252, spe: 0 },
					gender: 'M',
					happiness: 255,
					hpType: '',
					pokeball: '',
					gigantamax: false,
					dynamaxLevel: 10,
					teraType: 'Dragon',
					level: 100,
					ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
				},
				['earthquake', 'stoneaxe', 'knockoff', 'dragontail']
			],
			[
				{
					name: 'Umbreon',
					species: 'Umbreon',
					item: 'Heavy-Duty Boots',
					ability: 'Shadow Shield',
					nature: 'Careful',
					evs: { hp: 252, atk: 0, def: 4, spa: 0, spd: 252, spe: 0 },
					gender: 'M',
					happiness: 255,
					hpType: '',
					pokeball: '',
					gigantamax: false,
					dynamaxLevel: 10,
					teraType: 'Poison',
					level: 100,
					ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
				},
				['knockoff', 'toxic', 'moonlight', 'haze']
			],
			[
				{
					name: 'Gliscor',
					species: 'Gliscor',
					item: 'Toxic Orb',
					ability: 'Poison Heal',
					nature: 'Jolly',
					evs: { hp: 0, atk: 252, def: 4, spa: 0, spd: 0, spe: 252 },
					gender: 'M',
					happiness: 255,
					hpType: '',
					pokeball: '',
					gigantamax: false,
					dynamaxLevel: 10,
					teraType: 'Steel',
					level: 100,
					ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
				},
				['swordsdance', 'earthquake', 'facade', 'rapidspin']
			],
			[
				{
					name: 'Mewtwo',
					species: 'Mewtwo',
					item: 'Expert Belt',
					ability: 'Pressure',
					nature: 'Naive',
					evs: { hp: 0, atk: 252, def: 0, spa: 4, spd: 0, spe: 252 },
					gender: 'M',
					happiness: 255,
					hpType: '',
					pokeball: '',
					gigantamax: false,
					dynamaxLevel: 10,
					teraType: 'Electric',
					level: 100,
					ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 }
				},
				['psystrike', 'thunderpunch', 'icepunch', 'knockoff']
			]
		],
	},
};
