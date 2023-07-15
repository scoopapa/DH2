export const Abilities: {[k: string]: ModdedAbilityData} = {
    "cacophony": {
        desc: "Boosts the power of sound-based moves by 1.3x.",
        shortDesc: "Boosts sound move power.",
        onBasePowerPriority: 8,
        onBasePower(basePower, attacker, defender, move) {
            if (move.flags['sound']) {
                this.debug('Punk Rock boost');
                return this.chainModify([0x14CD, 0x1000]);
            }
        },
        id: "cacophony",
        name: "Cacophony",
    },
    "burningechoes": {
        shortDesc: "This Pokemon's Sound moves have a 20% chance to burn.",
        // upokecenter says this is implemented as an added secondary effect
        onModifyMove(move) {
            if (!move || !move.flags['sound'] || move.target === 'self') return;
            if (!move.secondaries) {
                move.secondaries = [];
            }
            move.secondaries.push({
                chance: 20,
                status: 'brn',
                ability: this.dex.getAbility('burningechoes'),
            });
        },
        id: "burningechoes",
        name: "Burning Echoes",
    },
    "moonlightboost": {
        shortDesc: "Moves with the word Moon in their name deal 1.3x more damage; Moonlight heals 66.7% HP in clear weather",
        onBasePowerPriority: 8,
        onBasePower(basePower, attacker, defender, move) {
            if (move.name === 'Full Moon Crash' || 'Moonblast' || 'Moongeist Beam' || 'Menacing Moonraze Maelstrom' || 'Malicious Moonsault') {
                return this.chainModify(1.3);
            }
        },
        id: "moonlightboost",
        name: "Moonlight Boost",
    },
    "knightsblade": {
        shortDesc: "Boosts the power of sword, cut, slash, claw, and blade moves by 1.5x",
        onBasePowerPriority: 8,
        onBasePower(basePower, attacker, defender, move) {
            if (move.name === 'Psycho Cut' || move.name === 'Cut' || move.name === 'Slash' || move.name === 'Night Slash' || move.name === 'Solar Blade' || move.name === 'Leaf Blade' || move.name === 'X-Scissor' || move.name === 'Cross Poison' || move.name === 'Air Slash' || move.name === 'Air Cutter' || move.name === 'Fury Cutter' || move.name === 'Sacred Sword' || move.name === 'Secret Sword' || move.name === 'Razor Shell' || move.name === 'Behemoth Blade' || move.name === 'Aerial Ace' || move.name === 'Metal Claw' || move.name === 'Dragon Claw' || move.name === 'Shadow Claw' || move.name === 'Crush Claw' || move.name === 'False Swipe' || move.name === 'Scratch') {
                return this.chainModify(1.5);
            }
        },
        id: "knightsblade",
        name: "Knight's Blade",
    },
    "divinelight": {
        desc: "On switch-in, this Pokemon lowers the Attack and Sp. Attack of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
        shortDesc: "On switch-in, this Pokemon lowers the Attack and Sp. Attack of adjacent opponents by 1 stage.",
        onStart (pokemon) {
            let activated = false;
            for (const target of pokemon.side.foe.active) {
                if (!target || !this.isAdjacent(target, pokemon)) continue;
                if (!activated) {
                    this.add('-ability', pokemon, 'Divine Light', 'boost');
                    activated = true;
                }
                if (target.volatiles['substitute']) {
                    this.add('-immune', target);
                } else {
                    this.boost({atk: -1, spa: -1}, target, pokemon);
                }
            }
        },
        id: "divinelight",
        name: "Divine Light",
    },
    "mattersplitter": {
        desc: "On switch-in, this Pokemon lowers the Defense and Sp. Defense of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
        shortDesc: "On switch-in, this Pokemon lowers the Defense and Sp. Defense of adjacent opponents by 1 stage.",
        onStart (pokemon) {
            let activated = false;
            for (const target of pokemon.side.foe.active) {
                if (!target || !this.isAdjacent(target, pokemon)) continue;
                if (!activated) {
                    this.add('-ability', pokemon, 'Matter Splitter', 'boost');
                    activated = true;
                }
                if (target.volatiles['substitute']) {
                    this.add('-immune', target);
                } else {
                    this.boost({def: -1, spd: -1}, target, pokemon);
                }
            }
        },
        id: "Matter Splitter",
        name: "Matter Splitter",
    },
    "atomsmasher": {
        shortDesc: "This Pokemon's Special Attack is doubled.",
        onModifyAtkPriority: 5,
        onModifyAtk(spa) {
            return this.chainModify(2);
        },
        id: "atomsmasher",
        name: "Atom Smasher",
    },
    "cutecharm": {
        desc: "On switch-in, this Pokemon lowers the Sp. Attack of adjacent opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
        shortDesc: "On switch-in, this Pokemon lowers the Sp. Attack of adjacent opponents by 1 stage.",
        onStart (pokemon) {
            let activated = false;
            for (const target of pokemon.side.foe.active) {
                if (!target || !this.isAdjacent(target, pokemon)) continue;
                if (!activated) {
                    this.add('-ability', pokemon, 'Cute Charm', 'boost');
                    activated = true;
                }
                if (target.volatiles['substitute']) {
                    this.add('-immune', target);
                } else {
                    this.boost({spa: -1}, target, pokemon);
                }
            }
        },
        id: "cutecharm",
        name: "Cute Charm",
        rating: 3.5,
        num: 22,
    },
    "watercompaction": {
        shortDesc: "This Pokemon's Defense is raised 6 stages after it is damaged by a Water- or Ice-type move.",
        onDamagingHit(damage, target, source, move) {
            if (['Water', 'Ice'].includes(move.type)) {
                this.boost({def: 6});
            }
        },
        id: "watercompaction",
        name: "Water Compaction",
        rating: 1.5,
        num: 195,
    },
    "flowergift": {
        desc: "If this Pokemon is a Cherrim and Sunny Day is active, it changes to Sunshine Form, its Speed is doubled, and the Attack and Special Defense of it and its allies are multiplied by 1.5. If this Pokemon is a Cherrim and it is holding Utility Umbrella, it remains in its regular form and the Attack and Special Defense stats of it and its allies are not boosted. If this Pokemon is a Cherrim in its Sunshine form and is given Utility Umbrella, it will immediately switch back to its regular form. If this Pokemon is a Cherrim holding Utility Umbrella and its item is removed while Sunny Day is active, it will transform into its Sunshine Form. If an ally is holding Utility Umbrella while Cherrim is in its Sunshine Form, they will not receive the Attack and Special Defense boosts.",
        shortDesc: "If user is Cherrim and Sunny Day is active, its Speed is doubled and it and allies' Attack and Sp. Def are 1.5x.",
        onStart(pokemon) {
            delete this.effectData.forme;
        },
        onUpdate(pokemon) {
            if (!pokemon.isActive || pokemon.baseSpecies.baseSpecies !== 'Cherrim' || pokemon.transformed) return;
            if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
                if (pokemon.species.speciesid !== 'cherrimsunshine') {
                    pokemon.formeChange('Cherrim-Sunshine', this.effect, false, '[msg]');
                }
            } else {
                if (pokemon.species.speciesid === 'cherrimsunshine') {
                    pokemon.formeChange('Cherrim', this.effect, false, '[msg]');
                }
            }
        },
        onAllyModifyAtkPriority: 3,
        onAllyModifyAtk(atk, pokemon) {
            if (this.effectData.target.baseSpecies.baseSpecies !== 'Cherrim') return;
            if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
                return this.chainModify(1.5);
            }
        },
        onModifySpDPriority: 4,
        onAllyModifySpD(spd, pokemon) {
            if (this.effectData.target.baseSpecies.baseSpecies !== 'Cherrim') return;
            if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
                return this.chainModify(1.5);
            }
        },
        onModifySpe(spe, pokemon) {
            if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
                return this.chainModify(2);
            }
        },
        id: "flowergift",
        name: "Flower Gift",
        rating: 1,
        num: 122,
    },
    "megalauncher": {
        desc: "This Pokemon's pulse moves have their power multiplied by 1.5. Heal Pulse restores 3/4 of a target's maximum HP, rounded half down.",
        shortDesc: "This Pokemon's pulse moves have 1.5x power. Heal Pulse heals 3/4 target's max HP.",
        onBasePowerPriority: 8,
        onBasePower(basePower, attacker, defender, move) {
            if (move.flags['pulse'] || move.name === 'Steam Eruption' || move.name === 'Flash Cannon' || move.name === 'Techno Blast' || move.name === 'Fire Blast' || move.name === 'Moonblast' || move.name === 'Aeroblast' || move.name === 'Magnet Bomb' || move.name === 'Focus Blast' || move.name === 'Octazooka' || move.name === 'Rock Blast' || move.name === 'Sludge Bomb' || move.name === 'Seed Bomb' || move.name === 'Zap Cannon' || move.name === 'Mud Bomb' || move.name === 'Egg Bomb' || move.name === 'Snipe Shot') {
                return this.chainModify(1.5);
            }
        },
        id: "megalauncher",
        name: "Mega Launcher",
        rating: 3.5,
        num: 178,
    },
    "royalpresence": {
        desc: "While this Pokemon is active, priority moves from opposing Pokemon targeted at allies are prevented from having an effect.",
        shortDesc: "While this Pokemon is active, allies are protected from opposing priority moves.",
        onFoeTryMove(target, source, move) {
            const targetAllExceptions = ['perishsong', 'flowershield', 'rototiller'];
            if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
                return;
            }
 
            const dazzlingHolder = this.effectData.target;
            if ((source.side === dazzlingHolder.side || move.target === 'all') && move.priority > 0.1) {
                this.attrLastMove('[still]');
                this.add('cant', dazzlingHolder, 'ability: Royal Presence', move, '[of] ' + target);
                return false;
            }
        },
        id: "royalpresence",
        name: "Royal Presence",
    },
	 "solidify": {
		  shortDesc: "This Pokemon's Defense is boosted by 1.5x but its Speed is halved.",
		  onModifyDefPriority: 6,
		  onModifyDef(def) {
			  return this.chainModify(1.5);
		  },
		  onModifySpe(spe, pokemon) {
			  return this.chainModify(0.5);
		  },
        id: "solidify",
        name: "Solidify",
	 },
	 "schooling": {
		  desc: "On switch-in, if this Pokemon is a Wishiwashi that is level 20 or above and has more than 1/4 of its maximum HP left, it changes to School Form. If it is in School Form and its HP drops to 1/4 of its maximum HP or less, it changes to Solo Form at the end of the turn. If it is in Solo Form and its HP is greater than 1/4 its maximum HP at the end of the turn, it changes to School Form.",
		  shortDesc: "If user is Wishiwashi, changes to School Form if it has > 1/4 max HP, else Solo Form.",
		  onStart(pokemon) {
			  if (pokemon.baseSpecies.baseSpecies !== 'Wishiwashi' || pokemon.level < 20 || pokemon.transformed) return;
			  if (pokemon.hp > pokemon.maxhp / 4) {
				  if (pokemon.species.speciesid === 'wishiwashi') {
					  pokemon.formeChange('Wishiwashi-School');
					  this.add('-formechange', pokemon, 'Wishiwashi-School', '[from] ability: Schooling');
				  }
			  } else {
				  if (pokemon.species.speciesid === 'wishiwashischool') {
					  pokemon.formeChange('Wishiwashi');
					  this.add('-formechange', pokemon, 'Wishiwashi', '[from] ability: Schooling');
				  }
			  }
		  },
		  onResidualOrder: 27,
		  onResidual(pokemon) {
			  if (pokemon.baseSpecies.baseSpecies !== 'Wishiwashi' || pokemon.level < 20 || pokemon.transformed || !pokemon.hp) return;
			  if (pokemon.hp > pokemon.maxhp / 4) {
				  if (pokemon.species.speciesid === 'wishiwashi') {
					  pokemon.formeChange('Wishiwashi-School');
					  this.add('-formechange', pokemon, 'Wishiwashi-School', '[from] ability: Schooling');
				  }
			  } else {
				  if (pokemon.species.speciesid === 'wishiwashischool' && !pokemon.hasItem('graduationscale')) {
					  pokemon.formeChange('Wishiwashi');
					  this.add('-formechange', pokemon, 'Wishiwashi', '[from] ability: Schooling');
				  }
			  }
		  },
		  id: "schooling",
		  name: "Schooling",
		  rating: 3,
		  num: 208,
	 },
	 "shadowbeacon": {
		shortDesc: "Ghost and Dark-type moves used by any Pokemon on the field are boosted 1.3x. Effected by Aura Break.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Shadow Beacon');
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Dark' || move.type !== 'Ghost') return;
			if (!move.auraBooster) move.auraBooster = this.effectData.target;
			if (move.auraBooster !== this.effectData.target) return;
			return this.chainModify([move.hasAuraBreak ? 0x0C00 : 0x1547, 0x1000]);
		},
		isUnbreakable: true,
		id: "shadowbeacon", 
		name: "Shadow Beacon",
	},	
	 "energybeacon": {
		shortDesc: "Electric and Fighting-type moves used by any Pokemon on the field are boosted 1.3x. Effected by Aura Break.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Energy Beacon');
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Electric' || move.type !== 'Fighting') return;
			if (!move.auraBooster) move.auraBooster = this.effectData.target;
			if (move.auraBooster !== this.effectData.target) return;
			return this.chainModify([move.hasAuraBreak ? 0x0C00 : 0x1547, 0x1000]);
		},
		isUnbreakable: true,
		id: "energybeacon",
		name: "Energy Beacon",
	},
	"overconfidence": {
      shortDesc: "This Pokemon's Special Attack is raised 1 stage after getting a KO",
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({spa: length}, source);
			}
		},
		name: "Overconfidence",
		id: "overconfidence",
	},
	"elementalteething": {
		shortDesc: "This Pokemon's type changes before using a move and its biting moves are boosted 1.2x",
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bite']) {
				return this.chainModify(1.2);
			}
		},
		onPrepareHit(source, target, move) {
			if (move.hasBounced) return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Elemental Teething');
			}
		},
		name: "Elemental Teething",
		id: "elementalteething",
	},
/*
	optimalplay: {
		shortDesc: "This Pokemon's super effective moves have perfect accuracy",
		onAnyAccuracy(accuracy, target, source, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				return true;
			}
			return accuracy;
		},
		name: "Optimal Play",
		rating: 3,
	},
*/
	 chillingpresence: {
       shortDesc: "On switch-in, this Pokemon uses Mist.",
       onStart(source) {
           this.useMove("Mist", source);
       },
       name: "Chilling Presence",
       rating: 3,
    },
	pixiepower: {
      shortDesc: "This Pokemon's Special Attack is boosted 1.3x in Misty Terrain.",
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (this.field.isTerrain('mistyterrain')) return this.chainModify(1.3);
		},
		name: "Pixie Power",
		rating: 3,
	},
	/*
	mentalhealth: {
      shortDesc: "This Pokemon's Special Defense is boosted 1.5x in Psychic Terrain.",
		onModifySpDPriority: 6,
		onModifySpD(spd, pokemon) {
			if (this.field.isTerrain('psychicterrain')) return this.chainModify(1.5);
		},
		name: "Mental Health",
		rating: 0.5,
	},
	*/
	mentalhealth: {
      shortDesc: "If Psychic Terrain is active, this Pokemon heals 1/16 of its max HP at the end of the turn.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (this.field.isTerrain('psychicterrain')) {
					this.heal(pokemon.baseMaxhp / 16);
			}
		},
		name: "Mental Health",
		rating: 0.5,
	},
	powerspot: {
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (attacker !== this.effectData.target) {
				this.debug('Power Spot boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk) {
			return this.chainModify(1.3);
		},
		name: "Power Spot",
		rating: 1,
		num: 249,
	},
	rivalry: {
		onBasePowerPriority: 24,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.gender && defender.gender) {
				if (attacker.gender === defender.gender) {
					this.debug('Rivalry boost');
					return this.chainModify(1.25);
				}
			}
		},
		name: "Rivalry",
		rating: 0,
		num: 79,
	},
	/*
	breakthrough: {
		onModifyMovePriority: -1,
		onModifyMove(move, target) {
			if (move && target.getMoveHitData(move).typeMod < 0) {
				move.secondaries.push({
					chance: 100,
					boosts: {
						spe: -1,
					},
				});
			}
		},
		name: "Breakthrough",
		rating: 0.5,
	},
*/
	 sealaway: {
       shortDesc: "On switch-in, this Pokemon uses Imprison.",
       onStart(source) {
           this.useMove("Imprison", source);
       },
       name: "Seal Away",
       rating: 3,
    },
	honeygather: {
      shortDesc: "This Pokemon heals 1/8 of its max HP if it's holding Honey.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.hasItem('honey')) {
					this.heal(pokemon.baseMaxhp / 8);
			}
		},
		name: "Honey Gather",
		rating: 2,
		num: 118,
	},
	leafguard: {
      shortDesc: "If Sunny Day is active, this Pokemon heals its status at the end of the turn.",
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.status && ['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				this.debug('leafguard');
				this.add('-activate', pokemon, 'ability: Leaf Guard');
				pokemon.cureStatus();
			}
		},
		name: "Leaf Guard",
		rating: 1.5,
		num: 102,
	},
	heavymetal: {
      shortDesc: "This Pokemon's weight is doubled and its Rock-type moves deal 1.3x damage.",
		onModifyWeightPriority: 1,
		onModifyWeight(weighthg) {
			return weighthg * 2;
		},
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Rock') {
				return this.chainModify(1.3);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Rock') {
				return this.chainModify(1.3);
			}
		},
		name: "Heavy Metal",
		rating: 0,
		num: 134,
	},
	lightmetal: {
      shortDesc: "This Pokemon's weight is doubled and it takes 50% damage from Rock-type moves.",
		onModifyWeight(weighthg) {
			return this.trunc(weighthg / 2);
		},
		onSourceModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Rock') {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Rock') {
				return this.chainModify(0.5);
			}
		},
		name: "Light Metal",
		rating: 1,
		num: 135,
	},
	normalize: {
      shortDesc: "All of this Pokemon's moves are Normal-type and have doubled power.",
		onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (!(move.isZ && move.category !== 'Status') && !noModifyType.includes(move.id)) {
				move.type = 'Normal';
				move.normalizeBoosted = true;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.normalizeBoosted) return this.chainModify(2);
		},
		name: "Normalize",
		rating: 2,
		num: 96,
	},
	optimize: {
      shortDesc: "This Pokemon's super effective moves deal 1.2x damage.",
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify([0x1400, 0x1000]);
			}
		},
		name: "Optimize",
		rating: 2.5,
	},
	illuminate: {
      shortDesc: "This Pokemon's moves have their accuracy boosted 1.3x.",
		onSourceModifyAccuracyPriority: 9,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('illuminate - enhancing accuracy');
			return accuracy * 1.3;
		},
		name: "Illuminate",
		rating: 3,
		num: 35,
	},
	longshot: {
      shortDesc: "This Pokemon's long distance moves have their power boosted 1.3x.",
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['distance']) {
				this.debug('Long Shot boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		name: "Long Shot",
		rating: 3,
	},
	};
