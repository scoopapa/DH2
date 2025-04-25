export const Conditions: { [k: string]: ConditionData; } = {
	frz: {
		inherit: true,
		start: "  [Pokemon] was chilled!",
		alreadyStarted: "  [POKEMON] is already chilled!",
		end: "  [POKEMON] warmed up!",
		endFromItem: "  [POKEMON]'s [ITEM] warmed it up!",
		endFromMove: "  [POKEMON]'s [MOVE] warmed it up!",
		cant: "[POKEMON] is chilled!",
		onBeforeMove(pokemon, target, move) {},
		onResidualOrder: 10,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 16);
		},
		onModifySpA(spa, pokemon) {
			return this.chainModify(0.5);
		},
		onStart(target, source, sourceEffect) {
			this.add('-start', target, 'Frostbite', '[silent]');
			this.add('-message', `${target.name} was frostbitten!`);
		},
	},
};