export const Abilities: {[abilityid: string]: AbilityData} = {
	//alt ex
	grimneigh: {
		onFaint(source, target) {
			for (const target of this.getAllActive()) {
				target.clearBoosts();
				this.add('-clearboost', target, '[from] ability: Grim Neigh', '[of] ' + source);
				target.cureStatus();
			}
		},
		name: "Grim Neigh",
		shortDesc: "Upon fainting, all active Pokemon have their stat changes and non-volatile status cleared.",
		rating: 3,
		num: 265,
	},
	screencleaner: {
		onStart(pokemon) {
			let activated = false;
			for (const sideCondition of ['reflect', 'lightscreen', 'auroraveil']) {
				if (pokemon.side.getSideCondition(sideCondition)) {
					if (!activated) {
						this.add('-activate', pokemon, 'ability: Screen Cleaner');
						activated = true;
					}
					pokemon.side.removeSideCondition(sideCondition);
				}
				if (pokemon.side.foe.getSideCondition(sideCondition)) {
					if (!activated) {
						this.add('-activate', pokemon, 'ability: Screen Cleaner');
						activated = true;
					}
					pokemon.side.foe.removeSideCondition(sideCondition);
				}
			}
			for (const pseudoWeather of ['wonderroom', 'trickroom', 'magicroom']) {
				if (pokemon.side.getPseudoWeather(pseudoWeather)) {
					if (!activated) {
						this.add('-activate', pokemon, 'ability: Screen Cleaner');
						activated = true;
					}
					pokemon.side.removePseudoWeather(pseudoWeather);
				}
				if (pokemon.side.foe.getPseudoWeather(pseudoWeather)) {
					if (!activated) {
						this.add('-activate', pokemon, 'ability: Screen Cleaner');
						activated = true;
					}
					pokemon.side.foe.removePseudoWeather(pseudoWeather);
				}
			}
			this.field.clearTerrain();
		},
		shortDesc: "On switch-in, the effects of Screens, Terrains and Rooms end for both sides.",
		inherit: true,
	},
	plus: {
		onDamagingHit(damage, target, source, effect) {
			this.boost({spa: 1});
		},
		name: "Plus",
		shortDesc: "This Pokemon's SpA is raised by 1 stage when hit by an attack.",
		rating: 3.5,
		num: 57,
	},
	energyloop: {
		onPrepareHit(source, target, move) {
			if(move?.category !== 'Status') {
				this.heal(target.baseMaxhp / 16);
			}
		},
		name: "Energy Loop",
		shortDesc: "This Pokemon heals 1/16 of its max HP before using an attacking move.",
		rating: 3.5,
		num: -13,
	},
	shockproof: {
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'par') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Shockproof');
			}
			return false;
		},
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Electric') {
				return this.chainModify(0.5);
			}
		},
		isBreakable: true,
		name: "Shockproof",
		shortDesc: "This Pokemon takes halved damage from Electric-type moves; paralysis immunity.",
		rating: 2,
		num: -37,
	},
	skybreach: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.type === 'Water' && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Flying';
			}
		},
		name: "Sky Breach",
		shortDesc: "This Pokemon's Water-type moves become Flying-type.",
		rating: 3,
		num: -19,
	},
	
	//boe
	cleansingfire: {
		onAnyFaintPriority: 1,
		onAnyFaint() {
			if(!this.effectData.target.hp) return;
			this.debug('cleansingfire');
			this.add('-activate', this.effectData.target, 'ability: Cleansing Fire');
			this.effectData.target.cureStatus();
		},
		name: "Cleansing Fire",
		shortDesc: "When a Pokemon faints, this Pokemon's status is cured.",
		rating: 3.5,
		num: -1,
	},

	//megas revisted
	merciless: {
		shortDesc: "This Pokemon's attacks are critical hits if the target is statused.",
		onModifyCritRatio(critRatio, source, target) {
			if (target && ['psn', 'tox', 'brn', 'frz', 'slp', 'par'].includes(target.status) /* && !target.hasAbility('neutralizinggas') */) return 5;
		},
		name: "Merciless",
		rating: 1.5,
		num: 196,
		gen: 6,
	},
	
	//poketypos
	myceliummight: {
		onFractionalPriorityPriority: -1,
		onFractionalPriority(priority, pokemon, target, move) {
			if (move.category === 'Status') {
				return -0.1;
			}
		},
		onModifyMove(move) {
			if (move.category === 'Status') {
				move.ignoreAbility = true;
			}
      },
		onModifyMove(move) {
			if (move.category === 'Status') {
				move.ignoreVolatiles = true;
			}
		},
		name: "Mycelium Might",
		rating: 2,
		num: 298,
	},
	
	//fesv
	holygrail: {
	  shortDesc: "Good As Gold + Levitate",
		onTryHit(target, source, move) {
			if (move.category === 'Status' && target !== source) {
				this.add('-immune', target, '[from] ability: Holy Grail');
				return null;
			}
		},
		isBreakable: true,
	  name: "Holy Grail",
    },
	faultyphoton: {
	  shortDesc: "Disguise + Quark Drive",
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (
				effect && effect.effectType === 'Move' && target.species.id === 'ironmimic' && !target.transformed
			) {
				this.add('-activate', target, 'ability: Faulty Photon');
				this.effectData.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (target.species.id !== 'ironmimic' || target.transformed) return;
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates/* && this.gen >= 6*/);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (target.species.id !== 'ironmimic' || target.transformed) return;
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates/* && this.gen >= 6*/);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (pokemon.species.id === 'ironmimic' && this.effectData.busted) {
				const speciesid = /*pokemon.species.id === 'mimikyutotem' ? 'Mimikyu-Busted-Totem' :*/ 'Iron Mimic-Busted';
				pokemon.formeChange(speciesid, this.effect, true);
				this.add('-start', pokemon, 'typechange', pokemon.getTypes(true).join('/'), '[silent]');
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon, this.dex.getSpecies(speciesid));
				pokemon.addVolatile('faultyphoton');
				//pokemon.volatiles['faultyphoton'].fromBooster = true;
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['faultyphoton'];
			this.add('-end', pokemon, 'Faulty Photon', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {/*
				if (effect?.id === 'boosterenergy') {
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Faulty Photon', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Faulty Photon');
				}*/
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'faultyphoton' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk') return;
				this.debug('Faulty Photon atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def') return;
				this.debug('Faulty Photon def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa') return;
				this.debug('Faulty Photon spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd') return;
				this.debug('Faulty Photon spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe') return;
				this.debug('Faulty Photon spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Faulty Photon');
			},
		},
		isPermanent: true,
		name: "Faulty Photon",
		rating: 3,
	},
	slushie: {
	  shortDesc: "Mold Breaker + Slush Rush",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Slushie');
			this.add('-message', `${pokemon.name} is drinking a slushie!`);
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
		onModifySpe(spe, pokemon) {
			if (['hail', 'snow'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		name: "Slushie",
		rating: 3,
	},
	pillage: {
		id: "pillage",
		name: "Pillage",
		shortDesc: "On switch-in, swaps ability with the opponent.",
		onSwitchIn(pokemon) {
			this.effectData.switchingIn = true;
		},
		onStart(pokemon) {
			if ((pokemon.side.foe.active.some(
				foeActive => foeActive && this.isAdjacent(pokemon, foeActive) && foeActive.ability === 'noability'
			))
			|| pokemon.species.id !== 'zoinkazenta') {
				this.effectData.gaveUp = true;
			}
		},
		onUpdate(pokemon) {
			if (!pokemon.isStarted || this.effectData.gaveUp) return;
			if (!this.effectData.switchingIn) return;
			const possibleTargets = pokemon.side.foe.active.filter(foeActive => foeActive && this.isAdjacent(pokemon, foeActive));
			while (possibleTargets.length) {
				let rand = 0;
				if (possibleTargets.length > 1) rand = this.random(possibleTargets.length);
				const target = possibleTargets[rand];
				const ability = target.getAbility();
				const additionalBannedAbilities = [
					// Zen Mode included here for compatability with Gen 5-6
					'noability', 'flowergift', 'forecast', 'hungerswitch', 'illusion', 'pillage',
					'imposter', 'neutralizinggas', 'powerofalchemy', 'receiver', 'trace', 'zenmode',
				];
				if (target.getAbility().isPermanent || additionalBannedAbilities.includes(target.ability)) {
					possibleTargets.splice(rand, 1);
					continue;
				}
				target.setAbility('pillage', pokemon);
				pokemon.setAbility(ability);
				
				this.add('-activate', pokemon, 'ability: Pillage');
				this.add('-activate', pokemon, 'Skill Swap', '', '', '[of] ' + target);
				this.add('-activate', pokemon, 'ability: ' + ability.name);
				this.add('-activate', target, 'ability: Pillage');
				return;
			}
		},
	},

};