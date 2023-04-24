export const Formats: {[k: string]: FormatData} = {
	supertypemovesrule: {
		effectType: 'Rule',
		name: 'Super Type Moves Rule',
		desc: 'Prevents pokemon from using Crystal or Feral moves unless they have a matching type.',
		onBeforeMove(pokemon, target, move) {
			move = Dex.mod("scootopia").getMove(move);
			if (move.type === "Crystal" && !pokemon.hasType("Crystal")) return false;
			if (move.type === "Feral" && !pokemon.hasType("Feral")) return false;
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				let move = Dex.mod("scootopia").getMove(moveSlot.id);
				if ((move.type === "Crystal" && !pokemon.hasType("Crystal")) || (move.type === "Feral" && !pokemon.hasType("Feral"))) {
					pokemon.disableMove(moveSlot.id, false);
				}
			}
		},
	},
};
