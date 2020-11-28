export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	gravitas: {
		shortDesc: "On switch-in, this Pokémon summons Gravity.",
		onStart(source) {
			this.field.addPseudoWeather('gravity');
		},
		name: "Gravitas",
		rating: 4,
		num: -1001,
	},
	ignite: {
		desc: "This Pokémon's Normal-type moves become Fire-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type, but before Ion Deluge and Electrify's effects.",
		shortDesc: "This Pokémon's Normal-type moves become Fire-type and have 1.2x power.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Fire';
				move.igniteBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.igniteBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		name: "Ignite",
		rating: 4,
		num: -1002,
	},
	downtoearth: {
		shortDesc: "While this Pokémon is active, the effects of terrains are disabled.",
		onStart(source) {
			if (this.field.terrain) {
				this.add('-ability', source, 'Down-to-Earth');
				this.add('-message', `${source.name} suppresses the effects of the terrain!`);
			}
		},
		onAnyTerrainStart(target, source, terrain) {
			const pokemon = this.effectData.target;
			this.add('-ability', pokemon, 'Down-to-Earth');
			this.add('-message', `${pokemon.name} suppresses the effects of the terrain!`);
		},
		onEnd(source) {
			if (this.field.terrain) {
				this.add('-message', `${source.name} is no longer suppressing the effects of the terrain!`);
			}
			source.abilityData.ending = true;
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('mimicry')) {
					for (const target of this.getAllActive()) {
						if (target.hasAbility('downtoearth') && target !== source) {
							this.debug('Down-to-Earth prevents type change');
							return;
						}
					}
					if (this.field.terrain) {
						pokemon.addVolatile('mimicry');
					} else {
						const types = pokemon.baseSpecies.types;
						if (pokemon.getTypes().join() === types.join() || !pokemon.setType(types)) return;
						this.add('-start', pokemon, 'typechange', types.join('/'), '[from] ability: Mimicry');
						this.hint("Transform Mimicry changes you to your original un-transformed types.");
					}
				}
			}
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasItem('electricseed')) {
					if (!pokemon.ignoringItem() && this.field.isTerrain('electricterrain')) {
						for (const target of this.getAllActive()) {
							if (target.hasAbility('downtoearth')) {
								if (target === source) continue;
								this.debug('Down-to-Earth prevents Seed use');
								return;
							}
						}
						pokemon.useItem();
					}
				}
			}
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasItem('psychicseed')) {
					if (!pokemon.ignoringItem() && this.field.isTerrain('psychicterrain')) {
						for (const target of this.getAllActive()) {
							if (target.hasAbility('downtoearth')) {
								if (target === source) continue;
								this.debug('Down-to-Earth prevents Seed use');
								return;
							}
						}
						pokemon.useItem();
					}
				}
			}
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasItem('grassyseed')) {
					if (!pokemon.ignoringItem() && this.field.isTerrain('grassyterrain')) {
						for (const target of this.getAllActive()) {
							if (target.hasAbility('downtoearth')) {
								if (target === source) continue;
								this.debug('Down-to-Earth prevents Seed use');
								return;
							}
						}
						pokemon.useItem();
					}
				}
			}
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasItem('mistyseed')) {
					if (!pokemon.ignoringItem() && this.field.isTerrain('mistyterrain')) {
						for (const target of this.getAllActive()) {
							if (target.hasAbility('downtoearth')) {
								if (target === source) continue;
								this.debug('Down-to-Earth prevents Seed use');
								return;
							}
						}
						pokemon.useItem();
					}
				}
			}
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasItem('acidicseed')) {
					if (!pokemon.ignoringItem() && this.field.isTerrain('acidicterrain')) {
						for (const target of this.getAllActive()) {
							if (target.hasAbility('downtoearth')) {
								if (target === source) continue;
								this.debug('Down-to-Earth prevents Seed use');
								return;
							}
						}
						pokemon.useItem();
					}
				}
			}
		},
		name: "Down-to-Earth",
		rating: 2,
		num: -1003,
	},
	grasspelt: {
		shortDesc: "If Grassy Terrain is active, this Pokemon's Defense is multiplied by 1.5.",
		onModifyDefPriority: 6,
		onModifyDef(pokemon) {
			for (const target of this.getAllActive()) {
				if (target.hasAbility('downtoearth')) {
					this.debug('Down-to-Earth prevents Defense increase');
					return;
				}
			}
			if (this.field.isTerrain('grassyterrain')) return this.chainModify(1.5);
		},
		name: "Grass Pelt",
		rating: 0.5,
		num: 179,
	},
	mimicry: {
		shortDesc: "This Pokemon's type changes to match the Terrain. Type reverts when Terrain ends.",
		onStart(pokemon) {
			for (const target of this.getAllActive()) {
				if (target.hasAbility('downtoearth')) {
					this.debug('Down-to-Earth prevents type change');
					return;
				}
			}
			if (this.field.terrain) {
				pokemon.addVolatile('mimicry');
			} else {
				const types = pokemon.baseSpecies.types;
				if (pokemon.getTypes().join() === types.join() || !pokemon.setType(types)) return;
				this.add('-start', pokemon, 'typechange', types.join('/'), '[from] ability: Mimicry');
				this.hint("Transform Mimicry changes you to your original un-transformed types.");
			}
		},
		onAnyTerrainStart() {
			for (const target of this.getAllActive()) {
				if (target.hasAbility('downtoearth')) {
					this.debug('Down-to-Earth prevents type change');
					return;
				}
			}
			const pokemon = this.effectData.target;
			delete pokemon.volatiles['mimicry'];
			pokemon.addVolatile('mimicry');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['mimicry'];
		},
		effect: {
			onStart(pokemon) {
				let newType;
				switch (this.field.terrain) {
				case 'electricterrain':
					newType = 'Electric';
					break;
				case 'grassyterrain':
					newType = 'Grass';
					break;
				case 'mistyterrain':
					newType = 'Fairy';
					break;
				case 'psychicterrain':
					newType = 'Psychic';
					break;
				case 'acidicterrain':
					newType = 'Poison';
					break;
				}
				if (!newType || pokemon.getTypes().join() === newType || !pokemon.setType(newType)) return;
				this.add('-start', pokemon, 'typechange', newType, '[from] ability: Mimicry');
			},
			onUpdate(pokemon) {
				for (const target of this.getAllActive()) {
					if (target.hasAbility('downtoearth')) {
						this.debug('Down-to-Earth prevents type change');
						const types = pokemon.species.types;
						if (pokemon.getTypes().join() === types.join() || !pokemon.setType(types)) return;
						this.add('-activate', pokemon, 'ability: Mimicry');
						this.add('-end', pokemon, 'typechange', '[silent]');
						pokemon.removeVolatile('mimicry');
					}
				}
				if (!this.field.terrain) {
					const types = pokemon.species.types;
					if (pokemon.getTypes().join() === types.join() || !pokemon.setType(types)) return;
					this.add('-activate', pokemon, 'ability: Mimicry');
					this.add('-end', pokemon, 'typechange', '[silent]');
					pokemon.removeVolatile('mimicry');
				}
			},
		},
		name: "Mimicry",
		rating: 0.5,
		num: 250,
	},
	surgesurfer: {
		shortDesc: "If Electric Terrain is active, this Pokemon's Speed is doubled.",
		onModifySpe(spe) {
			for (const target of this.getAllActive()) {
				if (target.hasAbility('downtoearth')) {
					this.debug('Down-to-Earth prevents Speed increase');
					return;
				}
			}
			if (this.field.isTerrain('electricterrain')) {
				return this.chainModify(2);
			}
		},
		name: "Surge Surfer",
		rating: 2.5,
		num: 207,
	},
	arenarock: {
		desc: "On switch-in, the field becomes Grassy Terrain. This terrain remains in effect until this Ability is no longer active for any Pokémon.",
		shortDesc: "On switch-in, Grassy Terrain begins until this Ability is not active in battle.",
		onStart(source) {
			this.field.clearTerrain();
			this.field.setTerrain('grassyterrain');
		},
		onAnyTerrainStart(target, source, terrain) {
			if (!source.hasAbility('arenarock')) {
				this.field.setTerrain('grassyterrain');
			}
		},
		onEnd(pokemon) {
			if (this.field.terrainData.source !== pokemon || !this.field.isTerrain('grassyterrain')) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('arenarock')) {
					this.field.terrainData.source = target;
					return;
				}
			}
			this.field.clearTerrain();
		},
		name: "Arena Rock",
		rating: 4.5,
		num: -1004,
	},
	sharpstriker: {
		desc: "This Pokémon's ballistic moves have their power multiplied by 1.5. Ballistic moves include Bullet Seed, Octazooka, Barrage, Rock Wrecker, Zap Cannon, Acid Spray, Aura Sphere, Focus Blast, and all moves with Ball or Bomb in their name.",
		shortDesc: "This Pokémon's ballistic moves have 1.5x power (Shadow Ball, Sludge Bomb, Focus Blast, etc).",
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bullet']) {
				return this.chainModify(1.5);
			}
		},
		name: "Sharp Striker",
		rating: 3,
		num: -1005,
	},
	coldsweat: {
		desc: "On switch-in, this Pokémon summons hail. It changes the current weather to rain whenever any opposing Pokémon has an attack that is super effective on this Pokémon or an OHKO move. Counter, Metal Burst, and Mirror Coat count as attacking moves of their respective types, Hidden Power counts as its determined type, and Judgment, Multi-Attack, Natural Gift, Revelation Dance, Techno Blast, and Weather Ball are considered Normal-type moves.",
		shortDesc: "Summons hail on switch-in. Changes weather to rain if the foe has a supereffective or OHKO move.",
		onStart(source) {
			this.field.setWeather('hail');
			for (const target of source.side.foe.active) {
				if (!target || target.fainted) continue;
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.getMove(moveSlot.move);
					if (move.category === 'Status') continue;
					const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
					if (
						this.dex.getImmunity(moveType, source) && this.dex.getEffectiveness(moveType, source) > 0 ||
						move.ohko
					) {
						this.field.setWeather('raindance');
						return;
					}
				}
			}
		},
		onAnySwitchIn(pokemon) {
			const source = this.effectData.target;
			if (pokemon === source) return;
			for (const target of source.side.foe.active) {
				if (!target || target.fainted) continue;
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.getMove(moveSlot.move);
					if (move.category === 'Status') continue;
					const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
					if (
						this.dex.getImmunity(moveType, source) && this.dex.getEffectiveness(moveType, source) > 0 ||
						move.ohko
					) {
						this.field.setWeather('raindance', source);
						return;
					}
				}
			}
		},
		name: "Cold Sweat",
		rating: 4,
		num: -1006,
	},
	trashcompactor: {
		desc: "This Pokémon is immune to all entry hazards. If it lands on any type of entry hazard, it clears the hazard and Stockpiles 1.",
		shortDesc: "Hazard immunity. Clears hazards, Stockpiles 1 if switched in on them.",
		onAfterMega(pokemon) {
			let activated = false;
			for (const sideCondition of ['gmaxsteelsurge', 'spikes', 'stealthrock', 'stickyweb', 'toxicspikes']) {
				if (pokemon.side.getSideCondition(sideCondition) && !this.field.pseudoWeather.stickyresidues) {
					if (!activated) {
						this.add('-activate', pokemon, 'ability: Trash Compactor');
						activated = true;
						this.useMove('stockpile', pokemon);
					}
					pokemon.side.removeSideCondition(sideCondition);
					this.add('-sideend', pokemon.side, this.dex.getEffect(sideCondition).name, '[from] Ability: Trash Compactor', '[of] ' + pokemon);
				}
			}
		},
		name: "Trash Compactor",
		rating: 5,
		num: -1007,
	},
	tempestuous: {
		desc: "When replacing a fainted party member, this Pokémon's Special Defense is boosted, and it charges power to double the power of its Electric-type move on its first turn.",
		shortDesc: "Gains the effect of Charge when replacing a fainted ally.",
		onAfterMega(pokemon) {
			if (pokemon.side.faintedLastTurn) {
				pokemon.addVolatile('charge');
				this.boost({spd: 1}, pokemon);
			}
		},
		onStart(pokemon) {
			if (pokemon.side.faintedThisTurn) {
				pokemon.addVolatile('charge');
				this.boost({spd: 1}, pokemon);
			}
		},
		name: "Tempestuous",
		rating: 3,
		num: -1008,
	},
	sootguard: {
		shortDesc: "This Pokémon receives 3/4 damage from neutrally effective attacks.",
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod = 0) {
				this.debug('Soot Guard neutralize');
				return this.chainModify(0.75);
			}
		},
		name: "Soot Guard",
		rating: 3,
		num: -1009,
	},
	dustscatter: {
		shortDesc: "This Pokémon bypasses immunuties to its spore and powder moves.",
		onModifyMove(move) {
			delete move.flags['powder'];
		},
		name: "Dust Scatter",
		rating: 2,
		num: -1010,
	},
	counterclockwisespiral: {
		desc: "On switch-in, the field becomes Trick Room. This room remains in effect until this Ability is no longer active for any Pokémon.",
		shortDesc: "On switch-in, Trick Room begins until this Ability is not active in battle.",
		onStart(source) {
			this.field.removePseudoWeather('trickroom');
			this.field.addPseudoWeather('trickroom');
		},
		onAnyTryMove(target, source, effect) {
			if (['trickroom'].includes(effect.id)) {
				this.attrLastMove('[still]');
				this.add('cant', this.effectData.target, 'ability: Counter-Clockwise Spiral', effect, '[of] ' + target);
				return false;
			}
		},
		onEnd(pokemon) {
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('counterclockwisespiral')) {
					return;
				}
			}
			this.field.removePseudoWeather('trickroom');
		},
		name: "Counter-Clockwise Spiral",
		rating: 4.5,
		num: -1011,
	},
	nightmareheart: {
		desc: "When this Pokémon faints, the Pokémon that knocked it out is cursed, losing 1/4 of its maximum HP, rounded down, at the end of each turn while it is active. In addition, the Pokémon that knocked it out permanently receives this Ability, which persists even through switching, until it is knocked out and the Ability is passed along again.",
		shortDesc: "If this Pokémon is KOed, the attacker is cursed, then permanently receives this Ability.",
		onFaint(target, source, effect) {
			if (!source || !effect || target.side === source.side) return;
			if (effect.effectType === 'Move' && !effect.isFutureMove) {
				source.addVolatile('curse');
				const bannedAbilities = [
					'battlebond', 'comatose', 'disguise', 'insomnia', 'multitype', 'powerconstruct', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange', 'truant', 'zenmode',
				];
				if (bannedAbilities.includes(source.ability)) {
					return;
				} else {
					source.setAbility('nightmareheart');
					source.baseAbility = 'nightmareheart';
					source.ability = 'nightmareheart';
					this.add('-ability', source, 'Nightmare Heart', '[from] Ability: Nightmare Heart');
				}
			}
		},
		name: "Nightmare Heart",
		rating: 3,
		num: -1012,
	},
	executioner: {
		desc: "When this Pokémon's target has 1/2 or less of its maximum HP, rounded down, its attacking stat is multiplied by 1.5 while using an attack.",
		shortDesc: "This Pokémon's attacking stat is 1.5x when its target has 1/2 or less HP.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (defender.hp <= defender.maxhp / 2) {
				this.debug('Executioner boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (defender.hp <= defender.maxhp / 2) {
				this.debug('Executioner boost');
				return this.chainModify(1.5);
			}
		},
		name: "Executioner",
		rating: 4,
		num: -1013,
	},
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
		name: "Solar Core",
		rating: 2,
		num: -1014,
	},
	twominded: {
		desc: "When this Pokémon's Attack is modified, its Special Attack is modified in the opposite way, and vice versa. The same is true for its Defense and Special Defense.",
		shortDesc: "Applies the opposite of every stat change to the opposite stat (Attack to Special Attack, Defense to Special Defense).",
		onBoost(boost, target, source, effect) {
			if (boost.atk && effect.id !== 'twominded') {
				this.boost({spa: (boost.atk * -1)});
			}
			if (boost.def && effect.id !== 'twominded') {
				this.boost({spd: (boost.def * -1)});
			}
			if (boost.spa && effect.id !== 'twominded') {
				this.boost({atk: (boost.spa * -1)});
			}
			if (boost.spd && effect.id !== 'twominded') {
				this.boost({def: (boost.spd * -1)});
			}
		},
		name: "Two-Minded",
		rating: 4,
		num: -1015,
	},
	adrenaline: {
		desc: "This Pokémon's next move is guaranteed to be a critical hit after it attacks and knocks out another Pokémon.",
		shortDesc: "This Pokémon's next move is guaranteed to be a critical hit after it attacks and KOs another Pokémon.",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				source.addVolatile('laserfocus');
			}
		},
		name: "Adrenaline",
		rating: 3,
		num: -1016,
	},
	ambush: {
		shortDesc: "This Pokémon's attacks are critical hits if the user moves before the target.",
		onModifyCritRatio(critRatio, source, target) {
			if (target.newlySwitched || this.queue.willMove(target)) return 5;
		},
		name: "Ambush",
		rating: 4,
		num: -1017,
	},
	secondwind: {
		desc: "While this Pokémon has more than 1/2 of its maximum HP, its Attack and Special Attack are halved.",
		shortDesc: "While this Pokémon has more than 1/2 of its max HP, its Attack and Sp. Atk are halved.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.hp > pokemon.maxhp / 2) {
				return this.chainModify(0.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, pokemon) {
			if (pokemon.hp > pokemon.maxhp / 2) {
				return this.chainModify(0.5);
			}
		},
		name: "Second Wind",
		rating: -1,
		num: -1018,
	},
	birdofprey: {
		desc: "Prevents adjacent opposing Flying-type Pokémon from choosing to switch out unless they are immune to trapping.",
		shortDesc: "Prevents adjacent Flying-type foes from choosing to switch.",
		onFoeTrapPokemon(pokemon) {
			if (pokemon.hasType('Flying') && this.isAdjacent(pokemon, this.effectData.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectData.target;
			if (!source || !this.isAdjacent(pokemon, source)) return;
			if (!pokemon.knownType || pokemon.hasType('Flying')) {
				pokemon.maybeTrapped = true;
			}
		},
		name: "Bird of Prey",
		rating: 4.5,
		num: -1019,
	},
	showdown: {
		desc: "While this Pokémon is present, all Pokémon are prevented from restoring any HP. During the effect, healing and draining moves are unusable, and Abilities and items that grant healing will not heal the user. Regenerator is also suppressed.",
		shortDesc: "While present, all Pokémon are prevented from healing and Regenerator is suppressed.",
		onStart(source) {
			for (const pokemon of this.getAllActive()) {
				if (!pokemon.volatiles['healblock']) {
					pokemon.addVolatile('healblock');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			if (!pokemon.volatiles['healblock']) {
				pokemon.addVolatile('healblock');
			}
		},
		onEnd(pokemon) {
			for (const target of this.getAllActive()) {
				target.removeVolatile('healblock');
			}
		},
		name: "Showdown",
		rating: 3.5,
		num: -1020,
	},
	regenerator: {
		shortDesc: "This Pokemon restores 1/3 of its maximum HP, rounded down, when it switches out.",
		onSwitchOut(pokemon) {
			for (const target of this.getAllActive()) {
				if (target.hasAbility('showdown')) {
					return;
				}
			}
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		name: "Regenerator",
		rating: 4.5,
		num: 144,
	},
	hardworker: {
		shortDesc: "This Pokémon's HM moves have 1.5x power.",
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (['cut', 'fly', 'surf', 'strength', 'whirlpool', 'waterfall', 'rocksmash', 'dive', 'rockclimb'].includes(move.id)) {
				this.debug('Hard Worker boost');
				return this.chainModify([1.5]);
			}
		},
		name: "Hard Worker",
		rating: 3,
		num: -1021,
	},
	alchemist: {
		desc: "After attacking a poisoned target with a Poison-type move, this Pokémon has an equal chance to cause one of various random effects. Possible effects include: replacing the poison status with paralysis, burn or toxic poison; afflicting the target with confusion, Torment or Encore; choosing two random stats and either boosting or lowering each one; causing the target to use Explosion if its current HP is 25% or less or afflicting it with a Curse if not; or transforming the target into Seismitoad, Ariados or Butterfree until it switches out.",
		shortDesc: "Poison-type move on poisoned target: random chance of 11 different effects.",
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && move.type === 'Poison' && ['psn', 'tox'].includes(target.status)) {
				const r = this.random(11);
				if (r < 1) {
					this.add('-ability', source, 'Alchemist');
					target.setStatus('par', source);
				} else if (r < 2) {
					this.add('-ability', source, 'Alchemist');
					target.setStatus('brn', source);
				} else if (r < 3) {
					if (target.setStatus('tox', source)) {
						this.add('-ability', source, 'Alchemist');
						this.add('-message', `${target.name}'s poison became more severe!`);
					}
				} else if (r < 4) {
					this.add('-ability', source, 'Alchemist');
					if (!target.addVolatile('confusion')) {
						this.add('-message', `${target.name} could not be confused!`);
					}
				} else if (r < 5) {
					this.add('-ability', source, 'Alchemist');
					if (!target.addVolatile('encore')) {
						this.add('-message', `${target.name} could not be affected by Encore!`);
					}
				} else if (r < 6) {
					this.add('-ability', source, 'Alchemist');
					if (!target.addVolatile('torment')) {
						this.add('-message', `${target.name} could not be affected by Torment!`);
					}
				} else if (r < 7) {
					this.add('-ability', source, 'Alchemist');
					let randStat1 = this.random(5);
					let randStat2 = this.random(4);
					if (randStat2 === randStat1) {
						randStat2 = 4;
					}
					if (randStat1 < 1) {
						this.boost({atk: -1}, target, source, null, true);
					} else if (randStat1 < 2) {
						this.boost({def: -1}, target, source, null, true);
					} else if (randStat1 < 3) {
						this.boost({spa: -1}, target, source, null, true);
					} else if (randStat1 < 4) {
						this.boost({spd: -1}, target, source, null, true);
					} else {
						this.boost({spe: -1}, target, source, null, true);
					}
					if (randStat2 < 1) {
						this.boost({atk: -1}, target, source, null, true);
					} else if (randStat2 < 2) {
						this.boost({def: -1}, target, source, null, true);
					} else if (randStat2 < 3) {
						this.boost({spa: -1}, target, source, null, true);
					} else if (randStat2 < 4) {
						this.boost({spd: -1}, target, source, null, true);
					} else {
						this.boost({spe: -1}, target, source, null, true);
					}
				} else if (r < 8) {
					this.add('-ability', source, 'Alchemist');
					let randStat1 = this.random(5);
					let randStat2 = this.random(4);
					if (randStat2 === randStat1) {
						randStat2 = 4;
					}
					if (randStat1 < 1) {
						this.boost({atk: 1}, target, source, null, true);
					} else if (randStat1 < 2) {
						this.boost({def: 1}, target, source, null, true);
					} else if (randStat1 < 3) {
						this.boost({spa: 1}, target, source, null, true);
					} else if (randStat1 < 4) {
						this.boost({spd: 1}, target, source, null, true);
					} else {
						this.boost({spe: 1}, target, source, null, true);
					}
					if (randStat2 < 1) {
						this.boost({atk: -1}, target, source, null, true);
					} else if (randStat2 < 2) {
						this.boost({def: -1}, target, source, null, true);
					} else if (randStat2 < 3) {
						this.boost({spa: -1}, target, source, null, true);
					} else if (randStat2 < 4) {
						this.boost({spd: -1}, target, source, null, true);
					} else {
						this.boost({spe: -1}, target, source, null, true);
					}
				} else if (r < 9) {
					this.add('-ability', source, 'Alchemist');
					let randStat1 = this.random(5);
					let randStat2 = this.random(4);
					if (randStat2 === randStat1) {
						randStat2 = 4;
					}
					if (randStat1 < 1) {
						this.boost({atk: 1}, target, source, null, true);
					} else if (randStat1 < 2) {
						this.boost({def: 1}, target, source, null, true);
					} else if (randStat1 < 3) {
						this.boost({spa: 1}, target, source, null, true);
					} else if (randStat1 < 4) {
						this.boost({spd: 1}, target, source, null, true);
					} else {
						this.boost({spe: 1}, target, source, null, true);
					}
					if (randStat2 < 1) {
						this.boost({atk: 1}, target, source, null, true);
					} else if (randStat2 < 2) {
						this.boost({def: 1}, target, source, null, true);
					} else if (randStat2 < 3) {
						this.boost({spa: 1}, target, source, null, true);
					} else if (randStat2 < 4) {
						this.boost({spd: 1}, target, source, null, true);
					} else {
						this.boost({spe: 1}, target, source, null, true);
					}
				} else if (r < 10) {
					this.add('-ability', source, 'Alchemist');
					if (target.hp >= target.maxhp / 4) {
						this.add('-ability', source, 'Alchemist');
						if (target.addVolatile('curse')) {
							this.add('-message', `${source.name}'s HP was not cut!`);
						} else {
							this.add('-message', `${target.name} could not be cursed!`);
						}
					} else {
						this.add('-ability', source, 'Alchemist');
						this.add('-message', `${target.name} suddenly exploded!`);
						this.useMove('explosion', target);
					}
				} else {
					this.add('-ability', source, 'Alchemist');
					this.add('-message', `${target.name} is being transformed...!?`);
					target.addVolatile('alchemist');
				}
			}
		},
		effect: {
			onStart(pokemon) {
				const randForm = this.random(3);
				if (randForm < 1) {
					this.add('-message', `It became a Seismitoad!`);
					pokemon.formeChange('Seismitoad');
					pokemon.setAbility('poisontouch');
				} else if (randForm < 2) {
					this.add('-message', `It became an Ariados!`);
					pokemon.formeChange('Ariados');
					pokemon.setAbility('insomnia');
				} else {
					this.add('-message', `It became a Butterfree!`);
					pokemon.formeChange('Butterfree');
					pokemon.setAbility('compoundeyes');
				}
			},
			onEnd(pokemon) {
				if (['Seismitoad', 'Ariados', 'Butterfree'].includes(pokemon.species.forme)) {
					pokemon.formeChange(pokemon.species.battleOnly as string);
				}
			},
		},
		name: "Alchemist",
		rating: 3,
		num: -1022,
	},
	blackmail: {
		desc: "After using a physical Dark-type move, this Pokémon permanently replaces its target's Ability with Orderly Target. The Pokémon with Orderly Target cannot knock out Mega Honchkrow - all of its moves will leave Mega Honchkrow with at least 1 HP. Blackmail is permanently replaced with Keen Eye after activating, so it can only affect one target per battle.",
		shortDesc: "Physical Dark moves: permanently replace target's Ability, preventing it from KOing this Pokémon. Permanently becomes Keen Eye after activating once.",
		onSourceHit(target, source, move) {
			if (!move || !target || target.side === source.side) return;
			if (target !== source && move.type === 'Dark' && move.category === 'Physical') {
				target.setAbility('orderlytarget');
				target.baseAbility = 'orderlytarget';
				target.ability = 'orderlytarget';
				this.add('-ability', target, 'Orderly Target', '[from] Ability: Blackmail');
				source.setAbility('keeneye');
				source.baseAbility = 'keeneye';
				source.ability = 'keeneye';
				this.add('-ability', source, 'Keen Eye', '[from] Ability: Blackmail');
			}
		},
		name: "Blackmail",
		rating: 3,
		num: -1023,
	},
	orderlytarget: {
		desc: "If the target of this Pokémon's move is Mega Honchkrow, it survives every hit with at least 1 HP.",
		shortDesc: "If this Pokémon's target is Mega Honchkrow, it survives every hit with at least 1 HP.",
		onDamagePriority: -100,
		onAnyDamage(damage, target, source, effect) {
			if (source === this.effectData.target && target.species.id === 'honchkrowmega' && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', source, 'Orderly Target');
				return target.hp - 1;
			}
		},
		name: "Orderly Target",
		rating: -1,
		num: -1024,
	},
	stickyresidues: {
		desc: "On switch-in, this Pokémon summons sticky residues that prevent hazards from being cleared or moved by Court Change for five turns. Lasts for 8 turns if the user is holding Light Clay. Fails if the effect is already active on the user's side.",
		shortDesc: "On switch-in, this Pokémon summons sticky residues that prevent hazards from being cleared or moved by Court Change for five turns.",
		onStart(source) {
			if (this.field.addPseudoWeather('stickyresidues')) {
				this.add('-message', `${source.name} set up sticky residues on the battlefield!`);
			}
		},
		effect: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onEnd() {
				this.add('-message', `The sticky residues disappeared from the battlefield!`);
			},
		},
		name: "Sticky Residues",
		rating: 3,
		num: -1025,
	},
	disguise: {
		desc: "If this Pokemon is a Mimikyu, the first hit it takes in battle deals 0 neutral damage. Its disguise is then broken, it changes to Busted Form, and it loses 1/8 of its max HP. Confusion damage also breaks the disguise.",
		shortDesc: "(Mimikyu only) The first hit it takes is blocked, and it takes 1/8 HP damage instead.",
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (
				effect && effect.effectType === 'Move' &&
				['mimikyu', 'mimikyutotem'].includes(target.species.id) && !target.transformed
			) {
				this.add('-activate', target, 'ability: Disguise');
				this.effectData.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (!['mimikyu', 'mimikyutotem'].includes(target.species.id) || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (!['mimikyu', 'mimikyutotem'].includes(target.species.id) || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (['mimikyu', 'mimikyutotem'].includes(pokemon.species.id) && this.effectData.busted) {
				const speciesid = pokemon.species.id === 'mimikyutotem' ? 'Mimikyu-Busted-Totem' : 'Mimikyu-Busted';
				pokemon.formeChange(speciesid, this.effect, true);
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon, this.dex.getSpecies(speciesid));
			}
			if (pokemon.canMegaEvo && this.effectData.busted) {
				pokemon.canMegaEvo = 'mimikyubustedmega';
			}
		},
		name: "Disguise",
		rating: 4,
		num: 209,
	},
	spectralanger: {
		shortDesc: "This Pokémon's Attack rises after it uses an attack that is super effective on the target.",
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && move.category !== 'Status' && target.getMoveHitData(move).typeMod > 0) {
				this.boost({atk: 1}, source);
			}
		},
		name: "Spectral Anger",
		rating: 3,
		num: -1026,
	},
	diamonddust: {
		shortDesc: "During hail, this Pokémon is immune to all Rock-type attacks and Stealth Rock.",
		onDamage(damage, target, source, effect) {
			if (effect && effect.id === 'stealthrock' && this.field.isWeather('hail')) {
				return false;
			}
		},
		onTryHit(target, source, move) {
			if (move.type === 'Rock' && this.field.isWeather('hail')) {
				this.add('-immune', target, '[from] ability: Diamond Dust');
				return null;
			}
		},
		name: "Diamond Dust",
		rating: 3,
		num: -1027,
	},
	prehistoricrage: {
		shortDesc: "This Pokémon can hit Fairy-types with Dragon-type moves.",
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Dragon'] = true;
			}
		},
		name: "Prehistoric Rage",
		rating: 3,
		num: -1028,
	},
	lusterswap: {
		shortDesc: "On entry, this Pokémon's type changes to match its first move that's super effective against an adjacent opponent.",
		onStart(pokemon) {
			const possibleTargets = pokemon.side.foe.active.filter(foeActive => foeActive && this.isAdjacent(pokemon, foeActive));
			while (possibleTargets.length) {
				let rand = 0;
				if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
				const target = possibleTargets[rand];
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.getMove(moveSlot.move);
					if (move.category === 'Status') continue;
					const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
					if (
						this.dex.getImmunity(moveType, pokemon) && this.dex.getEffectiveness(moveType, target) > 0
					) {
						this.add('-ability', pokemon, 'Luster Swap');
						if (!pokemon.setType(moveType)) return false;
						this.add('-message', `${pokemon.name} changed its type to match its ${move.name}!`);
						this.add('-start', pokemon, 'typechange', moveType);
						return;
					}
				}
				this.add('-ability', pokemon, 'Luster Swap');
				this.add('-message', `${pokemon.name} can't hit ${target.name} super effectively!`);
				return;
			}
		},
		name: "Luster Swap",
		rating: 3,
		num: -1029,
	},
	acidicsurge: {
		desc: "On switch-in, this Pokémon summons Acidic Terrain for 5 turns. During the effect, the power of Poison-type attacks made by grounded Pokémon is multiplied by 1.3, and grounded Steel-types are not immune to Poison-type damage. Steel-type Pokémon are still immune to being poisoned and badly poisoned, except by Pokémon with Corrosion. Camouflage transforms the user into a Poison-type, Nature Power becomes Sludge Bomb, and Secret Power has a 30% chance to cause poison. Lasts for 8 turns if the user is holding a Terrain Extender (such as through Skill Swap).",
		shortDesc: "5 turns. Grounded: +Poison power, Steel not immune to Poison type.",
		onStart(source) {
			this.field.setTerrain('acidicterrain');
		},
		name: "Acidic Surge",
		rating: 4,
		num: -1030,
	},
	flowergift: {
		onStart(pokemon) {
			delete this.effectData.forme;
		},
		onUpdate(pokemon) {
			if (!pokemon.isActive || pokemon.baseSpecies.baseSpecies !== 'Cherrim' || pokemon.transformed) return;
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
			if (this.effectData.target.baseSpecies.baseSpecies !== 'Cherrim' && this.effectData.target.species.name !== 'Meganium-Mega') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onAllyModifySpDPriority: 4,
		onAllyModifySpD(spd, pokemon) {
			if (this.effectData.target.baseSpecies.baseSpecies !== 'Cherrim' && this.effectData.target.species.name !== 'Meganium-Mega') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		name: "Flower Gift",
		rating: 1,
		num: 122,
	},
	savage: {
		desc: "This Pokémon's biting moves become multi-hit moves that hit two to five times. Has a 1/3 chance to hit two or three times, and a 1/6 chance to hit four or five times. Each hit's damage is cut to one third.",
		shortDesc: "This Pokémon's biting moves hit two to five times. Each hit's damage is cut to one third.",
		onPrepareHit(source, target, move) {
			if (move.multihit) return;
			if (move.flags['bite'] && !move.isZ && !move.isMax) {
				move.multihit = [2, 5];
			}
		},
		onBasePowerPriority: 7,
		onBasePower(basePower, pokemon, target, move) {
			if (move.flags['bite']) return this.chainModify([0x0555, 0x1000]);
		},
		name: "Savage",
		rating: 3.5,
		num: -1031,
	},
}
