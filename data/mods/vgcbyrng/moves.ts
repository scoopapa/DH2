export const Moves: {[k: string]: ModdedMoveData} = {
	//Undexit moves
	hyperspacefury: {
		inherit: true,
		isNonstandard: null,
	},
	hyperspacehole: {
		inherit: true,
		isNonstandard: null,
	},
	icehammer: {
		inherit: true,
		isNonstandard: null,
	},
	judgment: {
		inherit: true,
		isNonstandard: null,
	},
	relicsong: {
		inherit: true,
		isNonstandard: null,
	},
	revelationdance: {
		inherit: true,
		isNonstandard: null,
	},
	
	hail: {
		inherit: true,
		isNonstandard: true,
	},
	recover: {
		inherit: true,
		pp: 5,
	},
	softboiled: {
		inherit: true,
		pp: 5,
	},
	rest: {
		inherit: true,
		pp: 5,
	},
	milkdrink: {
		inherit: true,
		pp: 5,
	},
	slackoff: {
		inherit: true,
		pp: 5,
	},
	roost: {
		inherit: true,
		pp: 5,
	},
	shoreup: {
		inherit: true,
		pp: 5,
	},
	wickedblow: {
		inherit: true,
		basePower: 75,
	},
	grassyglide: {
		inherit: true,
		basePower: 60,
	},
	glaciallance: {
		inherit: true,
		basePower: 120,
	},
	batonpass: {
		num: 226,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Baton Pass",
		pp: 40,
		priority: 0,
		flags: {},
		onHit(target) {
			if (!this.canSwitch(target.side)) {
				this.attrLastMove('[still]');
				this.add('-fail', target);
				return this.NOT_FAIL;
			}
		},
		self: {
			onHit(source) {
				source.skipBeforeSwitchOutEventFlag = true;
			},
		},
		selfSwitch: 'copyvolatile',
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	charge: {
		inherit: true,
		onHit() {},
		condition: {
			onStart(pokemon, source, effect) {
				if (effect && ['Electromorphosis', 'Wind Power'].includes(effect.name)) {
					this.add('-start', pokemon, 'Charge', this.activeMove!.name, '[from] ability: ' + effect.name);
				} else {
					this.add('-start', pokemon, 'Charge');
				}
			},
			onRestart(pokemon, source, effect) {
				if (effect && ['Electromorphosis', 'Wind Power'].includes(effect.name)) {
					this.add('-start', pokemon, 'Charge', this.activeMove!.name, '[from] ability: ' + effect.name);
				} else {
					this.add('-start', pokemon, 'Charge');
				}
			},
			onBasePowerPriority: 9,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Electric') {
					this.debug('charge boost');
					return this.chainModify(2);
				}
			},
			onMoveAborted(pokemon, target, move) {
				if (move.type === 'Electric' && move.id !== 'charge') {
					pokemon.removeVolatile('charge');
				}
			},
			onAfterMove(pokemon, target, move) {
				if (move.type === 'Electric' && move.id !== 'charge') {
					pokemon.removeVolatile('charge');
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Charge', '[silent]');
			},
		},
	},
	auroraveil: {
		inherit: true,
		onTryHitSide() {},
		onTry() {
			return this.field.isWeather(['hail', 'snow']);
		},
		shortDesc: "For 5 turns, damage to allies halved. Snow/Hail only.",
	},
	blizzard: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (['hail', 'snow'].includes(pokemon.effectiveWeather())) move.accuracy = true;
		},
		shortDesc: "10% chance to freeze foe(s). Can't miss in Snow/Hail.",
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
			case 'snow':
				factor = 0.25;
				break;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
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
			case 'snow':
				factor = 0.25;
				break;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
	},
	solarbeam: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			if (['raindance', 'primordialsea', 'sandstorm', 'hail', 'snow'].includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
	},
	solarblade: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			if (['raindance', 'primordialsea', 'sandstorm', 'hail', 'snow'].includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
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
			case 'snow':
				factor = 0.25;
				break;
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
	},
	weatherball: {
		inherit: true,
		onModifyType(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.type = 'Fire';
				break;
			case 'raindance':
			case 'primordialsea':
				move.type = 'Water';
				break;
			case 'sandstorm':
				move.type = 'Rock';
				break;
			case 'hail':
			case 'snow':
				move.type = 'Ice';
				break;
			}
		},
		onModifyMove(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.basePower *= 2;
				break;
			case 'raindance':
			case 'primordialsea':
				move.basePower *= 2;
				break;
			case 'sandstorm':
				move.basePower *= 2;
				break;
			case 'hail':
			case 'snow':
				move.basePower *= 2;
				break;
			}
		},
	},
	//---------------Gen 9 Moves-----------------//
	//PL:A
	ragingfury: {
		num: -1001,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Raging Fury",
		desc: "The user spends two or three turns locked into this move and becomes confused immediately after its move on the last turn of the effect if it is not already. This move targets an opposing Pokemon at random on each turn. If the user is prevented from moving, is asleep at the beginning of a turn, or the attack is not successful against the target on the first turn of the effect or the second turn of a three-turn effect, the effect ends without causing confusion. If this move is called by Sleep Talk and the user is asleep, the move is used for one turn and does not confuse the user.",
		shortDesc: "Lasts 2-3 turns. Confuses the user afterwards.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Inferno Overdrive", target);
		},
		self: {
			volatileStatus: 'lockedmove',
		},
		onAfterMove(pokemon) {
			if (pokemon.volatiles['lockedmove'] && pokemon.volatiles['lockedmove'].duration === 1) {
				pokemon.removeVolatile('lockedmove');
			}
		},
		secondary: null,
		target: "randomNormal",
		type: "Fire",
		contestType: "Cool",
	},
	direclaw: {
		shortDesc: "50% chance to paralyze or poison or sleep target.",
		num: -1005,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Dire Claw",
		desc: "Has a higher chance for a critical hit. Has a 50% chance to cause the target to either fall asleep, become poisoned, or become paralyzed.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Crush Claw", target);
		},
		//critRatio: 2,
		secondary: {
			chance: 50,
			onHit(target, source) {
				const result = this.random(3);
				if (result === 0) {
					target.trySetStatus('psn', source);
				} else if (result === 1) {
					target.trySetStatus('par', source);
				} else {
					target.trySetStatus('slp', source);
				}
			},
		},
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	mountaingale: {
		num: 836,
		accuracy: 85,
		basePower: 100,
		category: "Physical",
		shortDesc: "30% chance to make the target flinch.",
		name: "Mountain Gale",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Ice",
	},
	esperwing: {
		num: 840,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "100% chance to raise user Speed by 1. High crit.",
		name: "Esper Wing",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Air Slash", target);
		},
		critRatio: 2,
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Psychic",
	},
	psyshieldbash: {
		num: -1013,
		accuracy: 90,
		basePower: 70,
		category: "Physical",
		name: "Psyshield Bash",
		desc: "Has a 100% chance to raise the user's Defense by 1 stage.",
		shortDesc: "100% chance to raise the user's Defense by 1.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Zen Headbutt", target);
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					def: 1,
				},
			},
		},
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	stoneaxe: {
		num: -1014,
		accuracy: 90,
		basePower: 65,
		category: "Physical",
		name: "Stone Axe",
		desc: "Has a higher chance for a critical hit. If this move is successful, it sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in. Foes lose 1/32, 1/16, 1/8, 1/4, or 1/2 of their maximum HP, rounded down, based on their weakness to the Rock type; 0.25x, 0.5x, neutral, 2x, or 4x, respectively. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, or is hit by Defog.",
		shortDesc: "Sets Stealth Rock on the target's side.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Stone Edge", target);
		},
		//critRatio: 2,
		sideCondition: 'stealthrock',
		secondary: null,
		target: "adjacentFoe",
		type: "Rock",
		contestType: "Tough",
	},
	headlongrush: {
		num: -1015,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Headlong Rush",
		desc: "Lowers the user's Defense and Special Defense by 1 stage.",
		shortDesc: "Lowers the user's Defense and Sp. Def by 1.",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tectonic Rage", target);
		},
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
		type: "Ground",
		contestType: "Tough",
	},
	powershift: {
		shortDesc: "Switches user's Attack and Defense stats.",
		num: -1017,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Power Shift",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Topsy-Turvy", target);
		},
		volatileStatus: 'powershift',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Power Shift');
				const newatk = pokemon.storedStats.def;
				const newdef = pokemon.storedStats.atk;
				const newspa = pokemon.storedStats.spd;
				const newspd = pokemon.storedStats.spa;
				pokemon.storedStats.atk = newatk;
				pokemon.storedStats.def = newdef;
				pokemon.storedStats.spa = newspa;
				pokemon.storedStats.spd = newspd;
			},
			onCopy(pokemon) {
				const newatk = pokemon.storedStats.def;
				const newdef = pokemon.storedStats.atk;
				const newspa = pokemon.storedStats.spd;
				const newspd = pokemon.storedStats.spa;
				pokemon.storedStats.atk = newatk;
				pokemon.storedStats.def = newdef;
				pokemon.storedStats.spa = newspa;
				pokemon.storedStats.spd = newspd;
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Power Shift');
				const newatk = pokemon.storedStats.def;
				const newdef = pokemon.storedStats.atk;
				const newspa = pokemon.storedStats.spd;
				const newspd = pokemon.storedStats.spa;
				pokemon.storedStats.atk = newatk;
				pokemon.storedStats.def = newdef;
				pokemon.storedStats.spa = newspa;
				pokemon.storedStats.spd = newspd;
			},
			onRestart(pokemon) {
				pokemon.removeVolatile('Power Shift');
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {boost: {atk: 1}},
		contestType: "Clever",
	},
	mysticalpower: {
		shortDesc: "100% chance to raise the user's Sp. Atk by 1.",
		num: -1018,
		accuracy: 90,
		basePower: 70,
		category: "Special",
		name: "Mystical Power",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Stored Power", target);
		},
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	wavecrash: {
		num: -1008,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Wave Crash",
		desc: "If the target lost HP, the user takes recoil damage equal to 33% the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 33% recoil.",
		pp: 10,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Waterfall", target);
		},
		recoil: [1, 3],
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	chloroblast: {
		num: -1002,
		accuracy: 95,
		basePower: 150,
		category: "Special",
		name: "Chloroblast",
		desc: "Whether or not this move is successful and even if it would cause fainting, the user loses 1/2 of its maximum HP, rounded up, unless the user has the Magic Guard Ability.",
		shortDesc: "User loses 50% max HP.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bloom Doom", target);
		},
		mindBlownRecoil: true,
		onAfterMove(pokemon, target, move) {
			if (move.mindBlownRecoil && !move.multihit) {
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.getEffect('Steel Beam'), true);
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
	},
	infernalparade: {
		num: -1003,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Special",
		name: "Infernal Parade",
		desc: "Has a 30% chance to burn the target. Power doubles if the target has a non-volatile status condition.",
		shortDesc: "30% burn. 2x power if target is already statused.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Will-o-Wisp", target);
		},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Ghost",
		zMove: {basePower: 160},
		contestType: "Clever",
	},
	barbbarrage: {
		num: -1004,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Physical",
		name: "Barb Barrage",
		desc: "Has a 50% chance to poison the target. Power doubles if the target is poisoned.",
		shortDesc: "50% psn. 2x power if target already poisoned.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Sting", target);
		},
		secondary: {
			chance: 50,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		zMove: {basePower: 160},
		contestType: "Clever",
	},
	victorydance: {
		num: 837,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Raises the user's Attack, Defense, Speed by 1.",
		name: "Victory Dance",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Quiver Dance", target);
		},
		boosts: {
			atk: 1,
			def: 1,
			spe: 1
		},
		secondary: null,
		target: "self",
		type: "Fighting",
	},
	lunarblessing: {
		num: 849,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User and allies: healed 1/4 max HP, status cured.",
		name: "Lunar Blessing",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.25));
			return pokemon.cureStatus() || success;
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Lunar Dance", target);
		},
		secondary: null,
		target: "allies",
		type: "Psychic",
	},
	bittermalice: {
		num: 841,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		shortDesc: "100% chance to lower the target's Attack by 1.",
		name: "Bitter Malice",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", target);
		},
		target: "normal",
		type: "Ghost",
	},
	shelter: {
		num: 842,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Raises the user's Defense by 2.",
		name: "Shelter",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			def: 2,
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Protect", target);
		},
		secondary: null,
		target: "self",
		type: "Steel",
	},
	//SV
	saltcure: {
		num: 864,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		shortDesc: "Deals 1/8 max HP each turn; 1/4 on Steel, Water.",
		name: "Salt Cure",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		condition: {
			noCopy: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Salt Cure');
			},
			onResidualOrder: 13,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / (pokemon.hasType(['Water', 'Steel']) ? 4 : 8));
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Salt Cure');
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sand Attack", target);
		},
		secondary: {
			chance: 100,
			volatileStatus: 'saltcure',
		},
		target: "normal",
		type: "Rock",
	},
	terablast: {
		num: 851,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "If Terastallized: Phys. if Atk > SpA, type = Tera.",
		name: "Tera Blast",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyType(move, pokemon, target) {
			if (pokemon.terastallized) {
				move.type = pokemon.teraType;
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.terastallized && pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) {
				move.category = 'Physical';
			}
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Terrain Pulse", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	bleakwindstorm: {
		num: 846,
		accuracy: 80,
		basePower: 100,
		category: "Special",
		shortDesc: "30% chance to lower the foe(s) Speed by 1.",
		name: "Bleakwind Storm",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		onModifyMove(move, target) {
			if (['raindance', 'primordialsea'].includes(target?.effectiveWeather())) {
				move.accuracy = true;
			}
		},
		secondary: {
			chance: 30,
			boosts: {
				spe: -1,
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hurricane", target);
		},
		target: "allAdjacentFoes",
		type: "Flying",
	},
	sandsearstorm: {
		num: 848,
		accuracy: 80,
		basePower: 100,
		category: "Special",
		shortDesc: "20% chance to burn foe(s).",
		name: "Sandsear Storm",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		onModifyMove(move, target) {
			if (['raindance', 'primordialsea'].includes(target?.effectiveWeather())) {
				move.accuracy = true;
			}
		},
		secondary: {
			chance: 20,
			status: 'brn',
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Scorching Sands", target);
		},
		target: "allAdjacentFoes",
		type: "Ground",
	},
	springtidestorm: {
		num: 831,
		accuracy: 80,
		basePower: 100,
		category: "Special",
		shortDesc: "30% chance to lower the foe(s) Attack by 1.",
		name: "Springtide Storm",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		secondary: {
			chance: 30,
			boosts: {
				atk: -1,
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fairy Wind", target);
		},
		target: "allAdjacentFoes",
		type: "Fairy",
	},
	wildboltstorm: {
		num: 847,
		accuracy: 80,
		basePower: 100,
		category: "Special",
		shortDesc: "20% chance to paralyze foe(s).",
		name: "Wildbolt Storm",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		onModifyMove(move, target) {
			if (['raindance', 'primordialsea'].includes(target?.effectiveWeather())) {
				move.accuracy = true;
			}
		},
		secondary: {
			chance: 20,
			status: 'par',
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Thunder", target);
		},
		target: "allAdjacentFoes",
		type: "Electric",
	},
	ceaselessedge: {
		num: 845,
		accuracy: 90,
		basePower: 65,
		category: "Physical",
		shortDesc: "Sets a layer of Spikes on the opposing side.",
		name: "Ceaseless Edge",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		self: {
			onHit(source) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('spikes');
				}
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Night Slash", target);
		},
		secondary: {}, // allows sheer force to trigger
		target: "normal",
		type: "Dark",
	},
	silktrap: {
		num: 852,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Protects from damaging attacks. Contact: -1 Spe.",
		name: "Silk Trap",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'silktrap',
		onPrepareHit(pokemon) {
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
					this.boost({spe: -1}, source, target, this.dex.getActiveMove("Silk Trap"));
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
					this.boost({spe: -1}, source, target, this.dex.getActiveMove("Silk Trap"));
				}
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Protect", target);
		},
		target: "self",
		type: "Bug",
	},
	axekick: {
		num: 853,
		accuracy: 90,
		basePower: 120,
		category: "Physical",
		shortDesc: "30% confusion. User loses 50% max HP if miss.",
		name: "Axe Kick",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		hasCrashDamage: true,
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.getEffect('High Jump Kick'));
		},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "High Jump Kick", target);
		},
		target: "normal",
		type: "Fighting",
	},
	lastrespects: {
		num: 854,
		accuracy: 100,
		basePower: 50,
		basePowerCallback(pokemon, target, move) {
			return 50 + 50 * pokemon.side.totalFainted;
		},
		category: "Physical",
		shortDesc: "+50 power for each time a party member fainted.",
		name: "Last Respects",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poltergeist", target);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	luminacrash: {
		num: 855,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "100% chance to lower the target's Sp. Def by 2.",
		name: "Lumina Crash",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				spd: -2,
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Luster Purge", target);
		},
		target: "normal",
		type: "Psychic",
	},
	orderup: {
		num: 856,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Curly|Droopy|Stretchy eaten: +1 Atk|Def|Spe.",
		name: "Order Up",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onUseMoveMessage(source, target, move) {
			move.orderUpBoost = true;
		},
		onAfterMove(pokemon, target, move) {
			if (!pokemon.volatiles['commanded'] || !move.orderUpBoost) return;
			const tatsugiri = pokemon.volatiles['commanded'].source;
			if (tatsugiri.baseSpecies.baseSpecies !== 'Tatsugiri') return; // Should never happen
			switch (tatsugiri.baseSpecies.forme) {
			case 'Droopy':
				this.boost({def: 1}, pokemon, pokemon);
				break;
			case 'Stretchy':
				this.boost({spe: 1}, pokemon, pokemon);
				break;
			default:
				this.boost({atk: 1}, pokemon, pokemon);
				break;
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Tail", target);
		},
		secondary: null,
		hasSheerForce: true,
		target: "normal",
		type: "Dragon",
	},
	jetpunch: {
		num: 857,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		shortDesc: "Usually goes first.",
		name: "Jet Punch",
		pp: 15,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aqua Jet", target);
		},
		secondary: null,
		hasSheerForce: true,
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	spicyextract: {
		num: 858,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Spicy Extract",
		shortDesc: "Raises target's Atk by 2 and lowers its Def by 2.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		boosts: {
			atk: 2,
			def: -2,
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rage Powder", target);
		},
		secondary: null,
		target: "normal",
		type: "Grass",
	},
	spinout: {
		num: 859,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		shortDesc: "Lowers the user's Speed by 2.",
		name: "Spin Out",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Gyro Ball", target);
		},
		self: {
			boosts: {
				spe: -2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	populationbomb: {
		num: 860,
		accuracy: 90,
		basePower: 20,
		category: "Physical",
		shortDesc: "Hits 10 times. Each hit can miss.",
		name: "Population Bomb",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tail Slap", target);
		},
		multihit: 10,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	icespinner: {
		num: 861,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Ends the effects of terrain.",
		name: "Ice Spinner",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rapid Spin", target);
		},
		onHit() {
			this.field.clearTerrain();
		},
		onAfterSubDamage() {
			this.field.clearTerrain();
		},
		secondary: null,
		target: "normal",
		type: "Ice",
	},
	glaiverush: {
		num: 862,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		shortDesc: "User takes sure-hit 2x damage until its next turn.",
		name: "Glaive Rush",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			volatileStatus: 'glaiverush',
		},
		condition: {
			noCopy: true,
			onStart(pokemon) {
				this.add('-singlemove', pokemon, 'Glaive Rush', '[silent]');
			},
			onAccuracy() {
				return true;
			},
			onSourceModifyDamage() {
				return this.chainModify(2);
			},
			onBeforeMovePriority: 100,
			onBeforeMove(pokemon) {
				this.debug('removing Glaive Rush drawback before attack');
				pokemon.removeVolatile('glaiverush');
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Outrage", target);
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
	},
	doodle: {
		num: 867,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "User and ally's Abilities become target's Ability.",
		name: "Doodle",
		pp: 10,
		priority: 0,
		flags: {},
		onHit(target, source, move) {
			let success: boolean | null = false;
			for (const pokemon of source.alliesAndSelf()) {
				if (pokemon.ability === target.ability) continue;
				const oldAbility = pokemon.setAbility(target.ability);
				if (oldAbility) {
					this.add('-ability', pokemon, target.getAbility().name, '[from] move: Doodle');
					success = true;
				} else if (!success && oldAbility === null) {
					success = null;
				}
			}
			if (!success) {
				if (success === false) {
					this.add('-fail', source);
				}
				this.attrLastMove('[still]');
				return this.NOT_FAIL;
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "skill Swap", target);
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Normal",
	},
	filletaway: {
		num: 868,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "+2 Attack, Sp. Atk, Speed for 1/2 user's max HP.",
		name: "Fillet Away",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onTry(source) {
			if (source.hp <= source.maxhp / 2 || source.maxhp === 1) return false;
		},
		onTryHit(pokemon, target, move) {
			if (!this.boost(move.boosts as SparseBoostsTable)) return null;
			delete move.boosts;
		},
		onHit(pokemon) {
			this.directDamage(pokemon.maxhp / 2);
		},
		boosts: {
			atk: 2,
			spa: 2,
			spe: 2,
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Baton Pass", target);
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
	kowtowcleave: {
		num: 869,
		accuracy: true,
		basePower: 85,
		category: "Physical",
		shortDesc: "This move does not check accuracy.",
		name: "Kowtow Cleave",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Night Slash", target);
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	flowertrick: {
		num: 870,
		accuracy: true,
		basePower: 70,
		category: "Physical",
		shortDesc: "Always results in a critical hit; no accuracy check.",
		name: "Flower Trick",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Seed Bomb", target);
		},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Grass",
	},
	torchsong: {
		num: 871,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "100% chance to raise the user's Sp. Atk by 1.",
		name: "Torch Song",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flame Burst", target);
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	aquastep: {
		num: 872,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "100% chance to raise the user's Speed by 1.",
		name: "Aqua Step",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, dance: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Liquidation", target);
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
		type: "Water",
		contestType: "Cool",
	},
	ragingbull: {
		num: 873,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "Destroys screens. Type depends on user's form.",
		name: "Raging Bull",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			pokemon.side.removeSideCondition('reflect');
			pokemon.side.removeSideCondition('lightscreen');
			pokemon.side.removeSideCondition('auroraveil');
		},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Tauros-Paldea-Combat':
				move.type = 'Fighting';
				break;
			case 'Tauros-Paldea-Blaze':
				move.type = 'Fire';
				break;
			case 'Tauros-Paldea-Aqua':
				move.type = 'Water';
				break;
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Head Smash", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	makeitrain: {
		num: 874,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		shortDesc: "Lowers the user's Sp. Atk by 1. Hits foe(s).",
		name: "Make It Rain",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				spa: -1,
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mirror Shot", target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Steel",
		contestType: "Beautiful",
	},
	ruination: {
		num: 877,
		accuracy: 90,
		basePower: 0,
		damageCallback(pokemon, target) {
			return this.clampIntRange(Math.floor(target.getUndynamaxedHP() / 2), 1);
		},
		category: "Special",
		shortDesc: "Does damage equal to 1/2 target's current HP.",
		name: "Ruination",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Foul Play", target);
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},
	collisioncourse: {
		num: 878,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		shortDesc: "Deals 1.3333x damage with supereffective hits.",
		name: "Collision Course",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePower(basePower, source, target, move) {
			if (target.runEffectiveness(move) > 0) {
				// Placeholder
				this.debug(`collision course super effective buff`);
				return this.chainModify([5461, 4096]);
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "All-Out Pummeling", target);
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},
	electrodrift: {
		num: 879,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		shortDesc: "Deals 1.3333x damage with supereffective hits.",
		name: "Electro Drift",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePower(basePower, source, target, move) {
			if (target.runEffectiveness(move) > 0) {
				// Placeholder
				this.debug(`electro drift super effective buff`);
				return this.chainModify([5461, 4096]);
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Gigavolt Havoc", target);
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	shedtail: {
		num: 880,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User takes 1/2 its max HP to pass a substitute.",
		name: "Shed Tail",
		pp: 10,
		priority: 0,
		flags: {},
		volatileStatus: 'substitute',
		onTryHit(source) {
			if (!this.canSwitch(source.side)) {
				this.add('-fail', source);
				return this.NOT_FAIL;
			}
			if (source.volatiles['substitute']) {
				this.add('-fail', source, 'move: Shed Tail');
				return this.NOT_FAIL;
			}
			if (source.hp <= Math.ceil(source.maxhp / 2)) {
				this.add('-fail', source, 'move: Shed Tail', '[weak]');
				return this.NOT_FAIL;
			}
		},
		onHit(target) {
			this.directDamage(Math.ceil(target.maxhp / 2));
		},
		self: {
			onHit(source) {
				source.skipBeforeSwitchOutEventFlag = true;
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Baton Pass", target);
		},
		selfSwitch: 'shedtail',
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
	},
	chillyreception: {
		num: 881,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Starts Snow. User switches out.",
		name: "Chilly Reception",
		pp: 10,
		priority: 0,
		flags: {},
		// TODO show prepare message before the "POKEMON used MOVE!" message
		// This happens even before sleep shows its "POKEMON is fast asleep." message
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Parting Shot", target);
		},
		weather: 'snow',
		selfSwitch: true,
		secondary: null,
		target: "all",
		type: "Ice",
	},
	tidyup: {
		num: 882,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User +1 Atk, Spe. Clears all substitutes/hazards.",
		name: "Tidy Up",
		pp: 10,
		priority: 0,
		flags: {},
		onHit(pokemon) {
			let success = false;
			for (const active of this.getAllActive()) {
				if (active.removeVolatile('substitute')) success = true;
			}
			const removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			const sides = [pokemon.side, ...pokemon.side.foeSidesWithConditions()];
			for (const side of sides) {
				for (const sideCondition of removeAll) {
					if (side.removeSideCondition(sideCondition)) {
						this.add('-sideend', side, this.dex.getEffect(sideCondition).name);
						success = true;
					}
				}
			}
			if (success) this.add('-activate', pokemon, 'move: Tidy Up');
			return !!this.boost({atk: 1, spe: 1}, pokemon, pokemon, null, false, true) || success;
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Defog", target);
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
	snowscape: {
		num: 883,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "For 5 turns, snow falls. Ice: 1.5x Def.",
		name: "Snowscape",
		pp: 10,
		priority: 0,
		flags: {},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hail", target);
		},
		weather: 'snow',
		secondary: null,
		target: "all",
		type: "Ice",
	},
	pounce: {
		num: 884,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		shortDesc: "100% chance to lower the target's Speed by 1.",
		name: "Pounce",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Skitter Smack", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Bug",
		contestType: "Cute",
	},
	trailblaze: {
		num: 885,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		shortDesc: "100% chance to raise the user's Speed by 1.",
		name: "Trailblaze",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Branch Poke", target);
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
		type: "Grass",
		contestType: "Cool",
	},
	chillingwater: {
		num: 886,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		shortDesc: "100% chance to lower the target's Attack by 1.",
		name: "Chilling Water",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Water Gun", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},
	hyperdrill: {
		num: 887,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		shortDesc: "Bypasses protection without breaking it.",
		name: "Hyper Drill",
		pp: 5,
		priority: 0,
		flags: {contact: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Horn Drill", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Clever",
	},
	twinbeam: {
		num: 888,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		shortDesc: "Hits 2 times in one turn.",
		name: "Twin Beam",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psybeam", target);
		},
		multihit: 2,
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	ragefist: {
		num: 889,
		accuracy: 100,
		basePower: 50,
		basePowerCallback(pokemon) {
			if (!pokemon.m.timesAttacked) pokemon.m.timesAttacked = 0;
			return Math.min(350, 50 + 50 * pokemon.m.timesAttacked);
		},
		category: "Physical",
		shortDesc: "+50 power for each time user was hit. Max 6 hits.",
		name: "Rage Fist",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Shadow Punch", target);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	armorcannon: {
		num: 890,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		shortDesc: "Lowers the user's Defense and Sp. Def by 1.",
		name: "Armor Cannon",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Overheat", target);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	bitterblade: {
		num: 891,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "User recovers 50% of the damage dealt.",
		name: "Bitter Blade",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		drain: [1, 2],
		secondary: null,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fire Lash", target);
		},
		target: "normal",
		type: "Fire",
	},
	doubleshock: {
		num: 892,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		shortDesc: "User's Electric type: typeless; must be Electric.",
		name: "Double Shock",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMove(pokemon, target, move) {
			if (pokemon.hasType('Electric')) return;
			this.add('-fail', pokemon, 'move: Double Shock');
			this.attrLastMove('[still]');
			return null;
		},
		self: {
			onHit(pokemon) {
				pokemon.setType(pokemon.getTypes(true).map(type => type === "Electric" ? "???" : type));
				this.add('-start', pokemon, 'typechange', pokemon.getTypes().join('/'), '[from] move: Double Shock');
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bolt Strike", target);
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Clever",
	},
	gigatonhammer: {
		num: 893,
		accuracy: 100,
		basePower: 160,
		category: "Physical",
		shortDesc: "Cannot be used twice in a row.",
		name: "Gigaton Hammer",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Hammer", target);
		},
		self: { 
			volatileStatus: "gigatonhammer",
		},
		condition: {
			onDisableMove(pokemon) {
				if (pokemon.lastMove?.id === 'gigatonhammer') pokemon.disableMove('gigatonhammer');
			},
		},
		beforeMoveCallback(pokemon) {
			if (pokemon.lastMove?.id === 'gigatonhammer') pokemon.addVolatile('gigatonhammer');
		},
		// onAfterMove(pokemon) {
			// if (pokemon.removeVolatile('gigatonhammer')) {
				// this.add('-hint', "Some effects can force a Pokemon to use Gigaton Hammer again in a row.");
			// }
		// },
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	comeuppance: {
		num: 894,
		accuracy: 100,
		basePower: 0,
		damageCallback(pokemon) {
			if (!pokemon.volatiles['comeuppance']) return 0;
			return pokemon.volatiles['comeuppance'].damage || 1;
		},
		category: "Physical",
		shortDesc: "If hit by an attack, returns 1.5x damage.",
		name: "Comeuppance",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('comeuppance');
		},
		onTryHit(target, source, move) {
			if (!source.volatiles['comeuppance']) return false;
			if (source.volatiles['comeuppance'].position === null) return false;
		},
		condition: {
			duration: 1,
			noCopy: true,
			onStart(target, source, move) {
				this.effectData.position = null;
				this.effectData.damage = 0;
			},
			onRedirectTargetPriority: -1,
			onRedirectTarget(target, source, source2) {
				if (source !== this.effectData.target) return;
				return source.side.foe.active[this.effectData.position];
			},
			onDamagingHit(damage, target, source, effect) {
				if (source.side !== target.side) {
					this.effectData.position = source.position;
					this.effectData.damage = 1.5 * damage;
				}
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Payback", target);
		},
		secondary: null,
		target: "scripted",
		type: "Dark",
		contestType: "Cool",
	},
	aquacutter: {
		num: 895,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "High critical hit ratio.",
		name: "Aqua Cutter",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, slicing: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Air Slash", target);
		},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	tripledive: {
		num: 865,
		accuracy: 95,
		basePower: 30,
		category: "Physical",
		shortDesc: "Hits 3 times.",
		name: "Triple Dive",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dive", target);
		},
		multihit: 3,
		secondary: null,
		target: "normal",
		type: "Water",
	},
	blazingtorque: {
		num: 896,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		isNonstandard: "Unobtainable",
		shortDesc: "30% chance to burn the target.",
		name: "Blazing Torque",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flamethrower", target);
		},
		target: "normal",
		type: "Fire",
	},
	wickedtorque: {
		num: 897,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		isNonstandard: "Unobtainable",
		shortDesc: "10% chance to cause the target to fall asleep.",
		name: "Wicked Torque",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 10,
			status: 'slp',
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dark Pulse", target);
		},
		target: "normal",
		type: "Dark",
	},
	noxioustorque: {
		num: 898,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		isNonstandard: "Unobtainable",
		shortDesc: "30% chance to poison the target.",
		name: "Noxious Torque",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 30,
			status: 'psn',
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sludge Bomb", target);
		},
		target: "normal",
		type: "Poison",
	},
	combattorque: {
		num: 899,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		isNonstandard: "Unobtainable",
		shortDesc: "30% chance to paralyze the target.",
		name: "Combat Torque",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 30,
			status: 'par',
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aura Sphere", target);
		},
		target: "normal",
		type: "Fighting",
	},
	magicaltorque: {
		num: 900,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		isNonstandard: "Unobtainable",
		shortDesc: "30% chance to confuse the target.",
		name: "Magical Torque",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dazzling Gleam", target);
		},
		target: "normal",
		type: "Fairy",
	},
	revivalblessing: {
		num: 863,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Revives a fainted Pokemon to 50% HP.",
		name: "Revival Blessing",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {},
		onTryHit(source) {
			if (!source.side.pokemon.filter(ally => ally.fainted).length) {
				return false;
			}
			this.add("-message","Warning: this move is bugged. You can use the \"/switch\" command to pick which pokemon you want to revive. Syntax: /switch [number], where [number] is the position of the pokemon in your party that you want to revive.");
		},
		slotCondition: 'revivalblessing',
		// No this not a real switchout move
		// This is needed to trigger a switch protocol to choose a fainted party member
		// Feel free to refactor
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Healing Wish", target);
		},
		selfSwitch: true,
		condition: {
			duration: 1,
			// reviving implemented in side.ts, kind of
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
	mortalspin: {
		num: 866,
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		shortDesc: "Poisons foes, frees user from hazards/bind/leech.",
		name: "Mortal Spin",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Mortal Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Mortal Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Mortal Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Mortal Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Sting", target);
		},
		secondary: {
			chance: 100,
			status: 'psn',
		},
		target: "allAdjacentFoes",
		type: "Poison",
	},
	hydrosteam: {
		num: 876,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "During Sunny Day: 1.5x damage instead of half.",
		name: "Hydro Steam",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
		// Damage boost in Sun applied in conditions.ts
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Scald", target);
		},
		thawsTarget: true,
		secondary: null,
		target: "normal",
		type: "Water",
	},
	psyblade: {
		num: 875,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "During Electric Terrain: 1.5x power.",
		name: "Psyblade",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		secondary: null,
		onBasePower(basePower, source) {
			if (this.field.isTerrain('electricterrain')) {
				this.debug('psyblade electric terrain boost');
				return this.chainModify(1.5);
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sacred Sword", target);
		},
		target: "normal",
		type: "Psychic",
	},
	triplearrows: {
		num: 843,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "High crit. Target: 50% -1 Defense, 30% flinch.",
		name: "Triple Arrows",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		critRatio: 2,
		secondaries: [
			{
				chance: 50,
				boosts: {
					def: -1,
				},
			}, {
				chance: 30,
				volatileStatus: 'flinch',
			},
		],
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Thousand Arrows", target);
		},
		target: "normal",
		type: "Fighting",
	},
	takeheart: {
		num: 850,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User cures its status and boosts its SpA & SpD by 1.",
		name: "Take Heart",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		onHit(pokemon) {
			const success = !!this.boost({spa: 1, spd: 1});
			return pokemon.cureStatus() || success;
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Calm Mind", target);
		},
		secondary: null,
		target: "self",
		type: "Psychic",
	},
	helpinghand: {
		inherit: true,
		priority: 4,
	},
	muddywater: {
		num: 330,
		accuracy: 85,
		basePower: 90,
		category: "Special",
		shortDesc: "30% chance to lower the foe(s)'s Evasion by 1.",
		name: "Muddy Water",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		secondary: {
			chance: 30,
			boosts: {
				evasion: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Water",
		contestType: "Tough",
	},
	doubleteam: {
		num: 104,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "The user's side deals 20% more damage for 5 turns.",
		name: "Double Team",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'doubleteam',
		condition: {
			duration: 5,
  		onModifyDamage(damage, source, target, move) {
  			return this.chainModify(1.2);
  		},
			onStart(side) {
				this.add('-sidestart', side, 'Double Team');
			},
			onResidualOrder: 21,
			onEnd(side) {
				this.add('-sideend', side, 'Double Team');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Normal",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	minimize: {
		num: 107,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Protects from damaging attacks. Contact: -2 Def.",
		name: "Minimize",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'minimize',
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
					this.boost({def: -2}, source, target, this.dex.getActiveMove("minimize"));
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && move.flags['contact']) {
					this.boost({def: -2}, source, target, this.dex.getActiveMove("minimize"));
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
	nightdaze: {
		num: 539,
		accuracy: 90,
		basePower: 100,
		category: "Special",
		shortDesc: "20% chance to flinch the foe(s).",
		name: "Night Daze",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		target: "allAdjacentFoes",
		type: "Dark",
		contestType: "Cool",
	},
	facade: {
		num: 263,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "Power doubles if user is statused.",
		name: "Facade",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePower(basePower, pokemon) {
			if (pokemon.status || pokemon.hasAbility('comatose')) {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cute",
	},
	nobleroar: {
		num: 568,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "Lowers the foe's Def and SpD by 1 stage.",
		name: "Noble Roar",
		pp: 30,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1, authentic: 1},
		boosts: {
			def: -1,
			spd: -1,
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {boost: {def: 1}},
		contestType: "Tough",
	},
	terablast: {
		num: 851,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "Physical if Atk > SpA. If Terastallized: Type = Tera type.",
		name: "Tera Blast",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyType(move, pokemon, target) {
			if (pokemon.terastallized) {
				move.type = pokemon.teraType;
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) {
				move.category = 'Physical';
			}
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Terrain Pulse", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
};
