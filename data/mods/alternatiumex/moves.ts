export const Moves: {[moveid: string]: MoveData} = {
	recover: {
		inherit: true,
		pp: 10,
	},
	softboiled: {
		inherit: true,
		pp: 10,
	},
	rest: {
		inherit: true,
		pp: 10,
	},
	milkdrink: {
		inherit: true,
		pp: 10,
	},
	slackoff: {
		inherit: true,
		pp: 10,
	},
	roost: {
		inherit: true,
		pp: 10,
	},
	shoreup: {
		inherit: true,
		pp: 10,
	},
	triplearrows: {
		num: -1,
		accuracy: 100,
		basePower: 25,
		category: "Special",
		shortDesc: "Hits 3 times. Lowers target's Sp. Def. after the 3rd hit.",
		name: "Triple Arrows",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target, source, move) {
			if (move.hit === 3) {
				return !!this.boost({spd: -1}, target, source, move);
			}
			return false;
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Thousand Arrows", target);
		},
		multihit: 3,
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
	infernalparade: {
		num: -2,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "Traps and damages the target for 4-5 turns.",
		name: "Infernal Parade",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", target);
		},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	razorshell: {
		inherit: true,
		accuracy: 100,
		basePower: 80,
		shortDesc: "100% chance to lower the target's Defense by 1.",
		pp: 15,
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
	},
	ceaselessedge: {
		num: -3,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		shortDesc: "If this move is not very effective on a target, it sets a layer of Spikes.",
		name: "Ceaseless Edge",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && move.category !== 'Status' && target.getMoveHitData(move).typeMod < 0) {
				source.side.foe.addSideCondition('spikes');
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Night Slash", target);
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	twirlingdance: {
		num: -4,
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		category: "Physical",
		shortDesc: "Hits 3 times. Each hit can miss, but power rises.",
		name: "Twirling Dance",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fiery Dance", target);
		},
		multihit: 3,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	pompomdance: {
		num: -5,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "Type varies matches the user's primary type. The user is flung into the air.",
		name: "Pom-pom Dance",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, dance: 1},
		onModifyType(move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Revelation Dance", target);
		},
		self: {
			volatileStatus: 'telekinesis',
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	skirtdance: {
		num: -6,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "100% chance to lower the target's Sp. Atk by 1.",
		name: "Skirt Dance",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Quiver Dance", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				spa: -1,
			},
		},
		target: "normal",
		type: "Fairy",
	},
	deathlydance: {
		num: -7,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "User recovers 50% of the damage dealt.",
		name: "Deathly Dance",
		pp: 15,
		priority: 0,
		flags: {dance: 1, protect: 1, mirror: 1, heal: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Night Shade", target);
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	gearup: {
		num: 674,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Raises user's Attack and Sp. Atk by 1; 2 in Electric Terrain.",
		name: "Gear Up",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, authentic: 1},
		onModifyMove(move, pokemon) {
			if (this.field.isTerrain('electricterrain') && pokemon.isGrounded()) move.boosts = {atk: 2, spa: 2};
		},
		boosts: {
			atk: 1,
			spa: 1,
		},
		secondary: null,
		target: "self",
		type: "Steel",
	},
	pollenpuff: {
		num: 676,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "30% chance to lower the target's Attack by 1 stage.",
		name: "Pollen Puff",
		pp: 15,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Bug",
	},
	geargrind: {
		inherit: true,
		accuracy: 95,
	},
	wickedblow: {
		inherit: true,
		accuracy: 100,
		basePower: 85,
		shortDesc: "Inflicts Torment on the opponent.",
		pp: 10,
		willCrit: null,
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					pokemon.addVolatile('torment');
				}
			},
		},
	},
	surgingstrikes: {
		inherit: true,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return move.basePower + 20 * pokemon.positiveBoosts();
		},
		shortDesc: "+ 20 power for each of the user's stat boosts.",
		pp: 10,
		flags: {contact: 1, protect: 1, mirror: 1},
		willCrit: null,
		multihit: null,
	},
	glacialcharge: {
		num: -8,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		shortDesc: "No additional effect.",
		name: "Glacial Charge",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Glacial Lance", target);
		},
		secondary: null,
		target: "normal",
		type: "Ice",
	},
	astralbarrage: {
		inherit: true,
		accuracy: 80,
		basePower: 100,
		shortDesc: "High critical hit ratio.",
		target: "normal",
		type: "Dark",
	},
	clangingscales: {
		num: 691,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "Physical if user's Atk > Sp. Atk. Cures user's status.",
		name: "Clanging Scales",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		self: {
			onHit(source) {
				source.cureStatus();
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Dragon",
	},
	clangoroussoul: {
		num: 775,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Raises the user's Special Attack and Speed by 1.",
		name: "Clangorous Soul",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, sound: 1, dance: 1},
		boosts: {
			spa: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Dragon",
	},
	rockyscales: {
		num: -9,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		shortDesc: "Lowers the user's Special Attack by 1.",
		name: "Rocky Scales",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Clanging Scales", target);
		},
		selfBoost: {
			boosts: {
				spa: -1,
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Rock",
	},
	shiftinggems: {
		num: -10,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "At >1/2 max HP, +1 Def & 1 SpA. Else Heals 33% max HP.",
		name: "Shifting Gems",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Geomancy", target);
		},
		self: {
			onHit(pokemon) {
				if (pokemon.hp > pokemon.maxhp / 2) {
					this.boost({def: 1, spa: 1});
				}
				else if (pokemon.hp <= pokemon.maxhp / 2) {
					this.heal(pokemon.baseMaxhp / 3);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Rock",
	},
	firerenewal: {
		num: -11,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User heals 3/4 max HP and cures status. Removes Fire type. Trapped next turn.",
		name: "Fire Renewal",
		pp: 10,
		priority: 0,
		volatileStatus: 'firerenewal',
		flags: {heal: 1, authentic: 1, mystery: 1},
		onTryMove(pokemon, target, move) {
			if (pokemon.hasType('Fire')) return;
			this.add('-fail', pokemon, 'move: Burn Up');
			this.attrLastMove('[still]');
			return null;
		},
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.75));
			return pokemon.cureStatus() || success;
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Burn Up", target);
		},
		self: {
			onHit(pokemon) {
				pokemon.setType(pokemon.getTypes(true).map(type => type === "Fire" ? "???" : type));
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] move: Fire Renewal');
			},
		},
		condition: {
			duration: 2,
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: Fire Renewal');
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Fire Renewal');
			},
		},
		secondary: null,
		target: "self",
		type: "Fire",
	},
	ghostbite: {
		num: -12,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "Neutral on Ghost.",
		name: "Ghost Bite",
		pp: 10,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Ghost') return 0;
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bug Bite", target);
		},
		target: "normal",
		type: "Bug",
	},
	snaptrap: {
		num: 779,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Snap Trap",
		pp: 10,
		priority: 0,
		flags: {bite: 1, contact: 1, protect: 1, mirror: 1},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	photongeyser: {
		num: 722,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "Goes off higher attacking stat. Does 1.2x damage in Psychic Terrain.",
		name: "Photon Geyser",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onBasePower(basePower, source) {
			if (this.field.isTerrain('psychicterrain') && source.isGrounded()) {
				this.debug('terrain buff');
				return this.chainModify(1.2);
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	sunsteelstrike: {
		num: 713,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		shortDesc: "User recovers 50% of the damage dealt.",
		name: "Sunsteel Strike",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	moongeistbeam: {
		num: 714,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		shortDesc: "User switches out. Nullifies the foes Ability if the foes move first.",
		name: "Moongeist Beam",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target) {
			if (target.getAbility().isPermanent) return;
			if (target.newlySwitched || this.queue.willMove(target)) return;
			target.addVolatile('gastroacid');
		},
		onAfterSubDamage(damage, target) {
			if (target.getAbility().isPermanent) return;
			if (target.newlySwitched || this.queue.willMove(target)) return;
			target.addVolatile('gastroacid');
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	prismaticlaser: {
		num: 711,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "This move ignores type based interactions.",
		name: "Prismatic Laser",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, source, target) {
			move.type = '???';
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
	},
	esperwing: {
		num: -13,
		accuracy: 100,
		basePower: 80,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.hasType('Psychic')) {
				return move.basePower * 1.5;
			}
			return move.basePower;
		},
		category: "Special",
		shortDesc: "If used by a Psychic-type: 1.5x power. Super effective on Poison.",
		name: "Esper Wing",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Poison') return 1;
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Burn Up", target);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
	},
	chloroblast: {
		num: -14,
		accuracy: 100,
		basePower: 150,
		category: "Special",
		shortDesc: "User loses 50% max HP. Hits adjacent Pokemon.",
		name: "Chloro Blast",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		mindBlownRecoil: true,
		onAfterMove(pokemon, target, move) {
			if (move.mindBlownRecoil && !move.multihit) {
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.getEffect('Chloro Blast'), true);
			}
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Solar Beam", target);
		},
		secondary: null,
		target: "allAdjacent",
		type: "Grass",
	},
	payday: {
		num: 6,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "If user moves before the target, the target looses 1/8 of its max HP.",
		name: "Pay Day",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onAfterMove(source, target) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.damage(target.baseMaxhp / 8, target, source, this.dex.getEffect('Pay Day'));
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Clever",
	},
	overdrive: {
		inherit: true,
		basePower: 100,
	},
	teatime: {
		inherit: true,
		priority: 1,
	},
	teatimeantique: {
		num: 752,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "All active Pokemon consume held Berries.",
		name: "Teatime (Antique)",
		pp: 10,
		priority: 0,
		flags: {authentic: 1},
		onHitField(target, source, move) {
			let result = false;
			for (const active of this.getAllActive()) {
				if (this.runEvent('Invulnerability', active, source, move) === false) {
					this.add('-miss', source, active);
					result = true;
				} else {
					const item = active.getItem();
					if (active.hp && item.isBerry) {
						// bypasses Unnerve
						active.eatItem(true);
						result = true;
					}
				}
			}
			return result;
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Teatime", target);
		},
		secondary: null,
		target: "all",
		type: "Normal",
	},
	freezingglare: {
		num: 821,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "100% chance to lower the target's Speed by 1.",
		name: "Freezing Glare",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Flying",
	},
	lifedew: {
		num: 791,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Heals 1/3 of max HP. If statused: Heals 1/6 and cures status.",
		name: "Life Dew",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			let factor = 0.333;
			if (pokemon.status) {
				factor = 0.167;
				pokemon.cureStatus();
			}
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
		secondary: null,
		target: "self",
		type: "Water",
	},
	turkeybarrage: {
		num: -15,
		accuracy: 70,
		basePower: 140,
		category: "Physical",
		shortDesc: "20% chance to make the target flinch.",
		name: "Turkey Barrage",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sky Attack", target);
		},
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		target: "any",
		type: "Flying",
		contestType: "Cool",
	},
	fierywrath: {
		num: 822,
		accuracy: 100,
		basePower: 105,
		category: "Physical",
		shortDesc: "Combines Fire in its type effectiveness.",
		name: "Fiery Wrath",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Fire', type);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Dark",
	},
	boneclub: {
		inherit: true,
		accuracy: 100,
		basePower: 70,
		shortDesc: "The target takes hazard damage after being hit by this move.",
		pp: 15,
		onAfterHit(target, source) {
			const targetSide = source.side.foe;
			if (targetSide.getSideCondition('stealthrock')) {
				if (target.hasItem('heavydutyboots')) return;
				const typeMod = this.clampIntRange(target.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(target.maxhp * Math.pow(2, typeMod) / 8);
				this.add('-message', `Pointed stones dug into ${target.name}!`);
			}
			if (targetSide.getSideCondition('spikes')) {
				//if (!target.isGrounded()) return;
				if (target.hasItem('heavydutyboots')) return;
				const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
				this.damage(damageAmounts[this.effectData.layers] * target.maxhp / 24);
				this.add('-message', `${target.name} was hurt by the spikes!`);
			}
		},
		secondary: {},
	},
	bonemerang: {
		inherit: true,
		accuracy: 100,
		basePower: 35,
		shortDesc: "Hits twice. User switches out.",
		pp: 20,
		selfSwitch: true,
		type: "Rock",
	},
	shadowbone: {
		inherit: true,
		basePower: 90,
		shortDesc: "30% chance to lower target's Attack by 1.",
		pp: 15,
		secondary: {
			chance: 30,
			boosts: {
				atk: -1,
			},
		},
	},
	springtidestorm: {
		num: -16,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		shortDesc: "Lowers the user's Sp. Atk by 2.",
		name: "Springtide Storm",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				spa: -2,
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psycho Boost", target);
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	roaroftime: {
		num: 459,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		shortDesc: "Raises user's SpA by 1 when attacked before it moves.",
		name: "Roar of Time",
		pp: 5,
		priority: -3,
		flags: {protect: 1, mirror: 1},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('roaroftime');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Roar of Time');
			},
			onDamagingHit(damage, target, source, move) {
				this.boost({spa: 1}, target, source, undefined, true);
				this.add('-activate', target, 'move: Roar of Time');
			},
		},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('roaroftime');
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
	},
	originrend: {
		num: -17,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (!pokemon.item) {
				this.debug("Power doubled for no item");
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		shortDesc: "Power doubles if the user has no held item.",
		name: "Origin Rend",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Spacial Rend", target);
		},
		secondary: null,
		target: "normal",
		type: "Poison",
	},
	trickroom: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				if (source?.hasItem('adamantorb')) {
					return 8;
				}
				return 5;
			},
			onStart(target, source) {
				this.add('-fieldstart', 'move: Trick Room', '[of] ' + source);
			},
			onRestart(target, source) {
				this.field.removePseudoWeather('trickroom');
			},
			// Speed modification is changed in Pokemon.getActionSpeed() in sim/pokemon.js
			onResidualOrder: 23,
			onEnd() {
				this.add('-fieldend', 'move: Trick Room');
			},
		},
	},
	hyperspacefury: {
		inherit: true,
		onTry(pokemon) {
			if (pokemon.species.name === 'Hoopa-Ifrit' || pokemon.species.name === 'Archronos') {
				return;
			}
			this.hint("Only a Pokemon whose form is Hoopa Unbound or Archronos can use this move.");
			if (pokemon.species.name === 'Hoopa') {
				this.add('-fail', pokemon, 'move: Hyperspace Fury', '[forme]');
				return null;
			}
			this.add('-fail', pokemon, 'move: Hyperspace Fury');
			return null;
		},
	},
	wavecrash: {
		num: -18,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "Fails if the target is not attacking. Has 33% recoil.",
		name: "Wave Crash",
		pp: 5,
		priority: 1,
		flags: {protect: 1, mirror: 1, contact: 1},
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || (move.category === 'Status' && move.id !== 'mefirst') || target.volatiles['mustrecharge']) {
				return false;
			}
		},
		recoil: [33, 100],
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aqua Jet", target);
		},
		secondary: null,
		target: "normal",
		type: "Water",
	},
	venoshock: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
	},
	barbbarrage: {
		num: -19,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		name: "Barb Barrage",
		shortDesc: "Hits 2-5 times in one turn. Each hit has 10% to poison.",
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: [2, 5],
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Spike Cannon", target);
		},
		secondary: {
			chance: 10,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	bittermalice: {
		num: -20,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Bitter Malice",
		shortDesc: "100% chance to lower the target's Special Attack by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Icy Wind", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				spa: -1,
			},
		},
		target: "normal",
		type: "Ice",
		contestType: "Clever",
	},
	shelter: {
		num: -21,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Shelter",
		shortDesc: "Protects from damaging attacks. Contact: Infestation.",
		description: "Protects from damaging attacks. If the attacker makes contact, they are afflicted with Infestation.",
		pp: 10,
		priority: 4,
		flags: {},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Spiky Shield", target);
		},
		stallingMove: true,
		volatileStatus: 'shelter',
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
				if (move.flags['contact']) {
					this.useMove("Infestation", target);
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
					this.useMove("Infestation", target);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Ground",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cool",
	},
	wonderdrill: {
		num: -22,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Wonder Drill",
		shortDesc: "Summons Wonder Room.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Guillotine", target);
		},
		onHit(){
			if (!this.field.getPseudoWeather('wonderroom')) this.field.addPseudoWeather('wonderroom');
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	watershuriken: {
		inherit: true,
		shortDesc: "Hits 3 times in one turn.",
		flags: {protect: 1, mirror: 1, slicing: 1},
		multihit: 3,
	},
	shadowclaw: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
	},
	hyperspacehole: {
		inherit: true,
		basePower: 40,
		shortDesc: "User recovers 75% of the damage dealt.",
		priority: 1,
		flags: {mirror: 1, bypasssub: 1, heal: 1},
		drain: [3, 4],
	},
	freezeshock: {
		num: 553,
		accuracy: 100,
		basePower: 100,
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
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Ice Burn",
		shortDesc: "30% chance to burn the target.",
		pp: 15,
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
	ragingfury: {
		num: 833,
		accuracy: 100,
		basePower: 50,
		basePowerCallback(pokemon) {
			if (!pokemon.m.timesAttacked) pokemon.m.timesAttacked = 0;
			return Math.min(200, 50 + 25 * pokemon.m.timesAttacked);
		},
		category: "Physical",
		name: "Raging Fury",
		shortDesc: "+25 power for each time the user was hit. Max 6 hits.",
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flare Blitz", target);
		},
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	mountaingale: {
		num: 836,
		accuracy: 100,
		basePower: 100,
		onModifyMove(move, pokemon) {
			if (pokemon.effectiveWeather() == 'snow') {
				move.basePower *= 1.3;
			}
		},
		category: "Physical",
		name: "Mountain Gale",
		shortDesc: "1.3x power in Snow.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ice",
	},
	psyshieldbash: {
		num: 828,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Psyshield Bash",
		shortDesc: "Uses user's Def stat as Atk in damage calculation.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		useSourceDefensiveAsOffensive: true,
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	jetpunch: {
		num: 857,
		accuracy: 100,
		basePower: 80,
		basePowerCallback(pokemon, target, move) {
            if(pokemon.getStat('spe') < target.getStat('spe')) return move.basePower / 2;
        },
		category: "Physical",
		name: "Jet Punch",
		shortDesc: "If the target is faster than the user: 1/2 power and +1 priority.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		onModifyMove(move, pokemon, target) {
			if(pokemon.getStat('spe') < target.getStat('spe')) {
				move.priority = 1;
				return move.basePower;
			}
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	watershuriken: {
		inherit: true,
		flags: {protect: 1, mirror: 1, slicing: 1},
		multihit: 3,
	},
	ragingbull: {
		num: 873,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Type depends on user's secondary type. If resisted: -1 Defense.",
		name: "Raging Bull",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			let type = pokemon.types[1];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		onHit(target, source, move) {
			if (!move || !target) return;
			if (target !== source && move.category !== 'Status' && target.getMoveHitData(move).typeMod < 0) {
				this.boost({def: -1}, target);
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	ragingbullsteam: {
		num: -23,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "(Non-functional placeholder) Type depends on both the user's types.",
		name: "Raging Bull (Steam)",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		/*onEffectiveness(typeMod, target, source, type, move) {
			const secondType = source.types[1];
			return typeMod + this.dex.getEffectiveness(secondType, type);
		},*/
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	stampederush: {
		num: -24,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "Destroys screens. Ice-type if user is Tauros-Azul.",
		name: "Stampede Rush",
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
			if (pokemon.species.name === 'Tauros-Azul') {
				move.type = 'Ice';
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	zippyzap: {
		num: 729,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		shortDesc: "Usually goes first.",
		isNonstandard: null,
		name: "Zippy Zap",
		pp: 10,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1},
		target: "normal",
		type: "Electric",
	},
	fling: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.hasAbility('cannonstyle')) {
				return move.basePower * 2;
			}
			return move.basePower;
		},
	},
	
	//SV Move Descriptions
	aquacutter:  {
		inherit: true,
		shortDesc: "High critical hit ratio.",
	},
	chillingwater:  {
		inherit: true,
		shortDesc: "100% chance to lower the target's Attack by 1.",
	},
	pounce:  {
		inherit: true,
		shortDesc: "100% chance to lower the target's Speed by 1.",
	},
	snowscape:  {
		inherit: true,
		shortDesc: "For 5 turns, snow falls. Ice: 1.5x Def.",
	},
	terablast:  {
		inherit: true,
		shortDesc: "If Terastallized: Phys. if Atk > SpA, type = Tera.",
	},
	trailblaze:  {
		inherit: true,
		shortDesc: "100% chance to raise the user's Speed by 1.",
	},
	icespinner: {
		inherit: true,
		shortDesc: "Ends the effects of terrain.",
	},
	populationbomb: {
		inherit: true,
		shortDesc: "Hits 10 times. Each hit can miss.",
	},
	spinout: {
		inherit: true,
		shortDesc: "Lowers the user's Speed by 2.",
	},
};
