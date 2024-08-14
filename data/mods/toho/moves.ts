export const Moves: {[moveid: string]: MoveData} = {
	//vanilla moves
	barrage: {
		inherit: true,
		accuracy: 95,
		basePower: 20,
	},
	leafstorm: {
		inherit: true,
		flags: {protect: 1, mirror: 1, metronome: 1, wind: 1},
	},
	hyperspacefury: {
		inherit: true,
		shortDesc: "Junko: Lowers user's Def by 1; breaks protect.",
		onTry(source) {
			if (source.species.name === 'Junko') {
				return;
			}
			this.hint("Only a Pokemon whose form is Junko can use this move.");
			this.attrLastMove('[still]');
			this.add('-fail', source, 'move: Hyperspace Fury');
			return null;
		},
	},
	gigatonhammer: {
		inherit: true,
		flags: {protect: 1, mirror: 1, metronome: 1, cantusetwice: 1, hammer: 1},
	},
	hammerarm: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, metronome: 1, hammer: 1},
	},
	icehammer: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, metronome: 1, hammer: 1},
	},
	crabhammer: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, hammer: 1},
	},
	woodhammer: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, hammer: 1},
	},
	dragonhammer: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, hammer: 1},
	},
	sonicboom: {
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Sonic Boom",
		shortDesc: "Usually goes first.",
		pp: 30,
		priority: 1,
		flags: {protect: 1, mirror: 1, metronome: 1, sound: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	blizzard: {
		inherit: true,
		onModifyMove(move) {
			if (this.field.isWeather(['hail', 'snow', 'blizzard'])) move.accuracy = true;
		},
	},
	psychicterrain: {
		inherit: true,
		terrain: 'psychicterrain',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onTryHitPriority: 4,
			onTryHit(target, source, effect) {
				if (effect && (effect.name === 'Lunatic Bullet' || effect.priority <= 0.1 || effect.target === 'self')) {
					return;
				}
				if (target.isSemiInvulnerable() || target.isAlly(source)) return;
				if (!target.isGrounded()) {
					const baseMove = this.dex.moves.get(effect.id);
					if (baseMove.priority > 0) {
						this.hint("Psychic Terrain doesn't affect Pokémon immune to Ground.");
					}
					return;
				}
				this.add('-activate', target, 'move: Psychic Terrain');
				return null;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Psychic' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('psychic terrain boost');
					return this.chainModify([5325, 4096]);
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Psychic Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Psychic Terrain');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Psychic Terrain');
			},
		},
	},

	// worldofnightmares field
	wakeupslap: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'slp' || target.hasAbility('comatose') || target.hasAbility('worldofnightmares') || pokemon.hasAbility('worldofnightmares')) return move.basePower * 2;
			return move.basePower;
		},
	},
	dreameater: {
		inherit: true,
		onTryImmunity(target, source) {
			return target.status === 'slp' || target.hasAbility('comatose') || target.hasAbility('worldofnightmares') || source.hasAbility('worldofnightmares');
		},
	},
	nightmare: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(pokemon) {
				if (pokemon.status !== 'slp' && !pokemon.hasAbility('comatose') && !pokemon.hasAbility('worldofnightmares')) {
					return false;
				}
				this.add('-start', pokemon, 'Nightmare');
			},
			onResidualOrder: 9,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 4);
			},
		},
	},
	sleeptalk: {
		inherit: true,
		onTry(source) {
			let usable = false;
			for (const opponent of source.adjacentFoes()) {
				if (opponent.hasAbility('worldofnightmares')) {
					usable = true;
					break;
				}
			}
			return source.status === 'slp' || source.hasAbility('comatose') || usable;
		},
	},
	ultrasleep: { //this move is only for worldofnightmares ability
		num: -9999,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Ultrasleep",
		pp: 5,
		priority: -7,
		flags: { mirror: 1 },
		pseudoWeather: 'ultrasleep',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				return 5;
			},
			onStart(target, source) {
				this.add('-fieldstart', 'move: Ultrasleep', '[of] ' + source);
			},
			onSetStatus(status, target, source, effect) {
				if (target.hasAbility('vitalspirit') || target.hasAbility('insomnia')) return;
				if (effect && ((effect as Move).status || effect.id === 'yawn')) {
					this.add('-activate', target, 'move: Ultrasleep');
				}
				return false;
			},
			onResidualOrder: 23,
			onEnd() {
				this.add('-fieldend', 'move: Ultrasleep');
			},
		},
		secondary: null,
		target: "all",
		type: "Psychic",
		zMove: { boost: { accuracy: 1 } },
		contestType: "Clever",
	},

	//new moves
	fantasyseal: {
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Fantasy Seal",
		shortDesc: "Deals 1/16 max HP each turn; 1/8 on Dark, Ghost.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		condition: {
			noCopy: true,
			onStart(pokemon) {
				this.add('-start', pokemon, 'Fantasy Seal');
			},
			onResidualOrder: 13,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / (pokemon.hasType(['Dark', 'Ghost']) ? 8 : 16));
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Fantasy Seal');
			},
		},
		secondary: {
			chance: 100,
			volatileStatus: 'fantasyseal',
		},
		target: "normal",
		type: "Flying",
	},
	silverblade: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Silver Blade",
		shortDesc: "High critical hit ratio.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, slicing: 1, protect: 1, mirror: 1, metronome: 1},
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	forbiddenbarrage: {
		accuracy: 80,
		basePower: 110,
		category: "Special",
		name: "Forbidden Barrage",
		shortDesc: "10% chance to make the target flinch.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		target: "allAdjacentFoes",
		type: "Dark",
		contestType: "Tough",
	},
	lunaticbullet: {
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Lunatic Bullet",
		shortDesc: "Usually goes first. Bypasses Psychic Terrain.",
		pp: 20,
		priority: 1,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		secondary: null,
		target: "any",
		type: "Psychic",
		contestType: "Cool",
	},
	nervepoison: {
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Nerve Poison",
		shortDesc: "30% chance to paralyse the target.",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Poison",
		contestType: "Beautiful",
	},
	ironring: {
		accuracy: 90,
		basePower: 90,
		category: "Special",
		name: "Iron Ring",
		shortDesc: "Prevents the target from switching out.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
		type: "Steel",
		contestType: "Tough",
	},
	divinestrike: {
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		name: "Divine Strike",
		pp: 10,
		priority: 0,
		flags: {contact: 1, slicing: 1, protect: 1, mirror: 1, metronome: 1},
		willCrit: true,
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Cool",
	},
	attune: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Attune",
		shortDesc: "Raises the user's Attack, Special Attack, Accuracy by 1 stage.",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		boosts: {
			atk: 1,
			spa: 1,
			accuracy: 1,
		},
		secondary: null,
		target: "self",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Tough",
	},
	bodyswap: {
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Body Swap",
		shortDesc: "Heals 1/2 of user's max HP. Changes Hecatia's forme.",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1, metronome: 1},
		heal: [1, 2],
		onHit(target, pokemon, move) {
			if (pokemon.baseSpecies.baseSpecies === 'Hecatia Lapislazuli' && !pokemon.transformed) {
				move.willChangeForme = true;
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.willChangeForme) {
				let hecatiaForme;
				if (pokemon.species.id === 'hecatialapislazuli') hecatiaForme = "-Earth";
				else if (pokemon.species.id === 'hecatiaearth') hecatiaForme = "-Moon";
				else hecatiaForme = " Lapislazuli";
				pokemon.formeChange('Hecatia' + hecatiaForme, this.effect, false, '[msg]');
			}
		},
		target: "self",
		type: "Normal",
		contestType: "Beautiful",
	},
	willbreak: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Will Break",
		shortDesc: "(partially coded) Forces the target to switch to a random ally. Lowers the incoming ally's Attack by 1 stage.",
		pp: 5,
		priority: -6,
		flags: {reflectable: 1, mirror: 1, sound: 1, bypasssub: 1, allyanim: 1, metronome: 1, noassist: 1, failcopycat: 1},
		forceSwitch: true,
		self: {
			onHit(source) {
				for (const side of source.side.foeSidesWithConditions()) {
					side.addSideCondition('willbreak');
				}
			},
		},
		condition: {
			duration: 1,
			onSideEnd(targetSide) {
				//console.log(targetSide.pokemon);
				this.boost({atk: -1}, targetSide.pokemon);
			},
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		zMove: {boost: {def: 1}},
		contestType: "Cool",
	},
	excavate: {
		accuracy: 85,
		basePower: 55,
		category: "Physical",
		name: "Excavate",
		shortDesc: "Removes hazards from the user's side of the field. Gains effects depending on the hazards removed.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, bullet: 1, protect: 1, mirror: 1, metronome: 1},
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('excavate');
		},
		condition: {
			duration: 1,
			onBeforeMovePriority: 100,
			onBeforeMove(pokemon) {
				this.debug('removing hazards before attack');
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						switch (condition) {
							case 'spikes':
								pokemon.removedSpikes = true;
								break;
							case 'toxicspikes':
								pokemon.removedTSpikes = true;
								break;
							case 'stealthrock':
								pokemon.removedSR = true;
								break;
							case 'stickyweb':
								pokemon.removedWebs = true;
								break;
							case 'gmaxsteelsurge':
								pokemon.removedSteel = true;
								break;
						}
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Excavate', '[of] ' + pokemon);
					}
				}
			},
			onModifyMove(move, pokemon) {
				if(move.name !== 'Excavate') return;
				if(pokemon.removedSpikes) {
					if (!move.secondaries) move.secondaries = [];
					move.secondaries.push({
						chance: 100,
						boosts: {
							def: -1,
						},
					});
				}
				if(pokemon.removedTSpikes) {
					if (!move.secondaries) move.secondaries = [];
					move.secondaries.push({
						chance: 100,
						status: 'psn',
					});
				}
				if(pokemon.removedSR) move.basePower = 110;
				if(pokemon.removedWebs) {
					if (!move.secondaries) move.secondaries = [];
					move.secondaries.push({
						chance: 100,
						onHit(target, source, move) {
							if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
						},
					});
				} 
				if(pokemon.removedSteel) move.willCrit = true;
			},
			onEnd(pokemon) {
				pokemon.removedSpikes = false;
				pokemon.removedTSpikes = false;
				pokemon.removedSR = false;
				pokemon.removedWebs = false;
				pokemon.removedSteel = false;
			},
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Cool",
	},
	missilebarrage: {
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		name: "Missile Barrage",
		shortDesc: "Hits 2-5 times in one turn.",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Steel",
		zMove: {basePower: 140},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},
};
