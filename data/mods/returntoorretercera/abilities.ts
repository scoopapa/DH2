export const Abilities: {[k: string]: ModdedAbilityData} = {
	shadownightmare: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Shadow' && target.status === 'slp' || target.hasAbility('comatose')) {
				this.debug('Shadow Nightmare boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Shadow' && target.status === 'slp' || target.hasAbility('comatose')) {
				this.debug('Shadow Nightmare boost');
				return this.chainModify(1.5);
			}
		},
		name: "Shadow Nightmare",
		shortDesc: "Shadow moves this Pokemon uses will do 1.5x damage if the target is asleep.",
		rating: 4,
		num: 271,
	},
	miasma: {
		// upokecenter says this is implemented as an added secondary effect
		onModifyMove(move) {
			if (move.type !== 'Normal' && target.type === 'Shadow' && !move || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 20,
				status: 'psn',
				ability: this.dex.getAbility('miasma'),
			});
		},
		name: "Miasma",
		shortDesc: "Shadow moves this Pokemon uses have a 20% chance of poisoning opposing non-Shadow Pokemon.",
		rating: 2,
		num: 143,
	},
	lawsofstreet: {
		onModifyDamage(damage, source, target, move) {
			if (move.type !== 'Shadow' && target.getMoveHitData(move).typeMod > 0) return;
			if (move.category === 'Physical') {
			   this.boost({def: -1}, source, target, null, true);
			} else if (move.category === 'Special') {
			   this.boost({spd: -1}, source, target, null, true);
			}
		},
		name: "Laws of Street",
		shortDesc: "Super effective non-Shadow moves drop corresponding defense by one.",
		rating: 2.5,
		num: 233,
	},
	negativecharge: {
		onStart(pokemon) {
			if (target.types.includes('Shadow') || this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Negative Charge');
		},
		onAnyModifyAtk(atk, source, target, move) {
			const abilityHolder = this.effectState.target;
			if (source.hasAbility('Negative Charge')) return;
			if (!move.ruinedAtk) move.ruinedAtk = abilityHolder;
			if (move.ruinedAtk !== abilityHolder) return;
			this.debug('Negative Charge Atk drop');
			return this.chainModify(0.75);
		},
		onAnyModifySpA(spa, source, target, move) {
			const abilityHolder = this.effectState.target;
			if (source.hasAbility('Negative Charge')) return;
			if (!move.ruinedSpA) move.ruinedSpA = abilityHolder;
			if (move.ruinedSpA !== abilityHolder) return;
			this.debug('Negative Charge SpA drop');
			return this.chainModify(0.75);
		},
		name: "Negative Charge",
		shortDesc: "Active Shadow type Pokemon without this Ability have their Attack and Special Attack multiplied by 0.75.",
		rating: 4.5,
		num: 284,
	},
	fearthedark: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Fear the Dark', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1, spa: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Fear the Dark",
		shortDesc: "Upon switch-in, opposing Pokemon have their Atk and SpA lowered by 1.",
		rating: 3.5,
		num: 22,
	},
	shadowboxer: {
		onDamagingHit(damage, target, source, effect) {
			if (target.getMoveHitData(move).typeMod < 0) {
		      this.boost({def: 1, spd: 1});
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Iron Fist boost');
				return this.chainModify([4915, 4096]);
			}
		},
		name: "Shadow Boxer",
		shortDesc: "When hit by a resisted attack, raise Def and SpD by 1. Increases the power of all punching moves by 20%.",
		rating: 3.5,
		num: 192,
	},
	critic: {
		onHit(target, source, move) {
			if (!target.hp) return;
			if (move?.effectType === 'Move' && target.getMoveHitData(move).crit) {
				const r = this.random(100);
				if (r < 25) {
					source.setStatus('slp', target);
				} else if (r < 50) {
					source.setStatus('par', target);
				} else if (r < 75) {
					source.setStatus('psn', target);
				} else if (r < 100) {
					source.setStatus('frz', target);
				}
			}
		},
		name: "Critic",
		shortDesc: "When hit by a crit, inflict a random status effect on the opponent.",
		rating: 3.5,
		num: 192,
   },
	cryogenian: {
		onStart(source) {
			this.field.setWeather('snow');
		},
		onModifyAtk(atk, pokemon) {
			if (['snow'].includes(pokemon.effectiveWeather())) {
				return this.chainModify([5325, 4096]);
			}
		},
		onModifySpA(spa, pokemon) {
			if (['snow'].includes(pokemon.effectiveWeather())) {
				return this.chainModify([5325, 4096]);
			}
		},
		name: "Cryogenian",
		shortDesc: "On switch-in, summons Snow. While Snow is active, the base powers of this Pokemon's moves are multiplied by 1.3x.",
		rating: 4,
		num: 117,
	},
	shadowclaws: {
		onModifyCritRatio(critRatio) {
			return critRatio + 1;
		},
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).crit) {
				this.debug('Shadow Claws boost');
				return this.chainModify([4915, 4096]);
			}
		},
		name: "Shadow Claws",
      shortDesc: "+1 Critical Hit Ratio. When this Pokemon gets a critical hit, the attack's power is multiplied by 1.2x.",
		rating: 4,
		num: 105,
	},
	lastdance: {
		onModifyMove(move) {
			if (!move?.flags['dance']) return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 100,
				boosts: {
				   spa: 1,
				},
				ability: this.dex.abilities.get('lastdance'),
			});
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'confusion') return null;
		},
		onBasePowerPriority: 7,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['dance']) {
				this.debug('Last Dance boost');
				return this.chainModify(0.75);
			}
		},
		name: "Last Dance",
		shortDesc: "When this Pokemon uses a dance move, its Special Attack is raised by one stage. This Pokemon is immune to confusion, and it's dance moves deal 0.75x damage.",
		rating: 3.5,
		num: 220,
	},
	shadowscourge: {
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
			   if (!target.activeTurns) {
					this.damage(target.baseMaxhp / 16, target, pokemon);
				}
			}
		},
		name: "Shadow Scourge",
		shortDesc: "When opponent switches in, while Heracross-Shadow is active, opposing Pokémon take 1/16 of their hp as damage.",
		rating: 3.5,
		num: 220,
	},
	shadowdawn: {
		onStart(source) {
			this.field.setWeather('shadowsky');
		},
		name: "Shadow Dawn",
		shortDesc: "Sets Shadow Sky.",
		rating: 3.5,
		num: 220,
	},
	shadowspell: {
		onModifyMove(move) {
			if (!move || !target) return;
			if (target !== source && target.hp && move.category == 'Special' && !move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				boosts: {
				   spd: -1,
				},
				ability: this.dex.abilities.get('shadowspell'),
			});
		},
		name: "Shadow Spell",
		shortDesc: "This Pokémon's special moves have an additional 30% chance of lower their target SpDef by one stage.",
		rating: 3.5,
		num: 220,
	},
	darkmind: {
		onTryHit(target, source, move) {
			if (target !== source && (move.type === 'Dark' || move.type === 'Psychic' || move.pranksterBoosted)) {
				this.add('-immune', target, '[from] ability: Dark Mind');
			}
	   },
		name: "Dark Mind",
		shortDesc: "This Pokémon's special moves have an additional 30% chance of lower their target SpDef by one stage.",
		rating: 3.5,
		num: 220,
	},
};
