'use strict';

/**@type {{[k: string]: MoveData}} */
let BattleMovedex = {
	
	"tailwind": {
		num: 366,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 4 turns, the user and its party members have their Speed doubled. Fails if this move is already in effect for the user's side.",
		shortDesc: "For 4 turns, allies' Speed is doubled.",
		id: "tailwind",
		isViable: true,
		name: "Tailwind",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		self:{
			sideCondition: 'tailwind',
		},
		effect: {
			duration: 4,
			durationCallback: function (target, source, effect) {
				if (source && source.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 6;
				}
				return 4;
			},
			onStart: function (side) {
				this.add('-sidestart', side, 'move: Tailwind');
			},
			onModifySpe: function (spe, pokemon) {
				return this.chainModify(2);
			},
			onResidualOrder: 21,
			onResidualSubOrder: 4,
			onEnd: function (side) {
				this.add('-sideend', side, 'move: Tailwind');
			},
		},
		secondary: false,
		target: "allySide",
		type: "Flying",
		zMoveEffect: 'crit2',
		contestType: "Cool",
	},
	"reflect": {
		num: 115,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the user and its party members take 0.5x damage from physical attacks, or 0.66x damage if in a Double Battle; does not reduce damage further with Aurora Veil. Critical hits ignore this protection. It is removed from the user's side if the user or an ally is successfully hit by Brick Break, Psychic Fangs, or Defog. Brick Break and Psychic Fangs remove the effect before damage is calculated. Lasts for 8 turns if the user is holding Light Clay.",
		shortDesc: "For 5 turns, physical damage to allies is halved.",
		id: "reflect",
		isViable: true,
		name: "Reflect",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		self:{
			sideCondition: 'reflect',
		},
		effect: {
			duration: 5,
			durationCallback: function (target, source, effect) {
				if (source && source.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage: function (damage, source, target, move) {
				if (target !== source && target.side === this.effectData.target && this.getCategory(move) === 'Physical') {
					if (!move.crit && !move.infiltrates) {
						this.debug('Reflect weaken');
						if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
						return this.chainModify(0.5);
					}
				}
			},
			onStart: function (side) {
				this.add('-sidestart', side, 'Reflect');
			},
			onResidualOrder: 21,
			onEnd: function (side) {
				this.add('-sideend', side, 'Reflect');
			},
		},
		secondary: false,
		target: "allySide",
		type: "Psychic",
		zMoveBoost: {def: 1},
		contestType: "Clever",
	},
	"lightscreen": {
		num: 113,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the user and its party members take 0.5x damage from special attacks, or 0.66x damage if in a Double Battle; does not reduce damage further with Aurora Veil. Critical hits ignore this protection. It is removed from the user's side if the user or an ally is successfully hit by Brick Break, Psychic Fangs, or Defog. Lasts for 8 turns if the user is holding Light Clay.",
		shortDesc: "For 5 turns, special damage to allies is halved.",
		id: "lightscreen",
		isViable: true,
		name: "Light Screen",
		pp: 30,
		priority: 0,
		flags: {snatch: 1},
		self:{
			sideCondition: 'lightscreen',
		},
		effect: {
			duration: 5,
			durationCallback: function (target, source, effect) {
				if (source && source.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage: function (damage, source, target, move) {
				if (target !== source && target.side === this.effectData.target && this.getCategory(move) === 'Special') {
					if (!move.crit && !move.infiltrates) {
						this.debug('Light Screen weaken');
						if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
						return this.chainModify(0.5);
					}
				}
			},
			onStart: function (side) {
				this.add('-sidestart', side, 'move: Light Screen');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 1,
			onEnd: function (side) {
				this.add('-sideend', side, 'move: Light Screen');
			},
		},
		secondary: false,
		target: "allySide",
		type: "Psychic",
		zMoveBoost: {spd: 1},
		contestType: "Beautiful",
	},
	"refresh": {
		num: 287,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user cures its burn, poison, or paralysis.",
		shortDesc: "User cures its burn, poison, or paralysis.",
		id: "refresh",
		isViable: true,
		name: "Refresh",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		self:{
			onHit: function (pokemon) {
			if (['', 'slp', 'frz'].includes(pokemon.status)) return false;
			pokemon.cureStatus();
		},
		},
		secondary: false,
		target: "self",
		type: "Normal",
		zMoveEffect: 'heal',
		contestType: "Cute",
	},
	"laserfocus": {
		num: 673,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "On the next turn, the user's attack will be a critical hit. Fails if the user already has the effect.",
		shortDesc: "Next turn, the user's attack will be a critical hit.",
		id: "laserfocus",
		name: "Laser Focus",
		pp: 30,
		priority: 0,
		flags: {snatch: 1},
		self:{
			volatileStatus: 'laserfocus',
		},
		effect: {
			duration: 2,
			onStart: function (pokemon) {
				this.add('-start', pokemon, 'move: Laser Focus');
			},
			onModifyCritRatio: function (critRatio) {
				return 5;
			},
			onEnd: function (pokemon) {
				this.add('-end', pokemon, 'move: Laser Focus', '[silent]');
			},
		},
		secondary: false,
		target: "self",
		type: "Normal",
		zMoveBoost: {atk: 1},
		contestType: "Cool",
	},
"acidarmor": {
		num: 151,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Defense by 2 stages.",
		shortDesc: "Raises the user's Defense by 2.",
		id: "acidarmor",
		name: "Acid Armor",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		selfBoost: {
      boosts: {
			def: 2,
      }
		},
		secondary: false,
		target: "self",
		type: "Poison",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Tough",
	},
	"acupressure": {
		num: 367,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises a random stat by 2 stages as long as the stat is not already at stage 6. The user can choose to use this move on itself or an adjacent ally. Fails if no stat stage can be raised or if used on an ally with a substitute.",
		shortDesc: "Raises a random stat of the user or an ally by 2.",
		id: "acupressure",
		name: "Acupressure",
		pp: 30,
		priority: 0,
		flags: {},
		self: {
			onHit: function (target) {
			let stats = [];
			for (let stat in target.boosts) {
				if (target.boosts[stat] < 6) {
					stats.push(stat);
				}
			}
			if (stats.length) {
				let randomStat = this.sample(stats);
				let boost = {};
				boost[randomStat] = 2;
				this.boost(boost);
			} else {
				return false;
			}
		},
		},
		secondary: false,
		target: "adjacentAllyOrSelf",
		type: "Normal",
		zMoveEffect: 'crit2',
		contestType: "Tough",
	},
	"agility": {
		num: 97,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Speed by 2 stages.",
		shortDesc: "Raises the user's Speed by 2.",
		id: "agility",
		isViable: true,
		name: "Agility",
		pp: 30,
		priority: 0,
		flags: {snatch: 1},
		selfBoost: {
		boosts: {
			spe: 2,
		},
		},
		secondary: false,
		target: "self",
		type: "Psychic",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Cool",
	},
	"allyswitch": {
		num: 502,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user swaps positions with its ally. Fails if the user is the only Pokemon on its side.",
		shortDesc: "The user swaps positions with its ally.",
		id: "allyswitch",
		name: "Ally Switch",
		pp: 15,
		priority: 2,
		flags: {},
		self: {
			onTryHit: function (source) {
			if (source.side.active.length === 1) return false;
			if (source.side.active.length === 3 && source.position === 1) return false;
		},
		onHit: function (pokemon) {
			let newPosition = (pokemon.position === 0 ? pokemon.side.active.length - 1 : 0);
			if (!pokemon.side.active[newPosition]) return false;
			if (pokemon.side.active[newPosition].fainted) return false;
			this.swapPosition(pokemon, newPosition, '[from] move: Ally Switch');
		},
		},
		secondary: false,
		target: "self",
		type: "Psychic",
		zMoveBoost: {spe: 2},
		contestType: "Clever",
	},
	"amnesia": {
		num: 133,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Special Defense by 2 stages.",
		shortDesc: "Raises the user's Sp. Def by 2.",
		id: "amnesia",
		name: "Amnesia",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		selfBoost: {
		boosts: {
			spd: 2,
		},
		},
		secondary: false,
		target: "self",
		type: "Psychic",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Cute",
	},
	"aquaring": {
		num: 392,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user has 1/16 of its maximum HP, rounded down, restored at the end of each turn while it remains active. If the user uses Baton Pass, the replacement will receive the healing effect.",
		shortDesc: "User recovers 1/16 max HP per turn.",
		id: "aquaring",
		name: "Aqua Ring",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		self: {
			volatileStatus: 'aquaring',
		},
		effect: {
			onStart: function (pokemon) {
				this.add('-start', pokemon, 'Aqua Ring');
			},
			onResidualOrder: 6,
			onResidual: function (pokemon) {
				this.heal(pokemon.maxhp / 16);
			},
		},
		secondary: false,
		target: "self",
		type: "Water",
		zMoveBoost: {def: 1},
		contestType: "Beautiful",
	},
	"aromatherapy": {
		num: 312,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Every Pokemon in the user's party is cured of its major status condition. Active Pokemon with the Ability Sap Sipper are not cured, unless they are the user.",
		shortDesc: "Cures the user's party of all status conditions.",
		id: "aromatherapy",
		isViable: true,
		name: "Aromatherapy",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, distance: 1},
		self: {
			onHit: function (pokemon, source, move) {
			this.add('-activate', source, 'move: Aromatherapy');
			let success = false;
			for (const ally of pokemon.side.pokemon) {
				if (ally !== source && ((ally.hasAbility('sapsipper')) ||
						(ally.volatiles['substitute'] && !move.infiltrates))) {
					continue;
				}
				if (ally.cureStatus()) success = true;
			}
			return success;
		},
		},
		target: "allyTeam",
		type: "Grass",
		zMoveEffect: 'heal',
		contestType: "Clever",
	},
	"aromaticmist": {
		num: 597,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the target's Special Defense by 1 stage. Fails if there is no ally adjacent to the user.",
		shortDesc: "Raises an ally's Sp. Def by 1.",
		id: "aromaticmist",
		name: "Aromatic Mist",
		pp: 20,
		priority: 0,
		flags: {authentic: 1},
		selfBoost: {
		boosts: {
			spd: 1,
		},
		},
		secondary: false,
		target: "adjacentAlly",
		type: "Fairy",
		zMoveBoost: {spd: 2},
		contestType: "Beautiful",
	},
	"assist": {
		num: 274,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "A random move among those known by the user's party members is selected for use. Does not select Assist, Belch, Bestow, Bounce, Chatter, Circle Throw, Copycat, Counter, Covet, Destiny Bond, Detect, Dig, Dive, Dragon Tail, Endure, Feint, Fly, Focus Punch, Follow Me, Helping Hand, Hold Hands, King's Shield, Mat Block, Me First, Metronome, Mimic, Mirror Coat, Mirror Move, Nature Power, Phantom Force, Protect, Rage Powder, Roar, Shadow Force, Sketch, Sky Drop, Sleep Talk, Snatch, Spiky Shield, Struggle, Switcheroo, Thief, Transform, Trick, or Whirlwind.",
		shortDesc: "Uses a random move known by a team member.",
		id: "assist",
		name: "Assist",
		pp: 20,
		priority: 0,
		flags: {},
		self: {
			onHit: function (target) {
			let moves = [];
			for (const pokemon of target.side.pokemon) {
				if (pokemon === target) continue;
				for (const moveSlot of pokemon.moveSlots) {
					let move = moveSlot.id;
					let noAssist = [
						'assist', 'belch', 'bestow', 'bounce', 'chatter', 'circlethrow', 'copycat', 'counter', 'covet', 'destinybond', 'detect', 'dig', 'dive', 'dragontail', 'endure', 'feint', 'fly', 'focuspunch', 'followme', 'helpinghand', 'kingsshield', 'matblock', 'mefirst', 'metronome', 'mimic', 'mirrorcoat', 'mirrormove', 'naturepower', 'phantomforce', 'protect', 'ragepowder', 'roar', 'shadowforce', 'sketch', 'skydrop', 'sleeptalk', 'snatch', 'spikyshield', 'struggle', 'switcheroo', 'thief', 'transform', 'trick', 'whirlwind',
					];
					if (!noAssist.includes(move) && !this.getMove(move).isZ) {
						moves.push(move);
					}
				}
			}
			let randomMove = '';
			if (moves.length) randomMove = this.sample(moves);
			if (!randomMove) {
				return false;
			}
			this.useMove(randomMove, target);
		},
		},
		secondary: false,
		target: "self",
		type: "Normal",
		contestType: "Cute",
	},
	"auroraveil": {
		num: 694,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the user and its party members take 0.5x damage from physical and special attacks, or 0.66x damage if in a Double Battle; does not reduce damage further with Reflect or Light Screen. Critical hits ignore this protection. It is removed from the user's side if the user or an ally is successfully hit by Brick Break, Psychic Fangs, or Defog. Brick Break and Psychic Fangs remove the effect before damage is calculated. Lasts for 8 turns if the user is holding Light Clay. Fails unless the weather is Hail.",
		shortDesc: "For 5 turns, damage to allies is halved. Hail only.",
		id: "auroraveil",
		isViable: true,
		name: "Aurora Veil",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		self: {
			sideCondition: 'auroraveil',
		},
		onTryHitSide: function () {
			if (!this.field.isWeather('hail')) return false;
		},
		effect: {
			duration: 5,
			durationCallback: function (target, source, effect) {
				if (source && source.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage: function (damage, source, target, move) {
				if (target !== source && target.side === this.effectData.target) {
					if ((target.side.sideConditions['reflect'] && this.getCategory(move) === 'Physical') ||
							(target.side.sideConditions['lightscreen'] && this.getCategory(move) === 'Special')) {
						return;
					}
					if (!move.crit && !move.infiltrates) {
						this.debug('Aurora Veil weaken');
						if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
						return this.chainModify(0.5);
					}
				}
			},
			onStart: function (side) {
				this.add('-sidestart', side, 'move: Aurora Veil');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 1,
			onEnd: function (side) {
				this.add('-sideend', side, 'move: Aurora Veil');
			},
		},
		secondary: false,
		target: "allySide",
		type: "Ice",
		zMoveBoost: {spe: 1},
		contestType: "Beautiful",
	},
	"autotomize": {
		num: 475,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Speed by 2 stages. If the user's Speed was changed, the user's weight is reduced by 100 kg as long as it remains active. This effect is stackable but cannot reduce the user's weight to less than 0.1 kg.",
		shortDesc: "Raises the user's Speed by 2; user loses 100 kg.",
		id: "autotomize",
		isViable: true,
		name: "Autotomize",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		onTryHit: function (pokemon) {
			let hasContrary = pokemon.hasAbility('contrary');
			if ((!hasContrary && pokemon.boosts.spe === 6) || (hasContrary && pokemon.boosts.spe === -6)) {
				return false;
			}
		},
		selfBoost: {
		boosts: {
			spe: 2,
		},
		},
		self: {
			volatileStatus: 'autotomize',
		},
		effect: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart: function (pokemon) {
				if (pokemon.template.weightkg > 0.1) {
					this.effectData.multiplier = 1;
					this.add('-start', pokemon, 'Autotomize');
				}
			},
			onRestart: function (pokemon) {
				if (pokemon.template.weightkg - (this.effectData.multiplier * 100) > 0.1) {
					this.effectData.multiplier++;
					this.add('-start', pokemon, 'Autotomize');
				}
			},
			onModifyWeightPriority: 1,
			onModifyWeight: function (weight, pokemon) {
				if (this.effectData.multiplier) {
					weight -= this.effectData.multiplier * 100;
					if (weight < 0.1) weight = 0.1;
					return weight;
				}
			},
		},
		secondary: false,
		target: "self",
		type: "Steel",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Beautiful",
	},
	"banefulbunker": {
		num: 661,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user is protected from most attacks made by other Pokemon during this turn, and Pokemon making contact with the user become poisoned. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails or if the user's last move used is not Baneful Bunker, Detect, Endure, King's Shield, Protect, Quick Guard, Spiky Shield, or Wide Guard. Fails if the user moves last this turn.",
		shortDesc: "Protects from moves. Contact: poison.",
		id: "banefulbunker",
		isViable: true,
		name: "Baneful Bunker",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		self:{
			volatileStatus: 'banefulbunker',
		},
		onTryHit: function (target, source, move) {
			return !!this.willAct() && this.runEvent('StallMove', target);
		},
		onHit: function (pokemon) {
			pokemon.addVolatile('stall');
		},
		effect: {
			duration: 1,
			onStart: function (target) {
				this.add('-singleturn', target, 'move: Protect');
			},
			onTryHitPriority: 3,
			onTryHit: function (target, source, move) {
				if (!move.flags['protect']) {
					if (move.isZ) move.zBrokeProtect = true;
					return;
				}
				this.add('-activate', target, 'move: Protect');
				source.moveThisTurnResult = true;
				let lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (move.flags['contact']) {
					source.trySetStatus('psn', target);
				}
				return null;
			},
		},
		secondary: false,
		target: "self",
		type: "Poison",
		zMoveBoost: {def: 1},
		contestType: "Tough",
	},
	"barrier": {
		num: 112,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Defense by 2 stages.",
		shortDesc: "Raises the user's Defense by 2.",
		id: "barrier",
		name: "Barrier",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		selfBoost: {
		boosts: {
			def: 2,
		},
		},
		secondary: false,
		target: "self",
		type: "Psychic",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Cool",
	},
	"bellydrum": {
		num: 187,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Attack by 12 stages in exchange for the user losing 1/2 of its maximum HP, rounded down. Fails if the user would faint or if its Attack stat stage is 6.",
		shortDesc: "User loses 50% max HP. Maximizes Attack.",
		id: "bellydrum",
		name: "Belly Drum",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		self: {
		onHit: function (target) {
			if (target.hp <= target.maxhp / 2 || target.boosts.atk >= 6 || target.maxhp === 1) { // Shedinja clause
				return false;
			}
			this.directDamage(target.maxhp / 2);
			this.boost({atk: 12}, target);
		},
		},
		secondary: false,
		target: "self",
		type: "Normal",
		zMoveEffect: 'heal',
		contestType: "Cute",
	},
	"bulkup": {
		num: 339,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Attack and Defense by 1 stage.",
		shortDesc: "Raises the user's Attack and Defense by 1.",
		id: "bulkup",
		isViable: true,
		name: "Bulk Up",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		selfBoost: {
		boosts: {
			atk: 1,
			def: 1,
		},
		},
		secondary: false,
		target: "self",
		type: "Fighting",
		zMoveBoost: {atk: 1},
		contestType: "Cool",
	},
	"calmmind": {
		num: 347,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Special Attack and Special Defense by 1 stage.",
		shortDesc: "Raises the user's Sp. Atk and Sp. Def by 1.",
		id: "calmmind",
		isViable: true,
		name: "Calm Mind",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		selfBoost: {
		boosts: {
			spa: 1,
			spd: 1,
		},
		},
		secondary: false,
		target: "self",
		type: "Psychic",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Clever",
	},
	"camouflage": {
		num: 293,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user's type changes based on the battle terrain. Normal type on the regular Wi-Fi terrain, Electric type during Electric Terrain, Fairy type during Misty Terrain, Grass type during Grassy Terrain, and Psychic type during Psychic Terrain. Fails if the user's type cannot be changed or if the user is already purely that type.",
		shortDesc: "Changes user's type by terrain (default Normal).",
		id: "camouflage",
		name: "Camouflage",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		self: {
			onHit: function (target) {
			let newType = 'Normal';
			if (this.field.isTerrain('electricterrain')) {
				newType = 'Electric';
			} else if (this.field.isTerrain('grassyterrain')) {
				newType = 'Grass';
			} else if (this.field.isTerrain('mistyterrain')) {
				newType = 'Fairy';
			} else if (this.field.isTerrain('psychicterrain')) {
				newType = 'Psychic';
			}

			if (!target.setType(newType)) return false;
			this.add('-start', target, 'typechange', newType);
		},
		},
		secondary: false,
		target: "self",
		type: "Normal",
		zMoveBoost: {evasion: 1},
		contestType: "Clever",
	},
	"celebrate": {
		num: 606,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "It is your birthday.",
		shortDesc: "No competitive use. Or any use.",
		id: "celebrate",
		name: "Celebrate",
		pp: 40,
		priority: 0,
		flags: {},
		self: {
		onTryHit: function (target, source) {
			this.add('-activate', target, 'move: Celebrate');
		},
		},
		secondary: false,
		target: "self",
		type: "Normal",
		zMoveBoost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1},
		contestType: "Cute",
	},
	"charge": {
		num: 268,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Special Defense by 1 stage. If the user uses an Electric-type attack on the next turn, its power will be doubled.",
		shortDesc: "Boosts next Electric move and user's Sp. Def by 1.",
		id: "charge",
		name: "Charge",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		self: {
			volatileStatus: 'charge',
		},
		onHit: function (pokemon) {
			this.add('-activate', pokemon, 'move: Charge');
		},
		effect: {
			duration: 2,
			onRestart: function (pokemon) {
				this.effectData.duration = 2;
			},
			onBasePowerPriority: 3,
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Electric') {
					this.debug('charge boost');
					return this.chainModify(2);
				}
			},
		},
		selfBoost: {
		boosts: {
			spd: 1,
		},
		},
		secondary: false,
		target: "self",
		type: "Electric",
		zMoveBoost: {spd: 1},
		contestType: "Clever",
	},
	"coil": {
		num: 489,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Attack, Defense, and accuracy by 1 stage.",
		shortDesc: "Raises user's Attack, Defense, and accuracy by 1.",
		id: "coil",
		isViable: true,
		name: "Coil",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		selfBoost: {
		boosts: {
			atk: 1,
			def: 1,
			accuracy: 1,
		},
		},
		secondary: false,
		target: "self",
		type: "Poison",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Tough",
	},
	"conversion": {
		num: 160,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user's type changes to match the original type of the move in its first move slot. Fails if the user cannot change its type, or if the type is one of the user's current types.",
		shortDesc: "Changes user's type to match its first move.",
		id: "conversion",
		name: "Conversion",
		pp: 30,
		priority: 0,
		flags: {snatch: 1},
		self: {
		onHit: function (target) {
			let type = this.getMove(target.moveSlots[0].id).type;
			if (target.hasType(type) || !target.setType(type)) return false;
			this.add('-start', target, 'typechange', type);
		},
		},
		secondary: false,
		target: "self",
		type: "Normal",
		zMoveBoost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1},
		contestType: "Beautiful",
	},
	"copycat": {
		num: 383,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user uses the last move used by any Pokemon, including itself. Fails if no move has been used, or if the last move used was Assist, Baneful Bunker, Belch, Bestow, Chatter, Circle Throw, Copycat, Counter, Covet, Destiny Bond, Detect, Dragon Tail, Endure, Feint, Focus Punch, Follow Me, Helping Hand, Hold Hands, King's Shield, Mat Block, Me First, Metronome, Mimic, Mirror Coat, Mirror Move, Nature Power, Protect, Rage Powder, Roar, Sketch, Sleep Talk, Snatch, Spiky Shield, Struggle, Switcheroo, Thief, Transform, Trick, or Whirlwind.",
		shortDesc: "Uses the last move used in the battle.",
		id: "copycat",
		name: "Copycat",
		pp: 20,
		priority: 0,
		flags: {},
		self: {
		onHit: function (pokemon) {
			let noCopycat = ['assist', 'banefulbunker', 'bestow', 'chatter', 'circlethrow', 'copycat', 'counter', 'covet', 'destinybond', 'detect', 'dragontail', 'endure', 'feint', 'focuspunch', 'followme', 'helpinghand', 'mefirst', 'metronome', 'mimic', 'mirrorcoat', 'mirrormove', 'naturepower', 'protect', 'ragepowder', 'roar', 'sketch', 'sleeptalk', 'snatch', 'struggle', 'switcheroo', 'thief', 'transform', 'trick', 'whirlwind'];
			if (!this.lastMove || noCopycat.includes(this.lastMove.id) || this.lastMove.isZ) {
				return false;
			}
			this.useMove(this.lastMove.id, pokemon);
		},
		},
		secondary: false,
		target: "self",
		type: "Normal",
		zMoveBoost: {accuracy: 1},
		contestType: "Cute",
	},
	"cosmicpower": {
		num: 322,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Defense and Special Defense by 1 stage.",
		shortDesc: "Raises the user's Defense and Sp. Def by 1.",
		id: "cosmicpower",
		name: "Cosmic Power",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		selfBoost: {
		boosts: {
			def: 1,
			spd: 1,
		},
		},
		secondary: false,
		target: "self",
		type: "Psychic",
		zMoveBoost: {spd: 1},
		contestType: "Beautiful",
	},
	"cottonguard": {
		num: 538,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Defense by 3 stages.",
		shortDesc: "Raises the user's Defense by 3.",
		id: "cottonguard",
		isViable: true,
		name: "Cotton Guard",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		selfBoost: {
		boosts: {
			def: 3,
		},
		},
		secondary: false,
		target: "self",
		type: "Grass",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Cute",
	},
	"craftyshield": {
		num: 578,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user and its party members are protected from non-damaging attacks made by other Pokemon, including allies, during this turn. Fails if the user moves last this turn or if this move is already in effect for the user's side.",
		shortDesc: "Protects allies from Status moves this turn.",
		id: "craftyshield",
		name: "Crafty Shield",
		pp: 10,
		priority: 3,
		flags: {},
		self: {
			sideCondition: 'craftyshield',
		},
		onTryHitSide: function (side, source) {
			return !!this.willAct();
		},
		effect: {
			duration: 1,
			onStart: function (target, source) {
				this.add('-singleturn', source, 'Crafty Shield');
			},
			onTryHitPriority: 3,
			onTryHit: function (target, source, move) {
				if (move && (move.target === 'self' || move.category !== 'Status')) return;
				this.add('-activate', target, 'move: Crafty Shield');
				source.moveThisTurnResult = true;
				return null;
			},
		},
		secondary: false,
		target: "allySide",
		type: "Fairy",
		zMoveBoost: {spd: 1},
		contestType: "Clever",
	},
	"defendorder": {
		num: 455,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Defense and Special Defense by 1 stage.",
		shortDesc: "Raises the user's Defense and Sp. Def by 1.",
		id: "defendorder",
		isViable: true,
		name: "Defend Order",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		selfBoost: {
		boosts: {
			def: 1,
			spd: 1,
		},
		},
		secondary: false,
		target: "self",
		type: "Bug",
		zMoveBoost: {def: 1},
		contestType: "Clever",
	},
	"defensecurl": {
		num: 111,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Defense by 1 stage. As long as the user remains active, the power of the user's Ice Ball and Rollout will be doubled (this effect is not stackable).",
		shortDesc: "Raises the user's Defense by 1.",
		id: "defensecurl",
		name: "Defense Curl",
		pp: 40,
		priority: 0,
		flags: {snatch: 1},
		selfBoost: {
		boosts: {
			def: 1,
		},
		},
		self: {
		volatileStatus: 'defensecurl',
		},
		effect: {
			noCopy: true,
		},
		secondary: false,
		target: "self",
		type: "Normal",
		zMoveBoost: {accuracy: 1},
		contestType: "Cute",
	},
	"destinybond": {
		num: 194,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Until the user's next turn, if an opposing Pokemon's attack knocks the user out, that Pokemon faints as well, unless the attack was Doom Desire or Future Sight. Fails if the user used this move successfully last turn.",
		shortDesc: "If an opponent knocks out the user, it also faints.",
		id: "destinybond",
		isViable: true,
		name: "Destiny Bond",
		pp: 5,
		priority: 0,
		flags: {authentic: 1},
		self: {
			volatileStatus: 'destinybond',
		},
		onPrepareHit: function (pokemon) {
			return !pokemon.removeVolatile('destinybond');
		},
		effect: {
			onStart: function (pokemon) {
				this.add('-singlemove', pokemon, 'Destiny Bond');
			},
			onFaint: function (target, source, effect) {
				if (!source || !effect || target.side === source.side) return;
				if (effect.effectType === 'Move' && !effect.isFutureMove) {
					this.add('-activate', target, 'move: Destiny Bond');
					source.faint();
				}
			},
			onBeforeMovePriority: -1,
			onBeforeMove: function (pokemon, target, move) {
				if (move.id === 'destinybond') return;
				this.debug('removing Destiny Bond before attack');
				pokemon.removeVolatile('destinybond');
			},
			onMoveAborted: function (pokemon, target, move) {
				pokemon.removeVolatile('destinybond');
			},
			onBeforeSwitchOutPriority: 1,
			onBeforeSwitchOut: function (pokemon) {
				pokemon.removeVolatile('destinybond');
			},
		},
		secondary: false,
		target: "self",
		type: "Ghost",
		zMoveEffect: 'redirect',
		contestType: "Clever",
	},
	"detect": {
		num: 197,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user is protected from most attacks made by other Pokemon during this turn. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails or if the user's last move used is not Baneful Bunker, Detect, Endure, King's Shield, Protect, Quick Guard, Spiky Shield, or Wide Guard. Fails if the user moves last this turn.",
		shortDesc: "Prevents moves from affecting the user this turn.",
		id: "detect",
		isViable: true,
		name: "Detect",
		pp: 5,
		priority: 4,
		flags: {},
		stallingMove: true,
		self: {
		volatileStatus: 'protect',
		},
		onPrepareHit: function (pokemon) {
			return !!this.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit: function (pokemon) {
			pokemon.addVolatile('stall');
		},
		secondary: false,
		target: "self",
		type: "Fighting",
		zMoveBoost: {evasion: 1},
		contestType: "Cool",
	},
	"protect": {
		num: 182,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user is protected from most attacks made by other Pokemon during this turn. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails or if the user's last move used is not Baneful Bunker, Detect, Endure, King's Shield, Protect, Quick Guard, Spiky Shield, or Wide Guard. Fails if the user moves last this turn.",
		shortDesc: "Prevents moves from affecting the user this turn.",
		id: "protect",
		isViable: true,
		name: "Protect",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		self:{
			volatileStatus: 'protect',
		},
		onPrepareHit: function (pokemon) {
			return !!this.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit: function (pokemon) {
			pokemon.addVolatile('stall');
		},
		effect: {
			duration: 1,
			onStart: function (target) {
				this.add('-singleturn', target, 'Protect');
			},
			onTryHitPriority: 3,
			onTryHit: function (target, source, move) {
				if (!move.flags['protect']) {
					if (move.isZ) move.zBrokeProtect = true;
					return;
				}
				this.add('-activate', target, 'move: Protect');
				source.moveThisTurnResult = true;
				let lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				return null;
			},
		},
		secondary: false,
		target: "self",
		type: "Normal",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Cute",
	},
	"doubleteam": {
		num: 104,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's evasiveness by 1 stage.",
		shortDesc: "Raises the user's evasiveness by 1.",
		id: "doubleteam",
		name: "Double Team",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		selfBoost: {
		boosts: {
			evasion: 1,
		},
		},
		secondary: false,
		target: "self",
		type: "Normal",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Cool",
	},
	"dragondance": {
		num: 349,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Attack and Speed by 1 stage.",
		shortDesc: "Raises the user's Attack and Speed by 1.",
		id: "dragondance",
		isViable: true,
		name: "Dragon Dance",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		selfBoost: {
		boosts: {
			atk: 1,
			spe: 1,
		},
		},
		secondary: false,
		target: "self",
		type: "Dragon",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Cool",
	},
	"endure": {
		num: 203,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user will survive attacks made by other Pokemon during this turn with at least 1 HP. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails or if the user's last move used is not Baneful Bunker, Detect, Endure, King's Shield, Protect, Quick Guard, Spiky Shield, or Wide Guard. Fails if the user moves last this turn.",
		shortDesc: "The user survives the next hit with at least 1 HP.",
		id: "endure",
		name: "Endure",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		self: {
			volatileStatus: 'endure',
		},
		onTryHit: function (pokemon) {
			return this.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit: function (pokemon) {
			pokemon.addVolatile('stall');
		},
		effect: {
			duration: 1,
			onStart: function (target) {
				this.add('-singleturn', target, 'move: Endure');
			},
			onDamagePriority: -10,
			onDamage: function (damage, target, source, effect) {
				if (effect && effect.effectType === 'Move' && damage >= target.hp) {
					this.add('-activate', target, 'move: Endure');
					return target.hp - 1;
				}
			},
		},
		secondary: false,
		target: "self",
		type: "Normal",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Tough",
	},
	"extremeevoboost": {
		num: 702,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Attack, Defense, Special Attack, Special Defense, and Speed by 2 stages.",
		shortDesc: "Raises user's Atk, Def, SpA, SpD, and Spe by 2.",
		id: "extremeevoboost",
		isViable: true,
		name: "Extreme Evoboost",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "eeviumz",
		selfBoost: {
		boosts: {
			atk: 2,
			def: 2,
			spa: 2,
			spd: 2,
			spe: 2,
		},
		},
		secondary: false,
		target: "self",
		type: "Normal",
		contestType: "Beautiful",
	},
	"swordsdance": {
		num: 14,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Attack by 2 stages.",
		shortDesc: "Raises the user's Attack by 2.",
		id: "swordsdance",
		isViable: true,
		name: "Swords Dance",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		selfBoost: {
			boosts: {
			atk: 2,
			}
		},
		secondary: false,
		target: "self",
		type: "Normal",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Beautiful",
	},
	"irondefense": {
		num: 334,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Defense by 2 stages.",
		shortDesc: "Raises the user's Defense by 2.",
		id: "irondefense",
		name: "Iron Defense",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		selfBoost: {
		boosts: {
			def: 2,
		}
		},
		secondary: false,
		target: "self",
		type: "Steel",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Tough",
	},
	"nastyplot": {
		num: 417,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Special Attack by 2 stages.",
		shortDesc: "Raises the user's Sp. Atk by 2.",
		id: "nastyplot",
		isViable: true,
		name: "Nasty Plot",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		selfBoost: {
		boosts: {
			spa: 2,
		}
		},
		secondary: false,
		target: "self",
		type: "Dark",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Clever",
	},
	"floralhealing": {
		num: 666,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The target restores 1/2 of its maximum HP, rounded half up. If the terrain is Grassy Terrain, the target instead restores 2/3 of its maximum HP, rounded half down.",
		shortDesc: "Heals the target by 50% of its max HP.",
		id: "floralhealing",
		name: "Floral Healing",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, heal: 1, mystery: 1},
		self: {
			onHit: function (target) {
			if (this.field.isTerrain('grassyterrain')) {
				return this.heal(this.modify(target.maxhp, 0.667)); // TODO: find out the real value
			} else {
				return this.heal(Math.ceil(target.maxhp * 0.5));
			}
			}
		},
		secondary: false,
		target: "normal",
		type: "Fairy",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Beautiful",
	},
	"healorder": {
		num: 456,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP, rounded half up.",
		shortDesc: "Heals the user by 50% of its max HP.",
		id: "healorder",
		isViable: true,
		name: "Heal Order",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		self: {
			heal: [1, 2],
		},
		secondary: false,
		target: "self",
		type: "Bug",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Clever",
	},
	"milkdrink": {
		num: 208,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP, rounded half up.",
		shortDesc: "Heals the user by 50% of its max HP.",
		id: "milkdrink",
		isViable: true,
		name: "Milk Drink",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		self: {
			heal: [1, 2],
		},
		secondary: false,
		target: "self",
		type: "Normal",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Cute",
	},
	"moonlight": {
		num: 236,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP if no weather conditions are in effect, 2/3 of its maximum HP if the weather is Sunny Day, and 1/4 of its maximum HP if the weather is Hail, Rain Dance, or Sandstorm, all rounded half down.",
		shortDesc: "Heals the user by a weather-dependent amount.",
		id: "moonlight",
		isViable: true,
		name: "Moonlight",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		self:{
			onHit: function (pokemon) {
			if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				return this.heal(this.modify(pokemon.maxhp, 0.667));
			} else if (this.field.isWeather(['raindance', 'primordialsea', 'sandstorm', 'hail'])) {
				return this.heal(this.modify(pokemon.maxhp, 0.25));
			} else {
				return this.heal(this.modify(pokemon.maxhp, 0.5));
			}
			}
		},
		secondary: false,
		target: "self",
		type: "Fairy",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Beautiful",
	},
	"morningsun": {
		num: 234,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP if no weather conditions are in effect, 2/3 of its maximum HP if the weather is Sunny Day, and 1/4 of its maximum HP if the weather is Hail, Rain Dance, or Sandstorm, all rounded half down.",
		shortDesc: "Heals the user by a weather-dependent amount.",
		id: "morningsun",
		isViable: true,
		name: "Morning Sun",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		self:{
			onHit: function (pokemon) {
			if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				return this.heal(this.modify(pokemon.maxhp, 0.667));
			} else if (this.field.isWeather(['raindance', 'primordialsea', 'sandstorm', 'hail'])) {
				return this.heal(this.modify(pokemon.maxhp, 0.25));
			} else {
				return this.heal(this.modify(pokemon.maxhp, 0.5));
			}
			}
		},
		secondary: false,
		target: "self",
		type: "Normal",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Beautiful",
	},
	"recover": {
		num: 105,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP, rounded half up.",
		shortDesc: "Heals the user by 50% of its max HP.",
		id: "recover",
		isViable: true,
		name: "Recover",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		self:{
			heal: [1, 2],
		},
		secondary: false,
		target: "self",
		type: "Normal",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Clever",
	},
	"rest": {
		num: 156,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user falls asleep for the next two turns and restores all of its HP, curing itself of any major status condition in the process. Fails if the user has full HP, is already asleep, or if another effect is preventing sleep.",
		shortDesc: "User sleeps 2 turns and restores HP and status.",
		id: "rest",
		isViable: true,
		name: "Rest",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onTryMove: function (pokemon) {
			if (pokemon.hp < pokemon.maxhp && pokemon.status !== 'slp' && !pokemon.hasAbility('comatose')) return;
			this.add('-fail', pokemon);
			return null;
		},
		self: {
			onHit: function (target) {
			if (!target.setStatus('slp')) return false;
			target.statusData.time = 3;
			target.statusData.startTime = 3;
			this.heal(target.maxhp); //Aeshetic only as the healing happens after you fall asleep in-game
			this.add('-status', target, 'slp', '[from] move: Rest');
			}
		},
		secondary: false,
		target: "self",
		type: "Psychic",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Cute",
	},
	"roost": {
		num: 355,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP, rounded half up. Until the end of the turn, Flying-type users lose their Flying type and pure Flying-type users become Normal type. Does nothing if the user's HP is full.",
		shortDesc: "Heals 50% HP. Flying-type removed 'til turn ends.",
		id: "roost",
		isViable: true,
		name: "Roost",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		self: {
			heal: [1, 2],
			volatileStatus: 'roost',
		},
		effect: {
			duration: 1,
			onResidualOrder: 20,
			onTypePriority: -1,
			onType: function (types, pokemon) {
				this.effectData.typeWas = types;
				return types.filter(type => type !== 'Flying');
			},
		},
		secondary: false,
		target: "self",
		type: "Flying",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Clever",
	},
	"shoreup": {
		num: 659,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP, rounded half down. If the weather is Sandstorm, the user instead restores 2/3 of its maximum HP, rounded half down.",
		shortDesc: "User restores 1/2 its max HP; 2/3 in Sandstorm.",
		id: "shoreup",
		isViable: true,
		name: "Shore Up",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		self:{
			onHit: function (pokemon) {
			if (this.field.isWeather('sandstorm')) {
				return this.heal(this.modify(pokemon.maxhp, 0.667));
			} else {
				return this.heal(this.modify(pokemon.maxhp, 0.5));
			}
			}
		},
		secondary: false,
		target: "self",
		type: "Ground",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Beautiful",
	},
	"slackoff": {
		num: 303,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP, rounded half up.",
		shortDesc: "Heals the user by 50% of its max HP.",
		id: "slackoff",
		isViable: true,
		name: "Slack Off",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		self:{
			heal: [1, 2],
		},
		secondary: false,
		target: "self",
		type: "Normal",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Cute",
	},
	"softboiled": {
		num: 135,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP, rounded half up.",
		shortDesc: "Heals the user by 50% of its max HP.",
		id: "softboiled",
		isViable: true,
		name: "Soft-Boiled",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		self:{
			heal: [1, 2],
		},
		secondary: false,
		target: "self",
		type: "Normal",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Cute",
	},
	"swallow": {
		num: 256,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores its HP based on its Stockpile count. Restores 1/4 of its maximum HP if it's 1, 1/2 of its maximum HP if it's 2, both rounded half down, and all of its HP if it's 3. Fails if the user's Stockpile count is 0. The user's Defense and Special Defense decrease by as many stages as Stockpile had increased them, and the user's Stockpile count resets to 0.",
		shortDesc: "Heals the user based on uses of Stockpile.",
		id: "swallow",
		name: "Swallow",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onTryHit: function (pokemon) {
			if (!pokemon.volatiles['stockpile'] || !pokemon.volatiles['stockpile'].layers) return false;
		},
		self:{
			onHit: function (pokemon) {
			let healAmount = [0.25, 0.5, 1];
			let healedBy = this.heal(this.modify(pokemon.maxhp, healAmount[(pokemon.volatiles['stockpile'].layers - 1)]));
			pokemon.removeVolatile('stockpile');
			return healedBy;
			}
		},
		secondary: false,
		target: "self",
		type: "Normal",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Tough",
	},
	"substitute": {
		num: 164,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user takes 1/4 of its maximum HP, rounded down, and puts it into a substitute to take its place in battle. The substitute is removed once enough damage is inflicted on it, or if the user switches out or faints. Baton Pass can be used to transfer the substitute to an ally, and the substitute will keep its remaining HP. Until the substitute is broken, it receives damage from all attacks made by other Pokemon and shields the user from status effects and stat stage changes caused by other Pokemon. Sound-based moves and Pokemon with the Ability Infiltrator ignore substitutes. The user still takes normal damage from weather and status effects while behind its substitute. If the substitute breaks during a multi-hit attack, the user will take damage from any remaining hits. If a substitute is created while the user is partially trapped, the partial-trapping effect ends immediately. This move fails if the user does not have enough HP remaining to create a substitute, or if it already has a substitute.",
		shortDesc: "User takes 1/4 its max HP to put in a Substitute.",
		id: "substitute",
		isViable: true,
		name: "Substitute",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, nonsky: 1},
		self:{
			volatileStatus: 'Substitute',
		},
		onTryHit: function (target) {
			if (target.volatiles['substitute']) {
				this.add('-fail', target, 'move: Substitute');
				return null;
			}
			if (target.hp <= target.maxhp / 4 || target.maxhp === 1) { // Shedinja clause
				this.add('-fail', target, 'move: Substitute', '[weak]');
				return null;
			}
		},
		self:{
			onHit: function (target) {
			this.directDamage(target.maxhp / 4);
			}
		},
		effect: {
			onStart: function (target) {
				this.add('-start', target, 'Substitute');
				this.effectData.hp = Math.floor(target.maxhp / 4);
				delete target.volatiles['partiallytrapped'];
			},
			onTryPrimaryHitPriority: -1,
			onTryPrimaryHit: function (target, source, move) {
				if (target === source || move.flags['authentic'] || move.infiltrates) {
					return;
				}
				let damage = this.getDamage(source, target, move);
				if (!damage && damage !== 0) {
					this.add('-fail', target);
					return null;
				}
				damage = this.runEvent('SubDamage', target, source, move, damage);
				if (!damage) {
					return damage;
				}
				if (damage > target.volatiles['substitute'].hp) {
					damage = target.volatiles['substitute'].hp;
				}
				target.volatiles['substitute'].hp -= damage;
				source.lastDamage = damage;
				if (target.volatiles['substitute'].hp <= 0) {
					target.removeVolatile('substitute');
				} else {
					this.add('-activate', target, 'move: Substitute', '[damage]');
				}
				if (move.recoil) {
					this.damage(this.calcRecoilDamage(damage, move), source, target, 'recoil');
				}
				if (move.drain) {
					this.heal(Math.ceil(damage * move.drain[0] / move.drain[1]), source, target, 'drain');
				}
				this.singleEvent('AfterSubDamage', move, null, target, source, move);
				this.runEvent('AfterSubDamage', target, source, move, damage);
				return 0; // hit
			},
			onEnd: function (target) {
				this.add('-end', target, 'Substitute');
			},
		},
		secondary: false,
		target: "self",
		type: "Normal",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Cute",
	},
	"quiverdance": {
		num: 483,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Special Attack, Special Defense, and Speed by 1 stage.",
		shortDesc: "Raises the user's Sp. Atk, Sp. Def, Speed by 1.",
		id: "quiverdance",
		isViable: true,
		name: "Quiver Dance",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		selfBoost:{
			boosts: {
			spa: 1,
			spd: 1,
			spe: 1,
		}
		},
		secondary: false,
		target: "self",
		type: "Bug",
		zMoveEffect: 'clearnegativeboost',
		contestType: "Beautiful",
	},
	"magiccoat": {
		num: 277,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Until the end of the turn, the user is unaffected by certain non-damaging moves directed at it and will instead use such moves against the original user. Moves reflected in this way are unable to be reflected again by this or the Ability Magic Bounce's effect. Spikes, Stealth Rock, Sticky Web, and Toxic Spikes can only be reflected once per side, by the leftmost Pokemon under this or the Ability Magic Bounce's effect. If the user has the Ability Soundproof, this move's effect happens before a sound-based move can be nullified. The Abilities Lightning Rod and Storm Drain redirect their respective moves before this move takes effect.",
		shortDesc: "Bounces back certain non-damaging moves.",
		id: "magiccoat",
		isViable: true,
		name: "Magic Coat",
		pp: 15,
		priority: 4,
		flags: {},
		self: {
			volatileStatus: 'magiccoat',
		},
		effect: {
			duration: 1,
			onStart: function (target, source, effect) {
				this.add('-singleturn', target, 'move: Magic Coat');
				if (effect && effect.effectType === 'Move') {
					this.effectData.pranksterBoosted = effect.pranksterBoosted;
				}
			},
			onTryHitPriority: 2,
			onTryHit: function (target, source, move) {
				if (target === source || move.hasBounced || !move.flags['reflectable']) {
					return;
				}
				let newMove = this.getMoveCopy(move.id);
				newMove.hasBounced = true;
				newMove.pranksterBoosted = this.effectData.pranksterBoosted;
				this.useMove(newMove, target, source);
				return null;
			},
			onAllyTryHitSide: function (target, source, move) {
				if (target.side === source.side || move.hasBounced || !move.flags['reflectable']) {
					return;
				}
				let newMove = this.getMoveCopy(move.id);
				newMove.hasBounced = true;
				newMove.pranksterBoosted = false;
				this.useMove(newMove, this.effectData.target, source);
				return null;
			},
		},
		secondary: false,
		target: "self",
		type: "Psychic",
		zMoveBoost: {spd: 2},
		contestType: "Beautiful",
	},
	"magnetrise": {
		num: 393,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the user is immune to Ground-type attacks and the effects of Spikes, Toxic Spikes, Sticky Web, and the Ability Arena Trap as long as it remains active. If the user uses Baton Pass, the replacement will gain the effect. Ingrain, Smack Down, Thousand Arrows, and Iron Ball override this move if the user is under any of their effects. Fails if the user is already under this effect or the effects of Ingrain, Smack Down, or Thousand Arrows.",
		shortDesc: "For 5 turns, the user is immune to Ground moves.",
		id: "magnetrise",
		name: "Magnet Rise",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, gravity: 1},
		self:{
			volatileStatus: 'magnetrise',
		},
		effect: {
			duration: 5,
			onStart: function (target) {
				if (target.volatiles['smackdown'] || target.volatiles['ingrain']) return false;
				this.add('-start', target, 'Magnet Rise');
			},
			onImmunity: function (type) {
				if (type === 'Ground') return false;
			},
			onResidualOrder: 15,
			onEnd: function (target) {
				this.add('-end', target, 'Magnet Rise');
			},
		},
		secondary: false,
		target: "self",
		type: "Electric",
		zMoveBoost: {evasion: 1},
		contestType: "Clever",
	},
	"tailwind": {
		num: 366,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 4 turns, the user and its party members have their Speed doubled. Fails if this move is already in effect for the user's side.",
		shortDesc: "For 4 turns, allies' Speed is doubled.",
		id: "tailwind",
		isViable: true,
		name: "Tailwind",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		self:{
			sideCondition: 'tailwind',
		},
		effect: {
			duration: 4,
			durationCallback: function (target, source, effect) {
				if (source && source.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 6;
				}
				return 4;
			},
			onStart: function (side) {
				this.add('-sidestart', side, 'move: Tailwind');
			},
			onModifySpe: function (spe, pokemon) {
				return this.chainModify(2);
			},
			onResidualOrder: 21,
			onResidualSubOrder: 4,
			onEnd: function (side) {
				this.add('-sideend', side, 'move: Tailwind');
			},
		},
		secondary: false,
		target: "allySide",
		type: "Flying",
		zMoveEffect: 'crit2',
		contestType: "Cool",
	},
	"healbell": {
		num: 215,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Every Pokemon in the user's party is cured of its major status condition. Active Pokemon with the Ability Soundproof are not cured.",
		shortDesc: "Cures the user's party of all status conditions.",
		id: "healbell",
		isViable: true,
		name: "Heal Bell",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, sound: 1, distance: 1, authentic: 1},
		self:{
			onHit: function (pokemon, source) {
			this.add('-activate', source, 'move: Heal Bell');
			let side = pokemon.side;
			let success = false;
			for (const ally of side.pokemon) {
				if (ally.hasAbility('soundproof')) continue;
				if (ally.cureStatus()) success = true;
			}
			return success;
		},
		},
		target: "allyTeam",
		type: "Normal",
		zMoveEffect: 'heal',
		contestType: "Beautiful",
	},
	"banefulbunker": {
		num: 661,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user is protected from most attacks made by other Pokemon during this turn, and Pokemon making contact with the user become poisoned. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails or if the user's last move used is not Baneful Bunker, Detect, Endure, King's Shield, Protect, Quick Guard, Spiky Shield, or Wide Guard. Fails if the user moves last this turn.",
		shortDesc: "Protects from moves. Contact: poison.",
		id: "banefulbunker",
		isViable: true,
		name: "Baneful Bunker",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		self:{
			volatileStatus: 'banefulbunker',
		},
		onTryHit: function (target, source, move) {
			return !!this.willAct() && this.runEvent('StallMove', target);
		},
		onHit: function (pokemon) {
			pokemon.addVolatile('stall');
		},
		effect: {
			duration: 1,
			onStart: function (target) {
				this.add('-singleturn', target, 'move: Protect');
			},
			onTryHitPriority: 3,
			onTryHit: function (target, source, move) {
				if (!move.flags['protect']) {
					if (move.isZ) move.zBrokeProtect = true;
					return;
				}
				this.add('-activate', target, 'move: Protect');
				source.moveThisTurnResult = true;
				let lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (move.flags['contact']) {
					source.trySetStatus('psn', target);
				}
				return null;
			},
		},
		secondary: false,
		target: "self",
		type: "Poison",
		zMoveBoost: {def: 1},
		contestType: "Tough",
	},
};
	//TODO: 
	// Suspect: Automize, 
exports.BattleMovedex = BattleMovedex;
