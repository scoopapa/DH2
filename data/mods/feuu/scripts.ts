export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init(){ 
		// Automatically construct fusion learnsets! (Thank u scoopapa)
		for (const id in this.dataCache.Pokedex) {//check the dex for fusions
			const fusionEntry = this.dataCache.Pokedex[id];
			if (fusionEntry.fusion) {//if the pokedex entry has a fusion field, it's a fusion
				const learnsetFusionList = [];//list of pokemon whose learnsets need to be fused
				for (let name of fusionEntry.fusion) {
					let prevo = true;
					while (prevo) {//make sure prevos of both fused pokemon are added to the list
						learnsetFusionList.push(name);
						const dexEntry = this.dataCache.Pokedex[this.toID(name)];
						if (dexEntry.prevo) name = dexEntry.prevo;
						else prevo = false;
					}
				}
				if (!this.dataCache.Learnsets[id]) this.dataCache.Learnsets[id] = { learnset: {}};//create a blank learnset entry so we don't need a learnsets file
				for (let name of learnsetFusionList) {					
					const learnset = this.dataCache.Learnsets[this.toID(name)].learnset;//get the learnset of each pokemon in the list
					for (const moveid in learnset) {
						this.modData('Learnsets', id).learnset[moveid] = ['8L1'];//all moves are compatible with the fusion's only ability, so just set it to 8L1
					}
				}
			}
		}
		
		this.modData('Learnsets', 'yaciancrowned').learnset.behemothblade = ['7L1'];
	},
	
	teambuilderConfig: {
        // for micrometas to only show custom tiers
        excludeStandardTiers: true,
        // only to specify the order of custom tiers
        customTiers: ['FEUU', 'Silvino', 'FEUUber'],
	},
	
	canMegaEvo(pokemon) {
		const altForme = pokemon.baseSpecies.otherFormes && this.dex.getSpecies(pokemon.baseSpecies.otherFormes[0]);
		const item = pokemon.getItem();
		if (
			altForme?.isMega && altForme?.requiredMove &&
			pokemon.baseMoves.includes(this.toID(altForme.requiredMove)) && !item.zMove
		) {
			return altForme.name;
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Bug") {
			return "Silvino-Bug-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Dark") {
			return "Silvino-Dark-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Dragon") {
			return "Silvino-Dragon-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Electric") {
			return "Silvino-Electric-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Fairy") {
			return "Silvino-Fairy-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Fighting") {
			return "Silvino-Fighting-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Fire") {
			return "Silvino-Fire-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Flying") {
			return "Silvino-Flying-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Ghost") {
			return "Silvino-Ghost-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Grass") {
			return "Silvino-Grass-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Ground") {
			return "Silvino-Ground-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Ice") {
			return "Silvino-Ice-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Poison") {
			return "Silvino-Poison-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Psychic") {
			return "Silvino-Psychic-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Rock") {
			return "Silvino-Rock-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Steel") {
			return "Silvino-Steel-Mega";
		}
		if (item.name === "Silvinite" && pokemon.baseSpecies.name === "Silvino-Water") {
			return "Silvino-Water-Mega";
		}
		
		return item.megaStone;
	},
	
	pokemon: {
		//Included for Magnetic Waves:
		//Levitate is checked for when running groundedness (ground immunity, iron ball, etc)
		//So we manually add a check for Magnetic Waves here as well,
		//Including a diffrent activation message 
		//so that the game doesn't report it as having Levitate when it procs.
		runImmunity(type: string, message?: string | boolean) {
			if (!type || type === '???') return true;
			if (!(type in this.battle.dex.data.TypeChart)) {
				if (type === 'Fairy' || type === 'Dark' || type === 'Steel') return true;
				throw new Error("Use runStatusImmunity for " + type);
			}
			if (this.fainted) return false;

			const negateResult = this.battle.runEvent('NegateImmunity', this, type);
			let isGrounded;
			if (type === 'Ground') {
				isGrounded = this.isGrounded(!negateResult);
				if (isGrounded === null) {
					if (message) {
						if (this.hasAbility('magneticwaves')) {
							this.battle.add('-immune', this, '[from] ability: Magnetic Waves');
						} else {
							this.battle.add('-immune', this, '[from] ability: Levitate');
						}
					}
					return false;
				}
			}
			if (!negateResult) return true;
			if ((isGrounded === undefined && !this.battle.dex.getImmunity(type, this)) || isGrounded === false) {
				if (message) {
					this.battle.add('-immune', this);
				}
				return false;
			}
			return true;
		},
		
		
		isGrounded(negateImmunity = false) {
			if ('gravity' in this.battle.field.pseudoWeather) return true;
			if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
			if ('smackdown' in this.volatiles) return true;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return true;
			// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
			if (!negateImmunity && this.hasType('Flying') && !('roost' in this.volatiles)) return false;
			if ((this.hasAbility('levitate') || this.hasAbility('magneticwaves'))&& !this.battle.suppressingAttackEvents()) return null;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			return item !== 'airballoon';
		}
	},
	
	battle: {
		//Included for Therapeutic:
		//Burn status' Atk reduction and Guts users' immunity to it is hard-coded in battle.ts,
		//So we have to bypass it manually here.
		modifyDamage(
			baseDamage: number, pokemon: Pokemon, target: Pokemon, move: ActiveMove, suppressMessages = false
		) {
			const tr = this.trunc;
			if (!move.type) move.type = '???';
			const type = move.type;

			baseDamage += 2;

			// multi-target modifier (doubles only)
			if (move.spreadHit) {
				const spreadModifier = move.spreadModifier || (this.gameType === 'free-for-all' ? 0.5 : 0.75);
				this.debug('Spread modifier: ' + spreadModifier);
				baseDamage = this.modify(baseDamage, spreadModifier);
			}

			// weather modifier
			baseDamage = this.runEvent('WeatherModifyDamage', pokemon, target, move, baseDamage);

			// crit - not a modifier
			const isCrit = target.getMoveHitData(move).crit;
			if (isCrit) {
				baseDamage = tr(baseDamage * (move.critModifier || (this.gen >= 6 ? 1.5 : 2)));
			}

			// random factor - also not a modifier
			baseDamage = this.randomizer(baseDamage);

			// STAB
			if (move.forceSTAB || (type !== '???' && pokemon.hasType(type))) {
				// The "???" type never gets STAB
				// Not even if you Roost in Gen 4 and somehow manage to use
				// Struggle in the same turn.
				// (On second thought, it might be easier to get a MissingNo.)
				baseDamage = this.modify(baseDamage, move.stab || 1.5);
			}
			// types
			let typeMod = target.runEffectiveness(move);
			typeMod = this.clampIntRange(typeMod, -6, 6);
			target.getMoveHitData(move).typeMod = typeMod;
			if (typeMod > 0) {
				if (!suppressMessages) this.add('-supereffective', target);

				for (let i = 0; i < typeMod; i++) {
					baseDamage *= 2;
				}
			}
			if (typeMod < 0) {
				if (!suppressMessages) this.add('-resisted', target);

				for (let i = 0; i > typeMod; i--) {
					baseDamage = tr(baseDamage / 2);
				}
			}

			if (isCrit && !suppressMessages) this.add('-crit', target);

			if (pokemon.status === 'brn' && move.category === 'Physical' && !pokemon.hasAbility('guts') && !pokemon.hasAbility('therapeutic')) {
				if (this.gen < 6 || move.id !== 'facade') {
					baseDamage = this.modify(baseDamage, 0.5);
				}
			}

			// Generation 5, but nothing later, sets damage to 1 before the final damage modifiers
			if (this.gen === 5 && !baseDamage) baseDamage = 1;

			// Final modifier. Modifiers that modify damage after min damage check, such as Life Orb.
			baseDamage = this.runEvent('ModifyDamage', pokemon, target, move, baseDamage);

			if (move.isZOrMaxPowered && target.getMoveHitData(move).zBrokeProtect) {
				baseDamage = this.modify(baseDamage, 0.25);
				this.add('-zbroken', target);
			}

			// Generation 6-7 moves the check for minimum 1 damage after the final modifier...
			if (this.gen !== 5 && !baseDamage) return 1;

			// ...but 16-bit truncation happens even later, and can truncate to 0
			return tr(baseDamage, 16);
		}
		
		
		
		
		//ok here we fucking go
		//hard-coding sturdy mold
		//this will not end well
		suppressingAttackEvents(target?: Pokemon) {
			return this.activePokemon && this.activePokemon.isActive && this.activePokemon !== target &&
				this.activeMove && this.activeMove.ignoreAbility;
		}
		
		suppressingFoeAttackEvents(target?: Pokemon) {
			return this.activePokemon && this.activePokemon.isActive && this.activePokemon !== target &&
				this.activeMove && this.activeMove.ignoreSourceAbility;
		}
		
		runEvent(
			eventid: string, target?: Pokemon | Pokemon[] | Side | Battle | null, source?: string | Pokemon | false | null,
			sourceEffect?: Effect | null, relayVar?: any, onEffect?: boolean, fastExit?: boolean
		) {
			// if (Battle.eventCounter) {
			// 	if (!Battle.eventCounter[eventid]) Battle.eventCounter[eventid] = 0;
			// 	Battle.eventCounter[eventid]++;
			// }
			if (this.eventDepth >= 8) {
				// oh fuck
				this.add('message', 'STACK LIMIT EXCEEDED');
				this.add('message', 'PLEASE REPORT IN BUG THREAD');
				this.add('message', 'Event: ' + eventid);
				this.add('message', 'Parent event: ' + this.event.id);
				throw new Error("Stack overflow");
			}
			if (!target) target = this;
			let effectSource = null;
			if (source instanceof Pokemon) effectSource = source;
			const handlers = this.findEventHandlers(target, eventid, effectSource);
			if (eventid === 'Invulnerability' || eventid === 'TryHit' || eventid === 'DamagingHit') {
				handlers.sort(Battle.compareLeftToRightOrder);
			} else if (fastExit) {
				handlers.sort(Battle.compareRedirectOrder);
			} else {
				this.speedSort(handlers);
			}
			let hasRelayVar = 1;
			const args = [target, source, sourceEffect];
			// console.log('Event: ' + eventid + ' (depth ' + this.eventDepth + ') t:' + target.id + ' s:' + (!source || source.id) + ' e:' + effect.id);
			if (relayVar === undefined || relayVar === null) {
				relayVar = true;
				hasRelayVar = 0;
			} else {
				args.unshift(relayVar);
			}

			const parentEvent = this.event;
			this.event = {id: eventid, target, source, effect: sourceEffect, modifier: 1};
			this.eventDepth++;

			if (onEffect) {
				if (!sourceEffect) throw new Error("onEffect passed without an effect");
				// @ts-ignore - dynamic lookup
				const callback = sourceEffect[`on${eventid}`];
				if (callback !== undefined) {
					if (Array.isArray(target)) throw new Error("");
					handlers.unshift(this.resolvePriority({
						effect: sourceEffect, callback, state: {}, end: null, effectHolder: target,
					}, `on${eventid}`));
				}
			}

			let targetRelayVars = [];
			if (Array.isArray(target)) {
				if (Array.isArray(relayVar)) {
					targetRelayVars = relayVar;
				} else {
					for (let i = 0; i < target.length; i++) targetRelayVars[i] = true;
				}
			}
			for (const handler of handlers) {
				if (handler.index !== undefined) {
					// TODO: find a better way to do this
					if (!targetRelayVars[handler.index] && !(targetRelayVars[handler.index] === 0 &&
						eventid === 'DamagingHit')) continue;
					if (handler.target) {
						args[hasRelayVar] = handler.target;
						this.event.target = handler.target;
					}
					if (hasRelayVar) args[0] = targetRelayVars[handler.index];
				}
				const effect = handler.effect;
				const effectHolder = handler.effectHolder;
				// this.debug('match ' + eventid + ': ' + status.id + ' ' + status.effectType);
				if (effect.effectType === 'Status' && (effectHolder as Pokemon).status !== effect.id) {
					// it's changed; call it off
					continue;
				}
				if (effect.effectType === 'Ability' && !effect.isUnbreakable &&
						this.suppressingAttackEvents(effectHolder as Pokemon)) {
					// ignore attacking events
					const AttackingEvents = {
						BeforeMove: 1,
						BasePower: 1,
						Immunity: 1,
						RedirectTarget: 1,
						Heal: 1,
						SetStatus: 1,
						CriticalHit: 1,
						ModifyAtk: 1, ModifyDef: 1, ModifySpA: 1, ModifySpD: 1, ModifySpe: 1, ModifyAccuracy: 1,
						ModifyBoost: 1,
						ModifyDamage: 1,
						ModifySecondaries: 1,
						ModifyWeight: 1,
						TryAddVolatile: 1,
						TryHit: 1,
						TryHitSide: 1,
						TryMove: 1,
						Boost: 1,
						DragOut: 1,
						Effectiveness: 1,
					};
					if (eventid in AttackingEvents) {
						this.debug(eventid + ' handler suppressed by Mold Breaker');
						continue;
					} else if (eventid === 'Damage' && sourceEffect && sourceEffect.effectType === 'Move') {
						this.debug(eventid + ' handler suppressed by Mold Breaker');
						continue;
					}
				} else if (effect.effectType === 'Ability' && !effect.isUnbreakable &&
						this.suppressingFoeAttackEvents(effectHolder as Pokemon)) {
					// ignore attacking events
					const AttackingEvents = {
						BeforeMove: 1,
						BasePower: 1,
						Immunity: 1,
						RedirectTarget: 1,
						Heal: 1,
						SetStatus: 1,
						CriticalHit: 1,
						ModifyAtk: 1, ModifyDef: 1, ModifySpA: 1, ModifySpD: 1, ModifySpe: 1, ModifyAccuracy: 1,
						ModifyBoost: 1,
						ModifyDamage: 1,
						ModifySecondaries: 1,
						ModifyWeight: 1,
						TryAddVolatile: 1,
						TryHit: 1,
						TryHitSide: 1,
						TryMove: 1,
						Boost: 1,
						DragOut: 1,
						Effectiveness: 1,
					};
					if (eventid in AttackingEvents) {
						this.debug(eventid + ' handler suppressed by Mold Breaker');
						continue;
					} else if (eventid === 'Damage' && sourceEffect && sourceEffect.effectType === 'Move') {
						this.debug(eventid + ' handler suppressed by Mold Breaker');
						continue;
					}
				}
				if (eventid !== 'Start' && eventid !== 'SwitchIn' && eventid !== 'TakeItem' &&
					effect.effectType === 'Item' && (effectHolder instanceof Pokemon) && effectHolder.ignoringItem()) {
					if (eventid !== 'Update') {
						this.debug(eventid + ' handler suppressed by Embargo, Klutz or Magic Room');
					}
					continue;
				} else if (eventid !== 'End' && effect.effectType === 'Ability' &&
						(effectHolder instanceof Pokemon) && effectHolder.ignoringAbility()) {
					if (eventid !== 'Update') {
						this.debug(eventid + ' handler suppressed by Gastro Acid');
					}
					continue;
				}
				if ((effect.effectType === 'Weather' || eventid === 'Weather') &&
					eventid !== 'Residual' && eventid !== 'End' && this.field.suppressingWeather()) {
					this.debug(eventid + ' handler suppressed by Air Lock');
					continue;
				}
				let returnVal;
				if (typeof handler.callback === 'function') {
					const parentEffect = this.effect;
					const parentEffectData = this.effectData;
					this.effect = handler.effect;
					this.effectData = handler.state || {};
					this.effectData.target = effectHolder;

					returnVal = handler.callback.apply(this, args);

					this.effect = parentEffect;
					this.effectData = parentEffectData;
				} else {
					returnVal = handler.callback;
				}

				if (returnVal !== undefined) {
					relayVar = returnVal;
					if (!relayVar || fastExit) {
						if (handler.index !== undefined) {
							targetRelayVars[handler.index] = relayVar;
							if (targetRelayVars.every(val => !val)) break;
						} else {
							break;
						}
					}
					if (hasRelayVar) {
						args[0] = relayVar;
					}
				}
			}

			this.eventDepth--;
			if (typeof relayVar === 'number' && relayVar === Math.abs(Math.floor(relayVar))) {
				// this.debug(eventid + ' modifier: 0x' +
				// 	('0000' + (this.event.modifier * 4096).toString(16)).slice(-4).toUpperCase());
				relayVar = this.modify(relayVar, this.event.modifier);
			}
			this.event = parentEvent;

			return Array.isArray(target) ? targetRelayVars : relayVar;
		}
	},
}; 