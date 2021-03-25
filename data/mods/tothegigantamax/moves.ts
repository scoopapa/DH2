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
				'gmaxcannonade', 'gmaxvinelash', 'gmaxwildfire', 'gmaxswamp', 'gmaxcrystalhail', 'gmaxstinkbomb', 
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
	psychup: {
		num: 244,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Psych Up",
		pp: 10,
		priority: 0,
		flags: {authentic: 1, mystery: 1},
		onHit(target, source) {
			let i: BoostName;
			for (i in target.boosts) {
				source.boosts[i] = target.boosts[i];
			}
			const volatilesToCopy = ['focusenergy', 'gmaxchistrike', 'gmaxshrewdspirit', 'gmaxcourageousspirit', 'gmaxbenevolentspirit', 'gmaxvegetalsword', 'laserfocus'];
			for (const volatile of volatilesToCopy) {
				if (target.volatiles[volatile]) {
					source.addVolatile(volatile);
					if (volatile === 'gmaxchistrike') source.volatiles[volatile].layers = target.volatiles[volatile].layers;
				} else {
					source.removeVolatile(volatile);
				}
			}
			this.add('-copyboost', source, target, '[from] move: Psych Up');
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {effect: 'heal'},
		contestType: "Clever",
	},
	
	//New Gmax moves: 
	gmaxbeheading: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
      shortDesc: "Base move affects power. Bug-type move power doubled for 5 turns.",
		isNonstandard: "Gigantamax",
		name: "G-Max Beheading",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Scyther",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "String Shot", target);
			this.add('-anim', source, "X-Scissor", target);
		},
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
      shortDesc: "Base move affects power. Allies: +1 Spe & Acc.",
		isNonstandard: "Gigantamax",
		name: "G-Max Horn Sharpening",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Heracross",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rock Polish", target);
			this.add('-anim', source, "Megahorn", target);
		},
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
      shortDesc: "Base move affects power. Makes contact.",
		isNonstandard: "Gigantamax",
		name: "G-Max Rock Crash",
		pp: 10,
		priority: 0,
		flags: {contact: 1},
		isMax: "Lycanroc-Dusk",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Splintered Stormshards", target);
		},
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
      shortDesc: "Base move affects power. Super effective on Steel.",
		isNonstandard: "Gigantamax",
		name: "G-Max Anion",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Magnezone",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Charge", target);
			this.add('-anim', source, "Hyper Beam", target);
		},
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
      shortDesc: "Base move affects power. Allies: +1 Atk, Foes: -1 Spe.",
		isNonstandard: "Gigantamax",
		name: "G-Max Subzero Fossil",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Arctozolt",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Glacial Lance", target);
		},
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
      shortDesc: "Base move affects power. Sets 2 layers of Toxic Spikes, neutral on Steel.",
		isNonstandard: "Gigantamax",
		name: "G-Max Venomous Strike",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Scolipede",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Jab", target);
			this.add('-anim', source, "Corrosive Gas", target);
		},
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
      shortDesc: "Base move affects power. Foes: Inflicted with Heal Block.",
		isNonstandard: "Gigantamax",
		name: "G-Max Coral Curse",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Cursola",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poltergeist", target);
			this.add('-anim', source, "Heal Block", target);
		},
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
      shortDesc: "Base move affects power. Sets Spikes and Stealth Rock.",
		isNonstandard: "Gigantamax",
		name: "G-Max Construction Hazards",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Excadrill",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Spikes", target);
			this.add('-anim', source, "Stealth Rock", target);
			this.add('-anim', source, "Drill Run", target);
		},
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
      shortDesc: "Always 160 Power. Sound move.",
		isNonstandard: "Gigantamax",
		name: "G-Max Operetta",
		pp: 10,
		priority: 0,
		flags: {sound: 1},
		isMax: "Primarina",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Oceanic Operetta", target);
		},
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
      shortDesc: "Base move affects power. Summons a Doom Desire that hits 2 turns later.",
		isNonstandard: "Gigantamax",
		name: "G-Max Doomsday",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Jirachi",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Wish", target);
			this.add('-anim', source, "Flash Cannon", target);
		},
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

	gmaxkaleidoscope: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
      shortDesc: "Base move affects power. 2x damage on NVE.",
		isNonstandard: "Gigantamax",
		name: "G-Max Kaleidoscope",
		pp: 10,
		priority: 0,
		isMax: "Flygon",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mean Look", target);
			this.add('-anim', source, "Bug Buzz", target);
		},
      onEffectiveness(typeMod, target, type) {
         if (typeMod < 0) {
             this.debug('Ignoring resist');
             return 0;
         }
      },
		secondary: null,
		target: "adjacentFoe",
		type: "Bug",
		contestType: "Beautiful",
	},

	gmaxgreentea: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
      shortDesc: "Base move affects power. Foes: Burned.",
		isNonstandard: "Gigantamax",
		name: "G-Max Green Tea",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Polteageist",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Scald", target);
			this.add('-anim', source, "Hex", target);
		},
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
	
	gmaxlandtremble: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
      shortDesc: "Base move affects power. Allies: +2 Spe.",
		isNonstandard: "Gigantamax",
		name: "G-Max Land Tremble",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Rapidash-Galar",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Stomping Tantrum", target);
			this.add('-anim', source, "High Horsepower", target);
		},
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (const pokemon of source.side.active) {
					this.boost({spe: 2}, pokemon);
				}
			}
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Ground",
		contestType: "Cool",
	},
	gmaxmoonsault: {
		num: 1000,
		accuracy: true,
		basePower: 160,
		category: "Physical",
      shortDesc: "Always 160 Power. Allies: Lucky Chant.",
		isNonstandard: "Gigantamax",
		name: "G-Max Moonsault",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Incineroar",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Malicious Moonsault", target);
		},
		self: {
			sideCondition: 'luckychant',
			condition: {
			duration: 5,
			onStart(side) {
				this.add('-sidestart', side, 'move: Lucky Chant'); // "The crowd's applause shielded [side.name]'s team from critical hits!"
			},
			onCriticalHit: false,
			onResidualOrder: 21,
			onResidualSubOrder: 5,
			onEnd(side) {
				this.add('-sideend', side, 'move: Lucky Chant'); // "[side.name]'s applause died down!"
			},		
		 },
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Dark",
		contestType: "Beautiful",
	},
	gmaxsharpenediceberg: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
      shortDesc: "Base move affects power. Allies: +1 Spe and Hail.",
		isNonstandard: "Gigantamax",
		name: "G-Max Sharpened Iceberg",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Darmanitan-Galar",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rock Polish", target);
			this.add('-anim', source, "Icicle Crash", target);
		},
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (const pokemon of source.side.active) {
					this.boost({spe: 1}, pokemon);
				}
				this.field.setWeather('hail');
			}
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Ice",
		contestType: "Cool",
	},
	gmaxarrowraid: {
		num: 1000,
		accuracy: true,
		basePower: 160,
		category: "Physical",
      shortDesc: "Always 160 Power. Foes: Trapped.",
		isNonstandard: "Gigantamax",
		name: "G-Max Arrow Raid",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Decidueye",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sinister Arrow Raid", target);
		},
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					pokemon.addVolatile('trapped', source, null, 'trapper');
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Ghost",
		contestType: "Cool",
	},
/*
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
*/
	gmaxbugshield: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
      shortDesc: "Base move affects power. Foes: Powder.",
		isNonstandard: "Gigantamax",
		name: "G-Max Bug Shield",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Scizor",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Powder", target);
			this.add('-anim', source, "Bug Bite", target);
		},
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					if (pokemon.volatiles['powder']) return;
					pokemon.addVolatile('powder');
				}
			}
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Bug",
		contestType: "Beautiful",
	},
/*
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
*/
	gmaxkeylock: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
      shortDesc: "Base move affects power. Field: Trapped. Allies: +1 Def & SpD",
		isNonstandard: "Gigantamax",
		name: "G-Max Key Lock",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Klefki",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Steel Beam", target);
			this.add('-anim', source, "Fairy Lock", target);
		},
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (const pokemon of source.side.active) {
					this.boost({def: 1, spd: 1}, pokemon);
				}
				for (const pokemon of source.side.foe.active) {
					pokemon.addVolatile('trapped', source, null, 'trapper');
				}
				for (const pokemon of source.side.active) {
					pokemon.addVolatile('trapped', source, null, 'trapper');
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Steel",
		contestType: "Cool",
	},
	gmaxshellshock: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
      shortDesc: "Base move affects power. Sets 1 layer of Toxic Spikes & Psychic Terrain.",
		isNonstandard: "Gigantamax",
		name: "G-Max Shell Shock",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Slowbro-Galar",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Future Sight", target);
			this.add('-anim', source, "Gunk Shot", target);
		},
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				this.field.setTerrain('psychicterrain');
				source.side.foe.addSideCondition('toxicspikes');
			},
		},
		ignoreImmunity: true,
		secondary: null,
		target: "adjacentFoe",
		type: "Psychic",
		contestType: "Clever",
	},
	gmaxpuffup: {
      num: 1000,
      accuracy: true,
      basePower: 10,
      category: "Physical",
		shortDesc: "Base move affects power. Allies: Stockpile 1.",
      isNonstandard: "Gigantamax",
      name: "G-Max Puff Up",
      pp: 10,
		priority: 0,
      flags: {},
      isMax: "Jigglypuff",
      self: {
          onHit(source) {
              for (const pokemon of source.side.active) {
                  if (pokemon.volatiles['stockpile'] && pokemon.volatiles['stockpile'].layers >= 3) continue;
                  pokemon.addVolatile('stockpile'); 
              }
          },
      },
      secondary: null,
      target: "adjacentFoe",
      type: "Normal",
      contestType: "Cool",
  },
/*
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
      shortDesc: "Base move affects power. Combines Ice in its type effectiveness.",
		isNonstandard: "Gigantamax",
		name: "G-Max Cruel Chill",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Articuno-Galar",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Expanding Force", target);
			this.add('-anim', source, "Sheer Cold", target);
		},
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
      shortDesc: "Base move affects power. Foes: Ice hazard.",
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
      shortDesc: "Base move affects power. Foes: -1 Spe & Poisoned.",
		isNonstandard: "Gigantamax",
		name: "G-Max Slime Slide",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Quagsire",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acid Armor", target);
			this.add('-anim', source, "Waterfall", target);
		},
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					pokemon.trySetStatus('psn', source);
					this.boost({spe: -1}, pokemon);
				}
			}
		},
		target: "adjacentFoe",
		type: "Water",
		contestType: "Cool",
	},

	gmaxazureflare: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
      shortDesc: "Base move affects power. Foes: Gastro Acid.",
		isNonstandard: "Gigantamax",
		name: "G-Max Azure Flare",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Reshiram",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Blue Flare", target);
			this.add('-anim', source, "Hex", target);
		},
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					if (pokemon.volatiles['gastroacid']) return;
					pokemon.addVolatile('gastroacid');
				}
			}
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Fire",
		contestType: "Beautiful",
	},
	gmaxbreakdown: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
      shortDesc: "Base move affects power. Field: Burned.",
		isNonstandard: "Gigantamax",
		name: "G-Max Breakdown",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Obstagoon",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fiery Wrath", target);
			this.add('-anim', source, "Bulk Up", target);
		},
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					pokemon.trySetStatus('brn', source);
				}
				for (const pokemon of source.side.active) {
					pokemon.trySetStatus('brn', source);
				}
			}
		},
		target: "adjacentFoe",
		type: "Dark",
		contestType: "Cool",
	},
	gmaxshootingstar: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
      shortDesc: "Base move affects power. Allies : +2 SpD. Foes: Telekinesis.",
		isNonstandard: "Gigantamax",
		name: "G-Max Shooting Star",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Starmie",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Cosmic Power", target);
			this.add('-anim', source, "Psychic", target);
		},
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (const pokemon of source.side.active) {
					this.boost({spd: 2}, pokemon);
				}
				for (const pokemon of source.side.foe.active) {
					if (pokemon.volatiles['telekinesis']) return;
					pokemon.addVolatile('telekinesis');
				}
			}
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
      shortDesc: "Base move affects power. Foes: Swamp.",
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
			onStart(targetSide) {
				this.add('-sidestart', targetSide, 'move: G-Max Swamp');
			},
			onModifySpe: function(spe, pokemon) {
				return this.chainModify(0.5);
			},
			onResidualOrder: 21,
			onResidualSubOrder: 4,
			onEnd(targetSide) {
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
      shortDesc: "Base move affects power. Foes: -1 Def. Field: Sandstorm.",
		isNonstandard: "Gigantamax",
		name: "G-Max Mountain Crash",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Regirock",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rock Slide", target);
			this.add('-anim', source, "Max Rockfall", target);
		},
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
      shortDesc: "Base move affects power. Foes: -1 SpD. Field: Hail.",
		isNonstandard: "Gigantamax",
		name: "G-Max Ice Age",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Regice",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Avalanche", target);
			this.add('-anim', source, "Sheer Cold", target);
		},
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
      shortDesc: "Base move affects power. Foes: Burned.",
		isNonstandard: "Gigantamax",
		name: "G-Max Molten Iron",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Registeel",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Defense", target);
			this.add('-anim', source, "Flare Blitz", target);
		},
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
      shortDesc: "Base move affects power. Foes: -2 Spe & Wrapped.",
		isNonstandard: "Gigantamax",
		name: "G-Max Haywire",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Xurkitree",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Magnet Rise", target);
			this.add('-anim', source, "Leaf Storm", target);
		},
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					pokemon.addVolatile('partiallytrapped', source, this.dex.getActiveMove('Wrap'));
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
      shortDesc: "Base move affects power. Allies: Mist, Field: Misty Terrain, Foes: -1 SpA.",
		isNonstandard: "Gigantamax",
		name: "G-Max Misty Mayhem",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Latias",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Dance", target);
			this.add('-anim', source, "Mist Ball", target);
		},
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
		type: "Dragon",
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
*/	
gmaxevoglace: {
        num: 1000,
        accuracy: true,
        basePower: 10,
        category: "Physical",
      shortDesc: "Base move affects power. 2x damage on NVE and hits adjacent opponents.",
        isNonstandard: "Gigantamax",
        name: "G-Max Evo-Glace",
        pp: 10,
        priority: 0,
        isMax: "Glaceon",
        onPrepareHit: function(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Extreme Evoboost", target);
            this.add('-anim', source, "Blizzard", target);
        },
        onEffectiveness(typeMod, target, type) {
            if (typeMod < 0) {
                this.debug('Ignoring resist');
                return 0;
            }
        },
        secondary: null,
        target: "allAdjacentFoes",
        type: "Ice",
        contestType: "Beautiful",
    },
	
	gmaxsoulraze: {
		num: 1000,
		accuracy: true,
		basePower: 100,
		category: "Physical",
      shortDesc: "Base move affects power. Foes: Cursed.",
		isNonstandard: "Gigantamax",
		name: "G-Max Soulraze",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Chandelure",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Spite", target);
			this.add('-anim', source, "Hex", target);
		},
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
*/
	gmaxslimesplash: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
      shortDesc: "Base move affects power. Field: Weakens Fairy-type moves by 66%",
		isNonstandard: "Gigantamax",
		name: "G-Max Slime Splash",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Goodra",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Splash", target);
			this.add('-anim', source, "Muddy Water", target);
		},
		self: {
			pseudoWeather: 'gmaxslimesplash',
		},
		condition: {
			duration: 5,
			onStart(side, source) {
				this.add('-fieldstart', 'move: G-Max Slime Splash', '[of] ' + source);
			},
			onBasePowerPriority: 1,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Fairy') {
					this.debug('slime sport weaken');
					return this.chainModify([0x548, 0x1000]);
				}
			},
			onResidualOrder: 21,
			onEnd() {
				this.add('-fieldend', 'move: G-Max Slime Splash');
			},
		},
		target: "adjacentFoe",
		type: "Dragon",
		contestType: "Cool",
	},
	gmaxpollenrain: {
		num: 1000,
		accuracy: true,
		basePower: 30,
		category: "Physical",
      shortDesc: "Always 30 Power and always hits 5 times. Super effective on Fairy.",
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
	gmaxbenevolentspirit: {
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
	gmaxevoleaf: {
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
	gmaxreap: {
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
	gmaxdevestationalforce: {
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
	gmaxvenomousmoonlight: {
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
	gmaxstinkbomb: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
      shortDesc: "Base move affects power. Foes: Poison & -1/6 HP, 4 turns.",
		isNonstandard: "Gigantamax",
		name: "G-Max Stink Bomb",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Skuntank",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Toxic", target);
			this.add('-anim', source, "Sludge Bomb", target);
		},
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					pokemon.trySetStatus('psn', source);
				}
				source.side.foe.addSideCondition('gmaxstinkbomb');
			},
		},
		condition: {
			duration: 4,
			onStart(targetSide) {
				this.add('-sidestart', targetSide, 'G-Max Stink Bomb');
			},
			onResidualOrder: 5,
			onResidualSubOrder: 1.1,
			onResidual(targetSide) {
				for (const pokemon of targetSide.active) {
					if (!pokemon.hasType('Poison')) this.damage(pokemon.baseMaxhp / 6, pokemon);
				}
			},
			onEnd(targetSide) {
				for (const pokemon of targetSide.active) {
					if (!pokemon.hasType('Poison')) this.damage(pokemon.baseMaxhp / 6, pokemon);
				}
				this.add('-sideend', targetSide, 'G-Max Stink Bomb');
			},
		},
		target: "adjacentFoe",
		type: "Poison",
		contestType: "Cool",
	},
 
	gmaxgravitationalspike: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
      shortDesc: "Base move affects power. Foes: Telekinesis.",
		isNonstandard: "Gigantamax",
		name: "G-Max Gravitational Spike",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Giratina",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Shadow Force", target);
			this.add('-anim', source, "Gravity", target);
		},
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					if (pokemon.volatiles['telekinesis']) return;
					pokemon.addVolatile('telekinesis');
				}
			}
		},
		ignoreImmunity: true,
		secondary: null,
		target: "adjacentFoe",
		type: "Psychic",
		contestType: "Clever",
	},
	gmaxcrystalinecrash: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
      shortDesc: "Base move affects power. Allies: -1 Spe, +2 Atk.",
		isNonstandard: "Gigantamax",
		name: "G-Max Crystaline Crash",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Sandslash-Alola",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Power Gem", target);
			this.add('-anim', source, "Ice Punch", target);
		},
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (const pokemon of source.side.active) {
					this.boost({spe: -1, atk: 2}, pokemon);
				}
			},
		},
		target: "adjacentFoe",
		type: "Ice",
		contestType: "Tough",
	},
	gmaxstampede: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
      shortDesc: "Base move affects power. Allies: +1 Spe, Foes: Embargo.",
		isNonstandard: "Gigantamax",
		name: "G-Max Stampede",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Tauros",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Agility", target);
			this.add('-anim', source, "Stomp", target);
		},
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					if (pokemon.volatiles['embargo']) return;
					pokemon.addVolatile('embargo');
				}
				for (const pokemon of source.side.active) {
					this.boost({spe: 1}, pokemon);
				}
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Normal",
		contestType: "Beautiful",
	},
	gmaxbluestar: {
      num: 1000,
      accuracy: true,
      basePower: 110,
      category: "Physical",
      shortDesc: "Base move affects power. Super effective on Dark & Ghost. Allies: 0.5x damage taken from Dark & Ghost for 5 turns",
      isNonstandard: "Gigantamax",
      name: "G-Max Blue Star",
      pp: 10,
      priority: 0,
      flags: {},
      isMax: "Beheeyem",
      onPrepareHit: function(target, source, move) {
          this.attrLastMove('[still]');
          this.add('-anim', source, "Cosmic Power", target);
          this.add('-anim', source, "Draco Meteor", target);
      },
      onEffectiveness(typeMod, target, type) {
          if (type === 'Dark' || type === 'Ghost') return 1;
      },
      self: {
          onHit(source) {
              source.side.addSideCondition('gmaxbluestar');
          }
      },
      condition: {
          duration: 5,
          onStart(side) {
              this.add('-sidestart', side, 'move: G-Max Blue Star');
          },
          onAnyModifyDamage(damage, source, target, move) {
              if (target !== source && target.side === this.effectData.target && (move.type === 'Ghost' || move.type === 'Dark')) {
                  this.debug('GMax Blue Star weaken');
                  return this.chainModify(0.5);
              }
          },
          onResidualOrder: 21,
          onResidualSubOrder: 1,
          onEnd(side) {
              this.add('-sideend', side, 'move: G-Max Blue Star');
          },
      },
      ignoreImmunity: true,
      secondary: null,
      target: "adjacentFoe",
      type: "Psychic",
      contestType: "Clever",
  },
	gmaxbravery: {
		num: 1000,
		accuracy: true,
		basePower: 140,
		category: "Physical",
      shortDesc: "Always 140 BP. Allies: +1 Atk.",
		isNonstandard: "Gigantamax",
		name: "G-Max Bravery",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Sirfetch\u2019d",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Focus Energy", target);
			this.add('-anim', source, "Meteor Assault", target);
		},
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (const pokemon of source.side.active) {
					this.boost({atk: 1}, pokemon);
				}
			},
		},
		target: "adjacentFoe",
		type: "Fighting",
		contestType: "Tough",
	},
	gmaxpetrify: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
      shortDesc: "Base move affects power. Foes: Paralyzed & Rock-type.",
		isNonstandard: "Gigantamax",
		name: "G-Max Petrify",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Sudowoodo",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Glare", target);
			this.add('-anim', source, "Rock Wrecker", target);
		},
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					pokemon.trySetStatus('par', source);
					if (pokemon.getTypes().join() === 'Rock' || !pokemon.setType('Rock')) return false;
					this.add('-start', pokemon, 'typechange', 'Rock');
				}
			}
		},
		target: "adjacentFoe",
		type: "Rock",
		contestType: "Cool",
	},
/*
	gmaxdelusion: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
      shortDesc: "Base move affects power. Allies: +1 Acc. Field: Clear Skies.",
		isNonstandard: "Gigantamax",
		name: "G-Max Delusion",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Zoroark",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Night Daze", target);
			this.add('-anim', source, "Sunny Day", target);
		},
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (const pokemon of source.side.active) {
					this.boost({accuracy: 1}, pokemon);
				}
				this.field.setWeather('clearskies');
			}
		},
		target: "adjacentFoe",
		type: "Dark",
		contestType: "Cool",
	},
*/
	gmaxvegetalsword: {
      num: 1000,
      accuracy: true,
      basePower: 10,
      category: "Physical",
      shortDesc: "Base move affects power. Allies: +1 crit ratio & Atk",
      isNonstandard: "Gigantamax",
      name: "G-Max Vegetal Sword",
      pp: 10,
      priority: 0,
      flags: {},
      isMax: "Sceptile",
      onPrepareHit: function(target, source, move) {
          this.attrLastMove('[still]');
          this.add('-anim', source, "Swords Dance", target);
          this.add('-anim', source, "Petal Blizzard", target);
      },
      self: {
          onHit(source) {
              if (!source.volatiles['dynamax']) return;
              for (const pokemon of source.side.active) {
                  pokemon.addVolatile('gmaxvegetalsword');
                  this.boost({atk: 1}, pokemon);
              }
          },
      },
      condition: {
          noCopy: true,
          onStart(target, source, effect) {
              this.effectData.layers = 1;
              if (!['imposter', 'psychup', 'transform'].includes(effect?.id)) {
                  this.add('-start', target, 'move: G-Max Vegetal Sword');
              }
          },
          onRestart(target, source, effect) {
              if (this.effectData.layers >= 3) return false;
              this.effectData.layers++;
              if (!['imposter', 'psychup', 'transform'].includes(effect?.id)) {
                  this.add('-start', target, 'move: G-Max Vegetal Sword');
              }
          },
          onModifyCritRatio(critRatio) {
              return critRatio + this.effectData.layers;
          },
      },
      target: "adjacentFoe",
      type: "Grass",
      contestType: "Cool",
  },
};
