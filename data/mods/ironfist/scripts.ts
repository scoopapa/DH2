export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['IF'],
	},	
	
	init() {
		
	},
	battle: {
		runAction(action: Action) {
			const pokemonOriginalHP = action.pokemon?.hp;
			let residualPokemon: (readonly [Pokemon, number])[] = [];
			console.log(action);
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
				action.pokemon.addVolatile('bigbutton');
				action.pokemon.side.dynamaxUsed = false;
				if (action.pokemon.side.allySide) action.pokemon.side.allySide.dynamaxUsed = false;
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
				action.pokemon.side.removeSlotCondition(action.pokemon, 'revivalblessing');
				break;
			case 'epicbeam':
				console.log("runaction: " + action.target.position + " " + action.pokemon.side.active.length);
				action.pokemon.side.pokemonLeft--;
				if (action.target.position < action.pokemon.side.active.length) {
					this.queue.addChoice({
						choice: 'instaswitch',
						pokemon: action.target,
						target: action.target,
					});
				}
				action.target.fainted = true;
				this.add('-faint', action.target, '[from] move: Epic Beam');
				action.pokemon.side.removeSlotCondition(action.pokemon, 'epicbeam');
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
	queue: {
		resolveAction(action: ActionChoice, midTurn = false): Action[] {
		if (!action) throw new Error(`Action not passed to resolveAction`);
		if (action.choice === 'pass') return [];
		const actions = [action];

		if (!action.side && action.pokemon) action.side = action.pokemon.side;
		if (!action.move && action.moveid) action.move = this.battle.dex.getActiveMove(action.moveid);
		if (!action.order) {
			const orders: {[choice: string]: number} = {
				team: 1,
				start: 2,
				instaswitch: 3,
				beforeTurn: 4,
				beforeTurnMove: 5,
				revivalblessing: 6,
				epicbeam: 6,

				runUnnerve: 100,
				runSwitch: 101,
				runPrimal: 102,
				switch: 103,
				megaEvo: 104,
				megaEvoX: 104,
				megaEvoY: 104,
				runDynamax: 105,
				terastallize: 106,
				priorityChargeMove: 107,

				shift: 200,
				// default is 200 (for moves)

				residual: 300,
			};
			if (action.choice in orders) {
				action.order = orders[action.choice];
			} else {
				action.order = 200;
				if (!['move', 'event'].includes(action.choice)) {
					throw new Error(`Unexpected orderless action ${action.choice}`);
				}
			}
		}
		if (!midTurn) {
			if (action.choice === 'move') {
				if (!action.maxMove && !action.zmove && action.move.beforeTurnCallback) {
					actions.unshift(...this.resolveAction({
						choice: 'beforeTurnMove', pokemon: action.pokemon, move: action.move, targetLoc: action.targetLoc,
					}));
				}
				if (action.mega && !action.pokemon.isSkyDropped()) {
					actions.unshift(...this.resolveAction({
						choice: 'megaEvo',
						pokemon: action.pokemon,
					}));
				}
				if (action.megax && !action.pokemon.isSkyDropped()) {
					actions.unshift(...this.resolveAction({
						choice: 'megaEvoX',
						pokemon: action.pokemon,
					}));
				}
				if (action.megay && !action.pokemon.isSkyDropped()) {
					actions.unshift(...this.resolveAction({
						choice: 'megaEvoY',
						pokemon: action.pokemon,
					}));
				}
				if (action.terastallize && !action.pokemon.terastallized) {
					actions.unshift(...this.resolveAction({
						choice: 'terastallize',
						pokemon: action.pokemon,
					}));
				}
				if (action.maxMove && !action.pokemon.volatiles['dynamax']) {
					actions.unshift(...this.resolveAction({
						choice: 'runDynamax',
						pokemon: action.pokemon,
					}));
				}
				if (!action.maxMove && !action.zmove && action.move.priorityChargeCallback) {
					actions.unshift(...this.resolveAction({
						choice: 'priorityChargeMove',
						pokemon: action.pokemon,
						move: action.move,
					}));
				}
				action.fractionalPriority = this.battle.runEvent('FractionalPriority', action.pokemon, null, action.move, 0);
			} else if (['switch', 'instaswitch'].includes(action.choice)) {
				if (typeof action.pokemon.switchFlag === 'string') {
					action.sourceEffect = this.battle.dex.moves.get(action.pokemon.switchFlag as ID) as any;
				}
				action.pokemon.switchFlag = false;
			}
		}

		const deferPriority = this.battle.gen === 7 && action.mega && action.mega !== 'done';
		if (action.move) {
			let target = null;
			action.move = this.battle.dex.getActiveMove(action.move);

			if (!action.targetLoc) {
				target = this.battle.getRandomTarget(action.pokemon, action.move);
				// TODO: what actually happens here?
				if (target) action.targetLoc = action.pokemon.getLocOf(target);
			}
			action.originalTarget = action.pokemon.getAtLoc(action.targetLoc);
		}
		if (!deferPriority) this.battle.getActionSpeed(action);
		return actions as any;
	}
	},
	actions: {
		canTerastallize(pokemon: Pokemon) {
			if (pokemon.getItem().zMove || pokemon.canMegaEvo || this.dex.gen !== 9) {
				return null;
			}
			return pokemon.teraType;
		},

		terastallize(pokemon: Pokemon) {
			if (pokemon.illusion && ['Ogerpon', 'Terapagos'].includes(pokemon.illusion.species.baseSpecies)) {
				this.battle.singleEvent('End', this.dex.abilities.get('Illusion'), pokemon.abilityState, pokemon);
			}

			let type = pokemon.teraType;
			let canTera = false;
			if (pokemon.set.ability === 'I Love Fishing') {
				canTera = true;
				type = 'Water';
			}
			if (type === 'Bug' || canTera) {
				this.battle.add('-terastallize', pokemon, type);
				pokemon.terastallized = type;
				for (const ally of pokemon.side.pokemon) {
					if (ally.teraType === 'Bug') ally.canTerastallize = null;
				}
				pokemon.addedType = '';
				pokemon.knownType = true;
				pokemon.apparentType = type;
				if (pokemon.species.baseSpecies === 'Ogerpon') {
					const tera = pokemon.species.id === 'ogerpon' ? 'tealtera' : 'tera';
					pokemon.formeChange(pokemon.species.id + tera, null, true);
				}
				if (pokemon.species.name === 'Terapagos-Terastal' && type === 'Stellar') {
					pokemon.formeChange('Terapagos-Stellar', null, true);
					pokemon.baseMaxhp = Math.floor(Math.floor(
						2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
					) * pokemon.level / 100 + 10);
					const newMaxHP = pokemon.baseMaxhp;
					pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
					pokemon.maxhp = newMaxHP;
					this.battle.add('-heal', pokemon, pokemon.getHealth, '[silent]');
				}
				this.battle.runEvent('AfterTerastallization', pokemon);
			} else {
				if(!pokemon.volatiles['bigbutton']) pokemon.addVolatile('bigbutton');
			}
		},
	
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
			} else if (move.multihitType === 'bestfriends') {
				// Best Friends modifier
				this.battle.debug("Best Friends modifier: 0.49");
				baseDamage = this.battle.modify(baseDamage, 0.49);
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
		},
		
		getZMove(move: Move, pokemon: Pokemon, skipChecks?: boolean): string | undefined {
			const Z_MOVES: {readonly [k: string]: string} = {
				Poison: "Acid Downpour",
				Fighting: "All-Out Pummeling",
				Dark: "Black Hole Eclipse",
				Grass: "Bloom Doom",
				Normal: "Breakneck Blitz",
				Rock: "Continental Crush",
				Steel: "Corkscrew Crash",
				Dragon: "Devastating Drake",
				Electric: "Gigavolt Havoc",
				Water: "Hydro Vortex",
				Fire: "Inferno Overdrive",
				Ghost: "Never-Ending Nightmare",
				Bug: "Savage Spin-Out",
				Psychic: "Shattered Psyche",
				Ice: "Subzero Slammer",
				Flying: "Supersonic Skystrike",
				Ground: "Tectonic Rage",
				Fairy: "Twinkle Tackle",
				Stellar: "Tera Triple Basedball Barrage",
			};
			const item = pokemon.getItem();
			if (!skipChecks) {
				if (pokemon.side.zMoveUsed) return;
				if (!item.zMove) return;
				if (item.itemUser && !item.itemUser.includes(pokemon.species.name)) return;
				const moveData = pokemon.getMoveData(move);
				// Draining the PP of the base move prevents the corresponding Z-move from being used.
				if (!moveData?.pp) return;
			}

			if (item.zMoveFrom) {
				if (move.name === item.zMoveFrom) return item.zMove as string;
			} else if (item.zMove === true) {
				if (move.type === item.zMoveType || item.name === 'Stellarium Z') {
					if (move.category === "Status") {
						return move.name;
					} else if (move.zMove?.basePower) {
						if (item.name === 'Stellarium Z') return "Tera Triple Basedball Barrage";
						else return Z_MOVES[move.type];
					}
				}
			}
		},
		
		getActiveZMove(move: Move, pokemon: Pokemon): ActiveMove {
			const Z_MOVES: {readonly [k: string]: string} = {
				Poison: "Acid Downpour",
				Fighting: "All-Out Pummeling",
				Dark: "Black Hole Eclipse",
				Grass: "Bloom Doom",
				Normal: "Breakneck Blitz",
				Rock: "Continental Crush",
				Steel: "Corkscrew Crash",
				Dragon: "Devastating Drake",
				Electric: "Gigavolt Havoc",
				Water: "Hydro Vortex",
				Fire: "Inferno Overdrive",
				Ghost: "Never-Ending Nightmare",
				Bug: "Savage Spin-Out",
				Psychic: "Shattered Psyche",
				Ice: "Subzero Slammer",
				Flying: "Supersonic Skystrike",
				Ground: "Tectonic Rage",
				Fairy: "Twinkle Tackle",
				Stellar: "Tera Triple Basedball Barrage",
			};
			let item;
			if (pokemon) {
				item = pokemon.getItem();
				if (move.name === item.zMoveFrom) {
					const zMove = this.dex.getActiveMove(item.zMove as string);
					zMove.isZOrMaxPowered = true;
					return zMove;
				}
			}

			if (move.category === 'Status') {
				const zMove = this.dex.getActiveMove(move);
				zMove.isZ = true;
				zMove.isZOrMaxPowered = true;
				return zMove;
			}
			let zMove = this.dex.getActiveMove(Z_MOVES[move.type]);
			if(item && item.name === 'Stellarium Z') zMove = this.dex.getActiveMove("Tera Triple Basedball Barrage");
			zMove.basePower = move.zMove!.basePower!;
			zMove.category = move.category;
			// copy the priority for Quick Guard
			zMove.priority = move.priority;
			zMove.isZOrMaxPowered = true;
			return zMove;
		},
		
		canZMove(pokemon: Pokemon) {
			if (pokemon.side.zMoveUsed ||
				(pokemon.transformed &&
					(pokemon.species.isMega || pokemon.species.isPrimal || pokemon.species.forme === "Ultra"))
			) return;
			const item = pokemon.getItem();
			if (!item.zMove) return;
			if (item.itemUser && !item.itemUser.includes(pokemon.species.name)) return;
			let atLeastOne = false;
			let mustStruggle = true;
			const zMoves: ZMoveOptions = [];
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.pp <= 0) {
					zMoves.push(null);
					continue;
				}
				if (!moveSlot.disabled) {
					mustStruggle = false;
				}
				const move = this.dex.moves.get(moveSlot.move);
				let zMoveName = this.getZMove(move, pokemon, true) || '';
				if (zMoveName) {
					const zMove = this.dex.moves.get(zMoveName);
					if (!zMove.isZ && zMove.category === 'Status') zMoveName = "Z-" + zMoveName;
					zMoves.push({move: zMoveName, target: zMove.target});
				} else {
					zMoves.push(null);
				}
				if (zMoveName) atLeastOne = true;
			}
			if (atLeastOne && !mustStruggle) return zMoves;
		},
	},
	side: {
		//inherit: true,
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
			this.dynamaxUsed = false;
	
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
			
			//fishing tokens?
			this.fishingTokens = 0;
		},
		getChoice() {
			if (this.choice.actions.length > 1 && this.choice.actions.every(action => action.choice === 'team')) {
				return `team ` + this.choice.actions.map(action => action.pokemon!.position + 1).join(', ');
			}
			return this.choice.actions.map(action => {
				switch (action.choice) {
				case 'move':
					let details = ``;
					if (action.targetLoc && this.active.length > 1) details += ` ${action.targetLoc > 0 ? '+' : ''}${action.targetLoc}`;
					if (action.mega) details += (action.pokemon!.item === 'ultranecroziumz' ? ` ultra` : ` mega`);
					if (action.zmove) details += ` zmove`;
					if (action.maxMove) details += ` dynamax`;
					if (action.terastallize) details += ` terastallize`;
					return `move ${action.moveid}${details}`;
				case 'switch':
				case 'instaswitch':
				case 'revivalblessing':
				case 'epicbeam':
					return `switch ${action.target!.position + 1}`;
				case 'team':
					return `team ${action.pokemon!.position + 1}`;
				default:
					return action.choice;
				}
			}).join(', ');
		},
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
				if (this.slotConditions[pokemon.position]['revivalblessing']) {
					slot = 0;
					while (!this.pokemon[slot].fainted) slot++;
				} else if (this.slotConditions[pokemon.position]['epicbeam']) {
					slot = 0;
					while (this.pokemon[slot].fainted) slot++;
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
			} else if (slot < this.active.length && !this.slotConditions[pokemon.position]['revivalblessing']) {
				return this.emitChoiceError(`Can't switch: You can't switch to an active Pokémon`);
			} else if (slot < this.active.length && !this.slotConditions[pokemon.position]['epicbeam']) {
				return this.emitChoiceError(`Can't switch: You can't switch to an active Pokémon`);
			} else if (this.choice.switchIns.has(slot)) {
				return this.emitChoiceError(`Can't switch: The Pokémon in slot ${slot + 1} can only switch in once`);
			}
			const targetPokemon = this.pokemon[slot];

			//console.log("pokemon: " + pokemon.baseSpecies + "\ntargetPokemon: " + targetPokemon.baseSpecies + "\nindex: " + index + "\nslot: " + slot + "\npokemon.position: " + pokemon.position);
			if (this.slotConditions[pokemon.position]['revivalblessing']) {
				if (!targetPokemon.fainted) {
					return this.emitChoiceError(`Can't switch: You have to pass to a fainted Pokémon`);
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
			
			if (this.slotConditions[pokemon.position]['epicbeam']) {
				if (targetPokemon.fainted) {
					return this.emitChoiceError(`Can't switch: You have to sacrifice an unfainted Pokémon`);
				}
				// Should always subtract, but stop at 0 to prevent errors.
				this.choice.forcedSwitchesLeft = this.battle.clampIntRange(this.choice.forcedSwitchesLeft - 1, 0);
				pokemon.switchFlag = false;
				this.battle.faint(targetPokemon, targetPokemon, this.battle.dex.moves.get('epicbeam'));
				this.choice.actions.push({
					choice: 'epicbeam',
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
		},
		canDynamaxNow(): boolean {
			if (this.battle.gen === 9) return false;
			return true;
		},
		addFishingTokens(amount: number) {
			if (amount === 0 || Number.isNaN(amount)) return false;
			if(this.fishingTokens === undefined) this.fishingTokens = 0;
			this.fishingTokens += amount;
			const word = (amount === 1) ? 'token was' : 'tokens were';
			this.battle.add('-message', `${amount} fishing ${word} added to ${this.name}'s side!`);
			this.battle.hint(`They now have ${this.fishingTokens} tokens.`);
		},
		removeFishingTokens(amount: number) {
			if (this.fishingTokens === undefined) this.fishingTokens = 0;
			if (amount === 0 || Number.isNaN(amount) || amount > this.fishingTokens) return false;
			if (this.field.isWeather('acidrain')) amount ++;
			this.fishingTokens -= amount;
			const word = (amount === 1) ? 'token was' : 'tokens were';
			this.battle.add('-message', `${amount} fishing ${word} removed from ${this.name}'s side!`);
			this.battle.hint(`They now have ${this.fishingTokens} tokens.`);
			return true;
		},
	},
	pokemon: {
		inherit: true,
		hasAbility(ability) {
			if (this.ignoringAbility()) return false;
			if (Array.isArray(ability)) return ability.some(abil => this.hasAbility(abil));
			const abilityid = this.battle.toID(ability);
			return this.ability === abilityid || !!this.volatiles['ability:' + abilityid];
		},
		isGrounded(negateImmunity = false) {
			if ('gravity' in this.battle.field.pseudoWeather) return true;
			if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
			if ('smackdown' in this.volatiles) return true;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball' || item === 'itemfist') return true;
			// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
			if (!negateImmunity && this.hasType('Flying') && !('roost' in this.volatiles)) return false;
			if (
				(this.hasAbility('levitate') || 
				this.hasAbility('impalpable')) && 
				!this.battle.suppressingAbility(this)) return null;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			return item !== 'airballoon';
		},
	},
};