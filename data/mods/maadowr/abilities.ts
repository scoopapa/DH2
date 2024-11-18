export const Abilities: { [abilityid: string]: ModdedAbilityData } = {
  absorption: {
	  shortDesc: "Increases user's base Def or SpD in terrain.",
		onModifyDefPriority: 6,
		onModifyDef(pokemon) {
			if (this.field.isTerrain('grassyterrain') || this.field.isTerrain('electricterrain')) return this.chainModify(1.5);
		},
	   onModifySpDPriority: 6,
		onModifySpD(pokemon) {
			if (this.field.isTerrain('acidicterrain') || this.field.isTerrain('mistyterrain') || this.field.isTerrain('psychicterrain')) return this.chainModify(1.5);
		},
		flags: {breakable: 1},
		name: "Absorption",
		rating: 2,
		num: -1,
	},
	// end

	// start
	acidicsurge: {
		desc: "On switch-in, this Pokémon summons Acidic Terrain for 5 turns. During the effect, the power of Poison-type attacks made by grounded Pokémon is multiplied by 1.3, and grounded Steel-types are not immune to Poison-type damage. Steel-type Pokémon are still immune to being poisoned and badly poisoned, except by Pokémon with Corrosion. Camouflage transforms the user into a Poison-type, Nature Power becomes Sludge Bomb, and Secret Power has a 30% chance to cause poison. Lasts for 8 turns if the user is holding a Terrain Extender (such as through Skill Swap).",
		shortDesc: "5 turns. Grounded: +Poison power, Steel not immune to Poison type.",
		onStart(source) {
			this.field.setTerrain('acidicterrain');
		},
		flags: {},
		name: "Acidic Surge",
		rating: 4,
		num: -2,
	},
	// end

	// start
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
			case 'acidicterrain':
				types = ['Poison'];
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
	// end

	// start
	agitation: {
		desc: "When this Pokémon raises or lowers another Pokémon's stat stages, the effect is increased by one stage for each affected stat.",
		shortDesc: "Increases stat stage changes the Pokémon inflicts by 1 stage.",
		onAnyTryBoost(boost, target, source, effect) {
			// Prevent the effect if it's a Z-Power move
			if (effect && effect.id === 'zpower') return;
	
			// Ensure that the target and source are valid and not the same
			if (!target || !source || target === source || source !== this.effectState.target) return;
	
			// Iterate through the boost object to modify stat changes
			for (const stat in boost) {
				// Type assertion to ensure stat is a key of BoostsTable
				const boostValue = boost[stat as keyof BoostsTable];
				if (boostValue !== undefined) {
					if (boostValue < 0) {
						boost[stat as keyof BoostsTable] = boostValue - 1; // Exacerbate debuffs
					} else if (boostValue > 0) {
						boost[stat as keyof BoostsTable] = boostValue + 1; // Augment buffs
					}
				}
			}
		},
		flags: {},
		name: "Agitation",
		rating: 4,
		num: -3,
	},
	// end

	// start
   ampup: {
		desc: "When this Pokémon's move misses, raises its Speed by 2 stages.",
		shortDesc: "Raises user's Speed by 2 stages if its move misses.",
		onModifySpe(spe, pokemon) {
			if (pokemon.moveThisTurnResult === false) {
				this.boost({spe: 2});
			}
		},
		flags: {},
		name: "Amp Up",
	   rating: 2,
	   num: -4,
	},
	// end

	// start
   buzz: {
		desc: "When this Pokémon uses a Sound move, the target(s) will be inflicted with a Torment effect.",
		shortDesc: "Inflicts Torment effect if the Pokémon uses a Sound move.",
		onAfterMove(source: Pokemon, target: Pokemon, move: ActiveMove) {
			if (!move.flags['sound']) return;
	
			const applyTorment = (pokemon: Pokemon) => {
				if (pokemon && !pokemon.hasAbility('soundproof') && !pokemon.volatiles['torment'] && !pokemon.volatiles['stall']) {
					pokemon.addVolatile('torment');
					this.add('-start', pokemon, 'Torment', '[from] ability: Buzz');
				}
			};
	
			switch (move.target) {
				case 'all':
					for (const pokemon of this.getAllActive()) {
						applyTorment(pokemon);
					}
					break;
				case 'allAdjacent':
					for (const adjacent of this.getAllActive()) {
						if (adjacent !== source && adjacent.isAdjacent(source)) {
							applyTorment(adjacent);
						}
					}
					break;
				case 'allAdjacentFoes':
					for (const foe of source.foes()) {
						if (foe.isAdjacent(source)) {
							applyTorment(foe);
						}
					}
					break;
				case 'normal':
					applyTorment(target);
					break;
				case 'self':
					applyTorment(source);
					break;
				default:
					console.log(`Unhandled move target: ${move.target}`); // notifier in case there's a type of Sound move I forgot to handle
			}
		},
		flags: {},
	    name: "Buzz",
		rating: 3,
		num: -5,
	},		
	// end

	// start: look for typetracker and soaksteeldenial in condition.ts, Soak in moves.ts
	// If someone wishes to copy this ability, make sure you account for Magic Powder and special form changes from certain Pkm (like
	// my own Aegislash-Ma'adowr which is Grass / Steel in shield form and Grass / Flying in blade form. Form changes override any
	// temporary type change effect from stuff like Soak or Burn Up, etc.! Magic Powder isn't in my regional dex, so, that's one stuff
	// less to worry about.)
   chainlink: {
		shortDesc: "In a double battle, the Pokémon steals its partner's Steel type.",
		onUpdate(pokemon) {
			if (!pokemon.isStarted) return; // should activate *after* Data Mod
			if (!pokemon.hasType('Steel')) {
				for (const ally of pokemon.allies()) {
					if (ally.hasAbility('chainlink')) continue; // don't bounce back and forth indefinitely
					if (ally.hasType('Steel') && pokemon.addType('Steel')) {
						this.add('-ability', pokemon, 'Chain Link');
						this.add('-message', `${pokemon.name} stole its partner's armor!`);
						this.add('-start', pokemon, 'typeadd', 'Steel', '[from] Ability: Chain Link');
						ally.addVolatile('chainlink');
						ally.addVolatile('typetracker'); // New Inclusion to keep track of fringe cases...
					}
				}
			}
		},
		onEnd(pokemon) {
			if (!pokemon.hasType('Steel')) return;
			// doesn't happen twice if the ally has already returned the armor
			for (const ally of pokemon.allies()) {
				ally.removeVolatile('chainlink');
			}
		},
		condition: {
			onStart(pokemon) {
				pokemon.setType(pokemon.getTypes(true).map(type => type === "Steel" ? "???" : type));
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'));
			},
			onSwitchOut(pokemon) { // it seems like volatiles may not run onEnd on their own the way Abilities do
				pokemon.removeVolatile('chainlink');
			},
			onFaint(pokemon) {
				pokemon.removeVolatile('chainlink');
			},
			onEnd(pokemon) {
				for (const ally of pokemon.allies()) { // revert Chain Link user's type first
					if (ally.hasAbility('chainlink') && ally.hasType('Steel')) {
						const currentTypes = ally.getTypes();
                		const newTypes = currentTypes.filter(type => type !== 'Steel'); // Remove Steel type
                		ally.setType(newTypes); // Set the new types without Steel
               		 	this.add('-ability', ally, 'Chain Link');
                		this.add('-message', `${ally.name} returned its partner's armor!`);
                		this.add('-start', ally, 'typechange', ally.types.join('/'));
					}
				}
				// Now we handle the Pokémon and add a special case for Mechatauro as it could theoretically have ???-typing twice through
				// Chain Link and Burn Up
				if (pokemon.hasType('???')) {
					if (pokemon.baseSpecies.name === 'Mechatauro') {
						// Replace only the first instance of ??? with Steel for Mechatauro
						const currentTypes = pokemon.getTypes();
						const newTypes = [];
						let replaced = false; // Flag to track if we've replaced the first ???
				
						for (const type of currentTypes) {
							if (type === '???' && !replaced) {
								newTypes.push('Steel'); // Replace the first ??? with Steel
								replaced = true; // Set the flag to true after replacement
							} else {
								newTypes.push(type); // Keep the other types as they are
							}
						}
				
						pokemon.setType(newTypes); // Set the new types with Steel replacing the first ???
						this.add('-start', pokemon, 'typechange', pokemon.types.join('/'));
					} else {
						// Replace all instances of ??? with Steel for other Pokémon
						const currentTypes = pokemon.getTypes();
						const newTypes = currentTypes.filter(type => type !== '???').concat('Steel');
						pokemon.setType(newTypes); // Set the new types including Steel
						this.add('-start', pokemon, 'typechange', pokemon.types.join('/'));
					}
				}
				if (pokemon.volatiles['typetracker'] && pokemon.baseSpecies.name !== 'Aegislash-Ma\'adowr' &&
					pokemon.baseSpecies.name !== 'Aegislash-Blade-Ma\'adowr' && pokemon.hasType('Water')) {
					// Add Steel type to the Pokémon
    				if (!pokemon.hasType('Steel')) {
        				pokemon.addType('Steel'); // Add Steel type if it doesn't already have it; it's just to be safe even if I cannot imagine how the Pkm would have gained Steel beforehand...
        				this.add('-start', pokemon, 'typeadd', 'Steel', '[from] Typetracker');
        				this.add('-message', `${pokemon.name} gained its Steel type back!`);
    				}	
				}
			},
		},
		flags: {},
		name: "Chain Link",
		rating: 3,
		num: -6,
	},
	// end

	// start
	coupdegrass: {
		desc: "This Pokémon moves first in its priority bracket when its target has 1/2 or less of its maximum HP, rounded down. Does not affect moves that have multiple targets.",
		shortDesc: "This Pokémon moves first in its priority bracket when its target has 1/2 or less HP.",
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
		num: -7,
	},
	// end

	// start: revisit later to check if ally also gets healed
	cultivation: {
		shortDesc: "User and ally recover 1/16 of their HP in terrain.",
		onResidualOrder: 26,
    	onResidual(pokemon) {
		//onTerrainChange(target, source) {
			// Check if any relevant terrain is active
			if (this.field.isTerrain('electricterrain') || 
				this.field.isTerrain('grassyterrain') || 
				this.field.isTerrain('mistyterrain') || 
				this.field.isTerrain('psychicterrain') || 
				this.field.isTerrain('acidicterrain')) {
				
				// Heal the user by 1/16 of its max HP
				this.heal(pokemon.baseMaxhp / 16);
				
				// Heal the ally by 1/16 of their max HP
				const ally = pokemon.side.active.find(ally => ally && ally !== pokemon && !ally.fainted);
					if (ally) {
						this.heal(ally.baseMaxhp / 16, ally);
				}
			}
		},
		flags: {},
		name: "Cultivation",
		rating: 2,
		num: -8,
	},
	// end

	// start
	graviton: {
		shortDesc: "Summons Gravity when replacing a fainted Pokémon.",
		onStart(source) {
			if (!source.side.faintedThisTurn) return; // this is a new line added to balance the ability
				this.field.addPseudoWeather('gravity');
		},
		flags: {},
		name: "Graviton",
		rating: 4,
		num: -9,
	},
	// end

	// start
	illwind: {
		shortDesc: "Sets Tailwind when user replaces a fainted ally.",
		//onAfterMega(pokemon) {
		//	if (!pokemon.side.faintedLastTurn) return;
		//	this.field.addPseudoWeather('tailwind');
	  // },
		onStart(pokemon) {
			if (!pokemon.side.faintedThisTurn) return;
			pokemon.side.addSideCondition('tailwind');
       		this.add('-sidestart', pokemon.side, 'move: Tailwind');
    	},
		flags: {},
		name: "Ill Wind",
		rating: 5,
		num: -10,
	},
	// end

	// start
	inoculum: {
		name: "Inoculum",
		onAnyModifyDamage(damage, source, target, effect) {
			if (source && effect && effect.effectType === 'Move' && effect.type === 'Fire') {
				if (target === this.effectState.target || target.isAlly(this.effectState.target)) {
					this.debug('Inoculum damage reduction from Fire-type move');
				//	this.add('-message', `${target.name} is protected by Inoculum, reducing damage from the Fire-type move!`);
					return this.chainModify(0.5);
				}
			}
		},	
		onAnyDamage(damage, target, source, effect) {
			if (effect && effect.id === 'brn') {
				if (target === this.effectState.target || target.isAlly(this.effectState.target)) {
					this.debug('Inoculum damage reduction for burn damage');
				//	this.add('-message', `${target.name} is protected by Inoculum, reducing burn damage!`);
					return damage / 2;
				}
			}
		},		
		flags: {},
		rating: 2,
		num: -11,
	},
	
	// end

	// start
	interference: {
		shortDesc: "When attacked, inflicts Torment on the attacker.",
   		onDamagingHit(damage, target, source, move) {
			//if (this.checkMoveMakesContact(move, source, target)) {
				source.addVolatile('torment', this.effectState.target);
			//}
		},
		flags: {},
		name: "Interference",
		rating: 3,
		num: -12,
	},
	// end
	
	// start: Malware
	malware: {
		name: "Malware",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Malware');
			this.add('-message', `${pokemon.name}'s Malware is active!`);
			this.effectState.malwareUser = pokemon;
			this.eachEvent('Update');
		},
		onAnyDragOut(pokemon) {
			pokemon.removeVolatile('malwarepoisoned');
		},
		onUpdate(pokemon) {
			if (pokemon === this.effectState.malwareUser) {
				for (const target of this.getAllActive()) {
					if (target !== pokemon && !target.hasType('Poison') && !target.hasType('Steel') && !target.status) {
						// Check for immunity to poison
						if (target.isGrounded() && this.field.isTerrain('mistyterrain')) {
						//	this.add('-message', `${target.name} is protected by Misty Terrain!`);
							continue; // Skip applying poison and flag
						}
						if (target.hasAbility('immunity')) {
						//	this.add('-message', `${target.name}'s Immunity prevents it from being poisoned!`);
							continue; // Skip applying poison and flag
						}
						if (target.hasAbility('comatose')) {
							//	this.add('-message', `${target.name}'s Immunity prevents it from being poisoned!`);
								continue; // Skip applying poison and flag
						}
						if (target.side.getSideCondition('safeguard')) {
						//	this.add('-message', `${target.name} is protected by Safeguard!`);
							continue; // Skip applying poison and flag
						}
						if (target.hasItem('sunring') && (target.baseSpecies.baseSpecies === 'Horizonoc')) {
						//	this.add('-message', `${target.name} is protected by Sun Ring!`);
							continue; // Skip applying poison and flag
						}
						// Check if the ally is Horizonoc and Sun or Desolate Land is active
						const allyPresent = target.side.active.some(ally => ally && ally !== target && ally.baseSpecies.baseSpecies === 'Horizonoc' && ally.hasItem('sunring'));
						if (allyPresent && ['sunnyday', 'desolateland'].includes(this.field.effectiveWeather())) {
						//	this.add('-message', `${target.name} is protected from being poisoned because its ally Horizonoc is present with Sun Ring and the weather is active!`);
							continue; // Skip applying poison and flag
						}

						this.add('-message', `${target.name} is affected by Malware!`);
						target.setStatus('psn', pokemon, null, true);
						target.addVolatile('malwarepoisoned');
					//	this.add('-start', target, 'malwarepoisoned', '[from] ability: Malware', '[of] ' + pokemon); //this is internal check
					}
				}
			}
		},
	//	onResidualOrder: 26,
	//	onResidualSubOrder: 1,
	//	onResidual(pokemon) {
		onSwitchOut(pokemon) {
			// Remove all Malware poison effects when the user switches out
		for (const target of this.getAllActive()) {
			if (target.volatiles['malwarepoisoned']) {
				target.removeVolatile('malwarepoisoned');
					if (target.status === 'psn') {
						target.cureStatus();
					}
				//	this.add('-end', target, 'malwarepoisoned', '[from] ability: Malware', '[of] ' + pokemon); // this is internal check
					this.add('-message', `${target.name} is cured of Malware poison.`);
				}
			}
		},

		// This method handles when any Pokémon switches out
		onAnySwitchOut(pokemon) {
		// Check if the switching Pokémon has the malwarepoisoned status
		if (pokemon.volatiles['malwarepoisoned']) {
			pokemon.removeVolatile('malwarepoisoned'); // Remove the malwarepoisoned volatile status
			if (pokemon.status === 'psn') {
				pokemon.cureStatus(); // Cure the poison status if it exists
				}
			//	this.add('-end', pokemon, 'malwarepoisoned', '[from] ability: Malware', '[of] ' + pokemon); // this is internal check
				this.add('-message', `${pokemon.name} is cured of Malware poison.`);
			}
		},

		onFaint(pokemon) {
		// Remove all Malware poison effects when the user faints
			for (const target of this.getAllActive()) {
				if (target.volatiles['malwarepoisoned']) {
					target.removeVolatile('malwarepoisoned');
					if (target.status === 'psn') {
						target.cureStatus();
					}
				//	this.add('-end', target, 'malwarepoisoned', '[from] ability: Malware', '[of] ' + pokemon); // this is internal check
					this.add('-message', `${target.name} is cured of Malware poison.`);
				}
			}
		},
//		onDamage(damage, target, source, effect) {
//			if (effect && effect.id === 'psn' && (target.volatiles['malwarepoisoned'])) {
//				return damage / 2;
//			}
//		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		rating: 4,
		num: -13,
	},
	// end
	
	// start
	masquerade: {
		desc: "This Pokémon inherits the Ability of the last unfainted Pokemon in its party until it takes direct damage from another Pokémon's attack. Abilities that cannot be copied are \"No Ability\", As One, Battle Bond, Comatose, Disguise, Flower Gift, Forecast, Gulp Missile, Hunger Switch, Ice Face, Illusion, Imposter, Multitype, Neutralizing Gas, Power Construct, Power of Alchemy, Receiver, RKS System, Schooling, Shields Down, Stance Change, Trace, Wonder Guard, and Zen Mode.",
		shortDesc: "Inherits the Ability of the last party member. Wears off when attacked.",
		onUpdate(pokemon) {
			if (!pokemon.isStarted || this.effectState.gaveUp || pokemon.volatiles['masquerade']) return;
			pokemon.addVolatile('masquerade');
			let i;
			for (i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
				if (!pokemon.side.pokemon[i]) continue;
				const additionalBannedAbilities = [
					'noability', 'flowergift', 'forecast', 'hugepower', 'hungerswitch', 'illusion', 'imposter', 'neutralizinggas',
					'powerofalchemy', 'purepower', 'receiver', 'trace', 'wonderguard',
				];
				if (
					pokemon.side.pokemon[i].fainted ||
					(pokemon.side.pokemon[i].getAbility() as any).isPermanent || additionalBannedAbilities.includes(pokemon.side.pokemon[i].ability)
				) {
					continue;
				}
				break;
			}
			if (!pokemon.side.pokemon[i] || pokemon === pokemon.side.pokemon[i]) {
				this.effectState.gaveUp = true;
				return;
			}
			const masquerade = pokemon.side.pokemon[i];
			this.add('-ability', pokemon, 'Masquerade');
			pokemon.setAbility(masquerade.ability);
			this.hint(`${pokemon.name} inherited ${this.dex.abilities.get(pokemon.ability).name} from ${masquerade.name}!`);
			this.add('-ability', pokemon, this.dex.abilities.get(pokemon.ability).name, '[silent]');
		},
		condition: {
			onDamagingHit(damage, target, source, move) {
				this.effectState.busted = true;
			},
			onFaint(pokemon) {
				this.effectState.busted = true;
			},
			onUpdate(pokemon) {
				if (pokemon.hasAbility('masquerade')) return;
				if (this.effectState.busted) {
					this.add('-ability', pokemon, 'Masquerade');
					this.add('-message', `${pokemon.name}'s Masquerade wore off!`);
					pokemon.setAbility('masquerade');
				}
			},
		},
		flags: {},
		name: "Masquerade",
		rating: 3,
		num: -14,
	},
	// end

	// start
	permafrost: {
		shortDesc: "Boosts Ice moves by 50% on user's side.",
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Ice') {
				this.debug('Permafrost boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Permafrost",
		rating: 3.5,
		num: -15,
	},
	// end

	// start
	poisonspit: {
		shortDesc: "Sets Acidic Terrain when hurt.",
		onDamagingHit(damage, target, source, move) {
			this.field.setTerrain('acidicterrain');
		},
		flags: {},
		name: "Poison Spit",
		rating: 2,
		num: -16,
	},
	// end

	// start
	reconfiguration: {
		shortDesc: "Boosts user's stat depending on target's best stat.",
		onSwitchIn(pokemon) {
			this.effectState.switchingIn = true;
		},
		onStart(pokemon) {
			const foes = pokemon.side.foe.active;
			const target = foes[foes.length - 1 - pokemon.position];
			if (!target) return;
			this.boost({[target.getBestStat(false,true)]: 1});
		},
		flags: {},
		name: "Reconfiguration",
		rating: 3,
		num: -17,
	},
	// end

	// start: 
	rewind: {
		shortDesc: "Recovers items on user's side if at 50% or below.",
		onDamage(damage, target, source, effect) {
			// Check if the target's HP is brought to 50% or below after damage is applied
			if (target.hp - damage <= target.maxhp / 2) {
				this.effectState.rewindTriggered = true; // Mark that the ability has been triggered
			}
		},
		onAfterMoveSecondary(target, source, move) {
			// Check if the ability was triggered
			if (this.effectState.rewindTriggered) {
				this.effectState.rewindTriggered = false; // Reset the trigger
				// Recover items from all Pokémon on the user's side that don't already have an item
				for (const ally of target.side.pokemon) {
					if (ally && !ally.item) { // Only recover items for allies without items
						// Use Recycle to recover the item
						this.actions.useMove('Recycle', ally);
					}
				}
			}
		},
		flags: {},
		name: "Rewind",
		rating: 4,
		num: -18,
	},
	// end

	// start
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
		num: -19,
	},
	// end

	// start
	solarcore: {
		shortDesc: "During intense sunlight, this Pokémon can skip the charging turn of its moves.",
		onChargeMove(pokemon, target, move) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				this.debug('Solar Core - remove charge turn for ' + move.id);
				this.attrLastMove('[still]');
				this.addMove('-anim', pokemon, move.name, target);
				return false; // skip charge turn
			}
		},
		flags: {},
		name: "Solar Core",
		rating: 2,
		num: -20,
	},
	// end

	// start
	steelbreaker: {
		shortDesc: "This Pokémon's attacks are critical hits if the target is a Steel-type Pokémon.",
		onModifyCritRatio(critRatio, source, target) {
			if (target && target.hasType('Steel')) return 5;
		},
		flags: {},
		name: "Steelbreaker",
		rating: 3,
		num: -21,
	},
	// end

	// start
	tempestuous: {
		desc: "When replacing a fainted party member, this Pokémon's Special Defense is boosted, and it charges power to double the power of its Electric-type move on its first turn.",
		shortDesc: "Gains the effect of Charge when replacing a fainted ally.",
	//	onAfterMega(pokemon) {
	//		if (!pokemon.side.faintedLastTurn) return;
	//		this.boost({spd: 1}, pokemon);
	//		this.add('-activate', pokemon, 'move: Charge');
	//		pokemon.addVolatile('charge');
	//	},
		onStart(pokemon) {
			if (!pokemon.side.faintedThisTurn) return;
			this.boost({spd: 1}, pokemon);
			// Check if Charge is already active
			if (!pokemon.volatiles['charge']) {
			//	this.add('-activate', pokemon, 'move: Charge');
				pokemon.addVolatile('charge'); // Apply Charge effect
			}
		},
		name: "Tempestuous",
		rating: 3,
		num: -22,
	},
	// end

	// start
	// thermal expansion
	thermalexpansion: {
		onDamage(damage, target, source, effect) {
			if (!target.hasType('Ice')) return;
			if (effect && effect.id === 'stealthrock') {
				target.setType(target.getTypes(true).map(type => type === "Ice" ? "???" : type));
				this.add('-start', target, 'typechange', target.getTypes().join('/'));
				return false;
			}
		},
		onTryHit(target, source, move) {
			if (!target.hasType('Ice')) return;
			if (move.type === 'Rock') {
				this.add('-immune', target, '[from] ability: Thermal Expansion');
				target.setType(target.getTypes(true).map(type => type === "Ice" ? "???" : type));
				this.add('-start', target, 'typechange', target.getTypes().join('/'));
				return null;
			}
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (target.hasType('Ice')) return;
			if (!target.addType('Ice')) return false;
			if (effect.id === 'snow') {
				this.add('-start', target, 'typeadd', 'Ice', '[from] ability: Thermal Expansion');
			}
		},
		flags: {},
		name: "Thermal Expansion",
		shortDesc: "If user is Ice-type, immunity to Stealth Rock and Rock-type moves. On immunity, lose Ice-type. Regain in Snow or switch.",
		rating: 4,
		num: -23,
	},

	// end

	// start
	vampirism: {
		shortDesc: "Replaces target's ability with Vampirism if user made contact.",
		onSourceDamagingHit(damage, target, source, move) {
			const sourceAbility = source.getAbility();
			const targetAbility = target.getAbility();
	
			// Check if the target's ability can be suppressed
			if (targetAbility.flags['cantsuppress'] || targetAbility.id === 'vampirism') {
				return; // Exit if the target's ability cannot be replaced or is already Vampirism
			}
	
			// Check if the move makes contact
			if (this.checkMoveMakesContact(move, source, target, !source.isAlly(target))) {
				// Replace the target's ability with Vampirism
				const oldAbility = target.setAbility('vampirism', source);
				if (oldAbility) {
					this.add('-activate', target, 'ability: Vampirism', this.dex.abilities.get(oldAbility).name, '[of] ' + source);
				}
			}
		},
		flags: {},
		name: "Vampirism",
		rating: 3,
		num: -24,
	},
	// end

	// start
	woodstove: {
		shortDesc: "Ice does 50% less damage against user's side.",
		onAnyModifyDamage(damage, source, target, effect) {
			if (source && effect && effect.effectType === 'Move' && effect.type === 'Ice') {
				if (target === this.effectState.target || target.isAlly(this.effectState.target)) {
					this.debug('Wood Stove damage reduction from Ice-type move');
				//	this.add('-message', `${target.name} is protected by Wood Stove, reducing damage from the Ice-type move!`);
					return this.chainModify(0.5);
				}
			}
		},
		onUpdate(pokemon) {
			// Check if the user or any ally is frozen
			const allies = pokemon.side.active; // Get all active Pokémon on the user's side
			for (const ally of allies) {
				if (ally.status === 'frz') {
					this.add('-activate', ally, 'ability: Wood Stove');
					ally.cureStatus(); // Cure the frozen status for the ally
				}
			}
			 // Also check the user of the ability
			 if (pokemon.status === 'frz') {
				this.add('-activate', pokemon, 'ability: Wood Stove');
				pokemon.cureStatus(); // Cure the frozen status for the user
			}
		},
		onImmunity(type, pokemon) {
			// Grant immunity to freeze for the user and their allies
			if (type === 'frz') {
				const allies = pokemon.side.active; // Get all active Pokémon on the user's side
				for (const ally of allies) {
					if (ally === pokemon || ally.isAlly(pokemon)) {
						this.add('-immune', ally, 'ability: Wood Stove');
					}
				}
				return false; // Prevent the freeze status from being applied
			}
		},
		flags: {},
		name: "Wood Stove",
		rating: 2,
		num: -25,
	},
	// end

	// start: Volatiles are handled in script
	skyrider: {
		shortDesc: "Tag Team: Escavalier and Grapplin.",
		onUpdate(pokemon) {
			const grapplin = pokemon.side.active.find(ally => ally.species.name === 'Grapplin');

    		if (!grapplin) return; // Ensure Grapplin is present

			// This is a new line to handle the case where Grapplin attacks first and Escavalier afterwards
			if ((grapplin) && !grapplin.volatiles['skyriding']) {
				grapplin.addVolatile('skyriding')
			} // end

    		if (pokemon.hasType('Steel')) {
        		// If the user is Steel and Grapplin is not Steel, add skyriderally to Grapplin
        		if (!grapplin.hasType('Steel')) {
            		grapplin.addVolatile('skyriderally');
        		}
    		} else {
        		// If the user is not Steel, remove skyriderally from Grapplin
        		if (grapplin.volatiles['skyriderally']) {
            		grapplin.removeVolatile('skyriderally');
        		}
    		}
		},
		onFaint(pokemon) {
			pokemon.side.active.forEach(ally => {
				if (ally && ally.volatiles['skyriderally']) {
					ally.removeVolatile('skyriderally');
				}
				// This is a new line to handle the case where Grapplin attacks first and Escavalier afterwards
				if (ally && ally.volatiles['skyriding']) {
					ally.removeVolatile('skyriding')
				} // end
			});
		},
		onSwitchOut(pokemon) {
			pokemon.side.active.forEach(ally => {
				if (ally && ally.volatiles['skyriderally']) {
					ally.removeVolatile('skyriderally');
				}
				// This is a new line to handle the case where Grapplin attacks first and Escavalier afterwards
				if (ally && ally.volatiles['skyriding']) {
					ally.removeVolatile('skyriding')
				} // end
			});
		},
		onEnd(pokemon) {
			pokemon.side.active.forEach(ally => {
				if (ally && ally.volatiles['skyriderally']) {
					ally.removeVolatile('skyriderally');
				}
				// This is a new line to handle the case where Grapplin attacks first and Escavalier afterwards
				if (ally && ally.volatiles['skyriding']) {
					ally.removeVolatile('skyriding')
				} // end
			});
		},
		onPrepareHit(pokemon, target, move) {
			const grapplin = pokemon.side.active.find(ally => ally.species.name === 'Grapplin');
   			if (!grapplin) return; // Ensure Grapplin is present

			// Check if the move is not a status move
			if (move.category !== 'Status') {
				// Loop through the action queue
				for (const action of this.queue.list as MoveAction[]) {
					// Check if the action is valid
					if (
						!action.move || !action.pokemon?.isActive ||
						action.pokemon.fainted || action.maxMove || action.zmove
					) {
						continue; // Skip invalid actions
					}
		
					// Check if the action belongs specifically to the ally; indirectly, that's Grapplin
					if (action.pokemon.isAlly(pokemon)) {
						this.queue.prioritizeAction(action, move); // Prioritize the action
						this.add('-waiting', pokemon, action.pokemon); // Notify that Grapplin is waiting
						break; // Exit the loop but not the function, meaning user's move should be able to do damage now
					}
				}
			}
		},	
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Sky Rider",
		rating: 0,
		num: -26,
	},
	// end
	// start: Amaterasu, bound by volatile and Engraving. So, there's no real natural user of Amaterasu
	amaterasu: {
		shortDesc: "User burns and suffers 1/8 Burn damage.",
		onUpdate(pokemon) {
			// Check if the Pokémon has the Amaterasu ability and is not already burned, etc.
			if (pokemon.hasAbility('amaterasu') && !pokemon.status && !pokemon.hasType('Fire')) {
				if (pokemon.isGrounded() && this.field.isTerrain('mistyterrain')) {
					return;
				}
				if (pokemon.side.getSideCondition('safeguard')) {
					return;
				}
				if (pokemon.hasItem('sunring') && (pokemon.baseSpecies.baseSpecies === 'Horizonoc')) {
					return;
				}
				// Check if the ally is Horizonoc and Sun or Desolate Land is active
				const allyPresent = pokemon.side.active.some(ally => ally && ally !== pokemon && ally.baseSpecies.baseSpecies === 'Horizonoc' && ally.hasItem('sunring'));
				if (allyPresent && ['sunnyday', 'desolateland'].includes(this.field.effectiveWeather())) {
					return;
				}
				pokemon.setStatus('brn', pokemon, null, true);
			}
		},
		onAnyDamage(damage, target, source, effect) {
			if (effect && effect.id === 'brn') {
				if (target === this.effectState.target) {
					this.debug('Amaterasu damage increase for burn damage');
					return this.chainModify(2);
				}
			}
		},	
		onFaint(target, source, effect) {
			if (!source || !effect || target.side === source.side) return;
			if (effect.effectType === 'Move' && !effect.flags['futuremove']) {
				this.add('-ability', target, 'Amaterasu');
				const bannedAbilities = [
					'battlebond', 'comatose', 'disguise', 'multitype', 'powerconstruct', 'rkssystem', 'schooling', 'shieldsdown', 'skyrider', 'stancechange', 'truant', 'zenmode',
				];
				if (bannedAbilities.includes(source.ability) || source.hasType('Fire')) {
					return;
				} else {
					source.setAbility('amaterasu');
					source.baseAbility = 'amaterasu' as ID;
					source.ability = 'amaterasu' as ID;
					this.add('-ability', source, 'Amaterasu', '[from] Ability: Amaterasu');
				}
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Amaterasu",
		rating: 0,
		num: -29,
	},
	// end

	// start: Archetype (Reserve Idea for New Project)
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
			if (target === source) return;
	
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
		num: -27,
	},
	// end
	// start: Reserve Idea for New Project
	parasignal: {
		shortDesc: "Sets Psychic Terrain when hurt.",
		onDamagingHit(damage, target, source, move) {
			this.field.setTerrain('psychicterrain');
		},
		flags: {},
		name: "Parasignal",
		rating: 2,
		num: -28,
	},
	// end

	// start: modifying vanilla abilities
	leafguard: {
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
		onModifyDefPriority: 6,
    	onModifyDef(pokemon) {
        // Check if the weather is sunny or Desolate Land
		if (this.field.isWeather('sunnyday') || this.field.isWeather('desolateland')) {
            	return this.chainModify(1.5); // Increase Defense by 50%
        	}
    	},
		flags: {breakable: 1},
		name: "Leaf Guard",
		rating: 0.5,
		num: 102,
	},

	magmaarmor: {
		onUpdate(pokemon) {
			if (pokemon.status === 'frz') {
				this.add('-activate', pokemon, 'ability: Magma Armor');
				pokemon.cureStatus();
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'frz') return false; // Prevent freezing
		},
		onSourceModifyDamage(damage, source, target, move) {
			// Check if the move is Ice-type and reduce damage by 50%
			if (move.type === 'Ice') {
				this.debug('Magma Armor damage reduction from Ice-type move');
				return this.chainModify(0.5); // Reduce damage by 50%
			}
		},
		flags: {breakable: 1},
		name: "Magma Armor",
		rating: 0.5,
		num: 40,
	},

	pixilate: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'colourmegone', 'judgment', 'multiattack', 'naturalgift', 'pincerattack', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Fairy';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Pixilate",
		rating: 4,
		num: 182,
	},

	rivalry: {
		onBasePowerPriority: 24,
		onBasePower(basePower, attacker, defender, move) {
			// Check if the attacker has an ally and both share the same gender
			const ally = attacker.side.active.find(pokemon => pokemon && pokemon !== attacker);
			if (ally && attacker.gender && ally.gender) {
				if (attacker.gender === ally.gender) {
					this.debug('Rivalry boost');
					return this.chainModify(1.25); // Increase damage by 25%
				}
			}
		},
		flags: {},
		name: "Rivalry",
		rating: 0,
		num: 79,
	},

	flowergift: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if (!pokemon.isActive || pokemon.baseSpecies.baseSpecies !== 'Cherrim' || pokemon.transformed) return;
			if (!pokemon.hp) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				if (pokemon.species.id !== 'cherrimsunshine') {
					pokemon.formeChange('Cherrim-Sunshine', this.effect, false, '[msg]');
				}
			} else {
				if (pokemon.species.id === 'cherrimsunshine') {
					pokemon.formeChange('Cherrim', this.effect, false, '[msg]');
				}
			}
		},
		onAllyModifyAtkPriority: 3,
		onAllyModifyAtk(atk, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim' &&
				this.effectState.target.baseSpecies.baseSpecies !== 'Hieroturoc') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onAllyModifySpDPriority: 4,
		onAllyModifySpD(spd, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim' &&
				this.effectState.target.baseSpecies.baseSpecies !== 'Hieroturoc') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, breakable: 1},
		name: "Flower Gift",
		rating: 1,
		num: 122,
	},

	stancechange: {
		onModifyMovePriority: 1,
		onModifyMove(move, attacker, defender) {
			if (
				(!attacker.species.name.startsWith('Aegislash') && !attacker.species.name.startsWith('Ma\'adowr')) || attacker.transformed
			) return;
			if (move.category === 'Status' && move.id !== 'kingsshield') return;//if using a non-kings-shield status move, or if using Flurry
			if (attacker.species.name === 'Aegislash' || attacker.species.name === 'Aegislash-Blade') {
				const targetForme = (move.id === 'kingsshield' ? 'Aegislash' : 'Aegislash-Blade');
				if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
			} else if (attacker.species.name === 'Aegislash-Ma\'adowr' || attacker.species.name === 'Aegislash-Blade-Ma\'adowr') {
				const targetForme = (move.id === 'kingsshield' ? 'Aegislash-Ma\'adowr' : 'Aegislash-Blade-Ma\'adowr');
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

	zenmode: {
		onResidualOrder: 29,
		onResidual(pokemon) {
			const baseSpecies = pokemon.baseSpecies.baseSpecies;
			const forme = pokemon.species.forme;
			if (!['Darmanitan', 'Immanicus'].includes(baseSpecies) || pokemon.transformed) {
				return;
			}
			if (pokemon.hp <= pokemon.maxhp / 2 && !['Zen', 'Galar-Zen'].includes(forme)) {
				pokemon.addVolatile('zenmode');
			} else if (pokemon.hp > pokemon.maxhp / 2 && ['Zen', 'Galar-Zen'].includes(forme)) {
				pokemon.addVolatile('zenmode'); // in case of base Zen forms
				pokemon.removeVolatile('zenmode');
			}
		},
		onEnd(pokemon) {
			if (!pokemon.volatiles['zenmode'] || !pokemon.hp) return;
			pokemon.transformed = false;
			delete pokemon.volatiles['zenmode'];
			if (['Darmanitan', 'Immanicus'].includes(pokemon.species.baseSpecies) && pokemon.species.battleOnly) {
				pokemon.formeChange(pokemon.species.battleOnly as string, this.effect, false, '[silent]');
			}
		},
		condition: {
			onStart(pokemon) {
				const speciesId = pokemon.species.id;
				if (!pokemon.species.name.includes('Galar')) {
					if (speciesId === 'darmanitanzen' || speciesId === 'immanicuszen') return;
					if (speciesId === 'darmanitan') pokemon.formeChange('Darmanitan-Zen');
					if (speciesId === 'immanicus') pokemon.formeChange('Immanicus-Zen');
				} else {
					if (speciesId !== 'darmanitangalarzen') pokemon.formeChange('Darmanitan-Galar-Zen');
				}
			},
			onEnd(pokemon) {
				if (['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
					pokemon.formeChange(pokemon.species.battleOnly as string);
				}
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Zen Mode",
		rating: 0,
		num: 161,
	},

	runaway: {
		inherit: true,
		onTrapPokemonPriority: -10,
		onTrapPokemon(pokemon) {
			pokemon.trapped = pokemon.maybeTrapped = false;
		},
		shortDesc: "Cannot be trapped.",
		flags: {},
		name: "Run Away",
		rating: 0,
		num: 50,
	},
	// end

	cursedbody: {
		onDamagingHit(damage, target, source, move) {		
			if (source.volatiles['disable']) return; // Prevent reapplying disable
			if (!move.isMax && !move.flags['futuremove'] && move.id !== 'struggle') {
				if (this.randomChance(3, 10) && !target.volatiles['maudiorfeature']) {
					this.add('-activate', source, 'ability: Cursed Body', target);
					source.addVolatile('disable', target);
				} else if (target.volatiles['maudiorfeature']) {
					this.add('-activate', source, 'ability: Cursed Body', target);
					source.addVolatile('disable', target);
				}
			}
			
		},
		flags: {},
		name: "Cursed Body",
		rating: 2,
		num: 130,
	},
	cutecharm: {
		onDamagingHit(damage, target, source, move) {
			if (source.volatiles['attract']) return;
			// Existing logic for Cute Charm
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10) && !target.volatiles['maudiorfeature']) {
					this.add('-activate', source, 'ability: Cute Charm', target);
					source.addVolatile('attract', target);
				} else if (target.volatiles['maudiorfeature']) {
					this.add('-activate', source, 'ability: Cute Charm', target);
					source.addVolatile('attract', target);
				}
			}
		},
		flags: {},
		name: "Cute Charm",
		rating: 0.5,
		num: 56,
	},
	// Effect Spore
	effectspore: {
		onDamagingHit(damage, target, source, move) {
			// Check if the move makes contact, the source has no status, and is not immune to powder
			if (this.checkMoveMakesContact(move, source, target) && !source.status && source.runStatusImmunity('powder')) {
				// Check if the source has the Maudior Feature as a volatile
				if (target.volatiles['maudiorfeature']) {
					// If the user has Maudior Feature, guarantee one of the status effects
					this.add('-activate', source, 'ability: Effect Spore', target);
					const r = this.random(3); // Generate a random number from 0 to 2
					if (r === 0) {
						source.setStatus('slp', target); // Sleep
					} else if (r === 1) {
						source.setStatus('par', target); // Paralysis
					} else {
						source.setStatus('psn', target); // Poison
					}
				} else {
					// Existing logic for Effect Spore
					const r = this.random(100); // Generate a random number from 0 to 99
					if (r < 11) {
						source.setStatus('slp', target); // Sleep
					} else if (r < 21) {
						source.setStatus('par', target); // Paralysis
					} else if (r < 30) {
						source.setStatus('psn', target); // Poison
					}
				}
			}
		},
		flags: {},
		name: "Effect Spore",
		rating: 2,
		num: 27,
	},
	// End
	flamebody: {
		onDamagingHit(damage, target, source, move) {
			if (!source.status) {
			// Existing logic for Flame Body
				if (this.checkMoveMakesContact(move, source, target)) {
					if (this.randomChance(3, 10) && !target.volatiles['maudiorfeature']) {
						source.trySetStatus('brn', target);
					} else if (target.volatiles['maudiorfeature']) {
						source.trySetStatus('brn', target);
					}
				}
			}	
		},
		flags: {},
		name: "Flame Body",
		rating: 2,
		num: 49,
	},
	harvest: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			// Check if the source has the Maudior Feature
			if (pokemon.volatiles['maudiorfeature']) {
				// If the user has Maudior Feature, guarantee the Berry restoration
				if (pokemon.hp && !pokemon.item && this.dex.items.get(pokemon.lastItem).isBerry) {
					pokemon.setItem(pokemon.lastItem);
					pokemon.lastItem = '';
					this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Harvest');
				}
			} else {
				// Existing logic for Harvest
				if (this.field.isWeather(['sunnyday', 'desolateland']) || this.randomChance(1, 2)) {
					if (pokemon.hp && !pokemon.item && this.dex.items.get(pokemon.lastItem).isBerry) {
						pokemon.setItem(pokemon.lastItem);
						pokemon.lastItem = '';
						this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Harvest');
					}
				}
			}
		},
		flags: {},
		name: "Harvest",
		rating: 2.5,
		num: 139,
	},
	healer: {
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			for (const allyActive of pokemon.adjacentAllies()) {
				// Check if the Pokémon has the Maudior Feature as a volatile
				if (pokemon.volatiles['maudiorfeature']) {
					// If the user has Maudior Feature, guarantee the status cure
					if (allyActive.status) {
						this.add('-activate', pokemon, 'ability: Healer');
						allyActive.cureStatus();
					}
				} else {
					// Existing logic for Healer
					if (allyActive.status && this.randomChance(3, 10)) {
						this.add('-activate', pokemon, 'ability: Healer');
						allyActive.cureStatus();
					}
				}
			}
		},
		flags: {},
		name: "Healer",
		rating: 0,
		num: 131,
	},
	poisonpoint: {
		onDamagingHit(damage, target, source, move) {
			if (!source.status) {
				if (this.checkMoveMakesContact(move, source, target)) {
					if (this.randomChance(3, 10) && !target.volatiles['maudiorfeature']) {
						source.trySetStatus('psn', target);
					} else if (target.volatiles['maudiorfeature']) {
						source.trySetStatus('psn', target);
					}
				}
			}
		},
		flags: {},
		name: "Poison Point",
		rating: 1.5,
		num: 38,
	},
	poisontouch: {
		onSourceDamagingHit(damage, target, source, move) {
			// Check if the target has Shield Dust or Covert Cloak
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak') || (target.status)) return;
	
				// Check if the source has the Maudior Feature as a volatile
				if (source.volatiles['maudiorfeature']) {
					// If the user has Maudior Feature, guarantee the poison effect
				//	this.add('-activate', source, 'ability: Poison Touch', target);
					target.trySetStatus('psn', source);
				} else {
				// Existing logic for Poison Touch
				if (this.checkMoveMakesContact(move, target, source)) {
					if (this.randomChance(3, 10)) {
						target.trySetStatus('psn', source);
					}
				}
			}
		},
		flags: {},
		name: "Poison Touch",
		rating: 2,
		num: 143,
	},
	shedskin: {
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			// Check if the Pokémon has the Maudior Feature as a volatile
			if (pokemon.volatiles['maudiorfeature']) {
				// If the user has Maudior Feature, guarantee the status cure
				if (pokemon.hp && pokemon.status) {
					this.add('-activate', pokemon, 'ability: Shed Skin');
					pokemon.cureStatus();
				}
			} else {
				// Existing logic for Shed Skin
				if (pokemon.hp && pokemon.status && this.randomChance(33, 100)) {
					this.debug('shed skin');
					this.add('-activate', pokemon, 'ability: Shed Skin');
					pokemon.cureStatus();
				}
			}
		},
		flags: {},
		name: "Shed Skin",
		rating: 3,
		num: 61,
	},
	static: {
		onDamagingHit(damage, target, source, move) {
			if (!source.status) {
				if (this.checkMoveMakesContact(move, source, target)) {
					if (this.randomChance(3, 10) && !target.volatiles['maudiorfeature']) {
						source.trySetStatus('par', target);
					} else if (target.volatiles['maudiorfeature']) {
						source.trySetStatus('par', target);
					}
				}
			}
		},
		flags: {},
		name: "Static",
		rating: 2,
		num: 9,
	},
	stench: {
		onModifyMovePriority: -1,
		onModifyMove(move) {
			// Check if the Pokémon has the Maudior Feature as a volatile
			const source = this.effectState.source; // Get the source of the move
			if (source.volatiles['maudiorfeature']) {
				// If the user has Maudior Feature, guarantee the flinch effect
				this.debug('Adding guaranteed Stench flinch');
				if (!move.secondaries) move.secondaries = [];
				// Remove any existing flinch secondary
				for (const secondary of move.secondaries) {
					if (secondary.volatileStatus === 'flinch') return;
				}
				move.secondaries.push({
					chance: 100, // Set chance to 100% for guaranteed flinch
					volatileStatus: 'flinch',
				});
			} else {
				// Existing logic for Stench
				if (move.category !== "Status") {
					this.debug('Adding Stench flinch');
					if (!move.secondaries) move.secondaries = [];
					for (const secondary of move.secondaries) {
						if (secondary.volatileStatus === 'flinch') return;
					}
					move.secondaries.push({
						chance: 10, // Original chance for flinch
						volatileStatus: 'flinch',
					});
				}
			}
		},
		flags: {},
		name: "Stench",
		rating: 0.5,
		num: 1,
	},
	wonderskin: {
		onModifyAccuracyPriority: 10,
		onModifyAccuracy(accuracy, target, source, move) {
			// Check if the Pokémon has the Maudior Feature as a volatile
			if (target.volatiles['maudiorfeature']) {
				// If the user has Maudior Feature, set accuracy to 0 for status moves
				if (move.category === 'Status' && typeof accuracy === 'number') {
					this.debug('Wonder Skin with Maudior Feature - setting accuracy to 0');
					return 0; // Guarantee 0% accuracy for status moves
				}
			} else {
				// Existing logic for Wonder Skin
				if (move.category === 'Status' && typeof accuracy === 'number') {
					this.debug('Wonder Skin - setting accuracy to 50');
					return 50; // Set accuracy to 50% for status moves
				}
			}
		},
		flags: {breakable: 1},
		name: "Wonder Skin",
		rating: 2,
		num: 147,
	},
	
};
