// Note: These are the rules that formats use
// The list of formats is stored in config/formats.js
export const Formats: {[k: string]: FormatData} = {

	// Rulesets
	///////////////////////////////////////////////////////////////////

	
	littlecup: {
		effectType: 'ValidatorRule',
		name: 'Little Cup',
		desc: "Only allows Pok&eacute;mon that can evolve and don't have any prior evolutions",
		onValidateSet(set) {
			const species = this.dex.getSpecies(set.species || set.name);
			if (species.prevo && this.dex.getSpecies(species.prevo).gen <= this.gen) {
				return [set.species + " isn't the first in its evolution family."];
			}
			if (!species.nfe) {
				return [set.species + " doesn't have an evolution family."];
			}
			// Temporary hack for LC past-gen formats and other mashups
			if (set.level > 5) {
				return [`${set.species} can't be above level 5 in Little Cup formats.`];
			}
		},
	},
	notfullyevolved: {
		effectType: 'ValidatorRule',
		name: 'Not Fully Evolved',
		desc: "Bans Pok&eacute;mon that are fully evolved or can't evolve",
		onValidateSet(set) {
			const species = this.dex.getSpecies(set.species);
			if (!species.nfe) {
				return [set.species + " cannot evolve."];
			}
		},
	},
};
