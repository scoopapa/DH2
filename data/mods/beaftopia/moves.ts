export const Moves: {[k: string]: ModdedMoveData} = {
	attract: {
		num: 213,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		viable: true,
		name: "Attract",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, metronome: 1},
		volatileStatus: 'attract',
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(pokemon, source, effect) {
				if (!(source.gender === 'M' || source.gender === 'F')) {
					this.debug('incompatible gender');
					return false;
				}
				if (source.status === 'cfs') {
					this.debug('target is confused');
					return false;
				}
				if (!this.runEvent('Attract', pokemon, source)) {
					this.debug('Attract event failed');
					return false;
				}

				if (effect.name === 'Cute Charm') {
					this.add('-start', pokemon, 'Attract', '[from] ability: Cute Charm', '[of] ' + source);
				} else if (effect.name === 'Destiny Knot') {
					this.add('-start', pokemon, 'Attract', '[from] item: Destiny Knot', '[of] ' + source);
				} else {
					this.add('-start', pokemon, 'Attract');
				}
			},
			onUpdate(pokemon) {
				if (this.effectState.source && !this.effectState.source.isActive && pokemon.volatiles['attract']) {
					this.debug('Removing Attract volatile on ' + pokemon);
					pokemon.removeVolatile('attract');
				}
			},
			onBasePower(basePower, attacker, defender, move) {
				return this.chainModify([1, 2]);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Attract', '[silent]');
			},
		},
		onTryImmunity(target, source) {
			return (source.gender === 'M' || source.gender === 'F');
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	blizzard: {
		num: 59,
		accuracy: 70,
		basePower: 110,
		category: "Special",
		shortDesc: "Sets Snow after damaging the target. Can't miss in Snow.",
		name: "Blizzard",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, wind: 1},
		onModifyMove(move) {
			if (this.field.isWeather(['hail', 'snow'])) move.accuracy = true;
		},
		weather: 'snow',
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
	},
	bodyslam: {
		num: 34,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		shortDesc: "Lowers the target's Speed.",
		name: "Body Slam",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, nonsky: 1, metronome: 1},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
	bounce: {
		num: 340,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		shortDesc: "Bounces + raises Speed turn 1. Hits turn 2.",
		viable: true,
		name: "Bounce",
		pp: 5,
		priority: 0,
		flags: {
			contact: 1, charge: 1, protect: 1, mirror: 1, gravity: 1, distance: 1,
			metronome: 1, nosleeptalk: 1, noassist: 1, failinstruct: 1,
		},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({spe: 1}, attacker, attacker, move);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		condition: {
			duration: 2,
			onInvulnerability(target, source, move) {
				if (['gust', 'twister', 'skyuppercut', 'thunder', 'hurricane', 'smackdown', 'thousandarrows'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceBasePower(basePower, target, source, move) {
				if (move.id === 'gust' || move.id === 'twister') {
					return this.chainModify(2);
				}
			},
		},
		target: "any",
		type: "Flying",
		contestType: "Cute",
	},
	burningjealousy: {
		num: 807,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Burning Jealousy",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (target?.statsRaisedThisTurn) {
					target.addVolatile('burn', this.effectState.source);
				}
			},
		},
		target: "allAdjacentFoes",
		type: "Fire",
		contestType: "Tough",
	},
	confuseray: {
		num: 109,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		viable: true,
		name: "Confuse Ray",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1},
		status: 'cfs',
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
	confusion: {
		num: 93,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Confusion",
		pp: 25,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 10,
			status: 'cfs',
		},
	},
	darkpulse: {
		num: 399,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "20% chance to lower the target's Sp. Def by 1.",
		name: "Dark Pulse",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1, metronome: 1, pulse: 1},
		secondary: {
			chance: 20,
			boosts: {
				spd: -1,
			},
		},
		target: "any",
		type: "Dark",
		contestType: "Cool",
	},
	drainingkiss: {
		num: 577,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		shortDesc: "User recovers 75% damage dealt. x2 power if target is infatuated.",
		viable: true,
		name: "Draining Kiss",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1, metronome: 1},
		onBasePower(basePower, pokemon, target) {
			if (target.volatiles['attract']) {
				return this.chainModify(2);
			}
		},
		drain: [3, 4],
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Cute",
	},
	dynamicpunch: {
		num: 223,
		accuracy: 50,
		basePower: 100,
		category: "Physical",
		name: "Dynamic Punch",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, metronome: 1},
		secondary: {
			chance: 100,
			status: 'cfs',
		},
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
	},
	ember: {
		num: 52,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Ember",
		pp: 25,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'burn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Cute",
	},
	firefang: {
		num: 424,
		accuracy: 95,
		basePower: 65,
		category: "Physical",
		shortDesc: "50% chance to burn the target.",
		name: "Fire Fang",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1},
		secondary: [
			{
				chance: 50,
				volatileStatus: 'burn',
			},
		],
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	flamethrower: {
		num: 53,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "20% chance to burn the target.",
		name: "Flamethrower",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 20,
			volatileStatus: 'burn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	flareblitz: {
		num: 394,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		shortDesc: "Has 33% recoil. 20% chance to burn.",
		name: "Flare Blitz",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, defrost: 1, metronome: 1},
		recoil: [33, 100],
		secondary: {
			chance: 20,
			volatileStatus: 'burn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	flatter: {
		num: 260,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Flatter",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, allyanim: 1, metronome: 1},
		status: 'cfs',
		boosts: {
			spa: 1,
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		zMove: {boost: {spd: 1}},
		contestType: "Clever",
	},
	freezedry: {
		num: 573,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Freeze-Dry",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Water') return 1;
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	heatwave: {
		num: 257,
		accuracy: 80,
		basePower: 110,
		category: "Special",
		shortDesc: "30% chance to burn. Can't miss in Sun.",
		name: "Heat Wave",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, wind: 1},
		onModifyMove(move) {
			if (this.field.isWeather(['sun'])) move.accuracy = true;
		},
		secondary: {
			chance: 30,
			volatileStatus: 'burn',
		},
		target: "allAdjacentFoes",
		type: "Fire",
		contestType: "Beautiful",
	},
	hex: {
		num: 506,
		accuracy: 100,
		basePower: 65,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.volatiles['burn'] || target.hasAbility('comatose')) {
				this.debug('BP doubled from status condition');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Special",
		shortDesc: "Power doubles if the target is Poisoned, Confused, or Burned.",
		name: "Hex",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Ghost",
		zMove: {basePower: 160},
		contestType: "Clever",
	},
	hotshot: {
		num: 1002,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		shortDesc: "+1 Priority. 30% chance to burn the target.",
		viable: true,
		name: "Hot Shot",
		pp: 30,
		priority: 1,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'burn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	hurricane: {
		num: 542,
		accuracy: 70,
		basePower: 110,
		category: "Special",
		name: "Hurricane",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1, metronome: 1, wind: 1},
		onModifyMove(move, pokemon, target) {
			switch (target?.effectiveWeather()) {
			case 'raindance':
			case 'primordialsea':
				move.accuracy = true;
				break;
			case 'sunnyday':
			case 'desolateland':
				move.accuracy = 50;
				break;
			}
		},
		secondary: {
			chance: 30,
			status: 'cfs',
		},
		target: "any",
		type: "Flying",
		contestType: "Tough",
	},
	hydropump: {
		num: 56,
		accuracy: 80,
		basePower: 110,
		category: "Special",
		shortDesc: "Can't miss in Rain.",
		name: "Hydro Pump",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move) {
			if (this.field.isWeather(['rain'])) move.accuracy = true;
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},
	icebeam: {
		num: 58,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "No additional effect.",
		name: "Ice Beam",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	icefang: {
		num: 423,
		accuracy: 95,
		basePower: 65,
		category: "Physical",
		shortDesc: "50% chance to lower the target's Speed by 1.",
		name: "Ice Fang",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1},
		secondary: {
			chance: 50,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Ice",
		contestType: "Cool",
	},
	ironhead: {
		num: 442,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Iron Head",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 30,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Steel",
		contestType: "Tough",
	},
	knockoff: {
		num: 282,
		accuracy: 100,
		basePower: 35,
		category: "Physical",
		shortDesc: "2x power if the target is holding an item; removes target's item.",
		name: "Knock Off",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onBasePower(basePower, source, target, move) {
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemState, target, target, move, item)) return;
			if (item.id) {
				return this.chainModify(2);
			}
		},
		onAfterHit(target, source) {
			if (source.hp) {
				const item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Knock Off', '[of] ' + source);
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Clever",
	},
	lovebomb: {
		num: 1001,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		shortDesc: "50% chance to infatuate the target.",
		viable: true,
		name: "Love Bomb",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		secondary: {
			chance: 50,
			volatileStatus: 'attract',
		},
		target: "normal",
		type: "Fairy",
		contestType: "Beautiful",
	},
	mirrorshot: {
		num: 429,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		shortDesc: "Confuses the target.",
		viable: true,
		name: "Mirror Shot",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 100,
			status: 'cfs',
		},
		target: "normal",
		type: "Steel",
		contestType: "Beautiful",
	},
	poisongas: {
		num: 139,
		accuracy: 90,
		basePower: 0,
		category: "Status",
		shortDesc: "Poisons the target. Can't miss if used by a Poison type.",
		viable: true,
		name: "Poison Gas",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1},
		status: 'psn',
		secondary: null,
		target: "allAdjacentFoes",
		type: "Poison",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	poisonpowder: {
		num: 77,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "Poisons the target and lowers their SpDef one stage.",
		viable: true,
		name: "Poison Powder",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1, powder: 1},
		status: 'psn',
		boosts: {
			spd: -1,
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	powergem: {
		num: 408,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Power Gem",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Beautiful",
	},
	psybeam: {
		num: 60,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		name: "Psybeam",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 10,
			status: 'cfs',
		},
		target: "normal",
		type: "Psychic",
		contestType: "Beautiful",
	},
	rockslide: {
		num: 157,
		accuracy: 90,
		basePower: 75,
		category: "Physical",
		shortDesc: "50% chance to lower the target's Speed by 1.",
		name: "Rock Slide",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 50,
			boosts: {
				spe: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Rock",
		contestType: "Tough",
	},
	safeguard: {
		num: 219,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Safeguard",
		pp: 25,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		sideCondition: 'safeguard',
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Safeguard');
					return 7;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (!effect || !source) return;
				if (effect.id === 'yawn') return;
				if (effect.effectType === 'Move' && effect.infiltrates && !target.isAlly(source)) return;
				if (target !== source) {
					this.debug('interrupting setStatus');
					if (effect.name === 'Synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'move: Safeguard');
					}
					return null;
				}
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!effect || !source) return;
				if (effect.effectType === 'Move' && effect.infiltrates && !target.isAlly(source)) return;
				if ((status.id === 'confusion' || status.id === 'burn' || status.id === 'yawn') && target !== source) {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Safeguard');
					return null;
				}
			},
			onSideStart(side, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-sidestart', side, 'Safeguard', '[persistent]');
				} else {
					this.add('-sidestart', side, 'Safeguard');
				}
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 3,
			onSideEnd(side) {
				this.add('-sideend', side, 'Safeguard');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Normal",
		zMove: {boost: {spe: 1}},
		contestType: "Beautiful",
	},
	scald: {
		num: 503,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "Burns the target.",
		name: "Scald",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1, metronome: 1},
		thawsTarget: true,
		secondary: {
			chance: 100,
			volatileStatus: 'burn',
		},
		target: "normal",
		type: "Water",
		contestType: "Tough",
	},
	scorchingsands: {
		num: 815,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		shortDesc: "Burns the target.",
		name: "Scorching Sands",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1, metronome: 1},
		thawsTarget: true,
		secondary: {
			chance: 100,
			volatileStatus: 'burn',
		},
		target: "normal",
		type: "Ground",
	},
	singe: {
		num: 1003,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "Burns the target.",
		viable: true,
		name: "Singe",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1},
		volatileStatus: 'burn',
		secondary: null,
		target: "normal",
		type: "Fire",
		zMove: {boost: {atk: 1}},
		contestType: "Beautiful",
	},
	skydrop: {
		inherit: true,
		basePower: 100,
		viable: true,
	},
	spicyextract: {
		inherit: true,
		viable: true,
	},
	supersonic: {
		num: 48,
		accuracy: 80,
		basePower: 0,
		category: "Status",
		shortDesc: "Confuses the target and harshly lowers their Special Attack.",
		viable: true,
		name: "Supersonic",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		status: 'cfs',
		boosts: {
			spa: -2,
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {boost: {spe: 1}},
		contestType: "Clever",
	},
	swagger: {
		num: 207,
		accuracy: 85,
		basePower: 0,
		category: "Status",
		name: "Swagger",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, allyanim: 1, metronome: 1},
		status: 'cfs',
		boosts: {
			atk: 2,
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cute",
	},
	sweetkiss: {
		num: 186,
		accuracy: 90,
		basePower: 0,
		category: "Status",
		shortDesc: "Confuses the target and lowers their Defense one stage.",
		viable: true,
		name: "Sweet Kiss",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1},
		status: 'cfs',
		boosts: {
			def: -1,
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		zMove: {boost: {spa: 1}},
		contestType: "Cute",
	},
	temposhift: {
		num: 1004,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User dodges all attacks next turn.",
		viable: true,
		name: "Tempo Shift",
		pp: 10,
		priority: -7,
		flags: {noassist: 1, failcopycat: 1},
		stallingMove: true,
		volatileStatus: 'temposhift',
		condition: {
			duration: 2,
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(pokemon, source, effect) {
				if (!this.runEvent('Tempo Shift', pokemon, source)) {
					this.debug('Tempo Shift event failed');
					return false;
				}

				this.add('-start', pokemon, 'Tempo Shift');
			},
			onTryHit(target, source, move) {
				if (move?.accuracy != true) {
					this.add('-miss', source, target);
					return null;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Tempo Shift', '[silent]');
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {boost: {evasion: 1}},
		contestType: "Cool",
	},
	thunderbolt: {
		num: 85,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		shortDesc: "10% chance to give the user the Charge effect.",
		name: "Thunderbolt",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 10,
			self: {
				volatileStatus: 'charge',
			},
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	thunder: {
		num: 87,
		accuracy: 70,
		basePower: 110,
		category: "Special",
		shortDesc: "30% chance to give the user Charge. Can't miss in Rain.",
		name: "Thunder",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon, target) {
			switch (target?.effectiveWeather()) {
			case 'raindance':
			case 'primordialsea':
				move.accuracy = true;
				break;
			case 'sunnyday':
			case 'desolateland':
				move.accuracy = 50;
				break;
			}
		},
		secondary: {
			chance: 30,
			self: {
				volatileStatus: 'charge',
			},
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	thunderfang: {
		num: 422,
		accuracy: 95,
		basePower: 65,
		category: "Physical",
		shortDesc: "50% chance to give the user the Charge effect.",
		name: "Thunder Fang",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1},
		secondary: {
			chance: 50,
			self: {
				volatileStatus: 'charge',
			},
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	thundershock: {
		num: 84,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		shortDesc: "10% chance to give the user the Charge effect.",
		name: "Thunder Shock",
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 10,
			self: {
				volatileStatus: 'charge',
			},
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	toxicspikes: {
		num: 390,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Poisons grounded foes on switch-in. Max 1 layer.",
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
				if (this.effectState.layers >= 1) return false;
				this.add('-sidestart', side, 'move: Toxic Spikes');
				this.effectState.layers++;
			},
			onEntryHazard(pokemon) {
				if (!pokemon.isGrounded()) return;
				if (pokemon.hasType('Poison')) {
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
		secondary: null,
		target: "foeSide",
		type: "Poison",
		zMove: {boost: {def: 1}},
		contestType: "Clever",
	},
	voltswitch: {
		inherit: true,
		basePower: 50,
	},
	waterpulse: {
		num: 352,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Water Pulse",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1, metronome: 1, pulse: 1},
		secondary: {
			chance: 20,
			status: 'cfs',
		},
		target: "any",
		type: "Water",
		contestType: "Beautiful",
	},
	zenheadbutt: {
		num: 428,
		accuracy: 90,
		basePower: 80,
		category: "Physical",
		shortDesc: "20% chance to confuse the target.",
		name: "Zen Headbutt",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 20,
			status: 'cfs',
		},
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	zingzap: {
		num: 716,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "30% chance to give the user the Charge effect.",
		name: "Zing Zap",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 30,
			self: {
				volatileStatus: 'charge',
			},
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
};
