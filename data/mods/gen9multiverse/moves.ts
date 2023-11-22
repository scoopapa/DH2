export const Moves: {[k: string]: ModdedMoveData} = {
	kingsshield: {
		inherit: true,
		isNonstandard: null,
	},
	plasmafists: {
		inherit: true,
		isNonstandard: null,
	},
	refresh: {
		inherit: true,
		isNonstandard: null,
	},
	psystrike: {
		inherit: true,
		isNonstandard: null,
	},
	sacredfire: {
		inherit: true,
		isNonstandard: null,
	},
	shadowbone: {
		inherit: true,
		isNonstandard: null,
	},
	
	
	boo: {
		num: -1,
		accuracy: 100,
		basePower: 135,
		category: "Physical",
		shortDesc: "Target's Def halved during damage. User faints.",
		name: "Boo",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, noparentalbond: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Chilly Reception", target);
			this.add('-anim', source, "Explosion", target);
		},
		onModifyMove(move, pokemon, target) {
			if (!target) return;
			target.addVolatile('boo');
			if (!target.volatiles['substitute']) {
				if (target.removeVolatile('substitute')) {
					this.hint("The user does not faint if it breaks a substitute.");
				} else {
					move.selfdestruct = 'always';
				}
			}
		},
		condition: {
			duration: 1,
			onModifyDefPriority: 6,
			onModifyDef(def) {
				return this.chainModify(0.5);
			}
		},
		secondary: null,
		target: "allAdjacent",
		type: "Ghost",
	},
	kaboom: {
		num: -2,
		accuracy: 100,
		basePower: 250,
		category: "Physical",
		shortDesc: "Target's Def halved during damage. User faints.",
		name: "Kaboom",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, noparentalbond: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Explosion", target);
		},
		onModifyMove(move, pokemon, target) {
			if (!target) return;
			target.addVolatile('kaboom');
			if (!target.volatiles['substitute']) {
				if (target.removeVolatile('substitute')) {
					this.hint("The user does not faint if it breaks a substitute.");
				} else {
					move.selfdestruct = 'always';
				}
			}
		},
		condition: {
			duration: 1,
			onModifyDefPriority: 6,
			onModifyDef(def) {
				return this.chainModify(0.5);
			}
		},
		secondary: null,
		target: "allAdjacent",
		type: "Normal",
	},
	thunderjolt: {
		num: -3,
		accuracy: 95,
		basePower: 100,
		category: "Special",
		shortDesc: "10% chance to paralyze. Crits slower targets.",
		name: "Thunderjolt",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Thunderbolt", target);
		},
		onModifyMove(move, pokemon, target) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				pokemon.addVolatile('thunderjolt');
			}
		},
		condition: {
			duration: 1,
			onModifyCritRatio(critRatio) {
				return 5;
			},
		},
		secondary: {
			chance: 10,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
	},
	firestrike: {
		num: -4,
		accuracy: 85,
		basePower: 90,
		category: "Physical",
		shortDesc: "Damages target based on Special Defense, not Def.",
		overrideDefensiveStat: 'spd',
		name: "Fire Strike",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Fire Blast", target);
			this.add('-anim', source, "Dynamic Punch", target);
		},
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	deepsleep: {
		num: -5,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "User sleeps 2 turns and restores HP and status.",
		name: "Deep Sleep",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rest", target);
		},
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
			this.heal(target.maxhp); // Aesthetic only as the healing happens after you fall asleep in-game
		},
		secondary: null,
		target: "self",
		type: "Psychic",
	},
	blitzkrieg: {
		num: -6,
		accuracy: 100,
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the blitzkrieg succeeds
			if (target.beingCalledBack || target.switchFlag) {
				this.debug('Blitzkrieg damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		shortDesc: "If a foe is switching out, hits it at 2x power.",
		name: "Blitzkrieg",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Pursuit", target);
		},
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side.hasAlly(pokemon)) continue;
				side.addSideCondition('blitzkrieg', pokemon);
				const data = side.getSideConditionData('blitzkrieg');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack || target?.switchFlag) move.accuracy = true;
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('blitzkrieg');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Blitzkrieg start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectState.sources) {
					if (!source.isAdjacent(pokemon) || !this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Blitzkrieg');
						alreadyAdded = true;
					}
					// Run through each action in queue to check if the Blitzkrieg user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (source.canMegaEvo || source.canUltraBurst) {
						for (const [actionIndex, action] of this.queue.entries()) {
							if (action.pokemon === source && action.choice === 'megaEvo') {
								this.actions.runMegaEvo(source);
								this.queue.list.splice(actionIndex, 1);
								break;
							}
						}
					}
					this.actions.runMove('blitzkrieg', source, source.getLocOf(pokemon));
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	calmingsoul: {
		num: -7,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Heals the user by 50% of its max HP.",
		name: "Calming Soul",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Recover", target);
		},
		heal: [1, 2],
		secondary: null,
		target: "self",
		type: "Normal",
	},
	psychoshiftier: {
		num: -8,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		shortDesc: "Transfers the user's status ailment to the target.",
		name: "Psycho Shiftier",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Psycho Shift", target);
		},
		onTryHit(target, source, move) {
			if (!source.status) return false;
			move.status = source.status;
		},
		self: {
			onHit(pokemon) {
				pokemon.cureStatus();
			},
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
};