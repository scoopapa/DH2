export const Moves: {[k: string]: ModdedMoveData} = {
	//Moves that just need to be edited for other gmax moves to function: 
	curse: {
		num: 174,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Curse",
		pp: 10,
		priority: 0,
		flags: {authentic: 1},
		volatileStatus: 'curse',
		onModifyMove(move, source, target) {
			if (!source.hasType('Ghost')) {
				move.target = move.nonGhostTarget as MoveTarget;
			}
		},
		onTryHit(target, source, move) {
			if (!source.hasType('Ghost')) {
				delete move.volatileStatus;
				delete move.onHit;
				move.self = {boosts: {spe: -1, atk: 1, def: 1}};
			} else if (move.volatileStatus && target.volatiles['curse']) {
				return false;
			}
		},
		onHit(target, source) {
			this.directDamage(source.maxhp / 2, source, source);
		},
		condition: {
			onStart(pokemon, source, effect) {
				if (effect && effect.effectType === 'Move' && effect.id === 'Curse') {
					this.add('-start', pokemon, 'Curse', '[of] ' + source);
				} else this.add('-message', 'A curse was placed on ' + pokemon.name + '!');
			},
			onResidualOrder: 10,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 4);
			},
		},
		secondary: null,
		target: "randomNormal",
		nonGhostTarget: "self",
		type: "Ghost",
		zMove: {effect: 'curse'},
		contestType: "Tough",
	},
	rapidspin: {
		num: 229,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Rapid Spin",
		pp: 40,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'gmaxcrystalhail'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'gmaxcrystalhail'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
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
	gmaxwindrage: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Wind Rage",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Corviknight",
		self: {
			onHit(source) {
				let success = false;
				const removeTarget = [
					'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'gmaxcrystalhail',
				];
				const removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'gmaxcrystalhail'];
				for (const targetCondition of removeTarget) {
					if (source.side.foe.removeSideCondition(targetCondition)) {
						if (!removeAll.includes(targetCondition)) continue;
						this.add('-sideend', source.side.foe, this.dex.getEffect(targetCondition).name, '[from] move: G-Max Wind Rage', '[of] ' + source);
						success = true;
					}
				}
				for (const sideCondition of removeAll) {
					if (source.side.removeSideCondition(sideCondition)) {
						this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: G-Max Wind Rage', '[of] ' + source);
						success = true;
					}
				}
				this.field.clearTerrain();
				return success;
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Flying",
		contestType: "Cool",
	},
	defog: {
		num: 432,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Defog",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'gmaxcrystalhail',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'gmaxcrystalhail',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.getEffect(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: Defog', '[of] ' + source);
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
	courtchange: {
		num: 756,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Court Change",
		pp: 10,
		priority: 0,
		flags: {mirror: 1},
		onHitField(target, source) {
			const sourceSide = source.side;
			const targetSide = source.side.foe;
			const sideConditions = [
				'mist', 'lightscreen', 'reflect', 'spikes', 'safeguard', 'tailwind', 
				'toxicspikes', 'stealthrock', 'waterpledge', 'firepledge', 'grasspledge', 'stickyweb', 'auroraveil', 'gmaxsteelsurge', 
				'gmaxcannonade', 'gmaxvinelash', 'gmaxwildfire', 'gmaxswamp', 'gmaxcrystalhail', 
			];
			let success = false;
			for (const id of sideConditions) {
				const effectName = this.dex.getEffect(id).name;
				if (sourceSide.sideConditions[id] && targetSide.sideConditions[id]) {
					[sourceSide.sideConditions[id], targetSide.sideConditions[id]] = [
						targetSide.sideConditions[id], sourceSide.sideConditions[id],
					];
					this.add('-sideend', sourceSide, effectName, '[silent]');
					this.add('-sideend', targetSide, effectName, '[silent]');
				} else if (sourceSide.sideConditions[id] && !targetSide.sideConditions[id]) {
					targetSide.sideConditions[id] = sourceSide.sideConditions[id];
					delete sourceSide.sideConditions[id];
					this.add('-sideend', sourceSide, effectName, '[silent]');
				} else if (targetSide.sideConditions[id] && !sourceSide.sideConditions[id]) {
					sourceSide.sideConditions[id] = targetSide.sideConditions[id];
					delete targetSide.sideConditions[id];
					this.add('-sideend', targetSide, effectName, '[silent]');
				} else {
					continue;
				}
				let sourceLayers = sourceSide.sideConditions[id] ? (sourceSide.sideConditions[id].layers || 1) : 0;
				let targetLayers = targetSide.sideConditions[id] ? (targetSide.sideConditions[id].layers || 1) : 0;
				for (; sourceLayers > 0; sourceLayers--) {
					this.add('-sidestart', sourceSide, effectName, '[silent]');
				}
				for (; targetLayers > 0; targetLayers--) {
					this.add('-sidestart', targetSide, effectName, '[silent]');
				}
				success = true;
			}
			if (!success) return false;
			this.add('-activate', source, 'move: Court Change');
		},
		secondary: null,
		target: "all",
		type: "Normal",
	},
	
	//New Gmax moves: 
	gmaxbeheading: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Beheading",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Scyther",
		self: {
			onHit(source) {
				this.field.setTerrain('gmaxbeheading');
			},
		},
		condition: {
			duration: 5,
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Bug') {
					this.debug('G-Max Beheading boost');
					return this.chainModify(2);
				}
			},
			onStart(battle, source, effect) {
				this.add('-fieldstart', 'move: G-Max Beheading');
			},
			onEnd() {
				this.add('-fieldend', 'move: G-Max Beheading');
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Bug",
		contestType: "Tough",
	},
	gmaxhornsharpening: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Horn Sharpening",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Heracross",
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (const pokemon of source.side.active) {
					this.boost({spe: 1, accuracy: 1}, pokemon);
				}
			},
		},
		target: "adjacentFoe",
		type: "Bug",
		contestType: "Tough",
	},
	gmaxrockcrash: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Rock Crash",
		pp: 10,
		priority: 0,
		flags: {contact: 1},
		isMax: "Lycanroc-Dusk",
		secondary: null,
		target: "adjacentFoe",
		type: "Rock",
		contestType: "Cool",
	},
	gmaxanion: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Anion",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Magnezone",
		onEffectiveness(typeMod, target, type) {
			if (type === 'Steel') return 1;
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Steel",
		contestType: "Clever",
	},
	gmaxsubzerofossil: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Subzero Fossil",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Arctozolt",
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (const pokemon of source.side.foe.active) {
					this.boost({spe: -1}, pokemon);
				}
				for (const pokemon of source.side.active) {
					this.boost({atk: 1}, pokemon);
				}
			},
		},
		target: "adjacentFoe",
		type: "Ice",
		contestType: "Cool",
	},
	gmaxvenomousstrike: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Venomous Strike",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Scolipede",
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('toxicspikes');
				source.side.foe.addSideCondition('toxicspikes');
			},
		},
		ignoreImmunity: true,
		secondary: null,
		target: "adjacentFoe",
		type: "Poison",
		contestType: "Clever",
	},
	gmaxcoralcurse: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Coral Curse",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Cursola",
		volatileStatus: 'gmaxcoralcurse',
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (const pokemon of source.side.foe.active) {
					if (source.volatiles['gmaxcoralcurse']) return;
					pokemon.addVolatile('gmaxcoralcurse');
				}
			},
		},
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				return 5;
			},
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: G-Max Coral Curse');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.getMove(moveSlot.id).flags['heal']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (move.flags['heal'] && !move.isZ && !move.isMax) {
					this.add('cant', pokemon, 'move: G-Max Coral Curse', move);
					return false;
				}
			},
			onResidualOrder: 17,
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: G-Max Coral Curse');
			},
			onTryHeal(damage, target, source, effect) {
				if ((effect?.id === 'zpower') || this.effectData.isZ) return damage;
				return false;
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Ghost",
		contestType: "Beautiful",
	},
	gmaxconstructionhazards: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Construction Hazards",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Excadrill",
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('spikes');
				source.side.foe.addSideCondition('stealthrock');
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Ground",
		contestType: "Tough",
	},
	/*
	gmaxdarkerpursuit: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the pursuit succeeds
			if (target.beingCalledBack) {
				this.debug('Pursuit damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Darker Pursuit",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Tyranitar",
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side === pokemon.side) continue;
				side.addSideCondition('pursuit', pokemon);
				const data = side.getSideConditionData('pursuit');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack) move.accuracy = true;
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('pursuit');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Pursuit start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectData.sources) {
					if (!this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Pursuit');
						alreadyAdded = true;
					}
					// Run through each action in queue to check if the Pursuit user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (source.canMegaEvo || source.canUltraBurst) {
						for (const [actionIndex, action] of this.queue.entries()) {
							if (action.pokemon === source && action.choice === 'megaEvo') {
								this.runMegaEvo(source);
								this.queue.list.splice(actionIndex, 1);
								break;
							}
						}
					}
					this.runMove('pursuit', source, this.getTargetLoc(pokemon, source));
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Dark",
		contestType: "Cool",
	},
	*/
	gmaxoperetta: {
		num: 1000,
		accuracy: true,
		basePower: 160,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Operetta",
		pp: 10,
		priority: 0,
		flags: {sound: 1},
		isMax: "Primarina",
		secondary: null,
		target: "adjacentFoe",
		type: "Fairy",
		contestType: "Beautiful",
	},
	gmaxdoomsday: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Doomsday",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Jirachi",
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					if (!pokemon.side.addSlotCondition(pokemon, 'futuremove')) return false;
					Object.assign(pokemon.side.slotConditions[pokemon.position]['futuremove'], {
						move: 'doomdesire',
						source: source,
						moveData: {
							id: 'doomdesire',
							name: "Doom Desire",
							accuracy: 100,
							basePower: 140,
							category: "Special",
							priority: 0,
							flags: {},
							effectType: 'Move',
							isFutureMove: true,
							type: 'Steel',
						},
					});
					this.add('-start', source, 'Doom Desire');
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Steel",
		contestType: "Cool",
	},
	/*
	gmaxkaleidoscope: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	*/
	gmaxgreentea: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Green Tea",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Polteageist",
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					pokemon.trySetStatus('brn', source);
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Grass",
		contestType: "Cool",
	},
	/*
	gmaxlandtremble: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	gmaxmoonsault: {
		num: 1000,
		accuracy: true,
		basePower: 160,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	gmaxsharpenediceberg: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	gmaxarrowraid: {
		num: 1000,
		accuracy: true,
		basePower: 160,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	gmaxfutureshock: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	gmaxbugshield: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	gmaxmeddling: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	gmaxbellyswirl: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	gmaxgaleforce: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	gmaxpetalshake: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	gmaxconversionseizure: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	gmaxkeylock: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	gmaxshellshock: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	gmaxpuffup: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	gmaxgravedig: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	gmaxbeastlyiron: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	*/
	gmaxcruelchill: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Cruel Chill",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Articuno-Galar",
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Ice', type);
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Psychic",
		contestType: "Cool",
	},
	/*
	gmaxsparkingstrikes: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	gmaxdevastation: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	gmaxrebellion: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	gmaxrecoil: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	gmaxdesolatingdrought: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	gmaxdrizzlingdownpour: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	*/
	gmaxcrystalhail: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Crystal Hail",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Aurorus",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "G-Max Steelsurge", target);
		},
		self: {
			onHit(source) {
				this.field.setWeather('hail');
				source.side.foe.addSideCondition('gmaxcrystalhail');
			}
		},
		condition: {
			onStart(side) {
				this.add('-sidestart', side, 'move: G-Max Crystal Hail');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyboots')) return;
				// Ice Face and Disguise correctly get typed damage from Stealth Rock
				// because Stealth Rock bypasses Substitute.
				// They don't get typed damage from Crystal Hail because Crystal Hail doesn't,
				// so we're going to test the damage of an Ice-type Stealth Rock instead.
				const steelHazard = this.dex.getActiveMove('Stealth Rock');
				steelHazard.type = 'Ice';
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(steelHazard), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Ice",
		contestType: "Cool",
	},
	gmaxslimeslide: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Slime Slide",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Quagsire",
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					pokemon.trySetStatus('psn', source);
					this.boost({spe: -1}, pokemon);
				}
		},
		target: "adjacentFoe",
		type: "Water",
		contestType: "Cool",
	},
	/*
	gmaxazureflare: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	gmaxbreakdown: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	*/
	gmaxshootingstar: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Shooting Star",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Starmie",
		volatileStatus: 'gmaxshootingstar',
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (const pokemon of source.side.active) {
					this.boost({spd: 2}, pokemon);
				}
				for (const pokemon of source.side.foe.active) {
					if (pokemon.volatiles['gmaxshootingstar']) return;
					pokemon.addVolatile('gmaxshootingstar');
				}
			}
		},
		condition: {
			duration: 3,
			onStart(target) {
				if (['Diglett', 'Dugtrio', 'Palossand', 'Sandygast'].includes(target.baseSpecies.baseSpecies) ||
						target.baseSpecies.name === 'Gengar-Mega') {
					this.add('-immune', target);
					return null;
				}
				if (target.volatiles['smackdown'] || target.volatiles['ingrain']) return false;
				this.add('-start', target, 'G-Max Shooting Star');
			},
			onAccuracyPriority: -1,
			onAccuracy(accuracy, target, source, move) {
				if (move && !move.ohko) return true;
			},
			onImmunity(type) {
				if (type === 'Ground') return false;
			},
			onUpdate(pokemon) {
				if (pokemon.baseSpecies.name === 'Gengar-Mega') {
					delete pokemon.volatiles['gmaxshootingstar'];
					this.add('-end', pokemon, 'G-Max Shooting Star', '[silent]');
				}
			},
			onResidualOrder: 16,
			onEnd(target) {
				this.add('-end', target, 'G-Max Shooting Star');
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Psychic",
		contestType: "Beautiful",
	},
	gmaxswamp: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Swamp",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Gastrodon", 
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Steam Eruption", target);
		},
		sideCondition: 'gmaxswamp',
		condition: {
			duration: 4,
			durationCallback: function(target, source, effect) {
				if (source && source.hasAbility('persistent')) {
					return 6;
				}
				return 4;
			},
			onStart(targetSide): {
				this.add('-sidestart', targetSide, 'move: G-Max Swamp');
			},
			onModifySpe: function(spe, pokemon) {
				return this.chainModify(0.5);
			},
			onResidualOrder: 21,
			onResidualSubOrder: 4,
			onEnd(targetSide): {
				this.add('-sideend', targetSide, 'move: G-Max Swamp');
			},
		},
		target: "adjacentFoe",
		type: "Water",
		contestType: "Tough",
	},
	gmaxmountaincrash: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Mountain Crash",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Regirock",
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (const pokemon of source.side.foe.active) {
					this.boost({def: -1}, pokemon);
				}
				this.field.setWeather('sandstorm');
			}
		},
		target: "adjacentFoe",
		type: "Rock",
		contestType: "Cool",
	},
	gmaxiceage: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Ice Age",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Regice",
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (const pokemon of source.side.foe.active) {
					this.boost({spd: -1}, pokemon);
				}
				this.field.setWeather('hail');
			}
		 },
		target: "adjacentFoe",
		type: "Ice",
		contestType: "Cool",
	},
	gmaxmolteniron: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Molten Iron",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Registeel",
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					pokemon.trySetStatus('brn', source);
				}
			}
		},
		target: "adjacentFoe",
		type: "Steel",
		contestType: "Cool",
	},
	gmaxhaywire: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Haywire",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Xurkitree",
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					pokemon.addVolatile('partiallytrapped', source, this.dex.getActiveMove('G-Max Haywire'));
					this.boost({spe: -2}, pokemon);
				}
			}
		},
		target: "adjacentFoe",
		type: "Grass",
		contestType: "Cool",
	},
	/*
	gmaxsupernova: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	*/
	gmaxmistymayhem: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Misty Mayhem",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Latias",
		self: {
			sideCondition: 'mist',
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				this.field.setTerrain('mistyterrain');
				for (const pokemon of source.side.foe.active) {
					this.boost({spa: -1}, pokemon);
				}
			}
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Fairy",
		contestType: "Cool",
	},
	/*
	gmaxdescendingdragon: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	
	gmaxevoglace: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	*/
	gmaxsoulraze: {
		num: 1000,
		accuracy: true,
		basePower: 100,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Soulraze",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Chandelure",
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					if (!pokemon.volatiles['curse']) {
						pokemon.addVolatile('curse');
					}
				}
			}
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Ghost",
		contestType: "Cool",
	},
	/*
	gmaxrobbery: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	gmaxpetalrain: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	gmaxslimesplash: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	*/
	gmaxpollenrain: {
		num: 1000,
		accuracy: true,
		basePower: 30,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Pollen Rain",
		pp: 10,
		priority: 0,
		flags: {},
		multihit: 5,
		isMax: "Ribombee",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Pollen Puff", target);
			this.add('-anim', source, "Powder", target);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Fairy') return 1;
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Bug",
		contestType: "Clever",
	},
	/*
	gmaxshrewdspirit: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	gmaxcourageousspirit: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "",
		secondary: null,
		target: "adjacentFoe",
		type: "",
		contestType: "Cool",
	},
	*/
};