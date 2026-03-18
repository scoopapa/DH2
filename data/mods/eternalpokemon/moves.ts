import { inherits } from "util";

export const Moves: { [moveid: string]: ModdedMoveData } = {

	// Phase I
	// Slate I

	// Eternal Magikarp
	callforfamily: { // todo: figure out how to make team preview ask for order if you have this move
        num: -129,
        accuracy: true,
        basePower: 0,
        category: 'Status',
        name: 'Call for Family',
        shortDesc: "+2 ↑stat of last in party fainted, uses its first move.",
        pp: 10,
        priority: 0,
        flags: {protect: 1, mirror: 1, metronome: 1},
        onTryMove() { // animation
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) { // animation
			this.add('-anim', source, 'Geomancy', target);
            this.add('-anim', source, 'Dragon Dance', target);
		},
        onTryHit(target, source, move) {
            // Find the last fainted Pokémon on the user's team
            const faintedPokemon = source.side.pokemon.filter(p => p.fainted);
            const lastFainted = faintedPokemon[faintedPokemon.length - 1];
    
            if (!lastFainted) {
                this.add('-fail', source, 'move: Call for Family');
                return null;
            }
    
            // Determine the best stat to boost
            const stats: Array<StatIDExceptHP> = ['atk', 'def', 'spa', 'spd', 'spe']; // List of stats to consider
            let bestStat: StatIDExceptHP = stats[0]; // Initialize with the first stat
            let highestValue = lastFainted.getStat(bestStat); // Get the initial highest value
    
            for (const stat of stats) {
                const currentValue = lastFainted.getStat(stat);
                if (currentValue > highestValue) {
                    highestValue = currentValue;
                    bestStat = stat; // Update bestStat to the current highest stat
                }
            }
            
            this.add('-anim', source, 'Moonlight'); // Animation for the move
            // Apply +2 to the best stat
            this.boost({[bestStat]: 2}, source);
    
            // Use the first move of the last fainted Pokémon
            const firstMove = lastFainted.moveSlots[0]; // Get the first move slot
    
            if (!firstMove) {
                this.add('-fail', source, 'move: Call for Family');
                return null;
            }
    
            // Use the move as if it were the user's move
            const moveData = this.dex.moves.get(firstMove.id);
            this.add('-message', `${source.name} summons ${lastFainted.name}'s ${moveData.name}!`);
    
            // Distinguish how to execute the move based on its target type
            switch (moveData.target) {
                case 'self':
                    this.actions.useMove(moveData.id, source, source); // Affects only the user
                    break;
                case 'allySide':
                    this.actions.useMove(moveData.id, source, source.side.pokemon[0]); // Affects an ally
                    break;
                case 'allyTeam':
                    this.actions.useMove(moveData.id, source, null); // Affects entire team
                    break;
                case 'normal':
                    const targets = source.side.foe.active.filter(target => target && !target.fainted);
                    if (targets.length > 0) {
                        const randomTarget = targets[Math.floor(Math.random() * targets.length)];
                        this.actions.useMove(moveData.id, source, randomTarget);
                    } else {
                        this.add('-fail', source, 'move: Call for Family'); // No available foes
                    }
                    break;
                // case any is important because without it, user will use distance moves against itself
                case 'any':
                    const anyTarget = source.side.foe.active.filter(target => target && !target.fainted);
                    if (anyTarget.length > 0) {
                        const randomTarget = anyTarget[Math.floor(Math.random() * anyTarget.length)];
                        this.actions.useMove(moveData.id, source, randomTarget);
                    } else {
                        this.add('-fail', source, 'move: Call for Family');
                    }
                    break;  
                default:
                    this.actions.useMove(moveData.id, source, target); // Default case; use original target if no specific case matches
                    break;
            }
        },
        secondary: null,
        target: 'self',
        type: 'Dragon',
        contestType: "Cool",
    },

	// Eternal Spinarak	
	cheliceraprey: {
        num: -167,
        accuracy: 100,
        basePower: 70,
        category: "Physical",
        name: "Chelicera Prey",
        shortDesc: "Crits against speed lowered target.",
        pp: 10,
        priority: 0,
        flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1},
        onTryMove() { // animation
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) { // animation
			this.add('-anim', source, 'Scary Face', target);
            this.add('-anim', source, 'Bug Bite', target);
		},
		onModifyMove(move, pokemon, target) {
			if (target && target.boosts.spe < 0) {
				move.willCrit = true;
			}
		},
        secondary: null,
        target: "normal",
        type: "Bug",
        contestType: "Tough",
    },

	// Eternal Skrelp	
	spiraldrain: {
        num: -690,
        accuracy: 100,
        basePower: 90,
        category: "Physical",
        name: "Spiral Drain",
        shortDesc: "100% poison. Recovers 50% damage dealt.",
        pp: 10,
        priority: 0,
        flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onTryMove() { // animation
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) { // animation
			this.add('-anim', source, 'Whirlpool', target);
            this.add('-anim', source, 'Giga Drain', target);
		},
		drain: [1, 2],
        secondary: {
			chance: 100,
			status: 'psn',
		},
        target: "normal",
        type: "Water",
        contestType: "Beautiful",
    },

    // Phase I
	// Slate II

	// Eternal Pikachu
    stormfront: {
		num: -25,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Storm Front",
        shortDesc: "Starts Rain. User switches out.",
		pp: 10,
		priority: 0,
		flags: {},
        onTryMove() { // animation
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) { // animation
			this.add('-anim', source, 'Ion Deluge', target);
		},
		weather: 'RainDance',
		selfSwitch: true,
		secondary: null,
		target: "all",
		type: "Electric",
	},

    // Eternal Fletchinder
    secondwind: {
		num: -662,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Second Wind",
        shortDesc: "Fails if at full HP. Heals 1/4 max HP.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1, metronome: 1, wind: 1},
        onTryMove() { // animation
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) { // animation
            this.add('-anim', source, 'Aeroblast', target);
            this.add('-anim', source, 'Morning Sun', target);
		},
        onTry(source, target) {
			if (source.hp == source.maxhp) return false;
		},
        onHit(target, source, move) {
            return !!this.heal(source.maxhp / 4, source, source, move);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
	},

    // Eternal Noibat
    ultraresonance: {
		num: -714,
		accuracy: 100,
		basePower: 300,
        basePowerCallback(pokemon, target, move) {
			const bp = move.basePower - Math.abs(pokemon.hp - target.hp);
			this.debug('BP: ' + bp);
			return bp;
		},
		category: "Special",
		name: "Ultra Resonance",
        shortDesc: "BP = 300 - HP diff of user and target.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, sound: 1},
        onTryMove() { // animation
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) { // animation
            this.add('-anim', source, 'Psych Up', target);
            this.add('-anim', source, 'Boomburst', target);
		},
        onTryImmunity(target, source) {
			return Math.abs(source.hp - target.hp) < 300;
		},
		secondary: null,
		target: "allAdjacent",
		type: "Normal",
	},

    // Phase I
	// Slate III

	// Eternal Onix
    crystallize: {
		num: -95,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Crystallize",
        shortDesc: "Heals 50%. Immune to status moves + stat drops.",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1, metronome: 1},
        onTryMove() { // animation
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) { // animation
            this.add('-anim', source, 'Rock Polish', target);
            if (source.maxhp != source.hp) this.add('-anim', source, 'Shore Up', target);
		},
        onHit(target, source, move) {
			const success = !!this.heal(source.maxhp / 2, source, source, move);
			if (source.volatiles['crystallize']) return success;
		},
        volatileStatus: 'crystallize',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Crystallize');
			},
			onTryBoost(boost, target, source, effect) { // stat drop immunity
                if (source && target === source) return;
                let showMsg = false;
                let i: BoostID;
                for (i in boost) {
                    if (boost[i]! < 0) {
                        delete boost[i];
                        showMsg = true;
                    }
                }
                if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
                    this.add("-fail", target, "unboost", "[from] move: Crystallize", "[of] " + target);
                }
            },
            onTryHit(target, source, move) { // status move immunity
                if (move.category === 'Status' && target !== source) {
                    this.add('-immune', target, '[from] ability: Good as Gold');
                    return null;
                }
            },
            onTryAddVolatile(status, target) {
                if (status.id === 'yawn') {
                    this.add('-immune', target, '[from] move: Crystallize');
                    return null;
                }
            },
		},
		secondary: null,
		target: "self",
		type: "Rock",
	},

    // Eternal Staryu
    corereaction: {
		num: -120,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Core Reaction",
        shortDesc: "User loses 33% of its max HP. +1 to all stats.",
		pp: 5,
		priority: 0,
		flags: {snatch: 1},
        onTryMove() { // animation
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) { // animation
            this.add('-anim', source, 'Morning Sun', target);
            this.add('-anim', source, 'Clangorous Soul', target);
		},
		onTry(source) {
			if (source.hp <= (source.maxhp * 33 / 100) || source.maxhp === 1) return false;
		},
		onTryHit(pokemon, target, move) {
			if (!this.boost(move.boosts as SparseBoostsTable)) return null;
			delete move.boosts;
		},
		onHit(pokemon) {
			this.directDamage(pokemon.maxhp * 33 / 100);
		},
		boosts: {
			atk: 1,
			def: 1,
			spa: 1,
			spd: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Psychic",
	},

    // Eternal Doublade
    soulsplittingslices: {
		num: 818,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Soul-Splitting Slices",
        shortDesc: "Hits w/ effectiveness for each type of target.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
        onTryMove() { // animation
			this.attrLastMove('[still]');
		},
        onPrepareHit(target, source) { // animation
            const targetTypes = [target.types[0]];
            if (target.types[1]) targetTypes.push(target.types[1])
            for (let type of this.dex.types.names()) {
                if (target.hasType(type) && !targetTypes.includes(type)) {
                    targetTypes.push(type);
                    break;
                }
            }
            for (let type of targetTypes) {
                this.add('-anim', source, 'Sacred Sword', target);
            }
		},
		onModifyMove(move, pokemon, target) {
            const targetTypes = [target.types[0]];
            if (target.types[1]) targetTypes.push(target.types[1])
            for (let type of this.dex.types.names()) {
                if (target.hasType(type) && !targetTypes.includes(type)) {
                    targetTypes.push(type);
                    break;
                }
            }
            move.multihit = targetTypes.length;
            move.targetTypes = targetTypes;
		},
        onEffectiveness(typeMod, target, type, move) {
            const i = move.hit - 1;
            if (type == move.targetTypes[i]) return this.dex.getEffectiveness(move.type, type);
			else return 0;
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},

    // Phase I
	// Slate IV

    // Eternal Ekans
    rocketwrap: {
		num: -23,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Rocket Wrap",
        shortDesc: "100% flinch. User switches. Fails if last active.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
        onTryMove() { // animation
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) { // animation
            this.add('-anim', source, 'Coil', target);
            this.add('-anim', source, 'Wrap', target);
		},
        onTry(source) {
			return !!this.canSwitch(source.side);
		},
		selfSwitch: true,
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Poison",
	},

    // Eternal Krokorok
    kleptomania: {
        num: -552,
		accuracy: 100,
		basePower: 50,
        basePowerCallback(pokemon, target, move) {
			let bp = move.basePower;
            if (pokemon.timesStolen) bp += 150 * pokemon.timesStolen
			this.debug("BP: " + bp);
			return bp;
		},
		category: "Physical",
		name: "Kleptomania",
        shortDesc: "+150 BP each time the user has stolen an item.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
        onTryMove() { // animation
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) { // animation
            this.add('-anim', source, 'Nasty Plot', target);
            this.add('-anim', source, 'Punishment', target);
		},
		target: "normal",
		type: "Dark",
    },

    // moves modified to interact with Eternal Krokorok's Kleptomania
    covet: {
		num: 343,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Covet",
		pp: 25,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, failmefirst: 1, noassist: 1, failcopycat: 1},
		onAfterHit(target, source, move) {
			if (source.item || source.volatiles['gem']) {
				return;
			}
			const yourItem = target.takeItem(source);
			if (!yourItem) {
				return;
			}
			if (
				!this.singleEvent('TakeItem', yourItem, target.itemState, source, target, move, yourItem) ||
				!source.setItem(yourItem)
			) {
				target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
				return;
			}
			this.add('-item', source, yourItem, '[from] move: Covet', '[of] ' + target);
            if (source.timesStolen) source.timesStolen++; // added for Kleptomania
            else source.timesStolen = 1;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cute",
	},
    thief: {
		num: 168,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Thief",
		pp: 25,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, failmefirst: 1, noassist: 1, failcopycat: 1},
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
			this.add('-enditem', target, yourItem, '[silent]', '[from] move: Thief', '[of] ' + source);
			this.add('-item', source, yourItem, '[from] move: Thief', '[of] ' + target);
            if (source.timesStolen) source.timesStolen++; // added for Kleptomania
            else source.timesStolen = 1;
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},

    // Eteral Litleo
    fieryprovocation: {
		num: -667,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target, move) {
            const bp = target.species.baseStats.atk;
            this.debug('BP: ' + bp);
			return bp;
		},
		category: "Physical",
		name: "Fiery Provocation",
        shortDesc: "BP = target's base Atk. Proportional burn chance.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
        onTryMove() { // animation
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) { // animation
            this.add('-anim', source, 'Swagger', target);
            this.add('-anim', source, 'Flare Blitz', target);
		},
        onModifyMove(move, pokemon, target) {
            const odds = 100 * target.species.baseStats.atk / 255
            move.secondaries = [];
			move.secondaries.push({
                chance: odds,
                status: 'brn',
            });
		},
		secondary: null,
		target: "normal",
		type: "Fire",
	},

    // Phase I
	// Slate V

    // Eternal Weepinbell
    flytrap: {
		num: -70,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Flytrap",
		shortDesc: ".5x contact damage + PSN on contact. SE > Bug.",
		pp: 15,
		priority: -3,
		flags: {contact: 1, protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1},
		onTryMove() { // animation
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) { // animation
            this.add('-anim', source, 'Poison Fang', target);
		},
        priorityChargeCallback(pokemon) {
			pokemon.addVolatile('flytrap');
            this.add('-anim', pokemon, 'Swallow', pokemon);
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Flytrap');
			},
			onHit(target, source, move) {
				if (this.checkMoveMakesContact(move, source, target)) {
					source.trySetStatus('psn', target);
				}
			},
            onSourceModifyDamage(damage, source, target, move) {
                let mod = 1;
                if (move.flags['contact']) mod /= 2;
                return this.chainModify(mod);
            },
		},
		// FIXME: onMoveAborted(pokemon) {pokemon.removeVolatile('flytrap')},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('flytrap');
		},
        onEffectiveness(typeMod, target, type) {
			if (type === 'Bug') return 1;
		},
		secondary: null,
		target: "normal",
		type: "Grass",
	},

    // Eternal Eevee
    continuoussteps: {
		num: -133,
		accuracy: 50, // unmodifiable accuracy implemented in eternalpokemon/scripts.ts
		basePower: 50,
		category: "Physical",
		name: "Continuous Steps",
		shortDesc: "Hits 50x. Each hit can miss. Ignores Acc modifiers.",
		pp: 40,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
        onTryMove() { // animation
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) { // animation
            this.add('-anim', source, 'Stomp', target);
		},
		onHit(target, source) { // animation
			this.add('-anim', source, 'Stomp', target);
		},
		multihit: 50,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Normal",
	},

    // Eternal Dragonair
    nineorbassault: { // todo switch out effect
		num: -148,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Nine-Orb Assault",
		shortDesc: "User switches after using a status move.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1, metronome: 1, pulse: 1},
        onTryMove() { // animation
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) { // animation
            this.add('-anim', source, 'Clangorous Soul', target);
            this.add('-anim', source, 'Dragon Energy', target);
		},
        onAfterMove(source, target, move) {
			source.addVolatile("nineorbassault");
		},
        condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Nine-Orb Assault');
			},
            onAfterMove(source, target, move) {
                if (move && move.category == 'Status' && source && source.hp) {
                    if (!this.canSwitch(source.side) || source.forceSwitchFlag || source.beingCalledBack || source.isSkyDropped()) return;
                    if (source.volatiles['commanding'] || source.volatiles['commanded']) return;
                    target.switchFlag = true;
                }
            }
		},
		secondary: null,
		target: "any",
		type: "Dragon",
		contestType: "Beautiful",
	},

    // Eternal Hippopotas
    sirocco: {
		num: -449,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Sirocco",
		shortDesc: "10% chance to burn. Super effective on Grass.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, wind: 1},
        onTryMove() { // animation
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) { // animation
            this.add('-anim', source, 'Scorching Sands', target);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Grass') return 1;
		},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
		type: "Ground",
	},

    // Phase I
	// Slate VI

    // Eternal Kirlia
    sentimentalpirouette: {
		num: -281,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Sentimental Pirouette",
		shortDesc: "SpD > Atk in calculation. If SpD > Spe, +1 Spe.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		overrideOffensiveStat: 'spd',
        onTryMove() { // animation
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) { // animation
            this.add('-anim', source, 'Rapid Spin', target);
            this.add('-anim', source, 'Psystrike', target);
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (pokemon.getStat('spd', false, true) > pokemon.getStat('spe', false, true)) {
                this.boost({spe: 1}, pokemon, pokemon, move);
            }
		},
		target: "normal",
		type: "Psychic",
	},

    // Eternal Skiddo
    mosspit: {
		num: -672,
		accuracy: 100,
		basePower: 75,
        basePowerCallback(source, target, move) {
			if (!this.queue.willMove(target)) {
                this.debug('Moss Pit damage boost');
			    return move.basePower * 1.3;
			}
			this.debug('Moss Pit NOT boosted');
			return move.basePower;
		},
		category: "Physical",
		name: "Moss Pit",
		shortDesc: "30% BP + Grassy Terrain ifn't move before target.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
        onTryMove() { // animation
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) { // animation
            this.add('-anim', source, 'Wood Hammer', target);
		},
		onHit(target, source, move) {
			if (!this.queue.willMove(target)) {
                this.debug('Moss Pit set grassy terrain');
                this.field.setTerrain('grassyterrain');
            } else {
                this.debug('Moss Pit NO grassy terrain');
            }
		},
		secondary: null,
		target: "normal",
		type: "Grass",
	},

    // Eternal Pancham
    corkscrewpunch: {
		num: -674,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		name: "Corkscrew Punch",
		shortDesc: "Frees user from hazards, binding, Leech Seed.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, metronome: 1},
        onTryMove() { // animation
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) { // animation
            this.add('-anim', source, 'Focus Energy', target);
            this.add('-anim', source, 'Dynamic Punch', target);
		},
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},

    // Eternal Espurr
    catseye: {
		num: -677,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Cat's Eye",
		shortDesc: "33% heal. +1 SpA & 33% drain each Dark-type.",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1, metronome: 1},
        onTryMove() { // animation
			this.attrLastMove('[still]');
		},
		onHit(target, source, move) {
			let factor = 1/3;

			const targets: Pokemon[] = [];
			for (const pokemon of this.getAllActive()) {
				if (this.runEvent('Invulnerability', pokemon, source, move) === false) {
					this.add('-miss', source, pokemon);
				} else if (this.runEvent('TryHit', pokemon, source, move) && pokemon.hasType('Dark')) {
					targets.push(pokemon);
				}
			}
			this.add('-fieldactivate', 'move: Cat\'s Eye');
			for (const pokemon of targets) {
                this.add('-anim', source, 'Night Shade', pokemon);
				this.directDamage(pokemon.maxhp / 3, pokemon, source);
                this.boost({spa: 1}, source, source, move);
                factor += 1/3;
			}

            if (source.maxhp != source.hp) this.add('-anim', source, 'Recover', target);
			const success = !!this.heal(this.modify(source.maxhp, factor));
			if (!success && !targets.length) {
				this.add('-fail', source, 'heal');
				return this.NOT_FAIL;
			}
		},
		secondary: null,
		target: "self",
		type: "Psychic",
	},
};
