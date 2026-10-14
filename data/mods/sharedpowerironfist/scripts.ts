export const Scripts: ModdedBattleScriptsData = {
	inherit: 'ironfist',
	field: {
		suppressingWeather() {
			for (const pokemon of this.battle.getAllActive()) {
				const innates = Object.keys(pokemon.volatiles).filter(x => x.startsWith('ability:'));
				if (pokemon && !pokemon.ignoringAbility() &&
					(pokemon.getAbility().suppressWeather || innates.some(x => (
						this.battle.dex.abilities.get(x.replace('ability:', '')).suppressWeather
					)))) {
					return true;
				}
			}
			return false;
		},
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

				for (const pokemon of this.getAllPokemon()) {
					let rawSpecies: Species | null = null;
					
					// Change Circall into Wario
					if (pokemon.species.id === 'circall' && 
						pokemon.baseMoves.indexOf('stankyleg') >= 0 &&
						pokemon.baseMoves.indexOf('youwantfun') >= 0 &&
						pokemon.baseMoves.indexOf('wariopicrosspuzzle4g') >= 0 &&
						pokemon.baseMoves.indexOf('ohmygoooodwaaaaaaaaaanisfokifnouh') >= 0 &&
						pokemon.hasAbility('bloodlinegreatestachievement')) {
						rawSpecies = this.dex.species.get('Wario-Forbidden-One');
					}
					
					// change ogre to ogre-o
					if (pokemon.species.id === 'kyogre' && pokemon.item === 'originalitem') {
						rawSpecies = this.dex.species.get('Kyogre-Original');
					} 
					// change daiyakuza to daiyakuza-o
					else if (pokemon.species.id === 'daiyakuza' && pokemon.item === 'diamondheart') {
						rawSpecies = this.dex.species.get('Daiyakuza-Origin');
					}
					
					if (!rawSpecies) continue;
					const species = pokemon.setSpecies(rawSpecies);
					if (!species) continue;
					pokemon.baseSpecies = rawSpecies;
					pokemon.details = species.name + (pokemon.level === 100 ? '' : ', L' + pokemon.level) +
						(pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
					pokemon.setAbility(species.abilities['0'], null, true);
					pokemon.baseAbility = pokemon.ability;
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
		},
		heal(damage: number, target?: Pokemon, source: Pokemon | null = null, effect: 'drain' | Effect | null = null) {
			if (this.event) {
				target ||= this.event.target;
				source ||= this.event.source;
				effect ||= this.effect;
			}
			if (effect === 'drain') effect = this.dex.conditions.getByID(effect as ID);
			if (damage && damage <= 1) damage = 1;
			damage = this.trunc(damage);
			// for things like Liquid Ooze, the Heal event still happens when nothing is healed.
			damage = this.runEvent('TryHeal', target, source, effect, damage);
			if (!damage) return damage;
			if (!target?.hp) return false;
			if (!target.isActive) return false;
			if (target.hp >= target.maxhp) return false;
			const finalDamage = target.heal(damage, source, effect);
			switch (effect?.id) {
			case 'leechseed':
			case 'rest':
				this.add('-heal', target, target.getHealth, '[silent]');
				break;
			case 'drain':
				this.add('-heal', target, target.getHealth, '[from] drain', '[of] ' + source);
				break;
			case 'wish':
				break;
			case 'zpower':
				this.add('-heal', target, target.getHealth, '[zeffect]');
				break;
			default:
				if (!effect) break;
				if (effect.effectType === 'Move') {
					this.add('-heal', target, target.getHealth);
				} else if (source && source !== target) {
					this.add('-heal', target, target.getHealth, '[from] ' + effect.fullname, '[of] ' + source);
				} else {
					this.add('-heal', target, target.getHealth, '[from] ' + effect.fullname);
				}
				break;
			}
			this.runEvent('Heal', target, source, effect, finalDamage);
			target.addVolatile('healed');
			return finalDamage;
		},
	},
	pokemon: {
		hasAbility(ability) {
			if (this.ignoringAbility()) return false;
			if (Array.isArray(ability)) return ability.some(abil => this.hasAbility(abil));
			const abilityid = this.battle.toID(ability);
			return this.ability === abilityid || !!this.volatiles['ability:' + abilityid];
		},
		ignoringAbility() {
			// Check if any active pokemon have the ability Neutralizing Gas
			let neutralizinggas = false;
			for (const pokemon of this.battle.getAllActive()) {
				// can't use hasAbility because it would lead to infinite recursion
				if (
					(pokemon.ability === ('neutralizinggas' as ID) || pokemon.m.abils?.includes('ability:neutralizinggas')) &&
					!pokemon.volatiles['gastroacid'] && !pokemon.abilityState.ending
				) {
					neutralizinggas = true;
					break;
				}
			}

			return !!(
				(this.battle.gen >= 5 && !this.isActive) ||
				((this.volatiles['gastroacid'] ||
					(neutralizinggas && (this.ability !== ('neutralizinggas' as ID) ||
						this.m.abils?.includes('ability:neutralizinggas'))
					)) && !this.getAbility().flags['cantsuppress']
				)
			);
		},
		isGrounded(negateImmunity = false) {
			if ('gravity' in this.battle.field.pseudoWeather) return true;
			if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
			if ('smackdown' in this.volatiles) return true;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball' || item === 'ironfist') return true;
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
		effectiveWeather(message?: string | boolean) {
			const weather = this.battle.field.effectiveWeather();
			switch (weather) {
			case 'sunnyday':
			case 'raindance':
			case 'desolateland':
			case 'primordialsea':
				if (this.hasItem('utilityumbrella')) return '';
			}
			// TODO: check interactions of Mega Sol with Utility Umbrella and Desolate Land
			if (this.hasAbility('lemongasour') && weather !== 'acidrain') {
				if (message) this.battle.add('-activate', this, 'ability: Lemonga Sour');
				return 'acidrain' as ID;
			}
			return weather;
		},
		recalcStats(this: Pokemon) {
			const set = this.set;
			const nature = this.battle.dex.natures.get(set.nature);
			for (const statName of ['atk', 'def', 'spa', 'spd', 'spe'] as const) {
				let value = Math.trunc(Math.trunc(
					2 * this.baseSpecies.baseStats[statName] + set.ivs[statName] + Math.trunc(set.evs[statName] / 4)
				) * this.level / 100 + 5);
				if (nature.plus === statName) value = Math.trunc(value * 1.1);
				else if (nature.minus === statName) value = Math.trunc(value * 0.9);
				this.storedStats[statName] = value;
			}
		},
	},
};
