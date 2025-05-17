export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		customTiers: ['Mega'],
		customDoublesTiers: ['Mega'],
	},
	init() {
		for (const id in this.dataCache.Pokedex) {
			const pokemon = this.dataCache.Pokedex[id];

			if (pokemon.movepoolAdditions) {
				for (const move of pokemon.movepoolAdditions) {
					this.modData('Learnsets', this.toID(id)).learnset[this.toID(move)] = ["9M"];
				}
			}

			if (!pokemon || !pokemon.mega) continue; // weeding out Pokémon that aren't new Megas
			const newMega = this.dataCache.Pokedex[pokemon.mega] = {name: pokemon.megaName};

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
			if (!this.modData('FormatsData', pokemon.mega)) this.data.FormatsData[pokemon.mega] = {tier: "Mega", doublesTier: "Mega"};
		}
	},

	actions: {
	canMegaEvo(pokemon) { // modded for forms
		const altForme = pokemon.baseSpecies.otherFormes && this.dex.species.get(pokemon.baseSpecies.otherFormes[0]);
		const item = pokemon.getItem();
		if (
			altForme?.isMega && altForme?.requiredMove &&
			pokemon.baseMoves.includes(this.toID(altForme.requiredMove)) && !item.zMove
		) {
			return altForme.name;
		}
		if (item.name === "Ninetalesite" && pokemon.species.id === "Ninetales-Alola") return null;
		if (item.name === "Dugtrionite") {
			if (pokemon.species.name === "Dugtrio-Alola") return "Dugtrio-Alola-Mega";
			else return null;
		}
		if (item.name === "Arcanite" && pokemon.species.name === "Arcanine-Hisui") return null;
		if (item.megaEvolves !== pokemon.species.name || item.megaStone === pokemon.species.name) return null;
		return item.megaStone;
	},
	},
	pokemon: {
		isGrounded(negateImmunity = false) {
			if ('gravity' in this.battle.field.pseudoWeather) return true;
			if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
			if ('smackdown' in this.volatiles) return true;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return true;
			// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
			if (!negateImmunity && this.hasType('Flying') && !(this.hasType('???') && 'roost' in this.volatiles)) return false;
			if (this.hasAbility('levitate') && !this.battle.suppressingAbility(this)) return null;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			if ('poolfloaties' in this.volatiles) return false;
			for (const target of this.battle.getAllActive()) {
				if (target.hasAbility('uplifting')) {
					return null;
				}
			}
			return item !== 'airballoon';
		},
	},
};
