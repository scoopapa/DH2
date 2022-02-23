interface TagData {
	name: string;
	desc?: string;
	pokemonFilter?: (species: Species) => boolean;
	moveFilter?: (move: Move) => boolean;
}

export const Tags: {[id: string]: TagData} = {
	// Tiers
	// -----
	nfe: {
		name: "NFE",
		pokemonFilter: species => species.tier === 'NFE',
	},
	lc: {
		name: "LC",
		pokemonFilter: species => species.doublesTier === 'LC',
	},

	// Doubles tiers
	// -------------
	duber: {
		name: "DUber",
		pokemonFilter: species => species.doublesTier === 'DUber',
	},
	dou: {
		name: "DOU",
		pokemonFilter: species => species.doublesTier === 'DOU',
	},
	dbl: {
		name: "DBL",
		pokemonFilter: species => species.doublesTier === 'DBL',
	},
	duu: {
		name: "DUU",
		pokemonFilter: species => species.doublesTier === 'DUU',
	},
	dnu: {
		name: "DNU",
		pokemonFilter: species => species.doublesTier === '(DUU)',
	},
};
