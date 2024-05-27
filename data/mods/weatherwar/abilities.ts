import {FS} from '../../../lib';
import {toID} from '../../../sim/dex-data';

// Similar to User.usergroups. Cannot import here due to users.ts requiring Chat
// This also acts as a cache, meaning ranks will only update when a hotpatch/restart occurs
const usergroups: {[userid: string]: string} = {};
const usergroupData = FS('config/usergroups.csv').readIfExistsSync().split('\n');
for (const row of usergroupData) {
	if (!toID(row)) continue;

	const cells = row.split(',');
	if (cells.length > 3) throw new Error(`Invalid entry when parsing usergroups.csv`);
	usergroups[toID(cells[0])] = cells[1].trim() || ' ';
}

export function getName(name: string): string {
	const userid = toID(name);
	if (!userid) throw new Error('No/Invalid name passed to getSymbol');

	const group = usergroups[userid] || ' ';
	return group + name;
}

export const Abilities: {[k: string]: ModdedAbilityData} = {
	//setting abilities
	swarm: {
		onStart(source) {
			this.field.addPseudoWeather('theswarm');
		},
		flags: {},
		name: "Swarm",
		shortDesc: "On switchin, this Pokemon sets THE SWARM.",
	},
	blackout: {
		onStart(source) {
			this.field.addPseudoWeather('twilightzone');
		},
		flags: {},
		name: "Blackout",
		shortDesc: "On switchin, this Pokemon sets Twilight Zone.",
	},
	zergrush: {
		onStart(source) {
			this.field.addPseudoWeather('lotsofreallysmalldragons');
		},
		flags: {},
		name: "Zerg Rush",
		shortDesc: "On switchin, this Pokemon sets Lots of Really Small Dragons.",
	},
	squall: {
		onStart(source) {
			this.field.addPseudoWeather('thunderstorm');
		},
		flags: {},
		name: "Squall",
		shortDesc: "On switchin, this Pokemon sets Thunderstorm.",
	},
	fairytale: {
		onStart(source) {
			this.field.addPseudoWeather('fable');
		},
		flags: {},
		name: "Fairytale",
		shortDesc: "On switchin, this Pokemon sets Fable.",
	},
	beatdown: {
		onStart(source) {
			this.field.addPseudoWeather('colosseum');
		},
		flags: {},
		name: "Beatdown",
		shortDesc: "On switchin, this Pokemon sets Colosseum.",
	},
	solarflare: {
		onStart(source) {
			this.field.addPseudoWeather('drought');
		},
		flags: {},
		name: "Solar Flare",
		shortDesc: "On switchin, this Pokemon sets Drought.",
	},
	deltastream: {
		onStart(source) {
			this.field.addPseudoWeather('deltastream');
		},
		flags: {},
		name: "Delta Stream",
		shortDesc: "On switchin, this Pokemon sets Delta Stream.",
	},
	delusion: {
		onStart(source) {
			this.field.addPseudoWeather('thevoices');
		},
		flags: {},
		name: "Delusion",
		shortDesc: "On switchin, this Pokemon sets THE VOICES.",
	},
	ruin: {
		onStart(source) {
			this.field.addPseudoWeather('overgrowth');
		},
		flags: {},
		name: "Ruin",
		shortDesc: "On switchin, this Pokemon sets Overgrowth.",
	},
	sandstream: {
		onStart(source) {
			this.field.addPseudoWeather('duststorm');
		},
		flags: {},
		name: "Sand Stream",
		shortDesc: "On switchin, this Pokemon sets Dust Storm.",
	},
	snowwarning: {
		onStart(source) {
			this.field.addPseudoWeather('whiteout');
		},
		flags: {},
		name: "Snow Warning",
		shortDesc: "On switchin, this Pokemon sets Whiteout.",
	},
	fingerwaggler: {
		onStart(source) {
			this.field.addPseudoWeather('metronomebattle');
		},
		flags: {},
		name: "Finger Waggler",
		shortDesc: "On switchin, this Pokemon sets Metronome Battle.",
	},
	shart: {
		onStart(source) {
			this.field.addPseudoWeather('shitstorm');
		},
		flags: {},
		name: "Shart",
		shortDesc: "On switchin, this Pokemon sets Shitstorm.",
	},
	freaky: {
		onStart(source) {
			this.field.addPseudoWeather('mindfuck');
		},
		flags: {},
		name: "Freaky",
		shortDesc: "On switchin, this Pokemon sets Mindfuck.",
	},
	landslide: {
		onStart(source) {
			this.field.addPseudoWeather('landslide');
		},
		flags: {},
		name: "Landslide",
		shortDesc: "On switchin, this Pokemon sets Landslide.",
	},
	timemachine: {
		onStart(source) {
			this.field.addPseudoWeather('timewarp');
		},
		flags: {},
		name: "Time Machine",
		shortDesc: "On switchin, this Pokemon sets Time Warp.",
	},
	monsoon: {
		onStart(source) {
			this.field.addPseudoWeather('flashflood');
		},
		flags: {},
		name: "Monsoon",
		shortDesc: "On switchin, this Pokemon sets Flash Flood.",
	},
	climatechange: {
		onDamage(damage, target, source, effect) {
			if (
				effect.effectType === "Move" &&
				!effect.multihit &&
				(!effect.negateSecondary && !(effect.hasSheerForce && source.hasAbility('sheerforce')))
			) {
				this.effectState.checkedClimateChange = false;
			} else {
				this.effectState.checkedClimateChange = true;
			}
		},
		onTryEatItem(item) {
			const healingItems = [
				'aguavberry', 'enigmaberry', 'figyberry', 'iapapaberry', 'magoberry', 'sitrusberry', 'wikiberry', 'oranberry', 'berryjuice',
			];
			if (healingItems.includes(item.id)) {
				return this.effectState.checkedClimateChange;
			}
			return true;
		},
		onAfterMoveSecondary(target, source, move) {
			this.effectState.checkedClimateChange = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const weathers = ['theswarm', 'twilightzone', 'lotsofreallysmalldragons', 'thunderstorm', 'fable', 'colosseum', 'drought', 'deltastream', 'thevoices', 'overgrowth', 'duststorm', 'whiteout', 'metronomebattle', 'shitstorm', 'mindfuck', 'landslide', 'timewarp', 'flashflood'];
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.field.addPseudoWeather(this.sample(weathers));
			}
		},
		flags: {},
		name: "Climate Change",
		shortDesc: "At 1/2 or less maximum HP, this Pokemon sets a random weather.",
	},
	itsspring: {
		onStart(source) {
			this.field.addPseudoWeather('overgrowth');
			this.field.addPseudoWeather('fable');
		},
		flags: {},
		name: "It\'s Spring!",
		shortDesc: "On switchin, this Pokemon sets Overgrowth and Fable.",
	},
	
	//abusing abilities
	hivemind: {
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Hivemind neutralize');
				return this.chainModify(0.75);
			}
		},
		onTryHit(target, source, move) {
			if (this.field.pseudoWeather.theswarm && move.category === 'Status' && target !== source) {
				this.add('-immune', target, '[from] ability: Good as Gold');
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Hivemind",
		shortDesc: "Filter + GaG in The Swarm", 
	},
	
	dracojet: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.spe && boost.spe < 0) {
				delete boost.spe;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "Speed", "[from] ability: Draco Jet", "[of] " + target);
				}
			}
		},
		onFractionalPriorityPriority: -1,
		onFractionalPriority(priority, pokemon, target, move) {
			if (move.category !== "Status" && this.field.pseudoWeather.lotsofreallysmalldragons) {
				this.add('-activate', pokemon, 'ability: Draco Jet');
				return 0.1;
			}
		},
		flags: {breakable: 1},
		name: "Draco Jet",
		shortDesc: "Speed cannot be lowered. Dragon moves move first in LoRSD.", 
	},
	shortcircuit: {
		onDamagingHitOrder: 1,
		onFaint(pokemon) {
			if(!pokemon.adjacentFoes()) return;
			const target = this.sample(pokemon.adjacentFoes());
			this.damage(target.baseMaxhp / 4, target, pokemon);
		},
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Toxic Chain's effect
			if (!this.field.pseudoWeather.thunderstorm || target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;

			if (this.randomChance(3, 10)) {
				target.trySetStatus('par', source);
			}
		},
		flags: {},
		name: "Short Circuit",
		shortDesc: "Opponent loses 25% if user faints. 30% paralysis chance in Thunderstorm.", 
	},
	darkfantasy: {
		onUpdate(pokemon) {
			if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'ability: Dark Fantasy');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'slp') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Dark Fantasy');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Dark Fantasy');
				return null;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (this.field.pseudoWeather.fable && ['Dark', 'Dragon', 'Ghost', 'Poison'].includes(move.type)) return this.chainModify([3, 2]);
		},
		flags: {breakable: 1},
		name: "Dark Fantasy",
		shortDesc: "Insomnia + Dark/Dragon/Ghost/Poison moves 1.5x power in Fable.",
	},
	suplex: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.atk && boost.atk < 0) {
				delete boost.atk;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "Attack", "[from] ability: Suplex", "[of] " + target);
				}
			}
		},
		onBasePower(basePower, pokemon, target, move) {
			if (this.field.pseudoWeather.colosseum) {
				return this.chainModify(1.5);
			}
		},
		onFractionalPriority(priority, pokemon, target, move) {
			if (move.category !== "Status" && this.field.pseudoWeather.colosseum) {
				return 0.1;
			}
		},
		flags: {breakable: 1},
		name: "Suplex",
		shortDesc: "Hyper Cutter + attacks move last but have 1.5x power in Colosseum.",
	},
	solarpower: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			this.heal(pokemon.baseMaxhp / 16);
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (this.field.pseudoWeather.drought && attacker.getStat('def', false, true) >= attacker.getStat('spd', false, true)) {
				this.debug('Solar Power boost');
				return this.chainModify(1.3);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (this.field.pseudoWeather.drought && attacker.getStat('def', false, true) < attacker.getStat('spd', false, true)) {
				this.debug('Solar Power boost');
				return this.chainModify(1.3);
			}
		},
		flags: {},
		name: "Solar Power",
		shortDesc: "This Pokemon heals 1/16 max HP per turn. Drought = highest offense 1.3x.",
	},
	
	banshee: {
		onTryHit(target, source, move) {
			if (target !== source && move.flags['sound']) {
				this.add('-immune', target, '[from] ability: Banshee');
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (move.flags['sound']) {
				this.add('-immune', this.effectState.target, '[from] ability: Banshee');
			}
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (this.field.pseudoWeather.thevoices && move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Ghost';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify(0.75);
		},
		flags: {breakable: 1},
		name: "Banshee",
		shortDesc: "Soundproof + Ghost -ate with 0.75x power in THE VOICES.",
	},
	chlorophyll: {
		onTryHealPriority: 1,
		onTryHeal(damage, target, source, effect) {
			const heals = ['heal', 'drain', 'leechseed', 'ingrain', 'aquaring', 'strengthsap'];
			if (heals.includes(effect.id)) {
				return this.chainModify(1.5);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Grass' && this.field.pseudoWeather.overgrowth) {
				this.debug('Chlorophyll boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Grass' && this.field.pseudoWeather.overgrowth) {
				this.debug('Chlorophyll boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Chlorophyll",
		shortDesc: "1.5x healing + 1.5x Grass power in Overgrowth.",
	},
	sandforce: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Rock' || move.type === 'Ground' || move.type === 'Steel') {
				this.debug('Sand Force boost');
				return this.chainModify([4915, 4096]);
			}
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (!this.field.pseudoWeather.duststorm || !pokemon.hp) return;
			for (const target of pokemon.foes()) {
				this.damage(target.baseMaxhp / 8, target, pokemon);
			}
		},
		flags: {},
		name: "Sand Force",
		shortDesc: "Ground/Rock/Steel 1.2x power + Bad Dreams if Dust Storm.",
	},
	snowcloak: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.evasion && boost.evasion < 0) {
				delete boost.evasion;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "evasion", "[from] ability: Keen Eye", "[of] " + target);
				}
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (this.field.pseudoWeather.whiteout) {
				return this.chainModify(0.5);
			}
		},
		flags: {breakable: 1},
		name: "Snow Cloak",
		shortDesc: "Evasion can't be lowered + takes halved damage in Whiteout."
	},
	duomodreference: {
		onResidual(pokemon) {
			if(!this.field.pseudoWeather.metronomebattle) return;
			let result: number;
			const pickSide = this.random(2);

			this.add('-message', "Time for the Roulette Wheel!");

			result = this.random(50);
			if (result === 0) {
				this.hint("Roulette Wheel Result 1 - Fully heal every active Pokemon.");
	            for (const pokemon of this.getAllActive()) {
	                this.heal(pokemon.maxhp, pokemon);
	                pokemon.cureStatus();
	            }
	        } else if (result === 1) {
				this.hint("Roulette Wheel Result 2 - Greatly increase everyone's highest stat.");
	            for (const pokemon of this.getAllActive()) {
	                let statName = 'atk';
	                let bestStat = 0;
	                let s: StatNameExceptHP;
	                for (s in pokemon.storedStats) {
	                    if (pokemon.storedStats[s] > bestStat) {
	                        statName = s;
	                        bestStat = pokemon.storedStats[s];
	                    }
	                }
	                this.boost({[statName]: 3}, pokemon);
	            }
	        } else if (result === 2) {
				this.hint("Roulette Wheel Result 3 - Give one Pokemon an omniboost.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, target, target, null, true);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, target, target, null, true);
						}
					}
				}
	        } else if (result === 3) {
				this.hint("Roulette Wheel Result 4 - Set one Pokemon to 1 HP.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.directDamage(target.hp - 1, target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.directDamage(target.hp - 1, target);
						}
					}
				}
	        } else if (result === 4) {
				this.hint("Roulette Wheel Result 5 - screw you both");
	            for (const pokemon of this.getAllActive()) {
					this.directDamage(pokemon.hp, pokemon);
		    }
			} else if (result === 5) {
				this.hint("Roulette Wheel Result 6 - Set hazards on both sides.");
		    for (const pokemon of this.getAllActive()) {
					this.useMove("Spikes", pokemon);
					this.useMove("Stealth Electric", pokemon);
		    }
			} else if (result === 6) {
				this.hint("Roulette Wheel Result 7 - Set a random weather and terrain.");
				const result2 = this.random(3);
				const result3 = this.random(3);
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							if (result2 === 0) {
								this.useMove("Grassy Terrain", target);
							} else if (result2 === 1) {
								this.useMove("Electric Terrain", target);
							} else {
								this.useMove("Misty Terrain", target);
							}
							if (result3 === 0) {
								this.useMove("Sunny Day", target);
							} else if (result3 === 1) {
								this.useMove("Rain Dance", target);
							} else {
								this.useMove("Sandstorm", target);
							}
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							if (result2 === 0) {
								this.useMove("Grassy Terrain", target);
							} else if (result2 === 1) {
								this.useMove("Electric Terrain", target);
							} else {
								this.useMove("Misty Terrain", target);
							}
							if (result3 === 0) {
								this.useMove("Sunny Day", target);
							} else if (result3 === 1) {
								this.useMove("Rain Dance", target);
							} else {
								this.useMove("Sandstorm", target);
							}
						}
					}
				}
			} else if (result === 7) {
				this.hint("Roulette Wheel Result 8 - lmao");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.directDamage(1, target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.directDamage(1, target);
						}
					}
				}
	        } else if (result === 8) {
				this.hint("Roulette Wheel Result 9 - Minimize every stat of one Pokemon.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive && target.hasAbility('contrary')) {
							this.boost({atk: 12, def: 12, spa: 12, spd: 12, spe: 12}, target, target, null, true);
						} else if (target.isActive) {
							this.boost({atk: -12, def: -12, spa: -12, spd: -12, spe: -12}, target, target, null, true);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive && target.hasAbility('contrary')) {
							this.boost({atk: 12, def: 12, spa: 12, spd: 12, spe: 12}, target, target, null, true);
						} else if (target.isActive) {
							this.boost({atk: -12, def: -12, spa: -12, spd: -12, spe: -12}, target, target, null, true);
						}
					}
				}
	   } else if (result === 9) {
				this.hint("Roulette Wheel Result 10 - Forcibly switch every Pokemon.");
				for (const pokemon of this.getAllActive()) {
					pokemon.forceSwitchFlag = true;
				}
			} else if (result === 10) {
				this.hint("Roulette Wheel Result 11 - Make every Pokemon use Conversion 2.");
				for (const pokemon of this.getAllActive()) {
					this.useMove("Conversion 2", pokemon);
				}
			} else if (result === 11) {
				this.hint("Roulette Wheel Result 12 - Make one Pokemon Transform into the other.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.useMove("Transform", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.useMove("Transform", target);
						}
					}
				}
			} else if (result === 12) {
				this.hint("Roulette Wheel Result 13 - Make both Pokemon trade stat changes.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.useMove("Heart Swap", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.useMove("Heart Swap", target);
						}
					}
				}
			} else if (result === 13) {
				this.hint("Roulette Wheel Result 14 - Slightly heal both Pokemon.");
				for (const pokemon of this.getAllActive()) {
					this.heal(pokemon.maxhp / 4, pokemon);
	        	}
	        } else if (result === 14) {
				this.hint("Roulette Wheel Result 15 - heard you guys liked scald");
				for (const pokemon of this.getAllActive()) {
					this.useMove("Scald", pokemon);
				}
			} else if (result === 15) {
				this.hint("Roulette Wheel Result 16 - Attempt to Toxic both Pokemon.");
				for (const pokemon of this.getAllActive()) {
					if (!pokemon.side.getSideCondition('safeguard')) {
						pokemon.trySetStatus('tox', pokemon);
					}
	      }
			} else if (result === 16) {
				this.hint("Roulette Wheel Result 17 - Switch both sides' field effects.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.useMove("Court Change", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.useMove("Court Change", target);
						}
					}
				}
			} else if (result === 17) {
				this.hint("Roulette Wheel Result 18 - Raise both active Pokemons' attacking stats.");
				for (const pokemon of this.getAllActive()) {
		                this.boost({atk: 2, spa: 2}, pokemon);
				}
	        } else if (result === 18) {
				this.hint("Roulette Wheel Result 19 - Make both Pokemon use Camouflage.");
				for (const pokemon of this.getAllActive()) {
					this.useMove("Camouflage", pokemon);
				}
			} else if (result === 19) {
				this.hint("Roulette Wheel Result 20 - Make both Pokemon swap abilities.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.useMove("Skill Swap", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.useMove("Skill Swap", target);
						}
					}
				}
			} else if (result === 20) {
				this.hint("Roulette Wheel Result 21 - wahoo");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.useMove("Celebrate", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.useMove("Celebrate", target);
						}
					}
				}
			} else if (result === 21) {
				this.hint("Roulette Wheel Result 22 - Sets Trick Room.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.useMove("Trick Room", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.useMove("Trick Room", target);
						}
					}
				}
			} else if (result === 22) {
				this.hint("Roulette Wheel Result 23 - Pocket sand go");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.boost({accuracy: -1}, target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.boost({accuracy: -1}, target);
						}
					}
				}
			} else if (result === 23) {
				this.hint("Roulette Wheel Result 24 - Removes all active stat changes.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.useMove("Haze", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.useMove("Haze", target);
						}
					}
				}
			} else if (result === 24) {
				this.hint("Roulette Wheel Result 25 - Sets Magic Room.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.useMove("Magic Room", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.useMove("Magic Room", target);
						}
					}
				}
			} else if (result === 25) {
				this.hint("Roulette Wheel Result 26 - Sets Wonder Room.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.useMove("Wonder Room", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.useMove("Wonder Room", target);
						}
					}
				}
			} else if (result === 26) {
				this.hint("Roulette Wheel Result 27 - Averages out the HP of active Pokemon.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.useMove("Pain Split", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.useMove("Pain Split", target);
						}
					}
				}
			} else if (result === 27) {
				this.hint("Roulette Wheel Result 28 - Cures all active Pokemons' statuses.");
				for (const pokemon of this.getAllActive()) {
	                	pokemon.cureStatus();
	        	}
	        } else if (result === 28) {
				this.hint("Roulette Wheel Result 29 - Sets up Screens for one side.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.useMove("Reflect", target);
							this.useMove("Light Screen", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.useMove("Reflect", target);
							this.useMove("Light Screen", target);
						}
					}
				}
			} else if (result === 29) {
				this.hint("Roulette Wheel Result 30 - Starts a status immunity for both sides.");
				for (const pokemon of this.getAllActive()) {
	                	this.useMove("Safeguard", pokemon);
	        	}
	        } else if (result === 30) {
				this.hint("Roulette Wheel Result 31 - Deactivates all abilities that are active within 2 turns.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.useMove("Neutral Air", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.useMove("Neutral Air", target);
						}
					}
				}
			} else if (result === 31) {
				this.hint("Roulette Wheel Result 32 - Attempts to Freeze all active Pokemon.");
				for (const pokemon of this.getAllActive()) {
					pokemon.trySetStatus('frz', pokemon);
	        	}
			} else if (result === 32) {
				this.hint("Roulette Wheel Result 33 - Switches out one Pokemon.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							target.forceSwitchFlag = true;
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							target.forceSwitchFlag = true;
						}
					}
				}
			} else if (result === 33) {
				this.hint("Roulette Wheel Result 34 - Sets up Aqua Ring for both sides.");
				for (const pokemon of this.getAllActive()) {
					this.useMove("Aqua Ring", pokemon);
				}
			} else if (result === 34) {
				this.hint("Roulette Wheel Result 35 - One active Pokemon Defogs.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.useMove("Defog", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.useMove("Defog", target);
						}
					}
				}
			} else if (result === 35) {
				this.hint("Roulette Wheel Result 36 - Both active Pokemon share a type combination.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.useMove("Reflect Type", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.useMove("Reflect Type", target);
						}
					}
				}
			} else if (result === 36) {
				this.hint("Roulette Wheel Result 37 - glhf");
				for (const pokemon of this.getAllActive()) {
					this.useMove("Sheer Cold", pokemon);
				}
			} else if (result === 37) {
				this.hint("Roulette Wheel Result 38 - uh oh");
				for (const pokemon of this.getAllActive()) {
					this.useMove("Octolock", pokemon);
				}
			} else if (result === 38) {
				this.hint("Roulette Wheel Result 39 - Both active Pokemon use Metronome.");
				for (const pokemon of this.getAllActive()) {
					this.useMove("Metronome", pokemon);
				}
			} else if (result === 39) {
				this.hint("Roulette Wheel Result 40 - get ready");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						const oldAbility = target.setAbility('Moody');
						if (oldAbility) {
							this.add('-ability', target, 'Moody', '[from] move: Roulette Spin');
							return;
						}
					}
				}
				if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						const oldAbility = target.setAbility('Moody');
						if (oldAbility) {
							this.add('-ability', target, 'Moody', '[from] move: Roulette Spin');
							return;
						}
					}
				}
			} else if (result === 40) {
				this.hint("Roulette Wheel Result 41 - Both active Pokemon swap items.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.useMove("Trick", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.useMove("Switcheroo", target);
						}
					}
				}
			} else if (result === 41) {
				this.hint("Roulette Wheel Result 42 - Both active Pokemon trade HP bars.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.useMove("Sick Hacks", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.useMove("Sick Hacks", target);
						}
					}
				}
			} else if (result === 42) {
				this.hint("Roulette Wheel Result 43 - Both active Pokemon use their first move.");
				for (const pokemon of this.getAllActive()) {
					const frstMove = this.dex.moves.get(pokemon.moveSlots[0].id);
					this.useMove(frstMove, pokemon);
				}
			} else if (result === 43) {
				this.hint("Roulette Wheel Result 44 - One active Pokemon gains a higher crit rate.");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.useMove("Focus Energy", target);
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.useMove("Focus Energy", target);
						}
					}
				}
			} else if (result === 44) {
				this.hint("Roulette Wheel Result 45 - One new spin for each active Pokemon!");
				for (const pokemon of this.getAllActive()) {
					this.useMove("Roulette Spin", pokemon);
				}
			} else if (result === 45) {
				this.hint("Roulette Wheel Result 46 - One active Pokemon becomes way faster than the other.");
				for (const pokemon of this.sides[0].active) {
					for (const target of this.sides[1].active) {
						if (pickSide === 0) {
							this.boost({spe: 12}, pokemon, pokemon, null, true);
							this.boost({spe: -12}, target, target, null, true);
						} else if (pickSide === 1) {
							this.boost({spe: 12}, target, target, null, true);
							this.boost({spe: -12}, pokemon, pokemon, null, true);
						}
					}
				}
			} else if (result === 46) {
				this.hint("Roulette Wheel Result 47 - sussie");
				if (pickSide === 0) {
					for (const target of this.sides[0].pokemon) {
						if (target.isActive) {
							this.useMove("Vote Out", target);
							return false;
						}
					}
				} else if (pickSide === 1) {
					for (const target of this.sides[1].pokemon) {
						if (target.isActive) {
							this.useMove("Vote Out", target);
							return false;
						}
					}
				}
			} else if (result === 47) {
				this.hint("Roulette Wheel Result 48 - Time for some good ol' Mario Kart Wii");
				for (const pokemon of this.sides[0].active) {
					for (const target of this.sides[1].active) {
						if (target.storedStats.spe < pokemon.storedStats.spe) {
							this.useMove("Flame Runner", pokemon);
							const oldAbility = target.setAbility('Slow Start');
							if (oldAbility) {
								this.add('-ability', target, 'Slow Start', '[from] move: Flame Runner', '[silent]');
								if (target.side !== pokemon.side) target.volatileStaleness = 'external';
								return;
							}
						} else if (target.storedStats.spe > pokemon.storedStats.spe) {
							this.useMove("Flame Runner", target);
							const oldAbility = pokemon.setAbility('Slow Start');
							if (oldAbility) {
								this.add('-ability', pokemon, 'Slow Start', '[from] move: Flame Runner', '[silent]');
								if (target.side !== pokemon.side) pokemon.volatileStaleness = 'external';
								return;
							}
						} else {
							for (const active of this.getAllActive()) {
								this.useMove("Flame Runner", active);
							}
						}
					}
				}
			} else if (result === 48) {
				this.hint("Roulette Wheel Result 49 - Ad break.");
				this.add('-message', "Hello Duomod v3 enjoyer!");
				this.add('-message', "The fact that you're spending your time on Pokemon Showdown must mean you're really bored!");
				this.add('-message', "Well today's your lucky day! Because I've got just the cure!");
				this.add('-message', "Head on over to DuoM2's YouTube channel, featuring several videos from the one and only DuoM2!");
				this.add('-message', "He's smart, funny, a gamer, handsome, and the best Mewtwo main in South Carolina Smash!");
				this.add('-message', "With 4 hours of content right now and more to come, your boredom will soar off into space!");
				this.add('-message', "Plus, as a special promotional bonus, if you subscribe now, you'll get to say you knew him before it was cool!");
				this.add('-message', "Subscribe to DuoM2's YouTube channel for the time of your life! Linked down below!");
				this.add('-message', "https://www.youtube.com/channel/UCvVihnVokWwZ4NpeMsBk48A/");
				this.add('-message', "https://www.youtube.com/channel/UCvVihnVokWwZ4NpeMsBk48A/");
				this.add('-message', "https://www.youtube.com/channel/UCvVihnVokWwZ4NpeMsBk48A/");
			} else {
				this.hint("Roulette Wheel Result 50 - THE ULTIMATE EFFECT");
				for (const pokemon of this.getAllActive()) {
					this.useMove("Ultranome", pokemon);
				}
			}
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target || source.switchFlag === true) return;
			if (move.id === 'metronome') {
				const newMove = this.dex.getActiveMove('metronome');
				this.actions.useMove(newMove, target, source);
			}
		},
		flags: {},
		name: "Duomod Reference??",
		shortDesc: "This Pokemon uses Metronome twice. Spins the Roulette Wheel during Metronome Battle."
	},
	corrosion: {
		inherit: true,
		onEffectiveness(typeMod, target, type, move) {
			if (this.field.pseudoWeather.shitstorm && move.type === 'Poison' && type === 'Steel') return 1;
		},
		shortDesc: "Corrosion + Poison hits Steel supereffectively in Shitstorm.",
	},
	domainexpander: {
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectState.target;
			if (unawareUser === pokemon) return;
			if (pokemon === this.activePokemon && unawareUser === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['def'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (this.field.pseudoWeather.mindfuck && typeof accuracy === 'number' && move.accuracy === 100) return this.chainModify([5324, 4096]);
		},
		flags: {breakable: 1},
		name: "Domain Expander",
		shortDesc: "Unaware when taking damage + 100% moves have 1.3x power in Mindfuck.",
	},
	sandrush: {
		onDamage(damage, target, source, effect) {
			if (effect && ['stealthrock', 'spikes'].includes(effect.id)) {
				return false;
			}
		},
		onModifySpe(spe, pokemon) {
			if (this.field.pseudoWeather.landslide) {
				return this.chainModify(2);
			}
		},
		flags: {},
		name: "Sand Rush",
		shortDesc: "Immune to hazards + doubled speed in Landslide.",
	},
	
	wetskin: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Heatproof Atk weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Heatproof SpA weaken');
				return this.chainModify(0.5);
			}
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.field.pseudoWeather.wetskin || !pokemon.hp) return;
			this.heal(pokemon.baseMaxhp / 8);
		},
		flags: {breakable: 1},
		name: "Wet Skin",
		shortDesc: "Halved Fire damage + 1/8 healing in Flash Flood.",
	},

	//other abils
	cloudnine: {
		onStart(pokemon) {
			for(let i = 0; i < 2; i ++) {
				if(this.field.pseudoWeather.length == 0) break;
				const weather = this.sample(this.field.pseudoWeather);
				this.field.removePseudoWeather(weather);
			}
		},
		flags: {},
		name: "Cloud Nine",
		shortDesc: "On switchin, this Pokemon removes two weather conditions.",
	},
	airlock: {
		onStart(pokemon) {
			for(let i = 0; i < this.field.pseudoWeather.length; i ++) {
				if(this.field.pseudoWeather.length == 0) break;
				const weather = this.sample(this.field.pseudoWeather);
				this.field.removePseudoWeather(weather);
			}
		},
		flags: {},
		name: "Air Lock",
		shortDesc: "On switchin, this Pokemon removes all weather conditions.",
	},
	forecast: {
		onStart(pokemon) {
			this.singleEvent('PseudoWeatherChange', this.effect, this.effectState, pokemon);
		},
		onAnyPseudoWeatherChange(target, source, pseudoWeather) {
			const newTypes = target.getTypes();
			switch (pseudoWeather) {
				case 'theswarm':
					newType.push('Bug');
					break;
				case 'twilightzone':
					newType.push('Dark');
					break;
				case 'lotsofreallysmalldragons':
					newType.push('Dragon');
					break;
				case 'thunderstorm':
					newType.push('Electric');
					break;
				case 'fable':
					newType.push('Fairy');
					break;
				case 'colosseum':
					newType.push('Fighting');
					break;
				case 'drought':
					newType.push('Fire');
					break;
				case 'deltastream':
					newType.push('Flying');
					break;
				case 'thevoices':
					newType.push('Ghost');
					break;
				case 'overgrowth':
					newType.push('Grass');
					break;
				case 'duststorm':
					newType.push('Ground');
					break;
				case 'whiteout':
					newType.push('Ice');
					break;
				case 'metronomebattle':
					newType.push('Normal');
					break;
				case 'shitstorm':
					newType.push('Poison');
					break;
				case 'mindfuck':
					newType.push('Psychic');
					break;
				case 'landslide':
					newType.push('Rock');
					break;
				case 'timewarp':
					newType.push('Steel');
					break;
				case 'flashflood':
					newType.push('Water');
					break;
			}
			if(pokemon.setType(newTypes)) this.add('-start', pokemon, 'typechange', newTypes.join('/'));
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1},
		name: "Forecast",
		shortDesc: "This Pokemon gains types according to the weather.",
	},
	flowergift: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if (!pokemon.isActive || pokemon.baseSpecies.baseSpecies !== 'Cherrim' || pokemon.transformed) return;
			if (!pokemon.hp) return;
			if (this.field.pseudoWeather.drought || this.field.pseudoWeather.overgrowth) {
				if (pokemon.species.id !== 'cherrimsunshine') {
					pokemon.formeChange('Cherrim-Sunshine', this.effect, false, '[msg]');
				}
			} else {
				if (pokemon.species.id === 'cherrimsunshine') {
					pokemon.formeChange('Cherrim', this.effect, false, '[msg]');
				}
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk) {
			if (this.field.pseudoWeather.drought || this.field.pseudoWeather.overgrowth) return this.chainModify(2);
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, breakable: 1},
		name: "Flower Gift",
		shortDesc: "Cherrim: changes to Cherrim-Sunshine, 2x Attack in Drought / Overgrowth."
	},
	weathersetter: {
		//implemented in conditions.ts
		flags: {},
		name: "Weather Setter",
		shortDesc: "This Pokemon's weather-setting moves have infinite duration.",
	},
	
	//duomod reference
	vent: {
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 10 && target.hp + damage > target.maxhp / 10) {
				this.add('-message', target.name + " is gonna Vent!");
				target.switchFlag = true;
				this.heal(target.baseMaxhp);
			}
		},
		name: "Vent",
		rating: 5,
		num: 3018,
	},
}