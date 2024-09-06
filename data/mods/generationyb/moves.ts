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
		self: {
			onHit(source) {
				for (const pokemon of source.alliesAndSelf()) {
					pokemon.addVolatile('kicharge');
				}
			},
		},
		boosts: {
			spe: 1,
		},
		condition: {
			noCopy: true,
			onRestart: () => null,
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
	bladebullet: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "Deals physical or special damage, depending on which is more effective.",
		viable: true,
		name: "Blade Bullet",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1, slicing: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Secret Sword", target);
		},
		onModifyMove(move, pokemon, target) {
			if (!target) return;
			const atk = pokemon.getStat('atk', false, true);
			const spa = pokemon.getStat('spa', false, true);
			const def = target.getStat('def', false, true);
			const spd = target.getStat('spd', false, true);
			const physical = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * atk) / def) / 50);
			const special = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * spa) / spd) / 50);
			if (special > physical || (physical === special && this.random(2) === 0)) {
				move.category = 'Special';
				move.flags.bullet = 1;
				move.flags.contact = 0;
				move.flags.slicing = 0;
			}
		},
		onHit(target, source, move) {
			// Shell Side Arm normally reveals its category via animation on cart, but doesn't play either custom animation against allies
			if (!source.isAlly(target)) this.hint(move.category + " Blade Bullet");
		},
		onAfterSubDamage(damage, target, source, move) {
			if (!source.isAlly(target)) this.hint(move.category + " Blade Bullet");
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	destinysjavelin: {
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		shortDesc: "Ignores the target's stat stage changes.",
		viable: true,
		name: "Destiny's Javelin",
		pp: 10,
		priority: 0,
		flags: {slicing: 1, protect: 1, mirror: 1, metronome: 1},
		ignoreEvasion: true,
		ignoreDefensive: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Extreme Evoboost", source);
			this.add('-anim', source, "Smart Strike", target);
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Cool",
	},
	firejuggle: {
		accuracy: 75,
		basePower: 140,
		category: "Special",
		shortDesc: "If it fails: -33% max HP, switch out.",
		viable: true,
		name: "Fire Juggle",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Pyro Ball", target);
		},
		onMoveFail(target, source, move) {
			if (!this.canSwitch(source.side)) return;
			this.damage(source.baseMaxhp / 3, source, source);
			source.switchFlag = true;				
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	floataway: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "Sets Tailwind.",
		viable: true,
		name: "Float Away",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bounce", target);
		},
		self: {
			sideCondition: 'tailwind',
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
	flockandroll: {
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target, move) {
			const currentSpecies = move.allies!.shift()!.species;
			const bp = 10 + Math.floor(currentSpecies.baseStats.atk / 5);
			this.debug('BP for ' + currentSpecies.name + ' hit: ' + bp);
			return bp;
		},
		category: "Physical",
		shortDesc: "All healthy Flying-type allies aid in attacking.",
		viable: true,
		name: "Flock and Roll",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, allyanim: 1, metronome: 1},
		onModifyMove(move, pokemon) {
			move.allies = pokemon.side.pokemon.filter(ally => ally === pokemon || !ally.fainted && !ally.status && ally.hasType('Flying'));
			move.multihit = move.allies.length;
		},
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Clever",
	},
	futureflames: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "Hits two turns after being used. Torments the foe.",
		viable: true,
		name: "Future Flames",
		pp: 10,
		priority: 0,
		flags: {allyanim: 1, metronome: 1, futuremove: 1},
		ignoreImmunity: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Spite", source);
		},
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'futureflames',
				source: source,
				moveData: {
					id: 'futureflames',
					name: "Future Flames",
					accuracy: 100,
					basePower: 80,
					category: "Special",
					priority: 0,
					flags: {allyanim: 1, metronome: 1, futuremove: 1},
					ignoreImmunity: false,
  					onPrepareHit(target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Magma Storm", target);
					},
					onHit(target, source, move) {
						return target.addVolatile('torment');
					},
					effectType: 'Move',
					type: 'Fire',
				},
			});
			this.add('-start', source, 'move: Future Flames');
			return this.NOT_FAIL;
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Clever",
	},
	futurefamine: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "Hits two turns after being used. Heal Blocks the foe.",
		viable: true,
		name: "Future Famine",
		pp: 10,
		priority: 0,
		flags: {allyanim: 1, metronome: 1, futuremove: 1},
		ignoreImmunity: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Quiver Dance", source);
		},
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'futureharvest',
				source: source,
				moveData: {
					id: 'futurefamine',
					name: "Future Famine",
					accuracy: 100,
					basePower: 80,
					category: "Special",
					priority: 0,
					flags: {allyanim: 1, metronome: 1, futuremove: 1},
					ignoreImmunity: false,
  					onPrepareHit(target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Sticky Web", target);
					},
					onHit(target, source, move) {
						return target.addVolatile('healblock');
					},
					effectType: 'Move',
					type: 'Bug',
				},
			});
			this.add('-start', source, 'move: Future Famine');
			return this.NOT_FAIL;
		},
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Clever",
	},
	futurelaments: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Hits two turns after being used. Disables the foe.",
		viable: true,
		name: "Future Laments",
		pp: 10,
		priority: 0,
		flags: {allyanim: 1, metronome: 1, futuremove: 1},
		ignoreImmunity: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hex", source);
		},
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'futurelaments',
				source: source,
				moveData: {
					id: 'futurelaments',
					name: "Future Laments",
					accuracy: 100,
					basePower: 80,
					category: "Physical",
					priority: 0,
					flags: {allyanim: 1, metronome: 1, futuremove: 1},
					ignoreImmunity: false,
  					onPrepareHit(target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Dark Void", target);
					},
					onHit(target, source, move) {
						return target.addVolatile('disable');
					},
					effectType: 'Move',
					type: 'Ghost',
				},
			});
			this.add('-start', source, 'move: Future Laments');
			return this.NOT_FAIL;
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
	},
	futureshock: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Hits two turns after being used. Suppresses the foe's ability.",
		viable: true,
		name: "Future Shock",
		pp: 10,
		priority: 0,
		flags: {allyanim: 1, metronome: 1, futuremove: 1},
		ignoreImmunity: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Charge", source);
		},
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'futureshock',
				source: source,
				moveData: {
					id: 'futureshock',
					name: "Future Shock",
					accuracy: 100,
					basePower: 80,
					category: "Physical",
					priority: 0,
					flags: {allyanim: 1, metronome: 1, futuremove: 1},
					ignoreImmunity: false,
  					onPrepareHit(target, source, move) {
						this.attrLastMove('[still]');
						this.add('-anim', source, "Wildbolt Storm", target);
					},
					onHit(target, source, move) {
						return target.addVolatile('gastroacid');
					},
					effectType: 'Move',
					type: 'Electric',
				},
			});
			this.add('-start', source, 'move: Future Shock');
			return this.NOT_FAIL;
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Clever",
	},
	heroswelcome: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "Hits first. First turn out only.",
		viable: true,
		name: "Hero's Welcome",
		pp: 10,
		priority: 2,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "First Impression", target);
		},
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Hero's Welcome only works on your first turn out.");
				return false;
			}
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Cute",
	},
	knittingneedle: {
		accuracy: true,
		basePower: 55,
		category: "Physical",
		shortDesc: "Never misses. Always critically hits.",
		viable: true,
		name: "Knitting Needle",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		willCrit: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Smart Strike", target);
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	laughingfit: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Raises the user's (or ally's) Attack by 2 stages.",
		viable: true,
		name: "Laughing Fit",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Confide", target);
		},
		boosts: {
			atk: 2,
		},
		secondary: null,
		target: "adjacentAllyOrSelf",
		type: "Dark",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	paintover: {
		accuracy: 100,
		basePower: 0,
		basePowerCallback(pokemon, target) {
			let power = 60 + 20 * target.positiveBoosts();
			if (power > 200) power = 200;
			this.debug('BP: ' + power);
			return power;
		},
		category: "Special",
		shortDesc: "60 BP, +20 per each of the foe's boosts. Clears foe's boosts.",
		viable: true,
		name: "Paint Over",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Aqua Tail", target);
		},
		onHit(target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},
	pressurestream: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "100% chance to lower the target's SpD by 1.",
		viable: true,
		name: "Pressure Stream",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hydro Steam", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Water",
		contestType: "Cute",
	},
	riptide: {
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		shortDesc: "+1 Priority in Rain. 10% chance to lower the foe's Def by 1 stage.",
		viable: true,
		name: "Riptide",
		pp: 20,
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
	rehearse: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "+1 Spe and +1 Atk/SpA depending on form.",
		viable: true,
		name: "Rehearse",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Quiver Dance", target);
		},
		boosts: {
			spe: 1,
		},
		self: {
			onHit(source) {
				if (source.species.name === 'Tragichiou-Comedy') {
					this.boost({spa: 1}, source);
				} else {
					this.boost({atk: 1}, source);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Fairy",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	sealshut: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Protects allies from damaging attacks. Turn 1 only.",
		viable: true,
		name: "Seal Shut",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, nonsky: 1, noassist: 1, failcopycat: 1},
		stallingMove: true,
		sideCondition: 'sealshut',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Wide Guard", target);
		},
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Seal Shut only works on your first turn out.");
				return false;
			}
			return !!this.queue.willAct();
		},
		condition: {
			duration: 1,
			onSideStart(target, source) {
				this.add('-singleturn', source, 'Seal Shut');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move && (move.target === 'self' || move.category === 'Status')) return;
				this.add('-activate', target, 'move: Seal Shut', move.name);
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
		contestType: "Cool",
	},
	returntozero: {
		accuracy: 100,
		basePower: 150,
		category: "Physical",
		shortDesc: "Hits adjacent Pokemon. The user faints.",
		viable: true,
		name: "Return to Zero",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, noparentalbond: 1},
		selfdestruct: "always",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Explosion", target);
			this.add('-anim', source, "Hex", target);
		},
		secondary: null,
		target: "allAdjacent",
		type: "Ghost",
		contestType: "Beautiful",
	},
	slimeslip: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		shortDesc: "User switches out if it hits. Lowers the foe's Speed by 1 stage.",
		viable: true,
		name: "Slime Slip",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		selfSwitch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Jab", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Poison",
	},
	spurspark: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		shortDesc: "Deals doubled damage to a statused foe. 50% chance to par/psn.",
		viable: true,
		name: "Spur Spark",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Charge", source);
			this.add('-anim', source, "Poison Jab", target);
		},
		onBasePower(basePower, pokemon, target) {
			if (target.status || target.hasAbility('comatose')) {
				return this.chainModify(2);
			}
		},
		secondary: {
			chance: 50,
			onHit(target, source) {
				const result = this.random(2);
				if (result === 0) {
					target.trySetStatus('par', source);
				} else {
					target.trySetStatus('psn', source);
				}
			},
		},
		target: "normal",
		type: "Electric",
	},
	stickytrap: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "Traps foe, lowers Spe and Evasion by 1 each turn.",
		viable: true,
		name: "Sticky Trap",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Syrup Bomb", target);
		},
		onTryImmunity(target) {
			return this.dex.getImmunity('trapped', target);
		},
		volatileStatus: 'stickytrap',
		condition: {
			onStart(pokemon, source) {
				this.add('-start', pokemon, 'move: Sticky Trap', '[of] ' + source);
			},
			onResidualOrder: 14,
			onResidual(pokemon) {
				const source = this.effectState.source;
				if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns)) {
					delete pokemon.volatiles['stickytrap'];
					this.add('-end', pokemon, 'Sticky Trap', '[partiallytrapped]', '[silent]');
					return;
				}
				this.boost({spe: -1, evasion: -1}, pokemon, source, this.dex.getActiveMove('stickytrap'));
			},
			onTrapPokemon(pokemon) {
				if (this.effectState.source && this.effectState.source.isActive) pokemon.tryTrap();
			},
		},
		secondary: null,
		target: "normal",
		type: "Bug",
	},
	timeout: {
		accuracy: 85,
		basePower: 110,
		category: "Special",
		shortDesc: "Clears weathers, terrains, rooms, and Gravity if it hits foe(s).",
		viable: true,
		name: "Timeout",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Boomburst", target);
		},
		onHit() {
			this.field.clearTerrain();
			this.field.clearWeather();
			this.field.removePseudoWeather('trickroom');
			this.field.removePseudoWeather('magicroom');
			this.field.removePseudoWeather('wonderroom');
			this.field.removePseudoWeather('gravity');
			this.field.clearTerrain();
			this.field.clearWeather();
		},
		onAfterSubDamage() {
			this.field.clearTerrain();
			this.field.clearWeather();
			this.field.removePseudoWeather('trickroom');
			this.field.removePseudoWeather('magicroom');
			this.field.removePseudoWeather('wonderroom');
			this.field.removePseudoWeather('gravity');
			this.field.clearTerrain();
			this.field.clearWeather();
		},
		secondary: {}, // sheer force-boosted
		target: "allAdjacentFoes",
		type: "Dark",
	},
  
  // Old Moves
	hiddenpower: {
		inherit: true,
		isNonstandard: null,
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
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
	aurasphere: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			if (pokemon.volatiles['kicharge']) {
				return this.chainModify(1.5);
			}
		},
	},
	defog: {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, metronome: 1, wind: 1},
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
		inherit: true,
		target: "allAdjacentFoes",
	},
	uproar: {
		inherit: true,
		target: "allAdjacentFoes",
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
	dragonclaw: {
		inherit: true,
		critRatio: 2,
	},
	xscissor: {
		inherit: true,
		critRatio: 2,
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
	twistsoffate: {
		shortDesc: "Allows Twist of Fate to work.",
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Twists of Fate",
		pp: 40,
		priority: 0,
		flags: {},
    	noSketch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psychic", target);
		},
		sideCondition: 'twistsoffate',
	   condition: {
			onTryHit(pokemon, target, move) {
				if (move.flags['futuremove']) {
					this.add('-immune', pokemon, '[from] ability: Twist of Fate');
					return null;
				}
			},
			onFaint(pokemon) {
				const source = this.effectState.source;
				if (pokemon === source) {
					source.side.removeSideCondition('twistsoffate');
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'Twists of Fate');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 1,
			onSideEnd(side) {
				this.add('-sideend', side, 'Twists of Fate');
			},
	   },
		secondary: null,
		target: "self",
		type: "Dragon",
	},
};
