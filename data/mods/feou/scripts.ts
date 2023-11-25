export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	teambuilderConfig: {
        excludeStandardTiers: true,
        customTiers: ['FEOU', 'FENFE', 'FELC'],
	},
	actions: {
		inherit: true,
		canMegaEvo(pokemon) {
			const altForme = pokemon.baseSpecies.otherFormes && this.dex.species.get(pokemon.baseSpecies.otherFormes[0]);
			const item = pokemon.getItem();
			if (
				altForme?.isMega && altForme?.requiredMove &&
				pokemon.baseMoves.includes(this.dex.toID(altForme.requiredMove)) && !item.zMove
			) {
				return altForme.name;
			}
			switch (pokemon.baseSpecies.name) {
				case "Amphamence":
					if (item.name === "Salamencite") {
						return "Amphamence-Mega-X"; 
					}
					if (item.name === "Ampharosite") {
						return "Amphamence-Mega-Y"; 
					}
					break;
				case "Tyranix":
					if (item.name === "Tyranitarite") {
						return "Tyranix-Mega-X"; 
					}
					if (item.name === "Steelixite") {
						return "Tyranix-Mega-Y"; 
					}
					break;
				case "Mawlakazam":
					if (item.name === "Mawilite") {
						return "Mawlakazam-Mega-X"; 
					}
					if (item.name === "Alakazite") {
						return "Mawlakazam-Mega-Y"; 
					}
					break;
			}
			
			return item.megaStone;
		},
		canUltraBurst(pokemon) {
			if (['Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane'].includes(pokemon.baseSpecies.name) &&
				pokemon.getItem().id === 'ultranecroziumz') {
				return "Necrozma-Ultra";
			}
			if (['Necrotrik-Dawn-Wings'].includes(pokemon.baseSpecies.name) &&
				pokemon.getItem().id === 'depletedultranecroziumz') {
				return "Necrotrik-Ultra";
			}
			return null;
		},
		hitStepTryImmunity(targets, pokemon, move) {
			const hitResults = [];
			for (const [i, target] of targets.entries()) {
				if (/*this.battle.gen >= 6 && */move.flags['powder'] && target !== pokemon && !this.dex.getImmunity('powder', target)) {
					this.battle.debug('natural powder immunity');
				} else if (this.battle.singleEvent('TryImmunity', move, {}, target, pokemon, move)) {
					if (/*this.battle.gen >= 7 && */move.pranksterBoosted && !this.dex.getImmunity('prankster', target) && pokemon.hasAbility(['prankster','openingact'])
						 && !targets[i].isAlly(pokemon)) {
						this.battle.debug('natural prankster immunity');
						if (!target.illusion) this.battle.hint("Since gen 7, Dark is immune to Prankster moves.");
					} else {
						hitResults[i] = true;
						continue;
					}
				}
				this.battle.add('-immune', target);
				hitResults[i] = false;
			}
			return hitResults;
		}

  		runMove(
			moveOrMoveName: Move | string, pokemon: Pokemon, targetLoc: number, sourceEffect?: Effect | null,
			zMove?: string, externalMove?: boolean, maxMove?: string, originalTarget?: Pokemon
			) {
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
						if (!pokemon.deductPP(baseMove, null, target) && (move.id !== 'struggle')) {
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
					pokemon.side.zMoveUsed = true;
				}
		
				const oldActiveMove = move;
		
				const moveDidSomething = this.useMove(baseMove, pokemon, target, sourceEffect, zMove, maxMove);
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
						if (currentPoke.hasAbility('choreography') && !currentPoke.abilityState.choreography && !currentPoke.isSemiInvulnerable()) {
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
						this.battle.add('-activate', dancer, 'ability: Choreography');
						const dancersTarget = !targetOf1stDance.isAlly(dancer) && pokemon.isAlly(dancer) ?
							targetOf1stDance :
							pokemon;
						const dancersTargetLoc = dancer.getLocOf(dancersTarget);
						this.runMove(move.id, dancer, dancersTargetLoc, this.dex.abilities.get('choreography'), undefined, true);
						dancer.abilityState.choreography = true;
					}
				}
				if (noLock && pokemon.volatiles['lockedmove']) delete pokemon.volatiles['lockedmove'];
				this.battle.faintMessages();
				this.battle.checkWin();
			},

		/*
			useMoveInner(moveOrMoveName, pokemon, target, sourceEffect, zMove, maxMove) {
				if (!sourceEffect && this.battle.effect.id) sourceEffect = this.battle.effect;
				if (sourceEffect && ['instruct', 'custapberry'].includes(sourceEffect.id)) sourceEffect = null;
		
				let move = this.dex.getActiveMove(moveOrMoveName);
				pokemon.lastMoveUsed = move;
				if (move.id === 'weatherball' && zMove) {
					// Z-Weather Ball only changes types if it's used directly,
					// not if it's called by Z-Sleep Talk or something.
					this.battle.singleEvent('ModifyType', move, null, pokemon, target, move, move);
					if (move.type !== 'Normal') sourceEffect = move;
				}
				if (zMove || (move.category !== 'Status' && sourceEffect && (sourceEffect as ActiveMove).isZ)) {
					move = this.getActiveZMove(move, pokemon);
				}
				if (maxMove && move.category !== 'Status') {
					// Max move outcome is dependent on the move type after type modifications from ability and the move itself
					this.battle.singleEvent('ModifyType', move, null, pokemon, target, move, move);
					this.battle.runEvent('ModifyType', pokemon, target, move, move);
				}
				if (maxMove || (move.category !== 'Status' && sourceEffect && (sourceEffect as ActiveMove).isMax)) {
					move = this.getActiveMaxMove(move, pokemon);
				}
		
				if (this.battle.activeMove) {
					move.priority = this.battle.activeMove.priority;
					if (!move.hasBounced) move.pranksterBoosted = this.battle.activeMove.pranksterBoosted;
				}
				const baseTarget = move.target;
				let targetRelayVar = {target};
				targetRelayVar = this.battle.runEvent('ModifyTarget', pokemon, target, move, targetRelayVar, true);
				if (targetRelayVar.target !== undefined) target = targetRelayVar.target;
				if (target === undefined) target = this.battle.getRandomTarget(pokemon, move);
				if (move.target === 'self' || move.target === 'allies') {
					target = pokemon;
				}
				if (sourceEffect) {
					move.sourceEffect = sourceEffect.id;
					move.ignoreAbility = (sourceEffect as ActiveMove).ignoreAbility;
				}
				let moveResult = false;
		
				this.battle.setActiveMove(move, pokemon, target);
		
				this.battle.singleEvent('ModifyType', move, null, pokemon, target, move, move);
				this.battle.singleEvent('ModifyMove', move, null, pokemon, target, move, move);
				if (baseTarget !== move.target) {
					// Target changed in ModifyMove, so we must adjust it here
					// Adjust before the next event so the correct target is passed to the
					// event
					target = this.battle.getRandomTarget(pokemon, move);
				}
				move = this.battle.runEvent('ModifyType', pokemon, target, move, move);
				move = this.battle.runEvent('ModifyMove', pokemon, target, move, move);
				if (baseTarget !== move.target) {
					// Adjust again
					target = this.battle.getRandomTarget(pokemon, move);
				}
				if (!move || pokemon.fainted) {
					return false;
				}
		
				let attrs = '';
		
				let movename = move.name;
				if (move.id === 'hiddenpower') movename = 'Hidden Power';
				if (sourceEffect) attrs += `|[from]${sourceEffect.fullname}`;
				if (zMove && move.isZ === true) {
					attrs = '|[anim]' + movename + attrs;
					movename = 'Z-' + movename;
				}
				this.battle.addMove('move', pokemon, movename, target + attrs);
		
				if (zMove) this.runZPower(move, pokemon);
		
				if (!target) {
					this.battle.attrLastMove('[notarget]');
					//this.battle.add(this.battle.gen >= 5 ? '-fail' : '-notarget', pokemon);
					this.battle.add('-fail', pokemon);
					return false;
				}
		
				const {targets, pressureTargets} = pokemon.getMoveTargets(move, target);
				if (targets.length) {
					target = targets[targets.length - 1]; // in case of redirection
				}
		
				const callerMoveForPressure = sourceEffect && (sourceEffect as ActiveMove).pp ? sourceEffect as ActiveMove : null;
				if (!sourceEffect || callerMoveForPressure || sourceEffect.id === 'pursuit') {
					let extraPP = 0;
					for (const source of pressureTargets) {
						const ppDrop = this.battle.runEvent('DeductPP', source, pokemon, move);
						if (ppDrop !== true) {
							extraPP += ppDrop || 0;
						}
					}
					if (extraPP > 0) {
						pokemon.deductPP(callerMoveForPressure || moveOrMoveName, extraPP);
					}
				}
		
				if (!this.battle.singleEvent('TryMove', move, null, pokemon, target, move) ||
					!this.battle.runEvent('TryMove', pokemon, target, move)) {
					move.mindBlownRecoil = false;
					return false;
				}
		
				this.battle.singleEvent('UseMoveMessage', move, null, pokemon, target, move);
		
				if (move.ignoreImmunity === undefined) {
					move.ignoreImmunity = (move.category === 'Status');
				}
		
				//if (this.battle.gen !== 4 && move.selfdestruct === 'always') {
				if (move.selfdestruct === 'always') {
					this.battle.faint(pokemon, pokemon, move);
				}
		
				let damage: number | false | undefined | '' = false;
				if (['all','foeSide','allySide','allyTeam'].includes(move.target)) {
					damage = this.tryMoveHit(targets, pokemon, move);
					if (damage === this.battle.NOT_FAIL) pokemon.moveThisTurnResult = null;
					if (damage || damage === 0 || damage === undefined) moveResult = true;
				} else {
					if (!targets.length) {
						this.battle.attrLastMove('[notarget]');
						//this.battle.add(this.battle.gen >= 5 ? '-fail' : '-notarget', pokemon);
						this.battle.add('-fail', pokemon);
						return false;
					}
					//if (this.battle.gen === 4 && move.selfdestruct === 'always') {
					//	this.battle.faint(pokemon, pokemon, move);
					//}
					moveResult = this.trySpreadMoveHit(targets, pokemon, move);
				}
				if (move.selfBoost && moveResult) this.moveHit(pokemon, pokemon, move, move.selfBoost, false, true);
				if (!pokemon.hp) {
					this.battle.faint(pokemon, pokemon, move);
				}
		
				if (!moveResult) {
					this.battle.singleEvent('MoveFail', move, null, target, pokemon, move);
					return false;
				}
		
				if (
					!move.negateSecondary &&
					!(move.hasSheerForce && pokemon.hasAbility(['sheerforce','forceofnature','sandwrath'])) &&
					!move.flags['futuremove']
				) {
					const originalHp = pokemon.hp;
					this.battle.singleEvent('AfterMoveSecondarySelf', move, null, pokemon, target, move);
					this.battle.runEvent('AfterMoveSecondarySelf', pokemon, target, move);
					if (pokemon && pokemon !== target && move.category !== 'Status' && pokemon.hp <= pokemon.maxhp / 2 && originalHp > pokemon.maxhp / 2) {
						this.battle.runEvent('EmergencyExit', pokemon, pokemon);
					}
				}
		
				return true;
			}
  		*/
	},
	pokemon: { 
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
					this.battle.add('-immune', this, '[from] ability: ' + getAbility().name);
				} else {
					this.battle.add('-immune', this);
				}
			}
			return false;
		},
		isGrounded(negateImmunity = false) {
			if ('gravity' in this.battle.field.pseudoWeather) return true;
			if ('ingrain' in this.volatiles/* && this.battle.gen >= 4*/) return true;
			if ('smackdown' in this.volatiles) return true;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return true;
			// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
			if (!negateImmunity && this.hasType('Flying') && !('roost' in this.volatiles)) return false;
			if (
				(this.hasAbility(['levitate', 'holygrail', 'risingtension', 'freeflight', 'airbornearmor', 'hellkite','honeymoon','aircontrol'])) &&
				!this.battle.suppressingAbility(this)
			) return null;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			return item !== 'airballoon';
		 },
     },
};
