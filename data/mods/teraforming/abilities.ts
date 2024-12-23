export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	soulfulnoise: {
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.flags['sound']) {
				this.heal(pokemon.baseMaxhp / 8, pokemon);
			}
		},
		flags: {},
		name: "Soulful Noise",
		rating: 3.5,
		shortDesc: "Every time this Pokemon successfully uses a sound move, it heals 12.5% of its max HP.",
	},
	uptime: {
		onModifyPriority(priority, pokemon, target, move) { 
      // TO-DO add Taunt but only when the Uptime mon has a status move and Heal Block when it has a healing move
      // Also add having an Assault Vest + status move
			if (
				pokemon.volatiles['disable'] || pokemon.volatiles['encore'] || pokemon.volatiles['choicelock'] ||
         	pokemon.volatiles['torment'] || pokemon.volatiles['gigatonhammer']
			) { 
        		return priority + 1;
      	}
		},
		flags: {},
		name: "Uptime",
		rating: 3.5,
		shortDesc: "If any of this Pokemon's moves are disabled, this Pokemon's next move has +1 priority.",
	},
};
