export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	nightshift: {
		shortDesc: "Groabat: Waking Form at >1/4 max HP; loses 1/8 max HP per turn in sun.",
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Groabat' || pokemon.transformed) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'groabat') {
					pokemon.formeChange('Groabat-Waking');
					this.add('-message', `${pokemon.name} changed to Waking Form!`);
				}
			} else {
				if (pokemon.species.id === 'groabatwaking') {
					pokemon.formeChange('Groabat');
					this.add('-message', `${pokemon.name} returned to normal!`);
				}
			}
		},
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (
				pokemon.baseSpecies.baseSpecies !== 'Groabat' ||
				pokemon.transformed || !pokemon.hp
			) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'groabat') {
					pokemon.formeChange('Groabat-Waking');
					this.add('-message', `${pokemon.name} changed to Waking Form!`);
				}
			} else {
				if (pokemon.species.id === 'groabatwaking') {
					pokemon.formeChange('Groabat');
					this.add('-message', `${pokemon.name} returned to normal!`);
				}
			}
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.damage(target.baseMaxhp / 8, target, target);
			}
		},
		isPermanent: true,
		name: "Night Shift",
		rating: 3,
		num: -1,
	},
	afterimage: {
		shortDesc: "If the Pokémon faints, its replacement gains the Ghost-type... permanently!",
		onFaint(pokemon) {
			pokemon.side.addSlotCondition(pokemon, 'afterimage');
		},
		condition: {
			onSwap(target) {
				target.side.removeSlotCondition(target, 'afterimage');
				if (!target.fainted) {
					target.m.afterimage = this.effectData.source; // not being null is truthy
					if (target.hasType('Ghost')) return;
					if (!target.addType('Ghost')) return;
					this.add('-start', target, 'typeadd', 'Ghost', '[from] Ability: Afterimage', '[of] ' + target.m.afterimage);
				}
			},
		},
		name: "Afterimage",
		rating: 3,
		num: -2,
	},
	spectralsurfer: {
		shortDesc: "The Pokémon's Ghost-type moves become Water-type and have 1.2x power.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.type === 'Ghost' && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Water';
				move.spectralSurferBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.spectralSurferBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		name: "Spectral Surfer",
		rating: 4,
		num: -3,
	},
	necromancy: {
		shortDesc: "At the end of each turn, makes a substitute from the last fainted Pokémon.",
		onSwap(pokemon) {
			if (!pokemon.fainted && pokemon.battle.lastKOhealth) {
				if (pokemon.addVolatile('substitute')) {
					pokemon.volatiles['substitute'].hp = 0;
					pokemon.volatiles['substitute'].hp += Math.floor(pokemon.battle.lastKOhealth / 2);
					this.add('-ability', pokemon, 'Necromancy');
					if (pokemon.battle.lastKOname) {
						this.add('-message', `${pokemon.name} called for ${pokemon.battle.lastKOname}'s help beyond the grave...!!`);
					} else {
						this.add('-message', `${pokemon.name} called for help beyond the grave...!!`);
					}
					this.add('-anim', pokemon, "Thunder", pokemon);
					pokemon.battle.lastKOhealth = null;
					this.add('-message', `I t ' s   a l i v e !`);
					if (pokemon.battle.lastKOname) {
						this.add('-message', `${pokemon.name} created a Substitute from ${pokemon.battle.lastKOname}'s remains...`);
					} else {
						this.add('-message', `${pokemon.name} created a Substitute...`);
					}
					this.add('-start', pokemon, 'Substitute', '[silent]');
					pokemon.battle.lastKOname = null;
				}
			}
		},
		onResidual(pokemon) {
			if (pokemon.battle.lastKOhealth) {
				if (pokemon.addVolatile('substitute')) {
					pokemon.volatiles['substitute'].hp = 0;
					pokemon.volatiles['substitute'].hp += Math.floor(pokemon.battle.lastKOhealth / 2);
					this.add('-ability', pokemon, 'Necromancy');
					if (pokemon.battle.lastKOname) {
						this.add('-message', `${pokemon.name} called for ${pokemon.battle.lastKOname}'s help beyond the grave...!!`);
					} else {
						this.add('-message', `${pokemon.name} called for help beyond the grave...!!`);
					}
					this.add('-anim', pokemon, "Thunder", pokemon);
					pokemon.battle.lastKOhealth = null;
					this.add('-message', `I t ' s   a l i v e !`);
					if (pokemon.battle.lastKOname) {
						this.add('-message', `${pokemon.name} created a Substitute from ${pokemon.battle.lastKOname}'s remains...`);
					} else {
						this.add('-message', `${pokemon.name} created a Substitute...`);
					}
					this.add('-start', pokemon, 'Substitute', '[silent]');
					pokemon.battle.lastKOname = null;
				}
			}
		},
		name: "Necromancy",
		rating: 5,
		num: -4,
	},
	desecrate: {
		shortDesc: "All Ground-type moves become Ghost-type and have 1.2x power.",
		onAnyModifyTypePriority: -1,
		onAnyModifyType(move, pokemon) {
			if (move.type === 'Ground' && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Ghost';
				move.desecrateBoosted = true;
			}
		},
		onAnyBasePowerPriority: 23,
		onAnyBasePower(basePower, pokemon, target, move) {
			if (move.desecrateBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		name: "Desecrate",
		rating: 4,
		num: -5,
	},
	lifestrike: {
		shortDesc: "The Pokémon's Speed is raised by 6 stages after it is damaged by Electric moves.",
		onDamagingHit(damage, target, source, move) {
			if (['Electric'].includes(move.type)) {
				this.boost({spe: 6});
			}
		},
		name: "Life Strike",
		rating: 2,
		num: -6,
	},
	hallowseve: {
		name: "Hallows' Eve",
		rating: 3,
		num: -18,
	},
	hoard: {
		shortDesc: "When it leaves battle, the Pokémon restores its original held item.",
		onSwitchOut(pokemon) {
			if (!pokemon.item && pokemon.m.originalItem) {
				if (pokemon.setItem(pokemon.m.originalItem)) {
					this.add('-ability', pokemon, 'Hoard');
					this.add('-item', pokemon, this.dex.getItem(pokemon.m.originalItem), '[from] Ability: Hoard');
				}
			}
		},
		name: "Hoard",
		rating: 3,
		num: -7,
	},
	chickenout: {
		shortDesc: "When its HP reaches 0, the Pokémon retreats to the party, and then...",
		name: "Chicken Out",
		onBeforeSwitchIn(pokemon) {
			if (pokemon.headless) {
				pokemon.setAbility('wonderguard');
				pokemon.baseAbility = 'wonderguard';
				pokemon.ability = 'wonderguard';
				pokemon.headless = false;
				pokemon.switchedIn = undefined;
			}
		},
		onFaint(pokemon) {
			if (pokemon.species.baseSpecies === 'Poultergeist' && !pokemon.transformed && !pokemon.headless && this.canSwitch(pokemon.side)) {
				if (pokemon.formeChange('Poultergeist-Headless', this.effect, true)) {
					this.add('-ability', pokemon, 'Chicken Out');
					this.add('-message', `${pokemon.name} ran off somewhere...`);
					pokemon.headless = true;
					pokemon.maxhp = 1;
					pokemon.hp = 1;
				}
			}
		},
		isUnbreakable: true,
		isPermanent: true,
		rating: 5,
		num: -8,
	},
	arcaneswitch: {
		shortDesc: "Cobroom: Alchemist form before using Poison move, Sorcerer before Dark.",
		name: "Arcane Switch",
		onBeforeMovePriority: 0.5,
		onBeforeMove(attacker, defender, move) {
			if (attacker.species.baseSpecies !== 'Cobroom' || attacker.transformed) return;
			if (move.type !== 'Poison' && move.type !== 'Dark') return;
			const targetForme = (move.type === 'Poison' ? 'Cobroom' : 'Cobroom-Sorcerer');
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
			this.add('-message', `${attacker.name} changed to ${targetForme}!`);
		},
		isPermanent: true,
		rating: 4,
		num: -9,
	},
	alchemist: {
		desc: "After attacking a poisoned target with a Poison-type move, this Pokémon has an equal chance to cause one of various random effects. Possible effects include: replacing the poison status with paralysis, burn or toxic poison; afflicting the target with confusion, Torment or Encore; choosing two random stats and either boosting or lowering each one; causing the target to use Explosion if its current HP is 25% or less or afflicting it with a Curse if not; or transforming the target into Seismitoad, Ariados or Butterfree until it switches out.",
		shortDesc: "Poison-type move on poisoned target: random chance of 11 different effects.",
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && target.hp && move.type === 'Poison' && ['psn', 'tox'].includes(target.status)) {
				const r = this.random(11);
				if (r < 1) {
					if (!target.setStatus('par', source)) {
						this.add('-ability', source, 'Alchemist');
						this.add('-message', `${(target.illusion ? target.illusion.name : target.name)} couldn't be paralyzed!`);
					}
				} else if (r < 2) {
					if (target.setStatus('brn', source)) {
						this.add('-ability', source, 'Alchemist');
						this.add('-message', `${(target.illusion ? target.illusion.name : target.name)} couldn't be burned!`);
					}
				} else if (r < 3) {
					if (target.status === 'psn') {
						this.add('-message', `${(target.illusion ? target.illusion.name : target.name)}'s poison became more severe!`);
						target.setStatus('tox', source);
					} else {
						this.add('-ability', source, 'Alchemist');
						this.add('-message', `${(target.illusion ? target.illusion.name : target.name)}'s poison can't get any worse!`);
					}
				} else if (r < 4) {
					this.add('-ability', source, 'Alchemist');
					if (!target.addVolatile('confusion')) {
						this.add('-message', `${(target.illusion ? target.illusion.name : target.name)} could not be confused!`);
					}
				} else if (r < 5) {
					this.add('-ability', source, 'Alchemist');
					if (!target.addVolatile('encore')) {
						this.add('-message', `${(target.illusion ? target.illusion.name : target.name)} could not be affected by Encore!`);
					}
				} else if (r < 6) {
					this.add('-ability', source, 'Alchemist');
					if (!target.addVolatile('torment')) {
						this.add('-message', `${(target.illusion ? target.illusion.name : target.name)} could not be affected by Torment!`);
					}
				} else if (r < 7) {
					this.add('-ability', source, 'Alchemist');
					const randStat1 = this.random(5);
					let randStat2 = this.random(4);
					if (randStat2 === randStat1) {
						randStat2 = 4;
					}
					const alchemistBoost: SparseBoostsTable = {};
					if (randStat1 < 1) {
						alchemistBoost.atk = -1;
					} else if (randStat1 < 2) {
						alchemistBoost.def = -1;
					} else if (randStat1 < 3) {
						alchemistBoost.spa = -1;
					} else if (randStat1 < 4) {
						alchemistBoost.spd = -1;
					} else {
						alchemistBoost.spe = -1;
					}
					if (randStat2 < 1) {
						alchemistBoost.atk = -1;
					} else if (randStat2 < 2) {
						alchemistBoost.def = -1;
					} else if (randStat2 < 3) {
						alchemistBoost.spa = -1;
					} else if (randStat2 < 4) {
						alchemistBoost.spd = -1;
					} else {
						alchemistBoost.spe = -1;
					}
					this.boost(alchemistBoost, target, source, null, true);
				} else if (r < 8) {
					this.add('-ability', source, 'Alchemist');
					const randStat1 = this.random(5);
					let randStat2 = this.random(4);
					if (randStat2 === randStat1) {
						randStat2 = 4;
					}
					const alchemistBoost: SparseBoostsTable = {};
					if (randStat1 < 1) {
						alchemistBoost.atk = 1;
					} else if (randStat1 < 2) {
						alchemistBoost.def = 1;
					} else if (randStat1 < 3) {
						alchemistBoost.spa = 1;
					} else if (randStat1 < 4) {
						alchemistBoost.spd = 1;
					} else {
						alchemistBoost.spe = 1;
					}
					if (randStat2 < 1) {
						alchemistBoost.atk = -1;
					} else if (randStat2 < 2) {
						alchemistBoost.def = -1;
					} else if (randStat2 < 3) {
						alchemistBoost.spa = -1;
					} else if (randStat2 < 4) {
						alchemistBoost.spd = -1;
					} else {
						alchemistBoost.spe = -1;
					}
					this.boost(alchemistBoost, target, source, null, true);
				} else if (r < 9) {
					this.add('-ability', source, 'Alchemist');
					const randStat1 = this.random(5);
					let randStat2 = this.random(4);
					if (randStat2 === randStat1) {
						randStat2 = 4;
					}
					const alchemistBoost: SparseBoostsTable = {};
					if (randStat1 < 1) {
						alchemistBoost.atk = 1;
					} else if (randStat1 < 2) {
						alchemistBoost.def = 1;
					} else if (randStat1 < 3) {
						alchemistBoost.spa = 1;
					} else if (randStat1 < 4) {
						alchemistBoost.spd = 1;
					} else {
						alchemistBoost.spe = 1;
					}
					if (randStat2 < 1) {
						alchemistBoost.atk = 1;
					} else if (randStat2 < 2) {
						alchemistBoost.def = 1;
					} else if (randStat2 < 3) {
						alchemistBoost.spa = 1;
					} else if (randStat2 < 4) {
						alchemistBoost.spd = 1;
					} else {
						alchemistBoost.spe = 1;
					}
					this.boost(alchemistBoost, target, source, null, true);
				} else if (r < 10) {
					this.add('-ability', source, 'Alchemist');
					if (target.hp >= target.maxhp / 4) {
						if (!target.addVolatile('curse')) {
							this.add('-message', `${(target.illusion ? target.illusion.name : target.name)} could not be cursed!`);
						}
					} else {
						this.add('-message', `${(target.illusion ? target.illusion.name : target.name)} suddenly exploded!`);
						this.useMove('explosion', target, "[from] ability: Alchemist", "[of] " + source);
					}
				} else {
					this.add('-ability', source, 'Alchemist');
					if (!target.addVolatile('alchemist')) {
						this.add('-message', `${(target.illusion ? target.illusion.name : target.name)} has already transformed!`);
					}
				}
			}
		},
		condition: {
			onStart(pokemon) {
				this.add('-message', `${(pokemon.illusion ? pokemon.illusion.name : pokemon.name)} is being transformed...!?`);
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
		num: -10,
	},
	chainlink: {
		shortDesc: "In a double battle, the Pokémon steals its partner's Steel type.",
		onUpdate(pokemon) {
			if (!pokemon.isStarted) return; // should activate *after* Data Mod
			if (!pokemon.hasType('Steel')) {
				for (const ally of pokemon.allies()) {
					if (ally.hasAbility('chainlink')) continue; // don't bounce back and forth indefinitely
					if (ally.hasType('Steel') && pokemon.addType('Steel')) {
						this.add('-ability', pokemon, 'Chain Link');
						this.add('-message', `${pokemon.name} stole its partner's armor!`);
						this.add('-start', pokemon, 'typeadd', 'Steel', '[from] Ability: Chain Link');
						ally.addVolatile('chainlink');
					}
				}
			}
		},
		onEnd(pokemon) {
			if (!pokemon.hasType('Steel')) return;
			// doesn't happen twice if the ally has already returned the armor
			for (const ally of pokemon.allies()) {
				ally.removeVolatile('chainlink');
			}
		},
		condition: {
			onStart(pokemon) {
				pokemon.setType(pokemon.getTypes(true).map(type => type === "Steel" ? "???" : type));
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'));
			},
			onSwitchOut(pokemon) { // it seems like volatiles may not run onEnd on their own the way Abilities do
				pokemon.removeVolatile('chainlink');
			},
			onFaint(pokemon) {
				pokemon.removeVolatile('chainlink');
			},
			onEnd(pokemon) {
				for (const ally of pokemon.allies()) { // revert Chain Link user's type first
					if (ally.hasAbility('chainlink') && ally.hasType('Steel')) {
						let types = ally.baseSpecies.types;
						if (ally.getTypes().join() === types.join() || !ally.setType(types)) return;
						this.add('-ability', ally, 'Chain Link');
						this.add('-message', `${ally.name} returned its partner's armor!`);
						this.add('-start', ally, 'typechange', ally.types.join('/'));
						types = pokemon.baseSpecies.types;
						if (pokemon.getTypes().join() === types.join() || !pokemon.setType(types)) return;
						this.add('-start', pokemon, 'typechange', pokemon.types.join('/'));
					}
				}
			},
		},
		name: "Chain Link",
		rating: 3,
		num: -11,
	},
	nightmareheart: {
		desc: "When this Pokémon faints, the Pokémon that knocked it out is cursed, losing 1/4 of its maximum HP, rounded down, at the end of each turn while it is active. In addition, the Pokémon that knocked it out permanently receives this Ability, which persists even through switching, until it is knocked out and the Ability is passed along again.",
		shortDesc: "If this Pokémon is KOed, the attacker is cursed, then permanently receives this Ability.",
		onFaint(target, source, effect) {
			if (!source || !effect || target.side === source.side) return;
			if (effect.effectType === 'Move' && !effect.isFutureMove) {
				this.add('-ability', target, 'Nightmare Heart');
				source.addVolatile('curse');
				const bannedAbilities = [
					'battlebond', 'comatose', 'disguise', 'insomnia', 'multitype', 'powerconstruct', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange', 'truant', 'zenmode',
				];
				if (bannedAbilities.includes(source.ability)) {
					return;
				} else {
					source.setAbility('nightmareheart');
					source.baseAbility = 'nightmareheart' as ID;
					source.ability = 'nightmareheart' as ID;
					this.add('-ability', source, 'Nightmare Heart', '[from] Ability: Nightmare Heart');
				}
			}
		},
		name: "Nightmare Heart",
		rating: 3,
		num: -12,
	},
	comedian: {
		desc: "This Pokémon is immune to Fairy-type moves. When hit by a Fairy-type move, it raises its Attack and its adjacent allies' Attack by 1 stage each.",
		shortDesc: "Fairy immunity; user's Attack and allies' Attack are both raised 1 stage if user is hit by a Fairy move.",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fairy') {
				let activated = false;
				for (const ally of target.side.active) {
					if (!ally || (!this.isAdjacent(ally, target) && ally !== target)) continue;
					if (!activated) {
						this.add('-ability', target, 'Comedian', 'boost');
						this.add('-message', `${target.name} is howling with laughter!`);
						activated = true;
					}
					this.boost({atk: 1}, ally, target, null, true);
				}
				if (!activated) {
					this.add('-immune', target, '[from] ability: Comedian');
					this.add('-message', `${target.name} is howling with laughter!`);
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (target === this.effectData.target || target.side !== source.side) return;
			if (move.type === 'Fairy') {
				let activated = false;
				for (const ally of target.side.active) {
					if (!ally || (!this.isAdjacent(ally, target) && ally !== target)) continue;
					if (!activated) {
						this.add('-ability', target, 'Comedian', 'boost');
						this.add('-message', `${target.name} is howling with laughter!`);
						activated = true;
					}
					this.boost({atk: 1}, ally, target, null, true);
				}
			}
		},
		name: "Comedian",
		rating: 3,
		num: -13,
	},
	truegrowth: {
		desc: "If Cozminea: Changes to True form after using Hyperspace Hole.",
		name: "True Growth",
		onSourceAfterMoveSecondary(target, source, move) {
			if (move.id !== 'hyperspacehole' || (source.species.name !== 'Cozminea' && source.species.name !== 'Cozminea-Hallowed')|| source.transformed) return;
			if (source.species.name === 'Cozminea') source.formeChange('Cozminea-True', this.effect, true, '[silent]');
			if (source.species.name === 'Cozminea-Hallowed') source.formeChange('Cozminevil', this.effect, true, '[silent]');
			this.add('-message', `${source.name} revealed its true forme!`);
		},
		isPermanent: true,
		rating: 3,
		num: -14,
	},
	murmuration: {
		shortDesc: "If user is Crown Starly, changes to Cloud Form if it has > 1/4 max HP, else Solo Form.",
		onStart(pokemon) {
			if (!pokemon.species.id.startsWith('starlycrown') || pokemon.level < 34 || pokemon.transformed) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'starlycrown') {
					pokemon.formeChange('Starly-Crown-Cloud', this.effect, true);
					this.add('-message', `${pokemon.name} changed to Cloud Form!`);
				}
			} else {
				if (pokemon.species.id === 'starlycrowncloud') {
					pokemon.formeChange('Starly-Crown', this.effect, true);
					this.add('-message', `${pokemon.name} changed to Solo Form...`);
				}
			}
		},
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (!pokemon.species.id.startsWith('starlycrown') || pokemon.level < 34 || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'starlycrown') {
					pokemon.formeChange('Starly-Crown-Cloud', this.effect, true);
					this.add('-message', `${pokemon.name} changed to Cloud Form!`);
				}
			} else {
				if (pokemon.species.id === 'starlycrowncloud') {
					pokemon.formeChange('Starly-Crown', this.effect, true);
					this.add('-message', `${pokemon.name} changed to Solo Form...`);
				}
			}
		},
		onFaint(pokemon) {
			if (pokemon.species.id !== 'starlycrowncloud' || pokemon.transformed) return;
			pokemon.formeChange('Starly-Crown', this.effect, true);
			this.add('-message', `${pokemon.name} changed to Solo Form...`);
		},
		isPermanent: true,
		name: "Murmuration",
		rating: 3,
		num: -15,
	},
	clairvoyance: {
		desc: "This Pokémon's Psychic-type moves take effect two turns after being used. At the end of that turn, the damage is calculated at that time and dealt to the Pokémon at the position the target had when the move was used. Only one move can be delayed at a time. If the user is no longer active at the time an attacking move should hit, damage is calculated based on the user's natural Attack or Special Attack stat, types, and level, with no boosts from its held item or Ability. Status moves are used by the Pokémon at the position the user had when the move was used.",
		shortDesc: "Psychic-type moves delayed until two turns later, but only one at a time.",
		onBeforeMove(source, target, move) {
			if (
				move && move.type === 'Psychic' && source.hasAbility('clairvoyance') &&
				source.side.addSlotCondition(source, 'clairvoyance')
			) {
				Object.assign(source.side.slotConditions[source.position]['clairvoyance'], {
					duration: 3,
					source: source,
					target: null,
					move: move,
					position: target.position,
					side: target.side,
					moveData: this.dex.getMove(move),
				});
				this.add('-ability', source, 'Clairvoyance');
				this.add('-message', `${source.name} cast ${move.name} into the future!`);
				source.deductPP(move.id, 1);
				return null;
			}
		},
		condition: {
			duration: 3,
			onResidualOrder: 3,
			onEnd(target) {
				this.effectData.target = this.effectData.side.active[this.effectData.position];
				const data = this.effectData;
				const move = this.dex.getMove(data.move);
				this.add('-ability', this.effectData.source, 'Clairvoyance');
				if (!data.target) {
					this.hint(`${move.name} did not hit because there was no target.`);
					return;
				}

				this.add('-message', `${this.effectData.source.name}'s ${move.name} took effect!`);
				data.target.removeVolatile('Endure');

				if (data.source.hasAbility('infiltrator') && this.gen >= 6) {
					data.moveData.infiltrates = true;
				}
				if (data.source.hasAbility('normalize') && this.gen >= 6) {
					data.moveData.type = 'Normal';
				}
				if (data.source.hasAbility('adaptability') && this.gen >= 6) {
					data.moveData.stab = 2;
				}
				data.moveData.isFutureMove = true;
				delete data.moveData.flags['contact'];
				delete data.moveData.flags['protect'];

				if (move.category === 'Status') {
					this.useMove(move, target, data.target);
				} else {
					const hitMove = new this.dex.Move(data.moveData) as ActiveMove;
					if (data.source.isActive) {
						this.add('-anim', data.source, hitMove, data.target);
					}
					this.trySpreadMoveHit([data.target], data.source, hitMove);
				}
			},
		},
		name: "Clairvoyance",
		rating: 3,
		num: -16,
	},
	rebel: {
		shortDesc: "This Pokémon and allies: 1.3x damage when any Pokémon has stat drops.",
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			let rebel = null;
			for (const pokemon of this.getAllActive()) {
				let statDrop: BoostName;
				for (statDrop in pokemon.boosts) {
					if (pokemon.boosts[statDrop] < 0) rebel = true;
				}
			}
			if (rebel) {
				this.debug('Rebel boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		name: "Rebel",
		rating: 2.5,
		num: -17,
	},
	hallowseve: {
		shortDesc: "This Pokémon's SpA and SpD rise when targeted by a Ghost move.",
		onAnyTryMove(source, target, move) {
			if (move && move.type === 'Ghost' && target === this.effectData.target) target.addVolatile('hallowseve');
		},
		condition: {
			duration: 1,
			onUpdate(pokemon) {
				this.add('-ability', pokemon, "Hallows' Eve");
				this.boost({spa: 1, spd: 1});
				pokemon.removeVolatile('hallowseve');
			},
		},
		name: "Hallows' Eve",
		rating: 3,
		num: -18,
	},
	hungerswitch: { // modified for Klefki-Galar
		shortDesc: "If Morpeko or Klefki-Galar, it changes between modes at the end of each turn.",
		onResidual(pokemon) {
			if (pokemon.transformed) return;
			let targetForme = null;
			if (pokemon.species.baseSpecies === 'Morpeko') targetForme = pokemon.species.name === 'Morpeko' ? 'Morpeko-Hangry' : 'Morpeko';
			if (pokemon.species.name.startsWith('Klefki-Galar')) targetForme = pokemon.species.name === 'Klefki-Galar' ? 'Klefki-Galar-Revealed' : 'Klefki-Galar';
			if (targetForme) {
				pokemon.formeChange(targetForme);
				if (targetForme === 'Klefki-Galar') {
					this.add('-message', `${pokemon.name} changed to Lure Mode!`);
				} else if (targetForme === 'Klefki-Galar-Revealed') {
					this.add('-message', `${pokemon.name} changed to Revealed Mode!`);
				}
			} else {
				return;
			}
		},
		// isPermanent: true, // it actually isn't in canon despite how weird that is
		name: "Hunger Switch",
		rating: 1,
		num: 258,
	},
	// modified for Hat of Disguise
	illusion: {
		onBeforeSwitchIn(pokemon) {
			pokemon.illusion = null;
			let i;
			for (i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
				if (!pokemon.side.pokemon[i]) continue;
				if (!pokemon.side.pokemon[i].fainted) break;
			}
			if (!pokemon.side.pokemon[i]) return;
			if (pokemon === pokemon.side.pokemon[i]) return;
			pokemon.illusion = pokemon.side.pokemon[i];
		},
		onDamagingHit(damage, target, source, move) {
			if (target.illusion) {
				this.singleEvent('End', this.dex.getAbility('Illusion'), target.abilityData, target, source, move);
				if (target.item === 'hatofdisguise') {
					target.useItem();
					target.setAbility(target.baseAbility);
				}	
			}
		},
		onTakeItem(item, pokemon, source) {
			if (pokemon.item === 'hatofdisguise') {
				if (pokemon.illusion) {
						this.singleEvent('End', this.dex.getAbility('Illusion'), target.abilityData, target, source, move);
						pokemon.setAbility(pokemon.baseAbility);
					}	
			}
			return true;
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
			if (pokemon.item === 'hatofdisguise') {
				pokemon.useItem();
				pokemon.setAbility(pokemon.baseAbility);
			}
			// not sure if Bloonket Costume needs special attention here but we can find out!
		},
		isUnbreakable: true,
		name: "Illusion",
		rating: 4.5,
		num: 149,
	},
};
