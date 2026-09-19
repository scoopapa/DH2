export const Rulesets: {[k: string]: ModdedFormatData} = {
    lamanchalandrule: {
		name: "La Manchaland Rule",
		effectType: "Rule",
		desc: `La Manchaland's Don Quixote starts the battle at 50% maximum HP.`,
		onBegin() {
			for (const side of this.sides) {
				for (const pokemon of side.pokemon) {
					if (pokemon.set.ability === 'returningbloodlust') pokemon.sethp (Math.floor(pokemon.baseMaxhp/2));
				}
			}
		},
	},
};