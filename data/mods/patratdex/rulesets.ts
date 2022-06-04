export const Formats: {[k: string]: FormatData} = {
  realmonclause: {
		effectType: 'ValidatorRule',
		name: 'Realmon Clause',
		desc: "Bans all previously-existing Pokemon.",
		onValidateSet(set) {
			const species = this.dex.getSpecies(set.species);
			const exceptions = ["onix", "onixpatratdex", "wobbuffet", "wobbuffetpatratdex", "spoink", "spoinkpatratdex", "wynaut", "wynautpatratdex", "luvdisc", "luvdiscpatratdex", "carnivine", "carnivinepatratdex", "patrat", "patratpatratdex", "watchog", "watchogpatratdex", "vanillite", "valillitepatratdex", "vanillish", "vanillishpatratdex", "vanilluxe", "vanilluxepatratdex", "litwick", "litwickpatratdex", "lampent", "lampentpatratdex", "chandelure", "chandelurepatratdex",]
			if (!(exceptions.includes(species.id)) && (species.num < 1000)) {
				return [
							"Previously-existing Pokemon are banned. Please use the Pokemon created for this mod.",
				];
     		}
    	},
  },
};
