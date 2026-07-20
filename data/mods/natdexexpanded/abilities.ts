export const Abilities: import("../../../sim/dex-abilities").ModdedAbilityDataTable = {
	rainbowgift: {
		name: "Rainbow Gift",
		shortDesc: "This Pokemon passes a Wish when it switches out.",
		onSwitchOut(pokemon) {
			this.add('-ability', 'Rainbow Gift');
			this.actions.useMove('Wish', pokemon);
		},
	},
	weatherjet: {
		name: "Weather Jet",
		shortDesc: "This Pokemon gains a 1.5x stat boost based on the active weather.",
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			const activeWeather = this.field.weather;
			switch (activeWeather) {
				case "sunnyday": {
					pokemon.addVolatile('Weather Jet: Atk');
					this.add('-start', pokemon, 'Weather Jet: Atk');
				}
				case "raindance": {
					pokemon.addVolatile('Weather Jet: SpA');
					this.add('-start', pokemon, 'Weather Jet: SpA');
				}
				case "sandstorm": {
					pokemon.addVolatile('Weather Jet: SpD');
					this.add('-start', pokemon, 'Weather Jet: SpD');
				}
				case "snowscape": case "hail": {
					pokemon.addVolatile('Weather Jet: Def');
					this.add('-start', pokemon, 'Weather Jet: Def');
				}
				break;
			default: return;
			}
		},
		condition: {
			noCopy: true,
			onModifyAtk(atk, pokemon) {
				if (!pokemon.volatiles.includes['weatherjetatk'] || pokemon.ignoringAbility()) return;
				return this.chainModify(1.5);
			},
			onModifyDef(def, pokemon) {
				if (!pokemon.volatiles.includes['weatherjetdef'] || pokemon.ignoringAbility()) return;
				return this.chainModify(1.5);
			},
			onModifySpA(spa, pokemon) {
				if (!pokemon.volatiles.includes['weatherjetspa'] || pokemon.ignoringAbility()) return;
				return this.chainModify(1.5);
			},
			onModifySpD(spd, pokemon) {
				if (!pokemon.volatiles.includes['weatherjetspd'] || pokemon.ignoringAbility()) return;
				return this.chainModify(1.5);
			},
			onModifySpe(spe, pokemon) {
				if (!pokemon.volatiles.includes['weatherjetspe'] || pokemon.ignoringAbility()) return;
				return this.chainModify(1.5);
			},
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1 },
	},
	volcanicaftermath: {
		name: "Volcanic Aftermath",
		shortDesc: "If this Pokemon is KOed with a move, that move's user loses an equal amount of HP.",
		onDamagingHit(damage, target, source, move) {
			if (!target.hp) {
				this.damage(target.getUndynamaxedHP(damage), source, target);
			}
		},
	},
	naturalmedicine: {
		name: "Natural Medicine",
		shortDesc: "Regenerator + This Pokemon's ally: +25% max HP on switch-in.",
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		onStart(pokemon) {
			for (const ally of pokemon.adjacentAllies()) {
				this.heal(ally.baseMaxhp / 4, ally, pokemon);
			}
		},
	},
	artillerysupport: {
		name: "Artillery Support",
		shortDesc: "This Pokemon's Special moves: 1.5x dmg in singles, spread in doubles.",
		onModifySpA(relayVar, source, target, move) {
			if (this.gameType === 'singles' || this.gameType === 'freeforall') return this.chainModify(1.5);
		},
		onModifyTarget(relayVar, pokemon, target, move) {
			if (this.gameType !== 'singles' && this.gameType !== 'freeforall' &&
				(move.target === 'normal' || move.target === 'randomNormal'))
			return 'allAdjacentFoes';
		},
	},
	spiritofsand: {
		name: "Spirit of Sand",
		shortDesc: "Sand Rush + Sheer Force",
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(2);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
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
	},
	interceptor: {
		name: "Interceptor",
		shortDesc: "Moves have +2 priority when the target has positive Spe boosts",
		onModifyPriority(relayVar, source, target, move) {
			if (target.boosts.spe > 0) {
				this.add('-ability', 'Interceptor')
				return move.priority + 2;
			}
		},
	},
	upload: {
		name: "Upload",
		shortDesc: "On switch-in, Defense or Sp. Def is raised 1 stage based on the foes' stronger Attack.",
		onStart(pokemon) {
			let totalatk = 0;
			let totalspa = 0;
			for (const target of pokemon.foes()) {
				totalatk += target.getStat('atk', false, true);
				totalspa += target.getStat('spa', false, true);
			}
			if (totalatk && totalatk >= totalspa) {
				this.boost({def: 1});
			} else if (totalspa) {
				this.boost({spd: 1});
			}
		},
	},
	emperor: {
		name: "Emperor",
		shortDesc: "Gains a 1.1x boost to Atk and SpA for every fainted ally.",
		onStart(pokemon) {
			if (pokemon.side.totalFainted) {
				this.add('-activate', pokemon, 'ability: Emperor');
				const fallen = Math.min(pokemon.side.totalFainted, 5);
				this.add('-start', pokemon, `fallen${fallen}`, '[silent]');
				this.effectState.fallen = fallen;
			}
		},
		onModifyAtk(pokemon) {
			if (this.effectState.fallen) {
				const boost = 1.1 * this.effectState.fallen;
				if (this.gameType === 'singles' || this.gameType === 'freeforall') return boost;
			}
		},
		onModifySpA(pokemon) {
			if (this.effectState.fallen) {
				const boost = 1.1 * this.effectState.fallen;
				if (this.gameType === 'singles' || this.gameType === 'freeforall') return boost;
			}
		},
		onAllyModifyAtk(pokemon) {
			if (this.effectState.fallen) {
				const boost = 1.1 * this.effectState.fallen;
				if (this.gameType !== 'singles' && this.gameType !== 'freeforall') return boost;
			}
		},
		onAllyModifySpA(pokemon) {
			if (this.effectState.fallen) {
				const boost = 1.1 * this.effectState.fallen;
				if (this.gameType !== 'singles' && this.gameType !== 'freeforall') return boost;
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, `fallen${this.effectState.fallen}`, '[silent]');
		},
	},
	magnetattraction: {
		name: "Magnet Attraction",
		shortDesc: "Magnet Pull + +1 Priority against Steel types.",
		onFoeTrapPokemon(pokemon) {
			if (pokemon.hasType('Steel') && pokemon.isAdjacent(this.effectState.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source)) return;
			if (!pokemon.knownType || pokemon.hasType('Steel')) {
				pokemon.maybeTrapped = true;
			}
		},
		onModifyPriority(relayVar, source, target, move) {
			if (target.hasType('Steel')) {
				this.add('-ability', 'Magnet Attraction')
				return move.priority + 1;
			}
		},
	},
	titansawakening: {
		name: "Titan's Awakening",
		shortDesc: "Grants a 1.5x boost to the highest stat of active ally Regis.",
		onAllyModifyAtk(atk, pokemon) {
			for (const allyActive of pokemon.adjacentAllies()) {
				const regiClass = ['regidrago', 'regieleki', 'registeel', 'regirock', 'regice'] as ID[];
				if (regiClass.includes(allyActive.species.id) && allyActive.getBestStat(false, true) === 'atk' && !pokemon.ignoringAbility())
				return this.chainModify(1.5);
			};
		},
		onAllyModifyDef(def, pokemon) {
			for (const allyActive of pokemon.adjacentAllies()) {
				const regiClass = ['regidrago', 'regieleki', 'registeel', 'regirock', 'regice'] as ID[];
				if (regiClass.includes(allyActive.species.id) && allyActive.getBestStat(false, true) === 'atk' && !pokemon.ignoringAbility())
				return this.chainModify(1.5);
			};
		},
		onAllyModifySpA(spa, pokemon) {
			for (const allyActive of pokemon.adjacentAllies()) {
				const regiClass = ['regidrago', 'regieleki', 'registeel', 'regirock', 'regice'] as ID[];
				if (regiClass.includes(allyActive.species.id) && allyActive.getBestStat(false, true) === 'atk' && !pokemon.ignoringAbility())
				return this.chainModify(1.5);
			};
		},
		onAllyModifySpD(spd, pokemon) {
			for (const allyActive of pokemon.adjacentAllies()) {
				const regiClass = ['regidrago', 'regieleki', 'registeel', 'regirock', 'regice'] as ID[];
				if (regiClass.includes(allyActive.species.id) && allyActive.getBestStat(false, true) === 'atk' && !pokemon.ignoringAbility())
				return this.chainModify(1.5);
			};
		},
		onAllyModifySpe(spe, pokemon) {
			for (const allyActive of pokemon.adjacentAllies()) {
				const regiClass = ['regidrago', 'regieleki', 'registeel', 'regirock', 'regice'] as ID[];
				if (regiClass.includes(allyActive.species.id) && allyActive.getBestStat(false, true) === 'atk' && !pokemon.ignoringAbility())
				return this.chainModify(1.5);
			};
		},
	},
	semperfi: {
		name: "Semper Fi",
		shortDesc: "Guts + Defiant.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.isAlly(source)) {
				return;
			}
			let statsLowered = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
				this.boost({atk: 2}, target, target, null, false, true);
			}
		},
	},
	barbarossa: {
		name: "Barbarossa",
		shortDesc: "Pokemon making contact with this Pokemon lose 1/4 of their max HP.",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 4, source, target);
			}
		},
	},
	nuclearpower: {
		name: "Nuclear Power",
		shortDesc: "This Pokemon does not lose PP, its stats cannot be self-lowered, and has Pressure.",
		// Pressure
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Pressure');
		},
		onDeductPP(target, source) {
			if (target.isAlly(source)) return;
			return 1;
		},
		// PP
		onSourceDeductPP(target, source) {
			return -1;
		},
		// stats
		onTryBoost(boost, target, source, effect) {
			if (source && target !== source) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: Nuclear Power", "[of] " + source);
			}
		},
		flags: { breakable: 1 }
	},
	crystalization: {
		name: "Crystalization",
		shortDesc: "Rock Head + This Pokemon's Rock type moves become Steel type.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Rock' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Steel';
				move.typeChangerBoosted = this.effect;
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
	},
	torrentialhydration: {
		name: "Torrential Hydration",
		shortDesc: "Summons Rain. While Rain and Ability active, all non-volatile status healed at end of turn.",
		onStart(source) {
			for (const action of this.queue) {
				if (action.choice === 'runPrimal' && action.pokemon === source && source.species.id === 'kyogre') return;
				if (action.choice !== 'runSwitch' && action.choice !== 'runPrimal') break;
			}
			this.field.setWeather('raindance');
		},
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			for (const pokemon of this.getAllActive()) {
				if (pokemon.status && ['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
					this.debug('hydration');
					this.add('-activate', pokemon, 'ability: Torrential Hydration');
					pokemon.cureStatus();
				}
			}
		},
	},
	superarmor: {
		name: "Super Armor",
		shortDesc: "Bulletproof + Soundproof + Overcoat",
		flags: { breakable: 1 },
		// overcoat
		onImmunity(type, pokemon) {
			if (type === 'sandstorm' || type === 'hail' || type === 'powder') return false;
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if ((move.flags['powder'] && target !== source && this.dex.getImmunity('powder', target)) ||
			move.flags['bullet'] || move.flags['sound']) {
				this.add('-immune', target, '[from] ability: Super Armor');
				return null;
			}
		},
	},
	chargedstriker: {
		name: "Charged Striker",
		shortDesc: "This Pokemon's Pyro Ball checks Electric type effectiveness.",
		// hardcoded into the move
	},
	goldeneye: {
		name: "Golden Eye",
		shortDesc: "All moves have +2 crit ratio. Snipe Shot always crits.",
		onModifyCritRatio(relayVar, source, target, move) {
			if (move.willCrit || move.id === 'snipeshot') return 3;
			return 2;
		},
	},
	amplifier: {
		name: "Amplifier",
		shortDesc: "STAB boost on sound moves, +2 SpA on use of sound move.",
		onAfterMove(source, target, move) {
			if (move.flags['sound']) this.boost({ spa: 2 });
		},
		onModifySTAB(relayVar, source, target, move) {
			if (move.flags['sound']) return 1.5;
		},
	},
	multirole: {
		name: "Multirole",
		shortDesc: "Attacks by this Pokemon use the Pokemon's highest stat to attack.",
		onTryMove(source, target, move) {
			move.overrideOffensiveStat === source.getBestStat(false, false);
		},
	},
	goldfinger: {
		name: "Goldfinger",
		shortDesc: "This Pokemon becomes the type of the last move used on it, but only has STAB for Steel.",
		onAfterMoveSecondary(target, source, move) {
			if (!target.hp) return;
			const type = move.type;
			if (
				target.isActive && move.effectType === 'Move' && move.category !== 'Status' &&
				type !== '???' && !target.hasType(type)
			) {
				if (!target.setType(type)) return false;
				this.add('-start', target, 'typechange', type, '[from] ability: Goldfinger');

				if (target.side.active.length === 2 && target.position === 1) {
					// Curse Glitch
					const action = this.queue.willMove(target);
					if (action && action.move.id === 'curse') {
						action.targetLoc = -1;
					}
				}
			}
		},
		onModifySTAB(relayVar, source, target, move) {
			if (move.type === 'Steel') {
				return 1.5;
			} else {
				return 1;
			}
		},
	},
	unseenfist: {
		inherit: true,
		onModifyMove(move) {
			if (move.flags['contact']) {
				delete move.flags['protect'];
				if (move.totalDamage) move.totalDamage = move.totalDamage / 4;
			}
		},
		shortDesc: "This Pokemon's contact moves ignore a target's protection and deal 1/4 the usual damage.",
	},
	goodasgold: {
		inherit: true,
		onTryHit(target, source, move) {
			if (move.category === 'Status' && target !== source && move.id !== 'defog') {
				this.add('-immune', target, '[from] ability: Good as Gold');
				return null;
			}
		},
		shortDesc: "his Pokemon is immune to Status moves, except Defog.",
	},
	aerilate: {
		inherit: true,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([5325, 4096]);
		},
		shortDesc: "This Pokemon's Normal-type moves become Flying type and have 1.3x power.",
	},
	refrigerate: {
		inherit: true,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([5325, 4096]);
		},
		shortDesc: "This Pokemon's Normal-type moves become Ice type and have 1.3x power.",
	},
	pixilate: {
		inherit: true,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([5325, 4096]);
		},
		shortDesc: "This Pokemon's Normal-type moves become Fairy type and have 1.3x power.",
	},
	bugcatcher: {
		name: "Bug Catcher",
		shortDesc: "This Pokemon's Grass type moves deal super-effective damage against the Bug type.",
		onEffectiveness(typeMod, target, type, move) {
			if (move.type === 'Grass' && target?.hasType('Bug')) return typeMod * 4;
		},
	},
	levitate: {
		inherit: true,
		shortDesc: "INNATE: Ground immunity.",
	}
};
