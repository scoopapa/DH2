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
	deltastream: {
		onStart(source) {
			this.field.setWeather('deltastream');
			const item = source.getItem();
			if (source.species.id === 'rayquazamega') {
				source.setItem('');
			}
		},
		inherit: true,
	},
	moody: {
		onStart(pokemon) {
			let statName = 'atk';
			let bestStat = 0;
			let worstStat = 3000; //The highest possible stat number (with boosts) is 2,676
			let bs: StatNameExceptHP;
			let ws: StatNameExceptHP;
			for (bs in pokemon.storedStats) {
				if (pokemon.storedStats[bs] > bestStat) {
					statName = bs;
					bestStat = pokemon.storedStats[bs];
				}
			}
			this.boost({[statName]: -1}, pokemon);
			for (ws in pokemon.storedStats) {
				if (pokemon.storedStats[ws] < worstStat) {
					statName = ws;
					worstStat = pokemon.storedStats[ws];
				}
				
			}
			this.boost({[statName]: 2}, pokemon);
		},
		name: "Moody",
		shortDesc: "Upon entry, +2 in lowest stat and -1 in highest stat.",
		rating: 5,
		num: 141,
	},
	shadowtag: {
		onFoeSwitchOut(pokemon) {
			for (const target of pokemon.side.foe.active) {
				this.damage(pokemon.baseMaxhp / 8, pokemon, target);
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
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			//if (pokemon.volatiles['dynamax']) return;
			// PLACEHOLDER
			this.debug('Gorilla Tactics Atk Boost');
			return this.chainModify(1.5);
		},
		onDisableMove(pokemon) {
			if (!pokemon.abilityData.choiceLock) return;
			//if (pokemon.volatiles['dynamax']) return;
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
		shortDesc: "User's Atk. is 1.5x, but it's locked into first move it uses. Held items have no effect.",
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
			if (source.species.id === 'zygardecomplete') return;
			if (source.species.id === 'zygarde10' && source.hp && !source.transformed && source.side.foe.pokemonLeft) {
				this.add('-activate', source, 'ability: Power Construct');
				source.formeChange('Zygarde', this.effect, true);
				source.baseMaxhp = Math.floor(Math.floor(
					2 * source.species.baseStats['hp'] + source.set.ivs['hp'] + Math.floor(source.set.evs['hp'] / 4) + 100
				) * source.level / 100 + 10);
				const newMaxHP = source.volatiles['dynamax'] ? (2 * source.baseMaxhp) : source.baseMaxhp;
				source.hp = newMaxHP - (source.maxhp - source.hp);
				source.maxhp = newMaxHP;
				this.add('-heal', source, source.getHealth, '[silent]');
			}
			else if (source.species.id === 'zygarde' && source.hp && source.side.foe.pokemonLeft) {
				this.add('-activate', source, 'ability: Power Construct');
				source.formeChange('Zygarde-Complete', this.effect, true);
			}
		},
		isPermanent: true,
		name: "Power Construct",
		shortDesc: "Zygarde transformes into its next stage if it attacks and KOes another Pokemon.",
		rating: 5,
		num: 211,
	},
	asoneglastrier: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: length}, source, source, this.dex.getAbility('chillingneigh'));
			}
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (this.field.isWeather(['sunnyday', 'desolateland']) || this.randomChance(1, 2)) {
				if (pokemon.hp && !pokemon.item && this.dex.getItem(pokemon.lastItem).isBerry) {
					pokemon.setItem(pokemon.lastItem);
					pokemon.lastItem = '';
					this.add('-item', pokemon, pokemon.getItem(), '[from] ability: As One');
				}
			}
		},
		isPermanent: true,
		name: "As One (Glastrier)",
		shortDesc: "The combination of Harvest and Chilling Neigh.",
		rating: 3.5,
		num: 266,
	},
	asonespectrier: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({spa: length}, source, source, this.dex.getAbility('grimneigh'));
			}
		},
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (this.field.isWeather(['sunnyday', 'desolateland']) || this.randomChance(1, 2)) {
				if (pokemon.hp && !pokemon.item && this.dex.getItem(pokemon.lastItem).isBerry) {
					pokemon.setItem(pokemon.lastItem);
					pokemon.lastItem = '';
					this.add('-item', pokemon, pokemon.getItem(), '[from] ability: As One');
				}
			}
		},
		isPermanent: true,
		name: "As One (Spectrier)",
		shortDesc: "The combination of Harvest and Grim Neigh.",
		rating: 3.5,
		num: 267,
	},
	intrepidsword: {
		onModifyMove(pokemon, move) {
			if (['solarblade', 'leafblade', 'precipiceblades', 'behemothblades', 'sacredsword', 'secretsword', 'cut', 'psychocut', 
			'aircutter', 'furycutter', 'slash', 'airslash', 'nightslash'].includes(move.id) && pokemon.species.id === 'zacian') {
				move.basePower *= 0.8;
			}
			else if (['solarblade', 'leafblade', 'precipiceblades', 'behemothblades', 'sacredsword', 'secretsword', 'cut', 'psychocut', 
			'aircutter', 'furycutter', 'slash', 'airslash', 'nightslash'].includes(move.id) && pokemon.species.id === 'zaciancrowned') {
				move.basePower *= 1.2;
			}
		},
		onModifyPriority(priority, source, target, move) {
			if (['solarblade', 'leafblade', 'precipiceblades', 'behemothblades', 'sacredsword', 'secretsword', 'cut', 'psychocut', 
			'aircutter', 'furycutter', 'slash', 'airslash', 'nightslash'].includes(move.id) && source.species.id === 'zacian') {
				return priority + 1;
			}
			else if (['solarblade', 'leafblade', 'precipiceblades', 'behemothblades', 'sacredsword', 'secretsword', 'cut', 'psychocut', 
			'aircutter', 'furycutter', 'slash', 'airslash', 'nightslash'].includes(move.id) && source.species.id === 'zaciancrowned') {
				return priority - 1;
			}
		},
		name: "Intrepid Sword",
		shortDesc: "If Hero: Blade/Slash/Cut moves have +1 priority & 20% less power. Reverse for Crowned.",
		rating: 3.5,
		num: 234,
	},
	dauntlessshield: {
		onAnyModifyBoost(boosts, pokemon) {
			const dauntlessshieldUser = this.effectData.target;
			if (pokemon === this.activePokemon && dauntlessshieldUser === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['def'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		name: "Dauntless Shield",
		shortDesc: "This Pokemon ignores other Pokemon's stat stages when taking damage.",
		rating: 3.5,
		num: 235,
	},
	baddreams: {
		onStart(source) {
			let activated = false;
			for (const pokemon of source.side.foe.active) {
				if (!activated) {
					this.add('-ability', source, 'Bad Dreams');
				}
				activated = true;
				if (!pokemon.volatiles['baddreams']) {
					pokemon.addVolatile('baddreams');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			const source = this.effectData.target;
			if (pokemon === source) return;
			for (const target of source.side.foe.active) {
				if (!target.volatiles['baddreams']) {
					target.addVolatile('baddreams');
				}
			}
		},
		onEnd(pokemon) {
			const source = this.effectData.target;
			for (const target of source.side.foe.active) {
				target.removeVolatile('baddreams');
			}
		},
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status && source.volatiles['baddreams']) {
				this.add('-immune', source, '[from] ability: Bad Dreams');
			}
			return false;
		},
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Bad Dreams');
			},
			onResidualOrder: 18,
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Bad Dreams');
			},
		},
		// Permanent sleep "status" implemented in the relevant sleep-checking effects
		isPermanent: true,
		isUnbreakable: true,
		name: "Bad Dreams",
		shortDesc: "The foes cannot be statused, and are considered to be asleep.",
		rating: 4,
		num: 123,
	},
	snowcloak: {
		onModifyDef(def, pokemon) {
			if (this.field.isWeather('hail')) {
				return this.chainModify(1.5);
			}
		},
		name: "Snow Cloak",
		shortDesc: "If Hail is active, this Pokemon's Defense is multiplied by 1.5x.",
		rating: 0.5,
		num: 81,
	},
	sandveil: {
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.status && this.field.isWeather('sandstorm')) {
				this.debug('sandveil');
				this.add('-activate', pokemon, 'ability: Sand Veil');
				pokemon.cureStatus();
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		name: "Sand Veil",
		shortDesc: "This Pokemon has its status cured at the end of each turn if Sandstorm is active.",
		rating: 0.5,
		num: 8,
	},
	quickdraw: {
		onModifyPriority(priority, source, move) {
			if (move.flags['bullet']) {
				if (source.activeMoveActions < 1) {
					return priority + 2;
				} else if (source.activeMoveActions > 1) {
					return priority + 0;
				}
			}
		},
		name: "Quick Draw",
		shortDesc: "User's bullet/bomb moves have +2 priority on the first turn.",
		rating: 2.5,
		num: 259,
	},
	
	//Dynamax abilities
	liquidvoice: {
		inherit: true,
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.flags['sound']) { // hardcode
				move.type = 'Water';
			}
		},
	},
	wanderingspirit: {
		onDamagingHit(damage, target, source, move) {
			const additionalBannedAbilities = ['hungerswitch', 'illusion', 'neutralizinggas', 'wonderguard'];
			if (source.getAbility().isPermanent || additionalBannedAbilities.includes(source.ability)
			) {
				return;
			}

			if (move.flags['contact']) {
				const sourceAbility = source.setAbility('wanderingspirit', target);
				if (!sourceAbility) return;
				if (target.side === source.side) {
					this.add('-activate', target, 'Skill Swap', '', '', '[of] ' + source);
				} else {
					this.add('-activate', target, 'ability: Wandering Spirit', this.dex.getAbility(sourceAbility).name, 'Wandering Spirit', '[of] ' + source);
				}
				target.setAbility(sourceAbility);
			}
		},
		name: "Wandering Spirit",
		rating: 2.5,
		num: 254,
	},
};
