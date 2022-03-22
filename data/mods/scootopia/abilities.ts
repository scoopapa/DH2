export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	metamorphasis: {
		num: 1016,
		name: "Metamorphasis",
		desc: "50% boost to moves of the same type as the first move used.",
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && move.category !== 'Status') {
				source.addVolatile("metamorphasis");
			}
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Metamorphasis');
				target.m.metaType = target.lastMove.type;
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === attacker.m.metaType && attacker.hasAbility('metamorphasis')) {
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === attacker.m.metaType && attacker.hasAbility('metamorphasis')) {
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Metamorphasis', '[silent]');
			},
		},
	},
	retaliation: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.boost({atk: -1}, target, source);
			}
		},
		name: "Retaliation",
		rating: 2.5,
		num: 24,
	},
	mythicalpresence: {
		name: "Mythical Presence",
		desc: "Lowers opposing Pokemon Special Attack by 1 stage when switching in.",
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
	awakening: {
		shortDesc: "Change forms after getting a KO.",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect?.effectType !== 'Move') {
				return;
			}
			if (source.species.id === 'soleron' && source.hp && !source.transformed && source.side.foe.pokemonLeft) {
				this.add('-activate', source, 'ability: Awakening');
				source.formeChange('Soleron-Awakened', this.effect, true);
			}
		},
		onModifyMovePriority: -1,
		isPermanent: true,
		name: "Awakening",
		rating: 4,
		num: 210,
	},
	firmfooting: {
		shortDesc: "Immune to Special Flying moves, +1 SpD if hit by one.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Flying' && move.category === "Special") {
				if (!this.boost({spe: 1})) {
					this.add('-immune', target, '[from] ability: Firm Footing');
				}
				return null;
			}
		},
		name: "Firm Footing",
		rating: 3,
	},
	terrainpower: {
		shortDesc: "+1 SpA/SpD in Terrain.",
		onModifyDefPriority: 6,
		onModifyDef(pokemon) {
			if (this.field.isTerrain('')) return;
			return this.chainModify(1.5);
		},
		onModifySpDPriority: 6,
		onModifySpD(pokemon) {
			if (this.field.isTerrain('')) return;
			return this.chainModify(1.5);
		},
		name: "Terrain Power",
		rating: 0.5,
		num: 179,
	},
	wakethedead: {
		shortDesc: "50% reduction to Ghost damage. Nothing can Sleep.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Wake the Dead');
			this.add('-message', pokemon.name + " is making a ton of noise!");
		},
		onUpdate(pokemon) {
			for (const target of pokemon.side.active) {
				if (target.status === 'slp') target.cureStatus();
			}
			for (const target of pokemon.side.foe.active) {
				if (target.status === 'slp') target.cureStatus();
			}
		},
		onAnySetStatus(status, pokemon) {
			if (status.id === 'slp') {
				if (pokemon === this.effectData.target) {
					this.add('-fail', pokemon, 'slp', '[from] ability: Wake the Dead', '[msg]');
				} else {
					this.add('-fail', pokemon, 'slp', '[from] ability: Wake the Dead');
				}
				return null;
			}
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Ghost') return;
			return this.chainModify(0.5);
		},
		isUnbreakable: true,
		name: "Wake the Dead",
		rating: 3,
	},
	xenospore: {
		shortDesc: "Levitate. Also changes form if a certain condition is met.",
		onResidualOrder: 27,
		onUpdate(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Flocura' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.species.id === 'flocuranexus') return;
			let b: BoostName;
			for (b in pokemon.boosts) {
				if (pokemon.boosts[b] < 6) return;
			}
			pokemon.cureStatus();
			this.add('-activate', pokemon, 'ability: Xenospore');
			pokemon.formeChange('Flocura-Nexus', this.effect, true);
			pokemon.baseMaxhp = Math.floor(Math.floor(
				2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
			) * pokemon.level / 100 + 10);
			const newMaxHP = pokemon.volatiles['dynamax'] ? (2 * pokemon.baseMaxhp) : pokemon.baseMaxhp;
			pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
			pokemon.maxhp = newMaxHP;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
		isPermanent: true,
		name: "Xenospore",
		rating: 5,
		num: 211,
	},
};