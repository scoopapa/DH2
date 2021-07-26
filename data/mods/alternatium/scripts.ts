export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	init: function () {
		/*Template:
		this.modData('Learnsets', 'pokemon').learnset.move = ['8L1'];
		delete this.modData('Learnsets', 'pokemon').learnset.move;*/
		//Changes
		
		delete this.modData('Learnsets', 'pikachurockstar').learnset.nastyplot;
		delete this.modData('Learnsets', 'pikachuphd').learnset.nastyplot;
		
		delete this.modData('Learnsets', 'darmanitanzen').learnset.crunch;
		delete this.modData('Learnsets', 'darmanitanzen').learnset.knockoff;
		delete this.modData('Learnsets', 'darmanitanzen').learnset.psychicfangs;
		delete this.modData('Learnsets', 'darmanitanzen').learnset.thunderfang;
		
		delete this.modData('Learnsets', 'darmanitangalarzen').learnset.tripleaxel;
		delete this.modData('Learnsets', 'darmanitangalarzen').learnset.accelerock;
		delete this.modData('Learnsets', 'darmanitangalarzen').learnset.bulkup;
		delete this.modData('Learnsets', 'darmanitangalarzen').learnset.irondefense;
		
		delete this.modData('Learnsets', 'zamazentacrowned').learnset.bodypress;
		delete this.modData('Learnsets', 'zamazentacrowned').learnset.uturn;
		delete this.modData('Learnsets', 'zamazentacrowned').learnset.knockoff;
		delete this.modData('Learnsets', 'zamazentacrowned').learnset.bulkup;
		
		delete this.modData('Learnsets', 'rotomheat').learnset.taunt;
		delete this.modData('Learnsets', 'rotomwash').learnset.taunt;
		delete this.modData('Learnsets', 'rotommow').learnset.taunt;
		delete this.modData('Learnsets', 'rotomfrost').learnset.taunt;
		delete this.modData('Learnsets', 'rotomfan').learnset.taunt;
		
		delete this.modData('Learnsets', 'rotomheat').learnset.recover;
		delete this.modData('Learnsets', 'rotomwash').learnset.recover;
		delete this.modData('Learnsets', 'rotommow').learnset.recover;
		delete this.modData('Learnsets', 'rotomfrost').learnset.recover;
		
		delete this.modData('Learnsets', 'rotomwash').learnset.painsplit;
		delete this.modData('Learnsets', 'rotomwash').learnset.willowisp;
		
		delete this.modData('Learnsets', 'rotommow').learnset.thunder;
		delete this.modData('Learnsets', 'rotommow').learnset.thunderbolt;
		delete this.modData('Learnsets', 'rotommow').learnset.discharge;
		delete this.modData('Learnsets', 'rotommow').learnset.defog;
		delete this.modData('Learnsets', 'rotommow').learnset.willowisp;
		delete this.modData('Learnsets', 'rotommow').learnset.shadowball;
		delete this.modData('Learnsets', 'rotommow').learnset.hex;
		delete this.modData('Learnsets', 'rotommow').learnset.voltswitch;
		delete this.modData('Learnsets', 'rotommow').learnset.thunderwave;
		
		delete this.modData('Learnsets', 'rotomfrost').learnset.thunder;
		delete this.modData('Learnsets', 'rotomfrost').learnset.thunderbolt;
		delete this.modData('Learnsets', 'rotomfrost').learnset.discharge;
		delete this.modData('Learnsets', 'rotomfrost').learnset.voltswitch;
		delete this.modData('Learnsets', 'rotomfrost').learnset.thunderwave;
		delete this.modData('Learnsets', 'rotomfrost').learnset.charge;
		delete this.modData('Learnsets', 'rotomfrost').learnset.chargebeam;
		delete this.modData('Learnsets', 'rotomfrost').learnset.eerieimpulse;
		delete this.modData('Learnsets', 'rotomfrost').learnset.electricterrain;
		delete this.modData('Learnsets', 'rotomfrost').learnset.electroball;
		delete this.modData('Learnsets', 'rotomfrost').learnset.electroweb;
		delete this.modData('Learnsets', 'rotomfrost').learnset.risingvoltage;
		delete this.modData('Learnsets', 'rotomfrost').learnset.shockwave;
		delete this.modData('Learnsets', 'rotomfrost').learnset.thundershock;
		
		delete this.modData('Learnsets', 'slowkinggalar').learnset.expandingforce;
	},
	actions: {
		runMove(moveOrMoveName, pokemon, targetLoc, sourceEffect, zMove, externalMove, maxMove, originalTarget) {
			pokemon.activeMoveActions++;
			let target = this.battle.getTarget(pokemon, maxMove || zMove || moveOrMoveName, targetLoc, originalTarget);
			let baseMove = this.dex.getActiveMove(moveOrMoveName);
			const pranksterBoosted = baseMove.pranksterBoosted;
			if (baseMove.id !== 'struggle' && !zMove && !maxMove && !externalMove) {
				const changedMove = this.battle.runEvent('OverrideAction', pokemon, target, baseMove);
				if (changedMove && changedMove !== true) {
					baseMove = this.dex.getActiveMove(changedMove);
					if (pranksterBoosted) baseMove.pranksterBoosted = pranksterBoosted;
					target = this.battle.getRandomTarget(pokemon, baseMove);
				}
			}
			let move = baseMove;
			if (zMove) {
				move = this.getActiveZMove(baseMove, pokemon);
			} else if (maxMove) {
				move = this.getActiveMaxMove(baseMove, pokemon);
			}

			move.isExternal = externalMove;

			this.battle.setActiveMove(move, pokemon, target);

			/* if (pokemon.moveThisTurn) {
				// THIS IS PURELY A SANITY CHECK
				// DO NOT TAKE ADVANTAGE OF THIS TO PREVENT A POKEMON FROM MOVING;
				// USE this.queue.cancelMove INSTEAD
				this.debug('' + pokemon.id + ' INCONSISTENT STATE, ALREADY MOVED: ' + pokemon.moveThisTurn);
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
				this.battle.send('tutorialMove', `${pokemon.side.id}\n${move.id}`);
				return;
			}
			if (move.beforeMoveCallback) {
				if (move.beforeMoveCallback.call(this.battle, pokemon, target, move)) {
					this.battle.clearActiveMove(true);
					pokemon.moveThisTurnResult = false;
					this.battle.send('tutorialMove', `${pokemon.side.id}\n${move.id}`);
					return;
				}
			}
			pokemon.lastDamage = 0;
			let lockedMove;
			if (!externalMove) {
				lockedMove = this.battle.runEvent('LockMove', pokemon);
				if (lockedMove === true) lockedMove = false;
				if (!lockedMove) {
					if (!pokemon.deductPP(baseMove, null, target) && (move.id !== 'struggle')) {
						this.battle.add('cant', pokemon, 'nopp', move);
						this.battle.clearActiveMove(true);
						pokemon.moveThisTurnResult = false;
						this.battle.send('tutorialMove', `${pokemon.side.id}\n${move.id}`);
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
					this.battle.singleEvent('End', this.dex.abilities.get('Illusion'), pokemon.abilityData, pokemon);
				}
				this.battle.add('-zpower', pokemon);
				pokemon.side.zMoveUsed = true;
			}
			const moveDidSomething = this.useMove(baseMove, pokemon, target, sourceEffect, zMove, maxMove);
			this.battle.lastSuccessfulMoveThisTurn = moveDidSomething ? this.battle.activeMove && this.battle.activeMove.id : null;
			if (this.battle.activeMove) move = this.battle.activeMove;
			this.battle.singleEvent('AfterMove', move, null, pokemon, target, move);
			this.battle.runEvent('AfterMove', pokemon, target, move);
			this.battle.send('tutorialMove', `${pokemon.side.id}\n${move.id}`);

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
				for (const dancer of dancers) {
					if (this.battle.faintMessages()) break;
					if (dancer.fainted) continue;
					this.battle.add('-activate', dancer, 'ability: Dancer');
					const dancersTarget = !target!.isAlly(dancer) && pokemon.isAlly(dancer) ? target! : pokemon;
					const dancersTargetLoc = dancer.getLocOf(dancersTarget);
					this.runMove(move.id, dancer, dancersTargetLoc, this.dex.abilities.get('dancer'), undefined, true);
				}
			}
			if (noLock && pokemon.volatiles['lockedmove']) delete pokemon.volatiles['lockedmove'];
		},

		getZMove(move, pokemon, skipChecks) {
			const item = pokemon.getItem();
			const type = this.battle.getEffectiveType(move, pokemon);
			if (!skipChecks) {
				if (pokemon.side.zMoveUsed) return;
				if (!item.zMove) return;
				const moveData = pokemon.getMoveData(move);
				// Draining the PP of the base move prevents the corresponding Z-move from being used.
				if (!moveData?.pp) return;
			}
			if (item.zMoveSpecialMoves && !!item.zMoveSpecialMoves[pokemon.baseSpecies.baseSpecies] &&
					!item.itemUser?.includes(pokemon.species.name)) {
				const zMove = this.dex.moves.get(item.zMoveSpecialMoves[pokemon.baseSpecies.baseSpecies]);
				if (zMove.zMoveSpecialMoveFrom?.includes(move.name) ||
				zMove.zMoveSpecialType === type) return zMove.name;
			}
			if (typeof item.zMove === 'string') {
				if (item.itemUser && !item.itemUser.includes(pokemon.species.name)) return;
				if (item.zMoveFrom && move.name !== item.zMoveFrom) return;
				if (item.zMoveType && type !== item.zMoveType) return;
				if (item.zMoveCategory && this.battle.getCategory(move, pokemon) !== item.zMoveCategory) return;
				return item.zMove;
			} else if (item.zMove === true) {
				if (type === item.zMoveType) {
					if (move.category === "Status") {
						return move.name;
					} else if (move.zMove?.basePower) {
						return this.Z_MOVES[this.battle.getEffectiveType(move, pokemon)];
					}
				}
			}
		},

		getActiveZMove(move, pokemon) {
			if (move.category === 'Status') {
				const zMove = this.dex.getActiveMove(move);
				zMove.isZ = true;
				zMove.isZOrMaxPowered = true;
				return zMove;
			}

			// Get what the Z Move is supposed to be from the held item
			const zMoveName = this.getZMove(move, pokemon, true) || this.Z_MOVES[move.type];
			const zMove = this.dex.getActiveMove(this.dex.getActiveMove(zMoveName));

			// Non-unique Z Moves don't have a fixed BP or category
			zMove.basePower = move.zMove!.basePower!;
			zMove.category = move.category;

			// copy the priority for Quick Guard
			zMove.priority = move.priority;
			zMove.isZOrMaxPowered = true;
			return zMove;
		},

		canZMove(pokemon) {
			if (pokemon.side.zMoveUsed ||
				(pokemon.transformed &&
					(pokemon.species.isMega || pokemon.species.isPrimal || pokemon.species.forme === "Ultra"))
			) return;
			const item = pokemon.getItem();
			if (!item.zMove) return;
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

		runZPower(move, pokemon) {
			const zPower = this.dex.conditions.get('zpower');
			if (move.category !== 'Status') {
				this.battle.attrLastMove('[zeffect]');
			} else if (move.zMove?.boost) {
				this.battle.boost(move.zMove.boost, pokemon, pokemon, zPower);
			} else if (move.zMove?.effect) {
				switch (move.zMove.effect) {
				case 'heal':
					this.battle.heal(pokemon.maxhp, pokemon, pokemon, zPower);
					break;
				case 'healreplacement':
					move.self = {slotCondition: 'healreplacement'};
					break;
				case 'clearnegativeboost':
					const boosts: SparseBoostsTable = {};
					let i: BoostID;
					for (i in pokemon.boosts) {
						if (pokemon.boosts[i] < 0) {
							boosts[i] = 0;
						}
					}
					pokemon.setBoost(boosts);
					this.battle.add('-clearnegativeboost', pokemon, '[zeffect]');
					break;
				case 'redirect':
					pokemon.addVolatile('followme', pokemon, zPower);
					break;
				case 'crit2':
					pokemon.addVolatile('focusenergy', pokemon, zPower);
					break;
				case 'curse':
					if (pokemon.hasType('Ghost')) {
						this.battle.heal(pokemon.maxhp, pokemon, pokemon, zPower);
					} else {
						this.battle.boost({atk: 1}, pokemon, pokemon, zPower);
					}
				}
			}
		},
		hitStepBreakProtect(targets: Pokemon[], pokemon: Pokemon, move: ActiveMove) {
			if (move.breaksProtect) {
				for (const target of targets) {
					let broke = false;
					for (const effectid of [
						'banefulbunker', 'kingsshield', 'obstruct', 'protect', 'spikyshield', 'flowershield', 'shelltrap', 'craftyshield',
					]) {
						if (target.removeVolatile(effectid))
							broke = true;
					}
					if (this.battle.gen >= 6 || !target.isAlly(pokemon)) {
						for (const effectid of ['matblock', 'quickguard', 'wideguard']) {
							if (target.side.removeSideCondition(effectid)) broke = true;
						}
					}
					if (broke) {
						if (move.id === 'feint')
							this.battle.add('-activate', target, 'move: Feint');
						else if (this.dex.moves.get(move.id).breaksProtect)
							this.battle.add('-activate', target, 'move: ' + move.name, '[broken]');

						if (this.battle.gen >= 6) delete target.volatiles['stall'];
					}
				}
			}
			return undefined;
		},
	},
/*
		for (const id in this.dataCache.Pokedex) {
			const poke = this.dataCache.Pokedex[id];
			if (poke.restrictedLearnset) {
				console.log(this.toID(poke.name));
				const thisPoke = this.toID(poke.name);
				const learnset = this.dataCache.Learnsets[this.toID(poke.name)].learnset;
				for (const move in learnset) {
					console.log(thisPoke + " has " + move);
					const moveid = this.dataCache.Moves[move];
					if (moveid.isNonstandard) {
						console.log(moveid.isNonstandard);
						delete this.modData('Learnsets', thisPoke).learnset.moveid;
					}
				}
			}
		}
*/
};
