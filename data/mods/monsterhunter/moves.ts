export const Moves: {[moveid: string]: MoveData} = {
	/*
	CUSTOM MOVES
	*/
	magnalance: {
		num: 2000,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Magna Lance",
		shortDesc: "Usually goes first. Fails if target is not attacking.",
		pp: 5,
		priority: 1,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || (move.category === 'Status' && move.id !== 'mefirst') || target.volatiles['mustrecharge']) {
				return false;
			}
		},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Torch Song", target);
        },
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Clever",
	},
	eggbarrage: {
		num: 2001,
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		category: "Physical",
		name: "Egg Barrage",
		shortDesc: "Hits 3 times. Each hit can miss, but power rises.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		multihit: 3,
		multiaccuracy: true,
		secondary: null,
		target: "normal",
		type: "Normal",
		zMove: {basePower: 120},
		maxMove: {basePower: 140},
	},
	glidebomb: {
		num: 2002,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		name: "Glide Bomb",
		shortDesc: "Hits 2-5 times in one turn.",
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Fire",
		zMove: {basePower: 140},
		maxMove: {basePower: 130},
		contestType: "Beautiful",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Fire Lash", target);
        },
	},
	dragonator: {
		num: 2003,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Dragonator",
		shortDesc: "Cannot be used on consecutive turns. Super-Effective on Dragon-Types. 10% Flinch.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, cantusetwice: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Dragon') return 1;
		},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Gigaton Hammer", target);
        },
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Steel",
		contestType: "Beautiful",
	},
	devour: {
		num: 2004,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Devour",
		shortDesc: "Recovers HP and eats held berry. Fails if user isn't holding a berry.",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1, metronome: 1},
		heal: [1, 2],
		onTry(source) {
			return source.getItem().isBerry;
		},
		onHit(pokemon) {
			pokemon.eatItem(true);
		},
		secondary: null,
		target: "self",
		type: "Normal",
		contestType: "Beautiful",
	},
	wretchedwater: {
		num: 2005,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Wretched Water",
		shortDesc: "30% chance to paralyze the target.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "allAdjacentFoes",
		type: "Water",
		contestType: "Cool",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Whirlpool", target);
        },
	},
	cutwingbarrage: {
		num: 2006,
		accuracy: 95,
		basePower: 90,
		category: "Physical",
		name: "Cutwing Barrage",
		shortDesc: "May cause flinching.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, slicing: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'bleeding',
		},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Aerial Ace", target);
        },
		target: "normal",
		type: "Flying",
		contestType: "Cool",
	},
	thunderrush: {
		num: 2007,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Thunder Rush",
		shortDesc: "Always crits.",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Supercell Slam", target);
        },
	},
	frenzyslam: {
		num: 2008,
		accuracy: 95,
		basePower: 80,
		category: "Special",
		name: "Frenzy Slam",
		shortDesc: "Summons Reflect.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			sideCondition: 'reflect',
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Clever",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Kowtow Cleave", target);
        },
	},
	bewitchedbubble: {
		num: 2009,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Bewitched Bubble",
		shortDesc: "User recovers 50% of the damage dealt.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Clever",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Chilling Water", target);
        },
	},
	creepynoise: {
		num: 2010,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Creepy Noise",
		shortDesc: "100% chance to paralyze the foe.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1},
		secondary: {
			chance: 100,
			status: 'par',
		},
		target: "normal",
		type: "Bug",
		contestType: "Clever",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Bug Buzz", target);
        },
	},
	arcticshriek: {
		num: 2011,
		accuracy: 90,
		basePower: 100,
		category: "Special",
		name: "Arctic Shriek",
		shortDesc: "Eliminates all stat changes.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1},
		onHit() {
			this.add('-clearallboost');
			for (const pokemon of this.getAllActive()) {
				pokemon.clearBoosts();
			}
		},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Freeze-Dry", target);
        },
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Clever",
	},
	cloakingglow: {
		num: 2012,
		accuracy: 95,
		basePower: 80,
		category: "Special",
		name: "Cloaking Glow",
		shortDesc: "Summons Light Screen.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			sideCondition: 'lightscreen',
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Luster Purge", target);
        },
	},
	mossbomb: {
		num: 2013,
		accuracy: 90,
		basePower: 100,
		category: "Physical",
		name: "Moss Bomb",
		shortDesc: "Summons Leech Seed.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onHit(target, source) {
			if (target.hasType('Grass')) return null;
			target.addVolatile('leechseed', source);
		},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Seed Bomb", target);
        },
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Clever",
	},
	magmasurge: {
		num: 2014,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Magma Surge",
		shortDesc: "100% chance to burn the foe.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, defrost: 1},
		secondary: {
			chance: 100,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Clever",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Flame Wheel", target);
        },
	},
	apexburst: {
		num: 2015,
		accuracy: 85,
		basePower: 120,
		category: "Special",
		name: "Apex Burst",
		shortDesc: "Cures the user's party of all status conditions.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			onHit(pokemon, source, move) {
				this.add('-activate', source, 'move: Aromatherapy');
				for (const ally of source.side.pokemon) {
					if (ally !== source && (ally.volatiles['substitute'] && !move.infiltrates)) {
					}
					ally.cureStatus();
				}
			},
		},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Fleur Cannon", target);
			this.add('-anim', source, "Aromatherapy", source);
        },
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Clever",
	},
	frenzypulse: {
		num: 2016,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Frenzy Pulse",
		shortDesc: "Lowers SpA by 1; Raises Spe by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		selfBoost: {
			boosts: {
				spa: -1,
				spe: +1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Strange Steam", target);
        },
	},
	psychocrush: {
		num: 2017,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		name: "Psycho Crush",
		shortDesc: "Summons Gravity.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			pseudoWeather: 'gravity',
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Psystrike", target);
        },
	},
	biocharge: {
		num: 2018,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Biocharge",
		shortDesc: "Raises the user's Sp. Atk by 3. Lowest priority.",
		pp: 5,
		priority: -6,
		flags: {snatch: 1, metronome: 1},
		boosts: {
			spa: 3,
		},
		secondary: null,
		target: "self",
		type: "Bug",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Parabolic Charge", source);
        },
	},
	heatbeam: {
		num: 2019,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		overrideDefensiveStat: 'spd',
		name: "Heat Beam",
		shortDesc: "Damages target based on Sp. Def, not Defense.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Heat Wave", target);
        },
	},
	boltbreath: {
		num: 2020,
		accuracy: 100,
		basePower: 70,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Bolt Breath damage boost');
				return move.basePower * 2;
			}
			this.debug('Bolt Breath NOT boosted');
			return move.basePower;
		},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Wildbolt Storm", target);
        },
		category: "Special",
		name: "Bolt Breath",
		shortDesc: "Power doubles if the user moves before the target.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Electric",
	},
	cyclonerend: {
		num: 2021,
		accuracy: 100,
		basePower: 70,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Cyclone Rend damage boost');
				return move.basePower * 2;
			}
			this.debug('Cyclone Rend NOT boosted');
			return move.basePower;
		},
		category: "Special",
		name: "Cyclone Rend",
		shortDesc: "Power doubles if the user moves before the target.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Water",
	},
	coldsnap: {
		num: 2022,
		accuracy: 85,
		basePower: 0,
		category: "Status",
		name: "Cold Snap",
		shortDesc: "Freezes the target.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1},
		status: 'frz',
		secondary: null,
		target: "normal",
		type: "Ice",
		zMove: {boost: {spa: 1}},
		contestType: "Beautiful",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Mist", target);
        },
	},
	blazeball: {
		num: 2023,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		name: "Blaze Ball",
		shortDesc: "No additional effect.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Pyro Ball", target);
        },
	},
	crimsondawn: {
		num: 2024,
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		name: "Crimson Dawn",
		shortDesc: "Fails unless the user is a Fire type",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, cantusetwice: 1, contact: 1},
		secondary: null,
		target: "normal",
		type: "Fire",
		onTryMove(pokemon, target, move) {
			if (pokemon.hasType('Fire')) return;
			this.add('-fail', pokemon, 'move: Crimson Dawn');
			this.attrLastMove('[still]');
			return null;
		},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "V-create", target);
        },
	},
	ancestralthunder: {
		num: 2025,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Ancestral Thunder",
		shortDesc: "Fails unless the user is an Electric type",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, cantusetwice: 1},
		secondary: null,
		target: "normal",
		type: "Electric",
		onTryMove(pokemon, target, move) {
			if (pokemon.hasType('Electric')) return;
			this.add('-fail', pokemon, 'move: Ancestral Thunder');
			this.attrLastMove('[still]');
			return null;
		},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Electro Drift", target);
        },
	},
	quicksandbreath: {
		num: 2026,
		accuracy: 75,
		basePower: 100,
		category: "Special",
		shortDesc: "Traps and damages the target for 4-5 turns.",
		name: "Quicksand Breath",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Sandsear Storm", target);
        },
	},
	sedativespine: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Sedative Spine",
		shortDesc: "100% chance to make the foe drowsy.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			status: 'slp',
		},
		target: "normal",
		type: "Bug",
		contestType: "Clever",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Leech Life", target);
        },
	},
	hellflare: {
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Hellflare",
		shortDesc: "Hits two turns after being used.",
		pp: 10,
		priority: 0,
		flags: {allyanim: 1, metronome: 1, futuremove: 1},
		ignoreImmunity: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'hellflare',
				source: source,
				moveData: {
					id: 'hellflare',
					name: "Hellflare",
					accuracy: 100,
					basePower: 120,
					category: "Special",
					priority: 0,
					flags: {allyanim: 1, metronome: 1, futuremove: 1},
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Fire',
				},
			});
			this.add('-start', source, 'move: Future Sight');
			return this.NOT_FAIL;
		},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Sacred Fire", target);
        },
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Clever",
	},
	boulderpunch: {
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Boulder Punch",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, metronome: 1},
		shortDesc: "50% chance to lower the target's defense.",
		secondary: {
			chance: 50,
			boosts: {
				def: -1,
			},
		},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Accelerock", target);
        },
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	dragoncharge: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Dragon Charge",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		volatileStatus: 'dragoncharge',
		condition: {
			onStart(pokemon, source, effect) {
				if (effect && ['Wyversion'].includes(effect.name)) {
					this.add('-start', pokemon, 'Dragon Charge', this.activeMove!.name, '[from] ability: ' + effect.name);
				} else {
					this.add('-start', pokemon, 'Dragon Charge');
				}
			},
			onRestart(pokemon, source, effect) {
				if (effect && ['Wyversion'].includes(effect.name)) {
					this.add('-start', pokemon, 'Dragon Charge', this.activeMove!.name, '[from] ability: ' + effect.name);
				} else {
					this.add('-start', pokemon, 'Dragon Charge');
				}
			},
			onBasePowerPriority: 9,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Dragon') {
					this.debug('dragoncharge boost');
					return this.chainModify(2);
				}
			},
			onMoveAborted(pokemon, target, move) {
				if (move.type === 'Dragon' && move.id !== 'dragoncharge') {
					pokemon.removeVolatile('dragoncharge');
				}
			},
			onAfterMove(pokemon, target, move) {
				if (move.type === 'Dragon' && move.id !== 'dragoncharge') {
					pokemon.removeVolatile('dragoncharge');
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Dragon Charge', '[silent]');
			},
		},
		boosts: {
			spd: 1,
		},
		secondary: null,
		target: "self",
		type: "Dragon",
		zMove: {boost: {spd: 1}},
		contestType: "Clever",
	},
	convectionnova: {
		accuracy: 100,
		basePower: 135,
		category: "Special",
		name: "Convection Nova",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, cantusetwice: 1},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Ice Burn", target);
        },
		secondary: null,
		shortDesc: "Fire moves become Ice type this turn, can't use twice.",
		pseudoWeather: 'convection',
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
	},
	convection: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Convection",
		pp: 25,
		priority: 1,
		flags: {metronome: 1},
		pseudoWeather: 'convection',
		condition: {
			duration: 1,
			onFieldStart(target, source, sourceEffect) {
				this.add('-fieldactivate', 'move: Convection');
				this.hint(`Fire-type moves become Ice-type after using ${sourceEffect}.`);
			},
			onModifyTypePriority: -2,
			onModifyType(move) {
				if (move.type === 'Fire') {
					move.type = 'Ice';
					this.debug(move.name + "'s type changed to Ice");
				}
			},
		},
		secondary: null,
		target: "all",
		type: "Ice",
		zMove: {boost: {spa: 1}},
		contestType: "Beautiful",
	},
	/*
	Monhun Status
	*/
	hellfirerifle: {
		num: 2027,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Hellfire Rifle",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1, metronome: 1, pulse: 1},
		secondary: null,
		onAfterMove(pokemon, target, move) {
			if (this.randomChance(3, 10)) {
				target.addVolatile('blastblight');
			}
		},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Infernal Parade", target);
        },
		shortDesc: "30% chance to inflict blastblight.",
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},
	slimepunch: {
		num: 2028,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Slime Punch",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, metronome: 1},
		secondary: null,
		onAfterMove(pokemon, target, move) {
			if (this.randomChance(5, 10)) {
				target.addVolatile('blastblight');
			}
		},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Shell Side Arm", target);
        },
		shortDesc: "50% chance to inflict blastblight.",
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
	powderkeg: {
		num: 2029,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Powderkeg",
		pp: 25,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, powder: 1},
		secondary: null,
		onAfterMove(pokemon, target, move) {
			if (this.randomChance(10, 10)) {
				target.addVolatile('blastblight');
			}
		},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Fiery Dance", target);
        },
		shortDesc: "Inflicts blastblight.",
		target: "normal",
		type: "Fire",
		contestType: "Clever",
	},
	blastbite: {
		num: 2030,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Blast Bite",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1},
		secondaries: [
			{
				chance: 100,
				volatileStatus: 'flinch',
			},
		],
		onAfterMove(pokemon, target, move) {
			if (this.randomChance(1, 10)) {
				target.addVolatile('blastblight');
			}
		},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Fire Fang", target);
        },
		shortDesc: "Inflicts blast. 10% chance to flinch.",
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	abyssaleruption: {
		num: 2031,
		accuracy: 90,
		basePower: 130,
		category: "Special",
		name: "Abyssal Eruption",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		self: {
			boosts: {
				spa: -2,
			},
		},
		secondary: null,
		onAfterMove(pokemon, target, move) {
			if (this.randomChance(5, 10)) {
				target.addVolatile('blastblight');
			}
		},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Black Hole Eclipse", target);
        },
		shortDesc: "Reduces Sp. Atk by 2. 50% chance to inflict blast.",
		target: "normal",
		type: "Dark",
		contestType: "Beautiful",
	},
	supremacysquall: {
		num: 2032,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Supremacy Squall",
		pp: 5,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		secondary: null,
		shortDesc: "Inflicts defense down.",
		volatileStatus: 'defensedown',
		target: "allAdjacentFoes",
		type: "Flying",
		zMove: {boost: {def: 1}},
		contestType: "Tough",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Bleakwind Storm", source);
        },
	},
	harshsting: {
		num: 2033,
		accuracy: 100,
		basePower: 15,
		category: "Physical",
		name: "Harsh Sting",
		pp: 35,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 100,
			status: 'defensedown',
		},
		shortDesc: "Inflicts defense down.",
		target: "normal",
		type: "Bug",
		contestType: "Clever",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Leech Life", target);
        },
	},
	decayduster: {
		num: 2034,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Decay Duster",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		volatileStatus: 'defensedown',
		shortDesc: "Hits adjacent pokemon. Inflicts defense down.",
		secondary: null,
		target: "allAdjacent",
		type: "Bug",
		contestType: "Beautiful",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Pollen Puff", target);
        },
	},
	slimyspit: {
		num: 2035,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Slimy Spit",
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 100,
			volatileStatus: 'defensedown',
		},
		shortDesc: "100% chance to inflict Defense Down.",
		target: "allAdjacentFoes",
		type: "Water",
		contestType: "Clever",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Snipe Shot", target);
        },
	},
	stinkbomb: {
		num: 2036,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Stink Bomb",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'stench',
		},
		shortDesc: "30% chance to inflict stench.",
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Sludge Bomb", target);
        },
	},
	perfumepulse: {
		num: 2037,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Perfume Pulse",
		shortDesc: "30% chance to inflict Stench.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, pulse: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'stench',
		},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Malignant Chain", target);
        },
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	phlegmshot: {
		num: 2038,
		accuracy: 80,
		basePower: 120,
		category: "Physical",
		name: "Phlegm Shot",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 30,
			volatileStatus: 'fatigue',
		},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Gunk Shot", target);
        },
		shortDesc: "30% chance to inflict fatigue.",
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
	sweetlick: {
		num: 2039,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Sweet Lick",
		pp: 30,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		shortDesc: "Inflicts Fatigue.",
		secondary: {
			chance: 100,
			volatileStatus: 'fatigue',
		},
		target: "normal",
		type: "Poison",
		contestType: "Cute",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Poison Tail", target);
        },
	},
	roughhouse: {
		num: 2040,
		accuracy: 90,
		basePower: 95,
		category: "Physical",
		name: "Roughhouse",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 50,
			volatileStatus: 'bleeding',
		},
		shortDesc: "50% chance to inflict bleeding.",
		target: "normal",
		type: "Fighting",
		contestType: "Cute",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Play Rough", target);
        },
	},
	cruelclaw: {
		num: 2041,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Cruel Claw",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondaries: [
			{
				chance: 50,
				boosts: {
					def: -1,
				},
			}, {
				chance: 30,
				volatileStatus: 'bleeding',
			},
		],
		shortDesc: "50% chance to lower Defense, 30% to bleed.",
		target: "normal",
		type: "Dark",
		contestType: "Cool",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Dire Claw", target);
        },
	},
	brimstoneblade: {
		num: 2042,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Brimstone Blade",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
		critRatio: 2,
		secondary: {
			chance: 10,
			volatileStatus: 'bleeding',
		},
		shortDesc: "High crit ratio. 10% chance to bleed.",
		target: "normal",
		type: "Rock",
		contestType: "Cool",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Stone Axe", target);
        },
	},
	sulfurousblade: {
		num: 2042,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Sulfurous Blade",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
		critRatio: 2,
		secondary: {
			chance: 10,
			volatileStatus: 'defensedown',
		},
		shortDesc: "High crit ratio. 30% chance to inflict Def. Down.",
		target: "normal",
		type: "Poison",
		contestType: "Cool",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Cross Poison", target);
        },
	},
	thousandblades: {
		num: 2043,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		name: "Thousand Blades",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
		critRatio: 2,
		secondary: {
			chance: 20,
			volatileStatus: 'bleeding',
		},
		shortDesc: "High crit ratio. 20% chance to bleed.",
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Triple Arrows", target);
        },
	},
	snowballcannon: {
		num: 2044,
		accuracy: 95,
		basePower: 90,
		category: "Physical",
		name: "Snowball Cannon",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'snowman',
		},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Mountain Gale", target);
        },
		shortDesc: "10% chance to trap the foe in a Snowman.",
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	glacialgale: {
		num: 2045,
		accuracy: 100,
		basePower: 85,
		category: "Special",
		name: "Glacial Gale",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, wind: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'snowman',
		},
		shortDesc: "10% chance to trap the foe in a Snowman.",
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Blizzard", target);
        },
	},
	/*
	oxideairstrike: {
		num: 2046,
		accuracy: 95,
		basePower: 70,
		category: "Physical",
		name: "Oxide Airstrike",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, distance: 1, metronome: 1, slicing: 1},
		secondary: {
			chance: 100,
			volatileStatus: 'rusted',
		},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Dragon Ascent", target);
        },
		shortDesc: "100% chance to inflict Rust.",
		target: "allAdjacentFoes",
		type: "Flying",
		contestType: "Cool",
	},
	*/
	dracophage: {
		num: 2047,
		accuracy: 85,
		basePower: 0,
		category: "Status",
		name: "Dracophage",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1},
		shortDesc: "Dragonblights the opponent.",
		status: 'dragonblight',
		secondary: null,
		target: "normal",
		type: "Dragon",
		zMove: {boost: {atk: 1}},
		contestType: "Beautiful",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Spicy Extract", target);
        },
	},
	devilsjaw: {
		num: 2048,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Devil's Jaw",
		shortDesc: "100% chance to inflict Dragonblight.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, bite: 1},
		secondary: {
			chance: 100,
			status: 'dragonblight',
		},
		target: "normal",
		type: "Dragon",
		contestType: "Clever",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Poison Fang", target);
        },
	},
	seraphicshift: {
		num: 2049,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		name: "Seraphic Shift",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, bypasssub: 1},
		onHit(target, pokemon, move) {
			if (pokemon.baseSpecies.baseSpecies === 'Disufiroa' && !pokemon.transformed) {
				move.willChangeForme = true;
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.willChangeForme) {
				const meloettaForme = pokemon.species.id === 'disufiroasol' ? '' : '-Sol';
				pokemon.formeChange('Disufiroa' + meloettaForme, this.effect, false, '[msg]');
			}
		},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Sheer Cold", target);
        },
		shortDesc: "Changes Disufiroa's form.",
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
	},
	nethercurrent: {
		num: 2050,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Nether Current",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		shortDesc: "Prevents the target from switching out.",
		target: "normal",
		type: "Water",
		contestType: "Tough",
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Surf", target);
        },
	},
	frozencleave: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Frozen Cleave",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, slicing: 1},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Water') return 1;
		},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Ice Spinner", target);
        },
		secondary: {
			chance: 10,
			status: 'frz',
		},	
		target: "normal",
		shortDesc: "10% chance to freeze. Super effective on Water.",
		type: "Ice",
		contestType: "Beautiful",
	},
	boomblast: {
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Boomblast",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		secondary: null,
		onAfterMove(pokemon, target, move) {
			if (this.randomChance(5, 10)) {
				target.addVolatile('blastblight');
			}
		},
		onPrepareHit(target, source, move) {
            this.attrLastMove('[still]');
            this.add('-anim', source, "Fusion Flare", target);
        },
		shortDesc: "50% chance to Blast. Hits adjacent Pokemon.",
		target: "allAdjacent",
		type: "Fire",
		contestType: "Tough",
	},
	shroomshield: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Shroom Shield",
		pp: 10,
		priority: 4,
		flags: {metronome: 1, noassist: 1, failcopycat: 1},
		stallingMove: true,
		volatileStatus: 'shroomshield',
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
		shortDesc: "Protects from damaging attacks. Contact: poison.",
		secondary: null,
		target: "self",
		type: "Grass",
	},
	risenburst: {
		accuracy: true,
		basePower: 60,
		category: "Special",
		name: "Risen Burst",
		pp: 1,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon, target) {
			move.type = '???';
			if (!target) return;
			const atk = pokemon.getStat('atk', false, true);
			const spa = pokemon.getStat('spa', false, true);
			const def = target.getStat('def', false, true);
			const spd = target.getStat('spd', false, true);
			const physical = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * atk) / def) / 50);
			const special = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * spa) / spd) / 50);
				if (physical > special || (physical === special && this.random(2) === 0)) {
					move.category = 'Physical';
					move.flags.contact = 1;
				}
		},
		type: 'Dark',
		secondary: null,
		target: "allAdjacent",
	},
	/*
	Edits
	*/
	swift: {
		inherit: true,
		viable: true,
		desc: "Does not check accuracy. Usually goes first.",
		shortDesc: "Does not check accuracy. Usually goes first.",
		priority: 1,
	},
	healorder: {
		inherit: true,
		pp: 5,
	},
	hyperspacefury: {
		inherit: true,
		breaksProtect: true,
		onTry(source) {},
	},
	ivycudgel: {
		inherit: true,
		num: 904,
		onPrepareHit(target, source, move) {
			if (move.type !== "Grass") {
				this.attrLastMove('[anim] Ivy Cudgel ' + move.type);
			}
		},
		onModifyType(move, pokemon) {},
	},
	razorshell: {
		inherit: true,
		viable: true,
		desc: "20% chance to inflict Bleed",
		shortDesc: "20% chance to inflict bleed.",
		secondary: {
			chance: 20,
			volatileStatus: 'bleeding',
		},
	},
	razorleaf: {
		inherit: true,
		basePower: 60,
		desc: "High critical hit ratio. 30% chance to inflict bleed.",
		shortDesc: "High critical hit ratio. 30% chance to inflict bleed.",
		secondary: {
			chance: 30,
			volatileStatus: 'bleeding',
		},
	},
	rest: {
		inherit: true,
		cantusetwice: 1,
		desc: "Induces Drowsy; Heals HP/Status. Can't use consecutively.",
	},
	razorwind: {
		inherit: true,
		viable: true,
		onTryMove(attacker, defender, move) {},
		desc: "High critical hit ratio. 30% chance to inflict bleed.",
		shortDesc: "High critical hit ratio. 30% chance to inflict bleed.",
		secondary: {
			chance: 30,
			volatileStatus: 'bleeding',
		},
	},
	bubblebeam: {
		inherit: true,
		desc: "10% chance to inflict Bubbleblight.",
		shortDesc: "10% chance to inflict Bubbleblight.",
		secondary: {
			chance: 10,
			volatileStatus: 'bubbleblight',
		},
	},
	irontail: {
		inherit: true,
		accuracy: 90,
	},
	chipaway: {
		inherit: true,
		viable: true,
		basePower: 90,
	},
	tailslap: {
		inherit: true,
		accuracy: 90,
	},
	crushclaw: {
		inherit: true,
		accuracy: 100,
		basePower: 85,
	},
	cut: {
		accuracy: 100,
		inherit: true,
		viable: true,
		category: "Physical",
		isNonstandard: false,
		name: "Cut",
		pp: 30,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
		secondary: {
			chance: 100,
			volatileStatus: 'bleeding',
		},
		shortDesc: "Inflicts bleed.",
	},
	doublehit: {
		inherit: true,
		viable: true,
		basePower: 50,
		multihit: 2,
	},
	megakick: {
		inherit: true,
		viable: true,
		accuracy: 85,
	},
	megapunch: {
		inherit: true,
		viable: true,
		accuracy: 90,
		basePower: 100,
	},
	stomp: {
		inherit: true,
		viable: true,
		basePower: 80,
	},
	takedown: {
		inherit: true,
		accuracy: 100,
		basePower: 100,
	},
	headcharge: {
		inherit: true,
		accuracy: 100,
		shortDesc: "Has 1/2 recoil.",
		basePower: 150,
		pp: 5,
		recoil: [1, 2],
	},
	blazekick: {
		inherit: true,
		viable: true,
		accuracy: 100,
	},
	aquatail: {
		inherit: true,
		viable: true,
		accuracy: 100,
	},
	wildcharge: {
		inherit: true,
		accuracy: 100,
		basePower: 100,
	},
	paraboliccharge: {
		inherit: true,
		viable: true,
		basePower: 75,
	},
	seedbomb: {
		inherit: true,
		basePower: 85,
	},
	tropkick: {
		inherit: true,
		viable: true,
		basePower: 90,
	},
	glaciate: {
		inherit: true,
		viable: true,
		basePower: 80,
	},
	doublekick: {
		inherit: true,
		viable: true,
		basePower: 40,
	},
	forcepalm: {
		inherit: true,
		viable: true,
		basePower: 80,
	},
	submission: {
		inherit: true,
		accuracy: 100,
		basePower: 100,
	},
	skyuppercut: {
		inherit: true,
		viable: true,
		shortDesc: "Removes the target's Ground immunity.",
		accuracy: 100,
		condition: {
			noCopy: true,
			onStart(pokemon) {
				let applies = false;
				if (pokemon.hasType('Flying') || pokemon.hasAbility('levitate')) applies = true;
				if (pokemon.hasItem('ironball') || pokemon.volatiles['ingrain'] ||
					this.field.getPseudoWeather('gravity')) applies = false;
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
				if (!applies) return false;
				this.add('-start', pokemon, 'Smack Down');
			},
			onRestart(pokemon) {
				if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
					this.queue.cancelMove(pokemon);
					pokemon.removeVolatile('twoturnmove');
					this.add('-start', pokemon, 'Smack Down');
				}
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
		},
	},
	poisontail: {
		inherit: true,
		viable: true,
		accuracy: 90,
		basePower: 100,
		shortDesc: "30% chance to lower the target's Attack by 1.",
		pp: 15,
		critRatio: 1,
		secondary: {
			chance: 30,
			boosts: {
				atk: -1,
			},
		},
	},
	zenheadbutt: {
		inherit: true,
		accuracy: 100,

	},
	steamroller: {
		inherit: true,
		viable: true,
		shortDesc: "Ends the effects of Terrain. 30% chance to flinch.",
		basePower: 95,
		onAfterHit(target, source) {
			if (source.hp) {
				this.field.clearTerrain();
			}
		},
		onAfterSubDamage(damage, target, source) {
			if (source.hp) {
				this.field.clearTerrain();
			}
		},
	},
	refresh: {
		inherit: true,
		onHit(pokemon) {
			pokemon.cureStatus();
		},
	},
	facade: {
		inherit: true,
		shortDesc: "Power doubles if user has a non-volatile status.",
		onBasePower(basePower, pokemon) {
			if (pokemon.status) {
				return this.chainModify(2);
			}
		},
	},
	twineedle: {
		inherit: true,
		viable: true,
		basePower: 45,
	},
	shadowpunch: {
		inherit: true,
		viable: true,
		shortDesc: "Always results in a critical hit.",
		willCrit: true,
	},
	dragonrush: {
		inherit: true,
		viable: true,
		accuracy: 90,
	},
	geargrind: {
		inherit: true,
		viable: true,
		accuracy: 90,
	},
	spinout: {
		inherit: true,
		viable: true,
		basePower: 110,
		accuracy: 100,
	},
	steelwing: {
		inherit: true,
		viable: true,
		accuracy: 100,
		shortDesc: "50% chance to raise the users's Defense by 1.",
		basePower: 80,
		pp: 10,
		secondary: {
			chance: 50,
			self: {
				boosts: {
					def: 1,
				},
			},
		},
	},
	firefang: {
		inherit: true,
		basePower: 70,
	},
	icefang: {
		inherit: true,
		basePower: 70,
		shortDesc: "10% chance to frostbite. 10% chance to flinch.",
	},
	thunderfang: {
		inherit: true,
		basePower: 70,
	},
	poisonfang: {
		inherit: true,
		basePower: 70,
		secondary: {},
		shortDesc: "10% chance to poison. 10% chance to flinch.",
		secondaries: [
			{
				chance: 10,
				status: 'psn',
			}, {
				chance: 10,
				volatileStatus: 'flinch',
			},
		],
	},
	/*
	DROWSY EDITS
	*/
	darkvoid: {
		inherit: true,
		shortDesc: "Makes the foe(s) drowsy",
		viable: true,
		accuracy: 80,
		onTry(source, target, move) {},
	},
	direclaw: {
		inherit: true,
		shortDesc: "50% chance to poison, paralyze, or make the target drowsy.",
	},
	dreameater: {
		inherit: true,
		shortDesc: "User gains 1/2 HP inflicted. Drowsy target only.",
	},
	electricterrain: {
		inherit: true,
		shortDesc: "5 turns. Grounded: +Electric power, can't be drowsy.",
	},
	grasswhistle: {
		inherit: true,
		shortDesc: "Makes the target drowsy.",
	},
	hypnosis: {
		inherit: true,
		shortDesc: "Makes the target drowsy.",
		accuracy: 85,
	},
	lovelykiss: {
		inherit: true,
		shortDesc: "Makes the target drowsy.",
	},
	nightmare: {
		inherit: true,
		shortDesc: "A drowsy target is hurt by 1/4 max HP per turn.",
	},
	relicsong: {
		inherit: true,
		shortDesc: "10% chance to make foe(s) drowsy.",
	},
	sing: {
		inherit: true,
		shortDesc: "Makes the target drowsy.",
		accuracy: 80,
	},
	sleeppowder: {
		inherit: true,
		shortDesc: "Makes the target drowsy.",
	},
	sleeptalk: {
		inherit: true,
		shortDesc: "User must be drowsy. Uses another known move.",
	},
	snore: {
		inherit: true,
		shortDesc: "User must be drowsy. 30% chance to flinch the target.",
	},
	uproar: {
		inherit: true,
		shortDesc: "Last 3 turns. Active Pokemon cannot become drowsy.",
	},
	wakeupslap: {
		inherit: true,
		shortDesc: "Power doubles if target is drowsy, and wakes it.",
	},
	yawn: {
		inherit: true,
		shortDesc: "Makes the target drowsy after 1 turn.",
	},
	/*
	Frostbite Edits
	*/
	blizzard: {
		inherit: true,
		shortDesc: "10% chance to frostbite foe(s). Can't miss in Snow.",
	},
	freezedry: {
		inherit: true,
		shortDesc: "10% chance to frostbite. Super effective on Water.",
	},
	freezingglare: {
		inherit: true,
		shortDesc: "10% chance to frostbite the target.",
	},
	icebeam: {
		inherit: true,
		shortDesc: "10% chance to frostbite the target.",
	},
	icepunch: {
		inherit: true,
		shortDesc: "10% chance to frostbite the target.",
	},
	powdersnow: {
		inherit: true,
		shortDesc: "10% chance to frostbite foe(s).",
	},
	triattack: {
		inherit: true,
		shortDesc: "20% chance to paralyze, burn, or frostbite target.",
	},
	/*
	TORQUES
	*/
	blazingtorque: {
		num: 896,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Blazing Torque",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1, failencore: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1,
			failcopycat: 1, failmimic: 1, failinstruct: 1, nosketch: 1,
		},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
	},
	combattorque: {
		num: 899,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Combat Torque",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1, failencore: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1,
			failcopycat: 1, failmimic: 1, failinstruct: 1, nosketch: 1,
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Fighting",
	},
	magicaltorque: {
		num: 900,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Magical Torque",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1, failencore: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1,
			failcopycat: 1, failmimic: 1, failinstruct: 1, nosketch: 1,
		},
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Fairy",
	},
	noxioustorque: {
		num: 898,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Noxious Torque",
		shortDesc: "10% chance to make the target drowsy.",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1, failencore: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1,
			failcopycat: 1, failmimic: 1, failinstruct: 1, nosketch: 1,
		},
		secondary: {
			chance: 30,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
	},
	wickedtorque: {
		num: 897,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Wicked Torque",
		pp: 10,
		priority: 0,
		flags: {
			protect: 1, failencore: 1, failmefirst: 1, nosleeptalk: 1, noassist: 1,
			failcopycat: 1, failmimic: 1, failinstruct: 1, nosketch: 1,
		},
		secondary: {
			chance: 10,
			status: 'slp',
		},
		target: "normal",
		type: "Dark",
	},
}
