export const Abilities: {[k: string]: ModdedAbilityData} = {
	unfiltered: {
	  shortDesc: "Filter + Contrary",
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Unfiltered neutralize');
				return this.chainModify(0.75);
			}
		},
		onBoost(boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			let i: BoostName;
			for (i in boost) {
				boost[i]! *= -1;
			}
		},
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
	  shortDesc: "Beast Boost + Serene Grace",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				let statName = 'atk';
				let bestStat = 0;
				let s: StatNameExceptHP;
				for (s in source.storedStats) {
					if (source.storedStats[s] > bestStat) {
						statName = s;
						bestStat = source.storedStats[s];
					}
				}
				this.boost({[statName]: length}, source);
			}
		},
		onModifyMove(move) {
			if (move.secondaries) {
				this.debug('doubling secondary chance');
				for (const secondary of move.secondaries) {
					if (secondary.chance) secondary.chance *= 2;
				}
			}
			if (move.self?.chance) move.self.chance *= 2;
		},
	  name: "All-Devouring",
    },
	galvanicrelay: {
	  shortDesc: "Mycelium Might and Transistor. User's Electric-type attacks ignore abilities and have -1 priority.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Galvanic Relay boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Galvanic Relay boost');
				return this.chainModify(1.5);
			}
		},
		onFractionalPriorityPriority: -1,
		onFractionalPriority(priority, pokemon, target, move) {
			if (move.category === 'Status' || move.type === 'Electric') {
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
	  shortDesc: "Effects of Intimidate and Hyper Cutter",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
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
	  name: "Forest Fury",
    },
	growthspurt: {
	  shortDesc: "Effects of Harvest; Berry is restored at 1/3 or less of its max HP.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (this.field.isWeather(['sunnyday', 'desolateland']) || this.randomChance(1, 2)) {
				if (pokemon.hp && !pokemon.item && this.dex.getItem(pokemon.lastItem).isBerry) {
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
			if (target.hp <= target.maxhp / 3 && target.hp + damage > target.maxhp / 3 && !target.item && this.dex.getItem(target.lastItem).isBerry) {
					target.setItem(target.lastItem);
					target.lastItem = '';
					this.add('-item', target, target.getItem(), '[from] ability: Growth Spurt');
			}
		},
	  name: "Growth Spurt",
    },
	lightdrive: {
	  shortDesc: "(Partially functional) Light Metal + Quark Drive. Quark Drive activates if the user is lighter.",
		onModifyWeight(weighthg) {
			return this.trunc(weighthg / 2);
		},
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectData, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isTerrain('electricterrain') && !pokemon.volatiles['lightdrive']) {
				pokemon.addVolatile('lightdrive');
			} else if (pokemon.hasItem('lightdrive') && !this.field.isTerrain('electricterrain') && pokemon.useItem()) {
				pokemon.removeVolatile('lightdrive');
				pokemon.addVolatile('lightdrive', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['lightdrive'].fromBooster = true;
			} else if (!pokemon.volatiles['lightdrive']?.fromBooster && !this.field.isTerrain('electricterrain')) {
				pokemon.removeVolatile('lightdrive');
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
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Light Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Light Drive');
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'lightdrive' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk') return;
				this.debug('Light Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def') return;
				this.debug('Light Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa') return;
				this.debug('Light Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd') return;
				this.debug('Light Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe') return;
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
			if (effect.id === 'intimidate' || effect.id === 'forestfury') {
				delete boost.atk;
				this.add('-immune', target, '[from] ability: Scrap Rock');
			}
		},
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
	  shortDesc: "Protosynthesis + Magician",
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && move.category !== 'Status') {
				if (source.item || source.volatiles['gem'] || move.id === 'fling') return;
				const yourItem = target.takeItem(source);
				if (!yourItem) return;
				if (!source.setItem(yourItem)) {
					target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
					return;
				}
				this.add('-item', source, yourItem, '[from] ability: Opening Act', '[of] ' + target);
			}
		},
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectData, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Opening Act is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday') && !pokemon.volatiles['openingact']) {
				pokemon.addVolatile('openingact');
			} else if (pokemon.hasItem('boosterenergy') && !this.field.isWeather('sunnyday') && pokemon.useItem()) {
				pokemon.removeVolatile('openingact');
				pokemon.addVolatile('openingact', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['openingact'].fromBooster = true;
			} else if (!pokemon.volatiles['openingact']?.fromBooster && !this.field.isWeather('sunnyday')) {
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
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Opening Act', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Opening Act');
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'openingact' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk') return;
				this.debug('Opening Act atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def') return;
				this.debug('Opening Act def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa') return;
				this.debug('Opening Act spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd') return;
				this.debug('Opening Act spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe') return;
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
	  shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using a Ghost-type attack; can't be statused.",
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
		name: "Necromancer",
		rating: 3,
	},
	regainpatience: {
	  shortDesc: "Berserk + Regenerator",
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({spa: 1});
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
			this.singleEvent('TerrainChange', this.effect, this.effectData, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isTerrain('electricterrain') && !pokemon.volatiles['quarksurge']) {
				pokemon.addVolatile('quarksurge');
			} else if (pokemon.hasItem('quarksurge') && !this.field.isTerrain('electricterrain') && pokemon.useItem()) {
				pokemon.removeVolatile('quarksurge');
				pokemon.addVolatile('quarksurge', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['quarksurge'].fromBooster = true;
			} else if (!pokemon.volatiles['quarksurge']?.fromBooster && !this.field.isTerrain('electricterrain')) {
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
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Quark Surge', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Quark Surge');
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarksurge' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk') return;
				this.debug('Quark Surge atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def') return;
				this.debug('Quark Surge def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa') return;
				this.debug('Quark Surge spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd') return;
				this.debug('Quark Surge spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe') return;
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
			this.singleEvent('WeatherChange', this.effect, this.effectData, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Once Upon a Time is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday') && !pokemon.volatiles['onceuponatime']) {
				pokemon.addVolatile('onceuponatime');
			} else if (pokemon.hasItem('boosterenergy') && !this.field.isWeather('sunnyday') && pokemon.useItem()) {
				pokemon.removeVolatile('onceuponatime');
				pokemon.addVolatile('onceuponatime', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['onceuponatime'].fromBooster = true;
			} else if (!pokemon.volatiles['onceuponatime']?.fromBooster && !this.field.isWeather('sunnyday')) {
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
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Once Upon a Time', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Once Upon a Time');
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'onceuponatime' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk') return;
				this.debug('Once Upon a Time atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def') return;
				this.debug('Once Upon a Time def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa') return;
				this.debug('Once Upon a Time spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd') return;
				this.debug('Once Upon a Time spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe') return;
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
			this.singleEvent('WeatherChange', this.effect, this.effectData, pokemon);
		},
		onImmunity(type, pokemon) {
			if (type === 'attract') return false;
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'attract' || move.id === 'captivate' || move.id === 'taunt') {
				this.add('-immune', pokemon, '[from] ability: Primitive');
				return null;
			}
		},
		onBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate' || effect.id === 'forestfury') {
				delete boost.atk;
				this.add('-immune', target, '[from] ability: Primitive');
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
			// if (pokemon.transformed) return;
			// Primitive is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday') && !pokemon.volatiles['primitive']) {
				pokemon.addVolatile('primitive');
			} else if (pokemon.hasItem('boosterenergy') && !this.field.isWeather('sunnyday') && pokemon.useItem()) {
				pokemon.removeVolatile('primitive');
				pokemon.addVolatile('primitive', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['primitive'].fromBooster = true;
			} else if (!pokemon.volatiles['primitive']?.fromBooster && !this.field.isWeather('sunnyday')) {
				pokemon.removeVolatile('primitive');
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
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Primitive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Primitive');
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'primitive' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk') return;
				this.debug('Primitive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def') return;
				this.debug('Primitive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa') return;
				this.debug('Primitive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd') return;
				this.debug('Primitive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe') return;
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
				target.volatiles['systempurge'].fromBooster = true;
			}
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (pokemon.hasItem('boosterenergy') && pokemon.useItem()) {
				pokemon.removeVolatile('systempurge');
				pokemon.addVolatile('systempurge', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['systempurge'].fromBooster = true;
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
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: System Purge', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: System Purge');
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'systempurge' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk') return;
				this.debug('System Purge atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def') return;
				this.debug('System Purge def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa') return;
				this.debug('System Purge spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd') return;
				this.debug('System Purge spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe') return;
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
			duration: 2,
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
			if (this.effectData.choreography) return;
			if (move.hasBounced || move.isFutureMove || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.effectData.choreography = true;
				this.add('-start', source, 'typechange', type, '[from] ability: Choreography');
			}
		},
		onSwitchIn(pokemon) {
			delete this.effectData.choreography;
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
			if (target === this.effectData.target || target.side !== source.side) return;
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.boost({atk: 1}, this.effectData.target);
			}
		},
		onAllySideConditionStart(target, source, sideCondition) {
			const pokemon = this.effectData.target;
			if (sideCondition.id === 'tailwind') {
				this.boost({atk: 1}, pokemon, pokemon);
			}
		},
		name: "Squall",
		rating: 4,
	},
	stoneage: {
	  shortDesc: "Sturdy + Technician",
		onBeforeMovePriority: 9,
		onBeforeMove(pokemon) {
			if (pokemon.species.baseSpecies !== 'Relishadow' || pokemon.transformed) return;
			const targetForme = pokemon.species.name === 'Relishadow' ? 'Relishadow-Zenith' : 'Relishadow-Zenith';
			pokemon.formeChange(targetForme);
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
	  shortDesc: "Pokemon that make contact with or KO this Pokemon lose 1/8 of their max HP.",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
			if (!target.hp) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
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
			if (!move.auraBooster) move.auraBooster = this.effectData.target;
			if (move.auraBooster !== this.effectData.target) return;
			return this.chainModify([move.hasAuraBreak ? 0x0C00 : 0x1547, 0x1000]);
		},
		isUnbreakable: true,
		name: "Aura Shield",
		rating: 3,
	},
	faultyphoton: {
	  shortDesc: "Disguise effects. Once the Disguise is broken, it gets a ×1.3 boost to it's highest stat; ×1.5 if Speed.",
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (
				effect && effect.effectType === 'Move' &&
				['ironmimic'].includes(target.species.id) && !target.transformed
			) {
				this.add('-activate', target, 'ability: Faulty Photon');
				this.effectData.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (!['ironmimic'].includes(target.species.id) || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (!['ironmimic'].includes(target.species.id) || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (['ironmimic'].includes(pokemon.species.id) && this.effectData.busted) {
				const speciesid = pokemon.species.id === 'mimikyutotem' ? 'Mimikyu-Busted-Totem' : 'Iron Mimic-Busted';
				pokemon.formeChange(speciesid, this.effect, true);
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon, this.dex.getSpecies(speciesid));
				pokemon.addVolatile('faultyphoton');
				pokemon.volatiles['faultyphoton'].fromBooster = true;
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
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Faulty Photon', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Faulty Photon');
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'faultyphoton' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk') return;
				this.debug('Faulty Photon atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def') return;
				this.debug('Faulty Photon def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa') return;
				this.debug('Faulty Photon spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd') return;
				this.debug('Faulty Photon spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe') return;
				this.debug('Faulty Photon spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Faulty Photon');
			},
		},
		isPermanent: true,
		name: "Faulty Photon",
		rating: 3,
	},
	dyschronometria: {
	  shortDesc: "This Pokemon ignores other Pokemon's stat stages and Paradox boosts when taking or doing damage.",
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectData.target;
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
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			this.effectData.bestStat = attacker.getBestStat(false, true);
			if ((attacker.volatiles['faultyphoton'] || attacker.volatiles['systempurge'] || attacker.volatiles['onceuponatime'] || 
				attacker.volatiles['primitive'] || attacker.volatiles['quarksurge'] || attacker.volatiles['lightdrive'] || attacker.volatiles['openingact'])
				&& this.effectData.bestStat === 'atk') {
				this.debug('Dyschronometria weaken');
				return this.chainModify([4096, 5325]);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			this.effectData.bestStat = attacker.getBestStat(false, true);
			if ((attacker.volatiles['faultyphoton'] || attacker.volatiles['systempurge'] || attacker.volatiles['onceuponatime'] || 
				attacker.volatiles['primitive'] || attacker.volatiles['quarksurge'] || attacker.volatiles['lightdrive'] || attacker.volatiles['openingact'])
				&& this.effectData.bestStat === 'spa') {
				this.debug('Dyschronometria weaken');
				return this.chainModify([4096, 5325]);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			this.effectData.bestStat = defender.getBestStat(false, true);
			if ((defender.volatiles['faultyphoton'] || defender.volatiles['systempurge'] || defender.volatiles['onceuponatime'] || 
				defender.volatiles['primitive'] || defender.volatiles['quarksurge'] || defender.volatiles['lightdrive'] || defender.volatiles['openingact'])
				&& this.effectData.bestStat === 'def') {
				this.debug('Dyschronometria boost');
				return this.chainModify([5325, 4096]);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			this.effectData.bestStat = defender.getBestStat(false, true);
			if ((defender.volatiles['faultyphoton'] || defender.volatiles['systempurge'] || defender.volatiles['onceuponatime'] || 
				defender.volatiles['primitive'] || defender.volatiles['quarksurge'] || defender.volatiles['lightdrive'] || defender.volatiles['openingact'])
				&& this.effectData.bestStat === 'spd') {
				this.debug('Dyschronometria boost');
				return this.chainModify([5325, 4096]);
			}
		},
		name: "Dyschronometria",
		rating: 3,
	},
};
