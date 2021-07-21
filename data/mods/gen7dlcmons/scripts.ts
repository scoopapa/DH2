export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen7',
	init: function () {
		for (const id in this.dataCache.Pokedex) {
			let unbanlist = this.dataCache.Formats['gen7dlcmons'].unbanlist;
			let speciesName = this.dataCache.Pokedex[id].name;
			if (!unbanlist.includes(speciesName)) {
				// if (this.dataCache.FormatsData[id] !== undefined) this.dataCache.FormatsData[id].tier = "Illegal";
			}
		}
		this.modData('Learnsets', 'kommoo').learnset.clangoroussoul = ['7T'];
	},

	pokemon: {
		ignoringAbility() {
			// Check if any active pokemon have the ability Neutralizing Gas
			let neutralizinggas = false;
			let fishingrod = false;
			for (const pokemon of this.battle.getAllActive()) {
				// can't use hasAbility because it would lead to infinite recursion
				if (pokemon.item === 'fishingrod') fishingrod = true;
				if (pokemon.ability === ('neutralizinggas' as ID) && !pokemon.volatiles['gastroacid'] && !pokemon.abilityData.ending) {
					neutralizinggas = true;
				}
			}

			return !!(
				(this.battle.gen >= 5 && !this.isActive) ||
				(this.volatiles['gastroacid'] || (neutralizinggas && this.ability !== ('neutralizinggas' as ID)) || (fishingrod && this.hasType('Water')) &&
				!this.getAbility().isPermanent
				)
			);
		}
	},
};