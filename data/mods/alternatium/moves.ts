export const Moves: {[moveid: string]: MoveData} = {
	baddybad: {
		inherit: true,
		isNonstandard: undefined,
	},
	bouncybubble: {
		inherit: true,
		isNonstandard: undefined,
	},
	buzzybuzz: {
		inherit: true,
		isNonstandard: undefined,
	},
	freezyfrost: {
		inherit: true,
		isNonstandard: undefined,
	},
	glitzyglow: {
		inherit: true,
		isNonstandard: undefined,
	},
	sappyseed: {
		inherit: true,
		isNonstandard: undefined,
	},
	sizzlyslide: {
		inherit: true,
		isNonstandard: undefined,
	},
	sparklyswirl: {
		inherit: true,
		isNonstandard: undefined,
	},
	veeveevolley: {
		inherit: true,
		isNonstandard: undefined,
	},
	stealthrock: {
		inherit: true,
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || pokemon.hasItem('burndrive')) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
	},
	spikes: {
		inherit: true,
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'Spikes');
				this.effectData.layers = 1;
			},
			onRestart(side) {
				if (this.effectData.layers >= 3) return false;
				this.add('-sidestart', side, 'Spikes');
				this.effectData.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasItem('heavydutyboots') || pokemon.hasItem('burndrive')) return;
				const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
				this.damage(damageAmounts[this.effectData.layers] * pokemon.maxhp / 24);
			},
		},
	},
	toxicspikes: {
		inherit: true,
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectData.layers = 1;
			},
			onRestart(side) {
				if (this.effectData.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectData.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Poison')) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (pokemon.hasType('Steel') || pokemon.hasItem('heavydutyboots') || pokemon.hasItem('burndrive')) {
					return;
				} else if (this.effectData.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
	},
	behemothbash: {
		num: 782,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Behemoth Bash",
		shortDesc: "Lowers attack harshly on contact with the user before it moves.",
		pp: 10,
		priority: -3,
		flags: {contact: 1, protect: 1, mirror: 1},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('behemothbash');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Behemoth Bash');
			},
			onDamagingHit(damage, target, source, move) {
				if (move.flags['contact']) {
					this.boost({atk: -2}, source, target, undefined, true);
					this.add('-activate', target, 'move: Behemoth Bash');
				}
			},
		},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('behemothbash');
		},
		secondary: undefined,
		target: "normal",
		type: "Steel",
	},
	behemothblade: {
		num: 781,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Behemoth Blade",
		shortDesc: "High critical hit ratio.",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		critRatio: 2,
		secondary: undefined,
		target: "normal",
		type: "Steel",
	},
	eeriespell: {
		inherit: true,
		type: "Dark",
	},
	floatyfall: {
		inherit: true,
		isNonstandard: undefined,
	},
	multiattack: {
		num: 718,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Multi-Attack",
		shortDesc: "Type varies based on the user's type.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		secondary: undefined,
		target: "normal",
		type: "Normal",
	},
	pikapapow: {
		inherit: true,
		isNonstandard: undefined,
	},
	shellsidearm: {
		num: 801,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Shell Side Arm",
		shortDesc: "Targets opponent's lowest defensive stat.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, source, target) {
			if (target && target.getStat('def', false, true) <= target.getStat('spd', false, true)) {
				// hack because move.defensiveCategory seems to have been removed.
				move.category = 'Physical';
				move.basePower = move.basePower * (source.getStat('spa', false, true) / source.getStat('atk', false, true));
			}
		},
		secondary: {
			chance: 20,
			status: 'psn',
		},
		target: "normal",
		type: "Water",
	},
	splishysplash: {
		inherit: true,
		isNonstandard: undefined,
	},
	zippyzap: {
		inherit: true,
		isNonstandard: undefined,
	},
	bodypress: {
		num: 776,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Body Press",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		overrideOffensiveStat: 'def',
		onBasePower(basePower, source) {
			if (source.item === 'lightball' && source.species.id === 'pikachulibre') {
				return this.chainModify(2);
			}
		},
		secondary: undefined,
		target: "normal",
		type: "Fighting",
	},
	technoblast: {
		num: 546,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Techno Blast",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			if (pokemon.ignoringItem()) return;
			move.type = this.runEvent('Drive', pokemon, undefined, move, 'Normal');
		},
		secondary: undefined,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	technoblastdouse: {
		num: 546,
		accuracy: 80,
		basePower: 120,
		category: "Special",
		shortDesc: "Type varies based on the held Drive.",
		name: "Techno Blast (Douse)",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			if (pokemon.ignoringItem()) return;
			move.type = this.runEvent('Drive', pokemon, undefined, move, 'Normal');
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Techno Blast", target);
		},
		secondary: undefined,
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	technoblastbase: {
		num: 546,
		accuracy: 90,
		basePower: 100,
		category: "Special",
		shortDesc: "Physical if user's Atk > Sp. Atk. Type varies based on held Drive.",
		name: "Techno Blast (Base)",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			if (pokemon.ignoringItem()) return;
			move.type = this.runEvent('Drive', pokemon, undefined, move, 'Normal');
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Techno Blast", target);
		},
		secondary: undefined,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	technoblastfreezer: {
		num: 546,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		name: "Techno Blast (Freezer)",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Techno Blast", target);
		},
		secondary: undefined,
		target: "normal",
		type: "Ice",
		contestType: "Cool",
	},
	technoblastdelta: {
		num: 546,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "Physical if user's Atk > Sp. Atk. Inflicts Embargo and Heal Block onto the opponent.",
		name: "Techno Blast (Delta)",
		volatileStatus: 'embargo',
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Techno Blast", target);
		},
		secondary: {
			chance: 100,
			volatileStatus: 'healblock',
		},
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	primordialfrost: {
		num: 1001,
		accuracy: 90,
		basePower: 130,
		category: "Special",
		shortDesc: "Lowers the user's Sp. Atk by 2.",
		name: "Primordial Frost",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Max Hailstorm", target);
		},
		self: {
			boosts: {
				spa: -2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Cool",
	},
	desolatemagma: {
		num: 1002,
		accuracy: 85,
		basePower: 110,
		category: "Special",
		shortDesc: "Non Rock-type foes loose 1/16 HP of their max HP for 4 turns.",
		name: "Desolate Magma",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('desolatemagma');
			},
		},
		condition: {
			duration: 4,
			onStart(targetSide) {
				this.add('-sidestart', targetSide, 'Desolate Magma');
			},
			onResidualOrder: 5,
			onResidualSubOrder: 1.1,
			onResidual(targetSide) {
				for (const pokemon of targetSide.active) {
					if (!pokemon.hasType('Rock')) this.damage(pokemon.baseMaxhp / 16, pokemon);
				}
			},
			onSideEnd(targetSide) {
				for (const pokemon of targetSide.active) {
					if (!pokemon.hasType('Rock')) this.damage(pokemon.baseMaxhp / 16, pokemon);
				}
				this.add('-sideend', targetSide, 'Desolate Magma');
			},
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Magma Storm", target);
		},
		secondary: undefined,
		target: "normal",
		type: "Rock",
		contestType: "Cool",
	},
	snowstorm: {
		num: 1003,
		accuracy: 75,
		basePower: 100,
		category: "Special",
		shortDesc: "Traps and damages the target for 4-5 turns.",
		name: "Snowstorm",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon, target) {
			switch (target?.effectiveWeather()) {
			case 'hail':
				move.accuracy = true;
				break;
			case 'sunnyday':
			case 'desolateland':
				move.accuracy = 50;
				break;
			}
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Glacial Lance", target);
		},
		volatileStatus: 'partiallytrapped',
		secondary: undefined,
		target: "normal",
		type: "Ice",
		contestType: "Tough",
	},
	shadowforce: {
		num: 467,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "Goes through protection and doubles damage.",
		name: "Shadow Force",
		pp: 5,
		priority: 0,
		flags: {contact: 1, mirror: 1},
		onBasePower(basePower, source, target, move) {
			if (target.volatiles['protect']) {
				return this.chainModify(2);
			}
		},
		secondary: undefined,
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},
	dynamaxcannon: {
		num: 744,
		accuracy: 90,
		basePower: 100,
		category: "Special",
		shortDesc: "40% chance to lower the target's Special Defense by 1.",
		name: "Dynamax Cannon",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		secondary: {
			chance: 40,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Dragon",
	},
	eggbomb: {
		num: 1004,
		accuracy: 90,
		basePower: 100,
		category: "Special",
		shortDesc: "Restores the berry the user last used.",
		name: "Egg Bomb",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			onHit(source) {
				if (this.randomChance(1, 1)) {
					for (const pokemon of source.side.active) {
						if (!pokemon.item && pokemon.lastItem && this.dex.getItem(pokemon.lastItem).isBerry) {
							const item = pokemon.lastItem;
							pokemon.lastItem = '';
							this.add('-item', pokemon, this.dex.getItem(item), '[from] move: Egg Bomb');
							pokemon.setItem(item);
						}
					}
				}
			},
		},
		secondary: undefined,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	snarl: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.species.name === 'Linoone-Punk') {
				return move.basePower + 25;
			}
			return move.basePower;
		},
	},
	/*weatherball: {
		shortDesc: "If Catastroform, doubles in Power and changes typing when holding a Weather Rock.",
		inherit: true,
		onModifyType(move, pokemon) {
			if (pokemon.species.id !== 'catastroform') {
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
					move.type = 'Ice';
					break;
				}
			} else if (pokemon.species.id === 'catastroform') {
				if (pokemon.hasItem('heatrock')) {
					move.type = 'Fire';
				}
				if (pokemon.hasItem('damprock')) {
					move.type = 'Water';
				}
				if (pokemon.hasItem('icyrock')) {
					move.type = 'Ice';
				}
				if (pokemon.hasItem('smoothrock')) {
					move.type = 'Rock';
				}
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.species.id !== 'catastroform') {
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
					move.basePower *= 2;
					break;
				}
			} else if (pokemon.species.id === 'catastroform') {
				if (pokemon.hasItem('heatrock')) {
					move.basePower *= 2;
				}
				if (pokemon.hasItem('damprock')) {
					move.basePower *= 2;
				}
				if (pokemon.hasItem('icyrock')) {
					move.basePower *= 2;
				}
				if (pokemon.hasItem('smoothrock')) {
					move.basePower *= 2;
				}
			}
		},
		secondary: undefined,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Beautiful",
	},*/
	gathermaterials: {
		num: 1005,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Heals the user by 50% of its max HP.",
		name: "Gather Materials",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Heal Order", target);
		},
		secondary: undefined,
		target: "self",
		type: "Bug",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	coralcrash: {
		num: 1006,
		accuracy: 90,
		basePower: 110,
		category: "Physical",
		shortDesc: " Has 1/4 recoil. 10% chance to lower the target's Special Attack by 1.",
		name: "Coral Crash",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [1, 4],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Head Smash", target);
		},
		secondary: {
			chance: 10,
			boosts: {
				spa: -1,
			},
		},
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
	},
	relicsongmeloetta: {
		num: 547,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		shortDesc: "10% chance to sleep. Super effective on Steel.",
		name: "Relic Song (Meloetta)",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Steel') return 1;
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Relic Song", target);
		},
		secondary: {
			chance: 10,
			status: 'slp',
		},
		target: "allAdjacentFoes",
		type: "Fairy",
		contestType: "Beautiful",
	},
	rockyslash: {
		num: 1007,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			return move.basePower + 20 * pokemon.boosts['atk'];
		},
		category: "Physical",
		shortDesc: "+ 20 power for each of the user's Attack boosts.",
		name: "Rocky Slash",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sacred Sword", target);
		},
		secondary: undefined,
		target: "normal",
		type: "Rock",
	},
	boilingvortex: {
		num: 1008,
		accuracy: 95,
		basePower: 95,
		category: "Special",
		shortDesc: "Ignores Desolate Land and removes Sunny Day.",
		name: "Boiling Vortex",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(move, pokemon) {
			if (this.field.isWeather('sunnyday')) {
				this.field.clearWeather();
			}
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Whirlpool", target);
		},
		secondary: undefined,
		target: "normal",
		type: "Water",
	},
	seethingsauna: {
		num: 1009,
		accuracy: 95,
		basePower: 95,
		category: "Special",
		shortDesc: "Ignores Primordial Sea and removes Rain Dance.",
		name: "Seething Sauna",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(move, pokemon) {
			if (this.field.isWeather('raindance')) {
				this.field.clearWeather();
			}
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Scald", target);
		},
		secondary: undefined,
		target: "normal",
		type: "Fire",
	},
	stockpile: {
		inherit: true,
		volatileStatus: 'stockpile',
		condition: {
			noCopy: true,
			onStart(target) {
				let layers = 1;
				if (target.hasAbility('pulpup')) {
					if (target.hp / target.maxhp <= 0.667) {
						layers = 2;
					}
					if (target.hp / target.maxhp <= 0.334) {
						layers = 3;
					}
				}
				this.effectData.layers = layers;
				this.effectData.def = 0;
				this.effectData.spd = 0;
				this.add('-start', target, 'stockpile' + this.effectData.layers);
				const [curDef, curSpD] = [target.boosts.def, target.boosts.spd];
				this.boost({def: layers, spd: layers}, target, target);
				for (let i = 0; i < layers; i++) {
					if (curDef !== target.boosts.def) this.effectData.def--;
					if (curSpD !== target.boosts.spd) this.effectData.spd--;
				}
			},
			onRestart(target) {
				if (this.effectData.layers >= 3) return false;
				this.effectData.layers++;
				this.add('-start', target, 'stockpile' + this.effectData.layers);
				const curDef = target.boosts.def;
				const curSpD = target.boosts.spd;
				this.boost({def: 1, spd: 1}, target, target);
				if (curDef !== target.boosts.def) this.effectData.def--;
				if (curSpD !== target.boosts.spd) this.effectData.spd--;
			},
			onEnd(target) {
				if (this.effectData.def || this.effectData.spd) {
					const boosts: SparseBoostsTable = {};
					if (this.effectData.def) boosts.def = this.effectData.def;
					if (this.effectData.spd) boosts.spd = this.effectData.spd;
					this.boost(boosts, target, target);
				}
				this.add('-end', target, 'Stockpile');
			},
		},
	},
	feast: {
		num: 1010,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Boost Atk. and Sp. Atk. depending on Stockpile amount.",
		name: "Feast",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		onTry(source) {
			return !!source.volatiles['stockpile'];
		},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('stockpile');
		},
		onHit(pokemon) {
			if (!pokemon.volatiles['stockpile'] || !pokemon.volatiles['stockpile'].layers) return false;
			const layers = pokemon.volatiles['stockpile'].layers;
			this.boost({atk: layers, spa: layers});
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Stockpile", target);
		},
		secondary: undefined,
		target: "self",
		type: "Normal",
	},
	gulpmissile: {
		num: 1011,
		accuracy: 100,
		basePower: 90,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.species.id === 'cramorant' && !target.newlySwitched || !this.queue.willMove(target)) {
				return move.basePower * 1.5;
			}
			return move.basePower;
		},
		category: "Special",
		shortDesc: "Cramorant: 1.5x power; Swimmer: Summons rain, when moves last.",
		name: "Gulp Missile",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1},
		secondary: undefined,
		self: {
			onHit(source, target) {
				if (source.species.id !== 'cramorantswimmer') return;
				if (!target.newlySwitched || !this.queue.willMove(target)) {
					this.field.setWeather('raindance');
				}
			},
		},
		target: "normal",
		type: "Flying",
	},
	oilslick: {
		num: 1012,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "User switches out after damaging the target.",
		name: "Oilslick",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		selfSwitch: true,
		secondary: undefined,
		target: "normal",
		type: "Poison",
	},
	lightblast: {
		num: 1013,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "Uses user's SpD stat as SpA in damage calculation.",
		name: "Light Blast",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		useSourceDefensiveAsOffensive: true,
		secondary: undefined,
		target: "normal",
		type: "Fairy",
	},
	aurawheel: {
		num: 783,
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		shortDesc: "Raises the user's Speed by 1. Alternates between Electric and Poison every turn.",
		name: "Aura Wheel",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyType(move, pokemon) {
			const types = ["Electric", "Poison"];
			move.type = types[(pokemon.activeTurns - 1) % 2];
			this.add('-message', "Type Change: " + move.type);
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
		type: "Electric",
	},
	thousandarrows: {
		num: 614,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		shortDesc: "Hits 3-6 times in one turn. Grounds adjacent foes.",
		name: "Thousand Arrows",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		multihit: [3, 6],
		onEffectiveness(typeMod, target, type, move) {
			if (move.type !== 'Ground') return;
			if (!target) return; // avoid crashing when called from a chat plugin
			// ignore effectiveness if the target is Flying type and immune to Ground
			if (!target.runImmunity('Ground')) {
				if (target.hasType('Flying')) return 0;
			}
		},
		volatileStatus: 'smackdown',
		ignoreImmunity: {'Ground': true},
		secondary: undefined,
		target: "allAdjacentFoes",
		type: "Ground",
		zMove: {basePower: 180},
		contestType: "Beautiful",
	},
	thousandwaves: {
		num: 463,
		accuracy: 75,
		basePower: 100,
		category: "Special",
		shortDesc: "Traps and damages the target for 4-5 turns.",
		name: "Thousand Waves",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'partiallytrapped',
		secondary: undefined,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	landswrath: {
		num: 616,
		accuracy: 95,
		basePower: 120,
		category: "Physical",
		shortDesc: "User recovers 50% of the damage dealt.",
		name: "Land's Wrath",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1, heal: 1},
		drain: [1, 2],
		secondary: undefined,
		target: "allAdjacentFoes",
		type: "Ground",
		contestType: "Beautiful",
	},
};
