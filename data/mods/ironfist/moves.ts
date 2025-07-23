import {FS} from '../../../lib';
import {toID} from '../../../sim/dex-data';
import {Pokemon} from "../../../sim/pokemon";

// Similar to User.usergroups. Cannot import here due to users.ts requiring Chat
// This also acts as a cache, meaning ranks will only update when a hotpatch/restart occurs
const usergroups: {[userid: string]: string} = {};
const usergroupData = FS('config/usergroups.csv').readIfExistsSync().split('\n');
for (const row of usergroupData) {
	if (!toID(row)) continue;

	const cells = row.split(',');
	if (cells.length > 3) throw new Error(`Invalid entry when parsing usergroups.csv`);
	usergroups[toID(cells[0])] = cells[1].trim() || ' ';
}

export function getName(name: string): string {
	const userid = toID(name);
	if (!userid) throw new Error('No/Invalid name passed to getSymbol');

	const group = usergroups[userid] || ' ';
	return group + name;
}
export const Moves: {[moveid: string]: ModdedMoveData} = {
	/*
	placeholder: {
		name: "",
		type: "",
		category: "",
		basePower: 0,
		accuracy: 100,
		pp: 10,
		shortDesc: "",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	*/

	//slate 1
	silcoonsexactmovepool: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "silcoonsexactmovepool",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(source) {
			this.actions.useMove("Tackle", source);
			this.actions.useMove("String Shot", source);
			this.actions.useMove("Poison Sting", source);
			this.actions.useMove("Bug Bite", source);
			this.actions.useMove("Iron Defense", source);
		},
		secondary: null,
		target: "self",
		type: "Bug",
		shortDesc: "Uses Tackle, String Shot, Poison Sting, Bug Bite, and Iron Defense.",
	},
  	pog: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "POG",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "G-Max Steelsurge", target);
		},
		onEffectiveness(typeMod, target, type) {
            if (target.getTypes()[0] === type || target.terastallized) return 1;
            else return 0;
        },
		target: "normal",
		type: "Steel",
		shortDesc: "Always super-effective.",
		contestType: "Beautiful",
	},
  	velvetblade: {
		accuracy: 100,
		basePower: 90,
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Night Slash", target);
		},
		category: "Physical",
		name: "Velvet Blade",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
		onModifyMove(move, pokemon, target) {
            let newMoveName;
			let activated = false;
            for (const moveSlot of pokemon.moveSlots) {
                const temp = this.dex.moves.get(moveSlot.id);
                if (temp.category === 'Status') {
                    newMoveName = temp.name;
					activated = true;
                    break;
                }
            }
            if (activated) move.name = newMoveName;
			else move.basePower /= 2;
        },
		secondary: null,
		target: "normal",
		type: "Dark",
		shortDesc: "Disguises as the user's first Status move. Else halved power.",
		contestType: "Tough",
	},
  	mogoff: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Mog Off",
		shortDesc: "50% chance to lower the target's Atk/SpA by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Bulk Up", target);
		},
		onModifyMove(move, pokemon, target) {
			if (pokemon.ability === 'benevolentblessing') {
				move.secondary = null;
				move.onHit = function(target, source) {
					if (this.randomChance(1, 2)) this.actions.useMove('swagger', source, source);
					else this.actions.useMove("selfdestruct", source, target);
				};
			}
		},
		secondary: {
			chance: 50,
			boosts: {
				atk: -1,
				spa: -1,
			},
		},
		target: "any",
		type: "Silly",
		contestType: "Tough",
		//shortDesc: "50% chance to confuse the target.",
	},
  	chocolatekiss: {
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Chocolate Kiss",
		pp: 20,
		priority: 1,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Lovely Kiss", target);
		},
		secondary: {
			chance: 10,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Fairy",
		shortDesc: "Usually moves first. 10% chance to lower target's Speed by 1.",
		contestType: "Cool",
	},
  	fishingminigame: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Fishing Minigame",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, fishing: 1,},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Anchor Shot", target);
		},
		onHit(target, source, move) {
			if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "Prevents the target from switching out.",
	},
  	stankyleg: {
		accuracy: 95,
		basePower: 60,
		category: "Physical",
		name: "Stanky Leg",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Rolling Kick", target);
		},
		secondary: {
			chance: 100,
			status: 'tox',
		},
		target: "normal",
		type: "Poison",
		contestType: "Cool",
		shortDesc: "100% chance to badly poison the target.",
	},
  	triplerkick: {
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		category: "Physical",
		name: "Tripler Kick",
		shortDesc: "Hits 3 times. Each hit can miss, but power rises.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Triple Kick", target);
		},
		multihit: 3,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMove: {basePower: 120},
		maxMove: {basePower: 140},
	},
	gorgingmissile: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Gorging Missile",
		shortDesc: "If user is under 50% max HP, paralyzes the opponent.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, fishing: 1,},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Snipe Shot", target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				move.status = 'par';
			}
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	goombastomp: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Goomba Stomp",
		shortDesc: "100% chance for -1 Defense. OHKOs Goomba.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1, foot: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "High Jump Kick", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		onModifyMove(move, pokemon) {
			for (const target of pokemon.foes()) {
				if (target.baseSpecies == "Goomba") {
					if (target.volatiles['bigbutton']) {
						basePower = 0;
						damageCallback = function (target) {
							return this.clampIntRange(target.getUndynamaxedHP() / 3, 1);
						}
					} else {
						move.ohko = true;
						move.accuracy = true;
					}
				}
			}
		},
		target: "normal",
		type: "Normal",
		contestType: "Clever",
	},
	splash: {
		inherit: true,
		flags: {snatch: 1, fishing: 1, metronome: 1},
		shortDesc: "Feebas: remove all tokens and gain +1 all stats for each 2.",
		onTryHit(target, source, move) {
			if(target.baseSpecies.baseSpecies === 'Feebas') {
				const targetSide = target.side;
				if (targetSide.fishingTokens > 0) {
					const boosts = Math.floor(targetSide.fishingTokens / 2);
					target.side.removeFishingTokens(targetSide.fishingTokens);
					this.boost({atk: boosts, def: boosts, spa: boosts, spd: boosts, spe: boosts}, target, target, move);
				} else targetSide.addFishingTokens(1);
			} else this.add('-nothing');
		},
	},
	silcoonblast: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Silcoon Blast",
		shortDesc: "Turns the opponent into Silcoon.",
		pp: 166,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1},
		secondary: null,
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Hyper Beam", target);
		},
		onHit(target, pokemon, move) {
			for (const target of pokemon.foes()) {
				target.formeChange('Silcoon');
			}
		},
		target: "normal",
		type: "Bug",
		contestType: "Beautiful",
	},
	gofish: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Go Fish",
		shortDesc: "Spends 1 token to switch target. Fails if target is not attacking.",
		pp: 5,
		priority: 1,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1, fishing: 1,},
		forceSwitch: true,
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Boomburst", target);
		},
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || (move.category === 'Status' && move.id !== 'mefirst') || target.volatiles['mustrecharge'] || !source.side.removeFishingTokens(1)) {
				return false;
			}
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Clever",
	},
	
	//slate 2
	thekitchensink: {
        num: -1,
        accuracy: 93.81174699,
        basePower: 76.6977492,
        basePowerCallback(pokemon, target, move) {
            let power = move.basePower;
            //avalanche
            const damagedByTarget = pokemon.attackedBy.some(
                p => p.pokemon === target && p.damage > 0 && p.thisTurn
            );
            if (damagedByTarget) {
                power *= 2;
            }
           
            if (target.newlySwitched || this.queue.willMove(target)) {
                //bolt beak
                power *= 2;
            } else {
                //payback
                power *= 2;
            }
           
            //frustration
            power += Math.floor((pokemon.happiness * 10) / 25) || 1;
           
            //heavyslam
            const targetWeight = target.getWeight();
            const pokemonWeight = pokemon.getWeight();
            if (pokemonWeight >= targetWeight * 5) {
                power += 120;
            } else if (pokemonWeight >= targetWeight * 4) {
                power += 100;
            } else if (pokemonWeight >= targetWeight * 3) {
                power += 80;
            } else if (pokemonWeight >= targetWeight * 2) {
                power += 60;
            } else {
                power += 40;
            }
           
            //last respects
            power += 50 * pokemon.side.totalFainted;
           
            //low kick
            if (targetWeight >= 2000) {
                power += 120;
            } else if (targetWeight >= 1000) {
                power += 100;
            } else if (targetWeight >= 500) {
                power += 80;
            } else if (targetWeight >= 250) {
                power += 60;
            } else if (targetWeight >= 100) {
                power += 40;
            } else {
                power += 20;
            }
           
            //power trip
            power += 20 * pokemon.positiveBoosts();
           
            //punishment
            power += 20 * target.positiveBoosts();
            if (power > 200) power = 200;
           
            //pursuit
            if (target.beingCalledBack || target.switchFlag) {
                this.debug('Pursuit damage boost');
                power *= 2;
            }
           
            //rage fist
            power = Math.min(350, power + 50 * pokemon.timesAttacked);
           
            //reversal
            const ratio = Math.max(Math.floor(pokemon.hp * 48 / pokemon.maxhp), 1);
            if (ratio < 2) {
                power += 200;
            } else if (ratio < 5) {
                power += 150;
            } else if (ratio < 10) {
                power += 100;
            } else if (ratio < 17) {
                power += 80;
            } else if (ratio < 33) {
                power += 40;
            } else {
                power += 20;
            }
           
		    //rollout
			if (pokemon.volatiles['defensecurl']) power *= 2;
		   
            //smelling salts
            if (target.status === 'par') {
                power *= 2;
            }
           
            //stomping tantrum
            if (pokemon.moveLastTurnResult === false) {
                power *= 2;
            }
           
            //tera blast
            if (pokemon.terastallized === 'Stellar') {
                power += 100;
            } else power += 80;
           
            //triple axel
            power += 20 * move.hit;
           
            //trump card
            const callerMoveId = move.pokemonEffect || move.id;
            const moveSlot = callerMoveId === 'instruct' ? pokemon.getMoveData(move.id) : pokemon.getMoveData(callerMoveId);
            if (!moveSlot) {
                power += 40;
            } else {
                switch (moveSlot.pp) {
                case 0:
                    power += 200;
                    break;
                case 1:
                    power += 80;
                    break;
                case 2:
                    power += 60;
                    break;
                case 3:
                    power += 50;
                    break;
                default:
                    power += 40;
                    break;
                }
            }
           
            //wakeupslap
            if (target.status === 'slp' || target.hasAbility('comatose')) {
                power *= 2;
            }
           
            //wring out
            const hp = target.hp;
            const maxHP = target.maxhp;
            power += Math.floor(Math.floor((120 * (100 * Math.floor(hp * 4096 / maxHP)) + 2048 - 1) / 4096) / 100) || 1;
           
            return power;
        },
        category: "Physical",
        name: "The Kitchen Sink",
        shortDesc: "Power doubles if user is damaged by the target. Power doubles if user moves before the target. Power doubles if the user moves after the target. Power doubles if user is burn/poison/ paralyzed. Power doubles if the target's HP is 50% or less. Power doubles if the target is poisoned. Power doubles if target is burned. Power doubles if the target has a status ailment. More power the more HP the target has left. Max 102 power at minimum Happiness. More power the heavier the user than the target. +50 power for each time a party member fainted. More power the heavier the target. + 20 power for each of the user's stat boosts. +20 for each of the target's stat boosts. If a foe is switching out, hits it at 2x power. +50 power for each time user was hit. Max 6 hits. More power the less HP the user has left. Power doubles if target is paralyzed. Power doubles if the user's last move failed. Each hit can miss, but power rises. More power the fewer PP this move has left. Power doubles if target is asleep. Breaks protect. High critical hit ratio. Heals 50% of the damage dealt. Ignores the Abilities of other Pokemon. Ignores the target's stat stage changes. User loses 50% max HP. Hits adjacent Pokemon. Hits 10 times. Uses user's Def stat as Atk in damage calculation. Uses target's Attack stat in damage calculation. Normal moves become Electric type this turn. Steals target's boosts before dealing damage. Cannot be redirected. Traps and damages the target for 4-5 turns. Always results in a critical hit. Burns on contact with the user before it moves. Fails if the user takes damage before it hits. Removes item. Frees user from hazards/bind/ Leech Seed. If the user has no item, it steals the target's. Lasts 2-3 turns. Confuses the user afterwards. The target is cured of its burn. Curly|Droopy|Stretchy eaten: +1 Atk|Def|Spe. Ends terrain. 2x power if the user had a stat lowered this turn. During Electric Terrain: 1.5x power. Power doubles if an ally fainted last turn. No charge in sunlight. Halved power in other weathers. Cannot be selected until the user eats a Berry. Grounds adjacent foes. First hit neutral on Flying. User steals and eats the target's Berry. If the target is an ally, heals 50% of its max HP. Summons Leech Seed. All healthy allies aid in damaging the target. Can't miss in rain. Power varies; 2x on Dig. Physical if user's Atk > Sp. Atk. 40, 80, 120 power, or heals target 1/4 max HP. Effect varies with terrain. (30% paralysis chance). If Terastallized: Phys. if Atk > SpA, type = Tera. User on terrain: power doubles, type varies. Power doubles and type varies in each weather. Type varies based on the held Memory. Type varies based on the user's primary type. Type varies based on the held Drive. User is hurt by 50% of its max HP if it misses. Fails if target is not attacking. Power increases when used on consecutive turns. Fails if user has no Stockpile. Fails if the target has no held item. Fails if there is no terrain active. Destroys screens, unless the target is immune. Active Pokemon cannot fall asleep. Hits adjacent Pokemon sharing the user's type. Summons Reflect. Lower's the user's Attack and Defense by 1. Lowers the user's Sp. Attack by 2. Lowers the user's Sp. Defense by 1. Lowers the user's Spe by 2. Cures the user's party of all status conditions.",
        pp: 13.41701681,
        priority: 0.0341176471,
		gen: 5,
        flags: {protect: 1, mirror: 1,
                bullet: 1, punch: 1, bite: 1, contact: 1, wind: 1, sound: 1, slicing: 1, heal: 1, defrost: 1,
                failencore: 1, failcopycat: 1, failinstruct: 1, failmimic: 1,
                nosleeptalk: 1, noassist: 1, noparentalbond: 1,
                reflectable: 1, charge: 1, recharge: 1, gravity: 1, distance: 1, nonsky: 1, bypasssub: 1},
        breaksProtect: true,
        critRatio: 2,
        drain: [1, 2],
        ignoreAbility: true,
        ignoreEvasion: true,
        ignoreDefensive: true, //darkest lariat
        mindBlownRecoil: true,
        multihit: 10,
        multiaccuracy: true,
        noSketch: true, //torques
        overrideDefensiveStat: 'def',
        overrideOffensiveStat: 'def', //body press
        overrideOffensivePokemon: 'target', //foul play
        pseudoWeather: 'iondeluge', //plasma fists
        recoil: [33, 100],
        //selfdestruct: "always",
        stealsBoosts: true,
        tracksTarget: true,
        volatileStatus: 'partiallytrapped',
        willCrit: true,
        priorityChargeCallback(pokemon) {
            //beak blast
            pokemon.addVolatile('thekitchensink');
        },
        beforeMoveCallback(pokemon) {
            //focus punch
            if (pokemon.volatiles['thekitchensink']?.lostFocus) {
                this.add('cant', pokemon, 'The Kitchen Sink', 'The Kitchen Sink');
                return true;
            }
           
            //pursuit
            for (const side of this.sides) {
                if (side.hasAlly(pokemon)) continue;
                side.addSideCondition('pursuit', pokemon);
                const data = side.getSideConditionData('pursuit');
                if (!data.pokemons) {
                    data.pokemons = [];
                }
                data.pokemons.push(pokemon);
            }
        },
        onAfterHit(target, source, move) {
            //knock off
            if (source.hp) {
                const item = target.takeItem();
                if (item) {
                    this.add('-enditem', target, item.name, '[from] move: The Kitchen Sink', '[of] ' + source);
                }
            }
           
            //mortal spin
            if (!move.hasSheerForce) {
                if (source.hp && source.removeVolatile('leechseed')) {
                    this.add('-end', source, 'Leech Seed', '[from] move: The Kitchen Sink', '[of] ' + source);
                }
                const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
                for (const condition of sideConditions) {
                    if (source.hp && source.side.removeSideCondition(condition)) {
                        this.add('-sideend', source.side, this.dex.conditions.get(condition).name, '[from] move: Mortal Spin', '[of] ' + source);
                    }
                }
                if (source.hp && source.volatiles['partiallytrapped']) {
                    source.removeVolatile('partiallytrapped');
                }
            }
       
            //thief
            if (source.item || source.volatiles['gem']) {
                return;
            }
            const yourItem = target.takeItem(source);
            if (!yourItem) {
                return;
            }
            if (!this.singleEvent('TakeItem', yourItem, target.itemState, source, target, move, yourItem) ||
                !source.setItem(yourItem)) {
                target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
                return;
            }
            this.add('-enditem', target, yourItem, '[silent]', '[from] move: Thief', '[of] ' + source);
            this.add('-item', source, yourItem, '[from] move: Thief', '[of] ' + target);
        },
        onAfterMove(pokemon, target, move) {
            //mind blown
            if (move.mindBlownRecoil && !move.multihit) {
                const hpBeforeRecoil = pokemon.hp;
                this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.conditions.get('Mind Blown'), true);
                if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
                    this.runEvent('EmergencyExit', pokemon, pokemon);
                }
            }
           
            //outrage
            if (pokemon.volatiles['lockedmove'] && pokemon.volatiles['lockedmove'].duration === 1) {
                pokemon.removeVolatile('lockedmove');
            }
           
            //sparkling aria
            for (const pokemon of this.getAllActive()) {
                if (pokemon !== target && pokemon.removeVolatile('sparklingaria') && pokemon.status === 'brn' && !source.fainted) {
                    pokemon.cureStatus();
                }
            }
        },
        onAfterMoveSecondarySelf(pokemon, target, move) {
            //order up
            if (!pokemon.volatiles['commanded']) return;
            const tatsugiri = pokemon.volatiles['commanded'].source;
            if (tatsugiri.baseSpecies.baseSpecies !== 'Tatsugiri') return; // Should never happen
            switch (tatsugiri.baseSpecies.forme) {
            case 'Droopy':
                this.boost({def: 1}, pokemon, pokemon);
                break;
            case 'Stretchy':
                this.boost({spe: 1}, pokemon, pokemon);
                break;
            default:
                this.boost({atk: 1}, pokemon, pokemon);
                break;
            }
        },
        onAfterSubDamage(damage, target, pokemon, move) {
            //mortal spin
            if (!move.hasSheerForce) {
                if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
                    this.add('-end', pokemon, 'Leech Seed', '[from] move: The Kitchen Sink', '[of] ' + pokemon);
                }
                const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
                for (const condition of sideConditions) {
                    if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
                        this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Mortal Spin', '[of] ' + pokemon);
                    }
                }
                if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
                    pokemon.removeVolatile('partiallytrapped');
                }
            }
           
            //shell side arm
            if (!pokemon.isAlly(target)) this.hint(move.category + " The Kitchen Sink");
           
            //steel roller
            this.field.clearTerrain();
        },
        onBasePower(basePower, pokemon, target) {
            //brine
            if (target.hp * 2 <= target.maxhp) {
                return this.chainModify(2);
            }
           
            //lashout
            if (pokemon.statsLoweredThisTurn) {
                this.debug('lashout buff');
                return this.chainModify(2);
            }
           
            //psyblade
            if (this.field.isTerrain('electricterrain')) {
                this.debug('psyblade electric terrain boost');
                return this.chainModify(1.5);
            }
           
            //retaliate
            if (pokemon.side.faintedLastTurn) {
                this.debug('Boosted for a faint last turn');
                return this.chainModify(2);
            }
           
            //solar beam
            const weakWeathers = ['raindance', 'primordialsea', 'sandstorm', 'hail', 'snow'];
            if (weakWeathers.includes(pokemon.effectiveWeather())) {
                this.debug('weakened by weather');
                return this.chainModify(0.5);
            }
       
            //venoshock
            if (target.status === 'psn' || target.status === 'tox') {
                return this.chainModify(2);
            }
        },
        onDisableMove(pokemon) {
            //belch
            if (!pokemon.ateBerry) pokemon.disableMove('thekitchensink');
        },
        onEffectiveness(typeMod, target, type, move) {
			//freezedry
			if (type === 'Water') return 1;
			
            //thousand arrows
            if (move.type !== 'Ground') return;
            if (!target) return; // avoid crashing when called from a chat plugin
            // ignore effectiveness if the target is Flying type and immune to Ground
            if (!target.runImmunity('Ground')) {
                if (target.hasType('Flying')) return 0;
            }
        },
        onHit(target, source, move) {
            //bug bite
            const item = target.getItem();
            if (source.hp && item.isBerry && target.takeItem(source)) {
                this.add('-enditem', target, item.name, '[from] stealeat', '[move] The Kitchen Sink', '[of] ' + source);
                if (this.singleEvent('Eat', item, null, source, null, null)) {
                    this.runEvent('EatItem', source, null, null, item);
                    if (item.id === 'leppaberry') target.staleness = 'external';
                }
                if (item.onEat) source.ateBerry = true;
            }
           
            //pollen puff
            if (source.isAlly(target)) {
                if (!this.heal(Math.floor(target.baseMaxhp * 0.5))) {
                    if (target.volatiles['healblock'] && target.hp !== target.maxhp) {
                        this.attrLastMove('[still]');
                        // Wrong error message, correct one not supported yet
                        this.add('cant', source, 'move: Heal Block', move);
                    } else {
                        this.add('-immune', target);
                    }
                    return this.NOT_FAIL;
                }
            }
           
            //sappy seed
            if (target.hasType('Grass')) return null;
            target.addVolatile('leechseed', source);
           
            // Shell Side Arm
            if (!source.isAlly(target)) this.hint(move.category + " Shell Side Arm");
           
            //steel roller
            this.field.clearTerrain();
        },
        onModifyMove(move, pokemon, target) {
            //beat up
            move.allies = pokemon.side.pokemon.filter(ally => ally === pokemon || !ally.fainted && !ally.status);
            move.multihit += move.allies.length;
           
            //bleakwind storm
            if (target && ['raindance', 'primordialsea'].includes(target.effectiveWeather())) {
                move.accuracy = true;
            }
           
            //magnitude
            const i = this.random(100);
            if (i < 5) {
                move.magnitude = 4;
                move.basePower += 10;
            } else if (i < 15) {
                move.magnitude = 5;
                move.basePower += 30;
            } else if (i < 35) {
                move.magnitude = 6;
                move.basePower += 50;
            } else if (i < 65) {
                move.magnitude = 7;
                move.basePower += 70;
            } else if (i < 85) {
                move.magnitude = 8;
                move.basePower += 90;
            } else if (i < 95) {
                move.magnitude = 9;
                move.basePower += 110;
            } else {
                move.magnitude = 10;
                move.basePower += 150;
            }
           
            //photon geyser
            if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
           
            //present
            const rand = this.random(10);
            if (rand < 2) {
                move.heal = [1, 4];
                move.infiltrates = true;
            } else if (rand < 6) {
                move.basePower += 40;
            } else if (rand < 9) {
                move.basePower += 80;
            } else {
                move.basePower += 120;
            }
           
            //pursuit
            if (target?.beingCalledBack || target?.switchFlag) move.accuracy = true;
           
            //secret power
            if (this.field.isTerrain('')) return;
            move.secondaries = [];
            if (this.field.isTerrain('electricterrain')) {
                move.secondaries.push({
                    chance: 30,
                    status: 'par',
                });
            } else if (this.field.isTerrain('grassyterrain')) {
                move.secondaries.push({
                    chance: 30,
                    status: 'slp',
                });
            } else if (this.field.isTerrain('mistyterrain')) {
                move.secondaries.push({
                    chance: 30,
                    boosts: {
                        spa: -1,
                    },
                });
            } else if (this.field.isTerrain('psychicterrain')) {
                move.secondaries.push({
                    chance: 30,
                    boosts: {
                        spe: -1,
                    },
                });
            }
           
            //shell side arm
            if (!target) return;
            const atk = pokemon.getStat('atk', false, true);
            const spa = pokemon.getStat('spa', false, true);
            const def = target.getStat('def', false, true);
            const spd = target.getStat('spd', false, true);
            const physical = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * atk) / def) / 50);
            const special = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * spa) / spd) / 50);
            if (physical > special || (physical === special && this.random(2) === 0)) {
                move.category = 'Physical';
                move.flags.contact = 1;
            }
           
            //tera blast
            if (pokemon.terastallized && pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) {
                move.category = 'Physical';
            }
            if (pokemon.terastallized === 'Stellar') {
                move.self = {boosts: {atk: -1, spa: -1}};
            }
       
            //terrain pulse
            if (this.field.terrain && pokemon.isGrounded()) {
                move.basePower *= 2;
                this.debug('BP doubled in Terrain');
            }
           
            //weather ball
            switch (pokemon.effectiveWeather()) {
            case 'sunnyday':
            case 'desolateland':
                move.basePower *= 2;
                break;
            case 'raindance':
            case 'primordialsea':
                move.basePower *= 2;
                break;
            case 'sandstorm':
                move.basePower *= 2;
                break;
            case 'hail':
            case 'snow':
                move.basePower *= 2;
                break;
            }
        },
        onModifyType(move, pokemon) {
            //multi attack
            if (pokemon.ignoringItem()) return;
            move.type = this.runEvent('Memory', pokemon, null, move, 'Normal');
       
            //revelation dance
            let type = pokemon.getTypes()[0];
            if (type === "Bird") type = "???";
            if (type === "Stellar") type = pokemon.getTypes(false, true)[0];
            move.type = type;
           
            //techno blast
            if (pokemon.ignoringItem()) return;
            move.type = this.runEvent('Drive', pokemon, null, move, 'Normal');
           
            //tera blast
            if (pokemon.terastallized) {
                move.type = pokemon.teraType;
            }
           
            //terrain pulse
            if (!pokemon.isGrounded()) return;
            switch (this.field.terrain) {
            case 'electricterrain':
                move.type = 'Electric';
                break;
            case 'grassyterrain':
                move.type = 'Grass';
                break;
            case 'mistyterrain':
                move.type = 'Fairy';
                break;
            case 'psychicterrain':
                move.type = 'Psychic';
                break;
            }
       
            //weather ball
            switch (pokemon.effectiveWeather()) {
            case 'sunnyday':
            case 'desolateland':
                move.type = 'Fire';
                break;
            case 'raindance':
            case 'primordialsea':
                move.type = 'Water';
                break;
            case 'sandstorm':
                move.type = 'Rock';
                break;
            case 'hail':
            case 'snow':
                move.type = 'Ice';
                break;
            }
        },
        onMoveFail(target, source, move) {
            this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get('The Kitchen Sink'));
        },
        onPrepareHit(target, source, move) {
            if (source.terastallized) {
                this.attrLastMove('[anim] Tera Blast ' + source.teraType);
            }
        },
        onTry(source, target) {
            //sucker punch
            const action = this.queue.willMove(target);
            const move = action?.choice === 'move' ? action.move : null;
            if (!move || (move.category === 'Status' && move.id !== 'mefirst') || target.volatiles['mustrecharge']) {
                return false;
            }
           
            //fake out
            if (source.activeMoveActions > 1) {
                this.hint("The Kitchen Sink only works on your first turn out.");
                //return false;
            }
           
            //echoed voice
            this.field.addPseudoWeather('echoedvoice');
           
            return !!source.volatiles['stockpile'] && //spit up
                   !!target.item && //poltergeist
                   !target.fainted && //sky drop
                   !this.field.isTerrain('') //steel roller
                   // && (source.status === 'slp' || source.hasAbility('comatose'))
                   ; //snore
        },
        onTryHit(target, pokemon) {
            //brick break
            pokemon.side.removeSideCondition('reflect');
            pokemon.side.removeSideCondition('lightscreen');
            pokemon.side.removeSideCondition('auroraveil');
           
            //pollen puff
            if (pokemon.isAlly(target)) {
                move.basePower = 0;
                move.infiltrates = true;
            }
           
            //poltergeist
            this.add('-activate', target, 'move: The Kitchen Sink', this.dex.items.get(target.item).name);
           
            //pursuit
            target.side.removeSideCondition('pursuit');
           
            //uproar
            const activeTeam = target.side.activeTeam();
            const foeActiveTeam = target.side.foe.activeTeam();
            for (const [i, allyActive] of activeTeam.entries()) {
                if (allyActive && allyActive.status === 'slp') allyActive.cureStatus();
                const foeActive = foeActiveTeam[i];
                if (foeActive && foeActive.status === 'slp') foeActive.cureStatus();
            }
        },
        onTryMove(source, target, move) {
            //pollen puff
            if (source.isAlly(target) && source.volatiles['healblock']) {
                this.attrLastMove('[still]');
                this.add('cant', source, 'move: Heal Block', move);
                return false;
            }
        },
        onTryImmunity(target, source) {
            return target.hasType(source.getTypes());
        },
        onUseMoveMessage(pokemon, target, move) {
            this.add('-activate', pokemon, 'move: Magnitude', move.magnitude);
        },
        condition: {
            duration: 1,
            onStart(pokemon) {
                this.add('-singleturn', pokemon, 'move: The Kitchen Sink');
            },
            onHit(target, source, move) {
                if (this.checkMoveMakesContact(move, source, target)) {
                    source.trySetStatus('brn', target);
                }
                if (move.category !== 'Status') {
                    this.effectState.lostFocus = true;
                }
            },
            onTryAddVolatile(status, pokemon) {
                if (status.id === 'flinch') return null;
            },
        },
        secondary: null,
        self: {
            volatileStatus: 'mustrecharge',
           
            //baddy bad
            sideCondition: 'reflect',
           
            boosts: {
                atk: -1,
                def: -1,
                spa: -2,
                spd: -1,
                spe: -2,
            },
           
            //sparkly swirl
            onHit(pokemon, source, move) {
                this.add('-activate', source, 'move: Aromatherapy');
                for (const ally of source.side.pokemon) {
                    if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
                        continue;
                    }
                    ally.cureStatus();
                }
            },
        },
        target: "allAdjacent",
        type: "???",
    },
	cuddie: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "cuddIe",
		shortDesc: "the pokemon have. a nice cuddle :)",
		pp: 625000,
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Tickle", target);
		},
		onTryHit(target, source) {
			this.add('-message', `${source.name} cuddled ${target.name}...`);
		},
		secondary: null,
		target: "normal",
		type: "Friend",
		contestType: "Cute",
	},
	feebasproshops: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Feebas Pro Shops",
		shortDesc: "50%: 85 BP Special, hits Ghost; 50%: +2 tokens.",
		pp: 5,
		priority: 0,
		flags: {fishing: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Pay Day", target);
		},
		onModifyMove(move, pokemon, target) {
			if (this.randomChance(1, 2)) {
				move.basePower = 85;
				move.category = "Special";
				if (!move.ignoreImmunity) move.ignoreImmunity = {};
				if (move.ignoreImmunity !== true) {
					move.ignoreImmunity['Fighting'] = true;
				}
			} else {
				move.basePower = 0;
				move.category = "Status";
			}
		},
		onHit(target, source, move) {
			if(move.basePower === 0) source.side.addFishingTokens(2);
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Clever",
	},
	bigbash: {
		accuracy: 100,
		basePower: 68,
		category: "Physical",
		name: "Big Bash",
		shortDesc: "Guaranteed crit if either Pokemon used Big Button.",
		pp: 20,
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Pulverizing Pancake", target);
		},
		onModifyMove(move, pokemon, target) {
			if(pokemon.volatiles['bigbutton'] || target.volatiles['bigbutton']) move.willCrit = true;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Clever",
	},
	diamondhatchet: {
		accuracy: 100,
		basePower: 80,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.volatiles['bigbutton']) return 120;
			return 80;
		},
		category: "Physical",
		name: "Diamond Hatchet",
		shortDesc: "20% chance to make the target flinch. Big: 120 BP.",
		pp: 10,
		priority: 0,
		flags: {slicing: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Mighty Cleave", target);
		},
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Fighting",
	},
	rainbowfeather: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Rainbow Feather",
		shortDesc: "User switches out. Target uses Conversion.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Esper Wing", target);
		},
		selfSwitch: true,
		onHit(target, source, move) {
			this.actions.useMove("Conversion", target);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
	},
	heartdrain: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Heart Drain",
		shortDesc: "User recovers 50% of the damage dealt.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, heal: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Giga Drain", target);
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	vineboom: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Vine Boom",
		shortDesc: "20% par; 30% flinch; 5% frz; 10% slp; 1% ingrain.",
		pp: 40,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Ivy Cudgel", target);
		},
		secondaries: [
			{
				chance: 20,
				status: 'par',
			}, {
				chance: 30,
				volatileStatus: 'flinch',
			}, {
				chance: 5,
				status: 'frz',
			}, {
				chance: 10,
				status: 'slp',
			}, {
				chance: 1,
				volatileStatus: 'ingrain',
			},
		],
		target: "normal",
		type: "Silly",
	},
	awesomeearthquake: {
		name: "awesome Earthquake",
		type: "Silly",
		category: "Physical",
		basePower: 100,
		accuracy: 100,
		pp: 10,
		shortDesc: "No additional effect.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Earthquake", target);
		},
		secondary: null,
		target: "normal",
	},
	wingedblade: {
		name: "Winged Blade",
		type: "Flying",
		category: "Physical",
		basePower: 90,
		accuracy: 100,
		pp: 15,
		shortDesc: "High critical hit ratio.",
		priority: 0,
		flags: {slicing: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Air Cutter", target);
		},
		secondary: null,
		target: "normal",
	},

	//slate 3
	fishanddip: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fish and Dip",
		shortDesc: "Sets 1 Fishing Token on the user's side. User switches out.",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, fishing: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Life Dew", pokemon);
		},
		onHit(target, source, move) {
			source.side.addFishingTokens(1);
		},
		selfSwitch: true,
		secondary: null,
		target: "self",
		type: "Water",
	},
	ohmygoooodwaaaaaaaaaanisfokifnouh: {
		name: "OH MY GOOOOD WAAAAAAAAAANISFOKIFNOUH",
		type: "Normal",
		category: "Physical",
		basePower: 300,
		accuracy: 100,
		pp: 1,
		noPPBoosts: true,
		shortDesc: "User faints. Removes user's side's entry hazards.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Spin Out", target);
		},
		onHit(target, source, move) {
			if (!move.hasSheerForce) {
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (source.side.removeSideCondition(condition)) {
						this.add('-sideend', source.side, this.dex.conditions.get(condition).name, '[from] move: OH MY GOOOOD WAAAAAAAAAANISFOKIFNOUH', '[of] ' + source);
					}
				}
			}
		},
		selfdestruct: "always",
		secondary: null,
		target: "normal",
	},
	frigidterrain: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Frigid Terrain",
		shortDesc: "5 turns. Grounded: +Ice power, Fishing takes 3x PP.",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		terrain: 'frigidterrain',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					if(move.type === 'Ice') return this.chainModify(1.5);
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Frigid Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Frigid Terrain');
				}
			},
			onAnyDeductPP(target, source) {
				if (target.isGrounded() && target.lastMoveUsed.flags['fishing']) return 2;
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Frigid Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Water",
	},
	getemboys: {
		name: "Get Em\', Boys",
		type: "Normal",
		category: "Physical",
		basePower: 100,
		basePowerCallback(pokemon, target, move) {
			const allies = pokemon.side.pokemon.filter(ally => ally != pokemon && !ally.fainted && ally.diamondHand);
			return 100 + 10 * allies;
		},
		accuracy: 100,
		pp: 10,
		shortDesc: "+10 BP per other unfainted allied Diamond Hand.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Close Combat", target);
		},
		secondary: null,
		target: "normal",
	},
	sniftgear: {
		name: "Snift Gear",
		type: "Steel",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 10,
		shortDesc: "User +2 Atk; can hit Ghost-types, ignores evasiveness, takes 2x from Poison.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Odor Sleuth", target);
		},
		boosts: {
			atk: 2,
		},
		volatileStatus: "sniftgear",
		condition: {
			onStart(pokemon) {
				this.add('-message', `${pokemon.name} took a big sniff!`);
				this.add('-start', pokemon, 'Snift Gear', '[silent]');
			},
			onModifyMovePriority: -5,
			onModifyMove(move) {
				if (!move.ignoreImmunity) move.ignoreImmunity = {};
				if (move.ignoreImmunity !== true) {
					move.ignoreImmunity['Fighting'] = true;
					move.ignoreImmunity['Normal'] = true;
				}
			},
			onAnyModifyBoost(boosts, pokemon) {
				const unawareUser = this.effectState.target;
				if (unawareUser === pokemon) return;
				if (unawareUser === this.activePokemon && pokemon === this.activeTarget) {
					boosts['evasion'] = 0;
				}
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.type === 'Poison')  return this.chainModify(2);
			},
		},
		secondary: null,
		target: "self",
	},
	springtidestorm: {
		inherit: true,
		basePower: 120,
		flags: {protect: 1, mirror: 1, wind: 1, metronome: 1, disaster: 1},
		shortDesc: "30% chance to lower the foe(s) Attack by 1. Rain: can't miss.",
		onModifyMove(move, pokemon, target) {
			switch (target?.effectiveWeather()) {
			case 'raindance':
			case 'primordialsea':
				move.accuracy = true;
				break;
			}
		},
	},
	anchorshot: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, fishing: 1},
	},
	arrowsoflight: {
		name: "Arrows of Light",
		type: "Fighting",
		category: "Physical",
		basePower: 185,
		accuracy: 100,
		pp: 1,
		shortDesc: "User gains the Laser Focus effect.",
		priority: 0,
		flags: {},
		isZ: "zeldaniumz",
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Sinister Arrow Raid", target);
		},
		secondary: null,
		target: "normal",
	},
	supermushroom: {
		name: "Super Mushroom",
		type: "Grass",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 10,
		shortDesc: "Heals 1/3 max HP, Endure. Cannot be selected twice in a row.",
		priority: 3,
		flags: {snatch: 1, metronome: 1, cantusetwice: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Synthesis", pokemon);
		},
		heal: [1, 3],
		volatileStatus: 'endure',
		secondary: null,
		target: "self",
	},
	fishprocessing: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fish Processing",
		shortDesc: "+1 Fishing Token; +1 Fishing Token at end of turn.",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, fishing: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Shift Gear", pokemon);
		},
		onHit(target, source, move) {
			source.side.addFishingTokens(1);
		},
		volatileStatus: "fishprocessing",
		condition: {
			onResidual(pokemon) {
				pokemon.side.addFishingTokens(1);
			},
		},
		secondary: null,
		target: "self",
		type: "Steel",
	},
	fisheater: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fish Eater",
		shortDesc: "-50% foe's fishing tokens; 1/16 heal, +1 stockpile each.",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, fishing: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Life Dew", pokemon);
		},
		onTry(source, target) {
			return (target.side.fishingTokens && target.side.fishingTokens > 0);
		},
		onHit(target, source, move) {
			if (!target.side.fishingTokens || target.side.fishingTokens <= 0 || source.volatiles['stockpile3']) return false;
			const tokens = Math.ceil(target.side.fishingTokens / 2);
			const success = target.side.removeFishingTokens(tokens);
			if (success) {
				for (let i = 0; i < Math.min(3, tokens); i ++) {
					source.addVolatile('stockpile');
				}
				this.heal(Math.ceil(source.maxhp * tokens / 16), source);
			}
			return success;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	fishingterrain: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fishing Terrain",
		shortDesc: "5 turns. Grounded: +Fishing power, Fishing tokens +1 on fishing move.",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		terrain: 'fishingterrain',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				let mod = 1;
				if (attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					if(move.flags['fishing']) mod *= 1.3;
				}
				return this.chainModify(mod);
			},
			onAfterMove(target, source, move) {
				if (move.flags['fishing']) target.side.addFishingTokens(1);
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Fishing Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Fishing Terrain');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Fishing Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Water",
	},
	evilscaryuturn: {
		name: "EVIL SCARY U-Turn",
		type: "Dark",
		category: "Physical",
		basePower: 70,
		accuracy: 100,
		pp: 20,
		shortDesc: "User switches out after damaging the target.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Scary Face", target);
			this.add('-anim', pokemon, "Shadow Sneak", target);
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
	},
	looksmaxxknuckle: {
		name: "Looksmaxx Knuckle",
		type: "Fairy",
		category: "Physical",
		basePower: 70,
		accuracy: 100,
		pp: 10,
		shortDesc: "Raises the user's Attack by 1.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1, punch: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Max Knuckle", target);
		},
		self: {
			boosts: {
				atk: 1,
			},
		},
		secondary: null,
		target: "normal",
	},
	lemonacid: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Lemon Acid",
		shortDesc: "100% chance to lower the target’s Sp. Def by 1.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Acid Spray", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Lemon",
	},
	campfire: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Campfire",
		shortDesc: "Consumes 1 Fishing Token to heal 50% max HP.",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, metronome: 1, fishing: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Ember", pokemon);
		},
		onTry(source) {
			return (source.side.fishingTokens && source.side.fishingTokens > 0);
		},
		onHit(target, source, move) {
			const success = source.side.removeFishingTokens(1);
			if (success) {
				this.heal(Math.ceil(source.maxhp / 2), source);
				if (!['', 'slp', 'frz'].includes(source.status)) source.cureStatus();
			}
			return success;
		},
		secondary: null,
		target: "self",
		type: "Fire",
	},
	sizedifference: {
		name: "Size Difference",
		type: "Ice",
		category: "Physical",
		basePower: 100,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Payback NOT boosted');
				return move.basePower;
			}
			const targetMove = target.lastMove;
			if (targetMove.name.length < 15) return move.basePower * 2;
		},
		accuracy: 100,
		pp: 5,
		shortDesc: "Move against user has shorter name: 2x power.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Ice Hammer", target);
		},
		secondary: null,
		target: "normal",
	},
	genderaffirmingcare: {
		name: "Gender Affirming Care",
		type: "Silly",
		category: "Status",
		basePower: 0,
		accuracy: 100,
		pp: 10,
		shortDesc: "Changes the target's gender.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Endeavor", target);
		},
		onTryImmunity(pokemon, source) {
			//const nonVanilla = ['Anarlvet', 'Kingler-Mega', 'microwave', 'Lytlegai', 'Ohmyrod', 'Big Crammer', 'Samurott-Sinnoh', 'Goomba', 'Fridgile', 'Melmetal 2', 'Pidown', 'Kurayami', 'Zelda', 'Drigike', 'Phish', 'Smelmetal', 'Bondra', 'Tangette-Eternal', 'Donmigo', 'Dragoone', 'Collachet', 'Guiltrism', 'Swooliobat', 'Electrode-Mega', 'Mario Kart Wii', 'Impalpitoad', 'Scrubby', 'palpitoad is so cool', 'Moltres-Mega', 'Jirachitwo', 'Shinx-Fishing', 'Conquescape', 'Daiyakuza', 'Pokestar Fisherman', 'Magnegiri', 'mario', 'Contamicow', 'Whonhef', 'Fish Factory', 'cowboy_bandido', 'Pokestar Giant', 'Richard Petty', 'Impidimp-Mega', 'Lemon', 'Fishing Zombie', 'MT', 'Margaret Thatcher', 'Flesh Valiant', 'Flesh Valiant-Mega'];
			return (pokemon.gender !== 'N');
		},
		onHit(target) {
			if (!target.trans) {
				target.gender = (target.gender === 'F') ? 'M' : 'F';
				target.trans = true;
				this.add('-message', `${target.name} is now ${(target.gender === 'M') ? 'male' : 'female'}!`);
			} else {
				this.boost({def: 1, spd: 1}, target, target);
			}
		},
		secondary: null,
		target: "normal",
	},
	liondeluge: {
		name: "Lion Deluge",
		type: "Electric",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 40,
		shortDesc: "For 5 turns, sound moves turn the user into a Lion.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Ion Deluge", target);
		},
		pseudoWeather: 'liondeluge',
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('liongun')) {
					return 10;
				}
				return 5;
			},
			onFieldStart(target, source, sourceEffect) {
				this.add('-fieldactivate', 'move: Lion Deluge');
				this.hint(`Certain sound moves cause the user to become a lion Pokemon depending on the move's type.`);
			},
			onBeforeMove(pokemon, target, move) {
				if(!move.flags['sound']) return;
				if(move.type === 'Normal') pokemon.formeChange('Pyroar');
				if(move.type === 'Electric') pokemon.formeChange('Luxray');
				if(move.type === 'Fire') pokemon.formeChange('Entei');
				if(move.type === 'Dragon') pokemon.formeChange('Gouging Fire');
				if(move.type === 'Steel') pokemon.formeChange('Solgaleo');
				if(move.type === 'Psychic') pokemon.formeChange('Necrozma-Dusk-Mane');
			},
			onFieldEnd() {
				this.add('-fieldend', 'move: Lion Deluge');
			},
		},
		secondary: null,
		target: "normal",
	},
	
	//slate 4
	holdhands: {
		inherit: true,
		onTryHit(target, source) {
			this.add('-message', `${source.name} held hands with ${target.name}!`);
		},
	},
	spacelaser: {
		accuracy: 100,
		basePower: 140,
		category: "Special",
		name: "Space Laser",
		shortDesc: "Hits two turns after being used.",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, futuremove: 1},
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'spacelaser',
				source: source,
				moveData: {
					id: 'spacelaser',
					name: "Space Laser",
					accuracy: 100,
					basePower: 140,
					category: "Special",
					priority: 0,
					flags: {metronome: 1, futuremove: 1},
					effectType: 'Move',
					type: 'Fire',
				},
			});
			this.add('-start', source, 'Space Laser');
			return this.NOT_FAIL;
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	juicewave: {
		name: "Juice Wave",
		type: "Lemon",
		category: "Special",
		basePower: 80,
		accuracy: 100,
		pp: 10,
		shortDesc: "User recovers 50% of the damage dealt.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, heal: 1},
		drain: [1, 2],
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Sludge Wave", target);
		},
		secondary: null,
		target: "normal",
	},
	zestycutter: {
		name: "Zesty Cutter",
		type: "Lemon",
		category: "Physical",
		basePower: 80,
		accuracy: 100,
		pp: 10,
		shortDesc: "+1 priority if the target has a lowered stat.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, slicing: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Psycho Cut", target);
		},
		onModifyPriority(priority, source) {
			for (const target of source.foes()) {
				if (target) {
					const boosts: SparseBoostsTable = {};
					let i: boostID;
					for (i in target.boosts) {
						if (target.boosts[i] < 0) {
							return priority + 1;
						}
					}
				}
			}
		},
		secondary: null,
		target: "normal",
	},
	blindingsquirter: {
		name: "Blinding Squirter",
		type: "Lemon",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 10,
		shortDesc: "Target's 100% accurate moves have 50% accuracy.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Acid Spray", target);
		},
		volatileStatus: "blindingsquirter",
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Blinding Squirter', '[silent]');
				this.add('message', `${pokemon.name} was blinded!`);
			},
			onSourceAccuracy(accuracy, target, source, move) {
				if (move && move.accuracy === 100) return 50;
			},
		},
		secondary: null,
		target: "normal",
	},
	throwemamug: {
		name: "Throw Em\' A Mug",
		type: "Lemon",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 10,
		shortDesc: "User switches out. Incoming Diamond Hand: 30% heal.",
		priority: -2,
		flags: {metronome: 1},
		onTry(source) {
			return !!this.canSwitch(source.side);
		},
		selfSwitch: true,
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Teleport", target);
		},
		sideCondition: 'throwemamug',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'Throw Em A Mug', '[silent]');
			},
			onEntryHazard(pokemon) {
				if (pokemon.baseSpecies.diamondHand) this.heal(pokemon.maxhp * 0.3);
				pokemon.side.removeSideCondition('throwemamug');
				this.add('-sideend', pokemon.side, 'move: Throw Em A Mug', '[of] ' + pokemon, '[silent]');
			},
		},
		secondary: null,
		target: "self",
	},
	mewing: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Mewing",
		shortDesc: "Protects from damaging attacks. Contact: gain Silly.",
		pp: 10,
		priority: 4,
		flags: {noassist: 1, failcopycat: 1, failinstruct: 1},
		stallingMove: true,
		volatileStatus: 'mewing',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect'] || move.category === 'Status') {
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (this.checkMoveMakesContact(move, source, target)) {
					if (!target.hasType('Silly') && target.addType('Silly')) this.add('-start', target, 'typeadd', 'Silly', '[from] move: Mewing');
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
					if (!target.hasType('Silly') && target.addType('Silly')) this.add('-start', target, 'typeadd', 'Silly', '[from] move: Mewing');
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Silly",
	},
	freakout: {
		name: "Freak Out",
		type: "Silly",
		category: "Physical",
		basePower: 85,
		accuracy: 100,
		pp: 10,
		shortDesc: "50% chance to lower target's Def by 1 stage, 100% if target healed.​",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			//this.add('-anim', pokemon, "", target);
		},
		onModifyMove(move, pokemon, target) {
			if (target.volatiles['healed']) {
				move.secondary.chance = 100;
			}
		},
		secondary: {
			chance: 50,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
	},
	corrosivegus: {
		name: "Corrosive Gus",
		type: "Normal",
		category: "Status",
		basePower: 0,
		accuracy: 100,
		pp: 10,
		shortDesc: "Target has a random stat lowered by 1 each turn.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Corrosive Gas", target);
		},
		volatileStatus: "corrosivegus",
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Corrosive Gus');
			},
			onResidualOrder: 28,
			onResidualSubOrder: 2,
			onResidual(pokemon) {
				let stats: BoostID[] = [];
				const boost: SparseBoostsTable = {};
				stats = [];
				let statMinus: BoostID;
				for (statMinus in pokemon.boosts) {
					if (statMinus === 'accuracy' || statMinus === 'evasion') continue;
					if (pokemon.boosts[statMinus] > -6) {
						stats.push(statMinus);
					}
				}
				let randomStat: BoostID | undefined = stats.length ? this.sample(stats) : undefined;
				if (randomStat) boost[randomStat] = -1;

				this.boost(boost, pokemon, pokemon);
			},
		},
		secondary: null,
		target: "normal",
	},
	incinerate: {
		accuracy: 100,
		basePower: 65,
		category: "Special",
		name: "Incinerate",
		shortDesc: "1.5x damage if foe holds an item. Removes item.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onBasePower(basePower, source, target, move) {
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemState, target, target, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onAfterHit(target, source) {
			if (source.hp) {
				let item = target.item;
				const nonBurn = ['Never-Melt Ice', 'Charcoal', 'Magmarizer', 'Dragon Fang', 'Dragon Scale', 'Damp Rock', 'Smooth Rock', 'Heat Rock', 'Insect Plate', 'Dread Plate', 'Draco Plate', 'Zap Plate', 'Flame Plate', 'Fist Plate', 'Sky Plate', 'Pixie Plate', 'Spooky Plate', 'Meadow Plate', 'Earth Plate', 'Icicle Plate', 'Toxic Plate', 'Stone Plate', 'Iron Plate', 'Splash Plate', 'Light Ball', 'Metal Powder', 'Quick Powder', 'Deep Sea Scale', 'Deep Sea Tooth', 'Thick Club', 'Protective Pads'];
				if (!nonBurn.includes(target.item)) item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Incinerate', '[of] ' + source);
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Clever",
	},
	pissongrave: {
		name: "Piss on Grave",
		type: "Lemon",
		category: "Special",
		basePower: 95,
		accuracy: 100,
		pp: 10,
		shortDesc: "OHKOs Margaret Thatcher.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Steam Eruption", target);
		},
		onModifyMove(move, pokemon) {
			for (const target of pokemon.foes()) {
				if (target.baseSpecies == "Margaret Thatcher") {
					move.ohko = true;
					move.accuracy = true;
				}
			}
		},
		secondary: null,
		target: "normal",
	},
	formofthestrawberryelephant: {
		name: "Form of the strawberry elephant",
		type: "Silly",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 5,
		shortDesc: "Raises Attack, Sp. Attack, Speed, accuracy by 1. User loses 1/8 HP.",
		priority: 0,
		flags: {snatch: 1, metronome: 1, contact: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Bulk Up", target);
		},
		onTry(source) {
			if (source.hp <= (source.maxhp / 8) || source.maxhp === 1) return false;
		},
		onTryHit(pokemon, target, move) {
			if (!this.boost(move.boosts as SparseBoostsTable)) return null;
			delete move.boosts;
		},
		onHit(pokemon) {
			this.directDamage(pokemon.maxhp / 8);
		},
		boosts: {
			atk: 1,
			spa: 1,
			spe: 1,
			accuracy: 1,
		},
		secondary: null,
		target: "self",
	},
	/*thief: {
		inherit: true,
		shortDesc: "Steels the target's item.",
		onAfterHit(target, source) {
			const item = target.takeItem();
			if (!item) return;
			const ironball = this.dex.items.get('Iron Ball');
			this.add('-enditem', target, item.name, '[from] move: Thief', '[of] ' + source, "[silent]");
			this.add('-item', target, ironball, '[from] move: Thief', '[of] ' + target, "[silent]");
			target.setItem(ironball);
			this.add("-message", `${source.name} steeled ${target.name}'s ${item}!`);
		}
	},*/
	swiftsquirt: {
		name: "Swift Squirt",
		type: "Lemon",
		category: "Special",
		basePower: 40,
		accuracy: 100,
		pp: 10,
		shortDesc: "Usually moves first. High critical hit ratio.",
		priority: 1,
		flags: {protect: 1, mirror: 1, metronome: 1},
		critRatio: 2,
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Water Shuriken", target);
		},
		secondary: null,
		target: "normal",
	},
	courtchange: {
		inherit: true,
		onHitField(target, source) {
			const sideConditions = [
				'mist', 'lightscreen', 'reflect', 'spikes', 'safeguard', 'tailwind', 'toxicspikes', 'stealthrock', 'waterpledge', 'firepledge', 'grasspledge', 'stickyweb', 'auroraveil', 'gmaxsteelsurge', 'gmaxcannonade', 'gmaxvinelash', 'gmaxwildfire',
			];
			let success = false;
			const sourceSideConditions = source.side.sideConditions;
			const targetSideConditions = source.side.foe.sideConditions;
			const sourceTemp: typeof sourceSideConditions = {};
			const targetTemp: typeof targetSideConditions = {};
			for (const id in sourceSideConditions) {
				if (!sideConditions.includes(id)) continue;
				sourceTemp[id] = sourceSideConditions[id];
				delete sourceSideConditions[id];
				success = true;
			}
			for (const id in targetSideConditions) {
				if (!sideConditions.includes(id)) continue;
				targetTemp[id] = targetSideConditions[id];
				delete targetSideConditions[id];
				success = true;
			}
			if (target.side.fishingTokens > 0 || source.side.fishingTokens > 0) {
				const tempT = target.side.fishingTokens;
				const tempS = source.side.fishingTokens;
				target.side.removeFishingTokens(tempT);
				target.side.addFishingTokens(tempS);
				source.side.removeFishingTokens(tempS);
				source.side.addFishingTokens(tempT);
			}
			for (const id in sourceTemp) {
				targetSideConditions[id] = sourceTemp[id];
			}
			for (const id in targetTemp) {
				sourceSideConditions[id] = targetTemp[id];
			}
			this.add('-swapsideconditions');
			if (!success) return false;
			this.add('-activate', source, 'move: Court Change');
		},
	},
	lethalhug: {
		name: "Lethal Hug",
		type: "Silly",
		category: "Physical",
		basePower: 90,
		accuracy: 10001,
		pp: 10,
		shortDesc: "User recovers 1/8 max HP if this KOs a target.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Body Slam", target);
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.heal(pokemon.maxhp / 6, pokemon, target, move);
		},
		secondary: null,
		target: "normal",
	},
	brainrotcudgel: {
		name: "Brainrot Cudgel",
		type: "Silly",
		category: "Physical",
		basePower: 50,
		accuracy: 100,
		pp: 10,
		shortDesc: "Always results in a critical hit.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		willCrit: true,
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Ivy Cudgel Rock", target);
		},
		secondary: null,
		target: "normal",
	},
	
	//slate 5
	maldfist: {
		name: "Mald Fist",
		type: "Ghost",
		category: "Physical",
		accuracy: 100,
		pp: 16,
		noPPBoosts: true,
		basePower: 50,
		shortDesc: "+10 power for each PP used.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, punch: 1, contact: 1},
		basePowerCallback(pokemon, target, move) {
			const callerMoveId = move.sourceEffect || move.id;
			const moveSlot = callerMoveId === 'instruct' ? pokemon.getMoveData(move.id) : pokemon.getMoveData(callerMoveId);
			return move.basePower + 10 * (move.pp - moveSlot.pp - 1);
		},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Rage Fist", target);
		},
		secondary: null,
		target: "normal",
	},
	airhorn: {
		name: "Air Horn",
		type: "Silly",
		category: "Special",
		basePower: 55,
		accuracy: 100,
		pp: 10,
		shortDesc: "Guaranteed crit if either Pokemon used Big Button.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, sound: 1,},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Boomburst", target);
		},
		onModifyMove(move, pokemon, target) {
			if(pokemon.volatiles['bigbutton'] || target.volatiles['bigbutton']) move.willCrit = true;
		},
		secondary: null,
		target: "normal",
	},
	balatroblast: {
		name: "Balatro Blast",
		type: "Silly",
		category: "Special",
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			if (!pokemon.side.trumpcard) pokemon.side.trumpcard = 0;
			const bp = move.basePower + 20 * pokemon.side.trumpcard;
			this.debug('BP: ' + bp);
			return bp;
		},
		accuracy: 100,
		pp: 10,
		shortDesc: "+20 power for each time an ally used Trump Card.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Hyper Beam", target);
		},
		secondary: null,
		target: "normal",
	},
	fiendfire: {
		name: "Fiend Fire",
		type: "Fire",
		category: "Special",
		basePower: 50,
		accuracy: 100,
		pp: 10,
		shortDesc: "Consumes user's tokens; hits for that many tokens, max 4.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Magma Storm", target);
		},
		onModifyMove(move, pokemon, target) {
			const pokeSide = pokemon.side;
			if(pokeSide.fishingTokens > 0) {
				const hits = Math.min(pokeSide.fishingTokens, 4);
				pokeSide.removeFishingTokens(pokeSide.fishingTokens);
				move.multihit = hits;
			}
		},
		secondary: null,
		target: "normal",
	},
	jurassicfeast: {
		name: "Jurassic Feast",
		type: "Rock",
		category: "Physical",
		basePower: 80,
		accuracy: 100,
		pp: 10,
		shortDesc: "Always crits and burns Lemon-type or fish Pokemon.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Tar Shot", target);
		},
		onModifyMove(move, pokemon, target) {
			if(target.hasType('Lemon') || target.baseSpecies.fish) move.willCrit = true;
		},
		onAfterHit(target, source, move) {
			if (target.hasType('Lemon') || target.baseSpecies.fish) {
				target.trySetStatus('brn');
			}
		},
		secondary: null,
		target: "normal",
	},
	singleironbash: {
		name: "Single Iron Bash",
		type: "Steel",
		category: "Physical",
		basePower: 111,
		accuracy: true,
		pp: 11,
		noPPBoosts: true,
		shortDesc: "11% chance to make the target flinch.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, punch: 1, contact: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Double Iron Bash", target);
		},
		secondary: {
			chance: 11,
			volatileStatus: 'flinch',
		},
		target: "normal",
	},
	handofspace: {
		name: "Hand of Space",
		type: "Water",
		category: "Special",
		basePower: 100,
		basePowerCallback(pokemon, target, move) {
			if(target.baseSpecies.diamondHand) return move.basePower * 1.5;
			return move.basePower;
		},
		accuracy: 100,
		pp: 10,
		shortDesc: "Deals 1.5x damage to Diamond Hand members.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Spacial Rend", target);
		},
		secondary: null,
		target: "normal",
	},
	fishburn: {
		name: "Fish Burn",
		type: "Fire",
		category: "Special",
		basePower: 80,
		basePowerCallback(pokemon, target, move) {
			if (target.side.removeFishingTokens(1)) {
				return move.basePower *= 1.5;
			}
			return move.basePower;
		},
		accuracy: 100,
		pp: 10,
		shortDesc: "-1 foe's Fishing Token to deal 1.5x damage.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, fishing: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Burn Up", target);
		},
		secondary: null,
		target: "normal",
	},
	enchantedboomerang: {
		name: "Enchanted Boomerang",
		type: "Fairy",
		category: "Physical",
		basePower: 50,
		accuracy: 100,
		pp: 10,
		shortDesc: "Hits twice.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Bonemerang", target);
		},
		multihit: 2,
		secondary: null,
		target: "normal",
	},
	teratriplebasedballbarrage: {
		name: "Tera Triple Basedball Barrage",
		type: "Stellar",
		category: "Physical",
		basePower: 1,
		accuracy: true,
		pp: 1,
		shortDesc: "",
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Astral Barrage", target);
		},
		isZ: "stellariumz",
		secondary: null,
		target: "normal",
	},
	
	//slate 6
	ironfist: {
		name: "Iron Fist",
		type: "Steel",
		category: "Physical",
		basePower: 90,
		accuracy: 100,
		pp: 10,
		shortDesc: "Raises user's and target's Defense by 1.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, punch: 1, contact: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Double Iron Bash", target);
		},
		boosts: {
			def: 1,
		},
		self: {
			boosts: {
				def: 1,
			},
		},
		secondary: null,
		target: "normal",
	},
	fertilesoil: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fertile Soil",
		shortDesc: "Inflicts foes with Leech seed on switchin. Single use.",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1},
		sideCondition: 'fertilesoil',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'Fertile Soil');
			},
			onEntryHazard(pokemon) {
				if(!pokemon.hasType('Grass')) {
					if(pokemon.adjacentFoes().length == 0) return;
					const target = this.sample(pokemon.adjacentFoes());
					pokemon.addVolatile('leechseed', target);
					pokemon.side.removeSideCondition('fertilesoil');
					this.add('-sideend', pokemon.side, 'move: Fertile Soil', '[of] ' + pokemon);
				}
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Grass",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	epicbeam: {
		name: "Epic Beam",
		type: "Ice",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 40,
		shortDesc: "Epic Beam",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onTry(source) {
			if (source.side.pokemonLeft > 1) return;
			this.attrLastMove('[still]');
			this.add('-fail', source, 'move: Epic Beam');
			return null;
		},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Prismatic Laser", target);
		},
		onModifyMove(move, pokemon, target) {
			move.category = 'Special';
			move.basePower = 300;
		},
		onAfterHit(target, source) {
			source.side.addSlotCondition(source, 'epicbeam');
		},
		// wtf
		selfSwitch: true,
		condition: {
			duration: 1,
			// sacrificing implemented in side.ts, kind of
		},
		secondary: null,
		target: "normal",
	},
	homerun: {
		name: "Home Run",
		type: "Silly",
		category: "Physical",
		basePower: 40,
		accuracy: 100,
		pp: 15,
		shortDesc: "Usually goes first. 2x power if target is Baseballed.",
		priority: 1,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Brutal Swing", target);
		},
		onBasePower(basePower, pokemon, target) {
			if(target.status === 'baseball') return this.chainModify(2);
		},
		secondary: null,
		target: "normal",
	},
	chaospotion: {
		name: "Chaos Potion",
		type: "Psychic",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 10,
		shortDesc: "Turns the user into a random Pokemon.",
		priority: 2,
		flags: {snatch: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Transform", target);
		},
		onHit(pokemon) {
			if (!pokemon.hp) return;
            const pokemons = this.dex.species.all();
			const randomPokemon = this.sample(pokemons);
            pokemon.formeChange(randomPokemon);
			this.add('-message', `${pokemon.name} transformed into ${randomPokemon}!`);
		},
		secondary: null,
		target: "self",
	},
	justicepotion: {
		name: "Justice Potion",
		type: "Psychic",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 10,
		shortDesc: "Turns the target into a random Pokemon.",
		priority: -2,
		flags: {protect: 1, mirror: 1, reflectable: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Acid Spray", target);
		},
		onHit(pokemon) {
			if (!pokemon.hp) return;
            const pokemons = this.dex.species.all();
            const randomPokemon = this.sample(pokemons);
            pokemon.formeChange(randomPokemon);
			this.add('-message', `${pokemon.name} transformed into ${randomPokemon}!`);
		},
		secondary: null,
		target: "normal",
	},
	graveyard: {
		name: "Graveyard",
		type: "Ghost",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 5,
		shortDesc: "For 5 turns, +Ghost and damages non-Ghost/Darks/Normals.",
		priority: 0,
		flags: {metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Sunny Day", target);
		},
		weather: 'graveyard',
		secondary: null,
		target: "all",
	},
	pieblast: {
		name: "Pie Blast",
		type: "Silly",
		category: "Special",
		basePower: 80,
		accuracy: 100,
		pp: 15,
		shortDesc: "100% chance to lower the target's Speed by 1.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Mind Blown", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
	},
	multiattack: {
		inherit: true,
		shortDesc: "Type = Memory. Special if user's Sp. Atk > Atk.",
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) < pokemon.getStat('spa', false, true)) move.category = 'Special';
		},
	},
	citrusbomb: {
		accuracy: 85,
		basePower: 60,
		category: "Special",
		name: "Citrus Bomb",
		shortDesc: "Target's accuracy is lowered by 1 stage for 3 turns.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		condition: {
			noCopy: true,
			duration: 4,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Citrus Bomb');
			},
			onUpdate(pokemon) {
				if (this.effectState.source && !this.effectState.source.isActive) {
					pokemon.removeVolatile('citrusbomb');
				}
			},
			onResidualOrder: 14,
			onResidual(pokemon) {
				this.boost({accuracy: -1}, pokemon, this.effectState.source);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Citrus Bomb', '[silent]');
			},
		},
		secondary: {
			chance: 100,
			volatileStatus: 'citrusbomb',
		},
		target: "normal",
		type: "Lemon",
	},
	
	//slate 7
	clash: {
		name: "Clash",
		type: "Fighting",
		category: "Physical",
		basePower: 100,
		accuracy: 100,
		pp: 10,
		shortDesc: "Fails if this Pokemon has a Status move.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "First Impression", target);
		},
		onTry(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
                const temp = this.dex.moves.get(moveSlot.id);
                if (temp.category === 'Status') return false;
            }
		},
		secondary: null,
		target: "normal",
	},
	anofferyoucantrefuse: {
		name: "An Offer You Can\'t Refuse",
		type: "Bug",
		category: "Physical",
		basePower: 90,
		accuracy: 100,
		pp: 10,
		shortDesc: "User sets a Madness Counter on its side.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Pay Day", target);
		},
		onAfterHit(target, source) {
			source.side.addSideCondition('madnesscounter');
		},
		secondary: null,
		target: "normal",
	},
	lemonbash: {
		name: "Lemon Bash",
		type: "Lemon",
		category: "Physical",
		basePower: 85,
		accuracy: 100,
		pp: 15,
		shortDesc: "20% chance to lower the target's Def by 1.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1,},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Double-Edge", target);
		},
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
	},
	springyfist: {
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		name: "Springy Fist",
		shortDesc: "User switches out. Disables the target's last move.",
		pp: 15,
		priority: 1,
		flags: {contact: 1, punch: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Dizzy Punch", target);
		},
		onAfterHit(target, source) {
			if (!target.lastMove || target.lastMove.isZ || target.lastMove.isMax || target.lastMove.id === 'struggle') return;
			target.addVolatile('disable');
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	focusblast: {
		inherit: true,
		accuracy: 80,
	},
	recycle: {
		inherit: true,
		shortDesc: "Restores the items the user's party last used.",
		onHit(target, source) {
			let success = false;
			const allies = [...target.side.pokemon, ...target.side.allySide?.pokemon || []];
			for (const ally of allies) {
				if (ally.item || !ally.lastItem) continue;
				const item = ally.lastItem;
				ally.lastItem = '';
				this.add('-item', ally, this.dex.items.get(item), '[from] move: Recycle');
				ally.setItem(item);
				success = true;
			}
			return success;
		},
	},
	
	//slate 8
	necromancy: {
		name: "Necromancy",
		type: "Ghost",
		category: "Special",
		basePower: 0,
		basePowerCallback(pokemon, target, move) {
			return 30 * Math.min(pokemon.side.totalFainted, 5);
		},
		accuracy: 70,
		pp: 5,
		shortDesc: "+30 power for each fainted ally. Graveyard: can't miss.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onTryMove(attacker, defender, move) {
			return attacker.side.totalFainted > 0;
		},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Last Respects", target);
		},
		onModifyMove(move, pokemon, target) {
			switch (target?.effectiveWeather()) {
				case 'graveyard':
					move.accuracy = true;
					break;
			}
		},
		secondary: null,
		target: "normal",
	},
	snowflakeshuriken: {
		name: "Snowflake Shuriken",
		type: "Ice",
		category: "Special",
		basePower: 20,
		accuracy: 100,
		pp: 20,
		shortDesc: "Usually goes first. Hits 3 times.",
		priority: 1,
		flags: {protect: 1, mirror: 1, metronome: 1},
		multihit: 3,
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Icicle Spear", target);
		},
		secondary: null,
		target: "normal",
	},
	wildhunt: {
		name: "Wild Hunt",
		type: "Fairy",
		category: "Physical",
		basePower: 120,
		accuracy: 85,
		pp: 10,
		shortDesc: "No additional effect.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Power Whip", target);
		},
		secondary: null,
		target: "normal",
	},
	flytrap: {
		name: "Flytrap",
		type: "Grass",
		category: "Physical",
		basePower: 70,
		accuracy: 100,
		pp: 20,
		shortDesc: "Super effective against Bug-types.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Snap Trap", target);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Bug') return 1;
		},
		secondary: null,
		target: "normal",
	},
	twineedle: {
		inherit: true,
		shortDesc: "Hits 2-5 times. 20% chance to poison regardless of typing.",
		multihit: [2, 5],
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('twineedle');
		},
		condition: {
			duration: 1,
			noCopy: true,
			onStart(target) {
				target.addVolatile('ability:corrosion');
			},
			onEnd(target) {
				target.removeVolatile('ability:corrosion');
			},
		},
	},
	wariopicrosspuzzle4g: {
		name: "Wario Picross Puzzle 4G",
		type: "Rock",
		category: "Special",
		basePower: 95,
		accuracy: 100,
		pp: 10,
		shortDesc: "10% chance to Baseball the target.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Power Gem", target);
		},
		secondary: {
			chance: 10,
			status: 'baseball',
		},
		target: "normal",
	},
	blazeball: {
		name: "Blazeball",
		type: "Fire",
		category: "Special",
		basePower: 160,
		basePowerCallback(pokemon, target, move) {
			if (pokemon === target || move.target === 'self') {
				this.debug("BP halved in hitting self");
				return move.basePower / 2;
			}
			return move.basePower;
		},
		accuracy: 100,
		pp: 10,
		shortDesc: "User also hits self at half power.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Burn Up", target);
		},
		onAfterHit(target, source, move) {
			if (source.hp && source.lastMove.target != 'self') {
				move.target = 'self';
				this.actions.useMove(move.id, source, source);
			}
		},
		secondary: null,
		target: "normal",
	},
	perfectfreeze: {
		num: -1012,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Perfect Freeze",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: { protect: 1, mirror: 1, recharge: 1 },
		secondary: {
			chance: 100,
			status: 'frz',
		},
		self: {
			volatileStatus: 'mustrecharge',
		},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Sheer Cold', target);
		},
		/*mindBlownRecoil: true,
		onAfterMove(pokemon, target, move) {
			if (move.mindBlownRecoil && !move.multihit) {
				const hpBeforeRecoil = pokemon.hp;
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.conditions.get('Perfect Freeze'), true);
				if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
					this.runEvent('EmergencyExit', pokemon, pokemon);
				}
			}
		},*/
		target: "normal",
		type: "Ice",
		contestType: "Cool",
		shortDesc: "100% chance to freeze. User must recharge.",

	},
	energytank: {
		name: "Energy Tank",
		type: "Steel",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 10,
		shortDesc: "Heals 1/3 max HP, Endure. Cannot be selected twice in a row.",
		priority: 3,
		flags: {snatch: 1, metronome: 1, cantusetwice: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Synthesis", pokemon);
		},
		heal: [1, 3],
		volatileStatus: 'endure',
		secondary: null,
		target: "self",
	},
	zekromkick: {
		name: "Zekrom Kick",
		type: "Dragon",
		category: "Physical",
		basePower: 45,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.species.id === 'zekrom') return move.basePower * 2;
			return move.basePower;
		},
		accuracy: 100,
		pp: 15,
		shortDesc: "Zekrom: 2x power. Else transforms into Zekrom.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1, foot: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Thunderous Kick", target);
			this.add(`c:|${Math.floor(Date.now() / 1000)}|${getName(pokemon.name)}|shut up idiot ジェイ絵ジェ (ZEKROM KICK)`);
		},
		onAfterMoveSecondarySelf(target, source, move) {
			if (target.species.id !== 'zekrom') target.formeChange('Zekrom', this.effect, false, '0', '[msg]');
		},
		secondary: null,
		target: "normal",
	},
	bakingblast: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Baking Blast",
		shortDesc: "+2 SpD on contact with user before it moves.",
		pp: 15,
		priority: -3,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, bullet: 1},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('bakingblast');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Baking Blast');
			},
			onHit(target, source, move) {
				if (this.checkMoveMakesContact(move, source, target)) {
					this.boost({def: 2, accuracy: 1}, target);
				}
			},
		},
		// FIXME: onMoveAborted(pokemon) {pokemon.removeVolatile('beakblast')},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('bakingblast');
		},
		secondary: null,
		target: "normal",
		type: "Silly",
		contestType: "Tough",
	},
	deathgrip: {
		num: 3015,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "Prevents the target from using pivoting moves.",
		name: "Death Grip",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Octolock", target);
		},
		volatileStatus: 'deathgrip',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Death Grip');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.moves.get(moveSlot.id);
					if (move.selfSwitch) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},

		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},
	
	//slate 9
	trumpcard: {
		inherit: true,
		basePowerCallback(source, target, move) {
			const callerMoveId = move.sourceEffect || move.id;
			const moveSlot = callerMoveId === 'instruct' ? source.getMoveData(move.id) : source.getMoveData(callerMoveId);
			let bp;
			if (!moveSlot) {
				bp = 40;
			} else {
				switch (moveSlot.pp) {
				case 0:
					bp = 250;
					break;
				case 1:
					bp = 120;
					break;
				case 2:
					bp = 90;
					break;
				case 3:
					bp = 60;
					break;
				default:
					bp = 40;
					break;
				}
			}

			this.debug('BP: ' + bp);
			return bp;
		},
		onPrepareHit(target, source, move) {
			if (!source.side.trumpcard) source.side.trumpcard = 0;
			source.side.trumpcard ++;
			console.log(source.name + " " + source.side.trumpcard);
		},
		onTryHit(target, source, move) {
			if (!move.multihit) return;
			if (!source.side.trumpcard) source.side.trumpcard = 0;
			source.side.trumpcard ++;
			console.log(source.name + " " + source.side.trumpcard);
		},
	},
	racism2: {
		name: "Racism 2",
		type: "Dark",
		category: "Special",
		basePower: 82,
		accuracy: 100,
		pp: 15,
		shortDesc: "25% chance to transform the target into Ferrothorn for 3 turns.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, sound: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Taunt", target);
		},
		secondary: {
			chance: 25,
			volatileStatus: 'racism2',
		},
		condition: {
			noCopy: true,
			duration: 3,
			onStart(pokemon) {
				pokemon.formeChange('Ferrothorn');
			},
			onEnd(pokemon) {
				pokemon.formeChange(pokemon.baseSpecies.name);
			},
		},
		target: "normal",
	},
	citron: {
		name: "Citron",
		type: "Lemon",
		category: "Special",
		basePower: 80,
		accuracy: 100,
		pp: 10,
		shortDesc: "Hits all adjacent foes.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, sound: 1,},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Overdrive", target);
		},
		secondary: null,
		target: "allAdjacentFoes",
	},
	citronoverload: {
		name: "CITRON OVERLOAD",
		type: "Lemon",
		category: "Special",
		basePower: 145,
		accuracy: true,
		pp: 1,
		shortDesc: "Hits all adjacent foes. All Pokemon become Lemon-type.",
		priority: 0,
		flags: {sound: 1},
		isZ: 'citroniumz',
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Boomburst", target);
		},
		onAfterHit(target, pokemon, move) {
			this.add('-fieldactivate', 'move: CITRON OVERLOAD');
			for (const pokemon of this.getAllActive()) {
				if(pokemon.setType('Lemon')) {
					this.add('-start', pokemon, 'typechange', 'Lemon');
				}
			}
		},
		secondary: null,
		target: "allAdjacentFoes",
	},
	everstormhalberd: {
		name: "Everstorm Halberd",
		type: "Dragon",
		category: "Physical",
		basePower: 0,
		damageCallback(pokemon, target) {
			const nonVanilla = ["Anarlvet",  "Kingler-Mega",  "microwave",  "Lytlegai",  "Ohmyrod",  "Big Crammer",  "Samurott-Sinnoh",  "Goomba",  "Fridgile",  "Melmetal 2",  "Pidown",  "Kurayami",  "Zelda",  "Drigike",  "Phish",  "Smelmetal",  "Bondra",  "Tangette-Eternal",  "Donmigo",  "Dragoone",  "Collachet",  "Guiltrism",  "Swooliobat",  "Electrode-Mega",  "Mario Kart Wii",  "Impalpitoad",  "Scrubby",  "Ogerpon-Cornerstone",  "palpitoad is so cool",  "Moltres-Mega",  "Jirachitwo",  "Shinx-Fishing",  "Conquescape",  "Daiyakuza",  "Pokestar Fisherman",  "Magnegiri",  "mario",  "Contamicow",  "Whonhef",  "Fish Factory",  "cowboy_bandido",  "Pokestar Giant",  "Richard Petty",  "Impidimp-Mega",  "Lemon",  "Fishing Zombie",  "Pokestar MT",  "Margaret Thatcher",  "Flesh Valiant",  "Flesh Valiant-Mega",  "Ronald Reagan",  "Lime Lips",  "Lemotic",  "Zestii",  "Rawring Moon",  "Boogerpon-CLOWNerstone",  "Keisberg-IF",  "Apple's Newest Emoji",  "Lemon Fish",  "Goddease",  "Jableye",  "Kyrum",  "Raccoon",  "Lucario-Calm",  "Nedontrol",  "Princirang",  "Iron Clown",  "The Pearl Hand",  "McFish",  "Applwirm",  "minun and plusle :D", "Traike", "Dr. Liberty", "Sunflora-Grave", "Hydralemon", "Hiveweb", "Syndican\'t", "Fish Marketing 3", "Lemonganium", "Carnivine-IF", "Grumpig", "Impromancer", "Pander Dragoon", "Soruarc", "Skibidragon", "Hitmontop-Mega", "Porygon-Z-Mega", "Furumo", "mega man", "Fudgesaur", "Fudgesaur-Mega", "darkpoison", "Sigma Rice Lion", "Lickilord", "Citrus Jams", "Everhál", "Grimace", "Pyroaring", "Tyler the Creator"];
			return nonVanilla.includes(target.baseSpecies.name) ? 200 : 150;
		},
		accuracy: 90,
		pp: 5,
		shortDesc: "Deals 150 damage; 200 to fakemon.",
		priority: -2,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Dragon Hammer", target);
		},
		secondary: null,
		target: "normal",
	},
	absolutezero: {
		name: "Absolute Zero",
		type: "Ice",
		category: "Special",
		basePower: 80,
		accuracy: 80,
		pp: 10,
		shortDesc: "Frigid Terrain: 1.5x power, lowers Speed by 2.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Sheer Cold", target);
		},
		onBasePower(basePower, source) {
			if (this.field.isTerrain('frigidterrain') && source.isGrounded()) {
				this.debug('terrain buff');
				return this.chainModify(1.5);
			}
		},
		onModifyMove(move, source, target) {
			if (this.field.isTerrain('frigidterrain') && source.isGrounded()) {
				move.secondaries = [];
				move.secondaries.push({
					chance: 100,
					boosts: {
						spe: -2,
					},
				});
			}
		},
		secondary: null,
		target: "normal",
	},
	yoshisisland: {
		name: "Yoshi\'s Island",
		type: "Normal",
		category: "Physical",
		basePower: 180,
		accuracy: 100,
		pp: 5,
		shortDesc: "Hits all adjacent Pokemon. User faints and gains 3 Fishing Tokens.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		selfdestruct: "always",
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Explosion", target);
		},
		onAfterHit(target, source) {
			source.side.addFishingTokens(3);
		},
		onAfterSubDamage(damage, target, source) {
			source.side.addFishingTokens(3);
		},
		secondary: null,
		target: "normal",
	},
	fuckaroundandfindout: {
		name: "Fuck Around and Find Out",
		type: "Silly",
		category: "Physical",
		basePower: 120,
		accuracy: 100,
		pp: 15,
		shortDesc: "Has 50% recoil unless it KOs the target.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		recoil: [1, 2],
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			const moves = this.dex.moves.all();
			this.add('-anim', pokemon, this.sample(moves).name, target);
		},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('fuckaroundandfindout');
		},
		condition: {
			duration: 1,
			noCopy: true,
			onSourceDamagingHit(damage, target, source, move) {
				if (target.hp <= 0) {
					source.addVolatile("ability:rockhead");
				}
			},
			onEnd(pokemon){
				pokemon.removeVolatile("ability:rockhead");
			},
		},
		secondary: null,
		target: "normal",
	},
	'5bigdooms': {
		accuracy: 100,
		basePower: 28,
		category: "Special",
		name: "5 Big Dooms",
		shortDesc: "Hits 5 times, 2 turns after being used.",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, futuremove: 1},
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: '5bigdooms',
				source: source,
				moveData: {
					id: '5bigdooms',
					name: "5 Big Dooms",
					accuracy: 100,
					basePower: 28,
					category: "Special",
					priority: 0,
					flags: {metronome: 1, futuremove: 1},
					multihit: 5,
					effectType: 'Move',
					type: 'Dark',
				},
			});
			this.add('-start', source, '5 Big Dooms');
			return this.NOT_FAIL;
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Beautiful",
	},
	snagphone: {
		name: "Snag Phone",
		type: "Lemon",
		category: "Physical",
		basePower: 20,
		accuracy: 100,
		pp: 20,
		shortDesc: "Steals the target's item if user is not holding one. User switches out.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1},
		selfSwitch: true,
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Thief", target);
		},
		onAfterHit(target, source, move) {
			if (source.item || source.volatiles['gem']) {
				return;
			}
			const yourItem = target.takeItem(source);
			if (!yourItem) {
				return;
			}
			if (!this.singleEvent('TakeItem', yourItem, target.itemState, source, target, move, yourItem) ||
				!source.setItem(yourItem)) {
				target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
				return;
			}
			this.add('-enditem', target, yourItem, '[silent]', '[from] move: Snag Phone', '[of] ' + source);
			this.add('-item', source, yourItem, '[from] move: Snag Phone', '[of] ' + target);
		},
		secondary: null,
		target: "normal",
	},
	
	//slate 10
	lemonthrow: {
		name: "Lemon Throw",
		type: "Lemon",
		category: "Physical",
		basePower: 25,
		accuracy: 90,
		pp: 10,
		shortDesc: "Hits 2-5 times.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Rock Blast", target);
		},
		secondary: null,
		target: "normal",
	},
	eatmyshorts: {
		name: "Eat My Shorts!",
		type: "Lemon",
		category: "Special",
		basePower: 85,
		accuracy: 100,
		pp: 10,
		shortDesc: "For 2 turns, the target cannot use status moves.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Taunt", target);
		},
		condition: {
			duration: 2,
			onStart(target) {
				if (target.activeTurns && !this.queue.willMove(target)) {
					this.effectState.duration!++;
				}
				this.add('-start', target, 'move: Taunt');
			},
			onResidualOrder: 15,
			onEnd(target) {
				this.add('-end', target, 'move: Taunt');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.moves.get(moveSlot.id);
					if (move.category === 'Status' && move.id !== 'mefirst') {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 5,
			onBeforeMove(attacker, defender, move) {
				if (!move.isZ && !move.isMax && move.category === 'Status' && move.id !== 'mefirst') {
					this.add('cant', attacker, 'move: Taunt', move);
					return false;
				}
			},
		},
		secondary: {
			chance: 100,
			onHit(target) {
				target.addVolatile('eatmyshorts');
			},
		},
		target: "normal",
	},
	citrusrend: {
		name: "Citrus Rend",
		type: "Lemon",
		category: "Physical",
		basePower: 70,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Fishious Rend damage boost');
				return move.basePower * 2;
			}
			this.debug('Fishious Rend NOT boosted');
			return move.basePower;
		},
		accuracy: 100,
		pp: 15,
		shortDesc: "Doubled power if user moves before the target.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bite: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Fishious Rend", target);
		},
		secondary: null,
		target: "normal",
	},
	decoyanvil: {
		name: "Decoy Anvil",
		type: "Silly",
		category: "Special",
		basePower: 110,
		accuracy: 100,
		pp: 10,
		shortDesc: "Lowers user's Sp. Atk by 1.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Rock Tomb", target);
			this.add('-anim', pokemon, "Core Enforcer", target);
		},
		self: {
			boosts: {
				spa: -1,
			},
		},
		secondary: null,
		target: "normal",
	},
	anvildrop: {
		name: "Anvil Drop",
		type: "Steel",
		category: "Physical",
		basePower: 80,
		accuracy: 100,
		pp: 5,
		shortDesc: "Hits in 2 turns. Sets Stealth Rock.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		ignoreImmunity: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'anvildrop',
				source,
				moveData: {
					id: 'anvildrop',
					name: "Anvil Drop",
					accuracy: 100,
					basePower: 80,
					category: "Physical",
					priority: 0,
					flags: { allyanim: 1, metronome: 1, futuremove: 1 },
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Steel',
					onAfterHit(target, source, move) {
						if (!move.hasSheerForce && source.hp) {
							for (const side of source.side.foeSidesWithConditions()) {
								side.addSideCondition('stealthrock');
							}
						}
					},
					onAfterSubDamage(damage, target, source, move) {
						if (!move.hasSheerForce && source.hp) {
							for (const side of source.side.foeSidesWithConditions()) {
								side.addSideCondition('stealthrock');
							}
						}
					},
				},
			});
			this.add('-start', source, 'move: Future Sight');
			return this.NOT_FAIL;
		},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Doom Desire", target);
		},
		secondary: null,
		target: "normal",
	},
	fishield: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fishield",
		shortDesc: "Protects from moves. Attack: +1 Fishing Token.",
		pp: 10,
		priority: 4,
		flags: { metronome: 1, noassist: 1, failcopycat: 1, fishing: 1},
		stallingMove: true,
		volatileStatus: 'fishield',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (move.category !== 'Status') {
					target.side.addFishingTokens(1);
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered) {
					target.side.addFishingTokens(1);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Water",
	},
	floatsamhook: {
		name: "Floatsam Hook",
		type: "Water",
		category: "Physical",
		basePower: 75,
		accuracy: 100,
		pp: 10,
		shortDesc: "Has +1 crit ratio for each user's Fishing Token.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Liquidation", target);
		},
		onModifyMove(move, pokemon) {
			move.critRatio = pokemon.side.fishingTokens;
		},
		secondary: null,
		target: "normal",
	},
	youwantfun: {
		name: "You Want Fun?!",
		type: "Dark",
		category: "Physical",
		basePower: 65,
		accuracy: 95,
		pp: 10,
		shortDesc: "Forces the target to switch to a random ally.",
		priority: -6,
		flags: {protect: 1, mirror: 1, metronome: 1},
		forceSwitch: true,
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Pursuit", target);
		},
		secondary: null,
		target: "normal",
	},
	abominationsjig: {
		name: "Abomination's Jig",
		type: "Silly",
		category: "Physical",
		basePower: 80,
		accuracy: 100,
		pp: 10,
		shortDesc: "30% chance to inflict Insanity on the target.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, dance: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Teeter Dance", target);
		},
		secondary: {
			chance: 30,
			volatileStatus: 'insanity',
		},
		target: "normal",
	},
	catchysong: {
		name: "Catchy Song",
		type: "Silly",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 10,
		shortDesc: "Inflicts the target with Insanity.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Sing", target);
		},
		volatileStatus: 'insanity',
		secondary: null,
		target: "normal",
	},
	bravestbird: {
		name: "Bravest Bird",
		type: "Flying",
		category: "Physical",
		basePower: 150,
		accuracy: 100,
		pp: 1,
		noPPBoosts: true,
		shortDesc: "Has 50% recoil. 10% chance to burn.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		recoil: [1, 2],
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Brave Bird", target);
		},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
	},
	bloomdesire: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Bloom Desire",
		shortDesc: "2 turns: 2/3 of user's max HP is restored, cure status.",
		pp: 5,
		priority: 0,
		flags: { snatch: 1, heal: 1, metronome: 1 },
		slotCondition: 'bloomdesire',
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Wish", target);
		},
		condition: {
			onStart(pokemon, source) {
				this.effectState.hp = source.maxhp * 2/3;
				this.effectState.turns = 2;
			},
			onResidualOrder: 4,
			onResidual(side) {
				if (this.effectState.turns === 0) side.removeSlotCondition(this.getAtSlot(this.effectState.sourceSlot), 'bloomdesire');
				else this.effectState.turns --;
			},
			onEnd(target) {
				if (target && !target.fainted) {
					const damage = this.heal(this.effectState.hp, target, target);
					if (damage) {
						this.add('-heal', target, target.getHealth, '[from] move: Bloom Desire', '[wisher] ' + this.effectState.source.name);
						target.cureStatus();
					}
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Grass",
		zMove: { boost: { spd: 1 } },
		contestType: "Cute",
	},
	acidrain: {
		name: "Acid Rain",
		type: "Lemon",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 5,
		shortDesc: "For 5 turns, the weather becomes Acid Rain.",
		priority: 0,
		flags: {protect: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Rain Dance", target);
		},
		weather: 'acidrain',
		secondary: null,
		target: "all",
	},
	makelemonade: {
		name: "Make Lemonade",
		type: "Lemon",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 5,
		shortDesc: "Heals a weather-dependent amount. Lemon-type removed until turn ends.",
		priority: 0,
		flags: { snatch: 1, heal: 1, metronome: 1 },
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
				case 'acidrain':
					factor = 0.667;
					break;
				case 'sunnyday':
				case 'desolateland':
				case 'raindance':
				case 'primordialsea':
				case 'sandstorm':
				case 'hail':
				case 'snowscape':
				case 'graveyard':
					factor = 0.333;
					break;
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
		self: {
			volatileStatus: 'makelemonade',
		},
		condition: {
			duration: 1,
			onResidualOrder: 25,
			onStart(target) {
				if (target.terastallized) {
					if (target.hasType('Lemon')) {
						this.add('-hint', "If a Terastallized Pokemon uses Make Lemonade, it remains Lemon-type.");
					}
					return false;
				}
				this.add('-singleturn', target, 'move: Make Lemonade');
			},
			onTypePriority: -1,
			onType(types, pokemon) {
				this.effectState.typeWas = types;
				return types.filter(type => type !== 'Lemon');
			},
		},
		secondary: null,
		target: "self",
	},
	fishmortar: {
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Fish Mortar",
		shortDesc: "Hits two turns after being used.",
		pp: 10,
		priority: 0,
		flags: { allyanim: 1, metronome: 1, futuremove: 1 },
		ignoreImmunity: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'fishmortar',
				source,
				moveData: {
					id: 'fishmortar',
					name: "Fish Mortar",
					accuracy: 100,
					basePower: 120,
					category: "Special",
					priority: 0,
					flags: { allyanim: 1, metronome: 1, futuremove: 1 },
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Water',
				},
			});
			this.add('-start', source, 'move: Fish Mortar');
			return this.NOT_FAIL;
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Clever",
	},
	stealthanvils: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Stealth Anvils",
		shortDesc: "Flattens the opponent upon entry.",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1, nosketch: 1, snatch: 1},
		sideCondition: 'stealthanvils',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'Stealth Anvils');
			},
			onEntryHazard(pokemon) {
				this.add('-message', `${pokemon.name} was flattened!`);
				pokemon.addVolatile('flattened');
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Steel",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	
	//silly shit
	attract: {
		inherit: true,
		type: "Silly",
	},
	bind: {
		inherit: true,
		type: "Silly",
	},
	confide: {
		inherit: true,
		type: "Silly",
	},
	confuseray: {
		inherit: true,
		type: "Silly",
	},
	constrict: {
		inherit: true,
		type: "Silly",
	},
	doubleslap: {
		inherit: true,
		type: "Silly",
	},
	faketears: {
		inherit: true,
		type: "Silly",
	},
	flatter: {
		inherit: true,
		type: "Silly",
	},
	growl: {
		inherit: true,
		type: "Silly",
	},
	harden: {
		inherit: true,
		type: "Silly",
	},
	healblock: {
		inherit: true,
		type: "Silly",
	},
	lick: {
		inherit: true,
		type: "Silly",
	},
	lovelykiss: {
		inherit: true,
		type: "Silly",
	},
	milkdrink: {
		inherit: true,
		type: "Silly",
	},
	mindreader: {
		inherit: true,
		type: "Silly",
	},
	pounce: {
		inherit: true,
		type: "Silly",
	},
	rocksmash: {
		inherit: true,
		type: "Silly",
	},
	roleplay: {
		inherit: true,
		type: "Silly",
	},
	skittersmack: {
		inherit: true,
		type: "Silly",
	},
	sleeptalk: {
		inherit: true,
		type: "Silly",
	},
	smackdown: {
		inherit: true,
		type: "Silly",
	},
	snarl: {
		inherit: true,
		type: "Silly",
	},
	submission: {
		inherit: true,
		type: "Silly",
	},
	swagger: {
		inherit: true,
		type: "Silly",
	},
	swallow: {
		inherit: true,
		type: "Silly",
	},
	sweetkiss: {
		inherit: true,
		type: "Silly",
	},
	tickle: {
		inherit: true,
		type: "Silly",
	},
	topsyturvy: {
		inherit: true,
		type: "Silly",
	},

	//disaster shit
	rockslide: {
		inherit: true,
		flags: {protect: 1, mirror: 1, metronome: 1, disaster: 1},
	},
	earthquake: {
		inherit: true,
		flags: {protect: 1, mirror: 1, nonsky: 1, metronome: 1, disaster: 1},
	},
	magnitude: {
		inherit: true,
		flags: {protect: 1, mirror: 1, nonsky: 1, metronome: 1, disaster: 1},
	},
	muddywater: {
		inherit: true,
		flags: {protect: 1, mirror: 1, nonsky: 1, metronome: 1, disaster: 1},
	},
	surf: {
		inherit: true,
		flags: {protect: 1, mirror: 1, nonsky: 1, metronome: 1, disaster: 1},
	},
	hurricane: {
		inherit: true,
		flags: {protect: 1, mirror: 1, distance: 1, wind: 1, metronome: 1, disaster: 1},
		onModifyMove(move, pokemon, target) {
			switch (target?.effectiveWeather()) {
			case 'raindance':
			case 'primordialsea':
				move.accuracy = true;
				break;
			case 'sunnyday':
			case 'desolateland':
			case 'acidrain':
				move.accuracy = 50;
				break;
			}
		},
	},
	thunder: {
		inherit: true,
		flags: {protect: 1, mirror: 1, metronome: 1, disaster: 1},
		onModifyMove(move, pokemon, target) {
			switch (target?.effectiveWeather()) {
			case 'raindance':
			case 'primordialsea':
				move.accuracy = true;
				break;
			case 'sunnyday':
			case 'desolateland':
			case 'acidrain':
				move.accuracy = 50;
				break;
			}
		},
	},
	blizzard: {
		inherit: true,
		flags: {protect: 1, mirror: 1, wind: 1, metronome: 1, disaster: 1},
		onModifyMove(move, pokemon, target) {
			switch (target?.effectiveWeather()) {
			case 'hail':
			case 'snow':
				move.accuracy = true;
				break;
			case 'acidrain':
				move.accuracy = 50;
				break;
			}
		},
	},
	dracometeor: {
		inherit: true,
		flags: {protect: 1, mirror: 1, metronome: 1, disaster: 1},
	},
	heatwave: {
		inherit: true,
		flags: {protect: 1, mirror: 1, wind: 1, metronome: 1, disaster: 1},
	},
	inferno: {
		inherit: true,
		flags: {protect: 1, mirror: 1, metronome: 1, disaster: 1},
	},
	eruption: {
		inherit: true,
		flags: {protect: 1, mirror: 1, metronome: 1, disaster: 1},
	},
	avalanche: {
		inherit: true,
		flags: {protect: 1, mirror: 1, contact: 1, metronome: 1, disaster: 1},
	},
	whirlwind: {
		inherit: true,
		flags: {reflectable: 1, mirror: 1, bypasssub: 1, allyanim: 1, metronome: 1, noassist: 1, failcopycat: 1, wind: 1, disaster: 1},
	},
	bleakwindstorm: {
		inherit: true,
		flags: {protect: 1, mirror: 1, wind: 1, metronome: 1, disaster: 1},
	},
	sandsearstorm: {
		inherit: true,
		flags: {protect: 1, mirror: 1, wind: 1, metronome: 1, disaster: 1},
	},
	wildboltstorm: {
		inherit: true,
		flags: {protect: 1, mirror: 1, wind: 1, metronome: 1, disaster: 1},
	},
	lavaplume: {
		inherit: true,
		flags: {protect: 1, mirror: 1, metronome: 1, disaster: 1},
	},
	twister: {
		inherit: true,
		flags: {protect: 1, mirror: 1, wind: 1, metronome: 1, disaster: 1},
	},
	magmastorm: {
		inherit: true,
		flags: {protect: 1, mirror: 1, metronome: 1, disaster: 1},
	},
	
	//foot shit
	axekick: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1},
	},
	blazekick: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1},
	},
	doublekick: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1},
	},
	highjumpkick: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1},
	},
	jumpkick: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1},
	},
	megakick: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1},
	},
	pyroball: {
		inherit: true,
		flags: {protect: 1, mirror: 1, metronome: 1, foot: 1},
	},
	stomp: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1},
	},
	stompingtantrum: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1},
	},
	thunderouskick: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1},
	},
	triplekick: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1},
	},
	tropkick: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1},
	},
	rollingkick: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1},
	},
	lowsweep: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, foot: 1},
	},
	
	//fake moves
	abomacarespikes: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Aboma Care Spikes",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1, nosketch: 1},
		sideCondition: 'abomacarespikes',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'Aboma Care Spikes', '[silent]');
			},
			onEntryHazard(pokemon) {
				this.heal(pokemon.maxhp / 4);
				pokemon.side.removeSideCondition('abomacarespikes');
				this.add('-sideend', pokemon.side, 'move: Aboma Care Spikes', '[of] ' + pokemon, '[silent]');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Grass",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	madnesscounter: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Madness Counter",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1, nosketch: 1},
		sideCondition: 'madnesscounter',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'Madness Counter');
			},
			onEntryHazard(pokemon) {
				if (pokemon.baseSpecies.diamondHand) {
					if (pokemon.hasAbility('stillwater')) pokemon.side.addFishingTokens(3);
					else {
						const bestStat = pokemon.getBestStat(true, true);
						this.boost({[bestStat]: 1}, pokemon);
					}
					pokemon.side.removeSideCondition('madnesscounter');
					this.add('-sideend', pokemon.side, 'move: Madness Counter', '[of] ' + pokemon);
				}
			},
		},
		secondary: null,
		target: "allySide",
		type: "Psychic",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	clownnose: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Clown Nose",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1, nosketch: 1},
		volatileStatus: 'clownnose',
		condition: {
			onStart(pokemon) {
				this.add('-message', `${pokemon.name} grew a clown nose!`);
				this.add('-start', pokemon, 'Clown Nose', '[silent]');
			},
		},
		secondary: null,
		target: "normal",
		type: "Silly",
	},
	fish: {
		name: "Fish",
		type: "Water",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 1,
		shortDesc: "Designates Fish Pokemon",
		viable: false,
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	diamondhand: {
		name: "Diamond Hand",
		type: "Normal",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 1,
		shortDesc: "Designates Diamond Hand Pokemon",
		viable: false,
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	hoenn: {
		name: "Hoenn",
		type: "Dragon",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 1,
		shortDesc: "Designates Hoenn Pokemon",
		viable: false,
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	trans: {
		name: "Trans",
		type: "Normal",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 1,
		shortDesc: "Designates Trans Pokemon",
		viable: false,
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	insanity: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Insanity",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1, nosketch: 1},
		volatileStatus: 'insanity',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Insanity', '[silent]');
			},
			onAfterMove(source, target, move) {
				if(move.category !== 'Status') this.actions.useMove('chaospotion', source);
			},
		},
		secondary: null,
		target: "normal",
		type: "Silly",
	},

	//vanilla moves
	naturepower: {
		inherit: true,
		onTryHit(target, pokemon) {
			let move = 'triattack';
			if (this.field.isTerrain('electricterrain')) {
				move = 'thunderbolt';
			} else if (this.field.isTerrain('grassyterrain')) {
				move = 'energyball';
			} else if (this.field.isTerrain('mistyterrain')) {
				move = 'moonblast';
			} else if (this.field.isTerrain('psychicterrain')) {
				move = 'psychic';
			} else if (this.field.isTerrain('fishingterrain')) {
				move = 'fishingminigame';
			} else if (this.field.isTerrain('frigidterrain')) {
				move = 'icebeam';
			}
			this.actions.useMove(move, pokemon, {target});
			return null;
		},
	},
	secretpower: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (this.field.isTerrain('')) return;
			move.secondaries = [];
			if (this.field.isTerrain('electricterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'par',
				});
			} else if (this.field.isTerrain('grassyterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'slp',
				});
			} else if (this.field.isTerrain('mistyterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spa: -1,
					},
				});
			} else if (this.field.isTerrain('psychicterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spe: -1,
					},
				});
			} else if (this.field.isTerrain('fishingterrain')) {
				move.secondaries.push({
					chance: 100,
					onHit(target, source, move) {
						source.side.addFishingTokens(1);
					},
				});
			} else if (this.field.isTerrain('frigidterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'frz',
				});
			} 
		},
	},
	terrainpulse: {
		inherit: true,
		onModifyType(move, pokemon) {
			if (!pokemon.isGrounded()) return;
			switch (this.field.terrain) {
			case 'electricterrain':
				move.type = 'Electric';
				break;
			case 'grassyterrain':
				move.type = 'Grass';
				break;
			case 'mistyterrain':
				move.type = 'Fairy';
				break;
			case 'psychicterrain':
				move.type = 'Psychic';
				break;
			case 'fishingterrain':
				move.type = 'Water';
				break;
			case 'frigidterrain':
				move.type = 'Ice';
				break;
			}
		},
	},
	firepledge: {
		inherit: true,
		isViable: true,
		shortDesc: "Sets Rainbow if Fishing Terrain is active.",
		onModifyMove(move) {
			if (this.field.isTerrain('fishingterrain')) move.sideCondition = 'waterpledge';
		},
	},
	grasspledge: {
		inherit: true,
		isViable: true,
		shortDesc: "Sets Swamp if Fishing Terrain is active.",
		onModifyMove(move) {
			if (this.field.isTerrain('fishingterrain')) move.sideCondition = 'grasspledge';
		},
	},
	skydrop: {
		inherit: true,
		onTry(source, target) {
			return !target.fainted && !target.volatiles['bigbutton'];
		},
	},
	blazingtorque: {
		inherit: true,
		isNonstandard: null,
	},
	wickedtorque: {
		inherit: true,
		isNonstandard: null,
	},
	combattorque: {
		inherit: true,
		isNonstandard: null,
	},
	noxioustorque: {
		inherit: true,
		isNonstandard: null,
	},
	magicaltorque: {
		inherit: true,
		isNonstandard: null,
	},
	gmaxcuddle: null,
	weatherball: {
		inherit: true,
		onModifyType(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.type = 'Fire';
				break;
			case 'raindance':
			case 'primordialsea':
				move.type = 'Water';
				break;
			case 'sandstorm':
				move.type = 'Rock';
				break;
			case 'hail':
			case 'snow':
				move.type = 'Ice';
				break;
			case 'graveyard':
				move.type = 'Ghost';
				break;
			case 'acidrain':
				move.type = 'Lemon';
				break;
			}
		},
		onModifyMove(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.basePower *= 2;
				break;
			case 'raindance':
			case 'primordialsea':
				move.basePower *= 2;
				break;
			case 'sandstorm':
				move.basePower *= 2;
				break;
			case 'hail':
			case 'snow':
				move.basePower *= 2;
				break;
			case 'graveyard':
				move.basePower *= 2;
				break;
			case 'acidrain':
				move.basePower *= 2;
				break;
			}
			this.debug('BP: ' + move.basePower);
		},
	},
	morningsun: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
			case 'snow':
			case 'graveyard':
			case 'acidrain':
				factor = 0.25;
				break;
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	synthesis: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
			case 'snow':
			case 'graveyard':
			case 'acidrain':
				factor = 0.25;
				break;
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	moonlight: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
			case 'graveyard':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
			case 'snow':
			case 'acidrain':
				factor = 0.25;
				break;
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	stockpile: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(target, source, effect) {
				this.effectState.layers = 1;
				this.effectState.def = 0;
				this.effectState.spd = 0;
				this.add('-start', target, 'stockpile' + this.effectState.layers);
				if (effect.id === 'fisheater') return;
				const [curDef, curSpD] = [target.boosts.def, target.boosts.spd];
				this.boost({def: 1, spd: 1}, target, target);
				if (curDef !== target.boosts.def) this.effectState.def--;
				if (curSpD !== target.boosts.spd) this.effectState.spd--;
			},
			onRestart(target, source, effect) {
				if (this.effectState.layers >= 3) return false;
				this.effectState.layers++;
				this.add('-start', target, 'stockpile' + this.effectState.layers);
				if (effect.id === 'fisheater') return;
				const curDef = target.boosts.def;
				const curSpD = target.boosts.spd;
				this.boost({def: 1, spd: 1}, target, target);
				if (curDef !== target.boosts.def) this.effectState.def--;
				if (curSpD !== target.boosts.spd) this.effectState.spd--;
			},
			onEnd(target) {
				if (this.effectState.def || this.effectState.spd) {
					const boosts: SparseBoostsTable = {};
					if (this.effectState.def) boosts.def = this.effectState.def;
					if (this.effectState.spd) boosts.spd = this.effectState.spd;
					this.boost(boosts, target, target);
				}
				this.add('-end', target, 'Stockpile');
				if (this.effectState.def !== this.effectState.layers * -1 || this.effectState.spd !== this.effectState.layers * -1) {
					this.hint("In Gen 7, Stockpile keeps track of how many times it successfully altered each stat individually.");
				}
			},
		},
	},
	solarbeam: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			const weakWeathers = ['raindance', 'primordialsea', 'sandstorm', 'hail', 'snow', 'acidrain'];
			if (weakWeathers.includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
	},
	solarblade: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			const weakWeathers = ['raindance', 'primordialsea', 'sandstorm', 'hail', 'snow', 'acidrain'];
			if (weakWeathers.includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
	},
	lightofruin: {
		inherit: true,
		isNonstandard: null,
	},
	baddybad: {
		inherit: true,
		isNonstandard: null,
	},
	fling: {
		inherit: true,
		onModifyPriority(priority, source, target, move) {
			if (source.ignoringItem()) return;
			const item = source.getItem();
			if (item.fling.priority) {
				return item.fling.priority;
			}
		},
		onPrepareHit(target, source, move) {
			if (source.ignoringItem()) return false;
			const item = source.getItem();
			if (!this.singleEvent('TakeItem', item, source.itemState, source, source, move, item)) return false;
			if (!item.fling) return false;
			
			move.basePower = item.fling.basePower;
			if (item.fling.damageCallback) move.damageCallback = item.fling.damageCallback;
			if (item.fling.multihit) move.multihit = item.fling.multihit;
			if (item.fling.priority) move.priority = item.fling.priority;
			if (item.fling.type) move.type = item.fling.type;
			
			this.debug('BP: ' + move.basePower);
			if (item.isBerry) {
				move.onHit = function (foe) {
					if (this.singleEvent('Eat', item, null, foe, null, null)) {
						this.runEvent('EatItem', foe, null, null, item);
						if (item.id === 'leppaberry') foe.staleness = 'external';
					}
					if (item.onEat) foe.ateBerry = true;
				};
			} else if (item.fling.effect) {
				move.onHit = item.fling.effect;
			} else {
				if (!move.secondaries) {
					move.secondaries = [];
					if (item.fling.status) {
					move.secondaries.push({status: item.fling.status});
					} else if (item.fling.volatileStatus) {
						move.secondaries.push({volatileStatus: item.fling.volatileStatus});
					} else if (item.fling.secondaries) {
						move.secondaries.push(item.fling.secondary);
					}
				}
				
			}
			source.addVolatile('fling');
		},
	},
	gravity: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Gravity');
					return 7;
				}
				if (source?.hasItem('spacejamdvd')) {
					this.add('-message', `${source.name} is ballin!`);
					return 8;
				}
				return 5;
			},
			onFieldStart(target, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-fieldstart', 'move: Gravity', '[persistent]');
				} else {
					this.add('-fieldstart', 'move: Gravity');
				}
				for (const pokemon of this.getAllActive()) {
					let applies = false;
					if (pokemon.removeVolatile('bounce') || pokemon.removeVolatile('fly')) {
						applies = true;
						this.queue.cancelMove(pokemon);
						pokemon.removeVolatile('twoturnmove');
					}
					if (pokemon.volatiles['skydrop']) {
						applies = true;
						this.queue.cancelMove(pokemon);

						if (pokemon.volatiles['skydrop'].source) {
							this.add('-end', pokemon.volatiles['twoturnmove'].source, 'Sky Drop', '[interrupt]');
						}
						pokemon.removeVolatile('skydrop');
						pokemon.removeVolatile('twoturnmove');
					}
					if (pokemon.volatiles['magnetrise']) {
						applies = true;
						delete pokemon.volatiles['magnetrise'];
					}
					if (pokemon.volatiles['telekinesis']) {
						applies = true;
						delete pokemon.volatiles['telekinesis'];
					}
					if (applies) this.add('-activate', pokemon, 'move: Gravity');
				}
			},
			onModifyAccuracy(accuracy) {
				if (typeof accuracy !== 'number') return;
				return this.chainModify([6840, 4096]);
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).flags['gravity']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (move.flags['gravity'] && !move.isZ) {
					this.add('cant', pokemon, 'move: Gravity', move);
					return false;
				}
			},
			onModifyMove(move, pokemon, target) {
				if (move.flags['gravity'] && !move.isZ) {
					this.add('cant', pokemon, 'move: Gravity', move);
					return false;
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 2,
			onFieldEnd() {
				this.add('-fieldend', 'move: Gravity');
			},
		},
	},
	magicroom: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Magic Room');
					return 7;
				}
				if (source?.hasItem('spacejamdvd')) {
					this.add('-message', `${source.name} is ballin!`);
					return 8;
				}
				return 5;
			},
			onFieldStart(target, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-fieldstart', 'move: Magic Room', `[of] ${source}`, '[persistent]');
				} else {
					this.add('-fieldstart', 'move: Magic Room', `[of] ${source}`);
				}
				for (const mon of this.getAllActive()) {
					this.singleEvent('End', mon.getItem(), mon.itemState, mon);
				}
			},
			onFieldRestart(target, source) {
				this.field.removePseudoWeather('magicroom');
			},
			// Item suppression implemented in Pokemon.ignoringItem() within sim/pokemon.js
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 6,
			onFieldEnd() {
				this.add('-fieldend', 'move: Magic Room', '[of] ' + this.effectState.source);
			},
		},
	},
	wonderroom: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Wonder Room');
					return 7;
				}
				if (source?.hasItem('spacejamdvd')) {
					this.add('-message', `${source.name} is ballin!`);
					return 8;
				}
				return 5;
			},
			onModifyMove(move, source, target) {
				// This code is for moves that use defensive stats as the attacking stat; see below for most of the implementation
				if (!move.overrideOffensiveStat) return;
				const statAndBoosts = move.overrideOffensiveStat;
				if (!['def', 'spd'].includes(statAndBoosts)) return;
				move.overrideOffensiveStat = statAndBoosts === 'def' ? 'spd' : 'def';
				this.hint(`${move.name} uses ${statAndBoosts === 'def' ? '' : 'Sp. '}Def boosts when Wonder Room is active.`);
			},
			onFieldStart(field, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-fieldstart', 'move: Wonder Room', `[of] ${source}`, '[persistent]');
				} else {
					this.add('-fieldstart', 'move: Wonder Room', `[of] ${source}`);
				}
			},
			onFieldRestart(target, source) {
				this.field.removePseudoWeather('wonderroom');
			},
			// Swapping defenses partially implemented in sim/pokemon.js:Pokemon#calculateStat and Pokemon#getStat
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 5,
			onFieldEnd() {
				this.add('-fieldend', 'move: Wonder Room');
			},
		},
	},
	reflect: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				if (source?.hasAbility('timebomb')) {
					return 10;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && this.effectState.target.hasAlly(target) && this.getCategory(move) === 'Physical') {
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Reflect weaken');
						if (this.activePerHalf > 1) return this.chainModify([2732, 4096]);
						return this.chainModify(0.5);
					}
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'Reflect');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 1,
			onSideEnd(side) {
				this.add('-sideend', side, 'Reflect');
			},
		},
	},
	lightscreen: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				if (source?.hasAbility('timebomb')) {
					return 10;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && this.effectState.target.hasAlly(target) && this.getCategory(move) === 'Special') {
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Light Screen weaken');
						if (this.activePerHalf > 1) return this.chainModify([2732, 4096]);
						return this.chainModify(0.5);
					}
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Light Screen');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Light Screen');
			},
		},
	},
	metronome: {
		inherit: true,
		onAfterMove(pokemon) {
			if (pokemon && pokemon.hp && pokemon.lastMove === 'metronome' && pokemon.item === 'metronome') {
				if (!pokemon.metronome) pokemon.metronome = 0;
				pokemon.metronome ++;
			}
			else pokemon.metronome = 0;
		},
	},
	sunnyday: {
		inherit: true,
		weather: null,
		onHitField(target, source) {
			if (this.field.isTerrain('fishingterrain')) {
				this.add('-message', 'The fishing terrain blocked out the sun!');
				return false;
			}
			this.field.setWeather('sunnyday');
		}
	},
};
