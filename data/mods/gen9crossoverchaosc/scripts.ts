export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['CC OU'],
	},
	actions: {
		modifyDamage(
		baseDamage: number, pokemon: Pokemon, target: Pokemon, move: ActiveMove, suppressMessages = false
		) {
			const tr = this.battle.trunc;
			if (!move.type) move.type = '???';
			const type = move.type;

			baseDamage += 2;

			if (move.spreadHit) {
				// multi-target modifier (doubles only)
				const spreadModifier = move.spreadModifier || (this.battle.gameType === 'freeforall' ? 0.5 : 0.75);
				this.battle.debug('Spread modifier: ' + spreadModifier);
				baseDamage = this.battle.modify(baseDamage, spreadModifier);
			} else if (move.multihitType === 'parentalbond' && move.hit > 1) {
				// Parental Bond modifier
				const bondModifier = this.battle.gen > 6 ? 0.25 : 0.5;
				this.battle.debug(`Parental Bond modifier: ${bondModifier}`);
				baseDamage = this.battle.modify(baseDamage, bondModifier);
			} else if (move.multihitType === 'younglion' && move.hit > 1) {
				// Parental Bond modifier
				const bondModifier = 0.3;
				this.battle.debug(`Young Lion modifier: ${bondModifier}`);
				baseDamage = this.battle.modify(baseDamage, bondModifier);
			}

			// weather modifier
			baseDamage = this.battle.runEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);

			// crit - not a modifier
			const isCrit = target.getMoveHitData(move).crit;
			if (isCrit) {
				baseDamage = tr(baseDamage * (move.critModifier || (this.battle.gen >= 6 ? 1.5 : 2)));
			}

			// random factor - also not a modifier
			baseDamage = this.battle.randomizer(baseDamage);

			// STAB
			// The "???" type never gets STAB
			// Not even if you Roost in Gen 4 and somehow manage to use
			// Struggle in the same turn.
			// (On second thought, it might be easier to get a MissingNo.)
			if (type !== '???') {
				let stab: number | [number, number] = 1;

				const isSTAB = move.forceSTAB || pokemon.hasType(type) || pokemon.getTypes(false, true).includes(type);
				if (isSTAB) {
					stab = 1.5;
				}

				// The Stellar tera type makes this incredibly confusing
				// If the move's type does not match one of the user's base types,
				// the Stellar tera type applies a one-time 1.2x damage boost for that type.
				//
				// If the move's type does match one of the user's base types,
				// then the Stellar tera type applies a one-time 2x STAB boost for that type,
				// and then goes back to using the regular 1.5x STAB boost for those types.
				if (pokemon.terastallized === 'Stellar') {
					if (!pokemon.stellarBoostedTypes.includes(type) || move.stellarBoosted) {
						stab = isSTAB ? 2 : [4915, 4096];
						move.stellarBoosted = true;
						if (pokemon.species.name !== 'Terapagos-Stellar') {
							pokemon.stellarBoostedTypes.push(type);
						}
					}
				} else {
					if (pokemon.terastallized === type && pokemon.getTypes(false, true).includes(type)) {
						stab = 2;
					}
					stab = this.battle.runEvent('ModifySTAB', pokemon, target, move, stab);
				}

				baseDamage = this.battle.modify(baseDamage, stab);
			}

			// types
			let typeMod = target.runEffectiveness(move);
			typeMod = this.battle.clampIntRange(typeMod, -6, 6);
			target.getMoveHitData(move).typeMod = typeMod;
			if (typeMod > 0) {
				if (!suppressMessages) this.battle.add('-supereffective', target);

				for (let i = 0; i < typeMod; i++) {
					baseDamage *= 2;
				}
			}
			if (typeMod < 0) {
				if (!suppressMessages) this.battle.add('-resisted', target);

				for (let i = 0; i > typeMod; i--) {
					baseDamage = tr(baseDamage / 2);
				}
			}

			if (isCrit && !suppressMessages) this.battle.add('-crit', target);

			if (pokemon.status === 'brn' && move.category === 'Physical' && !pokemon.hasAbility('guts')) {
				if (this.battle.gen < 6 || move.id !== 'facade') {
					baseDamage = this.battle.modify(baseDamage, 0.5);
				}
			}

			// Generation 5, but nothing later, sets damage to 1 before the final damage modifiers
			if (this.battle.gen === 5 && !baseDamage) baseDamage = 1;

			// Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
			baseDamage = this.battle.runEvent('ModifyDamage', pokemon, target, move, baseDamage);

			if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
				baseDamage = this.battle.modify(baseDamage, 0.25);
				this.battle.add('-zbroken', target);
			}

			// Generation 6-7 moves the check for minimum 1 damage after the final modifier...
			if (this.battle.gen !== 5 && !baseDamage) return 1;

			// ...but 16-bit truncation happens even later, and can truncate to 0
			return tr(baseDamage, 16);
		}
	},
	side: {
		chooseSwitch(slotText?: string) {
				if (this.requestState !== 'move' && this.requestState !== 'switch') {
					return this.emitChoiceError(`Can't switch: You need a ${this.requestState} response`);
				}
				const index = this.getChoiceIndex();
				if (index >= this.active.length) {
					if (this.requestState === 'switch') {
						return this.emitChoiceError(`Can't switch: You sent more switches than Pokémon that need to switch`);
					}
					return this.emitChoiceError(`Can't switch: You sent more choices than unfainted Pokémon`);
				}
				const pokemon = this.active[index];
				let slot;
				if (!slotText) {
					if (this.requestState !== 'switch') {
						return this.emitChoiceError(`Can't switch: You need to select a Pokémon to switch in`);
					}
					if (this.slotConditions[pokemon.position]['revivalblessing'] && this.slotConditions[pokemon.position]['medigun']) {
						slot = 0;
						while (this.pokemon[slot].fainted || this.pokemon[slot] === pokemon) slot++;
					}
					else if (this.slotConditions[pokemon.position]['revivalblessing']) {
						slot = 0;
						while (!this.pokemon[slot].fainted) slot++;
					} else {
						if (!this.choice.forcedSwitchesLeft) return this.choosePass();
						slot = this.active.length;
						while (this.choice.switchIns.has(slot) || this.pokemon[slot].fainted) slot++;
					}
				} else {
					slot = parseInt(slotText) - 1;
				}
				if (isNaN(slot) || slot < 0) {
					// maybe it's a name/species id!
					slot = -1;
					for (const [i, mon] of this.pokemon.entries()) {
						if (slotText!.toLowerCase() === mon.name.toLowerCase() || toID(slotText) === mon.species.id) {
							slot = i;
							break;
						}
					}
					if (slot < 0) {
						return this.emitChoiceError(`Can't switch: You do not have a Pokémon named "${slotText}" to switch to`);
					}
				}
				if (slot >= this.pokemon.length) {
					return this.emitChoiceError(`Can't switch: You do not have a Pokémon in slot ${slot + 1} to switch to`);
				} else if (slot < this.active.length && !(this.slotConditions[pokemon.position]['revivalblessing'] || (this.slotConditions[pokemon.position]['medigun'] && this.pokemon[slot] !== pokemon))) {
					return this.emitChoiceError(`Can't switch: You can't switch to an active Pokémon`);
				} else if (this.choice.switchIns.has(slot)) {
					return this.emitChoiceError(`Can't switch: The Pokémon in slot ${slot + 1} can only switch in once`);
				}
				const targetPokemon = this.pokemon[slot];
				if (this.slotConditions[pokemon.position]['revivalblessing']) {
					if (this.slotConditions[pokemon.position]['medigun']) {
						if(targetPokemon.fainted) {
							return this.emitChoiceError(`Can't switch: You have to pass to a non-fainted Pokémon`);
						}
						if(targetPokemon === pokemon) {
							return this.emitChoiceError(`Can't switch: Medi-Gun cannot heal the user`);
						}
					}
					else {
						if (!targetPokemon.fainted) {
							return this.emitChoiceError(`Can't switch: You have to pass to a fainted Pokémon`);
						}
					}
					// Should always subtract, but stop at 0 to prevent errors.
					this.choice.forcedSwitchesLeft = this.battle.clampIntRange(this.choice.forcedSwitchesLeft - 1, 0);
					pokemon.switchFlag = false;
					this.choice.actions.push({
						choice: 'revivalblessing',
						pokemon,
						target: targetPokemon,
					} as ChosenAction);
					return true;
				}
		
				if (targetPokemon.fainted) {
					return this.emitChoiceError(`Can't switch: You can't switch to a fainted Pokémon`);
				}
		
				if (this.requestState === 'move') {
					if (pokemon.trapped) {
						const includeRequest = this.updateRequestForPokemon(pokemon, req => {
							let updated = false;
							if (req.maybeTrapped) {
								delete req.maybeTrapped;
								updated = true;
							}
							if (!req.trapped) {
								req.trapped = true;
								updated = true;
							}
							return updated;
						});
						const status = this.emitChoiceError(`Can't switch: The active Pokémon is trapped`, includeRequest);
						if (includeRequest) this.emitRequest(this.activeRequest!);
						return status;
					} else if (pokemon.maybeTrapped) {
						this.choice.cantUndo = this.choice.cantUndo || pokemon.isLastActive();
					}
				} else if (this.requestState === 'switch') {
					if (!this.choice.forcedSwitchesLeft) {
						throw new Error(`Player somehow switched too many Pokemon`);
					}
					this.choice.forcedSwitchesLeft--;
				}
		
				this.choice.switchIns.add(slot);
		
				this.choice.actions.push({
					choice: (this.requestState === 'switch' ? 'instaswitch' : 'switch'),
					pokemon,
					target: targetPokemon,
				} as ChosenAction);
		
				return true;
			}
	},
	battle: {
		runAction(action: Action) {
			const pokemonOriginalHP = action.pokemon?.hp;
			let residualPokemon: (readonly [Pokemon, number])[] = [];
			// returns whether or not we ended in a callback
			switch (action.choice) {
			case 'start': {
				for (const side of this.sides) {
					if (side.pokemonLeft) side.pokemonLeft = side.pokemon.length;
				}

				this.add('start');

				// Change Zacian/Zamazenta into their Crowned formes
				for (const pokemon of this.getAllPokemon()) {
					let rawSpecies: Species | null = null;
					if (pokemon.species.id === 'zacian' && pokemon.item === 'rustedsword') {
						rawSpecies = this.dex.species.get('Zacian-Crowned');
					} else if (pokemon.species.id === 'zamazenta' && pokemon.item === 'rustedshield') {
						rawSpecies = this.dex.species.get('Zamazenta-Crowned');
					}
					if (!rawSpecies) continue;
					const species = pokemon.setSpecies(rawSpecies);
					if (!species) continue;
					pokemon.baseSpecies = rawSpecies;
					pokemon.details = species.name + (pokemon.level === 100 ? '' : ', L' + pokemon.level) +
						(pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
					pokemon.setAbility(species.abilities['0'], null, true);
					pokemon.baseAbility = pokemon.ability;

					const behemothMove: {[k: string]: string} = {
						'Zacian-Crowned': 'behemothblade', 'Zamazenta-Crowned': 'behemothbash',
					};
					const ironHead = pokemon.baseMoves.indexOf('ironhead');
					if (ironHead >= 0) {
						const move = this.dex.moves.get(behemothMove[rawSpecies.name]);
						pokemon.baseMoveSlots[ironHead] = {
							move: move.name,
							id: move.id,
							pp: (move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5,
							maxpp: (move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5,
							target: move.target,
							disabled: false,
							disabledSource: '',
							used: false,
						};
						pokemon.moveSlots = pokemon.baseMoveSlots.slice();
					}
				}

				if (this.format.onBattleStart) this.format.onBattleStart.call(this);
				for (const rule of this.ruleTable.keys()) {
					if ('+*-!'.includes(rule.charAt(0))) continue;
					const subFormat = this.dex.formats.get(rule);
					if (subFormat.onBattleStart) subFormat.onBattleStart.call(this);
				}

				for (const side of this.sides) {
					for (let i = 0; i < side.active.length; i++) {
						if (!side.pokemonLeft) {
							// forfeited before starting
							side.active[i] = side.pokemon[i];
							side.active[i].fainted = true;
							side.active[i].hp = 0;
						} else {
							this.actions.switchIn(side.pokemon[i], i);
						}
					}
				}
				for (const pokemon of this.getAllPokemon()) {
					this.singleEvent('Start', this.dex.conditions.getByID(pokemon.species.id), pokemon.speciesState, pokemon);
				}
				this.midTurn = true;
				break;
			}

			case 'move':
				if (!action.pokemon.isActive) return false;
				if (action.pokemon.fainted) return false;
				this.actions.runMove(action.move, action.pokemon, action.targetLoc, action.sourceEffect,
					action.zmove, undefined, action.maxMove, action.originalTarget);
				break;
			case 'megaEvo':
				this.actions.runMegaEvo(action.pokemon);
				break;
			case 'megaEvoX':
				this.actions.runMegaEvoX?.(action.pokemon);
				break;
			case 'megaEvoY':
				this.actions.runMegaEvoY?.(action.pokemon);
				break;
			case 'runDynamax':
				action.pokemon.addVolatile('dynamax');
				action.pokemon.side.dynamaxUsed = true;
				if (action.pokemon.side.allySide) action.pokemon.side.allySide.dynamaxUsed = true;
				break;
			case 'terastallize':
				this.actions.terastallize(action.pokemon);
				break;
			case 'beforeTurnMove':
				if (!action.pokemon.isActive) return false;
				if (action.pokemon.fainted) return false;
				this.debug('before turn callback: ' + action.move.id);
				const target = this.getTarget(action.pokemon, action.move, action.targetLoc);
				if (!target) return false;
				if (!action.move.beforeTurnCallback) throw new Error(`beforeTurnMove has no beforeTurnCallback`);
				action.move.beforeTurnCallback.call(this, action.pokemon, target);
				break;
			case 'priorityChargeMove':
				if (!action.pokemon.isActive) return false;
				if (action.pokemon.fainted) return false;
				this.debug('priority charge callback: ' + action.move.id);
				if (!action.move.priorityChargeCallback) throw new Error(`priorityChargeMove has no priorityChargeCallback`);
				action.move.priorityChargeCallback.call(this, action.pokemon);
				break;

			case 'event':
				this.runEvent(action.event!, action.pokemon);
				break;
			case 'team':
				if (action.index === 0) {
					action.pokemon.side.pokemon = [];
				}
				action.pokemon.side.pokemon.push(action.pokemon);
				action.pokemon.position = action.index;
				// we return here because the update event would crash since there are no active pokemon yet
				return;

			case 'pass':
				return;
			case 'instaswitch':
			case 'switch':
				if (action.choice === 'switch' && action.pokemon.status) {
					this.singleEvent('CheckShow', this.dex.abilities.getByID('naturalcure' as ID), null, action.pokemon);
				}
				if (this.actions.switchIn(action.target, action.pokemon.position, action.sourceEffect) === 'pursuitfaint') {
					// a pokemon fainted from Pursuit before it could switch
					if (this.gen <= 4) {
						// in gen 2-4, the switch still happens
						this.hint("Previously chosen switches continue in Gen 2-4 after a Pursuit target faints.");
						action.priority = -101;
						this.queue.unshift(action);
						break;
					} else {
						// in gen 5+, the switch is cancelled
						this.hint("A Pokemon can't switch between when it runs out of HP and when it faints");
						break;
					}
				}
				break;
			case 'revivalblessing':
				if(action.target.fainted) { // If chosen target is fainted, then revival blessing is being performed
					action.pokemon.side.pokemonLeft++;
					if (action.target.position < action.pokemon.side.active.length) {
						this.queue.addChoice({
							choice: 'instaswitch',
							pokemon: action.target,
							target: action.target,
						});
					}
					action.target.fainted = false;
					action.target.faintQueued = false;
					action.target.subFainted = false;
					action.target.status = '';
					action.target.hp = 1; // Needed so hp functions works
					action.target.sethp(action.target.maxhp / 2);
					this.add('-heal', action.target, action.target.getHealth, '[from] move: Revival Blessing');
				}
				else { // If chosen target is not fainted, then medigun is being performed
					if (action.target.position < action.pokemon.side.active.length) {
						this.queue.addChoice({
							choice: 'instaswitch',
							pokemon: action.target,
							target: action.target,
						});
					}
					action.target.status = '';
					// Unsure how code handles setting hp to something greater than max, so this is implemented as a precaution
					if((action.target.hp + (action.target.maxhp / 4)) >= action.target.maxhp) {
						action.target.sethp(action.target.maxhp);
					}
					else {
						action.target.sethp(action.target.hp + (action.target.maxhp / 4));
					}
					this.add('-heal', action.target, action.target.getHealth, '[from] move: Medi-Gun');
					action.pokemon.side.removeSlotCondition(action.pokemon, 'medigun');
				}
				action.pokemon.side.removeSlotCondition(action.pokemon, 'revivalblessing');
				break;
			case 'runUnnerve':
				this.singleEvent('PreStart', action.pokemon.getAbility(), action.pokemon.abilityState, action.pokemon);
				break;
			case 'runSwitch':
				this.actions.runSwitch(action.pokemon);
				break;
			case 'runPrimal':
				if (!action.pokemon.transformed) {
					this.singleEvent('Primal', action.pokemon.getItem(), action.pokemon.itemState, action.pokemon);
				}
				break;
			case 'shift':
				if (!action.pokemon.isActive) return false;
				if (action.pokemon.fainted) return false;
				this.swapPosition(action.pokemon, 1);
				break;

			case 'beforeTurn':
				this.eachEvent('BeforeTurn');
				break;
			case 'residual':
				this.add('');
				this.clearActiveMove(true);
				this.updateSpeed();
				residualPokemon = this.getAllActive().map(pokemon => [pokemon, pokemon.getUndynamaxedHP()] as const);
				this.residualEvent('Residual');
				this.add('upkeep');
				break;
			}

			// phazing (Roar, etc)
			for (const side of this.sides) {
				for (const pokemon of side.active) {
					if (pokemon.forceSwitchFlag) {
						if (pokemon.hp) this.actions.dragIn(pokemon.side, pokemon.position);
						pokemon.forceSwitchFlag = false;
					}
				}
			}

			this.clearActiveMove();

			// fainting

			this.faintMessages();
			if (this.ended) return true;

			// switching (fainted pokemon, U-turn, Baton Pass, etc)

			if (!this.queue.peek() || (this.gen <= 3 && ['move', 'residual'].includes(this.queue.peek()!.choice))) {
				// in gen 3 or earlier, switching in fainted pokemon is done after
				// every move, rather than only at the end of the turn.
				this.checkFainted();
			} else if (['megaEvo', 'megaEvoX', 'megaEvoY'].includes(action.choice) && this.gen === 7) {
				this.eachEvent('Update');
				// In Gen 7, the action order is recalculated for a Pokémon that mega evolves.
				for (const [i, queuedAction] of this.queue.list.entries()) {
					if (queuedAction.pokemon === action.pokemon && queuedAction.choice === 'move') {
						this.queue.list.splice(i, 1);
						queuedAction.mega = 'done';
						this.queue.insertChoice(queuedAction, true);
						break;
					}
				}
				return false;
			} else if (this.queue.peek()?.choice === 'instaswitch') {
				return false;
			}

			if (this.gen >= 5) {
				this.eachEvent('Update');
				for (const [pokemon, originalHP] of residualPokemon) {
					const maxhp = pokemon.getUndynamaxedHP(pokemon.maxhp);
					if (pokemon.hp && pokemon.getUndynamaxedHP() <= maxhp / 2 && originalHP > maxhp / 2) {
						this.runEvent('EmergencyExit', pokemon);
					}
				}
			}

			if (action.choice === 'runSwitch') {
				const pokemon = action.pokemon;
				if (pokemon.hp && pokemon.hp <= pokemon.maxhp / 2 && pokemonOriginalHP! > pokemon.maxhp / 2) {
					this.runEvent('EmergencyExit', pokemon);
				}
			}

			const switches = this.sides.map(
				side => side.active.some(pokemon => pokemon && !!pokemon.switchFlag)
			);

			for (let i = 0; i < this.sides.length; i++) {
				let reviveSwitch = false; // Used to ignore the fake switch for Revival Blessing
				if (switches[i] && !this.canSwitch(this.sides[i])) {
					for (const pokemon of this.sides[i].active) {
						if (this.sides[i].slotConditions[pokemon.position]['revivalblessing']) {
							reviveSwitch = true;
							continue;
						}
						pokemon.switchFlag = false;
					}
					if (!reviveSwitch) switches[i] = false;
				} else if (switches[i]) {
					for (const pokemon of this.sides[i].active) {
						if (pokemon.hp && pokemon.switchFlag && pokemon.switchFlag !== 'revivalblessing' &&
								!pokemon.skipBeforeSwitchOutEventFlag) {
							this.runEvent('BeforeSwitchOut', pokemon);
							pokemon.skipBeforeSwitchOutEventFlag = true;
							this.faintMessages(); // Pokemon may have fainted in BeforeSwitchOut
							if (this.ended) return true;
							if (pokemon.fainted) {
								switches[i] = this.sides[i].active.some(sidePokemon => sidePokemon && !!sidePokemon.switchFlag);
							}
						}
					}
				}
			}

			for (const playerSwitch of switches) {
				if (playerSwitch) {
					this.makeRequest('switch');
					return true;
				}
			}

			if (this.gen < 5) this.eachEvent('Update');

			if (this.gen >= 8 && (this.queue.peek()?.choice === 'move' || this.queue.peek()?.choice === 'runDynamax')) {
				// In gen 8, speed is updated dynamically so update the queue's speed properties and sort it.
				this.updateSpeed();
				for (const queueAction of this.queue.list) {
					if (queueAction.pokemon) this.getActionSpeed(queueAction);
				}
				this.queue.sort();
			}

			return false;
		}
	},
};
