export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	soulfulnoise: {
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.flags['sound']) {
				this.heal(pokemon.baseMaxhp / 8, pokemon);
			}
		},
		flags: {},
		name: "Soulful Noise",
		rating: 3.5,
		shortDesc: "Every time this Pokemon successfully uses a sound move, it heals 12.5% of its max HP.",
	},
	uptime: {
		onUpdate(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.disabled) {
					pokemon.addVolatile('uptime');
				}
			}
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-ability', pokemon, 'Uptime');
				this.add('-message', `${pokemon.name}'s next move will have +1 priority!`);
			},
			onModifyPriority(priority, pokemon, target, move) {
				return priority + 1;
			},
		},
		flags: {},
		name: "Uptime",
		rating: 3.5,
		shortDesc: "If any of this Pokemon's moves are disabled, this Pokemon's next move has +1 priority.",
	},
	sinkorswim: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Sink or Swim', 'boost');
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
		name: "Sink or Swim",
		rating: 3.5,
		shortDesc: "On switch-in, this Pokemon lowers the Speed of opponents by 1 stage.",
	},
	energizer: {
		name: "Energizer",
	   onSwitchOut(pokemon) {
			pokemon.side.addSlotCondition(pokemon, 'energizer');
	   },
	   condition: {
			onSwap(target) {
				 if (!target.fainted) {
					const source = this.effectState.source;
					const damage = this.heal(target.baseMaxhp / 4, target, target);
					this.add('-anim', target, "Charge", target);
					if (damage) this.add('-heal', target, target.getHealth, '[from] ability: Energizer', '[of] ' + this.effectState.source);
					target.cureStatus();
					target.side.removeSlotCondition(target, 'energizer');
				 }
			},
	   },
		flags: {},
		rating: 3,
		shortDesc: "On switch out, replacement heals 25% of their max HP and cures its status.",
	},
	shatteringscream: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				this.debug('Shattering Scream boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Shattering Scream",
		rating: 3.5,
		shortDesc: "This Pokemon's sound moves have their power multiplied by 1.5.",
	},
	slicerdrive: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['slicing']) {
				this.debug('Slicer Drive boost');
				return this.chainModify(1.3);
			}
		},
		onAfterMoveSecondarySelf(target, source, move) {
			const bestStat = target.getBestStat(true, true);
			if (move.flags['slicing'] && this.field.isTerrain('electricterrain')) {
				this.boost({[bestStat]: 1}, target);
			}
		},
		flags: {},
		name: "Slicer Drive",
		rating: 3,
		shortDesc: "This Pokemon's slicing moves deal 1.3x damage and, in Electric Terrain, raise highest stat by 1 stage.",
	},
	distortedaspect: {
		onStart(pokemon) {
			if (pokemon.baseSpecies.name === 'Munkidori-Tera' && !this.effectState.distorted) {
				this.effectState.distorted = true;
				this.boost({spa: 1}, pokemon);
			}
		},
		onSwitchIn() {
			delete this.effectState.distorted;
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Distorted Aspect",
		rating: 3.5,
		shortDesc: "On switch-in, this Pokemon's Special Attack is raised by 1 stage.",
	},
	libre: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday')) {
				pokemon.addVolatile('libre');
			} else if (this.field.weather !== 'sunnyday') {
				// Protosynthesis will not deactivite if Sun is suppressed, hence the direct ID check (isWeather respects supression)
				pokemon.removeVolatile('libre');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['libre'];
			this.add('-end', pokemon, 'Protosynthesis', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				this.add('-activate', pokemon, 'ability: Libre\u0301');
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Libre atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Libre def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Libre spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Libre spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Libre spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Libre\u0301",
		rating: 3,
		shortDesc: "Sunny Day active: highest stat is 1.3x, or 1.5x if Speed.",
	},
	guerillagoo: {
		onModifySpDPriority: 1,
		onModifySpD(spd) {
			return this.chainModify(1.5);
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				const move = this.dex.moves.get(moveSlot.id);
				if (move.category === 'Status' && move.id !== 'mefirst') {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		flags: {breakable: 1},
		name: "Guerilla Goo",
		rating: 3.5,
		shortDesc: "This Pokemon's Sp. Def is 1.5x, but it can only select damaging moves.",
	},
	superioritycomplex: {
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon) {
			let boosted = false;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (this.queue.willMove(target)) {
					boosted = true;
					break;
				}
			}
			if (boosted) {
				this.debug('Superiority Complex boost');
				return this.chainModify([5325, 4096]);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender) {
			if (!defender.activeTurns) {
				this.debug('Superiority Complex boost');
				return this.chainModify([5325, 4096]);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender) {
			if (!defender.activeTurns) {
				this.debug('Superiority Complex boost');
				return this.chainModify([5325, 4096]);
			}
		},
		flags: {},
		name: "Superiority Complex",
		rating: 2.5,
		shortDesc: "This Pokemon's attacks have 1.3x power if it is the first to move in a turn.",
	},
	hungerpains: {
		onUpdate(pokemon) {
			for (const target of this.getAllActive()) {
				if (pokemon.hp < pokemon.maxhp) {
					if (!target.volatiles['torment'] && target !== pokemon) {
						this.add('-ability', pokemon, 'Hunger Pains');
						target.addVolatile('torment');
					}
					if (!target.volatiles['embargo'] && target !== pokemon) {
						this.add('-ability', pokemon, 'Hunger Pains');
						target.addVolatile('embargo');
					}
				} else if (pokemon.hp >= pokemon.maxhp) {
					if (target.volatiles['torment']) {
						this.add('-ability', pokemon, 'Hunger Pains');
						target.removeVolatile('torment');
					}
					if (target.volatiles['embargo']) {
						this.add('-ability', pokemon, 'Hunger Pains');
						target.removeVolatile('embargo');
					}
				}
			}
		},
		flags: {},
		name: "Hunger Pains",
		rating: 2,
		shortDesc: "While this Pokemon is active and its HP isn't full, all other Pokemon are affected by Torment and Embargo.",
	},
	martialmom: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fighting') {
				this.debug('Martial Mom boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fighting') {
				this.debug('Martial Mom boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Martial Mom",
		rating: 3.5,
		shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using a Fighting-type attack.",
	},

	// vanillabilities
	guarddog: {
		onDragOutPriority: 1,
		onDragOut(pokemon) {
			this.add('-activate', pokemon, 'ability: Guard Dog');
			return null;
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.boost({atk: 1}, target, target, null, false, true);
			}
			if (effect.name === 'Sink or Swim' && boost.spe) {
				delete boost.spe;
				this.boost({atk: 1}, target, target, null, false, true);
			}
		},
		flags: {breakable: 1},
		name: "Guard Dog",
		rating: 2,
		num: 275,
	},
	innerfocus: {
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Inner Focus', '[of] ' + target);
			}
			if (effect.name === 'Sink or Swim' && boost.spe) {
				delete boost.spe;
				this.add('-fail', target, 'unboost', 'Speed', '[from] ability: Inner Focus', '[of] ' + target);
			}
		},
		flags: {breakable: 1},
		name: "Inner Focus",
		rating: 1,
		num: 39,
	},
	oblivious: {
		onUpdate(pokemon) {
			if (pokemon.volatiles['attract']) {
				this.add('-activate', pokemon, 'ability: Oblivious');
				pokemon.removeVolatile('attract');
				this.add('-end', pokemon, 'move: Attract', '[from] ability: Oblivious');
			}
			if (pokemon.volatiles['taunt']) {
				this.add('-activate', pokemon, 'ability: Oblivious');
				pokemon.removeVolatile('taunt');
				// Taunt's volatile already sends the -end message when removed
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'attract') return false;
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'attract' || move.id === 'captivate' || move.id === 'taunt') {
				this.add('-immune', pokemon, '[from] ability: Oblivious');
				return null;
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Oblivious', '[of] ' + target);
			}
			if (effect.name === 'Sink or Swim' && boost.spe) {
				delete boost.spe;
				this.add('-fail', target, 'unboost', 'Speed', '[from] ability: Oblivious', '[of] ' + target);
			}
		},
		flags: {breakable: 1},
		name: "Oblivious",
		rating: 1.5,
		num: 12,
	},
	owntempo: {
		onUpdate(pokemon) {
			if (pokemon.volatiles['confusion']) {
				this.add('-activate', pokemon, 'ability: Own Tempo');
				pokemon.removeVolatile('confusion');
			}
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'confusion') return null;
		},
		onHit(target, source, move) {
			if (move?.volatileStatus === 'confusion') {
				this.add('-immune', target, 'confusion', '[from] ability: Own Tempo');
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Own Tempo', '[of] ' + target);
			}
			if (effect.name === 'Sink or Swim' && boost.spe) {
				delete boost.spe;
				this.add('-fail', target, 'unboost', 'Speed', '[from] ability: Own Tempo', '[of] ' + target);
			}
		},
		flags: {breakable: 1},
		name: "Own Tempo",
		rating: 1.5,
		num: 20,
	},
	rattled: {
		onDamagingHit(damage, target, source, move) {
			if (['Dark', 'Bug', 'Ghost'].includes(move.type)) {
				this.boost({spe: 1});
			}
		},
		onAfterBoost(boost, target, source, effect) {
			if ((effect?.name === 'Intimidate' && boost.atk) || (effect?.name === 'Sink or Swim' && boost.spe)) {
				this.boost({spe: 1});
			}
		},
		flags: {},
		name: "Rattled",
		rating: 1,
		num: 155,
	},
	scrappy: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Scrappy', '[of] ' + target);
			}
			if (effect.name === 'Sink or Swim' && boost.spe) {
				delete boost.spe;
				this.add('-fail', target, 'unboost', 'Speed', '[from] ability: Scrappy', '[of] ' + target);
			}
		},
		flags: {},
		name: "Scrappy",
		rating: 3,
		num: 113,
	},
	zerotohero: {
		onSwitchOut(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Palafin') return;
			if (pokemon.terastallized) return;
			if (pokemon.species.forme !== 'Hero') {
				pokemon.formeChange('Palafin-Hero', this.effect, true);
			}
		},
		onSwitchIn() {
			this.effectState.switchingIn = true;
		},
		onStart(pokemon) {
			if (!this.effectState.switchingIn) return;
			if (pokemon.terastallized) return;
			this.effectState.switchingIn = false;
			if (pokemon.baseSpecies.baseSpecies !== 'Palafin') return;
			if (!this.effectState.heroMessageDisplayed && pokemon.species.forme === 'Hero') {
				this.add('-activate', pokemon, 'ability: Zero to Hero');
				this.effectState.heroMessageDisplayed = true;
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1, notransform: 1},
		name: "Zero to Hero",
		rating: 5,
		num: 278,
	},
};
