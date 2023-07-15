export const Moves: {[k: string]: ModdedMoveData} = {
	//Paradoxes moves

	crystalwave: {
		num: -1,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		name: "Crystal Wave",
		shortDesc: "Nullifies the foe's Ability if the foe has any status condition.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Power Gem", target);
		},
		onHit(target) {
			if (target.getAbility().isPermanent) return;
			if (target.status || target.hasAbility('comatose')){
				target.addVolatile('gastroacid');
			}
		},
		onAfterSubDamage(damage, target) {
			if (target.getAbility().isPermanent) return;
			if (target.status || target.hasAbility('comatose')){
				target.addVolatile('gastroacid');
			}
		},
		secondary: null,
		target: "normal",
		type: "Flying",
	},
	thunderhammer: {
		num: -2,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Thunder Hammer",
		shortDesc: "Lowers the user's Speed by 1.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		self: {
			boosts: {
				spe: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Tough",
	},
	metamorphosis: {
		num: -3,
		accuracy: 90,
		basePower: 120,
		category: "Special",
		name: "Metamorphosis",
		shortDesc: "Raises user's Sp. Atk by 1 on turn 1. Hits turn 2.",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1},
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
		target: "normal",
		type: "Bug",
	},
	tripledrill: {
		num: -4,
		shortDesc: "Hits three times. Each hit increases in BP by 20, but they have separate accuracy checks.",
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		category: "Physical",
		name: "Triple Drill",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 3,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Ground",
		zMove: {basePower: 120},
		maxMove: {basePower: 140},
	},
	cleansingwater: {
		num: -5,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Cleansing Water",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			let factor = 1/3;
			if (pokemon.status) {
				factor = 1/6;
				pokemon.cureStatus();
			}
			return !!this.heal(this.modify(pokemon.maxhp, factor));
		},
		secondary: null,
		target: "self",
		type: "Water",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	
	//Gen 9 moves
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
		secondary: null,
		target: "normal",
		type: "Grass",
	},
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

	psyshieldbash: {
		shortDesc: "100% chance to raise the user's Defense by 1.",
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
		shortDesc: "Sets Stealth Rock after damage. High critical hit ratio.",
		num: -1014,
		accuracy: 90,
		basePower: 65,
		category: "Physical",
		name: "Stone Axe",
		desc: "Has a higher chance for a critical hit. If this move is successful, it sets up a hazard on the opposing side of the field, damaging each opposing Pokemon that switches in. Foes lose 1/32, 1/16, 1/8, 1/4, or 1/2 of their maximum HP, rounded down, based on their weakness to the Rock type; 0.25x, 0.5x, neutral, 2x, or 4x, respectively. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, or is hit by Defog.",
		shortDesc: "High critical hit ratio. Foes: Stealth Rock.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Stone Edge", target);
		},
		critRatio: 2,
		sideCondition: 'stealthrock',
		secondary: null,
		target: "adjacentFoe",
		type: "Rock",
		contestType: "Tough",
	},
	headlongrush: {
		shortDesc: "Lowers the user's Defense and Sp. Def by 1.",
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
		shortDesc: "Switches user's Attack with Defense and Sp. Atk with Sp. Def.",
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
		shortDesc: "100% chance to raise the user's spa by 1.",
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
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	wavecrash: {
		shortDesc: "Usually goes first. Has 33% recoil.",
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
		shortDesc: "User loses 50% max HP.",
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
		shortDesc: "Power doubles if the target has a status ailment; 30% chance to burn.",
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
		shortDesc: "30% chance to burn. 2x power if target is statused.",
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
		shortDesc: "Power doubles if the target has a status ailment; 30% chance to poison.",
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
		shortDesc: "50% chance to psn. 2x power if target is poisoned.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Sting", target);
		},
		secondary: {
			chance: 30,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		zMove: {basePower: 160},
		contestType: "Clever",
	},
	terablast: {
		num: -1024,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Tera Blast",
		desc: "If the user is Terastallized, this move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes, and it becomes the same its the user's Tera Type.",
		shortDesc: "If Terastallized: Phys. if Atk > SpA & Type = Tera Type.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			if (pokemon.species.teraType) move.type = pokemon.species.teraType;
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hidden Power", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Beautiful",
	},
	icespinner: {
		num: -1025,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Ice Spinner",
		desc: "Ends the effects of Electric Terrain, Grassy Terrain, Misty Terrain, and Psychic Terrain.",
		shortDesc: "Ends the effects of terrain.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onHit(target, source, move) {
			this.field.clearTerrain();
		},
		secondary: null,
		target: "normal",
		type: "Ice",
	},

	ragingbull: {
		num: -1026,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Raging Bull",
		desc: "If this attack does not miss, the effects of Reflect, Light Screen, and Aurora Veil end for the target's side of the field before damage is calculated.",
		shortDesc: "Destroys screens. Type depends on user's form.",
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
			switch (pokemon.baseSpecies.name) {
			case 'Tauros-Paldea':
				move.type = 'Fighting';
				break;
			case 'Tauros-Paldea-Fire':
				move.type = 'Fire';
				break;
			case 'Tauros-Paldea-Water':
				move.type = 'Water';
				break;
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal"
	},
	trailblaze: {
		num: -1027,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Trailblaze",
		desc: "Has a 100% chance to raise the user's Speed by 1 stage.",
		shortDesc: "100% chance to raise the user's Speed by 1.",
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
		type: "Grass",
	},
	chillingwater: {
		num: -1027,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Chilling Water",
		desc: "Has a 100% chance to lower the target's Attack by 1 stage.",
		shortDesc: "100% chance to lower the target's Attack by 1.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Water",
	},
	hyperdrill: {
		num: -1028,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Hyper Drill",
		desc: "If this move is successful, it breaks through the target's Baneful Bunker, Detect, King's Shield, Protect, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally.",
		shortDesc: "Nullifies protection moves.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, mirror: 1},
		// breaking protect implemented in scripts.ts
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	twinbeam: {
		num: -1029,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Twin Beam",
		desc: "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit.",
		shortDesc: "Hits 2 times in one turn.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: 2,
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	axekick: {
		num: 853,
		accuracy: 90,
		basePower: 120,
		category: "Physical",
		name: "Axe Kick",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		hasCrashDamage: true,
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get('High Jump Kick'));
		},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Fighting",
	},
	tripledive: {
		num: 865,
		accuracy: 95,
		basePower: 30,
		category: "Physical",
		name: "Triple Dive",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 3,
		secondary: null,
		target: "normal",
		type: "Water",
	},
	// broke atm
	/*
	ragefist: {
		num: 889,
		accuracy: 100,
		basePower: 50,
		basePowerCallback(pokemon) {
			return Math.min(350, 50 + 50 * pokemon.timesAttacked);
		},
		category: "Physical",
		name: "Rage Fist",
		desc: "Power increases by 50 each time the user is hit, including the user hitting itself in confusion. This does not reset upon switching out or fainting.",
		shortDesc: "Power increases by 50 each time user is hit.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	*/
};