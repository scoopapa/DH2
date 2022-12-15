export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	metamorphosis: {
		num: 1016,
		name: "Metamorphosis",
		shortDesc: "50% boost to moves of the same type as the first move used.",
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && move.category !== 'Status') {
				source.addVolatile("metamorphosis");
			}
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Metamorphosis');
				target.m.metaType = target.lastMove.type;
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === attacker.m.metaType && attacker.hasAbility('metamorphosis')) {
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === attacker.m.metaType && attacker.hasAbility('metamorphosis')) {
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Metamorphosis', '[silent]');
			},
		},
	},
	retaliation: {
		shortDesc: "On opponent making contact: -1 Atk.",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.boost({atk: -1}, source, target);
			}
		},
		name: "Retaliation",
		rating: 2.5,
		num: 24,
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
				if (!this.boost({spd: 1})) {
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
				if (pokemon === this.effectState.target) {
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
	xenospore: { // the secret way to activate the forme change is to get a KO while at max HP
		shortDesc: "Levitate. Also changes form if it maxes out a stat.",
		onResidualOrder: 27,
		onStart(pokemon) {
			pokemon.m.xenosporeHints = {};
			pokemon.m.xenosporeHints.firstHint = false;
			pokemon.m.xenosporeHints.secondHint = false;
		},
		onUpdate(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Flocura' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.species.id === 'flocuranexus') return;
			let areBoosts = 0;
			let b: BoostName;
			for (b in pokemon.boosts) {
				if (pokemon.boosts[b] > areBoosts) areBoosts = pokemon.boosts[b]
			}
			if (areBoosts >= 6) {
				this.add('-activate', pokemon, 'ability: Xenospore');
				pokemon.formeChange('Flocura-Nexus', this.effect, true);
				pokemon.baseMaxhp = Math.floor(Math.floor(
					2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
				) * pokemon.level / 100 + 10);
				const newMaxHP = pokemon.volatiles['dynamax'] ? (2 * pokemon.baseMaxhp) : pokemon.baseMaxhp;
				pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
				pokemon.maxhp = newMaxHP;
				this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
				pokemon.m.xenosporeHints.firstHint = true;
				pokemon.m.xenosporeHints.secondHint = true;
			} else if (areBoosts >= 4 && !pokemon.m.xenosporeHints.secondHint) {
				pokemon.m.xenosporeHints.firstHint = true;
				pokemon.m.xenosporeHints.secondHint = true;
				this.add('-message', pokemon.name + " needs MORE power!");
			} else if (areBoosts >= 2 && !pokemon.m.xenosporeHints.firstHint) {
				pokemon.m.xenosporeHints.firstHint = true;
				this.add('-message', pokemon.name + " started to glow!");
			}
		},
		isPermanent: true,
		name: "Xenospore",
		rating: 5,
		num: 211,
	},
	schooling: {
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Jaegorm' || pokemon.transformed) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'Jaegorm') {
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
				if (pokemon.species.id === 'Jaegorm') {
					pokemon.formeChange('Jaegorm-Collective');
				}
			} else {
				if (pokemon.species.id === 'jaegormcollective') {
					pokemon.formeChange('Jaegorm');
				}
			}
		},
		isPermanent: true,
		name: "Schooling",
		shortDesc: "If user is Jaegorm, changes to Collective Form if it has > 1/4 max HP, else Solo Form.",
		rating: 3,
		num: 208,
	},
};