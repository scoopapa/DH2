export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	deeznuts: {
		name: "Deez NUts",
		spritenum: 292,
		fling: {
			basePower: 200,
			effect(target) {
				this.heal(target.baseMaxhp);
			},
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.species.bst <= 280 || ['Inkay', 'Richard Petty'].includes(pokemon.baseSpecies.baseSpecies)) {
				return this.chainModify(2);
			}
		},
		onModifyDefPriority: 1,
		onModifyDef(def, pokemon) {
			if (pokemon.species.bst <= 280 || ['Inkay', 'Richard Petty'].includes(pokemon.baseSpecies.baseSpecies)) {
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.species.bst <= 280 || ['Inkay', 'Richard Petty'].includes(pokemon.baseSpecies.baseSpecies)) {
				return this.chainModify(2);
			}
		},
		onModifySpDPriority: 1,
		onModifySpD(spd, pokemon) {
			if (pokemon.species.bst <= 280 || ['Inkay', 'Richard Petty'].includes(pokemon.baseSpecies.baseSpecies)) {
				return this.chainModify(2);
			}
		},
		onModifySpePriority: 1,
		onModifySpe(spe, pokemon) {
			if (pokemon.species.bst <= 280 || ['Inkay'].includes(pokemon.baseSpecies.baseSpecies)) {
				return this.chainModify(2);
			}
		},
		shortDesc: "This Pokemon's stats are doubled if their BST is 280 or less, or Inkay/Richard Petty.",
		rating: 3,
	},
	newtonsapple: {
		name: "Newton's Apple",
		shortDesc: "Extends Gravity by 3 turns.",
		spritenum: 711,
		fling: {
			basePower: 20,
		},
		num: -2,
		rating: 3,
	},
	madnesshelmet: {
		name: "Madness Helmet",
		shortDesc: "Holder's attacks have 1.3x power, but it can't use moves twice in a row.",
		fling: {
      basePower: 60,
      volatileStatus: 'torment',
    },
		onStart(pokemon) {
			pokemon.addVolatile('madnesshelmet');
		},
		onModifyDamage(damage, source, target, move) {
			return this.chainModify([5324, 4096]);
		},
		condition: {
			noCopy: true,
			onDisableMove(pokemon) {
				if (pokemon.lastMove && pokemon.lastMove.id !== 'struggle') pokemon.disableMove(pokemon.lastMove.id);
			},
		},
	},
	delibirdite: {
		name: "Delibirdite",
		spritenum: 578,
		megaStone: "Delibird-Mega",
		megaEvolves: "Delibird",
		itemUser: ["Delibird"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -1067,
		gen: 8,
		desc: "If held by a Delibird, this item allows it to Mega Evolve in battle.",
	},
	wishingstone: { 
		name: "Wishing Stone",
		spritenum: 22,
		onTakeItem: false,
		zMove: true,
		onSwitchIn(pokemon) {
			if (pokemon.side.sideConditions['dynamaxused']) {
				pokemon.side.dynamaxUsed = true;
			} else {
				pokemon.side.dynamaxUsed = false;				
			}
			if (pokemon.gigantamax && pokemon.side.sideConditions['gmaxused']) {
				pokemon.addVolatile('dynamax');
			}
		},
		onSwitchOut(pokemon) {
			pokemon.side.dynamaxUsed = true;
		},
		onFaint(pokemon) {
			pokemon.side.dynamaxUsed = true;
		},
		num: -1000,
		gen: 9,
		desc: "Allows this the holder to Dynamax.",
		rating: 3,
		itemUser: [
			"Venusaur-Gmax", "Charizard-Gmax", "Blastoise-Gmax", "Butterfree-Gmax", "Pikachu-Gmax", "Meowth-Gmax", "Machamp-Gmax", "Gengar-Gmax", "Kingler-Gmax", "Lapras-Gmax", 
			"Eevee-Gmax", "Snorlax-Gmax", "Garbodor-Gmax", "Melmetal-Gmax", "Rillaboom-Gmax", "Cinderace-Gmax", "Inteleon-Gmax", "Corviknight-Gmax", "Orbeetle-Gmax", "Drednaw-Gmax", 
			"Coalossal-Gmax", "Flapple-Gmax", "Appletun-Gmax", "Sandaconda-Gmax", "Centiskorch-Gmax", "Toxtricity-Gmax", "Toxtricity-Low-Key-Gmax", "Hatterene-Gmax", "Grimmsnarl-Gmax", 
			"Alcremie-Gmax", "Copperajah-Gmax", "Duraludon-Gmax", "Urshifu-Gmax", "Urshifu-Rapid-Strike-Gmax"
		],
	},
	aguavberry: {
		inherit: true,
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 2);
			if (pokemon.getNature().minus === 'spd') {
				pokemon.addVolatile('confusion');
			}
		},
		shortDesc: "Restores 1/2 max HP at 1/4 max HP or less; confuses if -SpD Nature. Single use.",
	},
	figyberry: {
		inherit: true,
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 2);
			if (pokemon.getNature().minus === 'atk') {
				pokemon.addVolatile('confusion');
			}
		},
		shortDesc: "Restores 1/2 max HP at 1/4 max HP or less; confuses if -Atk Nature. Single use.",
	},
	iapapaberry: {
		inherit: true,
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 2);
			if (pokemon.getNature().minus === 'def') {
				pokemon.addVolatile('confusion');
			}
		},
		shortDesc: "Restores 1/2 max HP at 1/4 max HP or less; confuses if -Def Nature. Single use.",
	},
	magoberry: {
		inherit: true,
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 2);
			if (pokemon.getNature().minus === 'spe') {
				pokemon.addVolatile('confusion');
			}
		},
		shortDesc: "Restores 1/2 max HP at 1/4 max HP or less; confuses if -Spe Nature. Single use.",
	},
	wikiberry: {
		inherit: true,
		isNonstandard: null,
		onEat(pokemon) {
			this.heal(pokemon.baseMaxhp / 2);
			if (pokemon.getNature().minus === 'spa') {
				pokemon.addVolatile('confusion');
			}
		},
		shortDesc: "Restores 1/2 max HP at 1/4 max HP or less; confuses if -SpA Nature. Single use.",
	},
	covertcloak: {
		inherit: true,
		shortDesc: "Holder nullifies all secondary effects of another Pokemon's attack.",
		onTakeItem: false,
		onModifySecondaries(secondaries) {
			return secondaries.filter(effect => !!effect.cloak);
		},
		rating: 3,
	},
	adamantorb: {
		name: "Adamant Orb",
		spritenum: 4,
		fling: {
			basePower: 60,
		},
		itemUser: ["Dialga"],
		num: 135,
		gen: 4,
		shortDesc: "When this Pokemon sets Trick Room, it lasts for 8 turns instead of 5.",
	},
	brokenhourglass: {
	    name: "Broken Hourglass",
	    shortDesc: "Future moves land instantly at 1.3x power. Single use.",
	    spritenum: -3,
	    onModifyMovePriority: 1,
	    onModifyMove(move, pokemon, target) {
	        if (move.flags.futuremove) {
	            move.onTry = undefined;
	        }
	        if (move.id === 'wish') {
	            move.slotCondition = undefined;
	            move.condition = {};
	        }
	    },
	    onTryMovePriority: -1,
	    onTryMove(source, target, move) {
	        if (move.id === 'wish'  && source.hp != source.baseMaxhp && source.useItem()) {
	            this.heal(source.baseMaxhp *1.3/2, source, source)
	        }
	        if (move.id === 'wish' && source.hp === source.baseMaxhp) {
	            this.add('-fail', source, 'move: Wish');
	            this.attrLastMove('[still]');
	            return null;
	        }
	    },
	    onBasePower(basePower, source, target, move) {
	        if (move.flags.futuremove && move.category != 'Status' && source.useItem()) {
	            return this.chainModify(1.3)
	        }
	    },
	    fling: {
	        basePower: 30,
	        effect(pokemon) {
	            let activate = false;
	            const boosts: SparseBoostsTable = {};
	            let i: BoostID;
	            for (i in pokemon.boosts) {
	                    activate = true;
	                    boosts[i] = 0;
	            }
	            if (activate) {
	                pokemon.setBoost(boosts);
	                this.add('-clearboost', pokemon, '[silent]');
	            }
	        },
	    },
	    num: 0,
	},
	garganaclplushie: {
		name: "Garganacl Plushie",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onSetStatus(status, target, source, effect) {
			if (target.hasType('Rock') && (effect as Move)?.status) {
				this.add('-immune', target, '[from] item: Garganacl Plushie');
			}
			return false;
		},
  		onTryAddVolatile(status, target) {
			if (target.hasType('Rock') && status.id === 'yawn') {
				this.add('-immune', target, '[from] item: Garganacl Plushie');
				return null;
			}
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (defender.hasType('Rock') && move.type === 'Ghost') {
				this.debug('Garganacl Plushie weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(spa, attacker, defender, move) {
			if (defender.hasType('Rock') && move.type === 'Ghost') {
				this.debug('Garganacl Plushie weaken');
				return this.chainModify(0.5);
			}
		},
		num: -1008,
		desc: "Rock-types: Takes 50% damage from Ghost-type moves, status immunity.",
		gen: 9,
		rating: 3,
	},
	utilityumbrella: {
		inherit: true,
		desc: "The holder ignores rain- and sun-based effects. Damage and accuracy calculations from attacks used by the holder are affected by rain and sun, but not attacks used against the holder. The holder takes 3/4 damage and ignores secondary effects while in weathers or terrains.",
		shortDesc: "Ignores weather; 3/4 damage and ignore secondary effects under weather/terrain.",
		rating: 3,
		onSourceModifyDamage(damage, source, target, move) {
			if (this.field.isWeather() || this.field.isTerrain()) {
				this.debug('Utility Umbrella neutralize');
				return this.chainModify(0.75);
			}
		},
		onModifySecondaries(secondaries) {
			if (this.field.isWeather() || this.field.isTerrain()) {
				this.debug('Utility Umbrella prevent secondary');
				return secondaries.filter(effect => !!(effect.self || effect.dustproof));
			}
		},
	},
	stellariumz: {
		name: "Stellarium Z",
		shortDesc: "If holder has an attacking move, this item allows it to use a Stellar Z-Move.",
		spritenum: 633,
		onMemory: 'Stellar',
		onTakeItem: false,
		zMove: true,
		zMoveType: "Stellar",
		rating: 3,
	},
	boosterenergy: {
		name: "Booster Energy",
		onUpdate(pokemon) {
			if (pokemon.transformed) return;
			if (this.queue.peek(true)?.choice === 'runSwitch') return;
			if (pokemon.hasAbility('protosynthesis') && !pokemon.volatiles['protosynthesis'] && !this.field.isWeather('sunnyday') && pokemon.useItem()) {
				pokemon.addVolatile('protosynthesis');
			}
			if (pokemon.hasAbility('protostasis') && !pokemon.volatiles['protostasis'] && !this.field.isWeather('snow') && pokemon.useItem()) {
				pokemon.addVolatile('protostasis');
			}
			if (pokemon.hasAbility('quarkdrive') && !pokemon.volatiles['quarkdrive'] && !this.field.isTerrain('electricterrain') && pokemon.useItem()) {
				pokemon.addVolatile('quarkdrive');
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.tags.includes("Paradox")) return false;
			return true;
		},
		num: 1880,
		desc: "Activates the Paradox Abilities. Single use.",
		gen: 9,
	},
	blastoisinite: {
		inherit: true,
		isNonstandard: null,
	},
};
