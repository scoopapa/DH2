export const Abilities: {[abilityid: string]: AbilityData} = {
	//new
	darkesthunger: {
		shortDesc: "This Pokemon restores 12.5% of its Max HP if it attacks and KOes another Pokemon.",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.heal((source.baseMaxhp * length) / 8, source);
			}
		},
		flags: {},
		name: "Darkest Hunger",
	},	
	coldestheart: {
		shortDesc: "On switch-in, this Pokemon lowers the Speed of opponents by 1 stage.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Coldest Heart', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spe: -1}, target, pokemon, null, true);
				}
			}
		},
		flags: {},
		name: "Coldest Heart",
	},
	guardianofnature: {
		shortDesc: "On switch-in, Nature Field begins until this Ability is not active in battle. (Grassy terrain but -30% to Ghost/Water/Ice/Dark)",
		onStart(source) {
			this.field.setTerrain('guardianofnature');
		},
		//Basically this is meant to negate terrain replacement until nobody on the field has this ability
		onTerrainChange(pokemon) {
			//Probably a buggy means of implementing this but should nix a possible feedback loop when it clears terrain on switch-out
			const strongTerrains = ['guardianofnature'];
			const terrain = this.field.terrain;
			//Strong terrains can override Nature Field, and of course Nature Field shouldn't try to overwrite itself.
			//Terrains set by other mons are instantly overridden
			//Even if it's a terrain clear or a terrain set by this mon, if the mon stays in it won't stick. 
			if (!strongTerrains.includes(terrain) && ((this.field.terrainState.source !== pokemon && terrain) || !(pokemon.beingCalledBack || pokemon.switchFlag))) this.field.setTerrain('guardianofnature');
		},
		onEnd(pokemon) {
			if (this.field.terrainState.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target !== pokemon && target.hasAbility('guardianofnature')) {
					this.field.terrainState.source = target;
					return;
				}
			}
			this.field.clearTerrain();
		},
		flags: {},
		name: "Guardian of Nature",
		condition: {
			duration: 0,
			onTryHitPriority: 4,
			//Negate use of terrain moves to replace the terrain
			onTryHit(target, source, effect) {
				if (effect && effect.id.endsWith('terrain') && this.dex.moves.get(effect.id)) return false;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (defender.isGrounded() && !defender.isSemiInvulnerable()) {
					const weakenedMoves = ['earthquake', 'bulldoze', 'magnitude'];
					if (weakenedMoves.includes(move.id)) {
						this.debug('nature field weaken on select ground moves');
						return this.chainModify(0.5);
					}
					if (['Ghost','Ice','Water','Dark'].includes(move.type)) {
						this.debug('nature field weaken');
						return this.chainModify([2867, 4096]);				
					}
				}
				if (attacker.isGrounded() && move.type === 'Grass') {
					this.debug('nature field boost');
					return this.chainModify([5325, 4096]);
				}
			},
			onFieldStart(field, source, effect) {
				if (effect) {
					this.add('-fieldstart', 'ability: Guardian of Nature', '[from] ability: ' + effect.name, '[of] ' + source);
				}
				this.add('-message', `${source.name} summoned a Nature Field!`);
			},
			onResidualOrder: 5,
			onResidualSubOrder: 2,
			onResidual(pokemon) {
				if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
					this.heal(pokemon.baseMaxhp / 16, pokemon, pokemon);
				} else {
					this.debug(`Pokemon semi-invuln or not grounded; Nature Field skipped`);
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'ability: Guardian of Nature');
			},
		},
	},
	//Interacts with custom Brunician mechanics
	grasspelt: {
		inherit: true,
		shortDesc: "x1.5 Defense on Grassy Terrain; x2 Defense on Nature Field",
		onModifyDef(pokemon) {
			if (this.field.isTerrain('grassyterrain')) return this.chainModify(1.5);
			if (this.field.isTerrain('guardianofnature')) return this.chainModify(2);
		},
	},
	//from desvega
	dustdevil: {
		name: "Dust Devil",
		shortDesc: "The Pokémon's Attack is boosted by 50% if Sandstorm is active.",
		onModifyAtk(atk, pokemon) {
			if (this.field.isWeather('sandstorm')) {
				this.chainModify(1.5);
			}
		},
		flags: {},
	},
	poisonsurge: {
		name: "Poison Surge",
		shortDesc: "On switch-in, this Pokemon sets Poison Terrain.",
		onStart(source) {
			this.field.setTerrain('poisonterrain');
		},
		flags: {},
	},
	snowcoat: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ice') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Snow Coat');
				}
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Snow Coat",
		shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Ice moves; Ice immunity.",
	},
	sludgerush: {
		onModifySpe(spe) {
			if (this.field.isTerrain('poisonterrain')) {
				return this.chainModify(2);
			}
		},
		flags: {},
		name: "Sludge Rush",
		shortDesc: "If Poison Terrain is active, this Pokemon's Speed is doubled.",
	},
	railgunner: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.id.endsWith('beam')) {
				return this.chainModify([5325, 4096]);
			}
		},
		flags: {},
		name: "Railgunner",
		shortDesc: "This Pokemon's Beam moves have 1.3x power.",
	},
	powerlock: {
		name: "Power Lock",
		shortDesc: "Pokemon without this ability cannot boost and lose 25% of Max HP instead. They also lose 1/8 max HP as residual chip if they already had positive stat boosts.",
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (target.positiveBoosts() > 0 && !target.hasAbility('powerlock'))
					this.damage(target.baseMaxhp / 8, target, pokemon);
			}
		},
		onAnyAfterBoost(boost, target, source, effect) {
			if (target.hasAbility('powerlock')) return;
			const pokemon = this.effectState.target;
			let activated = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! > 0) {
					delete boost[i];
					activated = true;
				}
			}
			if (activated) this.damage(target.baseMaxhp / 4, target, pokemon);
		},
		flags: {},
	},
	mastermind: {
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.chainModify(2);
		},
		flags: {},
		name: "Mastermind",
		shortDesc: "This Pokemon's Special Attack is doubled.",
	},
	gulpcannon: {
		onDamagingHit(damage, target, source, move) {
			if (!source.hp || !source.isActive || target.transformed || target.isSemiInvulnerable()) return;
			if (['cramorantdesvegagulping', 'toxirantgorging','toxirantgulping', 'cramorantdesvegagorging'].includes(target.species.id)) {
				this.damage(source.baseMaxhp / 4, source, target);
				if (target.species.id.endsWith('gulping')) {
					this.boost({spd: -1}, source, target, null, true);
					target.formeChange(target.species.id === 'toxirantgulping' ? 'toxirant' : 'cramorantdesvega', move);
				} else {
					source.trySetStatus('psn', target, move);
					target.formeChange(target.species.id === 'toxirantgorging' ? 'toxirant' : 'cramorantdesvega', move);
				}
			}
		},
		// The Dive part of this mechanic is implemented in Dive's `onTryMove` in moves.ts
		onSourceTryPrimaryHit(target, source, effect) {
			if (
				effect && effect.id === 'surf' && source.hasAbility('gulpcannon') &&
				['Cramorant-Desvega','Toxirant'].includes(source.species.name) && !source.transformed
			) {
				const forme = source.species.id + (source.hp <= source.maxhp / 2 ? 'gorging' : 'gulping')
				source.formeChange(forme, effect);
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Gulp Cannon",
		shortDesc: "Cramorant-Desvega line: When hit after Surf/Dive, attacker takes 1/4 max HP and -1 Sp. Defense or poison.",
	},
	tacticalmonarch: {
		onStart(pokemon) {
			if (pokemon.m.monarch || pokemon.volatiles['tacticalmonarch']) return;
			for (const target of pokemon.foes()) {
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.moves.get(moveSlot.move);
					if (move.category === 'Status') continue;
					const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
					if (
						this.dex.getImmunity(moveType, pokemon) && this.dex.getEffectiveness(moveType, pokemon) > 0 ||
						move.ohko
					) {
						this.add('-ability', pokemon, 'Tactical Monarch');
						
						//Postpone tactical monarch on others with this ability
						for (const target2 of this.getAllActive()) {
							if (target2 !== pokemon && target2.hasAbility('tacticalmonarch') && !target2.m.monarch) {
								target2.addVolatile('tacticalmonarch');
							}
						}
						pokemon.m.monarch = pokemon.switchFlag = true;
						return;
					}
				}
			}
		},
		onFoeSwitchIn(target) {
			const pokemon = this.effectState.target;
			if (pokemon.m.monarch) return;
			for (const moveSlot of target.moveSlots) {
				const move = this.dex.moves.get(moveSlot.move);
				if (move.category === 'Status') continue;
				const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
				if (
						this.dex.getImmunity(moveType, pokemon) && this.dex.getEffectiveness(moveType, pokemon) > 0 ||
						move.ohko
					) {
						this.add('-ability', pokemon, 'Tactical Monarch');
						//Postpone tactical monarch on others with this ability
						for (const target2 of this.getAllActive()) {
							if (target2 !== pokemon && target2.hasAbility('tacticalmonarch') && !target2.m.monarch) {
								target2.addVolatile('tacticalmonarch');
							}
						}
						pokemon.m.monarch = pokemon.switchFlag = true;
						return;
					}
			}
		},
		condition: {
			duration: 1,
			onAnySwitchIn(target) {
				//Resume activation of ability
				const pokemon = this.effectState.target;
				//The onFoeSwitchIn thing handles the case where it's an opponent switching in, not a teammate
				if (target.isAlly(pokemon)) this.singleEvent('Start', pokemon.getAbility(), pokemon.abilityState, pokemon);
				pokemon.removeVolatile('tacticalmonarch');
			}
		},
		flags: {},
		name: "Tactical Monarch",
		shortDesc: "On switch-in, or when an opponent switches in, switches out if the opponent has a supereffective move. Once per battle.",
	},
	bombardier: {
		shortDesc: "This Pokemon's ball and bomb moves have 1.5x power.",
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bullet']) {
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Bombardier",
	},
	icecurse: {
		onStart(pokemon) {
			let activated = false;
			for (const target of this.getAllActive()) {
				//Third effect is negation from Wonder Evolution
				if (target.hasType('Ice') || !target.isAdjacent(pokemon) || (target.species.isMega && target.item?.endsWith('mask')) || target.volatiles['substitute']
					 || !target.addType('Ice')) continue;
				this.add('-start', target, 'typeadd', 'Ice', '[from] ability: Ice Curse', '[of] ' + pokemon);
			}
		},
		flags: {},
		name: "Ice Curse",
		shortDesc: "On switchin, this Pokemon adds Ice to adjacent Pokemon's typings.",
	},
	rockbottom: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: Rock Bottom", "[of] " + target);
			}
		},
		//clear and invert boost immunity implemented in moves.ts
		flags: {},
		name: "Rock Bottom",
		shortDesc: "This Pokemon's stats cannot be changed by the opponent.",
	},
	
	//buffed
	keeneye: {
		inherit: true,
		onDamage(damage, target, source, effect) {
			if (effect && ['stealthrock', 'spikes'].includes(effect.id)) {
				return false;
			}
		},
		onSetStatus(status, target, source, effect) {
			if (effect && effect.id === 'toxicspikes') return false;
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.id === 'stickyweb') {
				let i: BoostID;
				for (i in boost) {
					if (boost[i]! < 0) {
						delete boost[i];
					}
				}
				return;
			}
			if (source && target === source) return;
			if (boost.accuracy && boost.accuracy < 0) {
				delete boost.accuracy;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "accuracy", "[from] ability: Keen Eye", "[of] " + target);
				}
			}
		},
		shortDesc: "This Pokemon's accuracy can't be lowered by others; ignores their evasiveness stat; immune to hazards.",
	},
	suctioncups: {
		inherit: true,
		shortDesc: "Cannot be forcibly switched out; Allies are protected from opposing self-switch moves.",
		onFoeTryMove(target, source, move) {
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}

			const dazzlingHolder = this.effectState.target;
			if ((source.isAlly(dazzlingHolder) || move.target === 'all') && move.selfSwitch) {
				this.attrLastMove('[still]');
				this.add('cant', dazzlingHolder, 'ability: Suction Cups', move, '[of] ' + target);
				return false;
			}
		},
		flags: {breakable: 1},
	},
	//keen eye buff implemented in moves.ts
	
	mimicry: {
		inherit: true,
		onTerrainChange(pokemon) {
			let types;
			switch (this.field.terrain) {
			case 'electricterrain':
				types = ['Electric'];
				break;
			case 'grassyterrain':
			case 'guardianofnature':
				types = ['Grass'];
				break;
			case 'mistyterrain':
				types = ['Fairy'];
				break;
			case 'psychicterrain':
				types = ['Psychic'];
				break;
			case 'poisonterrain':
				types = ['Poison'];
				break;
			default:
				types = pokemon.baseSpecies.types;
			}
			const oldTypes = pokemon.getTypes();
			if (oldTypes.join() === types.join() || !pokemon.setType(types)) return;
			if (this.field.terrain || pokemon.transformed) {
				this.add('-start', pokemon, 'typechange', types.join('/'), '[from] ability: Mimicry');
				if (!this.field.terrain) this.hint("Transform Mimicry changes you to your original un-transformed types.");
			} else {
				this.add('-activate', pokemon, 'ability: Mimicry');
				this.add('-end', pokemon, 'typechange', '[silent]');
			}
		},
	},
	schooling: {
		inherit: true,
		shortDesc: "Wishiwashi/Slushisloshi: Changes to School Form if it has > 1/4 max HP, else Solo Form.",
		onStart(pokemon) {
			if (!['Slushisloshi','Wishiwashi'].includes(pokemon.baseSpecies.baseSpecies)
				|| pokemon.level < 20 || pokemon.transformed) return;
			if (pokemon.baseSpecies.baseSpecies === 'Slushisloshi' && pokemon.hasItem('slushisloshiscale')) return;
			//Effects of Slushisloshi Scale are coded in that item
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'wishiwashi') {
					pokemon.formeChange('Wishiwashi-School');
				} else if (pokemon.species.id === 'slushisloshi') {
					pokemon.formeChange('Slushisloshi-School');
				}
			} else if (pokemon.species.id === 'wishiwashischool') {
				pokemon.formeChange('Wishiwashi');
			} else if (pokemon.species.id === 'slushisloshischool') {
				pokemon.formeChange('Slushisloshi');
			}
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.hp) 
				this.singleEvent('Start', pokemon.getAbility(), pokemon.abilityState, pokemon);
		},
	},
	
	damp: {
		inherit: true,
		onAnyTryMove(target, source, effect) {
			if (['explosion', 'mindblown', 'mistyexplosion', 'selfdestruct', 'steamingblast'].includes(effect.id)) {
				this.attrLastMove('[still]');
				this.add('cant', this.effectState.target, 'ability: Damp', effect, '[of] ' + target);
				return false;
			}
		},
	},
	pixilate: {
		inherit: true,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball', 'berryblast'
			];
			if (move.type === 'Normal' && !(noModifyType.includes(move.id) || move.category !== 'Status' && (move.isZ || (pokemon.terastallized && move.name === 'Tera Blast')))) {
				move.type = 'Fairy';
				move.pixilateBoosted = true;
			}
		},
	},
	galvanize: {
		inherit: true,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball', 'berryblast'
			];
			if (move.type === 'Normal' && !(noModifyType.includes(move.id) || move.category !== 'Status' && (move.isZ || (pokemon.terastallized && move.name === 'Tera Blast')))) {
				move.type = 'Electric';
				move.galvanizeBoosted = true;
			}
		},
	},
	aerilate: {
		inherit: true,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball', 'berryblast'
			];
			if (move.type === 'Normal' && !(noModifyType.includes(move.id) || move.category !== 'Status' && (move.isZ || (pokemon.terastallized && move.name === 'Tera Blast')))) {
				move.type = 'Flying';
				move.aerilateBoosted = true;
			}
		},
	},
	refrigerate: {
		inherit: true,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball', 'berryblast'
			];
			if (move.type === 'Normal' && !(noModifyType.includes(move.id) || move.category !== 'Status' && (move.isZ || (pokemon.terastallized && move.name === 'Tera Blast')))) {
				move.type = 'Electric';
				move.refrigerateBoosted = true;
			}
		},
	},


	//loria abilities just in case
	// Wind Blaster could need testing.
	windblaster: {
		name: "Wind Blaster",
		shortDesc: "This Pokemon blocks non-contact Flying-type moves and Whirlwind and bounces them back to the user.",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target === source || (move.type !== 'Flying' && move.id !== 'whirlwind') || move.hasBounced || move.flags['contact']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, target, source);
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (target.side === source.side || (move.type !== 'Flying' && move.id !== 'whirlwind') || move.hasBounced || move.flags['contact']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.useMove(newMove, this.effectData.target, source);
			return null;
		},
		condition: {
			duration: 1,
		},
		flags: {breakable: 1},
	},

	piercingvision: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if ((move.ignoreImmunity ||= {}) !== true) {
				move.ignoreImmunity['Psychic'] = true;
			}
		},
		name: "Piercing Vision",
		shortDesc: "Psychic moves hit Dark.",
		rating: 3,
	},	
	deepforest: {
		shortDesc: "While this Pokemon is active, a Grass move used by any Pokemon has 1.33x power.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Deep Forest');
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			if (move.category === 'Status' || move.type !== 'Grass') return;
			if (!move.auraBooster) move.auraBooster = this.effectData.target;
			else if (move.auraBooster !== this.effectData.target) return;
			return this.chainModify([move.hasAuraBreak ? 0x0C00 : 0x1547, 0x1000]);
		},
		flags: {},
		name: "Deep Forest",
		rating: 3,
	},
	deepsea: {
		shortDesc: "While this Pokemon is active, a Water move used by any Pokemon has 1.33x power.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Deep Sea');
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			if (move.category === 'Status' || move.type !== 'Water') return;
			if (!move.auraBooster) move.auraBooster = this.effectData.target;
			else if (move.auraBooster !== this.effectData.target) return;
			return this.chainModify([move.hasAuraBreak ? 0x0C00 : 0x1547, 0x1000]);
		},
		flags: {},
		name: "Deep Sea",
		rating: 3,
	},
	//Same for Patience.
	patience: {
		shortDesc: "This Pokemon takes 50% damage from moves if it hasn't moved yet.",
		onSourceModifyDamage(damage, source, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Patience weaken');
				return this.chainModify(0.5);
			}
		},
		name: "Patience",
		rating: 3.5,
		flags: {breakable: 1},
	},
	
	prowess: {
		shortDesc: "This Pokemon's Sp. Atk is raised by 1 stage if it attacks and KOes another Pokemon.",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({spa: length}, source);
			}
		},
		flags: {},
		name: "Prowess",
		rating: 3,
	},	
	solarflare: {
		shortDesc: "Hyakada: Flare forme in sunlight, else base forme.",
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if (!pokemon.isActive || pokemon.baseSpecies.baseSpecies !== 'Hyakada'
				 || pokemon.transformed || !pokemon.hp) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				if (pokemon.species.id !== 'hyakadaflare') {
					pokemon.formeChange('Hyakada-Flare', this.effect, false, '[msg]');
				}
			} else if (pokemon.species.id === 'hyakadaflare') {
				pokemon.formeChange('Hyakada', this.effect, false, '[msg]');
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Solar Flare",
		rating: 1,
	},
	vigilante: {
		shortDesc: "This Pokemon's Fighting moves deal 1.5x damage.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fighting') {
				this.debug('Vigilante boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fighting') {
				this.debug('Vigilante boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Vigilante",
		rating: 3.5,
	},
	grassycloak: {
		shortDesc: "This Pokemon has 1.25x evasiness in Grassy Terrain.",
		onModifyAccuracyPriority: 8,
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number' || !this.field.isTerrain(['grassyterrain','guardianofnature'])) return;
			this.debug('Grassy Cloak - decreasing accuracy');
			return accuracy * 0.8;
		},
		name: "Grassy Cloak",
		rating: 1.5,
		flags: {breakable: 1},
	},
	soulstrider: {
		shortDesc: "This Pokemon's Speed is raised 1 stage if hit by a Ghost move; Ghost immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ghost') {
				if (!this.boost({spe: 1})) {
					this.add('-immune', target, '[from] ability: Soul Strider');
				}
				return null;
			}
		},
		name: "Soul Strider",
		rating: 3,
		flags: {breakable: 1},
	},
	venomvision: {
		shortDesc: "Pokemon making contact with this Pokemon have their evasiveness lowered by 1 stage.",
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact']) {
				this.add('-ability', target, 'Venom Vision');
				this.boost({evasion: -1}, source, target, null, true);
			}
		},
		flags: {},
		name: "Venom Vision",
		rating: 2,
	},
	terraformer: {
		shortDesc: "Removes terrains upon switch-in.",
		onSwitchInPriority: 6,
		onSwitchIn(pokemon, target, source) {
			this.field.clearTerrain();
		},
		flags: {},
		name: "Terraformer",
	},
	mindprobe: {
		shortDesc: "Reveals the opponent's item and one of their moves upon switch-in.",
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted || !target.item) continue;
				this.add('-item', target, target.getItem().name, '[from] ability: Mind Probe', '[of] ' + pokemon, '[identify]');
			}
			let warnMoves: (Move | Pokemon)[][] = [];
			let warnBp = 1;
			for (const target of pokemon.side.foe.active) {
				if (target.fainted) continue;
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.getMove(moveSlot.move);
					let bp = move.basePower;
					if (move.ohko) bp = 150;
					else if (move.id === 'counter' || move.id === 'metalburst' || move.id === 'mirrorcoat') bp = 120;
					else if (bp === 1 || (!bp && move.category !== 'Status')) bp = 80;
					if (bp > warnBp) {
						warnMoves = [[move, target]];
						warnBp = bp;
					} else if (bp === warnBp) {
						warnMoves.push([move, target]);
					}
				}
			}
			if (!warnMoves.length) return;
			const [warnMoveName, warnTarget] = this.sample(warnMoves);
			this.add('-activate', pokemon, 'ability: Mind Probe', warnMoveName, '[of] ' + warnTarget);
		},
		flags: {},
		name: "Mind Probe",
	},
	gunkconsumer: {
		shortDesc: "Removes hazards upon switch-in and heals 1/16 of max HP for each hazard removed.",
		onSwitchInPriority: 6,
		onSwitchIn(pokemon, target, source) {
         const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
         for (const condition of sideConditions) {
            if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
               this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] ability: Gunk Consumer', '[of] ' + pokemon);
					this.heal(pokemon.maxhp / 16);
            }
          }
		},
		flags: {},
		name: "Gunk Consumer",
	},
	/*
	earthshaker: {
		id: "earthshaker",
		shortDesc: "Placeholder, does nothing right now.",
		name: "Earth Shaker",
		rating: 0.1,
	},
	*/
	earthshaker: {
		shortDesc: "This Pokemon's Ground moves deal 1.5x damage if it was damaged earlier in the turn.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ground') {
				const damagedByTarget = attacker.attackedBy.some(
					p => p.source && p.damage > 0 && p.thisTurn
				);
				if (damagedByTarget) {
					this.debug('Earth Shaker boost for getting hit by ' + defender);
					return this.chainModify(1.5);
				}
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ground') {
				const damagedByTarget = attacker.attackedBy.some(
					p => p.source && p.damage > 0 && p.thisTurn
				);
				if (damagedByTarget) {
					this.debug('Earth Shaker boost for getting hit by ' + defender);
					return this.chainModify(1.5);
				}
			}
		},
		flags: {},
		name: "Earth Shaker",
		rating: 3.5,
	}, 
	
	/*
	hotheaded: {
		id: "hotheaded",
		shortDesc: "Placeholder, does nothing right now.",
		name: "Hot-Headed",
		rating: 0.1,
	},
	*/
	hotheaded: {
		shortDesc: "This Pokemon's critical hit rate is raised by 1 stage after it is damaged by a move.",
		onDamagingHit(damage, target, source, effect) {
			target.addVolatile('gmaxchistrike');
		},
		flags: {},
		name: "Hot-Headed",
		rating: 3.5,
	},
	thoughtful: {
		shortDesc: "Placeholder, does nothing right now.",
		/* shortDesc: "Copies the typing of the last unfainted teammate in this Pokemon's team. 
		onStart(pokemon) {
			let i;
			for (i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
				if (!pokemon.side.pokemon[i]) continue;
				if (!pokemon.side.pokemon[i].fainted) break;
			}
			
			if (!pokemon.side.pokemon[i]) return;
			let chosenTeammate = pokemon.side.pokemon[i];
			if (pokemon === chosenTeammate) return;
			if (chosenTeammate.species.num === 493 || chosenTeammate.species.num === 773) return;
			
			let newBaseTypes = chosenTeammate.getTypes().filter(type => type !== '???');
			if (!newBaseTypes.length) return;
			this.add('-start', pokemon, 'typechange', '[from] ability: Thoughtful');
			pokemon.setType(newBaseTypes);
		},
		*/
		name: "Thoughtful",
		rating: 0.1,
	},
	stonehouse: {
		shortDesc: "When this Pokemon switches in on Stealth Rock, it gains +2 Defense.",
		onSwitchIn(pokemon) {
			this.effectData.switchingIn = true;
		},
		onStart(pokemon) {
			// I'm not sure if getting this ability with stealth rock on your side of the field activates it or if you're immune to Stealth Rock damage, but this should suffice.
			if (pokemon.side.getSideCondition('stealthrock') && this.effectData.switchingIn) {
				this.boost({def: 2});
			}
		},
		flags: {},
		name: "Stone House",
		rating: 0.1,
	},
	treetopper: {
		//shortDesc: "Placeholder, does nothing right now.",
		shortDesc: "When this ability is active, all Pokemon are treated as if under Telekinesis unless forcibly grounded.",
		onStart(pokemon) {
			if (!this.field.getPseudoWeather('gravity')) {
				this.add('-ability', pokemon, 'Tree-Topper');
				this.add('-message', `${pokemon.name} is negating the effects of gravity!`);
			}
		},
		onAnyAccuracyPriority: -1,
		onAnyAccuracy(accuracy, target, source, move) {
			//If the first condition is met it returns true, otherwise the accuracy is untouched
			return (move && !move.ohko && !target.isGrounded()
					  && !['Diglett', 'Dugtrio', 'Palossand', 'Sandygast'].includes(target.baseSpecies.baseSpecies)
					  && target.baseSpecies.name !== 'Gengar-Mega'
					 ) || accuracy;
		},
		flags: {},
		name: "Tree-Topper",
		//rating: 0.1,
	},
	//Loria Region
	//Items eaten by Ravenous after they activate: Focus Sash, Adrenaline Orb, Air Balloon, Blunder Policy, Eject Button, Eject Pack, Luminous Moss, Normal Gem, Red Card, Room Service, Snowball, Weakness Policy
	ravenous: {
		shortDesc: "(Needs testing) Restores 1/6 of this Pokemon's max HP when any item is lost (excl. eating berries and Incinerate).",
		onAnyAfterUseItem(item, pokemon) {
			if (item.isBerry) return;
			const ravenousMon = this.effectState.target;
			this.heal(ravenousMon.baseMaxhp / 6, ravenousMon, ravenousMon);
		},
		//Activating from Knock Off implemented in moves.ts
		flags: {},
		name: "Ravenous",
	},
	precision: {
		shortDesc: "This Pokemon's moves have their accuracy multiplied by 1.3.",
		onSourceModifyAccuracyPriority: 9,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('precision - enhancing accuracy');
			return accuracy * 1.3;
		},
		flags: {},
		name: "Precision",
	},
	energize: {
		shortDesc: "When this Pokemon uses a two-turn move, it recovers 1/6 of its max HP on the first turn.",
		onChargeMove(pokemon, target, move) {
			this.heal(pokemon.baseMaxhp / 6);
		},
		flags: {},
		name: "Energize",
	},
	phaseshift: {
		shortDesc: "Becomes a Water-type if using a Water move or burned, becomes Ice-type if using an Ice move and not burned.",
		onPrepareHit(source, target, move) {
			if (move.hasBounced) return;
			if (move.type === 'Water' || source.status === 'brn') {
				if (source.getTypes().join() === 'Water' || !source.setType('Water')) return;
				this.add('-start', source, 'typechange', 'Water', '[from] ability: Phase Shift');
			}
			//status check redundant here, if burned it would have gone into the previous branch
			else if (move.type === 'Ice' //&& source.status !== 'brn'
				&& source.getTypes().join() !== 'Ice' && source.setType('Ice')) {
				this.add('-start', source, 'typechange', 'Ice', '[from] ability: Phase Shift');
			}
		},
		flags: {},
		name: "Phase Shift",
	},
	bombadier: {
		shortDesc: "This Pokémon explosion, ball, and bomb moves have 1.3x power.",
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bullet'] || ['Explosion', 'Misty Explosion', 'Self-Destruct', 'Mind Blown'].includes(move.id)) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		flags: {},
		name: "Bombadier",
	},
	soaringspirit: {
		shortDesc: "x1.5 power to Flying moves; Ground Immunity; Latter effect nulled by Gravity/Ingrain/Smack Down/Iron Ball.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Flying') {
				this.debug('Soaring Spirit boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Flying') {
				this.debug('Soaring Spirit boost');
				return this.chainModify(1.5);
			}
		},
		name: "Soaring Spirit",
		flags: {breakable: 1},
	},
	suddenguard: {
		shortDesc: "While switching-in, this Pokemon takes 0.5x damage from non-Super Effective moves.",
		onSourceModifyDamage(damage, source, target, move) {
			if (!target.activeTurns && target.runEffectiveness(move) <= 0) {
				this.debug('Sudden Guard weaken');
				return this.chainModify(0.5);
			}
		},
		name: "Sudden Guard",
		flags: {breakable: 1},
	},
	bewitch: {
		shortDesc: "(Needs testing) Moves that can inflict a status condition have their secondary chance doubled.",
		onModifyMovePriority: -2,
		onModifyMove(move) {
			if (move.secondaries) {
				this.debug('doubling secondary chance');
				for (const secondary of move.secondaries) {
					//Of course we have to extend the effects of Dire Claw, Spell Cast, and Tri Attack
					if (['direclaw','spellcast','triattack'].includes(move.id) || secondary.status && secondary.chance) secondary.chance *= 2;
				}
			}
			if (move.self?.status && move.self.chance) move.self.chance *= 2;
		},
		flags: {},
		name: "Bewitch",
	},
	ambitious: {
		shortDesc: "This Pokemon's Speed is raised by 2 when its stats are lowered by a foe.",
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.side === source.side) {
				if (effect.id === 'stickyweb') {
					this.hint("Court Change Sticky Web counts as lowering your own Speed, and Ambitious only affects stats lowered by foes.", true, source.side);
				}
				return;
			}
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					this.boost({spe: 2}, target, target, null, false, true);
					return;
				}
			}
		},
		flags: {},
		name: "Ambitious",
	},
	surfsup: {
		shortDesc: "Tsunamey: Under Rain or before using a Water-type move, change to Surfing form. 1.3x damage with Water-type moves.",
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onBeforeMovePriority: 0.5,
		onBeforeMove(attacker, defender, move) {
			if (attacker.species.name !== 'Tsunamey' || move.type !== 'Water' || attacker.transformed) return;
			attacker.formeChange('Tsunamey-Surfing');
		},
		onWeatherChange(pokemon) {
			if (pokemon.isActive && pokemon.species.id === 'tsunamey' && !pokemon.transformed
				&& pokemon.hp && ['raindance', 'primordialsea'].includes(pokemon.effectiveWeather()))
				pokemon.formeChange('Tsunamey-Surfing');
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.species.name === 'Tsunamey-Surfing') {
				this.debug('Surf\'s Up boost');
				return this.chainModify([5325, 4096]);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.species.name === 'Tsunamey-Surfing') {
				this.debug('Surf\'s Up boost');
				return this.chainModify([5325, 4096]);
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, notransform: 1, failskillswap: 1, cantsuppress: 1},
		name: "Surf's Up",
	},
	battletide: {
		shortDesc: "This Pokemon draws Water moves to itself to raise Attack by 1; Water immunity",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] ability: Battle Tide');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Water' || ['firepledge', 'grasspledge', 'waterpledge'].includes(move.id)) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			const abilHolder = this.effectData.target;
			if (!this.validTarget(abilHolder, source, redirectTarget)) return;
			move.smartTarget &&= false;
			if (abilHolder !== target) {
				this.add('-activate', abilHolder, 'ability: Battle Tide');
			}
			return abilHolder;
		},
		name: "Battle Tide",
		flags: {breakable: 1},
	},
	solarcharge: {
		shortDesc: "If Sunny Day is active, this Pokemon's Atk is 1.5x; loses 1/8 max HP per turn.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.damage(target.baseMaxhp / 8, target, target);
			}
		},
		flags: {},
		name: "Solar Charge",
	},
	eternalice: {
		shortDesc: "This Pokemon is immune to Fire and Fighting-type moves, but it always moves with -1 priority.",
		onTryHit(target, source, move) {
			if (move.target !== 'self' && ['Fighting', 'Fire'].includes(move.type)) {
				this.add('-immune', target, '[from] ability: Eternal Ice');
				return null;
			}
		},
		onModifyPriority(priority, pokemon, target, move) {
				return priority - 1;
		},
		name: "Eternal Ice",
		flags: {breakable: 1},
	},
	traveler: {
		shortDesc: "Removes hazards upon switch-in.",
		onSwitchInPriority: 6,
		onSwitchIn(pokemon, target, source) {
			if (!pokemon.hp) return;
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] ability: Traveler', '[of] ' + pokemon);
				}
			}
		},
		flags: {},
		name: "Traveler",
	},
	magmaabsorb: {
		shortDesc: "This Pokemon's Defense goes up by 1 stage when hit by a Fire-type move; Fire immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.boost({def: 1})) {
					this.add('-immune', target, '[from] ability: Magma Absorb');
				}
				return null;
			}
		},
		name: "Magma Absorb",
		flags: {breakable: 1},
	},
	disastrous: {
		shortDesc: "If hit by a Dark-type move, the foe loses 1/8 of their max HP; Dark and Intimidate immunity.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Dark') {
				if (!this.damage(source.baseMaxhp / 8, source, target)) {
					//This will activate if the attacker had Magic Guard or something
					this.add('-immune', target, '[from] ability: Disastrous');
				}
				return null;
			}
		},
		onBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Disastrous', '[of] ' + target);
			}
		},
		name: "Disastrous",
		flags: {breakable: 1},
	},
	potionbrewer: {
		shortDesc: "(Bugged) Upon using a Psychic-type move, this Pokémon consumes its berry.",
	  	onSourceAfterMoveSecondary(target, source, move) {
		   if (move.type === 'Psychic' && source.getItem()?.isBerry) source.eatItem(true);
		},
		flags: {},
		name: "Potion Brewer",
	},
	ancestorcall: {
		shortDesc: "This Pokemon's Normal-type moves become Ghost-type and have 1.2x power.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball', 'berryblast'
			];
			if (move.type === 'Normal' && !(noModifyType.includes(move.id) || move.category !== 'Status' && (move.isZ || (pokemon.terastallized && move.name === 'Tera Blast')))) {
				move.type = 'Ghost';
				move.ancestorcallBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.ancestorcallBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		flags: {},
		name: "Ancestor Call",
	},

};
