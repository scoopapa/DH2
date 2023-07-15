const rollMoves = [
	'rollout', 'iceball',
];
import { consoleips } from "../../../config/config-example";

export const Abilities: {[abilityid: string]: ModdedAbilityData} = {
	advking: {
		onStart(source) {
			this.field.setWeather('advsandstorm');
		},
		name: "ADV King",
		shortDesc: "Summons Sand until its overridden.",
		rating: 5,
		num: -1000,
	},
	conversionz: {
		shortDesc: "If the Pokémon changes its type, the result is permanent. Deletes STAB.",
		onSwitchIn(pokemon) {
			if (pokemon.species.id !== 'porygonz') return;
			const type = this.dex.species.get(pokemon.species).types[0];
			if (pokemon.hasType(type) || !pokemon.setType(type)) return;
			this.add('-start', pokemon, 'typechange', type);
		},
		onSourceHit(target, source, move) {
			if (source.species.id !== 'porygonz') return;
			if (move.id === 'conversion' || move.id === 'conversion2') {
				this.add('-ability', source, 'Conversion-Z');
				const pokemon = this.dex.species.get(source.species);
				pokemon.types[0] = source.types[0];
			}
		},
		onModifyMove(move) {
			delete move.stab;
		},
		isPermanent: true,
		name: "Conversion-Z",
		rating: 5,
		num: -5000,
	},
	gorillatactics: {
		name: "Gorilla Tactics",
		shortDesc: "While this Pokemon is active, the opponents' held items have no effect.",
		onStart(source) {
			let activated = false;
			for (const pokemon of source.side.foe.active) {
				if (!activated) {
					this.add('-ability', source, 'Gorilla Tactics');
				}
				activated = true;
				if (!pokemon.volatiles['embargo'] && !pokemon.hasItem('morningblossom')) {
					pokemon.addVolatile('embargo');
				}
			}
		},
		onAnySwitchIn(pokemon) {
			const source = this.effectState.target;
			if (pokemon === source) return;
			for (const target of source.side.foe.active) {
				if (!target.volatiles['embargo'] && !target.hasItem('morningblossom')) {
					target.addVolatile('embargo');
				}
			}
		},
		onEnd(pokemon) {
			const source = this.effectState.target;
			for (const target of source.side.foe.active) {
				target.removeVolatile('embargo');
			}
		},
		rating: 4,
		num: 255,
	},
	grasspelt: {
		onModifyDefPriority: 6,
		onModifyDef(pokemon) {
			if (this.field.isTerrain('grassyterrain')) return this.chainModify(5);
		},
		name: "Grass Pelt",
		shortDesc: "Def is 5x in Grassy Terrain.",
		rating: 0.5,
		num: 179,
	},
	grimneigh: {
		onBasePower(basePower, pokemon, target) {
			if (target.status === 'brn') {
				return this.chainModify(1.5);
			}
		},
		name: "Grim Neigh",
		shortDesc: "This Pokemon deals 1.5x damage to burned opponents.",
		rating: 3,
		num: 265,
	},
	asonespectrier: {
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'As One');
			this.add('-ability', pokemon, 'Unnerve', pokemon.side.foe);
		},
		onBasePower(basePower, pokemon, target) {
			if (target.status === 'brn') {
				return this.chainModify(1.5);
			}
		},
		onFoeTryEatItem: false,
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({spa: length}, source, source, this.dex.abilities.get('grimneigh'));
			}
		},
		isPermanent: true,
		name: "As One (Spectrier)",
		shortDesc: "The combination of Unnerve and Grim Neigh.",
		rating: 3.5,
		num: 267,
	},
	ironfist: {
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Iron Fist boost');
				return this.chainModify([0x14CD, 0x1000]);
			}
		},
		name: "Iron Fist",
		shortDesc: "Punching moves deal 1.3x damage.",
		rating: 3,
		num: 89,
	},
	protean: {
		onPrepareHit(source, target, move) {
			if (move.hasBounced) return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Protean');
			}
		},
		onModifyMove(move) {
			delete move.stab;
		},
		name: "Protean",
		shortDesc: "User changes type to match its moves. Deletes STAB.",
		rating: 4.5,
		num: 168,
	},
	rattled: {
		onDamagingHit(damage, target, source, move) {
			if (['Dark', 'Bug', 'Ghost'].includes(move.type)) {
				this.boost({spe: 12});
			}
		},
		onAfterBoost(boost, target, source, effect) {
			if (effect && effect.id === 'intimidate') {
				this.boost({spe: 12});
			}
		},
		name: "Rattled",
		shortDesc: "If hit by Dark/Bug/Ghost; Intimidated, raises Spe by 12.",
		rating: 1.5,
		num: 155,
	},
	synchronize: {
		onModifyDamage(damage, source, target, move) {
			if (damage >= target.hp) {
				for (const moveSlot of target.moveSlots) {
					if (moveSlot === null) return;
					if (source.moveSlots.length < 16) {
						this.attrLastMove('[still]');
						if (source.moveSlots.length < 0) return false;
						const learnedMove = {
							move: this.dex.moves.get(moveSlot.id),
							id: moveSlot.id,
							pp: moveSlot.pp,
							maxpp: moveSlot.pp,
							target: moveSlot.target,
							disabled: false,
							used: false,
						};	
						source.moveSlots[source.moveSlots.length] = learnedMove;
						source.baseMoveSlots[source.moveSlots.length - 1] = learnedMove;
					}
				}
			}
		},
		name: "Synchronize",
		shortDesc: "After knocking out target, it learns target's moves.",
		rating: 2,
		num: 28,
	},
	unstoppableforce: {
		onSourceHit(target, source, move) {
			if (!move || !target) return;
			if (rollMoves.includes(move.id)) {
				this.boost({def: 1, spd: 1}, source);
			}
		},
		onSourceAfterSubDamage(target, source, move) { // should still activate when targeting a Substitute
			if (!move || !target) return;
			if (rollMoves.includes(move.id)) {
				this.boost({def: 1, spd: 1}, source);
			}
		},
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (rollMoves.includes(move.id)) {
				return this.chainModify(2);
			}
		},
		name: "Unstoppable Force",
		shortDesc: "Ice Ball/Rollout go crazy.",
		rating: 5,
		num: -1001,
	},
	gamble: {
		onPrepareHit(source, target, move) {
			if (move.multihit) return;
			if (move.id === 'metronome') {
				move.multihit = 5;
			}
		},
		name: "Gamble",
		shortDesc: "This Pokémon's Metronome hits five times.",
		rating: 3,
		num: -5001,
	},
	myceliummight: {
		onModifyPriority(priority, source, move) {
			if (source.activeMoveActions < 1) {
				return priority + 1;
			} else if (source.activeMoveActions > 1) {
				return priority + 0;
			}
		},
		name: "Mycelium Might",
		shortDesc: "This Pokemon's first move on switch in has +1 priority.",
		rating: 2,
		num: 298,
	},
	normalize: {
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
		shortDesc: "All of this Pokemon's moves are Normal-type and have doubled power.",
		rating: 2,
		num: 96,
	},
	wonderguard: {
		onTryHit(target, source, move) {
			if (target === source || move.category === 'Status' || move.type === '???' || move.id === 'struggle') return;
			if (move.id === 'skydrop' && !source.volatiles['skydrop']) return;
			this.debug('Wonder Guard immunity: ' + move.id);
			if (target.runEffectiveness(move) <= 0) {
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-immune', target, '[from] ability: Wonder Guard');
				}
				return null;
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		name: "Wonder Guard",
		shortDesc: "Immunity to non-Super Effective damage and indirect damage.",
		rating: 5,
		num: 25,
	},
	protosynthesis: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday') && !pokemon.volatiles['protosynthesis']) {
				pokemon.addVolatile('protosynthesis');
			} else if (pokemon.hasItem('boosterenergy') && !this.field.isWeather('sunnyday') && pokemon.useItem()) {
				pokemon.removeVolatile('protosynthesis');
				pokemon.addVolatile('protosynthesis', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['protosynthesis'].fromBooster = true;
			} else if (!pokemon.volatiles['protosynthesis']?.fromBooster && !this.field.isWeather('sunnyday')) {
				pokemon.removeVolatile('protosynthesis');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['protosynthesis'];
			this.add('-end', pokemon, 'Protosynthesis', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protosynthesis', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protosynthesis');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Protosynthesis atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Protosynthesis def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Protosynthesis spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Protosynthesis spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Protosynthesis spe boost');
				return this.chainModify([5325, 4096]);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		isPermanent: true,
		name: "Protosynthesis",
		shortDesc: "This Pokemon's highest stat is 1.3x in Sun or holding Booster Energy.",
		rating: 3,
		num: 281,
	},
	protosmosis: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('raindance') && !pokemon.volatiles['protosmosis']) {
				pokemon.addVolatile('protosmosis');
			} else if (pokemon.hasItem('boosterenergy') && !this.field.isWeather('raindance') && pokemon.useItem()) {
				pokemon.removeVolatile('protosmosis');
				pokemon.addVolatile('protosmosis', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['protosmosis'].fromBooster = true;
			} else if (!pokemon.volatiles['protosmosis']?.fromBooster && !this.field.isWeather('raindance')) {
				pokemon.removeVolatile('protosmosis');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['protosmosis'];
			this.add('-end', pokemon, 'Protosmosis', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protosmosis', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protosmosis');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosmosis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Protosmosis atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Protosmosis def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Protosmosis spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Protosmosis spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Protosmosis spe boost');
				return this.chainModify([5325, 4096]);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosmosis');
			},
		},
		isPermanent: true,
		name: "Protosmosis",
		shortDesc: "This Pokemon's highest stat is 1.3x in Rain or holding Booster Energy.",
		rating: 3,
		num: -1010,
	},
	protocrysalis: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sandstorm') && !pokemon.volatiles['protocrysalis']) {
				pokemon.addVolatile('protocrysalis');
			} else if (pokemon.hasItem('boosterenergy') && !this.field.isWeather('sandstorm') && pokemon.useItem()) {
				pokemon.removeVolatile('protocrysalis');
				pokemon.addVolatile('protocrysalis', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['protocrysalis'].fromBooster = true;
			} else if (!pokemon.volatiles['protocrysalis']?.fromBooster && !this.field.isWeather('sandstorm')) {
				pokemon.removeVolatile('protocrysalis');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['protocrysalis'];
			this.add('-end', pokemon, 'Protocrysalis', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protocrysalis', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protocrysalis');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protocrysalis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Protocrysalis atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Protocrysalis def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Protocrysalis spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Protocrysalis spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Protocrysalis spe boost');
				return this.chainModify([5325, 4096]);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protocrysalis');
			},
		},
		isPermanent: true,
		name: "Protocrysalis",
		shortDesc: "This Pokemon's highest stat is 1.3x in Sand or holding Booster Energy.",
		rating: 3,
		num: -1011,
	},
	protostasis: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('hail') && !pokemon.volatiles['protostasis']) {
				pokemon.addVolatile('protostasis');
			} else if (pokemon.hasItem('boosterenergy') && !this.field.isWeather('hail') && pokemon.useItem()) {
				pokemon.removeVolatile('protostasis');
				pokemon.addVolatile('protostasis', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['protostasis'].fromBooster = true;
			} else if (!pokemon.volatiles['protostasis']?.fromBooster && !this.field.isWeather('hail')) {
				pokemon.removeVolatile('protostasis');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['protostasis'];
			this.add('-end', pokemon, 'protostasis', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protostasis', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protostasis');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protostasis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Protostasis atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Protostasis def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Protostasis spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Protostasis spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Protostasis spe boost');
				return this.chainModify([5325, 4096]);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protostasis');
			},
		},
		isPermanent: true,
		name: "Protostasis",
		shortDesc: "This Pokemon's highest stat is 1.3x in Hail or holding Booster Energy.",
		rating: 3,
		num: -1012,
	},
	quarkdrive: {
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isTerrain('electricterrain') && !pokemon.volatiles['quarkdrive']) {
				pokemon.addVolatile('quarkdrive');
			} else if (pokemon.hasItem('quarkdrive') && !this.field.isTerrain('electricterrain') && pokemon.useItem()) {
				pokemon.removeVolatile('quarkdrive');
				pokemon.addVolatile('quarkdrive', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['quarkdrive'].fromBooster = true;
			} else if (!pokemon.volatiles['quarkdrive']?.fromBooster && !this.field.isTerrain('electricterrain')) {
				pokemon.removeVolatile('quarkdrive');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['quarkdrive'];
			this.add('-end', pokemon, 'Quark Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Quark Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Quark Drive');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Quark Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Quark Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Quark Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Quark Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Quark Drive spe boost');
				return this.chainModify([5325, 4096]);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		isPermanent: true,
		name: "Quark Drive",
		shortDesc: "This Pokemon's highest stat is 1.3x in Electric Terrain or holding Booster Energy.",
		rating: 3,
		num: 282,
	},
	photondrive: {
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isTerrain('grassyterrain') && !pokemon.volatiles['photondrive']) {
				pokemon.addVolatile('photondrive');
			} else if (pokemon.hasItem('photondrive') && !this.field.isTerrain('grassyterrain') && pokemon.useItem()) {
				pokemon.removeVolatile('photondrive');
				pokemon.addVolatile('photondrive', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['photondrive'].fromBooster = true;
			} else if (!pokemon.volatiles['photondrive']?.fromBooster && !this.field.isTerrain('grassyterrain')) {
				pokemon.removeVolatile('photondrive');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['photondrive'];
			this.add('-end', pokemon, 'Photon Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Photon Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Photon Drive');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'photondrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Photon Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Photon Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Photon Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Photon Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Photon Drive spe boost');
				return this.chainModify([5325, 4096]);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Photon Drive');
			},
		},
		isPermanent: true,
		name: "Photon Drive",
		shortDesc: "This Pokemon's highest stat is 1.3x in Grassy Terrain or holding Booster Energy.",
		rating: 3,
		num: -1100,
	},
	neurondrive: {
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isTerrain('psychicterrain') && !pokemon.volatiles['neurondrive']) {
				pokemon.addVolatile('neurondrive');
			} else if (pokemon.hasItem('neurondrive') && !this.field.isTerrain('psychicterrain') && pokemon.useItem()) {
				pokemon.removeVolatile('neurondrive');
				pokemon.addVolatile('neurondrive', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['neurondrive'].fromBooster = true;
			} else if (!pokemon.volatiles['neurondrive']?.fromBooster && !this.field.isTerrain('psychicterrain')) {
				pokemon.removeVolatile('neurondrive');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['neurondrive'];
			this.add('-end', pokemon, 'Neuron Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Neuron Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Neuron Drive');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'neurondrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Neuron Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Neuron Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Neuron Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Neuron Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Neuron Drive spe boost');
				return this.chainModify([5325, 4096]);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Neuron Drive');
			},
		},
		isPermanent: true,
		name: "Neuron Drive",
		shortDesc: "This Pokemon's highest stat is 1.3x in Psychic Terrain or holding Booster Energy.",
		rating: 3,
		num: -1200,
	},
	runedrive: {
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onUpdate(pokemon) {
			// if (pokemon.transformed) return;
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isTerrain('mistyterrain') && !pokemon.volatiles['runedrive']) {
				pokemon.addVolatile('runedrive');
			} else if (pokemon.hasItem('runedrive') && !this.field.isTerrain('mistyterrain') && pokemon.useItem()) {
				pokemon.removeVolatile('runedrive');
				pokemon.addVolatile('runedrive', pokemon, Dex.getItem('boosterenergy'));
				pokemon.volatiles['runedrive'].fromBooster = true;
			} else if (!pokemon.volatiles['runedrive']?.fromBooster && !this.field.isTerrain('mistyterrain')) {
				pokemon.removeVolatile('runedrive');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['runedrive'];
			this.add('-end', pokemon, 'Rune Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.id === 'boosterenergy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Rune Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Rune Drive');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'runedrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectState.bestStat !== 'atk') return;
				this.debug('Rune Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectState.bestStat !== 'def') return;
				this.debug('Rune Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectState.bestStat !== 'spa') return;
				this.debug('Rune Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectState.bestStat !== 'spd') return;
				this.debug('Rune Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe') return;
				this.debug('Rune Drive spe boost');
				return this.chainModify([5325, 4096]);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Rune Drive');
			},
		},
		isPermanent: true,
		name: "Rune Drive",
		shortDesc: "This Pokemon's highest stat is 1.3x in Misty Terrain or holding Booster Energy.",
		rating: 3,
		num: -1300,
	},
	hadronengine: {
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (this.field.isTerrain('electricterrain')) {
				this.debug('Hadron Engine boost');
				return this.chainModify(1.5);
			}
		},
		name: "Hadron Engine",
		shortDesc: "This Pokemon's SpA is 1.5x in ETerrain.",
		rating: 4.5,
		num: 289,
	},
	orichalcumpulse: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		name: "Orichalcum Pulse",
		shortDesc: "This Pokemon's Att is 1.5x in Sun.",
		rating: 4.5,
		num: 288,
	},
	angershell: {
		onDamage(damage, target, source, effect) {
			if (
				effect.effectType === "Move" &&
				!effect.multihit &&
				(!effect.negateSecondary && !(effect.hasSheerForce && source.hasAbility('sheerforce')))
			) {
				this.effectState.checkedAngerShell = false;
			} else {
				this.effectState.checkedAngerShell = true;
			}
		},
		onTryEatItem(item) {
			const healingItems = [
				'aguavberry', 'enigmaberry', 'figyberry', 'iapapaberry', 'magoberry', 'sitrusberry', 'wikiberry', 'oranberry', 'berryjuice',
			];
			if (healingItems.includes(item.id)) {
				return this.effectState.checkedAngerShell;
			}
			return true;
		},
		onAfterMoveSecondary(target, source, move) {
			this.effectState.checkedAngerShell = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({atk: 2, spa: 2, spe: 2, def: -1, spd: -1}, target, target);
			}
		},
		name: "Anger Shell",
		shortDesc: "Raises this Pokemon's Att/SpA/Spe by 2 & Def/SpD by 1 when falling below 1/2 of its max hp.",
		rating: 4,
		num: 271,
	},
	ultimateform: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender) {
			if (!defender.activeTurns) {
				this.debug('Stakeout boost');
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender) {
			if (!defender.activeTurns) {
				this.debug('Stakeout boost');
				return this.chainModify(2);
			}
		},
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bite']) {
				return this.chainModify(1.5);
			}
		},
		onModifyMove(move) {
			move.stab = 2;
		},
		name: "Ultimate Form",
		shortDesc: "Stakeout + Strong Jaw + Adaptability.",
		rating: 5,
		num: -10000,
	},
	quickfeet: {
		onModifySpe(spe, pokemon) {
			if (pokemon.status) {
				return this.chainModify(2);
			}
		},
		name: "Quick Feet",
		shortDesc: "This Pokemon's Spe is 2x if statused.",
		rating: 2.5,
		num: 95,
	},
	watercompaction: {
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
			if (target === this.effectState.target || target.side !== source.side) return;
			if (move.type === 'Water') {
				this.boost({def: 1}, this.effectState.target);
			}
		},
		name: "Water Compaction",
		shortDesc: "Raises Def by 1 if hit by a Water move. Water immunity.",
		rating: 1.5,
		num: 195,
	},
	mountaineer: {
		onDamage(damage, target, source, effect) {
			if (effect && effect.id === 'stealthrock') {
				return false;
			}
		},
		onTryHit(target, source, move) {
			if (move.type === 'Rock' && !target.activeTurns) {
				this.add('-immune', target, '[from] ability: Mountaineer');
				return null;
			}
		},
		isNonstandard: null,
		name: "Mountaineer",
		shortDesc: "Immunity to Stealth Rock and Rock moves on switch in.",
		rating: 3,
		num: -2,
	},
	pressure: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Pressure');
		},
		onDeductPP(target, source) {
			if (target.side === source.side) return;
			return 2;
		},
		name: "Pressure",
		shortDesc: "Moves targeting this Pokemon loose 2 extra PP.",
		rating: 2.5,
		num: 46,
	},
	normalnormalize: {
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
			if (move.normalizeBoosted) return this.chainModify(1.2);
		},
		name: "Normal Normalize",
		shortDesc: "All moves become Normal-type and deal 1.2x.",
		rating: 5,
		num: -2000,
	},
}