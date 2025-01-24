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
		desc: "Boosted 1.3x by Mega Launcher. Doesn't affect Bulletproof Pokémon.",
		moveFilter: move => 'bullet' in move.flags,
	},
	bludg: {
		name: "Bludgeon",
		desc: "Boosted 1.5x by Bludgeon.",
		moveFilter: move => 'bludg' in move.flags,
	},
	slicing: {
		name: "Slicing",
		desc: "Boosted 1.3x by Sharpness.",
		moveFilter: move => 'slicing' in move.flags,
	},
	// Tiers
	// -----
	esh: {
		name: "ESH",
		pokemonFilter: species => species.tier === 'ESH',
	},
};
