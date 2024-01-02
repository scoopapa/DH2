export const Moves: {[k: string]: ModdedMoveData} = {
// New Moves
	chemicalplant: {
		accuracy: 100,
		basePower: 50,
		category: "Special",
		shortDesc: "Removes the foe's item. Poisons the foe if they had a plant-based item.",
		name: "Chemical Plant",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Magical Leaf", target);
		},
		onHit(target, source) {
			const item = target.getItem();
			if (target.hp && target.takeItem(source)) {
				if (item.isBerry || ['absorbbulb', 'berryjuice', 'bigroot', 'electricseed', 'galaricacuff', 'galaricawreath',
				  'grassyseed', 'leftovers', 'mentalherb', 'miracleseed', 'mirrorherb', 'mistyseed', 'powerherb', 'psychicseed',
				  'sweetapple', 'tartapple', 'whiteherb', 'syrupyapple', 'cloversweet', 'leek', 'lovesweet',
				  'ribbonsweet', 'starsweet', 'strawberrysweet', 'whippeddream'].includes(item.id)) {
						target.trySetStatus('psn', source);
				}
			}
		},
		onAfterHit(target, source) {
			if (source.hp) {
				const item = target.takeItem();
				if (item) {
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
		name: "Cold Shoulder",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
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
	defibrillate: {
		accuracy: 90,
		basePower: 90,
		category: "Physical",
		shortDesc: "Heals an ally's status if that ally is the target.",
		name: "Defibrillate",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, allyanim: 1, contact: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Double Shock", target);
		},
		onTryHit(target, source, move) {
			if (source.isAlly(target)) {
				move.basePower = 0;
				move.accuracy = true;
				move.infiltrates = true;
			}
		},
		onHit(target, source, move) {
			if (source.isAlly(target)) {
				if (!target.cureStatus()) {
					this.add('-immune', target);
					return this.NOT_FAIL;
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cute",
	},
	dragonsroar: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
	   shortDesc: "If the user is hit this turn, +1 SpA.",
		name: "Dragon's Roar",
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
		name: "Dust Devil",
		pp: 10,
		priority: -6,
		flags: {protect: 1, mirror: 1, noassist: 1, failcopycat: 1},
		onMoveFail(target, source, move) {
			this.field.setWeather('sandstorm');
		},
		forceSwitch: true,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	exfoliate: {
		accuracy: true,
		basePower: 0,
		category: "Status",
	   shortDesc: "Heals the user's status. Boosts Def & SpD by 1 if it does.",
		name: "Exfoliate",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Life Dew", target);
		},
		onHit(pokemon) {
			if (pokemon.status) {
				this.boost({def: 1, spd: 1});
				pokemon.cureStatus();
			}
		},
		secondary: null,
		target: "self",
		type: "Water",
		zMove: {effect: 'heal'},
		contestType: "Cute",
	},
	heartbeat: {
		accuracy: 100,
		basePower: 25,
		category: "Physical",
	   shortDesc: "Hits 2-5 times.",
		name: "Heartbeat",
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1},
		multihit: [2, 5],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Heart Stamp", target);
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
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
	premonition: {
		accuracy: true,
		basePower: 0,
		category: "Status",
	   shortDesc: "Copies the foe's attacking move at 1.5x power. The foe is then confused. User must be faster.",
		name: "Premonition",
		pp: 10,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Glare", source);
		},
		flags: {
			protect: 1, bypasssub: 1,
			failencore: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failmimic: 1,
		},
		onTryHit(target, pokemon) {
			const action = this.queue.willMove(target);
			if (!action) return false;
			const move = this.dex.getActiveMove(action.move.id);
			if (action.zmove || move.isZ || move.isMax) return false;
			if (target.volatiles['mustrecharge']) return false;
			if (move.category === 'Status' || move.flags['failmefirst']) return false;

			pokemon.addVolatile('premonition');
			this.actions.useMove(move, pokemon, target);
			target.addVolatile('confusion');
			return null;
		},
		condition: {
			duration: 1,
			onBasePowerPriority: 12,
			onBasePower(basePower) {
				return this.chainModify(1.5);
			},
		},
		secondary: null,
		target: "adjacentFoe",
		type: "Psychic",
		zMove: {boost: {spe: 2}},
		contestType: "Clever",
	},
	pullingstrings: {
		accuracy: 100,
		basePower: 0,
	   shortDesc: "Causes the user or ally to use Puppet Dance.",
		category: "Status",
		name: "Pulling Strings",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, allyanim: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Instruct", target);
		},
		onHit(target, source, move) {
			target.addVolatile('pullingstrings');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-message', `${pokemon.name} is being forced to dance!`);
				this.actions.useMove("Puppet Dance", pokemon);
			},
		},
		secondary: null,
		target: "adjacentAllyOrSelf",
		type: "Dark",
		contestType: "Clever",
	},
	puppetdance: {
		accuracy: 100,
		basePower: 60,
		category: "Special",
	   shortDesc: "Boosts the user's SpA by 1 stage.",
		name: "Puppet Dance",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, dance: 1},
		noSketch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Quiver Dance", source);
			this.add('-anim', source, "Fiery Wrath", target);
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "allAdjacentFoes",
		type: "Dark",
		contestType: "Beautiful",
	},
	rockwall: {
		accuracy: true,
		basePower: 0,
		category: "Status",
	   shortDesc: "Protects the user. Disables a foe that makes contact.",
		name: "Rock Wall",
		pp: 10,
		priority: 4,
		flags: {noassist: 1, failcopycat: 1},
		stallingMove: true,
		volatileStatus: 'rockwall',
		onPrepareHit(pokemon) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Iron Defense", target);
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
					target.addVolatile('disable');
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
					target.addVolatile('disable');
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
		name: "Soul Sink",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
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
	   shortDesc: "After dealing damage, this move deals an additional 6.25% of the all foes' max HP.",
		name: "Sparkling Spike",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Torch Song", target);
		},
		onHit(target, source, move) {
			for (const ally of target.adjacentAllies()) {
				this.damage(target.baseMaxhp / 16, target, source, this.dex.conditions.get('Sparkling Spike'));
				this.damage(ally.baseMaxhp / 16, ally, source, this.dex.conditions.get('Sparkling Spike'));
			}
		},
		onAfterSubDamage(damage, target, source, move) {
			for (const ally of target.adjacentAllies()) {
				this.damage(target.baseMaxhp / 16, target, source, this.dex.conditions.get('Sparkling Spike'));
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
		name: "Updraft",
		pp: 10,
		priority: 0,
		flags: {wind: 1, protect: 1, mirror: 1},
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
		name: "Wide Slash",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, slicing: 1},
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
	worktogether: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Has a 30% chance to deal doubled damage.",
		name: "Work Together",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Double-Edge", target);
		},
		onBasePower(basePower, pokemon) {
			if (this.randomChance(3, 10)) {
				this.add('-activate', pokemon, 'move: Work Together');
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	warmup: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User: +1 Speed, +2 critrate, then becomes the move Workout.",
		name: "Warm Up",
		pp: 15,
		priority: 0,
		flags: {snatch: 1},
		volatileStatus: 'focusenergy',
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Bulk Up", target);
		},
		onHit(target, source) {
			pokemon.addVolatile('warmup');
		},
		onTryMove(source, target, move) {
			if (source.volatiles['warmup']) {
				this.attrLastMove('[still]');
				this.add('cant', source, 'move: Warm Up', move);
				return false;
				this.add('-message', `${source.name} is already warmed up, they will now Workout!`);
				this.actions.useMove("Workout", source);
				source.removeVolatile('warmup');
				source.addVolatile('workout');
			}
			if (source.volatiles['workout']) {
				this.attrLastMove('[still]');
				this.add('cant', source, 'move: Workout', move);
				return false;
				this.add('-message', `${source.name} has already worked out, they will now Cool Down!`);
				this.actions.useMove("Cool Down", source);
				source.removeVolatile('workout');
			}
		},
		boosts: {
			spe: 1,
		},
		condition: {},
		secondary: null,
		target: "self",
		type: "Fighting",
		zMove: {boost: {accuracy: 1}},
		contestType: "Cool",
	},
	workout: {
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		shortDesc: "Becomes the move Cool Down after use.",
		name: "Workout",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		noSketch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Burn Up", target);
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
		shortDesc: "User: Heals 50% HP, clears stat boosts & crit stages, then becomes Warm Up.",
		name: "Cool Down",
		pp: 15,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		heal: [1, 2],
		noSketch: true,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rest", target);
		},
		onHit(target, source) {
			target.clearBoosts();
			target.removeVolatile('focusenergy');
			this.add('-message', `${target.name} has now cooled down, they can now Warm Up again!`);
		},
		secondary: null,
		target: "self",
		type: "Fighting",
		zMove: {effect: 'heal'},
		contestType: "Beautiful",
	},

// Signature Moves
	antivenom: {
		accuracy: 100,
		basePower: 70,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'psn' || target.status === 'tox' || target.hasType('Poison')) {
				this.debug('BP doubled on Poison or poisoned target');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Special",
		shortDesc: "Deals 2x damage to Poison-types and poisoned Pokeon. Removes Poison-typing and poison status.",
		name: "Antivenom",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Gunk Shot", target);
		},
		onHit(target) {
			if (target.status === 'psn' || target.status === 'tox') target.cureStatus();
			if (target.hasType('Poison')) {
				pokemon.setType(pokemon.getTypes(true).map(type => type === "Poison" ? "???" : type));
				this.add('-start', target, 'typechange', target.types.join('/'), '[from] move: Antivenom');
			}
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
	bombshell: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		shortDesc: "Charges at start of turn, hits at end. Reflects bullet moves.",
		name: "Bombshell",
		pp: 10,
		priority: -3,
		flags: {protect: 1, noassist: 1, failmefirst: 1, nosleeptalk: 1, failcopycat: 1, failinstruct: 1},
		priorityChargeCallback(pokemon) {
			pokemon.addVolatile('bombshell');
		},
		condition: {
			duration: 1,
			onStart(pokemon) {
				this.add('-singleturn', pokemon, 'move: Bombshell');
			},
			onTryHitPriority: 2,
			onTryHit(target, source, move) {
				if (target === source || move.hasBounced || !move.flags['bullet']) {
					return;
				}
				const newMove = this.dex.getActiveMove(move.id);
				newMove.hasBounced = true;
				newMove.pranksterBoosted = this.effectState.pranksterBoosted;
				this.actions.useMove(newMove, target, source);
				return null;
			},
			onAllyTryHitSide(target, source, move) {
				if (target.isAlly(source) || move.hasBounced || !move.flags['bullet']) {
					return;
				}
				const newMove = this.dex.getActiveMove(move.id);
				newMove.hasBounced = true;
				newMove.pranksterBoosted = false;
				this.actions.useMove(newMove, this.effectState.target, source);
				return null;
			},
		},
		onAfterMove(pokemon) {
			pokemon.removeVolatile('bombshell');
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	burstingspirit: {
		accuracy: 100,
		basePower: 150,
		category: "Physical",
		shortDesc: "User faints even if the move fails. Blocked by Damp.",
		name: "Bursting Spirit",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, noparentalbond: 1},
		selfdestruct: "always",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Explosion", source);
			this.add('-anim', source, "Hex", source);
		},
		secondary: null,
		target: "allAdjacent",
		type: "Ghost",
		contestType: "Beautiful",
	},
	cleansingfire: {
		accuracy: true,
		basePower: 40,
		category: "Special",
		shortDesc: "Clears hazards and stat boosts from both sides of the field.",
		name: "Cleansing Fire",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Incinerate", target);
		},
		onHitField() {
			this.add('-clearallboost');
			for (const pokemon of this.getAllActive()) {
				pokemon.clearBoosts();
			}
		},
		onHit(target, source, move) {
			const removeTarget = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.conditions.get(targetCondition).name, '[from] move: Cleansing Fire', '[of] ' + source);
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Cleansing Fire', '[of] ' + source);
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		zMove: {effect: 'heal'},
		contestType: "Beautiful",
	},
	coldcross: {
		accuracy: 85,
		basePower: 120,
		category: "Physical",
		shortDesc: "10% chance to freeze foe. Can't miss in Snow.",
		name: "Cold Cross",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Sheer Cold", target);
			this.add('-anim', source, "Smart Strike", target);
		},
		onModifyMove(move) {
			if (this.field.isWeather(['hail', 'snow'])) move.accuracy = true;
		},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	electrolights: {
		accuracy: 90,
		basePower: 80,
		category: "Special",
		name: "Electro-Lights",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Luster Purge", target);
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Dark') return 1;
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Electric",
	},
	
 // Old Moves
	direclaw: {
		num: 827,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "50% chance to freeze, poison, or paralyze target.",
		name: "Dire Claw",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
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
	boltbeak: {
		inherit: true,
		isNonstandard: null,
	},
	fishiousrend: {
		inherit: true,
		isNonstandard: null,
	},
	meteorassault: {
		inherit: true,
		isNonstandard: null,
	},
	defog: {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, wind: 1},
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
	multiattack: {
		inherit: true,
		isNonstandard: null,
	},
	oblivionwing: {
		inherit: true,
		isNonstandard: null,
	},
	geomancy: {
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
	iondeluge: {
		inherit: true,
		isNonstandard: null,
	},
	kingsshield: {
		inherit: true,
		isNonstandard: null,
	},
	kinesis: {
		inherit: true,
		isNonstandard: null,
	},
	stormthrow: {
		inherit: true,
		isNonstandard: null,
	},
	steamroller: {
		inherit: true,
		isNonstandard: null,
	},
	electrify: {
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
	shadowbone: {
		inherit: true,
		isNonstandard: null,
	},
	matblock: {
		inherit: true,
		isNonstandard: null,
	},
	chatter: {
		inherit: true,
		isNonstandard: null,
	},
	snaptrap: {
		inherit: true,
		isNonstandard: null,
	},
	trickortreat: {
		inherit: true,
		isNonstandard: null,
	},
	lovelykiss: {
		inherit: true,
		isNonstandard: null,
	},
	lightofruin: {
		inherit: true,
		isNonstandard: null,
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
	lightthatburnsthesky: {
		num: 723,
		accuracy: true,
		basePower: 200,
		category: "Special",
		isNonstandard: "Past",
		name: "Light That Burns the Sky",
		pp: 1,
		priority: 0,
		flags: {},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		ignoreAbility: true,
		isZ: "psychiumz",
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Cool",
	},
	zippyzap: {
		num: 729,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		shortDesc: "Nearly always goes first. Always crits.",
		isNonstandard: null,
		name: "Zippy Zap",
		pp: 10,
		priority: 2,
		flags: {contact: 1, protect: 1, mirror: 1},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
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
	nightdaze: {
		num: 539,
		accuracy: 90,
		basePower: 100,
		category: "Special",
		shortDesc: "Clears weather if it hits.",
		name: "Night Daze",
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
};
