export const Moves: {[moveid: string]: ModdedMoveData} = {
	/*
	placeholder: {
		name: "",
		type: "",
		category: "",
		basePower: 0,
		accuracy: 100,
		pp: 10,
		shortDesc: "",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "", target);
		},
		secondary: null,
		target: "normal",
	},
	*/
	voicemail: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Voice Mail",
		shortDesc: "Hits two turns after being used.",
		pp: 10,
		priority: 0,
		flags: {allyanim: 1, metronome: 1, futuremove: 1},
		ignoreImmunity: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'voicemail',
				source: source,
				moveData: {
					id: 'voicemail',
					name: "Voice Mail",
					accuracy: 100,
					basePower: 100,
					category: "Special",
					priority: 0,
					flags: {allyanim: 1, metronome: 1, futuremove: 1, sound: 1},
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Flying',
				},
			});
			this.add('-start', source, 'move: Voice Mail');
			return this.NOT_FAIL;
		},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Boomburst", target);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Clever",
	},
	toxicsmoke: {
		name: "Toxic Smoke",
		type: "Poison",
		category: "Special",
		basePower: 85,
		accuracy: 100,
		pp: 10,
		shortDesc: "20% chance to Toxic, 20% chance to confuse.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Strange Steam", target);
		},
		secondaries: [
			{
				chance: 20,
				status: 'tox',
			}, {
				chance: 20,
				volatileStatus: 'confusion',
			},
		],
		target: "normal",
	},
	beefup: {
		name: "Beef Up",
		type: "Ground",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 15,
		shortDesc: "Cures user's status, raises Atk by 1.",
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Bulk Up", target);
		},
		onHit(pokemon) {
			const success = !!this.boost({atk: 1});
			return pokemon.cureStatus() || success;
		},
		secondary: null,
		target: "normal",
	},
	starfall: {
		name: "Starfall",
		type: "Dragon",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 5,
		shortDesc: "For 5 turns, a Meteor Shower occurs.",
		priority: 0,
		flags: {metronome: 1},
		weather: 'meteorshower',
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Sunny Day", target);
		},
		secondary: null,
		target: "normal",
	},
	starkick: {
		name: "Star Kick",
		type: "Fairy",
		category: "Physical",
		basePower: 80,
		accuracy: 100,
		pp: 15,
		shortDesc: "1.3x power in Meteor Shower.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Moonlight", pokemon);
			this.add('-anim', pokemon, "High Jump Kick", target);
		},
		onBasePower(basePower, pokemon, target) {
			if (pokemon.effectiveWeather() === 'meteorshower') {
				return this.chainModify(1.3);
			}
		},
		secondary: null,
		target: "normal",
	},
	ragingstream: {
		name: "Raging Stream",
		type: "Water",
		category: "Special",
		basePower: 80,
		accuracy: 100,
		pp: 15,
		shortDesc: "30% chance to lower the target's Speed by 1.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Surf", target);
		},
		secondary: {
			chance: 30,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
	},
	blunderblast: {
		name: "Blunderblast",
		type: "Bug",
		category: "Physical",
		basePower: 100,
		accuracy: 100,
		pp: 10,
		shortDesc: "Deals Bug or Drive-type damage, whichever is more effective.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Techno Blast", target);
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			for (const target of pokemon.side.foe.active) {
			const type1 = 'Bug';
			const type2 = this.runEvent('Drive', pokemon, null, move, 'Bug');
				if (this.dex.getEffectiveness(type1, target) < this.dex.getEffectiveness(type2, target)) {
					move.type = type2;
				} else if (this.dex.getEffectiveness(type1, target) === this.dex.getEffectiveness(type2, target)) {
					if (pokemon.hasType(type2) && !pokemon.hasType('Bug')) {
						move.type = type2;
					}
				}
			}
		},
		onHit(target, source, move) {
			this.add('-message', `Blunderblast dealt ${move.type}-type damage!`);
		},
		secondary: null,
		target: "normal",
	},
	'24karatlabubu': {
		name: "24 Karat Labubu",
		type: "Ghost",
		category: "Special",
		basePower: 65,
		accuracy: 100,
		pp: 10,
		shortDesc: "Sets Ghost-type Stealth Rock on the target's side.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, sound: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Ceaseless Edge", target);
		},
		onAfterHit(target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('24karatlabubu');
				}
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!move.hasSheerForce && source.hp) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('24karatlabubu');
				}
			}
		},
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: 24 Karat Labubu');
				if(side.getSideCondition('stealthrock')) {
					side.removeSideCondition('stealthrock');
					this.add('-sideend', side, 'move: Stealth Rock', '[from] move: 24 Karat Labubu');
				}
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || pokemon.hasType('Normal') || pokemon.volatiles['hazardshield']) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('24karatlabubu')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		secondary: {},
		target: "normal",
	},
	matcharuption: {
		accuracy: 100,
		basePower: 140,
		basePowerCallback(pokemon, target, move) {
			const bp = move.basePower * pokemon.hp / pokemon.maxhp;
			this.debug('BP: ' + bp);
			return bp;
		},
		category: "Special",
		name: "Matcharuption",
		shortDesc: "Less power as user's HP decreases. Hits foe(s).",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Water Spout", target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Grass",
		contestType: "Beautiful",
	},
	crescentshine: {
		name: "Crescent Shine",
		type: "Fairy",
		category: "Special",
		basePower: 80,
		accuracy: 100,
		pp: 10,
		shortDesc: "50% (100 in Meteor Shower) chance to raise the user's Sp. Atk by 1.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Moonblast", target);
		},
		onModifyMove(move, pokemon) {
			if (this.field.isWeather('meteorshower')) move.secondaries[0].chance = 100;
		},
		secondary: {
			chance: 50,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
	},
	pixiedust: {
		name: "Pixie Dust",
		type: "Grass",
		category: "Status",
		basePower: 0,
		accuracy: 100,
		pp: 10,
		shortDesc: "-1 Spe; clears user's hazards.",
		priority: 0,
		flags: {protect: 1, metronome: 1, powder: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Stun Spore", target);
		},
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({ evasion: -1 });
			const removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', '24karatlabubu'];
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Pixie Dust', `[of] ${source}`);
					success = true;
				}
			}
			return success;
		},
		secondary: null,
		target: "normal",
	},
	soursnatch: {
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		name: "Sour Snatch",
		shortDesc: "Hits a foe before it switches out.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Matcha Gotcha", target);
		},
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side.hasAlly(pokemon)) continue;
				side.addSideCondition('soursnatch', pokemon);
				const data = side.getSideConditionData('soursnatch');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack || target?.switchFlag) move.accuracy = true;
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('soursnatch');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Pursuit start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectState.sources) {
					if (!source.isAdjacent(pokemon) || !this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Sour Snatch');
						alreadyAdded = true;
					}
					// Run through each action in queue to check if the Pursuit user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (source.canMegaEvo || source.canUltraBurst) {
						for (const [actionIndex, action] of this.queue.entries()) {
							if (action.pokemon === source && action.choice === 'megaEvo') {
								this.actions.runMegaEvo(source);
								this.queue.list.splice(actionIndex, 1);
								break;
							}
						}
					}
					this.actions.runMove('soursnatch', source, source.getLocOf(pokemon));
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Clever",
	},
	beyondbeefkick: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Beyond Beef Kick",
		shortDesc: "Forces the target to switch to a random ally.",
		pp: 10,
		priority: -6,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, noassist: 1, failcopycat: 1 },
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Thunderous Kick", target);
		},
		forceSwitch: true,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	headlock: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Headlock",
		shortDesc: "Prevents the target from switching out.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Head Smash", target);
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},
	verglasavarice: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Verglas Avarice",
		shortDesc: "Lowers speed of target that had a stat rise this turn.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Sheer Cold", target);
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (target?.statsRaisedThisTurn) {
					this.boost({spe: -1}, source, target, move);
				}
			},
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
	},
	darkfuckedupversionofbulletpunch: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Dark, fucked up version of Bullet Punch",
		shortDesc: "Usually goes first.",
		pp: 15,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Nasty Plot", pokemon);
			this.add('-anim', pokemon, "Bullet Punch", target);
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Tough",
	},
	singlewaterbash: {
		accuracy: 100,
		basePower: 55,
		category: "Physical",
		name: "Single Water Bash",
		shortDesc: "No additional effect.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Liquidation", target);
		},
		secondary: null,
		target: "normal",
		type: "Water",
		zMove: {basePower: 180},
		maxMove: {basePower: 140},
		contestType: "Clever",
	},
	tetoterritory: {
		accuracy: 90,
		basePower: 60,
		category: "Special",
		name: "Teto Territory",
		shortDesc: "Always lands a Critical Hit.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, sound: 1, bypasssub: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Boomburst", target);
			this.add('-anim', pokemon, "Sheer Cold", target);
		},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	baitandtackle: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Bait And Tackle",
		shortDesc: "Heal 25% after getting attacked while charging up.",
		pp: 15,
		priority: -3,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, contact: 1, heal: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Wild Charge", target);
		},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('baitandtackle');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Bait And Tackle');
				this.add('-anim', pokemon, "Charge", pokemon);
			},
			onAfterMoveSecondary(target, source, move) {
				if (move.category !== 'Status') {
					this.heal(target.baseMaxhp / 4);
				}
			},
		},
		// FIXME: onMoveAborted(pokemon) {pokemon.removeVolatile('baitandtackle')},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('baitandtackle');
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Tough",
	},
	wisebird: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Wise Bird",
		shortDesc: "Deals 1/3 recoil to user.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, distance: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Zen Headbutt", target);
		},
		recoil: [33, 100],
		secondary: null,
		target: "any",
		type: "Psychic",
		contestType: "Cool",
	},
	motorcharge: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Motor Charge",
		shortDesc: "Heals 1/3 of HP ; if user took damage before using the move, +1 Speed.",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Zap Cannon", pokemon);
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			const lastAttackedBy = pokemon.getLastAttackedBy();
			const damagedThisTurn = pokemon.attackedBy.some(
				p => p.source === lastAttackedBy && p.damage > 0 && p.thisTurn
			);
			if (damagedThisTurn) {
				this.boost({spe: 1});
			}
		},
		heal: [1, 3],
		secondary: null,
		target: "self",
		type: "Electric",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	potentialpunch: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Potential Punch",
		shortDesc: "User recovers 50% of the damage dealt.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, heal: 1, metronome: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Tough",
	},
	
	//vanilla moves
	meteorbeam: {
		inherit: true,
		shortDesc: "SpA +1 (2 in Meteor Shower) turn 1. Hits turn 2.",
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (this.field.isWeather('meteorshower')) this.boost({spa: 2}, attacker, attacker, move);
			else this.boost({spa: 1}, attacker, attacker, move);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
	meteormash: {
		inherit: true,
		shortDesc: "20% (100% in Meteor Shower) chance for Atk +1.",
		onModifyMove(move, pokemon) {
			if (this.field.isWeather('meteorshower')) move.secondaries[0].chance = 100;
		},
	},
	swift: {
		inherit: true,
		shortDesc: "Never misses. Hits foes. 2x power in Meteor Shower.",
		onBasePower(basePower, source) {
			if (this.field.isWeather('meteorshower')) {
				return this.chainModify(2);
			}
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
			case 'meteorshower':
				move.type = 'Dragon';
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
			case 'meteorshower':
				move.basePower *= 2;
				break;
			}
			this.debug('BP: ' + move.basePower);
		},
	},
	wish: {
		inherit: true,
		shortDesc: "Next turn, heals 50% (66% in Meteor Shower).",
		condition: {
			duration: 2,
			onStart(pokemon, source) {
				if (this.field.isWeather('meteorshower')) this.effectState.hp = source.maxhp * 2 / 3;
				else this.effectState.hp = source.maxhp / 2;
			},
			onResidualOrder: 4,
			onEnd(target) {
				if (target && !target.fainted) {
					const damage = this.heal(this.effectState.hp, target, target);
					if (damage) {
						this.add('-heal', target, target.getHealth, '[from] move: Wish', '[wisher] ' + this.effectState.source.name);
					}
				}
			},
		},
	},
	snaptrap: {
		inherit: true,
		shortDesc: "User on terrain: 1.3x power, type varies.",
		type: "Steel",
		basePower: 90,
		accuracy: 100,
		pp: 10,
		volatileStatus: null,
		onModifyType(move, pokemon) {
			if (!pokemon.isGrounded()) return;
			switch (this.field.terrain) {
			case 'electricterrain':
				move.type = 'Electric';
				break;
			case 'grassyterrain':
				move.type = 'Grass';
				break;
			case 'mistyterrain':
				move.type = 'Fairy';
				break;
			case 'psychicterrain':
				move.type = 'Psychic';
				break;
			}
		},
		onModifyMove(move, pokemon) {
			if (this.field.terrain && pokemon.isGrounded()) {
				move.basePower *= 1.3;
				this.debug('BP doubled in Terrain');
			}
		},
	},
	attackorder: {
		num: 454,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Attack Order",
		shortDesc: "Has 33% recoil.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		recoil: [33, 100],
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Clever",
	},
	defendorder: {
		num: 455,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Defend Order",
		shortDesc: "Protects user from attacks. On contact: inflict infestation.",
		pp: 10,
		priority: 0,
		flags: {noassist: 1, failcopycat: 1, failinstruct: 1},
		stallingMove: true,
		volatileStatus: 'defendorder',
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
				if (this.checkMoveMakesContact(move, source, target)) {
					target.addVolatile('partiallytrapped', source, this.dex.getActiveMove("Infestation"));
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
					target.addVolatile('partiallytrapped', source, this.dex.getActiveMove("Infestation"));
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Bug",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	gmaxsteelsurge: {
		num: 1000,
		accuracy: true,
		basePower: 10,
		category: "Physical",
		isNonstandard: "Gigantamax",
		name: "G-Max Steelsurge",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Copperajah",
		self: {
			onHit(source) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('gmaxsteelsurge');
				}
			},
		},
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: G-Max Steelsurge');
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || pokemon.volatiles['hazardshield']) return;
				// Ice Face and Disguise correctly get typed damage from Stealth Rock
				// because Stealth Rock bypasses Substitute.
				// They don't get typed damage from Steelsurge because Steelsurge doesn't,
				// so we're going to test the damage of a Steel-type Stealth Rock instead.
				const steelHazard = this.dex.getActiveMove('Stealth Rock');
				steelHazard.type = 'Steel';
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(steelHazard), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Steel",
		contestType: "Cool",
	},
	spikes: {
		num: 191,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Spikes",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1},
		sideCondition: 'spikes',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 3) return false;
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers++;
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots') || pokemon.volatiles['hazardshield']) return;
				const damageAmounts = [0, 3, 4, 6]; // 1/8, 1/6, 1/4
				this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / 24);
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Ground",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	stealthrock: {
		num: 446,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Stealth Rock",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, metronome: 1, mustpressure: 1},
		sideCondition: 'stealthrock',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
				if(side.getSideCondition('24karatlabubu')) {
					side.removeSideCondition('24karatlabubu');
					this.add('-sideend', side, 'move: 24 Karat Labubu', '[from] move: Stealth Rock');
				}
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || pokemon.volatiles['hazardshield']) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Rock",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
	},
	stickyweb: {
		num: 564,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Sticky Web",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, metronome: 1},
		sideCondition: 'stickyweb',
		condition: {
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Sticky Web');
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots') || pokemon.volatiles['hazardshield']) return;
				this.add('-activate', pokemon, 'move: Sticky Web');
				this.boost({spe: -1}, pokemon, pokemon.side.foe.active[0], this.dex.getActiveMove('stickyweb'));
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Bug",
		zMove: {boost: {spe: 1}},
		contestType: "Tough",
	},
	toxicspikes: {
		num: 390,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Toxic Spikes",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1},
		sideCondition: 'toxicspikes',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectState.layers = 1;
			},
			onSideRestart(side) {
				if (this.effectState.layers >= 2) return false;
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectState.layers++;
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Poison')) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (pokemon.hasType('Steel') || pokemon.hasItem('heavydutyboots') || pokemon.volatiles['hazardshield']) {
					return;
				} else if (this.effectState.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Poison",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	psystrike: {
		num: 540,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Psystrike",
		shortDesc: "Lowers the user's Atk & Sp. Atk by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		self: {
			boosts: {
				atk: -1,
				spa: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	belch: {
		num: 562,
		accuracy: 90,
		basePower: 120,
		category: "Special",
		name: "Belch",
		pp: 10,
		priority: 0,
		flags: {protect: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failmimic: 1, failinstruct: 1},
		onDisableMove(pokemon) {
			if (!pokemon.ateBerry && !pokemon.hasAbility('crazysmoke')) pokemon.disableMove('belch');
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
	instruct: {
		num: 689,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Instruct",
		pp: 15,
		priority: 0,
		flags: {protect: 1, bypasssub: 1, allyanim: 1, failinstruct: 1},
		onHit(target, source) {
			if (!target.lastMove || target.volatiles['dynamax']) return false;
			const lastMove = target.lastMove;
			const moveIndex = target.moves.indexOf(lastMove.id);
			if (
				lastMove.flags['failinstruct'] || lastMove.isZ || lastMove.isMax ||
				lastMove.flags['charge'] || lastMove.flags['recharge'] ||
				target.volatiles['beakblast'] || target.volatiles['baitandtackle'] || target.volatiles['focuspunch'] || target.volatiles['shelltrap'] ||
				(target.moveSlots[moveIndex] && target.moveSlots[moveIndex].pp <= 0)
			) {
				return false;
			}
			this.add('-singleturn', target, 'move: Instruct', '[of] ' + source);
			this.queue.prioritizeAction(this.queue.resolveAction({
				choice: 'move',
				pokemon: target,
				moveid: target.lastMove.id,
				targetLoc: target.lastMoveTargetLoc!,
			})[0] as MoveAction);
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
};
