export const Moves: { [moveid: string]: ModdedMoveData } = {
	hiddenpower: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerfighting: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerfire: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowergrass: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerwater: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerelectric: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerice: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerpoison: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerground: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerpsychic: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerdark: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerbug: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerghost: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerdragon: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowersteel: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerflying: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	hiddenpowerrock: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	wormholedisruption: {
		num: -1024,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Wormhole Disruption",
		shortDesc: "On hit, user lowers its highest stat by 1 stage and increases its lowest by 1 stage.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Dark Void', target);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		onDamage(damage, target, source, effect) {
			const bestStat = source.getBestStat(true, true);
			if (effect && effect.effectType === 'Move') {
	      	let statName: StatIDExceptHP = 'atk';
	         let worstStat = Number.MAX_VALUE;
	         const stats: StatIDExceptHP[] = ['atk', 'def', 'spa', 'spd', 'spe'];
	         for (const i of stats) {
		      	if (source.getStat(i, true, true) < worstStat) {
		            statName = i;
		            worstStat = this.getStat(i, true, true);
		      	}
	      	}
			}
      	this.boost({[worstStat]: 1}, source);
			this.boost({[bestStat]: -1}, source);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
	},
	clusterbomb: {
		num: -1050,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Cluster Bomb",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, bullet: 1},
		shortDesc: "User sets a hazard that repeats this attack on entry.",
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Pyro Ball', target);
		},
		onAfterHit(target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('clustershrapnel');
				}
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('clustershrapnel');
				}
			}
		},
		secondary: {}, // Sheer Force-boosted
		target: "normal",
		type: "Fire",
	},
	clustershrapnel: {
		num: -1050,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Cluster Shrapnel",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, metronome: 1, mustpressure: 1},
		sideCondition: 'clustershrapnel',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Cluster Shrapnel');
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots')) return;
				this.effectState.pokemon = this.effectState.side[this.effectState.position];
				const data = this.effectState;
				const move = this.dex.moves.get('clusterboom');
				const sideConditions = ['clustershrapnel'];
				const hitMove = new this.dex.Move(data.moveData) as ActiveMove;
				
				this.actions.trySpreadMoveHit([data.pokemon], data.source, hitMove);
				
				for (const condition of sideConditions) {
					if (pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name);
					}
				}
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Fire",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
	},
	clusterboom: {
		num: -1050,
		accuracy: true,
		basePower: 60,
		category: "Special",
		name: "Cluster Boom",
		pp: 20,
		priority: 0,
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Doom Desire', target);
		},
		flags: {metronome: 1, mustpressure: 1},
		secondary: null,
		target: "normal",
		type: "Fire",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
	},
	lusterthrust: {
		num: -1051,
		accuracy: true,
		basePower: 40,
		basePowerCallback(source, target, move) {
			if (source.volatiles['solischarge']) {
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		name: "Luster Thrust",
		pp: 20,
		priority: 2,
		flags: {metronome: 1, contact: 1, mustpressure: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Geomancy', source);
			this.add('-anim', source, 'Quick Attack', target);
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (source.volatiles['solischarge']) {
				delete source.volatiles['solischarge'];
			}
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
	},
	lightparry: {
		num: -1054,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Light Parry",
		shortDesc: "Incoming damage is quartered. User gains Solis Charge (1.5x damage).",
		pp: 10,
		priority: 4,
		flags: {bypasssub: 1, noassist: 1, failcopycat: 1},
		volatileStatus: 'lightparry',
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
			this.add('-anim', pokemon, 'Future Sight', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Light Parry');
			},
			onSourceModifyDamage(damage, source, target, move) {
				return this.chainModify(0.25);
			},
			onDamagingHit(damage, target, source, effect) {
				target.addVolatile('solischarge');
			},
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		zMove: {effect: 'redirect'},
		contestType: "Clever",
	},
	necashrapnel: {
		num: -4000,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		name: "Neca Shrapnel",
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		shortDesc: "User hits 2-5 times. Secondary effect and chance depends on terrain.",
		multihit: [2, 5],
		secondary: {}, // sheer force
		target: "normal",
		type: "Psychic",
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Power Gem', target);
		},
		onAfterHit(target, source) {
			if (this.field.isTerrain('mistyterrain')) {
				if (this.randomChance(1, 5)) {
					if (target.getStat('atk', false, true) > target.getStat('spa', false, true)) {
						this.boost({atk: -1}, target);
					} else this.boost({spa: -1}, target);
				}
			} else if (this.field.isTerrain('grassyterrain')) {
				if (this.randomChance(1, 5)) {
					this.boost({spe: -1}, target);
				}
			} else if (this.field.isTerrain('psychicterrain')) {
				if (this.randomChance(1, 5)) {
					this.boost({def: -1}, target);
				}
			} else if (this.field.isTerrain('electricterrain')) {
				if (this.randomChance(1, 10)) {
					source.trySetStatus('par', target);
				}
			} else if (this.randomChance(1, 10)) {
				source.trySetStatus('psn', target);
			}
		},
		zMove: {basePower: 140},
		maxMove: {basePower: 130},
		contestType: "Clever",
	},
	triplekick: {
		num: 167,
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		category: "Physical",
		name: "Triple Kick",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		multihit: 3,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMove: {basePower: 120},
		maxMove: {basePower: 80},
		contestType: "Cool",
	},
	reconsector: {
		num: -1060,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Recon Sector",
		pp: 20,
		priority: 0,
		flags: {},
		ignoreImmunity: true,
		sideCondition: "reconsector",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Magnet Rise", source);
		},
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Recon Sector');
				this.add('-message', `A healing plasma runs through Ausma's team!`);
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots')) return;
				if (this.field.isTerrain('electricterrain')) {
					this.add('-anim', pokemon, "Charge", pokemon);
					this.heal(pokemon.maxhp / 4);
				} else {
					this.add('-anim', pokemon, "Charge", pokemon);
					this.heal(pokemon.maxhp / 8);
				}
			},
		},
		shortDesc: "Hazard: heals 1/8 HP on entry, 1/4 in Electric Terrain.",
		secondary: null,
		target: "allySide",
		type: "Electric",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	voltsector: {
		num: -1061,
		accuracy: 100,
		basePower: 25,
		category: "Special",
		name: "Volt Sector",
		shortDesc: "Move repeats at the end of the turn for 5 turns.",
		pp: 20,
		priority: 0,
		flags: {},
		ignoreImmunity: true,
		isFutureMove: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'voltsector')) return false;
			Object.assign(target.side.slotConditions[target.position]['voltsector'], {
				duration: 5,
				move: 'voltsector',
				source: source,
				position: target.position,
				side: target.side,
				moveData: {
					id: 'voltsector',
					name: "Volt Sector",
					accuracy: 100,
					basePower: 40,
					category: "Special",
					priority: 0,
					flags: {},
					ignoreImmunity: false,
					onPrepareHit(target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', target, "Magnet Rise", target);
					},
					effectType: 'Move',
					isFutureMove: true,
					type: 'Electric',
				},
			});
			if (source.species.baseSpecies === 'Ausma') this.add('-message', `${(source.illusion ? source.illusion.name : source.name)} prepares her plane sectors for attack!`);
			else this.add('-message', `${(source.illusion ? source.illusion.name : source.name)} prepares an electrical ambush!`);
			return null;
		},
		condition: {
			// this is a slot condition
			duration: 5,
			onResidualOrder: 3,
			onResidual(target) {
				// unlike a future move, Flurry activates each turn
				this.effectState.target = this.effectState.side.active[this.effectState.position];
				const data = this.effectState;
				const move = this.dex.moves.get('voltsector');
				if (data.target.fainted || data.target === data.source) {
					this.hint(`${move.name} did not hit because the target is ${(data.fainted ? 'fainted' : 'the user')}.`);
					return;
				}

				if (data.source.species.baseSpecies === 'Ausma') this.add('-message', `${(data.target.illusion ? data.target.illusion.name : data.target.name)} is being zapped by Ausma's plane sectors!`);
				else this.add('-message', `${(data.target.illusion ? data.target.illusion.name : data.target.name)} is being zapped!`);
				data.target.removeVolatile('Endure');

				if (data.source.hasAbility('infiltrator') && this.gen >= 6) {
					data.moveData.infiltrates = true;
				}
				if (data.source.hasAbility('normalize') && this.gen >= 6) {
					data.moveData.type = 'Normal';
				}
				if (data.source.hasAbility('adaptability') && this.gen >= 6) {
					data.moveData.stab = 2;
				}

				const hitMove = new this.dex.Move(data.moveData) as ActiveMove;
				this.add('-anim', data.source, "Thunderbolt", data.target);
				this.actions.trySpreadMoveHit([data.target], data.source, hitMove);
			},
			onEnd(target) {
				// unlike a future move, Flurry activates each turn
				this.effectState.target = this.effectState.side.active[this.effectState.position];
				const data = this.effectState;
				const move = this.dex.moves.get('voltsector');

				if (data.source.hasAbility('infiltrator') && this.gen >= 6) {
					data.moveData.infiltrates = true;
				}
				if (data.source.hasAbility('normalize') && this.gen >= 6) {
					data.moveData.type = 'Normal';
				}
				if (data.source.hasAbility('adaptability') && this.gen >= 6) {
					data.moveData.stab = 2;
				}

				const hitMove = new this.dex.Move(data.moveData) as ActiveMove;
				this.add('-anim', data.source, "Thunderbolt", data.target);
				this.actions.trySpreadMoveHit([data.target], data.source, hitMove);//??
				if (data.source.species.baseSpecies === 'Ausma') this.add('-message', `Ausma's plane sectors retracted!`);
				else this.add('-message', `The electric ambush ceased!`);
			},
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Clever",
	},
	rapidspin: { //for deterraven and ausma moves//
		num: 229,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Rapid Spin",
		pp: 40,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'clustershrapnel', 'reconsector'];
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
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'clustershrapnel', 'reconsector'];
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
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	defog: { //ausma and deterraven moves//
		num: 432,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Defog",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, metronome: 1},
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'clustershrapnel', 'reconsector',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'clustershrapnel', 'reconsector',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.conditions.get(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			this.field.clearTerrain();
			return success;
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		zMove: {boost: {accuracy: 1}},
		contestType: "Cool",
	},
	stoneaxe: {
		num: 830,
		accuracy: 90,
		basePower: 65,
		category: "Physical",
		name: "Stone Axe",
		critRatio: 2,
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
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
		secondary: {}, // Sheer Force-boosted
		target: "normal",
		shortDesc: "Sets Stealth Rock on hit. High crit ratio.",
		type: "Rock",
	},
	gravity: {
		num: 356,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Gravity",
		pp: 5,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		pseudoWeather: 'gravity',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('newtonsapple')) {
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
			onModifyDamage(damage, source, target, move) {
				if (move.id === 'gravitonwave') {
					this.debug('Graviton Wave boost');
					return this.chainModify(1.5);
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 2,
			onFieldEnd() {
				this.add('-fieldend', 'move: Gravity');
			},
		},
		secondary: null,
		target: "all",
		type: "Psychic",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
	plasmarush: {
		num: 1005,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "If charged: +3 Atk and SpA. Else: +2 Atk and SpA, and user charges.",
		name: "Plasma Rush",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, nosketch: 1},
		onTryMove() {
			this.attrLastMove('[still]');
		},
		onPrepareHit(target, source) {
			this.add('-anim', source, 'Thunder Cage', target);
		},
		onHit(target, source, move) {
			if (target?.volatiles['charge']) {
				this.boost({atk: 3, spa: 3}, target);
			} else {
				this.boost({atk: 2, spa: 2}, target);
				target.addVolatile('charge');
			}
		},
		secondary: null,
		target: "self",
		type: "Electric",
		contestType: "Clever",
	},
	relicsong: {
		num: 547,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Relic Song",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1},
		secondary: {
			chance: 10,
			status: 'slp',
		},
		onHit(target, pokemon, move) {
			if (pokemon.baseSpecies.baseSpecies === 'Meloetta' && !pokemon.transformed) {
				move.willChangeForme = true;
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.willChangeForme) {
				const meloettaForme = pokemon.species.id === 'meloettapirouette' ? '' : '-Pirouette';
				pokemon.formeChange('Meloetta' + meloettaForme, this.effect, true, '[msg]');
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		target: "allAdjacentFoes",
		type: "Normal",
		contestType: "Beautiful",
	},
	snowscape: {
		num: 883,
		isNonstandard: "Unobtainable",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Snowscape",
		pp: 10,
		priority: 0,
		flags: {nosketch: 1},
		weather: 'snow',
		secondary: null,
		target: "all",
		type: "Ice",
	},
	syrupbomb: {
		inherit: true,
		basePower: 80,
		accuracy: 100,
		shortDesc: "Lowers Speed by 2 stages for 3 turns.",
		condition: {
			noCopy: true,
			duration: 4,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Syrup Bomb');
			},
			onResidualOrder: 14,
			onResidual() {
				this.boost({spe: -2});
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Syrup Bomb', '[silent]');
			},
		},
	},
	triplearrows: {
		accuracy: 100,
		basePower: 50,
		shortDesc: "Lowers target's Defense by 1; user's crit ratio +2.",
		name: "Triple Arrows",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		critRatio: null,
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		self: {
			volatileStatus: 'focusenergy',
		},
		contestType: "Cool", //Necessary
		type: "Fighting",
		target: "normal",
	},
	electroball: {
		inherit: true,
		basePowerCallback(pokemon, target) {
			let ratio = Math.floor(pokemon.getStat('spe') / target.getStat('spe') * 10) / 10;
			if (!isFinite(ratio)) ratio = 0;
			let bp = 40;
			if (ratio >= 1) bp = 60;
			if (ratio >= 1.5) bp = 80;
			if (ratio >= 2) bp = 100;
			if (ratio >= 3) bp = 120;
			if (ratio >= 4) bp = 150;
			return bp;
		},
	},
	echoedvoice: {
		num: 497,
		accuracy: 100,
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			let bp = move.basePower;
			if (this.field.pseudoWeather.echoedvoice) {
				bp = move.basePower * this.field.pseudoWeather.echoedvoice.multiplier;
			}
			this.debug('BP: ' + move.basePower);
			return bp;
		},
		category: "Special",
		name: "Echoed Voice",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		onTry() {
			this.field.addPseudoWeather('echoedvoice');
		},
		condition: {
			duration: 3,
			onFieldStart() {
				this.effectState.multiplier = 1;
			},
			onFieldRestart() {
				if (this.effectState.duration !== 3) {
					this.effectState.duration = 3;
					if (this.effectState.multiplier < 5) {
						this.effectState.multiplier++;
					}
				}
			},
		},
		shortDesc: "Power increases when used on consecutive turns. Power resets if not used for more than 1 turn.",
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Beautiful",
	},
	toxicgreed: {
		num: 738,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Toxic Greed",
		shortDesc: "Sets a volatile that leeches 1/16 HP per turn. Poison-types are immune.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, bypasssub: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bitter Malice", target);
		},
		condition: {
			noCopy: true,
			onStart(pokemon) {
				if (pokemon.hasType('Poison')) return null;
				this.add('-start', pokemon, 'Toxic Greed');
			},
			onResidualOrder: 8,
			onResidual(pokemon) {
				const target = this.getAtSlot(pokemon.volatiles['toxicgreed'].sourceSlot);
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to leech into');
					return;
				}
				const damage = this.damage(pokemon.baseMaxhp / 16, pokemon, target);
				if (damage) {
					this.heal(damage, target, pokemon);
				}
			},
		},
		secondary: {
			chance: 100,
			volatileStatus: 'toxicgreed',
		},
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
};
