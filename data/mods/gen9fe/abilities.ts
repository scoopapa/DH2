export const Abilities: {[k: string]: ModdedAbilityData} = {
	/* FEG9 abils */
	unfiltered: {
		shortDesc: "Filter + Contrary + This Pokemon's NvE Moves deal 4/3x damage.",
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Unfiltered neutralize');
				return this.chainModify(0.75);
			}
		},
		onChangeBoost(boost, target, source, effect) {
			if (effect?.id === 'zpower') return;
			let i: BoostID;
			for (i in boost) {
				boost[i]! *= -1;
			}
		},
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod < 0) {
				this.debug('Unfiltered boost');
				return this.chainModify([5461, 4096]);
			}
		},
		flags: {breakable: 1},
		name: "Unfiltered",
    },
	quickstart: {
		shortDesc: "On switch-in, this Pokemon's Attack and Speed are doubled for 5 turns.",
		onStart(pokemon) {
			pokemon.addVolatile('quickstart');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['quickstart'];
			this.add('-end', pokemon, 'Quickstart', '[silent]');
		},
		condition: {
			duration: 5,
			onStart(target) {
				this.add('-start', target, 'ability: Quickstart');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(2);
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(2);
			},
			onEnd(target) {
				this.add('-end', target, 'Quickstart');
			},
		},
		flags: {},
		name: "Quickstart",
    },
	holygrail: {
	  shortDesc: "Good As Gold + Levitate",
		onTryHit(target, source, move) {
			if (move.category === 'Status' && target !== source) {
				this.add('-immune', target, '[from] ability: Holy Grail');
				return null;
			}
		},
		flags: {breakable: 1},
	  name: "Holy Grail",
    },
	alldevouring: {
	  shortDesc: "Beast Boost + Run Away",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect?.effectType === 'Move') {
				const bestStat = source.getBestStat(true, true);
				this.boost({[bestStat]: length}, source);
			}
		},
	  name: "All-Devouring",
    },
	galvanicrelay: {
	  shortDesc: "Mycelium Might + Transistor; Electric attacks also ignore abilities.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Galvanic Relay boost');
				return this.chainModify([5325, 4096]);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Galvanic Relay boost');
				return this.chainModify([5325, 4096]);
			}
		},
		onFractionalPriorityPriority: -1,
		onFractionalPriority(priority, pokemon, target, move) {
			if (move.category === 'Status') {
				return -0.1;
			}
		},
		onModifyMove(move) {
			if (move.category === 'Status' || move.type === 'Electric') {
				move.ignoreAbility = true;
			}
		},
	  name: "Galvanic Relay",
    },
	forestfury: {
	  shortDesc: "Intimidate + Hyper Cutter + Cannot be statused by opponents.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Forest Fury', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
		onBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.atk && boost.atk < 0) {
				delete boost.atk;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "Attack", "[from] ability: Forest Fury", "[of] " + target);
				}
			}
		},
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Forest Fury');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Forest Fury');
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Forest Fury",
    },
	growthspurt: {
	  shortDesc: "Effects of Harvest; Berry is restored at 1/3 or less of its max HP.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.hp && !pokemon.item && this.dex.items.get(pokemon.lastItem).isBerry && (this.field.isWeather(['sunnyday', 'desolateland']) || this.randomChance(1, 2))) {
				pokemon.setItem(pokemon.lastItem);
				pokemon.lastItem = '';
				this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Growth Spurt');
			}
		},
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			const threshold = target.maxhp / 3;
			if (target.hp <= threshold && target.hp + damage > threshold && !target.item && this.dex.items.get(target.lastItem).isBerry) {
					target.setItem(target.lastItem);
					target.lastItem = '';
					this.add('-item', target, target.getItem(), '[from] ability: Growth Spurt');
			}
		},
		flags: {},
		name: "Growth Spurt",
    },
	lightdrive: {
	  shortDesc: "Light Metal + Quark Drive. Quark Drive activates if the user is lighter.",
		onModifyWeight(weighthg) {
			return this.trunc(weighthg / 2);
		},
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onTerrainChange(pokemon) {
			if (pokemon.transformed) return;
			if (this.field.isTerrain('electricterrain')) {
				pokemon.addVolatile('lightdrive');
			} else if (!pokemon.volatiles['lightdrive']?.fromBooster) {
				pokemon.removeVolatile('lightdrive');
			}
		},
		onUpdate(pokemon) {
			if (!(pokemon.volatiles['lightdrive']?.fromBooster || pokemon.volatiles['lightdrive']?.fromWeightDiff) && !this.field.isTerrain('electricterrain')) {
				pokemon.removeVolatile('lightdrive');
			}
		},
		onAnyPrepareHit(source, target, move) {
			if (move.hasBounced || source === target) return;
			const user = this.effectState.target;
			if (user.volatiles['lightdrive'] && !user.volatiles['lightdrive'].fromWeightDiff) return;
			var yourweight;
			if (source === user) {
				yourweight = target.getWeight();
			} else if (target === user) {
				yourweight = source.getWeight();
			} else return;
			if (user.getWeight() < yourweight) {
				if (user.volatiles['lightdrive']) return;
				user.addVolatile('lightdrive');
				user.volatiles['lightdrive'].fromWeightDiff = true;
			} else if (user.volatiles['lightdrive']) {
				if (this.field.isTerrain('electricterrain')) {
					user.volatiles['lightdrive'].fromWeightDiff = false;
				} else {
					user.removeVolatile('lightdrive');
				}
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['lightdrive'];
			this.add('-end', pokemon, 'Light Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Light Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Light Drive');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Light Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Light Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Light Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Light Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				for (const target of pokemon.foes()) {
					if (target.hasAbility('dyschronometria')) {
						this.debug('Dyschronometria negating spe boost');
						return;
					}
				}
				this.debug('Light Drive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Light Drive",
	},
	scraprock: {
	  shortDesc: "Scrappy + Solid Rock",
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Scrap Rock neutralize');
				return this.chainModify(0.75);
			}
		},
		onModifyMovePriority: -5,
		onModifyMove(move) {
			//if ignoreImmunity does not exist replace with blank object
			//If it's not unconditional then populate Fighting and Normal fields
			if ((move.ignoreImmunity ||= {}) !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (['Intimidate','Mad Cow','Forest Fury','Shock Factor','Daunting Storm','Toxic Attitude'].includes(effect.name) && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Scrap Rock', '[of] ' + target);
			} else if (effect.name === 'Fishy Threat' && boost.spe) {
				delete boost.spe;
				this.add('-fail', target, 'unboost', 'Speed', '[from] ability: Scrap Rock', '[of] ' + target);
			}
		},
		flags: {breakable: 1},
		name: "Scrap Rock",
		rating: 3,
	},
	reachless: {
	  shortDesc: "Effects of Rock Head and Reckless.",
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.recoil || move.hasCrashDamage) {
				this.debug('Reachless boost');
				return this.chainModify([0x1333, 0x1000]);
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		flags: {},
		name: "Reachless",
		rating: 3,
	},
	openingact: {
	  shortDesc: "Protosynthesis + Prankster. Protosynthesis also activates when using a priority move.",
		onPrepareHit(source, target, move) {
			const isItSunny = this.field.isWeather('sunnyday');
			if (move.priority > 0) {
				if (isItSunny || source.volatiles['openingact']) return;
				source.addVolatile('openingact');
				source.volatiles['openingact'].fromPriority = true;
			} else if (source.volatiles['openingact']?.fromPriority) {
				if (isItSunny) {
					source.volatiles['openingact'].fromPriority = false;
				} else {
					source.removeVolatile('openingact');
				}
			}
		},
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.category === 'Status') {
				move.pranksterBoosted = true;
				return priority + 1;
			}
		},
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday')) {
				pokemon.addVolatile('openingact');
			} else if (!(pokemon.volatiles['openingact']?.fromBooster || pokemon.volatiles['openingact']?.fromPriority)) {
				pokemon.removeVolatile('openingact');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['openingact'];
			this.add('-end', pokemon, 'Protosynthesis', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Opening Act', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Opening Act');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Opening Act atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Opening Act def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Opening Act spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Opening Act spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				for (const target of pokemon.foes()) {
					if (target.hasAbility('dyschronometria')) {
						this.debug('Dyschronometria negating spe boost');
						return;
					}
				}
				this.debug('Opening Act spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Opening Act",
		rating: 3,
	},
	necromancer: {
	  shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using a Ghost-type attack and takes 50% damage from Ghost and Steel attacks; can't be statused.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Necromancer boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Necromancer boost');
				return this.chainModify(1.5);
			}
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ghost' || move.type === 'Steel') {
				this.debug('Necromancer weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ghost' || move.type === 'Steel') {
				this.debug('Necromancer weaken');
				return this.chainModify(0.5);
			}
		},
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Necromancer');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Necromancer');
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Necromancer",
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
	quarksurge: {
	  shortDesc: "Quark Drive + Electric Surge",
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
			this.field.setTerrain('electricterrain');
		},
		onTerrainChange(pokemon) {
			if (pokemon.transformed) return;
			if (this.field.isTerrain('electricterrain')) {
				pokemon.addVolatile('quarksurge');
			} else if (!pokemon.volatiles['quarksurge']?.fromBooster) {
				pokemon.removeVolatile('quarksurge');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['quarksurge'];
			this.add('-end', pokemon, 'Quark Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Quark Surge', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Quark Surge');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Quark Surge atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Quark Surge def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Quark Surge spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Quark Surge spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				for (const target of pokemon.foes()) {
					if (target.hasAbility('dyschronometria')) {
						this.debug('Dyschronometria negating spe boost');
						return;
					}
				}
				this.debug('Quark Surge spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Quark Surge",
		rating: 3,
	},
	onceuponatime: {
	  shortDesc: "Protosynthesis + Infiltrator",
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday')) {
				pokemon.addVolatile('onceuponatime');
			} else if (!pokemon.volatiles['onceuponatime']?.fromBooster) {
				pokemon.removeVolatile('onceuponatime');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['onceuponatime'];
			this.add('-end', pokemon, 'Protosynthesis', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Once Upon a Time', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Once Upon a Time');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Once Upon a Time atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Once Upon a Time def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Once Upon a Time spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Once Upon a Time spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				for (const target of pokemon.foes()) {
					if (target.hasAbility('dyschronometria')) {
						this.debug('Dyschronometria negating spe boost');
						return;
					}
				}
				this.debug('Once Upon a Time spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		onModifyMove(move) {
			move.infiltrates = true;
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Once Upon a Time",
		rating: 3,
	},
	primitive: {
	  shortDesc: "Protosynthesis + Oblivious",
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onImmunity(type, pokemon) {
			if (type === 'attract') return false;
		},
		onTryHit(pokemon, target, move) {
			if (['attract','captivate','taunt'].includes(move.id)) {
				this.add('-immune', pokemon, '[from] ability: Primitive');
				return null;
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (['Intimidate','Mad Cow','Forest Fury','Shock Factor','Daunting Storm','Toxic Attitude'].includes(effect.name) && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Primitive', '[of] ' + target);
			} else if (effect.name === 'Fishy Threat' && boost.spe) {
				delete boost.spe;
				this.add('-fail', target, 'unboost', 'Speed', '[from] ability: Primitive', '[of] ' + target);
			}
		},
		onWeatherChange(pokemon) {
			if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday')) {
				pokemon.addVolatile('primitive');
			} else if (!pokemon.volatiles['primitive']?.fromBooster) {
				pokemon.removeVolatile('primitive');
			}
		},
		onUpdate(pokemon) {
			if (pokemon.volatiles['attract']) {
				this.add('-activate', pokemon, 'ability: Primitive');
				pokemon.removeVolatile('attract');
				this.add('-end', pokemon, 'move: Attract', '[from] ability: Primitive');
			}
			if (pokemon.volatiles['taunt']) {
				this.add('-activate', pokemon, 'ability: Primitive');
				pokemon.removeVolatile('taunt');
				// Taunt's volatile already sends the -end message when removed
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['primitive'];
			this.add('-end', pokemon, 'Protosynthesis', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Primitive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Primitive');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Primitive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Primitive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Primitive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Primitive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				for (const target of pokemon.foes()) {
					if (target.hasAbility('dyschronometria')) {
						this.debug('Dyschronometria negating spe boost');
						return;
					}
				}
				this.debug('Primitive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		flags: {breakable: 1, failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Primitive",
		rating: 3,
	},
	systempurge: {
	  shortDesc: "Hit by a Dark move or Booster Energy used: highest stat is 1.3x, or 1.5x if Speed.",
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Dark') {
				target.addVolatile('systempurge');
			}
		},
		/*onTerrainChange(pokemon) {
			if (pokemon.transformed) return;
			if (this.field.isTerrain('electricterrain')) {
				pokemon.addVolatile('systempurge');
			} else if (!pokemon.volatiles['systempurge']?.fromBooster) {
				pokemon.removeVolatile('systempurge');
			}
		},*/
		onEnd(pokemon) {
			delete pokemon.volatiles['systempurge'];
			this.add('-end', pokemon, 'Quark Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: System Purge', '[fromitem]');
					this.add('-message', `${pokemon.name} used its booster energy to activate a System Purge!`);
				} else {
					this.add('-activate', pokemon, 'ability: System Purge');
					this.add('-message', `${pokemon.name} activated a System Purge in response to the attack!`);
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('System Purge atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('System Purge def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('System Purge spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('System Purge spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				for (const target of pokemon.foes()) {
					if (target.hasAbility('dyschronometria')) {
						this.debug('Dyschronometria negating spe boost');
						return;
					}
				}
				this.debug('System Purge spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "System Purge",
		rating: 3,
	},
	delayedreaction: {
	  shortDesc: "This Pokemon switches out at the end of the next turn after being lowered to 50% of its max HP.",
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp*.5 && target.hp + damage > target.maxhp*.5) {
				target.addVolatile('delayedreaction');
				this.add('-ability', target, 'Delayed Reaction');
				this.add('-message', `${target.name} is getting ready to leave the battlefield!`);
			}
		},
		condition: {
			duration: 1,
			onEnd(pokemon) {
				this.add('-ability', pokemon, 'Delayed Reaction');
				this.add('-message', `${pokemon.name} ejected itself from the battle!`);
				pokemon.switchFlag = true;				
			},
		},
		flags: {},
		name: "Delayed Reaction",
		rating: 1,
	},
	madcow: {
	  shortDesc: "On switch-in, or when this Pokemon is lowered to 50% max HP, the foe's Attack is lowered by 1 stage.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Mad Cow', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
		onEmergencyExit(target) {
			if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.switchFlag) return;
			for (const side of this.sides) {
				for (const active of side.active) {
					active.switchFlag = false;
				}
			}
			this.add('-activate', target, 'ability: Mad Cow');
			for (const pokemon of target.adjacentFoes()) {
				if (pokemon.volatiles['substitute']) {
					this.add('-immune', pokemon);
				} else {
					this.boost({atk: -1}, pokemon, target, null, true);
				}
			}
			target.switchFlag = false;
		},
		flags: {},
		name: "Mad Cow",
		rating: 3.5,
	},
	choreography: {
	  shortDesc: "Protean + Dancer; Dancer is once per switch-in instead of Protean.",
		onPrepareHit(source, target, move) {
			if (move.hasBounced || move.isFutureMove || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type && source.setType(type)) {
				this.add('-start', source, 'typechange', type, '[from] ability: Choreography');
			}
		},
		onSwitchIn(pokemon) {
			delete this.effectState.choreography;
		},
		flags: {},
		name: "Choreography",
		rating: 4,
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
	stoneage: {
	  shortDesc: "Sturdy + Technician",
		onBeforeMovePriority: 9,
		onBeforeMove(pokemon) {
			if (pokemon.species.name !== 'Relishadow' || pokemon.transformed) return;
			pokemon.formeChange('Relishadow-Zenith');
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
		},
		onTryHit(pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[from] ability: Stone Age');
				return null;
			}
		},
		onDamagePriority: -100,
		onDamage(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Stone Age');
				return target.hp - 1;
			}
		},
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
			this.debug('Base Power: ' + basePowerAfterMultiplier);
			if (basePowerAfterMultiplier <= 60) {
				this.debug('Stone Age boost');
				return this.chainModify(1.5);
			}
		},
		flags: {breakable: 1},
		name: "Stone Age",
		rating: 3,
	},
	stonewheel: {
	  shortDesc: "Rock Head + Technician",
		onBeforeMovePriority: 9,
		onBeforeMove(pokemon) {
			if (pokemon.species.name !== 'Relishadow' || pokemon.transformed) return;
			pokemon.formeChange('Relishadow-Zenith');
			this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
		},
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
			this.debug('Base Power: ' + basePowerAfterMultiplier);
			if (basePowerAfterMultiplier <= 60) {
				this.debug('Stone Age boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Stone Wheel",
		rating: 3,
	},
	moltencore: {
	  shortDesc: "Turboblaze + Rock Head",
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Molten Core');
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
		flags: {},
		name: "Molten Core",
		rating: 3,
	},
	eczema: {
	  shortDesc: "Unaware + Rough Skin",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectState.target;
			if (unawareUser === pokemon) return;
			if (unawareUser === this.activePokemon) {
				if (pokemon !== this.activeTarget) return;
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			else if (pokemon === this.activePokemon && unawareUser === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['def'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		flags: {breakable: 1},
		name: "Eczema",
		rating: 3,
	},
	aurashield: {
	  shortDesc: "Shield Dust + While this Pokemon is active, moves with secondary effects used by any Pokemon have 1.33x power.",
		onModifySecondaries(secondaries) {
			this.debug('Aura Shield prevent secondary');
			return secondaries.filter(effect => !!(effect.self || effect.dustproof));
		},
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Aura Shield');
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || !move.secondaries) return;
			if (!move.auraBooster) move.auraBooster = this.effectState.target;
			else if (move.auraBooster !== this.effectState.target) return;
			return this.chainModify([move.hasAuraBreak ? 0x0C00 : 0x1547, 0x1000]);
		},
		flags: {},
		name: "Aura Shield",
		rating: 3,
	},
	faultyphoton: {
	  shortDesc: "Disguise + Quark Drive",
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect?.effectType === 'Move' && target.species.id === 'ironmimic' && !target.transformed) {
				this.add('-activate', target, 'ability: Faulty Photon');
				this.effectState.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target/*) return;
			if (*/|| target.species.id !== 'ironmimic' || target.transformed || !target.runImmunity(move.type)) return;
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates/* && this.gen >= 6*/);
			if (hitSub) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target/*) return;
			if (*/|| target.species.id !== 'ironmimic' || target.transformed || !target.runImmunity(move.type)) return;
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates/* && this.gen >= 6*/);
			if (hitSub) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (pokemon.species.id === 'ironmimic' && this.effectState.busted) {
				//const speciesid = /*pokemon.species.id === 'mimikyutotem' ? 'Mimikyu-Busted-Totem' :*/ 'Iron Mimic-Busted';
				//pokemon.formeChange(speciesid, this.effect, true);
				pokemon.formeChange('Iron Mimic-Busted', this.effect, true);
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon, this.dex.species.get('Iron Mimic-Busted'));
			}
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				pokemon.addVolatile('faultyphoton');
			} else if (!pokemon.volatiles['faultyphoton']?.fromBooster) {
				pokemon.removeVolatile('faultyphoton');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['quarkdrive'];
			this.add('-end', pokemon, 'Quark Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Faulty Photon', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Faulty Photon');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Faulty Photon atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Faulty Photon def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Faulty Photon spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Faulty Photon spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				for (const target of pokemon.foes()) {
					if (target.hasAbility('dyschronometria')) {
						this.debug('Dyschronometria negating spe boost');
						return;
					}
				}
				this.debug('Faulty Photon spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		flags: {
			failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1,
			breakable: 1, notransform: 1,
		},	
		name: "Faulty Photon",
		rating: 3,
	},
	dyschronometria: {
	  shortDesc: "While this Pokemon is active, all Paradox boosts are suppressed.",
		onAnyModifyAtkPriority: 4,
		onAnyModifyAtk(atk, attacker, defender, move) {
				const abilityHolder = this.effectState.target;
				if (attacker.isAlly(abilityHolder) || attacker.ignoringAbility() || !this.effectState.unnerved) return;
				if (!move.suppressedParadox) move.suppressedParadox = abilityHolder;
				else if (move.suppressedParadox !== abilityHolder) return;
				for (const paradox of ['faultyphoton', 'systempurge', 'onceuponatime', 'primitive', 'quarksurge', 
											'lightdrive', 'openingact', 'protosynthesis', 'quarkdrive', 'nanorepairs', 'firewall', 
											'weightoflife', 'circuitbreaker', 'ancientmarble', 'prehistorichunter', 'heatproofdrive']) {
					if (attacker.hasAbility(paradox)) {
						if (attacker?.volatiles[paradox]?.bestStat !== 'atk') return;
						this.debug('Dyschronometria nullify');
						return this.chainModify([3151, 4096]);
					}
				}
		},
		onAnyModifyDefPriority: 5,
		onAnyModifyDef(atk, attacker, defender, move) {
				const abilityHolder = this.effectState.target;
				if (defender.isAlly(abilityHolder) || defender.ignoringAbility() || !this.effectState.unnerved) return;
				if (!move.suppressedParadox) move.suppressedParadox = abilityHolder;
				else if (move.suppressedParadox !== abilityHolder) return;
				for (const paradox of ['faultyphoton', 'systempurge', 'onceuponatime', 'primitive', 'quarksurge', 
											'lightdrive', 'openingact', 'protosynthesis', 'quarkdrive', 'nanorepairs', 'firewall',
											'weightoflife', 'circuitbreaker', 'ancientmarble', 'prehistorichunter', 'heatproofdrive']) {
					if (defender.hasAbility(paradox)) {
						if (defender?.volatiles[paradox]?.bestStat !== 'def') return;
						this.debug('Dyschronometria nullify');
						return this.chainModify([3151, 4096]);
					}
				}
		},
		onAnyModifySpAPriority: 4,
		onAnyModifySpA(atk, attacker, defender, move) {
				const abilityHolder = this.effectState.target;
				if (attacker.isAlly(abilityHolder) || attacker.ignoringAbility() || !this.effectState.unnerved) return;
				if (!move.suppressedParadox) move.suppressedParadox = abilityHolder;
				else if (move.suppressedParadox !== abilityHolder) return;
				for (const paradox of ['faultyphoton', 'systempurge', 'onceuponatime', 'primitive', 'quarksurge', 
											'lightdrive', 'openingact', 'protosynthesis', 'quarkdrive', 'nanorepairs', 'firewall', 
											'weightoflife', 'circuitbreaker', 'ancientmarble', 'prehistorichunter', 'heatproofdrive']) {
					if (attacker.hasAbility(paradox)) {
						if (attacker?.volatiles[paradox]?.bestStat !== 'spa') return;
						this.debug('Dyschronometria nullify');
						return this.chainModify([3151, 4096]);
					}
				}
		},
		onAnyModifySpDPriority: 5,
		onAnyModifySpD(atk, attacker, defender, move) {
				const abilityHolder = this.effectState.target;
				if (defender.isAlly(abilityHolder) || defender.ignoringAbility() || !this.effectState.unnerved) return;
				if (!move.suppressedParadox) move.suppressedParadox = abilityHolder;
				else if (move.suppressedParadox !== abilityHolder) return;
				for (const paradox of ['faultyphoton', 'systempurge', 'onceuponatime', 'primitive', 'quarksurge', 
											'lightdrive', 'openingact', 'protosynthesis', 'quarkdrive', 'nanorepairs', 'firewall', 
											'weightoflife', 'circuitbreaker', 'ancientmarble', 'prehistorichunter', 'heatproofdrive']) {
					if (defender.hasAbility(paradox)) {
						if (defender?.volatiles[paradox]?.bestStat !== 'spd') return;
						this.debug('Dyschronometria nullify');
						return this.chainModify([3151, 4096]);
					}
				}
		},
		//Speed suppression in the other Paradox abilities
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Dyschronometria');
			this.effectState.unnerved = true;
		},
		onStart(pokemon) {
			if (this.effectState.unnerved) return;
			this.add('-ability', pokemon, 'Dyschronometria');
			this.effectState.unnerved = true;
		},
		onEnd() {
			this.effectState.unnerved = false;
		},
		flags: {breakable: 1, failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Dyschronometria",
		rating: 3,
	},
	
	firewall: {
	  shortDesc: "Quark Drive + x1.5 power to Fire-type moves when active",
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.volatiles['firewall']) {
				this.debug('Firewall Fire boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.volatiles['firewall']) {
				this.debug('Firewall Fire boost');
				return this.chainModify(1.5);
			}
		},
		onTerrainChange(pokemon) {
			if (pokemon.transformed) return;
			if (this.field.isTerrain('electricterrain')) {
				pokemon.addVolatile('firewall');
			} else if (!pokemon.volatiles['firewall']?.fromBooster) {
				pokemon.removeVolatile('firewall');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['firewall'];
			this.add('-end', pokemon, 'Quark Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Firewall', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Firewall');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Firewall atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Firewall def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Firewall spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Firewall spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				for (const target of pokemon.foes()) {
					if (target.hasAbility('dyschronometria')) {
						this.debug('Dyschronometria negating spe boost');
						return;
					}
				}
				this.debug('Firewall spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Firewall",
		rating: 3,
	},
	nanorepairs: {
	  shortDesc: "Quark Drive + Regenerator",
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onTerrainChange(pokemon) {
			if (pokemon.transformed) return;
			if (this.field.isTerrain('electricterrain')) {
				pokemon.addVolatile('nanorepairs');
			} else if (!pokemon.volatiles['nanorepairs']?.fromBooster) {
				pokemon.removeVolatile('nanorepairs');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['nanorepairs'];
			this.add('-end', pokemon, 'Quark Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Nanorepairs', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Nanorepairs');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Nanorepairs atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Nanorepairs def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Nanorepairs spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Nanorepairs spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				for (const target of pokemon.foes()) {
					if (target.hasAbility('dyschronometria')) {
						this.debug('Dyschronometria negating spe boost');
						return;
					}
				}
				this.debug('Nanorepairs spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Nanorepairs",
		rating: 3,
	},
	ironsights: {
		shortDesc: "x1.33 Atk/SpA/Acc.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk) {
			return this.chainModify([5461, 4096]);
		},
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.chainModify([5461, 4096]);
		},
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('ironsights - enhancing accuracy');
			return this.chainModify([5461, 4096]);
		},
		flags: {},
		name: "Iron Sights",
		rating: 3,
	},
	rejuvenate: {
	  shortDesc: "On switch-out: If no status then heal 1/3 Max HP, else heal status",
		onCheckShow(pokemon) {
			// This is complicated
			// For the most part, in-game, it's obvious whether or not Natural Cure activated,
			// since you can see how many of your opponent's pokemon are statused.
			// The only ambiguous situation happens in Doubles/Triples, where multiple pokemon
			// that could have Natural Cure switch out, but only some of them get cured.
			if (pokemon.side.active.length === 1/*) return;
			if (*/|| pokemon.showCure === true || pokemon.showCure === false) return;

			const cureList = [];
			let noCureCount = 0;
			for (const curPoke of pokemon.side.active) {
				// pokemon not statused
				if (!curPoke || !curPoke.status) {
					// this.add('-message', "" + curPoke + " skipped: not statused or doesn't exist");
					continue;
				}
				if (curPoke.showCure) {
					// this.add('-message', "" + curPoke + " skipped: Rejuvenate already known");
					continue;
				}
				const species = curPoke.species;
				// pokemon can't get Natural Cure
				if (!Object.values(species.abilities).includes('Natural Cure') && !Object.values(species.abilities).includes('Natural Pressures') && !Object.values(species.abilities).includes('Rejuvenate')) {
					// this.add('-message', "" + curPoke + " skipped: no Rejuvenate");
					continue;
				}
				// pokemon's ability is known to be Natural Cure
				if (!species.abilities['1'] && !species.abilities['H']) {
					// this.add('-message', "" + curPoke + " skipped: only one ability");
					continue;
				}
				// pokemon isn't switching this turn
				if (curPoke !== pokemon && !this.queue.willSwitch(curPoke)) {
					// this.add('-message', "" + curPoke + " skipped: not switching");
					continue;
				}

				if (curPoke.hasAbility(['naturalcure','rejuvenate','naturalpressures'])) {
					// this.add('-message', "" + curPoke + " confirmed: could be Rejuvenate (and is)");
					cureList.push(curPoke);
				} else {
					// this.add('-message', "" + curPoke + " confirmed: could be Rejuvenate (but isn't)");
					noCureCount++;
				}
			}

			if (!cureList.length || !noCureCount) {
				// It's possible to know what pokemon were cured
				for (const pkmn of cureList) {
					pkmn.showCure = true;
				}
			} else {
				// It's not possible to know what pokemon were cured

				// Unlike a -hint, this is real information that battlers need, so we use a -message
				this.add('-message', "(" + cureList.length + " of " + pokemon.side.name + "'s pokemon " + (cureList.length === 1 ? "was" : "were") + " cured by Natural Cure.)");

				for (const pkmn of cureList) {
					pkmn.showCure = false;
				}
			}
		},
		onSwitchOut(pokemon) {
			if (!pokemon.status) {
				pokemon.heal(pokemon.baseMaxhp / 3);
				return;
			}
			if (pokemon.showCure === undefined) pokemon.showCure = true;
			if (pokemon.showCure) this.add('-curestatus', pokemon, pokemon.status, '[from] ability: Rejuvenate');
			pokemon.setStatus('');
			// only reset .showCure if it's false
			// (once you know a Pokemon has Natural Cure, its cures are always known)
			pokemon.showCure ||= undefined;
		},
		flags: {},
		name: "Rejuvenate",
		rating: 3,
	},
	electromagneticveil: {
	  shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Electric moves or burned; Electric & Burn immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.heal(target.baseMaxhp/4)) {
					this.add('-immune', target, '[from] ability: Electromagnetic Veil');
				}
				return null;
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status && !this.heal(target.baseMaxhp/4)) {
				this.add('-immune', target, '[from] ability: Electromagnetic Veil');
			}
			return false;
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Electromagnetic Veil');
				this.heal(target.baseMaxhp/4);
				pokemon.cureStatus();
			}
		},
		flags: {breakable: 1},
		name: "Electromagnetic Veil",
		rating: 3,
	},
	risingtension: {
	  shortDesc: "Levitate + Cursed Body",
		onDamagingHit(damage, target, source, move) {
			if (!source.volatiles['disable']/*) return;
			if (*/ && !move.isFutureMove/*) {
				if (*/&& this.randomChance(3, 10)) {
					source.addVolatile('disable', this.effectState.target);
				}
			//}
		},
		flags: {breakable: 1},
		name: "Rising Tension",
		rating: 3,
	},
	grindset: {
	  shortDesc: "While active, own Attack is 1.5x, other Pokemon's Attack is 0.5.",
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Grindset');
			this.add('-message', `The grind never stops for ${pokemon.name}, lowering the foe's Attack and raising its own!`);
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk) {
			return this.chainModify(1.5);
		},
		onAnyModifyAtk(atk, source, target, move) {
			if (source.hasAbility('Grindset')) return;
			const abilityHolder = this.effectState.target;
			if (!move.ruinedAtk) move.ruinedAtk = abilityHolder;
			else if (move.ruinedAtk !== abilityHolder) return;
			this.debug('Grindset Atk drop');
			return this.chainModify(0.5);
		},
		flags: {},
		name: "Grindset",
		rating: 3,
	},
	shockfactor: {
	  shortDesc: "Static + Intimidate",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Shock Factor', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact'] && this.randomChance(3, 10)) {
					source.trySetStatus('par', target);
			}
		},
		flags: {},
		name: "Shock Factor",
		rating: 3,
	},
	shellshock: {
	  shortDesc: "Effects of Rock Head. Moves with Recoil have a 30% chance of inflicting paralysis.",
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		onModifyMove(move) {
			if (!move || !(move.recoil || move.hasCrashDamage) || move.target === 'self') return;
			(move.secondaries ||= []).push({
				chance: 30,
				status: 'par',
				ability: this.dex.abilities.get('shellshock'),
			});
		},
		flags: {},
		name: "Shell Shock",
		rating: 3,
	},
	circuitbreaker: {
	  shortDesc: "Quark Drive + Mold Breaker",
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
			if (!this.field.isTerrain('electricterrain')) {
				this.add('-ability', pokemon, 'Circuit Breaker');
				this.add('-message', `${pokemon.name} breaks the circuit!`);
			}
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
		onTerrainChange(pokemon) {
			if (pokemon.transformed) return;
			if (this.field.isTerrain('electricterrain')) {
				pokemon.addVolatile('circuitbreaker');
			} else if (!pokemon.volatiles['circuitbreaker']?.fromBooster) {
				pokemon.removeVolatile('circuitbreaker');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['circuitbreaker'];
			this.add('-end', pokemon, 'Quark Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Circuit Breaker', '[fromitem]');
					this.add('-message', `${pokemon.name} used its Booster Energy to break the circuit harder!`);
				} else {
					this.add('-activate', pokemon, 'ability: Circuit Breaker');
					this.add('-message', `The Electric Terrain lets ${pokemon.name} break the circuit harder!`);
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Circuit Breaker atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Circuit Breaker def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Circuit Breaker spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Circuit Breaker spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				for (const target of pokemon.foes()) {
					if (target.hasAbility('dyschronometria')) {
						this.debug('Dyschronometria negating spe boost');
						return;
					}
				}
				this.debug('Circuit Breaker spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Circuit Breaker",
		rating: 3,
	},
	weightoflife: {
	  shortDesc: "Heavy Metal + Protosynthesis. Protosynthesis activates if the user is heavier.",
		onModifyWeightPriority: 1,
		onModifyWeight(weighthg) {
			return weighthg * 2;
		},
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday')) {
				pokemon.addVolatile('weightoflife');
			} else if (!pokemon.volatiles['weightoflife']?.fromBooster) {
				pokemon.removeVolatile('weightoflife');
			}
		},
		onUpdate(pokemon) {
			if (!(pokemon.volatiles['weightoflife']?.fromBooster || pokemon.volatiles['weightoflife']?.fromWeightDiff) && !this.field.isWeather('sunnyday')) {
				pokemon.removeVolatile('weightoflife');
			}
		},
		onAnyPrepareHit(source, target, move) {
			if (move.hasBounced || source === target) return;
			const user = this.effectState.target;
			if (user.volatiles['weightoflife'] && !user.volatiles['weightoflife'].fromWeightDiff) return;
			var yourweight;
			if (source === user) {
				yourweight = target.getWeight();
			} else if (target === user) {
				yourweight = source.getWeight();
			} else return;
			
			if (user.getWeight() > yourweight) {
				if (user.volatiles['weightoflife']) return;
				user.addVolatile('weightoflife');
				user.volatiles['weightoflife'].fromWeightDiff = true;
			} else if (user.volatiles['weightoflife']) {
				if (this.field.isWeather('sunnyday')) {
					user.volatiles['weightoflife'].fromWeightDiff = false;
				} else {
					user.removeVolatile('weightoflife');
				}
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['weightoflife'];
			this.add('-end', pokemon, 'Protosynthesis', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Weight of Life', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Weight of Life');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Weight of Life atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Weight of Life def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Weight of Life spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Weight of Life spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				for (const target of pokemon.foes()) {
					if (target.hasAbility('dyschronometria')) {
						this.debug('Dyschronometria negating spe boost');
						return;
					}
				}
				this.debug('Weight of Life spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Weight of Life",
		rating: 1,
		num: 135,
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
	naturalpressures: {
	  shortDesc: "Natural Cure + Pressure",
		onCheckShow(pokemon) {
			// This is complicated
			// For the most part, in-game, it's obvious whether or not Natural Pressures activated,
			// since you can see how many of your opponent's pokemon are statused.
			// The only ambiguous situation happens in Doubles/Triples, where multiple pokemon
			// that could have Natural Pressures switch out, but only some of them get cured.
			if (pokemon.side.active.length === 1/*) return;
			if (*/|| pokemon.showCure === true || pokemon.showCure === false) return;

			const cureList = [];
			let noCureCount = 0;
			for (const curPoke of pokemon.side.active) {
				// pokemon not statused
				if (!curPoke || !curPoke.status) {
					// this.add('-message', "" + curPoke + " skipped: not statused or doesn't exist");
					continue;
				}
				if (curPoke.showCure) {
					// this.add('-message', "" + curPoke + " skipped: Natural Pressures already known");
					continue;
				}
				const species = curPoke.species;
				// pokemon can't get Natural Pressures
				if (!Object.values(species.abilities).includes('Natural Cure') && !Object.values(species.abilities).includes('Natural Pressures') && !Object.values(species.abilities).includes('Rejuvenate')) {
					// this.add('-message', "" + curPoke + " skipped: no Natural Pressures");
					continue;
				}
				// pokemon's ability is known to be Natural Pressures
				if (!species.abilities['1'] && !species.abilities['H']) {
					// this.add('-message', "" + curPoke + " skipped: only one ability");
					continue;
				}
				// pokemon isn't switching this turn
				if (curPoke !== pokemon && !this.queue.willSwitch(curPoke)) {
					// this.add('-message', "" + curPoke + " skipped: not switching");
					continue;
				}

				if (curPoke.hasAbility(['naturalpressures','naturalcure','rejuvenate'])) {
					// this.add('-message', "" + curPoke + " confirmed: could be Natural Pressures (and is)");
					cureList.push(curPoke);
				} else {
					// this.add('-message', "" + curPoke + " confirmed: could be Natural Pressures (but isn't)");
					noCureCount++;
				}
			}

			if (!cureList.length || !noCureCount) {
				// It's possible to know what pokemon were cured
				for (const pkmn of cureList) {
					pkmn.showCure = true;
				}
			} else {
				// It's not possible to know what pokemon were cured

				// Unlike a -hint, this is real information that battlers need, so we use a -message
				this.add('-message', "(" + cureList.length + " of " + pokemon.side.name + "'s pokemon " + (cureList.length === 1 ? "was" : "were") + " cured by Natural Cure.)");

				for (const pkmn of cureList) {
					pkmn.showCure = false;
				}
			}
		},
		onSwitchOut(pokemon) {
			if (!pokemon.status) return;

			// if pokemon.showCure is undefined, it was skipped because its ability
			// is known
			if (pokemon.showCure === undefined) pokemon.showCure = true;

			if (pokemon.showCure) this.add('-curestatus', pokemon, pokemon.status, '[from] ability: Natural Pressures');
			pokemon.setStatus('');

			// only reset .showCure if it's false
			// (once you know a Pokemon has Natural Pressures, its cures are always known)
			pokemon.showCure ||= undefined;
		},
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Natural Pressures');
		},
		onDeductPP(target, source) {
			if (target.side === source.side) return;
			return 1;
		},
		flags: {},
		name: "Natural Pressures",
		rating: 3,
	},
	vitalmetalbody: {
	  shortDesc: "Vital Spirit + Full Metal Body",
		onUpdate(pokemon) {
			if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'ability: Vital Metal Body');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'slp') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Vital Metal Body');
			}
			return false;
		},
		onBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: Vital Metal Body", "[of] " + target);
			}
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Vital Metal Body');
				return null;
			}
		},
		flags: {},
		name: "Vital Metal Body",
		rating: 3,
	},
	fortunomorphosis: {
	  shortDesc: "This Pokemon gains the Laser Focus effect when it takes a hit from an attack.",
	  onDamagingHitOrder: 1,
	  onDamagingHit(damage, target, source, move) {
			target.addVolatile('laserfocus');
		},
		flags: {},
		name: "Fortunomorphosis",
		rating: 3,
	},
	burningpetals: {
	  shortDesc: "This side's Fire-types can't have stats lowered or status inflicted by other Pokemon and this Pokemon can't be damaged by Fire-type moves; x1.5 power to own Fire-type moves if either is attempted.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('burningpetals')) {
					this.add('-immune', target, '[from] ability: Burning Petals');
				}
				return null;
			}
		},
		onAllyBoost(boost, target, source, effect) {
			if ((source && target === source) || !target.hasType('Fire')) return;
			let showMsg = false;
			let i: BoostName;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries) {
				const effectHolder = this.effectState.target;
				if (!effectHolder.addVolatile('burningpetals')) this.add('-block', target, 'ability: Burning Petals', '[of] ' + effectHolder);
			}
		},
		onAllySetStatus(status, target, source, effect) {
			if (source && target !== source && effect && effect.id !== 'yawn' && target.hasType('Fire')) {
				this.debug('interrupting setStatus with Burning Petals');
				if (effect.name === 'Synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
					const effectHolder = this.effectState.target;
					if (!effectHolder.addVolatile('burningpetals')) this.add('-block', target, 'ability: Burning Petals', '[of] ' + effectHolder);
				}
				return null;
			}
		},
		onAllyTryAddVolatile(status, target) {
			if (status.id === 'yawn' && target.hasType('Fire')) {
				this.debug('Burning Petals blocking yawn');
				const effectHolder = this.effectState.target;
				if (!effectHolder.addVolatile('burningpetals')) this.add('-block', target, 'ability: Burning Petals', '[of] ' + effectHolder);
				return null;
			}
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('burningpetals');
		},
		condition: {
			noCopy: true,
			onStart(target) {
				this.add('-start', target, 'ability: Burning Petals');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('burningpetals')) {
					this.debug('Burning Petals boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('burningpetals')) {
					this.debug('Burning Petals boost');
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Burning Petals', '[silent]');
			},
		},
		flags: {breakable: 1},
		name: "Burning Petals",
		rating: 3,
	},
	snowblind: {
	  shortDesc: "Snow Warning + Unseen Fist",
	   onStart(source) {
			this.field.setWeather('snow');
		},
		onModifyMove(move) {
			if (move.flags['contact']) delete move.flags['protect'];
		},
		flags: {},
		name: "Snowblind",
		rating: 3,
	},
	unvital: {
	  shortDesc: "Unaware + Vital Spirit",
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectState.target;
			if (unawareUser === pokemon) return;
			if (unawareUser === this.activePokemon) {
				if (pokemon !== this.activeTarget) return;
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			else if (pokemon === this.activePokemon && unawareUser === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['def'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'ability: Unvital');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'slp') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Unvital');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Unvital');
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Unvital",
		rating: 3,
	},
	ownluck: {
	  shortDesc: "This Pokemon has a +1 crit ratio and is immune to Intimidate and derivatives thereof.",
		onModifyCritRatio(critRatio) {
			return critRatio + 1;
		},
		onTryBoost(boost, target, source, effect) {
			if (['Intimidate','Mad Cow','Forest Fury','Shock Factor','Daunting Storm','Toxic Attitude'].includes(effect.name) && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Own Luck', '[of] ' + target);
			} else if (effect.name === 'Fishy Threat' && boost.spe) {
				delete boost.spe;
				this.add('-fail', target, 'unboost', 'Speed', '[from] ability: Own Luck', '[of] ' + target);
			}
		},
		flags: {},
		name: "Own Luck",
		rating: 3,
	},
	armourlock: {
	  shortDesc: "This Pokemon can neither be critted nor have its item removed.",
		onTakeItem(item, pokemon, source) {
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if (!pokemon.hp || pokemon.item === 'stickybarb') return;
			if ((source && source !== pokemon) || this.activeMove.id === 'knockoff') {
				this.add('-activate', pokemon, 'ability: Armour Lock');
				return false;
			}
		},
		onCriticalHit: false,
		flags: {breakable: 1},
		name: "Armour Lock",
		rating: 3,
	},
	glacialfocus: {
	  shortDesc: "This Pokemon can't be flinched or have its Evasion lowered.",
		onBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.evasion && boost.evasion < 0) {
				delete boost.evasion;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "accuracy", "[from] ability: Glacial Focus", "[of] " + target);
				}
			}
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		flags: {breakable: 1},
		name: "Glacial Focus",
		rating: 3,
	},
	slushie: {
	  shortDesc: "Mold Breaker + Slush Rush",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Slushie');
			this.add('-message', `${pokemon.name} is drinking a slushie!`);
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
		onModifySpe(spe, pokemon) {
			if (['hail', 'snow'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		flags: {},
		name: "Slushie",
		rating: 3,
	},
	sandwrath: {
	  shortDesc: "Sand Stream + Sheer Force",
		onStart(source) {
			this.field.setWeather('sandstorm');
		},
		onModifyMove(move, pokemon) {
			if (move.secondaries) {
				delete move.secondaries;
				// Technically not a secondary effect, but it is negated
				delete move.self;
				if (move.id === 'clangoroussoulblaze') delete move.selfBoost;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				move.hasSheerForce = true;
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, target, move) {
			if (move.hasSheerForce) return this.chainModify([5325, 4096]);
		},
		flags: {},
		name: "Sand Wrath",
		rating: 3,
	},
	pondweed: {
	  shortDesc: "Grass/Water immunity, +1 Attack if hit by either",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && ['Grass','Water'].includes(move.type)) {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Pondweed');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (source === this.effectState.target || !target.isAlly(source)) return;
			if (move.type === 'Grass' || move.type === 'Water') {
				this.boost({atk: 1}, this.effectState.target);
			}
		},
		flags: {breakable: 1},
		name: "Pondweed",
		rating: 3,
	},
	wetskin: {
	  shortDesc: "Hydration + Torrent",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Wet Skin boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Wet Skin boost');
				return this.chainModify(1.5);
			}
		},
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.status && ['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				this.debug('wetskin');
				this.add('-activate', pokemon, 'ability: Wet Skin');
				pokemon.cureStatus();
			}
		},
		flags: {},
		name: "Wet Skin",
		rating: 3,
	},
	friskexchange: {
	  shortDesc: "Frisk + Thermal Exchange",
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted || !target.item) continue;
				this.add('-item', target, target.getItem().name, '[from] ability: Frisk Exchange', '[of] ' + pokemon, '[identify]');
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Fire') {
				this.boost({atk: 1});
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Frisk Exchange');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Frisk Exchange');
			}
			return false;
		},
		flags: {breakable: 1},
		name: "Frisk Exchange",
		rating: 3,
	},
	freeflight: {
	  shortDesc: "Libero + Levitate",
		onPrepareHit(source, target, move) {
			if (this.effectState.libero/*) return;
			if (*/|| move.hasBounced || move.isFutureMove || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type && source.setType(type)) {
				this.effectState.libero = true;
				this.add('-start', source, 'typechange', type, '[from] ability: Free Flight');
			}
		},
		onSwitchIn() {
			delete this.effectState.libero;
		},
		flags: {breakable: 1},
		name: "Free Flight",
		rating: 3,
	},
	pillage: {
		name: "Pillage",
		shortDesc: "On switch-in, swaps ability with the opponent.",
		onSwitchIn(pokemon) {
			this.effectState.switchingIn = true;
		},
		onStart(pokemon) {
			if (pokemon.foes().some(
				foeActive => foeActive && foeActive.isAdjacent(pokemon) && foeActive.ability === 'noability'
			) || pokemon.species.id !== 'zoinkazenta') {
				this.effectState.gaveUp = true;
			}
		},
		onUpdate(pokemon) {
			if (!pokemon.isStarted || this.effectState.gaveUp || !this.effectState.switchingIn) return;
			const possibleTargets = pokemon.foes().filter(foeActive => foeActive && !foeActive.getAbility().flags['notrace']
				&& !foeActive.getAbility().flags['failskillswap'] && foeActive.isAdjacent(pokemon));
			if (!possibleTargets.length) return;
			const rand = (possibleTargets.length > 1) ? this.random(possibleTargets.length) : 0;
			const target = possibleTargets[rand];
			const pillageAbil = pokemon.getAbility();
			const ability = target.getAbility();
			if (!this.runEvent('SetAbility', target, pokemon, this.effect, pillageAbil)
			   || !this.runEvent('SetAbility', pokemon, pokemon, this.effect, ability)) return;
			this.add('-ability', pokemon, 'Pillage');
			this.add('-activate', pokemon, 'move: Skill Swap', ability, pillageAbil, '[of] ' + target);
			this.singleEvent('End', pillageAbil, pillageAbil.abilityState, pokemon);
			this.singleEvent('End', ability, ability.abilityState, target);
			pokemon.ability = ability.id
			pokemon.abilityState = {id: this.toID(pokemon.ability), target: pokemon};
			target.ability = pillageAbil.id;
			target.abilityState = {id: this.toID(pillageAbil.id), target: target};
			this.singleEvent('Start', ability, pokemon.abilityState, pokemon);
			this.singleEvent('Start', pillageAbil, target.abilityState, target);
			
		},
		flags: {failroleplay: 1, noentrain: 1, notrace: 1},
		rating: 5,
	},
	fatfingers: {
	  shortDesc: "Long Reach + Thick Fat",
		onModifyMove(move) {
			delete move.flags['contact'];
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Fat Fingers weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Fat Fingers weaken');
				return this.chainModify(0.5);
			}
		},
		flags: {breakable: 1},
		name: "Fat Fingers",
		rating: 3,
	},
	hourglass: {
	  shortDesc: "Mirror Armor + Sand Rush",
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(2);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onTryBoost(boost, target, source, effect) {
			// Don't bounce self stat changes, or boosts that have already bounced
			if (!source || target === source || !boost || effect.name === 'Hourglass') return;
			let b: BoostID;
			for (b in boost) {
				if (boost[b]! < 0 && target.boosts[b] > -6) {
					const negativeBoost: SparseBoostsTable = {};
					negativeBoost[b] = boost[b];
					delete boost[b];
					if (source.hp) {
						this.add('-ability', target, 'Hourglass');
						this.boost(negativeBoost, source, target, null, true);
					}
				}
			}
		},
		flags: {breakable: 1},
		name: "Hourglass",
		rating: 3,
	},
	fieldday: {
	  shortDesc: "If Grassy Terrain is active, this Pokemon's Speed is doubled.",
		onModifySpe(spe) {
			if (this.field.isTerrain('grassyterrain')) {
				return this.chainModify(2);
			}
		},
		flags: {},
		name: "Field Day",
		rating: 3,
	},
	forceofnature: {
	  shortDesc: "Grassy Surge + Sheer Force.",
		onStart(source) {
			this.field.setTerrain('grassyterrain');
		},
		onModifyMove(move, pokemon) {
			if (move.secondaries) {
				delete move.secondaries;
				// Technically not a secondary effect, but it is negated
				delete move.self;
				if (move.id === 'clangoroussoulblaze') delete move.selfBoost;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				move.hasSheerForce = true;
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, target, move) {
			if (move.hasSheerForce) return this.chainModify([5325, 4096]);
		},
		flags: {},
		name: "Force of Nature",
	},
	airbornearmor: {
		shortDesc: "Prism Armor + Levitate",
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Airborne Armor neutralize');
				return this.chainModify(0.75);
			}
		},
		flags: {},
		name: "Airborne Armor",
		rating: 3,
	},
	bleedingedge: {
	  shortDesc: "Mold Breaker + Technician",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Bleeding Edge');
			this.add('-message', `${pokemon.name} breaks the mold!`);
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
			this.debug('Base Power: ' + basePowerAfterMultiplier);
			if (basePowerAfterMultiplier <= 60) {
				this.debug('Bleeding Edge boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Bleeding Edge",
		rating: 3,
	},
	ancientmarble: {
	  shortDesc: "Protosynthesis + Sharpness",
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['slicing']) {
				this.debug('Ancient Marble boost');
				return this.chainModify(1.5);
			}
		},
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday')) {
				pokemon.addVolatile('ancientmarble');
			} else if (!pokemon.volatiles['ancientmarble']?.fromBooster) {
				pokemon.removeVolatile('ancientmarble');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['ancientmarble'];
			this.add('-end', pokemon, 'Protosynthesis', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Ancient Marble', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Ancient Marble');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Ancient Marble atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Ancient Marble def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Ancient Marble spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Ancient Marble spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				for (const target of pokemon.foes()) {
					if (target.hasAbility('dyschronometria')) {
						this.debug('Dyschronometria negating spe boost');
						return;
					}
				}
				this.debug('Ancient Marble spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Ancient Marble",
		rating: 3,
	},
	spongeofruin: {
	  shortDesc: "Beads of Ruin + Water Absorb",
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Sponge of Ruin');
			this.add('-message', `${pokemon.name}'s Sponge of Ruin weakened the Sp. Def of all surrounding Pokémon!`);
		},
		onAnyModifySpD(spd, target, source, move) {
			if (target.hasAbility(['Sponge of Ruin', 'Beads of Ruin'])) return;
			const abilityHolder = this.effectState.target;
			if (!move.ruinedSpD?.hasAbility(['Sponge of Ruin', 'Beads of Ruin'])) move.ruinedSpD = abilityHolder;
			else if (move.ruinedSpD !== abilityHolder) return;
			this.debug('Sponge of Ruin SpD drop');
			return this.chainModify(0.75);
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Sponge of Ruin');
				}
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Sponge of Ruin",
		rating: 3,
	},
	overwhelming: {
	  shortDesc: "Magic Guard + Sheer Force",
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		onModifyMove(move, pokemon) {
			if (move.secondaries) {
				delete move.secondaries;
				// Technically not a secondary effect, but it is negated
				delete move.self;
				if (move.id === 'clangoroussoulblaze') delete move.selfBoost;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				move.hasSheerForce = true;
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, target, move) {
			if (move.hasSheerForce) return this.chainModify([5325, 4096]);
		},
		flags: {},
		name: "Overwhelming",
		rating: 3,
	},
	prehistorichunter: {
	  shortDesc: "Protosynthesis + Gulp Missile; Activating one also activates the other",
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onDamagingHit(damage, target, source, move) {
			if (!source.hp || !source.isActive || target.transformed || target.isSemiInvulnerable()) return;
			if (['screamcormorantgulping', 'screamcormorantgorging'].includes(target.species.id)) {
				this.damage(source.baseMaxhp / 4, source, target);
				if (target.species.id === 'screamcormorantgulping') {
					this.boost({def: -1}, source, target, null, true);
				} else {
					source.trySetStatus('par', target, move);
				}
				target.formeChange('screamcormorant', move);
				delete target.volatiles['prehistorichunter'];
			}
		},
		// The Dive part of this mechanic is implemented in Dive's `onTryMove` in moves.ts
		onSourceTryPrimaryHit(target, source, effect) {
			if (
				effect?.id === 'surf' && source.hasAbility('prehistorichunter') &&
				source.species.name === 'Scream Cormorant' && !source.transformed
			) {
				const forme = source.hp <= source.maxhp / 2 ? 'screamcormorantgorging' : 'screamcormorantgulping';
				source.formeChange(forme, effect);
				source.addVolatile('prehistorichunter');				
			}
		},
		onWeatherChange(pokemon) {
			// if (pokemon.transformed) return;
			const forme = pokemon.hp <= pokemon.maxhp / 2 ? 'screamcormorantgorging' : 'screamcormorantgulping';
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday')) {
				pokemon.addVolatile('prehistorichunter');
				pokemon.formeChange(forme, this.effect, false, '[msg]');
			} else if (!pokemon.volatiles['prehistorichunter']?.fromBooster) {
				pokemon.removeVolatile('prehistorichunter');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['prehistorichunter'];
			this.add('-end', pokemon, 'Protosynthesis', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				const forme = pokemon.hp <= pokemon.maxhp / 2 ? 'screamcormorantgorging' : 'screamcormorantgulping';
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Prehistoric Hunter', '[fromitem]');
					this.add('-message', `${pokemon.name} used its Booster Energy to locate nearby prey!`);
					pokemon.formeChange(forme, this.effect, false, '[msg]');
				} else {
					this.add('-activate', pokemon, 'ability: Prehistoric Hunter');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Prehistoric Hunter atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Prehistoric Hunter def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Prehistoric Hunter spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Prehistoric Hunter spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				for (const target of pokemon.foes()) {
					if (target.hasAbility('dyschronometria')) {
						this.debug('Dyschronometria negating spe boost');
						return;
					}
				}
				this.debug('Prehistoric Hunter spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1, notransform: 1},
		name: "Prehistoric Hunter",
		rating: 3,
	},
	lawnmowerofruin: {
	   shortDesc: "Sap Sipper + Vessel of Ruin",
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Lawnmower of Ruin');
			this.add('-message', `${pokemon.name}'s Lawnmower of Ruin weakened the Sp. Atk of all surrounding Pokémon!`);
		},
		onAnyModifySpA(spa, source, target, move) {
			if (source.hasAbility(['Lawnmower of Ruin', 'Vessel of Ruin'])) return;
			const abilityHolder = this.effectState.target;
			if (!move.ruinedSpA) move.ruinedSpA = abilityHolder;
			else if (move.ruinedSpA !== abilityHolder) return;
			this.debug('Lawnmower of Ruin SpA drop');
			return this.chainModify(0.75);
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Grass') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Lawnmower of Ruin');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (source === this.effectState.target || !target.isAlly(source) || move.type !== 'Grass') return;
			this.boost({atk: 1}, this.effectState.target);
		},
		flags: {breakable: 1},
		name: "Lawnmower of Ruin",
	},
	barbedchain: {
	   shortDesc: "This Pokemon’s contact moves do an additional 1/8 of the target’s max HP in damage.",
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Toxic Chain's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak') || !target.hp || !this.checkMoveMakesContact(move, target, source)) return; 
			this.damage(target.baseMaxhp / 8, target, source)
		},
		name: "Barbed Chain",
	},
	steamyscales: {
	   shortDesc: "Steam Engine + Multiscale",
		onDamagingHit(damage, target, source, move) {
			if (['Water', 'Fire'].includes(move.type)) {
				this.boost({spe: 6});
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.hp >= target.maxhp) {
				this.debug('Steamy Scales weaken');
				return this.chainModify(0.5);
			}
		},
		flags: {breakable: 1},
		name: "Steamy Scales",
	},
	marvelsteam: {
	   shortDesc: "When hit by a damaging Water or Fire-type move, +6 to Def and Spe.",
		onDamagingHit(damage, target, source, move) {
			if (['Water', 'Fire'].includes(move.type)) {
				this.boost({def: 6, spe: 6});
			}
		},
		flags: {},
		name: "Marvel Steam",
	},
	hellkite: {
	   shortDesc: "Levitate effects + 1.5x power to Dragon and Ground moves.",
		//floatation under scripts.ts
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (['Dragon','Ground'].includes(move.type)) {
				this.debug('Hellkite boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (['Dragon','Ground'].includes(move.type)) {
				this.debug('Hellkite boost');
				return this.chainModify(1.5);
			}
		},
		flags: {breakable: 1},
		name: "Hellkite",
	},
	feistytempo: {
		shortDesc: "Guts + Own Tempo",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (attacker.status) {
				//Burn attack cut being ignored is in scripts.ts/actions
				return this.chainModify(1.5);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.volatiles['confusion']) {
				this.add('-activate', pokemon, 'ability: Feisty Tempo');
				pokemon.removeVolatile('confusion');
			}
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'confusion') return null;
		},
		onHit(target, source, move) {
			if (move?.volatileStatus === 'confusion') {
				this.add('-immune', target, 'confusion', '[from] ability: Feisty Tempo');
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (['Intimidate','Mad Cow','Forest Fury','Shock Factor','Daunting Storm','Toxic Attitude'].includes(effect.name) && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Feisty Tempo', '[of] ' + target);
			} else if (effect.name === 'Fishy Threat' && boost.spe) {
				delete boost.spe;
				this.add('-fail', target, 'unboost', 'Speed', '[from] ability: Feisty Tempo', '[of] ' + target);
			}
		},
		flags: {breakable: 1},
		name: "Feisty Tempo",
	},
	wellbakedflameorb: {
		shortDesc: "Guts + Well-Baked Body",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (attacker.status) {
				//Burn attack cut being ignored is in scripts.ts/actions
				return this.chainModify(1.5);
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.boost({def: 2})) {
					this.add('-immune', target, '[from] ability: Well-Baked Body');
				}
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Well-Baked Flame Orb",
	},
	honeymoon: {
		shortDesc: "Levitate + Honey Gather",
		// airborneness implemented in scripts.ts
		flags: {breakable: 1},
		name: "Honey Moon",
	},
	aircontrol: {
		shortDesc: "Levitate + Mind's Eye",
		// airborneness implemented in scripts.ts
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.accuracy && boost.accuracy < 0) {
				delete boost.accuracy;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "accuracy", "[from] ability: Air Control", "[of] " + target);
				}
			}
		},
		onModifyMovePriority: -5,
		onModifyMove(move) {
			move.ignoreEvasion = true;
			if ((move.ignoreImmunity ||= {}) !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
		},
		flags: {breakable: 1},
		name: "Air Control",
	},
	livelylocks: {
		shortDesc: "Copies opponent's stat changes to Speed on switch-in",
		onStart(pokemon) {
			//Currently because Costar bypasses sub Lively Locks too will bypass sub 
			
			//let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!target.boosts.spe) continue;
			//	if (!activated) {
			//		this.add('-ability', pokemon, 'Lively Locks', 'boost');
			//		activated = true;
			//	}
			//	if (target.volatiles['substitute']) {
			//		this.add('-immune', target);
			//	} else {
					this.boost({spe: target.boosts.spe}, pokemon);
					return;
			//	}
			}
		},
		flags: {},
		name: "Lively Locks",
	},
	angrybird: {
		shortDesc: "Defiant + Competitive",
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.isAlly(source)) {
				if (effect.id === 'stickyweb') {
					this.hint("Court Change Sticky Web counts as lowering your own Speed, and Angry Bird only affects stats lowered by foes.", true, source.side);
				}
				return;
			}
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					this.boost({atk: 2, spa: 2}, target, target, null, false, true);
					return;
				}
			}
		},
		flags: {},
		name: "Angry Bird",
	},
	sharpgoggles: {
		shortDesc: "Tinted Lens + Competitive",
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod < 0) {
				this.debug('Tinted Lens boost');
				return this.chainModify(2);
			}
		},
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.isAlly(source)) {
				if (effect.id === 'stickyweb') {
					this.hint("Court Change Sticky Web counts as lowering your own Speed, and Sharp Goggles/Competitive only affects stats lowered by foes.", true, source.side);
				}
				return;
			}
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					this.boost({spa: 2}, target, target, null, false, true);
					return;
				}
			}
		},
		flags: {},
		name: "Sharp Goggles",
	},
	winterstorm: {
		shortDesc: "Under snow, heal 6.25% of own max HP and damage opponents for 12.5% of their max HP at end of turn.",
		onWeather(target, source, effect) {
			if (effect.id === 'snow' || effect.id === 'hail') {
				this.heal(target.baseMaxhp / 16);
				for (const pokemon of target.foes()) {
					this.damage(pokemon.baseMaxhp / 8, pokemon, target);
				}
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		flags: {},
		name: "Winter Storm",
	},
	fishythreat: {
	  shortDesc: "On switch-in, inflict -2 Speed to opponents.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Fishy Threat', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spe: -2}, target, pokemon, null, true);
				}
			}
		},
		flags: {},
		name: "Fishy Threat",
		rating: 3.5,
	},
	heatproofdrive: {
	  shortDesc: "Heatproof + Quark Drive",
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Heatproof Drive Atk weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Heatproof Drive SpA weaken');
				return this.chainModify(0.5);
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect && effect.id === 'brn') {
				return damage / 2;
			}
		},
		
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onTerrainChange(pokemon) {
			if (pokemon.transformed) return;
			if (this.field.isTerrain('electricterrain')) {
				pokemon.addVolatile('heatproofdrive');
			} else if (!pokemon.volatiles['heatproofdrive']?.fromBooster) {
				pokemon.removeVolatile('heatproofdrive');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['heatproofdrive'];
			this.add('-end', pokemon, 'Quark Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Heatproof Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Heatproof Drive');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Quark Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Quark Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Quark Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Quark Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				for (const target of pokemon.foes()) {
					if (target.hasAbility('dyschronometria')) {
						this.debug('Dyschronometria negating spe boost');
						return;
					}
				}
				this.debug('Quark Drive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		flags: {breakable: 1, failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Heatproof Drive",
		rating: 4,
	},
	armorfist: {
		shortDesc: "x1.2 power to punch and priority moves (stacking); Own side is protected from the sort",
		onFoeTryMove(target, source, move) {
			const targetAllExceptions = ['perishsong', 'flowershield', 'rototiller'];
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}

			const armorTailHolder = this.effectState.target;
			if ((source.isAlly(armorTailHolder) || move.target === 'all') && (move.priority > 0.1 || move.flags['punch'])) {
				this.attrLastMove('[still]');
				this.add('cant', armorTailHolder, 'ability: Armor Fist', move, '[of] ' + target);
				return false;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch'] || move.priority > 0.1) {
				this.debug('Armor Fist boost');
				return this.chainModify([(move.priority > 0.1 && move.flags['punch']) ? 5898 : 4915, 4096]);
			}
		},
		flags: {breakable: 1},
		name: "Armor Fist",
	},
	mercurypulse: {
		shortDesc: "On switch-in, summons Rain Dance. During Rain Dance, Attack is 1.3333x.",
		onStart(pokemon) {
			if (this.field.setWeather('raindance')) {
				this.add('-activate', pokemon, 'Mercury Pulse', '[source]');
			} else if (this.field.isWeather('raindance')) {
				this.add('-activate', pokemon, 'ability: Mercury Pulse');
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				this.debug('Mercury boost');
				return this.chainModify([5461, 4096]);
			}
		},
		flags: {},
		name: "Mercury Pulse",
		rating: 4.5,
	},
	firedrinker: {
		shortDesc: "Sap Sipper + Blaze. Sap Sipper also activates against Fire-type moves.",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && ['Fire','Grass'].includes(move.type)) {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Fire Drinker');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (source === this.effectState.target || !target.isAlly(source)) return;
			if (['Fire','Grass'].includes(move.type)) {
				this.boost({atk: 1}, this.effectState.target);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Fire Drinker boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Fire Drinker boost');
				return this.chainModify(1.5);
			}
		},
		flags: {breakable: 1},
		name: "Fire Drinker",
	},
	minddomain: {
		shortDesc: "Competitive + Psychic Surge. Competitive also summons Psychic Terrain.",
		onStart(source) {
			this.field.setTerrain('psychicterrain');
		},
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.isAlly(source)) {
				if (effect.id === 'stickyweb') {
					this.hint("Court Change Sticky Web counts as lowering your own Speed, and Mind Domain/Competitive only affects stats lowered by foes.", true, source.side);
				}
				return;
			}
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					this.boost({spa: 2}, target, target, null, false, true);
					this.field.setTerrain('psychicterrain');
					return;
				}
			}
		},
		flags: {},
		name: "Mind Domain",
		rating: 4,
	},
	forcedfencer: {
		shortDesc: "Pressure + Stance Change",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Forced Fencer');
		},
		onDeductPP(target, source) {
			if (target.isAlly(source)) return;
			return 1;
		},
		onModifyMovePriority: 1,
		onModifyMove(move, attacker, defender) {
			if (attacker.species.baseSpecies !== 'Deoxyslash-Speed' || attacker.transformed) return;
			let targetForme;
			if (move.id === 'kingsshield') {
				targetForme = 'Deoxyslash-Speed';
			} else if (move.category !== 'Status') {
				targetForme = 'Deoxyslash-Speed-Blade';
			} else {
				return;
			}
		
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Forced Fencer",
		rating: 4,
	},
	//Introduced with FEUU
	stormclinic: {
	  shortDesc: "Regenerator + Wind Rider",
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
			const pokemon = this.effectState.target;
			if (sideCondition.id === 'tailwind') {
				this.boost({atk: 1}, pokemon, pokemon);
			}
		},
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		flags: {breakable: 1},
		name: "Storm Clinic",
	},
	ultraface: {
		shortDesc: "Eisephalon: Change to No Face form on KO; Reverts in Snow",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move' && source.species.id === 'eisephalon') {
				source.formeChange('Eisephalon-No-Face', this.effect, true);
			}
		},
		onWeatherChange(pokemon, source, sourceEffect) {
			// snow/hail resuming because Cloud Nine/Air Lock ended does not trigger Ice Face
			if ((sourceEffect as Ability)?.suppressWeather || !pokemon.hp) return;
			if (this.field.isWeather(['hail', 'snow']) && pokemon.species.id === 'eisephalonnoface') {
				this.add('-activate', pokemon, 'ability: Ultra Face');
				pokemon.formeChange('Eisephalon', this.effect, true);
			}
		},
		flags: {
			failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1,
			notransform: 1,
		},
		name: "Ultra Face",
		rating: 3.5,
		num: 224,
	},
	emperorsclothes: {
		shortDesc: "Deal 10% bonus damage for each hit taken (up to 50%)",
		onStart(pokemon) {
			let attacked = pokemon.timesAttacked;
			if (attacked > 0) {
				this.effectState.fallen = attacked > 5 ? 5 : attacked;
				this.add('-start', pokemon, `fallen${this.effectState.fallen}`, '[silent]');
			} else {
				this.effectState.fallen = 0;
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (this.effectState.fallen >= 5) return;
			if (!move.isMax && !move.flags['futuremove'] && move.id !== 'struggle') {
				if (this.effectState.fallen) {
					this.add('-end', target, `fallen${this.effectState.fallen}`, '[silent]');
				}
				this.effectState.fallen++;
				this.add('-activate', target, 'ability: Emperor\'s Clothes');
				this.add('-start', target, `fallen${this.effectState.fallen}`, '[silent]');
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.effectState.fallen) {
				const powMod = [4096, 4506, 4915, 5325, 5734, 6144];
				this.debug(`Supreme Overlord boost: ${powMod[this.effectState.fallen]}/4096`);
				return this.chainModify([powMod[this.effectState.fallen], 4096]);
			}
		},
		flags: {},
		name: "Emperor's Clothes",
	},
	innermood: {
		shortDesc: "Inner Focus + Moody",
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			let stats: BoostID[] = [];
			const boost: SparseBoostsTable = {};
			let statPlus: BoostID;
			for (statPlus in pokemon.boosts) {
				if (statPlus === 'accuracy' || statPlus === 'evasion') continue;
				if (pokemon.boosts[statPlus] < 6) {
					stats.push(statPlus);
				}
			}
			let randomStat: BoostID | undefined = stats.length ? this.sample(stats) : undefined;
			if (randomStat) boost[randomStat] = 2;

			stats = [];
			let statMinus: BoostID;
			for (statMinus in pokemon.boosts) {
				if (statMinus === 'accuracy' || statMinus === 'evasion') continue;
				if (pokemon.boosts[statMinus] > -6 && statMinus !== randomStat) {
					stats.push(statMinus);
				}
			}
			randomStat = stats.length ? this.sample(stats) : undefined;
			if (randomStat) boost[randomStat] = -1;

			this.boost(boost, pokemon, pokemon);
		},
		onTryBoost(boost, target, source, effect) {
			if (['Intimidate','Mad Cow','Forest Fury','Shock Factor','Daunting Storm','Toxic Attitude'].includes(effect.name)) {
				if (boost.atk) {
					delete boost.atk;
					this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Inner Mood', '[of] ' + target);
				}
			} else if (effect.name === 'Fishy Threat' && boost.spe) {
				delete boost.spe;
				this.add('-fail', target, 'unboost', 'Speed', '[from] ability: Inner Mood', '[of] ' + target);
			}
		},
		flags: {breakable: 1},
		name: "Inner Mood",
	},
	nononsense: {
		shortDesc: "Battle Armor + Clear Body",
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
				this.add("-fail", target, "unboost", "[from] ability: No Nonsense", "[of] " + target);
			}
		},
		onCriticalHit: false,
		flags: {breakable: 1},
		name: "No Nonsense",
	},
	magneticstorm: {
		shortDesc: "Magnet Pull + Storm Drain",
		onFoeTrapPokemon(pokemon) {
			if (pokemon.hasType('Steel') && pokemon.isAdjacent(this.effectState.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!(source ||= this.effectState.target) || !pokemon.isAdjacent(source)) return;
			if (!pokemon.knownType || pokemon.hasType('Steel')) {
				pokemon.maybeTrapped = true;
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Magnetic Storm');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Water' || move.flags['pledgecombo']) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Magnetic Storm');
				}
				return this.effectState.target;
			}
		},
		flags: {breakable: 1},
		name: "Magnetic Storm",
	},
	ultraimpulse: {
		shortDesc: "x1.5 to highest stat when burned; +1 upon landing a KO",
		onStart(pokemon) {
			this.effectState.bestStat = pokemon.getBestStat(true, true);
		},
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			const bestStat = this.effectState.bestStat;
			if (['atk','spa'].includes(bestStat) && attacker.status === 'brn'
				&& move.category === (bestStat === 'spa' ? 'Special' : 'Physical')) {
				return this.chainModify(1.5);
			}
		},
		onModifyDefPriority: 6,
		onModifyDef(def, pokemon) {
			if (this.effectState.bestStat === 'def' && pokemon.status === 'brn') {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 6,
		onModifySpD(spd, pokemon) {
			if (this.effectState.bestStat === 'spd' && pokemon.status === 'brn') {
				return this.chainModify(1.5);
			}
		},
		onModifySpe(spe, pokemon) {
			if (this.effectState.bestStat === 'spe' && pokemon.status === 'brn') {
				return this.chainModify(1.5);
			}
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({[this.effectState.bestStat]: length}, source);
			}
		},
		flags: {},
		name: "Ultra Impulse",
	},
	dauntingstorm: {
		shortDesc: "Water Absorb + Intimidate",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Daunting Storm', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Water Absorb');
				}
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Daunting Storm",
	},
	magnetize: {
		shortDesc: "Galvanize + Levitate",
		//levitate's airborneness in scripts.ts/pokemon#IsGrounded()
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !(noModifyType.includes(move.id) || (move.isZ && move.category !== 'Status') || (move.name === 'Tera Blast' && pokemon.terastallized))) {
				move.type = 'Electric';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {breakable: 1},
		name: "Magnetize",
	},
	magneticforce: {
		shortDesc: "Galvanize effects + Traps Electric-types.",
		//levitate's airborneness in scripts.ts/pokemon#IsGrounded()
		onFoeTrapPokemon(pokemon) {
			if (pokemon.hasType('Electric') && pokemon.isAdjacent(this.effectState.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!(source ||= this.effectState.target) || !pokemon.isAdjacent(source)) return;
			if (!pokemon.knownType || pokemon.hasType('Electric')) {
				pokemon.maybeTrapped = true;
			}
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !(noModifyType.includes(move.id) || (move.isZ && move.category !== 'Status') || (move.name === 'Tera Blast' && pokemon.terastallized))) {
				move.type = 'Electric';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {breakable: 1},
		name: "Magnetic Force",
	},
	hydrotechnic: {
		shortDesc: "Moves with <=60BP have x1.5 power and restore 6.25% of Max HP after use.",
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
			this.debug('Base Power: ' + basePowerAfterMultiplier);
			if (basePowerAfterMultiplier <= 60) {
				this.debug('Technician boost');
				///uhhh let's hope this typeChangerBoosted hack works
				move.typeChangerBoosted = this.effect;
				return this.chainModify(1.5);
			}
		},
		onSourceDamagingHit(damage, target, source, move) {
			if (source && move.typeChangerBoosted === this.effect)
				this.heal(source.baseMaxhp / 16, source, source);
		},
		flags: {},
		name: "Hydrotechnic",
	},
	shearstrength: {
		shortDesc: "Takes x0.75 damage from moves with secondaries.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.secondaries) {
				this.debug('Shear Strength neutralize');
				return this.chainModify(0.75);
			}
		},
		flags: {},
		name: "Shear Strength",
	},
	suppressivefire: {
		shortDesc: "Flash Fire + Filter",
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Filter neutralize');
				return this.chainModify(0.75);
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				target.addVolatile('suppressivefire');
			}
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('suppressivefire');
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Suppressive Fire');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('suppressivefire')) {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('suppressivefire')) {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Suppressive Fire', '[silent]');
			},
		},
		flags: {breakable: 1},
		name: "Suppressive Fire",
	},
	innovate: {
	  shortDesc: "Scrappy + Quark Drive.",
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if ((move.ignoreImmunity ||= {}) !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (['Intimidate','Mad Cow','Forest Fury','Shock Factor','Daunting Storm','Toxic Attitude'].includes(effect.name)) {
				if (boost.atk) {
					delete boost.atk;
					this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Innovate', '[of] ' + target);
				}
			} else if (effect.name === 'Fishy Threat' && boost.spe) {
				delete boost.spe;
				this.add('-fail', target, 'unboost', 'Speed', '[from] ability: Innovate', '[of] ' + target);
			}
		},
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onTerrainChange(pokemon) {
			if (pokemon.transformed) return;
			if (this.field.isTerrain('electricterrain')) {
				pokemon.addVolatile('innovate');
			} else if (!pokemon.volatiles['innovate']?.fromBooster) {
				pokemon.removeVolatile('innovate');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['innovate'];
			this.add('-end', pokemon, 'Quark Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Innovate', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Innovate');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Quark Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Quark Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Quark Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Quark Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				for (const target of pokemon.foes()) {
					if (target.hasAbility('dyschronometria')) {
						this.debug('Dyschronometria negating spe boost');
						return;
					}
				}
				this.debug('Quark Drive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		flags: {breakable: 1, failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Innovate",
		rating: 4,
	},
	numbskull: {
	  shortDesc: "Unaware + Rock Head",
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectState.target;
			if (unawareUser === pokemon) return;
			if (unawareUser === this.activePokemon) {
				if (pokemon !== this.activeTarget) return;
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			else if (pokemon === this.activePokemon && unawareUser === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['def'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		flags: {breakable: 1},
		name: "Numbskull",
		rating: 3,
	},
	appleofruin: {
	  shortDesc: "Pokemon without this ability have their evasion multiplied by 0.75x.",
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Apple of Ruin');
		},
		onAnyModifyAccuracyPriority: -1,
		onAnyModifyAccuracy(accuracy, target, source, move) {
			if (target.hasAbility('Apple of Ruin')) return;
			const abilityHolder = this.effectState.target;
			if (!move.ruinedEva) move.ruinedEva = abilityHolder;
			else if (move.ruinedEva !== abilityHolder) return;
			this.debug('Apple of Ruin Evasion drop');
			return this.chainModify([5448, 4096]);
		},
		flags: {},
		name: "Apple of Ruin",
		rating: 4,
	},
	bestboost: {
	  shortDesc: "This Pokemon's highest stat can't be lowered and raises 1 stage after KOing a foe.",
		onStart(pokemon) {
			this.effectState.bestStat = pokemon.getBestStat(true, true);
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({[this.effectState.bestStat]: length}, source);
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			const bestStat = (this.effectState.bestStat ||= target.getBestStat(true, true));
			if (boost[bestStat] && boost[bestStat]! < 0) {
				delete boost[bestStat];
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", bestStat, "[from] ability: Best Boost", "[of] " + target);
				}
			}
		},
		flags: {breakable: 1},
		name: "Best Boost",
		rating: 3.5,
	},
	rogue: {
	  shortDesc: "Competitive + Overcoat",
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.isAlly(source)) {
				if (effect.id === 'stickyweb') {
					this.hint("Court Change Sticky Web counts as lowering your own Speed, and Competitive/Rogue only affects stats lowered by foes.", true, source.side);
				}
				return;
			}
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					this.boost({spa: 2}, target, target, null, false, true);
					return;
				}
			}
		},
		onImmunity(type, pokemon) {
			if (['sandstorm','hail','powder'].includes(type)) return false;
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (move.flags['powder'] && target !== source && this.dex.getImmunity('powder', target)) {
				this.add('-immune', target, '[from] ability: Rogue');
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Rogue",
	},
	unidentifiedflyingobject: {
		//airborneness in scripts.ts#pokemon
		shortDesc: "Levitate effects. If this Pokemon would be hit by a Ground move, the attacker becomes confused.",
		onTryHit(target, source, move) {
			//target should be airborne
			if (target !== source && move.type === 'Ground' && !source.volatiles['confusion'] && !(
				move.ignoreImmunity && (move.ignoreImmunity === true || move.ignoreImmunity['Ground'])
			) && target.isGrounded() === null) {
				source.addVolatile('confusion', target);
				this.add('-immune', target);
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Unidentified Flying Object",
	},
	roughimage: {
		shortDesc: "Illusion effects. Breaking the illusion damages the attacker for 12.5% of Max HP.",
		onBeforeSwitchIn(pokemon) {
			pokemon.illusion = null;
			// yes, you can Illusion an active pokemon but only if it's to your right
			for (let i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
				const possibleTarget = pokemon.side.pokemon[i];
				if (!possibleTarget.fainted) {
					// If Ogerpon is in the last slot while the Illusion Pokemon is Terastallized
					// Illusion will not disguise as anything
					if (!pokemon.terastallized || possibleTarget.species.baseSpecies !== 'Hattepon') {
						pokemon.illusion = possibleTarget;
					}
					break;
				}
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (target.illusion) {
				this.singleEvent('End', this.dex.abilities.get('Rough Image'), target.abilityState, target, source, move);
				this.damage(source.baseMaxhp / 8, source, target);
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
				if (this.ruleTable.has('illusionlevelmod')) {
					this.hint("Illusion Level Mod is active, so this Pok\u00e9mon's true level was hidden.", true);
				}
			}
		},
		onFaint(pokemon) {
			pokemon.illusion = null;
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		name: "Rough Image",
	},
	riotpayload: {
		shortDesc: "Rocky Payload + Defiant",
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.isAlly(source)) {
				if (effect.id === 'stickyweb') {
					this.hint("Court Change Sticky Web counts as lowering your own Speed, and Defiant/Riot Payload only affects stats lowered by foes.", true, source.side);
				}
				return;
			}
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					this.boost({atk: 2}, target, target, null, false, true);
					return;
				}
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Rock') {
				this.debug('Riot Payload boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Rock') {
				this.debug('Riot Payload boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Riot Payload",
	},
	toxicattitude: {
		shortDesc: "Intimidate + Poison Point",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Toxic Attitude', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target) && this.randomChance(3, 10)) {
				source.trySetStatus('psn', target);
			}
		},
		flags: {},
		name: "Toxic Attitude",
	},
	quickwit: {
		shortDesc: "Speed Boost + Keen Eye",
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.boost({spe: 1});
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.accuracy && boost.accuracy < 0) {
				delete boost.accuracy;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "accuracy", "[from] ability: Quick Wit", "[of] " + target);
				}
			}
		},
		onModifyMove(move) {
			move.ignoreEvasion = true;
		},
		flags: {breakable: 1},
		name: "Quick Wit",
	},
	stonesofruin: {
		shortDesc: "Pokemon without this ability have x0.75 Attack and deal x0.75 with super-effective hits.",
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Stones of Ruin');
			this.add('-message', `${pokemon.name}'s Stones of Ruin weakened the Attack of all surrounding Pokémon and the power of their super-effective moves!`);
		},
		onAnyModifyAtk(atk, source, target, move) {
			const abilityHolder = this.effectState.target;
			if (source.hasAbility(['Tablets of Ruin','Stones of Ruin'])) return;
			if (!move.ruinedAtk) move.ruinedAtk = abilityHolder;
			else if (move.ruinedAtk !== abilityHolder) return;
			this.debug('Tablets of Ruin Atk drop');
			return this.chainModify(0.75);
		},
		onAnyModifyDamage(damage, source, target, move) {
			const abilityHolder = this.effectState.target;
			if (source.hasAbility('Stones of Ruin') || target.getMoveHitData(move).typeMod <= 0) return;
			if (!move.ruinedAtk) move.ruinedAtk = abilityHolder;
			else if (move.ruinedAtk !== abilityHolder) return;
			this.debug('Stones of Ruin neutralize');
			return this.chainModify(0.75);
		},
		flags: {},
		name: "Stones of Ruin",
	},
	unstoppable: {
		shortDesc: "Adaptability + Aroma Veil",
		onModifySTAB(stab, source, target, move) {
			if (move.forceSTAB || source.hasType(move.type)) {
				return stab === 2 ? 2.25 : 2;
			}
		},
		onAllyTryAddVolatile(status, target, source, effect) {
			if (['attract', 'disable', 'encore', 'healblock', 'taunt', 'torment'].includes(status.id)) {
				if (effect.effectType === 'Move') {
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'ability: Aroma Veil', '[of] ' + effectHolder);
				}
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Unstoppable",
	},
	saltedlobster: {
		shortDesc: "Adaptability + Purifying Salt",
		onModifySTAB(stab, source, target, move) {
			if (move.forceSTAB || source.hasType(move.type)) {
				return stab === 2 ? 2.25 : 2;
			}
		},
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Salted Lobster');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Salted Lobster');
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
		flags: {breakable: 1},
		name: "Salted Lobster",
	},
	//Vanilla abilities
	//Extending Inner Focus's Intimidate immunity to derivatives
	innerfocus: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			if (['Intimidate','Mad Cow','Forest Fury','Shock Factor','Daunting Storm','Toxic Attitude'].includes(effect.name)) {
				if (boost.atk) {
					delete boost.atk;
					this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Inner Focus', '[of] ' + target);
				}
			} else if (effect.name === 'Fishy Threat' && boost.spe) {
				delete boost.spe;
				this.add('-fail', target, 'unboost', 'Speed', '[from] ability: Inner Focus', '[of] ' + target);
			}
		},
	},
	embodyaspectcornerstone: {
		inherit: true,
		onStart(pokemon) {
			if (pokemon.baseSpecies.name === 'Hattepon-Cornerstone-Tera' && !this.effectState.embodied) {
				this.effectState.embodied = true;
				this.boost({def: 1}, pokemon);
			}
		},
	},
	embodyaspecthearthflame: {
		inherit: true,
		onStart(pokemon) {
			if (pokemon.baseSpecies.name === 'Hattepon-Hearthflame-Tera' && !this.effectState.embodied) {
				this.effectState.embodied = true;
				this.boost({atk: 1}, pokemon);
			}
		},
	},
	embodyaspectteal: {
		inherit: true,
		onStart(pokemon) {
			if (pokemon.baseSpecies.name === 'Hattepon-Teal-Tera' && !this.effectState.embodied) {
				this.effectState.embodied = true;
				this.boost({spe: 1}, pokemon);
			}
		},
	},
	embodyaspectwellspring: {
		inherit: true,
		onStart(pokemon) {
			if (pokemon.baseSpecies.name === 'Hattepon-Wellspring-Tera' && !this.effectState.embodied) {
				this.effectState.embodied = true;
				this.boost({spd: 1}, pokemon);
			}
		},
	},
	naturalcure: {
		onCheckShow(pokemon) {
			// This is complicated
			// For the most part, in-game, it's obvious whether or not Natural Cure activated,
			// since you can see how many of your opponent's pokemon are statused.
			// The only ambiguous situation happens in Doubles/Triples, where multiple pokemon
			// that could have Natural Cure switch out, but only some of them get cured.
			if (pokemon.side.active.length === 1/*) return;
			if (*/|| pokemon.showCure === true || pokemon.showCure === false) return;

			const cureList = [];
			let noCureCount = 0;
			for (const curPoke of pokemon.side.active) {
				// pokemon not statused
				if (!curPoke || !curPoke.status) {
					// this.add('-message', "" + curPoke + " skipped: not statused or doesn't exist");
					continue;
				}
				if (curPoke.showCure) {
					// this.add('-message', "" + curPoke + " skipped: Natural Cure already known");
					continue;
				}
				const species = curPoke.species;
				// pokemon can't get Natural Cure
				if (!Object.values(species.abilities).includes('Natural Cure') && !Object.values(species.abilities).includes('Natural Pressures') && !Object.values(species.abilities).includes('Rejuvenate')) {
					// this.add('-message', "" + curPoke + " skipped: no Natural Cure");
					continue;
				}
				// pokemon's ability is known to be Natural Cure
				if (!species.abilities['1'] && !species.abilities['H']) {
					// this.add('-message', "" + curPoke + " skipped: only one ability");
					continue;
				}
				// pokemon isn't switching this turn
				if (curPoke !== pokemon && !this.queue.willSwitch(curPoke)) {
					// this.add('-message', "" + curPoke + " skipped: not switching");
					continue;
				}

				if (curPoke.hasAbility(['naturalcure','rejuvenate','naturalpressures'])) {
					// this.add('-message', "" + curPoke + " confirmed: could be Natural Cure (and is)");
					cureList.push(curPoke);
				} else {
					// this.add('-message', "" + curPoke + " confirmed: could be Natural Cure (but isn't)");
					noCureCount++;
				}
			}

			if (!cureList.length || !noCureCount) {
				// It's possible to know what pokemon were cured
				for (const pkmn of cureList) {
					pkmn.showCure = true;
				}
			} else {
				// It's not possible to know what pokemon were cured

				// Unlike a -hint, this is real information that battlers need, so we use a -message
				this.add('-message', "(" + cureList.length + " of " + pokemon.side.name + "'s pokemon " + (cureList.length === 1 ? "was" : "were") + " cured by Natural Cure.)");

				for (const pkmn of cureList) {
					pkmn.showCure = false;
				}
			}
		},
		inherit: true,
	},
	//Mainly did this so we could try to see if Quark Drive would work
	protosynthesis: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protosynthesis', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protosynthesis');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Protosynthesis atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Protosynthesis def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Protosynthesis spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Protosynthesis spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				for (const target of pokemon.foes()) {
					if (target.hasAbility('dyschronometria')) {
						this.debug('Dyschronometria negating spe boost');
						return;
					}
				}
				this.debug('Protosynthesis spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Protosynthesis",
		rating: 3,
		num: 281,
	},
	quarkdrive: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Quark Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Quark Drive');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Quark Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Quark Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Quark Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Quark Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				for (const target of pokemon.foes()) {
					if (target.hasAbility('dyschronometria')) {
						this.debug('Dyschronometria negating spe boost');
						return;
					}
				}
				this.debug('Quark Drive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
	},
};
