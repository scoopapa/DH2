export const Moves: {[k: string]: ModdedMoveData} = {
// New Moves
	chemicalplant: {
		accuracy: 100,
		basePower: 50,
		category: "Special",
		shortDesc: "Removes the foe's item. Poisons the foe if they had a plant-based item.",
		viable: true,
		name: "Chemical Plant",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Magical Leaf", target);
		},
		onHit(source, target, move) {
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemState, target, target, move, item)) return;
			if (target.hp && target.takeItem(source)) {
				if (item.isBerry || ['absorbbulb', 'berryjuice', 'bigroot', 'electricseed', 'galaricacuff', 'galaricawreath',
				  'grassyseed', 'leftovers', 'mentalherb', 'miracleseed', 'mirrorherb', 'mistyseed', 'powerherb', 'psychicseed',
				  'sweetapple', 'tartapple', 'whiteherb', 'syrupyapple', 'cloversweet', 'leek', 'lovesweet',
				  'ribbonsweet', 'starsweet', 'strawberrysweet', 'whippeddream'].includes(item.id)) {
						target.trySetStatus('psn', source);
						this.add('-message', `${target.name}'s item rotted and poisoned it!`);
				}
			}
		},
		onAfterHit(target, source) {
			if (source.hp) {
				const item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Chemical Plant', '[of] ' + source);
					this.add('-message', `${target.name}'s item rotted!`);
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Clever",
	},
	coldshoulder: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "100% chance to freeze target that had a stat rise this turn.",
		viable: true,
		name: "Cold Shoulder",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Ice Spinner", target);
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (target?.statsRaisedThisTurn) {
					target.trySetStatus('frz', source, move);
				}
			},
		},
		target: "normal",
		type: "Ice",
	},
	dragonsroar: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
	  	shortDesc: "If the user is hit this turn, +1 SpA.",
		name: "Dragon's Roar",
		viable: true,
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Clanging Scales", target);
		},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('dragonsroar');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Dragon\'s Roar');
			},
			onHit(target, source, move) {
				if (target !== source && move.category !== 'Status') {
					this.boost({spa: 1});
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Cool",
	},
	dustdevil: {
		accuracy: 90,
		basePower: 60,
		category: "Special",
	  	shortDesc: "Switches the foe out. Sets Sand if it fails.",
		viable: true,
		name: "Dust Devil",
		pp: 10,
		priority: -6,
		flags: {protect: 1, mirror: 1, noassist: 1, failcopycat: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sandsear Storm", target);
		},
		onMoveFail(target, source, move) {
			this.field.setWeather('sandstorm');
		},
		forceSwitch: true,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	musclememory: {
		accuracy: 100,
		basePower: 25,
		category: "Physical",
	  	shortDesc: "Hits 2-5 times.",
		viable: true,
		name: "Muscle Memory",
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		multihit: [2, 5],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Zen Headbutt", target);
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMove: {basePower: 140},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},
	nightmarch: {
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target, move) {
			const currentSpecies = move.allies!.shift()!.species;
			const bp = 10 + Math.floor(currentSpecies.baseStats.atk / 10);
			this.debug('BP for ' + currentSpecies.name + ' hit: ' + bp);
			return bp;
		},
	  	shortDesc: "All healthy allies aid in damaging the target.",
		category: "Physical",
		viable: true,
		name: "Night March",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, allyanim: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rollout", target);
		},
		onModifyMove(move, pokemon) {
			move.allies = pokemon.side.pokemon.filter(ally => ally === pokemon || !ally.fainted && !ally.status);
			move.multihit = move.allies.length;
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Clever",
	},
	rockwall: {
		accuracy: true,
		basePower: 0,
		category: "Status",
	  	shortDesc: "Protects the user. Disables a foe that makes contact.",
		viable: true,
		name: "Rock Wall",
		pp: 10,
		priority: 4,
		flags: {noassist: 1, failcopycat: 1},
		stallingMove: true,
		volatileStatus: 'rockwall',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
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
					source.addVolatile('disable');
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
					source.addVolatile('disable');
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Rock",
		zMove: {boost: {def: 1}},
		contestType: "Tough",
	},
	soulsink: {
		accuracy: 100,
		basePower: 55,
		category: "Physical",
	  	shortDesc: "Lowers the foe's Speed at the end of the turn for 3 turns.",
		viable: true,
		name: "Soul Sink",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Jab", target);
		},
		condition: {
			noCopy: true,
			duration: 4,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Soul Sink');
			},
			onResidualOrder: 14,
			onResidual() {
				this.boost({spe: -1});
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Soul Sink', '[silent]');
			},
		},
		secondary: {
			chance: 100,
			volatileStatus: 'soulsink',
		},
		target: "normal",
		type: "Ghost",
	},
	sparklingspike: {
		accuracy: 100,
		basePower: 70,
		category: "Special",
	  	shortDesc: "After dealing damage, this move deals an additional 6.25% of all foes' max HP.",
		viable: true,
		name: "Sparkling Spike",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Torch Song", target);
		},
		onHit(target, source, move) {
			this.damage(target.baseMaxhp / 16, target, source, this.dex.conditions.get('Sparkling Spike'));
			for (const ally of target.adjacentAllies()) {
				this.damage(ally.baseMaxhp / 16, ally, source, this.dex.conditions.get('Sparkling Spike'));
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			this.damage(target.baseMaxhp / 16, target, source, this.dex.conditions.get('Sparkling Spike'));
			for (const ally of target.adjacentAllies()) {
				this.damage(ally.baseMaxhp / 16, ally, source, this.dex.conditions.get('Sparkling Spike'));
			}
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	toxicshock: {
		accuracy: 100,
		basePower: 70,
		category: "Special",
	  	shortDesc: "Fails if the foe wasn't using an offensive move. +1 Priority.",
		viable: true,
		name: "Toxic Shock",
		pp: 5,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acid Spray", target);
		},
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || (move.category === 'Status' && move.id !== 'mefirst') || target.volatiles['mustrecharge']) {
				return false;
			}
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	updraft: {
		accuracy: 100,
		basePower: 85,
		category: "Special",
	  	shortDesc: "Uses target's Speed stat in damage calculation.",
		viable: true,
		name: "Updraft",
		pp: 10,
		priority: 0,
		flags: {wind: 1, protect: 1, mirror: 1, metronome: 1},
		overrideOffensiveStat: 'spe',
		overrideOffensivePokemon: 'target',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Gust", target);
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Clever",
	},
	wideslash: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "High critical hit ratio. Hits all adjacent foes.",
		viable: true,
		name: "Wide Slash",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, slicing: 1, metronome: 1},
		critRatio: 2,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sacred Sword", target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Steel",
		contestType: "Cool",
	},
	warmup: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User: +1 Speed, +2 critrate. Max 2 uses.",
		viable: true,
		name: "Warm Up",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bulk Up", target);
		},
		onTry(source) {
			if (source.volatiles['warmup'] && source.volatiles['warmup'].layers >= 2) return false;
		},
		volatileStatus: 'warmup',
		condition: {
			noCopy: true,
			onStart(target) {
				this.effectState.layers = 1;
				this.effectState.spe = 0;
				this.add('-start', target, 'warmup' + this.effectState.layers);
				const [curSpe] = [target.boosts.spe];
				this.boost({spe: 1}, target, target);
				if (curSpe !== target.boosts.spe) this.effectState.spe--;
			},
			onRestart(target) {
				if (this.effectState.layers >= 2) return false;
				this.effectState.layers++;
				this.add('-start', target, 'warmup' + this.effectState.layers);
				const [curSpe] = [target.boosts.spe];
				this.boost({spe: 1}, target, target);
				if (curSpe !== target.boosts.spe) this.effectState.spe--;
			},
			onModifyCritRatio(critRatio) {
				return critRatio + 2;
			},
			onEnd(target) {
				if (this.effectState.spe) {
					const boosts: SparseBoostsTable = {};
					if (this.effectState.spe) boosts.spe = this.effectState.spe;
					this.boost(boosts, target, target);
				}
				this.add('-end', target, 'Warm Up');
				if (this.effectState.spe !== this.effectState.layers * -1) {
					this.hint("In Gen 7, Stockpile keeps track of how many times it successfully altered each stat individually.");
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Fighting",
		zMove: {effect: 'heal'},
		contestType: "Tough",
	},
	workout: {
		accuracy: 100,
		basePower: 70,
		basePowerCallback(pokemon) {
			if (!pokemon.volatiles['warmup']?.layers) return 70;
			return (pokemon.volatiles['warmup'].layers + 1) * 70;
		},
		category: "Physical",
		shortDesc: "Power is equal to 70 * (Warm Up Levels + 1). 1/4 recoil at 0 levels.",
		viable: true,
		name: "Workout",
		pp: 5,
		priority: 0,
		flags: {protect: 1, contact: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Burn Up", target);
		},
		onModifyMove(move, pokemon) {
			if (!pokemon.volatiles['warmup']?.layers) {
				move.recoil = [1, 4];
			}
		},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('warmup');
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},
	cooldown: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Cures status and heals based on Warm Up levels.",
		viable: true,
		name: "Cool Down",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rest", target);
		},
		onTry(source) {
			return !!source.volatiles['warmup'];
		},
		onHit(pokemon) {
			const healAmount = [0.5, 1];
			const success = !!this.heal(this.modify(pokemon.maxhp, healAmount[(pokemon.volatiles['warmup'].layers - 1)]));
			if (!success) this.add('-fail', pokemon, 'heal');
			pokemon.removeVolatile('warmup');
			return pokemon.cureStatus() || success;
		},
		secondary: null,
		target: "self",
		type: "Fighting",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Tough",
	},
	hypeup: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Causes the target's moves critically hit for 2 turns.",
		name: "Hype Up",
		pp: 20,
		priority: 0,
		flags: {bypasssub: 1, allyanim: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Focus Energy", target);
		},
		volatileStatus: 'hypeup',
		condition: {
			duration: 2,
			onStart(pokemon, source, effect) {
				if (effect && (['costar', 'imposter', 'psychup', 'transform'].includes(effect.id))) {
					this.add('-start', pokemon, 'move: Hype Up', '[silent]');
				} else {
					this.add('-start', pokemon, 'move: Hype Up');
				}
			},
			onRestart(pokemon) {
				this.effectState.duration = 2;
				this.add('-start', pokemon, 'move: Hype Up');
  			this.add('-message', `${pokemon.name}'s is all hyped up!`);
			},
			onModifyCritRatio(critRatio) {
				return 5;
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Hype Up', '[silent]');
			},
		},
		secondary: null,
		target: "adjacentAlly",
		type: "Normal",
		zMove: {boost: {atk: 1}},
		contestType: "Cool",
	},
	starburst: {
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		shortDesc: "Usually moves first. Ignores redirection and makes the target the center of attention.",
		viable: true,
		name: "Starburst",
		pp: 20,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		volatileStatus: 'spotlight',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Meteor Mash", target);
		},
		tracksTarget: true,
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Cool",
	},
	tribocharge: {
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		shortDesc: "Changes the foe's ability to Plus or Minus.",
		viable: true,
		name: "Tribocharge",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Nuzzle", target);
		},
		onHit(target, source, move) {
			if (target.getAbility().flags['cantsuppress']) return;
			if (target.hasAbility('plus') || source.hasAbility('plus')) {
  			const oldAbility2 = target.setAbility('minus');
  			if (oldAbility2) {
  				this.add('-ability', target, 'Minus', '[from] move: Tribocharge');
  				return;
  			}
  			return oldAbility2 as false | null;
      } else {
  			const oldAbility = target.setAbility('plus');
  			if (oldAbility) {
  				this.add('-ability', target, 'Plus', '[from] move: Tribocharge');
  				return;
  			}
  			return oldAbility as false | null;
      	}
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},

// Signature Moves
	evoboost: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Boosts the user's highest stat by 2 stages. Eevee: Boosts all stats by 2 stages once.",
		viable: true,
		name: "Evoboost",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Extreme Evoboost", target);
		},
		onHit(pokemon) {
			if (pokemon.species.baseSpecies === 'Eevee') {
				this.boost({atk: 2, def: 2, spa: 2, spd: 2, spe: 2}, pokemon, pokemon);
				pokemon.addVolatile('evoboost');
			} else {
				let bestStat = pokemon.getBestStat(false, true);
				if (bestStat === 'atk') {
					this.boost({atk: 2}, pokemon, pokemon);
				}
				else if (bestStat === 'def') {
					this.boost({def: 2}, pokemon, pokemon);
				}
				else if (bestStat === 'spa') {
					this.boost({spa: 2}, pokemon, pokemon);
				}
				else if (bestStat === 'spd') {
					this.boost({spd: 2}, pokemon, pokemon);
				}
				else if (bestStat === 'spe') {
					this.boost({spe: 2}, pokemon, pokemon);
				}
			}
		},
		condition: {
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					const move = this.dex.moves.get(moveSlot.id);
					if (move.id === 'evoboost') {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	fivestarfist: {
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		category: "Physical",
		shortDesc: "Hits 5 times, but each hit can miss.",
		viable: true,
		name: "Five-Star Fist",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, metronome: 1},
		multihit: 5,
		multiaccuracy: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Cosmic Power", source);
			this.add('-anim', source, "Wicked Blow", target);
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		zMove: {basePower: 120},
		maxMove: {basePower: 140},
	},
	mimetime: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "+2 SpA and +1 Spe to the user, then copies the foe's last move.",
		viable: true,
		name: "Mime Time",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1, bypasssub: 1, allyanim: 1,
			failencore: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failmimic: 1,
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Light Screen", target);
		},
		onHit(target, source) {
			const move = target.lastMove;
			if (source.transformed || !move || move.flags['failmimic'] || source.moves.includes(move.id)) {
				return false;
			}
			if (move.isZ || move.isMax) return false;
			const mimetimeIndex = source.moves.indexOf('mimetime');
			if (mimetimeIndex < 0) return false;

			source.moveSlots[mimetimeIndex] = {
				move: move.name,
				id: move.id,
				pp: move.pp,
				maxpp: move.pp,
				target: move.target,
				disabled: false,
				used: false,
				virtual: true,
			};
			this.boost({spa: 2, spe: 1}, source, source);
			this.add('-start', source, 'Mime Time', move.name);
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMove: {boost: {accuracy: 1}},
		contestType: "Cute",
	},
	pitcherperfect: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Traps the foe. Super effective on Bug-types.",
		viable: true,
		name: "Pitcher Perfect",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fell Stinger", target);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Bug') return 1;
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
		type: "Grass",
		contestType: "Tough",
	},
	poprocks: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		shortDesc: "Fails and sets Stealth Rock if the user takes damage before it hits.",
		viable: true,
		name: "Pop Rocks",
		pp: 10,
		priority: -3,
		flags: {protect: 1, bullet: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Stealth Rock", target);
		},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('poprocks');
		},
		beforeMoveCallback(pokemon) {
			if (pokemon.volatiles['poprocks']?.lostFocus) {
				this.add('cant', pokemon, 'Pop Rocks', 'Pop Rocks');
				return true;
			}
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Pop Rocks');
			},
			onHit(pokemon, source, move) {
				if (move.category !== 'Status') {
					this.effectState.lostFocus = true;
					for (const side of pokemon.side.foeSidesWithConditions()) {
						side.addSideCondition('stealthrock');
						this.add('-message', `${pokemon.name}'s pop rocks went everywhere!`);
					}
				}
			},
			onTryAddVolatile(status, pokemon) {
				if (status.id === 'flinch') return null;
			},
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	resonanttone: {
		accuracy: 100,
		basePower: 60,
		category: "Special",
		shortDesc: "Sets Aurora Veil, regardless of weather.",
		viable: true,
		name: "Resonant Tone",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Icy Wind", target);
		},
		self: {
			sideCondition: 'auroraveil',
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Ice",
		contestType: "Cool",
	},
	shearpower: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		shortDesc: "Has a different effect based on trim.",
		viable: true,
		name: "Shear Power",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, slicing: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Guillotine", target);
		},
		onHit(target, source, move) {
			if (source.baseSpecies.forme === 'Heart') {
				this.heal(source.maxhp / 6, source, source, move);
			} else if (source.baseSpecies.forme === 'Star') {
				this.field.addPseudoWeather('gravity', source, source.move);
			} else if (source.baseSpecies.forme === 'Diamond') {
				source.addVolatile('focusenergy');
			} else if (source.baseSpecies.forme === 'Debutante') {
				source.addVolatile('powertrick');
			} else if (source.baseSpecies.forme === 'Matron') {
				target.addVolatile('smackdown');
			} else if (source.baseSpecies.forme === 'Dandy') {
				source.addVolatile('torment');
			} else if (source.baseSpecies.forme === 'La Reine') {
				target.addVolatile('powder');
			} else if (source.baseSpecies.forme === 'Kabuki') {
				source.addVolatile('rage');
			} else if (source.baseSpecies.forme === 'Pharaoh' && target.status === 'slp') {
				target.addVolatile('nightmare');
			} else {
				this.boost({atk: -1}, target, source);
			}
		},
		secondary: {},
		target: "allAdjacentFoes",
		type: "Normal",
	},
	triplepeck: {
		accuracy: 90,
		basePower: 25,
		category: "Physical",
		shortDesc: "Hits 3 times. First hit lowers the foe's Defense by 1 stage.",
		name: "Triple Peck",
		viable: true,
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 3,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Drill Peck", target);
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (move.hit < 2) {
					this.boost({def: -1}, target);
				}
				return false;
			},
		},
		target: "normal",
		type: "Flying",
		zMove: {basePower: 140},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},
	badomenattack: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		shortDesc: "Attack portion of Bad Omen.",
		viable: true,
		name: "Bad Omen Attack",
		pp: 10,
		priority: 0,
		flags: {allyanim: 1, futuremove: 1},
		ignoreImmunity: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'badomenattack',
				source: source,
				moveData: {
					id: 'badomenattack',
					name: "Bad Omen Attack",
					accuracy: 100,
					basePower: 100,
					category: "Physical",
					priority: 0,
					flags: {allyanim: 1, metronome: 1, futuremove: 1},
  					onPrepareHit(target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Psyshock", target);
					},
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Dark',
				},
			});
			this.add('-start', source, 'move: Bad Omen Attack');
			return this.NOT_FAIL;
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Clever",
	},
	badomen: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Switches the user out. Foe is hit by an attack 2 turns later.",
		name: "Bad Omen",
		pp: 10,
		priority: 0,
		flags: {metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Laser Focus", target);
		},
		onTry(source) {
			return !!this.canSwitch(source.side);
		},
		onHit(pokemon) {
			this.actions.useMove("Bad Omen Attack", pokemon);
		},
		selfSwitch: true,
		secondary: null,
		target: "self",
		type: "Dark",
		zMove: {effect: 'heal'},
		contestType: "Cool",
	},
	burnaway: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "Heals the user by 50% of the damage dealt.",
		name: "Burn Away",
		viable: true,
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1, metronome: 1},
		drain: [1, 2],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Ember", target);
			this.add('-anim', source, "Morning Sun", source);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Clever",
	},
	firebrand: {
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		shortDesc: "Burns the foe.",
		name: "Firebrand",
		viable: true,
		pp: 20,
		priority: 0,
		flags: {contact: 1, defrost: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Flame Charge", target);
		},
		secondary: {
			chance: 100,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Cute",
	},
	glacialroar: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Heals the user or ally's HP by 25% and boosts their Atk and Def by 1 stage.",
		name: "Glacial Roar",
		viable: true,
		pp: 15,
		priority: 0,
		flags: {snatch: 1, metronome: 1, sound: 1, allyanim: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Howl", target);
		},
		onHit(pokemon) {
			const success = !!this.boost({atk: 1, def: 1});
			return this.heal(pokemon.baseMaxhp / 4) || success;
		},
		secondary: null,
		target: "adjacentAllyOrSelf",
		type: "Ice",
	},
	leafshield: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Protects the user and bounces back status moves.",
		name: "Leaf Shield",
		viable: true,
		pp: 10,
		priority: 4,
		flags: {noassist: 1, failcopycat: 1},
		stallingMove: true,
		volatileStatus: 'leafshield',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
			pokemon.addVolatile('magiccoat');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
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
				return this.NOT_FAIL;
			},
		},
		secondary: null,
		target: "self",
		type: "Grass",
		zMove: {boost: {def: 1}},
		contestType: "Tough",
	},
	olivebranch: {
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "Switches out the user, heals the replacement's status and 1/8 of their HP.",
		name: "Olive Branch",
		viable: true,
		pp: 20,
		priority: 0,
		flags: {heal: 1, protect: 1, mirror: 1, metronome: 1},
		slotCondition: 'olivebranch',
		selfSwitch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Leaf Storm", target);
		},
	  condition: {
      onSwap(target) {
				if (!target.fainted) {
					const source = this.effectState.source;
					const damage = this.heal(target.baseMaxhp / 8, target, target);
					if (damage) this.add('-heal', target, target.getHealth, '[from] move: Olive Branch', '[of] ' + this.effectState.source);
          		target.cureStatus();
					target.side.removeSlotCondition(target, 'olivebranch');
				}
		  },
	  },
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cute",
	},
	riptide: {
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		shortDesc: "+1 Priority in Rain. 10% chance to lower the foe's Def by 1 stage.",
		name: "Riptide",
		viable: true,
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Wave Crash", target);
		},
		onModifyPriority(priority, source, target, move) {
			if (['raindance', 'primordialsea'].includes(source.effectiveWeather())) {
				return priority + 1;
			}
		},
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
    	target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	rumble: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "30% chance to deal doubled damage.",
		name: "Rumble",
		viable: true,
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Brave Bird", target);
		},
		onBasePower(basePower, pokemon) {
			if (this.randomChance(3, 10)) {
				this.attrLastMove('[anim] Supersonic Skystrike');
				this.add('-activate', pokemon, 'move: Rumble');
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Flying",
	},

// Changed Moves
	direclaw: {
		num: 827,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "50% chance to freeze, poison, or paralyze target.",
		name: "Dire Claw",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 50,
			onHit(target, source) {
				const result = this.random(3);
				if (result === 0) {
					target.trySetStatus('psn', source);
				} else if (result === 1) {
					target.trySetStatus('par', source);
				} else {
					target.trySetStatus('frz', source);
				}
			},
		},
		target: "normal",
		type: "Poison",
	},
	bittermalice: {
		num: 841,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		shortDesc: "50% frz. 2x power if target already frozen.",
		name: "Bitter Malice",
		viable: true,
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onBasePower(basePower, pokemon, target) {
			if (target.status === 'frz') {
				return this.chainModify(2);
			}
		},
		secondary: {
			chance: 50,
			status: 'frz',
		},
		target: "normal",
		type: "Ghost",
	},
	crushgrip: {
		num: 462,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			const hp = target.hp;
			const maxHP = target.maxhp;
			const bp = Math.floor(Math.floor((150 * (100 * Math.floor(hp * 4096 / maxHP)) + 2048 - 1) / 4096) / 100) || 1;
			this.debug('BP for ' + hp + '/' + maxHP + " HP: " + bp);
			return bp;
		},
		viable: true,
		category: "Physical",
		name: "Crush Grip",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 190},
		maxMove: {basePower: 140},
		contestType: "Tough",
	},
	dragoncheer: {
		num: 913,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User or Ally: Crit ratio +1, or +2 if target is Dragon type.",
		name: "Dragon Cheer",
		pp: 15,
		priority: 0,
		flags: {bypasssub: 1, allyanim: 1},
		volatileStatus: 'dragoncheer',
		condition: {
			onStart(target, source, effect) {
				if (target.volatiles['focusenergy']) return false;
				if (effect && (['costar', 'imposter', 'psychup', 'transform'].includes(effect.id))) {
					this.add('-start', target, 'move: Dragon Cheer', '[silent]');
				} else {
					this.add('-start', target, 'move: Dragon Cheer');
				}
				// Store at the start because the boost doesn't change if a Pokemon
				// Terastallizes into Dragon while having this volatile
				// Found by DarkFE:
				// https://www.smogon.com/forums/threads/scarlet-violet-battle-mechanics-research.3709545/post-9894139
				this.effectState.hasDragonType = target.hasType("Dragon");
			},
			onModifyCritRatio(critRatio, source) {
				return critRatio + (this.effectState.hasDragonType ? 2 : 1);
			},
		},
		secondary: null,
		target: "adjacentAllyOrSelf",
		type: "Dragon",
	},
	facade: {
		num: 263,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "Power doubles if user is statused.",
		name: "Facade",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onBasePower(basePower, pokemon) {
			if (pokemon.status || pokemon.hasAbility('comatose')) {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cute",
	},
	firepledge: {
		num: 519,
		accuracy: 100,
		basePower: 80,
		basePowerCallback(target, source, move) {
			if (['grasspledge', 'waterpledge'].includes(move.sourceEffect)) {
				this.add('-combine');
				return 150;
			}
			return 80;
		},
		category: "Special",
		name: "Fire Pledge",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1, pledgecombo: 1},
		onPrepareHit(target, source, move) {
			for (const action of this.queue.list as MoveAction[]) {
				if (
					!action.move || !action.pokemon?.isActive ||
					action.pokemon.fainted || action.maxMove || action.zmove
				) {
					continue;
				}
				if (action.pokemon.isAlly(source) && ['grasspledge', 'waterpledge'].includes(action.move.id)) {
					this.queue.prioritizeAction(action, move);
					this.add('-waiting', source, action.pokemon);
					return null;
				}
			}
		},
		onModifyMove(move) {
			if (move.sourceEffect === 'waterpledge') {
				move.type = 'Water';
				move.forceSTAB = true;
				move.self = {sideCondition: 'waterpledge'};
			}
			if (move.sourceEffect === 'grasspledge') {
				move.type = 'Fire';
				move.forceSTAB = true;
				move.sideCondition = 'firepledge';
			}
		},
		condition: {
			duration: 4,
			onSideStart(targetSide) {
				this.add('-sidestart', targetSide, 'Fire Pledge');
			},
			onResidualOrder: 5,
			onResidualSubOrder: 1,
			onResidual(pokemon) {
				if (!pokemon.hasType('Fire')) this.damage(pokemon.baseMaxhp / 6, pokemon);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 8,
			onSideEnd(targetSide) {
				this.add('-sideend', targetSide, 'Fire Pledge');
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	waterpledge: {
		num: 518,
		accuracy: 100,
		basePower: 80,
		basePowerCallback(target, source, move) {
			if (['firepledge', 'grasspledge'].includes(move.sourceEffect)) {
				this.add('-combine');
				return 150;
			}
			return 80;
		},
		category: "Special",
		name: "Water Pledge",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1, pledgecombo: 1},
		onPrepareHit(target, source, move) {
			for (const action of this.queue) {
				if (action.choice !== 'move') continue;
				const otherMove = action.move;
				const otherMoveUser = action.pokemon;
				if (
					!otherMove || !action.pokemon || !otherMoveUser.isActive ||
					otherMoveUser.fainted || action.maxMove || action.zmove
				) {
					continue;
				}
				if (otherMoveUser.isAlly(source) && ['firepledge', 'grasspledge'].includes(otherMove.id)) {
					this.queue.prioritizeAction(action, move);
					this.add('-waiting', source, otherMoveUser);
					return null;
				}
			}
		},
		onModifyMove(move) {
			if (move.sourceEffect === 'grasspledge') {
				move.type = 'Grass';
				move.forceSTAB = true;
				move.sideCondition = 'grasspledge';
			}
			if (move.sourceEffect === 'firepledge') {
				move.type = 'Water';
				move.forceSTAB = true;
				move.self = {sideCondition: 'waterpledge'};
			}
		},
		condition: {
			duration: 4,
			onSideStart(targetSide) {
				this.add('-sidestart', targetSide, 'Water Pledge');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 7,
			onSideEnd(targetSide) {
				this.add('-sideend', targetSide, 'Water Pledge');
			},
	  		onModifyDamage(damage, source, target, move) {
					if (target !== source && this.effectState.target.hasAlly(target)) {
	  				return this.chainModify([5324, 4096]);
	  			}
	  		},
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},
	fishiousrend: {
		inherit: true,
		isNonstandard: null,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
	},
	hardpress: {
		num: 912,
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			const hp = target.hp;
			const maxHP = target.maxhp;
			const bp = Math.floor(Math.floor((130 * (100 * Math.floor(hp * 4096 / maxHP)) + 2048 - 1) / 4096) / 100) || 1;
			this.debug('BP for ' + hp + '/' + maxHP + " HP: " + bp);
			return bp;
		},
		category: "Physical",
		name: "Hard Press",
		viable: true,
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	jumpkick: {
		num: 26,
		accuracy: 95,
		basePower: 100,
		category: "Physical",
		shortDesc: "User is hurt by 33% of its max HP if it misses.",
		isNonstandard: null,
		name: "Jump Kick",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, gravity: 1, metronome: 1},
		hasCrashDamage: true,
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 3, source, source, this.dex.conditions.get('Jump Kick'));
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
	},
	muddywater: {
		num: 330,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "30% chance to lower the foe(s) SpA.",
		name: "Muddy Water",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		secondary: {
			chance: 30,
			boosts: {
				spa: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Water",
		contestType: "Tough",
	},
	nightdaze: {
		num: 539,
		accuracy: 90,
		basePower: 100,
		category: "Special",
		shortDesc: "Clears weather if it hits.",
		name: "Night Daze",
		viable: true,
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit() {
			this.field.clearWeather();
		},
		onAfterSubDamage() {
			this.field.clearWeather();
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Dark",
		contestType: "Cool",
	},
	powershift: {
		num: 829,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Switches user's Atk & Def and its SpA & SpD.",
		isNonstandard: null,
		name: "Power Shift",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
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
	},
	psychicnoise: {
		num: 917,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Psychic Noise",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1},
		secondary: {
			chance: 100,
			volatileStatus: 'healblock',
		},
		target: "allAdjacentFoes",
		type: "Psychic",
	},
	purify: {
		num: 685,
		accuracy: true,
		basePower: 0,
		category: "Status",
		isNonstandard: null,
		name: "Purify",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, heal: 1, metronome: 1},
		onHit(target, source) {
			if (!target.cureStatus() && !target.hasType('Shadow')) {
				this.add('-fail', source);
				this.attrLastMove('[still]');
				return this.NOT_FAIL;
			}
			target.setType(target.getTypes(true).map(type => type === "Shadow" ? "???" : type));
			this.add('-start', target, 'typechange', target.getTypes().join('/'), '[from] move: Purify');
			this.heal(Math.ceil(source.maxhp * 0.5), source);
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Beautiful",
	},
	ragefist: {
		num: 889,
		accuracy: 100,
		basePower: 50,
		basePowerCallback(pokemon) {
			return Math.min(200, 50 + 50 * pokemon.timesAttacked);
		},
		shortDesc: "+50 power for each time user was hit. Max 3 hits.",
		category: "Physical",
		name: "Rage Fist",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		onHit(target, source, move) {
			let bp = Math.min(200, 50 + 50 * source.timesAttacked);
			this.add('-message', `Rage Fist currently has a BP of ${bp}!`);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	supercellslam: {
		num: 916,
		accuracy: 95,
		basePower: 100,
		category: "Physical",
		shortDesc: "User's Atk is lowered by 2 stages if it misses.",
		name: "Supercell Slam",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		hasCrashDamage: true,
		onMoveFail(target, source, move) {
			this.boost({atk: -2}, source, source, this.dex.conditions.get('Supercell Slam'));
		},
		secondary: null,
		target: "normal",
		type: "Electric",
	},
	tripledive: {
		inherit: true,
		basePower: 40,
	},
	triplekick: {
		num: 167,
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		category: "Physical",
		name: "Triple Kick",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		multihit: 3,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMove: {basePower: 120},
		maxMove: {basePower: 80},
		contestType: "Cool",
	},
	upperhand: {
		num: 918,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		name: "Upper Hand",
		pp: 15,
		priority: 3,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryHit(target, pokemon) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || move.priority <= 0.1) {
				return false;
			}
		},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Fighting",
	},
	disable: {
		num: 50,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Disable",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, bypasssub: 1},
		volatileStatus: 'disable',
		onTryHit(target) {
			if (!target.lastMove || target.lastMove.isZ || target.lastMove.isMax || target.lastMove.id === 'struggle') {
				return false;
			}
		},
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (effect && effect.id === 'rockwall') {
					return 3;
				}
				return 5;
			},
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(pokemon, source, effect) {
				// The target hasn't taken its turn, or Cursed Body activated and the move was not used through Dancer or Instruct
				if (
					this.queue.willMove(pokemon) ||
					(pokemon === this.activePokemon && this.activeMove && !this.activeMove.isExternal)
				) {
					this.effectState.duration--;
				}
				if (!pokemon.lastMove) {
					this.debug(`Pokemon hasn't moved yet`);
					return false;
				}
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id === pokemon.lastMove.id) {
						if (!moveSlot.pp) {
							this.debug('Move out of PP');
							return false;
						}
					}
				}
				if (effect.effectType === 'Ability') {
					this.add('-start', pokemon, 'Disable', pokemon.lastMove.name, '[from] ability: Cursed Body', '[of] ' + source);
				} else {
					this.add('-start', pokemon, 'Disable', pokemon.lastMove.name);
				}
				this.effectState.move = pokemon.lastMove.id;
			},
			onResidualOrder: 17,
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Disable');
			},
			onBeforeMovePriority: 7,
			onBeforeMove(attacker, defender, move) {
				if (!move.isZ && move.id === this.effectState.move) {
					this.add('cant', attacker, 'Disable', move);
					return false;
				}
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id === this.effectState.move) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	zippyzap: {
		num: 729,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		shortDesc: "Nearly always goes first. Always crits.",
		isNonstandard: null,
		name: "Zippy Zap",
		viable: true,
		pp: 10,
		priority: 2,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Volt Tackle", target);
		},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},

	// Undexited Moves	
	boltbeak: {
		inherit: true,
		isNonstandard: null,
	},
	meteorassault: {
		inherit: true,
		isNonstandard: null,
	},
	refresh: {
		inherit: true,
		isNonstandard: null,
	},
	snatch: {
		inherit: true,
		isNonstandard: null,
	},
	naturepower: {
		inherit: true,
		isNonstandard: null,
	},
	poweruppunch: {
		inherit: true,
		isNonstandard: null,
	},
	vcreate: {
		inherit: true,
		isNonstandard: null,
	},
	searingshot: {
		inherit: true,
		isNonstandard: null,
	},
	boneclub: {
		inherit: true,
		isNonstandard: null,
	},
	bonemerang: {
		inherit: true,
		isNonstandard: null,
	},
	shelltrap: {
		inherit: true,
		isNonstandard: null,
	},
	spikecannon: {
		inherit: true,
		isNonstandard: null,
	},
	plasmafists: {
		inherit: true,
		isNonstandard: null,
	},
	iondeluge: {
		inherit: true,
		isNonstandard: null,
	},
	
	// Shadow Moves
	shadowaura: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Protects from moves. Non-Shadow moves: loses 1/8 max HP.",
		viable: true,
		name: "Shadow Aura",
		pp: 10,
		priority: 4,
		flags: {noassist: 1, failcopycat: 1},
		stallingMove: true,
		volatileStatus: 'shadowaura',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
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
				if (move.type !== 'Shadow') {
					this.damage(source.baseMaxhp / 8, source, target);
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && move.type !== 'Shadow') {
					this.damage(source.baseMaxhp / 8, source, target);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Shadow",
		zMove: {boost: {def: 1}},
		contestType: "Tough",
	},
	shadowblitz: {
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		shortDesc: "Usually moves first.",
		viable: true,
		name: "Shadow Blitz",
		pp: 30,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Quick Attack", target);
		},
		secondary: null,
		target: "normal",
		type: "Shadow",
		contestType: "Cool",
	},
	shadowbreak: {
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		shortDesc: "Breaks the foe's Reflect/Light Screen/Aurora Veil.",
		viable: true,
		name: "Shadow Break",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Brick Break", target);
		},
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			pokemon.side.removeSideCondition('reflect');
			pokemon.side.removeSideCondition('lightscreen');
			pokemon.side.removeSideCondition('auroraveil');
		},
		secondary: null,
		target: "normal",
		type: "Shadow",
		contestType: "Cool",
	},
	shadowcharge: {
		accuracy: 90,
		basePower: 95,
		category: "Physical",
		shortDesc: "Deals 1.5x damage to a switching in opponent.",
		viable: true,
		name: "Shadow Charge",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Tackle", target);
		},
		onBasePower(basePower, attacker, defender) {
			if (!defender.activeTurns) {
				return this.chainModify(1.5);
			}
		},
		secondary: null,
		target: "normal",
		type: "Shadow",
		contestType: "Cool",
	},
	shadowcrusher: {
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		shortDesc: "Hits twice. Lowers the target's Def after each hit.",
		isViable: true,
		name: "Shadow Crusher",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 2,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Crush Claw", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Shadow",
		contestType: "Cool",
	},
	shadowdance: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Raises the user's SpA and Speed by 1.",
		isViable: true,
		name: "Shadow Dance",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Dragon Dance", target);
		},
		boosts: {
			spa: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Shadow",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cool",
	},
	shadowdarts: {
		accuracy: 100,
		basePower: 45,
		category: "Special",
		shortDesc: "Hits twice. Doubles: Tries to hit each foe once.",
		isViable: true,
		name: "Shadow Darts",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, noparentalbond: 1},
		multihit: 2,
		smartTarget: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Dragon Darts", target);
		},
		secondary: null,
		target: "normal",
		type: "Shadow",
		maxMove: {basePower: 130},
	},
	shadowdown: {
		num: 103,
		accuracy: 85,
		basePower: 0,
		category: "Status",
		shortDesc: "Lowers the foe(s)'s Defense by 2 stages.",
		isViable: true,
		name: "Shadow Down",
		pp: 5,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, allyanim: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Snarl", target);
		},
		boosts: {
			def: -2,
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Shadow",
		zMove: {boost: {atk: 1}},
		contestType: "Clever",
	},
	shadowechoes: {
		accuracy: 100,
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			if (!pokemon.volatiles['shadowechoes'] || move.hit === 1) {
				pokemon.addVolatile('shadowechoes');
			}
			const bp = this.clampIntRange(move.basePower * pokemon.volatiles['shadowechoes'].multiplier, 1, 160);
			this.debug('BP: ' + bp);
			return bp;
		},
		category: "Special",
		shortDesc: "BP doubles on consecutive uses.",
		isViable: true,
		name: "Shadow Echoes",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Hyper Voice", target);
		},
		condition: {
			duration: 2,
			onStart() {
				this.effectState.multiplier = 1;
			},
			onRestart() {
				if (this.effectState.multiplier < 4) {
					this.effectState.multiplier <<= 1;
				}
				this.effectState.duration = 2;
			},
		},
		secondary: null,
		target: "normal",
		type: "Shadow",
		contestType: "Beautiful",
	},
	shadowend: {
		accuracy: 90,
		basePower: 150,
		category: "Physical",
		shortDesc: "User loses 50% max HP.",
		isViable: true,
		name: "Shadow End",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		mindBlownRecoil: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Poltergeist", target);
		},
		onAfterMove(pokemon, target, move) {
			if (move.mindBlownRecoil && !move.multihit) {
				const hpBeforeRecoil = pokemon.hp;
				this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.conditions.get('Shadow End'), true);
				if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
					this.runEvent('EmergencyExit', pokemon, pokemon);
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Shadow",
	},
	shadowhalf: {
		accuracy: true,
		basePower: 0,
		damageCallback(pokemon, target) {
			return this.clampIntRange(Math.floor(target.getUndynamaxedHP() / 2), 1);
		},
		category: "Special",
		shortDesc: "All Pokemon on the field lose 50% of their current HP.",
		isViable: true,
		name: "Shadow Half",
		pp: 5,
		priority: 0,
		flags: {bypasssub: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Gravity", source);
		},
		self: {
			onHit(pokemon, source, move) {
				this.damage(source.baseMaxhp / 2, source, pokemon);
			},
		},
		secondary: null,
		target: "allAdjacent",
		type: "Shadow",
		zMove: {effect: 'heal'},
		contestType: "Beautiful",
	},
	shadowhold: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Traps the foe(s).",
		isViable: true,
		name: "Shadow Hold",
		pp: 5,
		priority: 0,
		flags: {reflectable: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Block", target);
		},
		onHit(target, source, move) {
			return target.addVolatile('trapped', source, move, 'trapper');
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Shadow",
		zMove: {boost: {def: 1}},
		contestType: "Cute",
	},
	shadowjuggle: {
		accuracy: 100,
		basePower: 0,
		damage: 35,
		category: "Physical",
		shortDesc: "Deals 35 damage. Hits 3 times.",
		isViable: true,
		name: "Shadow Juggle",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		multihit: 3,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Seismic Toss", target);
		},
		onModifyMove(move, pokemon) {
			if (this.gameType !== 'doubles') {
				move.damage = 20;
			}
		},
		secondary: null,
		target: "normal",
		type: "Shadow",
		maxMove: {basePower: 75},
		contestType: "Tough",
	},
	shadowleech: {
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		shortDesc: "Heals the user by 50% of the damage dealt.",
		isViable: true,
		name: "Shadow Leech",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1, bite: 1},
		drain: [1, 2],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Leech Life", target);
		},
		secondary: null,
		target: "normal",
		type: "Shadow",
		contestType: "Clever",
	},
	shadowlove: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Swaps all stat changes with target.",
		isViable: true,
		name: "Shadow Love",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, bypasssub: 1, allyanim: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Heart Swap", target);
		},
		onHit(target, source) {
			const targetBoosts: SparseBoostsTable = {};
			const sourceBoosts: SparseBoostsTable = {};

			let i: BoostID;
			for (i in target.boosts) {
				targetBoosts[i] = target.boosts[i];
				sourceBoosts[i] = source.boosts[i];
			}

			target.setBoost(sourceBoosts);
			source.setBoost(targetBoosts);

			this.add('-swapboost', source, target, '[from] move: Shadow Love');
		},
		secondary: null,
		target: "normal",
		type: "Shadow",
		zMove: {effect: 'crit2'},
		contestType: "Clever",
	},
	shadowmist: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "Sets Mist and lowers the foe(s) evasion by 2 stages.",
		isViable: true,
		name: "Shadow Mist",
		pp: 30,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Haze", target);
		},
		boosts: {
			evasion: -2,
		},
		self: {
			sideCondition: 'mist',
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Shadow",
		zMove: {boost: {accuracy: 1}},
		contestType: "Cute",
	},
	shadowpanic: {
		accuracy: 90,
		basePower: 0,
		category: "Status",
		shortDesc: "Confuses the foe(s).",
		isViable: true,
		name: "Shadow Panic",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1},
		volatileStatus: 'confusion',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Confide", target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Shadow",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
	shadowpounce: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "2x damage on Shadow Pokemon.",
		isViable: true,
		name: "Shadow Pounce",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Lunge", target);
		},
		onBasePower(basePower, source, target, move) {
			if (target.hasItem('shadowadapter')) {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Shadow",
		contestType: "Beautiful",
	},
	shadowchaser: {
		accuracy: true,
		basePower: 90,
		category: "Physical",
		shortDesc: "2x damage on Shadow Pokemon, as well as Zangoose or Seviper, depending on the user.",
		isViable: true,
		name: "Shadow Chaser",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Extreme Speed", target);
		},
		onBasePower(basePower, source, target, move) {
			if (source.baseSpecies.baseSpecies === 'Zangoose' && target.baseSpecies.baseSpecies === 'Seviper' || 
				source.baseSpecies.baseSpecies === 'Seviper' && target.baseSpecies.baseSpecies === 'Zangoose' ||
				target.hasItem('shadowadapter')) {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Shadow",
		contestType: "Beautiful",
	},
	shadowpress: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "Uses user's SpD stat as SpA in damage calculation.",
		isViable: true,
		name: "Shadow Press",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		overrideOffensiveStat: 'spd',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Night Shade", target);
		},
		secondary: null,
		target: "normal",
		type: "Shadow",
	},
	shadowrage: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		shortDesc: "Lasts 2-3 turns. Confuses the user afterwards.",
		isViable: true,
		name: "Shadow Rage",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, failinstruct: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Outrage", target);
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
		type: "Shadow",
		contestType: "Cool",
	},
	shadowrave: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "Hits all adjacent foes.",
		isViable: true,
		name: "Shadow Rave",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Fiery Wrath", target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Shadow",
		contestType: "Cool",
	},
	shadowrush: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "No additional effect.",
		isViable: true,
		name: "Shadow Rush",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Double-Edge", target);
		},
		secondary: null,
		target: "normal",
		type: "Shadow",
		contestType: "Tough",
	},
	shadowsights: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User's attacks ignore abilities and immunities.",
		isViable: true,
		name: "Shadow Sights",
		pp: 10,
		priority: 0,
		flags: {snatch: 1},
		volatileStatus: 'shadowsights',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Laser Focus", target);
		},
		condition: {
			onStart(target, source, effect) {
				this.add('-start', target, 'move: Shadow Sights');
				this.add('-message', `${target.name} is hyperfocusing on the foe's shadows!`);
			},			
			onModifyMovePriority: -5,
			onModifyMove(move) {
				if (!move.ignoreImmunity) move.ignoreImmunity = {};
				if (move.ignoreImmunity !== true) {
					move.ignoreImmunity = true;
				}
				move.ignoreAbility = true;
			},
		},
		secondary: null,
		target: "self",
		type: "Shadow",
		zMove: {boost: {accuracy: 1}},
		contestType: "Cool",
	},
	shadowshards: {
		accuracy: 100,
		basePower: 20,
		category: "Physical",
	  	shortDesc: "Hits 2-5 times. High crit ratio.",
		viable: true,
		name: "Shadow Shards",
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		multihit: [2, 5],
		critRatio: 2,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Spike Cannon", target);
		},
		secondary: null,
		target: "normal",
		type: "Shadow",
		zMove: {basePower: 140},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},
	shadowshatter: {
		accuracy: 90,
		basePower: 130,
		category: "Special",
	  	shortDesc: "Lowers the user's Sp. Atk by 2.",
		viable: true,
		name: "Shadow Shatter",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Diamond Storm", target);
		},
		self: {
			boosts: {
				spa: -2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Shadow",
		contestType: "Beautiful",
	},
	shadowshed: {
		accuracy: true,
		basePower: 0,
		category: "Status",
	  	shortDesc: "User: +1 Acc. Clears all screens/hazards/terrains.",
		viable: true,
		name: "Shadow Shed",
		pp: 15,
		priority: 0,
		flags: {},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Minimize", target);
		},
		onHit(pokemon) {
			let success = false;
			const removeAll = ['reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist',
									 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			const sides = [pokemon.side, ...pokemon.side.foeSidesWithConditions()];
			for (const side of sides) {
				for (const sideCondition of removeAll) {
					if (side.removeSideCondition(sideCondition)) {
						this.add('-sideend', side, this.dex.conditions.get(sideCondition).name);
						success = true;
					}
				}
			}
			this.field.clearTerrain();
			if (success) this.add('-activate', pokemon, 'move: Shadow Shed');
			return !!this.boost({accuracy: 1}, pokemon, pokemon, null, false, true) || success;
		},
		secondary: null,
		target: "self",
		type: "Shadow",
	},
	shadowsky: {
		accuracy: true,
		basePower: 0,
		category: "Status",
	  	shortDesc: "Removes weather and damages non-Shadow foes for 5 turns.",
		viable: true,
		name: "Shadow Sky",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, snatch: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Rain Dance", source);
		},
		onHit(target, source, move) {
			this.field.clearWeather();
			for (const side of source.side.foeSidesWithConditions()) {
				side.addSideCondition('shadowsky');
			}
		},
		condition: {
			duration: 5,
			onSideStart(targetSide) {
				this.add('-sidestart', targetSide, 'Shadow Sky');
			},
			onResidualOrder: 5,
			onResidualSubOrder: 1,
			onResidual(target) {
				if (!target.hasType('Shadow')) this.damage(target.baseMaxhp / 8, target);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 11,
			onSideEnd(targetSide) {
				this.add('-sideend', targetSide, 'Shadow Sky');
			},
		},
		secondary: null,
		target: "all",
		type: "Shadow",
		zMove: {boost: {accuracy: 1}},
		contestType: "Cool",
	},
	shadowspores: {
		accuracy: 100,
		basePower: 75,
		category: "Special",
	  	shortDesc: "Applies the Powder effect for the rest of the turn.",
		viable: true,
		name: "Shadow Spores",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, powder: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Stun Spore", target);
		},
		secondary: {
			chance: 100,
			volatileStatus: 'powder',
		},
		target: "normal",
		type: "Shadow",
	},
	shadowstorm: {
		accuracy: 80,
		basePower: 110,
		category: "Special",
	  	shortDesc: "30% chance to lower foe(s) SpA by 1 stage.",
		viable: true,
		name: "Shadow Storm",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Bleakind Storm", target);
		},
		secondary: {
			chance: 30,
			boosts: {
				spa: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Shadow",
	},
	shadowwave: {
		accuracy: true,
		basePower: 60,
		category: "Special",
	  	shortDesc: "Lowers the foe(s)'s Speed by 1. Can't miss.",
		viable: true,
		name: "Shadow Wave",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Shock Wave", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Shadow",
		contestType: "Beautiful",
	},
	shadowblast: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
	  	shortDesc: "High critical hit ratio.",
		viable: true,
		name: "Shadow Blast",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1, wind: 1},
		critRatio: 2,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Acid Downpour", target);
			this.add('-anim', source, "Aeroblast", target);
		},
		secondary: null,
		target: "any",
		type: "Shadow",
		contestType: "Cool",
	},
	shadowbolt: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
	  	shortDesc: "20% chance to paralyze the foe.",
		viable: true,
		name: "Shadow Bolt",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Thunder", target);
		},
		secondary: {
			chance: 20,
			status: 'par',
		},
		target: "normal",
		type: "Shadow",
		contestType: "Cool",
	},
	shadowchill: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
	  	shortDesc: "20% chance to freeze the foe.",
		viable: true,
		name: "Shadow Chill",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Sheer Cold", target);
		},
		secondary: {
			chance: 20,
			status: 'frz',
		},
		target: "normal",
		type: "Shadow",
		contestType: "Cool",
	},
	shadowfire: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
	  	shortDesc: "20% chance to burn the foe.",
		viable: true,
		name: "Shadow Fire",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Fire Blast", target);
		},
		secondary: {
			chance: 20,
			status: 'brn',
		},
		target: "normal",
		type: "Shadow",
		contestType: "Cool",
	},
	shadowgrip: {
		accuracy: 80,
		basePower: 100,
		category: "Physical",
	  	shortDesc: "Traps and damages the foe for 5 turns.",
		viable: true,
		name: "Shadow Grip",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		volatileStatus: 'partiallytrapped',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Bind", target);
		},
		secondary: null,
		target: "normal",
		type: "Shadow",
		contestType: "Tough",
	},
	shadowhammer: {
		accuracy: 100,
		basePower: 145,
		category: "Physical",
	  	shortDesc: "Cannot be selected the turn after it's used.",
		viable: true,
		name: "Shadow Hammer",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, cantusetwice: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Gigaton Hammer", target);
		},
		secondary: null,
		target: "normal",
		type: "Shadow",
	},
	shadoweclipse: {
		accuracy: true,
		basePower: 0,
		category: "Status",
	  	shortDesc: "User: +2 Atk/SpA/Spe, can't use Shadow moves.",
		viable: true,
		name: "Shadow Eclipse",
		pp: 5,
		priority: 0,
		flags: {snatch: 1},
		volatileStatus: 'shadoweclipse',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Blood Moon", target);
		},
		boosts: {
			atk: 2,
			spa: 2,
			spe: 2,
		},
		condition: {
			noCopy: true,
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).type['Shadow']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Shadow",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Tough",
	},
	shadowflood: {
		accuracy: 100,
		basePower: 50,
		category: "Special",
	  	shortDesc: "Sets a swamp on the foe's side of the field.",
		viable: true,
		name: "Shadow Flood",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Mortal Spin", target);
		},
		onHit(target, source, move) {
			for (const side of source.side.foeSidesWithConditions()) {
				side.addSideCondition('grasspledge');
			}
		},
		secondary: {},
		target: "allAdjacentFoes",
		type: "Shadow",
	},
	shadowjuice: {
		accuracy: true,
		basePower: 0,
		category: "Status",
	  	shortDesc: "Heals the user by 33% of its max HP, sets Aqua Ring.",
		viable: true,
		name: "Shadow Juice",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 3],
		volatileStatus: 'aquaring',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Life Dew", target);
		},
		secondary: null,
		target: "self",
		type: "Shadow",
	},
	shadowtwirl: {
		accuracy: true,
		basePower: 0,
		category: "Status",
	  	shortDesc: "Uses a random Shadow move.",
		viable: true,
		name: "Shadow Twirl",
		pp: 10,
		priority: 0,
		flags: {failencore: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failmimic: 1, failinstruct: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
			this.add('-anim', source, "Metronome", target);
		},
		onHit(target, source, effect) {
			const moves = this.dex.moves.all().filter(move => (
				(![2, 4].includes(this.gen) || !source.moves.includes(move.id)) &&
				(!move.isNonstandard || move.isNonstandard === 'Unobtainable') &&
				move.type === 'Shadow'
			));
			let randomMove = '';
			if (moves.length) {
				moves.sort((a, b) => a.num - b.num);
				randomMove = this.sample(moves).id;
			}
			if (!randomMove) return false;
			source.side.lastSelectedMove = this.toID(randomMove);
			this.actions.useMove(randomMove, target);
		},
		secondary: null,
		target: "self",
		type: "Shadow",
		contestType: "Cute",
	},	
};
