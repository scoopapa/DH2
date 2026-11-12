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

export const Moves: {[k: string]: ModdedMoveData} = {
	jewelledsquall: {
		num: -1,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Jewelled Squall",
		shortDesc: "Steals target's boosts before dealing damage.",
		pp: 10,
		priority: 0,
		flags: {wind: 1, protect: 1, mirror: 1, bypasssub: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Hurricane", target);
		},
		stealsBoosts: true,
		secondary: null,
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
	earthbending: {
		num: -2,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Earthbending",
		shortDesc: "10% chance to make the target flinch.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Earthquake", target);
		},
		secondary: {
			chance: 10,
			volatilestatus: 'flinch',
		},
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	metalbending: {
		num: -3,
		accuracy: 100,
		basePower: 200,
		category: "Physical",
		name: "Metalbending",
		shortDesc: "Steel/Ground-type depending on which is more effective.",
		pp: 1,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Max Steelspike", target);
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			for (const target of pokemon.side.foe.active) {
			const type1 = 'Steel';
			const type2 = 'Ground';
				if (this.dex.getEffectiveness(type1, target) < this.dex.getEffectiveness(type2, target)) {
					move.type = 'Ground';
				} else if (target.hasType('Flying') && !target.hasItem('ringtarget')) {
					move.type = 'Ground';
				} else if (this.dex.getEffectiveness(type1, target) === this.dex.getEffectiveness(type2, target)) {
					if (pokemon.hasType('Steel') && !pokemon.hasType('Ground')) {
						move.type = 'Ground';
					}
				}
			}
		},
		onHit(target, source, move) {
			this.add('-message', `Metalbending dealt ${move.type}-type damage!`);
		},
		isZ: "tophiumz",
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Tough",
	},
	energonaxe: {
		num: -4,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		shortDesc: "Ignores the target's stat stage changes.",
		name: "Energon Axe",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Smart Strike", target);
		},
		ignoreDefensive: true,
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Tough",
	},
	toxickiss: {
		num: -5,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Toxic Kiss",
		shortDesc: "30% to psn; always crits statused targets.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Lovely Kiss", target);
		},
		onModifyCritRatio(critRatio, source, target) {
			if (target && target.status) return 5;
		},
		secondary: {
			chance: 30,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		contestType: "Beautiful",
	},
	badbreath: {
		num: -6,
		accuracy: 90,
		basePower: 0,
		category: "Status",
		name: "Bad Breath",
		shortDesc: "Paralyzes the target.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Poison Gas", target);
		},
		status: 'par',
		ignoreImmunity: false,
		secondary: null,
		target: "normal",
		type: "Poison",
		zMove: {boost: {spd: 1}},
		contestType: "Tough",
	},
	snackattack: {
		num: -7,
		accuracy: 100,
		basePower: 150,
		category: "Physical",
		name: "Snack Attack",
		pp: 1,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Malicious Moonsault", target);
		},
		onModifyTypePriority: -1,
		onAfterHit(target, source) {
			if (source.hp) {
				const item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Snack Attack', '[of] ' + source);
					source.heal(Math.floor(target.baseMaxhp / 3));
				}
			}
		},
		isZ: "garfieldiumz",
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},
	metamorphiefociesse: {
		num: 521,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Metamorphie Fociesse",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Moonblast", target);
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Cool",
	},
	digitaltorment: {
		name: "Digital Torment",
		type: "Electric",
		category: "Special",
		basePower: 80,
		basePowerCallback(pokemon, target, move) {
			if (pokemon.hp * 2 <= pokemon.maxhp) return 95;
			return move.basePower;
		},
		accuracy: 100,
		pp: 10,
		shortDesc: "1/2 HP: 95 BP, 100% Torment.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Torment", target);
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.hp * 2 <= source.maxhp) target.addVolatile('torment', source, move);
			},
		},
		target: "normal",
	},
	titaniumdragon: {
		name: "Titanium Dragon",
		type: "Steel",
		category: "Special",
		basePower: 90,
		accuracy: 100,
		pp: 10,
		shortDesc: "10% chance to lower the target's Sp. Def by 1.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, sound: 1, bypasssub: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Bug Buzz", target);
		},
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
	},
	gravityrelease: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Gravity Release",
		shortDesc: "User and foe fly up turn 1. Damages on turn 2.",
		pp: 10,
		priority: 0,
		flags: {
			contact: 1, charge: 1, protect: 1, mirror: 1, gravity: 1, distance: 1,
			metronome: 1, nosleeptalk: 1, noassist: 1, failinstruct: 1,
		},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Sky Drop", target);
		},
		onModifyMove(move, source) {
			if (!source.volatiles['gravityrelease']) {
				move.accuracy = true;
				delete move.flags['contact'];
			}
		},
		onMoveFail(target, source) {
			if (source.volatiles['twoturnmove'] && source.volatiles['twoturnmove'].duration === 1) {
				source.removeVolatile('gravityrelease');
				source.removeVolatile('twoturnmove');
				if (target === this.effectState.target) {
					this.add('-end', target, 'Gravity Release', '[interrupt]');
				}
			}
		},
		onTry(source, target) {
			return !target.fainted;
		},
		onTryHit(target, source, move) {
			if (source.removeVolatile(move.id)) {
				if (target !== source.volatiles['twoturnmove'].source) return false;

				if (target.hasType('Flying')) {
					this.add('-immune', target);
					return null;
				}
			} else {
				if (target.volatiles['substitute'] || target.isAlly(source)) {
					return false;
				}
				if (target.getWeight() >= 2000) {
					this.add('-fail', target, 'move: Gravity Release', '[heavy]');
					return null;
				}

				this.add('-prepare', source, move.name, target);
				source.addVolatile('twoturnmove', target);
				return null;
			}
		},
		onHit(target, source) {
			if (target.hp) this.add('-end', target, 'Gravity Release');
		},
		condition: {
			duration: 2,
			onAnyDragOut(pokemon) {
				if (pokemon === this.effectState.target || pokemon === this.effectState.source) return false;
			},
			onFoeTrapPokemonPriority: -15,
			onFoeTrapPokemon(defender) {
				if (defender !== this.effectState.source) return;
				defender.trapped = true;
			},
			onFoeBeforeMovePriority: 12,
			onFoeBeforeMove(attacker, defender, move) {
				if (attacker === this.effectState.source) {
					attacker.activeMoveActions--;
					this.debug('Gravity Release nullifying.');
					return null;
				}
			},
			onRedirectTargetPriority: 99,
			onRedirectTarget(target, source, source2) {
				if (source !== this.effectState.target) return;
				if (this.effectState.source.fainted) return;
				return this.effectState.source;
			},
			onAnyInvulnerability(target, source, move) {
				if (target !== this.effectState.target && target !== this.effectState.source) {
					return;
				}
				if (source === this.effectState.target && target === this.effectState.source) {
					return;
				}
				if (['gust', 'twister', 'skyuppercut', 'leapingslash', 'thunder', 'hurricane', 'smackdown', 'thousandarrows'].includes(move.id)) {
					return;
				}
				return false;
			},
			onAnyBasePower(basePower, target, source, move) {
				if (target !== this.effectState.target && target !== this.effectState.source) {
					return;
				}
				if (source === this.effectState.target && target === this.effectState.source) {
					return;
				}
				if (move.id === 'gust' || move.id === 'twister') {
					this.debug('BP doubled on midair target');
					return this.chainModify(2);
				}
			},
			onFaint(target) {
				if (target.volatiles['skydrop'] && target.volatiles['twoturnmove'].source) {
					this.add('-end', target.volatiles['twoturnmove'].source, 'Gravity Release', '[interrupt]');
				}
			},
		},
		secondary: null,
		target: "any",
		type: "Psychic",
		contestType: "Tough",
	},
	zerogravity: {
		name: "Zero Gravity",
		type: "Psychic",
		category: "Status",
		basePower: 0,
		accuracy: true,
		pp: 10,
		shortDesc: "User switches out. Replacement gains Magnet Rise for 2 turns.",
		priority: 0,
		flags: {metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Teleport", target);
		},
		onTry(source) {
			return !!this.canSwitch(source.side);
		},
		selfSwitch: true,
		slotCondition: 'zerogravity',
		condition: {
			onSwap(target) {
				if (!target.fainted) {
					
				}
			},
		},
		secondary: null,
		target: "normal",
	},
	demonicarm: {
		name: "Demonic Arm",
		type: "Dark",
		category: "Physical",
		basePower: 130,
		accuracy: 90,
		pp: 5,
		shortDesc: "Lowers user's Attack by 2.",
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Hammer Arm", target);
		},
		self: {
			boosts: {
				atk: -2,
			},
		},
		secondary: null,
		target: "normal",
	},
	forcechoke: {
		name: "Force Choke",
		type: "Dark",
		category: "Special",
		basePower: 80,
		accuracy: 100,
		pp: 15,
		shortDesc: "For 2 turns, the target cannot use sound moves.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Throat Chop", target);
		},
		condition: {
			duration: 2,
			onStart(target) {
				this.add('-start', target, 'Force Choke', '[silent]');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).flags['sound']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (!move.isZ && !move.isMax && move.flags['sound']) {
					this.add('cant', pokemon, 'move: Force Choke');
					return false;
				}
			},
			onModifyMove(move, pokemon, target) {
				if (!move.isZ && !move.isMax && move.flags['sound']) {
					this.add('cant', pokemon, 'move: Force Choke');
					return false;
				}
			},
			onResidualOrder: 22,
			onEnd(target) {
				this.add('-end', target, 'Force Choke', '[silent]');
			},
		},
		secondary: {
			chance: 100,
			onHit(target) {
				target.addVolatile('forcechoke');
			},
		},
		target: "normal",
	},
	sacredcreatewater: {
		accuracy: 100,
		basePower: 130,
		category: "Special",
		name: "Sacred Create Water",
		shortDesc: "Fails if there is no terrain active. Ends the terrain.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Steel Roller", target);
		},
		onTry() {
			return !this.field.isTerrain('');
		},
		onHit() {
			this.field.clearTerrain();
		},
		onAfterSubDamage() {
			this.field.clearTerrain();
		},
		secondary: null,
		target: "normal",
		type: "Water",
	},
	godblow: {
		name: "God Blow",
		type: "Psychic",
		category: "Special",
		basePower: 185,
		accuracy: true,
		pp: 1,
		shortDesc: "Psyshock + Clear Smog",
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		overrideDefensiveStat: 'def',
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Genesis Supernova", target);
		},
		onHit(target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		isZ: "aquaiumz",
		secondary: null,
		target: "normal",
	},
	leapingslash: {
		name: "Leaping Slash",
		type: "Rock",
		category: "Physical",
		basePower: 85,
		accuracy: 90,
		pp: 15,
		shortDesc: "Can hit Pokemon using Bounce, Fly, or Sky Drop.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1, slicing: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Sky Uppercut", target);
		},
		secondary: null,
		target: "normal",
	},
	creation: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Creation",
		pp: 1,
		noPPBoosts: true,
		priority: 1,
		flags: {},
		onHit(target, source) {
			const move = target.lastMove;
			if (source.transformed || !move || source.moves.includes(move.id)) return false;
			if (move.flags['nosketch'] || move.isZ || move.isMax) return false;
			const sketchIndex = source.moves.indexOf('creation');
			if (sketchIndex < 0) return false;
			const sketchedMove = {
				move: move.name,
				id: move.id,
				pp: move.pp,
				maxpp: move.pp,
				target: move.target,
				disabled: false,
				used: false,
			};
			source.moveSlots[sketchIndex] = sketchedMove;
			source.baseMoveSlots[sketchIndex] = sketchedMove;
			this.add('-activate', source, 'move: Creation', move.name);
			source.addVolatile('creation');
		},
		condition: {
			noCopy: true,
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Creation', '[silent]');
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source) {
					this.debug('Creation weaken');
					return this.chainModify(0.5);
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Creation', '[silent]');
			},
		}
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Clever",
	},
	venomweb: {
		name: "Venom Web",
		type: "Electric",
		category: "Physical",
		basePower: 90,
		accuracy: 100,
		pp: 10,
		shortDesc: "Prevents the target from switching out.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Spirit Shackle", target);
		},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
	},
	assassinate: {
		name: "Assassinate",
		type: "Ghost",
		category: "Physical",
		basePower: 90,
		accuracy: 100,
		pp: 10,
		shortDesc: "User recovers 50% of the damage dealt.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1, slicing: 1},
		drain: [1, 2],
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Bitter Blade", target);
		},
		secondary: null,
		target: "normal",
	},
	knifeedge: {
		name: "Knife Edge",
		type: "Steel",
		category: "Physical",
		basePower: 80,
		accuracy: 100,
		pp: 10,
		shortDesc: "High critical hit ratio.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, slicing: 1},
		critRatio: 2,
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Slash", target);
		},
		secondary: null,
		target: "normal",
	},
	
	//vanilla
	toxicspikes: {
		inherit: true,
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
				if (pokemon.hasType('Poison') || pokemon.hasAbility('insectbreathing')) {
					this.add('-sideend', pokemon.side, 'move: Toxic Spikes', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('toxicspikes');
				} else if (pokemon.hasType('Steel') || pokemon.hasItem('heavydutyboots')) {
					return;
				} else if (this.effectState.layers >= 2) {
					pokemon.trySetStatus('tox', pokemon.side.foe.active[0]);
				} else {
					pokemon.trySetStatus('psn', pokemon.side.foe.active[0]);
				}
			},
		},
	},
	magnetrise: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (effect?.id === 'zerogravity') {
					return 2;
				}
				return 5;
			},
			onStart(target) {
				this.add('-start', target, 'Magnet Rise');
			},
			onImmunity(type) {
				if (type === 'Ground') return false;
			},
			onResidualOrder: 18,
			onEnd(target) {
				this.add('-end', target, 'Magnet Rise');
			},
		},
	},
};
