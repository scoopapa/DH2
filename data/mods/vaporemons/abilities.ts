export const Abilities: {[k: string]: ModdedAbilityData} = {
	slushrush: {
		onModifySpe(spe, pokemon) {
			if (['hail', 'snow'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		inherit: true,
		shortDesc: "If Snow/Hail is active, this Pokemon's Speed is doubled.",
	},
	snowwarning: {
		onStart(source) {
			this.field.setWeather('snow');
		},
		inherit: true,
		shortDesc: "On switch-in, this Pokemon summons Snow.",
	},
	icebody: {
		onWeather(target, source, effect) {
			if (effect.id === 'hail' || effect.id === 'snow') {
				this.heal(target.baseMaxhp / 16);
			}
		},
		inherit: true,
		shortDesc: "If Snow/Hail is active, this Pokemon heals 1/16 of its max HP each turn.",
	},
	battlebond: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect?.effectType !== 'Move') return;
			if (source.abilityState.battleBondTriggered) return;
			if (source.species.id === 'greninja' && source.hp && !source.transformed && source.side.foePokemonLeft()) {
				this.add('-activate', source, 'ability: Battle Bond');
				this.boost({atk: 1, spa: 1, spe: 1}, source, source, this.effect);
				source.abilityState.battleBondTriggered = true;
			}
		},
		isNonstandard: null,
		shortDesc: "After KOing a Pokemon: raises Attack, Sp. Atk, Speed by 1 stage. Once per battle.",
		isPermanent: true,
		name: "Battle Bond",
		rating: 3.5,
		num: 210,
	},
	dauntlessshield: {
		onStart(pokemon) {
			if (this.effectData.shieldBoost) return;
			if (this.boost({def: 1}, pokemon)) {
				this.effectData.shieldBoost = true;
			}
		},
		name: "Dauntless Shield",
		shortDesc: "On switch-in, this Pokemon's Defense is raised by 1 stage. Once per battle.",
		rating: 3.5,
		num: 235,
	},
	intrepidsword: {
		onStart(pokemon) {
			if (this.effectData.swordBoost) return;
			if (this.boost({atk: 1}, pokemon)) {
				this.effectData.swordBoost = true;
			}
		},
		name: "Intrepid Sword",
		shortDesc: "On switch-in, this Pokemon's Attack is raised by 1 stage. Once per battle.",
		rating: 4,
		num: 234,
	},
	libero: {
		onPrepareHit(source, target, move) {
			if (this.effectData.libero) return;
			if (move.hasBounced || move.isFutureMove || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.effectData.libero = true;
				this.add('-start', source, 'typechange', type, '[from] ability: Libero');
			}
		},
		onSwitchIn() {
			delete this.effectData.libero;
		},
		name: "Libero",
		shortDesc: "This Pokemon's type changes to the type of the move it is using. Once per switch-in.",
		rating: 4,
		num: 236,
	},
	protean: {
		onPrepareHit(source, target, move) {
			if (this.effectData.protean) return;
			if (move.hasBounced || move.isFutureMove || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.effectData.protean = true;
				this.add('-start', source, 'typechange', type, '[from] ability: Protean');
			}
		},
		onSwitchIn(pokemon) {
			delete this.effectData.protean;
		},
		name: "Protean",
		shortDesc: "This Pokemon's type changes to the type of the move it is using. Once per switch-in.",
		rating: 4,
		num: 168,
	},
	transistor: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Transistor boost');
				return this.chainModify(1.3);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Transistor boost');
				return this.chainModify(1.3);
			}
		},
		name: "Transistor",
		shortDesc: "This Pokemon's offensive stat is multiplied by 1.3 while using an Electric-type attack.",
		rating: 3.5,
		num: 262,
	},
	//----------Gen 9 Abilities-----------//
	angershell: {
		onDamage(damage, target, source, effect) {
			if (
				effect.effectType === "Move" &&
				!effect.multihit &&
				(!effect.negateSecondary && !(effect.hasSheerForce && source.hasAbility('sheerforce')))
			) {
				this.effectData.checkedAngerShell = false;
			} else {
				this.effectData.checkedAngerShell = true;
			}
		},
		onTryEatItem(item) {
			const healingItems = [
				'aguavberry', 'enigmaberry', 'figyberry', 'iapapaberry', 'magoberry', 'sitrusberry', 'wikiberry', 'oranberry', 'berryjuice',
			];
			if (healingItems.includes(item.id)) {
				return this.effectData.checkedAngerShell;
			}
			return true;
		},
		onAfterMoveSecondary(target, source, move) {
			this.effectData.checkedAngerShell = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({atk: 1, spa: 1, spe: 1, def: -1, spd: -1}, target, target);
			}
		},
		name: "Anger Shell",
		shortDesc: "At 1/2 or less of this Pokemon's max HP: +1 Atk, Sp. Atk, Spe, and -1 Def, Sp. Def.",
		rating: 4,
		num: 271,
	},
	armortail: {
		onFoeTryMove(target, source, move) {
			const targetAllExceptions = ['perishsong', 'flowershield', 'rototiller'];
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}

			const armorTailHolder = this.effectData.target;
			if ((source.isAlly(armorTailHolder) || move.target === 'all') && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('cant', armorTailHolder, 'ability: Armor Tail', move, '[of] ' + target);
				return false;
			}
		},
		isBreakable: true,
		name: "Armor Tail",
		shortDesc: "This Pokemon and its allies are protected from opposing priority moves.",
		rating: 2.5,
		num: 296,
	},
	beadsofruin: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Beads of Ruin');
		},
		onAnyModifySpD(spd, target, source, move) {
			const abilityHolder = this.effectData.target;
			if (target.hasAbility('Beads of Ruin')) return;
			if (!move.ruinedSpD?.hasAbility('Beads of Ruin')) move.ruinedSpD = abilityHolder;
			if (move.ruinedSpD !== abilityHolder) return;
			this.debug('Beads of Ruin SpD drop');
			return this.chainModify(0.75);
		},
		name: "Beads of Ruin",
		shortDesc: "Active Pokemon without this Ability have their Special Defense multiplied by 0.75.",
		rating: 4.5,
		num: 284,
	},
	commander: {
		onUpdate(pokemon) {
			const ally = pokemon.allies()[0];
			if (!ally || pokemon.baseSpecies.baseSpecies !== 'Tatsugiri' || ally.baseSpecies.baseSpecies !== 'Dondozo') {
				// Handle any edge cases
				if (pokemon.getVolatile('commanding')) pokemon.removeVolatile('commanding');
				return;
			}

			if (!pokemon.getVolatile('commanding')) {
				// If Dondozo already was commanded this fails
				if (ally.getVolatile('commanded')) return;
				// Cancel all actions this turn for pokemon if applicable
				this.queue.cancelAction(pokemon);
				// Add volatiles to both pokemon
				pokemon.addVolatile('commanding');
				ally.addVolatile('commanded', pokemon);
				// Continued in conditions.ts in the volatiles
			} else {
				if (!ally.fainted) return;
				pokemon.removeVolatile('commanding');
			}
		},
		isPermanent: true,
		name: "Commander",
		shortDesc: "If ally is Dondozo: this Pokemon cannot act or be hit, +2 to all Dondozo's stats.",
		rating: 0,
		num: 279,
	},
	costar: {
		onStart(pokemon) {
			const ally = pokemon.allies()[0];
			if (!ally) return;

			let i: BoostName;
			for (i in ally.boosts) {
				pokemon.boosts[i] = ally.boosts[i];
			}
			const volatilesToCopy = ['focusenergy', 'gmaxchistrike', 'laserfocus'];
			for (const volatile of volatilesToCopy) {
				if (ally.volatiles[volatile]) {
					pokemon.addVolatile(volatile);
					if (volatile === 'gmaxchistrike') pokemon.volatiles[volatile].layers = ally.volatiles[volatile].layers;
				} else {
					pokemon.removeVolatile(volatile);
				}
			}
			this.add('-copyboost', pokemon, ally, '[from] ability: Costar');
		},
		name: "Costar",
		shortDesc: "On switch-in, this Pokemon copies all of its ally's stat stage changes.",
		rating: 0,
		num: 294,
	},
	cudchew: {
		onEatItem(item, pokemon) {
			if (item.isBerry && pokemon.addVolatile('cudchew')) {
				pokemon.volatiles['cudchew'].berry = item;
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['cudchew'];
		},
		condition: {
			noCopy: true,
			duration: 2,
			onRestart() {
				this.effectData.duration = 2;
			},
			onResidualOrder: 28,
			onResidualSubOrder: 2,
			onEnd(pokemon) {
				if (pokemon.hp) {
					const item = this.effectData.berry;
					this.add('-activate', pokemon, 'ability: Cud Chew');
					this.add('-enditem', pokemon, item.name, '[eat]');
					if (this.singleEvent('Eat', item, null, pokemon, null, null)) {
						this.runEvent('EatItem', pokemon, null, null, item);
					}
					if (item.onEat) pokemon.ateBerry = true;
				}
			},
		},
		name: "Cud Chew",
		shortDesc: "If this Pokemon eats a Berry, it will eat that Berry again at the end of the next turn.",
		rating: 2,
		num: 291,
	},
	eartheater: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ground') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Earth Eater');
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Earth Eater",
		shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Ground moves; Ground immunity.",
		rating: 3.5,
		num: 297,
	},
	electromorphosis: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			target.addVolatile('charge');
		},
		name: "Electromorphosis",
		shortDesc: "This Pokemon gains the Charge effect when it takes a hit from an attack.",
		rating: 2,
		num: 280,
	},
	goodasgold: {
		onTryHit(target, source, move) {
			if (move.category === 'Status' && target !== source) {
				this.add('-immune', target, '[from] ability: Good as Gold');
				return null;
			}
		},
		isBreakable: true,
		name: "Good as Gold",
		shortDesc: "This Pokemon is immune to Status moves.",
		rating: 5,
		num: 283,
	},
	guarddog: {
		onDragOutPriority: 1,
		onDragOut(pokemon) {
			this.add('-activate', pokemon, 'ability: Guard Dog');
			return null;
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.boost({atk: 1}, target, target, null, false, true);
			}
		},
		name: "Guard Dog",
		shortDesc: "Immune to Intimidate. Intimidated: +1 Attack. Cannot be forced to switch out.",
		rating: 2,
		num: 275,
	},
	hadronengine: {
		onStart(pokemon) {
			if (!this.field.setTerrain('electricterrain') && this.field.isTerrain('electricterrain')) {
				this.add('-activate', pokemon, 'ability: Hadron Engine');
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (this.field.isTerrain('electricterrain')) {
				this.debug('Hadron Engine boost');
				return this.chainModify([5461, 4096]);
			}
		},
		name: "Hadron Engine",
		shortDesc: "On switch-in, summons Electric Terrain. During Electric Terrain, Sp. Atk is 1.3333x.",
		rating: 4.5,
		num: 289,
	},
	lingeringaroma: {
		onDamagingHit(damage, target, source, move) {
			const sourceAbility = source.getAbility();
			if (sourceAbility.isPermanent || sourceAbility.id === 'lingeringaroma') {
				return;
			}
			if (this.checkMoveMakesContact(move, source, target, !source.isAlly(target))) {
				const oldAbility = source.setAbility('lingeringaroma', target);
				if (oldAbility) {
					this.add('-activate', target, 'ability: Lingering Aroma', this.dex.getAbility(oldAbility).name, '[of] ' + source);
				}
			}
		},
		name: "Lingering Aroma",
		shortDesc: "Making contact with this Pokemon has the attacker's Ability become Lingering Aroma.",
		rating: 2,
		num: 268,
	},
	myceliummight: {
		onFractionalPriorityPriority: -1,
		onFractionalPriority(priority, pokemon, target, move) {
			if (move.category === 'Status') {
				return -0.1;
			}
		},
		onModifyMove(move) {
			if (move.category === 'Status') {
				move.ignoreAbility = true;
			}
		},
		name: "Mycelium Might",
		shortDesc: "This Pokemon's Status moves go last in their priority bracket and ignore Abilities.",
		rating: 2,
		num: 298,
	},
	opportunist: {
		onFoeAfterBoost(boost, target, source, effect) {
			if (effect?.name === 'Opportunist' || effect?.name === 'Mirror Herb') return;
			const pokemon = this.effectData.target;
			const positiveBoosts: Partial<BoostsTable> = {};
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! > 0) {
					positiveBoosts[i] = boost[i];
				}
			}
			if (Object.keys(positiveBoosts).length < 1) return;
			this.boost(positiveBoosts, pokemon);
		},
		name: "Opportunist",
		shortDesc: "When an opposing Pokemon has a stat stage raised, this Pokemon copies the effect.",
		rating: 3,
		num: 290,
	},
	orichalcumpulse: {
		onStart(pokemon) {
			if (
				!this.field.setWeather('sunnyday') &&
				['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())
			) {
				this.add('-activate', pokemon, 'ability: Orichalcum Pulse');
			}
		},
		onAnyWeatherStart(target, source) {
			const pokemon = this.effectData.target;
			if (pokemon === source) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				this.add('-activate', pokemon, 'ability: Orichalcum Pulse');
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				this.debug('Orichalcum boost');
				return this.chainModify([5325, 4096]);
			}
		},
		name: "Orichalcum Pulse",
		shortDesc: "On switch-in, summons Sunny Day. During Sunny Day, Attack is 1.3333x.",
		rating: 4,
		num: 288,
	},
	protosynthesis: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectData, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday') && !pokemon.volatiles['protosynthesis']) {
				pokemon.addVolatile('protosynthesis');
			} else if (pokemon.hasItem('boosterenergy') && !this.field.isWeather('sunnyday') && pokemon.useItem()) {
				pokemon.removeVolatile('protosynthesis');
				pokemon.addVolatile('protosynthesis', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['protosynthesis'].fromBooster = true;
			} else if (!pokemon.volatiles['protosynthesis']?.fromBooster && !this.field.isWeather('sunnyday')) {
				pokemon.removeVolatile('protosynthesis');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['protosynthesis'];
			this.add('-end', pokemon, 'Protosynthesis', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protosynthesis', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protosynthesis');
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk') return;
				this.debug('Protosynthesis atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def') return;
				this.debug('Protosynthesis def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa') return;
				this.debug('Protosynthesis spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd') return;
				this.debug('Protosynthesis spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe') return;
				this.debug('Protosynthesis spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		isPermanent: true,
		name: "Protosynthesis",
		shortDesc: "Sunny Day active or Booster Energy used: highest stat is 1.3x, or 1.5x if Speed.",
		rating: 3,
		num: 281,
	},
	purifyingsalt: {
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Purifying Salt');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Purifying Salt');
				return null;
			}
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Purifying Salt weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(spa, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Purifying Salt weaken');
				return this.chainModify(0.5);
			}
		},
		isBreakable: true,
		name: "Purifying Salt",
		shortDesc: "Ghost damage to this Pokemon dealt with a halved offensive stat; can't be statused.",
		rating: 4,
		num: 272,
	},
	quarkdrive: {
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectData, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isTerrain('electricterrain') && !pokemon.volatiles['quarkdrive']) {
				pokemon.addVolatile('quarkdrive');
			} else if (pokemon.hasItem('boosterenergy') && !this.field.isTerrain('electricterrain') && pokemon.useItem()) {
				pokemon.removeVolatile('quarkdrive');
				pokemon.addVolatile('quarkdrive', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['quarkdrive'].fromBooster = true;
			} else if (!pokemon.volatiles['quarkdrive']?.fromBooster && !this.field.isTerrain('electricterrain')) {
				pokemon.removeVolatile('quarkdrive');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['quarkdrive'];
			this.add('-end', pokemon, 'Quark Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Quark Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Quark Drive');
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk') return;
				this.debug('Quark Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def') return;
				this.debug('Quark Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa') return;
				this.debug('Quark Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd') return;
				this.debug('Quark Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe') return;
				this.debug('Quark Drive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		isPermanent: true,
		name: "Quark Drive",
		shortDesc: "Electric Terrain active or Booster Energy used: highest stat is 1.3x, or 1.5x if Speed.",
		rating: 3,
		num: 282,
	},
	rockypayload: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Rock') {
				this.debug('Rocky Payload boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Rock') {
				this.debug('Rocky Payload boost');
				return this.chainModify(1.5);
			}
		},
		name: "Rocky Payload",
		shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using a Rock-type attack.",
		rating: 3.5,
		num: 276,
	},
	seedsower: {
		onDamagingHit(damage, target, source, move) {
			this.field.setTerrain('grassyterrain');
		},
		name: "Seed Sower",
		shortDesc: "When this Pokemon is hit by an attack, the effect of Grassy Terrain begins.",
		rating: 2.5,
		num: 269,
	},
	sharpness: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['slicing']) {
				this.debug('Shapness boost');
				return this.chainModify(1.5);
			}
		},
		name: "Sharpness",
		shortDesc: "This Pokemon's slicing moves have their power multiplied by 1.5.",
		rating: 3.5,
		num: 292,
	},
	supremeoverlord: {
		onStart(pokemon) {
			if (pokemon.side.totalFainted) {
				this.add('-activate', pokemon, 'ability: Supreme Overlord');
				const fallen = Math.min(pokemon.side.totalFainted, 5);
				this.add('-start', pokemon, `fallen${fallen}`, '[silent]');
				this.effectData.fallen = fallen;
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, `fallen${this.effectData.fallen}`, '[silent]');
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.effectData.fallen) {
				const powMod = [4096, 4506, 4915, 5325, 5734, 6144];
				this.debug(`Supreme Overlord boost: ${powMod[this.effectData.fallen]}/4096`);
				return this.chainModify([powMod[this.effectData.fallen], 4096]);
			}
		},
		name: "Supreme Overlord",
		shortDesc: "This Pokemon's moves have 10% more power for each fainted ally, up to 5 allies.",
		rating: 3.5,
		num: 293,
	},
	swordofruin: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Sword of Ruin');
		},
		onAnyModifyDef(def, target, source, move) {
			const abilityHolder = this.effectData.target;
			if (target.hasAbility('Sword of Ruin')) return;
			if (!move.ruinedDef?.hasAbility('Sword of Ruin')) move.ruinedDef = abilityHolder;
			if (move.ruinedDef !== abilityHolder) return;
			this.debug('Sword of Ruin Def drop');
			return this.chainModify(0.75);
		},
		name: "Sword of Ruin",
		shortDesc: "Active Pokemon without this Ability have their Defense multiplied by 0.75.",
		rating: 4.5,
		num: 285,
	},
	tabletsofruin: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Tablets of Ruin');
		},
		onAnyModifyAtk(atk, source, target, move) {
			const abilityHolder = this.effectData.target;
			if (source.hasAbility('Tablets of Ruin')) return;
			if (!move.ruinedAtk) move.ruinedAtk = abilityHolder;
			if (move.ruinedAtk !== abilityHolder) return;
			this.debug('Tablets of Ruin Atk drop');
			return this.chainModify(0.75);
		},
		name: "Tablets of Ruin",
		shortDesc: "Active Pokemon without this Ability have their Attack multiplied by 0.75.",
		rating: 4.5,
		num: 284,
	},
	thermalexchange: {
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Fire') {
				this.boost({atk: 1});
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Thermal Exchange');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Thermal Exchange');
			}
			return false;
		},
		name: "Thermal Exchange",
		shortDesc: "This Pokemon's Attack is raised by 1 when damaged by Fire moves; can't be burned.",
		rating: 2.5,
		num: 270,
	},
	toxicdebris: {
		onDamagingHit(damage, target, source, move) {
			const side = source.isAlly(target) ? source.side.foe : source.side;
			const toxicSpikes = side.sideConditions['toxicspikes'];
			if (move.category === 'Physical' && (!toxicSpikes || toxicSpikes.layers < 2)) {
				this.add('-activate', target, 'ability: Toxic Debris');
				side.addSideCondition('toxicspikes', target);
			}
		},
		name: "Toxic Debris",
		shortDesc: "If this Pokemon is hit by a physical attack, Toxic Spikes are set on the opposing side.",
		rating: 3.5,
		num: 295,
	},
	vesselofruin: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Vessel of Ruin');
		},
		onAnyModifySpA(spa, source, target, move) {
			const abilityHolder = this.effectData.target;
			if (source.hasAbility('Vessel of Ruin')) return;
			if (!move.ruinedSpA) move.ruinedSpA = abilityHolder;
			if (move.ruinedSpA !== abilityHolder) return;
			this.debug('Vessel of Ruin SpA drop');
			return this.chainModify(0.75);
		},
		name: "Vessel of Ruin",
		shortDesc: "Active Pokemon without this Ability have their Special Attack multiplied by 0.75.",
		rating: 4.5,
		num: 284,
	},
	wellbakedbody: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.boost({def: 2})) {
					this.add('-immune', target, '[from] ability: Well-Baked Body');
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Well-Baked Body",
		shortDesc: "This Pokemon's Defense is raised 2 stages if hit by a Fire move; Fire immunity.",
		rating: 3.5,
		num: 273,
	},
	windpower: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['wind']) {
				target.addVolatile('charge');
			}
		},
		onAllySideConditionStart(target, source, sideCondition) {
			const pokemon = this.effectData.target;
			if (sideCondition.id === 'tailwind') {
				pokemon.addVolatile('charge');
			}
		},
		name: "Wind Power",
		shortDesc: "This Pokemon gains the Charge effect when hit by a wind move or Tailwind begins.",
		rating: 1,
		num: 277,
	},
	windrider: {
		onStart(pokemon) {
			if (pokemon.side.sideConditions['tailwind']) {
				this.boost({atk: 1}, pokemon, pokemon);
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.flags['wind']) {
				if (!this.boost({atk: 1}, target, target)) {
					this.add('-immune', target, '[from] ability: Wind Rider');
				}
				return null;
			}
		},
		onAllySideConditionStart(target, source, sideCondition) {
			const pokemon = this.effectData.target;
			if (sideCondition.id === 'tailwind') {
				this.boost({atk: 1}, pokemon, pokemon);
			}
		},
		name: "Wind Rider",
		shortDesc: "Attack raised by 1 if hit by a wind move or Tailwind begins. Wind move immunity",
		rating: 3.5,
		// We do not want Brambleghast to get Infiltrator in Randbats
		num: 274,
	},
	zerotohero: {
		onSwitchOut(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Palafin' || pokemon.transformed) return;
			if (pokemon.species.forme !== 'Hero') {
				pokemon.formeChange('Palafin-Hero', this.effect, true);
			}
		},
		onSwitchIn() {
			this.effectData.switchingIn = true;
		},
		onStart(pokemon) {
			if (!this.effectData.switchingIn) return;
			this.effectData.switchingIn = false;
			if (pokemon.baseSpecies.baseSpecies !== 'Palafin' || pokemon.transformed) return;
			if (!this.effectData.heroMessageDisplayed && pokemon.species.forme === 'Hero') {
				this.add('-activate', pokemon, 'ability: Zero to Hero');
				this.effectData.heroMessageDisplayed = true;
			}
		},
		isPermanent: true,
		name: "Zero to Hero",
		shortDesc: "If this Pokemon is a Palafin in Zero Form, switching out has it change to Hero Form.",
		rating: 5,
		num: 278,
	},
	
// new stuff here
	zerotohero: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect?.effectType !== 'Move') {
				return;
			}
			if (source.species.id === 'palafin' && source.hp && !source.transformed && source.side.foe.pokemonLeft) {
				this.add('-activate', source, 'ability: Zero to Hero');
				source.formeChange('Palafin-Hero', this.effect, true);
			}
		},
		isPermanent: true,
		name: "Zero to Hero",
		shortDesc: "If this Pokemon is a Palafin in Zero Form, KOing a foe has it change to Hero Form.",
		rating: 5,
		num: 278,
	},
	overcoat: {
		inherit: true,
		shortDesc: "This Pokemon is immune to sandstorm damage, hazards, and powder moves.",
		name: "Overcoat",
	},
	cutecharm: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (defender.types.includes(move.type)) {
				this.debug('Cute Charm weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (defender.types.includes(move.type)) {
				this.debug('Cute Charm weaken');
				return this.chainModify(0.5);
			}
		},
		name: "Cute Charm",
		shortDesc: "This Pokemon takes 50% damage from moves of its own type.",
		rating: 3,
		num: 56,
	},
	healer: {
		name: "Healer",
	   onFaint(pokemon) {
			pokemon.side.addSlotCondition(pokemon, 'healer');
	   },
	   condition: {
			onSwap(target) {
				 if (!target.fainted) {
					  const source = this.effectData.source;
					  const damage = this.heal(target.baseMaxhp / 3, target, target);
					  if (damage) this.add('-heal', target, target.getHealth, '[from] ability: Healer', '[of] ' + this.effectData.source);
					  target.side.removeSlotCondition(target, 'healer');
				 }
			},
	   },
		rating: 3,
		shortDesc: "On faint, the next Pokemon sent out heals 33% of its max HP.",
		num: 131,
	},
	galewings: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.type === 'Flying' && pokemon.hp >= pokemon.maxhp / 2) return priority + 1;
		},
		name: "Gale Wings",
		shortDesc: "If this Pokemon has 50% of its max HP or more, its Flying-type moves have their priority increased by 1.",
		rating: 3,
		num: 177,
	},
	grasspelt: {
		onStart(pokemon) {
			if (!this.field.setTerrain('grassyterrain') && this.field.isTerrain('grassyterrain')) {
				this.add('-activate', pokemon, 'ability: Grass Pelt');
			}
		},
		onModifyDefPriority: 5,
		onModifyDef(def) {
			for (const target of this.getAllActive()) {
				if (target.hasAbility('cloudnine')) {
					this.debug('Cloud Nine prevents Defense increase');
					return;
				}
			}
			if (this.field.isTerrain('grassyterrain')) {
				this.debug('Grass Pelt boost');
				return this.chainModify([5461, 4096]);
			}
		},
		name: "Grass Pelt",
		shortDesc: "On switch-in, summons Grassy Terrain. During Grassy Terrain, Def is 1.3333x.",
		rating: 4.5,
		num: 179,
	},
	protosmosis: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectData, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Protosmosis is not affected by Utility Umbrella
			if (this.field.isWeather('raindance') && !pokemon.volatiles['protosmosis']) {
				pokemon.addVolatile('protosmosis');
			} else if (pokemon.hasItem('boosterenergy') && !this.field.isWeather('raindance') && pokemon.useItem()) {
				pokemon.removeVolatile('protosmosis');
				pokemon.addVolatile('protosmosis', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['protosmosis'].fromBooster = true;
			} else if (!pokemon.volatiles['protosmosis']?.fromBooster && !this.field.isWeather('raindance')) {
				pokemon.removeVolatile('protosmosis');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['protosmosis'];
			this.add('-end', pokemon, 'Protosmosis', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protosmosis', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protosmosis');
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosmosis' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk') return;
				this.debug('Protosmosis atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def') return;
				this.debug('Protosmosis def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa') return;
				this.debug('Protosmosis spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd') return;
				this.debug('Protosmosis spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe') return;
				this.debug('Protosmosis spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosmosis');
			},
		},
		isPermanent: true,
		name: "Protosmosis",
		shortDesc: "Rain Dance active or Booster Energy used: highest stat is 1.3x, or 1.5x if Speed.",
		rating: 3,
		num: 281,
	},
	protocrysalis: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectData, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Protocrysalis is not affected by Utility Umbrella
			if (this.field.isWeather('sandstorm') && !pokemon.volatiles['protocrysalis']) {
				pokemon.addVolatile('protocrysalis');
			} else if (pokemon.hasItem('boosterenergy') && !this.field.isWeather('sandstorm') && pokemon.useItem()) {
				pokemon.removeVolatile('protocrysalis');
				pokemon.addVolatile('protocrysalis', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['protocrysalis'].fromBooster = true;
			} else if (!pokemon.volatiles['protocrysalis']?.fromBooster && !this.field.isWeather('sandstorm')) {
				pokemon.removeVolatile('protocrysalis');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['protocrysalis'];
			this.add('-end', pokemon, 'Protocrysalis', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protocrysalis', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protocrysalis');
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protocrysalis' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk') return;
				this.debug('Protocrysalis atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def') return;
				this.debug('Protocrysalis def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa') return;
				this.debug('Protocrysalis spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd') return;
				this.debug('Protocrysalis spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe') return;
				this.debug('Protocrysalis spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protocrysalis');
			},
		},
		isPermanent: true,
		name: "Protocrysalis",
		shortDesc: "Sandstorm active or Booster Energy used: highest stat is 1.3x, or 1.5x if Speed.",
		rating: 3,
		num: 281,
	},
	protostasis: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectData, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Protostasis is not affected by Utility Umbrella
			if (this.field.isWeather('snow') && !pokemon.volatiles['protostasis']) {
				pokemon.addVolatile('protostasis');
			} else if (pokemon.hasItem('boosterenergy') && !this.field.isWeather('snow') && pokemon.useItem()) {
				pokemon.removeVolatile('protostasis');
				pokemon.addVolatile('protostasis', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['protostasis'].fromBooster = true;
			} else if (!pokemon.volatiles['protostasis']?.fromBooster && !this.field.isWeather('snow')) {
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
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protostasis', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protostasis');
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protostasis' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk') return;
				this.debug('Protostasis atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def') return;
				this.debug('Protostasis def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa') return;
				this.debug('Protostasis spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd') return;
				this.debug('Protostasis spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe') return;
				this.debug('Protostasis spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protostasis');
			},
		},
		isPermanent: true,
		name: "Protostasis",
		shortDesc: "Snow active or Booster Energy used: highest stat is 1.3x, or 1.5x if Speed.",
		rating: 3,
		num: 281,
	},
	photondrive: {
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectData, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isTerrain('grassyterrain') && !pokemon.volatiles['photondrive']) {
				pokemon.addVolatile('photondrive');
			} else if (pokemon.hasItem('boosterenergy') && !this.field.isTerrain('grassyterrain') && pokemon.useItem()) {
				pokemon.removeVolatile('photondrive');
				pokemon.addVolatile('photondrive', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['photondrive'].fromBooster = true;
			} else if (!pokemon.volatiles['photondrive']?.fromBooster && !this.field.isTerrain('grassyterrain')) {
				pokemon.removeVolatile('photondrive');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['photondrive'];
			this.add('-end', pokemon, 'Photon Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Photon Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Photon Drive');
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'photondrive' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk' || source.volatiles['cloudnine']) return;
				this.debug('Photon Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def' || target.volatiles['cloudnine']) return;
				this.debug('Photon Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa' || source.volatiles['cloudnine']) return;
				this.debug('Photon Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd' || target.volatiles['cloudnine']) return;
				this.debug('Photon Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe' || pokemon.volatiles['cloudnine']) return;
				this.debug('Photon Drive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Photon Drive');
			},
		},
		isPermanent: true,
		name: "Photon Drive",
		shortDesc: "Grassy Terrain active or Booster Energy used: highest stat is 1.3x, or 1.5x if Speed.",
		rating: 3,
		num: 282,
	},
	neurondrive: {
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectData, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isTerrain('psychicterrain') && !pokemon.volatiles['neurondrive']) {
				pokemon.addVolatile('neurondrive');
			} else if (pokemon.hasItem('boosterenergy') && !this.field.isTerrain('psychicterrain') && pokemon.useItem()) {
				pokemon.removeVolatile('neurondrive');
				pokemon.addVolatile('neurondrive', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['neurondrive'].fromBooster = true;
			} else if (!pokemon.volatiles['neurondrive']?.fromBooster && !this.field.isTerrain('psychicterrain')) {
				pokemon.removeVolatile('neurondrive');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['neurondrive'];
			this.add('-end', pokemon, 'Neuron Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Neuron Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Neuron Drive');
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'neurondrive' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk' || source.volatiles['cloudnine']) return;
				this.debug('Neuron Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def' || target.volatiles['cloudnine']) return;
				this.debug('Neuron Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa' || source.volatiles['cloudnine']) return;
				this.debug('Neuron Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd' || target.volatiles['cloudnine']) return;
				this.debug('Neuron Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe' || pokemon.volatiles['cloudnine']) return;
				this.debug('Neuron Drive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Neuron Drive');
			},
		},
		isPermanent: true,
		name: "Neuron Drive",
		shortDesc: "Psychic Terrain active or Booster Energy used: highest stat is 1.3x, or 1.5x if Speed.",
		rating: 3,
		num: 282,
	},
	runedrive: {
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectData, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isTerrain('mistyterrain') && !pokemon.volatiles['runedrive']) {
				pokemon.addVolatile('runedrive');
			} else if (pokemon.hasItem('boosterenergy') && !this.field.isTerrain('mistyterrain') && pokemon.useItem()) {
				pokemon.removeVolatile('runedrive');
				pokemon.addVolatile('runedrive', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['runedrive'].fromBooster = true;
			} else if (!pokemon.volatiles['runedrive']?.fromBooster && !this.field.isTerrain('mistyterrain')) {
				pokemon.removeVolatile('runedrive');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['runedrive'];
			this.add('-end', pokemon, 'Rune Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Rune Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Rune Drive');
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'runedrive' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk' || source.volatiles['cloudnine']) return;
				this.debug('Rune Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def' || target.volatiles['cloudnine']) return;
				this.debug('Rune Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa' || source.volatiles['cloudnine']) return;
				this.debug('Rune Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd' || target.volatiles['cloudnine']) return;
				this.debug('Rune Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe' || pokemon.volatiles['cloudnine']) return;
				this.debug('Rune Drive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Rune Drive');
			},
		},
		isPermanent: true,
		name: "Rune Drive",
		shortDesc: "Misty Terrain active or Booster Energy used: highest stat is 1.3x, or 1.5x if Speed.",
		rating: 3,
		num: 282,
	},
	quarkdrive: {
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectData, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isTerrain('electricterrain') && !pokemon.volatiles['quarkdrive']) {
				pokemon.addVolatile('quarkdrive');
			} else if (pokemon.hasItem('boosterenergy') && !this.field.isTerrain('electricterrain') && pokemon.useItem()) {
				pokemon.removeVolatile('quarkdrive');
				pokemon.addVolatile('quarkdrive', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['quarkdrive'].fromBooster = true;
			} else if (!pokemon.volatiles['quarkdrive']?.fromBooster && !this.field.isTerrain('electricterrain')) {
				pokemon.removeVolatile('quarkdrive');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['quarkdrive'];
			this.add('-end', pokemon, 'Quark Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Quark Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Quark Drive');
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk' || source.volatiles['cloudnine']) return;
				this.debug('Quark Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def' || target.volatiles['cloudnine']) return;
				this.debug('Quark Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa' || source.volatiles['cloudnine']) return;
				this.debug('Quark Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd' || target.volatiles['cloudnine']) return;
				this.debug('Quark Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe' || pokemon.volatiles['cloudnine']) return;
				this.debug('Quark Drive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Rune Drive');
			},
		},
		isPermanent: true,
		name: "Quark Drive",
		shortDesc: "Electric Terrain active or Booster Energy used: highest stat is 1.3x, or 1.5x if Speed.",
		rating: 3,
		num: 282,
	},
	damp: {
		onAnyTryMove(target, source, effect) {
			if (['explosion', 'mindblown', 'mistyexplosion', 'selfdestruct', 'shrapnelshot'].includes(effect.id)) {
				this.attrLastMove('[still]');
				this.add('cant', this.effectData.target, 'ability: Damp', effect, '[of] ' + target);
				return false;
			}
		},
		onAnyDamage(damage, target, source, effect) {
			if (effect && effect.id === 'aftermath') {
				return false;
			}
		},
		name: "Damp",
		rating: 1,
		num: 6,
	},
	musclememory: {
		onStart(pokemon) {
			pokemon.addVolatile('musclememory');
		},
		condition: {
			onStart(pokemon) {
				this.effectData.lastMove = '';
				this.effectData.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasAbility('musclememory')) {
					pokemon.removeVolatile('musclememory');
					return;
				}
				if (this.effectData.lastMove === move.id && pokemon.moveLastTurnResult) {
					this.effectData.numConsecutive++;
				} else if (pokemon.volatiles['twoturnmove'] && this.effectData.lastMove !== move.id) {
					this.effectData.numConsecutive = 1;
				} else {
					this.effectData.numConsecutive = 0;
				}
				this.effectData.lastMove = move.id;
			},
			onModifyDamage(damage, source, target, move) {
				const dmgMod = [0x1000, 0x1333, 0x1666, 0x1999, 0x1CCC, 0x2000];
				const numConsecutive = this.effectData.numConsecutive > 5 ? 5 : this.effectData.numConsecutive;
				return this.chainModify([dmgMod[numConsecutive], 0x1000]);
			},
		},
		name: "Muscle Memory",
		shortDesc: "Damage of moves used on consecutive turns is increased. Max 2x after 5 turns.",
		rating: 4,
	}, /*
	cloudnine: {
		onSwitchIn(pokemon) {
			this.effectData.switchingIn = true;
		},
		onStart(pokemon) {
			if (!this.effectData.switchingIn) return;
			this.add('-ability', pokemon, 'Cloud Nine');
			this.effectData.switchingIn = false;
			if (this.field.terrain) {
				this.add('-ability', source, 'Cloud Nine');
				this.add('-message', `${source.name} suppresses the effects of the terrain!`);
			}
		},
		onAnyModifyAtkPriority: 6,
		onAnyModifyAtk(atk, attacker, defender, move) {
			//this.effectData.bestStat = attacker.getBestStat(false, true);
			const dyschronoUser = this.effectData.target;
			if (defender == dyschronoUser) {
				if (attacker.getBestStat(false, true) !== 'atk') return;
				for (const paradox of ['photondrive', 'neurondrive', 'runedrive', 'quarkdrive']) { 
					if (attacker.volatiles[paradox] && !attacker.volatiles['paradox']?.fromBooster) {
						this.debug('cloudnine weaken');
						return this.chainModify([3151, 4096]);
					}
				}
			} else if (attacker == dyschronoUser) {
				const bestStat = defender.getBestStat(false,true);
				if (bestStat !== 'def' && (!move.defensiveCategory || move.defensiveCategory === 'Physical')) return;
				if (move.defensiveCategory === 'Special' && bestStat !== 'spd') return;
				for (const paradox of ['photondrive', 'neurondrive', 'runedrive', 'quarkdrive']) { 
					if (defender.volatiles[paradox] && !defender.volatiles['paradox']?.fromBooster) {
						this.debug('cloudnine nullify');
						return this.chainModify([5325, 4096]);
					}
				}
			}
		},
		onAnyModifySpAPriority: 5,
		onAnyModifySpA(atk, attacker, defender, move) {
			//this.effectData.bestStat = attacker.getBestStat(false, true);
			const dyschronoUser = this.effectData.target;
			if (defender == dyschronoUser) {
				if (attacker.getBestStat(false, true) !== 'spa') return;
				for (const paradox of ['photondrive', 'neurondrive', 'runedrive', 'quarkdrive']) { 
					if (attacker.volatiles[paradox] && !attacker.volatiles['paradox']?.fromBooster) {
						this.debug('cloudnine weaken');
						return this.chainModify([3151, 4096]);
					}
				}
			} else if (attacker == dyschronoUser) {
				const bestStat = defender.getBestStat(false,true);
				if (bestStat !== 'spd' && (!move.defensiveCategory || move.defensiveCategory === 'Special')) return;
				if (move.defensiveCategory === 'Physical' && bestStat !== 'def') return;
				for (const paradox of ['photondrive', 'neurondrive', 'runedrive', 'quarkdrive']) { 
					if (defender.volatiles[paradox] && !defender.volatiles['paradox']?.fromBooster) {
						this.debug('cloudnine nullify');
						return this.chainModify([5325, 4096]);
					}
				}
			}
		},
		onAnyTerrainStart(target, source, terrain) {
			const pokemon = this.effectData.target;
			this.add('-ability', pokemon, 'Cloud Nine');
			this.add('-message', `${pokemon.name} suppresses the effects of the terrain!`);
		}, 
		onUpdate(pokemon) {
			let activated = false;
         for (const target of pokemon.side.foe.active) {
				this.effectData.bestStat = target.getBestStat(false, true);
				if (!target) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Cloud Nine', 'boost');
					activated = true;
				}
				for (const paradox of ['photondrive', 'neurondrive', 'runedrive', 'quarkdrive']) { 
					if (target.volatiles['paradox'] && !target.volatiles['paradox']?.fromBooster && this.effectData.bestStat === 'spe') {
						this.boost({spe: -1}, target, pokemon, null, true);
					}
				}
			}
		}, 
		onEnd(source) {
			if (this.field.terrain) {
				this.add('-message', `${source.name} is no longer suppressing the effects of the terrain!`);
			}
			source.abilityData.ending = true;
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('mimicry')) {
					for (const target of this.getAllActive()) {
						if (target.hasAbility('cloudnine') && target !== source) {
							this.debug('Cloud Nine prevents type change');
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
							if (target.hasAbility('cloudnine')) {
								if (target === source) continue;
								this.debug('Cloud Nine prevents Seed use');
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
							if (target.hasAbility('cloudnine')) {
								if (target === source) continue;
								this.debug('Cloud Nine prevents Seed use');
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
							if (target.hasAbility('cloudnine')) {
								if (target === source) continue;
								this.debug('Cloud Nine prevents Seed use');
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
							if (target.hasAbility('cloudnine')) {
								if (target === source) continue;
								this.debug('Cloud Nine prevents Seed use');
								return;
							}
						}
						pokemon.useItem();
					}
				}
			}
		},
		suppressWeather: true,
		name: "Cloud Nine",
		shortDesc: "While this Pokemon is active, the effects of weathers and terrains are disabled.",
		rating: 2,
		num: 13,
	}, */
	mimicry: {
		shortDesc: "This Pokémon's type changes to match the Terrain. Type reverts when Terrain ends.",
		onStart(pokemon) {
			for (const target of this.getAllActive()) {
				if (target.hasAbility('cloudnine')) {
					this.debug('Cloud Nine prevents type change');
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
				if (target.hasAbility('cloudnine')) {
					this.debug('Cloud Nine prevents type change');
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
		condition: {
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
				if (!newType || pokemon.getTypes().join() === newType || !pokemon.setType(newType)) return;
				this.add('-start', pokemon, 'typechange', newType, '[from] ability: Mimicry');
				}
			},
			onUpdate(pokemon) {
				for (const target of this.getAllActive()) {
					if (target.hasAbility('cloudnine')) {
						this.debug('Cloud Nine prevents type change');
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
		shortDesc: "If Electric Terrain is active, this Pokémon's Speed is doubled.",
		onModifySpe(spe) {
			for (const target of this.getAllActive()) {
				if (target.hasAbility('cloudnine')) {
					this.debug('Cloud Nine prevents Speed increase');
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
	deathaura: {
		id: "deathaura",
		name: "Death Aura",
		shortDesc: "While this Pokemon is active, no Pokemon can heal or use draining moves.",
		onStart(source) {
			let activated = false;
			for (const pokemon of source.side.foe.active) {
				if (!activated) {
					this.add('-ability', source, 'Death Aura');
				}
				activated = true;
				if (!pokemon.volatiles['healblock']) {
					pokemon.addVolatile('healblock');
				}
				if (!source.volatiles['healblock']) {
					source.addVolatile('healblock');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			const source = this.effectData.target;
			if (pokemon === source) return;
			for (const target of source.side.foe.active) {
				if (!target.volatiles['healblock']) {
					target.addVolatile('healblock');
				}
			}
		},
		onEnd(pokemon) {
			const source = this.effectData.target;
			for (const target of source.side.foe.active) {
				target.removeVolatile('healblock');
			}
		},
		rating: 4,
	},
	seedsower: {
		onDamagingHit(damage, target, source, move) {
			if (!source.hasType('Grass')) {
				this.add('-activate', target, 'ability: Seed Sower');
				source.addVolatile('leechseed', this.effectData.target);
			}
		},
		name: "Seed Sower",
		shortDesc: "When this Pokemon is hit by an attack, the effect of Leech Seed begins.",
		rating: 3,
		num: 269,
	},
	sandspit: {
		onDamagingHit(damage, target, source, move) {
				this.add('-activate', target, 'ability: Sand Spit');
				source.addVolatile('sandspit', this.effectData.target);
		},
		condition: {
			duration: 5,
			durationCallback(target, source) {
				if (source?.hasItem('gripclaw')) return 8;
				return this.random(5, 7);
			},
			onStart(pokemon, source) {
				this.add('-activate', pokemon, 'move: ' + this.effectData.sourceEffect, '[of] ' + source);
				this.effectData.boundDivisor = source.hasItem('bindingband') ? 6 : 8;
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				const source = this.effectData.source;
				// G-Max Centiferno and G-Max Sandblast continue even after the user leaves the field
				const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectData.sourceEffect.id);
				if (source && (!source.isActive || source.hp <= 0) && !gmaxEffect) {
					delete pokemon.volatiles['sandspit'];
					this.add('-end', pokemon, this.effectData.sourceEffect, '[sandspit]', '[silent]');
					return;
				}
				this.add('-anim', pokemon, "Sand Tomb", pokemon);
				this.damage(pokemon.baseMaxhp / this.effectData.boundDivisor);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, this.effectData.sourceEffect, '[sandspit]');
			},
			onTrapPokemon(pokemon) {
				const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectData.sourceEffect.id);
				if (this.effectData.source?.isActive || gmaxEffect) pokemon.tryTrap();
			},
		},
		name: "Sand Spit",
		shortDesc: "When this Pokemon is hit by an attack, the effect of Sand Tomb begins.",
		rating: 4,
		num: 245,
	},
	sandforce: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather('sandstorm')) {
				this.debug('Sand Force boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		name: "Sand Force",
		rating: 2,
		shortDesc: "This Pokemon's moves deal 1.3x damage in a sandstorm; Sand immunity.",
		num: 159,
	},
	regenerator: {
		onSwitchOut(pokemon) {
			if (!pokemon.volatiles['healblock']) {
				pokemon.heal(pokemon.baseMaxhp / 3);
			}
		},
		name: "Regenerator",
		rating: 4.5,
		num: 144,
	},
	cloudnine: {
		onSwitchIn(pokemon) {
			this.effectData.switchingIn = true;
		},
		onStart(pokemon) {
			if (!this.effectData.switchingIn) return;
			this.add('-ability', pokemon, 'Cloud Nine');
			this.effectData.switchingIn = false;
			if (this.field.terrain) {
				this.add('-message', `${pokemon.name} suppresses the effects of the terrain!`);
				let activated = false;
				for (const other of pokemon.side.foe.active) {
					if (!activated) {
						this.add('-ability', pokemon, 'Cloud Nine');
					}
					activated = true;
					if (!other.volatiles['cloudnine']) {
						other.addVolatile('cloudnine');
					}
				}
			}
		},
		onAnyTerrainStart(target, source, terrain) {
			const pokemon = this.effectData.target;
			this.add('-ability', pokemon, 'Cloud Nine');
			this.add('-message', `${pokemon.name} suppresses the effects of the terrain!`);
			if (this.field.terrain) {
				let activated = false;
				for (const other of pokemon.side.foe.active) {
					if (!activated) {
						this.add('-ability', pokemon, 'Cloud Nine');
					}
					activated = true;
					if (!other.volatiles['cloudnine']) {
						other.addVolatile('cloudnine');
					}
				}
			}
		},
		onAnySwitchIn(pokemon) {
			const source = this.effectData.target;
			if (pokemon === source) return;
			for (const target of source.side.foe.active) {
				if (!target.volatiles['cloudnine']) {
					target.addVolatile('cloudnine');
				}
			}
		},
		onEnd(source) {
			if (this.field.terrain) {
				const source = this.effectData.target;
				for (const target of source.side.foe.active) {
					target.removeVolatile('cloudnine');
				}
			}
			source.abilityData.ending = true;
			for (const pokemon of this.getAllActive()) {
				if (pokemon.hasAbility('mimicry')) {
					for (const target of this.getAllActive()) {
						if (target.hasAbility('cloudnine') && target !== source) {
							this.debug('Cloud Nine prevents type change');
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
							if (target.hasAbility('cloudnine')) {
								if (target === source) continue;
								this.debug('Cloud Nine prevents Seed use');
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
							if (target.hasAbility('cloudnine')) {
								if (target === source) continue;
								this.debug('Cloud Nine prevents Seed use');
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
							if (target.hasAbility('cloudnine')) {
								if (target === source) continue;
								this.debug('Cloud Nine prevents Seed use');
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
							if (target.hasAbility('cloudnine')) {
								if (target === source) continue;
								this.debug('Cloud Nine prevents Seed use');
								return;
							}
						}
						pokemon.useItem();
					}
				}
			}
		},
		condition: {},
		suppressWeather: true,
		name: "Cloud Nine",
		shortDesc: "While this Pokemon is active, the effects of weathers and terrains are disabled.",
		rating: 2,
		num: 13,
	},
};
