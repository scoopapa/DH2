export const Abilities: {[k: string]: ModdedAbilityData} = {
	harvester: {
      shortDesc: "This Pokemon's Grass-type moves have their power boosted 1.5x.",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Grass') {
				this.debug('Harvester boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Grass') {
				this.debug('Harvester boost');
				return this.chainModify(1.5);
			}
		},
		name: "Harvester",
		rating: 3.5,
	},
   burningechoes: {
      shortDesc: "This Pokemon's Sound moves have a 20% chance to burn and have 1.2x power.",
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
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				return this.chainModify(1.2);
			}
		},
      name: "Burning Echoes",
   },
	cacophony: {
      shortDesc: "Boosts the power of sound moves by 1.3x.",
		onBasePowerPriority: 7,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				this.debug('Punk Rock boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		name: "Cacophony",
		rating: 3.5,
	},
	 shadowbeacon: {
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
		name: "Shadow Beacon",
	},	
	 energybeacon: {
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
		name: "Energy Beacon",
	},
	 solidify: {
		  shortDesc: "This Pokemon's Defense is boosted by 1.5x but its Speed is halved.",
		  onModifyDefPriority: 6,
		  onModifyDef(def) {
			  return this.chainModify(1.5);
		  },
		  onModifySpe(spe, pokemon) {
			  return this.chainModify(0.5);
		  },
        name: "Solidify",
	 },
	royalpresence: {
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
		name: "Royal Presence",
		rating: 2.5,
	},
    knightsblade: {
        shortDesc: "Boosts the power of sword, cut, slash, claw, and blade moves by 1.3x",
        onBasePowerPriority: 8,
        onBasePower(basePower, attacker, defender, move) {
            if (move.name === 'Psycho Cut' || move.name === 'Cut' || move.name === 'Slash' || move.name === 'Night Slash' || move.name === 'Solar Blade' || move.name === 'Leaf Blade' || move.name === 'X-Scissor' || move.name === 'Cross Poison' || move.name === 'Air Slash' || move.name === 'Air Cutter' || move.name === 'Fury Cutter' || move.name === 'Sacred Sword' || move.name === 'Secret Sword' || move.name === 'Razor Shell' || move.name === 'Behemoth Blade' || move.name === 'Aerial Ace' || move.name === 'Metal Claw' || move.name === 'Dragon Claw' || move.name === 'Shadow Claw' || move.name === 'Crush Claw' || move.name === 'False Swipe' || move.name === 'Scratch' || move.name === 'Smart Strike' || move.name === 'Behemoth Blade' || move.name === 'Secret Sword') {
                return this.chainModify(1.3);
            }
        },
        name: "Knight's Blade",
    },
    divinelight: {
        desc: "On switch-in, this Pokemon lowers the Attack and Sp. Attack of adjacent opposing Pokemon by 1 stage, regardless of the opponent's ability. Pokemon behind a substitute are immune.",
        shortDesc: "On switch-in, this Pokemon lowers the Attack and Sp. Attack of adjacent opponents by 1 stage; Ignores abilities.",
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
        name: "Divine Light",
    },
    mattersplitter: {
        desc: "On switch-in, this Pokemon lowers the Defense and Sp. Defense of adjacent opposing Pokemon by 1 stage, regardless of the opponent's ability. Pokemon behind a substitute are immune.",
        shortDesc: "On switch-in, this Pokemon lowers the Defense and Sp. Defense of adjacent opponents by 1 stage; Ignores abilities.",
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
        name: "Matter Splitter",
    },
    atomsmasher: {
        shortDesc: "This Pokemon's Special Attack is doubled.",
        onModifyAtkPriority: 5,
        onModifyAtk(spa) {
            return this.chainModify(2);
        },
        name: "Atom Smasher",
    },
	demotivate: {
		shortDesc: "On switch-in, this Pokemon lowers the Special Attack of adjacent opponents by 1 stage.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Demotivate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spa: -1}, target, pokemon, null, true);
				}
			}
		},
		name: "Demotivate",
		rating: 3.5,
	},
	innerfocus: {
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		onBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate') {
				delete boost.atk;
				this.add('-immune', target, '[from] ability: Inner Focus');
			}
			if (effect.id === 'demotivate') {
				delete boost.spa;
				this.add('-immune', target, '[from] ability: Inner Focus');
			}
		},
		name: "Inner Focus",
		rating: 1.5,
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
		onBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate') {
				delete boost.atk;
				this.add('-immune', target, '[from] ability: Oblivious');
			}
			if (effect.id === 'demotivate') {
				delete boost.spa;
				this.add('-immune', target, '[from] ability: Oblivious');
			}
		},
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
		onBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate') {
				delete boost.atk;
				this.add('-immune', target, '[from] ability: Own Tempo');
			}
			if (effect.id === 'demotivate') {
				delete boost.spa;
				this.add('-immune', target, '[from] ability: Own Tempo');
			}
		},
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
			if (effect && effect.id === 'intimidate' || effect.id === 'demotivate') {
				this.boost({spe: 1});
			}
		},
		name: "Rattled",
		rating: 1.5,
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
		onBoost(boost, target, source, effect) {
			if (effect.id === 'intimidate') {
				delete boost.atk;
				this.add('-immune', target, '[from] ability: Scrappy');
			}
			if (effect.id === 'demotivate') {
				delete boost.spa;
				this.add('-immune', target, '[from] ability: Scrappy');
			}
		},
		name: "Scrappy",
		rating: 3,
		num: 113,
	},
	watercompaction: {
		shortDesc: "This Pokemon's Defense goes up 1 stage when hit by a Water-type move; Water immunity",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({def: 1})) {
					this.add('-immune', target, '[from] ability: Water Compaction');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (target === this.effectData.target || target.side !== source.side) return;
			if (move.type === 'Water') {
				this.boost({def: 1}, this.effectData.target);
			}
		},
		name: "Water Compaction",
		rating: 3,
		num: 195,
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
	mentalhealth: {
      shortDesc: "If Psychic Terrain is active, this Pokemon heals 1/12 of its max HP at the end of the turn.",
		onResidualOrder: 26,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (this.field.isTerrain('psychicterrain')) {
					this.heal(pokemon.baseMaxhp / 12);
			}
		},
		name: "Mental Health",
		rating: 0.5,
	},
	powerspot: {
      shortDesc: "This Pokemon and its allies have the power of their moves multiplied by 1.3",
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
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.chainModify(1.3);
		},
		name: "Power Spot",
		rating: 1,
		num: 249,
	},
	normalize: {
      shortDesc: "All of this Pokemon's moves are Normal-type and have doubled power.",
		onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'terrainpulse', 'weatherball', 'adaptableattack',
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
		rating: 4,
		num: 96,
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
	 sealaway: {
       shortDesc: "On switch-in, this Pokemon uses Imprison.",
       onStart(source) {
           this.useMove("Imprison", source);
       },
       name: "Seal Away",
       rating: 3,
    },
	asoneglastrier: {
      shortDesc: "The combined effects of Unnerve, Harvester, and Chilling Neigh.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add('-ability', pokemon, 'Unnerve', pokemon.side.foe);
		},
		onFoeTryEatItem: false,
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({atk: length}, source, source, this.dex.getAbility('chillingneigh'));
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Grass') {
				this.debug('Harvester boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Grass') {
				this.debug('Harvester boost');
				return this.chainModify(1.5);
			}
		},
		isPermanent: true,
		name: "As One (Glastrier)",
		rating: 3.5,
		num: 266,
	},
	asonespectrier: {
      shortDesc: "The combined effects of Unnerve, Harvester, and Grim Neigh.",
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add('-ability', pokemon, 'Unnerve', pokemon.side.foe);
		},
		onFoeTryEatItem: false,
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({spa: length}, source, source, this.dex.getAbility('grimneigh'));
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Grass') {
				this.debug('Harvester boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Grass') {
				this.debug('Harvester boost');
				return this.chainModify(1.5);
			}
		},
		isPermanent: true,
		name: "As One (Spectrier)",
		rating: 3.5,
		num: 267,
	},
	dragonsmaw: {
      shortDesc: "This Pokemon's biting moves become Dragon-type and have 1.2x power.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.flags['bite'] && !pokemon.volatiles['dynamax']) { // hardcode
				move.type = 'Dragon';
			}
		},
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bite']) {
				return this.chainModify(1.2);
			}
		},
		name: "Dragon's Maw",
		rating: 3.5,
		num: 263,
	},
	transistor: {
      shortDesc: "This Pokemon's bullet moves become Electric-type and have 1.2x power.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.flags['bullet'] && !pokemon.volatiles['dynamax']) { // hardcode
				move.type = 'Electric';
			}
		},
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bullet']) {
				return this.chainModify(1.2);
			}
		},
		name: "Transistor",
		rating: 3.5,
		num: 262,
	},
	flareboost: {
      shortDesc: "When burned, this Pokemon's SpA is boosted 1.5x and heals 1/16 of its max HP per turn.",
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.status === 'brn' && move.category === 'Special') {
				return this.chainModify(1.5);
			}
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'brn') {
				this.heal(target.baseMaxhp / 16);
				return false;
			}
		},
		name: "Flare Boost",
		rating: 5,
		num: 138,
	},
	toxicboost: {
      shortDesc: "When poisoned, this Pokemon's Atk is boosted 1.5x and heals 1/16 of its max HP per turn.",
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if ((attacker.status === 'psn' || attacker.status === 'tox') && move.category === 'Physical') {
				return this.chainModify(1.5);
			}
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'psn' || effect.id === 'tox') {
				this.heal(target.baseMaxhp / 16);
				return false;
			}
		},
		name: "Toxic Boost",
		rating: 5,
		num: 137,
	},
	anticipation: {
      shortDesc: "This Pokemon takes 75% damage from super effective moves and shudders on switch-in if the opposing Pokemon has one",
		onStart(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (!target || target.fainted) continue;
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.getMove(moveSlot.move);
					if (move.category === 'Status') continue;
					const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
					if (
						this.dex.getImmunity(moveType, pokemon) && this.dex.getEffectiveness(moveType, pokemon) > 0 ||
						move.ohko
					) {
						this.add('-ability', pokemon, 'Anticipation');
						return;
					}
				}
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Anticipation neutralize');
				return this.chainModify(0.75);
			}
		},	
		name: "Anticipation",
		rating: 2.5,
		num: 107,
	},
	forecast: {
		onUpdate(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Castform' || pokemon.transformed) return;
			let forme = null;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				if (pokemon.species.id !== 'castformsunny') forme = 'Castform-Sunny';
				break;
			case 'raindance':
			case 'primordialsea':
				if (pokemon.species.id !== 'castformrainy') forme = 'Castform-Rainy';
				break;
			case 'hail':
				if (pokemon.species.id !== 'castformsnowy') forme = 'Castform-Snowy';
				break;
			case 'sandstorm':
				if (pokemon.species.id !== 'castformsandy') forme = 'Castform-Sandy';
				break;
			default:
				if (pokemon.species.id !== 'castform') forme = 'Castform';
				break;
			}
			if (pokemon.isActive && forme) {
				pokemon.formeChange(forme, this.effect, false, '[msg]');
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (['sunnyday', 'desolateland', 'hail', 'raindance', 'primordialsea', 'sandstorm', 'deltastream'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onModifySpePriority: 5,
		onModifySpe(spe, pokemon) {
			if (['sunnyday', 'desolateland', 'hail', 'raindance', 'primordialsea', 'sandstorm', 'deltastream'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		name: "Forecast",
		rating: 2,
		num: 59,
	},
	liquidvoice: {
      shortDesc: "This Pokemon's sound moves become Water-type and have 1.2x power.",
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.flags['sound'] && !pokemon.volatiles['dynamax']) { // hardcode
				move.type = 'Water';
			}
		},
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				return this.chainModify(1.2);
			}
		},
		name: "Liquid Voice",
		rating: 3.5,
		num: 204,
	},
	galewings: {
      shortDesc: "This Pokemon's Flying-type moves have +1 priority when this Pokemon is above 50% HP.",
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.type === 'Flying' && pokemon.hp >= pokemon.maxhp / 2) return priority + 1;
		},
		name: "Gale Wings",
		rating: 3,
		num: 177,
	},
	/*
	zenmode: {
      shortDesc: "This Pokemon enters Zen Mode on switch-in",
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Darmanitan' || pokemon.transformed) return;
			if (pokemon.species.forme !== 'Zen') {
					pokemon.formeChange('Darmanitan-Zen');
				}
			 else {
				if (pokemon.species.forme === 'Zen') {
					pokemon.formeChange(pokemon.set.species);
				}
			}
		},
		isPermanent: true,
		name: "Zen Mode",
		rating: 0,
		num: 161,
	},

	iceface: {
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (
				effect && effect.effectType === 'Move' &&
				['eiscue'].includes(target.species.id) && !target.transformed
			) {
				this.add('-activate', target, 'ability: Ice Face');
				this.effectData.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (!['eiscue'].includes(target.species.id) || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (!['eiscue'].includes(target.species.id) || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['authentic'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (['eiscue'].includes(pokemon.species.id) && this.effectData.busted) {
				const speciesid = pokemon.species.id === 'eiscue' : 'Eiscue-Noice';
				pokemon.formeChange(speciesid, this.effect, true);
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon, this.dex.getSpecies(speciesid));
			}
		},
		isPermanent: true,
		name: "Ice Face",
		rating: 3.5,
		num: 248,
	},
*/
	elementalteething: {
      shortDesc: "This Pokemon's type changes before using a move and its biting moves are boosted 1.2x.",
		onPrepareHit(source, target, move) {
			if (move.hasBounced) return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Elemental Teething');
			}
		},
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bite']) {
				return this.chainModify(1.2);
			}
		},
		name: "Elemental Teething",
		rating: 4.5,
	},
	shadowtag: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['contact'] && !source.hasType('Ghost') && source.addType('Ghost')) {
				this.add('-start', source, 'typeadd', 'Ghost', '[from] ability: Shadow Tag');
			}
		},
		name: "Shadow Tag",
		rating: 3,
		num: 23,
		shortDesc: "Pokémon that make contact with this Pokémon have the Ghost-type added to their existing typings until they switch out (Trick-or-Treat effect).",
	},
	nostalgiatrip: {
      shortDesc: "This Pokemon's moves have the damage categories they would have in Gen 3. Fairy-type moves become Normal-type.",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Nostalgia Trip');
			this.add('-message', `This Pokemon is experiencing a nostalgia trip!`);
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.type === 'Fairy' && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Normal';
			}
		},
		onModifyMovePriority: 8,
		onModifyMove(move, pokemon) {
			if ((move.type === 'Fire' || move.type === 'Water' || move.type === 'Grass' || move.type === 'Electric' || move.type === 'Dark' || move.type === 'Psychic' || move.type === 'Dragon')  && move.category === 'Physical') move.category = 'Special';
			if ((move.type === 'Normal' || move.type === 'Fighting' || move.type === 'Flying' || move.type === 'Ground' || move.type === 'Rock' || move.type === 'Bug' || move.type === 'Ghost' || move.type === 'Poison' || move.type === 'Steel')  && move.category === 'Special') move.category = 'Physical';
		},
		name: "Nostalgia Trip",
		rating: 4,
	},
	maximumpotential: {
      shortDesc: "This Pokemon is immune to the same moves Dynamax Pokemon are immune to.",
		onTryHit(pokemon, target, move) {
         if (move.name === 'Knock Off' || move.name === 'Low Kick' || move.name === 'Heat Crash' || move.name === 'Grass Knot' || move.name === 'Heavy Slam' || move.name === 'Pluck' || move.name === 'Bug Bite' || move.name === 'Incinerate' || move.name === 'Thief' || move.name === 'Covet' || move.name === 'Horn Drill' || move.name === 'Sheer Cold' || move.name === 'Guillotine' || move.name === 'Fissure' || move.name === 'Sky Drop' || move.name === 'Skill Swap' || move.name === 'Entrainment') {
				this.add('-immune', pokemon, '[from] ability: Maximum Potential');
				return null;
			}
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch' || status.id === 'disable') return null;
		},
		onDragOutPriority: 1,
		onDragOut(pokemon) {
			this.add('-activate', pokemon, 'ability: Maximum Potential');
			return null;
		},
		name: "Maximum Potential",
		rating: 3,
	},
};
