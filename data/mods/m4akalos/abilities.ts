export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	pounce: {
		desc: "This Pokémon is immune to all entry hazards. If it lands on any type of entry hazard, it lowers the Sp. Def of adjacent opponents.",
		shortDesc: "Hazard immunity. Lowers adjacent opponents' Sp. Def by 1 stage if switched in on them.",
		onStart(pokemon) {
			let activated = false;
			for (const sideCondition of ['gmaxsteelsurge', 'spikes', 'stealthrock', 'stickyweb', 'toxicspikes']) {
				if (pokemon.side.getSideCondition(sideCondition)) {
					for (const target of pokemon.side.foe.active) {
						if (!target || !target.isAdjacent(pokemon)) continue;
						if (!activated) {
							this.add('-ability', pokemon, 'Pounce', 'boost');
							activated = true;
						}
						if (target.volatiles['substitute']) {
							this.add('-immune', target);
						} else {
							this.boost({spd: -1}, target, pokemon, null, true);
						}
					}
					return;
				}
			}
		},
		hazardImmune: true,
		name: "Pounce",
		rating: 4,
		num: -1001,
	},
};
