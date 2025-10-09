export const Abilities: {[k: string]: ModdedAbilityData} = {
	/*
	placeholder: {
		
		flags: {},
		name: "",
		shortDesc: "",
	},
	*/
	goodasmold: {
		onTryHit(target, source, move) {
			if (move.category === 'Status' && target !== source) {
				this.add('-immune', target, '[from] ability: Good as Mold');
				target.setAbility('mycelliummight');
				return null;
			}
		},
		flags: {},
		name: "Good as Mold",
		shortDesc: "Immunity to Status moves; changes to Mycellium Might after activating.",
	},
	starfall: {
		onStart(source) {
			this.field.setWeather('meteorshower');
		},
		flags: {},
		name: "Starfall",
		shortDesc: "On switchin, this Pokemon summons Meteor Shower.",
	},
	ligma: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		flags: {},
		name: "Ligma",
		shortDesc: "Pokemon using non-contact attacks against this Pokemon lose 1/8 of their max HP."
	},
	ligmaaura: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Ligma Aura');
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Fire') return;
			if (!move.auraBooster?.hasAbility('Ligma Aura')) move.auraBooster = this.effectState.target;
			if (move.auraBooster !== this.effectState.target) return;
			return this.chainModify([move.hasAuraBreak ? 3072 : 5448, 4096]);
		},
		flags: {},
		name: "Ligma Aura",
		shortDesc: "While this Pokemon is active, a Fire move used by any Pokemon has 1.33x power.",
	},
	coolingsystem: {
		onStart(source) {
			for (const action of this.queue) {
				if (action.choice === 'runPrimal' && action.pokemon === source && source.species.id === 'kyogre') return;
				if (action.choice !== 'runSwitch' && action.choice !== 'runPrimal') break;
			}
			this.field.setWeather('raindance');
		},
		onDamagingHit(damage, target, source, move) {
			if (this.field.isWeather('raindance')) {
				this.heal(target.baseMaxhp / 16);
			}
		},
		flags: {},
		name: "Cooling System",
		shortDesc: "Sets Rain; When hit a by damaging move in Rain, recovers 1/16 of max Health.",
	},
	mactonight: {
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'meteorshower') {
				this.heal(target.baseMaxhp / 8);
			}
		},
		flags: {},
		name: "Mac Tonight",
		shortDesc: "This Pokemon gains 1/8th of its max HP every turn during Meteor Shower.",
	},
	theoriginal: {
		onBasePowerPriority: 24,
		onBasePower(basePower, pokemon, target) {
			if (target.hasType(pokemon.getTypes())) {
				return this.chainModify(1.3);
			}
		},
		flags: {},
		name: "The Original",
		shortDesc: "This Pokemon's moves deal 1.3x damage to targets that share a type with it.",
	},
	starwalker: {
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather('meteorshower')) {
				return this.chainModify(2);
			}
		},
		flags: {},
		name: "Starwalker",
		shortDesc: "If Meteor Shower is active, this Pokemon's Speed is doubled.",
	},
	starguard: {
		onDamage(damage, target, source, effect) {
			if (this.field.isWeather('meteorshower') && effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		flags: {},
		name: "Star Guard",
		shortDesc: "If Meteor Shower is active, this Pokemon is immune to indirect damage.",
	},
	plunder: {
		onAfterMoveSecondarySelf(source, target, move) {
			if (source.stole || !move || !target || !target.lastMove || target.moveSlots.length === 1) return;
			if (target !== source && move.category !== 'Status') {
				let learnedMove = false;
				for (let i = 0; i < target.moveSlots.length; i ++) {
					const temp = target.moveSlots[i];
					const moveSlot = this.dex.moves.get(temp.id);
					if (moveSlot === null || source.moveSlots.some(move => (move.name === temp.move) || temp.move !== target.lastMove.name)) continue;
					this.attrLastMove('[still]');
					learnedMove = {
						move: moveSlot,
						id: moveSlot.id,
						pp: moveSlot.pp,
						maxpp: moveSlot.pp,
						target: moveSlot.target,
						disabled: false,
						used: false,
					};
					source.moveSlots[source.moveSlots.length] = learnedMove;
					source.baseMoveSlots[source.moveSlots.length] = learnedMove;
					target.moveSlots.splice(i, 1);
					target.baseMoveSlots.splice(i, 1);
					source.stole = true;
					break;
				}
				if (learnedMove) this.add('-message', `${source.name} stole ${target.name}'s ${learnedMove.move}!`);
			}
		},
		flags: {},
		name: "Plunder",
		shortDesc: "This Pokemon's first attack steals the target's last used move, if any, from their moveset and adds it to its own. Once per battle.",
	},
	humansacrifice: {
		shortDesc: "If this Pokemon attacks & KO’s a target, it restores 1/3 max HP.",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.add('-activate', source, 'ability: Human Sacrifice');
				this.heal(source.baseMaxhp / 3, source, source, effect);
			}
		},
		name: "Human Sacrifice",
	},
	shiningmoon: {
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectState.target;
			if (unawareUser === pokemon) return;
			if (unawareUser === this.activePokemon && unawareUser === this.activeTarget) {
				if (boosts['evasion'] > 0) boosts['evasion'] = 0;
			}
			if (pokemon === this.activePokemon && pokemon === this.activeTarget) {
				if (boosts['accuracy'] < 0) boosts['accuracy'] = 0;
			}
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'meteorshower') {
				this.heal(target.baseMaxhp / 16);
			}
		},
		flags: {},
		name: "Shining Moon",
		shortDesc: "User ignores its acc drops and target's eva boosts; heals 1/16 in Meteor Shower.",
	},
	mimicry: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (!this.field.terrain || !pokemon.isGrounded()) return;
			if (move.type === 'Steel' && pokemon.hasType("Steel")) return this.chainModify([2, 3]);
			switch (this.field.terrain) {
			case 'electricterrain':
				if (move.type === 'Electric') return this.chainModify(1.5);
				break;
			case 'grassyterrain':
				if (move.type === 'Grass') return this.chainModify(1.5);
				break;
			case 'mistyterrain':
				if (move.type === 'Fairy') return this.chainModify(1.5);
				break;
			case 'psychicterrain':
				if (move.type === 'Psychic') return this.chainModify(1.5);
				break;
			}
		},
		flags: {},
		name: "Mimicry",
		shortDesc: "This Pokemon loses Steel STAB but gains corresponding STAB in terrain.",
	},
	protosandthesis: {
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			// Protosandthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sandstorm')) {
				pokemon.addVolatile('protosandthesis');
			} else if (!pokemon.volatiles['protosandthesis']?.fromBooster && this.field.weather !== 'sandstorm') {
				// Protosandthesis will not deactivite if Sand is suppressed, hence the direct ID check (isWeather respects supression)
				pokemon.removeVolatile('protosandthesis');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['protosandthesis'];
			this.add('-end', pokemon, 'Protosandthesis', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protosandthesis', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protosandthesis');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosandthesis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Protosandthesis atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Protosandthesis def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Protosandthesis spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Protosandthesis spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Protosandthesis spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosandthesis');
			},
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1},
		name: "Protosandthesis",
		shortDesc: "Sand or Booster Energy: highest stat is 1.3x, 1.5x if Speed. Sand Immunity.",
	},
	dejavu: {
		onStart(source) {
			this.field.setWeather('deltastream');
		},
		onAnySetWeather(target, source, weather) {
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
			if (this.field.getWeather().id === 'deltastream' && !strongWeathers.includes(weather.id)) return false;
		},
		onEnd(pokemon) {
			if (this.field.weatherState.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('deltastream')) {
					this.field.weatherState.source = target;
					return;
				}
			}
			this.field.clearWeather();
		},
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (attacker !== this.effectState.target && move.category === 'Special') {
				this.debug('Deja Vu boost');
				return this.chainModify([5325, 4096]);
			}
		},
		onCriticalHit: false,
		flags: {breakable: 1},
		name: "Deja Vu",
		shortDesc: "Shell Armor + Delta Stream + Battery.",
	},
	punchdrunk: {
		onDamagingHit(damage, target, source, move) {
			if (move.flags['punch']) {
				this.boost({atk: 1}, target, target);
				target.addVolatile('torment');
			}
		},
		flags: {},
		name: "Punch Drunk",
		shortDesc: "When this Pokemon is damaged by a Punching move, it gains +1 Attack and Torment.",
	},
	rulerscoronation: {
		// Hazard Shield handled within conditions.ts
		onSwitchOut(pokemon) {
			this.add('-ability', pokemon, 'Ruler\'s Coronation');
			this.add('-message', pokemon.name + " has been crowned!");
			pokemon.side.addSlotCondition('rulerscoronation');
		},
		condition: {
			duration: 1,
			onSwap(target) {
				if (!target.fainted) {
					target.addVolatile('hazardshield');
				}
				target.side.removeSlotCondition(target, 'rulerscoronation');
			},
		},
		flags: {},
		name: "Ruler's Coronation",
		shortDesc: "On switch out, incoming ally gets protected from hazards.",
	},
	man: {
		onSwitchIn(pokemon) {
			if (pokemon.addType('Normal')) this.add('-start', pokemon, 'typeadd', 'Normal', '[from] ability: Man');
		},
		name: "Man",
		flags: {},
		shortDesc: "This Pokemon gains the normal type on switch in.",
	},
	utau: {
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.category === 'Physical' && move.type === 'Normal') {
				move.flags.sound = 1;
				move.flags.bypasssub = 1;
				return this.chainModify(1.5);
			}
		},
		name: "Utau",
		flags: {},
		shortDesc: "Physical Normal moves have 1.5x power and become Sound."
	},
	energize: {
		onAnyAfterSetStatus(status, target, source, effect) {
			if (!source.hasAbility('energize')) return;
			if (source !== this.effectState.target || target === source || effect.effectType !== 'Move') return;
			if (status.id === 'par') {
				this.heal(source.baseMaxhp / 8);
			}
		},
		flags: {},
		name: "Energize",
		shortDesc: "When this Pokemon paralyzes a target, it recovers 12.5% max HP."
	},
	intoxicate: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Poison';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Intoxicate",
		shortDesc: "Normal type moves become Poison type and receive a 20% power boost."
	},
	delayedpunchline: {
		onBeforeMove(pokemon, target, move) {
			if(move.id === 'chillyreception') {
				const reaction = this.dex.getActiveMove('futuresight');
				this.actions.useMove(reaction, source, target);
			}
		},
		flags: {},
		name: "Delayed Punchline",
		shortDesc: "When this pokémon is about to use Chilly Reception, it first uses Future Sight."
	},
	crazysmoke: {
		// Belch interaction implemented within moves.ts
		onSourceModifyDamage(damage, source, target, move) {
			if (source.hasType(move.type)) {
				this.debug('Crazy Smoke Weaken');
				return this.chainModify(0.8);
			}
		},
		flags: {breakable: 1},
		name: "Crazy Smoke",
		shortDesc: "Reduces damage taken by 20% from moves that do not match their user's type. Belch can be used without eating a berry."
	},
};
