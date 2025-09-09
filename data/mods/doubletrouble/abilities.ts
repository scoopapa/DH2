export const Abilities: { [abilityid: string]: ModdedAbilityData } = {
	focusinglens: {
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify(1.5);
			}
		},
		name: "Focusing Lens",
		shortDesc: "User's super effective damage is boosted by 50%.",
	},
	chromatophores: {
		// TODO
		name: "Chromatophores",
		onPrepareHit(source, target, move) {
			if (move.category !== 'Status') return;
			const type = move.type;
			const types = pokemon.getTypes();
			if (source.getTypes().join() === type) return 
			let firsttype = types[0]
			let sectype = types[1]
			if (type && type !== '???' && source.sectype !== type) {
				if (!source.addType(type)) return;
				if (types[0] != sectype) {
					this.add('-start', source, 'typechange', pokemon.getTypes().join(firsttype/type), '[from] ability: Chromatophores');
				else {
					this.add('-start', source, 'typechange', pokemon.getTypes().join(firsttype/type), '[from] ability: Chromatophores');
				}
			}
		},
		shortDesc: "changes secondary type to status move used.",
	},
	guidedassault: {
		onFoeAfterBoost(boost, target, source, effect) {
			const pokemon = this.effectState.target;
			this.add('-activate', pokemon, 'ability: Guided Assault');
			pokemon.addVolatile('lockon');
			pokemon.addVolatile('laserfocus');
		},
		onAfterBoost(boost, target, source, effect) {
			const pokemon = this.effectState.target;
			this.add('-activate', pokemon, 'ability: Guided Assault');
			pokemon.addVolatile('lockon');
			pokemon.addVolatile('laserfocus');
		},
		name: "Guided Assault",
		shortDesc: "User locks on and crits after any stat change occurs."
	},
	ripplingsurface: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: Rippling Surface", "[of] " + target);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).spreadHit) {
				this.debug('Rippling Surface neutralize');
				return this.chainModify(0.5);
			}
		},
		name: "Rippling Surface",
		shortDesc: "User cannot be stat dropped, spread moves = 0.5x damage",
	},
	dreamcatcher: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (target.status === 'slp' || target.hasAbility('comatose')) {
					const damage = this.damage(pokemon.baseMaxhp / 16, pokemon, target);
					if (damage) {
						this.heal(damage, target, pokemon);
					}
				}
			}
		},
		name: "Dream Catcher",
		shortDesc: "User drains 1/16 of foe's max HP if they are asleep.",
	},
	archetype: {
		// From VGC 20XX
		shortDesc: "Gains opposite effect of target's lowered stat.",
		onPrepareHit(source, target, move) {
			if (move && move.target === 'allAdjacentFoes') {
				for (const foe of source.foes()) {
					if (foe.isAdjacent(source)) {
						const boosts = { ...foe.boosts };
						foe.addVolatile('archetype', source);
						foe.volatiles['archetype'].boosts = boosts;
					//	this.add('-start', foe, 'Archetype', '[from] ability: Archetype');
					//	this.add('-message', `${foe.name}'s boosts were copied: ${JSON.stringify(boosts)}`);
					}
				}
			} else if (move && move.target === 'allAdjacent') {
				for (const adjacent of this.getAllActive()) {
					if (adjacent !== source && adjacent.isAdjacent(source)) {
						const boosts = { ...adjacent.boosts };
						adjacent.addVolatile('archetype', source);
						adjacent.volatiles['archetype'].boosts = boosts;
					//	this.add('-start', adjacent, 'Archetype', '[from] ability: Archetype');
					//	this.add('-message', `${adjacent.name}'s boosts were copied: ${JSON.stringify(boosts)}`);
					}
				}
			} else if (move && move.target === 'normal') {
				const boosts = { ...target.boosts };
				target.addVolatile('archetype', source);
				target.volatiles['archetype'].boosts = boosts;
			//	this.add('-start', target, 'Archetype', '[from] ability: Archetype');
			//	this.add('-message', `${target.name}'s boosts were copied: ${JSON.stringify(boosts)}`);
			}
		},
		onAfterMove(source, target, move) {
			if (target === source) return; // originally had "target.fainted" but its inclusion might be unnecessary, especially in VGC where if one ally faints, the other becomes unaffected by ability
	
			const stats = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy', 'evasion'] as const;
			type BoostStatistics = typeof stats[number];
			const boostGains: Partial<Record<BoostStatistics, number>> = {};
	
			for (const activeTarget of this.getAllActive()) {
				if (!activeTarget.volatiles['archetype']) continue;
	
				const storedBoosts = activeTarget.volatiles['archetype'].boosts;
				const currentBoosts = activeTarget.boosts;
	
				for (const stat of stats) {
					if (currentBoosts[stat] < storedBoosts[stat] || 
						(currentBoosts[stat] < 0 && currentBoosts[stat] < storedBoosts[stat])) {
						const difference = storedBoosts[stat] - currentBoosts[stat];
						boostGains[stat] = (boostGains[stat] || 0) + difference;
	
					//	this.add('-message', `${source.name} gains ${difference} ${stat} boost from ${activeTarget.name}'s lower boost.`);
					}
				}
	
				delete activeTarget.volatiles['archetype'];
			//	this.add('-end', activeTarget, 'Archetype', '[from] ability: Archetype');
			}
	
			// Apply all boost gains at once and trigger visual display
			if (Object.keys(boostGains).length > 0) {
				this.boost(boostGains, source, source, this.effect);
			}
		},	
		flags: {},
		name: "Archetype",
	},
	ancientcore: {
		// from VGC 20XX
		shortDesc: "Old gen phys/spec split; +20% power.",
		onModifyMovePriority: -1,
		onModifyMove(move) {
		if (move.category !== 'Status') {
			const originalCategory = move.category; // New line
			switch (move.type) {
				case 'Grass':
				case 'Fire':
				case 'Water':
				case 'Ice':
				case 'Electric':
				case 'Psychic':
				case 'Dragon':
				case 'Dark':
					move.category = 'Special';
					break;
				case 'Bug':
				case 'Ghost':
				case 'Poison':
				case 'Ground':
				case 'Rock':
				case 'Fighting':
				case 'Normal':
				case 'Flying':
				case 'Steel':
				case 'Fairy':
					move.category = 'Physical';
					break;
			}
			// Apply 20% boost only if the category has changed
			if (move.category !== originalCategory) {
				move.basePower = Math.floor(move.basePower * 1.2);
				this.add('-message', `Ancient Core boosted ${move.name}'s power!`);
			}
		}
		},
		name: "Ancient Core",
	},
	entanglingroots: {
		// partially coded in moves.ts
		onTryHit(target, source, move) {
			if (move.id === 'rapidspin' || move.id == 'mortalspin' || move.id === 'defog') {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('gmaxvinelash', source, '[from] ability: Entangling Roots'););
				}
			}
		},
		name: "Entangling Roots",
		shortDesc: "If opponent attempts removal, deny and set vines.",
	},
	overpoweringmelody: {
		// TODO
		name: "Overpowering Melody",
		onModifyMove(move) {
			if (move.flags['sound']) {
				if (!move.secondaries) move.secondaries = [];
				move.secondaries.push({
					chance: 100,
					volatileStatus: 'throatchop',
				});
			}
		},
		shortDesc: "User's sound moves inflict Throat Chop status.",
	},
	toxicaura: {
		// TODO
		name: "Toxic Aura",
		onStart(pokemon) {
			for (const ally of pokemon.alliesAndSelf()) {
				if (['psn'].includes(ally.status)) {
					ally.setStatus('tox', pokemon, '[from] ability: Toxic Aura');
				}
			}
		},
		onUpdate(pokemon) {
			if (['psn'].includes(pokemon.status)) {
				pokemon.setStatus('tox', pokemon, '[from] ability: Toxic Aura');
			}
		},
		onAllySwitchIn(pokemon) {
			if (['psn'].includes(pokemon.status)) {
				pokemon.setStatus('tox', this.effectState.target, '[from] ability: Toxic Aura');
			}
		},
		onSetStatus(status, target, source, effect) {
			if (!['psn'].includes(status.id)) return;
			if ((effect as Move)?.status) {
				pokemon.setStatus('tox', source, '[from] ability: Toxic Aura');
			}
		},
		onAllySetStatus(status, target, source, effect) {
			if (!['psn'].includes(status.id)) return;
			if ((effect as Move)?.status) {
				const effectHolder = this.effectState.target;
				pokemon.setStatus('tox', source, '[from] ability: Toxic Aura');
			}
		},
		shortDesc: "When active: Poison becomes Toxic.",
	},
	
};
