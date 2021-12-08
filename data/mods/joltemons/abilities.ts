export const Abilities: {[k: string]: ModdedAbilityData} = {
	lightpower: {
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.chainModify(2);
		},
		name: "Light Power",
    shortDesc: "This Pokemon's Special Attack is doubled.",
	},
	raindish: {
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.field.isWeather(['raindance', 'primordialsea'])) return;
			this.heal(pokemon.maxhp / 8);
		},
		onTerrain(pokemon) {
			if (!this.field.isTerrain('grassyterrain')) return;
			this.heal(pokemon.maxhp / 16);
		},
		onWeather(target, source, effect) {
			if (!target.hasItem('utilityumbrella')) return;
			if (!effect.id === 'raindance' || !effect.id === 'primordialsea') {
				this.heal(target.baseMaxhp / 16);
			}
		},
		name: "Rain Dish",
    shortDesc: "Heals 6.25% of user's max HP at the end of each turn. Heals 12.5% in Rain.",
		num: 44,
	},
	icebody: {
		onResidualOrder: 5,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.field.isWeather('hail')) return;
			this.heal(pokemon.maxhp / 8);
		},
		onTerrain(pokemon) {
			if (!this.field.isTerrain('grassyterrain')) return;
			this.heal(pokemon.maxhp / 16);
		},
		onWeather(target, source, effect) {
			if (!effect.id === 'hail') {
				this.heal(target.baseMaxhp / 16);
			}
		},
		name: "Ice Body",
    shortDesc: "Heals 6.25% of user's max HP at the end of each turn. Heals 12.5% in Hail.",
		num: 115,
	},
};
