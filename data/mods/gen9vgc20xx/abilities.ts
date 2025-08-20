export const Abilities: { [abilityid: string]: ModdedAbilityData } = {
 
	// Start
	armorpiercer: {
		shortDesc: "Contact moves bypass Protect. 25% damage instead.",
		onModifyMove(move, source, target) {
			if (move.flags['contact']) {
				delete move.flags['protect'];
				(move as any).armorPiercer = true;
			}
		},
		onModifyDamage(damage, source, target, move) {
			if ((move as any).armorPiercer && move.flags?.contact && target.volatiles['protect']) {
				this.debug('Armor Piercer: reduced damage to 25% through Protect');
				return this.chainModify(0.25);
			}
		},
		flags: {},
		name: "Armor Piercer",
		rating: 4,
		num: -1,
	},
	//
	hypergravity: {
		shortDesc: "On switch-in: Gravity if user's HP is full.",
		onStart(source) {
			if (source.hp < source.maxhp) return;
			this.field.addPseudoWeather('gravity');
		},
		flags: {},
		name: "Hyper Gravity",
		rating: 4,
		num: -2,
	},
	//
	illwind: {
		shortDesc: "Sets Tailwind when user replaces a fainted ally.",
		onStart(pokemon) {
			if (!pokemon.side.faintedThisTurn) return;
			pokemon.side.addSideCondition('tailwind');
    	},
		flags: {},
		name: "Ill Wind",
		rating: 5,
		num: -3,
	},
	//
	inflammation: {
        shortDesc: "Burns if dealing super-effective damage.",
        onSourceHit(target, source, move) {
            if (!move || !target) return;
            if (target !== source && move.category !== 'Status' && target.getMoveHitData(move).typeMod > 0) {
                target.trySetStatus('brn', source);
            }
        },
        flags: {},
        name: "Inflammation",
        rating: 3,
        num: -4,
    },
	//
	sharedmindset: {
        desc: "Applies opposite of negative stat changes to ally Mycecroak's opposite stat, and vice versa: (Atk/SpA, Def/SpD).",
        shortDesc: "Atk/SpA & Def/SpD for Mycecroak, and vice versa.",
        onUpdate(pokemon) {
            const partnermycecroak = pokemon.side.active.find(ally => ally.species.name === 'Mycecroak');
            if (!partnermycecroak) return;
            if (partnermycecroak) {
                if (!partnermycecroak.volatiles['fungus']) {
                    partnermycecroak.addVolatile('fungus')
                }
                if (!pokemon.volatiles['fungus']) {
                    pokemon.addVolatile('fungus')
                }
            }
        },
        flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
        name: "Shared Mindset",
        rating: 3,
        num: -5,
    },
	//
	desertmirage: {
		desc: "Sand: Ground/Flying, Rain: Ground/Water, Sun: Ground/Fire, Snow: Ground/Ice, Acidic Rain: Ground/Poison.",
		shortDesc: "Gains additional type in weather.",
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Dustform' || pokemon.transformed) return;
			let forme = null;
			let newTypes = null;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				if (pokemon.species.id !== 'dustformsunny') {
					forme = 'Dustform-Sunny';
					newTypes = ['Ground', 'Fire'];
				}
				break;
			case 'raindance':
			case 'primordialsea':
				if (pokemon.species.id !== 'dustformrainy') {
					forme = 'Dustform-Rainy';
					newTypes = ['Ground', 'Water'];
				}
				break;
			case 'hail':
			case 'snow':
				if (pokemon.species.id !== 'dustformsnowy') {
					forme = 'Dustform-Snowy';
					newTypes = ['Ground', 'Ice'];
				}
				break;
			case 'sandstorm':
			case 'desertgales':
				if (pokemon.species.id !== 'dustformsandy') {
					forme = 'Dustform-Sandy';
					newTypes = ['Ground', 'Flying'];
				}
				break;
			case 'acidicrain':
				if (pokemon.species.id !== 'dustformacidic') {
					forme = 'Dustform-Acidic';
					newTypes = ['Ground', 'Poison'];
				}
				break;
			default:
				if (pokemon.species.id !== 'dustform') {
					forme = 'Dustform';
					newTypes = ['Ground'];
				}
				break;
			}
			if (pokemon.isActive && forme) {
				pokemon.formeChange(forme, this.effect, false, '[msg]');
				if (newTypes) {
					this.add('-start', pokemon, 'typechange', newTypes.join('/'), '[from] Desert Mirage');
				}
			}
		},	
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1},
		name: "Desert Mirage",
		rating: 2,
		num: -6,
	},
	//
	mindcontrol: {
		desc: "While this Pokémon is present, all non-Dark-type Pokémon are prevented from using the same move twice in a row.",
		shortDesc: "While present, non-Dark-types are under Torment.",
		onStart(source) {
			let activated = false;
			for (const pokemon of this.getAllActive()) {
				if (!activated) {
					this.add('-ability', source, 'Mind Control');
					activated = true;
				}
				if (!pokemon.volatiles['torment'] && !pokemon.hasType('Dark') && pokemon !== source) {
					pokemon.addVolatile('torment');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			const source = this.effectState.source;
			if (!pokemon.volatiles['torment'] && !pokemon.hasType('Dark')  && pokemon !== source) {
				pokemon.addVolatile('torment');
			}
		},
		onEnd(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('mindcontrol')) return; 
			}
			for (const target of this.getAllActive()) {
				target.removeVolatile('torment');
			}
		},
		name: "Mind Control",
		rating: 3.5,
		num: -7,
	},	
	//
	malignant: {
		shortDesc: "User's single-target status move -> spread move against opponent.",
		onModifyMove(move, source, target) {
			if (move.category === 'Status' && move.target === 'normal') {
				const isOpponent = target && target.side !== source.side;
				if (isOpponent) {
					move.target = 'allAdjacentFoes';
					this.add('-ability', source, 'Malignant');
				}
			}
		},
		name: "Malignant",
		rating: 3.5,
		num: -8,
	},
	//
	eternalice: {
		shortDesc: "Moves last; immune to Fire and Water.",
		onFractionalPriority: -0.1,
		onTryHit(target, source, move) {
			if (move.type === 'Fire' || move.type === 'Water') {
				this.add('-immune', target, '[from] ability: Eternal Ice');
				return null;
			}
		},
		name: "Eternal Ice",
		rating: 3.5,
		num: -9,
	},
	//
	selfish: {
		shortDesc: "Ally takes indirect damage instead.",
		onDamage(damage, target, source, effect) {
			if (effect && effect.effectType !== 'Move') {
				const ally = target.side.active.find(ally => ally && ally !== target && !ally.fainted);
				if (ally && !ally.hasAbility('selfish')) {
					this.add('-ability', target, 'Selfish');
					this.add('-message', `${target.name}'s Selfish redirects the damage to ${ally.name}!`);
					this.damage(damage, ally, source, effect);
					return false;
				}
			}
		},
		name: "Selfish",
		rating: 3,
		num: -10,
	},	
	//
	ancientcore: {
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
		rating: 2,
		num: -11,
	},
	//
	rewind: {
		name: "Rewind",
		shortDesc: "Restores items on user's side when HP brought to 50% or below.",
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		rating: 4,
		num: -12,
	
		onStart(pokemon) {
			pokemon.addVolatile('rewind');
		},
	
		onDamage(damage, target, source, effect) {
			const rewindState = target.volatiles['rewind'];
			if (!rewindState || typeof damage !== 'number') return;
	
			const hpBefore = target.hp;
			const hpAfter = hpBefore - damage;
	
			if (rewindState.triggeredThisTurn) return;
	
			if (hpBefore > target.maxhp / 2 && hpAfter <= target.maxhp / 2) {
				rewindState.shouldTrigger = true;
				rewindState.triggeredThisTurn = true;
			}
		},
	
		onResidualOrder: 29,
		onResidual(pokemon) {
			const rewindState = pokemon.volatiles['rewind'];
			if (rewindState) {
				rewindState.triggeredThisTurn = false;
	
				if (rewindState.shouldTrigger) {
					rewindState.shouldTrigger = false;
					this.add('-message', `${pokemon.name} has triggered Rewind!`);
	
					let itemRestored = false;
	
					if (pokemon.side && Array.isArray(pokemon.side.pokemon)) {
						for (const ally of pokemon.side.pokemon) {
							if (ally && !ally.item) {
								this.actions.useMove('Recycle', ally);
								itemRestored = true;
							}
						}
	
						if (itemRestored) {
							this.add('-message', `${pokemon.name} rewound time to restore its team's items!`);
						}
					}
				}
			}
		},
	
		onUpdate(pokemon) {
			const rewindState = pokemon.volatiles['rewind'];
			if (!rewindState || !rewindState.shouldTrigger) return;
	
			rewindState.shouldTrigger = false;
	
			let itemRestored = false;
	
			this.add('-ability', pokemon, 'Rewind');
	
			if (pokemon.side && Array.isArray(pokemon.side.pokemon)) {
				for (const ally of pokemon.side.pokemon) {
					if (ally && !ally.item) {
						this.actions.useMove('Recycle', ally);
						itemRestored = true;
					}
				}
	
				if (itemRestored) {
					this.add('-message', `${pokemon.name} rewound time to restore its team's items!`);
				}
			}
		},
	
		condition: {
			noCopy: true,
			onStart() {
				this.effectState.shouldTrigger = false;
				this.effectState.triggeredThisTurn = false;
			}
		},
	},
	//
	weightbreaker: {
		shortDesc: "Double damage if user's weight < target's weight.",
		onModifyDamage(damage, source, target, move) {
			const sourceWeight = source.getWeight();
			const targetWeight = target.getWeight();
			if (sourceWeight < targetWeight) {
				this.debug('Weight Breaker boost');
				return this.chainModify(2);
			}
		},
		name: "Weight Breaker",
		rating: 3.5,
		num: -13,
	},	
	//
	psynet: {
		shortDesc: "Sets Psychic Terrain when hurt.",
		onDamagingHit(damage, target, source, move) {
			this.field.setTerrain('psychicterrain');
		},
		flags: {},
		name: "Psy Net",
		rating: 2,
		num: -14,
	},
	//
	abnormal: {
		shortDesc: "On user faint, attacker becomes Normal if it isn't already.",
		onDamagingHitOrder: 1,
    	onDamagingHit(damage, target, source, move) {
        	if (target.hp <= 0 && source && source !== target && !source.hasType('Normal')) {
            	this.add('-ability', target, 'Abnormal');
            	this.add('-start', source, 'typechange', 'Normal', '[from] ability: Abnormal');
            	source.setType('Normal');
        	}
    	},
		name: "Abnormal",
		rating: 3,
		num: -15,
	},	
	//
	ailuromancy: {
		shortDesc: "Spotlight on entry.",
		// Triggered when the Pokémon with Ailuromancy switches in
		onSwitchIn(pokemon) {
			// Check if there is an ally present
			const ally = pokemon.side.active.find(ally => ally && ally !== pokemon);
			if (ally) {
				// Add the spotlight volatile to the ally
				ally.addVolatile('spotlight');
				this.add('-message', `${ally.name} is now in the spotlight!`);
			}
		},
		name: "Ailuromancy",
		rating: 3,
		num: -16,
	},
	//
	archetype: {
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
		rating: 4,
		num: -17,
	},
	//
	hearth: {
		shortDesc: "Ice does 50% less damage against user's side + 1/16 healing.",
		onAnyModifyDamage(damage, source, target, effect) {
			if (source && effect && effect.effectType === 'Move' && effect.type === 'Ice') {
				if (target === this.effectState.target || target.isAlly(this.effectState.target)) {
					this.debug('Hearth damage reduction from Ice-type move');
				//	this.add('-message', `${target.name} is protected by Hearth, reducing damage from the Ice-type move!`);
					return this.chainModify(0.5);
				}
			}
		},
		onUpdate(pokemon) {
			// Check if the user or any ally is frozen
			const allies = pokemon.side.active; // Get all active Pokémon on the user's side
			for (const ally of allies) {
				if (ally.status === 'frz') {
					this.add('-activate', ally, 'ability: Hearth');
					ally.cureStatus(); // Cure the frozen status for the ally
				}
			}
			 // Also check the user of the ability
			 if (pokemon.status === 'frz') {
				this.add('-activate', pokemon, 'ability: Hearth');
				pokemon.cureStatus(); // Cure the frozen status for the user
			}
		},
		onImmunity(type, pokemon) {
			// Grant immunity to freeze for the user and their allies
			if (type === 'frz') {
				const allies = pokemon.side.active; // Get all active Pokémon on the user's side
				for (const ally of allies) {
					if (ally === pokemon || ally.isAlly(pokemon)) {
						this.add('-immune', ally, 'ability: Hearth');
					}
				}
				return false; // Prevent the freeze status from being applied
			}
		},
		onResidualOrder: 26,
    	onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 16);
			const ally = pokemon.side.active.find(ally => ally && ally !== pokemon && !ally.fainted);
				if (ally) {
					this.heal(ally.baseMaxhp / 16, ally);
			}
		},
		flags: {},
		name: "Hearth",
		rating: 3,
		num: -18,
	},
	//
	underhanded: {
		/*shortDesc: "50% more damage if user's stats lowered this turn.",
		onBasePower(basePower, source) {
			if (source.statsLoweredThisTurn) {
				this.debug('underhanded buff');
				return this.chainModify(1.5);
			}
		},*/
		shortDesc: "50% more physical damage if target's stats lowered this turn.",
		onBasePower(basePower, source, target, move) {
			if (move.category === 'Physical' && target.statsLoweredThisTurn) {
				this.debug('underhanded buff');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Underhanded",
		rating: 3,
		num: -19,
	},
	//
	feigndeath: {
		shortDesc: "Ally can't faint from full HP + takes 0.5 from Ghost moves.",
		onUpdate(pokemon) {
			for (const ally of pokemon.side.pokemon) {
				if (ally !== pokemon && !ally.fainted && !ally.volatiles['feigndeath']) {
					ally.addVolatile('feigndeath');
				}
			}
		},
		flags: {},
		name: "Feign Death",
		rating: 5,
		num: -20,
	},
	//
	vigorsurge: {
		desc: "On switch-in, this Pokémon summons Vigorr Terrain for 5 turns. During the effect, grounded Fighting Pokémon have +1 crit and 10% acc. Fighting moves of grounded Pokémon grant +1 Atk if the user moved last. Camouflage transforms the user into a Fighting-type. Lasts for 8 turns if the user is holding a Terrain Extender (such as through Skill Swap).",
		shortDesc: "Sets Vigor Terrain on switch-in.",
		onStart(source) {
			this.field.setTerrain('vigorterrain');
		},
		flags: {},
		name: "Vigor Surge",
		rating: 3,
		num: -21,
	},
	photolysis: {
		desc: "On switch-in, the weather becomes Acidic Rain. It lasts for 5 turns. During this effect, Steel Pokémon become vulnerable to damaging Poison moves. At the end of each turn, non Poison Pokémon loose 1/16 of their HP.",
		shortDesc: "On switch-in, sets Acidic Rain.",
		onStart(source) {
			this.field.setWeather('acidicrain');
		},
		flags: {},
		name: "Photolysis",
		rating: 3,
		num: -22,
	},
	//
	transmutation: {
		desc: "At the end of the turn, if Acidic Rain is active, boosts user's worst stat by 1 stage. Immunity to 1/16 chip damage from this weather.",
		shortDesc: "Boosts worst stat in Acidic Rain every turn.",
		onResidualOrder: 10,
		onResidual(pokemon) {
			if (this.field.isWeather('acidicrain')) {
				const stats = ['atk', 'def', 'spa', 'spd', 'spe'] as const;
				const statValues = stats.map(stat => pokemon.getStat(stat));
				const minValue = Math.min(...statValues);
				
				let worstStat = null;
	
				// Find the worst stat based on current values
				for (const stat of stats) {
					if (pokemon.getStat(stat) === minValue) {
						worstStat = stat;
						break; // Only boost the first worst stat found
					}
				}
	
				if (worstStat) {
					this.boost({ [worstStat]: 1 }, pokemon);
				}
			}
		},
		flags: {},
		name: "Transmutation",
		rating: 3,
		num: -23,
	},
	//
	coupdegrass: {
		desc: "This Pokémon moves first in its priority bracket when its target has 1/2 or less of its maximum HP, rounded down. Does not affect moves that have multiple targets.",
		shortDesc: "Moves first in prio bracket if target's HP: 1/2 or less.",
		onUpdate(pokemon) {
			const action = this.queue.willMove(pokemon);
			if (!action) return;
			const target = this.getTarget(action.pokemon, action.move, action.targetLoc);
			if (!target) return;
			// Check if the target's HP is at or below half
			if (target.hp <= Math.floor(target.maxhp / 2)) {
				// Check if the move is not a spread move
				if (action.move.target !== 'allAdjacent' && action.move.target !== 'all') {
					pokemon.addVolatile('coupdegrass');
				}
			}
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				const action = this.queue.willMove(pokemon);
				if (action) {
					this.add('-ability', pokemon, 'Coup de Grass');
					this.add('-message', `${pokemon.name} prepared to move immediately!`);
				}
			},
			onModifyPriority(priority) {
				return priority + 0.1;
			},
		},
		flags: {},
		name: "Coup de Grass",
		rating: 3,
		num: -24,
	},
	//
	thundercloud: {
		onPrepareHit(source, target, move) {
			if (!move || !source || !source.isActive) return;

			// Only apply Thundercloud if the move is coming from the Pokémon with the ability
			if (source.getAbility().name !== 'Thundercloud') return;

			const field = source.side.battle.field;

			// Water-type move → set Electric Terrain (if not already active)
			if (move.type === 'Water' && field.terrain !== 'electricterrain') {
				if (field.setTerrain('electricterrain')) {
				//	this.add('-ability', source, 'Thundercloud');
					this.add('-fieldstart', 'Electric Terrain');
				}	
			}

			// Electric-type move → set Rain (if not already active)
			else if (move.type === 'Electric' && field.weather !== 'raindance') {
				if (field.setWeather('raindance')) {
				//	this.add('-ability', source, 'Thundercloud');
					this.add('-weather', 'RainDance', '[from] ability: Thundercloud', '[of] ' + source);
				}
			}
		},
		name: "Thundercloud",
		shortDesc: "When using Water or Electric move: sets Electric Terrain or Rain (if not active).",
		rating: 3,
		num: -25,
	},
	//
	scaleshift: {
		shortDesc: "In a double battle, the Pokémon copies its partner's first type.",
		onUpdate(pokemon) {
			if (!pokemon.isStarted) return; // should activate *after* Data Mod
	
			let newtype = null;
			for (const ally of pokemon.side.active) {
				if (ally && ally !== pokemon && !ally.fainted && !ally.hasAbility('scaleshift') &&
					ally.types[0] !== pokemon.baseSpecies.types[0] &&
					ally.types[0] !== pokemon.baseSpecies.types[1]) {
					newtype = ally.types[0];
					break;
				}
			}
	
			if (newtype) {
				const typecombo = [newtype, pokemon.baseSpecies.types[1]];
				if (pokemon.getTypes().join() === typecombo.join() || !pokemon.setType(typecombo)) return;
				this.add('-ability', pokemon, 'Scale Shift');
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'));
			}
			
		},
		onEnd(pokemon) {
			if (pokemon.getTypes().join() === pokemon.baseSpecies.types.join() || !pokemon.setType(pokemon.baseSpecies.types)) return;
			this.add('-ability', pokemon, 'Scale Shift');
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'));
		},
		flags: {},
		name: "Scale Shift",
		rating: 3,
		num: -26,
	},
	// end

	// Changes to abilities
	// Start
	blaze: {
		shortDesc: "Boosts Fire moves at 50% HP or less.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 2) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 2) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Blaze",
		rating: 2,
		num: 66,
	},
	//
	cutecharm: {
		shortDesc: "50% damage reduction if move's type = user's type.",
		onSourceModifyDamage(damage, source, target, move) {
			// Check if the move's type matches the defender's type
			if (target.hasType(move.type)) {
				this.debug('Cute Charm reducing damage due to type match');
				return this.chainModify(0.5); // Reduce damage by 50%
			}
		},
		flags: {},
		name: "Cute Charm",
		rating: 0.5,
		num: 56,
	},
	//
	/*emergencyexit: {
		shortDesc: "Switch occurs after user's move at 50% HP or less.",
		onEmergencyExit(target) {
			if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.switchFlag) return;
	
			// Delay the switch-out until after the Pokémon executes its move
			target.switchFlag = true;
			this.add('-activate', target, 'ability: Emergency Exit');
		},
		onAfterMove(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2 && pokemon.switchFlag) {
				// Force the switch-out
				this.add('-activate', pokemon, 'ability: Emergency Exit');
				pokemon.switchFlag = true;
			}
		},
		flags: {},
		name: "Emergency Exit",
		rating: 1,
		num: 194,
	},*/
	//
	leafguard: {
		shortDesc: "Sun: Status immunity + stat drop denial for user and ally.",
		onSetStatus(status, target, source, effect) {
			if (['sunnyday', 'desolateland'].includes(target.effectiveWeather())) {
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] ability: Leaf Guard');
				}
				return false;
			}
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn' && ['sunnyday', 'desolateland'].includes(target.effectiveWeather())) {
				this.add('-immune', target, '[from] ability: Leaf Guard');
				return null;
			}
		},
		onAllySetStatus(status, target, source, effect) {
			// Extend status immunity to the ally
			if (['sunnyday', 'desolateland'].includes(target.effectiveWeather())) {
				if ((effect as Move)?.status) {
				//	this.add('-immune', target, '[from] ability: Leaf Guard (Ally)');
					const effectHolder = this.effectState.target;
					this.add('-immune', target, 'ability: Leaf Guard', '[of] ' + effectHolder);
				}
				return false;
			}
		},
		onAllyTryAddVolatile(status, target) {
			// Extend Yawn immunity to the ally
			if (status.id === 'yawn' && ['sunnyday', 'desolateland'].includes(target.effectiveWeather())) {
			//	this.add('-immune', target, '[from] ability: Leaf Guard (Ally)');
				const effectHolder = this.effectState.target;
				this.add('-immune', target, 'ability: Leaf Guard', '[of] ' + effectHolder);
				return null;
			}
		},
		onTryBoost(boost, target, source, effect) {
			// Prevent stat drops for the user in Sunny weather
			if (['sunnyday', 'desolateland'].includes(target.effectiveWeather())) {
				let showMsg = false;
				let i: BoostID;
				for (i in boost) {
					if (boost[i]! < 0) {
						delete boost[i];
						showMsg = true;
					}
				}
				if (showMsg && !(effect as ActiveMove).secondaries) {
					this.add('-block', target, '[from] ability: Leaf Guard');
				}
			}
		},
		onAllyTryBoost(boost, target, source, effect) {
			if ((source && target === source)) return;
				if (['sunnyday', 'desolateland'].includes(target.effectiveWeather())) {
				let showMsg = false;
				let i: BoostID;
				for (i in boost) {
					if (boost[i]! < 0) {
						delete boost[i];
						showMsg = true;
					}
				}
				if (showMsg && !(effect as ActiveMove).secondaries) {
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'ability: Leaf Guard', '[of] ' + effectHolder);
				}
			}
		},
		flags: {breakable: 1},
		name: "Leaf Guard",
		rating: 0.5,
		num: 102,
	},
	//
	mimicry: {
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onTerrainChange(pokemon) {
			let types;
			switch (this.field.terrain) {
			case 'electricterrain':
				types = ['Electric'];
				break;
			case 'grassyterrain':
				types = ['Grass'];
				break;
			case 'mistyterrain':
				types = ['Fairy'];
				break;
			case 'psychicterrain':
				types = ['Psychic'];
				break;
			case 'vigorterrain':
				types = ['Fighting'];
				break;
			default:
				types = pokemon.baseSpecies.types;
			}
			const oldTypes = pokemon.getTypes();
			if (oldTypes.join() === types.join() || !pokemon.setType(types)) return;
			if (this.field.terrain || pokemon.transformed) {
				this.add('-start', pokemon, 'typechange', types.join('/'), '[from] ability: Mimicry');
				if (!this.field.terrain) this.hint("Transform Mimicry changes you to your original un-transformed types.");
			} else {
				this.add('-activate', pokemon, 'ability: Mimicry');
				this.add('-end', pokemon, 'typechange', '[silent]');
			}
		},
		flags: {},
		name: "Mimicry",
		rating: 0,
		num: 250,
	},
	//
	normalize: {
		shortDesc: "User's moves are Normal. 50% power boost.",
		onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (!(move.isZ && move.category !== 'Status') && !noModifyType.includes(move.id) &&
				// TODO: Figure out actual interaction
				!(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Normal';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([6144, 4096]);
		},
		flags: {},
		name: "Normalize",
		rating: 0,
		num: 96,
	},
	//
	overgrow: {
		shortDesc: "Boosts Grass moves at 50% HP or less.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Grass' && attacker.hp <= attacker.maxhp / 2) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Grass' && attacker.hp <= attacker.maxhp / 2) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Overgrow",
		rating: 2,
		num: 65,
	},
	//
	rivalry: {
		shortDesc: "25% power boost if shared type.",
		onBasePowerPriority: 24,
		onBasePower(basePower, attacker, defender, move) {
			// Check if the target shares a type with the attacker
			for (const type of attacker.types) {
				if (defender.hasType(type)) {
					this.debug('Rivalry boost due to shared type');
					return this.chainModify(1.25);
				}
			}
		},
		flags: {},
		name: "Rivalry",
		rating: 0,
		num: 79,
	},
	//
	stancechange: {
		onModifyMovePriority: 1,
		onModifyMove(move, attacker, defender) {
			if (
				(!attacker.species.name.startsWith('Aegislash') && !attacker.species.name.startsWith('Light')) || attacker.transformed
			) return;
			if (move.category === 'Status' && move.id !== 'kingsshield') return;//if using a non-kings-shield status move, or if using Flurry
			if (attacker.species.name === 'Aegislash' || attacker.species.name === 'Aegislash-Blade') {
				const targetForme = (move.id === 'kingsshield' ? 'Aegislash' : 'Aegislash-Blade');
				if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
			} else if (attacker.species.name === 'Aegislash-Light' || attacker.species.name === 'Aegislash-Blade-Light') {
				const targetForme = (move.id === 'kingsshield' ? 'Aegislash-Light' : 'Aegislash-Blade-Light');
				if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
				this.add('-message', `${attacker.name} changed to ${move.id === 'kingsshield' ? 'Shield Forme' : 'Blade Forme'}!`);
				this.add('-start', attacker, 'typechange', attacker.getTypes(true).join('/'), '[silent]');
				if (!this.effectState.busted) { // this is just to make a dt that only shows up once per Condana
					const species = this.dex.species.get(attacker.species.name);
					const abilities = species.abilities;
					const baseStats = species.baseStats;
					const type = species.types[0];
					if (species.types[1]) {
						const type2 = species.types[1];
						this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"><img src="http://play.pokemonshowdown.com/sprites/types/${type2}.png" alt="${type2}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
					} else {
						this.add(`raw|<ul class="utilichart"><li class="result"><span class="col pokemonnamecol" style="white-space: nowrap">` + species.name + `</span> <span class="col typecol"><img src="http://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">` + abilities[0] + `</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
					}
					this.effectState.busted = true;
				}
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Stance Change",
		rating: 4,
		num: 176,
	},
	//
	steadfast: {
		shortDesc: "On user's flinch: +1 Spe; Intimidate immunity.",
		onFlinch(pokemon) {
			this.boost({spe: 1});
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Steadfast', '[of] ' + target);
			}
		},
		flags: {},
		name: "Steadfast",
		rating: 1,
		num: 80,
	},
	//
	swarm: {
		shortDesc: "Boosts Bug moves at 50% HP or less.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Bug' && attacker.hp <= attacker.maxhp / 2) {
				this.debug('Swarm boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Bug' && attacker.hp <= attacker.maxhp / 2) {
				this.debug('Swarm boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Swarm",
		rating: 2,
		num: 68,
	},
	//
	torrent: {
		shortDesc: "Boosts Water moves at 50% HP or less.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 2) {
				this.debug('Torrent boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 2) {
				this.debug('Torrent boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Torrent",
		rating: 2,
		num: 67,
	},
	//
	zenmode: {
		onResidualOrder: 29,
		onResidual(pokemon) {
			// Updated condition to allow Solastor and Lullux
			if (!['Darmanitan', 'Solastor', 'Lullux'].includes(pokemon.baseSpecies.baseSpecies) || pokemon.transformed) {
				return;
			}
			if (pokemon.hp <= pokemon.maxhp / 2 && !['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('zenmode');
			} else if (pokemon.hp > pokemon.maxhp / 2 && ['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('zenmode');
				pokemon.removeVolatile('zenmode');
			}
		},
		onEnd(pokemon) {
			if (!pokemon.volatiles['zenmode'] || !pokemon.hp) return;
			pokemon.transformed = false;
			delete pokemon.volatiles['zenmode'];
			if (['Darmanitan', 'Solastor', 'Lullux'].includes(pokemon.species.baseSpecies) && pokemon.species.battleOnly) {
				pokemon.formeChange(pokemon.species.battleOnly as string, this.effect, false, '[silent]');
			}
		},
		condition: {
			onStart(pokemon) {
				// Handle forme changes for custom Pokémon
				const zenFormes: {[k: string]: string} = {
					'darmanitan': 'Darmanitan-Zen',
					'darmanitangalar': 'Darmanitan-Galar-Zen',
					'solastor': 'Solastor-Zen',
					'lullux': 'Lullux-Zen',
				};
				const baseId = pokemon.species.id;
				if (zenFormes[baseId]) {
					pokemon.formeChange(zenFormes[baseId]);
				}
			},
			onEnd(pokemon) {
				const zenFormes = ['Zen', 'Galar-Zen'];
				if (zenFormes.includes(pokemon.species.forme)) {
					pokemon.formeChange(pokemon.species.battleOnly as string);
				}
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Zen Mode",
		rating: 0,
		num: 161,
	},
	// End
	
};
