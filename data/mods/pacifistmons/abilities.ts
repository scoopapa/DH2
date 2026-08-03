export const Abilities: {[k: string]: ModdedAbilityData} = {
	/*
	placeholder: {
		
		flags: {},
		name: "",
		shortDesc: "",
	},
	*/
	aftermath: {
		onFaint(pokemon) {
			if (pokemon.adjacentFoes().length == 0) return;
			const foe = pokemon.adjacentFoes()[0];
			this.damage(foe.baseMaxhp / 4, foe, pokemon);
		},
		flags: {},
		name: "Aftermath",
		shortDesc: "When this Pokemon faints, the opponent loses 1/4 max HP.",
	},
	aurabreak: {
		onTryHit(pokemon, target, move) {
			if (!target.hasType(move.type)) {
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon);
				this.add('-immune', pokemon, '[from] ability: Aura Break');
				return null;
			}
		},
		flags: {},
		name: "Aura Break",
		shortDesc: "This Pokemon loses 1/8 max HP to block moves that don't match the attacker's typing.",
	},
	baddreams: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (target.status === 'slp' || target.hasAbility('comatose')) {
					target.addDoom(30);
				}
			}
		},
		flags: {},
		name: "Bad Dreams",
		shortDesc: "While this Pokemon is active, sleeping opponents gain 30 Doom at the end of each turn.",
	},
	blaze: {
		//handled in scripts/pokemon/setStatus
		flags: {},
		name: "Blaze",
		shortDesc: "This Pokemon can burn a Pokemon regardless of its typing.",
	},
	cleansingflame: {
		onAnyAfterSetStatus(status, target, source, effect) {
			if (!source.hasAbility('cleansingflame')) return;
			if (source !== this.effectState.target || target === source || effect.effectType !== 'Move') return;
			if (status.id === 'brn') {
				target.trySetStatus('pur');
			}
		},
		flags: {},
		name: "Cleansing Flame",
		shortDesc: "When this Pokemon burns a target, the target becomes Purified."
	},
	clearbody: {
		inherit: true,
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'pur') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Clear Body');
			}
			return false;
		},
		shortDesc: "Clear Body + This Pokemon is immune to Purified.",
	},
	cottondown: {
		onDeductPP(target, source) {
			this.boost({ spe: -1 }, target, source, null, true);
		},
		flags: {},
		name: "Cotton Down",
		shortDesc: "When this Pokemon is targeted by a move, the attacker's Spe is lowered by 1.",
	},
	curiousmedicine: {
		//handled in scripts/pokemon/setStatus
		flags: {},
		name: "Curious Medicine",
		shortDesc: "This Pokemon can sleep a Pokemon regardless of its typing.",
	},
	darkaura: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Dark Aura');
		},
		//handled in conditions/doom
		flags: {},
		name: "Dark Aura",
		shortDesc: "While this Pokemon is active, Doom does not decrease when switching out.",
	},
	dreamworld: {
		onDeductPP(target, source) {
			target.addVolatile('yawn');
		},
		flags: {},
		name: "Dream World",
		shortDesc: "When this Pokemon is targeted by a move, the attacker falls asleep next turn.",
	},
	electromorphosis: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (target.status === 'par') {
					this.damage(target.baseMaxhp / 8, target, pokemon);
				}
			}
		},
		flags: {},
		name: "Electromorphosis",
		shortDesc: "While this Pokemon is active, paralyzed opponents lose 1/8 max HP at the end of each turn.",
	},
	gooey: {
		inherit: true,
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'enervate') return null;
		},
		shortDesc: "Gooey + This Pokemon is immune to Enervate.",
	},
	grounding: {
		onStart(pokemon) {
			for (const target of pokemon.adjacentFoes()) {
				if (target.status === 'par' && !target.volatiles['trapped']) {
					this.add('-ability', target, 'Grounding');
					target.addVolatile('trapped', pokemon, this.effect, 'trapper');
				}
			}
		},
		flags: {},
		name: "Grounding",
		shortDesc: "On switchin, this Pokemon traps paralyzed Pokemon until the next turn.",
	},
	hotpursuit: {
		onDisableMove(pokemon) {
			if (pokemon.lastMove && pokemon.moveThisTurnResult !== null) {
				pokemon.disableMove(pokemon.lastMove.id);
			}
		},
		onBeforeTurn(pokemon) {
			for (const side of this.sides) {
				if (side.hasAlly(pokemon)) continue;
				side.addSideCondition('hotpursuit', pokemon);
				const data = side.getSideConditionData('hotpursuit');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack || target?.switchFlag) move.accuracy = true;
		},
		onTryHit(source, target) {
			target.side.removeSideCondition('hotpursuit');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				const move = this.queue.willMove(pokemon.foes()[0]);
				const moveName = move && move.moveid ? move.moveid.toString() : "";
				this.debug('hotpursuit start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectState.sources) {
					if (!source.isAdjacent(pokemon) || !this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon.foes()[0], 'ability: hotpursuit');
						alreadyAdded = true;
					}
					// Run through each action in queue to check if the Pursuit user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (source.canMegaEvo || source.canUltraBurst) {
						for (const [actionIndex, action] of this.queue.entries()) {
							if (action.pokemon === source && action.choice === 'megaEvo') {
								this.actions.runMegaEvo(source);
								this.queue.list.splice(actionIndex, 1);
								break;
							}
						}
					}
					this.actions.runMove(moveName, source, source.getLocOf(pokemon));
				}
			},
		},
		flags: {},
		name: "Hot Pursuit",
		shortDesc: "This Pokemon's moves hit the target before they switch out, but cannot be used twice in a row.",
	},
	innerfocus: {
		inherit: true,
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch' || status.id === 'stun') return null;
		},
		shortDesc: "Inner Focus + This Pokemon is immune to Stun.",
	},
	magicbounce: {
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			const hazards = ['stealthrock', 'spikes', 'toxicspikes', 'stickyweb'];
			if (target === source || move.hasBounced || !hazards.includes(move.id) || target.isSemiInvulnerable()) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.actions.useMove(newMove, target, { target: source });
			return null;
		},
		flags: { breakable: 1 },
		name: "Magic Bounce",
		shortDesc: "This Pokemon blocks hazard moves and bounces them back to the user.",
	},
	moonoftruth: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (target.status === 'frz' && !target.volatiles['confusion']) {
					target.addVolatile('confusion');
				}
			}
		},
		flags: {},
		name: "Moon of Truth",
		shortDesc: "While this Pokemon is active, frozen opponents become confused at the end of each turn.",
	},
	multiscale: {
		onTryAddVolatile(status, pokemon) {
			return null;
		},
		flags: { breakable: 1 },
		name: "Multiscale",
		shortDesc: "This Pokemon is immune to volatile statuses.",
	},
	overcoat: {
		inherit: true,
		shortDesc: "This Pokemon is immune to Sandstorm, Hail, powder moves, and Leech Seed.",
	},
	permafrost: {
		//handled in scripts/pokemon/setStatus
		flags: {},
		name: "Permafrost",
		shortDesc: "This Pokemon can freeze a Pokemon regardless of its typing.",
	},
	poisonpuppeteer: {
		onAnyAfterSetStatus(status, target, source, effect) {
			if (source.baseSpecies.name !== "Pecharunt") return;
			if (source !== this.effectState.target || target === source || effect.effectType !== 'Move') return;
			if (status.id === 'psn' || status.id === 'tox') {
				target.addVolatile('stun');
			}
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1 },
		name: "Poison Puppeteer",
		shortDesc: "Pecharunt: When this Pokemon poisons another Pokemon, that Pokemon becomes stunned.",
	},
	powerconstruct: {
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Zygarde-10%' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.species.id === 'zygardecomplete' || pokemon.hp > pokemon.maxhp / 2) return;
			this.add('-activate', pokemon, 'ability: Power Construct');
			if (pokemon.species.id === 'zygarde') pokemon.formeChange('Zygarde-Complete', this.effect, true);
			else pokemon.formeChange('Zygarde', this.effect, true);
			pokemon.baseMaxhp = Math.floor(Math.floor(
					2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
				) * pokemon.level / 100 + 10);
			const newMaxHP = pokemon.baseMaxhp;
			pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
			pokemon.maxhp = newMaxHP;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			pokemon.canMegaEvo = pokemon.canMegaEvo === false ? false : this.actions.canMegaEvo(pokemon);
			pokemon.formeRegression = true;
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
		name: "Power Construct",
		shortDesc: "Zygarde-10%: Transforms into Zygarde if at 33% HP. Zygarde-50%: Transforms into Zygarde-Complete if at 33% HP."
	},
	quarkdrive: {
		onSwitchInPriority: -2,
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onTerrainChange(pokemon) {
			if (this.field.terrain) {
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
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Quark Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Quark Drive');
				}
				this.add('-start', pokemon, 'quarkdrive');
			},
			onModifySpe(spe, pokemon) {
				if (pokemon.ignoringAbility()) return;
				this.debug('Quark Drive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1 },
		name: "Quark Drive",
		shortDesc: "Terrain active or Booster Energy used: 1.5x Speed.",
	},
	roommaster: {
		onResidualOrder: 6,
		onResidual(pokemon) {
			if (this.field.pseudoWeather.wonderroom ||
				this.field.pseudoWeather.magicroom ||
				this.field.pseudoWeather.trickroom) this.heal(pokemon.baseMaxhp / 16);
		},
		flags: {},
		name: "Room Master",
		shortDesc: "Any Room active: this Pokemon heals 1/16 max HP at the end of each turn.",
	},
	runaway: {
		onTrapPokemonPriority: -10,
		onTrapPokemon(pokemon) {
			pokemon.trapped = false;
		},
		onMaybeTrapPokemonPriority: -10,
		onMaybeTrapPokemon(pokemon) {
			pokemon.maybeTrapped = false;
		},
		flags: {},
		name: "Run Away",
		shortDesc: "This Pokemon cannot be trapped and takes no damage from Shadow Tag.",
	},
	sandforce: {
		onAnyAfterDamage(damage, target, source, effect) {
			if (effect?.id !== 'sandstorm' || !this.field.sandForceStacks) return;
			this.damage(target.baseMaxhp / 16 * this.field.sandForceStacks, target, target, this.effect);
		},
		flags: {},
		name: "Sand Force",
		shortDesc: "While this Pokemon is active, Pokemon damaged by Sandstorm take an additional 1/16 max HP for each time Sandstorm has been set.",
	},
	sapsipper: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Grass') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Sap Sipper');
				}
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Sap Sipper",
		shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Grass moves; Grass immunity.",
	},
	shadowtag: {
		onFoeSwitchOut(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (target.hasAbility('runaway')) continue;
				this.damage(target.baseMaxhp / 8, target, pokemon);
			}
		},
		name: "Shadow Tag",
		shortDesc: "While this Pokemon is active, switching opponents lose 1/8 max HP.",
	},
	snowcloak: {
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		onSetStatus(status, target, source, effect) {
			if (!this.field.isWeather('hail')) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Snow Cloak');
			}
			return false;
		},
		flags: { breakable: 1 },
		name: "Snow Cloak",
		shortDesc: "This Pokemon is immune to non-volatile statuses while Hail is active; immunity to Hail.",
	},
	snowwarning: {
		onStart(source) {
			this.field.setWeather('hail');
		},
		flags: {},
		name: "Snow Warning",
		shortDesc: "On switchin, this Pokemon summons Hail.",
	},
	swarm: {
		onModifyMove(move, pokemon) {
			if (move.target !== 'self') move.boosts = { spa: -1 };
		},
		flags: {},
		name: "Swarm",
		shortDesc: "This Pokemon's targeted moves lower the target's SpA by 1.",
	},
	terashell: {
		//handled in scripts/pokemon/setStatus
		flags: {},
		name: "Tera Shell",
		shortDesc: "This Pokemon can purify a Pokemon regardless of its typing.",
	},
	teraformzero: {
		onStart(pokemon) {
			if (this.effectState.usedTeraformZero) return;
			const stacks = pokemon.side.terastarstormUses || 0;
			if (!stacks) return;
			const target = pokemon.side.foe.active[0];
			if (!target || !target.hp) return;
			this.effectState.usedTeraformZero = true;
			this.add('-activate', pokemon, 'ability: Teraform Zero');
			this.damage(target.baseMaxhp / 8 * stacks, target, pokemon);
		},
		flags: {},
		name: "Teraform Zero",
		shortDesc: "When activated, the current foe loses 1/8 max HP for each time Tera Starstorm was successfully used. Once per battle.",
	},
	toxicdebris: {
		onFaint(pokemon) {
			this.add('-activate', pokemon, 'ability: Toxic Debris');
			pokemon.side.foe.addSideCondition('toxicspikes', pokemon);
		},
		flags: {},
		name: "Toxic Debris",
		shortDesc: "When this Pokemon faints, it sets Toxic Spikes on the opposing team.",
	},
	transistor: {
		//handled in scripts/pokemon/setStatus
		flags: {},
		name: "Transistor",
		shortDesc: "This Pokemon can paralyze a Pokemon regardless of its typing.",
	},
	windrider: {
		onTryHit(pokemon, target, move) {
			if (move.type === 'Flying') {
				this.add('-immune', pokemon, '[from] ability: Wind Rider');
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Wind Rider",
		shortDesc: "This Pokemon is immune to Flying-type moves.",
	},
	wonderguard: {
		onTryAddVolatile(status, pokemon) {
			return null;
		},
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Wonder Guard');
			}
			return false;
		},
		onSwitchInPriority: 1,
		onStart(pokemon) {
			this.singleEvent('End', pokemon.getItem(), pokemon.itemState, pokemon);
		},
		//klutz effect in scripts/pokemon/ignoringItem
		flags: { breakable: 1 },
		name: "Wonder Guard",
		shortDesc: "This Pokemon is immune to status and volatiles, but its held item has no effect.",
	},
};
