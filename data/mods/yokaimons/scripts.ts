export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ['S Rank', 'A Rank', 'B Rank', 'C Rank', 'D Rank', 'E Rank'],
	},
	init() {
		for (const i in this.data.Moves) {
			if (this.data.Moves[i].isNonstandard === 'Past') {
				this.modData('Moves', i).isNonstandard = null;
			}
			if (this.data.Moves[i].pp > 20) {
				this.modData('Moves', i).pp = 20;
			}
		}
	},
	statModify(baseStats, set, statName) {
		const tr = this.trunc;
		let stat = baseStats[statName];
		const evs = set.evs[statName];
		if (statName === 'hp') {
			return stat + evs + 75;
		}
		stat = stat + evs + 20;
		const nature = this.dex.natures.get(set.nature);
		// Natures are calculated with 16-bit truncation.
		// This only affects Eternatus-Eternamax in Pure Hackmons.
		if (nature.plus === statName) {
			stat = this.ruleTable.has('overflowstatmod') ? Math.min(stat, 595) : stat;
			stat = tr(tr(stat * 110, 16) / 100);
		} else if (nature.minus === statName) {
			stat = this.ruleTable.has('overflowstatmod') ? Math.min(stat, 728) : stat;
			stat = tr(tr(stat * 90, 16) / 100);
		}
		return stat;
	},
	calculatePP(move, ppUps) {
		if (move.flags?.['soultimate']) return Infinity;
		return move.noPPBoosts ? move.pp : (move.pp / 5 + 1) * 4;
	},
	onBeforeTurn(pokemon) {
		pokemon.loafedThisTurn = false;
		pokemon.dodgedThisTurn = false;
	},
	onAnyAccuracy(accuracy, target, source, move) {
		if (target.dodgedThisTurn && move.type !== 'Inspirit') {
			return true;
		}
		return accuracy;
	},
	pokemon: {
		// Remove Trick Room underflow
		getActionSpeed() {
			let speed = this.getStat('spe', false, false);
			const trickRoomCheck = this.battle.ruleTable.has('twisteddimensionmod') ?
				!this.battle.field.getPseudoWeather('trickroom') : this.battle.field.getPseudoWeather('trickroom');
			if (trickRoomCheck) {
				speed = -speed;
			}
			return speed;
		},
		// Don't revert Mega Evolutions after fainting
		// TODO: confirm interaction with Revival Blessing
		formeChange(speciesId, source, isPermanent, abilitySlot = '0', message) {
			const rawSpecies = this.battle.dex.species.get(speciesId);

			const species = this.setSpecies(rawSpecies, source);
			if (!species) return false;

			if (this.battle.gen <= 2) return true;

			// The species the opponent sees
			const apparentSpecies =
				this.illusion ? this.illusion.species.name : species.baseSpecies;
			if (isPermanent) {
				this.baseSpecies = rawSpecies;
				this.details = this.getUpdatedDetails();
				let details = (this.illusion || this).details;
				if (this.terastallized) details += `, tera:${this.terastallized}`;
				this.battle.add('detailschange', this, details);
				this.updateMaxHp();
				if (!source) {
					// Tera forme
					// Ogerpon/Terapagos text goes here
					this.formeRegression = true;
				} else if (source.effectType === 'Item') {
					this.canTerastallize = null; // National Dex behavior
					if (source.zMove) {
						this.battle.add('-burst', this, apparentSpecies, species.requiredItem);
						this.moveThisTurnResult = true; // Ultra Burst counts as an action for Truant
					} else if (source.isPrimalOrb) {
						if (this.illusion) {
							this.ability = '';
							this.battle.add('-primal', this.illusion, species.requiredItem);
						} else {
							this.battle.add('-primal', this, species.requiredItem);
						}
					} else {
						this.battle.add('-mega', this, apparentSpecies, species.requiredItem);
						this.moveThisTurnResult = true; // Mega Evolution counts as an action for Truant
					}
				} else if (source.effectType === 'Status') {
					// Shaymin-Sky -> Shaymin
					this.battle.add('-formechange', this, species.name, message);
				}
			} else {
				if (source?.effectType === 'Ability') {
					this.battle.add('-formechange', this, species.name, message, `[from] ability: ${source.name}`);
				} else {
					this.battle.add('-formechange', this, this.illusion ? this.illusion.species.name : species.name, message);
				}
			}
			if (isPermanent && (!source || !['disguise', 'iceface'].includes(source.id))) {
				if (this.illusion && source) {
					// Tera forme by Ogerpon or Terapagos breaks the Illusion
					this.ability = ''; // Don't allow Illusion to wear off
				}
				const ability = species.abilities[abilitySlot] || species.abilities['0'];
				// Ogerpon's forme change doesn't override permanent abilities
				if (source || !this.getAbility().flags['cantsuppress']) this.setAbility(ability, null, null, true);
				// However, its ability does reset upon switching out
				this.baseAbility = this.battle.toID(ability);
			}
			if (this.terastallized) {
				this.knownType = true;
				this.apparentType = this.terastallized;
			}
			return true;
		},
		getMoveTargets(move: ActiveMove, target: Pokemon): {targets: Pokemon[], pressureTargets: Pokemon[]} {
			let targets: Pokemon[] = [];

			switch (move.target as string) {
			case 'all':
			case 'foeSide':
			case 'allySide':
			case 'allyTeam':
				if (!move.target.startsWith('foe')) {
					targets.push(...this.alliesAndSelf());
				}
				if (!move.target.startsWith('ally')) {
					targets.push(...this.foes(true));
				}
				if (targets.length && !targets.includes(target)) {
					this.battle.retargetLastMove(targets[targets.length - 1]);
				}
				break;
			case 'allAdjacent':
				targets.push(...this.adjacentAllies());
				// falls through
			case 'allAdjacentFoes':
				targets.push(...this.adjacentFoes());
				if (targets.length && !targets.includes(target)) {
					this.battle.retargetLastMove(targets[targets.length - 1]);
				}
				break;
			case 'allies':
				targets = this.alliesAndSelf();
				break;
			case 'allFoes':
				targets.push(...this.foes(true));
				if (targets.length && !targets.includes(target)) {
					this.battle.retargetLastMove(targets[targets.length - 1]);
				}
				break;
			default:
				const selectedTarget = target;
				if (!target || (target.fainted && !target.isAlly(this)) && this.battle.gameType !== 'freeforall') {
					// If a targeted foe faints, the move is retargeted
					const possibleTarget = this.battle.getRandomTarget(this, move);
					if (!possibleTarget) return {targets: [], pressureTargets: []};
					target = possibleTarget;
				}
				if (this.battle.activePerHalf > 1 && !move.tracksTarget) {
					const isCharging = move.flags['charge'] && !this.volatiles['twoturnmove'] &&
						!(move.id.startsWith('solarb') && ['sunnyday', 'desolateland'].includes(this.effectiveWeather())) &&
						!(move.id === 'electroshot' && ['raindance', 'primordialsea'].includes(this.effectiveWeather())) &&
						!(this.hasItem('powerherb') && move.id !== 'skydrop');
					if (!isCharging) {
						target = this.battle.priorityEvent('RedirectTarget', this, this, move, target);
					}
				}
				if (move.smartTarget) {
					targets = this.getSmartTargets(target, move);
					target = targets[0];
				} else {
					targets.push(target);
				}
				if (target.fainted && !move.flags['futuremove']) {
					return {targets: [], pressureTargets: []};
				}
				if (selectedTarget !== target) {
					this.battle.retargetLastMove(target);
				}
			}

			// Resolve apparent targets for Pressure.
			let pressureTargets = targets;
			if (move.target === 'foeSide') {
				pressureTargets = [];
			}
			if (move.flags['mustpressure']) {
				pressureTargets = this.foes();
			}

			return {targets, pressureTargets};
		}
	},
	side: {
		chooseShift() {
			if (this.battle.ruleTable.has('shiftclause')) {
				return this.emitChoiceError(`Can't shift: Shifting is disabled in this format`);
			}
			const index = this.getChoiceIndex();
			if (index >= this.active.length) {
				return this.emitChoiceError(`Can't shift: You do not have a Pokémon in slot ${index + 1}`);
			} else if (this.requestState !== 'move') {
				return this.emitChoiceError(`Can't shift: You can only shift during a move phase`);
			} else if (this.battle.gameType !== 'triples') {
				return this.emitChoiceError(`Can't shift: You can only shift to the center in triples`);
			} else if (index === 1) {
				return this.emitChoiceError(`Can't shift: You can only shift from the edge to the center`);
			}
			const pokemon: Pokemon = this.active[index];

			this.choice.actions.push({
				choice: 'shift',
				pokemon,
			} as ChosenAction);

			return true;
		},
		chooseMove(
				moveText?: string | number,
				targetLoc = 0,
				event: 'mega' | 'megax' | 'megay' | 'zmove' | 'ultra' | 'dynamax' | 'terastallize' | '' = ''
			) {
				if (this.requestState !== 'move') {
					return this.emitChoiceError(`Can't move: You need a ${this.requestState} response`);
				}
				const index = this.getChoiceIndex();
				if (index >= this.active.length) {
					return this.emitChoiceError(`Can't move: You sent more choices than unfainted Pokémon.`);
				}
				const autoChoose = !moveText;
				const pokemon: Pokemon = this.active[index];
		
				// Parse moveText (name or index)
				// If the move is not found, the action is invalid without requiring further inspection.
		
				const request = pokemon.getMoveRequestData();
				let moveid = '';
				let targetType = '';
				if (autoChoose) moveText = 1;
				if (typeof moveText === 'number' || (moveText && /^[0-9]+$/.test(moveText))) {
					// Parse a one-based move index.
					const moveIndex = Number(moveText) - 1;
					if (moveIndex < 0 || moveIndex >= request.moves.length || !request.moves[moveIndex]) {
						return this.emitChoiceError(`Can't move: Your ${pokemon.name} doesn't have a move ${moveIndex + 1}`);
					}
					moveid = request.moves[moveIndex].id;
					targetType = request.moves[moveIndex].target!;
				} else {
					// Parse a move ID.
					// Move names are also allowed, but may cause ambiguity (see client issue #167).
					moveid = this.battle.toID(moveText);
					if (moveid.startsWith('hiddenpower')) {
						moveid = 'hiddenpower';
					}
					for (const move of request.moves) {
						if (move.id !== moveid) continue;
						targetType = move.target || 'normal';
						break;
					}
					if (!targetType && ['', 'dynamax'].includes(event) && request.maxMoves) {
						for (const [i, moveRequest] of request.maxMoves.maxMoves.entries()) {
							if (moveid === moveRequest.move) {
								moveid = request.moves[i].id;
								targetType = moveRequest.target;
								event = 'dynamax';
								break;
							}
						}
					}
					if (!targetType && ['', 'zmove'].includes(event) && request.canZMove) {
						const soultimateRequest = request.canZMove[0];
						if (soultimateRequest && moveid === this.battle.toID(soultimateRequest.move)) {
							moveid = request.moves[0].id;
							targetType = soultimateRequest.target;
							event = 'zmove';
						}
					}
					if (!targetType) {
						return this.emitChoiceError(`Can't move: Your ${pokemon.name} doesn't have a move matching ${moveid}`);
					}
				}
		
				const moves = pokemon.getMoves();
				if (autoChoose) {
					for (const [i, move] of request.moves.entries()) {
						if (move.disabled) continue;
						if (i < moves.length && move.id === moves[i].id && moves[i].disabled) continue;
						moveid = move.id;
						targetType = move.target!;
						break;
					}
				}
				const move = this.battle.dex.moves.get(moveid);
		
				// Z-move
		
				const zMove = event === 'zmove' ? this.battle.actions.getZMove(move, pokemon) : undefined;
				if (event === 'zmove' && !zMove) {
					return this.emitChoiceError(`Can't move: ${pokemon.name} can't use ${move.name} as a Z-move`);
				}
				if (zMove && this.choice.zMove) {
					return this.emitChoiceError(`Can't move: You can only use one Soultimate per turn`);
				}
		
				if (zMove) targetType = this.battle.dex.moves.get(zMove).target;
		
				// Dynamax
				// Is dynamaxed or will dynamax this turn.
				const maxMove = (event === 'dynamax' || pokemon.volatiles['dynamax']) ?
					this.battle.actions.getMaxMove(move, pokemon) : undefined;
				if (event === 'dynamax' && !maxMove) {
					return this.emitChoiceError(`Can't move: ${pokemon.name} can't use ${move.name} as a Max Move`);
				}
		
				if (maxMove) targetType = this.battle.dex.moves.get(maxMove).target;
		
				// Validate targetting
		
				if (autoChoose) {
					targetLoc = 0;
				} else if (this.battle.actions.targetTypeChoices(targetType)) {
					if (!targetLoc && this.active.length >= 2) {
						return this.emitChoiceError(`Can't move: ${move.name} needs a target`);
					}
					if (!this.battle.validTargetLoc(targetLoc, pokemon, targetType)) {
						return this.emitChoiceError(`Can't move: Invalid target for ${move.name}`);
					}
				} else {
					if (targetLoc) {
						return this.emitChoiceError(`Can't move: You can't choose a target for ${move.name}`);
					}
				}
		
				const lockedMove = pokemon.getLockedMove();
				if (lockedMove) {
					let lockedMoveTargetLoc = pokemon.lastMoveTargetLoc || 0;
					const lockedMoveID = this.battle.toID(lockedMove);
					if (pokemon.volatiles[lockedMoveID] && pokemon.volatiles[lockedMoveID].targetLoc) {
						lockedMoveTargetLoc = pokemon.volatiles[lockedMoveID].targetLoc;
					}
					this.choice.actions.push({
						choice: 'move',
						pokemon,
						targetLoc: lockedMoveTargetLoc,
						moveid: lockedMoveID,
					});
					return true;
				} else if (!moves.length && !zMove) {
					// Override action and use Struggle if there are no enabled moves with PP
					// Gen 4 and earlier announce a Pokemon has no moves left before the turn begins, and only to that player's side.
					if (this.battle.gen <= 4) this.send('-activate', pokemon, 'move: Struggle');
					moveid = 'struggle';
				} else if (maxMove) {
					// Dynamaxed; only Taunt and Assault Vest disable Max Guard, but the base move must have PP remaining
					if (pokemon.maxMoveDisabled(move)) {
						return this.emitChoiceError(`Can't move: ${pokemon.name}'s ${maxMove.name} is disabled`);
					}
				} else if (!zMove) {
					// Check for disabled moves
					let isEnabled = false;
					let disabledSource = '';
					for (const m of moves) {
						if (m.id !== moveid) continue;
						if (!m.disabled) {
							isEnabled = true;
							break;
						} else if (m.disabledSource) {
							disabledSource = m.disabledSource;
						}
					}
					if (!isEnabled) {
						// Request a different choice
						if (autoChoose) throw new Error(`autoChoose chose a disabled move`);
						const includeRequest = this.updateRequestForPokemon(pokemon, req => {
							let updated = false;
							for (const m of req.moves) {
								if (m.id === moveid) {
									if (!m.disabled) {
										m.disabled = true;
										updated = true;
									}
									if (m.disabledSource !== disabledSource) {
										m.disabledSource = disabledSource;
										updated = true;
									}
									break;
								}
							}
							return updated;
						});
						const status = this.emitChoiceError(`Can't move: ${pokemon.name}'s ${move.name} is disabled`, includeRequest);
						if (includeRequest) this.emitRequest(this.activeRequest!);
						return status;
					}
					// The chosen move is valid yay
				}
		
				// Mega evolution
		
				const mega = (event === 'mega');
				const megax = (event === 'megax');
				const megay = (event === 'megay');
				if (mega && !pokemon.canMegaEvo) {
					return this.emitChoiceError(`Can't move: ${pokemon.name} can't mega evolve`);
				}
				if (megax && !pokemon.canMegaEvoX) {
					return this.emitChoiceError(`Can't move: ${pokemon.name} can't mega evolve X`);
				}
				if (megay && !pokemon.canMegaEvoY) {
					return this.emitChoiceError(`Can't move: ${pokemon.name} can't mega evolve Y`);
				}
				if ((mega || megax || megay) && this.choice.mega) {
					return this.emitChoiceError(`Can't move: You can only mega-evolve once per battle`);
				}
				const ultra = (event === 'ultra');
				if (ultra && !pokemon.canUltraBurst) {
					return this.emitChoiceError(`Can't move: ${pokemon.name} can't ultra burst`);
				}
				if (ultra && this.choice.ultra) {
					return this.emitChoiceError(`Can't move: You can only ultra burst once per battle`);
				}
				let dynamax = (event === 'dynamax');
				const canDynamax = this.activeRequest?.active[this.active.indexOf(pokemon)].canDynamax;
				if (dynamax && (this.choice.dynamax || !canDynamax)) {
					if (pokemon.volatiles['dynamax']) {
						dynamax = false;
					} else {
						if (this.battle.gen !== 8) {
							return this.emitChoiceError(`Can't move: Dynamaxing doesn't outside of Gen 8.`);
						} else if (pokemon.side.canDynamaxNow()) {
							return this.emitChoiceError(`Can't move: ${pokemon.name} can't Dynamax now.`);
						} else if (pokemon.side.allySide?.canDynamaxNow()) {
							return this.emitChoiceError(`Can't move: It's your partner's turn to Dynamax.`);
						}
						return this.emitChoiceError(`Can't move: You can only Dynamax once per battle.`);
					}
				}
				const terastallize = (event === 'terastallize');
				if (terastallize && !pokemon.canTerastallize) {
					// Make this work properly
					return this.emitChoiceError(`Can't move: ${pokemon.name} can't Terastallize.`);
				}
				if (terastallize && this.choice.terastallize) {
					return this.emitChoiceError(`Can't move: You can only Terastallize once per battle.`);
				}
				if (terastallize && this.battle.gen !== 9) {
					// Make this work properly
					return this.emitChoiceError(`Can't move: You can only Terastallize in Gen 9.`);
				}
		
				this.choice.actions.push({
					choice: 'move',
					pokemon,
					targetLoc,
					moveid,
					mega: mega || ultra,
					megax: megax,
					megay: megay,
					zmove: zMove,
					maxMove: maxMove ? maxMove.id : undefined,
					terastallize: terastallize ? pokemon.teraType : undefined,
				});
		
				if (pokemon.maybeDisabled) {
					this.choice.cantUndo = this.choice.cantUndo || pokemon.isLastActive();
				}
		
				if (mega || megax || megay) this.choice.mega = true;
				if (ultra) this.choice.ultra = true;
				if (zMove) this.choice.zMove = true;
				if (dynamax) this.choice.dynamax = true;
				if (terastallize) this.choice.terastallize = true;
		
				return true;
			}
	},
	actions: {
		canTerastallize(pokemon) {
			return null;
		},
		canZMove(pokemon) {
			if (!pokemon.soultimateMove) return null;
			const move = this.dex.moves.get(pokemon.soultimateMove);
			if (!move.soultimateMaxCharge) return null;
			if (pokemon.soultimateCharge < move.soultimateMaxCharge) return null;
			return [{
				move: move.name,
				target: move.target,
			}];
		},
		canMegaEvo(pokemon: Pokemon) {
			const species = pokemon.baseSpecies;
			const altForme = species.otherFormes && this.dex.species.get(species.otherFormes[0]);
			const item = pokemon.getItem();
			// Mega Rayquaza
			if ((this.battle.gen <= 7 || this.battle.ruleTable.has('+pokemontag:past') ||
				this.battle.ruleTable.has('+pokemontag:future')) &&
				altForme?.isMega && altForme?.requiredMove &&
				pokemon.baseMoves.includes(this.battle.toID(altForme.requiredMove)) && !item.zMove) {
				return altForme.name;
			}
			return item.megaStone?.[species.name] || null;
		},
		targetTypeChoices(targetType: string) {
			return new Set(['normal', 'any', 'adjacentAlly', 'adjacentAllyOrSelf', 'anyAlly', 'adjacentFoe', 'anyAllyOrSelf', 'anyFoe']).has(targetType);
		},
		getTarget(pokemon: Pokemon, move: string | Move, targetLoc: number, originalTarget?: Pokemon) {
			move = this.dex.moves.get(move);
	
			let tracksTarget = move.tracksTarget;
			// Stalwart sets trackTarget in ModifyMove, but ModifyMove happens after getTarget, so
			// we need to manually check for Stalwart here
			// also added checks for Eyesight A and Sense of Smell
			if (pokemon.hasAbility(['stalwart', 'propellertail', 'eyesighta', 'senseofsmell'])) tracksTarget = true;
			if (tracksTarget && originalTarget && originalTarget.isActive) {
				// smart-tracking move's original target is on the field: target it
				return originalTarget;
			}
	
			// banning Dragon Darts from directly targeting itself is done in side.ts, but
			// Dragon Darts can target itself if Ally Switch is used afterwards
			if (move.smartTarget) {
				const curTarget = pokemon.getAtLoc(targetLoc);
				return curTarget && !curTarget.fainted ? curTarget : this.getRandomTarget(pokemon, move);
			}
	
			// Fails if the target is the user and the move can't target its own position
			const selfLoc = pokemon.getLocOf(pokemon);
			if (['adjacentAlly', 'any', 'normal'/*, 'anyFoe'*/].includes(move.target) && targetLoc === selfLoc &&
					!pokemon.volatiles['twoturnmove'] && !pokemon.volatiles['iceball'] && !pokemon.volatiles['rollout']) {
				return move.flags['futuremove'] ? pokemon : null;
			}
			if (move.target !== 'randomNormal' && this.validTargetLoc(targetLoc, pokemon, move.target)) {
				const target = pokemon.getAtLoc(targetLoc);
				if (target?.fainted) {
					if (this.gameType === 'freeforall') {
						// Target is a fainted opponent in a free-for-all battle; attack shouldn't retarget
						return target;
					}
					if (target.isAlly(pokemon)) {
						// Target is a fainted ally: attack shouldn't retarget
						return target;
					}
				}
				if (target && !target.fainted) {
					// Target is unfainted: use selected target location
					return target;
				}
	
				// Chosen target not valid,
				// retarget randomly with getRandomTarget
			}
			return this.getRandomTarget(pokemon, move);
		},
		validTargetLoc(targetLoc: number, source: Pokemon, targetType: string) {
			if (targetLoc === 0) return true;
			const numSlots = this.activePerHalf;
			const sourceLoc = source.getLocOf(source);
			if (Math.abs(targetLoc) > numSlots) return false;
			const isSelf = (sourceLoc === targetLoc);
			const isFoe = (this.gameType === 'freeforall' ? !isSelf : targetLoc > 0);
			const acrossFromTargetLoc = -(numSlots + 1 - targetLoc);
			const isAdjacent = (targetLoc > 0 ?
				Math.abs(acrossFromTargetLoc - sourceLoc) <= 1 :
				Math.abs(targetLoc - sourceLoc) === 1);
			
			if (this.gameType === 'freeforall' && targetType === 'adjacentAlly') {
				return isAdjacent;
			}

			switch (targetType) {
			case 'randomNormal':
			case 'scripted':
			case 'normal':
				return isAdjacent;
			case 'adjacentAlly':
				return isAdjacent && !isFoe;
			case 'adjacentAllyOrSelf':
				return isAdjacent && !isFoe || isSelf;
			case 'adjacentFoe':
				return isAdjacent && isFoe;
			case 'any':
				return !isSelf;
			/*case 'anyFoe':
				return isFoe;*/
			case 'anyAlly':
 			   return !isFoe && !isSelf;
			/*case 'anyAllyOrSelf':
				return !isFoe;*/
			}
			return false;
		},
		/**
		 * 0 is a success dealing 0 damage, such as from False Swipe at 1 HP.
		 *
		 * Normal PS return value rules apply:
		 * undefined = success, null = silent failure, false = loud failure
		 */
		 getDamage(
			source: Pokemon, target: Pokemon, move: string | number | ActiveMove,
			suppressMessages = false
		): number | undefined | null | false {
			if (typeof move === 'string') move = this.dex.getActiveMove(move);
	
			if (typeof move === 'number') {
				const basePower = move;
				move = new Dex.Move({
					basePower,
					type: '???',
					category: 'Physical',
					willCrit: false,
				}) as ActiveMove;
				move.hit = 0;
			}
	
			if (!move.ignoreImmunity || (move.ignoreImmunity !== true && !move.ignoreImmunity[move.type])) {
				if (!target.runImmunity(move.type, !suppressMessages)) {
					return false;
				}
			}
	
			if (move.ohko) return target.maxhp;
			if (move.damageCallback) return move.damageCallback.call(this.battle, source, target);
			if (move.damage === 'level') {
				return source.level;
			} else if (move.damage) {
				return move.damage;
			}
	
			const category = this.battle.getCategory(move);
	
			let basePower: number | false | null = move.basePower;
			if (move.basePowerCallback) {
				basePower = move.basePowerCallback.call(this.battle, source, target, move);
			}
			if (!basePower) return basePower === 0 ? undefined : basePower;
			basePower = this.battle.clampIntRange(basePower, 1);
	
			let critMult;
			let critRatio = this.battle.runEvent('ModifyCritRatio', source, target, move, move.critRatio || 0);
			if (this.battle.gen <= 5) {
				critRatio = this.battle.clampIntRange(critRatio, 0, 5);
				critMult = [0, 16, 8, 4, 3, 2];
			} else {
				critRatio = this.battle.clampIntRange(critRatio, 0, 4);
				if (this.battle.gen === 6) {
					critMult = [0, 16, 8, 2, 1];
				} else {
					critMult = [0, 24, 8, 2, 1];
				}
			}
	
			const moveHit = target.getMoveHitData(move);
			moveHit.crit = move.willCrit || false;
			if (move.willCrit === undefined) {
				if (critRatio) {
					moveHit.crit = this.battle.randomChance(1, critMult[critRatio]);
				}
			}
	
			if (moveHit.crit) {
				moveHit.crit = this.battle.runEvent('CriticalHit', target, null, move);
			}
	
			// happens after crit calculation
			basePower = this.battle.runEvent('BasePower', source, target, move, basePower, true);
	
			if (!basePower) return 0;
			basePower = this.battle.clampIntRange(basePower, 1);
			// Hacked Max Moves have 0 base power, even if you Dynamax
			if ((!source.volatiles['dynamax'] && move.isMax) || (move.isMax && this.dex.moves.get(move.baseMove).isMax)) {
				basePower = 0;
			}
	
			if (
				basePower < 60 && source.getTypes(true).includes(move.type) && source.terastallized && move.priority <= 0 &&
				// Hard move.basePower check for moves like Dragon Energy that have variable BP
				!move.multihit && !((move.basePower === 0 || move.basePower === 150) && move.basePowerCallback)
			) {
				basePower = 60;
			}
	
			const level = source.level;
	
			const attacker = move.overrideOffensivePokemon === 'target' ? target : source;
			const defender = move.overrideDefensivePokemon === 'source' ? source : target;
	
			const isPhysical = move.category === 'Physical';
			let attackStat: StatIDExceptHP = move.overrideOffensiveStat || (isPhysical ? 'atk' : 'spa');
			const defenseStat: StatIDExceptHP = move.overrideDefensiveStat || (isPhysical ? 'def' : 'spd');
	
			const statTable = {atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe'};
	
			let atkBoosts = attacker.boosts[attackStat];
			let defBoosts = defender.boosts[defenseStat];
	
			let ignoreNegativeOffensive = !!move.ignoreNegativeOffensive;
			let ignorePositiveDefensive = !!move.ignorePositiveDefensive;
	
			// Crits no longer ignore Defense raises
			if (moveHit.crit) {
				ignoreNegativeOffensive = true;
			}
			const ignoreOffensive = !!(move.ignoreOffensive || (ignoreNegativeOffensive && atkBoosts < 0));
			const ignoreDefensive = !!(move.ignoreDefensive || (ignorePositiveDefensive && defBoosts > 0));
	
			if (ignoreOffensive) {
				this.battle.debug('Negating (sp)atk boost/penalty.');
				atkBoosts = 0;
			}
			if (ignoreDefensive) {
				this.battle.debug('Negating (sp)def boost/penalty.');
				defBoosts = 0;
			}
	
			let attack = attacker.calculateStat(attackStat, atkBoosts, 1, source);
			let defense = defender.calculateStat(defenseStat, defBoosts, 1, target);
	
			attackStat = (category === 'Physical' ? 'atk' : 'spa');

			// Removing Special Defense from the calculation
			if (!isPhysical) defense = 236;
	
			// Apply Stat Modifiers
			attack = this.battle.runEvent('Modify' + statTable[attackStat], source, target, move, attack);
			defense = this.battle.runEvent('Modify' + statTable[defenseStat], target, source, move, defense);
	
			if (this.battle.gen <= 4 && ['explosion', 'selfdestruct'].includes(move.id) && defenseStat === 'def') {
				defense = this.battle.clampIntRange(Math.floor(defense / 2), 1);
			}
	
			const tr = this.battle.trunc;
	
			// int(int(int(2 * L / 5 + 2) * A * P / D) / 50);
			const baseDamage = tr(tr(tr(tr(2 * level / 5 + 2) * basePower * attack) / defense) / 50);
	
			// Calculate damage modifiers separately (order differs between generations)
			return this.modifyDamage(baseDamage, source, target, move, suppressMessages);
		},
		// Announce 4x and 0.25x effectiveness
		// Additionally removed spread move multi-target damage reduction
		modifyDamage(baseDamage, pokemon, target, move, suppressMessages) {
			const tr = this.battle.trunc;
			if (!move.type) move.type = '???';
			const type = move.type;

			baseDamage += 2;

			if (move.multihitType === 'parentalbond' && move.hit > 1) {
				// Parental Bond modifier
				const bondModifier = this.battle.gen > 6 ? 0.25 : 0.5;
				this.battle.debug(`Parental Bond modifier: ${bondModifier}`);
				baseDamage = this.battle.modify(baseDamage, bondModifier);
			}

			// weather modifier
			baseDamage = this.battle.priorityEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);

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
				if (!suppressMessages) this.battle.add('-supereffective', target, Math.min(typeMod, 2));

				for (let i = 0; i < typeMod; i++) {
					baseDamage *= 2;
				}
			}
			if (typeMod < 0) {
				if (!suppressMessages) this.battle.add('-resisted', target, Math.min(-typeMod, 2));

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

			const bypassProtect = target.getMoveHitData(move).bypassProtect;
			if (bypassProtect) {
				baseDamage = this.battle.modify(baseDamage, 0.25);
				if (bypassProtect !== true && bypassProtect.effectType === 'Ability') {
					this.battle.add('-ability', pokemon, bypassProtect.name);
				}
				this.battle.add('-zbroken', target);
			}

			// Generation 6-7 moves the check for minimum 1 damage after the final modifier...
			if (this.battle.gen !== 5 && !baseDamage) return 1;

			// ...but 16-bit truncation happens even later, and can truncate to 0
			return tr(baseDamage, 16);
		},
		runMove(
			moveOrMoveName: Move | string, pokemon: Pokemon, targetLoc: number, sourceEffect?: Effect | null,
			zMove?: string, externalMove?: boolean, maxMove?: string, originalTarget?: Pokemon
		) {
			pokemon.activeMoveActions++;
			let target = this.battle.getTarget(pokemon, maxMove || zMove || moveOrMoveName, targetLoc, originalTarget);
			let baseMove = this.dex.getActiveMove(moveOrMoveName);
			const priority = baseMove.priority;
			const pranksterBoosted = baseMove.pranksterBoosted;
			if (baseMove.id !== 'struggle' && !zMove && !maxMove && !externalMove) {
				const changedMove = this.battle.runEvent('OverrideAction', pokemon, target, baseMove);
				if (changedMove && changedMove !== true) {
					baseMove = this.dex.getActiveMove(changedMove);
					baseMove.priority = priority;
					if (pranksterBoosted) baseMove.pranksterBoosted = pranksterBoosted;
					target = this.battle.getRandomTarget(pokemon, baseMove);
				}
			}
			let move = baseMove;
			if (zMove) {
				move = this.dex.getActiveMove(pokemon.soultimateMove as string);
				baseMove = move;
			} else if (maxMove) {
				move = this.getActiveMaxMove(baseMove, pokemon);
			}

			move.isExternal = externalMove;

			this.battle.setActiveMove(move, pokemon, target);

			/* if (pokemon.moveThisTurn) {
				// THIS IS PURELY A SANITY CHECK
				// DO NOT TAKE ADVANTAGE OF THIS TO PREVENT A POKEMON FROM MOVING;
				// USE this.queue.cancelMove INSTEAD
				this.battle.debug('' + pokemon.id + ' INCONSISTENT STATE, ALREADY MOVED: ' + pokemon.moveThisTurn);
				this.battle.clearActiveMove(true);
				return;
			} */
			const willTryMove = this.battle.runEvent('BeforeMove', pokemon, target, move);
			if (!willTryMove) {
				this.battle.runEvent('MoveAborted', pokemon, target, move);
				this.battle.clearActiveMove(true);
				// The event 'BeforeMove' could have returned false or null
				// false indicates that this counts as a move failing for the purpose of calculating Stomping Tantrum's base power
				// null indicates the opposite, as the Pokemon didn't have an option to choose anything
				pokemon.moveThisTurnResult = willTryMove;
				return;
			}

			// Used exclusively for a hint later
			if (move.flags['cantusetwice'] && pokemon.lastMove?.id === move.id) {
				pokemon.addVolatile(move.id);
			}

			if (move.beforeMoveCallback) {
				if (move.beforeMoveCallback.call(this.battle, pokemon, target, move)) {
					this.battle.clearActiveMove(true);
					pokemon.moveThisTurnResult = false;
					return;
				}
			}
			pokemon.lastDamage = 0;
			let lockedMove;
			if (!externalMove) {
				lockedMove = this.battle.runEvent('LockMove', pokemon);
				if (lockedMove === true) lockedMove = false;
				if (!lockedMove) {
					if (!zMove && !pokemon.deductPP(baseMove, null, target) && (move.id !== 'struggle')) {
						this.battle.add('cant', pokemon, 'nopp', move);
						this.battle.clearActiveMove(true);
						pokemon.moveThisTurnResult = false;
						return;
					}
				} else {
					sourceEffect = this.dex.conditions.get('lockedmove');
				}
				pokemon.moveUsed(move, targetLoc);
			}

			// Dancer Petal Dance hack
			// TODO: implement properly
			const noLock = externalMove && !pokemon.volatiles['lockedmove'];

			if (zMove) {
				if (pokemon.illusion) {
					this.battle.singleEvent('End', this.dex.abilities.get('Illusion'), pokemon.abilityState, pokemon);
				}
				this.battle.add('-zpower', pokemon);
				pokemon.soultimateCharge = 0;
			}

			const oldActiveMove = move;

			const moveDidSomething = this.useMove(baseMove, pokemon, target, sourceEffect, undefined, maxMove);
			this.battle.lastSuccessfulMoveThisTurn = moveDidSomething ? this.battle.activeMove && this.battle.activeMove.id : null;
			if (this.battle.activeMove) move = this.battle.activeMove;
			this.battle.singleEvent('AfterMove', move, null, pokemon, target, move);
			this.battle.runEvent('AfterMove', pokemon, target, move);
			if (move.flags['cantusetwice'] && pokemon.removeVolatile(move.id)) {
				this.battle.add('-hint', `Some effects can force a Pokemon to use ${move.name} again in a row.`);
			}

			// Dancer's activation order is completely different from any other event, so it's handled separately
			if (move.flags['dance'] && moveDidSomething && !move.isExternal) {
				const dancers = [];
				for (const currentPoke of this.battle.getAllActive()) {
					if (pokemon === currentPoke) continue;
					if (currentPoke.hasAbility('dancer') && !currentPoke.isSemiInvulnerable()) {
						dancers.push(currentPoke);
					}
				}
				// Dancer activates in order of lowest speed stat to highest
				// Note that the speed stat used is after any volatile replacements like Speed Swap,
				// but before any multipliers like Agility or Choice Scarf
				// Ties go to whichever Pokemon has had the ability for the least amount of time
				dancers.sort(
					(a, b) => -(b.storedStats['spe'] - a.storedStats['spe']) || b.abilityOrder - a.abilityOrder
				);
				const targetOf1stDance = this.battle.activeTarget!;
				for (const dancer of dancers) {
					if (this.battle.faintMessages()) break;
					if (dancer.fainted) continue;
					this.battle.add('-activate', dancer, 'ability: Dancer');
					const dancersTarget = !targetOf1stDance.isAlly(dancer) && pokemon.isAlly(dancer) ?
						targetOf1stDance :
						pokemon;
					const dancersTargetLoc = dancer.getLocOf(dancersTarget);
					this.runMove(move.id, dancer, dancersTargetLoc, this.dex.abilities.get('dancer'), undefined, true);
				}
			}
			if (noLock && pokemon.volatiles['lockedmove']) delete pokemon.volatiles['lockedmove'];
			this.battle.faintMessages();
			this.battle.checkWin();

			if (this.battle.gen <= 4) {
				// In gen 4, the outermost move is considered the last move for Copycat
				this.battle.activeMove = oldActiveMove;
			}
		},
		// Run `AfterHit` events even if the source fainted
		spreadMoveHit(targets, pokemon, moveOrMoveName, hitEffect?, isSecondary?, isSelf?) {
			// Hardcoded for single-target purposes
			// (no spread moves have any kind of onTryHit handler)
			const target = targets[0];
			let damage: (number | boolean | undefined)[] = [];
			for (const i of targets.keys()) {
				damage[i] = true;
			}
			const move = this.dex.getActiveMove(moveOrMoveName);
			let hitResult: boolean | number | null = true;
			let moveData = hitEffect!;
			if (!moveData) moveData = move;
			if (!moveData.flags) moveData.flags = {};
			if (move.target === 'all' && !isSelf) {
				hitResult = this.battle.singleEvent('TryHitField', moveData, {}, target || null, pokemon, move);
			} else if ((move.target === 'foeSide' || move.target === 'allySide' || move.target === 'allyTeam') && !isSelf) {
				hitResult = this.battle.singleEvent('TryHitSide', moveData, {}, target || null, pokemon, move);
			} else if (target) {
				hitResult = this.battle.singleEvent('TryHit', moveData, {}, target, pokemon, move);
			}
			if (!hitResult) {
				if (hitResult === false) {
					this.battle.add('-fail', pokemon);
					this.battle.attrLastMove('[still]');
				}
				return [[false], targets]; // single-target only
			}

			// 0. check for substitute
			if (!isSecondary && !isSelf) {
				if (move.target !== 'all' && move.target !== 'allyTeam' && move.target !== 'allySide' && move.target !== 'foeSide') {
					damage = this.tryPrimaryHitEvent(damage, targets, pokemon, move, moveData, isSecondary);
				}
			}

			for (const i of targets.keys()) {
				if (damage[i] === this.battle.HIT_SUBSTITUTE) {
					damage[i] = true;
					targets[i] = null;
				}
				if (targets[i] && isSecondary && !moveData.self) {
					damage[i] = true;
				}
				if (!damage[i]) targets[i] = false;
			}
			// 1. call to this.battle.getDamage
			damage = this.getSpreadDamage(damage, targets, pokemon, move, moveData, isSecondary, isSelf);

			for (const i of targets.keys()) {
				if (damage[i] === false) targets[i] = false;
			}

			// 2. call to this.battle.spreadDamage
			damage = this.battle.spreadDamage(damage, targets, pokemon, move);

			for (const i of targets.keys()) {
				if (damage[i] === false) targets[i] = false;
			}

			// 3. onHit event happens here
			damage = this.runMoveEffects(damage, targets, pokemon, move, moveData, isSecondary, isSelf);

			for (const i of targets.keys()) {
				if (!damage[i] && damage[i] !== 0) targets[i] = false;
			}

			// steps 4 and 5 can mess with this.battle.activeTarget, which needs to be preserved for Dancer
			const activeTarget = this.battle.activeTarget;

			// 4. self drops (start checking for targets[i] === false here)
			if (moveData.self && !move.selfDropped) this.selfDrops(targets, pokemon, move, moveData, isSecondary);

			// 5. secondary effects
			if (moveData.secondaries) this.secondaries(targets, pokemon, move, moveData, isSelf);

			this.battle.activeTarget = activeTarget;

			// 6. force switch
			if (moveData.forceSwitch) damage = this.forceSwitch(damage, targets, pokemon, move);

			for (const i of targets.keys()) {
				if (!damage[i] && damage[i] !== 0) targets[i] = false;
			}

			const damagedTargets: Pokemon[] = [];
			const damagedDamage = [];
			for (const [i, t] of targets.entries()) {
				if (typeof damage[i] === 'number' && t) {
					damagedTargets.push(t);
					damagedDamage.push(damage[i]);
				}
			}
			const pokemonOriginalHP = pokemon.hp;
			if (damagedDamage.length && !isSecondary && !isSelf) {
				if (this.battle.gen >= 5) {
					this.battle.runEvent('DamagingHit', damagedTargets, pokemon, move, damagedDamage);
				}
				if (moveData.onAfterHit) {
					for (const t of damagedTargets) {
						this.battle.singleEvent('AfterHit', moveData, {}, t, pokemon, move);
					}
				}
				if (this.battle.gen < 5) {
					this.battle.runEvent('DamagingHit', damagedTargets, pokemon, move, damagedDamage);
				}
				if (pokemon.hp && pokemon.hp <= pokemon.maxhp / 2 && pokemonOriginalHP > pokemon.maxhp / 2) {
					this.battle.runEvent('EmergencyExit', pokemon);
				}
			}

			return [damage, targets];
		},
		// Soultimates replace the first moveslot
		getZMove(move, pokemon, skipChecks) {
			if (pokemon.soultimateMove) return pokemon.soultimateMove;
			return null;
		},
		// Parental Bond shouldn't announce hit count if it only hits once
		hitStepMoveHitLoop(targets: Pokemon[], pokemon: Pokemon, move: ActiveMove) { // Temporary name
			let damage: (number | boolean | undefined)[] = [];
			for (const i of targets.keys()) {
				damage[i] = 0;
			}
			move.totalDamage = 0;
			pokemon.lastDamage = 0;
			let targetHits = move.multihit || 1;
			if (Array.isArray(targetHits)) {
				// yes, it's hardcoded... meh
				if (targetHits[0] === 2 && targetHits[1] === 5) {
					if (this.battle.gen >= 5) {
						// 35-35-15-15 out of 100 for 2-3-4-5 hits
						targetHits = this.battle.sample([2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5]);
						if (targetHits < 4 && pokemon.hasItem('loadeddice')) {
							targetHits = 5 - this.battle.random(2);
						}
					} else {
						targetHits = this.battle.sample([2, 2, 2, 3, 3, 3, 4, 5]);
					}
				} else {
					targetHits = this.battle.random(targetHits[0], targetHits[1] + 1);
				}
			}
			if (targetHits === 10 && pokemon.hasItem('loadeddice')) targetHits -= this.battle.random(7);
			targetHits = Math.floor(targetHits);
			let nullDamage = true;
			let moveDamage: (number | boolean | undefined)[] = [];
			// There is no need to recursively check the ´sleepUsable´ flag as Sleep Talk can only be used while asleep.
			const isSleepUsable = move.sleepUsable || this.dex.moves.get(move.sourceEffect).sleepUsable;

			let targetsCopy: (Pokemon | false | null)[] = targets.slice(0);
			let hit: number;
			for (hit = 1; hit <= targetHits; hit++) {
				if (damage.includes(false)) break;
				if (hit > 1 && pokemon.status === 'slp' && (!isSleepUsable || this.battle.gen === 4)) break;
				if (targets.every(target => !target?.hp)) break;
				move.hit = hit;
				move.lastHit = move.hit === targetHits;
				if (move.smartTarget && targets.length > 1) {
					targetsCopy = [targets[hit - 1]];
					damage = [damage[hit - 1]];
				} else {
					targetsCopy = targets.slice(0);
				}
				const target = targetsCopy[0]; // some relevant-to-single-target-moves-only things are hardcoded
				if (target && typeof move.smartTarget === 'boolean') {
					if (hit > 1) {
						this.battle.addMove('-anim', pokemon, move.name, target);
					} else {
						this.battle.retargetLastMove(target);
					}
				}

				// like this (Triple Kick)
				if (target && move.multiaccuracy && hit > 1) {
					let accuracy = move.accuracy;
					const boostTable = [1, 4 / 3, 5 / 3, 2, 7 / 3, 8 / 3, 3];
					if (accuracy !== true) {
						if (!move.ignoreAccuracy) {
							const boosts = this.battle.runEvent('ModifyBoost', pokemon, null, null, { ...pokemon.boosts });
							const boost = this.battle.clampIntRange(boosts['accuracy'], -6, 6);
							if (boost > 0) {
								accuracy *= boostTable[boost];
							} else {
								accuracy /= boostTable[-boost];
							}
						}
						if (!move.ignoreEvasion) {
							const boosts = this.battle.runEvent('ModifyBoost', target, null, null, { ...target.boosts });
							const boost = this.battle.clampIntRange(boosts['evasion'], -6, 6);
							if (boost > 0) {
								accuracy /= boostTable[boost];
							} else if (boost < 0) {
								accuracy *= boostTable[-boost];
							}
						}
					}
					accuracy = this.battle.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
					if (!move.alwaysHit) {
						accuracy = this.battle.runEvent('Accuracy', target, pokemon, move, accuracy);
						if (accuracy !== true && !this.battle.randomChance(accuracy, 100)) break;
					}
				}

				const moveData = move;
				if (!moveData.flags) moveData.flags = {};

				let moveDamageThisHit;
				// Modifies targetsCopy (which is why it's a copy)
				[moveDamageThisHit, targetsCopy] = this.spreadMoveHit(targetsCopy, pokemon, move, moveData);
				// When Dragon Darts targets two different pokemon, targetsCopy is a length 1 array each hit
				// so spreadMoveHit returns a length 1 damage array
				if (move.smartTarget) {
					moveDamage.push(...moveDamageThisHit);
				} else {
					moveDamage = moveDamageThisHit;
				}

				if (!moveDamage.some(val => val !== false)) break;
				nullDamage = false;

				for (const [i, md] of moveDamage.entries()) {
					if (move.smartTarget && i !== hit - 1) continue;
					// Damage from each hit is individually counted for the
					// purposes of Counter, Metal Burst, and Mirror Coat.
					damage[i] = md === true || !md ? 0 : md;
					// Total damage dealt is accumulated for the purposes of recoil (Parental Bond).
					move.totalDamage += damage[i];
				}
				if (move.mindBlownRecoil) {
					const hpBeforeRecoil = pokemon.hp;
					this.battle.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.conditions.get(move.id), true);
					move.mindBlownRecoil = false;
					if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
						this.battle.runEvent('EmergencyExit', pokemon, pokemon);
					}
				}
				this.battle.eachEvent('Update');
				if (!pokemon.hp && targets.length === 1) {
					hit++; // report the correct number of hits for multihit moves
					break;
				}
			}
			// hit is 1 higher than the actual hit count
			if (hit === 1) return damage.fill(false);
			if (nullDamage) damage.fill(false);
			this.battle.faintMessages(false, false, !pokemon.hp);
			if (move.multihit && typeof move.smartTarget !== 'boolean' &&
				!(move.hit === 1 && move.multihitType === 'parentalbond')) {
				this.battle.add('-hitcount', targets[0], hit - 1);
			}

			if ((move.recoil || move.id === 'chloroblast') && move.totalDamage) {
				const hpBeforeRecoil = pokemon.hp;
				this.battle.damage(this.calcRecoilDamage(move.totalDamage, move, pokemon), pokemon, pokemon, 'recoil');
				if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
					this.battle.runEvent('EmergencyExit', pokemon, pokemon);
				}
			}

			if (move.struggleRecoil) {
				const hpBeforeRecoil = pokemon.hp;
				let recoilDamage;
				if (this.dex.gen >= 5) {
					recoilDamage = this.battle.clampIntRange(Math.round(pokemon.baseMaxhp / 4), 1);
				} else {
					recoilDamage = this.battle.clampIntRange(this.battle.trunc(pokemon.maxhp / 4), 1);
				}
				this.battle.directDamage(recoilDamage, pokemon, pokemon, { id: 'strugglerecoil' } as Condition);
				if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
					this.battle.runEvent('EmergencyExit', pokemon, pokemon);
				}
			}

			// smartTarget messes up targetsCopy, but smartTarget should in theory ensure that targets will never fail, anyway
			if (move.smartTarget) {
				targetsCopy = targets.slice(0);
			}

			for (const [i, target] of targetsCopy.entries()) {
				if (target && pokemon !== target) {
					target.gotAttacked(move, moveDamage[i] as number | false | undefined, pokemon);
					if (typeof moveDamage[i] === 'number') {
						target.timesAttacked += move.smartTarget ? 1 : hit - 1;
					}
				}
			}

			if (move.ohko && !targets[0].hp) this.battle.add('-ohko');

			if (!damage.some(val => !!val || val === 0)) return damage;

			this.battle.eachEvent('Update');

			this.afterMoveSecondaryEvent(targetsCopy.filter(val => !!val), pokemon, move);

			if (!(move.hasSheerForce && pokemon.hasAbility('sheerforce'))) {
				for (const [i, d] of damage.entries()) {
					// There are no multihit spread moves, so it's safe to use move.totalDamage for multihit moves
					// The previous check was for `move.multihit`, but that fails for Dragon Darts
					const curDamage = targets.length === 1 ? move.totalDamage : d;
					if (typeof curDamage === 'number' && targets[i].hp) {
						const targetHPBeforeDamage = (targets[i].hurtThisTurn || 0) + curDamage;
						if (targets[i].hp <= targets[i].maxhp / 2 && targetHPBeforeDamage > targets[i].maxhp / 2) {
							this.battle.runEvent('EmergencyExit', targets[i], pokemon);
						}
					}
				}
			}

			return damage;
		},
		hitStepAccuracy(targets: Pokemon[], pokemon: Pokemon, move: ActiveMove) {
		const hitResults = [];
		for (const [i, target] of targets.entries()) {
			this.battle.activeTarget = target;
			// calculate true accuracy
			let accuracy = move.accuracy;
			if (move.ohko) { // bypasses accuracy modifiers
				if (!target.isSemiInvulnerable()) {
					accuracy = 30;
					if (move.ohko === 'Ice' && this.battle.gen >= 7 && !pokemon.hasType('Ice')) {
						accuracy = 20;
					}
					if (!target.volatiles['dynamax'] && pokemon.level >= target.level &&
						(move.ohko === true || !target.hasType(move.ohko))) {
						accuracy += (pokemon.level - target.level);
					} else {
						this.battle.add('-immune', target, '[ohko]');
						hitResults[i] = false;
						continue;
					}
				}
			} else {
				accuracy = this.battle.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
				if (accuracy !== true) {
					let boost = 0;
					if (!move.ignoreAccuracy) {
						const boosts = this.battle.runEvent('ModifyBoost', pokemon, null, null, {...pokemon.boosts});
						boost = this.battle.clampIntRange(boosts['accuracy'], -6, 6);
					}
					if (!move.ignoreEvasion) {
						const boosts = this.battle.runEvent('ModifyBoost', target, null, null, {...target.boosts});
						boost = this.battle.clampIntRange(boost - boosts['evasion'], -6, 6);
					}
					if (boost > 0) {
						accuracy = this.battle.trunc(accuracy * (3 + boost) / 3);
					} else if (boost < 0) {
						accuracy = this.battle.trunc(accuracy * 3 / (3 - boost));
					}
				}
			}
			if (move.alwaysHit || (move.id === 'toxic' && this.battle.gen >= 8 && pokemon.hasType('Poison')) ||
					(move.target === 'self' && move.category === 'Status' && !target.isSemiInvulnerable())) {
				accuracy = true; // bypasses ohko accuracy modifiers
			} else {
				accuracy = this.battle.runEvent('Accuracy', target, pokemon, move, accuracy);
			}
			if (accuracy !== true && !this.battle.randomChance(accuracy, 100)) {
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					if (!move.spreadHit) this.battle.attrLastMove('[miss]');
					this.battle.add('-miss', pokemon, target);
					if (!move.flags['inspirit']) {
						target.dodgedThisTurn = true;
					}
				}
				if (!move.ohko && pokemon.hasItem('blunderpolicy') && pokemon.useItem()) {
					this.battle.boost({spe: 2}, pokemon);
				}
				hitResults[i] = false;
				continue;
			}
			hitResults[i] = true;
		}
		return hitResults;
	}
	},
};