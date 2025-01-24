export const Moves: {[k: string]: ModdedMoveData} = {
	absorb: {
		inherit: true,
		basePower: 40,
	},
	acid: {
		inherit: true,
		shortDesc: "33% chance to lower the target's Sp. Def by 1.",
		desc: "Has a 33% chance to lower the target's Special Defense by 1 stage.",
		secondary: {
			chance: 33,
			boosts: {
				spd: -1,
			},
		},
	},
	acidarmor: {
		inherit: true,
		pp: 40,
	},
	airslash: {
		inherit: true,
		pp: 20,
	},
	aurasphere: {
		inherit: true,
		basePower: 90,
	},
	aurorabeam: {
		inherit: true,
		shortDesc: "33% chance to lower the target's Attack by 1.",
		desc: "Has a 33% chance to lower the target's Attack by 1 stage.",
		secondary: {
			chance: 33,
			boosts: {
				atk: -1,
			},
		},
	},
	barbbarrage: {
		inherit: true,
		pp: 15,
	},
	barrier: {
		inherit: true,
		pp: 30,
	},
	bittermalice: {
		inherit: true,
		pp: 15,
	},
	blizzard: {
		inherit: true,
		accuracy: 90,
		basePower: 120,
		shortDesc: "30% chance to freeze foe(s). Can't miss in Snow.",
		desc: "Has a 30% chance to freeze the target. If the weather is Snow, this move does not check accuracy.",
		secondary: {
			chance: 30,
			status: 'frz',
		},
	},
	bubble: {
		inherit: true,
		shortDesc: "33% chance to lower the target's Speed by 1.",
		desc: "Has a 33% chance to lower the target's Speed by 1 stage.",
		secondary: {
			chance: 33,
			boosts: {
				spe: -1,
			},
		},
	},
	bubblebeam: {
		inherit: true,
		shortDesc: "33% chance to lower the target's Speed by 1.",
		desc: "Has a 33% chance to lower the target's Speed by 1 stage.",
		secondary: {
			chance: 33,
			boosts: {
				spe: -1,
			},
		},
	},
	covet: {
		inherit: true,
		pp: 40,
	},
	darkvoid: {
		inherit: true,
		accuracy: 80,
	},
	destinybond: {
		inherit: true,
		shortDesc: "If an opponent knocks out the user, it also faints.",
		desc: "Until the user's next turn, if an opposing Pokemon's attack knocks the user out, that Pokemon faints as well.",
		onPrepareHit(pokemon) {
			pokemon.removeVolatile('destinybond');
		},
	},
	dig: {
		inherit: true,
		basePower: 100,
	},
	dracometeor: {
		inherit: true,
		basePower: 140,
	},
	dragonpulse: {
		inherit: true,
		basePower: 90,
	},
	electricterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (status.id === 'slp' && target.isGrounded() && !target.isSemiInvulnerable()) {
					if (effect.id === 'yawn' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'move: Electric Terrain');
					}
					return false;
				}
			},
			onTryAddVolatile(status, target) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'yawn') {
					this.add('-activate', target, 'move: Electric Terrain');
					return null;
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Electric' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('electric terrain boost');
					return this.chainModify(1.5);
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Electric Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Electric Terrain');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Electric Terrain');
			},
		},
	},
	encore: {
		inherit: true,
		shortDesc: "The target repeats its last move for 4-8 turns.",
		desc: "For 4 to 8 turns, the target is forced to repeat its last move used. If the affected move runs out of PP, the effect ends. Fails if the target is already under this effect, if it has not made a move, if the move has 0 PP, or if the move is Encore, Mimic, Mirror Move, Sketch, Struggle, or Transform.",
		condition: {
			durationCallback() {
				return this.random(4, 9);
			},
			noCopy: true, // doesn't get copied by Z-Baton Pass
			onStart(target) {
				let move: Move | ActiveMove | null = target.lastMove;
				if (!move || target.volatiles['dynamax']) return false;

				if (move.isMax && move.baseMove) move = this.dex.moves.get(move.baseMove);
				const moveIndex = target.moves.indexOf(move.id);
				if (move.isZ || move.flags['failencore'] || !target.moveSlots[moveIndex] || target.moveSlots[moveIndex].pp <= 0) {
					// it failed
					return false;
				}
				this.effectState.move = move.id;
				this.add('-start', target, 'Encore');
				if (!this.queue.willMove(target)) {
					this.effectState.duration++;
				}
			},
			onOverrideAction(pokemon, target, move) {
				if (move.id !== this.effectState.move) return this.effectState.move;
			},
			onResidualOrder: 16,
			onResidual(target) {
				if (target.moves.includes(this.effectState.move) &&
					target.moveSlots[target.moves.indexOf(this.effectState.move)].pp <= 0) {
					// early termination if you run out of PP
					target.removeVolatile('encore');
				}
			},
			onEnd(target) {
				this.add('-end', target, 'Encore');
			},
			onDisableMove(pokemon) {
				if (!this.effectState.move || !pokemon.hasMove(this.effectState.move)) {
					return;
				}
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id !== this.effectState.move) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
		},
	},
	explosion: {
		inherit: true,
		shortDesc: "Target's Def halved during damage. User faints.",
		desc: "The user faints after using this move, unless this move has no target. The target's Defense is halved during damage calculation. This move is prevented from executing if any active Pokemon has the Damp Ability.",
	},
	extrasensory: {
		inherit: true,
		pp: 30,
	},
	feint: {
		inherit: true,
		basePower: 50,
	},
	fireblast: {
		inherit: true,
		basePower: 120,
		shortDesc: "30% chance to burn the target.",
		desc: "Has a 30% chance to burn the target.",
		secondary: {
			chance: 30,
			status: 'brn',
		},
	},
	flamethrower: {
		inherit: true,
		basePower: 95,
	},
	followme: {
		inherit: true,
		priority: 3,
	},
	futuresight: {
		inherit: true,
		pp: 15,
	},
	glaciallance: {
		inherit: true,
		basePower: 130,
	},
	grassyglide: {
		inherit: true,
		basePower: 70,
	},
	grassyterrain: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				const weakenedMoves = ['earthquake', 'bulldoze', 'magnitude'];
				if (weakenedMoves.includes(move.id) && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('move weakened by grassy terrain');
					return this.chainModify(0.5);
				}
				if (move.type === 'Grass' && attacker.isGrounded()) {
					this.debug('grassy terrain boost');
					return this.chainModify(1.5);
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Grassy Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Grassy Terrain');
				}
			},
			onResidualOrder: 5,
			onResidualSubOrder: 2,
			onResidual(pokemon) {
				if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
					this.heal(pokemon.baseMaxhp / 16, pokemon, pokemon);
				} else {
					this.debug(`Pokemon semi-invuln or not grounded; Grassy Terrain skipped`);
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Grassy Terrain');
			},
		},
	},
	growth: {
		inherit: true,
		pp: 40,
	},
	heatwave: {
		inherit: true,
		basePower: 100,
	},
	hiddenpower: {
		inherit: true,
		basePower: 70,
	},
	hiddenpowerbug: {
		inherit: true,
		basePower: 70,
	},
	hiddenpowerdark: {
		inherit: true,
		basePower: 70,
	},
	hiddenpowerdragon: {
		inherit: true,
		basePower: 70,
	},
	hiddenpowerelectric: {
		inherit: true,
		basePower: 70,
	},
	hiddenpowerfighting: {
		inherit: true,
		basePower: 70,
	},
	hiddenpowerfire: {
		inherit: true,
		basePower: 70,
	},
	hiddenpowerflying: {
		inherit: true,
		basePower: 70,
	},
	hiddenpowerghost: {
		inherit: true,
		basePower: 70,
	},
	hiddenpowergrass: {
		inherit: true,
		basePower: 70,
	},
	hiddenpowerground: {
		inherit: true,
		basePower: 70,
	},
	hiddenpowerice: {
		inherit: true,
		basePower: 70,
	},
	hiddenpowerpoison: {
		inherit: true,
		basePower: 70,
	},
	hiddenpowerpsychic: {
		inherit: true,
		basePower: 70,
	},
	hiddenpowerrock: {
		inherit: true,
		basePower: 70,
	},
	hiddenpowersteel: {
		inherit: true,
		basePower: 70,
	},
	hiddenpowerwater: {
		inherit: true,
		basePower: 70,
	},
	highjumpkick: {
		inherit: true,
		pp: 25,
	},
	hurricane: {
		inherit: true,
		basePower: 120,
	},
	hydropump: {
		inherit: true,
		basePower: 120,
	},
	hypnosis: {
		inherit: true,
		accuracy: 70,
	},
	icebeam: {
		inherit: true,
		basePower: 95,
	},
	jumpkick: {
		inherit: true,
		pp: 15,
	},
	kingsshield: {
		inherit: true,
		shortDesc: "Protects from damaging attacks. Contact: -2 Atk.",
		desc: "The user is protected from most attacks made by other Pokemon during this turn, and Pokemon trying to make contact with the user have their Attack lowered by 2 stages. Non-damaging moves go through this protection. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails, if the user's last move used is not Baneful Bunker, Detect, Endure, King's Shield, Protect, Quick Guard, Spiky Shield, or Wide Guard, or if it was one of those moves and the user's protection was broken. Fails if the user moves last this turn.",
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Protect');
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
					this.boost({atk: -2}, source, target, this.dex.getActiveMove("King's Shield"));
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
					this.boost({atk: -2}, source, target, this.dex.getActiveMove("King's Shield"));
				}
			},
		},
	},
	leafstorm: {
		inherit: true,
		basePower: 140,
	},
	leechlife: {
		inherit: true,
		pp: 15,
	},
	lunarblessing: {
		inherit: true,
		pp: 10,
	},
	magmastorm: {
		inherit: true,
		basePower: 120,
	},
	megadrain: {
		inherit: true,
		basePower: 75,
	},
	memento: {
		inherit: true,
		accuracy: true,
	},
	meteormash: {
		inherit: true,
		basePower: 100,
	},
	milkdrink: {
		inherit: true,
		pp: 10,
	},
	minimize: {
		inherit: true,
		pp: 20,
	},
	muddywater: {
		inherit: true,
		basePower: 95,
	},
	nightmare: {
		inherit: true,
		accuracy: true,
	},
	outrage: {
		inherit: true,
		pp: 15,
	},
	overheat: {
		inherit: true,
		basePower: 140,
	},
	petaldance: {
		inherit: true,
		pp: 20,
	},
	psychic: {
		inherit: true,
		shortDesc: "33% chance to lower the target's Sp. Def by 1.",
		desc: "Has a 33% chance to lower the target's Special Defense by 1 stage.",
		secondary: {
			chance: 33,
			boosts: {
				spd: -1,
			},
		},
	},
	psychicterrain: {
		inherit: true,
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
				if (effect && (effect.priority <= 0.1 || effect.target === 'self')) {
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
					return this.chainModify(1.5);
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
		secondary: null,
		target: "all",
		type: "Psychic",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
	ragepowder: {
		inherit: true,
		priority: 3,
	},
	recover: {
		inherit: true,
		pp: 20,
	},
	rest: {
		inherit: true,
		pp: 10,
		onTry(source) {
			if (source.hp === source.maxhp) {
				this.add('-fail', source, 'heal');
				return null;
			}
			if (source.hasAbility(['insomnia', 'vitalspirit'])) {
				this.add('-fail', source, '[from] ability: ' + source.getAbility().name, '[of] ' + source);
				return null;
			}
		},
		onHit(target, source, move) {
			if (target.status !== 'slp') {
				if (!target.setStatus('slp', source, move)) return;
			} else {
				this.add('-status', target, 'slp', '[from] move: Rest');
			}
			target.statusState.time = 3;
			target.statusState.startTime = 3;
			this.heal(target.maxhp);
		},
	},
	roost: {
		inherit: true,
		pp: 10,
	},
	sacredsword: {
		inherit: true,
		pp: 20,
	},
	selfdestruct: {
		inherit: true,
		shortDesc: "Target's Def halved during damage. User faints.",
		desc: "The user faints after using this move, unless this move has no target. The target's Defense is halved during damage calculation. This move is prevented from executing if any active Pokemon has the Damp Ability.",
	},
	shoreup: {
		inherit: true,
		pp: 10,
	},
	skullbash: {
		inherit: true,
		pp: 15,
	},
	skyattack: {
		inherit: true,
		basePower: 200,
	},
	slackoff: {
		inherit: true,
		pp: 10,
	},
	sludge: {
		inherit: true,
		shortDesc: "40% chance to poison the target.",
		desc: "Has a 40% chance to poison the target.",
		secondary: {
			chance: 40,
			status: 'psn',
		},
	},
	softboiled: {
		inherit: true,
		pp: 10,
	},
	solarbeam: {
		inherit: true,
		basePower: 200,
	},
	submission: {
		inherit: true,
		pp: 25,
	},
	suckerpunch: {
		inherit: true,
		basePower: 80,
	},
	surf: {
		inherit: true,
		basePower: 95,
	},
	swagger: {
		inherit: true,
		accuracy: 90,
	},
	swordsdance: {
		inherit: true,
		pp: 30,
	},
	synchronoise: {
		inherit: true,
		pp: 15,
	},
	tackle: {
		inherit: true,
		basePower: 50,
	},
	tailwind: {
		inherit: true,
		pp: 30,
	},
	taunt: {
		inherit: true,
		shortDesc: "For 3-5 turns, the target can't use status moves.",
		desc: "For 3 to 5 turns, prevents the target from using non-damaging moves.",
		flags: {protect: 1, mirror: 1, bypasssub: 1, metronome: 1},
		condition: {
			durationCallback() {
				return this.random(3, 6);
			},
			onStart(target) {
				this.add('-start', target, 'move: Taunt');
			},
			onResidualOrder: 10,
			onResidualSubOrder: 15,
			onEnd(target) {
				this.add('-end', target, 'move: Taunt');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).category === 'Status') {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 5,
			onBeforeMove(attacker, defender, move) {
				if (move.category === 'Status') {
					this.add('cant', attacker, 'move: Taunt', move);
					return false;
				}
			},
		},
	},
	thrash: {
		inherit: true,
		pp: 20,
	},
	thunder: {
		inherit: true,
		basePower: 120,
	},
	thunderbolt: {
		inherit: true,
		basePower: 95,
	},
	thunderwave: {
		inherit: true,
		accuracy: 100,
	},
	triplearrows: {
		inherit: true,
		pp: 15,
	},
	wickedblow: {
		inherit: true,
		basePower: 80,
	},
};
