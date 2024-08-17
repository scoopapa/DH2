export const Abilities: { [abilityid: string]: ModdedAbilityData } = {
	cosmicenergy: {
		desc: "This Pokémon can skip the charging turn of its moves.",
		shortDesc: "Skip charging turns of moves.",
		onChargeMove(pokemon, target, move) {
			this.debug('Solar Core - remove charge turn for ' + move.id);
			this.attrLastMove('[still]');
			this.addMove('-anim', pokemon, move.name, target);
			return false; 
		},
		name: "Cosmic Energy",
		rating: 2,
		num: -1,
	},
};
