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
		itemUser: ["Flittle"],
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
			if (pokemon.side.sideConditions['dynamaxused'] && ['Centiskorch', 'Garbodor'].includes(pokemon.baseSpecies.baseSpecies)) {
				pokemon.side.dynamaxUsed = true;
			} else {
				pokemon.side.dynamaxUsed = false;				
			}
			if (pokemon.gigantamax && pokemon.side.sideConditions['gmaxused'] && ['Centiskorch', 'Garbodor'].includes(pokemon.baseSpecies.baseSpecies)) {
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
				if (move.id === '5bigdooms') {
					move.multihit = 5;
				}
	        }
	        if (move.id === 'wish') {
	            move.slotCondition = undefined;
	            move.condition = {};
	        }
	    },
	    onTryMovePriority: -1,
	    onTryMove(source, target, move) {
			if (move.id === 'wish') {
				if (source.hp === source.baseMaxhp) {
					this.add('-fail', source, 'move: Wish');
					this.attrLastMove('[still]');
					return null;
				}
				if (source.useItem()) {
					this.heal(source.baseMaxhp * 0.7, source, source)
				}
			}
	    },
	    onBasePower(basePower, source, target, move) {
	        if (move.flags.futuremove && move.category != 'Status' && source.useItem()) {
	            return this.chainModify([5325, 4096])
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
	gyaradosite: null,
 	hyperpotion: {
		name: "Hyper Potion",
		spritenum: 713,
		fling: {
			basePower: 30,
		},
		onDamagingHit(damage, target, source, move) {
			const bp = move.basePower;
			if (bp >= 100) {
			 this.heal(120);
			  target.useItem();
			}
		},
		num: -1000,
		gen: 2,
		desc: "Holder heals 120 HP after being hit by a 100+ BP move.",
	},
	sugarbag: {
		onStart(pokemon) {
			this.add('-item', pokemon, 'Sugar Bag');
			this.hint("Sugar Bag!");
		},
		onModifySpe(spe, pokemon) {
			if (!(pokemon.activeMoveActions > 1)) {
				return this.chainModify(1.5);
			}
		},
		name: "Sugar Bag",
		fling: {
			basePower: 30,
		},
		desc: "Holder's Speed is 1.5x the first turn it comes in.",
		num: -1,
		gen: 4,
	},
	babiriberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('babiriberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Steel' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['babiriberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('babiriberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Steel-type attack. Once per switch-in.",
	},
	chartiberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('chartiberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Rock' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['chartiberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('chartiberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Rock-type attack. Once per switch-in.",
	},
	chilanberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('chilanberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (
				move.type === 'Normal' &&
				(!target.volatiles['substitute'] || move.flags['bypasssub'] || (move.infiltrates && this.gen >= 6))
			) {
				if (target.volatiles['chilanberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('chilanberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a Normal-type attack. Once per switch-in.",
	},
	chopleberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('chopleberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fighting' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['chopleberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('chopleberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Fighting-type attack. Once per switch-in.",
	},
	colburberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('colburberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Dark' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['colburberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('colburberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Dark-type attack. Once per switch-in.",
	},
	habanberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('habanberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Dragon' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['habanberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('habanberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Dragon-type attack. Once per switch-in.",
	},
	kasibberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('kasibberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ghost' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['kasibberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('kasibberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Ghost-type attack. Once per switch-in.",
	},
	kebiaberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('kebiaberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Poison' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['kebiaberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('kebiaberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Poison-type attack. Once per switch-in.",
	},
	occaberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('occaberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fire' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['occaberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('occaberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Fire-type attack. Once per switch-in.",
	},
	passhoberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('passhoberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Water' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['passhoberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('passhoberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Water-type attack. Once per switch-in.",
	},
	payapaberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('payapaberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Psychic' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['payapaberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('payapaberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Psychic-type attack. Once per switch-in.",
	},
	rindoberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('rindoberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Grass' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['rindoberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('rindoberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Grass-type attack. Once per switch-in.",
	},
	roseliberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('roseliberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fairy' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['roseliberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('roseliberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Fairy-type attack. Once per switch-in.",
	},
	shucaberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('shucaberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ground' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['shucaberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('shucaberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Ground-type attack. Once per switch-in.",
	},
	tangaberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('tangaberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Bug' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['tangaberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('tangaberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Bug-type attack. Once per switch-in.",
	},
	wacanberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('wacanberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Electric' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;
				if (target.volatiles['wacanberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('wacanberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Electric-type attack. Once per switch-in.",
	},
	yacheberry: {
		inherit: true,
		onStart(pokemon) {
			pokemon.addVolatile('yacheberry');
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ice' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.volatiles['yacheberry']) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					target.removeVolatile('yacheberry');
					return this.chainModify(0.5);
				}
			}
		},
		shortDesc: "Halves damage taken from a supereffective Ice-type attack. Once per switch-in.",
	},
	airfreshener: {
		name: "Air Freshener",
		spritenum: 713,
		fling: {
			basePower: 30,
		},
		onSwitchOut(pokemon) {
			pokemon.cureStatus();
		},
		// effect coded into the moves themselves
		desc: "Holder's wind-based attacks heal the party's status. Heals holder's status on switch-out.",
		num: -1009,
		gen: 9,
		rating: 3,
	},
	grassgem: {
		name: "Grass Gem",
		spritenum: 172,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status' || move.flags['pledgecombo']) return;
			if (move.type === 'Grass' && source.baseSpecies.baseSpecies === 'Iron Leaves' && source.useItem()) {
				source.addVolatile('gem');
        		if (source.baseSpecies.baseSpecies === 'Iron Leaves') {
				  source.addVolatile('grassgem');
        		}
			}
		},
		onStart(pokemon) {
			pokemon.canTerastallize = null;
		},
		itemUser: ["Iron Leaves"],
		num: 551,
		gen: 5,
		isNonstandard: null,
		desc: "Iron Leaves: Holder's first successful Grass-type attack will have 1.3x power. Single use.",
	},
	zamazentacrownedplushie: {
		name: "Zamazenta-Crowned Plushie",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onStart(pokemon) {
			this.boost({def: 1}, pokemon);
			pokemon.addVolatile('zamazentacrownedplushie');
			this.add('-message', `${pokemon.name} has its shield up!`);
		},
		condition: {
			duration: 2,
			onEnd(pokemon) {
				this.add('-item', pokemon, 'Zamazenta-Crowned Plushie');
				this.add('-message', `${pokemon.name} lowered its shield!`);
				this.boost({def: -1}, pokemon);
			},
		},
		num: -1019,
		desc: "+1 Defense on switch-in. Boost goes away at the end of the next turn.",
		gen: 9,
		rating: 3,
	},
	baseballbat: {
		name: "Baseball Bat",
		spritenum: 465,
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				this.debug('Baseball Bat boost');
				return this.chainModify([4915, 4096]);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.flags['bullet']) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;
				
				if (target.useItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
					this.add('-message', `${pokemon.name} tried to hit the ball back, but its Baseball Bat broke!`);
				}
			}
		},
		desc: "Holder's contact moves have 1.2x power. If hit by a bullet move, it deals 50% damage and the item breaks.",
		num: -1007,
		gen: 9,
		rating: 3,
	},
	handmirror: {
		name: "Hand Mirror",
		spritenum: 747,
		fling: {
			basePower: 30,
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.hasType(source.getTypes())) {
				return this.chainModify(0.66);
			}
		},
		num: -1035,
		gen: 8,
		desc: "Holder takes 2/3 damage from foes that share a type.",
		rating: 3,
	},
	sandclock: {
		name: "Sand Clock",
		spritenum: 453,
		fling: {
			basePower: 30,
		},
		onModifySpDPriority: 1,
		onModifySpD(spd, pokemon) {
			if (pokemon.hasType('Rock')) {
				return this.chainModify(1.5);
			}
		},
		num: -1033,
		gen: 8,
		desc: "If the holder is a Rock-type, its SpD is boosted 1.5x.",
		rating: 3,
	},
	terashard: {
		name: "Tera Shard",
		spritenum: 658,
		onTakeItem: false,
		onStart(pokemon) {
			if (['Clodsire'].includes(pokemon.baseSpecies.baseSpecies)) {
	  			if (pokemon.side.sideConditions['teraused']) {
	  				pokemon.canTerastallize = null;
	  			} else {
	        		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
	  			}
      	}
		},
		itemUser: ["Clodsire"],
		num: -1001,
		gen: 9,
		desc: "Allows certain Pokemon to Terastallize.",
    	rating: 3,
	},
	pokeball: {
		name: "Poke Ball",
		spritenum: 345,
		onTakeItem: false,
		onStart(pokemon) {
			if (['Clodsire'].includes(pokemon.baseSpecies.baseSpecies)) {
	  			if (pokemon.side.sideConditions['teraused']) {
	  				pokemon.canTerastallize = null;
	  			} else {
	        		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
	  			}
      	}
		},
		num: 4,
		gen: 1,
		isPokeball: true,
		desc: "Allows certain Pokemon to Terastallize.",
    	rating: 3,
	},
	skeledite: { 
		name: "Skeledite",
		spritenum: 578,
		megaStone: "Skeledirge-Mega",
		megaEvolves: "Skeledirge",
		itemUser: ["Skeledirge"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: -2038,
		gen: 9,
		desc: "If held by a Skeledirge, this item allows it to Mega Evolve in battle.",
	},
	dragapultplushie: {
		name: "Dragapult Plushie",
		spritenum: 2,
		fling: {
			basePower: 30,
		},
		onPrepareHit(source, target, move) {
			if (
				move.type === 'Dragon' && !move.multihit && !move.flags['noparentalbond'] && !move.flags['charge'] &&
				!move.flags['futuremove'] && !move.spreadHit && !move.isZ && !move.isMax && move.category !== 'Status'
			) {
				move.multihit = 2;
				move.multihitType = 'parentalbond';
      	}
		},
		num: -1002,
		desc: "This Pokemon's Dragon-type moves hit a second time at 0.25x power.",
		gen: 9,
		rating: 3,
	},
	quickclaw: {
		name: "Quick Claw",
		spritenum: 373,
		fling: {
			basePower: 20,
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move?.priority > 0.1) {
				this.debug('Quick Claw boost');
				return this.chainModify([5324, 4096]);
			}
		},
		onModifyMovePriority: 1,
		onModifyMove(move) {
			if (move?.priority > 0.1) delete move.flags['contact'];
		},
		desc: "Holder's priority attacks have 1.3x power and do not make contact.",
		num: 217,
		gen: 2,
		rating: 3,
	},
	zinogrite: {
		name: "Zinogrite",
		gen: 9,
		shortDesc: "If held by Zinogre, allows it to transform into Thunderlord. (Mega-Evolution)",
		megaStone: "Thunderlord Zinogre",
		megaEvolves: "Zinogre",
		itemUser: ["Zinogre", "Thunderlord Zinogre"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		spritenum: 590,
	},
	armoredmask: {
		name: "Armored Mask",
		spritenum: 758,
		fling: {
			basePower: 60,
		},
		onStart(pokemon) {
			if (pokemon.side.sideConditions['teraused']) {
				pokemon.canTerastallize = null;
			} else {
      		pokemon.canTerastallize = this.actions.canTerastallize(pokemon);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Chesnaught') return false;
			return true;
		},
		forcedForme: "Chesnaught-Armored",
		itemUser: ["Chesnaught-Armored"],
		num: -1004,
		gen: 9,
		desc: "Chesnaught-Armored: Terastallize to gain Heatproof.",
	},
	shedshell: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && this.activeMove.id === 'pursuit') {
				this.add('-immune', target, '[from] item: Shed Shell');
				return null;
			}
		},
		shortDesc: "Holder may switch out when trapped, even by Ingrain or Pursuit.",
		rating: 3,
	},
	honey: {
		name: "Honey",
		spritenum: 22, // Replace with the correct sprite number
		fling: {
			basePower: 30,
		},
		onResidualOrder: 26, // Executes at the end of the turn
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (
				pokemon.hasType('Bug') || 
				pokemon.hasAbility('honeygather')
			) {
				if (pokemon.useItem()) {
					const bestStat = pokemon.getBestStat(false, true);
					this.boost({ [bestStat]: 1 }, pokemon);
				}
			}
		},
		num: -1000, // It doesn't seem like Honey item is on DH.. So, it's technically considered a new item here, I guess...
		gen: 9,
		desc: "At the end of turn, boosts Bug's best stat. Consumable.",
	},
	costarmask: {
		name: "Costar Mask",
		spritenum: 760,
		fling: {
			basePower: 60,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (user.baseSpecies.name.startsWith('Ogerpon-Costar')) {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, source) {
			if (source.baseSpecies.baseSpecies === 'Ogerpon') return false;
			return true;
		},
		forcedForme: "Ogerpon-Costar",
		itemUser: ["Ogerpon-Costar"],
		shortDesc: "If this Pokemon is Ogerpon-Costar, its attacks have 1.2x power.",
		num: 2408,
		gen: 9,
	},
	punchingglove: {
		name: "Punching Glove",
		spritenum: 0, // TODO
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Punching Glove boost');
				return this.chainModify([5324, 4096]);
			}
		},
		onModifyMovePriority: 1,
		onModifyMove(move) {
			if (move.flags['punch']) delete move.flags['contact'];
		},
		desc: "Holder's punch-based attacks have 1.3x power and do not make contact.",
		num: 1884,
		gen: 9,
	},
	razorclaw: {
		name: "Razor Claw",
		spritenum: 382,
		fling: {
			basePower: 80,
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['slicing']) {
				this.debug('Razor Claw boost');
				return this.chainModify([5324, 4096]);
			}
		},
		onModifyMovePriority: 1,
		onModifyMove(move) {
			if (move.flags['slicing']) delete move.flags['contact'];
		},
		desc: "Holder's slicing-based attacks have 1.3x power and do not make contact.",
		num: 326,
		gen: 4,
	},
	razorfang: {
		name: "Razor Fang",
		spritenum: 383,
		fling: {
			basePower: 30,
			volatileStatus: 'flinch',
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bite']) {
				this.debug('Razor Fang boost');
				return this.chainModify([5324, 4096]);
			}
		},
		onModifyMovePriority: 1,
		onModifyMove(move) {
			if (move.flags['bite']) delete move.flags['contact'];
		},
		desc: "Holder's biting-based attacks have 1.3x power and do not make contact.",
		num: 327,
		gen: 4,
		isNonstandard: null,
	},
	lifeinsurance: {
		name: "Life Insurance",
		// consumable: true,
		shortDesc: "When holder faints, replacement healed for 1/4 holder's HP, status cured.",
		spritenum: 609,
		fling: {
			basePower: 30,
			effect(target, source) {
				this.heal(source.baseMaxhp / 4);
				target.clearStatus();
			},
		},
		onFaint(pokemon) {
			pokemon.useItem();
			pokemon.side.lifeinsurance = pokemon.maxhp / 4;
			pokemon.side.addSlotCondition(pokemon, 'lifeinsurance');
		},
		condition: {
			onSwap(target) {
				if (!target.fainted && (target.hp < target.maxhp || target.status)) {
					target.heal(target.side.lifeinsurance);
					target.clearStatus();
					this.add('-heal', target, this.effectState.hp, '[from] item: Life Insurance');
					target.side.removeSlotCondition(target, 'lifeinsurance');
				}
			},
		},
	},
};
