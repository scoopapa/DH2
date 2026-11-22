export const Moves: {[moveid: string]: ModdedMoveData} = {
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
	
	//unchanged
	
	//slate 1
	healorder: {
		inherit: true,
		isNonstandard: null,
	},
	spectralthief: {
		inherit: true,
		isNonstandard: null,
	},
	coreenforcer: {
		inherit: true,
		isNonstandard: null,
	},
	technoblast: {
		inherit: true,
		isNonstandard: null,
	},
	
	//slate 2
	oblivionwing: {
		inherit: true,
		isNonstandard: null,
	},
	
	//modded
	
	//slate 1
	triplearrows: {
		inherit: true,
		shortDesc: "Hits 3 times. Always crits.",
		basePower: 20,
		multihit: 3,
		critRatio: null,
		willCrit: true,
		secondaries: null,
	},
	stoneaxe: {
		inherit: true,
		basePower: 80,
		accuracy: 100,
		shortDesc: "100% chance to set Stealth Rock if the target resists the move.",
		onAfterHit: null,
		onAfterSubDamage: null,
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (!source.hp) return;
				if (target.getMoveHitData(move).typeMod < 0) {
					source.side.foe.addSideCondition('stealthrock');
				}
			},
		},
	},
	ceaselessedge: {
		inherit: true,
		basePower: 80,
		accuracy: 100,
		shortDesc: "100% chance to set Spikes if the target resists the move.",
		onAfterHit: null,
		onAfterSubDamage: null,
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (!source.hp) return;
				if (target.getMoveHitData(move).typeMod < 0) {
					source.side.foe.addSideCondition('spikes');
				}
			},
		},
	},
	
	//slate 2
	mortalspin: {
		inherit: true,
		shortDesc: "Free user from hazards/bind/Leech Seed; -1 Def.",
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
	},
	saltcure: {
		inherit: true,
		shortDesc: "Deals 1/8 additional max HP; 1/4 on Steel, Water.",
		basePower: 60,
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (!source.hp) return;
				this.damage(target.baseMaxhp / (target.hasType(['Water', 'Steel']) ? 4 : 8));
			},
		},
	},
	freezeshock: {
		accuracy: 100,
		basePower: 140,
		category: "Physical",
		name: "Freeze Shock",
		shortDesc: "Hits two turns after being used.",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, futuremove: 1},
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'freezeshock',
				source: source,
				moveData: {
					id: 'freezeshock',
					name: "Freeze Shock",
					accuracy: 100,
					basePower: 140,
					category: "Physical",
					priority: 0,
					flags: {metronome: 1, futuremove: 1},
					effectType: 'Move',
					type: 'Ice',
				},
			});
			this.add('-start', source, 'Freeze Shock');
			return this.NOT_FAIL;
		},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	fierydance: {
		inherit: true,
		shortDesc: "During Rain Dance: 1.5x damage instead of half.",
		pp: 15,
		flags: {protect: 1, mirror: 1, dance: 1, metronome: 1, defrost: 1},
		secondary: null,
		// Damage boost in Rain applied in conditions.ts
	},

	//slate 3
	behemothbash: {
		inherit: true,
		basePower: 90,
		basePowerCallback(pokemon, target, move) {
			if (target.species.bst > 600) {
				return move.basePower * 2;
			}
			return move.basePower;
		},
		pp: 10,
		shortDesc: "Deals doubled damage if the target has greater than 600 BST.",
	},
	sheercold: {
		name: "Sheer Cold",
		type: "Ice",
		category: "Special",
		basePower: 140,
		accuracy: 100,
		pp: 15,
		shortDesc: "Cannot be selected the turn after it's used.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, cantusetwice: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Sheer Cold", target);
		},
		secondary: null,
		target: "normal",
	},
	ficklebeam: {
		name: "Fickle Beam",
		type: "Dragon",
		category: "Special",
		basePower: 70,
		accuracy: 100,
		pp: 20,
		shortDesc: "Hits Fairy neutral. User heals 1/16 HP.",
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Fickle Beam", target);
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return; // avoid crashing when called from a chat plugin
			if (!target.runImmunity('Dragon')) {
				if (target.hasType('Fairy')) return 0;
			}
		},
		onHit(target, source) {
			this.heal(source.maxhp / 16, source, source);
		},
		secondary: null,
		target: "normal",
	},
	focuspunch: {
		accuracy: 100,
		basePower: 45,
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the pursuit succeeds
			if (target.beingCalledBack || target.switchFlag) {
				this.debug('Pursuit damage boost');
				return move.basePower * 1.5;
			}
			return move.basePower;
		},
		category: "Physical",
		name: "Focus Punch",
		shortDesc: "If a foe is switching out, hits it at 1.5x power.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, punch: 1, protect: 1, mirror: 1, metronome: 1},
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side.hasAlly(pokemon)) continue;
				side.addSideCondition('focuspunch', pokemon);
				const data = side.getSideConditionData('focuspunch');
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
			target.side.removeSideCondition('focuspunch');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Pursuit start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectState.sources) {
					if (!source.isAdjacent(pokemon) || !this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Focus Punch');
						alreadyAdded = true;
					}
					// Run through each action in queue to check if the Pursuit user is supposed to Mega Evolve this turn.
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
					this.actions.runMove('focuspunch', source, source.getLocOf(pokemon));
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Clever",
	},
	headlock: {
		name: "Headlock",
		type: "Fighting",
		category: "Physical",
		basePower: 80,
		accuracy: 100,
		pp: 20,
		shortDesc: "Prevents the target from switching out.",
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, pokemon, move) {
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Octolock", target);
		},
		onHit(target, source, move) {
			if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
		},
		secondary: null,
		target: "normal",
	},
};
