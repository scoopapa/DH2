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
	magicaltorque: {
		inherit: true,
		isNonstandard: null,
	},
	headcharge: {
		inherit: true,
		isNonstandard: null,
	},	
	multiattack: {
		inherit: true,
		isNonstandard: null,
	},	
	
	boo: {
		num: -1,
		accuracy: 100,
		basePower: 175,
		category: "Physical",
		desc: "The user faints after using this move, unless this move has no target. The target's Defense is halved during damage calculation. This move is prevented from executing if any active Pokemon has the Damp Ability.",
		shortDesc: "Target's Def halved during damage. User faints.",
		name: "Boo",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, noparentalbond: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Chilly Reception", target);
			this.add('-anim', source, "Explosion", target);
		},
		selfdestruct: "always",
		secondary: null,
		target: "allAdjacent",
		type: "Ghost",
	},
	kaboom: {
		num: -2,
		accuracy: 100,
		basePower: 250,
		category: "Physical",
		desc: "The user faints after using this move, unless this move has no target. The target's Defense is halved during damage calculation. This move is prevented from executing if any active Pokemon has the Damp Ability.",
		shortDesc: "Target's Def halved during damage. User faints.",
		name: "Kaboom",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, noparentalbond: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Explosion", target);
		},
		selfdestruct: "always",
		secondary: null,
		target: "allAdjacent",
		type: "Normal",
	},
	thunderjolt: {
		num: -3,
		accuracy: 95,
		basePower: 100,
		category: "Special",
		desc: "Has a 10% chance to paralyze the target. This move results in a critical hit if the target is slower.",
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
		basePower: 110,
		category: "Physical",
		desc: "Deals damage to the target based on its Special Defense instead of Defense.",
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
		desc: "The user falls asleep for the next two turns and restores all of its HP, curing itself of any non-volatile status condition in the process, even if it was already asleep. Fails if the user has full HP.",
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
		desc: "If an opposing Pokemon switches out this turn, this move hits that Pokemon before it leaves the field, even if it was not the original target. If the user moves after an opponent using Flip Turn, Parting Shot, Teleport, U-turn, or Volt Switch, but not Baton Pass, it will hit that opponent before it leaves the field. Power doubles and no accuracy check is done if the user hits an opponent switching out, and the user's turn is over; if an opponent faints from this, the replacement Pokemon does not become active until the end of the turn.",
		shortDesc: "If a foe is switching out, hits it at 2x power.",
		name: "Blitzkrieg",
		viable: true,
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
		desc: "The user restores 1/2 of its maximum HP, rounded half up.",
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
		desc: "The user's non-volatile status condition is transferred to the target, and the user is then cured. Fails if the user has no non-volatile status condition or if the target already has one.",
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
	meteorbeem: {
		num: -9,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		desc: "This attack charges on the first turn and executes on the second. Raises the user's Special Attack by 1 stage on the first turn. If the user is holding a Power Herb, the move completes in one turn.",
		shortDesc: "Raises user's Sp. Atk by 1 on turn 1. Hits turn 2.",
		name: "Meteor Beem",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1, metronome: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Meteor Beam", target);
		},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({spa: 1}, attacker, attacker, move);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Rock",
	},
	infinitebaseballreaction: {
		num: -10,
		accuracy: true,
		basePower: 0,
		category: "Status",
		shortDesc: "Foe: -2 Atk & SpA. User: Sets Safeguard, switches, heals switch-in.",
		name: "infinite baseball reaction",
		pp: 1,
		priority: 0,
		flags: {protect: 1},
		isZ: "meowthofaloliumz",
		selfSwitch: true,
		self: {
			sideCondition: 'safeguard',
			slotCondition: 'infinitebaseballreaction',
		},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Parting Shot", target);
		},
		onHit(target, source, move) {
			this.add(`raw|<img src="https://cdn.discordapp.com/emojis/1080726657708593172.png?size=96&quality=lossless" height="96" width="96">`);
		},
		boosts: {
			atk: -2,
			spa: -2,
		},
		condition: {
			onSwap(target) {
				if (!target.fainted && (target.hp < target.maxhp || target.status)) {
					target.heal(target.maxhp);
					this.add('-heal', target, target.getHealth, '[from] move: infinitebaseballreaction');
					target.side.removeSlotCondition(target, 'infinitebaseballreaction');
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		contestType: "Beautiful",
	},
	strangersteam: {
		num: -11,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "Has a 20% chance to confuse the target.",
		shortDesc: "20% chance to confuse the target.",
		name: "Stranger Steam",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Strange Steam", target);
		},
		secondary: {
			chance: 20,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Fairy",
	},
	stellarblast: {
		num: -12,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		desc: "Lowers the user's Attack and Special Attack by 1 stage. If used by Enamorus, this move's power is multiplied by 1.5x.",
		shortDesc: "Lowers the user's Atk and SpA by 1. If Enamorus: 1.5x damage.",
		name: "Stellar Blast",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Draco Meteor", target);
		},
		onBasePower(basePower, source, target, move) {
			if (source.species.baseSpecies === 'Enamorus') {
				return this.chainModify(1.5);
			}
		},
		self: {
			boosts: {
				atk: -1,
				spa: -1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	shakedown: {
		num: -13,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		desc: "Lowers the user's Special Attack by 1 stage.",
		shortDesc: "Lowers the user's Sp. Atk by 1. Hits foe(s).",
		name: "Shakedown",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Make It Rain", target);
		},
		self: {
			boosts: {
				spa: -1,
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fighting",
		contestType: "Beautiful",
	},
};
