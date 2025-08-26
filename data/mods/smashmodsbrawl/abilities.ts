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
};
