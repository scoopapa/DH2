export const Moves: {[moveid: string]: ModdedMoveData} = {
	direclaw: {
		shortDesc: "20% chance to paralyze or poison or sleep target. High critical hit ratio.",
		num: -1001,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		name: "Dire Claw",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			const result = this.random(3);
			move.secondaries = [];
			if (result === 0) {
				move.secondaries.push({
					chance: 20,
					status: 'psn',
				});
			} else if (result === 1) {
				move.secondaries.push({
					chance: 20,
					status: 'par',
				});
			} else {
				move.secondaries.push({
					chance: 10,
					status: 'slp',
				});
			}
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Crush Claw", target);
		},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	psyshieldbash: {
		shortDesc: "20% to raise Def or Sp. Def, whichever attacking stat is higher on the target.",
		num: -1002,
		accuracy: true,
		basePower: 0,
		category: "Physical",
		name: "Psyshield Bash",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyMove(move, source, target) {
			move.secondaries = [];
			if (target.getStat('atk', false, true) >= target.getStat('atk', false, true)) {
				move.secondaries.push({
					chance: 20,
					self: {
						boosts: {
							def: 1,
						},
					},
				});
			} else {
				move.secondaries.push({
					chance: 20,
					self: {
						boosts: {
							spd: 1,
						},
					},
				});
			}
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Zen Headbutt", target);
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	powershift: {
		shortDesc: "Switches user's Attack with Defense and Sp. Atk with Sp. Def.",
		num: -1003,
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
	stoneaxe: {
		shortDesc: "Sets Stealth Rock after damage.",
		num: -1004,
		accuracy: 90,
		basePower: 65,
		category: "Physical",
		name: "Stone Axe",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Stone Edge", target);
		},
		sideCondition: 'stealthrock',
		secondary: null,
		target: "adjacentFoe",
		type: "Rock",
		contestType: "Tough",
	},
	springtidestorm: {
		shortDesc: "10% chance to raise all user's stats (Incarnate) or lower all target's stats (Therian).",
		num: -1005,
		accuracy: 95,
		basePower: 95,
		category: "Special",
		name: "Springtide Storm",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fairy Wind", target);
		},
		onTry(pokemon) {
			if (pokemon.species.baseSpecies === 'Enamorus') {
				return;
			}
			this.hint("Only a Pokemon whose form is Enamorus or Enamorus-Therian can use this move.");
			this.add('-fail', pokemon, 'move: Springtide Storm');
			return null;
		},
		onModifyMove(move, pokemon) {
			move.secondaries = [];
			if (pokemon.species.name === 'Enamorus-Therian') {
				move.secondaries.push({
					chance: 10,
					boosts: {
						atk: -1,
						def: -1,
						spa: -1,
						spd: -1,
						spe: -1,
					},
				});
			} else {
				move.secondaries.push({
					chance: 10,
					self: {
						boosts: {
							atk: 1,
							def: 1,
							spa: 1,
							spd: 1,
							spe: 1,
						},
					},
				});
			}
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Beautiful",
	},
	mysticalpower: {
		shortDesc: "100% chance to raise the user's most proficient stat by 1.",
		num: -1006,
		accuracy: 90,
		basePower: 70,
		category: "Special",
		name: "Mystical Power",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Shattered Psyche", target);
		},
		secondary: {
			chance: 20,
			onHit(move, pokemon) {
				let statName = 'atk';
				let bestStat = 0;
				let s: StatNameExceptHP;
				for (s in pokemon.storedStats) {
					if (pokemon.storedStats[s] > bestStat) {
						statName = s;
						bestStat = pokemon.storedStats[s];
					}
				}
				if (statName === 'spe') move.self = {boosts: {spe: 1}};
				else if (statName === 'spd') move.self = {boosts: {spd: 1}};
				else if (statName === 'spa') move.self = {boosts: {spa: 1}};
				else if (statName === 'def') move.self = {boosts: {def: 1}};
				else move.self = {boosts: {atk: 1}};
			}
		},
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	ragingfury: {
		shortDesc: "Lasts 2-3 turns. Confuses the user afterwards.",
		num: -1007,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Raging Fury",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
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
	wavecrash: {
		shortDesc: "Usually goes first. Has 33% recoil.",
		num: -1008,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Wave Crash",
		pp: 10,
		priority: 1,
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
		num: -1009,
		accuracy: 95,
		basePower: 150,
		category: "Special",
		name: "Chloroblast",
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
	mountaingale: {
		shortDesc: "Summons Hail",
		num: -1010,
		accuracy: 90,
		basePower: 110,
		category: "Physical",
		name: "Mountain Gale",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Glacial Lance", target);
		},
		self: {
			onHit(source) {
				this.field.setWeather('hail');
			},
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
	},
	victorydance: {
		shortDesc: "Raises the user's Atk, Def and Spe by 1.",
		num: -1011,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Victory Dance",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Quiver Dance", target);
		},
		boosts: {
			atk: 1,
			def: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Fighting",
		zMove: {boost: {atk: 1}},
		contestType: "Beautiful",
	},
	headlongrush: {
		shortDesc: "Lowers the user's Defense and Sp. Def by 1.",
		num: -1012,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Headlong Rush",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tectonic Rage", target);
		},
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
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
	barbbarrage: {
		shortDesc: "Power doubles if the target has a status ailment; 20% chance to poison.",
		num: -1013,
		accuracy: 100,
		basePower: 65,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Physical",
		name: "Barb Barrage",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Sting", target);
		},
		secondary: {
			chance: 20,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		zMove: {basePower: 160},
		contestType: "Clever",
	},
	esperwing: {
		shortDesc: "Usually goes first. 10% chance to raise user's Spe by 1",
		num: -1014,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Esper Wing",
		pp: 10,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aeroblast", target);
		},
		self: {
			chance: 10,
			boosts: {
				spe: 1,
			},
		},
		secondary: null,
		target: "any",
		type: "Psychic",
		contestType: "Cool",
	},
	bittermalice: {
		shortDesc: "Power doubles if the target has a status ailment; 10% chance of freeze.",
		num: -1015,
		accuracy: 100,
		basePower: 65,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Special",
		name: "Bitter Malice",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Snarl", target);
		},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "normal",
		type: "Ghost",
		zMove: {basePower: 160},
		contestType: "Clever",
	},
	shelter: {
		shortDesc: "Raises the user's defenses by 1 and applies Aqua Ring.",
		num: -1016,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Shelter",
		pp: 15,
		priority: 0,
		volatileStatus: 'aquaring',
		flags: {snatch: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Baneful Bunker", target);
		},
		boosts: {
			def: 1,
			spd: 1,
		},
		secondary: null,
		target: "self",
		type: "Steel",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Tough",
	},
	triplearrows: {
		shortDesc: "100% chance to lower the target's Defense by 1.",
		num: -1017,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Triple Arrows",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Thunderous Kick", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Fighting",
	},	
	infernalparade: {
		shortDesc: "Power doubles if the target has a status ailment; 20% chance to burn.",
		num: -1018,
		accuracy: 100,
		basePower: 65,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) return move.basePower * 2;
			return move.basePower;
		},
		category: "Special",
		name: "Infernal Parade",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Will-o-Wisp", target);
		},
		secondary: {
			chance: 20,
			status: 'brn',
		},
		target: "normal",
		type: "Ghost",
		zMove: {basePower: 160},
		contestType: "Clever",
	},
	ceaselessedge: {
		shortDesc: "Sets Spikes after damage.",
		num: -1019,
		accuracy: 90,
		basePower: 65,
		category: "Physical",
		name: "Ceaseless Edge",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Night Slash", target);
		},
		sideCondition: 'spikes',
		secondary: null,
		target: "adjacentFoe",
		type: "Dark",
		contestType: "Cool",
	},
	bleakwindstorm: {
		shortDesc: "30% chance to freeze target.",
		num: -1020,
		accuracy: 95,
		basePower: 95,
		category: "Special",
		name: "Bleakwind Storm",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Blizzard", target);
		},
		secondary: {
			chance: 30,
			status: 'frz',
		},
		target: "any",
		type: "Flying",
		contestType: "Tough",
	},
	wildboltstorm: {
		shortDesc: "30% chance to paralyze target.",
		num: -1021,
		accuracy: 95,
		basePower: 95,
		category: "Special",
		name: "Wildbolt Storm",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bolt Strike", target);
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
		contestType: "Tough",
	},
	sandsearstorm: {
		shortDesc: "30% chance to burn target.",
		num: -1022,
		accuracy: 95,
		basePower: 95,
		category: "Special",
		name: "Sandsear Storm",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Scorching Sands", target);
		},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	lunarblessing: {
		shortDesc: "User cures its burn, poison, or paralysis and recovers 1/16 max HP per turn.",
		num: -1022,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Lunar Blessing",
		pp: 10,
		priority: 0,
		volatileStatus: 'aquaring',
		flags: {snatch: 1, heal: 1},
		heal: [1, 4],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Moonlight", target);
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		zMove: {boost: {def: 1}},
		contestType: "Beautiful",
	},
	takeheart: {
		shortDesc: "User cures its burn, poison, or paralysis and raises Sp. Atk. and Sp. Def. by 1.",
		num: -1023,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Take Heart",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Tail Glow", target);
		},
		onHit(pokemon) {
			const success = !!this.boost({spa: 1, spd: 1}, pokemon);
			return pokemon.cureStatus() || success;
		},
		secondary: null,
		target: "self",
		type: "Water",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
};
