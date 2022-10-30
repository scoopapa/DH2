export const Moves: {[moveid: string]: MoveData} = {
	technoblast: {
		num: 546,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Techno Blast",
		pp: 5,
		priority: 0,
		flags: {},
		onModifyMove(move, pokemon) {
			if (pokemon.hasItem('burndrive')) {
				move.basePower *= 1.5;
				move.type = 'Fire';
			} else if (pokemon.hasItem('chilldrive')) {
				move.basePower *= 1.5;
				move.type = 'Ice';
			} else if (pokemon.hasItem('dousedrive')) {
				move.basePower *= 1.5;
				move.type = 'Water';
			} else if (pokemon.hasItem('shockdrive')) {
				move.basePower *= 1.5;
				move.type = 'Electric';
			}
		},
		secondary: {
			chance: 30,
			onHit(target, pokemon, move) {
				if (pokemon.hasItem('burndrive')) {
					this.boost({atk: -1}, target);
				}
				else if (pokemon.hasItem('chilldrive')) {
					this.boost({spa: -1}, target);
				}
				else if (pokemon.hasItem('dousedrive')) {
					this.boost({spd: -1}, target);
				}
				else if (pokemon.hasItem('shockdrive')) {
					this.boost({spe: -1}, target);
				}
			}
		},
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	freezeshock: {
		num: 553,
		accuracy: 90,
		basePower: 85,
		category: "Physical",
		name: "Freeze Shock",
		shortDesc: "30% chance to paralyze the target.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	iceburn: {
		num: 554,
		accuracy: 90,
		basePower: 85,
		category: "Special",
		name: "Ice Burn",
		shortDesc: "30% chance to burn the target.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	wickedblow: {
		num: 817,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Wicked Blow",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, punch: 1, mirror: 1},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	aeroblast: {
		num: 177,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Aeroblast",
		shortDesc: "Lowers the user's Defense and Sp. Def by 1.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1},
		self: {
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		target: "any",
		type: "Flying",
		contestType: "Cool",
	},
	psystrike: {
		num: 540,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Psystrike",
		shortDesc: "Ignores Dark-type immunity under Psychic Terrain.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, source) {
			if (this.field.isTerrain('psychicterrain') && source.isGrounded()) {
				move.ignoreImmunity = {'Psychic': true};
			}
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	fusionbolt: {
		num: 559,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		shortDesc: "If a Pokémon in the user's party has Fusion Flare; 1.3x power & 20% chance to burn.",
		name: "Fusion Bolt",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower, pokemon, move) {
			for (const ally of pokemon.side.pokemon) {
				if (!ally || ally.fainted) continue;
				for (const moveSlot of ally.moveSlots) {
					const move = this.dex.getMove(moveSlot.move);
					if (move.id === 'fusionflare') continue;
					this.debug('double power');
					return this.chainModify(1.3);
				}
			}
		},
		secondary: {
			chance: 20,
			onHit(target, pokemon, move) {
				for (const ally of pokemon.side.pokemon) {
					if (!ally || ally.fainted) continue;
					for (const moveSlot of ally.moveSlots) {
						const move = this.dex.getMove(moveSlot.move);
						if (move.id === 'fusionflare') continue;
						target.trySetStatus('brn');
					}
				}
			},
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	fusionflare: {
		num: 558,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		shortDesc: "If a Pokémon in the user's party has Fusion Bolt; 1.3x power & 20% chance to paralyze.",
		name: "Fusion Flare",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
		onBasePower(basePower, pokemon, move) {
			for (const ally of pokemon.side.pokemon) {
				if (!ally || ally.fainted) continue;
				for (const moveSlot of ally.moveSlots) {
					const move = this.dex.getMove(moveSlot.move);
					if (move.id === 'fusionbolt') continue;
					this.debug('double power');
					return this.chainModify(1.3);
				}
			}
		},
		secondary: {
			chance: 20,
			onHit(target, pokemon, move) {
				for (const ally of pokemon.side.pokemon) {
					if (!ally || ally.fainted) continue;
					for (const moveSlot of ally.moveSlots) {
						const move = this.dex.getMove(moveSlot.move);
						if (move.id === 'fusionbolt') continue;
						target.trySetStatus('par');
					}
				}
			},
		},
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	fissure: {
		num: 90,
		accuracy: 90,
		basePower: 120,
		category: "Physical",
		shortDesc: "Raises user's Atk by 1 on turn 1. Hits turn 2.",
		name: "Fissure",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({atk: 1}, attacker, attacker, move);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Ground",
		zMove: {basePower: 180},
		maxMove: {basePower: 130},
	},
	horndrill: {
		num: 32,
		accuracy: 90,
		basePower: 90,
		category: "Physical",
		shortDesc: "Lowers target's Def if the move is resisted.",
		name: "Horn Drill",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onHit(target, source, move) {
			if (target.getMoveHitData(move).typeMod < 0) {
				this.boost({def: -1}, target);
			}
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		zMove: {basePower: 180},
		maxMove: {basePower: 130},
	},
	guillotine: {
		num: 12,
		accuracy: 90,
		basePower: 75,
		category: "Physical",
		shortDesc: "2x damage when the target has stat drops.",
		name: "Guillotine",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePowerPriority: 22,
		onBasePower(basePower, source, target, move) {
			let guillotine = null;
			let statDrop: BoostName;
			for (statDrop in target.boosts) {
				if (target.boosts[statDrop] < 0) guillotine = true;
			}
			if (guillotine) {
				this.debug('Guillotine boost');
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 180},
		maxMove: {basePower: 130},
	},
	sheercold: {
		num: 329,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		shortDesc: "1.5x power in Hail.",
		name: "Sheer Cold",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower, pokemon, target) {
			if (['hail'].includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(1.5);
			}
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		zMove: {basePower: 180},
		maxMove: {basePower: 130},
	},
	prismaticlaser: {
		num: 711,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "Super effective against Dark-types. 20% chance to lower target's accuracy.",
		name: "Prismatic Laser",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		ignoreImmunity: {'Psychic': true},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Dark') return 1;
		},
		secondary: {
			chance: 20,
			boosts: {
				accuracy: -1,
			},
		},
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	roaroftime: {
		num: 459,
		accuracy: 100,
		basePower: 65,
		basePowerCallback: function (pokemon, target, move) {
			if (this.field.pseudoWeather.trickroom || this.field.pseudoWeather.wonderroom || this.field.pseudoWeather.gravity || this.field.pseudoWeather.magicroom) {
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Special",
		shortDesc: "2x power if a Room or Gravity is active.",
		name: "Roar of Time",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Beautiful",
	},
	spacialrend: {
		num: 460,
		accuracy: 95,
		basePower: 110,
		category: "Special",
		shortDesc: "Starts Gravity.",
		name: "Spacial Rend",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			pseudoWeather: 'gravity',
		},
		target: "normal",
		type: "Dragon",
		contestType: "Beautiful",
	},
	shadowforce: {
		num: 467,
		accuracy: 100,
		basePower: 85,
		basePowerCallback: function (pokemon, target, move) {
			if (target.volatiles['protect'] || target.volatiles['banefulbunker'] || target.volatiles['kingsshield'] || target.volatiles['spikyshield']) {
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		shortDesc: "Breaks Protect. 2x damage if used against Protect.",
		name: "Shadow Force",
		pp: 5,
		priority: 0,
		flags: {contact: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},
	sunsteelstrike: {
		num: 713,
		accuracy: 95,
		basePower: 85,
		category: "Physical",
		name: "Sunsteel Strike",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		ignoreAbility: true,
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	moongeistbeam: {
		num: 714,
		accuracy: 95,
		basePower: 85,
		category: "Special",
		name: "Moongeist Beam",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		ignoreAbility: true,
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},
	geomancy: {
		num: 601,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User loses 33% of its max HP. +1 to all stats.",
		name: "Geomancy",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, sound: 1, dance: 1},
		onTryHit(pokemon, target, move) {
			if (pokemon.hp <= (pokemon.maxhp * 33 / 100) || pokemon.maxhp === 1) {
				return false;
			}
			if (!this.boost(move.boosts as SparseBoostsTable)) return null;
			delete move.boosts;
		},
		onHit(pokemon) {
			this.directDamage(pokemon.maxhp * 33 / 100);
		},
		boosts: {
			atk: 1,
			def: 1,
			spa: 1,
			spd: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Fairy",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	thousandarrows: {
		num: 614,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		shortDesc: "Grounds adjacent foes.",
		name: "Thousand Arrows",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		onHit(pokemon) {
			if (pokemon.hasType('Flying') || pokemon.hasAbility('levitate')) {
				pokemon.addVolatile('smackdown');
			}
		},
		ignoreImmunity: {'Ground': true},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ground",
		zMove: {basePower: 180},
		contestType: "Beautiful",
	},
	landswrath: {
		num: 616,
		accuracy: 90,
		basePower: 110,
		category: "Physical",
		name: "Land's Wrath",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ground",
		zMove: {basePower: 185},
		contestType: "Beautiful",
	},
	astralbarrage: {
		num: 825,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (!pokemon.item) {
				this.debug("Power doubled for no item");
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Special",
		shortDesc: "Power doubles if the user has no held item.",
		name: "Astral Barrage",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ghost",
	},
	glaciallance: {
		num: 824,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Glacial Lance damage boost');
				return move.basePower * 2;
			}
			this.debug('Glacial Lance NOT boosted');
			return move.basePower;
		},
		category: "Physical",
		shortDesc: "Power doubles if user moves before the target.",
		name: "Glacial Lance",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ice",
	},
	darkvoid: {
		num: 464,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "Lowers targets' Def, Sp. Def by 1. User switches.",
		name: "Dark Void",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		onHit(target, source, move) {
			const success = this.boost({def: -1, spd: -1}, target, source);
			if (!success && !target.hasAbility('mirrorarmor')) {
				delete move.selfSwitch;
			}
		},
		selfSwitch: true,
		secondary: null,
		target: "allAdjacentFoes",
		type: "Dark",
		zMove: {effect: 'healreplacement'},
		contestType: "Clever",		
	},
	batonpass: {
		inherit: true,
		shortDesc: "User switches and passes volatile statuses. Stat changes are removed.",
		self: {
			onHit(source) {
				source.clearBoosts();
				this.add('-clearboost', source);
				this.hint("Baton Pass can't pass Stat Changes.");
			}
		}
	},
	eternabeam: {
		inherit: true,
		shortDesc: "User cannot move next turn. Multiplies current HP by 1.2x.",
		onHit(target, source) {
			this.heal(source.hp / 5, source);
		},
	},
	
	//Gmax moves
	gmaxbefuddle: {
		inherit: true,
		shortDesc: "Base move affects power. All: -1/4 HP with Fire moves, 3 turns.",
		self: {
			pseudoWeather: 'gmaxbefuddle',
		},
		condition: {
			duration: 3,
			onStart() {
				this.add('-fieldstart', 'move: G-Max Befuddle');
			},
			onTryMovePriority: -1,
			onTryMove(pokemon, target, move) {
				if (move.type === 'Fire') {
					this.add('-activate', pokemon, 'move: Powder');
					this.damage(this.clampIntRange(Math.round(pokemon.maxhp / 4), 1));
					return false;
				}
			},
			onEnd() {
				this.add('-fieldend', 'move: G-Max Befuddle');
			},
		},
	},
	gmaxcannonade: {
		inherit: true,
		shortDesc: "Base move affects power. Foes: -1/8 HP, 3 turns.",
		condition: {
			duration: 3,
			onStart(targetSide) {
				this.add('-sidestart', targetSide, 'G-Max Cannonade');
			},
			onResidualOrder: 5,
			onResidualSubOrder: 1.1,
			onResidual(targetSide) {
				for (const pokemon of targetSide.active) {
					if (!pokemon.hasType('Water')) this.damage(pokemon.baseMaxhp / 8, pokemon);
				}
			},
			onEnd(targetSide) {
				for (const pokemon of targetSide.active) {
					if (!pokemon.hasType('Water')) this.damage(pokemon.baseMaxhp / 8, pokemon);
				}
				this.add('-sideend', targetSide, 'G-Max Cannonade');
			},
		},
	},
	gmaxcentiferno: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return move.basePower * 1.5;
			}
			return move.basePower;
		},
		shortDesc: "Base move affects power. In Sun: 1.5x power & bound foes.",
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
						pokemon.addVolatile('partiallytrapped', source, this.dex.getActiveMove('G-Max Centiferno'));
					}
				}
			},
		},
	},
	gmaxchistrike: {
		inherit: true,
		shortDesc: "Base move affects power. Allies: Always Crit, 3 turns.",
		self: {
			sideCondition: 'gmaxchistrike',
		},
		condition: {
			duration: 3,
			onStart(side) {
				this.add('-sidestart', side, 'move: G-Max Chi Strike');
			},
			onModifyMove(move, pokemon) {
				move.willCrit = true;
			},
			onResidualOrder: 21,
			onResidualSubOrder: 1,
			onEnd(side) {
				this.add('-sideend', side, 'move: G-Max Chi Strike');
			},
		},
	},
	gmaxcuddle: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (target.volatiles['gmaxcuddle']) {
				return move.basePower * 1.5;
			}
			return move.basePower;
		},
		shortDesc: "Base move affects power. Foes: infatuated and 1.5x power.",
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					pokemon.addVolatile('gmaxcuddle');
				}
			},
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(pokemon, source, effect) {
				if (!this.runEvent('G-Max Cuddle', pokemon, source)) {
					this.debug('G-Max Cuddle event failed');
					return false;
				}
				this.add('-start', pokemon, 'G-Max Cuddle');
			},
			onUpdate(pokemon) {
				if (this.effectData.source && !this.effectData.source.isActive && pokemon.volatiles['gmaxcuddle']) {
					this.debug('Removing G-Max Cuddle volatile on ' + pokemon);
					pokemon.removeVolatile('gmaxcuddle');
				}
			},
			onBeforeMovePriority: 2,
			onBeforeMove(pokemon, target, move) {
				this.add('-activate', pokemon, 'move: G-Max Cuddle', '[of] ' + this.effectData.source);
				if (this.randomChance(1, 2)) {
					this.add('cant', pokemon, 'G-Max Cuddle');
					return false;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'G-Max Cuddle', '[silent]');
			},
		},
	},
	gmaxdepletion: {
		inherit: true,
		shortDesc: "Base move affects power. Foes: last move -2 PP & disabled.",
		volatileStatus: 'disable',
	},
	gmaxfoamburst: {
		inherit: true,
		shortDesc: "Base move affects power. Foes: -1 Speed & 0.4x Spe for 3 turns.",
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('gmaxfoamburst');
				for (const pokemon of source.side.foe.active) {
					this.boost({spe: -1}, pokemon);
				}
			},
		},
		condition: {
			duration: 3,
			onStart(targetSide) {
				this.add('-sidestart', targetSide, 'G-Max Foam Burst');
			},
			onModifySpe(spe, targetSide) {
				return this.chainModify(0.4);
			},
			onEnd(targetSide) {
				this.add('-sideend', targetSide, 'G-Max Foam Burst');
			},
		},
	},
	gmaxgoldrush: {
		inherit: true,
		shortDesc: "Base move affects power. User: steals target's boosts.",
		stealsBoosts: true,
		self: null,
	},
	gmaxmalodor: {
		inherit: true,
		shortDesc: "Base move affects power. Foes: badly poisoned.",
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					pokemon.trySetStatus('tox', source);
				}
			},
		},
	},
	gmaxmeltdown: {
		inherit: true,
		shortDesc: "Base move affects power. Foes: burned.",
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					pokemon.trySetStatus('brn', source);
				}
			},
		},
	},
	gmaxsandblast: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (this.field.isWeather('sandstorm')) {
				return move.basePower * 1.5;
			}
			return move.basePower;
		},
		shortDesc: "Base move affects power. In Sand: 1.5x power & bound foes.",
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					if (this.field.isWeather('sandstorm')) {
						pokemon.addVolatile('partiallytrapped', source, this.dex.getActiveMove('G-Max Sandblast'));
					}
				}
			},
		},
	},
	gmaxsnooze: {
		inherit: true,
		shortDesc: "Base move affects power. Target: yawned.",
		onHit(target) {
			if (target.status || !target.runStatusImmunity('slp')) return;
			target.addVolatile('yawn');
		},
		onAfterSubDamage(damage, target) {
			if (target.status || !target.runStatusImmunity('slp')) return;
			target.addVolatile('yawn');
		},
	},
	gmaxstonesurge: {
		inherit: true,
		type: "Rock",
	},
	gmaxstunshock: {
		inherit: true,
		shortDesc: "Base move affects power. Foes: paralyzed & 1.5x power.",
		onBasePower(basePower, pokemon, target) {
			if (target.status === 'par') {
				return this.chainModify(1.5);
			}
		},
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					pokemon.trySetStatus('par', source);
				}
			},
		},
	},
	gmaxsweetness: {
		inherit: true,
		shortDesc: "Base move affects power. Allies: status cured & +1/4 max HP.",
		self: {
			onHit(target, source, move) {
				for (const ally of source.side.pokemon) {
					ally.cureStatus();
					this.heal(ally.maxhp / 4, ally, source, move);
				}
			},
		},
	},
	gmaxtartness: {
		inherit: true,
		shortDesc: "Base move affects power. Aliies: +1 Acc & 2x acc for 3 turns.",
		self: {
			sideCondition: 'gmaxtartness',
			onHit(source) {
				for (const pokemon of source.side.active) {
					this.boost({accuracy: 1}, pokemon);
				}
			},
		},
		condition: {
			duration: 3,
			onStart(side) {
				this.add('-sidestart', side, 'G-Max Tartness');
			},
			onSourceModifyAccuracyPriority: 4,
			onSourceModifyAccuracy(accuracy) {
				if (typeof accuracy === 'number') {
					return accuracy * 2;
				}
			},
			onEnd(side) {
				this.add('-sideend', side, 'G-Max Tartness');
			},
		},
	},
	gmaxvinelash: {
		inherit: true,
		shortDesc: "Base move affects power. Foes: -1/8 HP, 3 turns.",
		condition: {
			duration: 3,
			onStart(targetSide) {
				this.add('-sidestart', targetSide, 'G-Max Vine Lash');
			},
			onResidualOrder: 5,
			onResidualSubOrder: 1.1,
			onResidual(targetSide) {
				for (const pokemon of targetSide.active) {
					if (!pokemon.hasType('Grass')) this.damage(pokemon.baseMaxhp / 8, pokemon);
				}
			},
			onEnd(targetSide) {
				for (const pokemon of targetSide.active) {
					if (!pokemon.hasType('Grass')) this.damage(pokemon.baseMaxhp / 8, pokemon);
				}
				this.add('-sideend', targetSide, 'G-Max Vine Lash');
			},
		},
	},
	gmaxvolcalith: {
		inherit: true,
		shortDesc: "Base move affects power. Foes: -1/8 HP, 3 turns.",
		condition: {
			duration: 4,
			onStart(targetSide) {
				this.add('-sidestart', targetSide, 'G-Max Volcalith');
			},
			onResidualOrder: 5,
			onResidualSubOrder: 1.1,
			onResidual(targetSide) {
				for (const pokemon of targetSide.active) {
					if (!pokemon.hasType('Rock')) this.damage(pokemon.baseMaxhp / 6, pokemon);
				}
			},
			onEnd(targetSide) {
				for (const pokemon of targetSide.active) {
					if (!pokemon.hasType('Rock')) this.damage(pokemon.baseMaxhp / 6, pokemon);
				}
				this.add('-sideend', targetSide, 'G-Max Volcalith');
			},
		},
	},
	gmaxwildfire: {
		inherit: true,
		shortDesc: "Base move affects power. Foes: -1/8 HP, 3 turns.",
		condition: {
			duration: 3,
			onStart(targetSide) {
				this.add('-sidestart', targetSide, 'G-Max Wildfire');
			},
			onResidualOrder: 5,
			onResidualSubOrder: 1.1,
			onResidual(targetSide) {
				for (const pokemon of targetSide.active) {
					if (!pokemon.hasType('Fire')) this.damage(pokemon.baseMaxhp / 8, pokemon);
				}
			},
			onEnd(targetSide) {
				for (const pokemon of targetSide.active) {
					if (!pokemon.hasType('Fire')) this.damage(pokemon.baseMaxhp / 8, pokemon);
				}
				this.add('-sideend', targetSide, 'G-Max Wildfire');
			},
		},
	},
	gmaxwindrage: {
		inherit: true,
		shortDesc: "Base move affects power. Ends Terrain, weather, hazards.",
		self: {
			onHit(source) {
				let success = false;
				const removeTarget = [
					'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb',
				];
				const removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
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
				this.field.clearWeather();
				this.field.clearTerrain();
				return success;
			},
		},
	},
	
	//Bad Dream moves
	dreameater: {
		inherit: true,
		onTryImmunity(target) {
			return target.status === 'slp' || target.hasAbility('comatose') || target.volatiles['baddreams'];
		},
	},
	hex: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose') || target.volatiles['baddreams']) return move.basePower * 2;
			return move.basePower;
		},
	},
	nightmare: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(pokemon) {
				if (pokemon.status !== 'slp' && !pokemon.hasAbility('comatose') && !pokemon.volatiles['baddreams']) {
					return false;
				}
				this.add('-start', pokemon, 'Nightmare');
			},
			onResidualOrder: 9,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 4);
			},
		},
	},
	rest: {
		inherit: true,
		onTryMove(pokemon) {
			if (pokemon.hp === pokemon.maxhp) {
				this.add('-fail', pokemon, 'heal');
				return null;
			}
			if (pokemon.status === 'slp' || pokemon.hasAbility('comatose') || pokemon.volatiles['baddreams']) {
				this.add('-fail', pokemon);
				return null;
			}
		},
	},
	sleeptalk: {
		inherit: true,
		onTryHit(pokemon) {
			if (pokemon.status !== 'slp' && !pokemon.hasAbility('comatose') || !pokemon.volatiles['baddreams']) return false;
		},
	},
	snore: {
		inherit: true,
		onTryHit(target, source) {
			if (source.status !== 'slp' && !source.hasAbility('comatose') && !source.volatiles['baddreams']) return false;
		},
	},
	wakeupslap: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'slp' || target.hasAbility('comatose') || target.volatiles['baddreams']) return move.basePower * 2;
			return move.basePower;
		},
	},
	
	//Dynamax moves
	destinybond: {
		inherit: true,
		condition: {
			onStart(pokemon) {
				this.add('-singlemove', pokemon, 'Destiny Bond');
			},
			onFaint(target, source, effect) {
				if (!source || !effect || target.side === source.side) return;
				if (effect.effectType === 'Move' && !effect.isFutureMove) {
					this.add('-activate', target, 'move: Destiny Bond');
					source.faint();
				}
			},
			onBeforeMovePriority: -1,
			onBeforeMove(pokemon, target, move) {
				if (move.id === 'destinybond') return;
				this.debug('removing Destiny Bond before attack');
				pokemon.removeVolatile('destinybond');
			},
			onMoveAborted(pokemon, target, move) {
				pokemon.removeVolatile('destinybond');
			},
		},
	},
	encore: {
		inherit: true,
		condition: {
			duration: 3,
			noCopy: true, // doesn't get copied by Z-Baton Pass
			onStart(target) {
				const noEncore = [
					'assist', 'copycat', 'encore', 'mefirst', 'metronome', 'mimic', 'mirrormove', 'naturepower', 'sketch', 'sleeptalk', 'struggle', 'transform',
				];
				let move: Move | ActiveMove | null = target.lastMove;
				if (!move) return false;

				if (move.isMax && move.baseMove) move = this.dex.getMove(move.baseMove);
				const moveIndex = target.moves.indexOf(move.id);
				if (move.isZ || noEncore.includes(move.id) || !target.moveSlots[moveIndex] || target.moveSlots[moveIndex].pp <= 0) {
					// it failed
					return false;
				}
				this.effectData.move = move.id;
				this.add('-start', target, 'Encore');
				if (!this.queue.willMove(target)) {
					this.effectData.duration++;
				}
			},
			onOverrideAction(pokemon, target, move) {
				if (move.id !== this.effectData.move) return this.effectData.move;
			},
			onResidualOrder: 13,
			onResidual(target) {
				if (target.moves.includes(this.effectData.move) &&
					target.moveSlots[target.moves.indexOf(this.effectData.move)].pp <= 0) {
					// early termination if you run out of PP
					target.removeVolatile('encore');
				}
			},
			onEnd(target) {
				this.add('-end', target, 'Encore');
			},
			onDisableMove(pokemon) {
				if (!this.effectData.move || !pokemon.hasMove(this.effectData.move)) {
					return;
				}
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id !== this.effectData.move) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
		},
	},
	entrainment: {
		inherit: true,
		onTryHit(target, source) {
			if (target === source) return false;

			const additionalBannedSourceAbilities = [
				// Zen Mode included here for compatability with Gen 5-6
				'flowergift', 'forecast', 'hungerswitch', 'illusion', 'imposter', 'neutralizinggas', 'powerofalchemy', 'receiver', 'trace', 'zenmode',
			];
			if (
				target.ability === source.ability ||
				target.getAbility().isPermanent || target.ability === 'truant' ||
				source.getAbility().isPermanent || additionalBannedSourceAbilities.includes(source.ability)
			) {
				return false;
			}
		},
	},
	grassknot: {
		inherit: true,
		onTryHit() {},
	},
	heatcrash: {
		inherit: true,
		onTryHit() {},
	},
	heavyslam: {
		inherit: true,
		onTryHit() {},
	},
	instruct: {
		inherit: true,
		onHit(target, source) {
			if (!target.lastMove) return false;
			const lastMove = target.lastMove;
			const moveIndex = target.moves.indexOf(lastMove.id);
			const noInstruct = [
				'assist', 'beakblast', 'bide', 'celebrate', 'copycat', 'dynamaxcannon', 'focuspunch', 'iceball', 'instruct', 'kingsshield', 'mefirst', 'metronome', 'mimic', 'mirrormove', 'naturepower', 'outrage', 'petaldance', 'rollout', 'shelltrap', 'sketch', 'sleeptalk', 'thrash', 'transform',
			];
			if (
				noInstruct.includes(lastMove.id) || lastMove.isZ || lastMove.isMax ||
				lastMove.flags['charge'] || lastMove.flags['recharge'] ||
				target.volatiles['beakblast'] || target.volatiles['focuspunch'] || target.volatiles['shelltrap'] ||
				(target.moveSlots[moveIndex] && target.moveSlots[moveIndex].pp <= 0)
			) {
				return false;
			}
			this.add('-singleturn', target, 'move: Instruct', '[of] ' + source);
			this.runMove(target.lastMove.id, target, target.lastMoveTargetLoc!);
		},
	},
	lowkick: {
		inherit: true,
		onTryHit() {},
	},
	psychup: {
		inherit: true,
		onHit(target, source) {
			let i: BoostName;
			for (i in target.boosts) {
				source.boosts[i] = target.boosts[i];
			}
			const volatilesToCopy = ['focusenergy', 'laserfocus'];
			for (const volatile of volatilesToCopy) {
				if (target.volatiles[volatile]) {
					source.addVolatile(volatile);
				} else {
					source.removeVolatile(volatile);
				}
			}
			this.add('-copyboost', source, target, '[from] move: Psych Up');
		},
	},
	skillswap: {
		inherit: true,
		onTryHit(target, source) {
			const additionalBannedAbilities = ['hungerswitch', 'illusion', 'neutralizinggas', 'wonderguard'];
			if (
				target.getAbility().isPermanent || source.getAbility().isPermanent ||
				additionalBannedAbilities.includes(target.ability) || additionalBannedAbilities.includes(source.ability)
			) {
				return false;
			}
		},
	},
	torment: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Torment');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Torment');
			},
			onDisableMove(pokemon) {
				if (pokemon.lastMove && pokemon.lastMove.id !== 'struggle') pokemon.disableMove(pokemon.lastMove.id);
			},
		},
	},
};