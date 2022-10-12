export const Moves: {[moveid: string]: ModdedMoveData} = {
	ragingfury: {
		shortDesc: "Lasts 2-3 turns. Confuses the user afterwards.",
		num: -1001,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Raging Fury",
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
	chloroblast: {
		shortDesc: "User loses 50% max HP.",
		num: -1002,
		accuracy: 95,
		basePower: 140,
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
	direclaw: {
		shortDesc: "50% chance to paralyze or poison or sleep target. High critical hit ratio.",
		num: -1005,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Dire Claw",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Crush Claw", target);
		},
		critRatio: 2,
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
	ceaselessedge: {
		shortDesc: "Sets Spikes after damage. High critical hit ratio.",
		num: -1006,
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
		critRatio: 2,
		sideCondition: 'spikes',
		secondary: null,
		target: "adjacentFoe",
		type: "Dark",
		contestType: "Cool",
	},
	victorydance: {
		shortDesc: "Raises the user's and ally's Attack and Defense by 1.",
		num: -1007,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Victory Dance",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Quiver Dance", target);
		},
		boosts: {
			atk: 1,
			def: 1,
		},
		secondary: null,
		target: "allies",
		type: "Fighting",
		zMove: {boost: {atk: 1}},
		contestType: "Beautiful",
	},
	wavecrash: {
		shortDesc: "Usually goes first. Has 33% recoil.",
		num: -1008,
		accuracy: 100,
		basePower: 75,
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
	bittermalice: {
		shortDesc: "Power doubles if the target has a status ailment; 30% chance of frostbite.",
		num: -1009,
		accuracy: 100,
		basePower: 60,
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
			chance: 30, // not real freeze!
			status: 'frz',
		},
		target: "normal",
		type: "Ghost",
		zMove: {basePower: 160},
		contestType: "Clever",
	},
	esperwing: {
		shortDesc: "Usually goes first. High critical hit ratio.",
		num: -1010,
		accuracy: 90,
		basePower: 75,
		category: "Special",
		name: "Esper Wing",
		pp: 10,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aeroblast", target);
		},
		critRatio: 2,
		secondary: null,
		target: "any",
		type: "Psychic",
		contestType: "Cool",
	},
	shelter: {
		shortDesc: "Raises the user's and ally's Defense by 2.",
		num: -1011,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Shelter",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Baneful Bunker", target);
		},
		boosts: {
			def: 2,
		},
		secondary: null,
		target: "allies",
		type: "Steel",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Tough",
	},
	mountaingale: {
		shortDesc: "30% chance to make the target flinch.",
		num: -1011,
		accuracy: 85,
		basePower: 120,
		category: "Physical",
		name: "Mountain Gale",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Glacial Lance", target);
		},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
	},
	triplearrows: {
		shortDesc: "100% chance to lower the target's Defense by 1. Raises the user's critical hit ratio by 2.",
		num: -1012,
		accuracy: 100,
		basePower: 50,
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
		self: {
			volatileStatus: 'focusenergy',
		},
		target: "normal",
		type: "Fighting",
	},
	psyshieldbash: {
		shortDesc: "100% chance to raise the user's Defense by 1.",
		num: -1013,
		accuracy: 90,
		basePower: 70,
		category: "Physical",
		name: "Psyshield Bash",
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
	springtidestorm: {
		shortDesc: "10% chance to raise all stats by 1 (not acc/eva).",
		num: -1016,
		accuracy: 80,
		basePower: 100,
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
					chance: 30,
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
		shortDesc: "100% chance to raise the user's most proficient stat by 1.",
		num: -1018,
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
		onModifyMove(move, pokemon) {
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
		},
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	bleakwindstorm: {
		shortDesc: "10% chance to freeze target. Can't miss in rain.",
		num: -1019,
		accuracy: 80,
		basePower: 100,
		category: "Special",
		name: "Bleakwind Storm",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Blizzard", target);
		},
		onModifyMove(move, pokemon, target) {
			switch (target?.effectiveWeather()) {
			case 'raindance':
			case 'primordialsea':
				move.accuracy = true;
				break;
			case 'sunnyday':
			case 'desolateland':
				move.accuracy = 50;
				break;
			}
		},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "any",
		type: "Flying",
		contestType: "Tough",
	},
	wildboltstorm: {
		shortDesc: "30% chance to paralyze target. Can't miss in rain.",
		num: -1020,
		accuracy: 80,
		basePower: 100,
		category: "Special",
		name: "Wildbolt Storm",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bolt Strike", target);
		},
		onModifyMove(move, pokemon, target) {
			switch (target?.effectiveWeather()) {
			case 'raindance':
			case 'primordialsea':
				move.accuracy = true;
				break;
			case 'sunnyday':
			case 'desolateland':
				move.accuracy = 50;
				break;
			}
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
		num: -1021,
		accuracy: 80,
		basePower: 100,
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
		shortDesc: "User and allies: healed 1/4 max HP, status cured.",
		num: -1022,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Lunar Blessing",
		pp: 10,
		priority: 0,
		flags: {heal: 1, authentic: 1, mystery: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Moonlight", target);
		},
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.25));
			return pokemon.cureStatus() || success;
		},
		secondary: null,
		target: "allies",
		type: "Psychic",
		zMove: {boost: {def: 1}},
		contestType: "Beautiful",
	},
	takeheart: {
		shortDesc: "Raises the user's Sp. Atk and Sp. Def by 1. User cures its burn, poison, or paralysis.",
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
			if (['', 'slp', 'frz'].includes(pokemon.status) && !pokemon.statusData.frostbite) return;
			pokemon.cureStatus();
		},
		boosts: {
			spa: 1,
			spd: 1,
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	refresh: {
		inherit: true,
		onHit(pokemon) {
			if (['', 'slp', 'frz'].includes(pokemon.status) && !pokemon.statusData.frostbite) return;
			pokemon.cureStatus();
		},
	},
	spacialrend: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.species.name === 'Palkia-Origin') {
				return move.basePower - 10;
			}
			return move.basePower;
		},
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.name === 'Palkia-Origin') {
				move.accuracy = 85;
				move.critRatio = 3;
			}
		},
	},
	roaroftime: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.species.name === 'Dialga-Origin') {
				return move.basePower + 20;
			}
			return move.basePower;
		},
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.name === 'Dialga-Origin') {
				move.accuracy = 75;
			}
		},
	},

	// SV leaks

	terablast: {
		num: -1024,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "This move's type depends on the user's primary type. If the user's primary type is typeless, this move's type is the user's secondary type if it has one, otherwise the added type from Forest's Curse or Trick-or-Treat. This move is typeless if the user's type is typeless alone. Additionally, this move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes.",
		shortDesc: "In Terastal, type matches Tera Type; phys if Atk > SpA.",
		name: "Tera Blast",
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
	defibrillator: {
		num: -1025,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Defibrillator",
		shortDesc: "Revives the last fainted Pokémon, but half of its HP is taken from the user.",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Charge", target);
		},
		onTry(pokemon) {
			if (pokemon.side.mostRecentKO && pokemon.side.mostRecentKO.fainted) return;
			this.add('-fail', pokemon, 'move: Defibrillator');
			this.hint("There was nothing to revive!");
			return null;
		},
		onHit(pokemon) {
			let revived = pokemon.side.mostRecentKO;
			if (!revived) return false;
			revived.fainted = null;
			revived.faintQueued = null;
			revived.hp = revived.maxhp;
			revived.status = '';
			this.damage(Math.round(revived.maxhp / 2), pokemon, pokemon);
			this.add('-message', `${revived.name} was revived!`);
			revived.side.pokemonLeft++;
		},
		secondary: null,
		target: "self",
		type: "Electric",
		contestType: "Clever",
	},
	shedtail: {
		num: -1026,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Shed Tail",
		shortDesc: "In exchange for half of its HP, switches out and creates a Substitute for the switch-in.",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		selfSwitch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Substitute", target);
		},
		onTryHit(target) {
			if (target.hp <= target.maxhp / 2 || target.maxhp === 1) { // Shedinja clause
				this.add('-fail', target, 'move: Substitute', '[weak]');
				return null;
			}
		},
		onHit(target) {
			this.directDamage(target.maxhp / 2);
		},
		slotCondition: 'shedtail',
		condition: {
			onStart(pokemon, source) {
				this.effectData.hp = Math.floor(source.maxhp / 4);
			},
			onSwap(target) {
				target.side.removeSlotCondition(target, 'shedtail');
				if (!target.fainted) {
					if (target.addVolatile('substitute')) {
						target.volatiles['substitute'].hp = this.effectData.hp;
						this.add('-anim', target, "Substitute", target);
					}
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'heal'},
		contestType: "Cute",
	},
	armorcannon: {
		num: -1027,
		accuracy: 100,
		basePower: 110, // it's a special move
		category: "Special",
		name: "Armor Cannon",
		shortDesc: "Lowers the user's Defense and Sp. Def by 1.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Searing Shot", target);
		},
		self: {
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Tough",
	},
	bitterblade: {
		num: -1028,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Bitter Blade",
		shortDesc: "User recovers 50% of the damage dealt.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Shadow Claw", target);
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
};
