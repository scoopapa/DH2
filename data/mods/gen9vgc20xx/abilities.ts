export const Abilities: { [abilityid: string]: ModdedAbilityData } = {
 
	// Start
	armorpiercer: {
		shortDesc: "Contact moves bypass Protect. 25% damage instead.",
		onModifyMove(move, source, target) {
			if (move.flags['contact']) {
				delete move.flags['protect'];
			}
		},
		onModifyDamage(damage, source, target, move) {
			if (move.flags['contact'] && target.volatiles['stall']) {
				this.debug('Armor Piercer reduces damage against Stall');
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
		desc: "Sand: Ground/Flying, Rain: Ground/Water, Sun: Ground/Fire, Snow: Ground/Ice.",
		shortDesc: "Gains additional type in weather.",
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Dustform' || pokemon.transformed) return;
			let forme = null;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				if (pokemon.species.id !== 'dustformsunny') forme = 'Dustform-Sunny';
				break;
			case 'raindance':
			case 'primordialsea':
				if (pokemon.species.id !== 'dustformrainy') forme = 'Dustform-Rainy';
				break;
			case 'hail':
			case 'snow':
				if (pokemon.species.id !== 'dustformsnowy') forme = 'Dustform-Snowy';
				break;
			case 'sandstorm':
			case 'desertgales':
				if (pokemon.species.id !== 'dustformsandy') forme = 'Dustform-Sandy';
				break;
			default:
				if (pokemon.species.id !== 'dustform') forme = 'Dustform';
				break;
			}
			if (pokemon.isActive && forme) {
				pokemon.formeChange(forme, this.effect, false, '[msg]');
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
		shortDesc: "Moves last; immune to Fire and Fighting.",
		onFractionalPriority: -0.1,
		onTryHit(target, source, move) {
			if (move.type === 'Fire' || move.type === 'Fighting') {
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
				if (ally) {
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
		shortDesc: "Recovers items on user's side at 50% or below.",
		onDamage(damage, target, source, effect) {
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
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Rewind",
		rating: 4,
		num: -12,
	},
	//
	weightbreaker: {
		shortDesc: "Double damage if user's weight < target's weight.",
		onModifyDamage(damage, source, target, move) {
			if (source.weighthg < target.weighthg) {
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
		onModifyDamage(damage, source, target, move) {
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
	// End
	
};
