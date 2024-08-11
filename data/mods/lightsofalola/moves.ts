export const Moves: {[k: string]: ModdedMoveData} = {
// New Moves 
	chemicalplant: {
		accuracy: 100,
		basePower: 55,
		category: "Special",
		shortDesc: "Removes the foe's item. Toxics the foe if they had a plant-based item.",
		viable: true,
		name: "Chemical Plant",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Magical Leaf", target);
		},
		onAfterHit(target, source) {
			if (source.hp) {
				const item = target.takeItem();
				if (item) {
					if (item.isBerry || ['absorbbulb', 'berryjuice', 'bigroot', 'electricseed', 'galaricacuff', 'galaricawreath',
					  'grassyseed', 'leftovers', 'mentalherb', 'miracleseed', 'mirrorherb', 'mistyseed', 'powerherb', 'psychicseed',
					  'sweetapple', 'tartapple', 'whiteherb', 'syrupyapple', 'cloversweet', 'leek', 'lovesweet',
					  'ribbonsweet', 'starsweet', 'strawberrysweet', 'whippeddream', 'roomservice'].includes(item.id)) {
							target.trySetStatus('tox', source);
							this.add('-message', `${target.name}'s item rotted and poisoned it!`);
					}
					this.add('-enditem', target, item.name, '[from] move: Chemical Plant', '[of] ' + source);
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
    	shortDesc: "Hits 2-5 times in one turn.",
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
			const bp = 15 + Math.floor(currentSpecies.baseStats.atk / 10);
			this.debug('BP for ' + currentSpecies.name + ' hit: ' + bp);
			return bp;
		},
    	shortDesc: "All fainted allies aid in damaging the target.",
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
			move.allies = pokemon.side.pokemon.filter(ally => ally === pokemon || ally.fainted);
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
					if (['gmaxoneblow', 'gmaxrapidflow', 'letssnuggleforever'].includes(move.id)) return;
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
		basePower: 85,
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
		zMove: {boost: {speed: 1}},
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
	workaround: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User's attacks ignore immunities until they switch.",
		isViable: true,
		name: "Work Around",
		pp: 5,
		priority: 0,
		flags: {snatch: 1},
		volatileStatus: 'workaround',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Nasty Plot", target);
		},
		condition: {
			onStart(target, source, effect) {
				this.add('-start', target, 'move: Work Around');
				this.add('-message', `${target.name} is thinking of ways to get around the foe's natural defenses!`);
			},			
			onModifyMovePriority: -5,
			onModifyMove(move) {
				if (!move.ignoreImmunity) move.ignoreImmunity = {};
				if (move.ignoreImmunity !== true) {
					move.ignoreImmunity = true;
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {boost: {accuracy: 1}},
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
		shortDesc: "Boosts the user's highest stat by 2 stages.",
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
			this.add('-anim', source, "Quiver Dance", target);
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
	lyricalaurora: {
		accuracy: 100,
		basePower: 60,
		category: "Special",
		shortDesc: "Sets Aurora Veil, regardless of weather.",
		viable: true,
		name: "Lyrical Aurora",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Perish Song", target);
			this.add('-anim', source, "Sheer Cold", target);
			this.add('-anim', source, "Aurora Veil", source);
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
				this.damage(target.maxhp / 16, target, source, move);
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
    	noSketch: true,
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
			this.add('-message', `${pokemon.name} forsees a disaster!`);
		},
		selfSwitch: true,
		secondary: null,
		target: "self",
		type: "Dark",
		zMove: {effect: 'healreplacement'},
		contestType: "Cool",
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
	alphahelix: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Heals the team's status and 25% of the user's HP.",
		name: "Alpha Helix",
    	viable: 1,
		pp: 10,
		priority: 0,
		flags: {snatch: 1, distance: 1, bypasssub: 1, metronome: 1, heal: 1},
		heal: [1, 4],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Life Dew", target);
			this.add('-anim', source, "Morning Sun", target);
		},
		onHit(target, source) {
			this.add('-activate', source, 'move: Alpha Helix');
			let success = false;
			const allies = [...target.side.pokemon, ...target.side.allySide?.pokemon || []];
			for (const ally of allies) {
				if (ally !== source) continue;
				if (ally.cureStatus()) success = true;
			}
			return success;
		},
		secondary: null,
		type: "Water",
		target: "allyTeam",
		zMove: {boost: {atk: 1, spa: 1, spe: 1}},
	},
	fightlight: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "Gives the user the Laser Focus effect after dealing damage.",
		viable: true,
		name: "Fight Light",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Luster Purge", target);
			this.add('-anim', source, "Bulk Up", source);
		},
		self: {
			volatileStatus: 'laserfocus',
		},
		secondary: null,
		target: "any",
		type: "Fighting",
		contestType: "Beautiful",
	},
	fragilegale: {
		accuracy: 100,
		basePower: 85,
		category: "Special",
		shortDesc: "Foe can't use Wind moves for 2 turns.",
    	viable: true,
		name: "Fragile Gale",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1, metronome: 1},
		ignoreAbility: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Gust", target);
		},
		condition: {
			duration: 2,
			onStart(target) {
				this.add('-start', target, 'Fragile Gale', '[silent]');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).flags['wind']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (!move.isZ && !move.isMax && move.flags['wind']) {
					this.add('cant', pokemon, 'move: Fragile Gale');
					return false;
				}
			},
			onResidualOrder: 22,
			onEnd(target) {
				this.add('-end', target, 'Fragile Gale', '[silent]');
			},
		},
		secondary: {
			chance: 100,
			onHit(target) {
				target.addVolatile('fragilegale');
			},
		},
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
	omegadome: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "User recovers 50% of the damage dealt.",
    	viable: true,
		name: "Omega Dome",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1, metronome: 1, slicing: 1},
		drain: [1, 2],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bitter Blade", target);
		},
		secondary: null,
		target: "normal",
		type: "Rock",
	},
	silkblanket: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Protects user's side from hazards for 7 turns (10 with Destiny Knot).",
    	viable: true,
		name: "Silk Blanket",
		pp: 25,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sticky Web", target);
		},
		sideCondition: 'silkblanket',
		condition: {
			duration: 7,
			durationCallback(target, source, effect) {
				if (source?.hasItem('destinyknot')) {
					return 10;
				}
				return 7;
			},
			// Hazard immunity implemented in the hazard moves themselves
			onSideStart(side) {
				this.add('-sidestart', side, 'Silk Blanket');
				this.add('-message', `A soft blanket was laid across this side fo the field!`);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 1,
			onSideEnd(side) {
				this.add('-sideend', side, 'Silk Blanket');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Bug",
		zMove: {boost: {spd: 1}},
		contestType: "Clever",
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
		zMove: {effect: 'crit2'},
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
		zMove: {boost: {atk: 1, spa: 1}},
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
		inherit: true,
		isNonstandard: null,
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
		shortDesc: "User's Atk is lowered by 3 stages if it misses.",
		name: "Supercell Slam",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		hasCrashDamage: true,
		onMoveFail(target, source, move) {
			this.boost({atk: -3}, source, source, this.dex.conditions.get('Supercell Slam'));
		},
		secondary: null,
		target: "normal",
		type: "Electric",
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
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots') || pokemon.side.sideConditions['silkblanket']) return;
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
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || pokemon.side.sideConditions['silkblanket']) return;
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
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots') || pokemon.side.sideConditions['silkblanket']) return;
				this.add('-activate', pokemon, 'move: Sticky Web');
				this.boost({spe: -1}, pokemon, this.effectState.source, this.dex.getActiveMove('stickyweb'));
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
				} else if (pokemon.hasType('Steel') || pokemon.hasItem('heavydutyboots') || pokemon.side.sideConditions['silkblanket']) {
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
	rapidspin: {
		num: 229,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Rapid Spin",
		pp: 40,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'silkblanket'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'silkblanket'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
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
		type: "Normal",
		contestType: "Cool",
	},
	terablast: {
		num: 851,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		shortDesc: "Physical if user's Atk > Sp. Atk.",
		name: "Tera Blast",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, mustpressure: 1},
		onPrepareHit(target, source, move) {
			if (source.terastallized) {
				this.attrLastMove('[anim] Tera Blast ' + source.teraType);
			}
		},
		onModifyType(move, pokemon, target) {
			if (pokemon.terastallized) {
				move.type = pokemon.teraType;
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) {
				move.category = 'Physical';
			}
			if (pokemon.terastallized === 'Stellar') {
				move.self = {boosts: {atk: -1, spa: -1}};
			}
		},
		secondary: null,
		target: "normal",
		type: "Stellar",
	},

	// Undexited Moves	
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
	mindblown: {
		inherit: true,
		isNonstandard: null,
	},
	kinesis: {
		inherit: true,
		isNonstandard: null,
	},
	thousandwaves: {
		inherit: true,
		isNonstandard: null,
	},
	thousandarrows: {
		inherit: true,
		isNonstandard: null,
	},
	coreenforcer: {
		inherit: true,
		isNonstandard: null,
	},
	landswrath: {
		inherit: true,
		isNonstandard: null,
	},
	spectralthief: {
		inherit: true,
		isNonstandard: null,
	},
	naturesmadness: {
		inherit: true,
		isNonstandard: null,
	},
	xscissor: {
		num: 404,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "High critical hit ratio.",
		name: "X-Scissor",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Cool",
	},
	dragonclaw: {
		num: 337,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "High critical hit ratio.",
		name: "Dragon Claw",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Cool",
	},
	defog: {
		num: 432,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Defog",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, metronome: 1, wind: 1},
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'silkblanket', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'silkblanket',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.conditions.get(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			this.field.clearTerrain();
			return success;
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		zMove: {boost: {accuracy: 1}},
		contestType: "Cool",
	},
	multiattack: {
		inherit: true,
		isNonstandard: null,
	},
	lovelykiss: {
		inherit: true,
		isNonstandard: null,
	},
	shadowbone: {
		inherit: true,
		isNonstandard: null,
	},
	nightmare: {
		inherit: true,
		isNonstandard: null,
	},
	mortalspin: {
		num: 866,
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		name: "Mortal Spin",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Mortal Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Mortal Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Mortal Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'silkblanket'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Mortal Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		secondary: {
			chance: 100,
			status: 'psn',
		},
		target: "allAdjacentFoes",
		type: "Poison",
	},

// Z-Moves
	"10000000voltthunderbolt": {
		num: 719,
		accuracy: true,
		basePower: 190,
		category: "Special",
		isNonstandard: null,
		name: "10,000,000 Volt Thunderbolt",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "pikashuniumz",
		critRatio: 3,
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	catastropika: {
		num: 658,
		accuracy: true,
		basePower: 190,
		category: "Physical",
		isNonstandard: null,
		name: "Catastropika",
		pp: 1,
		priority: 0,
		flags: {contact: 1},
		isZ: "pikaniumz",
		critRatio: 3,
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	stokedsparksurfer: {
		num: 700,
		accuracy: true,
		basePower: 170,
		category: "Special",
		shortDesc: "Turns Normal moves into Electric moves for the rest of the turn.",
		isNonstandard: null,
		name: "Stoked Sparksurfer",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "aloraichiumz",
		pseudoWeather: 'iondeluge',
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	extremeevoboost: {
		num: 702,
		accuracy: true,
		basePower: 0,
		category: "Status",
		isNonstandard: null,
		name: "Extreme Evoboost",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "eeviumz",
		boosts: {
			atk: 2,
			def: 2,
			spa: 2,
			spd: 2,
			spe: 2,
		},
		secondary: null,
		target: "self",
		type: "Normal",
		contestType: "Beautiful",
	},
	pulverizingpancake: {
		num: 701,
		accuracy: true,
		basePower: 180,
		category: "Physical",
		shortDesc: "Paralyzes the foe.",
		isNonstandard: null,
		name: "Pulverizing Pancake",
		pp: 1,
		priority: 0,
		flags: {contact: 1},
		isZ: "snorliumz",
		secondary: {
			chance: 100,
			status: 'par',
		},
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	genesissupernova: {
		num: 703,
		accuracy: true,
		basePower: 170,
		category: "Special",
		isNonstandard: null,
		name: "Genesis Supernova",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "mewniumz",
		secondary: {
			chance: 100,
			self: {
				onHit() {
					this.field.setTerrain('psychicterrain');
				},
			},
		},
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	sinisterarrowraid: {
		num: 695,
		accuracy: true,
		basePower: 170,
		category: "Physical",
		shortDesc: "Traps the foe.",
		isNonstandard: null,
		name: "Sinister Arrow Raid",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "decidiumz",
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},
	maliciousmoonsault: {
		num: 696,
		accuracy: true,
		basePower: 170,
		category: "Physical",
		shortDesc: "Sets Lucky Chant for 5 turns.",
		isNonstandard: null,
		name: "Malicious Moonsault",
		pp: 1,
		priority: 0,
		flags: {contact: 1},
		isZ: "inciniumz",
		self: {
			sideCondition: 'luckychant',
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	oceanicoperetta: {
		num: 697,
		accuracy: true,
		basePower: 170,
		category: "Special",
		shortDesc: "Heals the party's status conditions.",
		isNonstandard: null,
		name: "Oceanic Operetta",
		pp: 1,
		priority: 0,
		flags: {sound: 1},
		isZ: "primariumz",
		self: {
			onHit(pokemon, source, move) {
				this.add('-activate', source, 'move: Aromatherapy');
				for (const ally of source.side.pokemon) {
					if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
						continue;
					}
					ally.cureStatus();
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	splinteredstormshards: {
		num: 727,
		accuracy: true,
		basePower: 170,
		category: "Physical",
		shortDesc: "Clears hazards and screens from the user's side of the field, as well as terrain.",
		isNonstandard: null,
		name: "Splintered Stormshards",
		pp: 1,
		priority: 0,
		flags: {contact: 1},
		onHit() {
			this.field.clearTerrain();
		},
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
												'reflect', 'lightscreen', 'auroraveil', 'safeguard'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Splintered Stormshards', '[of] ' + pokemon);
					}
				}
			}
		},
		onAfterSubDamage() {
			this.field.clearTerrain();
				if (!move.hasSheerForce) {
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
												'reflect', 'lightscreen', 'auroraveil', 'safeguard'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Splintered Stormshards', '[of] ' + pokemon);
					}
				}
			}
		},
		isZ: "lycaniumz",
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Cool",
	},
	letssnuggleforever: {
		num: 726,
		accuracy: true,
		basePower: 160,
		category: "Physical",
		shortDesc: "Fully goes through protection.",
		isNonstandard: null,
		name: "Let's Snuggle Forever",
		pp: 1,
		priority: 0,
		flags: {contact: 1},
		isZ: "mimikiumz",
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},
	clangoroussoulblaze: {
		num: 728,
		accuracy: true,
		basePower: 140,
		category: "Special",
		isNonstandard: null,
		name: "Clangorous Soulblaze",
		pp: 1,
		priority: 0,
		flags: {sound: 1, bypasssub: 1},
		selfBoost: {
			boosts: {
				atk: 1,
				def: 1,
				spa: 1,
				spd: 1,
				spe: 1,
			},
		},
		isZ: "kommoniumz",
		secondary: {
			// Sheer Force negates the selfBoost even though it is not secondary
		},
		target: "allAdjacentFoes",
		type: "Dragon",
		contestType: "Cool",
	},
	guardianofalola: {
		num: 698,
		accuracy: true,
		basePower: 0,
		damageCallback(pokemon, target) {
			const hp75 = Math.floor(target.getUndynamaxedHP() * 3 / 4);
			if (
				target.volatiles['protect'] || target.volatiles['banefulbunker'] || target.volatiles['kingsshield'] ||
				target.volatiles['spikyshield'] || target.side.getSideCondition('matblock')
			) {
				this.add('-zbroken', target);
				return this.clampIntRange(Math.ceil(hp75 / 4 - 0.5), 1);
			}
			return this.clampIntRange(hp75, 1);
		},
		category: "Special",
		isNonstandard: null,
		name: "Guardian of Alola",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "tapuniumz",
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
	},
	searingsunrazesmash: {
		num: 724,
		accuracy: true,
		basePower: 200,
		category: "Physical",
		isNonstandard: null,
		name: "Searing Sunraze Smash",
		pp: 1,
		priority: 0,
		flags: {contact: 1},
		isZ: "solganiumz",
		ignoreAbility: true,
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	menacingmoonrazemaelstrom: {
		num: 725,
		accuracy: true,
		basePower: 200,
		category: "Special",
		isNonstandard: null,
		name: "Menacing Moonraze Maelstrom",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "lunaliumz",
		ignoreAbility: true,
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},
	lightthatburnsthesky: {
		num: 723,
		accuracy: true,
		basePower: 220,
		category: "Special",
		isNonstandard: null,
		name: "Light That Burns the Sky",
		pp: 1,
		priority: 0,
		flags: {},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		ignoreAbility: true,
		isZ: "ultranecroziumz",
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	soulstealing7starstrike: {
		num: 699,
		accuracy: true,
		basePower: 20,
		category: "Physical",
		shortDesc: "Hits 7 times.",
		isNonstandard: null,
		name: "Soul-Stealing 7-Star Strike",
		pp: 1,
		priority: 0,
		flags: {contact: 1},
		multihit: 7,
		isZ: "marshadiumz",
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},
	powerofpurrfection: {
		accuracy: true,
		basePower: 190,
		category: "Physical",
		shortDesc: "Uses target's Attack stat in damage calculation.",
		name: "Power of Purrfection",
		pp: 1,
		priority: 0,
		flags: {},
		overrideOffensivePokemon: 'target',
		isZ: "alopersianiumz",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Nasty Plot", source);
			this.add('-anim', source, "Foul Play", target);
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Cool",
	},
	gorgeousgoldilockdown: {
		accuracy: true,
		basePower: 170,
		category: "Physical",
		shortDesc: "Traps and damages the foe for 3 turns, even if the user switches.",
		name: "Gorgeous Goldi-Lockdown",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "alodugtriumz",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rock Polish", source);
			this.add('-anim', source, "Corkscrew Crash", target);
		},
		onHit(target, source) {
			target.addVolatile('goldilockdown', source, this.dex.getActiveMove('Gorgeous Goldi-Lockdown'));
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	onegoodnightssleep: {
		accuracy: true,
		basePower: 170,
		category: "Special",
		shortDesc: "Puts the foe to sleep, even if it already has a different status.",
		name: "One Good Night's Sleep",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "hypniumz",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Follow Me", source);
			this.add('-anim', source, "Hypnosis", target);
			this.add('-anim', source, "Psycho Boost", target);
		},
		onHit(target, source, move) {
			if (target.status) {
				target.cureStatus();
				target.trySetStatus('slp', source);
				this.add('-message', `Good night, ${target.name}!`);
			} else {
				target.trySetStatus('slp', source);
				this.add('-message', `Good night, ${target.name}!`);				
			}
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	retrorodeorampage: {
		accuracy: true,
		basePower: 210,
		category: "Physical",
		shortDesc: "Causes the user to recharge, unless it KOes the foe.",
		name: "Retro Rodeo Rampage",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "taurosiumz",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Stomping Tantrum", target);
			this.add('-anim', source, "Double-Edge", target);
		},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Tauros-Paldea-Combat':
				move.type = 'Fighting';
				break;
			case 'Tauros-Paldea-Blaze':
				move.type = 'Fire';
				break;
			case 'Tauros-Paldea-Aqua':
				move.type = 'Water';
				break;
			}
		},
		onAfterHit(target, source) {
			if (target && target.hp > 0) {
				source.addVolatile('mustrecharge');
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	timelesstimelapse: {
		accuracy: true,
		basePower: 0,
		category: "Physical",
		shortDesc: "Boosts all the user's stats, then uses the foe's move.",
		name: "Timeless Time-Lapse",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "smeargiumz",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Morning Sun", source);
			this.add('-anim', source, "Moonlight", source);
			this.add('-anim', source, "Skill Swap", target);
		},
		onTryHit(target, pokemon) {
			this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, pokemon, pokemon);
			const action = this.queue.willMove(target);
			if (!action) return false;
			const move = this.dex.getActiveMove(action.move.id);
			if (action.zmove || move.isZ || move.isMax) return false;
			if (target.volatiles['mustrecharge']) return false;
			if (move.category === 'Status' || move.flags['failmefirst']) return false;
			pokemon.addVolatile('timelesstimelapse');
			this.actions.useMove(move, pokemon, target);
			return null;
		},
		condition: {
			duration: 1,
			onBasePowerPriority: 12,
			onBasePower(basePower) {
				return this.chainModify(2);
			},
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	burningblastfurnace: {
		accuracy: true,
		basePower: 180,
		category: "Special",
		shortDesc: "Hits all adjacent foes.",
		name: "Burning Blast Furnace",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "magmortiumz",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Overheat", target);
			this.add('-anim', source, "Bulk Up", source);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fire",
		contestType: "Cool",
	},
	dielectricbreakdown: {
		accuracy: true,
		basePower: 180,
		category: "Physical",
		shortDesc: "Deals neutral damage to Electric-types.",
		name: "Dielectric Breakdown",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "electiviumz",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Charge", source);
			this.add('-anim', source, "Bolt Strike", target);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Electric') return 0;
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	zenithofabeautifulworld: {
		accuracy: true,
		basePower: 180,
		category: "Physical",
		shortDesc: "Suppresses the foe(s)'s ability.",
		name: "Zenith of a Beautiful World",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "zygardiumz",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Thousand Waves", target);
			this.add('-anim', source, "Precipice Blades", target);
			this.add('-anim', source, "Core Enforcer", target);
		},
		onHit(target) {
			if (target.getAbility().flags['cantsuppress']) return;
			if (target.newlySwitched || this.queue.willMove(target)) return;
			target.addVolatile('gastroacid');
		},
		onAfterSubDamage(damage, target) {
			if (target.getAbility().flags['cantsuppress']) return;
			if (target.newlySwitched || this.queue.willMove(target)) return;
			target.addVolatile('gastroacid');
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ground",
		contestType: "Cool",
	},
	hotheadedheatseeker: {
		accuracy: true,
		basePower: 170,
		category: "Physical",
		shortDesc: "Burns the foe.",
		name: "Hot-Headed Heatseeker",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "toucanniumz",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Magma Storm", source);
			this.add('-anim', source, "Supersonic Skystrike", target);
		},
		secondary: {
			chance: 100,
			status: 'brn',
		},
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
	mountaintopmollywop: {
		accuracy: true,
		basePower: 170,
		category: "Physical",
		shortDesc: "Sets Snow for 5 turns.",
		name: "Mountaintop Mollywop",
		pp: 1,
		priority: 0,
		flags: {punch: 1},
		isZ: "crabominabiumz",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rock Climb", target);
			this.add('-anim', source, "Vacuum Wave", target);
			this.add('-anim', source, "Ice Hammer", target);
		},
		self: {
			onHit() {
				this.field.setWeather('snow');
			},
		},
		secondary: {},
		target: "normal",
		type: "Ice",
		contestType: "Cool",
	},
	equestrianearthshaker: {
		accuracy: true,
		basePower: 180,
		category: "Physical",
		shortDesc: "Sets Mud Sport for 5 turns.",
		name: "Equestrian Earthshaker",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "mudsdaliumz",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Stomping Tantrum", target);
			this.add('-anim', source, "High Horsepower", target);
		},
		self: {
			pseudoWeather: 'mudsport',
		},
		secondary: {},
		target: "normal",
		type: "Ground",
		contestType: "Cool",
	},
	emergencyassembly: {
		accuracy: true,
		basePower: 170,
		category: "Special",
		shortDesc: "Heals 50% of the damage dealt.",
		name: "Emergency Assembly",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "wishiwashiumz",
		drain: [1, 2],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Life Dew", source);
			this.add('-anim', source, "Origin Pulse", target);
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Water",
		contestType: "Cool",
	},
	irrestibleoverhead: {
		accuracy: true,
		basePower: 180,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.gender && target.gender) {
				if (pokemon.gender !== target.gender) {
					this.debug('Irrestible Overhead boost');
					return move.basePower * 1.25;
				}
			}
			return move.basePower;
		},
		category: "Physical",
		shortDesc: "Deals 25% more damage to male Pokemon.",
		name: "Irrestible Overhead",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "tsareeniumz",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Attract", target);
			this.add('-anim', source, "Wood Hammer", target);
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	armorpiercingaxehandle: {
		accuracy: true,
		basePower: 160,
		category: "Physical",
		shortDesc: "Switches the foe out.",
		name: "Armor-Piercing Axehandle",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "golisopiumz",
		forceSwitch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "First Impression", target);
			this.add('-anim', source, "Hurricane", target);
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Cool",
	},
	everyonehugitout: {
		accuracy: true,
		basePower: 180,
		category: "Physical",
		shortDesc: "Ignores immunities.",
		name: "Everyone Hug It Out",
		pp: 1,
		priority: 0,
		flags: {},
		isZ: "beweariumz",
		ignoreImmunity: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Attract", source);
			this.add('-anim', source, "Anchor Shot", target);
			this.add('-anim', source, "Mach Punch", target);
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
	},

// For Let's Snuggle Forever
	protect: {
		num: 182,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Protect",
		pp: 10,
		priority: 4,
		flags: {noassist: 1, failcopycat: 1},
		stallingMove: true,
		volatileStatus: 'protect',
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
				if (!move.flags['protect']) {
					if (['gmaxoneblow', 'gmaxrapidflow', 'letssnuggleforever'].includes(move.id)) return;
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
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	quickguard: {
		num: 501,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Quick Guard",
		pp: 15,
		priority: 3,
		flags: {snatch: 1},
		sideCondition: 'quickguard',
		onTry() {
			return !!this.queue.willAct();
		},
		onHitSide(side, source) {
			source.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onSideStart(target, source) {
				this.add('-singleturn', source, 'Quick Guard');
			},
			onTryHitPriority: 4,
			onTryHit(target, source, move) {
				// Quick Guard blocks moves with positive priority, even those given increased priority by Prankster or Gale Wings.
				// (e.g. it blocks 0 priority moves boosted by Prankster or Gale Wings; Quick Claw/Custap Berry do not count)
				if (move.priority <= 0.1) return;
				if (!move.flags['protect']) {
					if (['gmaxoneblow', 'gmaxrapidflow', 'letssnuggleforever'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				this.add('-activate', target, 'move: Quick Guard');
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
		target: "allySide",
		type: "Fighting",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
	},
	spikyshield: {
		num: 596,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Spiky Shield",
		pp: 10,
		priority: 4,
		flags: {noassist: 1, failcopycat: 1},
		stallingMove: true,
		volatileStatus: 'spikyshield',
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
					if (['gmaxoneblow', 'gmaxrapidflow', 'letssnuggleforever'].includes(move.id)) return;
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
					this.damage(source.baseMaxhp / 8, source, target);
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
					this.damage(source.baseMaxhp / 8, source, target);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Grass",
		zMove: {boost: {def: 1}},
		contestType: "Tough",
	},
	wideguard: {
		num: 469,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Wide Guard",
		pp: 10,
		priority: 3,
		flags: {snatch: 1},
		sideCondition: 'wideguard',
		onTry() {
			return !!this.queue.willAct();
		},
		onHitSide(side, source) {
			source.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onSideStart(target, source) {
				this.add('-singleturn', source, 'Wide Guard');
			},
			onTryHitPriority: 4,
			onTryHit(target, source, move) {
				// Wide Guard blocks all spread moves
				if (move?.target !== 'allAdjacent' && move.target !== 'allAdjacentFoes') {
					return;
				}
				if (move.isZ || move.isMax) {
					if (['gmaxoneblow', 'gmaxrapidflow', 'letssnuggleforever'].includes(move.id)) return;
					target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				this.add('-activate', target, 'move: Wide Guard');
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
		target: "allySide",
		type: "Rock",
		zMove: {boost: {def: 1}},
		contestType: "Tough",
	},
	banefulbunker: {
		num: 661,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Baneful Bunker",
		pp: 10,
		priority: 4,
		flags: {noassist: 1, failcopycat: 1},
		stallingMove: true,
		volatileStatus: 'banefulbunker',
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
					if (['gmaxoneblow', 'gmaxrapidflow', 'letssnuggleforever'].includes(move.id)) return;
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
					source.trySetStatus('psn', target);
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
					source.trySetStatus('psn', target);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Poison",
		zMove: {boost: {def: 1}},
		contestType: "Tough",
	},
	burningbulwark: {
		num: 908,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Burning Bulwark",
		pp: 10,
		priority: 4,
		flags: {metronome: 1, noassist: 1, failcopycat: 1},
		stallingMove: true,
		volatileStatus: 'burningbulwark',
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
				if (!move.flags['protect'] || move.category === 'Status') {
					if (['gmaxoneblow', 'gmaxrapidflow', 'letssnuggleforever'].includes(move.id)) return;
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
					source.trySetStatus('brn', target);
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
					source.trySetStatus('brn', target);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Fire",
		zMove: {boost: {def: 1}},
	},
	kingsshield: {
		num: 588,
		accuracy: true,
		basePower: 0,
		category: "Status",
		isNonstandard: null,
		name: "King's Shield",
		pp: 10,
		priority: 4,
		flags: {noassist: 1, failcopycat: 1, failinstruct: 1},
		stallingMove: true,
		volatileStatus: 'kingsshield',
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
					if (['gmaxoneblow', 'gmaxrapidflow', 'letssnuggleforever'].includes(move.id)) return;
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
					this.boost({atk: -1}, source, target, this.dex.getActiveMove("King's Shield"));
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
					this.boost({atk: -1}, source, target, this.dex.getActiveMove("King's Shield"));
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Steel",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cool",
	},
	matblock: {
		num: 561,
		accuracy: true,
		basePower: 0,
		category: "Status",
		isNonstandard: null,
		name: "Mat Block",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, nonsky: 1, noassist: 1, failcopycat: 1},
		stallingMove: true,
		sideCondition: 'matblock',
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Mat Block only works on your first turn out.");
				return false;
			}
			return !!this.queue.willAct();
		},
		condition: {
			duration: 1,
			onSideStart(target, source) {
				this.add('-singleturn', source, 'Mat Block');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					if (['gmaxoneblow', 'gmaxrapidflow', 'letssnuggleforever'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move && (move.target === 'self' || move.category === 'Status')) return;
				this.add('-activate', target, 'move: Mat Block', move.name);
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
		target: "allySide",
		type: "Fighting",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
	},

	// Z-Move Effects for Gen 8-9 moves
	clangoroussoul: {
		inherit: true,
		zMove: {effect: 'clearnegativeboost'},
	},
	coaching: {
		inherit: true,
		zMove: {effect: 'clearnegativeboost'},
	},
	corrosivegas: {
		inherit: true,
		zMove: {boost: {def: 1}},
	},
	courtchange: {
		num: 756,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Court Change",
		pp: 10,
		priority: 0,
		flags: {mirror: 1, metronome: 1},
		onHitField(target, source) {
			const sideConditions = [
				'mist', 'lightscreen', 'reflect', 'spikes', 'safeguard', 'silkblanket', 'tailwind', 'toxicspikes', 'stealthrock', 'waterpledge', 'firepledge', 'grasspledge', 'stickyweb', 'auroraveil', 'gmaxsteelsurge', 'gmaxcannonade', 'gmaxvinelash', 'gmaxwildfire',
			];
			let success = false;
			if (this.gameType === "freeforall") {
				// random integer from 1-3 inclusive
				const offset = this.random(3) + 1;
				// the list of all sides in counterclockwise order
				const sides = [this.sides[0], this.sides[2]!, this.sides[1], this.sides[3]!];
				const temp: {[k: number]: typeof source.side.sideConditions} = {0: {}, 1: {}, 2: {}, 3: {}};
				for (const side of sides) {
					for (const id in side.sideConditions) {
						if (!sideConditions.includes(id)) continue;
						temp[side.n][id] = side.sideConditions[id];
						delete side.sideConditions[id];
						const effectName = this.dex.conditions.get(id).name;
						this.add('-sideend', side, effectName, '[silent]');
						success = true;
					}
				}
				for (let i = 0; i < 4; i++) {
					const sourceSideConditions = temp[sides[i].n];
					const targetSide = sides[(i + offset) % 4]; // the next side in rotation
					for (const id in sourceSideConditions) {
						targetSide.sideConditions[id] = sourceSideConditions[id];
						const effectName = this.dex.conditions.get(id).name;
						let layers = sourceSideConditions[id].layers || 1;
						for (; layers > 0; layers--) this.add('-sidestart', targetSide, effectName, '[silent]');
					}
				}
			} else {
				const sourceSideConditions = source.side.sideConditions;
				const targetSideConditions = source.side.foe.sideConditions;
				const sourceTemp: typeof sourceSideConditions = {};
				const targetTemp: typeof targetSideConditions = {};
				for (const id in sourceSideConditions) {
					if (!sideConditions.includes(id)) continue;
					sourceTemp[id] = sourceSideConditions[id];
					delete sourceSideConditions[id];
					success = true;
				}
				for (const id in targetSideConditions) {
					if (!sideConditions.includes(id)) continue;
					targetTemp[id] = targetSideConditions[id];
					delete targetSideConditions[id];
					success = true;
				}
				for (const id in sourceTemp) {
					targetSideConditions[id] = sourceTemp[id];
				}
				for (const id in targetTemp) {
					sourceSideConditions[id] = targetTemp[id];
				}
				this.add('-swapsideconditions');
			}
			if (!success) return false;
			this.add('-activate', source, 'move: Court Change');
		},
		secondary: null,
		target: "all",
		type: "Normal",
		zMove: {boost: {spe: 1}},
	},
	decorate: {
		inherit: true,
		zMove: {effect: 'clearnegativeboost'},
	},
	junglehealing: {
		inherit: true,
		zMove: {effect: 'clearnegativeboost'},
	},
	lifedew: {
		inherit: true,
		zMove: {boost: {spd: 1}},
	},
	lunarblessing: {
		inherit: true,
		zMove: {effect: 'clearnegativeboost'},
	},
	magicpowder: {
		inherit: true,
		zMove: {boost: {spd: 1}},
	},
	noretreat: {
		inherit: true,
		zMove: {effect: 'clearnegativeboost'},
	},
	obstruct: {
		inherit: true,
		zMove: {boost: {atk: 1}},
	},
	shelter: {
		inherit: true,
		zMove: {effect: 'clearnegativeboost'},
	},
	stuffcheeks: {
		inherit: true,
		zMove: {boost: {def: 2}},
	},
	takeheart: {
		inherit: true,
		zMove: {effect: 'clearnegativeboost'},
	},
	tarshot: {
		inherit: true,
		zMove: {boost: {spa: 2}},
	},
	teatime: {
		inherit: true,
		zMove: {boost: {def: 1}},
	},
	victorydance: {
		inherit: true,
		zMove: {effect: 'clearnegativeboost'},
	},
	chillyreception: {
		inherit: true,
		zMove: {effect: 'clearnegativeboost'},
	},
	doodle: {
		inherit: true,
		zMove: {boost: {atk: 2}},
	},
	filletaway: {
		inherit: true,
		zMove: {effect: 'heal'},
	},
	revivalblessing: {
		inherit: true,
		zMove: {effect: 'heal'},
	},
	shedtail: {
		inherit: true,
		zMove: {effect: 'heal'},
	},
	silktrap: {
		inherit: true,
		zMove: {boost: {def: 1}},
	},
	snowscape: {
		inherit: true,
		zMove: {boost: {spe: 1}},
	},
	spicyextract: {
		inherit: true,
		zMove: {boost: {atk: 2}},
	},
	tidyup: {
		num: 882,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Tidy Up",
		pp: 10,
		priority: 0,
		flags: {},
		onHit(pokemon) {
			let success = false;
			for (const active of this.getAllActive()) {
				if (active.removeVolatile('substitute')) success = true;
			}
			const removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'silkblanket'];
			const sides = [pokemon.side, ...pokemon.side.foeSidesWithConditions()];
			for (const side of sides) {
				for (const sideCondition of removeAll) {
					if (side.removeSideCondition(sideCondition)) {
						this.add('-sideend', side, this.dex.conditions.get(sideCondition).name);
						success = true;
					}
				}
			}
			if (success) this.add('-activate', pokemon, 'move: Tidy Up');
			return !!this.boost({atk: 1, spe: 1}, pokemon, pokemon, null, false, true) || success;
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
	},
};
