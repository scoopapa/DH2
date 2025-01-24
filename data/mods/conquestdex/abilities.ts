/*

Ratings and how they work:

-1: Detrimental
	  An ability that severely harms the user.
	ex. Defeatist, Slow Start

 0: Useless
	  An ability with no overall benefit in a singles battle.
	ex. Color Change, Plus

 1: Ineffective
	  An ability that has minimal effect or is only useful in niche situations.
	ex. Light Metal, Suction Cups

 2: Useful
	  An ability that can be generally useful.
	ex. Flame Body, Overcoat

 3: Effective
	  An ability with a strong effect on the user or foe.
	ex. Chlorophyll, Sturdy

 4: Very useful
	  One of the more popular abilities. It requires minimal support to be effective.
	ex. Adaptability, Magic Bounce

 5: Essential
	  The sort of ability that defines metagames.
	ex. Imposter, Shadow Tag

*/

export const Abilities: {[abilityid: string]: AbilityData} = {
	sprint: {
		onModifySpe(spe, pokemon) {
			return this.chainModify(spe, 1.5);
			},
			name: "Sprint",
			shortDesc: "This pokemon's speed increased by 50%.",
			rating: 3,
			num: 1000,
	},
	aquaboost: {
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Water' || attacker !== this.effectState.target) {
				this.debug('Aqua Boost boost');
				return this.chainModify(1.5);
			}
		},
		name: "Aqua Boost",
		shortDesc: "Boosts allies water type move damage by 50%.",
		rating: 3.5,
		num: 1003,
	},
	blackhole: {
		onFoeTrapPokemon(pokemon) {
			if (!pokemon.hasAbility('blackhole') && pokemon.isAdjacent(this.effectState.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source)) return;
			if (!pokemon.hasAbility('blackhole')) {
				pokemon.maybeTrapped = true;
			}
		},
		name: "Black Hole",
		shortDesc: "Prevents foes from choosing to switch unless they also have this Ability.",
		rating: 5,
		num: 1001,
	},
	calming: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Calming');
		},
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
			if (target.status !== 'slp' && this.randomChance(1, 10)) {
					this.add('-activate', pokemon, 'ability: Calming');
					target.setStatus('slp', target, pokemon);
				}
			}
		},
		name: "Calming",
		shortDesc: "While active, Opponent has a 10% chance to fall asleep unless immune.",
		rating: 5,
		num: 1002,
	},
	climber: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (defender.type === 'Flying' || defender.hasAbility('levitate')) {
				this.debug('Climber boost');
				return this.chainModify(1.5)
			}
		},	
		name: "Climber",
		shortDesc: "This pokemon's attack is multipled by 1.5 against pokemon with ground immunity(excluding Earh Eater).",
		rating: 3.5,
		num: 1004,
	},
	confidence: {
		onStart(pokemon) {
			for (const ally of pokemon.adjacentAllies()) {
				this.boost({def: 1}, ally, pokemon);
			}
		},
		name: "Confidence",
		shortDesc: "On switch-in, boost allies' defense by 1 stage.",
		rating: 0,
		num: 1005,
	},
	deepsleep: {
		onResidual(pokemon) {
			if (pokemon.status === 'slp') {
				this.heal(pokemon.baseMaxhp / 8);
			}
		},
		name: "Deep Sleep",
		shortDesc: "This pokemon is healed by 1/8th of its max HP while asleep.",
		rating: 0,
		num: 1006,
	},
	explode: {
		onFaint(pokemon) {
				this.actions.useMove('explosion', this.effectState.target);
			},
	        name: "Explode",
			shortDesc: "When this pokemon faints, it uses Explosion.",
		    rating: 3,
		    num: 1007,
	},
	frighten: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Frighten', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spe: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Frighten",
		shortDesc: "On switch-in, this pokemon lowers the speed of opponents by 1 stage.",
		rating: 3.5,
		num: 1008,
	},
	frostbite: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(1, 10)) {
					source.trySetStatus('frz', target);
				}
			}
		},
		name: "Frostbite",
		shortDesc: "Pokemon making contact have a 10% chance to be frozen.",
		rating: 2,
		num: 1009,
	},
	instinct: {
		onModifyAccuracyPriority: 10,
		onModifyAccuracy(accuracy, target, source, move) {
			if (move.category !== 'Status'  && typeof accuracy === 'number' && (this.randomChance(1, 10))) {
				this.debug('Instinct - Evading attacks');
				this.add('-activate', target, 'ability: Instinct');
				return 0;
			}
		},
		flags: {breakable: 1},
		name: "Instinct",
		shortDesc: "This pokemon has a 10% chance to evade all attacks.",
		rating: 3.5,
		num: 1010,
	},
	interference: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Interference', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({acc: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Interference",
		shortDesc: "On switch-in, lowers accuracy of foes by 1 stage.",
		rating: 3.5,
		num: 1011,
	},
	jaggededge: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		name: "Jagged Edge",
		shortDesc: "Pokemon making contact lose 1/8th of their max hp.",
		rating: 2.5,
		num: 1012,
	},
	lifeforce: {
		name: "Life Force",
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 8);
		},
		rating: 2.5,
		shortDesc: "This pokemon heals 1/8th of its max hp at the end of its turn.",
		num: 1013,
	},
	perception: {
		onTryHit(target, source, move) {
			if (target !== source && target.isAlly(source) && move.category !== 'Status') {
				this.add('-activate', target, 'ability: Perception');
				return null
			}
		},
		flags: {breakable: 1},
		name: "Perception",
		shortDesc: "This pokemon evades allies attacks.",
		rating: 0,
		num: 140,
	},
	waverider: {
		onModifySpe(spe, pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		name: "Wave Rider",
		shortDesc: "If Rain Dance is active, this pokemon's speed is 1.5x",
		rating: 3,
		num: 33,
	},
	flameboost: {
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Fire' || attacker !== this.effectState.target) {
				this.debug('Flame Boost boost');
				return this.chainModify(1.5);
			}
		},
		name: "Flame Boost",
		shortDesc: "Boost allies fire type attacks by 50% while active.",
		rating: 3.5,
		num: 1023,
	},
	shackle: {
		onAfterMove(target, source, move) {
			if (!move || !source) return;
			if (move.category !== 'Status') {
				let activated = false;
				for (const target of this.effectState.target.side.foe.active) {
					if (!target || !target.isAdjacent(this.effectState.target)) continue;
					if (!activated) {
						this.add('-ability', this.effectState.target, 'Shackle', 'boost');
						activated = true;
					}
					if ((target.volatiles['substitute'])) {
						this.add('-immune', target);
					} else {
						this.boost({spe: -1}, target, this.effectState.target, null, true);
					}
				}
			}
		},
		name: "Shackle",
		shortDesc: "This pokemon's attacks lower opponent's speed by 1 stage.",
		rating: 3.5,
		num: 1033,
	},
	fightingspirit: {
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.activeMoveActions <= 6) return;
			if (pokemon.hp <= pokemon.maxhp / 3) {
			this.heal(pokemon.maxhp);
			this.boost({atk: 1}, pokemon, pokemon);
			}
		},
		name: "Fighting Spirit",
		shortDesc: "After 5 turns, at 1/3 or less max HP; heals max HP and boosts this pokemon's attack by 1 stage.",
		rating: 3,
		num: 1039,
	},
	dodge: {
		onModifyAccuracyPriority: 10,
		onModifyAccuracy(accuracy, target, source, move) {
			if (move.category !== 'Status'  && typeof accuracy === 'number' && move.flags['contact'] && (this.randomChance(1, 10))) {
				this.debug('Dodge - Evading direct attacks');
				this.add('-activate', target, 'ability: Dodge');
				this.boost({spe: -1, def: -1,}, source, source);
				return 0;
			}
		},
		flags: {breakable: 1},
		name: "Dodge",
		rating: 3.5,
		shortDesc: "This Pokemon has a 10% chance to evade contact moves and lower opponent's defense and speed by 1 stage if succesful",
		num: 1060,
	},
	tenacity: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
					source.setStatus('flinch', target);
			}
		},
		name: "Tenacity",
		shortDesc: "(Uncoded) Causes opponent to flinch upon contact",
		rating: 0.5,
		num: 56,
	},
	sponge: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (this.randomChance(3, 10)) {
					this.damage(target.baseMaxhp / 16, target, pokemon);
				}
			}
		},
		name: "Sponge",
		shortDesc: "30% chance to deal damage equal to 1/16th of the opponents max HP to the opponent",
		rating: 1.5,
		num: 1230,
	},
	parry: {
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (
				effect && effect.effectType === 'Move' &&
				this.randomChance(1, 10) && (effect.flags['contact'])
			) { this.add('-activate', target, 'ability: Parry');
				this.damage(source.baseMaxhp / 16, source, target);
				return 0;
			}
		},
		flags: {breakable: 1},
		name: "Parry",
		shortDesc: "10% chance to block damage from contact moves and deal 1/16th of opponent's max HP in damage to the opponent.",
		rating: 3.5,
		num: 1010,
	},
	daze: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Daze');
		},
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
			if (target.status !== 'slp' && this.randomChance(1, 10)) {
					this.add('-activate', pokemon, 'ability: Daze');
					target.setStatus('slp', target, pokemon);
					target.statusState.time = 4;
					target.statusState.startTime = 4;
				}
			}
		},
		name: "Daze",
		shortDesc: "While ability active, 10% chance to make opponent fall asleep for 3 turns",
		rating: 5,
		num: 1052,
	},
	lullaby: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Lullaby');
		},
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
			if (target.status !== 'slp' && this.randomChance(1, 10)) {
					this.add('-activate', pokemon, 'ability: Lullaby');
					target.setStatus('slp', target, pokemon);
				}
			}
		},
		name: "Lullaby",
		shortDesc: "While ability active, 10% chance to make opponent fall asleep.",
		rating: 5,
		num: 1062,
	},
	grasscloak: {
		onModifyDefPriority: 6,
		onModifyDef(pokemon) {
			if (this.field.isTerrain('grassyterrain')) return this.chainModify(1.5);
		},
		flags: {breakable: 1},
		name: "Grass Cloak",
		shortDesc: "This pokemon has 1.5x def on grassy terrain.",
		rating: 0.5,
		num: 179,
	},
	gulp: {
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.baseMaxhp / 16);
			}
		},
		name: "Gulp",
		shortDesc: "While Rain Dance is active, heals pokemon by 1/16th of its max HP.",
		rating: 1.5,
		num: 44,
	},
	herbivore: {
		onSourceTryHeal(target, source, effect) {
			if (this.field.isTerrain('grassyterrain'))
				this.heal(target.baseMaxhp / 16);
		},
		name: "Herbivore",
		shortDesc: "This pokemon heals an additional 1/16th of its max HP on grassy terrain.",
		rating: 1.5,
		num: 44,
	},
	warmblanket: {
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.heal(target.baseMaxhp / 16);
			}
		},
		name: "Warm Blanket",
		shortDesc: "While Sunny Day is active, heals pokemon by 1/16th of its max HP.",
		rating: 1.5,
		num: 44,
	},
	pride: {
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-activate', target, 'ability: Pride');
				this.boost({atk: 1, def: 1,}, target, target);
			}
		},
		name: "Pride",
		shortDesc: "When targeted by a status move, this pokemon raises its attack and defense by 1 stage.",
		rating: 2,
		num: 17,
	},
	lastbastion: {
			onStart(pokemon) {
			if (pokemon.side.totalFainted === 5) {
				this.add('-activate', pokemon, 'ability: Last Bastion');
				this.boost({atk: 2, def: 2,}, pokemon, pokemon);
				}
			},
			name: "Last Bastion",
			shortDesc: "When last unfainted pokemon on the team, boosts attack and defense by 2 stages.",
			rating: 3,
			num: 1100,
	},
	lunchbox: {
		onAfterMoveSecondary(target, source, move) {
			for (const target of source.adjacentFoes()) {
			const lastAttackedBy = target.getLastAttackedBy();
			if (lastAttackedBy) return;
			if (!lastAttackedBy) {
				this.heal(source.baseMaxhp / 16, source, source);
			}
			}
		},
		name: "Lunchbox",
		shortDesc: "When this pokemon does not attack its opponent, heals pokemon by 1/16th of its max HP.",
		rating: 3,
		num: 1271,
	},
	omnipotence: {
		onDamage(damage, target, source, effect) {
			if (effect && effect.id === 'stealthrock') {
				return false;
			}
		},
		onTryHit(target, source, move) {
			if (move.type === 'Rock' && !target.activeTurns) {
				this.add('-immune', target, '[from] ability: Mountaineer');
				return null;
			}
		},
		onModifyAccuracyPriority: 10,
		onModifyAccuracy(accuracy, target, source, move) {
			if (move.category !== 'Status'  && typeof accuracy === 'number' && (this.randomChance(1, 10))) {
				this.debug('Omnipotence - Evading attacks');
				this.add('-activate', target, 'ability: Omnipotence');
				return 0;
			}
		},
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 8);
		},
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Normal'] = true;
			}
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.category !== 'Status')
				move.type = '???';
				move.typeChangerBoosted = this.effect;
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify(1.5);
		},
		name: "Omnipotence",
		shortDesc: "Pokemon has effects of Mountaineer, Life Force, Instinct, and does typeless damage with a 50% damage boost.",
		rating: 5,
		num: 1300,
		},	
		vanguard: {
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon) {
			let boosted = false;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (this.queue.willMove(target)) {
					boosted = true;
					break;
				}
			}
			if (boosted) {
				this.debug('Vanguard boost');
				this.add('-ability', pokemon, 'Vanguard');
				return this.chainModify(1.5);
			}
		},
		name: "Vanguard",
		shortDesc: "This pokemon's attacks have 1.5x power when it is the first to move in a turn.",
		rating: 2.5,
		num: 148,
	},
	nomad: {
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (pokemon.activeMoveActions === 1) {
				this.add('-ability', pokemon, 'Nomad');
				this.chainModify([4506, 4096]);
			} else if (pokemon.activeMoveActions === 2) {
					this.add('-ability', pokemon, 'Nomad');
					this.chainModify([4916, 4096]);
				} else if (pokemon.activeMoveActions === 3) {
					this.add('-ability', pokemon, 'Nomad');
					this.chainModify([5325, 4096]);
					} else if (pokemon.activeMoveActions === 4) {
						this.add('-ability', pokemon, 'Nomad');
						this.chainModify([5735, 4096]);
					} else if (pokemon.activeMoveActions === 5) {
						this.add('-ability', pokemon, 'Nomad');
						this.chainModify([6144, 4096]);
					} else if (pokemon.activeMoveActions === 6) {
						this.add('-ability', pokemon, 'Nomad');
						this.chainModify([6554, 4096]);
					} else if (pokemon.activeMoveActions === 7) {
						this.add('-ability', pokemon, 'Nomad');
						this.chainModify([6964, 4096]);
					} else if (pokemon.activeMoveActions === 8) {
						this.add('-ability', pokemon, 'Nomad');
						this.chainModify([7373, 4096]);
					} else if (pokemon.activeMoveActions === 9) {
						this.add('-ability', pokemon, 'Nomad');
						this.chainModify([7783, 4096])
					} else if (pokemon.activeMoveActions >= 10) {
						this.add('-ability', pokemon, 'Nomad');
						this.chainModify([8192, 4096])
					}
		},
		name: "Nomad",
		shortDesc: "Damage increases by 10% eveytime this pokemon attacks and completes a turn. Max 2x.",
		rating: 4,
		num: 2935,
	},
	conqueror: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({spe: length, atk: length, def: length}, source);
			}
		},
		name: "Conqueror",
		shortDesc: "This pokemon raises its attack, defense, and speed by 1 stage upon KOing another pokemon with an attack.",
		rating: 5,
		num: 293,
	},
	celebrate: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({spe: length}, source);
			}
		},
		name: "Celebrate",
		shortDesc: "This pokemon raises it speed by 1 stage upon KOing another pokemon with an attack.",
		rating: 3,
		num: 153,
	},
	powernap: {
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 3) {
				this.actions.useMove('rest', this.effectState.target);
			}
		},
		name: "Power Nap",
		rating: 3,
		shortDesc: "This pokemon uses rest if it is at 1/3 or less max HP.",
		num: 1503,
	},
	highrise: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (defender.type === 'Ground') {
				this.debug('High Rise boost');
				return this.chainModify(1.5)
			}
		},	
		name: "High Rise",
		shortDesc: "This pokemon has a 50% attack boost against ground types.",
		rating: 3.5,
		num: 1004,
	},
	hotblooded: {
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'sunnyday' || effect.id === 'desolateland' || effect.id === 'sandstorm') {
				this.heal(target.baseMaxhp / 8);
			}
		},
		name: "Hot Blooded",
		shortDesc: "While Sunny Day or Sandstorm is active, heals pokemon by 1/8th of its max HP.",
		rating: 1.5,
		num: 44,
	},
	sandpit: {
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'sandstorm') {
				this.heal(target.baseMaxhp / 16);
			}
		},
		name: "Sandpit",
		shortDesc: "While Sandstorm is active, heals pokemon by 1/16th of its max HP.",
		rating: 1.5,
		num: 44,
	},
	skater: {
		onModifySpe(spe, pokemon) {
			if (['snow'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		name: "Skater",
		shortDesc: "While Snow is active, this pokemon's speed is 1.5x.",
		rating: 3,
		num: 33,
	},
	shadowdash: {
		onModifyAtkPriority: 5,
		onModifyAtk(spe, attacker, defender, move) {
			if (defender.type === 'Ghost') {
				this.debug('Shadow Dash boost');
				return this.chainModify(1.5)
			}
		},	
		name: "Shadow Dash",
		shortDesc: "This pokemon has a 50% attack boost against Ghost types",
		rating: 3.5,
		num: 1004,
	},
	runup: {
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (pokemon.activeMoveActions === 1) {
				this.add('-ability', pokemon, 'Run Up');
				this.chainModify([4506, 4096]);
			} else if (pokemon.activeMoveActions === 2) {
					this.add('-ability', pokemon, 'Run Up');
					this.chainModify([4916, 4096]);
				} else if (pokemon.activeMoveActions === 3) {
					this.add('-ability', pokemon, 'Run Up');
					this.chainModify([5325, 4096]);
					} else if (pokemon.activeMoveActions === 4) {
						this.add('-ability', pokemon, 'Run Up');
						this.chainModify([5735, 4096]);
					} else if (pokemon.activeMoveActions >= 5) {
						this.add('-ability', pokemon, 'Run Up');
						this.chainModify([6144, 4096]);
					}
		},
		name: "Run Up",
		shortDesc: "Damage increases by 10% eveytime this pokemon attacks and completes a turn. Max 1.5x",
		rating: 4,
		num: 2936,
	},
	hero: {
			onStart(pokemon) {
			if (pokemon.side.totalFainted === 4) {
				this.add('-activate', pokemon, 'ability: Hero');
				this.boost({atk: 1, def: 1,}, pokemon, pokemon);
				}
			},
			name: "Hero",
			shortDesc: "When second to last unfainted pokemon on the team, boosts attack and defense by 1 stages.",
			rating: 3,
			num: 1100,
	},
};