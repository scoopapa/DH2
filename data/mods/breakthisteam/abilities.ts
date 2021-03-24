export const Abilities: {[k: string]: ModdedAbilityData} = {
	ignorant: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (move.category !== 'Status' && !move.ignoreImmunity) {
				move.ignoreImmunity = true;
			}
		},
		name: "Ignorant",
		shortDesc: "This Pokemon's attacking moves ignore type immunities.",
	},
};