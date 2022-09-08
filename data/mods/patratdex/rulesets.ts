export const Formats: {[k: string]: FormatData} = {
  realmonclause: {
		effectType: 'ValidatorRule',
		name: 'Realmon Clause',
		desc: "Bans all previously-existing Pokemon.",
		onValidateSet(set) {
			const species = this.dex.getSpecies(set.species);
			const exceptions = ["onixpatratdex", "wobbuffetpatratdex", "spoinkpatratdex", "wynautpatratdex", "luvdiscpatratdex", "carnivinepatratdex", "patratpatratdex", "watchogpatratdex", "valillitepatratdex", "vanillishpatratdex", "vanilluxepatratdex", "litwickpatratdex", "lampentpatratdex", "chandelurepatratdex",]
			const forms = ["incrownitoflock", "monstratahammer", "carnivinepatratdexrevealed", "monsoonurachunky",]
			if (!(exceptions.includes(species.id)) && (species.num < 1000)) {
				return [
							"Previously-existing Pokemon are banned. Please use the Pokemon created for this mod.",
				];
     		}
			if (forms.includes(species.id)) {
				return [
							"Your team contains an alternate form that is only available mid-battle.",
				];
     		}
    	},
  },
};
