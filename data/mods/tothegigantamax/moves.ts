export const Moves: {[k: string]: ModdedMoveData} = {
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
		isNonstandard: "Gigantamax",
		name: "G-Max Anion",
		pp: 10,
		priority: 0,
		flags: {},
		isMax: "Magnezone",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Charge", target);
			this.add('-anim', source, "Steel Beam", target);
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
	gmaxgreentea: {
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
	gmaxcruelchill: {
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
	gmaxcrystalhail: {
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
	gmaxslimeslide: {
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
	gmaxshootingstar: {
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
	gmaxswamp: {
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
	gmaxmountaincrash: {
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
	gmaxiceage: {
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
	gmaxmolteniron: {
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
	gmaxhaywire: {
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
	gmaxmistymayhem: {
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
};
