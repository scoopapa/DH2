export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	zenmode: {
		onFractionalPriorityPriority: -1,
		onFractionalPriority(priority, pokemon, target, move) {
			if (pokemon.baseSpecies.baseSpecies !== 'Darmanitan' || pokemon.transformed) {
				return;
			}
			if (move.category === 'Special' && !['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
				this.add('-activate', pokemon, 'ability: Zen Mode');
				pokemon.addVolatile('zenmode');
			}
		},
		condition: {
			onStart(pokemon) {
				if (!pokemon.species.name.includes('Galar')) {
					if (pokemon.species.id !== 'darmanitanzen') pokemon.formeChange('Darmanitan-Zen');
				} else {
					if (pokemon.species.id !== 'darmanitangalarzen') pokemon.formeChange('Darmanitan-Galar-Zen');
				}
			},
			onEnd(pokemon) {
				if (['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
					pokemon.formeChange(pokemon.species.battleOnly as string);
				}
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Zen Mode",
		shortDesc: "This Pokemon transforms at the start of the turn if it selects a special move.",
		rating: 3,
		num: 161,
	},
	gorillatactics: {
		onStart(pokemon) {
			pokemon.abilityState.choiceLock = "";
			if (pokemon.hasItem('choiceband') || pokemon.hasItem('choicescarf') || pokemon.hasItem('choicespecs')) {
				pokemon.addVolatile('embargo');
			}
		},
		onBeforeMove(pokemon, target, move) {
			if (move.isZOrMaxPowered || move.id === 'struggle') return;
			if (pokemon.abilityState.choiceLock && pokemon.abilityState.choiceLock !== move.id) {
				// Fails unless ability is being ignored (these events will not run), no PP lost.
				this.addMove('move', pokemon, move.name);
				this.attrLastMove('[still]');
				this.debug("Disabled by Gorilla Tactics");
				this.add('-fail', pokemon);
				return false;
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.abilityState.choiceLock || move.isZOrMaxPowered || move.id === 'struggle') return;
			pokemon.abilityState.choiceLock = move.id;
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			// PLACEHOLDER
			this.debug('Gorilla Tactics Atk Boost');
			return this.chainModify(1.5);
		},
		onDisableMove(pokemon) {
			if (!pokemon.abilityState.choiceLock) return;
			if (pokemon.volatiles['dynamax']) return;
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== pokemon.abilityState.choiceLock) {
					pokemon.disableMove(moveSlot.id, false, this.effectState.sourceEffect);
				}
			}
		},
		onEnd(pokemon) {
			pokemon.abilityState.choiceLock = "";
		},
		name: "Gorilla Tactics",
		rating: 4,
		num: 255,
		shortDesc: "Pokemon's Atk is 1.5x, but it can only select one move. Choice items are disabled.",
	},
	beadsofruin: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Beads of Ruin');
		},
		onAnyModifyAccuracyPriority: -1,
		onAnyModifyAccuracy(accuracy, target, source) {
			if (source.isAlly(this.effectState.target) && typeof accuracy === 'number' && !target.hasAbility('Beads of Ruin')) {
				return this.chainModify([5120, 4096]);
			}
		},
		name: "Beads of Ruin",
		rating: 4.5,
		num: 284,
		shortDesc: "Active Pokemon without this Ability have their Evasiveness multiplied by 0.75.",
	},
	powerspot: {
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			this.debug('Power Spot boost');
			return this.chainModify([5325, 4096]);
		},
		onSwitchOut(pokemon) {
			pokemon.side.addSlotCondition(pokemon, 'powerspot');
		},
		condition: {
			duration: 2,
			onSwitchIn(pokemon) {
				this.add('-message', `${pokemon.name} is being powered up by the Power Spot!`);
			},
			onModifyDamage(damage, source, target, move) {
				return this.chainModify([5324, 4096]);
			},
		},
		name: "Power Spot",
		rating: 4,
		num: 249,
		shortDesc: "Active allies deal 1.3x more damage, as well as the next Pokemon in for one turn.",
	},
	iceface: {
		onModifyMovePriority: 1,
		onModifyMove(move, attacker, defender) {
			if (attacker.species.baseSpecies !== 'Eiscue' || attacker.transformed) return;
			const targetForme = (move.category === 'Status' ? 'Eiscue' : 'Eiscue-Noice');
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Ice Face",
		rating: 3,
		num: 248,
		shortDesc: "If Eiscue, changes Forme to Noice before attacks and Base before a status move.",
	},
	commander: {
		onModifyDamage(damage, source, target, move) {
			let ratio = Math.floor(source.getStat('spe') / target.getStat('spe'));
			if (!isFinite(ratio)) ratio = 0;
			if (ratio > 0) {
				if (target.hasType('Water') || target.hasType('Dragon')) {
					return this.chainModify([5324, 4096]);
				} else {
					return this.chainModify([4915, 4096]);
				}
			}
		},
		onUpdate(pokemon) {
			if (this.gameType !== 'doubles') return;
			const ally = pokemon.allies()[0];
			if (!ally || pokemon.transformed ||
				pokemon.baseSpecies.baseSpecies !== 'Tatsugiri' || ally.baseSpecies.baseSpecies !== 'Dondozo') {
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
				this.add('-activate', pokemon, 'ability: Commander', '[of] ' + ally);
				pokemon.addVolatile('commanding');
				ally.addVolatile('commanded', pokemon);
				// Continued in conditions.ts in the volatiles
			} else {
				if (!ally.fainted) return;
				pokemon.removeVolatile('commanding');
			}
		},
		name: "Commander",
		rating: 3,
		num: 279,
		shortDesc: "Slower Pokemon take 20% more damage. 30% if also Water or Dragon.",
	},
	steamengine: {
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Steam Engine');
				pokemon.cureStatus();
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Steam Engine boost');
				return this.chainModify(2);
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Steam Engine');
			}
			return false;
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water' || move.type === 'Fire') {
				this.debug('Steam Engine weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water' || move.type === 'Fire') {
				this.debug('Steam Engine weaken');
				return this.chainModify(0.5);
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water' || move.type === 'Fire') {
				this.field.setWeather('sunnyday');
			}
		},
		flags: {breakable: 1},
		name: "Steam Engine",
		rating: 2,
		num: 243,
		shortDesc: "Burn immunity. Takes 0.5x from Fire/Water & summons Sun. 2x power on Fire.",
	},/*
	galewings: {
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, target, move) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (!this.queue.willMove(target) || move.type !== 'Flying') {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				this.debug('Gale Wings boost');
				return this.chainModify([5325, 4096]);
			}
		},
		flags: {},
		name: "Gale Wings",
		rating: 3,
		num: 177,
		shortDesc: "This Pokemon's Flying-type moves have 1.3x power if the user moves first.",
	},*/
	galewings: {
		onModifyPriority(priority, pokemon, target, move) {
			for (const poke of this.getAllActive()) {
				if (poke.hasAbility('counteract') && poke.side.id !== pokemon.side.id && !poke.abilityState.ending) {
					return;
				}
			}
			if (move?.type === 'Flying' && pokemon.hp >= pokemon.maxhp / 2) return priority + 1;
		},
		flags: {},
		name: "Gale Wings",
		shortDesc: "If this Pokemon has 50% of its max HP or more, its Flying-type moves have their priority increased by 1.",
		rating: 3,
		num: 177,
	},
	myceliummight: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (move.category === 'Status' && move.target === 'normal') {
				move.ignoreAbility = true;
			}
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target || source.switchFlag === true) return;
			if (move.category === 'Status' && move.target === 'normal') {
				if (!target.hasType('Grass') && !target.volatiles['leechseed']) {
					source.addVolatile('myceliummight');
					this.actions.useMove("Leech Seed", source);
				}
			}
		},
		condition: {},
		shortDesc: "Single-target status moves move last, but ignore abilities and inflict Leech Seed.",
		rating: 3,
	},
	icescales: {
		inherit: true,
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move' && target.hp >= target.maxhp) {
				if (effect.effectType === 'Ability') this.add('-activate', target, 'ability: ' + effect.name);
				return false;
			}
		},
		shortDesc: "Takes 1/2 damage from special attacks. Full HP: No damage from indirect sources.",
	},
	battlebondcharizard: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect?.effectType !== 'Move') return;
			if (source.abilityState.battleBondcharizardTriggered) return;
			if (source.hp && source.side.foePokemonLeft()) {
				this.boost({atk: 1, spa: 1, spe: 1}, source, source, this.effect);
				this.add('-activate', source, 'ability: Battle Bond (Charizard)');
				source.abilityState.battleBondcharizardTriggered = true;
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Battle Bond (Charizard)",
		desc: "If this Pokemon is a Charizard-Gmax, its Attack, Special Attack, and Speed are raised by 1 stage if it attacks and knocks out another Pokemon. This effect can only happen once per battle.",
		shortDesc: "After KOing a Pokemon: raises Attack, Sp. Atk, Speed by 1 stage. Once per battle.",
		rating: 3.5,
		num: 210,
	},
	stalwart: {
		inherit: true,
		onModifyMove() {},
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		onTryHit(pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[from] ability: Stalwart');
				return null;
			}
		},
		onDamagePriority: -30,
		onDamage(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Stalwart');
				return target.hp - 1;
			}
		},
		shortDesc: "This Pokemon heals 1/3 of its max when switching out. At full HP: Survives hit at 1 HP.",
	},
	selfrepair: {
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.category === 'Status') {
				this.heal(pokemon.baseMaxhp / 4);
			}
		},
		flags: {},
		name: "Self-Repair",
		rating: 3,
		shortDesc: "When this Pokemon uses a status move, this Pokemon heals 25% of its max HP.",
	},
	curiousmedicine: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.actions.useMove("Haze", pokemon);
			}
		},
		flags: {},
		name: "Curious Medicine",
		rating: 2,
		num: 261,
		shortDesc: "At the end of each turn, all stat changes are reset.",
	},
	hospitality: {
		inherit: true,
		onResidualOrder: 6,
		onResidual(pokemon) {
			this.heal(pokemon.baseMaxhp / 16);
		},
		onSwitchOut(pokemon) {
			pokemon.side.addSlotCondition(pokemon, 'hospitality');
		},
		condition: {
			onSwap(target) {
				if (!target.fainted) {
					this.heal(target.baseMaxhp / 4);
					target.side.removeSlotCondition(target, 'hospitality');
				}
			},
		},
		shortDesc: "User heals 1/16 of its HP per turn. Switch-in heals 1/4 once.",
	},
	quickdraw: {
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
			const damage = move.multihit && !move.smartTarget ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				target.addVolatile('quickdraw');
			}
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-ability', pokemon, 'Quick Draw');
				this.add('-message', `${pokemon.name}'s next move will have +1 priority!`);
			},
			onModifyPriority(priority, pokemon, target, move) {
				return priority + 1;
			},
		},
		flags: {},
		name: "Quick Draw",
		rating: 2.5,
		num: 259,
		shortDesc: "This Pokemon's next move has +1 Priority when it reaches 1/2 or less of its max HP",
	},
	supersweetsyrup: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!target.positiveBoosts()) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Supersweet Syrup', 'boost');
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
		name: "Supersweet Syrup",
		rating: 2.5,
		num: 306,
		shortDesc: "On switch-in, the foe's Speed is lowered by 2 stages if it has a positive stat boost.",
	},
	unseenfist: {
		onModifyMove(move) {
			if (this.effectState.unseenFist) return;
			if (move.flags['contact']) delete move.flags['protect'];
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || !target || source.switchFlag === true) return;
			if (target !== source && move.flags['contact'] && 
				 (target.volatiles['protect'] || target.volatiles['banefulbunker'] || target.volatiles['kingsshield'] ||
				  target.volatiles['spikyshield'] || target.side.getSideCondition('matblock') || target.volatiles['silktrap'] ||
				  target.volatiles['burningbulwark'])) {
				this.effectState.unseenFist = true;
				this.add('-activate', source, 'ability: Unseen Fist');
				this.add('-message', `${source.name}'s ${move.name} broke through ${target.name}'s protection!`);
			}
		},
		onSwitchIn(pokemon) {
			delete this.effectState.unseenFist;
		},
		flags: {},
		name: "Unseen Fist",
		rating: 2,
		num: 260,
		shortDesc: "Once per switch-in, this Pokemon's contact moves ignore protection, except Max Guard.",
	},
	chillingneigh: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			this.heal(target.baseMaxhp / 8, target, target);
		},
		flags: {},
		name: "Chilling Neigh",
		rating: 2,
		num: 264,
		shortDesc: "After being hit by an attack, this Pokemons heals 12.5% of its max HP.",
	},
	grimneigh: {
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.category !== 'Status') {
				this.heal(pokemon.baseMaxhp / 8);
			}
		},
		flags: {},
		name: "Grim Neigh",
		rating: 2,
		num: 265,
		shortDesc: "After hitting an attack, this Pokemons heals 12.5% of its max HP.",
	},
	/*asoneglastrier: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add('-ability', pokemon, 'Unnerve');
			this.effectState.unnerved = true;
		},
		onStart(pokemon) {
			if (this.effectState.unnerved) return;
			this.add('-ability', pokemon, 'As One');
			this.add('-ability', pokemon, 'Unnerve');
			this.effectState.unnerved = true;
		},
		onEnd() {
			this.effectState.unnerved = false;
		},
		onFoeTryEatItem() {
			return !this.effectState.unnerved;
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			this.heal(target.baseMaxhp / 8, target, target);
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "As One (Glastrier)",
		rating: 3.5,
		num: 266,
	},
	asonespectrier: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add('-ability', pokemon, 'Unnerve');
			this.effectState.unnerved = true;
		},
		onStart(pokemon) {
			if (this.effectState.unnerved) return;
			this.add('-ability', pokemon, 'As One');
			this.add('-ability', pokemon, 'Unnerve');
			this.effectState.unnerved = true;
		},
		onEnd() {
			this.effectState.unnerved = false;
		},
		onFoeTryEatItem() {
			return !this.effectState.unnerved;
		},
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.category !== 'Status') {
				this.heal(pokemon.baseMaxhp / 8);
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "As One (Spectrier)",
		rating: 3.5,
		num: 267,
	},*/
	poisonpuppeteer: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (attacker.status === 'psn' || attacker.status === 'tox') {
				this.debug('Poison Puppeteer weaken');
				return this.chainModify(0.75);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (attacker.status === 'psn' || attacker.status === 'tox') {
				this.debug('Poison Puppeteer weaken');
				return this.chainModify(0.75);
			}
		},
		flags: {breakable: 1},
		name: "Poison Puppeteer",
		rating: 3,
		num: 310,
		shortDesc: "This Pokemon takes 0.75x damage from poisoned foes.",
	},
	stellarshift: {
		onPreStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Terapagos') return;
			if (pokemon.species.forme !== 'Terastal') {
				this.add('-activate', pokemon, 'ability: Stellar Shift');
				pokemon.formeChange('Terapagos-Terastal', this.effect, true);
				pokemon.baseMaxhp = Math.floor(Math.floor(
					2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
				) * pokemon.level / 100 + 10);
				const newMaxHP = pokemon.baseMaxhp;
				pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
				pokemon.maxhp = newMaxHP;
				this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
				pokemon.setAbility('stellarshell', pokemon, true);
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1, notransform: 1},
		name: "Stellar Shift",
		rating: 3,
		shortDesc: "If this Pokemon is a Terapagos, it transforms into its Terastal Form on entry.",
	},
	stellarshell: {
		onStart(pokemon) {
			if (pokemon.terastallized) return;
			pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target || target.species.name !== 'Terapagos-Terastal') return;
			if (this.effectState.resisted) return -1; // all hits of multi-hit move should be not very effective
			if (move.category === 'Status' || move.id === 'struggle') return;
			if (!target.runImmunity(move.type)) return; // immunity has priority
			if (target.hp < target.maxhp) return;
			this.add('-activate', target, 'ability: Stellar Shell');
			this.effectState.resisted = true;
			return -1;
		},
		onAnyAfterMove() {
			this.effectState.resisted = false;
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, breakable: 1},
		name: "Stellar Shell",
		rating: 3.5,
		shortDesc: "Terapagos: Effects of Tera Shell. Terastallize to become Terapagos-Stellar.",
	},
	teraformzero: {
		onAfterTerastallization(pokemon) {
			if (pokemon.baseSpecies.name !== 'Terapagos-Stellar') return;
			if (this.field.weather || this.field.terrain) {
				this.add('-ability', pokemon, 'Teraform Zero');
				this.field.clearWeather();
				this.field.clearTerrain();
			}
		},
		onModifySTAB(stab, source, target, move) {
			if (move.id === 'teraformzero') {
				if (source.terastallized) {
					return 2;
				}
				return 1.5;
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		name: "Teraform Zero",
		rating: 3,
		num: 309,
	},
	stamina: {
		onDamagingHit(damage, target, source, effect) {
			if (target === source) return;
			this.boost({def: 1});
		},
		flags: {},
		name: "Stamina",
		rating: 4,
		num: 192,
	},
	electromorphosis: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (target === source) return;
			target.addVolatile('charge');
		},
		flags: {},
		name: "Electromorphosis",
		rating: 3,
		num: 280,
	},
	flamebody: {
		onDamagingHit(damage, target, source, move) {
			if (target === source) return;
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('brn', target);
				}
			}
		},
		flags: {},
		name: "Flame Body",
		rating: 2,
		num: 49,
	},
	gooey: {
		onDamagingHit(damage, target, source, move) {
			if (target === source) return;
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.add('-ability', target, 'Gooey');
				this.boost({spe: -1}, source, target, null, true);
			}
		},
		flags: {},
		name: "Gooey",
		rating: 2,
		num: 183,
	},
	gulpmissile: {
		onDamagingHit(damage, target, source, move) {
			if (!source.hp || !source.isActive || target.isSemiInvulnerable() || target === source) return;
			if (['cramorantgulping', 'cramorantgorging'].includes(target.species.id)) {
				this.damage(source.baseMaxhp / 4, source, target);
				if (target.species.id === 'cramorantgulping') {
					this.boost({def: -1}, source, target, null, true);
				} else {
					source.trySetStatus('par', target, move);
				}
				target.formeChange('cramorant', move);
			}
		},
		// The Dive part of this mechanic is implemented in Dive's `onTryMove` in moves.ts
		onSourceTryPrimaryHit(target, source, effect) {
			if (effect?.id === 'surf' && source.hasAbility('gulpmissile') && source.species.name === 'Cramorant') {
				const forme = source.hp <= source.maxhp / 2 ? 'cramorantgorging' : 'cramorantgulping';
				source.formeChange(forme, effect);
			}
		},
		flags: {cantsuppress: 1, notransform: 1},
		name: "Gulp Missile",
		rating: 2.5,
		num: 241,
	},
	innardsout: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (target === source) return;
			if (!target.hp) {
				this.damage(target.getUndynamaxedHP(damage), source, target);
			}
		},
		flags: {},
		name: "Innards Out",
		rating: 4,
		num: 215,
	},
	ironbarbs: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (target === source) return;
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		flags: {},
		name: "Iron Barbs",
		rating: 2.5,
		num: 160,
	},
	perishbody: {
		onDamagingHit(damage, target, source, move) {
			if (!this.checkMoveMakesContact(move, source, target)) return;
			if (target === source) return;
			let announced = false;
			for (const pokemon of [target, source]) {
				if (pokemon.volatiles['perishsong']) continue;
				if (!announced) {
					this.add('-ability', target, 'Perish Body');
					announced = true;
				}
				pokemon.addVolatile('perishsong');
			}
		},
		flags: {},
		name: "Perish Body",
		rating: 1,
		num: 253,
	},
	poisonpoint: {
		onDamagingHit(damage, target, source, move) {
			if (target === source) return;
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('psn', target);
				}
			}
		},
		flags: {},
		name: "Poison Point",
		rating: 1.5,
		num: 38,
	},
	roughskin: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (target === source) return;
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		flags: {},
		name: "Rough Skin",
		rating: 2.5,
		num: 24,
	},
	sandspit: {
		onDamagingHit(damage, target, source, move) {
			if (target === source) return;
			this.field.setWeather('sandstorm');
		},
		flags: {},
		name: "Sand Spit",
		rating: 1,
		num: 245,
	},
	seedsower: {
		onDamagingHit(damage, target, source, move) {
			if (target === source) return;
			this.field.setTerrain('grassyterrain');
		},
		flags: {},
		name: "Seed Sower",
		rating: 2.5,
		num: 269,
	},
	static: {
		onDamagingHit(damage, target, source, move) {
			if (target === source) return;
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('par', target);
				}
			}
		},
		flags: {},
		name: "Static",
		rating: 2,
		num: 9,
	},
	tanglinghair: {
		onDamagingHit(damage, target, source, move) {
			if (target === source) return;
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.add('-ability', target, 'Tangling Hair');
				this.boost({spe: -1}, source, target, null, true);
			}
		},
		flags: {},
		name: "Tangling Hair",
		rating: 2,
		num: 221,
	},
	toxicdebris: {
		onDamagingHit(damage, target, source, move) {
			if (target === source) return;
			const side = source.isAlly(target) ? source.side.foe : source.side;
			const toxicSpikes = side.sideConditions['toxicspikes'];
			if (move.category === 'Physical' && (!toxicSpikes || toxicSpikes.layers < 2)) {
				this.add('-activate', target, 'ability: Toxic Debris');
				side.addSideCondition('toxicspikes', target);
			}
		},
		flags: {},
		name: "Toxic Debris",
		rating: 3.5,
		num: 295,
	},
	weakarmor: {
		onDamagingHit(damage, target, source, move) {
			if (target === source) return;
			if (move.category === 'Physical') {
				this.boost({def: -1, spe: 2}, target, target);
			}
		},
		flags: {},
		name: "Weak Armor",
		rating: 1,
		num: 133,
	},
	cursedbody: {
		onDamagingHit(damage, target, source, move) {
			if (source.volatiles['disable']) return;
			if (target === source) return;
			if (!move.isMax && !move.flags['futuremove'] && move.id !== 'struggle') {
				if (this.randomChance(3, 10)) {
					source.addVolatile('disable', this.effectState.target);
				}
			}
		},
		flags: {},
		name: "Cursed Body",
		rating: 2,
		num: 130,
	},
	effectspore: {
		onDamagingHit(damage, target, source, move) {
			if (target === source) return;
			if (this.checkMoveMakesContact(move, source, target) && !source.status && source.runStatusImmunity('powder')) {
				const r = this.random(100);
				if (r < 11) {
					source.setStatus('slp', target);
				} else if (r < 21) {
					source.setStatus('par', target);
				} else if (r < 30) {
					source.setStatus('psn', target);
				}
			}
		},
		flags: {},
		name: "Effect Spore",
		rating: 2,
		num: 27,
	},
	intimidate: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (this.effectState.intim && this.gameType !== 'doubles') return;
				if (!activated) {
					this.add('-ability', pokemon, 'Intimidate', 'boost');
					activated = true;
					this.effectState.intim = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
		onSwitchIn(pokemon) {
			delete this.effectState.intim;
		},
		flags: {},
		name: "Intimidate",
		rating: 3.5,
		num: 22,
	},
	embodyaspecthearthflame: {
		onStart(pokemon) {
			if (pokemon.baseSpecies.name === 'Ogerpon-Hearthflame-Tera' && !this.effectState.embodied) {
				this.effectState.embodied = true;
				this.boost({spa: 1}, pokemon);
			}
		},
		onSwitchIn() {
			delete this.effectState.embodied;
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Embody Aspect (Hearthflame)",
		rating: 3.5,
		num: 303,
		shortDesc: "On switch-in, this Pokemon's Sp. Attack is raised by 1 stage.",
	},
};
