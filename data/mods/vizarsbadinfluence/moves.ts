export const Moves: {[moveid: string]: MoveData} = {
	weatherburst: {
		num: 1001,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		shortDesc: "Doubles in Power and changes typing when holding a Weather Rock.",
		name: "Weather Burst",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
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
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Weather Ball", target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
	},
	gulpmissle: {
		num: 1002,
		accuracy: 100,
		basePower: 90,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.species.id === 'cramorant' && !target.newlySwitched || !this.queue.willMove(target)) {
				return move.basePower * 1.5;
			}
			return move.basePower;
		},
		category: "Physical",
		shortDesc: "If Cramorant: 1.5x power; if Swimmer: Summons rain, when moves last.",
		name: "Gulp Missle",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Techno Blast", target);
		},
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
	technofreezer: {
		num: 1003,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		name: "Techno Freezer",
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
	desolatemagma: {
		num: 1004,
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
			onResidual(target) {
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
	primordialfrost: {
		num: 1005,
		accuracy: 90,
		basePower: 160,
		category: "Special",
		shortDesc: "The user cannot move on the next turn. Summons Mist.",
		name: "Primordial Frost",
		pp: 10,
		priority: 0,
		flags: {recharge: 1, protect: 1, mirror: 1, nonsky: 1},
		sideCondition: 'mist',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Max Hailstorm", target);
		},
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: true,
		target: "normal",
		type: "Ice",
		contestType: "Cool",
	},
	psystrike: {
		num: 540,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Psystrike",
		shortDesc: "Ignores Dark-type immunity under Psychic Terrain.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, source) {
			if (this.field.isTerrain('psychicterrain') && source.isGrounded()) {
				move.ignoreImmunity = {'Psychic': true};
			}
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	roostercall: {
		num: 1006,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		name: "Rooster Call",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		desc: "This move can be used even when the user is asleep. When this move is attempted, all sleeping active Pokémon wake up, including the user.",
		shortDesc: "User may be asleep. All sleeping active Pokémon wake up.",
		sleepUsable: true,
		onTryHit(target) {
			for (const [i, allyActive] of target.side.active.entries()) {
				if (allyActive && allyActive.status === 'slp') allyActive.cureStatus();
				const foeActive = target.side.foe.active[i];
				if (foeActive && foeActive.status === 'slp') foeActive.cureStatus();
			}
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Overdrive", target);
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	finblade: {
		num: 1007,
		accuracy: 100,
		basePower: 95,
		desc: "This move deals damage to the target based on its Defense instead of Special Defense if the target's Special Defense is greater than or equal to its Defense, including stat stage changes.",
		shortDesc: "Damages based on Def or Sp. Def - whichever is lower on the target.",
		category: "Special",
		defensiveCategory: "Physical",
		name: "Fin Blade",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, source, target) {
			if (target.getStat('def', false, true) >= target.getStat('spd', false, true)) move.defensiveCategory = 'Special';
		},
		onHit(target, source, move) {
			this.hint(move.defensiveCategory + " Fin Blade");
		},
		onAfterSubDamage(target, source, move) {
			this.hint(move.defensiveCategory + " Fin Blade");
		},
		onPrepareHit: function(target, source) {	
			this.attrLastMove('[still]');
			this.add('-anim', source, "Razor Shell", target);
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	happyfail: {
		num: 1008,
		accuracy: 85,
		basePower: 100,
		category: "Physical",
		shortDesc: "Restores the user's HP by 1/16 if it misses.",
		name: "Happy Fail",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Twinkle Tackle", target);
		},
		target: "normal",
		type: "Fairy",
		contestType: "Cute",
	},
	curse: { // edited so that it doesn't say the user of Haunting Dance cut its own HP
		inherit: true,
		condition: {
			onStart(pokemon, source, effect) {
				if (effect?.id === 'hauntingdance') {
					this.add('-message', `${pokemon.name} was cursed!`);
					this.add('-start', pokemon, 'Curse', '[silent]');
				} else {
					this.add('-start', pokemon, 'Curse', '[of] ' + source);
				}
			},
			onResidualOrder: 10,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 4);
			},
		},
	},
	hauntingdance: {
		num: 1009,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		shortDesc: "User's HP 3/4 or more: Spite effect; 1/4 or less: Curse effect.",
		name: "Haunting Dance",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Never-Ending Nightmare", target);
		},
		onModifyMove(move, source, target) {
			move.secondaries = [];
			if (source.hp * 4 <= source.maxhp) {
				move.secondaries.push({
					chance: 100,
					volatileStatus: 'curse',
				});
			} else if (source.hp * 4 >= source.maxhp * 3) {
				move.secondaries.push({
					chance: 100,
					onHit(target) {
						if (!target.hp) return;
						const move = target.lastMove;
						if (!move || move.isZ || move.isMax) return;

						const ppDeducted = target.deductPP(move.id, 4);
						if (!ppDeducted) return;

						this.add('-message', `${move.name} lost 4 of its PP!`);
					},
				});
			}
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Beautiful",
	},
	gravitation: {
		num: 1010,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		shortDesc: "Intensifies gravity after use.",
		name: "Gravitation",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			pseudoWeather: 'gravity',
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "G-Max Gravitas", target);
		},
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	multiattack: {
		inherit: true,
		basePower: 90,
	},
	bringsticks: {
		num: 1011,
		accuracy: 100,
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the bringsticks succeeds
			if (target.beingCalledBack) {
				this.debug('Bring Sticks damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		shortDesc: "If a foe is switching out, hits it at 2x power.",
		name: "Bring Sticks",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Pursuit", target);
		},
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side === pokemon.side) continue;
				side.addSideCondition('bringsticks', pokemon);
				const data = side.getSideConditionData('bringsticks');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack) move.accuracy = true;
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('bringsticks');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Bring Sticks start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectData.sources) {
					if (!this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Bring Sticks');
						alreadyAdded = true;
					}
					// Run through each action in queue to check if the Bring Sticks user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (source.canMegaEvo || source.canUltraBurst) {
						for (const [actionIndex, action] of this.queue.entries()) {
							if (action.pokemon === source && action.choice === 'megaEvo') {
								this.runMegaEvo(source);
								this.queue.list.splice(actionIndex, 1);
								break;
							}
						}
					}
					this.runMove('bringsticks', source, this.getTargetLoc(pokemon, source));
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	foggymist: {
		num: 1012,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "-1 evasion; clears user and target side's hazards.",
		name: "Foggy Mist",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb',
			];
			const removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.getEffect(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			return success;
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Defog", target);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
	},
};