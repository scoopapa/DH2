export const Rulesets: {[k: string]: ModdedFormatData} = {
	supertypemovesrule: {
		effectType: 'Rule',
		name: 'Super Type Moves Rule',
		desc: 'Prevents pokemon from using Crystal or Feral moves unless they have a matching type.',
		onBeforeMove(pokemon, target, move) {
			move = Dex.mod("scootopia").moves.get(move);
			if (move.type === "Crystal" && !pokemon.hasType("Crystal")) return false;
			if (move.type === "Feral" && !pokemon.hasType("Feral")) return false;
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				const move = Dex.mod("scootopia").moves.get(moveSlot.id);
				if ((move.type === "Crystal" && !pokemon.hasType("Crystal")) || (move.type === "Feral" && !pokemon.hasType("Feral"))) {
					pokemon.disableMove(moveSlot.id, false);
				}
			}
		},
	},
	supertypeclause: {
		effectType: 'ValidatorRule',
		name: 'Super Type Clause',
		desc: 'Bans Super Type Moves and Items.',
		banlist: ["Crystal Orb", "Feral Orb", "Crystal Cutter", "Crystal Tail", "Crystal Bash",
				"Crystal Burst", "Crystal Cage", "Crystal Beam", "Crystal Healing", "Crystal Shard",
				"Crystal Fortification", "Feral Power", "Feral Breath", "Feral Shriek", "Feral Rush",
				"Feral Bite", "Feral Shred", "Feral Spray", "Feral Resilience", "Feral Healing"],
	},
};
