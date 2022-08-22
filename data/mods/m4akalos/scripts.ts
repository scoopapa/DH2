export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['Mega', 'Kalos', 'Kalos (NFE)'],
		customDoublesTiers: ['Mega', 'Kalos', 'Kalos (NFE)'],
	},
	init() {
		for (const id in this.dataCache.Pokedex) {
			let pokemon = this.dataCache.Pokedex[id];

			if (pokemon.movepoolAdditions) {
				for (const move of pokemon.movepoolAdditions) {
					this.modData('Learnsets', this.toID(id)).learnset[this.toID(move)] = ["8M"];
				}
			}

			if (!pokemon || !pokemon.mega) continue; // weeding out Pokémon that aren't new Megas
			const newMega = this.dataCache.Pokedex[pokemon.mega] = { name: pokemon.megaName };

			pokemon.otherFormes = pokemon.otherFormes ? pokemon.otherFormes.concat([newMega.name]) : [pokemon.megaName];
			pokemon.formeOrder = pokemon.formeOrder ? pokemon.formeOrder.concat([newMega.name]) : [pokemon.name, pokemon.megaName];;

			newMega.num = pokemon.num;
			newMega.baseSpecies = pokemon.name;
			newMega.forme = "Mega";

			newMega.type = pokemon.megaType || pokemon.types;
			newMega.abilities = pokemon.megaAbility || pokemon.abilities;
			newMega.baseStats = pokemon.megaStats || pokemon.baseStats;
			newMega.heightm = pokemon.megaHeightm || pokemon.heightm;
			newMega.weightkg = pokemon.megaWeightkg || pokemon.weightkg;
			newMega.eggGroups = pokemon.eggGroups;
			newMega.color = pokemon.megaColor || pokemon.color;

			newMega.creator = pokemon.megaCreator || null;

			if (pokemon.megaStone) {
				newMega.requiredItem = pokemon.megaStone;
				const newMegaStone = {
					name: newMega.megaStone,
					spritenum: 586,
					megaStone: newMega.name,
					megaEvolves: newMega.baseSpecies,
					itemUser: [newMega.baseSpecies],
					onTakeItem(item, source) {
						if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
						return true;
					},
					num: -1000 - newMega.num,
					gen: 8,
					desc: "Allows the holder to Mega Evolve in battle.",
				};
				if (this.data.Items[newMega.megaStone]) this.data.Items[newMega.megaStone] = newMegaStone;
			}

			if (!this.modData('FormatsData', pokemon.mega)) this.data.FormatsData[pokemon.mega] = { tier: "Mega" };
		}
	},
};
