export const Moves: {[moveid: string]: MoveData} = {
	swarmattack: {
		num: -1,
		accuracy: 90,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 10 + (move.hit * 10);
		},
		category: "Physical",
		name: "Swarm Attack",
		shortDesc: "Hits 3 times. Power rises per hit.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		multihit: 3,
		multiaccuracy: true,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Attack Order", target);
		},
		secondary: null,
		target: "normal",
		type: "Bug",
	},
	blackhole: {
		num: -2,
		accuracy: 100,
		basePower: 200,
		category: "Status",
		shortDesc: "Damages all Pokemon in 2 turns.",
		name: "Black Hole",
		pp: 5,
		priority: 0,
		flags: {authentic: 1},
		willCrit: false,
		isFutureMove: true,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Black hole Eclipse", source);
			this.add('-message', `${source.name} summoned a Black Hole!`);
		},
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			if (!source.side.addSlotCondition(source, 'futuremove')) return false;
			const moveData = {
				name: "Black Hole",
				basePower: 200,
				category: "Special",
				flags: {},
				willCrit: false,
				type: '???',
				isFutureMove: true,
			} as unknown as ActiveMove;
			const damage = this.getDamage(source, target, moveData, true);
			for (const pokemon of this.getAllActive()) {
				Object.assign(pokemon.side.slotConditions[pokemon.position]['futuremove'], {
					duration: 3,
					move: 'blackhole',
					source: source,
					moveData: {
						id: 'blackhole',
						name: "Black Hole",
						accuracy: 100,
						basePower: 0,
						damage: damage,
						category: "Special",
						priority: 0,
						flags: {},
						target: "normal",
						effectType: 'Move',
						isFutureMove: true,
						type: '???',
					},
				});
			}
			this.add('-start', source.side, 'Black Hole');
			this.add('-start', target.side, 'Black Hole');
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Cosmic",
	},
	parry: { // this move probably won't work correctly in double battles. Do not port blindly!
        num: -3,
        accuracy: true,
        basePower: 0,
        category: "Status",
		shortDesc: "Reduces damage of incoming attacks. Uses another known move.",
        pp: 5,
        priority: 1,
        flags: {contact: 1, protect: 1},
        volatileStatus: 'parry',
		onPrepareHit(pokemon) {
			if (pokemon.volatiles['substitute']) return false;
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
				pokemon.addVolatile('stall');
				pokemon.addVolatile('parry');
				this.add('-message', `${pokemon.name} is attempting to Parry!`);
				this.attrLastMove('[still]');
				this.add('-anim', pokemon, "Harden");
        },
        condition: {
            duration: 1,
            onStart(pokemon) {
                this.add('-singleturn', pokemon, 'move: Parry');
            },
		   	onDamagePriority: -11,
		   	onFoeAfterMoveSelf(target, source, attack) {
				if (target === source) return;
				if (attack.category === 'Status') return;
				if (target.lastDamage === 0) return;

				this.add('-message', `${source.name} parried the attack!`);
				this.add('-anim', target, "Mimic", source);

				const NoParry = ['assist', 'beakblast', 'belch', 'bide', 'celebrate', 'chatter', 'copycat', 'dynamaxcannon', 'focuspunch', 'mefirst', 'metronome', 'mimic', 'mirrormove', 'naturepower', 'shelltrap', 'sketch', 'uproar', 'sketch', 'parry', 'protect', 'detect', 'endure'];
				const moves = [];
				for (const moveSlot of source.moveSlots) {
					const move = moveSlot.id;
					if (move && !NoParry.includes(move) && !this.dex.getMove(move).flags['charge']) {
						moves.push(move);
					}
				}
				let randomMove = '';
				if (moves.length) randomMove = this.sample(moves);
				if (!randomMove) return false;
				this.useMove(randomMove, source);
				if (randomMove == 'sleeptalk') {
					source.deductPP(randomMove, 2);
					return false;
				}
				else {
					const ppDeducted = source.deductPP(randomMove, 1);
					if (!ppDeducted) return false;
				}
			},
       	},//
        name: "Parry",
        secondary: null,
        target: "self",
        type: "Fighting",
        contestType: "Cool",
   },
	sacredcandle: {
		  num: -4,
        accuracy: true,
        basePower: 0,
        category: "Status",
		  name: "Sacred Candle",
		  pp: 10,
		  priority: 0,
	  	  flags: {authentic: 1},
		  sideCondition: 'sacredcandle',
		  shortDesc: "For 5 turns, grounded foes are burned after they move. Max 1 layer.",
		  onPrepareHit: function(target, source, move) {
				this.attrLastMove('[still]');
				this.add('-anim', source, "Fire Spin", target);
			},
		  condition: {
		   duration: 5,
			// this is a side condition
		   onStart(side) {
				if (!this.effectData.layers || this.effectData.layers === 0) {
					this.add('-sidestart', side, 'move: Sacred Candle');
					this.effectData.layers = 1;
				} else {
					return false;
				   }
			   },
			 onAfterMoveSelf(pokemon, source, move) {
					if ((!pokemon.hasType('Fire')) && (!pokemon.hasType('Flying')) && (move.id !== 'rapidspin')) {
						pokemon.trySetStatus('brn', source);
					}
 			},
		  onEnd(targetSide) {
				for (const pokemon of targetSide.active) {
        			this.add('-message', `Sacred Candle burnt out!`);
					this.add('-sideend', targetSide, 'Sacred Candle');
				}
		  },
		  target: "foeSide",
		  type: "Fire",
		},
	},
	flowermortar: {
		num: -5,
		accuracy: 90,
		basePower: 70,
		category: "Special",
		name: "Flower Mortar",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
	   drain: [1, 2],
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('flowermortar');
			},
		},
		onTryHit(target, source) {
			if (target.volatiles['substitute']) {
				this.add('-miss', target);
				return null;
			} else
		      return true;
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Petal Dance", target);
		},
		condition: {
			duration: 3,
			durationCallback(target, source) {
				return this.random(1, 3);
			},
			onStart(targetSide, source) {
				this.add('-message', `${source.name} shot petals into the air...`);
				this.add('-sidestart', targetSide, 'Flower Mortar');
			},
			onResidualOrder: 5,
			onResidualSubOrder: 1.1,
			onResidual(targetSide) {
				for (const pokemon of targetSide.active) {
					this.add('-message', `${pokemon.name} was hit by petals!`);
					this.damage(pokemon.baseMaxhp / 16, pokemon);
				}
			},
			onEnd(targetSide) {
				for (const pokemon of targetSide.active) {
        			this.add('-message', `${pokemon.name} was hit by petals!`);
					this.damage(pokemon.baseMaxhp / 16, pokemon);
				}
				this.add('-message', `Flower Mortar's petals scattered away!`);
				this.add('-sideend', targetSide, 'Flower Mortar');
			},
		},
		shortDesc: "User recovers 50% of damage dealt. Damages target for 2-3 turns.",
		secondary: null,
		target: "normal",
		type: "Grass",
	},
	hypeup: {
		num: -6,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Hype Up",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		self: {
			volatileStatus: 'hypeup',
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Uproar", target);
		},
		onTryHit(target) {
			for (const [i, allyActive] of target.side.active.entries()) {
				if (allyActive && allyActive.status === 'slp') allyActive.cureStatus();
				const foeActive = target.side.foe.active[i];
				if (foeActive && foeActive.status === 'slp') foeActive.cureStatus();
			}
		},
		condition: {
			duration: 3,
			onStart(target) {
				this.add('-start', target, 'Hype Up');
			},
			onResidual(target) {
				if (target.lastMove && target.lastMove.id === 'struggle') {
					// don't lock
					delete target.volatiles['hypeup'];
				}
				this.add('-start', target, 'Hype Up', '[upkeep]');
			},
			onEnd(target) {
				this.add('-end', target, 'Hype Up');
			},
			onLockMove: 'hypeup',
			onAnySetStatus(status, pokemon) {
				if (status.id === 'slp') {
					if (pokemon === this.effectData.target) {
						this.add('-message', `${pokemon.name} is too hyped up to sleep.`);
					} else {
						this.add('-message', `${pokemon.name} is too hyped up to sleep.`);
					}
					return null;
				}
			},
		},
		shortDesc: "Lasts 3 turns. Active Pokemon cannot fall asleep.",
		secondary: null,
		target: "Normal",
		type: "Normal",
	},
	bytetorment: {
		num: -8,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Byte Torment",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Chatter", target);
		},
		shortDesc: "100% chance to lower the target's Attack by 1.",
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},
	expel: {
		num: -9,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Expel",
		pp: 20,
		priority: 0,
		flags: {defrost: 1, bypasssub: 1},
		sleepUsable: true,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Life Dew", target);
		},
		onHit(source) {
			source.cureStatus();
			source.clearBoosts();
			this.add('-clearboost', source);
			if (source.hp && source.removeVolatile('confusion')) {
				this.add('-end', source, 'Confusion', '[from] move: Expel', '[of] ' + source);
			}
			if (source.hp && source.removeVolatile('attract')) {
				this.add('-end', source, 'Infatuation', '[from] move: Expel', '[of] ' + source);
			}
			if (source.hp && source.removeVolatile('leechseed')) {
				this.add('-end', source, 'Leech Seed', '[from] move: Expel', '[of] ' + source);
			}
			if (source.hp && source.removeVolatile('trapped')) {
				this.add('-end', source, 'Trap', '[from] move: Expel', '[of] ' + source);
			}
			if (source.hp && source.removeVolatile('curse')) {
				this.add('-end', source, 'Curse', '[from] move: Expel', '[of] ' + source);
			}
		},
		shortDesc: "Cures the user's status. Resets the user's stat changes.",
		secondary: null,
		target: "self",
		type: "Normal",
		contestType: "Beautiful",
	},

	preyingswipe: {
		num: -10,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the pursuit succeeds
			if (target.beingCalledBack || target.switchFlag) {
				this.debug('Pursuit damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		name: "Preying Swipe",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side === pokemon.side) continue;
				side.addSideCondition('preyingswipe', pokemon);
				const data = side.getSideConditionData('preyingswipe');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove() {},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('preyingswipe');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Preyingswipe start');
				let alreadyAdded = false;
				for (const source of this.effectData.sources) {
					if (source.speed < pokemon.speed || (source.speed === pokemon.speed && this.random(2) === 0)) {
						// Destiny Bond ends if the switch action "outspeeds" the attacker, regardless of host
						pokemon.removeVolatile('destinybond');
					}
					if (!this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Preying Swipe');
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
					this.runMove('preyingswipe', source, this.getTargetLoc(pokemon, source));
				}
			},
		},
		secondary: null,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Slash", target);
		},
		shortDesc: "Power doubles if the foe is switching out.",
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
	draconicdrive: {
		num: -11,
		accuracy: 90,
		basePower: 95,
		category: "Special",
		name: "Draconic Drive",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: {
			chance: 20,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dragon Pulse", target);
		},
		shortDesc: "20% chance to raise the user's Sp. Atk by 1 stage.",
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
	},
	softshell: {
		num: -12,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Soft Shell",
		pp: 10,
		priority: 1,
		flags: {heal: 1, bypasssub: 1},
		heal: [1, 2],
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Withdraw", target);
		},
		shortDesc: "Heals the user by 50% of their health. Lowers the user's defenses. +1 Priority.",
		target: "self",
		type: "Normal",
		contestType: "Cool",
	},
	essencesteal: {
		num: -12,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Essence Steal",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, heal: 1},
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Dream Eater", target);
		},
		onHit(target, source) {
			if (target.boosts.spa === -6) return false;
			const success = this.boost({spa: -1}, target, source, null, false, true);
			return !!(this.heal(source.level, source, target) || success);
		},
		shortDesc: "Lowers the target's Sp. Atk. Heals user equal to the opponent's level.",
		target: "normal",
		type: "Ghost",
		contestType: "Cool",
	},
	malnourish: {
		num: -13,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Malnourish",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		volatileStatus: 'malnourish',
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Venoshock", target);
		},
		onHit(pokemon) {
			if (pokemon.hasType('Poison')) return;
			if (pokemon.hasType('Steel')) return;
			pokemon.addVolatile('malnourish');
			this.add('-start', pokemon, 'move: Malnourish');
		},
		shortDesc: "Inverts the healing effects of a target's item.",
		secondary: null,
		target: "normal",
		type: "Poison",
		contestType: "Smart",
	},
	boulderrush: {
		num: -14,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		name: "Boulder Rush",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [50, 100],
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Rock Wrecker", target);
		},
		shortDesc: "Has 1/2 Recoil.",
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	hiddenpowercosmic: {
		gen: 2,
		num: -15,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		realMove: "Hidden Power",
		name: "Hidden Power Cosmic",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Cosmic",
		contestType: "Clever",
	},
	rapidspin: {
		inherit: true,
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'sacredcandle', 'flowermortar'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'sacredcandle', 'flowermortar'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
	},
	sleeptalk: {
        inherit: true,
        onHit(pokemon) {
            const noSleepTalk = [
                'bide', 'focuspunch', 'metronome', 'mimic', 'mirrormove', 'naturepower', 'sketch', 'sleeptalk', 'hypeup',
            ];
            const moves = [];
            for (const moveSlot of pokemon.moveSlots) {
                const moveid = moveSlot.id;
                if (!moveid) continue;
                const move = this.dex.getMove(moveid);
                if (noSleepTalk.includes(moveid) || move.flags['charge']) {
                    continue;
                }
                moves.push(moveid);
            }
            let randomMove = '';
            if (moves.length) randomMove = this.sample(moves);
            if (!randomMove) {
                return false;
            }
            this.useMove(randomMove, pokemon);
        },
    },
	substitute: {
        inherit: true,
        condition: {
            onStart(target) {
                this.add('-start', target, 'Substitute');
                if (target.item === 'wynaut') {
                    this.add('-item', target, 'Wynaut');
                    this.add('-activate', target, 'item: Wynaut');
                }
                this.effectData.hp = Math.floor(target.maxhp / 4);
                delete target.volatiles['partiallytrapped'];
            },
            onTryPrimaryHitPriority: -1,
            onTryPrimaryHit(target, source, move) {
                if (move.stallingMove) {
                    this.add('-fail', source);
                    return null;
                }
                if (target === source) {
                    this.debug('sub bypass: self hit');
                    return;
                }
                if (move.id === 'twineedle') {
                    move.secondaries = move.secondaries!.filter(p => !p.kingsrock);
                }
                if (move.drain) {
                    this.add('-miss', source);
                    this.hint("In Gen 2, draining moves always miss against Substitute.");
                    return null;
                }
                if (move.category === 'Status') {
                    const SubBlocked = ['leechseed', 'lockon', 'mindreader', 'nightmare', 'painsplit', 'sketch'];
                    if (move.id === 'swagger') {
                        // this is safe, move is a copy
                        delete move.volatileStatus;
                    }
                    if (
                        move.status || (move.boosts && move.id !== 'swagger') ||
                        move.volatileStatus === 'confusion' || SubBlocked.includes(move.id)
                    ) {
                        this.add('-activate', target, 'Substitute', '[block] ' + move.name);
                        return null;
                    }
                    return;
                }
                let damage = this.getDamage(source, target, move);
                if (!damage) {
                    return null;
                }
                damage = this.runEvent('SubDamage', target, source, move, damage);
                if (!damage) {
                    return damage;
                }
                if (damage > target.volatiles['substitute'].hp) {
                    damage = target.volatiles['substitute'].hp as number;
                }
                target.volatiles['substitute'].hp -= damage;
                source.lastDamage = damage;
                if (target.volatiles['substitute'].hp <= 0) {
                    target.removeVolatile('substitute');
                } else {
                    this.add('-activate', target, 'Substitute', '[damage]');
                }
                if (move.recoil) {
                    this.damage(1, source, target, 'recoil');
                }
                this.runEvent('AfterSubDamage', target, source, move, damage);
                return this.HIT_SUBSTITUTE;
            },
            onEnd(target) {
                this.add('-end', target, 'Substitute');
            },
        },
    },
	
	moonlight: {
		inherit: true,
		type: "Cosmic",
	},
	morningsun: {
		inherit: true,
		type: "Cosmic",
	},
	cometpunch: {
		inherit: true,
		category: "Special",
		type: "Cosmic",
	},
	triattack: {
		inherit: true,
		category: "Special",
		type: "Cosmic",
	},
	swift: {
		inherit: true,
		category: "Special",
		type: "Cosmic",
	},
};
