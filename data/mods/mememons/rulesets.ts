export const Rulesets: {[k: string]: ModdedFormatData} = {
  realmonclause: {
		effectType: 'ValidatorRule',
		name: 'Realmon Clause',
		desc: "Bans all previously-existing Pokemon.",
		onValidateSet(set) {
			const species = this.dex.species.get(set.species);
//			const exceptions = ["empty",]
			if (/*!(exceptions.includes(species.id)) && */(species.num < 1000)) {
				return [
							"Previously-existing Pokemon are banned. Please use the Pokemon created for this mod.",
				];
     		}
    	},
  },
};
