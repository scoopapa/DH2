import {Pokemon} from '../../../sim/pokemon';
export const Abilities: {[k: string]: ModdedAbilityData} = {
	imterrifiedofdondozo: {
		onDamagingHit(damage, target, source, move) {
			if (source.species.dondozo) {
				this.boost({spe: 1});
			}
		},
		name: "I'm terrified of Dondozo",
		shortDesc: "When hit by Dondozo, speed is increased by one stage.",
	},
	coldcommander: {
		name: "Cold Commander",
		shortDesc: "If Eisugiri, first physical hit deals 0 damage, user transforms into Dondozo. Revert to Eisugiri in hail.",
		onStart(pokemon) {
			if (this.field.isWeather(['hail', 'snow']) &&
				pokemon.species.id === 'eisugiridondozo' && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectData.busted = false;
				pokemon.formeChange('Eisugiri', this.effect, true);
			}
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (source.ability !== 'notpayingattentiontodondozoatallsorry' &&
				effect && effect.effectType === 'Move' && effect.category === 'Physical' &&
				target.species.id === 'eisugiri' && !target.transformed
			) {
				this.add('-activate', target, 'ability: Cold Commander');
				this.effectData.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, type, move) {
			if (!target) return;
			if (source.ability === 'notpayingattentiontodondozoatallsorry') return;
			if (move.category !== 'Physical' || target.species.id !== 'eisugiri' || target.transformed) return;
			if (target.volatiles['substitute'] && !(move.flags['bypasssub'] || move.infiltrates)) return;
			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (source.ability === 'notpayingattentiontodondozoatallsorry') return;
			if (move.category !== 'Physical' || target.species.id !== 'eisugiri' || target.transformed) return;

			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (pokemon.species.id === 'eisugiri' && this.effectData.busted) {
				pokemon.formeChange('Eisugiri-Dondozo', this.effect, true);
			}
		},
		onWeatherChange(pokemon, source, sourceEffect) {
			// snow/hail resuming because Cloud Nine/Air Lock ended does not trigger Ice Face
			if ((sourceEffect as Ability)?.suppressWeather) return;
			if (!pokemon.hp) return;
			if (this.field.isWeather(['hail', 'snow']) &&
				pokemon.species.id === 'eisugirinoice' && !pokemon.transformed) {
				this.add('-activate', pokemon, 'ability: Cold Commander');
				this.effectData.busted = false;
				pokemon.formeChange('Eisugiri', this.effect, true);
			}
		},
		isBreakable: true,
		isPermanent: true,
	},
	nauticalnuke: {
		onDamagingHit(damage, target, source, move) {
			if (!source.hp || !source.isActive || target.transformed || target.isSemiInvulnerable()) return;
			if (target.species.id === 'cramogirigorging') {
				this.damage(source.baseMaxhp / 4, source, target);
				this.boost({atk: -2, def: -2, spa: -2, spd: -2, spe: -2}, source, target, null, true);
				target.formeChange('cramogiri', move);
			}
		},
		// The Dive part of this mechanic is implemented in Dive's `onTryMove` in moves.ts
		onSourceTryPrimaryHit(target, source, effect) {
            if (effect && 
				effect.id === 'surf' && 
				source.hasAbility('nauticalnuke') &&
                source.species.name === 'Cramogiri' && !source.transformed) {
				const forme = 'cramogirigorging';
                source.formeChange(forme, effect);
            }
        },
		isPermanent: true,
		name: "Nautical Nuke",
		shortDesc: "When hit after Surf/Dive, attacker takes 1/4 max HP and -2 to all stats.",
	},
	paramedic: {
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
			pokemon.side.addSlotCondition(pokemon, 'paramedic');
        },
        condition: {
            onStart(pokemon, source) {
                this.effectData.hp = source.maxhp / 3;
            },
            onSwap(target) {
                if (!target.fainted && target.species.dondozo) {
                    const damage = this.heal(this.effectData.hp, target, target);
                    if (damage) this.add('-heal', target, target.getHealth, '[from] ability: Paramedic', '[of] ' + this.effectData.source);
                    target.side.removeSlotCondition(target, 'paramedic');
                }
            },
        },
		name: "Paramedic",
		shortDesc: "If switching out into Dondozo, both Pokemon are healed, each for 33.3% of its Max HP.",
	},
	commanderguard: {
		onTryHit(target, source, move) {
			this.debug('Commander Guard immunity: ' + move.id);
			if (!source.species.dondozo && source.ability !== 'notpayingattentiontodondozoatallsorry') {
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-immune', target, '[from] ability: Commander Guard');
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Commander Guard",
		shortDesc: "This Pokemon can only be hit by Dondozo.",
	},
	notpayingattentiontodondozoatallsorry: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'not paying attention to dondozo at all, sorry');
			this.add('-message', '${pokemon.name} is ignoring Dondozo!');
		},
		//effects in various other abilities
		name: "not paying attention to dondozo at all, sorry",
		shortDesc: "This Pokemon ignores the abilities with Dondozo in it.",
	},
	imperialretreat: {
		onDamagingHit(damage, target, source, move) {
			if (source.species.dondozo) {
				target.switchFlag = true;
				this.add('-activate', target, 'ability: Imperial Retreat');
			}
		},
		name: "Imperial Retreat",
		shortDesc: "This Pokemon switches out when hit by Dondozo.",
	},
	powerofdondozo: {
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectData.target;
			if (pokemon.ability === 'notpayingattentiontodondozoatallsorry') return;
			if (unawareUser === pokemon) return;
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
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Power of Dondozo');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (source.ability === 'notpayingattentiontodondozoatallsorry') return;
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Power of Dondozo');
			}
			return false;
		},
		onUpdate(pokemon) {
			if (pokemon.volatiles['attract']) {
				this.add('-activate', pokemon, 'ability: Power of Dondozo');
				pokemon.removeVolatile('attract');
				this.add('-end', pokemon, 'move: Attract', '[from] ability: Power of Dondozo');
			}
			if (pokemon.volatiles['taunt']) {
				this.add('-activate', pokemon, 'ability: Power of Dondozo');
				pokemon.removeVolatile('taunt');
				// Taunt's volatile already sends the -end message when removed
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'attract') return false;
		},
		onTryHit(pokemon, target, move) {
			if (pokemon.ability === 'notpayingattentiontodondozoatallsorry') return;
			if (move.id === 'attract' || move.id === 'captivate' || move.id === 'taunt') {
				this.add('-immune', pokemon, '[from] ability: Power of Dondozo');
				return null;
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Power of Dondozo', '[of] ' + target);
			}
		},
		isBreakable: true,
		name: "Power of Dondozo",
		shortDesc: "This Pokemon has the abilities of Dondozo.",
	},
	sacrifice: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.foes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Sacrifice', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					console.log(target);
					this.boost({atk: -2, def: -2, spa: -2, spd: -2, spe: -2}, target, pokemon, null, true);
					pokemon.faint();
				}
			}
		},
		name: "Sacrifice",
		shortDesc: "On switchin, this Pokemon jumps into the opponent's mouth, lowering all of its stats by 2.",
	},
	fishingseason: {
		onStart(source) {
            let activated = false;
            for (const pokemon of source.side.foe.active) {
                if (!activated) {
                    this.add('-ability', source, 'Fishing Season');
                }
                activated = true;
                if (!pokemon.volatiles['gastroacid'] && pokemon.species.dondozo) {
                    pokemon.addVolatile('gastroacid');
					pokemon.addVolatile('fishingseason');
                }
            }
        },
        onAnySwitchIn(pokemon) {
            const source = this.effectData.target;
            if (pokemon === source) return;
            for (const target of source.side.foe.active) {
                if (!target.volatiles['gastroacid'] && target.species.dondozo) {
                    target.addVolatile('gastroacid');
					target.addVolatile('fishingseason');
                }
            }
        },
        onEnd(pokemon) {
            const source = this.effectData.target;
            for (const target of source.side.foe.active) {
                target.removeVolatile('gastroacid');
				target.removeVolatile('fishingseason');
            }
        },
		condition: {
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					pokemon.disableMove(moveSlot);
				}
			}
		},
		name: "Fishing Season",
		shortDesc: "While this Pokemon is active, Dondozo is suppressed.",
	},
	fishesofruin: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Fishes of Ruin');
		},
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if(target.activeTurns &&
				   target.ability !== 'fishesofruin' &&
				   target.ability !== 'commatose' &&
				   target.ability !== 'ouroboros' &&
				   target.ability !== 'nauticalnuke' &&
				   target.ability !== 'notpayingattentiontodondozoatallsorry') 
				   target.addVolatile('fishesofruin');
			}
		},
		onFaint(pokemon) {
			for (const target of pokemon.foes()) {
				if(target.volatiles['fishesofruin']) target.removeVolatile('fishesofruin');
			}
		},
		onEnd(pokemon) {
			for (const target of pokemon.foes()) {
				if(target.volatiles['fishesofruin']) target.removeVolatile('fishesofruin');
			}
		},
		condition: {
			onStart(pokemon) {
				pokemon.formeChange('Dondozo');
				/* saving these in case we revert later
				const randAbil = this.random(3);
				if (randAbil < 1) pokemon.setAbility('unaware');
				else if (randAbil < 2) pokemon.setAbility('waterveil');
				else pokemon.setAbility('oblivious');
				*/
			},
			onEnd(pokemon) {
				if (['Dondozo'].includes(pokemon.species.forme)) {
					pokemon.formeChange(pokemon.species.battleOnly as string);
				}
			},
		},
		name: "Fishes of Ruin",
		shortDesc: "While this Pokemon is active, every other active Pokemon is Dondozo.",
	},
	fishout: {
		name: "Fish Out",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp) {
				if (source.ability !== 'notpayingattentiontodondozoatallsorry')
					this.damage(Math.floor(target.getUndynamaxedHP(damage) * 1.546), source, target);
				else this.damage(target.getUndynamaxedHP(damage), source, target);
			}
		},
		shortDesc: "When this Pokemon is knocked out by an opponent's attack, it deals damage to that opponent equal to Dondozo's HP.",
	},
	fishbond: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect?.effectType !== 'Move') return;
			if (source.species.id === 'grenigiri' && source.hp && !source.transformed && source.side.foePokemonLeft()) {
				this.add('-activate', source, 'ability: Fish Bond');
				pokemon.formeChange('Grenigiri-Dondozo', effect, true);
				const randAbil = this.random(3);
				if (randAbil < 1) pokemon.setAbility('unaware');
				else if (randAbil < 2) pokemon.setAbility('waterveil');
				else pokemon.setAbility('oblivious');
			}
		},
		isPermanent: true,
		name: "Fish Bond",
		shortDesc: "When this Pokemon attacks and KOes another Pokemon, it transforms into Dondozo.",
	},
	zombiefish: {
        shortDesc: "When this Pokemon faints, it's replaced by a Dondozo with 1/4 max HP.",
        name: "Zombie Fish",
        onBeforeSwitchIn(pokemon) {
            if (pokemon.zombie) {
                pokemon.setAbility('unaware');
                pokemon.baseAbility = 'unaware';
                pokemon.ability = 'unaware';
                pokemon.zombie = false;
                pokemon.switchedIn = undefined;
            }
        },
        onFaint(pokemon) {
            if (pokemon.species.baseSpecies === 'Drifugiri' && !pokemon.transformed && !pokemon.zombie && this.canSwitch(pokemon.side)) {
                if (pokemon.formeChange('Drifugiri-Dondozo', this.effect, true)) {
                    this.add('-ability', pokemon, 'Zombie Fish');
                    pokemon.zombie = true;
                    pokemon.hp = Math.floor(pokemon.maxhp / 4);
					const randAbil = this.random(3);
					if (randAbil < 1) pokemon.setAbility('unaware');
					else if (randAbil < 2) pokemon.setAbility('waterveil');
					else pokemon.setAbility('oblivious');
					const avalanche = {
						move: "Avalanche",
						id: "avalanche",
						pp: 16,
						maxpp: 16,
						target: "normal",
						disabled: false,
						used: false,
					}
					const curse = {
						move: "Curse",
						id: "curse",
						pp: 16,
						maxpp: 16,
						target: "normal",
						nonGhostTarget: "self",
						disabled: false,
						used: false,
					}
					const sleeptalk = {
						move: "Sleep Talk",
						id: "sleeptalk",
						pp: 16,
						maxpp: 16,
						target: "self",
						disabled: false,
						used: false,
					}
					const rest = {
						move: "Rest",
						id: "rest",
						pp: 16,
						maxpp: 16,
						target: "self",
						disabled: false,
						used: false,
					}
					const eq = {
						move: "Earthquake",
						id: "earthquake",
						pp: 16,
						maxpp: 16,
						target: "allAdjacent",
						disabled: false,
						used: false,
					}
					pokemon.moveSlots[0] = avalanche;
					pokemon.baseMoveSlots[0] = avalanche;
					const randMove = this.random(2);
					if (randMove < 1) {
						pokemon.moveSlots[3] = curse;
						pokemon.baseMoveSlots[3] = curse;
					} else {
						pokemon.moveSlots[3] = sleeptalk;
						pokemon.baseMoveSlots[3] = sleeptalk;
					}
					pokemon.moveSlots[1] = rest;
					pokemon.baseMoveSlots[1] = rest;
					pokemon.moveSlots[2] = eq;
					pokemon.baseMoveSlots[2] = eq;
                }
            }
        },
        isUnbreakable: true,
        isPermanent: true,
        rating: 5,
        num: -1001,
    },
	emergencymeeting: {
		onSwitchIn(pokemon) {
			this.effectData.switchingIn = true;
		},
		onStart(pokemon) {
			this.add('-message', `${pokemon.name} transformed into Dondozo!`);
			pokemon.formeChange('Dondozo');
			pokemon.species.dondozo = true;
			const randAbil = this.random(3);
			if (randAbil < 1) pokemon.setAbility('unaware');
			else if (randAbil < 2) pokemon.setAbility('waterveil');
			else pokemon.setAbility('oblivious');
			const liquidation = {
				move: "Liquidation",
				id: "liquidation",
				pp: 5,
				maxpp: 5,
				target: "normal",
				disabled: false,
				used: false,
			}
			const curse = {
				move: "Curse",
				id: "curse",
				pp: 5,
				maxpp: 5,
				target: "normal",
				nonGhostTarget: "self",
				disabled: false,
				used: false,
			}
			const sleeptalk = {
				move: "Sleep Talk",
				id: "sleeptalk",
				pp: 5,
				maxpp: 5,
				target: "self",
				disabled: false,
				used: false,
			}
			const rest = {
				move: "Rest",
				id: "rest",
				pp: 5,
				maxpp: 5,
				target: "self",
				disabled: false,
				used: false,
			}
			const bodypress = {
				move: "Body Press",
				id: "bodypress",
				pp: 5,
				maxpp: 5,
				target: "normal",
				disabled: false,
				used: false,
			}
			pokemon.moveSlots[0] = liquidation;
			pokemon.baseMoveSlots[0] = liquidation;
			const randMove = this.random(2);
			if (randMove < 1) {
				pokemon.moveSlots[3] = curse;
				pokemon.baseMoveSlots[3] = curse;
			} else {
				pokemon.moveSlots[3] = sleeptalk;
				pokemon.baseMoveSlots[3] = sleeptalk;
			}
			pokemon.moveSlots[1] = rest;
			pokemon.baseMoveSlots[1] = rest;
			pokemon.moveSlots[2] = bodypress;
			pokemon.baseMoveSlots[2] = bodypress;
		},
		name: "Emergency Meeting",
		shortDesc: "On switchin, this Pokemon transforms into Dondozo.",
	},
	yeah: {
        onStart(pokemon) {
			console.log(pokemon.side.pokemon.filter(pokemon => pokemon.species.dondozo && !pokemon.fainted));
            const dondozo = pokemon.side.pokemon.filter(pokemon => pokemon.species.dondozo && !pokemon.fainted).length;
            this.add('-start', pokemon, `Dondozo: ${this.effectData.dondozo}`, '[silent]');
            this.boost({atk: dondozo * 2, def: dondozo * 2, spa:dondozo *  2, spd: dondozo * 2, spe: dondozo * 2});
            this.effectData.dondozo = dondozo;
        },
        onEnd(pokemon) {
            this.add('-end', pokemon, `Dondozo: ${this.effectData.dondozo}`, '[silent]');
        },
        name: "yeah",
        shortDesc: "On switchin, this Pokemon gains +2 to all stats for each Dondozo on its team.",
    },
	callforhelp: {
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (source.ability !== 'notpayingattentiontodondozoatallsorry' &&
				effect && effect.effectType === 'Move' &&
				['mimigiri'].includes(target.species.id) && !target.transformed
			) {
				this.add('-activate', target, 'ability: Call for Help');
				this.effectData.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (source.ability === 'notpayingattentiontodondozoatallsorry') return;
			if (!['mimigiri', 'mimigiritotem'].includes(target.species.id) || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target || move.category === 'Status') return;
			if (source.ability === 'notpayingattentiontodondozoatallsorry') return;
			if (!['mimigiri'].includes(target.species.id) || target.transformed) {
				return;
			}

			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (['mimigiri', 'mimigiritotem'].includes(pokemon.species.id) && this.effectData.busted) {
				const speciesid = 'Mimigiri-Dondozo';
				pokemon.formeChange(speciesid, this.effect, true);
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon, this.dex.getSpecies(speciesid));
				const randAbil = this.random(3);
				if (randAbil < 1) pokemon.setAbility('unaware');
				else if (randAbil < 2) pokemon.setAbility('waterveil');
				else pokemon.setAbility('oblivious');
			}
		},
		isBreakable: true,
		isPermanent: true,
		name: "Call for Help",
		shortDesc: "(Mimigiri only) The first hit it takes is blocked, and it takes 1/8 HP damage instead and becomes Dondozo.",
	},
	ouroboros: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Ouroboros');
			this.boost({atk: 2, def: 2, spa: 2, spd: 2, spe:2},);
			pokemon.faint();
			//pokemon.addVolatile('trapped');
		},
		/*
		onUpdate(pokemon) {
			if (pokemon.volatiles['attract']) {
				this.add('-activate', pokemon, 'ability: Ouroboros');
				pokemon.removeVolatile('attract');
				this.add('-end', pokemon, 'move: Attract', '[from] ability: Ouroboros');
			}
			if (pokemon.volatiles['taunt']) {
				this.add('-activate', pokemon, 'ability: Ouroboros');
				pokemon.removeVolatile('taunt');
				// Taunt's volatile already sends the -end message when removed
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'attract') return false;
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'attract' || move.id === 'captivate' || move.id === 'taunt') {
				this.add('-immune', pokemon, '[from] ability: Ouroboros');
				return null;
			}
		},*/
		name: "Ouroboros",
		shortDesc: "On switchin, this Pokemon jumps into its own mouth and gains +2 in all stats.",
	},
	bozotodozo: {
		onSwitchOut(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Palagiri' || pokemon.transformed) return;
			if (pokemon.species.forme !== 'Dondozo') {
				pokemon.formeChange('Palagiri-Dondozo', this.effect, true);
			}
		},
		onSwitchIn() {
			this.effectData.switchingIn = true;
		},
		onStart(pokemon) {
			if (!this.effectData.switchingIn) return;
			this.effectData.switchingIn = false;
			if (pokemon.baseSpecies.baseSpecies !== 'Palagiri' || pokemon.transformed) return;
			if (!this.effectData.heroMessageDisplayed && pokemon.species.forme === 'Dondozo') {
				this.add('-activate', pokemon, 'ability: Bozo to Dozo');
				this.effectData.heroMessageDisplayed = true;
				const randAbil = this.random(3);
				if (randAbil < 1) pokemon.setAbility('unaware');
				else if (randAbil < 2) pokemon.setAbility('waterveil');
				else pokemon.setAbility('oblivious');
			}
		},
		isPermanent: true,
		name: "Bozo to Dozo",
		shortDesc: "This Pokemon transforms into Dondozo when switching out.",
	},
	donzoless: {
		onModifyCritRatio(critRatio, source, target) {
			if (target.species.dondozo) return 5;
		},
		name: "Donzoless",
		shortDesc: "This Pokemon's attacks are critical hits against Dondozo.",
	},
	falsedragon: {
		onBeforeSwitchIn(pokemon) {
			const set = {
			   name: "Dondozo",
			   moves: ["Liquidation", "Body Press", "Curse", "Rest"],
			}
			pokemon.illusion = new Pokemon(set, pokemon.side);
		},
		onDamagingHit(damage, target, source, move) {
			if (target.illusion) {
				this.singleEvent('End', this.dex.getAbility('False Dragon'), target.abilityState, target, source, move);
			}
		},
		onEnd(pokemon) {
			if (pokemon.illusion) {
				this.debug('illusion cleared');
				pokemon.illusion = null;
				const details = pokemon.species.name + (pokemon.level === 100 ? '' : ', L' + pokemon.level) +
					(pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
				this.add('replace', pokemon, details);
				this.add('-end', pokemon, 'False Dragon');
			}
		},
		onFaint(pokemon) {
			pokemon.illusion = null;
		},
		name: "False Dragon",
		shortDesc: "(placeholder) This Pokemon is disguised as Dondozo until it takes a hit.",
	},
	dondozoshield: {
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Minigiri' || pokemon.transformed) return;
			if (pokemon.hp < pokemon.maxhp / 2) {
				if (!pokemon.species.dondozo) {
					pokemon.formeChange('Minigiri-Dondozo');
				}
			} else {
				if (pokemon.species.dondozo) {
					pokemon.formeChange(pokemon.set.species);
				}
			}
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Minigiri' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.hp < pokemon.maxhp / 2) {
				if (!pokemon.species.dondozo) {
					pokemon.formeChange('Minigiri-Dondozo');
				}
			} else {
				if (pokemon.species.dondozo) {
					pokemon.formeChange(pokemon.set.species);
				}
			}
		},
		isPermanent: true,
		name: "Dondozo Shield",
		shortDesc: "At 1/2 max HP or less, this Pokemon transforms into Dondozo.",
	},
	dondontzo: {
		onAnyTryMove(target, source, effect) {
			if (target.species.dondozo) {
				this.attrLastMove('[still]');
				this.add('cant', this.effectData.source, 'ability: Dondon\'tzo', effect, '[of] ' + target);
				return false;
			}
		},
		isBreakable: true,
		name: "Dondon\'tzo",
		shortDesc: "Prevents Dondozo's moves while this ability is active.",
	},
	dondono: {
		onTryHit(target, source, move) {
			if (target !== source && source.species.dondozo) {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Dondo-No');
				}
				return null;
			}
		},
		isBreakable: true,
		name: "Dondo-No",
		shortDesc: "This Pokemon heals 1/4 max HP when hit by Dondozo; immunity to Dondozo.",
	},
	gyeah: {
		onUpdate(pokemon) {
			let target = null;
			for (const foe of pokemon.foes()) {
				target = foe;
			}
			if (pokemon.baseSpecies.baseSpecies !== 'Malagiri' ||
				!target.species.dondozo) {
				// Handle any edge cases
				if (pokemon.getVolatile('gyeahperpetrator')) pokemon.removeVolatile('gyeahperpetrator');
				return;
			}

			if (!pokemon.getVolatile('gyeahperpetrator')) {
				// If Dondozo already was gyeah-victim this fails
				if (target.getVolatile('gyeahvictim')) return;
				// Cancel all actions this turn for pokemon if applicable
				this.queue.cancelAction(pokemon);
				// Add volatiles to both pokemon
				this.add('-activate', pokemon, 'ability: gyeah', '[of] ' + target);
				pokemon.addVolatile('gyeahperpetrator');
				target.addVolatile('gyeahvictim', pokemon);
				// Continued in conditions.ts in the volatiles
			} else {
				if (!target.fainted) return;
				pokemon.removeVolatile('gyeahperpetrator');
			}
		},
		name: "gyeah",
		shortDesc: "If enemy is Dondozo: this Pokemon cannot act or be hit, -2 to Dondozo's stats.",
	},
	fishnet: {
		onFoeTrapPokemon(pokemon) {
            if (!this.isAdjacent(pokemon, this.effectData.target)) return;
            if (pokemon.species.dondozo) {
                pokemon.tryTrap(true);
            }
        },
        onFoeMaybeTrapPokemon(pokemon, source) {
            if (!source) source = this.effectData.target;
            if (!source || !this.isAdjacent(pokemon, source)) return;
            if (pokemon.species.dondozo) { // Negate immunity if the type is unknown
                pokemon.maybeTrapped = true;
            }
        },
		name: "Fishnet",
		shortDesc: "Prevents opposing Dondozo from switching out.",
	},
	commatose: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Commatose');
		},
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Commatose');
			}
			return false;
		},
		//effect in pokedex.ts
		name: "Commatose",
		isPermanent: true,
		shortDesc: "This Pokemon cannot be statused, and is considered to be Dondozo.",
	},
	byeah: {
		onModifyMovePriority: 1,
		onModifyMove(move, attacker, defender) {
			if (attacker.species.baseSpecies !== 'Aegigiri' || attacker.transformed) return;
			if (move.category === 'Status' && move.id !== 'kingsshield') return;
			const targetForme = (move.id === 'kingsshield' ? 'Aegigiri' : 'Aegigiri-Dondozo');
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
		},
		isPermanent: true,
		name: "byeah",
		shortDesc: "This Pokemon changes to Dondozo before it attacks.",
	},
	facingfears: {
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
				if (target.species.dondozo) {
					this.add('-ability', pokemon, 'Anticipation');
					this.boost({atk: 2, def: 2, spa: 2, spd: 2, spe:2});
					return;	
				}
			}
		},
		name: "Facing Fears",
		shortDesc: "On switch-in, shudders and gains +2 to all stats if the foe is Dondozo.",
	},
}
