export const Abilities: {[k: string]: ModdedAbilityData} = {
	powerofalchemy: {
		inherit: true,
		onAllyFaint(ally) {
			let pokemon = this.effectData.target;
			if (!pokemon.hp) return;
			let isAbility = pokemon.ability === 'powerofalchemy';
			/**@type {string[]} */
			let possibleAbilities = [ally.ability];
			if (ally.m.innates) possibleAbilities = possibleAbilities.concat(ally.m.innates);
			let bannedAbilities = ['battlebond', 'comatose', 'disguise', 'flowergift', 'forecast', 'illusion', 'imposter', 'multitype', 'powerconstruct', 'powerofalchemy', 'receiver', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange', 'trace', 'wonderguard', 'zenmode'];
			bannedAbilities.push(pokemon.ability);
			if (pokemon.m.innates) bannedAbilities = bannedAbilities.concat(pokemon.m.innates);
			possibleAbilities = possibleAbilities.filter(val => !bannedAbilities.includes(val));
			if (!possibleAbilities.length) return;
			let ability = this.dex.getAbility(possibleAbilities[this.random(possibleAbilities.length)]);
			this.add('-ability', pokemon, ability, '[from] ability: Power of Alchemy', '[of] ' + ally);
			if (isAbility) {
				pokemon.setAbility(ability);
			} else {
				pokemon.removeVolatile("abilitypowerofalchemy");
				pokemon.addVolatile("ability:" + ability, pokemon);
			}
		},
	},
	receiver: {
		inherit: true,
		onAllyFaint(ally) {
			let pokemon = this.effectData.target;
			if (!pokemon.hp) return;
			let isAbility = pokemon.ability === 'receiver';
			/**@type {string[]} */
			let possibleAbilities = [ally.ability];
			if (ally.m.innates) possibleAbilities = possibleAbilities.concat(ally.m.innates);
			let bannedAbilities = ['battlebond', 'comatose', 'disguise', 'flowergift', 'forecast', 'illusion', 'imposter', 'multitype', 'powerconstruct', 'powerofalchemy', 'receiver', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange', 'trace', 'wonderguard', 'zenmode'];
			bannedAbilities.push(pokemon.ability);
			if (pokemon.m.innates) bannedAbilities = bannedAbilities.concat(pokemon.m.innates);
			possibleAbilities = possibleAbilities.filter(val => !bannedAbilities.includes(val));
			if (!possibleAbilities.length) return;
			let ability = this.dex.getAbility(possibleAbilities[this.random(possibleAbilities.length)]);
			this.add('-ability', pokemon, ability, '[from] ability: Receiver', '[of] ' + ally);
			if (isAbility) {
				pokemon.setAbility(ability);
			} else {
				pokemon.removeVolatile("ability:receiver");
				pokemon.addVolatile("ability:" + ability, pokemon);
			}
		},
	},
	trace: {
		inherit: true,
		onUpdate(pokemon) {
			if (!pokemon.isStarted) return;
			let isAbility = pokemon.ability === 'trace';
			/**@type {Pokemon[]} */
			let possibleTargets = [];
			for (let target of pokemon.side.foe.active) {
				if (target && !target.fainted) {
					possibleTargets.push(target);
				}
			}
			while (possibleTargets.length) {
				let rand = this.random(possibleTargets.length);
				let target = possibleTargets[rand];
				/**@type {string[]} */
				let possibleAbilities = [target.ability];
				if (target.m.innates) possibleAbilities = possibleAbilities.concat(target.m.innates);
				let bannedAbilities = ['battlebond', 'comatose', 'disguise', 'flowergift', 'forecast', 'illusion', 'imposter', 'multitype', 'powerconstruct', 'powerofalchemy', 'receiver', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange', 'trace', 'zenmode'];
				bannedAbilities.push(pokemon.ability);
				if (pokemon.m.innates) bannedAbilities = bannedAbilities.concat(pokemon.m.innates);
				possibleAbilities = possibleAbilities.filter(val => !bannedAbilities.includes(val));
				if (!possibleAbilities.length) {
					possibleTargets.splice(rand, 1);
					continue;
				}
				let ability = this.dex.getAbility(this.sample(possibleAbilities));
				this.add('-ability', pokemon, ability, '[from] ability: Trace', '[of] ' + target);
				if (isAbility) {
					pokemon.setAbility(ability);
				} else {
					pokemon.removeVolatile("ability:trace");
					pokemon.addVolatile("ability:" + ability, pokemon);
				}
				return;
			}
		},
	},
	angler: {
		desc: "If the user is hit by a Water-type move, they take 0.25x damage from it and the opponent recieves recoil equal to the damage dealt.",
		shortDesc: "The damage from Water-type attacks against this Pokemon is partially reflected.",
		onSourceBasePowerPriority: 18,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Water') {
				return this.chainModify(0.25);
			}
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water') {
				this.damage(target.getUndynamaxedHP(damage)/2, source, target);
			}
		},
		name: "Angler",
		rating: 2,
		num: 1.1,
	},

  edible: {
		desc: "The user takes 2x damage from Bite moves, but 0.5x damage from Punch moves.",
		shortDesc: "This Pokemon takes 1/2 damage from punch moves, 2x damage from bite moves.",
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.flags['bite']) mod *= 2;
			if (move.flags['punch']) mod /= 2;
			return this.chainModify(mod);
		},
		name: "Edible",
		rating: 3.5,
		num: 2.1,
	},

	coloredrocks: {
		desc: "This Pokemon's Ground-type moves become Fairy-type moves and have their power multiplied by 1.2. Additionally, Stealth Rock will become Fairy-type.",
		shortDesc: "This Pokemon's Ground-type moves become Fairy type and have 1.2x power.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Ground' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Fairy';
				move.aerilateBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.aerilateBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		name: "Colored Rocks",
		rating: 4,
		num: 3.1,
	},
 
  darkedge: {
		desc: "The user's extreme edge gets tarnished when hit by a Fairy-type move.",
		shortDesc: "Fairy weakness + damaged in Sun.",
		onSourceBasePowerPriority: 18,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Fairy') {
				return this.chainModify(2);
			}
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'sunnyday') {
				this.damage(target.baseMaxhp / 8, target, target);
			} else if (effect.id === 'desolateland') {
				this.damage(target.baseMaxhp, target, target);
			}
		},
		name: "Dark Edge",
		rating: 2,
		num: 4.1,
	},
	
  darkaura: {
		desc: "The user has so much edge that the Sun damages it.",
		shortDesc: "The user loses some of its HP in the Sun.",
      onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'sunnyday') {
				this.damage(target.baseMaxhp / 8, target, target);
			} else if (effect.id === 'desolateland') {
				this.damage(target.baseMaxhp, target, target);
			}
		},
		name: "Dark Aura",
		rating: 2,
		num: 5.1,
	},

  camobody: {
		desc: "The user gains a typing if Terrain is active.",
		shortDesc: "The user gains a typing if Terrain is active.", 
  		onUpdate(pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				if (pokemon.hasType('Electric')) return false;
			  if (!pokemon.addType('Electric')) return false;
				this.add('-start', pokemon, 'typeadd', 'Electric', '[from] ability: Camo Body');
			} else if (this.field.isTerrain('grassyterrain')) {
				if (pokemon.hasType('Grass')) return false;
			  if (!pokemon.addType('Grass')) return false;
				this.add('-start', pokemon, 'typeadd', 'Grass', '[from] ability: Camo Body');
			} else if (this.field.isTerrain('mistyterrain')) {
				if (pokemon.hasType('Fairy')) return false;
			  if (!pokemon.addType('Fairy')) return false;
				this.add('-start', pokemon, 'typeadd', 'Fairy', '[from] ability: Camo Body');
      }},    
		name: "Camo Body",
		rating: 2,
		num: 6.1,
	},

	windproof: {
		desc: "This Pokemon is immune to Flying-type moves.",
		shortDesc: "This Pokemon is immune to Flying-type moves.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Flying') {
					this.add('-immune', target, '[from] ability: Windproof');
				}
				return null;
		},
		name: "Windproof",
		rating: 3,
		num: 6.1,
	},

deteriorate: {
		desc: "This Pokemon loses 1/6th of its max HP each turn.",
		shortDesc: "This Pokemon loses 1/6th of its max HP each turn.",
   	onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.damage(pokemon.baseMaxhp / 6, pokemon, pokemon);
			}
		},
		name: "Deteriorate",
		rating: -1,
		num: 7.1,
	},

adaptation: {
		desc: "This Pokemon's first moveslot determines its secondary typing.",
		shortDesc: "This Pokemon first moveslot determines its secondary typing.",
		onStart (pokemon) {
			const type = this.dex.getMove(pokemon.moveSlots[0].id).type;
			if (pokemon.hasType(type) || !pokemon.setType(type)) return false;
			this.add('-start', pokemon, 'typeadd', type, '[from] ability: Adaptation');
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} 
				else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Adaptation",
		rating: 4,
		num: 8.1,
	},

disappearance: {
		desc: "This Pokemon forces the target to switch out when hit under 50% of its max health.",
		shortDesc: "This Pokemon forces out the target if under 50% of its max HP.",
  		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.add('-activate', target, 'ability: Disappearance');
        source.forceSwitchFlag = true;
      }
		},
		name: "Disappearance",
		rating: 4,
		num: 9.1,
	},

	hypeoverload: {
		desc: "The user damages the target by 1/3 of its max HP upon fainting.",
		shortDesc: "Damages target by 1/3rd max HP upon fainting.",
		name: "Hype Overload",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp) {
				this.damage(source.baseMaxhp / 3, source, target);
			}
		},
		rating: 2.5,
		num: 10.1,
	},

	prevailingwind: {
		shortDesc: "On switchin, this Pokemon summons Tailwind.",
			onStart: function(source) {
			this.useMove("Tailwind", source);
		  },  
    name: "Prevailing Wind",
    rating: 2.5,
		num: 11.1,
    },

	lightbringer: {
		shortDesc: "If Sun is up, the user replenishes it.",
		onStart(source) {
			if (['sunnyday'].includes(source.effectiveWeather())) {
        this.field.clearWeather();
        this.field.setWeather('sunnyday');
			  }
      },
		name: "Lightbringer",
		rating: 4,
		num: 12.1,
	},

	radioactivegas: {
		shortDesc: "Removes all active Pokemons' items.",
		onStart(target, pokemon, source) {
		const item = target.takeItem(source);
      for (const target of this.getAllActive()) {
			if (item) {
				this.add(target, item.name, '[from] ability: Radioactive Gas', '[of] ' + source);
			}}
    },
		name: "Radioactive Gas",
		rating: 4,
		num: 13.1,
	},

  deathscall: {
			onStart(pokemon) {
				this.add('-fieldactivate', 'move: Fairy Lock');
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			  },
    		onFoeTrapPokemon(pokemon) {
			if (!pokemon.hasAbility('shadowtag') && this.isAdjacent(pokemon, this.effectData.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectData.target;
			if (!source || !this.isAdjacent(pokemon, source)) return;
			if (!pokemon.hasAbility('shadowtag')) {
				pokemon.maybeTrapped = true;
			}
		},

		name: "Death's Call",
		rating: 4,
		num: 14.1,
  },
  
	contaminate: {
		shortDesc: "This Pokemon's Water-type moves have a 20% chance of badly poisoning.",
		onModifyMovePriority: 1,
			onModifyMove(move) {
			if (move.type === 'Water') {      
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 20,
				status: 'tox',
			});
      }
},
		name: "Contaminate",
		rating: 2,
		num: 15.1,
	},

	flametrap: {
		shortDesc: "This Pokemon's Fire-type moves trap the target.",
		onModifyMovePriority: 1,
			onModifyMove(move) {
			if (move.type === 'Fire') {      
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 100,
    		volatileStatus: 'partiallytrapped',
			});
      }
},
		name: "Flame Trap",
		rating: 2,
		num: 16.1,
	},

  rageboost: {
  		shortDesc: "Drops the opponents' stats if they boost.",
      onAnyModifyBoost(boosts, target, pokemon, source, effect) {
			let statsLowered = false;
			let i: BoostsName;
			for (i in boosts) {
				if (boosts[i]! > 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
          this.boost({
            atk: -1,
            def: -1,
            spa: -1,
            spd: -1,
            spe: -1,});
    }},
        name: "Rage Boost",
        rating: 2,
        num: 17.1,
    },

	poweroftwo: {
		shortDesc: "If this Pokemon has two moves or less, its power boosts by 1.5x",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (attacker.moveSlots.length < 3) {
				this.debug('Power of Two boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (attacker.moveSlots.length < 3) {
				this.debug('Power of Two boost');
        return this.chainModify(1.5);
			}
		},
		name: "Power of Two",
		rating: 2,
		num: 18.1,
	},

	voltdiversion: {
		shortDesc: "Applies a 1.3x boost to Electric attacks, but loses HP to do so.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				return this.chainModify([0x14CC, 0x1000]);
      }
		},	
  	onAfterMoveSecondarySelf(source, target, move) {
			if (source && source !== target && move && move.category !== 'Status' && move.type === 'Electric') {
				this.damage(source.baseMaxhp / 10, source, source, this.dex.getAbility('Volt Diversion'));
			}
    },
  	name: "Volt Diversion",
		rating: 2,
		num: 19.1,
	},

	roulettespin: {
		shortDesc: "On switchin, this Pokemon uses Metronome.",
			onStart: function(source) {
			this.useMove("roulettewheel", source);
		  },  
    name: "Roulette Spin",
    rating: 2.5,
		num: 20.1,
    },  
  
 	slightofhand: {
		shortDesc: "This Pokemon's Status moves have priority raised by 1, but Dark types are immune.",
		onPrepareHit(pokemon, source, target, move) {
			if (basePowerAfterMultiplier <= 60) return priority + 1;
		},
	name: "Slight of Hand",
		rating: 4,
		num: 21.1,
	},

	fortification: {
		desc: "This Pokemon's Attack and Defense are raised by 1 stage at the end of each full turn it has been on the field.",
		shortDesc: "This Pokemon's Attack and Defense are raised 1 stage at the end of each full turn on the field.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.boost({atk: 1, def: 1});
			}
		},
		name: "Fortification",
		rating: 4.5,
		num: 22.1,
	},   

	fragile: {
		shortDesc: "The user, Egg, transforms when hit.",
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
      if (
				effect && effect.effectType === 'Move' &&
				['eggg'].includes(target.species.id) && !target.transformed
			) {
				this.add('-activate', target, 'ability: Fragile');
        this.effectData.busted = true;
				return 0;
			}   
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (!['eggg', 'eggg-cracked'].includes(target.species.id) || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (!['eggg', 'eggg-cracked'].includes(target.species.id) || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (['eggg'].includes(pokemon.species.id) && this.effectData.busted) {
				const speciesid = pokemon.species.id === 'eggg-cracked';
				pokemon.formeChange(speciesid, this.effect, true);
			}
		},
		name: "Fragile",
		rating: 3.5,
		num: 23.1,
	},

	bagoftricks: {
		shortDesc: "The user and target swap items when the user is sent out.",
		onTryImmunity(target) {
			return !target.hasAbility('stickyhold');
		},
		onHit(target, source, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
			const yourItem = target.takeItem(source);
			const myItem = source.takeItem();
			if (target.item || source.item || (!yourItem && !myItem)) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				return false;
			}
			if (
				(myItem && !this.singleEvent('TakeItem', myItem, source.itemData, target, source, move, myItem)) ||
				(yourItem && !this.singleEvent('TakeItem', yourItem, target.itemData, source, target, move, yourItem))
			) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				return false;
			}
			this.add('-activate', source, 'move: Trick', '[of] ' + target);
			if (myItem) {
				target.setItem(myItem);
				this.add('-item', target, myItem, '[from] move: Trick');
			} else {
				this.add('-enditem', target, yourItem, '[silent]', '[from] move: Trick');
			}
			if (yourItem) {
				source.setItem(yourItem);
				this.add('-item', source, yourItem, '[from] move: Trick');
			} else {
				this.add('-enditem', source, myItem, '[silent]', '[from] move: Trick');
			}
			}
		},
		name: "Bag of Tricks",
		rating: 3.5,
		num: 24.1,
	},
	sleightofhand: {
		shortDesc: "This Pokemon's punch moves have their priority increased by 1.",
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.flags['punch']) return priority + 1;
		},
		name: "Sleight of Hand",
		rating: 3.5,
		num: 25.1,
	},
};