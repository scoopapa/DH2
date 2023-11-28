export const Abilities: {[k: string]: ModdedAbilityData} = {
	/*
	zenmode: {
		priorityChargeCallback(move, attacker, defender) {
			attacker.addVolatile('zenmode');
		},
		onEnd(pokemon) {
			if (!pokemon.volatiles['zenmode'] || !pokemon.hp) return;
			pokemon.transformed = false;
			delete pokemon.volatiles['zenmode'];
			if (pokemon.species.baseSpecies === 'Darmanitan' && pokemon.species.battleOnly) {
				pokemon.formeChange(pokemon.species.battleOnly as string, this.effect, false, '[silent]');
			}
		},
		condition: {
			onStart(move, pokemon) {
				if (pokemon.baseSpecies.baseSpecies !== 'Darmanitan' || pokemon.transformed || move.category === 'Status') {
					return;
				}
				if (move.category === 'Special' && !['Zen', 'Galar-Zen'].includes(attacker.species.forme)) {
					if (!pokemon.species.name.includes('Galar')) {
						if (pokemon.species.id !== 'darmanitanzen') pokemon.formeChange('Darmanitan-Zen');
					} else {
						if (pokemon.species.id !== 'darmanitangalarzen') pokemon.formeChange('Darmanitan-Galar-Zen');
					}
				}
			},
			onEnd(pokemon) {
				if (['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
					pokemon.formeChange(pokemon.species.battleOnly as string);
				}
			},
		},
		isPermanent: true,
		name: "Zen Mode",
		rating: 0,
		shortDesc: "Changes this Pokemon's form to Zen Mode before using a Special move.",
		num: 161,
	}, */
	zenmode: {
		onBeforeMovePriority: 9,
		onBeforeMove(pokemon, target, move) {
			if (pokemon.baseSpecies.baseSpecies !== 'Darmanitan' || pokemon.transformed) {
				return;
			}
			if (move.category === 'Special' && !['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
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
		isPermanent: true,
		name: "Zen Mode",
		shortDesc: "(Partially functional placeholder) Changes this Pokemon's form to Zen Mode before using a Special move.",
		rating: 3,
		num: 161,
	},
	gorillatactics: {
		onStart(pokemon) {
			pokemon.abilityState.choiceLock = "";
			pokemon.addVolatile('embargo');
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
		shortDesc: "Attack is 1.5x, but can only select the first move it executes & item is disabled.",
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
		isPermanent: true,
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
					return this.chainModify([4915, 4096]);
				} else {
					return this.chainModify([4506, 4096]);
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
		shortDesc: "This Pokemon deals 10% more damage to slower foes, 20% more if the foe is Water or Dragon-type.",
	},
};
