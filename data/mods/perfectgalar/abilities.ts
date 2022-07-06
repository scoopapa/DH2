export const Abilities: {[k: string]: ModdedAbilityData} = {
	screencleaner: {
		desc: "On switch-in, this Pokémon ends the effects of screens, hazards, and terrain for both the user's and the opposing side.",
		shortDesc: "Removes screens, hazards, and terrain on switch-in.",
		onStart(pokemon) {
			let activated = false;
			this.field.clearTerrain();
			for (const sideCondition of ['reflect', 'lightscreen', 'auroraveil', 'steelsurge', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb']) {
				if (pokemon.side.removeSideCondition(sideCondition)) {
					if (!activated) {
						this.add('-activate', pokemon, 'ability: Screen Cleaner');
						activated = true;
					}
					this.add('-sideend', pokemon.side, this.dex.getEffect(sideCondition).name);
				}
				if (pokemon.side.foe.removeSideCondition(sideCondition)) {
					if (!activated) {
						this.add('-activate', pokemon, 'ability: Screen Cleaner');
						activated = true;
					}
					this.add('-sideend', pokemon.side.foe, this.dex.getEffect(sideCondition).name);
				}
			}
		},
		id: "screencleaner",
		name: "Screen Cleaner",
		rating: 2,
		num: 251,
	},
	gorillatactics: {
		inherit: true,
		onModifyAtk(atk, pokemon) {
			// PLACEHOLDER
			this.debug('Gorilla Tactics Atk Boost');
			return this.chainModify(1.5);
		},
		onDisableMove(pokemon) {
			if (!pokemon.abilityData.choiceLock) return;
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== pokemon.abilityData.choiceLock) {
					pokemon.disableMove(moveSlot.id, false, this.effectData.sourceEffect);
				}
			}
		},
	},
	curiousmedicine: {
		onStart(pokemon) {
			let activated = false;
			for (const target of this.getAllActive()) {
				if (!activated && (target.status || target.boosts)) {
					this.add('-ability', pokemon, 'Curious Medicine');
					activated = true;
				}
				target.clearBoosts();
				target.cureStatus();
			}
		},
		name: "Curious Medicine",
		rating: 0,
		num: 261,
	},
	lightmetal: {
		shortDesc: "Reduces damage from contact moves 25%.",
		onSourceModifyDamage(damage, source, target, move) {
			if (move.flags['contact']) return this.chainModify(0.75);
		},
		name: "Light Metal",
		rating: 1,
		num: 135,
	},
	transistor: {
		shortDesc: "Electric moves: 30% stronger, make contact",
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Electric') {
				move.flags.contact = 1;
			}
			if (move.flags['contact']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		name: "Transistor",
		rating: 3.5,
		num: 262,
	},
	dragonsmaw: {
		shortDesc: "Dragon Moves: 30% stronger, are all biting moves.",
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Dragon') {
				move.flags.bite = 1;
			}
			if (move.flags['bite']) {
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		name: "Dragon's Maw",
		rating: 3.5,
		num: 263,
	},
	slowstart: {
		shortDesc: "Atk, Spe halved for 5 turns. Ally regis reduce turns.",
		onStart(pokemon) {
			if ( !pokemon.slowStartInit ) {
				pokemon.slowStartInit = true;
				pokemon.slowStartTurns = 5;
				for (const ally of pokemon.side.pokemon) {
					if (["Registeel", "Regice", "Regirock", "Regieleki", "Regidrago"].includes( ally.name )) {
						pokemon.slowStartTurns--;
					}
				}
			}
			if (pokemon.slowStartTurns > 0) pokemon.addVolatile('slowstart');
		},
		onResidual(pokemon) {
			if (pokemon.slowStartTurns && pokemon.slowStartTurns > 0) pokemon.slowStartTurns--;
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['slowstart'];
			this.add('-end', pokemon, 'Slow Start', '[silent]');
		},
		condition: {
			duration: 5,
			durationCallback(pokemon) {
				return pokemon.slowStartTurns
			},
			onStart(target) {
				this.add('-start', target, 'ability: Slow Start');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(0.8);
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.8);
			},
			onEnd(target) {
				this.add('-end', target, 'Slow Start');
			},
		},
		name: "Slow Start",
		rating: -1,
		num: 112,
	},
	grimneigh: {
		shortDesc: "Lowers foe's SpA on switch-in.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Grim Neigh', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spa: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Grim Neigh",
		rating: 3,
		num: 265,
	},
	pastelveil: {
		shortDesc: "Immune to Poison-type moves.",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Poison') {
				return null;
			}
		},
		name: "Pastel Veil",
		rating: 2,
		num: 257,
	},
	minus: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Minus', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spd: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Minus",
		rating: 3.5,
		num: 58,
	},
	dauntlessshield: {
		name: "Dauntless Shield",
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectData.target;
			if (unawareUser === pokemon || !pokemon.hasDynamaxed) return;
			if (unawareUser === this.activePokemon && pokemon === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (pokemon === this.activePokemon && unawareUser === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['def'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		rating: 4,
		num: 235,
	},
	intrepidsword: {
		onModifyCritRatio(critRatio, source, target) {
			if (target.hasDynamaxed) return 5;
		},
		name: "Intrepid Sword",
		rating: 1.5,
		num: 234,
	},
	quickdraw: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move.flags['bullet'] && pokemon.activeMoveActions <= 1) {
				return priority + 1;
			}
		},
		name: "Quick Draw",
		rating: 4,
		num: 259,
	},
	libero: {
		onAfterMove(source) {
			 
			let move = this.activeMove;
			if (move.hasBounced) return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Libero');
			}
		},
		name: "Libero",
		rating: 4.5,
		num: 236,
	},
	shadowtag: {
		onFoeTrapPokemon(pokemon) {
			if (!pokemon.hasAbility('shadowtag') && this.isAdjacent(pokemon, this.effectData.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectData.target;
			if (!source || !this.isAdjacent(pokemon, source)) return;
			if (!pokemon.hasAbility('shadowtag')) {
				pokemon.maybeTrapped = true;
			}
		},
		onTrapPokemon(pokemon) {
			pokemon.trapped = true;
		},
		name: "Shadow Tag",
		rating: 5,
		num: 23,
	},
	arenatrap: {
		onFoeTrapPokemon(pokemon) {
			const targetWeight = pokemon.getWeight();
			if (targetWeight < 1500 ) return;
			if (!this.isAdjacent(pokemon, this.effectData.target)) return;
			if (pokemon.isGrounded()) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectData.target;
			const targetWeight = pokemon.getWeight();
			if (targetWeight < 1500 ) return;
			if (!source || !this.isAdjacent(pokemon, source)) return;
			if (pokemon.isGrounded(!pokemon.knownType)) { // Negate immunity if the type is unknown
				pokemon.maybeTrapped = true;
			}
		},
		name: "Arena Trap",
		rating: 5,
		num: 71,
	},
	
//-----------------------------forme changes---------------------------------------------------------------------------------
	"stancechange": {
		inherit: true,
		onBeforeMove(attacker, defender, move) {
			if (attacker.species.baseSpecies !== 'Aegislash' || attacker.transformed) return;
			if (move.category === 'Status' && move.id !== 'kingsshield') return;
			let targetSpecies = (move.id === 'kingsshield' ? 'Aegislash' : 'Aegislash-Blade');
			if (attacker.species.species !== targetSpecies){
				attacker.formeChange(targetSpecies);
				this.doMaxBoostFormeChange( attacker, false );
			}
		},
		onSwitchOut( pokemon ){
			pokemon.formeChange('Aegislash');
			this.doMaxBoostFormeChange( pokemon, true );
		},
	},
	"hungerswitch": {
		inherit: true,
		onResidual(pokemon) {
			if (pokemon.species.baseSpecies !== 'Morpeko' || pokemon.transformed) return;
			let targetForme = pokemon.species.species === 'Morpeko' ? 'Morpeko-Hangry' : 'Morpeko';
			pokemon.formeChange(targetForme);
			this.doMaxBoostFormeChange( pokemon, true );
		},
	},
	"flowergift": {
		inherit: true,
		onUpdate(pokemon) {
			if (!pokemon.isActive || pokemon.baseSpecies.baseSpecies !== 'Cherrim' || pokemon.transformed) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				if (pokemon.species.speciesid !== 'cherrimsunshine') {
					pokemon.formeChange('Cherrim-Sunshine', this.effect, false, '[msg]');
					this.doMaxBoostFormeChange( pokemon, false );
				}
			} else {
				if (pokemon.species.speciesid === 'cherrimsunshine') {
					pokemon.formeChange('Cherrim', this.effect, false, '[msg]');
					this.doMaxBoostFormeChange( pokemon, false );
				}
			}
		},
	},
	"disguise": {
		inherit: true,
		onUpdate(pokemon) {
			if (['mimikyu', 'mimikyutotem'].includes(pokemon.species.speciesid) && this.effectData.busted) {
				let speciesid = pokemon.species.speciesid === 'mimikyutotem' ? 'Mimikyu-Busted-Totem' : 'Mimikyu-Busted';
				pokemon.formeChange(speciesid, this.effect, true);
				this.doMaxBoostFormeChange( pokemon, true );
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon);
			}
		},
	},
	"iceface": {
		inherit: true,
		onStart(pokemon) {
			if (this.field.isWeather('hail') && pokemon.species.speciesid === 'eiscuenoice' && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectData.busted = false;
				pokemon.formeChange('Eiscue', this.effect, true);
				this.doMaxBoostFormeChange( pokemon, true );
			}
		},
		onUpdate(pokemon) {
			if (pokemon.species.speciesid === 'eiscue' && this.effectData.busted) {
				pokemon.formeChange('Eiscue-Noice', this.effect, true);
				this.doMaxBoostFormeChange( pokemon, true );
			}
		},
		onAnyWeatherStart() {
			const pokemon = this.effectData.target;
			if (this.field.isWeather('hail') && pokemon.species.speciesid === 'eiscuenoice' && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectData.busted = false;
				pokemon.formeChange('Eiscue', this.effect, true);
				this.doMaxBoostFormeChange( pokemon, true );
			}
		},
	},
	"gulpmissile": {
		inherit: true,
		onDamage(damage, target, source, effect) {
			// Needs to trigger even if cramorant is about to faint
			if (effect && effect.effectType === 'Move' && ['cramorantgulping', 'cramorantgorging'].includes(target.species.speciesid) && !target.transformed) {
				// Forme change before damaging to avoid a potential infinite loop with surf cramorant vs surf cramorant
				const forme = target.species.speciesid;
				target.formeChange('cramorant', effect);
				this.doMaxBoostFormeChange( target, false );
				this.damage(source.baseMaxhp / 4, source, target);
				if (forme === 'cramorantgulping') {
					this.boost({def: -1}, source, target, null, true);
				} else {
					source.trySetStatus('par', target, effect);
				}
			}
		},
		onAfterMove(pokemon, target, move) {
			if (pokemon.species.species !== 'Cramorant' || pokemon.transformed || !['dive', 'surf'].includes(move.id) || pokemon.volatiles['dive']) return;
			const forme = pokemon.hp <= pokemon.maxhp / 2 ? 'cramorantgorging' : 'cramorantgulping';
			pokemon.formeChange(forme, move);
			this.doMaxBoostFormeChange( pokemon, false );
		},
	},
};
