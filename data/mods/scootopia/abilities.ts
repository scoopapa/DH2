export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	// metamorphosis: {
		// num: 1016,
		// name: "Metamorphosis",
		// shortDesc: "50% boost to moves of the same type as the first move used.",
		// onSourceHit(target, source, move) {
			// if (!move || !target) return;
			// if (target !== source && move.category !== 'Status') {
				// source.addVolatile("metamorphosis");
			// }
		// },
		// condition: {
			// noCopy: true, // doesn't get copied by Baton Pass
			// onStart(target) {
				// this.add('-start', target, 'ability: Metamorphosis');
				// target.m.metaType = target.lastMove.type;
			// },
			// onModifyAtkPriority: 5,
			// onModifyAtk(atk, attacker, defender, move) {
				// if (move.type === attacker.m.metaType && attacker.hasAbility('metamorphosis')) {
					// return this.chainModify(1.5);
				// }
			// },
			// onModifySpAPriority: 5,
			// onModifySpA(atk, attacker, defender, move) {
				// if (move.type === attacker.m.metaType && attacker.hasAbility('metamorphosis')) {
					// return this.chainModify(1.5);
				// }
			// },
			// onEnd(target) {
				// this.add('-end', target, 'ability: Metamorphosis', '[silent]');
			// },
		// },
	// },
	mythicalpresence: {
		name: "Mythical Presence",
		shortDesc: "Lowers opposing Pokemon Special Attack by 1 stage when switching in.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
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
			pokemon.formeChange('Flocura', this.effect, true);
			pokemon.baseMaxhp = Math.floor(Math.floor(
				2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
			) * pokemon.level / 100 + 10);
			const newMaxHP = pokemon.volatiles['dynamax'] ? (2 * pokemon.baseMaxhp) : pokemon.baseMaxhp;
			pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
			pokemon.maxhp = newMaxHP;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
		isPermanent: true,
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
		isPermanent: true,
		name: "Battle Bond",
		rating: 4,
		num: 210,
	},
	// firmfooting: {
		// shortDesc: "Immune to Wind moves, +1 SpD if hit by one.",
		// onTryHit(target, source, move) {
			// if (target !== source && move.flags["wind"]) {
				// if (!this.boost({spd: 1})) {
					// this.add('-immune', target, '[from] ability: Firm Footing');
				// }
				// return null;
			// }
		// },
		// name: "Firm Footing",
		// rating: 3,
	// },
	// terrainpower: {
		// shortDesc: "+50% SpA/SpD in Terrain.",
		// onModifyDefPriority: 6,
		// onModifyDef(pokemon) {
			// if (this.field.isTerrain('')) return;
			// return this.chainModify(1.5);
		// },
		// onModifySpDPriority: 6,
		// onModifySpD(pokemon) {
			// if (this.field.isTerrain('')) return;
			// return this.chainModify(1.5);
		// },
		// name: "Terrain Power",
		// rating: 0.5,
		// num: 179,
	// },
	// wakethedead: {
		// shortDesc: "50% reduction to Ghost damage. Nothing can Sleep.",
		// onStart(pokemon) {
			// this.add('-ability', pokemon, 'Wake the Dead');
			// this.add('-message', pokemon.name + " is making a ton of noise!");
		// },
		// onUpdate(pokemon) {
			// for (const target of pokemon.side.active) {
				// if (target.status === 'slp') target.cureStatus();
			// }
			// for (const target of pokemon.side.foe.active) {
				// if (target.status === 'slp') target.cureStatus();
			// }
		// },
		// onAnySetStatus(status, pokemon) {
			// if (status.id === 'slp') {
				// if (pokemon === this.effectData.target) {
					// this.add('-fail', pokemon, 'slp', '[from] ability: Wake the Dead', '[msg]');
				// } else {
					// this.add('-fail', pokemon, 'slp', '[from] ability: Wake the Dead');
				// }
				// return null;
			// }
		// },
		// onAnyBasePowerPriority: 20,
		// onAnyBasePower(basePower, source, target, move) {
			// if (target === source || move.category === 'Status' || move.type !== 'Ghost') return;
			// return this.chainModify(0.5);
		// },
		// isUnbreakable: true,
		// name: "Wake the Dead",
		// rating: 3,
	// },
	// xenospore: {
		// shortDesc: "Levitate. Also changes form if it maxes out a stat.",
		// onResidualOrder: 27,
		// onStart(pokemon) {
			// pokemon.m.xenosporeHints = {};
			// pokemon.m.xenosporeHints.firstHint = false;
			// pokemon.m.xenosporeHints.secondHint = false;
		// },
		// onUpdate(pokemon) {
			// if (pokemon.baseSpecies.baseSpecies !== 'Flocura' || pokemon.transformed || !pokemon.hp) return;
			// if (pokemon.species.id === 'flocuranexus') return;
			// let areBoosts = 0;
			// let b: BoostName;
			// for (b in pokemon.boosts) {
				// if (pokemon.boosts[b] > areBoosts) areBoosts = pokemon.boosts[b]
			// }
			// if (areBoosts >= 6) {
				// this.add('-activate', pokemon, 'ability: Xenospore');
				// pokemon.formeChange('Flocura-Nexus', this.effect, true);
				// pokemon.baseMaxhp = Math.floor(Math.floor(
					// 2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
				// ) * pokemon.level / 100 + 10);
				// const newMaxHP = pokemon.volatiles['dynamax'] ? (2 * pokemon.baseMaxhp) : pokemon.baseMaxhp;
				// pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
				// pokemon.maxhp = newMaxHP;
				// this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
				// pokemon.m.xenosporeHints.firstHint = true;
				// pokemon.m.xenosporeHints.secondHint = true;
			// } else if (areBoosts >= 4 && !pokemon.m.xenosporeHints.secondHint) {
				// pokemon.m.xenosporeHints.firstHint = true;
				// pokemon.m.xenosporeHints.secondHint = true;
				// this.add('-message', pokemon.name + " needs MORE power!");
			// } else if (areBoosts >= 2 && !pokemon.m.xenosporeHints.firstHint) {
				// pokemon.m.xenosporeHints.firstHint = true;
				// this.add('-message', pokemon.name + " started to glow!");
			// }
		// },
		// isPermanent: true,
		// name: "Xenospore",
		// rating: 5,
		// num: 211,
	// },
	crystalheart: {
		shortDesc: "User becomes Crystal type. While Crystal type, 33% boost to Def and SpD",
		onStart(pokemon) {
			if (pokemon.hasType('Crystal')) return false;
			if (!pokemon.addType('Crystal')) return false;
			pokemon.setType(["Crystal"]);
			this.add('-start', pokemon, 'typechange', 'Crystal', '[from] ability: Crystal Heart');
		},
		onModifyDefPriority: 6,
		onModifyDef(def, pokemon) {
			if (pokemon.hasType('Crystal')) return this.chainModify(1 + (1/3));
		},
		onModifySpDPriority: 6,
		onModifySpD(spd, pokemon) {
			if (pokemon.hasType('Crystal')) return this.chainModify(1 + (1/3));
		},
		name: "Crystal Heart",
	},
	wildheart: {
		onStart(pokemon) {
			if (pokemon.hasType('Feral')) return false;
			if (!pokemon.addType('Feral')) return false;
			pokemon.setType(["Feral"]);
			this.add('-start', pokemon, 'typechange', "Feral", '[from] ability: Wild Heart');
		},
		onModifyAtkPriority: 6,
		onModifyAtk(atk, pokemon) {
			if (pokemon.hasType('Feral')) return this.chainModify(1 + (1/3));
		},
		onModifySpAPriority: 6,
		onModifySpA(spa, pokemon) {
			if (pokemon.hasType('Feral')) return this.chainModify(1 + (1/3));
		},
		name: "Wild Heart",
		shortDesc: "User becomes Feral type. While Feral type, 33% boost to Atk and SpA",
	},
	// schooling: {
		// onStart(pokemon) {
			// if (pokemon.baseSpecies.baseSpecies !== 'Jaegorm' || pokemon.transformed) return;
			// if (pokemon.hp > pokemon.maxhp / 4) {
				// if (pokemon.species.id === 'jaegorm') {
					// pokemon.formeChange('Jaegorm-Collective');
				// }
			// } else {
				// if (pokemon.species.id === 'jaegormcollective') {
					// pokemon.formeChange('Jaegorm');
				// }
			// }
		// },
		// onResidualOrder: 27,
		// onResidual(pokemon) {
			// if (
				// pokemon.baseSpecies.baseSpecies !== 'Jaegorm' ||
				// pokemon.transformed || !pokemon.hp
			// ) return;
			// if (pokemon.hp > pokemon.maxhp / 4) {
				// if (pokemon.species.id === 'jaegorm') {
					// pokemon.formeChange('Jaegorm-Collective');
				// }
			// } else {
				// if (pokemon.species.id === 'jaegormcollective') {
					// pokemon.formeChange('Jaegorm');
				// }
			// }
		// },
		// isPermanent: true,
		// name: "Schooling",
		// shortDesc: "If user is Jaegorm, changes to Collective Form if it has > 1/4 max HP, else Solo Form.",
		// rating: 3,
		// num: 208,
	// },
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
			// if (target === this.effectData.target || target.side !== source.side) return;
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