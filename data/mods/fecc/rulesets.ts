export const Rulesets: {[k: string]: ModdedFormatData} = {
	intromod: {
		effectType: 'Rule',
		name: 'Intro Mod',
		desc: 'plays the intro for fecc',
		onBegin() {
			this.add('-message', "");
			this.add('-message', "Welcome to Fusion Evolution Corrupt Council! This is one of the April Fools formats from the Fusion Evolution series, built to be fun and chaotic.");
			this.add('-message', "In this format, there are 151 fusions, each with an unique ability with some wacky effect.");
			this.add('-message', "Both the fusions and their abilities are hidden to the players, however, their effects are always some sort of mix of real ability effects, depending on the abilities of the Pokémon used for the fusions. ");
			this.add('-message', "Go out there and try to figure out how each ability works!");
			this.add('-message', "");
		},
	},
};
