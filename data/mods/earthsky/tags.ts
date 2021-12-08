interface TagData {
	name: string;
	desc?: string;
	pokemonFilter?: (species: Species) => boolean;
	moveFilter?: (move: Move) => boolean;
}

export const Tags: {[id: string]: ModdedTagData} = {
	sound: {
		name: "Sound",
		desc: "Doesn't affect Soundproof Pokémon. Boosted by Cacophony. All sound moves also bypass Substitute.",
		moveFilter: move => 'sound' in move.flags,
	},
	powder: {
		name: "Powder",
		desc: "Doesn't affect Grass-type Pokémon, Overcoat or Immunity Pokémon, or Safety Goggles holders.",
		moveFilter: move => 'powder' in move.flags,
	},
	fist: {
		name: "Fist",
		desc: "Boosted 1.3x by Iron Fist.",
		moveFilter: move => 'punch' in move.flags,
	},
	bite: {
		name: "Bite",
		desc: "Boosted 1.5x by Strong Jaw.",
		moveFilter: move => 'bite' in move.flags,
	},
	bullet: {
		name: "Shot",
		desc: "Boosted 1.5x by Mega Launcher. Doesn't affect Bulletproof Pokémon.",
		moveFilter: move => 'bullet' in move.flags,
	},
	bludg: {
		name: "Bludgeon",
		desc: "Boosted 1.5x by Bludgeon.",
		moveFilter: move => 'bludg' in move.flags,
	},
	// Tiers
	// -----
	earthsky: {
		name: "ES OU",
		pokemonFilter: species => species.tier === 'ES',
	},
	//True custom tiers don't work for indiscernable reasons
	esuber: {
		name: "ES Uber",
		pokemonFilter: species => species.tier === 'ES Uber',
	},
	esou: {
		name: "ES OU",
		pokemonFilter: species => species.tier === 'ES OU',
	},
	esnfe: {
		name: "ES NFE",
		pokemonFilter: species => species.tier === 'ES NFE',
	},
	eslc: {
		name: "ES LC",
		pokemonFilter: species => species.tier === 'ES LC',
	},
};
