export const Moves: {[k: string]: ModdedMoveData} = {
	"doubleironbash": {
		num: 742,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit. Has a 30% chance to flinch the target.",
		shortDesc: "Hits twice. 30% chance to flinch.",
		id: "doubleironbash",
		isViable: true,
		name: "Double Iron Bash",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		multihit: 2,
		target: "normal",
		type: "Steel",
		zMovePower: 180,
		gmaxPower: 140,
		contestType: "Clever",
	},
	"smackdown": {
		inherit: true,
		basePower: 70,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		volatileStatus: 'smackdown',
		onBasePower(basePower, source, target, move) {
			let applies = false;
			if (pokemon.hasType('Flying') || pokemon.hasAbility('levitate')) applies = true;
			if (pokemon.hasItem('ironball') || pokemon.volatiles['ingrain'] || this.field.getPseudoWeather('gravity')) applies = false;
			if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
				applies = true;
				this.queue.cancelMove(pokemon);
				pokemon.removeVolatile('twoturnmove');
			}
			if (pokemon.volatiles['magnetrise']) {
				applies = true;
				delete pokemon.volatiles['magnetrise'];
			}
			if (pokemon.volatiles['telekinesis']) {
				applies = true;
				delete pokemon.volatiles['telekinesis'];
			}
			if (!applies) return basePower;
			target.addVolatile( 'smackdown' );
			return this.chainModify(1.5);
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	"fishiousrend": {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1},
	},
	"fly": {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id) || attacker.types.includes('Flying')) {
				return;
			}
			this.add('-prepare', attacker, move.name, defender);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
	"howl": {
		inherit: true,
		boosts: {
			atk: -1,
		},
		self:{
			boosts:{
				atk: 1,
			}
		},
		target: "AllAdjacentFoes",
	},
	"octolock": {
		inherit: true,
		onTryImmunity: null,
		condition: {
			onStart(pokemon, source) {
				this.add('-activate', pokemon, 'move: Octolock', '[of] ' + source);
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				const source = this.effectData.source;
				if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns)) {
					delete pokemon.volatiles['octolock'];
					this.add('-end', pokemon, 'Octolock', '[partiallytrapped]', '[silent]');
					return;
				}
				this.boost({def: -1, spd: -1, spe: -1}, pokemon, source, this.dex.getActiveMove("Octolock"));
			},
			onTrapPokemon(pokemon) {
				if (this.effectData.source && this.effectData.source.isActive) pokemon.tryTrap();
			},
		},
	},
	"toxicspikes": {
		num: 390,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the opposing side of the field, poisoning each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate Ability. Can be used up to two times before failing. Opposing Pokemon become poisoned with one layer and badly poisoned with two layers. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, is hit by Defog, or a grounded Poison-type Pokemon switches in. Safeguard prevents the opposing party from being poisoned on switch-in, but a substitute does not.",
		shortDesc: "Poisons grounded foes on switch-in. Max 2 layers.",
		id: "toxicspikes",
		isViable: true,
		name: "Toxic Spikes",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		sideCondition: 'toxicspikes',
		condition: {
			// this is a side condition
			onStart(side) {
				this.effectData.gMaxLayers = 0;
				this.effectData.layers = 0;
				this.add('-sidestart', side, 'move: Toxic Spikes');
				if ( this.activeMove.id === 'gmaxmalodor' ){
					this.effectData.gMaxLayers = 1;
					this.effectData.layers = 1;
				} else {
					this.effectData.layers = 1;
				}
			},
			onRestart(side) {
				if ( this.activeMove.id === 'toxicspikes' ){
					if ( this.effectData.layers >= 2 ) return false;
					this.effectData.layers++;
				}
				else if ( this.activeMove.id === 'gmaxmalodor' ){
					if ( this.effectData.gMaxLayers >= 2 ) return false;
					this.effectData.gMaxLayers++;
					this.effectData.layers++;
				}
				this.add('-sidestart', side, 'move: Toxic Spikes');
			},
			onSwitchIn(pokemon) {
				let totalLayers = this.effectData.layers + this.effectData.gMaxLayers;
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Poison')) {
					if ( this.effectData.gMaxLayers === 0 ){
						this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
						pokemon.side.removeSideCondition('toxicspikes');
					} else if (this.effectData.gMaxLayers === 1) {
						this.effectData.layers = 0;
						this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
						this.add('-sidestart', side, 'move: Toxic Spikes');
					}					
				} else if (pokemon.hasType('Steel') || pokemon.hasItem('heavydutyboots')) {
					return;
				} else if ( totalLayers >= 2 ) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else if ( totalLayers === 1 ){
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Poison",
		zMoveBoost: {def: 1},
		contestType: "Clever",
	},
	"torment": {
		num: 259,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Prevents the target from selecting the same move for use two turns in a row. This effect ends when the target is no longer active.",
		shortDesc: "Target can't select the same move twice in a row.",
		id: "torment",
		name: "Torment",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		volatileStatus: 'torment',
		condition: {
			noCopy: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Torment');
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Torment');
			},
			onDisableMove(pokemon) {
				if ( pokemon.lastMove ) console.log( pokemon.lastMove.id );
				if (pokemon.lastMove && pokemon.lastMove.id !== 'struggle') pokemon.disableMove(pokemon.lastMove.id);
			},
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		zMoveBoost: {def: 1},
		contestType: "Tough",
	},
	"encore": {
		num: 227,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "For its next 3 turns, the target is forced to repeat its last move used. If the affected move runs out of PP, the effect ends. Fails if the target is already under this effect, if it has not made a move, if the move has 0 PP, or if the move is Assist, Copycat, Encore, Me First, Metronome, Mimic, Mirror Move, Nature Power, Sketch, Sleep Talk, Struggle, Transform, or any Z-Move.",
		shortDesc: "Target repeats its last move for its next 3 turns.",
		id: "encore",
		isViable: true,
		name: "Encore",
		pp: 5,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		volatileStatus: 'encore',
		condition: {
			duration: 3,
			noCopy: true, // doesn't get copied by Z-Baton Pass
			onStart(target) {
				const noEncore = [
					'assist', 'copycat', 'encore', 'mefirst', 'metronome', 'mimic', 'mirrormove', 'naturepower', 'sketch', 'sleeptalk', 'struggle', 'transform',
				];
				const move = target.lastMove;
				if ( target.lastMove ) console.log( target.lastMove.id );
				let moveIndex = move ? target.moves.indexOf(move.id) : -1;
				if (!move || move.isZ || move.isMax || noEncore.includes(move.id) || !target.moveSlots[moveIndex] || target.moveSlots[moveIndex].pp <= 0) {
					// it failed
					delete target.volatiles['encore'];
					return false;
				}
				this.effectData.move = move.id;
				this.add('-start', target, 'Encore');
				if (!this.willMove(target)) {
					this.effectData.duration++;
				}
			},
			onOverrideAction(pokemon, target, move) {
				if (move.id !== this.effectData.move) return this.effectData.move;
			},
			onResidualOrder: 13,
			onResidual(target) {
				if (target.moves.includes(this.effectData.move) && target.moveSlots[target.moves.indexOf(this.effectData.move)].pp <= 0) {
					// early termination if you run out of PP
					delete target.volatiles.encore;
					this.add('-end', target, 'Encore');
				}
			},
			onEnd(target) {
				this.add('-end', target, 'Encore');
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
		secondary: null,
		target: "normal",
		type: "Normal",
		zMoveBoost: {spe: 1},
		contestType: "Cute",
	},
	"doubleironbash": {
		num: 742,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit. Has a 30% chance to flinch the target.",
		shortDesc: "Hits twice. 30% chance to flinch.",
		id: "doubleironbash",
		isViable: true,
		name: "Double Iron Bash",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		multihit: 2,
		target: "normal",
		type: "Steel",
		zMovePower: 180,
		gmaxPower: 140,
		contestType: "Clever",
	},
	"playrough": {
		inherit: true,
		accuracy: 100,
	},
	"zenheadbutt": {
		inherit: true,
		accuracy: 100,
	},
	"psychocut": {
		inherit: true,
		basePower: 90,
	},
//------------------------------------------------------ Dynamax Moves ------------------------------------------------------------------
	"maxairstream": {
		inherit: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (let pokemon of source.side.active) {
					this.boost( {spe: 1,
								spa: -1,
								atk: -1},
								pokemon );
				}
			},
		},
	},
	"maxdarkness": {
		inherit: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (let pokemon of source.side.foe.active) {
					this.boost({spd: -1}, pokemon);
				}
				for (let pokemon of source.side.active) {
					pokemon.addVolatile('torment');
				}
			},
		},
	},
	"maxflare": {
		inherit: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				this.field.setWeather('sunnyday');
			},
		},
		onAfterHit(target, source) {
			if (source.hp) {
				let item = source.takeItem();
				if (item) {
					this.add('-enditem', source, item.name, '[from] move: Max Flare', '[of] ' + source);
				}
			}
		},
	},
	"maxflutterby": {
		inherit: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (let pokemon of source.side.foe.active) {
					this.boost({spa: -1}, pokemon);
				}
				for (let pokemon of source.side.active) {
					this.boost( {spd: -1}, pokemon );
				}
			},
		},
	},
	"maxgeyser": {
		inherit: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				this.field.setWeather('raindance');
				for (let pokemon of source.side.active) {
					this.boost( {def: -1}, pokemon );
				}
			},
		},
	},
	"maxhailstorm": {
		inherit: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				this.field.setWeather('hail');
				this.add('-clearboost', source);
			},
		},
	},
	"maxknuckle": {
		inherit: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (let pokemon of source.side.active) {
					this.boost({atk: 1}, pokemon);
				}
			},
		},
		recoil: [50, 100],
	},
	"maxlightning": {
		inherit: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				this.field.setTerrain('electricterrain');
			},
		},
		recoil: [33, 100],
	},
	"maxmindstorm": {
		inherit: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				this.field.setTerrain('psychicterrain');
				source.usedMindstorm = true;
			},
		},
	},
	"maxooze": {
		inherit: true,
		self: {
			onHit(target, source, move) {
				if (!source.volatiles['dynamax']) return;
				for (let pokemon of source.side.active) {
					this.boost({spa: 1}, pokemon);
				}
				if ( !source.status ){
					source.setStatus( 'tox', source, move, true );
				}
			},
		},
	},
	"maxovergrowth": {
		inherit: true,
		self: {
			onHit(target, source, move) {
				if (!source.volatiles['dynamax']) return;
				this.field.setTerrain('grassyterrain');
				source.addVolatile('tarshot');
			},
		},
	},
	"maxphantasm": {
		inherit: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (let pokemon of source.side.foe.active) {
					this.boost({def: -1}, pokemon);
				}
				source.addVolatile('curse');
			},
		},
	},
	"maxquake": {
		inherit: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (let pokemon of source.side.active) {
					this.boost({spd: 1, accuracy: -1}, pokemon);
				}
			},
		},
	},
	"maxrockfall": {
		inherit: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				this.field.setWeather('sandstorm');
				for (let pokemon of source.side.active) {
					this.boost({atk: -1}, pokemon);
				}
			},
		},
	},
	"maxstarfall": {
		inherit: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				this.field.setTerrain('mistyterrain');
				for (let pokemon of source.side.active) {
					this.boost({spa: -1}, pokemon);
				}
			},
		},
	},
	"maxsteelspike": {
		inherit: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (let pokemon of source.side.active) {
					this.boost({def: 1, spe: -1}, pokemon);
				}
			},
		},
	},
	"maxstrike": {
		inherit: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (let pokemon of source.side.foe.active) {
					this.boost({spe: -1}, pokemon);
				}
			},
			volatileStatus: 'maxstrike',
			condition: {
				noCopy: true,
				onStart(pokemon) {
					this.add('-start', pokemon, 'Max Strike');
				},
				onNegateImmunity(pokemon, type) {
					if (pokemon.hasType('Ghost') && ['Normal', 'Fighting'].includes(type)) return false;
					if (pokemon.hasType('Normal') && ['Ghost'].includes(type)) return false;
				},
			},
		},
	},
	"maxwyrmwind": {
		inherit: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (let pokemon of source.side.foe.active) {
					this.boost({atk: -1}, pokemon);
				}
				source.addVolatile('confusion');
			},
		},
	},
	"sonicboom": {
		inherit: true,
		basePower: 40,
		category: "Special",
		desc: "Priority +1, Sound move.",
		shortDesc: "Usually goes first. Sound Move.",
		name: "Sonic Boom",
		priority: 1,
		isNonstandard: null,
		flags: {sound: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	"pursuit": {
		inherit: true,
		isNonstandard: null,
	},
	"skyuppercut": {
		num: 327,
		accuracy: 95,
		basePower: 85,
		category: "Physical",
		desc: "This move can hit a target using Bounce, Fly, or Sky Drop, or is under the effect of Sky Drop.",
		shortDesc: "Can hit Pokemon using Bounce, Fly, or Sky Drop.",
		isNonstandard: null,
		name: "Sky Uppercut",
		onEffectiveness(typeMod, target, type) {
			if (type === 'Flying') return 1;
		},
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
	},
	"trumpcard": {
		num: 376,
		accuracy: true,
		basePower: 0,
		basePowerCallback(source, target, move) {
			move.allies = source.side.pokemon.filter(ally => ally !== source && ally.fainted);
			let basePower = 60 + move.allies.length;
			console.log(basePower);
			return basePower;
		},
		category: "Special",
		desc: "The power of this move is based on the amount of PP remaining after normal PP reduction and the Pressure Ability resolve. 200 power for 0 PP, 80 power for 1 PP, 60 power for 2 PP, 50 power for 3 PP, and 40 power for 4 or more PP.",
		shortDesc: "More power the fewer PP this move has left.",
		isNonstandard: null,
		name: "Trump Card",
		pp: 5,
		noPPBoosts: true,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 160},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},
	"crushgrip": {
		num: 462,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Crush Grip",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Normal",
	},
	"thundercage": {
		inherit: true,
		accuracy: 100,
		basePower: 90,
	},
	"wickedblow": {
		inherit: true,
		basePower: 75,
	},
	"astralbarrage": {
		inherit: true,
		basePower: 100,
		onBasePower(basePower, pokemon, target) {
			if (pokemon.speciesid === 'calyrexshadowrider') return 120;
		}
	},
	"glaciallance": {
		inherit: true,
		basePower: 100,
		onBasePower(basePower, pokemon, target) {
			if (pokemon.speciesid === 'calyrexicerider') return 130;
		}
	},
	junglehealing: {
		num: 818,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Jungle Healing",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onHit(pokemon) {
			let success = false;
			if (this.field.isTerrain('grassyterrain')) {
				success = !!this.heal(this.modify(pokemon.maxhp, 0.75));
			} else {
				success = !!this.heal(Math.ceil(pokemon.maxhp * 0.5));
			}
			return success;
		},
		secondary: null,
		target: "self",
		type: "Grass",
		zMove: {condition: 'clearnegativeboost'},
		contestType: "Clever",
	},
//------------------------------------------------------ Gigantamax Moves ------------------------------------------------------------------
	"gmaxbefuddle": {
		inherit: true,
		self: {
			onHit(source) {
				for (let pokemon of source.side.foe.active) {
					let result = this.random(3);
					if (result === 0) {
						pokemon.trySetStatus('slp', source);
					} else if (result === 1) {
						pokemon.trySetStatus('par', source);
					} else {
						pokemon.trySetStatus('psn', source);
					}
				}
				for (let pokemon of source.side.active) {
					this.boost( {spd: -1}, pokemon );
				}
			},
		},
	},
	"gmaxcentiferno": {
		inherit: true,
		self: {
			onHit(source) {
				for (let pokemon of source.side.foe.active) {
					pokemon.addVolatile('partiallytrapped', source, this.dex.getActiveMove('G-Max Centiferno'), 'trapper');
				}
			},
		},
		onAfterHit(target, source) {
			if (source.hp) {
				let item = source.takeItem();
				if (item) {
					this.add('-enditem', source, item.name, '[from] move: G-Max Centiferno', '[of] ' + source);
				}
			}
		},
	},
	"gmaxchistrike": {
		inherit: true,
		self: {
			onHit(source) {
				for (let pokemon of source.side.active) {
					pokemon.addVolatile('focusenergy');
				}
			},
		},
		recoil: [50, 100],
	},
	"gmaxcuddle": {
		inherit: true,
		self: {
			onHit(source) {
				for (let pokemon of source.side.foe.active) {
					pokemon.addVolatile('attract');
				}
			},
			volatileStatus: 'maxstrike',
			condition: {
				noCopy: true,
				onStart(pokemon) {
					this.add('-start', pokemon, 'G-Max Cuddle');
				},
				onNegateImmunity(pokemon, type) {
					if (pokemon.hasType('Ghost') && ['Normal', 'Fighting'].includes(type)) return false;
					if (pokemon.hasType('Normal') && ['Ghost'].includes(type)) return false;
				},
			},
		},
	},
	"gmaxdepletion": {
		inherit: true,
		self: {
			onHit(source) {
				source.addVolatile('confusion');
			},
			onAfterHit(source) {
				for (let pokemon of source.side.foe.active) {
					const move = pokemon.lastMove;
					if (move && !move.isZ && !move.isMax) {
						let ppDeducted = pokemon.deductPP(move.id, 4);
						if (ppDeducted) {
							this.add("-activate", pokemon, 'move: Max Depletion', move.name, ppDeducted);
							return;
						}
					}
					return false;
				}
			},
		},
	},
	"gmaxfinale": {
		inherit: true,
		self: {
			onAfterHit(source) {
				for (let pokemon of source.side.active) {
					this.heal(pokemon.maxhp / 6, pokemon, source);
				}
			},
			onHit(source) {
				for (let pokemon of source.side.active) {
					this.boost({spa: -1}, pokemon);
				}
			},
		},
	},
	"gmaxfoamburst": {
		inherit: true,
		self: {
			onHit(source) {
				for (let pokemon of source.side.foe.active) {
					this.boost({spe: -2}, pokemon);
				}
				let success = false;
				let removeTarget = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const targetCondition of removeTarget) {
					if (source.side.foe.removeSideCondition(targetCondition)) {
						if (!removeAll.includes(targetCondition)) continue;
						this.add('-sideend', source.side.foe, this.dex.getEffect(targetCondition).name, '[from] move: G-Max Wind Rage', '[of] ' + source);
						success = true;
					}
				}
				return success;
			},
		},
	},
	"gmaxgoldrush": {
		inherit: true,
		self: {
			onHit(source) {
				for (let pokemon of source.side.foe.active) {
					pokemon.addVolatile('confusion');
				}
			},
			volatileStatus: 'maxstrike',
			condition: {
				noCopy: true,
				onStart(pokemon) {
					this.add('-start', pokemon, 'G-Max Cuddle');
				},
				onNegateImmunity(pokemon, type) {
					if (pokemon.hasType('Ghost') && ['Normal', 'Fighting'].includes(type)) return false;
					if (pokemon.hasType('Normal') && ['Ghost'].includes(type)) return false;
				},
			},
		},
	},
	"gmaxgravitas": {
		inherit: true,
		self: {
			pseudoWeather: 'gravity',
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				source.usedMindstorm = true;
			},
		},
	},
	"gmaxmalodor": {
		inherit: true,
		isMax: "Garbodor",
		self: {
			onHit(target, source, move) {
				source.side.foe.addSideCondition('toxicspikes');
				for ( let pokemon of source.side.active ) {
					this.boost({ spe: -1 }, pokemon );
				}
			},
		},
	},
	"gmaxmeltdown": {
		self: {
			onHit(source) {
				for (let pokemon of source.side.foe.active) {
					pokemon.addVolatile('torment');
				}
				for (let pokemon of source.side.active) {
					this.boost({def: 1, spe: -1}, pokemon);
				}
			},
		},
	},
	"gmaxreplenish": {
		inherit: true,
		self: {
			onHit(source) {
				if (this.random(2) === 0) return;
				for (let pokemon of source.side.active) {
					if (!pokemon.item && pokemon.lastItem && this.dex.getItem(pokemon.lastItem).isBerry) {
						let item = pokemon.lastItem;
						pokemon.lastItem = '';
						this.add('-item', pokemon, this.dex.getItem(item), '[from] move: G-Max Replenish');
						pokemon.setItem(item);
					}
				}
			},
			volatileStatus: 'maxstrike',
			condition: {
				noCopy: true,
				onStart(pokemon) {
					this.add('-start', pokemon, 'Max Strike');
				},
				onNegateImmunity(pokemon, type) {
					if (pokemon.hasType('Ghost') && ['Normal', 'Fighting'].includes(type)) return false;
					if (pokemon.hasType('Normal') && ['Ghost'].includes(type)) return false;
				},
			},
		},
	},
	"gmaxresonance": {
		inherit: true,
		self: {
			sideCondition: 'auroraveil',
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				this.add('-clearboost', source);
			},
		},
	},
	"gmaxsandblast": {
		inherit: true,
		self: {
			onHit(source) {
				for (let pokemon of source.side.foe.active) {
					pokemon.addVolatile('partiallytrapped', source, this.dex.getActiveMove('G-Max Sandblast'), 'trapper');
				}
				for (let pokemon of source.side.active) {
					this.boost({accuracy: -1}, pokemon);
				}
			},
		},
	},
	"gmaxsmite": {
		inherit: true,
		self: {
			onHit(source) {
				for (let pokemon of source.side.foe.active) {
					pokemon.addVolatile('confusion', source);
				}
				for (let pokemon of source.side.active) {
					this.boost({spa: -1}, pokemon);
				}
			},
		},
	},
	"gmaxsnooze": {
		inherit: true,
		self: {
			onHit(source) {
				if (!source.volatiles['dynamax']) return;
				for (let pokemon of source.side.active) {
					pokemon.addVolatile('torment');
				}
			},
		},
	},
	"gmaxsteelsurge": {
		inherit: true,
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('gmaxsteelsurge');
				for (let pokemon of source.side.active) {
					this.boost({spe: -1}, pokemon);
				}
			},
		},
		condition: {
			onStart(side) {
				this.add('-sidestart', side, 'move: G-Max Steelsurge');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasItem('heavydutyboots')) return;
				let typeMod = this.dex.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('G-Max Steelsurge')), -6, 6);
				this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
			},
		},
	},
	"gmaxstonesurge": {
		inherit: true,
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('stealthrock');
				for (let pokemon of source.side.active) {
					this.boost( {def: -1}, source );
				}
			},
		},
	},
	"gmaxstunshock": {
		inherit: true,
		self: {
			onHit(source) {
				for (let pokemon of source.side.foe.active) {
					let result = this.random(2);
					if (result === 0) {
						pokemon.trySetStatus('par', source);
					} else {
						pokemon.trySetStatus('psn', source);
					}
				}
			},
		},
		recoil: [33, 100],
	},
	"gmaxsweetness": {
		inherit: true,
		self: {
			onHit(target, source) {
				if (target.hasType('Grass')) return null;
				target.addVolatile('leechseed', source);
				for (let pokemon of source.side.active) {
					this.boost( {spd: -1}, source );
				}
			},
		},
	},
	"gmaxtartness": {
		inherit: true,
		self: {
			onHit(target, source, move) {
				for (const pokemon of source.side.foe.active) {
					this.boost({def: -1}, pokemon);
				}
				for (const pokemon of source.side.active) {
					this.boost({accuracy: -1}, pokemon);
				}
			},
		},
		recoil: [33, 100],
	},
	"gmaxterror": {
		inherit: true,
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					pokemon.addVolatile('trapped', source, null, 'trapper');
				}
				source.addVolatile('curse');
			},
		},
	},
	"gmaxvolcalith": {
		inherit: true,
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('gmaxvolcalith');
				for (let pokemon of source.side.active) {
					this.boost({atk: -1}, pokemon);
				}
			},
		},
		condition: {
			duration: 4,
			onStart(targetSide) {
				this.add('-sidestart', targetSide, 'G-Max Volcalith');
			},
			onResidual(targetSide) {
				for (const pokemon of targetSide.active) {
					this.damage(pokemon.baseMaxhp / 8, pokemon);
				}
			},
			onEnd(targetSide) {
				this.add('-sideend', targetSide, 'G-Max Volcalith');
			},
		},
	},
	"gmaxvoltcrash": {
		inherit: true,
		self: {
			onHit(source) {
				for (const pokemon of source.side.foe.active) {
					pokemon.trySetStatus('par', source);
				}
			},
		},
		ignoreImmunity: {'Electric': true},
		ignoreAbility: true,
		recoil: [33, 100],
	},
	"gmaxwildfire": {
		inherit: true,
		recoil: [33, 100],
		onAfterHit(target, source) {
			if (source.hp) {
				let item = source.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Max Flare', '[of] ' + target);
				}
			}
		},
	},
	"gmaxwindrage": {
		inherit: true,
		self: {
			onHit(source) {
				let success = false;
				let removeTarget = ['reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
				let removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const targetCondition of removeTarget) {
					if (source.side.foe.removeSideCondition(targetCondition)) {
						if (!removeAll.includes(targetCondition)) continue;
						this.add('-sideend', source.side.foe, this.dex.getEffect(targetCondition).name, '[from] move: G-Max Wind Rage', '[of] ' + source);
						success = true;
					}
				}
				for (const sideCondition of removeAll) {
					if (source.side.removeSideCondition(sideCondition)) {
						this.add('-sideend', source.side, this.dex.getEffect(sideCondition).name, '[from] move: G-Max Wind Rage', '[of] ' + source);
						success = true;
					}
				}
				this.field.clearTerrain();
				for (let pokemon of source.side.active) {
					this.boost( { spa: -1, atk: -1}, pokemon );
				}
				return success;
			},
		},
	},
};
