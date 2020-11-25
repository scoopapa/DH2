export const Abilities: {[k: string]: ModdedAbilityData} = {
	"screencleaner": {
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
	"gorillatactics": {
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
	lightmetal: {
		onSourceModifyDamage(damage, source, target, move) {
			if (move.flags['contact']) return this.chainModify(0.75);
		},
		name: "Light Metal",
		rating: 1,
		num: 135,
	},
	transistor: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Electric') {
				move.flags.contact = 1;
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		name: "Transistor",
		rating: 3.5,
		num: 262,
	},
	dragonsmaw: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Dragon') {
				move.flags.bite = 1;
				return this.chainModify(1.3);
			}
		},
		name: "Dragon's Maw",
		rating: 3.5,
		num: 263,
	},
	slowstart: {
		onStart(pokemon) {
			if ( !pokemon.slowStartTurns ) {
				pokemon.slowStartTurns = 5;
				for (const pokemon of pokemon.side.active) {
					if (["Registeel", "Regice", "Regirock", "Regieleki", "Regidrago"].includes( pokemon.species )) pokemon.slowStartTurns--;
				}
			}
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
			}
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
//-----------------------------forme changes---------------------------------------------------------------------------------
	"stancechange": {
		inherit: true,
		onBeforeMove(attacker, defender, move) {
			if (attacker.template.baseSpecies !== 'Aegislash' || attacker.transformed) return;
			if (move.category === 'Status' && move.id !== 'kingsshield') return;
			let targetSpecies = (move.id === 'kingsshield' ? 'Aegislash' : 'Aegislash-Blade');
			if (attacker.template.species !== targetSpecies){
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
			if (pokemon.template.baseSpecies !== 'Morpeko' || pokemon.transformed) return;
			let targetForme = pokemon.template.species === 'Morpeko' ? 'Morpeko-Hangry' : 'Morpeko';
			pokemon.formeChange(targetForme);
			this.doMaxBoostFormeChange( pokemon, true );
		},
	},
	"flowergift": {
		inherit: true,
		onUpdate(pokemon) {
			if (!pokemon.isActive || pokemon.baseTemplate.baseSpecies !== 'Cherrim' || pokemon.transformed) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				if (pokemon.template.speciesid !== 'cherrimsunshine') {
					pokemon.formeChange('Cherrim-Sunshine', this.effect, false, '[msg]');
					this.doMaxBoostFormeChange( pokemon, false );
				}
			} else {
				if (pokemon.template.speciesid === 'cherrimsunshine') {
					pokemon.formeChange('Cherrim', this.effect, false, '[msg]');
					this.doMaxBoostFormeChange( pokemon, false );
				}
			}
		},
	},
	"disguise": {
		inherit: true,
		onUpdate(pokemon) {
			if (['mimikyu', 'mimikyutotem'].includes(pokemon.template.speciesid) && this.effectData.busted) {
				let templateid = pokemon.template.speciesid === 'mimikyutotem' ? 'Mimikyu-Busted-Totem' : 'Mimikyu-Busted';
				pokemon.formeChange(templateid, this.effect, true);
				this.doMaxBoostFormeChange( pokemon, true );
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon);
			}
		},
	},
	"iceface": {
		inherit: true,
		onStart(pokemon) {
			if (this.field.isWeather('hail') && pokemon.template.speciesid === 'eiscuenoice' && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectData.busted = false;
				pokemon.formeChange('Eiscue', this.effect, true);
				this.doMaxBoostFormeChange( pokemon, true );
			}
		},
		onUpdate(pokemon) {
			if (pokemon.template.speciesid === 'eiscue' && this.effectData.busted) {
				pokemon.formeChange('Eiscue-Noice', this.effect, true);
				this.doMaxBoostFormeChange( pokemon, true );
			}
		},
		onAnyWeatherStart() {
			const pokemon = this.effectData.target;
			if (this.field.isWeather('hail') && pokemon.template.speciesid === 'eiscuenoice' && !pokemon.transformed) {
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
			if (effect && effect.effectType === 'Move' && ['cramorantgulping', 'cramorantgorging'].includes(target.template.speciesid) && !target.transformed) {
				// Forme change before damaging to avoid a potential infinite loop with surf cramorant vs surf cramorant
				const forme = target.template.speciesid;
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
			if (pokemon.template.species !== 'Cramorant' || pokemon.transformed || !['dive', 'surf'].includes(move.id) || pokemon.volatiles['dive']) return;
			const forme = pokemon.hp <= pokemon.maxhp / 2 ? 'cramorantgorging' : 'cramorantgulping';
			pokemon.formeChange(forme, move);
			this.doMaxBoostFormeChange( pokemon, false );
		},
	},
};
