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
		shortDesc: "Hits 3 times. Each hit can miss, but power rises. 10% to lower Defense.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		multihit: 3,
		multiaccuracy: true,
		onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Attack Order", target);
		},
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Bug",
	},
	blackhole: {
		num: -2,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		shortDesc: "User loses 50% of its max HP. Damages with halved Sp. Def in 3 turns.",
		name: "Black Hole",
		pp: 5,
		priority: 0,
		flags: {authentic: 1},
		willCrit: false,
		isFutureMove: true,
		onPrepareHit: function(target, source, move) {
			this.damage(source.baseMaxhp / 2, source);
			this.attrLastMove('[still]');
			this.add('-anim', source, "Black Hole Eclipse", target);
			this.add('-message', `${source.name} summoned a Black Hole...`);
		},
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 4,
				move: 'blackhole',
				source: source,
				moveData: {
					id: 'blackhole',
					name: "Black Hole",
					accuracy: 100,
					basePower: 200,
					category: "Special",
					priority: 0,
					flags: {},
					target: "normal",
					effectType: 'Move',
					isFutureMove: true,
					type: '???',
				},
			});
			this.add('-start', source, 'Black Hole');
			return null;
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	parry: {
        num: -3,
        accuracy: true,
        basePower: 0,
        category: "Status",
		  shortDesc: "Reduces damage of incoming attacks. Uses another known move.",
        pp: 5,
        priority: -1,
        flags: {contact: 1, protect: 1},
        volatileStatus: 'parry',
        beforeTurnCallback(pokemon) {
        pokemon.addVolatile('parry');
        },
        beforeMoveCallback(pokemon, move) {
            if (pokemon.volatiles['parry'] && pokemon.volatiles['parry'].untouched) { 
                return false;
            }
            else if (pokemon.volatiles['parry'] && !pokemon.volatiles['parry'].untouched) {
					 this.add('-message', `${pokemon.name} was unable to parry...`);
					 const ppDeducted = pokemon.deductPP(move, 1);
                if (!ppDeducted) return false;
                return true;
            }
        },
        condition: {
            duration: 1,
				onSourceBasePower(basePower, target, source, move) {
                    return this.chainModify(0.7);
            },
            onStart(pokemon) {
                this.add('-message', `${pokemon.name} is attempting to parry!`);
            },
            onHit(pokemon, source, move) {
                if (move.category !== 'Status') {
                    pokemon.volatiles['parry'].untouched = true;
               }
           },
       },//
		 onPrepareHit: function(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Mimic", target);
		},
		 onHit(pokemon) {
            if (pokemon.volatiles['parry'] && pokemon.volatiles['parry'].untouched) {
                const NoParry = ['assist', 'beakblast', 'belch', 'bide', 'celebrate', 'chatter', 'copycat', 'dynamaxcannon', 'focuspunch', 'mefirst', 'metronome', 'mimic', 'mirrormove', 'naturepower', 'shelltrap', 'sketch', 'uproar', 'sketch', 'parry', 'protect', 'detect'];
                const moves = [];
                for (const moveSlot of pokemon.moveSlots) {
                    const move = moveSlot.id;
                    if (move && !NoParry.includes(move) && !this.dex.getMove(move).flags['charge']) {
                        moves.push(move);
                    }
                }
                let randomMove = '';
                if (moves.length) randomMove = this.sample(moves);
                if (!randomMove) return false;
                this.useMove(randomMove, pokemon);
                if (randomMove == 'sleeptalk') {
                    const ppDeducted = pokemon.deductPP(randomMove, 2);
                    if (!ppDeducted) return false;
                }
                else {
                    const ppDeducted = pokemon.deductPP(randomMove, 1);
                    if (!ppDeducted) return false;
                }
            }
        },
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
		  shortDesc: "For 5 turns, grounded foes are burned after they attack. Max 1 layer.",
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
			onFoeHit(pokemon, source, move) {
				if (move.category !== 'Status') {
					source.trySetStatus('brn', pokemon);
				}
			},
		},
		  target: "foeSide",
		  type: "Fire",
	},
	flowermortar: {
		num: -5,
		accuracy: 90,
		basePower: 70,
		category: "Special",
		name: "Flower Mortar",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
	   drain: [1, 2],
		self: {
			onHit(source) {
				source.side.foe.addSideCondition('flowermortar');
			},
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
				this.add('-sideend', targetSide, 'Flower Mortar');
			},
		},
		shortDesc: "User recovers 50% of direct damage dealt. Damages target for 2-3 turns.",
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
	
	///////
	
	spikes: {
		inherit: true,
		flags: {authentic: 1},
		desc: "Sets up a hazard on the opposing side of the field, causing each opposing Pokemon that switches in to lose 1/8 of their maximum HP, rounded down, unless it is a Flying-type Pokemon. Fails if the effect is already active on the opposing side. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin successfully.",
		shortDesc: "Hurts grounded foes on switch-in. Max 1 layer.",
		condition: {
			// this is a side condition
			onStart(side) {
				if (!this.effectData.layers || this.effectData.layers === 0) {
					this.add('-sidestart', side, 'Spikes');
					this.effectData.layers = 1;
				} else {
					return false;
				}
			},
			onSwitchIn(pokemon) {
				if (!pokemon.runImmunity('Ground')) return;
				const damageAmounts = [0, 3];
				this.damage(damageAmounts[this.effectData.layers] * pokemon.maxhp / 24);
			},
		},
   },
	rapidspin: {
		num: 229,
		accuracy: 100,
		basePower: 20,
		category: "Physical",
		name: "Rapid Spin",
		pp: 40,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'sacredcandle', 'flowermortar'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add(/*'-sideend', */pokemon.side, this.dex.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
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
					this.add(/*'-sideend', */pokemon.side, this.dex.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	sleeptalk: {
		inherit: true,
		desc: "One of the user's known moves, besides this move, is selected for use at random. Fails if the user is not asleep. The selected move does not have PP deducted from it, and can currently have 0 PP. This move cannot select Bide, Sleep Talk, or any two-turn move.",
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
		noSketch: true,
	},
	swagger: {
		flags: {authentic: 1},
		inherit: true,
		desc: "Raises the target's Attack by 2 stages and confuses it. This move will miss if the target's Attack cannot be raised.",
		onTryHit(target, pokemon, move) {
			if (target.boosts.atk >= 6 || target.getStat('atk', false, true) === 999) {
				this.add('-miss', pokemon);
				return null;
			}
			if (target.volatiles['substitute']) {
				delete move.volatileStatus;
			}
		},
	},
};
