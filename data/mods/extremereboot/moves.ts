export const Moves: {[k: string]: ModdedMoveData} = {
	// Coded
	"25recorders": {
		name: "25 Recorders",
		accuracy: 85,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Manmade",
		shortDesc: "Inflicts Fear on the target.(Sound)",
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1},
		status: 'fer',
		target: "normal",
		secondary: null,
	},
	// Coded
	abyssalslash: {
		name: "Abyssal Slash",
		accuracy: 90,
		basePower: 80,
		category: "Physical",
		pp: 10,
		type: "Night",
		shortDesc: "20% chance to lower Defense by 1 stage(Contact)",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
	},
	// Coded
	aftershock: {
		name: "Aftershock",
		accuracy: 100,
		basePower: 80,
		category: "Special",
		pp: 10,
		type: "Earth",
		shortDesc: "Strikes 2 turns after being used.",
		priority: 0,
		flags: {},
		ignoreImmunity: true,
		isFutureMove: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'aftershock',
				source: source,
				moveData: {
					id: 'aftershock',
					name: "Aftershock",
					accuracy: 100,
					basePower: 80,
					category: "Special",
					priority: 0,
					flags: {},
					ignoreImmunity: false,
					effectType: 'Move',
					isFutureMove: true,
					type: 'Earth',
				},
			});
			this.add('-start', source, 'move: Aftershock');
			return null;
		},
		target: "normal",
		secondary: null,
	},
	// Coded
	alldayharvest: {
		name: "All-Day Harvest",
		accuracy: 100,
		basePower: 110,
		category: "Special",
		pp: 5,
		type: "Autumn",
		shortDesc: "Inflicts Sunburn on the user.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
			self: {
				status: 'brn',
			},
		},
	},
	// Coded
	alphabetsoup: {
		name: "Alphabet Soup",
		accuracy: 95,
		basePower: 0,
		category: "Special",
		pp: 40,
		type: "Sea",
		shortDesc: "Hits 2-5 times. Power depends on the first letter of the target's name.",
		basePowerCallback(pokemon, target, move) {
			const lowerCode = [97, 122];
			const upperCode = [65, 90];
			let basePower = 1;
			const unicode = target.name.charCodeAt(0);
			if (unicode >= lowerCode[0] && unicode <= lowerCode[1]) {
				basePower = unicode - (lowercode[0] - 1);
			} else if (unicode >= upperCode[0] && unicode <= upperCode[1]) {
				basePower = unicode - (lowercode[1] - 1);
			} else {
				basePower = 27;
			}
			console.log(basePower);
			return basePower;
		},
		priority: 0,
		multihit: [2,5],
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	arcticblast: {
		name: "Arctic Blast",
		accuracy: 70,
		basePower: 110,
		category: "Special",
		pp: 10,
		type: "Winter",
		shortDesc: "30% chance to inflict Chill on the target. Becomes perfectly accurate in Snow.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
			chance: 30,
			status:'frz',
		},
	},
	// Coded
	aridabsorption: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Heals by 33% of its max HP +33% and +1 Atk for every active Sea-type. Sea types lose 33%.",
		name: "Arid Absorption",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
 		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Shore Up", target);
		},
		self: {
			onHit(pokemon, source, move) {
				this.heal(source.baseMaxhp / 3, source, pokemon);
			}
		},
		onHitField(target, source) {
			if (target.hasType('Sea')) {
				this.heal(source.baseMaxhp / 3, source, target);
				this.boost({atk: 1}, source);
				this.damage(target.baseMaxhp / 3, target, source);
			}
			if (source.hasType('Sea')) {
				this.heal(source.baseMaxhp / 3, source, target);
				this.boost({atk: 1}, source);
				this.damage(source.baseMaxhp / 3, source, target);
			}
		},
		type: "Summer",
		shortDesc: "Restores 33% of the user's max health. Restores an additional 33% and raises the user's attack one stage for each Sea type on the field. Each Sea type on the field loses 33% max health.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "all",
		secondary: null,
	},
	// Coded
	astralascent: {
		name: "Astral Ascent",
		accuracy: 100,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Serenity",
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('endure');
			pokemon.addVolatile('magiccoat');
		},
		onHit(target, source) {
			let b: BoostName;
			let negBoosts = {};
			for (b in source.boosts) {
				if (source.boosts[b] < 0) negBoosts[b] = source.boosts[b] * -1;
			}
			if (negBoosts !== {}) this.boost(negBoosts, source);
			this.heal(source.baseMaxhp - source.hp, source, source);
			source.cureStatus();
			source.addVolatile('mustrecharge');
		},
		volatileStatus: 'astralascent',
		condition: {
			duration: 2,
			onSetStatus(status, target, source, effect) {
				if (!effect || !source) return;
				if (effect.id === 'yawn') return;
				if (effect.effectType === 'Move' && effect.infiltrates && target.side !== source.side) return;
				if (target !== source) {
					this.debug('interrupting setStatus');
					if (effect.effectType === 'Move' && !effect.secondaries) {
						this.add('-activate', target, 'move: Astral Ascent');
					}
					return null;
				}
			},
		},
		shortDesc: "Endure + Magic Coat + restores HP, status, and stat drops + 2 turn Safeguard. Must recharge next turn.",
		priority: 0,
		flags: {recharge: 1},
		target: "self",
		secondary: null,
	},
	// Coded
	balanceout: {
		name: "Balance Out",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 15,
		type: "Serenity",
		shortDesc: "Removes all stat changes from the user and the target.",
		priority: 0,
		flags: {authentic: 1},
		onHitField() {
			this.add('-clearallboost');
			for (const pokemon of this.getAllActive()) {
				pokemon.clearBoosts();
			}
		},
		target: "all",
		secondary: null,
	},
	// Coded
	bananasplit: {
		name: "Banana Split",
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		pp: 30,
		type: "Summer",
		shortDesc: "No additional effect.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	barefruit: {
		name: "Bare Fruit",
		accuracy: 100,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Spring",
		shortDesc: "Plants a seed which growths after two turns and boosts users Attack and Special Attack by one stage.",
		priority: 0,
		flags: {},
		ignoreImmunity: true,
		isFutureMove: true,
		onTry(source, target) {
			if (!source.side.addSlotCondition(source, 'futuremove')) return false;
			Object.assign(source.side.slotConditions[source.position]['futuremove'], {
				duration: 3,
				move: 'barefruit',
				source: source,
				moveData: {
					id: 'barefruit',
					name: "Bare Fruit",
					accuracy: true,
					category: "Status",
					priority: 0,
					flags: {},
					ignoreImmunity: true,
					boosts: {
						atk: 1,
						spa: 1,
					},
					effectType: 'Move',
					isFutureMove: true,
					type: 'Normal',
				},
			});
			this.add('-start', source, 'move: Bare Fruit');
			return null;
		},
		secondary: null,
		target: "self",
	},
	// Coded
	beachball: {
		name: "Beach Ball",
		accuracy: 90,
		basePower: 30,
		basePowerCallback(pokemon, target, move) {
			let bp = move.basePower;
			if (pokemon.volatiles['beachball'] && pokemon.volatiles['beachball'].hitCount) {
				bp *= Math.pow(2, pokemon.volatiles['beachball'].hitCount);
			}
			if (pokemon.status !== 'slp') pokemon.addVolatile('beachball');
			// if (pokemon.volatiles['defensecurl']) {
				// bp *= 2;
			// }
			return bp;
		},
		category: "Physical",
		pp: 10,
		type: "Summer",
		shortDesc: "Power doubles with each hit. Repeats for 5 turns. Contact.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		condition: {
			duration: 2,
			onLockMove: 'rollout',
			onStart() {
				this.effectData.hitCount = 1;
			},
			onRestart() {
				this.effectData.hitCount++;
				if (this.effectData.hitCount < 5) {
					this.effectData.duration = 2;
				}
			},
			onResidual(target) {
				if (target.lastMove && target.lastMove.id === 'struggle') {
					// don't lock
					delete target.volatiles['rollout'];
				}
			},
		},
		unviable: true,
		target: "normal",
		secondary: null,
	},
	// Coded and Tested
	beachday: {
		name: "Beach Day",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Summer",
		shortDesc: "Heals 50% of Max HP when used. Also inflicts Sunburn to user.",
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		target: "self",
		secondary: {
			status: "brn",
		},
	},
	// Coded
	bindingblade: {
		name: "Binding Blade",
		accuracy: 85,
		basePower: 75,
		category: "Physical",
		pp: 5,
		type: "Manmade",
		shortDesc: "Traps and damages the target for 4-5 turns",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		volatileStatus: 'partiallytrapped',
		target: "normal",
		secondary: null,
	},
	// Coded
	bindingflame: {
		name: "Binding Flame",
		accuracy: 100,
		basePower: 70,
		category: "Special",
		pp: 15,
		type: "Summer",
		shortDesc: "Inflicts Curse on the user.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
			self: {
				status: 'crs',
			},
		},
	},
	// Coded
	blasphemy: {
		name: "Blasphemy",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 5,
		type: "Serenity",
		boosts: {
			atk: 4,
		},
		shortDesc: "Gain +4 Attack. If the user is active at the end of the next turn, they faint (a la Perish Song reaching 0).",
		priority: 0,
		volatileStatus: "blasphemy",
		condition: {
			duration: 2,
			onEnd(target) {
				this.add('-start', target, 'perish0');
				target.faint();
			},
			onResidualOrder: 20,
			onResidual(pokemon) {
				const duration = pokemon.volatiles['blasphemy'].duration;
				this.add('-start', pokemon, 'perish' + duration);
			},
		},
		flags: {protect: 1, mirror: 1},
		target: "self",
		secondary: null,
	},
	// Coded and Tested
	blindsteal: {
		name: "Blind Steal",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 20,
		type: "Night",
		shortDesc: "The user and opponent switch items.",
		// onTryImmunity(target) {
			// return !target.hasAbility('stickyhold');
		// },
		onHit(target, source, move) {
			const yourItem = target.takeItem(source);
			const myItem = source.takeItem();
			if (target.item || source.item || (!yourItem && !myItem)) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				return false;
			}
			if (
				(myItem && !this.singleEvent('TakeItem', myItem, source.itemData, target, source, move, myItem)) ||
				(yourItem && !this.singleEvent('TakeItem', yourItem, target.itemData, source, target, move, yourItem))
			) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				return false;
			}
			this.add('-activate', source, 'move: Trick', '[of] ' + target);
			if (myItem) {
				target.setItem(myItem);
				this.add('-item', target, myItem, '[from] move: Trick');
			} else {
				this.add('-enditem', target, yourItem, '[silent]', '[from] move: Trick');
			}
			if (yourItem) {
				source.setItem(yourItem);
				this.add('-item', source, yourItem, '[from] move: Trick');
			} else {
				this.add('-enditem', source, myItem, '[silent]', '[from] move: Trick');
			}
			target.m.cursedOrbHolder = "broken";
			source.m.cursedOrbHolder = "broken";
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	blizzard: {
		name: "Blizzard",
		accuracy: 100,
		basePower: 90,
		category: "Special",
		pp: 10,
		type: "Storm",
		shortDesc: "Combines Winter-type in its type effectiveness.",
		onTryImmunity(target) {
			return !target.hasType("Spring");
		},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Winter', type);
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	blizzarifreeze: {
		name: "Blizzari Freeze",
		accuracy: 85,
		basePower: 110,
		category: "Special",
		pp: 5,
		type: "Winter",
		shortDesc: "40% chance to inflict Chill.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
			chance: 40,
			status: 'frz',
		},
	},
	// Coded
	blossomout: {
		name: "Blossom Out",
		accuracy: 100,
		basePower: 70,
		category: "Special",
		pp: 10,
		type: "Spring",
		selfSwitch: true,
		shortDesc: "Switches the user out",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	bodybash: {
		name: "Body Bash",
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		pp: 15,
		type: "Typeless",
		shortDesc: "No additional effect. Makes contact.",
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	borealis: {
		name: "Borealis",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Sky",
		shortDesc: "The user restores 1/2 of its maximum HP, rounded half down. If the user has Sunburn, it is cured.",
		priority: 0,
		onHit(target, source, move){
			if (source.status === 'brn') source.cureStatus();
		},
		flags: {protect: 1, mirror: 1, heal: 1},
		target: "self",
		heal: [1,2],
		secondary: null,
	},
	// Coded
	boringfable: {
		name: "Boring Fable",
		accuracy: 100,
		basePower: 85,
		category: "Special",
		pp: 20,
		type: "Folklore",
		shortDesc: "If the target is Manmade and isn't Night, it is put to Sleep.",
		onTryHit(target, source) {
			if (target.hasType("Manmade")) {
				target.trySetStatus("slp", source);
				return false;
			}
		},
		ignoreImmunity: true,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	boulder: {
		name: "Boulder",
		accuracy: 90,
		basePower: 30,
		basePowerCallback(pokemon, target, move) {
			let bp = move.basePower;
			if (pokemon.volatiles['boulder'] && pokemon.volatiles['boulder'].hitCount) {
				bp *= Math.pow(2, pokemon.volatiles['boulder'].hitCount);
			}
			if (pokemon.status !== 'slp') pokemon.addVolatile('boulder');
			if (pokemon.volatiles['defensecurl']) {
				bp *= 2;
			}
			this.debug("Rollout bp: " + bp);
			return bp;
		},
		category: "Physical",
		pp: 20,
		type: "Earth",
		shortDesc: "Works like Rollout",
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		condition: {
			duration: 2,
			onLockMove: 'boulder',
			onStart() {
				this.effectData.hitCount = 1;
			},
			onRestart() {
				this.effectData.hitCount++;
				if (this.effectData.hitCount < 5) {
					this.effectData.duration = 2;
				}
			},
			onResidual(target) {
				if (target.lastMove && target.lastMove.id === 'struggle') {
					// don't lock
					delete target.volatiles['boulder'];
				}
			},
		},
		secondary: null,
		target: "normal",
		unviable: true,
	},
	// Coded
	bramblewhip: {
		name: "Bramble Whip",
		accuracy: 85,
		basePower: 35,
		category: "Special",
		pp: 15,
		type: "Earth",
		shortDesc: "Traps the target for 4-5 turns and deals 1/8th residual damage. Deals 1/6th under rose field.",
		volatileStatus: 'bramblewhip',
		condition: {
			duration: 5,
			durationCallback(target, source) {
				return this.random(5, 7);
			},
			onStart(pokemon, source) {
				this.add('-activate', pokemon, 'move: ' + this.effectData.sourceEffect, '[of] ' + source);
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				const source = this.effectData.source;
				const boundDivisor = this.field.isTerrain('rosefield') ? 6 : 8;
				if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns)) {
					delete pokemon.volatiles['partiallytrapped'];
					this.add('-end', pokemon, this.effectData.sourceEffect, '[partiallytrapped]', '[silent]');
					return;
				}
				this.damage(pokemon.baseMaxhp / boundDivisor);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, this.effectData.sourceEffect, '[partiallytrapped]');
			},
			onTrapPokemon(pokemon) {
				if (this.effectData.source?.isActive) pokemon.tryTrap();
			},
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	brazenbash: {
		name: "Brazen Bash",
		accuracy: 100,
		basePower: 0,
		category: "Status",
		pp: 20,
		type: "Summer",
		shortDesc: "Drops the target's defensive stats by 1 stage each and the user switches out.",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, reflectable: 1},
		onHit(target, source, move) {
			const success = this.boost({def: -1, spd: -1}, target, source);
			if (!success) {
				delete move.selfSwitch;
			}
		},
		selfSwitch: true,
		target: "normal",
		secondary: null,
	},
	// Coded
	brightascent: {
		name: "Bright Ascent",
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		pp: 10,
		type: "Sky",
		shortDesc: "Charges turn 1. Hits turn 2. No charge in sunlight.",
		priority: 0,
		flags: {contact: 1, charge: 1, protect: 1, mirror: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (['highnoon'].includes(attacker.effectiveWeather())) {
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
		target: "normal",
		secondary: null,
	},
	// Coded
	bubblepunch: {
		name: "Bubble Punch",
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		pp: 30,
		type: "Sea",
		shortDesc: "No additional effect.",
		priority: 0,
		flags: {contact: 1, punch: 1, protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	cascade: {
		name: "Cascade",
		accuracy: 100,
		basePower: 90,
		category: "Special",
		pp: 15,
		type: "Sea",
		shortDesc: "10% chance to lower the target's Sp. Defene stat.",
		priority: 0,
		secondary: {
			boosts: {
				chance: 10,
				spd: -1,
			}
		},
		flags: {protect: 1, mirror: 1},
		target: "normal",
	},
	// Coded
	cataclysm: {
		name: "Cataclysm",
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		pp: 5,
		type: "Storm",
		shortDesc: "Non-contact. Hits all adjacent Pokemon. Lowers the user's Def and SpD by 1 stage.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		target: "allAdjacentFoes",
		secondary: null,
	},
	// Coded
	chaosmoon: {
		name: "Chaos Moon",
		accuracy: 100,
		basePower: 100,
		category: "Special",
		pp: 10,
		type: "Night",
		shortDesc: "Combines Storm in its type effectiveness.",
		onTryImmunity(target) {
			return !target.hasType("Serenity");
		},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Storm', type);
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	cherryblossom: {
		name: "Cherry Blossom",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Spring",
		shortDesc: "Heals the user by 50% of its max HP. Resets the user's lowered stat changes.",
		onHit(target, source, move){
			let b: BoostName;
			let negBoosts = {};
			for (b in source.boosts) {
				if (source.boosts[b] < 0) negBoosts[b] = source.boosts[b] * -1;
			}
			if (negBoosts !== {}) this.boost(negBoosts, source);
		},
		priority: 0,
		heal: [1,2],
		flags: {protect: 1, mirror: 1, heal: 1},
		target: "self",
		secondary: null,
	},
	// Coded
	chillingbreeze: {
		name: "Chilling Breeze",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Winter",
		shortDesc: "Causes the target to have its Attack or Special Attack drop by two stages. (chosen randomly)",
		onHit(target, source) {
			const r = this.random(2);
			if (r === 0) this.boost({atk: -2});
			if (r === 1) this.boost({spa: -2});
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, reflectable: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	ciderpress: {
		name: "Cider Press",
		accuracy: 100,
		basePower: 40,
		category: "Special",
		pp: 10,
		type: "Autumn",
		shortDesc: "Heals the user by 2x the damage dealt.",
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1, contact: 1},
		drain: [2, 1],
		target: "normal",
		secondary: null,
	},
	// Coded
	closeencounter: {
		name: "Close Encounter",
		accuracy: 100,
		basePower: 80,
		category: "Special",
		pp: 10,
		type: "Folklore",
		shortDesc: "30% chance to Poison the target.",
		secondary: {
			chance: 30,
			status: "psn",
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
	},
	// Coded
	cloudcall: {
		name: "Cloud Call",
		accuracy: 100,
		basePower: 100,
		category: "Special",
		pp: 10,
		type: "Storm",
		shortDesc: "20% chance to inflict fear, hits two opponents, sound.",
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1},
		target: "allAdjacentFoes",
		secondary: {
			chance: 20,
			status: "fer",
		},
	},
	// Coded
	coconutbomb: {
		name: "Coconut Bomb",
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		pp: 10,
		type: "Earth",
		recoil: [25, 100],
		shortDesc: "User takes 1/4 damage as recoil.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	coldstare: {
		name: "Cold Stare",
		accuracy: 90,
		basePower: 0,
		category: "Status",
		pp: 20,
		type: "Winter",
		shortDesc: "Inflicts chill on the target. Has 101% acc if used by a Winter-type.",
		priority: 0,
		flags: {protect: 1, mirror: 1, reflectable: 1},
		target: "normal",
		secondary: null,
		status: 'frz',
	},
	// Coded
	conifercrash: {
		name: "Conifer Crash",
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		pp: 15,
		type: "Autumn",
		shortDesc: "User recieves 1/3 of the damage it inflicted in recoil. Makes contact.",
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [33, 100],
		priority: 0,
		target: "normal",
		secondary: null,
	},
	// Coded
	coralcover: {
		name: "Coral Cover",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Sea",
		shortDesc: "Priority +4. Protects the user. Attackers making contact lose 1/8 Max HP.",
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'coralcover',
		onTryHit(target, source, move) {
			return !!this.queue.willAct() && this.runEvent('StallMove', target);
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
				if (move.flags['contact'] && move.id !== 'wildpunch') {
					this.damage(source.baseMaxhp / 8, source, target);
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && move.flags['contact'] && move.id !== 'wildpunch') {
					this.damage(source.baseMaxhp / 8, source, target);
				}
			},
		},
		secondary: null,
		target: "self",
	},
	// Coded
	cottonfield: {
		name: "Cotton Field",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Spring",
		shortDesc: "1/16 Dmg except Storm or Winter. -2 Eva. Blocks curses.",
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'cottonfield',
		condition: {
			duration: 0,
			onSwitchIn(pokemon) {
				if (pokemon.hasType("Winter") || pokemon.hasType("Storm")) return;
				if (pokemon.hasAbility("fluffyfloat")) return;
				this.boost({evasion: -2}, pokemon, this.effectData.source, this.dex.getActiveMove('cottonfield'));
				this.damage(pokemon.maxhp / 16);
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Cotton Field', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Cotton Field');
				}
			},
			onEnd() {
				if (!this.effectData.duration) this.eachEvent('Terrain');
				this.add('-fieldend', 'move: Cotton Field');
			},
		},
		secondary: null,
		target: "all",
	},
	// Coded
	cracklingmountain: {
		name: "Crackling Mountain",
		accuracy: 100,
		basePower: 60,
		category: "Special",
		pp: 10,
		type: "Folklore",
		shortDesc: "A second hit at the end of the next turn, where the second hit's base power is doubled.",
		onHit(target, source, move) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 2,
				move: 'cracklingmountain',
				source: source,
				moveData: {
					id: 'cracklingmountain',
					name: "Crackling Mountain",
					accuracy: 100,
					basePower: 120,
					category: "Special",
					priority: 0,
					flags: {},
					ignoreImmunity: false,
					effectType: 'Move',
					isFutureMove: true,
					type: 'Folklore',
				},
			});
			this.add('-start', source, 'move: Crackling Mountain');
			return null;
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	creepclaw: {
		name: "Creep Claw",
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		pp: 15,
		type: "Night",
		shortDesc: "10% chance to afflict fear.",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: {
			chance: 10,
			status: 'fer',
		},
	},
	// Coded
	cricketstune: {
		name: "Cricket's Tune",
		accuracy: 100,
		basePower: 15,
		category: "Special",
		pp: 35,
		type: "Night",
		shortDesc: "20% Chance of inflicting Sleep on the target (Sound)",
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1},
		target: "normal",
		secondary: {
			chance: 20,
			status: 'slp',
		},
		unviable: true,
	},
	// Coded
	curseblade: {
		name: "Curse Blade",
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		pp: 15,
		type: "Folklore",
		shortDesc: "50% chance to curse foe.",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: {
			chance: 50,
			status: 'crs',
		},
	},
	// Coded
	cut: {
		name: "Cut",
		accuracy: 90,
		basePower: 50,
		category: "Physical",
		pp: 20,
		type: "Manmade",
		shortDesc: "Always results in a critical hit.",
		critRatio: 4,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	cycloneshield: {
		name: "Cyclone Shield",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Storm",
		shortDesc: "Protects user. If hit by a special attack, +1 Atk and SpA.",
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'cycloneshield',
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
				if (!move.flags['protect']) {
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
				if (move.category === "Special") {
					this.boost({atk: 1, spa: 1}, target, target, this.dex.getActiveMove("Cyclone Shield"));
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && move.flags['contact']) {
					this.boost({atk: -1}, source, target, this.dex.getActiveMove("Cyclone Shield"));
				}
			},
		},
		target: "self",
		secondary: null,
	},
	// Coded
	daisychain: {
		name: "Daisy Chain",
		accuracy: 75,
		basePower: 100,
		category: "Special",
		pp: 5,
		type: "Spring",
		shortDesc: "Traps the opponent for 4-5 turns. The opponent loses 1/10 HP at the end of each turn.",
		volatileStatus: 'partiallytrapped',
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	dawneve: {
		name: "Dawn Eve",
		accuracy: 100,
		basePower: 0,
		category: "Status",
		pp: 40,
		type: "Night",
		shortDesc: "Traps the target until the end of the next turn.",
		priority: 0,
		flags: {mirror: 1, authentic: 1, reflectable: 1},
		pseudoWeather: 'dawneve',
		condition: {
			duration: 2,
			onStart(target) {
				this.add('-fieldactivate', 'move: Dawn Eve');
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
		},
		secondary: null,
		target: "all",
	},
	// Coded
	decoy: {
		name: "Decoy",
		accuracy: 100,
		basePower: 0,
		category: "Status",
		pp: 20,
		type: "Manmade",
		shortDesc: "The user creates a Substitute in exchange for 1/4th of its max HP.",
		priority: 0,
		flags: {snatch: 1, nonsky: 1},
		volatileStatus: 'decoy',
		onTryHit(target) {
			if (target.volatiles['decoy']) {
				this.add('-fail', target, 'move: Decoy');
				return null;
			}
			if (target.hp <= target.maxhp / 4 || target.maxhp === 1) { // Shedinja clause
				this.add('-fail', target, 'move: Decoy', '[weak]');
				return null;
			}
		},
		onHit(target) {
			this.directDamage(target.maxhp / 4);
		},
		condition: {
			onStart(target) {
				this.add('-start', target, 'Decoy');
				this.effectData.hp = Math.floor(target.maxhp / 4);
				if (target.volatiles['partiallytrapped']) {
					this.add('-end', target, target.volatiles['partiallytrapped'].sourceEffect, '[partiallytrapped]', '[silent]');
					delete target.volatiles['partiallytrapped'];
				}
			},
			onTryPrimaryHitPriority: -1,
			onTryPrimaryHit(target, source, move) {
				if (target === source || move.flags['authentic'] || move.infiltrates) {
					return;
				}
				let damage = this.getDamage(source, target, move);
				if (!damage && damage !== 0) {
					this.add('-fail', source);
					this.attrLastMove('[still]');
					return null;
				}
				damage = this.runEvent('SubDamage', target, source, move, damage);
				if (!damage) {
					return damage;
				}
				if (damage > target.volatiles['decoy'].hp) {
					damage = target.volatiles['decoy'].hp as number;
				}
				target.volatiles['decoy'].hp -= damage;
				source.lastDamage = damage;
				if (target.volatiles['decoy'].hp <= 0) {
					target.removeVolatile('decoy');
				} else {
					this.add('-activate', target, 'move: Decoy', '[damage]');
				}
				if (move.recoil) {
					this.damage(this.calcRecoilDamage(damage, move), source, target, 'recoil');
				}
				if (move.drain) {
					this.heal(Math.ceil(damage * move.drain[0] / move.drain[1]), source, target, 'drain');
				}
				this.singleEvent('AfterSubDamage', move, null, target, source, move, damage);
				this.runEvent('AfterSubDamage', target, source, move, damage);
				return this.HIT_SUBSTITUTE;
			},
			onEnd(target) {
				this.add('-end', target, 'Decoy');
			},
		},
		secondary: null,
		target: "self",
	},
	// Coded
	deepbreath: {
		name: "Deep Breath",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 20,
		type: "Typeless",
		shortDesc: "Heals the user for 1/4th of its max HP.",
		heal: [1,4],
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	demonparade: {
		name: "Demon Parade",
		accuracy: 100,
		basePower: 80,
		category: "Special",
		pp: 10,
		type: "Folklore",
		shortDesc: "Manmade Pokemon receive Curse instead if hit by this move.",
		onTryHit(target, source) {
			if (target.hasType("Manmade")){
				target.trySetStatus("crs");
				return false;
			}
		},
		ignoreImmunity: true,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	demonicfury: {
		name: "Demonic Fury",
		accuracy: 80,
		basePower: 50,
		category: "Physical",
		pp: 10,
		type: "Folklore",
		shortDesc: "Hits twice. Has a boosted critical hit ratio. (Contact)",
		multihit: 2,
		critRatio: 2,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	dewshower: {
		name: "Dew Shower",
		accuracy: 95,
		basePower: 60,
		category: "Special",
		pp: 15,
		type: "Spring",
		shortDesc: "Lowers the target's Speed by 1 stage.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		unviable: true,
	},
	// Coded
	divebomb: {
		name: "Dive Bomb",
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		pp: 10,
		type: "Sky",
		useSourceSpeedAsOffensive: true,
		shortDesc: "Uses Speed on calculating damage (instead of attack), Contact",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	dormantpower: {
		name: "Dormant Power",
		accuracy: 100,
		basePower: 100,
		category: "Special",
		pp: 10,
		ignoreImmunity: true,
		isFutureMove: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 0,
				move: 'dormantpower',
				source: source,
				position: target.position,
				moveData: {
					id: 'dormantpower',
					name: "Dormant Power",
					accuracy: 100,
					basePower: 100,
					category: "Special",
					priority: 0,
					flags: {},
					ignoreImmunity: false,
					effectType: 'Move',
					isFutureMove: true,
					type: 'Autumn',
				},
			});
			this.add('-start', source, 'move: Dormant Power');
			return null;
		},
		type: "Autumn",
		shortDesc: "Hits 3 turns after being used. Timer will remain at 1 if a Winter pokemon is on the field.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	doubledab: {
		name: "Double Dab",
		accuracy: true,
		basePower: 5,
		category: "Physical",
		pp: 40,
		type: "Typeless",
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 2,
		shortDesc: "Hits 2 times. Does not check accuracy. Makes contact.",
		priority: 0,
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	drainingroots: {
		name: "Draining Roots",
		accuracy: 100,
		basePower: 75,
		category: "Special",
		pp: 10,
		type: "Earth",
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [3, 4],
		shortDesc: "User restores 75% of the damage dealt to the target.",
		priority: 0,
		target: "normal",
		secondary: null,
	},
	// Coded
	drillpiercer: {
		name: "Drill Piercer",
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		pp: 20,
		type: "Earth",
		shortDesc: "This move is supereffective against Sky-types.",
		ignoreImmunity: {'Earth': true},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Sky') return 1;
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	dystopiareversal: {
		name: "Dystopia Reversal",
		accuracy: 100,
		basePower: 0,
		category: "Status",
		pp: 20,
		type: "Folklore",
		shortDesc: "Removes Manmade type from foe. If foe was Manmade type, poisons it.",
		onTryMove(pokemon, target, move) {
			if (target.hasType('Manmade')) return;
			this.add('-fail', pokemon, 'move: Dystopia Reversal');
			this.attrLastMove('[still]');
			return null;
		},
		onHit(pokemon) {
			pokemon.setType(pokemon.getTypes(true).map(type => type === "Manmade" ? "???" : type));
			this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] move: Dystopia Reversal');
			pokemon.trySetStatus("psn");
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, reflectable: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	earthbump: {
		name: "Earth Bump",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 40,
		type: "Earth",
		shortDesc: "Has +1 Priority. Upon using the move the message 'But nothing happened.' is displayed",
		priority: 1,
		onTryHit(target, source) {
			this.add('-nothing');
		},
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	earthquake: {
		name: "Earthquake",
		accuracy: 100,
		basePower: 100,
		category: "Special",
		pp: 10,
		type: "Earth",
		shortDesc: "Hits all adjacent targets.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "allAdjacentFoes",
		secondary: null,
	},
	// Coded
	eeriebargain: {
		name: "Eerie Bargain",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 5,
		type: "Folklore",
		shortDesc: "Raises all stats by 1 (except acc/eva). Inflicts user with Fear, curing itself of any other non-volatile status condition in the process. Traps user for 5 turns.",
		onTryHit(target, source,) {
			if (source.volatiles['eeriebargain']) return false;
		},
		condition: {
			duration: 5,
			durationCallback(target, source) {
				if (source?.hasItem('trickyhourglass')) return 8;
			},
			onStart(pokemon, source) {
				this.add('-activate', pokemon, 'move: ' + this.effectData.sourceEffect, '[of] ' + source);
			},
			onResidualOrder: 11,
			onEnd(pokemon) {
				this.add('-end', pokemon, this.effectData.sourceEffect, '[eeriebargain]');
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
		},
		status: 'fer',
		volatileStatus: 'eeriebargain',
		priority: 0,
		boosts: {
			atk: 1,
			def: 1,
			spa: 1,
			spd: 1,
			spe: 1,
		},
		flags: {protect: 1, mirror: 1},
		target: "self",
		secondary: null,
	},
	// Coded
	eeriespell: {
		name: "Eerie Spell",
		accuracy: 90,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Folklore",
		shortDesc: "Curses the target. Guaranteed to hit if used by a Folklore type.",
		priority: 0,
		flags: {protect: 1, mirror: 1, reflectable: 1},
		target: "normal",
		secondary: null,
		status: "crs",
	},
	// Coded
	energyfield: {
		name: "Energy Field",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 15,
		type: "Manmade",
		shortDesc: "The user is protected from most opposing moves. Fails if used in succession. If this move fails to block a move, the user looses 1/16 of their max hp.",
		onPrepareHit(pokemon, source, move) {
			const usedLastTurn = false;
			if (pokemon.lastMove.id !== "energyfield") {
				usedLastTurn = true;
				this.damage(pokemon.baseMaxhp / 16, pokemon, pokemon);
			}
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon) && usedLastTurn;
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
				if (!move.flags['protect']) {
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
				return this.NOT_FAIL;
			},
		},
		priority: 0,
		flags: {},
		target: "self",
		secondary: null,
	},
	// Coded
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
		type: "Autumn",
		volatileStatus: 'energysiphon',
		onPrepareHit: function(target, source, move) {
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
				const target = this.effectData.source.side.active[pokemon.volatiles['energysiphon'].sourcePosition];
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to leech into');
					return;
				}
				const damage = this.damage(pokemon.baseMaxhp / 8, pokemon, target);
				if (damage) {
					this.heal(damage / 2, target, pokemon);
				}
			},
		},
	},
	// Coded
	energyshot: {
		name: "Energy Shot",
		accuracy: 100,
		basePower: 65,
		category: "Special",
		pp: 15,
		type: "Typeless",
		shortDesc: "No additional effect.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	enlighten: {
		name: "Enlighten",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Serenity",
		shortDesc: "Removes status conditions from user and gives user Enlighten volatile. [Enlighten: Restores 1/16th HP each turn and immune to Curse.).",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target, source) {
			target.cureStatus();
			if (!target.volatiles['enlighten']) target.addVolatile('enlighten');
		},
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: Enlighten');
			},
			onResidualOrder: 7,
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 16);
			},
			onSetStatus(status, target, source, effect) {
				if (status === "crs") return null;
			},
		},
		target: "self",
		secondary: null,
	},
	// Coded
	enrage: {
		name: "Enrage",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Storm",
		shortDesc: "For 5 turns, Atk raises when hit. User is immune to Fear and cannot switch out.",
		self: {
			volatileStatus: 'enrage',
		},
		condition: {
			duration: 5,
			onStart(pokemon) {
				this.add('-singlemove', pokemon, 'Enrage');
			},
			onHit(target, source, move) {
				if (target !== source && move.category !== 'Status') {
					this.boost({atk: 1});
				}
			},
			onSetStatus(status, target, source, effect) {
				if (status === "fer") return null;
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	erupt: {
		name: "Erupt",
		accuracy: 90,
		basePower: 110,
		category: "Special",
		pp: 5,
		type: "Storm",
		self: {
			volatileStatus: "torment",
		},
		shortDesc: "User is Tormented (same as vanilla) when successful.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	evergreen: {
		name: "Evergreen",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Winter",
		shortDesc: "Priority +4. User survives attacks this turn with at least 1 HP.",
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'evergreen',
		onTryHit(pokemon) {
			return this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Evergreen');
			},
			onDamagePriority: -10,
			onDamage(damage, target, source, effect) {
				if (effect?.effectType === 'Move' && damage >= target.hp) {
					this.add('-activate', target, 'move: Evergreen');
					return target.hp - 1;
				}
			},
		},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	extremereboot: {
		name: "Extreme Reboot",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 5,
		type: "Manmade",
		shortDesc: "Removes user's stat changes, status conditions and fully heals user. Causes user to have to 'Boot Up' (Recharge) for the next turn. User is trapped while booting up.",
		onHit(target, source) {
			source.clearBoosts();
			this.heal(source.baseMaxhp - source.hp, source, source);
			source.cureStatus();
		},
		priority: 0,
		volatileStatus: 'mustrecharge',
		flags: {recharge: 1},
		target: "self",
		secondary: null,
	},
	// Coded and Tested
	fallback: {
		name: "Fall Back",
		accuracy: 100,
		basePower: 40,
		category: "Special",
		pp: 15,
		type: "Autumn",
		shortDesc: "Lower's the opponent's defense one stage. User switches out after the move completes.",
		priority: 0,
		selfSwitch: true,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
			boosts: {
				def: -1,
			}
		},
	},
	// Coded and Tested
	fallharvest: {
		name: "Fall Harvest",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Autumn",
		shortDesc: "Heals the user for 1/2 max HP",
		priority: 0,
		onHit(target, source, move) {
			if (target === source){
				this.heal(target.maxhp / 2, target, source, move);
			}
		},
		flags: {protect: 1, mirror: 1, heal: 1},
		target: "self",
		secondary: null,
	},
	// Coded
	firecracker: {
		name: "Firecracker",
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		pp: 10,
		type: "Summer",
		shortDesc: "User takes 1/3 Recoil, 10% Chance to lower the target's Defense",
		priority: 0,
		recoil: [1,3],
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
			boosts: {
				def: -1,
			},
			chance: 10,
		},
	},
	// Coded
	flakerake: {
		name: "Flake Rake",
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		pp: 15,
		type: "Winter",
		shortDesc: "Non-Contact. Hits adjacent opponents. 10% Chill.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 10,
			status: "frz",
		},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	floralbreeze: {
		name: "Floral Breeze",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Spring",
		shortDesc: "At the end of the next turn, the Pokemon at the user's position heals 1/2 of the user's maximum HP, rounded down.",
		priority: 0,
		flags: {snatch: 1, heal: 1},
		slotCondition: 'Wish',
		condition: {
			duration: 2,
			onStart(pokemon, source) {
				this.effectData.hp = source.maxhp / 2;
			},
			onResidualOrder: 4,
			onEnd(target) {
				if (target && !target.fainted) {
					const damage = this.heal(this.effectData.hp, target, target);
					if (damage) this.add('-heal', target, target.getHealth, '[from] move: Floral Breeze', '[wisher] ' + this.effectData.source.name);
				}
			},
		},
		secondary: null,
		target: "self",
	},
	// Coded
	freezeover: {
		name: "Freeze Over",
		accuracy: 100,
		basePower: 75,
		category: "Special",
		pp: 20,
		type: "Winter",
		shortDesc: "Lowers the target's Speed by 1 stage",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
			boosts: {
				spe: -1,
			},
			chance: 100,
		},
	},
	// Coded
	frostblast: {
		name: "Frost Blast",
		accuracy: 100,
		basePower: 90,
		category: "Special",
		pp: 10,
		type: "Winter",
		shortDesc: "10% to afflict chill on the target.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
			status: 'frz',
			chance: 10,
		},
	},
	// Coded
	frostbite: {
		name: "Frostbite",
		accuracy: 100,
		basePower: 70,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'frz') return move.basePower * 2;
			return move.basePower;
		},
		category: "Physical",
		pp: 10,
		type: "Winter",
		shortDesc: "Doubles BP if the Opponent is Chilled. (Bite, Contact)",
		priority: 0,
		flags: {protect: 1, mirror: 1, bite: 1, contact: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	frostyfingers: {
		name: "Frosty Fingers",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 15,
		type: "Winter",
		shortDesc: "Raises SpD and Atk by 1.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "self",
		secondary: null,
		boosts: {
			atk: 1,
			spd: 1
		}
	},
	// Coded
	gentlebreeze: {
		name: "Gentle Breeze",
		accuracy: true,
		basePower: 60,
		category: "Special",
		pp: 20,
		type: "Sky",
		shortDesc: "N/A (Non-contact)",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	geothermalarm: {
		name: "Geothermal Arm",
		accuracy: 100,
		basePower: 55,
		category: "Special",
		pp: 15,
		type: "Earth",
		shortDesc: "10% Poison chance. This move becomes a physical attack that makes contact if it were to do more damage.",
		onModifyMove(move, pokemon, target) {
			if (!target) return;
			const atk = pokemon.getStat('atk', false, true);
			const spa = pokemon.getStat('spa', false, true);
			const def = target.getStat('def', false, true);
			const spd = target.getStat('spd', false, true);
			const physical = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * atk) / def) / 50);
			const special = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * spa) / spd) / 50);
			if (physical > special || (physical === special && this.random(2) === 0)) {
				move.category = 'Physical';
				move.flags.contact = 1;
			}
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
			chance: 10,
			status: "psn",
		},
		unviable: true,
	},
	// Coded
	getserious: {
		name: "Get Serious",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 20,
		type: "Typeless",
		shortDesc: "Raises the user's crit ratio by +2.",
		priority: 0,
		flags: {snatch: 1},
		volatileStatus: 'focusenergy',
		condition: {
			onStart(target, source, effect) {
				if (effect?.id === 'zpower') {
					this.add('-start', target, 'move: Focus Energy', '[zeffect]');
				} else if (effect && (['imposter', 'psychup', 'transform'].includes(effect.id))) {
					this.add('-start', target, 'move: Focus Energy', '[silent]');
				} else {
					this.add('-start', target, 'move: Focus Energy');
				}
			},
			onModifyCritRatio(critRatio) {
				return critRatio + 2;
			},
		},
		secondary: null,
		target: "self",
		unviable: true,
	},
	// Coded
	ghostlyhowl: {
		name: "Ghostly Howl",
		accuracy: 100,
		basePower: 85,
		category: "Special",
		pp: 15,
		type: "Folklore",
		shortDesc: "No secondary effect.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	gigiaclap: {
		name: "Gigia Clap",
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		pp: 10,
		type: "Winter",
		shortDesc: "30% chance to inflict Chill on the target.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
			chance: 30,
			status:'frz',
		},
	},
	// Coded
	glitch: {
		name: "Glitch",
		accuracy: 100,
		basePower: 60,
		category: "Special",
		pp: 10,
		type: "Manmade",
		shortDesc: "10% chance for an omniboost",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
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
		},
		unviable: true,
	},
	// Coded
	gloomfangs: {
		name: "Gloom Fangs",
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		pp: 15,
		type: "Night",
		shortDesc: "Bite move. High crit ratio",
		priority: 0,
		flags: {protect: 1, mirror: 1, bite: 1, contact: 1},
		critRatio: 2,
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	goldrush: {
		name: "Gold Rush",
		accuracy: 95,
		basePower: 20,
		category: "Physical",
		pp: 20,
		type: "Earth",
		shortDesc: "Hits 2-5 times. Lowers SpDef. by 1 and raises Spe. by 1. (CONTACT)",
		multihit: [2, 5],
		selfBoost: {
			boosts: {
				spd: -1,
				spe: 1,
			},
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	golemthrow: {
		name: "Golem Throw",
		accuracy: 100,
		basePower: 0,
		damage: 'level',
		category: "Physical",
		pp: 20,
		type: "Manmade",
		shortDesc: "Inflicts damage equal to the user's level.",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	goodspirits: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Good Spirits",
		pp: 25,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'goodspirits',
		shortDesc: "Protects user's side from status conditions for 5 turns (8 with Tricky Hourglass).",
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('trickyhourglass')) {
					this.add('-activate', source, 'item: trickyhourglass', effect);
					return 8;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (!effect || !source) return;
				if (effect.id === 'yawn') return;
				if (effect.effectType === 'Move' && effect.infiltrates && target.side !== source.side) return;
				if (target !== source) {
					this.debug('interrupting setStatus');
					if (effect.id === 'synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'move: Safeguard');
					}
					return null;
				}
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!effect || !source) return;
				if (effect.effectType === 'Move' && effect.infiltrates && target.side !== source.side) return;
				if ((status.id === 'confusion' || status.id === 'yawn') && target !== source) {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Safeguard');
					return null;
				}
			},
			onStart(side) {
				this.add('-sidestart', side, 'Safeguard');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd(side) {
				this.add('-sideend', side, 'Safeguard');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Spring",
		zMove: {boost: {spe: 1}},
		contestType: "Beautiful",
	},
	// Coded
	growthpower: {
		name: "Growth Power",
		accuracy: 85,
		basePower: 100,
		category: "Special",
		pp: 5,
		type: "Spring",
		shortDesc: "Heals user for 1/3 of damage dealt",
		drain: [1,3],
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	guardup: {
		name: "Guard Up",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Typeless",
		shortDesc: "The user is protected from most opposing moves. Fails if used in succession.",
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'guardup',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Guard Up');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					if (move.isZ || (move.isMax && !move.breaksProtect)) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Guard Up');
				}
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
		secondary: null,
		target: "self",
	},
	// Coded
	hardreset: {
		name: "Hard Reset",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 20,
		type: "Manmade",
		shortDesc: "Removes entry hazards and terrains from both sides.",
		onHitField(target, source, move) {
			const sourceSide = source.side;
			const targetSide = source.side.foe;
			let success = false;
			if (sourceSide.removeSideCondition('rubbles')) {
				this.add('-sideend', sourceSide, 'rubbles', '[from] move: Hard Reset', '[of] ' + source);
				success = true;
			}
			if (targetSide.removeSideCondition('rubbles')) {
				this.add('-sideend', targetSide, 'rubbles', '[from] move: Hard Reset', '[of] ' + source);
				success = true;
			}
			if (this.field.clearTerrain()) success = true;
			return success;
		},
		ignoreImmunity: true,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "all",
		secondary: null,
	},
	// Coded
	harvest: {
		name: "Harvest",
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		pp: 35,
		type: "Autumn",
		shortDesc: "If this move succeeds, a message appears in the chat which says 'You get harvested.'",
		onHit(pokemon) {
			this.add('-message', 'You get harvested.');
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	harvestation: {
		name: "Harvestation",
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		pp: 20,
		type: "Autumn",
		shortDesc: "Heals the user for 50% of the damage dealt.",
		drain: [1, 2],
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	harvestify: {
		name: "Harvestify",
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		pp: 10,
		type: "Autumn",
		shortDesc: "No additional effect.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	hazymoon: {
		name: "Hazy Moon",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Spring",
		shortDesc: "Each Pokemon on the user's side restores 1/4 of its maximum HP, rounded half up, and has its status condition cured.",
		priority: 0,
		flags: {heal: 1, authentic: 1, mystery: 1},
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.25));
			return pokemon.cureStatus() || success;
		},
		secondary: null,
		target: "allies",
	},
	// Coded
	headlock: {
		name: "Headlock",
		accuracy: 80,
		basePower: 100,
		category: "Physical",
		pp: 5,
		type: "Storm",
		shortDesc: "Traps the target for 5 turns, and deals 1/8 of their max hp every turn.",
		volatileStatus: 'partiallytrapped',
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	headwind: {
		name: "Headwind",
		accuracy: 100,
		basePower: 60,
		category: "Special",
		pp: 15,
		type: "Sky",
		shortDesc: "User switches out after hitting this move",
		selfSwitch: true,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	heatstroke: {
		name: "Heat Stroke",
		accuracy: 100,
		basePower: 95,
		category: "Special",
		pp: 10,
		type: "Summer",
		shortDesc: "Has a 10% chance to give the opponent Sunburn.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
			chance: 10,
			status: 'brn',
		},
	},
	// Coded
	hibernate: {
		name: "Hibernate",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 15,
		type: "Winter",
		shortDesc: "Restores all health and cures all status conditions. Inflicts Sleep on user.",
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onTryMove(pokemon) {
			if (pokemon.hp === pokemon.maxhp) {
				this.add('-fail', pokemon, 'heal');
				return null;
			}
			if (pokemon.status === 'slp' || pokemon.hasType('Night')) {
				this.add('-fail', pokemon);
				return null;
			}
		},
		onHit(target, source, move) {
			if (!target.setStatus('slp', source, move)) return false;
			target.statusData.time = 3;
			target.statusData.startTime = 3;
			this.heal(target.maxhp); // Aesthetic only as the healing happens after you fall asleep in-game
		},
		secondary: null,
		target: "self",
	},
	// Coded
	highnoon: {
		name: "High Noon",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 5,
		type: "Summer",
		shortDesc: "Sets weather to Sun for the next 5 turns. Summer deals 1.5x damage, Winter deals 0.5x",
		priority: 0,
		flags: {},
		weather: 'highnoon',
		target: "all",
		secondary: null,
	},
	// Coded
	hit: {
		name: "Hit",
		accuracy: true,
		basePower: 50,
		category: "Physical",
		pp: 1,
		type: "Typeless",
		shortDesc: "Hit.",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	hitodama: {
		name: "Hitodama",
		accuracy: 100,
		basePower: 0,
		category: "Status",
		pp: 15,
		type: "Folklore",
		shortDesc: "Deals damage to the target equal to 1/16 of its maximum HP, rounded down, at the end of each turn. If a Folklore-type uses this move, also prevents the target from switching for 4 turns. The effect ends if either the user or the target leaves the field.",
		priority: 0,
		onHit(target, source) {
			if (source.hasType("Folklore")) target.addVolatile('temporarytrap', source);
		},
		volatileStatus: 'hitodama',
		condition: {
			onStart(target) {
				this.add('-start', target, 'Hitodama');
			},
			onResidualOrder: 5,
			onResidualSubOrder: 1.1,
			onResidual(target) {
				this.damage(pokemon.baseMaxhp / 16, pokemon);
			},
		},
		flags: {protect: 1, mirror: 1, reflectable: 1},
		target: "allAdjacentFoes",
		secondary: null,
		unviable: true,
	},
	// Coded
	holyretreat: {
		name: "Holy Retreat",
		accuracy: 100,
		basePower: 70,
		category: "Special",
		pp: 15,
		type: "Sky",
		shortDesc: "User switches out after use. Priority of -6.",
		priority: -6,
		selfSwitch: true,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	holywater: {
		name: "Holy Water",
		accuracy: 90,
		basePower: 40,
		category: "Special",
		pp: 10,
		type: "Sea",
		shortDesc: "If the opponent is Night or Folklore: 2x damage, loses stage of Atk and SpAtk.",
		onModifyMove(move, pokemon, target) {
			if (target.hasType("Folklore") || target.hasType("Night")) {
				move.basePower *= 2;
				move.secondary = {
					boosts: {atk: -1, spa: -1},
				}
			}
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	horde: {
		name: "Horde",
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		pp: 10,
		type: "Autumn",
		shortDesc: "Steals the target's item if this Pokemon doesn't have one. If this Pokemon's item is consumable, it consumes it before stealing an item.",
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterHit(target, source, move) {
			if (source.item || source.volatiles['gem']) {
				return;
			}
			const yourItem = target.takeItem(source);
			if (!yourItem) {
				return;
			}
			if (!this.singleEvent('TakeItem', yourItem, target.itemData, source, target, move, yourItem) ||
				!source.setItem(yourItem)) {
				target.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
				return;
			}
			this.add('-enditem', target, yourItem, '[silent]', '[from] move: Horde', '[of] ' + source);
			this.add('-item', source, yourItem, '[from] move: Horde', '[of] ' + target);
		},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	hotshower: {
		name: "Hot Shower",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 20,
		type: "Serenity",
		shortDesc: "User has their status cured and their lowered stat stages reset.",
		onHit(target, source, move) {
			let b: BoostName;
			let negBoosts = {};
			for (b in source.boosts) {
				if (source.boosts[b] < 0) negBoosts[b] = source.boosts[b] * -1;
			}
			if (negBoosts !== {}) this.boost(negBoosts, source);
			source.cureStatus();
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "self",
		secondary: null,
		unviable: true,
	},
	// Coded
	hyperbeam: {
		name: "Hyper Beam",
		accuracy: 100,
		basePower: 90,
		category: "Special",
		pp: 10,
		type: "Storm",
		shortDesc: "Enemy loses 2 PP of last used move.",
		secondary: {
			chance: 100,
			onHit(target) {
				if (!target.hp) return;
				const move = target.lastMove;
				if (!move || move.isZ || move.isMax) return;

				const ppDeducted = target.deductPP(move.id, 2);
				if (!ppDeducted) return;

				this.add('-activate', target, 'move: Hyper Beam', move.name, ppDeducted);
			},
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
	},
	// Coded
	hypnotize: {
		name: "Hypnotize",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 5,
		type: "Night",
		shortDesc: "Uses the Encore effect.",
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		volatileStatus: 'hypnotize',
		condition: {
			duration: 3,
			noCopy: true, // doesn't get copied by Z-Baton Pass
			onStart(target) {
				const noEncore = [
					'hypnotize', 'struggle',
				];
				let move: Move | ActiveMove | null = target.lastMove;
				if (!move || target.volatiles['dynamax']) return false;

				if (move.isMax && move.baseMove) move = this.dex.getMove(move.baseMove);
				const moveIndex = target.moves.indexOf(move.id);
				if (move.isZ || noEncore.includes(move.id) || !target.moveSlots[moveIndex] || target.moveSlots[moveIndex].pp <= 0) {
					// it failed
					return false;
				}
				this.effectData.move = move.id;
				this.add('-start', target, 'Hypnotize');
				if (!this.queue.willMove(target)) {
					this.effectData.duration++;
				}
			},
			onOverrideAction(pokemon, target, move) {
				if (move.id !== this.effectData.move) return this.effectData.move;
			},
			onResidualOrder: 13,
			onResidual(target) {
				if (target.moves.includes(this.effectData.move) &&
					target.moveSlots[target.moves.indexOf(this.effectData.move)].pp <= 0) {
					// early termination if you run out of PP
					target.removeVolatile('dynamax');
				}
			},
			onEnd(target) {
				this.add('-end', target, 'Hypnotize');
			},
			onDisableMove(pokemon) {
				if (!this.effectData.move || !pokemon.hasMove(this.effectData.move)) {
					return;
				}
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id !== this.effectData.move) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
		},
		target: "normal",
		secondary: null,
	},
	// Coded
	icykiss: {
		name: "Icy Kiss",
		accuracy: 100,
		basePower: 20,
		category: "Special",
		pp: 20,
		type: "Winter",
		shortDesc: "100% chance to inflict Chill. (Contact)",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: {
			chance: 100,
			status: 'frz',
		},
	},
	// Coded
	incantation: {
		name: "Incantation",
		accuracy: 90,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Typeless",
		shortDesc: "Inflicts Curse on the opponent. 100% accuracy when used by Folklore-types. Sound-based.",
		priority: 0,
		flags: {protect: 1, mirror: 1, reflectable: 1},
		target: "normal",
		secondary: null,
		status: "crs",
	},
	// Coded
	inhumanshriek: {
		name: "Inhuman Shriek",
		accuracy: 100,
		basePower: 90,
		category: "Special",
		pp: 10,
		type: "Manmade",
		shortDesc: "10% chance to inflict Fear on the target. (Sound)",
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1},
		target: "normal",
		secondary: {
			chance: 10,
			status: 'fer',
		},
	},
	// Coded
	intimidate: {
		name: "Intimidate",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 40,
		type: "Typeless",
		shortDesc: "Lowers all active opponents' Attack by 1 stage.",
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		boosts: {
			atk: -1,
		},
		secondary: null,
		target: "allAdjacentFoes",
	},
	// Coded
	ironbash: {
		name: "Iron Bash",
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		pp: 15,
		type: "Manmade",
		shortDesc: "If it faints a pokemon, raises Def by 1 stage",
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.boost({def: 1}, pokemon, pokemon, move);
		},
		target: "normal",
		secondary: null,
	},
	// Coded
	itemjack: {
		name: "Item Jack",
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		pp: 20,
		type: "Typeless",
		shortDesc: "Removes the opponent's item. (CONTACT)",
		onAfterHit(target, source) {
			if (source.hp) {
				const item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Item Jack', '[of] ' + source);
				}
			}
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
	},
	jitteringglare: {
		name: "Jittering Glare",
		accuracy: 70,
		basePower: 120,
		category: "Special",
		pp: 5,
		type: "Autumn",
		shortDesc: "30% chance to inflict Fear.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
			chance: 30,
			status: 'fer',
		},
	},
	// Coded
	jumpscare: {
		name: "Jumpscare",
		accuracy: 100,
		basePower: 120,
		category: "Special",
		pp: 5,
		type: "Folklore",
		shortDesc: "Target is deafened after hit and becomes immune to Sound moves. (Sound)",
		volatileStatus: "Deafened",
		condition: {
			onTryHit(target, source, move) {
			if (move.target !== 'self' && move.flags['sound']) {
				this.add('-immune', target);
				return null;
			}
			},
			onAllyTryHitSide(target, source, move) {
				if (move.flags['sound']) {
					this.add('-immune', this.effectData.target);
				}
			},
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	kancho: {
		name: "Kanchō",
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		pp: 15,
		type: "Night",
		shortDesc: "Has a 20% chance to lower the target's Def by 1 stage.",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
		unviable: true,
	},
	// Coded
	leavesdown: {
		name: "Leaves Down",
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		category: "Physical",
		pp: 10,
		type: "Autumn",
		shortDesc: "Does 20 damage on first hit, 40 on second, 60 on third. Contact.",
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 3,
		multiaccuracy: true,
		target: "normal",
		secondary: null,
	},
	// Coded
	lingeringspirit: {
		name: "Lingering Spirit",
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		pp: 15,
		type: "Folklore",
		volatileStatus: 'torment',
		shortDesc: "Contact. Target is Tormented (same as vanilla) when successful",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	luauleap: {
		name: "Luau Leap",
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		pp: 15,
		type: "Summer",
		shortDesc: "If it faints a pokemon, raises Attack by 1 stage",
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.boost({atk: 1}, pokemon, pokemon, move);
		},
		target: "normal",
		secondary: null,
	},
	// Coded
	luckystar: {
		name: "Lucky Star",
		accuracy: 100,
		basePower: 0,
		category: "Special",
		pp: 15,
		type: "Spring",
		shortDesc: "Base Power is random when selected. This move's Base Power can be anywhere between 10 to 100.",
		onModifyMove(move, pokemon) {
			const i = this.random(91);
			move.basePower = 10 + i;
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	lullaby: {
		name: "Lullaby",
		accuracy: 75,
		basePower: 0,
		category: "Status",
		status: 'slp',
		pp: 10,
		type: "Typeless",
		shortDesc: "Puts the target to sleep.  (Sound)",
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, reflectable: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	lunacy: {
		name: "Lunacy",
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		pp: 5,
		type: "Night",
		shortDesc: "Resets the user's and the target's stat changes to 0.",
		onHit(pokemon, source) {
			pokemon.clearBoosts();
			source.clearBoosts();
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	lurkerlash: {
		name: "Lurker Lash",
		accuracy: 100,
		basePower: 80,
		category: "Special",
		pp: 10,
		type: "Night",
		shortDesc: "If opponent was switching in, lowers their Defense and Special Defense by one stage.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		onHit(target, source, move) {
			if (!target.activeTurns) {
				this.boost({def: -1, spd: -1});
			}
		},
		secondary: null,
	},
	// Coded
	machinegun: {
		name: "Machine Gun",
		accuracy: 90,
		basePower: 110,
		category: "Physical",
		pp: 10,
		type: "Manmade",
		shortDesc: "Hits adjacent foes. (Bullet)",
		priority: 0,
		flags: {protect: 1, mirror: 1, bullet: 1},
		target: "allAdjacentFoes",
		secondary: null,
	},
	// Coded
	meditation: {
		name: "Meditation",
		accuracy: 95,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Serenity",
		shortDesc: "Removes the opponent's Curse and Fear statuses. Gives them Sleep.",
		onHit(target, source) {
			if (target.status && (target.status === 'crs' || target.status === 'fer')) target.setStatus('slp');
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, reflectable: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	mightygale: {
		name: "Mighty Gale",
		accuracy: 95,
		basePower: 95,
		category: "Special",
		pp: 10,
		type: "Sky",
		shortDesc: "10% chance to inflict Fear on foes. Hits all adjacent Pokemon.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "allAdjacentFoes",
		secondary: {
			chance: 10,
			status: 'fer',
		},
	},
	// Coded
	mindcleansing: {
		name: "Mind Cleansing",
		accuracy: 100,
		basePower: 0,
		category: "Status",
		pp: 5,
		type: "Serenity",
		shortDesc: "Nullifies target's Ability until they switch out. Cannot blocked by Protect.",
		volatileStatus: 'mindcleansing',
		condition: {
			// Ability suppression implemented in Pokemon.ignoringAbility() within sim/pokemon.js
			onStart(pokemon) {
				this.add('-endability', pokemon);
				this.singleEvent('End', pokemon.getAbility(), pokemon.abilityData, pokemon, pokemon, 'mindcleansing');
			},
			onCopy(pokemon) {
				if (pokemon.getAbility().isPermanent) pokemon.removeVolatile('mindcleansing');
			},
		},
		priority: 0,
		flags: {mirror: 1, reflectable: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	mindshield: {
		name: "Mind Shield",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 20,
		type: "Serenity",
		shortDesc: "Raises SpDef by 2 stages",
		boosts: {
			spd: 2,
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "self",
		secondary: null,
		unviable: true,
	},
	// Coded
	miscalculation: {
		name: "Miscalculation",
		accuracy: 100,
		basePower: 120,
		category: "Special",
		pp: 15,
		type: "Manmade",
		recoil: [33, 100],
		shortDesc: "33% recoil.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	monkeyspaw: {
		name: "Monkey's Paw",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 5,
		type: "Folklore",
		shortDesc: "Switches the user out. The Pokemon that switches in faints. The next Pokemon that switches in has all its HP restores and has its status conditions restored.",
		slotCondition: 'monkeyspaw',
		condition: {
			onSwap(target) {
				if (
					!target.fainted && (
						target.hp < target.maxhp ||
						target.status ||
						target.moveSlots.some(moveSlot => moveSlot.pp < moveSlot.maxpp)
					)
				) {
					target.faint(this.effectData.source);
					target.side.removeSlotCondition(target, 'monkeyspaw');
					target.side.addSlotCondition(target, 'monkeyspawheal');
				}
			},
		},
		selfSwitch: true,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "self",
		secondary: null,
	},
	// Coded
	mononokedance: {
		name: "Mononoke Dance",
		accuracy: 100,
		basePower: 110,
		category: "Special",
		pp: 10,
		type: "Folklore",
		shortDesc: "Locks the user into this move for 3 turns. Each hit has a 20% chance to apply fear on the target. After each hit, lowers the user's Def and SpD by 1 stage.",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		self: {
			volatileStatus: 'lockedmove',
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		onAfterMove(pokemon) {
			if (pokemon.volatiles['lockedmove'] && pokemon.volatiles['lockedmove'].duration === 1) {
				pokemon.removeVolatile('lockedmove');
			}
		},
		secondary: {
			chance: 20,
			status: 'fer',
		},
		target: "randomNormal",
	},
	// Coded
	moonbeam: {
		name: "Moon Beam",
		accuracy: 100,
		basePower: 0,
		damage: 40,
		category: "Special",
		pp: 10,
		type: "Night",
		shortDesc: "Deals exactly 40 damage.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	moonblade: {
		name: "Moon Blade",
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		pp: 20,
		type: "Night",
		shortDesc: "Suppresses the target's ability until they switch out. [Contact]",
		volatileStatus: 'moonblade',
		condition: {
			// Ability suppression implemented in Pokemon.ignoringAbility() within sim/pokemon.js
			onStart(pokemon) {
				this.add('-endability', pokemon);
				this.singleEvent('End', pokemon.getAbility(), pokemon.abilityData, pokemon, pokemon, 'moonblade');
			},
			onCopy(pokemon) {
				if (pokemon.getAbility().isPermanent) pokemon.removeVolatile('moonblade');
			},
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	narcoticpulse: {
		name: "Narcotic Pulse",
		accuracy: 100,
		basePower: 80,
		category: "Special",
		pp: 15,
		type: "Night",
		shortDesc: "If the user moved before the target, then the target's higher attacking stat drops one stage. (Pulse)",
		onHit(target, source, move){
			if (this.queue.willMove(target)) {
				const boosts = target.boosts;
				let statName = 'atk';
				const realAtk = target.storedStats['atk'] * (1 + (boosts['atk'] / 2));
				const realSpA = target.storedStats['spa'] * (1 + (boosts['spa'] / 2));
				if (realSpA > realAtk) statName = 'spa';
				this.boost({[statName]: -1}, target);
			}
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, pulse: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	nightmare: {
		name: "Nightmare",
		accuracy: 85,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Night",
		shortDesc: "Removes the opponent's Sleep status. Gives them Fear.",
		onTryHit(target, source) {
			if (!target.status || target.status !== 'slp') return false;
		},
		onHit(target, source) {
			if (target.status && target.status === 'slp') target.setStatus('fer');
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, reflectable: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	nightynight: {
		name: "Nighty Night",
		accuracy: 100,
		basePower: 65,
		category: "Special",
		pp: 15,
		type: "Night",
		shortDesc: "Causes target to get a 'Sleepy' status. Sleepy causes Pokémon with it to fall asleep after 3 turns. This move can be used against a target affected with the Sleepy status to advance the Sleepy counter by one stage. (Sound)",
		volatileStatus: 'nightynight',
		condition: {
			onStart(pokemon) {
				this.effectData.sleepy = -2; // initial hit + initial turn give 2 at the start.
				if (pokemon.status === 'slp') pokemon.removeVolatile('nightynight');
				this.add('-start', pokemon, 'move: Nighty Night');
			},
			onResidual(pokemon) {
				if (pokemon.status === 'slp') {
					pokemon.removeVolatile('nightynight');
					return;
				}
				this.effectData.sleepy++;
				if (this.effectData.sleepy >= 3) {
					pokemon.trySetStatus('slp');
					this.add(-'end', pokemon, 'Nighty Night');
					pokemon.removeVolatile('nightynight');
				} else {
					const timer = 3 - this.effectData.sleepy;
					const str = timer === 1 ? 'turn!' : 'turns!';
					this.add('-message', pokemon.name + ' will fall asleep in ' + timer + ' ' + str);
				}
			},
			onDamagingHit(damage, target, source, move) {
				if (move.id === 'nightynight') { 
					this.effectData.sleepy++;
					if (this.effectData.sleepy > 0) this.add('-message', target.name + ' became even more drowsy!');
				}
				if (this.effectData.sleepy >= 3) {
					target.trySetStatus('slp');
					this.add(-'end', target, 'Nighty Night');
					target.removeVolatile('nightynight');
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Nighty Night');
			},
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	northwind: {
		name: "North Wind",
		accuracy: 100,
		basePower: 80,
		category: "Special",
		pp: 10,
		type: "Sky",
		shortDesc: "30% chance to Chill opponent",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
			chance: 30,
			status: 'frz',
		},
	},
	// Coded
	obliterate: {
		name: "Obliterate",
		accuracy: 90,
		basePower: 200,
		category: "Special",
		pp: 5,
		type: "Storm",
		shortDesc: "User must recharge. User loses 2 stages of Special Attack.",
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1},
		self: {
			volatileStatus: 'mustrecharge',
			boosts: {
				spa: -2,
			}
		},
		target: "normal",
		secondary: null,
	},
	// Coded
	oceanblast: {
		name: "Ocean Blast",
		accuracy: 95,
		basePower: 65,
		category: "Special",
		pp: 15,
		type: "Sea",
		shortDesc: "No additional effect.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	oceantide: {
		name: "Ocean Tide",
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		pp: 10,
		type: "Sea",
		shortDesc: "Has a 100% chance to lower the target's Attack by 2.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
			chance: 100,
			boosts: {
				atk: -2,
			},
		},
	},
	// Coded and Tested
	panacea: {
		name: "Panacea",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Serenity",
		shortDesc: "User restores 50% of its max HP.",
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		secondary: null,
		target: "self",
	},
	// Coded
	patientpound: {
		name: "Patient Pound",
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		pp: 5,
		type: "Serenity",
		shortDesc: "Turn 1, charges and +1 Atk / Def. Turn 2, deals damage.",
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1, contact: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({atk: 1, def: 1}, attacker, attacker, move);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		target: "normal",
		secondary: null,
	},
	// Coded
	peekaboo: {
		name: "Peekaboo",
		accuracy: 95,
		basePower: 40,
		category: "Physical",
		pp: 30,
		type: "Folklore",
		shortDesc: "10% chance to inflict Fear on the target",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
			chance: 10,
			status: "fer",
		},
		unviable: true,
	},
	// Coded
	petrify: {
		name: "Petrify",
		accuracy: 95,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Earth",
		shortDesc: "Lowers the target's Special Attack by 3 stages.",
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		boosts: {
			spa: -3,
		},
		target: "normal",
		secondary: null,
	},
	// Coded
	pheromonalgas: {
		name: "Pheromonal Gas",
		accuracy: 75,
		basePower: 0,
		category: "Status",
		pp: 15,
		type: "Spring",
		shortDesc: "Causes the Attract effect to the opponent if opposite gender. Spring is immune.",
		onTryHit(target, source) {
			if (target.hasType("Spring")) return false;
		},
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		volatileStatus: 'pheromonalgas',
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(pokemon, source, effect) {
				if (!(pokemon.gender === 'M' && source.gender === 'F') && !(pokemon.gender === 'F' && source.gender === 'M')) {
					this.debug('incompatible gender');
					return false;
				}
				if (!this.runEvent('Attract', pokemon, source)) {
					this.debug('Pheromonal Gas event failed');
					return false;
				}
				this.add('-start', pokemon, 'Pheromonal Gas');
			},
			onUpdate(pokemon) {
				if (this.effectData.source && !this.effectData.source.isActive && pokemon.volatiles['pheromonalgas']) {
					this.debug('Removing Pheromonal Gas volatile on ' + pokemon);
					pokemon.removeVolatile('pheromonalgas');
				}
			},
			onBeforeMovePriority: 2,
			onBeforeMove(pokemon, target, move) {
				this.add('-activate', pokemon, 'move: Pheromonal Gas', '[of] ' + this.effectData.source);
				if (this.randomChance(1, 2)) {
					this.add('cant', pokemon, 'Pheromonal Gas');
					return false;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Pheromonal Gas', '[silent]');
			},
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, reflectable: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	polarnight: {
		name: "Polar Night",
		accuracy: 50,
		basePower: 120,
		category: "Special",
		pp: 10,
		type: "Night",
		shortDesc: "Has a 100% chance to inflict Chill on the target.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
			chance: 100,
			status: 'frz',
		},
	},
	// Coded
	pollinate: {
		name: "Pollinate",
		accuracy: 100,
		basePower: 35,
		category: "Special",
		pp: 40,
		type: "Spring",
		shortDesc: "For the next few turns, the target will be damaged by 1/12th of their max HP. Priority of +1.",
		volatileStatus: 'pollinate',
		condition: {
			duration: 3,
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: Pollinate');
			},
			onResidualOrder: 7,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 12);
			},
			onEnd(pokemon) {
				this.damage(pokemon.baseMaxhp / 12);
				this.add('-end', pokemon, 'move: Pollinate');
			},
		},
		priority: 1,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	powerpillar: {
		name: "Power Pillar",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 15,
		type: "Earth",
		shortDesc: "Raises Def and SpA by 1.",
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			spa: 1,
			def: 1,
		},
		target: "self",
		secondary: null,
	},
	// Coded
	powerword: {
		name: "Power Word",
		accuracy: 90,
		basePower: 0,
		category: "Status",
		pp: 5,
		type: "Folklore",
		shortDesc: "If the opponent is at 25% HP or less, it faints. (Sound)",
		onTryHit(target, source) {
			if (target.hp / target.baseMaxhp > .25) return false;
		},
		onHit(target, source) {
			if (target.hp / target.baseMaxhp <= .25) target.faint();
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, reflectable: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	pricklybush: {
		name: "Prickly Bush",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 20,
		type: "Spring",
		shortDesc: "The user's team takes halved damage for 5 turns. Only works in 'Rose Field'. (Aurora Veil clone) (Screen)",
		flags: {snatch: 1},
		sideCondition: 'pricklybush',
		onTryHitSide() {
			if (!this.field.isTerrain('rosefield')) return false;
		},
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('trickyhourglass')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && target.side === this.effectData.target) {
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Prickly Bush weaken');
						if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
						return this.chainModify(0.5);
					}
				}
			},
			onStart(side) {
				this.add('-sidestart', side, 'move: Prickly Bush');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 1,
			onEnd(side) {
				this.add('-sideend', side, 'move: Prickly Bush');
			},
		},
		secondary: null,
		target: "allySide",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
	},
	// Coded and Tested
	pumpkinfield: {
		name: "Pumpkin Field",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Autumn",
		shortDesc: "1/16 Dmg except Night or Folklore. Crs after 3. Blocks sunburn.",
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'pumpkinfield',
		condition: {
			duration: 0,
			onSwitchIn(pokemon) {
				if (pokemon.hasType("Folklore") || pokemon.hasType("Night")) return;
				if (pokemon.hasAbility("jacko")) return;
				this.damage(pokemon.maxhp / 16);
			},
			onSetStatus(status, target, source, effect) {
				if (status.id === 'brn') {
					if (effect.effectType === 'Move' && !effect.secondaries) {
						this.add('-activate', target, 'move: Pumpkin Field');
					}
					return false;
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Pumpkin Field', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Pumpkin Field');
				}
			},
			onResidual(field) {
				for (const side of field.battle.sides) {
					for (const pokemon of side.active) {
						if (!pokemon.m.lastField || pokemon.m.lastField !== "pumpkinfield") {
							pokemon.m.lastField = "pumpkinfield";
							pokemon.m.fieldTurns = 0;
						}
						if (pokemon.hasAbility("jacko")) continue;
						pokemon.m.fieldTurns++;
						if (pokemon.m.fieldTurns > pokemon.activeTurns) pokemon.m.fieldTurns = pokemon.activeTurns;
						if (pokemon.m.fieldTurns === 3) {
							pokemon.trySetStatus('crs', pokemon.side.foe.active[0], this.field.getTerrain());
						}
					}
				}
				
			},
			onEnd() {
				if (!this.effectData.duration) this.eachEvent('Terrain');
				this.add('-fieldend', 'move: Pumpkin Field');
			},
		},
		secondary: null,
		target: "all",
	},
	// Coded
	puresky: {
		name: "Pure Sky",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Sky",
		shortDesc: "Cures both the user's and an opposing Pokemon's statuses.",
		onHitField(target, source, move) {
			for (const active of this.getAllActive()) {
				active.cureStatus();
			}
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "all",
		secondary: null,
		unviable: true,
	},
	// Coded
	purification: {
		name: "Purification",
		accuracy: 100,
		basePower: 100,
		category: "Special",
		pp: 10,
		type: "Serenity",
		shortDesc: "If user is Storm-type, changes Storm to Serenity before executing this move.",
		onPrepareHit(target, source, move) {
			if (move.hasBounced || !source.hasType("Storm")) return;
			let types = [...source.getTypes(true)];
			for (const i in types) {
				if (types[i] === "Storm") {
					types[i] = "Serenity";
				}
			}
			source.setType(types);
			this.add('-start', source, 'typechange', types.join('/'), '[from] move: Purification');
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	purifyingflame: {
		name: "Purifying Flame",
		accuracy: 100,
		basePower: 65,
		category: "Special",
		pp: 15,
		type: "Sky",
		shortDesc: "Has a 30% chance to sunburn. This move is supereffective against Night-types.",
		onEffectiveness(typeMod, target, type) {
			if (type === 'Night') return 1;
		},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
	},
	// Coded
	quickread: {
		name: "Quick Read",
		accuracy: 100,
		basePower: 50,
		category: "Special",
		pp: 15,
		type: "Folklore",
		shortDesc: "Priority of +1.",
		priority: 1,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	rabidmaw: {
		name: "Rabid Maw",
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		pp: 10,
		type: "Typeless",
		shortDesc: "High critical hit ratio. If the move was succesful, the target is afflicted with the 'Heal Block' effect for 3 turns, doubled if the user is poisoned. This move fails if the target is already under said effect. (Contact) (Bite)",
		onTryHit(target, source, move) {
			if (target.volatiles['rabidmaw']) return false;
		},
		volatileStatus: "rabidmaw",
		condition: {
			duration: 3,
			durationCallback(target, source, effect) {
				if (target.status && target.status === 'psn') return 6;
				return 3;
			},
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: Rabid Maw');
				this.add('-message', pokemon.name + " can't heal!");
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.getMove(moveSlot.id).flags['heal']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (move.flags['heal'] && !move.isZ && !move.isMax) {
					this.add('cant', pokemon, 'move: Rabid Maw', move);
					return false;
				}
			},
			onResidualOrder: 17,
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Rabid Maw');
			},
			onTryHeal(damage, target, source, effect) {
				return false;
			},
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	rainyseason: {
		name: "Rainy Season",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 5,
		type: "Spring",
		weather: 'Rainy Season',
		shortDesc: "Sets weather to Rain for the next 5 turns. Spring and Sea deals 1.3x damage.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "all",
		secondary: null,
		unviable: true,
	},
	// Coded
	rampage: {
		name: "Rampage",
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		pp: 10,
		type: "Storm",
		shortDesc: "User is locked into this move for 2-3 turns, then is inflicted with sleep afterwards. Makes contact.",
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
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
	},
	// Low Priority
	randomrepurpose: {
		name: "Random Repurpose",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 15,
		type: "Manmade",
		// shortDesc: "Removes all of the user's stat changes (including evasion), and boosts a random stat (not evasion) for each stat change removed.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "self",
		secondary: null,
		unviable: true,
	},
	// Coded
	rapidfire: {
		name: "Rapid Fire",
		accuracy: 85,
		basePower: 18,
		category: "Physical",
		pp: 15,
		type: "Winter",
		shortDesc: "The user tosses snowballs in quick succesion. Can hit 2-5 times. (Non-contact)",
		multihit: [2, 5],
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	reap: {
		name: "Reap",
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		pp: 10,
		type: "Autumn",
		onModifyMove(move, source, target) {
			if (this.field.getTerrain().exists) {
				move.basePower *= 1.5;
				move.drain = [1,2];
				move.terrainBoosted = true;
			}
		},
		onHit(target, source, move) {
			if (move.terrainBoosted) this.field.clearTerrain();
		},
		shortDesc: "If there's a field, deals 1.5x damage, removes it and heals the user by 50% of the damage done.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	recklessstrike: {
		name: "Reckless Strike",
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		pp: 5,
		type: "Storm",
		shortDesc: "Both user and target have to recharge next turn.",
		onHit(target, source) {
			target:addVolatile('mustrecharge');
			source:addVolatile('mustrecharge');
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	recklesstackle: {
		name: "Reckless Tackle",
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		pp: 15,
		type: "Typeless",
		shortDesc: "User takes 1/4 recoil. [Contact]",
		recoil: [1,4],
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	refreshingbreeze: {
		name: "Refreshing Breeze",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Summer",
		shortDesc: "Causes the user to raise its Defense and Special Defense by 1 stage.",
		priority: 0,
		flags: {snatch: 1},
		boosts: {
			spd: 1,
			def: 1,
		},
		target: "self",
		secondary: null,
		unviable: true,
	},
	// Coded
	refurbish: {
		name: "Refurbish",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Manmade",
		shortDesc: "Heals the user for 75% of it's health, but lowers a stage in every stat (excl. acc/evasion)",
		heal: [3, 4],
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "self",
		boosts: {
			atk: -1,
			def: -1,
			spa: -1,
			spd: -1,
			spe: -1,
		},
		secondary: null,
	},
	// Coded
	reindeerdash: {
		name: "Reindeer Dash",
		accuracy: 95,
		basePower: 40,
		category: "Physical",
		pp: 20,
		type: "Winter",
		shortDesc: "Has +1 Priority.",
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	relax: {
		name: "Relax",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 20,
		type: "Serenity",
		shortDesc: "Raises the user's SpA and SpD by 1 stage.",
		flags: {snatch: 1},
		boosts: {
			spa: 1,
			spd: 1,
		},
		priority: 0,
		target: "self",
		secondary: null,
	},
	// Coded
	repair: {
		name: "Repair",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 20,
		type: "Manmade",
		shortDesc: "User heals 6.25% at the end of each turn, but can't switch.",
		priority: 0,
		flags: {snatch: 1, nonsky: 1},
		volatileStatus: 'repair',
		condition: {
			onStart(pokemon) {
				this.add('-message', pokemon.name + 'went under repair!');
			},
			onResidualOrder: 7,
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 16);
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
			onDragOut(pokemon) {
				this.add('-activate', pokemon, 'move: Repair');
				return null;
			},
		},
		target: "self",
		secondary: null,
		unviable: true,
	},
	// Coded
	restart: {
		name: "Restart",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Manmade",
		shortDesc: "Heals the user by 25%, resets the user's negative stat changes to 0, and clears any of the user's status conditions.",
		flags: {heal: 1, authentic: 1, mystery: 1},
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.25));
			let b: BoostName;
			let negBoosts = {};
			for (b in pokemon.boosts) {
				if (pokemon.boosts[b] < 0) negBoosts[b] = pokemon.boosts[b] * -1;
			}
			if (negBoosts !== {}) this.boost(negBoosts, pokemon);
			return pokemon.cureStatus() || success;
		},
		secondary: null,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "self",
		secondary: null,
	},
	// Coded
	restrain: {
		name: "Restrain",
		accuracy: 90,
		basePower: 85,
		category: "Physical",
		pp: 10,
		type: "Night",
		shortDesc: "Traps the target for 5 turns. Ends if the user leaves the field. (Contact)",
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		volatileStatus: 'partiallytrapped',
		target: "normal",
		secondary: null,
	},
	// Coded
	retribution: {
		name: "Retribution",
		accuracy: 100,
		basePower: 65,
		category: "Special",
		pp: 5,
		type: "Sky",
		shortDesc: "Power doubles and gains +1 priority if one of the user's party members fainted last turn.",
		onModifyPriority(priority, source, target, move) {
			if (pokemon.side.faintedLastTurn) return 1;
		},
		onBasePower(basePower, pokemon) {
			if (pokemon.side.faintedLastTurn) {
				this.debug('Boosted for a faint last turn');
				return this.chainModify(2);
			}
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Low Priority
	reversetime: {
		name: "Reverse Time",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 20,
		type: "Winter",
		// shortDesc: "All active pokemon have their type and the type of their moves changed in the following pattern: Winter becomes Autumn, Autumn becomes Summer, Summer becomes Spring, and Spring becomes Winter. This is reset upon switching out.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "all",
		secondary: null,
		unviable: true,
	},
	// Coded
	ricefield: {
		name: "Rice Field",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Spring",
		shortDesc: "1/16 Dmg. Heal 25% (50% to Serenity, Sea).",
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'ricefield',
		condition: {
			duration: 0,
			onSwitchIn(pokemon) {
				if (pokemon.hasAbility("bigbellied")) {
					if (pokemon.hasType("Serenity") || pokemon.hasType("Sea")) pokemon.heal(pokemon.baseMaxhp / 2);
					else pokemon.heal(pokemon.baseMaxhp / 4);
					return;
				}
				this.damage(pokemon.maxhp / 16);
			},
			onSetStatus(status, target, source, effect) {
				if (status.id === 'brn') {
					if (effect.effectType === 'Move' && !effect.secondaries) {
						this.add('-activate', target, 'move: Rice Field');
					}
					return false;
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Rice Field', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Rice Field');
				}
			},
			onResidual(field) {
				for (const side of field.battle.sides) {
					for (const pokemon of side.active) {
						if (!pokemon.m.lastField || pokemon.m.lastField !== "ricefield") {
							pokemon.m.lastField = "ricefield";
							pokemon.m.fieldTurns = 0;
						}
						if (pokemon.hasAbility("bigbellied")) continue;
						pokemon.m.fieldTurns++;
						if (pokemon.m.fieldTurns > pokemon.activeTurns) pokemon.m.fieldTurns = pokemon.activeTurns;
						if (pokemon.m.fieldTurns === 3) {
							console.log("rice field");
							console.log(pokemon.name);
							if (pokemon.hasType("Serenity") || pokemon.hasType("Sea")) this.heal(pokemon.baseMaxhp / 2, pokemon);
							else this.heal(pokemon.baseMaxhp / 4,pokemon);
						}
					}
				}
				
			},
			onEnd() {
				if (!this.effectData.duration) this.eachEvent('Terrain');
				this.add('-fieldend', 'move: Rice Field');
			},
		},
		target: "all",
		secondary: null,
	},
	// Coded
	riptide: {
		name: "Riptide",
		accuracy: 100,
		basePower: 40,
		category: "Special",
		pp: 40,
		type: "Sea",
		shortDesc: "+1 Priority.",
		priority: 1,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	risingsun: {
		accuracy: 100,
		basePower: 140,
		category: "Special",
		name: "Rising Sun",
		shortDesc: "Hits 2 turns after being used. Winter type if user is below 50% HP.",
		pp: 5,
		priority: 0,
		flags: {},
		isFutureMove: true,
		ignoreImmunity: true,
		onModifyType(move, pokemon) {
			if (pokemon.hp / pokemon.baseMaxhp < 0.5) {
				move.type = "Winter";
			} else {
				move.type = "Summer";
			}
		},
		onTry(source, target) {
			let type = "Summer";
			if (source.hp / source.baseMaxhp < 0.5) type = "Winter"
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'risingsun',
				source: source,
				moveData: {
					id: 'risingsun',
					name: "Rising Sun",
					accuracy: 100,
					basePower: 140,
					category: "Special",
					priority: 0,
					flags: {},
					effectType: 'Move',
					isFutureMove: true,
					type: type,
				},
			});
			this.add('-start', source, 'Rising Sun');
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Summer",
		contestType: "Beautiful",
	},
	// Coded
	rocketjump: {
		name: "Rocket Jump",
		accuracy: 85,
		basePower: 120,
		category: "Physical",
		pp: 5,
		type: "Sky",
		shortDesc: "Turn 1: User loses 10% of Max HP, becomes semi-invulnerable. Turn 2: Deal damage, high crit ratio, 30% paralysis chance. If missed, take crash damage. (Contact)",
		priority: 0,
		flags: {contact: 1, charge: 1, protect: 1, mirror: 1, gravity: 1, distance: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			this.damage(attacker.baseMaxhp / 10);
			return null;
		},
		condition: {
			duration: 2,
			onInvulnerability(target, source, move) {
				return false;
			},
		},
		hasCrashDamage: true,
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.getEffect('Rocket Jump'));
		},
		critRatio: 2,
		target: "normal",
		secondary: null,
	},
	// Coded and Tested
	rosefield: {
		name: "Rose Field",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Spring",
		shortDesc: "Terrain. Entry Dmg: 1/8, Immune: Spring, Sky.",
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'rosefield',
		condition: {
			duration: 0,
			onSwitchIn(source) {
				for (const side of this.sides) {
					for (const pokemon of side.active) {
						if (pokemon.hasAbility("subrosa")) this.heal(pokemon.maxhp / 8, pokemon);
					}
				}
				if (source.hasAbility("subrosa") || source.hasType("Spring") || source.hasType("Sky")) return;
				this.damage(source.maxhp / 8);
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Rose Field', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Rose Field');
				}
			},
			onEnd() {
				if (!this.effectData.duration) this.eachEvent('Terrain');
				this.add('-fieldend', 'move: Rose Field');
			},
		},
		secondary: null,
		target: "all",
	},
	// Coded and Tested
	rubbles: {
		name: "Rubbles",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 20,
		type: "Earth",
		shortDesc: "Spikes. Using the move also removes one layer of rubbles on your side.",
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		sideCondition: 'rubbles',
		condition: {
			// this is a side condition
			onStart(side) {
				this.add('-sidestart', side, 'Rubbles');
				this.effectData.layers = 1;
				if (side.foe.sideConditions['rubbles']){
					let allySideRubbles = side.foe.sideConditions['rubbles'];
					if (allySideRubbles.layers > 0) {
						allySideRubbles.layers = allySideRubbles.layers - 1;
						if (allySideRubbles.layers === 0) {
							side.foe.removeSideCondition('rubbles');
							this.add('-sideend', side.foe, 'rubbles');
						} else {
							let str = ' layers of Rubbles are left on ';
							if (allySideRubbles.layers === 1) str = ' layer of Rubbles is left on ';
							this.add('-message', allySideRubbles.layers + str + side.foe.active[0].name + "'s side!");
						}
					}
				}
			},
			onRestart(side) {
				if (this.effectData.layers >= 3) return false;
				this.effectData.layers++;
				this.add('-message', this.effectData.layers + ' layers of Rubbles were laid!');
				if (side.foe.sideConditions['rubbles']){
					let allySideRubbles = side.foe.sideConditions['rubbles'];
					if (allySideRubbles.layers > 0) {
						allySideRubbles.layers = allySideRubbles.layers - 1;
						if (allySideRubbles.layers === 0) {
							side.foe.removeSideCondition('rubbles');
							this.add('-sideend', side.foe, 'rubbles');
						} else {
							let str = ' layers of Rubbles are left on ';
							if (allySideRubbles.layers === 1) str = ' layer of Rubbles is left on ';
							this.add('-message', allySideRubbles.layers + str + side.foe.active[0].name + "'s side!");
						}
					}
				}
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasItem('heavydutyboots')) return;
				const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
				this.damage(damageAmounts[this.effectData.layers] * pokemon.maxhp / 24);
			},
		},
		secondary: null,
		target: "foeSide",
	},
	// Coded
	rulesrewrite: {
		name: "Rules Rewrite",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 5,
		type: "Manmade",
		shortDesc: "For 5 turns, turn order is reversed. Priority of -7. (Trick Room clone)",
		priority: -7,
		flags: {mirror: 1},
		pseudoWeather: 'rulesrewrite',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility('arbiter')) {
					this.add('-activate', source, 'ability: Arbiter', effect);
					return 7;
				}
				return 5;
			},
			onStart(target, source) {
				this.add('-fieldstart', 'move: Arbiter', '[of] ' + source);
			},
			onRestart(target, source) {
				this.field.removePseudoWeather('rulesrewrite');
			},
			// Speed modification is changed in Pokemon.getActionSpeed() in sim/pokemon.js
			onResidualOrder: 23,
			onEnd() {
				this.add('-fieldend', 'move: Arbiter');
			},
		},
		target: "all",
		secondary: null,
	},
	// Coded
	sakurastrike: {
		name: "Sakura Strike",
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		pp: 10,
		type: "Spring",
		shortDesc: "User cures its status condition before it deals damage. Contact.",
		onBeforeMove(pokemon) {
			pokemon.cureStatus();
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	seashanty: {
		name: "Sea Shanty",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 20,
		type: "Sea",
		shortDesc: "Raises the user's Attack, Special Defense, and Speed by 1 Stage. (Dance)",
		priority: 0,
		flags: {protect: 1, mirror: 1, dance: 1},
		target: "self",
		boosts: { 
			atk: 1,
			spd: 1,
			spe: 1,
		},
		secondary: null,
	},
	// Coded
	seasonchange: {
		name: "Season Change",
		accuracy: 100,
		basePower: 85,
		category: "Special",
		pp: 15,
		type: "Spring",
		shortDesc: "Changes type every turn, order of Spring -> Summer -> Autumn -> Winter -> Spring",
		onModifyType(move, pokemon) {
			const seasons = ["Spring", "Summer", "Autumn", "Winter"];
			move.type = seasons[(pokemon.activeTurns-1) % 4];
			this.add('-message', "Season Change: " + move.type);
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	seasonsend: {
		name: "Season's End",
		accuracy: 100,
		basePower: 150,
		category: "Special",
		pp: 5,
		type: "Typeless",
		shortDesc: "Move type is Spring/Summer/Autumn/Winter type, based on the user's type (primary type is used first). Fails unless the user is one of those types. If this move is successful, the user's type used to determine move type becomes typeless as long as it remains active. Physical if the user's Attack > Special Attack.",
		onTryMove(pokemon, target, move) {
			if (pokemon.hasType('Spring') || pokemon.hasType('Summer') || pokemon.hasType('Autumn') || pokemon.hasType('Winter')) return;
			this.add('-fail', pokemon, "move: Season's End");
			this.attrLastMove('[still]');
			return null;
		},
		onModifyType(move, source, target) {
			const seasons = ["Spring", "Summer", "Autumn", "Winter"];
			const types = [...source.getTypes()];
			if (seasons.includes(types[0])) {
				move.type = types[0];
			} else if (types[1] && seasons.includes(types[1])) {
				move.type = types[1];
			}
		},
		self: {
			onHit(pokemon, source, move) {
				pokemon.setType(pokemon.getTypes(true).map(type => type === move.type ? "???" : type));
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), "[from] move: Season's End");
			},
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	seasonsgreetings: {
		name: "Season's Greetings",
		accuracy: true,
		basePower: 40,
		category: "Physical",
		pp: 5,
		type: "Typeless",
		shortDesc: "Changes type to Spring, Summer, Autumn or Winter, whichever would be most effective.",
		onModifyType(move, source, target) {
			if (!target) return;
			const seasons = ["Spring", "Summer", "Autumn", "Winter"];
			let bestType = "Spring";
			let bestMod = -3;
			for (const type of seasons) {
				if (target.runEffectiveness(move) > bestMod) {
					bestMod = target.runEffectiveness(move);
					bestType = type;
				}
			}
			move.type = type;
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	seiken: {
		name: "Seiken",
		accuracy: 100,
		basePower: 120,
		category: "Special",
		defensiveCategory: "Physical",
		pp: 5,
		type: "Sky",
		shortDesc: "Deals damage to the target based on its Def instead of SpD. Lowers the user's SpA by 2 stages.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				spa: -2,
			}
		},
		target: "normal",
		secondary: null,
	},
	// Coded
	sereneblade: {
		name: "Serene Blade",
		accuracy: 100,
		basePower: 90,
		category: "Special",
		pp: 10,
		type: "Serenity",
		onModifyMove(move, pokemon, target) {
			if (!target) return;
			const atk = pokemon.getStat('atk', false, true);
			const spa = pokemon.getStat('spa', false, true);
			const def = target.getStat('def', false, true);
			const spd = target.getStat('spd', false, true);
			const physical = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * atk) / def) / 50);
			const special = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * spa) / spd) / 50);
			if (physical > special || (physical === special && this.random(2) === 0)) {
				move.category = 'Physical';
				move.flags.contact = 1;
			}
		},
		onHit(target, source, move) {
			this.hint(move.category + " Serene Blade");
		},
		onAfterSubDamage(damage, target, source, move) {
			this.hint(move.category + " Serene Blade");
		},
		shortDesc: "Physical + contact if it would be stronger.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	sereneshot: {
		name: "Serene Shot",
		accuracy: true,
		basePower: 40,
		category: "Special",
		pp: 15,
		type: "Serenity",
		shortDesc: "This move does not check accuracy. Hits foes.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "allAdjacentFoes",
		secondary: null,
		unviable: true,
	},
	// Coded
	sereneslice: {
		name: "Serene Slice",
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		pp: 10,
		type: "Serenity",
		shortDesc: "This Pokémon heals 25% of its Max HP after a turn when it uses this move. Contact",
		onHit(target, source) {
			source.addVolatile('sereneslice');
			source.volatiles['sereneslice'].turn = this.turn;
		},
		condition: {
			duration: 1,
			onEnd(pokemon) {
				if (this.effectData.turn = pokemon.battle.turn) this.heal(Math.ceil(pokemon.maxhp * 0.25), pokemon);
			}
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	sharpen: {
		name: "Sharpen",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 20,
		type: "Manmade",
		shortDesc: "Raises user's Attack by 3 stages.",
		boosts: {
			atk: 3,
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "self",
		secondary: null,
	},
	// Coded
	shellshock: {
		name: "Shell Shock",
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		pp: 20,
		type: "Sea",
		shortDesc: "30% chance to inflict Fear. (PULSE)",
		secondary: {
			chance: 30,
			status: 'fer',
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, pulse: 1},
		target: "normal",
	},
	// Coded
	shootingstar: { // condition is coded in conditions.ts
		name: "Shooting Star",
		accuracy: 90,
		basePower: 100,
		category: "Special",
		pp: 10,
		type: "Night",
		shortDesc: "Next turn, the active Pokemon restores 50% of the damage dealt. (PULSE)",
		beforeTurnCallback(source) {
			if (!source.side.getSlotCondition(source, 'shootingstar')) {
				source.side.addSlotCondition(source, 'shootingstar', source);
			}
		},
		condition: {
			duration: 2,
			onStart(side, source, sourceEffect){
				this.effectData.turn = side.battle.turn;
				this.effectData.source = source;
				this.effectData.pkmnname = source.fullname;
			},
			onFoeDamage(damage, target, source, effect) {
				if (effect.id === 'shootingstar' && this.effectData.pkmnname === source.fullname && this.effectData.turn === source.battle.turn) {
					this.effectData.hp = damage / 2;
					source.battle.add('-message', source.name + ' wished upon the shooting star!');
				}
			},
			onResidualOrder: 4,
			onResidual(source){
				if (source && source.side && !this.effectData.hp) {
					source.side.removeSlotCondition(source, 'shootingstar');
					source.battle.add('-message', 'But nothing happened!');
				}
			},
			onEnd(target) {
				if (target && !target.fainted) {
					const damage = this.heal(this.effectData.hp, target, target);
				}
			},
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, pulse: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	shroomfumes: {
		name: "Shroom Fumes",
		accuracy: 80,
		basePower: 90,
		category: "Special",
		pp: 15,
		type: "Autumn",
		shortDesc: "20% chance to Poison. 20% chance to Curse.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondaries: [
			{
				chance: 20,
				status: 'psn',
			}, {
				chance: 20,
				status: 'crs',
			},
		],
	},
	// Coded
	shroomspores: {
		name: "Shroom Spores",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Autumn",
		shortDesc: "Puts the target to sleep after 1 turn. (Yawn clone)",
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, powder: 1},
		volatileStatus: 'shroomspores',
		onTryHit(target) {
			if (target.status || !target.runStatusImmunity('slp')) {
				return false;
			}
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			duration: 2,
			onStart(target, source) {
				this.add('-start', target, 'move: Shroom Spores', '[of] ' + source);
			},
			onResidualOrder: 19,
			onEnd(target) {
				this.add('-end', target, 'move: Shroom Spores', '[silent]');
				target.trySetStatus('slp', this.effectData.source);
			},
		},
		target: "normal",
		secondary: null,
	},
	// Coded
	silverbullet: {
		name: "Silver Bullet",
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		pp: 30,
		type: "Manmade",
		shortDesc: "Has +1 Priority.  Ignores Folklore's immunity to Manmade. (PULSE)",
		priority: 1,
		ignoreImmunity: {'Folklore': true},
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	skypunt: {
		name: "Sky Punt",
		accuracy: 90,
		basePower: 60,
		category: "Physical",
		pp: 10,
		type: "Sky",
		shortDesc: "-6 priority. Enemy is force switched. (Contact)",
		forceSwitch: true,
		priority: -6,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	skysplit: {
		name: "Sky Split",
		accuracy: 80,
		basePower: 110,
		category: "Physical",
		pp: 5,
		type: "Sky",
		shortDesc: "Non-Contact. Clears any weathers, if applicable.",
		onHit(target, source, move) {
			this.field.clearWeather();
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	slipstream: {
		name: "Slipstream",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Sky",
		shortDesc: "Raises SpAtk. and Spe. by 1. If the opponent switced out that turn, raises SpAtk. and Spe. by 2.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "self",
		secondary: null,
		onHit(target, source, move) {
			let switched = false;
			for (const foe of source.side.foe.active) {
				if (foe.newlySwitched) switched = true;
			}
			if (switched) this.boost(move.boosts);
		},
		boosts: {
			spa: 1,
			spe: 1,
		},
	},
	// Coded
	slyslash: {
		name: "Sly Slash",
		accuracy: 100,
		basePower: 10,
		category: "Physical",
		pp: 20,
		type: "Night",
		shortDesc: "Hits 5 times. Each hit has a 40% chance to lower the opponent's stats - First hit lowers Atk, Second hit lowers Def, Third hit lowers Sp Atk, Fourth hit lowers Sp Def and Fifth hit lowers Speed.",
		secondary: {
			chance: 40,
			onHit(target, source, move) {
				const boosts = ['atk', 'def', 'spa', 'spd', 'spe'];
				const boostName = boosts[move.hit - 1];
				const boost = {};
				boost[boostName] = -1;
				this.boost(boost);
			},
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	snowkick: {
		name: "Snow Kick",
		accuracy: 85,
		basePower: 100,
		category: "Physical",
		pp: 10,
		type: "Winter",
		shortDesc: "10% chance to inflict Chill. 20% chance to lower Spe 1 stage",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondaries: [
			{
				chance: 20,
				boosts: {
					spe: -1,
				},
			}, {
				chance: 10,
				status: 'frz',
			},
		],
	},
	// Coded
	snowshuriken: {
		name: "Snow Shuriken",
		accuracy: 100,
		basePower: 25,
		category: "Special",
		pp: 15,
		type: "Winter",
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		shortDesc: "Hits 3 times. Physical if user's Attack > Special Attack.",
		multihit: 3,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	snowball: {
		name: "Snowball",
		accuracy: 95,
		basePower: 45,
		category: "Special",
		pp: 40,
		type: "Winter",
		shortDesc: "10% Chance of dropping the target's speed by 1 stage (Pulse)",
		priority: 0,
		secondary: {
			chance: 10,
			boosts: {
				spe: -1,
			}
		},
		flags: {protect: 1, mirror: 1},
		target: "normal",
		unviable: true,
	},
	// Coded
	snowfall: {
		name: "Snowfall",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 5,
		type: "Winter",
		shortDesc: "Sets weather to Snow for the next 5 turns. Winter deals 1.5x damage, Summer deals 0.5x",
		weather: 'Snowfall',
		priority: 0,
		flags: {},
		target: "all",
		secondary: null,
		unviable: true,
	},
	// Coded
	soil: {
		name: "Soil",
		accuracy: 100,
		basePower: 0,
		category: "Status",
		pp: 15,
		type: "Earth",
		shortDesc: "Adds Earth to the target's types.",
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, mystery: 1},
		onHit(target) {
			if (target.hasType('Earth')) return false;
			if (!target.addType('Earth')) return false;
			this.add('-start', target, 'typeadd', 'Earth', '[from] move: Soil');
		},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	solarboost: {
		name: "Solar Boost",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 20,
		type: "Summer",
		shortDesc: "Raises the user's Sp. Attack stat by 2.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		boosts: {
			spa: 2,
		},
		secondary: null,
		target: "self",
	},
	// Coded
	solarflare: {
		name: "Solar Flare",
		accuracy: 90,
		basePower: 130,
		category: "Special",
		pp: 10,
		type: "Summer",
		shortDesc: "Lowers user's Special Attack by 2 stages.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
		self: {
			boosts: {
				spa: -2,
			},
		},
	},
	// Coded
	solidify: {
		name: "Solidify",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 20,
		type: "Earth",
		shortDesc: "Raises user's Attack, Defense, and Special Defense by 1 stage.",
		priority: 0,
		flags: {},
		target: "self",
		secondary: null,
		self: {
			boosts: {
				atk: 1,
				def: 1,
				spd: 1,
			},
		},
	},
	// Coded
	soothingstrike: {
		name: "Soothing Strike",
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		pp: 10,
		type: "Serenity",
		shortDesc: "Cures the user of Fear. (Contact)",
		onHit(target, pokemon) {
			if (pokemon.status === "fer") pokemon.cureStatus();
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	soothingtune: {
		name: "Soothing Tune",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 5,
		type: "Serenity",
		shortDesc: "Heals status conditions of the party(Sound)",
		priority: 0,
		flags: {protect: 1, sound: 1, distance: 1, authentic: 1},
		onHit(pokemon, source) {
			this.add('-activate', source, 'move: Heal Bell');
			const side = pokemon.side;
			let success = false;
			for (const ally of side.pokemon) {
				if (ally !== source && ally.hasAbility('soundproof')) continue;
				if (ally.cureStatus()) success = true;
			}
			return success;
		},
		target: "allyTeam",
		secondary: null,
	},
	// Coded
	spectresmash: {
		name: "Spectre Smash",
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		pp: 5,
		type: "Folklore",
		shortDesc: "Lowers user's Attack and Defense by 1 stage after uses. Contact.",
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			boosts: {
				atk: -1,
				def: -1,
			},
		},
		target: "normal",
		secondary: null,
	},
	// Coded
	speedweed: {
		name: "Speed Weed",
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		pp: 30,
		type: "Spring",
		shortDesc: "Priority of +1 (Contact)",
		priority: 1,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	speedingstar: {
		name: "Speeding Star",
		accuracy: 100,
		basePower: 40,
		category: "Special",
		pp: 15,
		type: "Night",
		shortDesc: "Priority +1. If this move fails/is blocked, the user heals 25% Max HP.",
		onHit(target, source, move) {
			target.m.speedingstar = this.turn;
		},
		onAfterMove(pokemon, target, move) {
			if (!target || !target.m.speedingstar || target.m.speedingstar !== this.turn) this.heal(pokemon.baseMaxhp / 4, pokemon, pokemon);
		},
		priority: 1,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	sporeburst: {
		name: "Spore Burst",
		accuracy: 100,
		basePower: 0,
		category: "Status",
		pp: 30,
		type: "Autumn",
		shortDesc: "Lowers target's random stat by 2 stages (not acc/eva).",
		onHit(target) {
			const stats: BoostName[] = [];
			let stat: BoostName;
			for (stat in target.boosts) {
				if (target.boosts[stat] < 6 && stat !== 'accuracy' && stat !== 'evasion') {
					stats.push(stat);
				}
			}
			if (stats.length) {
				const randomStat = this.sample(stats);
				const boost: SparseBoostsTable = {};
				boost[randomStat] = -2;
				this.boost(boost);
			} else {
				return false;
			}
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, reflectable: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	springdance: {
		name: "Spring Dance",
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		pp: 15,
		type: "Spring",
		shortDesc: "High critical ratio.",
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		critRatio: 2,
		target: "normal",
		secondary: null,
	},
	// Coded
	springforward: {
		name: "Spring Forward",
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		pp: 15,
		type: "Spring",
		shortDesc: "+1 Priority. Restores health to the user equal to 1/2 of the damage dealt. (Contact)",
		priority: 1,
		drain: [1,2],
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	sproutsmack: {
		name: "Sprout Smack",
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		pp: 40,
		type: "Spring",
		shortDesc: "No additional effects.",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	squall: {
		name: "Squall",
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		pp: 30,
		type: "Sky",
		shortDesc: "Priority of +1.",
		priority: 1,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	squidink: {
		name: "Squid Ink",
		accuracy: 100,
		basePower: 0,
		category: "Status",
		pp: 15,
		type: "Sea",
		shortDesc: "Lowers the opponent's accuracy by 1.",
		priority: 0,
		boosts: {
			accuracy: -1,
		},
		flags: {protect: 1, mirror: 1, reflectable: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	starfall: {
		name: "Starfall",
		accuracy: 95,
		basePower: 60,
		category: "Special",
		pp: 15,
		type: "Night",
		onHit(target, source) {
			source.addVolatile('starfall');
		},
		condition: {
			duration: 5,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Star Fall');
			},
			onEnd(pokemon) {
				const side = pokemon.side.foe;
				for (const active of side.active) {
					this.damage(active.baseMaxhp / 8, active, pokemon);
				}
				this.add('-end', pokemon, 'Star Fall');
			},
			onResidual(pokemon) {
				const side = pokemon.side.foe;
				for (const active of side.active) {
					this.damage(active.baseMaxhp / 8, active, pokemon);
				}
			},
		},
		shortDesc: "For 5 turns, and at the end of each turn, the opposing Pokemon is dealt 1/8 of its max HP if the user is still in the field. The effect doesn't refresh if the move is used during the 5 turns.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	starlightcrash: {
		name: "Starlight Crash",
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		pp: 10,
		type: "Night",
		shortDesc: "User is immune to priority from slower opponents on the turn it selects this move",
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('starlightcrash');
			pokemon.volatiles['starlightcrash'].effectTarget = pokemon;
		},
		condition: {
			duration: 1,
			onTryHit(target, source, move) {
				if (move.priority > 0 && target.getStat('spe', false, true) > source.getStat('spe', false, true) && target.fullname === this.effectData.effectTarget.fullname ) {
					this.add('-message', 'Priority move of ' + source.name + ' failed due to Starlight Crash!');
					return false
				}
			},
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	starshoot: {
		name: "Starshoot",
		accuracy: 90,
		basePower: 55,
		category: "Special",
		pp: 10,
		type: "Night",
		shortDesc: "Hits twice.",
		multihit: 2,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	stockcrops: {
		name: "Stock Crops",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 20,
		type: "Autumn",
		shortDesc: "Increases Defense and Special Defense by 1. The user's Stockpile count increases by 1, or by 2 if a Field is active. If an Autumn-type attack is used with a Stockpile count, the attack's power will be doubled, and the user's Stockpile count will be lowered by 1. Count resets upon switching out.",
		onTryHit(pokemon) {
			if (pokemon.volatiles['stockcrops'] && pokemon.volatiles['stockcrops'].layers >= 3) return false;
		},
		volatileStatus: 'stockcrops',
		condition: {
			noCopy: true,
			onBasePower(basePower, source, target, move) {
				if (move.type === "Autumn" && this.effectData.layers >= 1) {
					const isTerrain = this.effectData.layers;
					this.effectData.layers--;
					this.boost({def: -1, spd: -1}, source, source);
					if (this.effectData.layers === 0) {
						this.add('-end', source, 'stockcrops1');
						source.removeVolatile('stockcrops');
					} else {
						this.add('-end', source, 'stockcrops' + isTerrain);
						this.add('-start', source, 'stockcrops' + this.effectData.layers);
					}
					return this.chainModify(2);
				}
			},
			onStart(target) {
				this.effectData.layers = 1;
				this.boost({def: 1, spd: 1}, target, target);
				if (this.field.getTerrain().exists) {
					this.effectData.layers = 2;
					this.boost({def: 1, spd: 1}, target, target);
				}
				this.add('-start', target, 'stockcrops' + this.effectData.layers);
			},
			onRestart(target) {
				if (this.effectData.layers >= 3) return false;
				const isTerrain = this.effectData.layers;
				this.effectData.layers++;
				this.boost({def: 1, spd: 1}, target, target);
				if (this.effectData.layers <= 2 && this.field.getTerrain().exists) {
					this.boost({def: 1, spd: 1}, target, target);
					this.effectData.layers++;
				}
				this.add('-end', target, 'stockcrops' + isTerrain);
				this.add('-start', target, 'stockcrops' + this.effectData.layers);
			},
			onEnd(target) {
				if (this.effectData.layers) this.add('-end', target, 'stockcrops' + this.effectData.layers);
			},
		},
		priority: 0,
		flags: {},
		target: "self",
		secondary: null,
	},
	// Coded
	stonehammer: {
		name: "Stone Hammer",
		accuracy: 85,
		basePower: 120,
		category: "Physical",
		pp: 10,
		type: "Earth",
		shortDesc: "No additional effect.",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	stonewall: {
		name: "Stone Wall",
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		pp: 10,
		type: "Earth",
		shortDesc: "Has a 100% chance to raise the user's Defense by 1.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
			self: {
				boosts: {
					def: 1,
				}
			},
		}
	},
	// Coded
	stormblitz: {
		name: "Storm Blitz",
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		pp: 10,
		type: "Storm",
		shortDesc: "Deals 1/3 damage dealt as recoil to the user(Contact)",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		recoil: [1,3],
		target: "normal",
		secondary: null,
	},
	// Coded
	strengthup: {
		name: "Strength Up",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 20,
		type: "Typeless",
		shortDesc: "Increases the user's attack by 2 stages.",
		priority: 0,
		flags: {snatch: 1, dance: 1},
		boosts: {
			atk: 2,
		},
		secondary: null,
		target: "self",
	},
	// Coded
	strikingtide: { 
		name: "Striking Tide",
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		pp: 10,
		type: "Sea",
		shortDesc: "Hits the target three times. The last hit has 75% recoil.",
		multihit: 3,
		onHit(target, source, move) {
			if (move.hit === 2) move.secondHit = target.hp;
			if (move.hit === 3) move.thirdHit = target.hp;
		},
		onAfterHit(target, source, move) {
			let damage = (move.secondHit - move.thirdHit) * (3/4);
			this.damage(damage, source);
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	submerge: {
		name: "Submerge",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Sea",
		shortDesc: "Dives underwater until user uses its next move. -6 Priority.",
		self: {
			volatileStatus: 'submerge',
		},
		onTryMove(attacker, defender, move) {
			if (attacker.volatiles[move.id]) {
				return false;
			}
			this.add('-prepare', attacker, move.name);
		},
		condition: {
			duration: 2,
			onTryMove(attacker, defender, move) {
				attacker.removeVolatile('submerge');
			},
			onInvulnerability(target, source, move) {
				return false;
			},
		},
		priority: -6,
		flags: {protect: 1, mirror: 1},
		target: "self",
		secondary: null,
		unviable: true,
	},
	// Coded
	summerdaze: { // Chance of missing 3: .1%, The accuracy is 99.9% so if the move hits, you got at least 1 hit.
	// Given that, the chance of missing the other 2 is 1%. The chance of missing 1 is 18%. The chance of getting all 3 hits is 81%. 
		name: "Summer Daze",
		accuracy: 99.9, // 90% per hit
		basePower: 50,
		category: "Special",
		pp: 5,
		type: "Summer",
		shortDesc: "Hits 3 times. This move checks accuracy for each hit, and the attack only ends once all 3 hits are checked. After each hit, the user takes recoil damage equal to 1/4 the HP lost by the target, rounded half up, but not less than 1 HP.",
		priority: 0,
		recoil: [1, 4],
		flags: {protect: 1, mirror: 1},
		target: "normal",
		multihit: 3,
		onPrepareHit(source, target, move) {
			const r = this.random(100);
			if (r === 0) {
				move.multihit = 1;
			} else if (r < 18) {
				move.multihit = 2;
			}
		},
		secondary: null,
	},
	// Coded
	summersword: {
		name: "Summer Sword",
		accuracy: 50,
		basePower: 110,
		category: "Physical",
		pp: 5,
		type: "Summer",
		shortDesc: "100% to Sunburn the target.",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: {
			chance: 100,
			status: 'brn',
		},
		unviable: true,
	},
	// Coded
	sunkiss: {
		name: "Sun Kiss",
		accuracy: 85,
		basePower: 0,
		category: "Status",
		pp: 5,
		type: "Summer",
		shortDesc: "Gives the target a sunburn.",
		priority: 0,
		flags: {protect: 1, mirror: 1, reflectable: 1},
		target: "normal",
		status: 'brn',
		secondary: null,
	},
	// Coded
	sunbathe: {
		name: "Sunbathe",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 15,
		type: "Summer",
		shortDesc: "Raises the user's Attack and Defense one stage.",
		priority: 0,
		flags: {snatch: 1, dance: 1},
		boosts: {
			atk: 1,
			def: 1,
		},
		secondary: null,
		target: "self",
	},
	// Coded and Tested
	sunflowerfield: {
		name: "Sunflower Field",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Autumn",
		shortDesc: "1/16 Dmg except Summer. Brn after 3. Blocks curses.",
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'sunflowerfield',
		condition: {
			duration: 0,
			onSwitchIn(pokemon) {
				if (pokemon.hasType("Summer")) return;
				this.damage(pokemon.maxhp / 16);
			},
			onSetStatus(status, target, source, effect) {
				if (status.id === 'crs') {
					if (effect.effectType === 'Move' && !effect.secondaries) {
						this.add('-activate', target, 'move: Sunflower Field');
					}
					return false;
				}
			},
			onStart(battle, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Sunflower Field', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Sunflower Field');
				}
			},
			onResidual(field) {
				for (const side of field.battle.sides) {
					for (const pokemon of side.active) {
						if (!pokemon.m.lastField || pokemon.m.lastField !== "sunflowerfield") {
							pokemon.m.lastField = "sunflowerfield";
							pokemon.m.fieldTurns = 0;
						}
						pokemon.m.fieldTurns++;
						if (pokemon.m.fieldTurns > pokemon.activeTurns) pokemon.m.fieldTurns = pokemon.activeTurns;
						if (pokemon.m.fieldTurns === 3) {
							pokemon.trySetStatus('brn', pokemon.side.foe.active[0], this.field.getTerrain());
						}
					}
				}
				
			},
			onEnd() {
				if (!this.effectData.duration) this.eachEvent('Terrain');
				this.add('-fieldend', 'move: Sunflower Field');
			},
		},
		target: "all",
		secondary: null,
	},
	// Coded
	sunstroke: {
		name: "Sunstroke",
		accuracy: 100,
		basePower: 75,
		category: "Special",
		pp: 15,
		type: "Summer",
		shortDesc: "Has a 25% chance to Sunburn the target.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
			status: 'brn',
			chance: 25,
		},
	},
	// Coded
	supercharge: {
		name: "Supercharge",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 20,
		type: "Storm",
		shortDesc: "Raises the user's SpA and Spe by 1 stage.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "self",
		boosts: {
			spa: 1,
			spe: 1,
		},
		secondary: null,
	},
	// Coded (only for singles)
	swelter: {
		name: "Swelter",
		accuracy: 100,
		basePower: 70,
		category: "Special",
		pp: 15,
		type: "Summer",
		shortDesc: "Deals damage to the Pokémon next to the target for 1/16 of their max HP. If there are no Pokémon next to the target, 10% chance to sunburn instead",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
			chance: 10,
			status: 'brn',
		},
	},
	// Coded
	swiftstrike: {
		name: "Swift Strike",
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		pp: 5,
		type: "Manmade",
		shortDesc: "Usually goes first (+2 priority). Makes contact.",
		priority: 2,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	swoop: {
		name: "Swoop",
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		pp: 20,
		type: "Sky",
		shortDesc: "Uses user's Speed stat as Attack in damage calculation. Contact.",
		useSourceSpeedAsOffensive: true,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	systemcrash: {
		name: "System Crash",
		accuracy: 90,
		basePower: 120,
		category: "Physical",
		pp: 10,
		type: "Manmade",
		shortDesc: "Drops user's speed stat by 2 stages. (Contact)",
		self: {
			boosts: {
				spe: -2,
			},
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	tailwind: {
		name: "Tailwind",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 40,
		type: "Sky",
		shortDesc: "User gains +1 Speed. Opponent loses -1 Speed.",
		priority: 0,
		flags: {protect: 1, mirror: 1, reflectable: 1},
		target: "normal",
		secondary: null,
		boosts: {spe: -1,},
		self: {boosts: {spe: 1,}},
		unviable: true,
	},
	// Low Priority
	takecover: {
		name: "Take Cover",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Typeless",
		// shortDesc: "Makes user immune to both Storm-type and effects of weather for 5 turns.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "self",
		secondary: null,
		unviable: true,
	},
	// Coded
	tantalize: {
		name: "Tantalize",
		accuracy: 100,
		basePower: 0,
		category: "Status",
		pp: 20,
		priority: 0,
		shortDesc: "For 3 turns, foe can only choose attacking moves",
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		volatileStatus: 'tantalize',
		condition: {
			duration: 3,
			onStart(target) {
				if (target.activeTurns && !this.queue.willMove(target)) {
					this.effectData.duration++;
				}
				this.add('-start', target, 'move: Tantalize');
			},
			onResidualOrder: 12,
			onEnd(target) {
				this.add('-end', target, 'move: Tantalize');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.getMove(moveSlot.id);
					if (move.category === 'Status' && move.id !== 'mefirst') {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 5,
			onBeforeMove(attacker, defender, move) {
				if (!move.isZ && !move.isMax && move.category === 'Status' && move.id !== 'mefirst') {
					this.add('cant', attacker, 'move: Tantalize', move);
					return false;
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Storm",
	},
	// Coded
	tattletale: {
		name: "Tattle Tale",
		accuracy: 100,
		basePower: 0,
		category: "Status",
		pp: 30,
		type: "Folklore",
		shortDesc: "Lowers the opponent's defense stat by 1.",
		boosts: {def: -1,},
		priority: 0,
		flags: {protect: 1, mirror: 1, reflectable: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	tearingtornado: {
		name: "Tearing Tornado",
		accuracy: 80,
		basePower: 110,
		category: "Special",
		pp: 5,
		type: "Storm",
		shortDesc: "Removes any active Fields. Cannot miss in Rain.",
		onModifyMove(move, pokemon, target) {
			if (target && target.effectiveWeather === "rainyseason") move.accuracy = true;
		},
		onHit() {
			this.field.clearTerrain();
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	technocut: {
		name: "Techno-Cut***",
		accuracy: 90,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Manmade",
		shortDesc: "If the opponent doesn't have a perish counter, they gain a perish counter of 4. (Contact)",
		onTryHit(target) {
			if (target.volatiles['technocut']) return false;
		},
		volatileStatus: "technocut",
		condition: {
			duration: 5,
			onEnd(target) {
				this.add('-start', target, 'perish0');
				target.faint();
			},
			onResidualOrder: 20,
			onResidual(pokemon) {
				const duration = pokemon.volatiles['technocut'].duration;
				this.add('-start', pokemon, 'perish' + duration);
			},
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, reflectable: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	tempest: {
		name: "Tempest",
		accuracy: 95,
		basePower: 130,
		category: "Physical",
		pp: 5,
		type: "Storm",
		shortDesc: "If this move doesn't KO the target, the user has to recharge afterwards.",
		onAfterHit(target, source) {
			if (target.hp > 0) source.addVolatile('mustrecharge');
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	terraform: {
		name: "Terraform",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 15,
		type: "Earth",
		shortDesc: "Heals the user by 2/3 of its max HP. Lowers the user's higher defensive stat by 1 stage (factors in stat changes).",
		priority: 0,
		heal: [2, 3],
		onHit(target, source, move){
			const boosts = source.boosts;
			let statName = 'def';
			const realDef = source.storedStats['def'] * (1 + (boosts['def'] / 2));
			const realSpD = source.storedStats['spd'] * (1 + (boosts['spd'] / 2));
			if (realSpD > realDef) statName = 'spd';
			this.boost({[statName]: -1}, source);
		},
		flags: {protect: 1, mirror: 1},
		target: "self",
		secondary: null,
	},
	// Coded
	terrainstrain: {
		name: "Terrain Strain",
		accuracy: 100,
		basePower: 90,
		category: "Special",
		pp: 10,
		type: "Earth",
		shortDesc: "Damage is calculated using the user's Defense stat.",
		useSourceDefAsOffensive: true,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	thundercloud: {
		name: "Thunder Cloud",
		accuracy: 100,
		basePower: 40,
		category: "Special",
		pp: 30,
		type: "Storm",
		shortDesc: "10% chance to inflict Fear. (SOUND)",
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1},
		target: "normal",
		secondary: {
			chance: 10,
			status: 'fer',
		},
		unviable: true,
	},
	// Coded
	tidalwave: {
		name: "Tidal Wave",
		accuracy: 90,
		basePower: 50,
		category: "Special",
		pp: 10,
		type: "Sea",
		shortDesc: "-6 priority. Foe is switched out.",
		priority: -6,
		forceSwitch: true,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	thunderclap: {
		name: "Thunderclap",
		accuracy: 100,
		basePower: 80,
		category: "Special",
		pp: 15,
		type: "Sky",
		shortDesc: "Has a 30% chance to apply fear on the target.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
			chance: 30,
			status: 'fer',
		},
	},
	// Coded
	timebomb: {
		name: "Time Bomb",
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		pp: 10,
		type: "Manmade",
		shortDesc: "Deals damage two turns after this move is used.",
		ignoreImmunity: true,
		isFutureMove: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'timebomb',
				source: source,
				moveData: {
					id: 'timebomb',
					name: "Time Bomb",
					accuracy: 100,
					basePower: 120,
					category: "Physical",
					priority: 0,
					flags: {},
					ignoreImmunity: false,
					effectType: 'Move',
					isFutureMove: true,
					type: 'Manmade',
				},
			});
			this.add('-start', source, 'move: Time Bomb');
			return null;
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	toxiccloud: {
		name: "Toxic Cloud",
		accuracy: 100,
		basePower: 0,
		category: "Status",
		pp: 40,
		type: "Sky",
		shortDesc: "Poisons the target.",
		priority: 0,
		flags: {protect: 1, mirror: 1, reflectable: 1},
		target: "normal",
		status: 'psn',
		secondary: null,
	},
	// Coded
	toxictentacles: {
		name: "Toxic Tentacles",
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		pp: 15,
		type: "Sea",
		shortDesc: "40% Poison chance; 100% if target has a lowered stat.",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		onPrepareHit(target, pokemon, move) {
			let negativeBoosts = false;
			for (const stat of ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy', 'evasion']) {
				if ( target.boosts[ stat ] < 0 ) {
					negativeBoosts = true;
				}
			}
			if ( negativeBoosts === true) {
                move.secondary.chance = 100;
            }
		},
		secondary: {
			chance: 40,
			status: 'psn'
		},
	},
	// Coded
	tragicflower: {
		name: "Tragic Flower",
		accuracy: 100,
		basePower: 65,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'psn') return move.basePower * 2;
			return move.basePower;
		},
		category: "Special",
		pp: 10,
		type: "Spring",
		shortDesc: "30% chances to poison the target. Deals 2x damage against poisoned target.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
			chance: 30,
			status: 'psn',
		},
	},
	// Coded
	tradedeal: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Trade Deal",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, mystery: 1},
		shortDesc: "Swap items with the target, then switches the user out.",
		onTryImmunity(target) {
			return !target.hasAbility('stickyhold');
		},
		onHit(target, source, move) {
			const yourItem = target.takeItem(source);
			const myItem = source.takeItem();
			if (target.item || source.item || (!yourItem && !myItem)) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				return false;
			}
			if (
				(myItem && !this.singleEvent('TakeItem', myItem, source.itemData, target, source, move, myItem)) ||
				(yourItem && !this.singleEvent('TakeItem', yourItem, target.itemData, source, target, move, yourItem))
			) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				return false;
			}
			this.add('-activate', source, 'move: Trade Deal', '[of] ' + target);
			if (myItem) {
				target.setItem(myItem);
				this.add('-item', target, myItem, '[from] move: Trade Deal');
			} else {
				this.add('-enditem', target, yourItem, '[silent]', '[from] move: Trade Deal');
			}
			if (yourItem) {
				source.setItem(yourItem);
				this.add('-item', source, yourItem, '[from] move: Trade Deal');
			} else {
				this.add('-enditem', source, myItem, '[silent]', '[from] move: Trade Deal');
			}
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Autumn",
		zMove: {boost: {spe: 2}},
		contestType: "Clever",
	},
	// Coded
	turbulence: {
		name: "Turbulence",
		accuracy: 100,
		basePower: 75,
		category: "Special",
		pp: 15,
		type: "Sky",
		shortDesc: "Super effective against Serenity.",
		onEffectiveness(typeMod, target, type) {
			if (type === 'Serenity') return 1;
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	turfcontrol: {
		name: "Turf Control",
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		pp: 15,
		type: "Earth",
		shortDesc: "If user's stats are raised, lowers the foe's corresponding stat by one for each boost.",
		secondary: {
			chance: 100,
			onHit(target, source) {
				let targetBoost = {};
				for (const boost in source.boosts) {
					if (source.boosts[boost] > 0) targetBoost[boost] = -1;
				}
				this.boost(targetBoost, target, source, null, true, false);
			},
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
	},
	// Coded
	twister: {
		name: "Twister",
		accuracy: 70,
		basePower: 15,
		category: "Special",
		pp: 15,
		type: "Storm",
		shortDesc: "RBY Wrap, but the user cannot switch until the move is done. Speed stat stage is set to -2 (unless it was lower before) when the effect resolves.",
		condition: {
			duration: 2,
			onBeforeMovePriority: 4,
			onBeforeMove(pokemon) {
				this.add('cant', pokemon, 'twister');
				return false;
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
		},
		volatileStatus: 'twister',
		self: {
			volatileStatus: 'twisterlock',
		},
		onHit(target, source) {
			/**
			 * The duration of the partially trapped must be always renewed to 2
			 * so target doesn't move on trapper switch out as happens in gen 1.
			 * However, this won't happen if there's no switch and the trapper is
			 * about to end its partial trapping.
			 **/
			if (target.volatiles['twister']) {
				if (source.volatiles['twisterlock'] && source.volatiles['twisterlock'].duration > 1) {
					target.volatiles['twister'].duration = 2;
				}
			}
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded and Tested
	typhoon: {
		name: "Typhoon",
		accuracy: 100,
		basePower: 80,
		category: "Special",
		pp: 10,
		type: "Sea",
		shortDesc: "After 3 uses: +2 SpA, +30 BP, user and move become Storm type",
		self: {
			volatileStatus: 'typhoon',
		},
		condition: {
			onStart(pokemon) {
				this.effectData.typhoonCounter = 1;
				this.add('-message', pokemon.name + ' is building up a Typhoon!');
			}, 
			onFoeHit(target, source, move) {
				if (move.id !== "typhoon" || source !== this.effectData.source) return;
				this.effectData.typhoonCounter++;
				if (this.effectData.typhoonCounter === 3) {
					this.add('-message', source.name + ' whipped up a raging storm!');
					let types = [...source.getTypes(true)];
					for (const i in types) {
						if (types[i] === "Sea") {
							types[i] = "Storm";
						}
					}
					source.setType(types);
					this.boost({spa: 2});
					this.add('-start', source, 'typechange', types.join('/'), '[from] move: Typhoon');
				}
			},
		},
		onTryHit(target, source, move) {
			if (!source.hasType("Sea") && !source.hasType("Storm")) return false;
		},
		onModifyType(move, source) {
			const effect = source.volatiles['typhoon'];
			if (effect && effect.typhoonCounter && effect.typhoonCounter >= 3) move.type = "Storm";
		},
		basePowerCallback(pokemon, target, move) {
			const effect = pokemon.volatiles['typhoon'];
			if (effect && effect.typhoonCounter && effect.typhoonCounter >= 3) return 110;
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	underhandedblow: {
		name: "Underhanded Blow",
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		pp: 10,
		type: "Night",
		basePowerCallback(pokemon, target, move) {
			if (target.status) return move.basePower * 2;
			return move.basePower;
		},
		shortDesc: "Power doubles if the target has a status aliment.",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	underworldspring: {
		name: "Underworld Spring",
		accuracy: 50,
		basePower: 100,
		category: "Special",
		pp: 10,
		type: "Spring",
		shortDesc: "Has a 100% chance to inflict Curse on the target.",
		secondary: {
			chance: 100,
			status: 'crs',
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		unviable: true,
	},
	// Not Fully Implemented (will pull vanilla moves)
	universefate: {
		name: "Universe Fate",
		accuracy: 100,
		basePower: 0,
		category: "Status",
		pp: 15,
		type: "Typeless",
		shortDesc: "Uses a random move. (not fully working)",
		onHit(target, source, effect) {
			const moves: MoveData[] = [];
			for (const id in Moves) {
				const move = Moves[id];
				if (move.realMove) continue;
				if (move.isZ || move.isMax || move.isNonstandard) continue;
				if (effect.noMetronome!.includes(move.name)) continue;
				if (this.dex.getMove(id).gen > this.gen) continue;
				moves.push(move);
			}
			let randomMove = '';
			if (moves.length) {
				moves.sort((a, b) => a.num! - b.num!);
				randomMove = this.sample(moves).name;
			}
			if (!randomMove) {
				return false;
			}
			this.useMove(randomMove, target);
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
	// Coded
	upgrade: {
		name: "Upgrade",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: .625,
		type: "Manmade",
		shortDesc: "The user's Attack, Defense, Sp. Atk, Sp. Def, and Speed rise by 1 stage.",
		boosts: {
			atk: 1,
			def: 1,
			spa: 1,
			spd: 1,
			spe: 1,
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "self",
		secondary: null,
	},
	// Coded and Tested
	uproot: {
		name: "Uproot",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 15,
		type: "Sky",
		shortDesc: "Removes fields and hazards from both sides of the field.",
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		onHitField(target, source, move) {
			const sourceSide = source.side;
			const targetSide = source.side.foe;
			let success = false;
			if (sourceSide.removeSideCondition('rubbles')) {
				this.add('-sideend', sourceSide, 'rubbles', '[from] move: Uproot', '[of] ' + source);
				success = true;
			}
			if (targetSide.removeSideCondition('rubbles')) {
				this.add('-sideend', targetSide, 'rubbles', '[from] move: Uproot', '[of] ' + source);
				success = true;
			}
			if (this.field.clearTerrain()) success = true;
			return success;
		},
		target: "all",
		secondary: null,
	},
	// Coded
	vaccination: {
		name: "Vaccination",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 15,
		type: "Manmade",
		onHit(target, source) {
			let b: BoostName;
			let negBoosts = {};
			for (b in source.boosts) {
				if (source.boosts[b] < 0) negBoosts[b] = source.boosts[b] * -1;
			}
			if (negBoosts !== {}) this.boost(negBoosts, source);
			source.cureStatus();
			const negativeVolatiles = ['energysiphon', 'tantalize', 'shroomspores', 'partiallytrapped', 'rabidmaw', 'pollinate', 'pheromonalgas', 
										'moonblade', 'mindcleansing', 'torment', 'Deafened', 'hypnotize', 'blasphemy', 'void', 'technocut', 
										'temporarytrap', 'hitodama'
			];
			for (const vol of negativeVolatiles) {
				if (source.volatiles[vol]) source.removeVolatile('vol');
			}
		},
		shortDesc: "The user resets any negative stat changes on itself, and cures itself from all volatile and non-volatile status effects.",
		priority: 0,
		flags: {},
		target: "self",
		secondary: null,
		unviable: true,
	},
	// Coded
	violenttoss: {
		name: "Violent Toss",
		accuracy: 90,
		basePower: 120,
		category: "Physical",
		pp: 10,
		type: "Storm",
		shortDesc: "If this attack misses, attacker loses 50% of their max hp.",
		hasCrashDamage: true,
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.getEffect('High Jump Kick'));
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	void: {
		name: "Void",
		accuracy: 100,
		basePower: 65,
		category: "Special",
		pp: 20,
		type: "Night",
		shortDesc: "Nullifies the effects of the target's item and ability for 5 turns. This counter rests if the target switches out.",
		volatileStatus: 'void',
		condition: {
			// Ability suppression implemented in Pokemon.ignoringAbility() within sim/pokemon.js
			duration: 5,
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: Void');
				this.add('-message', pokemon.name + ' is having its item and ability suppressed!');
			},
			onCopy(pokemon) {
				if (pokemon.getAbility().isPermanent) pokemon.removeVolatile('void');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Void');
				this.add('-message', pokemon.name + ' is suppressed no more!');
			},
		},
		priority: 0,
		flags: {},
		target: "normal",
		secondary: null,
	},
	// Coded
	washaway: {
		name: "Wash Away",
		accuracy: 90,
		basePower: 60,
		category: "Special",
		pp: 10,
		type: "Sea",
		shortDesc: "Forces the target to switch into a random ally.",
		priority: -6,
		forceSwitch: true,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	wavesplash: {
		name: "Wave Splash",
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		pp: 15,
		type: "Sea",
		shortDesc: "Has a 30% chance to lower the target's SpA by 1.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
			chance: 30,
			boosts: {
				spa: -1,
			},
		},
	},
	// Coded
	whirlpool: {
		name: "Whirlpool",
		accuracy: 100,
		basePower: 80,
		category: "Special",
		pp: 40,
		type: "Sea",
		shortDesc: "Traps the target this turn, then switches it out at the end of the next turn with an unfainted random Pokemon.",
		volatileStatus: 'whirlpool',
		condition: {
			duration: 2,
			onStart(pokemon) {
				this.add('-message', pokemon.name + ' was caught in a whirlpool!');
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
			onDragOut(pokemon) {
				this.add('-activate', pokemon, 'move: Repair');
				return null;
			},
			onEnd(pokemon) {
				this.add('-message', pokemon.name + ' was swept away!');
				pokemon.forceSwitchFlag = true;
			}
		},
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	wildpunch: { // coded in the on-contact abilities
		name: "Wild Punch",
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		pp: 10,
		type: "Storm",
		shortDesc: "Not affected by 'on-contact' effects. (Contact) (Punch)",
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, punch: 1},
		target: "normal",
		secondary: null,
	},
	// Coded and Tested
	wilt: {
		name: "Wilt",
		accuracy: 100,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Autumn",
		shortDesc: "Lowers the target's Attack and Special Attack one stage; restores 12.5% of the user's max health for each stat lowered in this way.",
		onHit(target, source, move) {
			let healCount = 0;
			if (this.boost({atk: -1}, target, source, move)) healCount++;
			if (this.boost({spa: -1}, target, source, move)) healCount++;
			if (healCount) this.heal((source.maxhp / 8) * healCount, source, source, move);
		},
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1, reflectable: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	winddrift: {
		name: "Wind Drift",
		accuracy: 75,
		basePower: 130,
		category: "Physical",
		pp: 5,
		type: "Sky",
		shortDesc: "No additional effect. (PULSE)",
		priority: 0,
		flags: {protect: 1, mirror: 1, pulse: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	wintergale: {
		name: "Winter Gale",
		accuracy: 100,
		basePower: 65,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'frz') return move.basePower * 2;
			return move.basePower;
		},
		category: "Special",
		pp: 10,
		type: "Winter",
		shortDesc: "Deals 2x damage against Chiled targets.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
	},
	// Coded
	witheringbreeze: {
		name: "Withering Breeze",
		accuracy: true,
		basePower: 0,
		category: "Status",
		pp: 10,
		type: "Autumn",
		shortDesc: "At the end of the next turn, the Pokemon at the user's position heals 1/2 of the opposing Pokemon in the battlefield's current HP, rounded down.",
		priority: 0,
		flags: {snatch: 1, heal: 1},
		slotCondition: 'Withering Breeze',
		condition: {
			duration: 2,
			onResidualOrder: 4,
			onEnd(target) {
				if (target && !target.fainted) {
					let source = target.side.foe.active[0];
					const damage = this.heal(source.hp / 2, target, target);
					if (damage) this.add('-heal', target, target.getHealth, '[from] move: Withering Breeze', '[wisher] ' + this.effectData.source.name);
				}
			},
		},
		secondary: null,
		target: "self",
	},
	// Coded
	zenpower: {
		name: "Zen Power",
		accuracy: 80,
		basePower: 110,
		category: "Special",
		pp: 5,
		type: "Serenity",
		shortDesc: "25% chance to lower foe's Atk",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: {
			chance: 25,
			boosts: {
				atk: -1,
			},
		},
	},
	// Coded
	zephyr: {
		name: "Zephyr",
		accuracy: 100,
		basePower: 40,
		category: "Special",
		pp: 35,
		type: "Sky",
		shortDesc: "No additional effect.",
		priority: 0,
		flags: {protect: 1, mirror: 1},
		target: "normal",
		secondary: null,
		unviable: true,
	},
};