export const Moves: {[moveid: string]: MoveData} = {
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
		basePower: 70,
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
	deathlyskirt: {
		num: -7,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "User recovers 50% of the damage dealt.",
		name: "Deathly Skirt",
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
		accuracy: 90,
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
			return move.basePower + 10 * pokemon.positiveBoosts();
		},
		shortDesc: "+ 10 power for each of the user's stat boosts.",
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
		basePower: 80,
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
};