export const Moves: {[moveid: string]: ModdedMoveData} = {
	diamonddust: {
		num: 3010,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		shortDesc: "Hits all foes. 40% chance to lower the targets' higher attack stat by 1 stage.",
		name: "Diamond Dust",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Glacial Lance", target);
		},
		secondary: {
            chance: 40,
            onHit(target, source, move) {
                if (target.getStat('atk', false, true) > target.getStat('spa', false, true)) {
                    return !!this.boost({atk: -1}, target, source, move);
                }
                if (target.getStat('atk', false, true) < target.getStat('spa', false, true)) {
                    return !!this.boost({spa: -1}, target, source, move);
                }
                return false;
            },
        },
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
	},
	thunderreign: {
		num: 3011,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "Hits all foes. Ignores type-based and ability-based immunity to Electric.",
		name: "Thunder Reign",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Plasma Fists", target);
		},
		onEffectiveness(typeMod, target, type, move) {
			if (move.type !== 'Electric') return;
			if (!target) return; // avoid crashing when called from a chat plugin
			// ignore effectiveness if the target is Ground type and immune to Electric
			if (!target.runImmunity('Electric')) {
				if (target.hasType('Ground')) return 0;
			}
		},
		ignoreImmunity: {'Electric': true},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Electric",
		contestType: "Cool",
	},
	burningpetals: {
		num: 3012,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		overrideDefensiveStat: 'def',
		shortDesc: "Damages target based on Defense, not Sp. Def.",
		name: "Burning Petals",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Inferno Overdrive", target);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	abyssalslash: {
		num: 3013,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "100% chance to lower the target's Special Defense by 1.",
		name: "Abyssal Slash",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Night Slash", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
	},
	acidrain: {
		num: 3014,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "Hits adjacent pokemon. 40% to poison the target(s).",
		name: "Acid Rain",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Acid Downpour", target);
		},
		secondary: {
			chance: 40,
			status: 'psn',
		},
		target: "allAdjacent",
		type: "Water",
		contestType: "Tough",
	},
	deathgrip: {
		num: 3015,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "Prevents the target from using pivoting moves.",
		name: "Death Grip",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Octolock", target);
		},
		volatileStatus: 'deathgrip',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Death Grip');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.getMove(moveSlot.id);
					if (moveSlot.id === 'uturn' || moveSlot.id === 'voltswitch' || moveSlot.id === 'teleport' || moveSlot.id === 'flipturn' || moveSlot.id === 'partingshot' || moveSlot.id === 'batonpass') {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
				
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},
	divebomb: {
		num: 3016,
		accuracy: 100,
		basePower: 80,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched) {
				this.debug('Dive Bomb damage boost');
				return move.basePower * 1.5;
			}
			this.debug('Dive Bomb NOT boosted');
			return move.basePower;
		},
		category: "Physical",
		shortDesc: "If a foe is switching in, hits it at 1.5x power.",
		name: "Dive Bomb",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Sky Attack", target);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Tough",
	},
	drainingwing: {
		num: 3017,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Draining Wing",
		shortDesc: "User recovers 50% of the damage dealt.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Oblivion Wing", target);
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Tough",
	},
	espwave: {
		num: 3018,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "ESP Wave",
		shortDesc: "Lowers Atk/Sp. Atk/Speed of trapped foes by 1.",
		pp: 20,
		priority: 0,
		flags: {sound: 1, reflectable: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Psywave", target);
		},
		onHit(target, source, move) {
			if (target.volatiles['partiallytrapped'] || target.volatiles['trapped']) {
				return !!this.boost({atk: -1, spa: -1, spe: -1}, target, source, move);
			}
			return false;
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Psychic",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
	},
	rampage: {
		num: 3019,
		accuracy: 100,
		basePower: 100,
		name: "Rampage",
		category: "Physical",
		shortDesc: "Breaks protection. Lowers the user's Defense by 1.",
		pp: 5,
		priority: 0,
		flags: {bypasssub: 1, contact: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
		    this.attrLastMove('[still]');
		    this.add('-anim', source, "Thrash", target);
		},
		self: {
			boosts: {
				def: -1,
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fairy",
		contestType: "Tough",
	},
	acid: {
		inherit: true,
		basePower: 60,
		category: "Physical",
		shortDesc: "100% chance to lower the target's Def by 1.",
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
	},
	acidspray: {
		inherit: true,
		basePower: 50,
	},
	rockwrecker: {
		inherit: true,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		shortDesc: "Raises user's Atk by 1 on turn 1. Hits turn 2.",
		flags: {bullet: 1, charge: 1, protect: 1, mirror: 1},
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
	},
	smog: {
		inherit: true,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		shortDesc: "50% chance to badly poison the target.",
		secondary: {
			chance: 50,
			status: 'tox',
		},
	},
	dynamaxcannon: {
		inherit: true,
		basePower: 100,
		shortDesc: "20% chance to lower the target's Special Defense by 1.",
		flags: {bullet: 1, protect: 1},
		secondary: {
			chance: 20,
			boosts: {
				spd: -1,
			},
		},
	},
	dragonpulse: {
		inherit: true,
		category: "Special",
		shortDesc: "10% chance to raise the user's Special Attack by 1.",
		secondary: {
			chance: 10,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
	},
	dragonclaw: {
		inherit: true,
		shortDesc: "20% chance to lower the target's Attack by 1.",
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			boosts: {
				atk: -1,
			},
		},
	},
	dragonrush: {
		inherit: true,
		accuracy: 100,
		basePower: 85,
	},
	triattack: {
		inherit: true,
		basePower: 35,
		shortDesc: "Hits 3 times.",
		multihit: 3,
		secondary: null,
	},
	behemothblade: {
		inherit: true,
		basePower: 120,
		shortDesc: "Lowers the user's Attack and Defense by 1.",
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		self: {
			boosts: {
				atk: -1,
				def: -1,
			},
		},
	},
	powergem: {
		inherit: true,
		basePower: 95,
	},
	lusterpurge: {
		inherit: true,
		basePower: 80,
		shortDesc: "100% chance to lower the target's Special Defense by 1.",
		pp: 15,
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
	},
	mistball: {
		inherit: true,
		basePower: 80,
		shortDesc: "100% chance to lower the target's Special Attack by 1.",
		pp: 15,
		flags: {bullet: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				spa: -1,
			},
		},
	},
	floralhealing: {
		inherit: true,
		flags: {protect: 1, heal: 1},
		onHit(target, source) {
			let success = false;
			let factor = 0.5;
			if (this.field.isTerrain('grassyterrain')) factor = 0.667;
			if (source.hasAbility('divinegrace')) factor = factor * 1.5;
			success = !!this.heal(Math.ceil(target.baseMaxhp * factor));
			if (success && !target.isAlly(source)) {
				target.staleness = 'external';
			}
			if (!success) {
				this.add('-fail', target, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	healorder: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			if (pokemon.hasAbility('divinegrace')) factor = 0.75;
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
		secondary: null,
		target: "self",
		type: "Bug",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	healpulse: {
		inherit: true,
		onHit(target, source) {
			let success = false;
			if (source.hasAbility('megalauncher') || source.hasAbility('divinegrace')) {
				success = !!this.heal(this.modify(target.baseMaxhp, 0.75));
			} else {
				success = !!this.heal(Math.ceil(target.baseMaxhp * 0.5));
			}
			if (success && !target.isAlly(source)) {
				target.staleness = 'external';
			}
			if (!success) {
				this.add('-fail', target, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	junglehealing: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.25;
			if (pokemon.hasAbility('divinegrace')) factor = 0.375;
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			return pokemon.cureStatus() || success;
		},
	},
	lifedew: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.25;
			if (pokemon.hasAbility('divinegrace')) factor = 0.375;
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	milkdrink: {
		inherit: true,
		pp: 10,
		onHit(pokemon) {
			let factor = 0.5;
			if (pokemon.hasAbility('divinegrace')) factor = 0.75;
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	moonlight: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
				factor = 0.25;
				break;
			}
			if (pokemon.hasAbility('divinegrace')) factor = factor * 1.5;
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	morningsun: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
				factor = 0.25;
				break;
			}
			if (pokemon.hasAbility('divinegrace')) factor = factor * 1.5;
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	purify: {
		inherit: true,
		onHit(target, source) {
			let factor = 0.5;
			if (source.hasAbility('divinegrace')) factor = 0.75;
			if (!target.cureStatus()) return this.NOT_FAIL;
			this.heal(Math.ceil(source.maxhp * factor), source);
		},
	},
	recover: {
		inherit: true,
		pp: 10,
		onHit(pokemon) {
			let factor = 0.5;
			if (pokemon.hasAbility('divinegrace')) factor = 0.75;
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	roost: {
		inherit: true,
		pp: 10,
		onHit(pokemon) {
			let factor = 0.5;
			if (pokemon.hasAbility('divinegrace')) factor = 0.75;
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	shoreup: {
		inherit: true,
		pp: 10,
		onHit(pokemon) {
			let factor = 0.5;
			if (this.field.isWeather('sandstorm')) {
				factor = 0.667;
			}
			if (pokemon.hasAbility('divinegrace')) factor = factor * 1.5;
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	sheercold: {
		inherit: true,
		accuracy: 90,
		basePower: 110,
		category: "Special",
		shortDesc: "Lowers the user's Special Attack by 1.",
		self: {
			boosts: {
				spa: -1,
			},
		},
		zMove: {basePower: 180},
	},
	skittersmack: {
		inherit: true,
		basePower: 80,
	},
	softboiled: {
		inherit: true,
		pp: 10,
		onHit(pokemon) {
			let factor = 0.5;
			if (pokemon.hasAbility('divinegrace')) factor = 0.75;
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	strengthsap: {
		inherit: true,
		pp: 10,
		onHit(target, source) {
			if (target.boosts.atk === -6) return false;
			const atk = target.getStat('atk', false, true);
			if (source.hasAbility('divinegrace')) atk = atk * 1.5;
			const success = this.boost({atk: -1}, target, source, null, false, true);
			return !!(this.heal(atk, source, target) || success);
		},
	},
	swallow: {
		inherit: true,
		onTry(source) {
			return !!source.volatiles['stockpile'];
		},
		onHit(pokemon) {
			const healAmount = [0.25, 0.5, 1];
			if (pokemon.hasAbility('divinegrace')) healAmount = [0.375, 0.75, 1];
			const success = !!this.heal(this.modify(pokemon.maxhp, healAmount[(pokemon.volatiles['stockpile'].layers - 1)]));
			if (!success) this.add('-fail', pokemon, 'heal');
			pokemon.removeVolatile('stockpile');
			return success || this.NOT_FAIL;
		},
	},
	synthesis: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
				factor = 0.25;
				break;
			}
			if (pokemon.hasAbility('divinegrace')) factor = factor * 1.5;
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	wish: {
		inherit: true,
		condition: {
			duration: 2,
			onStart(pokemon, source) {
				if (source.hasAbility('divinegrace')) this.effectState.hp = source.maxhp / 2 * 1.5;
				else this.effectState.hp = source.maxhp / 2;
			},
			onResidualOrder: 4,
			onEnd(target) {
				if (target && !target.fainted) {
					const damage = this.heal(this.effectState.hp, target, target);
					if (damage) {
						this.add('-heal', target, target.getHealth, '[from] move: Wish', '[wisher] ' + this.effectState.source.name);
					}
				}
			},
		},
	},
	xscissor: {
		inherit: true,
		basePower: 45,
		shortDesc: "Hits twice.",
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		multihit: 2,
	},
	twineedle: {
		inherit: true,
		basePower: 40,
		shortDesc: "Hits twice. Both hits have a 30% chance to poison.",
		secondary: {
			chance: 30,
		},
			status: 'psn',
	},
	octazooka: {
		inherit: true,
		basePower: 80,
		shortDesc: "100% chance to lower the target's Special Defense by 1.",
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
	},
	infestation: {
		inherit: true,
		basePower: 80,
	},
	ancientpower: {
		inherit: true,
		basePower: 130,
		shortDesc: "Lowers the user's Special Attack by 2.",
		self: {
			boosts: {
				spa: -2,
			},
		},
		secondary: null,
	},
	ominouswind: {
		inherit: true,
		shortDesc: "Forces the target to switch to a random ally.",
		priority: -6,
		flags: {protect: 1, mirror: 1, wind: 1},
		forceSwitch: true,
		secondary: null,
	},
	silverwind: {
		inherit: true,
		basePower: 120,
		shortDesc: "Raises user's SpA by 1 on turn 1. Hits turn 2.",
		flags: {protect: 1, mirror: 1, wind: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({spa: 1}, attacker, attacker, move);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: null,
	},
	grasspledge: {
		inherit: true,
		shortDesc: "1.5x power in Grassy Terrain.",
		onModifyMove(move, pokemon) {
			if (this.field.isTerrain('grassyterrain')) {
				move.basePower *= 1.5;
			}
		},
	},
	firepledge: {
		inherit: true,
		shortDesc: "1.5x power in harsh sunlight.",
		onModifyMove(move, pokemon) {
			if (pokemon.effectiveWeather() == 'sunnyday' || pokemon.effectiveWeather() == 'desolateland') {
				move.basePower *= 1.5;
			}
		},
	},
	waterpledge: {
		inherit: true,
		shortDesc: "1.5x power in rain.",
		onModifyMove(move, pokemon) {
			if (pokemon.effectiveWeather() == 'raindance' || pokemon.effectiveWeather() == 'primordialsea') {
				move.basePower *= 1.5;
			}
		},
	},
	metalsound: {
		inherit: true,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		shortDesc: "100% chance to lower the target's Special Defense by 2.",
		secondary: {
			chance: 100,
			boosts: {
				spd: -2,
			},
		},
	},
	sandtomb: {
		inherit: true,
		basePower: 60,
	},
	shockwave: {
		inherit: true,
		basePower: 65,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'par') return move.basePower * 2;
			return move.basePower;
		},
		shortDesc: "Power doubles if the target is paralyzed.",
	},
	furyswipes: {
		inherit: true,
		accuracy: 90,
		basePower: 25,
		type: "Dark",
	},
	feint: {
		inherit: true,
		basePower: 40,
		type: "Dark",
	},
	attackorder: {
		inherit: true,
		basePower: 25,
		shortDesc: "Hits 5 times. 10% chance to lower the target's Defense by 1.",
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
	},
	skyattack: {
		num: 143,
		accuracy: 90,
		basePower: 90,
		category: "Physical",
		name: "Sky Attack",
		shortDesc: "High critical hit ratio.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
	skullbash: {
		num: 130,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Skull Bash",
		shortDesc: "Raises the user's Defense before it moves.",
		pp: 15,
		priority: -3,
		flags: {contact: 1, protect: 1},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('skullbash');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.boost({def: 1}, pokemon);
			},
		},
		// FIXME: onMoveAborted(pokemon) {pokemon.removeVolatile('skullbash')},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('skullbash');
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	vitalthrow: {
		num: 233,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Vital Throw",
		shortDesc: "Raises the user's Attack before it moves.",
		pp: 15,
		priority: -3,
		flags: {contact: 1, protect: 1, mirror: 1},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('vitalthrow');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.boost({atk: 1}, pokemon);
			},
		},
		// FIXME: onMoveAborted(pokemon) {pokemon.removeVolatile('vitalthrow')},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('vitalthrow');
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
	},
	flowershield: {
		num: 579,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Flower Shield",
		shortDesc: "Protects from moves. Contact: sets Leech Seed.",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'spikyshield',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (this.checkMoveMakesContact(move, source, target)) {
					this.damage(source.baseMaxhp / 8, source, target);
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
					if (!target.hasType('Grass')) target.addVolatile('leechseed', source);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Fairy",
		zMove: {boost: {def: 1}},
		contestType: "Beautiful",
	},
	matblock: {
		num: 561,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Mat Block",
		shortDesc: "Protects allies from damaging attacks. Raises the user's Defense and Sp. Def by 1. Turn 1 only.",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, nonsky: 1},
		stallingMove: true,
		sideCondition: 'matblock',
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Mat Block only works on your first turn out.");
				return false;
			}
			return !!this.queue.willAct();
		},
		condition: {
			duration: 1,
			onSideStart(target, source) {
				this.add('-singleturn', source, 'Mat Block');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move && (move.target === 'self' || move.category === 'Status')) return;
				this.add('-activate', target, 'move: Mat Block', move.name);
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				return this.NOT_FAIL;
			},
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					def: 1,
					spd: 1,
				},
			},
		},
		target: "allySide",
		type: "Fighting",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
	},
	aerialace: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
	},
	aircutter: {
		inherit: true,
		flags: {protect: 1, mirror: 1, slicing: 1},
	},
	behemothblade: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
	},
	crosspoison: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
	},
	cut: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
	},
	furycutter: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
	},
	leafblade: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
	},
	nightslash: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
	},
	psychocut: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
	},
	razorleaf: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
	},
	razorshell: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
	},
	sacredsword: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
	},
	slash: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
	},
	solarblade: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
	},
	xscissor: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
	},
};
