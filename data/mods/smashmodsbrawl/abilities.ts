export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	illusionvaporemons: {
		onBeforeSwitchIn(pokemon) {
			pokemon.illusion = null;
			// yes, you can Illusion an active pokemon but only if it's to your right
			for (let i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
				const possibleTarget = pokemon.side.pokemon[i];
				if (!possibleTarget.fainted) {
					// If Ogerpon is in the last slot while the Illusion Pokemon is Terastallized
					// Illusion will not disguise as anything
					if (!pokemon.terastallized || possibleTarget.species.baseSpecies !== 'Ogerpon') {
						pokemon.illusion = possibleTarget;
					}
					break;
				}
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.illusion) {
				this.debug('Illusion weaken');
				return this.chainModify(0.5);
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (target.illusion) {
				this.singleEvent('End', this.dex.abilities.get('Illusion'), target.abilityState, target, source, move);
			}
		},
		onEnd(pokemon) {
			if (pokemon.illusion) {
				this.debug('illusion cleared');
				pokemon.illusion = null;
				const details = pokemon.species.name + (pokemon.level === 100 ? '' : ', L' + pokemon.level) +
					(pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
				this.add('replace', pokemon, details);
				this.add('-end', pokemon, 'Illusion');
			}
		},
		onFaint(pokemon) {
			pokemon.illusion = null;
		},
		flags: {breakable: 1},
		name: "Illusion (VaporeMons)",
		rating: 4.5,
		num: 149,
		shortDesc: "This Pokemon appears as the last Pokemon in the party until it takes direct damage, which is halved while disguised.",
	},
	justthebirds: {
		onSourceDamagingHit(damage, target, source, move) {
			target.addVolatile('justthebirds');
		},
		condition: {
			noCopy: true,
			onStart(target) {
				this.add('-start', target, 'Bird', '[silent]');
				const targetSide = target.side;
				if (targetSide.getSideCondition('stealthrock')) {
					if (target.hasItem('heavydutyboots')) return;
					const typeMod = this.clampIntRange(target.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
					this.damage(target.maxhp * Math.pow(2, typeMod) / 8);
					this.add('-message', `Pointed stones dug into ${target.name}!`);
				}
			},
		},
		flags: {},
		name: "just the birds",
		shortDesc: "When this Pokemon damages a target, they gain the Bird volatile.",
	},
	protostasis: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if (pokemon.transformed) return;
			// Protostasis is not affected by Utility Umbrella
			if (this.field.isWeather('snow')) {
				pokemon.addVolatile('protostasis');
			} else if (!pokemon.volatiles['protostasis']?.fromBooster) {
				pokemon.removeVolatile('protostasis');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['protostasis'];
			this.add('-end', pokemon, 'Protostasis', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protostasis', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protostasis');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protostasis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Protostasis atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Protostasis def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Protostasis spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Protostasis spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Protostasis spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protostasis');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Protostasis",
		rating: 3,
		shortDesc: "Snow active or Booster Energy used: highest stat is 1.3x, or 1.5x if Speed.",
	},
	spiritofgiving: {
		desc: "On switch-in, every Pokémon in this Pokémon's party regains the item it started with, even if the item was a popped Air Balloon, if the item was picked up by a Pokémon with the Pickup Ability, or the item was lost to Bug Bite, Covet, Incinerate, Knock Off, Pluck, or Thief. It doesn't work if the Pokémon is already holding something else.",
		shortDesc: "Restores the party's used or removed items on switch-in.",
		name: "Spirit of Giving",
		onStart(pokemon) {
			this.hint(`${pokemon.name} was submitted to Megas for All by Hematite!`);
			const side = pokemon.side;
			let activated = false;
			for (const ally of side.pokemon) {
				if (ally.item) continue;
				if ((ally as any).lostItemForDelibird) {
					const item = (ally as any).lostItemForDelibird;
					if (ally.setItem(item)) {
						if (!activated) {
							this.add('-ability', pokemon, 'Spirit of Giving');
						}
						activated = true;
						this.add('-item', ally, this.dex.items.get(item), '[from] Ability: Spirit of Giving');
					}
				}
			}
		},
		rating: 4,
		num: -36,
	},
	rebelsblade: {
		shortDesc: "This Pokemon's slicing moves have x1.5 power and a 30% chance to inflict poisoning.",
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['slicing']) {
				this.debug('Rebels Blade boost');
				return this.chainModify(1.5);
			}
		},
		onModifyMove(move) {
			if (!move || !move.flags['slicing'] || move.target === 'self') return;
			(move.secondaries ||= []).push({
				chance: 30,
				status: 'psn',
				ability: this.dex.abilities.get('rebelsblade'),
			});
		},
		flags: {},
		name: "Rebel's Blade",
		rating: 3,
	},
	regainpatience: {
		shortDesc: "Berserk + Regenerator",
		onDamage(damage, target, source, effect) {
			this.effectState.checkedBerserk = !!(effect.effectType !== "Move" || effect.multihit || effect.negateSecondary
															|| (effect.hasSheerForce && source.hasAbility(['overwhelming','sheerforce','forceofnature','sandwrath'])));
		},
		onTryEatItem(item) {
			const healingItems = [
				'aguavberry', 'enigmaberry', 'figyberry', 'iapapaberry', 'magoberry', 'sitrusberry', 'wikiberry', 'oranberry', 'berryjuice',
			];
			return (!healingItems.includes(item.id) || this.effectState.checkedBerserk);
		},
		onAfterMoveSecondary(target, source, move) {
			this.effectState.checkedBerserk = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			const threshold = target.maxhp*.5;
			if (target.hp <= threshold && target.hp + damage > threshold) {
				this.boost({spa: 1}, target, target);
			}
		},
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		flags: {},
		name: "Regain Patience",
		rating: 3,
	},
	specterate: {
		name: "Specterate",
		shortDesc: "This Pokemon's Normal-type moves become Ghost type and have 1.2x power.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Ghost';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
	},
	transience: {
		onSourceModifyDamage(damage, source, target, move) {
			if (this.field.pseudoWeather.trickroom) {
				this.debug('Transience weaken');
				return this.chainModify(0.75);
			}
		},
		name: "Transience",
		shortDesc: "Under Trick Room, this Pokemon takes 0.75x damage from attacks.",
		rating: 3.5,
		num: -15,
	},
	gravitationalpull: {
		onStart(source) {
			this.add('-ability', source, 'Gravitational Pull');
			this.field.addPseudoWeather('gravity', source, source.ability);
		},
		name: "Gravitational Pull",
		shortDesc: "On switch-in, this Pokemon summons Gravity.",
		rating: 4,
	},
	grasspeltage: {
		onStart(pokemon) {
			if (
				!this.field.setTerrain('grassyterrain') &&
				this.field.isTerrain('grassyterrain') && pokemon.isGrounded()
			) {
				this.add('-activate', pokemon, 'ability: Grass Pelt');
			}
		},
		onTerrainChange(pokemon) {
			if (pokemon === this.field.weatherState.source) return;
			if (this.field.isTerrain('grassyterrain') && pokemon.isGrounded()) {
				this.add('-activate', pokemon, 'ability: Grass Pelt');
			}
		},
		onModifyDefPriority: 5,
		onModifyDef(def, attacker, defender, move) {
			if (this.field.isTerrain('grassyterrain') && attacker.isGrounded()) {
				this.debug('Grass Pelt boost');
				return this.chainModify([5461, 4096]);
			}
		},
		shortDesc: "On switch-in, summons Grassy Terrain. During Grassy Terrain, Def is 1.3333x.",
		flags: {breakable: 1},
		name: "Grass Pelt (AGE)",
		rating: 0.5,
		num: 179,
	},
	violentabandon: {
		onAfterUseItem(item, pokemon) {
			if (pokemon !== this.effectState.target && pokemon.baseSpecies.baseSpecies !== 'Gyarados' || pokemon.transformed) return;
				if (pokemon.species.forme !== 'Mega') {
					pokemon.formeChange('Gyarados-Mega', this.effect, true);
		      }
		},
		onTakeItem(item, pokemon) {
			if (pokemon !== this.effectState.target && pokemon.baseSpecies.baseSpecies !== 'Gyarados' || pokemon.transformed) return;
				if (pokemon.species.forme !== 'Mega') {
					pokemon.formeChange('Gyarados-Mega', this.effect, true);
			   }
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Violent Abandon",
		shortDesc: "This Pokemon transforms into Mega Gyarados whenever its item is used or lost.",
		rating: 3.5,
		num: 84,
	},
	rewind: {
		name: "Rewind",
		shortDesc: "When brought to 50% HP or less, restores lost items on user's side.",
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		rating: 4,
		num: -18,
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
						for (const ally of pokemon.side.active) {
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
				for (const ally of pokemon.side.active) {
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
	squall: {
		shortDesc: "+1 Atk if hit by a Fire or Ice move or Tailwind begins; Fire & Ice immunity.",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && (move.type === 'Ice' || move.type === 'Fire')) {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Squall');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (target === this.effectState.target || target.side !== source.side) return;
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.boost({atk: 1}, this.effectState.target);
			}
		},
		onAllySideConditionStart(target, source, sideCondition) {
			const pokemon = this.effectState.target;
			if (sideCondition.id === 'tailwind') {
				this.boost({atk: 1}, pokemon, pokemon);
			}
		},
		flags: {breakable: 1},
		name: "Squall",
		rating: 4,
	},
	doomer: {
		onBasePower(basePower, pokemon, target, move) {
			if (move.flags['futuremove']) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Doomer",
		shortDesc: "This Pokemon's future moves have 1.2x power.",
	},
	railgunner: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.id.endsWith('beam')) {
				return this.chainModify([5325, 4096]);
			}
		},
		flags: {},
		name: "Railgunner",
		shortDesc: "This Pokemon's beam moves have 1.3x power.",
	},
	fumigation: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			const poisongas = this.dex.getActiveMove('poisongas');
			this.actions.useMove(poisongas, target, source);
		},
		flags: {},
		name: "Fumigation",
		shortDesc: "When this Pokemon is damaged by a move, it uses Poison Gas against the attacker.",
	},
	starguard: {
		onDamage(damage, target, source, effect) {
			if (this.field.isWeather('meteorshower') && effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		flags: {},
		name: "Star Guard",
		shortDesc: "If Meteor Shower is active, this Pokemon is immune to indirect damage.",
	},
	hauntingmelody: {
		onModifyMove(move, pokemon, target) {
			console.log("target is " + target);
			if (move.flags['sound']) {
				if (target.hasType('Ghost')) return false;
				if (!target.addType('Ghost')) return false;
				this.add('-start', target, 'typeadd', 'Ghost', '[from] move: Trick-or-Treat');
			}
		},
		flags: {},
		name: "Haunting Melody",
		shortDesc: "The user's sound moves add ghost type to the target.",
		rating: 1.5,
		num: -37,
	},
	fairfight: {
		name: "Fair Fight",
		onStart(source) {
			let activated = false;
			for (const pokemon of source.foes()) {
				if (!activated) {
					this.add('-ability', source, 'Fair Fight');
					this.add('-message', `${source.name} wants to have a fair fight!`);
				}
				activated = true;
				if (!pokemon.volatiles['fairfight']) {
					pokemon.addVolatile('fairfight');
				}
				if (!source.volatiles['fairfight']) {
					source.addVolatile('fairfight');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			const source = this.effectState.target;
			if (pokemon === source) return;
			for (const target of source.foes()) {
				if (!target.volatiles['fairfight']) {
					target.addVolatile('fairfight');
				}
			}
		},
		onEnd(pokemon) {
			for (const target of pokemon.foes()) {
				target.removeVolatile('fairfight');
			}
		},
		condition: {
			onTryBoost(boost, target, source, effect) {
				let showMsg = false;
				let i: BoostID;
				for (i in boost) {
					if (boost[i]! < 0 || boost[i]! > 0) {
						delete boost[i];
						showMsg = true;
					}
				}
				if (showMsg && !(effect as ActiveMove).secondaries) {
					this.add('-activate', target, 'ability: Fair Fight');
					this.add('-message', `${target.name} can't change its stats!`);
				}
			},
		},
		flags: {},
		shortDesc: "While this Pokemon is active, no stat changes can occur.",
	},
	icebody: {
		onWeather(target, source, effect) {
			if (effect.id === 'hail' || effect.id === 'snow') {
				this.heal(target.baseMaxhp / 32);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		name: "Ice Body",
		rating: 1,
		num: 115,
	},
	multitasker: {
		name: "Multitasker",
		flags: {},
		shortDesc: "placeholder until i get the code.",
	},
	scrappymr: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
		},
		shortDesc: "This Pokemon can hit Ghost types with Normal- and Fighting-type moves.",
		flags: {},
		name: "Scrappy-MR",
		rating: 3,
		num: 113,
	},
	innerfocusmr: {
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		shortDesc: "This Pokemon cannot be made to flinch.",
		flags: {breakable: 1},
		name: "Inner Focus-MR",
		rating: 1,
		num: 39,
	},
	parentalbond: {
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.selfdestruct || move.multihit) return;
			if ([
				'endeavor', 'seismictoss', 'psywave', 'nightshade', 'sonicboom', 'dragonrage',
				'superfang', 'naturesmadness', 'bide', 'counter', 'mirrorcoat', 'metalburst',
			].includes(move.id)) return;
			if (!move.spreadHit && !move.isZ && !move.isMax) {
				move.multihit = 2;
				move.multihitType = 'parentalbond';
			}
		},
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'parentalbond' && move.id === 'secretpower' && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},
		name: "Parental Bond",
		rating: 4.5,
		shortDesc: "This Pokemon's damaging moves hit twice. The second hit has its damage quartered.",
		num: 184,
	},
	insectarmor: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Bug') {
				this.debug('Insect Armor boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Bug') {
				this.debug('Insect Armor boost');
				return this.chainModify(1.5);
			}
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fighting' || move.type === 'Grass' || move.type === 'Ground') {
				this.debug('Insect Armor weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fighting' || move.type === 'Grass' || move.type === 'Ground') {
				this.debug('Insect Armor weaken');
				return this.chainModify(0.5);
			}
		},
		name: "Insect Armor",
		shortDesc: "User gains STAB on Bug moves and also gains Bug-type resistances.",
	},
	stalwartglacemons: {
		onModifyMovePriority: 1,
		onModifyMove(move) {
			// most of the implementation is in Battle#getTarget
			move.tracksTarget = move.target !== 'scripted';
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (pokemon.hp <= target.hp) return this.chainModify(1.25);
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.hp <= source.hp) return this.chainModify(0.75);
		},
		shortDesc: "Moves used by/against this Pokemon is modified by 1.25x/0.75x if the target has more HP.",
		flags: {},
		name: "Stalwart (GlaceMons)",
		rating: 0,
		num: 242,
	},
	cottondownglacemons: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Cotton Down', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spe: -1}, target, pokemon, null, true);
				}
			}
		},
		flags: {},
		name: "Cotton Down (GlaceMons)",
		rating: 2,
		num: 238,
	},
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
	healervaporemons: {
		name: "Healer (VaporeMons)",
	   onFaint(pokemon) {
			pokemon.side.addSlotCondition(pokemon, 'healer');
	   },
	   condition: {
			onSwap(target) {
				 if (!target.fainted) {
					  const source = this.effectState.source;
					  const damage = this.heal(target.baseMaxhp / 2, target, target);
					  if (damage) this.add('-heal', target, target.getHealth, '[from] ability: Healer', '[of] ' + this.effectState.source);
					  target.side.removeSlotCondition(target, 'healer');
				 }
			},
	   },
		flags: {},
		rating: 3,
		shortDesc: "On faint, the next Pokemon sent out heals 50% of its max HP.",
		num: 131,
	},
};
