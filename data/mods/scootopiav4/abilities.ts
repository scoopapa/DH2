export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	soulheart: {
		shortDesc: "Recovers 10% HP for each fallen Pokemon since last switch-in.",
		onStart(pokemon) {
			let fallen = 0;
			if (pokemon.side.totalFainted) fallen += Math.min(pokemon.side.totalFainted, 5);
			if (pokemon.side.foe.totalFainted) fallen += Math.min(pokemon.side.foe.totalFainted, 5);
			if (fallen > 0) this.add('-activate', pokemon, 'ability: Soul Heart');
			if (!pokemon.m.fallenAbsorbed) pokemon.m.fallenAbsorbed = 0;
			let toAbsorb = fallen - pokemon.m.fallenAbsorbed;
			this.heal((pokemon.baseMaxhp / 10) * toAbsorb);
			pokemon.m.fallenAbsorbed = fallen;
		},
		flags: {},
		name: "Soul Heart",
		rating: 4,
	},
	mythicalpresence: {
		name: "Mythical Presence",
		shortDesc: "Lowers opposing Pokemon Special Attack by 1 stage when switching in.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !target.isAdjacent(pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Mythical Presence', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spa: -1}, target, pokemon, null, true);
				}
			}
		},
	},
	mythic: {
		name: "Mythic",
		shortDesc: "Lowers opposing Pokemon Special Attack by 1 stage when switching in.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !target.isAdjacent(pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Mythic', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spa: -1}, target, pokemon, null, true);
				}
			}
		},
	},
	battlebond: {
		shortDesc: "Change to a stronger forme after getting a KO.",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect?.effectType !== 'Move') {
				return;
			}
			if (source.species.id === 'soleron' && source.hp && !source.transformed && source.side.foe.pokemonLeft) {
				this.add('-activate', source, 'ability: Battle Bond');
				source.formeChange('Soleron-Awakened', this.effect, true);
			}
		},
		onModifyMovePriority: -1,
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Battle Bond",
		rating: 4,
		num: 210,
	},
};
