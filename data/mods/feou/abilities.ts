export const Abilities: {[k: string]: ModdedAbilityData} = {
	/* FEG9 abils */
	unfiltered: {
	  shortDesc: "Filter + Contrary + NvE Moves deal 4/3x damage.",
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Unfiltered neutralize');
				return this.chainModify(0.75);
			}
		},
		onChangeBoost(boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
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
		isBreakable: true,
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
		isBreakable: true,
	  name: "Holy Grail",
    },
	alldevouring: {
	  shortDesc: "Beast Boost + Run Away",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				const bestStat = source.getBestStat(true, true);
				this.boost({[bestStat]: length}, source);
			}
		},
	  name: "All-Devouring",
    },
	galvanicrelay: {
	  shortDesc: "Mycelium Might + Transistor; Electric attacks also ignore the foe's ability.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Galvanic Relay boost');
				return this.chainModify(1.3);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Galvanic Relay boost');
				return this.chainModify(1.3);
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
	  shortDesc: "Effects of Intimidate and Hyper Cutter + This Pokemon can't be statused by opponents.",
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
		isBreakable: true,
	  name: "Forest Fury",
    },
	growthspurt: {
	  shortDesc: "Effects of Harvest; Berry is restored at 1/3 or less of its max HP.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (this.field.isWeather(['sunnyday', 'desolateland']) || this.randomChance(1, 2)) {
				if (pokemon.hp && !pokemon.item && this.dex.items.get(pokemon.lastItem).isBerry) {
					pokemon.setItem(pokemon.lastItem);
					pokemon.lastItem = '';
					this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Growth Spurt');
				}
			}
		},
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 3 && target.hp + damage > target.maxhp / 3 && !target.item && this.dex.items.get(target.lastItem).isBerry) {
					target.setItem(target.lastItem);
					target.lastItem = '';
					this.add('-item', target, target.getItem(), '[from] ability: Growth Spurt');
			}
		},
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
			if (move.hasBounced) return;
			if (source == target) return;
			const user = this.effectState.target;
			if (user.volatiles['lightdrive'] && !user.volatiles['lightdrive'].fromWeightDiff) return;
			if (source === user) {
				if (user.getWeight() < target.getWeight() && !user.volatiles['lightdrive']) {
					user.addVolatile('lightdrive');
					user.volatiles['lightdrive'].fromWeightDiff = true;
				} else if (user.volatiles['lightdrive'] && user.getWeight() >= target.getWeight()) {
					user.removeVolatile('lightdrive');
				}
			} else if (target === user) {
				if (user.getWeight() < source.getWeight() && !user.volatiles['lightdrive']) {
					user.addVolatile('lightdrive');
					user.volatiles['lightdrive'].fromWeightDiff = true;
				} else if (user.volatiles['lightdrive'] && user.getWeight() >= source.getWeight()) {
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
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Light Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Light Drive');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'lightdrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Light Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Light Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Light Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Light Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Light Drive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Light Drive');
			},
		},
		isPermanent: true,
		name: "Light Drive",
		rating: 1,
		num: 135,
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
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
		},
		onBoost(boost, target, source, effect) {
			if (['intimidate','forestfury','shockfactor'].includes(effect.id)) {
				delete boost.atk;
				this.add('-immune', target, '[from] ability: Scrap Rock');
			}
		},
		isBreakable: true,
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
		name: "Reachless",
		rating: 3,
	},
	openingact: {
	  shortDesc: "Protosynthesis + Prankster",
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
			} else if (!pokemon.volatiles['openingact']?.fromBooster) {
				pokemon.removeVolatile('openingact');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['openingact'];
			this.add('-end', pokemon, 'Opening Act', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Opening Act', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Opening Act');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'openingact' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Opening Act atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Opening Act def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Opening Act spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Opening Act spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Opening Act spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Opening Act');
			},
		},
		isPermanent: true,
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
		isBreakable: true,
		name: "Necromancer",
		rating: 3,
	},
	regainpatience: {
	  shortDesc: "Berserk + Regenerator",
		onDamage(damage, target, source, effect) {
			if (
				effect.effectType === "Move" &&
				!effect.multihit &&
				(!effect.negateSecondary && !(effect.hasSheerForce && source.hasAbility('sheerforce')))
			) {
				this.effectState.checkedBerserk = false;
			} else {
				this.effectState.checkedBerserk = true;
			}
		},
		onTryEatItem(item) {
			const healingItems = [
				'aguavberry', 'enigmaberry', 'figyberry', 'iapapaberry', 'magoberry', 'sitrusberry', 'wikiberry', 'oranberry', 'berryjuice',
			];
			if (healingItems.includes(item.id)) {
				return this.effectState.checkedBerserk;
			}
			return true;
		},
		onAfterMoveSecondary(target, source, move) {
			this.effectState.checkedBerserk = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({spa: 1}, target, target);
			}
		},
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		name: "Regain Patience",
		rating: 3,
	},
	quarksurge: {
	  shortDesc: "Quark Drive + Electric Surge",
		onStart(pokemon) {
			this.field.setTerrain('electricterrain');
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
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
			this.add('-end', pokemon, 'Quark Surge', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Quark Surge', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Quark Surge');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarksurge' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Quark Surge atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Quark Surge def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Quark Surge spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Quark Surge spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Quark Surge spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Surge');
			},
		},
		isPermanent: true,
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
			this.add('-end', pokemon, 'Once Upon a Time', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Once Upon a Time', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Once Upon a Time');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'onceuponatime' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Once Upon a Time atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Once Upon a Time def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Once Upon a Time spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Once Upon a Time spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Once Upon a Time spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Once Upon a Time');
			},
		},
		onModifyMove(move) {
			move.infiltrates = true;
		},
		isPermanent: true,
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
		onBoost(boost, target, source, effect) {
			if (['intimidate','forestfury','shockfactor'].includes(effect.id)) {
				delete boost.atk;
				this.add('-immune', target, '[from] ability: Primitive');
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
			this.add('-end', pokemon, 'Primitive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Primitive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Primitive');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'primitive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Primitive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Primitive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Primitive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Primitive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Primitive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Primitive');
			},
		},
		isPermanent: true,
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
		onTerrainChange(pokemon) {
			if (pokemon.transformed) return;
			if (this.field.isTerrain('electricterrain')) {
				pokemon.addVolatile('systempurge');
			} else if (!pokemon.volatiles['systempurge']?.fromBooster) {
				pokemon.removeVolatile('systempurge');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['systempurge'];
			this.add('-end', pokemon, 'System Purge', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: System Purge', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: System Purge');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'systempurge' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('System Purge atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('System Purge def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('System Purge spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('System Purge spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('System Purge spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'System Purge');
			},
		},
		isPermanent: true,
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
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
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
		name: "Delayed Reaction",
		rating: 1,
	},
	choreography: {
	  shortDesc: "Protean + Dancer",
		onPrepareHit(source, target, move) {
			if (this.effectState.choreography) return;
			if (move.hasBounced || move.isFutureMove || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.effectState.choreography = true;
				this.add('-start', source, 'typechange', type, '[from] ability: Choreography');
			}
		},
		onSwitchIn(pokemon) {
			delete this.effectState.choreography;
		},
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
		isBreakable: true,
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
		isBreakable: true,
		name: "Stone Age",
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
			if (unawareUser === this.activePokemon && pokemon === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (pokemon === this.activePokemon && unawareUser === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['def'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		isBreakable: true,
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
			if (move.auraBooster !== this.effectState.target) return;
			return this.chainModify([move.hasAuraBreak ? 0x0C00 : 0x1547, 0x1000]);
		},
		name: "Aura Shield",
		rating: 3,
	},
	faultyphoton: {
	  shortDesc: "Disguise + Quark Drive",
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (
				effect && effect.effectType === 'Move' && target.species.id === 'ironmimic' && !target.transformed
			) {
				this.add('-activate', target, 'ability: Faulty Photon');
				this.effectState.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (target.species.id !== 'ironmimic' || target.transformed) return;
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates/* && this.gen >= 6*/);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (target.species.id !== 'ironmimic' || target.transformed) return;
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates/* && this.gen >= 6*/);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (pokemon.species.id === 'ironmimic' && this.effectState.busted) {
				const speciesid = /*pokemon.species.id === 'mimikyutotem' ? 'Mimikyu-Busted-Totem' :*/ 'Iron Mimic-Busted';
				pokemon.formeChange(speciesid, this.effect, true);
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon, this.dex.species.get(speciesid));
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
			delete pokemon.volatiles['faultyphoton'];
			this.add('-end', pokemon, 'Faulty Photon', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Faulty Photon', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Faulty Photon');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'faultyphoton' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Faulty Photon atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Faulty Photon def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Faulty Photon spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Faulty Photon spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Faulty Photon spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Faulty Photon');
			},
		},
		isPermanent: true,
		isBreakable: true,
		name: "Faulty Photon",
		rating: 3,
	}, /*
	dyschronometria: {
	  shortDesc: "This Pokemon ignores other Pokemon's stat stages and Paradox boosts when taking or doing damage.",
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectState.target;
			if (unawareUser === pokemon) return;
			if (unawareUser === this.activePokemon && pokemon === this.activeTarget) {
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
		onAnyModifyAtkPriority: 6,
		onAnyModifyAtk(atk, attacker, defender, move) {
			//this.effectState.bestStat = attacker.getBestStat(false, true);
			const dyschronoUser = this.effectState.target;
			if (defender == dyschronoUser) {
				if (attacker.getBestStat(false, true) !== 'atk') return;
				for (const paradox of ['faultyphoton', 'systempurge', 'onceuponatime', 'primitive', 'quarksurge', 
											'lightdrive', 'openingact', 'protosynthesis', 'quarkdrive', 'nanorepairs', 
											'weightoflife', 'circuitbreaker']) { 
					if (attacker.volatiles[paradox]) {
						this.debug('Dyschronometria weaken');
						return this.chainModify([3151, 4096]);
					}
				}
			} else if (attacker == dyschronoUser) {
				const bestStat = defender.getBestStat(false,true);
				if (bestStat !== 'def' && (!move.defensiveCategory || move.defensiveCategory === 'Physical')) return;
				if (move.defensiveCategory === 'Special' && bestStat !== 'spd') return;
				for (const paradox of ['faultyphoton', 'systempurge', 'onceuponatime', 'primitive', 'quarksurge', 
											'lightdrive', 'openingact', 'protosynthesis', 'quarkdrive', 'nanorepairs',
												'weightoflife', 'circuitbreaker']) { 
					if (defender.volatiles[paradox]) {
						this.debug('Dyschronometria nullify');
						return this.chainModify([5325, 4096]);
					}
				}
			}
		},
		onAnyModifySpAPriority: 5,
		onAnyModifySpA(atk, attacker, defender, move) {
			//this.effectState.bestStat = attacker.getBestStat(false, true);
			const dyschronoUser = this.effectState.target;
			if (defender == dyschronoUser) {
				if (attacker.getBestStat(false, true) !== 'spa') return;
				for (const paradox of ['faultyphoton', 'systempurge', 'onceuponatime', 'primitive', 'quarksurge', 
											'lightdrive', 'openingact', 'protosynthesis', 'quarkdrive', 'nanorepairs', 
											'weightoflife', 'circuitbreaker']) { 
					if (attacker.volatiles[paradox]) {
						this.debug('Dyschronometria weaken');
						return this.chainModify([3151, 4096]);
					}
				}
			} else if (attacker == dyschronoUser) {
				const bestStat = defender.getBestStat(false,true);
				if (bestStat !== 'spd' && (!move.defensiveCategory || move.defensiveCategory === 'Special')) return;
				if (move.defensiveCategory === 'Physical' && bestStat !== 'def') return;
				for (const paradox of ['faultyphoton', 'systempurge', 'onceuponatime', 'primitive', 'quarksurge', 
											'lightdrive', 'openingact', 'protosynthesis', 'quarkdrive', 'nanorepairs',
												'weightoflife', 'circuitbreaker']) { 
					if (defender.volatiles[paradox]) {
						this.debug('Dyschronometria nullify');
						return this.chainModify([5325, 4096]);
					}
				}
			}
		},
		name: "Dyschronometria",
		rating: 3,
	}, */
	dyschronometria: {
	  shortDesc: "Quark Drive + This Pokemon ignores other Pokemon's Paradox boosts when taking or doing damage.",
		onAnyModifyAtkPriority: 6,
		onAnyModifyAtk(atk, attacker, defender, move) {
			//this.effectState.bestStat = attacker.getBestStat(false, true);
			const dyschronoUser = this.effectState.target;
			if (defender == dyschronoUser) {
				if (attacker.getBestStat(false, true) !== 'atk') return;
				for (const paradox of ['faultyphoton', 'systempurge', 'onceuponatime', 'primitive', 'quarksurge', 
											'lightdrive', 'openingact', 'protosynthesis', 'quarkdrive', 'nanorepairs', 
											'weightoflife', 'circuitbreaker', 'dyschronometria', 'ancientmarble', 'prehistorichunter']) { 
					if (attacker.volatiles[paradox]) {
						this.debug('Dyschronometria weaken');
						return this.chainModify([3151, 4096]);
					}
				}
			} else if (attacker == dyschronoUser) {
				const bestStat = defender.getBestStat(false,true);
				if (bestStat !== 'def' && (!move.defensiveCategory || move.defensiveCategory === 'Physical')) return;
				if (move.defensiveCategory === 'Special' && bestStat !== 'spd') return;
				for (const paradox of ['faultyphoton', 'systempurge', 'onceuponatime', 'primitive', 'quarksurge', 
											'lightdrive', 'openingact', 'protosynthesis', 'quarkdrive', 'nanorepairs', 
											'weightoflife', 'circuitbreaker', 'dyschronometria', 'ancientmarble', 'prehistorichunter']) { 
					if (defender.volatiles[paradox]) {
						this.debug('Dyschronometria nullify');
						return this.chainModify([5325, 4096]);
					}
				}
			}
		},
		onAnyModifySpAPriority: 5,
		onAnyModifySpA(atk, attacker, defender, move) {
			//this.effectState.bestStat = attacker.getBestStat(false, true);
			const dyschronoUser = this.effectState.target;
			if (defender == dyschronoUser) {
				if (attacker.getBestStat(false, true) !== 'spa') return;
				for (const paradox of ['faultyphoton', 'systempurge', 'onceuponatime', 'primitive', 'quarksurge', 
											'lightdrive', 'openingact', 'protosynthesis', 'quarkdrive', 'nanorepairs', 
											'weightoflife', 'circuitbreaker', 'dyschronometria', 'ancientmarble', 'prehistorichunter']) { 
					if (attacker.volatiles[paradox]) {
						this.debug('Dyschronometria weaken');
						return this.chainModify([3151, 4096]);
					}
				}
			} else if (attacker == dyschronoUser) {
				const bestStat = defender.getBestStat(false,true);
				if (bestStat !== 'spd' && (!move.defensiveCategory || move.defensiveCategory === 'Special')) return;
				if (move.defensiveCategory === 'Physical' && bestStat !== 'def') return;
				for (const paradox of ['faultyphoton', 'systempurge', 'onceuponatime', 'primitive', 'quarksurge', 
											'lightdrive', 'openingact', 'protosynthesis', 'quarkdrive', 'nanorepairs', 
											'weightoflife', 'circuitbreaker', 'dyschronometria', 'ancientmarble', 'prehistorichunter']) { 
					if (defender.volatiles[paradox]) {
						this.debug('Dyschronometria nullify');
						return this.chainModify([5325, 4096]);
					}
				}
			}
		},
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onTerrainChange(pokemon) {
			if (pokemon.transformed) return;
			if (this.field.isTerrain('electricterrain')) {
				pokemon.addVolatile('dyschronometria');
			} else if (!pokemon.volatiles['dyschronometria']?.fromBooster) {
				pokemon.removeVolatile('dyschronometria');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['dyschronometria'];
			this.add('-end', pokemon, 'Dyschronometria', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Dyschronometria', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Dyschronometria');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'dyschronometria' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Dyschronometria atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Dyschronometria def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Dyschronometria spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Dyschronometria spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Dyschronometria spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Dyschronometria');
			},
		},
		isBreakable: true,
		isPermanent: true,
		name: "Dyschronometria",
		rating: 3,
	},
	nanorepairs: {
	  shortDesc: "Quark Drive + Regenerator",
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
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
			this.add('-end', pokemon, 'Nanorepairs', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Nanorepairs', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Nanorepairs');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'nanorepairs' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Nanorepairs atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Nanorepairs def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Nanorepairs spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Nanorepairs spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Nanorepairs spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Nanorepairs');
			},
		},
		isPermanent: true,
		name: "Nanorepairs",
		rating: 3,
	},
	ironsights: {
	  shortDesc: "This Pokemon's Attack, Special Attack, and accuracy are x1.33.",
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
		isPermanent: true,
		name: "Iron Sights",
		rating: 3,
	},
	rejuvenate: {
	  shortDesc: "If statused, heals the status when switching out; else restores 1/3 Max HP when switching out.",
		onCheckShow(pokemon) {
			// This is complicated
			// For the most part, in-game, it's obvious whether or not Natural Cure activated,
			// since you can see how many of your opponent's pokemon are statused.
			// The only ambiguous situation happens in Doubles/Triples, where multiple pokemon
			// that could have Natural Cure switch out, but only some of them get cured.
			if (pokemon.side.active.length === 1) return;
			if (pokemon.showCure === true || pokemon.showCure === false) return;

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
				if (!Object.values(species.abilities).includes('Rejuvenate')) {
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

				if (curPoke.hasAbility(['naturalcure','rejuvenate'])) {
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
				this.add('-message', "(" + cureList.length + " of " + pokemon.side.name + "'s pokemon " + (cureList.length === 1 ? "was" : "were") + " cured by Rejuvenate.)");

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
			if (!pokemon.showCure) pokemon.showCure = undefined;
		},
		name: "Rejuvenate",
		rating: 3,
	},
	electromagneticveil: {
	  shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Electric moves or burned; Electric & Burn immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Electromagnetic Veil');
				}
				return null;
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.heal(target.baseMaxhp / 4);
				this.add('-immune', target, '[from] ability: Electromagnetic Veil');
			}
			return false;
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Electromagnetic Veil');
				this.heal(target.baseMaxhp / 4);
				pokemon.cureStatus();
			}
		},
		isBreakable: true,
		name: "Electromagnetic Veil",
		rating: 3,
	},
	risingtension: {
	  shortDesc: "Levitate + Cursed Body",
		onDamagingHit(damage, target, source, move) {
			if (source.volatiles['disable']) return;
			if (!move.isFutureMove) {
				if (this.randomChance(3, 10)) {
					source.addVolatile('disable', this.effectState.target);
				}
			}
		},
		isBreakable: true,
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
			const abilityHolder = this.effectState.target;
			if (source.hasAbility('Grindset')) return;
			if (!move.ruinedAtk) move.ruinedAtk = abilityHolder;
			if (move.ruinedAtk !== abilityHolder) return;
			this.debug('Grindset Atk drop');
			return this.chainModify(0.5);
		},
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
			if (!move || !move.recoil || !move.hasCrashDamage || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				status: 'par',
				ability: this.dex.abilities.get('shellshock'),
			});
		},
		name: "Shell Shock",
		rating: 3,
	},
	circuitbreaker: {
	  shortDesc: "Quark Drive + Mold Breaker",
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
			this.add('-ability', pokemon, 'Circuit Breaker');
			this.add('-message', `${pokemon.name} breaks the circuit!`);
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
			this.add('-end', pokemon, 'Circuit Breaker', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Circuit Breaker', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Circuit Breaker');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'circuitbreaker' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Circuit Breaker atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Circuit Breaker def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Circuit Breaker spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Circuit Breaker spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Circuit Breaker spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Circuit Breaker');
			},
		},
		isPermanent: true,
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
			if (move.hasBounced) return;
			if (source == target) return;
			const user = this.effectState.target;
			if (user.volatiles['weightoflife'] && !user.volatiles['weightoflife'].fromWeightDiff) return;
			if (source === user) {
				if (user.getWeight() > target.getWeight() && !user.volatiles['weightoflife']) {
					user.addVolatile('weightoflife');
					user.volatiles['weightoflife'].fromWeightDiff = true;
				} else if (user.volatiles['weightoflife'] && user.getWeight() <= target.getWeight()) {
					user.removeVolatile('weightoflife');
				}
			} else if (target === user) {
				if (user.getWeight() > source.getWeight() && !user.volatiles['weightoflife']) {
					user.addVolatile('weightoflife');
					user.volatiles['weightoflife'].fromWeightDiff = true;
				} else if (user.volatiles['weightoflife'] && user.getWeight() <= source.getWeight()) {
					user.removeVolatile('weightoflife');
				}
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['weightoflife'];
			this.add('-end', pokemon, 'Weight of Life', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Weight of Life', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Weight of Life');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'weightoflife' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Weight of Life atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Weight of Life def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Weight of Life spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Weight of Life spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Weight of Life spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Weight of Life');
			},
		},
		isPermanent: true,
		name: "Weight of Life",
		rating: 1,
		num: 135,
	},
	rebelsblade: {
	  shortDesc: "Effects of Sharpness. This Pokemon's slicing moves have a 30% chance of poisoning.",
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['slicing']) {
				this.debug('Rebels Blade boost');
				return this.chainModify(1.5);
			}
		},
		onModifyMove(move) {
			if (!move || !move.flags['slicing'] || move.target === 'self') return;
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 30,
				status: 'psn',
				ability: this.dex.abilities.get('rebelsblade'),
			});
		},
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
			if (pokemon.side.active.length === 1) return;
			if (pokemon.showCure === true || pokemon.showCure === false) return;

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
				if (!Object.values(species.abilities).includes('Natural Pressures')) {
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

				if (curPoke.hasAbility('naturalpressures')) {
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
				this.add('-message', "(" + cureList.length + " of " + pokemon.side.name + "'s pokemon " + (cureList.length === 1 ? "was" : "were") + " cured by Natural Pressures.)");

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
			if (!pokemon.showCure) pokemon.showCure = undefined;
		},
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Natural Pressures');
		},
		onDeductPP(target, source) {
			if (target.side === source.side) return;
			return 1;
		},
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
		name: "Vital Metal Body",
		rating: 3,
	},
	fortunomorphosis: {
	  shortDesc: "This Pokemon gains the Laser Focus effect when it takes a hit from an attack.",
	  onDamagingHitOrder: 1,
	  onDamagingHit(damage, target, source, move) {
			target.addVolatile('laserfocus');
		},
		name: "Fortunomorphosis",
		rating: 3,
	},
	burningpetals: {
	  shortDesc: "Flash Fire effects. This side's Fire-types can't have stats lowered or status inflicted by other Pokemon.",
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
				this.add('-block', target, 'ability: Burning Petals', '[of] ' + effectHolder);
			}
		},
		onAllySetStatus(status, target, source, effect) {
			if (target.hasType('Fire') && source && target !== source && effect && effect.id !== 'yawn') {
				this.debug('interrupting setStatus with Burning Petals');
				if (effect.id === 'synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'ability: Burning Petals', '[of] ' + effectHolder);
				}
				return null;
			}
		},
		onAllyTryAddVolatile(status, target) {
			if (target.hasType('Fire') && status.id === 'yawn') {
				this.debug('Burning Petals blocking yawn');
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Burning Petals', '[of] ' + effectHolder);
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
		isBreakable: true,
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
		name: "Snowblind",
		rating: 3,
	},
	unvital: {
	  shortDesc: "Unaware + Vital Spirit",
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectState.target;
			if (unawareUser === pokemon) return;
			if (unawareUser === this.activePokemon && pokemon === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (pokemon === this.activePokemon && unawareUser === this.activeTarget) {
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
		name: "Unvital",
		rating: 3,
	},
	ownluck: {
	  shortDesc: "This Pokemon has a +1 crit ratio and is immune to Intimidate.",
		onModifyCritRatio(critRatio) {
			return critRatio + 1;
		},
		onBoost(boost, target, source, effect) {
			if (['intimidate','forestfury','shockfactor'].includes(effect.id)) {
				delete boost.atk;
				this.add('-immune', target, '[from] ability: Own Luck');
			}
		},
		name: "Own Luck",
		rating: 3,
	},
	armourlock: {
	  shortDesc: "This Pokemon cannot be struck by a critical hit nor have its item removed.",
		onTakeItem(item, pokemon, source) {
			if (this.suppressingAttackEvents(pokemon) || !pokemon.hp || pokemon.item === 'stickybarb') return;
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if ((source && source !== pokemon) || this.activeMove.id === 'knockoff') {
				this.add('-activate', pokemon, 'ability: Armour Lock');
				return false;
			}
		},
		onCriticalHit: false,
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
		isBreakable: true,
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
		name: "Slushie",
		rating: 3,
	},
	sandwrath: {
	  shortDesc: "Sand Stream + Sand Force",
		onStart(source) {
			this.field.setWeather('sandstorm');
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather('sandstorm')) {
				if (move.type === 'Rock' || move.type === 'Ground' || move.type === 'Steel') {
					this.debug('Sand Wrath boost');
					return this.chainModify([0x14CD, 0x1000]);
				}
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		name: "Sand Wrath",
		rating: 3,
	},
	pondweed: {
	  shortDesc: "Shell Armor + Torrent",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Pondweed boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Pondweed boost');
				return this.chainModify(1.5);
			}
		},
		onCriticalHit: false,
		isBreakable: true,
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
		name: "Wet Skin",
		rating: 3,
	},
	friskexchange: {
	  shortDesc: "Frisk + Thermal Exchange",
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				if (target.item) {
					this.add('-item', target, target.getItem().name, '[from] ability: Frisk Exchange', '[of] ' + pokemon, '[identify]');
				}
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
		isBreakable: true,
		name: "Frisk Exchange",
		rating: 3,
	},
	freeflight: {
	  shortDesc: "Libero + Levitate",
		onPrepareHit(source, target, move) {
			if (this.effectState.libero) return;
			if (move.hasBounced || move.isFutureMove || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.effectState.libero = true;
				this.add('-start', source, 'typechange', type, '[from] ability: Free Flight');
			}
		},
		onSwitchIn() {
			delete this.effectState.libero;
		},
		isBreakable: true,
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
			) || !['zoinkazenta'].includes(pokemon.species.id)) {
				this.effectState.gaveUp = true;
			}
		},
		onUpdate(pokemon) {
			if (!pokemon.isStarted || this.effectState.gaveUp) return;
			if (!this.effectState.switchingIn) return;
			const possibleTargets = pokemon.foes().filter(foeActive => foeActive && foeActive.isAdjacent(pokemon));
			while (possibleTargets.length) {
				let rand = 0;
				if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
				const target = possibleTargets[rand];
				const ability = target.getAbility();
				const additionalBannedAbilities = [
					// Zen Mode included here for compatability with Gen 5-6
					'noability', 'flowergift', 'forecast', 'hungerswitch', 'illusion', 'wanderingspirit',
					'imposter', 'neutralizinggas', 'powerofalchemy', 'receiver', 'trace', 'zenmode',
				];
				if (target.getAbility().isPermanent || additionalBannedAbilities.includes(target.ability)) {
					possibleTargets.splice(rand, 1);
					continue;
				}
				target.setAbility('pillage', pokemon);
				pokemon.setAbility(ability);
				this.add('-activate', pokemon, 'ability: Pillage', ability.name, 'Pillage', '[of] ' + target);
				return;
			}
		},
		name: "Pillage",
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
		isBreakable: true,
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
				if (boost[b]! < 0) {
					if (target.boosts[b] === -6) continue;
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
		isBreakable: true,
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
		name: "Field Day",
		rating: 3,
	},
	airbornearmor: {
	  shortDesc: "Prism Armor + Levitate",
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Airborne Armor neutralize');
				return this.chainModify(0.75);
			}
		},
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
			this.add('-end', pokemon, 'Ancient Marble', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Ancient Marble', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Ancient Marble');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'ancientmarble' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Ancient Marble atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Ancient Marble def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Ancient Marble spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Ancient Marble spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Ancient Marble spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Ancient Marble');
			},
		},
		isPermanent: true,
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
			const abilityHolder = this.effectState.target;
			if (target.hasAbility('Sponge of Ruin')) return;
			if (!move.ruinedSpD?.hasAbility('Sponge of Ruin')) move.ruinedSpD = abilityHolder;
			if (move.ruinedSpD !== abilityHolder) return;
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
		isBreakable: true,
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
		name: "Overwhelming",
		rating: 3,
	},
	prehistorichunter: {
	  shortDesc: "Protosynthesis + Gulp Missile. Gulp Missile is also activated by Sun and Booster Energy.",
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onDamagingHit(damage, target, source, move) {
			if (!source.hp || !source.isActive || target.transformed || target.isSemiInvulnerable()) return;
			if (['screamcomorantgulping', 'screamcomorantgorging'].includes(target.species.id)) {
				this.damage(source.baseMaxhp / 4, source, target);
				if (target.species.id === 'screamcomorantgulping') {
					this.boost({def: -1}, source, target, null, true);
				} else {
					source.trySetStatus('par', target, move);
				}
				target.formeChange('screamcomorant', move);
				delete target.volatiles['prehistorichunter'];
			}
		},
		// The Dive part of this mechanic is implemented in Dive's `onTryMove` in moves.ts
		onSourceTryPrimaryHit(target, source, effect) {
			if (
				effect && effect.id === 'surf' && source.hasAbility('prehistorichunter') &&
				source.species.name === 'Scream Comorant' && !source.transformed
			) {
				const forme = source.hp <= source.maxhp / 2 ? 'screamcomorantgorging' : 'screamcomorantgulping';
				source.formeChange(forme, effect);
				source.addVolatile('prehistorichunter');				
			}
		},
		onWeatherChange(pokemon) {
			// if (pokemon.transformed) return;
			const forme = pokemon.hp <= pokemon.maxhp / 2 ? 'screamcomorantgorging' : 'screamcomorantgulping';
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
			this.add('-end', pokemon, 'Prehistoric Hunter', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
			const forme = pokemon.hp <= pokemon.maxhp / 2 ? 'screamcomorantgorging' : 'screamcomorantgulping';
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Prehistoric Hunter', '[fromitem]');
					pokemon.formeChange(forme, this.effect, false, '[msg]');
				} else {
					this.add('-activate', pokemon, 'ability: Prehistoric Hunter');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'prehistorichunter' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Prehistoric Hunter atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Prehistoric Hunter def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Prehistoric Hunter spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Prehistoric Hunter spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Prehistoric Hunter spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Prehistoric Hunter');
			},
		},
		isPermanent: true,
		name: "Prehistoric Hunter",
		rating: 3,
	},

	//Vanilla abilities
	naturalcure: {
		onCheckShow(pokemon) {
			// This is complicated
			// For the most part, in-game, it's obvious whether or not Natural Cure activated,
			// since you can see how many of your opponent's pokemon are statused.
			// The only ambiguous situation happens in Doubles/Triples, where multiple pokemon
			// that could have Natural Cure switch out, but only some of them get cured.
			if (pokemon.side.active.length === 1) return;
			if (pokemon.showCure === true || pokemon.showCure === false) return;

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
				if (!Object.values(species.abilities).includes('Natural Cure') && !Object.values(species.abilities).includes('Rejuvenate')) {
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

				if (curPoke.hasAbility(['naturalcure','rejuvenate'])) {
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
		onSwitchOut(pokemon) {
			if (!pokemon.status) return;

			// if pokemon.showCure is undefined, it was skipped because its ability
			// is known
			if (pokemon.showCure === undefined) pokemon.showCure = true;

			if (pokemon.showCure) this.add('-curestatus', pokemon, pokemon.status, '[from] ability: Natural Cure');
			pokemon.setStatus('');

			// only reset .showCure if it's false
			// (once you know a Pokemon has Natural Cure, its cures are always known)
			if (!pokemon.showCure) pokemon.showCure = undefined;
		},
		name: "Natural Cure",
		rating: 2.5,
		num: 30,
	},
	//Mainly did this so we could try to see if Quark Drive would work
	protosynthesis: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday')) {
				pokemon.addVolatile('protosynthesis');
			} else if (!pokemon.volatiles['protosynthesis']?.fromBooster) {
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
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protosynthesis', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protosynthesis');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Protosynthesis atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Protosynthesis def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Protosynthesis spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Protosynthesis spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Protosynthesis spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		isPermanent: true,
		name: "Protosynthesis",
		rating: 3,
		num: 281,
	},
	quarkdrive: {
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onTerrainChange(pokemon) {
			if (pokemon.transformed) return;
			if (this.field.isTerrain('electricterrain')) {
				pokemon.addVolatile('quarkdrive');
			} else if (!pokemon.volatiles['quarkdrive']?.fromBooster) {
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
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Quark Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Quark Drive');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Quark Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Quark Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Quark Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Quark Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Quark Drive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		isPermanent: true,
		name: "Quark Drive",
		rating: 3,
		num: 282,
	},
};
