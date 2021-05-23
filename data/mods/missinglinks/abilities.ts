export const Abilities: {[k: string]: ModdedAbilityData} = {
	 oceanicveil: {
       shortDesc: "On switch-in, this Pokemon uses Aqua Ring.",
       onStart(source) {
           this.useMove("Aqua Ring", source);
       },
       name: "Oceanic Veil",
       rating: 3,
    },
};
