interface TagData {
	name: string;
	desc?: string;
	speciesFilter?: (species: Species) => boolean;
	moveFilter?: (move: Move) => boolean;
	genericFilter?: (thing: Species | Move | Item | Ability) => boolean;
	speciesNumCol?: (species: Species) => number;
	moveNumCol?: (move: Move) => number;
	genericNumCol?: (thing: Species | Move | Item | Ability) => number;
}

export const Tags: {[id: string]: TagData} = {
	uber: {
		name: "Uber",
		speciesFilter: species => species.tier === 'Uber' || species.tier === '(Uber)' || species.tier === 'AG',
	},
	ou: {
		name: "OU",
		speciesFilter: species => species.tier === 'OU' || species.tier === '(OU)',
	},
	uubl: {
		name: "UUBL",
		speciesFilter: species => species.tier === 'UUBL',
	},
	uu: {
		name: "UU",
		speciesFilter: species => species.tier === 'UU',
	},
	rubl: {
		name: "RUBL",
		speciesFilter: species => species.tier === 'RUBL',
	},
	ru: {
		name: "RU",
		speciesFilter: species => species.tier === 'RU',
	},
	nubl: {
		name: "NUBL",
		speciesFilter: species => species.tier === 'NUBL',
	},
	nu: {
		name: "NU",
		speciesFilter: species => species.tier === 'NU',
	},
	publ: {
		name: "PUBL",
		speciesFilter: species => species.tier === 'PUBL',
	},
	pu: {
		name: "PU",
		speciesFilter: species => species.tier === 'PU' || species.tier === '(NU)',
	},
	zu: {
		name: "ZU",
		speciesFilter: species => species.tier === '(PU)',
	},
	nfe: {
		name: "NFE",
		speciesFilter: species => species.tier === 'NFE',
	},
	lc: {
		name: "LC",
		speciesFilter: species => species.doublesTier === 'LC',
	},
	ag: {
		name: "AG",
		speciesFilter: species => species.tier === 'AG',
	},
};