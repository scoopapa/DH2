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
	},
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
	},
	myceliummight: {
		inherit: true,
		onModifyMove(move, pokemon, target) {
			if (move.category === 'Status' && move.target === 'normal') {
				move.ignoreAbility = true;
			}
		},
		onAfterMove(source, target, move) {
			if (move.category === 'Status' && move.target === 'normal') {
				if (!target.hasType('Grass')) {
					target.addVolatile('leechseed');
				}
			}
		},
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
};
