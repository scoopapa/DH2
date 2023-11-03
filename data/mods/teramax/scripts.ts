export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	teambuilderConfig: {
		excludeStandardTiers: true,
		customTiers: ["TMFE", "TMNFE", "TMLC"],
	},
	init() {
		this.modData("Learnsets", "darmanitangalar").learnset.terablast = ["9L1"];
		this.modData("Learnsets", "darmanitangalar").learnset.icespinner = ["9L1"];
		this.modData("Learnsets", "darmanitangalar").learnset.iceshard = ["9L1"];
		this.modData("Learnsets", "darmanitangalar").learnset.lavaplume = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.bugbuzz = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.uturn = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.skittersmack = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.quiverdance = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.firstimpression = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.ragepowder = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.gigadrain = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.leechlife = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.bugbite = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.strugglebug = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.willowisp = ["9L1"];
		this.modData("Learnsets", "fluttermane").learnset.morningsun = ["9L1"];
		delete this.modData('Learnsets', 'fluttermane').learnset.moonblast;
		delete this.modData('Learnsets', 'fluttermane').learnset.mysticalfire;
		delete this.modData('Learnsets', 'fluttermane').learnset.dazzlinggleam;
		delete this.modData('Learnsets', 'fluttermane').learnset.drainingkiss;
		delete this.modData('Learnsets', 'fluttermane').learnset.charm;
		delete this.modData('Learnsets', 'fluttermane').learnset.mistyterrain;
		this.modData("Learnsets", "palafin").learnset.superpower = ["9L1"];
		delete this.modData('Learnsets', 'palafin').learnset.bulkup;
		delete this.modData('Learnsets', 'palafin').learnset.closecombat;
		this.modData("Learnsets", "ironbundle").learnset.surf = ["9L1"];
		this.modData("Learnsets", "ironbundle").learnset.defog = ["9L1"];
		this.modData("Learnsets", "ironbundle").learnset.haze = ["9L1"];
		this.modData("Learnsets", "ironbundle").learnset.destinybond = ["9L1"];
		this.modData("Learnsets", "ironbundle").learnset.fakeout = ["9L1"];
		delete this.modData('Learnsets', 'ironbundle').learnset.freezedry;
		delete this.modData('Learnsets', 'ironbundle').learnset.hydropump;
		this.modData("Learnsets", "dracovish").learnset.icespinner = ["9L1"];
		this.modData("Learnsets", "dracovish").learnset.terablast = ["9L1"];
		this.modData("Learnsets", "annihilape").learnset.knockoff = ["9L1"];
		this.modData("Learnsets", "annihilape").learnset.strengthsap = ["9L1"];
		delete this.modData('Learnsets', 'annihilape').learnset.bulkup;
		delete this.modData('Learnsets', 'primeape').learnset.bulkup;
		delete this.modData('Learnsets', 'mankey').learnset.bulkup;    
	},
	actions: {
		inherit: true,
		canTerastallize(pokemon: Pokemon) {
			if (pokemon.getItem().zMove || pokemon.canMegaEvo || this.dex.gen !== 9 || pokemon.hasItem('wishingstone')) {
				return null;
			}
			return pokemon.teraType;
		},
	  	modifyDamage(baseDamage: number, pokemon: Pokemon, target: Pokemon, move: ActiveMove, suppressMessages = false) {
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
	  		if (move.forceSTAB || (type !== '???' &&
	  			(pokemon.hasType(type)))) {
	  			// The "???" type never gets STAB
	  			// Not even if you Roost in Gen 4 and somehow manage to use
	  			// Struggle in the same turn.
	  			// (On second thought, it might be easier to get a MissingNo.)
	  			let stab = move.stab || 1.5;
	  			if (type === pokemon.terastallized && pokemon.getTypes(false, true).includes(type)) {
	  				// In my defense, the game hardcodes the Adaptability check like this, too.
	  				stab = stab === 1.75 ? 2.25 : 1.75;
	  			} else if (pokemon.terastallized && type !== pokemon.terastallized) {
	  				stab = 1.25;
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
		},
		getActiveMaxMove(move: Move, pokemon: Pokemon) {
			if (typeof move === 'string') move = this.dex.getActiveMove(move);
			if (move.name === 'Struggle') return this.dex.getActiveMove(move);
			let maxMove = this.dex.getActiveMove(this.MAX_MOVES[move.category === 'Status' ? move.category : move.type]);
			if (move.category !== 'Status') {
				if (pokemon.gigantamax && pokemon.canGigantamax) {
					const gMaxMove = this.dex.getActiveMove(pokemon.canGigantamax);
					if (gMaxMove.exists && gMaxMove.type === move.type) maxMove = gMaxMove;
				}
				if (!move.maxMove?.basePower) throw new Error(`${move.name} doesn't have a maxMove basePower`);
				if (!['gmaxdrumsolo', 'gmaxfireball', 'gmaxhydrosnipe', 'maxguard',
					  'gmaxbefuddle', 'gmaxcannonade', 'gmaxcentiferno', 'gmaxchistrike',
					  'gmaxcuddle', 'gmaxdepletion', 'gmaxfinale', 'gmaxfoamburst',
					  'gmaxgoldrush', 'gmaxgravitas', 'gmaxmalodor', 'gmaxmeltdown',
					  'gmaxoneblow', 'gmaxrapidflow', 'gmaxreplenish', 'gmaxresonance',
					  'gmaxsandblast', 'gmaxsmite', 'gmaxsnooze', 'gmaxsteelsurge',
					  'gmaxterror', 'gmaxvinelash', 'gmaxvolcalith', 'gmaxvoltcrash', 'gmaxwildfire', 'gmaxwindrage',
					  'gmaxstonesurge', 'gmaxstunshock', 'gmaxsweetness', 'gmaxtartness'].includes(maxMove.id)) {
					maxMove.basePower = move.maxMove.basePower;
				}
				maxMove.category = move.category;
			}
			let maxNewPower = this.newMaxPower(move); // new max power
			maxMove.basePower = maxNewPower; // bypass old max power
			maxMove.baseMove = move.id;
			// copy the priority for Psychic Terrain, Quick Guard
			maxMove.priority = move.priority;
			maxMove.isZOrMaxPowered = true;
			return maxMove;
		},
		newMaxPower(move){
			let oldMaxPowers = [90, 100, 110, 120, 130, 140, 150];
			let oldweakMaxPowers = [70, 75, 80, 85, 90, 95, 100];
			let weakMaxPowers = [60, 65, 70, 75, 80, 85, 90];
			let maxPowers = [70, 80, 90, 100, 110, 120, 130];
			let maxNewPower = 110;
			if (!move.basePower) {
				return maxNewPower;
			} else if (!move.maxMove?.basePower){
				return null;
			} else if (['Fighting', 'Poison'].includes(move.type)) {
				for (const i in oldweakMaxPowers){
					if (move.maxMove?.basePower === oldweakMaxPowers[i]){
						maxNewPower = weakMaxPowers[i]
						break
					}
				}
			} else if (['Flying'].includes(move.type)) {
				for (const i in oldMaxPowers){
					if (move.maxMove?.basePower === oldMaxPowers[i]){
						maxNewPower = weakMaxPowers[i]
						break
					}
				}
			} else {
				for (const i in oldMaxPowers){
					if (move.maxMove?.basePower === oldMaxPowers[i]){
						maxNewPower = maxPowers[i]
						break
					}
				}
			}
			return maxNewPower;
		},
	},
	side: {
		inherit: true,
		constructor(name: string, battle: Battle, sideNum: number, team: PokemonSet[]) {
			const sideScripts = battle.dex.data.Scripts.side;
			if (sideScripts) Object.assign(this, sideScripts);
	
			this.battle = battle;
			this.id = ['p1', 'p2', 'p3', 'p4'][sideNum] as SideID;
			this.n = sideNum;
	
			this.name = name;
			this.avatar = '';
	
			this.team = team;
			this.pokemon = [];
			for (let i = 0; i < this.team.length && i < 24; i++) {
				// console.log("NEW POKEMON: " + (this.team[i] ? this.team[i].name : '[unidentified]'));
				this.pokemon.push(new Pokemon(this.team[i], this));
				this.pokemon[i].position = i;
			}
	
			switch (this.battle.gameType) {
			case 'doubles':
				this.active = [null!, null!];
				break;
			case 'triples': case 'rotation':
				this.active = [null!, null!, null!];
				break;
			default:
				this.active = [null!];
			}
	
			this.pokemonLeft = this.pokemon.length;
			this.faintedLastTurn = null;
			this.faintedThisTurn = null;
			this.totalFainted = 0;
			this.zMoveUsed = false;
			this.dynamaxUsed = this.battle.gen !== 9;
	
			this.sideConditions = {};
			this.slotConditions = [];
			// Array#fill doesn't work for this
			for (let i = 0; i < this.active.length; i++) this.slotConditions[i] = {};
	
			this.activeRequest = null;
			this.choice = {
				cantUndo: false,
				error: ``,
				actions: [],
				forcedSwitchesLeft: 0,
				forcedPassesLeft: 0,
				switchIns: new Set(),
				zMove: false,
				mega: false,
				ultra: false,
				terastallize: false,
				dynamax: false,
			};
	
			// old-gens
			this.lastMove = null;
		},
		canDynamaxNow(): boolean {
			if (this.battle.gen !== 9) return false;
			// In multi battles, players on a team are alternatingly given the option to dynamax each turn
			// On turn 1, the players on their team's respective left have the first chance (p1 and p2)
			if (this.battle.gameType === 'multi' && this.battle.turn % 2 !== [1, 1, 0, 0][this.n]) return false;
			// if (this.battle.gameType === 'multitriples' && this.battle.turn % 3 !== [1, 1, 2, 2, 0, 0][this.side.n]) {
			//		return false;
			// }
			return !this.dynamaxUsed;
		},
		chooseMove(
			moveText?: string | number,
			targetLoc = 0,
			event: 'mega' | 'zmove' | 'ultra' | 'dynamax' | 'terastallize' | '' = ''
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
				moveid = toID(moveText);
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
					for (const [i, moveRequest] of request.canZMove.entries()) {
						if (!moveRequest) continue;
						if (moveid === toID(moveRequest.move)) {
							moveid = request.moves[i].id;
							targetType = moveRequest.target;
							event = 'zmove';
							break;
						}
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
				return this.emitChoiceError(`Can't move: You can't Z-move more than once per battle`);
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
				const lockedMoveID = toID(lockedMove);
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
			if (mega && !pokemon.canMegaEvo) {
				return this.emitChoiceError(`Can't move: ${pokemon.name} can't mega evolve`);
			}
			if (mega && this.choice.mega) {
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
					if (this.battle.gen !== 9) {
						return this.emitChoiceError(`Can't move: Dynamaxing doesn't exist outside of Gen 9.`);
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
				zmove: zMove,
				maxMove: maxMove ? maxMove.id : undefined,
				terastallize: terastallize ? pokemon.teraType : undefined,
			});
	
			if (pokemon.maybeDisabled) {
				this.choice.cantUndo = this.choice.cantUndo || pokemon.isLastActive();
			}
	
			if (mega) this.choice.mega = true;
			if (ultra) this.choice.ultra = true;
			if (zMove) this.choice.zMove = true;
			if (dynamax) this.choice.dynamax = true;
			if (terastallize) this.choice.terastallize = true;
	
			return true;
		},
	},
	pokemon: {
	inherit: true,
		getDynamaxRequest(skipChecks?: boolean) {
			// {gigantamax?: string, maxMoves: {[k: string]: string} | null}[]
			if (!skipChecks) {
				if (!this.side.canDynamaxNow()) return;
				if (
					this.species.isMega || this.species.isPrimal || this.species.forme === "Ultra" || this.canMegaEvo
				) {
					return;
				}
				// Some pokemon species are unable to dynamax
				if (this.species.cannotDynamax || this.illusion?.species.cannotDynamax) return;
			}
			const result: DynamaxOptions = {maxMoves: []};
			let atLeastOne = false;
			for (const moveSlot of this.moveSlots) {
				const move = this.battle.dex.moves.get(moveSlot.id);
				const maxMove = this.battle.actions.getMaxMove(move, this);
				if (maxMove) {
					if (this.maxMoveDisabled(move)) {
						result.maxMoves.push({move: maxMove.id, target: maxMove.target, disabled: true});
					} else {
						result.maxMoves.push({move: maxMove.id, target: maxMove.target});
						atLeastOne = true;
					}
				}
			}
			if (!atLeastOne) return;
			if (this.canGigantamax) result.gigantamax = this.canGigantamax;
			return result;
		},		
	},
};
