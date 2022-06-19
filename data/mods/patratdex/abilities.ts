export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
  	chitinize: {
  		onModifyTypePriority: -1,
  		onModifyType(move, pokemon) {
  			const noModifyType = [
  				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
  			];
  			if (move.type === 'Normal' && !noModifyType.includes(move.id) && !(move.isZ && move.category !== 'Status')) {
  				move.type = 'Bug';
  				move.pixilateBoosted = true;
  			}
  		},
  		onBasePowerPriority: 23,
  		onBasePower(basePower, pokemon, target, move) {
  			if (move.pixilateBoosted) return this.chainModify([0x1333, 0x1000]);
  		},
  		name: "Chitinize",
  		rating: 4,
  		num: 9001,
	},

	decoy: {
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (
				effect && effect.effectType === 'Move' &&
				['carnivinepatratdex'].includes(target.species.id) && !target.transformed
			) {
				this.add('-activate', target, 'ability: Decoy');
				this.effectData.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (!['carnivinepatratdex'].includes(target.species.id) || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (!['carnivinepatratdex'].includes(target.species.id) || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (['carnivinepatratdex'].includes(pokemon.species.id) && this.effectData.busted) {
				const speciesid = pokemon.species.id === 'carnivinepatratdex' ? 'Carnivine-Patratdex-Revealed' : 'Carnivine-Patratdex-Revealed';
				pokemon.formeChange(speciesid, this.effect, true);
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon, this.dex.getSpecies(speciesid));
			}
		},
		isPermanent: true,
		name: "Decoy",
		rating: 3.5,
		num: 9002,
	},

	electroreception: {
		onSourceModifyAccuracyPriority: 9,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('compoundeyes - enhancing accuracy');
			return accuracy * 1.3;
		},
		name: "Electroreception",
		rating: 3,
		num: 9003,
	},

	fieldreport: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move.id === 'sunnyday' || move.id === 'raindance' || move.id === 'sandstorm' || move.id === 'hail' || move.id === 'electricterrain' || move.id === 'psychicterrain' || move.id === 'grassyterrain' || move.id === 'mistyterrain') {
				move.pranksterBoosted = true;
				return priority + 1;
			}
		},
		name: "Field Report",
		rating: 4,
		num: 9004,
	},

 	hammerhead: {
		onStart(pokemon) {
			delete this.effectData.forme;
			pokemon.transformed = false	
		},
		onDamagingHit(damage, target, source, move) {
			//if (target.isSemiInvulnerable()) return;
			if (target.transformed) {
				this.damage(source.baseMaxhp / 4, source, target);
				target.formeChange('Ostrata', move, true);
			}
		},
		onSourceTryPrimaryHit(target, source, effect) {
			if (source.species.baseSpecies !== 'Ostrata' || source.species.name === 'Ostrata-Hammer') return;
			if (
				effect && (effect.id === 'drillrun' || effect.id === 'dig') && source.hasAbility('hammerhead')
			) {
				if (source.transformed) return;
				source.formeChange('Ostrata-Hammer', this.effect);
				source.transformed = true
			}
		},
		isPermanent: true,
		name: "Hammer Head",
		rating: 2.5,
		num: 9005,
	},

	hayveil: {
		onBeforeMovePriority: 0.5,
		onBeforeMove(attacker, defender, move) {
			if (attacker.species.baseSpecies !== 'Incrownito' || attacker.transformed) return;
			if (move.category === 'Status' && move.id !== 'wheatshield') return;
			const targetForme = (move.id === 'wheatshield' ? 'Incrownito' : 'Incrownito-Flock');
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
		},
		isPermanent: true,
		name: "Hay Veil",
		rating: 4,
		num: 9006,
	},

	raingrow: {
		onStart(pokemon) {
			delete this.effectData.forme;
		},
		onUpdate(pokemon) {
			if (!pokemon.isActive || pokemon.baseSpecies.baseSpecies !== 'Monsoonura' || pokemon.transformed) return;
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				if (pokemon.species.id !== 'monsoonurachunky') {
					pokemon.formeChange('Monsoonura-Chunky', this.effect, false, '[msg]');
				}
			} else {
				if (pokemon.species.id === 'monsoonurachunky') {
					pokemon.formeChange('Monsoonura', this.effect, false, '[msg]');
				}
			}
		},
		name: "Raingrow",
		rating: 1,
		num: 9007,
	},
};
