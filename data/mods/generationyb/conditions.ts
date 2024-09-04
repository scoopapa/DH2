export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	aurumaura: {
		name: 'Aurum Aura',
		noCopy: true,
		onStart(pokemon) {
      	this.add('-start', pokemon, 'Aurum Aura');
				this.add('-message', `${pokemon.name}'s glistening aura changes its attacks' categories to what they were in the past!`);
      // Aurum Aura abils here later
		},
		onModifyMovePriority: 8,
		onModifyMove(move, pokemon) {
			if (move.category === "Status") return;
			if (['Fire', 'Water', 'Grass', 'Electric', 'Dark', 'Psychic', 'Dragon', 'Fairy'].includes(move.type)) {
				move.category = "Special";
			} else {
				move.category = "Physical";
			}
		},
		onBeforeSwitchOutPriority: -1,
		onBeforeSwitchOut(pokemon) {
			this.actions.useMove("Aurum Aura Used", pokemon, pokemon);
		},
	},
};
