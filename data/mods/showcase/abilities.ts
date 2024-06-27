export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	galewings: {
		inherit: true,
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.type === 'Flying' && pokemon.hp === pokemon.maxhp) return priority + 2;
		},
		shortDesc: "If this Pokemon is at full HP, its Flying-type moves have their priority increased by 2.",
	
};
