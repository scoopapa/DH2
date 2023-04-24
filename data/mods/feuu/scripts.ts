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
						if (this.dataCache.Moves[moveid].isNonstandard === 'Past') continue; //exclude dexited moves (I hope!) 
						this.modData('Learnsets', id).learnset[moveid] = ['8L1'];//all moves are compatible with the fusion's only ability, so just set it to 8L1
					}
				}
			}
		}
		
		//Now, case-by-case learnset revisions: 
		//Behemoth Bash and Behemoth Blade are added automatically to the Crowned dogs somewhere,
		//so we will simulate that here, instead of actually editing that. 
		this.modData('Learnsets', 'yaciancrowned').learnset.behemothblade = ['7L1'];
		this.modData('Learnsets', 'igglyzentacrowned').learnset.behemothbash = ['7L1'];
		this.modData('Learnsets', 'nozedawnwings').learnset.moongeistbeam = ['7L1'];
		this.modData('Learnsets', 'phancrozmadawnwings').learnset.moongeistbeam = ['7L1'];
		this.modData('Learnsets', 'tyranetteeternal').learnset.lightofruin = ['7L1'];
		this.modData('Learnsets', 'monferpaunbound').learnset.hyperspacefury = ['7L1'];
		this.modData('Learnsets', 'hoopagigasunbound').learnset.hyperspacefury = ['7L1'];
		this.modData('Learnsets', 'rotofable').learnset.overheat = ['7L1'];
		this.modData('Learnsets', 'appletomwash').learnset.hydropump = ['7L1'];
		this.modData('Learnsets', 'igglyciancrowned').learnset.behemothblade = ['7L1'];
		delete this.modData('Learnsets', 'yaciancrowned').learnset.ironhead;
		delete this.modData('Learnsets', 'igglyzentacrowned').learnset.ironhead;
		delete this.modData('Learnsets', 'igglyciancrowned').learnset.ironhead;
	},
	
	teambuilderConfig: {
        // for micrometas to only show custom tiers
        excludeStandardTiers: true,
        // only to specify the order of custom tiers
        customTiers: ['FEUU', 'FERUBL', 'FERU', 'FENU', 'Bugged', 'FENFE', 'FELC', 'Forms', 'FEUUber'],
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
/*
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Bug") {
			return "Silvino-Bug-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Dark") {
			return "Silvino-Dark-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Dragon") {
			return "Silvino-Dragon-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Electric") {
			return "Silvino-Electric-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Fairy") {
			return "Silvino-Fairy-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Fighting") {
			return "Silvino-Fighting-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Fire") {
			return "Silvino-Fire-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Flying") {
			return "Silvino-Flying-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Ghost") {
			return "Silvino-Ghost-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Grass") {
			return "Silvino-Grass-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Ground") {
			return "Silvino-Ground-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Ice") {
			return "Silvino-Ice-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Poison") {
			return "Silvino-Poison-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Psychic") {
			return "Silvino-Psychic-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Rock") {
			return "Silvino-Rock-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Steel") {
			return "Silvino-Steel-Mega";
		}
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Silvino-Water") {
			return "Silvino-Water-Mega";
		}
	*/
		if (item.name === "Sablenite" && pokemon.baseSpecies.name === "Absable") {
			return "Absable-Mega-Y"; 
		}
		
		if (item.name === "Sablenite" && pokemon.baseSpecies.name === "Sablemime") {
			return "Sablemime-Mega"; 
		}
		
		if (item.name === "Sablenite" && pokemon.baseSpecies.name === "Sableior-Meteor") {
			return "Sableior-Meteor-Mega"; 
		}
		
		if (item.name === "Tyranitarite" && pokemon.baseSpecies.name === "Goatitar") {
			return "Goatitar-Mega"; 
		}
		
		if (item.name === "Mawilite" && pokemon.baseSpecies.name === "Duramaw") {
			return "Duramaw-Mega"; 
		}
	
		if (item.name === "Gardevoirite" && pokemon.baseSpecies.name === "Goodevoir") {
			return "Goodevoir-Mega"; 
		}
		
		if (item.name === "Audinite" && pokemon.baseSpecies.name === "Audiyem") {
			return "Audiyem-Mega"; 
		}
		if (item.name === "Heracronite" && pokemon.baseSpecies.name === "Cleracross") {
			return "Cleracross-Mega"; 
		}
		if (item.name === "Garchompite" && pokemon.baseSpecies.name === "Rhychomp") {
			return "Rhychomp-Mega"; 
		}
		if (item.name === "Medichamite" && pokemon.baseSpecies.name === "Gastrocham") {
			return "Gastrocham-Mega"; 
		}
		if (item.name === "Heracronite" && pokemon.baseSpecies.name === "Herasir") {
			return "Herasir-Mega-X"; 
		}
		if (item.name === "Pinsirite" && pokemon.baseSpecies.name === "Herasir") {
			return "Herasir-Mega-Y"; 
		}
		if (item.name === "Cameruptite" && pokemon.baseSpecies.name === "Wishirupti") {
			return "Wishirupti-Mega"; 
		}
		if (item.name === "Cameruptite" && pokemon.baseSpecies.name === "Wishirupti-School") {
			return "Wishirupti-School-Mega"; 
		}
		if (item.name === "Swampertite" && pokemon.baseSpecies.name === "Impert-Female") {
			return "Impert-Female-Mega"; 
		}
		if (item.name === "Salamencite" && pokemon.baseSpecies.name === "Salasian-Alola") {
			return "Salasian-Alola-Mega"; 
		}
		
		return item.megaStone;
	},
	
	runMove(moveOrMoveName, pokemon, targetLoc, sourceEffect, zMove, externalMove, maxMove, originalTarget) {
		pokemon.activeMoveActions++;
		let target = this.getTarget(pokemon, maxMove || zMove || moveOrMoveName, targetLoc, originalTarget);
		let baseMove = this.dex.getActiveMove(moveOrMoveName);
		const pranksterBoosted = baseMove.pranksterBoosted;
		if (baseMove.id !== 'struggle' && !zMove && !maxMove && !externalMove) {
			const changedMove = this.runEvent('OverrideAction', pokemon, target, baseMove);
			if (changedMove && changedMove !== true) {
				baseMove = this.dex.getActiveMove(changedMove);
				if (pranksterBoosted) baseMove.pranksterBoosted = pranksterBoosted;
				target = this.getRandomTarget(pokemon, baseMove);
			}
		}
		let move = baseMove;
		if (zMove) {
			move = this.getActiveZMove(baseMove, pokemon);
		} else if (maxMove) {
			move = this.getActiveMaxMove(baseMove, pokemon);
		}

		move.isExternal = externalMove;

		this.setActiveMove(move, pokemon, target);

		/* if (pokemon.moveThisTurn) {
			// THIS IS PURELY A SANITY CHECK
			// DO NOT TAKE ADVANTAGE OF THIS TO PREVENT A POKEMON FROM MOVING;
			// USE this.queue.cancelMove INSTEAD
			this.debug('' + pokemon.id + ' INCONSISTENT STATE, ALREADY MOVED: ' + pokemon.moveThisTurn);
			this.clearActiveMove(true);
			return;
		} */
		const willTryMove = this.runEvent('BeforeMove', pokemon, target, move);
		if (!willTryMove) {
			this.runEvent('MoveAborted', pokemon, target, move);
			this.clearActiveMove(true);
			// The event 'BeforeMove' could have returned false or null
			// false indicates that this counts as a move failing for the purpose of calculating Stomping Tantrum's base power
			// null indicates the opposite, as the Pokemon didn't have an option to choose anything
			pokemon.moveThisTurnResult = willTryMove;
			return;
		}
		if (move.beforeMoveCallback) {
			if (move.beforeMoveCallback.call(this, pokemon, target, move)) {
				this.clearActiveMove(true);
				pokemon.moveThisTurnResult = false;
				return;
			}
		}
		pokemon.lastDamage = 0;
		let lockedMove;
		if (!externalMove) {
			lockedMove = this.runEvent('LockMove', pokemon);
			if (lockedMove === true) lockedMove = false;
			if (!lockedMove) {
				if (!pokemon.deductPP(baseMove, null, target) && (move.id !== 'struggle')) {
					this.add('cant', pokemon, 'nopp', move);
					const gameConsole = [
						null, 'Game Boy', 'Game Boy Color', 'Game Boy Advance', 'DS', 'DS', '3DS', '3DS',
					][this.gen] || 'Switch';
					this.hint(`This is not a bug, this is really how it works on the ${gameConsole}; try it yourself if you don't believe us.`);
					this.clearActiveMove(true);
					pokemon.moveThisTurnResult = false;
					return;
				}
			} else {
				sourceEffect = this.dex.getEffect('lockedmove');
			}
			pokemon.moveUsed(move, targetLoc);
		}

		// Dancer Petal Dance hack
		// TODO: implement properly
		const noLock = externalMove && !pokemon.volatiles['lockedmove'];

		if (zMove) {
			if (pokemon.illusion) {
				this.singleEvent('End', this.dex.getAbility('Illusion'), pokemon.abilityData, pokemon);
			}
			this.add('-zpower', pokemon);
			pokemon.side.zMoveUsed = true;
		}
		const moveDidSomething = this.useMove(baseMove, pokemon, target, sourceEffect, zMove, maxMove);
		this.lastSuccessfulMoveThisTurn = moveDidSomething ? this.activeMove && this.activeMove.id : null;
		if (this.activeMove) move = this.activeMove;
		this.singleEvent('AfterMove', move, null, pokemon, target, move);
		this.runEvent('AfterMove', pokemon, target, move);

		// Dancer's activation order is completely different from any other event, so it's handled separately
		if (moveDidSomething && !move.isExternal) {
			const dancers = [];
			for (const currentPoke of this.getAllActive()) {
				if (pokemon === currentPoke) continue;
				if (!currentPoke.isSemiInvulnerable() && (move.flags['dance'] && currentPoke.hasAbility('dancer')) || (move.category === 'Status' && currentPoke.hasAbility('parroting'))) {
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
				if (this.faintMessages()) break;
				if (dancer.fainted) continue;
				const dancersTarget = target!.side !== dancer.side && pokemon.side === dancer.side ? target! : pokemon;
				this.runMove(move.id, dancer, this.getTargetLoc(dancersTarget, dancer), this.dex.getAbility(dancer.ability), undefined, true);
			}
		}
		if (noLock && pokemon.volatiles['lockedmove']) delete pokemon.volatiles['lockedmove'];
	},

	pokemon: {
		//Included for abilities that make the user non-grounded:
		//Levitate is checked for when running groundedness (ground immunity, iron ball, etc)
		//So we manually add a check for Magnetic Waves here as well,
		//Including a diffrent activation message 
		//so that the game doesn't report it as having Levitate when it procs.
		//AFFECTED ABILITIES: Magnetic Waves, Leviflame, Levitability
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
						} else if (this.hasAbility('leviflame')) {
							this.battle.add('-immune', this, '[from] ability: Leviflame');
						} else if (this.hasAbility('levitability')) {
							this.battle.add('-immune', this, '[from] ability: Levitability');
						} else if (this.hasAbility('stickyfloat')) {
							this.battle.add('-immune', this, '[from] ability: Sticky Float');
						} else if (this.hasAbility('etativel')) {
							this.battle.add('-immune', this, '[from] ability: Etativel');
						} else if (this.hasAbility('lighthearted')) {
							this.battle.add('-immune', this, '[from] ability: Lighthearted');
						} else if (this.hasAbility('clearlyfloating')) {
							this.battle.add('-immune', this, '[from] ability: Clearly Floating');
						} else if (this.hasAbility('floatguise')) {
							this.battle.add('-immune', this, '[from] ability: Float Guise');
						} else if (this.hasAbility('aerialbreak')) {
							this.battle.add('-immune', this, '[from] ability: Aerial Break');
						} else if (this.hasAbility('levimetal')) {
							this.battle.add('-immune', this, '[from] ability: Levimetal');
						} else if (this.hasAbility('hoverboard')) {
							this.battle.add('-immune', this, '[from] ability: Hoverboard');
						} else if (this.hasAbility('levistatic')) {
							this.battle.add('-immune', this, '[from] ability: Levistatic');
						} else if (this.hasAbility('lovelessfloat')) {
							this.battle.add('-immune', this, '[from] ability: Loveless Float');
						} else if (this.hasAbility('ghoulaway')) {
							this.battle.add('-immune', this, '[from] ability: Ghoul Away');
						} else if (this.hasAbility('spiritascent')) {
							this.battle.add('-immune', this, '[from] ability: Spirit Ascent');
						} else if (this.hasAbility('testcram')) {
							this.battle.add('-immune', this, '[from] ability: Test Cram');
						} else if (this.hasAbility('floatingreach')) {
							this.battle.add('-immune', this, '[from] ability: Floating Reach');
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
			if (
				(this.hasAbility('levitate') ||
				this.hasAbility('magneticwaves') ||
				this.hasAbility('leviflame') ||
				this.hasAbility('levitability') || 
				this.hasAbility('stickyfloat') || 
				this.hasAbility('etativel') || 
				this.hasAbility('lighthearted') || 
				this.hasAbility('clearlyfloating') || 
				this.hasAbility('floatguise') || 
				this.hasAbility('aerialbreak') || 
				this.hasAbility('levimetal') || 
				this.hasAbility('hoverboard') || 
				this.hasAbility('levistatic') || 
				this.hasAbility('ghoulaway') || 
				this.hasAbility('spiritascent') ||
				this.hasAbility('testcram') ||
				this.hasAbility('floatingreach') ||
				this.hasAbility('lovelessfloat')) &&
				
				!this.battle.suppressingAttackEvents()
			) return null;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			return item !== 'airballoon';
		},
		
		
        ignoringAbility() {
            // Check if any active pokemon have the ability Neutralizing Gas
            let neutralizinggas = false;
            let lemegeton = false;
            for (const pokemon of this.battle.getAllActive()) {
                // can't use hasAbility because it would lead to infinite recursion
                if (pokemon.ability === ('neutralizinggas' as ID) || (pokemon.ability === ('lemegeton' as ID) && !pokemon.volatiles['gastroacid'] && !pokemon.abilityData.ending)) {
                    neutralizinggas = true;
                    lemegeton = true;
                    break;
                }
            }

            return !!(
                (this.battle.gen >= 5 && !this.isActive) ||
                ((this.volatiles['gastroacid'] || (neutralizinggas && this.ability !== ('neutralizinggas' as ID)) || (lemegeton && this.ability !== ('lemegeton' as ID)) ) &&
                !this.getAbility().isPermanent
                )
            );
        },
		
		setStatus(
        status: string | Condition,
        source: Pokemon | null = null,
        sourceEffect: Effect | null = null,
        ignoreImmunities = false
    ) {
			  if (!this.hp) return false;
			  status = this.battle.dex.getEffect(status);
			  if (this.battle.event) {
					if (!source) source = this.battle.event.source;
					if (!sourceEffect) sourceEffect = this.battle.effect;
			  }
			  if (!source) source = this;

			  if (this.status === status.id) {
					if ((sourceEffect as Move)?.status === this.status) {
						 this.battle.add('-fail', this, this.status);
					} else if ((sourceEffect as Move)?.status) {
						 this.battle.add('-fail', source);
						 this.battle.attrLastMove('[still]');
					}
					return false;
			  }

			  if (!ignoreImmunities && status.id &&
						 !(source?.hasAbility(['corrosion', 'toxicplay', 'deadlydeft']) && ['tox', 'psn'].includes(status.id))) {
					// the game currently never ignores immunities
					if (!this.runStatusImmunity(status.id === 'tox' ? 'psn' : status.id)) {
						 this.battle.debug('immune to status');
						 if ((sourceEffect as Move)?.status) {
							  this.battle.add('-immune', this);
						 }
						 return false;
					}
			  }
			  const prevStatus = this.status;
			  const prevStatusData = this.statusData;
			  if (status.id) {
					const result: boolean = this.battle.runEvent('SetStatus', this, source, sourceEffect, status);
					if (!result) {
						 this.battle.debug('set status [' + status.id + '] interrupted');
						 return result;
					}
			  }

			  this.status = status.id;
			  this.statusData = {id: status.id, target: this};
			  if (source) this.statusData.source = source;
			  if (status.duration) this.statusData.duration = status.duration;
			  if (status.durationCallback) {
					this.statusData.duration = status.durationCallback.call(this.battle, this, source, sourceEffect);
			  }

			  if (status.id && !this.battle.singleEvent('Start', status, this.statusData, this, source, sourceEffect)) {
					this.battle.debug('status start [' + status.id + '] interrupted');
					// cancel the setstatus
					this.status = prevStatus;
					this.statusData = prevStatusData;
					return false;
			  }
			  if (status.id && !this.battle.runEvent('AfterSetStatus', this, source, sourceEffect, status)) {
					return false;
			  }
			  return true;
        }
    },
	
	
		//Included for Gutsy Jaw:
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

			if (pokemon.status === 'brn' && move.category === 'Physical' && !(pokemon.hasAbility('guts') || pokemon.hasAbility('gutsyjaw') || pokemon.hasAbility('wetfilling') || pokemon.hasAbility('rumenramming') || pokemon.hasAbility('gutsguard') || pokemon.hasAbility('courageous') || pokemon.hasAbility('ultraimpulse') || pokemon.hasAbility('phoenicoid'))) {
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
		},
		
		cureStatus(silent = false) {
			if (!this.hp || !this.status) return false;
			this.battle.add('-curestatus', this, this.status, silent ? '[silent]' : '[msg]');
			if (this.status === 'slp' && !this.hasAbility('comatose') && this.removeVolatile('nightmare')) {
				this.battle.add('-end', this, 'Nightmare', '[silent]');
			}
			this.setStatus('');
			delete this.m.orbItemStatus;
			return true;
		},
	
	//Something something Life Orb Sheer Force
	//Wow, this sucks
	useMoveInner(moveOrMoveName, pokemon, target, sourceEffect, zMove, maxMove) {
		if (!sourceEffect && this.effect.id) sourceEffect = this.effect;
		if (sourceEffect && ['instruct', 'custapberry'].includes(sourceEffect.id)) sourceEffect = null;

		let move = this.dex.getActiveMove(moveOrMoveName);
		if (move.id === 'weatherball' && zMove) {
			// Z-Weather Ball only changes types if it's used directly,
			// not if it's called by Z-Sleep Talk or something.
			this.singleEvent('ModifyType', move, null, pokemon, target, move, move);
			if (move.type !== 'Normal') sourceEffect = move;
		}
		if (zMove || (move.category !== 'Status' && sourceEffect && (sourceEffect as ActiveMove).isZ)) {
			move = this.getActiveZMove(move, pokemon);
		}
		if (maxMove && move.category !== 'Status') {
			// Max move outcome is dependent on the move type after type modifications from ability and the move itself
			this.singleEvent('ModifyType', move, null, pokemon, target, move, move);
			this.runEvent('ModifyType', pokemon, target, move, move);
		}
		if (maxMove || (move.category !== 'Status' && sourceEffect && (sourceEffect as ActiveMove).isMax)) {
			move = this.getActiveMaxMove(move, pokemon);
		}

		if (this.activeMove) {
			move.priority = this.activeMove.priority;
			if (!move.hasBounced) move.pranksterBoosted = this.activeMove.pranksterBoosted;
		}
		const baseTarget = move.target;
		if (target === undefined) target = this.getRandomTarget(pokemon, move);
		if (move.target === 'self' || move.target === 'allies') {
			target = pokemon;
		}
		if (sourceEffect) {
			move.sourceEffect = sourceEffect.id;
			move.ignoreAbility = false;
		}
		let moveResult = false;

		this.setActiveMove(move, pokemon, target);

		this.singleEvent('ModifyType', move, null, pokemon, target, move, move);
		this.singleEvent('ModifyMove', move, null, pokemon, target, move, move);
		if (baseTarget !== move.target) {
			// Target changed in ModifyMove, so we must adjust it here
			// Adjust before the next event so the correct target is passed to the
			// event
			target = this.getRandomTarget(pokemon, move);
		}
		move = this.runEvent('ModifyType', pokemon, target, move, move);
		move = this.runEvent('ModifyMove', pokemon, target, move, move);
		if (baseTarget !== move.target) {
			// Adjust again
			target = this.getRandomTarget(pokemon, move);
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
		this.addMove('move', pokemon, movename, target + attrs);

		if (zMove) this.runZPower(move, pokemon);

		if (!target) {
			this.attrLastMove('[notarget]');
			this.add(this.gen >= 5 ? '-fail' : '-notarget', pokemon);
			return false;
		}

		const {targets, pressureTargets} = pokemon.getMoveTargets(move, target);
		if (targets.length) {
			target = targets[targets.length - 1]; // in case of redirection
		}

		if (!sourceEffect || sourceEffect.id === 'pursuit') {
			let extraPP = 0;
			for (const source of pressureTargets) {
				const ppDrop = this.runEvent('DeductPP', source, pokemon, move);
				if (ppDrop !== true) {
					extraPP += ppDrop || 0;
				}
			}
			if (extraPP > 0) {
				pokemon.deductPP(move, extraPP);
			}
		}

		if (!this.singleEvent('TryMove', move, null, pokemon, target, move) ||
			!this.runEvent('TryMove', pokemon, target, move)) {
			move.mindBlownRecoil = false;
			return false;
		}

		this.singleEvent('UseMoveMessage', move, null, pokemon, target, move);

		if (move.ignoreImmunity === undefined) {
			move.ignoreImmunity = (move.category === 'Status');
		}

		if (this.gen !== 4 && move.selfdestruct === 'always') {
			this.faint(pokemon, pokemon, move);
		}

		let damage: number | false | undefined | '' = false;
		if (move.target === 'all' || move.target === 'foeSide' || move.target === 'allySide' || move.target === 'allyTeam') {
			damage = this.tryMoveHit(target, pokemon, move);
			if (damage === this.NOT_FAIL) pokemon.moveThisTurnResult = null;
			if (damage || damage === 0 || damage === undefined) moveResult = true;
		} else {
			if (!targets.length) {
				this.attrLastMove('[notarget]');
				this.add(this.gen >= 5 ? '-fail' : '-notarget', pokemon);
				return false;
			}
			if (this.gen === 4 && move.selfdestruct === 'always') {
				this.faint(pokemon, pokemon, move);
			}
			moveResult = this.trySpreadMoveHit(targets, pokemon, move);
		}
		if (move.selfBoost && moveResult) this.moveHit(pokemon, pokemon, move, move.selfBoost, false, true);
		if (!pokemon.hp) {
			this.faint(pokemon, pokemon, move);
		}

		if (!moveResult) {
			this.singleEvent('MoveFail', move, null, target, pokemon, move);
			return false;
		}
		//Right here
		if (!move.negateSecondary && !(move.hasSheerForce && (pokemon.hasAbility('terrorizer') || pokemon.hasAbility('monarchyenforcement') || pokemon.hasAbility('hydraulicpress') || pokemon.hasAbility('noproprioception') || pokemon.hasAbility('versatility') || pokemon.hasAbility('thickskull') || pokemon.hasAbility('sheerluck') || pokemon.hasAbility('hydroforce'))) && !(pokemon.hasAbility('sheerluck') && move.critRatio > 1)) {
			const originalHp = pokemon.hp;
			this.singleEvent('AfterMoveSecondarySelf', move, null, pokemon, target, move);
			this.runEvent('AfterMoveSecondarySelf', pokemon, target, move);
			if (pokemon && pokemon !== target && move.category !== 'Status') {
				if (pokemon.hp <= pokemon.maxhp / 2 && originalHp > pokemon.maxhp / 2) {
					this.runEvent('EmergencyExit', pokemon, pokemon);
				}
			}
		}

		return true;
	},
	afterMoveSecondaryEvent(targets, pokemon, move) {
		// console.log(`${targets}, ${pokemon}, ${move}`)
		if (!move.negateSecondary && !(move.hasSheerForce && (pokemon.hasAbility('terrorizer') || pokemon.hasAbility('monarchyenforcement') || pokemon.hasAbility('hydraulicpress') || pokemon.hasAbility('noproprioception') || pokemon.hasAbility('versatility') || pokemon.hasAbility('thickskull') || pokemon.hasAbility('sheerluck'))) && !(pokemon.hasAbility('sheerluck') && move.critRatio > 1)) {
			this.singleEvent('AfterMoveSecondary', move, null, targets[0], pokemon, move);
			this.runEvent('AfterMoveSecondary', targets, pokemon, move);
		}
		return undefined;
	},
	hitStepMoveHitLoop(targets, pokemon, move) { // Temporary name
		const damage: (number | boolean | undefined)[] = [];
		for (const i of targets.keys()) {
			damage[i] = 0;
		}
		move.totalDamage = 0;
		pokemon.lastDamage = 0;
		let targetHits = move.multihit || 1;
		if (Array.isArray(targetHits)) {
			// yes, it's hardcoded... meh
			if (targetHits[0] === 2 && targetHits[1] === 5) {
				if (this.gen >= 5) {
					// 35-35-15-15 out of 100 for 2-3-4-5 hits
					targetHits = this.sample([2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5]);
				} else {
					targetHits = this.sample([2, 2, 2, 3, 3, 3, 4, 5]);
				}
			} else {
				targetHits = this.random(targetHits[0], targetHits[1] + 1);
			}
		}
		targetHits = Math.floor(targetHits);
		let nullDamage = true;
		let moveDamage: (number | boolean | undefined)[];
		// There is no need to recursively check the ´sleepUsable´ flag as Sleep Talk can only be used while asleep.
		const isSleepUsable = move.sleepUsable || this.dex.getMove(move.sourceEffect).sleepUsable;

		let targetsCopy: (Pokemon | false | null)[] = targets.slice(0);
		let hit: number;
		for (hit = 1; hit <= targetHits; hit++) {
			if (damage.includes(false)) break;
			if (hit > 1 && pokemon.status === 'slp' && !isSleepUsable) break;
			if (targets.every(target => !target || !target.hp)) break;
			move.hit = hit;
			if (move.smartTarget && targets.length > 1) {
				targetsCopy = [targets[hit - 1]];
			} else {
				targetsCopy = targets.slice(0);
			}
			const target = targetsCopy[0]; // some relevant-to-single-target-moves-only things are hardcoded
			if (target && typeof move.smartTarget === 'boolean') {
				if (hit > 1) {
					this.addMove('-anim', pokemon, move.name, target);
				} else {
					this.retargetLastMove(target);
				}
			}

			// like this (Triple Kick)
			if (target && move.multiaccuracy && hit > 1) {
				let accuracy = move.accuracy;
				const boostTable = [1, 4 / 3, 5 / 3, 2, 7 / 3, 8 / 3, 3];
				if (accuracy !== true) {
					if (!move.ignoreAccuracy) {
						const boosts = this.runEvent('ModifyBoost', pokemon, null, null, {...pokemon.boosts});
						const boost = this.clampIntRange(boosts['accuracy'], -6, 6);
						if (boost > 0) {
							accuracy *= boostTable[boost];
						} else {
							accuracy /= boostTable[-boost];
						}
					}
					if (!move.ignoreEvasion) {
						const boosts = this.runEvent('ModifyBoost', target, null, null, {...target.boosts});
						const boost = this.clampIntRange(boosts['evasion'], -6, 6);
						if (boost > 0) {
							accuracy /= boostTable[boost];
						} else if (boost < 0) {
							accuracy *= boostTable[-boost];
						}
					}
				}
				accuracy = this.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
				if (!move.alwaysHit) {
					accuracy = this.runEvent('Accuracy', target, pokemon, move, accuracy);
					if (accuracy !== true && !this.randomChance(accuracy, 100)) break;
				}
			}

			const moveData = move;
			if (!moveData.flags) moveData.flags = {};

			// Modifies targetsCopy (which is why it's a copy)
			[moveDamage, targetsCopy] = this.spreadMoveHit(targetsCopy, pokemon, move, moveData);

			if (!moveDamage.some(val => val !== false)) break;
			nullDamage = false;

			for (const [i, md] of moveDamage.entries()) {
				// Damage from each hit is individually counted for the
				// purposes of Counter, Metal Burst, and Mirror Coat.
				damage[i] = md === true || !md ? 0 : md;
				// Total damage dealt is accumulated for the purposes of recoil (Parental Bond).
				move.totalDamage += damage[i] as number;
			}
			if (move.mindBlownRecoil) {
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.getEffect('Mind Blown'), true);
				move.mindBlownRecoil = false;
			}
			this.eachEvent('Update');
			if (!pokemon.hp && targets.length === 1) {
				hit++; // report the correct number of hits for multihit moves
				break;
			}
		}
		// hit is 1 higher than the actual hit count
		if (hit === 1) return damage.fill(false);
		if (nullDamage) damage.fill(false);
		if (move.multihit && typeof move.smartTarget !== 'boolean') {
			this.add('-hitcount', targets[0], hit - 1);
		}

		if (move.recoil && move.totalDamage) {
			this.damage(this.calcRecoilDamage(move.totalDamage, move), pokemon, pokemon, 'recoil');
		}

		if (move.struggleRecoil) {
			let recoilDamage;
			if (this.dex.gen >= 5) {
				recoilDamage = this.clampIntRange(Math.round(pokemon.baseMaxhp / 4), 1);
			} else {
				recoilDamage = this.trunc(pokemon.maxhp / 4);
			}
			this.directDamage(recoilDamage, pokemon, pokemon, {id: 'strugglerecoil'} as Condition);
		}

		// smartTarget messes up targetsCopy, but smartTarget should in theory ensure that targets will never fail, anyway
		if (move.smartTarget) targetsCopy = targets.slice(0);

		for (const [i, target] of targetsCopy.entries()) {
			if (target && pokemon !== target) {
				target.gotAttacked(move, damage[i] as number | false | undefined, pokemon);
			}
		}

		if (move.ohko && !targets[0].hp) this.add('-ohko');

		if (!damage.some(val => !!val || val === 0)) return damage;

		this.eachEvent('Update');

		this.afterMoveSecondaryEvent(targetsCopy.filter(val => !!val) as Pokemon[], pokemon, move);
		//Right here
		if (!move.negateSecondary && !(move.hasSheerForce && (pokemon.hasAbility('terrorizer') || pokemon.hasAbility('monarchyenforcement')))) {
			for (const [i, d] of damage.entries()) {
				// There are no multihit spread moves, so it's safe to use move.totalDamage for multihit moves
				// The previous check was for `move.multihit`, but that fails for Dragon Darts
				const curDamage = targets.length === 1 ? move.totalDamage : d;
				if (typeof curDamage === 'number' && targets[i].hp) {
					const targetHPBeforeDamage = (targets[i].hurtThisTurn || 0) + curDamage;
					if (targets[i].hp <= targets[i].maxhp / 2 && targetHPBeforeDamage > targets[i].maxhp / 2) {
						this.runEvent('EmergencyExit', targets[i], pokemon);
					}
				}
			}
		}

		return damage;
	},
	canUltraBurst(pokemon) {
		if (['Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane'].includes(pokemon.baseSpecies.name) &&
			pokemon.getItem().id === 'ultranecroziumz') {
			return "Necrozma-Ultra";
		}
		if (['Noze-Dawn-Wings'].includes(pokemon.baseSpecies.name) &&
			pokemon.getItem().id === 'depletedultranecroziumz') {
			return "Noze-Ultra";
		}
		if (['Phancrozma-Dawn-Wings'].includes(pokemon.baseSpecies.name) &&
			pokemon.getItem().id === 'depletedultranecroziumz') {
			return "Phancrozma-Ultra";
		}
		return null;
	},
	hitStepTryImmunity(targets, pokemon, move) {
		const hitResults = [];
		for (const [i, target] of targets.entries()) {
			if (this.gen >= 6 && move.flags['powder'] && target !== pokemon && !this.dex.getImmunity('powder', target)) {
				this.debug('natural powder immunity');
				this.add('-immune', target);
				hitResults[i] = false;
			} else if (!this.singleEvent('TryImmunity', move, {}, target, pokemon, move)) {
				this.add('-immune', target);
				hitResults[i] = false;
			} else if (this.gen >= 7 && move.pranksterBoosted && (pokemon.hasAbility('prankster') || pokemon.hasAbility('notfunny') || pokemon.hasAbility('darkhumour') || pokemon.hasAbility('flashyjokes') || pokemon.hasAbility('lighthearted') || pokemon.hasAbility('creepy')) &&
				targets[i].side !== pokemon.side && !this.dex.getImmunity('prankster', target)) {
				this.debug('natural prankster immunity');
				if (!target.illusion) this.hint("Since gen 7, Dark is immune to Prankster moves.");
				this.add('-immune', target);
				hitResults[i] = false;
			} else {
				hitResults[i] = true;
			}
		}
		return hitResults;
	},
	hitStepStealBoosts(targets, pokemon, move) {
		const target = targets[0]; // hardcoded
		if (move.stealsBoosts) {
			const boosts: SparseBoostsTable = {};
			let stolen = false;
			let statName: BoostName;
			for (statName in target.boosts) {
				const stage = target.boosts[statName];
				if (stage > 0) {
					boosts[statName] = stage;
					stolen = true;
				}
			}
			if (stolen) {
				this.attrLastMove('[still]');
				this.add('-clearpositiveboost', target, pokemon, 'move: ' + move.name);
				this.boost(boosts, pokemon, pokemon);

				let statName2: BoostName;
				for (statName2 in boosts) {
					boosts[statName2] = 0;
				}
				target.setBoost(boosts);
				this.addMove('-anim', pokemon, "Spectral Thief", target);
			}
		}
		// this DEFINITELY should fucking not have worked first try. I am so mad. 
		if (pokemon.ability === 'faustianpact' && move.flags['contact']) {
			let swapped = false; 
			const targetAbility = target.getAbility();
			const additionalBannedAbilities = ['noability', 'flowergift', 'forecast', 'hungerswitch', 'illusion', 'pillage', 'magicmissile', 'ecopy', 'lemegeton', 'modeshift', 'rebootsystem', 'concussion', 'imposter', 'neutralizinggas', 'powerofalchemy', 'receiver', 'trace', 'zenmode'];
			if (!targetAbility.isPermanent || !additionalBannedAbilities.includes(targetAbility) || !pokemon.volatiles['dynamax']) {
				swapped = true; 
			} 
			if (swapped) {
				this.attrLastMove('[still]'); //Will it work without this line...?
				target.setAbility('faustianpact', pokemon);
				pokemon.setAbility(targetAbility);
				this.add('-activate', pokemon, 'ability: Faustian Pact');
				this.add('-activate', pokemon, 'Skill Swap', '', '', '[of] ' + target);
				this.add('-activate', pokemon, 'ability: ' + targetAbility.name);
				this.add('-activate', target, 'ability: Faustian Pact');
				this.addMove('-anim', pokemon, move.name, target);
			}
			
		}
		return undefined;
	},
}; 
