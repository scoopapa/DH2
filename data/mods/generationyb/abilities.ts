export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
  // New Abilities
  tippedscales: {
		onPrepareHit(source, target, move) {
			if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Tipped Scales');
			}
		},
		flags: {},
		name: "Tipped Scales",
		rating: 5,
		shortDesc: "This Pokemon's type changes to match the type of the move it is about to use. Works multiple times per switch-in.",
	},
	parasitic: {
		shortDesc: "This Pokemon's physical moves heal it for 50% of the damage dealt.",
		onModifyMove(move, pokemon) {
			if (!move.drain && move.category === 'Physical') {
				move.drain = [1, 3];
			}
		},
		flags: {},
		name: "Parasitic",
		rating: 3,
	},
	sugarshield: {
		shortDesc: "This Pokemon takes 50% damage from super effective moves (includes hazards).",
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Sugar Shield neutralize');
				return this.chainModify(0.5);
			}
		},
    onDamage(damage, target, source, effect) {
			if (
        effect && effect.id === 'stealthrock' && 
        (target.hasType('Bug') || target.hasType('Fire') || target.hasType('Flying') || target.hasType('Ice'))
      ) {
				return damage / 2;
			}
		},
		flags: {breakable: 1},
		name: "Sugar Shield",
		rating: 4.5,
	},
	acidicslush: {
		shortDesc: "This Pokemon takes 50% damage from Fire/Water. Foes that hit it with Fire or Water become badly poisoned.",
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water' || move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water' || move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		onDamagingHit(damage, target, source, move) {
      if (move.type === 'Water' || move.type === 'Fire') {
        source.trySetStatus('tox', target);
      }
		},
		flags: {breakable: 1},
		name: "Acidic Slush",
		rating: 3.5,
	},
	aluminumwings: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Aluminum Wings');
			this.add('-message', `This Pokemon is manifesting the forces of the future!`);
			pokemon.canTerastallize = null;
		},
		onModifyMove(move, pokemon, target) {
			if (!target) return;
			const atk = pokemon.getStat('atk', false, true);
			const spa = pokemon.getStat('spa', false, true);
			if (atk > spa || (atk === spa && this.random(2) === 0)) {
				move.category = 'Physical';
			} else {
				move.category = 'Special';
			}
		},
		onHit(target, source, move) {
			if (!source.isAlly(target)) this.hint(move.category + " " + move.name);
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!source.isAlly(target)) this.hint(move.category + " " + move.name);
		},
		name: "Aluminum Wings",
		shortDesc: "This Pokemon's moves change category, depending on the user's higher attacking stat.",
		rating: 4,
	},
	goldenquills: {
		shortDesc: "This Pokemon's moves have the damage categories they would have in Gen 3. Fairy-type moves are Special.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Golden Quills');
			this.add('-message', `This Pokemon is harnessing the power of the past!`);
			pokemon.canTerastallize = null;
		},
		onModifyMovePriority: 8,
		onModifyMove(move, pokemon) {
			if (move.category === "Status") return;
			if (['Fire', 'Water', 'Grass', 'Electric', 'Dark', 'Psychic', 'Dragon', 'Fairy'].includes(move.type)) {
				move.category = "Special";
			} else {
				move.category = "Physical";
			}
		},
		name: "Golden Quills",
		rating: 4,
	},
	awaitingdestiny: {
		name: "Awaiting Destiny",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp && target.species.id === 'gbonawola') {
				this.add('-anim', target, "Pyro Ball", target);
			  this.add('-message', `${source.name} can't deny its destiny!`);
				this.actions.useMove("Future Flames", target);
			} if (!target.hp && target.species.id === 'gbonanene') {
				this.add('-anim', target, "Attack Order", target);
			  this.add('-message', `${source.name} can't deny its destiny!`);
				this.actions.useMove("Future Famine", target);
			} if (!target.hp && target.species.id === 'gbonablanu') {
				this.add('-anim', target, "Hex", target);
			  this.add('-message', `${source.name} can't deny its destiny!`);
				this.actions.useMove("Future Laments", target);
			} else if (!target.hp && target.species.id === 'gbonazito') {
				this.add('-anim', target, "Thunder Cage", target);
			  this.add('-message', `${source.name} can't deny its destiny!`);
				this.actions.useMove("Future Shock", target);
			}
		},
		flags: {},
		shortDesc: "When this Pokemon faints due to another Pokemon's move, it uses its signature future move if it's not already active.",
		rating: 2,
	},
	bittercold: {
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Bitter Cold's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (this.checkMoveMakesContact(move, target, source)) {
				if (this.randomChance(3, 10)) {
					target.trySetStatus('frz', source);
				}
			}
		},
		flags: {},
		name: "Bitter Cold",
		rating: 2.5,
		shortDesc: "This Pokemon's contact moves have a 30% chance of freezing.",
	},
	doorstop: {
	   onSwitchOut(pokemon) {
			this.add('-activate', target, 'ability: Doorstop');
      	pokemon.side.addSlotCondition(pokemon, 'doorstop');
			this.add('-message', `${pokemon.name} is holding the door for its team!`);
	   },
    condition: {
      duration: 1,
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && this.effectState.target.hasAlly(target)) {
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Doorstop weaken');
						if (this.activePerHalf > 1) return this.chainModify([2732, 4096]);
						return this.chainModify(0.5);
					}
			  }
		  },
	  },
		flags: {},
		name: "Doorstop",
		rating: 3.5,
		shortDesc: "When this Pokemon switches out, its team takes 50% damage from attacks for the rest of the turn.",
	},
	earthlymight: {
		onBasePowerPriority: 24,
		onBasePower(basePower, attacker, defender, move) {
      if (defender.baseSpecies.eggGroups === 'Amorphous' || defender.baseSpecies.eggGroups === 'Ditto' || defender.baseSpecies.eggGroups === 'Undiscovered') {
        this.debug('Earthly Might boost');
        return this.chainModify([5325, 4096]);
      }
		},
		flags: {},
		name: "Earthly Might",
		rating: 2,
		shortDesc: "This Pokemon's moves deal 1.3x more damage against foes in the Amorphous, Undiscovered, or Ditto Egg Groups.",
	},
	galacticmight: {
		onBasePowerPriority: 24,
		onBasePower(basePower, attacker, defender, move) {
      if (defender.baseSpecies.eggGroups === 'Human-Like' || defender.baseSpecies.eggGroups === 'Field') {
        this.debug('Galactic Might boost');
        return this.chainModify([5325, 4096]);
      }
		},
		flags: {},
		name: "Galactic Might",
		rating: 2,
		shortDesc: "This Pokemon's moves deal 1.3x more damage against foes in the Field or Human-Like Egg Groups.",
	},
	gaiaguardian: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if ((this.field.isTerrain('electricterrain') || this.field.isTerrain('psychicterrain') || this.field.isTerrain('grassyterrain') || this.field.isTerrain('mistyterrain')) && target.isGrounded()) {
  				this.add('-anim', target, "Poison Gas", target);
					this.damage(target.baseMaxhp / 8, target, pokemon);
				}
			}
		},
		flags: {},
		name: "Gaia Guardian",
		shortDesc: "While this Pokemon is active, foes affected by terrains lose 1/8 of their max HP per turn.",
		rating: 2,
	},
	highfashion: {
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Normal') {
				return this.chainModify([4915, 4096]);
			}
		},
		flags: {},
		name: "High Fashion",
		shortDesc: "User's Normal-type attacks have 1.2x power.",
		rating: 3.5,
	},
	silkstream: {
		onStart(pokemon) {
			pokemon.abilityState.choiceLock = "";
		},
		onBeforeMove(pokemon, target, move) {
			if (move.isZOrMaxPowered || move.id === 'struggle') return;
			if (pokemon.abilityState.choiceLock && pokemon.abilityState.choiceLock !== move.id) {
				// Fails unless ability is being ignored (these events will not run), no PP lost.
				this.addMove('move', pokemon, move.name);
				this.attrLastMove('[still]');
				this.debug("Disabled by Silk Stream");
				this.add('-fail', pokemon);
				return false;
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.abilityState.choiceLock || move.isZOrMaxPowered || move.id === 'struggle') return;
			pokemon.abilityState.choiceLock = move.id;
		},
		onModifySpe(spe, pokemon) {
			return this.chainModify(1.5);
		},
		onDisableMove(pokemon) {
			if (!pokemon.abilityState.choiceLock) return;
			if (pokemon.volatiles['dynamax']) return;
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== pokemon.abilityState.choiceLock) {
					pokemon.disableMove(moveSlot.id, false, this.effectState.sourceEffect);
				}
			}
		},
		onEnd(pokemon) {
			pokemon.abilityState.choiceLock = "";
		},
		flags: {},
		name: "Silk Stream",
		shortDesc: "This Pokemon's Speed is 1.5x, but it can only select the first move it executes.",
		rating: 4.5,
	},
	insulttoinjury: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (defender.hurtThisTurn) {
				this.debug('BP multiplied on damaged target');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Insult to Injury",
		shortDesc: "This Pokemon's moves deal 1.5x damage to targets that have already taken damage this turn.",
		rating: 3.5,
	},
	moltenthreads: {
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Molten Threads's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (move.type === 'Bug') {
				if (this.randomChance(3, 10)) {
					target.trySetStatus('brn', source);
          		target.addVolatile('trapped', source, move, 'trapper');
				}
			}
		},
		flags: {},
		name: "Molten Threads",
		shortDesc: "This Pokemon's Bug-type moves have a 30% chance to trap and burn the target.",
		rating: 4,
	},
	orator: {
		onStart(pokemon) {
			pokemon.addVolatile('orator');
		},
		condition: {
			onStart(pokemon) {
				this.effectState.lastMove = '';
				this.effectState.numConsecutive = 0;
			},
			onTryMovePriority: -2,
			onTryMove(pokemon, target, move) {
				if (!pokemon.hasAbility('orator')) {
					pokemon.removeVolatile('orator');
					return;
				}
				if (this.effectState.lastMove === move.id && pokemon.moveLastTurnResult) {
					this.effectState.numConsecutive++;
				} else if (pokemon.volatiles['twoturnmove']) {
					if (this.effectState.lastMove !== move.id) {
						this.effectState.numConsecutive = 1;
					} else {
						this.effectState.numConsecutive++;
					}
				} else {
					this.effectState.numConsecutive = 0;
				}
				this.effectState.lastMove = move.id;
			},
			onModifyDamage(damage, source, target, move) {
				const dmgMod = [4096, 4915, 5734, 6553, 7372, 8192];
				const numConsecutive = this.effectState.numConsecutive > 5 ? 5 : this.effectState.numConsecutive;
				this.debug(`Current Orator boost: ${dmgMod[numConsecutive]}/4096`);
				return this.chainModify([dmgMod[numConsecutive], 4096]);
			},
		},
		flags: {},
		name: "Orator",
		shortDesc: "Damage of moves used on consecutive turns is increased. Max 2x after 5 turns.",
		rating: 4,
	},
	overclock: {
		onStart(pokemon) {
			this.add('-activate', target, 'ability: Overclock');
			this.add('-message', `An alarm is ringing loudly!`);
			for (const target of this.getAllActive()) {
				if (['slp'].includes(target.status)) {
					this.add('-activate', pokemon, 'ability: Overclock');
					target.cureStatus();
				}
			}
		},
		onUpdate(pokemon) {
			for (const target of this.getAllActive()) {
				if (['slp'].includes(target.status)) {
					this.add('-activate', pokemon, 'ability: Overclock');
					target.cureStatus();
				}
			}
		},
		onSetStatus(status, target, source, effect) {
			for (const target of this.getAllActive()) {
  			if (status.id === 'slp') {
  				this.debug('Overclock interrupts sleep');
  				const effectHolder = this.effectState.target;
  				this.add('-block', target, 'ability: Overclock', '[of] ' + effectHolder);
  				return null;
  			}
      }
		},
		flags: {},
		name: "Overclock",
		rating: 2,
		shortDesc: "While this Pokemon is active, no Pokemon can fall asleep. Sleeping Pokemon wake up when this Pokemon enters the field.",
	},
	perfectgarden: { // shoutouts to m4a
		onStart(source) {
			if (this.field.setTerrain('grassyterrain')) {
				this.add('-message', `${source.name} turns the battlefield into a beautiful garden!`);
				this.hint("Perfect Garden doesn't wear off until the user leaves the field!");
				this.hint("(This ability was originally called Arena Rock in Megas For All!)");
				this.field.terrainState.duration = 0;
			} else if (this.field.isTerrain('grassyterrain') && this.field.terrainState.duration !== 0) {
				this.add('-ability', source, 'Perfect Garden');
				this.add('-message', `${source.name} turns the battlefield into a beautiful garden!`);
				this.hint("Perfect Garden doesn't wear off until the user leaves the field!");
				this.hint("(This ability was originally called Arena Rock in Megas For All!)");
				this.field.terrainState.source = source;
				this.field.terrainState.duration = 0;
			}
		},
		onEnd(pokemon) {
			if (this.field.terrainState.source !== pokemon || !this.field.isTerrain('grassyterrain')) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('perfectgarden')) {
					this.field.terrainState.source = target;
					return;
				}
			}
			pokemon.m.forceCustomBlock = true;
			this.field.clearTerrain();
			pokemon.m.forceCustomBlock = null;
		},
		flags: {},
		name: "Perfect Garden",
		rating: 4.5,
		shortDesc: "While this Pokemon is active, Grassy Terrain is active.",
	},
	powerrush: {
		onModifyDamage(damage, source, target, move) {
			return this.chainModify([5324, 4096]);
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (source && source !== target && move && move.category !== 'Status' && !source.forceSwitchFlag) {
				this.damage(source.baseMaxhp / 10, source, source);
			}
		},
		flags: {},
		name: "Power Rush",
		rating: 4.5,
		shortDesc: "This Pokemon's attacks do 1.3x damage, and it loses 1/10 its max HP after the attack.",
	},
	relentless: {
		onBeforeMove(pokemon, target, move) {
			delete this.effectState.relentless;
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (!this.effectState.relentless && pokemon.moveThisTurnResult === false) {
				this.effectState.relentless = true;
				this.boost({atk: 1});
				this.add('-message', `${pokemon.name}'s frustration at failing boosted its Attack!`);
			}
		},
		flags: {},
		name: "Relentless",
		rating: 4,
		shortDesc: "This Pokemon's Attack increases by 1 stage whenever its move fails for any reason.",
	},
	snowpiercer: {
		onModifyMove(move, pokemon) {
			if (this.field.isWeather(['hail', 'snow']) && (move.type === 'Steel' || move.type === 'Ice')) {
			  move.willCrit = true;
      	}
		},
		flags: {},
		name: "Snowpiercer",
		rating: 2,
		shortDesc: "This Pokemon's Ice and Steel-type moves always critcally hit if snow is active.",
	},
	stoneface: {
		onStart(pokemon) {
			if (this.field.isWeather('sandstorm') && pokemon.species.id === 'driscuenosand') {
				this.add('-activate', pokemon, 'ability: Stone Face');
				this.effectState.busted = false;
				pokemon.formeChange('Driscue', this.effect, true);
			}
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect?.effectType === 'Move' && target.species.id === 'driscue') {
				this.add('-activate', target, 'ability: Stone Face');
				this.effectState.busted = true;
				return damage / 2;
				this.damage(source.baseMaxhp / 6, source, target);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.species.id === 'driscue' && this.effectState.busted) {
				pokemon.formeChange('Driscue-No Sand', this.effect, true);
			}
		},
		onWeatherChange(pokemon, source, sourceEffect) {
			// sandstorm resuming because Cloud Nine/Air Lock ended does not trigger Stone Face
			if ((sourceEffect as Ability)?.suppressWeather) return;
			if (!pokemon.hp) return;
			if (this.field.isWeather('sandstorm') && pokemon.species.id === 'driscuenosand') {
				this.add('-activate', pokemon, 'ability: Stone Face');
				this.effectState.busted = false;
				pokemon.formeChange('Driscue', this.effect, true);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		flags: {
			failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1,
			breakable: 1, notransform: 1,
		},
		name: "Stone Face",
		rating: 3,
		shortDesc: "If Driscue, the first hit it takes deals halved damage and causes the attacker to lose 1/6 of their max HP. Effect is restored in Sand.",
	},
	temperaturecontrol: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Water' && ['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather()) &&
        !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Fire';
			} if (move.type === 'Fire' && ['raindance', 'primordialsea'].includes(pokemon.effectiveWeather()) &&
        !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Water';
			}
		},
		flags: {},
		name: "Temperature Control",
		rating: 3,
		shortDesc: "This Pokemon's Fire moves becomes Water in Rain and its Water moves become Fire in Sun.",
	},
	totaleclipse: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			// Total Eclipse is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday')) {
				pokemon.addVolatile('totaleclipse');
			} else if (this.field.weather !== 'sunnyday') {
				pokemon.removeVolatile('totaleclipse');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['totaleclipse'];
			this.add('-end', pokemon, 'Total Eclipse', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				this.add('-activate', pokemon, 'ability: Total Eclipse');
				this.add('-message', `${pokemon.name} blocks out the sun, taking all of its power for itself!`);
				this.boost({atk: 1, def: 1, spa: 1, spd: 1}, pokemon, pokemon);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Total Eclipse');
				this.add('-message', `${pokemon.name} is no longer blocking out the sun!`);
				this.boost({atk: -1, def: -1, spa: -1, spd: -1}, pokemon, pokemon);
			},
		},
		flags: {},
		name: "Total Eclipse",
		rating: 4,
		shortDesc: "Sunny Day active: +1 to all non-Speed stats. When Sun goes away, -1 to all non-Speed stats.",
	},
	rolereversal: {
		onModifyMovePriority: 1,
		onModifyMove(move, attacker, defender) {
			if (attacker.species.baseSpecies !== 'Tragichiou' || attacker.transformed || move.category === 'Status') return;
			const targetForme = (move.category === 'Physical' ? 'Tragichiou' : 'Tragichiou-Comedy');
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Role Reversal",
		shortDesc: "This Pokemon changes to its Comedy form before it uses a Special move and its Tragedy form before it uses a Physical move.",
		rating: 4,
	},

  // Aurum Aura Exclusives #soon
	heartofcourage: {
		onModifyMove(move, pokemon) {
			if (pokemon.hasType(move.type) && pokemon.hp <= pokemon.maxhp / 2) {
			  move.willCrit = true;
      	}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		name: "Heart of Courage",
		rating: 4,
		shortDesc: "This Pokemon's STAB moves always critcally hit when the user is below 50% HP.",
	},
	unknownforce: {
		onStart(pokemon, source, effect) {
			this.add('-message', `A peculiar presence envelopes the battlefield...`);
		},
		onModifyMove(move, pokemon) {
			if (move.num === 237) {
				move.secondaries = [];
			  	move.basePower = 150;
			  	move.type = 'Stellar';
      	}
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (move.num === 237) {
				this.boost({atk: 1, spa: 1}, source, source);
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		name: "Unknown Force",
		rating: 3,
		shortDesc: "Unown: Hidden Power is typeless, has 150 BP, and boosts the user's Attack and Special Attack by 1 stage.",
	},
	timewarp: {
		shortDesc: "Once per battle, on switch-in, this Pokemon summons Trick Room.",
		onStart(pokemon) {
			if (pokemon.timeWapred) return;
			pokemon.timeWapred = true;
			this.add('-ability', pokemon, 'Time Warp');
			this.field.addPseudoWeather('trickroom', pokemon, pokemon.ability);
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		name: "Time Warp",
		rating: 4,
	},
	birdsofafeather: {
		onStart(pokemon) {
			console.log(pokemon.side.pokemon.filter(pokemon => pokemon.hasType('Flying') && !pokemon.fainted));
			const bird = pokemon.side.pokemon.filter(pokemon => pokemon.hasType('Flying') && !pokemon.fainted).length;
			this.add('-start', pokemon, `Birds: ${this.effectState.bird}`, '[silent]');
			//this.boost({atk: bird * 2, def: bird * 2, spa: bird * 2, spd: bird * 2, spe: bird * 2});
			this.effectState.bird = bird;
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, `Bird: ${this.effectState.bird}`, '[silent]');
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (this.effectState.bird) {
				console.log(pokemon.side.pokemon.filter(pokemon => pokemon.hasType('Flying') && !pokemon.fainted));
				const bird = pokemon.side.pokemon.filter(pokemon => pokemon.hasType('Flying') && !pokemon.fainted).length;
				this.effectState.bird = bird;
				const powMod = [4096, 4506, 4915, 5325, 5734, 6144];
				this.debug(`Birds of a Feather boost: ${powMod[this.effectState.bird]}/4096`);
				return this.chainModify([powMod[this.effectState.bird], 4096]);
			}
		},
		onModifyDefPriority: 6,
		onModifyDef(def, pokemon) {
			if (this.effectState.bird) {
				console.log(pokemon.side.pokemon.filter(pokemon => pokemon.hasType('Flying') && !pokemon.fainted));
				const bird = pokemon.side.pokemon.filter(pokemon => pokemon.hasType('Flying') && !pokemon.fainted).length;
				this.effectState.bird = bird;
				const powMod = [4096, 4506, 4915, 5325, 5734, 6144];
				this.debug(`Birds of a Feather boost: ${powMod[this.effectState.bird]}/4096`);
				return this.chainModify([powMod[this.effectState.bird], 4096]);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (this.effectState.bird) {
				console.log(pokemon.side.pokemon.filter(pokemon => pokemon.hasType('Flying') && !pokemon.fainted));
				const bird = pokemon.side.pokemon.filter(pokemon => pokemon.hasType('Flying') && !pokemon.fainted).length;
				this.effectState.bird = bird;
				const powMod = [4096, 4506, 4915, 5325, 5734, 6144];
				this.debug(`Birds of a Feather boost: ${powMod[this.effectState.bird]}/4096`);
				return this.chainModify([powMod[this.effectState.bird], 4096]);
			}
		},
		onModifySpDPriority: 6,
		onModifySpD(spd, pokemon) {
			if (this.effectState.bird) {
				console.log(pokemon.side.pokemon.filter(pokemon => pokemon.hasType('Flying') && !pokemon.fainted));
				const bird = pokemon.side.pokemon.filter(pokemon => pokemon.hasType('Flying') && !pokemon.fainted).length;
				this.effectState.bird = bird;
				const powMod = [4096, 4506, 4915, 5325, 5734, 6144];
				this.debug(`Birds of a Feather boost: ${powMod[this.effectState.bird]}/4096`);
				return this.chainModify([powMod[this.effectState.bird], 4096]);
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		name: "Birds of a Feather",
		rating: 5,
		shortDesc: "This Pokemon's non-Speed stats are boosted 10% for each Flying ally, up to 5 allies.",
	},
	unwaveringmelody: {
		onBasePowerPriority: 7,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				this.debug('Punk Rock boost');
				return this.chainModify([5325, 4096]);
			}
		},
		onModifyDamage(damage, source, target, move) {
			if (move.flags['sound'] && target.getMoveHitData(move).typeMod < 0) {
				this.debug('Unwavering Melody boost');
				return this.chainModify(2);
			}
		},
		onModifyMovePriority: 7,
		onModifyMove(move, pokemon) {
			if (move.category === "Status") return;
			if (move.flags['sound']) {
				move.category = "Special";
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		name: "Unwavering Melody",
		rating: 4.5,
		shortDesc: "User's Sound moves are always Special and deal 1.3x damage + 2x damage when NvE.",
	},
	twistoffate: {
		onStart(source) {
			this.add('-message', `${source.name} now realizes that, perhaps, you can defy your destiny!`);
			if (!source.side.getSideCondition('twistsoffate')) {
				this.add('-message', `${source.name} now realizes that, perhaps, you can defy your destiny!`);
				this.actions.useMove("Twists of Fate", source, source);
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		name: "Twist of Fate",
		rating: 2,
		shortDesc: "This Pokemon's team becomes immune to Future moves until this Pokemon faints.",
	},

  // Old Abilities
	regenerator: {
		onSwitchOut(pokemon) {
			if (!pokemon.volatiles['healblock']) {
				pokemon.heal(pokemon.baseMaxhp / 3);
			}
		},
		flags: {},
		name: "Regenerator",
		rating: 4.5,
		num: 144,
	},
	normalize: {
		onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (!(move.isZ && move.category !== 'Status') && !noModifyType.includes(move.id) &&
				// TODO: Figure out actual interaction
				!(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Normal';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify(2);
		},
		flags: {},
		name: "Normalize",
		rating: 0,
		num: 96,
		shortDesc: "This Pokemon's moves are changed to be Normal type and have 2x power.",
	},
	rivalry: {
		onBasePowerPriority: 24,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.gender && defender.gender) {
				if (attacker.gender === defender.gender) {
					this.debug('Rivalry boost');
					return this.chainModify(1.25);
				}
			}
		},
		flags: {},
		name: "Rivalry",
		rating: 3,
		num: 79,
		shortDesc: "This Pokemon's attacks do 1.25x on same gender targets.",
	},
	emergencyexit: {
	  shortDesc: "This Pokemon switches out at the end of the turn after being lowered to 50% of its max HP.",
		onAfterMoveSecondary(target, source, move) {
			if (!source || source === target || !target.hp || !move.totalDamage || !this.canSwitch(target.side)) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp*.5 && target.hp + damage > target.maxhp*.5) {
				target.addVolatile('emergencyexit');
				this.add('-ability', target, 'Emergency Exit');
				this.add('-message', `${target.name} is planning its escape!`);
			}
		},
		condition: {
			duration: 1,
			onEnd(pokemon) {
				this.add('-ability', pokemon, 'Emergency Exit');
				this.add('-message', `${pokemon.name} made an emergency exit!`);
				pokemon.switchFlag = true;				
			},
		},
		flags: {},
		name: "Emergency Exit",
		rating: 2,
		num: 194,
	},
	steadfast: {
		onFlinch(pokemon) {
			this.boost({spe: 1});
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Steadfast', '[of] ' + target);
			}
		},
		flags: {},
		name: "Steadfast",
		rating: 1,
		num: 80,
	  shortDesc: "If this Pokemon flinches, its Speed is raised by 1 stage. Immune to Intimidate.",
	},
	forecast: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Castform' || pokemon.transformed) return;
			let forme = null;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				if (pokemon.species.id !== 'castformsunny') forme = 'Castform-Sunny';
				this.boost({spe: 2});
				break;
			case 'raindance':
			case 'primordialsea':
				if (pokemon.species.id !== 'castformrainy') forme = 'Castform-Rainy';
				this.boost({spa: 2});
				break;
			case 'hail':
			case 'snow':
				if (pokemon.species.id !== 'castformsnowy') forme = 'Castform-Snowy';
				this.boost({def: 1, spd: 1});
				break;
			default:
				if (pokemon.species.id !== 'castform') forme = 'Castform';
				break;
			}
			if (pokemon.isActive && forme) {
				pokemon.formeChange(forme, this.effect, false, '[msg]');
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1},
		name: "Forecast",
		rating: 2,
		num: 59,
	  shortDesc: "Castform's form changes and it gains stat boosts, depending on the weather. Not Sandstorm.",
	},
	gorillatactics: {
		// Item suppression implemented in Pokemon.ignoringItem() within sim/pokemon.js
		onStart(pokemon) {
			pokemon.abilityState.choiceLock = "";
  		this.singleEvent('End', pokemon.getItem(), pokemon.itemState, pokemon);
		},
		onBeforeMove(pokemon, target, move) {
			if (move.isZOrMaxPowered || move.id === 'struggle') return;
			if (pokemon.abilityState.choiceLock && pokemon.abilityState.choiceLock !== move.id) {
				// Fails unless ability is being ignored (these events will not run), no PP lost.
				this.addMove('move', pokemon, move.name);
				this.attrLastMove('[still]');
				this.debug("Disabled by Gorilla Tactics");
				this.add('-fail', pokemon);
				return false;
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.abilityState.choiceLock || move.isZOrMaxPowered || move.id === 'struggle') return;
			pokemon.abilityState.choiceLock = move.id;
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			// PLACEHOLDER
			this.debug('Gorilla Tactics Atk Boost');
			return this.chainModify(1.5);
		},
		onDisableMove(pokemon) {
			if (!pokemon.abilityState.choiceLock) return;
			if (pokemon.volatiles['dynamax']) return;
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== pokemon.abilityState.choiceLock) {
					pokemon.disableMove(moveSlot.id, false, this.effectState.sourceEffect);
				}
			}
		},
		onEnd(pokemon) {
			pokemon.abilityState.choiceLock = "";
		},
		flags: {},
		name: "Gorilla Tactics",
		rating: 3.5,
		num: 255,
	  shortDesc: "This Pokemon's Attack is 1.5x, but it can only select the first move it uses and can't use items.",
	},
	teraformzero: {
		onStart(pokemon) {
			if (pokemon.species.baseSpecies !== 'Terapagos') return;
			if (this.field.weather || this.field.terrain) {
				this.add('-ability', pokemon, 'Teraform Zero');
				this.field.clearWeather();
				this.field.clearTerrain();
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		shortDesc: "Terapagos: Switching in ends the effects of weather and terrain.",
		name: "Teraform Zero",
		rating: 3,
		num: 309,
	},
	plus: {
		onUpdate(pokemon) {
			for (const allyActive of pokemon.allies()) {
				if (allyActive.hasAbility(['minus', 'plus'])) {
					pokemon.addVolatile('plus');
				} else {
					pokemon.removeVolatile('plus');
				}
			}
		},
		condition: {
			noCopy: true,
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Plus",
		rating: 0,
		num: 57,
	},
	minus: {
		onUpdate(pokemon) {
			for (const allyActive of pokemon.allies()) {
				if (allyActive.hasAbility(['minus', 'plus'])) {
					pokemon.addVolatile('minus');
				} else {
					pokemon.removeVolatile('minus');
				}
			}
		},
		condition: {
			noCopy: true,
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Minus",
		rating: 0,
		num: 58
	},
	supremeoverlord: {
		onStart(pokemon) {
			if (pokemon.side.totalFainted) {
				this.add('-activate', pokemon, 'ability: Supreme Overlord');
				const fallen = Math.min(pokemon.side.totalFainted, 3);
				this.add('-start', pokemon, `fallen${fallen}`, '[silent]');
				this.effectState.fallen = fallen;
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, `fallen${this.effectState.fallen}`, '[silent]');
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.effectState.fallen) {
				const powMod = [4096, 4506, 4915, 5325];
				this.debug(`Supreme Overlord boost: ${powMod[this.effectState.fallen]}/4096`);
				return this.chainModify([powMod[this.effectState.fallen], 4096]);
			}
		},
		flags: {},
		name: "Supreme Overlord",
		rating: 4,
		num: 293,
		shortDesc: "This Pokemon's moves have 10% more power for each fainted ally, up to 3 allies.",
	},
	embodyaspectcornerstone: {
		onStart(pokemon) {
			if (pokemon.species.baseSpecies === 'Ogerpon' && !this.effectState.embodied) {
				this.effectState.embodied = true;
				this.boost({def: 1}, pokemon);
			}
		},
		onSwitchIn() {
			delete this.effectState.embodied;
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Embody Aspect (Cornerstone)",
		rating: 3.5,
		num: 304,
	},
	embodyaspecthearthflame: {
		onStart(pokemon) {
			if (pokemon.species.baseSpecies === 'Ogerpon' && !this.effectState.embodied) {
				this.effectState.embodied = true;
				this.boost({atk: 1}, pokemon);
			}
		},
		onSwitchIn() {
			delete this.effectState.embodied;
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Embody Aspect (Hearthflame)",
		rating: 3.5,
		num: 303,
	},
	embodyaspectteal: {
		onStart(pokemon) {
			if (pokemon.species.baseSpecies === 'Ogerpon' && !this.effectState.embodied) {
				this.effectState.embodied = true;
				this.boost({spe: 1}, pokemon);
			}
		},
		onSwitchIn() {
			delete this.effectState.embodied;
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Embody Aspect (Teal)",
		rating: 3.5,
		num: 301,
	},
	embodyaspectwellspring: {
		onStart(pokemon) {
			if (pokemon.species.baseSpecies === 'Ogerpon' && !this.effectState.embodied) {
				this.effectState.embodied = true;
				this.boost({spd: 1}, pokemon);
			}
		},
		onSwitchIn() {
			delete this.effectState.embodied;
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Embody Aspect (Wellspring)",
		rating: 3.5,
		num: 302,
	},
};
