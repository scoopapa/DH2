export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 9,
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: true,
		// only to specify the order of custom tiers
		customTiers: ['Desvega OU', 'Desvega Uber', 'Desvega NFE', 'Desvega LC'],
		customDoublesTiers: ['DGX'],
	},	
	init() {
		
	},
	runAction(action) {
		const pokemonOriginalHP = action.pokemon?.hp;
		let residualPokemon: (readonly [Pokemon, number])[] = [];
		// returns whether or not we ended in a callback
		switch (action.choice) {
		case 'start': {
			for (const side of this.sides) {
				side.pokemonLeft &&= side.pokemon.length;
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
					const movepp = (move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5;
					pokemon.baseMoveSlots[ironHead] = {
						move: move.name,
						id: move.id,
						pp: movepp,
						maxpp: movepp,
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
					if (side.pokemonLeft) {
						this.actions.switchIn(side.pokemon[i], i);
						continue;
					}
					// forfeited before starting
					side.active[i] = side.pokemon[i];
					side.active[i].fainted = true;
					side.active[i].hp = 0;
				}
			}
			for (const pokemon of this.getAllPokemon()) {
				this.singleEvent('Start', this.dex.conditions.getByID(pokemon.species.id), pokemon.speciesState, pokemon);
			}
			this.midTurn = true;
			break;
		}

		case 'move':
			if (!action.pokemon.isActive || action.pokemon.fainted) return false;
			this.actions.runMove(action.move, action.pokemon, action.targetLoc, action.sourceEffect,
				action.zmove, undefined, action.maxMove, action.originalTarget);
			break;
		case 'megaEvo':
			this.actions.runMegaEvo(action.pokemon);
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
			if (!action.pokemon.isActive || action.pokemon.fainted) return false;
			this.debug('before turn callback: ' + action.move.id);
			const target = this.getTarget(action.pokemon, action.move, action.targetLoc);
			if (!target) return false;
			if (!action.move.beforeTurnCallback) throw new Error(`beforeTurnMove has no beforeTurnCallback`);
			action.move.beforeTurnCallback.call(this, action.pokemon, target);
			break;
		case 'priorityChargeMove':
			if (!action.pokemon.isActive || action.pokemon.fainted) return false;
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
			if (this.actions.switchIn(action.target, action.pokemon.position,
				action.sourceEffect) !== 'pursuitfaint') break;
			// a pokemon fainted from Pursuit before it could switch
			/*if (this.gen <= 4) {
				// in gen 2-4, the switch still happens
				this.hint("Previously chosen switches continue in Gen 2-4 after a Pursuit target faints.");
				action.priority = -101;
				this.queue.unshift(action);
				break;
			}*/
			// in gen 5+, the switch is cancelled
			this.hint("A Pokemon can't switch between when it runs out of HP and when it faints");
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
			action.target.fainted = action.target.faintQueued = action.target.subFainted = false;
			action.target.status = '';
			action.target.hp = 1; // Needed so hp functions works
			action.target.sethp(action.target.maxhp / 2);
			this.add('-heal', action.target, action.target.getHealth, '[from] move: Revival Blessing');
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
			if (!action.pokemon.isActive || action.pokemon.fainted) return false;
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
				if (!pokemon.forceSwitchFlag) continue;
				if (pokemon.hp) this.actions.dragIn(pokemon.side, pokemon.position);
				pokemon.forceSwitchFlag = false;
			}
		}

		this.clearActiveMove();

		// fainting

		this.faintMessages();
		if (this.ended) return true;

		// switching (fainted pokemon, U-turn, Baton Pass, etc)

		if (!this.queue.peek() /*|| (this.gen <= 3 && ['move', 'residual'].includes(this.queue.peek()!.choice))*/) {
			// in gen 3 or earlier, switching in fainted pokemon is done after
			// every move, rather than only at the end of the turn.
			this.checkFainted();
		} else if (action.choice === 'megaEvo'/* && this.gen === 7*/) {
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

		//if (this.gen >= 5) {
			this.eachEvent('Update');
			for (const [pokemon, originalHP] of residualPokemon) {
				const halfOfMaxHP = pokemon.getUndynamaxedHP(pokemon.maxhp) / 2;
				if (pokemon.hp && pokemon.getUndynamaxedHP() <= halfOfMaxHP && originalHP > halfOfMaxHP) {
					this.runEvent('EmergencyExit', pokemon);
				}
			}
		//}

		if (action.choice === 'runSwitch') {
			const pokemon = action.pokemon;
			const threshold = pokemon.maxhp / 2;
			if (pokemon.hp && pokemon.hp <= threshold && pokemonOriginalHP! > threshold) {
				this.runEvent('EmergencyExit', pokemon);
			}
		}

		const switches = this.sides.map(
			side => side.active.some(pokemon => pokemon && !!pokemon.switchFlag)
		);

		for (let i = 0; i < this.sides.length; i++) {
			if (switches[i]) {
				let reviveSwitch = false; // Used to ignore the fake switch for Revival Blessing
				
				if (!this.canSwitch(this.sides[i])) {
					for (const pokemon of this.sides[i].active) {
						if (this.sides[i].slotConditions[pokemon.position]['revivalblessing']) {
							reviveSwitch = true;
							continue;
						}
						pokemon.switchFlag = false;
					}
					if (!reviveSwitch) switches[i] = false;
				} else {
					for (const pokemon of this.sides[i].active) {
						if (pokemon.switchFlag && pokemon.switchFlag !== 'revivalblessing' && !pokemon.skipBeforeSwitchOutEventFlag) {
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
		}

		if (switches.some(Boolean)) {
			this.makeRequest('switch');
			return true;
		}
		/*for (const playerSwitch of switches) {
			if (playerSwitch) {
				this.makeRequest('switch');
				return true;
			}
		}*/

		//if (this.gen < 5) this.eachEvent('Update');

		if (/*this.gen >= 8 &&*/ (this.queue.peek()?.choice === 'move' || this.queue.peek()?.choice === 'runDynamax')) {
			// In gen 8, speed is updated dynamically so update the queue's speed properties and sort it.
			this.updateSpeed();
			for (const queueAction of this.queue.list) {
				if (!queueAction.pokemon) continue; 
				this.getActionSpeed(queueAction);
			}
			this.queue.sort();
		}

		return false;
	},
	actions: {
		
		modifyDamage(
			baseDamage: number, pokemon: Pokemon, target: Pokemon, move: ActiveMove, suppressMessages = false
		) {
			const tr = this.battle.trunc;
			const type = (move.type ||= '???');

			baseDamage += 2;

			if (move.spreadHit) {
				// multi-target modifier (doubles only)
				const spreadModifier = move.spreadModifier || (this.battle.gameType === 'freeforall' ? 0.5 : 0.75);
				this.battle.debug('Spread modifier: ' + spreadModifier);
				baseDamage = this.battle.modify(baseDamage, spreadModifier);
			} else if (move.multihitType === 'parentalbond' && move.hit > 1) {
				// Parental Bond modifier
				const bondModifier = 0.25;//this.battle.gen > 6 ? 0.25 : 0.5;
				this.battle.debug(`Parental Bond modifier: ${bondModifier}`);
				baseDamage = this.battle.modify(baseDamage, bondModifier);
			}

			// weather modifier
			baseDamage = this.battle.runEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);

			// crit - not a modifier
			const isCrit = target.getMoveHitData(move).crit;
			if (isCrit) {
				baseDamage = tr(baseDamage * (move.critModifier || /*(this.battle.gen >= 6 ? 1.5 : 2)*/ 1.5));
			}

			// random factor - also not a modifier
			baseDamage = this.battle.randomizer(baseDamage);

			// STAB
			const isTeraStellarBoosted = pokemon.terastallized === 'Stellar' && !pokemon.stellarBoostedTypes.includes(type);
			if (move.forceSTAB || (type !== '???' &&
				(pokemon.hasType(type) || (pokemon.terastallized && pokemon.getTypes(false, true).includes(type)) ||
					isTeraStellarBoosted))) {
				// The "???" type never gets STAB
				// Not even if you Roost in Gen 4 and somehow manage to use
				// Struggle in the same turn.
				// (On second thought, it might be easier to get a MissingNo.)

				// The Stellar tera type makes this incredibly confusing
				// If the move's type does not match one of the user's base types,
				// the Stellar tera type applies a one-time 1.2x damage boost for that type.
				//
				// If the move's type does match one of the user's base types,
				// then the Stellar tera type applies a one-time 2x STAB boost for that type,
				// and then goes back to using the regular 1.5x STAB boost for those types.

				let stab: number | [number, number];
				if (isTeraStellarBoosted) {
					stab = pokemon.getTypes(false, true).includes(type) ? 2 : [4915, 4096];
					if (pokemon.species.name !== 'Terapagos-Stellar') {
						pokemon.stellarBoostedTypes.push(type);
					}
				} else {
					stab = move.stab || 1.5;
					if (type === pokemon.terastallized && pokemon.getTypes(false, true).includes(type)) {
						// In my defense, the game hardcodes the Adaptability check like this, too.
						stab = stab === 2 ? 2.25 : 2;
					} else if (pokemon.terastallized && type !== pokemon.terastallized) {
						stab = 1.5;
					}
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
			else if (typeMod < 0) {
				if (!suppressMessages) this.battle.add('-resisted', target);

				for (let i = 0; i > typeMod; i--) {
					baseDamage = tr(baseDamage / 2);
				}
			}

			if (isCrit && !suppressMessages) this.battle.add('-crit', target);

			if (pokemon.status === 'brn' && move.category === 'Physical' && !pokemon.hasAbility('guts')
				&& !['facade','pepperrush'].includes(move.id)) {
				baseDamage = this.battle.modify(baseDamage, 0.5);
			}

			// Generation 5, but nothing later, sets damage to 1 before the final damage modifiers
			//if (this.battle.gen === 5 && !baseDamage) baseDamage = 1;

			// Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
			baseDamage = this.battle.runEvent('ModifyDamage', pokemon, target, move, baseDamage);

			if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
				baseDamage = this.battle.modify(baseDamage, 0.25);
				this.battle.add('-zbroken', target);
			}

			// Generation 6-7 moves the check for minimum 1 damage after the final modifier...
			if (/*this.battle.gen !== 5 && */!baseDamage) return 1;

			// ...but 16-bit truncation happens even later, and can truncate to 0
			return tr(baseDamage, 16);
		},
		canMegaEvo(pokemon) {
			if (pokemon.species.isMega) return null;

			const item = pokemon.getItem();
			if (!item.megaStone || item.megaStone === pokemon.baseSpecies.name) return null;
			return item.megaStone;
		},
		runMegaEvo(pokemon) {
			if (pokemon.species.isMega) return false;

			// @ts-ignore
			const species: Species = this.getMixedSpecies(pokemon.species, pokemon.canMegaEvo);

			// Do we have a proper sprite for it?
			if (this.dex.species.get(pokemon.canMegaEvo!).baseSpecies === pokemon.species.baseSpecies) {
				pokemon.formeChange(species, pokemon.getItem(), true);
				// Limit one mega evolution
				for (const ally of pokemon.side.pokemon) {
					if (!ally.item?.endsWith('mask')) {
						ally.canMegaEvo = null;
					}
				}
			} else {
				const oSpecies = this.dex.species.get(pokemon.species);
				// @ts-ignore
				const oMegaSpecies = this.dex.species.get(species.originalSpecies);
				pokemon.formeChange(species, pokemon.getItem(), true);
				this.battle.add('-start', pokemon, oMegaSpecies.requiredItem, '[silent]');
				if (oSpecies.types.length !== pokemon.species.types.length || oSpecies.types[1] !== pokemon.species.types[1]) {
					this.battle.add('-start', pokemon, 'typechange', pokemon.species.types.join('/'), '[silent]');
				}
				//limit one wonder mask
				for (const ally of pokemon.side.pokemon) {
					if (ally.item?.endsWith('mask')) {
						ally.canMegaEvo = null;
					}
				}
			}

			return true;
		},
		getMixedSpecies(originalForme, megaForme) {
			const originalSpecies = this.dex.species.get(originalForme);
			const megaSpecies = this.dex.species.get(megaForme);
			if (originalSpecies.baseSpecies === megaSpecies.baseSpecies) return megaSpecies;
			// @ts-ignore
			return this.mutateOriginalSpecies(originalSpecies, megaSpecies);
		},
		mutateOriginalSpecies(speciesOrForme, formeChangeSpecies) {
			const baseSpecies = this.dex.species.get(formeChangeSpecies.baseSpecies);
			let statDeltas = {};
			let statId: StatID;
			for (statId in formeChangeSpecies.baseStats) {
				statDeltas[statId] = formeChangeSpecies.baseStats[statId] - baseSpecies.baseStats[statId];
			}
			const species = this.dex.deepClone(this.dex.species.get(speciesOrForme));
			const baseStats = species.baseStats;
			for (const statName in baseStats) {
				baseStats[statName] = this.battle.clampIntRange(baseStats[statName] + statDeltas[statName], 1, 255);
			}
			this.battle.add(`raw|<ul class="utilichart"><li class="result"><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br>` + baseStats.hp + `</span> <span class="col statcol"><em>Atk</em><br>` + baseStats.atk + `</span> <span class="col statcol"><em>Def</em><br>` + baseStats.def + `</span> <span class="col statcol"><em>SpA</em><br>` + baseStats.spa + `</span> <span class="col statcol"><em>SpD</em><br>` + baseStats.spd + `</span> <span class="col statcol"><em>Spe</em><br>` + baseStats.spe + `</span> </span></li><li style="clear: both"></li></ul>`);
			species.abilities = {'0': formeChangeSpecies.abilities['0']};
			const newType = formeChangeSpecies.types[0];
			species.types = (species.types[0] === newType) ?
				[newType] : [species.types[0], newType];
			//species.weighthg = Math.max(1, species.weighthg + formeChangeSpecies.weighthg - baseSpecies.weighthg);
			species.originalSpecies = formeChangeSpecies.name;
			species.requiredItem = formeChangeSpecies.requiredItem;
			species.isMega = true;
			return species;
		},
	},
	pokemon: { 
		ignoringItem() {
			return !!(
				this.itemState.knockedOff || // Gen 3-4
				(/*this.battle.gen >= 5 &&*/ !this.isActive) ||
				(!this.getItem().ignoreKlutz && this.hasAbility('klutz')) ||
				this.volatiles['rulebook'] || this.volatiles['embargo'] ||
				this.battle.field.pseudoWeather['magicroom']
			);
		},
		runImmunity(type: string, message?: string | boolean) {
			if (!type || type === '???') return true;
			if (!this.battle.dex.types.isName(type)) {
				throw new Error("Use runStatusImmunity for " + type);
			}
			if (this.fainted) return false;
	
			const negateImmunity = !this.battle.runEvent('NegateImmunity', this, type);
			const notImmune = type === 'Ground' ?
				this.isGrounded(negateImmunity) :
				negateImmunity || this.battle.dex.getImmunity(type, this);
			if (notImmune) return true;
			if (message) {
				if (notImmune === null) {
					this.battle.add('-immune', this, '[from] ability: ' + this.getAbility().name);
				} else {
					this.battle.add('-immune', this);
				}
			}
			return false;
		},
		isGrounded(negateImmunity = false) {
			if ('gravity' in this.battle.field.pseudoWeather/*) return true;
			if (*/|| 'ingrain' in this.volatiles/* && this.battle.gen >= 4) return true;
			if (*/|| 'smackdown' in this.volatiles) return true;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return true;
			// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
			if (!negateImmunity && this.hasType('Flying') && !('roost' in this.volatiles)) return false;
			if (this.hasAbility(['levitate', 'soaringspirit']) && !this.battle.suppressingAbility(this)) return null;
			if ('magnetrise' in this.volatiles/*) return false;
			if (*/|| 'telekinesis' in this.volatiles) return false;
			//These species are excluded from the Tree-Topper check due to Telekinesis failing against them
			if (!['Diglett', 'Dugtrio', 'Palossand', 'Sandygast'].includes(this.baseSpecies.baseSpecies) &&
						this.baseSpecies.name !== 'Gengar-Mega' && this.battle.getAllActive().some(target => target.hasAbility('treetopper'))) return false;
			return item !== 'airballoon';
		 },
		
	/** Specifically: is protected against a single-target damaging move */
	isProtected() {
		return !!(
			this.volatiles['protect'] || this.volatiles['detect'] || this.volatiles['maxguard'] ||
			this.volatiles['kingsshield'] || this.volatiles['spikyshield'] || this.volatiles['banefulbunker'] ||
			this.volatiles['obstruct'] || this.volatiles['silktrap'] || this.volatiles['burningbulwark'] ||
			this.volatiles['fieldofvision']
		);
	}
     },
};
