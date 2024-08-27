export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	risingsun: {
		name: "Rising Sun",
		shortDesc: "Immune to the downsides of World Effects of order.",
	},
	fallingstar: {
		name: "Falling Star",
		shortDesc: "Immune to the downsides of World Effects of chaos.",
	},
	tellurian: {
		name: "Tellurian",
		shortDesc: "Immune to the downsides of World Effects of earth.",
	},
	celestial: {
		name: "Celestial",
		shortDesc: "Immune to the downsides of World Effects of sky.",
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
	powerconstruct: {
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Flocura' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.species.id === 'flocuranexus' || pokemon.hp > pokemon.maxhp / 2) return;
			this.add('-activate', pokemon, 'ability: Power Construct');
			pokemon.formeChange('Flocura-Nexus', this.effect, true);
			pokemon.baseMaxhp = Math.floor(Math.floor(
				2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
			) * pokemon.level / 100 + 10);
			const newMaxHP = pokemon.volatiles['dynamax'] ? (2 * pokemon.baseMaxhp) : pokemon.baseMaxhp;
			pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
			pokemon.maxhp = newMaxHP;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Power Construct",
		rating: 5,
		num: 211,
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
	schooling: {
		onStart(pokemon) {
		if (pokemon.baseSpecies.baseSpecies !== 'Jaegorm' || pokemon.transformed) return;
		if (pokemon.hp > pokemon.maxhp / 4) {
			if (pokemon.species.id === 'jaegorm') {
				pokemon.formeChange('Jaegorm-Collective');
			}
			} else {
				if (pokemon.species.id === 'jaegormcollective') {
					pokemon.formeChange('Jaegorm');
				}
			}
		},
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (
			pokemon.baseSpecies.baseSpecies !== 'Jaegorm' ||
			pokemon.transformed || !pokemon.hp
			) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'jaegorm') {
					pokemon.formeChange('Jaegorm-Collective');
				}
			} else {
				if (pokemon.species.id === 'jaegormcollective') {
					pokemon.formeChange('Jaegorm');
				}
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Schooling",
		shortDesc: "If user is Jaegorm, changes to Collective Form if it has > 1/4 max HP, else Solo Form.",
		rating: 3,
		num: 208,
	},
	shellbunker: {
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move' || !target.hurtThisTurn) return damage;
			return damage / 2;
		},
		name: "Shell Bunker",
		shortDesc: "After taking damage, Def and SpD are doubled for the rest of the turn.",
	},
	// crystalline: {
	// onSourceModifyAtkPriority: 6,
	// onSourceModifyAtk(atk, attacker, defender, move) {
	// if (move.type === 'Crystal' || move.type === 'Rock') {
	// this.debug('Crystalline weaken');
	// return this.chainModify(0.5);
	// }
	// },
	// onSourceModifySpAPriority: 5,
	// onSourceModifySpA(atk, attacker, defender, move) {
	// if (move.type === 'Crystal' || move.type === 'Rock') {
	// this.debug('Crystalline weaken');
	// return this.chainModify(0.5);
	// }
	// },
	// name: "Crystalline",
	// shortDesc: "Reduces damage from Rock and Crystal by 50%.",
	// rating: 3.5,
	// },
	// wildroots: {
	// onSourceModifyAtkPriority: 6,
	// onSourceModifyAtk(atk, attacker, defender, move) {
	// if (move.type === 'Fairy' || move.type === 'Feral') {
	// this.debug('Wild Roots weaken');
	// return this.chainModify(0.5);
	// }
	// },
	// onSourceModifySpAPriority: 5,
	// onSourceModifySpA(atk, attacker, defender, move) {
	// if (move.type === 'Fairy' || move.type === 'Feral') {
	// this.debug('Wild Roots weaken');
	// return this.chainModify(0.5);
	// }
	// },
	// shortDesc: "Reduces damage from Fairy and Feral by 50%.",
	// name: "Wild Roots",
	// rating: 3.5,
	// },
	// growthpower: {
	// onTryHitPriority: 1,
	// onTryHit(target, source, move) {
	// if (target !== source && move.type === 'Grass') {
	// this.field.setTerrain('grassyterrain');
	// this.add('-immune', target, '[from] ability: Growth Power');
	// return null;
	// }
	// },
	// onAllyTryHitSide(target, source, move) {
	// if (target === this.effectState.target || target.side !== source.side) return;
	// if (move.type === 'Grass') {
	// this.field.setTerrain('grassyterrain');
	// }
	// },
	// onSwitchIn(pokemon) {
	// if (pokemon.hp > pokemon.maxhp / 2) target.m.growthPower = false;
	// },
	// onResidual(pokemon) {
	// if (pokemon.hp > pokemon.maxhp / 2) target.m.growthPower = false;
	// },
	// onDamage(damage, target, source, move) {
	// if (!move || move.effectType !== 'Move' || !source) return;
	// if (!target.m.growthPower) {
	// target.m.growthPower = true
	// this.field.setTerrain('grassyterrain');
	// }
	// },
	// shortDesc: "If knocked below 50% or hit by a Grass move, sets Grassy Terrain. Immune to Grass moves.",
	// name: "Growth Power",
	// },
};
