export const Scripts: ModdedBattleScriptsData = {
	inherit: 'm4av6',
	init() {
		const newMoves = (mon: string, moves: string[]) => {
			for (const move of moves) {
				this.modData('Learnsets', this.toID(mon)).learnset[this.toID(move)] = ["8M"];
			}
		};
		newMoves("exploud", ["clangingscales", "darkpulse", "snarl"]);
		newMoves("toxtricity", ["frustration", "hiddenpower", "icepunch", "magnetrise", "return", "thundercage"]);
		newMoves("toxtricitylowkey", ["frustration", "hiddenpower", "magnetrise", "return", "slackoff", "thundercage", "toxicspikes"]);
		newMoves("noivern", ["blazekick", "calmmind", "eeriespell", "metalsound", "psychic", "psychicfangs", "psyshock", "snarl", "zenheadbutt"]);
	},
	canMegaEvo(pokemon) {
		const altForme = pokemon.baseSpecies.otherFormes && this.dex.getSpecies(pokemon.baseSpecies.otherFormes[0]);
		const item = pokemon.getItem();
		if (
			altForme?.isMega && altForme?.requiredMove &&
			pokemon.baseMoves.includes(this.toID(altForme.requiredMove)) && !item.zMove
		) {
			return altForme.name;
		}
		if (item.name === "Lycanite" && pokemon.baseSpecies.name === "Lycanroc-Midnight") {
			return "Lycanroc-Midnight-Mega";
		}
		if (item.name === "Lycanite" && pokemon.baseSpecies.name === "Lycanroc-Dusk") {
			return "Lycanroc-Dusk-Mega";
		}
		if (item.name === "Raichunite" && pokemon.baseSpecies.name === "Raichu-Alola") {
			return null;
		}
		if (item.name === "Slowbronite" && pokemon.baseSpecies.name === "Slowbro-Galar") {
			return null;
		}
		if (item.name === "Slowkinite" && pokemon.baseSpecies.name === "Slowking-Galar") {
			return null;
		}
		if (item.name === "Gourgeite" && pokemon.baseSpecies.name === "Gourgeist-Small") {
			return "Gourgeist-Small-Mega";
		}
		if (item.name === "Gourgeite" && pokemon.baseSpecies.name === "Gourgeist-Large") {
			return "Gourgeist-Large-Mega";
		}
		if (item.name === "Gourgeite" && pokemon.baseSpecies.name === "Gourgeist-Super") {
			return "Gourgeist-Super-Mega";
		}
		if (item.name === "Reginite" && pokemon.baseSpecies.name === "Regice") {
			return "Regice-Mega";
		}
		if (item.name === "Reginite" && pokemon.baseSpecies.name === "Registeel") {
			return "Registeel-Mega";
		}
		if (item.name === "Meowsticite" && pokemon.baseSpecies.name === "Meowstic-F") {
			return "Meowstic-F-Mega";
		}
		if (item.name === "Sawsbuckite" && pokemon.baseSpecies.name === "Delibird") {
			return "Delibird-Mega-Festive-Rider";
		}
		if (item.name === "Sawsbuckite" && pokemon.baseSpecies.name === "Sawsbuck-Summer") {
			return "Sawsbuck-Summer-Mega";
		}
		if (item.name === "Sawsbuckite" && pokemon.baseSpecies.name === "Sawsbuck-Autumn") {
			return "Sawsbuck-Autumn-Mega";
		}
		if (item.name === "Sawsbuckite" && pokemon.baseSpecies.name === "Sawsbuck-Winter") {
			return "Sawsbuck-Winter-Mega";
		}
		if (item.name === "Mossy Sandwich" && pokemon.baseSpecies.name === "Toxtricity-Low-Key") {
			return "Toxtricity-Low-Key-Mega-Mossy";
		}
		if (item.name === "Ausma" && pokemon.baseSpecies.name === "Noivern") {
			return "Noivern-Mega-Ausma";
		}
		if (item.name === "BitBitio" && pokemon.baseSpecies.name === "Toxtricity-Low-Key") {
			return "Toxtricity-Low-Key-Mega-BitBitio";
		}
		if (item.name === "BitBitio" && pokemon.baseSpecies.name === "Noivern") {
			return "Noivern-Mega-BitBitio";
		}
		if (item.megaEvolves !== pokemon.baseSpecies.name || item.megaStone === pokemon.species.name) {
			return null;
		}
		return item.megaStone;
	},
};
