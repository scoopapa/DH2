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
			const type = this.dex.getSpecies(pokemon.species).types[0];
			if (pokemon.hasType(type) || !pokemon.setType(type)) return;
			this.add('-start', pokemon, 'typechange', type);
		},
		onSourceHit(target, source, move) {
			if (source.species.id !== 'porygonz') return;
			if (move.id === 'conversion' || move.id === 'conversion2') {
				this.add('-ability', source, 'Conversion-Z');
				const pokemon = this.dex.getSpecies(source.species);
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
			const source = this.effectData.target;
			if (pokemon === source) return;
			for (const target of source.side.foe.active) {
				if (!target.volatiles['embargo'] && !target.hasItem('morningblossom')) {
					target.addVolatile('embargo');
				}
			}
		},
		onEnd(pokemon) {
			const source = this.effectData.target;
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
				this.boost({spa: length}, source, source, this.dex.getAbility('grimneigh'));
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
		rating: 1.5,
		num: 155,
	},
	synchronize: {
		shortDesc: "After knocking out target, if user knows less than 12 moves, it learns target's moves.",
		onModifyDamage(damage, source, target, move) {
			if (damage >= target.hp) {
				for (const moveSlot of target.moveSlots) {
					if (moveSlot === null) return;
					if (source.moveSlots.length < 16) {
						this.attrLastMove('[still]');
						if (source.moveSlots.length < 0) return false;
						const learnedMove = {
							move: this.dex.getMove(moveSlot.id),
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
		shortDesc: "Ice Ball/Rollout are buffed.",
		rating: 5,
		num: -1001,
	},
	gamble: {
		shortDesc: "This Pokémon's Metronome hits five times.",
		onPrepareHit(source, target, move) {
			if (move.multihit) return;
			if (move.id === 'metronome') {
				move.multihit = 5;
			}
		},
		name: "Gamble",
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
		rating: 2,
		num: 298,
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
		rating: 5,
		num: 25,
	},
	protosynthesis: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectData, pokemon);
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
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protosynthesis', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protosynthesis');
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk') return;
				this.debug('Protosynthesis atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def') return;
				this.debug('Protosynthesis def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa') return;
				this.debug('Protosynthesis spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd') return;
				this.debug('Protosynthesis spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe') return;
				this.debug('Protosynthesis spe boost');
				return this.chainModify([5325, 4096]);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		isPermanent: true,
		name: "Protosynthesis",
		rating: 3,
		num: 281,
	},
	quarkdrive: {
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectData, pokemon);
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
					this.effectData.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Quark Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Quark Drive');
				}
				this.effectData.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectData.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, source, target, move) {
				if (this.effectData.bestStat !== 'atk') return;
				this.debug('Quark Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, target, source, move) {
				if (this.effectData.bestStat !== 'def') return;
				this.debug('Quark Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(relayVar, source, target, move) {
				if (this.effectData.bestStat !== 'spa') return;
				this.debug('Quark Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(relayVar, target, source, move) {
				if (this.effectData.bestStat !== 'spd') return;
				this.debug('Quark Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectData.bestStat !== 'spe') return;
				this.debug('Quark Drive spe boost');
				return this.chainModify([5325, 4096]);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		isPermanent: true,
		name: "Quark Drive",
		rating: 3,
		num: 282,
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
				this.effectData.checkedAngerShell = false;
			} else {
				this.effectData.checkedAngerShell = true;
			}
		},
		onTryEatItem(item) {
			const healingItems = [
				'aguavberry', 'enigmaberry', 'figyberry', 'iapapaberry', 'magoberry', 'sitrusberry', 'wikiberry', 'oranberry', 'berryjuice',
			];
			if (healingItems.includes(item.id)) {
				return this.effectData.checkedAngerShell;
			}
			return true;
		},
		onAfterMoveSecondary(target, source, move) {
			this.effectData.checkedAngerShell = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({atk: 2, spa: 2, spe: 2, def: -1, spd: -1}, target, target);
			}
		},
		name: "Anger Shell",
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
		rating: 5,
		num: -10000,
	},
}