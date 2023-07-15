export const Moves: {[k: string]: ModdedMoveData} = {
	ballroomtwirl: {
		num: 827,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		name: "Ballroom Twirl",
		shortDesc: "Type varies based on the user's secondary type. Transforms Ooreina between formes.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, dance: 1},
		onModifyType(move, pokemon) {
			let type = pokemon.types[1];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		onAfterMove(pokemon, target, move) {
			if (pokemon.species.id === 'ooreina') {
				const forme = 'Ooreina-Flare';
				pokemon.formeChange(forme);
				this.hint("Ooreina twirled into Flare Forme!");
			} else if (pokemon.species.id === 'ooreinaflare') {
				const forme1 = 'Ooreina';
				pokemon.formeChange(forme1);
				this.hint("Ooreina twirled into Romance Forme!");
			}
			return;
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
	},
	batteryfailure: {
		num: 832,
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		name: "Battery Failure",
		desc: "Whether or not this move is successful and even if it would cause fainting, the user loses 1/2 of its maximum HP, rounded up, unless the user has the Magic Guard Ability. This move is prevented from executing and the user does not lose HP if any active Pokemon has the Damp Ability, or if this move is Fire type and the user is affected by Powder or the weather is Primordial Sea.",
		shortDesc: "User loses 50% max HP.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		mindBlownRecoil: true,
		onAfterMove(pokemon, target, move) {
			if (move.mindBlownRecoil && !move.multihit) {
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.getEffect('Plasma Fists'), true);
			}
		},
		secondary: null,
		target: "normal",
		type: "Electric",
	},
	bellow: {
		num: 1000,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Bellow",
		shortDesc: "Raises the user's SpAtk by 3, lowers Def and SpDef by 1.",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			spa: 3,
			def: -1,
			spd: -1,
		},
		secondary: null,
		target: "self",
		type: "Fighting",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cool",
	},
	cryosleep: {
		num: 833,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Cryosleep",
		desc: "This move charges on the first turn and heals 1/2 of the user's maximum HP, rounded half up, on the second. Raises the user's Defense by 1 stage on the first turn. If the user is holding a Power Herb, the move completes in one turn.",
		shortDesc: "Raises user's Defense by 2 on turn 1. Heals the user by 50% of its max HP turn 2.",
		prepare: "[POKEMON] is absorbing power!",
		pp: 10,
		priority: 0,
		flags: {charge: 1, heal:1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({def: 2}, attacker, attacker, move);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Ice",
		contestType: "Tough",
	},
	engulf: {
		num: 1003,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			const targetWeight = target.getWeight();
			const pokemonWeight = pokemon.getWeight();
			if (pokemonWeight > targetWeight * 5) {
				return 140;
			}
			if (pokemonWeight > targetWeight * 4) {
				return 120;
			}
			if (pokemonWeight > targetWeight * 3) {
				return 100;
			}
			if (pokemonWeight > targetWeight * 2) {
				return 80;
			}
			return 60;
		},
		category: "Physical",
		name: "Engulf",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, nonsky: 1},
		onTryHit(target, pokemon, move) {
			if (target.volatiles['dynamax']) {
				this.add('-fail', pokemon, 'Dynamax');
				this.attrLastMove('[still]');
				return null;
			}
		},
		secondary: null,
		target: "normal",
		type: "Water",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Tough",
	},
	feudalharpoon: {
		num: 830,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Feudal Harpoon",
		desc: "Lowers the user's Defense and Special Defense by 1 stage.",
		shortDesc: "Lowers the user's Defense and Sp. Def by 1.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Tough",
	},
	invinciblewill: {
		num: 829,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Invincible Will",
		desc: "Raises the user's Attack, Defense, and Special Defense by 1 stage. User recovers 1/16 max HP per turn.",
		shortDesc: "Raises the user's Attack, Defense, and Special Defense by 1. User recovers 1/16 max HP per turn.",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		boosts: {
			atk: 1,
			def: 1,
			spd: 1,
		},
		volatileStatus: 'invinciblewill',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Invincible Will');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 16);
			},
		},
		secondary: null,
		secondary: null,
		target: "self",
		type: "Ground",
		contestType: "Cool",
	},
	mindsurge: {
		num: 831,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Mind Surge",
		desc: "If the target lost HP, the user takes recoil damage equal to 33% the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 33% recoil.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [33, 100],
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	planetarycrash: {
		num: 1002,
		accuracy: 80,
		basePower: 120,
		category: "Special",
		name: "Planetary Crash",
		shortDesc: "User takes 50% of max HP if it misses. Phys if Atk > Sp. Atk",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		hasCrashDamage: true,
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.getEffect('High Jump Kick'));
		},
		secondary: null,
		type: "Rock",
		contestType: "Cool",
	},
	restlesshorrors: {
		num: 828,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Restless Horrors",
		shortDesc: "Puts the target to sleep after 1 turn.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target) {
			if (target.status || !target.runStatusImmunity('slp')) return;
			if (this.random(2) === 0) return;
			target.addVolatile('yawn');
		},
		onAfterSubDamage(damage, target) {
			if (target.status || !target.runStatusImmunity('slp')) return;
			if (this.random(2) === 0) return;
			target.addVolatile('yawn');
		},
		type: "Poison",
		contestType: "Cool",
	},
	triplekick: {
		num: 167,
		accuracy: 90,
		basePower: 15,
		basePowerCallback(pokemon, target, move) {
			return 15 * move.hit;
		},
		category: "Physical",
		name: "Triple Kick",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 3,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMove: {basePower: 120},
		maxMove: {basePower: 80},
		contestType: "Cool",
	},
	terrifyingthunderstomp: {
		num: 1004,
		accuracy: true,
		basePower: 210,
		category: "Physical",
		name: "Terrifying Thunderstomp",
		shortDesc: "Ignores abilities.",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "doderriumz",
		ignoreAbility: true,
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	legendarylandslide: {
		num: 1005,
		accuracy: true,
		basePower: 185,
		category: "Physical",
		name: "Legendary Landslide",
		shortDesc: "Sets Grassy Terrain.",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "kingphaniumz",
		secondary: null,
		self: {
			onHit(source) {
				this.field.setTerrain('grassyterrain');
			},
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	meltdownmetamorphosis: {
		num: 1006,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Meltdown Metamorphosis",
		shortDesc: "Toxics and heals completely.",
		pp: 1,
		priority: 0,
		flags: {},
		status: 'tox',
		self: {
			onHit(target, source, move) {
				for (const pokemon of source.side.active) {
					this.heal(pokemon.maxhp, pokemon, source, move);
				}
			},
		},
		isZ: "skuntoniumz",
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Cool",
	},
	searingstomachacid: {
		num: 1007,
		accuracy: true,
		basePower: 170,
		category: "Physical",
		name: "Searing Stomach Acid",
		shortDesc: "Raises Atk by 2 stages and Spe by 1 stage.",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "croantagiumz",
		secondary: {
			chance: 100,
			self: {
				boosts: {
					atk: 2,
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	menacingmindbreak: {
		num: 1008,
		accuracy: true,
		basePower: 150,
		category: "Special",
		defensiveCategory: "Physical",
		name: "Menacing Mindbreak",
		shortDesc: "Sets a Light Screen.",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "strigniumz",
		self: {
			sideCondition: 'lightscreen',
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	satellitesmash: {
		num: 1009,
		accuracy: true,
		basePower: 170,
		category: "Physical",
		name: "Satellite Smash",
		shortDesc: "Ignores Ground immunities; sets gravity.",
		pp: 1,
		priority: 0,
		flags: {contact: 1},
		isZ: "solrockiumz",
		self: {
			pseudoWeather: 'gravity',
		},
		onEffectiveness(typeMod, target, type, move) {
			if (move.type !== 'Ground') return;
			if (!target) return; // avoid crashing when called from a chat plugin
			// ignore effectiveness if the target is Flying type and immune to Ground
			if (!target.runImmunity('Ground')) {
				if (target.hasType('Flying')) return 0;
			}
		},
		ignoreImmunity: {'Ground': true},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Cool",
	},
	lunarlaserbeam: {
		num: 1010,
		accuracy: true,
		basePower: 210,
		category: "Special",
		name: "Lunar Laserbeam",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "lunatoniumz",
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	brainiacbeatdown: {
		num: 1011,
		accuracy: true,
		basePower: 150,
		category: "Physical",
		name: "Brainiac Beatdown",
		shortDesc: "Sets Trick Room.",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "hippothagoriumz",
		self: {
			pseudoWeather: 'trickroom',
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	smolderingstampede: {
		num: 1012,
		accuracy: true,
		basePower: 185,
		category: "Physical",
		name: "Smoldering Stampede",
		shortDesc: "Sets Wildfire.",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "stampyriumz",
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('gmaxwildfire');
			},
		},
		condition: {
			duration: 4,
			onStart(targetSide) {
				this.add('-sidestart', targetSide, 'G-Max Wildfire');
			},
			onResidualOrder: 5,
			onResidualSubOrder: 1.1,
			onResidual(targetSide) {
				for (const pokemon of targetSide.active) {
					if (!pokemon.hasType('Fire')) this.damage(pokemon.baseMaxhp / 6, pokemon);
				}
			},
			onEnd(targetSide) {
				for (const pokemon of targetSide.active) {
					if (!pokemon.hasType('Fire')) this.damage(pokemon.baseMaxhp / 6, pokemon);
				}
				this.add('-sideend', targetSide, 'G-Max Wildfire');
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	hypnotichysteria: {
		num: 1013,
		accuracy: true,
		basePower: 150,
		category: "Physical",
		name: "Hypnotic Hysteria",
		shortDesc: "Replaces target's item with Sticky Barb.",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "grizzealiumz",
		onTryImmunity(target) {
			return !target.hasAbility('stickyhold');
		},
		onHit(target, source, move) {
			const hItem = "stickybarb";
			if (target.takeItem() && hItem) {
				target.setItem(hItem);
				this.add('-item', target, hItem.name, '[from] move: Hypnotic Hysteria');
			}
			else {
				return
			}
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	banefulbladedance: {
		num: 1014,
		accuracy: true,
		basePower: 160,
		category: "Special",
		name: "Baneful Blade Dance",
		shortDesc: "Guarantees critical hits.",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "odonagiumz",
		self: {
			onHit(source) {
				for (const pokemon of source.side.active) {
					pokemon.addVolatile('banefulbladedance');
				}
			},
		},
		condition: {
			noCopy: true,
			onStart(target, source, effect) {
				if (!['imposter', 'psychup', 'transform'].includes(effect?.id)) {
					this.add('-start', target, 'move: Baneful Blade Dance');
				}
			},
			onModifyCritRatio(critRatio) {
				return critRatio + 3;
			},
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Cool",
	},
	implosion: {
		num: 153,
		accuracy: 100,
		basePower: 150,
		category: "Special",
		name: "Implosion",
		shortDesc: "Hits adjacent Pokemon. The user faints.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		selfdestruct: "always",
		secondary: null,
		target: "allAdjacent",
		type: "Ghost",
		contestType: "Beautiful",
	},
	terraforming: {
		num: 1015,
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		name: "Terraforming",
		shortDesc: "Fails if there is no weather active. Ends the weather.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryHit() {
			if (this.field.isWeather('')) return false;
		},
		onHit() {
			this.field.clearWeather();
		},
		secondary: null,
		target: "normal",
		type: "Ground",
	},
	vacuum: {
		num: 1016,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Vacuum",
		shortDesc: "For 5 turns, space powers Ghost/Flying moves.",
		desc: "For 5 turns, the vacuum of space powers Ghost and Flying-type moves, and weakens Ground and Rock-type moves.",
		pp: 5,
		priority: 1,
		flags: {},
		weather: 'vacuum',
		secondary: null,
		target: "all",
		type: "Ghost",
		zMove: {boost: {spe: 1}},
		contestType: "Beautiful",
	},
	lasersword: {
		num: 1017,
		accuracy: 100,
		basePower: 140,
		category: "Physical",
		name: "Laser Sword",
		shortDesc: "Last Resort but Steel-type.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTry(pokemon, target) {
			if (pokemon.moveSlots.length < 2) return false; // Last Resort fails unless the user knows at least 2 moves
			let hasLastResort = false; // User must actually have Last Resort for it to succeed
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id === 'lasersword') {
					hasLastResort = true;
					continue;
				}
				if (!moveSlot.used) return false;
			}
			return hasLastResort;
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cute",
	},
	quickstep: {
		num: 1019,
		accuracy: 100,
		basePower: 30,
		basePowerCallback(pokemon, target, move) {
			return move.basePower + (20 * pokemon.boosts.spe);
		},
		category: "Physical",
		name: "Quickstep",
		shortDesc: "Power is equal to 30+(speed stages*30). Boosts Spe by 1.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
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
	heatstomp: {
		num: 1020,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the pursuit succeeds
			if (target.beingCalledBack) {
				this.debug('Heat Stomp damage boost');
				return move.basePower;
			}
			return move.basePower;
		},
		category: "Physical",
		name: "Heat Stomp",
		shortDesc: "If a foe is switching out, hits it and burns it.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, statusm: 1},
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side === pokemon.side) continue;
				side.addSideCondition('heatstomp', pokemon);
				const data = side.getSideConditionData('heatstomp');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack) {
				move.accuracy = true;
				target.trySetStatus('brn', source, move);
			}
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('heatstomp');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Heat Stomp start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectData.sources) {
					if (!this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Heat Stomp');
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
					this.runMove('heatstomp', source, this.getTargetLoc(pokemon, source));
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Clever",
	},
	cocoonfeeding: {
		num: 262,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Cocoon Feeding",
		shortDesc: "User faints. Incoming Pokemon gains +1 Def and +1 SpDef.",
		pp: 10,
		priority: 0,
		flags: {mirror: 1},
		onTryHit(pokemon, target, move) {
			if (!this.canSwitch(pokemon.side)) {
				delete move.selfdestruct;
				return false;
			}
		},
		slotCondition: 'cocoonfeeding',
		condition: {
			onSwap(target) {
				this.boost({def: 1});
				this.boost({spd: 1});
				target.side.removeSlotCondition(target, 'cocoonfeeding');
			},
		},
		selfdestruct: "ifHit",
		secondary: null,
		target: "self",
		type: "Bug",
		zMove: {effect: 'healreplacement'},
		contestType: "Tough",
	},
	changingtides: {
		num: 18,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Changing Tides",
		shortDesc: "If user.HP < target.HP, +1 Atk and SpAtk, and vice versa.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, pulse: 1, mirror: 1},
		onTryMove(attacker, defender, move) {
			if (defender.hp < attacker.hp) {
				this.boost({atk: -1}, attacker, attacker, move);
				this.boost({spa: -1}, attacker, attacker, move);
			}
			if (defender.hp > attacker.hp) {
				this.boost({atk: 1}, attacker, attacker, move);
				this.boost({spa: 1}, attacker, attacker, move);
			}
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Clever",
	},
	enroot: {
		num: 525,
		accuracy: 100,
		basePower: 110,
		category: "Special",
		name: "Enroot",
		shortDesc: "User recovers 50% of the damage dealt.",
		pp: 5,
		priority: -6,
		flags: {contact: 1, protect: 1, mirror: 1},
		drain: [1, 2],
		target: "allAdjacentFoes",
		type: "Grass",
		contestType: "Tough",
	},
	slipstream: {
		num: 332,
		accuracy: true,
		basePower: 55,
		basePowerCallback(pokemon, target, move) {
			if (!target.activeTurns) {
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		name: "Slipstream",
		shortDesc: "Does 2x dmg against a target that switched in this turn.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, distance: 1},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
	sacrifice: {
		num: 557,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		name: "Sacrifice",
		shortDesc: "Lowers the user's Speed by 1 stage.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				spe: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},
	tetrodotoxin: {
		num: 410,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Tetrodotoxin",
		shortDesc: "Usually goes first.",
		pp: 30,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Cool",
	},
	sharpscrape: {
		num: 789,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Sharp Scrape",
		shortDesc: "Lowers the target's SpDef by 1 stage.",
		pp: 5,
		priority: 0,
		flags: {sound: 1, protect: 1, mirror: 1, authentic: 1},
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Steel",
	},
	sluaghkiss: {
		num: 503,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Sluagh Kiss",
		shortDesc: "Has a 30% chance to poison the target.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, statusm: 1},
		thawsTarget: true,
		secondary: {
			chance: 30,
			status: 'psn',
		},
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
	},
	prehistoricfrenzy: {
		num: 573,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Prehistoric Frenzy",
		shortDesc: "Super effective on Fairy.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Fairy') return 1;
		},
		ignoreImmunity: {'Dragon': true},
		target: "normal",
		type: "Dragon",
		contestType: "Beautiful",
	},
	shadowmirror: {
		num: 712,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Shadow Mirror",
		shortDesc: "Steals target's boosts before dealing damage.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		stealsBoosts: true,
		// Boost stealing implemented in scripts.js
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	akashicbuster: {
		num: 1017,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Akashic Buster",
		shortDesc: "Doubles as a Fire-type move.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Fire', type);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
	},
	laplacetransform: {
		num: 468,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Laplace Transform",
		shortDesc: "Raises SpA and Accuracy by 1 stage. Z-move: Speed +1.",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			spa: 1,
			accuracy: 1,
		},
		secondary: null,
		target: "self",
		type: "Flying",
		zMove: {boost: {spe: 1}},
		contestType: "Cute",
	},
	wormhole: {
		num: 1018,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Worm Hole",
		shortDesc: "In Vacuum, doubles stat boosts.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target, source, move) {
			if (['vacuum'].includes(source.effectiveWeather())) {
				let i: BoostName;
				for (i in source.boosts) {
					source.boosts[i] = 2 * source.boosts[i];
				}
				this.add('-copyboost', source, target, '[from] move: Worm Hole');
			}
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	coldwave: {
		num: 1018,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Cold Wave",
		shortDesc: "Reduces opponent's SpDef by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Ice",
	},
	consume: {
		num: 229,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Consume",
		shortDesc: "Removes hazards. Fails if max HP. Heals 25% if hazards were removed.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryHit(target, source) {
			if (source.hp === source.maxhp) {
				this.add('-fail', source, 'heal');
				return null;
			}
		},
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Consume', '[of] ' + pokemon);
				this.heal(pokemon.maxhp / 4, pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Consume', '[of] ' + pokemon);
					this.heal(pokemon.maxhp / 4, pokemon);
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Consume', '[of] ' + pokemon);
				this.heal(pokemon.maxhp / 4, pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Consume', '[of] ' + pokemon);
					this.heal(pokemon.maxhp / 4, pokemon);
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	/*peekaboo: {
		num: 712,
		accuracy: 100,
		basePower: 0,
		damageCallback(pokemon) {
			return this.random(130);
		},
		category: "Special",
		name: "Peek-a-Boo",
		shortDesc: "Deals a random amount of damage and forces user out.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		/*onTryHit(pokemon, target, move, source) {
            if (!this.canSwitch(pokemon.side)) {
                return false;
            }
			source.forceSwitch();
			return;
		},
		self: {
			forceSwitch: true,
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},
	readyornot: {
		num: 712,
		accuracy: true,
		basePower: 0,
		damageCallback(pokemon) {
			return this.random(200);
		},
		category: "Special",
		name: "Ready or Not",
		shortDesc: "Deals a random amount of damage and omniboosts.",
		pp: 10,
		priority: 0,
		flags: {mirror: 1},
		onHit(target, source) {
			this.directDamage(source.maxhp / 2, source, source);
		},
		secondary: null,
		selfBoost: {
			boosts: {
				atk: 1,
				def: 1,
				spa: 1,
				spd: 1,
				spe: 1,
			},
		},
		isZ: "halloweeniumz",
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},*/
};
