export const Moves: {[moveid: string]: ModdedMoveData} = {
	citrusysting: {
		accuracy: 90,
		basePower: 0,
		category: "Status",
    shortDesc: "Paralyzes the target. Grass-types are immune.",
		isViable: true,
		name: "Citrusy Sting",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, powder: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acid Spray", target);
		},
		status: 'par',
		ignoreImmunity: false,
		secondary: null,
		target: "normal",
		type: "Grass",
		zMove: {boost: {spd: 1}},
		contestType: "Cool",
	},
	berryblast: {
		accuracy: 100,
		basePower: 0,
		category: "Special",
    shortDesc: "Power and type depends on the user's berry.",
		isViable: true,
		name: "Berry Blast",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Terrain Pulse", target);
		},
		onModifyType(move, pokemon) {
			if (pokemon.ignoringItem()) return;
			const item = pokemon.getItem();
			if (!item.naturalGift) return;
			move.type = item.naturalGift.type;
		},
		onPrepareHit(target, pokemon, move) {
			if (pokemon.ignoringItem()) return false;
			const item = pokemon.getItem();
			if (!item.naturalGift) return false;
			move.basePower = item.naturalGift.basePower;
			pokemon.setItem('');
			pokemon.lastItem = item.id;
			pokemon.usedItemThisTurn = true;
			this.runEvent('AfterUseItem', pokemon, null, null, item);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Clever",
	},
	bushclaws: {
		num: 358,
		accuracy: 100,
		basePower: 85,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'slp' || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Physical",
    shortDesc: "Power doubles if the target is asleep.",
		isViable: true,
		name: "Bush Claws",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Metal Claw", target);
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Tough",
	},
	revelationspin: {
		num: 686,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
    shortDesc: "Type matches the user's primary type.",
		isViable: true,
		name: "Revelation Spin",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, dance: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		onModifyType(move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Beautiful",
	},
	fieldofvision: {
		accuracy: true,
		basePower: 0,
		category: "Status",
    shortDesc: "Protects the user. If the opponent makes contact, lowers their SpD by 2",
		isViable: true,
		name: "Field of Vision",
		pp: 10,
		priority: 4,
		flags: {},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Laser Focus", target);
		},
		stallingMove: true,
		volatileStatus: 'fieldofvision',
		onTryHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect'] || move.category === 'Status') {
					if (move.isZ || (move.isMax && !move.breaksProtect)) target.getMoveHitData(move).zBrokeProtect = true;
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
				if (move.flags['contact']) {
					this.boost({spd: -2}, source, target, this.dex.getActiveMove("Field of Vision"));
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && move.flags['contact']) {
					this.boost({spd: -2}, source, target, this.dex.getActiveMove("Field of Vision"));
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Psychic",
	},
	jawcrush: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
    shortDesc: "Traps both the user and the target",
		isViable: true,
		name: "Jaw Crush",
		pp: 15,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Crunch", target);
		},
		onHit(target, source, move) {
			source.addVolatile('trapped', target, move, 'trapper');
			target.addVolatile('trapped', source, move, 'trapper');
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
/*
	clinch: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Clinch",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			onHit(pokemon, target, move) {
				if (target.newlySwitched || this.queue.willMove(target)) {
						this.boost({def: -1}, pokemon);
				}
						this.boost({spe: -1}, pokemon);			
			},
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},

	sonicpulse: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Sonic Pulse",
		pp: 30,
		priority: 0,
		flags: {snatch: 1},
		volatileStatus: 'sonicpulse',
		condition: {
			duration: 100,
			onStart(pokemon, source, effect) {
				if (effect && (['imposter', 'psychup', 'transform'].includes(effect.id))) {
					this.add('-start', pokemon, 'move: Sonic Pulse', '[silent]');
				} else {
					this.add('-start', pokemon, 'move: Sonic Pulse');
				}
			},
			onRestart(pokemon) {
				this.effectData.duration = 100;
				this.add('-start', pokemon, 'move: Sonic Pulse');
			},
			onModifyCritRatio(critRatio) {
				return 5;
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Sonic Pulse', '[silent]');
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {boost: {atk: 1}},
		contestType: "Cool",
	},
*/
	centuryblade: {
		accuracy: 90,
		basePower: 120,
		category: "Physical",
    shortDesc: "Charges turn 1. Hits turn 2. +1 Def when charging. Attacks immediately under sun.",
		isViable: true,
		name: "Century Blade",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1, contact: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({atk: 1}, attacker, attacker, move);
			if (['sunnyday', 'desolateland'].includes(attacker.effectiveWeather())) {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Rock",
	},
	drainfang: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
    shortDesc: "Heals the user by 50% of the damage dealt.",
		isViable: true,
		name: "Drain Fang",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1, bite: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Strength Sap", target);
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
	},
	terracharge: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
    shortDesc: "Deals 33% of the damage dealt in recoil. 10% chance to lower the target's Speed.",
		isViable: true,
		name: "Terra Charge",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Head Smash", target);
		},
		recoil: [33, 100],
		secondary: {
			chance: 10,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Ground",
		contestType: "Cool",
	},
	pressurecook: {
		accuracy: 100,
		basePower: 70,
		category: "Special",
    shortDesc: "Super effective on Water.",
		isViable: true,
		name: "Pressure Cook",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psyshock", target);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Water') return 1;
		},
		target: "normal",
		type: "Psychic",
		contestType: "Beautiful",
	},
	poisondart: {
		accuracy: 100,
		basePower: 40,
		category: "Physical",
    shortDesc: "Usually goes first. 10% chance to poison",
		isViable: true,
		name: "Poison Dart",
		pp: 30,
		priority: 1,
		flags: {protect: 1, mirror: 1, contact: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Sting", target);
		},
		secondary: {
			chance: 10,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		contestType: "Beautiful",
	},
	darkfang: {
		accuracy: 100,
		basePower: 50,
		category: "Physical",
    shortDesc: "Hits twice. Doubles: Tries to hit each foe once",
		isViable: true,
		name: "Dark Fang",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, bite: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bite", target);
		},
		multihit: 2,
		smartTarget: true,
		secondary: null,
		target: "normal",
		type: "Dark",
		maxMove: {basePower: 130},
	},
	eyeofchaos: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
    shortDesc: "Uses user's SpD stat as SpA in damage calculation.",
		isViable: true,
		name: "Eye of Chaos",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Glare", target);
		},
		useSourceDefensiveAsOffensive: true,
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	dreadwing: {
		accuracy: 100,
		basePower: 95,
		category: "Special",
    shortDesc: "Uses target's SpA stat in damage calculation.",
		isViable: true,
		name: "Dread Wing",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Oblivion Wing", target);
		},
		useTargetOffensive: true,
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Clever",
	},
	forestrage: {
		accuracy: 95,
		basePower: 85,
		category: "Physical",
    shortDesc: "Ignores resistances.",
		isViable: true,
		name: "Forest Rage",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Work Up", target);
			this.add('-anim', source, "Leaf Storm", target);
		},
        onEffectiveness(typeMod, target, type) {
            if (typeMod < 0) {
                this.debug('Ignoring resist');
                return 0;
            }
        },
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Clever",
	},
	riverwrath: {
		accuracy: 95,
		basePower: 85,
		category: "Special",
    shortDesc: "Ignores resistances.",
		isViable: true,
		name: "River Wrath",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Work Up", target);
			this.add('-anim', source, "Hydro Pump", target);
		},
        onEffectiveness(typeMod, target, type) {
            if (typeMod < 0) {
                this.debug('Ignoring resist');
                return 0;
            }
        },
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Clever",
	},
	
// Flare Up, Toxic Snowball
};
