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
		shortDesc: "This Pokemon's Normal-type moves become Bug-type and have 1.2x base power.",
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
				this.effectState.busted = true;
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
			if (['carnivinepatratdex'].includes(pokemon.species.id) && this.effectState.busted) {
				const speciesid = pokemon.species.id === 'carnivinepatratdex' ? 'Carnivine-Patratdex-Revealed' : 'Carnivine-Patratdex-Revealed';
				pokemon.formeChange(speciesid, this.effect, true);
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon, this.dex.species.get(speciesid));
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Decoy",
		shortDesc: "The first hit it takes is blocked, and it takes 1/8 HP damage instead.",
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
		shortDesc: "This Pokemon's moves have their accuracy multiplied by 1.3.",
		rating: 3,
		num: 9003,
	},

	fieldreport: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move.id === 'sunnyday' || move.id === 'raindance' || move.id === 'sandstorm' || move.id === 'hail' || move.id === 'electricterrain' || move.id === 'psychicterrain' || move.id === 'grassyterrain' || move.id === 'mistyterrain' || move.id === 'chillyreception' || move.id === 'snowscape' || move.id === 'naturesbounty') {
				move.pranksterBoosted = true;
				return priority + 1;
			}
		},
		name: "Field Report",
		shortDesc: "This Pokemon's weather and terrain moves have priority raised by 1.",
		rating: 4,
		num: 9004,
	},

 	hammerhead: {
		onStart(pokemon) {
			delete this.effectState.forme;
			pokemon.transformed = false;
		},
		onDamagingHit(damage, target, source, move) {
			// if (target.isSemiInvulnerable()) return;
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
				source.transformed = true;
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Hammer Head",
		shortDesc: "When hit after Drill Run/Dig, attacker takes 1/4 max HP.",
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
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Hay Veil",
		shortDesc: "Changes Forme to Flock before attacks and Scarecrow before Wheat Shield.",
		rating: 4,
		num: 9006,
	},

	raingrow: {
		onStart(pokemon) {
			delete this.effectState.forme;
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
		shortDesc: "If Rain Dance is active, it becomes Chunky.",
		rating: 1,
		num: 9007,
	},
	superconductor: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.type === 'Electric') return priority + 1;
		},
		flags: {},
		name: "Super Conductor",
		shortDesc: "Electric moves: +1 priority.",
		rating: 1.5,
		num: 9008,
	},
	wintercoat: {
  		onSourceModifyAtkPriority: 6,
  		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice') {
				this.debug('Winter Coat weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice') {
				this.debug('Winter Coat weaken');
				return this.chainModify(0.5);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'frz') {
				this.add('-activate', pokemon, 'ability: Winter Coat');
				pokemon.cureStatus();
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'frz') return false;
		},
		flags: { breakable: 1 },
		name: "Winter Coat",
		shortDesc: "Ice-type moves used against this Pokemon deal half damage; freeze immunity.",
		rating: 3.5,
		num: 9009,
	},
};
