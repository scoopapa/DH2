export const Moves: {[moveid: string]: ModdedMoveData} = {
	// stealthrock: {
	// inherit: true,
	// sideCondition: 'stealthrock',
	// condition: {
	// onStart(side) {
	// this.add('-sidestart', side, 'move: Stealth Rock');
	// },
	// onSwitchIn(pokemon) {
	// if (pokemon.hasItem('heavydutyboots')) return;
	// let typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
	// if (pokemon.hasAbility("crystalline")) typeMod = typeMod / 2;
	// this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
	// },
	// },
	// },
	shedtail: {
		num: 880,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Shed Tail",
		pp: 10,
		priority: 0,
		flags: {},
		shortDesc: "Sac 12.5% HP, switch, heal ally 25%. Ally: 50% dmg redux this turn.",
		onTryHit(source) {
			if (!this.canSwitch(source.side)) {
				this.add('-fail', source);
				return this.NOT_FAIL;
			}
			if (source.hp <= Math.ceil(source.maxhp / 8)) {
				this.add('-fail', source, 'move: Shed Tail', '[weak]');
				return this.NOT_FAIL;
			}
		},
		onHit(target) {
			this.directDamage(Math.ceil(target.maxhp / 8));
		},
		slotCondition: 'shedtail',
		condition: {
			duration: 1,
			onSwap(target) {
				if (!target.fainted && (target.hp < target.maxhp || target.status)) {
					target.heal(target.maxhp / 4);
					this.add('-heal', target, target.getHealth, '[from] move: Healing Wish');
				}
			},
			onModifyDef(def, pokemon) {
				return this.chainModify(2);
			},
			onModifySpD(spd, pokemon) {
				return this.chainModify(2);
			},
		},
		selfSwitch: 'shedtail',
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
	},
	// darkfang: {
	// accuracy: 100,
	// basePower: 50,
	// category: "Physical",
	// shortDesc: "Hits twice. Doubles: Tries to hit each foe once",
	// isViable: true,
	// name: "Dark Fang",
	// pp: 10,
	// priority: 0,
	// flags: {protect: 1, mirror: 1, contact: 1, bite: 1},
	// onPrepareHit: function(target, source, move) {
	// this.attrLastMove('[still]');
	// this.add('-anim', source, "Bite", target);
	// },
	// multihit: 2,
	// smartTarget: true,
	// secondary: null,
	// target: "normal",
	// type: "Dark",
	// maxMove: {basePower: 130},
	// },
	// piercinggaze: {
	// accuracy: 100,
	// basePower: 80,
	// category: "Special",
	// shortDesc: "Uses user's SpD stat as SpA in damage calculation.",
	// isViable: true,
	// name: "Piercing Gaze",
	// pp: 10,
	// priority: 0,
	// flags: {protect: 1, mirror: 1},
	// onPrepareHit: function(target, source, move) {
	// this.attrLastMove('[still]');
	// this.add('-anim', source, "Glare", target);
	// },
	// useSourceDefensiveAsOffensive: true,
	// secondary: null,
	// target: "normal",
	// type: "Psychic",
	// },
	// dreadwing: {
	// accuracy: 100,
	// basePower: 95,
	// category: "Special",
	// shortDesc: "Uses target's SpA stat in damage calculation.",
	// isViable: true,
	// name: "Dread Wing",
	// pp: 15,
	// priority: 0,
	// flags: {protect: 1, mirror: 1},
	// onPrepareHit: function(target, source, move) {
	// this.attrLastMove('[still]');
	// this.add('-anim', source, "Oblivion Wing", target);
	// },
	// useTargetOffensive: true,
	// secondary: null,
	// target: "normal",
	// type: "Flying",
	// contestType: "Clever",
	// },
	// photongeyser: {
	// inherit: true,
	// category: "Physical",
	// },
	photonray: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Photon Ray",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Photon Geyser", target);
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	energysiphon: {
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Energy Siphon",
		shortDesc: "Drains target's HP for 3 turns.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1, contact: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Grass",
		volatileStatus: 'energysiphon',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fell Stinger", target);
		},
		condition: {
			onStart(target) {
				this.add('-start', target, 'move: Energy Siphon');
			},
			duration: 3,
			onResidualOrder: 8,
			onResidual(pokemon) {
				const target = this.getAtSlot(pokemon.volatiles['energysiphon'].sourceSlot);
				if (!target || target.fainted || target.hp <= 0) {
					console.log('Nothing to leech into');
					return;
				}
				const damage = this.damage(pokemon.baseMaxhp / 8, pokemon, target);
				if (damage) {
					this.heal(damage / 2, target, pokemon);
				}
			},
		},
	},
	// temperatureburst: {
	// accuracy: 100,
	// basePower: 90,
	// category: "Physical",
	// name: "Temperature Burst",
	// shortDesc: "Sets weather based on the user's type.",
	// pp: 5,
	// priority: 0,
	// flags: {contact: 1, protect: 1, mirror: 1},
	// onPrepareHit: function(target, source, move) {
	// if (source.species.id === "faerenheit"){
	// this.attrLastMove('[still]');
	// this.add('-anim', source, "Hidden Power Fire", target);
	// } else if (source.species.id === "cellsius"){
	// this.attrLastMove('[still]');
	// this.add('-anim', source, "Hidden Power Water", target);
	// } else if (source.species.id === "kelven"){
	// this.attrLastMove('[still]');
	// this.add('-anim', source, "Hidden Power Ice", target);
	// }
	// },
	// onHit(target, source, move) {
	// if (source.species.id === "faerenheit"){
	// this.field.setWeather('sunnyday');
	// } else if (source.species.id === "cellsius"){
	// this.field.setWeather('raindance');
	// } else if (source.species.id === "kelven"){
	// this.field.setWeather('snow');
	// }
	// },
	// target: "normal",
	// type: "Fairy",
	// contestType: "Cute",
	// },
	// grassyterrain: {
	// inherit: true,
	// condition: {
	// duration: 5,
	// durationCallback(source, effect) {
	// if (source?.hasItem('terrainextender')) {
	// return 8;
	// }
	// return 5;
	// },
	// onBasePowerPriority: 6,
	// onBasePower(basePower, attacker, defender, move) {
	// const weakenedMoves = ['earthquake', 'bulldoze', 'magnitude'];
	// if (weakenedMoves.includes(move.id)) {
	// this.debug('move weakened by grassy terrain');
	// return this.chainModify(0.5);
	// }
	// if (move.type === 'Grass' && attacker.isGrounded()) {
	// this.debug('grassy terrain boost');
	// return this.chainModify(1.5);
	// }
	// },
	// onStart(battle, source, effect) {
	// if (effect?.effectType === 'Ability') {
	// this.add('-fieldstart', 'move: Grassy Terrain', '[from] ability: ' + effect, '[of] ' + source);
	// } else {
	// this.add('-fieldstart', 'move: Grassy Terrain');
	// }
	// },
	// onResidualOrder: 5,
	// onResidualSubOrder: 3,
	// onResidual() {
	// this.eachEvent('Terrain');
	// },
	// onTerrain(pokemon) {
	// if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
	// this.debug('Pokemon is grounded, healing through Grassy Terrain.');
	// this.heal(pokemon.baseMaxhp / 16, pokemon, pokemon);
	// }
	// },
	// onEnd() {
	// if (!this.effectState.duration) this.eachEvent('Terrain');
	// this.add('-fieldend', 'move: Grassy Terrain');
	// },
	// },
	// },
	// electricterrain: {
	// inherit: true,
	// condition: {
	// duration: 5,
	// durationCallback(source, effect) {
	// if (source?.hasItem('terrainextender')) {
	// return 8;
	// }
	// return 5;
	// },
	// onSetStatus(status, target, source, effect) {
	// if (status.id === 'slp' && target.isGrounded() && !target.isSemiInvulnerable()) {
	// if (effect.id === 'yawn' || (effect.effectType === 'Move' && !effect.secondaries)) {
	// this.add('-activate', target, 'move: Electric Terrain');
	// }
	// return false;
	// }
	// },
	// onTryAddVolatile(status, target) {
	// if (!target.isGrounded() || target.isSemiInvulnerable()) return;
	// if (status.id === 'yawn') {
	// this.add('-activate', target, 'move: Electric Terrain');
	// return null;
	// }
	// },
	// onBasePowerPriority: 6,
	// onBasePower(basePower, attacker, defender, move) {
	// if (move.type === 'Electric' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
	// this.debug('electric terrain boost');
	// return this.chainModify(1.5);
	// }
	// },
	// onStart(battle, source, effect) {
	// if (effect?.effectType === 'Ability') {
	// this.add('-fieldstart', 'move: Electric Terrain', '[from] ability: ' + effect, '[of] ' + source);
	// } else {
	// this.add('-fieldstart', 'move: Electric Terrain');
	// }
	// },
	// onResidualOrder: 21,
	// onResidualSubOrder: 2,
	// onEnd() {
	// this.add('-fieldend', 'move: Electric Terrain');
	// },
	// },
	// },
	// psychicterrain: {
	// inherit: true,
	// condition: {
	// duration: 5,
	// durationCallback(source, effect) {
	// if (source?.hasItem('terrainextender')) {
	// return 8;
	// }
	// return 5;
	// },
	// onTryHitPriority: 4,
	// onTryHit(target, source, effect) {
	// if (effect && (effect.priority <= 0.1 || effect.target === 'self')) {
	// return;
	// }
	// if (target.isSemiInvulnerable() || target.side === source.side) return;
	// if (!target.isGrounded()) {
	// const baseMove = this.dex.moves.get(effect.id);
	// if (baseMove.priority > 0) {
	// this.hint("Psychic Terrain doesn't affect Pokémon immune to Ground.");
	// }
	// return;
	// }
	// this.add('-activate', target, 'move: Psychic Terrain');
	// return null;
	// },
	// onBasePowerPriority: 6,
	// onBasePower(basePower, attacker, defender, move) {
	// if (move.type === 'Psychic' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
	// this.debug('psychic terrain boost');
	// return this.chainModify(1.5);
	// }
	// },
	// onStart(battle, source, effect) {
	// if (effect?.effectType === 'Ability') {
	// this.add('-fieldstart', 'move: Psychic Terrain', '[from] ability: ' + effect, '[of] ' + source);
	// } else {
	// this.add('-fieldstart', 'move: Psychic Terrain');
	// }
	// },
	// onResidualOrder: 21,
	// onResidualSubOrder: 2,
	// onEnd() {
	// this.add('-fieldend', 'move: Psychic Terrain');
	// },
	// },
	// },
	// mistyexplosion: {
	// num: 802,
	// accuracy: 100,
	// basePower: 150,
	// category: "Special",
	// name: "Misty Explosion",
	// pp: 5,
	// priority: 0,
	// flags: {protect: 1, mirror: 1},
	// selfdestruct: "always",
	// onBasePower(basePower, source) {
	// if (this.field.isTerrain('mistyterrain') && source.isGrounded()) {
	// this.debug('misty terrain boost');
	// return this.chainModify(1.5);
	// }
	// },
	// secondary: null,
	// target: "allAdjacent",
	// type: "Fairy",
	// },
	sheercold: {
		accuracy: 85,
		basePower: 0,
		category: "Status",
		name: "Sheer Cold",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		status: 'frz',
		shortDesc: "Inflicts Freeze status on the opponent (1/16 Residual damage, halved SpA).",
		secondary: null,
		target: "normal",
		type: "Ice",
		zMove: {boost: {atk: 1}},
		contestType: "Beautiful",
		viable: true,
	},
	// reindeerdash: {
	// name: "Reindeer Dash",
	// accuracy: 85,
	// basePower: 100,
	// category: "Physical",
	// pp: 10,
	// type: "Ice",
	// shortDesc: "10% chance to inflict Frz. 20% chance to lower Spe 1 stage",
	// priority: 0,
	// flags: {protect: 1, mirror: 1, contact: 1},
	// target: "normal",
	// onPrepareHit: function(target, source, move) {
	// this.attrLastMove('[still]');
	// this.add('-anim', source, "Triple Axel", target);
	// },
	// secondaries: [
	// {
	// chance: 20,
	// boosts: {
	// spe: -1,
	// },
	// }, {
	// chance: 10,
	// status: 'frz',
	// },
	// ],

	// },
	spore: {
		inherit: true,
		pp: 10,
		desc: "Puts the opponent to sleep for 1 turn",
	},
	sleeppowder: {
		inherit: true,
		pp: 15,
		accuracy: 90,
		desc: "Puts the opponent to sleep for 1 turn",
	},
	hypnosis: {
		inherit: true,
		pp: 20,
		accuracy: 85,
		desc: "Puts the opponent to sleep for 1 turn",
	},
	grasswhistle: {
		inherit: true,
		isNonstandard: null,
		pp: 25,
		accuracy: 80,
		desc: "Puts the opponent to sleep for 1 turn",
	},
	// lodestone: {
	// num: 393,
	// accuracy: true,
	// basePower: 90,
	// category: "Special",
	// name: "Lodestone",
	// pp: 10,
	// priority: 0,
	// flags: {snatch: 1, gravity: 1},
	// self: {
	// volatileStatus: 'lodestone'
	// },
	// shortDesc: "User is not grounded until the end of the turn.",
	// condition: {
	// duration: 1,
	// onStart(target) {
	// if (target.volatiles['smackdown'] || target.volatiles['ingrain']) return false;
	// this.add('-start', target, 'Lodestone');
	// },
	// onImmunity(type) {
	// if (type === 'Ground') return false;
	// },
	// onResidualOrder: 15,
	// onEnd(target) {
	// this.add('-end', target, 'Lodestone');
	// },
	// },
	// secondary: null,
	// target: "normal",
	// type: "Rock",
	// zMove: {boost: {evasion: 1}},
	// contestType: "Clever",
	// onPrepareHit: function(target, source, move) {
	// this.attrLastMove('[still]');
	// this.add('-anim', source, "Rock Blast", target);
	// },
	// },
	// spikebolt: {
	// num: 454,
	// accuracy: 100,
	// basePower: 90,
	// category: "Physical",
	// name: "Spike Bolt",
	// pp: 15,
	// shortDesc: "High Critical Hit ratio.",
	// priority: 0,
	// onPrepareHit: function(target, source, move) {
	// this.attrLastMove('[still]');
	// this.add('-anim', source, "Pin Missile", target);
	// },
	// flags: {protect: 1, mirror: 1},
	// critRatio: 2,
	// secondary: null,
	// target: "normal",
	// type: "Bug",
	// contestType: "Clever",
	// },
	// secondsight: {
	// accuracy: 100,
	// basePower: 55,
	// category: "Special",
	// shortDesc: "Uses user's SpD stat as SpA in damage calculation. Powers up in Nexus form.",
	// isViable: true,
	// name: "Second Sight",
	// pp: 10,
	// priority: 0,
	// flags: {protect: 1, mirror: 1},
	// basePowerCallback(pokemon, target, move) {
	// if (pokemon.species.name === 'Flocura-Nexus' && pokemon.hasAbility('xenospore')) {
	// return move.basePower / 2;
	// }
	// return move.basePower;
	// },
	// onPrepareHit(target, pokemon, move) {
	// if (pokemon.species.name === 'Flocura-Nexus' && pokemon.hasAbility('xenospore')) {
	// move.multihit = 3;
	// }
	// this.attrLastMove('[still]');
	// this.add('-anim', pokemon, "Glare", target);
	// },
	// useSourceDefensiveAsOffensive: true,
	// secondary: null,
	// target: "normal",
	// type: "Psychic",
	// },
	crystalcutter: {
		name: "Crystal Cutter",
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		pp: 15,
		type: "Crystal",
		shortDesc: "Always crits. User recovers 50% of damage dealt",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, slicing: 1},
		target: "normal",
		willCrit: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psycho Cut", target);
		},
		drain: [1, 2],
	},
	crystaltail: {
		name: "Crystal Tail",
		accuracy: 85,
		basePower: 120,
		category: "Physical",
		pp: 5,
		type: "Crystal",
		shortDesc: "20% to lower foe's Atk by 1",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Tail", target);
		},
		secondary: {
			chance: 20,
			boosts: {
				atk: -1,
			},
		},
	},
	crystalbash: {
		name: "Crystal Bash",
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		pp: 10,
		type: "Crystal",
		shortDesc: "10% to lower foe's Atk by 1",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Head", target);
		},
		secondary: {
			chance: 10,
			boosts: {
				atk: -1,
			},
		},
	},
	crystalbeam: {
		name: "Crystal Beam",
		accuracy: 100,
		basePower: 90,
		category: "Special",
		pp: 15,
		type: "Crystal",
		shortDesc: "30% to lower foe's SpA by 1",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aurora Beam", target);
		},
		secondary: {
			chance: 30,
			boosts: {
				spa: -1,
			},
		},
	},
	crystalcage: {
		name: "Crystal Cage",
		accuracy: 85,
		basePower: 85,
		category: "Special",
		pp: 10,
		type: "Crystal",
		shortDesc: "Traps and damages for 4-5 turns.",
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Diamond Storm", target);
		},
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'partiallytrapped',
		target: "normal",
		secondary: null,
	},
	crystalburst: {
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Crystal Burst",
		pp: 5,
		shortDesc: "Lower's user's SpA by 1",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Clanging Scales", target);
		},
		self: {
			boosts: {
				spa: -1,
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Crystal",
		contestType: "Beautiful",
	},
	crystalhealing: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Crystal Healing",
		pp: 5,
		priority: 0,
		shortDesc: "Cures whole team's status conditions. 1/16 residual healing at the end of each turn.",
		flags: {snatch: 1, distance: 1, authentic: 1},
		onHit(pokemon, source) {
			this.add('-activate', source, 'move: Crystal Healing');
			const side = pokemon.side;
			let success = false;
			for (const ally of side.pokemon) {
				if (ally.cureStatus()) success = true;
			}
			return success;
		},
		volatileStatus: 'crystalhealing',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Crystal Healing');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 16);
			},
		},
		target: "allyTeam",
		type: "Crystal",
		zMove: {effect: 'heal'},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Heal Bell", target);
		},
		contestType: "Beautiful",
	},
	crystalfortification: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Crystal Fortification",
		pp: 20,
		priority: 0,
		shortDesc: "+1 Def, +1 SpD. Clears negative stat changes.",
		flags: {snatch: 1},
		onHit(pokemon, source) {
			let b: BoostName;
			let didBoost = false;
			const negBoosts = {};
			for (b in source.boosts) {
				if (source.boosts[b] < 0) negBoosts[b] = source.boosts[b] * -1;
				didBoost = true;
			}
			if (didBoost) {
				this.boost(negBoosts, source);
			}
		},
		boosts: {
			def: 1,
			spd: 1,
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Defense", target);
		},
		secondary: null,
		target: "self",
		type: "Crystal",
		zMove: {boost: {spd: 1}},
		contestType: "Beautiful",
	},
	crystalshard: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Crystal Shard",
		shortDesc: "Sets a layer of Spikes. (Not a new kind of hazard)",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		onHitSide(side, source) {
			source.side.foe.addSideCondition("spikes");
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Spikes", target);
		},
		secondary: null,
		target: "foeSide",
		type: "Crystal",
		zMove: {boost: {spd: 1}},
		contestType: "Beautiful",
	},
	feralbite: {
		name: "Feral Bite",
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		pp: 15,
		type: "Feral",
		shortDesc: "30% chance to Poison foe.",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, bite: 1},
		target: "normal",
		secondary: {
			chance: 30,
			status: "psn",
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Fang", target);
		},
	},
	feralshred: {
		name: "Feral Shred",
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		pp: 15,
		type: "Feral",
		shortDesc: "Hits twice. Lowers foe's Def by 1 on each hit",
		priority: 0,
		multihit: 2,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Claw", target);
		},
	},
	feralrush: {
		name: "Feral Rush",
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		pp: 10,
		type: "Feral",
		shortDesc: "User takes 1/3 recoil damage. 20% to lower foe's Def by 1",
		priority: 0,
		recoil: [33, 100],
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Double-Edge", target);
		},
	},
	feralshriek: {
		name: "Feral Shriek",
		accuracy: 100,
		basePower: 90,
		category: "Special",
		pp: 15,
		type: "Feral",
		shortDesc: "20% to lower foe's SpD by 1",
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1},
		target: "allAdjacentFoes",
		secondary: {
			chance: 20,
			boosts: {
				spd: -1,
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Overdrive", target);
		},
	},
	feralpower: {
		accuracy: 100,
		basePower: 110,
		category: "Special",
		name: "Feral Power",
		pp: 5,
		priority: 0,
		shortDesc: "Lowers user's Def by 1",
		flags: {protect: 1, mirror: 1, authentic: 1},
		selfBoost: {
			boosts: {
				def: -1,
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Searing Shot", target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Feral",
		contestType: "Tough",
	},
	feralbreath: {
		name: "Feral Breath",
		accuracy: 100,
		basePower: 80,
		category: "Special",
		pp: 10,
		type: "Feral",
		shortDesc: "100% to lower foe's SpD by 1",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Rage", target);
		},
	},
	feralhealing: {
		num: 816,
		accuracy: true,
		basePower: 0,
		category: "Status",
		//pp: 10,
		priority: 0,
		flags: {heal: 1, bypasssub: 1, allyanim: 1},
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.25));
			return pokemon.cureStatus() || success;
		},
		secondary: null,
		target: "allies",
		name: "Feral Healing",
		pp: 15,
		shortDesc: "Heals user 25% and cures status.",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Jungle Healing", target);
		},
		type: "Feral",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
	},
	feralspray: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Feral Spray",
		pp: 25,
		priority: 0,
		shortDesc: "+1 Atk, +1 SpA. Poisons the foe.",
		flags: {protect: 1, reflectable: 1, mirror: 1},
		selfBoost: {
			boosts: {
				atk: 1,
				spa: 1,
			},
		},
		status: 'psn',
		secondary: null,
		target: "normal",
		type: "Feral",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acid Spray", target);
		},
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	feralresilience: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Feral Resilience",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		shortDesc: "+1 Atk, +1 SpA. Cures user's status conditions.",
		onHit(pokemon) {
			if (['', 'slp'].includes(pokemon.status)) return false;
			pokemon.cureStatus();
		},
		secondary: null,
		target: "self",
		boosts: {
			atk: 1,
			spa: 1,
		},
		type: "Feral",
		zMove: {effect: 'heal'},
		contestType: "Cute",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Refresh", target);
		},
	},
	
	karatechop: {
		inherit: true,
		isNonstandard: null,
	},
	doubleslap: {
		inherit: true,
		isNonstandard: null,
	},
	cometpunch: {
		inherit: true,
		isNonstandard: null,
	},
	razorwind: {
		inherit: true,
		isNonstandard: null,
	},
	jumpkick: {
		inherit: true,
		isNonstandard: null,
	},
	rollingkick: {
		inherit: true,
		isNonstandard: null,
	},
	twineedle: {
		inherit: true,
		isNonstandard: null,
	},
	sonicboom: {
		inherit: true,
		isNonstandard: null,
	},
	submission: {
		inherit: true,
		isNonstandard: null,
	},
	dragonrage: {
		inherit: true,
		isNonstandard: null,
	},
	meditate: {
		inherit: true,
		isNonstandard: null,
	},
	rage: {
		inherit: true,
		isNonstandard: null,
	},
	barrier: {
		inherit: true,
		isNonstandard: null,
	},
	bide: {
		inherit: true,
		isNonstandard: null,
	},
	mirrormove: {
		inherit: true,
		isNonstandard: null,
	},
	eggbomb: {
		inherit: true,
		isNonstandard: null,
	},
	boneclub: {
		inherit: true,
		isNonstandard: null,
	},
	clamp: {
		inherit: true,
		isNonstandard: null,
	},
	skullbash: {
		inherit: true,
		isNonstandard: null,
	},
	spikecannon: {
		inherit: true,
		isNonstandard: null,
	},
	constrict: {
		inherit: true,
		isNonstandard: null,
	},
	kinesis: {
		inherit: true,
		isNonstandard: null,
	},
	barrage: {
		inherit: true,
		isNonstandard: null,
	},
	lovelykiss: {
		inherit: true,
		isNonstandard: null,
	},
	bubble: {
		inherit: true,
		isNonstandard: null,
	},
	dizzypunch: {
		inherit: true,
		isNonstandard: null,
	},
	flash: {
		inherit: true,
		isNonstandard: null,
	},
	psywave: {
		inherit: true,
		isNonstandard: null,
	},
	bonemerang: {
		inherit: true,
		isNonstandard: null,
	},
	hyperfang: {
		inherit: true,
		isNonstandard: null,
	},
	sharpen: {
		inherit: true,
		isNonstandard: null,
	},
	conversion: {
		inherit: true,
		isNonstandard: null,
	},
	sketch: {
		inherit: true,
		isNonstandard: null,
	},
	triplekick: {
		inherit: true,
		isNonstandard: null,
	},
	spiderweb: {
		inherit: true,
		isNonstandard: null,
	},
	mindreader: {
		inherit: true,
		isNonstandard: null,
	},
	nightmare: {
		inherit: true,
		isNonstandard: null,
	},
	conversion2: {
		inherit: true,
		isNonstandard: null,
	},
	aeroblast: {
		inherit: true,
		isNonstandard: null,
	},
	feintattack: {
		inherit: true,
		isNonstandard: null,
	},
	octazooka: {
		inherit: true,
		isNonstandard: null,
	},
	foresight: {
		inherit: true,
		isNonstandard: null,
	},
	return: {
		inherit: true,
		isNonstandard: null,
	},
	frustration: {
		inherit: true,
		isNonstandard: null,
	},
	sacredfire: {
		inherit: true,
		isNonstandard: null,
	},
	magnitude: {
		inherit: true,
		isNonstandard: null,
	},
	pursuit: {
		inherit: true,
		isNonstandard: null,
	},
	vitalthrow: {
		inherit: true,
		isNonstandard: null,
	},
	hiddenpower: {
		inherit: true,
		isNonstandard: null,
	},
	hail: {
		inherit: true,
		isNonstandard: null,
	},
	smellingsalts: {
		inherit: true,
		isNonstandard: null,
	},
	naturepower: {
		inherit: true,
		isNonstandard: null,
	},
	assist: {
		inherit: true,
		isNonstandard: null,
	},
	magiccoat: {
		inherit: true,
		isNonstandard: null,
	},
	revenge: {
		inherit: true,
		isNonstandard: null,
	},
	refresh: {
		inherit: true,
		isNonstandard: null,
	},
	grudge: {
		inherit: true,
		isNonstandard: null,
	},
	snatch: {
		inherit: true,
		isNonstandard: null,
	},
	secretpower: {
		inherit: true,
		isNonstandard: null,
	},
	camouflage: {
		inherit: true,
		isNonstandard: null,
	},
	tailglow: {
		inherit: true,
		isNonstandard: null,
	},
	lusterpurge: {
		inherit: true,
		isNonstandard: null,
	},
	mistball: {
		inherit: true,
		isNonstandard: null,
	},
	mudsport: {
		inherit: true,
		isNonstandard: null,
	},
	iceball: {
		inherit: true,
		isNonstandard: null,
	},
	needlearm: {
		inherit: true,
		isNonstandard: null,
	},
	aromatherapy: {
		inherit: true,
		isNonstandard: null,
	},
	odorsleuth: {
		inherit: true,
		isNonstandard: null,
	},
	silverwind: {
		inherit: true,
		isNonstandard: null,
	},
	signalbeam: {
		inherit: true,
		isNonstandard: null,
	},
	skyuppercut: {
		inherit: true,
		isNonstandard: null,
	},
	watersport: {
		inherit: true,
		isNonstandard: null,
	},
	doomdesire: {
		inherit: true,
		isNonstandard: null,
	},
	psychoboost: {
		inherit: true,
		isNonstandard: null,
	},
	miracleeye: {
		inherit: true,
		isNonstandard: null,
	},
	wakeupslap: {
		inherit: true,
		isNonstandard: null,
	},
	naturalgift: {
		inherit: true,
		isNonstandard: null,
	},
	embargo: {
		inherit: true,
		isNonstandard: null,
	},
	psychoshift: {
		inherit: true,
		isNonstandard: null,
	},
	trumpcard: {
		inherit: true,
		isNonstandard: null,
	},
	healblock: {
		inherit: true,
		isNonstandard: null,
	},
	wringout: {
		inherit: true,
		isNonstandard: null,
	},
	luckychant: {
		inherit: true,
		isNonstandard: null,
	},
	mefirst: {
		inherit: true,
		isNonstandard: null,
	},
	punishment: {
		inherit: true,
		isNonstandard: null,
	},
	mudbomb: {
		inherit: true,
		isNonstandard: null,
	},
	mirrorshot: {
		inherit: true,
		isNonstandard: null,
	},
	rockclimb: {
		inherit: true,
		isNonstandard: null,
	},
	rockwrecker: {
		inherit: true,
		isNonstandard: null,
	},
	magnetbomb: {
		inherit: true,
		isNonstandard: null,
	},
	captivate: {
		inherit: true,
		isNonstandard: null,
	},
	chatter: {
		inherit: true,
		isNonstandard: null,
	},
	healorder: {
		inherit: true,
		isNonstandard: null,
	},
	crushgrip: {
		inherit: true,
		isNonstandard: null,
	},
	darkvoid: {
		inherit: true,
		isNonstandard: null,
	},
	seedflare: {
		inherit: true,
		isNonstandard: null,
	},
	ominouswind: {
		inherit: true,
		isNonstandard: null,
	},
	autotomize: {
		inherit: true,
		isNonstandard: null,
	},
	telekinesis: {
		inherit: true,
		isNonstandard: null,
	},
	stormthrow: {
		inherit: true,
		isNonstandard: null,
	},
	flameburst: {
		inherit: true,
		isNonstandard: null,
	},
	synchronoise: {
		inherit: true,
		isNonstandard: null,
	},
	chipaway: {
		inherit: true,
		isNonstandard: null,
	},
	skydrop: {
		inherit: true,
		isNonstandard: null,
	},
	bestow: {
		inherit: true,
		isNonstandard: null,
	},
	dualchop: {
		inherit: true,
		isNonstandard: null,
	},
	heartstamp: {
		inherit: true,
		isNonstandard: null,
	},
	leaftornado: {
		inherit: true,
		isNonstandard: null,
	},
	steamroller: {
		inherit: true,
		isNonstandard: null,
	},
	headcharge: {
		inherit: true,
		isNonstandard: null,
	},
	geargrind: {
		inherit: true,
		isNonstandard: null,
	},
	searingshot: {
		inherit: true,
		isNonstandard: null,
	},
	technoblast: {
		inherit: true,
		isNonstandard: null,
	},
	secretsword: {
		inherit: true,
		isNonstandard: null,
	},
	glaciate: {
		inherit: true,
		isNonstandard: null,
	},
	boltstrike: {
		inherit: true,
		isNonstandard: null,
	},
	blueflare: {
		inherit: true,
		isNonstandard: null,
	},
	freezeshock: {
		inherit: true,
		isNonstandard: null,
	},
	iceburn: {
		inherit: true,
		isNonstandard: null,
	},
	fusionflare: {
		inherit: true,
		isNonstandard: null,
	},
	fusionbolt: {
		inherit: true,
		isNonstandard: null,
	},
	matblock: {
		inherit: true,
		isNonstandard: null,
	},
	rototiller: {
		inherit: true,
		isNonstandard: null,
	},
	trickortreat: {
		inherit: true,
		isNonstandard: null,
	},
	iondeluge: {
		inherit: true,
		isNonstandard: null,
	},
	forestscurse: {
		inherit: true,
		isNonstandard: null,
	},
	topsyturvy: {
		inherit: true,
		isNonstandard: null,
	},
	craftyshield: {
		inherit: true,
		isNonstandard: null,
	},
	flowershield: {
		inherit: true,
		isNonstandard: null,
	},
	electrify: {
		inherit: true,
		isNonstandard: null,
	},
	kingsshield: {
		inherit: true,
		isNonstandard: null,
	},
	venomdrench: {
		inherit: true,
		isNonstandard: null,
	},
	powder: {
		inherit: true,
		isNonstandard: null,
	},
	geomancy: {
		inherit: true,
		isNonstandard: null,
	},
	poweruppunch: {
		inherit: true,
		isNonstandard: null,
	},
	oblivionwing: {
		inherit: true,
		isNonstandard: null,
	},
	thousandarrows: {
		inherit: true,
		isNonstandard: null,
	},
	thousandwaves: {
		inherit: true,
		isNonstandard: null,
	},
	landswrath: {
		inherit: true,
		isNonstandard: null,
	},
	lightofruin: {
		inherit: true,
		isNonstandard: null,
	},
	sparklingaria: {
		inherit: true,
		isNonstandard: null,
	},
	floralhealing: {
		inherit: true,
		isNonstandard: null,
	},
	spotlight: {
		inherit: true,
		isNonstandard: null,
	},
	toxicthread: {
		inherit: true,
		isNonstandard: null,
	},
	laserfocus: {
		inherit: true,
		isNonstandard: null,
	},
	gearup: {
		inherit: true,
		isNonstandard: null,
	},
	anchorshot: {
		inherit: true,
		isNonstandard: null,
	},
	purify: {
		inherit: true,
		isNonstandard: null,
	},
	coreenforcer: {
		inherit: true,
		isNonstandard: null,
	},
	beakblast: {
		inherit: true,
		isNonstandard: null,
	},
	clangingscales: {
		inherit: true,
		isNonstandard: null,
	},
	dragonhammer: {
		inherit: true,
		isNonstandard: null,
	},
	shelltrap: {
		inherit: true,
		isNonstandard: null,
	},
	shadowbone: {
		inherit: true,
		isNonstandard: null,
	},
	prismaticlaser: {
		inherit: true,
		isNonstandard: null,
	},
	spectralthief: {
		inherit: true,
		isNonstandard: null,
	},
	sunsteelstrike: {
		inherit: true,
		isNonstandard: null,
	},
	moongeistbeam: {
		inherit: true,
		isNonstandard: null,
	},
	naturesmadness: {
		inherit: true,
		isNonstandard: null,
	},
	multiattack: {
		inherit: true,
		isNonstandard: null,
	},
	mindblown: {
		inherit: true,
		isNonstandard: null,
	},
	plasmafists: {
		inherit: true,
		isNonstandard: null,
	},
	photongeyser: {
		inherit: true,
		isNonstandard: null,
	},
	doubleironbash: {
		inherit: true,
		isNonstandard: null,
	},
	maxguard: {
		inherit: true,
		isNonstandard: null,
	},
	octolock: {
		inherit: true,
		isNonstandard: null,
	},
	boltbeak: {
		inherit: true,
		isNonstandard: null,
	},
	fishiousrend: {
		inherit: true,
		isNonstandard: null,
	},
	clangoroussoul: {
		inherit: true,
		isNonstandard: null,
	},
	decorate: {
		inherit: true,
		isNonstandard: null,
	},
	snaptrap: {
		inherit: true,
		isNonstandard: null,
	},
	aurawheel: {
		inherit: true,
		isNonstandard: null,
	},
	strangesteam: {
		inherit: true,
		isNonstandard: null,
	},
	obstruct: {
		inherit: true,
		isNonstandard: null,
	},
	meteorassault: {
		inherit: true,
		isNonstandard: null,
	},
	eternabeam: {
		inherit: true,
		isNonstandard: null,
	},
};
