/*

Ratings and how they work:

-1: Detrimental
	  An ability that severely harms the user.
	ex. Defeatist, Slow Start

 0: Useless
	  An ability with no overall benefit in a singles battle.
	ex. Color Change, Plus

 1: Ineffective
	  An ability that has minimal effect or is only useful in niche situations.
	ex. Light Metal, Suction Cups

 2: Useful
	  An ability that can be generally useful.
	ex. Flame Body, Overcoat

 3: Effective
	  An ability with a strong effect on the user or foe.
	ex. Chlorophyll, Sturdy

 4: Very useful
	  One of the more popular abilities. It requires minimal support to be effective.
	ex. Adaptability, Magic Bounce

 5: Essential
	  The sort of ability that defines metagames.
	ex. Imposter, Shadow Tag

*/

export const Abilities: {[abilityid: string]: AbilityData} = {
	arenatrap: {
		onFoeTrapPokemon(pokemon) {
			if (pokemon.hasType('Ground') && this.isAdjacent(pokemon, this.effectData.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectData.target;
			if (!source || !this.isAdjacent(pokemon, source)) return;
			if (!pokemon.knownType || pokemon.hasType('Ground')) {
				pokemon.maybeTrapped = true;
			}
		},
		name: "Arena Trap",
		shortDesc: "Prevents adjacent Ground-type foes from choosing to switch.",
		rating: 5,
		num: 71,
	},
	moody: {
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			let stats: BoostName[] = [];
			const boost: SparseBoostsTable = {};
			let statPlus: BoostName;
			for (statPlus in pokemon.boosts) {
				if (statPlus === 'accuracy' || statPlus === 'evasion') continue;
				if (pokemon.boosts[statPlus] < 6) {
					stats.push(statPlus);
				}
			}
			let randomStat: BoostName | undefined = stats.length ? this.sample(stats) : undefined;
			if (randomStat) boost[randomStat] = 2;

			stats = [];
			let statMinus: BoostName;
			for (statMinus in pokemon.boosts) {
				if (statMinus === 'accuracy' || statMinus === 'evasion') continue;
				if (pokemon.boosts[statMinus] > -6 && statMinus !== randomStat) {
					stats.push(statMinus);
				}
			}
			randomStat = stats.length ? this.sample(stats) : undefined;
			if (randomStat) boost[randomStat] = -1;

			this.boost(boost);
		},
		name: "Moody",
		rating: 5,
		num: 141,
	},
	powerconstruct: {
		onResidualOrder: 27,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Zygarde' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.species.id === 'zygardecomplete' || pokemon.hp > pokemon.maxhp / 2) return;
			this.add('-activate', pokemon, 'ability: Power Construct');
			pokemon.formeChange('Zygarde-Complete', this.effect, true);
			pokemon.baseMaxhp = Math.floor(Math.floor(
				2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
			) * pokemon.level / 100 + 10);
			const newMaxHP = pokemon.volatiles['dynamax'] ? (2 * pokemon.baseMaxhp) : pokemon.baseMaxhp;
			pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
			pokemon.maxhp = newMaxHP;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
		isPermanent: true,
		name: "Power Construct",
		rating: 5,
		num: 211,
	},
	shadowtag: {
		onFoeSwitchOut(source, target) {
			for (const target of source.side.foe.active) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		name: "Shadow Tag",
		shortDesc: "Opposing Pokemon loose 1/8 of their maximum HP, rounded down, when it switches out.",
		rating: 5,
		num: 23,
	},
	grimneigh: {
		onBasePower(basePower, pokemon, target) {
			if (target.status === 'brn') {
				return this.chainModify(1.5);
			}
		},
		name: "Grim Neigh",
		shortDesc: "This Pokemon deals 1.5x damage to burned opponents.",
		rating: 3,
		num: 265,
	},
	gorillatactics: {
		onStart(pokemon) {
			pokemon.abilityData.choiceLock = "";
		},
		onBeforeMove(pokemon, target, move) {
			if (move.isZOrMaxPowered || move.id === 'struggle') return;
			if (pokemon.abilityData.choiceLock && pokemon.abilityData.choiceLock !== move.id) {
				// Fails unless ability is being ignored (these events will not run), no PP lost.
				this.addMove('move', pokemon, move.name);
				this.attrLastMove('[still]');
				this.debug("Disabled by Gorilla Tactics");
				this.add('-fail', pokemon);
				return false;
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.abilityData.choiceLock || move.isZOrMaxPowered || move.id === 'struggle') return;
			pokemon.abilityData.choiceLock = move.id;
		},
		onDisableMove(pokemon) {
			if (!pokemon.abilityData.choiceLock) return;
			if (pokemon.volatiles['dynamax']) return;
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== pokemon.abilityData.choiceLock) {
					pokemon.disableMove(moveSlot.id, false, this.effectData.sourceEffect);
				}
			}
		},
		onEnd(pokemon) {
			pokemon.abilityData.choiceLock = "";
		},
		name: "Gorilla Tactics",
		shortDesc: "This Pokemon's held item has no effect, except Macho Brace, and it can only select the first move it executes. Fling cannot be used.",
		rating: 4.5,
		num: 255,
	},
	soulheart: {
		onCheckShow(pokemon) {
			// This is complicated
			// For the most part, in-game, it's obvious whether or not Soul-Heart activated,
			// since you can see how many of your opponent's pokemon are statused.
			// The only ambiguous situation happens in Doubles/Triples, where multiple pokemon
			// that could have Soul-Heart switch out, but only some of them get cured.
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
					// this.add('-message', "" + curPoke + " skipped: Soul-Heart already known");
					continue;
				}
				const species = curPoke.species;
				// pokemon can't get Soul-Heart
				if (!Object.values(species.abilities).includes('Soul-Heart')) {
					// this.add('-message', "" + curPoke + " skipped: no Soul-Heart");
					continue;
				}
				// pokemon's ability is known to be Soul-Heart
				if (!species.abilities['1'] && !species.abilities['H']) {
					// this.add('-message', "" + curPoke + " skipped: only one ability");
					continue;
				}
				// pokemon isn't switching this turn
				if (curPoke !== pokemon && !this.queue.willSwitch(curPoke)) {
					// this.add('-message', "" + curPoke + " skipped: not switching");
					continue;
				}

				if (curPoke.hasAbility('soulheart')) {
					// this.add('-message', "" + curPoke + " confirmed: could be Soul-Heart (and is)");
					cureList.push(curPoke);
				} else {
					// this.add('-message', "" + curPoke + " confirmed: could be Soul-Heart (but isn't)");
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
				this.add('-message', "(" + cureList.length + " of " + pokemon.side.name + "'s pokemon " + (cureList.length === 1 ? "was" : "were") + " cured by Soul-Heart.)");

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

			if (pokemon.showCure) this.add('-curestatus', pokemon, pokemon.status, '[from] ability: Soul-Heart');
			pokemon.setStatus('');

			// only reset .showCure if it's false
			// (once you know a Pokemon has Soul-Heart, its cures are always known)
			if (!pokemon.showCure) pokemon.showCure = undefined;
		},
		name: "Soul-Heart",
		shortDesc: "This Pokemon has its non-volatile status condition cured when it switches out.",
		rating: 2.5,
		num: 220,
	},
	libero: {
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target === source || move.hasBounced || !move.flags['bullet']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (target.side === source.side || move.hasBounced || !move.flags['bullet']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		condition: {
			duration: 1,
		},
		name: "Libero",
		shortDesc: "This Pokemon blocks ballistic moves and instead uses the move against the original user.",
		rating: 4.5,
		num: 236,
	},
	persistent: {
		isNonstandard: null,
		name: "Persistent",
		// implemented in the corresponding move
		rating: 3,
		num: -4,
	},
	fullmetalbody: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Steel') {
				this.debug('Full Metal Body boost');
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Steel') {
				this.debug('Full Metal Body boost');
				return this.chainModify(2);
			}
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Poison') {
				this.debug('Full Metal Body weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Poison') {
				this.debug('Full Metal Body weaken');
				return this.chainModify(0.5);
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'psn' && status.id !== 'tox') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Full Metal Body');
			}
			return false;
		},
		isUnbreakable: true,
		name: "Full Metal Body",
		shortDesc: "2x with Steel moves. 0.5x damage from Poison moves. Immunity to Poisoning.",
		rating: 4.5,
		num: 230,
	},
	shadowshield: {
		onSourceModifyDamage(damage, source, target, move) {
			if (target.hp >= target.maxhp && move.type === 'Dark' || move.type === 'Ghost') {
				this.debug('Shadow Shield weaken');
				return this.chainModify(0.5);
			}
		},
		isUnbreakable: true,
		name: "Shadow Shield",
		shortDesc: "If this Pokemon is at full HP, damage taken from Dark and Ghost attacks are halved.",
		rating: 3,
		num: 231,
	},
	fairyaura: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Fairy Aura');
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			if (source.activeMoveActions > 1) return;
			if (target === source || move.category === 'Status' || move.type !== 'Fairy') return;
			if (!move.auraBooster) move.auraBooster = this.effectData.target;
			if (move.auraBooster !== this.effectData.target) return;
			return this.chainModify([move.hasAuraBreak ? 0x0C00 : 0x1547, 0x1000]);
		},
		isUnbreakable: true,
		name: "Fairy Aura",
		shortDesc: "On the first turn, a Fairy move used by any Pokemon has 1.33x power.",
		rating: 3,
		num: 187,
	},
	darkaura: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Dark Aura');
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			if (source.activeMoveActions > 1) return;
			if (target === source || move.category === 'Status' || move.type !== 'Dark') return;
			if (!move.auraBooster) move.auraBooster = this.effectData.target;
			if (move.auraBooster !== this.effectData.target) return;
			return this.chainModify([move.hasAuraBreak ? 0x0C00 : 0x1547, 0x1000]);
		},
		isUnbreakable: true,
		name: "Dark Aura",
		shortDesc: "On the first turn, a Dark move used by any Pokemon has 1.33x power.",
		rating: 3,
		num: 186,
	},
	powerconstruct: {
		onSourceAfterFaint(length, target, source, effect) {
			this.add('-activate', source, 'ability: Power Construct');
			if (source.species.id === 'zygardecomplete') return;
			if (source.species.id === 'zygarde10') {
				source.formeChange('Zygarde', this.effect, true);
				source.baseMaxhp = Math.floor(Math.floor(
					2 * source.species.baseStats['hp'] + source.set.ivs['hp'] + Math.floor(source.set.evs['hp'] / 4) + 100
				) * pokemon.level / 100 + 10);
				const newMaxHP = source.volatiles['dynamax'] ? (2 * source.baseMaxhp) : source.baseMaxhp;
				source.hp = newMaxHP - (source.maxhp - source.hp);
				source.maxhp = newMaxHP;
				this.add('-heal', source, source.getHealth, '[silent]');
			}
			else if (source.species.id === 'zygarde') {
				source.formeChange('Zygarde-Complete', this.effect, true);
				source.baseMaxhp = Math.floor(Math.floor(
					2 * source.species.baseStats['hp'] + source.set.ivs['hp'] + Math.floor(source.set.evs['hp'] / 4) + 100
				) * pokemon.level / 100 + 10);
				const newMaxHP = source.volatiles['dynamax'] ? (2 * source.baseMaxhp) : source.baseMaxhp;
				source.hp = newMaxHP - (source.maxhp - source.hp);
				source.maxhp = newMaxHP;
				this.add('-heal', source, source.getHealth, '[silent]');
			}
		},
		isPermanent: true,
		name: "Power Construct",
		shortDesc: "Zygarde transformes into its next stage if it attacks and KOes another Pokemon.",
		rating: 5,
		num: 211,
	},
};
