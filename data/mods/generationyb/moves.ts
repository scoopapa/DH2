export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
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
	cyclone: {
		accuracy: 100,
		basePower: 0,
		category: "Special",
		shortDesc: "Power varies based on a randomly selected 'magnitude', from F1 to F5",
		viable: true,
		name: "Cyclone",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, wind: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aeroblast", target);
		},
		onModifyMove(move, pokemon) {
			const i = this.random(100);
			if (i < 50) {
				move.magnitude = 1;
				move.basePower = 75;
			} else if (i < 75) {
				move.magnitude = 5;
				move.basePower = 95;
			} else if (i < 90) {
				move.magnitude = 3;
				move.basePower = 110;
			} else if (i < 99) {
				move.magnitude = 4;
				move.basePower = 130;
			} else {
				move.magnitude = 5;
				move.basePower = 150;
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			this.add('-activate', pokemon, 'move: Cyclone', move.magnitude);
		},
		secondary: null,
		target: "allAdjacent",
		type: "Flying",
		zMove: {basePower: 140},
		maxMove: {basePower: 140},
		contestType: "Tough",
	},
	kicharge: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Raises the user's crit ratio by 2 and Speed by 1.",
		viable: true,
		name: "Ki Charge",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		volatileStatus: 'focusenergy',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Focus Energy", target);
		},
		boosts: {
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Fighting",
		zMove: {boost: {accuracy: 1}},
		contestType: "Cool",
	},
	piledriver: {
		accuracy: 30,
		basePower: 0,
		category: "Physical",
		shortDesc: "OHKOs the target. Fails if user is a lower level.",
		name: "Piledriver",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		ohko: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Seismic Toss", target);
			this.add('-anim', source, "Doom Desire", target);
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		zMove: {basePower: 180},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},
	rattle: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Lowers the foe's Special Attack by 1 stage.",
		name: "Rattle",
		pp: 30,
		priority: 0,
		flags: {reflectable: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Confide", target);
		},
		boosts: {
			spd: -1,
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {boost: {spd: 1}},
		contestType: "Cool",
	},
  
  // Old Moves
	hiddenpower: {
		inherit: true,
		isNonstandard: null,
	},
	heartstamp: {
		inherit: true,
		isNonstandard: null,
	},
	naturesmadness: {
		inherit: true,
		isNonstandard: null,
	},
	geomancy: {
		inherit: true,
		isNonstandard: null,
	},
	oblivionwing: {
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
	thousandarrows: {
		inherit: true,
		isNonstandard: null,
	},
	thousandwaves: {
		inherit: true,
		isNonstandard: null,
	},
	octolock: {
		inherit: true,
		isNonstandard: null,
	},
	obstruct: {
		inherit: true,
		isNonstandard: null,
	},
	multiattack: {
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
	kingsshield: {
		inherit: true,
		isNonstandard: null,
	},
	technoblast: {
		inherit: true,
		isNonstandard: null,
	},
	dizzypunch: {
		inherit: true,
		isNonstandard: null,
		type: "Fairy",
	},
	chatter: {
		inherit: true,
		isNonstandard: null,
	},
	spectralthief: {
		inherit: true,
		isNonstandard: null,
	},
	magnitude: {
		inherit: true,
		isNonstandard: null,
		target: "allAdjacentFoes",
	},
	snatch: {
		inherit: true,
		isNonstandard: null,
	},
	naturepower: {
		inherit: true,
		isNonstandard: null,
	},
	spiderweb: {
		inherit: true,
		isNonstandard: null,
	},
  
  // it's called aura bruh
	aurumauraused: {
		shortDesc: "Allows Aurum Aura to be permament.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Aurum Aura Used",
		pp: 40,
		priority: 0,
		flags: {},
    noSketch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Morning Sun", target);
		},
		sideCondition: 'aurumauraused',
	   condition: {
			onSwitchIn() {
				const source = this.effectState.source;
				 if (!source.fainted) {
					source.addVolatile('aurumaura')
					this.add('-start', source, 'Aurum Aura');
				 }
			},
	   },
		secondary: null,
		target: "self",
		type: "Steel",
	},
};
