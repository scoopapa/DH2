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
		basePower: 40,
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
		    return 1;
		},
		selfBoost: {
			boosts: {
				atk: 1,
			},
		},
		status: 'par',
		target: "normal",
		type: "Steel",
		shortDesc: "Always super-effective. Always paralyzes. Raises user's attack by one stage.",
		contestType: "Beautiful",
	},
  	velvetblade: {
		accuracy: 100,
		basePower: 100,
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Night Slash", target);
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Payback NOT boosted');
				return move.basePower;
			}
			this.debug('Payback damage boost');
			return move.willCrit = true;
		},
		category: "Physical",
		name: "Velvet Blade",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
		secondary: null,
		target: "normal",
		type: "Dark",
		shortDesc: "If user moved after target, always crits.",
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
		secondary: {
			chance: 50,
			boosts: {
				atk: -1,
				spa: -1,
			},
		},
		target: "any",
		type: "Ghost",
		contestType: "Tough",
		//shortDesc: "50% chance to confuse the target.",
	},
  	chocolatekiss: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Chocolate Kiss",
		pp: 20,
		priority: 1,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Lovely Kiss", target);
		},
		secondary: {
			chance: 70,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Fairy",
		shortDesc: "Usually moves first. 70% chance to lower target's speed by 1.",
		contestType: "Cool",
	},
  	fishingminigame: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Fishing Minigame",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Anchor Shot", target);
		},
		onHit(target, source, move) {
			if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
		},
		secondary: null,
		target: "allAdjacentFoes",
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
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
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
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
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
		flags: {protect: 1, mirror: 1, metronome: 1},
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
		shotDesc: "100% chance to lower the target's Defense by 1. OHKOs Goomba.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1},
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
				if (target.baseSpecies == "Goomba")  move.ohko = true;
			}
		},
		target: "normal",
		type: "Normal",
		contestType: "Clever",
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
		shortDesc: "Forces the target to switch. Fails if the target is not attacking.",
		pp: 5,
		priority: 1,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1},
		forceSwitch: true,
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Boomburst", target);
		},
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? source.switchFlag = true : null;
			if (!move || (move.category === 'Status' && move.id !== 'mefirst') || target.volatiles['mustrecharge']) {
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
	cuddle: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "cuddle",
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
		shortDesc: "50%: 85 BP Special, hits Ghost; 50%: 2 Fishing Tokens.",
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
		name: "cuddle",
		shortDesc: "Guaranteed crit if either Pokemon used Big Button.",
		pp: 20,
		priority: 0,
		flags: {},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Giga Impact", target);
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
		category: "Physical",
		name: "Diamond Hatchet",
		shortDesc: "20% chance to make the target flinch.",
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
		basePower: 0,
		category: "Status",
		name: "Heart Drain",
		shortDesc: "Non-Bug: 1/8 of target's HP is restored to user every turn.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Giga Drain", target);
		},
		volatileStatus: 'heartdrain',
		condition: {
			onStart(target) {
				this.add('-start', target, 'move: Heart Drain');
			},
			onResidualOrder: 8,
			onResidual(pokemon) {
				const target = this.getAtSlot(pokemon.volatiles['heartdrain'].sourceSlot);
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to leech into');
					return;
				}
				const damage = this.damage(pokemon.baseMaxhp / 8, pokemon, target);
				if (damage) {
					this.heal(damage, target, pokemon);
				}
			},
		},
		onTryImmunity(target) {
			return !target.hasType('Bug');
		},
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
		type: "Bug",
	},
	tinycudgel: {
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Tiny Cudgel",
		shortDesc: "Always results in a critical hit.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Ivy Cudgel Rock", target);
		},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Rock",
	},
	awesomeearthquake: {
		name: "awesome Earthquake",
		type: "Ground",
		category: "Physical",
		basePower: 110,
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
		basePower: 0,
		accuracy: 99.9,
		pp: 1,
		noPPBoosts: true,
		shortDesc: "User faints. Removes entry hazards from the user's side of the field.",
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
					if (pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: OH MY GOOOOD WAAAAAAAAAANISFOKIFNOUH', '[of] ' + pokemon);
					}
				}
			}
		},
		selfdestruct: "always",
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
	anchorshot: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, fishing: 1},
	},
	arrowsoflight: {
		name: "Arrows of Light",
		type: "Fighting",
		category: "Physical",
		basePower: 0,
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
	fishprocessing: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fish Processing",
		shortDesc: "Sets 1 Fishing Token on the user's side when used and while the user stays in.",
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
				pokemon.side.addFishingToken(1);
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
		shortDesc: "Consumes half of user's side's Fishing Tokens; gains +1 Stockpile, 1/16 max HP for each one.",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, fishing: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Life Dew", pokemon);
		},
		onTry(source) {
			return (source.side.fishingTokens && source.side.fishingTokens > 0);
		},
		onHit(target, source, move) {
			const tokens = (source.side.fishingTokens % 2) ? source.side.fishingTokens / 2 : source.fishingTokens / 2 + 1;
			const success = source.side.removeFishingTokens(tokens);
			if (success) {
				for (let i = 0; i < Math.min(3, tokens); i ++) {
					source.addVolatile('stockpile');
				}
				this.heal(Math.ceil(source.maxhp * tokens / 16), source);
			}
			return success;
		},
		selfSwitch: true,
		secondary: null,
		target: "self",
		type: "Normal",
	},
	fishingterrain: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fishing Terrain",
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
					if(move.type === 'Water') mod *= 1.2;
					if(move.flags['fishing']) mod *= 1.5;
				}
				
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
				move = 'fishingmetagame';
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
			}
		},
	},
	waterpledge: {
		inherit: true,
		isViable: true,
		shortDesc: "Sets Rainbow if Fishing Terrain is active.",
		onModifyMove(move) {
			if (this.field.isTerrain('fishingterrain')) move.sideCondition = 'waterpledge';
		},
	},
	skydrop: {
		inherit: true,
		onTry(source, target) {
			return !target.fainted && !target.volatiles['bigbutton'];
		},
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
		basePower: 85,
		accuracy: 100,
		pp: 10,
		shortDesc: "Raises the user's Attack by 1.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1},
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
		shortDesc: "100% chance to lower the target’s Special Defense by one stage."
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
		selfSwitch: true,
		secondary: null,
		target: "self",
		type: "Fire",
	},
}
