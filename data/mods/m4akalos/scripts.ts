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
			pokemon.formeOrder = pokemon.formeOrder ? pokemon.formeOrder.concat([newMega.name]) : [pokemon.name, pokemon.megaName];

			newMega.num = pokemon.num;
			newMega.baseSpecies = pokemon.name;
			newMega.forme = "Mega";

			newMega.types = pokemon.megaType || pokemon.types;
			newMega.abilities = pokemon.megaAbility || pokemon.abilities;
			newMega.baseStats = pokemon.megaStats || pokemon.baseStats;
			newMega.heightm = pokemon.megaHeightm || pokemon.heightm;
			newMega.weightkg = pokemon.megaWeightkg || pokemon.weightkg;
			newMega.eggGroups = pokemon.eggGroups;
			newMega.color = pokemon.megaColor || pokemon.color;

			newMega.creator = pokemon.megaCreator || null;
			newMega.requiredItem = pokemon.megaStone || null;
			if (!this.modData('FormatsData', pokemon.mega)) this.data.FormatsData[pokemon.mega] = { tier: "Mega" };
		}
	},
	canMegaEvo(pokemon) { // modded for forms
		const altForme = pokemon.baseSpecies.otherFormes && this.dex.getSpecies(pokemon.baseSpecies.otherFormes[0]);
		const item = pokemon.getItem();
		if (
			altForme?.isMega && altForme?.requiredMove &&
			pokemon.baseMoves.includes(this.toID(altForme.requiredMove)) && !item.zMove
		) {
			return altForme.name;
		}
		if (item.name === "Wormadamite" && (pokemon.baseSpecies.name === "Wormadam" || pokemon.baseSpecies.name === "Wormadam-Trash")) {
			return null;
		}
		if (item.megaEvolves !== pokemon.baseSpecies.name || item.megaStone === pokemon.species.name) {
			return null;
		}
		return item.megaStone;
	},
};
